# Description

- A website where given a japanese word, you can lookup the various frequency rankings from different datasets.
- You can search for a japanese word by typing KANA, KANJI, ROMAJI (no english translation)
- You can also sort japanese words based on the frequency rank given a dataset.

# Tech

- SHADCN
- TailwindCSS
- Lucide Icons
- Astro
- Static Site Generation (data does not change)
- (Uze Vanilla Javascript as much as possible, React if absolutely neccessary)
- English Font: "Avenir Next", fallback "Nunito"
- Japanese Font: Noto Sans JP, Zen Maru Gothic, Klee One

# Home Page Design `/?sort-order=JLPT&page=1` or

```

 ┌──────────────────────────────────────────────────────────────────────────────────┐
 │                                                                                  │
 │                                   TITLE_HEADER                                   │
 └──────────────────────────────────────────────────────────────────────────────────┘
 ┌──────┌──────────────────────────────────────────────────────────────────┌─────────┐
 │ iconA│                        Search_input_field                        │  iconB  │
 └──────└──────────────────────────────────────────────────────────────────└─────────┘
 ┌───────────────────────────────┐
 │  Sort_Order_Select_component  │                                      <<  <--  1 of 25 --> >>
 └───────────────────────────────┘
 ─────────────────────────────────────────────────────────────────────────────────────────────
 ┌─────┐┌─────────────────────────────────────────────────────────────────────────────────────┐
 │ 1.  ││┌─────────┐ ┌────────────────────────┐  ┌─────────────────┐ ┌─────────────────┐      │
 └─────┘││  iconC  │ │                        │  │  SMALLBADGE_A   │ │  SMALLBADGE_B   │      │
        │└─────────┘ │                        │  └─────────────────┘ └─────────────────┘      │
        │┌─────────┐ │ BIG_FONT_JAPANESE_WORD │  ┌─────────────────┐                          │
        ││  iconD  │ │                        │  │  SMALLBADGE_C   │                          │
        │└─────────┘ └────────────────────────┘  └─────────────────┘                          │
        │                                                                                     │
        │                                                                                     │
        │                                                                                     │
        │                                                                                     │
        └─────────────────────────────────────────────────────────────────────────────────────┘

```

