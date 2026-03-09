import { UnitDefinition } from './types';

/**
 * Converts a numeric value from one unit to another using their multipliers.
 * 
 * @param value - The numeric value to convert
 * @param fromUnit - The source unit definition
 * @param toUnit - The target unit definition
 * @returns The converted value
 */
export function convertValue(
  value: number,
  fromUnit: UnitDefinition,
  toUnit: UnitDefinition
): number {
  if (!fromUnit || !toUnit) return 0;
  
  const base = value * fromUnit.multiplier;
  const result = base / toUnit.multiplier;
  
  return Number.isFinite(result) ? result : 0;
}
