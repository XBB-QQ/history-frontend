/**
 * 统一时间轴 Hub 快照可视化组件
 * @see ITERATIONS.md #87
 *
 * 接收 YearSnapshot，渲染多模块同年份快照卡片网格。
 * 年份滑块和数据加载由父页面负责，本组件只做展示。
 */

import { useT } from '@/i18n/i18n';
import type { YearSnapshot } from '@/utils/timelineSnapshot';
import { METRIC_LABELS } from '@/data/features/dynastyCompare';

interface UnifiedTimelineHubProps {
  snapshot: YearSnapshot | null;
  loading?: boolean;
}

/** 把年份格式化为"公元前/公元"字符串 */
function formatYear(year: number, t: (k: string, p?: Record<string, string | number>) => string): string {
  if (year < 0) return t('timelineHub.snapshot_year_bc', { year: Math.abs(year) });
  return t('timelineHub.snapshot_year_ad', { year });
}

// ──────────────────────────────────────────────
// 通用卡片包装
// ──────────────────────────────────────────────

function SnapshotCard({
  title,
  icon,
  accent,
  children,
}: {
  title: string;
  icon: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white/70 dark:bg-ink-900/70 rounded-xl border border-ink-200 dark:border-ink-700 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-ink-100 dark:border-ink-800">
        <span className="text-xl">{icon}</span>
        <h4 className={`text-sm font-bold ${accent}`}>{title}</h4>
      </div>
      <div className="space-y-2 text-sm">{children}</div>
    </div>
  );
}

// ──────────────────────────────────────────────
// 主组件
// ──────────────────────────────────────────────

