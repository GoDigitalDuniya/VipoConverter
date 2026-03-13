import { UnitDefinition } from "../conversion/types/unit";

/**
 * Represents a conversion unit with its properties and multiplier.
 * Re-exported from conversion engine for UI layer convenience.
 */
export type Unit = UnitDefinition & {
  name?: string;
};

/**
 * Map of unit keys to their converted string values.
 */
export type ConversionMap = Record<string, string>;
