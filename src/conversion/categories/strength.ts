// Auto-generated unit definitions for strength
// Base unit: pascal
// Last updated: 2026-03-13
import { UnitDefinition } from "../types/unit";


export const strengthUnits: UnitDefinition[] = [
  // ── Strength Units ──
  {
    key: "pascal",
    label: "Pascal",
    symbol: "Pa",
    toBase: (v: number) => v,
    fromBase: (v: number) => v,
  },
  {
    key: "megapascal",
    label: "Megapascal",
    symbol: "MPa",
    toBase: (v: number) => v * 1000000,
    fromBase: (v: number) => v / 1000000,
  },
  {
    key: "newton-per-mm",
    label: "Newton/mm²",
    symbol: "N/mm²",
    toBase: (v: number) => v * 1000000,
    fromBase: (v: number) => v / 1000000,
  },
  {
    key: "ksi",
    label: "Kilo Pound/in²",
    symbol: "ksi",
    toBase: (v: number) => v * 6894757,
    fromBase: (v: number) => v / 6894757,
  },
];
