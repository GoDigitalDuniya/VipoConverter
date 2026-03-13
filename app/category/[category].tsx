import { useFocusEffect, useNavigation } from "@react-navigation/native";
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
  BackHandler,
  FlatList,
  LayoutChangeEvent,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import CategoryTopBar from "../../components/CategoryTopBar";
import FavoriteToast from "../../components/FavoriteToast";
import NumberPad from "../../components/NumberPad";
import SimpleToast from "../../components/SimpleToast";
import UnitRow from "../../components/UnitRow";
import { ROW_HEIGHT } from "../../src/constants/layout";
import { CATEGORY_REGISTRY } from "../../src/conversion/registry/categoryRegistry";
import { useConversionValues } from "../../src/hooks/useConversionValues";
import { useNumberPad } from "../../src/hooks/useNumberPad";
import { useUnitSelection } from "../../src/hooks/useUnitSelection";
import { useWheelScroll } from "../../src/hooks/useWheelScroll";
import useCalculatorStore from "../../src/store/useCalculatorStore";
import useConversionHistoryStore from "../../src/store/useConversionHistoryStore";
import useHistoryRestoreStore from "../../src/store/useHistoryRestoreStore";
import useUnitSearchStore from "../../src/store/useUnitSearchStore";
import { Unit } from "../../src/types/unit";
import { prettyName } from "../../src/utils/stringUtils";
import useUnitFavoritesStore from "../../store/useUnitFavoritesStore";
import { useTheme } from "../../theme/ThemeProvider";
import { TitleContext } from "../_layout";

