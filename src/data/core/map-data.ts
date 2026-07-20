// 历史地图模块 — 简化的中国地图区域数据
// 使用 SVG path 绘制主要省份/区域的简化轮廓
// 坐标系：以中国为中心，经度 73-135，纬度 18-54 映射到 SVG 空间

import type { MapRegion, DynastyMapData } from '@/types/map';

// ──────────────────────────────────────────────
// 简化地图区域数据（SVG path）
// ──────────────────────────────────────────────

/** 将经纬度映射到 SVG 坐标的辅助函数 */
function lngLatToPath(lngMin: number, latMin: number, lngMax: number, latMax: number): { x1: number; y1: number; x2: number; y2: number } {
  // SVG viewBox: 0 0 1000 600 (5:3，接近中国实际经纬度跨度比 62:36 ≈ 1.72)
  // 经度范围 73-135 (宽度62)，纬度范围 18-54 (高度36)
  const x1 = ((lngMin - 73) / 62) * 1000;
  const y1 = 600 - ((latMax - 18) / 36) * 600; // Y轴翻转
  const x2 = ((lngMax - 73) / 62) * 1000;
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

/** 生成不闭合折线 SVG path（用于河流、长城等装饰线） */
function linePath(points: [number, number][]): string {
  const segments = points.map(([lng, lat]) => {
    const { x1: x, y1: y } = lngLatToPath(lng, lat, lng, lat);
    return `${x},${y}`;
  });
  return `M${segments.join(' L')}`;
}

/** 将经纬度映射到 SVG 坐标（viewBox 0 0 1000 600，5:3 比例） */
export function lngLatToXY(lng: number, lat: number): { x: number; y: number } {
  const x = ((lng - 73) / 62) * 1000;
  const y = 600 - ((lat - 18) / 36) * 600;
  return { x, y };
}

// ──────────────────────────────────────────────
// 装饰元素：黄河、长江、长城（简化经纬度折线）
// ──────────────────────────────────────────────

/** 黄河路径（源头 → 入海） */
export function yellowRiverPath(): string {
  return linePath([
    [96, 35],   // 源头
    [103, 36],  // 兰州
    [108, 41],  // 河套
    [111, 39],  // 太原北
    [113, 35],  // 郑州
    [117, 37],  // 济南
    [119, 38],  // 入海
  ]);
}

/** 长江路径（源头 → 入海） */
export function yangtzeRiverPath(): string {
  return linePath([
    [97, 33],   // 源头
    [104, 29],  // 宜宾
    [107, 30],  // 重庆
    [114, 30],  // 武汉
    [118, 32],  // 南京
    [122, 31],  // 上海入海
  ]);
}

/** 长城大致走向（西起嘉峪关，东至山海关） */
export function greatWallPath(): string {
  return linePath([
    [98, 40],   // 嘉峪关
    [106, 40],  // 银川北
    [112, 41],  // 大同
    [115, 41],  // 居庸关
    [119, 40],  // 山海关
  ]);
}

/** 关键历史城市（永久标记，不只都城） */
export interface KeyCity {
  name: string;
  pos: [number, number];
  /** 简短历史标签 */
  label: string;
}

export const keyCities: KeyCity[] = [
  { name: '长安', pos: [109, 34], label: '十三朝古都' },
  { name: '洛阳', pos: [112, 34], label: '九朝古都' },
  { name: '北京', pos: [116, 39], label: '元明清都' },
  { name: '南京', pos: [118, 32], label: '六朝古都' },
  { name: '成都', pos: [104, 30], label: '蜀汉都城' },
];

// ──────────────────────────────────────────────
// 朝代 → region 古名映射表
// 仅覆盖 dynastyMapData 中 13 个朝代各自高亮的 regionIds
// 非高亮区域用 region.aliases[0] 作为 fallback 古名
// ──────────────────────────────────────────────

export const dynastyRegionAlias: Record<string, Record<string, string>> = {
  '夏': {
    henan: '豫州',
    shanxi: '冀州',
    shaanxi: '雍州',
  },
  '商': {
    henan: '殷',
    shandong: '东夷',
    hebei: '北殷',
    anhui: '淮夷',
  },
  '周': {
    shaanxi: '关中',
    henan: '洛邑',
    shanxi: '晋',
    hubei: '荆楚',
    anhui: '淮夷',
    jiangsu: '徐夷',
  },
  '秦': {
    shaanxi: '内史',
    gansu: '陇西',
    shanxi: '河东',
    henan: '三川',
    hubei: '南郡',
    hunan: '黔中',
    sichuan: '巴蜀',
  },
  '西汉': {
    shaanxi: '三辅',
    gansu: '凉州',
    henan: '司隶',
    shanxi: '并州',
    sichuan: '益州',
    hebei: '冀州',
    shandong: '青州',
    hubei: '荆州',
    anhui: '徐州',
    jiangsu: '徐州',
    qinghai: '西海',
  },
  '东汉': {
    shaanxi: '司隶',
    gansu: '凉州',
    henan: '司隶',
    shanxi: '并州',
    sichuan: '益州',
    hebei: '冀州',
    shandong: '青州',
    hubei: '荆州',
    anhui: '徐州',
    jiangsu: '徐州',
    jiangxi: '豫章',
    hunan: '荆州',
    qinghai: '西海',
  },
  '南北朝': {
    jiangsu: '南徐州',
    anhui: '南豫州',
    hubei: '郢州',
    hunan: '湘州',
    sichuan: '益州',
    zhejiang: '东扬州',
    fujian: '闽州',
    guangdong: '广州',
    shaanxi: '雍州',
    gansu: '秦州',
    henan: '洛州',
    shanxi: '并州',
    hebei: '定州',
    shandong: '青州',
    qinghai: '吐谷浑',
  },
  '唐': {
    shaanxi: '关内道',
    gansu: '陇右道',
    xinjiang: '安西都护府',
    henan: '河南道',
    shanxi: '河东道',
    hebei: '河北道',
    shandong: '河南道',
    sichuan: '剑南道',
    hubei: '山南道',
    hunan: '江南道',
    jiangxi: '江南道',
    fujian: '江南道',
    guangdong: '岭南道',
    jiangsu: '江南道',
    anhui: '河南道',
    zhejiang: '江南东道',
  },
  '五代十国': {
    henan: '京畿',
    shanxi: '河东',
    hebei: '成德',
    shandong: '平卢',
    shaanxi: '京兆',
    jiangsu: '吴',
    anhui: '吴',
    hubei: '荆南',
    hunan: '楚',
    sichuan: '蜀',
    zhejiang: '吴越',
    fujian: '闽',
    guangdong: '南汉',
    guangxi: '南汉',
    jiangxi: '南唐',
  },
  '宋': {
    henan: '京畿路',
    shanxi: '河东路',
    hebei: '河北路',
    shandong: '京东路',
    sichuan: '利州路',
    hubei: '荆湖北路',
    hunan: '荆湖南路',
    jiangxi: '江南西路',
    fujian: '福建路',
    guangdong: '广南东路',
    guangxi: '广南西路',
    jiangsu: '两浙路',
    anhui: '江南东路',
    zhejiang: '两浙路',
    guizhou: '夔州路',
  },
  '元': {
    heilongjiang: '辽阳行省',
    jilin: '辽阳行省',
    liaoning: '辽阳行省',
    'inner-mongolia': '岭北行省',
    shaanxi: '陕西行省',
    gansu: '甘肃行省',
    xinjiang: '察合台',
    qinghai: '宣政院',
    tibet: '宣政院',
    henan: '河南江北行省',
    shanxi: '山西行省',
    hebei: '中书省',
    shandong: '中书省',
    sichuan: '四川行省',
    yunnan: '云南行省',
    guizhou: '湖广行省',
    hubei: '河南江北行省',
    hunan: '湖广行省',
    jiangxi: '江西行省',
    fujian: '江浙行省',
    guangdong: '江西行省',
    guangxi: '湖广行省',
    jiangsu: '江浙行省',
    anhui: '河南江北行省',
    zhejiang: '江浙行省',
    taiwan: '琉球',
  },
  '明': {
    heilongjiang: '奴儿干都司',
    jilin: '奴儿干都司',
    liaoning: '辽东都司',
    'inner-mongolia': '鞑靼',
    shaanxi: '陕西布政司',
    gansu: '陕西布政司',
    qinghai: '西番',
    henan: '河南布政司',
    shanxi: '山西布政司',
    hebei: '北直隶',
    shandong: '山东布政司',
    sichuan: '四川布政司',
    yunnan: '云南布政司',
    guizhou: '贵州布政司',
    hubei: '湖广布政司',
    hunan: '湖广布政司',
    jiangxi: '江西布政司',
    fujian: '福建布政司',
    guangdong: '广东布政司',
    guangxi: '广西布政司',
    jiangsu: '南直隶',
    anhui: '南直隶',
    zhejiang: '浙江布政司',
    taiwan: '东番',
  },
  '清': {
    heilongjiang: '黑龙江将军',
    jilin: '吉林将军',
    liaoning: '奉天将军',
    'inner-mongolia': '内蒙古',
    xinjiang: '新疆省',
    qinghai: '青海',
    tibet: '西藏',
    shaanxi: '陕西省',
    gansu: '甘肃省',
    henan: '河南省',
    shanxi: '山西省',
    hebei: '直隶省',
    shandong: '山东省',
    sichuan: '四川省',
    yunnan: '云南省',
    guizhou: '贵州省',
    hubei: '湖北省',
    hunan: '湖南省',
    jiangxi: '江西省',
    fujian: '福建省',
    guangdong: '广东省',
    guangxi: '广西省',
    jiangsu: '江苏省',
    anhui: '安徽省',
    zhejiang: '浙江省',
    taiwan: '台湾省',
  },
};

/**
 * 取某朝代下某 region 的古名
 * 优先：朝代映射表 → region.aliases[0] → region.name
 */
export function getRegionAlias(dynasty: string, regionId: string, fallbackAliases: string[] | undefined, fallbackName: string): string {
  return dynastyRegionAlias[dynasty]?.[regionId]
    || fallbackAliases?.[0]
    || fallbackName;
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
    dynastyName: '南北朝',
    regionIds: ['jiangsu', 'anhui', 'hubei', 'hunan', 'sichuan', 'zhejiang', 'fujian', 'guangdong', 'shaanxi', 'gansu', 'henan', 'shanxi', 'hebei', 'shandong', 'qinghai'],
    period: '420年—589年',
    capitalPos: [118, 32],
    capitalName: '建康/平城/洛阳',
  },
  {
    dynastyName: '唐',
    regionIds: ['shaanxi', 'gansu', 'xinjiang', 'henan', 'shanxi', 'hebei', 'shandong', 'sichuan', 'hubei', 'hunan', 'jiangxi', 'fujian', 'guangdong', 'jiangsu', 'anhui', 'zhejiang'],
    period: '618年—907年',
    capitalPos: [109, 34],
    capitalName: '长安',
  },
  {
    dynastyName: '五代十国',
    regionIds: ['henan', 'shanxi', 'hebei', 'shandong', 'shaanxi', 'jiangsu', 'anhui', 'hubei', 'hunan', 'sichuan', 'zhejiang', 'fujian', 'guangdong', 'guangxi', 'jiangxi'],
    period: '907年—960年',
    capitalPos: [114, 34],
    capitalName: '开封',
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
