/**
 * DetailModal — L2 组件单元测试
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import DetailModal from './DetailModal';

vi.mock('@/store/detailStore', () => ({
  useDetailStore: {
    getState: () => ({
      isOpen: true,
      detailType: 'event',
      detailId: 1,
      detailData: { id: '1', title: '测试事件' },
      closeDetail: vi.fn(),
    }),
  },
}));

describe('DetailModal', () => {
  it('打开时渲染模态框', () => {
    render(<DetailModal />);
    expect(screen.getByText('测试事件')).toBeTruthy();
  });

  it('关闭时不渲染', () => {
    vi.mocked(require('@/store/detailStore').useDetailStore).getState = () => ({
      isOpen: false,
      detailType: null,
      detailId: null,
      detailData: null,
      closeDetail: vi.fn(),
    });

    const { container } = render(<DetailModal />);
    expect(container.innerHTML).toBe('');
  });
});
