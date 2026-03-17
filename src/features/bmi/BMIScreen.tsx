import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useMemo, useState } from "react";
import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import NumberPad from "../../../components/NumberPad";
import { useTheme } from "../../../theme/ThemeProvider";
import { useNumberPad } from "../../hooks/useNumberPad";

const WEIGHT_UNITS = [
  { key: "kg", label: "Kilograms" },
  { key: "lb", label: "Pounds" },
  { key: "st_lb", label: "Stone/Pounds" },
];

const HEIGHT_UNITS = [
  { key: "cm", label: "Centimeter" },
  { key: "ft_in", label: "Feet/Inches" },
];

type Props = {
  categoryKey: string;
};

type ActiveInput =
  | "weight"
  | "height"
  | "feet"
  | "inches"
  | "stone"
  | "pounds";

export default function BMIScreen({ categoryKey }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);

  const [weightUnit, setWeightUnit] = useState("kg");
  const [heightUnit, setHeightUnit] = useState("cm");

  const [weight, setWeight] = useState("0");
  const [height, setHeight] = useState("0");
  const [feet, setFeet] = useState("0");
  const [inches, setInches] = useState("0");
  const [stone, setStone] = useState("0");
  const [pounds, setPounds] = useState("0");

  const [activeInput, setActiveInput] = useState<ActiveInput | null>(null);

  const [unitPickerVisible, setUnitPickerVisible] = useState(false);
  const [unitPickerOptions, setUnitPickerOptions] = useState<
    { key: string; label: string }[]
  >([]);
  const [unitPickerValue, setUnitPickerValue] = useState("");
  const [unitPickerTitle, setUnitPickerTitle] = useState("");

  const {
    inputValue,
    setInputValue,
    isNumberPadVisible,
    showNumberPad,
    handleNumberPadKeyPress,
  } = useNumberPad({ initialValue: "0" });

  useEffect(() => {
    if (!activeInput) return;

    const map: any = { weight, height, feet, inches, stone, pounds };
    setInputValue(map[activeInput] ?? "0");
  }, [activeInput]);

  useEffect(() => {
    if (!activeInput) return;

    const setters: any = {
      weight: setWeight,
      height: setHeight,
      feet: setFeet,
      inches: setInches,
      stone: setStone,
      pounds: setPounds,
    };

    setters[activeInput](inputValue);
  }, [inputValue, activeInput]);

  const parse = (v: string) => Number(v) || 0;

  const weightKg = useMemo(() => {
    if (weightUnit === "kg") return parse(weight);
    if (weightUnit === "lb") return parse(weight) * 0.453592;
    return (parse(stone) * 14 + parse(pounds)) * 0.453592;
  }, [weight, weightUnit, stone, pounds]);

  const heightMeters = useMemo(() => {
    if (heightUnit === "cm") return parse(height) / 100;
    return (parse(feet) * 12 + parse(inches)) * 0.0254;
  }, [height, feet, inches, heightUnit]);

  const bmi = useMemo(() => {
    if (!heightMeters || !weightKg) return null;
    const val = weightKg / (heightMeters * heightMeters);
    return Number(val.toFixed(1));
  }, [weightKg, heightMeters]);

  const bmiCategory = useMemo(() => {
    if (bmi == null) return null;
    if (bmi < 18.5) return { label: "UNDER WEIGHT", color: "#ff9500", range: "Less - 18.4" };
    if (bmi < 25) return { label: "HEALTHY", color: "#2ecc71", range: "18.5 - 24.9" };
    if (bmi < 30) return { label: "OVER WEIGHT", color: "#007aff", range: "25.0 - 29.9" };
    return { label: "OBESE", color: "#ff3b30", range: "30.0 - More" };
  }, [bmi]);

  const handleInputPress = (field: ActiveInput) => {
    setActiveInput(field);
    showNumberPad();
  };

  const showUnitPicker = (title: string, value: string, options: any) => {
    setUnitPickerTitle(title);
    setUnitPickerValue(value);
    setUnitPickerOptions(options);
    setUnitPickerVisible(true);
  };

  const handleUnitSelect = (value: string) => {
    setUnitPickerVisible(false);
    if (unitPickerTitle === "Weight") setWeightUnit(value);
    if (unitPickerTitle === "Height") setHeightUnit(value);
  };

  const renderInputBox = (value: string, field: ActiveInput) => {
    const active = activeInput === field;

    return (
      <TouchableOpacity
        style={[styles.inputBox, active && styles.inputActive]}
        onPress={() => handleInputPress(field)}
      >
        <Text style={[styles.inputValue, active && styles.inputValueActive]}>
          {value}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Weight</Text>
        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            {renderInputBox(weight, "weight")}
          </View>

          <TouchableOpacity
            style={styles.unitContainer}
            onPress={() => showUnitPicker("Weight", weightUnit, WEIGHT_UNITS)}
          >
            <Text style={styles.dropdownText}>
              {WEIGHT_UNITS.find((u) => u.key === weightUnit)?.label}
            </Text>
            <MaterialCommunityIcons name="chevron-down" size={18} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Height</Text>
        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            {renderInputBox(height, "height")}
          </View>

          <TouchableOpacity
            style={styles.unitContainer}
            onPress={() => showUnitPicker("Height", heightUnit, HEIGHT_UNITS)}
          >
            <Text style={styles.dropdownText}>
              {HEIGHT_UNITS.find((u) => u.key === heightUnit)?.label}
            </Text>
            <MaterialCommunityIcons name="chevron-down" size={18} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>

      {bmi && bmiCategory && (
        <View style={styles.resultCard}>
          <MaterialCommunityIcons name="human-male" size={70} color={bmiCategory.color} />
          <View style={{ flex: 1, marginLeft: 16 }}>
            <Text style={styles.resultLabel}>Your BMI value is</Text>
            <Text style={[styles.bmiValue, { color: bmiCategory.color }]}>{bmi}</Text>
            <Text style={[styles.bmiCategory, { color: bmiCategory.color }]}>{bmiCategory.label}</Text>
            <Text style={styles.bmiRange}>{bmiCategory.range}</Text>
          </View>
        </View>
      )}

      <TouchableOpacity
        style={styles.keyboardButton}
        onPress={() => {
          if (!activeInput) setActiveInput("weight");
          showNumberPad();
        }}
      >
        <Text style={{ color: theme.colors.primary }}>Show Keyboard</Text>
      </TouchableOpacity>

      {isNumberPadVisible && (
        <NumberPad onKeyPress={handleNumberPadKeyPress} inputValue={inputValue} />
      )}

      <Modal transparent visible={unitPickerVisible}>
        <Pressable style={styles.modalOverlay} onPress={() => setUnitPickerVisible(false)} />
        <View style={styles.pickerContainer}>
          {unitPickerOptions.map((o) => (
            <TouchableOpacity key={o.key} onPress={() => handleUnitSelect(o.key)}>
              <Text style={styles.pickerItemText}>{o.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </View>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background, padding: 12 },

    card: {
      backgroundColor: theme.colors.surface,
      padding: 14,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },

    sectionTitle: {
      fontSize: 18,
      fontWeight: "600",
      marginBottom: 6,
      color: theme.colors.text,
    },

    inputRow: {
      flexDirection: "row",
      marginBottom: 14,
      alignItems: "center",
    },

    inputContainer: {
      flex: 1,
      marginRight: 10,
    },

    inputBox: {
      height: 50,
      backgroundColor: "#e5e5e5",
      justifyContent: "center",
      paddingHorizontal: 12,
      borderRadius: 4,
    },

    inputActive: {
      backgroundColor: "#5fa8b0",
    },

    inputValue: {
      fontSize: 20,
      textAlign: "right",
      fontWeight: "600",
    },

    inputValueActive: {
      color: "#fff",
    },

    unitContainer: {
      width: 130,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    dropdownText: {
      fontSize: 16,
      color: theme.colors.text,
    },

    resultCard: {
      flexDirection: "row",
      marginTop: 20,
      padding: 16,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 8,
      backgroundColor: theme.colors.surface,
      alignItems: "center",
    },

    resultLabel: {
      fontSize: 16,
      marginBottom: 6,
      color: theme.colors.textSecondary,
    },

    bmiValue: {
      fontSize: 42,
      fontWeight: "700",
    },

    bmiCategory: {
      fontSize: 22,
      fontWeight: "700",
    },

    bmiRange: {
      fontSize: 14,
      color: theme.colors.textSecondary,
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
      minWidth: 160,
      alignItems: "center",
      justifyContent: "center",
    },

    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.3)",
    },

    pickerContainer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: theme.colors.surface,
      padding: 16,
    },

    pickerItemText: {
      fontSize: 16,
      paddingVertical: 10,
      color: theme.colors.text,
    },
  });