/**
 * 文学艺术·诗词页
 * 按朝代 + 流派组织，支持流派筛选 + 详情展开
 */
import { useMemo, useState } from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import { POEMS, POEM_SCHOOLS, type Poem } from '@/data/features/poetryData';

export default function PoetryPage() {
  const [selectedSchool, setSelectedSchool] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredPoems = useMemo(() => {
    if (selectedSchool === 'all') return POEMS;
    return POEMS.filter((p) => p.schoolId === selectedSchool);
  }, [selectedSchool]);

  const schoolMap = useMemo(() => {
    const map: Record<string, string> = {};
    POEM_SCHOOLS.forEach((s) => (map[s.id] = s.name));
    return map;
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-50 to-red-50 dark:from-ink-950 dark:via-ink-950 dark:to-ink-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="文学艺术"
          title="诗词殿堂"
          description="按朝代与流派组织，赏中华诗词千年流变"
        />

        {/* 流派筛选 */}
        <RevealOnScroll>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <button
              onClick={() => setSelectedSchool('all')}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                selectedSchool === 'all'
                  ? 'bg-gradient-to-r from-red-500 to-amber-500 text-white shadow-lg'
                  : 'bg-white dark:bg-ink-800 text-ink-700 dark:text-ink-300 hover:shadow-md'
              }`}
            >
              全部
            </button>
            {POEM_SCHOOLS.map((school) => (
              <button
                key={school.id}
                onClick={() => setSelectedSchool(school.id)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                  selectedSchool === school.id
                    ? 'bg-gradient-to-r from-red-500 to-amber-500 text-white shadow-lg'
                    : 'bg-white dark:bg-ink-800 text-ink-700 dark:text-ink-300 hover:shadow-md'
                }`}
                title={school.description}
              >
                {school.name}
              </button>
            ))}
          </div>
        </RevealOnScroll>

        {/* 诗词列表 */}
        <div className="space-y-4">
          {filteredPoems.map((poem, idx) => (
            <RevealOnScroll key={poem.id} delay={idx * 50}>
              <PoemCard
                poem={poem}
                schoolName={schoolMap[poem.schoolId]}
                expanded={expandedId === poem.id}
                onToggle={() => setExpandedId(expandedId === poem.id ? null : poem.id)}
              />
            </RevealOnScroll>
          ))}
        </div>

        {filteredPoems.length === 0 && (
          <div className="text-center py-16 text-ink-400 dark:text-ink-500">
            暂无该流派的诗词数据
          </div>
        )}
      </div>
    </div>
  );
}

interface PoemCardProps {
  poem: Poem;
  schoolName: string;
  expanded: boolean;
  onToggle: () => void;
}

function PoemCard({ poem, schoolName, expanded, onToggle }: PoemCardProps) {
  return (
    <article className="bg-white dark:bg-ink-800 rounded-2xl shadow-lg overflow-hidden border border-ink-100 dark:border-ink-700">
      <div
        className="p-6 cursor-pointer hover:bg-amber-50/50 dark:hover:bg-ink-700/30 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-2xl font-bold text-ink-900 dark:text-ink-100 mb-1 tracking-wider">
              {poem.title}
            </h3>
            <p className="text-sm text-ink-600 dark:text-ink-400">
              <span className="font-medium">{poem.author}</span> · {poem.dynasty}
              {poem.year && <span className="ml-2 text-ink-400 dark:text-ink-500">{poem.year}</span>}
            </p>
          </div>
          <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">
            {schoolName}
          </span>
        </div>

        {/* 原文 */}
        <pre className="font-serif text-ink-800 dark:text-ink-200 whitespace-pre-wrap text-lg leading-loose tracking-wider font-style: italic">
          {poem.content}
        </pre>

        <div className="mt-4 flex flex-wrap gap-2">
          {poem.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-ink-100 dark:bg-ink-700 text-ink-600 dark:text-ink-300 px-2 py-1 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="mt-3 text-sm text-amber-600 dark:text-amber-400">
          {expanded ? '收起 ↑' : '展开译文与赏析 ↓'}
        </div>
      </div>

      {expanded && (
        <div className="px-6 pb-6 pt-2 border-t border-ink-100 dark:border-ink-700 space-y-4">
          <div>
            <h4 className="text-sm font-bold text-amber-700 dark:text-amber-400 mb-2">白话译文</h4>
            <p className="text-ink-700 dark:text-ink-300 leading-relaxed">{poem.translation}</p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-amber-700 dark:text-amber-400 mb-2">艺术赏析</h4>
            <p className="text-ink-700 dark:text-ink-300 leading-relaxed">{poem.appreciation}</p>
          </div>
        </div>
      )}
    </article>
  );
}
