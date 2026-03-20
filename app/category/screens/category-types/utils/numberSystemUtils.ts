export type NumberSystemField = "hex" | "decimal" | "binary";

// Decimal is the canonical base — all conversions go through it
export function decimalToHex(decimal: number): string {
  if (!Number.isInteger(decimal) || decimal < 0) return "";
  return decimal.toString(16).toUpperCase();
}

export function decimalToBinary(decimal: number): string {
  if (!Number.isInteger(decimal) || decimal < 0) return "";
  return decimal.toString(2);
}

export function hexToDecimal(hex: string): number | null {
  if (!hex) return null;
  const n = parseInt(hex, 16);
  return Number.isFinite(n) ? n : null;
}

export function binaryToDecimal(binary: string): number | null {
  if (!binary) return null;
  if (!/^[01]+$/.test(binary)) return null;
  const n = parseInt(binary, 2);
  return Number.isFinite(n) ? n : null;
}

// Validate input per field type
export function isValidInput(value: string, field: NumberSystemField): boolean {
  if (field === "decimal") return /^\d*$/.test(value);
  if (field === "binary") return /^[01]*$/.test(value);
  if (field === "hex") return /^[0-9A-Fa-f]*$/.test(value);
  return false;
}
