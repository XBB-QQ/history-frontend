/**
 * ThemeProvider — L2 组件单元测试
 */

import { describe, it, expect } from 'vitest';
import { render, screen, act } from '@testing-library/react';
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

  it('setDynasty 设置朝代主题', async () => {
    const TestComponent = () => {
      const { dynasty, setDynasty, primaryColor } = useTheme();
      return (
        <div>
          <span data-testid="dynasty">{dynasty ?? 'null'}</span>
          <span data-testid="color">{primaryColor}</span>
          <button onClick={() => act(() => setDynasty('唐'))}>设唐</button>
        </div>
      );
    };

    const { getByText, getByTestId } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(getByTestId('dynasty').textContent).toBe('null');

    await act(async () => {
      getByText('设唐').click();
    });

    expect(getByTestId('dynasty').textContent).toBe('唐');
  });

  it('setDynasty(null) 恢复默认', async () => {
    const TestComponent = () => {
      const { dynasty, setDynasty, primaryColor } = useTheme();
      return (
        <div>
          <span data-testid="dynasty">{dynasty ?? 'null'}</span>
          <span data-testid="color">{primaryColor}</span>
          <button onClick={() => act(() => setDynasty('唐'))}>设唐</button>
          <button onClick={() => act(() => setDynasty(null))}>重置</button>
        </div>
      );
    };

    const { getByText, getByTestId } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await act(async () => {
      getByText('设唐').click();
    });
    expect(getByTestId('dynasty').textContent).toBe('唐');

    await act(async () => {
      getByText('重置').click();
    });
    expect(getByTestId('dynasty').textContent).toBe('null');
  });

  it('useTheme 未包裹时返回默认值', () => {
    const TestComponent = () => {
      const { dynasty } = useTheme();
      return <span>{dynasty ?? 'null'}</span>;
    };

    const { container } = render(<TestComponent />);
    expect(container.textContent).toBe('null');
  });
});
