import { useEffect, useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import type { EventItem } from '@/types';
import { fetchTimelineEvents } from '@/services/api';
import SectionHeader from '@/components/common/SectionHeader';
import Timeline from '@/components/timeline/Timeline';
import TimelineFilters, { ALL_FILTER } from '@/components/timeline/TimelineFilters';
import { CardSkeleton } from '@/components/common/Skeleton';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import { useT } from '@/i18n/i18n';

function TimelinePage() {
  const t = useT();
  const [searchParams, setSearchParams] = useSearchParams();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  // 状态从 URL 初始化（支持刷新/分享还原视图）
  const [selectedDynasty, setSelectedDynasty] = useState(searchParams.get('dynasty') || ALL_FILTER);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || ALL_FILTER);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');

  useEffect(() => {
    fetchTimelineEvents()
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  // 状态变化时同步到 URL
  useEffect(() => {
    const params: Record<string, string> = {};
    if (selectedDynasty !== ALL_FILTER) params.dynasty = selectedDynasty;
    if (selectedCategory !== ALL_FILTER) params.category = selectedCategory;
    if (searchTerm.trim()) params.q = searchTerm.trim();
    setSearchParams(params, { replace: true });
  }, [selectedDynasty, selectedCategory, searchTerm, setSearchParams]);

  // 过滤后的事件列表：朝代 + 类别 + 关键词
  const filteredEvents = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return events.filter((e) => {
      if (selectedDynasty !== ALL_FILTER && e.dynasty !== selectedDynasty) return false;
      if (selectedCategory !== ALL_FILTER && e.category !== selectedCategory) return false;
      if (term) {
        const titleMatch = e.title?.toLowerCase().includes(term);
        const descMatch = e.description?.toLowerCase().includes(term);
        if (!titleMatch && !descMatch) return false;
      }
      return true;
    });
  }, [events, selectedDynasty, selectedCategory, searchTerm]);

  const handleReset = () => {
    setSelectedDynasty(ALL_FILTER);
    setSelectedCategory(ALL_FILTER);
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        <RevealOnScroll direction="fade">
          <SectionHeader
            label="TIMELINE"
            title={t('timeline.title')}
            description={t('timeline.events_desc')}
          />
        </RevealOnScroll>

        {/* 搜索框 */}
        {!loading && events.length > 0 && (
          <RevealOnScroll direction="fade" delay={50}>
            <div className="mt-6 mb-4 relative max-w-xl mx-auto">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t('timeline.search_placeholder')}
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
          </RevealOnScroll>
        )}

        {/* 筛选器 */}
        {!loading && events.length > 0 && (
          <RevealOnScroll direction="fade" delay={100}>
            <TimelineFilters
              events={events}
              selectedDynasty={selectedDynasty}
              selectedCategory={selectedCategory}
              onDynastyChange={setSelectedDynasty}
              onCategoryChange={setSelectedCategory}
              onReset={handleReset}
            />
          </RevealOnScroll>
        )}

        {/* 结果计数 */}
        {!loading && events.length > 0 && (searchTerm || selectedDynasty !== ALL_FILTER || selectedCategory !== ALL_FILTER) && (
          <div className="text-xs text-ink-400 text-center mb-4">
            {filteredEvents.length > 0
              ? t('timeline.search_result', { count: filteredEvents.length })
              : t('timeline.no_match')}
          </div>
        )}

        <RevealOnScroll direction="up" delay={200}>
          {loading ? (
            <CardSkeleton count={6} />
          ) : filteredEvents.length === 0 ? (
            <div className="text-center py-12 text-ink-400">
              <p className="text-lg mb-1">{t('timeline.no_match')}</p>
              <p className="text-sm">{t('timeline.no_match_hint')}</p>
            </div>
          ) : (
            <Timeline events={filteredEvents as any} loading={false} />
          )}
        </RevealOnScroll>

        <RevealOnScroll direction="fade" delay={400}>
          <div className="text-center mt-12">
            <Link to="/" className="btn-secondary inline-flex">{t('common.back_home')}</Link>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}

export default TimelinePage;
