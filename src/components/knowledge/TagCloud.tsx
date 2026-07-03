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
  const [filterMode, setFilterMode] = useState<'single' | 'and' | 'or'>('single');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/knowledge/tags')
      .then((r: any) => r.json())
      .then((data: any) => {
        setTags(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // 同步 activeTag 到 selectedTags（外部控制）
  useEffect(() => {
    if (activeTag) {
      setSelectedTags([activeTag]);
    } else {
      setSelectedTags([]);
    }
  }, [activeTag]);

  const toggleTag = (tag: string) => {
    const next = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(next);

    if (next.length === 0) {
      onSelectTag(null);
    } else if (filterMode === 'single') {
      onSelectTag(next[next.length - 1]);
    } else {
      onSelectTag(next.join(',')); // 逗号分隔传给父组件
    }
  };

  if (loading) return null;
  if (tags.length === 0) return null;

  const counts = tags.map((t: any) => t.count);
  const min = Math.min(...counts);
  const max = Math.max(...counts);

  const modeButtons = [
    { key: 'single' as const, label: '单选' },
    { key: 'and' as const, label: '且' },
    { key: 'or' as const, label: '或' },
  ];

  return (
    <div className="mb-6">
      {/* 筛选模式切换 */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-bold text-ink-500 dark:text-ink-400">筛选模式：</span>
        {modeButtons.map(m => (
          <button
            key={m.key}
            onClick={() => { setFilterMode(m.key); setSelectedTags([]); onSelectTag(null); }}
            className={`px-2 py-0.5 rounded text-xs transition-all ${
              filterMode === m.key
                ? 'bg-accent text-white font-bold'
                : 'bg-ink-100 dark:bg-ink-800 text-ink-500 dark:text-ink-400'
            }`}
          >
            {m.label}
          </button>
        ))}
        {selectedTags.length > 0 && (
          <button
            onClick={() => { setSelectedTags([]); onSelectTag(null); }}
            className="text-xs text-ink-400 hover:text-accent ml-2 underline"
          >
            清除
          </button>
        )}
      </div>

      {/* 标签云 */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-ink-500 dark:text-ink-400">标签：</span>
        <button
          onClick={() => { setSelectedTags([]); onSelectTag(null); }}
          className={`px-3 py-1 rounded-full transition-all ${
            selectedTags.length === 0
              ? 'bg-accent text-white font-bold'
              : 'bg-ink-100 dark:bg-ink-800 text-ink-500 dark:text-ink-400 hover:bg-ink-200 dark:hover:bg-ink-700'
          }`}
        >
          全部
        </button>
        {tags.map((t: any) => (
          <button
            key={t.tag}
            onClick={() => toggleTag(t.tag)}
            className={`rounded-full transition-all ${
              selectedTags.includes(t.tag)
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
    </div>
  );
}
