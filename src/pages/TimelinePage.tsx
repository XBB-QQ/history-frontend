import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { EventItem } from '@/types';
import { fetchTimelineEvents } from '@/services/api';
import SectionHeader from '@/components/common/SectionHeader';
import Timeline from '@/components/timeline/Timeline';

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
    <div className="min-h-screen bg-paper pt-20 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          label="TIMELINE"
          title="时间轴"
          description="探索五千年历史长河中的重大事件"
        />
        <Timeline events={events} loading={loading} />
        <div className="text-center mt-12">
          <Link to="/" className="btn-secondary inline-flex">返回首页</Link>
        </div>
      </div>
    </div>
  );
}

export default TimelinePage;
