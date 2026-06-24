/**
 * 维度雷达图组件
 * SVG 绘制四维度菱形图
 */

import type { DimensionScore } from '@/utils/profileReport';
import { DIMENSION_LABELS } from '@/data/personalityMatches';

interface DimensionRadarProps {
  dimensions: DimensionScore[];
  size?: number;
}

export default function DimensionRadar({
  dimensions,
  size = 240,
}: DimensionRadarProps) {
  const center = size / 2;
  const radius = size * 0.38;
  // 4 个维度分布在上下左右
  const angles = [-Math.PI / 2, 0, Math.PI / 2, Math.PI]; // 上右下左

  // 计算每个维度的坐标
  const points = dimensions.map((d, i) => {
    const angle = angles[i];
    const r = (d.normalized / 100) * radius;
    return {
      x: center + Math.cos(angle) * r,
      y: center + Math.sin(angle) * r,
      labelX: center + Math.cos(angle) * (radius + 20),
      labelY: center + Math.sin(angle) * (radius + 20),
      dim: d,
    };
  });

  // 多边形 path
  const polygonPath = points.map((p) => `${p.x},${p.y}`).join(' ');

  // 背景网格圆（25%, 50%, 75%, 100%）
  const gridLevels = [0.25, 0.5, 0.75, 1.0];

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="mx-auto"
      aria-label="维度雷达图"
    >
      {/* 背景网格 */}
      {gridLevels.map((level) => {
        const r = radius * level;
        const gridPoints = angles
          .map((a) => `${center + Math.cos(a) * r},${center + Math.sin(a) * r}`)
          .join(' ');
        return (
          <polygon
            key={level}
            points={gridPoints}
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.15}
            strokeWidth={1}
            className="text-ink-400"
          />
        );
      })}

      {/* 轴线 */}
      {angles.map((a, i) => (
        <line
          key={i}
          x1={center}
          y1={center}
          x2={center + Math.cos(a) * radius}
          y2={center + Math.sin(a) * radius}
          stroke="currentColor"
          strokeOpacity={0.2}
          strokeWidth={1}
          className="text-ink-400"
        />
      ))}

      {/* 数据多边形 */}
      <polygon
        points={polygonPath}
        fill="currentColor"
        fillOpacity={0.2}
        stroke="currentColor"
        strokeWidth={2}
        className="text-accent"
      />

      {/* 数据点 */}
      {points.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={4}
          fill="currentColor"
          className="text-accent"
        />
      ))}

      {/* 维度标签 */}
      {points.map((p, i) => (
        <g key={i}>
          <text
            x={p.labelX}
            y={p.labelY}
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-xs font-bold fill-current text-ink-800 dark:text-ink-200"
            style={{ fontSize: '14px' }}
          >
            {DIMENSION_LABELS[p.dim.key]}
          </text>
          <text
            x={p.labelX}
            y={p.labelY + 16}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-current text-accent"
            style={{ fontSize: '12px', fontWeight: 'bold' }}
          >
            {p.dim.normalized}
          </text>
        </g>
      ))}
    </svg>
  );
}
