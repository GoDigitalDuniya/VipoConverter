// Auto-generated unit definitions for temperature
// Base unit: celsius
// Last updated: 2026-03-13
import { UnitDefinition } from "../types/unit";


export const temperatureUnits: UnitDefinition[] = [
  // ── Temperature Units ──
  {
    key: "celsius",
    label: "Celsius",
    symbol: "°C",
    toBase: (v: number) => v,
    fromBase: (v: number) => v,
  },
  {
    key: "fahrenheit",
    label: "Fahrenheit",
    symbol: "°F",
    toBase: (v: number) => (v - 32) * 5 / 9,
    fromBase: (v: number) => v * 9 / 5 + 32,
  },
  {
    key: "kelvin",
    label: "Kelvin",
    symbol: "°K",
    toBase: (v: number) => v - 273.15,
    fromBase: (v: number) => v + 273.15,
  },
  {
    key: "rankine",
    label: "Rankine",
    symbol: "°R",
    toBase: (v: number) => (v - 491.67) * 5 / 9,
    fromBase: (v: number) => (v + 273.15) * 9 / 5,
  },
];
