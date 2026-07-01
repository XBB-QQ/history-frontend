/**
 * 历史时间胶囊 — 用户给未来的自己写一封信，由历史人物保管
 * 设定开启日期，届时守护史官提醒用户开启
 */

import { callLLM, type LLMMessage } from '@/utils/llmClient';
import { hasApiKey } from '@/utils/llmConfig';
import type { HistoricalFigure } from '@/types/figure';
import { FIGURES } from '@/data/scenarios/figures';

const CAPSULES_KEY = 'time-capsule-list';

export interface TimeCapsule {
  id: string;
  title: string;
  content: string;
  guardFigureId: string;
  guardFigureName: string;
  guardFigureEmoji: string;
  openDate: string;
  createdAt: number;
  openedAt?: number;
  aiInterpretation?: string;
}

/** 获取所有时间胶囊 */
export function getCapsules(): TimeCapsule[] {
  try {
    const raw = localStorage.getItem(CAPSULES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/** 保存时间胶囊 */
export function saveCapsule(capsule: TimeCapsule): void {
  const capsules = getCapsules();
  capsules.push(capsule);
  localStorage.setItem(CAPSULES_KEY, JSON.stringify(capsules));
}

/** 创建时间胶囊 */
export function createCapsule(
  title: string,
  content: string,
  guardFigureId: string,
  openDate: string,
): TimeCapsule {
  const figure = FIGURES.find(f => f.id === guardFigureId) || FIGURES[0];
  const capsule: TimeCapsule = {
    id: `capsule_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    title,
    content,
    guardFigureId,
    guardFigureName: figure.name,
    guardFigureEmoji: figure.emoji,
    openDate,
    createdAt: Date.now(),
  };
  saveCapsule(capsule);
  return capsule;
}

/** 获取今天的日期字符串 */
function getTodayString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/** 判断胶囊是否可以开启 */
export function canOpen(capsule: TimeCapsule): boolean {
  if (capsule.openedAt) return true;
  return capsule.openDate <= getTodayString();
}

/** 判断胶囊是否已过期（可以开启但尚未开启） */
export function isReadyToOpen(capsule: TimeCapsule): boolean {
  return !capsule.openedAt && capsule.openDate <= getTodayString();
}

/** 开启时间胶囊 */
export async function openCapsule(capsule: TimeCapsule): Promise<TimeCapsule> {
  const figure = FIGURES.find(f => f.id === capsule.guardFigureId);
  
  let interpretation = '';
  if (hasApiKey() && figure) {
    try {
      interpretation = await generateInterpretation(capsule, figure);
    } catch {
      interpretation = '';
    }
  }

  const updated = {
    ...capsule,
    openedAt: Date.now(),
    aiInterpretation: interpretation,
  };

  const capsules = getCapsules();
  const idx = capsules.findIndex(c => c.id === capsule.id);
  if (idx >= 0) {
    capsules[idx] = updated;
    localStorage.setItem(CAPSULES_KEY, JSON.stringify(capsules));
  }

  return updated;
}

/** AI 解读信件 */
async function generateInterpretation(capsule: TimeCapsule, figure: HistoricalFigure): Promise<string> {
  const systemPrompt = `你是历史人物 ${figure.name}（${figure.dynasty} · ${figure.role}）。

你的人物资料：
- 生平：${figure.bio}
- 说话风格：${figure.speakingStyle}
- 性格：${figure.personality}
- 名言：${figure.quotes.join('、')}

你是一位"时间守护者"，负责保管访客写给未来自己的信件。

信件信息：
- 标题：${capsule.title}
- 内容：${capsule.content}
- 写信日期：${new Date(capsule.createdAt).toLocaleDateString('zh-CN')}
- 开启日期：${capsule.openDate}

现在信件已经开启，请你以 ${figure.name} 的身份，对这封信做一个简短的解读或评价。

要求：
1. 严格保持 ${figure.name} 的说话风格和性格
2. 结合你的人生经历和智慧，给访客一些启发
3. 可以引用你的名言，但要自然
4. 80-120 字，不要太长
5. 温暖、有哲理，像一位长者在开导后辈
6. 不要说"作为AI"之类的自我指涉`;

  const messages: LLMMessage[] = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: '请解读这封时间胶囊信件。' },
  ];

  const result = await callLLM(messages, { maxTokens: 300, temperature: 0.85 });
  return result.trim();
}

/** 删除时间胶囊 */
export function deleteCapsule(id: string): void {
  const capsules = getCapsules();
  const filtered = capsules.filter(c => c.id !== id);
  localStorage.setItem(CAPSULES_KEY, JSON.stringify(filtered));
}

/** 获取准备开启的胶囊列表 */
export function getReadyToOpenCapsules(): TimeCapsule[] {
  return getCapsules().filter(isReadyToOpen);
}

/** 获取已开启的胶囊列表 */
export function getOpenedCapsules(): TimeCapsule[] {
  return getCapsules().filter(c => c.openedAt).sort((a, b) => (b.openedAt || 0) - (a.openedAt || 0));
}

/** 获取未开启的胶囊列表 */
export function getPendingCapsules(): TimeCapsule[] {
  return getCapsules().filter(c => !c.openedAt).sort((a, b) => a.openDate.localeCompare(b.openDate));
}
