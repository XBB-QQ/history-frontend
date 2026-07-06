import { useState, useEffect } from 'react';
import { fetchQuizLeaderboard } from '@/services/api';
import { useT } from '@/i18n/i18n';

interface LeaderboardRow {
  id: number;
  username: string;
  nickname: string;
  score: number;
  quizzesAnswered: number;
  quizzesCorrect: number;
}

function LeaderboardPage() {
  const t = useT();
  const [entries, setEntries] = useState<LeaderboardRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchQuizLeaderboard(0, 20)
      .then((res) => {
        setEntries(res.content as LeaderboardRow[]);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-24 pb-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-4xl mb-4 block">榜</span>
          <h1 className="text-3xl font-black text-ink-900 dark:text-ink-100">{t('leaderboard.title')}</h1>
          <p className="text-sm text-ink-500 mt-2">{t('leaderboard.subtitle')}</p>
        </div>

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
                let rankBadge = (
                  <span className="text-sm text-ink-400 dark:text-ink-500 w-8 text-center font-bold">
                    {rank}
                  </span>
                );
                if (rank === 1) {
                  rankBadge = <span className="text-xl w-8 text-center">🥇</span>;
                } else if (rank === 2) {
                  rankBadge = <span className="text-xl w-8 text-center">🥈</span>;
                } else if (rank === 3) {
                  rankBadge = <span className="text-xl w-8 text-center">🥉</span>;
                }

                return (
                  <div
                    key={entry.id}
                    className="flex items-center gap-4 px-4 py-3 bg-white/60 dark:bg-ink-900/60 rounded-xl border border-ink-200 dark:border-ink-700 transition-all hover:shadow-md"
                  >
                    {rankBadge}
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-ink-900 dark:text-ink-100 truncate">
                        {entry.nickname || entry.username}
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
          </div>
        )}
      </div>
    </div>
  );
}

export default LeaderboardPage;
