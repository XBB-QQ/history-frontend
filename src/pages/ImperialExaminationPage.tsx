/**
 * 科举考试沉浸模拟器
 * @see history-museum/ITERATIONS.md Iteration #80
 *
 * 沉浸式模拟古代科举考试，体验科举制度
 */

import { useState, useMemo } from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import { EXAM_PAPERS, TYPE_STATS, CATEGORY_STATS, type ExamPaper } from '@/data/features/examinationData';
import { useT } from '@/i18n/i18n';

import './ImperialExaminationPage.module.css';

export default function ImperialExaminationPage() {
  const t = useT();
  const [selectedPaper, setSelectedPaper] = useState<ExamPaper | null>(EXAM_PAPERS[0]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [showPaperList, setShowPaperList] = useState(true);

  const currentQuestion = selectedPaper?.questions[currentQuestionIndex];

  const calculateScore = useMemo(() => {
    if (!selectedPaper || Object.keys(answers).length === 0) return 0;

    let totalScore = 0;
    selectedPaper.questions.forEach((question: any) => {
      if (answers[question.id] === question.answer) {
        totalScore += question.points;
      }
    });

    return totalScore;
  }, [selectedPaper, answers]);

  const passed = calculateScore >= (selectedPaper?.passingScore || 0);

  const handleSelectPaper = (paper: ExamPaper) => {
    setSelectedPaper(paper);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
    setShowPaperList(false);
  };

  const handleAnswer = (answer: string) => {
    setAnswers({
      ...answers,
      [currentQuestion!.id]: answer
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < selectedPaper!.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
  };

  const handleBack = () => {
    setShowResults(false);
    setShowPaperList(true);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case '入门':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case '中级':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case '高级':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <SectionHeader
        label={t('imperialExamination.label')}
        title={t('imperialExamination.title')}
        description={t('imperialExamination.description')}
      />

      <RevealOnScroll>
        <div className="exam-container max-w-4xl mx-auto">
          {/* 选择考试试卷 */}
          {showPaperList && (
            <div className="paper-list p-6 md:p-8 rounded-2xl border-2 border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 shadow-lg mb-6">
              <h2 className="text-2xl font-bold text-ink-900 dark:text-ink-100 mb-6">
                {t('imperialExamination.select_paper')}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {EXAM_PAPERS.map(paper => (
                  <div
                    key={paper.id}
                    className="paper-card p-6 rounded-xl border-2 border-ink-200 dark:border-ink-700 bg-ink-50 dark:bg-ink-800 hover:border-accent/50 hover:scale-105 transition-all cursor-pointer"
                    onClick={() => handleSelectPaper(paper)}
                  >
                    <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-2">
                      {paper.title}
                    </h3>

                    <div className="space-y-2 text-sm text-ink-600 dark:text-ink-400 mb-4">
                      <div>{paper.dynasty} · {paper.period}</div>
                      {paper.year && <div>{paper.year}</div>}
                      <div>{t('imperialExamination.duration_label', { duration: paper.duration })}</div>
                      <div>{t('imperialExamination.passing_rate_label', { rate: paper.passingRate })}</div>
                      <div>{t('imperialExamination.total_score_label', { score: paper.totalScore })}</div>
                    </div>

                    <button className="w-full py-2 rounded-lg bg-accent text-white font-bold hover:bg-accent/90 transition-colors">
                      {t('imperialExamination.start_exam')}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 考试界面 */}
          {!showPaperList && !showResults && currentQuestion && (
            <>
              {/* 考试信息 */}
              <div className="exam-info p-4 rounded-xl border-2 border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 shadow-lg mb-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-sm text-ink-500">{t('imperialExamination.paper_label')}</div>
                    <div className="font-bold text-ink-900 dark:text-ink-100">
                      {selectedPaper?.title}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-ink-500">{t('imperialExamination.progress_label')}</div>
                    <div className="font-bold text-accent">
                      {currentQuestionIndex + 1}/{selectedPaper!.questions.length}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-ink-500">{t('imperialExamination.score_label')}</div>
                    <div className="font-bold text-accent">
                      {calculateScore}/{selectedPaper!.totalScore}
                    </div>
                  </div>
                </div>
              </div>

              {/* 题目卡片 */}
              <div className="question-card p-6 md:p-8 rounded-2xl border-2 border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 shadow-lg mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${getDifficultyColor(currentQuestion.difficulty)}`}>
                    {currentQuestion.difficulty}
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm font-bold bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                    {t('imperialExamination.question_points', { points: currentQuestion.points })}
                  </span>
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-ink-700 dark:text-ink-300">{t('imperialExamination.question_type_label')}</span>
                    <span className="text-sm text-ink-600 dark:text-ink-400">
                      {currentQuestion.type === 'choice' ? t('imperialExamination.type_choice') :
                       currentQuestion.type === 'fill' ? t('imperialExamination.type_fill') :
                       currentQuestion.type === 'essay' ? t('imperialExamination.type_essay') :
                       currentQuestion.type === 'match' ? t('imperialExamination.type_match') : t('imperialExamination.type_true_false')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-ink-700 dark:text-ink-300">{t('imperialExamination.category_label')}</span>
                    <span className="text-sm text-ink-600 dark:text-ink-400">
                      {currentQuestion.category}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-ink-900 dark:text-ink-100 mb-6">
                  {currentQuestion.question}
                </h3>

                {/* 题目选项 */}
                {currentQuestion.type === 'choice' && currentQuestion.options && (
                  <div className="space-y-3">
                    {currentQuestion.options.map((option: string, idx: number) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                          answers[currentQuestion.id] === option
                            ? 'border-accent bg-accent/10'
                            : 'border-ink-200 dark:border-ink-700 hover:border-accent/50'
                        }`}
                        onClick={() => handleAnswer(option)}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
                            answers[currentQuestion.id] === option
                              ? 'border-accent bg-accent text-white'
                              : 'border-ink-300 dark:border-ink-600'
                          }">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span>{option}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 题目答案（论述题） */}
                {currentQuestion.type === 'essay' && (
                  <div className="mb-4">
                    <label className="block text-sm font-bold text-ink-700 dark:text-ink-300 mb-2">
                      {t('imperialExamination.answer_essay_label')}
                    </label>
                    <textarea
                      className="input-field w-full h-40"
                      placeholder={t('imperialExamination.answer_essay_placeholder')}
                      value={answers[currentQuestion.id] || ''}
                      onChange={(e) => setAnswers({...answers, [currentQuestion.id]: e.target.value})}
                    />
                  </div>
                )}

                {/* 题目答案（填空题） */}
                {currentQuestion.type === 'fill' && (
                  <div className="mb-4">
                    <label className="block text-sm font-bold text-ink-700 dark:text-ink-300 mb-2">
                      {t('imperialExamination.answer_fill_label')}
                    </label>
                    <input
                      type="text"
                      className="input-field w-full"
                      placeholder={t('imperialExamination.answer_fill_placeholder')}
                      value={answers[currentQuestion.id] || ''}
                      onChange={(e) => setAnswers({...answers, [currentQuestion.id]: e.target.value})}
                    />
                  </div>
                )}

                {/* 题目答案（判断题） */}
                {currentQuestion.type === 'true_false' && (
                  <div className="flex gap-4 mb-4">
                    <button
                      className={`flex-1 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                        answers[currentQuestion.id] === 'true'
                          ? 'border-accent bg-accent/10'
                          : 'border-ink-200 dark:border-ink-700 hover:border-accent/50'
                      }`}
                      onClick={() => handleAnswer('true')}
                    >
                      {t('imperialExamination.answer_true')}
                    </button>
                    <button
                      className={`flex-1 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                        answers[currentQuestion.id] === 'false'
                          ? 'border-accent bg-accent/10'
                          : 'border-ink-200 dark:border-ink-700 hover:border-accent/50'
                      }`}
                      onClick={() => handleAnswer('false')}
                    >
                      {t('imperialExamination.answer_false')}
                    </button>
                  </div>
                )}

                {/* 题目答案（匹配题） */}
                {currentQuestion.type === 'match' && (
                  <div className="mb-4">
                    <label className="block text-sm font-bold text-ink-700 dark:text-ink-300 mb-2">
                      {t('imperialExamination.answer_match_label')}
                    </label>
                    <input
                      type="text"
                      className="input-field w-full"
                      placeholder={t('imperialExamination.answer_match_placeholder')}
                      value={answers[currentQuestion.id] || ''}
                      onChange={(e) => setAnswers({...answers, [currentQuestion.id]: e.target.value})}
                    />
                  </div>
                )}
              </div>

              {/* 导航按钮 */}
              <div className="flex justify-between">
                <button
                  className="px-6 py-3 rounded-lg bg-ink-100 dark:bg-ink-800 text-ink-900 dark:text-ink-100 font-bold hover:bg-ink-200 dark:hover:bg-ink-700 transition-colors"
                  onClick={() => setCurrentQuestionIndex(0)}
                >
                  {t('imperialExamination.restart')}
                </button>

                {currentQuestionIndex > 0 && (
                  <button
                    className="px-6 py-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 font-bold hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                    onClick={handlePrevious}
                  >
                    {t('imperialExamination.previous')}
                  </button>
                )}

                {currentQuestionIndex < selectedPaper!.questions.length - 1 && (
                  <button
                    className="px-6 py-3 rounded-lg bg-accent text-white font-bold hover:bg-accent/90 transition-colors"
                    onClick={handleNext}
                  >
                    {t('imperialExamination.next')}
                  </button>
                )}

                {currentQuestionIndex === selectedPaper!.questions.length - 1 && (
                  <button
                    className="px-6 py-3 rounded-lg bg-green-500 text-white font-bold hover:bg-green-600 transition-colors"
                    onClick={() => setShowResults(true)}
                  >
                    {t('imperialExamination.submit')}
                  </button>
                )}
              </div>
            </>
          )}

          {/* 考试结果 */}
          {showResults && selectedPaper && (
            <div className="result-card p-6 md:p-8 rounded-2xl border-2 border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 shadow-lg mb-6">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">
                  {passed ? '及第' : '落第'}
                </div>

                <h2 className="text-2xl font-bold text-ink-900 dark:text-ink-100 mb-2">
                  {t('imperialExamination.exam_end')}
                </h2>

                <div className="text-5xl font-bold text-accent mb-2">
                  {calculateScore}分
                </div>

                <p className="text-xl">
                  {passed ? t('imperialExamination.passed') : t('imperialExamination.failed')}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-ink-50 dark:bg-ink-800">
                  <div className="text-sm text-ink-500 mb-1">{t('imperialExamination.total_score')}</div>
                  <div className="text-2xl font-bold text-ink-900 dark:text-ink-100">
                    {calculateScore}/{selectedPaper.totalScore}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20">
                  <div className="text-sm text-green-500 mb-1">{t('imperialExamination.passing_score')}</div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {selectedPaper.passingScore}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20">
                  <div className="text-sm text-blue-500 mb-1">{t('imperialExamination.passing_rate')}</div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {selectedPaper.passingRate}
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100">
                  {t('imperialExamination.analysis')}
                </h3>

                {selectedPaper.questions.map((question: any, idx: number) => (
                  <div
                    key={question.id}
                    className={`p-4 rounded-xl ${
                      answers[question.id] === question.answer
                        ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700'
                        : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-sm font-bold text-ink-700 dark:text-ink-300">
                        {t('imperialExamination.question_no', { index: idx + 1 })}
                      </span>
                      {answers[question.id] === question.answer ? (
                        <span className="px-2 py-0.5 rounded text-xs font-bold bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                          {t('imperialExamination.correct')}
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-xs font-bold bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                          {t('imperialExamination.wrong')}
                        </span>
                      )}
                    </div>

                    <p className="text-ink-600 dark:text-ink-400 mb-2">
                      {question.question}
                    </p>

                    {question.explanation && (
                      <p className="text-sm text-ink-500">
                        <span className="font-bold">{t('imperialExamination.explanation_label')}</span>{question.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <button
                  className="flex-1 py-3 rounded-lg bg-ink-100 dark:bg-ink-800 text-ink-900 dark:text-ink-100 font-bold hover:bg-ink-200 dark:hover:bg-ink-700 transition-colors"
                  onClick={handleBack}
                >
                  {t('imperialExamination.back_to_list')}
                </button>

                <button
                  className="flex-1 py-3 rounded-lg bg-accent text-white font-bold hover:bg-accent/90 transition-colors"
                  onClick={handleRestart}
                >
                  {t('imperialExamination.retry')}
                </button>
              </div>
            </div>
          )}

          {/* 考试统计 */}
          <div className="stats-card p-6 md:p-8 rounded-2xl border-2 border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 shadow-lg">
            <h2 className="text-2xl font-bold text-ink-900 dark:text-ink-100 mb-6">
              {t('imperialExamination.stats_title')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 题目类型统计 */}
              <div>
                <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-3">
                  {t('imperialExamination.type_stats')}
                </h3>
                <div className="space-y-3">
                  {Object.entries(TYPE_STATS).map(([type, stat]) => (
                    <div
                      key={type}
                      className="flex items-center justify-between p-3 rounded-lg bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700"
                    >
                      <div>
                        <div className="font-bold text-ink-900 dark:text-ink-100">{stat.icon} {stat.label}</div>
                        <div className="text-sm text-ink-500">{t('imperialExamination.question_count', { count: stat.count })}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 科目统计 */}
              <div>
                <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-3">
                  {t('imperialExamination.category_stats')}
                </h3>
                <div className="space-y-3">
                  {Object.entries(CATEGORY_STATS).map(([category, stat]) => (
                    <div
                      key={category}
                      className="flex items-center justify-between p-3 rounded-lg bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700"
                    >
                      <div>
                        <div className="font-bold text-ink-900 dark:text-ink-100">{stat.icon} {stat.label}</div>
                        <div className="text-sm text-ink-500">{t('imperialExamination.question_count', { count: stat.count })}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 考试小知识 */}
            <div className="mt-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700">
              <h3 className="text-lg font-bold text-amber-800 dark:text-amber-200 mb-2">
                {t('imperialExamination.knowledge_title')}
              </h3>
              <div className="text-amber-700 dark:text-amber-300 text-sm space-y-2">
                <p>{t('imperialExamination.knowledge_1')}</p>
                <p>{t('imperialExamination.knowledge_2')}</p>
                <p>{t('imperialExamination.knowledge_3')}</p>
                <p>{t('imperialExamination.knowledge_4')}</p>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </div>
  );
}
