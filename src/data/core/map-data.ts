// 历史地图模块 — 简化的中国地图区域数据
// 使用 SVG path 绘制主要省份/区域的简化轮廓
// 坐标系：以中国为中心，经度 73-135，纬度 18-54 映射到 SVG 空间

import type { MapRegion, DynastyMapData } from '@/types/map';

// ──────────────────────────────────────────────
// 简化地图区域数据（SVG path）
// ──────────────────────────────────────────────

/** 将经纬度映射到 SVG 坐标的辅助函数 */
function lngLatToPath(lngMin: number, latMin: number, lngMax: number, latMax: number): { x1: number; y1: number; x2: number; y2: number } {
  // SVG viewBox: 0 0 800 600
  // 经度范围 73-135 (宽度62)，纬度范围 18-54 (高度36)
  const x1 = ((lngMin - 73) / 62) * 800;
  const y1 = 600 - ((latMax - 18) / 36) * 600; // Y轴翻转
  const x2 = ((lngMax - 73) / 62) * 800;
  const y2 = 600 - ((latMin - 18) / 36) * 600;
  return { x1, y1, x2, y2 };
}

/** 生成矩形区域 SVG path */
function rectPath(lngMin: number, latMin: number, lngMax: number, latMax: number): string {
  const { x1, y1, x2, y2 } = lngLatToPath(lngMin, latMin, lngMax, latMax);
  return `M${x1},${y1} L${x2},${y1} L${x2},${y2} L${x1},${y2} Z`;
}

/** 生成多边形区域 SVG path */
function polyPath(points: [number, number][]): string {
  const segments = points.map(([lng, lat]) => {
    const { x1: x, y1: y } = lngLatToPath(lng, lat, lng, lat);
    return `${x},${y}`;
  });
  return `M${segments.join(' L')} Z`;
}

