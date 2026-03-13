// Auto-generated unit definitions for typography
// Base unit: meter
// Last updated: 2026-03-13
import { UnitDefinition } from "../types/unit";


export const typographyUnits: UnitDefinition[] = [
  // ── Typography Units ──
  {
    key: "meter",
    label: "Meter",
    symbol: "m",
    toBase: (v: number) => v,
    fromBase: (v: number) => v,
  },
  {
    key: "millimeter",
    label: "Millimeter",
    symbol: "mm",
    toBase: (v: number) => v * 0.001,
    fromBase: (v: number) => v / 0.001,
  },
  {
    key: "centimeter",
    label: "Centimeter",
    symbol: "cm",
    toBase: (v: number) => v * 0.01,
    fromBase: (v: number) => v / 0.01,
  },
  {
    key: "inch",
    label: "Inch",
    symbol: "in",
    toBase: (v: number) => v * 0.0254,
    fromBase: (v: number) => v / 0.0254,
  },
  {
    key: "pica-computer",
    label: "Pica (computer)",
    symbol: "pi (comp)",
    toBase: (v: number) => v * 0.00423333,
    fromBase: (v: number) => v / 0.00423333,
  },
  {
    key: "pica-printer",
    label: "Pica (printer's)",
    symbol: "pi (prnt)",
    toBase: (v: number) => v * 0.00422333,
    fromBase: (v: number) => v / 0.00422333,
  },
  {
    key: "point-computer",
    label: "Point (computer)",
    symbol: "po (comp)",
    toBase: (v: number) => v * 0.000352778,
    fromBase: (v: number) => v / 0.000352778,
  },
  {
    key: "point-printer",
    label: "Point (printer's)",
    symbol: "po (prnt)",
    toBase: (v: number) => v * 0.00035146,
    fromBase: (v: number) => v / 0.00035146,
  },
  {
    key: "postscript-point",
    label: "PostScript point",
    symbol: "pSp",
    toBase: (v: number) => v * 0.000352778,
    fromBase: (v: number) => v / 0.000352778,
  },
  {
    key: "twip",
    label: "Twip",
    symbol: "twip",
    toBase: (v: number) => v * 0.0000176389,
    fromBase: (v: number) => v / 0.0000176389,
  },
  {
    key: "en",
    label: "En",
    symbol: "en",
    toBase: (v: number) => v * 0.000176389,
    fromBase: (v: number) => v / 0.000176389,
  },
  {
    key: "pixel-x",
    label: "Pixel (X)",
    symbol: "pX",
    toBase: (v: number) => v * 0.000264583,
    fromBase: (v: number) => v / 0.000264583,
  },
  {
    key: "pixel-y",
    label: "Pixel (Y)",
    symbol: "pY",
    toBase: (v: number) => v * 0.000264583,
    fromBase: (v: number) => v / 0.000264583,
  },
  {
    key: "character-x",
    label: "Character (X)",
    symbol: "cX",
    toBase: (v: number) => v * 0.002116667,
    fromBase: (v: number) => v / 0.002116667,
  },
  {
    key: "character-y",
    label: "Character (Y)",
    symbol: "cY",
    toBase: (v: number) => v * 0.003175,
    fromBase: (v: number) => v / 0.003175,
  },
];
