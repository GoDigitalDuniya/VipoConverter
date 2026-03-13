// Auto-generated unit definitions for area
// Base unit: square-meter
// Last updated: 2026-03-13
import { UnitDefinition } from "../types/unit";


export const areaUnits: UnitDefinition[] = [
  // ── Area Units ──
  {
    key: "square-meter",
    label: "Sq.meter",
    symbol: "m²",
    toBase: (v: number) => v,
    fromBase: (v: number) => v,
  },
  {
    key: "square-kilometer",
    label: "Sq.kilometer",
    symbol: "km²",
    toBase: (v: number) => v * 1000000,
    fromBase: (v: number) => v / 1000000,
  },
  {
    key: "square-mile",
    label: "Sq.miles",
    symbol: "mi²",
    toBase: (v: number) => v * 2589988.110336,
    fromBase: (v: number) => v / 2589988.110336,
  },
  {
    key: "square-yard",
    label: "Sq.yard",
    symbol: "yd²",
    toBase: (v: number) => v * 0.83612736,
    fromBase: (v: number) => v / 0.83612736,
  },
  {
    key: "square-foot",
    label: "Sq.foot",
    symbol: "ft²",
    toBase: (v: number) => v * 0.09290304,
    fromBase: (v: number) => v / 0.09290304,
  },
  {
    key: "square-inch",
    label: "Sq.inch",
    symbol: "in²",
    toBase: (v: number) => v * 0.00064516,
    fromBase: (v: number) => v / 0.00064516,
  },
  {
    key: "square-centimeter",
    label: "Sq.centimeter",
    symbol: "cm²",
    toBase: (v: number) => v * 0.0001,
    fromBase: (v: number) => v / 0.0001,
  },
  {
    key: "square-decimeter",
    label: "Sq.decimeter",
    symbol: "dm²",
    toBase: (v: number) => v * 0.01,
    fromBase: (v: number) => v / 0.01,
  },
  {
    key: "square-millimeter",
    label: "Sq.millimeter",
    symbol: "mm²",
    toBase: (v: number) => v * 0.000001,
    fromBase: (v: number) => v / 0.000001,
  },
  {
    key: "hectare",
    label: "Hectare",
    symbol: "ha",
    toBase: (v: number) => v * 10000,
    fromBase: (v: number) => v / 10000,
  },
  {
    key: "are",
    label: "Are",
    symbol: "a",
    toBase: (v: number) => v * 100,
    fromBase: (v: number) => v / 100,
  },
  {
    key: "acre",
    label: "Acre",
    symbol: "acre",
    toBase: (v: number) => v * 4046.8564224,
    fromBase: (v: number) => v / 4046.8564224,
  },
];
