/**
 * DynastyCard — L2 组件单元测试
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import DynastyCard from './DynastyCard';

vi.mock('@/store/detailStore', () => ({
  useDetailStore: { getState: () => ({ openDetail: vi.fn() }) },
}));

vi.mock('@/components/layout/ThemeProvider', () => ({
  useTheme: () => ({ setDynasty: vi.fn(), dynasty: null }),
}));

vi.mock('@/store/sceneStore', () => ({
  useSceneStore: { getState: () => ({ setSceneByDynasty: vi.fn(), restoreScene: vi.fn() }) },
}));

const mockDynasty = {
  id: 1,
  name: '唐代',
  periodStart: '618年',
  periodEnd: '907年',
  description: '唐朝是中国历史上最强盛的朝代之一',
};

describe('DynastyCard', () => {
  it('渲染朝代名称', () => {
    render(<DynastyCard dynasty={mockDynasty} />);
    expect(screen.getByText('唐代')).toBeTruthy();
  });

  it('渲染朝代时间范围', () => {
    render(<DynastyCard dynasty={mockDynasty} />);
    expect(screen.getByText('618年 — 907年')).toBeTruthy();
  });

  it('渲染朝代描述', () => {
    render(<DynastyCard dynasty={mockDynasty} />);
    expect(screen.getByText('唐朝是中国历史上最强盛的朝代之一')).toBeTruthy();
  });

  it('点击触发 openDetail', () => {
    const mockOpenDetail = vi.fn();
    vi.mocked(require('@/store/detailStore').useDetailStore).getState = () => ({ openDetail: mockOpenDetail });

    render(<DynastyCard dynasty={mockDynasty} />);
    const card = screen.getByText('唐代').closest('div');
    if (card) card.click();

    expect(mockOpenDetail).toHaveBeenCalledWith('dynasty', 1, expect.objectContaining({ name: '唐代' }));
  });

  it('无 id 时传入 0', () => {
    const mockOpenDetail = vi.fn();
    vi.mocked(require('@/store/detailStore').useDetailStore).getState = () => ({ openDetail: mockOpenDetail });

    const noId = { ...mockDynasty, id: null };
    render(<DynastyCard dynasty={noId as any} />);
    const card = screen.getByText('唐代').closest('div');
    if (card) card.click();

    expect(mockOpenDetail).toHaveBeenCalledWith('dynasty', 0, expect.any(Object));
  });

  it('悬停时设置朝代主题', () => {
    const mockSetDynasty = vi.fn();
    vi.mocked(require('@/components/layout/ThemeProvider').useTheme) = () => ({
      setDynasty: mockSetDynasty,
      dynasty: null,
    });

    const { container } = render(<DynastyCard dynasty={mockDynasty} />);
    const card = container.querySelector('div[class*="rounded-xl"]');
    if (card) {
      card.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    }
    expect(mockSetDynasty).toHaveBeenCalledWith('唐代');
  });
});
