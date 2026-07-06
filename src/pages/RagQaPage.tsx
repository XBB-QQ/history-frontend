/**
 * RAG 自然语言历史问答页面
 * @see history-museum/design/002-innovation-brainstorm.md §2
 */

import { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import { askHistoryStream, type RagAnswer } from '@/features/ragSearch';
import { useT } from '@/i18n/i18n';

const SUGGESTIONS = [
  'ragQa.suggestion_1',
  'ragQa.suggestion_2',
  'ragQa.suggestion_3',
  'ragQa.suggestion_4',
  'ragQa.suggestion_5',
  'ragQa.suggestion_6',
  'ragQa.suggestion_7',
  'ragQa.suggestion_8',
];

export default function RagQaPage() {
  const [question, setQuestion] = useState('');
  const [streamingText, setStreamingText] = useState('');
  const [answer, setAnswer] = useState<RagAnswer | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const answerEndRef = useRef<HTMLDivElement>(null);
  const t = useT();

  const handleSubmit = useCallback(async (q?: string) => {
    const query = q || question.trim();
    if (!query) return;

    setLoading(true);
    setError('');
    setStreamingText('');
    setAnswer(null);

    try {
      const result = await askHistoryStream(query, (chunk) => {
        setStreamingText(prev => prev + chunk);
        answerEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      });
      setAnswer(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : t('ragQa.request_failed'));
    } finally {
      setLoading(false);
    }
  }, [question]);

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <RevealOnScroll direction="fade">
          <SectionHeader
            label="AI HISTORY Q&A"
            title={t('ragQa.title')}
            description={t('ragQa.description')}
          />
        </RevealOnScroll>

        {/* 输入区 */}
        <RevealOnScroll direction="up" delay={200}>
          <div className="mt-8 p-6 bg-white/70 dark:bg-ink-900/70 rounded-xl border border-ink-200 dark:border-ink-700 shadow-sm">
            <div className="flex gap-3">
              <input
                type="text"
                value={question}
                onChange={e => setQuestion(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                placeholder={t('ragQa.input_placeholder')}
                className="flex-1 px-4 py-3 rounded-lg bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-600 text-ink-900 dark:text-ink-100 placeholder:text-ink-400 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                disabled={loading}
              />
              <button
                onClick={() => handleSubmit()}
                disabled={loading || !question.trim()}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-accent to-amber-600 text-white font-bold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? t('ragQa.searching') : t('ragQa.submit_btn')}
              </button>
            </div>

            {/* 推荐问题 */}
            <div className="mt-4 flex flex-wrap gap-2">
              {SUGGESTIONS.map(s => (
                <button
                  key={s}
                  onClick={() => { setQuestion(t(s)); handleSubmit(t(s)); }}
                  disabled={loading}
                  className="text-xs px-3 py-1.5 rounded-full bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-400 hover:bg-accent hover:text-white transition-all disabled:opacity-50"
                >
                  {t(s)}
                </button>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* 错误提示 */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400">
            {t('ragQa.error_prefix')} {error}
          </div>
        )}

        {/* AI 回答 */}
        {(streamingText || answer) && (
          <RevealOnScroll direction="fade">
            <div className="mt-6 space-y-6">
              {/* 回答主体 */}
              <div className="p-6 bg-gradient-to-br from-white/80 to-accent/5 dark:from-ink-900/80 dark:to-accent/10 rounded-xl border border-ink-200 dark:border-ink-700 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-accent/10 dark:bg-accent/20 flex items-center justify-center">
                    <span className="text-accent text-lg">{t('ragQa.answer_icon')}</span>
                  </div>
                  <div>
                    <div className="font-bold text-ink-900 dark:text-ink-100">{t('ragQa.answer_title')}</div>
                    <div className="text-xs text-ink-500 dark:text-ink-400">{t('ragQa.answer_subtitle')}</div>
                  </div>
                </div>

                <div className="text-ink-800 dark:text-ink-200 leading-loose whitespace-pre-line">
                  {streamingText || answer?.answer || ''}
                  {loading && !streamingText && (
                    <span className="inline-block w-2 h-5 bg-accent animate-pulse ml-1" />
                  )}
                </div>
                <div ref={answerEndRef} />
              </div>

              {/* 引用来源 */}
              {answer && answer.sources && (
                <div className="space-y-3">
                  {/* 匹配度 */}
                  <div className="flex items-center gap-2 text-sm text-ink-500 dark:text-ink-400">
                    <span>{t('ragQa.match_score')}</span>
                    <div className="flex-1 h-2 rounded-full bg-ink-200 dark:bg-ink-700 max-w-xs">
                      <div
                        className="h-full rounded-full bg-accent"
                        style={{ width: `${Math.min(answer.matchScore / 50 * 100, 100)}%` }}
                      />
                    </div>
                    <span className="text-accent font-bold">{answer.matchScore}</span>
                  </div>

                  {/* 相关事件 */}
                  {answer.sources.events.length > 0 && (
                    <div className="p-4 bg-white/50 dark:bg-ink-900/50 rounded-lg border border-ink-200 dark:border-ink-700">
                      <h4 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-2 tracking-widest">
                        {t('ragQa.source_events_title')}
                      </h4>
                      <div className="space-y-2">
                        {answer.sources.events.map(e => (
                          <Link
                            key={e.id}
                            to={`/events/${e.id}`}
                            className="block p-2 rounded hover:bg-accent/5 transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-accent font-bold text-sm">{e.title}</span>
                              <span className="text-xs text-ink-400">{e.yearDisplay} · {e.dynasty}</span>
                            </div>
                            <div className="text-xs text-ink-600 dark:text-ink-400 mt-1">
                              {e.description.slice(0, 80)}…
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 相关人物 */}
                  {answer.sources.persons.length > 0 && (
                    <div className="p-4 bg-white/50 dark:bg-ink-900/50 rounded-lg border border-ink-200 dark:border-ink-700">
                      <h4 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-2 tracking-widest">
                        {t('ragQa.source_persons_title')}
                      </h4>
                      <div className="space-y-2">
                        {answer.sources.persons.map(p => (
                          <Link
                            key={p.id}
                            to={`/persons/${p.id}`}
                            className="block p-2 rounded hover:bg-accent/5 transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-accent font-bold text-sm">{p.name}</span>
                              <span className="text-xs text-ink-400">{p.yearsDisplay} · {p.dynasty}</span>
                            </div>
                            <div className="text-xs text-ink-600 dark:text-ink-400 mt-1">
                              {p.bio.slice(0, 60)}…
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 相关朝代 */}
                  {answer.sources.dynasties.length > 0 && (
                    <div className="p-4 bg-white/50 dark:bg-ink-900/50 rounded-lg border border-ink-200 dark:border-ink-700">
                      <h4 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-2 tracking-widest">
                        {t('ragQa.source_dynasties_title')}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {answer.sources.dynasties.map(d => (
                          <Link
                            key={d.id}
                            to={`/dynasty/${d.id}`}
                            className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-bold hover:bg-accent/20 transition-colors"
                          >
                            {d.name}{t('ragQa.dynasty_suffix')}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </RevealOnScroll>
        )}

        {/* 底部 */}
        <RevealOnScroll direction="fade" delay={400}>
          <div className="mt-12 text-center">
            <Link to="/" className="btn-secondary">
              {t('common.back_home')}
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
