// Auto-generated unit definitions for dynamic-viscosity
// Base unit: pascal-second
// Last updated: 2026-03-13
import { UnitDefinition } from "../types/unit";


export const dynamicViscosityUnits: UnitDefinition[] = [
  // ── Dynamic Viscosity Units ──
  {
    key: "pascal-second",
    label: "N sec/m²",
    symbol: "Ns/m²",
    toBase: (v: number) => v,
    fromBase: (v: number) => v,
  },
  {
    key: "centipoise",
    label: "Centipoise",
    symbol: "cP",
    toBase: (v: number) => v * 0.001,
    fromBase: (v: number) => v / 0.001,
  },
  {
    key: "poise",
    label: "Poise",
    symbol: "P",
    toBase: (v: number) => v * 0.1,
    fromBase: (v: number) => v / 0.1,
  },
  {
    key: "lb-per-foot-second",
    label: "Lb/footsec",
    symbol: "lb/fts",
    toBase: (v: number) => v * 1.488164,
    fromBase: (v: number) => v / 1.488164,
  },
  {
    key: "lb-sec-per-sq-foot",
    label: "Lb sec/ft²",
    symbol: "lbs/f²",
    toBase: (v: number) => v * 47.88026,
    fromBase: (v: number) => v / 47.88026,
  },
];
