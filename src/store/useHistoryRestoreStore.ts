import { create } from "zustand";

type HistoryRestorePayload = {
  category: string;
  inputValue: string;
  inputUnitKey: string;
  outputUnitKey: string;
  timestamp: number;
}; 

type HistoryRestoreState = {
  pendingRestore: HistoryRestorePayload | null;
  setPendingRestore: (payload: HistoryRestorePayload) => void;
  clearPendingRestore: () => void;
};

const useHistoryRestoreStore = create<HistoryRestoreState>((set) => ({
  pendingRestore: null,
  setPendingRestore: (payload) => set({ pendingRestore: payload }),
  clearPendingRestore: () => set({ pendingRestore: null }),
}));

export type { HistoryRestorePayload };
export default useHistoryRestoreStore;
