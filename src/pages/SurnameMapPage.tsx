/**
 * 姓氏迁徙与族谱地图页面 — SVG 箭头动画展示人口流动和族谱信息
 * @see history-museum/ITERATIONS.md Iteration #71
 *
 * 使用 src/data/features/surnameData.ts 数据
 * 使用 src/components/layout/Navbar.tsx 的路由功能
 */

import { useState, useMemo } from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import { SURNAMES, SURNAMES_BY_INITIAL, SURNAMES_INITIALS, type Surname } from '@/data/features/surnameData';
import { useT } from '@/i18n/i18n';

import './SurnameMapPage.module.css';

export default function SurnameMapPage() {
  const t = useT();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInitial, setSelectedInitial] = useState<string>(SURNAMES_INITIALS[0]);
  const [selectedSurname, setSelectedSurname] = useState<Surname | null>(() =>
    SURNAMES.find(s => s.pinyin.charAt(0).toUpperCase() === selectedInitial) || SURNAMES[0]
  );

  // 过滤姓氏
  const filteredSurnames = useMemo(() => {
    if (!searchQuery) return SURNAMES;
    const q = searchQuery.toLowerCase();
    return SURNAMES.filter(s => 
      s.surname.includes(q) || s.pinyin.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // 分组姓氏（仅用于搜索结果展示）
  const groupedSurnames = useMemo(() => {
    const groups: Record<string, Surname[]> = {};
    filteredSurnames.forEach(s => {
      const initial = s.pinyin.charAt(0).toUpperCase();
      if (!groups[initial]) groups[initial] = [];
      groups[initial].push(s);
    });
    return groups;
  }, [filteredSurnames]);

  // 切换姓氏初始字母
  const handleInitialClick = (initial: string) => {
    setSelectedInitial(initial);
    const surnames = SURNAMES_BY_INITIAL[initial];
    if (surnames.length > 0) {
      setSelectedSurname(surnames[0]);
    }
  };

  const selected = selectedSurname;

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      {/* 标题区 */}
      <SectionHeader
        label="SURNAME"
        title={t('surnameMap.title')}
        description={t('surnameMap.description')}
      />

      <RevealOnScroll>
        {/* 搜索框 */}
        <div className="search-container mb-8">
          <input
            type="text"
            placeholder={t('surnameMap.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        {searchQuery ? (
          /* 搜索结果 */
          <div className="results-container">
            {Object.entries(groupedSurnames).map(([initial, surnames]) => (
              <div key={initial} className="initial-group mb-6">
                <div className="initial-header text-lg font-bold text-ink-800 dark:text-ink-200">
                  {initial} ({surnames.length})
                </div>
                <div className="surname-grid grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mt-2">
                  {surnames.map(surname => (
                    <button
                      key={surname.surname}
                      onClick={() => setSelectedSurname(surname)}
                      className={`surname-card p-3 rounded-xl border-2 transition-all ${
                        selected?.surname === surname.surname
                          ? 'border-accent bg-accent/5'
                          : 'border-ink-200 dark:border-ink-700 hover:border-accent hover:bg-ink-50 dark:hover:bg-ink-800'
                      }`}
                    >
                      <div className="text-2xl font-bold">{surname.surname}</div>
                      <div className="text-xs text-ink-500">{surname.pinyin}</div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* 正常浏览模式 */
          <>
            {/* 姓氏列表（按首字母） */}
            <div className="surname-list mb-10">
              {SURNAMES_INITIALS.map(initial => (
                <div key={initial} className="initial-group mb-6">
                  <div 
                    className={`initial-header text-lg font-bold cursor-pointer transition-colors ${
                      selectedInitial === initial 
                        ? 'text-accent' 
                        : 'text-ink-800 dark:text-ink-200 hover:text-accent'
                    }`}
                    onClick={() => handleInitialClick(initial)}
                  >
                    {initial}
                  </div>
                  <div className="surname-grid grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mt-2">
                    {SURNAMES_BY_INITIAL[initial]?.map(surname => (
                      <button
                        key={surname.surname}
                        onClick={() => setSelectedSurname(surname)}
                        className={`surname-card p-3 rounded-xl border-2 transition-all ${
                          selected?.surname === surname.surname
                            ? 'border-accent bg-accent/5'
                            : 'border-ink-200 dark:border-ink-700 hover:border-accent hover:bg-ink-50 dark:hover:bg-ink-800'
                        }`}
                      >
                        <div className="text-2xl font-bold">{surname.surname}</div>
                        <div className="text-xs text-ink-500">{surname.pinyin}</div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* 姓氏详情卡片 */}
            {selected && (
              <div className="surname-detail mt-8">
                <div className="detail-card p-6 md:p-8 rounded-2xl border-2 border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 shadow-lg">
                  {/* 头部信息 */}
                  <div className="detail-header flex flex-col md:flex-row md:items-center gap-4 mb-6">
                    <div className="seal-stamp text-6xl text-accent">{selected.surname}</div>
                    <div className="detail-info flex-1">
                      <h2 className="text-3xl font-bold text-ink-900 dark:text-ink-100 mb-2">
                        {selected.surname} ({selected.pinyin})
                      </h2>
                      <div className="flex flex-wrap gap-2 text-sm">
                        <span className="px-2 py-1 rounded bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-400">
                          {t('surnameMap.rank')}: {selected.rank}
                        </span>
                        <span className="px-2 py-1 rounded bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-400">
                          {t('surnameMap.populationRank')}: {selected.populationRank}
                        </span>
                        <span className="px-2 py-1 rounded bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-400">
                          {t('surnameMap.population')}: {selected.population.toLocaleString()} {t('surnameMap.wan')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 起源与图腾 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="info-block">
                      <h3 className="text-lg font-bold text-ink-800 dark:text-ink-200 mb-2">
                        📜 {t('surnameMap.origin')}
                      </h3>
                      <p className="text-ink-700 dark:text-ink-300 leading-relaxed">
                        {selected.origin}
                      </p>
                    </div>
                    <div className="info-block">
                      <h3 className="text-lg font-bold text-ink-800 dark:text-ink-200 mb-2">
                        🏮 {t('surnameMap.originPlace')}
                      </h3>
                      <p className="text-ink-700 dark:text-ink-300 leading-relaxed mb-2">
                        {selected.originPlace.name} ({selected.originPeriod})
                      </p>
                      <p className="text-sm text-ink-500">
                        {t('surnameMap.longitude')}: {selected.originPlace.lng}°, {t('surnameMap.latitude')}: {selected.originPlace.lat}°
                      </p>
                    </div>
                    <div className="info-block md:col-span-2">
           

                    </div>
                    <div className="info-block">
                      <h3 className="text-lg font-bold text-ink-800 dark:text-ink-200 mb-2">
                        🏛️ {t('surnameMap.junwang')}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selected.junwang.map((junwang, idx) => (
                          <div key={idx} className="p-3 rounded-lg border border-ink-200 dark:border-ink-700 bg-ink-50 dark:bg-ink-800">
                            <div className="font-bold text-accent mb-1">{junwang.name}</div>
                            <div className="text-sm text-ink-600 dark:text-ink-400">
                              {junwang.location}
                            </div>
                            <div className="text-xs text-ink-500 mt-1">
                              {t('surnameMap.tanghao')}: {junwang.tanghao}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="info-block">
                      <h3 className="text-lg font-bold text-ink-800 dark:text-ink-200 mb-2">
                        🎨 {t('surnameMap.totem')}
                      </h3>
                      <p className="text-ink-700 dark:text-ink-300">{selected.totem}</p>
                    </div>
                    <div className="info-block">
                      <h3 className="text-lg font-bold text-ink-800 dark:text-ink-200 mb-2">
                        📖 {t('surnameMap.history')}
                      </h3>
                      <p className="text-ink-700 dark:text-ink-300">{selected.history}</p>
                    </div>
                  </div>

                  {/* 姓氏迁徙地图（SVG） */}
                  <div className="migration-map-section mb-6">
                    <h3 className="text-lg font-bold text-ink-800 dark:text-ink-200 mb-3">
                      🗺️ {t('surnameMap.migrationTrack')}
                    </h3>
                    <div className="map-container relative bg-ink-50 dark:bg-ink-800 rounded-xl overflow-hidden">
                      <svg
                        viewBox="0 0 800 400"
                        className="w-full h-auto"
                        preserveAspectRatio="xMidYMid meet"
                      >
                        {/* 背景：示意中国地图轮廓（简化） */}
                        <path
                          d="M 100,150 Q 150,100 200,150 T 300,150 Q 350,200 400,150 T 500,150 Q 550,100 600,150 T 700,150 L 700,250 Q 650,300 600,250 T 500,250 Q 450,300 400,250 T 300,250 Q 250,300 200,250 T 100,250 Z"
                          fill="none"
                          stroke="#94a3b8"
                          strokeWidth="1"
                          strokeDasharray="5,5"
                        />

                        {/* 迁徙节点 */}
                        {selected.migration.map((node, idx) => (
                          <g key={idx}>
                            {/* 连接线 */}
                            {idx > 0 && (
                              <line
                                x1={selected.migration[idx-1].lng}
                                y1={selected.migration[idx-1].lat}
                                x2={node.lng}
                                y2={node.lat}
                                stroke="#f59e0b"
                                strokeWidth="2"
                                markerEnd="url(#arrow)"
                              />
                            )}

                            {/* 节点圆点 */}
                            <circle
                              cx={node.lng}
                              cy={node.lat}
                              r="6"
                              fill={idx === 0 ? '#10b981' : idx === selected.migration.length - 1 ? '#ef4444' : '#f59e0b'}
                              stroke="white"
                              strokeWidth="2"
                              className="node-dot"
                            />

                            {/* 节点标签 */}
                            <text
                              x={node.lng}
                              y={node.lat - 12}
                              textAnchor="middle"
                              className="node-label"
                            >
                              {node.name} ({node.period})
                            </text>
                          </g>
                        ))}

                        {/* 箭头标记 */}
                        <defs>
                          <marker
                            id="arrow"
                            markerWidth="10"
                            markerHeight="10"
                            refX="9"
                            refY="3"
                            orient="auto"
                            markerUnits="strokeWidth"
                          >
                            <path d="M0,0 L0,6 L9,3 z" fill="#f59e0b" />
                          </marker>
                        </defs>

                        {/* 图例 */}
                        <g transform="translate(20, 350)">
                          <circle cx="0" cy="0" r="5" fill="#10b981" />
                          <text x="10" y="4" className="map-legend">{t('surnameMap.originLabel')}</text>

                          <circle cx="80" cy="0" r="5" fill="#f59e0b" />
                          <text x="90" y="4" className="map-legend">{t('surnameMap.migrationNode')}</text>

                          <circle cx="180" cy="0" r="5" fill="#ef4444" />
                          <text x="190" y="4" className="map-legend">{t('surnameMap.currentResidence')}</text>
                        </g>
                      </svg>

                      {/* 地图说明 */}
                      <p className="text-xs text-ink-500 mt-2 px-2">
                        ⚠️ {t('surnameMap.mapNote')}
                      </p>
                    </div>
                  </div>

                  {/* 历史名人 */}
                  {selected.figures.length > 0 && (
                    <div className="figures-section">
                      <h3 className="text-lg font-bold text-ink-800 dark:text-ink-200 mb-3">
                        👑 {t('surnameMap.figures')}
                      </h3>
                      <div className="figures-grid grid grid-cols-1 md:grid-cols-3 gap-3">
                        {selected.figures.map((figure, idx) => (
                          <div key={idx} className="figure-card p-4 rounded-lg border border-ink-200 dark:border-ink-700 bg-ink-50 dark:bg-ink-800">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="seal-stamp text-sm w-8 h-8">{figure.name.charAt(0)}</div>
                              <div className="font-bold text-ink-900 dark:text-ink-100">
                                {figure.name}
                              </div>
                            </div>
                            <div className="text-sm text-ink-600 dark:text-ink-400 mb-1">
                              {figure.dynasty}
                            </div>
                            <div className="text-sm text-ink-700 dark:text-ink-300">
                              {figure.achievement}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </RevealOnScroll>
    </div>
  );
}
