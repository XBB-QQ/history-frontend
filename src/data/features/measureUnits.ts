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
      { id: 'chi_qin', name: '尺', dynasty: '秦', toBase: 0.231, description: '秦统一度量衡，一尺约23.1厘米（承周制）' },
      { id: 'li_qin', name: '里', dynasty: '秦', toBase: 415.8, description: '秦一里约415.8米（六尺为步，三百步为里）' },
      { id: 'chi_tang', name: '尺', dynasty: '唐', toBase: 0.295, description: '唐代大尺约29.5厘米（小尺24.5厘米）' },
      { id: 'zhang_tang', name: '丈', dynasty: '唐', toBase: 2.95, description: '唐代一丈等于十尺' },
      { id: 'chi_song', name: '尺', dynasty: '宋', toBase: 0.316, description: '宋代营造尺约31.6厘米' },
      { id: 'chi_ming', name: '尺', dynasty: '明', toBase: 0.32, description: '明代裁衣尺约32厘米（营造尺约32.7厘米）' },
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
      { id: 'jin', name: '斤', dynasty: '汉', toBase: 0.25, description: '汉代一斤约250克（16两=1斤）' },
      { id: 'dan', name: '担', dynasty: '汉', toBase: 125.0, description: '一担等于50公斤（汉代）' },
      { id: 'jin_qin', name: '斤', dynasty: '秦', toBase: 0.253, description: '秦代一斤约253克（秦始皇统一度量衡）' },
      { id: 'liang_qin', name: '两', dynasty: '秦', toBase: 0.0158, description: '秦代一两约15.8克（16两=1斤）' },
      { id: 'jin_tang', name: '斤', dynasty: '唐', toBase: 0.596, description: '唐代一斤约596克（唐承隋制）' },
      { id: 'liang_tang', name: '两', dynasty: '唐', toBase: 0.0373, description: '唐代一两约37.3克（16两=1斤）' },
      { id: 'jin_song', name: '斤', dynasty: '宋', toBase: 0.596, description: '宋代一斤约596克（承唐制）' },
      { id: 'liang_song', name: '两', dynasty: '宋', toBase: 0.0373, description: '宋代一两约37.3克' },
      { id: 'jin_ming', name: '斤', dynasty: '明', toBase: 0.59, description: '明代一斤约590克' },
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
      { id: 'sheng_qin', name: '升', dynasty: '秦', toBase: 2000.0, description: '秦代一升约2000毫升（商鞅方升）' },
      { id: 'dou_qin', name: '斗', dynasty: '秦', toBase: 20000.0, description: '秦代一斗约20000毫升（十升为斗）' },
      { id: 'sheng_tang', name: '升', dynasty: '唐', toBase: 600.0, description: '唐代一升约600毫升（大升）' },
      { id: 'dou_tang', name: '斗', dynasty: '唐', toBase: 6000.0, description: '唐代一斗约6000毫升' },
      { id: 'sheng_song', name: '升', dynasty: '宋', toBase: 600.0, description: '宋代一升约600毫升（承唐制）' },
      { id: 'dou_song', name: '斗', dynasty: '宋', toBase: 6000.0, description: '宋代一斗约6000毫升' },
      { id: 'sheng_ming', name: '升', dynasty: '明', toBase: 1000.0, description: '明代一升约1000毫升' },
      { id: 'dou_ming', name: '斗', dynasty: '明', toBase: 10000.0, description: '明代一斗约10000毫升' },
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
