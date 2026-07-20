/**
 * 古代交通时间地图数据
 * 包含各个朝代的交通发展、路线和交通工具
 */

export interface TransportRoute {
  id: string;
  name: string;
  start: string;
  end: string;
  duration: string;
  distance: string;
  description: string;
  mainMethod: string;
  keyStops: string[];
  historicalSignificance: string;
  timeline: string;
}

export interface TransportEra {
  id: string;
  dynasty: string;
  era: string;
  description: string;
  transportation: {
    methods: string[];
    infrastructure: string[];
    routes: string[];
  };
  notableEvents: string[];
  culturalImpact: string;
}

/**
 * 主要交通路线
 */
export const TRANSPORT_ROUTES: TransportRoute[] = [
  {
    id: 'route-001',
    name: '丝绸之路',
    start: '长安',
    end: '罗马',
    duration: '约2年',
    distance: '约12,000公里',
    description: '连接东西方文明的经济贸易大动脉，丝绸、瓷器、茶叶与西方的玻璃、金银、香料交换',
    mainMethod: '驼队商路',
    keyStops: ['长安', '敦煌', '楼兰', '撒马尔罕', '波斯', '安条克', '罗马'],
    historicalSignificance: '促进了东西方文化的交流与融合，是古代世界最伟大的贸易路线',
    timeline: '公元前138年（张骞通西域）'
  },
  {
    id: 'route-002',
    name: '大运河',
    start: '北京',
    end: '杭州',
    duration: '数月',
    distance: '约1,800公里',
    description: '连接海河、黄河、淮河、长江、钱塘江五大水系的人工运河，是中国古代最伟大的水利工程之一',
    mainMethod: '漕运船只',
    keyStops: ['北京', '天津', '沧州', '德州', '济宁', '徐州', '扬州', '苏州', '杭州'],
    historicalSignificance: '加强了南北经济文化交流，促进了国家统一和经济发展',
    timeline: '公元605-610年（隋炀帝开凿）'
  },
  {
    id: 'route-003',
    name: '茶马古道',
    start: '成都',
    end: '拉萨',
    duration: '约1个月',
    distance: '约2,000公里',
    description: '连接四川、云南与西藏的古代商路，以运输茶叶和马匹为主，也涉及食盐、药材等商品',
    mainMethod: '马帮商队',
    keyStops: ['成都', '雅安', '康定', '理塘', '巴塘', '昌都', '拉萨'],
    historicalSignificance: '促进了边疆地区的经济发展，加强了汉族与藏族的文化交流',
    timeline: '唐代开始形成，明清时期最繁荣'
  },
  {
    id: 'route-004',
    name: '万里长城',
    start: '山海关',
    end: '嘉峪关',
    duration: '步行约3个月',
    distance: '约6,000公里',
    description: '中国古代的军事防御工程，连接起东西方，是古代交通与军事的结合体',
    mainMethod: '兵马骑兵',
    keyStops: ['山海关', '居庸关', '雁门关', '嘉峪关'],
    historicalSignificance: '是中国古代工程的奇迹，见证了中华民族的历史变迁',
    timeline: '秦始皇统一六国后开始修建'
  },
  {
    id: 'route-005',
    name: '西南官道',
    start: '昆明',
    end: '拉萨',
    duration: '约1个月',
    distance: '约1,500公里',
    description: '连接云南、四川与西藏的重要官道，是古代西南地区的重要交通干线',
    mainMethod: '马帮和步行',
    keyStops: ['昆明', '大理', '丽江', '中甸', '香格里拉', '德钦', '拉萨'],
    historicalSignificance: '促进了边疆地区的开发，加强了中央政府对西南的治理',
    timeline: '元代正式成为官道'
  },
  {
    id: 'route-006',
    name: '灵渠',
    start: '桂林',
    end: '广州',
    duration: '约1周',
    distance: '约30公里',
    description: '连接湘江和漓江的古代水利工程，是古代水路交通的重要枢纽',
    mainMethod: '船只运输',
    keyStops: ['兴安', '灵渠口', '漓江', '广州'],
    historicalSignificance: '加强了中原与岭南地区的联系，促进了岭南的开发',
    timeline: '秦始皇时期开凿'
  },
  {
    id: 'route-007',
    name: '滇越铁路',
    start: '昆明',
    end: '河内',
    duration: '约1周',
    distance: '约1,000公里',
    description: '中国最早的跨国铁路之一，连接中国云南与越南河内，是近代交通的里程碑',
    mainMethod: '火车',
    keyStops: ['昆明', '蒙自', '河口', '河内'],
    historicalSignificance: '标志着中国近代交通的发展，促进了对外开放',
    timeline: '1910年通车'
  }
];

