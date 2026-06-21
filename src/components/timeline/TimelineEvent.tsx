import { useDetailStore } from '@/store/detailStore';
import type { EventItem } from '@/types';

interface TimelineEventProps {
  event: EventItem;
}

export default function TimelineEvent({ event }: TimelineEventProps) {
  const openDetail = useDetailStore((s) => s.openDetail);

  return (
    <div
      className="bg-white/60 dark:bg-ink-900/60 backdrop-blur-sm rounded-xl p-6 border border-ink-200 dark:border-ink-700 hover:shadow-md hover:border-accent/50 dark:hover:border-accent/50 transition-all duration-300 cursor-pointer"
      onClick={() => openDetail('event', event.id ? Number(event.id) : 0, event)}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-20 text-right">
          <span className="text-sm text-ink-400">{event.yearDisplay}</span>
        </div>
        <div className="w-3 h-3 rounded-full bg-accent mt-1 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-1">{event.title}</h3>
          <p className="text-sm text-ink-500 mb-2">{event.description}</p>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs px-2 py-1 bg-ink-100 rounded-full text-ink-600">
              {event.category}
            </span>
            {event.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs px-2 py-1 bg-ink-50 rounded-full text-ink-400">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
