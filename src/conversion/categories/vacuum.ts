// Auto-generated unit definitions for vacuum
// Base unit: pascal
// Last updated: 2026-03-13
import { UnitDefinition } from "../types/unit";


export const vacuumUnits: UnitDefinition[] = [
  // ── Vacuum Units ──
  {
    key: "pascal",
    label: "Pascal",
    symbol: "pa",
    toBase: (v: number) => v,
    fromBase: (v: number) => v,
  },
  {
    key: "atmosphere",
    label: "Atmosphere",
    symbol: "atm",
    toBase: (v: number) => v * 101325,
    fromBase: (v: number) => v / 101325,
  },
  {
    key: "bar",
    label: "Bar",
    symbol: "bar",
    toBase: (v: number) => v * 100000,
    fromBase: (v: number) => v / 100000,
  },
  {
    key: "millibar",
    label: "Millibar",
    symbol: "mBar",
    toBase: (v: number) => v * 100,
    fromBase: (v: number) => v / 100,
  },
  {
    key: "torr",
    label: "Torr",
    symbol: "torr",
    toBase: (v: number) => v * 133.3224,
    fromBase: (v: number) => v / 133.3224,
  },
  {
    key: "mmhg",
    label: "Millimeter of mercury",
    symbol: "mmHg",
    toBase: (v: number) => v * 133.3224,
    fromBase: (v: number) => v / 133.3224,
  },
  {
    key: "inch-mercury",
    label: "Inch of mercury",
    symbol: "inHg",
    toBase: (v: number) => v * 3386.389,
    fromBase: (v: number) => v / 3386.389,
  },
  {
    key: "inch-water",
    label: "Inches of water",
    symbol: "inchH2O",
    toBase: (v: number) => v * 249.0889,
    fromBase: (v: number) => v / 249.0889,
  },
  {
    key: "mm-water",
    label: "Millimeters of water",
    symbol: "mmH2O",
    toBase: (v: number) => v * 9.80665,
    fromBase: (v: number) => v / 9.80665,
  },
  {
    key: "kg-per-sq-cm",
    label: "Kilogram/cm²",
    symbol: "kg/cm²",
    toBase: (v: number) => v * 98066.5,
    fromBase: (v: number) => v / 98066.5,
  },
  {
    key: "psi",
    label: "Psi",
    symbol: "lb/in²",
    toBase: (v: number) => v * 6894.757,
    fromBase: (v: number) => v / 6894.757,
  },
];
