/**
 * CommentSection — L2 组件单元测试
 */

import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import CommentSection from './CommentSection';

describe('CommentSection', () => {
  it('渲染不报错', () => {
    const { container } = render(<CommentSection eventId={1} />);
    expect(container.firstChild).toBeTruthy();
  });
});
