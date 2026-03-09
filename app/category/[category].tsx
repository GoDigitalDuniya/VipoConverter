import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
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
import NumberPad from "../../components/NumberPad";
import UnitRow from "../../components/UnitRow";
import { ROW_HEIGHT } from "../../src/constants/layout";
import { getUnitsForCategory } from "../../src/conversions/getUnitsForCategory";
import { useConversionValues } from "../../src/hooks/useConversionValues";
import { useNumberPad } from "../../src/hooks/useNumberPad";
import { useUnitSelection } from "../../src/hooks/useUnitSelection";
import { useWheelScroll } from "../../src/hooks/useWheelScroll";
import useUnitSearchStore from "../../src/store/useUnitSearchStore";
import { Unit } from "../../src/types/unit";
import { prettyName } from "../../src/utils/stringUtils";
import useUnitFavoritesStore from "../../store/useUnitFavoritesStore";
import { useTheme } from "../../theme/ThemeProvider";
import { TitleContext } from "../_layout";

export default function CategoryScreen() {
  const { category } = useLocalSearchParams<{ category: string }>();
  const display = prettyName(category);
  const { setTitle } = useContext(TitleContext);
  const navigation = useNavigation();
  const theme = useTheme();

  const unitFavorites = useUnitFavoritesStore((state) => state.unitFavorites);
  const favoritesFilterEnabled = useUnitFavoritesStore((state) => state.favoritesFilterEnabled);
  const toggleUnitFavorite = useUnitFavoritesStore((state) => state.toggleUnitFavorite);
  const leftSearch = useUnitSearchStore((state) => state.leftSearch);
  const rightSearch = useUnitSearchStore((state) => state.rightSearch);
  const clearLeftSearch = useUnitSearchStore((state) => state.clearLeftSearch);
  const clearRightSearch = useUnitSearchStore((state) => state.clearRightSearch);

  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    setTitle(display);
    return () => setTitle(undefined);
  }, [display]);

  const styles = createStyles(theme);

  /* ---------------- Units ---------------- */

  const UNITS = useMemo(() => getUnitsForCategory(category || "data"), [category]);

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
      unit.short.toLowerCase().includes(q) ||
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
    handleNumberPadKeyPress,
  } = useNumberPad({
    onSwapUnits: swapUnits,
  });

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
    inputValue,
    inputUnit,
    units: UNITS,
  });

  /* ---------------- Center Padding ---------------- */

  const verticalPadding =
    containerHeight > 0
      ? containerHeight / 2 - ROW_HEIGHT / 2
      : 0;

  /* ---------------- Render ---------------- */

  const renderLeft = useCallback(
    ({ item }: ListRenderItemInfo<Unit>) => (
      <UnitRow
        item={{
          key: item.key,
          shortLabel: item.short,
          name: item.short,
          value: item.key === inputUnit ? inputValue : 0,
          isFavorite: unitFavorites.includes(item.key),
        }}
        selected={item.key === inputUnit}
        showStar
        isLeftColumn
        onValuePress={showNumberPad}
        onStarPress={toggleUnitFavorite}
      />
    ),
    [inputUnit, inputValue, showNumberPad, toggleUnitFavorite, unitFavorites]
  );

  const renderRight = useCallback(
    ({ item }: ListRenderItemInfo<Unit>) => (
      <UnitRow
        item={{
          key: item.key,
          shortLabel: item.short,
          name: item.short,
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
        <NumberPad onKeyPress={handleNumberPadKeyPress} />
      )}

      {!isNumberPadVisible && (
        <TouchableOpacity
          style={styles.keyboardButton}
          onPress={showNumberPad}
        >
          <Text style={styles.keyboardText}>Show Keyboard</Text>
        </TouchableOpacity>
      )}
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
  });