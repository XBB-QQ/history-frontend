/**
 * 历史审判庭 — AI 增强功能
 * @see ITERATIONS.md #89
 *
 * 提供两个 AI 能力：
 * 1. AI 法官评析 — 基于案件数据生成深度法律分析
 * 2. 你来当法官 — 用户先判案，AI 对比历史判决并点评
 */

import { callLLM, type LLMMessage } from '@/utils/llmClient';
import type { HistoricalTrial } from '@/data/features/trialData';
import type { UserPersona } from '@/types/userPersona';

/** AI 法官评析结果 */
export interface TrialAnalysis {
  /** 现代法律视角分析 */
  modernPerspective: string;
  /** 历史背景解读 */
  historicalContext: string;
  /** 关键争议点 */
  controversies: string[];
  /** 启示 */
  takeaway: string;
}

/** 用户判决输入 */
export interface UserVerdict {
  defendant: string;
  guilty: boolean;
  sentence: string;
  reason: string;
}

/** 判决对比结果 */
export interface VerdictComparison {
  /** AI 对用户判决的评价 */
  aiComment: string;
  /** 历史判决与现代法律的差异分析 */
  differenceAnalysis: string;
  /** 如果由你审判，你会怎么判 */
  yourVerdict: string;
}

/**
 * 生成案件深度分析
 */
export async function analyzeTrial(
  trial: HistoricalTrial,
  persona?: UserPersona,
): Promise<TrialAnalysis> {

  const personaInjection = persona
    ? `\n\n--- 用户画像 ---\n这位用户关注人物${persona.favoritePersons.join('、') || '众多'}，朝代偏好${persona.favoriteDynasties.join('、') || '广泛'}，性格维度：文治${persona.dimensions.governance}/武功${persona.dimensions.military}/智略${persona.dimensions.wisdom}/博学${persona.dimensions.charisma}`
    : '';

  const messages: LLMMessage[] = [
    {
      role: 'system',
      content: `你是"五千年史馆"的法学博士兼历史学家，精通古今法律。${personaInjection}

你的任务是对用户提供的历史审判案件进行深度法律分析。

请按以下 JSON 格式输出（确保是合法 JSON）：
{
  "modernPerspective": "用现代法律视角分析此案，指出其中涉及的罪名、程序正义问题等（200-300字）",
  "historicalContext": "还原当时的历史背景和法制环境，解释为什么会出现这样的审判（150-250字）",
  "controversies": ["争议点1", "争议点2", "争议点3"],
  "takeaway": "这个案件给后人的启示（50字以内）"
}

注意：
- 分析要专业但通俗，让非法律专业的读者也能理解
- 对比现代法律体系时，要说明古今法律理念的根本差异
- 争议点至少列出 2 个，最多 5 个`,
    },
    {
      role: 'user',
      content: `请分析以下历史审判案件：

【案件】${trial.title}
【朝代】${trial.dynasty}·${trial.period}
【审判者】${trial.judge}
【指控】${trial.accusation}
【辩护】${trial.defense}
【判决】${trial.verdict}
【后果】${trial.consequences.join('；')}
【历史意义】${trial.historicalSignificance}`,
    },
  ];

  const raw = await callLLM(messages, { maxTokens: 1200, temperature: 0.7 });

  // 提取 JSON
  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    try {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        modernPerspective: parsed.modernPerspective || '',
        historicalContext: parsed.historicalContext || '',
        controversies: Array.isArray(parsed.controversies) ? parsed.controversies : [],
        takeaway: parsed.takeaway || '',
      };
    } catch {
      // JSON 解析失败，返回默认值
    }
  }

  return {
    modernPerspective: raw,
    historicalContext: '',
    controversies: [],
    takeaway: '',
  };
}

/**
 * 用户判案 — AI 对比用户判决与历史判决
 */
export async function compareVerdict(
  trial: HistoricalTrial,
  userVerdict: UserVerdict,
  persona?: UserPersona,
): Promise<VerdictComparison> {

  const personaInjection = persona
    ? `\n\n--- 用户画像 ---\n这位用户关注人物${persona.favoritePersons.join('、') || '众多'}，朝代偏好${persona.favoriteDynasties.join('、') || '广泛'}，性格维度：文治${persona.dimensions.governance}/武功${persona.dimensions.military}/智略${persona.dimensions.wisdom}/博学${persona.dimensions.charisma}`
    : '';

  const messages: LLMMessage[] = [
    {
      role: 'system',
      content: `你是"五千年史馆"的法学博士兼历史学家。${personaInjection}

现在有一个"你来当法官"的互动环节。用户会对一个历史审判案件做出自己的判决，你需要：
1. 评价用户的判决思路
2. 对比用户判决与历史判决的差异及原因
3. 如果由你依据现代法律审判，你会怎么判

请按以下 JSON 格式输出：
{
  "aiComment": "对用户判决思路的评价（150-250字），肯定合理之处，指出可能的盲点",
  "differenceAnalysis": "用户判决与历史判决的差异分析，说明为什么古人会那样判（150-250字）",
  "yourVerdict": "如果依据现代法律审判此案，你会怎么判，理由是什么（200-300字）"
}

注意：
- 语气亲切但有见地，像一个耐心的导师
- 不要简单地评判对错，而是帮助用户理解历史和法律`,
    },
    {
      role: 'user',
      content: `【案件】${trial.title}
【朝代】${trial.dynasty}·${trial.period}
【审判者】${trial.judge}
【指控】${trial.accusation}
【辩护】${trial.defense}
【历史判决】${trial.verdict}

=== 你的判决 ===
被告：${userVerdict.defendant}
有罪：${userVerdict.guilty ? '是' : '否'}
量刑：${userVerdict.sentence}
理由：${userVerdict.reason}`,
    },
  ];

  const raw = await callLLM(messages, { maxTokens: 1200, temperature: 0.7 });

  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    try {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        aiComment: parsed.aiComment || '',
        differenceAnalysis: parsed.differenceAnalysis || '',
        yourVerdict: parsed.yourVerdict || '',
      };
    } catch {
      // JSON 解析失败
    }
  }

  return {
    aiComment: raw,
    differenceAnalysis: '',
    yourVerdict: '',
  };
}

/**
 * 生成案件的法律知识点科普
 */
export async function generateLegalEducation(
  trial: HistoricalTrial,
): Promise<string> {

  const messages: LLMMessage[] = [
    {
      role: 'system',
      content: `你是"五千年史馆"的法学科普作家。请用 300 字以内的通俗语言，从本案引申出一个法律知识点。

格式要求：
- 开头用一个引人思考的问题
- 中间解释古今法律理念的差异
- 结尾给一条现代法律建议

只输出纯文本，不要 JSON。不要使用 Markdown 语法（不要 ##、**、代码块等），不要使用 emoji。`,
    },
    {
      role: 'user',
      content: `案件：${trial.title}（${trial.dynasty}·${trial.period}），类型：${trial.type}，判决：${trial.verdict}`,
    },
  ];

  return callLLM(messages, { maxTokens: 400, temperature: 0.8 });
}
