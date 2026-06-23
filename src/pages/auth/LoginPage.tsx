import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '@/services/userApi';
import { useUserStore } from '@/store/userStore';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser, setToken } = useUserStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await loginUser({ username, password });
      setUser(data.user);
      setToken(data.token);
      navigate('/');
    } catch (err: any) {
      setError(err.message || '登录失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 flex items-center justify-center px-4 pt-20 pb-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-bold text-ink-900 dark:text-ink-100">
            五千年史馆
          </Link>
          <p className="text-ink-500 dark:text-ink-400 mt-2">欢迎回来，请登录您的账号</p>
        </div>

        <div className="bg-white/80 dark:bg-ink-900/80 rounded-2xl shadow-lg p-8 border border-ink-200 dark:border-ink-700">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-ink-700 dark:text-ink-300 mb-2">
                用户名
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700 text-ink-900 dark:text-ink-100 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                placeholder="请输入用户名"
                required
                autoComplete="username"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-ink-700 dark:text-ink-300 mb-2">
                密码
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700 text-ink-900 dark:text-ink-100 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                placeholder="请输入密码"
                required
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-accent text-white font-bold hover:bg-red-700 disabled:opacity-50 transition-colors"
            >
              {loading ? '登录中...' : '登 录'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-ink-500 dark:text-ink-400">
              还没有账号？{' '}
              <Link to="/register" className="text-accent hover:underline font-bold">
                立即注册
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
