import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

type Props = {
  visible: boolean;
  categoryName?: string;
  action?: 'added' | 'removed';
  onDismiss?: () => void;
};

export default function FavoriteToast({
  visible,
  categoryName = '',
  action = 'added',
  onDismiss,
}: Props) {
  const t = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let timeout: NodeJS.Timeout | number | undefined;

    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();

      timeout = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start(() => onDismiss?.());
      }, 1000);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [visible]);

  if (!visible) return null;

  const message =
    action === 'added'
      ? 'Added to Favorites'
      : 'Removed from Favorites';

  return (
    <Animated.View style={[styles.wrapper, { opacity: fadeAnim }]}>
      {/* Dark Backdrop */}
      <View style={styles.backdrop} />

      {/* Toast Card */}
      <View
        style={[
          styles.container,
          {
            backgroundColor: t.colors.surface,
            borderColor: t.colors.border,
          },
        ]}
      >
        <MaterialCommunityIcons
          name="star"
          size={40}
          color={t.colors.primary}
        />

        <Text
          style={[styles.title, { color: t.colors.text }]}
          numberOfLines={1}
        >
          {categoryName}
        </Text>

        <Text style={[styles.subtitle, { color: t.colors.textSecondary }]}>
          {message}
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)', // 👈 Clean dark overlay
  },

  container: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    minWidth: 240,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },

  title: {
    marginTop: 10,
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
  },

  subtitle: {
    marginTop: 6,
    fontSize: 13,
    textAlign: 'center',
  },
});
