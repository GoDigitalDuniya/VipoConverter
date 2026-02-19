import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../theme/ThemeProvider";

export default function ContactScreen() {
  const t = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: t.colors.background }]}> 
      <Text style={[styles.text, { color: t.colors.text }]}>Welcome to Contact Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 18 },
});
