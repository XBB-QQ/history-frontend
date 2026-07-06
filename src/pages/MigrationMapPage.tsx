/**
 * 历史人口迁徙图页面 — SVG 箭头动画展示人口流动
 * @see history-museum/design/002-innovation-brainstorm.md §20
 */

import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import { MIGRATION_EVENTS, MIGRATION_TYPE_LABELS, type MigrationEvent } from '@/data/features/migrationData';
import { useT } from '@/i18n/i18n';

function formatYear(y: number): string {
  return y < 0 ? `公元前${Math.abs(y)}年` : `公元${y}年`;
}

export default function MigrationMapPage() {
  const t = useT();
  const [selectedId, setSelectedId] = useState<string>(MIGRATION_EVENTS[0].id);
  const [showAll, setShowAll] = useState(false);

  const selectedEvent = MIGRATION_EVENTS.find(e => e.id === selectedId)!;

  // SVG 地图参数（与 TerritoryMapPage 一致）
  const MAP_W = 700;
  const MAP_H = 420;
  const LAT_MIN = -8;   // 扩展到南洋
  const LAT_MAX = 52;
  const LNG_MIN = 95;
  const LNG_MAX = 135;

  function latToY(lat: number): number {
    return MAP_H - (lat - LAT_MIN) / (LAT_MAX - LAT_MIN) * MAP_H;
  }
  function lngToX(lng: number): number {
    return (lng - LNG_MIN) / (LNG_MAX - LNG_MIN) * MAP_W;
  }

  // 贝塞尔曲线路径（弧线效果）
  function getRoutePath(route: MigrationEvent['routes'][0]): string {
    const x1 = lngToX(route.from.lng);
    const y1 = latToY(route.from.lat);
    const x2 = lngToX(route.to.lng);
    const y2 = latToY(route.to.lat);

    if (route.waypoints && route.waypoints.length > 0) {
      // 有途经点：折线
      const points = route.waypoints.map(wp => `${lngToX(wp.lng)},${latToY(wp.lat)}`);
      return `M${x1},${y1} L${points.join(' L')} L${x2},${y2}`;
    }

    // 无途经点：贝塞尔弧线
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    // 控制点偏移（向上凸起）
    const dx = x2 - x1;
    const dy = y2 - y1;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const offset = Math.min(dist * 0.3, 60);
    // 垂直方向偏移
    const cx = mx - dy / dist * offset;
    const cy = my + dx / dist * offset;
    return `M${x1},${y1} Q${cx},${cy} ${x2},${y2}`;
  }

  const visibleEvents = showAll ? MIGRATION_EVENTS : [selectedEvent];

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <RevealOnScroll direction="fade">
          <SectionHeader
            label="MIGRATION MAP"
            title={t('migrationMap.title')}
            description={t('migrationMap.description')}
          />
        </RevealOnScroll>

        {/* 事件选择器 */}
        <RevealOnScroll direction="up" delay={200}>
          <div className="mt-8 flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                showAll
                  ? 'bg-accent text-white shadow-lg'
                  : 'bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-400 hover:bg-accent hover:text-white'
              }`}
            >
              {showAll ? `显 ${t('migrationMap.showingAll')}` : `显 ${t('migrationMap.showAll')}`}
            </button>
            {MIGRATION_EVENTS.map(e => {
              const typeColor = MIGRATION_TYPE_LABELS[e.type].color;
              return (
                <button
                  key={e.id}
                  onClick={() => { setSelectedId(e.id); setShowAll(false); }}
                  className={`px-3 py-2 rounded-lg font-bold text-sm transition-all ${
                    !showAll && selectedId === e.id
                      ? 'text-white shadow-lg'
                      : 'bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-400 hover:opacity-80'
                  }`}
                  style={!showAll && selectedId === e.id ? { background: typeColor } : {}}
                >
                  {e.emoji} {e.title}
                </button>
              );
            })}
          </div>
        </RevealOnScroll>

        {/* SVG 地图 */}
        <RevealOnScroll direction="fade">
          <div className="mt-6 rounded-xl overflow-hidden border border-ink-200 dark:border-ink-700 bg-ink-950">
            <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="w-full">
              {/* 海洋背景 */}
              <rect x={0} y={0} width={MAP_W} height={MAP_H} fill="#0a1628" />

              {/* 经纬网格 */}
              {[100, 105, 110, 115, 120, 125, 130].map(lng => (
                <line key={`lng${lng}`} x1={lngToX(lng)} y1={0} x2={lngToX(lng)} y2={MAP_H} stroke="#1a3050" strokeWidth="1" />
              ))}
              {[-5, 10, 20, 30, 40, 50].map(lat => (
                <line key={`lat${lat}`} x1={0} y1={latToY(lat)} x2={MAP_W} y2={latToY(lat)} stroke="#1a3050" strokeWidth="1" />
              ))}

              {/* 中国海岸线简化 */}
              <path
                d={`M${lngToX(135)},${latToY(48)}
                   L${lngToX(122)},${latToY(48)}
                   L${lngToX(122)},${latToY(40)}
                   Q${lngToX(120)},${latToY(35)} ${lngToX(121)},${latToY(30)}
                   L${lngToX(110)},${latToY(21)}
                   L${lngToX(108)},${latToY(18)}
                   L${lngToX(100)},${latToY(22)}
                   L${lngToX(97)},${latToY(28)}
                   L${lngToX(95)},${latToY(33)}
                   L${lngToX(100)},${latToY(42)}
                   L${lngToX(110)},${latToY(50)}
                   L${lngToX(120)},${latToY(50)}
                   L${lngToX(135)},${latToY(48)}`}
                fill="#0d1f3c"
                stroke="#2a4060"
                strokeWidth="1.5"
              />

              {/* 东南亚轮廓简化 */}
              <path
                d={`M${lngToX(100)},${latToY(15)} L${lngToX(108)},${latToY(12)} L${lngToX(110)},${latToY(5)} L${lngToX(115)},${latToY(-3)} L${lngToX(120)},${latToY(-5)} L${lngToX(125)},${latToY(-8)} L${lngToX(130)},${latToY(-3)} L${lngToX(125)},${latToY(5)} L${lngToX(115)},${latToY(8)} L${lngToX(105)},${latToY(10)} Z`}
                fill="#0d1f3c"
                stroke="#2a4060"
                strokeWidth="1"
                opacity="0.6"
              />

              {/* 迁徙路线 */}
              {visibleEvents.map(event => {
                const typeColor = MIGRATION_TYPE_LABELS[event.type].color;
                const isSelected = event.id === selectedId;
                return (
                  <g key={event.id} opacity={showAll ? 0.7 : 1}>
                    {/* 路线 */}
                    {event.routes.map((route, idx) => {
                      const path = getRoutePath(route);
                      return (
                        <g key={idx}>
                          {/* 静态底线 */}
                          <path
                            d={path}
                            fill="none"
                            stroke={typeColor}
                            strokeWidth={isSelected || showAll ? 2 : 1}
                            strokeOpacity={0.4}
                            strokeDasharray="none"
                          />
                          {/* 动画流动线 */}
                          <path
                            d={path}
                            fill="none"
                            stroke={typeColor}
                            strokeWidth={isSelected || showAll ? 3 : 2}
                            strokeDasharray="8 4"
                            opacity={0.9}
                          >
                            <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="1.5s" repeatCount="indefinite" />
                          </path>

                          {/* 箭头 */}
                          <circle cx={lngToX(route.to.lng)} cy={latToY(route.to.lat)} r="4" fill={typeColor}>
                            <animate attributeName="r" values="3;6;3" dur="2s" repeatCount="indefinite" />
                          </circle>

                          {/* 起点 */}
                          <circle cx={lngToX(route.from.lng)} cy={latToY(route.from.lat)} r="3" fill={typeColor} opacity="0.6" />

                          {/* 起点城市名 */}
                          <text
                            x={lngToX(route.from.lng)}
                            y={latToY(route.from.lat) - 8}
                            textAnchor="middle"
                            fill={typeColor}
                            fontSize="9"
                            opacity="0.8"
                          >
                            {route.from.name}
                          </text>
                          {/* 终点城市名 */}
                          <text
                            x={lngToX(route.to.lng)}
                            y={latToY(route.to.lat) - 8}
                            textAnchor="middle"
                            fill={typeColor}
                            fontSize="9"
                            fontWeight="bold"
                          >
                            {route.to.name}
                          </text>
                        </g>
                      );
                    })}
                  </g>
                );
              })}

              {/* 图例 */}
              <g transform={`translate(${MAP_W - 130}, 20)`}>
                <rect x="0" y="0" width="120" height="100" rx="6" fill="#0d1f3c" stroke="#2a4060" strokeWidth="1" />
                <text x="10" y="16" fill="#7a9fc0" fontSize="9" fontWeight="bold">{t('migrationMap.migrationType')}</text>
                {Object.entries(MIGRATION_TYPE_LABELS).map(([key, val], idx) => (
                  <g key={key} transform={`translate(10, ${28 + idx * 16})`}>
                    <circle cx="0" cy="0" r="3" fill={val.color} />
                    <text x="8" y="3" fill="#7a9fc0" fontSize="8">{val.emoji} {val.label}</text>
                  </g>
                ))}
              </g>

              {/* 标题水印 */}
              <text x={10} y={MAP_H - 10} fill="#3a5070" fontSize="12" fontWeight="bold">
                {showAll ? t('migrationMap.panorama') : `${selectedEvent.title} · ${selectedEvent.yearDisplay}`}
              </text>
            </svg>
          </div>
        </RevealOnScroll>

        {/* 选中事件详情 */}
        {!showAll && (
          <RevealOnScroll direction="up">
            <div className="mt-6 space-y-4">
              {/* 事件头部 */}
              <div className="p-5 rounded-xl border-l-4"
                style={{ borderColor: MIGRATION_TYPE_LABELS[selectedEvent.type].color, background: `${MIGRATION_TYPE_LABELS[selectedEvent.type].color}10` }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{selectedEvent.emoji}</span>
                  <h2 className="text-xl font-bold text-ink-900 dark:text-ink-100">
                    {selectedEvent.title}
                  </h2>
                  <span className="text-sm text-ink-500">{selectedEvent.yearDisplay} · {selectedEvent.dynasty}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full text-white font-bold"
                    style={{ background: MIGRATION_TYPE_LABELS[selectedEvent.type].color }}
                  >
                    {MIGRATION_TYPE_LABELS[selectedEvent.type].emoji} {MIGRATION_TYPE_LABELS[selectedEvent.type].label}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-ink-700 dark:text-ink-300">
                    {t('migrationMap.scale')}：<b className="text-accent">{selectedEvent.scale}{t('migrationMap.wan')}</b>
                  </span>
                  <span className="text-ink-700 dark:text-ink-300">
                    {t('migrationMap.routes')}：<b>{selectedEvent.routes.length}{t('migrationMap.tiao')}</b>
                  </span>
                </div>
              </div>

              {/* 描述 */}
              <div className="p-5 bg-white/70 dark:bg-ink-900/70 rounded-lg border border-ink-200 dark:border-ink-700">
                <h3 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-2 tracking-widest">
                  详 {t('migrationMap.eventDetail')}
                </h3>
                <p className="text-ink-800 dark:text-ink-200 leading-loose">
                  {selectedEvent.description}
                </p>
              </div>

              {/* 原因 */}
              <div className="p-4 bg-red-500/5 dark:bg-red-700/10 rounded-lg border-l-4 border-red-500">
                <h3 className="text-sm font-bold text-red-700 dark:text-red-400 mb-1 tracking-widest">
                  注 {t('migrationMap.cause')}
                </h3>
                <p className="text-ink-800 dark:text-ink-200 text-sm">{selectedEvent.cause}</p>
              </div>

              {/* 影响 */}
              <div className="p-4 bg-green-500/5 dark:bg-green-700/10 rounded-lg border-l-4 border-green-500">
                <h3 className="text-sm font-bold text-green-700 dark:text-green-400 mb-1 tracking-widest">
                  响 {t('migrationMap.impact')}
                </h3>
                <p className="text-ink-800 dark:text-ink-200 text-sm leading-relaxed">{selectedEvent.impact}</p>
              </div>

              {/* 路线详情 */}
              <div className="p-4 bg-ink-50/50 dark:bg-ink-900/30 rounded-lg border border-ink-200 dark:border-ink-700">
                <h3 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-2 tracking-widest">
                  图 {t('migrationMap.migrationRoutes')}
                </h3>
                <div className="space-y-2">
                  {selectedEvent.routes.map((route, idx) => (
                    <div key={idx} className="text-sm flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-ink-900 dark:text-ink-100">{route.from.name}</span>
                      {route.waypoints?.map(wp => (
                        <span key={wp.name} className="text-ink-400 text-xs">→ {wp.name}</span>
                      ))}
                      <span className="text-accent">→</span>
                      <span className="font-bold text-accent">{route.to.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </RevealOnScroll>
        )}

        {/* 全部事件列表 */}
        {showAll && (
          <RevealOnScroll direction="up">
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {MIGRATION_EVENTS.map(e => {
                const typeColor = MIGRATION_TYPE_LABELS[e.type].color;
                return (
                  <button
                    key={e.id}
                    onClick={() => { setSelectedId(e.id); setShowAll(false); }}
                    className="p-4 rounded-lg border-l-4 text-left hover:shadow-lg transition-all"
                    style={{ borderColor: typeColor, background: `${typeColor}08` }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{e.emoji}</span>
                      <span className="font-bold text-ink-900 dark:text-ink-100">{e.title}</span>
                      <span className="text-xs text-ink-400 ml-auto">{e.scale}{t('migrationMap.wan')}</span>
                    </div>
                    <div className="text-xs text-ink-500 dark:text-ink-400 mb-1">
                      {e.yearDisplay} · {e.dynasty}
                    </div>
                    <div className="text-xs text-ink-600 dark:text-ink-400 line-clamp-2">
                      {e.description.slice(0, 50)}…
                    </div>
                  </button>
                );
              })}
            </div>
          </RevealOnScroll>
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
