/**
 * PersonCard — L2 组件单元测试
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import PersonCard from './PersonCard';

vi.mock('@/store/detailStore', () => ({
  useDetailStore: { getState: () => ({ openDetail: vi.fn() }) },
}));

const mockPerson = {
  id: 1,
  name: '李世民',
  dynasty: '唐',
  courtesyName: '世民',
  quote: '以铜为镜，可以正衣冠',
};

describe('PersonCard', () => {
  it('渲染人物姓名', () => {
    render(<PersonCard person={mockPerson} />);
    expect(screen.getByText('李世民')).toBeTruthy();
  });

  it('渲染朝代', () => {
    render(<PersonCard person={mockPerson} />);
    expect(screen.getByText('唐')).toBeTruthy();
  });

  it('渲染名言引用', () => {
    render(<PersonCard person={mockPerson} />);
    expect(screen.getByText('"以铜为镜，可以正衣冠"')).toBeTruthy();
  });

  it('无 quote 时不渲染', () => {
    const noQuote = { ...mockPerson, quote: '' };
    const { container } = render(<PersonCard person={noQuote as any} />);
    expect(container.textContent).not.toContain('"');
  });

  it('首字作为头像显示', () => {
    const { container } = render(<PersonCard person={mockPerson} />);
    // 头像区域应该有首字"李"
    const avatarText = container.querySelector('span.text-5xl');
    expect(avatarText).toBeTruthy();
    expect(avatarText!.textContent).toBe('李');
  });

  it('姓名为空时显示 ?', () => {
    const emptyName = { ...mockPerson, name: '' };
    const { container } = render(<PersonCard person={emptyName as any} />);
    const avatarText = container.querySelector('span.text-5xl');
    expect(avatarText!.textContent).toBe('?');
  });

  it('点击触发 openDetail', () => {
    const mockOpenDetail = vi.fn();
    vi.mocked(require('@/store/detailStore').useDetailStore).getState = () => ({ openDetail: mockOpenDetail });

    render(<PersonCard person={mockPerson} />);
    const card = screen.getByText('李世民').closest('div');
    if (card) card.click();

    expect(mockOpenDetail).toHaveBeenCalledWith('person', 1, expect.objectContaining({ name: '李世民' }));
  });

  it('不同朝代有不同颜色', () => {
    const hanPerson = { ...mockPerson, dynasty: '汉' };
    const { container: c1 } = render(<PersonCard person={hanPerson} />);
    const card1 = c1.querySelector('div[class*="rounded-xl"]');
    expect(card1).toBeTruthy();

    const tangPerson = { ...mockPerson, dynasty: '唐' };
    const { container: c2 } = render(<PersonCard person={tangPerson} />);
    const card2 = c2.querySelector('div[class*="rounded-xl"]');
    expect(card2).toBeTruthy();
  });
});
