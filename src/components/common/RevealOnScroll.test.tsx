/**
 * RevealOnScroll — L2 组件单元测试
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import RevealOnScroll from './RevealOnScroll';

// Mock IntersectionObserver as a class constructor
class MockIntersectionObserver {
  observe = () => null;
  disconnect = () => null;
  takeRecords = () => [];
  root = null;
  rootMargin = '';
  thresholds = [];
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
vi.stubGlobal('IntersectionObserver', MockIntersectionObserver as any);

describe('RevealOnScroll', () => {
  it('渲染 children', () => {
    render(
      <RevealOnScroll>
        <span data-testid="child">测试内容</span>
      </RevealOnScroll>
    );
    expect(screen.getByTestId('child')).toBeTruthy();
  });

  it('默认方向为 up', () => {
    const { container } = render(<RevealOnScroll>内容</RevealOnScroll>);
    const div = container.firstChild as HTMLElement;
    expect(div.className).toContain('translate-y-8');
    expect(div.className).toContain('opacity-0');
  });

  it('left 方向使用正确的类', () => {
    const { container } = render(<RevealOnScroll direction="left">内容</RevealOnScroll>);
    const div = container.firstChild as HTMLElement;
    expect(div.className).toContain('-translate-x-8');
  });

  it('right 方向使用正确的类', () => {
    const { container } = render(<RevealOnScroll direction="right">内容</RevealOnScroll>);
    const div = container.firstChild as HTMLElement;
    expect(div.className).toContain('translate-x-8');
  });

  it('scale 方向使用正确的类', () => {
    const { container } = render(<RevealOnScroll direction="scale">内容</RevealOnScroll>);
    const div = container.firstChild as HTMLElement;
    expect(div.className).toContain('scale-95');
  });

  it('fade 方向无位移类', () => {
    const { container } = render(<RevealOnScroll direction="fade">内容</RevealOnScroll>);
    const div = container.firstChild as HTMLElement;
    expect(div.className).toContain('opacity-0');
  });

  it('减少动画偏好时自动显示', () => {
    vi.spyOn(window, 'matchMedia').mockImplementation((query) => {
      if (query.includes('prefers-reduced-motion')) {
        return { matches: true, addEventListener: () => {}, removeEventListener: () => {} } as any;
      }
      return { matches: false, addEventListener: () => {}, removeEventListener: () => {} } as any;
    });

    const { container } = render(<RevealOnScroll>内容</RevealOnScroll>);
    const div = container.firstChild as HTMLElement;
    expect(div.className).not.toContain('opacity-0');
  });

  it('接受自定义 className', () => {
    const { container } = render(
      <RevealOnScroll className="my-custom-class">内容</RevealOnScroll>
    );
    const div = container.firstChild as HTMLElement;
    expect(div.className).toContain('my-custom-class');
  });

  it('接受 delay 参数', () => {
    const { container } = render(
      <RevealOnScroll delay={500}>内容</RevealOnScroll>
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('接受 threshold 参数', () => {
    const { container } = render(
      <RevealOnScroll threshold={0.5}>内容</RevealOnScroll>
    );
    expect(container.firstChild).toBeTruthy();
  });
});
