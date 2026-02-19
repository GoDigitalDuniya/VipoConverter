import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, PersistStorage } from 'zustand/middleware';

type FavoritesState = {
  favorites: string[];
  toggleFavorite: (key: string) => void;
  isFavorite: (key: string) => boolean;
};

const storage: PersistStorage<FavoritesState> = {
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

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (key: string) => {
        const favs = get().favorites;
        const exists = favs.includes(key);
        if (exists) {
          set({ favorites: favs.filter((k) => k !== key) });
        } else {
          set({ favorites: Array.from(new Set([...favs, key])) });
        }
      },
      isFavorite: (key: string) => {
        return get().favorites.includes(key);
      },
    }),
    {
      name: 'favorites-storage',
      storage,
    }
  )
);

export default useFavoritesStore;
