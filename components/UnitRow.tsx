import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export type UnitItem = {
  key: string;
  shortLabel: string;
  name: string;
  value: number | string;
  isFavorite?: boolean;
};

function formatValue(v: number | string | undefined | null) {
  if (v === undefined || v === null || v === '') return '0';
  const n = Number(v);
  if (!Number.isFinite(n)) return String(v);
  return String(v);
}

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

export default React.memo(function UnitRow({
  item,
  selected,
  onPress,
  showStar = false,
  isLeftColumn = false,
  onValuePress,
  onStarPress,
}: Props) {
  const theme = useTheme();
  const styles = createStyles(theme, selected);

  const showValueInline = isLeftColumn && selected && (item.value !== undefined && item.value !== null);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => onPress?.(item.key)}
      style={styles.row}
    >
      {/* Star (Only Left Column when enabled) */}
      {showStar && (
        <TouchableOpacity
          style={styles.starContainer}
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

      <View style={styles.content}>

        {/* LEFT COLUMN STRUCTURE */}
        {isLeftColumn ? (
          <View style={styles.leftColumnWrapper}>

            {/* Value Inline (Selected Only) */}
            {showValueInline && (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={onValuePress}
                style={styles.inlineValueContainer}
              >
                    <Text style={styles.inlineValue}>
                      {formatValue(item.value)}
                    </Text>
                <Text style={styles.inlineUnit}>
                  {item.shortLabel}
                </Text>
              </TouchableOpacity>
            )}

            {/* Unit Name */}
            <View style={styles.leftText}>
              {!showValueInline && (
                <Text style={styles.shortLabel}>
                  {item.shortLabel}
                </Text>
              )}
              <Text style={styles.name}>
                {item.name}
              </Text>
            </View>
          </View>
        ) : (
          /* RIGHT COLUMN STRUCTURE */
          <View style={styles.rightColumnWrapper}>
            {(item.value !== undefined && item.value !== null) && (
              <>
                <View style={styles.rightValueContainer}>
                  <Text style={styles.value}>
                    {formatValue(item.value)}
                  </Text>
                  <Text style={styles.valueUnit}>
                    {item.shortLabel}
                  </Text>
                </View>
                <Text style={styles.name}>
                  {item.name}
                </Text>
              </>
            )}
          </View>
        )}

      </View>
    </TouchableOpacity>
  );
});

const createStyles = (theme: any, selected?: boolean) =>
  StyleSheet.create({
    row: {
      height: ROW_HEIGHT,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.colors.border,
    },

    starContainer: {
      marginRight: 6,
    },

    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-end',
    },

    /* -------- LEFT COLUMN -------- */

    leftColumnWrapper: {
      alignItems: 'flex-end',
      justifyContent: 'center',
      width: '100%',
    },

    inlineValueContainer: {
      flexDirection: 'row',
      alignItems: 'baseline',
      justifyContent: 'flex-end',
      marginBottom: 2,
    },

    inlineValue: {
      fontSize: 16,
      fontWeight: '800',
      color: theme.colors.primary,
      marginRight: 4,
      textAlign: 'right',
    },

    inlineUnit: {
      fontSize: 12,
      fontWeight: '900',
      color: theme.colors.primary,
      textAlign: 'right',
    },

    leftText: {
      alignItems: 'flex-end',
      justifyContent: 'center',
    },

    shortLabel: {
      fontSize: 12,
      fontWeight: 'bold',
      opacity: 0.5,
      color: theme.colors.textSecondary,
      textAlign: 'right',
    },

    name: {
      fontSize: 13,
      marginTop: 2,
      color: theme.colors.text,
      textAlign: 'right',
    },

    /* -------- RIGHT COLUMN -------- */

    rightColumnWrapper: {
      alignItems: 'flex-end',
      justifyContent: 'center',
      width: '100%',
    },

    rightValueContainer: {
      flexDirection: 'row',
      alignItems: 'baseline',
      justifyContent: 'flex-end',
    },

    value: {
      fontSize: 16,
      fontWeight: '800',
      color: selected ? theme.colors.primary : theme.colors.text,
      opacity: selected ? 1 : 0.5,   // slightly dim non-selected values
      marginRight: 4,
      textAlign: 'right',
    },

    valueUnit: {
      fontSize: 12,
      fontWeight: selected ? '900' : 'bold',       // matches inlineUnit vs shortLabel weight
      color: selected ? theme.colors.primary : theme.colors.textSecondary, // matches shortLabel color
      opacity: selected ? 1 : 0.5,                 // matches shortLabel opacity exactly
      textAlign: 'right',
    },
  });

