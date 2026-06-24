import { useState, useEffect } from 'react';
import { fetchTodayEvents, type TodayEvent } from '@/services/api';

/**
 * 历史上的今天 Banner
 * 展示今天日期发生的历史事件摘要
 */
export default function TodayBanner() {
  const [events, setEvents] = useState<TodayEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchTodayEvents()
      .then((data) => setEvents(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading || error || events.length === 0) {
    return null;
  }

  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  return (
    <div className="max-w-5xl mx-auto px-4 -mt-4 mb-8 relative z-10">
      <div className="bg-gradient-to-br from-ink-50 to-accent/5 dark:from-ink-900/80 dark:to-accent/10 rounded-2xl shadow-lg border border-ink-200 dark:border-ink-700 overflow-hidden">
        {/* 头部 */}
        <div className="bg-gradient-to-r from-accent/10 to-transparent dark:from-accent/20 px-6 py-4 flex items-center gap-3">
          <span className="text-2xl">📅</span>
          <div>
            <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100">
              历史上的今天
            </h3>
            <p className="text-xs text-ink-500 dark:text-ink-400">
              {month}月{day}日
            </p>
          </div>
        </div>

        {/* 事件列表 */}
        <div className="px-6 pb-6 divide-y divide-ink-100 dark:divide-ink-800">
          {events.slice(0, 5).map((event) => (
            <div key={event.id} className="py-3 first:pt-0 last:pb-0">
              <div className="flex items-start gap-3">
                <span className="text-xs font-mono text-accent dark:text-accent/80 mt-1 flex-shrink-0 w-20 text-right">
                  {event.yearDisplay}
                </span>
                <div className="flex-1 min-w-0">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-ink-100 dark:bg-ink-800 text-ink-500 dark:text-ink-400 mr-2">
                    {event.category}
                  </span>
                  <p className="text-sm font-medium text-ink-900 dark:text-ink-100 inline">
                    {event.title}
                  </p>
                  <p className="text-xs text-ink-500 dark:text-ink-400 mt-1 line-clamp-2">
                    {event.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 底部提示 */}
        <div className="px-6 pb-4 flex items-center justify-between">
          <span className="text-xs text-ink-400 dark:text-ink-500">
            共 {events.length} 件大事
          </span>
          <a
            href="/timeline"
            className="text-xs text-accent hover:underline font-medium"
          >
            查看全部 →
          </a>
        </div>
      </div>
    </div>
  );
}
