import { MaterialCommunityIcons } from "@expo/vector-icons";

export const ROW_HEIGHT = 72;
export const ROW_HEIGHT_MAPPING = 50;
export const WEIGHT_UNITS = [
  { key: "kg", label: "Kilograms" },
  { key: "lb", label: "Pounds" },
  { key: "st_lb", label: "Stone/Pounds" },
];

export const HEIGHT_UNITS = [
  { key: "cm", label: "Centimeter" },
  { key: "ft_in", label: "Feet/Inches" },
];

export const BMI_CATEGORIES = [
  { label: "UNDER WEIGHT", min: 0, max: 18.4, color: "#ff9500" },
  { label: "HEALTHY", min: 18.5, max: 24.9, color: "#2ecc71" },
  { label: "OVER WEIGHT", min: 25.0, max: 29.9, color: "#007aff" },
  { label: "OBESE", min: 30.0, max: Infinity, color: "#ff3b30" },
];

export function getBmiIconName(categoryLabel: string): keyof typeof MaterialCommunityIcons.glyphMap {
  switch (categoryLabel) {
    case "UNDER WEIGHT":
      return "human-handsdown";
    case "HEALTHY":
      return "human";
    case "OVER WEIGHT":
      return "human-male";
    case "OBESE":
      return "human-pregnant";
    default:
      return "human";
  }
}