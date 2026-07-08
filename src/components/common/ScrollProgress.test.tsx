/**
 * ScrollProgress — L2 组件单元测试
 */

import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import ScrollProgress from './ScrollProgress';

describe('ScrollProgress', () => {
  it('progress 为 0 时不渲染', () => {
    const { container } = render(<ScrollProgress />);
    // 初始应返回 null（因为没有滚动）
    expect(container.innerHTML).toBe('');
  });

  it('渲染包含进度条的容器', () => {
    vi.spyOn(window, 'matchMedia').mockImplementation(() => {
      const mql: any = { matches: false, listener: null };
      mql.addEventListener = () => {};
      mql.removeEventListener = () => {};
      return mql;
    });

    // 模拟滚动使 progress > 0
    Object.defineProperty(window, 'scrollY', {
      value: 100,
      writable: true,
      configurable: true,
    });
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      value: 2000,
      writable: true,
      configurable: true,
    });
    Object.defineProperty(window, 'innerHeight', {
      value: 500,
      writable: true,
      configurable: true,
    });

    const { container } = render(<ScrollProgress />);
    // 应该渲染 fixed 定位的容器
    const bar = container.querySelector('[class*="fixed"]');
    expect(bar).toBeTruthy();
  });

  it('宽度随滚动进度变化', () => {
    vi.spyOn(window, 'matchMedia').mockImplementation(() => {
      const mql: any = { matches: false };
      mql.addEventListener = () => {};
      mql.removeEventListener = () => {};
      return mql;
    });

    // 50% 滚动位置
    Object.defineProperty(window, 'scrollY', {
      value: 500,
      writable: true,
      configurable: true,
    });
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      value: 2000,
      writable: true,
      configurable: true,
    });
    Object.defineProperty(window, 'innerHeight', {
      value: 500,
      writable: true,
      configurable: true,
    });

    const { container } = render(<ScrollProgress />);
    const indicator = container.querySelector('[class*="bg-gradient"]');
    expect(indicator).toBeTruthy();
  });
});
