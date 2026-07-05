/**
 * DetailModal — L2 组件单元测试
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DetailModal from './DetailModal';
import { useDetailStore } from '@/store/detailStore';

vi.mock('@/store/detailStore', () => ({
  useDetailStore: vi.fn((selector?: (v: any) => any) => {
    const store = {
      isOpen: true, type: 'event', id: 1, uid: null,
      data: { id: '1', title: '测试事件', tags: ['测试标签'] as string[] },
      openDetail: vi.fn(), closeDetail: vi.fn(),
    };
    return selector ? selector(store) : store;
  }),
}));

const renderWithRouter = (ui: React.ReactNode) => ({
  ...render(<MemoryRouter>{ui}</MemoryRouter>),
});

describe('DetailModal', () => {
  beforeEach(() => {
    vi.mocked(useDetailStore).mockImplementation(() => ({
      isOpen: true, type: 'event', id: 1, uid: null,
      data: { id: '1', title: '测试事件', tags: ['测试标签'] as string[] },
      openDetail: vi.fn(), closeDetail: vi.fn(),
    }));
  });

  it('打开时渲染模态框', () => {
    const { container } = renderWithRouter(<DetailModal />);
    expect(container.firstChild).toBeTruthy();
  });

  it('关闭时不渲染', () => {
    vi.mocked(useDetailStore).mockImplementation(() => ({
      isOpen: false, type: null, id: null, uid: null,
      data: null, openDetail: vi.fn(), closeDetail: vi.fn(),
    }));
    const { container } = renderWithRouter(<DetailModal />);
    expect(container.innerHTML).toBe('');
  });
});
