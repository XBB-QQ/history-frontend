/**
 * 多视角事件叙事页面 — 罗生门式
 * @see history-museum/design/002-innovation-brainstorm.md §11
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import { MULTI_PERSPECTIVE_EVENTS, type MultiPerspectiveEvent, type Perspective } from '@/data/features/multiPerspectives';
import { useT } from '@/i18n/i18n';

type ViewMode = 'overview' | 'single';

const FACTION_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  '曹魏': { bg: 'bg-red-500/10 dark:bg-red-700/10', text: 'text-red-700 dark:text-red-400', border: 'border-red-500' },
  '东吴': { bg: 'bg-green-500/10 dark:bg-green-700/10', text: 'text-green-700 dark:text-green-400', border: 'border-green-500' },
  '蜀汉': { bg: 'bg-blue-500/10 dark:bg-blue-700/10', text: 'text-blue-700 dark:text-blue-400', border: 'border-blue-500' },
  '北宋皇室': { bg: 'bg-amber-500/10 dark:bg-amber-700/10', text: 'text-amber-700 dark:text-amber-400', border: 'border-amber-500' },
  '金国': { bg: 'bg-gray-500/10 dark:bg-gray-700/10', text: 'text-gray-700 dark:text-gray-400', border: 'border-gray-500' },
  '平民': { bg: 'bg-ink-500/10 dark:bg-ink-700/10', text: 'text-ink-700 dark:text-ink-300', border: 'border-ink-400' },
  '秦王派': { bg: 'bg-accent/10 dark:bg-accent/20', text: 'text-accent', border: 'border-accent' },
  '太子派': { bg: 'bg-blue-500/10 dark:bg-blue-700/10', text: 'text-blue-700 dark:text-blue-400', border: 'border-blue-500' },
  '皇帝': { bg: 'bg-purple-500/10 dark:bg-purple-700/10', text: 'text-purple-700 dark:text-purple-400', border: 'border-purple-500' },
};

export default function MultiPerspectivePage() {
  const t = useT();
  const [selectedEvent, setSelectedEvent] = useState<MultiPerspectiveEvent | null>(null);
  const [activePerspective, setActivePerspective] = useState<number>(0);
  const [viewMode, setViewMode] = useState<ViewMode>('overview');

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <RevealOnScroll direction="fade">
          <SectionHeader
            label={t('multiPerspective.label')}
            title={t('multiPerspective.title')}
            description={t('multiPerspective.description')}
          />
        </RevealOnScroll>

        {/* 事件选择 */}
        {!selectedEvent && (
          <RevealOnScroll direction="up" delay={200}>
            <div className="mt-8 space-y-4">
              {MULTI_PERSPECTIVE_EVENTS.map(event => (
                <button
                  key={event.id}
                  onClick={() => { setSelectedEvent(event); setActivePerspective(0); }}
                  className="w-full p-5 bg-white/70 dark:bg-ink-900/70 rounded-xl border border-ink-200 dark:border-ink-700 hover:border-accent hover:shadow-lg transition-all text-left group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 group-hover:text-accent transition-colors">
                      {event.title}
                    </h3>
                    <span className="text-sm text-ink-500 dark:text-ink-400">
                      {event.yearDisplay} · {event.dynasty}
                    </span>
                  </div>
                  <p className="text-sm text-ink-600 dark:text-ink-400">
                    {event.neutralSummary.slice(0, 80)}…
                  </p>
                  <div className="mt-2 flex gap-2">
                    {event.perspectives.map(p => (
                      <span key={p.figureName} className="text-xs px-2 py-0.5 rounded-full bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-400">
                        {p.emoji} {p.figureName}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </RevealOnScroll>
        )}

        {/* 事件详情 */}
        {selectedEvent && (
          <div className="mt-8 space-y-6">
            {/* 返回按钮 */}
            <button
              onClick={() => setSelectedEvent(null)}
              className="text-sm text-ink-500 dark:text-ink-400 hover:text-accent transition-colors"
            >
              {t('multiPerspective.back_to_list')}
            </button>

            {/* 事件头部 */}
            <div className="p-5 bg-gradient-to-br from-accent/5 to-amber-500/5 dark:from-accent/10 dark:to-amber-700/10 rounded-xl border border-accent/20">
              <div className="flex items-center gap-3 flex-wrap mb-2">
                <h2 className="text-2xl font-bold text-ink-900 dark:text-ink-100">
                  {selectedEvent.title}
                </h2>
                <span className="text-sm text-ink-500 dark:text-ink-400">
                  {selectedEvent.yearDisplay} · {selectedEvent.dynasty}
                </span>
              </div>
              <p className="text-ink-800 dark:text-ink-200 leading-relaxed">
                {selectedEvent.neutralSummary}
              </p>
            </div>

            {/* 视角切换 + 视图模式 */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex gap-2">
                {selectedEvent.perspectives.map((p, idx) => {
                  const faction = FACTION_COLORS[p.faction] || FACTION_COLORS['平民'];
                  return (
                    <button
                      key={idx}
                      onClick={() => setActivePerspective(idx)}
                      className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                        activePerspective === idx
                          ? `${faction.bg} ${faction.text} ${faction.border} border-2 shadow-md`
                          : 'bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-400 hover:bg-accent hover:text-white'
                      }`}
                    >
                      {p.emoji} {p.figureName}
                    </button>
                  );
                })}
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => setViewMode('overview')}
                  className={`px-3 py-1 rounded text-xs font-bold ${viewMode === 'overview' ? 'bg-accent text-white' : 'bg-ink-100 dark:bg-ink-800 text-ink-600'}`}
                >
                  {t('multiPerspective.view_overview')}
                </button>
                <button
                  onClick={() => setViewMode('single')}
                  className={`px-3 py-1 rounded text-xs font-bold ${viewMode === 'single' ? 'bg-accent text-white' : 'bg-ink-100 dark:bg-ink-800 text-ink-600'}`}
                >
                  {t('multiPerspective.view_single')}
                </button>
              </div>
            </div>

            {/* 全景模式：三视角并列 */}
            {viewMode === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {selectedEvent.perspectives.map((p, idx) => {
                  const faction = FACTION_COLORS[p.faction] || FACTION_COLORS['平民'];
                  return (
                    <div
                      key={idx}
                      onClick={() => { setActivePerspective(idx); setViewMode('single'); }}
                      className={`cursor-pointer p-4 rounded-xl ${faction.bg} border ${faction.border} hover:shadow-lg transition-all`}
                    >
                      <div className="text-center mb-3">
                        <div className="text-3xl mb-1">{p.emoji}</div>
                        <div className={`font-bold ${faction.text}`}>{p.figureName}</div>
                        <div className="text-xs text-ink-400">{p.figureRole} · {p.faction}</div>
                      </div>
                      <p className="text-sm text-ink-700 dark:text-ink-300 leading-relaxed">
                        {p.narrative.slice(0, 100)}…
                      </p>
                      <div className="mt-2 text-xs text-ink-400 text-center">{t('multiPerspective.view_full')}</div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* 单视角模式 */}
            {viewMode === 'single' && (() => {
              const p = selectedEvent.perspectives[activePerspective];
              const faction = FACTION_COLORS[p.faction] || FACTION_COLORS['平民'];
              return (
                <div className="space-y-4">
                  {/* 视角标题 */}
                  <div className={`p-5 rounded-xl ${faction.bg} border-l-4 ${faction.border}`}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-3xl">{p.emoji}</div>
                      <div>
                        <div className={`font-bold text-lg ${faction.text}`}>{p.figureName}</div>
                        <div className="text-sm text-ink-400">{p.figureRole} · {p.faction}</div>
                      </div>
                    </div>
                  </div>

                  {/* 叙事 */}
                  <div className="p-5 bg-white/70 dark:bg-ink-900/70 rounded-lg border border-ink-200 dark:border-ink-700">
                    <h3 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-2 tracking-widest">
                      {t('multiPerspective.narrative_title')}
                    </h3>
                    <p className="text-ink-800 dark:text-ink-200 leading-loose whitespace-pre-line">
                      {p.narrative}
                    </p>
                  </div>

                  {/* 独有信息 */}
                  <div className="p-4 bg-amber-50/60 dark:bg-amber-900/10 rounded-lg border-l-4 border-amber-500">
                    <h3 className="text-sm font-bold text-amber-700 dark:text-amber-400 mb-2 tracking-widest">
                      {t('multiPerspective.exclusive_info')}
                    </h3>
                    <p className="text-ink-800 dark:text-ink-200 text-sm leading-relaxed">
                      {p.exclusiveInfo}
                    </p>
                    <div className="text-xs text-ink-400 mt-1">
                      {t('multiPerspective.exclusive_note', { name: p.figureName })}
                    </div>
                  </div>

                  {/* 评价 */}
                  <div className={`p-4 rounded-lg ${faction.bg} border ${faction.border}`}>
                    <h3 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-2 tracking-widest">
                      {t('multiPerspective.judgment_title')}
                    </h3>
                    <p className={`font-bold ${faction.text}`}>{p.judgment}</p>
                  </div>
                </div>
              );
            })()}

            {/* 矛盾对比 */}
            <div className="p-5 bg-indigo-50/60 dark:bg-indigo-900/10 rounded-lg border-l-4 border-indigo-500">
              <h3 className="text-sm font-bold text-indigo-700 dark:text-indigo-400 mb-3 tracking-widest">
                {t('multiPerspective.contradictions_title')}
              </h3>
              <div className="space-y-3">
                {selectedEvent.contradictions.map((c, idx) => (
                  <div key={idx} className="text-sm text-ink-800 dark:text-ink-200">
                    <span className="text-indigo-500 font-bold">{idx + 1}.</span> {c}
                  </div>
                ))}
              </div>
            </div>

            {/* 历史教训 */}
            <div className="p-5 bg-gradient-to-br from-amber-500/10 to-accent/10 dark:from-amber-700/15 dark:to-accent/15 rounded-lg">
              <h3 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-2 tracking-widest">
                {t('multiPerspective.lesson_title')}
              </h3>
              <p className="text-ink-800 dark:text-ink-200 leading-loose italic">
                {selectedEvent.lesson}
              </p>
            </div>
          </div>
        )}

        {/* 底部 */}
        <RevealOnScroll direction="fade" delay={400}>
          <div className="mt-12 text-center">
            <Link to="/" className="btn-secondary">{t('multiPerspective.back_home')}</Link>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
