/**
 * 历代居住文化与建筑页面
 * 展示都城规划、宫殿建筑、民居形制、园林艺术、村落聚落
 */

import { useState } from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import {
  DWELLING_ENTRIES,
  DWELLINGS_BY_CATEGORY,
  DWELLING_CATEGORY_LABELS,
  type DwellingCategory,
} from '@/data/features/dwellingHistory';
import { useT } from '@/i18n/i18n';

const CATEGORY_ICONS: Record<DwellingCategory, string> = {
  capital: '[城]',
  palace: '[宫]',
  residence: '[宅]',
  garden: '[园]',
  village: '[村]',
};

export default function DwellingHistoryPage() {
  const t = useT();
  const [activeCategory, setActiveCategory] = useState<DwellingCategory | 'all'>('all');

  const displayList = activeCategory === 'all' ? DWELLING_ENTRIES : DWELLINGS_BY_CATEGORY[activeCategory];

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll threshold={0.01}>
          <SectionHeader
            label="HISTORICAL DWELLING"
            title={t('dwellingHistory.title')}
            description={t('dwellingHistory.description')}
          />
        </RevealOnScroll>

        <RevealOnScroll delay={100} threshold={0.01}>
          <div className="flex flex-wrap gap-2 mt-6 mb-8">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                activeCategory === 'all'
                  ? 'bg-accent text-white shadow-lg'
                  : 'bg-white/70 dark:bg-ink-900/70 text-ink-600 dark:text-ink-400 hover:bg-ink-100'
              }`}
            >
              {t('dwellingHistory.all')} ({DWELLING_ENTRIES.length})
            </button>
            {(Object.keys(DWELLINGS_BY_CATEGORY) as DwellingCategory[]).map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-accent text-white shadow-lg'
                    : 'bg-white/70 dark:bg-ink-900/70 text-ink-600 dark:text-ink-400 hover:bg-ink-100'
                }`}
              >
                {CATEGORY_ICONS[cat]} {DWELLING_CATEGORY_LABELS[cat]} ({DWELLINGS_BY_CATEGORY[cat].length})
              </button>
            ))}
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayList.map((entry, idx) => (
            <RevealOnScroll key={entry.id} delay={idx * 50} threshold={0.01}>
              <div className="bg-white dark:bg-ink-900 rounded-2xl border-2 border-ink-200 dark:border-ink-700 shadow-lg overflow-hidden hover:shadow-xl transition-all h-full">
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100">{entry.name}</h3>
                    <span className="text-xs px-2 py-0.5 rounded bg-accent/10 text-accent">
                      {CATEGORY_ICONS[entry.category]} {DWELLING_CATEGORY_LABELS[entry.category]}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-ink-500 mb-3">
                    <span>{entry.dynasty}</span>
                    <span>·</span>
                    <span>{entry.location}</span>
                  </div>
                  <p className="text-sm text-ink-600 dark:text-ink-400 mb-3">{entry.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {entry.features.map((f, i) => (
                      <span key={i} className="text-xs px-2 py-0.5 rounded bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-400">
                        {f}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-ink-500 italic">{entry.historicalNote}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </div>
  );
}
