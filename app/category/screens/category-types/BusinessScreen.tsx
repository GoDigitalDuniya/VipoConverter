import NumberPad from "@/components/NumberPad";
import { useNumberPad } from "@/src/hooks/useNumberPad";
import { useTheme } from "@/theme/ThemeProvider";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  computeBeginningValue,
  computeCagr,
  computeEndingValue,
  computeYears,
  FieldKey,
  formatNumber,
  safeNumber,
} from "./cagrUtils";
import BusinessHeader from "./components/BusinessHeader";
import CagrFieldRow from "./components/CagrFieldRow";

type Props = {
  categoryKey: string;
};

const FIELD_ORDER: FieldKey[] = [
  "beginning",
  "ending",
  "years",
  "cagr",
];

export default function BusinessScreen({ categoryKey }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);

  const [beginningValue, setBeginningValue] = useState("0");
  const [endingValue, setEndingValue] = useState("0");
  const [yearsValue, setYearsValue] = useState("0");
  const [cagrValue, setCagrValue] = useState("0");
  const [activeField, setActiveField] = useState<FieldKey | null>("beginning");

  const {
    inputValue,
    setInputValue,
    isNumberPadVisible,
    showNumberPad,
    hideNumberPad,
    handleNumberPadKeyPress,
  } = useNumberPad();

  const skipSyncRef = useRef(false);

  useEffect(() => {
    showNumberPad();
  }, [showNumberPad]);

  const handleShowKeyboard = useCallback(() => {
    if (!activeField) {
      setActiveField("beginning");
    }
    showNumberPad();
  }, [activeField, showNumberPad]);

  const handleHideKeyboard = useCallback(() => {
    setActiveField(null);
    hideNumberPad();
  }, [hideNumberPad]);

  const handleReset = useCallback(() => {
    setBeginningValue("0");
    setEndingValue("0");
    setYearsValue("0");
    setCagrValue("0");
    setActiveField(null);
  }, []);

  const parsedValues = useMemo(
    () => ({
      beginning: safeNumber(beginningValue),
      ending: safeNumber(endingValue),
      years: safeNumber(yearsValue),
      cagr: safeNumber(cagrValue),
    }),
    [beginningValue, endingValue, yearsValue, cagrValue]
  );

  const filledFields = useMemo(() => {
    return FIELD_ORDER.filter((field) => parsedValues[field] > 0);
  }, [parsedValues]);

  const computedField = useMemo<FieldKey | null>(() => {
    if (filledFields.length !== 3) return null;
    return FIELD_ORDER.find((f) => !filledFields.includes(f)) ?? null;
  }, [filledFields]);

  const computedValue = useMemo<string | null>(() => {
    if (!computedField) return null;

    const { beginning, ending, years, cagr } = parsedValues;

    let computed: number | null = null;
    switch (computedField) {
      case "cagr":
        computed = computeCagr({ beginning, ending, years });
        break;
      case "ending":
        computed = computeEndingValue({ beginning, years, cagr });
        break;
      case "beginning":
        computed = computeBeginningValue({ ending, years, cagr });
        break;
      case "years":
        computed = computeYears({ beginning, ending, cagr });
        break;
    }

    if (computed === null) return null;
    return formatNumber(computed, 2);
  }, [computedField, parsedValues]);

  useEffect(() => {
    if (!activeField) return;

    const valueForField =
      computedField === activeField && computedValue !== null
        ? computedValue
        : activeField === "beginning"
        ? beginningValue
        : activeField === "ending"
        ? endingValue
        : activeField === "years"
        ? yearsValue
        : cagrValue;

    skipSyncRef.current = true;
    setInputValue(valueForField);
  }, [activeField, setInputValue]);

  useEffect(() => {
    if (!activeField) return;

    const currentFieldValue =
      activeField === "beginning"
        ? beginningValue
        : activeField === "ending"
        ? endingValue
        : activeField === "years"
        ? yearsValue
        : cagrValue;

    if (skipSyncRef.current) {
      // Ignore the one update that comes directly from syncing the field into the pad.
      // But if the input value differs from the current field value, it means the user
      // typed something, so we should accept it.
      if (inputValue === currentFieldValue) {
        skipSyncRef.current = false;
        return;
      }
    }

    if (activeField === "beginning") setBeginningValue(inputValue);
    if (activeField === "ending") setEndingValue(inputValue);
    if (activeField === "years") setYearsValue(inputValue);
    if (activeField === "cagr") setCagrValue(inputValue);
  }, [activeField, inputValue, beginningValue, endingValue, yearsValue, cagrValue]);

  const getFieldDisplayValue = useCallback(
    (field: FieldKey) => {
      if (computedField === field && computedValue !== null) return computedValue;
      if (field === "beginning") return beginningValue;
      if (field === "ending") return endingValue;
      if (field === "years") return yearsValue;
      return cagrValue;
    },
    [beginningValue, endingValue, yearsValue, cagrValue, computedField, computedValue]
  );

  const isFieldActive = useCallback(
    (field: FieldKey) => activeField === field,
    [activeField]
  );

  const isFieldHighlighted = useCallback(
    (field: FieldKey) => computedField === field && computedValue !== null,
    [computedField, computedValue]
  );

  return (
    <View style={styles.container}>
      <BusinessHeader title="CAGR" onReset={handleReset} onShare={() => {}} />

      <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      <CagrFieldRow
        label="Beginning Value"
        value={getFieldDisplayValue("beginning")}
        highlighted={isFieldHighlighted("beginning")}
        active={isFieldActive("beginning")}
        onPress={() => setActiveField("beginning")}
      />
      <CagrFieldRow
        label="Ending Value"
        value={getFieldDisplayValue("ending")}
        highlighted={isFieldHighlighted("ending")}
        active={isFieldActive("ending")}
        onPress={() => setActiveField("ending")}
      />
      <CagrFieldRow
        label="Number Of Years"
        value={getFieldDisplayValue("years")}
        highlighted={isFieldHighlighted("years")}
        active={isFieldActive("years")}
        onPress={() => setActiveField("years")}
      />
      <CagrFieldRow
        label="CAGR (%)"
        value={getFieldDisplayValue("cagr")}
        highlighted={isFieldHighlighted("cagr")}
        active={isFieldActive("cagr")}
        onPress={() => setActiveField("cagr")}
      />
      </ScrollView>
      <NumberPad
        onKeyPress={handleNumberPadKeyPress}
        inputValue={inputValue}
        isVisible={true}
        onShowKeyboard={handleShowKeyboard}
        onHideKeyboard={handleHideKeyboard}
        hiddenKeys={["swap", "calc"]}
        navigateBackOnHardwareBack={true}
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
    scroll: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
    },
  });
