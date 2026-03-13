import { MaterialCommunityIcons } from "@expo/vector-icons";
import { evaluate } from "mathjs/number";
import { useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import useCalculatorStore from "../../src/store/useCalculatorStore";
import { useTheme } from "../../theme/ThemeProvider";

type CalcKey = {
  value: string;
  label?: string;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  variant?: "default" | "clear" | "equal";
};

const KEYS: CalcKey[] = [
  { value: "+", label: "+" },
  { value: "-", label: "-" },
  { value: "*", label: "*" },
  { value: "+/-", label: "+/-" },
  { value: "7", label: "7" },
  { value: "8", label: "8" },
  { value: "9", label: "9" },
  { value: "/", label: "/" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "clear", label: "Clear", variant: "clear" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "delete", icon: "backspace", variant: "clear" },
  { value: "0", label: "0" },
  { value: "00", label: "00" },
  { value: ".", label: "." },
  { value: "=", label: "=", variant: "equal" },
];

const isOperator = (char: string) => ["+", "-", "*", "/"].includes(char);

const toDisplayResult = (value: unknown): string => {
  if (value === null || value === undefined) return "0";

  if (typeof value === "number") {
    if (!Number.isFinite(value)) return "0";
    return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(12)));
  }

  const next = String(value);
  return next.length > 0 ? next : "0";
};

const safeEvaluate = (expr: string): string => {
  if (!expr) return "0";

  try {
    const result = evaluate(expr);
    return toDisplayResult(result);
  } catch {
    return "0";
  }
};

export default function CalculatorScreen() {
  const theme = useTheme();
  const calculatorValue = useCalculatorStore((state) => state.value);
  const setCalculatorValue = useCalculatorStore((state) => state.setValue);

  const [expression, setExpression] = useState("");
  const [result, setResult] = useState(() =>
    calculatorValue && calculatorValue !== "0" ? calculatorValue : "0"
  );

  useEffect(() => {
    setCalculatorValue(result);
  }, [result, setCalculatorValue]);

  const styles = useMemo(() => createStyles(theme), [theme]);

  const updateResult = (nextExpression: string) => {
    const nextResult = safeEvaluate(nextExpression);
    setResult(nextResult);
  };

  const handleDigit = (key: string) => {
    const nextExpression = `${expression}${key}`;
    setExpression(nextExpression);
    updateResult(nextExpression);
  };

  const handleOperator = (operator: string) => {
    if (!expression) {
      const seed = result === "0" ? "" : result;
      const nextExpression = seed ? `${seed}${operator}` : "";
      setExpression(nextExpression);
      return;
    }

    const lastChar = expression[expression.length - 1];
    const nextExpression = isOperator(lastChar)
      ? `${expression.slice(0, -1)}${operator}`
      : `${expression}${operator}`;

    setExpression(nextExpression);
  };

  const handleToggleSign = () => {
    const nextResult = result.startsWith("-") ? result.slice(1) : `-${result}`;
    setResult(nextResult);
    setExpression(nextResult);
  };

  const handleDelete = () => {
    if (!expression) {
      setResult("0");
      return;
    }

    const nextExpression = expression.slice(0, -1);
    setExpression(nextExpression);
    updateResult(nextExpression);
  };

  const handleEqual = () => {
    const nextResult = safeEvaluate(expression || result);
    setResult(nextResult);
    setExpression(nextResult);
  };

  const handleClear = () => {
    setExpression("");
    setResult("0");
  };

  const handleKeyPress = (key: string) => {
    if (key === "clear") {
      handleClear();
      return;
    }

    if (key === "delete") {
      handleDelete();
      return;
    }

    if (key === "+/-") {
      handleToggleSign();
      return;
    }

    if (key === "=") {
      handleEqual();
      return;
    }

    if (["+", "-", "*", "/"].includes(key)) {
      handleOperator(key);
      return;
    }

    handleDigit(key);
  };

  return (
    <View style={styles.container}>
      <View style={styles.displayArea}>
        <Text numberOfLines={1} style={styles.expressionText}>
          {expression || " "}
        </Text>
        <Text numberOfLines={1} style={styles.resultText}>
          {result}
        </Text>
      </View>

      <View style={styles.keypad}>
        {KEYS.map((key) => {
          const keyTextStyle = [
            styles.keyText,
            key.variant === "clear" && styles.clearText,
            key.variant === "equal" && styles.equalText,
          ];

          return (
            <Pressable
              key={key.value}
              onPress={() => handleKeyPress(key.value)}
              android_ripple={{ color: "#00000014" }}
              style={({ pressed }) => [styles.key, pressed && styles.keyPressed]}
            >
              <View style={[styles.keyFace, key.variant === "equal" && styles.equalKeyFace]}>
                {key.icon ? (
                  <MaterialCommunityIcons
                    name={key.icon}
                    size={36}
                    color={theme.name === "dark" ? "#f5f5f5" : "#8f7c3c"}
                  />
                ) : (
                  <Text style={keyTextStyle}>{key.label}</Text>
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
  pageBgLight: "#d7dbe3",
  pageBgDark: "#2e3138",
  displayBgLight: "#e6e7ea",
  displayBgDark: "#3a3d45",
  keyBgLight: "#f4f4f4",
  keyBgDark: "#454851",
  equalBg: "#8dc63f",
  textLight: "#121212",
  textDark: "#f5f5f5",
  accent: "#8dc63f",
};

const createStyles = (theme: ReturnType<typeof useTheme>) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.name === "dark" ? stylesTokens.pageBgDark : stylesTokens.pageBgLight,
    },
    displayArea: {
      flex: 1,
      paddingHorizontal: 20,
      paddingVertical: 24,
      justifyContent: "space-between",
      backgroundColor: theme.name === "dark" ? stylesTokens.displayBgDark : stylesTokens.displayBgLight,
    },
    expressionText: {
      textAlign: "right",
      fontSize: 32,
      color: theme.name === "dark" ? stylesTokens.textDark : stylesTokens.textLight,
      opacity: 0.9,
    },
    resultText: {
      textAlign: "right",
      fontSize: 86,
      lineHeight: 92,
      fontWeight: "300",
      color: theme.name === "dark" ? stylesTokens.textDark : stylesTokens.textLight,
      includeFontPadding: false,
    },
    keypad: {
      height: "45%",
      flexDirection: "row",
      flexWrap: "wrap",
      padding: 10,
    },
    key: {
      width: "25%",
      height: "20%",
      padding: 5,
    },
    keyPressed: {
      opacity: 0.8,
    },
    keyFace: {
      flex: 1,
      backgroundColor: theme.name === "dark" ? stylesTokens.keyBgDark : stylesTokens.keyBgLight,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    },
    keyText: {
      textAlign: "center",
      fontSize: 30,
      lineHeight: 34,
      fontWeight: "500",
      color: theme.name === "dark" ? stylesTokens.textDark : stylesTokens.textLight,
      includeFontPadding: false,
    },
    clearText: {
      color: stylesTokens.accent,
      fontSize: 22,
      fontWeight: "500",
    },
    equalText: {
      color: "#fff",
      fontSize: 36,
      fontWeight: "600",
    },
    equalKeyFace: {
      backgroundColor: stylesTokens.equalBg,
    },
  });
