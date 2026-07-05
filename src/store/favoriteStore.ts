import { create } from 'zustand';
import { addFavorite as apiAdd, removeFavorite as apiRemove, togglePinFavorite as apiTogglePin, fetchFavorites, type FavoriteEntry } from '@/services/api';

interface LocalFavoriteEntry {
  id: string;
  type: 'event' | 'person' | 'dynasty' | 'knowledge';
  title: string;
  pinned: boolean;
  addedAt: number;
}

export interface FavoriteState {
  favorites: LocalFavoriteEntry[];
  isFavorite: (id: string) => boolean;
  addFavorite: (entry: Omit<LocalFavoriteEntry, 'pinned' | 'addedAt'>) => void;
  removeFavorite: (id: string) => void;
  togglePin: (id: string) => void;
  toggleFavorite: (entry: Omit<LocalFavoriteEntry, 'pinned' | 'addedAt'>) => boolean;
  loadFavorites: () => Promise<void>;
}

/** 从 localStorage 读取收藏列表 */
function loadFavoritesLocal(): LocalFavoriteEntry[] {
  try {
    const stored = localStorage.getItem('favorites');
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore
  }
  return [];
}

/** 保存收藏列表到 localStorage */
function saveFavoritesLocal(favorites: LocalFavoriteEntry[]) {
  try {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  } catch {
    // ignore
  }
}

export const useFavoriteStore = create<FavoriteState>((set, get) => ({
  favorites: loadFavoritesLocal(),

  isFavorite: (id) => get().favorites.some((f) => f.id === id),

  addFavorite: (entry) => {
    const existing = get().favorites.find((f) => f.id === entry.id);
    if (existing) return;

    // 尝试同步到后端
    apiAdd({ resourceType: entry.type, resourceId: Number(entry.id), title: entry.title }).catch(() => {});

    const newEntry: LocalFavoriteEntry = {
      ...entry,
      pinned: false,
      addedAt: Date.now(),
    };
    set((state) => {
      const updated = [...state.favorites, newEntry];
      // 超过 50 条清理最旧的
      const cleaned = updated.length > 50 ? updated.slice(-50) : updated;
      saveFavoritesLocal(cleaned);
      return { favorites: cleaned };
    });
  },

  removeFavorite: (id) => {
    // 尝试同步到后端
    apiRemove(Number(id)).catch(() => {});
    set((state) => {
      const updated = state.favorites.filter((f) => f.id !== id);
      saveFavoritesLocal(updated);
      return { favorites: updated };
    });
  },

  togglePin: (id) => {
    // 尝试同步到后端
    apiTogglePin(Number(id)).catch(() => {});
    set((state) => {
      const updated = state.favorites.map((f) =>
        f.id === id ? { ...f, pinned: !f.pinned } : f
      );
      saveFavoritesLocal(updated);
      return { favorites: updated };
    });
  },

  toggleFavorite: (entry) => {
    const state = get();
    if (state.isFavorite(entry.id)) {
      state.removeFavorite(entry.id);
      return false;
    }
    state.addFavorite(entry);
    return true;
  },

  loadFavorites: async () => {
    try {
      const backend = await fetchFavorites();
      if (backend.length > 0) {
        const converted: LocalFavoriteEntry[] = backend.map((f) => ({
          id: String(f.resourceId),
          type: f.resourceType,
          title: f.title,
          pinned: f.pinned,
          addedAt: new Date(f.createdAt).getTime(),
        }));
        saveFavoritesLocal(converted);
        set({ favorites: converted });
      }
    } catch {
      // 后端不可用时使用本地存储
      set({ favorites: loadFavoritesLocal() });
    }
  },
}));
