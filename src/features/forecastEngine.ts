/**
 * 历史预言板 — LLM 推演引擎
 * @see ITERATIONS.md #92
 *
 * 基于历史规律推演未来可能性 + 用户预测 localStorage + 预测历史对照。
 */

import { callLLM, type LLMMessage } from '@/utils/llmClient';
import type { UserPersona } from '@/types/userPersona';

/** 用户预测记录 */
export interface UserPrediction {
  id: string;
  scenario: string;
  prediction: string;
  confidence: number;
  timestamp: number;
  result?: 'correct' | 'partial' | 'wrong' | null;
}

/** LLM 推演结果 */
export interface ForecastResult {
  /** 推演结论 */
  conclusion: string;
  /** 概率评估 */
  probability: number;
  /** 关键变量 */
  keyVariables: string[];
  /** 时间窗口 */
  timeWindow: string;
  /** 不确定性说明 */
  caveats: string[];
}

/**
 * 格式化历史事件数据为 LLM 上下文
 */
function formatHistoricalContext(events: Array<{ name: string; year: number; description: string; impact: string; consequences: string[] }>): string {
  return events.map((e, i) =>
    `${i + 1}. 【${e.name}】${e.year > 0 ? e.year : Math.abs(e.year)}${e.year > 0 ? '年' : 'BC'}\n   ${e.description}\n   影响：${e.impact}\n   后果：${e.consequences.join('、')}`
  ).join('\n\n');
}

/**
 * LLM 基于历史规律推演
 */
export async function forecastFuture(
  scenario: string,
  historicalEvents: Array<{ name: string; year: number; description: string; impact: string; consequences: string[] }>,
  persona?: UserPersona,
): Promise<ForecastResult> {

  const personaInjection = persona
    ? `\n\n--- 用户画像 ---\n这位用户关注人物${persona.favoritePersons.join('、') || '众多'}，朝代偏好${persona.favoriteDynasties.join('、') || '广泛'}，性格维度：文治${persona.dimensions.governance}/武功${persona.dimensions.military}/智略${persona.dimensions.wisdom}/博学${persona.dimensions.charisma}`
    : '';

  const messages: LLMMessage[] = [
    {
      role: 'system',
      content: `你是"五千年史馆"的历史预言家。${personaInjection}

你的任务是基于历史事件规律，对用户提出的预测场景进行 LLM 推演。

请按以下 JSON 格式输出（确保是合法 JSON）：
{
  "conclusion": "推演结论（200-300字）",
  "probability": 概率数值（0-100的整数）,
  "keyVariables": ["关键变量1", "关键变量2", "关键变量3"],
  "timeWindow": "预计时间窗口（如：2030-2050年）",
  "caveats": ["不确定性说明1", "不确定性说明2"]
}

注意：
- 推演要基于历史规律，引用类似的历史事件作为参照
- 概率评估要客观，不要过于乐观或悲观
- 关键变量是影响结果的核心因素
- 不确定性说明要坦诚指出推演的局限性`,
    },
    {
      role: 'user',
      content: `请基于以下历史规律推演：${scenario}

参考历史事件：
${formatHistoricalContext(historicalEvents)}`,
    },
  ];

  const raw = await callLLM(messages, { maxTokens: 1000, temperature: 0.7 });

  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    try {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        conclusion: parsed.conclusion || '',
        probability: Math.min(100, Math.max(0, parseInt(parsed.probability) || 50)),
        keyVariables: Array.isArray(parsed.keyVariables) ? parsed.keyVariables.slice(0, 5) : [],
        timeWindow: parsed.timeWindow || '不确定',
        caveats: Array.isArray(parsed.caveats) ? parsed.caveats.slice(0, 3) : [],
      };
    } catch {
      // JSON 解析失败
    }
  }

  // 降级：返回原始文本
  return {
    conclusion: raw,
    probability: 50,
    keyVariables: [],
    timeWindow: '不确定',
    caveats: ['推演结果解析失败，请重试'],
  };
}

