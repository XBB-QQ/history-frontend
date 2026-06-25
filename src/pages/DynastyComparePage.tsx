import { useState, useMemo } from 'react';
import { DYNASTY_METRICS, METRIC_LABELS } from '@/data/dynastyCompare';
import type { DynastyMetrics } from '@/data/dynastyCompare';

export default function DynastyComparePage() {
  const [leftId, setLeftId] = useState<string>('tang');
  const [rightId, setRightId] = useState<string>('song');

  const left = DYNASTY_METRICS.find(d => d.dynastyId === leftId)!;
  const right = DYNASTY_METRICS.find(d => d.dynastyId === rightId)!;

  const dimensions = Object.keys(METRIC_LABELS) as (keyof typeof METRIC_LABELS)[];
  const maxVal = 100;

  // SVG 雷达图参数
  const cx = 150, cy = 150, r = 120;

  function getPoint(dimIdx: number, value: number) {
    const angle = (Math.PI * 2 * dimIdx) / dimensions.length - Math.PI / 2;
    const dist = (value / maxVal) * r;
    return { x: cx + dist * Math.cos(angle), y: cy + dist * Math.sin(angle) };
  }

  const leftPoints = dimensions.map((dim, i) => getPoint(i, left[dim]));
  const rightPoints = dimensions.map((dim, i) => getPoint(i, right[dim]));
  const axisPoints = dimensions.map((_, i) => getPoint(i, maxVal));

  const leftPath = leftPoints.map(p => `${p.x},${p.y}`).join(' ');
  const rightPath = rightPoints.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <div className="min-h-screen bg-gradient-to-b from-rice to-stone-100 dark:from-ink-950 dark:to-ink-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 标题 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-ink-900 dark:text-ink-100 font-serif">
            📊 朝代雷达对比
          </h1>
          <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">
            选两个朝代，8 维度雷达图对比谁更强
          </p>
        </div>

        {/* 朝代选择 */}
        <div className="flex gap-4 mb-8 justify-center">
          <div>
            <label className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-2 block">左方朝代</label>
            <select
              value={leftId}
              onChange={e => setLeftId(e.target.value)}
              className="px-4 py-2 rounded-lg border border-ink-200 dark:border-ink-700 bg-ink-50 dark:bg-ink-800 text-ink-700 dark:text-ink-300 font-bold"
            >
              {DYNASTY_METRICS.map(d => <option key={d.dynastyId} value={d.dynastyId}>{d.dynastyName}</option>)}
            </select>
          </div>
          <div className="text-2xl font-serif font-bold text-accent self-end pb-2">VS</div>
          <div>
            <label className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-2 block">右方朝代</label>
            <select
              value={rightId}
              onChange={e => setRightId(e.target.value)}
              className="px-4 py-2 rounded-lg border border-ink-200 dark:border-ink-700 bg-ink-50 dark:bg-ink-800 text-ink-700 dark:text-ink-300 font-bold"
            >
              {DYNASTY_METRICS.map(d => <option key={d.dynastyId} value={d.dynastyId}>{d.dynastyName}</option>)}
            </select>
          </div>
        </div>

        {/* 雷达图 */}
        <div className="flex justify-center mb-8">
          <svg width="300" height="300" viewBox="0 0 300 300">
            {/* 轴线 */}
            {axisPoints.map((p, i) => (
              <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#d4c5a9" strokeWidth="1" />
            ))}
            {/* 同心圆 */}
            {[20, 40, 60, 80, 100].map pct => (
              <polygon key={pct}
                points={dimensions.map((_, i) => getPoint(i, pct).map(p => `${p.x},${p.y}`).toString()).join(' ')}
                fill="none" stroke="#d4c5a9" strokeWidth="0.5"
              />
            ))}
            {/* 左方数据 */}
            <polygon points={leftPath} fill="#c44536" fillOpacity="0.2" stroke="#c44536" strokeWidth="2" />
            {/* 右方数据 */}
            <polygon points={rightPath} fill="#4169E1" fillOpacity="0.2" stroke="#4169E1" strokeWidth="2" />
            {/* 维度标签 */}
            {dimensions.map((dim, i) => {
              const p = getPoint(i, maxVal + 15);
              return <text key={i} x={p.x} y={p.y} textAnchor="middle" fontSize="12" fill="#27231e">{METRIC_LABELS[dim]}</text>;
            })}
            {/* 数据点 */}
            {leftPoints.map((p, i) => <circle key={`l${i}`} cx={p.x} cy={p.y} r="3" fill="#c44536" />)}
            {rightPoints.map((p, i) => <circle key={`r${i}`} cx={p.x} cy={p.y} r="3" fill="#4169E1" />)}
          </svg>
        </div>

        {/* 数据对比表 */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink-200 dark:border-ink-700">
                <th className="py-3 px-4 text-left text-ink-400">维度</th>
                <th className="py-3 px-4 text-center font-bold text-red-700">{left.dynastyName}朝</th>
                <th className="py-3 px-4 text-center font-bold text-blue-700">{right.dynastyName}朝</th>
                <th className="py-3 px-4 text-center text-ink-400">差距</th>
              </tr>
            </thead>
            <tbody>
              {dimensions.map(dim => {
                const diff = left[dim] - right[dim];
                const winner = diff > 0 ? 'left' : diff < 0 ? 'right' : 'tie';
                return (
                  <tr key={dim} className="border-b border-ink-100 dark:border-ink-800">
                    <td className="py-2 px-4 font-bold text-ink-700 dark:text-ink-300">{METRIC_LABELS[dim]}</td>
                    <td className={`py-2 px-4 text-center font-bold ${winner === 'left' ? 'text-red-600' : 'text-ink-500'}`}>
                      {left[dim]}
                    </td>
                    <td className={`py-2 px-4 text-center font-bold ${winner === 'right' ? 'text-blue-600' : 'text-ink-500'}`}>
                      {right[dim]}
                    </td>
                    <td className="py-2 px-4 text-center text-ink-400">
                      {diff > 0 ? `+${diff}` : diff < 0 ? `${diff}` : '0'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* 综合评分 */}
        <div className="mt-6 p-4 rounded-xl border border-ink-200 dark:border-ink-700 flex justify-center gap-8">
          <div className="text-center">
            <div className="text-2xl font-serif font-bold text-red-700">{left.dynastyName}朝</div>
            <div className="text-sm text-ink-400">综合分</div>
            <div className="text-3xl font-bold text-red-600">
              {dimensions.reduce((sum, dim) => sum + left[dim], 0)}
            </div>
          </div>
          <div className="text-2xl font-serif font-bold text-accent">VS</div>
          <div className="text-center">
            <div className="text-2xl font-serif font-bold text-blue-700">{right.dynastyName}朝</div>
            <div className="text-sm text-ink-400">综合分</div>
            <div className="text-3xl font-bold text-blue-600">
              {dimensions.reduce((sum, dim) => sum + right[dim], 0)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
