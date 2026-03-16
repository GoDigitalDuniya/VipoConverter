import { useCurrencyRatesStore } from "../../store/useCurrencyRatesStore";
import { currencyNames } from "../data/currencyNames";
import { UnitDefinition } from "../types/unit";

const DEFAULT_RATE = 1;

function getRate(code: string): number {
  const rates = useCurrencyRatesStore.getState().rates;
  return rates?.[code] ?? DEFAULT_RATE;
}

function normalizeCode(code: string): string {
  return code?.toUpperCase?.() ?? "";
}

export function getCurrencyUnits(): UnitDefinition[] {
  const allCodes = Object.keys(currencyNames).map(normalizeCode);
  const uniqueCodes = Array.from(new Set(allCodes)).sort();

  return uniqueCodes.map((code) => {
    const label = currencyNames[code] ?? code;

    return {
      key: code.toLowerCase(),
      label,
      symbol: code,
      toBase: (v: number) => {
        const rate = getRate(code);
        return v / (rate || DEFAULT_RATE);
      },
      fromBase: (v: number) => {
        const rate = getRate(code);
        return v * (rate || DEFAULT_RATE);
      },
    };
  });
}
