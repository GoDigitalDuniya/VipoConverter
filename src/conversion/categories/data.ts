import { UnitDefinition } from "../types/unit";

export const dataUnits: UnitDefinition[] = [
  { key: "bit", label: "Bit", toBase: (v) => v, fromBase: (v) => v },
  { key: "byte", label: "Byte", toBase: (v) => v * 8, fromBase: (v) => v / 8 },
  { key: "kbit", label: "Kbit", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
  { key: "kbyte", label: "KB", toBase: (v) => v * 8000, fromBase: (v) => v / 8000 },
  { key: "mbit", label: "Mbit", toBase: (v) => v * 1000000, fromBase: (v) => v / 1000000 },
  { key: "mbyte", label: "MB", toBase: (v) => v * 8000000, fromBase: (v) => v / 8000000 },
  { key: "gbit", label: "Gbit", toBase: (v) => v * 1000000000, fromBase: (v) => v / 1000000000 },
  { key: "gbyte", label: "GB", toBase: (v) => v * 8000000000, fromBase: (v) => v / 8000000000 },
];
