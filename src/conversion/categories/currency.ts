import { UnitDefinition } from "../types/unit";

export const currencyUnits: UnitDefinition[] = [
  { key: "usd", label: "US Dollar", toBase: (v) => v, fromBase: (v) => v },
  { key: "eur", label: "Euro", toBase: (v) => v / 1.08, fromBase: (v) => v * 1.08 },
  { key: "inr", label: "Indian Rupee", toBase: (v) => v / 83.2, fromBase: (v) => v * 83.2 },
];
