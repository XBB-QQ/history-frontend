/**
 * 历史时间胶囊页面 — 给未来的自己写信，由历史人物保管
 */

import { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import { FIGURES } from '@/data/scenarios/figures';
import {
  createCapsule,
  getCapsules,
  getReadyToOpenCapsules,
  getOpenedCapsules,
  getPendingCapsules,
  canOpen,
  isReadyToOpen,
  openCapsule,
  deleteCapsule,
  type TimeCapsule,
} from '@/features/timeCapsule';
import { hasApiKey } from '@/utils/llmConfig';

export default function TimeCapsulePage() {
  const [view, setView] = useState<'create' | 'list'>('list');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [guardFigureId, setGuardFigureId] = useState('zhugeliang');
  const [openDate, setOpenDate] = useState('');
  const [capsules, setCapsules] = useState<TimeCapsule[]>([]);
  const [openingId, setOpeningId] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    loadCapsules();
  }, []);

  const loadCapsules = useCallback(() => {
    setCapsules(getCapsules());
  }, []);

  const handleCreate = useCallback(() => {
    if (!title.trim() || !content.trim()) {
      setError('请填写标题和内容');
      return;
    }
    if (!openDate) {
      setError('请选择开启日期');
      return;
    }

    createCapsule(title.trim(), content.trim(), guardFigureId, openDate);
    setTitle('');
    setContent('');
    setOpenDate('');
    setError('');
    setView('list');
    loadCapsules();
  }, [title, content, guardFigureId, openDate, loadCapsules]);

  const handleOpen = useCallback(async (capsule: TimeCapsule) => {
    if (!canOpen(capsule)) return;
    setOpeningId(capsule.id);
    try {
      await openCapsule(capsule);
      loadCapsules();
    } finally {
      setOpeningId(null);
    }
  }, [loadCapsules]);

  const handleDelete = useCallback((id: string) => {
    if (confirm('确定要删除这个时间胶囊吗？')) {
      deleteCapsule(id);
      loadCapsules();
    }
  }, [loadCapsules]);

  const readyCapsules = getReadyToOpenCapsules();
  const openedCapsules = getOpenedCapsules();
  const pendingCapsules = getPendingCapsules();
  const apiReady = hasApiKey();

  const getDaysRemaining = (dateStr: string): string => {
    const target = new Date(dateStr);
    const today = new Date();
    const diff = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (diff < 0) return '已到期';
    if (diff === 0) return '今天';
    if (diff === 1) return '明天';
    return `${diff}天后`;
  };

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <div className="max-w-3xl mx-auto">
        <RevealOnScroll direction="fade">
          <SectionHeader
            label="TIME CAPSULE"
            title="历史时间胶囊"
            description="给未来的自己写一封信，由历史人物保管"
          />
        </RevealOnScroll>

        {/* 视图切换 */}
        <RevealOnScroll direction="up" delay={100}>
          <div className="mt-6 flex gap-3 justify-center">
            <button
              onClick={() => setView('list')}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                view === 'list'
                  ? 'bg-accent text-white shadow-md'
                  : 'bg-white/70 dark:bg-ink-900/70 text-ink-700 dark:text-ink-300 border border-ink-200 dark:border-ink-700'
              }`}
            >
              📦 我的胶囊
            </button>
            <button
              onClick={() => setView('create')}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                view === 'create'
                  ? 'bg-accent text-white shadow-md'
                  : 'bg-white/70 dark:bg-ink-900/70 text-ink-700 dark:text-ink-300 border border-ink-200 dark:border-ink-700'
              }`}
            >
              ✏️ 写一封信
            </button>
          </div>
        </RevealOnScroll>

        {/* 创建视图 */}
        {view === 'create' && (
          <RevealOnScroll direction="up" delay={200}>
            <div className="mt-6 p-6 bg-white/70 dark:bg-ink-900/70 rounded-xl border border-ink-200 dark:border-ink-700">
              {/* 守护史官选择 */}
              <div className="mb-6">
                <label className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-3 block tracking-widest">
                  👤 选择守护史官
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {FIGURES.map((fig) => (
                    <button
                      key={fig.id}
                      onClick={() => setGuardFigureId(fig.id)}
                      className={`p-3 rounded-lg flex flex-col items-center transition-all border ${
                        guardFigureId === fig.id
                          ? 'bg-accent/10 border-accent shadow-md'
                          : 'bg-ink-50/50 dark:bg-ink-800/50 border-ink-200 dark:border-ink-700 hover:border-accent/50'
                      }`}
                    >
                      <span className="text-2xl">{fig.emoji}</span>
                      <span className="text-xs mt-1 font-bold">{fig.name}</span>
                      <span className="text-[10px] opacity-70">{fig.dynasty}</span>
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-xs text-ink-500 dark:text-ink-400">
                  💡 {FIGURES.find(f => f.id === guardFigureId)?.name} 将为你保管这封信，开启时会为你解读
                </p>
              </div>

              {/* 标题 */}
              <div className="mb-4">
                <label className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-1 block">
                  📝 信件标题
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="给未来的自己..."
                  className="w-full px-4 py-2 rounded-lg border border-ink-200 dark:border-ink-700 bg-white/70 dark:bg-ink-800/70 focus:outline-none focus:border-accent"
                  maxLength={50}
                />
              </div>

              {/* 内容 */}
              <div className="mb-4">
                <label className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-1 block">
                  ✍️ 信件内容
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="写下你想对未来的自己说的话..."
                  className="w-full px-4 py-3 rounded-lg border border-ink-200 dark:border-ink-700 bg-white/70 dark:bg-ink-800/70 focus:outline-none focus:border-accent resize-none"
                  rows={6}
                  maxLength={500}
                />
                <p className="text-xs text-ink-500 dark:text-ink-400 mt-1 text-right">
                  {content.length}/500
                </p>
              </div>

              {/* 开启日期 */}
              <div className="mb-6">
                <label className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-1 block">
                  📅 开启日期
                </label>
                <input
                  type="date"
                  value={openDate}
                  onChange={(e) => setOpenDate(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-ink-200 dark:border-ink-700 bg-white/70 dark:bg-ink-800/70 focus:outline-none focus:border-accent"
                  min={getTodayString()}
                />
                <p className="text-xs text-ink-500 dark:text-ink-400 mt-1">
                  💡 选择一个未来的日期，届时你的守护史官会提醒你开启
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 text-sm text-red-700 dark:text-red-400">
                  {error}
                </div>
              )}

              {/* 提交按钮 */}
              <div className="flex gap-3">
                <button
                  onClick={() => setView('list')}
                  className="flex-1 px-4 py-3 rounded-lg border border-ink-200 dark:border-ink-700 text-ink-700 dark:text-ink-300 font-bold hover:bg-ink-50 dark:hover:bg-ink-800 transition-all"
                >
                  取消
                </button>
                <button
                  onClick={handleCreate}
                  className="flex-1 px-4 py-3 rounded-lg bg-accent text-white font-bold hover:shadow-lg transition-all"
                >
                  📮 封存信件
                </button>
              </div>
            </div>
          </RevealOnScroll>
        )}

        {/* 列表视图 */}
        {view === 'list' && (
          <>
            {/* 准备开启的胶囊 */}
            {readyCapsules.length > 0 && (
              <RevealOnScroll direction="up" delay={200}>
                <div className="mt-6 p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 dark:from-amber-700/20 dark:to-orange-700/20 rounded-xl border border-amber-500/30">
                  <h3 className="font-bold text-ink-900 dark:text-ink-100 mb-3 flex items-center gap-2">
                    <span>🎁</span> 待开启的胶囊 ({readyCapsules.length})
                  </h3>
                  <div className="space-y-3">
                    {readyCapsules.map((capsule) => (
                      <div
                        key={capsule.id}
                        className="p-4 bg-white/70 dark:bg-ink-900/70 rounded-lg border border-ink-200 dark:border-ink-700"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{capsule.guardFigureEmoji}</span>
                            <span className="font-bold text-accent">{capsule.guardFigureName}</span>
                            <span className="text-xs text-ink-500 dark:text-ink-400">守护中</span>
                          </div>
                          <button
                            onClick={() => handleOpen(capsule)}
                            disabled={openingId === capsule.id}
                            className="px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-bold hover:shadow-md disabled:opacity-50 transition-all"
                          >
                            {openingId === capsule.id ? '开启中…' : '开启'}
                          </button>
                        </div>
                        <div className="text-sm text-ink-700 dark:text-ink-300">
                          {capsule.title}
                        </div>
                        <div className="text-xs text-ink-500 dark:text-ink-400 mt-1">
                          封存于 {new Date(capsule.createdAt).toLocaleDateString('zh-CN')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>
            )}

            {/* 已开启的胶囊 */}
            {openedCapsules.length > 0 && (
              <RevealOnScroll direction="up" delay={300}>
                <div className="mt-6 p-4 bg-white/70 dark:bg-ink-900/70 rounded-xl border border-ink-200 dark:border-ink-700">
                  <h3 className="font-bold text-ink-900 dark:text-ink-100 mb-3 flex items-center gap-2">
                    <span>📜</span> 已开启的胶囊 ({openedCapsules.length})
                  </h3>
                  <div className="space-y-4">
                    {openedCapsules.map((capsule) => (
                      <div key={capsule.id} className="p-4 bg-ink-50/50 dark:bg-ink-800/50 rounded-lg">
                        {/* 标题和守护史官 */}
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xl">{capsule.guardFigureEmoji}</span>
                          <span className="font-bold text-accent">{capsule.guardFigureName}</span>
                          <span className="text-xs text-green-600 dark:text-green-400">已开启</span>
                        </div>

                        {/* 信件内容 */}
                        <div className="mb-3">
                          <div className="font-bold text-ink-900 dark:text-ink-100 mb-1">
                            {capsule.title}
                          </div>
                          <p className="text-sm text-ink-700 dark:text-ink-300 leading-relaxed">
                            {capsule.content}
                          </p>
                        </div>

                        {/* AI 解读 */}
                        {capsule.aiInterpretation && (
                          <div className="p-3 bg-accent/10 rounded-lg border border-accent/30">
                            <div className="flex items-center gap-2 mb-1">
                              <span>{capsule.guardFigureEmoji}</span>
                              <span className="text-xs font-bold text-accent">{capsule.guardFigureName} 的解读</span>
                            </div>
                            <p className="text-sm text-ink-700 dark:text-ink-300 italic">
                              {capsule.aiInterpretation}
                            </p>
                          </div>
                        )}

                        {/* 时间信息 */}
                        <div className="mt-3 flex items-center justify-between text-xs text-ink-500 dark:text-ink-400">
                          <span>封存：{new Date(capsule.createdAt).toLocaleDateString('zh-CN')}</span>
                          <span>开启：{new Date(capsule.openedAt || 0).toLocaleDateString('zh-CN')}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>
            )}

            {/* 待开启的胶囊 */}
            {pendingCapsules.length > 0 && (
              <RevealOnScroll direction="up" delay={400}>
                <div className="mt-6 p-4 bg-white/70 dark:bg-ink-900/70 rounded-xl border border-ink-200 dark:border-ink-700">
                  <h3 className="font-bold text-ink-900 dark:text-ink-100 mb-3 flex items-center gap-2">
                    <span>⏳</span> 待开启的胶囊 ({pendingCapsules.length})
                  </h3>
                  <div className="space-y-3">
                    {pendingCapsules.map((capsule) => (
                      <div
                        key={capsule.id}
                        className="p-4 bg-ink-50/50 dark:bg-ink-800/50 rounded-lg flex items-center justify-between"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-lg">{capsule.guardFigureEmoji}</span>
                            <span className="font-bold text-accent">{capsule.guardFigureName}</span>
                          </div>
                          <div className="text-sm text-ink-700 dark:text-ink-300 mb-1">
                            {capsule.title}
                          </div>
                          <div className="text-xs text-ink-500 dark:text-ink-400">
                            开启日期：{capsule.openDate} ({getDaysRemaining(capsule.openDate)})
                          </div>
                        </div>
                        <button
                          onClick={() => handleDelete(capsule.id)}
                          className="text-xs px-2 py-1 rounded text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                        >
                          删除
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>
            )}

            {/* 空状态 */}
            {capsules.length === 0 && (
              <RevealOnScroll direction="fade">
                <div className="mt-8 p-8 bg-white/50 dark:bg-ink-900/50 rounded-xl border border-ink-200 dark:border-ink-700 text-center">
                  <div className="text-5xl mb-3">📬</div>
                  <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-2">
                    暂无时间胶囊
                  </h3>
                  <p className="text-sm text-ink-600 dark:text-ink-400">
                    写一封信给未来的自己，由历史人物为你保管
                  </p>
                  <button
                    onClick={() => setView('create')}
                    className="mt-4 px-4 py-2 rounded-lg bg-accent text-white font-bold hover:shadow-lg transition-all"
                  >
                    ✏️ 写一封信
                  </button>
                </div>
              </RevealOnScroll>
            )}
          </>
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

function getTodayString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
