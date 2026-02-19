import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, PersistStorage } from "zustand/middleware";

export type ThemeMode = "light" | "dark";
export type DashboardStyle = "grid" | "list";

type SettingsState = {
  theme: ThemeMode;
  dashboardStyle: DashboardStyle;
  numberOfDigits: number; // 0..6
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
  setDashboardStyle: (style: DashboardStyle) => void;
  setNumberOfDigits: (value: number) => void;
};

const storage: PersistStorage<SettingsState> = {
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

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      theme: "light",
      dashboardStyle: "grid",
      numberOfDigits: 2,
      toggleTheme: () => set({ theme: get().theme === "light" ? "dark" : "light" }),
      setTheme: (theme) => set({ theme }),
      setDashboardStyle: (dashboardStyle) => set({ dashboardStyle }),
      setNumberOfDigits: (numberOfDigits) => set({ numberOfDigits }),
    }),
    {
      name: "app-settings-storage",
      storage,
    }
  )
);

export default useSettingsStore;
