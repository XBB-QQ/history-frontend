/**
 * 历史决策模拟器主页面
 * @see history-museum/design/000-future-roadmap.md §方向三 §3.1
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SCENARIOS } from '@/data/scenarios/index';
import type { Choice } from '@/types/scenario';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import ResultView from '@/components/simulator/ResultView';
import { usePersonaStore } from '@/store/personaStore';

type GameState = 'intro' | 'dilemma' | 'result';

interface GameStats {
  total: number;
  correct: number;
  alternate: number;
  failed: number;
  plausibilitySum: number;
}

const INITIAL_STATS: GameStats = {
  total: 0,
  correct: 0,
  alternate: 0,
  failed: 0,
  plausibilitySum: 0,
};

const DIFFICULTY_LABELS: Record<string, { label: string; color: string }> = {
  easy: { label: '入门', color: 'text-green-600 bg-green-100 dark:bg-green-900/30' },
  medium: { label: '进阶', color: 'text-amber-600 bg-amber-100 dark:bg-amber-900/30' },
  hard: { label: '困难', color: 'text-red-600 bg-red-100 dark:bg-red-900/30' },
};

function SimulatorPage() {
  const [state, setState] = useState<GameState>('intro');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [stats, setStats] = useState<GameStats>(INITIAL_STATS);
  const [completed, setCompleted] = useState<boolean[]>([]);

  const scenario = SCENARIOS[currentIdx];
  const isLastScenario = currentIdx === SCENARIOS.length - 1;

  function handleStart(idx: number = currentIdx) {
    setCurrentIdx(idx);
    setState('dilemma');
    setSelectedChoice(null);
  }

  function handleSelect(choice: Choice) {
    setSelectedChoice(choice);
    setState('result');
    // 记录到 AI 记忆中枢
    usePersonaStore.getState().recordSimulatorChoice({
      scenarioId: scenario.id,
      scenarioName: scenario.title,
      choice: choice.text,
      consequence: choice.result,
    });
    setStats((s) => ({
      total: s.total + 1,
      correct: s.correct + (choice.outcome === 'historical' ? 1 : 0),
      alternate: s.alternate + (choice.outcome === 'alternate' ? 1 : 0),
      failed: s.failed + (choice.outcome === 'failed' ? 1 : 0),
      plausibilitySum: s.plausibilitySum + (choice.plausibility ?? 0),
    }));
    setCompleted((c) => {
      const next = [...c];
      next[currentIdx] = true;
      return next;
    });
  }

  function handleNext() {
    if (isLastScenario) {
      // 重置
      setState('intro');
      setCurrentIdx(0);
      setSelectedChoice(null);
      setStats(INITIAL_STATS);
      setCompleted([]);
      return;
    }
    setCurrentIdx((i) => i + 1);
    setState('dilemma');
    setSelectedChoice(null);
  }

  function handleRestart() {
    setState('dilemma');
    setSelectedChoice(null);
  }

  function handleBranchSwitch(choice: Choice) {
    setSelectedChoice(choice);
  }

  const avgPlausibility = stats.total > 0
    ? Math.round(stats.plausibilitySum / stats.total)
    : 0;

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <RevealOnScroll direction="fade">
          <SectionHeader
            label="DECISION SIMULATOR"
            title="历史决策模拟器"
            description="在关键历史时刻做出选择，看看会发生什么"
          />
        </RevealOnScroll>

        {/* 进度统计条 */}
        {stats.total > 0 && (
          <div className="mt-6 p-4 bg-white/60 dark:bg-ink-900/60 rounded-lg border border-ink-200 dark:border-ink-700">
            <div className="flex items-center justify-between flex-wrap gap-3 text-sm">
              <div className="flex items-center gap-4 flex-wrap">
                <span>
                  已完成：<b className="text-accent">{stats.total}</b> / {SCENARIOS.length}
                </span>
                <span className="hidden md:inline text-ink-400">|</span>
                <span>
                  史 与史一致 <b className="text-accent">{stats.correct}</b>
                </span>
                <span>
                  推 平行推演 <b className="text-indigo-600 dark:text-indigo-400">{stats.alternate}</b>
                </span>
                <span>
                  败 失败 <b className="text-gray-600 dark:text-gray-400">{stats.failed}</b>
                </span>
              </div>
              <span>
                平均可信度：<b className="text-accent">{avgPlausibility}</b>
              </span>
            </div>
          </div>
        )}

        {/* 场景选择器 */}
        {state === 'intro' && (
          <RevealOnScroll direction="up" delay={200}>
            <div className="mt-8 space-y-4">
              {SCENARIOS.map((s, idx) => {
                const diff = DIFFICULTY_LABELS[s.difficulty];
                const isDone = completed[idx];
                return (
                  <button
                    key={s.id}
                    onClick={() => handleStart(idx)}
                    className="w-full p-5 bg-white/70 dark:bg-ink-900/70 rounded-xl border border-ink-200 dark:border-ink-700 hover:border-accent hover:shadow-lg transition-all text-left flex items-start gap-4 group"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 dark:bg-accent/20 flex items-center justify-center text-accent font-bold text-lg">
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 group-hover:text-accent transition-colors">
                          {s.title}
                        </h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${diff.color}`}>
                          {diff.label}
                        </span>
                        {isDone && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                            ✓ 已完成
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-ink-500 dark:text-ink-400 mb-2">
                        {s.yearDisplay} · {s.dynasty} · 扮演 {s.role}
                      </div>
                      <p className="text-sm text-ink-600 dark:text-ink-400 line-clamp-2">
                        {s.background}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </RevealOnScroll>
        )}

        {/* 抉择界面 */}
        {state === 'dilemma' && scenario && (
          <RevealOnScroll direction="fade" key={scenario.id}>
            <div className="mt-8 space-y-6">
              {/* 场景头部 */}
              <div className="p-6 bg-gradient-to-br from-accent/5 to-amber-500/5 dark:from-accent/10 dark:to-amber-700/10 rounded-xl border border-accent/20">
                <div className="flex items-center gap-3 flex-wrap mb-3">
                  <h2 className="text-2xl font-bold text-ink-900 dark:text-ink-100">
                    {scenario.title}
                  </h2>
                  <span className="text-sm text-ink-500 dark:text-ink-400">
                    {scenario.yearDisplay} · {scenario.dynasty}
                  </span>
                </div>
                <div className="text-sm text-accent font-bold">
                  你的身份：{scenario.role}
                </div>
              </div>

              {/* 背景描述 */}
              <div className="p-5 bg-white/70 dark:bg-ink-900/70 rounded-lg border border-ink-200 dark:border-ink-700">
                <h3 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-2 tracking-widest">
                  背景
                </h3>
                <p className="text-ink-800 dark:text-ink-200 leading-relaxed whitespace-pre-line">
                  {scenario.background}
                </p>
              </div>

              {/* 抉择描述 */}
              <div className="p-5 bg-amber-50/60 dark:bg-amber-900/10 rounded-lg border-l-4 border-accent">
                <h3 className="text-sm font-bold text-accent mb-2 tracking-widest">
                  择 你的抉择
                </h3>
                <p className="text-ink-800 dark:text-ink-200 leading-relaxed whitespace-pre-line">
                  {scenario.dilemma}
                </p>
              </div>

              {/* 4 个选项 */}
              <div className="space-y-3">
                {scenario.choices.map((choice, idx) => {
                  const letter = String.fromCharCode(65 + idx);
                  return (
                    <button
                      key={choice.id}
                      onClick={() => handleSelect(choice)}
                      className="w-full p-4 bg-white/70 dark:bg-ink-900/70 rounded-lg border-2 border-ink-200 dark:border-ink-700 hover:border-accent hover:bg-accent/5 dark:hover:bg-accent/10 transition-all text-left group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-ink-100 dark:bg-ink-800 group-hover:bg-accent group-hover:text-white flex items-center justify-center font-bold text-ink-700 dark:text-ink-300 transition-colors">
                          {letter}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-ink-900 dark:text-ink-100 group-hover:text-accent transition-colors mb-1">
                            {choice.text}
                          </div>
                          <div className="text-xs text-ink-500 dark:text-ink-400">
                            {choice.description}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="text-center">
                <button
                  onClick={() => setState('intro')}
                  className="text-sm text-ink-500 dark:text-ink-400 hover:text-accent transition-colors"
                >
                  ← 返回场景列表
                </button>
              </div>
            </div>
          </RevealOnScroll>
        )}

        {/* 结果界面 */}
        {state === 'result' && scenario && selectedChoice && (
          <RevealOnScroll direction="fade">
            <div className="mt-8 space-y-6">
              <ResultView scenario={scenario} choice={selectedChoice} onBranchSwitch={handleBranchSwitch} />

              {/* 操作按钮 */}
              <div className="flex flex-wrap gap-3 justify-center pt-4">
                <button
                  onClick={handleRestart}
                  className="px-6 py-3 rounded-lg border-2 border-ink-200 dark:border-ink-700 text-ink-700 dark:text-ink-300 font-bold hover:bg-ink-50 dark:hover:bg-ink-800 transition-colors"
                >
                  🔁 重新选择
                </button>
                {!isLastScenario ? (
                  <button
                    onClick={handleNext}
                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-accent to-amber-600 text-white font-bold hover:shadow-lg transition-all"
                  >
                    下一关 →
                  </button>
                ) : (
                  <Link
                    to="/"
                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-accent to-amber-600 text-white font-bold hover:shadow-lg transition-all"
                  >
                    完 全部完成，返回首页
                  </Link>
                )}
                <button
                  onClick={() => setState('intro')}
                  className="px-6 py-3 rounded-lg border-2 border-ink-200 dark:border-ink-700 text-ink-700 dark:text-ink-300 font-bold hover:bg-ink-50 dark:hover:bg-ink-800 transition-colors"
                >
                  场景列表
                </button>
              </div>
            </div>
          </RevealOnScroll>
        )}

        {/* 底部 */}
        <RevealOnScroll direction="fade" delay={400}>
          <div className="mt-12 text-center">
            <Link to="/" className="btn-secondary">
              返回首页
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}

export default SimulatorPage;
