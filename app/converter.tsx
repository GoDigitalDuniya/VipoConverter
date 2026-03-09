import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FavoriteToast from '../components/FavoriteToast';
import useFavoritesStore from '../store/useFavoritesStore';
import useSettingsStore from '../store/useSettingsStore';
import { useTheme } from '../theme/ThemeProvider';

type DashboardStyle = 'grid' | 'list';

type CategoryItem = {
  key: string;
  title: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
};

const ALL_CATEGORIES: CategoryItem[] = [
  { key: 'angles', title: 'Angles', icon: 'angle-acute' },
  { key: 'area', title: 'Area', icon: 'ruler-square' },
  { key: 'calorie', title: 'Calorie', icon: 'fire' },
  { key: 'currency', title: 'Currency', icon: 'currency-usd' },
  { key: 'current', title: 'Current', icon: 'current-ac' },
  { key: 'data', title: 'Data', icon: 'database' },
  { key: 'density', title: 'Density', icon: 'barcode' },
  { key: 'distance', title: 'Distance', icon: 'map-marker-distance' },
  { key: 'dynamic-viscosity', title: 'Dynamic viscosity', icon: 'water' },
  { key: 'electric-charge', title: 'Electric Charge', icon: 'flash' },
  { key: 'energy', title: 'Energy', icon: 'lightning-bolt' },
  { key: 'force', title: 'Force', icon: 'weight-lifter' },
  { key: 'frequency', title: 'Frequency', icon: 'waveform' },
  { key: 'fuel-consumption', title: 'Fuel Consumption', icon: 'gas-station' },
  { key: 'illumination', title: 'Illumination', icon: 'lightbulb-on' },
  { key: 'kinetic-viscosity', title: 'Kinetic viscosity', icon: 'water-outline' },
  { key: 'moment-of-inertia', title: 'Moment of inertia', icon: 'rotate-orbit' },
  { key: 'numbers', title: 'Numbers', icon: 'numeric' },
  { key: 'power', title: 'Power', icon: 'flash-outline' },
  { key: 'prefixes', title: 'Prefixes', icon: 'alphabetical' },
  { key: 'pressure', title: 'Pressure', icon: 'gauge' },
  { key: 'radiation-absorbed', title: 'Radiation Absorbed', icon: 'radioactive' },
  { key: 'radioactivity', title: 'Radio-activity', icon: 'radioactive-circle' },
  { key: 'speed', title: 'Speed', icon: 'speedometer' },
  { key: 'strength', title: 'Strength', icon: 'dumbbell' },
  { key: 'temperature', title: 'Temperature', icon: 'thermometer' },
  { key: 'time', title: 'Time', icon: 'clock-outline' },
  { key: 'torque', title: 'Torque', icon: 'rotate-3d' },
  { key: 'typography', title: 'Typography', icon: 'format-text' },
  { key: 'vacuum', title: 'Vacuum', icon: 'weather-windy' },
  { key: 'volume', title: 'Volume', icon: 'beaker' },
  { key: 'volume-flow-rate', title: 'Volume flow rate', icon: 'waves' },
  { key: 'weight', title: 'Weight', icon: 'scale' },
  { key: 'bmi-calculator', title: 'BMI Calculator', icon: 'calculator' },
  { key: 'business', title: 'Business', icon: 'chart-line' },
  { key: 'clothing', title: 'Clothing', icon: 'tshirt-crew' },
  { key: 'shoe-size', title: 'Shoe Size', icon: 'shoe-print' },
  { key: 'glucose', title: 'Glucose', icon: 'blood-bag' },
  { key: 'hex-decimal-binary', title: 'Hex Decimal Binary', icon: 'code-tags' },
  { key: 'pace', title: 'Pace', icon: 'run' },
  { key: 'percentage', title: 'Percentage', icon: 'percent' },
  { key: 'power-plugs', title: 'Power Plugs', icon: 'power-plug' },
  { key: 'timezone', title: 'TimeZone', icon: 'earth' },
];

function SearchHeader({
  value,
  onChangeText,
  onHistoryPress,
  onStarPress,
  starActive,
  t,
}: {
  value: string;
  onChangeText: (v: string) => void;
  onHistoryPress: () => void;
  onStarPress: () => void;
  starActive: boolean;
  t: ReturnType<typeof useTheme>;
}) {
  return (
    <View style={[styles.topRow]}>
      <View style={[styles.searchContainer, { backgroundColor: t.colors.background, borderColor: t.colors.border }]}>
        <MaterialCommunityIcons name="magnify" size={24} color={t.colors.textSecondary} style={{ marginHorizontal: 8 }} />
        <TextInput
          placeholder="Units"
          placeholderTextColor={t.colors.textSecondary}
          value={value}
          onChangeText={onChangeText}
          style={[styles.searchInput, { color: t.colors.textSecondary }]}
          underlineColorAndroid="transparent"
        />
      </View>

      <TouchableOpacity style={styles.iconButton} onPress={onHistoryPress}>
        <MaterialCommunityIcons name="history" size={32} color={t.colors.primary} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconButton} onPress={onStarPress}>
        <MaterialCommunityIcons name={starActive ? 'star' : 'star-outline'} size={34} color={starActive ? t.colors.primary : t.colors.primary} />
      </TouchableOpacity>
    </View>
  );
}

