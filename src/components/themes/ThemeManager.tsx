/**
 * ThemeManager — 朝代专属配色管理器
 * 根据当前页面/朝代动态切换全局 CSS 变量，500ms 渐变过渡
 * @see ITERATIONS.md Iteration #21
 */

import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { getDynastyThemeByUid, getDynastyTheme, type DynastyTheme } from '@/data/themes/dynastyThemes';

/** 从 URL 路径中提取朝代 UID */
function extractDynastyUid(pathname: string): string | null {
  // /dynasties/:uid
  const dynastyMatch = pathname.match(/^\/dynasties\/([^/]+)/);
  if (dynastyMatch) return dynastyMatch[1];
  return null;
}

/** 将配色应用为 CSS 变量到 document.documentElement */
function applyThemeToCSS(theme: DynastyTheme): void {
  const root = document.documentElement;

  root.style.setProperty('--dynasty-accent', theme.primary);
  root.style.setProperty('--dynasty-paper', theme.paper);
  root.style.setProperty('--dynasty-ink', theme.ink);
  root.style.setProperty('--dynasty-border', theme.border);

  const gradientStyle = `linear-gradient(${theme.gradientDir}, ${theme.gradientFrom}, ${theme.gradientTo})`;
  root.style.setProperty('--dynasty-gradient', gradientStyle);

  root.setAttribute('data-dynasty', theme.name);
}

/** 清除朝代配色（恢复默认） */
function clearDynastyCSS(): void {
  const root = document.documentElement;
  root.style.removeProperty('--dynasty-accent');
  root.style.removeProperty('--dynasty-paper');
  root.style.removeProperty('--dynasty-ink');
  root.style.removeProperty('--dynasty-border');
  root.style.removeProperty('--dynasty-gradient');
  root.removeAttribute('data-dynasty');
}

export default function ThemeManager() {
  const location = useLocation();
  const prevThemeRef = useRef<DynastyTheme | null>(null);

  useEffect(() => {
    const dynastyUid = extractDynastyUid(location.pathname);

    if (dynastyUid) {
      const theme = getDynastyThemeByUid(dynastyUid);
      if (theme) {
        applyThemeToCSS(theme);
        prevThemeRef.current = theme;
        return;
      }
    }

    // 非朝代页面或无匹配：清除
    if (prevThemeRef.current) {
      clearDynastyCSS();
      prevThemeRef.current = null;
    }
  }, [location.pathname]);

  return null;
}
