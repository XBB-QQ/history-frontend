/**
 * Navbar — L2 组件单元测试
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';
import { useThemeStore } from '@/store/themeStore';
import { useSearchStore } from '@/store/searchStore';
import { useFavoriteStore } from '@/store/favoriteStore';
import { useUserStore } from '@/store/userStore';

vi.mock('@/store/themeStore', () => ({
  useThemeStore: vi.fn((selector?: (v: any) => any) => {
    const store = { theme: 'light', initialized: true, toggleTheme: vi.fn() };
    return selector ? selector(store) : store;
  }),
  applyTheme: vi.fn(),
}));

vi.mock('@/store/searchStore', () => ({
  useSearchStore: vi.fn((selector?: (v: any) => any) => {
    const store = { openSearch: vi.fn() };
    return selector ? selector(store) : store;
  }),
}));

vi.mock('@/store/favoriteStore', () => ({
  useFavoriteStore: vi.fn((selector?: (v: any) => any) => {
    const store = { favorites: [] };
    return selector ? selector(store) : store;
  }),
}));

vi.mock('@/store/userStore', () => ({
  useUserStore: vi.fn((selector?: (v: any) => any) => {
    const store = { user: null, isAuthenticated: false, logout: vi.fn() };
    return selector ? selector(store) : store;
  }),
}));

vi.mock('@/i18n/i18n', () => ({
  useI18nStore: vi.fn((selector?: (v: any) => any) => {
    const store = { locale: 'zh', setLocale: vi.fn() };
    return selector ? selector(store) : store;
  }),
  useT: () => {
    const map: Record<string, string> = {
      'home.title': '史馆',
      'nav.home': '首页',
      'nav.timeline': '时间轴',
      'nav.dynasties': '朝代',
      'nav.persons': '人物',
      'nav.knowledge': '知识',
      'nav.map': '地图',
      'nav.favorites': '收藏',
      'nav.menu': '菜单',
      'nav.user_menu': '用户菜单',
      'nav.search': '搜索',
      'nav.theme_toggle': '切换主题',
      'nav.login': '登录',
    };
    return (key: string) => map[key] || key;
  },
}));

vi.mock('@/components/common/LanguageSwitcher', () => ({
  default: () => null,
}));

const renderWithRouter = (ui: React.ReactNode) => ({
  ...render(<MemoryRouter initialEntries={['/']}>{ui}</MemoryRouter>),
});

describe('Navbar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('渲染 Logo', () => {
    renderWithRouter(<Navbar />);
    expect(screen.getByRole('link', { name: /史馆/i })).toBeTruthy();
  });

  it('渲染核心导航项', () => {
    renderWithRouter(<Navbar />);
    expect(screen.getByText(/首页|Home/i)).toBeTruthy();
  });

  it('渲染搜索按钮', () => {
    renderWithRouter(<Navbar />);
    expect(screen.getByLabelText(/搜索|search/i)).toBeTruthy();
  });

  it('点击搜索按钮调用 openSearch', () => {
    const mockOpenSearch = vi.fn();
    vi.mocked(useSearchStore).mockImplementation((selector) => {
      const store = { openSearch: mockOpenSearch };
      return selector ? selector(store) : store;
    });
    renderWithRouter(<Navbar />);
    fireEvent.click(screen.getByLabelText(/搜索|search/i));
    expect(mockOpenSearch).toHaveBeenCalled();
  });

  it('渲染主题切换按钮', () => {
    renderWithRouter(<Navbar />);
    expect(screen.getByLabelText(/主题|theme/i)).toBeTruthy();
  });

  it('点击主题切换按钮调用 toggleTheme', () => {
    const mockToggleTheme = vi.fn();
    vi.mocked(useThemeStore).mockImplementation((selector) => {
      const store = { theme: 'light', initialized: true, toggleTheme: mockToggleTheme };
      return selector ? selector(store) : store;
    });
    renderWithRouter(<Navbar />);
    fireEvent.click(screen.getByLabelText(/主题|theme/i));
    expect(mockToggleTheme).toHaveBeenCalled();
  });

  it('未登录时显示登录链接', () => {
    renderWithRouter(<Navbar />);
    expect(screen.getByRole('link', { name: /登录|Login/i })).toBeTruthy();
  });

  it('已登录时显示用户菜单', () => {
    vi.mocked(useUserStore).mockImplementation((selector) => {
      const store = {
        user: { nickname: '测试用户', username: 'tester' } as any,
        isAuthenticated: true,
        logout: vi.fn(),
      };
      return selector ? selector(store) : store;
    });
    renderWithRouter(<Navbar />);
    expect(screen.getByLabelText(/用户菜单|user menu/i)).toBeTruthy();
  });

  it('收藏数大于 0 时显示徽章', () => {
    vi.mocked(useFavoriteStore).mockImplementation((selector) => {
      const store = { favorites: [1, 2, 3] };
      return selector ? selector(store) : store;
    });
    renderWithRouter(<Navbar />);
    expect(screen.getByText('3')).toBeTruthy();
  });

  it('移动端汉堡按钮存在', () => {
    vi.stubGlobal('innerWidth', 375);
    renderWithRouter(<Navbar />);
    expect(screen.getByRole('button', { name: /^(菜单|menu)$/i })).toBeTruthy();
    vi.unstubAllGlobals();
  });
});
