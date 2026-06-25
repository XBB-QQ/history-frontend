/**
 * 历史日历转换器
 * 公历 → 干支纪年 + 年号
 * 基于简化算法，覆盖主要朝代年号
 */

// 六十甲子
const TIANGAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const DIZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

/** 计算干支纪年 */
export function getGanzhi(year: number): string {
  // 干支纪年以公元4年为甲子年起点
  const tgIdx = (year - 4) % 10;
  const dzIdx = (year - 4) % 12;
  const tg = TIANGAN[tgIdx >= 0 ? tgIdx : tgIdx + 10];
  const dz = DIZHI[dzIdx >= 0 ? dzIdx : dzIdx + 12];
  return `${tg}${dz}年`;
}

/** 生肖 */
export function getShengxiao(year: number): string {
  const animals = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
  const idx = (year - 4) % 12;
  return animals[idx >= 0 ? idx : idx + 12];
}

/** 朝代年号数据库（简化版） */
interface ReignPeriod {
  dynasty: string;
  emperor: string;
  reignTitle: string;
  startYear: number;
  endYear: number;
}

const REIGN_PERIODS: ReignPeriod[] = [
  { dynasty: '秦', emperor: '秦始皇', reignTitle: '始皇帝', startYear: -221, endYear: -210 },
  { dynasty: '汉', emperor: '汉武帝', reignTitle: '建元', startYear: -140, endYear: -135 },
  { dynasty: '汉', emperor: '汉武帝', reignTitle: '元光', startYear: -134, endYear: -129 },
  { dynasty: '汉', emperor: '汉武帝', reignTitle: '元朔', startYear: -128, endYear: -123 },
  { dynasty: '汉', emperor: '汉武帝', reignTitle: '元狩', startYear: -122, endYear: -117 },
  { dynasty: '汉', emperor: '汉武帝', reignTitle: '元鼎', startYear: -116, endYear: -111 },
  { dynasty: '汉', emperor: '汉武帝', reignTitle: '元封', startYear: -110, endYear: -105 },
  { dynasty: '汉', emperor: '汉武帝', reignTitle: '太初', startYear: -104, endYear: -101 },
  { dynasty: '汉', emperor: '汉武帝', reignTitle: '天汉', startYear: -100, endYear: -97 },
  { dynasty: '汉', emperor: '汉武帝', reignTitle: '太始', startYear: -96, endYear: -93 },
  { dynasty: '汉', emperor: '汉武帝', reignTitle: '征和', startYear: -92, endYear: -89 },
  { dynasty: '汉', emperor: '汉武帝', reignTitle: '后元', startYear: -88, endYear: -87 },
  { dynasty: '唐', emperor: '唐太宗', reignTitle: '贞观', startYear: 627, endYear: 649 },
  { dynasty: '唐', emperor: '唐玄宗', reignTitle: '开元', startYear: 713, endYear: 741 },
  { dynasty: '唐', emperor: '唐玄宗', reignTitle: '天宝', startYear: 742, endYear: 756 },
  { dynasty: '宋', emperor: '宋太祖', reignTitle: '建隆', startYear: 960, endYear: 963 },
  { dynasty: '宋', emperor: '宋仁宗', reignTitle: '庆历', startYear: 1041, endYear: 1048 },
  { dynasty: '宋', emperor: '宋神宗', reignTitle: '熙宁', startYear: 1068, endYear: 1077 },
  { dynasty: '宋', emperor: '宋神宗', reignTitle: '元丰', startYear: 1078, endYear: 1085 },
  { dynasty: '宋', emperor: '宋徽宗', reignTitle: '宣和', startYear: 1119, endYear: 1125 },
  { dynasty: '宋', emperor: '宋高宗', reignTitle: '绍兴', startYear: 1131, endYear: 1162 },
  { dynasty: '明', emperor: '明太祖', reignTitle: '洪武', startYear: 1368, endYear: 1398 },
  { dynasty: '明', emperor: '明成祖', reignTitle: '永乐', startYear: 1403, endYear: 1424 },
  { dynasty: '明', emperor: '明宣宗', reignTitle: '宣德', startYear: 1426, endYear: 1435 },
  { dynasty: '明', emperor: '明神宗', reignTitle: '万历', startYear: 1573, endYear: 1620 },
  { dynasty: '清', emperor: '康熙帝', reignTitle: '康熙', startYear: 1662, endYear: 1722 },
  { dynasty: '清', emperor: '雍正帝', reignTitle: '雍正', startYear: 1723, endYear: 1735 },
  { dynasty: '清', emperor: '乾隆帝', reignTitle: '乾隆', startYear: 1736, endYear: 1795 },
  { dynasty: '清', emperor: '嘉庆帝', reignTitle: '嘉庆', startYear: 1796, endYear: 1820 },
  { dynasty: '清', emperor: '道光帝', reignTitle: '道光', startYear: 1821, endYear: 1850 },
  { dynasty: '清', emperor: '咸丰帝', reignTitle: '咸丰', startYear: 1851, endYear: 1861 },
  { dynasty: '清', emperor: '同治帝', reignTitle: '同治', startYear: 1862, endYear: 1874 },
  { dynasty: '清', emperor: '光绪帝', reignTitle: '光绪', startYear: 1875, endYear: 1908 },
  { dynasty: '清', emperor: '宣统帝', reignTitle: '宣统', startYear: 1909, endYear: 1911 },
];

/** 查找某年对应的年号 */
export function getReignPeriod(year: number): ReignPeriod[] {
  return REIGN_PERIODS.filter(p => year >= p.startYear && year <= p.endYear);
}

/** 完整转换结果 */
export interface CalendarResult {
  gregorianYear: number;
  ganzhi: string;
  shengxiao: string;
  reignPeriods: ReignPeriod[];
  dynasty: string;
  formatted: string;
}

export function convertCalendar(year: number): CalendarResult {
  const ganzhi = getGanzhi(year);
  const shengxiao = getShengxiao(year);
  const reigns = getReignPeriod(year);
  const dynasty = reigns.length > 0 ? reigns[0].dynasty : '无对应朝代';

  let formatted = `${year}年 = ${ganzhi}（${shengxiao}年）`;
  if (reigns.length > 0) {
    formatted += ` = ${reigns[0].dynasty}·${reigns[0].emperor}${reigns[0].reignTitle}年`;
  }

  return { gregorianYear: year, ganzhi, shengxiao, reignPeriods: reigns, dynasty, formatted };
}
