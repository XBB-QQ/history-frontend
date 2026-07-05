/**
 * AI 记忆中枢 — 统一用户画像类型
 * 跨辩论/史官/抉择/邮筒/谥号收集用户行为数据，供所有 AI prompt 注入
 * @see ITERATIONS.md #88
 */

/** 用户画像维度 */
export interface PersonaDimensions {
  /** 军事倾向 0-100 */
  military: number;
  /** 智慧倾向 0-100 */
  wisdom: number;
  /** 文治倾向 0-100 */
  governance: number;
  /** 人格魅力 0-100 */
  charisma: number;
}

/** 用户画像 */
export interface UserPersona {
  /** 最常浏览的朝代 */
  favoriteDynasties: string[];
  /** 最常浏览的人物 */
  favoritePersons: string[];
  /** 最常浏览的事件 */
  favoriteEvents: string[];
  /** 辩论立场记录 */
  debateStances: DebateStance[];
  /** 历史抉择记录 */
  simulatorChoices: SimulatorChoice[];
  /** 浏览摘要（最近浏览的页面类型和数量） */
  browseSummary: BrowseSummary;
  /** 答题正确率 */
  quizAccuracy: number;
  /** 性格维度 */
  dimensions: PersonaDimensions;
  /** 匹配的历史人物 */
  matchedFigure?: string;
  /** 最后更新时间 */
  lastUpdated: number;
  /** 清除后重置时间 */
  clearedAt?: number;
}

/** 辩论立场 */
export interface DebateStance {
  /** 话题 ID */
  topicId: string;
  /** 话题名称 */
  topicName: string;
  /** 用户选择的立场 */
  stance: 'pro' | 'con' | 'neutral';
  /** 用户的评论 */
  comment?: string;
  /** 时间戳 */
  timestamp: number;
}

/** 历史抉择 */
export interface SimulatorChoice {
  /** 场景 ID */
  scenarioId: string;
  /** 场景名称 */
  scenarioName: string;
  /** 用户的选择 */
  choice: string;
  /** 选择后果 */
  consequence?: string;
  /** 时间戳 */
  timestamp: number;
}

/** 浏览摘要 */
export interface BrowseSummary {
  /** 事件页面浏览次数 */
  eventsViewed: number;
  /** 人物页面浏览次数 */
  personsViewed: number;
  /** 朝代页面浏览次数 */
  dynastiesViewed: number;
  /** 知识卡片浏览次数 */
  knowledgeViewed: number;
  /** 专题文章阅读次数 */
  topicsRead: number;
  /** 最近阅读的朝代（按时间倒序） */
  recentDynasties: string[];
  /** 最近阅读的人物（按时间倒序） */
  recentPersons: string[];
}

/** 用于注入 LLM prompt 的紧凑摘要（≤500 token） */
export interface PersonaContext {
  /** 朝代偏好摘要 */
  dynastySummary: string;
  /** 人物偏好摘要 */
  personSummary: string;
  /** 辩论立场摘要 */
  debateSummary: string;
  /** 抉择行为摘要 */
  simulatorSummary: string;
  /** 性格画像摘要 */
  personalitySummary: string;
  /** 完整 JSON 字符串（供程序注入） */
  rawJson: string;
}

/** 清除 persona 确认 */
export interface ClearPersonaConfirm {
  /** 是否需要确认 */
  needsConfirm: boolean;
  /** 已记录的数据量 */
  dataCount: number;
}
