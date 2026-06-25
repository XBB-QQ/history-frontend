/**
 * AI 历史人物对话 — 类型定义
 * @see history-museum/design/000-future-roadmap.md §方向六 §6.1
 */

export interface HistoricalFigure {
  id: string;
  name: string;
  dynasty: string;
  role: string;
  emoji: string;
  /** 人物简介 */
  bio: string;
  /** 代表作/名言 */
  quotes: string[];
  /** 说话风格 */
  speakingStyle: string;
  /** 性格特点 */
  personality: string;
  /** 专长话题 */
  topics: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ChatSession {
  figureId: string;
  messages: ChatMessage[];
  startedAt: number;
}
