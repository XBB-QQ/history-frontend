/**
 * 历史度量衡换算 — 单位数据
 */

export interface MeasureCategory {
  id: string;
  name: string;
  emoji: string;
  units: MeasureUnit[];
}

export interface MeasureUnit {
  id: string;
  name: string;
  dynasty: string;
  /** 相对于基准单位的换算倍数 */
  toBase: number;
  description: string;
}

export const MEASURE_CATEGORIES: MeasureCategory[] = [
  {
    id: 'length',
    name: '长度',
    emoji: '📏',
    units: [
      { id: 'chi', name: '尺', dynasty: '周', toBase: 0.231, description: '周代一尺约23.1厘米' },
      { id: 'zhang', name: '丈', dynasty: '周', toBase: 2.31, description: '一丈等于十尺' },
      { id: 'cun', name: '寸', dynasty: '周', toBase: 0.0231, description: '一寸等于十分之一尺' },
      { id: 'mu', name: '步', dynasty: '周', toBase: 1.848, description: '一步约等于六尺' },
      { id: 'li', name: '里', dynasty: '周', toBase: 415.8, description: '一里约等于800步' },
      { id: 'ming_chi', name: '米', dynasty: '现代', toBase: 1.0, description: '现代国际单位' },
      { id: 'cm', name: '厘米', dynasty: '现代', toBase: 0.01, description: '现代国际单位' },
      { id: 'km', name: '千米', dynasty: '现代', toBase: 1000.0, description: '现代国际单位' },
    ],
  },
  {
    id: 'weight',
    name: '重量',
    emoji: '⚖️',
    units: [
      { id: 'liang', name: '两', dynasty: '汉', toBase: 0.0158, description: '汉代一两约15.8克' },
      { id: 'jin', name: '斤', dynasty: '汉', toBase: 0.25, description: '汉代一斤约250克（16两）' },
      { id: 'dan', name: '担', dynasty: '汉', toBase: 125.0, description: '一担等于50公斤（汉代）' },
      { id: 'liang_q', name: '两', dynasty: '清', toBase: 0.0373, description: '清代一两约37.3克（16两=1斤）' },
      { id: 'jin_q', name: '斤', dynasty: '清', toBase: 0.596, description: '清代一斤约596克' },
      { id: 'gram', name: '克', dynasty: '现代', toBase: 0.001, description: '现代国际单位' },
      { id: 'kg', name: '千克', dynasty: '现代', toBase: 1.0, description: '现代国际单位' },
      { id: 'ton', name: '吨', dynasty: '现代', toBase: 1000.0, description: '现代国际单位' },
    ],
  },
  {
    id: 'volume',
    name: '容量',
    emoji: '🏺',
    units: [
      { id: 'dou', name: '斗', dynasty: '汉', toBase: 20000.0, description: '汉代一斗约20000毫升' },
      { id: 'sheng', name: '升', dynasty: '汉', toBase: 2000.0, description: '汉代一升约2000毫升' },
      { id: 'dou_q', name: '斗', dynasty: '清', toBase: 10000.0, description: '清代一斗约10000毫升' },
      { id: 'sheng_q', name: '升', dynasty: '清', toBase: 1000.0, description: '清代一升约1000毫升' },
      { id: 'ml', name: '毫升', dynasty: '现代', toBase: 1.0, description: '现代国际单位' },
      { id: 'liter', name: '升', dynasty: '现代', toBase: 1000.0, description: '现代国际单位' },
    ],
  },
];

/** 所有单位的扁平列表（含类别） */
export const ALL_UNITS = MEASURE_CATEGORIES.flatMap(cat =>
  cat.units.map(u => ({ ...u, category: cat.id, categoryName: cat.name, emoji: cat.emoji }))
);
