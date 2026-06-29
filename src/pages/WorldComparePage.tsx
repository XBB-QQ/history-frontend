/**
 * 中外时间轴对照页面
 * 双列展示同一时期中国与世界的历史事件
 * @see history-museum/design/000-future-roadmap.md §方向二 §2.4
 */

import { Link } from 'react-router-dom';
import { WORLD_HISTORY } from '@/data/themes/worldHistory';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';

function WorldComparePage() {
  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll direction="fade">
          <SectionHeader
            label="WORLD COMPARE"
            title="中外时间轴对照"
            description="中外对照"
          />
        </RevealOnScroll>

        {/* 表头 */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-center font-bold">
          <div className="p-3 bg-accent/10 dark:bg-accent/20 rounded-t-lg border-b-2 border-accent">
            <span className="text-accent text-lg">🇨🇳 中国</span>
          </div>
          <div className="p-3 bg-indigo-500/10 dark:bg-indigo-700/20 rounded-t-lg border-b-2 border-indigo-500">
            <span className="text-indigo-600 dark:text-indigo-400 text-lg">世 世界</span>
          </div>
        </div>

        {/* 对照条目 */}
        <div className="relative">
          {/* 中央时间轴线（桌面端） */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-ink-200 dark:bg-ink-700 -translate-x-1/2" />

          {WORLD_HISTORY.map((item, idx) => (
            <RevealOnScroll
              key={item.year}
              direction={idx % 2 === 0 ? 'right' : 'left'}
              delay={idx * 50}
            >
              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* 年份标签（中央） */}
                <div className="hidden md:flex absolute left-1/2 top-4 -translate-x-1/2 z-10">
                  <div className="px-3 py-1 bg-paper dark:bg-ink-950 border-2 border-ink-300 dark:border-ink-600 rounded-full text-xs font-bold text-ink-700 dark:text-ink-300 whitespace-nowrap">
                    {item.yearDisplay}
                  </div>
                </div>

                {/* 中国侧 */}
                <div
                  className={`p-4 bg-white/70 dark:bg-ink-900/70 rounded-lg border border-ink-200 dark:border-ink-700 ${
                    idx % 2 === 0 ? 'md:mr-8' : 'md:order-2 md:ml-8'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-accent/15 dark:bg-accent/25 text-accent text-xs font-bold rounded-full">
                      {item.china.dynasty}
                    </span>
                  </div>
                  <p className="text-sm text-ink-800 dark:text-ink-200 leading-relaxed">
                    {item.china.event}
                  </p>
                  {/* 移动端年份 */}
                  <div className="md:hidden mt-2 text-xs text-ink-500 dark:text-ink-400">
                    {item.yearDisplay}
                  </div>
                </div>

                {/* 世界侧 */}
                <div
                  className={`p-4 bg-white/70 dark:bg-ink-900/70 rounded-lg border border-indigo-200 dark:border-indigo-800 ${
                    idx % 2 === 0 ? 'md:order-2 md:ml-8' : 'md:mr-8'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-indigo-500/15 dark:bg-indigo-700/25 text-indigo-600 dark:text-indigo-400 text-xs font-bold rounded-full">
                      {item.world.region}
                    </span>
                  </div>
                  <p className="text-sm text-ink-800 dark:text-ink-200 leading-relaxed">
                    {item.world.event}
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* 底部 */}
        <RevealOnScroll direction="fade" delay={300}>
          <div className="mt-12 text-center">
            <Link to="/" className="btn-secondary">
              返回首页
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}

export default WorldComparePage;
