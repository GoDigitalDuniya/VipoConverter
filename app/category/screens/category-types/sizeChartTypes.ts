export type SizeRow = Record<string, string>;

export type SizeUnit = {
  key: string;
  label: string;
};

export type VirtualUnit = {
  key: string;
  label: string;
  getValue: (row: SizeRow) => string;
};

export type SizeCategory = {
  key: string;
  label: string;
  units: SizeUnit[];
  rows: SizeRow[];
};

export type SizeChartData = {
  key: string;
  label: string;
  categories: SizeCategory[];
};

export type WheelEntry = {
  displayValue: string;
  rowIndex: number;
};

export type SelectionState = {
  categoryIndex: number;
  unitIndex: number;
  wheelIndex: number;
};
