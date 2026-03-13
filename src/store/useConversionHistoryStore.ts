import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, PersistStorage } from "zustand/middleware";

export type ConversionHistoryItem = {
  id: string;
  category: string;
  inputValue: string;
  inputUnitKey: string;
  inputUnitLabel: string;
  outputValue: string;
  outputUnitKey: string;
  outputUnitLabel: string;
  timestamp: number;
};

type HistoryState = {
  history: ConversionHistoryItem[];
  addHistory: (item: ConversionHistoryItem) => void;
  removeHistory: (id: string) => void;
  clearHistory: () => void;
};

const MAX_HISTORY_ITEMS = 300;

const storage: PersistStorage<HistoryState> = {
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

const useConversionHistoryStore = create<HistoryState>()(
  persist(
    (set) => ({
      history: [],
      addHistory: (item) =>
        set((state) => {
          if (!item.inputValue || Number(item.inputValue) === 0) {
            return state;
          }

          if (!Number.isFinite(Number(item.outputValue))) {
            return state;
          }

          const last = state.history[0];
          const isDuplicate =
            !!last &&
            last.category === item.category &&
            last.inputValue === item.inputValue &&
            last.inputUnitKey === item.inputUnitKey &&
            last.outputUnitKey === item.outputUnitKey;

          if (isDuplicate) {
            return state;
          }

          return {
            history: [item, ...state.history].slice(0, MAX_HISTORY_ITEMS),
          };
        }),
      removeHistory: (id) =>
        set((state) => ({
          history: state.history.filter((entry) => entry.id !== id),
        })),
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: "conversion-history-storage",
      storage,
    }
  )
);

export default useConversionHistoryStore;
