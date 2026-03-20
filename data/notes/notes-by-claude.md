Design a detailed implementation plan for a Japanese Word Frequency Rank Lookup website. Here's the full context:

## Project State

- Fresh project at /Users/mithi/Desktop/PikaPikaGems/japanese-word-frequency-website/
- Only files: README.md, LICENSE, .git/, data/ directory
- No Astro setup, no src/, no package.json - everything needs to be built from scratch

## Tech Stack

- Astro (Static Site Generation)
- TailwindCSS
- shadcn/ui components
- Lucide Icons
- Vanilla JavaScript as much as possible, React only if absolutely necessary
- English Font: "Avenir Next", fallback "Nunito"
- Japanese Font: Noto Sans JP, Zen Maru Gothic, Klee One

## Data Files Available

1. **data/frequency/selected-freq/RIRIKKU_CONSOLIDATED.csv** (92,172 words, 21 columns):
   - Columns: word, hiragana, katakana, RIRIKKU_RANK, RSPEER, cejc_combined_rank, cejc_small_talk_rank, BCCWJ_LUW, BCCWJ_SUW, CC100, MALTESAA_NWJC, JITEN_GLOBAL, JITEN_DRAMA, ANIME_JDRAMA, YOUTUBE_FREQ_V3, NETFLIX, DD2_MORPHMAN_NETFLIX, WIKIPEDIA_V2, ADNO, DD2_MORPHMAN_SOL (plus more)
   - -1 = word absent from dataset
   - Primary data source for home page

2. **data/frequency/top25k-all-freq/consolidated.csv** (24,606 words, 75+ columns):
   - All frequency datasets for comprehensive word detail pages
   - Same first 3 columns: word, hiragana, katakana
   - Used for word detail page tables

3. **data/jlpt/word_jlpt.json** (7,881 words):
   - JSON mapping: {"だ": "5", "です": "5", ...}
   - JLPT levels 1 (hardest) to 5 (easiest)

4. **data/kaishi/kaishi_1500.txt** (2,818 lines):
   - Alternating lines: word, then reading (hiragana)
   - ~1,409 word-reading pairs

5. **data/frequency/dataset-catalog.md**: Comprehensive catalog of all datasets organized by section/subsection with descriptions - this defines the sections and subsections for the word detail page table.

6. **data/frequency/selected-freq/SINGLE_RANK.md**: Documents the ranking algorithm, tier categories:
   - Type A: BASIC (1–1,800), COMMON (1,801–5,000), FLUENT (5,001–12,000), ADVANCED (12,001–25,000)
   - Type B: BASIC (1–1,000), COMMON (1,001–4,000), FLUENT (4,001–10,000), ADVANCED (10,001–25,000)

## User Decisions

1. **Primary data source**: RIRIKKU_CONSOLIDATED.csv for home page list
2. **Sort orders**: JLPT + Kaishi word order + 16 shortlisted sources (RIRIKKU_RANK NOT included)
3. **Badges**: JLPT level + Kaishi indicator + 16 shortlisted source ranks + more to be added later
4. **Book popover**: Placeholder "INSERT_LINKS_TO_EXTERNAL_DICTIONARY_LATER"
5. **Word detail page**: Full consolidated.csv (75+ datasets) organized by section/subsection from dataset-catalog.md
6. **Romaji search**: Custom romaji-to-kana converter (details to be discussed later)
7. **Scaffolding**: Full scaffold first (Astro + TailwindCSS + shadcn + fonts + icons)

## Pages

### Home Page `/?sort-order=JLPT`

- Fixed TITLE_HEADER banner: "Japanese Word Frequency Rank Lookup"
- Sticky search bar with magnifying glass icon + dice button (random word)
- Sort order combobox + pagination controls
- Ordered list of word cards (100 per page)
- Each word card has: headphones icon (TTS), book icon (popover), big Japanese word (text-7xl), multiple small badges

### Word Page `/word/食べる`

- Same header and search bar
- Single word card (same design as home page card)
- Below card: frequency data table organized by Section > Subsection
- Table columns: Frequency Tier | Dataset Column Name | Frequency Rank | Dataset Description

## Components Needed

1. Pagination
2. SearchCommandInputField (autocomplete/command palette)
3. FrequencyRankSortOrderSelectComponent (combobox)
4. BadgeWithPopover
5. JapaneseWordCardItem

## Key Architecture Considerations

- This is SSG (Static Site Generation) - all data is known at build time
- 92,172 words total - too many to put all on one page. Need to generate paginated static pages
- Search needs client-side JavaScript (can't do server-side in SSG)
- With 92k words, search index needs to be efficient (maybe split into chunks or use a trie)
- Word detail pages: need to generate ~24,606 static pages (one per word from consolidated.csv), plus additional ones for words only in RIRIKKU
- Sort order changes the entire pagination - different sort = different page sets

Please design a comprehensive step-by-step implementation plan covering:

1. Project scaffolding (Astro + TailwindCSS + shadcn + fonts)
2. Data processing pipeline (how to transform CSVs into usable data at build time)
3. Static page generation strategy (how to handle 92k words × multiple sort orders × pagination)
4. Component architecture
5. Search implementation approach
6. Step-by-step build order

Consider that with SSG and ~18 sort orders × ~920 pages each = ~16,560 paginated index pages + ~92,172 word detail pages. Think about whether this is feasible and what optimizations are needed. Maybe client-side sorting/pagination is better than generating all permutations statically.
