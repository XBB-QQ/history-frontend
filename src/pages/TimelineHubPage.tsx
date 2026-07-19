/**
 * 统一时间轴 Hub 页面
 * 聚合所有时间轴相关功能，提供统一的视觉导航
 * @see ITERATIONS.md #87
 *
 * T087 升级：集成年份 scrubber + 跨模块同年份快照引擎
 * T088 升级：A1 键盘+自动播放 / A2 朝代节点联动 / A3 随机穿越+历史上的今天 / B6 数据密度条
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import UnifiedTimelineHub from '@/components/hub/UnifiedTimelineHub';
import { useT } from '@/i18n/i18n';
import { loadEvents, loadPersons, loadDynasties } from '@/utils';
import { fetchTodayEvents, type TodayEvent } from '@/services/api';
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

/* ─── A2: 朝代节点定义（中期年份用于点击跳转） ─── */
const DYNASTY_NODES: { name: string; midYear: number; startYear: number; endYear: number }[] = [
  { name: '夏', midYear: -1900, startYear: -2070, endYear: -1600 },
  { name: '商', midYear: -1300, startYear: -1600, endYear: -1046 },
  { name: '周', midYear: -700, startYear: -1046, endYear: -256 },
  { name: '秦', midYear: -210, startYear: -221, endYear: -206 },
  { name: '汉', midYear: 0, startYear: -202, endYear: 220 },
  { name: '三国', midYear: 250, startYear: 220, endYear: 280 },
  { name: '唐', midYear: 700, startYear: 618, endYear: 907 },
  { name: '宋', midYear: 1050, startYear: 960, endYear: 1279 },
  { name: '元', midYear: 1300, startYear: 1271, endYear: 1368 },
  { name: '明', midYear: 1500, startYear: 1368, endYear: 1644 },
  { name: '清', midYear: 1750, startYear: 1644, endYear: 1912 },
];

