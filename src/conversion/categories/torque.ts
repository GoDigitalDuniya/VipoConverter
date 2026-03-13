// Auto-generated unit definitions for torque
// Base unit: newton-meter
// Last updated: 2026-03-13
import { UnitDefinition } from "../types/unit";


export const torqueUnits: UnitDefinition[] = [
  // ── Torque Units ──
  {
    key: "newton-meter",
    label: "Newton meter",
    symbol: "Nm",
    toBase: (v: number) => v,
    fromBase: (v: number) => v,
  },
  {
    key: "newton-centimeter",
    label: "Newton centimeter",
    symbol: "Ncm",
    toBase: (v: number) => v * 0.01,
    fromBase: (v: number) => v / 0.01,
  },
  {
    key: "newton-millimeter",
    label: "Newton millimeter",
    symbol: "Nmm",
    toBase: (v: number) => v * 0.001,
    fromBase: (v: number) => v / 0.001,
  },
  {
    key: "kilogram-force-meter",
    label: "Kg. force meter",
    symbol: "kgfm",
    toBase: (v: number) => v * 9.80665,
    fromBase: (v: number) => v / 9.80665,
  },
  {
    key: "kilogram-force-cm",
    label: "Kg. force cm",
    symbol: "kgf.cm",
    toBase: (v: number) => v * 0.0980665,
    fromBase: (v: number) => v / 0.0980665,
  },
  {
    key: "kilogram-force-mm",
    label: "Kg. force mm",
    symbol: "kgf.mm",
    toBase: (v: number) => v * 0.00980665,
    fromBase: (v: number) => v / 0.00980665,
  },
  {
    key: "gram-force-meter",
    label: "Gram force meter",
    symbol: "gf.m",
    toBase: (v: number) => v * 0.00980665,
    fromBase: (v: number) => v / 0.00980665,
  },
  {
    key: "centimeter-gram-force",
    label: "Centimeter-gram force",
    symbol: "cmgf",
    toBase: (v: number) => v * 0.0000980665,
    fromBase: (v: number) => v / 0.0000980665,
  },
  {
    key: "dyne-meter",
    label: "Dyne meter",
    symbol: "dyne-m",
    toBase: (v: number) => v * 0.00001,
    fromBase: (v: number) => v / 0.00001,
  },
  {
    key: "dyne-centimeter",
    label: "Dyne centimeter",
    symbol: "dyne-cm",
    toBase: (v: number) => v * 1e-7,
    fromBase: (v: number) => v / 1e-7,
  },
  {
    key: "dyne-millimeter",
    label: "Dyne millimeter",
    symbol: "dyne-mm",
    toBase: (v: number) => v * 1e-8,
    fromBase: (v: number) => v / 1e-8,
  },
  {
    key: "foot-pound-force",
    label: "Foot-pound force",
    symbol: "lbf.ft",
    toBase: (v: number) => v * 1.355818,
    fromBase: (v: number) => v / 1.355818,
  },
  {
    key: "inch-pound-force",
    label: "Inch-pound force",
    symbol: "lbf.in",
    toBase: (v: number) => v * 0.112985,
    fromBase: (v: number) => v / 0.112985,
  },
  {
    key: "inch-ounce-force",
    label: "Inch-ounce force",
    symbol: "in-ozf",
    toBase: (v: number) => v * 0.007062,
    fromBase: (v: number) => v / 0.007062,
  },
  {
    key: "poundal-foot",
    label: "Poundal foot",
    symbol: "ft-pdl",
    toBase: (v: number) => v * 0.04214,
    fromBase: (v: number) => v / 0.04214,
  },
  {
    key: "poundal-inch",
    label: "Poundal inch",
    symbol: "in-pdl",
    toBase: (v: number) => v * 0.003512,
    fromBase: (v: number) => v / 0.003512,
  },
  {
    key: "ton-force-long-meter",
    label: "Ton-force (long) m",
    symbol: "tfm-long",
    toBase: (v: number) => v * 3102.72,
    fromBase: (v: number) => v / 3102.72,
  },
  {
    key: "ton-force-metric-meter",
    label: "Ton-force (metr.) m",
    symbol: "tfm-metric",
    toBase: (v: number) => v * 9806.65,
    fromBase: (v: number) => v / 9806.65,
  },
  {
    key: "ton-force-short-meter",
    label: "Ton-force (short) m",
    symbol: "tfm-short",
    toBase: (v: number) => v * 2711.64,
    fromBase: (v: number) => v / 2711.64,
  },
];
