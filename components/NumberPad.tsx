import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import useCalculatorStore from "../src/store/useCalculatorStore";
import { useTheme } from "../theme/ThemeProvider";

type NumberPadKey = {
  value: string;
  label?: string;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  variant?: "default" | "swap" | "clear" | "delete";
};

type NumberPadProps = {
  onKeyPress: (key: string) => void;
  inputValue?: string;
};

const KEYS: NumberPadKey[] = [
  { value: "7", label: "7" },
  { value: "8", label: "8" },
  { value: "9", label: "9" },
  { value: "swap", icon: "swap-horizontal", variant: "swap" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "calc", icon: "calculator", variant: "default" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "clear", label: "Clear", variant: "clear" },
  { value: "0", label: "0" },
  { value: "00", label: "00" },
  { value: ".", label: "." },
  { value: "delete", icon: "backspace", variant: "delete" },
];

export default function NumberPad({ onKeyPress, inputValue = "0" }: NumberPadProps) {
  const theme = useTheme();
  const router = useRouter();
  const setCalculatorValue = useCalculatorStore((state) => state.setValue);
  const { height: screenHeight } = useWindowDimensions();

  const padHeight = Math.round(
    Math.min(
      Math.max(screenHeight * 0.32, 240),
      screenHeight * 0.6
    )
  );

  const styles = useMemo(() => createStyles(theme, padHeight), [theme, padHeight]);

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {KEYS.map((key) => {
          const iconColor =
            key.variant === "swap"
              ? stylesTokens.swapColor
              : key.variant === "delete"
              ? stylesTokens.deleteColor
              : theme.name === "dark"
              ? "#f5f5f5"
              : stylesTokens.defaultText;

          return (
            <Pressable
              key={key.value}
              onPress={() => {
                if (key.value === "calc") {
                  setCalculatorValue(inputValue || "0");
                  router.push("/calculator");
                  return;
                }

                onKeyPress(key.value);
              }}
              android_ripple={{ color: "#00000014" }}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              style={({ pressed }) => [styles.key, pressed && styles.keyPressed]}
            >
              <View style={styles.keyFace}>
                {key.icon ? (
                  <MaterialCommunityIcons name={key.icon} size={36} color={iconColor} />
                ) : (
                  <Text
                    style={[
                      styles.keyText,
                      key.variant === "clear" && styles.clearText,
                      key.value === "00" && styles.doubleZeroText,
                    ]}
                  >
                    {key.label}
                  </Text>
                )}
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const stylesTokens = {
  padBackgroundLight: "#d7dbe3",
  padBackgroundDark: "#2e3138",
  keyBackgroundLight: "#f4f4f4",
  keyBackgroundDark: "#454851",
  defaultText: "#121212",
  clearColor: "#8dc63f",
  swapColor: "#8dc63f",
  deleteColor: "#8dc63f",
};

const createStyles = (theme: ReturnType<typeof useTheme>, padHeight: number) =>
  StyleSheet.create({
    container: {
      height: padHeight,
      padding: 10,
      backgroundColor:
        theme.name === "dark"
          ? stylesTokens.padBackgroundDark
          : stylesTokens.padBackgroundLight,
    },
    grid: {
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap",
      marginHorizontal: -5,
      marginVertical: -5,
    },
    key: {
      width: "25%",
      height: "25%",
      minHeight: 56,
      minWidth: 56,
      padding: 5,
    },
    keyPressed: {
      opacity: 0.8,
    },
    keyFace: {
      flex: 1,
      backgroundColor:
        theme.name === "dark"
          ? stylesTokens.keyBackgroundDark
          : stylesTokens.keyBackgroundLight,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    },
    keyText: {
      textAlign: "center",
      fontSize: 30,
      lineHeight: 34,
      fontWeight: "500",
      color: theme.name === "dark" ? "#f5f5f5" : stylesTokens.defaultText,
      includeFontPadding: false,
    },
    doubleZeroText: {
      fontSize: 26,
      fontWeight: "600",
    },
    clearText: {
      color: stylesTokens.clearColor,
      fontSize: 24,
      fontWeight: "500",
    },
  });
