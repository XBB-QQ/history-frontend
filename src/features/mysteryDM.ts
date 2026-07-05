/**
 * 历史剧本杀 — AI DM 引擎
 * @see ITERATIONS.md #91
 *
 * 提供 AI 动态审问、线索进度解锁、真相史实对照能力。
 */

import { callLLM, type LLMMessage } from '@/utils/llmClient';
import type { Script, Clue } from '@/data/features/scriptKillerData';
import type { UserPersona } from '@/types/userPersona';

/** DM 对话消息 */
export interface DMMessage {
  role: 'dm' | 'player';
  content: string;
  timestamp: number;
}

/** 线索解锁状态 */
export interface ClueUnlockState {
  clueId: string;
  revealed: boolean;
  revealCondition: string;
  revealPhase: number;
}

/** 审问结果 */
export interface InterrogationResult {
  /** DM 对角色回答的评价 */
  dmComment: string;
  /** 是否解锁新线索 */
  unlockedClues: string[];
  /** 嫌疑度变化 */
  suspicionChanges: Record<string, number>;
  /** 提示 */
  hint: string;
}

/** 真相对照结果 */
export interface TruthComparison {
  /** 用户推理评价 */
  evaluation: string;
  /** 史实对照 */
  historicalFact: string;
  /** 遗漏的关键线索 */
  missedClues: string[];
}

/**
 * 格式化剧本数据为 LLM 可理解的上下文
 */
function formatScriptContext(script: Script): string {
  const lines: string[] = [];
  lines.push(`【剧本】${script.title}`);
  lines.push(`【背景】${script.setup}`);
  lines.push(`【案件】${script.mysteryEvent.description}`);
  lines.push(`【受害者】${script.mysteryEvent.victim}`);
  lines.push('');
  lines.push('【角色列表】');
  script.characters.forEach(c => {
    lines.push(`  ${c.displayName}（${c.role}）`);
    lines.push(`    背景：${c.background}`);
    lines.push(`    动机：${c.motivations.join('、')}`);
    lines.push(`    不在场证明：${c.alibi}`);
    lines.push(`    嫌疑度：${'★'.repeat(c.suspicionLevel)}${'☆'.repeat(5 - c.suspicionLevel)}`);
  });
  lines.push('');
  lines.push('【已知线索】');
  script.mysteryEvent.keyClues.forEach((clue, i) => {
    lines.push(`  ${i + 1}. ${clue}`);
  });
  lines.push('');
  lines.push('【时间线】');
  script.mysteryEvent.timeLine.forEach(te => {
    lines.push(`  ${te.time} — ${te.description}${te.location ? `（${te.location}）` : ''}`);
  });
  lines.push('');
  lines.push(`【真相】${script.solution}`);
  return lines.join('\n');
}

/**
 * AI DM 动态审问
 * 根据用户的选择和已收集的线索，动态生成审问对话
 */
