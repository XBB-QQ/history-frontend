/**
 * AI 史官 — 个性化叙事生成页面
 * @see history-museum/design/002-innovation-brainstorm.md §3
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import { generateHistorianComment, buildUserPortraitFromStorage, type HistorianComment, type UserPortrait } from '@/features/aiHistorian';

const STYLE_LABELS = [
  { key: 'formal', label: '正史体', emoji: '史', desc: '模仿《史记》列传风格，文言文评价' },
  { key: 'anecdotal', label: '稗官体', emoji: '传', desc: '民间说书风格，通俗有趣' },
  { key: 'eulogy', label: '谥议体', emoji: '评', desc: '古代谥号评定格式，正式庄重' },
] as const;

export default function AiHistorianPage() {
  const [portrait, setPortrait] = useState<UserPortrait | null>(null);
  const [comment, setComment] = useState<HistorianComment | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeStyle, setActiveStyle] = useState<'formal' | 'anecdotal' | 'eulogy'>('formal');
  const [error, setError] = useState('');

  function handleBuildPortrait() {
    const p = buildUserPortraitFromStorage();
    setPortrait(p);
  }

  async function handleGenerate() {
    if (!portrait) {
      handleBuildPortrait();
      return;
    }

    setLoading(true);
    setError('');
    try {
      const result = await generateHistorianComment(portrait);
      setComment(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : '生成失败');
    } finally {
      setLoading(false);
    }
  }

  // 自动初始化画像
  if (!portrait) {
    handleBuildPortrait();
  }

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <RevealOnScroll direction="fade">
          <SectionHeader
            label="AI HISTORIAN"
            title="AI 史官评语"
            description="AI 生成的人物传记"
          />
        </RevealOnScroll>

        {/* 画像概览 */}
        {portrait && (
          <RevealOnScroll direction="up" delay={200}>
            <div className="mt-8 p-5 bg-white/70 dark:bg-ink-900/70 rounded-xl border border-ink-200 dark:border-ink-700">
              <h3 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-3 tracking-widest">
                像 你的历史画像
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                <div>
                  <div className="text-ink-500 dark:text-ink-400">常览朝代</div>
                  <div className="font-bold text-ink-900 dark:text-ink-100">{portrait.topDynasties.join('、')}</div>
                </div>
                <div>
                  <div className="text-ink-500 dark:text-ink-400">关注人物</div>
                  <div className="font-bold text-ink-900 dark:text-ink-100">{portrait.topPersons.join('、')}</div>
                </div>
                {portrait.quizAccuracy && (
                  <div>
                    <div className="text-ink-500 dark:text-ink-400">答题正确率</div>
                    <div className="font-bold text-accent">{portrait.quizAccuracy}%</div>
                  </div>
                )}
                {portrait.matchedFigure && (
                  <div>
                    <div className="text-ink-500 dark:text-ink-400">最像的人物</div>
                    <div className="font-bold text-accent">{portrait.matchedFigure}</div>
                  </div>
                )}
              </div>
              {portrait.dimensions && (
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {[
                    { key: 'governance', label: '文治', color: 'text-amber-600' },
                    { key: 'military', label: '武功', color: 'text-red-600' },
                    { key: 'wisdom', label: '智略', color: 'text-indigo-600' },
                    { key: 'charisma', label: '博学', color: 'text-green-600' },
                  ].map(d => (
                    <div key={d.key} className="text-center">
                      <div className="text-xs text-ink-400">{d.label}</div>
                      <div className={`text-lg font-bold ${d.color}`}>
                        {portrait.dimensions?.[d.key as keyof typeof portrait.dimensions] ?? '-'}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </RevealOnScroll>
        )}

        {/* 生成按钮 */}
        <RevealOnScroll direction="up" delay={300}>
          <div className="mt-6 text-center">
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-accent to-amber-600 text-white font-bold text-lg hover:shadow-xl disabled:opacity-50 transition-all"
            >
              {loading ? '撰写中…' : '为我作评'}
            </button>
          </div>
        </RevealOnScroll>

        {/* 错误 */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400">
            错 {error}
          </div>
        )}

        {/* 评语展示 */}
        {comment && (
          <RevealOnScroll direction="fade">
            <div className="mt-8 space-y-6">
              {/* 风格切换 */}
              <div className="flex gap-2 justify-center">
                {STYLE_LABELS.map(s => (
                  <button
                    key={s.key}
                    onClick={() => setActiveStyle(s.key)}
                    className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                      activeStyle === s.key
                        ? 'bg-accent text-white shadow-lg'
                        : 'bg-ink-100 dark:bg-ink-800 text-ink-700 dark:text-ink-300 hover:bg-accent hover:text-white'
                    }`}
                  >
                    {s.emoji} {s.label}
                  </button>
                ))}
              </div>

              {/* 评语内容 */}
              <div className="p-6 bg-gradient-to-br from-white/80 to-amber-50/30 dark:from-ink-900/80 dark:to-amber-900/10 rounded-xl border border-ink-200 dark:border-ink-700 shadow-sm">
                <div className="text-center mb-4">
                  <div className="text-3xl">{STYLE_LABELS.find(s => s.key === activeStyle)?.emoji}</div>
                  <div className="text-sm font-bold text-ink-500 dark:text-ink-400 mt-1">
                    {STYLE_LABELS.find(s => s.key === activeStyle)?.desc}
                  </div>
                </div>

                <div className="text-ink-900 dark:text-ink-100 leading-loose whitespace-pre-line text-lg font-serif"
                  style={{ fontFamily: 'var(--font-heading), serif' }}
                >
                  {comment[activeStyle] || comment.formal}
                </div>
              </div>

              {/* 学习建议 */}
              {comment.suggestion && (
                <div className="p-4 bg-accent/5 dark:bg-accent/10 rounded-lg border-l-4 border-accent text-center">
                  <div className="text-xs text-accent tracking-widest mb-1">注 史官建议</div>
                  <div className="text-ink-900 dark:text-ink-100 font-bold">{comment.suggestion}</div>
                </div>
              )}

              {/* 全三种风格预览 */}
              <div className="p-4 bg-ink-50/50 dark:bg-ink-900/30 rounded-lg border border-ink-200 dark:border-ink-700">
                <h4 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-3 tracking-widest">
                  三体对照
                </h4>
                <div className="space-y-3">
                  {STYLE_LABELS.map(s => (
                    <div key={s.key} className="text-sm">
                      <span className="font-bold text-accent">{s.emoji} {s.label}：</span>
                      <span className="text-ink-600 dark:text-ink-400">{comment[s.key]?.slice(0, 80) || '—'}…</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </RevealOnScroll>
        )}

        {/* 底部 */}
        <RevealOnScroll direction="fade" delay={400}>
          <div className="mt-12 text-center">
            <Link to="/" className="btn-secondary">返回首页</Link>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
