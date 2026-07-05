/**
 * 历史审判庭 — AI 升级版
 * @see history-museum/design/002-innovation-brainstorm.md §1
 * @see ITERATIONS.md #89
 *
 * 在原有静态案件展示基础上，增加三大 AI 能力：
 * 1. AI 法官评析 — 深度法律分析
 * 2. 你来当法官 — 互动判案对比
 * 3. 法学科普 — 从案件引申法律知识
 */

import { useState, useMemo, useCallback } from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import {
  HISTORICAL_TRIALS,
  TRIALS_BY_DYNASTY,
  TRIALS_BY_TYPE,
  TRIALS_WON,
  TRIALS_LOST,
} from '@/data/features/trialData';
import {
  analyzeTrial,
  compareVerdict,
  generateLegalEducation,
  type TrialAnalysis,
  type VerdictComparison,
} from '@/features/trialAI';
import { usePersonaStore } from '@/store/personaStore';

/* ─── 类型声明 ─── */

type TabId = 'detail' | 'analyze' | 'judge' | 'learn';

interface UserVerdictInput {
  defendant: string;
  guilty: boolean;
  sentence: string;
  reason: string;
}

/* ─── 辅助函数 ─── */

const VERDICT_COLORS: Record<string, string> = {
  胜利: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  失败: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  无罪: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  有罪: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  流放: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  处死: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  '未审判': 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300',
  '有争议': 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
};

const TYPE_COLORS: Record<string, string> = {
  政治: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  军事: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  贪腐: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  谋反: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  家族: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  文化: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
};

/* ─── 子组件 ─── */

function Badge({ text, colorClass }: { text: string; colorClass: string }) {
  return <span className={`px-2 py-1 rounded text-xs font-bold ${colorClass}`}>{text}</span>;
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center gap-3 py-8 text-ink-500 dark:text-ink-400">
      <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      <span className="text-sm">AI 正在分析中…</span>
    </div>
  );
}

/* ─── 主页面 ─── */

