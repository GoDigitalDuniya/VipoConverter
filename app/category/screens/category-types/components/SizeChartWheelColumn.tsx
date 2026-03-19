import React, { useCallback } from "react";
import {
    DimensionValue,
    FlatList,
    ListRenderItemInfo,
    StyleSheet,
    View
} from "react-native";
import { useTheme } from "../../../../../theme/ThemeProvider";
import { ROW_HEIGHT_MAPPING } from "./_constants";
import SizeValueText from "./SizeValueText";

interface SizeChartWheelColumnProps {
  items: string[];
  selectedIndex: number;
  onScrollEnd: (index: number) => void;
  verticalPadding: number;
  columnRef: React.RefObject<FlatList<string> | null>;
  width: DimensionValue;
  label?: string;
}

// Stable padding spacer — avoids recreating inline on every render
function PaddingView({ height }: { height: number }) {
  return <View style={{ height }} />;
}

export default function SizeChartWheelColumn({
  items,
  selectedIndex,
  onScrollEnd,
  verticalPadding,
  columnRef,
  width,
}: SizeChartWheelColumnProps) {
  const theme = useTheme();
  const styles = createStyles(theme);

  const handleMomentumScrollEnd = useCallback(
    (event: { nativeEvent: { contentOffset: { y: number } } }) => {
      const offsetY = event.nativeEvent.contentOffset.y;
      const index = Math.round(offsetY / ROW_HEIGHT_MAPPING);
      const clamped = Math.max(0, Math.min(index, items.length - 1));
      onScrollEnd(clamped);
    },
    [items.length, onScrollEnd]
  );

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<string>) => {
      const isSelected = index === selectedIndex;
      return (
        <View style={styles.itemContainer}>
          <SizeValueText
            value={item}
            baseStyle={[
              styles.itemText,
              isSelected && styles.itemTextSelected,
            ]}
            fractionStyle={[
              styles.itemFractionText,
              isSelected && styles.itemFractionTextSelected,
            ]}
          />
        </View>
      );
    },
    [selectedIndex, styles]
  );

  return (
    <View style={[styles.column, { width }]}>
      <FlatList
        ref={columnRef}
        data={items}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        snapToInterval={ROW_HEIGHT_MAPPING}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        scrollsToTop={false}
        getItemLayout={(_, index) => ({
          length: ROW_HEIGHT_MAPPING,
          offset: ROW_HEIGHT_MAPPING * index,
          index,
        })}
        // Use header/footer instead of contentContainerStyle paddingVertical.
        // On iOS, dynamic paddingVertical in contentContainerStyle corrupts
        // scroll metrics after layout changes, causing shake/lock bugs.
        ListHeaderComponent={<PaddingView height={verticalPadding} />}
        ListFooterComponent={<PaddingView height={verticalPadding} />}
        onMomentumScrollEnd={handleMomentumScrollEnd}
      />
    </View>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>) =>
  StyleSheet.create({
    column: {
      flex: 1,
    },
    itemContainer: {
      height: ROW_HEIGHT_MAPPING,
      justifyContent: "center",
      alignItems: "center",
    },
    itemText: {
      fontSize: 12,
      fontWeight: "400",
      color: theme.colors.textSecondary,
      textAlign: "center",
    },
    itemTextSelected: {
      fontSize: 16,
      fontWeight: "700",
      color: theme.colors.text,
      textAlign: "center",
    },
    itemFractionText: {
      fontSize: 9,
      fontWeight: "600",
      color: theme.colors.textSecondary,
    },
    itemFractionTextSelected: {
      fontSize: 11,
      fontWeight: "700",
      color: theme.colors.text,
    },
  });