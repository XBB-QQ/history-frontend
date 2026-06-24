import { useMemo } from 'react';
import type { EventItem, PersonItem } from '@/types';
import { useTimeTravelStore } from '@/store/timeTravelStore';

/**
 * 根据选中年代过滤事件和人物
 * 精度越高，过滤越严格
 */
export function useFilteredByYear(events: EventItem[], persons: PersonItem[]) {
  const { year, precision, active } = useTimeTravelStore();

  return useMemo(() => {
    if (!active) return { events, persons };

    const config = {
      millennium: 1000,
      century: 100,
      decade: 10,
      year: 1,
    }[precision];

    // 根据精度计算容差范围
    const tolerance = precision === 'year' ? 0 : Math.ceil(config / 2);

    const filteredEvents = events.filter((e) => {
      if (!e.year) return false;
      return Math.abs(e.year - year) <= tolerance;
    });

    const filteredPersons = persons.filter((p) => {
      const [start, end] = p.years;
      if (start === null || end === null) return false;
      return Math.abs(start - year) <= tolerance || Math.abs(end - year) <= tolerance;
    });

    return { events: filteredEvents, persons: filteredPersons };
  }, [events, persons, year, precision, active, tolerance]);
}
