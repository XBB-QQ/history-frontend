/**
 * 时空邮筒 — 给历史人物写信，AI 以该人物口吻回信
 * 复用 figures.ts 人物性格数据，注入 speakingStyle/personality 作为人格 Prompt
 */

import { callLLMStream, readStreamToString, type LLMMessage } from '@/utils/llmClient';
import { hasApiKey } from '@/utils/llmConfig';
import type { HistoricalFigure } from '@/types/figure';
import type { UserPersona } from '@/types/userPersona';

const STORAGE_KEY = 'time-mailbox-letters';

export interface Letter {
  id: string;
  figureId: string;
  figureName: string;
  figureEmoji: string;
  userContent: string;
  replyContent: string;
  createdAt: number;
}

/** 读取所有信件 */
export function loadLetters(): Letter[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/** 保存所有信件 */
function saveLetters(letters: Letter[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(letters));
}

/** 添加一封信 */
export function addLetter(letter: Letter): void {
  const letters = loadLetters();
  letters.unshift(letter);
  // 只保留最近 50 封，避免 localStorage 撑爆
  const trimmed = letters.slice(0, 50);
  saveLetters(trimmed);
}

/** 删除一封信 */
export function deleteLetter(id: string): void {
  const letters = loadLetters().filter((l) => l.id !== id);
  saveLetters(letters);
}

/**
 * 给历史人物写信，AI 以该人物口吻回信（流式）
 * @param figure 历史人物
 * @param userContent 用户信件内容
 * @param onChunk 流式回调
 */
export async function writeLetterToFigure(
  figure: HistoricalFigure,
  userContent: string,
  onChunk?: (chunk: string) => void,
  persona?: UserPersona,
): Promise<string> {
  if (!hasApiKey()) {
    throw new Error('请先配置 API Key — 点击页面右上角"⚙️ 配置"按钮');
  }

  const quotesText = figure.quotes.map((q) => `「${q}」`).join('、');

  const personaContext = persona
    ? `\n\n写信人是一位对历史充满热情的访客，其画像：朝代偏好${persona.favoriteDynasties.join('、') || '广泛'}，关注人物${persona.favoritePersons.join('、') || '众多'}`
    : '';

  const systemPrompt = `你是历史人物 ${figure.name}（${figure.dynasty} · ${figure.role}）。${personaContext}

你的人物资料：
- 生平：${figure.bio}
- 说话风格：${figure.speakingStyle}
- 性格：${figure.personality}
- 关注话题：${figure.topics.join('、')}
- 名言：${quotesText}

现在有后世的一位访客给你写信。请你以 ${figure.name} 本人的身份回信。

回信要求：
1. 必须严格保持 ${figure.name} 的说话风格和性格特征
2. 引用你的生平经历、思想观点回应访客
3. 可以引用你的名言，但要自然融入
4. 200-400 字，格式为书信体（开头"吾友如晤"之类的古风称呼，结尾署名"${figure.name}"）
5. 如果访客问到你无法知道的事（如现代科技），可以以你的时代认知回应，保持沉浸感
6. 不要说"作为AI"之类的自我指涉`;

  const messages: LLMMessage[] = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userContent },
  ];

  const stream = await callLLMStream(messages, {
    maxTokens: 1024,
    temperature: 0.85,
  });

  return readStreamToString(stream, onChunk);
}

/** 生成信件 ID */
export function genLetterId(): string {
  return `letter_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}
