import { useEffect, useState, useMemo } from 'react';
import { fetchDynasties } from '@/services/api';
import type { FrontendDynasty } from '@/services/api';
import RevealOnScroll from '@/components/common/RevealOnScroll';

/** 朝代可视化页面 */
function VisualizePage() {
  const [dynasties, setDynasties] = useState<FrontendDynasty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDynasties().then(setDynasties).finally(() => setLoading(false));
  }, []);

  // 计算每个朝代持续时间
  const dynastyStats = useMemo(() => {
    return dynasties
      .filter((d) => d.periodStart !== null && d.periodEnd !== null)
      .map((d) => ({
        name: d.name,
        start: d.periodStart!,
        end: d.periodEnd!,
        duration: d.periodEnd! - d.periodStart!,
        color: getDynastyColor(d.name),
      }))
      .sort((a, b) => a.start - b.start);
  }, [dynasties]);

  const maxDuration = Math.max(...dynastyStats.map((d) => d.duration), 1);

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        <RevealOnScroll direction="fade">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-ink-900 dark:text-ink-100 mb-2">
              数据可视化
            </h1>
            <p className="text-ink-500 dark:text-ink-400">
              用图表探索中国历史
            </p>
          </div>
        </RevealOnScroll>

        {/* 朝代持续时间条形图 */}
        <RevealOnScroll direction="scale" threshold={0.1}>
          <div className="bg-white/80 dark:bg-ink-900/80 rounded-2xl shadow-lg p-6 border border-ink-200 dark:border-ink-700 mb-8">
            <h2 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-4">
              各朝代持续时间（年）
            </h2>
            {loading ? (
              <div className="text-center py-10 text-ink-400">加载中...</div>
            ) : dynastyStats.length === 0 ? (
              <div className="text-center py-10 text-ink-400">暂无数据</div>
            ) : (
              <div className="space-y-2">
                {dynastyStats.map((d) => (
                  <div key={d.name} className="flex items-center gap-3">
                    <span className="text-sm font-bold text-ink-700 dark:text-ink-300 w-16 text-right flex-shrink-0">
                      {d.name}
                    </span>
                    <div className="flex-1 bg-ink-100 dark:bg-ink-800 rounded-full h-6 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${(d.duration / maxDuration) * 100}%`,
                          backgroundColor: d.color,
                        }}
                      />
                    </div>
                    <span className="text-sm text-ink-500 dark:text-ink-400 w-16 flex-shrink-0">
                      {d.duration}年
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </RevealOnScroll>

        {/* 朝代时间轴 */}
        <RevealOnScroll direction="scale" threshold={0.1} delay={100}>
          <div className="bg-white/80 dark:bg-ink-900/80 rounded-2xl shadow-lg p-6 border border-ink-200 dark:border-ink-700">
            <h2 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-4">
              朝代时间轴
            </h2>
            {dynastyStats.length === 0 ? (
              <div className="text-center py-10 text-ink-400">暂无数据</div>
            ) : (
              <div className="relative">
                {/* 时间轴线 */}
                <div className="absolute top-6 left-0 right-0 h-0.5 bg-ink-200 dark:bg-ink-700" />
                <div className="flex flex-wrap gap-4">
                  {dynastyStats.map((d) => (
                    <div key={d.name} className="relative flex-1 min-w-[120px]">
                      <div
                        className="w-3 h-3 rounded-full -mt-1.5 relative z-10"
                        style={{ backgroundColor: d.color }}
                      />
                      <div className="mt-3 text-center">
                        <div className="text-sm font-bold text-ink-900 dark:text-ink-100">{d.name}</div>
                        <div className="text-xs text-ink-400 dark:text-ink-500">
                          {d.start < 0 ? `${Math.abs(d.start)}BC` : `${d.start}AD`}—{d.end < 0 ? `${Math.abs(d.end)}BC` : `${d.end}AD`}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}

function getDynastyColor(name: string): string {
  const colors: Record<string, string> = {
    '夏': '#8B7355',
    '商': '#A0522D',
    '周': '#6B8E23',
    '秦': '#4682B4',
    '西汉': '#CD853F',
    '东汉': '#B8860B',
    '三国': '#DC143C',
    '晋': '#4169E1',
    '隋': '#2F4F4F',
    '唐': '#DC143C',
    '宋': '#4169E1',
    '元': '#2F4F4F',
    '明': '#8B0000',
    '清': '#B22222',
  };
  return colors[name] || '#C41E3A';
}

export default VisualizePage;
