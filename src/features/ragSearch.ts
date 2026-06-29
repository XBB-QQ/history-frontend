/**
 * RAG 前端检索引擎 — 从本地 JSON 数据中检索相关内容，喂给 LLM 生成回答
 * @see history-museum/design/002-innovation-brainstorm.md §2
 *
 * 策略：关键词匹配 + 朝代/人物/事件关联扩展，无需向量数据库
 */

import type { FrontendEvent as EventItem, FrontendPerson as PersonItem, FrontendDynasty as DynastyItem, FrontendKnowledge as KnowledgeCardItem } from '@/types';
import { callLLM, callLLMStream, readStreamToString, type LLMMessage } from '@/utils/llmClient';

// ========== 数据加载 ==========

let eventsCache: EventItem[] | null = null;
let personsCache: PersonItem[] | null = null;
let dynastiesCache: DynastyItem[] | null = null;
let knowledgeCache: KnowledgeCardItem[] | null = null;

async function loadData() {
  if (eventsCache && personsCache && dynastiesCache && knowledgeCache) return;

  const [ev, ps, dy, kc] = await Promise.all([
    import('@/data/events.json'),
    import('@/data/persons.json'),
    import('@/data/dynasties.json'),
    import('@/data/knowledge-cards.json'),
  ]);

  eventsCache = ev.default as EventItem[];
  personsCache = ps.default as PersonItem[];
  dynastiesCache = dy.default as DynastyItem[];
  knowledgeCache = kc.default as KnowledgeCardItem[];
}

// ========== 关键词检索 ==========

/** 朝代名映射 (拼音 → 中文名) */
const DYNASTY_MAP: Record<string, string> = {
  xia: '夏', shang: '商', zhou: '周', qin: '秦', han: '汉',
  threeKingdoms: '三国', jin: '晋', southernNorthern: '南北朝',
  sui: '隋', tang: '唐', fiveDynasties: '五代十国', song: '宋',
  yuan: '元', ming: '明', qing: '清',
};

/** 从用户提问中提取关键词 */
function extractKeywords(question: string): string[] {
  const keywords: string[] = [];
  const lower = question.toLowerCase();

  // 提取朝代名
  for (const [pinyin, cn] of Object.entries(DYNASTY_MAP)) {
    if (lower.includes(pinyin) || question.includes(cn)) {
      keywords.push(pinyin);
      keywords.push(cn);
    }
  }

  // 提取年份（含"公元前"模式）
  const yearMatch = question.match(/公元前(\d+)|前(\d+)|公元(\d+)|(\d{3,4})年/g);
  if (yearMatch) {
    keywords.push(...yearMatch);
  }

  // 提取明显的人名/事件名（2-4字词）
  const nameMatch = question.match(/[\u4e00-\u9fa5]{2,4}/g);
  if (nameMatch) {
    // 过滤常见停用词
    const stopWords = ['什么', '怎么', '为什么', '哪个', '哪些', '如何', '影响', '原因', '结果', '关系', '意义', '作用', '特点', '比较', '关于', '还有', '之间', '之后', '之前', '时候', '时期', '时代', '情况', '背景', '过程'];
    const filtered = nameMatch.filter(w => !stopWords.includes(w) && w.length >= 2);
    keywords.push(...filtered);
  }

  return [...new Set(keywords)];
}

/** 计算文本与关键词的匹配分数 */
function matchScore(text: string, keywords: string[]): number {
  let score = 0;
  for (const kw of keywords) {
    if (text.includes(kw)) {
      score += kw.length; // 长关键词权重更高
    }
  }
  return score;
}

// ========== 检索函数 ==========

interface RagContext {
  events: EventItem[];
  persons: PersonItem[];
  dynasties: DynastyItem[];
  knowledge: KnowledgeCardItem[];
  totalScore: number;
}

/** 从本地数据中检索与问题最相关的条目 */
async function retrieveContext(question: string, topK = 5): Promise<RagContext> {
  await loadData();

  const keywords = extractKeywords(question);

  // 检索事件
  const scoredEvents = eventsCache!.map(e => ({
    item: e,
    score: matchScore(`${e.title} ${e.description} ${e.fulltext} ${e.tags.join(' ')} ${e.dynasty}`, keywords),
  })).filter(s => s.score > 0).sort((a, b) => b.score - a.score).slice(0, topK);

  // 检索人物
  const scoredPersons = personsCache!.map(p => ({
    item: p,
    score: matchScore(`${p.name} ${p.courtesyName} ${p.bio} ${p.achievements} ${p.tags.join(' ')} ${p.dynasty}`, keywords),
  })).filter(s => s.score > 0).sort((a, b) => b.score - a.score).slice(0, topK);

  // 检索朝代
  const scoredDynasties = dynastiesCache!.map(d => ({
    item: d,
    score: matchScore(`${d.name} ${d.description} ${d.highlights} ${d.fallReason} ${d.legacy} ${d.id}`, keywords),
  })).filter(s => s.score > 0).sort((a, b) => b.score - a.score).slice(0, 3);

  // 检索知识卡片
  const scoredKnowledge = knowledgeCache!.map(k => ({
    item: k,
    score: matchScore(`${k.title} ${k.description} ${k.fulltext} ${k.tags.join(' ')} ${k.dynasty}`, keywords),
  })).filter(s => s.score > 0).sort((a, b) => b.score - a.score).slice(0, 3);

  // 关联扩展：如果找到事件，也加入其关联人物和朝代
  const relatedPersonUids = new Set(scoredEvents.map(s => s.item.relatedPersons).flat());
  const relatedDynastyIds = new Set(scoredEvents.map(s => s.item.dynasty));

  const extraPersons = personsCache!.filter(p =>
    relatedPersonUids.has(p.uid || p.id) && !scoredPersons.some(s => s.item.id === p.id)
  ).slice(0, 2);

  const extraDynasty = dynastiesCache!.filter(d =>
    relatedDynastyIds.has(d.id) && !scoredDynasties.some(s => s.item.id === d.id)
  ).slice(0, 1);

  const allEvents = scoredEvents.map(s => s.item);
  const allPersons = [...scoredPersons.map(s => s.item), ...extraPersons];
  const allDynasties = [...scoredDynasties.map(s => s.item), ...extraDynasty];
  const allKnowledge = scoredKnowledge.map(s => s.item);

  const totalScore = scoredEvents.reduce((s, x) => s + x.score, 0)
    + scoredPersons.reduce((s, x) => s + x.score, 0)
    + scoredDynasties.reduce((s, x) => s + x.score, 0);

  return { events: allEvents, persons: allPersons, dynasties: allDynasties, knowledge: allKnowledge, totalScore };
}

