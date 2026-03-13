// Auto-generated unit definitions for radioactivity
// Base unit: becquerel
// Last updated: 2026-03-13
import { UnitDefinition } from "../types/unit";


export const radioactivityUnits: UnitDefinition[] = [
  // ── Radioactivity Units ──
  {
    key: "becquerel",
    label: "Becquerel",
    symbol: "Bq",
    toBase: (v: number) => v,
    fromBase: (v: number) => v,
  },
  {
    key: "millibecquerel",
    label: "Millibecquerel",
    symbol: "mBq",
    toBase: (v: number) => v * 0.001,
    fromBase: (v: number) => v / 0.001,
  },
  {
    key: "kilobecquerel",
    label: "Kilobecquerel",
    symbol: "kBq",
    toBase: (v: number) => v * 1000,
    fromBase: (v: number) => v / 1000,
  },
  {
    key: "megabecquerel",
    label: "Megabecquerel",
    symbol: "MBq",
    toBase: (v: number) => v * 1000000,
    fromBase: (v: number) => v / 1000000,
  },
  {
    key: "gigabecquerel",
    label: "Gigabecquerel",
    symbol: "GBq",
    toBase: (v: number) => v * 1000000000,
    fromBase: (v: number) => v / 1000000000,
  },
  {
    key: "terabecquerel",
    label: "Terabecquerel",
    symbol: "TBq",
    toBase: (v: number) => v * 1000000000000,
    fromBase: (v: number) => v / 1000000000000,
  },
  {
    key: "curie",
    label: "Curie",
    symbol: "Ci",
    toBase: (v: number) => v * 37000000000,
    fromBase: (v: number) => v / 37000000000,
  },
  {
    key: "millicurie",
    label: "Millicurie",
    symbol: "mCi",
    toBase: (v: number) => v * 37000000,
    fromBase: (v: number) => v / 37000000,
  },
  {
    key: "microcurie",
    label: "Microcurie",
    symbol: "µCi",
    toBase: (v: number) => v * 37000,
    fromBase: (v: number) => v / 37000,
  },
  {
    key: "nanocurie",
    label: "Nanocurie",
    symbol: "nCi",
    toBase: (v: number) => v * 37,
    fromBase: (v: number) => v / 37,
  },
  {
    key: "picocurie",
    label: "Picocurie",
    symbol: "pCi",
    toBase: (v: number) => v * 0.037,
    fromBase: (v: number) => v / 0.037,
  },
  {
    key: "kilocurie",
    label: "Kilocurie",
    symbol: "kCi",
    toBase: (v: number) => v * 37000000000000,
    fromBase: (v: number) => v / 37000000000000,
  },
  {
    key: "rutherford",
    label: "Rutherford",
    symbol: "Rd",
    toBase: (v: number) => v * 1000000,
    fromBase: (v: number) => v / 1000000,
  },
  {
    key: "disintegration-min",
    label: "Disintegration/min",
    symbol: "dis/min",
    toBase: (v: number) => v * 0.016666666666666666,
    fromBase: (v: number) => v / 0.016666666666666666,
  },
  {
    key: "disintegration-sec",
    label: "Disintegration/sec",
    symbol: "dis/sec",
    toBase: (v: number) => v * 1,
    fromBase: (v: number) => v / 1,
  },
];
