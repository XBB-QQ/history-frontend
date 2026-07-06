import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '@/services/adminApi';
import { useAdminStore } from '@/store/adminStore';
import { useT } from '@/i18n/i18n';

function AdminLoginPage() {
  const t = useT();
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
      setError(err instanceof Error ? err.message : t('auth.login_failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">史</div>
          <h1 className="text-2xl font-bold text-ink-100 mb-2">{t('home.title')} · {t('admin.title')}</h1>
          <p className="text-ink-500 text-sm">{t('admin.login_required')}</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-ink-900 rounded-2xl p-8 border border-ink-800 shadow-2xl">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-900/30 border border-red-800 text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-ink-400 mb-1">{t('auth.username')}</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-ink-800 border border-ink-700 text-ink-100 focus:outline-none focus:ring-2 focus:ring-accent/50 placeholder:text-ink-600"
                placeholder={t('auth.username_placeholder')}
                required
              />
            </div>

            <div>
              <label className="block text-sm text-ink-400 mb-1">{t('auth.password')}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-ink-800 border border-ink-700 text-ink-100 focus:outline-none focus:ring-2 focus:ring-accent/50 placeholder:text-ink-600"
                placeholder={t('auth.password_placeholder')}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-accent text-white font-bold hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {loading ? t('auth.logging_in') : t('auth.login')}
            </button>
          </div>
        </form>

        <p className="text-center text-ink-600 text-xs mt-6">
          {t('admin.default_account')}: admin / admin123
        </p>
      </div>
    </div>
  );
}
export default AdminLoginPage;