import { ROW_HEIGHT } from "@/app/category/screens/category-types/components/_constants";
import { useCallback, useEffect, useRef } from "react";
import { FlatList, NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { Unit } from "../types/unit";

/**
 * Parameters for the useWheelScroll hook.
 */
type UseWheelScrollParams = {
  /** The currently visible units for the left wheel */
  visibleUnitsLeft: Unit[];
  /** The currently visible units for the right wheel */
  visibleUnitsRight: Unit[];
  /** The currently selected input unit key */
  inputUnit: string;
  /** The currently selected output unit key */
  outputUnit: string;
  /** Function to update the input unit */
  setInputUnit: (unit: string) => void;
  /** Function to update the output unit */
  setOutputUnit: (unit: string) => void;
  /** Whether the favorites filter is enabled */
  favoritesFilterEnabled: boolean;
};

/**
 * Return type for the useWheelScroll hook.
 */
type UseWheelScrollReturn = {
  /** Reference to the left FlatList */
  leftRef: React.RefObject<FlatList | null>;
  /** Reference to the right FlatList */
  rightRef: React.RefObject<FlatList | null>;
  /** Handler for left list scroll end - updates input unit based on scroll position */
  handleScrollEndLeft: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
  /** Handler for right list scroll end - updates output unit based on scroll position */
  handleScrollEndRight: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
  /** Function to recenter both lists to the currently selected units */
  recenterSelectedUnits: (animated: boolean) => void;
  /** Function to swap input and output units with animated scroll */
  swapUnits: () => void;
};

/**
 * Custom hook that manages wheel scroll behavior for dual FlatLists.
 * 
 * Handles:
 * - FlatList refs for left and right columns
 * - Snap-to-interval scroll handling
 * - Unit selection based on scroll position
 * - Automatic scrolling when units or filters change
 * - Layout-based recentering
 * - Unit swapping with animated scroll
 * 
 * @param params - The wheel scroll parameters
 * @returns Refs and handlers for wheel scroll behavior
 * 
 * @example
 * ```tsx
 * const {
 *   leftRef,
 *   rightRef,
 *   handleScrollEndLeft,
 *   handleScrollEndRight,
 *   recenterSelectedUnits,
 *   swapUnits
 * } = useWheelScroll({
 *   visibleUnitsLeft,
 *   visibleUnitsRight,
 *   inputUnit,
 *   outputUnit,
 *   setInputUnit,
 *   setOutputUnit,
 *   favoritesFilterEnabled
 * });
 * ```
 */
export function useWheelScroll({
  visibleUnitsLeft,
  visibleUnitsRight,
  inputUnit,
  outputUnit,
  setInputUnit,
  setOutputUnit,
  favoritesFilterEnabled,
}: UseWheelScrollParams): UseWheelScrollReturn {
  const leftRef = useRef<FlatList>(null);
  const rightRef = useRef<FlatList>(null);

  const handleScrollEndLeft = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (visibleUnitsLeft.length === 0) return;

      const offsetY = e.nativeEvent.contentOffset.y;
      const index = Math.round(offsetY / ROW_HEIGHT);
      const clampedIndex = Math.max(0, Math.min(index, visibleUnitsLeft.length - 1));
      setInputUnit(visibleUnitsLeft[clampedIndex].key);

      leftRef.current?.scrollToOffset({
        offset: clampedIndex * ROW_HEIGHT,
        animated: true,
      });
    },
    [visibleUnitsLeft, setInputUnit]
  );

  const handleScrollEndRight = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (visibleUnitsRight.length === 0) return;

      const offsetY = e.nativeEvent.contentOffset.y;
      const index = Math.round(offsetY / ROW_HEIGHT);
      const clampedIndex = Math.max(0, Math.min(index, visibleUnitsRight.length - 1));
      setOutputUnit(visibleUnitsRight[clampedIndex].key);

      rightRef.current?.scrollToOffset({
        offset: clampedIndex * ROW_HEIGHT,
        animated: true,
      });
    },
    [visibleUnitsRight, setOutputUnit]
  );

  const recenterSelectedUnits = useCallback(
    (animated: boolean) => {
      if (visibleUnitsLeft.length === 0 && visibleUnitsRight.length === 0) return;

      const inputIndex = visibleUnitsLeft.findIndex((u) => u.key === inputUnit);
      const outputIndex = visibleUnitsRight.findIndex((u) => u.key === outputUnit);

      const safeInputIndex = inputIndex >= 0 ? inputIndex : 0;
      const safeOutputIndex = outputIndex >= 0 ? outputIndex : 0;

      leftRef.current?.scrollToOffset({
        offset: safeInputIndex * ROW_HEIGHT,
        animated,
      });
      rightRef.current?.scrollToOffset({
        offset: safeOutputIndex * ROW_HEIGHT,
        animated,
      });
    },
    [visibleUnitsLeft, visibleUnitsRight, inputUnit, outputUnit]
  );

  const swapUnits = useCallback(() => {
    const nextInputUnit = outputUnit;
    const nextOutputUnit = inputUnit;

    setInputUnit(nextInputUnit);
    setOutputUnit(nextOutputUnit);

    const leftIndex = visibleUnitsLeft.findIndex((u) => u.key === nextInputUnit);
    const rightIndex = visibleUnitsRight.findIndex((u) => u.key === nextOutputUnit);

    if (leftIndex >= 0) {
      leftRef.current?.scrollToOffset({
        offset: leftIndex * ROW_HEIGHT,
        animated: true,
      });
    }

    if (rightIndex >= 0) {
      rightRef.current?.scrollToOffset({
        offset: rightIndex * ROW_HEIGHT,
        animated: true,
      });
    }
  }, [inputUnit, outputUnit, visibleUnitsLeft, visibleUnitsRight, setInputUnit, setOutputUnit]);

  // Effect 1: Scroll to top when favorites filter toggles or visibleUnits changes
  useEffect(() => {
    if (visibleUnitsLeft.length === 0 && visibleUnitsRight.length === 0) return;

    leftRef.current?.scrollToOffset({
      offset: 0,
      animated: false,
    });
    rightRef.current?.scrollToOffset({
      offset: 0,
      animated: false,
    });
  }, [favoritesFilterEnabled, visibleUnitsLeft, visibleUnitsRight]);

  // Keep selected units valid for each independently filtered wheel.
  useEffect(() => {
    if (visibleUnitsLeft.length > 0 && !visibleUnitsLeft.some((u) => u.key === inputUnit)) {
      setInputUnit(visibleUnitsLeft[0].key);
    }

    if (visibleUnitsRight.length > 0 && !visibleUnitsRight.some((u) => u.key === outputUnit)) {
      setOutputUnit(visibleUnitsRight[0].key);
    }
  }, [visibleUnitsLeft, visibleUnitsRight, inputUnit, outputUnit, setInputUnit, setOutputUnit]);

  // Effect 2: Scroll to current unit positions when units change
  useEffect(() => {
    if (visibleUnitsLeft.length === 0 && visibleUnitsRight.length === 0) return;

    const inputIndex = visibleUnitsLeft.findIndex((u) => u.key === inputUnit);
    const outputIndex = visibleUnitsRight.findIndex((u) => u.key === outputUnit);

    const handle = requestAnimationFrame(() => {
      leftRef.current?.scrollToOffset({
        offset: Math.max(0, inputIndex) * ROW_HEIGHT,
        animated: false,
      });
      rightRef.current?.scrollToOffset({
        offset: Math.max(0, outputIndex) * ROW_HEIGHT,
        animated: false,
      });
    });

    return () => cancelAnimationFrame(handle);
  }, [visibleUnitsLeft, visibleUnitsRight, inputUnit, outputUnit]);

  return {
    leftRef,
    rightRef,
    handleScrollEndLeft,
    handleScrollEndRight,
    recenterSelectedUnits,
    swapUnits,
  };
}