/**
 * 交通时代数据
 */
export const TRANSPORT_ERAS: TransportEra[] = [
  {
    id: 'era-001',
    dynasty: '商代',
    era: '公元前1600-前1046年',
    description: '商代是中国古代交通的早期阶段，交通工具主要依靠人力和畜力',
    transportation: {
      methods: ['步行', '牛车', '马车', '舟船'],
      infrastructure: ['简单道路', '水路'],
      routes: ['商王巡游路线', '朝贡路线']
    },
    notableEvents: [
      '商王定期巡游各地，了解民情',
      '建立商道，连接商王都城与各地'
    ],
    culturalImpact: '交通的发展促进了商代各地的交流，形成了初步的商文化圈'
  },
  {
    id: 'era-002',
    dynasty: '周代',
    era: '公元前1046-前256年',
    description: '周代建立了完善的道路交通系统，奠定了中国古代交通的基础',
    transportation: {
      methods: ['马车', '牛车', '舟船', '骑马'],
      infrastructure: ['周道', '驿站系统', '桥梁'],
      routes: ['周天子的巡游路线', '各诸侯国的贡道']
    },
    notableEvents: [
      '周公制定《周礼》，建立驿站系统',
      '修建"周道"，连接各诸侯国',
      '开始使用驿站传递军情'
    ],
    culturalImpact: '交通网络的形成促进了周礼的传播，加强了中央集权'
  },
  {
    id: 'era-003',
    dynasty: '秦代',
    era: '公元前221-前207年',
    description: '秦代是中国古代交通发展的里程碑，秦始皇统一后建立了统一的道路交通系统',
    transportation: {
      methods: ['马车', '牛车', '舟船', '步卒'],
      infrastructure: ['驰道', '直道', '栈道', '灵渠'],
      routes: ['京师巡游路线', '通往边疆的道路']
    },
    notableEvents: [
      '秦始皇修筑驰道，车同轨',
      '开凿灵渠，连接湘江与漓江',
      '修筑直道，连接咸阳与北方边境',
      '建立驿站系统，传递公文'
    ],
    culturalImpact: '统一的道路交通促进了秦朝的治理，加速了统一的进程'
  },
  {
    id: 'era-004',
    dynasty: '汉代',
    era: '公元前202-公元220年',
    description: '汉代交通达到新的高度，丝绸之路的开辟使中国交通走向世界',
    transportation: {
      methods: ['马车', '牛车', '舟船', '骆驼队'],
      infrastructure: ['丝绸之路', '驿站系统', '桥梁', '堤坝'],
      routes: ['丝绸之路', '茶马古道早期', '通往西域的道路']
    },
    notableEvents: [
      '张骞通西域，开辟丝绸之路',
      '建立更加完善的驿站系统',
      '修筑关中地区的水利交通工程',
      '大力发展海上丝绸之路'
    ],
    culturalImpact: '丝绸之路的开辟使中国与西方建立直接联系，促进了文化交融'
  },
  {
    id: 'era-005',
    dynasty: '唐代',
    era: '公元618-907年',
    description: '唐代交通达到古代中国的高峰，丝绸之路繁荣，大运河畅通',
    transportation: {
      methods: ['马车', '牛车', '舟船', '马帮', '骑马'],
      infrastructure: ['大运河', '丝绸之路', '驿站系统', '桥梁', '驿馆'],
      routes: ['大运河', '丝绸之路', '茶马古道', '通往印度的道路']
    },
    notableEvents: [
      '大运河的畅通，南北经济文化交流',
      '丝绸之路的鼎盛时期',
      '建立完善的驿站系统，"驿马"制度',
      '海上丝绸之路的发展'
    ],
    culturalImpact: '交通的发达促进了唐文化的繁荣，使长安成为世界性都市'
  },
  {
    id: 'era-006',
    dynasty: '宋代',
    era: '公元960-1279年',
    description: '宋代交通更加精细化，水路交通占据重要地位，驿站系统更加完善',
    transportation: {
      methods: ['马车', '牛车', '舟船', '马帮', '轿子'],
      infrastructure: ['大运河', '内河水运', '桥梁', '驿站系统', '水驿'],
      routes: ['大运河', '江淮航线', '福建沿海航线', '海上丝绸之路']
    },
    notableEvents: [
      '大运河的全面疏浚',
      '建立水驿系统，水路交通发达',
      '海上贸易航线的发展',
      '城市交通的改善'
    ],
    culturalImpact: '水路交通的发展促进了商业繁荣，使宋代经济达到新高度'
  },
  {
    id: 'era-007',
    dynasty: '元代',
    era: '公元1271-1368年',
    description: '元代建立了横跨欧亚的大帝国，交通网络空前扩展',
    transportation: {
      methods: ['马车', '牛车', '舟船', '马帮', '骑马', '骆驼'],
      infrastructure: ['驿站系统', '大运河', '驿路', '桥梁'],
      routes: ['大运河', '蒙古驿路', '通往欧洲的驿路']
    },
    notableEvents: [
      '建立更加庞大的驿站系统',
      '大运河的再次疏浚',
      '蒙古驿路连接欧亚大陆',
      '海上丝绸之路的繁荣'
    ],
    culturalImpact: '横跨欧亚的交通网络促进了元朝的统一和多民族融合'
  },
  {
    id: 'era-008',
    dynasty: '明代',
    era: '公元1368-1644年',
    description: '明代交通系统更加完善，长城和驿站系统达到古代最高水平',
    transportation: {
      methods: ['马车', '牛车', '舟船', '轿子', '马帮'],
      infrastructure: ['万里长城', '驿站系统', '大运河', '桥梁', '码头'],
      routes: ['大运河', '丝绸之路', '茶马古道', '海上航线']
    },
    notableEvents: [
      '修建万里长城',
      '大运河的全面治理',
      '建立更加完善的驿站系统',
      '郑和下西洋，开辟海上航线'
    ],
    culturalImpact: '交通的发展加强了中央对边疆的控制，使明朝疆域更加稳固'
  },
  {
    id: 'era-009',
    dynasty: '清代',
    era: '公元1644-1912年',
    description: '清代交通更加现代化，铁路、轮船等新式交通工具开始出现',
    transportation: {
      methods: ['马车', '牛车', '舟船', '轿子', '马帮', '火车', '轮船'],
      infrastructure: ['驿站系统', '大运河', '桥梁', '码头', '铁路'],
      routes: ['大运河', '长江航线', '黄河航线', '铁路线']
    },
    notableEvents: [
      '大运河的继续疏浚',
      '洋务运动，修建铁路',
      '建立近代邮政系统',
      '轮船运输的发展'
    ],
    culturalImpact: '新式交通工具的出现标志着中国从古代向近代交通的过渡'
  }
];

