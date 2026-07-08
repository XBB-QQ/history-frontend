/**
 * 统一时间轴 Hub 页面
 * 聚合所有时间轴相关功能，提供统一的视觉导航
 * @see ITERATIONS.md #87
 *
 * T087 升级：集成年份 scrubber + 跨模块同年份快照引擎
 */

import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import UnifiedTimelineHub from '@/components/hub/UnifiedTimelineHub';
import { useT } from '@/i18n/i18n';
import { loadEvents, loadPersons, loadDynasties } from '@/utils';
import {
  getSnapshotAtYear,
  getSnapshotYearRange,
  DEFAULT_SNAPSHOT_YEAR_RANGE,
  type SnapshotInput,
  type YearSnapshot,
} from '@/utils/timelineSnapshot';

interface TimelineFeature {
  id: string;
  titleKey: string;
  descKey: string;
  icon: string;
  link: string;
  color: string;
  darkBg: string;
  tagKeys: string[];
  featured?: boolean;
}

const TIMELINE_FEATURES: TimelineFeature[] = [
  {
    id: 'events',
    titleKey: 'timelineHub.feature_events_title',
    descKey: 'timelineHub.feature_events_desc',
    icon: '📜',
    link: '/timeline',
    color: 'text-accent',
    darkBg: 'bg-accent/10',
    tagKeys: ['timelineHub.tag_dynasty_filter', 'timelineHub.tag_category_browse', 'timelineHub.tag_interactive_timeline'],
    featured: true,
  },
  {
    id: 'transport',
    titleKey: 'timelineHub.feature_transport_title',
    descKey: 'timelineHub.feature_transport_desc',
    icon: '🛣️',
    link: '/transport-timeline',
    color: 'text-orange-600',
    darkBg: 'bg-orange-100 dark:bg-orange-900/30',
    tagKeys: ['timelineHub.tag_route_map', 'timelineHub.tag_dynasty_compare_tag', 'timelineHub.tag_infrastructure'],
  },
  {
    id: 'simulator',
    titleKey: 'timelineHub.feature_simulator_title',
    descKey: 'timelineHub.feature_simulator_desc',
    icon: '🎲',
    link: '/simulator',
    color: 'text-indigo-600',
    darkBg: 'bg-indigo-100 dark:bg-indigo-900/30',
    tagKeys: ['timelineHub.tag_interactive', 'timelineHub.tag_parallel_history', 'timelineHub.tag_multi_ending'],
  },
  {
    id: 'story-quest',
    titleKey: 'timelineHub.feature_story_quest_title',
    descKey: 'timelineHub.feature_story_quest_desc',
    icon: '🗺️',
    link: '/story-quest',
    color: 'text-emerald-600',
    darkBg: 'bg-emerald-100 dark:bg-emerald-900/30',
    tagKeys: ['timelineHub.tag_theme_routes', 'timelineHub.tag_progress_tracking', 'timelineHub.tag_deep_learning'],
  },
  {
    id: 'dynasty-compare',
    titleKey: 'timelineHub.feature_dynasty_compare_title',
    descKey: 'timelineHub.feature_dynasty_compare_desc',
    icon: '⚖️',
    link: '/dynasty-compare',
    color: 'text-purple-600',
    darkBg: 'bg-purple-100 dark:bg-purple-900/30',
    tagKeys: ['timelineHub.tag_multi_dim_compare', 'timelineHub.tag_radar_chart', 'timelineHub.tag_data_viz'],
  },
  {
    id: 'causal-chain',
    titleKey: 'timelineHub.feature_causal_chain_title',
    descKey: 'timelineHub.feature_causal_chain_desc',
    icon: '🔗',
    link: '/causal-chain',
    color: 'text-cyan-600',
    darkBg: 'bg-cyan-100 dark:bg-cyan-900/30',
    tagKeys: ['timelineHub.tag_causal_analysis', 'timelineHub.tag_event_link', 'timelineHub.tag_deep_inference'],
  },
];

/* ─── 时间轴缩略预览组件 ─── */
function TimelineMiniPreview() {
  const t = useT();
  return (
    <div className="mt-12 p-6 bg-white/50 dark:bg-ink-900/50 rounded-xl border border-ink-200 dark:border-ink-700">
      <h3 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-4 tracking-widest text-center">
        {t('timelineHub.overview_title')}
      </h3>
      <div className="relative h-32 overflow-hidden rounded-lg bg-gradient-to-r from-ink-100 via-ink-200 to-ink-100 dark:from-ink-800 dark:via-ink-700 dark:to-ink-800">
        {/* 中心时间线 */}
        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

        {/* 朝代节点 */}
        {['夏', '商', '周', '秦', '汉', '三国', '唐', '宋', '元', '明', '清'].map((dynasty, i) => (
          <div
            key={dynasty}
            className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center"
            style={{ left: `${(i + 0.5) * 9.09}%` }}
          >
            <div className={`w-3 h-3 rounded-full ${i % 2 === 0 ? 'bg-accent' : 'bg-amber-500'} ring-4 ring-white/50 dark:ring-ink-900/50`} />
            <span className="text-[10px] mt-1 font-bold text-ink-600 dark:text-ink-400">{dynasty}</span>
          </div>
        ))}

        {/* 左右箭头提示 */}
        <div className="absolute left-2 top-1/2 -translate-y-1/2 text-ink-400 text-xs">←</div>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-ink-400 text-xs">→</div>
      </div>
      <p className="text-center text-xs text-ink-500 dark:text-ink-400 mt-3">
        {t('timelineHub.overview_subtitle')}
      </p>
    </div>
  );
}

