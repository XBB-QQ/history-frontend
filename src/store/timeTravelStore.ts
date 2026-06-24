import { create } from 'zustand';

/** 时间旅行精度 */
export type TimePrecision = 'millennium' | 'century' | 'decade' | 'year';

/** 精度配置 */
const PRECISION_CONFIG: Record<TimePrecision, { label: string; step: number; range: [number, number] }> = {
  millennium: { label: '千年', step: 1000, range: [-3000, 3000] },
  century: { label: '百年', step: 100, range: [-3000, 3000] },
  decade: { label: '十年', step: 10, range: [-3000, 3000] },
  year: { label: '年', step: 1, range: [-3000, 3000] },
};

interface TimeTravelState {
  /** 当前选中年份（负数 = BC） */
  year: number;
  /** 精度 */
  precision: TimePrecision;
  /** 是否激活时间旅行模式 */
  active: boolean;

  setYear: (year: number) => void;
  setPrecision: (precision: TimePrecision) => void;
  toggleActive: () => void;
  /** 键盘方向键微调 */
  arrowAdjust: (delta: number) => void;
  /** 快速跳转到重大年代 */
  jumpTo: (year: number) => void;
}

/** 重大历史年代快捷按钮 */
const MILESTONE_YEARS = [
  { year: -221, label: '秦统一' },
  { year: 220, label: '三国' },
  { year: 618, label: '唐朝' },
  { year: 960, label: '宋朝' },
  { year: 1271, label: '元朝' },
  { year: 1368, label: '明朝' },
  { year: 1644, label: '清朝' },
  { year: 1912, label: '民国' },
  { year: 1949, label: '新中国' },
];

export const useTimeTravelStore = create<TimeTravelState>((set) => ({
  year: new Date().getFullYear(),
  precision: 'century',
  active: false,

  setYear: (year) => set({ year }),

  setPrecision: (precision) => {
    const config = PRECISION_CONFIG[precision];
    // 切换到新精度时，对齐到该精度的倍数
    const aligned = Math.round(year / config.step) * config.step;
    set({ precision, year: Math.max(config.range[0], Math.min(config.range[1], aligned)) });
  },

  toggleActive: () => set((s) => ({ active: !s.active })),

  arrowAdjust: (delta) =>
    set((s) => {
      const config = PRECISION_CONFIG[s.precision];
      const step = delta * config.step;
      const newYear = Math.max(config.range[0], Math.min(config.range[1], s.year + step));
      return { year: newYear };
    }),

  jumpTo: (year) => set({ year }),
}));

export { PRECISION_CONFIG, MILESTONE_YEARS };
