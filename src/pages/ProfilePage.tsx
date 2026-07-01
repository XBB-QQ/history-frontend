import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUserStore } from '@/store/userStore';
import { getMe, updateUser, type UpdateUserRequest, type UserDTO } from '@/services/userApi';
import { useFavoriteStore } from '@/store/favoriteStore';

export default function ProfilePage() {
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
      setSuccess('保存成功');
      setTimeout(() => setSuccess(''), 3000);
    } catch {
      setSuccess('保存失败');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-paper dark:bg-ink-950 flex items-center justify-center pt-20">
        <div className="text-ink-400">加载中...</div>
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
                角色：{user.role === 'admin' ? '管理员' : user.role === 'editor' ? '编辑' : '普通用户'}
              </p>
              <p className="text-xs text-ink-400 dark:text-ink-500">
                注册时间：{new Date(user.createdAt).toLocaleDateString('zh-CN')}
              </p>
            </div>
          </div>

          {/* 编辑表单 */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100">编辑资料</h3>

            <div>
              <label className="block text-sm font-bold text-ink-700 dark:text-ink-300 mb-2">昵称</label>
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
                <label className="block text-sm font-bold text-ink-700 dark:text-ink-300 mb-2">邮箱</label>
                <input
                  type="email"
                  value={editForm.email || ''}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700 text-ink-900 dark:text-ink-100 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-ink-700 dark:text-ink-300 mb-2">手机号</label>
                <input
                  type="tel"
                  value={editForm.phone || ''}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700 text-ink-900 dark:text-ink-100 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-ink-700 dark:text-ink-300 mb-2">个人简介</label>
              <textarea
                value={editForm.bio || ''}
                onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700 text-ink-900 dark:text-ink-100 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                rows={4}
                maxLength={500}
                placeholder="介绍一下自己吧..."
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
              {saving ? '保存中...' : '保存修改'}
            </button>
            <Link
              to="/favorites"
              className="px-6 py-3 rounded-lg border border-ink-200 dark:border-ink-700 text-ink-700 dark:text-ink-300 font-bold hover:bg-ink-50 dark:hover:bg-ink-800 transition-colors text-center"
            >
              我的收藏
            </Link>
            <Link
              to="/profile-report"
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-accent to-amber-600 text-white font-bold hover:shadow-lg transition-all text-center"
            >
              🎭 我的历史画像
            </Link>
          </div>

          {success && (
            <div className={`text-center text-sm ${success.includes('成功') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {success}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
