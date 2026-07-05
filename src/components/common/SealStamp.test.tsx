/**
 * SealStamp — L2 组件单元测试
 */

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import SealStamp from './SealStamp';

describe('SealStamp', () => {
  it('默认渲染史字', () => {
    const { container } = render(<SealStamp />);
    expect(container.textContent).toBe('史');
  });

  it('可自定义文字', () => {
    const { container } = render(<SealStamp text="印" />);
    expect(container.textContent).toBe('印');
  });

  it('默认尺寸 md', () => {
    const { container } = render(<SealStamp />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain('w-14');
    expect(el.className).toContain('h-14');
  });

  it('sm 尺寸正确', () => {
    const { container } = render(<SealStamp size="sm" />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain('w-10');
    expect(el.className).toContain('h-10');
  });

  it('lg 尺寸正确', () => {
    const { container } = render(<SealStamp size="lg" />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain('w-20');
    expect(el.className).toContain('h-20');
  });

  it('接受自定义 className', () => {
    const { container } = render(<SealStamp className="extra-class" />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain('extra-class');
  });

  it('包含 seal-stamp 基础类', () => {
    const { container } = render(<SealStamp />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain('seal-stamp');
  });
});
