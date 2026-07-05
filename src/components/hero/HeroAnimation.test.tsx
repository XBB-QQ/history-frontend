/**
 * HeroAnimation — L2 组件单元测试
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HeroAnimation from './hero/HeroAnimation';

describe('HeroAnimation', () => {
  it('渲染组件', () => {
    render(<HeroAnimation />);
    expect(screen.getByText('五千年史馆')).toBeTruthy();
  });

  it('显示欢迎语', () => {
    const { container } = render(<HeroAnimation />);
    expect(container.querySelector('h1')).toBeTruthy();
  });
});
