/**
 * ShareDialog — L2 组件单元测试
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ShareDialog from './share/ShareDialog';

describe('ShareDialog', () => {
  it('关闭时不渲染', () => {
    const { container } = render(<ShareDialog isOpen={false} onClose={() => {}} />);
    expect(container.innerHTML).toBe('');
  });

  it('打开时渲染分享对话框', () => {
    render(<ShareDialog isOpen onClose={() => {}} />);
    expect(screen.getByText('分享')).toBeTruthy();
  });

  it('关闭按钮触发回调', () => {
    const handleClose = vi.fn();
    render(<ShareDialog isOpen onClose={handleClose} />);
    const closeBtn = screen.getByRole('button', { name: /关闭|×/i });
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalled();
  });
});
