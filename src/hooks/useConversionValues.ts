import { useCallback, useMemo } from "react";
import { convertValue } from "../conversions/conversionEngine";
import { ConversionMap, Unit } from "../types/unit";

/**
 * Parameters for the useConversionValues hook.
 */
type UseConversionValuesParams = {
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
  inputValue,
  inputUnit,
  units,
}: UseConversionValuesParams): ConversionMap {
  const convert = useCallback(
    (value: string, fromKey: string, toKey: string): string => {
      const from = units.find((u) => u.key === fromKey);
      const to = units.find((u) => u.key === toKey);
      if (!from || !to) return "0";

      const num = parseFloat(value || "0");
      const result = convertValue(num, from, to);
      return result.toString();
    },
    [units]
  );

  const convertedValues = useMemo(() => {
    return units.reduce((acc: ConversionMap, unit) => {
      acc[unit.key] = convert(inputValue, inputUnit, unit.key);
      return acc;
    }, {} as ConversionMap);
  }, [inputValue, inputUnit, convert, units]);

  return convertedValues;
}
