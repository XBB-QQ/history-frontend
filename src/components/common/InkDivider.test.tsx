/**
 * InkDivider — L2 组件单元测试
 */

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import InkDivider from './InkDivider';

describe('InkDivider', () => {
  it('渲染 ink-divider div', () => {
    const { container } = render(<InkDivider />);
    const div = container.querySelector('div');
    expect(div).toBeTruthy();
    expect(div!.className).toBe('ink-divider');
  });

  it('不渲染子元素', () => {
    // @ts-expect-error 测试 InkDivider 不接受 children
    const { container } = render(<InkDivider>不应该出现</InkDivider>);
    expect(container.textContent).toBe('');
  });
});
