import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../../../../theme/ThemeProvider";
import { PercentageMode } from "../utils/percentageUtils";

type SliderLikeProps = {
  minimumValue: number;
  maximumValue: number;
  step?: number;
  value: number;
  onValueChange: (value: number) => void;
  minimumTrackTintColor?: string;
  maximumTrackTintColor?: string;
  thumbTintColor?: string;
};

type SliderComponentType = React.ComponentType<SliderLikeProps>;

const SliderControl: SliderComponentType = (() => {
  try {
    const m = require("@react-native-community/slider") as { default: SliderComponentType };
    return m.default;
  } catch {
    const rn = require("react-native") as { Slider?: SliderComponentType };
    if (rn.Slider) return rn.Slider;
    return (() => <View />) as SliderComponentType;
  }
})();

interface PercentageInputZoneProps {
  mode: PercentageMode;
  sliderValue: number;
  onSliderValueChange: (value: number) => void;
  field1Value: string;
  field2Value: string;
  activeField: "field1" | "field2";
  onSelectField1: () => void;
  onSelectField2: () => void;
  outputValue: string;
}

// Fixed label column width — all 3 rows share this so inputs align perfectly
const LABEL_WIDTH = 36;
const INPUT_HEIGHT = 52;

export default function PercentageInputZone({
  mode,
  sliderValue,
  onSliderValueChange,
  field1Value,
  field2Value,
  activeField,
  onSelectField1,
  onSelectField2,
  outputValue,
}: PercentageInputZoneProps) {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>

      {/* ── Row 1 ──────────────────────────────────────────────────── */}
      <View style={styles.row}>

        {mode === "percentage-of-value" ? (
            <>
                <View style={styles.labelSpacer} />
                <TouchableOpacity
                    style={[
                    styles.inputBox,
                    activeField === "field1" ? styles.inputActive : styles.inputInactive,
                    ]}
                    onPress={onSelectField1}
                    activeOpacity={0.85}
                >
                    <Text style={styles.inputValue}>{field1Value}</Text>
                </TouchableOpacity>
          </>
        ) : (
          <View style={styles.sliderRow}>
            <View style={[styles.percentBadge, { backgroundColor: theme.colors.primary }]}>
              <Text style={styles.percentBadgeText}>{sliderValue}%</Text>
            </View>
            <View style={styles.sliderContainer}>
              <SliderControl
                minimumValue={1}
                maximumValue={100}
                step={1}
                value={sliderValue}
                onValueChange={(v) => onSliderValueChange(Math.round(v))}
                minimumTrackTintColor={theme.colors.primary}
                maximumTrackTintColor={theme.colors.border}
                thumbTintColor={theme.colors.primary}
              />
            </View>
          </View>
        )}
      </View>

      {/* ── Row 2: of ──────────────────────────────────────────────── */}
      <View style={styles.row}>
        <Text style={styles.rowLabel}>of</Text>
        <TouchableOpacity
          style={[
            styles.inputBox,
            activeField === "field2" ? styles.inputActive : styles.inputInactive,
          ]}
          onPress={onSelectField2}
          activeOpacity={0.85}
        >
          <Text style={styles.inputValue}>{field2Value}</Text>
        </TouchableOpacity>
      </View>

      {/* ── Row 3: = output ────────────────────────────────────────── */}
      <View style={styles.row}>
        <Text style={styles.rowLabel}>=</Text>
        <View style={styles.outputBox}>
          <Text
            style={styles.outputValue}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.6}
          >
            {outputValue || ""}
          </Text>
        </View>
      </View>

    </View>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: theme.colors.border,
      marginHorizontal: 8,
      marginTop: 8,
      paddingHorizontal: 12,
      paddingVertical: 14,
      gap: 12,
    },

    // Every row uses the same structure: fixed label + flex input
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },

    // Blank spacer for row 1 — same width as rowLabel
    // so row 1 input aligns with rows 2 and 3
    labelSpacer: {
      width: LABEL_WIDTH,
    },

    rowLabel: {
      width: LABEL_WIDTH,
      fontSize: 18,
      fontWeight: "500",
      color: theme.colors.textSecondary,
      textAlign: "left",
    },

    // ── Slider ────────────────────────────────────────────────────
    sliderRow: {
      flex: 1,
      height: INPUT_HEIGHT,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },

    percentBadge: {
      minWidth: 52,
      height: 28,
      borderRadius: 14,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 10,
    },

    percentBadgeText: {
      color: "#ffffff",
      fontSize: 13,
      fontWeight: "700",
    },

    sliderContainer: {
      flex: 1,
      justifyContent: "center",
    },

    // ── Input boxes ───────────────────────────────────────────────
    inputBox: {
      flex: 1,
      height: INPUT_HEIGHT,
      borderRadius: 6,
      justifyContent: "center",
      backgroundColor: theme.colors.surface,
    },

    inputActive: {
      borderWidth: 2,
      borderColor: theme.colors.primary,
    },

    inputInactive: {
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: theme.colors.border,
    },

    inputValue: {
      fontSize: 22,
      fontWeight: "700",
      textAlign: "right",
      paddingHorizontal: 14,
      color: theme.colors.text,
    },

    // ── Output ────────────────────────────────────────────────────
    outputBox: {
      flex: 1,
      height: INPUT_HEIGHT,
      justifyContent: "center",
    },

    outputValue: {
      fontSize: 24,
      fontWeight: "700",
      color: theme.colors.text,
      textAlign: "right",
      paddingHorizontal: 4,
      textDecorationLine: "underline",
    },
  });