/**
 * 历代疆域简化数据 — 基于核心领土范围估算
 * @see history-museum/design/002-innovation-brainstorm.md §18
 * 
 * 简化版：用矩形范围描述各朝代核心疆域，不含完整 GeoJSON
 */

export interface DynastyTerritory {
  id: string;
  name: string;
  emoji: string;
  /** 起止年份 */
  startYear: number | null;
  endYear: number | null;
  yearDisplay: string;
  /** 简化疆域范围（经纬度矩形） */
  bounds: {
    north: number;  // 最北纬度
    south: number;  // 最南纬度
    east: number;   // 最东经度
    west: number;   // 最西经度
  };
  /** 颜色 */
  color: string;
  /** 疆域特点描述 */
  description: string;
  /** 面积估算（万km²） */
  areaEstimate: number;
  /** 重要城市 */
  capitals: string[];
  /** 关键疆域事件 */
  territoryEvents: TerritoryEvent[];
}

export interface TerritoryEvent {
  year: number;
  title: string;
  type: 'expand' | 'shrink' | 'stable';
  description: string;
  /** 疆域变化 */
  boundsChange?: {
    north?: number;
    south?: number;
    east?: number;
    west?: number;
  };
}

export const DYNASTY_TERRITORIES: DynastyTerritory[] = [
  {
    id: 'qin',
    name: '秦',
    emoji: '⚔️',
    startYear: -221,
    endYear: -206,
    yearDisplay: '前221-前206',
    bounds: { north: 41, south: 18, east: 119, west: 96 },
    color: '#2c2c2c',
    description: '统一六国后疆域涵盖长城以南、南海以北的核心区域。郡县制取代分封制。',
    areaEstimate: 340,
    capitals: ['咸阳'],
    territoryEvents: [
      { year: -221, title: '统一六国', type: 'expand', description: '灭韩赵魏楚燕齐，疆域扩展至长城一线' },
    ],
  },
  {
    id: 'han-west',
    name: '西汉',
    emoji: '🏛️',
    startYear: -202,
    endYear: 8,
    yearDisplay: '前202-8',
    bounds: { north: 42, south: 18, east: 125, west: 76 },
    color: '#d4380d',
    description: '武帝时期大幅扩张，河西走廊纳入版图，西域设都护府。疆域远超秦朝。',
    areaEstimate: 600,
    capitals: ['长安'],
    territoryEvents: [
      { year: -138, title: '张骞通西域', type: 'expand', description: '河西走廊纳入版图', boundsChange: { west: 76 } },
      { year: -60, title: '设西域都护府', type: 'expand', description: '西域正式纳入中国版图' },
    ],
  },
  {
    id: 'han-east',
    name: '东汉',
    emoji: '🏛️',
    startYear: 25,
    endYear: 220,
    yearDisplay: '25-220',
    bounds: { north: 42, south: 18, east: 125, west: 96 },
    color: '#cf1322',
    description: '恢复西汉大部分疆域，但西域控制减弱。后期缩小。',
    areaEstimate: 500,
    capitals: ['洛阳'],
    territoryEvents: [
      { year: 25, title: '光武中兴', type: 'stable', description: '恢复西汉核心疆域' },
      { year: 184, title: '黄巾起义', type: 'shrink', description: '疆域控制力下降' },
    ],
  },
  {
    id: 'tang',
    name: '唐',
    emoji: '🏛️',
    startYear: 618,
    endYear: 907,
    yearDisplay: '618-907',
    bounds: { north: 55, south: 18, east: 130, west: 60 },
    color: '#d97706',
    description: '鼎盛时期疆域空前广阔，北达贝加尔湖，西至中亚。是中国历史上疆域最大的朝代之一。',
    areaEstimate: 1200,
    capitals: ['长安'],
    territoryEvents: [
      { year: 630, title: '灭东突厥', type: 'expand', description: '北疆扩展至贝加尔湖', boundsChange: { north: 55 } },
      { year: 657, title: '灭西突厥', type: 'expand', description: '西疆扩展至中亚', boundsChange: { west: 60 } },
      { year: 755, title: '安史之乱', type: 'shrink', description: '失去北方大片领土', boundsChange: { north: 42, west: 96 } },
    ],
  },
  {
    id: 'song-north',
    name: '北宋',
    emoji: '📜',
    startYear: 960,
    endYear: 1127,
    yearDisplay: '960-1127',
    bounds: { north: 40, south: 22, east: 125, west: 100 },
    color: '#389e0d',
    description: '疆域相对较小，北有辽/金，西有西夏。重文轻武，军事弱势。',
    areaEstimate: 280,
    capitals: ['开封'],
    territoryEvents: [
      { year: 960, title: '北宋建立', type: 'stable', description: '疆域基本稳定在长城以南' },
    ],
  },
  {
    id: 'song-south',
    name: '南宋',
    emoji: '📜',
    startYear: 1127,
    endYear: 1279,
    yearDisplay: '1127-1279',
    bounds: { north: 33, south: 18, east: 122, west: 100 },
    color: '#52c41a',
    description: '靖康之变后退守江南，淮河为北界。疆域大幅缩小。',
    areaEstimate: 180,
    capitals: ['临安(杭州)'],
    territoryEvents: [
      { year: 1127, title: '南迁', type: 'shrink', description: '失去北方领土', boundsChange: { north: 33 } },
    ],
  },
  {
    id: 'yuan',
    name: '元',
    emoji: '🏇',
    startYear: 1271,
    endYear: 1368,
    yearDisplay: '1271-1368',
    bounds: { north: 55, south: 18, east: 135, west: 75 },
    color: '#722ed1',
    description: '蒙古帝国统治下疆域空前广阔。实际控制面积最大的朝代。',
    areaEstimate: 1400,
    capitals: ['大都(北京)'],
    territoryEvents: [
      { year: 1279, title: '灭南宋', type: 'expand', description: '统一中国全境' },
    ],
  },
  {
    id: 'ming',
    name: '明',
    emoji: '🏯',
    startYear: 1368,
    endYear: 1644,
    yearDisplay: '1368-1644',
    bounds: { north: 48, south: 18, east: 130, west: 98 },
    color: '#1890ff',
    description: '前期疆域较大，后期缩退。海禁政策使海洋影响力为零。',
    areaEstimate: 700,
    capitals: ['北京', '南京'],
    territoryEvents: [
      { year: 1406, title: '征安南', type: 'expand', description: '短暂控制越南北部' },
      { year: 1421, title: '迁都北京', type: 'stable', description: '重心北移' },
      { year: 1449, title: '土木堡之变', type: 'shrink', description: '北疆收缩', boundsChange: { north: 42 } },
    ],
  },
  {
    id: 'qing',
    name: '清',
    emoji: '🐉',
    startYear: 1644,
    endYear: 1912,
    yearDisplay: '1644-1912',
    bounds: { north: 55, south: 18, east: 135, west: 73 },
    color: '#595959',
    description: '鼎盛时期疆域仅次于元朝。含新疆、西藏、蒙古、东北等广阔区域。',
    areaEstimate: 1300,
    capitals: ['北京'],
    territoryEvents: [
      { year: 1683, title: '收台湾', type: 'expand', description: '台湾正式纳入版图', boundsChange: { east: 122 } },
      { year: 1759, title: '平定新疆', type: 'expand', description: '新疆正式纳入版图', boundsChange: { west: 73 } },
      { year: 1840, title: '鸦片战争', type: 'shrink', description: '开始割地赔款' },
      { year: 1860, title: '割外东北', type: 'shrink', description: '失去外东北40万km²', boundsChange: { north: 50, east: 130 } },
    ],
  },
];

/** 获取指定年份的疆域状态 */
export function getTerritoryAtYear(year: number): DynastyTerritory[] {
  return DYNASTY_TERRITORIES.filter(d => {
    if (d.startYear === null || d.endYear === null) return false;
    return year >= d.startYear && year <= d.endYear;
  });
}

/** 年份列表（时间轴关键节点） */
export const TIMELINE_YEARS = [
  -221, -138, 8, 25, 220, 618, 630, 755, 960, 1127, 1279, 1368, 1449, 1644, 1840, 1912
];
