# Add new datafile

# Update build scripts based on new CSV files

Aside from the word and the reading, each row in the json files in search subfolder
should also include

- JLPT (5, 4, 3, 2, 1, -1 if not in JLPT)
- Included in kaishi (1 - yes, 0 - no)
- Tier Emoji
- English Translation (if included)

rerun build scripts

# Improve Type Ahead. Currently it only shows the word and the reading

If included in the file, it should also show

- JLPT if has JLPT
- Kaishi badge if included in KAISHI
- Tier Emoji
- English translation
