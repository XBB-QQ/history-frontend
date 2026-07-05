/**
 * 历史信物鉴定 — 评分引擎
 * @see ITERATIONS.md #100
 */

import { ARTIFACT_QUESTIONS, getGrade, type ArtifactQuestion, type QuizScore } from '@/data/features/artifactQuizData';

/** 答题记录 */
export interface AnswerRecord {
  questionId: string;
  selectedAnswer: string;
  correct: boolean;
  points: number;
}

/**
 * 随机抽取题目
 */
export function getRandomQuestions(count: number = 5): ArtifactQuestion[] {
  const shuffled = [...ARTIFACT_QUESTIONS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

/**
 * 评分
 */
export function calculateScore(answers: AnswerRecord[]): QuizScore {
  const total = answers.reduce((sum, a) => sum + a.points, 0);
  const correct = answers.filter(a => a.correct).length;
  const wrong = answers.length - correct;
  const accuracy = answers.length > 0 ? Math.round((correct / answers.length) * 100) : 0;

  const score: QuizScore = { total, correct, wrong, accuracy, grade: '' };
  return { ...score, grade: getGrade(score) };
}

/**
 * 保存成绩到 localStorage
 */
export function saveScore(score: QuizScore): void {
  const stored = localStorage.getItem('artifact-quiz-scores');
  const scores: QuizScore[] = stored ? JSON.parse(stored) : [];
  scores.push({ ...score, grade: getGrade(score) });
  localStorage.setItem('artifact-quiz-scores', JSON.stringify(scores));
}

/**
 * 获取历史成绩
 */
export function getScores(): QuizScore[] {
  const stored = localStorage.getItem('artifact-quiz-scores');
  return stored ? JSON.parse(stored) : [];
}
