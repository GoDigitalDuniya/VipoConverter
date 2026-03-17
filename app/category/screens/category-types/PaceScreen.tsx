import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../../../theme/ThemeProvider";

type Props = {
  categoryKey: string;
};

export default function PaceScreen({ categoryKey }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pace</Text>
      <Text style={styles.subtitle}>Category: {categoryKey}</Text>
      <Text style={styles.subtitle}>Type: pace</Text>
    </View>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
      backgroundColor: theme.colors.background,
    },
    title: {
      fontSize: 20,
      fontWeight: "700",
      marginBottom: 10,
      color: theme.colors.text,
    },
    subtitle: {
      fontSize: 14,
      marginTop: 4,
      color: theme.colors.textSecondary,
    },
  });
