/**
 * gradeArtifact — L1 单元测试
 * @see ITERATIONS.md #100
 */

import { describe, it, expect } from 'vitest';
import { calculateScore, getRandomQuestions, saveScore, getScores } from '@/utils/gradeArtifact';

describe('calculateScore', () => {
  it('全对返回正确分数', () => {
    const answers = [
      { questionId: '1', selectedAnswer: 'a', correct: true, points: 10 },
      { questionId: '2', selectedAnswer: 'a', correct: true, points: 10 },
      { questionId: '3', selectedAnswer: 'a', correct: true, points: 10 },
    ];
    const result = calculateScore(answers);
    expect(result.total).toBe(30);
    expect(result.correct).toBe(3);
    expect(result.wrong).toBe(0);
    expect(result.accuracy).toBe(100);
    expect(result.grade).toBeDefined();
  });

  it('全错返回 0 正确', () => {
    const answers = [
      { questionId: '1', selectedAnswer: 'b', correct: false, points: 0 },
      { questionId: '2', selectedAnswer: 'b', correct: false, points: 0 },
    ];
    const result = calculateScore(answers);
    expect(result.correct).toBe(0);
    expect(result.wrong).toBe(2);
    expect(result.accuracy).toBe(0);
  });

  it('空数组返回 0', () => {
    const result = calculateScore([]);
    expect(result.correct).toBe(0);
    expect(result.wrong).toBe(0);
    expect(result.total).toBe(0);
    expect(result.accuracy).toBe(0);
  });

  it('正确率计算合理', () => {
    const answers = [
      { questionId: '1', selectedAnswer: 'a', correct: true, points: 10 },
      { questionId: '2', selectedAnswer: 'b', correct: false, points: 0 },
    ];
    const result = calculateScore(answers);
    expect(result.accuracy).toBe(50);
    expect(result.correct).toBe(1);
    expect(result.wrong).toBe(1);
  });
});

describe('getRandomQuestions', () => {
  it('默认返回 5 题', () => {
    const questions = getRandomQuestions();
    expect(questions.length).toBe(5);
  });

  it('返回的题目包含 id 字段', () => {
    const questions = getRandomQuestions(3);
    questions.forEach(q => {
      expect(q).toHaveProperty('id');
    });
  });

  it('返回的题目包含 name 字段', () => {
    const questions = getRandomQuestions(3);
    questions.forEach(q => {
      expect(q).toHaveProperty('name');
    });
  });
});

describe('saveScore / getScores', () => {
  it('保存后能读取', () => {
    const mockScore = { total: 30, correct: 3, wrong: 2, accuracy: 60, grade: '良' };
    saveScore(mockScore);
    const scores = getScores();
    expect(scores.length).toBeGreaterThan(0);
  });
});
