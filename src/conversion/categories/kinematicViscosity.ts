// Auto-generated unit definitions for kinematic-viscosity
// Base unit: square-meter-per-second
// Last updated: 2026-03-13
import { UnitDefinition } from "../types/unit";


export const kinematicViscosityUnits: UnitDefinition[] = [
  // ── Kinematic Viscosity Units ──
  {
    key: "square-meter-per-second",
    label: "Sq.meter/sec",
    symbol: "m²/sec",
    toBase: (v: number) => v,
    fromBase: (v: number) => v,
  },
  {
    key: "square-foot-per-second",
    label: "Sq.feet/sec",
    symbol: "ft²/s",
    toBase: (v: number) => v * 0.09290304,
    fromBase: (v: number) => v / 0.09290304,
  },
  {
    key: "stokes",
    label: "Stokes",
    symbol: "st",
    toBase: (v: number) => v * 0.0001,
    fromBase: (v: number) => v / 0.0001,
  },
];
