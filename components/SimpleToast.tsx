import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../theme/ThemeProvider";

type Props = {
  visible: boolean;
  message: string;
  onDismiss?: () => void;
  durationMs?: number;
};

export default function SimpleToast({
  visible,
  message,
  onDismiss,
  durationMs = 1400,
}: Props) {
  const t = useTheme();
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!visible) return;

    const fadeIn = Animated.timing(opacity, {
      toValue: 1,
      duration: 180,
      useNativeDriver: true,
    });

    const fadeOut = Animated.timing(opacity, {
      toValue: 0,
      duration: 180,
      useNativeDriver: true,
    });

    fadeIn.start();

    const timeout = setTimeout(() => {
      fadeOut.start(() => onDismiss?.());
    }, durationMs);

    return () => {
      clearTimeout(timeout);
    };
  }, [durationMs, onDismiss, opacity, visible]);

  if (!visible) return null;

  return (
    <View pointerEvents="none" style={styles.wrapper}>
      <Animated.View
        style={[
          styles.toast,
          {
            opacity,
            backgroundColor: t.colors.surface,
            borderColor: t.colors.border,
          },
        ]}
      >
        <Text style={[styles.message, { color: t.colors.text }]}>{message}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 100,
    alignItems: "center",
    zIndex: 1200,
  },
  toast: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    maxWidth: "90%",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  message: {
    fontSize: 13,
    textAlign: "center",
  },
});
