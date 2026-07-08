/**
 * MapSVG — L2 组件单元测试
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import MapSVG from './MapSVG';

describe('MapSVG', () => {
  it('渲染不报错', () => {
    const { container } = render(<MapSVG />);
    expect(container.firstChild).toBeTruthy();
  });
});
