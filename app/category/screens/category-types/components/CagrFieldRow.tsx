import { useTheme } from "@/theme/ThemeProvider";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CagrFieldRowProps {
  label: string;
  value: string;
  highlighted?: boolean;
  active?: boolean;
  onPress: () => void;
}

export default function CagrFieldRow({
  label,
  value,
  highlighted = false,
  active = false,
  onPress,
}: CagrFieldRowProps) {
  const theme = useTheme();
  const styles = createStyles(theme, highlighted, active);

  return (
    <TouchableOpacity
      style={styles.row}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Label on the left */}
      <Text style={styles.label} numberOfLines={1}>{label}</Text>

      {/* Input box on the right — matches screenshot grey box */}
      <View style={styles.valueBox}>
        <Text style={styles.valueText}>{value}</Text>
      </View>
    </TouchableOpacity>
  );
}

const createStyles = (
  theme: ReturnType<typeof useTheme>,
  highlighted: boolean,
  active: boolean
) =>
  StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 8,
      paddingHorizontal: 16,
      gap: 12,
      backgroundColor: theme.colors.background,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.colors.border,
    },
    label: {
      flex: 1,
      fontSize: 15,
      fontWeight: "500",
      color: theme.colors.text,
    },
    valueBox: {
      flex: 1,
      height: 48,
      borderRadius: 4,
      justifyContent: "center",
      alignItems: "flex-end",
      paddingHorizontal: 12,

      // Highlighted = computed result → solid primary background
      // Active = currently editing → border highlight
      // Default → plain surface with subtle border
      backgroundColor: highlighted
        ? theme.colors.primary
        : theme.colors.surface,

      borderWidth: active && !highlighted ? 2 : 0,
      borderColor: active && !highlighted
        ? theme.colors.primary
        : "transparent",
    },
    valueText: {
      fontSize: 20,
      fontWeight: "600",
      textAlign: "right",
      color: highlighted ? "#ffffff" : theme.colors.text,
    },
  });