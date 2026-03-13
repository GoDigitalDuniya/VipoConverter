export type UnitDefinition = {
  key: string;
  label: string;
  symbol: string;
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
};
