// Auto-generated unit definitions for frequency
// Base unit: hertz
// Last updated: 2026-03-13
import { UnitDefinition } from "../types/unit";


export const frequencyUnits: UnitDefinition[] = [
  // ── Frequency Units ──
  {
    key: "hertz",
    label: "Hertz",
    symbol: "Hz",
    toBase: (v: number) => v,
    fromBase: (v: number) => v,
  },
  {
    key: "kilohertz",
    label: "Kilohertz",
    symbol: "kHz",
    toBase: (v: number) => v * 1000,
    fromBase: (v: number) => v / 1000,
  },
  {
    key: "megahertz",
    label: "Megahertz",
    symbol: "MHz",
    toBase: (v: number) => v * 1000000,
    fromBase: (v: number) => v / 1000000,
  },
  {
    key: "gigahertz",
    label: "Gigahertz",
    symbol: "GHz",
    toBase: (v: number) => v * 1000000000,
    fromBase: (v: number) => v / 1000000000,
  },
  {
    key: "terahertz",
    label: "Terahertz",
    symbol: "THz",
    toBase: (v: number) => v * 1000000000000,
    fromBase: (v: number) => v / 1000000000000,
  },
];
