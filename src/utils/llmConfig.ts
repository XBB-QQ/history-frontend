/**
 * LLM 运行时配置 — API Key 不使用 VITE_ 前缀，避免暴露在构建产物中
 * 
 * 安全策略：
 * 1. API Key 通过 localStorage 手动配置（首次访问时弹出配置面板）
 * 2. 不使用 import.meta.env.VITE_* 存放密钥（这些会被嵌入前端 JS）
 * 3. 用户需自行在智谱 AI 开放平台申请免费 API Key
 */

const STORAGE_KEY = 'llm_api_config';

export interface LlmConfig {
  apiKey: string;
  baseUrl: string;
  model: string;
}

const DEFAULT_CONFIG: LlmConfig = {
  apiKey: '',
  baseUrl: 'https://open.bigmodel.cn/api/paas/v4',
  model: 'glm-4-flash',
};

/** 获取 LLM 配置（从 localStorage） */
export function getLlmConfig(): LlmConfig {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return { ...DEFAULT_CONFIG, ...JSON.parse(stored) };
    } catch {
      return DEFAULT_CONFIG;
    }
  }
  return DEFAULT_CONFIG;
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
