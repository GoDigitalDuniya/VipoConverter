import { useCallback, useEffect, useRef, useState } from 'react';

export type UseNumberPadOptions = {
  /**
   * Callback triggered when the swap button is pressed.
   * The screen should handle the actual unit swapping logic.
   */
  onSwapUnits?: () => void;
  
  /**
   * Initial value for the input.
   * @default "0"
   */
  initialValue?: string;
};

export type UseNumberPadReturn = {
  inputValue: string;
  setInputValue: (value: string | ((prev: string) => string)) => void;
  isNumberPadVisible: boolean;
  showNumberPad: () => void;
  hideNumberPad: () => void;
  handleNumberPadKeyPress: (key: string) => void;
};

/**
 * A reusable hook for managing NumberPad state and behavior.
 * Handles input value, visibility, and key press logic.
 * 
 * @example
 * ```tsx
 * const {
 *   inputValue,
 *   isNumberPadVisible,
 *   showNumberPad,
 *   hideNumberPad,
 *   handleNumberPadKeyPress
 * } = useNumberPad({
 *   onSwapUnits: handleSwapUnits
 * });
 * ```
 */
export function useNumberPad(options: UseNumberPadOptions = {}): UseNumberPadReturn {
  const { onSwapUnits, initialValue = "0" } = options;
  
  const [inputValue, setInputValue] = useState(initialValue);
  const [isNumberPadVisible, setIsNumberPadVisible] = useState(false);
  const openPadTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hideNumberPad = useCallback(() => {
    if (openPadTimeoutRef.current) {
      clearTimeout(openPadTimeoutRef.current);
      openPadTimeoutRef.current = null;
    }
    setIsNumberPadVisible(false);
  }, []);

  const showNumberPad = useCallback(() => {
    hideNumberPad();
    openPadTimeoutRef.current = setTimeout(() => {
      setIsNumberPadVisible(true);
      openPadTimeoutRef.current = null;
    }, 80);
  }, [hideNumberPad]);

  const handleNumberPadKeyPress = useCallback(
    (key: string) => {
      if (key === "clear") {
        setInputValue("0");
        return;
      }

      if (key === "delete") {
        setInputValue((prev) => {
          if (!prev || prev === "0") return "0";
          const next = prev.slice(0, -1);
          return next.length ? next : "0";
        });
        return;
      }

      if (key === "swap") {
        onSwapUnits?.();
        return;
      }

      if (key === "calc") {
        // Placeholder for calculator functionality
        return;
      }

      if (key === ".") {
        setInputValue((prev) => (prev.includes(".") ? prev : `${prev}.`));
        return;
      }

      // Numeric input (0-9, 00)
      setInputValue((prev) => {
        if (prev === "0") return key;
        return `${prev}${key}`;
      });
    },
    [onSwapUnits]
  );

  // Cleanup timeout on unmount
  useEffect(
    () => () => {
      if (openPadTimeoutRef.current) {
        clearTimeout(openPadTimeoutRef.current);
        openPadTimeoutRef.current = null;
      }
    },
    []
  );

  return {
    inputValue,
    setInputValue,
    isNumberPadVisible,
    showNumberPad,
    hideNumberPad,
    handleNumberPadKeyPress,
  };
}
