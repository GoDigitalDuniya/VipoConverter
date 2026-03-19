import React from "react";
import { StyleProp, StyleSheet, Text, TextStyle, View } from "react-native";
import { parseSizeValue } from "../sizeChartUtils";

/**
 * Renders a size value with optional fraction as a visual superscript.
 * The whole number sits at the baseline; the fraction is raised via
 * marginBottom on its wrapper View inside a flex-end aligned row.
 */
export default function SizeValueText({
  value,
  baseStyle,
  fractionStyle,
}: {
  value: string;
  baseStyle: StyleProp<TextStyle>;
  fractionStyle: StyleProp<TextStyle>;
}) {
  const { whole, fraction } = parseSizeValue(value);

  if (!fraction) {
    return (
      <Text style={baseStyle} numberOfLines={1}>
        {whole}
      </Text>
    );
  }

  return (
    <View style={staticStyles.fractionContainer}>
      {whole !== "" && (
        <Text style={baseStyle} numberOfLines={1}>
          {whole}
        </Text>
      )}
      <View style={staticStyles.fractionSuperscript}>
        <Text style={fractionStyle} numberOfLines={1}>
          {fraction}
        </Text>
      </View>
    </View>
  );
}

const staticStyles = StyleSheet.create({
  fractionContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  fractionSuperscript: {
    marginBottom: 14,
  },
});
