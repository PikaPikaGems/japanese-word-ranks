import type { Tier } from "./tier";

export const TIER_STYLE: Record<Tier, { badge: string; emoji: string }> = {
  BASIC:    { badge: "badge-basic bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100",   emoji: "🌱" },
  COMMON:   { badge: "badge-common bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",              emoji: "☘️" },
  FLUENT:   { badge: "badge-fluent bg-violet-50 text-violet-700 border-violet-200 hover:bg-violet-100",      emoji: "🌷" },
  ADVANCED: { badge: "badge-advanced bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100",        emoji: "📚" },
  UNRANKED: { badge: "badge-unranked bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100",            emoji: "🦉" },
};
