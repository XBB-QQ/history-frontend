/**
 * TagCloud — L2 组件单元测试
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TagCloud from './TagCloud';

describe('TagCloud', () => {
  it('渲染不报错', () => {
    const { container } = render(<TagCloud tags={['科技', '政治', '经济']} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('渲染标签列表', () => {
    render(<TagCloud tags={['科技', '政治']} />);
    expect(screen.getByText('科技')).toBeTruthy();
  });
});