/**
 * 根据ID获取路线信息
 */
export const getRouteById = (id: string): TransportRoute | undefined => {
  return TRANSPORT_ROUTES.find(route => route.id === id);
};

/**
 * 根据ID获取时代信息
 */
export const getEraById = (id: string): TransportEra | undefined => {
  return TRANSPORT_ERAS.find(era => era.id === id);
};

/**
 * 获取某个朝代的交通信息
 */
export const getEraByDynasty = (dynasty: string): TransportEra | undefined => {
  return TRANSPORT_ERAS.find(era => era.dynasty === dynasty);
};

/**
 * 按年代排序
 */
export const sortErasByTimeline = (eras: TransportEra[]): TransportEra[] => {
  return eras.sort((a, b) => {
    const [yearA] = a.era.split('-').map(s => parseInt(s) || 0);
    const [yearB] = b.era.split('-').map(s => parseInt(s) || 0);
    return yearA - yearB;
  });
};

/* ─── 节点图 + 速度系数 ─── */

/** 城市节点 */
export interface CityNode {
  id: string;
  name: string;
  dynasty: string;
  /** 经度（东经为正），用于路径地图定位 */
  lng: number;
  /** 纬度（北纬为正），用于路径地图定位 */
  lat: number;
}

/** 边权重 */
export interface EdgeWeight {
  /** 天数 */
  days: number;
  /** 距离（公里） */
  distanceKm: number;
  /** 该朝代的速度系数（1.0 = 基准） */
  speedFactor: number;
}