export default function HistoricalTrialPage() {
  const [selectedDynasty, setSelectedDynasty] = useState('全部');
  const [selectedType, setSelectedType] = useState('全部');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrial, setSelectedTrial] = useState<typeof HISTORICAL_TRIALS[number] | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>('detail');

  // AI 状态
  const [analysis, setAnalysis] = useState<TrialAnalysis | null>(null);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [comparison, setComparison] = useState<VerdictComparison | null>(null);
  const [comparisonLoading, setComparisonLoading] = useState(false);
  const [education, setEducation] = useState('');
  const [educationLoading, setEducationLoading] = useState(false);

  // 用户判案输入
  const [userVerdict, setUserVerdict] = useState<UserVerdictInput>({
    defendant: '',
    guilty: false,
    sentence: '',
    reason: '',
  });


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
      if (a.year && b.year) return parseInt(a.year) - parseInt(b.year);
      return 0;
    });
  }, [selectedDynasty, selectedType, searchQuery]);

  // 重置 AI 状态
  const resetAI = useCallback(() => {
    setAnalysis(null);
    setComparison(null);
    setEducation('');
  }, []);

  // 选择案件
  const handleSelectTrial = useCallback((trial: typeof HISTORICAL_TRIALS[number]) => {
    setSelectedTrial(trial);
    setActiveTab('detail');
    resetAI();
  }, [resetAI]);

  // 关闭案件详情
  const handleCloseTrial = useCallback(() => {
    setSelectedTrial(null);
    resetAI();
  }, [resetAI]);

  // AI 法官评析
  const handleAnalyze = useCallback(async () => {
    if (!selectedTrial) return;
    setAnalysisLoading(true);
    try {
      const persona = usePersonaStore.getState().persona;
      const result = await analyzeTrial(selectedTrial, persona || undefined);
      setAnalysis(result);
    } catch {
      // 分析失败，保持 null
    } finally {
      setAnalysisLoading(false);
    }
  }, [selectedTrial]);

  // 用户判案对比
  const handleCompareVerdict = useCallback(async () => {
    if (!selectedTrial) return;
    setComparisonLoading(true);
    try {
      const persona = usePersonaStore.getState().persona;
      const result = await compareVerdict(selectedTrial, userVerdict, persona || undefined);
      setComparison(result);
    } catch {
      // 对比失败
    } finally {
      setComparisonLoading(false);
    }
  }, [selectedTrial, userVerdict]);

  // 法学科普
  const handleLegalEducation = useCallback(async () => {
    if (!selectedTrial) return;
    setEducationLoading(true);
    try {
      const result = await generateLegalEducation(selectedTrial);
      setEducation(result);
    } catch {
      // 生成失败
    } finally {
      setEducationLoading(false);
    }
  }, [selectedTrial]);

  /* ─── Tab 定义 ─── */
  const tabs: { id: TabId; label: string; disabled?: boolean }[] = [
    { id: 'detail', label: '案件详情' },
    { id: 'analyze', label: 'AI 评析' },
    { id: 'judge', label: '你来当法官' },
    { id: 'learn', label: '法学科普' },
  ];

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 头部 */}
        <SectionHeader
          label="HISTORICAL TRIAL"
          title="历史审判庭"
          description="穿越回古代，见证历史性的审判时刻"
        />

        {/* 筛选栏 */}
        <RevealOnScroll>
          <div className="mt-6 p-4 md:p-6 rounded-xl border-2 border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-bold text-ink-700 dark:text-ink-300 mb-2">搜索</label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="案件、朝代、审判者…"
                  className="w-full px-4 py-2.5 rounded-lg bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-600 text-ink-900 dark:text-ink-100 placeholder:text-ink-400 focus:border-accent outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-ink-700 dark:text-ink-300 mb-2">朝代</label>
                <select
                  value={selectedDynasty}
                  onChange={e => setSelectedDynasty(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-600 text-ink-900 dark:text-ink-100 focus:border-accent outline-none transition-all"
                >
                  {allDynasties.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-ink-700 dark:text-ink-300 mb-2">类型</label>
                <select
                  value={selectedType}
                  onChange={e => setSelectedType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-600 text-ink-900 dark:text-ink-100 focus:border-accent outline-none transition-all"
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
        </RevealOnScroll>

        {/* 案件卡片网格 */}
        <RevealOnScroll direction="up" delay={200}>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredTrials.map(trial => (
              <button
                key={trial.id}
                onClick={() => handleSelectTrial(trial)}
                className={`p-5 rounded-xl border-2 text-left transition-all hover:shadow-lg hover:-translate-y-0.5 ${
                  selectedTrial?.id === trial.id
                    ? 'border-accent ring-2 ring-accent/20 bg-accent/5 dark:bg-accent/10'
                    : 'border-ink-200 dark:border-ink-700 bg-white/70 dark:bg-ink-900/70 hover:border-accent'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-sm font-bold text-ink-900 dark:text-ink-100 line-clamp-2 flex-1 mr-2">
                    {trial.title}
                  </h3>
                  <Badge text={trial.verdict} colorClass={VERDICT_COLORS[trial.verdict] || 'bg-gray-100 text-gray-800'} />
                </div>
                <div className="text-xs text-ink-500 dark:text-ink-400 space-y-1">
                  <div>{trial.dynasty} · {trial.period}</div>
                  <div>{trial.judge}</div>
                  <Badge text={trial.type} colorClass={TYPE_COLORS[trial.type] || ''} />
                </div>
                <p className="text-xs text-ink-400 dark:text-ink-500 mt-2 line-clamp-2">{trial.accusation}</p>
              </button>
            ))}
          </div>

          {filteredTrials.length === 0 && (
            <div className="text-center py-16 text-ink-400">
              <p>没有找到符合条件的案件</p>
            </div>
          )}
        </RevealOnScroll>

        {/* 统计信息 */}
        <RevealOnScroll direction="up" delay={300}>
          <div className="mt-12 p-6 rounded-xl border-2 border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900">
            <h2 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-4">审判统计</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-6">
              <div>
                <div className="text-2xl font-bold text-ink-900 dark:text-ink-100">{HISTORICAL_TRIALS.length}</div>
                <div className="text-xs text-ink-500">记录案件</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{TRIALS_WON.length}</div>
                <div className="text-xs text-ink-500">胜利</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">{TRIALS_LOST.length}</div>
                <div className="text-xs text-ink-500">失败</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{TRIALS_BY_TYPE.政治?.length || 0}</div>
                <div className="text-xs text-ink-500">政治案件</div>
              </div>
            </div>

            {/* 朝代分布 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-2">按朝代</h3>
                <div className="space-y-2">
                  {Object.entries(TRIALS_BY_DYNASTY)
                    .sort((a, b) => {
                      const order = ['夏商西周','东周','秦朝','汉朝','三国','晋朝','南北朝','隋朝','唐朝','宋朝','元朝','明朝','清朝','民国','新中国'];
                      return (order.indexOf(a[0]) === -1 ? 999 : order.indexOf(a[0])) - (order.indexOf(b[0]) === -1 ? 999 : order.indexOf(b[0]));
                    })
                    .map(([dynasty, trials]) => (
                      <div key={dynasty} className="flex items-center justify-between text-sm">
                        <span className="text-ink-600 dark:text-ink-400">{dynasty}</span>
                        <span className="font-bold text-accent">{trials.length}</span>
                      </div>
                    ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-2">按类型</h3>
                <div className="space-y-2">
                  {Object.entries(TRIALS_BY_TYPE).map(([type, trials]) => (
                    <div key={type} className="flex items-center justify-between text-sm">
                      <span className="text-ink-600 dark:text-ink-400">{type}</span>
                      <span className="font-bold text-accent">{trials.length}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* 案件详情模态框 */}
        {selectedTrial && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={handleCloseTrial}>
            <div
              className="bg-white dark:bg-ink-900 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              {/* 模态框头部 */}
              <div className="sticky top-0 z-10 bg-white dark:bg-ink-900 border-b border-ink-200 dark:border-ink-700 p-4 md:p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-ink-900 dark:text-ink-100">{selectedTrial.title}</h2>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <Badge text={selectedTrial.verdict} colorClass={VERDICT_COLORS[selectedTrial.verdict] || ''} />
                      <Badge text={selectedTrial.type} colorClass={TYPE_COLORS[selectedTrial.type] || ''} />
                      <span className="text-xs text-ink-500">{selectedTrial.dynasty} · {selectedTrial.period}</span>
                    </div>
                  </div>
                  <button onClick={handleCloseTrial} className="text-ink-400 hover:text-ink-900 dark:hover:text-ink-100 text-2xl leading-none">✕</button>
                </div>

                {/* Tab 导航 */}
                <div className="flex gap-1 mt-3 overflow-x-auto">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => { setActiveTab(tab.id); if (tab.id !== 'detail') resetAI(); }}
                      disabled={tab.disabled}
                      className={`px-3 py-1.5 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${
                        activeTab === tab.id
                          ? 'bg-accent text-white shadow-md'
                          : tab.disabled
                          ? 'text-ink-300 dark:text-ink-600 cursor-not-allowed'
                          : 'text-ink-600 dark:text-ink-400 hover:bg-ink-100 dark:hover:bg-ink-800'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab 内容 */}
              <div className="p-4 md:p-6">
                {/* ── 案件详情 ── */}
                {activeTab === 'detail' && (
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="p-3 rounded-lg bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700">
                        <div className="text-xs text-ink-500">地点</div>
                        <div className="font-bold text-ink-900 dark:text-ink-100 mt-1">{selectedTrial.location}</div>
                      </div>
                      <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700">
                        <div className="text-xs text-purple-500">审判者</div>
                        <div className="font-bold text-purple-700 dark:text-purple-300 mt-1">{selectedTrial.judge}</div>
                      </div>
                      <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700">
                        <div className="text-xs text-blue-500">关键人物</div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedTrial.keyFigures.slice(0, 4).map((p, i) => (
                            <span key={i} className="px-2 py-0.5 rounded text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200">{p}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                        <h4 className="text-sm font-bold text-red-700 dark:text-red-300 mb-2">指控</h4>
                        <p className="text-sm text-red-600 dark:text-red-400">{selectedTrial.accusation}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                        <h4 className="text-sm font-bold text-green-700 dark:text-green-300 mb-2">辩护</h4>
                        <p className="text-sm text-green-600 dark:text-green-400">{selectedTrial.defense}</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
                      <h4 className="text-sm font-bold text-accent mb-2">判决结果：{selectedTrial.verdict}</h4>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-2">历史后果</h4>
                      <ul className="space-y-1.5">
                        {selectedTrial.consequences.map((c, i) => (
                          <li key={i} className="text-sm text-ink-600 dark:text-ink-400 flex items-start gap-2">
                            <span className="text-accent mt-1">▸</span><span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-2">历史意义</h4>
                      <p className="text-sm text-ink-600 dark:text-ink-400 leading-relaxed">{selectedTrial.historicalSignificance}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-2">案件详情</h4>
                      <p className="text-sm text-ink-600 dark:text-ink-400 leading-relaxed">{selectedTrial.details}</p>
                    </div>
                  </div>
                )}

                {/* ── AI 评析 ── */}
                {activeTab === 'analyze' && (
                  <div className="space-y-5">
                    <div className="p-4 bg-amber-50 dark:bg-amber-900/10 rounded-lg border border-amber-200/50 dark:border-amber-800/30 text-sm text-amber-700 dark:text-amber-400">
                      AI 将从现代法律和历史背景两个维度，对这个案件进行深度分析。
                    </div>

                    {!analysis && !analysisLoading && (
                      <button
                        onClick={handleAnalyze}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-accent to-amber-600 text-white font-bold hover:shadow-lg transition-all"
                      >
                        开始 AI 评析
                      </button>
                    )}

                    {analysisLoading && <LoadingSpinner />}

                    {analysis && (
                      <div className="space-y-5">
                        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/30">
                          <h4 className="text-sm font-bold text-blue-700 dark:text-blue-300 mb-2">现代法律视角</h4>
                          <p className="text-sm text-blue-600 dark:text-blue-400 leading-relaxed">{analysis.modernPerspective}</p>
                        </div>
                        <div className="p-4 rounded-xl bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700">
                          <h4 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-2">历史背景解读</h4>
                          <p className="text-sm text-ink-600 dark:text-ink-400 leading-relaxed">{analysis.historicalContext}</p>
                        </div>
                        <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-800/30">
                          <h4 className="text-sm font-bold text-purple-700 dark:text-purple-300 mb-2">关键争议点</h4>
                          <ol className="space-y-2">
                            {analysis.controversies.map((c, i) => (
                              <li key={i} className="text-sm text-purple-600 dark:text-purple-400 flex items-start gap-2">
                                <span className="font-bold text-purple-500">{i + 1}.</span><span>{c}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                        <div className="p-3 rounded-lg bg-accent/10 border border-accent/20 text-center">
                          <span className="text-sm font-bold text-accent">{analysis.takeaway}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ── 你来当法官 ── */}
                {activeTab === 'judge' && (
                  <div className="space-y-5">
                    <div className="p-4 bg-amber-50 dark:bg-amber-900/10 rounded-lg border border-amber-200/50 dark:border-amber-800/30 text-sm text-amber-700 dark:text-amber-400">
                      在查看历史判决之前，先凭你的判断做出裁决，然后 AI 会对比你的判决与历史判决。
                    </div>

                    {/* 案件摘要 */}
                    <div className="p-4 rounded-xl bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700">
                      <h4 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-2">案件摘要</h4>
                      <p className="text-sm text-ink-600 dark:text-ink-400 mb-2"><strong>指控：</strong>{selectedTrial.accusation}</p>
                      <p className="text-sm text-ink-600 dark:text-ink-400 mb-2"><strong>辩护：</strong>{selectedTrial.defense}</p>
                      <p className="text-sm text-ink-600 dark:text-ink-400"><strong>被告：</strong>{selectedTrial.keyFigures[0] || '未知'}</p>
                    </div>

                    {/* 用户判案表单 */}
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-bold text-ink-700 dark:text-ink-300 mb-1">被告姓名</label>
                        <input
                          type="text"
                          value={userVerdict.defendant}
                          onChange={e => setUserVerdict(v => ({ ...v, defendant: e.target.value }))}
                          placeholder={selectedTrial.keyFigures[0] || ''}
                          className="w-full px-4 py-2.5 rounded-lg bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-600 text-ink-900 dark:text-ink-100 focus:border-accent outline-none transition-all"
                        />
                      </div>
                      <div className="flex gap-3">
                        <label className="flex items-center gap-2 text-sm text-ink-700 dark:text-ink-300 cursor-pointer">
                          <input
                            type="radio"
                            name="guilty"
                            checked={userVerdict.guilty}
                            onChange={() => setUserVerdict(v => ({ ...v, guilty: true }))}
                            className="accent-accent"
                          />
                          有罪
                        </label>
                        <label className="flex items-center gap-2 text-sm text-ink-700 dark:text-ink-300 cursor-pointer">
                          <input
                            type="radio"
                            name="guilty"
                            checked={!userVerdict.guilty}
                            onChange={() => setUserVerdict(v => ({ ...v, guilty: false }))}
                            className="accent-accent"
                          />
                          无罪
                        </label>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-ink-700 dark:text-ink-300 mb-1">量刑建议</label>
                        <input
                          type="text"
                          value={userVerdict.sentence}
                          onChange={e => setUserVerdict(v => ({ ...v, sentence: e.target.value }))}
                          placeholder="例如：流放三千里、有期徒刑五年…"
                          className="w-full px-4 py-2.5 rounded-lg bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-600 text-ink-900 dark:text-ink-100 focus:border-accent outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-ink-700 dark:text-ink-300 mb-1">判决理由</label>
                        <textarea
                          value={userVerdict.reason}
                          onChange={e => setUserVerdict(v => ({ ...v, reason: e.target.value }))}
                          placeholder="简述你的判决依据…"
                          rows={3}
                          className="w-full px-4 py-2.5 rounded-lg bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-600 text-ink-900 dark:text-ink-100 focus:border-accent outline-none transition-all resize-none"
                        />
                      </div>
                    </div>

                    <button
                      onClick={handleCompareVerdict}
                      disabled={comparisonLoading || !userVerdict.defendant.trim() || !userVerdict.reason.trim()}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-accent to-amber-600 text-white font-bold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      {comparisonLoading ? 'AI 正在对比分析…' : '提交判决，让 AI 点评'}
                    </button>

                    {comparisonLoading && <LoadingSpinner />}

                    {comparison && (
                      <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700">
                          <h4 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-2">AI 对你的判决评价</h4>
                          <p className="text-sm text-ink-600 dark:text-ink-400 leading-relaxed">{comparison.aiComment}</p>
                        </div>
                        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/30">
                          <h4 className="text-sm font-bold text-blue-700 dark:text-blue-300 mb-2">与历史判决的差异</h4>
                          <p className="text-sm text-blue-600 dark:text-blue-400 leading-relaxed">{comparison.differenceAnalysis}</p>
                        </div>
                        <div className="p-4 rounded-xl bg-accent/10 border border-accent/20">
                          <h4 className="text-sm font-bold text-accent mb-2">如果由你审判</h4>
                          <p className="text-sm text-ink-700 dark:text-ink-300 leading-relaxed">{comparison.yourVerdict}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ── 法学科普 ── */}
                {activeTab === 'learn' && (
                  <div className="space-y-5">
                    <div className="p-4 bg-ink-50 dark:bg-ink-800 rounded-lg border border-ink-200 dark:border-ink-700 text-sm text-ink-600 dark:text-ink-400">
                      从本案引申出的法律知识点，帮助你理解古今法律理念的差异。
                    </div>

                    {!education && !educationLoading && (
                      <button
                        onClick={handleLegalEducation}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold hover:shadow-lg transition-all"
                      >
                        生成法学科普
                      </button>
                    )}

                    {educationLoading && <LoadingSpinner />}

                    {education && (
                      <div className="p-5 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/10 dark:to-teal-900/10 border border-emerald-200 dark:border-emerald-800/30">
                        <p className="text-sm text-emerald-800 dark:text-emerald-300 leading-loose whitespace-pre-line">{education}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
