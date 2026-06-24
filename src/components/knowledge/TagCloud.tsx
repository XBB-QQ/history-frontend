import { useState, useEffect } from 'react';

interface TagStat {
  tag: string;
  count: number;
}

interface TagCloudProps {
  onSelectTag: (tag: string | null) => void;
  activeTag: string | null;
}

/** 字体大小映射：根据出现频率计算字号 */
function getFontSize(count: number, min: number, max: number): string {
  if (max === min) return '0.75rem';
  const ratio = (count - min) / (max - min);
  const size = 0.75 + ratio * 1.5; // 0.75rem ~ 2.25rem
  return `${size}rem`;
}

export default function TagCloud({ onSelectTag, activeTag }: TagCloudProps) {
  const [tags, setTags] = useState<TagStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/v1/knowledge/tags')
      .then((r) => r.json())
      .then((data) => {
        setTags(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return null;
  if (tags.length === 0) return null;

  const counts = tags.map((t) => t.count);
  const min = Math.min(...counts);
  const max = Math.max(...counts);

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <span className="text-xs font-bold text-ink-500 dark:text-ink-400">标签：</span>
      <button
        onClick={() => onSelectTag(null)}
        className={`px-3 py-1 rounded-full transition-all ${
          activeTag === null
            ? 'bg-accent text-white font-bold'
            : 'bg-ink-100 dark:bg-ink-800 text-ink-500 dark:text-ink-400 hover:bg-ink-200 dark:hover:bg-ink-700'
        }`}
      >
        全部
      </button>
      {tags.map((t) => (
        <button
          key={t.tag}
          onClick={() => onSelectTag(t.tag)}
          className={`rounded-full transition-all ${
            activeTag === t.tag
              ? 'bg-accent text-white font-bold'
              : 'bg-ink-100 dark:bg-ink-800 text-ink-500 dark:text-ink-400 hover:bg-ink-200 dark:hover:bg-ink-700'
          }`}
          style={{ fontSize: getFontSize(t.count, min, max) }}
        >
          {t.tag}
          <span className="ml-1 opacity-60">{t.count}</span>
        </button>
      ))}
    </div>
  );
}
