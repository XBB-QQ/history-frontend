import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import type { EventItem } from '@/types';
import { fetchTimelineEvents } from '@/services/api';
import SectionHeader from '@/components/common/SectionHeader';
import Timeline from '@/components/timeline/Timeline';
import TimelineFilters from '@/components/timeline/TimelineFilters';
import { CardSkeleton } from '@/components/common/Skeleton';
import RevealOnScroll from '@/components/common/RevealOnScroll';

function TimelinePage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDynasty, setSelectedDynasty] = useState('全部');
  const [selectedCategory, setSelectedCategory] = useState('全部');

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

  // 过滤后的事件列表
  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      if (selectedDynasty !== '全部' && e.dynasty !== selectedDynasty) return false;
      if (selectedCategory !== '全部' && e.category !== selectedCategory) return false;
      return true;
    });
  }, [events, selectedDynasty, selectedCategory]);

  const handleReset = () => {
    setSelectedDynasty('全部');
    setSelectedCategory('全部');
  };

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        <RevealOnScroll direction="fade">
          <SectionHeader
            label="TIMELINE"
            title="时间轴"
            description="从炎黄到清末，五千年大事一览"
          />
        </RevealOnScroll>

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

        <RevealOnScroll direction="up" delay={200}>
          {loading ? (
            <CardSkeleton count={6} />
          ) : (
            <Timeline events={filteredEvents as any} loading={false} />
          )}
        </RevealOnScroll>

        <RevealOnScroll direction="fade" delay={400}>
          <div className="text-center mt-12">
            <Link to="/" className="btn-secondary inline-flex">返回首页</Link>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}

export default TimelinePage;
