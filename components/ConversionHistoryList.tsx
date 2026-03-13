import { useRouter } from "expo-router";
import React, { useCallback, useMemo } from "react";
import { FlatList, ListRenderItem, Pressable, StyleSheet, Text, View } from "react-native";
import type { ConversionHistoryItem } from "../src/store/useConversionHistoryStore";
import useHistoryRestoreStore from "../src/store/useHistoryRestoreStore";
import { useTheme } from "../theme/ThemeProvider";

type SectionHeaderRow = {
  type: "section";
  id: string;
  title: string;
};

type ItemRow = {
  type: "item";
  id: string;
  item: ConversionHistoryItem;
};

type RowData = SectionHeaderRow | ItemRow;

type Props = {
  items: ConversionHistoryItem[];
};

function startOfDay(timestamp: number): number {
  const d = new Date(timestamp);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

function getSectionTitle(timestamp: number): "Today" | "Yesterday" | "Earlier" {
  const itemDay = startOfDay(timestamp);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const today = now.getTime();
  const yesterday = today - 24 * 60 * 60 * 1000;

  if (itemDay === today) return "Today";
  if (itemDay === yesterday) return "Yesterday";
  return "Earlier";
}

function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

const HistoryItemRow = React.memo(function HistoryItemRow({
  item,
  onPress,
}: {
  item: ConversionHistoryItem;
  onPress: (item: ConversionHistoryItem) => void;
}) {
  const t = useTheme();
  const styles = useMemo(() => createStyles(t), [t]);

  return (
    <Pressable
      onPress={() => onPress(item)}
      android_ripple={{ color: "#00000014" }}
      style={({ pressed }) => [styles.itemRow, pressed && styles.itemPressed]}
    >
      
      {/* Column 1 — Time */}
      <View style={styles.timeColumn}>
        <Text style={styles.timeText}>{formatTime(item.timestamp)}</Text>
      </View>

      {/* Column 2 — Input */}
      <View style={styles.inputColumn}>
        <Text style={styles.valueText} numberOfLines={1}>
          {item.inputValue} ({item.inputUnitLabel})
        </Text>

        <Text style={styles.unitText} numberOfLines={1}>
          {item.inputUnitKey}
        </Text>
      </View>

      {/* Column 3 — Arrow */}
      <View style={styles.arrowColumn}>
        <Text style={styles.arrow}>──▶</Text>
      </View>

      {/* Column 4 — Output */}
      <View style={styles.outputColumn}>
        <Text style={styles.valueText} numberOfLines={1}>
          {item.outputValue} ({item.outputUnitLabel})
        </Text>

        <Text style={styles.unitText} numberOfLines={1}>
          {item.outputUnitKey}
        </Text>
      </View>
    </Pressable>
  );
})

export default function ConversionHistoryList({ items }: Props) {
  const router = useRouter();
  const setPendingRestore = useHistoryRestoreStore((state) => state.setPendingRestore);
  const t = useTheme();
  const styles = useMemo(() => createStyles(t), [t]);

  const handleHistoryItemPress = useCallback(
    (item: ConversionHistoryItem) => {
      setPendingRestore({
        category: item.category,
        inputValue: item.inputValue,
        inputUnitKey: item.inputUnitKey,
        outputUnitKey: item.outputUnitKey,
        timestamp: item.timestamp,
      });
      router.push(`/category/${item.category}` as any);
    },
    [router, setPendingRestore]
  );

  const rows = useMemo<RowData[]>(() => {
    const grouped: Record<string, ConversionHistoryItem[]> = {
      Today: [],
      Yesterday: [],
      Earlier: [],
    };

    for (const item of items) {
      grouped[getSectionTitle(item.timestamp)].push(item);
    }

    const result: RowData[] = [];
    (Object.keys(grouped) as Array<keyof typeof grouped>).forEach((section) => {
      if (grouped[section].length === 0) return;
      result.push({ type: "section", id: `section-${section}`, title: section });
      grouped[section].forEach((entry) => {
        result.push({ type: "item", id: entry.id, item: entry });
      });
    });

    return result;
  }, [items]);

  const renderItem: ListRenderItem<RowData> = ({ item }) => {
    if (item.type === "section") {
      return (
        <View style={styles.sectionRow}>
          <Text style={styles.sectionText}>{item.title}</Text>
        </View>
      );
    }

    return <HistoryItemRow item={item.item} onPress={handleHistoryItemPress} />;
  };

  return (
    <FlatList
      data={rows}
      keyExtractor={(row) => row.id}
      renderItem={renderItem}
      initialNumToRender={20}
      maxToRenderPerBatch={20}
      windowSize={10}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={<Text style={styles.emptyText}>No history yet</Text>}
    />
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>) =>
  StyleSheet.create({
    sectionRow: {
      backgroundColor: "#4cb4c4",
      paddingHorizontal: 12,
      paddingVertical: 3,
    },

    sectionText: {
      color: "#ffffff",
      fontSize: 14,
      fontWeight: "500",
    },

    itemRow: {
      flexDirection: "row",
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.colors.border,
      backgroundColor: theme.colors.background,
      alignItems: "center",
    },
    itemPressed: {
      opacity: 0.85,
    },

    timeColumn: {
      width: 48,
      justifyContent: "center",
    },

    timeText: {
      fontSize: 11,
      color: theme.colors.textSecondary,
    },

    inputColumn: {
      flex: 1,
      alignItems: "flex-end",
      paddingRight: 6,
    },

    outputColumn: {
      flex: 1.2,
      alignItems: "flex-end",
    },

    arrowColumn: {
      width: 50,
      alignItems: "center",
      justifyContent: "center",
    },

    valueText: {
      fontSize: 14,
      color: theme.colors.textSecondary,
    },

    unitText: {
      fontSize: 13,
      color: theme.colors.textSecondary,
      opacity: 0.8,
    },

    arrow: {
      fontSize: 16,
      color: theme.colors.textSecondary,
      letterSpacing: 1,
    },

    emptyText: {
      textAlign: "center",
      marginTop: 24,
      color: theme.colors.textSecondary,
      fontSize: 16,
    },
  });
