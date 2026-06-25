/**
 * 决策树可视化 — 展示所有分支结果
 */

import type { Choice, Scenario } from '@/types/scenario';

interface OutcomeTreeProps {
  scenario: Scenario;
  selectedChoice: Choice | null;
  onChoiceClick?: (choice: Choice) => void;
}

const OUTCOME_STYLE: Record<string, { color: string; bg: string; label: string; emoji: string }> = {
  historical: { color: '#d97706', bg: '#fef3c7', label: '与史一致', emoji: '📜' },
  alternate:  { color: '#4f46e5', bg: '#e0e7ff', label: '平行推演', emoji: '🔮' },
  failed:     { color: '#6b7280', bg: '#f3f4f6', label: '失败结局', emoji: '💀' },
};

export default function OutcomeTree({ scenario, selectedChoice, onChoiceClick }: OutcomeTreeProps) {
  const choices = scenario.choices;
  const branchWidth = 200;
  const branchHeight = 180;
  const gapX = 40;
  const totalWidth = choices.length * branchWidth + (choices.length - 1) * gapX;
  const rootY = 60;
  const branchY = rootY + 120;
  const svgHeight = branchY + branchHeight + 20;

  // Root node center
  const rootCx = totalWidth / 2;

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${totalWidth} ${svgHeight}`}
        className="w-full max-w-3xl mx-auto"
        style={{ minWidth: 500 }}
      >
        {/* 标题 */}
        <text
          x={rootCx}
          y={20}
          textAnchor="middle"
          className="fill-ink-800 dark:fill-ink-200 font-bold"
          fontSize={14}
        >
          🌳 决策分支全景
        </text>

        {/* Root node */}
        <rect
          x={rootCx - 100}
          y={rootY}
          width={200}
          height={44}
          rx={12}
          className="fill-accent/10 stroke-accent"
          strokeWidth={2}
        />
        <text
          x={rootCx}
          y={rootY + 16}
          textAnchor="middle"
          className="fill-accent font-bold"
          fontSize={12}
        >
          {scenario.title}
        </text>
        <text
          x={rootCx}
          y={rootY + 32}
          textAnchor="middle"
          className="fill-ink-500 dark:fill-ink-400"
          fontSize={9}
        >
          {scenario.role} · {scenario.yearDisplay}
        </text>

        {/* Branches */}
        {choices.map((choice, idx) => {
          const style = OUTCOME_STYLE[choice.outcome];
          const isSelected = selectedChoice?.id === choice.id;
          const cx = (idx + 0.5) * branchWidth + idx * gapX;
          const branchLeft = cx - branchWidth / 2;
          const lineStartX = rootCx;
          const lineEndX = cx;

          return (
            <g key={choice.id} onClick={() => onChoiceClick?.(choice)} className={onChoiceClick ? 'cursor-pointer' : ''}>
              {/* Connection line */}
              <line
                x1={lineStartX}
                y1={rootY + 44}
                x2={lineEndX}
                y2={branchY}
                className={isSelected ? 'stroke-accent' : 'stroke-ink-300 dark:stroke-ink-600'}
                strokeWidth={isSelected ? 3 : 1.5}
                strokeDasharray={isSelected ? 'none' : '4 2'}
              />

              {/* Branch card */}
              <rect
                x={branchLeft}
                y={branchY}
                width={branchWidth}
                height={branchHeight}
                rx={10}
                fill={isSelected ? style.bg : '#ffffff'}
                className={isSelected ? '' : 'dark:fill-ink-900'}
                stroke={isSelected ? style.color : '#d1d5db'}
                strokeWidth={isSelected ? 3 : 1}
                style={{ opacity: isSelected ? 1 : 0.7 }}
              />

              {/* Letter label */}
              <circle
                cx={cx}
                cy={branchY + 18}
                r={14}
                fill={isSelected ? style.color : '#f3f4f6'}
                className={isSelected ? '' : 'dark:fill-ink-800'}
              />
              <text
                x={cx}
                y={branchY + 22}
                textAnchor="middle"
                fill={isSelected ? '#ffffff' : '#374151'}
                className={isSelected ? '' : 'dark:fill-ink-300'}
                fontSize={12}
                fontWeight="bold"
              >
                {String.fromCharCode(65 + idx)}
              </circle>

              {/* Choice text */}
              <text
                x={cx}
                y={branchY + 50}
                textAnchor="middle"
                className="fill-ink-900 dark:fill-ink-100"
                fontSize={11}
                fontWeight="bold"
              >
                {choice.text.length > 12 ? choice.text.slice(0, 12) + '…' : choice.text}
              </text>

              {/* Outcome label */}
              <rect
                x={cx - 36}
                y={branchY + 60}
                width={72}
                height={20}
                rx={10}
                fill={style.color}
                fillOpacity={0.15}
              />
              <text
                x={cx}
                y={branchY + 73}
                textAnchor="middle"
                fill={style.color}
                fontSize={10}
                fontWeight="bold"
              >
                {style.emoji} {style.label}
              </text>

              {/* Plausibility */}
              {choice.plausibility !== undefined && (
                <>
                  <text
                    x={cx}
                    y={branchY + 105}
                    textAnchor="middle"
                    className="fill-ink-500 dark:fill-ink-400"
                    fontSize={9}
                  >
                    可信度
                  </text>
                  <text
                    x={cx}
                    y={branchY + 122}
                    textAnchor="middle"
                    fill={style.color}
                    fontSize={16}
                    fontWeight="bold"
                  >
                    {choice.plausibility}
                  </text>
                  {/* Progress bar */}
                  <rect
                    x={cx - 50}
                    y={branchY + 130}
                    width={100}
                    height={6}
                    rx={3}
                    fill="#e5e7eb"
                    className="dark:fill-ink-700"
                  />
                  <rect
                    x={cx - 50}
                    y={branchY + 130}
                    width={choice.plausibility}
                    height={6}
                    rx={3}
                    fill={style.color}
                  />
                </>
              )}

              {/* Selected indicator */}
              {isSelected && (
                <text
                  x={cx}
                  y={branchY + branchHeight - 6}
                  textAnchor="middle"
                  fill={style.color}
                  fontSize={10}
                  fontWeight="bold"
                >
                  ✦ 你的选择
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* 分支详情列表 */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {choices.map((choice, idx) => {
          const style = OUTCOME_STYLE[choice.outcome];
          const isSelected = selectedChoice?.id === choice.id;
          return (
            <div
              key={choice.id}
              onClick={() => onChoiceClick?.(choice)}
              className={`p-3 rounded-lg border transition-all ${
                isSelected
                  ? `border-2 bg-white dark:bg-ink-900 shadow-md`
                  : 'border border-ink-200 dark:border-ink-700 bg-white/50 dark:bg-ink-900/50 opacity-60'
              } ${onChoiceClick ? 'cursor-pointer hover:opacity-100 hover:border-accent' : ''}`}
              style={{ borderColor: isSelected ? style.color : undefined }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-sm">{String.fromCharCode(65 + idx)}.</span>
                <span className={`text-xs px-2 py-0.5 rounded-full`} style={{ background: style.bg, color: style.color }}>
                  {style.emoji} {style.label}
                </span>
                {isSelected && <span className="text-xs text-accent font-bold">★ 已选</span>}
              </div>
              <div className="text-sm font-bold text-ink-900 dark:text-ink-100 mb-1">
                {choice.text}
              </div>
              <div className="text-xs text-ink-600 dark:text-ink-400 line-clamp-3">
                {choice.result.slice(0, 60)}…
              </div>
              {choice.plausibility !== undefined && (
                <div className="mt-2 text-xs" style={{ color: style.color }}>
                  可信度：{choice.plausibility}/100
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
