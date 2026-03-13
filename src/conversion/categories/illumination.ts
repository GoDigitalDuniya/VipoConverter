// Auto-generated unit definitions for illumination
// Base unit: lux
// Last updated: 2026-03-13
import { UnitDefinition } from "../types/unit";


export const illuminationUnits: UnitDefinition[] = [
  // ── Illumination Units ──
  {
    key: "lux",
    label: "Lux",
    symbol: "lx",
    toBase: (v: number) => v,
    fromBase: (v: number) => v,
  },
  {
    key: "foot-candle",
    label: "Foot-candle",
    symbol: "ft*c",
    toBase: (v: number) => v * 10.7639,
    fromBase: (v: number) => v / 10.7639,
  },
  {
    key: "meter-candle",
    label: "Meter-candle",
    symbol: "m*c",
    toBase: (v: number) => v * 1,
    fromBase: (v: number) => v / 1,
  },
  {
    key: "centimeter-candle",
    label: "Cm-candle",
    symbol: "cm*c",
    toBase: (v: number) => v * 10000,
    fromBase: (v: number) => v / 10000,
  },
  {
    key: "nox",
    label: "Nox",
    symbol: "nx",
    toBase: (v: number) => v * 0.001,
    fromBase: (v: number) => v / 0.001,
  },
  {
    key: "phot",
    label: "Phot",
    symbol: "ph",
    toBase: (v: number) => v * 10000,
    fromBase: (v: number) => v / 10000,
  },
  {
    key: "flame",
    label: "Flame",
    symbol: "flame",
    toBase: (v: number) => v * 43.0556,
    fromBase: (v: number) => v / 43.0556,
  },
  {
    key: "lumen-per-sq-meter",
    label: "Lumen/sq.meter",
    symbol: "lm/m²",
    toBase: (v: number) => v * 1,
    fromBase: (v: number) => v / 1,
  },
  {
    key: "lumen-per-sq-cm",
    label: "Lumen/sq.cm",
    symbol: "lm/cm²",
    toBase: (v: number) => v * 10000,
    fromBase: (v: number) => v / 10000,
  },
  {
    key: "lumen-per-sq-foot",
    label: "Lumen/sq.ft",
    symbol: "lm/ft²",
    toBase: (v: number) => v * 10.7639,
    fromBase: (v: number) => v / 10.7639,
  },
  {
    key: "candela-st-per-sq-m",
    label: "Candela st/sq.m",
    symbol: "cd.sd/m²",
    toBase: (v: number) => v * 12.566,
    fromBase: (v: number) => v / 12.566,
  },
  {
    key: "watt-per-sq-cm",
    label: "Watt/sq.cm",
    symbol: "watt/cm²",
    toBase: (v: number) => v * 6830000,
    fromBase: (v: number) => v / 6830000,
  },
];
