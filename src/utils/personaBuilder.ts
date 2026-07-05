/**
 * AI 记忆中枢 — Persona Builder 工具
 * 将用户画像压缩为 ≤500 token 的上下文摘要，供 LLM prompt 注入
 * @see ITERATIONS.md #88
 */

import type { UserPersona, PersonaContext } from '@/types/userPersona';

/** 最大 token 数 */
const MAX_TOKENS = 500;

/** 估算 token 数（中文约 1.5 字符/token） */
function estimateTokens(text: string): number {
  return Math.ceil(text.length / 1.5);
}

/**
 * 构建紧凑的 persona 上下文
 * 输出格式适合直接拼接到 LLM system prompt
 */
export function buildPersonaContext(persona: UserPersona): PersonaContext {
  // 朝代偏好
  const dynastySummary =
    persona.favoriteDynasties.length > 0
      ? `偏好朝代：${persona.favoriteDynasties.slice(0, 5).join('、')}`
      : `近期浏览：${persona.browseSummary.recentDynasties.slice(0, 5).join('、')}`;

  // 人物偏好
  const personSummary =
    persona.favoritePersons.length > 0
      ? `关注人物：${persona.favoritePersons.slice(0, 5).join('、')}`
      : `近期浏览：${persona.browseSummary.recentPersons.slice(0, 5).join('、')}`;

  // 辩论立场
  const debateSummary =
    persona.debateStances.length > 0
      ? `辩论${persona.debateStances.length}次，立场：${persona.debateStances
          .slice(-3)
          .map((s) => `${s.topicName}→${s.stance}`)
          .join('、')}`
      : '暂无辩论记录';

  // 抉择行为
  const simulatorSummary =
    persona.simulatorChoices.length > 0
      ? `抉择${persona.simulatorChoices.length}次：${persona.simulatorChoices
          .slice(-3)
          .map((c) => `${c.scenarioName}→${c.choice.slice(0, 20)}`)
          .join('、')}`
      : '暂无抉择记录';

  // 性格画像
  const personalitySummary = `文治${persona.dimensions.governance}/武功${persona.dimensions.military}/智略${persona.dimensions.wisdom}/博学${persona.dimensions.charisma}${
    persona.matchedFigure ? `，最像：${persona.matchedFigure}` : ''
  }`;

  const raw = {
    dynastySummary,
    personSummary,
    debateSummary,
    simulatorSummary,
    personalitySummary,
    quizAccuracy: persona.quizAccuracy,
    browseCounts: {
      events: persona.browseSummary.eventsViewed,
      persons: persona.browseSummary.personsViewed,
      dynasties: persona.browseSummary.dynastiesViewed,
      knowledge: persona.browseSummary.knowledgeViewed,
    },
  };

  return {
    dynastySummary,
    personSummary,
    debateSummary,
    simulatorSummary,
    personalitySummary,
    rawJson: JSON.stringify(raw),
  };
}

/**
 * 将 persona 上下文拼接为 LLM system prompt 片段
 * 确保不超过 MAX_TOKENS
 */
export function buildPersonaPrompt(persona: UserPersona): string {
  const ctx = buildPersonaContext(persona);
  const parts = [
    `【用户画像】`,
    `朝代偏好：${ctx.dynastySummary}`,
    `人物偏好：${ctx.personSummary}`,
    `性格画像：${ctx.personalitySummary}`,
    ctx.debateSummary !== '暂无辩论记录' ? `辩论记录：${ctx.debateSummary}` : '',
    ctx.simulatorSummary !== '暂无抉择记录' ? `抉择记录：${ctx.simulatorSummary}` : '',
  ].filter(Boolean);

  let prompt = parts.join('\n');

  // 如果超过 token 限制，截断详细信息
  if (estimateTokens(prompt) > MAX_TOKENS) {
    const trimmedParts = parts.slice(0, 3); // 只保留前三项
    prompt = trimmedParts.join('\n');
  }

  return prompt;
}

/**
 * 检查 persona 是否有足够数据
 */
export function hasEnoughData(persona: UserPersona): boolean {
  const count =
    persona.favoriteDynasties.length +
    persona.favoritePersons.length +
    persona.debateStances.length +
    persona.simulatorChoices.length +
    persona.browseSummary.eventsViewed +
    persona.browseSummary.personsViewed +
    persona.browseSummary.dynastiesViewed;

  return count >= 3;
}

/**
 * 获取 persona 数据量统计
 */
export function getPersonaStats(persona: UserPersona): Record<string, number> {
  return {
    dynasties: persona.favoriteDynasties.length,
    persons: persona.favoritePersons.length,
    debates: persona.debateStances.length,
    choices: persona.simulatorChoices.length,
    eventsViewed: persona.browseSummary.eventsViewed,
    personsViewed: persona.browseSummary.personsViewed,
    dynastiesViewed: persona.browseSummary.dynastiesViewed,
    knowledgeViewed: persona.browseSummary.knowledgeViewed,
    topicsRead: persona.browseSummary.topicsRead,
    total:
      persona.favoriteDynasties.length +
      persona.favoritePersons.length +
      persona.debateStances.length +
      persona.simulatorChoices.length +
      persona.browseSummary.eventsViewed +
      persona.browseSummary.personsViewed +
      persona.browseSummary.dynastiesViewed +
      persona.browseSummary.knowledgeViewed +
      persona.browseSummary.topicsRead,
  };
}
