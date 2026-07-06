import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useT } from '@/i18n/i18n';

const pages = [
  { path: '/timeline', labelKey: 'nav.timeline', icon: '事' },
  { path: '/dynasties', labelKey: 'dynasties.title', icon: '朝' },
  { path: '/persons', labelKey: 'nav.persons', icon: '人' },
  { path: '/knowledge', labelKey: 'nav.knowledge', icon: '知' },
  { path: '/map', labelKey: 'nav.map', icon: '图' },
  { path: '/favorites', labelKey: 'favorite.title', icon: '藏' },
];

function NotFoundPage() {
  const t = useT();
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [countdown, setCountdown] = useState(10);

  // 10 秒后自动跳转首页
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(timer);
          navigate('/', { replace: true });
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full text-center">
        {/* 动画卷轴 */}
        <div className="relative mb-8">
          <div className="text-8xl md:text-9xl animate-bounce">史</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-accent/10 dark:bg-accent/20 animate-ping" />
          </div>
        </div>

        {/* 标题 */}
        <h1 className="text-4xl md:text-5xl font-black text-ink-900 dark:text-ink-100 mb-3 tracking-wider">
          {t('notfound.title')}
        </h1>
        <p className="text-lg text-ink-500 dark:text-ink-400 mb-2">
          {t('notfound.desc')}
        </p>
        <p className="text-sm text-ink-400 dark:text-ink-500 mb-8">
          {countdown > 0 ? (
            <span>
              <span className="text-accent font-bold">{countdown}</span> {t('notfound.countdown')}
            </span>
          ) : (
            <span>{t('notfound.redirecting')}</span>
          )}
        </p>

        {/* 快速导航卡片 */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
          {pages.map((page, i) => (
            <Link
              key={page.path}
              to={page.path}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(-1)}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-300 ${
                hoveredIndex === i
                  ? 'border-accent bg-accent/5 dark:bg-accent/10 scale-105 shadow-lg'
                  : 'border-ink-200 dark:border-ink-700 bg-white/60 dark:bg-ink-900/60 hover:border-ink-300 dark:hover:border-ink-600'
              }`}
            >
              <span className="text-2xl">{page.icon}</span>
              <span className="text-sm text-ink-700 dark:text-ink-300 font-medium">{t(page.labelKey)}</span>
            </Link>
          ))}
        </div>

        {/* 返回按钮 */}
        <Link to="/" className="btn-secondary inline-flex">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {t('notfound.back_home')}
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
