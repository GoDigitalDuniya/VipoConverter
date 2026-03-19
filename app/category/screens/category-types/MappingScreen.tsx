import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import {
  FlatList,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { clothingData } from "../../../../src/conversion/categories/clothingData";
import { shoeSizeData } from "../../../../src/conversion/categories/shoeSizeData";
import { useTheme } from "../../../../theme/ThemeProvider";
import { ROW_HEIGHT_MAPPING } from "./components/_constants";
import SizeChartUpperZone from "./components/SizeChartUpperZone";
import SizeChartWheelColumn from "./components/SizeChartWheelColumn";
import {
  SelectionState,
  SizeCategory,
  SizeChartData,
  VirtualUnit,
  WheelEntry,
} from "./sizeChartTypes";
import { getWheelEntries } from "./sizeChartUtils";

interface MappingScreenProps {
  categoryKey: string;
}

const SHOE_SIZE_CATEGORY_TITLES: Record<string, string> = {
  men: "For Men",
  women: "For Women",
  youth: "For Youth (6-10 yrs)",
  kids: "For Kids (1-5 yrs)",
  infants: "For Infants (< 1 yr)",
};

const SHOE_SIZE_VIRTUAL_UNITS: VirtualUnit[] = [
  {
    key: "mondopoint",
    label: "Mondopoint",
    getValue: (row) => {
      const cm = parseFloat(row["cm"] ?? "");
      if (!Number.isFinite(cm) || cm <= 0) return "—";
      return String(Math.round(cm * 10));
    },
  },
];

export default function MappingScreen({ categoryKey }: MappingScreenProps) {
  const theme = useTheme();
  const styles = createStyles(theme);

  const data: SizeChartData | null = useMemo(() => {
    if (categoryKey === "clothing") return clothingData;
    if (categoryKey === "shoe-size") return shoeSizeData;
    return null;
  }, [categoryKey]);

  const [selection, setSelection] = useState<SelectionState>({
    categoryIndex: 0,
    unitIndex: 0,
    wheelIndex: 0,
  });

  const [lowerZoneHeight, setLowerZoneHeight] = useState(0);

  // Column refs for programmatic scroll
  const categoryColumnRef = useRef<FlatList<string> | null>(null);
  const unitColumnRef = useRef<FlatList<string> | null>(null);
  const valueColumnRef = useRef<FlatList<string> | null>(null);

  // Tracks whether the last selection change was a programmatic cascade.
  // Only cascade changes should trigger programmatic scroll on all columns.
  // Normal user wheel scrolls must NOT trigger programmatic scroll — on iOS
  // this would fight the gesture and cause the shake/lock bug.
  const isCascadeRef = useRef(false);
  const cascadeSourceRef = useRef<"category" | "unit" | "value" | null>(null);
  const isScrollSettlingRef = useRef(false); // ← add — blocks programmatic scroll during iOS settle
  const settleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (!data) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <Text style={styles.unsupportedText}>
          This size chart is not available.
        </Text>
      </View>
    );
  }

  const category: SizeCategory = data.categories[selection.categoryIndex];
  const selectedUnit = category.units[selection.unitIndex];
  const row = category.rows[selection.wheelIndex];

  const wheelEntries: WheelEntry[] = useMemo(
    () => getWheelEntries(category, selectedUnit.key),
    [category, selectedUnit]
  );

  /**
   * When categoryIndex changes: find the matching unit in the new category.
   * If not found, reset to unitIndex 0.
   * Then derive wheelEntries and check if current wheelEntry exists.
   * If not, reset wheelIndex to 0.
   */
  const handleCategoryChange = useCallback(
    (newCategoryIndex: number) => {
      const newCategory = data.categories[newCategoryIndex];
      const currentUnitKey = category.units[selection.unitIndex].key;

      // Check if current unit exists in new category
      let newUnitIndex = newCategory.units.findIndex(
        (u) => u.key === currentUnitKey
      );
      if (newUnitIndex === -1) {
        newUnitIndex = 0;
      }

      // Derive wheel entries for the resolved unit
      const newWheelEntries = getWheelEntries(
        newCategory,
        newCategory.units[newUnitIndex].key
      );

      // Check if current display value exists in new wheel entries
      const currentWheelEntry = wheelEntries[selection.wheelIndex];
      let newWheelIndex = 0;
      if (currentWheelEntry && newWheelEntries.length > 0) {
        const index = newWheelEntries.findIndex(
          (e) => e.displayValue === currentWheelEntry.displayValue
        );
        if (index !== -1) {
          newWheelIndex = index;
        }
      }

      if (settleTimeoutRef.current) clearTimeout(settleTimeoutRef.current);
      isScrollSettlingRef.current = true;
      settleTimeoutRef.current = setTimeout(() => {
        isScrollSettlingRef.current = false;
      }, 150);

      isCascadeRef.current = true;
      cascadeSourceRef.current = "category";
      setSelection({
        categoryIndex: newCategoryIndex,
        unitIndex: newUnitIndex,
        wheelIndex: newWheelIndex,
      });
    },
    [data, category, selection, wheelEntries]
  );

  /**
   * When unitIndex changes: derive new wheelEntries.
   * If current wheel entry exists in new entries, keep wheelIndex.
   * Otherwise, reset wheelIndex to 0.
   */
  const handleUnitChange = useCallback(
    (newUnitIndex: number) => {
      const newUnit = category.units[newUnitIndex];
      const newWheelEntries = getWheelEntries(category, newUnit.key);

      let newWheelIndex = 0;
      const currentWheelEntry = wheelEntries[selection.wheelIndex];
      if (currentWheelEntry && newWheelEntries.length > 0) {
        const index = newWheelEntries.findIndex(
          (e) => e.displayValue === currentWheelEntry.displayValue
        );
        if (index !== -1) {
          newWheelIndex = index;
        }
      }
      
      if (settleTimeoutRef.current) clearTimeout(settleTimeoutRef.current);
      isScrollSettlingRef.current = true;
      settleTimeoutRef.current = setTimeout(() => {
        isScrollSettlingRef.current = false;
      }, 150);

      isCascadeRef.current = true;
      cascadeSourceRef.current = "unit";
      setSelection((prev) => ({
        ...prev,
        unitIndex: newUnitIndex,
        wheelIndex: newWheelIndex,
      }));
    },
    [category, selection, wheelEntries]
  );

  /**
   * When wheel value changes: simply update wheelIndex.
   */
  const handleWheelChange = useCallback((newWheelIndex: number) => {
    setSelection((prev) => ({
      ...prev,
      wheelIndex: newWheelIndex,
    }));
  }, []);

  useEffect(() => {
    if (!isCascadeRef.current) return;
    isCascadeRef.current = false;

    const source = cascadeSourceRef.current;
    cascadeSourceRef.current = null;

    // Delay programmatic scroll until after iOS scroll responder has settled.
    // Using two rAF frames gives iOS enough time to release the gesture context.
    const handle = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (isScrollSettlingRef.current) return; // still settling — skip

        if (source !== "category") {
          categoryColumnRef.current?.scrollToOffset({
            offset: selection.categoryIndex * ROW_HEIGHT_MAPPING,
            animated: false,
          });
        }
        if (source !== "unit") {
          unitColumnRef.current?.scrollToOffset({
            offset: selection.unitIndex * ROW_HEIGHT_MAPPING,
            animated: false,
          });
        }
        if (source !== "value") {
          valueColumnRef.current?.scrollToOffset({
            offset: selection.wheelIndex * ROW_HEIGHT_MAPPING,
            animated: false,
          });
        }
      });
    });
    return () => cancelAnimationFrame(handle);
  }, [selection]);
  
  useEffect(() => {
    return () => {
      if (settleTimeoutRef.current) {
        clearTimeout(settleTimeoutRef.current);
      }
    };
  }, []);

  const verticalPadding =
    lowerZoneHeight > 0 ? lowerZoneHeight / 2 - ROW_HEIGHT_MAPPING / 2 : 0;

  const categoryLabels = useMemo(
    () => data.categories.map((cat) => cat.label),
    [data]
  );

  const unitLabels = useMemo(
    () => category.units.map((u) => u.label),
    [category]
  );

  const valueLabels = useMemo(
    () => wheelEntries.map((e) => e.displayValue),
    [wheelEntries]
  );

  // Empty state guard
  const isEmptyWheelEntries = wheelEntries.length === 0;
  const isShoeSize = data?.key === "shoe-size";

  const categoryTitle = isShoeSize
    ? SHOE_SIZE_CATEGORY_TITLES[category?.key ?? ""] ?? undefined
    : undefined;

  const virtualUnits = isShoeSize ? SHOE_SIZE_VIRTUAL_UNITS : undefined;

  return (
    <View style={styles.container}>
      {/* Upper Zone: Result Display */}
      <SizeChartUpperZone
        category={category}
        units={category.units}
        selectedUnitKey={selectedUnit.key}
        row={row}
        categoryTitle={categoryTitle}
        virtualUnits={virtualUnits}
      />

      {/* Lower Zone: Wheel Columns */}
      <View
        style={styles.lowerZone}
        onLayout={(e: LayoutChangeEvent) =>
          setLowerZoneHeight(e.nativeEvent.layout.height)
        }
      >
        {/* Focus Overlay */}
        <View style={styles.focusOverlay} pointerEvents="none" />

        {/* Category Column */}
        <SizeChartWheelColumn
          items={categoryLabels}
          selectedIndex={selection.categoryIndex}
          onScrollEnd={handleCategoryChange}
          verticalPadding={verticalPadding}
          columnRef={categoryColumnRef}
          width="35%"
        />

        {/* Unit Column */}
        <SizeChartWheelColumn
          items={unitLabels}
          selectedIndex={selection.unitIndex}
          onScrollEnd={handleUnitChange}
          verticalPadding={verticalPadding}
          columnRef={unitColumnRef}
          width="30%"
        />

        {/* Value Column */}
        {!isEmptyWheelEntries && (
          <SizeChartWheelColumn
            items={valueLabels}
            selectedIndex={selection.wheelIndex}
            onScrollEnd={handleWheelChange}
            verticalPadding={verticalPadding}
            columnRef={valueColumnRef}
            width="35%"
          />
        )}

        {/* Empty State for Value Column */}
        {isEmptyWheelEntries && (
          <View style={[styles.valueColumnEmpty, { width: "35%" }]}>
            <Text style={styles.emptyStateText}>No values</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    lowerZone: {
      flex: 0.4,
      flexDirection: "row",
      position: "relative",
      overflow: "hidden",
    },
    focusOverlay: {
      position: "absolute",
      left: 0,
      right: 0,
      top: "50%",
      height: ROW_HEIGHT_MAPPING,
      marginTop: -ROW_HEIGHT_MAPPING / 2,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.primary + "18",
      zIndex: 10,
      pointerEvents: "none",
    },
    valueColumnEmpty: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    emptyStateText: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      fontWeight: "400",
    },
    unsupportedText: {
      fontSize: 16,
      color: theme.colors.textSecondary,
      textAlign: "center",
      paddingHorizontal: 24,
    },
  });
