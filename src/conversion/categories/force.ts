// Auto-generated unit definitions for force
// Base unit: newton
// Last updated: 2026-03-13
import { UnitDefinition } from "../types/unit";


export const forceUnits: UnitDefinition[] = [
  // ── Force Units ──
  {
    key: "newton",
    label: "Newton",
    symbol: "N",
    toBase: (v: number) => v,
    fromBase: (v: number) => v,
  },
  {
    key: "kilonewton",
    label: "Kilonewton",
    symbol: "kN",
    toBase: (v: number) => v * 1000,
    fromBase: (v: number) => v / 1000,
  },
  {
    key: "dyne",
    label: "Dyne",
    symbol: "dyn",
    toBase: (v: number) => v * 0.00001,
    fromBase: (v: number) => v / 0.00001,
  },
  {
    key: "kilopond",
    label: "Kilopond",
    symbol: "kp",
    toBase: (v: number) => v * 9.80665,
    fromBase: (v: number) => v / 9.80665,
  },
  {
    key: "pound-force",
    label: "Pound-Force",
    symbol: "lbF",
    toBase: (v: number) => v * 4.44822,
    fromBase: (v: number) => v / 4.44822,
  },
  {
    key: "poundal",
    label: "Poundal",
    symbol: "pdl",
    toBase: (v: number) => v * 0.138255,
    fromBase: (v: number) => v / 0.138255,
  },
];
