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
import { useT } from '@/i18n/i18n';

export default function TimeCapsulePage() {
  const [view, setView] = useState<'create' | 'list'>('list');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [guardFigureId, setGuardFigureId] = useState('zhugeliang');
  const [openDate, setOpenDate] = useState('');
  const [capsules, setCapsules] = useState<TimeCapsule[]>([]);
  const [openingId, setOpeningId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const t = useT();

  useEffect(() => {
    loadCapsules();
  }, []);

  const loadCapsules = useCallback(() => {
    setCapsules(getCapsules());
  }, []);

  const handleCreate = useCallback(() => {
    if (!title.trim() || !content.trim()) {
      setError(t('timeCapsule.error_title_content'));
      return;
    }
    if (!openDate) {
      setError(t('timeCapsule.error_open_date'));
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
    if (confirm(t('timeCapsule.delete_confirm'))) {
      deleteCapsule(id);
      loadCapsules();
    }
  }, [loadCapsules]);

  const readyCapsules = getReadyToOpenCapsules();
  const openedCapsules = getOpenedCapsules();
  const pendingCapsules = getPendingCapsules();

  const getDaysRemaining = (dateStr: string): string => {
    const target = new Date(dateStr);
    const today = new Date();
    const diff = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (diff < 0) return t('timeCapsule.days_expired');
    if (diff === 0) return t('timeCapsule.days_today');
    if (diff === 1) return t('timeCapsule.days_tomorrow');
    return t('timeCapsule.days_later', { n: diff });
  };

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <div className="max-w-3xl mx-auto">
        <RevealOnScroll direction="fade">
          <SectionHeader
            label="TIME CAPSULE"
            title={t('timeCapsule.title')}
            description={t('timeCapsule.description')}
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
              {t('timeCapsule.tab_list')}
            </button>
            <button
              onClick={() => setView('create')}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                view === 'create'
                  ? 'bg-accent text-white shadow-md'
                  : 'bg-white/70 dark:bg-ink-900/70 text-ink-700 dark:text-ink-300 border border-ink-200 dark:border-ink-700'
              }`}
            >
              {t('timeCapsule.tab_create')}
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
                  {t('timeCapsule.guard_select_label')}
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
                  {t('timeCapsule.guard_hint', { name: FIGURES.find(f => f.id === guardFigureId)?.name })}
                </p>
              </div>

              {/* 标题 */}
              <div className="mb-4">
                <label className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-1 block">
                  {t('timeCapsule.title_label')}
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={t('timeCapsule.title_placeholder')}
                  className="w-full px-4 py-2 rounded-lg border border-ink-200 dark:border-ink-700 bg-white/70 dark:bg-ink-800/70 focus:outline-none focus:border-accent"
                  maxLength={50}
                />
              </div>

              {/* 内容 */}
              <div className="mb-4">
                <label className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-1 block">
                  {t('timeCapsule.content_label')}
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={t('timeCapsule.content_placeholder')}
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
                  {t('timeCapsule.open_date_label')}
                </label>
                <input
                  type="date"
                  value={openDate}
                  onChange={(e) => setOpenDate(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-ink-200 dark:border-ink-700 bg-white/70 dark:bg-ink-800/70 focus:outline-none focus:border-accent"
                  min={getTodayString()}
                />
                <p className="text-xs text-ink-500 dark:text-ink-400 mt-1">
                  {t('timeCapsule.open_date_hint')}
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
                  {t('timeCapsule.cancel_btn')}
                </button>
                <button
                  onClick={handleCreate}
                  className="flex-1 px-4 py-3 rounded-lg bg-accent text-white font-bold hover:shadow-lg transition-all"
                >
                  {t('timeCapsule.seal_btn')}
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
                    {t('timeCapsule.ready_title', { n: readyCapsules.length })}
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
                            <span className="text-xs text-ink-500 dark:text-ink-400">{t('timeCapsule.guarding')}</span>
                          </div>
                          <button
                            onClick={() => handleOpen(capsule)}
                            disabled={openingId === capsule.id}
                            className="px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-bold hover:shadow-md disabled:opacity-50 transition-all"
                          >
                            {openingId === capsule.id ? t('timeCapsule.opening') : t('timeCapsule.open_btn')}
                          </button>
                        </div>
                        <div className="text-sm text-ink-700 dark:text-ink-300">
                          {capsule.title}
                        </div>
                        <div className="text-xs text-ink-500 dark:text-ink-400 mt-1">
                          {t('timeCapsule.sealed_at', { date: new Date(capsule.createdAt).toLocaleDateString('zh-CN') })}
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
                    {t('timeCapsule.opened_title', { n: openedCapsules.length })}
                  </h3>
                  <div className="space-y-4">
                    {openedCapsules.map((capsule) => (
                      <div key={capsule.id} className="p-4 bg-ink-50/50 dark:bg-ink-800/50 rounded-lg">
                        {/* 标题和守护史官 */}
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xl">{capsule.guardFigureEmoji}</span>
                          <span className="font-bold text-accent">{capsule.guardFigureName}</span>
                          <span className="text-xs text-green-600 dark:text-green-400">{t('timeCapsule.opened_status')}</span>
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
                              <span className="text-xs font-bold text-accent">{t('timeCapsule.interpretation_title', { name: capsule.guardFigureName })}</span>
                            </div>
                            <p className="text-sm text-ink-700 dark:text-ink-300 italic">
                              {capsule.aiInterpretation}
                            </p>
                          </div>
                        )}

                        {/* 时间信息 */}
                        <div className="mt-3 flex items-center justify-between text-xs text-ink-500 dark:text-ink-400">
                          <span>{t('timeCapsule.sealed_label', { date: new Date(capsule.createdAt).toLocaleDateString('zh-CN') })}</span>
                          <span>{t('timeCapsule.opened_label', { date: new Date(capsule.openedAt || 0).toLocaleDateString('zh-CN') })}</span>
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
                    {t('timeCapsule.pending_title', { n: pendingCapsules.length })}
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
                            {t('timeCapsule.open_date_label_with_days', { date: capsule.openDate, days: getDaysRemaining(capsule.openDate) })}
                          </div>
                        </div>
                        <button
                          onClick={() => handleDelete(capsule.id)}
                          className="text-xs px-2 py-1 rounded text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                        >
                          {t('timeCapsule.delete_btn')}
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
                  <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-2">
                    {t('timeCapsule.empty_title')}
                  </h3>
                  <p className="text-sm text-ink-600 dark:text-ink-400">
                    {t('timeCapsule.empty_desc')}
                  </p>
                  <button
                    onClick={() => setView('create')}
                    className="mt-4 px-4 py-2 rounded-lg bg-accent text-white font-bold hover:shadow-lg transition-all"
                  >
                    {t('timeCapsule.tab_create')}
                  </button>
                </div>
              </RevealOnScroll>
            )}
          </>
        )}

        {/* 底部 */}
        <RevealOnScroll direction="fade" delay={400}>
          <div className="mt-12 text-center">
            <Link to="/" className="btn-secondary">{t('common.back_home')}</Link>
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
