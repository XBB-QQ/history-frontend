/**
 * 决策结果展示 — 含分享卡片 & 决策树入口
 */

import { useState } from 'react';
import type { Choice, Scenario } from '@/types/scenario';
import OutcomeTree from '@/components/simulator/OutcomeTree';
import ShareCard from '@/components/simulator/ShareCard';

interface ResultViewProps {
  scenario: Scenario;
  choice: Choice;
  onBranchSwitch?: (choice: Choice) => void;
}

const OUTCOME_LABELS: Record<string, { label: string; emoji: string; color: string }> = {
  historical: { label: '与历史一致', emoji: '📜', color: 'text-accent border-accent' },
  alternate: { label: '平行推演', emoji: '🔮', color: 'text-indigo-600 dark:text-indigo-400 border-indigo-500' },
  failed: { label: '失败结局', emoji: '💀', color: 'text-gray-600 dark:text-gray-400 border-gray-500' },
};

export default function ResultView({ scenario, choice, onBranchSwitch }: ResultViewProps) {
  const outcome = OUTCOME_LABELS[choice.outcome];
  const [showTree, setShowTree] = useState(false);

  return (
    <div className="space-y-6">
      {/* 结局类型标签 */}
      <div className="text-center">
        <div
          className={`inline-block px-6 py-2 rounded-full border-2 ${outcome.color} bg-paper dark:bg-ink-950`}
        >
          <span className="text-2xl mr-2">{outcome.emoji}</span>
          <span className="font-bold">{outcome.label}</span>
        </div>
      </div>

      {/* 你的选择 */}
      <div className="p-5 bg-white/70 dark:bg-ink-900/70 rounded-lg border border-ink-200 dark:border-ink-700">
        <h3 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-2 tracking-widest">
          你的选择
        </h3>
        <div className="font-bold text-ink-900 dark:text-ink-100 mb-2">
          {choice.text}
        </div>
        <p className="text-sm text-ink-600 dark:text-ink-400">
          {choice.description}
        </p>
      </div>

      {/* 结果 */}
      <div className="p-5 bg-gradient-to-br from-ink-50/80 to-amber-50/40 dark:from-ink-900/80 dark:to-amber-900/10 rounded-lg border-l-4 border-ink-400 dark:border-ink-600">
        <h3 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-2 tracking-widest">
          📖 结局
        </h3>
        <p className="text-ink-800 dark:text-ink-200 leading-loose whitespace-pre-line">
          {choice.result}
        </p>
      </div>

      {/* 平行推演 */}
      {choice.alternateTimeline && (
        <div className="p-5 bg-indigo-50/60 dark:bg-indigo-900/10 rounded-lg border-l-4 border-indigo-500">
          <h3 className="text-sm font-bold text-indigo-700 dark:text-indigo-400 mb-2 tracking-widest">
            🔮 平行推演
          </h3>
          <p className="text-ink-800 dark:text-ink-200 leading-loose whitespace-pre-line">
            {choice.alternateTimeline}
          </p>
        </div>
      )}

      {/* 可信度评分 */}
      {choice.plausibility !== undefined && (
        <div className="p-4 bg-amber-50/60 dark:bg-amber-900/10 rounded-lg text-center">
          <div className="text-xs text-amber-700 dark:text-amber-400 tracking-widest mb-1">
            历史可信度
          </div>
          <div className="text-3xl font-bold text-amber-700 dark:text-amber-400">
            {choice.plausibility}
            <span className="text-sm text-ink-400">/100</span>
          </div>
        </div>
      )}

      {/* 真实历史 */}
      <div className="p-5 bg-accent/5 dark:bg-accent/10 rounded-lg border-l-4 border-accent">
        <h3 className="text-sm font-bold text-accent mb-2 tracking-widest">
          📜 真实历史
        </h3>
        <p className="text-ink-800 dark:text-ink-200 leading-loose whitespace-pre-line">
          {scenario.historicalResult}
        </p>
      </div>

      {/* 历史教训 */}
      <div className="p-5 bg-gradient-to-br from-amber-500/10 to-accent/10 dark:from-amber-700/15 dark:to-accent/15 rounded-lg">
        <h3 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-2 tracking-widest">
          💡 历史教训
        </h3>
        <p className="text-ink-800 dark:text-ink-200 leading-loose italic">
          {scenario.lesson}
        </p>
      </div>

      {/* 决策树切换 */}
      <div className="text-center">
        <button
          onClick={() => setShowTree(!showTree)}
          className={`px-5 py-2 rounded-lg font-bold text-sm transition-all ${
            showTree
              ? 'bg-accent text-white shadow-lg'
              : 'bg-ink-100 dark:bg-ink-800 text-ink-700 dark:text-ink-300 hover:bg-accent hover:text-white'
          }`}
        >
          {showTree ? '🌳 收起决策树' : '🌳 查看所有分支'}
        </button>
      </div>

      {/* 决策树 */}
      {showTree && (
        <div className="p-5 bg-white/70 dark:bg-ink-900/70 rounded-xl border border-ink-200 dark:border-ink-700">
          <OutcomeTree
            scenario={scenario}
            selectedChoice={choice}
            onChoiceClick={onBranchSwitch}
          />
        </div>
      )}

      {/* 分享卡片 */}
      <div className="p-4 bg-ink-50/50 dark:bg-ink-900/30 rounded-lg border border-ink-200 dark:border-ink-700">
        <h3 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-3 tracking-widest text-center">
          📤 分享你的决策
        </h3>
        <ShareCard scenario={scenario} choice={choice} />
      </div>
    </div>
  );
}
