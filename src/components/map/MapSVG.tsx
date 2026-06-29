// 历史地图模块 — SVG 地图可视化组件

import React, { useMemo } from 'react';
import { mapRegions, chinaOutlinePath } from '@/data/core/map-data';

interface MapSVGProps {
  highlightedRegionIds: Set<string>;
  capitalPos: [number, number] | null;
  capitalName: string;
  selectedDynastyName: string;
}

/** 将经纬度映射到 SVG 坐标 */
function lngLatToXY(lng: number, lat: number): { x: number; y: number } {
  const x = ((lng - 73) / 62) * 800;
  const y = 600 - ((lat - 18) / 36) * 600;
  return { x, y };
}

/** 根据朝代名确定主题色 */
function getDynastyColor(name: string): string {
  const colorMap: Record<string, string> = {
    '夏': '#8B7355',
    '商': '#A0522D',
    '周': '#6B8E23',
    '秦': '#4682B4',
    '西汉': '#CD853F',
    '东汉': '#B8860B',
    '唐': '#DC143C',
    '宋': '#4169E1',
    '元': '#2F4F4F',
    '明': '#8B0000',
    '清': '#B22222',
  };
  return colorMap[name] || '#C41E3A';
}

export default React.memo(function MapSVG({
  highlightedRegionIds,
  capitalPos,
  capitalName,
  selectedDynastyName,
}: MapSVGProps) {
  const dynastyColor = useMemo(() => getDynastyColor(selectedDynastyName), [selectedDynastyName]);

  return (
    <svg
      viewBox="0 0 800 600"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/*  defs: 渐变和滤镜 */}
      <defs>
        <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={dynastyColor} stopOpacity="0.15" />
          <stop offset="100%" stopColor={dynastyColor} stopOpacity="0" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* 背景发光效果 */}
      <circle cx="400" cy="300" r="300" fill="url(#mapGlow)" />

      {/* 中国地图完整轮廓 */}
      <path
        d={chinaOutlinePath()}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-ink-200"
        opacity="0.4"
      />

      {/* 南海诸岛小框 */}
      <g opacity="0.3">
        <rect x="620" y="440" width="120" height="100" rx="4" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-ink-300" />
        <text x="680" y="435" textAnchor="middle" className="text-ink-300" fontSize="8" fill="currentColor">南海诸岛</text>
      </g>

      {/* 所有省份区域 */}
      {mapRegions.map((region) => {
        const isHighlighted = highlightedRegionIds.has(region.id);
        return (
          <g key={region.id}>
            <path
              d={region.path}
              fill={isHighlighted ? dynastyColor : 'currentColor'}
              fillOpacity={isHighlighted ? 0.35 : 0.05}
              stroke={isHighlighted ? dynastyColor : 'currentColor'}
              strokeWidth={isHighlighted ? 2 : 0.5}
              className={`transition-all duration-700 ${isHighlighted ? 'text-ink-700 dark:text-ink-300' : 'text-ink-200 dark:text-ink-600'}`}
            />
            {/* 区域名称标注（仅高亮区域显示） */}
            {isHighlighted && (
              <text
                x={lngLatToXY(region.center[0], region.center[1]).x}
                y={lngLatToXY(region.center[0], region.center[1]).y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-ink-800 dark:text-ink-200 font-bold"
                fontSize="11"
                fill="currentColor"
                opacity="0.8"
              >
                {region.name}
              </text>
            )}
          </g>
        );
      })}

      {/* 都城标记 */}
      {capitalPos && (
        <g filter="url(#glow)">
          <circle
            cx={lngLatToXY(capitalPos[0], capitalPos[1]).x}
            cy={lngLatToXY(capitalPos[0], capitalPos[1]).y}
            r="6"
            fill={dynastyColor}
            opacity="0.8"
          >
            <animate attributeName="r" values="5;8;5" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;0.4;0.8" dur="2s" repeatCount="indefinite" />
          </circle>
          <text
            x={lngLatToXY(capitalPos[0], capitalPos[1]).x}
            y={lngLatToXY(capitalPos[0], capitalPos[1]).y - 12}
            textAnchor="middle"
            className="text-ink-900 font-bold"
            fontSize="12"
            fill="currentColor"
          >
            ★ {capitalName}
          </text>
        </g>
      )}

      {/* 朝代信息叠加层 */}
      <g>
        <rect x="16" y="16" width="200" height="44" rx="8" fill="currentColor" fillOpacity="0.9" className="text-paper" />
        <text x="28" y="36" className="text-ink-900" fontSize="14" fontWeight="bold" fill="currentColor">
          {selectedDynastyName}
        </text>
        <text x="28" y="52" className="text-ink-500" fontSize="10" fill="currentColor">
          {selectedDynastyName} · 疆域示意图
        </text>
      </g>
    </svg>
  );
}
);
