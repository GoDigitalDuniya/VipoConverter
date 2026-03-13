import { UnitDefinition } from "../types/unit";

export const momentOfInertiaUnits: UnitDefinition[] = [
  { key: "base", label: "Base", toBase: (v) => v, fromBase: (v) => v },
  { key: "kilo", label: "Kilo", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
];
