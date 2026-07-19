/**
 * 历史人物每日问候 — 让历史人物每天给用户发问候消息
 * 基于当前日期和人物个性，AI 生成个性化问候
 */

import { callLLM, type LLMMessage } from '@/utils/llmClient';
import type { HistoricalFigure } from '@/types/figure';
import { FIGURES } from '@/data/scenarios/figures';

const FOLLOWED_KEY = 'daily-greeting-followed';
const LAST_GREETING_KEY = 'daily-greeting-last-date';
const GREETINGS_KEY = 'daily-greeting-history';

export interface GreetingMessage {
  id: string;
  figureId: string;
  figureName: string;
  figureEmoji: string;
  content: string;
  date: string;
  time: string;
}

/** 读取用户关注的人物列表 */
export function getFollowedFigures(): string[] {
  try {
    const raw = localStorage.getItem(FOLLOWED_KEY);
    return raw ? JSON.parse(raw) : ['libai', 'zhugeliang'];
  } catch {
    return ['libai', 'zhugeliang'];
  }
}

/** 保存用户关注的人物列表 */
export function setFollowedFigures(ids: string[]): void {
  localStorage.setItem(FOLLOWED_KEY, JSON.stringify(ids));
}

/** 切换关注状态 */
export function toggleFollow(figureId: string): boolean {
  const followed = getFollowedFigures();
  const index = followed.indexOf(figureId);
  if (index >= 0) {
    followed.splice(index, 1);
    setFollowedFigures(followed);
    return false;
  } else {
    followed.push(figureId);
    setFollowedFigures(followed);
    return true;
  }
}

/** 是否关注了某个人物 */
export function isFollowed(figureId: string): boolean {
  return getFollowedFigures().includes(figureId);
}

/** 获取今天的日期字符串 */
function getTodayString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/** 是否需要生成今日问候 */
export function needTodayGreeting(): boolean {
  const lastDate = localStorage.getItem(LAST_GREETING_KEY);
  return lastDate !== getTodayString();
}

/** 更新最后问候日期 */
function updateLastGreetingDate(): void {
  localStorage.setItem(LAST_GREETING_KEY, getTodayString());
}

/** 生成今日问候消息 */
export async function generateTodayGreetings(): Promise<GreetingMessage[]> {
  const followedIds = getFollowedFigures();
  if (followedIds.length === 0) return [];

  const today = new Date();
  const dateStr = today.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });
  const timeStr = today.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });

  const messages: GreetingMessage[] = [];
  const followedFigures = FIGURES.filter(f => followedIds.includes(f.id));

  for (const figure of followedFigures) {
    try {
      const content = await generateGreeting(figure, dateStr);
      const msg: GreetingMessage = {
        id: `greeting_${figure.id}_${Date.now()}`,
        figureId: figure.id,
        figureName: figure.name,
        figureEmoji: figure.emoji ?? '',
        content,
        date: getTodayString(),
        time: timeStr,
      };
      messages.push(msg);
    } catch {
      // 单个人物生成失败不影响其他
    }
  }

  if (messages.length > 0) {
    updateLastGreetingDate();
    saveGreetings(messages);
  }

  return messages;
}

/** 生成单个人物的问候 */
async function generateGreeting(figure: HistoricalFigure, dateStr: string): Promise<string> {
  const systemPrompt = `身份：${figure.name}（${figure.dynasty} · ${figure.role}）
生平：${figure.bio}
说话风格：${figure.speakingStyle}
性格：${figure.personality}
名言：${figure.quotes.join('、')}

现在是 ${dateStr}，给关注你的访客发一条简短的问候。

要求：
1. 保持 ${figure.name} 的说话风格和性格
2. 可聊历史上今天的事件、对你有意义的日子、季节问候或一句鼓励
3. 50-80 字，自然亲切，像朋友问候
4. 可引用名言，但要自然
5. 不要说"作为AI"之类的自我指涉
6. 输出纯文本，不要使用 Markdown 语法（不要 ##、**、代码块等），不要使用 emoji`;

  const messages: LLMMessage[] = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: '请发一条今日问候。' },
  ];

  const result = await callLLM(messages, { maxTokens: 200, temperature: 0.85 });
  return result.trim();
}

/** 保存问候消息到历史记录 */
function saveGreetings(greetings: GreetingMessage[]): void {
  const history = getGreetingHistory();
  history.unshift(...greetings);
  const trimmed = history.slice(0, 100);
  localStorage.setItem(GREETINGS_KEY, JSON.stringify(trimmed));
}

/** 获取问候历史记录 */
export function getGreetingHistory(): GreetingMessage[] {
  try {
    const raw = localStorage.getItem(GREETINGS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/** 获取今日问候（如果有） */
export function getTodayGreetings(): GreetingMessage[] {
  const history = getGreetingHistory();
  const today = getTodayString();
  return history.filter(g => g.date === today);
}

/** 生成消息ID */
export function genGreetingId(): string {
  return `greeting_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}
