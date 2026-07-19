import { create } from 'zustand';
import { fetchCharEvolutionByChar, type CharEvolutionData } from '@/services/api';

interface CharEvolutionState {
  /** char → 字源数据；null 表示已抓取且失败；key 不存在表示未抓取 */
  cache: Record<string, CharEvolutionData | null>;
  /** 命中即返回 cache，未命中调 API 并写入 cache；返回 null 表示该字无字源数据 */
  getOrFetch: (char: string) => Promise<CharEvolutionData | null>;
  /** 批量预抓取（用于 OracleBoneGamePage 字典区前 N 字预加载） */
  prefetch: (chars: string[]) => Promise<void>;
  /** 仅供测试或重置场景使用 */
  clear: () => void;
}

export const useCharEvolutionStore = create<CharEvolutionState>((set, get) => ({
  cache: {},

  getOrFetch: async (char) => {
    const cache = get().cache;
    if (cache[char] !== undefined) {
      return cache[char];
    }
    try {
      const data = await fetchCharEvolutionByChar(char);
      const entry =
        data && data.stages && data.stages.length > 0 ? data : null;
      set((state) => ({ cache: { ...state.cache, [char]: entry } }));
      return entry;
    } catch {
      set((state) => ({ cache: { ...state.cache, [char]: null } }));
      return null;
    }
  },

  prefetch: async (chars) => {
    await Promise.all(chars.map((ch) => get().getOrFetch(ch)));
  },

  clear: () => set({ cache: {} }),
}));
