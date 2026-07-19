import { useState, useMemo, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import {
  ORACLE_BONE_CHARS,
  getRandomOracleChars,
  getOracleCharsByCategory,
  getOracleCharsByDifficulty,
  type OracleBoneChar
} from '@/data/features/oracleData';
import { getRandomChars, type RandomChar } from '@/data/features/randomCharPool';
import { useOracleGameStore, type WrongCharEntry } from '@/store/oracleGameStore';
import { useCharEvolutionStore } from '@/store/charEvolutionStore';
import { useT } from '@/i18n/i18n';

/** 随机字适配为 OracleBoneChar，缺字段填默认值，复用现有答题逻辑 */
const adaptRandomToOracle = (rc: RandomChar, idx: number): OracleBoneChar => ({
  id: `random-${idx}-${rc.char}`,
  character: rc.char,
  traditional: rc.char,
  traditionalFull: rc.char,
  pronunciation: '',
  meaning: rc.meaning,
  visualDescription: '随机挑战字',
  strokeCount: 0,
  category: rc.category,
  dynasty: '商代',
  culturalContext: '',
  relatedCharacters: [],
  difficulty: 'medium',
  exampleSentence: '',
  icon: '📜',
});

/** 错题本条目适配为 OracleBoneChar，复用现有答题逻辑 */
const adaptWrongToOracle = (w: WrongCharEntry, idx: number): OracleBoneChar => ({
  id: `wrong-${idx}-${w.char}`,
  character: w.char,
  traditional: w.char,
  traditionalFull: w.char,
  pronunciation: '',
  meaning: w.meaning,
  visualDescription: '错题复习',
  strokeCount: 0,
  category: '错题',
  dynasty: '商代',
  culturalContext: '',
  relatedCharacters: [],
  difficulty: 'hard',
  exampleSentence: '',
  icon: '📝',
});

type GameMode = 'classic' | 'random' | 'infinite' | 'review';

const OracleBoneGamePage = () => {
  const t = useT();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState<OracleBoneChar[]>(ORACLE_BONE_CHARS.slice(0, 5));
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  // 随机挑战模式
  const [mode, setMode] = useState<GameMode>('classic');
  const [randomQuestionCount, setRandomQuestionCount] = useState(10);
  // 无限模式：Unicode 动态生成，404 重试
  const [infiniteQuestionCount, setInfiniteQuestionCount] = useState(10);
  const [infiniteLoading, setInfiniteLoading] = useState(false);
  // infinite 进度可视化：已找到 X/Y，已尝试 Z 字，命中率
  const [infiniteProgress, setInfiniteProgress] = useState<{ found: number; needed: number; tried: number; hitRate: number } | null>(null);
  // 破纪录提示（在结果页展示）
  const [recordHint, setRecordHint] = useState<{ newBestScore: boolean; newBestAccuracy: boolean } | null>(null);

  // 错题本 + 历史成绩 store
  const wrongChars = useOracleGameStore((s) => s.wrongChars);
  const bestScore = useOracleGameStore((s) => s.bestScore);
  const bestAccuracy = useOracleGameStore((s) => s.bestAccuracy);
  const totalGames = useOracleGameStore((s) => s.totalGames);
  const addWrong = useOracleGameStore((s) => s.addWrong);
  const removeWrong = useOracleGameStore((s) => s.removeWrong);
  const clearWrong = useOracleGameStore((s) => s.clearWrong);
  const recordResult = useOracleGameStore((s) => s.recordResult);

  // 字 → 甲骨文字形全局缓存（来自 charEvolutionStore，跨页面共享）
  // value: CharEvolutionData 优先用 stages[0].svgXml（hanziyuan 真实字源），其次 svgPath（内置 30 字手绘）
  // value: null 表示已抓取且失败，fallback 到 emoji
  const charCache = useCharEvolutionStore((s) => s.cache);
  const getOrFetch = useCharEvolutionStore((s) => s.getOrFetch);
  const prefetch = useCharEvolutionStore((s) => s.prefetch);

  const questions = useMemo(() => {
    return currentQuiz;
  }, [currentQuiz]);

  const currentQuestionData = useMemo(() => {
    return questions[currentQuestion];
  }, [currentQuestion, questions]);

  // 当前题目变化时抓取该字甲骨文 SVG（命中全局 cache 则跳过请求）
  useEffect(() => {
    const ch = currentQuestionData?.traditional;
    if (ch) getOrFetch(ch);
  }, [currentQuestionData, getOrFetch]);

  // 字典区前 10 字批量预加载（全局 cache，跨页面共享）
  useEffect(() => {
    prefetch(ORACLE_BONE_CHARS.slice(0, 10).map((c) => c.traditional));
  }, [prefetch]);

  const handleAnswer = (answer: string) => {
    if (!selectedAnswer) {
      setSelectedAnswer(answer);

      if (answer === currentQuestionData.traditional) {
        setScore(score + 10);
      } else {
        // 答错记录到错题本（同字去重，保留最新一次错误时间）
        addWrong({
          char: currentQuestionData.traditional,
          meaning: currentQuestionData.meaning,
          wrongAt: Date.now(),
        });
      }
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer('');
    setCurrentQuestion(currentQuestion + 1);

    if (currentQuestion >= questions.length - 1) {
      // 结束时记录成绩，返回是否破纪录
      const finalScore = score;
      const hint = recordResult(finalScore, questions.length);
      setRecordHint(hint);
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer('');
    setScore(0);
    setShowResult(false);
    setRecordHint(null);

    if (mode === 'random') {
      // 随机挑战：从 120 字池随机选 N 字，适配成 OracleBoneChar 复用答题逻辑
      const randomChars = getRandomChars(randomQuestionCount);
      setCurrentQuiz(randomChars.map((rc, idx) => adaptRandomToOracle(rc, idx)));
      return;
    }

    if (mode === 'infinite') {
      // 无限模式：Unicode 动态生成
      generateInfiniteQuiz(infiniteQuestionCount);
      return;
    }

    if (mode === 'review') {
      // 复习模式：从错题本重新生成题库（错题为空时回退到经典模式）
      if (wrongChars.length === 0) {
        setMode('classic');
        setCurrentQuiz(getRandomOracleChars(5).slice(0, 5));
        return;
      }
      setCurrentQuiz(wrongChars.map((w, idx) => adaptWrongToOracle(w, idx)));
      return;
    }

    // 经典模式：Generate new quiz
    let quiz: OracleBoneChar[];
    if (selectedCategory !== 'all' && selectedCategory !== 'all') {
      quiz = getOracleCharsByCategory(selectedCategory);
    } else if (selectedDifficulty !== 'all') {
      quiz = getOracleCharsByDifficulty(selectedDifficulty as 'easy' | 'medium' | 'hard');
    } else {
      quiz = getRandomOracleChars(5);
    }

    setCurrentQuiz(quiz.slice(0, 5));
  };

  /** 切换模式时重置游戏 */
  const handleModeChange = (newMode: GameMode) => {
    if (newMode === mode) return;
    setMode(newMode);
    setCurrentQuestion(0);
    setSelectedAnswer('');
    setScore(0);
    setShowResult(false);
    setRecordHint(null);
    if (newMode === 'random') {
      const randomChars = getRandomChars(randomQuestionCount);
      setCurrentQuiz(randomChars.map((rc, idx) => adaptRandomToOracle(rc, idx)));
    } else if (newMode === 'infinite') {
      generateInfiniteQuiz(infiniteQuestionCount);
    } else if (newMode === 'review') {
      // 复习模式：错题本为空时不切换（由调用方控制按钮可用性）
      if (wrongChars.length === 0) return;
      setCurrentQuiz(wrongChars.map((w, idx) => adaptWrongToOracle(w, idx)));
    } else {
      setCurrentQuiz(getRandomOracleChars(5).slice(0, 5));
    }
  };

  /** 随机模式改题数时重新生成 */
  const handleRandomCountChange = (count: number) => {
    setRandomQuestionCount(count);
    setCurrentQuestion(0);
    setSelectedAnswer('');
    setScore(0);
    setShowResult(false);
    const randomChars = getRandomChars(count);
    setCurrentQuiz(randomChars.map((rc, idx) => adaptRandomToOracle(rc, idx)));
  };

  /** 无限模式：从 Unicode CJK 基本区（U+4E00-U+9FA5，20902 字）随机选字
   *  并发批量调 getOrFetch（走全局 cache），404 跳过重试，直到凑够所需题数
   *  meaning 字段从后端响应拿，没有就空
   *  进度可视化：每批结束后更新 found/needed/tried/hitRate
   */
  const generateInfiniteQuiz = useCallback(async (count: number) => {
    setInfiniteLoading(true);
    setInfiniteProgress({ found: 0, needed: count, tried: 0, hitRate: 0 });
    setCurrentQuestion(0);
    setSelectedAnswer('');
    setScore(0);
    setShowResult(false);

    const CJK_START = 0x4e00;
    const CJK_END = 0x9fa5;
    const CJK_RANGE = CJK_END - CJK_START + 1; // 20902
    const collected: OracleBoneChar[] = [];
    const triedChars = new Set<string>();
    const BATCH_SIZE = 8; // 每批并发数

    while (collected.length < count) {
      // 生成一批随机字
      const batch: string[] = [];
      while (batch.length < BATCH_SIZE && triedChars.size < CJK_RANGE) {
        const code = CJK_START + Math.floor(Math.random() * CJK_RANGE);
        const ch = String.fromCodePoint(code);
        if (!triedChars.has(ch)) {
          triedChars.add(ch);
          batch.push(ch);
        }
      }
      if (batch.length === 0) break; // 字库耗尽（极端情况）

      // 并发抓取（走全局 store 缓存，命中 cache 时秒回）
      const results = await Promise.all(
        batch.map(async (ch) => {
          try {
            const data = await getOrFetch(ch);
            // 验证有 stages[0]（甲骨文阶段）
            if (data?.stages?.[0]?.svgXml || data?.stages?.[0]?.svgPath) {
              return {
                id: `infinite-${collected.length}-${ch}`,
                character: ch,
                traditional: ch,
                traditionalFull: ch,
                pronunciation: '',
                meaning: data.meaning || '',
                visualDescription: '无限模式字',
                strokeCount: 0,
                category: '无限',
                dynasty: '商代',
                culturalContext: '',
                relatedCharacters: [],
                difficulty: 'medium' as const,
                exampleSentence: '',
                icon: '📜',
              } as OracleBoneChar;
            }
            return null;
          } catch {
            return null; // 404 或网络错误，跳过
          }
        })
      );
      const found = results.filter((r): r is OracleBoneChar => r !== null);
      collected.push(...found);

      // 更新进度：已找到 / 需要 / 已尝试 / 命中率
      const triedTotal = triedChars.size;
      const hitRate = triedTotal > 0 ? collected.length / triedTotal : 0;
      setInfiniteProgress({ found: collected.length, needed: count, tried: triedTotal, hitRate });
    }

    setInfiniteLoading(false);
    setInfiniteProgress(null);
    if (collected.length > 0) {
      setCurrentQuiz(collected.slice(0, count));
    } else {
      // 极端情况：连续 404，回退到经典模式
      setMode('classic');
      setCurrentQuiz(getRandomOracleChars(5).slice(0, 5));
    }
  }, [getOrFetch]);

  /** 无限模式改题数时重新生成 */
  const handleInfiniteCountChange = (count: number) => {
    setInfiniteQuestionCount(count);
    generateInfiniteQuiz(count);
  };

  const handleStartNewQuiz = () => {
    handleRestart();
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedDifficulty('all');
    handleRestart();
  };

  const handleDifficultyChange = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
    setSelectedCategory('all');
    handleRestart();
  };

  const currentAnswers = useMemo(() => {
    const answers: Record<string, string> = {};

    for (let i = 0; i <= currentQuestion; i++) {
      if (selectedAnswer) {
        if (i < questions.length) {
          answers[questions[i].id] = selectedAnswer;
        }
      }
    }

    return answers;
  }, [currentQuestion, selectedAnswer, questions]);

  // 生成 4 个选项：正确答案 + 3 个干扰项（从题库随机选），shuffle 打乱位置
  // 修复原 slice 逻辑的两个问题：1) 最后几题选项不足；2) 正确答案总在第一个
  const currentOptions = useMemo<OracleBoneChar[]>(() => {
    if (!currentQuestionData) return [];
    const correct = currentQuestionData;
    const others = questions.filter((q) => q.id !== correct.id);
    // Fisher-Yates 随机选 3 个干扰项
    const shuffled = [...others];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const distractors = shuffled.slice(0, 3);
    // 4 选项 shuffle
    const options = [correct, ...distractors];
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
    // 依赖 currentQuestion 而非 currentQuestionData，避免每次 questions 引用变化重算
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestion, questions]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-emerald-50 to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 dark:from-green-900 dark:via-emerald-900 dark:to-teal-900 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4 tracking-tight">{t('oracleBoneGame.title')}</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            {t('oracleBoneGame.subtitle')}
          </p>
        </div>
      </div>

      {/* Game Section */}
      <RevealOnScroll>
        <div className="max-w-4xl mx-auto px-4 -mt-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-6">
            {!showResult ? (
              <>
                {/* Score Display */}
                <div className="flex justify-between items-center text-lg">
                  <div className="text-gray-700 dark:text-gray-300">
                    {t('oracleBoneGame.question_label', { current: currentQuestion + 1, total: questions.length })}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">⭐</span>
                    <span className="font-bold text-green-600 dark:text-green-400">
                      {t('oracleBoneGame.score_label', { score })}
                    </span>
                  </div>
                </div>

                {/* Question */}
                <div className="text-center py-8">
                  {/* 甲骨文字形渲染：hanziyuan 真实 SVG > 内置手绘 svgPath > 加载中 emoji > fallback emoji */}
                  <div className="w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                    {(() => {
                      if (!currentQuestionData) return null;
                      // 全局 charEvolutionStore 缓存：取 stages[0] 即甲骨文阶段
                      const cached = charCache[currentQuestionData.traditional];
                      const stage0 = cached?.stages?.[0];
                      if (stage0?.svgXml) {
                        return (
                          <div
                            className="w-full h-full dark:invert [&_svg]:w-full [&_svg]:h-full"
                            dangerouslySetInnerHTML={{ __html: stage0.svgXml }}
                          />
                        );
                      }
                      if (stage0?.svgPath) {
                        return (
                          <svg viewBox="0 0 60 90" width="120" height="120" className="dark:invert">
                            <path
                              d={stage0.svgPath}
                              stroke="#27231e"
                              strokeWidth="3"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        );
                      }
                      if (cached === undefined) {
                        return <div className="text-8xl animate-pulse">{currentQuestionData.icon || '📜'}</div>;
                      }
                      return <div className="text-8xl opacity-50">{currentQuestionData.icon || '📜'}</div>;
                    })()}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {t('oracleBoneGame.select_char')}
                  </h2>
                  {/* 答题前不显示答案字（避免泄题）；答完后显示正确答案作为复盘 */}
                  {selectedAnswer && (
                    <div className="space-y-2">
                      <p className="text-gray-600 dark:text-gray-400">
                        正确答案：
                        <span className="font-bold text-green-600 dark:text-green-400">{currentQuestionData?.traditional}</span>
                        {currentQuestionData?.meaning && <span className="ml-2 text-sm">（{currentQuestionData.meaning}）</span>}
                        {selectedAnswer === currentQuestionData?.traditional ? (
                          <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300">答对了</span>
                        ) : (
                          <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300">答错了</span>
                        )}
                      </p>
                      {/* 字源释义：visualDescription + culturalContext + dynasty */}
                      {currentQuestionData?.visualDescription && currentQuestionData.visualDescription !== '随机挑战字' && currentQuestionData.visualDescription !== '无限模式字' && currentQuestionData.visualDescription !== '错题复习' && (
                        <div className="text-sm text-left max-w-md mx-auto bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 border border-amber-200 dark:border-amber-800">
                          <div className="flex items-start gap-2">
                            <span className="text-amber-600 dark:text-amber-400 mt-0.5">字形</span>
                            <span className="text-gray-700 dark:text-gray-300">{currentQuestionData.visualDescription}</span>
                          </div>
                          {currentQuestionData.culturalContext && (
                            <div className="flex items-start gap-2 mt-2">
                              <span className="text-amber-600 dark:text-amber-400 mt-0.5">背景</span>
                              <span className="text-gray-700 dark:text-gray-300">{currentQuestionData.culturalContext}</span>
                            </div>
                          )}
                          {currentQuestionData.dynasty && (
                            <div className="flex items-start gap-2 mt-2">
                              <span className="text-amber-600 dark:text-amber-400 mt-0.5">年代</span>
                              <span className="text-gray-700 dark:text-gray-300">{currentQuestionData.dynasty}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Answer Options */}
                <div className="grid grid-cols-2 gap-4">
                  {Object.keys(currentAnswers).length > 0 && selectedAnswer ? (
                    <>
                      <button
                        onClick={() => handleAnswer(currentAnswers[currentQuestion] || '')}
                        disabled={selectedAnswer !== ''}
                        className={`p-6 rounded-xl text-4xl font-bold transition-all transform hover:scale-105 ${
                          selectedAnswer === currentQuestionData?.traditional
                            ? 'bg-green-100 border-2 border-green-500 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                            : selectedAnswer !== ''
                            ? 'bg-red-100 border-2 border-red-500 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                            : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        {currentAnswers[currentQuestion] || '❓'}
                      </button>

                      <button
                        onClick={handleNextQuestion}
                        className="p-6 rounded-xl text-4xl font-bold transition-all transform hover:scale-105 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300"
                      >
                        {currentQuestion >= questions.length - 1 ? t('oracleBoneGame.complete') : t('oracleBoneGame.next_question')}
                      </button>
                    </>
                  ) : (
                    currentOptions.map((q, idx) => (
                      <button
                        key={`${q.id}-${idx}`}
                        onClick={() => handleAnswer(q.traditional)}
                        disabled={!!selectedAnswer}
                        className={`p-6 rounded-xl text-4xl font-bold transition-all transform hover:scale-105 ${
                          selectedAnswer
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 hover:from-green-100 hover:to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 dark:hover:from-green-900/40 dark:hover:to-emerald-900/40 text-green-700 dark:text-green-300'
                        }`}
                      >
                        {q.traditional}
                      </button>
                    ))
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Result */}
                <div className="text-center py-12">
                  <div className="text-8xl mb-6">🏆</div>
                  <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    {t('oracleBoneGame.game_complete')}
                  </h2>
                  <p className="text-6xl font-bold text-green-600 dark:text-green-400 mb-4">
                    {t('oracleBoneGame.final_score', { score })}
                  </p>
                  <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                    {(() => {
                      // 按题数动态计算满分，适配经典 5 题 / 随机 5/10/20 题
                      const totalScore = questions.length * 10;
                      if (score === totalScore) return t('oracleBoneGame.result_perfect');
                      if (score >= totalScore * 0.8) return t('oracleBoneGame.result_excellent');
                      if (score >= totalScore * 0.6) return t('oracleBoneGame.result_good');
                      return t('oracleBoneGame.result_poor');
                    })()}
                  </p>

                  {/* 历史成绩 + 破纪录提示 */}
                  <div className="flex flex-wrap items-center justify-center gap-3 mb-8 text-sm">
                    <span className="px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700">
                      历史最高分：{bestScore}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700">
                      历史最高正确率：{Math.round(bestAccuracy * 100)}%
                    </span>
                    <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                      累计答题：{totalGames} 次
                    </span>
                    {recordHint?.newBestScore && (
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold animate-pulse">
                        🎉 新最高分纪录！
                      </span>
                    )}
                    {recordHint?.newBestAccuracy && !recordHint?.newBestScore && (
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold animate-pulse">
                        🎯 新正确率纪录！
                      </span>
                    )}
                  </div>

                  {/* Result Details */}
                  <div className="max-w-2xl mx-auto bg-gray-50 dark:bg-gray-700/30 rounded-xl p-6 mb-8">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-left">
                      {t('oracleBoneGame.analysis')}
                    </h3>
                    {questions.map((q, index) => (
                      <div
                        key={q.id}
                        className={`flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-600 last:border-0 ${
                          selectedAnswer === q.traditional ? 'text-green-700 dark:text-green-300' : ''
                        }`}
                      >
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {t('oracleBoneGame.question_no', { index: index + 1, oracle: q.character, simplified: q.traditional })}
                        </span>
                        <div className="flex items-center gap-3">
                          {selectedAnswer === q.traditional && (
                            <span className="text-xl">✓</span>
                          )}
                          {selectedAnswer !== q.traditional && selectedAnswer !== '' && (
                            <span className="text-xl">✗</span>
                          )}
                          <Link
                            to={`/char-evolution?char=${encodeURIComponent(q.traditional)}`}
                            className="text-xs px-2 py-1 rounded border border-amber-400/50 text-amber-600 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors"
                          >
                            查看演变 →
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-wrap justify-center gap-4">
                    <button
                      onClick={handleRestart}
                      className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                    >
                      {t('oracleBoneGame.restart')}
                    </button>
                    <button
                      onClick={handleStartNewQuiz}
                      className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                    >
                      {t('oracleBoneGame.change_quiz')}
                    </button>
                    {wrongChars.length > 0 && mode !== 'review' && (
                      <button
                        onClick={() => handleModeChange('review')}
                        className="px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                      >
                        复习错题（{wrongChars.length} 字）
                      </button>
                    )}
                  </div>

                  {/* 错题本展示 */}
                  {wrongChars.length > 0 && (
                    <div className="max-w-2xl mx-auto bg-rose-50 dark:bg-rose-900/20 rounded-xl p-6 mt-8 text-left">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-900 dark:text-white">
                          📝 错题本（{wrongChars.length} 字）
                        </h3>
                        <button
                          onClick={clearWrong}
                          className="text-xs px-2 py-1 rounded border border-rose-300 dark:border-rose-700 text-rose-600 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-colors"
                        >
                          清空
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {wrongChars.slice(0, 30).map((w) => (
                          <div
                            key={w.char}
                            className="group relative px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-rose-200 dark:border-rose-800 hover:border-rose-400 transition-colors"
                          >
                            <span className="font-bold text-xl text-gray-900 dark:text-white">{w.char}</span>
                            {w.meaning && (
                              <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">{w.meaning}</span>
                            )}
                            <button
                              onClick={() => removeWrong(w.char)}
                              className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                              title="移除"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                        {wrongChars.length > 30 && (
                          <span className="text-xs text-gray-400 self-center">+{wrongChars.length - 30} 字</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Mode Switcher + Quiz Options */}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700 space-y-4">
              {/* 模式切换 */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleModeChange('classic')}
                  className={`flex-1 px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                    mode === 'classic'
                      ? 'bg-green-600 text-white shadow-md'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  经典题库（40 字）
                </button>
                <button
                  onClick={() => handleModeChange('random')}
                  className={`flex-1 px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                    mode === 'random'
                      ? 'bg-amber-600 text-white shadow-md'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  随机挑战（120 字）
                </button>
                <button
                  onClick={() => handleModeChange('infinite')}
                  className={`flex-1 px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                    mode === 'infinite'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  无限挑战（CJK 2 万字）
                </button>
                {wrongChars.length > 0 && (
                  <button
                    onClick={() => handleModeChange('review')}
                    className={`flex-1 px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                      mode === 'review'
                        ? 'bg-rose-600 text-white shadow-md'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    复习错题（{wrongChars.length} 字）
                  </button>
                )}
              </div>

              {/* 无限模式 loading 提示 + 进度可视化 */}
              {mode === 'infinite' && infiniteLoading && infiniteProgress && (
                <div className="text-center py-4 space-y-3">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    正在从 Unicode CJK 基本区（20902 字）随机选字，抓取甲骨文字源...
                  </p>
                  {/* 进度条 */}
                  <div className="max-w-md mx-auto">
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                      <span>已找到 {infiniteProgress.found} / {infiniteProgress.needed} 字</span>
                      <span>已尝试 {infiniteProgress.tried} 字 · 命中率 {Math.round(infiniteProgress.hitRate * 100)}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                        style={{ width: `${Math.min(100, (infiniteProgress.found / infiniteProgress.needed) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 经典模式：分类/难度选择 */}
              {mode === 'classic' && (
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('oracleBoneGame.category_label')}
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => handleCategoryChange(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="all">{t('oracleBoneGame.all_category')}</option>
                      <option value="自然">{t('oracleBoneGame.category_nature')}</option>
                      <option value="社会">{t('oracleBoneGame.category_society')}</option>
                      <option value="生活">{t('oracleBoneGame.category_life')}</option>
                    </select>
                  </div>

                  <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('oracleBoneGame.difficulty_label')}
                    </label>
                    <select
                      value={selectedDifficulty}
                      onChange={(e) => handleDifficultyChange(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="all">{t('oracleBoneGame.all_difficulty')}</option>
                      <option value="easy">{t('oracleBoneGame.difficulty_easy')}</option>
                      <option value="medium">{t('oracleBoneGame.difficulty_medium')}</option>
                      <option value="hard">{t('oracleBoneGame.difficulty_hard')}</option>
                    </select>
                  </div>
                </div>
              )}

              {/* 随机模式：题数选择 */}
              {mode === 'random' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    题目数量
                  </label>
                  <div className="flex gap-2">
                    {[5, 10, 20].map((n) => (
                      <button
                        key={n}
                        onClick={() => handleRandomCountChange(n)}
                        className={`flex-1 px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                          randomQuestionCount === n
                            ? 'bg-amber-600 text-white shadow-md'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {n} 题
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    从 120 字池随机选字，实时抓取甲骨文 SVG。每题 4 选项随机打乱。
                  </p>
                </div>
              )}

              {/* 无限模式：题数选择 */}
              {mode === 'infinite' && !infiniteLoading && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    题目数量（从 2 万字动态生成，404 自动重试）
                  </label>
                  <div className="flex gap-2">
                    {[5, 10, 20].map((n) => (
                      <button
                        key={n}
                        onClick={() => handleInfiniteCountChange(n)}
                        className={`flex-1 px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                          infiniteQuestionCount === n
                            ? 'bg-purple-600 text-white shadow-md'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {n} 题
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    从 Unicode CJK 基本区（U+4E00-U+9FA5，20902 字）随机选字，调 hanziyuan.net 抓取字源。命中率约 50%，加载时间 5-15 秒。
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </RevealOnScroll>

      {/* Character Info Section */}
      <RevealOnScroll>
        <div className="max-w-6xl mx-auto px-4 py-12">
          <SectionHeader label={t('oracleBoneGame.dictionary_label')} title={t('oracleBoneGame.dictionary_title')} description={t('oracleBoneGame.dictionary_desc')} />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {ORACLE_BONE_CHARS.slice(0, 10).map((char) => (
              <Link
                key={char.id}
                to={`/char-evolution?char=${encodeURIComponent(char.traditional)}`}
                className="block bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 text-center hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer"
              >
                <div className="w-16 h-16 mx-auto mb-2 flex items-center justify-center">
                  {(() => {
                    const stage0 = charCache[char.traditional]?.stages?.[0];
                    if (stage0?.svgXml) {
                      return (
                        <div
                          className="w-full h-full dark:invert [&_svg]:w-full [&_svg]:h-full"
                          dangerouslySetInnerHTML={{ __html: stage0.svgXml }}
                        />
                      );
                    }
                    if (stage0?.svgPath) {
                      return (
                        <svg viewBox="0 0 60 90" width="56" height="56" className="dark:invert">
                          <path
                            d={stage0.svgPath}
                            stroke="#27231e"
                            strokeWidth="3"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      );
                    }
                    return <div className="text-4xl opacity-50">{char.icon}</div>;
                  })()}
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {char.character}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {char.traditional}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-500">
                  {char.meaning}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </RevealOnScroll>
    </div>
  );
};

export default OracleBoneGamePage;
