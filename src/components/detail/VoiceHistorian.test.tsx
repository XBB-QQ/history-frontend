/**
 * VoiceHistorian — L2 组件单元测试
 */

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import VoiceHistorian from './VoiceHistorian';

const mockEvent = {
  title: '测试事件',
  yearDisplay: '2026年',
  dynasty: '唐',
  description: '测试描述',
};

describe('VoiceHistorian', () => {
  it('渲染组件不报错', () => {
    const { container } = render(<VoiceHistorian event={mockEvent} />);
    expect(container.firstChild).toBeTruthy();
  });

  it('组件存在', () => {
    const { container } = render(<VoiceHistorian event={mockEvent} />);
    expect(container.innerHTML).not.toBe('');
  });
});
