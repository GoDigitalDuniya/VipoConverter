import { useEffect, useState } from "react";
import { Unit } from "../types/unit";

/**
 * Parameters for the useUnitSelection hook.
 */
type UseUnitSelectionParams = {
  /** The currently visible units (filtered or full list) */
  visibleUnits: Unit[];
  /** Whether the favorites filter is currently enabled */
  favoritesFilterEnabled: boolean;
};

/**
 * Return type for the useUnitSelection hook.
 */
type UseUnitSelectionReturn = {
  /** The currently selected input unit key */
  inputUnit: string;
  /** The currently selected output unit key */
  outputUnit: string;
  /** Function to update the input unit */
  setInputUnit: (unit: string) => void;
  /** Function to update the output unit */
  setOutputUnit: (unit: string) => void;
};

/**
 * Custom hook that manages unit selection state and validation.
 * 
 * Handles:
 * - Input and output unit state
 * - Resetting units when favorites filter toggles
 * - Validating units remain in visible list
 * - Falling back to first unit if current selection becomes invalid
 * 
 * @param params - The unit selection parameters
 * @returns The current unit selection state and setters
 * 
 * @example
 * ```tsx
 * const { inputUnit, outputUnit, setInputUnit, setOutputUnit } = useUnitSelection({
 *   visibleUnits,
 *   favoritesFilterEnabled
 * });
 * ```
 */
export function useUnitSelection({
  visibleUnits,
  favoritesFilterEnabled,
}: UseUnitSelectionParams): UseUnitSelectionReturn {
  const [inputUnit, setInputUnit] = useState("bit");
  const [outputUnit, setOutputUnit] = useState("bit");

  // Reset both units to the beginning whenever favorites filter is toggled
  // or when visibleUnits changes (e.g., category change).
  useEffect(() => {
    if (visibleUnits.length === 0) return;

    const firstUnitKey = visibleUnits[0].key;
    setInputUnit(firstUnitKey);
    setOutputUnit(firstUnitKey);
  }, [favoritesFilterEnabled, visibleUnits]);

  // Validate units when visibleUnits changes - ensure current selections
  // are still valid, falling back to first unit if not.
  useEffect(() => {
    if (visibleUnits.length === 0) return;

    const inputInVisible = visibleUnits.some((u) => u.key === inputUnit);
    const outputInVisible = visibleUnits.some((u) => u.key === outputUnit);

    const nextInputUnit = inputInVisible ? inputUnit : visibleUnits[0].key;
    const nextOutputUnit = outputInVisible ? outputUnit : visibleUnits[0].key;

    if (nextInputUnit !== inputUnit) setInputUnit(nextInputUnit);
    if (nextOutputUnit !== outputUnit) setOutputUnit(nextOutputUnit);
  }, [visibleUnits, inputUnit, outputUnit]);

  return {
    inputUnit,
    outputUnit,
    setInputUnit,
    setOutputUnit,
  };
}
