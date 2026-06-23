import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '@/services/userApi';
import { useUserStore } from '@/store/userStore';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser, setToken } = useUserStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await registerUser({ username, password, nickname, email: email || undefined, phone: phone || undefined });
      // 注册后自动登录
      const loginRes = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!loginRes.ok) throw new Error('注册成功但自动登录失败');
      const loginData = await loginRes.json();
      setUser(loginData.user);
      setToken(loginData.token);
      navigate('/');
    } catch (err: any) {
      setError(err.message || '注册失败');
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
          <p className="text-ink-500 dark:text-ink-400 mt-2">创建新账号，开始探索历史</p>
        </div>

        <div className="bg-white/80 dark:bg-ink-900/80 rounded-2xl shadow-lg p-8 border border-ink-200 dark:border-ink-700">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-ink-700 dark:text-ink-300 mb-2">用户名</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700 text-ink-900 dark:text-ink-100 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                placeholder="3-50个字符"
                required
                minLength={3}
                maxLength={50}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-ink-700 dark:text-ink-300 mb-2">昵称</label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700 text-ink-900 dark:text-ink-100 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                placeholder="最多20个字"
                required
                maxLength={20}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-ink-700 dark:text-ink-300 mb-2">密码</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700 text-ink-900 dark:text-ink-100 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                placeholder="至少6位"
                required
                minLength={6}
                autoComplete="new-password"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-ink-700 dark:text-ink-300 mb-2">邮箱</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700 text-ink-900 dark:text-ink-100 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                  placeholder="可选"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-ink-700 dark:text-ink-300 mb-2">手机号</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700 text-ink-900 dark:text-ink-100 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                  placeholder="可选"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-accent text-white font-bold hover:bg-red-700 disabled:opacity-50 transition-colors"
            >
              {loading ? '注册中...' : '注 册'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-ink-500 dark:text-ink-400">
              已有账号？{' '}
              <Link to="/login" className="text-accent hover:underline font-bold">
                立即登录
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
