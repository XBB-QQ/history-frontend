/**
 * TimeTravelPanel — L2 组件单元测试
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TimeTravelPanel from './time/TimeTravelPanel';

vi.mock('@/store/timeStore', () => ({
  useTimeStore: {
    getState: () => ({
      currentEra: '现代',
      setCurrentEra: vi.fn(),
      eras: ['远古', '先秦', '秦汉', '现代'],
    }),
  },
}));

describe('TimeTravelPanel', () => {
  it('渲染面板', () => {
    render(<TimeTravelPanel />);
    expect(screen.getByText('时间旅行')).toBeTruthy();
  });

  it('显示时代列表', () => {
    render(<TimeTravelPanel />);
    expect(screen.getByText('远古')).toBeTruthy();
    expect(screen.getByText('先秦')).toBeTruthy();
  });
});
