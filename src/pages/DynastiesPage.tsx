import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import type { DynastyItem } from '@/types';
import { fetchDynasties } from '@/services/api';
import { loadDynasties } from '@/utils';
import SectionHeader from '@/components/common/SectionHeader';
import DynastyGrid from '@/components/dynasty/DynastyGrid';
import { GridSkeleton } from '@/components/common/Skeleton';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import { useT } from '@/i18n/i18n';

function DynastiesPage() {
  const t = useT();
  const [dynasties, setDynasties] = useState<DynastyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // 后端数据与本地数据合并去重，确保南北朝、五代十国等后端缺失的朝代也能显示
    Promise.all([
      fetchDynasties().catch(() => [] as DynastyItem[]),
      loadDynasties().catch(() => [] as DynastyItem[]),
    ])
      .then(([backendData, localData]) => {
        const seen = new Set<string>();
        const merged: DynastyItem[] = [];
        for (const d of [...backendData, ...localData]) {
          if (!seen.has(d.name)) {
            seen.add(d.name);
            merged.push(d);
          }
        }
        merged.sort((a, b) => (a.periodStart ?? 0) - (b.periodStart ?? 0));
        setDynasties(merged);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  // 关键词搜索：朝代名 / 开国君主 / 都城
  const filteredDynasties = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return dynasties;
    return dynasties.filter((d) => {
      const nameMatch = d.name?.toLowerCase().includes(term);
      const founderMatch = d.founder?.toLowerCase().includes(term);
      const capitalMatch = d.capital?.toLowerCase().includes(term);
      return nameMatch || founderMatch || capitalMatch;
    });
  }, [dynasties, searchTerm]);

  // 渲染头部（修复 bug：原 description 复用了 title 的 i18n key）
  const renderHeader = () => (
    <RevealOnScroll direction="fade">
      <SectionHeader
        label="DYNASTIES"
        title={t('dynasties.title')}
        description={t('dynasties.description')}
      />
    </RevealOnScroll>
  );

  if (loading || dynasties.length === 0) {
    return (
      <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          {renderHeader()}
          <GridSkeleton count={8} />
          <RevealOnScroll direction="fade" delay={200}>
            <Link to="/" className="btn-secondary mt-12 inline-flex">{t('common.back_home')}</Link>
          </RevealOnScroll>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <div className="max-w-5xl mx-auto text-center">
        {renderHeader()}

        {/* 搜索框 */}
        <RevealOnScroll direction="up" delay={80}>
          <div className="mt-6 mb-4 relative max-w-xl mx-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('dynasties.search_placeholder')}
              className="w-full px-4 py-2.5 pl-10 rounded-xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 text-ink-900 dark:text-ink-100 focus:outline-none focus:border-accent text-sm"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-accent"
              >
                ✕
              </button>
            )}
          </div>
          {/* 结果计数 */}
          <div className="text-xs text-ink-400 mb-4">
            {filteredDynasties.length > 0
              ? t('dynasties.result_count', { count: filteredDynasties.length })
              : t('dynasties.no_match')}
          </div>
        </RevealOnScroll>

        <RevealOnScroll direction="up" delay={200}>
          {filteredDynasties.length === 0 ? (
            <div className="text-center py-12 text-ink-400">
              <p className="text-lg mb-1">{t('dynasties.no_match')}</p>
              <p className="text-sm">{t('dynasties.no_match_hint')}</p>
            </div>
          ) : (
            <DynastyGrid dynasties={filteredDynasties} />
          )}
        </RevealOnScroll>
        <RevealOnScroll direction="fade" delay={400}>
          <Link to="/" className="btn-secondary mt-12 inline-flex">{t('common.back_home')}</Link>
        </RevealOnScroll>
      </div>
    </div>
  );
}

export default DynastiesPage;
