import { useState, useEffect } from 'react';
import { fetchDailyRecommend, type TodayEvent } from '@/services/api';
import { useDetailStore } from '@/store/detailStore';

/**
 * 每日推荐卡片
 * 展示一个随机推荐的历史事件，支持刷新
 */
export default function DailyRecommendCard() {
  const [event, setEvent] = useState<TodayEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const openDetail = useDetailStore((s) => s.openDetail);

  const load = () => {
    fetchDailyRecommend()
      .then((data) => {
        if (data.found && data.event) {
          setEvent(data.event);
        }
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  };

  useEffect(() => { load(); }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setLoading(true);
    load();
  };

  const handleOpenDetail = () => {
    if (event) {
      openDetail('event', event.id, {
        id: String(event.id),
        uid: event.uid,
        title: event.title,
        year: event.year,
        yearDisplay: event.yearDisplay,
        yearPrecision: 'exact',
        category: event.category,
        dynasty: event.dynastyName ?? '',
        description: event.description,
        fulltext: event.fulltext,
        tags: event.tags,
        relatedEvents: event.relatedEvents,
        relatedPersons: event.relatedPersons,
        source: '',
        crawlDate: '',
      });
    }
  };

  if (loading) {
    return (
      <div className="bg-white/60 dark:bg-ink-900/60 rounded-2xl shadow-lg border border-ink-200 dark:border-ink-700 p-6">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-ink-200 dark:bg-ink-700 rounded w-3/4" />
          <div className="h-3 bg-ink-100 dark:bg-ink-800 rounded w-1/2" />
          <div className="h-3 bg-ink-100 dark:bg-ink-800 rounded w-full" />
        </div>
      </div>
    );
  }

  if (!event) {
    return null;
  }

  return (
    <div className="bg-white/60 dark:bg-ink-900/60 rounded-2xl shadow-lg border border-ink-200 dark:border-ink-700 p-6 transition-all duration-300 hover:shadow-xl">
      {/* 头部 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-lg text-ink-400 dark:text-ink-500">◇</span>
          <h3 className="text-base font-bold text-ink-900 dark:text-ink-100">
            今日推荐
          </h3>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="text-xs text-ink-400 hover:text-accent dark:hover:text-accent transition-colors disabled:opacity-50"
          title="换一条"
        >
          {refreshing ? '刷新中...' : '换一条 ↻'}
        </button>
      </div>

      {/* 事件内容 */}
      <div className="cursor-pointer" onClick={handleOpenDetail}>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-mono text-accent dark:text-accent/80">
            {event.yearDisplay}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-ink-100 dark:bg-ink-800 text-ink-500 dark:text-ink-400">
            {event.category}
          </span>
          {event.dynastyName && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-darkGreen/10 text-darkGreen dark:text-darkGreen/80">
              {event.dynastyName}
            </span>
          )}
        </div>
        <h4 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-2 group-hover:text-accent transition-colors">
          {event.title}
        </h4>
        <p className="text-sm text-ink-600 dark:text-ink-400 line-clamp-3">
          {event.description}
        </p>
      </div>

      {/* 标签 */}
      {event.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-4">
          {event.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded bg-ink-50 dark:bg-ink-800/50 text-ink-400 dark:text-ink-500"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
