import { useState, useMemo } from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import {
  ORACLE_BONE_CHARS,
  getRandomOracleChars,
  getOracleCharById,
  calculateScore,
  getOracleCharsByCategory,
  getOracleCharsByDifficulty
} from '@/data/features/oracleData';

const OracleBoneGamePage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(ORACLE_BONE_CHARS.slice(0, 5));
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const questions = useMemo(() => {
    return currentQuiz;
  }, [currentQuiz]);

  const currentQuestionData = useMemo(() => {
    return questions[currentQuestion];
  }, [currentQuestion, questions]);

  const shuffleAnswers = (correctChar: any): string[] => {
    const wrongAnswers = ORACLE_BONE_CHARS
      .filter(char => char.id !== correctChar.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(char => char.traditional);

    return [correctChar.traditional, ...wrongAnswers].sort(() => Math.random() - 0.5);
  };

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

    // Generate new quiz
    let quiz: typeof ORACLE_BONE_CHARS;
    if (selectedCategory !== 'all' && selectedCategory !== 'all') {
      quiz = getOracleCharsByCategory(selectedCategory);
    } else if (selectedDifficulty !== 'all') {
      quiz = getOracleCharsByDifficulty(selectedDifficulty);
    } else {
      quiz = getRandomOracleChars(5);
    }

    setCurrentQuiz(quiz.slice(0, 5));
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-emerald-50 to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 dark:from-green-900 dark:via-emerald-900 dark:to-teal-900 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4 tracking-tight">甲骨文识读游戏</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            探索3000年前的文字，识读甲骨文，了解商代文明
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
                    题目: {currentQuestion + 1} / {questions.length}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">⭐</span>
                    <span className="font-bold text-green-600 dark:text-green-400">
                      得分: {score}
                    </span>
                  </div>
                </div>

                {/* Question */}
                <div className="text-center py-8">
                  <div className="text-8xl mb-6 animate-pulse">
                    {currentQuestionData?.icon || '📜'}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    请选择对应的汉字
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    甲骨文: {currentQuestionData?.character} · 简体: {currentQuestionData?.traditional}
                  </p>
                </div>

                {/* Answer Options */}
                <div className="grid grid-cols-2 gap-4">
                  {currentAnswers.length > 0 && selectedAnswer ? (
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
                        {currentQuestion >= questions.length - 1 ? '完成' : '下一题'}
                      </button>
                    </>
                  ) : (
                    questions.slice(currentQuestion, currentQuestion + 4).map((q) => (
                      <button
                        key={q.id}
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
                    游戏完成!
                  </h2>
                  <p className="text-6xl font-bold text-green-600 dark:text-green-400 mb-4">
                    {score}分
                  </p>
                  <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                    {score === 50 && '完美！你对甲骨文非常了解！'}
                    {score > 40 && '优秀！继续努力，你会更棒的！'}
                    {score > 30 && '良好！还需要多练习哦！'}
                    {score <= 30 && '加油！多学习甲骨文，你会进步的！'}
                  </p>

                  {/* Result Details */}
                  <div className="max-w-2xl mx-auto bg-gray-50 dark:bg-gray-700/30 rounded-xl p-6 mb-8">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-left">
                      答题解析
                    </h3>
                    {questions.map((q, index) => (
                      <div
                        key={q.id}
                        className={`flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-600 last:border-0 ${
                          selectedAnswer === q.traditional ? 'text-green-700 dark:text-green-300' : ''
                        }`}
                      >
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          第{index + 1}题: {q.character} = {q.traditional}
                        </span>
                        {selectedAnswer === q.traditional && (
                          <span className="text-xl">✓</span>
                        )}
                        {selectedAnswer !== q.traditional && selectedAnswer !== '' && (
                          <span className="text-xl">✗</span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-wrap justify-center gap-4">
                    <button
                      onClick={handleRestart}
                      className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                    >
                      🔄 重新开始
                    </button>
                    <button
                      onClick={handleStartNewQuiz}
                      className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                    >
                      🎲 换一批题目
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Quiz Options */}
            <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  📚 字形类别
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="all">全部类别</option>
                  <option value="自然">自然</option>
                  <option value="社会">社会</option>
                  <option value="生活">生活</option>
                </select>
              </div>

              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ⭐ 难度选择
                </label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => handleDifficultyChange(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="all">全部难度</option>
                  <option value="easy">简单</option>
                  <option value="medium">中等</option>
                  <option value="hard">困难</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>

      {/* Character Info Section */}
      <RevealOnScroll>
        <div className="max-w-6xl mx-auto px-4 py-12">
          <SectionHeader title="📖 甲骨文字典" subtitle="所有甲骨文字符的详细信息" />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {ORACLE_BONE_CHARS.slice(0, 10).map((char, index) => (
              <div
                key={char.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 text-center hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer"
              >
                <div className="text-4xl mb-2">{char.icon}</div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {char.character}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {char.traditional}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-500">
                  {char.meaning}
                </div>
              </div>
            ))}
          </div>
        </div>
      </RevealOnScroll>
    </div>
  );
};

export default OracleBoneGamePage;
