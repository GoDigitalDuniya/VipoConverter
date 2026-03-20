import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../../../theme/ThemeProvider";
import NumberSystemFieldGroup from "./components/NumberSystemFieldGroup";
import NumberSystemPad from "./components/NumberSystemPad";
import {
  NumberSystemField,
  binaryToDecimal,
  decimalToBinary,
  decimalToHex,
  hexToDecimal,
  isValidInput,
} from "./utils/numberSystemUtils";

type Props = {
  categoryKey: string;
};

export default function NumberSystemScreen({ categoryKey: _categoryKey }: Props) {
  const theme = useTheme();
  const router = useRouter();
  const styles = createStyles(theme);

  // Each field stores what the user typed
  const [values, setValues] = useState<Record<NumberSystemField, string>>({
    hex: "",
    decimal: "",
    binary: "",
  });

  // NumberSystemPad is always visible, so activeField is always set
  const [activeField, setActiveField] = useState<NumberSystemField>("hex");

  const derivedValues = useMemo<Record<NumberSystemField, string>>(() => {
    const active = values[activeField];
    if (!active) return { hex: "", decimal: "", binary: "" };

    let decimalNum: number | null = null;

    if (activeField === "decimal") {
      decimalNum = parseInt(active, 10);
    } else if (activeField === "hex") {
      decimalNum = hexToDecimal(active);
    } else if (activeField === "binary") {
      decimalNum = binaryToDecimal(active);
    }

    if (decimalNum === null || !Number.isFinite(decimalNum) || decimalNum < 0) {
      return { hex: "", decimal: "", binary: "" };
    }

    return {
      hex: activeField === "hex" ? active.toUpperCase() : decimalToHex(decimalNum),
      decimal: activeField === "decimal" ? active : String(decimalNum),
      binary: activeField === "binary" ? active : decimalToBinary(decimalNum),
    };
  }, [values, activeField]);

  function handleKeyPress(key: string) {
    if (key === "clear") {
      setValues({ hex: "", decimal: "", binary: "" });
      return;
    }

    if (key === "delete") {
      setValues((prev) => ({
        ...prev,
        [activeField]: prev[activeField].slice(0, -1),
      }));
      return;
    }

    const next = values[activeField] + key;
    if (!isValidInput(next, activeField)) return;

    setValues((prev) => ({
      ...prev,
      [activeField]: activeField === "hex" ? next.toUpperCase() : next,
    }));
  }

  return (
    <View style={styles.container}>
      <View style={styles.fieldsContainer}>
        <NumberSystemFieldGroup
          label="Hex"
          value={derivedValues.hex}
          isActive={activeField === "hex"}
          onPress={() => setActiveField("hex")}
        />

        <NumberSystemFieldGroup
          label="Decimal"
          value={derivedValues.decimal}
          isActive={activeField === "decimal"}
          onPress={() => setActiveField("decimal")}
        />

        <NumberSystemFieldGroup
          label="Binary"
          value={derivedValues.binary}
          isActive={activeField === "binary"}
          onPress={() => setActiveField("binary")}
        />

        <TouchableOpacity
          onPress={() => router.push("/conversion-code-chart")}
          style={styles.chartLink}
          activeOpacity={0.8}
        >
          <Text style={styles.chartLinkText}>Conversion code chart</Text>
        </TouchableOpacity>
      </View>

      <NumberSystemPad activeField={activeField} onKeyPress={handleKeyPress} />
    </View>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    fieldsContainer: {
      flex: 1,
      paddingHorizontal: 12,
      paddingTop: 10,
      paddingBottom: 8,
    },
    chartLink: {
      marginTop: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    chartLinkText: {
      fontSize: 18,
      color: theme.colors.primary,
    },
  });