/** 相邻城市映射 */
export interface AdjacencyEntry {
  target: string;
  weight: EdgeWeight;
}

/** 图结构 */
export interface TransportGraph {
  nodes: CityNode[];
  adjacency: Record<string, AdjacencyEntry[]>;
}

/** 路径结果 */
export interface PathResult {
  route: string[];
  totalDays: number;
  totalDistanceKm: number;
  speedFactor: number;
  dynasty: string;
}

/**
 * 古代交通图数据
 * 基于已知路线提取城市节点和边权重
 */
export const TRANSPORT_GRAPH: TransportGraph = {
  nodes: [
    { id: 'chang-an', name: '长安', dynasty: '汉', lng: 108.95, lat: 34.27 },
    { id: 'luoyang', name: '洛阳', dynasty: '汉', lng: 112.45, lat: 34.62 },
    { id: 'da-yi-shang', name: '大邑商', dynasty: '商', lng: 114.35, lat: 36.10 },
    { id: 'xian-yang', name: '咸阳', dynasty: '秦', lng: 108.72, lat: 34.36 },
    { id: 'tai-yuan', name: '太原', dynasty: '晋', lng: 112.55, lat: 37.87 },
    { id: 'jin-cheng', name: '金城', dynasty: '汉', lng: 103.83, lat: 36.06 },
    { id: 'du-juan', name: '敦煌', dynasty: '汉', lng: 94.66, lat: 40.14 },
    { id: 'li-jiang', name: '楼兰', dynasty: '汉', lng: 90.17, lat: 40.51 },
    { id: 'sa-ma', name: '撒马尔罕', dynasty: '唐', lng: 66.97, lat: 39.65 },
    { id: 'bo-si', name: '波斯', dynasty: '唐', lng: 44.58, lat: 33.09 },
    { id: 'an-tiao', name: '安条克', dynasty: '唐', lng: 36.17, lat: 36.20 },
    { id: 'luo-ma', name: '罗马', dynasty: '汉', lng: 12.50, lat: 41.90 },
    { id: 'bai-tou', name: '北京', dynasty: '清', lng: 116.40, lat: 39.90 },
    { id: 'tian-jin', name: '天津', dynasty: '清', lng: 117.20, lat: 39.13 },
    { id: 'de-zhou', name: '德州', dynasty: '元', lng: 116.36, lat: 37.45 },
    { id: 'ji-nan', name: '济南', dynasty: '元', lng: 117.00, lat: 36.65 },
    { id: 'xu-zhou', name: '徐州', dynasty: '元', lng: 117.18, lat: 34.26 },
    { id: 'yang-zhou', name: '扬州', dynasty: '唐', lng: 119.42, lat: 32.39 },
    { id: 'su-zhou', name: '苏州', dynasty: '宋', lng: 120.62, lat: 31.30 },
    { id: 'hang-zhou', name: '杭州', dynasty: '宋', lng: 120.16, lat: 30.27 },
    { id: 'cheng-du', name: '成都', dynasty: '汉', lng: 104.07, lat: 30.67 },
    { id: 'ya-an', name: '雅安', dynasty: '唐', lng: 103.00, lat: 29.98 },
    { id: 'kang-ding', name: '康定', dynasty: '唐', lng: 101.96, lat: 30.05 },
    { id: 'li-tang', name: '理塘', dynasty: '唐', lng: 100.27, lat: 30.00 },
    { id: 'ba-tang', name: '巴塘', dynasty: '唐', lng: 99.11, lat: 30.01 },
    { id: 'chang-du', name: '昌都', dynasty: '唐', lng: 97.17, lat: 31.14 },
    { id: 'la-sa', name: '拉萨', dynasty: '唐', lng: 91.13, lat: 29.65 },
    { id: 'kun-ming', name: '昆明', dynasty: '元', lng: 102.83, lat: 24.88 },
    { id: 'da-li', name: '大理', dynasty: '元', lng: 100.22, lat: 25.59 },
    { id: 'gui-lin', name: '桂林', dynasty: '秦', lng: 110.30, lat: 25.27 },
    { id: 'guang-zhou', name: '广州', dynasty: '清', lng: 113.27, lat: 23.13 },
    { id: 'xing-an', name: '兴安', dynasty: '秦', lng: 110.67, lat: 25.61 },
    { id: 'shan-hai', name: '山海关', dynasty: '明', lng: 119.71, lat: 39.93 },
    { id: 'juyong', name: '居庸关', dynasty: '明', lng: 116.06, lat: 40.32 },
    { id: 'yan-men', name: '雁门关', dynasty: '汉', lng: 112.85, lat: 39.20 },
    { id: 'jia-yu', name: '嘉峪关', dynasty: '明', lng: 98.27, lat: 39.80 },
    { id: 'han-zhong', name: '汉中', dynasty: '汉', lng: 107.03, lat: 33.07 },
    { id: 'xiang-gan', name: '湘江', dynasty: '秦', lng: 112.93, lat: 28.23 },
    { id: 'li-jiang-gz', name: '漓江', dynasty: '秦', lng: 110.30, lat: 25.27 },
  ],
  adjacency: {
    'chang-an': [
      { target: 'luoyang', weight: { days: 7, distanceKm: 400, speedFactor: 1.0 } },
      { target: 'du-juan', weight: { days: 15, distanceKm: 1200, speedFactor: 0.8 } },
      { target: 'han-zhong', weight: { days: 5, distanceKm: 300, speedFactor: 0.7 } },
      { target: 'xian-yang', weight: { days: 1, distanceKm: 20, speedFactor: 1.0 } },
    ],
    'luoyang': [
      { target: 'chang-an', weight: { days: 7, distanceKm: 400, speedFactor: 1.0 } },
      { target: 'ji-nan', weight: { days: 5, distanceKm: 400, speedFactor: 1.0 } },
      { target: 'xu-zhou', weight: { days: 4, distanceKm: 350, speedFactor: 1.0 } },
    ],
    'xian-yang': [
      { target: 'chang-an', weight: { days: 1, distanceKm: 20, speedFactor: 1.0 } },
      { target: 'tai-yuan', weight: { days: 5, distanceKm: 400, speedFactor: 0.8 } },
      { target: 'jin-cheng', weight: { days: 4, distanceKm: 350, speedFactor: 0.8 } },
    ],
    'du-juan': [
      { target: 'chang-an', weight: { days: 15, distanceKm: 1200, speedFactor: 0.8 } },
      { target: 'li-jiang', weight: { days: 10, distanceKm: 800, speedFactor: 0.6 } },
      { target: 'sa-ma', weight: { days: 20, distanceKm: 1500, speedFactor: 0.5 } },
    ],
    'li-jiang': [
      { target: 'du-juan', weight: { days: 10, distanceKm: 800, speedFactor: 0.6 } },
      { target: 'sa-ma', weight: { days: 15, distanceKm: 1200, speedFactor: 0.5 } },
    ],
    'sa-ma': [
      { target: 'du-juan', weight: { days: 20, distanceKm: 1500, speedFactor: 0.5 } },
      { target: 'li-jiang', weight: { days: 15, distanceKm: 1200, speedFactor: 0.5 } },
      { target: 'bo-si', weight: { days: 15, distanceKm: 1000, speedFactor: 0.5 } },
    ],
    'bo-si': [
      { target: 'sa-ma', weight: { days: 15, distanceKm: 1000, speedFactor: 0.5 } },
      { target: 'an-tiao', weight: { days: 10, distanceKm: 800, speedFactor: 0.6 } },
    ],
    'an-tiao': [
      { target: 'bo-si', weight: { days: 10, distanceKm: 800, speedFactor: 0.6 } },
      { target: 'luo-ma', weight: { days: 15, distanceKm: 1200, speedFactor: 0.6 } },
    ],
    'luo-ma': [
      { target: 'an-tiao', weight: { days: 15, distanceKm: 1200, speedFactor: 0.6 } },
    ],
    'bai-tou': [
      { target: 'tian-jin', weight: { days: 1, distanceKm: 150, speedFactor: 1.0 } },
      { target: 'shan-hai', weight: { days: 2, distanceKm: 300, speedFactor: 0.8 } },
    ],
    'tian-jin': [
      { target: 'bai-tou', weight: { days: 1, distanceKm: 150, speedFactor: 1.0 } },
      { target: 'de-zhou', weight: { days: 2, distanceKm: 250, speedFactor: 1.0 } },
    ],
    'de-zhou': [
      { target: 'tian-jin', weight: { days: 2, distanceKm: 250, speedFactor: 1.0 } },
      { target: 'ji-nan', weight: { days: 2, distanceKm: 200, speedFactor: 1.0 } },
    ],
    'ji-nan': [
      { target: 'de-zhou', weight: { days: 2, distanceKm: 200, speedFactor: 1.0 } },
      { target: 'luoyang', weight: { days: 5, distanceKm: 400, speedFactor: 1.0 } },
    ],
    'hang-zhou': [
      { target: 'su-zhou', weight: { days: 2, distanceKm: 180, speedFactor: 1.0 } },
    ],
    'su-zhou': [
      { target: 'hang-zhou', weight: { days: 2, distanceKm: 180, speedFactor: 1.0 } },
      { target: 'yang-zhou', weight: { days: 3, distanceKm: 250, speedFactor: 1.0 } },
    ],
    'yang-zhou': [
      { target: 'su-zhou', weight: { days: 3, distanceKm: 250, speedFactor: 1.0 } },
      { target: 'xu-zhou', weight: { days: 3, distanceKm: 280, speedFactor: 1.0 } },
    ],
    'cheng-du': [
      { target: 'ya-an', weight: { days: 2, distanceKm: 100, speedFactor: 0.5 } },
      { target: 'han-zhong', weight: { days: 5, distanceKm: 350, speedFactor: 0.5 } },
    ],
    'ya-an': [
      { target: 'cheng-du', weight: { days: 2, distanceKm: 100, speedFactor: 0.5 } },
      { target: 'kang-ding', weight: { days: 3, distanceKm: 200, speedFactor: 0.4 } },
    ],
    'kang-ding': [
      { target: 'ya-an', weight: { days: 3, distanceKm: 200, speedFactor: 0.4 } },
      { target: 'li-tang', weight: { days: 4, distanceKm: 250, speedFactor: 0.3 } },
    ],
    'li-tang': [
      { target: 'kang-ding', weight: { days: 4, distanceKm: 250, speedFactor: 0.3 } },
      { target: 'ba-tang', weight: { days: 3, distanceKm: 200, speedFactor: 0.3 } },
    ],
    'ba-tang': [
      { target: 'li-tang', weight: { days: 3, distanceKm: 200, speedFactor: 0.3 } },
      { target: 'chang-du', weight: { days: 4, distanceKm: 300, speedFactor: 0.3 } },
    ],
    'chang-du': [
      { target: 'ba-tang', weight: { days: 4, distanceKm: 300, speedFactor: 0.3 } },
      { target: 'la-sa', weight: { days: 5, distanceKm: 400, speedFactor: 0.3 } },
    ],
    'la-sa': [
      { target: 'chang-du', weight: { days: 5, distanceKm: 400, speedFactor: 0.3 } },
      { target: 'kun-ming', weight: { days: 10, distanceKm: 800, speedFactor: 0.3 } },
    ],
    'kun-ming': [
      { target: 'la-sa', weight: { days: 10, distanceKm: 800, speedFactor: 0.3 } },
      { target: 'da-li', weight: { days: 3, distanceKm: 300, speedFactor: 0.5 } },
    ],
    'da-li': [
      { target: 'kun-ming', weight: { days: 3, distanceKm: 300, speedFactor: 0.5 } },
    ],
    'gui-lin': [
      { target: 'xing-an', weight: { days: 1, distanceKm: 30, speedFactor: 1.0 } },
      { target: 'guang-zhou', weight: { days: 7, distanceKm: 500, speedFactor: 0.8 } },
    ],
    'xing-an': [
      { target: 'gui-lin', weight: { days: 1, distanceKm: 30, speedFactor: 1.0 } },
      { target: 'li-jiang-gz', weight: { days: 1, distanceKm: 30, speedFactor: 1.0 } },
    ],
    'li-jiang-gz': [
      { target: 'xing-an', weight: { days: 1, distanceKm: 30, speedFactor: 1.0 } },
      { target: 'guang-zhou', weight: { days: 3, distanceKm: 200, speedFactor: 1.0 } },
    ],
    'guang-zhou': [
      { target: 'gui-lin', weight: { days: 7, distanceKm: 500, speedFactor: 0.8 } },
      { target: 'li-jiang-gz', weight: { days: 3, distanceKm: 200, speedFactor: 1.0 } },
    ],
    'shan-hai': [
      { target: 'bai-tou', weight: { days: 2, distanceKm: 300, speedFactor: 0.8 } },
      { target: 'juyong', weight: { days: 2, distanceKm: 250, speedFactor: 0.8 } },
    ],
    'juyong': [
      { target: 'shan-hai', weight: { days: 2, distanceKm: 250, speedFactor: 0.8 } },
      { target: 'yan-men', weight: { days: 3, distanceKm: 300, speedFactor: 0.7 } },
    ],
    'yan-men': [
      { target: 'juyong', weight: { days: 3, distanceKm: 300, speedFactor: 0.7 } },
      { target: 'jia-yu', weight: { days: 10, distanceKm: 800, speedFactor: 0.5 } },
    ],
    'jia-yu': [
      { target: 'yan-men', weight: { days: 10, distanceKm: 800, speedFactor: 0.5 } },
    ],
    'han-zhong': [
      { target: 'chang-an', weight: { days: 5, distanceKm: 300, speedFactor: 0.7 } },
      { target: 'cheng-du', weight: { days: 5, distanceKm: 350, speedFactor: 0.5 } },
    ],
    'xu-zhou': [
      { target: 'luoyang', weight: { days: 4, distanceKm: 350, speedFactor: 1.0 } },
      { target: 'yang-zhou', weight: { days: 3, distanceKm: 280, speedFactor: 1.0 } },
    ],
    'tai-yuan': [
      { target: 'xian-yang', weight: { days: 5, distanceKm: 400, speedFactor: 0.8 } },
      { target: 'yan-men', weight: { days: 3, distanceKm: 250, speedFactor: 0.7 } },
    ],
    'jin-cheng': [
      { target: 'xian-yang', weight: { days: 4, distanceKm: 350, speedFactor: 0.8 } },
      { target: 'jia-yu', weight: { days: 5, distanceKm: 400, speedFactor: 0.5 } },
    ],
  },
};

/** 朝代速度系数映射 */
export const DYNASTY_SPEED_FACTORS: Record<string, number> = {
  '商': 0.5,
  '周': 0.6,
  '秦': 0.8,
  '汉': 1.0,
  '唐': 1.2,
  '宋': 1.3,
  '元': 1.4,
  '明': 1.2,
  '清': 1.5,
};

/** 所有城市名称集合（用于输入校验） */
export const ALL_CITIES = Object.fromEntries(
  TRANSPORT_GRAPH.nodes.map(n => [n.name, n.id])
);

