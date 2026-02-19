import React, { createContext, ReactNode, useContext } from "react";
import useSettingsStore from "../store/useSettingsStore";
import { getTheme, Theme } from "./index";

const ThemeContext = createContext<Theme | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
const themeMode: string = useSettingsStore((s: { theme: string }) => s.theme);
  const theme = getTheme(themeMode as "light" | "dark");
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};

export default ThemeProvider;
