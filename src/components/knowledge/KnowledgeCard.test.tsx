/**
 * KnowledgeCard — L2 组件单元测试
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import KnowledgeCard from './KnowledgeCard';
import { useDetailStore } from '@/store/detailStore';

vi.mock('@/store/detailStore', () => ({
  useDetailStore: vi.fn((selector?: (v: any) => any) => {
    const store = { openDetail: vi.fn() };
    return selector ? selector(store) : store;
  }),
}));

const mockCard = {
  id: 1,
  title: '造纸术',
  description: '中国古代四大发明之一',
  startYear: 105,
  tags: ['四大发明', '科技', '东汉'],
};

describe('KnowledgeCard', () => {
  beforeEach(() => {
    vi.mocked(useDetailStore).mockImplementation(() => ({ openDetail: vi.fn() }));
  });

  it('渲染知识卡片标题', () => {
    render(<KnowledgeCard card={mockCard} />);
    expect(screen.getByText('造纸术')).toBeTruthy();
  });

  it('渲染知识卡片描述', () => {
    render(<KnowledgeCard card={mockCard} />);
    expect(screen.getByText('中国古代四大发明之一')).toBeTruthy();
  });

  it('渲染起始年份标签', () => {
    render(<KnowledgeCard card={mockCard} />);
    expect(screen.getByText('105年')).toBeTruthy();
  });

  it('无 startYear 时不渲染年份', () => {
    const noYear = { ...mockCard, startYear: null as any };
    const { container } = render(<KnowledgeCard card={noYear} />);
    expect(container.textContent).not.toContain('年');
  });

  it('渲染所有标签', () => {
    render(<KnowledgeCard card={mockCard} />);
    expect(screen.getByText('四大发明')).toBeTruthy();
    expect(screen.getByText('科技')).toBeTruthy();
    expect(screen.getByText('东汉')).toBeTruthy();
  });

  it('无标签时不渲染标签区域', () => {
    const noTags = { ...mockCard, tags: [] };
    const { container } = render(<KnowledgeCard card={noTags} />);
    // Tags are in a div.flex-wrap with spans inside — not just any rounded-full span
    const tagDivs = container.querySelectorAll('div.flex-wrap');
    expect(tagDivs.length).toBe(0);
  });
});
