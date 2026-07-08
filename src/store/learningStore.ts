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
  resourceName?: string;
  lastViewed: string;
}

/** 按资源类型聚合的学习进度 */
export interface ModuleProgress {
  type: string;
  label: string;
  icon: string;
  viewed: number;
  total: number;
  percent: number;
  items: ProgressItem[];
}

/** 各资源类型的总数量（从后端获取，前端硬编码兜底） */
const TOTAL_COUNTS: Record<string, number> = {
  event: 28,
  person: 60,
  dynasty: 14,
  knowledge: 30,
};

const TYPE_LABELS: Record<string, { label: string; icon: string }> = {
  event: { label: '事件', icon: '📜' },
  person: { label: '人物', icon: '👤' },
  dynasty: { label: '朝代', icon: '🏛️' },
  knowledge: { label: '知识卡片', icon: '💡' },
};

interface LearningState {
  lists: ReadingListItem[];
  progress: ProgressItem[];
  /** 各模块聚合进度 */
  moduleProgress: ModuleProgress[];
  loading: boolean;
  fetchLists: () => Promise<void>;
  fetchProgress: () => Promise<void>;
  createList: (name: string, description?: string) => Promise<ReadingListItem>;
  addResource: (listId: number, type: string, id: number, title: string) => Promise<void>;
  removeResource: (listId: number, resourceId: number) => Promise<void>;
}

/** 将原始进度聚合为模块进度 */
function aggregateModuleProgress(progress: ProgressItem[]): ModuleProgress[] {
  const groups = new Map<string, ProgressItem[]>();
  for (const item of progress) {
    const list = groups.get(item.resourceType) || [];
    list.push(item);
    groups.set(item.resourceType, list);
  }

  return Array.from(groups.entries()).map(([type, items]) => {
    const total = TOTAL_COUNTS[type] || items.length * 2; // 兜底：预估总量
    const viewed = items.reduce((sum, i) => sum + i.viewCount, 0);
    const label = TYPE_LABELS[type]?.label || type;
    const icon = TYPE_LABELS[type]?.icon || '📋';
    return {
      type,
      label,
      icon,
      viewed: items.length,
      total,
      percent: Math.min(100, Math.round((viewed / total) * 100)),
      items,
    };
  }).sort((a, b) => b.percent - a.percent);
}

export const useLearningStore = create<LearningState>((set, get) => ({
  lists: [],
  progress: [],
  moduleProgress: [],
  loading: false,

  fetchLists: async () => {
    try {
      const token = localStorage.getItem('user_token');
      if (!token) return;
      const res = await fetch(`/api/learning/lists`, {
        headers: { 'X-User-Id': token || '' },
      });
      if (res.ok) {
        const data = await res.json();
        set({ lists: data });
      }
    } catch {}
  },

  fetchProgress: async () => {
    try {
      const token = localStorage.getItem('user_token');
      if (!token) return;
      const res = await fetch(`/api/learning/progress`, {
        headers: { 'X-User-Id': token || '' },
      });
      if (res.ok) {
        const data = await res.json();
        const moduleProgress = aggregateModuleProgress(data);
        set({ progress: data, moduleProgress });
      }
    } catch {}
  },

  createList: async (name, description = '') => {
    const token = localStorage.getItem('user_token');
    const res = await fetch(`/api/learning/lists`, {
      method: 'POST',
      headers: {
        'X-User-Id': token || '',
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
    await fetch(`/api/learning/lists/${listId}/resources`, {
      method: 'POST',
      headers: {
        'X-User-Id': token || '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ resourceType: type, resourceId: id, title }),
    });
    // Refresh lists
    await get().fetchLists();
  },

  removeResource: async (listId, resourceId) => {
    const token = localStorage.getItem('user_token');
    await fetch(`/api/learning/lists/${listId}/resources/${resourceId}`, {
      method: 'DELETE',
      headers: { 'X-User-Id': token || '' },
    });
    await get().fetchLists();
  },
}));
