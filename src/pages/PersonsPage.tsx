import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import type { PersonItem } from '@/types';
import { fetchAllPersons } from '@/services/api';
import SectionHeader from '@/components/common/SectionHeader';
import PersonGrid from '@/components/person/PersonGrid';
import { GridSkeleton } from '@/components/common/Skeleton';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import { useT } from '@/i18n/i18n';

/** 朝代分组顺序（与 PersonGrid 保持一致） */
const DYNASTY_ORDER = [
  '先秦', '春秋', '战国', '秦', '汉', '三国', '晋', '南北朝',
  '隋', '唐', '宋', '元', '明', '清', '近代', '其他'
];

function getDynastyGroup(dynasty: string): string {
  for (const d of DYNASTY_ORDER) {
    if (dynasty?.includes(d)) return d;
  }
  return '其他';
}

const PAGE_SIZE = 24;

function PersonsPage() {
  const t = useT();
  const [persons, setPersons] = useState<PersonItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  // 新增：搜索 + 朝代筛选 + 分页
  const [searchTerm, setSearchTerm] = useState('');
  const [dynastyFilter, setDynastyFilter] = useState<string>('all');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    fetchAllPersons()
      .then((data) => {
        const sorted = [...data].sort((a, b) => {
          const yearA = a.years?.[0] ?? 9999;
          const yearB = b.years?.[0] ?? 9999;
          return yearA - yearB;
        });
        setPersons(sorted);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  // 提取所有出现过的朝代分组（按 DYNASTY_ORDER 排序）
  const availableDynasties = useMemo(() => {
    const set = new Set<string>();
    persons.forEach((p) => set.add(getDynastyGroup(p.dynasty)));
    return DYNASTY_ORDER.filter((d) => set.has(d));
  }, [persons]);

  // 搜索 + 朝代筛选
  const filteredPersons = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return persons.filter((p) => {
      // 朝代筛选
      if (dynastyFilter !== 'all' && getDynastyGroup(p.dynasty) !== dynastyFilter) return false;
      // 关键词搜索：姓名 / 标签 / 简介
      if (term) {
        const nameMatch = p.name?.toLowerCase().includes(term);
        const tagsMatch = (p.tags || []).some((tag: string) => tag.toLowerCase().includes(term));
        const bioMatch = p.bio?.toLowerCase().includes(term);
        if (!nameMatch && !tagsMatch && !bioMatch) return false;
      }
      return true;
    });
  }, [persons, searchTerm, dynastyFilter]);

  // 筛选条件变化时重置分页
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [searchTerm, dynastyFilter]);

  const visiblePersons = filteredPersons.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPersons.length;

  // 复用 loading / error 分支渲染头部
  const renderHeader = () => (
    <RevealOnScroll direction="fade">
      <SectionHeader
        label="PERSONS"
        title={t('persons.title')}
        description={loading || error ? t('persons.list_desc') : t('persons.description')}
      />
    </RevealOnScroll>
  );

  if (loading) {
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

  if (error) {
    return (
      <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          {renderHeader()}
          <div className="text-center py-12 text-ink-400">
            <p>{t('persons.load_failed')}</p>
          </div>
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

        {/* 搜索 + 朝代筛选 */}
        <RevealOnScroll direction="up" delay={80}>
          <div className="mt-6 mb-6 space-y-3">
            {/* 搜索框 */}
            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t('persons.search_placeholder')}
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
                  title={t('persons.filter_all')}
                >
                  ✕
                </button>
              )}
            </div>

            {/* 朝代筛选 chips */}
            <div className="flex flex-wrap justify-center gap-1.5">
              <button
                onClick={() => setDynastyFilter('all')}
                className={`px-3 py-1 text-xs rounded-full transition-all border ${
                  dynastyFilter === 'all'
                    ? 'bg-accent text-white border-accent shadow-md'
                    : 'bg-white/60 dark:bg-ink-900/60 border-ink-200 dark:border-ink-700 text-ink-600 dark:text-ink-400 hover:border-accent/50 hover:text-accent'
                }`}
              >
                {t('persons.filter_all')}
              </button>
              {availableDynasties.map((d) => (
                <button
                  key={d}
                  onClick={() => setDynastyFilter(d)}
                  className={`px-3 py-1 text-xs rounded-full transition-all border ${
                    dynastyFilter === d
                      ? 'bg-accent text-white border-accent shadow-md'
                      : 'bg-white/60 dark:bg-ink-900/60 border-ink-200 dark:border-ink-700 text-ink-600 dark:text-ink-400 hover:border-accent/50 hover:text-accent'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            {/* 结果计数 */}
            <div className="text-xs text-ink-400">
              {t('persons.result_count', { count: filteredPersons.length })}
            </div>
          </div>
        </RevealOnScroll>

        {/* 列表 */}
        <div className="mt-4">
          {filteredPersons.length === 0 ? (
            <div className="text-center py-12 text-ink-400">
              <p className="text-lg mb-1">{t('persons.no_match')}</p>
              <p className="text-sm">{t('persons.no_match_hint')}</p>
            </div>
          ) : (
            <>
              <PersonGrid persons={visiblePersons} />
              {/* 加载更多 */}
              {hasMore && (
                <div className="mt-8 text-center">
                  <button
                    onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                    className="px-6 py-2.5 rounded-xl border border-ink-200 dark:border-ink-700 text-ink-700 dark:text-ink-300 hover:border-accent hover:text-accent transition-all text-sm font-bold"
                  >
                    {t('persons.load_more')} · {t('persons.showing_count', { shown: visiblePersons.length, total: filteredPersons.length })}
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        <RevealOnScroll direction="fade" delay={400}>
          <Link to="/" className="btn-secondary mt-12 inline-flex">{t('common.back_home')}</Link>
        </RevealOnScroll>
      </div>
    </div>
  );
}

export default PersonsPage;
