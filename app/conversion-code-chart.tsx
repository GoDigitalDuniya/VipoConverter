import React, { useContext, useEffect, useMemo } from "react";
import { FlatList, ListRenderItemInfo, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../theme/ThemeProvider";
import { TitleContext } from "./_layout";

interface ConversionTableRow {
  slNo: number;
  decimal: string;
  hex: string;
  binary: string;
}

function generateConversionTable(): ConversionTableRow[] {
  return Array.from({ length: 256 }, (_, i) => ({
    slNo: i + 1,
    decimal: String(i),
    hex: i.toString(16).toUpperCase().padStart(2, "0"),
    binary: i.toString(2).padStart(8, "0"),
  }));
}

interface HeaderProps {
  styles: ReturnType<typeof createStyles>;
}

function TableHeader({ styles }: HeaderProps) {
  return (
    <View style={styles.headerRow}>
      <Text style={[styles.headerText, styles.colSlNo]}>Sl.No.</Text>
      <Text style={[styles.headerText, styles.colDecimal]}>Decimal</Text>
      <Text style={[styles.headerText, styles.colHex]}>Hex</Text>
      <Text style={[styles.headerText, styles.colBinary]}>Binary</Text>
    </View>
  );
}

export default function ConversionCodeChartScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { setTitle } = useContext(TitleContext);

  const data = useMemo(() => generateConversionTable(), []);

  useEffect(() => {
    setTitle("Conversion code chart");
    return () => setTitle(undefined);
  }, [setTitle]);

  const renderItem = ({ item, index }: ListRenderItemInfo<ConversionTableRow>) => {
    const rowBackground = index % 2 === 0 ? theme.colors.background : theme.colors.surface;

    return (
      <View style={[styles.dataRow, { backgroundColor: rowBackground }]}>
        <Text style={[styles.cellText, styles.colSlNo]}>{item.slNo}</Text>
        <Text style={[styles.cellText, styles.colDecimal]}>{item.decimal}</Text>
        <Text style={[styles.cellText, styles.colHex]}>{item.hex}</Text>
        <Text style={[styles.cellText, styles.colBinary]}>{item.binary}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.slNo.toString()}
        renderItem={renderItem}
        ListHeaderComponent={<TableHeader styles={styles} />}
        stickyHeaderIndices={[0]}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    listContent: {
      paddingBottom: 12,
    },
    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.surface,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.colors.border,
      paddingVertical: 10,
      paddingHorizontal: 10,
    },
    dataRow: {
      flexDirection: "row",
      alignItems: "center",
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.colors.border,
      paddingVertical: 10,
      paddingHorizontal: 10,
    },
    headerText: {
      fontSize: 13,
      fontWeight: "700",
      color: theme.colors.text,
      textAlign: "center",
    },
    cellText: {
      fontSize: 13,
      color: theme.colors.text,
      textAlign: "center",
    },
    colSlNo: {
      flex: 0.8,
    },
    colDecimal: {
      flex: 1,
    },
    colHex: {
      flex: 1,
    },
    colBinary: {
      flex: 1.5,
    },
  });
