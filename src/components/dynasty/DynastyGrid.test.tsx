/**
 * DynastyGrid — L2 组件单元测试
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import DynastyGrid from './DynastyGrid';

vi.mock('@/store/detailStore', () => ({
  useDetailStore: vi.fn((selector?: (v: any) => any) => {
    const store = { openDetail: vi.fn() };
    return selector ? selector(store) : store;
  }),
}));

vi.mock('@/store/sceneStore', () => ({
  useSceneStore: vi.fn((selector?: (v: any) => any) => {
    const store = { setSceneByDynasty: vi.fn() };
    return selector ? selector(store) : store;
  }),
}));

const mockDynasties = [
  { id: 1, name: '唐', periodStart: '618年', periodEnd: '907年' },
  { id: 2, name: '宋', periodStart: '960年', periodEnd: '1279年' },
];

describe('DynastyGrid', () => {
  it('渲染不报错', () => {
    const { container } = render(<DynastyGrid dynasties={mockDynasties as any} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('渲染朝代列表', () => {
    render(<DynastyGrid dynasties={mockDynasties as any} />);
    expect(screen.getByText('唐')).toBeTruthy();
  });
});
