/**
 * 奏折 / 尺牍格式生成器
 * @see ITERATIONS.md #97
 */

import { useState, useCallback } from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import {
  DOCUMENT_TEMPLATES,
  generateDocumentImage,
  downloadCanvas,
  type DocumentTemplate,
} from '@/utils/documentRenderer';
import { useT } from '@/i18n/i18n';

export default function DocumentGeneratorPage() {
  const t = useT();
  const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate>(DOCUMENT_TEMPLATES[0]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [sender, setSender] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = useCallback(async () => {
    if (!title.trim() || !content.trim()) {
      alert(t('documentGenerator.fillRequired'));
      return;
    }

    setIsGenerating(true);
    try {
      const date = new Date().toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      const canvas = await generateDocumentImage(selectedTemplate, title, content, sender || t('documentGenerator.defaultSender'), date);
      setPreviewUrl(canvas.toDataURL('image/png'));
    } catch {
      alert(t('documentGenerator.generateFailed'));
    } finally {
      setIsGenerating(false);
    }
  }, [selectedTemplate, title, content, sender]);

  const handleDownload = () => {
    if (!previewUrl) return;
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 1200;
    const ctx = canvas.getContext('2d')!;
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      downloadCanvas(canvas, `${title || 'document'}_${Date.now()}.png`);
    };
    img.src = previewUrl;
  };

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* 头部 */}
        <RevealOnScroll>
          <SectionHeader
            label="DOCUMENT GENERATOR"
            title={t('documentGenerator.title')}
            description={t('documentGenerator.description')}
          />
        </RevealOnScroll>

        {/* 模板选择 */}
        <RevealOnScroll delay={100}>
          <div className="mt-8 bg-white dark:bg-ink-900 rounded-2xl border-2 border-ink-200 dark:border-ink-700 p-6 shadow-lg mb-8">
            <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-4">{t('documentGenerator.selectTemplate')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {DOCUMENT_TEMPLATES.map(template => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template)}
                  className={`p-4 rounded-xl text-left transition-all ${
                    selectedTemplate.id === template.id
                      ? 'border-2 border-accent bg-accent/5 shadow-lg'
                      : 'border-2 border-ink-200 dark:border-ink-700 hover:border-ink-400'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-10 h-10 rounded-lg border-2"
                      style={{ backgroundColor: template.paperColor, borderColor: template.borderColor }}
                    />
                    <div>
                      <h4 className="font-bold text-ink-900 dark:text-ink-100">{template.name}</h4>
                      <p className="text-xs text-ink-500">{template.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* 编辑区 */}
        <RevealOnScroll delay={200}>
          <div className="bg-white dark:bg-ink-900 rounded-2xl border-2 border-ink-200 dark:border-ink-700 p-6 shadow-lg mb-8">
            <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-4">{t('documentGenerator.editContent')}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ink-600 dark:text-ink-400 mb-1">{t('documentGenerator.titleLabel')}</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input-field"
                  placeholder={t('documentGenerator.titlePlaceholder')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink-600 dark:text-ink-400 mb-1">{t('documentGenerator.contentLabel')}</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="input-field h-48"
                  placeholder={t('documentGenerator.contentPlaceholder')}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-ink-600 dark:text-ink-400 mb-1">{t('documentGenerator.senderLabel')}</label>
                  <input
                    type="text"
                    value={sender}
                    onChange={(e) => setSender(e.target.value)}
                    className="input-field"
                    placeholder={t('documentGenerator.senderPlaceholder')}
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating || !title.trim() || !content.trim()}
                    className="w-full px-6 py-3 rounded-xl bg-accent text-white font-bold hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    {isGenerating ? `⏳ ${t('documentGenerator.generating')}` : `📜 ${t('documentGenerator.generate')}`}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* 预览区 */}
        {previewUrl && (
          <RevealOnScroll delay={300}>
            <div className="bg-white dark:bg-ink-900 rounded-2xl border-2 border-ink-200 dark:border-ink-700 p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100">{t('documentGenerator.resultTitle')}</h3>
                <button
                  onClick={handleDownload}
                  className="px-4 py-2 rounded-lg bg-green-500 text-white font-bold hover:bg-green-600"
                >
                  📥 {t('documentGenerator.downloadPng')}
                </button>
              </div>
              <div className="flex justify-center">
                <img
                  src={previewUrl}
                  alt={t('documentGenerator.generatedAlt')}
                  className="max-w-full rounded-xl shadow-xl border-2 border-ink-200 dark:border-ink-700"
                  style={{ maxHeight: '600px', objectFit: 'contain' }}
                />
              </div>
            </div>
          </RevealOnScroll>
        )}
      </div>
    </div>
  );
}
