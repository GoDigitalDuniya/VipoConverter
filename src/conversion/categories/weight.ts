// Auto-generated unit definitions for weight
// Base unit: kilogram
// Last updated: 2026-03-13
import { UnitDefinition } from "../types/unit";


export const weightUnits: UnitDefinition[] = [
  // ── Weight Units ──
  {
    key: "kilogram",
    label: "Kilogram",
    symbol: "kg",
    toBase: (v: number) => v,
    fromBase: (v: number) => v,
  },
  {
    key: "gram",
    label: "Gram",
    symbol: "g",
    toBase: (v: number) => v * 0.001,
    fromBase: (v: number) => v / 0.001,
  },
  {
    key: "milligram",
    label: "Milligram",
    symbol: "mg",
    toBase: (v: number) => v * 0.000001,
    fromBase: (v: number) => v / 0.000001,
  },
  {
    key: "ounce",
    label: "Ounce",
    symbol: "oz",
    toBase: (v: number) => v * 0.0283495,
    fromBase: (v: number) => v / 0.0283495,
  },
  {
    key: "pound",
    label: "Pound",
    symbol: "lb",
    toBase: (v: number) => v * 0.453592,
    fromBase: (v: number) => v / 0.453592,
  },
  {
    key: "stone",
    label: "Stone",
    symbol: "stone",
    toBase: (v: number) => v * 6.35029,
    fromBase: (v: number) => v / 6.35029,
  },
  {
    key: "tonne",
    label: "Ton",
    symbol: "t",
    toBase: (v: number) => v * 1000,
    fromBase: (v: number) => v / 1000,
  },
  {
    key: "ton-uk",
    label: "Ton long (UK)",
    symbol: "ton",
    toBase: (v: number) => v * 1016.047,
    fromBase: (v: number) => v / 1016.047,
  },
  {
    key: "ton-us",
    label: "Ton short (US)",
    symbol: "ton",
    toBase: (v: number) => v * 907.1847,
    fromBase: (v: number) => v / 907.1847,
  },
  {
    key: "grains",
    label: "Grains",
    symbol: "grains",
    toBase: (v: number) => v * 0.0000647989,
    fromBase: (v: number) => v / 0.0000647989,
  },
  {
    key: "troy-ounce",
    label: "Troy ounce",
    symbol: "oz.tr.",
    toBase: (v: number) => v * 0.0311035,
    fromBase: (v: number) => v / 0.0311035,
  },
];
