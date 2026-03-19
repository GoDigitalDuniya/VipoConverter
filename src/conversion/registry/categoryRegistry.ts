import { anglesUnits } from "../categories/angles";
import { areaUnits } from "../categories/area";
import { calorieUnits } from "../categories/calorie";
import { getCurrencyUnits } from "../categories/currency";
import { currentUnits } from "../categories/current";
import { dataUnits } from "../categories/data";
import { densityUnits } from "../categories/density";
import { distanceUnits } from "../categories/distance";
import { dynamicViscosityUnits } from "../categories/dynamicViscosity";
import { electricChargeUnits } from "../categories/electricCharge";
import { energyUnits } from "../categories/energy";
import { forceUnits } from "../categories/force";
import { frequencyUnits } from "../categories/frequency";
import { fuelConsumptionUnits } from "../categories/fuelConsumption";
import { illuminationUnits } from "../categories/illumination";
import { kinematicViscosityUnits } from "../categories/kinematicViscosity";
import { momentOfInertiaUnits } from "../categories/momentOfInertia";
import { numbersUnits } from "../categories/numbers";
import { powerUnits } from "../categories/power";
import { prefixesUnits } from "../categories/prefixes";
import { pressureUnits } from "../categories/pressure";
import { radiationAbsorbedUnits } from "../categories/radiationAbsorbed";
import { radioactivityUnits } from "../categories/radioactivity";
import { speedUnits } from "../categories/speed";
import { strengthUnits } from "../categories/strength";
import { temperatureUnits } from "../categories/temperature";
import { timeUnits } from "../categories/time";
import { torqueUnits } from "../categories/torque";
import { typographyUnits } from "../categories/typography";
import { vacuumUnits } from "../categories/vacuum";
import { volumeUnits } from "../categories/volume";
import { volumeFlowRateUnits } from "../categories/volumeFlowRate";
import { weightUnits } from "../categories/weight";
import { UnitDefinition } from "../types/unit";

export type CategoryType =
  | "standard"
  | "timezone"
  | "power_plug"
  | "percentage"
  | "pace"
  | "number_system"
  | "glucose"
  | "mapping"
  | "business"
  | "calculator"
  | "lookup_table";

export interface CategoryEntry {
  type: CategoryType;
  units: UnitDefinition[];
}

export const CATEGORY_REGISTRY: Record<string, CategoryEntry> = {
  angles: { type: "standard", units: anglesUnits },
  area: { type: "standard", units: areaUnits },
  'bmi-calculator': { type: "calculator", units: [] },
  calorie: { type: "standard", units: calorieUnits },
  currency: { type: "standard", units: [] },
  current: { type: "standard", units: currentUnits },
  data: { type: "standard", units: dataUnits },
  density: { type: "standard", units: densityUnits },
  distance: { type: "standard", units: distanceUnits },
  "dynamic-viscosity": { type: "standard", units: dynamicViscosityUnits },
  "electric-charge": { type: "standard", units: electricChargeUnits },
  energy: { type: "standard", units: energyUnits },
  force: { type: "standard", units: forceUnits },
  frequency: { type: "standard", units: frequencyUnits },
  "fuel-consumption": { type: "standard", units: fuelConsumptionUnits },
  illumination: { type: "standard", units: illuminationUnits },
  "kinematic-viscosity": { type: "standard", units: kinematicViscosityUnits },
  "moment-of-inertia": { type: "standard", units: momentOfInertiaUnits },
  numbers: { type: "standard", units: numbersUnits },
  power: { type: "standard", units: powerUnits },
  prefixes: { type: "standard", units: prefixesUnits },
  pressure: { type: "standard", units: pressureUnits },
  "radiation-absorbed": { type: "standard", units: radiationAbsorbedUnits },
  radioactivity: { type: "standard", units: radioactivityUnits },
  speed: { type: "standard", units: speedUnits },
  strength: { type: "standard", units: strengthUnits },
  temperature: { type: "standard", units: temperatureUnits },
  time: { type: "standard", units: timeUnits },
  torque: { type: "standard", units: torqueUnits },
  typography: { type: "standard", units: typographyUnits },
  vacuum: { type: "standard", units: vacuumUnits },
  volume: { type: "standard", units: volumeUnits },
  "volume-flow-rate": { type: "standard", units: volumeFlowRateUnits },
  weight: { type: "standard", units: weightUnits },
  percentage: { type: "percentage", units: [] },
  pace: { type: "pace", units: [] },
  timezone: { type: "timezone", units: [] },
  "power-plug": { type: "power_plug", units: [] },
  clothing: { type: "mapping", units: [] },
  "shoe-size": { type: "mapping", units: [] },
  "hex-decimal-binary": { type: "number_system", units: [] },
  glucose: { type: "glucose", units: [] },
  business: { type: "business", units: [] },
};

/**
 * Returns the unit list for a given category.
 *
 * All categories use the static CATEGORY_REGISTRY.
 * Currency is the sole exception — its units are computed fresh on every call
 * because exchange rates are loaded asynchronously from AsyncStorage and the
 * static registry would freeze a stale empty-rate snapshot at module init time.
 */
export function getUnitsForCategory(category: string): UnitDefinition[] {
  if (category === "currency") {
    return getCurrencyUnits();
  }

  const entry = CATEGORY_REGISTRY[category];
  return entry?.units ?? [];
}

/**
 * Returns the category entry (with type and units) for a given category key.
 */
export function getCategoryEntry(category: string): CategoryEntry | undefined {
  return CATEGORY_REGISTRY[category];
}

/**
 * Returns the category type for a given category key.
 */
export function getCategoryType(category: string): CategoryType {
  const entry = CATEGORY_REGISTRY[category];
  return entry?.type ?? "standard";
}
