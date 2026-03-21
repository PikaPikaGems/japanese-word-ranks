# Website Data Architecture

No SSG for individual pages. Instead, build pre-computed JSON data files at Astro build time into `public/api/`. The site has two HTML shell pages that fetch JSON client-side.

## Pages

| Page | URL | Behavior |
|---|---|---|
| Word list | `/?sort=JLPT&page=1&filter=katakana` | Fetches one sorted page JSON (optionally filtered), renders word cards client-side |
| Word detail | `/word?w=食べる` | Fetches one word JSON, renders detail view client-side |

## Pre-built JSON Files

### 1. Sorted word lists (paginated, 100 items per page)

```
api/sorted/{sortKey}/{page}.json
```

- ~20 sort orders x ~885 pages = ~17,700 files
- ~5 KB each
- Contains an array of word card data: `[word, hiragana, jlpt, isKaishi, { rank1, rank2, ... }]`
- One file fetched per page view
- Switching sort order or page = one small fetch

### 1b. Filtered sorted word lists (paginated, 100 items per page)

```
api/filtered/{filterKey}/sorted/{sortKey}/{page}.json
```

- Filter keys: `katakana` (words written entirely in katakana), `non-katakana` (everything else)
- Same format and sort logic as unfiltered lists
- 2 filters x ~20 sort orders x variable pages
- When filter is "all", the client fetches from the unfiltered endpoint

### 2. Word detail files (one per word)

```
api/words/{firstChar}/{word}.json
```

- ~92k files, bucketed by first character to avoid filesystem slowdown
- ~1-2 KB each
- Contains all data for one word: JLPT, Kaishi, all frequency ranks (75+ columns from consolidated.csv if available, otherwise from RIRIKKU_CONSOLIDATED.csv)
- Used by the word detail page

### 3. Search index (by reading, for typeahead)

```
api/search/reading/{kana}.json
```

- ~70 files (one per first hiragana character: あ, い, う, ... が, ぎ, ...)
- ~10-50 KB each
- Array of `[word, hiragana]` sorted by RIRIKKU_RANK ascending (most frequent first)
- Fetched when user types first character in search (romaji is converted to kana client-side before fetching)
- Typeahead shows 5-10 suggestions at a time

### 4. Search index (by kanji/word, for typeahead)

```
api/search/word/{char}.json
```

- ~3-4k files (one per first character of word)
- Same format as reading search: `[word, hiragana]` sorted by RIRIKKU_RANK
- Fetched when user types a kanji character directly

## Search Behavior

- User types romaji (e.g. "ta") -> client converts to kana ("た") -> fetches `api/search/reading/た.json` -> prefix match -> show top 5-10 results
- User types kana (e.g. "た") -> fetches `api/search/reading/た.json` -> prefix match -> show top 5-10 results
- User types kanji (e.g. "食") -> fetches `api/search/word/食.json` -> prefix match -> show top 5-10 results
- Results sorted by RIRIKKU_RANK (most frequent words suggested first)

## Why This Architecture

- **No SSG for word pages**: Only frequency data, no SEO value. Can revisit if more content is added later.
- **No SSG for list pages**: Client-side rendering with JSON fetches is fast and avoids building ~110k HTML pages.
- **Bucketed files**: Avoids large downloads (a single 92k-entry JSON would be 5-7 MB) and filesystem performance issues with too many files in one directory.
- **Pre-sorted and pre-paginated**: No client-side sorting of 92k items. Each page is a small pre-computed JSON file.
- **Split search index**: No need to load all 92k words for search. Fetch only the relevant character's file (~1-3k entries).

## Deployment

GitHub Pages (static files only). Build once, deploy, never rebuild unless data changes.

## File Count Estimate

| Type | Count | Size each | Total |
|---|---|---|---|
| Sorted pages | ~17,700 | ~5 KB | ~90 MB |
| Filtered sorted pages | ~35,400 | ~5 KB | ~180 MB |
| Word detail | ~92,000 | ~1-2 KB | ~100-180 MB |
| Search (reading) | ~70 | ~10-50 KB | ~1-3 MB |
| Search (word) | ~3-4k | ~5-30 KB | ~15-60 MB |
| **Total** | | | **~385-510 MB** |
