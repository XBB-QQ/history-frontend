/**
 * KnowledgeCard — L2 组件单元测试
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import KnowledgeCard from './KnowledgeCard';

vi.mock('@/store/detailStore', () => ({
  useDetailStore: { getState: () => ({ openDetail: vi.fn() }) },
}));

const mockCard = {
  id: 1,
  title: '造纸术',
  description: '中国古代四大发明之一',
  startYear: 105,
  tags: ['四大发明', '科技', '东汉'],
};

describe('KnowledgeCard', () => {
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
    const tagSpans = container.querySelectorAll('span[class*="rounded-full"]');
    expect(tagSpans.length).toBe(0);
  });

  it('点击触发 openDetail', () => {
    const mockOpenDetail = vi.fn();
    vi.mocked(require('@/store/detailStore').useDetailStore).getState = () => ({ openDetail: mockOpenDetail });

    render(<KnowledgeCard card={mockCard} />);
    const card = screen.getByText('造纸术').closest('div');
    if (card) card.click();

    expect(mockOpenDetail).toHaveBeenCalledWith('knowledge', 1, expect.objectContaining({ title: '造纸术' }));
  });

  it('id 为 null 时传入 0', () => {
    const mockOpenDetail = vi.fn();
    vi.mocked(require('@/store/detailStore').useDetailStore).getState = () => ({ openDetail: mockOpenDetail });

    const noId = { ...mockCard, id: null as any };
    render(<KnowledgeCard card={noId} />);
    const card = screen.getByText('造纸术').closest('div');
    if (card) card.click();

    expect(mockOpenDetail).toHaveBeenCalledWith('knowledge', 0, expect.any(Object));
  });
});
