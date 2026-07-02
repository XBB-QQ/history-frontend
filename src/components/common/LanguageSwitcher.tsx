/**
 * 语言切换器
 * 在 Navbar 中显示中英文切换按钮
 * @see ITERATIONS.md TD-08
 */

import { useI18nStore, type Locale } from '@/i18n/i18n';

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18nStore();
  const nextLocale: Locale = locale === 'zh' ? 'en' : 'zh';

  return (
    <button
      onClick={() => setLocale(nextLocale)}
      className="text-ink-600 dark:text-ink-400 hover:text-accent dark:hover:text-accent transition-colors text-sm font-bold px-3 py-2 rounded-lg hover:bg-ink-100 dark:hover:bg-ink-800"
      title={locale === 'zh' ? 'Switch to English' : '切换到中文'}
    >
      {locale === 'zh' ? 'EN' : '中文'}
    </button>
  );
}