/* ─── 时间轴缩略预览组件 ─── */
function TimelineMiniPreview({
  year,
  onJump,
}: {
  year: number;
  onJump: (y: number) => void;
}) {
  const t = useT();

  // 找当前年份在哪个朝代（用于高亮）
  const currentDynasty = DYNASTY_NODES.find(d => year >= d.startYear && year <= d.endYear);

  return (
    <div className="mt-12 p-6 bg-white/50 dark:bg-ink-900/50 rounded-xl border border-ink-200 dark:border-ink-700">
      <h3 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-4 tracking-widest text-center">
        {t('timelineHub.overview_title')}
      </h3>
      <div className="relative h-32 overflow-hidden rounded-lg bg-gradient-to-r from-ink-100 via-ink-200 to-ink-100 dark:from-ink-800 dark:via-ink-700 dark:to-ink-800">
        {/* 中心时间线 */}
        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

        {/* 朝代节点（A2: 联动 + 点击跳转） */}
        {DYNASTY_NODES.map((node, i) => {
          const isCurrent = currentDynasty?.name === node.name;
          return (
            <button
              key={node.name}
              onClick={() => onJump(node.midYear)}
              className={`absolute top-1/2 -translate-y-1/2 flex flex-col items-center transition-all ${
                isCurrent ? 'scale-125 z-10' : 'opacity-60 hover:opacity-100'
              }`}
              style={{ left: `${(i + 0.5) * 9.09}%` }}
              title={`${node.name} · ${node.startYear < 0 ? '前' + Math.abs(node.startYear) : node.startYear} — ${node.endYear < 0 ? '前' + Math.abs(node.endYear) : node.endYear}`}
            >
              <div className={`w-3 h-3 rounded-full ${
                isCurrent
                  ? 'bg-accent ring-4 ring-accent/30 animate-pulse'
                  : i % 2 === 0
                    ? 'bg-accent ring-2 ring-white/50 dark:ring-ink-900/50'
                    : 'bg-amber-500 ring-2 ring-white/50 dark:ring-ink-900/50'
              }`} />
              <span className={`text-[10px] mt-1 font-bold ${
                isCurrent ? 'text-accent' : 'text-ink-600 dark:text-ink-400'
              }`}>{node.name}</span>
            </button>
          );
        })}

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
  const [searchParams, setSearchParams] = useSearchParams();

  // ─── 快照引擎状态 ───
  const [input, setInput] = useState<SnapshotInput | null>(null);
  const [loading, setLoading] = useState(true);
  const [todayEvents, setTodayEvents] = useState<TodayEvent[]>([]);

  // 从 URL ?year= 初始化年份（支持 TimeTravelBar "在 Hub 中查看" 联动跳转）
  const initialYear = (() => {
    const y = searchParams.get('year');
    if (y === null) return 750; // 默认唐玄宗时期
    const n = parseInt(y, 10);
    return isNaN(n) ? 750 : n;
  })();
  const [year, setYear] = useState<number>(initialYear);
  const [playing, setPlaying] = useState(false);

  // A1: 内部 URL 同步标志（避免 URL→state→URL 循环）
  const isInternalUrlChange = useRef(false);

  // 加载本地数据（events/persons/dynasties）+ A3: 历史上的今天
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [events, persons, dynasties, today] = await Promise.all([
          loadEvents(),
          loadPersons(),
          loadDynasties(),
          fetchTodayEvents().catch(() => []), // A3: 历史上的今天，失败不阻塞
        ]);
        if (!cancelled) {
          setInput({ events, persons, dynasties });
          setTodayEvents(today);
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

  // A1: 自动播放（每 800ms +1 年，到末尾自动停止）
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setYear(prev => {
        const next = prev + 1;
        if (next >= yearRange[1]) {
          setPlaying(false);
          return yearRange[1];
        }
        return next;
      });
    }, 800);
    return () => clearInterval(id);
  }, [playing, yearRange]);

  // A1: 外部 URL 变化时同步 year（如 TimeTravelBar 联动跳转）
  useEffect(() => {
    if (isInternalUrlChange.current) {
      isInternalUrlChange.current = false;
      return;
    }
    const y = searchParams.get('year');
    if (y !== null) {
      const n = parseInt(y, 10);
      if (!isNaN(n) && n !== year) setYear(n);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // A1: 统一的年份变更入口（同步 URL）
  const handleYearChange = (newYear: number) => {
    const clamped = Math.max(yearRange[0], Math.min(yearRange[1], newYear));
    isInternalUrlChange.current = true;
    setYear(clamped);
    const params = new URLSearchParams(searchParams);
    params.set('year', String(clamped));
    setSearchParams(params, { replace: true });
  };

  // A1: 键盘事件（←/→ 单步，Shift+←/→ 跳10年，空格 播放/暂停）
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // 忽略 input/textarea 焦点（避免和滑块/输入框冲突）
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handleYearChange(year - (e.shiftKey ? 10 : 1));
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleYearChange(year + (e.shiftKey ? 10 : 1));
      } else if (e.key === ' ') {
        e.preventDefault();
        setPlaying(p => !p);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [year, yearRange]);

  // A3: 随机穿越（从有数据的年份中随机抽取，避免空快照）
  const handleRandomYear = () => {
    if (!input) return;
    const yearsWithData = new Set<number>();
    input.events.forEach(e => { if (e.year !== null) yearsWithData.add(e.year); });
    input.dynasties.forEach(d => {
      if (d.periodStart !== null && d.periodEnd !== null) {
        // 每个朝代取 5 个采样点（朝代首/末/三个中间点）
        const step = Math.max(1, Math.floor((d.periodEnd - d.periodStart) / 5));
        for (let y = d.periodStart; y <= d.periodEnd; y += step) yearsWithData.add(y);
      }
    });
    if (yearsWithData.size === 0) return;
    const arr = Array.from(yearsWithData);
    const randomYear = arr[Math.floor(Math.random() * arr.length)];
    handleYearChange(randomYear);
  };

  // B6: 数据密度计算（按年份聚合事件数 + 人物中间年份）
  const densityMap = useMemo<Map<number, number>>(() => {
    if (!input) return new Map();
    const map = new Map<number, number>();
    input.events.forEach(e => {
      if (e.year !== null) map.set(e.year, (map.get(e.year) ?? 0) + 1);
    });
    input.persons.forEach(p => {
      if (p.years[0] !== null && p.years[1] !== null) {
        const mid = Math.floor((p.years[0] + p.years[1]) / 2);
        map.set(mid, (map.get(mid) ?? 0) + 1);
      }
    });
    return map;
  }, [input]);

  const densityMax = useMemo(() => Math.max(1, ...Array.from(densityMap.values())), [densityMap]);

  // B6: 把密度数据聚合为 100 个色块（按年份范围均分）
  const densityBars = useMemo(() => {
    const [min, max] = yearRange;
    const totalYears = max - min + 1;
    const barCount = 100;
    const barSpan = totalYears / barCount;
    const bars: { intensity: number; yearStart: number }[] = [];
    for (let i = 0; i < barCount; i++) {
      const yStart = Math.floor(min + i * barSpan);
      const yEnd = Math.floor(min + (i + 1) * barSpan);
      let sum = 0;
      for (let y = yStart; y < yEnd; y++) sum += densityMap.get(y) ?? 0;
      bars.push({ intensity: sum / densityMax, yearStart: yStart });
    }
    return bars;
  }, [yearRange, densityMap, densityMax]);

  // 当前年份在密度条上的位置百分比
  const currentYearPercent = yearRange[1] > yearRange[0]
    ? ((year - yearRange[0]) / (yearRange[1] - yearRange[0])) * 100
    : 0;

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

        {/* ─── T087+T088: 年份 Scrubber + 自动播放 + 密度条 + 历史上的今天 ─── */}
        <RevealOnScroll direction="up" delay={80}>
          <div className="mt-8 p-6 bg-white/70 dark:bg-ink-900/70 rounded-xl border border-ink-200 dark:border-ink-700">
            {/* Scrubber 头部 */}
            <div className="flex items-baseline justify-between mb-3 gap-4 flex-wrap">
              <div>
                <span className="text-xs text-ink-500 dark:text-ink-400 tracking-widest">
                  {t('timelineHub.snapshot_scrubber_label')}
                  {playing && (
                    <span className="ml-2 text-accent animate-pulse">
                      ● {t('timelineHub.playing_indicator')}
                    </span>
                  )}
                </span>
                <div className="text-2xl font-bold text-accent mt-0.5">
                  {formatYearShort(year)}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {/* A1: 自动播放 */}
                <button
                  onClick={() => setPlaying(p => !p)}
                  className={`text-xs px-3 py-1.5 rounded-full font-bold transition-colors ${
                    playing
                      ? 'bg-accent text-white animate-pulse'
                      : 'bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-400 hover:bg-accent/20'
                  }`}
                  title={t('timelineHub.keyboard_hint')}
                >
                  {playing ? `⏸ ${t('timelineHub.auto_play_stop')}` : `▶ ${t('timelineHub.auto_play_start')}`}
                </button>
                {/* A3: 随机穿越 */}
                <button
                  onClick={handleRandomYear}
                  className="text-xs px-3 py-1.5 rounded-full bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-400 hover:bg-accent/20 transition-colors"
                >
                  🎲 {t('timelineHub.random_year')}
                </button>
                <div className="text-xs text-ink-400">
                  {formatYearShort(yearRange[0])} ↔ {formatYearShort(yearRange[1])}
                </div>
              </div>
            </div>

            {/* B6: 数据密度条 */}
            <div className="relative h-2 mb-1 rounded overflow-hidden bg-ink-100 dark:bg-ink-800">
              {densityBars.map((bar, i) => (
                <div
                  key={i}
                  className="absolute top-0 bottom-0"
                  style={{
                    left: `${i}%`,
                    width: `1%`,
                    backgroundColor: bar.intensity > 0
                      ? `rgba(220, 38, 38, ${0.2 + bar.intensity * 0.8})`
                      : 'transparent',
                  }}
                  title={`${formatYearShort(bar.yearStart)} · ${Math.round(bar.intensity * 100)}%`}
                />
              ))}
              {/* 当前年份指示线 */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-ink-900 dark:bg-white"
                style={{ left: `${currentYearPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-ink-400 mb-2">
              <span>{t('timelineHub.data_density')}</span>
              <span>{t('timelineHub.density_low')} → {t('timelineHub.density_high')}</span>
            </div>

            {/* 滑块 */}
            <input
              type="range"
              min={yearRange[0]}
              max={yearRange[1]}
              value={year}
              onChange={(e) => handleYearChange(Number(e.target.value))}
              className="w-full h-2 bg-ink-200 dark:bg-ink-700 rounded-lg appearance-none cursor-pointer accent-accent"
              aria-label={t('timelineHub.snapshot_scrubber_label')}
            />

            {/* 快速跳转按钮 */}
            <div className="flex flex-wrap gap-2 mt-3">
              {[-221, -138, 100, 350, 627, 755, 960, 1127, 1368, 1644, 1840].map((y) => (
                <button
                  key={y}
                  onClick={() => handleYearChange(y)}
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

            {/* A1: 键盘提示 */}
            <p className="text-[10px] text-ink-400 mt-2 text-center">
              {t('timelineHub.keyboard_hint')}
            </p>

            {/* A3: 历史上的今天 */}
            {todayEvents.length > 0 && (
              <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm">📅</span>
                  <span className="text-xs font-bold text-amber-700 dark:text-amber-400">
                    {t('timelineHub.today_in_history')}
                  </span>
                  <span className="text-[10px] text-amber-600 dark:text-amber-500">
                    {todayEvents.length} 条
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {todayEvents.slice(0, 5).map(e => (
                    <button
                      key={e.id}
                      onClick={() => handleYearChange(e.year)}
                      className="text-[10px] px-2 py-0.5 bg-white dark:bg-ink-900 rounded-full text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors"
                      title={e.title}
                    >
                      {e.year < 0 ? `前${Math.abs(e.year)}` : e.year} · {e.title.length > 10 ? e.title.slice(0, 10) + '…' : e.title}
                    </button>
                  ))}
                </div>
              </div>
            )}
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

        {/* 时间轴缩略预览（A2: 联动 + 点击跳转） */}
        <TimelineMiniPreview year={year} onJump={handleYearChange} />

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
