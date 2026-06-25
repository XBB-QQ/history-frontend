import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useThemeStore, applyTheme } from '@/store/themeStore';
import { useSearchStore } from '@/store/searchStore';
import { useFavoriteStore } from '@/store/favoriteStore';
import { useUserStore } from '@/store/userStore';
import type { UserDTO } from '@/services/userApi';

/** 导航分组：核心入口直接显示，次要功能收纳到下拉菜单 */
interface NavGroup {
  id: string;
  label: string;
  emoji: string;
  items: { label: string; path: string }[];
}

/** 核心导航项（始终显示在顶栏） */
const PRIMARY_NAV = [
  { label: '首页', path: '/' },
  { label: '时间轴', path: '/timeline' },
  { label: '朝代', path: '/dynasties' },
  { label: '人物', path: '/persons' },
  { label: '史海钩沉', path: '/knowledge' },
  { label: '地图', path: '/map' },
  { label: '收藏', path: '/favorites' },
];

/** 分组导航项（收纳到"更多"下拉菜单） */
const NAV_GROUPS: NavGroup[] = [
  {
    id: 'ai',
    label: 'AI 智能',
    emoji: '🤖',
    items: [
      { label: '问答', path: '/rag-qa' },
      { label: '跨时空辩论', path: '/cross-debate' },
      { label: 'AI 史官', path: '/ai-historian' },
      { label: '古文注解', path: '/classical-annotation' },
      { label: '人物对话', path: '/dialog' },
    ],
  },
  {
    id: 'game',
    label: '游戏化',
    emoji: '🎮',
    items: [
      { label: '历史抉择', path: '/simulator' },
      { label: '朝代沙盘', path: '/dynasty-economy' },
      { label: '战役推演', path: '/battle' },
      { label: '人物卡牌', path: '/cards' },
      { label: '朝代名片', path: '/dynasty-card' },
      { label: '答题挑战', path: '/leaderboard' },
    ],
  },
  {
    id: 'viz',
    label: '可视化',
    emoji: '📊',
    items: [
      { label: '知识图谱', path: '/knowledge-graph' },
      { label: '因果链', path: '/causal-chain' },
      { label: '朝代雷达', path: '/dynasty-compare' },
      { label: '疆域地图', path: '/territory' },
      { label: '人口迁徙', path: '/migration' },
      { label: '气候变迁', path: '/climate' },
      { label: '天象推算', path: '/sky-events' },
      { label: '中外对照', path: '/world-compare' },
    ],
  },
  {
    id: 'culture',
    label: '文化',
    emoji: '🎨',
    items: [
      { label: '科技树', path: '/tech-tree' },
      { label: '汉字演变', path: '/char-evolution' },
      { label: '历代食谱', path: '/dynasty-food' },
      { label: '水墨动画', path: '/ink-animation' },
      { label: '声音博物馆', path: '/sound-museum' },
      { label: '历史播客', path: '/podcast' },
      { label: '多视角叙事', path: '/multi-perspective' },
      { label: '辩论场', path: '/debate' },
    ],
  },
  {
    id: 'learn',
    label: '学习',
    emoji: '📚',
    items: [
      { label: '课程路径', path: '/learning-path' },
      { label: '课本对齐', path: '/k12' },
      { label: '日历转换', path: '/calendar' },
      { label: '学习中心', path: '/learning' },
      { label: '知识贡献', path: '/contribution' },
      { label: '人物对比', path: '/compare' },
    ],
  },
];

