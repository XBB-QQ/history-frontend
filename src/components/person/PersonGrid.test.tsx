/**
 * PersonGrid — L2 组件单元测试
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import PersonGrid from './PersonGrid';

vi.mock('@/store/detailStore', () => ({
  useDetailStore: vi.fn((selector?: (v: any) => any) => {
    const store = { openDetail: vi.fn() };
    return selector ? selector(store) : store;
  }),
}));

const mockPersons = [
  { id: 1, name: '李世民', dynasty: '唐', quote: '以铜为镜' },
  { id: 2, name: '曹操', dynasty: '三国', quote: '老骥伏枥' },
];

describe('PersonGrid', () => {
  it('渲染不报错', () => {
    const { container } = render(<PersonGrid persons={mockPersons as any} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('渲染人物列表', () => {
    render(<PersonGrid persons={mockPersons as any} />);
    expect(screen.getByText('李世民')).toBeTruthy();
  });
});
