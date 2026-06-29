import { useState, useCallback } from 'react';
import { CHAR_EVOLUTIONS, getCharEvolution } from '@/data/features/charEvolution';
import type { CharEvolution, CharStage } from '@/data/features/charEvolution';

export default function CharEvolutionPage() {
  const [selectedChar, setSelectedChar] = useState<string>('王');
  const [activeStage, setActiveStage] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const evolution = getCharEvolution(selectedChar);

  const startAnimation = useCallback(() => {
    setIsAnimating(true);
    setActiveStage(0);
    const timer = setInterval(() => {
      setActiveStage(prev => {
        if (prev >= (evolution?.stages.length ?? 1) - 1) {
          clearInterval(timer);
          setIsAnimating(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1200);
  }, [evolution]);

  if (!evolution) return null;
  const currentStage = evolution.stages[activeStage];

  return (
    <div className="min-h-screen bg-gradient-to-b from-rice to-stone-100 dark:from-ink-950 dark:to-ink-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 标题 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-ink-900 dark:text-ink-100 font-serif">
            演 汉字演变动画器
          </h1>
          <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">
            从甲骨文到楷书 — 看一个汉字三千年的变形之旅
          </p>
        </div>

        {/* 汉字选择 */}
        <div className="flex gap-3 mb-8 justify-center">
          {CHAR_EVOLUTIONS.map(e => (
            <button
              key={e.char}
              onClick={() => { setSelectedChar(e.char); setActiveStage(0); setIsAnimating(false); }}
              className={`w-14 h-14 rounded-xl text-2xl font-serif font-bold transition-all border-2 ${
                selectedChar === e.char
                  ? 'border-accent bg-accent/10 dark:bg-accent/5 scale-110'
                  : 'border-ink-200 dark:border-ink-700 text-ink-600 dark:text-ink-400 hover:border-accent/50'
              }`}
            >
              {e.char}
            </button>
          ))}
        </div>

        {/* 当前汉字展示 */}
        <div className="flex flex-col items-center mb-8">
          {/* 大字展示 */}
          <div className="w-48 h-48 rounded-2xl border-2 border-ink-200 dark:border-ink-700 bg-ink-50/30 dark:bg-ink-800/30 flex items-center justify-center mb-4 overflow-hidden">
            <svg viewBox="0 0 60 90" width="160" height="160" className="transition-all duration-500">
              <path
                d={currentStage.svgPath}
                stroke="#27231e"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-500"
              />
            </svg>
          </div>

          {/* 当前阶段信息 */}
          <div className="text-center">
            <span className="text-2xl font-serif font-bold text-ink-900 dark:text-ink-100">
              {evolution.char}
            </span>
            <span className="mx-3 text-ink-400">—</span>
            <span className="text-xl font-serif font-bold text-accent">
              {currentStage.name}
            </span>
          </div>
          <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">
            {currentStage.era}
          </p>
        </div>

        {/* 演变阶段时间轴 */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {evolution.stages.map((stage, i) => (
            <div key={i} className="flex items-center">
              <button
                onClick={() => { setActiveStage(i); setIsAnimating(false); }}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  i === activeStage
                    ? 'bg-accent text-white'
                    : i <= activeStage
                      ? 'bg-accent/30 text-accent'
                      : 'bg-ink-100 dark:bg-ink-800 text-ink-500 dark:text-ink-500'
                }`}
              >
                {stage.name}
              </button>
              {i < evolution.stages.length - 1 && (
                <span className="text-ink-300 mx-1">→</span>
              )}
            </div>
          ))}
        </div>

        {/* 自动播放按钮 */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={startAnimation}
            disabled={isAnimating}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              isAnimating
                ? 'bg-ink-200 text-ink-400 cursor-not-allowed'
                : 'bg-accent text-white hover:shadow-lg'
            }`}
          >
            {isAnimating ? '播 播放中...' : '演 自动演变'}
          </button>
          <button
            onClick={() => { setActiveStage(evolution.stages.length - 1); setIsAnimating(false); }}
            className="px-6 py-3 rounded-xl border border-ink-200 dark:border-ink-700 text-ink-700 dark:text-ink-300 font-bold hover:bg-ink-50 dark:hover:bg-ink-800 transition-colors"
          >
            ⏩ 楷书（最终）
          </button>
        </div>

        {/* 当前阶段详细解说 */}
        <div className="p-5 rounded-xl border border-ink-200 dark:border-ink-700 bg-ink-50/50 dark:bg-ink-800/50">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-serif font-bold text-accent">{currentStage.name}</span>
            <span className="text-sm text-ink-400">{currentStage.era}</span>
          </div>
          <p className="text-sm text-ink-700 dark:text-ink-300 leading-relaxed">
            {currentStage.description}
          </p>
          <div className="mt-4 text-center text-xs text-ink-400">
            释义：{evolution.meaning}
          </div>
        </div>

        {/* 全阶段对比 */}
        <div className="mt-8">
          <h3 className="text-sm font-bold text-ink-600 dark:text-ink-400 mb-4 text-center">
            完整演变历程对比
          </h3>
          <div className="flex justify-center gap-3">
            {evolution.stages.map((stage, i) => (
              <div
                key={i}
                onClick={() => { setActiveStage(i); setIsAnimating(false); }}
                className={`cursor-pointer p-3 rounded-xl border transition-all ${
                  i === activeStage
                    ? 'border-accent bg-accent/10'
                    : 'border-ink-200 dark:border-ink-700 hover:border-accent/50'
                }`}
              >
                <svg viewBox="0 0 60 90" width="50" height="50">
                  <path
                    d={stage.svgPath}
                    stroke="#27231e"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="text-xs text-ink-500 text-center mt-1">{stage.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
