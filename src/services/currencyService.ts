export type CurrencyRatesResponse = {
  result: string;
  provider: string;
  documentation: string;
  terms_of_use: string;
  time_last_update_unix: number;
  time_next_update_unix: number;
  time_eol_unix: number;
  base_code: string;
  rates: Record<string, number>;
};

export type CurrencyRates = {
  base: string;
  rates: Record<string, number>;
  lastUpdated: number;
  nextUpdateAt: number | null;
};

const API_URL = "https://open.er-api.com/v6/latest/USD";

export async function fetchCurrencyRates(): Promise<CurrencyRates> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`Currency rates fetch failed (${response.status})`);
  }

  const data = (await response.json()) as CurrencyRatesResponse;
  if (
    !data ||
    !data.rates ||
    typeof data.time_last_update_unix !== "number" ||
    typeof data.time_next_update_unix !== "number"
  ) {
    throw new Error("Invalid currency rates response");
  }

  const nextUpdateAtRaw = data.time_next_update_unix || 0;
  const nextUpdateAt = nextUpdateAtRaw > 0 ? nextUpdateAtRaw * 1000 : null;

  return {
    base: data.base_code,
    rates: data.rates,
    lastUpdated: data.time_last_update_unix * 1000,
    nextUpdateAt,
  };
}
