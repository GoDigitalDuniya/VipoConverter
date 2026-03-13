import { useCallback, useMemo } from "react";
import { convert } from "../conversion/engine/convert";
import { ConversionMap, Unit } from "../types/unit";

/**
 * Parameters for the useConversionValues hook.
 */
type UseConversionValuesParams = {
  /** The converter category key */
  category: string;
  /** The current input value as a string */
  inputValue: string;
  /** The key of the unit to convert from */
  inputUnit: string;
  /** The array of all available units */
  units: Unit[];
};

/**
 * Custom hook that handles unit conversion logic.
 * 
 * Converts the input value from the input unit to all units in the provided array.
 * Returns a memoized map of unit keys to their converted string values.
 * 
 * @param params - The conversion parameters
 * @returns A record mapping unit keys to converted values as strings
 * 
 * @example
 * ```tsx
 * const convertedValues = useConversionValues({
 *   inputValue: "10",
 *   inputUnit: "bit",
 *   units: DATA_UNITS
 * });
 * // convertedValues = { bit: "10", byte: "1.25", ... }
 * ```
 */
export function useConversionValues({
  category,
  inputValue,
  inputUnit,
  units,
}: UseConversionValuesParams): ConversionMap {
  const convertByKey = useCallback(
    (value: string, fromKey: string, toKey: string): string => {
      const num = parseFloat(value || "0");
      const result = convert(category, num, fromKey, toKey);
      return result.toString();
    },
    [category]
  );

  const convertedValues = useMemo(() => {
    return units.reduce((acc: ConversionMap, unit) => {
      acc[unit.key] = convertByKey(inputValue, inputUnit, unit.key);
      return acc;
    }, {} as ConversionMap);
  }, [inputValue, inputUnit, convertByKey, units]);

  return convertedValues;
}
