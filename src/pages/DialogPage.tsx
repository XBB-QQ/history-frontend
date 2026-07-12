/**
 * AI 历史人物对话页面
 * @see history-museum/design/000-future-roadmap.md §方向六 §6.1
 */

import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FIGURES } from '@/data/scenarios/figures';
import { generateFigureReply, generateGreeting } from '@/features/figureReply';
import type { HistoricalFigure, ChatMessage } from '@/types/figure';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import Markdown from '@/components/common/Markdown';
import { useT } from '@/i18n/i18n';

function DialogPage() {
  const [selectedFigure, setSelectedFigure] = useState<HistoricalFigure | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const t = useT();

  // 切换人物时重置对话
  function handleSelectFigure(figure: HistoricalFigure) {
    setSelectedFigure(figure);
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content: generateGreeting(figure),
        timestamp: Date.now(),
      },
    ]);
    setInput('');
  }

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // 发送消息
  function handleSend() {
    if (!input.trim() || !selectedFigure) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: Date.now(),
    };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setIsTyping(true);

    // 模拟思考延迟
    setTimeout(() => {
      const reply = generateFigureReply(selectedFigure, userMsg.content);
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: reply,
        timestamp: Date.now(),
      };
      setMessages((m) => [...m, assistantMsg]);
      setIsTyping(false);
    }, 600 + Math.random() * 800);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleBack() {
    setSelectedFigure(null);
    setMessages([]);
  }

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <RevealOnScroll direction="fade">
          <SectionHeader
            label="AI DIALOG"
            title={t('dialog.title')}
            description={t('dialog.description')}
          />
        </RevealOnScroll>

        {/* 人物选择 */}
        {!selectedFigure && (
          <RevealOnScroll direction="up" delay={200}>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
              {FIGURES.map((figure) => (
                <button
                  key={figure.id}
                  onClick={() => handleSelectFigure(figure)}
                  className="p-5 bg-white/70 dark:bg-ink-900/70 rounded-xl border-2 border-ink-200 dark:border-ink-700 hover:border-accent hover:shadow-lg transition-all text-center group"
                >
                  <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
                    {figure.emoji}
                  </div>
                  <div className="font-bold text-lg text-ink-900 dark:text-ink-100 group-hover:text-accent transition-colors">
                    {figure.name}
                  </div>
                  <div className="text-xs text-ink-500 dark:text-ink-400 mt-1">
                    {figure.dynasty} · {figure.role}
                  </div>
                  <div className="mt-3 text-xs text-accent italic line-clamp-1">
                    "{figure.quotes[0]}"
                  </div>
                </button>
              ))}
            </div>
          </RevealOnScroll>
        )}

        {/* 对话界面 */}
        {selectedFigure && (
          <div className="mt-8 flex flex-col h-[calc(100vh-280px)] min-h-[500px]">
            {/* 对话对象头部 */}
            <div className="p-4 bg-white/80 dark:bg-ink-900/80 rounded-t-xl border border-ink-200 dark:border-ink-700 flex items-center gap-3">
              <button
                onClick={handleBack}
                className="text-ink-500 hover:text-accent transition-colors"
                aria-label={t('dialog.back_aria')}
              >
                ←
              </button>
              <div className="text-3xl">{selectedFigure.emoji}</div>
              <div className="flex-1">
                <div className="font-bold text-ink-900 dark:text-ink-100">
                  {selectedFigure.name}
                </div>
                <div className="text-xs text-ink-500 dark:text-ink-400">
                  {selectedFigure.dynasty} · {selectedFigure.role}
                </div>
              </div>
              <div className="hidden md:flex gap-1 flex-wrap">
                {selectedFigure.topics.slice(0, 4).map((topic) => (
                  <button
                    key={topic}
                    onClick={() => setInput(t('dialog.topic_btn_template', { topic }))}
                    className="text-xs px-2 py-1 bg-accent/10 dark:bg-accent/20 text-accent rounded-full hover:bg-accent/20 transition-colors"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            {/* 消息列表 */}
            <div className="flex-1 overflow-y-auto bg-white/40 dark:bg-ink-900/40 border-x border-ink-200 dark:border-ink-700 p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      msg.role === 'user'
                        ? 'bg-accent text-white rounded-br-sm'
                        : 'bg-ink-100 dark:bg-ink-800 text-ink-900 dark:text-ink-100 rounded-bl-sm'
                    }`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="text-xs text-accent mb-1 font-bold">
                        {selectedFigure.name}
                      </div>
                    )}
                    <Markdown className="text-sm leading-relaxed">
                      {msg.content}
                    </Markdown>
                  </div>
                </div>
              ))}

              {/* 正在输入提示 */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-ink-100 dark:bg-ink-800 rounded-2xl rounded-bl-sm p-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-ink-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-ink-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-ink-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* 输入区 */}
            <div className="p-3 bg-white/80 dark:bg-ink-900/80 rounded-b-xl border border-t-0 border-ink-200 dark:border-ink-700 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t('dialog.input_placeholder', { name: selectedFigure.name })}
                className="flex-1 px-4 py-2 bg-paper dark:bg-ink-950 border border-ink-200 dark:border-ink-700 rounded-lg text-ink-900 dark:text-ink-100 placeholder-ink-400 focus:outline-none focus:border-accent"
                disabled={isTyping}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="px-6 py-2 bg-accent text-white font-bold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {t('dialog.send_btn')}
              </button>
            </div>
          </div>
        )}

        {/* 底部 */}
        <RevealOnScroll direction="fade" delay={400}>
          <div className="mt-12 text-center">
            <Link to="/" className="btn-secondary">
              {t('common.back_home')}
            </Link>
          </div>
        </RevealOnScroll>

        {/* 提示 */}
        {!selectedFigure && (
          <div className="mt-8 p-4 bg-amber-50/50 dark:bg-amber-900/10 rounded-lg border border-amber-200/50 dark:border-amber-700/30 text-sm text-ink-600 dark:text-ink-400 text-center">
            {t('dialog.rule_hint')}
          </div>
        )}
      </div>
    </div>
  );
}

export default DialogPage;
