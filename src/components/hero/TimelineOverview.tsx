/**
 * 五千年时间轴缩略图横栏
 * @see ITERATIONS.md #89 B5
 *
 * 横向 SVG 时间轴：夏→商→周→秦→汉→三国→晋→南北朝→隋→唐→五代→宋→辽→金→元→明→清→民国→共和国
 * 每个朝代按 periodStart/End 比例分布，hover 高亮，点击跳 /dynasties/:id
 * 上下两条区间条让用户一眼看到「朝代重叠」和「五千年跨度」
 */

import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchDynasties, type FrontendDynasty } from '@/services/api';
import { useT } from '@/i18n/i18n';

// 朝代固定色板（按时间顺序）
const DYNASTY_COLORS = [
  '#9CA3AF', // 夏 - 灰
  '#A78BFA', // 商 - 紫
  '#F59E0B', // 周 - 琥珀
  '#1F2937', // 秦 - 墨黑
  '#DC2626', // 汉 - 红
  '#F97316', // 三国 - 橙
  '#84CC16', // 晋 - 黄绿
  '#06B6D4', // 南北朝 - 青
  '#0EA5E9', // 隋 - 天蓝
  '#DC2626', // 唐 - 朱红
  '#9333EA', // 五代 - 紫
  '#16A34A', // 宋 - 绿
  '#0891B2', // 辽 - 深青
  '#CA8A04', // 金 - 深黄
  '#0369A1', // 元 - 深蓝
  '#EA580C', // 明 - 深橙
  '#B91C1C', // 清 - 深红
  '#6B7280', // 民国 - 中灰
  '#DC2626', // 共和国 - 大红
];

// 时间轴范围（公元前 2070 → 公元 2025）
const YEAR_MIN = -2100;
const YEAR_MAX = 2100;
const YEAR_SPAN = YEAR_MAX - YEAR_MIN;

export default function TimelineOverview() {
  const t = useT();
  const navigate = useNavigate();
  const [dynasties, setDynasties] = useState<FrontendDynasty[]>([]);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  // 一次性加载（组件被 HomePage 挂载时）
  useMemo(() => {
    fetchDynasties()
      .then(list => setDynasties(list))
      .catch(() => {});
  }, []);

  // 计算每个朝代的位置和宽度（百分比）
  const positioned = useMemo(() => {
    return dynasties
      .map((d, i) => {
        if (d.periodStart === null || d.periodEnd === null) return null;
        const start = Math.max(YEAR_MIN, d.periodStart);
        const end = Math.min(YEAR_MAX, d.periodEnd);
        const left = ((start - YEAR_MIN) / YEAR_SPAN) * 100;
        const width = ((end - start) / YEAR_SPAN) * 100;
        return { d, i, left, width, color: DYNASTY_COLORS[i % DYNASTY_COLORS.length] };
      })
      .filter(Boolean) as { d: FrontendDynasty; i: number; left: number; width: number; color: string }[];
  }, [dynasties]);

  // 关键年份刻度
  const ticks = [
    { year: -2000, label: '前2000' },
    { year: -1000, label: '前1000' },
    { year: 0, label: '公元0' },
    { year: 500, label: '500' },
    { year: 1000, label: '1000' },
    { year: 1500, label: '1500' },
    { year: 2000, label: '2000' },
  ];

  return (
    <div className="w-full bg-white/60 dark:bg-ink-900/60 rounded-2xl border border-ink-200 dark:border-ink-700 p-5">
      {/* 标题 */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-base font-bold text-ink-900 dark:text-ink-100">
            📜 {t('home.timeline_overview_title')}
          </h3>
          <p className="text-xs text-ink-500 dark:text-ink-400 mt-0.5">
            {t('home.timeline_overview_subtitle')}
          </p>
        </div>
        <span className="text-xs text-ink-400">
          {dynasties.length} 朝代 · 4000+ 年
        </span>
      </div>

      {/* SVG 时间轴 */}
      <div className="relative h-20">
        {/* 主轴线 */}
        <div className="absolute left-0 right-0 top-1/2 h-1 bg-ink-100 dark:bg-ink-800 rounded" />

        {/* 朝代条 */}
        {positioned.map(({ d, i, left, width, color }) => {
          const isHover = hoverIdx === i;
          return (
            <button
              key={d.id}
              onClick={() => navigate(`/dynasties/${d.id}`)}
              onMouseEnter={() => setHoverIdx(i)}
              onMouseLeave={() => setHoverIdx(null)}
              className="absolute top-1/2 -translate-y-1/2 group"
              style={{ left: `${left}%`, width: `${Math.max(0.8, width)}%` }}
              title={`${d.name} · ${d.period} · 开国 ${d.founder}`}
            >
              {/* 朝代色条 */}
              <div
                className={`h-6 rounded transition-all ${
                  isHover ? 'h-8 -translate-y-1 shadow-lg' : ''
                }`}
                style={{ backgroundColor: color, opacity: isHover ? 1 : 0.85 }}
              />
              {/* 朝代名（宽度足够时显示） */}
              {width > 3 && (
                <span
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-bold text-white transition-all ${
                    isHover ? 'text-xs' : ''
                  }`}
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
                >
                  {d.name}
                </span>
              )}
            </button>
          );
        })}

        {/* hover 时显示的提示气泡 */}
        {hoverIdx !== null && positioned[hoverIdx] && (
          <div
            className="absolute -top-2 -translate-y-full bg-ink-900 dark:bg-ink-700 text-white text-xs px-2 py-1 rounded shadow-lg pointer-events-none whitespace-nowrap"
            style={{
              left: `${Math.min(85, Math.max(5, positioned[hoverIdx].left + positioned[hoverIdx].width / 2))}%`,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <div className="font-bold">{positioned[hoverIdx].d.name}</div>
            <div className="text-[10px] opacity-80">{positioned[hoverIdx].d.period}</div>
            <div className="text-[10px] opacity-80">开国 {positioned[hoverIdx].d.founder}</div>
            <div className="text-[10px] opacity-80">都城 {positioned[hoverIdx].d.capital || '—'}</div>
          </div>
        )}

        {/* 刻度 */}
        <div className="absolute left-0 right-0 -bottom-1">
          {ticks.map(tk => {
            const pct = ((tk.year - YEAR_MIN) / YEAR_SPAN) * 100;
            return (
              <div
                key={tk.year}
                className="absolute flex flex-col items-center"
                style={{ left: `${pct}%`, transform: 'translateX(-50%)' }}
              >
                <div className="w-px h-2 bg-ink-300 dark:bg-ink-600" />
                <span className="text-[9px] text-ink-400 mt-0.5 whitespace-nowrap">{tk.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