export async function interrogateCharacter(
  script: Script,
  characterId: string,
  collectedClues: Clue[],
  persona?: UserPersona,
): Promise<InterrogationResult> {

  const character = script.characters.find(c => c.id === characterId);
  if (!character) {
    throw new Error('角色不存在');
  }

  const personaInjection = persona
    ? `\n\n--- 用户画像 ---\n这位用户关注人物${persona.favoritePersons.join('、') || '众多'}，朝代偏好${persona.favoriteDynasties.join('、') || '广泛'}，性格维度：文治${persona.dimensions.governance}/武功${persona.dimensions.military}/智略${persona.dimensions.wisdom}/博学${persona.dimensions.charisma}`
    : '';

  const collectedClueNames = collectedClues.map(c => c.description).join('、');

  const messages: LLMMessage[] = [
    {
      role: 'system',
      content: `你是"五千年史馆"历史剧本杀的 AI 地下城主（DM）。${personaInjection}

你负责：
1. 扮演游戏中的各个角色，根据角色设定进行对话
2. 根据玩家已收集的线索，动态调整角色的回答
3. 在适当的时候解锁新线索
4. 保持角色性格一致，说话要有个性

当前审问的角色：${character.displayName}（${character.role}）
角色特点：${character.background}
角色台词风格：${character.testimony}
角色秘密：${character.secrets.join('、')}

玩家已收集的线索：${collectedClueNames || '无'}

请返回以下 JSON：
{
  "dmComment": "DM 对这次审问的评价（50-100字）",
  "unlockedClues": ["解锁的新线索描述"],
  "suspicionChanges": {
    "角色名": 变化值（正数增加嫌疑，负数降低）
  },
  "hint": "给玩家的提示（30字以内）"
}

注意：
- 只有当玩家的提问与已收集线索高度相关且触及角色秘密时，才解锁新线索
- 嫌疑度变化要合理，不要一次性变化太大`,
    },
    {
      role: 'user',
      content: `剧本上下文：\n${formatScriptContext(script)}\n\n请对 ${character.displayName} 进行审问。`,
    },
  ];

  const raw = await callLLM(messages, { maxTokens: 800, temperature: 0.8 });

  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    try {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        dmComment: parsed.dmComment || '',
        unlockedClues: Array.isArray(parsed.unlockedClues) ? parsed.unlockedClues : [],
        suspicionChanges: parsed.suspicionChanges || {},
        hint: parsed.hint || '',
      };
    } catch {
      // JSON 解析失败
    }
  }

  return {
    dmComment: raw,
    unlockedClues: [],
    suspicionChanges: {},
    hint: '',
  };
}

/**
 * DM 主动提示 — 根据当前游戏进度给出提示
 */
export async function getDMHint(
  script: Script,
  collectedClues: Clue[],
  phase: number,
): Promise<string> {

  const messages: LLMMessage[] = [
    {
      role: 'system',
      content: `你是"五千年史馆"历史剧本杀的 AI DM。

当前进度：第 ${phase} 阶段
已收集线索：${collectedClues.map(c => c.description).join('、')}

请给玩家一条简洁的提示（50字以内），引导玩家继续推理。
提示应该暗示下一步应该调查的方向或审问哪个角色。

输出纯文本，不要使用 Markdown 语法（不要标题、加粗、代码块等），不要使用 emoji，不要 JSON。`,
    },
    {
      role: 'user',
      content: formatScriptContext(script),
    },
  ];

  return callLLM(messages, { maxTokens: 150, temperature: 0.9 });
}

/**
 * 真相史实对照
 */
export async function compareTruthWithHistory(
  script: Script,
  userAccusation: string,
  userReasoning: string,
  collectedClues: Clue[],
): Promise<TruthComparison> {

  const messages: LLMMessage[] = [
    {
      role: 'system',
      content: `你是"五千年史馆"的 AI DM 兼历史学家。

请对玩家的推理进行评价，并与剧本真相进行对照。

请按以下 JSON 格式输出：
{
  "evaluation": "对用户推理的评价（150-250字），分析推理的合理性和盲点",
  "historicalFact": "剧本真相与历史背景的对照说明（150-250字）",
  "missedClues": ["玩家遗漏的关键线索1", "玩家遗漏的关键线索2"]
}

注意：
- 评价要客观公正，既肯定合理之处也指出不足
- 历史对照要说明剧本背后的真实历史背景`,
    },
    {
      role: 'user',
      content: `【剧本】${script.title}
【玩家指控】${userAccusation}
【推理过程】${userReasoning}
【已收集线索】${collectedClues.map(c => c.description).join('、')}
【剧本真相】${script.solution}`,
    },
  ];

  const raw = await callLLM(messages, { maxTokens: 1000, temperature: 0.7 });

  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    try {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        evaluation: parsed.evaluation || '',
        historicalFact: parsed.historicalFact || '',
        missedClues: Array.isArray(parsed.missedClues) ? parsed.missedClues : [],
      };
    } catch {
      // JSON 解析失败
    }
  }

  return {
    evaluation: raw,
    historicalFact: '',
    missedClues: [],
  };
}
