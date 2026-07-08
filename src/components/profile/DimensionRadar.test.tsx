/**
 * DimensionRadar — L2 组件单元测试
 */

import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import DimensionRadar from './DimensionRadar';

describe('DimensionRadar', () => {
  it('渲染不报错', () => {
    const { container } = render(<DimensionRadar data={{}} />);
    expect(container.firstChild).toBeTruthy();
  });
});
