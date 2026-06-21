import { create } from 'zustand';

interface FavoriteEntry {
  id: string;
  type: 'event' | 'person' | 'dynasty' | 'knowledge';
  title: string;
  pinned: boolean; // 置顶标记
}

export interface FavoriteState {
  favorites: FavoriteEntry[];
  isFavorite: (id: string) => boolean;
  addFavorite: (entry: Omit<FavoriteEntry, 'pinned'>) => void;
  removeFavorite: (id: string) => void;
  togglePin: (id: string) => void;
  clearOldFavorites: () => void; // 清理超过 20 条的旧收藏
}

export const useFavoriteStore = create<FavoriteState>((set, get) => ({
  favorites: [],

  isFavorite: (id) => get().favorites.some((f) => f.id === id),

  addFavorite: (entry) => {
    const existing = get().favorites.find((f) => f.id === entry.id);
    if (existing) return; // 已存在则不重复添加

    const newEntry: FavoriteEntry = { ...entry, pinned: false };
    const updated = [...get().favorites, newEntry];
    // 超过 20 条自动清理最旧的
    const cleaned = updated.length > 20 ? updated.slice(-20) : updated;
    set({ favorites: cleaned });
  },

  removeFavorite: (id) => {
    set({ favorites: get().favorites.filter((f) => f.id !== id) });
  },

  togglePin: (id) => {
    set({
      favorites: get().favorites.map((f) =>
        f.id === id ? { ...f, pinned: !f.pinned } : f
      ),
    });
  },

  clearOldFavorites: () => {
    const favs = get().favorites;
    if (favs.length <= 20) return;
    set({ favorites: favs.slice(-20) });
  },
}));
