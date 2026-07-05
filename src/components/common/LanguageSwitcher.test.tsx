/**
 * LanguageSwitcher — L2 组件单元测试
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import LanguageSwitcher from './LanguageSwitcher';
import { useI18nStore } from '@/i18n/i18n';

vi.mock('@/i18n/i18n', () => ({
  useI18nStore: vi.fn(),
}));

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    vi.mocked(useI18nStore).mockClear();
  });

  it('默认显示中文', () => {
    vi.mocked(useI18nStore).mockReturnValue({ locale: 'zh', setLocale: vi.fn() });
    render(<LanguageSwitcher />);
    expect(screen.getByText('中文')).toBeTruthy();
  });

  it('点击切换语言', () => {
    const mockSetLocale = vi.fn();
    vi.mocked(useI18nStore).mockReturnValue({ locale: 'zh', setLocale: mockSetLocale });
    render(<LanguageSwitcher />);
    fireEvent.click(screen.getByText('中文'));
    expect(mockSetLocale).toHaveBeenCalledWith('en');
  });

  it('英文时显示 EN', () => {
    vi.mocked(useI18nStore).mockReturnValue({ locale: 'en', setLocale: vi.fn() });
    render(<LanguageSwitcher />);
    expect(screen.getByText('EN')).toBeTruthy();
  });

  it('英文时点击切换为中文', () => {
    const mockSetLocale = vi.fn();
    vi.mocked(useI18nStore).mockReturnValue({ locale: 'en', setLocale: mockSetLocale });
    render(<LanguageSwitcher />);
    fireEvent.click(screen.getByText('EN'));
    expect(mockSetLocale).toHaveBeenCalledWith('zh');
  });
});
