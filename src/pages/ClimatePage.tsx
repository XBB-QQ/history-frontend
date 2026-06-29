import { useState } from 'react';
import { CLIMATE_PERIODS, generateClimateTimeSeries } from '@/data/features/climateHistory';

export default function ClimatePage() {
  const [selectedPeriod, setSelectedPeriod] = useState<number>(0);
  const series = generateClimateTimeSeries();

  const period = CLIMATE_PERIODS[selectedPeriod];

  // SVG 图表参数
  const chartWidth = 600, chartHeight = 200;
  const yearMin = -3000, yearMax = 2026;
  const tempMin = -3, tempMax = 3;

  function yearToX(year: number) {
    return ((year - yearMin) / (yearMax - yearMin)) * chartWidth;
  }
  function tempToY(temp: number) {
    return chartHeight - ((temp - tempMin) / (tempMax - tempMin)) * chartHeight;
  }

  // 生成折线
  const linePath = series.map(p => `${yearToX(p.year)},${tempToY(p.delta)}`).join(' ');

  return (
    <div className="min-h-screen bg-gradient-to-b from-rice to-stone-100 dark:from-ink-950 dark:to-ink-900 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* 标题 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-ink-900 dark:text-ink-100 font-serif">
            候 历史气候变迁
          </h1>
          <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">
            基于竺可桢研究 — 五千年温度曲线与历史兴衰的因果关联
          </p>
        </div>

        {/* 温度曲线图 */}
        <div className="mb-8 overflow-x-auto">
          <svg viewBox="0 0 {chartWidth} {chartHeight + 60}" width="100%" className="min-w-[500px]">
            {/* 0度基准线 */}
            <line x1="0" y1={tempToY(0)} x2={chartWidth} y2={tempToY(0)} stroke="#999" strokeWidth="1" strokeDasharray="4" />
            <text x="5" y={tempToY(0) - 5} fontSize="10" fill="#999">0°C（现代基准）</text>

            {/* 温度曲线 */}
            <polyline points={linePath} fill="none" stroke="#c44536" strokeWidth="2" />

            {/* 气候周期标注 */}
            {CLIMATE_PERIODS.map((p, i) => {
              const midYear = (p.startYear + p.endYear) / 2;
              const x = yearToX(midYear);
              const y = tempToY(p.temperatureDelta);
              const isWarm = p.temperatureDelta > 0;
              return (
                <g key={i} onClick={() => setSelectedPeriod(i)} className="cursor-pointer">
                  <circle cx={x} cy={y} r="8" fill={isWarm ? '#c44536' : '#4169E1'} fillOpacity="0.7" />
                  <text x={x} y={y - 15} textAnchor="middle" fontSize="10" fill="#27231e" fontWeight="bold">{p.era}</text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* 周期选择 */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {CLIMATE_PERIODS.map((p, i) => (
            <button
              key={i}
              onClick={() => setSelectedPeriod(i)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all border ${
                selectedPeriod === i
                  ? 'border-accent bg-accent text-white'
                  : p.temperatureDelta > 0
                    ? 'border-red-200 text-red-700 bg-red-50/50'
                    : 'border-blue-200 text-blue-700 bg-blue-50/50'
              }`}
            >
              {p.era}
            </button>
          ))}
        </div>

        {/* 周期详情 */}
        {period && (
          <div className="p-6 rounded-xl border-2 bg-ink-50/50 dark:bg-ink-800/50"
            style={{ borderColor: period.temperatureDelta > 0 ? '#c44536' : '#4169E1' }}>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-xl font-serif font-bold text-ink-900 dark:text-ink-100">
                {period.era}
              </h2>
              <span className={`px-3 py-1 rounded-lg text-sm font-bold ${
                period.temperatureDelta > 0 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
              }`}>
                {period.temperatureDelta > 0 ? '暖 温暖期' : '寒 寒冷期'}
                ({period.temperatureDelta > 0 ? '+' : ''}{period.temperatureDelta}°C)
              </span>
              <span className="text-sm text-ink-400">
                {period.startYear < 0 ? `前${Math.abs(period.startYear)}` : period.startYear}年 —
                {period.endYear < 0 ? `前${Math.abs(period.endYear)}` : period.endYear}年
              </span>
            </div>

            <p className="text-sm text-ink-700 dark:text-ink-300 leading-relaxed mb-4">
              {period.description}
            </p>

            <div className="p-4 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50/30 dark:bg-amber-900/20">
              <h3 className="text-sm font-bold text-amber-700 dark:text-amber-300 mb-2">对历史的影响</h3>
              <p className="text-sm text-ink-600 dark:text-ink-400 leading-relaxed">
                {period.historicalImpact}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
