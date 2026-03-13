import { UnitDefinition } from "../types/unit";

const PI = Math.PI;

export const anglesUnits: UnitDefinition[] = [
  {
    key: "radian",
    label: "Radian",
    toBase: (v) => v,
    fromBase: (v) => v,
  },

  {
    key: "degree",
    label: "Degree",
    toBase: (v) => v * (PI / 180),
    fromBase: (v) => v * (180 / PI),
  },

  {
    key: "grad",
    label: "Grad",
    toBase: (v) => v * (PI / 200),
    fromBase: (v) => v * (200 / PI),
  },

  {
    key: "minute",
    label: "Minute",
    toBase: (v) => v * (PI / 10800),
    fromBase: (v) => v * (10800 / PI),
  },

  {
    key: "second",
    label: "Second",
    toBase: (v) => v * (PI / 648000),
    fromBase: (v) => v * (648000 / PI),
  },

  {
    key: "mil",
    label: "Mil",
    toBase: (v) => v * (PI / 3200),
    fromBase: (v) => v * (3200 / PI),
  },

  {
    key: "point",
    label: "Point",
    toBase: (v) => v * (PI / 16),
    fromBase: (v) => v * (16 / PI),
  },

  {
    key: "circle",
    label: "Full Circle",
    toBase: (v) => v * (2 * PI),
    fromBase: (v) => v / (2 * PI),
  },

  {
    key: "half-circle",
    label: "1/2 Circle",
    toBase: (v) => v * PI,
    fromBase: (v) => v / PI,
  },

  {
    key: "quarter-circle",
    label: "1/4 Circle",
    toBase: (v) => v * (PI / 2),
    fromBase: (v) => v / (PI / 2),
  },

  {
    key: "one-sixth-circle",
    label: "1/6 Circle",
    toBase: (v) => v * (PI / 3),
    fromBase: (v) => v / (PI / 3),
  },

  {
    key: "one-eighth-circle",
    label: "1/8 Circle",
    toBase: (v) => v * (PI / 4),
    fromBase: (v) => v / (PI / 4),
  },

  {
    key: "one-tenth-circle",
    label: "1/10 Circle",
    toBase: (v) => v * (PI / 5),
    fromBase: (v) => v / (PI / 5),
  },

  {
    key: "one-sixteenth-circle",
    label: "1/16 Circle",
    toBase: (v) => v * (PI / 8),
    fromBase: (v) => v / (PI / 8),
  },
];  