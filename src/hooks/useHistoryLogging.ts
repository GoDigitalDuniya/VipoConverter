import { useEffect } from "react";
import { convert } from "../conversion/engine/convert";
import useConversionHistoryStore from "../store/useConversionHistoryStore";
import { Unit } from "../types/unit";
import { HISTORY_TYPING_DEBOUNCE_MS } from "../utils/historyUtils";

interface UseHistoryLoggingParams {
  categoryKey: string;
  inputValue: string;
  inputUnit: string;
  outputUnit: string;
  UNITS: Unit[];
  convertedValues: Record<string, string>;
  shouldDebounceHistoryRef: React.MutableRefObject<boolean>;
  restoreInProgressRef: React.MutableRefObject<boolean>;
  restoreTargetRef: React.MutableRefObject<{
    inputValue: string;
    inputUnitKey: string;
    outputUnitKey: string;
  } | null>;
  lastHistorySignatureRef: React.MutableRefObject<string | null>;
  didInitHistoryRef: React.MutableRefObject<boolean>;
  typingHistoryTimeoutRef: React.MutableRefObject<ReturnType<typeof setTimeout> | null>;
}

export function useHistoryLogging({
  categoryKey,
  inputValue,
  inputUnit,
  outputUnit,
  UNITS,
  convertedValues,
  shouldDebounceHistoryRef,
  restoreInProgressRef,
  restoreTargetRef,
  lastHistorySignatureRef,
  didInitHistoryRef,
  typingHistoryTimeoutRef,
}: UseHistoryLoggingParams) {
  const addHistory = useConversionHistoryStore((state) => state.addHistory);

  useEffect(() => {
    const inputUnitDef = UNITS.find((unit) => unit.key === inputUnit);
    const outputUnitDef = UNITS.find((unit) => unit.key === outputUnit);
    if (!inputUnitDef || !outputUnitDef) return;

    const outputValue = convertedValues[outputUnit] ?? "0";
    const signature = `${categoryKey}|${inputValue}|${inputUnit}|${outputUnit}|${outputValue}`;

    if (!didInitHistoryRef.current) {
      didInitHistoryRef.current = true;
      lastHistorySignatureRef.current = signature;
      return;
    }

    if (signature === lastHistorySignatureRef.current) return;

    if (!inputValue || Number(inputValue) === 0) {
      lastHistorySignatureRef.current = signature;
      return;
    }

    if (!Number.isFinite(Number(outputValue))) {
      lastHistorySignatureRef.current = signature;
      return;
    }

    if (restoreInProgressRef.current) {
      const target = restoreTargetRef.current;
      const atRestoreTarget =
        !!target &&
        target.inputValue === inputValue &&
        target.inputUnitKey === inputUnit &&
        target.outputUnitKey === outputUnit;

      lastHistorySignatureRef.current = signature;

      if (atRestoreTarget) {
        restoreInProgressRef.current = false;
        restoreTargetRef.current = null;
      }
      return;
    }

    lastHistorySignatureRef.current = signature;

    const createHistoryEntry = () =>
      addHistory({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
        category: categoryKey,
        inputValue,
        inputUnitKey: inputUnit,
        inputUnitLabel: inputUnitDef.label,
        // Store raw (unformatted) output value for history to preserve exact numeric data
        outputValue: String(convert(categoryKey, Number(inputValue) || 0, inputUnit, outputUnit)),
        outputUnitKey: outputUnit,
        outputUnitLabel: outputUnitDef.label,
        timestamp: Date.now(),
      });

    if (typingHistoryTimeoutRef.current) {
      clearTimeout(typingHistoryTimeoutRef.current);
      typingHistoryTimeoutRef.current = null;
    }

    if (shouldDebounceHistoryRef.current) {
      typingHistoryTimeoutRef.current = setTimeout(() => {
        // Skip stale log attempts when input changed again during debounce.
        if (lastHistorySignatureRef.current !== signature) return;
        createHistoryEntry();
        shouldDebounceHistoryRef.current = false;
      }, HISTORY_TYPING_DEBOUNCE_MS);
      return;
    }

    createHistoryEntry();
  }, [
    UNITS,
    addHistory,
    categoryKey,
    convertedValues,
    inputUnit,
    inputValue,
    outputUnit,
    shouldDebounceHistoryRef,
    restoreInProgressRef,
    restoreTargetRef,
    lastHistorySignatureRef,
    didInitHistoryRef,
    typingHistoryTimeoutRef,
  ]);

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (typingHistoryTimeoutRef.current) {
        clearTimeout(typingHistoryTimeoutRef.current);
        typingHistoryTimeoutRef.current = null;
      }
    };
  }, [typingHistoryTimeoutRef]);
}