/**
 * Build-time data loading utilities (V2).
 * Parses V2 CSV/TSV data files from data/V2/ into structured data for page generation.
 */

import fs from "node:fs";
import path from "node:path";
import Papa from "papaparse";
import { FREQUENCY_COLUMN_KEYS } from "./sort-orders";

const DATA_DIR = path.resolve("data/V2");

// V2 CSV renamed some columns; map code-expected names → CSV column names
const COLUMN_ALIAS: Record<string, string> = {
  CC100_rank: "CC100",
};

// ─── Types ───────────────────────────────────────────────────────────────────

export interface RirikkuWord {
  word: string;
  hiragana: string;
  katakana: string;
  RIRIKKU_RANK: number;
  RIRIKKU_TIER: string; // B, C, F, A, U
  ranks: Record<string, number>; // column key → rank (-1 = absent)
}

export interface AdditionalData {
  furigana: string; // "-" if none
  jlpt: number; // -1 if not in JLPT
  kaishi: number; // 1 = yes, 0 = no
  english: string; // "-" if none
}

export interface ConsolidatedWord {
  word: string;
  hiragana: string;
  ranks: Record<string, number>; // all columns from other_ranks
}

// ─── RIRIKKU_CONSOLIDATED_V2.csv ────────────────────────────────────────────

let _ririkkuCache: RirikkuWord[] | null = null;

export function loadRirikkuData(): RirikkuWord[] {
  if (_ririkkuCache) return _ririkkuCache;

  const csvPath = path.join(DATA_DIR, "RIRIKKU_CONSOLIDATED_V2.csv");
  const csvText = fs.readFileSync(csvPath, "utf-8");
  const parsed = Papa.parse<Record<string, string>>(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  _ririkkuCache = parsed.data.map((row) => {
    const ranks: Record<string, number> = {};
    for (const key of FREQUENCY_COLUMN_KEYS) {
      const csvCol = COLUMN_ALIAS[key] ?? key;
      const v = parseInt(row[csvCol] ?? "-1", 10);
      ranks[key] = isNaN(v) ? -1 : v;
    }
    const ririkkuRank = parseInt(row.RIRIKKU_RANK ?? "-1", 10);
    return {
      word: row.word,
      hiragana: row.hiragana,
      katakana: row.katakana,
      RIRIKKU_RANK: isNaN(ririkkuRank) ? -1 : ririkkuRank,
      RIRIKKU_TIER: row.RIRIKKU_TIER ?? "U",
      ranks,
    };
  });

  return _ririkkuCache ?? [];
}

// ─── RIRIKKU_CONSOLIDATED_V2_additional_data.tsv ────────────────────────────

let _additionalCache: Map<string, AdditionalData> | null = null;

export function loadAdditionalData(): Map<string, AdditionalData> {
  if (_additionalCache) return _additionalCache;

  const tsvPath = path.join(
    DATA_DIR,
    "RIRIKKU_CONSOLIDATED_V2_additional_data.tsv",
  );
  const tsvText = fs.readFileSync(tsvPath, "utf-8");
  const parsed = Papa.parse<Record<string, string>>(tsvText, {
    header: true,
    skipEmptyLines: true,
    delimiter: "\t",
  });

  _additionalCache = new Map();
  for (const row of parsed.data) {
    const key = `${row.word}|${row.hiragana}`;
    _additionalCache.set(key, {
      furigana: row.furigana ?? "-",
      jlpt: parseInt(row.JLPT ?? "-1", 10),
      kaishi: parseInt(row.kaishi ?? "0", 10),
      english: row.english ?? "-",
    });
  }

  return _additionalCache;
}

// ─── RIRIKKU_CONSOLIDATED_V2_other_ranks.csv (full detail ranks) ────────────

let _otherRanksCache: Map<string, ConsolidatedWord> | null = null;

export function loadConsolidatedData(): Map<string, ConsolidatedWord> {
  if (_otherRanksCache) return _otherRanksCache;

  const csvPath = path.join(
    DATA_DIR,
    "RIRIKKU_CONSOLIDATED_V2_other_ranks.csv",
  );
  const csvText = fs.readFileSync(csvPath, "utf-8");
  const parsed = Papa.parse<Record<string, string>>(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  _otherRanksCache = new Map();
  for (const row of parsed.data) {
    const word = row.word;
    const hiragana = row.hiragana;
    const ranks: Record<string, number> = {};

    for (const key of Object.keys(row)) {
      if (key === "word" || key === "hiragana") continue;
      const v = parseInt(row[key] ?? "-1", 10);
      ranks[key] = isNaN(v) ? -1 : v;
    }

    const mapKey = `${word}|${hiragana}`;
    _otherRanksCache.set(mapKey, { word, hiragana, ranks });
  }

  return _otherRanksCache;
}
