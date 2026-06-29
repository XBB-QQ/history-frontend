import { useState } from 'react';
import { LEARNING_PATHS, DIFFICULTY_STYLE } from '@/data/features/learningPaths';
import type { LearningPath, PathDay } from '@/data/features/learningPaths';

export default function LearningPathPage() {
  const [selectedPath, setSelectedPath] = useState<string>(LEARNING_PATHS[0].id);
  const [currentDay, setCurrentDay] = useState<number>(1);

  const path = LEARNING_PATHS.find(p => p.id === selectedPath);
  if (!path) return null;

  const dayData = path.days.find(d => d.day === currentDay);
  const progress = currentDay / path.totalDays;

  return (
    <div className="min-h-screen bg-gradient-to-b from-rice to-stone-100 dark:from-ink-950 dark:to-ink-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 标题 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-ink-900 dark:text-ink-100 font-serif">
            学 学习路径
          </h1>
          <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">
            系统化历史课程 — 从入门到深入，循序渐进学历史
          </p>
        </div>

        {/* 路径选择 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {LEARNING_PATHS.map(p => {
            const diff = DIFFICULTY_STYLE[p.difficulty];
            return (
              <button
                key={p.id}
                onClick={() => { setSelectedPath(p.id); setCurrentDay(1); }}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  selectedPath === p.id
                    ? 'border-accent bg-accent/10 dark:bg-accent/5'
                    : 'border-ink-200 dark:border-ink-700 hover:border-accent/50'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{p.icon}</span>
                  <span className="font-bold text-ink-800 dark:text-ink-200">{p.title}</span>
                </div>
                <p className="text-xs text-ink-500 dark:text-ink-400 mb-2">{p.subtitle}</p>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${diff.color}`}>
                    {diff.label}
                  </span>
                  <span className="text-xs text-ink-400">{p.totalDays}天</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* 进度条 */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-ink-700 dark:text-ink-300">
              {path.title} — 第 {currentDay} 天
            </span>
            <span className="text-xs text-ink-400">
              {Math.round(progress * 100)}% 完成
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-ink-200 dark:bg-ink-700">
            <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${progress * 100}%` }} />
          </div>
          {/* 天数标记 */}
          <div className="flex justify-between mt-2">
            {path.days.map(d => (
              <button
                key={d.day}
                onClick={() => setCurrentDay(d.day)}
                className={`w-6 h-6 rounded-full text-xs font-bold transition-all ${
                  d.day === currentDay
                    ? 'bg-accent text-white'
                    : d.day < currentDay
                      ? 'bg-accent/50 text-white'
                      : 'bg-ink-200 dark:bg-ink-700 text-ink-500 dark:text-ink-500'
                }`}
              >
                {d.day}
              </button>
            ))}
          </div>
        </div>

        {/* 当日课程 */}
        {dayData && (
          <div className="space-y-4">
            {/* 课程标题 */}
            <div className="p-5 rounded-xl border border-ink-200 dark:border-ink-700 bg-ink-50/50 dark:bg-ink-800/50">
              <h2 className="text-xl font-serif font-bold text-ink-900 dark:text-ink-100 mb-2">
                {path.icon} 第{dayData.day}天：{dayData.title}
              </h2>
              <p className="text-sm text-ink-500 dark:text-ink-400">
                {path.description}
              </p>
            </div>

            {/* 学习要点 */}
            <div className="p-4 rounded-xl border border-accent/30 bg-accent/10 dark:bg-accent/5">
              <h3 className="text-sm font-bold text-accent mb-3">要 学习要点</h3>
              <ul className="space-y-2">
                {dayData.keyPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-ink-700 dark:text-ink-300">
                    <span className="text-accent font-bold shrink-0">{i + 1}.</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* 关联内容 */}
            {(dayData.events.length > 0 || dayData.persons.length > 0 || dayData.dynasties.length > 0) && (
              <div className="p-4 rounded-xl border border-ink-200 dark:border-ink-700 bg-ink-50/30 dark:bg-ink-800/20">
                <h3 className="text-sm font-bold text-ink-600 dark:text-ink-400 mb-2">关 关联内容</h3>
                <div className="flex flex-wrap gap-2">
                  {dayData.dynasties.map(d => (
                    <span key={d} className="px-2 py-1 rounded bg-amber-100 text-amber-700 text-xs font-bold">
                      {d}
                    </span>
                  ))}
                  {dayData.events.map(e => (
                    <span key={e} className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-bold">
                      {e}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 思考题 */}
            <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50/30 dark:bg-amber-900/20">
              <h3 className="text-sm font-bold text-amber-700 dark:text-amber-300 mb-2">思 思考题</h3>
              <p className="text-sm text-ink-700 dark:text-ink-300 italic">{dayData.question}</p>
            </div>

            {/* 导航按钮 */}
            <div className="flex justify-between">
              <button
                onClick={() => setCurrentDay(Math.max(1, currentDay - 1))}
                disabled={currentDay === 1}
                className={`px-6 py-2 rounded-lg font-bold transition-all ${
                  currentDay === 1
                    ? 'text-ink-400 cursor-not-allowed'
                    : 'border border-ink-200 dark:border-ink-700 text-ink-700 dark:text-ink-300 hover:bg-ink-50'
                }`}
              >
                ← 前一天
              </button>
              {currentDay < path.totalDays ? (
                <button
                  onClick={() => setCurrentDay(currentDay + 1)}
                  className="px-6 py-2 rounded-lg bg-accent text-white font-bold hover:shadow-lg transition-all"
                >
                  下一天 →
                </button>
              ) : (
                <div className="px-6 py-2 rounded-lg bg-gradient-to-r from-accent to-amber-600 text-white font-bold">
                  🎓 课程完成！
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
