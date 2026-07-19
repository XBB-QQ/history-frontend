/**
 * AI 记忆中枢 — Persona Store
 * 跨所有 AI 功能统一收集用户行为，持久化到 localStorage
 * @see ITERATIONS.md #88
 */

import { create } from 'zustand';
import type {
  UserPersona,
  PersonaDimensions,
  DebateStance,
  SimulatorChoice,
  BrowseSummary,
  PersonaContext,
} from '@/types/userPersona';
import { useUserStore } from '@/store/userStore';
import * as personaApi from '@/services/personaApi';

const STORAGE_KEY = 'history_museum_persona';

let syncTimer: ReturnType<typeof setTimeout> | null = null;

/** 防抖同步到后端（2 秒内多次变更只 PUT 一次，未登录静默跳过） */
function scheduleBackendSync(persona: UserPersona): void {
  const token = useUserStore.getState().token;
  if (!token) return;
  if (syncTimer) clearTimeout(syncTimer);
  syncTimer = setTimeout(() => {
    syncTimer = null;
    personaApi.savePersona(token, persona).catch(() => {
      // 同步失败静默，localStorage 仍有数据
    });
  }, 2000);
}

const DEFAULT_DIMENSIONS: PersonaDimensions = {
  military: 50,
  wisdom: 50,
  governance: 50,
  charisma: 50,
};

/** 从 localStorage 加载 persona */
function loadPersona(): UserPersona | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/** 将 persona 保存到 localStorage，并触发防抖后端同步 */
function savePersona(persona: UserPersona): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(persona));
  } catch {
    // localStorage 满量时静默忽略
  }
  scheduleBackendSync(persona);
}

/** 从现有数据源构建初始 persona */
function buildInitialPersona(): UserPersona {
  const existing = loadPersona();
  if (existing) return existing;

  // 从收藏数据获取偏好
  try {
    const favRaw = localStorage.getItem('favorite-storage');
    const fav = favRaw ? JSON.parse(favRaw) : null;
    const favorites = fav?.state?.favorites || [];

    const favoriteDynasties: string[] = Array.from(
      new Set(
        favorites
          .filter((f: any) => f.type === 'dynasty')
          .map((f: any) => f.item?.name || f.id)
      )
    );

    const favoritePersons: string[] = Array.from(
      new Set(
        favorites
          .filter((f: any) => f.type === 'person')
          .map((f: any) => f.item?.name || f.id)
      )
    );

    // 从画像报告获取维度
    let dimensions = DEFAULT_DIMENSIONS;
    let matchedFigure: string | undefined;
    try {
      const profileRaw = localStorage.getItem('profile-report-storage');
      const profile = profileRaw ? JSON.parse(profileRaw) : null;
      dimensions = profile?.state?.dimensions || profile?.dimensions || DEFAULT_DIMENSIONS;
      matchedFigure = profile?.state?.matchedFigure || profile?.matchedFigure;
    } catch {}

    return {
      favoriteDynasties,
      favoritePersons,
      favoriteEvents: [],
      debateStances: [],
      simulatorChoices: [],
      browseSummary: {
        eventsViewed: 0,
        personsViewed: 0,
        dynastiesViewed: favoriteDynasties.length,
        knowledgeViewed: 0,
        topicsRead: 0,
        recentDynasties: favoriteDynasties.slice(0, 5),
        recentPersons: favoritePersons.slice(0, 5),
      },
      quizAccuracy: 0,
      dimensions,
      matchedFigure,
      lastUpdated: Date.now(),
    };
  } catch {
    return {
      favoriteDynasties: [],
      favoritePersons: [],
      favoriteEvents: [],
      debateStances: [],
      simulatorChoices: [],
      browseSummary: {
        eventsViewed: 0,
        personsViewed: 0,
        dynastiesViewed: 0,
        knowledgeViewed: 0,
        topicsRead: 0,
        recentDynasties: [],
        recentPersons: [],
      },
      quizAccuracy: 0,
      dimensions: DEFAULT_DIMENSIONS,
      lastUpdated: Date.now(),
    };
  }
}

interface PersonaState {
  persona: UserPersona | null;
  hasData: boolean;
  dataCount: number;

  // 行为记录
  recordDebate: (stance: Omit<DebateStance, 'timestamp'>) => void;
  recordSimulatorChoice: (choice: Omit<SimulatorChoice, 'timestamp'>) => void;
  recordBrowse: (type: keyof Omit<BrowseSummary, 'recentDynasties' | 'recentPersons'>, dynasty?: string, personName?: string) => void;
  recordQuiz: (accuracy: number) => void;

  // 查询
  getContext: () => PersonaContext;
  getDataCount: () => number;

  // 管理
  clearPersona: () => void;
  reset: () => void;

  // 跨设备同步
  loadFromBackend: () => Promise<void>;
}

