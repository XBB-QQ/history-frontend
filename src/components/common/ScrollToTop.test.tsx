/**
 * ScrollToTop — L2 组件单元测试
 */

import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';

describe('ScrollToTop', () => {
  it('不渲染可见内容', () => {
    const { container } = render(
      <MemoryRouter>
        <ScrollToTop />
      </MemoryRouter>
    );
    expect(container.innerHTML).toBe('');
  });

  it('调用 scrollTo', () => {
    const mockScrollTo = vi.fn();
    window.scrollTo = mockScrollTo;

    render(
      <MemoryRouter>
        <ScrollToTop />
      </MemoryRouter>
    );

    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });

  it('路由变化时重新滚动到顶部', () => {
    const mockScrollTo = vi.fn();
    window.scrollTo = mockScrollTo;

    const { rerender } = render(
      <MemoryRouter initialEntries={['/timeline']}>
        <ScrollToTop />
      </MemoryRouter>
    );

    mockScrollTo.mockClear();
    rerender(
      <MemoryRouter initialEntries={['/persons']}>
        <ScrollToTop />
      </MemoryRouter>
    );

    expect(mockScrollTo).toHaveBeenCalled();
  });
});
