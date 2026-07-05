/**
 * PosterGenerator — L2 组件单元测试
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import PosterGenerator from './share/PosterGenerator';

vi.mock('@/store/posterStore', () => ({
  usePosterStore: {
    getState: () => ({
      posters: [],
      addPoster: vi.fn(),
    }),
  },
}));

describe('PosterGenerator', () => {
  it('渲染海报生成器', () => {
    render(<PosterGenerator />);
    expect(screen.getByText('海报生成')).toBeTruthy();
  });

  it('可以生成海报', () => {
    const { container } = render(<PosterGenerator />);
    expect(container.firstChild).toBeTruthy();
  });
});
