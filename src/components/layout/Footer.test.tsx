/**
 * Footer — L2 组件单元测试
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from './Footer';

vi.mock('@/components/export/ExportDropdown', () => ({
  default: () => null,
}));

vi.mock('@/i18n/i18n', () => ({
  useT: () => {
    const map: Record<string, string> = {
      'footer.brand_desc': '五千年史馆',
      'footer.quick_nav': '快速导航',
      'footer.tech_stack': '技术栈',
      'footer.version_info': 'Copyright v0.1.0',
      'nav.timeline': '时间轴',
    };
    return (key: string) => map[key] || key;
  },
}));

const renderWithRouter = (ui: React.ReactNode) => ({
  ...render(ui, { wrapper: MemoryRouter }),
});

describe('Footer', () => {
  it('渲染快速导航链接', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByRole('link', { name: /时间轴|timeline/i })).toBeTruthy();
  });

  it('渲染品牌描述', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByText(/五千年史馆|history/i)).toBeTruthy();
  });

  it('渲染技术栈信息', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByText(/React/)).toBeTruthy();
  });

  it('渲染版权信息', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByText(/Copyright|©|version/i)).toBeTruthy();
  });
});
