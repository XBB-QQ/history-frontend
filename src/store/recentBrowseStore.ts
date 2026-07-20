/**
 * 最近浏览记录 store
 * @see ITERATIONS.md #89 A1
 *
 * 跨页面记录用户浏览过的事件/人物/朝代/知识卡片，localStorage 持久化
 * 首页「继续浏览」条显示最近 5 条，点击直达详情
 * 各详情页面 openDetail 时调用 recordVisit()
 */

import { create } from 'zustand';

const STORAGE_KEY = 'history_museum_recent_browse';
const MAX_ITEMS = 10;

export type RecentItemType = 'event' | 'person' | 'dynasty' | 'knowledge';

export interface RecentItem {
  type: RecentItemType;
  id: string;
  title: string;
  subtitle: string;
  link: string;
  visitedAt: number;
}

interface RecentBrowseState {
  items: RecentItem[];
  recordVisit: (item: Omit<RecentItem, 'visitedAt'>) => void;
  clear: () => void;
}

function loadItems(): RecentItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as RecentItem[];
  } catch {
    return [];
  }
}

function saveItems(items: RecentItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // 静默忽略
  }
}

export const useRecentBrowseStore = create<RecentBrowseState>((set, get) => ({
  items: loadItems(),

  recordVisit: (item) => {
    const prev = get().items;
    // 去重（同 type+id 视为同一项，更新 visitedAt 和信息）
    const filtered = prev.filter(i => !(i.type === item.type && i.id === item.id));
    const next = [{ ...item, visitedAt: Date.now() }, ...filtered].slice(0, MAX_ITEMS);
    saveItems(next);
    set({ items: next });
  },

  clear: () => {
    saveItems([]);
    set({ items: [] });
  },
}));
