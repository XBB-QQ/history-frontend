/**
 * Button — L2 组件单元测试
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('默认渲染 primary 按钮', () => {
    const { container } = render(<Button>点击</Button>);
    const btn = container.querySelector('button');
    expect(btn).toBeTruthy();
    expect(btn!.className).toContain('btn-primary');
  });

  it('渲染 secondary 变体', () => {
    const { container } = render(<Button variant="secondary">次要</Button>);
    const btn = container.querySelector('button');
    expect(btn!.className).toContain('btn-secondary');
  });

  it('点击触发 onClick', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>点击</Button>);
    screen.getByText('点击').click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('href 属性时渲染 a 标签', () => {
    const { container } = render(<Button href="https://example.com">链接</Button>);
    const a = container.querySelector('a');
    expect(a).toBeTruthy();
    expect(a!.getAttribute('href')).toBe('https://example.com');
  });

  it('接受自定义 className', () => {
    const { container } = render(<Button className="custom-class">自定义</Button>);
    const btn = container.querySelector('button');
    expect(btn!.className).toContain('custom-class');
  });

  it('默认 type 为 button', () => {
    const { container } = render(<Button>按钮</Button>);
    const btn = container.querySelector('button');
    expect(btn!.getAttribute('type')).toBe('button');
  });

  it('可指定 type', () => {
    const { container } = render(<Button type="submit">提交</Button>);
    const btn = container.querySelector('button');
    expect(btn!.getAttribute('type')).toBe('submit');
  });

  it('render 包含 children', () => {
    render(<Button>测试文字</Button>);
    expect(screen.getByText('测试文字')).toBeTruthy();
  });
});
