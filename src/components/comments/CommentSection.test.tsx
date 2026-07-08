/**
 * CommentSection — L2 组件单元测试
 */

import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CommentSection from './CommentSection';

vi.mock('@/store/userStore', () => ({
  useUserStore: vi.fn((selector?: (v: any) => any) => {
    const store = { user: null, isAuthenticated: false, logout: vi.fn() };
    return selector ? selector(store) : store;
  }),
}));

vi.stubGlobal('fetch', vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  })
));

describe('CommentSection', () => {
  it('渲染不报错', () => {
    const { container } = render(
      <MemoryRouter>
        <CommentSection resourceId="1" resourceType="event" />
      </MemoryRouter>
    );
    expect(container.firstChild).toBeTruthy();
  });
});
