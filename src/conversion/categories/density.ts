// Auto-generated unit definitions for density
// Base unit: kilogram-per-cubic-meter
// Last updated: 2026-03-13
import { UnitDefinition } from "../types/unit";


export const densityUnits: UnitDefinition[] = [
  // ── Density Units ──
  {
    key: "kilogram-per-cubic-meter",
    label: "Kilogram per meter³",
    symbol: "kg/m³",
    toBase: (v: number) => v,
    fromBase: (v: number) => v,
  },
  {
    key: "gram-per-cubic-centimeter",
    label: "Gram per centimeter³",
    symbol: "g/cm³",
    toBase: (v: number) => v * 1000,
    fromBase: (v: number) => v / 1000,
  },
  {
    key: "ounce-per-gallon-imperial",
    label: "Ounce/gallon (imp.)",
    symbol: "oz/gal",
    toBase: (v: number) => v * 6.23602,
    fromBase: (v: number) => v / 6.23602,
  },
  {
    key: "ounce-per-gallon-us",
    label: "Ounce per gallon (US)",
    symbol: "oz/gal",
    toBase: (v: number) => v * 7.48915,
    fromBase: (v: number) => v / 7.48915,
  },
  {
    key: "ounce-per-cubic-inch",
    label: "Ounce per inch³",
    symbol: "oz/in³",
    toBase: (v: number) => v * 1729.994,
    fromBase: (v: number) => v / 1729.994,
  },
  {
    key: "pound-per-cubic-foot",
    label: "Pound per foot³",
    symbol: "lb/ft³",
    toBase: (v: number) => v * 16.01846,
    fromBase: (v: number) => v / 16.01846,
  },
  {
    key: "pound-per-gallon-imperial",
    label: "Pound per gallon (imp.)",
    symbol: "lb/gal",
    toBase: (v: number) => v * 99.77637,
    fromBase: (v: number) => v / 99.77637,
  },
  {
    key: "pound-per-gallon-us",
    label: "Pound per gallon (US)",
    symbol: "lb/gal",
    toBase: (v: number) => v * 119.8264,
    fromBase: (v: number) => v / 119.8264,
  },
  {
    key: "pound-per-cubic-yard",
    label: "Pound per yard³",
    symbol: "lb/yd³",
    toBase: (v: number) => v * 0.59328,
    fromBase: (v: number) => v / 0.59328,
  },
  {
    key: "ton-long-per-cubic-yard",
    label: "Ton (long) per yard³",
    symbol: "ton/yd³",
    toBase: (v: number) => v * 1328.939,
    fromBase: (v: number) => v / 1328.939,
  },
  {
    key: "ton-short-per-cubic-yard",
    label: "Ton (short) per yard³",
    symbol: "ton/yd³",
    toBase: (v: number) => v * 1186.553,
    fromBase: (v: number) => v / 1186.553,
  },
];