// ========== Prompt 构建 ==========

function buildRagPrompt(question: string, context: RagContext): LLMMessage[] {
  // 构建上下文文本
  const contextParts: string[] = [];

  if (context.dynasties.length > 0) {
    contextParts.push('【相关朝代】');
    for (const d of context.dynasties) {
      contextParts.push(`- ${d.name}朝(${d.period}): ${d.description.slice(0, 200)} 开国者:${d.founder} 都城:${d.capital} 遗产:${d.legacy.slice(0, 100)}`);
    }
  }

  if (context.events.length > 0) {
    contextParts.push('【相关事件】');
    for (const e of context.events) {
      contextParts.push(`- ${e.title}(${e.yearDisplay}, ${DYNASTY_MAP[e.dynasty] || e.dynasty}朝): ${e.description.slice(0, 150)} 影响:${e.impact.slice(0, 100)}`);
      if (e.classicalText) {
        contextParts.push(`  史书原文(${e.classicalSource}): ${e.classicalText.slice(0, 120)}`);
      }
    }
  }

  if (context.persons.length > 0) {
    contextParts.push('【相关人物】');
    for (const p of context.persons) {
      contextParts.push(`- ${p.name}(${p.courtesyName}, ${DYNASTY_MAP[p.dynasty] || p.dynasty}朝, ${p.yearsDisplay}): ${p.bio.slice(0, 150)} 成就:${p.achievements.slice(0, 100)}`);
    }
  }

  if (context.knowledge.length > 0) {
    contextParts.push('【相关知识】');
    for (const k of context.knowledge) {
      contextParts.push(`- ${k.title}: ${k.description.slice(0, 150)}`);
    }
  }

  const contextText = contextParts.length > 0
    ? contextParts.join('\n')
    : '(未找到直接相关数据，请基于你的历史知识回答)';

  return [
    {
      role: 'system',
      content: `你是"五千年史馆"的历史顾问 AI。你的职责是基于提供的史料数据回答用户问题。

回答规则：
1. 优先引用提供的史料数据，不可凭空编造
2. 如数据不足，可补充你的历史知识，但需标注"[补充]"
3. 回答要简洁有深度，避免流水账，要有因果分析和历史视角
4. 每个回答至少包含一个"历史启示"或"值得深思的问题"
5. 如涉及年份，注意区分公元前/公元后
6. 用中文回答，风格可以适当文言点缀但不晦涩`,
    },
    {
      role: 'user',
      content: `以下是从五千年史馆数据库中检索到的相关史料：

${contextText}

---

用户问题：${question}

请基于以上史料回答，如有引用请标注来源。`,
    },
  ];
}

// ========== 问答接口 ==========

export interface RagAnswer {
  answer: string;
  sources: {
    events: EventItem[];
    persons: PersonItem[];
    dynasties: DynastyItem[];
    knowledge: KnowledgeCardItem[];
  };
  matchScore: number;
}

/** RAG 问答 — 非流式 */
export async function askHistory(question: string): Promise<RagAnswer> {
  const context = await retrieveContext(question);
  const messages = buildRagPrompt(question, context);
  const answer = await callLLM(messages);

  return {
    answer,
    sources: {
      events: context.events,
      persons: context.persons,
      dynasties: context.dynasties,
      knowledge: context.knowledge,
    },
    matchScore: context.totalScore,
  };
}

/** RAG 问答 — 流式 */
export async function askHistoryStream(
  question: string,
  onChunk: (chunk: string) => void,
): Promise<RagAnswer> {
  const context = await retrieveContext(question);
  const messages = buildRagPrompt(question, context);
  const stream = await callLLMStream(messages);
  const answer = await readStreamToString(stream, onChunk);

  return {
    answer,
    sources: {
      events: context.events,
      persons: context.persons,
      dynasties: context.dynasties,
      knowledge: context.knowledge,
    },
    matchScore: context.totalScore,
  };
}

/** 仅检索相关数据（不调用 LLM） */
export async function searchHistory(question: string): Promise<RagContext> {
  return retrieveContext(question);
}
