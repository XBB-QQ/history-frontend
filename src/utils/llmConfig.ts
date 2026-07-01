/**
 * LLM 运行时配置 — API Key 仅从 localStorage 读取，绝不嵌入构建产物
 *
 * 安全策略：
 * 1. 用户首次使用时通过 LlmConfigPanel 手动输入 API Key，存入 localStorage
 * 2. 不使用 import.meta.env.VITE_* 存放密钥（构建时会嵌入前端 JS，任何人可查看）
 * 3. .env 中的 VITE_* 变量仅用于开发环境本地回退，生产环境必须手动配置
 */

const STORAGE_KEY = 'llm_api_config';

export interface LlmConfig {
  apiKey: string;
  baseUrl: string;
  model: string;
}

/** 开发环境本地回退值（生产环境不应使用） */
const DEV_FALLBACK: LlmConfig = {
  apiKey: '', // 不再从 .env 读取，避免密钥泄露
  baseUrl: 'https://open.bigmodel.cn/api/paas/v4',
  model: 'glm-4-flash',
};

/** 获取 LLM 配置（优先从 localStorage） */
export function getLlmConfig(): LlmConfig {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return { ...DEV_FALLBACK, ...JSON.parse(stored) };
    } catch {
      return DEV_FALLBACK;
    }
  }
  return DEV_FALLBACK;
}

/** 保存 LLM 配置（到 localStorage） */
export function saveLlmConfig(config: LlmConfig): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

/** 检查是否已配置 API Key */
export function hasApiKey(): boolean {
  return getLlmConfig().apiKey.length > 0;
}

/** 清除 API Key */
export function clearLlmConfig(): void {
  localStorage.removeItem(STORAGE_KEY);
}
