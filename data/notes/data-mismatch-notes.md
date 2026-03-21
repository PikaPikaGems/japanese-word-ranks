So 406 words exist in both CSVs, have a valid CEJC rank in RIRIKKU, but are -1 in consolidated.csv. These aren't obscure words — たち is rank 153.

This isn't a "top 25k cutoff" issue. consolidated.csv has 14,200 words with CEJC data and 24,605 rows total, so it has capacity. 406 words with valid CEJC ranks just got dropped when consolidated.csv was built — likely a join/merge issue in whatever script produced it (different tokenization, reading mismatch, etc.).

The UI fix handles it correctly, but if you want the consolidated.csv to be complete, the upstream script that generates it needs investigation.

Yes, only 406 words are actually wrong — those exist in both CSVs but have a valid CEJC rank in RIRIKKU that's missing (-1) in consolidated.csv.

The 16,707 number I gave earlier was misleading. Most of that is just words that are in RIRIKKU (~92k) but not in consolidated (~25k) at all — which is expected. The actual data bug in consolidated.csv only affects 406 words.

# Rank Mismatch

67,972 out of 92,171 words (74%) have at least one mismatch, totaling 215,110 mismatched cells.

It's entirely one-directional: RIRIKKU has valid ranks that consolidated.csv lacks — never the reverse. This makes sense: consolidated.csv only covers the top 25k words (per its directory name top25k-all-freq), while RIRIKKU covers all ~92k. So any word outside the top 25k in a given dataset will have a rank in RIRIKKU but -1 in consolidated.

The CEJC columns are the most affected (16,707 each), which is why your たち bug was so visible — but the issue applies to every column. The fix I applied handles all of them correctly.
