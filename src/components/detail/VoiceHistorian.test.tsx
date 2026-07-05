/**
 * VoiceHistorian — L2 组件单元测试
 */

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import VoiceHistorian from './VoiceHistorian';

describe('VoiceHistorian', () => {
  it('渲染组件不报错', () => {
    const { container } = render(<VoiceHistorian />);
    expect(container.firstChild).toBeTruthy();
  });

  it('组件存在', () => {
    const { container } = render(<VoiceHistorian />);
    expect(container.innerHTML).not.toBe('');
  });
});
