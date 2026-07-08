/**
 * KnowledgeMasonry — L2 组件单元测试
 */

import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import KnowledgeMasonry from './KnowledgeMasonry';

vi.mock('@/store/detailStore', () => ({
  useDetailStore: vi.fn((selector?: (v: any) => any) => {
    const store = { openDetail: vi.fn() };
    return selector ? selector(store) : store;
  }),
}));

describe('KnowledgeMasonry', () => {
  it('渲染不报错', () => {
    const { container } = render(<KnowledgeMasonry cards={[]} />);
    expect(container.firstChild).toBeTruthy();
  });
});
