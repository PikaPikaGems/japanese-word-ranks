# Things to do

## Features

1. Filter Functionality: Select: Katakana Only, NonKatakana Only, All
2. Footer Implementation
3. Light Mode, Dark Mode
4. Cute Kid Friendly Feel of the site (duolingo style, cuter shades of colors (green, blue etc), rounder borders for badges), bigger paddings and margins, bigger fonts (except for website header)
5. Add css transition animations
6. Change << and >> pagination functionality: The pagination icons "<<" and ">>" behavior is INCORRECT. The correct behavior is jumping 10 pages (next and previous) aka big jump.
7. Create a favicon for this project
8. Add a "copy icon" that copies the url for a specific word to clipboard "MYWEBSITE.com/?w=たち". Put the icon after the book icon/
9. Replace "TODO: Add content here" to Add External links to dictionaries

# Quick Wins

1. Change fonts: English font: Nunito font instead, Japanese font: Zen Maru Gothic, Do not use monospace fonts anywhere. Use nunito font everywhere.
2. `/` page Sort by Select doesnt look good (caret icon looks misaligned, add padding)
3. Instead of a colored dot on the badge add emoji, BASIC 🌱, COMMON ☘️, FLUENT 🌷, ADVANCED 📚, RARE / UNRANKED 🦉
4. Do not show badges with a frequency rank of -1
5. Clicking on a word card (not just the word) should also redirect to the specific word word/?w=の

# More quick wins

- Clicking on the header should redirect to "/"
- Skeleton Word card or Loading spinner icon instead of showing the text "loading..." when loading

# To Think about

## How to deduplicate words

- There are many duplicate words with duplicate rows IE: 食べる, たべる, we need to create an algorithm to deduplicate/ merge duplicate entried but we need to think about this carefully and thoughtfully

## Places to refactor to keep the codebase clean

## Questions

- How to put in github pages pikapikagems.github.io/japanese-word-ranks
- How to put some sort of analytics to see how many are actually using the site? Can we do that for github pages, just simple metrics, like how many unique visits and how long they stay

# Add css transition animations

- initially loading Word Card
- when opening badge popover
- expanding and collapsing accordions in word page

# Footer

- About + Credits
- Privacy Policy
- Terms of Use
- Kanji Heatmap
- Ririkku

## Socials

- GitHub
- Instagram
- Discord
- Twitter
