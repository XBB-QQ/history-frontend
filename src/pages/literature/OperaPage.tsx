/**
 * 文学艺术·戏曲页
 */
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import { OPERAS } from '@/data/features/operaData';

export default function OperaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-amber-50 to-yellow-50 dark:from-ink-950 dark:via-ink-950 dark:to-ink-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="文学艺术"
          title="戏曲百花园"
          description="昆曲、京剧、元杂剧、川剧，中华戏曲千年流变"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {OPERAS.map((opera, idx) => (
            <RevealOnScroll key={opera.id} delay={idx * 50}>
              <article className="bg-white dark:bg-ink-800 rounded-2xl shadow-lg p-6 border border-ink-100 dark:border-ink-700 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-ink-900 dark:text-ink-100 mb-1">
                      {opera.name}
                    </h3>
                    {opera.englishName && (
                      <p className="text-xs text-ink-500 dark:text-ink-500">{opera.englishName}</p>
                    )}
                  </div>
                  <span className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                    {opera.dynasty}
                  </span>
                </div>

                <p className="text-sm text-ink-600 dark:text-ink-400 mb-1">发源地：{opera.origin}</p>
                <p className="text-sm text-amber-700 dark:text-amber-400 font-medium mb-3">{opera.status}</p>

                {opera.unesco && (
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-600 p-3 mb-3 rounded-r-lg">
                    <p className="text-xs text-yellow-800 dark:text-yellow-300">🌍 {opera.unesco}</p>
                  </div>
                )}

                <div className="space-y-3 text-sm">
                  <div>
                    <h4 className="font-bold text-red-700 dark:text-red-400 mb-1">艺术特点</h4>
                    <p className="text-ink-700 dark:text-ink-300 leading-relaxed">{opera.features}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-red-700 dark:text-red-400 mb-1">历史源流</h4>
                    <p className="text-ink-700 dark:text-ink-300 leading-relaxed">{opera.history}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-red-700 dark:text-red-400 mb-2">代表剧目</h4>
                    <div className="flex flex-wrap gap-2">
                      {opera.repertoire.map((rep) => (
                        <span
                          key={rep}
                          className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-2 py-1 rounded text-xs"
                        >
                          {rep}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {opera.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-ink-100 dark:bg-ink-700 text-ink-600 dark:text-ink-300 px-2 py-1 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </div>
  );
}
