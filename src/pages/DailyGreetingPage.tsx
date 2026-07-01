/**
 * 历史人物每日问候页面
 */

import { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import { FIGURES } from '@/data/scenarios/figures';
import {
  getFollowedFigures,
  toggleFollow,
  isFollowed,
  generateTodayGreetings,
  getTodayGreetings,
  getGreetingHistory,
  needTodayGreeting,
  type GreetingMessage,
} from '@/features/dailyGreeting';
import { hasApiKey } from '@/utils/llmConfig';

export default function DailyGreetingPage() {
  const [followedIds, setFollowedIds] = useState<string[]>([]);
  const [todayGreetings, setTodayGreetings] = useState<GreetingMessage[]>([]);
  const [historyGreetings, setHistoryGreetings] = useState<GreetingMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showRefresh, setShowRefresh] = useState(false);

  useEffect(() => {
    const followed = getFollowedFigures();
    setFollowedIds(followed);
    setTodayGreetings(getTodayGreetings());
    setHistoryGreetings(getGreetingHistory().filter(g => g.date !== getTodayString()));
    if (needTodayGreeting() && followed.length > 0) {
      setShowRefresh(true);
    }
  }, []);

  const handleRefresh = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    setError('');
    try {
      const greetings = await generateTodayGreetings();
      setTodayGreetings(greetings);
      setHistoryGreetings(getGreetingHistory().filter(g => g.date !== getTodayString()));
      setShowRefresh(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : '生成失败');
    } finally {
      setLoading(false);
    }
  }, [loading]);

  const handleToggleFollow = useCallback((figureId: string) => {
    const isNowFollowed = toggleFollow(figureId);
    setFollowedIds(isNowFollowed ? [...followedIds, figureId] : followedIds.filter(id => id !== figureId));
  }, [followedIds]);

  const getTodayString = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  const apiReady = hasApiKey();

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <div className="max-w-3xl mx-auto">
        <RevealOnScroll direction="fade">
          <SectionHeader
            label="DAILY GREETING"
            title="历史人物每日问候"
            description="关注你喜欢的历史人物，每天收到他们的问候"
          />
        </RevealOnScroll>

        {!apiReady && (
          <RevealOnScroll direction="up" delay={200}>
            <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 text-sm">
              ⚙️ 需先配置 LLM API Key — 点击页面右上角"⚙️ 配置"按钮
            </div>
          </RevealOnScroll>
        )}

        {/* 人物关注列表 */}
        <RevealOnScroll direction="up" delay={200}>
          <div className="mt-8 p-5 bg-white/70 dark:bg-ink-900/70 rounded-xl border border-ink-200 dark:border-ink-700">
            <h3 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-3 tracking-widest">
              👥 关注人物（已关注 {followedIds.length} 人）
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {FIGURES.map((fig) => {
                const followed = followedIds.includes(fig.id);
                return (
                  <button
                    key={fig.id}
                    onClick={() => handleToggleFollow(fig.id)}
                    className={`p-3 rounded-lg flex flex-col items-center transition-all border ${
                      followed
                        ? 'bg-accent/10 border-accent shadow-md'
                        : 'bg-ink-50/50 dark:bg-ink-800/50 border-ink-200 dark:border-ink-700 hover:border-accent/50'
                    }`}
                  >
                    <span className="text-2xl">{fig.emoji}</span>
                    <span className="text-xs mt-1 font-bold">{fig.name}</span>
                    <span className="text-[10px] opacity-70">{fig.dynasty}</span>
                    {followed && <span className="text-[10px] mt-1 text-accent">✨ 已关注</span>}
                  </button>
                );
              })}
            </div>
            <p className="mt-3 text-xs text-ink-500 dark:text-ink-400 text-center">
              💡 关注的人物每天会给你发问候消息
            </p>
          </div>
        </RevealOnScroll>

        {/* 今日问候 */}
        {(todayGreetings.length > 0 || showRefresh) && (
          <RevealOnScroll direction="up" delay={300}>
            <div className="mt-6 p-6 bg-gradient-to-br from-accent/5 to-amber-500/5 dark:from-accent/10 dark:to-amber-700/10 rounded-xl border border-accent/30">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100">
                    📬 今日问候
                  </h3>
                  <p className="text-xs text-ink-500 dark:text-ink-400">
                    {new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}
                  </p>
                </div>
                {showRefresh && (
                  <button
                    onClick={handleRefresh}
                    disabled={loading}
                    className="px-4 py-2 rounded-lg bg-accent text-white text-sm font-bold hover:shadow-lg disabled:opacity-50 transition-all"
                  >
                    {loading ? '发送中…' : '📨 接收问候'}
                  </button>
                )}
              </div>

              {error && (
                <div className="mb-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 text-sm text-red-700 dark:text-red-400">
                  {error}
                </div>
              )}

              {todayGreetings.length > 0 && (
                <div className="space-y-4">
                  {todayGreetings.map((g) => (
                    <div
                      key={g.id}
                      className="p-4 bg-white/70 dark:bg-ink-900/70 rounded-lg border border-ink-200 dark:border-ink-700"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/20 to-amber-500/20 flex items-center justify-center text-xl">
                          {g.figureEmoji}
                        </div>
                        <div>
                          <div className="font-bold text-ink-900 dark:text-ink-100">
                            {g.figureName}
                          </div>
                          <div className="text-xs text-ink-500 dark:text-ink-400">
                            {g.time}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-ink-800 dark:text-ink-200 leading-relaxed">
                        {g.content}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {loading && (
                <div className="text-center py-4">
                  <div className="inline-block w-8 h-8 border-3 border-accent border-t-transparent rounded-full animate-spin mb-2" />
                  <div className="text-sm text-ink-500 dark:text-ink-400">人物正在写问候…</div>
                </div>
              )}
            </div>
          </RevealOnScroll>
        )}

        {/* 历史问候记录 */}
        {historyGreetings.length > 0 && (
          <RevealOnScroll direction="up" delay={400}>
            <div className="mt-6 p-6 bg-white/70 dark:bg-ink-900/70 rounded-xl border border-ink-200 dark:border-ink-700">
              <h3 className="font-bold text-ink-900 dark:text-ink-100 mb-4">
                📜 历史问候 ({historyGreetings.length})
              </h3>
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {historyGreetings.map((g) => (
                  <div
                    key={g.id}
                    className="p-3 bg-ink-50/50 dark:bg-ink-800/50 rounded-lg"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{g.figureEmoji}</span>
                      <span className="font-bold text-accent">{g.figureName}</span>
                      <span className="text-xs text-ink-500 dark:text-ink-400">
                        {g.date} · {g.time}
                      </span>
                    </div>
                    <p className="text-sm text-ink-700 dark:text-ink-300">{g.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        )}

        {/* 空状态 */}
        {todayGreetings.length === 0 && !showRefresh && historyGreetings.length === 0 && (
          <RevealOnScroll direction="fade">
            <div className="mt-8 p-8 bg-white/50 dark:bg-ink-900/50 rounded-xl border border-ink-200 dark:border-ink-700 text-center">
              <div className="text-5xl mb-3">📭</div>
              <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-2">
                暂无问候消息
              </h3>
              <p className="text-sm text-ink-600 dark:text-ink-400">
                先关注几位历史人物，明天就能收到他们的问候啦！
              </p>
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
