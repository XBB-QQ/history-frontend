import { useState, useEffect } from 'react';
import { useLearningStore, type ReadingListItem, type ModuleProgress } from '@/store/learningStore';
import { useUserStore } from '@/store/userStore';
import { useT } from '@/i18n/i18n';

function ProgressBar({ percent, label, icon }: { percent: number; label: string; icon: string }) {
  const getColor = (p: number) => {
    if (p >= 75) return 'bg-green-500';
    if (p >= 40) return 'bg-yellow-500';
    if (p > 0) return 'bg-orange-400';
    return 'bg-ink-300 dark:bg-ink-600';
  };

  return (
    <div className="bg-white/60 dark:bg-ink-900/60 rounded-xl p-4 border border-ink-200 dark:border-ink-700">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">{icon}</span>
          <span className="font-bold text-ink-900 dark:text-ink-100">{label}</span>
        </div>
        <span className="text-sm font-bold text-ink-600 dark:text-ink-400">
          {percent}%
        </span>
      </div>
      <div className="w-full h-2 bg-ink-100 dark:bg-ink-800 rounded-full overflow-hidden">
        <div
          className={`h-full ${getColor(percent)} rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function LearningPage() {
  const t = useT();
  const { lists, fetchLists, createList, addResource, removeResource, moduleProgress, fetchProgress } = useLearningStore();
  const { user, isAuthenticated } = useUserStore();
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [expandedList, setExpandedList] = useState<number | null>(null);

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchLists();
    fetchProgress();
  }, [isAuthenticated]);

  const overallPercent = moduleProgress.length > 0
    ? Math.round(moduleProgress.reduce((s, m) => s + m.percent, 0) / moduleProgress.length)
    : 0;

  const handleCreate = async () => {
    if (!newName.trim()) return;
    await createList(newName, newDesc);
    setNewName('');
    setNewDesc('');
    setShowCreate(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-paper dark:bg-ink-950 pt-24 pb-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-ink-400 mb-4">{t('learning.login_required')}</p>
          <a href="/login" className="text-accent hover:underline">{t('auth.login_now')}</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-24 pb-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-ink-900 dark:text-ink-100">{t('learning.title')}</h1>
            <p className="text-sm text-ink-500 mt-1">
              {t('learning.stats_summary', { answered: user?.quizzesAnswered || 0, correct: user?.quizzesCorrect || 0, score: user?.score || 0 })}
            </p>
          </div>
          <button
            onClick={() => setShowCreate(!showCreate)}
            className="px-4 py-2 bg-accent text-white rounded-xl text-sm font-bold hover:bg-red-800 transition-colors"
          >
            + {t('learning.create_list')}
          </button>
        </div>

        {/* 总体概览 */}
        <div className="mb-6 bg-gradient-to-r from-accent/10 to-transparent dark:from-accent/5 rounded-xl p-5 border border-accent/20">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold text-ink-700 dark:text-ink-300">{t('learning.overall')}</span>
            <span className="text-2xl font-black text-accent">{overallPercent}%</span>
          </div>
          <div className="w-full h-3 bg-ink-100 dark:bg-ink-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all duration-700 ease-out"
              style={{ width: `${overallPercent}%` }}
            />
          </div>
        </div>

        {/* 模块进度 */}
        {moduleProgress.length > 0 && (
          <div className="grid grid-cols-2 gap-3 mb-6">
            {moduleProgress.map(m => (
              <ProgressBar key={m.type} percent={m.percent} label={m.label} icon={m.icon} />
            ))}
          </div>
        )}

        {/* Create form */}
        {showCreate && (
          <div className="mb-6 p-4 bg-white/60 dark:bg-ink-900/60 rounded-xl border border-ink-200 dark:border-ink-700">
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder={t('learning.list_name')}
              className="w-full px-3 py-2 mb-2 rounded-lg border border-ink-200 dark:border-ink-700 bg-transparent text-ink-900 dark:text-ink-100"
            />
            <input
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder={t('learning.description_placeholder')}
              className="w-full px-3 py-2 mb-3 rounded-lg border border-ink-200 dark:border-ink-700 bg-transparent text-ink-900 dark:text-ink-100"
            />
            <div className="flex gap-2">
              <button onClick={handleCreate} className="px-4 py-2 bg-accent text-white rounded-lg text-sm font-bold">
                {t('learning.create_btn')}
              </button>
              <button onClick={() => setShowCreate(false)} className="px-4 py-2 text-ink-500 text-sm">
                {t('common.cancel')}
              </button>
            </div>
          </div>
        )}

        {/* Reading Lists */}
        {lists.length === 0 ? (
          <div className="text-center py-12 text-ink-400">
            <p className="text-lg mb-1">{t('learning.no_list')}</p>
            <p className="text-sm">{t('learning.create_hint')}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {lists.map((list) => (
              <div
                key={list.id}
                className="bg-white/60 dark:bg-ink-900/60 rounded-xl border border-ink-200 dark:border-ink-700 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedList(expandedList === list.id ? null : list.id)}
                  className="w-full px-4 py-3 flex items-center justify-between hover:bg-ink-50 dark:hover:bg-ink-800/50 transition-colors"
                >
                  <div className="text-left">
                    <div className="font-bold text-ink-900 dark:text-ink-100">{list.name}</div>
                    <div className="text-xs text-ink-400">
                      {t('learning.resource_count', { n: list.resources.length })} · {list.description || t('learning.no_description')}
                    </div>
                  </div>
                  <svg className={`w-4 h-4 text-ink-400 transition-transform ${expandedList === list.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {expandedList === list.id && list.resources.length > 0 && (
                  <div className="border-t border-ink-200 dark:border-ink-700 p-3 space-y-1">
                    {list.resources.map((r, i) => (
                      <div key={i} className="flex items-center justify-between text-sm px-2 py-1 rounded hover:bg-ink-50 dark:hover:bg-ink-800/30">
                        <span className="text-ink-700 dark:text-ink-300">
                          <span className="text-xs text-ink-400 mr-2">[{r.type}]</span>
                          {r.title}
                        </span>
                        <button
                          onClick={() => removeResource(list.id, r.id)}
                          className="text-ink-400 hover:text-red-500 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default LearningPage;
