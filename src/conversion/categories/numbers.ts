// Auto-generated unit definitions for numbers
// Base unit: ones
// Last updated: 2026-03-13
import { UnitDefinition } from "../types/unit";


export const numbersUnits: UnitDefinition[] = [
  // ── Number Scale Units ──
  {
    key: "ones",
    label: "Ones",
    symbol: "(none)",
    toBase: (v: number) => v,
    fromBase: (v: number) => v,
  },
  {
    key: "hundreds",
    label: "Hundreds",
    symbol: "h",
    toBase: (v: number) => v * 100,
    fromBase: (v: number) => v / 100,
  },
  {
    key: "thousands",
    label: "Thousands",
    symbol: "th",
    toBase: (v: number) => v * 1000,
    fromBase: (v: number) => v / 1000,
  },
  {
    key: "millions",
    label: "Millions",
    symbol: "m",
    toBase: (v: number) => v * 1000000,
    fromBase: (v: number) => v / 1000000,
  },
  {
    key: "billions",
    label: "Billion",
    symbol: "bn",
    toBase: (v: number) => v * 1000000000,
    fromBase: (v: number) => v / 1000000000,
  },
  {
    key: "trillions",
    label: "Trillion",
    symbol: "tn",
    toBase: (v: number) => v * 1000000000000,
    fromBase: (v: number) => v / 1000000000000,
  },
  {
    key: "lakhs",
    label: "Lakhs",
    symbol: "lac",
    toBase: (v: number) => v * 100000,
    fromBase: (v: number) => v / 100000,
  },
  {
    key: "crores",
    label: "Crores",
    symbol: "cr",
    toBase: (v: number) => v * 10000000,
    fromBase: (v: number) => v / 10000000,
  },
];
