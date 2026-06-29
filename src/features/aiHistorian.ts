/**
 * AI 史官 — 个性化叙事生成
 * @see history-museum/design/002-innovation-brainstorm.md §3
 *
 * 根据用户浏览行为，用文言文风格生成"你的史官评语"
 */

import { callLLM, type LLMMessage } from '@/utils/llmClient';

export interface UserPortrait {
  /** 最常浏览的朝代 */
  topDynasties: string[];
  /** 最关注的人物 */
  topPersons: string[];
  /** 答题正确率 */
  quizAccuracy?: number;
  /** 总浏览时长 */
  totalVisits?: number;
  /** 性格画像维度 */
  dimensions?: {
    military: number;
    wisdom: number;
    governance: number;
    charisma: number;
  };
  /** 匹配的历史人物 */
  matchedFigure?: string;
}

export interface HistorianComment {
  /** 正史体评语（文言文） */
  formal: string;
  /** 稗官体评语（通俗有趣） */
  anecdotal: string;
  /** 谥议体评语（正式谥号格式） */
  eulogy: string;
  /** 建议学习方向 */
  suggestion: string;
}

/** 生成史官评语 */
export async function generateHistorianComment(portrait: UserPortrait): Promise<HistorianComment> {
  const portraitDesc = [
    `常览朝代：${portrait.topDynasties.join('、')}`,
    `关注人物：${portrait.topPersons.join('、')}`,
    portrait.quizAccuracy ? `答题正确率：${portrait.quizAccuracy}%` : '',
    portrait.dimensions ? `性格维度：文治${portrait.dimensions.governance}/武功${portrait.dimensions.military}/智略${portrait.dimensions.wisdom}/博学${portrait.dimensions.charisma}` : '',
    portrait.matchedFigure ? `最像的历史人物：${portrait.matchedFigure}` : '',
  ].filter(Boolean).join('\n');

  const messages: LLMMessage[] = [
    {
      role: 'system',
      content: `你是"五千年史馆"的 AI 史官，负责为每位访客撰写个性化评语。

你需要用三种风格撰写：
1. 正史体：模仿《史记》人物列传的风格，用文言文评价此人
2. 稗官体：用民间说书的风格，通俗有趣，像茶馆里的故事
3. 谥议体：模仿古代谥号评定格式，如"某某皇帝，谥曰XX，XX之君也"

格式要求：
- 每种风格各 100-150 字
- 最后给出一条学习建议（30字以内）
- 使用以下 JSON 格式输出：
{
  "formal": "正史体评语",
  "anecdotal": "稗官体评语",
  "eulogy": "谥议体评语",
  "suggestion": "学习建议"
}`,
    },
    {
      role: 'user',
      content: `请为以下访客撰写史官评语：\n\n${portraitDesc}`,
    },
  ];

  const raw = await callLLM(messages, { maxTokens: 800, temperature: 0.8 });

  // 尝试解析 JSON
  try {
    // 提取 JSON 部分（可能被 markdown code block 包裹）
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        formal: parsed.formal || '',
        anecdotal: parsed.anecdotal || '',
        eulogy: parsed.eulogy || '',
        suggestion: parsed.suggestion || '',
      };
    }
  } catch {
    // JSON 解析失败，返回原始文本
  }

  return {
    formal: raw,
    anecdotal: '',
    eulogy: '',
    suggestion: '',
  };
}

/** 基于浏览历史构建用户画像（简化版，从 localStorage） */
export function buildUserPortraitFromStorage(): UserPortrait {
  // 从收藏列表获取关注的人物
  const favoritesRaw = localStorage.getItem('favorite-storage');
  const favorites = favoritesRaw ? JSON.parse(favoritesRaw) : { state: { favorites: [] } };

  const personItems = (favorites.state?.favorites || [])
    .filter((f: any) => f.type === 'person')
    .map((f: any) => f.item?.name || f.id);

  // 从答题记录获取正确率
  const quizRaw = localStorage.getItem('quiz-storage');
  const quiz = quizRaw ? JSON.parse(quizRaw) : {};

  // 从画像报告获取维度
  const profileRaw = localStorage.getItem('profile-report-storage');
  const profile = profileRaw ? JSON.parse(profileRaw) : {};
  const dimensions = profile.state?.dimensions || profile.dimensions;
  const matchedFigure = profile.state?.matchedFigure || profile.matchedFigure;

  // 从浏览历史获取朝代（简化：取收藏中的朝代）
  const dynastyItems = (favorites.state?.favorites || [])
    .filter((f: any) => f.type === 'dynasty')
    .map((f: any) => f.item?.name || f.id);

  return {
    topDynasties: dynastyItems.length > 0 ? dynastyItems : ['唐', '宋', '三国'],
    topPersons: personItems.length > 0 ? personItems : ['李白', '诸葛亮'],
    quizAccuracy: quiz.state?.accuracy ?? quiz.accuracy,
    dimensions,
    matchedFigure,
  };
}
