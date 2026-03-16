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

export const CATEGORY_REGISTRY: Record<string, UnitDefinition[]> = {
  angles: anglesUnits,
  area: areaUnits,
  calorie: calorieUnits,
  current: currentUnits,
  data: dataUnits,
  density: densityUnits,
  distance: distanceUnits,
  "dynamic-viscosity": dynamicViscosityUnits,
  "electric-charge": electricChargeUnits,
  energy: energyUnits,
  force: forceUnits,
  frequency: frequencyUnits,
  "fuel-consumption": fuelConsumptionUnits,
  illumination: illuminationUnits,
  "kinematic-viscosity": kinematicViscosityUnits,
  "moment-of-inertia": momentOfInertiaUnits,
  numbers: numbersUnits,
  power: powerUnits,
  prefixes: prefixesUnits,
  pressure: pressureUnits,
  "radiation-absorbed": radiationAbsorbedUnits,
  radioactivity: radioactivityUnits,
  speed: speedUnits,
  strength: strengthUnits,
  temperature: temperatureUnits,
  time: timeUnits,
  torque: torqueUnits,
  typography: typographyUnits,
  vacuum: vacuumUnits,
  volume: volumeUnits,
  "volume-flow-rate": volumeFlowRateUnits,
  weight: weightUnits,
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

  return CATEGORY_REGISTRY[category] ?? [];
}
