export type UnitDefinition = {
  key: string;
  label: string;
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
};
