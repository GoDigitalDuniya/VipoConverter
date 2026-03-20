import React, { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import NumberPad from "../../../../components/NumberPad";
import { useNumberPad } from "../../../../src/hooks/useNumberPad";
import useSettingsStore from "../../../../store/useSettingsStore";
import { useTheme } from "../../../../theme/ThemeProvider";
import PercentageInputZone from "./components/PercentageInputZone";
import PercentageModeRadio from "./components/PercentageModeRadio";
import {
  PercentageMode,
  computePercentageOfValue,
  computeValueOfPercentage,
} from "./utils/percentageUtils";

type Props = {
  categoryKey: string;
};

export default function PercentageScreen({ categoryKey: _categoryKey }: Props) {
  const theme = useTheme();
  const numberOfDigits = useSettingsStore((state) => state.numberOfDigits);
  const styles = createStyles(theme);

  const [mode, setMode] = useState<PercentageMode>("percentage-of-value");
  const [activeField, setActiveField] = useState<"field1" | "field2">("field1");

  // ── 4 independent field states — one per field per mode ──────────────────
  // Mode 1: percentage-of-value
  const mode1Field1 = useNumberPad({ initialValue: "0" }); // the "part" value
  const mode1Field2 = useNumberPad({ initialValue: "0" }); // the "whole" value

  // Mode 2: value-of-percentage
  const [sliderValue, setSliderValue] = useState(0);       // the % slider
  const mode2Field2 = useNumberPad({ initialValue: "0" }); // the "of" value

  // ── Active pad — which pad receives key presses right now ─────────────────
  const activeMode1Pad = activeField === "field1" ? mode1Field1 : mode1Field2;
  const activePad      = mode === "percentage-of-value" ? activeMode1Pad : mode2Field2;

  // ── Derived output ────────────────────────────────────────────────────────
  const outputValue = useMemo(() => {
    if (mode === "percentage-of-value") {
      const part  = Number(mode1Field1.inputValue) || 0;
      const whole = Number(mode1Field2.inputValue) || 0;
      if (part === 0 || whole === 0) return "";
      const result = computePercentageOfValue(part, whole);
      if (result === null) return "";
      return parseFloat(result.toFixed(numberOfDigits)).toString() + "%";
    }

    const value = Number(mode2Field2.inputValue) || 0;
    if (value === 0) return "";
    const result = computeValueOfPercentage(sliderValue, value);
    if (result === null) return "";
    return parseFloat(result.toFixed(numberOfDigits)).toString();
  }, [
    mode,
    mode1Field1.inputValue,
    mode1Field2.inputValue,
    mode2Field2.inputValue,
    sliderValue,
    numberOfDigits,
  ]);

  // ── Handlers ──────────────────────────────────────────────────────────────

  function handleModeChange(nextMode: PercentageMode) {
    setMode(nextMode);
    // Restore the active field appropriate for each mode —
    // values are preserved in their own pads
    setActiveField(nextMode === "value-of-percentage" ? "field2" : "field1");
  }

  function handleKeyPress(key: string) {
    if (key === "swap") {
      // Swap field1 and field2 values within mode 1 only
      const temp = mode1Field1.inputValue;
      mode1Field1.setInputValue(mode1Field2.inputValue);
      mode1Field2.setInputValue(temp);
      return;
    }
    activePad.handleNumberPadKeyPress(key);
  }

  // ── Field values for display ───────────────────────────────────────────────
  // Each mode reads from its own independent pads
  const field1Value = mode === "percentage-of-value"
    ? mode1Field1.inputValue
    : "0"; // mode 2 has no field1 — slider handles it

  const field2Value = mode === "percentage-of-value"
    ? mode1Field2.inputValue
    : mode2Field2.inputValue;

  return (
    <View style={styles.container}>
      <PercentageInputZone
        mode={mode}
        sliderValue={sliderValue}
        onSliderValueChange={setSliderValue}
        field1Value={field1Value}
        field2Value={field2Value}
        activeField={activeField}
        onSelectField1={() => setActiveField("field1")}
        onSelectField2={() => setActiveField("field2")}
        outputValue={outputValue}
      />

      <PercentageModeRadio mode={mode} onModeChange={handleModeChange} />

      <View style={styles.padSpacer} />

      <NumberPad
        onKeyPress={handleKeyPress}
        inputValue={activePad.inputValue}
        isVisible={true}
        onShowKeyboard={() => {}}
        onHideKeyboard={() => {}}
        hiddenKeys={
          mode === "value-of-percentage"
            ? ["calc", "swap"]
            : ["calc"]
        }
        navigateBackOnHardwareBack={true}
      />
    </View>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    padSpacer: {
      flex: 1,
    },
  });