import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../../../../theme/ThemeProvider";

interface NumberSystemFieldGroupProps {
  label: string;
  value: string;
  isActive: boolean;
  onPress: () => void;
}

export default function NumberSystemFieldGroup({
  label,
  value,
  isActive,
  onPress,
}: NumberSystemFieldGroupProps) {
  const theme = useTheme();
  const styles = createStyles(theme, isActive);

  return (
    <View style={styles.group}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.valueBox} onPress={onPress} activeOpacity={0.8}>
        <Text style={styles.valueText}>{value}</Text>
      </TouchableOpacity>
    </View>
  );
}

const createStyles = (
  theme: ReturnType<typeof useTheme>,
  isActive: boolean
) =>
  StyleSheet.create({
    group: {
      marginBottom: 10,
    },
    label: {
      fontSize: 14,
      fontWeight: "600",
      color: theme.colors.textSecondary,
      marginBottom: 6,
    },
    valueBox: {
      height: 52,
      borderRadius: 6,
      justifyContent: "center",
      backgroundColor: isActive ? theme.colors.primary : theme.colors.surface,
      borderWidth: isActive ? 0 : 1,
      borderColor: isActive ? "transparent" : theme.colors.border,
    },
    valueText: {
      fontSize: 20,
      fontWeight: "700",
      textAlign: "right",
      paddingHorizontal: 14,
      color: isActive ? "#ffffff" : theme.colors.text,
    },
  });
