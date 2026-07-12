/**
 * AI 史官 — 个性化叙事生成页面
 * @see history-museum/design/002-innovation-brainstorm.md §3
 */

import { useState, useRef, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import Markdown from '@/components/common/Markdown';
import {
  generateHistorianComment,
  buildUserPortraitFromStorage,
  chatWithHistorian,
  type HistorianComment,
  type UserPortrait,
  type ChatMessage,
} from '@/features/aiHistorian';
import { usePersonaStore } from '@/store/personaStore';
import { buildPersonaPrompt } from '@/utils/personaBuilder';
import { useT } from '@/i18n/i18n';

const STYLE_LABELS = [
  { key: 'formal', labelKey: 'aiHistorian.style_formal_label', emoji: '史', descKey: 'aiHistorian.style_formal_desc' },
  { key: 'anecdotal', labelKey: 'aiHistorian.style_anecdotal_label', emoji: '传', descKey: 'aiHistorian.style_anecdotal_desc' },
    { key: 'eulogy', labelKey: 'aiHistorian.style_eulogy_label', emoji: '评', descKey: 'aiHistorian.style_eulogy_desc' },
] as const;

export default function AiHistorianPage() {
  const t = useT();
  const [portrait, setPortrait] = useState<UserPortrait | null>(null);
  const [comment, setComment] = useState<HistorianComment | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeStyle, setActiveStyle] = useState<'formal' | 'anecdotal' | 'eulogy'>('formal');
  const [error, setError] = useState('');

  // 多轮对话状态
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState('');
  const [streamingReply, setStreamingReply] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

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
      // 注入 persona 上下文
      const persona = usePersonaStore.getState().persona;
      const personaCtx = persona ? buildPersonaPrompt(persona) : undefined;
      const result = await generateHistorianComment(portrait, personaCtx);
      setComment(result);
      // 重置对话历史
      setChatHistory([]);
    } catch (e) {
      setError(e instanceof Error ? e.message : t('aiHistorian.generate_failed'));
    } finally {
      setLoading(false);
    }
  }

  // 自动初始化画像
  useEffect(() => {
    if (!portrait) {
      handleBuildPortrait();
    }
  }, []);

  const handleChat = useCallback(async (question?: string) => {
    const q = (question ?? chatInput).trim();
    if (!q || !portrait || chatLoading) return;

    setChatInput('');
    setChatError('');
    setChatLoading(true);
    setStreamingReply('');

    const userMsg: ChatMessage = { role: 'user', content: q };
    const nextHistory = [...chatHistory, userMsg];
    setChatHistory(nextHistory);

    try {
      const reply = await chatWithHistorian(
        nextHistory,
        portrait,
        comment,
        (chunk) => {
          setStreamingReply((prev) => prev + chunk);
          chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        },
      );
      setChatHistory([...nextHistory, { role: 'assistant', content: reply }]);
      setStreamingReply('');
    } catch (e) {
      setChatError(e instanceof Error ? e.message : t('aiHistorian.chat_failed'));
    } finally {
      setChatLoading(false);
    }
  }, [chatInput, chatHistory, portrait, comment, chatLoading]);


  // 基于画像的追问建议
  const suggestedQuestions = portrait ? [
    t('aiHistorian.q_mirror_figure', { name: portrait.matchedFigure || t('aiHistorian.default_figure') }),
    t('aiHistorian.q_dynasty_details', { dynasty: portrait.topDynasties[0] || t('aiHistorian.default_dynasty') }),
    t('aiHistorian.q_learn_one_thing', { name: portrait.topPersons[0] || t('aiHistorian.default_person') }),
    t('aiHistorian.q_historian_judgment'),
  ] : [];

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <RevealOnScroll direction="fade">
          <SectionHeader
            label="AI HISTORIAN"
            title={t('aiHistorian.title')}
            description={t('aiHistorian.description')}
          />
        </RevealOnScroll>

        {/* 画像概览 */}
        {portrait && (
          <RevealOnScroll direction="up" delay={200}>
            <div className="mt-8 p-5 bg-white/70 dark:bg-ink-900/70 rounded-xl border border-ink-200 dark:border-ink-700">
              <h3 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-3 tracking-widest">
                {t('aiHistorian.portrait_title')}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                <div>
                  <div className="text-ink-500 dark:text-ink-400">{t('aiHistorian.top_dynasties')}</div>
                  <div className="font-bold text-ink-900 dark:text-ink-100">{portrait.topDynasties.join('、')}</div>
                </div>
                <div>
                  <div className="text-ink-500 dark:text-ink-400">{t('aiHistorian.top_persons')}</div>
                  <div className="font-bold text-ink-900 dark:text-ink-100">{portrait.topPersons.join('、')}</div>
                </div>
                {portrait.quizAccuracy && (
                  <div>
                    <div className="text-ink-500 dark:text-ink-400">{t('aiHistorian.quiz_accuracy')}</div>
                    <div className="font-bold text-accent">{portrait.quizAccuracy}%</div>
                  </div>
                )}
                {portrait.matchedFigure && (
                  <div>
                    <div className="text-ink-500 dark:text-ink-400">{t('aiHistorian.matched_figure')}</div>
                    <div className="font-bold text-accent">{portrait.matchedFigure}</div>
                  </div>
                )}
              </div>
              {portrait.dimensions && (
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {[
                    { key: 'governance', labelKey: 'aiHistorian.dim_governance', color: 'text-amber-600' },
                    { key: 'military', labelKey: 'aiHistorian.dim_military', color: 'text-red-600' },
                    { key: 'wisdom', labelKey: 'aiHistorian.dim_wisdom', color: 'text-indigo-600' },
                    { key: 'charisma', labelKey: 'aiHistorian.dim_charisma', color: 'text-green-600' },
                  ].map(d => (
                    <div key={d.key} className="text-center">
                      <div className="text-xs text-ink-400">{t(d.labelKey)}</div>
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
              {loading ? t('aiHistorian.generating') : t('aiHistorian.generate_btn')}
            </button>
          </div>
        </RevealOnScroll>

        {/* 错误 */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400">
            {t('aiHistorian.error_prefix')} {error}
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
                    {s.emoji} {t(s.labelKey)}
                  </button>
                ))}
              </div>

              {/* 评语内容 */}
              <div className="p-6 bg-gradient-to-br from-white/80 to-amber-50/30 dark:from-ink-900/80 dark:to-amber-900/10 rounded-xl border border-ink-200 dark:border-ink-700 shadow-sm">
                <div className="text-center mb-4">
                  <div className="text-3xl">{STYLE_LABELS.find(s => s.key === activeStyle)?.emoji}</div>
                  <div className="text-sm font-bold text-ink-500 dark:text-ink-400 mt-1">
                    {t(STYLE_LABELS.find(s => s.key === activeStyle)?.descKey || '')}
                  </div>
                </div>

                <Markdown className="text-ink-900 dark:text-ink-100 leading-loose text-lg font-serif"
                  style={{ fontFamily: 'var(--font-heading), serif' }}
                >
                  {comment[activeStyle] || comment.formal}
                </Markdown>
              </div>

              {/* 学习建议 */}
              {comment.suggestion && (
                <div className="p-4 bg-accent/5 dark:bg-accent/10 rounded-lg border-l-4 border-accent text-center">
                  <div className="text-xs text-accent tracking-widest mb-1">{t('aiHistorian.suggestion_title')}</div>
                  <div className="text-ink-900 dark:text-ink-100 font-bold">{comment.suggestion}</div>
                </div>
              )}

              {/* 全三种风格预览 */}
              <div className="p-4 bg-ink-50/50 dark:bg-ink-900/30 rounded-lg border border-ink-200 dark:border-ink-700">
                <h4 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-3 tracking-widest">
                  {t('aiHistorian.compare_title')}
                </h4>
                <div className="space-y-3">
                  {STYLE_LABELS.map(s => (
                    <div key={s.key} className="text-sm">
                      <span className="font-bold text-accent">{s.emoji} {t(s.labelKey)}：</span>
                      <span className="text-ink-600 dark:text-ink-400">{comment[s.key]?.slice(0, 80) || '—'}…</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </RevealOnScroll>
        )}

        {/* 追问史官 — 多轮对话 */}
        {comment && (
          <RevealOnScroll direction="up" delay={500}>
            <div className="mt-8 p-6 bg-white/70 dark:bg-ink-900/70 rounded-xl border border-ink-200 dark:border-ink-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-amber-600 flex items-center justify-center text-white font-bold">
                  史
                </div>
                <div>
                  <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100">
                    {t('aiHistorian.chat_title')}
                  </h3>
                  <p className="text-xs text-ink-500 dark:text-ink-400">
                    {t('aiHistorian.chat_subtitle')}
                  </p>
                </div>
              </div>

              {/* 对话记录 */}
              {chatHistory.length > 0 && (
                <div className="mb-4 space-y-3 max-h-96 overflow-y-auto">
                  {chatHistory.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm leading-relaxed ${
                          msg.role === 'user'
                            ? 'bg-accent text-white rounded-br-sm'
                            : 'bg-ink-100 dark:bg-ink-800 text-ink-900 dark:text-ink-100 rounded-bl-sm'
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {/* 流式回复 */}
                  {streamingReply && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] px-4 py-2 rounded-2xl rounded-bl-sm bg-ink-100 dark:bg-ink-800 text-ink-900 dark:text-ink-100 text-sm leading-relaxed">
                        {streamingReply}
                        <span className="inline-block w-2 h-4 bg-accent animate-pulse ml-1" />
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>
              )}

              {/* 等待指示 */}
              {chatHistory.length === 0 && !chatLoading && (
                <div className="mb-4 p-4 bg-amber-50/50 dark:bg-amber-900/10 rounded-lg border border-amber-200/50 dark:border-amber-800/30 text-sm text-ink-600 dark:text-ink-400">
                  {t('aiHistorian.chat_hint')}
                </div>
              )}

              {/* 推荐追问 */}
              {chatHistory.length === 0 && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {suggestedQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleChat(q)}
                      disabled={chatLoading}
                      className="text-xs px-3 py-1.5 rounded-full bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-400 hover:bg-accent hover:text-white transition-all disabled:opacity-50"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {/* 错误 */}
              {chatError && (
                <div className="mb-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 text-sm text-red-700 dark:text-red-400">
                  {chatError}
                </div>
              )}

              {/* 输入框 */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleChat()}
                  placeholder={t('aiHistorian.chat_input_placeholder')}
                  disabled={chatLoading}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-600 text-ink-900 dark:text-ink-100 placeholder:text-ink-400 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all disabled:opacity-50"
                />
                <button
                  onClick={() => handleChat()}
                  disabled={chatLoading || !chatInput.trim()}
                  className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-accent to-amber-600 text-white font-bold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {chatLoading ? '…' : t('aiHistorian.chat_send')}
                </button>
              </div>
            </div>
          </RevealOnScroll>
        )}

        {/* 底部 */}
        <RevealOnScroll direction="fade" delay={400}>
          <div className="mt-12 text-center">
            <Link to="/" className="btn-secondary">{t('common.back_home')}</Link>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
