import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { useTheme } from "../../../../../theme/ThemeProvider";
import { NumberSystemField } from "../utils/numberSystemUtils";

interface NumberSystemPadProps {
  activeField: NumberSystemField;
  onKeyPress: (key: string) => void;
}

type PadKeyCell = {
  keyValue?: string;
  label?: string;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  variant?: "clear" | "delete";
  colSpan?: number;
};

type PadLayout = {
  columns: number;
  rows: PadKeyCell[][];
};

// ─── Key Layout Definitions ───────────────────────────────────────────────────

const DECIMAL_LAYOUT: PadLayout = {
  columns: 4,
  rows: [
    [
      { keyValue: "7", label: "7" },
      { keyValue: "8", label: "8" },
      { keyValue: "9", label: "9" },
      {}, // empty cell — occupies grid space, not pressable
    ],
    [
      { keyValue: "4", label: "4" },
      { keyValue: "5", label: "5" },
      { keyValue: "6", label: "6" },
      {}, // empty cell
    ],
    [
      { keyValue: "1", label: "1" },
      { keyValue: "2", label: "2" },
      { keyValue: "3", label: "3" },
      { keyValue: "clear", label: "Clear", variant: "clear" },
    ],
    [
      { keyValue: "0", label: "0" },
      { keyValue: "00", label: "00" },
      {}, // empty cell
      { keyValue: "delete", icon: "backspace", variant: "delete" },
    ],
  ],
};

const BINARY_LAYOUT: PadLayout = {
  columns: 4,
  rows: [
    [
      { keyValue: "0",  label: "0"  },
      { keyValue: "00", label: "00" },
      { keyValue: "10", label: "10" },
      { keyValue: "clear", label: "Clear", variant: "clear" },
    ],
    [
      { keyValue: "1",  label: "1"  },
      { keyValue: "01", label: "01" },
      { keyValue: "11", label: "11" },
      { keyValue: "delete", icon: "backspace", variant: "delete" },
    ],
  ],
};

const HEX_LAYOUT: PadLayout = {
  columns: 5,
  rows: [
    [
      { keyValue: "7", label: "7" },
      { keyValue: "8", label: "8" },
      { keyValue: "9", label: "9" },
      { keyValue: "E", label: "E" },
      { keyValue: "F", label: "F" },
    ],
    [
      { keyValue: "4", label: "4" },
      { keyValue: "5", label: "5" },
      { keyValue: "6", label: "6" },
      { keyValue: "C", label: "C" },
      { keyValue: "D", label: "D" },
    ],
    [
      { keyValue: "1", label: "1" },
      { keyValue: "2", label: "2" },
      { keyValue: "3", label: "3" },
      { keyValue: "A", label: "A" },
      { keyValue: "B", label: "B" },
    ],
    [
      { keyValue: "0",  label: "0"  },
      { keyValue: "00", label: "00" },
      // colSpan: 2 spans across 2 of the 5 columns
      { keyValue: "clear", label: "Clear", variant: "clear", colSpan: 1.5 },
      { keyValue: "delete", icon: "backspace", variant: "delete", colSpan: 1.5 },
    ],
  ],
};

function getLayout(field: NumberSystemField): PadLayout {
  if (field === "hex")    return HEX_LAYOUT;
  if (field === "binary") return BINARY_LAYOUT;
  return DECIMAL_LAYOUT;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function NumberSystemPad({
  activeField,
  onKeyPress,
}: NumberSystemPadProps) {
  const theme = useTheme();
  const { height: screenHeight } = useWindowDimensions();
  const layout = getLayout(activeField);

  // Binary only has 2 rows — give it proportionally less height.
  // Decimal and Hex have 4 rows — use the same height so key cells
  // are consistent in size across both modes.
  const padHeight = Math.round(
    layout.rows.length === 2
      ? Math.min(Math.max(screenHeight * 0.16, 120), screenHeight * 0.28)
      : Math.min(Math.max(screenHeight * 0.32, 240), screenHeight * 0.55)
  );

  const styles = createStyles(theme, padHeight);

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {layout.rows.map((row, rowIndex) => (
          <View key={`row-${rowIndex}`} style={styles.row}>
            {row.map((cell, cellIndex) => {
              const span   = cell.colSpan ?? 1;
              const widthPct = `${(span / layout.columns) * 100}%` as const;
              const isEmpty  = !cell.keyValue;

              // Empty cell — renders pad background color, never pressable
              if (isEmpty) {
                return (
                  <View
                    key={`empty-${rowIndex}-${cellIndex}`}
                    style={[styles.keyWrapper, { width: widthPct }]}
                  >
                    {/* Transparent face — matches pad background visually */}
                    <View style={styles.emptyFace} />
                  </View>
                );
              }

              // Action keys: clear and delete use accent color
              const isAccent = cell.variant === "clear" || cell.variant === "delete";

              const textColor = isAccent
                ? theme.colors.primary   // #8dc63f — matches NumberPad accent
                : theme.colors.text;     // white in dark, dark in light

              return (
                <Pressable
                  key={`${cell.keyValue}-${rowIndex}-${cellIndex}`}
                  style={({ pressed }) => [
                    styles.keyWrapper,
                    { width: widthPct },
                    pressed && styles.keyPressed,
                  ]}
                  onPress={() => onKeyPress(cell.keyValue!)}
                  android_ripple={{ color: "#00000014" }}
                  hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}
                >
                  <View style={styles.keyFace}>
                    {cell.icon ? (
                      <MaterialCommunityIcons
                        name={cell.icon}
                        size={30}
                        color={textColor}
                      />
                    ) : (
                      <Text
                        style={[
                          styles.keyText,
                          isAccent && styles.accentKeyText,
                          cell.label === "00" && styles.doubleZeroText,
                          cell.label === "10" && styles.doubleZeroText,
                          cell.label === "01" && styles.doubleZeroText,
                          cell.label === "11" && styles.doubleZeroText,
                          { color: textColor },
                        ]}
                      >
                        {cell.label}
                      </Text>
                    )}
                  </View>
                </Pressable>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const createStyles = (theme: ReturnType<typeof useTheme>, padHeight: number) =>
  StyleSheet.create({
    container: {
      height: padHeight,
      padding: 4,
      backgroundColor: theme.colors.padBackground,
    },

    grid: {
      flex: 1,
      justifyContent: "space-between",
    },

    row: {
      flex: 1,
      flexDirection: "row",
    },

    keyWrapper: {
      padding: 4,
    },

    keyPressed: {
      opacity: 0.8,
    },

    // Key face — matches NumberPad.tsx key background tokens exactly
    keyFace: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      backgroundColor: theme.colors.keyBackground,
    },

    // Empty cell — transparent so pad background shows through
    emptyFace: {
      flex: 1,
      backgroundColor: theme.colors.keyBackground,
    },

    keyText: {
      fontSize: 28,
      fontWeight: "500",
      includeFontPadding: false,
      textAlign: "center",
    },

    // Clear label uses smaller font to fit, matches NumberPad.tsx clearText
    accentKeyText: {
      fontSize: 22,
      fontWeight: "500",
    },

    // Two-digit labels (00, 01, 10, 11) use slightly smaller font
    doubleZeroText: {
      fontSize: 24,
      fontWeight: "600",
    },
  });