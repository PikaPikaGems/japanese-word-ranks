/**
 * Generates RIRIKKU_CONSOLIDATED_MODIFIED_V1.csv from:
 *   - data/frequency/selected-freq/RIRIKKU_CONSOLIDATED.csv (base)
 *   - data/frequency/top25k-all-freq/consolidated.csv (source for extra columns)
 *
 * Modifications:
 *   1. Renames column CC100 → CC100_rank (to match the full consolidated CSV)
 *   2. Adds DD2_MIGAKU_NETFLIX column (joined by word+hiragana from full consolidated CSV)
 *
 * Run with: npx tsx scripts/build-ririkku-modified.ts
 */

import fs from "node:fs";
import path from "node:path";
import Papa from "papaparse";

const DATA_DIR = path.resolve("data");
const RIRIKKU_PATH = path.join(DATA_DIR, "frequency/selected-freq/RIRIKKU_CONSOLIDATED.csv");
const CONSOLIDATED_PATH = path.join(DATA_DIR, "frequency/top25k-all-freq/consolidated.csv");
const OUTPUT_PATH = path.join(DATA_DIR, "frequency/selected-freq/RIRIKKU_CONSOLIDATED_MODIFIED_V1.csv");

// ─── Load full consolidated CSV to build DD2_MIGAKU_NETFLIX lookup ───────────

const consolidatedText = fs.readFileSync(CONSOLIDATED_PATH, "utf-8");
const consolidatedParsed = Papa.parse<Record<string, string>>(consolidatedText, {
  header: true,
  skipEmptyLines: true,
});

const migakuLookup = new Map<string, string>();
for (const row of consolidatedParsed.data) {
  const key = `${row.word}|${row.hiragana}`;
  const val = row.DD2_MIGAKU_NETFLIX ?? "";
  if (val) migakuLookup.set(key, val);
}

console.log(`Loaded ${migakuLookup.size} DD2_MIGAKU_NETFLIX entries from consolidated.csv`);

// ─── Load RIRIKKU_CONSOLIDATED, apply modifications, write output ────────────

const ririkkuText = fs.readFileSync(RIRIKKU_PATH, "utf-8");
const ririkkuParsed = Papa.parse<Record<string, string>>(ririkkuText, {
  header: true,
  skipEmptyLines: true,
});

const oldFields = ririkkuParsed.meta.fields!;
// Rename CC100 → CC100_rank
const newFields = oldFields.map((f) => (f === "CC100" ? "CC100_rank" : f));
// Add DD2_MIGAKU_NETFLIX
newFields.push("DD2_MIGAKU_NETFLIX");

const rows: string[][] = [];
let matched = 0;

for (const row of ririkkuParsed.data) {
  const key = `${row.word}|${row.hiragana}`;
  const migakuVal = migakuLookup.get(key) ?? "";
  if (migakuVal) matched++;

  const values = oldFields.map((f) => row[f] ?? "");
  values.push(migakuVal);
  rows.push(values);
}

const output = Papa.unparse({ fields: newFields, data: rows });
fs.writeFileSync(OUTPUT_PATH, output + "\n");

console.log(`Rows: ${rows.length}`);
console.log(`DD2_MIGAKU_NETFLIX matched: ${matched}`);
console.log(`Written to: ${OUTPUT_PATH}`);
