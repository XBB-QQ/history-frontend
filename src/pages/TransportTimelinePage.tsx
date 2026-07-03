import { useState, useMemo } from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import {
  TRANSPORT_ROUTES,
  TRANSPORT_ERAS,
  getRouteById,
  getEraById,
  sortErasByTimeline
} from '@/data/features/transportData';

const TransportTimelinePage = () => {
  const [selectedEra, setSelectedEra] = useState<string>('all');
  const [selectedRoute, setSelectedRoute] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<any>(null);

  const sortedEras = useMemo(() => sortErasByTimeline(TRANSPORT_ERAS), []);

  const eraOptions = [
    { value: 'all', label: '全部朝代' },
    ...sortedEras.map(era => ({
      value: era.id,
      label: `${era.dynasty} (${era.era})`,
      years: era.era
    }))
  ];

  const routeOptions = [
    { value: 'all', label: '全部路线' },
    ...TRANSPORT_ROUTES.map(route => ({
      value: route.id,
      label: route.name,
      start: route.start,
      end: route.end
    }))
  ];

  const handleEraClick = (era: any) => {
    setSelectedData({ type: 'era', data: era });
    setIsModalOpen(true);
  };

  const handleRouteClick = (route: any) => {
    setSelectedData({ type: 'route', data: route });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedData(null), 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-amber-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 dark:from-orange-900 dark:via-amber-900 dark:to-yellow-900 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4 tracking-tight">古代交通时间地图</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            从驼铃声到高铁飞驰，探索中国古人的交通智慧
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <RevealOnScroll>
        <div className="max-w-6xl mx-auto px-4 -mt-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 space-y-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  🏛️ 朝代时期
                </label>
                <select
                  value={selectedEra}
                  onChange={(e) => setSelectedEra(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  {eraOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  🛣️ 交通路线
                </label>
                <select
                  value={selectedRoute}
                  onChange={(e) => setSelectedRoute(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  {routeOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {selectedEra !== 'all' && (
              <div className="text-sm text-gray-600 dark:text-gray-400 pt-2">
                显示 {sortedEras.find(e => e.id === selectedEra)?.dynasty} 年代交通发展
              </div>
            )}

            {selectedRoute !== 'all' && (
              <div className="text-sm text-gray-600 dark:text-gray-400 pt-2">
                路线: {routeOptions.find(r => r.value === selectedRoute)?.label}
              </div>
            )}
          </div>
        </div>
      </RevealOnScroll>

      {/* Major Routes Section */}
      <RevealOnScroll>
        <div className="max-w-6xl mx-auto px-4 py-12">
          <SectionHeader title="🛣️ 重要交通路线" subtitle="连接中华文明的生命线" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TRANSPORT_ROUTES.slice(0, 6).map((route) => (
              <RouteCard
                key={route.id}
                route={route}
                onClick={() => handleRouteClick(route)}
              />
            ))}
          </div>
        </div>
      </RevealOnScroll>

      {/* Transportation Eras Timeline */}
      <RevealOnScroll>
        <div className="max-w-6xl mx-auto px-4 pb-16">
          <SectionHeader
            title="📊 交通发展时间线"
            subtitle="从商代到清代的交通演变"
          />

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 via-amber-500 to-yellow-500 rounded-full hidden md:block"></div>

            <div className="space-y-8">
              {sortedEras.map((era, index) => (
                <EraTimelineCard
                  key={era.id}
                  era={era}
                  index={index}
                  isEven={index % 2 === 0}
                  onClick={() => handleEraClick(era)}
                />
              ))}
            </div>
          </div>
        </div>
      </RevealOnScroll>

      {/* Route Detail Modal */}
      {isModalOpen && selectedData && (
        <TransportDetailModal
          data={selectedData}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

interface RouteCardProps {
  route: any;
  onClick: (route: any) => void;
}

const RouteCard = ({ route, onClick }: RouteCardProps) => {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all transform hover:scale-105"
      onClick={() => onClick(route)}
    >
      <div className="text-4xl mb-3">🛣️</div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{route.name}</h3>
      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-3">
        <span>🏛️ {route.start}</span>
        <span>→</span>
        <span>🏛️ {route.end}</span>
      </div>
      <div className="flex flex-wrap gap-2 mb-3">
        {route.keyStops.slice(0, 3).map(stop => (
          <span key={stop} className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 rounded text-xs">
            {stop}
          </span>
        ))}
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
        {route.description}
      </p>
      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
        <span className="text-xs text-gray-500 dark:text-gray-500">
          ⏰ {route.timeline}
        </span>
      </div>
    </div>
  );
};

interface EraTimelineCardProps {
  era: any;
  index: number;
  isEven: boolean;
  onClick: (era: any) => void;
}

const EraTimelineCard = ({ era, index, isEven, onClick }: EraTimelineCardProps) => {
  return (
    <div
      className={`flex items-start gap-4 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Timeline Node */}
      <div className="flex-shrink-0 z-10">
        <div className="w-4 h-4 bg-orange-500 rounded-full border-4 border-white dark:border-gray-800 shadow-lg"></div>
      </div>

      {/* Content */}
      <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
        <div
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer transform hover:scale-105"
          onClick={() => onClick(era)}
        >
          <div className="text-3xl mb-3">🚗</div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {era.dynasty}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {era.era}
          </p>

          <div className="space-y-2">
            <div>
              <span className="text-xs font-medium text-orange-600 dark:text-orange-400">交通工具:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {era.transportation.methods.slice(0, 2).map(m => (
                  <span key={m} className="px-2 py-0.5 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 rounded text-xs">
                    {m}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-medium text-orange-600 dark:text-orange-400">基础设施:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {era.transportation.infrastructure.slice(0, 2).map(i => (
                  <span key={i} className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded text-xs">
                    {i}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {era.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface TransportDetailModalProps {
  data: any;
  onClose: () => void;
}

const TransportDetailModal = ({ data, onClose }: TransportDetailModalProps) => {
  const isRoute = data.type === 'route';
  const item = data.data;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-8 rounded-t-3xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white text-3xl"
          >
            ✕
          </button>

          <div className="flex items-center gap-4">
            <div className="text-6xl">
              {isRoute ? '🛣️' : '🚗'}
            </div>

            <div>
              <h2 className="text-4xl font-bold text-white mb-2">{item.name}</h2>
              <p className="text-white/90">
                {isRoute ? '交通路线' : '交通发展'}
              </p>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Description */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              📝 {isRoute ? '路线简介' : '年代介绍'}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Route Details */}
          {isRoute && (
            <>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-6">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                    起点 → 终点
                  </h4>
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                    {item.start} → {item.end}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.distance}
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-6">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                    通行时间
                  </h4>
                  <div className="text-2xl font-bold text-amber-600 dark:text-amber-400 mb-2">
                    {item.duration}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    主要交通方式: {item.mainMethod}
                  </p>
                </div>
              </div>

              {/* Key Stops */}
              <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-6">
                <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                  📍 主要站点
                </h4>
                <div className="flex flex-wrap gap-2">
                  {item.keyStops.map((stop: string, i: number) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 rounded-full text-sm"
                    >
                      {stop}
                    </span>
                  ))}
                </div>
              </div>

              {/* Historical Significance */}
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                  📜 历史意义
                </h4>
                <p className="text-gray-700 dark:text-gray-300">
                  {item.historicalSignificance}
                </p>
              </div>

              {/* Timeline */}
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl p-6">
                <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                  ⏰ 时间线
                </h4>
                <p className="text-lg text-orange-700 dark:text-orange-300 font-semibold">
                  {item.timeline}
                </p>
              </div>
            </>
          )}

          {/* Era Details */}
          {!isRoute && (
            <>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-6">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                    🚗 交通方式
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {item.transportation.methods.map((m: string, i: number) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 rounded text-xs"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-6">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                    🏗️ 基础设施
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {item.transportation.infrastructure.map((i: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded text-xs"
                      >
                        {i}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Notable Events */}
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                  🎉 重要事件
                </h4>
                <ul className="space-y-2">
                  {item.notableEvents.map((event: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                      <span className="text-orange-500">▸</span>
                      <span>{event}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cultural Impact */}
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                  🌟 文化影响
                </h4>
                <p className="text-gray-700 dark:text-gray-300">
                  {item.culturalImpact}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransportTimelinePage;
