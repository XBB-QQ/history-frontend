import type { EventItem } from '@/types';

interface TimelineFiltersProps {
  events: EventItem[];
  selectedDynasty: string;
  selectedCategory: string;
  onDynastyChange: (dynasty: string) => void;
  onCategoryChange: (category: string) => void;
  onReset: () => void;
}

/** 从事件列表中抽取唯一的朝代和类别 */
function getUniqueValues(events: EventItem[], field: 'dynasty' | 'category'): string[] {
  const values = new Set<string>();
  events.forEach((e) => {
    const val = e[field];
    if (val && val !== '未知' && val !== '') values.add(val);
  });
  return ['全部', ...Array.from(values).sort()];
}

export default function TimelineFilters({
  events,
  selectedDynasty,
  selectedCategory,
  onDynastyChange,
  onCategoryChange,
  onReset,
}: TimelineFiltersProps) {
  const dynasties = getUniqueValues(events, 'dynasty');
  const categories = getUniqueValues(events, 'category');

  const hasActiveFilter = selectedDynasty !== '全部' || selectedCategory !== '全部';

  return (
    <div className="flex flex-wrap items-center gap-3 mb-8">
      {/* 朝代筛选 */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-ink-400 dark:text-ink-500">朝代：</span>
        <select
          value={selectedDynasty}
          onChange={(e) => onDynastyChange(e.target.value)}
          className="text-sm px-3 py-1.5 rounded-lg border border-ink-200 dark:border-ink-700 bg-white/80 dark:bg-ink-900/80 text-ink-700 dark:text-ink-300 focus:outline-none focus:ring-2 focus:ring-accent/50"
        >
          {dynasties.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* 类别筛选 */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-ink-400 dark:text-ink-500">类别：</span>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="text-sm px-3 py-1.5 rounded-lg border border-ink-200 dark:border-ink-700 bg-white/80 dark:bg-ink-900/80 text-ink-700 dark:text-ink-300 focus:outline-none focus:ring-2 focus:ring-accent/50"
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* 重置按钮 */}
      {hasActiveFilter && (
        <button
          onClick={onReset}
          className="text-xs px-3 py-1.5 rounded-lg text-ink-500 dark:text-ink-400 hover:text-accent dark:hover:text-accent hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors"
        >
          重置筛选
        </button>
      )}

      {/* 筛选结果计数 */}
      {hasActiveFilter && (
        <span className="text-xs text-ink-400 dark:text-ink-500 ml-auto">
          共 {events.filter((e) => {
            if (selectedDynasty !== '全部' && e.dynasty !== selectedDynasty) return false;
            if (selectedCategory !== '全部' && e.category !== selectedCategory) return false;
            return true;
          }).length} 条结果
        </span>
      )}
    </div>
  );
}
