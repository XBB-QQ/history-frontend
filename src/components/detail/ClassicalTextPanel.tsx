/**
 * 史书原文引用面板
 * 古文 / 白话对照展示
 * @see history-museum/design/000-future-roadmap.md §方向二 §2.1
 */

import { useState } from 'react';

interface ClassicalTextPanelProps {
  classicalText: string;
  classicalSource?: string;
  modernTranslation?: string;
}

type ViewMode = 'parallel' | 'classical' | 'modern';

export default function ClassicalTextPanel({
  classicalText,
  classicalSource,
  modernTranslation,
}: ClassicalTextPanelProps) {
  const [mode, setMode] = useState<ViewMode>('parallel');

  if (!classicalText) return null;

  const hasModern = Boolean(modernTranslation);

  return (
    <div className="mt-4 p-4 bg-gradient-to-br from-amber-50/60 to-orange-50/40 dark:from-amber-900/10 dark:to-orange-900/10 border border-amber-200/50 dark:border-amber-700/40 rounded-lg">
      {/* 标题行 */}
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="text-lg" aria-hidden>
            ▤
          </span>
          <h4 className="font-bold text-ink-900 dark:text-ink-100 text-sm tracking-wider">
            史书记载
          </h4>
          {classicalSource && (
            <span className="text-xs text-amber-700 dark:text-amber-400 italic">
              — {classicalSource}
            </span>
          )}
        </div>

        {/* 模式切换 */}
        {hasModern && (
          <div className="flex gap-1 text-xs">
            {([
              { id: 'parallel' as const, label: '对照' },
              { id: 'classical' as const, label: '古文' },
              { id: 'modern' as const, label: '白话' },
            ] as const).map((opt) => (
              <button
                key={opt.id}
                onClick={() => setMode(opt.id)}
                className={`px-2 py-1 rounded transition-colors ${
                  mode === opt.id
                    ? 'bg-amber-600 text-white'
                    : 'bg-amber-100/50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 hover:bg-amber-200/60'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 内容 */}
      <div
        className="text-ink-800 dark:text-ink-200 leading-loose"
        style={{ fontFamily: 'var(--font-heading, serif)' }}
      >
        {mode === 'parallel' && hasModern && (
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-amber-700 dark:text-amber-400 mb-1 tracking-widest">
                古文
              </div>
              <p className="text-sm leading-loose whitespace-pre-line">
                {classicalText}
              </p>
            </div>
            <div className="md:border-l md:border-amber-200/50 md:pl-4">
              <div className="text-xs text-amber-700 dark:text-amber-400 mb-1 tracking-widest">
                译文
              </div>
              <p className="text-sm leading-loose whitespace-pre-line text-ink-600 dark:text-ink-300">
                {modernTranslation}
              </p>
            </div>
          </div>
        )}

        {mode === 'classical' && (
          <p className="text-base leading-loose whitespace-pre-line">
            {classicalText}
          </p>
        )}

        {mode === 'modern' && hasModern && (
          <p className="text-base leading-loose whitespace-pre-line text-ink-700 dark:text-ink-300">
            {modernTranslation}
          </p>
        )}
      </div>
    </div>
  );
}
