import { create } from 'zustand';
import type { FrontendEvent, FrontendPerson, FrontendDynasty, FrontendKnowledge, DetailType } from '@/services/api';

interface DetailState {
  isOpen: boolean;
  type: DetailType | null;
  id: number | null;
  uid: string | null;
  data: FrontendEvent | FrontendPerson | FrontendDynasty | FrontendKnowledge | null;
  openDetail: (type: DetailType, id: number, data: FrontendEvent | FrontendPerson | FrontendDynasty | FrontendKnowledge) => void;
  closeDetail: () => void;
}

export const useDetailStore = create<DetailState>((set) => ({
  isOpen: false,
  type: null,
  id: null,
  uid: null,
  data: null,
  openDetail: (type, id, data) => {
    const uid = 'uid' in data ? data.uid : null;
    set({ isOpen: true, type, id, uid: uid ?? null, data });
  },
  closeDetail: () => set({ isOpen: false, type: null, id: null, uid: null, data: null }),
}));
