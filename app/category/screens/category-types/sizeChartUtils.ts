import { SizeCategory, WheelEntry } from "./sizeChartTypes";

/**
 * Extract wheel entries for a given category and unit.
 *
 * Rules:
 * - Skip rows where row[unitKey] is empty string or undefined
 * - Skip rows where row[unitKey] contains "-" (range strings)
 * - Skip duplicate displayValue values — keep first occurrence only
 * - Return { displayValue, rowIndex } per unique valid value
 */
export function getWheelEntries(
  category: SizeCategory,
  unitKey: string
): WheelEntry[] {
  const seen = new Set<string>();
  const entries: WheelEntry[] = [];

  for (let i = 0; i < category.rows.length; i++) {
    const row = category.rows[i];
    const value = row[unitKey];

    // Skip empty or undefined values
    if (!value || value === "") {
      continue;
    }

    // Skip values containing "-" (ranges)
    if (value.includes("-")) {
      continue;
    }

    // Skip duplicates
    if (seen.has(value)) {
      continue;
    }

    seen.add(value);
    entries.push({
      displayValue: value,
      rowIndex: i,
    });
  }

  return entries;
}

/**
 * Splits a size value string into a whole part and an optional fraction part.
 *
 * Handles three patterns:
 * - "13 1/2"  → { whole: "13", fraction: "1/2" }   (space-separated)
 * - "A1/2"    → { whole: "A",  fraction: "1/2" }   (inline, letter + fraction)
 * - "1/4"     → { whole: "",   fraction: "1/4" }   (pure fraction, no whole)
 * - "13"      → { whole: "13", fraction: null  }   (no fraction)
 */
export function parseSizeValue(value: string): { whole: string; fraction: string | null } {
  const spaceMatch = value.match(/^(.+?)\s+(\d+\/\d+)$/);
  if (spaceMatch) {
    return { whole: spaceMatch[1], fraction: spaceMatch[2] };
  }
  const inlineMatch = value.match(/^([A-Za-z0-9]+?)(\d+\/\d+)$/);
  if (inlineMatch) {
    return { whole: inlineMatch[1], fraction: inlineMatch[2] };
  }
  const pureFraction = value.match(/^(\d+\/\d+)$/);
  if (pureFraction) {
    return { whole: "", fraction: pureFraction[1] };
  }
  return { whole: value, fraction: null };
}
