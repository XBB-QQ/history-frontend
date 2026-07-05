/**
 * 历史预言板 — LLM 推演增强版
 * @see ITERATIONS.md #84, #92
 *
 * 原有静态预测 + LLM 推演 + 用户预测 localStorage + 预测历史对照
 */

import { useState, useMemo, useCallback } from 'react';
import {
  HISTORICAL_EVENTS,
  PREDICTION_SCENARIOS,
  FUTURE_EVENTS,
  type HistoricalEvent,
  type FutureEvent,
  type PredictionScenario,
} from '@/data/features/futurePredictionData';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import {
  forecastFuture,
  saveUserPrediction,
  getUserPredictions,
  updatePredictionResult,
  getPredictionStats,
  comparePredictions,
  type ForecastResult,
  type UserPrediction,
} from '@/features/forecastEngine';
import { usePersonaStore } from '@/store/personaStore';

/* ─── 类型定义 ─── */
type PageTab = 'timeline' | 'predict' | 'my-predictions' | 'scenario';

/* ─── 历史事件卡片 ─── */
function HistoricalEventCard({
  event,
  selected,
  onSelect,
}: {
  event: HistoricalEvent;
  selected: boolean;
  onSelect: () => void;
}) {
  const typeColors: Record<string, string> = {
    political: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    economic: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    social: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    technological: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    environmental: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  };

  return (
    <button
      onClick={onSelect}
      className={`p-4 rounded-xl transition-all text-left ${
        selected
          ? 'bg-accent text-white shadow-lg scale-105'
          : 'bg-ink-50 dark:bg-ink-800 hover:bg-ink-100 dark:hover:bg-ink-700 border border-ink-200 dark:border-ink-700'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-bold">{event.displayName}</h4>
        <span className={`text-xs px-2 py-0.5 rounded ${selected ? 'bg-white/20' : typeColors[event.type] || ''}`}>
          {event.category}
        </span>
      </div>
      <p className="text-sm opacity-80 mb-2">{event.year > 0 ? `${event.year}年` : `${Math.abs(event.year)} BC`}</p>
      <p className="text-xs opacity-70 line-clamp-2">{event.description}</p>
    </button>
  );
}

/* ─── 未来事件卡片 ─── */
function FutureEventCard({ event }: { event: FutureEvent }) {
  const probColor = event.probability > 70 ? 'text-green-600' : event.probability > 40 ? 'text-yellow-600' : 'text-gray-600';

  return (
    <div className="p-4 rounded-xl bg-white dark:bg-ink-900 border border-ink-200 dark:border-ink-700">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-bold text-ink-900 dark:text-ink-100">{event.event}</h4>
        <span className="text-xs bg-ink-100 dark:bg-ink-800 px-2 py-1 rounded">{event.likelihood}</span>
      </div>
      <p className="text-sm text-ink-600 dark:text-ink-400 mb-2">{event.year}年 · {event.type}</p>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs text-ink-500">概率：</span>
        <div className="flex-1 bg-ink-200 dark:bg-ink-700 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${event.probability > 70 ? 'bg-green-500' : event.probability > 40 ? 'bg-yellow-500' : 'bg-gray-500'}`}
            style={{ width: `${event.probability}%` }}
          />
        </div>
        <span className={`text-xs font-bold ${probColor}`}>{event.probability}%</span>
      </div>
      <div className="flex flex-wrap gap-1">
        {event.factors.slice(0, 3).map((f, i) => (
          <span key={i} className="text-xs bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 px-2 py-0.5 rounded">
            {f}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── 我的预测列表 ─── */
function MyPredictionsPanel({ predictions }: { predictions: UserPrediction[] }) {
  const stats = getPredictionStats();

  return (
    <div className="space-y-6">
      {/* 统计面板 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-ink-900 border border-ink-200 dark:border-ink-700">
          <div className="text-2xl font-bold text-accent">{stats.total}</div>
          <div className="text-sm text-ink-500">总预测</div>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-ink-900 border border-ink-200 dark:border-ink-700">
          <div className="text-2xl font-bold text-green-600">{stats.correct}</div>
          <div className="text-sm text-ink-500">命中</div>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-ink-900 border border-ink-200 dark:border-ink-700">
          <div className="text-2xl font-bold text-yellow-600">{stats.partial}</div>
          <div className="text-sm text-ink-500">部分命中</div>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-ink-900 border border-ink-200 dark:border-ink-700">
          <div className="text-2xl font-bold text-accent">{stats.accuracy}%</div>
          <div className="text-sm text-ink-500">准确率</div>
        </div>
      </div>

      {/* 预测列表 */}
      {predictions.length === 0 ? (
        <div className="text-center py-12 text-ink-400">
          <span className="text-4xl block mb-2">🔮</span>
          <p>还没有预测记录，去提交你的第一个预测吧！</p>
        </div>
      ) : (
        <div className="space-y-4">
          {predictions.map(pred => (
            <div key={pred.id} className="p-4 rounded-xl bg-white dark:bg-ink-900 border border-ink-200 dark:border-ink-700">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-ink-900 dark:text-ink-100">{pred.scenario}</h4>
                {pred.result && (
                  <span className={`text-xs px-2 py-1 rounded ${
                    pred.result === 'correct' ? 'bg-green-100 text-green-700' :
                    pred.result === 'partial' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {pred.result === 'correct' ? '✅ 命中' : pred.result === 'partial' ? '⚠️ 部分命中' : '❌ 未命中'}
                  </span>
                )}
              </div>
              <p className="text-sm text-ink-600 dark:text-ink-400 mb-2">{pred.prediction}</p>
              <div className="flex items-center justify-between text-xs text-ink-500">
                <span>置信度：{pred.confidence}%</span>
                <span>{new Date(pred.timestamp).toLocaleDateString()}</span>
              </div>
              {!pred.result && (
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => updatePredictionResult(pred.id, 'correct')}
                    className="px-3 py-1 rounded text-xs bg-green-100 text-green-700 hover:bg-green-200"
                  >
                    标记命中
                  </button>
                  <button
                    onClick={() => updatePredictionResult(pred.id, 'partial')}
                    className="px-3 py-1 rounded text-xs bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                  >
                    标记部分命中
                  </button>
                  <button
                    onClick={() => updatePredictionResult(pred.id, 'wrong')}
                    className="px-3 py-1 rounded text-xs bg-red-100 text-red-700 hover:bg-red-200"
                  >
                    标记未命中
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── 主页面 ─── */
export default function FuturePredictionPage() {
  const [activeTab, setActiveTab] = useState<PageTab>('timeline');
  const [selectedEventIds, setSelectedEventIds] = useState<string[]>([]);
  const [selectedScenario, setSelectedScenario] = useState<PredictionScenario | null>(null);
  const [userPredictionInput, setUserPredictionInput] = useState('');
  const [confidence, setConfidence] = useState(50);
  const [llmForecast, setLlmForecast] = useState<ForecastResult | null>(null);
  const [comparison, setComparison] = useState<{ evaluation: string; alignment: string; insight: string } | null>(null);
  const [isForecasting, setIsForecasting] = useState(false);
  const [isComparing, setIsComparing] = useState(false);

  const selectedEvents = useMemo(
    () => HISTORICAL_EVENTS.filter(e => selectedEventIds.includes(e.id)),
    [selectedEventIds],
  );

  const myPredictions = useMemo(() => getUserPredictions(), []);

  /* 选择/取消选择事件 */
  const toggleEvent = useCallback((id: string) => {
    setSelectedEventIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id],
    );
  }, []);

  /* LLM 推演 */
  const handleForecast = useCallback(async () => {
    if (selectedEvents.length === 0) {
      alert('请至少选择一个历史事件作为参考');
      return;
    }

    setIsForecasting(true);
    try {
      const persona = usePersonaStore.getState().persona;
      const scenario = selectedEvents.map(e => `${e.name}(${e.year > 0 ? e.year : Math.abs(e.year)}): ${e.description}`).join('\n');
      const result = await forecastFuture(scenario, selectedEvents, persona || undefined);
      setLlmForecast(result);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : '推演失败';
      alert(`LLM 推演失败：${message}`);
    } finally {
      setIsForecasting(false);
    }
  }, [selectedEvents]);

  /* 保存用户预测 */
  const handleSavePrediction = useCallback(() => {
    if (!userPredictionInput.trim()) {
      alert('请输入你的预测');
      return;
    }
    const scenario = selectedEvents.map(e => e.name).join('、') || '自定义场景';
    saveUserPrediction({
      scenario,
      prediction: userPredictionInput,
      confidence,
    });
    setUserPredictionInput('');
    setConfidence(50);
    alert('预测已保存！你可以在"我的预测"中查看。');
    setActiveTab('my-predictions');
  }, [userPredictionInput, confidence, selectedEvents]);

  /* 对比预测 */
  const handleCompare = useCallback(async () => {
    if (!llmForecast || !userPredictionInput.trim()) return;
    setIsComparing(true);
    try {
      const result = await comparePredictions(userPredictionInput, llmForecast, selectedEvents.map(e => e.name).join('、'));
      setComparison(result);
    } catch {
      // ignore
    } finally {
      setIsComparing(false);
    }
  }, [llmForecast, userPredictionInput, selectedEvents]);

  /* 重置 */
  const handleReset = useCallback(() => {
    setSelectedEventIds([]);
    setLlmForecast(null);
    setComparison(null);
    setUserPredictionInput('');
    setConfidence(50);
  }, []);

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 头部 */}
        <RevealOnScroll>
          <SectionHeader
            label="HISTORICAL FORECAST"
            title="历史预言板"
            description="回顾历史关键事件，展望未来可能性"
          />
        </RevealOnScroll>

        {/* Tab 导航 */}
        <RevealOnScroll delay={100}>
          <div className="flex gap-2 mt-6 mb-8 overflow-x-auto pb-2">
            {[
              { id: 'timeline' as const, label: '历史时间线', emoji: '📜' },
              { id: 'predict' as const, label: 'LLM 推演', emoji: '🔮' },
              { id: 'my-predictions' as const, label: '我的预测', emoji: '📊' },
              { id: 'scenario' as const, label: '情景推演', emoji: '🧬' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-accent text-white shadow-lg'
                    : 'bg-white/70 dark:bg-ink-900/70 text-ink-600 dark:text-ink-400 hover:bg-ink-100 dark:hover:bg-ink-800'
                }`}
              >
                {tab.emoji} {tab.label}
              </button>
            ))}
          </div>
        </RevealOnScroll>

        {/* Tab 1: 历史时间线 */}
        {activeTab === 'timeline' && (
          <RevealOnScroll direction="up" delay={200}>
            <div className="bg-white dark:bg-ink-900 rounded-2xl border-2 border-ink-200 dark:border-ink-700 p-6 shadow-lg">
              <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-4">
                📜 历史关键事件（点击选择参考事件）
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[600px] overflow-y-auto pr-2">
                {HISTORICAL_EVENTS.map(event => (
                  <HistoricalEventCard
                    key={event.id}
                    event={event}
                    selected={selectedEventIds.includes(event.id)}
                    onSelect={() => toggleEvent(event.id)}
                  />
                ))}
              </div>
              {selectedEvents.length > 0 && (
                <div className="mt-4 p-3 rounded-xl bg-accent/10 text-accent font-bold text-sm">
                  已选 {selectedEvents.length} 个事件 → {selectedEvents.map(e => e.displayName).join('、')}
                </div>
              )}
            </div>
          </RevealOnScroll>
        )}

        {/* Tab 2: LLM 推演 */}
        {activeTab === 'predict' && (
          <RevealOnScroll direction="up" delay={200}>
            <div className="space-y-6">
              {/* 未来事件概览 */}
              <div className="bg-white dark:bg-ink-900 rounded-2xl border-2 border-ink-200 dark:border-ink-700 p-6 shadow-lg">
                <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-4">
                  💡 未来事件预测（AI 评估）
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {FUTURE_EVENTS.map(event => (
                    <FutureEventCard key={event.id} event={event} />
                  ))}
                </div>
              </div>

              {/* 选择历史事件 + 用户预测 */}
              <div className="bg-white dark:bg-ink-900 rounded-2xl border-2 border-ink-200 dark:border-ink-700 p-6 shadow-lg">
                <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-4">
                  🔮 基于历史规律推演
                </h3>

                {/* 已选事件 */}
                <div className="mb-4">
                  <p className="text-sm text-ink-500 mb-2">参考历史事件：</p>
                  {selectedEvents.length === 0 ? (
                    <p className="text-sm text-ink-400 italic">请先在"历史时间线"中选择参考事件</p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {selectedEvents.map(e => (
                        <span key={e.id} className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-bold">
                          {e.displayName}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* 用户预测输入 */}
                <div className="mb-4">
                  <label className="text-sm text-ink-500 mb-2 block">你的预测：</label>
                  <textarea
                    value={userPredictionInput}
                    onChange={(e) => setUserPredictionInput(e.target.value)}
                    className="input-field w-full h-24"
                    placeholder="你认为基于这些历史事件，未来会发生什么？"
                  />
                </div>

                {/* 置信度滑块 */}
                <div className="mb-6">
                  <label className="text-sm text-ink-500 mb-2 block">
                    置信度：{confidence}%
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={confidence}
                    onChange={(e) => setConfidence(parseInt(e.target.value))}
                    className="w-full accent-accent"
                  />
                  <div className="flex justify-between text-xs text-ink-400">
                    <span>不确定</span>
                    <span>很有信心</span>
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="flex gap-3 flex-wrap">
                  <button
                    onClick={handleForecast}
                    disabled={isForecasting || selectedEvents.length === 0}
                    className="px-6 py-2.5 rounded-xl bg-accent text-white font-bold hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isForecasting ? '🔄 推演中...' : '🔮 AI 推演'}
                  </button>
                  <button
                    onClick={handleSavePrediction}
                    disabled={!userPredictionInput.trim()}
                    className="px-6 py-2.5 rounded-xl bg-green-500 text-white font-bold hover:bg-green-600 disabled:opacity-50"
                  >
                    💾 保存预测
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-xl bg-ink-100 dark:bg-ink-800 font-bold"
                  >
                    🔄 重置
                  </button>
                </div>
              </div>

              {/* LLM 推演结果 */}
              {llmForecast && (
                <div className="bg-gradient-to-br from-paper to-ink-50 dark:from-ink-900 dark:to-ink-800 rounded-2xl border-2 border-ink-200 dark:border-ink-700 p-6 shadow-lg">
                  <h3 className="text-lg font-bold text-accent mb-4 text-center">🔮 AI 推演结果</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="p-4 rounded-xl bg-white dark:bg-ink-900">
                      <div className="text-sm text-ink-500 mb-1">推演结论</div>
                      <p className="text-sm text-ink-700 dark:text-ink-300">{llmForecast.conclusion}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white dark:bg-ink-900">
                      <div className="text-sm text-ink-500 mb-1">发生概率</div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-ink-200 dark:bg-ink-700 rounded-full h-3">
                          <div
                            className="h-3 rounded-full bg-accent"
                            style={{ width: `${llmForecast.probability}%` }}
                          />
                        </div>
                        <span className="text-xl font-bold text-accent">{llmForecast.probability}%</span>
                      </div>
                      <div className="text-sm text-ink-500 mt-2">时间窗口：{llmForecast.timeWindow}</div>
                    </div>
                  </div>

                  {llmForecast.keyVariables.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-bold text-sm text-ink-700 dark:text-ink-300 mb-2">关键变量</h4>
                      <div className="flex flex-wrap gap-2">
                        {llmForecast.keyVariables.map((v, i) => (
                          <span key={i} className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-sm">
                            {v}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {llmForecast.caveats.length > 0 && (
                    <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                      <h4 className="font-bold text-sm text-amber-800 dark:text-amber-400 mb-1">⚠️ 不确定性说明</h4>
                      <ul className="text-sm text-ink-700 dark:text-ink-300 space-y-1">
                        {llmForecast.caveats.map((c, i) => (
                          <li key={i}>• {c}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* 对比按钮 */}
                  {userPredictionInput && (
                    <button
                      onClick={handleCompare}
                      disabled={isComparing}
                      className="w-full mt-4 py-3 rounded-xl bg-indigo-500 text-white font-bold hover:bg-indigo-600 disabled:opacity-50"
                    >
                      {isComparing ? '🔄 分析中...' : '⚖️ 对比用户预测与 AI 推演'}
                    </button>
                  )}

                  {/* 对比结果 */}
                  {comparison && (
                    <div className="mt-4 space-y-4">
                      <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800">
                        <h4 className="font-bold text-blue-800 dark:text-blue-400 mb-2">📝 评价</h4>
                        <p className="text-sm text-ink-700 dark:text-ink-300">{comparison.evaluation}</p>
                      </div>
                      <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800">
                        <h4 className="font-bold text-green-800 dark:text-green-400 mb-2">🔗 一致性</h4>
                        <p className="text-sm text-ink-700 dark:text-ink-300">
                          {comparison.alignment === 'aligned' ? '✅ 用户预测与 AI 推演一致' :
                           comparison.alignment === 'divergent' ? '⚠️ 用户预测与 AI 推演存在分歧' :
                           '💡 用户预测与 AI 推演互补'}
                        </p>
                      </div>
                      {comparison.insight && (
                        <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-200 dark:border-purple-800">
                          <h4 className="font-bold text-purple-800 dark:text-purple-400 mb-2">💎 历史洞察</h4>
                          <p className="text-sm text-ink-700 dark:text-ink-300 italic">{comparison.insight}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </RevealOnScroll>
        )}

        {/* Tab 3: 我的预测 */}
        {activeTab === 'my-predictions' && (
          <RevealOnScroll direction="up" delay={200}>
            <div className="bg-white dark:bg-ink-900 rounded-2xl border-2 border-ink-200 dark:border-ink-700 p-6 shadow-lg">
              <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-6">📊 我的预测历史</h3>
              <MyPredictionsPanel predictions={myPredictions} />
            </div>
          </RevealOnScroll>
        )}

        {/* Tab 4: 情景推演 */}
        {activeTab === 'scenario' && (
          <RevealOnScroll direction="up" delay={200}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 场景列表 */}
              <div className="bg-white dark:bg-ink-900 rounded-2xl border-2 border-ink-200 dark:border-ink-700 p-6 shadow-lg">
                <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-4">🧬 预测场景</h3>
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                  {PREDICTION_SCENARIOS.map(scenario => (
                    <button
                      key={scenario.id}
                      onClick={() => setSelectedScenario(scenario)}
                      className={`w-full p-4 rounded-xl text-left transition-all ${
                        selectedScenario?.id === scenario.id
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                          : 'bg-ink-50 dark:bg-ink-800 hover:bg-ink-100 dark:hover:bg-ink-700'
                      }`}
                    >
                      <h4 className="font-bold">{scenario.title}</h4>
                      <p className="text-xs opacity-80 mt-1">{scenario.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* 场景详情 */}
              <div className="lg:col-span-2 bg-white dark:bg-ink-900 rounded-2xl border-2 border-ink-200 dark:border-ink-700 p-6 shadow-lg">
                {selectedScenario ? (
                  <div>
                    <h3 className="text-xl font-bold text-ink-900 dark:text-ink-100 mb-2">{selectedScenario.title}</h3>
                    <p className="text-sm text-ink-600 dark:text-ink-400 mb-4">{selectedScenario.description}</p>
                    <div className="p-4 rounded-xl bg-ink-50 dark:bg-ink-800 mb-4">
                      <h4 className="font-bold text-sm text-ink-700 dark:text-ink-300 mb-1">起始点</h4>
                      <p className="text-sm text-ink-600 dark:text-ink-400">{selectedScenario.startingPoint}</p>
                    </div>

                    {/* 变量 */}
                    <h4 className="font-bold text-ink-900 dark:text-ink-100 mb-3">预测变量</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                      {selectedScenario.variables.map(variable => (
                        <div key={variable.id} className="p-3 rounded-xl bg-ink-50 dark:bg-ink-800">
                          <p className="font-bold text-sm text-ink-900 dark:text-ink-100">{variable.name}</p>
                          <p className="text-xs text-ink-500 mt-1">{variable.description}</p>
                          <p className="text-sm text-accent font-bold mt-2">当前值：{variable.currentValue}</p>
                        </div>
                      ))}
                    </div>

                    {/* 分支结果 */}
                    <h4 className="font-bold text-ink-900 dark:text-ink-100 mb-3">可能结果</h4>
                    <div className="space-y-3">
                      {selectedScenario.scenarios.map(branch => (
                        <div key={branch.id} className="p-4 rounded-xl border-2 border-ink-200 dark:border-ink-700">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-bold text-ink-900 dark:text-ink-100">{branch.title}</h5>
                            <span className="text-sm font-bold text-accent">{branch.probability}%</span>
                          </div>
                          <p className="text-sm text-ink-600 dark:text-ink-400 mb-2">{branch.outcome}</p>
                          <div className="flex flex-wrap gap-1">
                            {branch.keyChanges.map((kc, i) => (
                              <span key={i} className="text-xs bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 px-2 py-0.5 rounded">
                                {kc}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-ink-400 py-20">
                    <span className="text-4xl block mb-2">🧬</span>
                    <p>选择一个场景开始推演</p>
                  </div>
                )}
              </div>
            </div>
          </RevealOnScroll>
        )}
      </div>
    </div>
  );
}
