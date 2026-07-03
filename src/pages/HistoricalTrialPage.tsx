/**
 * 历史审判庭
 * @see history-museum/ITERATIONS.md Iteration #75
 *
 * 展示中国历史上的著名审判案例
 */

import React, { useState, useMemo } from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import { HISTORICAL_TRIALS, TRIALS_BY_DYNASTY, TRIALS_BY_TYPE, TRIALS_WON, TRIALS_LOST } from '@/data/features/trialData';

export default function HistoricalTrialPage() {
  const [selectedDynasty, setSelectedDynasty] = useState<string>('全部');
  const [selectedType, setSelectedType] = useState<string>('全部');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTrial, setSelectedTrial] = useState<any | null>(null);

  const allDynasties = useMemo(() => {
    const dynasties = ['全部', ...Object.keys(TRIALS_BY_DYNASTY)];
    return dynasties.sort();
  }, []);

  const filteredTrials = useMemo(() => {
    return HISTORICAL_TRIALS.filter(trial => {
      const matchDynasty = selectedDynasty === '全部' || trial.dynasty === selectedDynasty;
      const matchType = selectedType === '全部' || trial.type === selectedType;
      const matchSearch = searchQuery === '' ||
        trial.title.includes(searchQuery) ||
        trial.dynasty.includes(searchQuery) ||
        trial.judge.includes(searchQuery);
      return matchDynasty && matchType && matchSearch;
    }).sort((a, b) => {
      // 按年份排序
      if (a.year && b.year) {
        return parseInt(a.year) - parseInt(b.year);
      }
      return 0;
    });
  }, [selectedDynasty, selectedType, searchQuery]);

  const getVerdictBadge = (verdict: string) => {
    switch (verdict) {
      case '胜利':
        return <span className="badge-won">胜利</span>;
      case '失败':
        return <span className="badge-lost">失败</span>;
      case '无罪':
        return <span className="badge-innocent">无罪</span>;
      case '有罪':
        return <span className="badge-guilty">有罪</span>;
      case '流放':
        return <span className="badge-exile">流放</span>;
      case '处死':
        return <span className="badge-execution">处死</span>;
      case '未审判':
        return <span className="badge-not-tried">未审判</span>;
      case '有争议':
        return <span className="badge-controversial">有争议</span>;
      default:
        return <span>{verdict}</span>;
    }
  };

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case '胜利':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case '失败':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case '无罪':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case '有罪':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:bg-orange-300';
      case '流放':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case '处死':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:bg-purple-300';
      case '未审判':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
      case '有争议':
        return 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:bg-pink-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case '政治':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case '军事':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case '贪腐':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:bg-orange-300';
      case '谋反':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case '家族':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:bg-purple-300';
      case '文化':
        return 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:bg-pink-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <SectionHeader
        title="历史审判庭"
        subtitle="穿越回古代，见证历史性的审判时刻"
        emoji="⚖️"
      />

      <RevealOnScroll>
        <div className="trial-container max-w-6xl mx-auto">
          {/* 筛选栏 */}
          <div className="filter-bar p-4 md:p-6 rounded-xl border-2 border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 shadow-lg mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-bold text-ink-700 dark:text-ink-300 mb-2">
                  搜索
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索案件名称、朝代、审判者..."
                  className="input-field w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-ink-700 dark:text-ink-300 mb-2">
                  选择朝代
                </label>
                <select
                  value={selectedDynasty}
                  onChange={(e) => setSelectedDynasty(e.target.value)}
                  className="input-field w-full"
                >
                  {allDynasties.map(dynasty => (
                    <option key={dynasty} value={dynasty}>
                      {dynasty}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-ink-700 dark:text-ink-300 mb-2">
                  审判类型
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="input-field w-full"
                >
                  <option value="全部">全部类型</option>
                  <option value="政治">政治</option>
                  <option value="军事">军事</option>
                  <option value="贪腐">贪腐</option>
                  <option value="谋反">谋反</option>
                  <option value="家族">家族</option>
                  <option value="文化">文化</option>
                </select>
              </div>
            </div>
          </div>

          {/* 统计信息 */}
          <div className="stats-bar p-4 rounded-xl border-2 border-ink-200 dark:border-ink-700 bg-ink-50 dark:bg-ink-800 mb-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-ink-900 dark:text-ink-100">
                  {HISTORICAL_TRIALS.length}
                </div>
                <div className="text-xs text-ink-500">记录案件</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {TRIALS_WON.length}
                </div>
                <div className="text-xs text-ink-500">胜利案例</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {TRIALS_LOST.length}
                </div>
                <div className="text-xs text-ink-500">失败案例</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {TRIALS_BY_TYPE.政治?.length || 0}
                </div>
                <div className="text-xs text-ink-500">政治案件</div>
              </div>
            </div>
          </div>

          {/* 案件卡片网格 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredTrials.map((trial) => (
              <div
                key={trial.id}
                className={`trial-card p-5 rounded-xl border-2 border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 shadow-lg cursor-pointer transition-all hover:scale-105 hover:shadow-xl ${
                  selectedTrial?.id === trial.id ? 'ring-2 ring-accent' : ''
                }`}
                onClick={() => setSelectedTrial(trial)}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 line-clamp-2">
                    {trial.title}
                  </h3>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${getVerdictColor(trial.verdict)}`}>
                    {getVerdictBadge(trial.verdict)}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-ink-600 dark:text-ink-400">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">📅 {trial.dynasty}</span>
                  </div>

                  {trial.year && (
                    <div className="flex items-center gap-2">
                      <span>📆</span>
                      <span>{trial.year}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <span>⚖️</span>
                    <span>{trial.judge}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 rounded text-xs font-medium ${getTypeColor(trial.type)}">
                      {trial.type}
                    </span>
                  </div>

                  <p className="line-clamp-3">{trial.accusation}</p>
                </div>
              </div>
            ))}
          </div>

          {filteredTrials.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-2">🔍</div>
              <div className="text-ink-600 dark:text-ink-400">
                没有找到符合条件的案件
              </div>
            </div>
          )}

          {/* 案件详情模态框 */}
          {selectedTrial && (
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedTrial(null)}
            >
              <div
                className="trial-detail-card max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-2xl border-2 border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 md:p-8">
                  {/* 关闭按钮 */}
                  <button
                    className="absolute top-4 right-4 text-ink-400 hover:text-ink-900 dark:hover:text-ink-100"
                    onClick={() => setSelectedTrial(null)}
                  >
                    ✕
                  </button>

                  {/* 标题 */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-ink-900 dark:text-ink-100 mb-2">
                        {selectedTrial.title}
                      </h2>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${getVerdictColor(selectedTrial.verdict)}`}>
                          {getVerdictBadge(selectedTrial.verdict)}
                        </span>
                        <span className="px-3 py-1 rounded-full text-sm font-bold ${getTypeColor(selectedTrial.type)}">
                          {selectedTrial.type}
                        </span>
                        <span className="text-ink-600 dark:text-ink-400">
                          📅 {selectedTrial.dynasty} - {selectedTrial.period}
                        </span>
                        {selectedTrial.year && (
                          <span className="px-3 py-1 rounded-full text-sm font-bold bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                            {selectedTrial.year}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 基本信息卡片 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 rounded-xl bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700">
                      <div className="text-sm text-ink-500 mb-1">📍 地点</div>
                      <div className="text-lg font-bold text-ink-900 dark:text-ink-100">
                        {selectedTrial.location}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700">
                      <div className="text-sm text-purple-500 mb-1">⚖️ 审判者</div>
                      <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                        {selectedTrial.judge}
                      </div>
                    </div>

                    {selectedTrial.keyFigures && selectedTrial.keyFigures.length > 0 && (
                      <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700">
                        <div className="text-sm text-blue-500 mb-1">👤 关键人物</div>
                        <div className="flex flex-wrap gap-1">
                          {selectedTrial.keyFigures.slice(0, 3).map((person: string, idx: number) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded text-xs font-medium bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-300"
                            >
                              {person}
                            </span>
                          ))}
                          {selectedTrial.keyFigures.length > 3 && (
                            <span className="text-xs text-blue-500">+{selectedTrial.keyFigures.length - 3}</span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 起诉与辩护 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700">
                      <h3 className="text-lg font-bold text-red-800 dark:text-red-200 mb-2">
                        ⚖️ 起诉
                      </h3>
                      <p className="text-red-700 dark:text-red-300">
                        {selectedTrial.accusation}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700">
                      <h3 className="text-lg font-bold text-green-800 dark:text-green-200 mb-2">
                        🛡️ 辩护
                      </h3>
                      <p className="text-green-700 dark:text-green-300">
                        {selectedTrial.defense}
                      </p>
                    </div>
                  </div>

                  {/* 判决 */}
                  <div className="mb-6 p-4 rounded-xl bg-accent/10 border-2 border-accent/30">
                    <h3 className="text-lg font-bold text-accent mb-2">
                      ✅ 判决结果：{selectedTrial.verdict}
                    </h3>
                  </div>

                  {/* 历史后果 */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-2">
                      🏛️ 历史后果
                    </h3>
                    <ul className="space-y-2">
                      {selectedTrial.consequences.map((consequence: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2 text-ink-600 dark:text-ink-400">
                          <span className="text-accent mt-1">▸</span>
                          <span>{consequence}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 历史意义 */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-2">
                      📚 历史意义
                    </h3>
                    <p className="text-ink-600 dark:text-ink-400 leading-relaxed">
                      {selectedTrial.historicalSignificance}
                    </p>
                  </div>

                  {/* 详细描述 */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-2">
                      📖 案件详情
                    </h3>
                    <p className="text-ink-600 dark:text-ink-400 leading-relaxed">
                      {selectedTrial.details}
                    </p>
                  </div>

                  {/* 关闭按钮 */}
                  <button
                    className="w-full py-3 rounded-xl bg-accent text-white font-bold hover:bg-accent/90 transition-colors"
                    onClick={() => setSelectedTrial(null)}
                  >
                    返回列表
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 统计分析 */}
          <div className="mt-12 p-6 md:p-8 rounded-2xl border-2 border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 shadow-lg">
            <h2 className="text-2xl font-bold text-ink-900 dark:text-ink-100 mb-6">
              📊 审判统计分析
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 按朝代分布 */}
              <div>
                <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-3">
                  📅 按朝代分布
                </h3>
                <div className="space-y-3">
                  {Object.entries(TRIALS_BY_DYNASTY).sort((a, b) => {
                    const dynastyOrder = ['夏商西周', '东周', '秦朝', '汉朝', '三国', '晋朝', '南北朝', '隋朝', '唐朝', '宋朝', '元朝', '明朝', '清朝', '民国', '新中国'];
                    const idxA = dynastyOrder.indexOf(a[0]);
                    const idxB = dynastyOrder.indexOf(b[0]);
                    return (idxA === -1 ? 999 : idxA) - (idxB === -1 ? 999 : idxB);
                  }).map(([dynasty, trials]) => (
                    <div
                      key={dynasty}
                      className="flex items-center justify-between p-3 rounded-lg bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700"
                    >
                      <div>
                        <div className="font-bold text-ink-900 dark:text-ink-100">{dynasty}</div>
                        <div className="text-sm text-ink-500"> case(s)</div>
                      </div>
                      <div className="text-2xl font-bold text-accent">{trials.length}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 按类型分布 */}
              <div>
                <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-3">
                  🔍 按类型分布
                </h3>
                <div className="space-y-3">
                  {Object.entries(TRIALS_BY_TYPE).map(([type, trials]) => (
                    <div
                      key={type}
                      className="flex items-center justify-between p-3 rounded-lg bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700"
                    >
                      <div>
                        <div className="font-bold text-ink-900 dark:text-ink-100">{type}</div>
                        <div className="text-sm text-ink-500"> case(s)</div>
                      </div>
                      <div className="text-2xl font-bold text-accent">{trials.length}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 判决统计 */}
            <div className="mt-6 p-4 rounded-xl bg-ink-50 dark:bg-ink-800">
              <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-3">
                ⚖️ 判决统计
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['胜利', '失败', '无罪', '有罪'].map(verdict => {
                  const count = HISTORICAL_TRIALS.filter(t => t.verdict === verdict).length;
                  const percent = (count / HISTORICAL_TRIALS.length * 100).toFixed(0);
                  return (
                    <div
                      key={verdict}
                      className="text-center"
                    >
                      <div className="text-sm font-bold text-ink-900 dark:text-ink-100 mb-1">
                        {verdict}
                      </div>
                      <div className="text-2xl font-bold text-accent">
                        {count} ({percent}%)
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </div>
  );
}
