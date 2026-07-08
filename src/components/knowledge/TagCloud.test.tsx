/**
 * TagCloud — L2 组件单元测试
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import TagCloud from './TagCloud';

describe('TagCloud', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([
          { tag: '科技', count: 10 },
          { tag: '政治', count: 8 },
          { tag: '经济', count: 5 },
        ]),
      })
    ));
  });

  it('渲染不报错', async () => {
    const { container } = render(<TagCloud onSelectTag={() => {}} activeTag={null} />);
    await waitFor(() => expect(container.firstChild).toBeTruthy());
  });

  it('渲染标签列表', async () => {
    render(<TagCloud onSelectTag={() => {}} activeTag={null} />);
    await waitFor(() => expect(screen.getByText('科技')).toBeTruthy());
  });
});
