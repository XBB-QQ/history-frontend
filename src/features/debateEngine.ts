/**
 * 跨时空辩论引擎 — 用 LLM 生成两个历史人物的辩论对话
 * @see history-museum/design/002-innovation-brainstorm.md §1
 */

import { callLLM, type LLMMessage } from '@/utils/llmClient';
import { getFigureById } from '@/data/scenarios/figures';
import type { DebateTopic } from '@/data/scenarios/debateTopics';
import type { DebateFigurePair } from '@/data/scenarios/debateFigures';

export interface DebateRound {
  round: number;
  proArgument: string;
  conArgument: string;
}

export interface DebateResult {
  rounds: DebateRound[];
  conclusion: string;
}

/** 构建辩手 system prompt */
function buildFigurePrompt(figureId: string, stance: string, isPro: boolean): string {
  const figure = getFigureById(figureId);
  if (!figure) return `你是${isPro ? '正方' : '反方'}辩手，立场：${stance}`;

  return `你是历史人物"${figure.name}"(${figure.dynasty} · ${figure.role})。

你的性格：${figure.personality}
你的说话风格：${figure.speakingStyle}
你的经典语录：${figure.quotes.join(' / ')}

在本次辩论中，你是${isPro ? '正方' : '反方'}辩手，立场为：${stance}

辩论规则：
1. 必须以${figure.name}的身份说话，保持你的说话风格
2. 你的论点必须基于你的历史立场和哲学思想
3. 每轮发言不超过200字，简洁有力
4. 可以引用你的经典语录或历史典故
5. 要针对对方的论点进行反驳，不是自说自话`;
}

/** 生成一轮辩论 */
export async function generateDebateRound(
  topic: DebateTopic,
  pair: DebateFigurePair,
  previousRounds: DebateRound[],
): Promise<DebateRound> {
  const roundNum = previousRounds.length + 1;

  // 构建正方论点
  const proMessages: LLMMessage[] = [
    { role: 'system', content: buildFigurePrompt(pair.proFigureId, pair.proStance, true) },
    {
      role: 'user',
      content: buildRoundPrompt(topic, roundNum, previousRounds, 'pro'),
    },
  ];

  // 构建反方论点
  const conMessages: LLMMessage[] = [
    { role: 'system', content: buildFigurePrompt(pair.conFigureId, pair.conStance, false) },
    {
      role: 'user',
      content: buildRoundPrompt(topic, roundNum, previousRounds, 'con'),
    },
  ];

  const [proArg, conArg] = await Promise.all([
    callLLM(proMessages, { maxTokens: 300, temperature: 0.8 }),
    callLLM(conMessages, { maxTokens: 300, temperature: 0.8 }),
  ]);

  return { round: roundNum, proArgument: proArg, conArgument: conArg };
}

function buildRoundPrompt(
  topic: DebateTopic,
  roundNum: number,
  previousRounds: DebateRound[],
  side: 'pro' | 'con',
): string {
  const topicDesc = `辩论话题：${topic.title}\n话题背景：${topic.description}`;

  if (roundNum === 1) {
    return `${topicDesc}\n\n这是第 1 轮辩论。请阐述你的核心观点，作为${side === 'pro' ? '正方' : '反方'}的开场陈词。`;
  }

  const history = previousRounds
    .map(r => `第${r.round}轮 正方：${r.proArgument}\n第${r.round}轮 反方：${r.conArgument}`)
    .join('\n\n');

  const lastOpponent = side === 'pro'
    ? previousRounds[previousRounds.length - 1].conArgument
    : previousRounds[previousRounds.length - 1].proArgument;

  return `${topicDesc}\n\n前几轮辩论记录：\n${history}\n\n对方最新论点：${lastOpponent}\n\n这是第 ${roundNum} 轮。请针对对方论点进行反驳，同时强化自己的立场。`;
}

/** 生成辩论总结 */
export async function generateDebateConclusion(
  topic: DebateTopic,
  rounds: DebateRound[],
): Promise<string> {
  const history = rounds
    .map(r => `第${r.round}轮 正方：${r.proArgument}\n第${r.round}轮 反方：${r.conArgument}`)
    .join('\n\n');

  const messages: LLMMessage[] = [
    {
      role: 'system',
      content: '你是历史学家，负责为辩论做客观公正的总结评论。',
    },
    {
      role: 'user',
      content: `辩论话题：${topic.title}\n\n辩论记录：\n${history}\n\n请做以下总结：\n1. 双方各自最有力的论点是什么？\n2. 历史事实倾向于哪一方？\n3. 这个问题的核心矛盾是什么？\n4. 历史给我们什么启示？\n\n保持客观，承认双方的合理性。`,
    },
  ];

  return callLLM(messages, { maxTokens: 500, temperature: 0.5 });
}

/** 用户提问介入辩论 */
export async function askDebateQuestion(
  question: string,
  topic: DebateTopic,
  pair: DebateFigurePair,
  rounds: DebateRound[],
  targetSide: 'pro' | 'con' | 'both',
): Promise<{ proResponse?: string; conResponse?: string }> {
  const history = rounds
    .map(r => `正方：${r.proArgument}\n反方：${r.conArgument}`)
    .join('\n');

  const proFigure = getFigureById(pair.proFigureId);
  const conFigure = getFigureById(pair.conFigureId);

  const promises: Promise<string>[] = [];

  if (targetSide === 'pro' || targetSide === 'both') {
    promises.push(
      callLLM([
        { role: 'system', content: buildFigurePrompt(pair.proFigureId, pair.proStance, true) },
        {
          role: 'user',
          content: `辩论话题：${topic.title}\n辩论记录：${history}\n\n观众向你提问：${question}\n\n请以${proFigure?.name || '正方'}的身份回答这个问题，回应观众的关切。`,
        },
      ], { maxTokens: 300, temperature: 0.7 }),
    );
  }

  if (targetSide === 'con' || targetSide === 'both') {
    promises.push(
      callLLM([
        { role: 'system', content: buildFigurePrompt(pair.conFigureId, pair.conStance, false) },
        {
          role: 'user',
          content: `辩论话题：${topic.title}\n辩论记录：${history}\n\n观众向你提问：${question}\n\n请以${conFigure?.name || '反方'}的身份回答这个问题，回应观众的关切。`,
        },
      ], { maxTokens: 300, temperature: 0.7 }),
    );
  }

  const results = await Promise.all(promises);

  if (targetSide === 'pro') return { proResponse: results[0] };
  if (targetSide === 'con') return { conResponse: results[0] };
  return { proResponse: results[0], conResponse: results[1] };
}
