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

const STORAGE_KEY = 'history_museum_persona';

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

/** 将 persona 保存到 localStorage */
function savePersona(persona: UserPersona): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(persona));
  } catch {
    // localStorage 满量时静默忽略
  }
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
}));

/** 便捷 Hook — 获取 persona 上下文字符串（供 LLM prompt 使用） */
export function usePersonaContext(): string {
  const getContext = usePersonaStore((s) => s.getContext);
  const ctx = getContext();
  const parts = [ctx.dynastySummary, ctx.personSummary, ctx.personalitySummary]
    .filter(Boolean);
  return parts.join('\n');
}
