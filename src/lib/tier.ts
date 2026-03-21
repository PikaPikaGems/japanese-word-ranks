/**
 * Frequency tier classification based on SINGLE_RANK.md Type A ranges.
 */

export type Tier = "BASIC" | "COMMON" | "FLUENT" | "ADVANCED" | "UNRANKED";

export function getTier(rank: number): Tier {
  if (rank < 1) return "UNRANKED";
  if (rank <= 1800) return "BASIC";
  if (rank <= 5000) return "COMMON";
  if (rank <= 12000) return "FLUENT";
  if (rank <= 25000) return "ADVANCED";
  return "UNRANKED";
}

export const TIER_ORDER: Record<Tier, number> = {
  BASIC: 0,
  COMMON: 1,
  FLUENT: 2,
  ADVANCED: 3,
  UNRANKED: 4,
};

/** The 16 shortlisted sources included in the bucket tier algorithm (SINGLE_RANK.md). */
export const INCLUDED_SOURCE_KEYS = [
  "RSPEER",
  "cejc_combined_rank",
  "cejc_small_talk_rank",
  "BCCWJ_LUW",
  "BCCWJ_SUW",
  "CC100",
  "MALTESAA_NWJC",
  "JITEN_GLOBAL",
  "JITEN_DRAMA",
  "ANIME_JDRAMA",
  "YOUTUBE_FREQ_V3",
  "NETFLIX",
  "DD2_MORPHMAN_NETFLIX",
  "WIKIPEDIA_V2",
  "ADNO",
  "DD2_MORPHMAN_SOL",
];

/**
 * Bucket Count Algorithm (SINGLE_RANK.md § Alternative: Bucket Count Algorithm).
 * Category Rank Ranges (Type A), Word count ≥3.
 * see SINGLE_RANK.md for more information
 */
export function getBucketTier(ranks: Record<string, number>): Tier {
  const valid = INCLUDED_SOURCE_KEYS.map((k) => ranks[k] ?? -1).filter(
    (r) => r !== -1,
  );
  if (valid.length < 3) return "UNRANKED";
  const counts = { BASIC: 0, COMMON: 0, FLUENT: 0, ADVANCED: 0 };
  for (const r of valid) {
    if (r <= 1800) counts.BASIC++;
    else if (r <= 5000) counts.COMMON++;
    else if (r <= 12000) counts.FLUENT++;
    else if (r <= 25000) counts.ADVANCED++;
  }
  const max = Math.max(
    counts.BASIC,
    counts.COMMON,
    counts.FLUENT,
    counts.ADVANCED,
  );
  if (counts.BASIC === max) return "BASIC";
  if (counts.COMMON === max) return "COMMON";
  if (counts.FLUENT === max) return "FLUENT";
  if (counts.ADVANCED === max) return "ADVANCED";
  return "UNRANKED";
}
