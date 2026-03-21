# Word Deduplication Analysis

## The Problem

The dataset (`RIRIKKU_CONSOLIDATED.csv`) contains duplicate entries where the same word appears in both kanji and kana-only forms. For example, `食べる` and `たべる` are separate rows with separate ranks, but represent the same word.

**Scale:** ~7,626 duplicate pairs total (~5,685 for multi-character words).

## Examples

| Kanji form | Kana form | Reading | Kanji rank | Kana rank |
|---|---|---|---|---|
| 無い | ない | ない | 20 | 10 |
| 居る | いる | いる | 13 | 13 |
| 在る / 或る / 有る | ある | ある | 14/14/15 | 14 |
| 付き / 就き / 突き | つき | つき | 415/1881/6492 | 64 |

## Why This Is Hard

### 1. Same reading ≠ same word (false positives)

- `する` (to do) vs `刷る` (to print) vs `擦る` (to rub) — all read `する`, different words
- `沿う` (to follow along, rank 1502) vs `そう` (that's right, rank 7) — completely different
- `増す` (to increase) vs `ます` (polite suffix) — not the same word

Reading match alone is unreliable. Many kana words are function words/particles/auxiliaries while their kanji "matches" are content verbs with the same pronunciation.

### 2. One-to-many relationships

- `いる` matches: 居る, 炒る, 要る, 射る — which is the "real" match?
- `ある` matches: 在る, 或る, 有る

### 3. Rank merging can mislead

Taking `min(rank)` across columns seems reasonable, but if `する` (do) and `刷る` (print) are falsely merged, you'd give "print" an artificially high rank.

## Proposed Detection: Multi-Signal Heuristic

Reading match is necessary but not sufficient. Layer additional signals:

1. **Reading match**: `kana_word == kanji_word.hiragana` (required baseline)
2. **Rank proximity**: True duplicates tend to have similar RIRIKKU_RANK values. 居る(13) ↔ いる(13) = strong signal. 沿う(1502) ↔ そう(7) = probably different words.
3. **Word length**: `食べる`(3) ↔ `たべる`(3) — good. But even matching length can be misleading for short words.
4. **Function word blocklist**: する, いる, ある, ない, ます, です, だ, の, に, etc. are grammatical and should NOT be merged with kanji homonyms.

## Proposed Merge Strategy

- Keep the **kanji form as primary** (more informative for learners)
- For each frequency column, take `min(rank_kanji, rank_kana)` where both are valid (not -1)
- Preserve both entries in the word detail page so users can see both forms

## Recommendation: Start Conservative

Rather than a fully automatic algorithm:

1. Auto-merge only when RIRIKKU_RANK values are identical or within a small threshold (e.g. ±5)
2. Exclude known function words from merging
3. Log uncertain cases for manual review

This avoids false merges while still cleaning up the most obvious duplicates.
