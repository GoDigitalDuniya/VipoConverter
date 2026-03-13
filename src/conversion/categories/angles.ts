// Auto-generated unit definitions for angles
// Base unit: radian
// Last updated: 2026-03-13
import { UnitDefinition } from "../types/unit";

const PI = Math.PI;

export const anglesUnits: UnitDefinition[] = [
  // ── Angular Units ──
  {
    key: "radian",
    label: "Radian",
    symbol: "rad",
    toBase: (v: number) => v,
    fromBase: (v: number) => v,
  },
  {
    key: "degree",
    label: "Degree",
    symbol: "°",
    toBase: (v: number) => v * (PI / 180),
    fromBase: (v: number) => v * (180 / PI),
  },
  {
    key: "grad",
    label: "Grad",
    symbol: "^g",
    toBase: (v: number) => v * (PI / 200),
    fromBase: (v: number) => v * (200 / PI),
  },
  {
    key: "minute",
    label: "Minute",
    symbol: "'",
    toBase: (v: number) => v * (PI / 10800),
    fromBase: (v: number) => v * (10800 / PI),
  },
  {
    key: "second",
    label: "Second",
    symbol: "\"",
    toBase: (v: number) => v * (PI / 648000),
    fromBase: (v: number) => v * (648000 / PI),
  },
  {
    key: "mil",
    label: "Mil",
    symbol: "mil",
    toBase: (v: number) => v * (PI / 3200),
    fromBase: (v: number) => v * (3200 / PI),
  },
  {
    key: "point",
    label: "Point",
    symbol: "point",
    toBase: (v: number) => v * (PI / 16),
    fromBase: (v: number) => v * (16 / PI),
  },
  {
    key: "full-circle",
    label: "Full circle",
    symbol: "full circle",
    toBase: (v: number) => v * (2 * PI),
    fromBase: (v: number) => v / (2 * PI),
  },
  {
    key: "half-circle",
    label: "1/2 circle",
    symbol: "1/2 circle",
    toBase: (v: number) => v * PI,
    fromBase: (v: number) => v / PI,
  },
  {
    key: "quarter-circle",
    label: "1/4 circle",
    symbol: "1/4 circle",
    toBase: (v: number) => v * (PI / 2),
    fromBase: (v: number) => v * (2 / PI),
  },
  {
    key: "one-sixth",
    label: "1/6 circle",
    symbol: "1/6 circle",
    toBase: (v: number) => v * (PI / 3),
    fromBase: (v: number) => v * (3 / PI),
  },
  {
    key: "one-eighth",
    label: "1/8 circle",
    symbol: "1/8 circle",
    toBase: (v: number) => v * (PI / 4),
    fromBase: (v: number) => v * (4 / PI),
  },
  {
    key: "one-tenth",
    label: "1/10 circle",
    symbol: "1/10 circle",
    toBase: (v: number) => v * (PI / 5),
    fromBase: (v: number) => v * (5 / PI),
  },
  {
    key: "one-sixteenth",
    label: "1/16 circle",
    symbol: "1/16 circle",
    toBase: (v: number) => v * (PI / 8),
    fromBase: (v: number) => v * (8 / PI),
  },
];
