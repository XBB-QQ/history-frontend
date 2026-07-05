/**
 * ResultView — L2 组件单元测试
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ResultView from './simulator/ResultView';

describe('ResultView', () => {
  it('渲染结果视图', () => {
    render(<ResultView result={{ title: '测试', outcome: '成功' }} />);
    expect(screen.getByText('测试')).toBeTruthy();
  });

  it('显示结局描述', () => {
    render(<ResultView result={{ title: '测试', outcome: '成功', description: '好的结局' }} />);
    expect(screen.getByText('好的结局')).toBeTruthy();
  });
});
