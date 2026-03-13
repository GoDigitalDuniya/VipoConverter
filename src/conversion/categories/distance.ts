// Auto-generated unit definitions for distance
// Base unit: meter
// Last updated: 2026-03-13
import { UnitDefinition } from "../types/unit";


export const distanceUnits: UnitDefinition[] = [
  // ── Distance Units ──
  {
    key: "meter",
    label: "Meter",
    symbol: "m",
    toBase: (v: number) => v,
    fromBase: (v: number) => v,
  },
  {
    key: "centimeter",
    label: "Centimeter",
    symbol: "cm",
    toBase: (v: number) => v * 0.01,
    fromBase: (v: number) => v / 0.01,
  },
  {
    key: "decimeter",
    label: "Decimeter",
    symbol: "dm",
    toBase: (v: number) => v * 0.1,
    fromBase: (v: number) => v / 0.1,
  },
  {
    key: "millimeter",
    label: "Millimeter",
    symbol: "mm",
    toBase: (v: number) => v * 0.001,
    fromBase: (v: number) => v / 0.001,
  },
  {
    key: "micrometer",
    label: "Micrometer",
    symbol: "µm",
    toBase: (v: number) => v * 0.000001,
    fromBase: (v: number) => v / 0.000001,
  },
  {
    key: "kilometer",
    label: "Kilometer",
    symbol: "km",
    toBase: (v: number) => v * 1000,
    fromBase: (v: number) => v / 1000,
  },
  {
    key: "inch",
    label: "Inch",
    symbol: "in",
    toBase: (v: number) => v * 0.0254,
    fromBase: (v: number) => v / 0.0254,
  },
  {
    key: "foot",
    label: "Foot",
    symbol: "ft",
    toBase: (v: number) => v * 0.3048,
    fromBase: (v: number) => v / 0.3048,
  },
  {
    key: "yard",
    label: "Yard",
    symbol: "yd",
    toBase: (v: number) => v * 0.9144,
    fromBase: (v: number) => v / 0.9144,
  },
  {
    key: "mile",
    label: "Mile",
    symbol: "mi",
    toBase: (v: number) => v * 1609.344,
    fromBase: (v: number) => v / 1609.344,
  },
  {
    key: "nautical-mile",
    label: "Nautical mile",
    symbol: "nmi",
    toBase: (v: number) => v * 1852,
    fromBase: (v: number) => v / 1852,
  },
  {
    key: "fathom",
    label: "Fathom",
    symbol: "ftm",
    toBase: (v: number) => v * 1.8288,
    fromBase: (v: number) => v / 1.8288,
  },
  {
    key: "furlong",
    label: "Furlong",
    symbol: "fur",
    toBase: (v: number) => v * 201.168,
    fromBase: (v: number) => v / 201.168,
  },
  {
    key: "pica-ata",
    label: "Pica (ATA)",
    symbol: "pica",
    toBase: (v: number) => v * 0.004233333,
    fromBase: (v: number) => v / 0.004233333,
  },
  {
    key: "point-ata",
    label: "Point (ATA)",
    symbol: "pt",
    toBase: (v: number) => v * 0.000352778,
    fromBase: (v: number) => v / 0.000352778,
  },
  {
    key: "point-didot",
    label: "Point (Didot)",
    symbol: "pt",
    toBase: (v: number) => v * 0.000375972,
    fromBase: (v: number) => v / 0.000375972,
  },
  {
    key: "pixel-ata",
    label: "Pixel (ATA)",
    symbol: "px",
    toBase: (v: number) => v * 0.000264583,
    fromBase: (v: number) => v / 0.000264583,
  },
];
