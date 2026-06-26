/**
 * 协作式知识贡献页面
 * @see history-museum/design/002-innovation-brainstorm.md §16
 */

import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import { submitContribution, getMyContributions, type Contribution, type ContributionRequest } from '@/services/contributionApi';
import { useUserStore } from '@/store/userStore';

const TYPE_LABELS: Record<string, { label: string; emoji: string; desc: string }> = {
  event:       { label: '事件补充', emoji: '📜', desc: '补充历史事件内容' },
  person:      { label: '人物补充', emoji: '👤', desc: '补充历史人物资料' },
  dynasty:     { label: '朝代补充', emoji: '🏛️', desc: '补充朝代信息' },
  knowledge:   { label: '知识卡片', emoji: '💡', desc: '新增知识卡片' },
  correction:  { label: '内容纠错', emoji: '✏️', desc: '纠正错误内容' },
};

const STATUS_STYLES: Record<string, { label: string; color: string; bg: string }> = {
  pending:   { label: '待审核', color: 'text-amber-700 dark:text-amber-400', bg: 'bg-amber-500/10' },
  approved:  { label: '已通过', color: 'text-green-700 dark:text-green-400', bg: 'bg-green-500/10' },
  rejected:  { label: '已拒绝', color: 'text-red-700 dark:text-red-400', bg: 'bg-red-500/10' },
  published: { label: '已发布', color: 'text-blue-700 dark:text-blue-400', bg: 'bg-blue-500/10' },
};

