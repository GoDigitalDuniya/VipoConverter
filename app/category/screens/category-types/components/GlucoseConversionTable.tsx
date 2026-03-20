import React, { useMemo } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useTheme } from "../../../../../theme/ThemeProvider";
import {
  MGDL_TO_MMOL_TABLE,
  MMOL_TO_MGDL_TABLE,
} from "../utils/glucoseUtils";

export default function GlucoseConversionTable() {
  const theme = useTheme();
  const styles = createStyles(theme);

  const maxRows = useMemo(
    () => Math.max(MGDL_TO_MMOL_TABLE.length, MMOL_TO_MGDL_TABLE.length),
    []
  );

  return (
    <View style={styles.container}>
      {/* Header Row */}
      <View style={[styles.headerRow, { backgroundColor: theme.colors.surface }]}>
        <View style={styles.column}>
          <Text style={[styles.headerText, { color: theme.colors.text }]}>
            mg/dl → mmol/l
          </Text>
        </View>
        <View style={styles.column}>
          <Text style={[styles.headerText, { color: theme.colors.text }]}>
            mmol/l → mg/dl
          </Text>
        </View>
      </View>

      {/* Scrollable Body */}
      <ScrollView style={styles.scrollView}>
        {Array.from({ length: maxRows }).map((_, index) => {
          const leftRow = MGDL_TO_MMOL_TABLE[index];
          const rightRow = MMOL_TO_MGDL_TABLE[index];
          const isEven = index % 2 === 0;
          const rowBackground = isEven
            ? theme.colors.background
            : theme.colors.surface;

          return (
            <View
              key={index}
              style={[styles.tableRow, { backgroundColor: rowBackground }]}
            >
              {/* Left Column: mg/dl → mmol/l */}
              <View style={[styles.column, styles.leftColumn]}>
                {leftRow ? (
                  <Text style={[styles.cellText, { color: theme.colors.text }]}>
                    {leftRow.mgdl} → {leftRow.mmol}
                  </Text>
                ) : (
                  <View />
                )}
              </View>

              {/* Right Column: mmol/l → mg/dl */}
              <View style={[styles.column, styles.rightColumn]}>
                {rightRow ? (
                  <Text style={[styles.cellText, { color: theme.colors.text }]}>
                    {rightRow.mmol} → {rightRow.mgdl}
                  </Text>
                ) : (
                  <View />
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },

    // Header Row
    headerRow: {
      flexDirection: "row",
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.colors.border,
      paddingVertical: 12,
      paddingHorizontal: 16,
    },

    // Scrollable Body
    scrollView: {
      flex: 1,
    },

    tableRow: {
      flexDirection: "row",
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.colors.border,
      minHeight: 44,
    },

    column: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 10,
      paddingHorizontal: 8,
    },

    leftColumn: {
      borderRightWidth: StyleSheet.hairlineWidth,
      borderRightColor: theme.colors.border,
    },

    rightColumn: {},

    headerText: {
      fontSize: 13,
      fontWeight: "600",
      textAlign: "center",
    },

    cellText: {
      fontSize: 14,
      fontWeight: "400",
      textAlign: "center",
    },
  });
