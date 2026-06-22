import React, { memo } from 'react';
import type { EventItem } from '@/types';
import TimelineEvent from './TimelineEvent';
import { CardSkeleton } from '@/components/common/Skeleton';

interface TimelineProps {
  events: EventItem[];
  loading: boolean;
}

const Timeline = memo(function Timeline({ events, loading }: TimelineProps) {
  if (loading) {
    return <CardSkeleton count={6} />;
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-20 text-ink-400">
        <p>数据加载中...</p>
        <p className="text-sm mt-2">请先将 data/events.json 复制到 src/data/ 目录</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {events.map((event) => (
        <TimelineEvent key={event.id} event={event} />
      ))}
    </div>
  );
});

export default Timeline;
