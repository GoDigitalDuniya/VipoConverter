import React, { useMemo } from "react";
import { StyleProp, StyleSheet, Text, TextStyle, View } from "react-native";
import { useTheme } from "../../../../../theme/ThemeProvider";
import { SizeCategory, SizeRow, SizeUnit, VirtualUnit } from "../sizeChartTypes";
import SizeValueText from "./SizeValueText";

interface SizeChartUpperZoneProps {
  category: SizeCategory;
  units: SizeUnit[];
  selectedUnitKey: string;
  row: SizeRow;
  categoryTitle?: string;
  virtualUnits?: VirtualUnit[];
}

interface DisplayUnit {
  key: string;
  label: string;
  displayValue: string;
  isVirtual: boolean;
}

export default function SizeChartUpperZone({
  units,
  selectedUnitKey,
  row,
  categoryTitle,
  virtualUnits,
}: SizeChartUpperZoneProps) {
  const theme = useTheme();
  const styles = createStyles(theme);

  // Build a unified display list combining real units and virtual units
  const allDisplayUnits = useMemo(() => {
    const realItems: DisplayUnit[] = units.map((u) => ({
      key: u.key,
      label: u.label,
      displayValue: row[u.key] ?? "",
      isVirtual: false,
    }));

    const virtualItems: DisplayUnit[] = (virtualUnits ?? []).map((v) => ({
      key: v.key,
      label: v.label,
      displayValue: v.getValue(row),
      isVirtual: true,
    }));

    return [...realItems, ...virtualItems];
  }, [units, virtualUnits, row]);

  // Split units into pairs — 2 units per row, each taking half the width
  const unitPairs = useMemo(() => {
    const pairs: [DisplayUnit, DisplayUnit | undefined][] = [];
    for (let i = 0; i < allDisplayUnits.length; i += 2) {
      pairs.push([allDisplayUnits[i], allDisplayUnits[i + 1]]);
    }
    return pairs;
  }, [allDisplayUnits]);

  const renderUnitCell = (unit: DisplayUnit) => {
    const displayValue = unit.displayValue === "" ? "—" : unit.displayValue;
    // Virtual units are never selected, even if selectedUnitKey matches
    const isSelected = !unit.isVirtual && unit.key === selectedUnitKey;

    return (
      <View key={unit.key} style={styles.cell}>
        {/* Label — left side of cell */}
        <Text
          style={[
            styles.cellLabel,
            isSelected && styles.cellLabelSelected,
          ]}
          numberOfLines={1}
        >
          {unit.label}
        </Text>

        {/* Value — right side of cell, fractions rendered as superscript */}
        <SizeValueText
          value={displayValue}
          baseStyle={[styles.cellValue, isSelected && styles.cellValueSelected]}
          fractionStyle={[styles.cellValueFraction, isSelected && styles.cellValueFractionSelected]}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {categoryTitle && (
        <Text style={styles.categoryTitle}>{categoryTitle}</Text>
      )}
      {unitPairs.map((pair, index) => (
        <View key={index} style={styles.pairRow}>
          {renderUnitCell(pair[0])}
          {/* Vertical divider between the two columns */}
          <View style={styles.divider} />
          {pair[1]
            ? renderUnitCell(pair[1])
            : <View style={styles.cell} /> /* empty spacer to keep layout balanced */
          }
        </View>
      ))}
    </View>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>) =>
  StyleSheet.create({
    container: {
      flex: 0.55,
      backgroundColor: theme.colors.surface,
    },

    // Category title — shown at top in primary color (shoe-size only)
    categoryTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: theme.colors.primary,
      paddingHorizontal: 24,
      paddingTop: 10,
      paddingBottom: 4,
    },

    // One horizontal row containing 2 unit cells
    pairRow: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.colors.border,
    },

    // Each cell: label on left, value on right — half the container width
    cell: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 24,
      paddingVertical: 8,
    },

    // Thin vertical line between left and right unit cells
    divider: {
      width: StyleSheet.hairlineWidth,
    },

    // Unit label — left side, muted, medium weight
    cellLabel: {
      fontSize: 14,
      fontWeight: "400",
      color: theme.colors.textSecondary,
      flexShrink: 1,
    },

    cellLabelSelected: {
      color: theme.colors.primary,
      fontWeight: "600",
    },

    // Value — right side, large bold
    cellValue: {
      fontSize: 20,
      fontWeight: "700",
      color: theme.colors.text,
      textAlign: "right",
    },

    cellValueSelected: {
      color: theme.colors.primary,
    },

    // Fraction part — smaller size creates natural superscript effect
    // when nested inside parent Text via React Native's baseline rendering
    cellValueFraction: {
      fontSize: 11,
      fontWeight: "600",
      color: theme.colors.text,
    },

    cellValueFractionSelected: {
      color: theme.colors.primary,
    },
  });