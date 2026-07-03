/**
 * 国际化 (i18n) 核心模块
 * 基于 zustand + JSON 资源文件，支持中英文切换
 * @see ITERATIONS.md TD-08
 */

import { create } from 'zustand';
import zh from './locales/zh.json';
import en from './locales/en.json';

export type Locale = 'zh' | 'en';

interface I18nState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

/** 扁平化翻译键 */
function flatten(obj: Record<string, any>, prefix = ''): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'string') {
      result[fullKey] = value;
    } else if (typeof value === 'object') {
      Object.assign(result, flatten(value, fullKey));
    }
  }
  return result;
}

const zhFlat = flatten(zh);
const enFlat = flatten(en);

export const useI18nStore = create<I18nState>((set) => ({
  locale: (localStorage.getItem('locale') as Locale) || 'zh',

  setLocale: (locale: Locale) => {
    localStorage.setItem('locale', locale);
    // 更新 document html lang 属性
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en';
    set({ locale });
  },

  t: (key: string, params?: Record<string, string | number>): string => {
    let value = key;
    try {
      const currentLocale = useI18nStore.getState().locale;
      const dict = currentLocale === 'zh' ? zhFlat : enFlat;
      value = dict[key] || key; // 找不到就用 key 本身
    } catch {
      // 初始化期间 getState 可能不可用，使用默认字典
      value = zhFlat[key] || key;
    }

    // 简单参数替换 {{param}}
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        value = value.replace(new RegExp(`\\{\\{${k}\\}\\}`, 'g'), String(v));
      }
    }

    return value;
  },
}));

/** 便捷 Hook */
export function useT() {
  const { t } = useI18nStore();
  return t;
}
