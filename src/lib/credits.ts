export type CreditLink = { name: string; url: string };

export type CreditSection = {
  title: string;
  description?: { text: string; link?: CreditLink };
  sources: CreditLink[];
};

export const CREDITS: CreditSection[] = [
  {
    title: "Frequency Data",
    description: {
      text: "Consolidation from",
      link: {
        name: "PikaPikaGems/japanese-word-frequency",
        url: "https://github.com/PikaPikaGems/japanese-word-frequency",
      },
    },
    sources: [
      {
        name: "learnjapanese.moe — Recommended Frequency Dictionaries",
        url: "https://learnjapanese.moe/yomichan/#recommended-frequency-dictionaries",
      },
      { name: "jiten.moe", url: "https://jiten.moe/other" },
      {
        name: "Anacreon DJT",
        url: "https://anacreondjt.gitlab.io/docs/freq/",
      },
      {
        name: "Kuuuube/yomitan-dictionaries",
        url: "https://github.com/Kuuuube/yomitan-dictionaries",
      },
      {
        name: "MarvNC/yomitan-dictionaries",
        url: "https://github.com/MarvNC/yomitan-dictionaries",
      },
      {
        name: "IlyaSemenov/wikipedia-word-frequency",
        url: "https://github.com/IlyaSemenov/wikipedia-word-frequency",
      },
      {
        name: "adno/wikipedia-word-frequency-clean",
        url: "https://github.com/adno/wikipedia-word-frequency-clean",
      },
      {
        name: "hermitdave/FrequencyWords",
        url: "https://github.com/hermitdave/FrequencyWords",
      },
      {
        name: "chriskempson/japanese-subtitles-word-kanji-frequency-lists",
        url: "https://github.com/chriskempson/japanese-subtitles-word-kanji-frequency-lists",
      },
      {
        name: "hlorenzi/jisho-open",
        url: "https://github.com/hlorenzi/jisho-open",
      },
      { name: "rspeer/wordfreq", url: "https://github.com/rspeer/wordfreq" },
      {
        name: "Maltesaa/CSJ_and_NWJC_yomitan_freq_dict",
        url: "https://github.com/Maltesaa/CSJ_and_NWJC_yomitan_freq_dict",
      },
      {
        name: "hingston/japanese",
        url: "https://github.com/hingston/japanese",
      },
      {
        name: "Japanese Like a Breeze (JLAB) Google Spreadsheet",
        url: "https://docs.google.com/spreadsheets/d/1xeG-b85EHwo-yUDgwDLuWyYdwtnDgJAzr3VTmteMOaA/",
      },
      {
        name: "Shoui's yomitan dictionary collection (Google Drive)",
        url: "https://drive.google.com/drive/folders/1g1drkFzokc8KNpsPHoRmDJ4OtMTWFuXi",
      },
      {
        name: "MarvNC Yomitan Dictionaries (Google Drive)",
        url: "https://drive.google.com/drive/folders/1xURpMJN7HTtSLuVs9ZtIbE7MDRCdoU29",
      },
      {
        name: "Japanese Word Frequency Lists by Dave Doebrick (Google Drive)",
        url: "https://drive.google.com/file/d/1qHEfYHXjEp83i6PxxMlSxluFyQg2W8Up/",
      },
    ],
  },
  {
    title: "JLPT Level Data",
    sources: [
      { name: "tanos.co.uk/jlpt", url: "https://www.tanos.co.uk/jlpt/" },
    ],
  },
  {
    title: "Kaishi Deck Data",
    sources: [
      { name: "donkuri/kaishi", url: "https://github.com/donkuri/kaishi" },
    ],
  },
];
