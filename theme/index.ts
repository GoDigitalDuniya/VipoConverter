export type Theme = {
  name: "light" | "dark";
  colors: {
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    primary: string;
    border: string;
    inputBackground?: string;
    // ── Keyboard Colors ────────────────────────────────
    padBackground: string;
    keyBackground: string;
    keyText: string;
    accentKey: string;
    // ── Calculator Colors ──────────────────────────────
    calculatorDisplayBackground: string;
    calculatorIconLight: string;
    // ── Settings Colors ────────────────────────────────
    settingsBorder: string;
    settingsDefaultText: string;
    settingsDefaultValue: string;
    // ── History Colors ────────────────────────────────
    historyHeaderBackground: string;
  };
  statusBarStyle: "dark-content" | "light-content";
};

export const lightTheme: Theme = {
  name: "light",
  colors: {
    background: "#ffffff",
    surface: "#ededed",
    text: "#231f20",
    textSecondary: "#666666",
    primary: "#8dc63f",
    border: "#e6e6e6",
    inputBackground: "#ffffff",
    padBackground: "#d7dbe3",
    keyBackground: "#f4f4f4",
    keyText: "#121212",
    accentKey: "#8dc63f",
    calculatorDisplayBackground: "#e6e7ea",
    calculatorIconLight: "#8f7c3c",
    settingsBorder: "#cccccc",
    settingsDefaultText: "#222222",
    settingsDefaultValue: "#b48a2c",
    historyHeaderBackground: "#4cb4c4",
  },
  statusBarStyle: "dark-content",
};

export const darkTheme: Theme = {
  name: "dark",
  colors: {
    background: "#000000",
    surface: "#252424",
    text: "#ffffff",
    textSecondary: "#f7f7f7",
    primary: "#8dc63f",
    border: "#222222",
    inputBackground: "#1e1e1e",
    padBackground: "#2e3138",
    keyBackground: "#454851",
    keyText: "#f5f5f5",
    accentKey: "#8dc63f",
    calculatorDisplayBackground: "#3a3d45",
    calculatorIconLight: "#f5f5f5",
    settingsBorder: "#333333",
    settingsDefaultText: "#cccccc",
    settingsDefaultValue: "#c9a961",
    historyHeaderBackground: "#4cb4c4",
  },
  statusBarStyle: "light-content",
};

export const getTheme = (mode: "light" | "dark"): Theme => (mode === "dark" ? darkTheme : lightTheme);

export default {
  lightTheme,
  darkTheme,
  getTheme,
};
