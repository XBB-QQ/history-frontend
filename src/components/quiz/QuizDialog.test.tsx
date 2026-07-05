/**
 * QuizDialog — L2 组件单元测试
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import QuizDialog from './QuizDialog';

vi.mock('@/services/api', () => ({
  fetchDailyQuiz: vi.fn().mockResolvedValue({
    id: 1,
    question: '秦始皇统一中国是在哪一年？',
    options: ['前221年', '前202年', '前256年', '前356年'],
    correctIndex: 0,
    difficulty: 'easy',
    category: '政治',
    dynasty: '秦',
  }),
  submitQuizAnswer: vi.fn().mockResolvedValue({
    correct: true,
    pointsEarned: 10,
    explanation: '公元前221年，秦始皇统一六国',
  }),
}));

vi.mock('@/store/userStore', () => ({
  useUserStore: {
    getState: () => ({ user: null, updateQuizScore: vi.fn() }),
  },
}));

describe('QuizDialog', () => {
  it('打开时加载题目', async () => {
    render(<QuizDialog isOpen onClose={() => {}} />);
    expect(await screen.findByText('秦始皇统一中国是在哪一年？')).toBeTruthy();
  });

  it('关闭时不渲染内容', () => {
    const { container } = render(<QuizDialog isOpen={false} onClose={() => {}} />);
    expect(container.innerHTML).toBe('');
  });

  it('渲染难度标签', async () => {
    render(<QuizDialog isOpen onClose={() => {}} />);
    expect(await screen.findByText('简单')).toBeTruthy();
  });

  it('渲染选项', async () => {
    render(<QuizDialog isOpen onClose={() => {}} />);
    expect(await screen.findByText('前221年')).toBeTruthy();
    expect(screen.getByText('前202年')).toBeTruthy();
    expect(screen.getByText('前256年')).toBeTruthy();
    expect(screen.getByText('前356年')).toBeTruthy();
  });

  it('点击选项选中', async () => {
    render(<QuizDialog isOpen onClose={() => {}} />);
    const option = await screen.findByText('前221年');
    fireEvent.click(option);
    expect(option).toBeTruthy();
  });

  it('已作答后显示提交按钮', async () => {
    render(<QuizDialog isOpen onClose={() => {}} />);
    const option = await screen.findByText('前221年');
    fireEvent.click(option);
    expect(screen.getByText('提交答案')).toBeTruthy();
  });

  it('提交后显示结果', async () => {
    render(<QuizDialog isOpen onClose={() => {}} />);
    const option = await screen.findByText('前221年');
    fireEvent.click(option);
    await screen.findByText('提交答案');
    fireEvent.click(screen.getByText('提交答案'));
    expect(await screen.findByText('回答正确！')).toBeTruthy();
  });

  it('显示积分奖励', async () => {
    render(<QuizDialog isOpen onClose={() => {}} />);
    const option = await screen.findByText('前221年');
    fireEvent.click(option);
    await screen.findByText('提交答案');
    fireEvent.click(screen.getByText('提交答案'));
    expect(await screen.findByText('+10 分')).toBeTruthy();
  });

  it('显示解析', async () => {
    render(<QuizDialog isOpen onClose={() => {}} />);
    const option = await screen.findByText('前221年');
    fireEvent.click(option);
    await screen.findByText('提交答案');
    fireEvent.click(screen.getByText('提交答案'));
    expect(await screen.findByText('公元前221年，秦始皇统一六国')).toBeTruthy();
  });
});
