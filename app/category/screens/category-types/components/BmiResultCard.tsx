import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../../../../theme/ThemeProvider";

interface BmiResultCardProps {
  bmi: number;
  category: string;
  iconName: string;
}

export default function BmiResultCard({ bmi, category, iconName }: BmiResultCardProps) {
  const theme = useTheme();

  return (
    <View style={[resultCardStyles.container, { backgroundColor: theme.colors.background }]}>
      <View style={resultCardStyles.header}>
        <MaterialCommunityIcons
          name={iconName as any}
          size={24}
          color={theme.colors.primary}
        />
        <Text style={[resultCardStyles.bmiValue, { color: theme.colors.primary }]}>
          {bmi.toFixed(1)}
        </Text>
      </View>
      <Text style={[resultCardStyles.category, { color: theme.colors.text }]}>
        {category}
      </Text>
    </View>
  );
}

const resultCardStyles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 12,
    marginHorizontal: 20,
    marginVertical: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  bmiValue: {
    fontSize: 32,
    fontWeight: "bold",
    marginLeft: 8,
  },
  category: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
  },
});