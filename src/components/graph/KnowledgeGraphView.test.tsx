/**
 * KnowledgeGraphView — L2 组件单元测试
 */

import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import KnowledgeGraphView from './KnowledgeGraphView';

vi.mock('@/store/detailStore', () => ({
  useDetailStore: vi.fn((selector?: (v: any) => any) => {
    const store = { openDetail: vi.fn() };
    return selector ? selector(store) : store;
  }),
}));

describe('KnowledgeGraphView', () => {
  it('渲染不报错', () => {
    const { container } = render(
      <KnowledgeGraphView graph={{ nodes: [], links: [] }} width={400} height={300} />
    );
    expect(container.firstChild).toBeTruthy();
  });
});
