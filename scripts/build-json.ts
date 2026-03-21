/**
 * Generates all pre-computed JSON data files into public/api/.
 * Run with: npx tsx scripts/build-json.ts
 */

import fs from "node:fs";
import path from "node:path";
import {
  loadRirikkuData,
  loadConsolidatedData,
  loadJlptData,
  loadKaishiData,
  type RirikkuWord,
  type ConsolidatedWord,
} from "../src/lib/data-loader";
import { SORT_ORDERS, FREQUENCY_COLUMN_KEYS } from "../src/lib/sort-orders";

const OUTPUT_DIR = path.resolve("public/api");
const PAGE_SIZE = 100;

// Badge keys shown by default on word cards
const DEFAULT_BADGE_KEYS = [
  "BCCWJ_LUW",
  "cejc_small_talk_rank",
  "JITEN_DRAMA",
  "NETFLIX",
  "WIKIPEDIA_V2",
  "DD2_MORPHMAN_SOL",
];

// ─── Types ──────────────────────────────────────────────────────────────────

interface EnrichedWord {
  word: string;
  hiragana: string;
  jlpt: number | null;
  kaishi: boolean;
  kaishiOrder: number; // -1 if not in Kaishi
  ririkkuRank: number;
  ranks: Record<string, number>;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function ensureDir(dir: string) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeJson(filePath: string, data: unknown) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, JSON.stringify(data));
}

// ─── Main ───────────────────────────────────────────────────────────────────

function main() {
  const t0 = Date.now();
  console.log("Loading data...");

  const ririkkuWords = loadRirikkuData();
  const consolidatedData = loadConsolidatedData();
  const jlptData = loadJlptData();
  const kaishiData = loadKaishiData();

  console.log(`  RIRIKKU: ${ririkkuWords.length} words`);
  console.log(`  Consolidated: ${consolidatedData.size} words`);
  console.log(`  JLPT: ${jlptData.size} words`);
  console.log(`  Kaishi: ${kaishiData.entries.length} entries`);

  // Build a fast lookup for Kaishi by word+reading
  const kaishiLookup = new Map<string, number>();
  for (const entry of kaishiData.entries) {
    kaishiLookup.set(`${entry.word}|${entry.reading}`, entry.order);
  }

  // Enrich words
  const enriched: EnrichedWord[] = ririkkuWords.map((rw) => {
    const jlpt = jlptData.get(rw.word) ?? null;
    const kaishiKey = `${rw.word}|${rw.hiragana}`;
    const kaishiOrder = kaishiLookup.get(kaishiKey) ?? -1;

    return {
      word: rw.word,
      hiragana: rw.hiragana,
      jlpt,
      kaishi: kaishiOrder >= 0,
      kaishiOrder,
      ririkkuRank: rw.RIRIKKU_RANK,
      ranks: rw.ranks,
    };
  });

  // Clean output directory
  if (fs.existsSync(OUTPUT_DIR)) {
    fs.rmSync(OUTPUT_DIR, { recursive: true });
  }

  generateSortedPages(enriched);
  generateWordDetail(enriched, consolidatedData);
  generateSearchIndices(enriched);

  const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
  console.log(`\nDone in ${elapsed}s`);
}

// ─── Sorted Pages ───────────────────────────────────────────────────────────

function generateSortedPages(words: EnrichedWord[]) {
  console.log("\nGenerating sorted pages...");

  for (const sortOrder of SORT_ORDERS) {
    const sorted = sortWords(words, sortOrder.key);
    const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
    const dir = path.join(OUTPUT_DIR, "sorted", sortOrder.key);

    for (let page = 1; page <= totalPages; page++) {
      const start = (page - 1) * PAGE_SIZE;
      const pageItems = sorted.slice(start, start + PAGE_SIZE);

      const items = pageItems.map((w) => {
        const item: Record<string, unknown> = {
          word: w.word,
          reading: w.hiragana,
        };
        if (w.jlpt !== null) item.jlpt = w.jlpt;
        if (w.kaishi) item.kaishi = true;

        // Only include ranks that have actual values (not -1)
        const rk: Record<string, number> = {};
        for (const key of DEFAULT_BADGE_KEYS) {
          const val = w.ranks[key];
          if (val != null && val !== -1) rk[key] = val;
        }
        if (Object.keys(rk).length > 0) item.ranks = rk;

        return item;
      });

      writeJson(path.join(dir, `${page}.json`), {
        totalPages,
        totalItems: sorted.length,
        items,
      });
    }

    console.log(`  ${sortOrder.key}: ${totalPages} pages`);
  }
}

