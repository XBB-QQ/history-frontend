/**
 * KnowledgeGrid — L2 组件单元测试
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import KnowledgeGrid from './KnowledgeGrid';

vi.mock('@/store/detailStore', () => ({
  useDetailStore: vi.fn((selector?: (v: any) => any) => {
    const store = { openDetail: vi.fn() };
    return selector ? selector(store) : store;
  }),
}));

const mockCards = [
  { id: 1, title: '造纸术', description: '四大发明之一', tags: ['科技'] },
  { id: 2, title: '火药', description: '四大发明之一', tags: ['科技'] },
];

describe('KnowledgeGrid', () => {
  it('渲染不报错', () => {
    const { container } = render(<KnowledgeGrid cards={mockCards as any} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('渲染知识卡片列表', () => {
    render(<KnowledgeGrid cards={mockCards as any} />);
    expect(screen.getByText('造纸术')).toBeTruthy();
  });
});
