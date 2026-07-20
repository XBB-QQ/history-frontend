import { useState, useEffect, useMemo, useRef } from 'react';
import { fetchQuizLeaderboard } from '@/services/api';
import { useUserStore } from '@/store/userStore';
import { useT } from '@/i18n/i18n';

interface LeaderboardRow {
  id: number;
  username: string;
  nickname: string;
  score: number;
  quizzesAnswered: number;
  quizzesCorrect: number;
}

const PAGE_SIZE = 20;

function LeaderboardPage() {
  const t = useT();
  const user = useUserStore((s) => s.user);
  const [entries, setEntries] = useState<LeaderboardRow[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(0);
  const meRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchQuizLeaderboard(0, PAGE_SIZE)
      .then((res) => {
        setEntries(res.content as LeaderboardRow[]);
        setTotal(res.total);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const hasMore = entries.length < total;

  const handleLoadMore = async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const res = await fetchQuizLeaderboard(nextPage, PAGE_SIZE);
      setEntries((prev) => [...prev, ...(res.content as LeaderboardRow[])]);
      setTotal(res.total);
      setPage(nextPage);
    } catch {
      // 静默失败，保留已加载数据
    } finally {
      setLoadingMore(false);
    }
  };

  // 查找当前登录用户在列表中的排名
  const meRank = useMemo(() => {
    if (!user) return null;
    const idx = entries.findIndex((e) => e.username === user.username);
    return idx >= 0 ? idx + 1 : null;
  }, [entries, user]);

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-24 pb-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-4xl mb-4 block font-black text-accent">榜</span>
          <h1 className="text-3xl font-black text-ink-900 dark:text-ink-100">{t('leaderboard.title')}</h1>
          <p className="text-sm text-ink-500 mt-2">{t('leaderboard.subtitle')}</p>
        </div>

        {/* 我的排名条（登录用户专属） */}
        {user && (
          <div className="mb-4 p-3 rounded-xl bg-accent/5 border border-accent/30 flex items-center justify-between">
            {meRank ? (
              <>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-accent text-white font-bold">{t('leaderboard.me_badge')}</span>
                  <span className="text-sm font-bold text-ink-900 dark:text-ink-100">{user.nickname || user.username}</span>
                </div>
                <span className="text-sm font-bold text-accent">{t('leaderboard.me_rank', { rank: meRank })}</span>
              </>
            ) : (
              <div className="w-full text-center text-sm text-ink-500">
                <span className="text-xs px-2 py-0.5 rounded-full bg-accent text-white font-bold mr-2">{t('leaderboard.me_badge')}</span>
                {t('leaderboard.me_not_in_list')}
              </div>
            )}
          </div>
        )}

        {/* 总人数 */}
        {!loading && !error && total > 0 && (
          <div className="text-xs text-ink-400 text-center mb-3">
            {t('leaderboard.total_count', { total })}
          </div>
        )}

        {loading && (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 bg-ink-100 dark:bg-ink-800 rounded-xl animate-pulse" />
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-12 text-ink-400">
            <p>{t('leaderboard.load_failed')}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="space-y-2">
            {entries.length === 0 ? (
              <div className="text-center py-12 text-ink-400">
                <p>{t('leaderboard.no_data')}</p>
              </div>
            ) : (
              entries.map((entry, i) => {
                const rank = i + 1;
                const isMe = user?.username === entry.username;
                let rankBadge = (
                  <span className="text-sm text-ink-400 dark:text-ink-500 w-8 text-center font-bold">
                    {rank}
                  </span>
                );
                if (rank === 1) {
                  rankBadge = <span className="text-sm w-8 text-center font-bold text-amber-600">壹</span>;
                } else if (rank === 2) {
                  rankBadge = <span className="text-sm w-8 text-center font-bold text-ink-500">贰</span>;
                } else if (rank === 3) {
                  rankBadge = <span className="text-sm w-8 text-center font-bold text-amber-800 dark:text-amber-500">叁</span>;
                }

                return (
                  <div
                    key={entry.id}
                    ref={isMe ? meRowRef : null}
                    className={`flex items-center gap-4 px-4 py-3 rounded-xl border transition-all hover:shadow-md ${
                      isMe
                        ? 'bg-accent/10 border-accent shadow-md ring-2 ring-accent/30'
                        : 'bg-white/60 dark:bg-ink-900/60 border-ink-200 dark:border-ink-700'
                    }`}
                  >
                    {rankBadge}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-ink-900 dark:text-ink-100 truncate">
                          {entry.nickname || entry.username}
                        </span>
                        {isMe && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-accent text-white font-bold">
                            {t('leaderboard.me_badge')}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-ink-400">
                        {t('leaderboard.answered_correct', { answered: entry.quizzesAnswered, correct: entry.quizzesCorrect })}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-black text-accent tabular-nums">
                        {entry.score}
                      </div>
                      <div className="text-[10px] text-ink-400">{t('leaderboard.points')}</div>
                    </div>
                  </div>
                );
              })
            )}

            {/* 加载更多 / 全部加载完提示 */}
            {hasMore ? (
              <div className="text-center pt-4">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="px-6 py-2.5 rounded-xl border border-ink-200 dark:border-ink-700 text-ink-700 dark:text-ink-300 hover:border-accent hover:text-accent transition-all text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingMore ? '...' : t('leaderboard.load_more')}
                </button>
              </div>
            ) : (
              <div className="text-center pt-4 text-xs text-ink-400">
                {t('leaderboard.no_more', { total })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default LeaderboardPage;