export const mapRegions: MapRegion[] = [
  // 新疆
  {
    id: 'xinjiang',
    name: '新疆',
    path: polyPath([[73, 49], [90, 49], [96, 42], [88, 36], [75, 38]]),
    center: [85, 43],
    aliases: ['西域', '新疆省', '天山南北'],
  },
  // 西藏
  {
    id: 'tibet',
    name: '西藏',
    path: polyPath([[78, 36], [92, 36], [97, 28], [88, 28]]),
    center: [86, 32],
    aliases: ['青藏高原', '吐蕃'],
  },
  // 青海
  {
    id: 'qinghai',
    name: '青海',
    path: rectPath(89, 32, 101, 39),
    center: [96, 35],
    aliases: ['青海省', '西宁'],
  },
  // 甘肃
  {
    id: 'gansu',
    name: '甘肃',
    path: polyPath([[93, 42], [106, 42], [108, 35], [100, 33], [93, 36]]),
    center: [100, 38],
    aliases: ['凉州', '甘州', '河西走廊'],
  },
  // 内蒙古
  {
    id: 'inner-mongolia',
    name: '内蒙古',
    path: polyPath([[97, 49], [126, 49], [120, 40], [106, 39]]),
    center: [112, 44],
    aliases: ['蒙古', '塞北', '漠南'],
  },
  // 四川
  {
    id: 'sichuan',
    name: '四川',
    path: polyPath([[97, 33], [108, 33], [108, 26], [100, 27]]),
    center: [103, 30],
    aliases: ['蜀', '巴蜀', '川蜀', '四川省'],
  },
  // 陕西
  {
    id: 'shaanxi',
    name: '陕西',
    path: rectPath(105, 32, 111, 39),
    center: [108, 35],
    aliases: ['秦', '关中', '长安', '陕西省'],
  },
  // 山西
  {
    id: 'shanxi',
    name: '山西',
    path: rectPath(110, 35, 115, 41),
    center: [112, 38],
    aliases: ['晋', '山西省'],
  },
  // 河北
  {
    id: 'hebei',
    name: '河北',
    path: rectPath(114, 37, 119, 42),
    center: [116, 39],
    aliases: ['冀', '直隶', '河北省'],
  },
  // 河南
  {
    id: 'henan',
    name: '河南',
    path: rectPath(110, 32, 116, 36),
    center: [113, 34],
    aliases: ['豫', '中原', '河南省'],
  },
  // 山东
  {
    id: 'shandong',
    name: '山东',
    path: rectPath(115, 35, 122, 38),
    center: [118, 36],
    aliases: ['鲁', '山东省'],
  },
  // 江苏
  {
    id: 'jiangsu',
    name: '江苏',
    path: rectPath(117, 31, 121, 35),
    center: [119, 33],
    aliases: ['苏', '江淮', '江苏省'],
  },
  // 浙江
  {
    id: 'zhejiang',
    name: '浙江',
    path: rectPath(118, 27, 123, 31),
    center: [120, 29],
    aliases: ['浙', '江浙', '浙江省'],
  },
  // 安徽
  {
    id: 'anhui',
    name: '安徽',
    path: rectPath(115, 29, 119, 34),
    center: [117, 32],
    aliases: ['皖', '安徽省'],
  },
  // 湖南
  {
    id: 'hunan',
    name: '湖南',
    path: rectPath(109, 25, 114, 30),
    center: [112, 28],
    aliases: ['湘', '湖南省'],
  },
  // 湖北
  {
    id: 'hubei',
    name: '湖北',
    path: rectPath(109, 30, 115, 33),
    center: [112, 31],
    aliases: ['鄂', '湖北省'],
  },
  // 江西
  {
    id: 'jiangxi',
    name: '江西',
    path: rectPath(114, 24, 118, 30),
    center: [116, 27],
    aliases: ['赣', '江西省'],
  },
  // 福建
  {
    id: 'fujian',
    name: '福建',
    path: rectPath(116, 24, 120, 28),
    center: [118, 26],
    aliases: ['闽', '福建省'],
  },
  // 广东
  {
    id: 'guangdong',
    name: '广东',
    path: rectPath(110, 20, 117, 25),
    center: [113, 23],
    aliases: ['粤', '广东省', '岭南'],
  },
  // 广西
  {
    id: 'guangxi',
    name: '广西',
    path: rectPath(105, 21, 111, 26),
    center: [108, 24],
    aliases: ['桂', '广西'],
  },
  // 贵州
  {
    id: 'guizhou',
    name: '贵州',
    path: rectPath(104, 24, 109, 29),
    center: [107, 27],
    aliases: ['黔', '贵州省'],
  },
  // 云南
  {
    id: 'yunnan',
    name: '云南',
    path: rectPath(98, 21, 106, 29),
    center: [102, 25],
    aliases: ['滇', '云南省'],
  },
  // 辽宁
  {
    id: 'liaoning',
    name: '辽宁',
    path: rectPath(119, 39, 125, 43),
    center: [122, 41],
    aliases: ['辽', '奉天', '辽宁省'],
  },
  // 吉林
  {
    id: 'jilin',
    name: '吉林',
    path: rectPath(122, 42, 131, 46),
    center: [126, 44],
    aliases: ['吉', '吉林省'],
  },
  // 黑龙江
  {
    id: 'heilongjiang',
    name: '黑龙江',
    path: rectPath(121, 45, 135, 54),
    center: [128, 49],
    aliases: ['黑', '黑龙江省'],
  },
  // 台湾
  {
    id: 'taiwan',
    name: '台湾',
    path: rectPath(120, 22, 122, 25),
    center: [121, 23],
    aliases: ['台', '台湾省'],
  },
];

// ──────────────────────────────────────────────
// 朝代疆域映射数据
// ──────────────────────────────────────────────

