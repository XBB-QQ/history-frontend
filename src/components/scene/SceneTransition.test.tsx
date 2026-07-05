/**
 * SceneTransition — L2 组件单元测试
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SceneTransition from './scene/SceneTransition';

describe('SceneTransition', () => {
  it('渲染组件', () => {
    render(<SceneTransition />);
    expect(screen.getByText('场景切换')).toBeTruthy();
  });

  it('接受 transition prop', () => {
    const { container } = render(<SceneTransition transition="fade" />);
    expect(container.firstChild).toBeTruthy();
  });
});
