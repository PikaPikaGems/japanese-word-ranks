# Generating JSON Data Files

## Overview

The website loads pre-computed JSON files at runtime instead of using SSG. A build script reads the source CSV/JSON/TXT files and outputs structured JSON into `public/api/`.

## Source Input Files

| File                                                    | Format | Description                                                                                                         |
| ------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------- |
| `data/frequency/selected-freq/RIRIKKU_CONSOLIDATED.csv` | CSV    | Master word list (~92k words). Columns: `word`, `hiragana`, `katakana`, `RIRIKKU_RANK`, + 19 frequency rank columns |
| `data/frequency/top25k-all-freq/consolidated.csv`       | CSV    | Full frequency detail (~24.6k words, 75+ columns). Used for word detail pages                                       |
| `data/jlpt/word_jlpt.json`                              | JSON   | JLPT levels. Format: `{ "食べる": "5", "走る": "4", ... }`                                                          |
| `data/kaishi/kaishi_1500.txt`                           | TXT    | Kaishi 1500 vocabulary. Kanji lines followed by hiragana reading; pure-kana lines are standalone                    |

## How to Generate

```bash
# From project root:
npx tsx scripts/build-json.ts
```

Or use the npm script:

```bash
npm run build:data
```

The full build (`npm run build`) runs this automatically before the Astro build.

## Output Structure

All files are written to `public/api/` which Astro serves as static files.

### 1. Sorted Word Lists

#### Metadata — `api/sorted/{sortKey}/meta.json`

One file per sort order (20 files total). Fetched once on first load for pagination controls.

```json
{
  "totalPages": 922,
  "totalItems": 92171,
  "itemsPerPage": 100
}

// NOTE: After removing non-japanese characters and punctuation marks. It's down to 88,411 words, 885 pages per sort order, 158 reading index files, 3,713 word index files.
```

#### Pages — `api/sorted/{sortKey}/{page}.json`

Pre-sorted and pre-paginated word card data.

**Sort keys** (20 total): `JLPT`, `KAISHI`, `RSPEER`, `cejc_combined_rank`, `cejc_small_talk_rank`, `BCCWJ_LUW`, `BCCWJ_SUW`, `CC100`, `MALTESAA_NWJC`, `JITEN_GLOBAL`, `JITEN_DRAMA`, `ANIME_JDRAMA`, `YOUTUBE_FREQ_V3`, `NETFLIX`, `DD2_MORPHMAN_NETFLIX`, `WIKIPEDIA_V2`, `ADNO`, `DD2_MORPHMAN_SOL`, `JITEN_ANIME_V2`, `MALTESAA_CSJ`

**Sort logic:**

- Frequency columns: ascending rank (1 first), `-1` (absent) sorted to end, ties broken by RIRIKKU_RANK
- JLPT: N5 → N4 → N3 → N2 → N1 → untagged, sub-sorted by RIRIKKU_RANK
- Kaishi: Kaishi words first (original file order), then rest by RIRIKKU_RANK

**Page file format:**

```json
{
  "page": 3,
  "items": [
    {
      "word": "食べる",
      "reading": "たべる",
      "jlpt": 5,
      "kaishi": true,
      "ranks": { "BCCWJ_LUW": 1234, "NETFLIX": 567 }
    }
  ]
}
```

- `jlpt` omitted if word has no JLPT level
- `kaishi` omitted if false
- `ranks` only includes the 6 default badge keys with non-(-1) values: `BCCWJ_LUW`, `cejc_small_talk_rank`, `JITEN_DRAMA`, `NETFLIX`, `WIKIPEDIA_V2`, `DD2_MORPHMAN_SOL`

**Count:** 20 metadata files + ~20 sort orders x ~922 pages = ~18,460 files

### 2. Word Detail — `api/words/{firstChar}/{word}.json`

Full data for a single word, used by the word detail page. Bucketed by first character.

**File format:** Array (one entry per reading of the word)

```json
[
  {
    "reading": "たべる",
    "ririkkuRank": 45,
    "jlpt": 5,
    "kaishi": true,
    "ranks": { "BCCWJ_LUW": 1234, "CC100": 456, ... },
    "detailRanks": { "CC100_rank": 173, "BCCWJ_LUW_rank": 234, ... }
  }
]
```

- `ranks`: All 19 frequency columns from RIRIKKU_CONSOLIDATED.csv
- `detailRanks`: All 75+ columns from consolidated.csv (null if word not in consolidated.csv)
- `jlpt` and `kaishi` omitted if not applicable

**Count:** ~92k files (one per unique word form)

### 3. Search Index by Reading — `api/search/reading/{kana}.json`

Typeahead index keyed by first hiragana character. Sorted by RIRIKKU_RANK (most frequent first).

**File format:**

```json
[
  ["食べる", "たべる"],
  ["立つ", "たつ"],
  ["助ける", "たすける"]
]
```

**Count:** ~168 files (one per unique first-hiragana character)

### 4. Search Index by Word — `api/search/word/{char}.json`

Typeahead index keyed by first character of word. Sorted by RIRIKKU_RANK.

Same format as reading index. Used when user types kanji directly.

**Count:** ~4,000 files (one per unique first character)

## Total Output

| Type             | Files    | Size        |
| ---------------- | -------- | ----------- |
| Sorted pages     | ~18,440  | ~193 MB     |
| Word detail      | ~92,000  | ~357 MB     |
| Search (reading) | ~168     | ~10 MB      |
| Search (word)    | ~4,000   | ~9 MB       |
| **Total**        | ~114,600 | **~570 MB** |

## Script Location

`scripts/build-json.ts` — uses the data loaders in `src/lib/data-loader.ts` and sort order definitions in `src/lib/sort-orders.ts`.