1. TITLE_HEADER: "Japanese Word Frequency Rank Lookup" (small font, like a banner, css position: fixed)
2. search_input_field: standard Autocomplete component like google_search_input_component: https://ui.shadcn.com/docs/components/radix/command (css position: sticky) with Magnifying class icon.
3. iconB: Dice Button (Random Word - I'm feeling lucky)
4. Sort_Order_Select_component (combobox) - https://ui.shadcn.com/docs/components/radix/combobox
5. SmallBadge: badge with icon, clicking opens popover, https://ui.shadcn.com/docs/components/radix/badge, https://ui.shadcn.com/docs/components/radix/popover
6. Note: "1." is bulletpoint of orderedlist item `<ol><<li>JPWORD1</li>JPWORD2><li></li>/ol>`
7. Standard Pagination: << <-- 1 of 25 --> >>

- "<<" and ">>" jumps 10 pages
- 100 items per page

8.  BIG_FONT_JAPANESE_WORD - "text-7xl"

# Icons

1. iconA: Magnifying class (static, standard icon for inputfield.)
2. iconB: Dice (button, function: Random Word - I'm feeling lucky)
3. iconC: Headphones Icon (button, function: speaks word)
4. iconD: Book Icon (button, function: clicking opens popover, https://ui.shadcn.com/docs/components/radix/badge, https://ui.shadcn.com/docs/components/radix/popover )

# Word Page Design `/word/食べる`

```

 ┌──────────────────────────────────────────────────────────────────────────────────┐
 │                                                                                  │
 │                                   TITLE_HEADER                                   │
 └──────────────────────────────────────────────────────────────────────────────────┘
 ┌──────┌──────────────────────────────────────────────────────────────────┌─────────┐
 │ iconA│                              食べる                              │  iconB  │
 └──────└──────────────────────────────────────────────────────────────────└─────────┘
 ─────────────────────────────────────────────────────────────────────────────────────────────
        ┌───────────────────────────────────────────────────────────────────────────────────────────┐
        │┌─────────┐ ┌────────────────────────┐  ┌─────────────────┐ ┌─────────────────┐            │
        ││  iconC  │ │                        │  │  SMALLBADGE_A   │ │  SMALLBADGE_B   │            │
        │└─────────┘ │                        │  └─────────────────┘ └─────────────────┘            │
        │┌─────────┐ │ BIG FONT JAPANESE WORD │  ┌─────────────────┐                                │
        ││  iconD  │ │                        │  │  SMALLBADGE_C   │                                │
        │└─────────┘ └────────────────────────┘  └─────────────────┘                                │
        └───────────────────────────────────────────────────────────────────────────────────────────┘

   #SECTION
   ##SUBSECTION
   ┌───────────────────────┬───────────────────────┬───────────────────────┬─────────────────────────┐
   │ Col_A                 │ Col_B                 │ Col_C                 │ Col_D                   │
   │───────────────────────┼───────────────────────┼───────────────────────┼─────────────────────────│
   │                       │                       │                       │                         │
   │                       │                       │                       │                         │
   │                       │                       │                       │                         │
   │                       │                       │                       │                         │
   └───────────────────────┴───────────────────────┴───────────────────────┴─────────────────────────┘

```

- #Section - Table Header
- ##Subsection - Table Subheader 
- Col_A: Frequency Category Tier (See `data/frequency/SINGLE_RANK.md` for context )
- Col_B: Dataset CSV column name
- Col_C: Frequency Rank
- Col_D: Dataset Description

See `data/frequency/dataset-catalog.md` for context

# Recommended Presentation Components (Use your best judgement)

1. <Pagination />
2. <SearchCommandInputField>
3. <FrequencyRankSortOrderSelectComponent>
4. <BadgeWithPopover/>
5. <JapaneseWordCardItem />

# Other features

- Add a filter fs: - Katakana Only, NonKatakana Only, All
- Add light mode / dark mode
- Add footer

# Footer

- About + Creditsxw
- Privacy Policy
- Terms of Use
- Kanji Heatmap
- Ririkku

## Socials

- GitHub
- Instagram
- Discord
- Twitter

# Improvements Word Page

1. Is there a way for the components not to shift when collapsing and expanding (the components shift because of the scroll bar disappearing and apearing.)

2. When you open the popover, it is left-aligned at the beginning and then after 20 seconds it shifts to be centered aligned. How to change?

3. Clicking the book icon doesnt do anything. It should open a popup and the content should just be "TODO: ADD content here"
4. For badges in the word card Only Display the following by default

- JLPT
- Kaishi
- BCCWJ LUV
- CEJC Small Talk
- Jiten Drama
- Netflix
- Wikipedia V2
- Slice-of-Life Anime

(And when you click "View More", display everything , display everything in the current order you are currently displaying now. )

# Style

- Can we have a more "cute" or "kid-friendly" theme / style ? rounder borders ("rounded-full" for badges), bigger paddings around texts, and cuter shades / tones of selected colors (cuter shade of green, blue etc ). Similar to the feel of Duolingo.
- I also want a dark and light mode
- Change fonts, English font: Nunito font instead, Japanese font: Zen Maru Gothic, Do not use monospace fonts anywhere. Use nunito font everywhere.

# Add css transition animations

- initially loading Word Card
- when opening badge popover
- expanding and collapsing accordions in word page

# Small change on badges

Instead of a colored dot on the badge add emoji

- BASIC 🌱
- COMMON ☘️
- FLUENT 🌷
- ADVANCED 📚
- RARE 🦉

# root page

- The pagination icons "<<" and ">>" behavior is INCORRECT. The correct behavior is jumping 10 pages (next and previous) aka big jump.
- Sort by Select doesnt look good (caret icon looks misaligned, add padding)

# Word Page

- Do not show badges with a frequency rank of -1
- Clicking on a word card (not just the word) should also redirect to the specific word word/?w=の

# Name of Website (Ideas)

- jpwordrank.com
- jpfrequency.com
- japanesewordrank.com
- jpfrequencylookup.com
- japanesefrequency.com

# Notes

=== RIRIKKU ===
Total words: 92171
First 3: [
'うん (うん) RIRIKKU_RANK=1',
'だ (だ) RIRIKKU_RANK=1',
'の (の) RIRIKKU_RANK=1'
]
Columns per word: 18

=== JLPT ===
Total words: 7880
食べる: 5
だ: 5

=== KAISHI ===
Total entries: 1504
Unique words: 1299
First 5: [ '私/わたし (#0)', '私/あなた (#1)', '私/さん (#2)', '彼/かれ (#3)', '好き/すき (#4)' ]
何 entries: [ '何/なに', '何/なん', '何/それ', '何/あれ', '何/どれ' ]

=== CONSOLIDATED ===
Total words: 24605
食べる columns: 74
食べる CC100: 173

# Credits

- Mock UI: https://wiretext.app/
