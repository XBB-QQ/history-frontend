/**
 * 历史瘟疫与文明
 * @see history-museum/ITERATIONS.md Iteration #69
 *
 * 展示中国历史上的重大瘟疫及其影响
 */

import { useState, useMemo } from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import { PLAGUE_EPIDEMICS, PLAGUES_BY_DYNASTY, HIGH_IMPACT_PLAGUES, MEDIUM_IMPACT_PLAGUES, LOW_IMPACT_PLAGUES } from '@/data/features/plagueData';
import { useT } from '@/i18n/i18n';

export default function PlagueHistoryPage() {
  const t = useT();
  const [selectedDynasty, setSelectedDynasty] = useState<string>('全部');
  const [selectedType, setSelectedType] = useState<string>('全部');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPlague, setSelectedPlague] = useState<any | null>(null);

  const allDynasties = useMemo(() => {
    const dynasties = ['全部', ...Object.keys(PLAGUES_BY_DYNASTY)];
    return dynasties.sort();
  }, []);

  const filteredPlagues = useMemo(() => {
    return PLAGUE_EPIDEMICS.filter(plague => {
      const matchDynasty = selectedDynasty === '全部' || plague.dynasty === selectedDynasty;
      const matchType = selectedType === '全部' ||
        (selectedType === 'high' && plague.casualties && parseInt(plague.casualties) > 1000000) ||
        (selectedType === 'medium' && plague.casualties && parseInt(plague.casualties) >= 100000 && parseInt(plague.casualties) <= 1000000) ||
        (selectedType === 'low' && (!plague.casualties || parseInt(plague.casualties) < 100000));
      const matchSearch = searchQuery === '' ||
        plague.name.includes(searchQuery) ||
        plague.dynasty.includes(searchQuery) ||
        plague.location.includes(searchQuery);
      return matchDynasty && matchType && matchSearch;
    }).sort((a, b) => {
      // 按年份排序
      if (a.year && b.year) {
        return parseInt(a.year) - parseInt(b.year);
      }
      return 0;
    });
  }, [selectedDynasty, selectedType, searchQuery]);

  const getImpactBadge = (plague: any) => {
    if (plague.casualties && parseInt(plague.casualties) > 1000000) {
      return <span className="badge-high">{t('plagueHistory.badge_high')}</span>;
    } else if (plague.casualties && parseInt(plague.casualties) >= 100000) {
      return <span className="badge-medium">{t('plagueHistory.badge_medium')}</span>;
    } else {
      return <span className="badge-low">{t('plagueHistory.badge_low')}</span>;
    }
  };

  const getImpactColor = (plague: any) => {
    if (plague.casualties && parseInt(plague.casualties) > 1000000) {
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
    } else if (plague.casualties && parseInt(plague.casualties) >= 100000) {
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
    } else {
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    }
  };

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <SectionHeader
        label={t('plagueHistory.label')}
        title={t('plagueHistory.title')}
        description={t('plagueHistory.description')}
      />

      <RevealOnScroll>
        <div className="plague-container max-w-6xl mx-auto">
          {/* 筛选栏 */}
          <div className="filter-bar p-4 md:p-6 rounded-xl border-2 border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 shadow-lg mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-bold text-ink-700 dark:text-ink-300 mb-2">
                  {t('plagueHistory.search_label')}
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('plagueHistory.search_placeholder')}
                  className="input-field w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-ink-700 dark:text-ink-300 mb-2">
                  {t('plagueHistory.select_dynasty')}
                </label>
                <select
                  value={selectedDynasty}
                  onChange={(e) => setSelectedDynasty(e.target.value)}
                  className="input-field w-full"
                >
                  {allDynasties.map(dynasty => (
                    <option key={dynasty} value={dynasty}>
                      {dynasty}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-ink-700 dark:text-ink-300 mb-2">
                  {t('plagueHistory.plague_level')}
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="input-field w-full"
                >
                  <option value="全部">{t('plagueHistory.all_level')}</option>
                  <option value="high">{t('plagueHistory.level_high')}</option>
                  <option value="medium">{t('plagueHistory.level_medium')}</option>
                  <option value="low">{t('plagueHistory.level_low')}</option>
                </select>
              </div>
            </div>
          </div>

          {/* 统计信息 */}
          <div className="stats-bar p-4 rounded-xl border-2 border-ink-200 dark:border-ink-700 bg-ink-50 dark:bg-ink-800 mb-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-ink-900 dark:text-ink-100">
                  {PLAGUE_EPIDEMICS.length}
                </div>
                <div className="text-xs text-ink-500">{t('plagueHistory.recorded_plagues')}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {HIGH_IMPACT_PLAGUES.length}
                </div>
                <div className="text-xs text-ink-500">{t('plagueHistory.high_plagues')}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {MEDIUM_IMPACT_PLAGUES.length}
                </div>
                <div className="text-xs text-ink-500">{t('plagueHistory.medium_plagues')}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {LOW_IMPACT_PLAGUES.length}
                </div>
                <div className="text-xs text-ink-500">{t('plagueHistory.low_plagues')}</div>
              </div>
            </div>
          </div>

          {/* 疫情卡片网格 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredPlagues.map((plague) => (
              <div
                key={plague.id}
                className={`plague-card p-5 rounded-xl border-2 border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 shadow-lg cursor-pointer transition-all hover:scale-105 hover:shadow-xl ${
                  selectedPlague?.id === plague.id ? 'ring-2 ring-accent' : ''
                }`}
                onClick={() => setSelectedPlague(plague)}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100">
                    {plague.name}
                  </h3>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${getImpactColor(plague)}`}>
                    {getImpactBadge(plague)}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-ink-600 dark:text-ink-400">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">[时] {plague.dynasty}</span>
                    {plague.year && (
                      <span className="text-xs text-ink-500">({plague.year})</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span>[地]</span>
                    <span>{plague.location}</span>
                  </div>

                  {plague.deathRate && (
                    <div className="flex items-center gap-2">
                      <span>[亡]</span>
                      <span>{plague.deathRate}</span>
                    </div>
                  )}

                  <p className="line-clamp-3">{plague.impact}</p>
                </div>
              </div>
            ))}
          </div>

          {filteredPlagues.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-2 text-ink-400">?</div>
              <div className="text-ink-600 dark:text-ink-400">
                {t('plagueHistory.no_match')}
              </div>
            </div>
          )}

          {/* 疫情详情模态框 */}
          {selectedPlague && (
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedPlague(null)}
            >
              <div
                className="plague-detail-card max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-2xl border-2 border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 md:p-8">
                  {/* 关闭按钮 */}
                  <button
                    className="absolute top-4 right-4 text-ink-400 hover:text-ink-900 dark:hover:text-ink-100"
                    onClick={() => setSelectedPlague(null)}
                  >
                    ✕
                  </button>

                  {/* 标题 */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-ink-900 dark:text-ink-100 mb-2">
                        {selectedPlague.name}
                      </h2>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${getImpactColor(selectedPlague)}`}>
                          {getImpactBadge(selectedPlague)}
                        </span>
                        <span className="text-ink-600 dark:text-ink-400">
                          [时] {selectedPlague.dynasty} - {selectedPlague.period}
                        </span>
                        {selectedPlague.year && (
                          <span className="px-3 py-1 rounded-full text-sm font-bold bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                            {selectedPlague.year}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 基本信息卡片 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="p-4 rounded-xl bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700">
                      <div className="text-sm text-ink-500 mb-1">{t('plagueHistory.location_label')}</div>
                      <div className="text-lg font-bold text-ink-900 dark:text-ink-100">
                        {selectedPlague.location}
                      </div>
                    </div>

                    {selectedPlague.deathRate && (
                      <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700">
                        <div className="text-sm text-red-500 mb-1">{t('plagueHistory.death_rate_label')}</div>
                        <div className="text-lg font-bold text-red-600 dark:text-red-400">
                          {selectedPlague.deathRate}
                        </div>
                      </div>
                    )}

                    {selectedPlague.duration && (
                      <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700">
                        <div className="text-sm text-blue-500 mb-1">{t('plagueHistory.duration_label')}</div>
                        <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                          {selectedPlague.duration}
                        </div>
                      </div>
                    )}

                    {selectedPlague.casualties && (
                      <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700">
                        <div className="text-sm text-orange-500 mb-1">{t('plagueHistory.casualties_label')}</div>
                        <div className="text-lg font-bold text-orange-600 dark:text-orange-400">
                          {selectedPlague.casualties}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 症状 */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-2">
                      {t('plagueHistory.symptoms')}
                    </h3>
                    <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700">
                      <p className="text-ink-700 dark:text-ink-300">
                        {selectedPlague.symptoms}
                      </p>
                    </div>
                  </div>

                  {/* 病因 */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-2">
                      {t('plagueHistory.cause')}
                    </h3>
                    <p className="text-ink-600 dark:text-ink-400">
                      {selectedPlague.cause}
                    </p>
                  </div>

                  {/* 影响 */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-2">
                      {t('plagueHistory.impact')}
                    </h3>
                    <p className="text-ink-600 dark:text-ink-400 leading-relaxed">
                      {selectedPlague.impact}
                    </p>
                  </div>

                  {/* 死亡人数详情 */}
                  {selectedPlague.casualties && (
                    <div className="mb-6 p-4 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700">
                      <h3 className="text-lg font-bold text-orange-800 dark:text-orange-200 mb-2">
                        {t('plagueHistory.death_count')}
                      </h3>
                      <p className="text-orange-700 dark:text-orange-300">
                        {selectedPlague.casualties}
                      </p>
                    </div>
                  )}

                  {/* 伤亡人员 */}
                  {selectedPlague.famousPeople && selectedPlague.famousPeople.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-2">
                        {t('plagueHistory.famous_victims')}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedPlague.famousPeople.map((person: string, idx: number) => (
                          <span
                            key={idx}
                            className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700"
                          >
                            {person}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 后果 */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-2">
                      {t('plagueHistory.consequences')}
                    </h3>
                    <ul className="space-y-2">
                      {selectedPlague.consequences.map((consequence: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2 text-ink-600 dark:text-ink-400">
                          <span className="text-accent mt-1">▸</span>
                          <span>{consequence}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 预防措施 */}
                  <div className="mb-6 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700">
                    <h3 className="text-lg font-bold text-green-800 dark:text-green-200 mb-2">
                      {t('plagueHistory.prevention')}
                    </h3>
                    <p className="text-green-700 dark:text-green-300">
                      {selectedPlague.prevention || t('plagueHistory.prevention_default')}
                    </p>
                  </div>

                  {/* 后续影响 */}
                  {selectedPlague.afterEffects && (
                    <div className="mb-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700">
                      <h3 className="text-lg font-bold text-blue-800 dark:text-blue-200 mb-2">
                        {t('plagueHistory.after_effects')}
                      </h3>
                      <p className="text-blue-700 dark:text-blue-300">
                        {selectedPlague.afterEffects}
                      </p>
                    </div>
                  )}

                  {/* 关闭按钮 */}
                  <button
                    className="w-full py-3 rounded-xl bg-accent text-white font-bold hover:bg-accent/90 transition-colors"
                    onClick={() => setSelectedPlague(null)}
                  >
                    {t('plagueHistory.back_to_list')}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 关键瘟疫统计 */}
          <div className="mt-12 p-6 md:p-8 rounded-2xl border-2 border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 shadow-lg">
            <h2 className="text-2xl font-bold text-ink-900 dark:text-ink-100 mb-6">
              {t('plagueHistory.statistics')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 按朝代分布 */}
              <div>
                <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-3">
                  {t('plagueHistory.by_dynasty')}
                </h3>
                <div className="space-y-3">
                  {Object.entries(PLAGUES_BY_DYNASTY).sort((a, b) => {
                    // 按朝代出现顺序排序（大致）
                    const dynastyOrder = ['夏商西周', '东周', '秦朝', '汉朝', '三国', '晋朝', '南北朝', '隋朝', '唐朝', '宋朝', '元朝', '明朝', '清朝', '民国', '新中国'];
                    const idxA = dynastyOrder.indexOf(a[0]);
                    const idxB = dynastyOrder.indexOf(b[0]);
                    return (idxA === -1 ? 999 : idxA) - (idxB === -1 ? 999 : idxB);
                  }).map(([dynasty, plagues]) => (
                    <div
                      key={dynasty}
                      className="flex items-center justify-between p-3 rounded-lg bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700"
                    >
                      <div>
                        <div className="font-bold text-ink-900 dark:text-ink-100">{dynasty}</div>
                        <div className="text-sm text-ink-500">{t('plagueHistory.plague_count')}</div>
                      </div>
                      <div className="text-2xl font-bold text-accent">{plagues.length}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 疫情趋势 */}
              <div>
                <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-3">
                  {t('plagueHistory.by_year')}
                </h3>
                <div className="space-y-3">
                  {PLAGUE_EPIDEMICS.sort((a, b) => {
                    if (a.year && b.year) {
                      return parseInt(a.year) - parseInt(b.year);
                    }
                    return 0;
                  }).map((plague, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-lg bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700"
                    >
                      <div>
                        <div className="font-bold text-ink-900 dark:text-ink-100">{plague.name}</div>
                        <div className="text-xs text-ink-500">{plague.location}</div>
                      </div>
                      {plague.year && (
                        <div className="text-sm font-bold text-accent">
                          {plague.year}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 历史教训 */}
            <div className="mt-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700">
              <h3 className="text-lg font-bold text-red-800 dark:text-red-200 mb-2">
                {t('plagueHistory.lessons')}
              </h3>
              <div className="text-red-700 dark:text-red-300 space-y-2">
                <p>{t('plagueHistory.lesson_1')}</p>
                <p>{t('plagueHistory.lesson_2')}</p>
                <p>{t('plagueHistory.lesson_3')}</p>
                <p>{t('plagueHistory.lesson_4')}</p>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </div>
  );
}
