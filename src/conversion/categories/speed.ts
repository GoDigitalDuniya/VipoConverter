// Auto-generated unit definitions for speed
// Base unit: meter-per-second
// Last updated: 2026-03-13
import { UnitDefinition } from "../types/unit";


export const speedUnits: UnitDefinition[] = [
  // ── Speed Units ──
  {
    key: "meter-per-second",
    label: "Meter/second",
    symbol: "m/s",
    toBase: (v: number) => v,
    fromBase: (v: number) => v,
  },
  {
    key: "centimeter-per-minute",
    label: "Centimeter/minute",
    symbol: "cm/min",
    toBase: (v: number) => v * 0.00016666666666666666,
    fromBase: (v: number) => v / 0.00016666666666666666,
  },
  {
    key: "centimeter-per-second",
    label: "Centimeter/second",
    symbol: "cm/s",
    toBase: (v: number) => v * 0.01,
    fromBase: (v: number) => v / 0.01,
  },
  {
    key: "foot-per-minute",
    label: "Foot/minute",
    symbol: "ft/m",
    toBase: (v: number) => v * 0.00508,
    fromBase: (v: number) => v / 0.00508,
  },
  {
    key: "foot-per-second",
    label: "Foot/second",
    symbol: "ft/s",
    toBase: (v: number) => v * 0.3048,
    fromBase: (v: number) => v / 0.3048,
  },
  {
    key: "kilometer-per-hour",
    label: "Kilometer/hour",
    symbol: "km/h",
    toBase: (v: number) => v * 0.2777777777777778,
    fromBase: (v: number) => v / 0.2777777777777778,
  },
  {
    key: "kilometer-per-minute",
    label: "Kilometer/min",
    symbol: "km/m",
    toBase: (v: number) => v * 16.666666666666668,
    fromBase: (v: number) => v / 16.666666666666668,
  },
  {
    key: "knot",
    label: "Knot",
    symbol: "kn",
    toBase: (v: number) => v * 0.514444,
    fromBase: (v: number) => v / 0.514444,
  },
  {
    key: "mach",
    label: "Mach",
    symbol: "mach",
    toBase: (v: number) => v * 340.29,
    fromBase: (v: number) => v / 340.29,
  },
  {
    key: "meter-per-minute",
    label: "Meter/minute",
    symbol: "m/min",
    toBase: (v: number) => v * 0.016666666666666666,
    fromBase: (v: number) => v / 0.016666666666666666,
  },
  {
    key: "mile-per-hour",
    label: "Mile/hour",
    symbol: "m/h",
    toBase: (v: number) => v * 0.44704,
    fromBase: (v: number) => v / 0.44704,
  },
  {
    key: "mile-per-minute",
    label: "Mile/minute",
    symbol: "m/m",
    toBase: (v: number) => v * 26.8224,
    fromBase: (v: number) => v / 26.8224,
  },
];
