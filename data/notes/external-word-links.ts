export const vocabExternalLinks = [
  {
    name: "Kagi Translate",
    url: (word: string) =>
      `https://translate.kagi.com/?from=ja&to=en&text=${word}`,
  },
  {
    name: "Immersion Kit",
    url: (word: string) =>
      `https://www.immersionkit.com/dictionary?keyword=${word}`,
  },
  {
    name: "Tatoeba",
    url: (word: string) =>
      `https://tatoeba.org/en/sentences/search?from=jpn&query=${word}&to=eng`,
  },
  {
    name: "Jisho.org",
    url: (word: string) => `https://jisho.org/word/${word}`,
  },
  {
    name: "Jotoba",
    url: (word: string) => `https://jotoba.de/search/0/${word}?l=en-US`,
  },
  {
    name: "JPDB.io",
    url: (word: string) => `https://jpdb.io/search?q=${word}&lang=english#a`,
  },
  {
    name: "Kanshudo",
    url: (word: string) => `https://www.kanshudo.com/searchw?q=${word}`,
  },
  {
    name: "JLearn",
    url: (word: string) => `https://jlearn.net/dictionary/${word}`,
  },
  {
    name: "Takoboto",
    url: (word: string) => `https://takoboto.jp/?q=${word}`,
  },
  {
    name: "Ichi Moe",
    url: (word: string) => `https://ichi.moe/cl/word/?q=${word}`,
  },
  {
    name: "Kakimashou",
    url: (word: string) => `https://www.kakimashou.com/dictionary/word/${word}`,
  },
  {
    name: "Sentence Search",
    url: (word: string) => `https://sentencesearch.neocities.org/#${word}`,
  },
  {
    name: "Draw Me a Kanji",
    url: (word: string) => `https://mbilbille.github.io/dmak/#${word}`,
  },
];

export const vocabExternalLinks2 = [
  {
    name: "Kagi Translate",
    url: (word: string) =>
      `https://translate.kagi.com/?from=ja&to=en&text=${word}`,
  },
  {
    name: "Jisho.org",
    url: (word: string) => `https://jisho.org/word/${word}`,
  },
  {
    name: "Jotoba",
    url: (word: string) => `https://jotoba.de/search/0/${word}?l=en-US`,
  },
  {
    name: "JPDB.io",
    url: (word: string) => `https://jpdb.io/search?q=${word}&lang=english#a`,
  },
  {
    name: "Lorenzi's Jisho",
    url: (word: string) => `https://jisho.hlorenzi.com/search/${word}`,
  },
  { name: "JapanDict", url: (word: string) => `https://japandict.com/${word}` },
  {
    name: "Kyou Benkyou",
    url: (word: string) => `https://www.kyoubenkyou.com/search/${word}`,
  },
  {
    name: "Kanjiverse",
    url: (word: string) => `https://app.kanjiverse.com/kotoba/${word}`,
  },
  {
    name: "Immersion Kit",
    url: (word: string) =>
      `https://www.immersionkit.com/dictionary?keyword=${word}`,
  },
  {
    name: "Kakimashou",
    url: (word: string) => `https://www.kakimashou.com/dictionary/word/${word}`,
  },
  {
    name: "Google Translate",
    url: (word: string) =>
      `https://translate.google.com/details?sl=ja&tl=en&text=${word}&op=translate`,
  },
];
