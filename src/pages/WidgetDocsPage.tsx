/**
 * Widget API 文档
 * @see ITERATIONS.md #104
 */

import { useState } from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';

export default function WidgetDocsPage() {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', label: '概述' },
    { id: 'embed', label: '嵌入方式' },
    { id: 'api', label: '通信 API' },
    { id: 'examples', label: '示例代码' },
  ];

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <RevealOnScroll>
          <SectionHeader
            label="WIDGET API"
            title="开放 Widget API 文档"
            description="将史馆工具嵌入到你的网站"
          />
        </RevealOnScroll>

        {/* 导航 */}
        <RevealOnScroll delay={100}>
          <div className="flex gap-2 mt-6 mb-8 overflow-x-auto pb-2">
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap ${
                  activeSection === s.id
                    ? 'bg-accent text-white'
                    : 'bg-white dark:bg-ink-900 text-ink-600 dark:text-ink-400'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </RevealOnScroll>

        {/* 概述 */}
        {activeSection === 'overview' && (
          <RevealOnScroll direction="up" delay={200}>
            <div className="bg-white dark:bg-ink-900 rounded-2xl border-2 border-ink-200 dark:border-ink-700 p-6 shadow-lg space-y-4">
              <h3 className="text-xl font-bold text-ink-900 dark:text-ink-100">什么是 Widget API？</h3>
              <p className="text-ink-700 dark:text-ink-300">
                通过添加 <code className="bg-ink-100 dark:bg-ink-800 px-2 py-0.5 rounded text-sm">?embed=1</code> 参数，
                可以将史馆的任何工具页面以精简模式嵌入到其他网站中。
              </p>
              <h4 className="font-bold text-ink-900 dark:text-ink-100">支持的页面</h4>
              <ul className="space-y-1 text-sm text-ink-600 dark:text-ink-400">
                <li>• AI 史官：<code className="bg-ink-100 dark:bg-ink-800 px-1.5 py-0.5 rounded text-xs">/ai-historian?embed=1</code></li>
                <li>• 历史抉择：<code className="bg-ink-100 dark:bg-ink-800 px-1.5 py-0.5 rounded text-xs">/simulator?embed=1</code></li>
                <li>• 度量衡换算：<code className="bg-ink-100 dark:bg-ink-800 px-1.5 py-0.5 rounded text-xs">/measure?embed=1</code></li>
                <li>• 历史色谱：<code className="bg-ink-100 dark:bg-ink-800 px-1.5 py-0.5 rounded text-xs">/color-history?embed=1</code></li>
                <li>• 信物鉴定：<code className="bg-ink-100 dark:bg-ink-800 px-1.5 py-0.5 rounded text-xs">/artifact-quiz?embed=1</code></li>
              </ul>
              <h4 className="font-bold text-ink-900 dark:text-ink-100">嵌入模式特性</h4>
              <ul className="space-y-1 text-sm text-ink-600 dark:text-ink-400">
                <li>✅ 隐藏导航栏和页脚</li>
                <li>✅ 自适应宽度</li>
                <li>✅ 支持深色/浅色主题跟随</li>
                <li>✅ 可通过 postMessage 与父页面通信</li>
              </ul>
            </div>
          </RevealOnScroll>
        )}

        {/* 嵌入方式 */}
        {activeSection === 'embed' && (
          <RevealOnScroll direction="up" delay={200}>
            <div className="bg-white dark:bg-ink-900 rounded-2xl border-2 border-ink-200 dark:border-ink-700 p-6 shadow-lg">
              <h3 className="text-xl font-bold text-ink-900 dark:text-ink-100 mb-4">iframe 嵌入方式</h3>
              <pre className="bg-ink-50 dark:bg-ink-800 p-4 rounded-xl overflow-x-auto text-sm text-ink-800 dark:text-ink-200">
{`<iframe
  src="https://history-museum.example.com/ai-historian?embed=1"
  width="100%"
  height="600"
  frameborder="0"
  allowfullscreen
/>`}
              </pre>
              <h4 className="font-bold text-ink-900 dark:text-ink-100 mt-6 mb-2">可用参数</h4>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-ink-200 dark:border-ink-700">
                    <th className="text-left py-2">参数</th>
                    <th className="text-left py-2">说明</th>
                  </tr>
                </thead>
                <tbody className="space-y-2">
                  <tr className="border-b border-ink-100 dark:border-ink-800">
                    <td className="py-2 font-mono text-accent">embed</td>
                    <td className="py-2">设为 1 启用嵌入模式</td>
                  </tr>
                  <tr className="border-b border-ink-100 dark:border-ink-800">
                    <td className="py-2 font-mono text-accent">theme</td>
                    <td className="py-2">可选 light/dark/auto</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </RevealOnScroll>
        )}

        {/* 通信 API */}
        {activeSection === 'api' && (
          <RevealOnScroll direction="up" delay={200}>
            <div className="bg-white dark:bg-ink-900 rounded-2xl border-2 border-ink-200 dark:border-ink-700 p-6 shadow-lg space-y-6">
              <div>
                <h3 className="text-xl font-bold text-ink-900 dark:text-ink-100 mb-2">向父页面发消息</h3>
                <pre className="bg-ink-50 dark:bg-ink-800 p-4 rounded-xl overflow-x-auto text-sm">
{`// 嵌入页面内
postMessageToParent('user-action', {
  action: 'quiz-complete',
  score: 85,
  timestamp: Date.now()
});`}
                </pre>
              </div>
              <div>
                <h3 className="text-xl font-bold text-ink-900 dark:text-ink-100 mb-2">接收父页面消息</h3>
                <pre className="bg-ink-50 dark:bg-ink-800 p-4 rounded-xl overflow-x-auto text-sm">
{`// 父页面
const iframe = document.querySelector('iframe');
iframe.contentWindow.postMessage({
  type: 'set-theme',
  data: { theme: 'dark' }
}, 'https://history-museum.example.com');`}
                </pre>
              </div>
            </div>
          </RevealOnScroll>
        )}

        {/* 示例 */}
        {activeSection === 'examples' && (
          <RevealOnScroll direction="up" delay={200}>
            <div className="bg-white dark:bg-ink-900 rounded-2xl border-2 border-ink-200 dark:border-ink-700 p-6 shadow-lg space-y-6">
              <div>
                <h3 className="text-xl font-bold text-ink-900 dark:text-ink-100 mb-2">完整示例</h3>
                <pre className="bg-ink-50 dark:bg-ink-800 p-4 rounded-xl overflow-x-auto text-sm">
{`<!DOCTYPE html>
<html>
<head><title>我的史馆</title></head>
<body>
  <h1>我的史馆工具</h1>
  <iframe
    src="https://history-museum.example.com/ai-historian?embed=1"
    width="100%"
    height="600"
    frameborder="0"
  ></iframe>
  <script>
    window.addEventListener('message', (e) => {
      if (e.data.type === 'quiz-complete') {
        console.log('用户完成测验:', e.data.score);
      }
    });
  </script>
</body>
</html>`}
                </pre>
              </div>
              <div>
                <h3 className="text-xl font-bold text-ink-900 dark:text-ink-100 mb-2">React 示例</h3>
                <pre className="bg-ink-50 dark:bg-ink-800 p-4 rounded-xl overflow-x-auto text-sm">
{`import React, { useEffect, useRef } from 'react';

function HistoryWidget() {
  const iframeRef = useRef(null);

  useEffect(() => {
    const handleMessage = (e) => {
      if (e.data?.type === 'quiz-complete') {
        console.log('得分:', e.data.score);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <iframe
      ref={iframeRef}
      src="https://history-museum.example.com/measure?embed=1"
      width="100%"
      height="500"
      frameBorder="0"
    />
  );
}`}
                </pre>
              </div>
            </div>
          </RevealOnScroll>
        )}
      </div>
    </div>
  );
}
