import { useRef, useState, useEffect } from 'react';
import { useTimeTravelStore, PRECISION_CONFIG, MILESTONE_YEARS } from '@/store/timeTravelStore';

/** 格式化年份显示 */
function formatYear(year: number): string {
  if (year < 0) return `${Math.abs(year)} BC`;
  if (year === 0) return '公元元年';
  return `${year} AD`;
}

/** 年代滑块 */
function YearSlider() {
  const { year, precision, setYear, setPrecision } = useTimeTravelStore();
  const config = PRECISION_CONFIG[precision];
  const sliderRef = useRef<HTMLInputElement>(null);

  // 计算滑块百分比位置
  const percentage = ((year - config.range[0]) / (config.range[1] - config.range[0])) * 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pct = Number(e.target.value) / 100;
    const raw = config.range[0] + pct * (config.range[1] - config.range[0]);
    const stepped = Math.round(raw / config.step) * config.step;
    setYear(Math.max(config.range[0], Math.min(config.range[1], stepped)));
  };

  return (
    <div className="flex items-center gap-3">
      {/* 精度切换 */}
      <div className="flex gap-1 flex-shrink-0">
        {(Object.keys(PRECISION_CONFIG) as TimePrecision[]).map((p) => (
          <button
            key={p}
            onClick={() => setPrecision(p)}
            className={`px-2 py-1 text-xs rounded-full transition-all ${
              precision === p
                ? 'bg-accent text-white shadow-md'
                : 'bg-ink-100 dark:bg-ink-800 text-ink-500 dark:text-ink-400 hover:bg-ink-200 dark:hover:bg-ink-700'
            }`}
          >
            {PRECISION_CONFIG[p].label}
          </button>
        ))}
      </div>

      {/* 滑块 */}
      <div className="flex-1 relative h-10 flex items-center">
        <input
          ref={sliderRef}
          type="range"
          min={0}
          max={100}
          value={percentage}
          onChange={handleChange}
          className="w-full h-2 bg-ink-200 dark:bg-ink-700 rounded-full appearance-none cursor-pointer
                     [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                     [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:shadow-lg
                     [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform
                     [&::-webkit-slider-thumb]:hover:scale-125"
        />
        {/* 刻度标记 */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-1 pointer-events-none">
          {[-2000, -1000, 0, 1000, 2000].map((tick) => (
            <span key={tick} className="text-[9px] text-ink-400 dark:text-ink-600 select-none">
              {tick < 0 ? `${Math.abs(tick)}BC` : tick === 0 ? '0' : `${tick}`}
            </span>
          ))}
        </div>
      </div>

      {/* 当前年份显示 */}
      <div className="text-lg font-black text-accent dark:text-red-400 tabular-nums flex-shrink-0 min-w-[100px] text-center">
        {formatYear(year)}
      </div>
    </div>
  );
}

/** 重大年代快捷跳转 */
function MilestoneButtons() {
  const { year, jumpTo } = useTimeTravelStore();

  return (
    <div className="flex flex-wrap gap-1.5">
      {MILESTONE_YEARS.map(({ year: mYear, label }) => (
        <button
          key={mYear}
          onClick={() => jumpTo(mYear)}
          className={`px-2.5 py-1 text-xs rounded-full transition-all border ${
            Math.abs(year - mYear) < 50
              ? 'bg-accent/10 border-accent text-accent font-bold'
              : 'border-ink-200 dark:border-ink-700 text-ink-500 dark:text-ink-400 hover:border-accent/50 hover:text-accent'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

/**
 * 时间旅行栏组件
 * 顶部固定，展示年代滑块和快捷跳转
 */
export default function TimeTravelBar() {
  const { active, toggleActive } = useTimeTravelStore();

  // ESC 关闭
  useEffect(() => {
    if (!active) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') toggleActive();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [active, toggleActive]);

  return (
    <>
      {/* 开关按钮 */}
      <button
        onClick={toggleActive}
        className={`fixed top-20 right-4 z-[90] w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all
          ${active
            ? 'bg-accent text-white hover:bg-red-800'
            : 'bg-paper dark:bg-ink-900 text-ink-600 dark:text-ink-300 hover:text-accent border border-ink-200 dark:border-ink-700'
          }`}
        title="时间旅行"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>

      {/* 时间旅行面板 */}
      <div
        className={`fixed top-0 left-0 right-0 z-[90] bg-paper/95 dark:bg-ink-900/95 backdrop-blur-md border-b border-ink-200 dark:border-ink-700 shadow-xl transition-all duration-500 ease-out
          ${active ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="max-w-4xl mx-auto px-4 py-4 space-y-4">
          {/* 标题行 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">⏳</span>
              <h3 className="text-base font-black text-ink-900 dark:text-ink-100">时间旅行</h3>
            </div>
            <button
              onClick={toggleActive}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-ink-100 dark:hover:bg-ink-800 text-ink-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* 滑块 */}
          <YearSlider />

          {/* 快捷跳转 */}
          <MilestoneButtons />

          {/* 键盘提示 */}
          <div className="text-[10px] text-ink-400 dark:text-ink-600 flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 bg-ink-100 dark:bg-ink-800 rounded text-xs font-mono">←</kbd>
            <kbd className="px-1.5 py-0.5 bg-ink-100 dark:bg-ink-800 rounded text-xs font-mono">→</kbd>
            <span>方向键微调 | 点击精度切换刻度</span>
          </div>
        </div>
      </div>
    </>
  );
}
