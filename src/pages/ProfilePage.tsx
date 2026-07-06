import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUserStore } from '@/store/userStore';
import { getMe, updateUser, type UpdateUserRequest } from '@/services/userApi';
import { usePersonaStore } from '@/store/personaStore';
import { useT, useI18nStore } from '@/i18n/i18n';

export default function ProfilePage() {
  const t = useT();
  const locale = useI18nStore((s) => s.locale);
  const navigate = useNavigate();
  const { user, token, setUser } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [editForm, setEditForm] = useState<UpdateUserRequest>({
    nickname: '',
    email: '',
    phone: '',
    bio: '',
  });

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    // 刷新用户信息
    setLoading(true);
    getMe(token).then((u) => {
      setUser(u);
      setEditForm({
        nickname: u.nickname || '',
        email: u.email || '',
        phone: u.phone || '',
        bio: u.bio || '',
      });
    }).catch(() => {
      // Token 失效，清除状态
      useUserStore.getState().logout();
      navigate('/login');
    }).finally(() => setLoading(false));
  }, [token]);

  const handleSave = async () => {
    if (!token) return;
    setSaving(true);
    setSuccess('');
    try {
      const updated = await updateUser(token, editForm);
      setUser(updated);
      setSuccess(t('profile.save_success'));
      setTimeout(() => setSuccess(''), 3000);
    } catch {
      setSuccess(t('profile.save_failed'));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-paper dark:bg-ink-950 flex items-center justify-center pt-20">
        <div className="text-ink-400">{t('common.loading')}</div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-ink-900 dark:text-ink-100 mb-2">个人资料</h1>
          <p className="text-ink-500 dark:text-ink-400">@{user.username}</p>
        </div>

        <div className="bg-white/80 dark:bg-ink-900/80 rounded-2xl shadow-lg p-8 border border-ink-200 dark:border-ink-700 space-y-6">
          {/* 用户信息展示 */}
          <div className="flex items-center gap-4 pb-6 border-b border-ink-200 dark:border-ink-700">
            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center text-2xl text-accent flex-shrink-0">
              {user.nickname.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-bold text-ink-900 dark:text-ink-100">{user.nickname}</h2>
              <p className="text-sm text-ink-500 dark:text-ink-400">
                {t('profile.role')}：{user.role === 'admin' ? t('profile.role_admin') : user.role === 'editor' ? t('profile.role_editor') : t('profile.role_user')}
              </p>
              <p className="text-xs text-ink-400 dark:text-ink-500">
                {t('profile.register_time')}：{new Date(user.createdAt).toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US')}
              </p>
            </div>
          </div>

          {/* 编辑表单 */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100">{t('profile.edit')}</h3>

            <div>
              <label className="block text-sm font-bold text-ink-700 dark:text-ink-300 mb-2">{t('auth.nickname')}</label>
              <input
                type="text"
                value={editForm.nickname}
                onChange={(e) => setEditForm({ ...editForm, nickname: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700 text-ink-900 dark:text-ink-100 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                maxLength={20}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-ink-700 dark:text-ink-300 mb-2">{t('auth.email')}</label>
                <input
                  type="email"
                  value={editForm.email || ''}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700 text-ink-900 dark:text-ink-100 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-ink-700 dark:text-ink-300 mb-2">{t('auth.phone')}</label>
                <input
                  type="tel"
                  value={editForm.phone || ''}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700 text-ink-900 dark:text-ink-100 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-ink-700 dark:text-ink-300 mb-2">{t('profile.bio')}</label>
              <textarea
                value={editForm.bio || ''}
                onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700 text-ink-900 dark:text-ink-100 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                rows={4}
                maxLength={500}
                placeholder={t('profile.bio_placeholder')}
              />
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 py-3 rounded-lg bg-accent text-white font-bold hover:bg-red-700 disabled:opacity-50 transition-colors"
            >
              {saving ? t('profile.saving') : t('profile.save')}
            </button>
            <Link
              to="/favorites"
              className="px-6 py-3 rounded-lg border border-ink-200 dark:border-ink-700 text-ink-700 dark:text-ink-300 font-bold hover:bg-ink-50 dark:hover:bg-ink-800 transition-colors text-center"
            >
              {t('favorite.title')}
            </Link>
            <Link
              to="/profile-report"
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-accent to-amber-600 text-white font-bold hover:shadow-lg transition-all text-center"
            >
              {t('profile.history_portrait')}
            </Link>
          </div>

          {/* 用户画像管理 */}
          <div className="border-t border-ink-200 dark:border-ink-700 pt-6">
            <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-3">
              {t('profile.memory_title')}
            </h3>
            <p className="text-xs text-ink-500 dark:text-ink-400 mb-4">
              {t('profile.memory_desc')}
            </p>
            <button
              onClick={() => {
                if (window.confirm(t('profile.clear_memory_confirm'))) {
                  usePersonaStore.getState().clearPersona();
                  setSuccess(t('profile.memory_cleared'));
                  setTimeout(() => setSuccess(''), 3000);
                }
              }}
              className="px-5 py-2 rounded-lg border-2 border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 font-bold text-sm hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              {t('profile.clear_memory')}
            </button>
          </div>

          {success && (
            <div className={`text-center text-sm ${success === t('profile.save_success') || success === t('profile.memory_cleared') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {success}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
