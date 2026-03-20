import React, { useMemo, useState } from "react";
import {
  StyleSheet,
  View,
} from "react-native";
import NumberPad from "../../../../components/NumberPad";
import { useNumberPad } from "../../../../src/hooks/useNumberPad";
import useSettingsStore from "../../../../store/useSettingsStore";
import { useTheme } from "../../../../theme/ThemeProvider";
import GlucoseConversionTable from "./components/GlucoseConversionTable";
import GlucoseInfoModal from "./components/GlucoseInfoModal";
import GlucoseInputZone from "./components/GlucoseInputZone";
import {
  GlucoseUnit,
  mgdlToMmol,
  mmolToMgdl,
} from "./glucoseUtils";

interface GlucoseScreenProps {
  categoryKey: string;
}

export default function GlucoseScreen({ categoryKey }: GlucoseScreenProps) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const numberOfDigits = useSettingsStore((state) => state.numberOfDigits);

  const [activeUnit, setActiveUnit] = useState<GlucoseUnit>("mmol");
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);

  const {
    inputValue,
    setInputValue,
    isNumberPadVisible,
    showNumberPad,
    hideNumberPad,
    handleNumberPadKeyPress,
  } = useNumberPad();

  // Derived output value — never stored in state
  const outputValue = useMemo(() => {
    const n = Number(inputValue) || 0;
    if (n === 0) return "0";
    const raw = activeUnit === "mmol" ? mmolToMgdl(n) : mgdlToMmol(n);
    if (!Number.isFinite(raw)) return "0";
    return parseFloat(raw.toFixed(numberOfDigits)).toString();
  }, [inputValue, activeUnit, numberOfDigits]);

  return (
    <View style={[styles.root, { backgroundColor: theme.colors.background }]}>
      {/* Upper Zone: Input, Radio, Output, Info */}
      <GlucoseInputZone
        inputValue={inputValue}
        activeUnit={activeUnit}
        outputValue={outputValue}
        onInputPress={showNumberPad}
        onUnitChange={setActiveUnit}
        onInfoPress={() => setIsInfoModalVisible(true)}
      />

      {/* Lower Zone: Conversion Table */}
      <GlucoseConversionTable />

      {/* Info Modal */}
      <GlucoseInfoModal
        visible={isInfoModalVisible}
        onClose={() => setIsInfoModalVisible(false)}
      />

      {/* NumberPad */}
      <NumberPad
        onKeyPress={handleNumberPadKeyPress}
        inputValue={inputValue}
        isVisible={isNumberPadVisible}
        onShowKeyboard={showNumberPad}
        onHideKeyboard={hideNumberPad}
        hiddenKeys={["swap", "calc"]}
        navigateBackOnHardwareBack={false}
      />
    </View>
  );
}

const createStyles = (theme: ReturnType<typeof useTheme>) =>
  StyleSheet.create({
    root: {
      flex: 1,
    },
  });
