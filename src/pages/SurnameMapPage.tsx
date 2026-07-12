/**
 * 姓氏迁徙与族谱地图页面 — SVG 箭头动画展示人口流动和族谱信息
 * @see history-museum/ITERATIONS.md Iteration #71
 *
 * 使用 src/data/features/surnameData.ts 数据
 * 使用 src/components/layout/Navbar.tsx 的路由功能
 */

import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import SurnameMigrationMap from '@/components/map/SurnameMigrationMap';
import { SURNAMES, SURNAMES_BY_INITIAL, SURNAMES_INITIALS, type Surname } from '@/data/features/surnameData';
import { useT } from '@/i18n/i18n';

import './SurnameMapPage.module.css';

type SortBy = 'rank' | 'populationRank' | 'population';

export default function SurnameMapPage() {
  const t = useT();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>('rank');
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

  // 按排序方式分组姓氏（用于正常浏览模式）
  const sortedSurnamesByInitial = useMemo(() => {
    const groups: Record<string, Surname[]> = {};
    Object.entries(SURNAMES_BY_INITIAL).forEach(([initial, list]) => {
      groups[initial] = [...list].sort((a, b) => {
        if (sortBy === 'rank') return a.rank - b.rank;
        if (sortBy === 'populationRank') return a.populationRank - b.populationRank;
        return b.population - a.population;
      });
    });
    return groups;
  }, [sortBy]);

  // 切换姓氏初始字母
  const handleInitialClick = (initial: string) => {
    setSelectedInitial(initial);
    const surnames = sortedSurnamesByInitial[initial];
    if (surnames && surnames.length > 0) {
      setSelectedSurname(surnames[0]);
    }
  };

  const handleSurnameClick = (surname: Surname) => {
    setSelectedSurname(surname);
    navigate(`/surname/${surname.rank}`);
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

      <RevealOnScroll threshold={0.01}>
        {/* 搜索框 */}
        <div className="search-container mb-6">
          <input
            type="text"
            placeholder={t('surnameMap.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        {/* 排序选择器（仅正常浏览模式显示） */}
        {!searchQuery && (
          <div className="sort-container mb-6 flex items-center gap-2 flex-wrap">
            <span className="text-sm text-ink-600 dark:text-ink-400">{t('surnameMap.sortBy')}:</span>
            {(['rank', 'populationRank', 'population'] as SortBy[]).map(mode => (
              <button
                key={mode}
                onClick={() => setSortBy(mode)}
                className={`px-3 py-1 rounded-lg text-sm border transition-all ${
                  sortBy === mode
                    ? 'border-accent bg-accent/10 text-accent font-bold'
                    : 'border-ink-200 dark:border-ink-700 text-ink-600 dark:text-ink-400 hover:border-accent'
                }`}
              >
                {mode === 'rank' && t('surnameMap.sortByRank')}
                {mode === 'populationRank' && t('surnameMap.sortByPopulationRank')}
                {mode === 'population' && t('surnameMap.sortByPopulation')}
              </button>
            ))}
          </div>
        )}

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
                      onClick={() => handleSurnameClick(surname)}
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
                    {sortedSurnamesByInitial[initial]?.map(surname => (
                      <button
                        key={surname.surname}
                        onClick={() => handleSurnameClick(surname)}
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
                        源 {t('surnameMap.origin')}
                      </h3>
                      <p className="text-ink-700 dark:text-ink-300 leading-relaxed">
                        {selected.origin}
                      </p>
                    </div>
                    <div className="info-block">
                      <h3 className="text-lg font-bold text-ink-800 dark:text-ink-200 mb-2">
                        地 {t('surnameMap.originPlace')}
                      </h3>
                      <p className="text-ink-700 dark:text-ink-300 leading-relaxed mb-2">
                        {selected.originPlace.name} ({selected.originPeriod})
                      </p>
                      <p className="text-sm text-ink-500">
                        {t('surnameMap.longitude')}: {selected.originPlace.lng}°, {t('surnameMap.latitude')}: {selected.originPlace.lat}°
                      </p>
                    </div>
                    <div className="info-block">
                      <h3 className="text-lg font-bold text-ink-800 dark:text-ink-200 mb-2">
                        郡 {t('surnameMap.junwang')}
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
                        图 {t('surnameMap.totem')}
                      </h3>
                      <p className="text-ink-700 dark:text-ink-300">{selected.totem}</p>
                    </div>
                    <div className="info-block">
                      <h3 className="text-lg font-bold text-ink-800 dark:text-ink-200 mb-2">
                        史 {t('surnameMap.history')}
                      </h3>
                      <p className="text-ink-700 dark:text-ink-300">{selected.history}</p>
                    </div>
                  </div>

                  {/* 姓氏迁徙地图 */}
                  <div className="migration-map-section mb-6">
                    <h3 className="text-lg font-bold text-ink-800 dark:text-ink-200 mb-3">
                      迁 {t('surnameMap.migrationTrack')}
                    </h3>
                    <div className="map-container relative bg-ink-50 dark:bg-ink-800 rounded-xl overflow-hidden p-2">
                      <SurnameMigrationMap
                        migration={selected.migration}
                        originPlace={selected.originPlace}
                      />
                      <p className="text-xs text-ink-500 mt-2 px-2">
                        注 {t('surnameMap.mapNote')}
                      </p>
                    </div>
                  </div>

                  {/* 历史名人 */}
                  {selected.figures.length > 0 && (
                    <div className="figures-section">
                      <h3 className="text-lg font-bold text-ink-800 dark:text-ink-200 mb-3">
                        贤 {t('surnameMap.figures')}
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

                  {/* 查看完整详情按钮 */}
                  <div className="mt-6 flex justify-center">
                    <button
                      onClick={() => navigate(`/surname/${selected.rank}`)}
                      className="px-6 py-2.5 rounded-lg bg-accent text-white font-bold hover:bg-accent/90 transition-colors shadow-md"
                    >
                      {t('surnameMap.viewDetail')} →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </RevealOnScroll>
    </div>
  );
}
