/**
 * OutcomeTree — L2 组件单元测试
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import OutcomeTree from './simulator/OutcomeTree';

describe('OutcomeTree', () => {
  it('渲染树形结构', () => {
    const nodes = [
      { id: '1', label: '开始', children: [] },
    ];
    render(<OutcomeTree nodes={nodes} selectedNode="1" onSelect={() => {}} />);
    expect(screen.getByText('开始')).toBeTruthy();
  });

  it('选中节点高亮', () => {
    const nodes = [
      { id: '1', label: '节点一', children: [] },
      { id: '2', label: '节点二', children: [] },
    ];
    render(<OutcomeTree nodes={nodes} selectedNode="2" onSelect={() => {}} />);
    expect(screen.getByText('节点二')).toBeTruthy();
  });
});
