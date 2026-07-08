/**
 * 疎域动态地图页面 — 时间轴驱动疆域变化
 * @see history-museum/design/002-innovation-brainstorm.md §18
 */

import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import { DYNASTY_TERRITORIES, TIMELINE_YEARS, getTerritoryAtYear } from '@/data/features/dynastyTerritory';
import { useT } from '@/i18n/i18n';

function formatYear(y: number, t: (key: string, params?: Record<string, string | number>) => string): string {
  return y < 0 ? t('territoryMap.yearBce', { year: Math.abs(y) }) : t('territoryMap.yearCe', { year: y });
}

export default function TerritoryMapPage() {
  const t = useT();
  const [selectedYear, setSelectedYear] = useState(TIMELINE_YEARS[0]);

  const activeDynasties = useMemo(() => getTerritoryAtYear(selectedYear), [selectedYear]);
  const activeEvents = useMemo(() => {
    const events: { dynasty: string; year: number; title: string; type: string; description: string }[] = [];
    DYNASTY_TERRITORIES.forEach(d => {
      d.territoryEvents.forEach(e => {
        if (e.year <= selectedYear) events.push({ dynasty: d.name, year: e.year, title: e.title, type: e.type, description: e.description });
      });
    });
    return events.sort((a, b) => b.year - a.year).slice(0, 5);
  }, [selectedYear]);

  // SVG 地图参数
  const MAP_W = 700;
  const MAP_H = 350;
  // 中国大致范围：纬度 18-55，经度 73-135
  const LAT_MIN = 15;
  const LAT_MAX = 58;
  const LNG_MIN = 70;
  const LNG_MAX = 138;

  function latToY(lat: number): number {
    return MAP_H - (lat - LAT_MIN) / (LAT_MAX - LAT_MIN) * MAP_H;
  }
  function lngToX(lng: number): number {
    return (lng - LNG_MIN) / (LNG_MAX - LNG_MIN) * MAP_W;
  }

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <RevealOnScroll direction="fade">
          <SectionHeader
            label="DYNASTY TERRITORY"
            title={t('territoryMap.title')}
            description={t('territoryMap.description')}
          />
        </RevealOnScroll>

        {/* 时间轴 */}
        <RevealOnScroll direction="up" delay={200}>
          <div className="mt-8 p-4 bg-white/70 dark:bg-ink-900/70 rounded-xl border border-ink-200 dark:border-ink-700">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm font-bold text-accent">{formatYear(selectedYear, t)}</span>
              <input
                type="range"
                min={0}
                max={TIMELINE_YEARS.length - 1}
                step={1}
                value={TIMELINE_YEARS.indexOf(selectedYear)}
                onChange={e => setSelectedYear(TIMELINE_YEARS[Number(e.target.value)])}
                className="flex-1 accent-accent"
              />
            </div>
            {/* 时间轴标签 */}
            <div className="flex justify-between text-xs text-ink-400 overflow-x-auto">
              {TIMELINE_YEARS.map(y => (
                <button
                  key={y}
                  onClick={() => setSelectedYear(y)}
                  className={`px-1 py-0.5 rounded transition-all ${
                    selectedYear === y ? 'bg-accent text-white font-bold' : 'hover:bg-accent/10'
                  }`}
                >
                  {y < 0 ? `${Math.abs(y)}` : `${y}`}
                </button>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* SVG 地图 */}
        <RevealOnScroll direction="fade">
          <div className="mt-6 rounded-xl overflow-hidden border border-ink-200 dark:border-ink-700 bg-ink-950">
            <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="w-full">
              {/* 海洋背景 */}
              <rect x={0} y={0} width={MAP_W} height={MAP_H} fill="#0a1628" />

              {/* 经纬网格 */}
              {[80, 90, 100, 110, 120, 130].map(lng => (
                <line key={`lng${lng}`} x1={lngToX(lng)} y1={0} x2={lngToX(lng)} y2={MAP_H} stroke="#1a3050" strokeWidth="1" />
              ))}
              {[20, 30, 40, 50].map(lat => (
                <line key={`lat${lat}`} x1={0} y1={latToY(lat)} x2={MAP_W} y2={latToY(lat)} stroke="#1a3050" strokeWidth="1" />
              ))}

              {/* 海岸线简化 */}
              <path
                d={`M${lngToX(135)},${latToY(55)}
                   L${lngToX(122)},${latToY(48)}
                   L${lngToX(122)},${latToY(40)}
                   Q${lngToX(120)},${latToY(35)} ${lngToX(121)},${latToY(30)}
                   L${lngToX(110)},${latToY(21)}
                   L${lngToX(108)},${latToY(18)}
                   L${lngToX(98)},${latToY(18)}
                   L${lngToX(92)},${latToY(22)}
                   L${lngToX(78)},${latToY(35)}
                   L${lngToX(73)},${latToY(40)}
                   L${lngToX(80)},${latToY(48)}
                   L${lngToX(87)},${latToY(49)}
                   L${lngToX(96)},${latToY(55)}
                   L${lngToX(135)},${latToY(55)}`}
                fill="none"
                stroke="#3a5070"
                strokeWidth="1.5"
              />

              {/* 朝代疆域 */}
              {activeDynasties.map(d => {
                const x1 = lngToX(d.bounds.west);
                const y1 = latToY(d.bounds.north);
                const x2 = lngToX(d.bounds.east);
                const y2 = latToY(d.bounds.south);
                return (
                  <g key={d.id}>
                    <rect
                      x={x1}
                      y={y1}
                      width={x2 - x1}
                      height={y2 - y1}
                      rx={8}
                      fill={d.color}
                      fillOpacity={0.3}
                      stroke={d.color}
                      strokeWidth={2}
                      strokeOpacity={0.8}
                    />
                    {/* 朝代名标签 */}
                    <text
                      x={x1 + (x2 - x1) / 2}
                      y={y1 + (y2 - y1) / 2}
                      textAnchor="middle"
                      fill={d.color}
                      fontSize={16}
                      fontWeight="bold"
                    >
                      {d.emoji} {d.name}
                    </text>
                    <text
                      x={x1 + (x2 - x1) / 2}
                      y={y1 + (y2 - y1) / 2 + 16}
                      textAnchor="middle"
                      fill={d.color}
                      fontSize={8}
                      opacity={0.6}
                    >
                      {d.areaEstimate}{t('territoryMap.areaUnit')}
                    </text>
                  </g>
                );
              })}

              {/* 标注重要城市 */}
              {/* 北京 */}
              <circle cx={lngToX(116)} cy={latToY(40)} r={3} fill="#d97706" />
              <text x={lngToX(116)} y={latToY(40) - 8} textAnchor="middle" fill="#d97706" fontSize={8}>{t('territoryMap.beijing')}</text>
              {/* 西安 */}
              <circle cx={lngToX(109)} cy={latToY(34)} r={3} fill="#d97706" />
              <text x={lngToX(109)} y={latToY(34) - 8} textAnchor="middle" fill="#d97706" fontSize={8}>{t('territoryMap.changAn')}</text>

              {/* 年份水印 */}
              <text x={MAP_W - 10} y={MAP_H - 10} textAnchor="end" fill="#3a5070" fontSize={24} fontWeight="bold">
                {selectedYear < 0 ? `前${Math.abs(selectedYear)}` : selectedYear}
              </text>
            </svg>
          </div>
        </RevealOnScroll>

        {/* 朝代信息 */}
        {activeDynasties.length > 0 && (
          <RevealOnScroll direction="up">
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeDynasties.map(d => (
                <div key={d.id} className="p-3 rounded-lg border-2" style={{ borderColor: d.color }}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{d.emoji}</span>
                    <span className="font-bold text-lg" style={{ color: d.color }}>{d.name}</span>
                    <span className="text-xs text-ink-400">{d.yearDisplay}</span>
                  </div>
                  <p className="text-sm text-ink-600 dark:text-ink-400 mb-1">{d.description}</p>
                  <div className="text-xs text-ink-500 dark:text-ink-500">
                    {t('territoryMap.area')}：{d.areaEstimate}{t('territoryMap.areaUnit')} · {t('territoryMap.capital')}：{d.capitals.join('、')}
                  </div>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        )}

        {activeDynasties.length === 0 && (
          <div className="mt-4 p-4 text-center text-ink-400">
            {t('territoryMap.noData', { year: formatYear(selectedYear, t) })}
          </div>
        )}

        {/* 疆域事件 */}
        {activeEvents.length > 0 && (
          <div className="mt-4 p-4 bg-amber-50/60 dark:bg-amber-900/10 rounded-lg border-l-4 border-amber-500">
            <h4 className="text-xs font-bold text-amber-700 dark:text-amber-400 mb-2 tracking-widest">
              史 {t('territoryMap.recentEvents')}
            </h4>
            <div className="space-y-1">
              {activeEvents.map(e => (
                <div key={`${e.dynasty}-${e.year}-${e.title}`} className="text-sm">
                  <span className="font-bold">{e.dynasty} · {formatYear(e.year, t)}：</span>
                  <span className="text-ink-600 dark:text-ink-400">{e.title} — {e.description}</span>
                  <span className={`ml-1 text-xs px-1 rounded ${
                    e.type === 'expand' ? 'bg-green-500/10 text-green-700 dark:text-green-400' :
                    e.type === 'shrink' ? 'bg-red-500/10 text-red-700 dark:text-red-400' :
                    'bg-ink-100 text-ink-600'
                  }`}>
                    {e.type === 'expand' ? `↑${t('territoryMap.expand')}` : e.type === 'shrink' ? `↓${t('territoryMap.shrink')}` : `→${t('territoryMap.stable')}`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

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
