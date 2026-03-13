// Auto-generated unit definitions for data
// Base unit: bit
// Last updated: 2026-03-13
import { UnitDefinition } from "../types/unit";


export const dataUnits: UnitDefinition[] = [
  // ── Data Units ──
  {
    key: "bit",
    label: "Bit",
    symbol: "Bit",
    toBase: (v: number) => v,
    fromBase: (v: number) => v,
  },
  {
    key: "byte",
    label: "Byte",
    symbol: "byte",
    toBase: (v: number) => v * 8,
    fromBase: (v: number) => v / 8,
  },
  {
    key: "kilobit",
    label: "Kilobit",
    symbol: "Kbit",
    toBase: (v: number) => v * 1000,
    fromBase: (v: number) => v / 1000,
  },
  {
    key: "kilobyte",
    label: "Kilobyte",
    symbol: "KB",
    toBase: (v: number) => v * 8000,
    fromBase: (v: number) => v / 8000,
  },
  {
    key: "megabit",
    label: "Megabit",
    symbol: "Mbit",
    toBase: (v: number) => v * 1000000,
    fromBase: (v: number) => v / 1000000,
  },
  {
    key: "megabyte",
    label: "Megabyte",
    symbol: "MB",
    toBase: (v: number) => v * 8000000,
    fromBase: (v: number) => v / 8000000,
  },
  {
    key: "gigabit",
    label: "Gigabit",
    symbol: "Gbit",
    toBase: (v: number) => v * 1000000000,
    fromBase: (v: number) => v / 1000000000,
  },
  {
    key: "gigabyte",
    label: "Gigabyte",
    symbol: "GB",
    toBase: (v: number) => v * 8000000000,
    fromBase: (v: number) => v / 8000000000,
  },
  {
    key: "terabyte",
    label: "Terabyte",
    symbol: "TB",
    toBase: (v: number) => v * 8000000000000,
    fromBase: (v: number) => v / 8000000000000,
  },
];