export default function UnifiedTimelineHub({ snapshot, loading = false }: UnifiedTimelineHubProps) {
  const t = useT();

  if (loading) {
    return (
      <div className="mt-8 p-8 text-center text-ink-500 dark:text-ink-400">
        <div className="animate-pulse text-2xl mb-2">⏳</div>
        <p className="text-sm">{t('timelineHub.snapshot_loading')}</p>
      </div>
    );
  }

  if (!snapshot) {
    return null;
  }

  const hasAnyData =
    snapshot.dynasty ||
    snapshot.events.length > 0 ||
    snapshot.persons.length > 0 ||
    snapshot.territories.length > 0 ||
    snapshot.climate !== undefined ||
    snapshot.migrations.length > 0 ||
    snapshot.currency !== undefined ||
    snapshot.colors !== undefined ||
    snapshot.metrics !== undefined ||
    snapshot.measures.length > 0;

  if (!hasAnyData) {
    return (
      <div className="mt-8 p-6 text-center text-ink-500 dark:text-ink-400 bg-white/50 dark:bg-ink-900/50 rounded-xl border border-dashed border-ink-300 dark:border-ink-700">
        <p className="text-sm">{t('timelineHub.snapshot_empty')}</p>
        <p className="text-lg font-bold mt-2 text-accent">{formatYear(snapshot.year, t)}</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      {/* 年份标题 */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-accent tracking-wider">
          {formatYear(snapshot.year, t)}
        </h3>
        {snapshot.dynasty && (
          <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">
            {snapshot.dynasty.name} · {snapshot.dynasty.period}
          </p>
        )}
      </div>

      {/* 卡片网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* 在位朝代 */}
        {snapshot.dynasty && (
          <SnapshotCard
            title={t('timelineHub.card_dynasty')}
            icon="🏛️"
            accent="text-purple-600 dark:text-purple-400"
          >
            <dl className="space-y-1 text-xs">
              <div className="flex justify-between">
                <dt className="text-ink-500 dark:text-ink-400">{t('timelineHub.metric_capital')}</dt>
                <dd className="font-medium">{snapshot.dynasty.capital || '—'}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-500 dark:text-ink-400">{t('timelineHub.metric_duration')}</dt>
                <dd className="font-medium">{snapshot.dynasty.duration || '—'}</dd>
              </div>
              {snapshot.dynasty.populationPeak && (
                <div className="flex justify-between">
                  <dt className="text-ink-500 dark:text-ink-400">{t('timelineHub.metric_population_peak')}</dt>
                  <dd className="font-medium">{snapshot.dynasty.populationPeak}</dd>
                </div>
              )}
              {snapshot.dynasty.gdpEstimate && (
                <div className="flex justify-between">
                  <dt className="text-ink-500 dark:text-ink-400">{t('timelineHub.metric_gdp_estimate')}</dt>
                  <dd className="font-medium">{snapshot.dynasty.gdpEstimate}</dd>
                </div>
              )}
            </dl>
            {snapshot.dynasty.highlights && (
              <p className="text-xs text-ink-600 dark:text-ink-400 mt-2 line-clamp-3">
                {snapshot.dynasty.highlights}
              </p>
            )}
          </SnapshotCard>
        )}

        {/* 当年事件 */}
        {snapshot.events.length > 0 && (
          <SnapshotCard
            title={`${t('timelineHub.card_events')} (${snapshot.events.length})`}
            icon="📜"
            accent="text-accent"
          >
            <ul className="space-y-2">
              {snapshot.events.slice(0, 5).map((e) => (
                <li key={e.id} className="text-xs">
                  <div className="font-bold text-ink-700 dark:text-ink-300">{e.title}</div>
                  {e.description && (
                    <p className="text-ink-500 dark:text-ink-400 line-clamp-2 mt-0.5">
                      {e.description}
                    </p>
                  )}
                </li>
              ))}
              {snapshot.events.length > 5 && (
                <li className="text-xs text-ink-400 italic">+{snapshot.events.length - 5} …</li>
              )}
            </ul>
          </SnapshotCard>
        )}

        {/* 在世人物 */}
        {snapshot.persons.length > 0 && (
          <SnapshotCard
            title={`${t('timelineHub.card_persons')} (${snapshot.persons.length})`}
            icon="👥"
            accent="text-emerald-600 dark:text-emerald-400"
          >
            <ul className="space-y-1.5">
              {snapshot.persons.slice(0, 6).map((p) => (
                <li key={p.id} className="text-xs flex items-baseline justify-between gap-2">
                  <span className="font-bold text-ink-700 dark:text-ink-300">{p.name}</span>
                  <span className="text-ink-400 text-[10px]">{p.yearsDisplay}</span>
                </li>
              ))}
              {snapshot.persons.length > 6 && (
                <li className="text-xs text-ink-400 italic">+{snapshot.persons.length - 6} …</li>
              )}
            </ul>
          </SnapshotCard>
        )}

        {/* 疆域 */}
        {snapshot.territories.length > 0 && (
          <SnapshotCard
            title={t('timelineHub.card_territory')}
            icon="🗺️"
            accent="text-cyan-600 dark:text-cyan-400"
          >
            {snapshot.territories.map((terr) => (
              <div key={terr.id} className="text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-ink-700 dark:text-ink-300">
                    {terr.emoji} {terr.name}
                  </span>
                  <span
                    className="inline-block w-3 h-3 rounded-full"
                    style={{ backgroundColor: terr.color }}
                  />
                </div>
                <p className="text-ink-500 dark:text-ink-400 mt-0.5">
                  {t('timelineHub.metric_capital')}: {terr.capitals.join(' / ')} · 疆域约 {terr.areaEstimate} 万 km²
                </p>
              </div>
            ))}
          </SnapshotCard>
        )}

        {/* 气候 */}
        {snapshot.climate && (
          <SnapshotCard
            title={t('timelineHub.card_climate')}
            icon="🌡️"
            accent="text-orange-600 dark:text-orange-400"
          >
            <div className="text-xs">
              <div className="font-bold text-ink-700 dark:text-ink-300">{snapshot.climate.era}</div>
              <p className="text-ink-500 dark:text-ink-400 mt-0.5">
                Δ{snapshot.climate.temperatureDelta > 0 ? '+' : ''}
                {snapshot.climate.temperatureDelta}°C
              </p>
              <p className="text-ink-600 dark:text-ink-400 mt-1 line-clamp-3">
                {snapshot.climate.description}
              </p>
            </div>
          </SnapshotCard>
        )}

        {/* 迁徙 */}
        {snapshot.migrations.length > 0 && (
          <SnapshotCard
            title={t('timelineHub.card_migrations')}
            icon="🚶"
            accent="text-rose-600 dark:text-rose-400"
          >
            {snapshot.migrations.map((m) => (
              <div key={m.id} className="text-xs">
                <div className="font-bold text-ink-700 dark:text-ink-300">
                  {m.emoji} {m.title}
                </div>
                <p className="text-ink-500 dark:text-ink-400 mt-0.5">
                  规模约 {m.scale} 万人 · {m.dynasty}
                </p>
              </div>
            ))}
          </SnapshotCard>
        )}

        {/* 货币 */}
        {snapshot.currency && (
          <SnapshotCard
            title={t('timelineHub.card_currency')}
            icon="💰"
            accent="text-amber-600 dark:text-amber-400"
          >
            <div className="text-xs space-y-1">
              <div className="font-bold text-ink-700 dark:text-ink-300">{snapshot.currency.dynasty}</div>
              <div className="flex justify-between">
                <span className="text-ink-500 dark:text-ink-400">{t('timelineHub.metric_rice_per_guan')}</span>
                <span className="font-medium">{snapshot.currency.ricePricePerGuan} 斤</span>
              </div>
              <p className="text-ink-600 dark:text-ink-400 mt-1 line-clamp-2">
                {snapshot.currency.period}
              </p>
            </div>
          </SnapshotCard>
        )}

        {/* 色谱 */}
        {snapshot.colors && (
          <SnapshotCard
            title={t('timelineHub.card_colors')}
            icon="🎨"
            accent="text-pink-600 dark:text-pink-400"
          >
            <div className="text-xs">
              <div className="font-bold text-ink-700 dark:text-ink-300 mb-2">{snapshot.colors.dynasty}</div>
              <div className="flex flex-wrap gap-1.5">
                {snapshot.colors.colors.slice(0, 6).map((c) => (
                  <div
                    key={c.id}
                    className="flex flex-col items-center"
                    title={`${c.name} · ${c.source}`}
                  >
                    <div
                      className="w-8 h-8 rounded-md border border-ink-200 dark:border-ink-700"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span className="text-[10px] text-ink-500 dark:text-ink-400 mt-0.5">{c.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </SnapshotCard>
        )}

        {/* 雷达指标 */}
        {snapshot.metrics && (
          <SnapshotCard
            title={t('timelineHub.card_metrics')}
            icon="📊"
            accent="text-indigo-600 dark:text-indigo-400"
          >
            <div className="text-xs space-y-1">
              <div className="font-bold text-ink-700 dark:text-ink-300 mb-1">
                {snapshot.metrics.dynastyName}
              </div>
              {(Object.keys(METRIC_LABELS) as Array<keyof typeof METRIC_LABELS>).map((key) => {
                const value = snapshot.metrics![key];
                return (
                  <div key={key} className="flex items-center gap-2">
                    <span className="text-ink-500 dark:text-ink-400 w-12">{METRIC_LABELS[key]}</span>
                    <div className="flex-1 h-1.5 bg-ink-100 dark:bg-ink-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-400 to-purple-500"
                        style={{ width: `${value}%` }}
                      />
                    </div>
                    <span className="text-ink-600 dark:text-ink-400 w-7 text-right">{value}</span>
                  </div>
                );
              })}
            </div>
          </SnapshotCard>
        )}

        {/* 度量衡 */}
        {snapshot.measures.length > 0 && (
          <SnapshotCard
            title={t('timelineHub.card_measures')}
            icon="📏"
            accent="text-teal-600 dark:text-teal-400"
          >
            <ul className="text-xs space-y-1">
              {snapshot.measures.slice(0, 6).map((u, idx) => (
                <li key={`${u.id}-${idx}`} className="flex justify-between">
                  <span className="font-medium text-ink-700 dark:text-ink-300">
                    {u.name} <span className="text-ink-400">({u.dynasty})</span>
                  </span>
                  <span className="text-ink-500 dark:text-ink-400">{u.description}</span>
                </li>
              ))}
            </ul>
          </SnapshotCard>
        )}
      </div>
    </div>
  );
}
