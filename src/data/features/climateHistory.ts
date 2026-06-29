/**
 * 历史气候变迁数据
 * 基于竺可桢《中国近五千年来气候变迁的初步研究》
 */

export interface ClimatePeriod {
  era: string;
  startYear: number;
  endYear: number;
  /** 相对温度偏差（相对于现代） */
  temperatureDelta: number;
  description: string;
  historicalImpact: string;
}

export const CLIMATE_PERIODS: ClimatePeriod[] = [
  { era: '仰韶温暖期', startYear: -3000, endYear: -1000, temperatureDelta: 2, description: '黄河流域气候温暖湿润，年均温度比现代高约2°C', historicalImpact: '仰韶文化繁荣，北方可种植水稻' },
  { era: '殷商温暖期', startYear: -1000, endYear: -850, temperatureDelta: 1.5, description: '商代气候仍偏暖，安阳地区有象和水牛', historicalImpact: '商代农业繁荣，大象栖息于黄河流域' },
  { era: '周初寒冷期', startYear: -850, endYear: -700, temperatureDelta: -1, description: '西周初期温度下降，汉江结冰', historicalImpact: '《诗经》记载寒冷，农作物减产' },
  { era: '春秋战国回暖', startYear: -700, endYear: -200, temperatureDelta: 0.5, description: '春秋战国气候回暖，齐鲁种梅竹', historicalImpact: '春秋农业繁荣，百家争鸣的温床' },
  { era: '秦汉温暖期', startYear: -200, endYear: 200, temperatureDelta: 1, description: '秦汉气候偏暖，长安可种竹橘', historicalImpact: '汉朝农业和丝路贸易繁荣' },
  { era: '魏晋南北朝寒冷', startYear: 200, endYear: 600, temperatureDelta: -1.5, description: '魏晋南北朝寒冷期，南京建冰房', historicalImpact: '北方游牧民族南下，五胡乱华' },
  { era: '隋唐温暖期', startYear: 600, endYear: 900, temperatureDelta: 1, description: '唐代温暖期，长安无雪冬', historicalImpact: '唐朝盛世基础——气候有利于农业和丝路' },
  { era: '宋元转冷期', startYear: 900, endYear: 1300, temperatureDelta: -0.5, description: '逐步进入中世纪温暖期尾声，开始转冷', historicalImpact: '金军南下与黄河冰封相关' },
  { era: '明清小冰期', startYear: 1300, endYear: 1900, temperatureDelta: -1.5, description: '小冰河期，太湖鄱阳湖多次结冰', historicalImpact: '明末大旱加速灭亡，清初冷灾频发' },
  { era: '现代回暖', startYear: 1900, endYear: 2026, temperatureDelta: 0, description: '20世纪后逐步回暖，近年全球升温', historicalImpact: '全球气候变化成为新挑战' },
];

/** 为 D3.js 生成时间序列数据点 */
export function generateClimateTimeSeries(): { year: number; delta: number }[] {
  const points: { year: number; delta: number }[] = [];
  CLIMATE_PERIODS.forEach(period => {
    const step = 50;
    for (let y = period.startYear; y <= period.endYear; y += step) {
      // 在周期内做简单的正弦波动
      const progress = (y - period.startYear) / (period.endYear - period.startYear);
      const noise = Math.sin(progress * Math.PI) * 0.3;
      points.push({ year: y, delta: period.temperatureDelta + noise });
    }
  });
  return points;
}

/** 获取与历史事件关联的气候数据 */
export function getClimateForYear(year: number): ClimatePeriod | undefined {
  return CLIMATE_PERIODS.find(p => year >= p.startYear && year <= p.endYear);
}
