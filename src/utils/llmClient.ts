/**
 * LLM API 客户端 — 通过后端代理调用，前端不持有 API Key
 * @see history-backend LlmController
 *
 * 安全策略：API Key 存放于后端环境变量 LLM_API_KEY，前端只调 /api/llm/*
 */

export interface LLMMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface LLMOptions {
  model?: string;
  maxTokens?: number;
  temperature?: number;
  stream?: boolean;
}

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

/**
 * 调用 LLM 生成回答（非流式）
 */
export async function callLLM(
  messages: LLMMessage[],
  options: LLMOptions = {},
): Promise<string> {
  const { model, maxTokens, temperature } = options;

  const res = await fetch(`${API_BASE}/llm/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, model, maxTokens, temperature }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`LLM 服务错误 (${res.status}): ${err}`);
  }

  const data = await res.json();
  return data.content ?? '';
}

/**
 * 流式调用 LLM — 返回 ReadableStream
 */
export async function callLLMStream(
  messages: LLMMessage[],
  options: LLMOptions = {},
): Promise<ReadableStream<string>> {
  const { model, maxTokens, temperature } = options;

  const res = await fetch(`${API_BASE}/llm/chat/stream`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, model, maxTokens, temperature }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`LLM 服务错误 (${res.status}): ${err}`);
  }

  const reader = res.body!.getReader();
  const decoder = new TextDecoder();

  return new ReadableStream<string>({
    async pull(controller) {
      const { done, value } = await reader.read();
      if (done) {
        controller.close();
        return;
      }

      const text = decoder.decode(value, { stream: true });
      const lines = text.split('\n').filter(l => l.startsWith('data:'));
      for (const line of lines) {
        const jsonStr = line.slice(5).trim();
        if (jsonStr === '[DONE]') {
          controller.close();
          return;
        }
        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content ?? '';
          if (content) {
            controller.enqueue(content);
          }
        } catch {
          // 忽略解析错误
        }
      }
    },
    cancel() {
      reader.cancel();
    },
  });
}

/**
 * 从流中逐步读取并拼接完整回答
 */
export async function readStreamToString(
  stream: ReadableStream<string>,
  onChunk?: (chunk: string) => void,
): Promise<string> {
  const reader = stream.getReader();
  let result = '';
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    result += value;
    onChunk?.(value);
  }
  return result;
}
