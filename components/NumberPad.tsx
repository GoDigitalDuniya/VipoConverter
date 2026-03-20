import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect } from "react";
import { BackHandler, Pressable, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import useCalculatorStore from "../src/store/useCalculatorStore";
import { useTheme } from "../theme/ThemeProvider";

type NumberPadKey = {
  value: string;
  label?: string;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  variant?: "default" | "swap" | "clear" | "delete";
};

type NumberPadProps = {
  onKeyPress: (key: string) => void;
  inputValue?: string;
  isVisible: boolean;
  onShowKeyboard: () => void;
  onHideKeyboard: () => void;
  hiddenKeys?: string[];
  navigateBackOnHardwareBack?: boolean; // default false
};

const KEYS: NumberPadKey[] = [
  { value: "7", label: "7" },
  { value: "8", label: "8" },
  { value: "9", label: "9" },
  { value: "swap", icon: "swap-horizontal", variant: "swap" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "calc", icon: "calculator", variant: "default" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "clear", label: "Clear", variant: "clear" },
  { value: "0", label: "0" },
  { value: "00", label: "00" },
  { value: ".", label: "." },
  { value: "delete", icon: "backspace", variant: "delete" },
];

export default function NumberPad({
  onKeyPress,
  inputValue = "0",
  isVisible,
  onShowKeyboard,
  onHideKeyboard,
  hiddenKeys = [],
  navigateBackOnHardwareBack = false,
}: NumberPadProps) {
  const theme = useTheme();
  const router = useRouter();
  const navigation = useNavigation();
  const setCalculatorValue = useCalculatorStore((state) => state.setValue);
  const { height: screenHeight } = useWindowDimensions();

  const padHeight = Math.round(
    Math.min(
      Math.max(screenHeight * 0.32, 240),
      screenHeight * 0.6
    )
  );

  const styles = createStyles(theme, padHeight);

  // When pad is visible, hardware back button closes it instead of navigating back
  useFocusEffect(
    useCallback(() => {
      if (!isVisible) return;
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          if (navigateBackOnHardwareBack) {
            return false; // do not consume — allow navigator to handle back
          }
          onHideKeyboard();
          return true; // consume the event — close pad instead of navigating
        }
      );
      return () => subscription.remove();
    }, [isVisible, onHideKeyboard, navigateBackOnHardwareBack])
  );

  // When pad is visible, intercept navigation gestures/button and close pad first
  useEffect(() => {
    if (!isVisible) return;
    const unsubscribe = navigation.addListener("beforeRemove", (event) => {
      if (navigateBackOnHardwareBack) {
        // Allow normal navigation when this prop is enabled.
        return;
      }
      event.preventDefault();
      onHideKeyboard();
    });
    return unsubscribe;
  }, [isVisible, navigation, onHideKeyboard, navigateBackOnHardwareBack]);

  if (!isVisible) {
    return (
      <TouchableOpacity
        style={styles.keyboardButton}
        onPress={onShowKeyboard}
      >
        <Text style={styles.keyboardText}>Show Keyboard</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {KEYS.map((key) => {
          const isHidden = hiddenKeys.includes(key.value);

          // Hidden keys render as an empty cell occupying the same grid space.
          // This preserves layout — no reflow, no position shift of other keys.
          if (isHidden) {
            return (
              <View
                key={key.value}
                style={styles.key}
              >
                <View style={[styles.keyFace, styles.keyFaceHidden]} />
              </View>
            );
          }

          const iconColor =
            key.variant === "swap"
              ? stylesTokens.swapColor
              : key.variant === "delete"
              ? stylesTokens.deleteColor
              : theme.colors.keyText;

          return (
            <Pressable
              key={key.value}
              onPress={() => {
                if (key.value === "calc") {
                  setCalculatorValue(inputValue || "0");
                  router.push("/calculator");
                  return;
                }

                onKeyPress(key.value);
              }}
              android_ripple={{ color: "#00000014" }}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              style={({ pressed }) => [styles.key, pressed && styles.keyPressed]}
            >
              <View style={styles.keyFace}>
                {key.icon ? (
                  <MaterialCommunityIcons name={key.icon} size={36} color={iconColor} />
                ) : (
                  <Text
                    style={[
                      styles.keyText,
                      key.variant === "clear" && styles.clearText,
                      key.value === "00" && styles.doubleZeroText,
                    ]}
                  >
                    {key.label}
                  </Text>
                )}
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const stylesTokens = {
  swapColor: "#8dc63f",
  deleteColor: "#8dc63f",
};

const createStyles = (theme: ReturnType<typeof useTheme>, padHeight: number) =>
  StyleSheet.create({
    container: {
      height: padHeight,
      padding: 10,
      backgroundColor: theme.colors.padBackground,
    },
    grid: {
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap",
      marginHorizontal: -5,
      marginVertical: -5,
    },
    key: {
      width: "25%",
      height: "25%",
      minHeight: 56,
      minWidth: 56,
      padding: 5,
    },
    keyPressed: {
      opacity: 0.8,
    },
    keyFace: {
      flex: 1,
      backgroundColor: theme.colors.keyBackground,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    },
    keyFaceHidden: {
      backgroundColor: theme.colors.keyBackground,
    },
    keyText: {
      textAlign: "center",
      fontSize: 30,
      lineHeight: 34,
      fontWeight: "500",
      color: theme.colors.keyText,
      includeFontPadding: false,
    },
    doubleZeroText: {
      fontSize: 26,
      fontWeight: "600",
    },
    clearText: {
      color: theme.colors.accentKey,
      fontSize: 24,
      fontWeight: "500",
    },
    keyboardButton: {
      position: "absolute",
      bottom: 0,
      alignSelf: "center",
      backgroundColor: theme.colors.background,
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 12,
      elevation: 4,
      minWidth: 160,
      alignItems: "center",
      justifyContent: "center",
    },
    keyboardText: {
      color: theme.colors.primary,
      fontWeight: "600",
    },
  });
