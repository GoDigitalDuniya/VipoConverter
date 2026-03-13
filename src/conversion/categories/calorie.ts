// Auto-generated unit definitions for calorie
// Base unit: joule-per-cubic-meter
// Last updated: 2026-03-13
import { UnitDefinition } from "../types/unit";


export const calorieUnits: UnitDefinition[] = [
  // ── Energy Density Units ──
  {
    key: "joule-per-cubic-meter",
    label: "Joule/cu.meter",
    symbol: "J/m³",
    toBase: (v: number) => v,
    fromBase: (v: number) => v,
  },
  {
    key: "kilojoule-per-cubic-meter",
    label: "Kilojoule/cu.meter",
    symbol: "kJ/m³",
    toBase: (v: number) => v * 1000,
    fromBase: (v: number) => v / 1000,
  },
  {
    key: "megajoule-per-cubic-meter",
    label: "Megajoule/cu.meter",
    symbol: "MJ/m³",
    toBase: (v: number) => v * 1000000,
    fromBase: (v: number) => v / 1000000,
  },
  {
    key: "calorie-per-cubic-cm",
    label: "Calorie/cu.cm",
    symbol: "cal/cm³",
    toBase: (v: number) => v * 4186800,
    fromBase: (v: number) => v / 4186800,
  },
  {
    key: "kilocalorie-per-cubic-meter",
    label: "Kilocalorie/cu.meter",
    symbol: "kcal/m³",
    toBase: (v: number) => v * 4186.8,
    fromBase: (v: number) => v / 4186.8,
  },
  {
    key: "btu-per-cubic-foot",
    label: "Btu/cu.foot",
    symbol: "btu/ft³",
    toBase: (v: number) => v * 35314.67,
    fromBase: (v: number) => v / 35314.67,
  },
  {
    key: "chu-per-cubic-foot",
    label: "Chu/cu.foot",
    symbol: "chu/ft³",
    toBase: (v: number) => v * 63567.6,
    fromBase: (v: number) => v / 63567.6,
  },
  {
    key: "therm-per-cubic-foot",
    label: "Therm/cu.foot",
    symbol: "thm/ft³",
    toBase: (v: number) => v * 3725895331,
    fromBase: (v: number) => v / 3725895331,
  },
  {
    key: "therm-per-gallon-uk",
    label: "Therm/gal [UK]",
    symbol: "thm/gal(UK)",
    toBase: (v: number) => v * 23207984510,
    fromBase: (v: number) => v / 23207984510,
  },
  {
    key: "dyne-per-square-cm",
    label: "Dyne/sq.cm",
    symbol: "dyne/cm²",
    toBase: (v: number) => v * 0.1,
    fromBase: (v: number) => v / 0.1,
  },
  {
    key: "newton-per-square-meter",
    label: "Newton/sq.meter",
    symbol: "N/m²",
    toBase: (v: number) => v * 1,
    fromBase: (v: number) => v / 1,
  },
];
