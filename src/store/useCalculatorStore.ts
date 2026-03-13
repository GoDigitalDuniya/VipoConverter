import { create } from "zustand";

type CalculatorState = {
  value: string;
  setValue: (v: string) => void;
  clear: () => void;
};

const useCalculatorStore = create<CalculatorState>((set) => ({
  value: "0",
  setValue: (v) => set({ value: v }),
  clear: () => set({ value: "0" }),
}));

export default useCalculatorStore;
