/**
 * 历史度量衡换算工具
 * @see ITERATIONS.md #95
 */

import { ALL_UNITS, MEASURE_CATEGORIES, type MeasureUnit } from '@/data/features/measureUnits';

/** 单位查找 */
export function findUnit(id: string): MeasureUnit | undefined {
  return ALL_UNITS.find(u => u.id === id);
}

/**
 * 换算：从单位A换算到单位B
 * @param value 输入数值
 * @param fromId 源单位ID
 * @param toId 目标单位ID
 */
export function convertMeasure(value: number, fromId: string, toId: string): number | null {
  const from = findUnit(fromId);
  const to = findUnit(toId);
  if (!from || !to) return null;

  // 先换算到基准单位，再换算到目标单位
  const baseValue = value * from.toBase;
  return baseValue / to.toBase;
}

/** 格式化结果 */
export function formatResult(value: number, unitName: string): string {
  if (Math.abs(value) >= 10000 || (Math.abs(value) < 0.01 && value !== 0)) {
    return `${value.toExponential(4)} ${unitName}`;
  }
  return `${parseFloat(value.toFixed(6))} ${unitName}`;
}

/** 获取所有可用的换算选项 */
export function getConversionOptions(fromId: string): Array<{ toId: string; name: string; category: string; emoji: string }> {
  const from = findUnit(fromId);
  if (!from) return [];

  return ALL_UNITS
    .filter(u => u.id !== fromId)
    .map(u => ({
      toId: u.id,
      name: u.name,
      category: u.categoryName,
      emoji: MEASURE_CATEGORIES.find(c => c.id === u.category)?.emoji || '',
    }));
}
