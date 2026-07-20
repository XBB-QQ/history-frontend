/**
 * 首页「继续浏览」横栏
 * @see ITERATIONS.md #89 A1
 *
 * 显示 localStorage 中最近 5 条浏览记录
 * 横向卡片，点击直达详情
 * 空时显示「暂无浏览记录」提示
 */

import { useNavigate } from 'react-router-dom';
import { useRecentBrowseStore, type RecentItemType } from '@/store/recentBrowseStore';
import { useT } from '@/i18n/i18n';

const TYPE_ICON: Record<RecentItemType, string> = {
  event: '📜',
  person: '👤',
  dynasty: '🏛️',
  knowledge: '📚',
};

const TYPE_COLOR: Record<RecentItemType, string> = {
  event: 'text-accent bg-accent/10',
  person: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30',
  dynasty: 'text-purple-600 bg-purple-100 dark:bg-purple-900/30',
  knowledge: 'text-amber-600 bg-amber-100 dark:bg-amber-900/30',
};

const TYPE_LABEL: Record<RecentItemType, string> = {
  event: '事件',
  person: '人物',
  dynasty: '朝代',
  knowledge: '知识',
};

function formatRelative(ts: number): string {
  const diff = Date.now() - ts;
  const min = Math.floor(diff / 60_000);
  if (min < 1) return '刚刚';
  if (min < 60) return `${min} 分钟前`;
  const hour = Math.floor(min / 60);
  if (hour < 24) return `${hour} 小时前`;
  const day = Math.floor(hour / 24);
  if (day < 30) return `${day} 天前`;
  return new Date(ts).toLocaleDateString();
}

export default function RecentBrowseBar() {
  const t = useT();
  const navigate = useNavigate();
  const { items, clear } = useRecentBrowseStore();

  if (items.length === 0) {
    return (
      <div className="w-full px-4 py-3 text-center text-xs text-ink-400 dark:text-ink-500">
        {t('home.recent_browse_empty')}
      </div>
    );
  }

  const top5 = items.slice(0, 5);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2 px-1">
        <h3 className="text-xs font-bold text-ink-500 dark:text-ink-400 uppercase tracking-widest">
          🕒 {t('home.recent_browse_title')}
        </h3>
        <button
          onClick={clear}
          className="text-xs text-ink-400 hover:text-accent transition-colors"
        >
          {t('home.recent_browse_clear')}
        </button>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 snap-x">
        {top5.map(item => (
          <button
            key={`${item.type}-${item.id}`}
            onClick={() => navigate(item.link)}
            className="flex-shrink-0 w-48 p-3 bg-white/70 dark:bg-ink-900/70 rounded-xl border border-ink-200 dark:border-ink-700 hover:border-accent hover:shadow-md transition-all snap-start text-left"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${TYPE_COLOR[item.type]}`}>
                {TYPE_ICON[item.type]} {TYPE_LABEL[item.type]}
              </span>
              <span className="text-[10px] text-ink-400">
                {formatRelative(item.visitedAt)}
              </span>
            </div>
            <div className="text-sm font-bold text-ink-900 dark:text-ink-100 truncate">
              {item.title}
            </div>
            {item.subtitle && (
              <div className="text-xs text-ink-500 dark:text-ink-400 truncate mt-0.5">
                {item.subtitle}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
