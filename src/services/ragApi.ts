/**
 * 后端 RAG API 客户端 — 调用 Spring Boot 后端的 /api/v1/rag/* 端点
 * @see history-backend: RagController
 *
 * 策略：流式 /query 获取 LLM 回答，完成后调用 /retrieve 获取引用来源
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export type RagDocType = 'event' | 'person' | 'dynasty' | 'knowledge' | 'topic';

/** 后端 /retrieve 返回的扁平文档项 */
export interface BackendRagSource {
  id: string;
  score: number;
  type: RagDocType;
  title: string;
  content: string;
  source: string;
  year?: number;
  category?: string;
  dynasty?: string;
}

/** 后端 RAG 统一回答结构（扁平 sources） */
export interface BackendRagAnswer {
  answer: string;
  sources: BackendRagSource[];
  matchScore: number;
  mode: 'backend';
}

/** 向量库状态 */
export interface RagStatus {
  vectorCount: number;
  storeType: string;
}

/**
 * 查询向量库状态 — 用于判断后端 RAG 是否可用
 * 失败时返回 null，调用方可降级
 */
export async function getRagStatus(): Promise<RagStatus | null> {
  try {
    const res = await fetch(`${API_BASE}/v1/rag/status`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return {
      vectorCount: Number(data.vectorCount) || 0,
      storeType: String(data.storeType || 'unknown'),
    };
  } catch {
    return null;
  }
}

/**
 * 流式 RAG 查询 — 调用后端 /api/v1/rag/query (SSE)
 *
 * 流程：
 * 1. POST /query 拿到 SSE 流，按 OpenAI 格式解析 delta.content，通过 onChunk 回调输出
 * 2. 流结束后 POST /retrieve 获取引用来源
 *
 * @param question 用户问题
 * @param onChunk  每收到一段文本时回调
 * @param docType  可选，限定文档类型
 */
export async function askHistoryStreamBackend(
  question: string,
  onChunk: (chunk: string) => void,
  docType?: RagDocType,
): Promise<BackendRagAnswer> {
  const body: { question: string; docType?: RagDocType } = { question };
  if (docType) body.docType = docType;

  // 1. 发起流式查询
  const res = await fetch(`${API_BASE}/v1/rag/query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'text/event-stream',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text().catch(() => '');
    throw new Error(`后端 RAG 服务错误 (${res.status}): ${err}`);
  }

  if (!res.body) {
    throw new Error('后端 RAG 未返回流式响应');
  }

  // 2. 解析 SSE 流（OpenAI 兼容格式：data: {choices:[{delta:{content}}]}\n\n）
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let answer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      // 按行处理 SSE
      let newlineIdx: number;
      while ((newlineIdx = buffer.indexOf('\n')) >= 0) {
        const line = buffer.slice(0, newlineIdx).trim();
        buffer = buffer.slice(newlineIdx + 1);

        if (!line.startsWith('data:')) continue;
        const payload = line.slice(5).trim();
        if (payload === '[DONE]') continue;

        try {
          const parsed = JSON.parse(payload);
          // 错误事件
          if (parsed.error) {
            throw new Error(String(parsed.error));
          }
          const content: string = parsed.choices?.[0]?.delta?.content ?? '';
          if (content) {
            answer += content;
            onChunk(content);
          }
        } catch (e) {
          if (e instanceof Error && e.message && e.message !== 'Unexpected end of JSON input') {
            // 真正的 JSON 解析错误才抛出
            if (!(e instanceof SyntaxError)) throw e;
          }
        }
      }
    }
  } finally {
    reader.releaseLock();
  }

  if (!answer) {
    throw new Error('后端 RAG 返回空回答');
  }

  // 3. 获取引用来源（流式回答完成后）
  let sources: BackendRagSource[] = [];
  let matchScore = 0;
  try {
    const retrieveRes = await fetch(`${API_BASE}/v1/rag/retrieve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (retrieveRes.ok) {
      const items = (await retrieveRes.json()) as Array<Record<string, unknown>>;
      sources = items.map(item => ({
        id: String(item.id ?? ''),
        score: Number(item.score ?? 0),
        type: (item.type as RagDocType) ?? 'event',
        title: String(item.title ?? ''),
        content: String(item.content ?? ''),
        source: String(item.source ?? ''),
        year: item.year != null ? Number(item.year) : undefined,
        category: item.category != null ? String(item.category) : undefined,
        dynasty: item.dynasty != null ? String(item.dynasty) : undefined,
      }));
      matchScore = sources.reduce((sum, s) => sum + s.score, 0);
    }
  } catch {
    // retrieve 失败不影响回答展示
  }

  return { answer, sources, matchScore, mode: 'backend' };
}
