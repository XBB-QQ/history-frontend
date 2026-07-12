/**
 * 姓氏详情页 — 展示单个姓氏的完整信息
 * @see history-museum/ITERATIONS.md Iteration #71
 *
 * 路由：/surname/:rank
 * 使用 findSurnameByRank 查找数据
 * 复用 SurnameMigrationMap 组件渲染迁徙地图
 */

import { useParams, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import SurnameMigrationMap from '@/components/map/SurnameMigrationMap';
import { findSurnameByRank, getAdjacentSurnames } from '@/data/features/surnameData';
import { useT } from '@/i18n/i18n';

export default function SurnameDetailPage() {
  const t = useT();
  const { rank } = useParams<{ rank: string }>();
  const navigate = useNavigate();

  const rankNum = parseInt(rank || '0', 10);
  const surname = useMemo(() => findSurnameByRank(rankNum), [rankNum]);
  const adjacent = useMemo(() => getAdjacentSurnames(rankNum), [rankNum]);

  // 未找到姓氏时的兜底页面
  if (!surname) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper dark:bg-ink-950 pt-20">
        <div className="text-center">
          <div className="text-6xl mb-4 text-ink-400 font-bold">?</div>
          <h2 className="text-xl font-bold text-ink-800 dark:text-ink-200 mb-2">
            {t('surnameMap.notFoundTitle')}
          </h2>
          <p className="text-ink-600 dark:text-ink-400 mb-4">
            {t('surnameMap.notFoundDesc', { rank: rank || '' })}
          </p>
          <button
            onClick={() => navigate('/surname')}
            className="text-accent hover:underline"
          >
            {t('surnameMap.backToList')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <SectionHeader
        label="SURNAME"
        title={`${surname.surname} · ${surname.pinyin}`}
        description={t('surnameMap.description')}
      />

      <RevealOnScroll threshold={0.01}>
        {/* 顶部导航栏：返回 + 上一个/下一个 */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <button
            onClick={() => navigate('/surname')}
            className="text-accent hover:underline flex items-center gap-1"
          >
            <span>←</span>
            <span>{t('surnameMap.backToList')}</span>
          </button>

          <div className="flex gap-2">
            <button
              onClick={() => adjacent.prev && navigate(`/surname/${adjacent.prev.rank}`)}
              disabled={!adjacent.prev}
              className="px-3 py-1.5 rounded-lg border border-ink-200 dark:border-ink-700 text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:border-accent hover:text-accent transition-colors"
            >
              ← {t('surnameMap.prevSurname')}
              {adjacent.prev && (
                <span className="ml-1 text-ink-500">
                  {adjacent.prev.surname}
                </span>
              )}
            </button>
            <button
              onClick={() => adjacent.next && navigate(`/surname/${adjacent.next.rank}`)}
              disabled={!adjacent.next}
              className="px-3 py-1.5 rounded-lg border border-ink-200 dark:border-ink-700 text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:border-accent hover:text-accent transition-colors"
            >
              {adjacent.next && (
                <span className="mr-1 text-ink-500">
                  {adjacent.next.surname}
                </span>
              )}
              {t('surnameMap.nextSurname')} →
            </button>
          </div>
        </div>

        {/* 详情卡片 */}
        <div className="detail-card p-6 md:p-8 rounded-2xl border-2 border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 shadow-lg">
          {/* 头部信息 */}
          <div className="detail-header flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <div className="seal-stamp text-6xl text-accent">{surname.surname}</div>
            <div className="detail-info flex-1">
              <h2 className="text-3xl font-bold text-ink-900 dark:text-ink-100 mb-2">
                {surname.surname} ({surname.pinyin})
              </h2>
              <div className="flex flex-wrap gap-2 text-sm">
                <span className="px-2 py-1 rounded bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-400">
                  {t('surnameMap.rank')}: {surname.rank}
                </span>
                <span className="px-2 py-1 rounded bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-400">
                  {t('surnameMap.populationRank')}: {surname.populationRank}
                </span>
                <span className="px-2 py-1 rounded bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-400">
                  {t('surnameMap.population')}: {surname.population.toLocaleString()} {t('surnameMap.wan')}
                </span>
                <span className="px-2 py-1 rounded bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-400">
                  {t('surnameMap.junwangCount')}: {surname.junwang.length}
                </span>
                <span className="px-2 py-1 rounded bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-400">
                  {t('surnameMap.figureCount')}: {surname.figures.length}
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
                {surname.origin}
              </p>
            </div>
            <div className="info-block">
              <h3 className="text-lg font-bold text-ink-800 dark:text-ink-200 mb-2">
                地 {t('surnameMap.originPlace')}
              </h3>
              <p className="text-ink-700 dark:text-ink-300 leading-relaxed mb-2">
                {surname.originPlace.name} ({surname.originPeriod})
              </p>
              <p className="text-sm text-ink-500">
                {t('surnameMap.longitude')}: {surname.originPlace.lng}°, {t('surnameMap.latitude')}: {surname.originPlace.lat}°
              </p>
            </div>
            <div className="info-block">
              <h3 className="text-lg font-bold text-ink-800 dark:text-ink-200 mb-2">
                郡 {t('surnameMap.junwang')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {surname.junwang.map((junwang, idx) => (
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
              <p className="text-ink-700 dark:text-ink-300">{surname.totem}</p>
            </div>
            <div className="info-block md:col-span-2">
              <h3 className="text-lg font-bold text-ink-800 dark:text-ink-200 mb-2">
                史 {t('surnameMap.history')}
              </h3>
              <p className="text-ink-700 dark:text-ink-300">{surname.history}</p>
            </div>
          </div>

          {/* 姓氏迁徙地图 */}
          <div className="migration-map-section mb-6">
            <h3 className="text-lg font-bold text-ink-800 dark:text-ink-200 mb-3">
              迁 {t('surnameMap.migrationTrack')}
            </h3>
            <div className="map-container relative bg-ink-50 dark:bg-ink-800 rounded-xl overflow-hidden p-2">
              <SurnameMigrationMap
                migration={surname.migration}
                originPlace={surname.originPlace}
              />
              <p className="text-xs text-ink-500 mt-2 px-2">
                注 {t('surnameMap.mapNote')}
              </p>
            </div>
          </div>

          {/* 历史名人 */}
          {surname.figures.length > 0 && (
            <div className="figures-section">
              <h3 className="text-lg font-bold text-ink-800 dark:text-ink-200 mb-3">
                贤 {t('surnameMap.figures')}
              </h3>
              <div className="figures-grid grid grid-cols-1 md:grid-cols-3 gap-3">
                {surname.figures.map((figure, idx) => (
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
      </RevealOnScroll>
    </div>
  );
}
