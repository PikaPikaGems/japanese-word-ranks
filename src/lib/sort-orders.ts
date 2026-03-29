/**
 * Sort order definitions. Each sort order has a key (matching a CSV column or special key),
 * a human-friendly label, and a short description.
 *
 * Frequency columns are sourced from dataset-catalog.ts (single source of truth).
 * JLPT and Kaishi are supplementary sort orders not present in the catalog.
 */

import { highlighted } from "./dataset-catalog";

export interface SortOrder {
  key: string;
  label: string;
  description: string;
}

export const SORT_ORDERS: SortOrder[] = [
  // Supplementary
  {
    key: "JLPT",
    label: "JLPT",
    description:
      "Japanese Language Proficiency Test level (N5 easiest → N1 hardest)",
  },
  {
    key: "KAISHI",
    label: "Kaishi 1500",
    description: "Beginner vocabulary order from the Kaishi 1500 deck",
  },

  // Shortlisted frequency sources (from dataset-catalog)
  ...highlighted.map((d) => ({
    key: d.columnId,
    label: d.label,
    description: d.description,
  })),
];

/** All frequency column keys from RIRIKKU_CONSOLIDATED.csv (excludes RIRIKKU_RANK, word, hiragana, katakana) */
export const FREQUENCY_COLUMN_KEYS = SORT_ORDERS.filter(
  (s) => s.key !== "JLPT" && s.key !== "KAISHI",
).map((s) => s.key);

/** Lookup sort order by key */
export const SORT_ORDER_MAP = new Map(SORT_ORDERS.map((s) => [s.key, s]));
