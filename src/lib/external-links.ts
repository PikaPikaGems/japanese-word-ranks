export const DICTIONARY_LINKS = [
  { name: "Jisho.org", url: (w: string) => `https://jisho.org/word/${w}` },
  {
    name: "JPDB.io",
    url: (w: string) => `https://jpdb.io/search?q=${w}&lang=english#a`,
  },
  {
    name: "Jotoba",
    url: (w: string) => `https://jotoba.de/search/0/${w}?l=en-US`,
  },
  {
    name: "Immersion Kit",
    url: (w: string) => `https://www.immersionkit.com/dictionary?keyword=${w}`,
  },
  {
    name: "Kagi Translate",
    url: (w: string) => `https://translate.kagi.com/?from=ja&to=en&text=${w}`,
  },
  {
    name: "Tatoeba",
    url: (w: string) =>
      `https://tatoeba.org/en/sentences/search?from=jpn&query=${w}&to=eng`,
  },
  {
    name: "Kanshudo",
    url: (w: string) => `https://www.kanshudo.com/searchw?q=${w}`,
  },
  { name: "Takoboto", url: (w: string) => `https://takoboto.jp/?q=${w}` },
  {
    name: "Kanji Heatmap",
    url: (w: string) =>
      `https://kanjiheatmap.com/?search-text=${w}&search-type=multi-kanji`,
  },
];
