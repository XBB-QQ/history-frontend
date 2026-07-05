/**
 * 研学线进度 Store
 * 使用 localStorage 持久化，记录每条研学线的完成节点和进度
 * @see ITERATIONS.md #85
 */

import { create } from 'zustand';
import { STUDY_ROUTES } from '@/data/features/storyQuests';

/** 单个节点完成状态 */
interface QuestNodeStatus {
  /** 节点 ID */
  nodeId: string;
  /** 是否已完成 */
  completed: boolean;
  /** 完成时间戳（已完成则为 Unix ms） */
  completedAt?: number;
}

/** 单条研学线进度 */
interface QuestProgress {
  /** 研学线 ID */
  routeId: string;
  /** 节点完成状态列表 */
  nodeStatuses: QuestNodeStatus[];
  /** 是否已获得印章 */
  sealObtained: boolean;
  /** 是否已读线报 */
  briefingRead: boolean;
  /** 开始时间戳 */
  startedAt: number;
}

interface QuestState {
  /** 所有研学线进度 */
  progress: Record<string, QuestProgress>;
  /** 当前正在进行的研学线 ID */
  activeRouteId: string | null;
  /** 总进度（所有节点中的完成比例） */
  overallProgress: number;
  /** 已获得印章列表 */
  sealsObtained: { routeId: string; sealName: string; icon: string; obtainedAt: number }[];

  // 动作
  /** 开始一条研学线 */
  startRoute: (routeId: string) => void;
  /** 标记节点完成 */
  markNodeComplete: (routeId: string, nodeId: string) => void;
  /** 标记线报已读 */
  readBriefing: (routeId: string) => void;
  /** 获取单条研学线进度百分比 */
  getProgressPercent: (routeId: string) => number;
  /** 获取单条研学线进度对象 */
  getQuestProgress: (routeId: string) => QuestProgress | undefined;
  /** 设置当前激活的研学线 */
  setActiveRoute: (routeId: string | null) => void;
  /** 重置某条研学线进度 */
  resetRoute: (routeId: string) => void;
  /** 重置所有进度 */
  resetAll: () => void;
}

const STORAGE_KEY = 'history_museum_quest_progress';

/** 从 localStorage 加载进度 */
function loadProgress(): QuestState['progress'] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

/** 将进度保存到 localStorage */
function saveProgress(progress: QuestState['progress']): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // localStorage 满量时静默忽略
  }
}

/** 计算单条研学线完成百分比 */
function calcProgressPercent(nodes: QuestNodeStatus[]): number {
  if (nodes.length === 0) return 0;
  const completed = nodes.filter((n) => n.completed).length;
  return Math.round((completed / nodes.length) * 100);
}

export const useQuestStore = create<QuestState>((set, get) => ({
  progress: loadProgress(),
  activeRouteId: null,
  overallProgress: 0,
  sealsObtained: [],

  startRoute: (routeId) => {
    set((state) => {
      const route = STUDY_ROUTES.find((r) => r.id === routeId);
      if (!route) return state;

      const existing = state.progress[routeId];
      const now = Date.now();

      const newProgress: QuestProgress = existing || {
        routeId,
        nodeStatuses: route.nodes.map((n) => ({ nodeId: n.id, completed: false })),
        sealObtained: false,
        briefingRead: false,
        startedAt: now,
      };

      const updated = { ...state.progress, [routeId]: newProgress };
      saveProgress(updated);

      return { progress: updated, activeRouteId: routeId };
    });
  },

  markNodeComplete: (routeId, nodeId) => {
    set((state) => {
      const progress = state.progress[routeId];
      if (!progress) return state;

      const nodeStatuses = progress.nodeStatuses.map((n) =>
        n.nodeId === nodeId ? { ...n, completed: true, completedAt: Date.now() } : n
      );

      // 检查是否全部完成
      const allDone = nodeStatuses.every((n) => n.completed);
      const sealObtained = allDone && !progress.sealObtained
        ? true
        : progress.sealObtained;

      const updated = {
        ...state.progress,
        [routeId]: { ...progress, nodeStatuses, sealObtained },
      };
      saveProgress(updated);

      // 如果刚获得印章，添加到印章列表
      if (sealObtained && !progress.sealObtained) {
        const route = STUDY_ROUTES.find((r) => r.id === routeId);
        const newSeals = route
          ? [
              ...state.sealsObtained,
              {
                routeId,
                sealName: route.seal.name,
                icon: route.seal.icon,
                obtainedAt: Date.now(),
              },
            ]
          : state.sealsObtained;
        return { progress: updated, sealsObtained: newSeals };
      }

      return { progress: updated };
    });
  },

  readBriefing: (routeId) => {
    set((state) => {
      const progress = state.progress[routeId];
      if (!progress) return state;

      const updated = {
        ...state.progress,
        [routeId]: { ...progress, briefingRead: true },
      };
      saveProgress(updated);
      return { progress: updated };
    });
  },

  getProgressPercent: (routeId) => {
    const progress = get().progress[routeId];
    if (!progress) return 0;
    return calcProgressPercent(progress.nodeStatuses);
  },

  getQuestProgress: (routeId) => {
    return get().progress[routeId];
  },

  setActiveRoute: (routeId) => {
    set({ activeRouteId: routeId });
  },

  resetRoute: (routeId) => {
    set((state) => {
      const updated = { ...state.progress };
      delete updated[routeId];
      saveProgress(updated);
      return {
        progress: updated,
        activeRouteId: state.activeRouteId === routeId ? null : state.activeRouteId,
      };
    });
  },

  resetAll: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ progress: {}, activeRouteId: null, sealsObtained: [] });
  },
}));
