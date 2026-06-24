import { create } from 'zustand';

export interface ReadingListItem {
  id: number;
  name: string;
  description: string;
  resources: { type: string; id: number; title: string }[];
  createdAt: string;
  updatedAt: string;
}

export interface ProgressItem {
  id: number;
  resourceType: string;
  resourceId: number;
  viewCount: number;
  lastViewed: string;
}

interface LearningState {
  lists: ReadingListItem[];
  progress: ProgressItem[];
  loading: boolean;
  fetchLists: () => Promise<void>;
  createList: (name: string, description?: string) => Promise<ReadingListItem>;
  addResource: (listId: number, type: string, id: number, title: string) => Promise<void>;
  removeResource: (listId: number, resourceId: number) => Promise<void>;
}

export const useLearningStore = create<LearningState>((set, get) => ({
  lists: [],
  progress: [],
  loading: false,

  fetchLists: async () => {
    try {
      const token = localStorage.getItem('user_token');
      if (!token) return;
      const res = await fetch('/api/v1/learning/lists', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        set({ lists: data });
      }
    } catch {}
  },

  createList: async (name, description = '') => {
    const token = localStorage.getItem('user_token');
    const res = await fetch('/api/v1/learning/lists', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description }),
    });
    const data = await res.json();
    set((s) => ({ lists: [...s.lists, data] }));
    return data;
  },

  addResource: async (listId, type, id, title) => {
    const token = localStorage.getItem('user_token');
    await fetch(`/api/v1/learning/lists/${listId}/resources`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ resourceType: type, resourceId: id, title }),
    });
    // Refresh lists
    await get().fetchLists();
  },

  removeResource: async (listId, resourceId) => {
    const token = localStorage.getItem('user_token');
    await fetch(`/api/v1/learning/lists/${listId}/resources/${resourceId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    await get().fetchLists();
  },
}));
