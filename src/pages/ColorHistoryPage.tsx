/**
 * 历史色谱 / 染料演变
 * @see ITERATIONS.md #96
 */

import { useState } from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import { DYNASTY_PALETTES, ALL_HISTORICAL_COLORS, COLORS_BY_CATEGORY, type DynastyPalette } from '@/data/features/colorHistory';
import { useT } from '@/i18n/i18n';

export default function ColorHistoryPage() {
  const t = useT();
  const [activeTab, setActiveTab] = useState<'dynasty' | 'color' | 'category'>('dynasty');
  const [selectedDynasty, setSelectedDynasty] = useState<DynastyPalette | null>(null);
  const [copiedHex, setCopiedHex] = useState('');

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(''), 1500);
  };

  /* 分享海报 */
  const handleShare = (palette: DynastyPalette) => {
    const text = `【${palette.dynasty}色谱】${palette.colors.map(c => `${c.name}(${c.hex})`).join(' · ')}`;
    navigator.clipboard.writeText(text);
    alert(t('colorHistory.shareSuccess'));
  };

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 头部 */}
        <RevealOnScroll>
          <SectionHeader
            label="HISTORICAL COLOR"
            title={t('colorHistory.title')}
            description={t('colorHistory.description')}
          />
        </RevealOnScroll>

        {/* Tab 导航 */}
        <RevealOnScroll delay={100}>
          <div className="flex gap-2 mt-6 mb-8">
            {[
              { id: 'dynasty' as const, labelKey: 'colorHistory.tabDynasty', emoji: '🎨' },
              { id: 'color' as const, labelKey: 'colorHistory.tabColor', emoji: '🌈' },
              { id: 'category' as const, labelKey: 'colorHistory.tabCategory', emoji: '📂' },
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
                {tab.emoji} {t(tab.labelKey)}
              </button>
            ))}
          </div>
        </RevealOnScroll>

        {/* Tab 1: 朝代色盘 */}
        {activeTab === 'dynasty' && (
          <RevealOnScroll direction="up" delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {DYNASTY_PALETTES.map(palette => (
                <div
                  key={palette.id}
                  className="bg-white dark:bg-ink-900 rounded-2xl border-2 border-ink-200 dark:border-ink-700 shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer"
                  onClick={() => setSelectedDynasty(palette)}
                >
                  {/* 色条 */}
                  <div className="h-24 flex">
                    {palette.colors.map(color => (
                      <div
                        key={color.id}
                        className="flex-1"
                        style={{ backgroundColor: color.hex }}
                        title={`${color.name} ${color.hex}`}
                      />
                    ))}
                  </div>

                  {/* 信息 */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-1">
                      {palette.dynasty}
                    </h3>
                    <p className="text-xs text-ink-500 mb-2">{palette.era}</p>
                    <p className="text-sm text-ink-600 dark:text-ink-400 line-clamp-2 mb-3">
                      {palette.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {palette.colors.slice(0, 3).map(c => (
                        <span
                          key={c.id}
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: c.hex + '30',
                            color: c.hex,
                          }}
                        >
                          {c.name}
                        </span>
                      ))}
                      {palette.colors.length > 3 && (
                        <span className="text-xs text-ink-400">+{palette.colors.length - 3}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 朝代详情弹窗 */}
            {selectedDynasty && (
              <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4">
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedDynasty(null)} />
                <div className="relative bg-white dark:bg-ink-900 rounded-2xl shadow-2xl max-w-2xl w-full my-8 border border-ink-200 dark:border-ink-700">
                  {/* 顶部色条 */}
                  <div className="h-32 flex">
                    {selectedDynasty.colors.map(color => (
                      <div
                        key={color.id}
                        className="flex-1"
                        style={{ backgroundColor: color.hex }}
                      />
                    ))}
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold text-ink-900 dark:text-ink-100">{selectedDynasty.dynasty}</h2>
                        <p className="text-sm text-ink-500">{selectedDynasty.era}</p>
                      </div>
                      <button
                        onClick={() => handleShare(selectedDynasty)}
                        className="px-4 py-2 rounded-lg bg-accent text-white font-bold text-sm hover:bg-accent/90"
                      >
                        📤 {t('colorHistory.share')}
                      </button>
                    </div>

                    <p className="text-ink-700 dark:text-ink-300">{selectedDynasty.description}</p>

                    {/* 颜色卡片 */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {selectedDynasty.colors.map(color => (
                        <div
                          key={color.id}
                          className="rounded-xl overflow-hidden border border-ink-200 dark:border-ink-700"
                        >
                          <div
                            className="h-20 cursor-pointer"
                            style={{ backgroundColor: color.hex }}
                            onClick={() => handleCopyHex(color.hex)}
                            title={t('colorHistory.clickToCopy')}
                          />
                          <div className="p-3 bg-white dark:bg-ink-800">
                            <div className="flex items-center justify-between">
                              <h4 className="font-bold text-ink-900 dark:text-ink-100">{color.name}</h4>
                              <button
                                onClick={() => handleCopyHex(color.hex)}
                                className="text-xs px-2 py-1 rounded bg-ink-100 dark:bg-ink-700 text-ink-600 dark:text-ink-400 hover:bg-accent hover:text-white transition-colors"
                              >
                                {copiedHex === color.hex ? `✓ ${t('colorHistory.copied')}` : t('colorHistory.copy')}
                              </button>
                            </div>
                            <p className="text-xs text-ink-500 font-mono mt-1">{color.hex}</p>
                            <p className="text-xs text-ink-400 mt-1">{color.source}</p>
                            <p className="text-xs text-ink-600 dark:text-ink-400 mt-2 line-clamp-2">{color.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* 染料方法 */}
                    <div>
                      <h4 className="font-bold text-ink-900 dark:text-ink-100 mb-2">🧪 {t('colorHistory.dyeMethods')}</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedDynasty.dyeMethods.map(method => (
                          <span key={method} className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 text-sm">
                            {method}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 文化含义 */}
                    <div className="p-4 rounded-xl bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700">
                      <h4 className="font-bold text-ink-900 dark:text-ink-100 mb-1">📜 {t('colorHistory.culturalMeaning')}</h4>
                      <p className="text-sm text-ink-600 dark:text-ink-400">{selectedDynasty.culturalMeaning}</p>
                    </div>

                    <button
                      onClick={() => setSelectedDynasty(null)}
                      className="w-full py-3 rounded-xl bg-ink-100 dark:bg-ink-800 font-bold text-ink-700 dark:text-ink-300 hover:bg-ink-200 dark:hover:bg-ink-700"
                    >
                      {t('common.close')}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </RevealOnScroll>
        )}

        {/* Tab 2: 颜色大全 */}
        {activeTab === 'color' && (
          <RevealOnScroll direction="up" delay={200}>
            <div className="bg-white dark:bg-ink-900 rounded-2xl border-2 border-ink-200 dark:border-ink-700 p-6 shadow-lg">
              <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-6">🌈 {t('colorHistory.allColorsTitle', { count: ALL_HISTORICAL_COLORS.length })}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {ALL_HISTORICAL_COLORS.map(color => (
                  <div
                    key={color.id}
                    className="rounded-xl overflow-hidden border border-ink-200 dark:border-ink-700 hover:shadow-lg transition-shadow"
                  >
                    <div
                      className="h-24 cursor-pointer"
                      style={{ backgroundColor: color.hex }}
                      onClick={() => handleCopyHex(color.hex)}
                    />
                    <div className="p-3 bg-white dark:bg-ink-800">
                      <h4 className="font-bold text-sm text-ink-900 dark:text-ink-100">{color.name}</h4>
                      <p className="text-xs text-ink-500 font-mono">{color.hex}</p>
                      <p className="text-xs text-accent mt-1">{color.dynasty}</p>
                      <button
                        onClick={() => handleCopyHex(color.hex)}
                        className="mt-2 w-full text-xs py-1 rounded bg-ink-100 dark:bg-ink-700 text-ink-600 dark:text-ink-400 hover:bg-accent hover:text-white transition-colors"
                      >
                        {copiedHex === color.hex ? `✓ ${t('colorHistory.copied')}` : t('colorHistory.copyColorValue')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        )}

        {/* Tab 3: 按用途分类 */}
        {activeTab === 'category' && (
          <RevealOnScroll direction="up" delay={200}>
            <div className="space-y-6">
              {[
                { key: 'royal', labelKey: 'colorHistory.catRoyal', emoji: '👑', descKey: 'colorHistory.catRoyalDesc', color: 'from-red-500 to-orange-500' },
                { key: 'common', labelKey: 'colorHistory.catCommon', emoji: '🏠', descKey: 'colorHistory.catCommonDesc', color: 'from-green-500 to-teal-500' },
                { key: 'ritual', labelKey: 'colorHistory.catRitual', emoji: '🏛️', descKey: 'colorHistory.catRitualDesc', color: 'from-purple-500 to-indigo-500' },
                { key: 'dyed', labelKey: 'colorHistory.catDyed', emoji: '🧪', descKey: 'colorHistory.catDyedDesc', color: 'from-blue-500 to-cyan-500' },
              ].map(cat => {
                const colors = COLORS_BY_CATEGORY[cat.key as keyof typeof COLORS_BY_CATEGORY];
                return (
                  <div key={cat.key} className="bg-white dark:bg-ink-900 rounded-2xl border-2 border-ink-200 dark:border-ink-700 shadow-lg overflow-hidden">
                    <div className={`bg-gradient-to-r ${cat.color} p-4 text-white`}>
                      <h3 className="text-lg font-bold">{cat.emoji} {t(cat.labelKey)}</h3>
                      <p className="text-sm opacity-90">{t(cat.descKey)}（{t('colorHistory.colorCount', { count: colors.length })}）</p>
                    </div>
                    <div className="flex h-16">
                      {colors.map(color => (
                        <div
                          key={color.id}
                          className="flex-1 cursor-pointer group relative"
                          style={{ backgroundColor: color.hex }}
                          onClick={() => handleCopyHex(color.hex)}
                        >
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <span className="text-white font-bold text-sm drop-shadow-lg">{color.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-2">
                      {colors.map(color => (
                        <div key={color.id} className="flex items-center gap-2 p-2 rounded-lg bg-ink-50 dark:bg-ink-800">
                          <div className="w-8 h-8 rounded-lg flex-shrink-0" style={{ backgroundColor: color.hex }} />
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-ink-900 dark:text-ink-100 truncate">{color.name}</p>
                            <p className="text-xs text-ink-500 font-mono">{color.hex}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </RevealOnScroll>
        )}
      </div>
    </div>
  );
}
