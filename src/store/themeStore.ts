import { create } from 'zustand';

type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  /** 是否已完成初始化（避免 SSR 闪烁） */
  initialized: boolean;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

/** 读取 localStorage 中的主题，无则跟随系统 */
function getInitialTheme(): Theme {
  const stored = localStorage.getItem('theme');
  if (stored === 'dark' || stored === 'light') return stored;
  // 跟随系统偏好
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  return 'light';
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: getInitialTheme(),
  initialized: false,

  toggleTheme: () =>
    set((state) => {
      const next = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', next);
      return { theme: next, initialized: true };
    }),

  setTheme: (theme) => {
    localStorage.setItem('theme', theme);
    set({ theme, initialized: true });
  },
}));

/** 同步主题到 DOM */
export function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme);
}
