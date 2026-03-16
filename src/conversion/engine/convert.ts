import { getUnitsForCategory } from "../registry/categoryRegistry";

export function convert(
  category: string,
  value: number,
  fromKey: string,
  toKey: string
): number {
  const units = getUnitsForCategory(category);
  if (!units.length) return 0;

  const from = units.find((u) => u.key === fromKey);
  const to = units.find((u) => u.key === toKey);
  if (!from || !to) return 0;

  const baseValue = from.toBase(value);
  const result = to.fromBase(baseValue);
  return Number.isFinite(result) ? result : 0;
}
