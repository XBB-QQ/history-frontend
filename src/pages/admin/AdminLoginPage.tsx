import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '@/services/adminApi';
import { useAdminStore } from '@/store/adminStore';

function AdminLoginPage() {
  const navigate = useNavigate();
  const login = useAdminStore((s) => s.login);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const resp = await adminLogin({ username, password });
      login(resp.username, resp.apiKey);
      navigate('/admin');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : '登录失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">史</div>
          <h1 className="text-2xl font-bold text-ink-100 mb-2">五千年史馆 · 后台管理</h1>
          <p className="text-ink-500 text-sm">请登录以继续</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-ink-900 rounded-2xl p-8 border border-ink-800 shadow-2xl">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-900/30 border border-red-800 text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-ink-400 mb-1">用户名</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-ink-800 border border-ink-700 text-ink-100 focus:outline-none focus:ring-2 focus:ring-accent/50 placeholder:text-ink-600"
                placeholder="请输入用户名"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-ink-400 mb-1">密码</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-ink-800 border border-ink-700 text-ink-100 focus:outline-none focus:ring-2 focus:ring-accent/50 placeholder:text-ink-600"
                placeholder="请输入密码"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-accent text-white font-bold hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {loading ? '登录中...' : '登 录'}
            </button>
          </div>
        </form>

        <p className="text-center text-ink-600 text-xs mt-6">
          默认账号: admin / admin123
        </p>
      </div>
    </div>
  );
}

export default AdminLoginPage;
