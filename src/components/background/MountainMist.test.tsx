/**
 * MountainMist — L2 组件单元测试
 */

import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import MountainMist from './MountainMist';

describe('MountainMist', () => {
  it('渲染不报错', () => {
    const { container } = render(<MountainMist />);
    expect(container.firstChild).toBeTruthy();
  });
});
