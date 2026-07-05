/**
 * DynastyCard — L2 组件单元测试
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import DynastyCard from './DynastyCard';
import { useDetailStore } from '@/store/detailStore';
import { useSceneStore } from '@/store/sceneStore';

vi.mock('@/components/layout/ThemeProvider', () => ({
  useTheme: vi.fn((selector?: (v: any) => any) => {
    const store = { setDynasty: vi.fn(), dynasty: null };
    return selector ? selector(store) : store;
  }),
}));

vi.mock('@/store/detailStore', () => ({
  useDetailStore: vi.fn((selector?: (v: any) => any) => {
    const store = { openDetail: vi.fn() };
    return selector ? selector(store) : store;
  }),
}));

vi.mock('@/store/sceneStore', () => ({
  useSceneStore: vi.fn((selector?: (v: any) => any) => {
    const store = { setSceneByDynasty: vi.fn(), restoreScene: vi.fn() };
    return selector ? selector(store) : store;
  }),
}));

import { useTheme } from '@/components/layout/ThemeProvider';

const mockDynasty = {
  id: 1,
  name: '唐代',
  periodStart: '618年',
  periodEnd: '907年',
  description: '唐朝是中国历史上最强盛的朝代之一',
};

describe('DynastyCard', () => {
  beforeEach(() => {
    vi.mocked(useTheme).mockImplementation(() => ({ setDynasty: vi.fn(), dynasty: null }));
    vi.mocked(useDetailStore).mockImplementation(() => ({ openDetail: vi.fn() }));
    vi.mocked(useSceneStore).mockImplementation(() => ({ setSceneByDynasty: vi.fn(), restoreScene: vi.fn() }));
  });

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
});
