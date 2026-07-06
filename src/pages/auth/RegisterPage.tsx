import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '@/services/userApi';
import { useUserStore } from '@/store/userStore';
import { useT } from '@/i18n/i18n';

export default function RegisterPage() {
  const t = useT();
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
      if (!loginRes.ok) throw new Error(t('auth.auto_login_failed'));
      const loginData = await loginRes.json();
      setUser(loginData.user);
      setToken(loginData.token);
      navigate('/');
    } catch (err: any) {
      setError(err.message || t('auth.register_failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 flex items-center justify-center px-4 pt-20 pb-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-bold text-ink-900 dark:text-ink-100">
            {t('home.title')}
          </Link>
          <p className="text-ink-500 dark:text-ink-400 mt-2">{t('auth.register_welcome')}</p>
        </div>

        <div className="bg-white/80 dark:bg-ink-900/80 rounded-2xl shadow-lg p-8 border border-ink-200 dark:border-ink-700">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-ink-700 dark:text-ink-300 mb-2">{t('auth.username')}</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700 text-ink-900 dark:text-ink-100 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                placeholder={t('auth.username_rule')}
                required
                minLength={3}
                maxLength={50}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-ink-700 dark:text-ink-300 mb-2">{t('auth.nickname')}</label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700 text-ink-900 dark:text-ink-100 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                placeholder={t('auth.nickname_rule')}
                required
                maxLength={20}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-ink-700 dark:text-ink-300 mb-2">{t('auth.password')}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700 text-ink-900 dark:text-ink-100 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                placeholder={t('auth.password_rule')}
                required
                minLength={6}
                autoComplete="new-password"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-ink-700 dark:text-ink-300 mb-2">{t('auth.email')}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700 text-ink-900 dark:text-ink-100 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                  placeholder={t('auth.optional')}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-ink-700 dark:text-ink-300 mb-2">{t('auth.phone')}</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700 text-ink-900 dark:text-ink-100 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                  placeholder={t('auth.optional')}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-accent text-white font-bold hover:bg-red-700 disabled:opacity-50 transition-colors"
            >
              {loading ? t('auth.registering') : t('auth.register')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-ink-500 dark:text-ink-400">
              {t('auth.has_account')}{' '}
              <Link to="/login" className="text-accent hover:underline font-bold">
                {t('auth.login_now')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
