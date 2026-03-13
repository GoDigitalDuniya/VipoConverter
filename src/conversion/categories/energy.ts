// Auto-generated unit definitions for energy
// Base unit: joule
// Last updated: 2026-03-13
import { UnitDefinition } from "../types/unit";


export const energyUnits: UnitDefinition[] = [
  // ── Energy Units ──
  {
    key: "joule",
    label: "Joule",
    symbol: "j",
    toBase: (v: number) => v,
    fromBase: (v: number) => v,
  },
  {
    key: "btu",
    label: "BTU",
    symbol: "BTU",
    toBase: (v: number) => v * 1055.05585,
    fromBase: (v: number) => v / 1055.05585,
  },
  {
    key: "calorie",
    label: "Calories",
    symbol: "cal.",
    toBase: (v: number) => v * 4.1868,
    fromBase: (v: number) => v / 4.1868,
  },
  {
    key: "erg",
    label: "Erg",
    symbol: "erg",
    toBase: (v: number) => v * 1e-7,
    fromBase: (v: number) => v / 1e-7,
  },
  {
    key: "foot-pound",
    label: "Foot-Pounds",
    symbol: "fp",
    toBase: (v: number) => v * 1.3558179,
    fromBase: (v: number) => v / 1.3558179,
  },
  {
    key: "kilocalorie",
    label: "Kilocalories",
    symbol: "kcal",
    toBase: (v: number) => v * 4186.8,
    fromBase: (v: number) => v / 4186.8,
  },
  {
    key: "kilogram-meter",
    label: "Kilogram-meter",
    symbol: "kg-m",
    toBase: (v: number) => v * 9.80665,
    fromBase: (v: number) => v / 9.80665,
  },
  {
    key: "kilojoule",
    label: "Kilojoule",
    symbol: "kJ",
    toBase: (v: number) => v * 1000,
    fromBase: (v: number) => v / 1000,
  },
  {
    key: "kilowatt-hour",
    label: "Kilowatt-hour",
    symbol: "kwh",
    toBase: (v: number) => v * 3600000,
    fromBase: (v: number) => v / 3600000,
  },
  {
    key: "newton-meter",
    label: "Newtonmeter",
    symbol: "nm",
    toBase: (v: number) => v * 1,
    fromBase: (v: number) => v / 1,
  },
  {
    key: "watt-hour",
    label: "Watt-hour",
    symbol: "wh",
    toBase: (v: number) => v * 3600,
    fromBase: (v: number) => v / 3600,
  },
];
