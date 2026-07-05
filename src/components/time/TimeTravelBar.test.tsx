/**
 * TimeTravelBar — L2 组件单元测试
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TimeTravelBar from './time/TimeTravelBar';

vi.mock('@/store/timeStore', () => ({
  useTimeStore: {
    getState: () => ({
      currentEra: '现代',
      setCurrentEra: vi.fn(),
      eras: ['远古', '先秦', '秦汉', '魏晋', '隋唐', '宋元', '明清', '现代'],
    }),
  },
}));

describe('TimeTravelBar', () => {
  it('渲染时间旅行栏', () => {
    render(<TimeTravelBar />);
    expect(screen.getByText('时间旅行')).toBeTruthy();
  });

  it('显示当前时代', async () => {
    render(<TimeTravelBar />);
    expect(await screen.findByText('现代')).toBeTruthy();
  });

  it('可以切换时代', () => {
    render(<TimeTravelBar />);
    const eraBtn = screen.getByText('先秦');
    expect(eraBtn).toBeTruthy();
  });
});
