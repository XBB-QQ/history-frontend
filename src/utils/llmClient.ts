/**
 * LLM API 客户端 — 智谱 AI GLM-4-Flash
 * @see history-museum/design/002-innovation-brainstorm.md §2 RAG 问答
 *
 * ⚠️ 安全：API Key 从 localStorage 运行时读取，不使用 VITE_ 前缀（避免暴露在构建产物中）
 */

import { getLlmConfig, hasApiKey } from '@/utils/llmConfig';

function getConfig() {
  return getLlmConfig();
}

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

/**
 * 调用 LLM 生成回答
 */
export async function callLLM(
  messages: LLMMessage[],
  options: LLMOptions = {},
): Promise<string> {
  const config = getConfig();
  if (!hasApiKey()) {
    throw new Error('请先配置 API Key — 点击页面右上角"⚙️ 配置"按钮');
  }

  const {
    model = config.model,
    maxTokens = 2048,
    temperature = 0.7,
  } = options;

  const res = await fetch(`${config.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: maxTokens,
      temperature,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`LLM API 错误 (${res.status}): ${err}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? '';
}

/**
 * 流式调用 LLM — 返回 ReadableStream
 */
export async function callLLMStream(
  messages: LLMMessage[],
  options: LLMOptions = {},
): Promise<ReadableStream<string>> {
  const config = getConfig();
  if (!hasApiKey()) {
    throw new Error('请先配置 API Key — 点击页面右上角"⚙️ 配置"按钮');
  }

  const {
    model = config.model,
    maxTokens = 2048,
    temperature = 0.7,
  } = options;

  const res = await fetch(`${config.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: maxTokens,
      temperature,
      stream: true,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`LLM API 错误 (${res.status}): ${err}`);
  }

  // 将 SSE 流转为文本 ReadableStream
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
      // 解析 SSE 格式: data: {"choices":[{"delta":{"content":"..."}}]}
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
