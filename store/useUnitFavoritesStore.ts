import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, PersistStorage } from 'zustand/middleware';

type UnitFavoritesState = {
  unitFavorites: string[];
  favoritesFilterEnabled: boolean;
  toggleUnitFavorite: (unitKey: string) => void;
  isUnitFavorite: (unitKey: string) => boolean;
  toggleFavoritesFilter: () => void;
  clearFavoritesFilter: () => void;
};

const storage: PersistStorage<UnitFavoritesState> = {
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

export const useUnitFavoritesStore = create<UnitFavoritesState>()(
  persist(
    (set, get) => ({
      unitFavorites: [],
      favoritesFilterEnabled: false,
      toggleUnitFavorite: (unitKey: string) => {
        set((state) => {
          const exists = state.unitFavorites.includes(unitKey);
          return {
            unitFavorites: exists
              ? state.unitFavorites.filter((k) => k !== unitKey)
              : [...state.unitFavorites, unitKey],
          };
        });
      },
      isUnitFavorite: (unitKey: string) => {
        return get().unitFavorites.includes(unitKey);
      },
      toggleFavoritesFilter: () => {
        set((state) => ({
          favoritesFilterEnabled: !state.favoritesFilterEnabled,
        }));
      },
      clearFavoritesFilter: () => {
        set({ favoritesFilterEnabled: false });
      },
    }),
    {
      name: 'unit-favorites-storage',
      storage,
    }
  )
);

export default useUnitFavoritesStore;
