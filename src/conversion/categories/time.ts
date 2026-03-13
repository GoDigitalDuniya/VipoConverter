// Auto-generated unit definitions for time
// Base unit: second
// Last updated: 2026-03-13
import { UnitDefinition } from "../types/unit";


export const timeUnits: UnitDefinition[] = [
  // ── Time Units ──
  {
    key: "second",
    label: "Second",
    symbol: "s",
    toBase: (v: number) => v,
    fromBase: (v: number) => v,
  },
  {
    key: "millisecond",
    label: "Millisecond",
    symbol: "ms",
    toBase: (v: number) => v * 0.001,
    fromBase: (v: number) => v / 0.001,
  },
  {
    key: "microsecond",
    label: "Microsecond",
    symbol: "µs",
    toBase: (v: number) => v * 0.000001,
    fromBase: (v: number) => v / 0.000001,
  },
  {
    key: "nanosecond",
    label: "Nanosecond",
    symbol: "ns",
    toBase: (v: number) => v * 1e-9,
    fromBase: (v: number) => v / 1e-9,
  },
  {
    key: "minute",
    label: "Minute",
    symbol: "m",
    toBase: (v: number) => v * 60,
    fromBase: (v: number) => v / 60,
  },
  {
    key: "hour",
    label: "Hour",
    symbol: "h",
    toBase: (v: number) => v * 3600,
    fromBase: (v: number) => v / 3600,
  },
  {
    key: "day",
    label: "Day",
    symbol: "d",
    toBase: (v: number) => v * 86400,
    fromBase: (v: number) => v / 86400,
  },
  {
    key: "week",
    label: "Week",
    symbol: "wk",
    toBase: (v: number) => v * 604800,
    fromBase: (v: number) => v / 604800,
  },
  {
    key: "month",
    label: "Month",
    symbol: "mth",
    toBase: (v: number) => v * 2629800,
    fromBase: (v: number) => v / 2629800,
  },
  {
    key: "year",
    label: "Year",
    symbol: "yr",
    toBase: (v: number) => v * 31557600,
    fromBase: (v: number) => v / 31557600,
  },
];
