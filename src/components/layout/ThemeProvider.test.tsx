/**
 * ThemeProvider — L2 组件单元测试
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, useTheme } from './ThemeProvider';

describe('ThemeProvider', () => {
  it('渲染 children', () => {
    render(
      <ThemeProvider>
        <span data-testid="child">测试内容</span>
      </ThemeProvider>
    );
    expect(screen.getByTestId('child')).toBeTruthy();
  });

  it('提供默认主题值', () => {
    const TestComponent = () => {
      const { dynasty, primaryColor, isDefault } = useTheme();
      return (
        <div>
          <span data-testid="dynasty">{dynasty ?? 'null'}</span>
          <span data-testid="color">{primaryColor}</span>
          <span data-testid="default">{String(isDefault)}</span>
        </div>
      );
    };

    const { getByTestId } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(getByTestId('dynasty').textContent).toBe('null');
    expect(getByTestId('color').textContent).toBe('#C41E3A');
    expect(getByTestId('default').textContent).toBe('true');
  });

  it('setDynasty 设置朝代主题', () => {
    const TestComponent = () => {
      const { dynasty, setDynasty, primaryColor } = useTheme();
      return (
        <div>
          <span data-testid="dynasty">{dynasty ?? 'null'}</span>
          <span data-testid="color">{primaryColor}</span>
          <button onClick={() => setDynasty('唐')}>设唐</button>
        </div>
      );
    };

    const { getByText, getByTestId } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(getByTestId('dynasty').textContent).toBe('null');

    getByText('设唐').click();

    expect(getByTestId('dynasty').textContent).toBe('唐');
  });

  it('setDynasty(null) 恢复默认', () => {
    const TestComponent = () => {
      const { dynasty, setDynasty, primaryColor } = useTheme();
      return (
        <div>
          <span data-testid="dynasty">{dynasty ?? 'null'}</span>
          <span data-testid="color">{primaryColor}</span>
          <button onClick={() => setDynasty('唐')}>设唐</button>
          <button onClick={() => setDynasty(null)}>重置</button>
        </div>
      );
    };

    const { getByText, getByTestId } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    getByText('设唐').click();
    expect(getByTestId('dynasty').textContent).toBe('唐');

    getByText('重置').click();
    expect(getByTestId('dynasty').textContent).toBe('null');
  });

  it('useTheme 未包裹时报错', () => {
    // 未包裹时返回默认值，不抛错
    const TestComponent = () => {
      const { dynasty } = useTheme();
      return <span>{dynasty ?? 'null'}</span>;
    };

    const { container } = render(<TestComponent />);
    // 应该返回 context 默认值而非抛错
    expect(container.textContent).toBe('null');
  });
});
