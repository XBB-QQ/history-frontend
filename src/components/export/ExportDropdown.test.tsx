/**
 * ExportDropdown — L2 组件单元测试
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ExportDropdown from './ExportDropdown';

describe('ExportDropdown', () => {
  it('渲染不报错', () => {
    const { container } = render(<ExportDropdown />);
    expect(container.firstChild).toBeTruthy();
  });

  it('显示导出按钮', () => {
    render(<ExportDropdown />);
    expect(screen.getByText(/导出|Export/i)).toBeTruthy();
  });
});
