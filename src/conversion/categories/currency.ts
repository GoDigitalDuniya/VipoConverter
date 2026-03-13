// Auto-generated unit definitions for currency
// Base unit: usd
// Last updated: 2026-03-13
import { UnitDefinition } from "../types/unit";


export const currencyUnits: UnitDefinition[] = [
  // ── Currency Units ──
  {
    key: "usd",
    label: "US Dollar",
    symbol: "USD",
    toBase: (v: number) => v,
    fromBase: (v: number) => v,
  },
  {
    key: "eur",
    label: "Euro",
    symbol: "EUR",
    toBase: (v: number) => v / 1.08,
    fromBase: (v: number) => v * 1.08,
  },
  {
    key: "inr",
    label: "Indian Rupee",
    symbol: "INR",
    toBase: (v: number) => v / 83.2,
    fromBase: (v: number) => v * 83.2,
  },
];
