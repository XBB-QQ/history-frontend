/**
 * SceneSwitcher — L2 组件单元测试
 */

import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SceneSwitcher from './SceneSwitcher';

vi.mock('@/store/sceneStore', () => ({
  useSceneStore: vi.fn((selector?: (v: any) => any) => {
    const store = { currentScene: 'default' };
    return selector ? selector(store) : store;
  }),
}));

describe('SceneSwitcher', () => {
  it('渲染不报错', () => {
    const { container } = render(<SceneSwitcher />, { wrapper: MemoryRouter });
    expect(container.firstChild).toBeTruthy();
  });
});
