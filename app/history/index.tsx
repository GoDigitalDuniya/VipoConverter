import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useContext } from "react";
import { View } from "react-native";
import ConversionHistoryList from "../../components/ConversionHistoryList";
import useConversionHistoryStore from "../../src/store/useConversionHistoryStore";
import { useTheme } from "../../theme/ThemeProvider";
import { TitleContext } from "../_layout";

export default function GlobalHistoryScreen() {
  const { setTitle } = useContext(TitleContext);
  const t = useTheme();
  const history = useConversionHistoryStore((state) => state.history);

  useFocusEffect(
    useCallback(() => {
      setTitle("History");
      return () => setTitle(undefined);
    }, [setTitle])
  );

  return (
    <View style={{ flex: 1, backgroundColor: t.colors.background }}>
      <ConversionHistoryList items={history} />
    </View>
  );
}
