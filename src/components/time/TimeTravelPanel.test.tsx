/**
 * TimeTravelPanel — L2 组件单元测试
 */

import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import TimeTravelPanel from './TimeTravelPanel';

vi.mock('@/store/timeTravelStore', () => ({
  useTimeTravelStore: vi.fn((selector?: (v: any) => any) => {
    const store = {
      precision: 'year' as any,
      year: 100,
      active: true,
      highlightEventId: null,
      setHighlightEventId: vi.fn(),
      setPrecision: vi.fn(),
      setYear: vi.fn(),
      setActive: vi.fn(),
      currentYear: 0,
      setCurrentYear: vi.fn(),
    };
    return selector ? selector(store) : store;
  }),
  PRECISION_CONFIG: {
    millennium: { label: '千年', step: 1000, range: [-3000, 2000] as [number, number] },
    century: { label: '世纪', step: 100, range: [-3000, 2000] as [number, number] },
    decade: { label: '十年', step: 10, range: [-3000, 2000] as [number, number] },
    year: { label: '年', step: 1, range: [-3000, 2000] as [number, number] },
  },
  MILESTONE_YEARS: [],
}));

describe('TimeTravelPanel', () => {
  it('渲染不报错', () => {
    const events = [
      { id: '1', year: 100, title: '测试事件', description: '描述', category: '政治' },
    ];
    const { container } = render(<TimeTravelPanel events={events as any} />);
    expect(container.firstChild).toBeTruthy();
  });
});
