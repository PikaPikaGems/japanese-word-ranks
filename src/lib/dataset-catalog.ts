/**
 * Dataset catalog structure derived from data/frequency/dataset-catalog.md.
 * Defines sections, subsections, and individual datasets for the word detail page.
 *
 * Each dataset entry maps to a column in consolidated.csv.
 */

export interface DatasetEntry {
  columnId: string;
  label: string;
  source?: string;
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

// ── Dataset entries (single source of truth) ──────────────────────────────────

const rspeer = {
  columnId: "RSPEER",
  label: "RSPEER",
  source: "rspeer/wordfreq",
  description:
    "Multi-source aggregate (Wikipedia, subtitles, news, books, web, Twitter/Reddit). Frozen ~2021.",
} as const;

const cejcCombined = {
  columnId: "cejc_combined_rank",
  label: "CEJC Combined",
  source: "NINJAL CEJC",
  description: "Everyday spoken Japanese — all conversations combined.",
} as const;

const cejcSmallTalk = {
  columnId: "cejc_small_talk_rank",
  label: "CEJC Small Talk",
  source: "NINJAL CEJC",
  description: "Everyday spoken Japanese — casual small talk only (雑談).",
} as const;

const cejcConsultation = {
  columnId: "cejc_consultation_rank",
  label: "CEJC Consultation",
  description: "Counseling / advice conversations (相談).",
} as const;

const cejcMeeting = {
  columnId: "cejc_meeting_rank",
  label: "CEJC Meeting",
  description: "Formal meetings (会議).",
} as const;

const cejcClass = {
  columnId: "cejc_class_rank",
  label: "CEJC Class",
  description: "Classroom and lesson settings (授業).",
} as const;

const cejcOutdoors = {
  columnId: "cejc_outdoors_rank",
  label: "CEJC Outdoors",
  description: "Outdoor activity conversations (屋外活動).",
} as const;

const cejcSchool = {
  columnId: "cejc_school_rank",
  label: "CEJC School",
  description: "School life (学校生活).",
} as const;

const cejcTransportation = {
  columnId: "cejc_transportation_rank",
  label: "CEJC Transportation",
  description: "Public transportation conversations (交通機関).",
} as const;

const cejcPublicCommercial = {
  columnId: "cejc_public_commercial_rank",
  label: "CEJC Public/Commercial",
  description: "Shops, public facilities, service interactions.",
} as const;

const cejcHome = {
  columnId: "cejc_home_rank",
  label: "CEJC Home",
  description: "Home and domestic conversations (家庭生活).",
} as const;

const cejcIndoors = {
  columnId: "cejc_indoors_rank",
  label: "CEJC Indoors",
  description: "Indoor non-home settings (屋内施設).",
} as const;

const cejcWorkplace = {
  columnId: "cejc_workplace_rank",
  label: "CEJC Workplace",
  description: "Workplace conversations (職場).",
} as const;

const cejcMale = {
  columnId: "cejc_male_rank",
  label: "CEJC Male",
  description: "Speech produced by male speakers.",
} as const;

const cejcFemale = {
  columnId: "cejc_female_rank",
  label: "CEJC Female",
  description: "Speech produced by female speakers.",
} as const;

const csj = {
  columnId: "MALTESAA_CSJ",
  label: "CSJ",
  source: "NINJAL CSJ",
  description:
    "Corpus of Spontaneous Japanese — all sub-corpora combined (~7M words).",
} as const;

const csjAcademic = {
  columnId: "MALTESAA_CSJ_DOKWA_GAKKAI",
  label: "CSJ Academic",
  description: "Academic conference presentations (monologue).",
} as const;

const csjSimulated = {
  columnId: "MALTESAA_CSJ_DOKWA_MOGI",
  label: "CSJ Simulated",
  description: "Simulated / practice speeches (monologue).",
} as const;

const csjReadAloud = {
  columnId: "MALTESAA_CSJ_DOKWA_ROUDOKU",
  label: "CSJ Read-Aloud",
  description: "Prepared text read aloud — first reading.",
} as const;

const csjReRead = {
  columnId: "MALTESAA_CSJ_DOKWA_SAIRO",
  label: "CSJ Re-Read",
  description: "Prepared text read aloud — second reading.",
} as const;

const csjOtherMono = {
  columnId: "MALTESAA_CSJ_DOKWA_SONOTA",
  label: "CSJ Other Mono.",
  description: "Other monologue types.",
} as const;

const csjFreeDialogue = {
  columnId: "MALTESAA_CSJ_TAIKA_JIYU",
  label: "CSJ Free Dialogue",
  description: "Unstructured free-form dialogue.",
} as const;

const csjTaskDialogue = {
  columnId: "MALTESAA_CSJ_TAIKA_KADAI",
  label: "CSJ Task Dialogue",
  description: "Task-based structured dialogue.",
} as const;

const csjRolePlay = {
  columnId: "MALTESAA_CSJ_TAIKA_MOGI",
  label: "CSJ Role-Play",
  description: "Simulated / role-play dialogue.",
} as const;

const bccwjLuw = {
  columnId: "BCCWJ_LUW",
  label: "BCCWJ (Long Unit)",
  source: "NINJAL BCCWJ",
  description:
    "Japan's official balanced written corpus (104M words, 1976–2006). Compound words as units.",
} as const;

const bccwjSuw = {
  columnId: "BCCWJ_SUW",
  label: "BCCWJ (Short Unit)",
  source: "NINJAL BCCWJ",
  description: "Same BCCWJ corpus, short unit word tokenization.",
} as const;

const cc100 = {
  columnId: "CC100_rank",
  label: "CC100",
  source: "CommonCrawl",
  description:
    "Filtered Japanese web text (~2020, ~70 GB). Broad contemporary vocabulary.",
} as const;

const nwjc = {
  columnId: "MALTESAA_NWJC",
  label: "NWJC",
  source: "NINJAL NWJC",
  description: "Web Japanese Corpus (~25.8B tokens, crawled 2014–2017).",
} as const;

const hingston = {
  columnId: "HINGSTON",
  label: "Hingston",
  source: "Leeds Internet Corpus",
  description: "Leeds internet corpus (mid-2000s). Outdated.",
  notRecommended: true,
} as const;

const jmdictFreq = {
  columnId: "KUUUUBE_JMDICT_FREQ",
  label: "JMdict Freq",
  source: "JMdict / Kuuube",
  description:
    "Derived from JMdict newspaper frequency annotations, not a raw corpus count.",
  notRecommended: true,
} as const;

const jitenGlobal = {
  columnId: "JITEN_GLOBAL",
  label: "Jiten Global",
  source: "jiten.moe",
  description: "All media categories combined (~430k source entries).",
} as const;

const jitenDrama = {
  columnId: "JITEN_DRAMA",
  label: "Jiten Drama",
  source: "jiten.moe",
  description: "Japanese drama frequency (~217k source entries).",
} as const;

const jitenAnimeV2 = {
  columnId: "JITEN_ANIME_V2",
  label: "Jiten Anime V2",
  source: "jiten.moe",
  description: "Anime — direct CSV export (~215k source entries).",
} as const;

const jitenAnime = {
  columnId: "JITEN_ANIME",
  label: "Jiten Anime",
  source: "jiten.moe",
  description: "Anime — Yomitan JSON export (~257k). Older format.",
} as const;

const jitenMovie = {
  columnId: "JITEN_MOVIE",
  label: "Jiten Movie",
  source: "jiten.moe",
  description: "Movies (~142k source entries).",
} as const;

const jitenManga = {
  columnId: "JITEN_MANGA",
  label: "Jiten Manga",
  source: "jiten.moe",
  description: "Manga (~264k source entries).",
} as const;

const jitenNovel = {
  columnId: "JITEN_NOVEL",
  label: "Jiten Novel",
  source: "jiten.moe",
  description: "Novels (~285k source entries).",
} as const;

const jitenVisualNovel = {
  columnId: "JITEN_VISUAL_NOVEL",
  label: "Jiten Visual Novel",
  source: "jiten.moe",
  description: "Visual novels (~224k source entries).",
} as const;

const jitenWebNovel = {
  columnId: "JITEN_WEB_NOVEL",
  label: "Jiten Web Novel",
  source: "jiten.moe",
  description: "Web novels (~60k source entries).",
} as const;

const jitenNonFiction = {
  columnId: "JITEN_NON_FICTION",
  label: "Jiten Non-Fiction",
  source: "jiten.moe",
  description: "Non-fiction / documentary / educational (~89k source entries).",
} as const;

const jitenVideoGame = {
  columnId: "JITEN_VIDEO_GAME",
  label: "Jiten Video Game",
  source: "jiten.moe",
  description: "Video games (~159k source entries).",
} as const;

const jitenAudio = {
  columnId: "JITEN_AUDIO",
  label: "Jiten Audio",
  source: "jiten.moe",
  description: "Audio / podcasts (~8,370 entries). Very limited signal.",
  notRecommended: true,
} as const;

const wikipediaV2 = {
  columnId: "WIKIPEDIA_V2",
  label: "Wikipedia V2",
  source: "MarvNC / Shoui",
  description: "Wikipedia frequency dictionary (~850k source entries).",
} as const;

const adno = {
  columnId: "ADNO",
  label: "Wikipedia (ADNO)",
  source: "ADNO/wikipedia-word-frequency-clean",
  description: "Wikipedia (Oct 2022 dump), (~550k entries)",
} as const;

const hlorenziWikipedia = {
  columnId: "HLORENZI_WIKIPEDIA",
  label: "Hlorenzi Wikipedia (Hlorenzi)",
  source: "hlorenzi",
  description:
    "Wikipedia word rankings from hlorenzi/jisho-open (~20k entries).",
} as const;

const ilyaSemenov = {
  columnId: "ILYASEMENOV",
  label: "IlyaSemenov",
  source: "IlyaSemenov",
  description:
    "Wikipedia (Aug 2022) — document frequency, not term frequency. Contains HTML noise.",
  notRecommended: true,
} as const;

const youtubeV3 = {
  columnId: "YOUTUBE_FREQ_V3",
  label: "YouTube V3",
  source: "MarvNC",
  description:
    "Manually transcribed YouTube across 16 spoken domains (~187k entries).",
} as const;

const youtubeOld = {
  columnId: "YOUTUBE_FREQ",
  label: "YouTube (Old)",
  source: "MarvNC",
  description:
    "Older YouTube transcription dataset (~56k entries). Superseded by V3.",
} as const;

const netflix = {
  columnId: "NETFLIX",
  label: "Netflix (Shoui)",
  source: "Shoui",
  description:
    "Netflix Japan subtitles — anime + drama + live-action (~129k entries).",
} as const;

const netflixClean = {
  columnId: "DD2_MORPHMAN_NETFLIX",
  label: "Netflix (Morphman/DD)",
  source: "Dave Doebrick",
  description: "Netflix subtitles, proper names excluded (~105k entries).",
} as const;

const daveDoebrick = {
  columnId: "DAVE_DOEBRICK",
  label: "Dave Doebrick",
  source: "Dave Doebrick",
  description: "Netflix collection (2019, ~53M kanji occurrences).",
} as const;

const netflixMigaku = {
  columnId: "DD2_MIGAKU_NETFLIX",
  label: "Netflix (Migaku)",
  source: "Dave Doebrick (Migaku)",
  description: "Netflix subtitles, Migaku format (~102k entries).",
} as const;

const hermitDave2016 = {
  columnId: "HERMITDAVE_2016",
  label: "HermitDave 2016",
  source: "hermitdave",
  description: "OpenSubtitles 2016. Known MeCab tokenization bug.",
  notRecommended: true,
} as const;

const hermitDave2018 = {
  columnId: "HERMITDAVE_2018",
  label: "HermitDave 2018",
  source: "hermitdave",
  description: "OpenSubtitles 2018. Same morpheme-splitting issue.",
  notRecommended: true,
} as const;

const solMorphman = {
  columnId: "DD2_MORPHMAN_SOL",
  label: "Slice-of-Life",
  source: "Dave Doebrick",
  description: "Slice-of-Life anime, Morphman/UniDic format (~45k entries).",
} as const;

const solYomichan = {
  columnId: "DD2_YOMICHAN_SOL",
  label: "SOL (Yomichan)",
  source: "Dave Doebrick",
  description: "Slice-of-Life top 100 (~43k entries).",
} as const;

const animeJdrama = {
  columnId: "ANIME_JDRAMA",
  label: "Anime + J-Drama",
  source: "Shoui",
  description: "Anime and J-drama subtitles (~100k entries). Widely cited.",
} as const;

const hlorenziAnimeDrama = {
  columnId: "HLORENZI_ANIMEDRAMA",
  label: "Hlorenzi Anime+Drama",
  source: "hlorenzi / jisho-open",
  description: "Anime & drama subtitle rankings from jisho-open.",
} as const;

const jpdb = {
  columnId: "JPDB",
  label: "JPDB",
  source: "JPDB",
  description: "Anime and games from JPDB. Uses surface/inflected forms.",
  notRecommended: true,
} as const;

const jlab = {
  columnId: "JLAB",
  label: "JLAB",
  source: "JLAB",
  description:
    "Anime-only from ~1.85M Anki flashcards. Rankings below ~2k unreliable.",
  notRecommended: true,
} as const;

const chrisKempson = {
  columnId: "CHRISKEMPSON",
  label: "ChrisKempson",
  source: "ChrisKempson",
  description: "Subtitle corpus (12,277 files). Less curated, not maintained.",
  notRecommended: true,
} as const;

const shonenMorphman = {
  columnId: "DD2_MORPHMAN_SHONEN",
  label: "Shonen (Morphman)",
  source: "Dave Doebrick",
  description: "Shonen manga/anime (~60k entries).",
} as const;

const shonenYomichan = {
  columnId: "DD2_YOMICHAN_SHONEN",
  label: "Shonen (Yomichan)",
  source: "Dave Doebrick",
  description: "Shonen top 100 titles (~56k entries).",
} as const;

const shonenStars = {
  columnId: "DD2_YOMICHAN_SHONEN_STARS",
  label: "Shonen (Stars)",
  source: "Dave Doebrick",
  description: "Shonen manga/anime (~56k entries, stars format).",
} as const;

const nier = {
  columnId: "NIER",
  label: "NieR",
  source: "MarvNC / Shoui",
  description:
    "Single game series script (~10,077 entries). No general vocabulary signal.",
  notRecommended: true,
} as const;

const hFreq = {
  columnId: "H_FREQ",
  label: "H_FREQ",
  source: "MarvNC / Shoui",
  description:
    "Adult (18+) content corpus (~44.7k entries). Highly domain-specific.",
  notRecommended: true,
} as const;

const novels = {
  columnId: "NOVELS",
  label: "Novels",
  source: "Kuuube",
  description:
    "10,000+ contemporary Japanese novels. Punctuation not filtered (rank 1 = 、).",
} as const;

const novelsMorphman = {
  columnId: "DD2_MORPHMAN_NOVELS",
  label: "Novels (Morphman)",
  source: "Dave Doebrick",
  description: "Novels from Kindle (~126k entries).",
} as const;

const novelsYomichan = {
  columnId: "DD2_YOMICHAN_NOVELS",
  label: "Novels (Yomichan)",
  source: "Dave Doebrick",
  description: "Novels (~89k entries).",
} as const;

const innocentCorpus = {
  columnId: "INNOCENT_RANKED",
  label: "Innocent Corpus",
  source: "Innocent Corpus",
  description: "5,000+ novels reordered by rank. Older (~2010s).",
} as const;

const vnFreq = {
  columnId: "VN_FREQ",
  label: "VN Freq",
  source: "MarvNC / Shoui",
  description: "100+ visual novel scripts (~30M words). UniDic lemma forms.",
} as const;

const vnYomichan = {
  columnId: "DD2_YOMICHAN_VN",
  label: "VN (Yomichan)",
  source: "Dave Doebrick",
  description: "Visual novels (~85k entries).",
} as const;

const narou = {
  columnId: "NAROU",
  label: "Narou",
  source: "MarvNC / Shoui",
  description: "Top 300 stories on 小説家になろう. Isekai/fantasy-heavy.",
} as const;

const aozoraBunko = {
  columnId: "AOZORA_BUNKO",
  label: "Aozora Bunko",
  source: "Aozora Bunko",
  description:
    "Pre-1953 public-domain literature (Soseki, Akutagawa). Zero hiragana entries by design.",
  notRecommended: true,
} as const;

export const shortlisted = [
  rspeer,
  cejcCombined,
  cejcSmallTalk,
  bccwjLuw,
  bccwjSuw,
  cc100,
  nwjc,
  jitenGlobal,
  jitenDrama,
  animeJdrama,
  youtubeV3,
  netflix,
  netflixClean,
  wikipediaV2,
  adno,
  solMorphman,
];

export const highlighted = [...shortlisted, jitenAnimeV2, csj];

export const DATASET_CATALOG: DatasetSection[] = [
  // ── Highlighted (Shortlisted) ──────────────────────────────────────────────
  {
    title: "Highlighted",
    subsections: [
      {
        title: "",
        datasets: highlighted,
      },
    ],
  },

  // ── Academic / Research Corpora ────────────────────────────────────────────
  {
    title: "Academic / Research Corpora",
    subsections: [
      {
        title: "CEJC — NINJAL's Corpus of Everyday Japanese Conversation",
        datasets: [
          cejcCombined,
          cejcSmallTalk,
          cejcConsultation,
          cejcMeeting,
          cejcClass,
          cejcOutdoors,
          cejcSchool,
          cejcTransportation,
          cejcPublicCommercial,
          cejcHome,
          cejcIndoors,
          cejcWorkplace,
          cejcMale,
          cejcFemale,
        ],
      },
      {
        title: "CSJ — NINJAL's Corpus of Spontaneous Japanese",
        datasets: [
          csj,
          csjAcademic,
          csjSimulated,
          csjReadAloud,
          csjReRead,
          csjOtherMono,
          csjFreeDialogue,
          csjTaskDialogue,
          csjRolePlay,
        ],
      },
      {
        title: "Other Academic",
        datasets: [
          rspeer,
          bccwjLuw,
          bccwjSuw,
          cc100,
          nwjc,
          hingston,
          jmdictFreq,
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
          jitenGlobal,
          jitenDrama,
          jitenAnimeV2,
          jitenAnime,
          jitenMovie,
          jitenManga,
          jitenNovel,
          jitenVisualNovel,
          jitenWebNovel,
          jitenNonFiction,
          jitenVideoGame,
          jitenAudio,
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
        datasets: [wikipediaV2, adno, hlorenziWikipedia, ilyaSemenov],
      },
    ],
  },

  // ── Subtitles and Media ────────────────────────────────────────────────────
  {
    title: "Subtitles and Media",
    subsections: [
      {
        title: "YouTube",
        datasets: [youtubeV3, youtubeOld],
      },
      {
        title: "Netflix",
        datasets: [
          netflix,
          netflixClean,
          daveDoebrick,
          netflixMigaku,
          hermitDave2016,
          hermitDave2018,
        ],
      },
      {
        title: "Slice of Life",
        datasets: [solMorphman, solYomichan],
      },
      {
        title: "Anime & Drama",
        datasets: [
          jitenDrama,
          animeJdrama,
          hlorenziAnimeDrama,
          jitenAnimeV2,
          jpdb,
          jlab,
          chrisKempson,
        ],
      },
      {
        title: "Shonen",
        datasets: [shonenMorphman, shonenYomichan, shonenStars],
      },
      {
        title: "Video Games / Miscellaneous",
        datasets: [jitenVideoGame, nier, hFreq],
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
          novels,
          jitenNovel,
          novelsMorphman,
          novelsYomichan,
          innocentCorpus,
        ],
      },
      {
        title: "Visual Novels and Web Novels",
        datasets: [vnFreq, jitenVisualNovel, vnYomichan, jitenWebNovel, narou],
      },
      {
        title: "Miscellaneous Literary",
        datasets: [jitenManga, jitenNonFiction, aozoraBunko],
      },
    ],
  },
];

/** Flat list of all unique column IDs referenced in the catalog */
export const ALL_CATALOG_COLUMN_IDS: string[] = Array.from(
  new Set(
    DATASET_CATALOG.flatMap((section) =>
      section.subsections.flatMap((sub) => sub.datasets.map((d) => d.columnId)),
    ),
  ),
);