/** 所有路径集合（用于移动端展开列表） */
const ALL_NAV_ITEMS = [...PRIMARY_NAV, ...NAV_GROUPS.flatMap(g => g.items)];

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const { theme, initialized, toggleTheme } = useThemeStore();
  const openSearch = useSearchStore((s) => s.openSearch);
  const favoriteCount = useFavoriteStore((s) => s.favorites.length);
  const { user, isAuthenticated, logout } = useUserStore();

  // 初始化时同步主题到 DOM
  useEffect(() => {
    if (initialized) applyTheme(theme);
  }, [theme, initialized]);

  // 监听系统主题变化
  useEffect(() => {
    if (!initialized) return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [initialized]);

  // 路由变化时关闭所有下拉
  useEffect(() => {
    setOpenGroup(null);
    setMobileOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  /** 判断某个分组下是否有当前激活的路由 */
  const isGroupActive = (group: NavGroup) =>
    group.items.some(item => isActive(item.path));

  return (
    <nav className="sticky top-0 z-50 bg-rice/90 dark:bg-ink-950/90 backdrop-blur-sm border-b border-ink-200 dark:border-ink-700">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="seal-stamp text-xs w-7 h-7">史</div>
            <span className="font-bold text-lg tracking-widest hidden sm:block">五千年史馆</span>
          </Link>

          {/* Desktop Nav — 核心导航 + 分组下拉 */}
          <div className="hidden md:flex items-center gap-4 flex-1 justify-center overflow-visible">
            {/* 核心导航项 */}
            {PRIMARY_NAV.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm tracking-wide transition-colors flex items-center gap-1 whitespace-nowrap ${
                  isActive(item.path)
                    ? 'text-accent font-bold'
                    : 'text-ink-600 dark:text-ink-400 hover:text-ink-900 dark:hover:text-ink-200'
                }`}
              >
                {item.label}
                {item.path === '/favorites' && favoriteCount > 0 && (
                  <span className="text-xs px-1.5 py-0.5 rounded-full bg-accent/10 text-accent font-bold">
                    {favoriteCount}
                  </span>
                )}
              </Link>
            ))}

            {/* 分隔线 */}
            <div className="h-5 w-px bg-ink-200 dark:bg-ink-700" />

            {/* 分组下拉菜单 */}
            {NAV_GROUPS.map((group) => (
              <div
                key={group.id}
                className="relative"
                onMouseEnter={() => setOpenGroup(group.id)}
                onMouseLeave={() => setOpenGroup(prev => prev === group.id ? null : prev)}
              >
                <button
                  onClick={() => setOpenGroup(openGroup === group.id ? null : group.id)}
                  className={`text-sm tracking-wide transition-colors flex items-center gap-0.5 whitespace-nowrap ${
                    isGroupActive(group)
                      ? 'text-accent font-bold'
                      : 'text-ink-600 dark:text-ink-400 hover:text-ink-900 dark:hover:text-ink-200'
                  }`}
                >
                  <span>{group.emoji}</span>
                  <span>{group.label}</span>
                  <svg className={`w-3 h-3 transition-transform ${openGroup === group.id ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* 下拉面板 */}
                {openGroup === group.id && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-48 z-50">
                    <div className="bg-white dark:bg-ink-900 rounded-xl shadow-xl border border-ink-200 dark:border-ink-700 py-2 animate-slide-down">
                      {group.items.map(item => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className={`block px-4 py-2 text-sm transition-colors ${
                            isActive(item.path)
                              ? 'text-accent font-bold bg-accent/5'
                              : 'text-ink-700 dark:text-ink-300 hover:bg-ink-50 dark:hover:bg-ink-800'
                          }`}
                          onClick={() => setOpenGroup(null)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 右侧操作区 */}
          <div className="flex items-center gap-1 flex-shrink-0">
            {/* 搜索按钮 */}
            <button
              onClick={openSearch}
              className="text-ink-600 dark:text-ink-400 p-2 hover:text-ink-900 dark:hover:text-ink-200 transition-colors flex items-center gap-1.5"
              aria-label="搜索"
              title="搜索 (Ctrl+K)"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <kbd className="hidden lg:inline text-xs px-1.5 py-0.5 rounded bg-ink-100 dark:bg-ink-800 text-ink-400 font-mono">
                ⌘K
              </kbd>
            </button>

            {/* 主题切换按钮 */}
            <button
              onClick={toggleTheme}
              className="text-ink-600 dark:text-ink-400 p-2 hover:text-ink-900 dark:hover:text-ink-200 transition-colors"
              aria-label="切换主题"
              title={theme === 'dark' ? '切换为浅色模式' : '切换为深色模式'}
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* 用户头像/登录按钮 */}
            {isAuthenticated ? (
              <UserMenu user={user} onLogout={logout} />
            ) : (
              <Link
                to="/login"
                className="text-ink-600 dark:text-ink-400 hover:text-accent dark:hover:text-accent transition-colors text-sm font-bold px-3 py-2 rounded-lg hover:bg-ink-100 dark:hover:bg-ink-800"
              >
                登录
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-ink-600 dark:text-ink-400 p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="菜单"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu — 分组折叠 */}
        {mobileOpen && (
          <div className="md:hidden border-t border-ink-200 dark:border-ink-700 py-2 max-h-[70vh] overflow-y-auto animate-slide-down">
            {/* 核心导航 */}
            {PRIMARY_NAV.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-4 py-2 text-sm ${
                  isActive(item.path)
                    ? 'text-accent font-bold bg-ink-50 dark:bg-ink-800'
                    : 'text-ink-600 hover:bg-ink-50 dark:hover:bg-ink-800'
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* 分组折叠 */}
            {NAV_GROUPS.map(group => (
              <div key={group.id}>
                <div className="px-4 py-2 text-xs font-bold text-ink-400 tracking-widest bg-ink-50/50 dark:bg-ink-900/50">
                  {group.emoji} {group.label}
                </div>
                {group.items.map(item => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block px-6 py-2 text-sm ${
                      isActive(item.path)
                        ? 'text-accent font-bold bg-ink-50 dark:bg-ink-800'
                        : 'text-ink-600 hover:bg-ink-50 dark:hover:bg-ink-800'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

/** 用户头像下拉菜单 */
function UserMenu({ user, onLogout }: { user: UserDTO | null; onLogout: () => void }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center text-accent hover:bg-accent/30 transition-colors"
        aria-label="用户菜单"
      >
        {user?.nickname?.charAt(0) || 'U'}
      </button>

      {dropdownOpen && (
        <>
          {/* 点击外部关闭 */}
          <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
          <div className="absolute right-0 top-12 w-48 bg-white dark:bg-ink-900 rounded-xl shadow-xl border border-ink-200 dark:border-ink-700 py-2 z-50 animate-slide-down">
            <div className="px-4 py-2 border-b border-ink-200 dark:border-ink-700">
              <div className="text-sm font-bold text-ink-900 dark:text-ink-100">{user?.nickname}</div>
              <div className="text-xs text-ink-400">@{user?.username}</div>
            </div>
            <Link
              to="/profile"
              className="block px-4 py-2 text-sm text-ink-700 dark:text-ink-300 hover:bg-ink-50 dark:hover:bg-ink-800 transition-colors"
              onClick={() => setDropdownOpen(false)}
            >
              个人资料
            </Link>
            <Link
              to="/favorites"
              className="block px-4 py-2 text-sm text-ink-700 dark:text-ink-300 hover:bg-ink-50 dark:hover:bg-ink-800 transition-colors"
              onClick={() => setDropdownOpen(false)}
            >
              我的收藏
            </Link>
            <button
              onClick={() => { setDropdownOpen(false); onLogout(); }}
              className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              退出登录
            </button>
          </div>
        </>
      )}
    </div>
  );
}
