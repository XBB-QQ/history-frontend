/**
 * 历史决策模拟器 — 类型定义
 * @see history-museum/design/000-future-roadmap.md §方向三 §3.1
 */

export type ChoiceOutcome =
  | 'historical'    // 与真实历史一致
  | 'alternate'     // 平行历史推演
  | 'failed';       // 失败结局

export interface Choice {
  id: string;
  text: string;
  description: string;
  outcome: ChoiceOutcome;
  /** 结果文案 */
  result: string;
  /** 平行历史推演（仅 alternate 类型） */
  alternateTimeline?: string;
  /** 历史可信度评分 0-100 */
  plausibility?: number;
}

export interface Scenario {
  id: string;
  title: string;
  yearDisplay: string;
  dynasty: string;
  /** 场景背景 */
  background: string;
  /** 决策者身份 */
  role: string;
  /** 面临的抉择描述 */
  dilemma: string;
  /** 4 个选项 */
  choices: Choice[];
  /** 真实历史结果 */
  historicalResult: string;
  /** 学到的历史教训 */
  lesson: string;
  /** 难度 */
  difficulty: 'easy' | 'medium' | 'hard';
  /** 关联事件 uid */
  relatedEventUid?: string;
}
