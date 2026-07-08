/**
 * InkParticles — L2 组件单元测试
 */

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import InkParticles from './InkParticles';

describe('InkParticles', () => {
  it('渲染不报错', () => {
    const { container } = render(<InkParticles />);
    expect(container.firstChild).toBeTruthy();
  });
});