export const dynastyMapData: DynastyMapData[] = [
  {
    dynastyName: '夏',
    regionIds: ['henan', 'shanxi', 'shaanxi'],
    period: '约前2070年—约前1600年',
    capitalPos: [113, 34],
    capitalName: '阳城',
  },
  {
    dynastyName: '商',
    regionIds: ['henan', 'shandong', 'hebei', 'anhui'],
    period: '约前1600年—前1046年',
    capitalPos: [114, 35],
    capitalName: '殷(安阳)',
  },
  {
    dynastyName: '周',
    regionIds: ['shaanxi', 'henan', 'shanxi', 'hubei', 'anhui', 'jiangsu'],
    period: '前1046年—前256年',
    capitalPos: [109, 34],
    capitalName: '镐京/洛邑',
  },
  {
    dynastyName: '秦',
    regionIds: ['shaanxi', 'gansu', 'shanxi', 'henan', 'hubei', 'hunan', 'sichuan'],
    period: '前221年—前207年',
    capitalPos: [109, 34],
    capitalName: '咸阳',
  },
  {
    dynastyName: '西汉',
    regionIds: ['shaanxi', 'gansu', 'henan', 'shanxi', 'sichuan', 'hebei', 'shandong', 'hubei', 'anhui', 'jiangsu', 'qinghai'],
    period: '前202年—公元8年',
    capitalPos: [109, 34],
    capitalName: '长安',
  },
  {
    dynastyName: '东汉',
    regionIds: ['shaanxi', 'henan', 'shanxi', 'sichuan', 'hebei', 'shandong', 'hubei', 'anhui', 'jiangsu', 'jiangxi', 'hunan', 'qinghai', 'gansu'],
    period: '公元25年—220年',
    capitalPos: [114, 34],
    capitalName: '洛阳',
  },
  {
    dynastyName: '唐',
    regionIds: ['shaanxi', 'gansu', 'xinjiang', 'henan', 'shanxi', 'hebei', 'shandong', 'sichuan', 'hubei', 'hunan', 'jiangxi', 'fujian', 'guangdong', 'jiangsu', 'anhui', 'zhejiang'],
    period: '618年—907年',
    capitalPos: [109, 34],
    capitalName: '长安',
  },
  {
    dynastyName: '宋',
    regionIds: ['henan', 'shanxi', 'hebei', 'shandong', 'sichuan', 'hubei', 'hunan', 'jiangxi', 'fujian', 'guangdong', 'guangxi', 'jiangsu', 'anhui', 'zhejiang', 'guizhou'],
    period: '960年—1279年',
    capitalPos: [114, 34],
    capitalName: '开封/临安',
  },
  {
    dynastyName: '元',
    regionIds: ['heilongjiang', 'jilin', 'liaoning', 'inner-mongolia', 'shaanxi', 'gansu', 'xinjiang', 'qinghai', 'tibet', 'henan', 'shanxi', 'hebei', 'shandong', 'sichuan', 'yunnan', 'guizhou', 'hubei', 'hunan', 'jiangxi', 'fujian', 'guangdong', 'guangxi', 'jiangsu', 'anhui', 'zhejiang', 'taiwan'],
    period: '1271年—1368年',
    capitalPos: [116, 39],
    capitalName: '大都',
  },
  {
    dynastyName: '明',
    regionIds: ['heilongjiang', 'jilin', 'liaoning', 'inner-mongolia', 'shaanxi', 'gansu', 'qinghai', 'henan', 'shanxi', 'hebei', 'shandong', 'sichuan', 'yunnan', 'guizhou', 'hubei', 'hunan', 'jiangxi', 'fujian', 'guangdong', 'guangxi', 'jiangsu', 'anhui', 'zhejiang', 'taiwan'],
    period: '1368年—1644年',
    capitalPos: [116, 39],
    capitalName: '南京/北京',
  },
  {
    dynastyName: '清',
    regionIds: ['heilongjiang', 'jilin', 'liaoning', 'inner-mongolia', 'xinjiang', 'qinghai', 'tibet', 'shaanxi', 'gansu', 'henan', 'shanxi', 'hebei', 'shandong', 'sichuan', 'yunnan', 'guizhou', 'hubei', 'hunan', 'jiangxi', 'fujian', 'guangdong', 'guangxi', 'jiangsu', 'anhui', 'zhejiang', 'taiwan'],
    period: '1644年—1912年',
    capitalPos: [116, 39],
    capitalName: '北京',
  },
];

// ──────────────────────────────────────────────
// 中国地图完整轮廓（南海诸岛小图例）
// ──────────────────────────────────────────────

/** 南海诸岛示意框 */
export function nanhaiBoxPath(): string {
  // 右下角小框
  return rectPath(108, 8, 117, 20);
}

/** 完整地图背景轮廓 */
export function chinaOutlinePath(): string {
  // 中国大致轮廓（简化版）
  return polyPath([
    [73, 49],   // 西北
    [87, 49],   // 阿尔泰
    [88, 42],   // 天山北
    [97, 42],   // 伊犁
    [106, 42],  // 准噶尔
    [111, 42],  // 额尔齐斯
    [119, 42],  // 阿尔泰山
    [121, 49],  // 东北边境
    [135, 48],  // 黑龙江口
    [135, 42],  // 乌苏里江
    [131, 42],  // 朝鲜边境
    [128, 39],  // 鸭绿江口
    [122, 39],  // 辽东半岛
    [122, 37],  // 渤海
    [121, 35],  // 山东
    [122, 30],  // 长江口
    [121, 28],  // 浙江
    [117, 24],  // 福建
    [114, 22],  // 广东
    [110, 20],  // 雷州半岛
    [108, 21],  // 北部湾
    [106, 22],  // 广西
    [101, 22],  // 云南
    [97, 24],   // 西藏东南
    [97, 28],   // 喜马拉雅东
    [88, 27],   // 藏南
    [78, 30],   // 阿里
    [78, 35],   // 喀喇昆仑
    [80, 40],   // 昆仑山中
    [87, 42],   // 塔里木西
    [73, 40],   // 帕米尔
    [73, 49],   // 回到起点
  ]);
}
