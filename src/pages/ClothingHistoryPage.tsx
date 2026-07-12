/**
 * 历代服饰演变与文化页面
 * 展示先秦至清代的服饰特征、等级制度、材质工艺
 */

import { useState } from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import {
  DYNASTY_CLOTHING,
  CLOTHING_BY_TYPE,
  CLOTHING_TYPE_LABELS,
  type ClothingType,
  type DynastyClothing,
} from '@/data/features/clothingHistory';
import { useT } from '@/i18n/i18n';

const TYPE_ICONS: Record<ClothingType, string> = {
  headwear: '[冠]',
  top: '[衣]',
  bottom: '[裳]',
  footwear: '[履]',
  accessory: '[饰]',
  full: '[袍]',
};

export default function ClothingHistoryPage() {
  const t = useT();
  const [activeTab, setActiveTab] = useState<'dynasty' | 'type'>('dynasty');
  const [selectedDynasty, setSelectedDynasty] = useState<DynastyClothing | null>(null);

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll threshold={0.01}>
          <SectionHeader
            label="HISTORICAL COSTUME"
            title={t('clothingHistory.title')}
            description={t('clothingHistory.description')}
          />
        </RevealOnScroll>

        <RevealOnScroll delay={100} threshold={0.01}>
          <div className="flex gap-2 mt-6 mb-8">
            {[
              { id: 'dynasty' as const, labelKey: 'clothingHistory.tabDynasty', icon: '[朝]' },
              { id: 'type' as const, labelKey: 'clothingHistory.tabType', icon: '[类]' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-accent text-white shadow-lg'
                    : 'bg-white/70 dark:bg-ink-900/70 text-ink-600 dark:text-ink-400 hover:bg-ink-100 dark:hover:bg-ink-800'
                }`}
              >
                {tab.icon} {t(tab.labelKey)}
              </button>
            ))}
          </div>
        </RevealOnScroll>

        {activeTab === 'dynasty' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DYNASTY_CLOTHING.map((dynasty, idx) => (
              <RevealOnScroll key={dynasty.id} delay={idx * 50} threshold={0.01}>
                <div
                  className="bg-white dark:bg-ink-900 rounded-2xl border-2 border-ink-200 dark:border-ink-700 shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer h-full"
                  onClick={() => setSelectedDynasty(dynasty)}
                >
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-ink-900 dark:text-ink-100">{dynasty.dynasty}</h3>
                      <span className="text-xs text-ink-500">{dynasty.era}</span>
                    </div>
                    <p className="text-sm text-ink-600 dark:text-ink-400 mb-4 line-clamp-2">{dynasty.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {dynasty.clothingItems.slice(0, 4).map((item, i) => (
                        <span key={i} className="text-xs px-2 py-1 rounded bg-accent/10 text-accent">
                          {TYPE_ICONS[item.type]} {item.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        )}

        {activeTab === 'type' && (
          <div className="space-y-8">
            {(Object.keys(CLOTHING_BY_TYPE) as ClothingType[]).map(type => {
              const items = CLOTHING_BY_TYPE[type];
              if (items.length === 0) return null;
              return (
                <RevealOnScroll key={type} threshold={0.01}>
                  <div>
                    <h3 className="text-lg font-bold text-ink-800 dark:text-ink-200 mb-4 flex items-center gap-2">
                      <span className="text-accent">{TYPE_ICONS[type]}</span>
                      {CLOTHING_TYPE_LABELS[type]}
                      <span className="text-sm text-ink-500">({items.length})</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {items.map((item, i) => (
                        <div
                          key={i}
                          className="p-4 rounded-xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-bold text-ink-900 dark:text-ink-100">{item.name}</span>
                            <span className="text-xs text-ink-500">{item.dynasty}</span>
                          </div>
                          <p className="text-sm text-ink-600 dark:text-ink-400 mb-2">{item.description}</p>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {item.wearers.map(w => (
                              <span key={w} className="text-xs px-1.5 py-0.5 rounded bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-400">
                                {w}
                              </span>
                            ))}
                          </div>
                          <p className="text-xs text-ink-500 italic">{item.historicalNote}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        )}

        {selectedDynasty && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setSelectedDynasty(null)}
          >
            <div
              className="bg-white dark:bg-ink-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-ink-900 dark:text-ink-100">{selectedDynasty.dynasty}</h2>
                  <p className="text-sm text-ink-500">{selectedDynasty.era}</p>
                </div>
                <button
                  onClick={() => setSelectedDynasty(null)}
                  className="text-ink-400 hover:text-ink-600 text-2xl leading-none"
                >
                  ×
                </button>
              </div>

              <p className="text-ink-700 dark:text-ink-300 mb-4">{selectedDynasty.description}</p>

              <div className="mb-4">
                <h4 className="text-sm font-bold text-ink-800 dark:text-ink-200 mb-2">{t('clothingHistory.features')}</h4>
                <ul className="space-y-1">
                  {selectedDynasty.features.map((f, i) => (
                    <li key={i} className="text-sm text-ink-600 dark:text-ink-400 flex items-start gap-2">
                      <span className="text-accent mt-0.5">·</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3 mb-4">
                <h4 className="text-sm font-bold text-ink-800 dark:text-ink-200">{t('clothingHistory.items')}</h4>
                {selectedDynasty.clothingItems.map((item, i) => (
                  <div key={i} className="p-3 rounded-lg border border-ink-200 dark:border-ink-700 bg-ink-50 dark:bg-ink-800">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-accent">{TYPE_ICONS[item.type]} {item.name}</span>
                      <span className="text-xs text-ink-500">{CLOTHING_TYPE_LABELS[item.type]}</span>
                    </div>
                    <p className="text-sm text-ink-600 dark:text-ink-400 mb-1">{item.description}</p>
                    <div className="flex flex-wrap gap-1 mb-1">
                      <span className="text-xs text-ink-500">{t('clothingHistory.wearers')}:</span>
                      {item.wearers.map(w => (
                        <span key={w} className="text-xs text-ink-600 dark:text-ink-400">{w}</span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1 mb-1">
                      <span className="text-xs text-ink-500">{t('clothingHistory.materials')}:</span>
                      {item.materials.map(m => (
                        <span key={m} className="text-xs text-ink-600 dark:text-ink-400">{m}</span>
                      ))}
                    </div>
                    <p className="text-xs text-ink-500 italic mt-1">{item.historicalNote}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-accent/5">
                  <h5 className="text-xs font-bold text-accent mb-1">{t('clothingHistory.colorSystem')}</h5>
                  <p className="text-xs text-ink-600 dark:text-ink-400">{selectedDynasty.colorSystem}</p>
                </div>
                <div className="p-3 rounded-lg bg-accent/5">
                  <h5 className="text-xs font-bold text-accent mb-1">{t('clothingHistory.rankSystem')}</h5>
                  <p className="text-xs text-ink-600 dark:text-ink-400">{selectedDynasty.rankSystem}</p>
                </div>
                <div className="p-3 rounded-lg bg-accent/5">
                  <h5 className="text-xs font-bold text-accent mb-1">{t('clothingHistory.culturalMeaning')}</h5>
                  <p className="text-xs text-ink-600 dark:text-ink-400">{selectedDynasty.culturalMeaning}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
