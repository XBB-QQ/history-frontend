/**
 * RAG 自然语言历史问答页面
 * @see history-museum/design/002-innovation-brainstorm.md §2
 *
 * 双模式：优先后端 RAG（向量检索 + LLM），失败降级前端关键词检索
 */

import { useState, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import { askHistoryStream, type RagAnswer } from '@/features/ragSearch';
import {
  askHistoryStreamBackend,
  type BackendRagSource,
} from '@/services/ragApi';
import { useDetailStore } from '@/store/detailStore';
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

/** 统一的回答视图 — 后端/前端两种模式归一化 */
interface UnifiedAnswer {
  answer: string;
  mode: 'backend' | 'frontend';
  matchScore: number;
  /** 后端模式：扁平 sources */
  backendSources?: BackendRagSource[];
  /** 前端模式：分类 sources */
  frontendSources?: RagAnswer['sources'];
}

/** 环境变量控制 RAG 模式：auto(默认) | backend | frontend */
const RAG_MODE = (import.meta.env.VITE_RAG_MODE as string | undefined) || 'auto';

export default function RagQaPage() {
  const [question, setQuestion] = useState('');
  const [streamingText, setStreamingText] = useState('');
  const [result, setResult] = useState<UnifiedAnswer | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const answerEndRef = useRef<HTMLDivElement>(null);
  const t = useT();
  const navigate = useNavigate();
  const openDetail = useDetailStore(s => s.openDetail);

  const handleSubmit = useCallback(async (q?: string) => {
    const query = q || question.trim();
    if (!query) return;

    setLoading(true);
    setError('');
    setStreamingText('');
    setResult(null);

    // auto/backend 模式：优先尝试后端 RAG
    if (RAG_MODE !== 'frontend') {
      try {
        const backendResult = await askHistoryStreamBackend(query, (chunk) => {
          setStreamingText(prev => prev + chunk);
          answerEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        });
        setResult({
          answer: backendResult.answer,
          mode: 'backend',
          matchScore: backendResult.matchScore,
          backendSources: backendResult.sources,
        });
        setStreamingText('');
        setLoading(false);
        return;
      } catch (e) {
        // 后端失败，若强制 backend 模式则报错，否则降级前端
        if (RAG_MODE === 'backend') {
          setError(e instanceof Error ? e.message : t('ragQa.request_failed'));
          setLoading(false);
          return;
        }
        console.warn('[RAG] 后端不可用，降级前端关键词检索:', e);
      }
    }

    // 前端降级
    try {
      const frontendResult = await askHistoryStream(query, (chunk) => {
        setStreamingText(prev => prev + chunk);
        answerEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      });
      setResult({
        answer: frontendResult.answer,
        mode: 'frontend',
        matchScore: frontendResult.matchScore,
        frontendSources: frontendResult.sources,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : t('ragQa.request_failed'));
    } finally {
      setLoading(false);
    }
  }, [question, t]);

  // 从后端扁平 sources 提取分类
  const backendEvents = result?.backendSources?.filter(s => s.type === 'event') ?? [];
  const backendPersons = result?.backendSources?.filter(s => s.type === 'person') ?? [];
  const backendDynasties = result?.backendSources?.filter(s => s.type === 'dynasty') ?? [];

  // 统一取值
  const events = result?.mode === 'backend' ? backendEvents : (result?.frontendSources?.events ?? []);
  const persons = result?.mode === 'backend' ? backendPersons : (result?.frontendSources?.persons ?? []);
  const dynasties = result?.mode === 'backend' ? backendDynasties : (result?.frontendSources?.dynasties ?? []);

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
        {(streamingText || result) && (
          <RevealOnScroll direction="fade">
            <div className="mt-6 space-y-6">
              {/* 回答主体 */}
              <div className="p-6 bg-gradient-to-br from-white/80 to-accent/5 dark:from-ink-900/80 dark:to-accent/10 rounded-xl border border-ink-200 dark:border-ink-700 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-accent/10 dark:bg-accent/20 flex items-center justify-center">
                    <span className="text-accent text-lg">{t('ragQa.answer_icon')}</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-ink-900 dark:text-ink-100">{t('ragQa.answer_title')}</div>
                    <div className="text-xs text-ink-500 dark:text-ink-400">
                      {t('ragQa.answer_subtitle')}
                      {result?.mode === 'backend' && (
                        <span className="ml-2 text-accent">· {t('ragQa.mode_backend')}</span>
                      )}
                      {result?.mode === 'frontend' && (
                        <span className="ml-2 text-ink-400">· {t('ragQa.mode_frontend')}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-ink-800 dark:text-ink-200 leading-loose whitespace-pre-line">
                  {streamingText || result?.answer || ''}
                  {loading && !streamingText && (
                    <span className="inline-block w-2 h-5 bg-accent animate-pulse ml-1" />
                  )}
                </div>
                <div ref={answerEndRef} />
              </div>

              {/* 引用来源 */}
              {result && result.matchScore > 0 && (
                <div className="space-y-3">
                  {/* 匹配度 */}
                  <div className="flex items-center gap-2 text-sm text-ink-500 dark:text-ink-400">
                    <span>{t('ragQa.match_score')}</span>
                    <div className="flex-1 h-2 rounded-full bg-ink-200 dark:bg-ink-700 max-w-xs">
                      <div
                        className="h-full rounded-full bg-accent"
                        style={{ width: `${Math.min(result.matchScore / 50 * 100, 100)}%` }}
                      />
                    </div>
                    <span className="text-accent font-bold">{Math.round(result.matchScore)}</span>
                  </div>

                  {/* 相关事件 */}
                  {events.length > 0 && (
                    <div className="p-4 bg-white/50 dark:bg-ink-900/50 rounded-lg border border-ink-200 dark:border-ink-700">
                      <h4 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-2 tracking-widest">
                        {t('ragQa.source_events_title')}
                      </h4>
                      <div className="space-y-2">
                        {events.map(e => {
                          // 后端模式 e 是 BackendRagSource，前端模式 e 是 EventItem
                          const id = result.mode === 'backend' ? (e as BackendRagSource).source : (e as { id: string }).id;
                          const title = result.mode === 'backend' ? (e as BackendRagSource).title : (e as { title: string }).title;
                          const yearDisplay = result.mode === 'backend'
                            ? ((e as BackendRagSource).year ? String((e as BackendRagSource).year) : '')
                            : (e as { yearDisplay?: string }).yearDisplay;
                          const dynasty = result.mode === 'backend' ? (e as BackendRagSource).dynasty || '' : (e as { dynasty?: string }).dynasty || '';
                          const desc = result.mode === 'backend'
                            ? (e as BackendRagSource).content
                            : (e as { description?: string }).description || '';
                          return (
                            <button
                              key={id}
                              onClick={() => {
                                if (result.mode === 'frontend') {
                                  openDetail('event', Number(id) || 0, e as Parameters<typeof openDetail>[2]);
                                } else {
                                  navigate('/timeline');
                                }
                              }}
                              className="block w-full text-left p-2 rounded hover:bg-accent/5 transition-colors"
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-accent font-bold text-sm">{title}</span>
                                <span className="text-xs text-ink-400">{yearDisplay} · {dynasty}</span>
                              </div>
                              <div className="text-xs text-ink-600 dark:text-ink-400 mt-1">
                                {desc.slice(0, 80)}…
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* 相关人物 */}
                  {persons.length > 0 && (
                    <div className="p-4 bg-white/50 dark:bg-ink-900/50 rounded-lg border border-ink-200 dark:border-ink-700">
                      <h4 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-2 tracking-widest">
                        {t('ragQa.source_persons_title')}
                      </h4>
                      <div className="space-y-2">
                        {persons.map(p => {
                          const id = result.mode === 'backend' ? (p as BackendRagSource).source : (p as { id: string }).id;
                          const name = result.mode === 'backend' ? (p as BackendRagSource).title : (p as { name: string }).name;
                          const yearsDisplay = result.mode === 'backend' ? '' : (p as { yearsDisplay?: string }).yearsDisplay || '';
                          const dynasty = result.mode === 'backend' ? (p as BackendRagSource).dynasty || '' : (p as { dynasty?: string }).dynasty || '';
                          const bio = result.mode === 'backend' ? (p as BackendRagSource).content : (p as { bio?: string }).bio || '';
                          return (
                            <button
                              key={id}
                              onClick={() => {
                                if (result.mode === 'frontend') {
                                  openDetail('person', Number(id) || 0, p as Parameters<typeof openDetail>[2]);
                                } else {
                                  navigate('/persons');
                                }
                              }}
                              className="block w-full text-left p-2 rounded hover:bg-accent/5 transition-colors"
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-accent font-bold text-sm">{name}</span>
                                <span className="text-xs text-ink-400">{yearsDisplay} · {dynasty}</span>
                              </div>
                              <div className="text-xs text-ink-600 dark:text-ink-400 mt-1">
                                {bio.slice(0, 60)}…
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* 相关朝代 */}
                  {dynasties.length > 0 && (
                    <div className="p-4 bg-white/50 dark:bg-ink-900/50 rounded-lg border border-ink-200 dark:border-ink-700">
                      <h4 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-2 tracking-widest">
                        {t('ragQa.source_dynasties_title')}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {dynasties.map(d => {
                          const id = result.mode === 'backend' ? (d as BackendRagSource).source : (d as { id: string }).id;
                          const name = result.mode === 'backend' ? (d as BackendRagSource).title : (d as { name: string }).name;
                          return (
                            <button
                              key={id}
                              onClick={() => {
                                if (result.mode === 'frontend') {
                                  openDetail('dynasty', Number(id) || 0, d as Parameters<typeof openDetail>[2]);
                                } else {
                                  navigate('/dynasties');
                                }
                              }}
                              className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-bold hover:bg-accent/20 transition-colors"
                            >
                              {name}{t('ragQa.dynasty_suffix')}
                            </button>
                          );
                        })}
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
