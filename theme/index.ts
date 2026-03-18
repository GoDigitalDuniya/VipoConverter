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
  },
  statusBarStyle: "light-content",
};

export const getTheme = (mode: "light" | "dark"): Theme => (mode === "dark" ? darkTheme : lightTheme);

export default {
  lightTheme,
  darkTheme,
  getTheme,
};
