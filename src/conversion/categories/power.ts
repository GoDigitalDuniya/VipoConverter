// Auto-generated unit definitions for power
// Base unit: watt
// Last updated: 2026-03-13
import { UnitDefinition } from "../types/unit";


export const powerUnits: UnitDefinition[] = [
  // ── Power Units ──
  {
    key: "watt",
    label: "Watt",
    symbol: "W",
    toBase: (v: number) => v,
    fromBase: (v: number) => v,
  },
  {
    key: "milliwatt",
    label: "Milliwatt",
    symbol: "mW",
    toBase: (v: number) => v * 0.001,
    fromBase: (v: number) => v / 0.001,
  },
  {
    key: "kilowatt",
    label: "Kilowatt",
    symbol: "kW",
    toBase: (v: number) => v * 1000,
    fromBase: (v: number) => v / 1000,
  },
  {
    key: "megawatt",
    label: "Megawatt",
    symbol: "MW",
    toBase: (v: number) => v * 1000000,
    fromBase: (v: number) => v / 1000000,
  },
  {
    key: "gigawatt",
    label: "Gigawatt",
    symbol: "GW",
    toBase: (v: number) => v * 1000000000,
    fromBase: (v: number) => v / 1000000000,
  },
  {
    key: "terawatt",
    label: "Terawatt",
    symbol: "TW",
    toBase: (v: number) => v * 1000000000000,
    fromBase: (v: number) => v / 1000000000000,
  },
  {
    key: "horsepower-mechanical",
    label: "Horsepower (mech.)",
    symbol: "hp",
    toBase: (v: number) => v * 745.69987,
    fromBase: (v: number) => v / 745.69987,
  },
  {
    key: "horsepower-metric",
    label: "Horsepower (metr.)",
    symbol: "hp",
    toBase: (v: number) => v * 735.49875,
    fromBase: (v: number) => v / 735.49875,
  },
  {
    key: "btu-per-minute",
    label: "BTU/minute",
    symbol: "btu/m",
    toBase: (v: number) => v * 17.58427,
    fromBase: (v: number) => v / 17.58427,
  },
  {
    key: "foot-pound-per-minute",
    label: "Ft Pounds/Min.",
    symbol: "fpm",
    toBase: (v: number) => v * 0.02259697,
    fromBase: (v: number) => v / 0.02259697,
  },
  {
    key: "foot-pound-per-second",
    label: "Ft Pounds/Sec.",
    symbol: "fps",
    toBase: (v: number) => v * 1.3558179,
    fromBase: (v: number) => v / 1.3558179,
  },
];
