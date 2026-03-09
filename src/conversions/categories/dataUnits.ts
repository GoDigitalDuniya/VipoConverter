import { UnitDefinition } from '../types';

export const DATA_UNITS: UnitDefinition[] = [
  { key: "bit", short: "Bit", multiplier: 1 },
  { key: "byte", short: "Byte", multiplier: 8 },
  { key: "kbit", short: "Kbit", multiplier: 1000 },
  { key: "kbyte", short: "KB", multiplier: 8000 },
  { key: "mbit", short: "Mbit", multiplier: 1000000 },
  { key: "mbyte", short: "MB", multiplier: 8000000 },
  { key: "gbit", short: "Gbit", multiplier: 1000000000 },
  { key: "gbyte", short: "GB", multiplier: 8000000000 },
];
