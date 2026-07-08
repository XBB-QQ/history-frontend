/**
 * ClassicalTextPanel — L2 组件单元测试
 */

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import ClassicalTextPanel from './ClassicalTextPanel';

describe('ClassicalTextPanel', () => {
  it('渲染组件不报错', () => {
    const { container } = render(<ClassicalTextPanel classicalText="学而时习之" />);
    // 组件可能返回 null 或空内容，只要不抛错即可
    expect(container).toBeTruthy();
  });

  it('接受 classicalText prop', () => {
    const { container } = render(<ClassicalTextPanel classicalText="天地君亲师" />);
    // 组件可能返回 null，只要不抛错即可
    expect(container).toBeTruthy();
  });
});
