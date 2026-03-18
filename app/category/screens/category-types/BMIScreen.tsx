import React, { useEffect, useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import NumberPad from "../../../../components/NumberPad";
import { useNumberPad } from "../../../../src/hooks/useNumberPad";
import { useTheme } from "../../../../theme/ThemeProvider";
import AnchoredDropdown from "./components/AnchoredDropdown";
import BmiResultCard from "./components/BmiResultCard";
import { BMI_CATEGORIES, HEIGHT_UNITS, WEIGHT_UNITS, getBmiIconName } from "./components/constants";

type Props = {
  categoryKey: string;
};

type InputField = "weight" | "height" | "feet" | "inches" | null;

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function BMIScreen({ categoryKey }: Props) {
  const theme = useTheme();

  const [weightUnit, setWeightUnit] = useState("kg");
  const [heightUnit, setHeightUnit] = useState("cm");
  const [weight, setWeight] = useState("0");
  const [height, setHeight] = useState("0");
  const [feet, setFeet] = useState("0");
  const [inches, setInches] = useState("0");
  const [activeInput, setActiveInput] = useState<InputField>(null);

  const {
    inputValue,
    setInputValue,
    handleNumberPadKeyPress,
  } = useNumberPad();

  // Sync the active input field with the NumberPad's input value when input becomes active
  useEffect(() => {
    if (activeInput) {
      const currentFieldValue =
        activeInput === "weight" ? weight
          : activeInput === "height" ? height
            : activeInput === "feet" ? feet
              : activeInput === "inches" ? inches
                : "0";
      setInputValue(currentFieldValue);
    }
  }, [activeInput]); // Only depend on activeInput, not the field values or setInputValue

  // Update the active input field when NumberPad value changes
  useEffect(() => {
    if (activeInput) {
      if (activeInput === "weight") setWeight(inputValue);
      else if (activeInput === "height") setHeight(inputValue);
      else if (activeInput === "feet") setFeet(inputValue);
      else if (activeInput === "inches") setInches(inputValue);
    }
  }, [inputValue, activeInput]);

  const weightKg = useMemo(() => {
    const w = Number(weight) || 0;
    if (weightUnit === "kg") return w;
    if (weightUnit === "lb") return w * 0.453592;
    if (weightUnit === "st_lb") return w * 6.35029; // stone to kg
    return w;
  }, [weight, weightUnit]);

  const heightMeters = useMemo(() => {
    if (heightUnit === "cm") return (Number(height) || 0) / 100;
    const f = Number(feet) || 0;
    const i = Number(inches) || 0;
    return (f * 12 + i) * 0.0254;
  }, [heightUnit, height, feet, inches]);

  const bmi = useMemo(() => {
    if (heightMeters <= 0 || weightKg <= 0) return null;
    const value = weightKg / (heightMeters * heightMeters);
    return Number.isFinite(value) ? Number(value.toFixed(1)) : null;
  }, [weightKg, heightMeters]);

  const activeBmiCategory = useMemo(() => {
    if (bmi === null) return null;
    return BMI_CATEGORIES.find((cat) => bmi >= cat.min && bmi <= cat.max) ?? null;
  }, [bmi]);

  return (
    <View style={[styles.root, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Weight Row ── */}
        <View style={styles.fieldGroup}>
          <Text style={[styles.label, { color: theme.colors.text }]}>Weight</Text>
          <View style={styles.inputRow}>
            <TouchableOpacity
              style={[styles.inputBox, { borderColor: theme.colors.primary, backgroundColor: theme.colors.background }]}
              onPress={() => setActiveInput("weight")}
            >
              <Text style={[styles.inputValue, { color: theme.colors.text }]}>{weight}</Text>
            </TouchableOpacity>
            <AnchoredDropdown
              options={WEIGHT_UNITS}
              selectedKey={weightUnit}
              onSelect={(unit) => setWeightUnit(unit)}
            />
          </View>
        </View>

        {/* ── Height Row ── */}
        <View style={styles.fieldGroup}>
          <Text style={[styles.label, { color: theme.colors.text }]}>Height</Text>
          <View style={styles.inputRow}>
            {heightUnit === "ft_in" ? (
              <View style={styles.dualInputContainer}>
                <TouchableOpacity
                  style={[styles.inputBox, { flex: 1, marginRight: 8, borderColor: theme.colors.primary, backgroundColor: theme.colors.background }]}
                  onPress={() => setActiveInput("feet")}
                >
                  <Text style={[styles.inputValue, { color: theme.colors.text }]}>{feet}</Text>
                  <Text style={[styles.inputUnitLabel, { color: theme.colors.textSecondary }]}>ft</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.inputBox, { flex: 1, borderColor: theme.colors.primary, backgroundColor: theme.colors.background }]}
                  onPress={() => setActiveInput("inches")}
                >
                  <Text style={[styles.inputValue, { color: theme.colors.text }]}>{inches}</Text>
                  <Text style={[styles.inputUnitLabel, { color: theme.colors.textSecondary }]}>in</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={[styles.inputBox, { borderColor: theme.colors.primary, backgroundColor: theme.colors.background }]}
                onPress={() => setActiveInput("height")}
              >
                <Text style={[styles.inputValue, { color: theme.colors.text }]}>{height}</Text>
              </TouchableOpacity>
            )}
            <AnchoredDropdown
              options={HEIGHT_UNITS}
              selectedKey={heightUnit}
              onSelect={(unit) => {
                setHeightUnit(unit);
                if (unit === "cm") {
                  setFeet("0");
                  setInches("0");
                }
              }}
            />
          </View>
        </View>

        {/* ── BMI Result ── */}
        {bmi !== null && activeBmiCategory && (
          <BmiResultCard
            bmi={bmi}
            category={activeBmiCategory.label}
            iconName={getBmiIconName(activeBmiCategory.label)}
          />
        )}

        {/* ── BMI Categories ── */}
        <View
          style={[
            styles.categoriesContainer,
            { borderColor: theme.colors.border, backgroundColor: theme.colors.background },
          ]}
        >
          {BMI_CATEGORIES.map((category) => {
            const isActive = activeBmiCategory?.label === category.label;

            return (
              <View
                key={category.label}
                style={[
                  styles.categoryRow,
                  { borderBottomColor: theme.colors.border },
                  // Active row gets colored background + left accent
                  isActive && {
                    backgroundColor: category.color + "18",
                    borderLeftWidth: 4,
                    borderLeftColor: category.color,
                  },
                ]}
              >
                {/* Category label — always uses its assigned color */}
                <Text
                  style={[
                    styles.categoryLabel,
                    { color: category.color },           // always colored
                    isActive && { fontWeight: "700" },   // bolder when active
                  ]}
                >
                  {category.label}
                </Text>

                {/* Range — colored when active, muted when not */}
                <Text
                  style={[
                    styles.categoryRange,
                    {
                      color: isActive
                        ? category.color
                        : theme.colors.textSecondary,
                    },
                  ]}
                >
                  {category.min === 0
                    ? `Less - ${category.max.toFixed(1)}`
                    : category.max === Infinity
                      ? `${category.min.toFixed(1)} - More`
                      : `${category.min.toFixed(1)} - ${category.max.toFixed(1)}`}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* ── NumberPad or Show Keyboard button ── */}
      <NumberPad
        onKeyPress={handleNumberPadKeyPress}
        inputValue={inputValue}
        isVisible={activeInput !== null}
        onShowKeyboard={() => setActiveInput("weight")}
        onHideKeyboard={() => setActiveInput(null)}
        hiddenKeys={["swap", "calc"]}
      />
    </View>
  );
}

// ─── Screen styles ────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 24,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  labelColumn: {
    width: 56,
  },
  fieldGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 4,
  },
  inputBox: {
    flex: 1,
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    justifyContent: "center",
    minWidth: 60,
  },
  inputValue: {
    fontSize: 22,
    fontWeight: "700",
  },
  inputUnitLabel: {
    fontSize: 12,
  },
  dualInputContainer: {
    flex: 1,
    flexDirection: "row",
  },
  unitButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    minWidth: 120,
  },
  unitButtonText: {
    fontSize: 13,
    fontWeight: "500",
    flex: 1,
  },
  categoriesContainer: {
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
  },
  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  categoryLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
  categoryRange: {
    fontSize: 13,
  },
});