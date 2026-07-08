/**
 * HeroAnimation — L2 组件单元测试
 */

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import HeroAnimation from './HeroAnimation';

describe('HeroAnimation', () => {
  it('渲染不报错', () => {
    const { container } = render(<HeroAnimation />);
    expect(container.firstChild).toBeTruthy();
  });
});
