import { useLocalSearchParams } from "expo-router";
import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import {
    FlatList,
    LayoutChangeEvent,
    ListRenderItemInfo,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import CategoryTopBar from "../../components/CategoryTopBar";
import UnitRow from "../../components/UnitRow";
import { useTheme } from "../../theme/ThemeProvider";
import { TitleContext } from "../_layout";

const ROW_HEIGHT = 72;

function prettyName(key?: string) {
  if (!key) return "";
  return key
    .replace(/[-_]/g, " ")
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}

export default function CategoryScreen() {
  const { category } = useLocalSearchParams<{ category: string }>();
  const display = prettyName(category);
  const { setTitle } = useContext(TitleContext);
  const theme = useTheme();

  const leftRef = useRef<FlatList>(null);
  const rightRef = useRef<FlatList>(null);
  const inputRef = useRef<TextInput>(null);

  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    setTitle(display);
    return () => setTitle(undefined);
  }, [display]);
  
  const styles = createStyles(theme);

  /* ---------------- Units ---------------- */

  const UNITS = useMemo(
    () => [
      { key: "bit", short: "Bit", multiplier: 1 },
      { key: "byte", short: "Byte", multiplier: 8 },
      { key: "kbit", short: "Kbit", multiplier: 1000 },
      { key: "kbyte", short: "KB", multiplier: 8000 },
      { key: "mbit", short: "Mbit", multiplier: 1000000 },
      { key: "mbyte", short: "MB", multiplier: 8000000 },
      { key: "gbit", short: "Gbit", multiplier: 1000000000 },
      { key: "gbyte", short: "GB", multiplier: 8000000000 },
    ],
    []
  );

  const [inputValue, setInputValue] = useState("0");
  const [inputUnit, setInputUnit] = useState("bit");
  const [outputUnit, setOutputUnit] = useState("bit");

  /* ---------------- Conversion ---------------- */

  const convert = useCallback(
    (value: string, fromKey: string, toKey: string) => {
      const from = UNITS.find((u) => u.key === fromKey);
      const to = UNITS.find((u) => u.key === toKey);
      if (!from || !to) return "0";

      const num = parseFloat(value || "0");
      const base = num * from.multiplier;
      const result = base / to.multiplier;
      return Number.isFinite(result) ? result.toString() : "0";
    },
    [UNITS]
  );

  const convertedValues = useMemo(() => {
    return UNITS.reduce((acc: any, unit) => {
      acc[unit.key] = convert(inputValue, inputUnit, unit.key);
      return acc;
    }, {});
  }, [inputValue, inputUnit, convert]);

  /* ---------------- Center Padding ---------------- */

  const verticalPadding =
    containerHeight > 0
      ? containerHeight / 2 - ROW_HEIGHT / 2
      : 0;

  /* ---------------- Scroll Handling ---------------- */

  const handleScrollEndLeft = (e: any) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ROW_HEIGHT);
    const clampedIndex = Math.max(0, Math.min(index, UNITS.length - 1));
    setInputUnit(UNITS[clampedIndex].key);

    leftRef.current?.scrollToOffset({
      offset: clampedIndex * ROW_HEIGHT,
      animated: true,
    });
  };

  const handleScrollEndRight = (e: any) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ROW_HEIGHT);
    const clampedIndex = Math.max(0, Math.min(index, UNITS.length - 1));
    setOutputUnit(UNITS[clampedIndex].key);

    rightRef.current?.scrollToOffset({
      offset: clampedIndex * ROW_HEIGHT,
      animated: true,
    });
  };

  /* ---------------- Render ---------------- */

  const renderLeft = useCallback(
    ({ item }: ListRenderItemInfo<any>) => (
      <UnitRow
        item={{
          key: item.key,
          shortLabel: item.short,
          name: item.short,
          value: item.key === inputUnit ? inputValue : 0,
        }}
        selected={item.key === inputUnit}
        showStar
        isLeftColumn
        onValuePress={() => {
          try {
            inputRef.current?.blur();
          } catch (e) {}
          setTimeout(() => {
            inputRef.current?.focus();
          }, 80);
        }}
      />
    ),
    [inputUnit, inputValue]
  );

  const renderRight = useCallback(
    ({ item }: ListRenderItemInfo<any>) => (
      <UnitRow
        item={{
          key: item.key,
          shortLabel: item.short,
          name: item.short,
          value: convertedValues[item.key],
        }}
        selected={item.key === outputUnit}
        isLeftColumn={false}
      />
    ),
    [outputUnit, convertedValues]
  );

  return (
    <View style={styles.container}>
      <CategoryTopBar />

      <View
        style={styles.columns}
        onLayout={(e: LayoutChangeEvent) =>
          setContainerHeight(e.nativeEvent.layout.height)
        }
      >
        {/* Center Focus Overlay */}
        <View style={styles.focusOverlay} pointerEvents="none" />

        <FlatList
          ref={leftRef}
          data={UNITS}
          keyExtractor={(i) => i.key}
          renderItem={renderLeft}
          getItemLayout={(_, index) => ({
            length: ROW_HEIGHT,
            offset: ROW_HEIGHT * index,
            index,
          })}
          contentContainerStyle={{
            paddingVertical: verticalPadding,
          }}
          snapToInterval={ROW_HEIGHT}
          decelerationRate="fast"
          onMomentumScrollEnd={handleScrollEndLeft}
          showsVerticalScrollIndicator={false}
        />

        <FlatList
          ref={rightRef}
          data={UNITS}
          keyExtractor={(i) => i.key}
          renderItem={renderRight}
          getItemLayout={(_, index) => ({
            length: ROW_HEIGHT,
            offset: ROW_HEIGHT * index,
            index,
          })}
          contentContainerStyle={{
            paddingVertical: verticalPadding,
          }}
          snapToInterval={ROW_HEIGHT}
          decelerationRate="fast"
          onMomentumScrollEnd={handleScrollEndRight}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <TextInput
        ref={inputRef}
        value={inputValue}
        onChangeText={setInputValue}
        keyboardType="numeric"
        style={{ position: "absolute", opacity: 0 }}
      />

      <TouchableOpacity
        style={styles.keyboardButton}
        onPress={() => {
          // Ensure a reliable toggle: blur first then focus after a short delay
          try {
            inputRef.current?.blur();
          } catch (e) {}
          setTimeout(() => {
            inputRef.current?.focus();
          }, 80);
        }}
      >
        <Text style={styles.keyboardText}>Show Keyboard</Text>
      </TouchableOpacity>
    </View>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    columns: {
      flex: 1,
      flexDirection: "row",
      position: "relative",
    },
    focusOverlay: {
      position: "absolute",
      left: 0,
      right: 0,
      top: "50%",
      height: ROW_HEIGHT,
      marginTop: -ROW_HEIGHT / 2,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.primary + "10",
      zIndex: 10,
    },
    keyboardButton: {
      position: "absolute",
      bottom: 20,
      alignSelf: "center",
      backgroundColor: theme.colors.surface,
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 12,
      elevation: 4,
    },
    keyboardText: {
      color: theme.colors.primary,
      fontWeight: "600",
    },
  });
