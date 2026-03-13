// src/utils/formatNumber.ts

/**
 * Formats a conversion result for display.
 *
 * Strategy:
 * - Zero:        "0"
 * - Integer in normal range (< 1e10): returned as-is with locale separators.
 * - Normal range (0.001 ≤ |v| < 1e10): rounded to `digits` decimal places,
 *   trailing zeros stripped.
 * - Very small (|v| < 0.001): significant figure formatting to avoid "0.000...".
 * - Very large (|v| ≥ 1e10): scientific notation e.g. "6.8 × 10¹³"
 *
 * @param value   The raw numeric conversion result.
 * @param digits  numberOfDigits from SettingsStore (0–6).
 */

// ── Superscript map for exponent digits ───────────────────────────────────────
const SUPERSCRIPT: Record<string, string> = {
  '-': '⁻',
  '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
  '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
};

function toSuperscript(exp: string): string {
  return exp.split('').map((c) => SUPERSCRIPT[c] ?? c).join('');
}

/**
 * Converts a number to a pretty scientific notation string.
 * e.g. 68000000000000 → "6.8 × 10¹³"
 * e.g. 0.00000035 → not handled here (handled by small-number branch)
 */
function toScientificNotation(n: number, digits: number): string {
  const exp = Math.floor(Math.log10(Math.abs(n)));
  const coefficient = n / Math.pow(10, exp);

  // Round coefficient to `digits` decimal places, strip trailing zeros
  const roundedCoefficient = parseFloat(coefficient.toFixed(digits));

  return `${roundedCoefficient} × 10${toSuperscript(String(exp))}`;
}

export function formatConversionNumber(
  value: number | string | undefined | null,
  digits: number
): string {

  // ── Guard: non-finite / empty ──────────────────────────────────────────────
  if (value === undefined || value === null || value === '') return '0';

  const n = Number(value);

  if (!Number.isFinite(n)) return '0';
  if (n === 0) return '0';

  const abs = Math.abs(n);

  // ── Very large: scientific notation ───────────────────────────────────────
  if (abs >= 1e10) {
    return toScientificNotation(n, digits);
  }

  // ── Integer in normal range ────────────────────────────────────────────────
  if (Number.isInteger(n)) {
    return n.toLocaleString('en-US');
  }

  // ── Very small: significant figures ───────────────────────────────────────
  if (abs < 0.001) {
    const sigFigs = Math.max(digits + 2, 4);
    return parseFloat(n.toPrecision(sigFigs)).toString();
  }

  // ── Normal range: fixed decimal places, trailing zeros stripped ───────────
  return parseFloat(n.toFixed(digits)).toString();
}