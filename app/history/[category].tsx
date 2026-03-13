import { useFocusEffect } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useContext, useMemo } from "react";
import { View } from "react-native";
import ConversionHistoryList from "../../components/ConversionHistoryList";
import useConversionHistoryStore from "../../src/store/useConversionHistoryStore";
import { useTheme } from "../../theme/ThemeProvider";
import { TitleContext } from "../_layout";

export default function CategoryHistoryScreen() {
  const { category } = useLocalSearchParams<{ category: string }>();
  const { setTitle } = useContext(TitleContext);
  const t = useTheme();
  const history = useConversionHistoryStore((state) => state.history);

  const filtered = useMemo(() => {
    return history.filter((item) => item.category === category);
  }, [history, category]);

  useFocusEffect(
    useCallback(() => {
      setTitle("History");
      return () => setTitle(undefined);
    }, [setTitle])
  );

  return (
    <View style={{ flex: 1, backgroundColor: t.colors.background }}>
      <ConversionHistoryList items={filtered} />
    </View>
  );
}
