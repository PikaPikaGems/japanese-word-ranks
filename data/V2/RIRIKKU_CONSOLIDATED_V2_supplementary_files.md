# RIRIKKU_CONSOLIDATED_V2 Supplementary Files

These two files accompany `RIRIKKU_CONSOLIDATED_V2.csv`. Every row maps 1-to-1 in the same order, so you can join them by row index, or by the shared `(word, hiragana)` key.

---

## RIRIKKU_CONSOLIDATED_V2_other_ranks.csv

Contains frequency ranks from all 56 datasets in `CEJC_anchor/consolidated.csv` that are **not** already included in `RIRIKKU_CONSOLIDATED_V2.csv`. A value of `-1` means the word was not found in that dataset.

| Column                        | Description                                            |
| ----------------------------- | ------------------------------------------------------ |
| `word`                        | The Japanese word (kanji/kana form)                    |
| `hiragana`                    | Hiragana reading                                       |
| `cejc_consultation_rank`      | CEJC consultation sub-corpus rank                      |
| `cejc_meeting_rank`           | CEJC meeting sub-corpus rank                           |
| `cejc_class_rank`             | CEJC class sub-corpus rank                             |
| `cejc_outdoors_rank`          | CEJC outdoors sub-corpus rank                          |
| `cejc_school_rank`            | CEJC school sub-corpus rank                            |
| `cejc_transportation_rank`    | CEJC transportation sub-corpus rank                    |
| `cejc_public_commercial_rank` | CEJC public/commercial sub-corpus rank                 |
| `cejc_home_rank`              | CEJC home sub-corpus rank                              |
| `cejc_indoors_rank`           | CEJC indoors sub-corpus rank                           |
| `cejc_workplace_rank`         | CEJC workplace sub-corpus rank                         |
| `cejc_male_rank`              | CEJC male speakers sub-corpus rank                     |
| `cejc_female_rank`            | CEJC female speakers sub-corpus rank                   |
| `AOZORA_BUNKO`                | Aozora Bunko (public domain literature) frequency rank |
| `CHRISKEMPSON`                | ChrisKempson frequency list rank                       |
| `DAVE_DOEBRICK`               | Dave Doebrick frequency list rank                      |
| `DD2_MIGAKU_NETFLIX`          | DD2 Migaku Netflix frequency rank                      |
| `DD2_MORPHMAN_NOVELS`         | DD2 MorphMan novels frequency rank                     |
| `DD2_MORPHMAN_SHONEN`         | DD2 MorphMan shonen frequency rank                     |
| `DD2_YOMICHAN_NOVELS`         | DD2 Yomichan novels frequency rank                     |
| `DD2_YOMICHAN_SHONEN`         | DD2 Yomichan shonen frequency rank                     |
| `DD2_YOMICHAN_SHONEN_STARS`   | DD2 Yomichan shonen stars frequency rank               |
| `DD2_YOMICHAN_SOL`            | DD2 Yomichan slice-of-life frequency rank              |
| `DD2_YOMICHAN_VN`             | DD2 Yomichan visual novel frequency rank               |
| `HERMITDAVE_2016`             | HermitDave 2016 frequency rank                         |
| `HERMITDAVE_2018`             | HermitDave 2018 frequency rank                         |
| `HINGSTON`                    | Hingston frequency list rank                           |
| `HLORENZI_ANIMEDRAMA`         | hlorenzi anime/drama frequency rank                    |
| `HLORENZI_WIKIPEDIA`          | hlorenzi Wikipedia frequency rank                      |
| `H_FREQ`                      | H_FREQ frequency rank                                  |
| `ILYASEMENOV`                 | IlyaSemenov frequency list rank                        |
| `INNOCENT_RANKED`             | Innocent Corpus ranked frequency                       |
| `JITEN_ANIME`                 | jpdb.io anime frequency rank                           |
| `JITEN_AUDIO`                 | jpdb.io audio frequency rank                           |
| `JITEN_MANGA`                 | jpdb.io manga frequency rank                           |
| `JITEN_MOVIE`                 | jpdb.io movie frequency rank                           |
| `JITEN_NON_FICTION`           | jpdb.io non-fiction frequency rank                     |
| `JITEN_NOVEL`                 | jpdb.io novel frequency rank                           |
| `JITEN_VIDEO_GAME`            | jpdb.io video game frequency rank                      |
| `JITEN_VISUAL_NOVEL`          | jpdb.io visual novel frequency rank                    |
| `JITEN_WEB_NOVEL`             | jpdb.io web novel frequency rank                       |
| `JLAB`                        | JLAB frequency rank                                    |
| `JPDB`                        | jpdb.io overall frequency rank                         |
| `KUUUUBE_JMDICT_FREQ`         | Kuuuube JMDict frequency rank                          |
| `MALTESAA_CSJ_DOKWA_GAKKAI`   | MALTESAA CSJ dokwa gakkai sub-corpus rank              |
| `MALTESAA_CSJ_DOKWA_MOGI`     | MALTESAA CSJ dokwa mogi sub-corpus rank                |
| `MALTESAA_CSJ_DOKWA_ROUDOKU`  | MALTESAA CSJ dokwa roudoku sub-corpus rank             |
| `MALTESAA_CSJ_DOKWA_SAIRO`    | MALTESAA CSJ dokwa sairo sub-corpus rank               |
| `MALTESAA_CSJ_DOKWA_SONOTA`   | MALTESAA CSJ dokwa sonota sub-corpus rank              |
| `MALTESAA_CSJ_TAIKA_JIYU`     | MALTESAA CSJ taika jiyu sub-corpus rank                |
| `MALTESAA_CSJ_TAIKA_KADAI`    | MALTESAA CSJ taika kadai sub-corpus rank               |
| `MALTESAA_CSJ_TAIKA_MOGI`     | MALTESAA CSJ taika mogi sub-corpus rank                |
| `NAROU`                       | Narou (Syosetu) web novel frequency rank               |
| `NIER`                        | NIER frequency rank                                    |
| `NOVELS`                      | Novels corpus frequency rank                           |
| `VN_FREQ`                     | Visual novel frequency rank                            |
| `YOUTUBE_FREQ`                | YouTube frequency rank (v1)                            |

