/**
 * ShareCard — L2 组件单元测试
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ShareCard from './simulator/ShareCard';

describe('ShareCard', () => {
  it('渲染分享卡片', () => {
    render(<ShareCard data={{ title: '我的历史抉择', result: '成功' }} />);
    expect(screen.getByText('我的历史抉择')).toBeTruthy();
  });

  it('显示结果', () => {
    render(<ShareCard data={{ title: '测试', result: '成功' }} />);
    expect(screen.getByText('成功')).toBeTruthy();
  });
});
