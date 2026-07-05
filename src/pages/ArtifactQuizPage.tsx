/**
 * 历史信物鉴定小游戏
 * @see ITERATIONS.md #100
 */

import { useState, useCallback } from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import {
  ARTIFACT_QUESTIONS,
  type ArtifactQuestion,
} from '@/data/features/artifactQuizData';
import { getRandomQuestions, calculateScore, saveScore, getScores, type AnswerRecord } from '@/utils/gradeArtifact';

type GameState = 'menu' | 'playing' | 'result';

export default function ArtifactQuizPage() {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [questions, setQuestions] = useState<ArtifactQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState<ReturnType<typeof calculateScore> | null>(null);
  const [historyScores] = useState(getScores);

  const currentQuestion = questions[currentIndex];

  /* 开始游戏 */
  const handleStart = useCallback(() => {
    const qs = getRandomQuestions(5);
    setQuestions(qs);
    setCurrentIndex(0);
    setAnswers([]);
    setSelectedOption(null);
    setShowResult(false);
    setScore(null);
    setGameState('playing');
  }, []);

  /* 选择答案 */
  const handleSelectOption = useCallback((optionId: string) => {
    if (showResult) return;
    setSelectedOption(optionId);
  }, [showResult]);

  /* 提交答案 */
  const handleSubmit = useCallback(() => {
    if (!selectedOption || !currentQuestion) return;

    const correct = selectedOption === currentQuestion.correctAnswer;
    const record: AnswerRecord = {
      questionId: currentQuestion.id,
      selectedAnswer: selectedOption,
      correct,
      points: currentQuestion.points,
    };

    setAnswers(prev => [...prev, record]);
    setShowResult(true);
  }, [selectedOption, currentQuestion]);

  /* 下一题 */
  const handleNext = useCallback(() => {
    if (currentIndex + 1 >= questions.length) {
      // 全部完成，显示最终结果
      const finalScore = calculateScore(answers);
      setScore(finalScore);
      saveScore(finalScore);
      setGameState('result');
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
    }
  }, [currentIndex, questions.length, answers]);

  /* 进度条 */
  const progress = questions.length > 0 ? ((currentIndex + (showResult ? 1 : 0)) / questions.length) * 100 : 0;

  /* 难度标签 */
  const difficultyLabel: Record<string, string> = {
    easy: '⭐ 简单',
    medium: '⭐⭐ 中等',
    hard: '⭐⭐⭐ 困难',
  };

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* 头部 */}
        <RevealOnScroll>
          <SectionHeader
            label="ARTIFACT QUIZ"
            title="历史信物鉴定"
            description="认识文物，辨明真伪，挑战你的历史知识"
          />
        </RevealOnScroll>

        {/* 菜单状态 */}
        {gameState === 'menu' && (
          <RevealOnScroll direction="up" delay={200}>
            <div className="mt-12 text-center space-y-8">
              <div className="text-8xl mb-4">🏺</div>
              <div>
                <h2 className="text-3xl font-bold text-ink-900 dark:text-ink-100 mb-2">准备好鉴定了吗？</h2>
                <p className="text-ink-600 dark:text-ink-400">
                  共 {ARTIFACT_QUESTIONS.length} 道题目，随机抽取 5 道
                </p>
              </div>

              {/* 统计 */}
              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                <div className="p-4 rounded-xl bg-white dark:bg-ink-900 border-2 border-ink-200 dark:border-ink-700">
                  <div className="text-2xl font-bold text-accent">{ARTIFACT_QUESTIONS.length}</div>
                  <div className="text-sm text-ink-500">总题库</div>
                </div>
                <div className="p-4 rounded-xl bg-white dark:bg-ink-900 border-2 border-ink-200 dark:border-ink-700">
                  <div className="text-2xl font-bold text-green-600">5</div>
                  <div className="text-sm text-ink-500">每局题数</div>
                </div>
                <div className="p-4 rounded-xl bg-white dark:bg-ink-900 border-2 border-ink-200 dark:border-ink-700">
                  <div className="text-2xl font-bold text-amber-600">{historyScores.length}</div>
                  <div className="text-sm text-ink-500">历史次数</div>
                </div>
              </div>

              <button
                onClick={handleStart}
                className="px-12 py-4 rounded-xl bg-accent text-white font-bold text-xl hover:bg-accent/90 shadow-xl transform hover:scale-105 transition-all"
              >
                🎯 开始鉴定
              </button>
            </div>
          </RevealOnScroll>
        )}

        {/* 游戏中 */}
        {gameState === 'playing' && currentQuestion && (
          <RevealOnScroll direction="up" delay={200}>
            <div className="mt-8 space-y-6">
              {/* 进度条 */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-ink-600 dark:text-ink-400 min-w-[80px]">
                  {currentIndex + 1}/{questions.length}
                </span>
                <div className="flex-1 bg-ink-200 dark:bg-ink-700 rounded-full h-3">
                  <div
                    className="h-3 rounded-full bg-accent transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* 题目卡片 */}
              <div className="bg-white dark:bg-ink-900 rounded-2xl border-2 border-ink-200 dark:border-ink-700 shadow-lg overflow-hidden">
                {/* 文物展示 */}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-ink-800 dark:to-ink-700 p-8 text-center">
                  <span className="text-8xl">{currentQuestion.emoji}</span>
                </div>

                <div className="p-6 space-y-4">
                  {/* 题目信息 */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-ink-900 dark:text-ink-100">
                        {currentQuestion.name}
                      </h3>
                      <p className="text-sm text-ink-500">
                        {currentQuestion.dynasty} · {currentQuestion.era}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 font-bold">
                        {difficultyLabel[currentQuestion.difficulty]}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent font-bold">
                        +{currentQuestion.points} 分
                      </span>
                    </div>
                  </div>

                  {/* 描述 */}
                  <div className="p-4 rounded-xl bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700">
                    <p className="text-sm text-ink-700 dark:text-ink-300">{currentQuestion.description}</p>
                    <p className="text-xs text-ink-500 mt-2">
                      材质：{currentQuestion.material} · 用途：{currentQuestion.function}
                    </p>
                  </div>

                  {/* 选项 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentQuestion.options.map(option => {
                      const isSelected = selectedOption === option.id;
                      const isCorrect = option.id === currentQuestion.correctAnswer;
                      const showCorrect = showResult && isCorrect;
                      const showWrong = showResult && isSelected && !isCorrect;

                      return (
                        <button
                          key={option.id}
                          onClick={() => handleSelectOption(option.id)}
                          disabled={showResult}
                          className={`p-4 rounded-xl text-left transition-all border-2 ${
                            showCorrect
                              ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                              : showWrong
                              ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                              : isSelected
                              ? 'border-accent bg-accent/5'
                              : 'border-ink-200 dark:border-ink-700 hover:border-ink-400 bg-white dark:bg-ink-900'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-ink-900 dark:text-ink-100">{option.label}</span>
                            {showCorrect && <span className="text-green-600">✅</span>}
                            {showWrong && <span className="text-red-600">❌</span>}
                          </div>
                          <p className="text-xs text-ink-500">{option.dynasty} · {option.description}</p>
                        </button>
                      );
                    })}
                  </div>

                  {/* 解析 */}
                  {showResult && (
                    <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800">
                      <h4 className="font-bold text-blue-800 dark:text-blue-400 mb-1">💡 解析</h4>
                      <p className="text-sm text-ink-700 dark:text-ink-300">{currentQuestion.explanation}</p>
                    </div>
                  )}

                  {/* 操作按钮 */}
                  <div className="flex gap-3">
                    {!showResult ? (
                      <button
                        onClick={handleSubmit}
                        disabled={!selectedOption}
                        className="flex-1 py-3 rounded-xl bg-accent text-white font-bold hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        提交鉴定
                      </button>
                    ) : (
                      <button
                        onClick={handleNext}
                        className="flex-1 py-3 rounded-xl bg-green-500 text-white font-bold hover:bg-green-600"
                      >
                        {currentIndex + 1 >= questions.length ? '查看结果' : '下一题 →'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        )}

        {/* 结果页 */}
        {gameState === 'result' && score && (
          <RevealOnScroll direction="up" delay={200}>
            <div className="mt-8 bg-white dark:bg-ink-900 rounded-2xl border-2 border-ink-200 dark:border-ink-700 p-8 shadow-lg text-center space-y-6">
              <div className="text-6xl">
                {score.accuracy >= 80 ? '🏆' : score.accuracy >= 50 ? '👍' : '📚'}
              </div>

              <div>
                <h2 className="text-2xl font-bold text-ink-900 dark:text-ink-100 mb-2">鉴定完成！</h2>
                <p className="text-4xl font-bold text-accent">{score.accuracy}%</p>
                <p className="text-sm text-ink-500 mt-1">{score.grade}</p>
              </div>

              <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
                <div className="p-3 rounded-xl bg-green-50 dark:bg-green-900/20">
                  <div className="text-xl font-bold text-green-600">{score.correct}</div>
                  <div className="text-xs text-ink-500">正确</div>
                </div>
                <div className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20">
                  <div className="text-xl font-bold text-red-600">{score.wrong}</div>
                  <div className="text-xs text-ink-500">错误</div>
                </div>
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20">
                  <div className="text-xl font-bold text-amber-600">{score.total}</div>
                  <div className="text-xs text-ink-500">总分</div>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleStart}
                  className="px-8 py-3 rounded-xl bg-accent text-white font-bold hover:bg-accent/90 shadow-lg"
                >
                  🔄 再来一局
                </button>
                <button
                  onClick={() => setGameState('menu')}
                  className="px-8 py-3 rounded-xl bg-ink-100 dark:bg-ink-800 font-bold text-ink-700 dark:text-ink-300"
                >
                  返回首页
                </button>
              </div>
            </div>
          </RevealOnScroll>
        )}
      </div>
    </div>
  );
}