/**
 * 保存用户预测到 localStorage
 */
export function saveUserPrediction(prediction: Omit<UserPrediction, 'id' | 'timestamp'>): UserPrediction {
  const stored = localStorage.getItem('user-predictions');
  const predictions: UserPrediction[] = stored ? JSON.parse(stored) : [];

  const newPrediction: UserPrediction = {
    ...prediction,
    id: `pred-${Date.now()}`,
    timestamp: Date.now(),
  };

  predictions.push(newPrediction);
  localStorage.setItem('user-predictions', JSON.stringify(predictions));
  return newPrediction;
}

/**
 * 获取用户所有预测
 */
export function getUserPredictions(): UserPrediction[] {
  const stored = localStorage.getItem('user-predictions');
  return stored ? JSON.parse(stored) : [];
}

/**
 * 更新预测结果（事后对照）
 */
export function updatePredictionResult(predictionId: string, result: UserPrediction['result']): boolean {
  const stored = localStorage.getItem('user-predictions');
  if (!stored) return false;

  const predictions: UserPrediction[] = JSON.parse(stored);
  const index = predictions.findIndex(p => p.id === predictionId);
  if (index === -1) return false;

  predictions[index].result = result;
  localStorage.setItem('user-predictions', JSON.stringify(predictions));
  return true;
}

/**
 * 获取预测历史统计
 */
export function getPredictionStats(): {
  total: number;
  correct: number;
  partial: number;
  wrong: number;
  pending: number;
  accuracy: number;
} {
  const predictions = getUserPredictions();
  const resolved = predictions.filter(p => p.result);

  return {
    total: predictions.length,
    correct: resolved.filter(p => p.result === 'correct').length,
    partial: resolved.filter(p => p.result === 'partial').length,
    wrong: resolved.filter(p => p.result === 'wrong').length,
    pending: predictions.filter(p => !p.result).length,
    accuracy: resolved.length > 0
      ? Math.round(((resolved.filter(p => p.result === 'correct').length + resolved.filter(p => p.result === 'partial').length * 0.5) / resolved.length) * 100)
      : 0,
  };
}

/**
 * 预测历史对照 — 比较用户预测与 LLM 推演
 */
export async function comparePredictions(
  userPrediction: string,
  llmForecast: ForecastResult,
  scenario: string,
): Promise<{
  evaluation: string;
  alignment: 'aligned' | 'divergent' | 'complementary';
  insight: string;
}> {
  const messages: LLMMessage[] = [
    {
      role: 'system',
      content: `你是"五千年史馆"的预言分析师。请比较用户预测与 AI 推演的异同，给出综合评价。

请按以下 JSON 格式输出：
{
  "evaluation": "对用户预测与 AI 推演对比的评价（150-250字）",
  "alignment": "aligned（一致）/divergent（分歧）/complementary（互补）",
  "insight": "从对比中获得的历史洞察（50-100字）"
}

注意：
- 评价要客观公正，肯定用户的独立思考
- 如果分歧明显，分析分歧的原因
- 如果互补，说明两者如何互相补充`,
    },
    {
      role: 'user',
      content: `场景：${scenario}

用户预测：${userPrediction}

AI 推演结论：${llmForecast.conclusion}
AI 概率：${llmForecast.probability}%
AI 关键变量：${llmForecast.keyVariables.join('、')}

请对比分析。`,
    },
  ];

  const raw = await callLLM(messages, { maxTokens: 600, temperature: 0.7 });

  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    try {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        evaluation: parsed.evaluation || '',
        alignment: ['aligned', 'divergent', 'complementary'].includes(parsed.alignment)
          ? parsed.alignment
          : 'complementary',
        insight: parsed.insight || '',
      };
    } catch {
      // 降级
    }
  }

  return {
    evaluation: raw,
    alignment: 'complementary',
    insight: '',
  };
}
