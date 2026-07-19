/**
 * 文学艺术·书画页
 * 列表 + 高清图原生放大（ZoomableImage 组件）
 */
import { useMemo, useState } from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import ZoomableImage from '@/components/common/ZoomableImage';
import { PAINTINGS } from '@/data/features/paintingData';

type CategoryFilter = 'all' | 'calligraphy' | 'painting';

export default function PaintingPage() {
  const [filter, setFilter] = useState<CategoryFilter>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (filter === 'all') return PAINTINGS;
    return PAINTINGS.filter((p) => p.category === filter);
  }, [filter]);

  const selected = useMemo(
    () => PAINTINGS.find((p) => p.id === selectedId) || null,
    [selectedId],
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-stone-100 dark:from-ink-950 dark:via-ink-950 dark:to-ink-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="文学艺术"
          title="书画长廊"
          description="高清书画影像，点击图片可放大细看笔墨细节"
        />

        {/* 分类切换 */}
        <RevealOnScroll>
          <div className="flex justify-center gap-2 mb-10">
            {([
              { id: 'all', label: '全部' },
              { id: 'calligraphy', label: '书法' },
              { id: 'painting', label: '绘画' },
            ] as { id: CategoryFilter; label: string }[]).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                  filter === tab.id
                    ? 'bg-gradient-to-r from-amber-600 to-stone-700 text-white shadow-lg'
                    : 'bg-white dark:bg-ink-800 text-ink-700 dark:text-ink-300 hover:shadow-md'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </RevealOnScroll>

        {/* 列表网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, idx) => (
            <RevealOnScroll key={item.id} delay={idx * 50}>
              <article
                className="bg-white dark:bg-ink-800 rounded-2xl shadow-lg overflow-hidden border border-ink-100 dark:border-ink-700 hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => setSelectedId(item.id)}
              >
                <ZoomableImage
                  src={item.imageUrl}
                  alt={item.title}
                  className="aspect-[4/3]"
                  previewHint="🔍 点击查看大图"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-1">{item.title}</h3>
                  <p className="text-sm text-ink-600 dark:text-ink-400">
                    <span className="font-medium">{item.author}</span> · {item.dynasty}
                  </p>
                  <p className="text-xs text-ink-500 dark:text-ink-500 mt-2 line-clamp-2">{item.summary}</p>
                  <p className="text-xs text-amber-700 dark:text-amber-400 mt-2">📍 {item.collection}</p>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>

        {/* 详情抽屉 */}
        {selected && (
          <div
            className="fixed inset-0 z-40 bg-black/60 flex items-end md:items-center justify-center p-4"
            onClick={() => setSelectedId(null)}
          >
            <div
              className="bg-white dark:bg-ink-900 rounded-t-3xl md:rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-ink-100 dark:border-ink-700 flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-ink-900 dark:text-ink-100">{selected.title}</h2>
                  <p className="text-sm text-ink-600 dark:text-ink-400 mt-1">
                    {selected.author} · {selected.dynasty} · {selected.year}
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
                    alt={selected.title}
                    className="w-full"
                    previewHint="🔍 点击放大查看笔墨细节"
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-ink-500 dark:text-ink-500 mb-1">形制</div>
                    <div className="text-ink-800 dark:text-ink-200">{selected.format}</div>
                  </div>
                  <div>
                    <div className="text-ink-500 dark:text-ink-500 mb-1">现藏地</div>
                    <div className="text-ink-800 dark:text-ink-200">{selected.collection}</div>
                  </div>
                  <div>
                    <div className="text-ink-500 dark:text-ink-500 mb-1">分类</div>
                    <div className="text-ink-800 dark:text-ink-200">
                      {selected.category === 'calligraphy' ? '书法' : '绘画'}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-amber-700 dark:text-amber-400 mb-2">作品简介</h3>
                  <p className="text-ink-700 dark:text-ink-300 leading-relaxed">{selected.summary}</p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-amber-700 dark:text-amber-400 mb-2">艺术解读</h3>
                  <p className="text-ink-700 dark:text-ink-300 leading-relaxed">{selected.analysis}</p>
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
