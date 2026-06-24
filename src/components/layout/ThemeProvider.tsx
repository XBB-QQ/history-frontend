import { createContext, useContext, useState, useCallback } from 'react';
import { getDynastyColor, getDynastyColorDark } from '@/data/themes';

/**
 * 朝代主题上下文
 * 根据当前选中的朝代动态改变页面配色和粒子效果
 * 注：文化场景皮肤系统由 sceneStore 独立管理，与朝代主题正交
 *     场景控制全局色调和字体；朝代主题控制粒子/按钮强调色
 */

interface ThemeContextValue {
  /** 当前朝代名称 */
  dynasty: string | null;
  /** 设置当前朝代主题 */
  setDynasty: (name: string | null) => void;
  /** 当前朝代的主色 */
  primaryColor: string;
  /** 当前朝代是否为默认色 */
  isDefault: boolean;
}

const ThemeContext = createContext<ThemeContextValue>({
  dynasty: null,
  setDynasty: () => {},
  primaryColor: '#C41E3A',
  isDefault: true,
});

export function useTheme() {
  return useContext(ThemeContext);
}

/** 主题提供者 — 包裹整个应用 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dynasty, setDynastyState] = useState<string | null>(null);
  const [primaryColor, setPrimaryColor] = useState('#C41E3A');
  const [isDefault, setIsDefault] = useState(true);

  const setDynasty = useCallback((name: string | null) => {
    setDynastyState(name);
    if (name) {
      const color = getDynastyColor(name);
      const colorDark = getDynastyColorDark(name);
      setPrimaryColor(color);
      setIsDefault(false);
      document.documentElement.style.setProperty('--theme-primary', color);
      document.documentElement.style.setProperty('--theme-primary-dark', colorDark);
    } else {
      setPrimaryColor('#C41E3A');
      setIsDefault(true);
      document.documentElement.style.removeProperty('--theme-primary');
      document.documentElement.style.removeProperty('--theme-primary-dark');
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ dynasty, setDynasty, primaryColor, isDefault }}>
      {children}
    </ThemeContext.Provider>
  );
}
