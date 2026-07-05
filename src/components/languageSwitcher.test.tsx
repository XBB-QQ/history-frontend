/**
 * LanguageSwitcher — L2 组件单元测试
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import LanguageSwitcher from './common/LanguageSwitcher';

vi.mock('@/i18n/i18n', () => ({
  useI18nStore: {
    getState: () => ({ locale: 'zh', setLocale: vi.fn() }),
    subscribe: () => () => {},
  },
}));

describe('LanguageSwitcher', () => {
  it('默认显示中文', () => {
    render(<LanguageSwitcher />);
    expect(screen.getByText('中文')).toBeTruthy();
  });

  it('点击切换语言', () => {
    const mockSetLocale = vi.fn();
    vi.mocked(require('@/i18n/i18n').useI18nStore).getState = () => ({
      locale: 'zh',
      setLocale: mockSetLocale,
    });

    render(<LanguageSwitcher />);
    fireEvent.click(screen.getByText('中文'));

    expect(mockSetLocale).toHaveBeenCalledWith('en');
  });

  it('英文时显示 EN', async () => {
    vi.mocked(require('@/i18n/i18n').useI18nStore).getState = () => ({
      locale: 'en',
      setLocale: vi.fn(),
    });

    render(<LanguageSwitcher />);
    expect(await screen.findByText('EN')).toBeTruthy();
  });

  it('英文时点击切换为中文', () => {
    const mockSetLocale = vi.fn();
    vi.mocked(require('@/i18n/i18n').useI18nStore).getState = () => ({
      locale: 'en',
      setLocale: mockSetLocale,
    });

    render(<LanguageSwitcher />);
    fireEvent.click(screen.getByText('EN'));

    expect(mockSetLocale).toHaveBeenCalledWith('zh');
  });
});
