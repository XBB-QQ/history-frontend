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
import { fetchCharEvolutionByChar } from '@/services/api';
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

type GameMode = 'classic' | 'random' | 'infinite';

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

  // 字 → 甲骨文字形缓存（key=简体字）
  // value: { svgXml?: string; svgPath?: string } 优先用 svgXml（hanziyuan 真实字源），其次 svgPath（内置 30 字手绘）
  // value: null 表示已抓取且失败，fallback 到 emoji
  const [svgCache, setSvgCache] = useState<Record<string, { svgXml?: string; svgPath?: string } | null>>({});

  const questions = useMemo(() => {
    return currentQuiz;
  }, [currentQuiz]);

  const currentQuestionData = useMemo(() => {
    return questions[currentQuestion];
  }, [currentQuestion, questions]);

  // 抓取单字甲骨文 SVG（取 stages[0] 即甲骨文阶段）
  // 同时存 svgXml（hanziyuan）和 svgPath（内置 30 字），渲染时优先 svgXml
  const fetchOracleSvg = useCallback(async (ch: string) => {
    if (svgCache[ch] !== undefined) return;
    try {
      const data = await fetchCharEvolutionByChar(ch);
      const stage0 = data.stages?.[0];
      const entry = stage0 ? { svgXml: stage0.svgXml, svgPath: stage0.svgPath } : null;
      setSvgCache((prev) => ({ ...prev, [ch]: entry }));
    } catch {
      setSvgCache((prev) => ({ ...prev, [ch]: null }));
    }
  }, [svgCache]);

  // 当前题目变化时抓取该字甲骨文 SVG
  useEffect(() => {
    const ch = currentQuestionData?.traditional;
    if (ch) fetchOracleSvg(ch);
  }, [currentQuestionData, fetchOracleSvg]);

  // 字典区前 10 字批量预加载
  useEffect(() => {
    ORACLE_BONE_CHARS.slice(0, 10).forEach((c) => fetchOracleSvg(c.traditional));
  }, [fetchOracleSvg]);

  const handleAnswer = (answer: string) => {
    if (!selectedAnswer) {
      setSelectedAnswer(answer);

      if (answer === currentQuestionData.traditional) {
        setScore(score + 10);
      }
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer('');
    setCurrentQuestion(currentQuestion + 1);

    if (currentQuestion >= questions.length - 1) {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer('');
    setScore(0);
    setShowResult(false);

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
    if (newMode === 'random') {
      const randomChars = getRandomChars(randomQuestionCount);
      setCurrentQuiz(randomChars.map((rc, idx) => adaptRandomToOracle(rc, idx)));
    } else if (newMode === 'infinite') {
      generateInfiniteQuiz(infiniteQuestionCount);
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
   *  并发批量调 fetchCharEvolutionByChar，404 跳过重试，直到凑够所需题数
   *  meaning 字段从后端响应拿，没有就空
   */
  const generateInfiniteQuiz = useCallback(async (count: number) => {
    setInfiniteLoading(true);
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

      // 并发抓取
      const results = await Promise.all(
        batch.map(async (ch) => {
          try {
            const data = await fetchCharEvolutionByChar(ch);
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
      collected.push(...results.filter((r): r is OracleBoneChar => r !== null));
    }

    setInfiniteLoading(false);
    if (collected.length > 0) {
      setCurrentQuiz(collected.slice(0, count));
    } else {
      // 极端情况：连续 404，回退到经典模式
      setMode('classic');
      setCurrentQuiz(getRandomOracleChars(5).slice(0, 5));
    }
  }, []);

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
                      const entry = svgCache[currentQuestionData.traditional];
                      if (entry?.svgXml) {
                        return (
                          <div
                            className="w-full h-full dark:invert [&_svg]:w-full [&_svg]:h-full"
                            dangerouslySetInnerHTML={{ __html: entry.svgXml }}
                          />
                        );
                      }
                      if (entry?.svgPath) {
                        return (
                          <svg viewBox="0 0 60 90" width="120" height="120" className="dark:invert">
                            <path
                              d={entry.svgPath}
                              stroke="#27231e"
                              strokeWidth="3"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        );
                      }
                      if (entry === undefined) {
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
                    <p className="text-gray-600 dark:text-gray-400">
                      正确答案：<span className="font-bold text-green-600 dark:text-green-400">{currentQuestionData?.traditional}</span>
                      {currentQuestionData?.meaning && <span className="ml-2 text-sm">（{currentQuestionData.meaning}）</span>}
                    </p>
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
                  <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                    {(() => {
                      // 按题数动态计算满分，适配经典 5 题 / 随机 5/10/20 题
                      const totalScore = questions.length * 10;
                      if (score === totalScore) return t('oracleBoneGame.result_perfect');
                      if (score >= totalScore * 0.8) return t('oracleBoneGame.result_excellent');
                      if (score >= totalScore * 0.6) return t('oracleBoneGame.result_good');
                      return t('oracleBoneGame.result_poor');
                    })()}
                  </p>

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
                  </div>
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
              </div>

              {/* 无限模式 loading 提示 */}
              {mode === 'infinite' && infiniteLoading && (
                <div className="text-center py-4">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    正在从 Unicode CJK 基本区（20902 字）随机选字，抓取甲骨文字源...
                  </p>
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
                    const entry = svgCache[char.traditional];
                    if (entry?.svgXml) {
                      return (
                        <div
                          className="w-full h-full dark:invert [&_svg]:w-full [&_svg]:h-full"
                          dangerouslySetInnerHTML={{ __html: entry.svgXml }}
                        />
                      );
                    }
                    if (entry?.svgPath) {
                      return (
                        <svg viewBox="0 0 60 90" width="56" height="56" className="dark:invert">
                          <path
                            d={entry.svgPath}
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