const CategoryCard = React.memo(function CategoryCard({
  item,
  layout,
  onPress,
  onToggleFavorite,
  t,
}: {
  item: CategoryItem;
  layout: DashboardStyle;
  onPress: (key: string) => void;
  onToggleFavorite: (key: string, added: boolean) => void;
  t: ReturnType<typeof useTheme>;
}) {
  const isFav = useFavoritesStore(useCallback((s) => s.categoryFavorites.includes(item.key), [item.key]));
  const toggleFavorite = useFavoritesStore((s) => s.toggleCategoryFavorite);

  const handleToggle = useCallback(() => {
    toggleFavorite(item.key);
    onToggleFavorite(item.key, !isFav);
  }, [item.key, isFav, toggleFavorite, onToggleFavorite]);

  if (layout === 'grid') {
    return (
      <TouchableOpacity
        style={[styles.gridCard]}
        onPress={() => onPress(item.key)}
        onLongPress={handleToggle}
        delayLongPress={300}
      >
        <MaterialCommunityIcons name={item.icon} size={48} color={t.colors.primary} />
        <View style={{ alignItems: 'center' }}>
          {isFav ? (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons name="star" size={28} color={t.colors.primary} style={{ marginRight: 6 }} />
              <Text style={[styles.gridTitle, { color: t.colors.text }]} numberOfLines={2}>{item.title}</Text>
            </View>
          ) : (
            <Text style={[styles.gridTitle, { color: t.colors.text }]} numberOfLines={2}>{item.title}</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={[styles.listRow, { borderBottomColor: t.colors.border }]} onPress={() => onPress(item.key)}>
      <View style={styles.listLeft}>
        <MaterialCommunityIcons name={item.icon} size={30} color={t.colors.primary} />
      </View>
      <View style={styles.listCenter}>
        <Text style={[styles.listTitle, { color: t.colors.text }]}>{item.title}</Text>
      </View>
      <View style={styles.listRight}>
        <TouchableOpacity onPress={handleToggle} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <MaterialCommunityIcons name={isFav ? 'star' : 'star-outline'} size={30} color={isFav ? t.colors.primary : t.colors.primary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
});

export default function ConverterScreen() {
  const t = useTheme();
  const dashboardStyle = useSettingsStore((s) => s.dashboardStyle) as DashboardStyle;

  const [query, setQuery] = useState('');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const categoryFavorites = useFavoritesStore((s) => s.categoryFavorites);

  const categories = useMemo(() => ALL_CATEGORIES, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = categories;
    if (q) list = categories.filter((c) => c.title.toLowerCase().includes(q));
    if (showOnlyFavorites) list = list.filter((c) => categoryFavorites.includes(c.key));
    return list;
  }, [categories, query, showOnlyFavorites, categoryFavorites]);

  const [toastVisible, setToastVisible] = useState(false);
  const [toastCategory, setToastCategory] = useState('');
  const [toastAction, setToastAction] = useState<'added' | 'removed'>('added');

  const keyExtractor = useCallback((item: CategoryItem) => item.key, []);

  const router = useRouter();

  const onPressCategory = useCallback((key: string) => {
    router.push(`/category/${key}` as any);
  }, [router]);

  const onHistoryPress = useCallback(() => {
    console.log('History pressed');
  }, []);

  const handleToggleFavorite = useCallback((key: string, added: boolean) => {
    const cat = ALL_CATEGORIES.find((c) => c.key === key);
    setToastCategory(cat ? cat.title : key);
    setToastAction(added ? 'added' : 'removed');
    setToastVisible(true);
  }, []);

  const onStarPress = useCallback(() => {
    setShowOnlyFavorites((s) => !s);
  }, []);

  const renderItem = useCallback(({ item }: ListRenderItemInfo<CategoryItem>) => {
    return <CategoryCard item={item} layout={dashboardStyle} onPress={onPressCategory} onToggleFavorite={handleToggleFavorite} t={t} />;
  }, [dashboardStyle, onPressCategory, t, handleToggleFavorite]);

  return (
    <View style={[styles.container, { backgroundColor: t.colors.background }]}> 
      <SearchHeader value={query} onChangeText={setQuery} onHistoryPress={onHistoryPress} onStarPress={onStarPress} starActive={showOnlyFavorites} t={t} />

      {filtered.length === 0 ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          {showOnlyFavorites ? (
            <Text style={{ color: t.colors.textSecondary }}>No Favorites Yet</Text>
          ) : (
            <Text style={{ color: t.colors.textSecondary }}>No Results</Text>
          )}
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          numColumns={dashboardStyle === 'grid' ? 2 : 1}
          contentContainerStyle={styles.listContainer}
          columnWrapperStyle={dashboardStyle === 'grid' ? styles.columnWrapper : undefined}
          removeClippedSubviews={Platform.OS === 'android'}
          showsVerticalScrollIndicator={false}
        />
      )}

      <FavoriteToast visible={toastVisible} categoryName={toastCategory} action={toastAction} onDismiss={() => setToastVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    marginRight: 8,
    height: 40,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 6,
    paddingRight: 12,
  },
  iconButton: {
    paddingHorizontal: 4,
    paddingVertical: 6,
  },
  listContainer: {
    paddingHorizontal: 4,
    paddingBottom: 24,
  },
  columnWrapper: {
    justifyContent: 'flex-start',
  },
  gridCard: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  gridTitle: {
    fontSize: 14,
    textAlign: 'center',
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  listLeft: {
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listCenter: {
    flex: 1,
  },
  listRight: {
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listTitle: {
    fontSize: 16,
  },
});
