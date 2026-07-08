/**
 * SceneTransition — L2 组件单元测试
 */

import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SceneTransition from './SceneTransition';

describe('SceneTransition', () => {
  it('渲染不报错', () => {
    const { container } = render(<SceneTransition />, { wrapper: MemoryRouter });
    expect(container.firstChild).toBeTruthy();
  });
});
