// Auto-generated unit definitions for fuel-consumption
// Base unit: liter-per-100km
// Last updated: 2026-03-13
import { UnitDefinition } from "../types/unit";


export const fuelConsumptionUnits: UnitDefinition[] = [
  // ── Fuel Consumption Units ──
  {
    key: "liter-per-100km",
    label: "Liters/100km",
    symbol: "L/100km",
    toBase: (v: number) => v,
    fromBase: (v: number) => v,
  },
  {
    key: "liter-per-100miles",
    label: "Liters/100miles",
    symbol: "L/100mi",
    toBase: (v: number) => v * 1.60934,
    fromBase: (v: number) => v / 1.60934,
  },
  {
    key: "gallon-uk-per-100km",
    label: "Gallons(UK)/100km",
    symbol: "gal(UK)/100km",
    toBase: (v: number) => v * 4.54609,
    fromBase: (v: number) => v / 4.54609,
  },
  {
    key: "gallon-uk-per-100miles",
    label: "Gallons(UK)/100miles",
    symbol: "gal(UK)/100mi",
    toBase: (v: number) => v * 4.54609 * 1.60934,
    fromBase: (v: number) => v / (4.54609 * 1.60934),
  },
  {
    key: "gallon-us-per-100km",
    label: "Gallons(US)/100km",
    symbol: "gal(US)/100km",
    toBase: (v: number) => v * 3.78541,
    fromBase: (v: number) => v / 3.78541,
  },
  {
    key: "gallon-us-per-100miles",
    label: "Gallons(US)/100miles",
    symbol: "gal(US)/100mi",
    toBase: (v: number) => v * 3.78541 * 1.60934,
    fromBase: (v: number) => v / (3.78541 * 1.60934),
  },
  {
    key: "km-per-liter",
    label: "Km/liter",
    symbol: "km/L",
    toBase: (v: number) => (v === 0 ? 0 : 100 / v),
    fromBase: (v: number) => (v === 0 ? 0 : 100 / v),
  },
  {
    key: "km-per-gallon-uk",
    label: "Km/gallon(UK)",
    symbol: "km/gal(UK)",
    toBase: (v: number) => (v === 0 ? 0 : 454.609 / v),
    fromBase: (v: number) => (v === 0 ? 0 : 454.609 / v),
  },
  {
    key: "km-per-gallon-us",
    label: "Km/gallon(US)",
    symbol: "km/gal(US)",
    toBase: (v: number) => (v === 0 ? 0 : 378.541 / v),
    fromBase: (v: number) => (v === 0 ? 0 : 378.541 / v),
  },
  {
    key: "miles-per-liter",
    label: "Miles/liter",
    symbol: "mi/L",
    toBase: (v: number) => (v === 0 ? 0 : 160.934 / v),
    fromBase: (v: number) => (v === 0 ? 0 : 160.934 / v),
  },
  {
    key: "mpg-uk",
    label: "Miles/gallon(UK)",
    symbol: "mpg(UK)",
    toBase: (v: number) => (v === 0 ? 0 : 282.481 / v),
    fromBase: (v: number) => (v === 0 ? 0 : 282.481 / v),
  },
  {
    key: "mpg-us",
    label: "Miles/gallon(US)",
    symbol: "mpg(US)",
    toBase: (v: number) => (v === 0 ? 0 : 235.215 / v),
    fromBase: (v: number) => (v === 0 ? 0 : 235.215 / v),
  },
];