export default function ContributionPage() {
  const { isAuthenticated, user } = useUserStore();
  const [mode, setMode] = useState<'submit' | 'list'>('submit');
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [approvedCount, setApprovedCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // 表单状态
  const [form, setForm] = useState<ContributionRequest>({
    type: 'correction',
    title: '',
    content: '',
    changeDescription: '',
  });

  const loadMyContributions = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const result = await getMyContributions();
      setContributions(result.contributions);
      setApprovedCount(result.approved);
    } catch (e) {
      setError(e instanceof Error ? e.message : '加载失败');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (mode === 'list' && isAuthenticated) {
      loadMyContributions();
    }
  }, [mode, isAuthenticated, loadMyContributions]);

  async function handleSubmit() {
    if (!form.title.trim() || !form.content.trim()) {
      setError('标题和内容不能为空');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await submitContribution(form);
      setSuccess('贡献已提交！等待管理员审核。');
      setForm({ type: 'correction', title: '', content: '', changeDescription: '' });
    } catch (e) {
      setError(e instanceof Error ? e.message : '提交失败');
    } finally {
      setLoading(false);
    }
  }

  // 未登录提示
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-6xl mb-4">🔐</div>
          <h2 className="text-2xl font-bold text-ink-900 dark:text-ink-100 mb-2">请先登录</h2>
          <p className="text-ink-600 dark:text-ink-400 mb-6">协作式知识贡献需要登录后才能使用</p>
          <Link to="/login" className="btn-primary">前往登录</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <RevealOnScroll direction="fade">
          <SectionHeader
            label="CROWDSOURCE"
            title="协作知识贡献"
            description="发现内容有误？提交你的修订"
          />
        </RevealOnScroll>

        {/* 积分统计 */}
        <RevealOnScroll direction="up" delay={200}>
          <div className="mt-6 p-4 bg-gradient-to-r from-accent/10 to-amber-500/10 dark:from-accent/15 dark:to-amber-700/15 rounded-xl flex items-center justify-between">
            <div>
              <div className="text-sm text-ink-500">编修官</div>
              <div className="text-lg font-bold text-ink-900 dark:text-ink-100">@{user?.username}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-ink-500">已通过贡献</div>
              <div className="text-2xl font-bold text-accent">{approvedCount}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-ink-500">获得积分</div>
              <div className="text-2xl font-bold text-amber-600">{approvedCount * 10}</div>
            </div>
          </div>
        </RevealOnScroll>

        {/* 模式切换 */}
        <div className="mt-6 flex gap-2 justify-center">
          <button
            onClick={() => setMode('submit')}
            className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${mode === 'submit' ? 'bg-accent text-white' : 'bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-400'}`}
          >
            ✏️ 提交贡献
          </button>
          <button
            onClick={() => setMode('list')}
            className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${mode === 'list' ? 'bg-accent text-white' : 'bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-400'}`}
          >
            📋 我的贡献
          </button>
        </div>

        {/* 提交表单 */}
        {mode === 'submit' && (
          <RevealOnScroll direction="up">
            <div className="mt-6 p-6 bg-white/70 dark:bg-ink-900/70 rounded-xl border border-ink-200 dark:border-ink-700 space-y-4">
              {/* 类型选择 */}
              <div>
                <label className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-2 block">贡献类型</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {Object.entries(TYPE_LABELS).map(([key, val]) => (
                    <button
                      key={key}
                      onClick={() => setForm(prev => ({ ...prev, type: key }))}
                      className={`p-3 rounded-lg border-2 text-left transition-all ${
                        form.type === key
                          ? 'border-accent bg-accent/5'
                          : 'border-ink-200 dark:border-ink-600 hover:border-accent'
                      }`}
                    >
                      <div className="font-bold text-sm">{val.emoji} {val.label}</div>
                      <div className="text-xs text-ink-400">{val.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 标题 */}
              <div>
                <label className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-1 block">标题 *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="例如：补充赤壁之战的火攻细节"
                  className="w-full px-4 py-2 rounded-lg bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-600 focus:border-accent outline-none"
                />
              </div>

              {/* 内容 */}
              <div>
                <label className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-1 block">内容 *（支持 Markdown）</label>
                <textarea
                  value={form.content}
                  onChange={e => setForm(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="输入贡献内容…&#10;&#10;例如：&#10;据《三国志·周瑜传》记载，黄盖建火攻之计…"
                  rows={8}
                  className="w-full px-4 py-2 rounded-lg bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-600 focus:border-accent outline-none resize-y font-mono text-sm"
                />
              </div>

              {/* 变更说明 */}
              <div>
                <label className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-1 block">变更说明</label>
                <input
                  type="text"
                  value={form.changeDescription}
                  onChange={e => setForm(prev => ({ ...prev, changeDescription: e.target.value }))}
                  placeholder="例如：补充《三国志》原文引用"
                  className="w-full px-4 py-2 rounded-lg bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-600 focus:border-accent outline-none"
                />
              </div>

              {/* 提示/错误 */}
              {error && <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-700 dark:text-red-400 text-sm">{error}</div>}
              {success && <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-700 dark:text-green-400 text-sm">{success}</div>}

              {/* 提交按钮 */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-accent to-amber-600 text-white font-bold hover:shadow-lg disabled:opacity-50 transition-all"
              >
                {loading ? '提交中…' : '📤 提交贡献'}
              </button>

              <div className="text-xs text-ink-400 text-center">
                提交后由管理员审核，通过后获得 10 积分
              </div>
            </div>
          </RevealOnScroll>
        )}

        {/* 我的贡献列表 */}
        {mode === 'list' && (
          <RevealOnScroll direction="up">
            <div className="mt-6 space-y-3">
              {loading && <div className="text-center text-ink-400 py-8">加载中…</div>}

              {!loading && contributions.length === 0 && (
                <div className="text-center py-12 text-ink-400">
                  <div className="text-4xl mb-2">📝</div>
                  <div>暂无贡献记录</div>
                  <button onClick={() => setMode('submit')} className="mt-3 text-accent hover:underline text-sm">
                    去提交第一个贡献 →
                  </button>
                </div>
              )}

              {contributions.map(c => {
                const typeInfo = TYPE_LABELS[c.type] || TYPE_LABELS.correction;
                const statusInfo = STATUS_STYLES[c.status] || STATUS_STYLES.pending;
                return (
                  <div key={c.id} className="p-4 bg-white/70 dark:bg-ink-900/70 rounded-lg border border-ink-200 dark:border-ink-700">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="font-bold text-ink-900 dark:text-ink-100">{c.title}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${statusInfo.bg} ${statusInfo.color} font-bold`}>
                        {statusInfo.label}
                      </span>
                      <span className="text-xs text-ink-400">{typeInfo.emoji} {typeInfo.label}</span>
                      <span className="text-xs text-ink-400 ml-auto">
                        {new Date(c.submittedAt).toLocaleDateString('zh-CN')}
                      </span>
                    </div>
                    <div className="text-sm text-ink-600 dark:text-ink-400 line-clamp-2 mb-2">
                      {c.content.slice(0, 100)}…
                    </div>
                    {c.reviewComment && (
                      <div className="text-xs text-ink-500 bg-ink-50 dark:bg-ink-800 rounded px-2 py-1 mt-1">
                        审核意见：{c.reviewComment}
                      </div>
                    )}
                    {c.status === 'approved' && (
                      <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                        ✓ 已获得 {c.points} 积分
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </RevealOnScroll>
        )}

        {/* 底部 */}
        <RevealOnScroll direction="fade" delay={400}>
          <div className="mt-12 text-center">
            <Link to="/" className="btn-secondary">返回首页</Link>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
