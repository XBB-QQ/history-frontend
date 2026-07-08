/**
 * BackgroundLayer — L2 组件单元测试
 */

import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import BackgroundLayer from './BackgroundLayer';

vi.mock('@/store/themeStore', () => ({
  useThemeStore: vi.fn((selector?: (v: any) => any) => {
    const store = { theme: 'light' };
    return selector ? selector(store) : store;
  }),
}));

describe('BackgroundLayer', () => {
  it('渲染不报错', () => {
    const { container } = render(<BackgroundLayer>测试内容</BackgroundLayer>);
    expect(container.firstChild).toBeTruthy();
  });

  it('透传 children', () => {
    const { container } = render(<BackgroundLayer><span>子节点</span></BackgroundLayer>);
    expect(container.textContent).toContain('子节点');
  });
});
