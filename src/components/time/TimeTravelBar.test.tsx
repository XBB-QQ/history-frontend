/**
 * TimeTravelBar — L2 组件单元测试
 */

import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import TimeTravelBar from './TimeTravelBar';

vi.mock('@/store/timeTravelStore', () => ({
  useTimeTravelStore: vi.fn((selector?: (v: any) => any) => {
    const store = { precision: 'year' as any };
    return selector ? selector(store) : store;
  }),
}));

describe('TimeTravelBar', () => {
  it('渲染不报错', () => {
    const { container } = render(<TimeTravelBar />);
    expect(container.firstChild).toBeTruthy();
  });
});
