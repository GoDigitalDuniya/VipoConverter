import { useRouter } from "expo-router";
import React, { useCallback, useMemo } from "react";
import { FlatList, ListRenderItem, Pressable, StyleSheet, Text, View } from "react-native";
import type { ConversionHistoryItem } from "../src/store/useConversionHistoryStore";
import useHistoryRestoreStore from "../src/store/useHistoryRestoreStore";
import { formatConversionNumber } from "../src/utils/formatConversionNumber";
import useSettingsStore from "../store/useSettingsStore";
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

function getSectionTitle(timestamp: number): string {
  const itemDay = startOfDay(timestamp);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const today = now.getTime();
  const yesterday = today - 24 * 60 * 60 * 1000;

  if (itemDay === today) return "Today";
  if (itemDay === yesterday) return "Yesterday";

  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString(undefined, { month: "long" });
  const year = date.getFullYear();

  return `${day} ${month},${year}`;
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
  const digits = useSettingsStore((s) => s.numberOfDigits);
  const styles = useMemo(() => createStyles(t), [t]);

  const inputKey = item.category === "currency" ? item.inputUnitKey.toUpperCase() : item.inputUnitKey;
  const outputKey = item.category === "currency" ? item.outputUnitKey.toUpperCase() : item.outputUnitKey;

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
          {formatConversionNumber(item.inputValue, digits)} ({inputKey})
        </Text>

        <Text style={styles.unitText} numberOfLines={1}>
          {item.inputUnitLabel}
        </Text>
      </View>

      {/* Column 3 — Arrow */}
      <View style={styles.arrowColumn}>
        <Text style={styles.arrow}>──▶</Text>
      </View>

      {/* Column 4 — Output */}
      <View style={styles.outputColumn}>
        <Text style={styles.valueText} numberOfLines={1}>
          {formatConversionNumber(item.outputValue, digits)} ({outputKey})
        </Text>

        <Text style={styles.unitText} numberOfLines={1}>
          {item.outputUnitLabel}
        </Text>
      </View>
    </Pressable>
  );
})

const PAGE_SIZE = 100;

export default function ConversionHistoryList({ items }: Props) {
  const router = useRouter();
  const setPendingRestore = useHistoryRestoreStore((state) => state.setPendingRestore);
  const t = useTheme();
  const styles = useMemo(() => createStyles(t), [t]);

  const [loadedCount, setLoadedCount] = React.useState(PAGE_SIZE);

  const hasMore = items.length > loadedCount;
  const visibleItems = React.useMemo(
    () => items.slice(0, loadedCount),
    [items, loadedCount]
  );

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

  React.useEffect(() => {
    if (__DEV__) {
      console.log(
        `[History] total items=${items.length} loaded=${loadedCount} visible=${visibleItems.length} hasMore=${hasMore}`
      );
    }
  }, [items.length, loadedCount, visibleItems.length, hasMore]);

  const rows = useMemo<RowData[]>(() => {
    const grouped: Record<string, ConversionHistoryItem[]> = {};

    for (const item of visibleItems) {
      const section = getSectionTitle(item.timestamp);
      if (!grouped[section]) grouped[section] = [];
      grouped[section].push(item);
    }

    const result: RowData[] = [];

    // Always show Today and Yesterday first (if present)
    const orderedSections: string[] = [];
    if (grouped["Today"]) orderedSections.push("Today");
    if (grouped["Yesterday"]) orderedSections.push("Yesterday");

    // Add remaining sections sorted by date descending
    const otherSections = Object.keys(grouped).filter(
      (k) => k !== "Today" && k !== "Yesterday"
    );

    otherSections
      .sort((a, b) => {
        const aDate = new Date(a.replace(",", ""));
        const bDate = new Date(b.replace(",", ""));
        return bDate.getTime() - aDate.getTime();
      })
      .forEach((section) => orderedSections.push(section));

    for (const section of orderedSections) {
      const itemsInSection = grouped[section];
      if (!itemsInSection || itemsInSection.length === 0) continue;

      result.push({ type: "section", id: `section-${section}`, title: section });
      itemsInSection.forEach((entry) => {
        result.push({ type: "item", id: entry.id, item: entry });
      });
    }

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
      keyboardShouldPersistTaps="handled"
      removeClippedSubviews
      showsVerticalScrollIndicator={false}
      onEndReached={() => {
        if (!hasMore) return;
        if (__DEV__) console.log("[History] loading more items", { loadedCount, total: items.length });
        setLoadedCount((prev) => Math.min(prev + PAGE_SIZE, items.length));
      }}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        !hasMore ? (
          <Text style={styles.emptyText}>End of history</Text>
        ) : null
      }
      ListEmptyComponent={<Text style={styles.emptyText}>No history yet</Text>}
    />
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>) =>
  StyleSheet.create({
    sectionRow: {
      backgroundColor: theme.colors.historyHeaderBackground,
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
