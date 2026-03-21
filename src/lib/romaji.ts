/**
 * Romaji-to-hiragana converter for search typeahead.
 * Supports standard Hepburn romanization.
 */

const ROMAJI_TABLE: Record<string, string> = {
  // Vowels
  a: "あ", i: "い", u: "う", e: "え", o: "お",
  // K
  ka: "か", ki: "き", ku: "く", ke: "け", ko: "こ",
  // S
  sa: "さ", si: "し", shi: "し", su: "す", se: "せ", so: "そ",
  // T
  ta: "た", ti: "ち", chi: "ち", tu: "つ", tsu: "つ", te: "て", to: "と",
  // N
  na: "な", ni: "に", nu: "ぬ", ne: "ね", no: "の",
  // H
  ha: "は", hi: "ひ", hu: "ふ", fu: "ふ", he: "へ", ho: "ほ",
  // M
  ma: "ま", mi: "み", mu: "む", me: "め", mo: "も",
  // Y
  ya: "や", yu: "ゆ", yo: "よ",
  // R
  ra: "ら", ri: "り", ru: "る", re: "れ", ro: "ろ",
  // W
  wa: "わ", wi: "ゐ", we: "ゑ", wo: "を",
  // G
  ga: "が", gi: "ぎ", gu: "ぐ", ge: "げ", go: "ご",
  // Z
  za: "ざ", zi: "じ", ji: "じ", zu: "ず", ze: "ぜ", zo: "ぞ",
  // D
  da: "だ", di: "ぢ", du: "づ", de: "で", do: "ど",
  // B
  ba: "ば", bi: "び", bu: "ぶ", be: "べ", bo: "ぼ",
  // P
  pa: "ぱ", pi: "ぴ", pu: "ぷ", pe: "ぺ", po: "ぽ",
  // Combo (y-row)
  kya: "きゃ", kyu: "きゅ", kyo: "きょ",
  sha: "しゃ", shu: "しゅ", sho: "しょ",
  sya: "しゃ", syu: "しゅ", syo: "しょ",
  cha: "ちゃ", chu: "ちゅ", cho: "ちょ",
  tya: "ちゃ", tyu: "ちゅ", tyo: "ちょ",
  nya: "にゃ", nyu: "にゅ", nyo: "にょ",
  hya: "ひゃ", hyu: "ひゅ", hyo: "ひょ",
  mya: "みゃ", myu: "みゅ", myo: "みょ",
  rya: "りゃ", ryu: "りゅ", ryo: "りょ",
  gya: "ぎゃ", gyu: "ぎゅ", gyo: "ぎょ",
  ja: "じゃ", ju: "じゅ", jo: "じょ",
  jya: "じゃ", jyu: "じゅ", jyo: "じょ",
  bya: "びゃ", byu: "びゅ", byo: "びょ",
  pya: "ぴゃ", pyu: "ぴゅ", pyo: "ぴょ",
};

const VOWELS = new Set(["a", "i", "u", "e", "o"]);

/**
 * Convert romaji string to hiragana.
 * Returns the converted hiragana. Trailing unconvertible romaji is discarded
 * (it represents an incomplete syllable the user hasn't finished typing).
 */
export function romajiToHiragana(input: string): string {
  const src = input.toLowerCase();
  let result = "";
  let i = 0;

  while (i < src.length) {
    // Double consonant → っ
    if (
      i + 1 < src.length &&
      src[i] === src[i + 1] &&
      !VOWELS.has(src[i]) &&
      src[i] !== "n"
    ) {
      result += "っ";
      i++;
      continue;
    }

    // 'n' before consonant or end → ん
    if (src[i] === "n") {
      if (i + 1 >= src.length) {
        result += "ん";
        i++;
        continue;
      }
      const next = src[i + 1];
      if (
        !VOWELS.has(next) &&
        next !== "y" &&
        next !== "n" &&
        next !== "a" // avoid consuming 'na', 'ni' etc
      ) {
        result += "ん";
        i++;
        continue;
      }
      // "nn" → ん
      if (next === "n") {
        result += "ん";
        i += 2;
        continue;
      }
    }

    // Try longest match first (3 chars, then 2, then 1)
    let matched = false;
    for (const len of [3, 2, 1]) {
      const chunk = src.slice(i, i + len);
      if (ROMAJI_TABLE[chunk]) {
        result += ROMAJI_TABLE[chunk];
        i += len;
        matched = true;
        break;
      }
    }

    if (!matched) {
      // Skip non-romaji character (or incomplete trailing consonant)
      i++;
    }
  }

  return result;
}

/** Check if a string contains any Latin/romaji characters */
export function hasLatin(s: string): boolean {
  return /[a-zA-Z]/.test(s);
}

/** Check if a character is hiragana */
export function isHiragana(ch: string): boolean {
  const c = ch.charCodeAt(0);
  return c >= 0x3040 && c <= 0x309f;
}

/** Check if a character is katakana */
export function isKatakana(ch: string): boolean {
  const c = ch.charCodeAt(0);
  return c >= 0x30a0 && c <= 0x30ff;
}

/** Convert katakana string to hiragana */
export function katakanaToHiragana(s: string): string {
  return Array.from(s)
    .map((ch) => {
      const c = ch.charCodeAt(0);
      if (c >= 0x30a1 && c <= 0x30f6) return String.fromCharCode(c - 0x60);
      return ch;
    })
    .join("");
}