export const usePersonaStore = create<PersonaState>((set, get) => ({
  persona: buildInitialPersona(),
  hasData: false,
  dataCount: 0,

  recordDebate: (stance) => {
    set((state) => {
      const persona = state.persona || buildInitialPersona();
      if (!persona) return state;

      const debateStances = [...persona.debateStances, { ...stance, timestamp: Date.now() }];
      const updated = { ...persona, debateStances, lastUpdated: Date.now() };
      savePersona(updated);
      return { persona: updated };
    });
  },

  recordSimulatorChoice: (choice) => {
    set((state) => {
      const persona = state.persona || buildInitialPersona();
      if (!persona) return state;

      const simulatorChoices = [...persona.simulatorChoices, { ...choice, timestamp: Date.now() }];
      const updated = { ...persona, simulatorChoices, lastUpdated: Date.now() };
      savePersona(updated);
      return { persona: updated };
    });
  },

  recordBrowse: (type, dynasty, personName) => {
    set((state) => {
      const persona = state.persona || buildInitialPersona();
      if (!persona) return state;

      const summary = { ...persona.browseSummary };
      if (type in summary) {
        (summary as any)[type] = ((summary as any)[type] || 0) + 1;
      }

      // 更新最近浏览
      if (dynasty && !summary.recentDynasties.includes(dynasty)) {
        summary.recentDynasties = [dynasty, ...summary.recentDynasties].slice(0, 10);
      }
      if (personName && !summary.recentPersons.includes(personName)) {
        summary.recentPersons = [personName, ...summary.recentPersons].slice(0, 10);
      }

      const updated = {
        ...persona,
        browseSummary: summary,
        lastUpdated: Date.now(),
      };
      savePersona(updated);
      return { persona: updated };
    });
  },

  recordQuiz: (accuracy) => {
    set((state) => {
      const persona = state.persona || buildInitialPersona();
      if (!persona) return state;

      // 取最新记录
      const quizAccuracy = accuracy;
      const updated = { ...persona, quizAccuracy, lastUpdated: Date.now() };
      savePersona(updated);
      return { persona: updated };
    });
  },

  getContext: () => {
    const persona = get().persona;
    if (!persona) {
      return {
        dynastySummary: '',
        personSummary: '',
        debateSummary: '',
        simulatorSummary: '',
        personalitySummary: '',
        rawJson: '{}',
      };
    }

    return {
      dynastySummary: persona.favoriteDynasties.length > 0
        ? `偏好朝代：${persona.favoriteDynasties.join('、')}，近期浏览：${persona.browseSummary.recentDynasties.join('、')}`
        : '暂无朝代偏好数据',
      personSummary: persona.favoritePersons.length > 0
        ? `关注人物：${persona.favoritePersons.join('、')}`
        : '暂无人物偏好数据',
      debateSummary: persona.debateStances.length > 0
        ? `参与辩论 ${persona.debateStances.length} 次，立场分布：${persona.debateStances.map((s) => s.stance).join('、')}`
        : '暂无辩论记录',
      simulatorSummary: persona.simulatorChoices.length > 0
        ? `历史抉择 ${persona.simulatorChoices.length} 次`
        : '暂无抉择记录',
      personalitySummary: `性格维度：文治${persona.dimensions.governance}/武功${persona.dimensions.military}/智略${persona.dimensions.wisdom}/博学${persona.dimensions.charisma}${persona.matchedFigure ? `，最像：${persona.matchedFigure}` : ''}`,
      rawJson: JSON.stringify(persona),
    };
  },

  getDataCount: () => {
    const persona = get().persona;
    if (!persona) return 0;
    return (
      persona.favoriteDynasties.length +
      persona.favoritePersons.length +
      persona.debateStances.length +
      persona.simulatorChoices.length +
      persona.browseSummary.eventsViewed +
      persona.browseSummary.personsViewed +
      persona.browseSummary.dynastiesViewed +
      persona.browseSummary.knowledgeViewed +
      persona.browseSummary.topicsRead
    );
  },

  clearPersona: () => {
    set((state) => {
      const persona = state.persona || buildInitialPersona();
      if (!persona) return state;

      const cleared = {
        ...persona,
        favoriteDynasties: [],
        favoritePersons: [],
        favoriteEvents: [],
        debateStances: [],
        simulatorChoices: [],
        browseSummary: {
          eventsViewed: 0,
          personsViewed: 0,
          dynastiesViewed: 0,
          knowledgeViewed: 0,
          topicsRead: 0,
          recentDynasties: [],
          recentPersons: [],
        },
        quizAccuracy: 0,
        dimensions: DEFAULT_DIMENSIONS,
        matchedFigure: undefined,
        clearedAt: Date.now(),
        lastUpdated: Date.now(),
      };
      savePersona(cleared);
      return { persona: cleared };
    });
  },

  reset: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ persona: null, hasData: false, dataCount: 0 });
  },

  loadFromBackend: async () => {
    const token = useUserStore.getState().token;
    if (!token) return;
    try {
      const cloud = await personaApi.fetchPersona(token);
      if (cloud) {
        // 云端优先：覆盖本地
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(cloud));
        } catch {
          // localStorage 写入失败静默
        }
        set({ persona: cloud });
      }
      // 云端无数据时本地保留不变（首次跨设备登录云端还没数据）
    } catch {
      // 拉取失败保留本地
    }
  },
}));

/** 便捷 Hook — 获取 persona 上下文字符串（供 LLM prompt 使用） */
export function usePersonaContext(): string {
  const getContext = usePersonaStore((s) => s.getContext);
  const ctx = getContext();
  const parts = [ctx.dynastySummary, ctx.personSummary, ctx.personalitySummary]
    .filter(Boolean);
  return parts.join('\n');
}

// ===== 跨设备同步触发器 =====
// 1. 模块加载时若已登录（userStore.init 已从 localStorage 恢复 token），拉取一次云端画像
if (useUserStore.getState().token) {
  usePersonaStore.getState().loadFromBackend();
}

// 2. 监听登录状态变化：token null→value 时拉取云端画像（云端优先覆盖本地）
useUserStore.subscribe((state, prevState) => {
  if (state.token !== prevState.token && state.token) {
    usePersonaStore.getState().loadFromBackend();
  }
});
