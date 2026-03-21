# Things to do

Here is a few simple tasks you need to do. They are very simple. Please don't overthink it they are very simple and easy, check your memory / context for the project overview. If you have questions, just ask.
Each task is standalone and dont require knowledge of other tasks. So you dont need to remember

## Features

- The z-index of badge popovers seems wrong. They get cut off by the adjacent card.
- The animation of the popover of the book icon is amazing. can replicate that popover animation of all the badges with popovers in the word cards. The current badges doesn't have any apparent animation
- Add an animation of about, terms, privacy pages on mount / transition of the content of the page
- Can there is a transition when you explan the <details /> but no transition on collapse. you add a transition on collapse?
- Filter out words with romaji in it, such as "オーロラ-aurora", update build-json.ts, generate-json-data.md and website-data-architecture.md accordingly
- Create a favicon for this project. A simple SVG ”あ”

# Task: bucket tier emoji

Add a bucket tier emoji at the top right of the word card. just beside (the right side of) item number (#1, #2, ... etc) if it exists, if not just put it by itself. see `Alternative: Bucket Count Algorithm` section of SINGLE_RANK.md for context. use `Category Rank Ranges (Type A), Word count ≥3` BASIC, COMMON, FLUENT, ADVANCED, map to => 🌱, ☘️, 🌷, 📚, 🦉

# Task: update dataset-catalog.ts so that the dataset description increases the credibility of the dataset

- There no mention of the source of the dataset which decreases is credibility. Please add it like for example: "Japan's official balanced written corpus", update dataset-catalog.ts . See dataset-catalog.md and the markdowns in https://github.com/PikaPikaGems/japanese-word-frequency if you need more info. You can also search the net

# Task: FrequencyTable.astro update:

```
                          <td data-rank-cell class="py-2.5 px-3 sm:px-5 align-middle text-right tabular-nums text-sm text-muted-foreground/40">
                          <!-- TODO: Instead of tier BASIC, COMMON, FLUENT, ADVANCED,  can we put emojis instead? 🌱, ☘️, 🌷, 📚, 🦉  see also badges.ts file-->
                            —
```

# To Think about

## How to deduplicate words

- There are many duplicate words with duplicate rows IE: 食べる, たべる, we need to create an algorithm to deduplicate/ merge duplicate entried but we need to think about this carefully and thoughtfully. How to we detect that they're duplicates in the first place? check reading if one is all-kana and one is has kanji? but the word reading of the one that has kanji is the same as all-kana word? Is this problematic? How to merge? get the minimum rank given both for each column respectively? There

## Places to refactor to keep the codebase clean

## Questions

- How to put in github pages pikapikagems.github.io/japanese-word-ranks
- How to put some sort of analytics to see how many are actually using the site? Can we do that for github pages, just simple metrics, like how many unique visits and how long they stay
