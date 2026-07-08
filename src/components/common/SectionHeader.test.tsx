/**
 * SectionHeader — L2 组件单元测试
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SectionHeader from './SectionHeader';

describe('SectionHeader', () => {
  it('渲染 label', () => {
    render(<SectionHeader label="章节" title="标题" />);
    expect(screen.getByText('章节')).toBeTruthy();
  });

  it('渲染 title', () => {
    render(<SectionHeader label="章节" title="历史事件" />);
    expect(screen.getByText('历史事件')).toBeTruthy();
  });

  it('可选渲染 description', () => {
    const { container } = render(
      <SectionHeader label="章节" title="标题" description="描述文字" />
    );
    expect(container.textContent).toContain('描述文字');
  });

  it('不带 description 时不渲染', () => {
    const { container } = render(
      <SectionHeader label="章节" title="标题" />
    );
    expect(container.textContent).not.toMatch(/描述/);
  });

  it('接受自定义 className', () => {
    const { container } = render(
      <SectionHeader label="L" title="T" className="custom-class" />
    );
    expect((container.firstChild as HTMLElement)!.className).toContain('custom-class');
  });
});
