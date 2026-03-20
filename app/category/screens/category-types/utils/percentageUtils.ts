export type PercentageMode = "percentage-of-value" | "value-of-percentage";

/**
 * Mode 1: What percentage is `part` of `whole`?
 * Returns null if inputs are invalid.
 */
export function computePercentageOfValue(
  part: number,
  whole: number
): number | null {
  if (!Number.isFinite(part) || !Number.isFinite(whole) || whole === 0) return null;
  return (part / whole) * 100;
}

/**
 * Mode 2: What is `percentage`% of `value`?
 * Returns null if inputs are invalid.
 */
export function computeValueOfPercentage(
  percentage: number,
  value: number
): number | null {
  if (!Number.isFinite(percentage) || !Number.isFinite(value)) return null;
  return (percentage / 100) * value;
}
