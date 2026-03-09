import { UnitDefinition } from './types';
import { DATA_UNITS } from './categories/dataUnits';

/**
 * Returns the appropriate unit definitions for a given category.
 * 
 * @param category - The category key (e.g., "data", "distance", "temperature")
 * @returns Array of unit definitions for the category
 */
export function getUnitsForCategory(category: string): UnitDefinition[] {
  switch (category) {
    case "data":
      return DATA_UNITS;
    default:
      // Default to data units for now; other categories will be added later
      return DATA_UNITS;
  }
}
