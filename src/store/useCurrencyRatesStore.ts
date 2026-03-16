import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, PersistStorage } from "zustand/middleware";
import { fetchCurrencyRates } from "../services/currencyService";

export type CurrencyRatesState = {
  rates: Record<string, number>;
  lastUpdated: number | null;
  nextUpdateAt: number | null;
  isLoading: boolean;
  error: string | null;
  fetchRates: () => Promise<void>;
};

const STORAGE_KEY = "currency-rates-storage";

const storage: PersistStorage<CurrencyRatesState> = {
  getItem: async (name) => {
    const item = await AsyncStorage.getItem(name);
    return item ? JSON.parse(item) : null;
  },
  setItem: async (name, value) => {
    await AsyncStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: async (name) => {
    await AsyncStorage.removeItem(name);
  },
};

const TEN_MINUTES_MS = 10 * 60 * 1000;

export function getNextRefreshAt(nextUpdateAt: number | null): number | null {
  if (nextUpdateAt === null) return null;
  return nextUpdateAt + TEN_MINUTES_MS;
}

export const useCurrencyRatesStore = create<CurrencyRatesState>()(
  persist(
    (set, get) => ({
      rates: { USD: 1 },
      lastUpdated: null,
      nextUpdateAt: null,
      isLoading: false,
      error: null,

      /**
       * Fetches the latest currency rates.
       *
       * Uses the API-provided `time_next_update_unix` to decide when to refresh.
       * We add a 10-minute buffer and only re-fetch once the buffer has passed.
       * Falls back to cached rates if the request fails.
       */
      fetchRates: async () => {
        const { nextUpdateAt } = get();
        const now = Date.now();

        // Only fetch again if we are past the nextUpdateAt (with a 10-minute buffer).
        // If nextUpdateAt is null, then this is the first launch / no cached update time.
        if (nextUpdateAt && now < nextUpdateAt + TEN_MINUTES_MS) {
          return;
        }

        set({ isLoading: true, error: null });

        try {
          const { rates, lastUpdated: updatedAt, nextUpdateAt: nextAt } =
            await fetchCurrencyRates();
          set({
            rates,
            lastUpdated: updatedAt,
            nextUpdateAt: nextAt,
            isLoading: false,
            error: null,
          });
        } catch (error: unknown) {
          const message = error instanceof Error ? error.message : "Unknown error";
          set({ isLoading: false, error: message });
        }
      },
    }),
    {
      name: STORAGE_KEY,
      storage,
    }
  )
);

export default useCurrencyRatesStore;
