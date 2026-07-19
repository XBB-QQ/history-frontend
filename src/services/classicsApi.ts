/**
 * 典籍原典 service 层
 * 三源策略：
 *   1. 本地精选数据（CLASSICS 数组）— 30 段史书选段，含白话译文与注解
 *   2. ctext.org API 代理（后端 /api/classics/*）— 权威但国内访问慢，需 API key
 *   3. Wikisource API 代理（后端 /api/classics/wikisource/*）— 无需 key，国内快速
 *
 * 后端代理端点（详见 history-backend ClassicsController）：
 *   ctext:
 *   - GET /api/classics/search?title=xxx  按书名搜索 ctext 典籍
 *   - GET /api/classics/text/{urn}        根据 URN 获取典籍全文（需 API key）
 *   - GET /api/classics/status            查询 ctext 认证状态
 *   - GET /api/classics/readlink?url=xxx  从 ctext URL 反查 URN
 *
 *   Wikisource:
 *   - GET /api/classics/wikisource/search?title=xxx  按书名搜索 Wikisource 页面
 *   - GET /api/classics/wikisource/text?page=xxx     根据页面标题获取全文
 *
 * ctext API key 申请：https://ctext.org/account.pl（国内访问较慢）
 * Wikisource：https://zh.wikisource.org 无需 key
 */
import type { ClassicText } from '@/types/classic';
import { CLASSICS } from '@/data/features/classicsData';

const MOCK_DELAY_MS = 0;
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export interface ClassicQuery {
  category?: ClassicText['category'];
  source?: string;
  keyword?: string;
}

// ──────────────────────────────────────────────
// 本地精选数据访问
// ──────────────────────────────────────────────

/**
 * 获取典籍选段列表
 */
export async function fetchClassics(query: ClassicQuery = {}): Promise<ClassicText[]> {
  await mockDelay();
  let result = CLASSICS;
  if (query.category) {
    result = result.filter((c) => c.category === query.category);
  }
  if (query.source) {
    result = result.filter((c) => c.source.includes(query.source!));
  }
  if (query.keyword) {
    const kw = query.keyword.toLowerCase();
    result = result.filter(
      (c) =>
        c.title.toLowerCase().includes(kw) ||
        c.original.toLowerCase().includes(kw) ||
        c.translation.toLowerCase().includes(kw) ||
        c.tags.some((t) => t.toLowerCase().includes(kw)),
    );
  }
  return result;
}

/**
 * 获取典籍详情
 */
export async function fetchClassicById(id: string): Promise<ClassicText | null> {
  await mockDelay();
  return CLASSICS.find((c) => c.id === id) || null;
}

/**
 * 获取所有典籍来源（用于筛选 UI）
 */
export function getClassicSources(): string[] {
  const sources = new Set<string>();
  CLASSICS.forEach((c) => {
    // 提取《xxx》部分作为来源标识
    const match = c.source.match(/《([^》]+)》/);
    if (match) sources.add(match[1]);
  });
  return Array.from(sources);
}

// ──────────────────────────────────────────────
// ctext.org API 代理（扩展功能）
// ──────────────────────────────────────────────

/** ctext 典籍搜索结果项 */
export interface CtextBook {
  title: string;
  urn: string;
}

/** ctext gettext 响应 */
export interface CtextFulltext {
  title: string;
  fulltext: string[];
  subsections?: string[];
  errorCode?: string;
  errorDescription?: string;
}

/** ctext 认证状态 */
export interface CtextStatus {
  loggedin?: string;
  subscriber?: string;
  error?: string;
}

/**
 * 按书名搜索 ctext 典籍（公开端点，无需 API key）
 * @param title 书名，如"论语"、"史记"
 */
export async function searchCtextBooks(title: string): Promise<CtextBook[]> {
  if (!title.trim()) return [];
  try {
    const res = await fetch(
      `${API_BASE}/classics/search?title=${encodeURIComponent(title)}`,
      { headers: { Accept: 'application/json' } },
    );
    if (!res.ok) {
      throw new Error(`search failed: ${res.status}`);
    }
    return await res.json();
  } catch (e) {
    console.error('[classicsApi] searchCtextBooks error:', e);
    return [];
  }
}

