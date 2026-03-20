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
