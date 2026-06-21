import { create } from 'zustand';
import type { FrontendEvent, FrontendPerson, FrontendDynasty, FrontendKnowledge, DetailType } from '@/services/api';

interface DetailState {
  isOpen: boolean;
  type: DetailType | null;
  id: number | null;
  data: FrontendEvent | FrontendPerson | FrontendDynasty | FrontendKnowledge | null;
  openDetail: (type: DetailType, id: number, data: FrontendEvent | FrontendPerson | FrontendDynasty | FrontendKnowledge) => void;
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
