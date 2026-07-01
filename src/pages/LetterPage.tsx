/**
 * 时空邮筒页面 — 给历史人物写信
 */

import { useState, useRef, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import { FIGURES } from '@/data/scenarios/figures';
import type { HistoricalFigure } from '@/types/figure';
import {
  writeLetterToFigure,
  loadLetters,
  addLetter,
  deleteLetter,
  genLetterId,
  type Letter,
} from '@/features/letterWriter';
import { hasApiKey } from '@/utils/llmConfig';

export default function LetterPage() {
  const [selectedFigure, setSelectedFigure] = useState<HistoricalFigure | null>(null);
  const [letterContent, setLetterContent] = useState('');
  const [streamingReply, setStreamingReply] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [letters, setLetters] = useState<Letter[]>([]);
  const replyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLetters(loadLetters());
  }, []);

  const handleSend = useCallback(async () => {
    if (!selectedFigure || !letterContent.trim() || sending) return;
    setSending(true);
    setError('');
    setStreamingReply('');
    try {
      const reply = await writeLetterToFigure(
        selectedFigure,
        letterContent.trim(),
        (chunk) => {
          setStreamingReply((prev) => prev + chunk);
          replyRef.current?.scrollIntoView({ behavior: 'smooth' });
        },
      );
      const letter: Letter = {
        id: genLetterId(),
        figureId: selectedFigure.id,
        figureName: selectedFigure.name,
        figureEmoji: selectedFigure.emoji,
        userContent: letterContent.trim(),
        replyContent: reply,
        createdAt: Date.now(),
      };
      addLetter(letter);
      setLetters(loadLetters());
      setLetterContent('');
      setStreamingReply('');
    } catch (e) {
      setError(e instanceof Error ? e.message : '投递失败');
    } finally {
      setSending(false);
    }
  }, [selectedFigure, letterContent, sending]);

  const handleDelete = useCallback((id: string) => {
    deleteLetter(id);
    setLetters(loadLetters());
  }, []);

  const apiReady = hasApiKey();

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <RevealOnScroll direction="fade">
          <SectionHeader
            label="TIME MAILBOX"
            title="时空邮筒"
            description="给历史人物写信，AI 以其口吻回信"
          />
        </RevealOnScroll>

        {!apiReady && (
          <RevealOnScroll direction="up" delay={200}>
            <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 text-sm">
              ⚙️ 需先配置 LLM API Key — 点击页面右上角"⚙️ 配置"按钮
            </div>
          </RevealOnScroll>
        )}

        {/* 人物选择 */}
        <RevealOnScroll direction="up" delay={200}>
          <div className="mt-8 p-5 bg-white/70 dark:bg-ink-900/70 rounded-xl border border-ink-200 dark:border-ink-700">
            <h3 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-3 tracking-widest">
              收件人 选择历史人物
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {FIGURES.map((fig) => (
                <button
                  key={fig.id}
                  onClick={() => setSelectedFigure(fig)}
                  className={`p-3 rounded-lg flex flex-col items-center transition-all ${
                    selectedFigure?.id === fig.id
                      ? 'bg-accent text-white shadow-lg scale-105'
                      : 'bg-ink-50 dark:bg-ink-800 hover:bg-accent/10'
                  }`}
                >
                  <span className="text-2xl">{fig.emoji}</span>
                  <span className="text-xs mt-1 font-bold">{fig.name}</span>
                  <span className="text-[10px] opacity-70">{fig.dynasty}</span>
                </button>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* 写信区 */}
        {selectedFigure && apiReady && (
          <RevealOnScroll direction="up" delay={300}>
            <div className="mt-6 p-6 bg-gradient-to-br from-amber-50/50 to-accent/5 dark:from-amber-900/10 dark:to-accent/10 rounded-xl border border-amber-200/50 dark:border-amber-800/30">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{selectedFigure.emoji}</span>
                <div>
                  <div className="text-xs text-ink-500 dark:text-ink-400">致</div>
                  <div className="font-bold text-ink-900 dark:text-ink-100">
                    {selectedFigure.name} · {selectedFigure.dynasty} · {selectedFigure.role}
                  </div>
                </div>
              </div>

              <div className="mb-3 p-3 bg-white/50 dark:bg-ink-900/50 rounded-lg text-xs text-ink-600 dark:text-ink-400 italic">
                「{selectedFigure.bio}」
              </div>

              <textarea
                value={letterContent}
                onChange={(e) => setLetterContent(e.target.value)}
                placeholder={`给${selectedFigure.name}写点什么吧…\n可以问他的生平、探讨他的思想、或者只是聊聊你的困惑。`}
                rows={6}
                disabled={sending}
                className="w-full px-4 py-3 rounded-lg bg-white/70 dark:bg-ink-900/70 border border-ink-200 dark:border-ink-600 text-ink-900 dark:text-ink-100 placeholder:text-ink-400 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all resize-none disabled:opacity-50"
              />

              <div className="mt-3 flex justify-between items-center">
                <span className="text-xs text-ink-500 dark:text-ink-400">
                  {letterContent.length} 字
                </span>
                <button
                  onClick={handleSend}
                  disabled={sending || !letterContent.trim()}
                  className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-accent to-amber-600 text-white font-bold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {sending ? '投递中…' : '📮 投入邮筒'}
                </button>
              </div>
            </div>
          </RevealOnScroll>
        )}

        {/* 流式回信 */}
        {streamingReply && (
          <RevealOnScroll direction="fade">
            <div className="mt-6 p-6 bg-gradient-to-br from-accent/5 to-purple-500/5 dark:from-accent/10 dark:to-purple-700/10 rounded-xl border border-accent/30">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{selectedFigure?.emoji}</span>
                <span className="font-bold text-accent">{selectedFigure?.name} 回信</span>
                <span className="inline-block w-2 h-2 bg-accent animate-pulse rounded-full" />
              </div>
              <div ref={replyRef} className="text-ink-800 dark:text-ink-200 leading-loose whitespace-pre-line font-serif"
                style={{ fontFamily: 'var(--font-heading), serif' }}>
                {streamingReply}
              </div>
            </div>
          </RevealOnScroll>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400">
            {error}
          </div>
        )}

        {/* 历史信件 */}
        {letters.length > 0 && (
          <RevealOnScroll direction="up" delay={400}>
            <div className="mt-8 p-6 bg-white/70 dark:bg-ink-900/70 rounded-xl border border-ink-200 dark:border-ink-700">
              <h3 className="font-bold text-ink-900 dark:text-ink-100 mb-4">
                📜 往来信件 ({letters.length})
              </h3>
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {letters.map((letter) => (
                  <div
                    key={letter.id}
                    className="p-4 bg-ink-50/50 dark:bg-ink-800/50 rounded-lg border border-ink-200 dark:border-ink-700"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{letter.figureEmoji}</span>
                        <span className="font-bold text-ink-900 dark:text-ink-100">
                          {letter.figureName}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-ink-500 dark:text-ink-400">
                          {new Date(letter.createdAt).toLocaleString('zh-CN')}
                        </span>
                        <button
                          onClick={() => handleDelete(letter.id)}
                          className="text-xs text-red-500 hover:text-red-700"
                        >
                          删除
                        </button>
                      </div>
                    </div>
                    <div className="mb-3 p-3 bg-white/60 dark:bg-ink-900/60 rounded text-sm text-ink-700 dark:text-ink-300">
                      <div className="text-xs text-ink-500 dark:text-ink-400 mb-1">📝 来信</div>
                      {letter.userContent}
                    </div>
                    <div className="p-3 bg-accent/5 dark:bg-accent/10 rounded text-sm text-ink-800 dark:text-ink-200 font-serif"
                      style={{ fontFamily: 'var(--font-heading), serif' }}>
                      <div className="text-xs text-accent mb-1">📮 回信</div>
                      {letter.replyContent}
                    </div>
                  </div>
                ))}
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
