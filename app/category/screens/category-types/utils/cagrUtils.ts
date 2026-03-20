export type FieldKey = "beginning" | "ending" | "years" | "cagr";

export function safeNumber(value: string): number {
  const n = Number(value);
  if (!Number.isFinite(n)) return 0;
  return n;
}

export function formatNumber(value: number, decimals = 2): string {
  if (!Number.isFinite(value)) return "0";
  const fixed = value.toFixed(decimals);
  // Trim unnecessary trailing zeros and decimal point.
  return parseFloat(fixed).toString();
}

export function computeCagr({
  beginning,
  ending,
  years,
}: {
  beginning: number;
  ending: number;
  years: number;
}): number | null {
  if (beginning <= 0 || ending <= 0 || years <= 0) return null;
  const ratio = ending / beginning;
  if (!Number.isFinite(ratio) || ratio <= 0) return null;
  const rate = Math.pow(ratio, 1 / years) - 1;
  const result = rate * 100;
  return Number.isFinite(result) ? result : null;
}

export function computeEndingValue({
  beginning,
  cagr,
  years,
}: {
  beginning: number;
  cagr: number;
  years: number;
}): number | null {
  if (beginning <= 0 || years <= 0) return null;
  const multiplier = 1 + cagr / 100;
  if (!Number.isFinite(multiplier) || multiplier <= 0) return null;
  const result = beginning * Math.pow(multiplier, years);
  return Number.isFinite(result) ? result : null;
}

export function computeBeginningValue({
  ending,
  cagr,
  years,
}: {
  ending: number;
  cagr: number;
  years: number;
}): number | null {
  if (ending <= 0 || years <= 0) return null;
  const multiplier = 1 + cagr / 100;
  if (!Number.isFinite(multiplier) || multiplier <= 0) return null;
  const result = ending / Math.pow(multiplier, years);
  return Number.isFinite(result) ? result : null;
}

export function computeYears({
  beginning,
  ending,
  cagr,
}: {
  beginning: number;
  ending: number;
  cagr: number;
}): number | null {
  if (beginning <= 0 || ending <= 0) return null;
  const multiplier = 1 + cagr / 100;
  if (!Number.isFinite(multiplier) || multiplier <= 0 || multiplier === 1) return null;
  const ratio = ending / beginning;
  if (!Number.isFinite(ratio) || ratio <= 0) return null;
  const result = Math.log(ratio) / Math.log(multiplier);
  return Number.isFinite(result) ? result : null;
}
