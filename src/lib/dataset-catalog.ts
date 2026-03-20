/**
 * Dataset catalog structure derived from data/frequency/dataset-catalog.md.
 * Defines sections, subsections, and individual datasets for the word detail page.
 *
 * Each dataset entry maps to a column in consolidated.csv.
 */

export interface DatasetEntry {
  columnId: string;
  label: string;
  description: string;
  notRecommended?: boolean;
}

export interface DatasetSubsection {
  title: string;
  datasets: DatasetEntry[];
}

export interface DatasetSection {
  title: string;
  subsections: DatasetSubsection[];
}

export const DATASET_CATALOG: DatasetSection[] = [
  // ── Highlighted (Shortlisted) ──────────────────────────────────────────────
  {
    title: "Highlighted (Shortlisted)",
    subsections: [
      {
        title: "",
        datasets: [
          { columnId: "RSPEER", label: "RSPEER", description: "Multi-source aggregate (Wikipedia, subtitles, news, books, web, Twitter/Reddit). Frozen ~2021." },
          { columnId: "cejc_combined_rank", label: "CEJC Combined", description: "Everyday spoken Japanese — all conversations combined." },
          { columnId: "cejc_small_talk_rank", label: "CEJC Small Talk", description: "Everyday spoken Japanese — casual small talk only (雑談)." },
          { columnId: "BCCWJ_LUW", label: "BCCWJ (Long Unit)", description: "Japan's official balanced written corpus (104M words, 1976–2006). Compound words as units." },
          { columnId: "BCCWJ_SUW", label: "BCCWJ (Short Unit)", description: "Same BCCWJ corpus, short unit word tokenization." },
          { columnId: "CC100_rank", label: "CC100", description: "Filtered Japanese web text (~2020, ~70 GB). Broad contemporary vocabulary." },
          { columnId: "MALTESAA_NWJC", label: "NWJC", description: "Web Japanese Corpus (~25.8B tokens, crawled 2014–2017)." },
          { columnId: "MALTESAA_CSJ", label: "CSJ", description: "Corpus of Spontaneous Japanese — all sub-corpora combined (~7M words)." },
          { columnId: "JITEN_GLOBAL", label: "Jiten Global", description: "All jiten.moe media categories combined (~430k source entries)." },
          { columnId: "JITEN_DRAMA", label: "Jiten Drama", description: "Japanese drama frequency (~217k source entries)." },
          { columnId: "ANIME_JDRAMA", label: "Anime + J-Drama", description: "Anime and J-drama subtitles (~100k entries). Widely cited." },
          { columnId: "YOUTUBE_FREQ_V3", label: "YouTube V3", description: "Manually transcribed YouTube across 16 spoken domains (~187k entries)." },
          { columnId: "NETFLIX", label: "Netflix", description: "Netflix Japan subtitles — anime + drama + live-action (~129k entries)." },
          { columnId: "DD2_MORPHMAN_NETFLIX", label: "Netflix (Clean)", description: "Netflix subtitles, proper names excluded (~105k entries)." },
          { columnId: "WIKIPEDIA_V2", label: "Wikipedia V2", description: "Community-built Wikipedia frequency dictionary (~850k source entries)." },
          { columnId: "ADNO", label: "ADNO", description: "Wikipedia (Oct 2022 dump), carefully filtered." },
          { columnId: "DD2_MORPHMAN_SOL", label: "Slice-of-Life", description: "Slice-of-Life anime, Morphman/UniDic format (~45k entries)." },
        ],
      },
    ],
  },

  // ── Academic / Research Corpora ────────────────────────────────────────────
  {
    title: "Academic / Research Corpora",
    subsections: [
      {
        title: "CEJC — Corpus of Everyday Japanese Conversation",
        datasets: [
          { columnId: "cejc_combined_rank", label: "CEJC Combined", description: "All conversations combined." },
          { columnId: "cejc_small_talk_rank", label: "CEJC Small Talk", description: "Casual small talk (雑談)." },
          { columnId: "cejc_consultation_rank", label: "CEJC Consultation", description: "Counseling / advice conversations (相談)." },
          { columnId: "cejc_meeting_rank", label: "CEJC Meeting", description: "Formal meetings (会議)." },
          { columnId: "cejc_class_rank", label: "CEJC Class", description: "Classroom and lesson settings (授業)." },
          { columnId: "cejc_outdoors_rank", label: "CEJC Outdoors", description: "Outdoor activity conversations (屋外活動)." },
          { columnId: "cejc_school_rank", label: "CEJC School", description: "School life (学校生活)." },
          { columnId: "cejc_transportation_rank", label: "CEJC Transportation", description: "Public transportation conversations (交通機関)." },
          { columnId: "cejc_public_commercial_rank", label: "CEJC Public/Commercial", description: "Shops, public facilities, service interactions." },
          { columnId: "cejc_home_rank", label: "CEJC Home", description: "Home and domestic conversations (家庭生活)." },
          { columnId: "cejc_indoors_rank", label: "CEJC Indoors", description: "Indoor non-home settings (屋内施設)." },
          { columnId: "cejc_workplace_rank", label: "CEJC Workplace", description: "Workplace conversations (職場)." },
          { columnId: "cejc_male_rank", label: "CEJC Male", description: "Speech produced by male speakers." },
          { columnId: "cejc_female_rank", label: "CEJC Female", description: "Speech produced by female speakers." },
        ],
      },
      {
        title: "CSJ — Corpus of Spontaneous Japanese",
        datasets: [
          { columnId: "MALTESAA_CSJ", label: "CSJ Overall", description: "All sub-corpora combined (~7M words)." },
          { columnId: "MALTESAA_CSJ_DOKWA_GAKKAI", label: "CSJ Academic", description: "Academic conference presentations (monologue)." },
          { columnId: "MALTESAA_CSJ_DOKWA_MOGI", label: "CSJ Simulated", description: "Simulated / practice speeches (monologue)." },
          { columnId: "MALTESAA_CSJ_DOKWA_ROUDOKU", label: "CSJ Read-Aloud", description: "Prepared text read aloud — first reading." },
          { columnId: "MALTESAA_CSJ_DOKWA_SAIRO", label: "CSJ Re-Read", description: "Prepared text read aloud — second reading." },
          { columnId: "MALTESAA_CSJ_DOKWA_SONOTA", label: "CSJ Other Mono.", description: "Other monologue types." },
          { columnId: "MALTESAA_CSJ_TAIKA_JIYU", label: "CSJ Free Dialogue", description: "Unstructured free-form dialogue." },
          { columnId: "MALTESAA_CSJ_TAIKA_KADAI", label: "CSJ Task Dialogue", description: "Task-based structured dialogue." },
          { columnId: "MALTESAA_CSJ_TAIKA_MOGI", label: "CSJ Role-Play", description: "Simulated / role-play dialogue." },
        ],
      },
      {
        title: "Other Academic",
        datasets: [
          { columnId: "RSPEER", label: "RSPEER", description: "Multi-source aggregate. Robust to single-corpus bias." },
          { columnId: "BCCWJ_LUW", label: "BCCWJ (Long Unit)", description: "Balanced written corpus, long unit word tokenization." },
          { columnId: "BCCWJ_SUW", label: "BCCWJ (Short Unit)", description: "Same corpus, short unit word tokenization." },
          { columnId: "CC100_rank", label: "CC100", description: "Filtered Japanese web text (~2020)." },
          { columnId: "MALTESAA_NWJC", label: "NWJC", description: "Web Japanese Corpus (~25.8B tokens, 2014–2017)." },
          { columnId: "HINGSTON", label: "Hingston", description: "Leeds internet corpus (mid-2000s). Outdated.", notRecommended: true },
          { columnId: "KUUUUBE_JMDICT_FREQ", label: "JMdict Freq", description: "Derived from JMdict newspaper frequency annotations.", notRecommended: true },
        ],
      },
    ],
  },

  // ── JITEN Breakdown ────────────────────────────────────────────────────────
  {
    title: "JITEN Breakdown",
    subsections: [
      {
        title: "",
        datasets: [
          { columnId: "JITEN_GLOBAL", label: "Jiten Global", description: "All media categories combined (~430k source entries)." },
          { columnId: "JITEN_DRAMA", label: "Jiten Drama", description: "Japanese drama (~217k source entries)." },
          { columnId: "JITEN_ANIME_V2", label: "Jiten Anime V2", description: "Anime — direct CSV export (~215k source entries)." },
          { columnId: "JITEN_ANIME", label: "Jiten Anime", description: "Anime — Yomitan JSON export (~257k). Older format." },
          { columnId: "JITEN_MOVIE", label: "Jiten Movie", description: "Movies (~142k source entries)." },
          { columnId: "JITEN_MANGA", label: "Jiten Manga", description: "Manga (~264k source entries)." },
          { columnId: "JITEN_NOVEL", label: "Jiten Novel", description: "Novels (~285k source entries)." },
          { columnId: "JITEN_VISUAL_NOVEL", label: "Jiten Visual Novel", description: "Visual novels (~224k source entries)." },
          { columnId: "JITEN_WEB_NOVEL", label: "Jiten Web Novel", description: "Web novels (~60k source entries)." },
          { columnId: "JITEN_NON_FICTION", label: "Jiten Non-Fiction", description: "Non-fiction / documentary / educational (~89k source entries)." },
          { columnId: "JITEN_VIDEO_GAME", label: "Jiten Video Game", description: "Video games (~159k source entries)." },
          { columnId: "JITEN_AUDIO", label: "Jiten Audio", description: "Audio / podcasts (~8,370 entries). Very limited signal.", notRecommended: true },
        ],
      },
    ],
  },

  // ── Wikipedia ──────────────────────────────────────────────────────────────
  {
    title: "Wikipedia",
    subsections: [
      {
        title: "",
        datasets: [
          { columnId: "WIKIPEDIA_V2", label: "Wikipedia V2", description: "Community-built Wikipedia frequency dictionary (~850k source entries)." },
          { columnId: "ADNO", label: "ADNO", description: "Wikipedia (Oct 2022 dump), carefully filtered." },
          { columnId: "HLORENZI_WIKIPEDIA", label: "Hlorenzi Wikipedia", description: "Wikipedia word rankings from jisho-open (~20k entries)." },
          { columnId: "ILYASEMENOV", label: "IlyaSemenov", description: "Wikipedia (Aug 2022) — document frequency, not term frequency. Contains HTML noise.", notRecommended: true },
        ],
      },
    ],
  },

  // ── Subtitles and Media ────────────────────────────────────────────────────
  {
    title: "Subtitles and Media",
    subsections: [
      {
        title: "YouTube",
        datasets: [
          { columnId: "YOUTUBE_FREQ_V3", label: "YouTube V3", description: "Manually transcribed YouTube across 16 spoken domains (~187k entries)." },
          { columnId: "YOUTUBE_FREQ", label: "YouTube (Old)", description: "Older YouTube transcription dataset (~56k entries). Superseded by V3." },
        ],
      },
      {
        title: "Netflix",
        datasets: [
          { columnId: "NETFLIX", label: "Netflix", description: "Netflix Japan subtitles (~129k entries). Includes proper names." },
          { columnId: "DD2_MORPHMAN_NETFLIX", label: "Netflix (Clean)", description: "Netflix, proper names excluded (~105k entries)." },
          { columnId: "DAVE_DOEBRICK", label: "Dave Doebrick", description: "Netflix collection (2019, ~53M kanji occurrences). Older." },
          { columnId: "DD2_MIGAKU_NETFLIX", label: "Netflix (Migaku)", description: "Netflix, Migaku format (~102k entries)." },
          { columnId: "HERMITDAVE_2016", label: "HermitDave 2016", description: "OpenSubtitles 2016. Known MeCab tokenization bug.", notRecommended: true },
          { columnId: "HERMITDAVE_2018", label: "HermitDave 2018", description: "OpenSubtitles 2018. Same morpheme-splitting issue.", notRecommended: true },
        ],
      },
      {
        title: "Slice of Life",
        datasets: [
          { columnId: "DD2_MORPHMAN_SOL", label: "SOL (Morphman)", description: "Slice-of-Life anime (~45k entries). Consistent lemmatization." },
          { columnId: "DD2_YOMICHAN_SOL", label: "SOL (Yomichan)", description: "Slice-of-Life top 100 (~43k entries)." },
        ],
      },
      {
        title: "Anime & Drama",
        datasets: [
          { columnId: "JITEN_DRAMA", label: "Jiten Drama", description: "Japanese drama frequency (~217k source entries)." },
          { columnId: "ANIME_JDRAMA", label: "Anime + J-Drama", description: "Anime and J-drama subtitles (~100k entries). Widely cited." },
          { columnId: "HLORENZI_ANIMEDRAMA", label: "Hlorenzi Anime+Drama", description: "Anime & drama subtitle rankings from jisho-open." },
          { columnId: "JITEN_ANIME_V2", label: "Jiten Anime V2", description: "Anime — direct CSV export from jiten.moe." },
          { columnId: "JPDB", label: "JPDB", description: "Anime and games from JPDB. Uses surface/inflected forms.", notRecommended: true },
          { columnId: "JLAB", label: "JLAB", description: "Anime-only from ~1.85M Anki flashcards. Rankings below ~2k unreliable.", notRecommended: true },
          { columnId: "CHRISKEMPSON", label: "ChrisKempson", description: "Subtitle corpus (12,277 files). Less curated, not maintained.", notRecommended: true },
        ],
      },
      {
        title: "Shonen",
        datasets: [
          { columnId: "DD2_MORPHMAN_SHONEN", label: "Shonen (Morphman)", description: "Shonen manga/anime (~60k entries)." },
          { columnId: "DD2_YOMICHAN_SHONEN", label: "Shonen (Yomichan)", description: "Shonen top 100 titles (~56k entries)." },
          { columnId: "DD2_YOMICHAN_SHONEN_STARS", label: "Shonen (Stars)", description: "Shonen manga/anime (~56k entries, stars format)." },
        ],
      },
      {
        title: "Other / Miscellaneous",
        datasets: [
          { columnId: "H_FREQ", label: "H_FREQ", description: "Adult (18+) content corpus (~44.7k entries). Highly domain-specific.", notRecommended: true },
        ],
      },
    ],
  },

  // ── Fiction and Literary ───────────────────────────────────────────────────
  {
    title: "Fiction and Literary",
    subsections: [
      {
        title: "Novels",
        datasets: [
          { columnId: "NOVELS", label: "Novels", description: "10,000+ contemporary Japanese novels. Punctuation not filtered (rank 1 = 、)." },
          { columnId: "JITEN_NOVEL", label: "Jiten Novel", description: "Novel frequency from jiten.moe (~285k source entries)." },
          { columnId: "DD2_MORPHMAN_NOVELS", label: "Novels (Morphman)", description: "Novels from Kindle (~126k entries)." },
          { columnId: "DD2_YOMICHAN_NOVELS", label: "Novels (Yomichan)", description: "Novels (~89k entries)." },
          { columnId: "INNOCENT_RANKED", label: "Innocent Corpus", description: "5,000+ novels reordered by rank. Older (~2010s)." },
        ],
      },
      {
        title: "Visual Novels and Web Novels",
        datasets: [
          { columnId: "VN_FREQ", label: "VN Freq", description: "100+ visual novel scripts (~30M words). UniDic lemma forms." },
          { columnId: "JITEN_VISUAL_NOVEL", label: "Jiten Visual Novel", description: "Visual novels from jiten.moe (~224k source entries)." },
          { columnId: "DD2_YOMICHAN_VN", label: "VN (Yomichan)", description: "Visual novels (~85k entries)." },
          { columnId: "JITEN_WEB_NOVEL", label: "Jiten Web Novel", description: "Web novels from jiten.moe (~60k source entries)." },
          { columnId: "NAROU", label: "Narou", description: "Top 300 stories on 小説家になろう. Isekai/fantasy-heavy." },
        ],
      },
      {
        title: "Miscellaneous Literary",
        datasets: [
          { columnId: "JITEN_MANGA", label: "Jiten Manga", description: "Manga from jiten.moe (~264k source entries)." },
          { columnId: "JITEN_NON_FICTION", label: "Jiten Non-Fiction", description: "Non-fiction, documentary, educational (~89k source entries)." },
          { columnId: "AOZORA_BUNKO", label: "Aozora Bunko", description: "Pre-1953 public-domain literature. Zero hiragana entries by design.", notRecommended: true },
        ],
      },
      {
        title: "Video Games",
        datasets: [
          { columnId: "NIER", label: "NieR", description: "Single game series script (~10,077 entries). No general vocabulary signal.", notRecommended: true },
        ],
      },
    ],
  },
];

/** Flat list of all unique column IDs referenced in the catalog */
export const ALL_CATALOG_COLUMN_IDS: string[] = Array.from(
  new Set(
    DATASET_CATALOG.flatMap((section) =>
      section.subsections.flatMap((sub) => sub.datasets.map((d) => d.columnId))
    )
  )
);