function startOfDay(timestamp: number): number {
  const d = new Date(timestamp);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

function isToday(timestamp: number): boolean {
  return startOfDay(timestamp) === startOfDay(Date.now());
}

const HISTORY_TYPING_DEBOUNCE_MS = 450;

export default function CategoryScreen() {
  const { category } = useLocalSearchParams<{ category: string }>();
  const categoryKey = category || "data";
  const display = prettyName(category);
  const { setTitle } = useContext(TitleContext);
  const navigation = useNavigation();
  const theme = useTheme();
  const calculatorValue = useCalculatorStore((state) => state.value);
  const addHistory = useConversionHistoryStore((state) => state.addHistory);
  const pendingRestore = useHistoryRestoreStore((state) => state.pendingRestore);
  const clearPendingRestore = useHistoryRestoreStore((state) => state.clearPendingRestore);
  const lastHistorySignatureRef = useRef<string | null>(null);
  const didInitHistoryRef = useRef(false);
  const restoreInProgressRef = useRef(false);
  const shouldDebounceHistoryRef = useRef(false);
  const typingHistoryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const restoreTargetRef = useRef<
    { inputValue: string; inputUnitKey: string; outputUnitKey: string } | null
  >(null);

  const unitFavorites = useUnitFavoritesStore((state) => state.unitFavorites);
  const favoritesFilterEnabled = useUnitFavoritesStore((state) => state.favoritesFilterEnabled);
  const toggleFavoritesFilter = useUnitFavoritesStore((state) => state.toggleFavoritesFilter);
  const toggleUnitFavorite = useUnitFavoritesStore((state) => state.toggleUnitFavorite);
  const leftSearch = useUnitSearchStore((state) => state.leftSearch);
  const rightSearch = useUnitSearchStore((state) => state.rightSearch);
  const clearLeftSearch = useUnitSearchStore((state) => state.clearLeftSearch);
  const clearRightSearch = useUnitSearchStore((state) => state.clearRightSearch);

  const [containerHeight, setContainerHeight] = useState(0);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastUnitName, setToastUnitName] = useState("");
  const [toastAction, setToastAction] = useState<"added" | "removed">("added");
  const [emptyFavoriteToastVisible, setEmptyFavoriteToastVisible] = useState(false);

  useEffect(() => {
    setTitle(display);
    return () => setTitle(undefined);
  }, [display]);

  const styles = createStyles(theme);

  /* ---------------- Units ---------------- */

  const categoryUnits = useMemo(() => CATEGORY_REGISTRY[categoryKey], [categoryKey]);
  const UNITS: Unit[] = categoryUnits ?? [];
  const isSupportedCategory = !!categoryUnits;

  const visibleUnits = useMemo(() => {
    if (!favoritesFilterEnabled) return UNITS;
    const filtered = UNITS.filter((u) => unitFavorites.includes(u.key));
    return filtered.length > 0 ? filtered : UNITS;
  }, [UNITS, favoritesFilterEnabled, unitFavorites]);

  const matchesSearch = useCallback((unit: Unit, query: string) => {
    if (!query) return true;

    const q = query.toLowerCase();
    const displayName = (unit.name ?? unit.key).toLowerCase();

    return (
      unit.label.toLowerCase().includes(q) ||
      displayName.includes(q)
    );
  }, []);

  const leftUnits = useMemo(() => {
    return visibleUnits.filter((u) => matchesSearch(u, leftSearch));
  }, [visibleUnits, leftSearch, matchesSearch]);

  const rightUnits = useMemo(() => {
    return visibleUnits.filter((u) => matchesSearch(u, rightSearch));
  }, [visibleUnits, rightSearch, matchesSearch]);

  const {
    inputUnit,
    outputUnit,
    setInputUnit,
    setOutputUnit,
  } = useUnitSelection({
    visibleUnits,
    favoritesFilterEnabled,
  });

  const {
    leftRef,
    rightRef,
    handleScrollEndLeft,
    handleScrollEndRight,
    recenterSelectedUnits,
    swapUnits,
  } = useWheelScroll({
    visibleUnitsLeft: leftUnits,
    visibleUnitsRight: rightUnits,
    inputUnit,
    outputUnit,
    setInputUnit,
    setOutputUnit,
    favoritesFilterEnabled,
  });

  useEffect(() => {
    return () => {
      clearLeftSearch();
      clearRightSearch();
    };
  }, [clearLeftSearch, clearRightSearch]);

  const {
    inputValue,
    setInputValue,
    isNumberPadVisible,
    showNumberPad,
    hideNumberPad,
    handleNumberPadKeyPress: rawHandleNumberPadKeyPress,
  } = useNumberPad({
    onSwapUnits: swapUnits,
  });

  const handleNumberPadKeyPress = useCallback(
    (key: string) => {
      const isTypingKey = key === "clear" || key === "delete" || key === "." || /^\d+$/.test(key);
      shouldDebounceHistoryRef.current = isTypingKey;
      rawHandleNumberPadKeyPress(key);
    },
    [rawHandleNumberPadKeyPress]
  );

  useEffect(() => {
    if (calculatorValue) {
      setInputValue(calculatorValue);
    }
  }, [calculatorValue, setInputValue]);

  useEffect(() => {
    if (!pendingRestore) return;

    const currentCategory = category || "data";
    if (pendingRestore.category !== currentCategory) return;

    const shouldSkipRestoreLog = isToday(pendingRestore.timestamp);
    if (shouldSkipRestoreLog) {
      restoreInProgressRef.current = true;
      restoreTargetRef.current = {
        inputValue: pendingRestore.inputValue || "0",
        inputUnitKey: pendingRestore.inputUnitKey,
        outputUnitKey: pendingRestore.outputUnitKey,
      };
    } else {
      restoreInProgressRef.current = false;
      restoreTargetRef.current = null;
    }

    setInputValue(pendingRestore.inputValue || "0");
    setInputUnit(pendingRestore.inputUnitKey);
    setOutputUnit(pendingRestore.outputUnitKey);
    clearPendingRestore();
  }, [
    category,
    clearPendingRestore,
    pendingRestore,
    setInputUnit,
    setInputValue,
    setOutputUnit,
  ]);

  // Recenter lists when container height or NumberPad visibility changes
  useEffect(() => {
    if (containerHeight <= 0 || (leftUnits.length === 0 && rightUnits.length === 0)) return;

    const handle = requestAnimationFrame(() => {
      recenterSelectedUnits(false);
    });
    return () => cancelAnimationFrame(handle);
  }, [containerHeight, isNumberPadVisible, recenterSelectedUnits, leftUnits.length, rightUnits.length]);

  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          if (!isNumberPadVisible) return false;
          hideNumberPad();
          return true;
        }
      );

      return () => subscription.remove();
    }, [hideNumberPad, isNumberPadVisible])
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (event) => {
      if (!isNumberPadVisible) return;
      event.preventDefault();
      hideNumberPad();
    });

    return unsubscribe;
  }, [hideNumberPad, isNumberPadVisible, navigation]);

  /* ---------------- Conversion ---------------- */

  const convertedValues = useConversionValues({
    category: categoryKey,
    inputValue,
    inputUnit,
    units: UNITS,
  });

  useEffect(() => {
    return () => {
      if (typingHistoryTimeoutRef.current) {
        clearTimeout(typingHistoryTimeoutRef.current);
        typingHistoryTimeoutRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const inputUnitDef = UNITS.find((unit) => unit.key === inputUnit);
    const outputUnitDef = UNITS.find((unit) => unit.key === outputUnit);
    if (!inputUnitDef || !outputUnitDef) return;

    const outputValue = convertedValues[outputUnit] ?? "0";
    const signature = `${category}|${inputValue}|${inputUnit}|${outputUnit}|${outputValue}`;

    if (!didInitHistoryRef.current) {
      didInitHistoryRef.current = true;
      lastHistorySignatureRef.current = signature;
      return;
    }

    if (signature === lastHistorySignatureRef.current) return;

    if (!inputValue || Number(inputValue) === 0) {
      lastHistorySignatureRef.current = signature;
      return;
    }

    if (!Number.isFinite(Number(outputValue))) {
      lastHistorySignatureRef.current = signature;
      return;
    }

    if (restoreInProgressRef.current) {
      const target = restoreTargetRef.current;
      const atRestoreTarget =
        !!target &&
        target.inputValue === inputValue &&
        target.inputUnitKey === inputUnit &&
        target.outputUnitKey === outputUnit;

      lastHistorySignatureRef.current = signature;

      if (atRestoreTarget) {
        restoreInProgressRef.current = false;
        restoreTargetRef.current = null;
      }

      return;
    }

    lastHistorySignatureRef.current = signature;

    const createHistoryEntry = () =>
      addHistory({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
      category: category || "data",
      inputValue,
      inputUnitKey: inputUnit,
      inputUnitLabel: inputUnitDef.label,
      outputValue,
      outputUnitKey: outputUnit,
      outputUnitLabel: outputUnitDef.label,
      timestamp: Date.now(),
    });

    if (typingHistoryTimeoutRef.current) {
      clearTimeout(typingHistoryTimeoutRef.current);
      typingHistoryTimeoutRef.current = null;
    }

    if (shouldDebounceHistoryRef.current) {
      typingHistoryTimeoutRef.current = setTimeout(() => {
        // Skip stale log attempts when input changed again during debounce.
        if (lastHistorySignatureRef.current !== signature) return;
        createHistoryEntry();
        shouldDebounceHistoryRef.current = false;
      }, HISTORY_TYPING_DEBOUNCE_MS);
      return;
    }

    createHistoryEntry();
  }, [
    UNITS,
    addHistory,
    category,
    convertedValues,
    inputUnit,
    inputValue,
    outputUnit,
  ]);

  /* ---------------- Center Padding ---------------- */

  const verticalPadding =
    containerHeight > 0
      ? containerHeight / 2 - ROW_HEIGHT / 2
      : 0;

  /* ---------------- Render ---------------- */

  const handleToggleUnitFavorite = useCallback(
    (itemKey: string) => {
      const wasFavorite = unitFavorites.includes(itemKey);
      const unit = UNITS.find((entry) => entry.key === itemKey);
      toggleUnitFavorite(itemKey);
      setToastUnitName(unit?.label ?? itemKey);
      setToastAction(wasFavorite ? "removed" : "added");
      setToastVisible(true);
    },
    [UNITS, toggleUnitFavorite, unitFavorites]
  );

  const handleFavoritesFilterPress = useCallback(() => {
    if (!favoritesFilterEnabled && unitFavorites.length === 0) {
      setEmptyFavoriteToastVisible(true);
      return;
    }

    toggleFavoritesFilter();
  }, [favoritesFilterEnabled, toggleFavoritesFilter, unitFavorites.length]);

  const renderLeft = useCallback(
    ({ item }: ListRenderItemInfo<Unit>) => (
      <UnitRow
        item={{
          key: item.key,
          shortLabel: item.label,
          name: item.label,
          value: item.key === inputUnit ? inputValue : 0,
          isFavorite: unitFavorites.includes(item.key),
        }}
        selected={item.key === inputUnit}
        showStar
        isLeftColumn
        onValuePress={showNumberPad}
        onStarPress={handleToggleUnitFavorite}
      />
    ),
    [handleToggleUnitFavorite, inputUnit, inputValue, showNumberPad, unitFavorites]
  );

  const renderRight = useCallback(
    ({ item }: ListRenderItemInfo<Unit>) => (
      <UnitRow
        item={{
          key: item.key,
          shortLabel: item.label,
          name: item.label,
          value: convertedValues[item.key],
          isFavorite: unitFavorites.includes(item.key),
        }}
        selected={item.key === outputUnit}
        isLeftColumn={false}
      />
    ),
    [outputUnit, convertedValues, unitFavorites]
  );

  return (
    <View style={styles.container}>
      <CategoryTopBar onFavoritesPress={handleFavoritesFilterPress} />

      {!isSupportedCategory && (
        <View style={styles.unsupportedContainer}>
          <Text style={styles.unsupportedText}>
            This converter will be available in a future update.
          </Text>
        </View>
      )}

      {isSupportedCategory && (
      <>

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
          data={leftUnits}
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
          data={rightUnits}
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

      {isNumberPadVisible && (
        <NumberPad onKeyPress={handleNumberPadKeyPress} inputValue={inputValue} />
      )}

      {!isNumberPadVisible && (
        <TouchableOpacity
          style={styles.keyboardButton}
          onPress={showNumberPad}
        >
          <Text style={styles.keyboardText}>Show Keyboard</Text>
        </TouchableOpacity>
      )}
      </>
      )}

      <FavoriteToast
        visible={toastVisible}
        categoryName={toastUnitName}
        action={toastAction}
        onDismiss={() => setToastVisible(false)}
      />
      <SimpleToast
        visible={emptyFavoriteToastVisible}
        message="You haven't starred any units yet."
        onDismiss={() => setEmptyFavoriteToastVisible(false)}
      />
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
      bottom: 0,
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
    unsupportedContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 24,
    },
    unsupportedText: {
      color: theme.colors.textSecondary,
      fontSize: 16,
      textAlign: "center",
    },
  });