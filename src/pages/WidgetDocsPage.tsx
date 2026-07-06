/**
 * Widget API 文档
 * @see ITERATIONS.md #104
 */

import { useState } from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import { useT } from '@/i18n/i18n';

export default function WidgetDocsPage() {
  const [activeSection, setActiveSection] = useState('overview');
  const t = useT();

  const sections = [
    { id: 'overview', labelKey: 'widgetDocs.nav_overview' },
    { id: 'embed', labelKey: 'widgetDocs.nav_embed' },
    { id: 'api', labelKey: 'widgetDocs.nav_api' },
    { id: 'examples', labelKey: 'widgetDocs.nav_examples' },
  ];

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <RevealOnScroll>
          <SectionHeader
            label="WIDGET API"
            title={t('widgetDocs.title')}
            description={t('widgetDocs.description')}
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
                {t(s.labelKey)}
              </button>
            ))}
          </div>
        </RevealOnScroll>

        {/* 概述 */}
        {activeSection === 'overview' && (
          <RevealOnScroll direction="up" delay={200}>
            <div className="bg-white dark:bg-ink-900 rounded-2xl border-2 border-ink-200 dark:border-ink-700 p-6 shadow-lg space-y-4">
              <h3 className="text-xl font-bold text-ink-900 dark:text-ink-100">{t('widgetDocs.overview_title')}</h3>
              <p className="text-ink-700 dark:text-ink-300">
                {t('widgetDocs.overview_desc')}
              </p>
              <h4 className="font-bold text-ink-900 dark:text-ink-100">{t('widgetDocs.supported_pages')}</h4>
              <ul className="space-y-1 text-sm text-ink-600 dark:text-ink-400">
                <li>• {t('widgetDocs.pages_ai_historian')}：<code className="bg-ink-100 dark:bg-ink-800 px-1.5 py-0.5 rounded text-xs">/ai-historian?embed=1</code></li>
                <li>• {t('widgetDocs.pages_simulator')}：<code className="bg-ink-100 dark:bg-ink-800 px-1.5 py-0.5 rounded text-xs">/simulator?embed=1</code></li>
                <li>• {t('widgetDocs.pages_measure')}：<code className="bg-ink-100 dark:bg-ink-800 px-1.5 py-0.5 rounded text-xs">/measure?embed=1</code></li>
                <li>• {t('widgetDocs.pages_color_history')}：<code className="bg-ink-100 dark:bg-ink-800 px-1.5 py-0.5 rounded text-xs">/color-history?embed=1</code></li>
                <li>• {t('widgetDocs.pages_artifact_quiz')}：<code className="bg-ink-100 dark:bg-ink-800 px-1.5 py-0.5 rounded text-xs">/artifact-quiz?embed=1</code></li>
              </ul>
              <h4 className="font-bold text-ink-900 dark:text-ink-100">{t('widgetDocs.embed_features')}</h4>
              <ul className="space-y-1 text-sm text-ink-600 dark:text-ink-400">
                <li>✅ {t('widgetDocs.feature_hide_nav')}</li>
                <li>✅ {t('widgetDocs.feature_responsive')}</li>
                <li>✅ {t('widgetDocs.feature_theme')}</li>
                <li>✅ {t('widgetDocs.feature_postmessage')}</li>
              </ul>
            </div>
          </RevealOnScroll>
        )}

        {/* 嵌入方式 */}
        {activeSection === 'embed' && (
          <RevealOnScroll direction="up" delay={200}>
            <div className="bg-white dark:bg-ink-900 rounded-2xl border-2 border-ink-200 dark:border-ink-700 p-6 shadow-lg">
              <h3 className="text-xl font-bold text-ink-900 dark:text-ink-100 mb-4">{t('widgetDocs.embed_method_title')}</h3>
              <pre className="bg-ink-50 dark:bg-ink-800 p-4 rounded-xl overflow-x-auto text-sm text-ink-800 dark:text-ink-200">
{`<iframe
  src="https://history-museum.example.com/ai-historian?embed=1"
  width="100%"
  height="600"
  frameborder="0"
  allowfullscreen
/>`}
              </pre>
              <h4 className="font-bold text-ink-900 dark:text-ink-100 mt-6 mb-2">{t('widgetDocs.params_title')}</h4>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-ink-200 dark:border-ink-700">
                    <th className="text-left py-2">{t('widgetDocs.param_name')}</th>
                    <th className="text-left py-2">{t('widgetDocs.param_desc')}</th>
                  </tr>
                </thead>
                <tbody className="space-y-2">
                  <tr className="border-b border-ink-100 dark:border-ink-800">
                    <td className="py-2 font-mono text-accent">embed</td>
                    <td className="py-2">{t('widgetDocs.param_embed')}</td>
                  </tr>
                  <tr className="border-b border-ink-100 dark:border-ink-800">
                    <td className="py-2 font-mono text-accent">theme</td>
                    <td className="py-2">{t('widgetDocs.param_theme')}</td>
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
                <h3 className="text-xl font-bold text-ink-900 dark:text-ink-100 mb-2">{t('widgetDocs.send_to_parent')}</h3>
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
                <h3 className="text-xl font-bold text-ink-900 dark:text-ink-100 mb-2">{t('widgetDocs.receive_from_parent')}</h3>
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
                <h3 className="text-xl font-bold text-ink-900 dark:text-ink-100 mb-2">{t('widgetDocs.example_complete')}</h3>
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
                <h3 className="text-xl font-bold text-ink-900 dark:text-ink-100 mb-2">{t('widgetDocs.example_react')}</h3>
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
