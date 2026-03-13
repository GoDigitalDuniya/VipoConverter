import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
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

const ROW_HEIGHT = 72;

function formatValue(v: number | string | undefined | null): string {
  if (v === undefined || v === null || v === '') return '0';
  const n = Number(v);
  if (!Number.isFinite(n)) return String(v);
  return String(v);
}

function UnitValueDisplay({
  value,
  symbol,
  selected,
  isLeftColumn,
  onValuePress,
  styles,
}: {
  value: string;
  symbol: string;
  selected: boolean;
  isLeftColumn: boolean;
  onValuePress?: () => void;
  styles: ReturnType<typeof createStyles>;
}) {

  const display = (
    <View style={styles.valueDisplay}>
      <Text style={[styles.valueNumber, selected && styles.valueNumberSelected]}>
        {value}
      </Text>

      <Text style={[styles.valueSymbol, selected && styles.valueSymbolSelected]}>
        {symbol}
      </Text>
    </View>
  );

  // Left column allows tapping the value to open NumberPad
  if (isLeftColumn && onValuePress) {
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={onValuePress}>
        {display}
      </TouchableOpacity>
    );
  }

  return display;
}

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
  const styles = createStyles(theme);

  const symbol = item.symbol ?? item.shortLabel;

  const hasValue = item.value !== undefined && item.value !== null;

  const showValue =
    isLeftColumn
      ? selected && hasValue   // input column
      : hasValue;              // output column

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => onPress?.(item.key)}
      style={styles.unitRow}
    >
      {showStar && (
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => onStarPress?.(item.key)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <MaterialCommunityIcons
            name={item.isFavorite ? 'star' : 'star-outline'}
            size={30}
            color={
              item.isFavorite
                ? theme.colors.primary
                : theme.colors.textSecondary
            }
          />
        </TouchableOpacity>
      )}

      {/* Unit Content */}

      <View style={styles.unitContent}>

        {/* Value Display */}

        {showValue && (
          <UnitValueDisplay
            value={formatValue(item.value)}
            symbol={symbol}
            selected={selected}
            isLeftColumn={isLeftColumn}
            onValuePress={onValuePress}
            styles={styles}
          />
        )}

        {/* Unit Labels */}

        <View style={styles.unitLabelContainer}>

          {!showValue && (
            <Text style={styles.unitSymbol}>
              {symbol}
            </Text>
          )}

          <Text style={[styles.unitName, isLeftColumn && !showValue && styles.unitLabelShiftDown,]}>
            {item.name}
          </Text>

        </View>

      </View>

    </TouchableOpacity>
  );
});

// ─── Styles (UNCHANGED) ───────────────────────────────────────────────────────

const createStyles = (theme: ReturnType<typeof useTheme>) =>
  StyleSheet.create({

    unitRow: {
      height: ROW_HEIGHT,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.colors.border,
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
      color: theme.colors.text,
      marginRight: 4,
      textAlign: 'right',
    },

    valueNumberSelected: {
      color: theme.colors.primary,
    },

    valueSymbol: {
      fontSize: 14,
      fontWeight: 'bold',
      color: theme.colors.text,
      textAlign: 'right',
    },

    valueSymbolSelected: {
      fontWeight: '900',
      color: theme.colors.primary,
    },

    unitLabelContainer: {
      alignItems: 'flex-end',
    },

    unitSymbol: {
      fontSize: 14,
      fontWeight: 'bold',
      color: theme.colors.text,
      textAlign: 'right',
    },

    unitName: {
      fontSize: 14,
      marginTop: 2,
      color: theme.colors.textSecondary,
      textAlign: 'right',
    },

    unitLabelShiftDown: {
      marginTop: 7,
    },
  });