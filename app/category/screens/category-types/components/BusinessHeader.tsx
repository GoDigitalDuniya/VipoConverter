import { useTheme } from "@/theme/ThemeProvider";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
interface BusinessHeaderProps {
  title: string;
  onReset: () => void;
  onShare: () => void;
}

export default function BusinessHeader({ title, onReset, onShare }: BusinessHeaderProps) {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onReset} style={styles.actionButton}>
          <MaterialCommunityIcons name="refresh" size={32} color={theme.colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onShare} style={styles.actionButton}>
          <MaterialCommunityIcons name="share-variant" size={32} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingVertical: 6,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      backgroundColor: theme.colors.background,
    },
    title: {
      fontSize: 18,
      fontWeight: "700",
      color: theme.colors.text,
    },
    actions: {
      flexDirection: "row",
      alignItems: "center",
    },
    actionButton: {
      padding: 8,
      borderRadius: 999,
      marginLeft: 12,
    },
  });
