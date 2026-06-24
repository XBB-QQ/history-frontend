import { useMemo } from 'react';
import { useTimeTravelStore } from '@/store/timeTravelStore';
import type { EventItem } from '@/types';

interface TimeTravelPanelProps {
  events: EventItem[];
}

const TOLERANCE_MAP: Record<string, number> = {
  millennium: 500,
  century: 50,
  decade: 5,
};

const LABEL_MAP: Record<string, string> = {
  millennium: '千年',
  century: '百年',
  decade: '十年',
  year: '年',
};

/**
 * 时间旅行联动面板
 * 在选中年代附近展示事件卡片
 */
export default function TimeTravelPanel({ events }: TimeTravelPanelProps) {
  const { year, precision, active } = useTimeTravelStore();

  const nearbyEvents = useMemo(() => {
    if (!active) return [];

    const tolerance = precision === 'year' ? 0 : TOLERANCE_MAP[precision] || 50;

    return events
      .filter((e) => e.year && Math.abs(e.year - year) <= tolerance)
      .sort((a, b) => {
        if (!a.year || !b.year) return 0;
        return a.year - b.year;
      })
      .slice(0, 8);
  }, [events, year, precision, active]);

  if (!active || nearbyEvents.length === 0) return null;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      {/* 年代标题 */}
      <div className="text-center mb-8">
        <div className="text-4xl font-black text-accent dark:text-red-400 mb-2 tabular-nums">
          {year < 0 ? `${Math.abs(year)} BC` : year === 0 ? '公元元年' : `${year} AD`}
        </div>
        <div className="text-sm text-ink-400">
          精度：{LABEL_MAP[precision] || '年'}
          {precision !== 'year' && `（±${TOLERANCE_MAP[precision]}年）`}
        </div>
        <div className="mt-2 text-xs text-ink-300 dark:text-ink-600">
          找到 {nearbyEvents.length} 个相关事件
        </div>
      </div>

      {/* 事件卡片网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {nearbyEvents.map((event, i) => (
          <div
            key={event.id}
            className="bg-white/60 dark:bg-ink-900/60 backdrop-blur-sm rounded-xl p-4 border border-ink-200 dark:border-ink-700
                       hover:border-accent/50 hover:shadow-lg transition-all duration-300 cursor-pointer
                       animate-fade-in"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            {event.year && (
              <div className="text-xs font-mono text-accent dark:text-accent/80 mb-1">
                {event.year < 0 ? `${Math.abs(event.year)} BC` : `${event.year} AD`}
              </div>
            )}
            <h4 className="text-sm font-bold text-ink-900 dark:text-ink-100 mb-1 line-clamp-2">
              {event.title}
            </h4>
            <p className="text-xs text-ink-500 dark:text-ink-400 line-clamp-2 mb-2">
              {event.description}
            </p>
            <div className="flex flex-wrap gap-1">
              <span className="text-[10px] px-1.5 py-0.5 bg-ink-100 dark:bg-ink-800 rounded-full text-ink-500">
                {event.category}
              </span>
              {event.dynasty && (
                <span className="text-[10px] px-1.5 py-0.5 bg-ink-100 dark:bg-ink-800 rounded-full text-ink-500">
                  {event.dynasty}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 空状态提示 */}
      {nearbyEvents.length === 0 && (
        <div className="text-center py-12 text-ink-400">
          <p className="text-lg mb-1">该年代暂无记录事件</p>
          <p className="text-sm">尝试调整年代或精度</p>
        </div>
      )}
    </div>
  );
}
