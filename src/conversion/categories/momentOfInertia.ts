// Auto-generated unit definitions for moment-of-inertia
// Base unit: kilogram-square-meter
// Last updated: 2026-03-13
import { UnitDefinition } from "../types/unit";


export const momentOfInertiaUnits: UnitDefinition[] = [
  // ── Moment of Inertia Units ──
  {
    key: "kilogram-square-meter",
    label: "Kg-meter²",
    symbol: "kg-m²",
    toBase: (v: number) => v,
    fromBase: (v: number) => v,
  },
  {
    key: "gram-square-millimeter",
    label: "Gram-millimeter²",
    symbol: "g-mm²",
    toBase: (v: number) => v * 1e-9,
    fromBase: (v: number) => v / 1e-9,
  },
  {
    key: "kilogram-square-millimeter",
    label: "Kg-millimeter²",
    symbol: "kg-mm²",
    toBase: (v: number) => v * 0.000001,
    fromBase: (v: number) => v / 0.000001,
  },
  {
    key: "kgf-meter-second-sq",
    label: "Kg-force meter second²",
    symbol: "kgf-m-s²",
    toBase: (v: number) => v * 9.80665,
    fromBase: (v: number) => v / 9.80665,
  },
  {
    key: "oz-square-inch",
    label: "Oz-inch²",
    symbol: "oz-in²",
    toBase: (v: number) => v * 0.00001829,
    fromBase: (v: number) => v / 0.00001829,
  },
  {
    key: "ozf-inch-second-sq",
    label: "Oz-force inch second²",
    symbol: "ozf-in-s²",
    toBase: (v: number) => v * 0.00706155,
    fromBase: (v: number) => v / 0.00706155,
  },
  {
    key: "pound-square-inch",
    label: "Pound inch²",
    symbol: "lb-in²",
    toBase: (v: number) => v * 0.00029264,
    fromBase: (v: number) => v / 0.00029264,
  },
  {
    key: "pound-square-foot",
    label: "Pound-foot²",
    symbol: "lb-ft²",
    toBase: (v: number) => v * 0.0421401,
    fromBase: (v: number) => v / 0.0421401,
  },
  {
    key: "lbf-foot-second-sq",
    label: "Pound-force ft.second²",
    symbol: "lbf-ft-s²",
    toBase: (v: number) => v * 1.35582,
    fromBase: (v: number) => v / 1.35582,
  },
  {
    key: "lbf-inch-second-sq",
    label: "Pound-force in.second²",
    symbol: "lbf-in-s²",
    toBase: (v: number) => v * 0.11298,
    fromBase: (v: number) => v / 0.11298,
  },
  {
    key: "slug-square-foot",
    label: "Slug foot²",
    symbol: "slug-ft²",
    toBase: (v: number) => v * 1.35582,
    fromBase: (v: number) => v / 1.35582,
  },
];
