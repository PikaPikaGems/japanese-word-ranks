/**
 * Generates all pre-computed JSON data files into public/api/ (V2).
 * Run with: npx tsx scripts/build-json.ts
 */

import fs from "node:fs";
import path from "node:path";
import {
  loadRirikkuData,
  loadAdditionalData,
  loadConsolidatedData,
  type ConsolidatedWord,
} from "../src/lib/data-loader";

import { loadKaishiData } from "../src/lib/data-loader-v1";

import { SORT_ORDERS } from "../src/lib/sort-orders";
import { getBucketTier } from "../src/lib/tier";

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

// Map single-letter tier codes from V2 data to full tier names
const TIER_CODE_MAP: Record<string, string> = {
  B: "BASIC",
  C: "COMMON",
  F: "FLUENT",
  A: "ADVANCED",
  U: "UNRANKED",
};

// ─── Types ──────────────────────────────────────────────────────────────────

interface EnrichedWord {
  word: string;
  hiragana: string;
  jlpt: number; // -1 if not in JLPT
  kaishi: boolean;
  kaishiOrder: number; // -1 if not in Kaishi
  ririkkuRank: number;
  ririkkuTier: string; // BASIC, COMMON, FLUENT, ADVANCED, UNRANKED
  english: string; // "-" if none
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

function isKatakanaWord(word: string): boolean {
  return /^[\u30A0-\u30FF\uFF65-\uFF9F]+$/.test(word);
}

function isJapaneseWord(word: string): boolean {
  if (!word) return false;
  if (/[a-zA-Z]/.test(word)) return false;
  const ch = word.codePointAt(0)!;
  if (ch >= 0x3041 && ch <= 0x3096) return true;
  if (ch >= 0x30a1 && ch <= 0x30fa) return true;
  if (ch >= 0xff66 && ch <= 0xff9d) return true;
  if (ch >= 0x4e00 && ch <= 0x9fff) return true;
  if (ch >= 0x3400 && ch <= 0x4dbf) return true;
  if (ch >= 0xf900 && ch <= 0xfaff) return true;
  if (ch === 0x3005 || ch === 0x3007) return true;
  return false;
}

// ─── Main ───────────────────────────────────────────────────────────────────

function main() {
  const t0 = Date.now();
  console.log("Loading V2 data...");

  const ririkkuWords = loadRirikkuData();
  const additionalData = loadAdditionalData();
  const consolidatedData = loadConsolidatedData();

  console.log(`  RIRIKKU: ${ririkkuWords.length} words`);
  console.log(`  Additional: ${additionalData.size} words`);
  console.log(`  Other ranks: ${consolidatedData.size} words`);

  const kaishiData = loadKaishiData();
  console.log(`  Kaishi: ${kaishiData.entries.length} entries`);

  // Build a fast lookup for Kaishi by word+reading
  const kaishiLookup = new Map<string, number>();
  for (const entry of kaishiData.entries) {
    kaishiLookup.set(`${entry.word}|${entry.reading}`, entry.order);
  }

  // Enrich words and filter to Japanese-only

  // Enrich words
  const allEnriched: EnrichedWord[] = ririkkuWords.map((rw) => {
    const key = `${rw.word}|${rw.hiragana}`;
    const extra = additionalData.get(key);

    const kaishiKey = `${rw.word}|${rw.hiragana}`;
    const kaishiOrder = kaishiLookup.get(kaishiKey) ?? -1;

    return {
      word: rw.word,
      hiragana: rw.hiragana,
      jlpt: extra?.jlpt ?? -1,
      kaishi: kaishiOrder >= 0,
      kaishiOrder,
      ririkkuRank: rw.RIRIKKU_RANK,
      ririkkuTier: TIER_CODE_MAP[rw.RIRIKKU_TIER] ?? "UNRANKED",
      english: extra?.english ?? "-",
      ranks: rw.ranks,
    };
  });

  const enriched = allEnriched.filter((w) => isJapaneseWord(w.word));
  console.log(
    `  Filtered: ${allEnriched.length} → ${enriched.length} (removed ${allEnriched.length - enriched.length} non-Japanese entries)`,
  );

  // Clean output directory
  if (fs.existsSync(OUTPUT_DIR)) {
    fs.rmSync(OUTPUT_DIR, { recursive: true });
  }

  generateSortedPages(enriched);
  generateFilteredSortedPages(enriched);
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

    writeJson(path.join(dir, "meta.json"), {
      totalPages,
      totalItems: sorted.length,
      itemsPerPage: PAGE_SIZE,
    });

    for (let page = 1; page <= totalPages; page++) {
      const start = (page - 1) * PAGE_SIZE;
      const pageItems = sorted.slice(start, start + PAGE_SIZE);

      const items = pageItems.map((w) => {
        const item: Record<string, unknown> = {
          word: w.word,
          reading: w.hiragana,
          tier: getBucketTier(w.ranks),
        };
        if (w.jlpt !== -1) item.jlpt = w.jlpt;
        if (w.kaishi) item.kaishi = true;
        if (w.english !== "-") item.english = w.english;

        const rk: Record<string, number> = {};
        for (const key of DEFAULT_BADGE_KEYS) {
          const val = w.ranks[key];
          if (val != null && val !== -1) rk[key] = val;
        }
        if (Object.keys(rk).length > 0) item.ranks = rk;

        return item;
      });

      writeJson(path.join(dir, `${page}.json`), { page, items });
    }

    console.log(`  ${sortOrder.key}: ${totalPages} pages`);
  }
}

