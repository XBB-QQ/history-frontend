import { useState } from 'react';
import { K12_PATHS } from '@/data/k12Paths';
import type { K12Chapter } from '@/data/k12Paths';

export default function K12PathPage() {
  const [selectedPath, setSelectedPath] = useState<string>(K12_PATHS[0].id);
  const [selectedChapter, setSelectedChapter] = useState<number>(0);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);

  const path = K12_PATHS.find(p => p.id === selectedPath)!;
  const chapter = path.chapters[selectedChapter];

  return (
    <div className="min-h-screen bg-gradient-to-b from-rice to-stone-100 dark:from-ink-950 dark:to-ink-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 标题 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-ink-900 dark:text-ink-100 font-serif">
            📖 课程对齐 · 跟着课本学历史
          </h1>
          <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">
            对标人教版教材大纲，知识点直接映射到平台内容
          </p>
        </div>

        {/* 教材选择 */}
        <div className="flex gap-3 mb-8 justify-center">
          {K12_PATHS.map(p => (
            <button
              key={p.id}
              onClick={() => { setSelectedPath(p.id); setSelectedChapter(0); setQuizAnswer(null); }}
              className={`px-5 py-3 rounded-xl font-bold transition-all border-2 ${
                selectedPath === p.id
                  ? 'border-accent bg-accent text-white'
                  : 'border-ink-200 dark:border-ink-700 text-ink-600 dark:text-ink-400'
              }`}
            >
              <div>{p.grade}{p.semester}</div>
              <div className="text-xs mt-1">{p.textbook.slice(0, 15)}...</div>
            </button>
          ))}
        </div>

        {/* 章节导航 */}
        <div className="flex gap-2 mb-6 justify-center overflow-x-auto">
          {path.chapters.map(ch => (
            <button
              key={ch.chapterNum}
              onClick={() => { setSelectedChapter(path.chapters.indexOf(ch)); setQuizAnswer(null); }}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all shrink-0 ${
                selectedChapter === path.chapters.indexOf(ch)
                  ? 'bg-accent text-white'
                  : 'bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-400'
              }`}
            >
              第{ch.chapterNum}课
            </button>
          ))}
        </div>

        {/* 章节内容 */}
        <div className="space-y-4">
          {/* 标题 */}
          <div className="p-5 rounded-xl border-2 border-accent/30 bg-accent/10 dark:bg-accent/5">
            <h2 className="text-xl font-serif font-bold text-ink-900 dark:text-ink-100">
              第{chapter.chapterNum}课：{chapter.title}
            </h2>
            <div className="text-sm text-ink-400 mt-1">{path.textbook}</div>
          </div>

          {/* 知识点 */}
          <div className="p-4 rounded-xl border border-accent/30 bg-accent/10 dark:bg-accent/5">
            <h3 className="text-sm font-bold text-accent mb-3">📌 核心知识点</h3>
            <ul className="space-y-2">
              {chapter.keyPoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-ink-700 dark:text-ink-300">
                  <span className="text-accent font-bold">{i + 1}.</span>{pt}
                </li>
              ))}
            </ul>
          </div>

          {/* 关联平台内容 */}
          {(chapter.relatedDynasties.length > 0 || chapter.relatedEvents.length > 0) && (
            <div className="p-4 rounded-xl border border-ink-200 dark:border-ink-700 bg-ink-50/30 dark:bg-ink-800/20">
              <h3 className="text-sm font-bold text-ink-600 dark:text-ink-400 mb-2">🔗 平台关联内容</h3>
              <div className="flex flex-wrap gap-2">
                {chapter.relatedDynasties.map(d => (
                  <span key={d} className="px-2 py-1 rounded bg-amber-100 text-amber-700 text-xs font-bold">{d}朝</span>
                ))}
                {chapter.relatedEvents.map(e => (
                  <span key={e} className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-bold">{e}</span>
                ))}
              </div>
            </div>
          )}

          {/* 章节测试题 */}
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50/30 dark:bg-amber-900/20">
            <h3 className="text-sm font-bold text-amber-700 dark:text-amber-300 mb-3">章节测试题</h3>
            <p className="text-sm font-bold text-ink-800 dark:text-ink-200 mb-3">{chapter.quiz.question}</p>
            <div className="space-y-2 mb-3">
              {chapter.quiz.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setQuizAnswer(i)}
                  disabled={quizAnswer !== null}
                  className={`w-full p-3 rounded-lg text-sm text-left transition-all border ${
                    quizAnswer === i
                      ? i === chapter.quiz.answer
                        ? 'border-green-400 bg-green-50 text-green-700'
                        : 'border-red-400 bg-red-50 text-red-700'
                      : 'border-ink-200 dark:border-ink-700 text-ink-700 dark:text-ink-300'
                  }`}
                >
                  {String.fromCharCode(65 + i)}. {opt}
                </button>
              ))}
            </div>
            {quizAnswer !== null && (
              <div className="p-3 rounded-lg bg-ink-50 dark:bg-ink-800 text-sm text-ink-700 dark:text-ink-300">
                <span className="font-bold">
                  {quizAnswer === chapter.quiz.answer ? '✅ 正确！' : '❌ 错误。'}
                </span>
                {chapter.quiz.explanation}
              </div>
            )}
            {quizAnswer !== null && (
              <button
                onClick={() => setQuizAnswer(null)}
                className="mt-2 text-xs text-accent hover:underline"
              >
                重新答题
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
