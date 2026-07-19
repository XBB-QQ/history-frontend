import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getHotPages, getColdPages } from '@/services/analyticsApi';
import { useT } from '@/i18n/i18n';
import { useI18nStore } from '@/i18n/i18n';
import { getPageMeta } from '@/utils/pageLabels';

interface Row {
  path: string;
  count: number;
}

type DaysTab = 0 | 7 | 30;

const DAYS_TABS: { value: DaysTab; labelKey: string }[] = [
  { value: 0, labelKey: 'hot.tab_all' },
  { value: 7, labelKey: 'hot.tab_7d' },
  { value: 30, labelKey: 'hot.tab_30d' },
];

/**
 * 页面热度榜
 * - 时间维度切换（全部 / 近7天 / 近30天）
 * - 底部展示冷门页面预警
 */
export default function HotPagesPage() {
  const t = useT();
  const locale = useI18nStore((s) => s.locale);
  const [rows, setRows] = useState<Row[]>([]);
  const [coldRows, setColdRows] = useState<Row[]>([]);
  const [days, setDays] = useState<DaysTab>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [maxCount, setMaxCount] = useState(1);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    Promise.all([
      getHotPages(50, days),
      getColdPages(10),
    ])
      .then(([hotData, coldData]) => {
        if (cancelled) return;
        const list = Object.entries(hotData.pages).map(([path, count]) => ({ path, count }));
        setRows(list);
        setMaxCount(list.length > 0 ? list[0].count : 1);
        setColdRows(Object.entries(coldData.pages).map(([path, count]) => ({ path, count })));
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e.message || '加载失败');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [locale, days]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-widest text-ink-900 dark:text-ink-100">
          {t('hot.title') || '页面热度榜'}
        </h1>
        <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">
          {t('hot.subtitle') || '基于真实访问统计，展示最受用户欢迎的页面'}
        </p>
      </header>

      {/* 时间维度切换 */}
      <div className="flex gap-2 mb-6">
        {DAYS_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setDays(tab.value)}
            className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-colors ${
              days === tab.value
                ? 'bg-accent text-white'
                : 'bg-white dark:bg-ink-900 text-ink-600 dark:text-ink-400 hover:bg-ink-50 dark:hover:bg-ink-800'
            }`}
          >
            {t(tab.labelKey)}
          </button>
        ))}
      </div>

      {loading && (
        <div className="text-center py-12 text-ink-400">{t('common.loading') || '加载中...'}</div>
      )}

      {error && (
        <div className="text-center py-12 text-red-500">
          {error}
          <button
            onClick={() => window.location.reload()}
            className="block mx-auto mt-3 px-4 py-1.5 rounded bg-ink-100 dark:bg-ink-800 text-sm hover:bg-ink-200 dark:hover:bg-ink-700"
          >
            {t('common.retry') || '重试'}
          </button>
        </div>
      )}

      {!loading && !error && rows.length === 0 && (
        <div className="text-center py-12 text-ink-400">
          {t('hot.empty') || '暂无访问数据，去浏览几个页面再来看看吧'}
        </div>
      )}

      {!loading && !error && rows.length > 0 && (
        <ol className="space-y-2">
          {rows.map((row, idx) => {
            const percent = Math.max(2, Math.round((row.count / maxCount) * 100));
            const rank = idx + 1;
            const rankColor =
              rank === 1
                ? 'bg-red-500 text-white'
                : rank === 2
                ? 'bg-orange-500 text-white'
                : rank === 3
                ? 'bg-yellow-500 text-white'
                : 'bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-300';
            // 路径 → emoji + 中文名（未知路径回退到原路径）
            const meta = getPageMeta(row.path);
            const emoji = meta?.emoji || '📄';
            const label = meta ? t(meta.labelKey) : row.path;
            return (
              <li
                key={row.path}
                className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-ink-900 border border-ink-100 dark:border-ink-800 hover:border-accent dark:hover:border-accent transition-colors"
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${rankColor}`}>
                  {rank}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <Link
                      to={row.path}
                      className="text-sm text-ink-900 dark:text-ink-100 hover:text-accent truncate flex items-center gap-1.5"
                    >
                      <span className="text-base">{emoji}</span>
                      <span className="font-medium">{label}</span>
                    </Link>
                    <span className="text-sm font-bold text-ink-700 dark:text-ink-300 ml-2 flex-shrink-0">
                      {row.count.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-1.5 bg-ink-100 dark:bg-ink-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-accent to-orange-400 transition-all"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      )}

      {/* 冷门页面预警 */}
      {!loading && !error && coldRows.length > 0 && (
        <section className="mt-10 pt-8 border-t border-ink-200 dark:border-ink-800">
          <header className="mb-4">
            <h2 className="text-xl font-bold text-ink-900 dark:text-ink-100 flex items-center gap-2">
              <span>❄️</span>
              <span>{t('hot.cold_title') || '冷门页面预警'}</span>
            </h2>
            <p className="text-xs text-ink-500 dark:text-ink-400 mt-1">
              {t('hot.cold_subtitle') || '访问次数最少的页面，可能是内容盲区'}
            </p>
          </header>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {coldRows.map((row) => {
              const meta = getPageMeta(row.path);
              const emoji = meta?.emoji || '📄';
              const label = meta ? t(meta.labelKey) : row.path;
              return (
                <li
                  key={row.path}
                  className="flex items-center justify-between p-2 rounded-lg bg-ink-50 dark:bg-ink-900/50 border border-ink-100 dark:border-ink-800"
                >
                  <Link
                    to={row.path}
                    className="text-sm text-ink-700 dark:text-ink-300 hover:text-accent truncate flex items-center gap-1.5"
                  >
                    <span>{emoji}</span>
                    <span className="truncate">{label}</span>
                  </Link>
                  <span className="text-xs text-ink-400 ml-2 flex-shrink-0">
                    {row.count.toLocaleString()} 次
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
}
