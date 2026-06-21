import { create } from 'zustand';
import type { EventItem } from '@/types';

export type TimeZoom = 'millennium' | 'century' | 'decade';

interface TimelineFilter {
  category: string | null;
  dynasty: string | null;
  zoom: TimeZoom;
  search: string;
}

const ZOOM_YEAR_RANGES: Record<TimeZoom, number> = {
  millennium: 1000,
  century: 100,
  decade: 10,
};

function filterByZoom(events: EventItem[], zoom: TimeZoom) {
  const bucket = ZOOM_YEAR_RANGES[zoom];
  return events.filter((ev) => {
    if (ev.year === null) return false;
    return ev.year % bucket === 0;
  });
}

function filterByCategory(events: EventItem[], category: string | null) {
  return category ? events.filter((e) => e.category === category) : events;
}

function filterByDynasty(events: EventItem[], dynasty: string | null) {
  return dynasty ? events.filter((e) => e.dynasty === dynasty) : events;
}

function filterBySearch(events: EventItem[], query: string) {
  if (!query.trim()) return events;
  const q = query.toLowerCase();
  return events.filter(
    (e) =>
      e.title.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q) ||
      e.tags.some((t) => t.includes(q))
  );
}

export interface TimelineState {
  filters: TimelineFilter;
  filteredEvents: EventItem[];
  allCategories: Set<string>;
  allDynasties: Set<string>;

  setZoom: (zoom: TimeZoom) => void;
  setCategory: (category: string | null) => void;
  setDynasty: (dynasty: string | null) => void;
  setSearch: (query: string) => void;
  resetFilters: () => void;
  refresh: (events: EventItem[]) => void;
}

export const useTimelineStore = create<TimelineState>((set, get) => ({
  filters: { category: null, dynasty: null, zoom: 'century', search: '' },
  filteredEvents: [],
  allCategories: new Set(),
  allDynasties: new Set(),

  setZoom: (zoom) => {
    set({ filters: { ...get().filters, zoom } });
    get()._applyFilters();
  },
  setCategory: (category) => {
    set({ filters: { ...get().filters, category } });
    get()._applyFilters();
  },
  setDynasty: (dynasty) => {
    set({ filters: { ...get().filters, dynasty } });
    get()._applyFilters();
  },
  setSearch: (search) => {
    set({ filters: { ...get().filters, search } });
    get()._applyFilters();
  },
  resetFilters: () => {
    set({ filters: { category: null, dynasty: null, zoom: 'century', search: '' } });
    get()._applyFilters();
  },

  refresh: (events) => {
    const categories = new Set(events.map((e) => e.category));
    const dynasties = new Set(events.map((e) => e.dynasty));
    // 先更新数据再过滤
    set({ allCategories: categories, allDynasties: dynasties }, false as never);
    get()._applyFilters(events);
  },

  // 内部方法：应用所有过滤器
  _applyFilters: (events?: EventItem[]) => {
    const { filters } = get();
    const source = events ?? get().filteredEvents;
    let result = [...source];
    result = filterByZoom(result, filters.zoom);
    result = filterByCategory(result, filters.category);
    result = filterByDynasty(result, filters.dynasty);
    result = filterBySearch(result, filters.search);
    set({ filteredEvents: result });
  },
}));
