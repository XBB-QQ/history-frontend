// 历史地图模块 — SVG 地图可视化组件
// viewBox: 0 0 1000 600（5:3 比例，接近中国实际经纬度跨度比 1.72）

import React, { useMemo, useState } from 'react';
import {
  mapRegions,
  chinaOutlinePath,
  lngLatToXY,
  yellowRiverPath,
  yangtzeRiverPath,
  greatWallPath,
  keyCities,
  getRegionAlias,
} from '@/data/core/map-data';

interface MapSVGProps {
  highlightedRegionIds: Set<string>;
  capitalPos: [number, number] | null;
  capitalName: string;
  selectedDynastyName: string;
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
  const [hoverRegion, setHoverRegion] = useState<{ name: string; ancientName: string; x: number; y: number } | null>(null);

  return (
    <svg
      viewBox="0 0 1000 600"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={dynastyColor} stopOpacity="0.15" />
          <stop offset="100%" stopColor={dynastyColor} stopOpacity="0" />
        </radialGradient>
        {/* 朝代疆域渐变填色 */}
        <radialGradient id="dynastyFill" cx="50%" cy="45%" r="65%">
          <stop offset="0%" stopColor={dynastyColor} stopOpacity="0.55" />
          <stop offset="100%" stopColor={dynastyColor} stopOpacity="0.2" />
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
      <circle cx="500" cy="300" r="350" fill="url(#mapGlow)" />

      {/* 中国地图完整轮廓 */}
      <path
        d={chinaOutlinePath()}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-ink-200"
        opacity="0.4"
      />

      {/* 长城（虚线，砖石感） */}
      <path
        d={greatWallPath()}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeDasharray="5,2"
        className="text-ink-400 dark:text-ink-500"
        opacity="0.55"
        strokeLinecap="round"
      />

      {/* 黄河 */}
      <path
        d={yellowRiverPath()}
        fill="none"
        stroke="#3B82F6"
        strokeWidth="2"
        opacity="0.55"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* 长江（更深更粗） */}
      <path
        d={yangtzeRiverPath()}
        fill="none"
        stroke="#1E40AF"
        strokeWidth="2.5"
        opacity="0.55"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 所有省份区域 */}
      {mapRegions.map((region) => {
        const isHighlighted = highlightedRegionIds.has(region.id);
        const center = lngLatToXY(region.center[0], region.center[1]);
        const isHover = hoverRegion?.name === region.name;
        const ancientName = getRegionAlias(selectedDynastyName, region.id, region.aliases, region.name);
        return (
          <g
            key={region.id}
            onMouseEnter={() => setHoverRegion({ name: region.name, ancientName, x: center.x, y: center.y })}
            onMouseLeave={() => setHoverRegion(null)}
            className="cursor-pointer"
          >
            <path
              d={region.path}
              fill={isHighlighted ? 'url(#dynastyFill)' : 'currentColor'}
              fillOpacity={isHighlighted ? 1 : isHover ? 0.2 : 0.05}
              stroke={isHighlighted ? dynastyColor : 'currentColor'}
              strokeWidth={isHighlighted ? 2 : isHover ? 1.2 : 0.5}
              className={`transition-all duration-700 ${
                isHighlighted
                  ? 'text-ink-700 dark:text-ink-300'
                  : 'text-ink-200 dark:text-ink-600'
              }`}
            />
            {/* 古名标注：高亮区域大字粗体，非高亮区域小字暗色 */}
            <text
              x={center.x}
              y={center.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className={`pointer-events-none transition-all duration-500 ${
                isHighlighted
                  ? 'text-ink-900 dark:text-ink-100 font-bold'
                  : 'text-ink-400 dark:text-ink-500'
              }`}
              fontSize={isHighlighted ? 12 : 9}
              fill="currentColor"
              opacity={isHighlighted ? 0.95 : isHover ? 0.85 : 0.55}
            >
              {ancientName}
            </text>
          </g>
        );
      })}

      {/* 关键历史城市（永久标记） */}
      {keyCities.map((city) => {
        const pos = lngLatToXY(city.pos[0], city.pos[1]);
        const isCapital = capitalPos && capitalPos[0] === city.pos[0] && capitalPos[1] === city.pos[1];
        return (
          <g key={city.name} className="pointer-events-none">
            {/* 城市标记：菱形（旋转 45° 的小方块） */}
            <rect
              x={pos.x - 3}
              y={pos.y - 3}
              width="6"
              height="6"
              transform={`rotate(45 ${pos.x} ${pos.y})`}
              fill={isCapital ? dynastyColor : 'currentColor'}
              stroke="white"
              strokeWidth="1"
              className="text-ink-500 dark:text-ink-400"
              opacity="0.85"
            />
            {/* 城市名标签（非都城显示，都城用专门标记） */}
            {!isCapital && (
              <text
                x={pos.x + 7}
                y={pos.y - 6}
                className="text-ink-600 dark:text-ink-300"
                fontSize="10"
                fill="currentColor"
              >
                {city.name}
              </text>
            )}
          </g>
        );
      })}

      {/* 都城标记（多层环纹 + 脉冲） */}
      {capitalPos && (
        <g filter="url(#glow)" className="pointer-events-none">
          {(() => {
            const pos = lngLatToXY(capitalPos[0], capitalPos[1]);
            return (
              <>
                {/* 外环：脉冲扩散 */}
                <circle cx={pos.x} cy={pos.y} r="14" fill="none" stroke={dynastyColor} strokeWidth="1.5" opacity="0.5">
                  <animate attributeName="r" values="10;18;10" dur="2.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.6;0;0.6" dur="2.5s" repeatCount="indefinite" />
                </circle>
                {/* 中环 */}
                <circle cx={pos.x} cy={pos.y} r="9" fill="none" stroke={dynastyColor} strokeWidth="1.5" opacity="0.75">
                  <animate attributeName="r" values="7;10;7" dur="2s" repeatCount="indefinite" />
                </circle>
                {/* 实心点 */}
                <circle cx={pos.x} cy={pos.y} r="4.5" fill={dynastyColor} opacity="0.95" />
                {/* 中心高光 */}
                <circle cx={pos.x} cy={pos.y} r="1.5" fill="white" opacity="0.85" />
                {/* 都城名标签（带背景） */}
                <g transform={`translate(${pos.x + 10}, ${pos.y - 10})`}>
                  <rect x="-2" y="-9" width={capitalName.length * 12 + 10} height="14" rx="3" fill="currentColor" className="text-paper" fillOpacity="0.92" />
                  <text x="3" y="2" fontSize="11" fontWeight="bold" fill={dynastyColor}>
                    ★ {capitalName}
                  </text>
                </g>
              </>
            );
          })()}
        </g>
      )}

      {/* 南海诸岛小框（美化版） */}
      <g opacity="0.5">
        <rect
          x="850"
          y="440"
          width="130"
          height="110"
          rx="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeDasharray="3,2"
          className="text-ink-300 dark:text-ink-500"
        />
        <text x="915" y="435" textAnchor="middle" className="text-ink-400 dark:text-ink-500" fontSize="9" fill="currentColor">
          南海诸岛
        </text>
        {/* 岛屿点（示意） */}
        {[[880, 470], [910, 490], [940, 475], [895, 510], [930, 525], [870, 500]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.6" fill="currentColor" className="text-ink-400 dark:text-ink-500" />
        ))}
      </g>

      {/* 朝代信息卡（印章风格，左下角；每次朝代切换重新 mount 触发 sealStamp 动画） */}
      <g
        key={selectedDynastyName}
        className="pointer-events-none"
        style={{ animation: 'sealStamp 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)', transformBox: 'fill-box', transformOrigin: 'center' }}
      >
        {(() => {
          const sealX = 60;
          const sealY = 540;
          const sealR = 30;
          return (
            <>
              {/* 印章背景圆 */}
              <circle cx={sealX} cy={sealY} r={sealR} fill={dynastyColor} opacity="0.92" />
              {/* 印章双环 */}
              <circle cx={sealX} cy={sealY} r={sealR} fill="none" stroke="white" strokeWidth="1.5" opacity="0.65" />
              <circle cx={sealX} cy={sealY} r={sealR - 4} fill="none" stroke="white" strokeWidth="0.8" opacity="0.45" />
              {/* 印章文字（朝代名首字） */}
              <text
                x={sealX}
                y={sealY + 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="22"
                fontWeight="bold"
                fill="white"
              >
                {selectedDynastyName.charAt(0)}
              </text>
              {/* 朝代全名 + 都城 */}
              <text x={sealX + sealR + 8} y={sealY - 6} fontSize="16" fontWeight="bold" fill="currentColor" className="text-ink-900 dark:text-ink-100">
                {selectedDynastyName}
              </text>
              <text x={sealX + sealR + 8} y={sealY + 12} fontSize="10" fill="currentColor" className="text-ink-500 dark:text-ink-400">
                {capitalName ? `都城 · ${capitalName}` : '疆域示意图'}
              </text>
            </>
          );
        })()}
      </g>

      {/* hover 省份气泡：古名 → 现代名 对照 */}
      {hoverRegion && (
        <g className="pointer-events-none">
          {(() => {
            const x = hoverRegion.x;
            // 气泡放在省份中心上方 28px
            const bubbleY = hoverRegion.y - 28;
            // 气泡宽度：取古名和现代名中较长的 + 边距
            const maxLen = Math.max(hoverRegion.ancientName.length, hoverRegion.name.length);
            const textW = Math.max(80, maxLen * 14 + 24);
            const isSameName = hoverRegion.ancientName === hoverRegion.name;
            return (
              <>
                {/* 气泡背景：双行高度，若古名=现代名则单行 */}
                <rect
                  x={x - textW / 2}
                  y={bubbleY - (isSameName ? 12 : 22)}
                  width={textW}
                  height={isSameName ? 18 : 38}
                  rx="4"
                  fill="currentColor"
                  className="text-ink-900 dark:text-ink-700"
                  fillOpacity="0.95"
                />
                {/* 第一行：古名（粗体白色） */}
                <text
                  x={x}
                  y={bubbleY - (isSameName ? 1 : 9)}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="bold"
                  fill={dynastyColor}
                >
                  {hoverRegion.ancientName}
                </text>
                {/* 第二行：今：现代名（小字浅色） */}
                {!isSameName && (
                  <text
                    x={x}
                    y={bubbleY + 8}
                    textAnchor="middle"
                    fontSize="10"
                    fill="white"
                    opacity="0.85"
                  >
                    今 · {hoverRegion.name}
                  </text>
                )}
                {/* 气泡指向小三角 */}
                <polygon
                  points={`${x - 4},${bubbleY + 11} ${x + 4},${bubbleY + 11} ${x},${bubbleY + 16}`}
                  fill="currentColor"
                  className="text-ink-900 dark:text-ink-700"
                  fillOpacity="0.95"
                />
              </>
            );
          })()}
        </g>
      )}
    </svg>
  );
});
