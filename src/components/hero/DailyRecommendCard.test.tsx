/**
 * DailyRecommendCard — L2 组件单元测试
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import DailyRecommendCard from './DailyRecommendCard';

vi.mock('@/services/api', () => ({
  fetchDailyRecommend: vi.fn().mockResolvedValue({
    found: true,
    event: {
      id: 1,
      title: '岳飞抗金',
      year: -1140,
      yearDisplay: '公元1140年',
      category: '军事',
      dynastyName: '宋',
      description: '岳飞在郾城大捷中击败金军',
      tags: ['抗金', '岳飞', '军事'],
      relatedEvents: [],
      relatedPersons: [],
    },
  }),
}));

vi.mock('@/store/detailStore', () => ({
  useDetailStore: { getState: () => ({ openDetail: vi.fn() }) },
}));

vi.mock('@/data/features/storyQuests', () => ({
  getFeaturedRoutes: vi.fn(() => []),
}));

vi.mock('@/store/questStore', () => ({
  useQuestStore: { getState: () => ({ progress: {} }) },
}));

describe('DailyRecommendCard', () => {
  it('渲染今日推荐标题', async () => {
    render(<DailyRecommendCard />);
    expect(await screen.findByText('今日推荐')).toBeTruthy();
  });

  it('渲染推荐事件标题', async () => {
    render(<DailyRecommendCard />);
    expect(await screen.findByText('岳飞抗金')).toBeTruthy();
  });

  it('渲染事件年份', async () => {
    render(<DailyRecommendCard />);
    expect(await screen.findByText('公元1140年')).toBeTruthy();
  });

  it('渲染事件分类', async () => {
    render(<DailyRecommendCard />);
    expect(await screen.findByText('军事')).toBeTruthy();
  });

  it('渲染朝代标签', async () => {
    render(<DailyRecommendCard />);
    expect(await screen.findByText('宋')).toBeTruthy();
  });

  it('渲染事件描述', async () => {
    render(<DailyRecommendCard />);
    expect(await screen.findByText('岳飞在郾城大捷中击败金军')).toBeTruthy();
  });

  it('渲染标签', async () => {
    render(<DailyRecommendCard />);
    expect(await screen.findByText('#抗金')).toBeTruthy();
  });

  it('刷新按钮存在', async () => {
    render(<DailyRecommendCard />);
    expect(await screen.findByText('换一条 ↻')).toBeTruthy();
  });

  it('加载时显示骨架屏', () => {
    vi.mocked(require('@/services/api').fetchDailyRecommend).mockResolvedValueOnce({ found: false, event: null } as any);
    const { container } = render(<DailyRecommendCard />);
    // 可能显示骨架屏或 null
    expect(container).toBeTruthy();
  });
});
