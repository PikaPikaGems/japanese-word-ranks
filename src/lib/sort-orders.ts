/**
 * Sort order definitions. Each sort order has a key (matching a CSV column or special key),
 * a human-friendly label, and a short description.
 *
 * The 18 frequency columns come from RIRIKKU_CONSOLIDATED.csv (excluding RIRIKKU_RANK).
 * JLPT and Kaishi are supplementary sort orders.
 */

export interface SortOrder {
  key: string;
  label: string;
  description: string;
}

export const SORT_ORDERS: SortOrder[] = [
  // Supplementary
  {
    key: "JLPT",
    label: "JLPT Level",
    description:
      "Japanese Language Proficiency Test level (N5 easiest → N1 hardest)",
  },
  {
    key: "KAISHI",
    label: "Kaishi 1500",
    description: "Beginner vocabulary order from the Kaishi 1500 deck",
  },

  // Shortlisted frequency sources (16 included in RIRIKKU_RANK computation)
  {
    key: "RSPEER",
    label: "WordFreq (RSPEER)",
    description:
      "Multi-source aggregate (Wikipedia, subtitles, news, books, web, Twitter/Reddit). Frozen ~2021.",
  },
  {
    key: "cejc_combined_rank",
    label: "CEJC Combined",
    description: "Everyday spoken Japanese — all conversations combined.",
  },
  {
    key: "cejc_small_talk_rank",
    label: "CEJC Small Talk",
    description: "Everyday spoken Japanese — casual small talk only (雑談).",
  },
  {
    key: "BCCWJ_LUW",
    label: "BCCWJ (Long Unit)",
    description:
      "Japan's official balanced written corpus (104M words, 1976–2006). Compound words as units.",
  },
  {
    key: "BCCWJ_SUW",
    label: "BCCWJ (Short Unit)",
    description:
      "Same BCCWJ corpus, short unit word tokenization. Particles dominate top ranks.",
  },
  {
    key: "CC100",
    label: "CC100 (Web)",
    description:
      "Filtered Japanese web text (~2020, ~70 GB). Broad contemporary vocabulary.",
  },
  {
    key: "MALTESAA_NWJC",
    label: "NWJC (Web Corpus)",
    description: "Web Japanese Corpus (~25.8B tokens, crawled 2014–2017).",
  },
  {
    key: "JITEN_GLOBAL",
    label: "Jiten Global",
    description:
      "All jiten.moe media categories combined (~430k source entries).",
  },
  {
    key: "JITEN_DRAMA",
    label: "Jiten Drama",
    description: "Japanese drama frequency (~217k source entries).",
  },
  {
    key: "ANIME_JDRAMA",
    label: "Anime + J-Drama",
    description: "Anime and J-drama subtitles (~100k entries). Widely cited.",
  },
  {
    key: "YOUTUBE_FREQ_V3",
    label: "YouTube V3",
    description:
      "Manually transcribed YouTube across 16 spoken domains (~187k entries).",
  },
  {
    key: "NETFLIX",
    label: "Netflix",
    description:
      "Netflix Japan subtitles — anime + drama + live-action (~129k entries).",
  },
  {
    key: "DD2_MORPHMAN_NETFLIX",
    label: "Netflix (Clean)",
    description:
      "Netflix subtitles, proper names excluded, cleaner lemmatization (~105k entries).",
  },
  {
    key: "WIKIPEDIA_V2",
    label: "Wikipedia V2",
    description:
      "Community-built Wikipedia frequency dictionary (~850k source entries).",
  },
  {
    key: "ADNO",
    label: "ADNO (Wikipedia)",
    description: "Wikipedia (Oct 2022 dump, cleaned), carefully filtered.",
  },
  {
    key: "DD2_MORPHMAN_SOL",
    label: "Slice-of-Life Anime",
    description: "Slice-of-Life anime, Morphman/UniDic format (~45k entries).",
  },

  // Additional columns in RIRIKKU CSV but not in rank computation
  {
    key: "JITEN_ANIME_V2",
    label: "Jiten Anime V2",
    description:
      "Anime — direct CSV export from jiten.moe. Most recent anime list.",
  },
  {
    key: "MALTESAA_CSJ",
    label: "CSJ (Spoken Academic)",
    description:
      "Corpus of Spontaneous Japanese — primarily formal academic speech (~7M words).",
  },
];

/** All frequency column keys from RIRIKKU_CONSOLIDATED.csv (excludes RIRIKKU_RANK, word, hiragana, katakana) */
export const FREQUENCY_COLUMN_KEYS = SORT_ORDERS.filter(
  (s) => s.key !== "JLPT" && s.key !== "KAISHI",
).map((s) => s.key);

/** Lookup sort order by key */
export const SORT_ORDER_MAP = new Map(SORT_ORDERS.map((s) => [s.key, s]));
