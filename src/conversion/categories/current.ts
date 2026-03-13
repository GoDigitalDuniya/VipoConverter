// Auto-generated unit definitions for current
// Base unit: ampere
// Last updated: 2026-03-13
import { UnitDefinition } from "../types/unit";


export const currentUnits: UnitDefinition[] = [
  // ── Electric Current Units ──
  {
    key: "ampere",
    label: "Ampere",
    symbol: "A",
    toBase: (v: number) => v,
    fromBase: (v: number) => v,
  },
  {
    key: "milliampere",
    label: "Milliampere",
    symbol: "mA",
    toBase: (v: number) => v * 0.001,
    fromBase: (v: number) => v / 0.001,
  },
  {
    key: "microampere",
    label: "Microampere",
    symbol: "µA",
    toBase: (v: number) => v * 0.000001,
    fromBase: (v: number) => v / 0.000001,
  },
  {
    key: "kiloampere",
    label: "Kiloampere",
    symbol: "kA",
    toBase: (v: number) => v * 1000,
    fromBase: (v: number) => v / 1000,
  },
  {
    key: "megaampere",
    label: "Megaampere",
    symbol: "MA",
    toBase: (v: number) => v * 1000000,
    fromBase: (v: number) => v / 1000000,
  },
  {
    key: "biot",
    label: "Biot",
    symbol: "Bi",
    toBase: (v: number) => v * 10,
    fromBase: (v: number) => v / 10,
  },
  {
    key: "statampere",
    label: "Statampere",
    symbol: "stA",
    toBase: (v: number) => v * 3.335641e-10,
    fromBase: (v: number) => v / 3.335641e-10,
  },
];
