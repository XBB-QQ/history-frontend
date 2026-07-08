/**
 * Footer — L2 组件单元测试
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from './Footer';

vi.mock('@/components/export/ExportDropdown', () => ({
  default: () => require('html').createElement('div', { 'data-testid': 'export-dropdown' }),
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
