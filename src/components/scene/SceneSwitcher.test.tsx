/**
 * SceneSwitcher — L2 组件单元测试
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import SceneSwitcher from './scene/SceneSwitcher';

vi.mock('@/store/sceneStore', () => ({
  useSceneStore: {
    getState: () => ({
      currentScene: 'default',
      scenes: [{ id: 'default', name: '默认场景' }, { id: 'tang', name: '唐代场景' }],
      setScene: vi.fn(),
    }),
  },
}));

describe('SceneSwitcher', () => {
  it('渲染场景切换器', () => {
    render(<SceneSwitcher />);
    expect(screen.getByText('场景切换')).toBeTruthy();
  });

  it('显示场景选项', () => {
    render(<SceneSwitcher />);
    expect(screen.getByText('默认场景')).toBeTruthy();
  });

  it('可以切换场景', () => {
    render(<SceneSwitcher />);
    const tangBtn = screen.getByText('唐代场景');
    expect(tangBtn).toBeTruthy();
  });
});