/** 把年份格式化为"公元前/公元"短文本（用于滑块旁的标签） */
function formatYearShort(year: number): string {
  if (year < 0) return `前 ${Math.abs(year)}`;
  return `公元 ${year}`;
}

export default function TimelineHubPage() {
  const t = useT();
  const [searchParams] = useSearchParams();

  // ─── 快照引擎状态 ───
  const [input, setInput] = useState<SnapshotInput | null>(null);
  const [loading, setLoading] = useState(true);

  // 从 URL ?year= 初始化年份（支持 TimeTravelBar "在 Hub 中查看" 联动跳转）
  const initialYear = (() => {
    const y = searchParams.get('year');
    if (y === null) return 750; // 默认唐玄宗时期
    const n = parseInt(y, 10);
    return isNaN(n) ? 750 : n;
  })();
  const [year, setYear] = useState<number>(initialYear);

  // 加载本地数据（events/persons/dynasties）
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [events, persons, dynasties] = await Promise.all([
          loadEvents(),
          loadPersons(),
          loadDynasties(),
        ]);
        if (!cancelled) {
          setInput({ events, persons, dynasties });
          setLoading(false);
        }
      } catch (err) {
        console.error('[TimelineHub] 数据加载失败:', err);
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // 计算 scrubber 范围
  const yearRange = useMemo<[number, number]>(() => {
    if (input) return getSnapshotYearRange(input);
    return DEFAULT_SNAPSHOT_YEAR_RANGE;
  }, [input]);

  // 计算当前年份的快照
  const snapshot: YearSnapshot | null = useMemo(() => {
    if (!input) return null;
    return getSnapshotAtYear(year, input);
  }, [year, input]);

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* 头部 */}
        <RevealOnScroll direction="fade">
          <SectionHeader
            label="UNIFIED TIMELINE"
            title={t('timelineHub.title')}
            description={t('timelineHub.description')}
          />
        </RevealOnScroll>

        {/* ─── T087: 年份 Scrubber + 跨模块快照 ─── */}
        <RevealOnScroll direction="up" delay={80}>
          <div className="mt-8 p-6 bg-white/70 dark:bg-ink-900/70 rounded-xl border border-ink-200 dark:border-ink-700">
            {/* Scrubber 头部 */}
            <div className="flex items-baseline justify-between mb-3 gap-4 flex-wrap">
              <div>
                <span className="text-xs text-ink-500 dark:text-ink-400 tracking-widest">
                  {t('timelineHub.snapshot_scrubber_label')}
                </span>
                <div className="text-2xl font-bold text-accent mt-0.5">
                  {formatYearShort(year)}
                </div>
              </div>
              <div className="text-xs text-ink-400">
                {formatYearShort(yearRange[0])} ↔ {formatYearShort(yearRange[1])}
              </div>
            </div>

            {/* 滑块 */}
            <input
              type="range"
              min={yearRange[0]}
              max={yearRange[1]}
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="w-full h-2 bg-ink-200 dark:bg-ink-700 rounded-lg appearance-none cursor-pointer accent-accent"
              aria-label={t('timelineHub.snapshot_scrubber_label')}
            />

            {/* 快速跳转按钮 */}
            <div className="flex flex-wrap gap-2 mt-3">
              {[-221, -138, 100, 350, 627, 755, 960, 1127, 1368, 1644, 1840].map((y) => (
                <button
                  key={y}
                  onClick={() => setYear(y)}
                  className={`text-xs px-2.5 py-1 rounded-full transition-colors ${
                    year === y
                      ? 'bg-accent text-white'
                      : 'bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-400 hover:bg-accent/20'
                  }`}
                >
                  {formatYearShort(y)}
                </button>
              ))}
            </div>
          </div>

          {/* 快照卡片网格 */}
          <UnifiedTimelineHub snapshot={snapshot} loading={loading} />
        </RevealOnScroll>

        {/* 功能网格 */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TIMELINE_FEATURES.map((feature, index) => (
            <RevealOnScroll direction="up" delay={100 + index * 80} key={feature.id}>
              <Link
                to={feature.link}
                className="block p-5 bg-white/70 dark:bg-ink-900/70 rounded-xl border border-ink-200 dark:border-ink-700 hover:border-accent hover:shadow-lg hover:-translate-y-1 transition-all group h-full"
              >
                {/* 图标 + 标题 */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{feature.icon}</span>
                  <div>
                    <h3 className={`text-base font-bold ${feature.color} group-hover:text-accent transition-colors`}>
                      {t(feature.titleKey)}
                    </h3>
                    {feature.featured && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-accent/10 text-accent font-bold">
                        {t('timelineHub.core_badge')}
                      </span>
                    )}
                  </div>
                </div>

                {/* 描述 */}
                <p className="text-sm text-ink-600 dark:text-ink-400 leading-relaxed mb-3 line-clamp-2">
                  {t(feature.descKey)}
                </p>

                {/* 标签 */}
                <div className="flex flex-wrap gap-1.5">
                  {feature.tagKeys.map(tagKey => (
                    <span
                      key={tagKey}
                      className={`text-[10px] px-2 py-0.5 rounded-full ${feature.darkBg} ${feature.color}`}
                    >
                      {t(tagKey)}
                    </span>
                  ))}
                </div>
              </Link>
            </RevealOnScroll>
          ))}
        </div>

        {/* 时间轴缩略预览 */}
        <TimelineMiniPreview />

        {/* 底部 */}
        <RevealOnScroll direction="fade" delay={400}>
          <div className="mt-12 text-center">
            <Link to="/" className="btn-secondary">{t('common.back_home')}</Link>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
