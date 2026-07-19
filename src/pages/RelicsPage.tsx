/**
 * 文物与考古页 — 文物图鉴
 * 每件文物绑定：出土背景 + 工艺解读 + 现藏地
 * 通过 relicApi service 访问数据，未来可无缝替换为博物馆 API
 */
import { useEffect, useMemo, useState } from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import ZoomableImage from '@/components/common/ZoomableImage';
import { fetchRelics, getRelicCategories, type RelicQuery } from '@/services/relicApi';
import type { Relic } from '@/types/relic';

const CATEGORY_LABEL: Record<string, string> = {
  bronze: '青铜',
  jade: '玉器',
  ceramic: '陶瓷',
  'gold-silver': '金银',
  silk: '丝织',
  bamboo: '竹木',
  bone: '骨甲',
};

const GRADE_LABEL: Record<string, string> = {
  '国宝级': '🏛 国宝级',
  '一级': '⭐ 一级',
};

export default function RelicsPage() {
  const [relics, setRelics] = useState<Relic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<RelicQuery>({});
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchRelics(query)
      .then((data) => {
        if (!cancelled) setRelics(data);
      })
      .catch((e) => {
        if (!cancelled) setError(e.message || '加载失败');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [query]);

  const categories = useMemo(() => getRelicCategories(), []);
  const selected = useMemo(
    () => relics.find((r) => r.id === selectedId) || null,
    [relics, selectedId],
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-amber-50 to-stone-100 dark:from-ink-950 dark:via-ink-950 dark:to-ink-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="文物与考古"
          title="国宝图鉴"
          description="每件文物绑定出土背景、工艺解读与现藏地，触摸历史的真实质感"
        />

        {/* 筛选栏 */}
        <RevealOnScroll>
          <div className="bg-white dark:bg-ink-800 rounded-2xl shadow-md p-4 mb-8 flex flex-wrap gap-3 items-center">
            <span className="text-sm font-bold text-ink-700 dark:text-ink-300">分类：</span>
            <button
              onClick={() => setQuery((q) => ({ ...q, category: undefined }))}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                !query.category
                  ? 'bg-stone-700 text-white'
                  : 'bg-stone-100 dark:bg-ink-700 text-ink-600 dark:text-ink-300'
              }`}
            >
              全部
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setQuery((q) => ({ ...q, category: cat.id }))}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  query.category === cat.id
                    ? 'bg-stone-700 text-white'
                    : 'bg-stone-100 dark:bg-ink-700 text-ink-600 dark:text-ink-300'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </RevealOnScroll>

        {loading && <div className="text-center py-12 text-ink-400">加载中...</div>}
        {error && (
          <div className="text-center py-12 text-red-500">
            {error}
            <button
              onClick={() => window.location.reload()}
              className="block mx-auto mt-3 px-4 py-1.5 rounded bg-ink-100 dark:bg-ink-800 text-sm"
            >
              重试
            </button>
          </div>
        )}

        {!loading && !error && relics.length === 0 && (
          <div className="text-center py-12 text-ink-400">暂无该分类的文物数据</div>
        )}

        {/* 文物网格 */}
        {!loading && !error && relics.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relics.map((relic, idx) => (
              <RevealOnScroll key={relic.id} delay={idx * 50}>
                <article
                  className="bg-white dark:bg-ink-800 rounded-2xl shadow-lg overflow-hidden border border-ink-100 dark:border-ink-700 hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => setSelectedId(relic.id)}
                >
                  <ZoomableImage
                    src={relic.imageUrl}
                    alt={relic.name}
                    className="aspect-[4/3]"
                    previewHint="🔍 点击查看详情"
                    placeholderEmoji="🏛"
                  />
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100">{relic.name}</h3>
                      <span className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-2 py-1 rounded text-xs whitespace-nowrap">
                        {GRADE_LABEL[relic.grade] || relic.grade}
                      </span>
                    </div>
                    <p className="text-xs text-ink-600 dark:text-ink-400 mb-2">
                      {relic.dynasty} · {relic.year}
                    </p>
                    <p className="text-xs text-ink-500 dark:text-ink-500 mb-2 line-clamp-2">{relic.summary}</p>
                    <p className="text-xs text-amber-700 dark:text-amber-400">📍 {relic.collection}</p>
                  </div>
                </article>
              </RevealOnScroll>
            ))}
          </div>
        )}

        {/* 详情弹窗 */}
        {selected && (
          <div
            className="fixed inset-0 z-40 bg-black/60 flex items-end md:items-center justify-center p-4"
            onClick={() => setSelectedId(null)}
          >
            <div
              className="bg-white dark:bg-ink-900 rounded-t-3xl md:rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-ink-100 dark:border-ink-700 flex items-start justify-between sticky top-0 bg-white dark:bg-ink-900 z-10">
                <div>
                  <h2 className="text-2xl font-bold text-ink-900 dark:text-ink-100">{selected.name}</h2>
                  <p className="text-sm text-ink-600 dark:text-ink-400 mt-1">
                    {selected.dynasty} · {selected.year} · {CATEGORY_LABEL[selected.category] || selected.category}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedId(null)}
                  className="text-ink-400 hover:text-ink-700 dark:hover:text-ink-200 text-2xl px-2"
                  aria-label="关闭"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="rounded-2xl overflow-hidden bg-ink-100 dark:bg-ink-800">
                  <ZoomableImage
                    src={selected.imageUrl}
                    alt={selected.name}
                    className="w-full"
                    previewHint="🔍 点击放大查看细节"
                    placeholderEmoji="🏛"
                  />
                </div>

                {/* 出土背景 */}
                <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 dark:border-amber-600 p-4 rounded-r-lg">
                  <h3 className="text-lg font-bold text-amber-800 dark:text-amber-300 mb-2">⛏ 出土背景</h3>
                  <div className="text-sm space-y-1 text-amber-900 dark:text-amber-200">
                    <p><strong>遗址：</strong>{selected.excavation.site}</p>
                    <p><strong>地点：</strong>{selected.excavation.location}</p>
                    <p><strong>发掘时间：</strong>{selected.excavation.year}</p>
                    <p className="mt-2 leading-relaxed">{selected.excavation.context}</p>
                  </div>
                </div>

                {/* 工艺解读 */}
                <div>
                  <h3 className="text-lg font-bold text-stone-700 dark:text-stone-300 mb-2">🔨 工艺解读</h3>
                  <p className="text-ink-700 dark:text-ink-300 leading-relaxed">{selected.craftsmanship}</p>
                </div>

                {/* 现藏地 */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-ink-500 dark:text-ink-500 mb-1">现藏地</div>
                    <div className="text-ink-800 dark:text-ink-200">📍 {selected.collection}</div>
                  </div>
                  <div>
                    <div className="text-ink-500 dark:text-ink-500 mb-1">文物等级</div>
                    <div className="text-ink-800 dark:text-ink-200">{GRADE_LABEL[selected.grade] || selected.grade}</div>
                  </div>
                </div>

                {/* 文化意义 */}
                <div>
                  <h3 className="text-lg font-bold text-stone-700 dark:text-stone-300 mb-2">📜 文化意义</h3>
                  <p className="text-ink-700 dark:text-ink-300 leading-relaxed">{selected.significance}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {selected.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-ink-100 dark:bg-ink-700 text-ink-600 dark:text-ink-300 px-2 py-1 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