/**
 * 根据 URN 获取典籍全文（需后端配置 API key）
 * @param urn ctext URN，如 ctp:analects/xue-er
 */
export async function fetchCtextFulltext(urn: string): Promise<CtextFulltext> {
  try {
    const res = await fetch(`${API_BASE}/classics/text/${encodeURIComponent(urn)}`, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) {
      throw new Error(`gettext failed: ${res.status}`);
    }
    return await res.json();
  } catch (e) {
    console.error('[classicsApi] fetchCtextFulltext error:', e);
    return {
      title: '',
      fulltext: [],
      errorCode: 'ERR_NETWORK',
      errorDescription: e instanceof Error ? e.message : String(e),
    };
  }
}

/**
 * 查询 ctext 认证状态（用于 UI 提示是否可获取全文）
 */
export async function fetchCtextStatus(): Promise<CtextStatus> {
  try {
    const res = await fetch(`${API_BASE}/classics/status`, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return { error: `status failed: ${res.status}` };
    return await res.json();
  } catch (e) {
    return { error: e instanceof Error ? e.message : String(e) };
  }
}

/**
 * 从 ctext.org URL 反查 URN（用于把本地 ctextUrl 转换为 URN）
 */
export async function readCtextLink(ctextUrl: string): Promise<string> {
  try {
    const res = await fetch(
      `${API_BASE}/classics/readlink?url=${encodeURIComponent(ctextUrl)}`,
      { headers: { Accept: 'application/json' } },
    );
    if (!res.ok) return '';
    const data = await res.json();
    return data.urn || '';
  } catch {
    return '';
  }
}

// ──────────────────────────────────────────────
// Wikisource API 代理（无需 API key，国内访问稳定）
// 作为 ctext.org 的快速替代源
// ──────────────────────────────────────────────

/** Wikisource 搜索结果项 */
export interface WikisourceBook {
  /** 页面标题（繁体） */
  title: string;
  /** 页面 ID */
  pageId: number;
  /** 摘要片段（含 HTML 高亮标记） */
  snippet: string;
}

/** Wikisource 全文响应 */
export interface WikisourceFulltext {
  title: string;
  /** 已解析的纯文本（去除 wikitext 标记） */
  fulltext: string;
  subsections?: string[];
  errorCode?: string;
  errorDescription?: string;
}

/**
 * 按书名搜索 Wikisource 典籍（无需 API key，国内访问稳定）
 * @param title 书名，如"论语"、"史記"（繁简均可）
 */
export async function searchWikisourceBooks(title: string): Promise<WikisourceBook[]> {
  if (!title.trim()) return [];
  try {
    const res = await fetch(
      `${API_BASE}/classics/wikisource/search?title=${encodeURIComponent(title)}`,
      { headers: { Accept: 'application/json' } },
    );
    if (!res.ok) {
      throw new Error(`wikisource search failed: ${res.status}`);
    }
    return await res.json();
  } catch (e) {
    console.error('[classicsApi] searchWikisourceBooks error:', e);
    return [];
  }
}

/**
 * 根据页面标题获取 Wikisource 全文（无需 API key）
 * @param pageTitle 页面标题，如"論語/學而第一"（需繁体）
 */
export async function fetchWikisourceFulltext(pageTitle: string): Promise<WikisourceFulltext> {
  try {
    const res = await fetch(
      `${API_BASE}/classics/wikisource/text?page=${encodeURIComponent(pageTitle)}`,
      { headers: { Accept: 'application/json' } },
    );
    if (!res.ok) {
      throw new Error(`wikisource text failed: ${res.status}`);
    }
    return await res.json();
  } catch (e) {
    console.error('[classicsApi] fetchWikisourceFulltext error:', e);
    return {
      title: '',
      fulltext: '',
      errorCode: 'ERR_NETWORK',
      errorDescription: e instanceof Error ? e.message : String(e),
    };
  }
}

// ──────────────────────────────────────────────
// AI 古文翻译（GLM-4-Flash，SSE 流式）
// ──────────────────────────────────────────────

/** SSE chunk 事件数据结构 */
export interface TranslationChunk {
  /** 当前段序号（从 1 开始） */
  index: number;
  /** 总段数 */
  total: number;
  /** 当前段译文 */
  translation: string;
  /** 是否最后一段 */
  done: boolean;
  /** 是否来自缓存（缓存命中时一次性发送） */
  cached?: boolean;
}

/** SSE done 事件数据结构 */
export interface TranslationDone {
  total: number;
  success: number;
  fail: number;
  cached: boolean;
}

/**
 * 调用后端 AI 翻译接口（SSE 流式），每段翻译完成后通过 onChunk 回调推送
 * 后端使用 GLM-4-Flash，800 字分段翻译，带 24 小时缓存
 *
 * @param text      古文原文
 * @param title     典籍标题（可选，用于提高翻译质量）
 * @param onChunk   每段译文到达时的回调
 * @param onDone    全部翻译完成时的回调（含统计信息）
 * @param onError   错误回调（网络错误 / SSE error 事件）。若未提供，错误仅 console.error
 * @param signal    AbortSignal，用于取消请求（如用户切换原文时中断未完成的翻译）
 * @returns Promise，resolve 表示流正常结束；abort 或错误时 reject（已通过 onError 回调通知）
 */
export async function fetchTranslationStream(
  text: string,
  title: string,
  onChunk: (chunk: TranslationChunk) => void,
  onDone?: (done: TranslationDone) => void,
  onError?: (message: string) => void,
  signal?: AbortSignal,
): Promise<void> {
  if (!text || !text.trim()) return;
  try {
    const res = await fetch(`${API_BASE}/classics/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/event-stream',
      },
      body: JSON.stringify({ text, title }),
      signal,
    });
    if (!res.ok) {
      throw new Error(`translate stream failed: ${res.status}`);
    }
    if (!res.body) {
      throw new Error('ReadableStream 不可用（浏览器不支持）');
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    // SSE 事件以空行分隔，每个事件包含 event: 和 data: 行
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      // 按空行分割事件
      const events = buffer.split('\n\n');
      buffer = events.pop() || ''; // 最后一个可能不完整，保留

      for (const eventStr of events) {
        const parsed = parseSseEvent(eventStr);
        if (!parsed) continue;
        if (parsed.event === 'chunk' && parsed.data) {
          onChunk(parsed.data as TranslationChunk);
        } else if (parsed.event === 'done' && parsed.data && onDone) {
          onDone(parsed.data as TranslationDone);
        } else if (parsed.event === 'error' && parsed.data) {
          const msg = (parsed.data as { message?: string }).message || '翻译失败';
          if (onError) onError(msg);
          else console.error('[classicsApi] translate SSE error:', msg);
          return; // error 事件后流结束
        }
      }
    }
  } catch (e) {
    // abort 不算错误，静默处理
    if (e instanceof DOMException && e.name === 'AbortError') {
      return;
    }
    const msg = e instanceof Error ? e.message : String(e);
    console.error('[classicsApi] fetchTranslationStream error:', msg);
    if (onError) onError(msg);
  }
}

/**
 * 解析单个 SSE 事件字符串
 * 格式：event: xxx\ndata: {...}
 */
function parseSseEvent(eventStr: string): { event: string; data: unknown } | null {
  const lines = eventStr.split('\n');
  let eventName = 'message';
  let dataStr = '';
  for (const line of lines) {
    if (line.startsWith('event:')) {
      eventName = line.slice(6).trim();
    } else if (line.startsWith('data:')) {
      dataStr += line.slice(5).trim();
    }
  }
  if (!dataStr) return null;
  try {
    return { event: eventName, data: JSON.parse(dataStr) };
  } catch {
    return { event: eventName, data: dataStr };
  }
}

function mockDelay(): Promise<void> {
  if (MOCK_DELAY_MS === 0) return Promise.resolve();
  return new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));
}