function sortWords(words: EnrichedWord[], sortKey: string): EnrichedWord[] {
  const copy = [...words];

  if (sortKey === "JLPT") {
    // N5→N4→N3→N2→N1→untagged, sub-sort by RIRIKKU_RANK
    copy.sort((a, b) => {
      const aGroup = a.jlpt ? 6 - a.jlpt : 6; // N5=1,N4=2,...,N1=5,none=6
      const bGroup = b.jlpt ? 6 - b.jlpt : 6;
      if (aGroup !== bGroup) return aGroup - bGroup;
      return a.ririkkuRank - b.ririkkuRank;
    });
  } else if (sortKey === "KAISHI") {
    // Kaishi words first (by file order), then rest by RIRIKKU_RANK
    copy.sort((a, b) => {
      if (a.kaishi && !b.kaishi) return -1;
      if (!a.kaishi && b.kaishi) return 1;
      if (a.kaishi && b.kaishi) return a.kaishiOrder - b.kaishiOrder;
      return a.ririkkuRank - b.ririkkuRank;
    });
  } else {
    // Frequency column: ascending rank, -1 to end, tie-break by RIRIKKU_RANK
    copy.sort((a, b) => {
      const aRank = a.ranks[sortKey] ?? -1;
      const bRank = b.ranks[sortKey] ?? -1;
      if (aRank === -1 && bRank === -1) return a.ririkkuRank - b.ririkkuRank;
      if (aRank === -1) return 1;
      if (bRank === -1) return -1;
      if (aRank !== bRank) return aRank - bRank;
      return a.ririkkuRank - b.ririkkuRank;
    });
  }

  return copy;
}

// ─── Word Detail ────────────────────────────────────────────────────────────

function generateWordDetail(
  words: EnrichedWord[],
  consolidated: Map<string, ConsolidatedWord>,
) {
  console.log("\nGenerating word detail files...");

  // Group by word (multiple readings possible)
  const byWord = new Map<string, EnrichedWord[]>();
  for (const w of words) {
    const existing = byWord.get(w.word) ?? [];
    existing.push(w);
    byWord.set(w.word, existing);
  }

  let count = 0;
  for (const [word, entries] of byWord) {
    const firstChar = word.charAt(0);
    const filePath = path.join(OUTPUT_DIR, "words", firstChar, `${word}.json`);

    const data = entries.map((e) => {
      const consolidatedKey = `${e.word}|${e.hiragana}`;
      const consolidatedEntry = consolidated.get(consolidatedKey);

      const item: Record<string, unknown> = {
        reading: e.hiragana,
        ririkkuRank: e.ririkkuRank,
        ranks: e.ranks,
      };
      if (e.jlpt !== null) item.jlpt = e.jlpt;
      if (e.kaishi) item.kaishi = true;
      if (consolidatedEntry) item.detailRanks = consolidatedEntry.ranks;

      return item;
    });

    writeJson(filePath, data);
    count++;
  }

  console.log(`  ${count} word files`);
}

// ─── Search Indices ─────────────────────────────────────────────────────────

function generateSearchIndices(words: EnrichedWord[]) {
  console.log("\nGenerating search indices...");

  // Sort by RIRIKKU_RANK so most frequent words appear first in typeahead
  const sorted = [...words].sort((a, b) => a.ririkkuRank - b.ririkkuRank);

  // By reading (first hiragana character)
  const byReading = new Map<string, [string, string][]>();
  for (const w of sorted) {
    const firstChar = w.hiragana.charAt(0);
    if (!firstChar) continue;
    const list = byReading.get(firstChar) ?? [];
    list.push([w.word, w.hiragana]);
    byReading.set(firstChar, list);
  }

  for (const [char, entries] of byReading) {
    writeJson(
      path.join(OUTPUT_DIR, "search", "reading", `${char}.json`),
      entries,
    );
  }
  console.log(`  ${byReading.size} reading index files`);

  // By word (first character of word)
  const byWord = new Map<string, [string, string][]>();
  for (const w of sorted) {
    const firstChar = w.word.charAt(0);
    if (!firstChar) continue;
    const list = byWord.get(firstChar) ?? [];
    list.push([w.word, w.hiragana]);
    byWord.set(firstChar, list);
  }

  for (const [char, entries] of byWord) {
    writeJson(path.join(OUTPUT_DIR, "search", "word", `${char}.json`), entries);
  }
  console.log(`  ${byWord.size} word index files`);
}

// ─── Run ────────────────────────────────────────────────────────────────────

main();
