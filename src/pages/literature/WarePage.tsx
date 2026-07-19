/**
 * 文学艺术·器物页
 */
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import ZoomableImage from '@/components/common/ZoomableImage';
import { WARES } from '@/data/features/wareData';

const CATEGORY_LABEL: Record<string, string> = {
  bronze: '青铜',
  jade: '玉器',
  porcelain: '瓷器',
  lacquer: '漆器',
  'gold-silver': '金银',
};

export default function WarePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-stone-100 dark:from-ink-950 dark:via-ink-950 dark:to-ink-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="文学艺术"
          title="器物精粹"
          description="青铜、玉器、瓷器、漆器，材质之中见工艺之美"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {WARES.map((ware, idx) => (
            <RevealOnScroll key={ware.id} delay={idx * 50}>
              <article className="bg-white dark:bg-ink-800 rounded-2xl shadow-lg overflow-hidden border border-ink-100 dark:border-ink-700">
                <ZoomableImage
                  src={ware.imageUrl}
                  alt={ware.name}
                  className="aspect-[4/3]"
                  previewHint="🔍 点击查看大图"
                  placeholderEmoji="🏺"
                />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-ink-900 dark:text-ink-100">{ware.name}</h3>
                    <span className="bg-stone-200 dark:bg-ink-700 text-stone-700 dark:text-ink-200 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                      {CATEGORY_LABEL[ware.category] || ware.category}
                    </span>
                  </div>

                  <p className="text-sm text-ink-600 dark:text-ink-400 mb-1">
                    {ware.dynasty} · {ware.material} · {ware.year}
                  </p>
                  <p className="text-xs text-ink-500 dark:text-ink-500 mb-3">{ware.format}</p>

                  <div className="space-y-3 text-sm">
                    <div>
                      <h4 className="font-bold text-stone-700 dark:text-stone-300 mb-1">简介</h4>
                      <p className="text-ink-700 dark:text-ink-300 leading-relaxed">{ware.summary}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-700 dark:text-stone-300 mb-1">工艺解读</h4>
                      <p className="text-ink-700 dark:text-ink-300 leading-relaxed">{ware.craftsmanship}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-700 dark:text-stone-300 mb-1">文化意义</h4>
                      <p className="text-ink-700 dark:text-ink-300 leading-relaxed">{ware.significance}</p>
                    </div>
                  </div>

                  <p className="text-xs text-amber-700 dark:text-amber-400 mt-3">📍 现藏：{ware.collection}</p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {ware.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-ink-100 dark:bg-ink-700 text-ink-600 dark:text-ink-300 px-2 py-1 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </div>
  );
}
