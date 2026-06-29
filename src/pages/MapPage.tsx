// 历史地图模块 — 页面组件

import { useState, useMemo } from 'react';
import MapSVG from '@/components/map/MapSVG';
import { dynastyMapData } from '@/data/core/map-data';
import RevealOnScroll from '@/components/common/RevealOnScroll';

/** 朝代信息卡片 */
interface DynastyInfo {
  name: string;
  period: string;
  capital: string;
  regionCount: number;
  color: string;
}

/** 按年代排序的朝代列表（公元前为负数） */
const dynastyOrder: Record<string, number> = {
  '夏': -2070,
  '商': -1600,
  '周': -1046,
  '秦': -221,
  '西汉': -202,
  '东汉': 25,
  '唐': 618,
  '宋': 960,
  '元': 1271,
  '明': 1368,
  '清': 1644,
};

function getDynastyInfo(name: string): DynastyInfo {
  const data = dynastyMapData.find((d) => d.dynastyName === name);
  if (!data) {
    return { name, period: '', capital: '', regionCount: 0, color: '#C41E3A' };
  }
  return {
    name,
    period: data.period,
    capital: data.capitalName,
    regionCount: data.regionIds.length,
    color: getDynastyColor(name),
  };
}

function getDynastyColor(name: string): string {
  const colors: Record<string, string> = {
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
  return colors[name] || '#C41E3A';
}

export default function MapPage() {
  const [selectedDynasty, setSelectedDynasty] = useState('唐');

  const sortedDynasties = useMemo(
    () =>
      [...dynastyMapData].sort(
        (a, b) => (dynastyOrder[a.dynastyName] ?? 0) - (dynastyOrder[b.dynastyName] ?? 0)
      ),
    [],
  );

  const currentData = dynastyMapData.find((d) => d.dynastyName === selectedDynasty);
  const highlightedIds = useMemo(
    () => new Set(currentData?.regionIds ?? []),
    [currentData],
  );

  const info = getDynastyInfo(selectedDynasty);

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* 页面标题 */}
        <RevealOnScroll direction="fade">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-ink-900 mb-2">
              中国历史疆域图
            </h1>
            <p className="text-ink-500 text-sm">
              点击下方朝代时间线，查看历代疆域变迁
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 左侧：地图 */}
          <div className="lg:col-span-3">
            <RevealOnScroll direction="scale" threshold={0.1}>
              <div className="bg-white/60 dark:bg-ink-900/60 rounded-2xl shadow-lg p-4 border border-ink-100 dark:border-ink-700">
                <div className="aspect-[4/3]">
                  <MapSVG
                    highlightedRegionIds={highlightedIds}
                    capitalPos={currentData ? [currentData.capitalPos[0], currentData.capitalPos[1]] : null}
                    capitalName={currentData?.capitalName ?? ''}
                    selectedDynastyName={selectedDynasty}
                  />
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* 右侧：朝代信息 + 时间线 */}
          <div className="lg:col-span-1 space-y-4">
            {/* 选中朝代信息卡 */}
            <RevealOnScroll direction="left">
              <div
                className="bg-white/80 dark:bg-ink-800/80 rounded-2xl shadow-lg p-5 border border-ink-100 dark:border-ink-600"
                style={{ borderTopColor: info.color }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md"
                    style={{ backgroundColor: info.color }}
                  >
                    {info.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-ink-900">{info.name}</h3>
                    <p className="text-xs text-ink-500">{info.period}</p>
                  </div>
                </div>
                <dl className="text-sm space-y-2 text-ink-700">
                  <div className="flex justify-between">
                    <dt className="text-ink-400">都城</dt>
                    <dd className="font-medium">{info.capital}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-ink-400">辖域</dt>
                    <dd className="font-medium">{info.regionCount} 个区域</dd>
                  </div>
                </dl>
              </div>
            </RevealOnScroll>

            {/* 朝代时间线选择器 */}
            <RevealOnScroll direction="left" delay={100}>
              <div className="bg-white/60 dark:bg-ink-900/60 rounded-2xl shadow-lg p-4 border border-ink-100 dark:border-ink-700 max-h-[400px] overflow-y-auto">
                <h4 className="text-xs font-bold text-ink-400 dark:text-ink-500 uppercase tracking-wider mb-3 sticky top-0 bg-white/90 dark:bg-ink-800/90 py-2 -mt-2">
                  朝代年表
                </h4>
                <div className="space-y-1 relative">
                  {/* 连接线 */}
                  <div className="absolute left-3.5 top-2 bottom-2 w-px bg-ink-200 dark:bg-ink-700" />
                  {sortedDynasties.map((d) => {
                    const isSelected = d.dynastyName === selectedDynasty;
                    const color = getDynastyColor(d.dynastyName);
                    return (
                      <button
                        key={d.dynastyName}
                        onClick={() => setSelectedDynasty(d.dynastyName)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-300 relative flex items-center gap-3
                          ${isSelected ? 'bg-ink-100 dark:bg-ink-800 shadow-sm' : 'hover:bg-ink-50 dark:hover:bg-ink-800/50'}`}
                      >
                        {/* 时间点 */}
                        <span
                          className={`w-3 h-3 rounded-full flex-shrink-0 ring-2 ring-offset-2 transition-all duration-300 ${
                            isSelected ? 'ring-offset-white' : 'ring-transparent'
                          }`}
                          style={{
                            backgroundColor: isSelected ? color : '#d1d5db',
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className={`font-bold ${isSelected ? 'text-ink-900 dark:text-ink-100' : 'text-ink-600 dark:text-ink-400'}`}>
                            {d.dynastyName}
                          </div>
                          <div className="text-xs text-ink-400 truncate">{d.period}</div>
                        </div>
                        {isSelected && (
                          <span
                            className="text-xs px-2 py-0.5 rounded-full text-white font-medium flex-shrink-0"
                            style={{ backgroundColor: color }}
                          >
                            今
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>

        {/* 底部说明 */}
        <RevealOnScroll direction="fade" delay={200}>
          <div className="mt-8 text-center text-xs text-ink-300">
            <p>注：地图为示意性质，使用简化区域轮廓展示各朝代大致疆域范围，非精确地理边界。</p>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
