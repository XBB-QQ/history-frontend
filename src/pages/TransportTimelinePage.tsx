/**
 * 古代交通时间地图 — 路径引擎增强版
 * @see ITERATIONS.md #72, #93
 *
 * 原有静态展示 + Dijkstra 路径查找 + 多朝代天数对比
 */

import { useState, useMemo } from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import {
  TRANSPORT_ROUTES,
  TRANSPORT_ERAS,
  TRANSPORT_GRAPH,
  ALL_CITIES,
  DYNASTY_SPEED_FACTORS,
  sortErasByTimeline,
  type TransportRoute,
  type TransportEra,
  type CityNode,
} from '@/data/features/transportData';
import { findShortestPath, compareDynasties, findReachableCities, type PathResult } from '@/utils/routeFinder';
import { useT } from '@/i18n/i18n';

const ALL_DYNASTIES = ['商', '周', '秦', '汉', '唐', '宋', '元', '明', '清'];
// 修复 bug：ALL_CITIES 是 {中文name: 拼音id} 映射，原 Object.values 取到拼音 id，
// 导致下拉框显示拼音且 findShortestPath(ALL_CITIES[startCity]) 查找失败。改用 Object.keys 取中文 name。
const CITY_NAMES = Object.keys(ALL_CITIES);

const TransportTimelinePage = () => {
  const t = useT();
  const [selectedEra, setSelectedEra] = useState<string>('all');
  const [selectedRoute, setSelectedRoute] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<{ type: 'era' | 'route'; data: TransportEra | TransportRoute } | null>(null);

  // 路径查找状态
  const [startCity, setStartCity] = useState('');
  const [endCity, setEndCity] = useState('');
  const [selectedDynasty, setSelectedDynasty] = useState('汉');
  const [pathResult, setPathResult] = useState<PathResult | null>(null);
  const [dynastyComparison, setDynastyComparison] = useState<PathResult[]>([]);
  const [reachableCities, setReachableCities] = useState<Array<{ city: string; days: number; distanceKm: number }>>([]);

  const sortedEras = useMemo(() => sortErasByTimeline(TRANSPORT_ERAS), []);

  const eraOptions = [
    { value: 'all', label: t('transportTimeline.all_era') },
    ...sortedEras.map(era => ({
      value: era.id,
      label: `${era.dynasty} (${era.era})`,
    })),
  ];

  const routeOptions = [
    { value: 'all', label: t('transportTimeline.all_route') },
    ...TRANSPORT_ROUTES.map(route => ({
      value: route.id,
      label: route.name,
      start: route.start,
      end: route.end,
    })),
  ];

  const handleEraClick = (era: TransportEra) => {
    setSelectedData({ type: 'era', data: era });
    setIsModalOpen(true);
  };

  const handleRouteClick = (route: TransportRoute) => {
    setSelectedData({ type: 'route', data: route });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedData(null), 300);
  };

  /* 路径查找 */
  const handleFindPath = () => {
    if (!startCity || !endCity) {
      alert(t('transportTimeline.alert_select_cities'));
      return;
    }
    if (startCity === endCity) {
      alert(t('transportTimeline.alert_same_city'));
      return;
    }
    const result = findShortestPath(TRANSPORT_GRAPH, startCity, endCity, selectedDynasty);
    setPathResult(result);
  };

  /* 多朝代对比 */
  const handleCompareDynasties = () => {
    if (!startCity || !endCity) {
      alert(t('transportTimeline.alert_select_cities'));
      return;
    }
    const results = compareDynasties(startCity, endCity, ALL_DYNASTIES);
    setDynastyComparison(results);
  };

  /* 可达城市 */
  const handleFindReachable = () => {
    if (!startCity) {
      alert(t('transportTimeline.alert_select_start'));
      return;
    }
    const results = findReachableCities(startCity, 30, selectedDynasty);
    setReachableCities(results);
  };

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 头部 */}
        <RevealOnScroll>
          <SectionHeader
            label={t('transportTimeline.label')}
            title={t('transportTimeline.title')}
            description={t('transportTimeline.description')}
          />
        </RevealOnScroll>

        {/* 筛选 */}
        <RevealOnScroll delay={100}>
          <div className="bg-white dark:bg-ink-900 rounded-2xl border-2 border-ink-200 dark:border-ink-700 p-6 shadow-lg mb-8">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-ink-600 dark:text-ink-400 mb-2">{t('transportTimeline.era_label')}</label>
                <select
                  value={selectedEra}
                  onChange={(e) => setSelectedEra(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-ink-200 dark:border-ink-700 bg-ink-50 dark:bg-ink-800"
                >
                  {eraOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-ink-600 dark:text-ink-400 mb-2">{t('transportTimeline.route_label')}</label>
                <select
                  value={selectedRoute}
                  onChange={(e) => setSelectedRoute(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-ink-200 dark:border-ink-700 bg-ink-50 dark:bg-ink-800"
                >
                  {routeOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* AI 路径引擎 */}
        <RevealOnScroll delay={200}>
          <div className="bg-gradient-to-br from-paper to-ink-50 dark:from-ink-900 dark:to-ink-800 rounded-2xl border-2 border-ink-200 dark:border-ink-700 p-6 md:p-8 shadow-lg mb-8">
            <h3 className="text-xl font-bold text-ink-900 dark:text-ink-100 mb-6 flex items-center gap-2">
              {t('transportTimeline.path_engine_title')}
            </h3>

            {/* 输入区 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-ink-600 dark:text-ink-400 mb-1">{t('transportTimeline.start_label')}</label>
                <select
                  value={startCity}
                  onChange={(e) => setStartCity(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-800"
                >
                  <option value="">{t('transportTimeline.start_placeholder')}</option>
                  {CITY_NAMES.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-ink-600 dark:text-ink-400 mb-1">{t('transportTimeline.end_label')}</label>
                <select
                  value={endCity}
                  onChange={(e) => setEndCity(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-800"
                >
                  <option value="">{t('transportTimeline.end_placeholder')}</option>
                  {CITY_NAMES.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-ink-600 dark:text-ink-400 mb-1">{t('transportTimeline.dynasty_label')}</label>
                <select
                  value={selectedDynasty}
                  onChange={(e) => setSelectedDynasty(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-800"
                >
                  {ALL_DYNASTIES.map(d => (
                    <option key={d} value={d}>{t('transportTimeline.dynasty_option', { dynasty: d, factor: DYNASTY_SPEED_FACTORS[d] })}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-end gap-2">
                <button
                  onClick={handleFindPath}
                  disabled={!startCity || !endCity}
                  className="flex-1 px-4 py-2 rounded-lg bg-accent text-white font-bold hover:bg-accent/90 disabled:opacity-50"
                >
                  {t('transportTimeline.find_path')}
                </button>
                <button
                  onClick={handleCompareDynasties}
                  disabled={!startCity || !endCity}
                  className="px-4 py-2 rounded-lg bg-indigo-500 text-white font-bold hover:bg-indigo-600 disabled:opacity-50"
                >
                  {t('transportTimeline.compare')}
                </button>
              </div>
            </div>

            {/* 路径结果 */}
            {pathResult && (
              <div className="p-4 rounded-xl bg-white dark:bg-ink-900 border-2 border-accent/30 mb-4">
                <h4 className="font-bold text-accent mb-3">{t('transportTimeline.shortest_path', { dynasty: selectedDynasty })}</h4>
                <TransportPathMap route={pathResult.route} nodes={TRANSPORT_GRAPH.nodes} />
                <div className="grid grid-cols-3 gap-3 mt-3">
                  <div className="text-sm">
                    <span className="text-ink-500">{t('transportTimeline.duration_label')}</span>
                    <span className="font-bold text-ink-900 dark:text-ink-100 ml-1">{t('transportTimeline.duration_value', { days: pathResult.totalDays })}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-ink-500">{t('transportTimeline.distance_label')}</span>
                    <span className="font-bold text-ink-900 dark:text-ink-100 ml-1">{t('transportTimeline.distance_value', { km: pathResult.totalDistanceKm })}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-ink-500">{t('transportTimeline.speed_factor_label')}</span>
                    <span className="font-bold text-ink-900 dark:text-ink-100 ml-1">{pathResult.speedFactor}</span>
                  </div>
                </div>
              </div>
            )}

            {/* 多朝代对比 */}
            {dynastyComparison.length > 0 && (
              <div className="p-4 rounded-xl bg-white dark:bg-ink-900 border-2 border-indigo-200 dark:border-indigo-800 mb-4">
                <h4 className="font-bold text-indigo-700 dark:text-indigo-400 mb-3">{t('transportTimeline.comparison_title')}</h4>
                <div className="space-y-2">
                  {dynastyComparison.map((r, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="w-12 text-sm font-bold text-ink-700 dark:text-ink-300">{r.dynasty}</span>
                      <div className="flex-1 bg-ink-200 dark:bg-ink-700 rounded-full h-4">
                        <div
                          className="h-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-end pr-2"
                          style={{ width: `${Math.min(100, (r.totalDays / dynastyComparison[0].totalDays) * 100)}%` }}
                        >
                          <span className="text-xs text-white font-bold">{t('transportTimeline.comparison_days', { days: r.totalDays })}</span>
                        </div>
                      </div>
                      <span className="text-xs text-ink-500 w-20 text-right">{r.totalDistanceKm}km</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 可达城市 */}
            <div className="mt-4">
              <button
                onClick={handleFindReachable}
                disabled={!startCity}
                className="px-4 py-2 rounded-lg bg-green-500 text-white font-bold hover:bg-green-600 disabled:opacity-50"
              >
                {t('transportTimeline.reachable_btn')}
              </button>
            </div>
            {reachableCities.length > 0 && (
              <div className="mt-3 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800">
                <h4 className="font-bold text-green-800 dark:text-green-400 mb-2">
                  {t('transportTimeline.reachable_title', { city: startCity, dynasty: selectedDynasty })}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {reachableCities.map((c, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-sm">
                      {t('transportTimeline.reachable_item', { city: c.city, days: c.days, km: c.distanceKm })}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </RevealOnScroll>

        {/* 重要交通路线 */}
        <RevealOnScroll>
          <div className="mb-12">
            <SectionHeader label={t('transportTimeline.routes_label')} title={t('transportTimeline.routes_title')} description={t('transportTimeline.routes_desc')} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {TRANSPORT_ROUTES.slice(0, 6).map(route => (
                <RouteCard
                  key={route.id}
                  route={route}
                  onClick={() => handleRouteClick(route)}
                />
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* 交通发展时间线 */}
        <RevealOnScroll>
          <div className="mb-12">
            <SectionHeader label={t('transportTimeline.timeline_label')} title={t('transportTimeline.timeline_title')} description={t('transportTimeline.timeline_desc')} />
            <div className="relative mt-6">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 via-amber-500 to-yellow-500 rounded-full hidden md:block" />
              <div className="space-y-8">
                {sortedEras.map((era, idx) => (
                  <EraTimelineCard
                    key={era.id}
                    era={era}
                    index={idx}
                    isEven={idx % 2 === 0}
                    onClick={() => handleEraClick(era)}
                  />
                ))}
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Modal */}
        {isModalOpen && selectedData && (
          <TransportDetailModal data={selectedData} onClose={closeModal} />
        )}
      </div>
    </div>
  );
};

/* ─── 组件 ─── */

function RouteCard({ route, onClick }: { route: TransportRoute; onClick: () => void }) {
  return (
    <div
      className="bg-white dark:bg-ink-900 rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all transform hover:scale-105 border border-ink-200 dark:border-ink-700"
      onClick={onClick}
    >
      <div className="text-4xl mb-3 font-bold text-orange-600 dark:text-orange-400">路</div>
      <h3 className="text-xl font-bold text-ink-900 dark:text-ink-100 mb-2">{route.name}</h3>
      <div className="flex items-center justify-between text-sm text-ink-600 dark:text-ink-400 mb-3">
        <span>{route.start}</span>
        <span>→</span>
        <span>{route.end}</span>
      </div>
      <div className="flex flex-wrap gap-2 mb-3">
        {route.keyStops.slice(0, 3).map(stop => (
          <span key={stop} className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 rounded text-xs">
            {stop}
          </span>
        ))}
      </div>
      <p className="text-sm text-ink-600 dark:text-ink-400 line-clamp-2">{route.description}</p>
      <div className="mt-3 pt-3 border-t border-ink-200 dark:border-ink-700">
        <span className="text-xs text-ink-500">{route.timeline}</span>
      </div>
    </div>
  );
}

function EraTimelineCard({ era, isEven, onClick }: {
  era: TransportEra;
  index: number;
  isEven: boolean;
  onClick: () => void;
}) {
  const t = useT();
  return (
    <div className={`flex items-start gap-4 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
      <div className="flex-shrink-0 z-10">
        <div className="w-4 h-4 bg-orange-500 rounded-full border-4 border-white dark:border-ink-950 shadow-lg" />
      </div>
      <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
        <div
          className="bg-white dark:bg-ink-900 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer transform hover:scale-105 border border-ink-200 dark:border-ink-700"
          onClick={onClick}
        >
          <div className="text-3xl mb-3 font-bold text-orange-600 dark:text-orange-400">行</div>
          <h3 className="text-xl font-bold text-ink-900 dark:text-ink-100 mb-2">{era.dynasty}</h3>
          <p className="text-sm text-ink-600 dark:text-ink-400 mb-3">{era.era}</p>
          <div className="space-y-2">
            <div>
              <span className="text-xs font-medium text-orange-600 dark:text-orange-400">{t('transportTimeline.transport_methods_label')}</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {era.transportation.methods.slice(0, 3).map(m => (
                  <span key={m} className="px-2 py-0.5 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 rounded text-xs">
                    {m}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="text-xs font-medium text-orange-600 dark:text-orange-400">{t('transportTimeline.infrastructure_label')}</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {era.transportation.infrastructure.slice(0, 3).map(i => (
                  <span key={i} className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded text-xs">
                    {i}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-ink-200 dark:border-ink-700">
            <p className="text-sm text-ink-700 dark:text-ink-300">{era.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TransportDetailModal({ data, onClose }: {
  data: { type: 'era' | 'route'; data: TransportEra | TransportRoute };
  onClose: () => void;
}) {
  const t = useT();
  const isRoute = data.type === 'route';
  const item = data.data as TransportRoute | TransportEra;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-ink-900 rounded-3xl shadow-2xl max-w-3xl w-full my-8 border border-ink-200 dark:border-ink-700">
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-8 rounded-t-3xl">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white text-3xl">✕</button>
          <div className="flex items-center gap-4">
            <div className="text-6xl font-bold">{isRoute ? '路' : '行'}</div>
            <div>
              <h2 className="text-4xl font-bold text-white mb-2">{(item as TransportRoute).name || (item as TransportEra).dynasty}</h2>
              <p className="text-white/90">{isRoute ? t('transportTimeline.route_card_title') : t('transportTimeline.era_card_title')}</p>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-6">
          <p className="text-ink-700 dark:text-ink-300 leading-relaxed">{(item as TransportRoute | TransportEra).description}</p>

          {isRoute && (() => {
            const r = item as TransportRoute;
            return (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-ink-50 dark:bg-ink-800 rounded-xl p-4">
                    <h4 className="font-bold text-ink-900 dark:text-ink-100 mb-2">{t('transportTimeline.start_end_title')}</h4>
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{r.start} → {r.end}</div>
                    <p className="text-sm text-ink-500">{r.distance}</p>
                  </div>
                  <div className="bg-ink-50 dark:bg-ink-800 rounded-xl p-4">
                    <h4 className="font-bold text-ink-900 dark:text-ink-100 mb-2">{t('transportTimeline.duration_title')}</h4>
                    <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">{r.duration}</div>
                    <p className="text-sm text-ink-500">{r.mainMethod}</p>
                  </div>
                </div>
                <div className="bg-ink-50 dark:bg-ink-800 rounded-xl p-4">
                  <h4 className="font-bold text-ink-900 dark:text-ink-100 mb-2">{t('transportTimeline.key_stops_title')}</h4>
                  <div className="flex flex-wrap gap-2">
                    {r.keyStops.map((stop, i) => (
                      <span key={i} className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 rounded-full text-sm">{stop}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl p-4">
                  <h4 className="font-bold text-ink-900 dark:text-ink-100 mb-2">{t('transportTimeline.timeline_card_title')}</h4>
                  <p className="text-lg text-orange-700 dark:text-orange-300 font-semibold">{r.timeline}</p>
                </div>
              </>
            );
          })()}

          {!isRoute && (() => {
            const e = item as TransportEra;
            return (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-ink-50 dark:bg-ink-800 rounded-xl p-4">
                    <h4 className="font-bold text-ink-900 dark:text-ink-100 mb-2">{t('transportTimeline.methods_title')}</h4>
                    <div className="flex flex-wrap gap-1">
                      {e.transportation.methods.map((m, i) => (
                        <span key={i} className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 rounded text-xs">{m}</span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-ink-50 dark:bg-ink-800 rounded-xl p-4">
                    <h4 className="font-bold text-ink-900 dark:text-ink-100 mb-2">{t('transportTimeline.infrastructure_title')}</h4>
                    <div className="flex flex-wrap gap-1">
                      {e.transportation.infrastructure.map((i, idx) => (
                        <span key={idx} className="px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded text-xs">{i}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-ink-900 dark:text-ink-100 mb-2">{t('transportTimeline.events_title')}</h4>
                  <ul className="space-y-2">
                    {e.notableEvents.map((ev, i) => (
                      <li key={i} className="flex items-start gap-2 text-ink-700 dark:text-ink-300">
                        <span className="text-orange-500">▸</span>
                        <span>{ev}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            );
          })()}
        </div>
      </div>
    </div>
  );
}

/**
 * 路径地图：简化欧亚大陆网格 + 城市点按真实经纬度定位 + 路径折线
 * 不画地图轮廓（避免依赖复杂的 path 数据），用网格背景体现"地图"视觉
 */
function TransportPathMap({ route, nodes }: { route: string[]; nodes: CityNode[] }) {
  // 经纬度范围（覆盖欧亚大陆：经度 -10 到 140，纬度 20 到 60）
  const LNG_MIN = -10, LNG_MAX = 140;
  const LAT_MIN = 20, LAT_MAX = 60;
  const W = 1000, H = 400;

  const lngLatToXY = (lng: number, lat: number) => ({
    x: ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * W,
    y: ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * H,
  });

  // 找出路径中的节点（按 route 顺序）
  const routeNodes = route
    .map(name => nodes.find(n => n.name === name))
    .filter(Boolean) as CityNode[];

  if (routeNodes.length === 0) return null;

  // 生成路径折线 d 属性
  const pathD = routeNodes
    .map((n, i) => {
      const { x, y } = lngLatToXY(n.lng, n.lat);
      return `${i === 0 ? 'M' : 'L'}${x},${y}`;
    })
    .join(' ');

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-auto rounded-lg bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700"
      style={{ aspectRatio: `${W} / ${H}` }}
    >
      <defs>
        <pattern id="transport-grid" width="50" height="40" patternUnits="userSpaceOnUse">
          <path d="M 50 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
        </pattern>
      </defs>
      <rect width={W} height={H} fill="url(#transport-grid)" className="text-ink-400" />

      {/* 路径折线（红色虚线） */}
      <path
        d={pathD}
        fill="none"
        stroke="#dc2626"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeDasharray="6 3"
      />

      {/* 城市点 + 标签 */}
      {routeNodes.map((node, i) => {
        const { x, y } = lngLatToXY(node.lng, node.lat);
        const isStart = i === 0;
        const isEnd = i === routeNodes.length - 1;
        const color = isStart ? '#16a34a' : isEnd ? '#dc2626' : '#fbbf24';
        const r = isStart || isEnd ? 7 : 5;
        // 标签交替放在点的上方/下方，避免相邻城市重叠
        const labelDy = i % 2 === 0 ? -8 : 16;
        return (
          <g key={node.id}>
            <circle cx={x} cy={y} r={r} fill={color} stroke="white" strokeWidth="2" />
            <text
              x={x + 10}
              y={y + labelDy}
              fontSize="13"
              fontWeight="bold"
              fill="currentColor"
              className="text-ink-900 dark:text-ink-100"
            >
              {node.name}
              {isStart && <tspan fill="#16a34a" fontSize="10"> 起</tspan>}
              {isEnd && <tspan fill="#dc2626" fontSize="10"> 终</tspan>}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default TransportTimelinePage;
