/**
 * VoiceHistorian — L2 组件单元测试
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import VoiceHistorian from './VoiceHistorian';

describe('VoiceHistorian', () => {
  it('渲染组件不报错', () => {
    render(<VoiceHistorian />);
    expect(screen.getByText('史官说书')).toBeTruthy();
  });

  it('包含语音播放按钮', () => {
    const { container } = render(<VoiceHistorian />);
    const playBtn = container.querySelector('button');
    expect(playBtn).toBeTruthy();
  });
});
