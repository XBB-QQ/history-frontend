/**
 * 朝代多维度对比数据（用于雷达图）
 * 数据来源：学术文献估算值，仅供科普对比参考
 */

export interface DynastyMetrics {
  dynastyId: string;
  dynastyName: string;
  /** 疆域面积（相对值 0-100） */
  territory: number;
  /** 人口峰值（相对值 0-100） */
  population: number;
  /** 经济/GDP估算（相对值 0-100） */
  economy: number;
  /** 文化繁荣度（相对值 0-100） */
  culture: number;
  /** 军事力量（相对值 0-100） */
  military: number;
  /** 科技创新（相对值 0-100） */
  technology: number;
  /** 国祚（相对值 0-100） */
  longevity: number;
  /** 开放程度（相对值 0-100） */
  openness: number;
}

export const DYNASTY_METRICS: DynastyMetrics[] = [
  { dynastyId: 'xia', dynastyName: '夏', territory: 15, population: 10, economy: 10, culture: 20, military: 15, technology: 10, longevity: 25, openness: 10 },
  { dynastyId: 'shang', dynastyName: '商', territory: 20, population: 15, economy: 15, culture: 30, military: 25, technology: 25, longevity: 30, openness: 10 },
  { dynastyId: 'zhou', dynastyName: '周', territory: 30, population: 20, economy: 20, culture: 50, military: 30, technology: 20, longevity: 80, openness: 15 },
  { dynastyId: 'qin', dynastyName: '秦', territory: 50, population: 30, economy: 25, culture: 25, military: 90, technology: 35, longevity: 10, openness: 10 },
  { dynastyId: 'han', dynastyName: '汉', territory: 60, population: 45, economy: 40, culture: 55, military: 65, technology: 45, longevity: 75, openness: 50 },
  { dynastyId: 'nan-bei-chao', dynastyName: '南北朝', territory: 40, population: 30, economy: 25, culture: 70, military: 50, technology: 45, longevity: 40, openness: 30 },
  { dynastyId: 'tang', dynastyName: '唐', territory: 75, population: 55, economy: 50, culture: 90, military: 70, technology: 50, longevity: 50, openness: 85 },
  { dynastyId: 'wu-dai-shi-guo', dynastyName: '五代十国', territory: 30, population: 40, economy: 45, culture: 55, military: 50, technology: 40, longevity: 15, openness: 20 },
  { dynastyId: 'song', dynastyName: '宋', territory: 35, population: 70, economy: 85, culture: 95, military: 25, technology: 90, longevity: 55, openness: 60 },
  { dynastyId: 'yuan', dynastyName: '元', territory: 100, population: 50, economy: 40, culture: 35, military: 95, technology: 30, longevity: 25, openness: 70 },
  { dynastyId: 'ming', dynastyName: '明', territory: 65, population: 65, economy: 55, culture: 60, military: 55, technology: 45, longevity: 55, openness: 15 },
  { dynastyId: 'qing', dynastyName: '清', territory: 85, population: 80, economy: 50, culture: 45, military: 50, technology: 15, longevity: 55, openness: 5 },
];

export const METRIC_LABELS = {
  territory: '疆域',
  population: '人口',
  economy: '经济',
  culture: '文化',
  military: '军事',
  technology: '科技',
  longevity: '国祚',
  openness: '开放',
};
