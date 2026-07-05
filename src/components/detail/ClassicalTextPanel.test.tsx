/**
 * ClassicalTextPanel — L2 组件单元测试
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ClassicalTextPanel from './ClassicalTextPanel';

describe('ClassicalTextPanel', () => {
  it('渲染组件不报错', () => {
    render(<ClassicalTextPanel text="学而时习之，不亦说乎" />);
    expect(screen.getByText('学而时习之，不亦说乎')).toBeTruthy();
  });

  it('接受 text prop', () => {
    render(<ClassicalTextPanel text="天地君亲师" />);
    expect(screen.getByText('天地君亲师')).toBeTruthy();
  });
});
