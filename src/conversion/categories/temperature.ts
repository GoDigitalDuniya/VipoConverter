import { UnitDefinition } from "../types/unit";

export const temperatureUnits: UnitDefinition[] = [
  { key: "c", label: "Celsius", toBase: (v) => v, fromBase: (v) => v },
  { key: "f", label: "Fahrenheit", toBase: (v) => (v - 32) * (5 / 9), fromBase: (v) => v * (9 / 5) + 32 },
  { key: "k", label: "Kelvin", toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
];