// ─── Filtered Sorted Pages ──────────────────────────────────────────────────

function generateFilteredSortedPages(words: EnrichedWord[]) {
  const filters: { key: string; fn: (w: EnrichedWord) => boolean }[] = [
    { key: "katakana", fn: (w) => isKatakanaWord(w.word) },
    { key: "non-katakana", fn: (w) => !isKatakanaWord(w.word) },
  ];

  for (const filter of filters) {
    const filtered = words.filter(filter.fn);
    console.log(
      `\nGenerating filtered sorted pages (${filter.key}: ${filtered.length} words)...`,
    );

    for (const sortOrder of SORT_ORDERS) {
      const sorted = sortWords(filtered, sortOrder.key);
      const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
      const dir = path.join(
        OUTPUT_DIR,
        "filtered",
        filter.key,
        "sorted",
        sortOrder.key,
      );

      writeJson(path.join(dir, "meta.json"), {
        totalPages,
        totalItems: sorted.length,
        itemsPerPage: PAGE_SIZE,
      });

      for (let page = 1; page <= totalPages; page++) {
        const start = (page - 1) * PAGE_SIZE;
        const pageItems = sorted.slice(start, start + PAGE_SIZE);

        const items = pageItems.map((w) => {
          const item: Record<string, unknown> = {
            word: w.word,
            reading: w.hiragana,
            tier: getBucketTier(w.ranks),
          };
          if (w.jlpt !== -1) item.jlpt = w.jlpt;
          if (w.kaishi) item.kaishi = true;
          if (w.english !== "-") item.english = w.english;

          const rk: Record<string, number> = {};
          for (const key of DEFAULT_BADGE_KEYS) {
            const val = w.ranks[key];
            if (val != null && val !== -1) rk[key] = val;
          }
          if (Object.keys(rk).length > 0) item.ranks = rk;

          return item;
        });

        writeJson(path.join(dir, `${page}.json`), { page, items });
      }

      console.log(`  ${filter.key}/${sortOrder.key}: ${totalPages} pages`);
    }
  }
}

function sortWords(words: EnrichedWord[], sortKey: string): EnrichedWord[] {
  const copy = [...words];

  if (sortKey === "JLPT") {
    copy.sort((a, b) => {
      const aJlpt = a.jlpt > 0 ? a.jlpt : null;
      const bJlpt = b.jlpt > 0 ? b.jlpt : null;
      const aGroup = aJlpt ? 6 - aJlpt : 6;
      const bGroup = bJlpt ? 6 - bJlpt : 6;
      if (aGroup !== bGroup) return aGroup - bGroup;
      return a.ririkkuRank - b.ririkkuRank;
    });
  } else if (sortKey === "KAISHI") {
    copy.sort((a, b) => {
      if (a.kaishi && !b.kaishi) return -1;
      if (!a.kaishi && b.kaishi) return 1;
      if (a.kaishi && b.kaishi) return a.kaishiOrder - b.kaishiOrder;
      return a.ririkkuRank - b.ririkkuRank;
    });
  } else {
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
        tier: getBucketTier(e.ranks),
        ranks: e.ranks,
      };
      if (e.jlpt !== -1) item.jlpt = e.jlpt;
      if (e.kaishi) item.kaishi = true;
      if (e.english !== "-") item.english = e.english;
      if (consolidatedEntry) item.detailRanks = consolidatedEntry.ranks;

      return item;
    });

    writeJson(filePath, data);
    count++;
  }

  console.log(`  ${count} word files`);
}

