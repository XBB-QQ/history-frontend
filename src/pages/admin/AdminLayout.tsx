import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAdminStore } from '@/store/adminStore';

const menuItems = [
  { label: '仪表盘', path: '/admin', icon: '盘' },
  { label: '事件管理', path: '/admin/events', icon: '事' },
  { label: '人物管理', path: '/admin/persons', icon: '人' },
  { label: '朝代管理', path: '/admin/dynasties', icon: '朝' },
  { label: '知识卡片', path: '/admin/knowledge', icon: '知' },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useAdminStore((s) => s.logout);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-ink-950 flex">
      {/* 侧边栏 */}
      <aside className="w-56 bg-ink-900 border-r border-ink-800 flex flex-col">
        <div className="p-4 border-b border-ink-800">
          <Link to="/" className="flex items-center gap-2 mb-1">
            <span className="text-2xl">史</span>
            <span className="text-white font-bold text-sm">五千年史馆</span>
          </Link>
          <span className="text-xs text-ink-500">管理后台</span>
        </div>

        <nav className="flex-1 p-2 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-accent/20 text-accent font-bold'
                    : 'text-ink-400 hover:bg-ink-800 hover:text-ink-200'
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-ink-800 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-ink-400 hover:bg-ink-800 hover:text-ink-200 transition-colors"
          >
            <span>语</span>
            返回前台
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-900/30 transition-colors"
          >
            <span>🚪</span>
            退出登录
          </button>
        </div>
      </aside>

      {/* 主内容区 */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
