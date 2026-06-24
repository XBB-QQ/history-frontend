import { useState, useEffect } from 'react';
import {
  fetchDailyQuiz,
  submitQuizAnswer,
  type QuizQuestion,
  type QuizResult,
} from '@/services/api';
import { useUserStore } from '@/store/userStore';

/**
 * 每日挑战弹窗
 * 展示一道每日问答题目，答完显示解析
 */
export default function QuizDialog({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [question, setQuestion] = useState<QuizQuestion | null>(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<number | null>(null);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [error, setError] = useState(false);
  const { user } = useUserStore();

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    setQuestion(null);
    setSelected(null);
    setResult(null);
    setError(false);

    fetchDailyQuiz()
      .then((q) => {
        setQuestion(q);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [isOpen]);

  const handleSelect = (index: number) => {
    if (selected !== null) return; // 已作答不能改
    setSelected(index);
  };

  const handleSubmit = async () => {
    if (selected === null || !question) return;
    try {
      const res = await submitQuizAnswer(question.id, selected);
      setResult(res);
      // 更新用户积分
      if (res.correct && user) {
        useUserStore.getState().updateQuizScore(res.pointsEarned);
      }
    } catch {
      setError(true);
    }
  };

  if (!isOpen) return null;

  const difficultyLabels: Record<string, string> = {
    easy: '简单',
    medium: '中等',
    hard: '困难',
  };

  const difficultyColors: Record<string, string> = {
    easy: 'text-green-600 bg-green-100 dark:bg-green-900/30',
    medium: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30',
    hard: 'text-red-600 bg-red-100 dark:bg-red-900/30',
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div
        className="bg-paper dark:bg-ink-900/95 rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-ink-200 dark:border-ink-700">
          <div className="flex items-center gap-2">
            <span className="text-lg">🏆</span>
            <h2 className="text-lg font-bold">每日挑战</h2>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-ink-100 dark:hover:bg-ink-800 text-ink-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {loading && (
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-ink-200 dark:bg-ink-700 rounded w-3/4" />
              <div className="h-4 bg-ink-200 dark:bg-ink-700 rounded w-1/2" />
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-12 bg-ink-100 dark:bg-ink-800 rounded-xl" />
              ))}
            </div>
          )}

          {error && (
            <div className="text-center py-8 text-ink-400">
              <p className="text-lg mb-2">加载失败</p>
              <button onClick={() => window.location.reload()} className="text-accent text-sm">
                重试
              </button>
            </div>
          )}

          {question && !loading && (
            <>
              {/* 题目信息 */}
              <div className="flex items-center gap-2 mb-4">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${difficultyColors[question.difficulty]}`}>
                  {difficultyLabels[question.difficulty]}
                </span>
                {question.category && (
                  <span className="text-xs px-2 py-0.5 bg-ink-100 dark:bg-ink-800 rounded-full text-ink-500">
                    {question.category}
                  </span>
                )}
                {question.dynasty && (
                  <span className="text-xs px-2 py-0.5 bg-ink-100 dark:bg-ink-800 rounded-full text-ink-500">
                    {question.dynasty}
                  </span>
                )}
              </div>

              {/* 题目 */}
              <p className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-6 leading-relaxed">
                {question.question}
              </p>

              {/* 选项 */}
              <div className="space-y-2 mb-6">
                {question.options.map((opt, i) => {
                  let cls = 'border-ink-200 dark:border-ink-700 hover:border-accent/50 ';
                  if (selected !== null) {
                    if (i === question.correctIndex) {
                      cls = 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400';
                    } else if (i === selected && i !== question.correctIndex) {
                      cls = 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400';
                    } else {
                      cls = 'border-ink-200 dark:border-ink-700 opacity-50';
                    }
                  }
                  return (
                    <button
                      key={i}
                      onClick={() => handleSelect(i)}
                      disabled={selected !== null}
                      className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${cls}`}
                    >
                      <span className="font-medium">{String.fromCharCode(65 + i)}</span>
                      <span className="ml-2">{opt}</span>
                      {selected !== null && i === question.correctIndex && (
                        <span className="float-right text-green-500">✓</span>
                      )}
                      {selected === i && i !== question.correctIndex && (
                        <span className="float-right text-red-500">✗</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* 提交按钮 */}
              {selected !== null && !result && (
                <button
                  onClick={handleSubmit}
                  className="w-full py-3 bg-accent text-white rounded-xl font-bold hover:bg-red-800 transition-colors"
                >
                  提交答案
                </button>
              )}

              {/* 结果 */}
              {result && (
                <div className={`rounded-xl p-4 ${result.correct ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{result.correct ? '🎉' : '😢'}</span>
                    <span className={`font-bold ${result.correct ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                      {result.correct ? '回答正确！' : '回答错误'}
                    </span>
                    {result.correct && (
                      <span className="text-sm text-green-600 dark:text-green-500 ml-auto">
                        +{result.pointsEarned} 分
                      </span>
                    )}
                  </div>
                  {result.explanation && (
                    <p className="text-sm text-ink-600 dark:text-ink-400 leading-relaxed">
                      {result.explanation}
                    </p>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
