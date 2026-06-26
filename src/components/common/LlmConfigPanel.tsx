/**
 * LLM API Key 配置面板 — 首次使用时弹出，引导用户输入 API Key
 */

import { useState } from 'react';
import { getLlmConfig, saveLlmConfig, hasApiKey, clearLlmConfig } from '@/utils/llmConfig';

export default function LlmConfigPanel() {
  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState(getLlmConfig());
  const [saved, setSaved] = useState(false);

  function handleSave() {
    saveLlmConfig(config);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setOpen(false);
    }, 1500);
  }

  function handleClear() {
    clearLlmConfig();
    setConfig(getLlmConfig());
  }

  return (
    <>
      {/* 触发按钮 */}
      <button
        onClick={() => setOpen(true)}
        className={`px-2 py-1 rounded text-xs font-bold transition-all ${
          hasApiKey()
            ? 'text-green-600 bg-green-500/10 hover:bg-green-500/20'
            : 'text-red-600 bg-red-500/10 hover:bg-red-500/20 animate-pulse'
        }`}
        title="配置 AI API Key"
      >
        ⚙️ {hasApiKey() ? 'AI已配置' : '未配置AI'}
      </button>

      {/* 配置面板 */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div className="w-full max-w-md p-6 bg-white dark:bg-ink-900 rounded-xl shadow-xl border border-ink-200 dark:border-ink-700">
            <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-1">
              机 AI 功能配置
            </h3>
            <p className="text-sm text-ink-500 dark:text-ink-400 mb-4">
              五千年史馆的 AI 功能（问答/辩论/史官/注解）需要智谱 AI 的免费 API Key。
              <br />
              <a href="https://open.bigmodel.cn/usercenter/apikeys" target="_blank" rel="noopener noreferrer"
                className="text-accent hover:underline">
                点 点击这里免费申请 →
              </a>
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-1 block">
                  API Key
                </label>
                <input
                  type="password"
                  value={config.apiKey}
                  onChange={e => setConfig(prev => ({ ...prev, apiKey: e.target.value }))}
                  placeholder="粘贴你的智谱 AI API Key..."
                  className="w-full px-3 py-2 rounded-lg bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-600 text-ink-900 dark:text-ink-100 focus:border-accent outline-none text-sm"
                />
                <div className="text-xs text-ink-400 mt-1">
                  注 Key 仅存储在浏览器本地(localStorage)，不会上传到任何服务器
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-1 block">
                  API 地址
                </label>
                <input
                  type="text"
                  value={config.baseUrl}
                  onChange={e => setConfig(prev => ({ ...prev, baseUrl: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-600 text-ink-900 dark:text-ink-100 focus:border-accent outline-none text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-1 block">
                  模型
                </label>
                <select
                  value={config.model}
                  onChange={e => setConfig(prev => ({ ...prev, model: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-600 text-ink-900 dark:text-ink-100 focus:border-accent outline-none text-sm"
                >
                  <option value="glm-4-flash">GLM-4-Flash（免费）</option>
                  <option value="glm-4-flash-250414">GLM-4-Flash-250414（免费新版）</option>
                  <option value="glm-4-plus">GLM-4-Plus（付费）</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={handleSave}
                disabled={!config.apiKey.trim()}
                className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                  saved
                    ? 'bg-green-600 text-white'
                    : 'bg-accent text-white hover:shadow-lg disabled:opacity-50'
                }`}
              >
                {saved ? '✓ 已保存' : '保存配置'}
              </button>
              {hasApiKey() && (
                <button
                  onClick={handleClear}
                  className="px-4 py-2 rounded-lg font-bold text-sm bg-red-500/10 text-red-600 hover:bg-red-500/20 transition-all"
                >
                  清除 Key
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-lg font-bold text-sm bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-400 transition-all"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
