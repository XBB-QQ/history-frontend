/**
 * 姓氏迁徙地图组件 — 在真实中国地图轮廓上绘制姓氏迁徙路径
 * 使用 chinaOutlinePath + lngLatToXY 正确转换坐标
 * 使用 SMIL 动画实现路径流动效果与节点脉冲
 */

import { useMemo } from 'react';
import { chinaOutlinePath, lngLatToXY } from '@/data/core/map-data';
import type { SurnameMigrationNode } from '@/data/features/surnameData';
import { useT } from '@/i18n/i18n';

interface SurnameMigrationMapProps {
  migration: SurnameMigrationNode[];
  originPlace: { name: string; lng: number; lat: number };
}

/** 构造迁徙路径的 SVG path 字符串 */
function buildMigrationPath(nodes: SurnameMigrationNode[]): string {
  if (nodes.length === 0) return '';
  const points = nodes.map(n => {
    const { x, y } = lngLatToXY(n.lng, n.lat);
    return `${x},${y}`;
  });
  return `M${points.join(' L')}`;
}

export default function SurnameMigrationMap({ migration, originPlace }: SurnameMigrationMapProps) {
  const t = useT();

  const migrationPath = useMemo(() => buildMigrationPath(migration), [migration]);
  const originXY = useMemo(() => lngLatToXY(originPlace.lng, originPlace.lat), [originPlace]);

  return (
    <svg
      viewBox="0 0 800 600"
      className="w-full h-auto"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* 路径箭头标记 */}
        <marker
          id="surname-arrow"
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L0,6 L9,3 z" fill="#f59e0b" />
        </marker>

        {/* 发源地光晕滤镜 */}
        <filter id="origin-glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* 中国地图完整轮廓 */}
      <path
        d={chinaOutlinePath()}
        fill="none"
        stroke="#94a3b8"
        strokeWidth="1.5"
        opacity="0.5"
      />

      {/* 南海诸岛示意框 */}
      <g opacity="0.3">
        <rect x="620" y="440" width="120" height="100" rx="4" fill="none" stroke="#94a3b8" strokeWidth="0.5" />
        <text x="680" y="435" textAnchor="middle" fontSize="8" fill="#94a3b8">南海诸岛</text>
      </g>

      {/* 迁徙路径（带流动动画） */}
      {migration.length > 1 && (
        <path
          d={migrationPath}
          fill="none"
          stroke="#f59e0b"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="8 4"
          markerEnd="url(#surname-arrow)"
          opacity="0.85"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-24"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </path>
      )}

      {/* 发源地标记（绿色脉冲） */}
      <g filter="url(#origin-glow)">
        <circle
          cx={originXY.x}
          cy={originXY.y}
          r="7"
          fill="#10b981"
          stroke="white"
          strokeWidth="2"
        >
          <animate
            attributeName="r"
            values="6;9;6"
            dur="2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="1;0.6;1"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
        <text
          x={originXY.x}
          y={originXY.y - 14}
          textAnchor="middle"
          fontSize="11"
          fontWeight="bold"
          fill="#10b981"
          stroke="white"
          strokeWidth="0.4"
          paintOrder="stroke"
        >
          {originPlace.name}
        </text>
      </g>

      {/* 迁徙节点（黄色 / 终点红色） */}
      {migration.map((node, idx) => {
        const { x, y } = lngLatToXY(node.lng, node.lat);
        const isLast = idx === migration.length - 1;
        const isMiddle = idx > 0 && idx < migration.length - 1;
        const color: string | undefined = isLast ? '#ef4444' : isMiddle ? '#f59e0b' : undefined;

        // 第一个节点即发源地，已在上方渲染，这里跳过避免重叠
        if (idx === 0) return null;

        return (
          <g key={`${node.name}-${idx}`}>
            <circle
              cx={x}
              cy={y}
              r="6"
              fill={color}
              stroke="white"
              strokeWidth="2"
            >
              {isLast && (
                <animate
                  attributeName="r"
                  values="5;8;5"
                  dur="2s"
                  repeatCount="indefinite"
                />
              )}
            </circle>
            <text
              x={x}
              y={y - 12}
              textAnchor="middle"
              fontSize="10"
              fontWeight="bold"
              fill={color || '#10b981'}
              stroke="white"
              strokeWidth="0.3"
              paintOrder="stroke"
            >
              {node.name}
            </text>
            <text
              x={x}
              y={y + 18}
              textAnchor="middle"
              fontSize="8"
              fill="#64748b"
            >
              {node.period}
            </text>
          </g>
        );
      })}

      {/* 图例 */}
      <g transform="translate(20, 560)">
        <circle cx="0" cy="0" r="5" fill="#10b981" stroke="white" strokeWidth="1.5" />
        <text x="10" y="4" fontSize="10" fill="#475569">{t('surnameMap.originLabel')}</text>

        <circle cx="100" cy="0" r="5" fill="#f59e0b" stroke="white" strokeWidth="1.5" />
        <text x="110" y="4" fontSize="10" fill="#475569">{t('surnameMap.migrationNode')}</text>

        <circle cx="220" cy="0" r="5" fill="#ef4444" stroke="white" strokeWidth="1.5" />
        <text x="230" y="4" fontSize="10" fill="#475569">{t('surnameMap.currentResidence')}</text>
      </g>
    </svg>
  );
}
