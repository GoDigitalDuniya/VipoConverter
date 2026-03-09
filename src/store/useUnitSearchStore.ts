import { create } from "zustand";

type UnitSearchState = {
  leftSearch: string;
  rightSearch: string;
  setLeftSearch: (value: string) => void;
  setRightSearch: (value: string) => void;
  clearLeftSearch: () => void;
  clearRightSearch: () => void;
};

const useUnitSearchStore = create<UnitSearchState>((set) => ({
  leftSearch: "",
  rightSearch: "",
  setLeftSearch: (value: string) => set({ leftSearch: value }),
  setRightSearch: (value: string) => set({ rightSearch: value }),
  clearLeftSearch: () => set({ leftSearch: "" }),
  clearRightSearch: () => set({ rightSearch: "" }),
}));

export default useUnitSearchStore;
