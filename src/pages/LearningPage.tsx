import { useState, useEffect } from 'react';
import { useLearningStore, type ReadingListItem } from '@/store/learningStore';
import { useUserStore } from '@/store/userStore';

function LearningPage() {
  const { lists, fetchLists, createList, addResource, removeResource } = useLearningStore();
  const { user, isAuthenticated } = useUserStore();
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [expandedList, setExpandedList] = useState<number | null>(null);

  useEffect(() => {
    if (isAuthenticated) fetchLists();
  }, [isAuthenticated]);

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
          <p className="text-lg text-ink-400 mb-4">请先登录后查看学习进度</p>
          <a href="/login" className="text-accent hover:underline">去登录</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-24 pb-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-ink-900 dark:text-ink-100">学习进度</h1>
            <p className="text-sm text-ink-500 mt-1">
              浏览 {user?.quizzesAnswered || 0} 题 · 正确 {user?.quizzesCorrect || 0} 题 · 积分 {user?.score || 0}
            </p>
          </div>
          <button
            onClick={() => setShowCreate(!showCreate)}
            className="px-4 py-2 bg-accent text-white rounded-xl text-sm font-bold hover:bg-red-800 transition-colors"
          >
            + 新建清单
          </button>
        </div>

        {/* Create form */}
        {showCreate && (
          <div className="mb-6 p-4 bg-white/60 dark:bg-ink-900/60 rounded-xl border border-ink-200 dark:border-ink-700">
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="清单名称"
              className="w-full px-3 py-2 mb-2 rounded-lg border border-ink-200 dark:border-ink-700 bg-transparent text-ink-900 dark:text-ink-100"
            />
            <input
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="描述（可选）"
              className="w-full px-3 py-2 mb-3 rounded-lg border border-ink-200 dark:border-ink-700 bg-transparent text-ink-900 dark:text-ink-100"
            />
            <div className="flex gap-2">
              <button onClick={handleCreate} className="px-4 py-2 bg-accent text-white rounded-lg text-sm font-bold">
                创建
              </button>
              <button onClick={() => setShowCreate(false)} className="px-4 py-2 text-ink-500 text-sm">
                取消
              </button>
            </div>
          </div>
        )}

        {/* Reading Lists */}
        {lists.length === 0 ? (
          <div className="text-center py-12 text-ink-400">
            <p className="text-lg mb-1">暂无阅读清单</p>
            <p className="text-sm">点击右上角"新建清单"开始规划你的学习计划</p>
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
                      {list.resources.length} 个资源 · {list.description || '无描述'}
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
