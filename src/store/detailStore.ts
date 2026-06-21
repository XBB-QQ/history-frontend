import { create } from 'zustand';

interface DetailState {
  isOpen: boolean;
  type: string | null;
  id: string | null;
  data: Record<string, unknown> | null;
  openDetail: (type: string, id: string, data: Record<string, unknown>) => void;
  closeDetail: () => void;
}

export const useDetailStore = create<DetailState>((set) => ({
  isOpen: false,
  type: null,
  id: null,
  data: null,
  openDetail: (type, id, data) => set({ isOpen: true, type, id, data }),
  closeDetail: () => set({ isOpen: false, type: null, id: null, data: null }),
}));
