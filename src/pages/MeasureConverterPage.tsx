/**
 * 历史度量衡换算器
 * @see ITERATIONS.md #95
 */

import { useState, useMemo, useCallback } from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import { MEASURE_CATEGORIES, ALL_UNITS } from '@/data/features/measureUnits';
import { convertMeasure, formatResult, getConversionOptions, findUnit } from '@/utils/measureConverter';
import { useT } from '@/i18n/i18n';

export default function MeasureConverterPage() {
  const t = useT();
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');
  const [value, setValue] = useState('1');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const numericValue = parseFloat(value) || 0;

  /* 当前选择的单位 */
  const fromData = useMemo(() => findUnit(fromUnit), [fromUnit]);
  const toData = useMemo(() => findUnit(toUnit), [toUnit]);

  /* 换算结果 */
  const result = useMemo(() => {
    if (!fromUnit || !toUnit) return null;
    const num = convertMeasure(numericValue, fromUnit, toUnit);
    if (num === null) return null;
    return formatResult(num, toData?.name || '');
  }, [fromUnit, toUnit, numericValue, toData]);

  /* 按类别过滤的源单位列表 */
  const fromOptions = useMemo(() => {
    if (selectedCategory === 'all') return ALL_UNITS;
    return ALL_UNITS.filter(u => u.category === selectedCategory);
  }, [selectedCategory]);

  /* 目标单位列表（排除已选的源单位） */
  const toOptions = useMemo(() => {
    if (!fromUnit) return [];
    return getConversionOptions(fromUnit);
  }, [fromUnit]);

  /* 快速设置：同类别推荐 */
  const handleFromChange = useCallback((id: string) => {
    setFromUnit(id);
    const unit = findUnit(id);
    if (unit) {
      // 自动选择同类别的其他单位作为目标
      const sameCat = ALL_UNITS.find((u: any) => u.category === (unit as any).category && u.id !== id);
      if (sameCat) setToUnit(sameCat.id);
    }
  }, []);

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 头部 */}
        <RevealOnScroll>
          <SectionHeader
            label="ANCIENT MEASUREMENT"
            title={t('measureConverter.title')}
            description={t('measureConverter.description')}
          />
        </RevealOnScroll>

        {/* 换算器主体 */}
        <RevealOnScroll delay={100}>
          <div className="mt-8 bg-white dark:bg-ink-900 rounded-2xl border-2 border-ink-200 dark:border-ink-700 p-6 md:p-8 shadow-lg">
            {/* 类别选择 */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-accent text-white'
                    : 'bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-400'
                }`}
              >
                {t('measureConverter.all')}
              </button>
              {MEASURE_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-accent text-white'
                      : 'bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-400'
                  }`}
                >
                  {cat.emoji} {cat.name}
                </button>
              ))}
            </div>

            {/* 数值输入 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-ink-600 dark:text-ink-400 mb-2">{t('measureConverter.valueLabel')}</label>
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="input-field text-2xl font-bold"
                placeholder={t('measureConverter.valuePlaceholder')}
              />
            </div>

            {/* 源单位 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-ink-600 dark:text-ink-400 mb-2">
                {t('measureConverter.fromUnit')}
              </label>
              <select
                value={fromUnit}
                onChange={(e) => handleFromChange(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-ink-200 dark:border-ink-700 bg-ink-50 dark:bg-ink-800 text-lg font-bold"
              >
                <option value="">{t('measureConverter.selectFromUnit')}</option>
                {fromOptions.map(unit => (
                  <option key={unit.id} value={unit.id}>
                    {unit.emoji} {unit.name}（{unit.dynasty} · {unit.toBase}{unit.category === 'weight' ? 'kg' : unit.category === 'length' ? 'm' : 'ml'}）
                  </option>
                ))}
              </select>
              {fromData && (
                <p className="text-xs text-ink-500 mt-1">{fromData.description}</p>
              )}
            </div>

            {/* 交换按钮 */}
            {fromUnit && toUnit && (
              <div className="flex justify-center mb-6">
                <button
                  onClick={() => {
                    const temp = fromUnit;
                    setFromUnit(toUnit);
                    setToUnit(temp);
                  }}
                  className="px-4 py-2 rounded-full bg-accent/10 text-accent hover:bg-accent/20 transition-colors font-bold"
                >
                  ⇄ {t('measureConverter.swap')}
                </button>
              </div>
            )}

            {/* 目标单位 */}
            {fromUnit && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-ink-600 dark:text-ink-400 mb-2">
                  {t('measureConverter.toUnit')}
                </label>
                <select
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-ink-200 dark:border-ink-700 bg-ink-50 dark:bg-ink-800 text-lg font-bold"
                >
                  <option value="">{t('measureConverter.selectToUnit')}</option>
                  {toOptions.map(opt => (
                    <option key={opt.toId} value={opt.toId}>
                      {opt.emoji} {opt.name}（{findUnit(opt.toId)?.dynasty}）
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* 结果 */}
            {result && fromData && toData && (
              <div className="p-6 rounded-xl bg-gradient-to-r from-accent/10 to-amber-500/10 border-2 border-accent/30">
                <div className="text-center">
                  <p className="text-sm text-ink-500 mb-2">
                    {numericValue} {fromData.name}（{fromData.dynasty}）=
                  </p>
                  <p className="text-3xl font-bold text-accent mb-2">{result}</p>
                  <p className="text-xs text-ink-500">
                    {toData.name}（{toData.dynasty}）· {toData.description}
                  </p>
                </div>
              </div>
            )}

            {!result && fromUnit && toUnit && (
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800 text-center text-ink-500">
                {t('measureConverter.cannotConvert')}
              </div>
            )}
          </div>
        </RevealOnScroll>

        {/* 常用换算速查表 */}
        <RevealOnScroll delay={200}>
          <div className="mt-8 bg-white dark:bg-ink-900 rounded-2xl border-2 border-ink-200 dark:border-ink-700 p-6 shadow-lg">
            <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-4">📋 {t('measureConverter.quickReference')}</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-ink-200 dark:border-ink-700">
                    <th className="text-left py-2 px-3 text-ink-600 dark:text-ink-400">{t('measureConverter.colUnit')}</th>
                    <th className="text-left py-2 px-3 text-ink-600 dark:text-ink-400">{t('measureConverter.colDynasty')}</th>
                    <th className="text-left py-2 px-3 text-ink-600 dark:text-ink-400">{t('measureConverter.colConversion')}</th>
                    <th className="text-left py-2 px-3 text-ink-600 dark:text-ink-400">{t('measureConverter.colEquivalent')}</th>
                  </tr>
                </thead>
                <tbody>
                  {ALL_UNITS.map(unit => {
                    let equivalent = '';
                    if (unit.category === 'length') {
                      const meters = unit.toBase;
                      equivalent = meters >= 1 ? `${meters.toFixed(3)} ${t('measureConverter.unitM')}` : `${(meters * 100).toFixed(2)} ${t('measureConverter.unitCm')}`;
                    } else if (unit.category === 'weight') {
                      const grams = unit.toBase * 1000;
                      equivalent = grams >= 1 ? `${grams.toFixed(2)} ${t('measureConverter.unitG')}` : `${(grams * 1000).toFixed(1)} ${t('measureConverter.unitMg')}`;
                    } else {
                      const ml = unit.toBase;
                      equivalent = ml >= 1000 ? `${(ml / 1000).toFixed(2)} ${t('measureConverter.unitL')}` : `${ml.toFixed(1)} ${t('measureConverter.unitMl')}`;
                    }
                    return (
                      <tr key={unit.id} className="border-b border-ink-100 dark:border-ink-800 hover:bg-ink-50 dark:hover:bg-ink-800">
                        <td className="py-2 px-3 font-bold text-ink-900 dark:text-ink-100">
                          {unit.emoji} {unit.name}
                        </td>
                        <td className="py-2 px-3 text-ink-600 dark:text-ink-400">{unit.dynasty}</td>
                        <td className="py-2 px-3 text-ink-600 dark:text-ink-400">{unit.toBase}</td>
                        <td className="py-2 px-3 text-accent font-bold">{equivalent}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
