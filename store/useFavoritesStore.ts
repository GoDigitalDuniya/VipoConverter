import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, PersistStorage } from 'zustand/middleware';

type CategoryFavoritesState = {
  categoryFavorites: string[];
  toggleCategoryFavorite: (categoryKey: string) => void;
  isCategoryFavorite: (categoryKey: string) => boolean;
};

const storage: PersistStorage<CategoryFavoritesState> = {
  getItem: async (name) => {
    const item = await AsyncStorage.getItem(name);
    return item ? JSON.parse(item) : null;
  },
  setItem: async (name, value) => {
    await AsyncStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: async (name) => {
    await AsyncStorage.removeItem(name);
  },
};

export const useFavoritesStore = create<CategoryFavoritesState>()(
  persist(
    (set, get) => ({
      categoryFavorites: [],
      toggleCategoryFavorite: (categoryKey: string) => {
        set((state) => {
          const exists = state.categoryFavorites.includes(categoryKey);
          return {
            categoryFavorites: exists
              ? state.categoryFavorites.filter((k) => k !== categoryKey)
              : [...state.categoryFavorites, categoryKey],
          };
        });
      },
      isCategoryFavorite: (categoryKey: string) => {
        return get().categoryFavorites.includes(categoryKey);
      },
    }),
    {
      name: 'category-favorites-storage',
      storage,
    }
  )
);

export default useFavoritesStore;