**Note:** Words in V2 that don't appear in `CEJC_anchor/consolidated.csv` (60,998 of 88,716) will have `-1` for all columns.

---

## RIRIKKU_CONSOLIDATED_V2_additional_data.tsv

Tab-separated file containing supplementary metadata for each word.

| Column         | Description                                                                   | Values                                                            |
| -------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `word`         | The Japanese word (kanji/kana form)                                           |                                                                   |
| `hiragana`     | Hiragana reading                                                              |                                                                   |
| `furigana`     | Furigana-annotated form using bracket notation (e.g. `分[わ]かる`)            | String or `null`                                                  |
| `JLPT`         | JLPT level of the word                                                        | `5`, `4`, `3`, `2`, `1`, or `-1` (not in JLPT)                    |
| `kaishi`       | Whether the word is in the Kaishi 1500 deck                                   | `1` = included, `0` = not included                                |
| `english`      | English translation/meaning                                                   | String or `null`                                                  |
| `RIRIKKU_RANK` | Rank from RIRIKKU_CONSOLIDATED_V2.csv (min of valid ranks across >=3 sources) | Integer or `-1` (unranked)                                        |
| `RIRIKKU_TIER` | Tier from RIRIKKU_CONSOLIDATED_V2.csv                                         | B: `BASIC`, C:`COMMON`, F:`FLUENT`, A:`ADVANCED`, or U:`UNRANKED` |

**Data sources:**

- Furigana & English: aggregated from DRONE-WORDS, KAISHI-WORDS, KIC, RF-WORDS, kklc2300-words, kklc30k-words JSON files
- JLPT: `additional-word-info/jlpt/word_jlpt.json`
- Kaishi: `additional-word-info/kaishi-included/kaishi_1500.txt`

**Coverage (out of 88,716 words):**

- Furigana: 12,152
- JLPT: 7,559
- Kaishi: 2,247
- English: 12,405
