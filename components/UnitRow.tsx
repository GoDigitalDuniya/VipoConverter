import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

// ─── Types ────────────────────────────────────────────────────────────────────

export type UnitItem = {
  key: string;
  shortLabel: string;
  name: string;
  value: number | string;
  isFavorite?: boolean;
  symbol?: string;
};

type Props = {
  item: UnitItem;
  selected?: boolean;
  onPress?: (key: string) => void;
  showStar?: boolean;
  isLeftColumn?: boolean;
  onValuePress?: () => void;
  onStarPress?: (key: string) => void;
};

// ─── Constants ────────────────────────────────────────────────────────────────

const ROW_HEIGHT = 72;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatValue(v: number | string | undefined | null): string {
  if (v === undefined || v === null || v === '') return '0';
  const n = Number(v);
  if (!Number.isFinite(n)) return String(v);
  return String(v);
}

// ─── Static styles (theme-independent) ───────────────────────────────────────
// These never change regardless of theme or selection state.
// Defined once at module level — never recreated.

const staticStyles = StyleSheet.create({
  unitRow: {
    minHeight: ROW_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  favoriteButton: {
    marginRight: 6,
  },
  unitContent: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  valueDisplay: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'flex-end',
    marginBottom: 2,
  },
  valueNumber: {
    fontSize: 16,
    fontWeight: '800',
    marginRight: 4,
    textAlign: 'right' as const,
  },
  valueSymbol: {
    fontSize: 14,
    fontWeight: 'bold' as const,
    textAlign: 'right' as const,
  },
  unitLabelContainer: {
    alignItems: 'flex-end' as const,
  },
  unitSymbol: {
    fontSize: 14,
    fontWeight: 'bold' as const,
    textAlign: 'right' as const,
  },
  unitName: {
    fontSize: 14,
    marginTop: 2,
    textAlign: 'right' as const,
  },
  unitLabelShiftDown: {
    marginTop: 7,
  },
});

// ─── Theme-aware style hook ───────────────────────────────────────────────────
// Memoized per theme instance — only recomputes when theme changes (light↔dark).
// All rows sharing the same theme share the same style object reference.

function useThemedStyles(theme: ReturnType<typeof useTheme>) {
  return useMemo(() => ({
    borderColor:      theme.colors.border,
    textColor:        theme.colors.text,
    textSecondary:    theme.colors.textSecondary,
    primaryColor:     theme.colors.primary,
  }), [
    theme.colors.border,
    theme.colors.text,
    theme.colors.textSecondary,
    theme.colors.primary,
  ]);
}

// ─── Sub-component ────────────────────────────────────────────────────────────

const UnitValueDisplay = React.memo(function UnitValueDisplay({
  value,
  symbol,
  selected,
  isLeftColumn,
  onValuePress,
  primaryColor,
  textColor,
}: {
  value: string;
  symbol: string;
  selected: boolean;
  isLeftColumn: boolean;
  onValuePress?: () => void;
  primaryColor: string;
  textColor: string;
}) {
  const numberColor = selected ? primaryColor : textColor;
  const symbolColor = selected ? primaryColor : textColor;
  const symbolWeight = selected ? '900' : ('bold' as const);

  const display = (
    <View style={staticStyles.valueDisplay}>
      <Text
        numberOfLines={1}
        adjustsFontSizeToFit
        style={[staticStyles.valueNumber, { color: numberColor }]}
      >
        {value}
      </Text>
      <Text
        numberOfLines={1}
        adjustsFontSizeToFit
        style={[staticStyles.valueSymbol, { color: symbolColor, fontWeight: symbolWeight }]}
      >
        {symbol}
      </Text>
    </View>
  );

  if (isLeftColumn && onValuePress) {
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={onValuePress}>
        {display}
      </TouchableOpacity>
    );
  }

  return display;
});

// ─── Main Component ───────────────────────────────────────────────────────────

export default React.memo(function UnitRow({
  item,
  selected = false,
  onPress,
  showStar = false,
  isLeftColumn = false,
  onValuePress,
  onStarPress,
}: Props) {
  const theme = useTheme();
  const themed = useThemedStyles(theme);

  const symbol = item.symbol ?? item.shortLabel;
  const hasValue = item.value !== undefined && item.value !== null;
  const showValue = isLeftColumn ? selected && hasValue : hasValue;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => onPress?.(item.key)}
      style={[staticStyles.unitRow, {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: themed.borderColor,
      }]}
    >
      {showStar && (
        <TouchableOpacity
          style={staticStyles.favoriteButton}
          onPress={() => onStarPress?.(item.key)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <MaterialCommunityIcons
            name={item.isFavorite ? 'star' : 'star-outline'}
            size={30}
            color={item.isFavorite ? themed.primaryColor : themed.textSecondary}
          />
        </TouchableOpacity>
      )}

      <View style={staticStyles.unitContent}>

        {showValue && (
          <UnitValueDisplay
            value={formatValue(item.value)}
            symbol={symbol}
            selected={selected}
            isLeftColumn={isLeftColumn}
            onValuePress={onValuePress}
            primaryColor={themed.primaryColor}
            textColor={themed.textColor}
          />
        )}

        <View style={staticStyles.unitLabelContainer}>
          {!showValue && (
            <Text
              numberOfLines={1}
              style={[staticStyles.unitSymbol, { color: themed.textColor }]}
            >
              {symbol}
            </Text>
          )}
          <Text
            numberOfLines={1}
            style={[
              staticStyles.unitName,
              { color: themed.textSecondary },
              isLeftColumn && !showValue && staticStyles.unitLabelShiftDown,
            ]}
          >
            {item.name}
          </Text>
        </View>

      </View>
    </TouchableOpacity>
  );
});