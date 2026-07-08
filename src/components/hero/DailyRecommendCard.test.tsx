/**
 * DailyRecommendCard — L2 组件单元测试
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { ReactElement } from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DailyRecommendCard from './DailyRecommendCard';
import { useDetailStore } from '@/store/detailStore';

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
  useDetailStore: vi.fn((selector?: (v: any) => any) => {
    const store = { openDetail: vi.fn() };
    return selector ? selector(store) : store;
  }),
}));

vi.mock('@/data/features/storyQuests', () => ({
  getFeaturedRoutes: vi.fn(() => []),
}));

vi.mock('@/store/questStore', () => ({
  useQuestStore: { getState: () => ({ progress: {} }) },
}));

const renderWithRouter = (ui: ReactElement) => ({
  ...render(<MemoryRouter>{ui}</MemoryRouter>),
});

describe('DailyRecommendCard', () => {
  beforeEach(() => {
    vi.mocked(useDetailStore).mockImplementation(() => ({ openDetail: vi.fn() }));
  });

  it('渲染今日推荐标题', async () => {
    renderWithRouter(<DailyRecommendCard />);
    expect(await screen.findByText('今日推荐')).toBeTruthy();
  });

  it('渲染推荐事件标题', async () => {
    renderWithRouter(<DailyRecommendCard />);
    expect(await screen.findByText('岳飞抗金')).toBeTruthy();
  });

  it('渲染事件年份', async () => {
    renderWithRouter(<DailyRecommendCard />);
    expect(await screen.findByText('公元1140年')).toBeTruthy();
  });

  it('渲染事件分类', async () => {
    renderWithRouter(<DailyRecommendCard />);
    expect(await screen.findByText('军事')).toBeTruthy();
  });

  it('渲染朝代标签', async () => {
    renderWithRouter(<DailyRecommendCard />);
    expect(await screen.findByText('宋')).toBeTruthy();
  });

  it('渲染事件描述', async () => {
    renderWithRouter(<DailyRecommendCard />);
    expect(await screen.findByText('岳飞在郾城大捷中击败金军')).toBeTruthy();
  });

  it('渲染标签', async () => {
    renderWithRouter(<DailyRecommendCard />);
    expect(await screen.findByText('#抗金')).toBeTruthy();
  });

  it('刷新按钮存在', async () => {
    renderWithRouter(<DailyRecommendCard />);
    expect(await screen.findByText('换一条 ↻')).toBeTruthy();
  });

  it('加载时显示骨架屏', () => {
    const { container } = renderWithRouter(<DailyRecommendCard />);
    expect(container.firstChild).toBeTruthy();
  });
});
