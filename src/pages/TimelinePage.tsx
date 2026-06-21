import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { EventItem } from '@/types';
import { fetchTimelineEvents } from '@/services/api';
import SectionHeader from '@/components/common/SectionHeader';
import Timeline from '@/components/timeline/Timeline';
import RevealOnScroll from '@/components/common/RevealOnScroll';

function TimelinePage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        <RevealOnScroll direction="fade">
          <SectionHeader
            label="TIMELINE"
            title="时间轴"
            description="探索五千年历史长河中的重大事件"
          />
        </RevealOnScroll>
        <RevealOnScroll direction="up" delay={200}>
          <Timeline events={events as any} loading={loading} />
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
