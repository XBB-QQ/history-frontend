/**
 * ExportDropdown — L2 组件单元测试
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ExportDropdown from './export/ExportDropdown';

describe('ExportDropdown', () => {
  it('渲染组件不报错', () => {
    render(<ExportDropdown />);
    expect(screen.getByText('导出')).toBeTruthy();
  });

  it('点击下拉按钮展开', () => {
    render(<ExportDropdown />);
    const dropdown = screen.getByText('导出');
    fireEvent.click(dropdown);
    // 展开后应该显示导出选项
  });
});
