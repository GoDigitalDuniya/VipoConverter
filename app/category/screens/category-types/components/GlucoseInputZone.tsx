import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useTheme } from "../../../../../theme/ThemeProvider";
import { GlucoseUnit, UNIT_LABELS } from "../glucoseUtils";

interface GlucoseInputZoneProps {
  inputValue: string;
  activeUnit: GlucoseUnit;
  outputValue: string;
  onInputPress: () => void;
  onUnitChange: (unit: GlucoseUnit) => void;
  onInfoPress: () => void;
}

export default function GlucoseInputZone({
  inputValue,
  activeUnit,
  outputValue,
  onInputPress,
  onUnitChange,
  onInfoPress,
}: GlucoseInputZoneProps) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const outputUnit: GlucoseUnit = activeUnit === "mmol" ? "mgdl" : "mmol";

  return (
    <View style={styles.container}>

      {/* Row 1: Label + Input Box */}
      <View style={styles.inputRow}>
        <Text style={styles.inputLabel}>Value</Text>
        <TouchableOpacity
          style={[styles.inputBox, { backgroundColor: theme.colors.primary }]}
          onPress={onInputPress}
          activeOpacity={0.85}
        >
          <Text style={styles.inputValue}>{inputValue}</Text>
        </TouchableOpacity>
      </View>

      {/* Row 2: Radio Buttons — right aligned */}
      <View style={styles.radioRow}>
        {(["mmol", "mgdl"] as const).map((unit) => {
          const isSelected = activeUnit === unit;
          return (
            <TouchableOpacity
              key={unit}
              style={styles.radioButton}
              onPress={() => onUnitChange(unit)}
              activeOpacity={0.7}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              {/* Outer ring */}
              <View
                style={[
                  styles.radioOuter,
                  {
                    borderColor: isSelected
                      ? theme.colors.primary
                      : theme.colors.textSecondary,
                  },
                ]}
              >
                {/* Filled inner dot — only when selected */}
                {isSelected && (
                  <View
                    style={[
                      styles.radioInnerDot,
                      { backgroundColor: theme.colors.primary },
                    ]}
                  />
                )}
              </View>
              <Text
                style={[
                  styles.radioLabel,
                  {
                    color: isSelected
                      ? theme.colors.primary
                      : theme.colors.textSecondary,
                    fontWeight: isSelected ? "700" : "400",
                  },
                ]}
              >
                {UNIT_LABELS[unit]}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Row 3: Output */}
      <View style={styles.outputRow}>
        <Text style={styles.outputEquals}>=</Text>
        <Text style={styles.outputValue}>{outputValue}</Text>
        <Text style={styles.outputUnit}>{UNIT_LABELS[outputUnit]}</Text>
      </View>

      {/* Row 4: Info Link */}
      <TouchableOpacity
        style={styles.infoLink}
        onPress={onInfoPress}
        activeOpacity={0.7}
      >
        <Text style={styles.infoText}>
          Exact and approximate Calculation rule
        </Text>
        <MaterialCommunityIcons
          name="information-outline"
          size={16}
          color={theme.colors.primary}
        />
      </TouchableOpacity>

    </View>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface,
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 16,
      gap: 16,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.colors.border,
    },

    // ── Row 1 ──────────────────────────────────────────────────────────────
    inputRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
    },
    inputLabel: {
      fontSize: 16,
      fontWeight: "600",
      color: theme.colors.text,
      minWidth: 48,
    },
    inputBox: {
      flex: 1,
      height: 56,
      borderRadius: 8,
      justifyContent: "center",
      paddingHorizontal: 16,
    },
    inputValue: {
      fontSize: 24,
      fontWeight: "700",
      color: "#ffffff",
      textAlign: "right",
    },

    // ── Row 2 ──────────────────────────────────────────────────────────────
    radioRow: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      gap: 24,
    },
    radioButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    // Outer ring — larger and more visible
    radioOuter: {
      width: 22,
      height: 22,
      borderRadius: 11,
      borderWidth: 2,
      justifyContent: "center",
      alignItems: "center",
    },
    // Inner filled dot when selected
    radioInnerDot: {
      width: 12,
      height: 12,
      borderRadius: 6,
    },
    radioLabel: {
      fontSize: 15,
    },

    // ── Row 3 ──────────────────────────────────────────────────────────────
    outputRow: {
      flexDirection: "row",
      alignItems: "baseline",
      justifyContent: "flex-end",
      gap: 8,
      paddingVertical: 4,
    },
    outputEquals: {
      fontSize: 18,
      fontWeight: "400",
      color: theme.colors.textSecondary,
    },
    outputValue: {
      fontSize: 28,
      fontWeight: "700",
      color: theme.colors.text,
    },
    outputUnit: {
      fontSize: 14,
      fontWeight: "400",
      color: theme.colors.textSecondary,
    },

    // ── Row 4 ──────────────────────────────────────────────────────────────
    infoLink: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
    },
    infoText: {
      fontSize: 13,
      fontWeight: "500",
      color: theme.colors.primary,
    },
  });