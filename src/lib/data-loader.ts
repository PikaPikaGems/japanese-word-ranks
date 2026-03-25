/**
 * Build-time data loading utilities.
 * Parses all CSV/JSON/TXT data files into structured data for page generation.
 */

import fs from "node:fs";
import path from "node:path";
import Papa from "papaparse";
import { FREQUENCY_COLUMN_KEYS } from "./sort-orders";

const DATA_DIR = path.resolve("data");

// ─── Types ───────────────────────────────────────────────────────────────────

export interface RirikkuWord {
  word: string;
  hiragana: string;
  katakana: string;
  RIRIKKU_RANK: number;
  ranks: Record<string, number>; // column key → rank (-1 = absent)
}

export interface ConsolidatedWord {
  word: string;
  hiragana: string;
  katakana: string;
  ranks: Record<string, number>; // all 75+ columns
}

// ─── RIRIKKU_CONSOLIDATED.csv ────────────────────────────────────────────────

let _ririkkuCache: RirikkuWord[] | null = null;

export function loadRirikkuData(): RirikkuWord[] {
  if (_ririkkuCache) return _ririkkuCache;

  const csvPath = path.join(DATA_DIR, "frequency/selected-freq/RIRIKKU_CONSOLIDATED_MODIFIED_V1.csv");
  const csvText = fs.readFileSync(csvPath, "utf-8");
  const parsed = Papa.parse<Record<string, string>>(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  _ririkkuCache = parsed.data.map((row) => {
    const ranks: Record<string, number> = {};
    for (const key of FREQUENCY_COLUMN_KEYS) {
      ranks[key] = parseInt(row[key] ?? "-1", 10);
    }
    return {
      word: row.word,
      hiragana: row.hiragana,
      katakana: row.katakana,
      RIRIKKU_RANK: parseInt(row.RIRIKKU_RANK ?? "-1", 10),
      ranks,
    };
  });

  return _ririkkuCache;
}

// ─── consolidated.csv (full 75+ columns) ─────────────────────────────────────

let _consolidatedCache: Map<string, ConsolidatedWord> | null = null;

export function loadConsolidatedData(): Map<string, ConsolidatedWord> {
  if (_consolidatedCache) return _consolidatedCache;

  const csvPath = path.join(DATA_DIR, "frequency/top25k-all-freq/consolidated.csv");
  const csvText = fs.readFileSync(csvPath, "utf-8");
  const parsed = Papa.parse<Record<string, string>>(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  _consolidatedCache = new Map();
  for (const row of parsed.data) {
    const word = row.word;
    const hiragana = row.hiragana;
    const ranks: Record<string, number> = {};

    for (const key of Object.keys(row)) {
      if (key === "word" || key === "hiragana" || key === "katakana") continue;
      ranks[key] = parseInt(row[key] ?? "-1", 10);
    }

    // Key by "word|hiragana" to handle words with multiple readings (e.g. 人/ひと vs 人/じん)
    const mapKey = `${word}|${hiragana}`;
    _consolidatedCache.set(mapKey, {
      word,
      hiragana,
      katakana: row.katakana,
      ranks,
    });
  }

  return _consolidatedCache;
}

// ─── JLPT data ───────────────────────────────────────────────────────────────

let _jlptCache: Map<string, number> | null = null;

export function loadJlptData(): Map<string, number> {
  if (_jlptCache) return _jlptCache;

  const jsonPath = path.join(DATA_DIR, "jlpt/word_jlpt.json");
  const jsonText = fs.readFileSync(jsonPath, "utf-8");
  const data: Record<string, string> = JSON.parse(jsonText);

  _jlptCache = new Map();
  for (const [word, level] of Object.entries(data)) {
    _jlptCache.set(word, parseInt(level, 10));
  }

  return _jlptCache;
}

// ─── Kaishi data ─────────────────────────────────────────────────────────────

export interface KaishiEntry {
  word: string;
  reading: string;
  order: number; // 0-based position in the file
}

let _kaishiCache: { entries: KaishiEntry[]; wordSet: Set<string> } | null = null;

/**
 * Parse kaishi_1500.txt.
 *
 * Format:
 * - If a line contains kanji, the NEXT line is its single hiragana reading.
 * - If a line is pure kana, it is a standalone word (word = reading).
 * - One reading per kanji word, always.
 */
export function loadKaishiData(): { entries: KaishiEntry[]; wordSet: Set<string> } {
  if (_kaishiCache) return _kaishiCache;

  const txtPath = path.join(DATA_DIR, "kaishi/kaishi_1500.txt");
  const lines = fs.readFileSync(txtPath, "utf-8").split("\n").filter((l) => l.trim() !== "");

  const entries: KaishiEntry[] = [];
  const wordSet = new Set<string>();
  let order = 0;
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    if (hasKanji(line)) {
      // Kanji word — next line is its single reading
      const reading = (i + 1 < lines.length) ? lines[i + 1].trim() : line;
      entries.push({ word: line, reading, order: order++ });
      wordSet.add(line);
      i += 2; // skip word + reading
    } else {
      // Pure kana — standalone word
      entries.push({ word: line, reading: line, order: order++ });
      wordSet.add(line);
      i++;
    }
  }

  _kaishiCache = { entries, wordSet };
  return _kaishiCache;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function hasKanji(str: string): boolean {
  // CJK Unified Ideographs range
  return /[\u4e00-\u9faf\u3400-\u4dbf]/.test(str);
}

function isPureHiragana(str: string): boolean {
  // Hiragana range + common marks (ー, punctuation)
  return /^[\u3040-\u309f\u30fc]+$/.test(str);
}
