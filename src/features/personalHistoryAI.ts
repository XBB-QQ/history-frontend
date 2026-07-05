/**
 * 个人史册 — LLM 著史功能
 * @see ITERATIONS.md #90
 *
 * 将用户的个人历史数据转化为文言文风格的传记，
 * 类似《史记》列传体的个人传记生成。
 */

import { callLLM, type LLMMessage } from '@/utils/llmClient';
import { hasApiKey } from '@/utils/llmConfig';
import type { PersonalHistory } from '@/data/features/personalHistoryData';
import type { UserPersona } from '@/types/userPersona';

/** LLM 生成的传记结果 */
export interface PersonalBiography {
  /** 正史体传记（文言文风格） */
  formalBiography: string;
  /** 现代语译（白话文翻译） */
  modernTranslation: string;
  /** 史官评语 */
  historianComment: string;
  /** 人生阶段划分 */
  lifeStages: LifeStage[];
  /** 人生关键词标签 */
  keywords: string[];
}

/** 人生阶段 */
export interface LifeStage {
  /** 阶段名称 */
  name: string;
  /** 时间范围 */
  period: string;
  /** 主要事件 */
  events: string[];
  /** 阶段特征 */
  characteristic: string;
}

/**
 * 将个人历史数据转化为 LLM 可理解的格式
 */
function formatPersonalHistory(history: PersonalHistory): string {
  const lines: string[] = [];

  // 基本信息
  lines.push(`【姓名】${history.name}`);
  lines.push(`【性别】${history.gender === 'male' ? '男' : history.gender === 'female' ? '女' : '其他'}`);
  lines.push(`【生辰】${history.birthDate}`);
  lines.push(`【籍贯】${history.birthLocation}`);

  // 教育背景
  if (history.education?.school) {
    lines.push(`【学业】${history.education.school}${history.education.major ? ' · ' + history.education.major : ''}${history.education.degree ? ' · ' + history.education.degree : ''}${history.education.year ? '（' + history.education.year + '年）' : ''}`);
  }

  // 工作经历
  if (history.work?.company) {
    lines.push(`【职业】${history.work.company}${history.work.position ? ' · ' + history.work.position : ''}${history.work.industry ? '（' + history.work.industry + '行业）' : ''}`);
  }

  // 人生大事
  if (history.lifeEvents.length > 0) {
    lines.push('');
    lines.push('【生平大事】');
    history.lifeEvents.sort((a, b) => a.date.localeCompare(b.date)).forEach(event => {
      lines.push(`  ${event.date} · ${event.title}${event.location ? '（' + event.location + '）' : ''}：${event.description}`);
    });
  }

  // 现有简介
  if (history.biography) {
    lines.push('');
    lines.push(`【原简介】${history.biography}`);
  }

  return lines.join('\n');
}

/**
 * 生成个人传记（LLM 著史）
 */
export async function generatePersonalBiography(
  history: PersonalHistory,
  persona?: UserPersona,
): Promise<PersonalBiography> {
  if (!hasApiKey()) {
    throw new Error('请先配置 API Key — 点击页面右上角"⚙️ 配置"按钮');
  }

  const personaInjection = persona
    ? `\n\n--- AI 记忆中枢 ---\n这位用户关注人物${persona.favoritePersons.join('、') || '众多'}，朝代偏好${persona.favoriteDynasties.join('、') || '广泛'}，性格维度：文治${persona.dimensions.governance}/武功${persona.dimensions.military}/智略${persona.dimensions.wisdom}/博学${persona.dimensions.charisma}`
    : '';

  const formattedHistory = formatPersonalHistory(history);

  const messages: LLMMessage[] = [
    {
      role: 'system',
      content: `你是"五千年史馆"的史官，擅长以《史记》列传体风格为人物立传。${personaInjection}

现在有一位用户希望将自己的个人历史编纂成一篇古典风格的传记。

请根据提供的个人历史信息，生成以下内容：

1. **正史体传记**（300-500字）：模仿《史记》列传体，用文言文风格书写，要典雅庄重，包含人物的生平事迹、主要成就和精神品格。注意：虽然文体是文言文风格，但内容是现代人的人生。

2. **现代语译**（200-300字）：将正史体传记翻译成现代白话文，方便阅读。

3. **史官评语**（50-100字）：模仿太史公曰的形式，对人物一生做简要评价。

4. **人生阶段划分**：将人生分为几个阶段（如求学时期、事业起步、成家立业等），每个阶段列出主要事件和特征。

5. **人生关键词**：提取 5-8 个概括这个人一生的关键词。

请按以下 JSON 格式输出（确保是合法 JSON）：
{
  "formalBiography": "正史体传记（文言文风格）",
  "modernTranslation": "现代语译（白话文）",
  "historianComment": "史官评语（太史公曰风格）",
  "lifeStages": [
    {
      "name": "阶段名称",
      "period": "时间范围",
      "events": ["事件1", "事件2"],
      "characteristic": "阶段特征描述"
    }
  ],
  "keywords": ["关键词1", "关键词2", "..."]
}

注意：
- 正史体要用古典文言风格，但要让现代读者能看懂
- 人生阶段要合理划分，体现人生的不同篇章
- 关键词要精炼准确，概括人生命运`,
    },
    {
      role: 'user',
      content: `请为以下人物编纂传记：\n\n${formattedHistory}`,
    },
  ];

  const raw = await callLLM(messages, { maxTokens: 1500, temperature: 0.8 });

  // 提取 JSON
  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    try {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        formalBiography: parsed.formalBiography || '',
        modernTranslation: parsed.modernTranslation || '',
        historianComment: parsed.historianComment || '',
        lifeStages: Array.isArray(parsed.lifeStages) ? parsed.lifeStages : [],
        keywords: Array.isArray(parsed.keywords) ? parsed.keywords.slice(0, 8) : [],
      };
    } catch {
      // JSON 解析失败，返回默认值
    }
  }

  return {
    formalBiography: raw,
    modernTranslation: '',
    historianComment: '',
    lifeStages: [],
    keywords: [],
  };
}

/**
 * 生成人物谥号（简化版）
 */
export async function generatePosthumousTitle(history: PersonalHistory): Promise<{
  title: string;
  explanation: string;
}> {
  if (!hasApiKey()) {
    throw new Error('请先配置 API Key');
  }

  const messages: LLMMessage[] = [
    {
      role: 'system',
      content: `你是"五千年史馆"的谥号专家。请根据人物的生平事迹，为其拟定一个古典风格的谥号。

请按以下 JSON 格式输出：
{
  "title": "谥号（2-3个字）",
  "explanation": "谥号含义解释（50字以内）"
}

注意：谥号要贴合人物生平，解释要简明扼要。`,
    },
    {
      role: 'user',
      content: `请为以下人物拟定谥号：\n姓名：${history.name}\n${formatPersonalHistory(history)}`,
    },
  ];

  const raw = await callLLM(messages, { maxTokens: 200, temperature: 0.7 });

  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    try {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        title: parsed.title || '未知',
        explanation: parsed.explanation || '',
      };
    } catch {
      // 返回默认值
    }
  }

  return {
    title: '未知',
    explanation: raw,
  };
}
