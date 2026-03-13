// Auto-generated unit definitions for pressure
// Base unit: pascal
// Last updated: 2026-03-13
import { UnitDefinition } from "../types/unit";


export const pressureUnits: UnitDefinition[] = [
  // ── Pressure Units ──
  {
    key: "pascal",
    label: "Pascal",
    symbol: "Pa",
    toBase: (v: number) => v,
    fromBase: (v: number) => v,
  },
  {
    key: "bar",
    label: "Bar",
    symbol: "bar",
    toBase: (v: number) => v * 100000,
    fromBase: (v: number) => v / 100000,
  },
  {
    key: "decapascal",
    label: "Decapascal",
    symbol: "daPa",
    toBase: (v: number) => v * 10,
    fromBase: (v: number) => v / 10,
  },
  {
    key: "gigapascal",
    label: "Gigapascal",
    symbol: "gPa",
    toBase: (v: number) => v * 1000000000,
    fromBase: (v: number) => v / 1000000000,
  },
  {
    key: "kilopascal",
    label: "Kilopascal",
    symbol: "kPa",
    toBase: (v: number) => v * 1000,
    fromBase: (v: number) => v / 1000,
  },
  {
    key: "megapascal",
    label: "Megapascal",
    symbol: "MPa",
    toBase: (v: number) => v * 1000000,
    fromBase: (v: number) => v / 1000000,
  },
  {
    key: "atmosphere",
    label: "Phys. atmosphere",
    symbol: "atm",
    toBase: (v: number) => v * 101325,
    fromBase: (v: number) => v / 101325,
  },
  {
    key: "technical-atmosphere",
    label: "Tchn. atmosphere",
    symbol: "at",
    toBase: (v: number) => v * 98066.5,
    fromBase: (v: number) => v / 98066.5,
  },
  {
    key: "torr",
    label: "Torr",
    symbol: "Torr",
    toBase: (v: number) => v * 133.3224,
    fromBase: (v: number) => v / 133.3224,
  },
  {
    key: "mmhg",
    label: "mmHg",
    symbol: "mmHg",
    toBase: (v: number) => v * 133.3224,
    fromBase: (v: number) => v / 133.3224,
  },
  {
    key: "psi",
    label: "Pound/in²",
    symbol: "Psi",
    toBase: (v: number) => v * 6894.757,
    fromBase: (v: number) => v / 6894.757,
  },
  {
    key: "psf",
    label: "Pound/ft²",
    symbol: "psf",
    toBase: (v: number) => v * 47.88026,
    fromBase: (v: number) => v / 47.88026,
  },
  {
    key: "ksi",
    label: "Kilo pound/in²",
    symbol: "ksi",
    toBase: (v: number) => v * 6894757,
    fromBase: (v: number) => v / 6894757,
  },
];