// ─── Search Indices ─────────────────────────────────────────────────────────

interface SearchEntry {
  w: string; // word
  r: string; // reading
  j?: number; // JLPT level (omitted if -1)
  k?: 1; // kaishi (omitted if not included)
  t: string; // tier emoji
  e?: string; // english (omitted if "-")
}

const TIER_EMOJI: Record<string, string> = {
  BASIC: "🌱",
  COMMON: "☘️",
  FLUENT: "🌷",
  ADVANCED: "📚",
  UNRANKED: "🦉",
};

function toSearchEntry(w: EnrichedWord): SearchEntry {
  const tier = getBucketTier(w.ranks);
  const entry: SearchEntry = {
    w: w.word,
    r: w.hiragana,
    t: TIER_EMOJI[tier] ?? "🦉",
  };
  if (w.jlpt > 0) entry.j = w.jlpt;
  if (w.kaishi) entry.k = 1;
  if (w.english !== "-") entry.e = w.english;
  return entry;
}

function searchEntryScore(entry: SearchEntry): number {
  let s = 0;
  if (entry.k != null && entry.k >= 1) s += 500;
  if (entry.e && entry.e !== "-") s += 300;
  const jlptScore: Record<number, number> = { 5: 200, 4: 160, 3: 80, 2: 40, 1: 20 };
  s += jlptScore[entry.j ?? -1] ?? 0;
  const freqScore: Record<string, number> = { "🌱": 60, "☘️": 50, "🌷": 30, "📚": 10, "🦉": 0 };
  s += freqScore[entry.t] ?? 0;
  return s;
}

function generateSearchIndices(words: EnrichedWord[]) {
  console.log("\nGenerating search indices...");

  // Pre-sort by RIRIKKU_RANK so ties in score preserve frequency order
  const sorted = [...words].sort((a, b) => {
    if (a.ririkkuRank === -1 && b.ririkkuRank === -1) return 0;
    if (a.ririkkuRank === -1) return 1;
    if (b.ririkkuRank === -1) return -1;
    return a.ririkkuRank - b.ririkkuRank;
  });

  // By reading (first hiragana character)
  const byReading = new Map<string, SearchEntry[]>();
  for (const w of sorted) {
    const firstChar = w.hiragana.charAt(0);
    if (!firstChar) continue;
    const list = byReading.get(firstChar) ?? [];
    list.push(toSearchEntry(w));
    byReading.set(firstChar, list);
  }

  for (const [char, entries] of byReading) {
    entries.sort((a, b) => searchEntryScore(b) - searchEntryScore(a));
    writeJson(
      path.join(OUTPUT_DIR, "search", "reading", `${char}.json`),
      entries,
    );
  }
  console.log(`  ${byReading.size} reading index files`);

  // By word (first character of word)
  const byWord = new Map<string, SearchEntry[]>();
  for (const w of sorted) {
    const firstChar = w.word.charAt(0);
    if (!firstChar) continue;
    const list = byWord.get(firstChar) ?? [];
    list.push(toSearchEntry(w));
    byWord.set(firstChar, list);
  }

  for (const [char, entries] of byWord) {
    entries.sort((a, b) => searchEntryScore(b) - searchEntryScore(a));
    writeJson(path.join(OUTPUT_DIR, "search", "word", `${char}.json`), entries);
  }
  console.log(`  ${byWord.size} word index files`);
}

// ─── Run ────────────────────────────────────────────────────────────────────

main();
