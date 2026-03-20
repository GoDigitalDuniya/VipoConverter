import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../../../../theme/ThemeProvider";
import { PercentageMode } from "../utils/percentageUtils";

interface PercentageModeRadioProps {
  mode: PercentageMode;
  onModeChange: (mode: PercentageMode) => void;
}

const MODE_OPTIONS: { mode: PercentageMode; label: string }[] = [
  { mode: "percentage-of-value", label: "Percentage of value" },
  { mode: "value-of-percentage", label: "Value of percentage" },
];

export default function PercentageModeRadio({ mode, onModeChange }: PercentageModeRadioProps) {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      {MODE_OPTIONS.map((option) => {
        const isSelected = mode === option.mode;

        return (
          <TouchableOpacity
            key={option.mode}
            style={styles.optionButton}
            onPress={() => onModeChange(option.mode)}
            activeOpacity={0.7}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
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
              {isSelected && (
                <View
                  style={[
                    styles.radioInner,
                    { backgroundColor: theme.colors.primary },
                  ]}
                />
              )}
            </View>
            <Text
              style={[
                styles.optionLabel,
                {
                  color: isSelected
                    ? theme.colors.primary
                    : theme.colors.textSecondary,
                  fontWeight: isSelected ? "700" : "400",
                },
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 16,
      paddingTop: 10,
      paddingBottom: 2,
    },
    optionButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    radioOuter: {
      width: 22,
      height: 22,
      borderRadius: 11,
      borderWidth: 2,
      justifyContent: "center",
      alignItems: "center",
    },
    radioInner: {
      width: 10,
      height: 10,
      borderRadius: 5,
    },
    optionLabel: {
      fontSize: 13,
    },
  });
