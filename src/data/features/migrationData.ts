/**
 * 历史人口迁徙数据 — 核心迁徙事件
 * @see history-museum/design/002-innovation-brainstorm.md §20
 *
 * 数据来源：基于历史文献和学术研究整理
 * 坐标使用经纬度（与 TerritoryMapPage 一致）
 */

export interface MigrationRoute {
  /** 起点 */
  from: { name: string; lng: number; lat: number };
  /** 终点 */
  to: { name: string; lng: number; lat: number };
  /** 途经点（可选） */
  waypoints?: { name: string; lng: number; lat: number }[];
}

export interface MigrationEvent {
  id: string;
  title: string;
  emoji: string;
  /** 发生年份 */
  year: number;
  yearDisplay: string;
  /** 朝代 */
  dynasty: string;
  /** 迁徙类型 */
  type: 'war-flee' | 'policy' | 'disaster' | 'economic';
  /** 迁徙规模（万人） */
  scale: number;
  /** 迁徙路线 */
  routes: MigrationRoute[];
  /** 背景原因 */
  cause: string;
  /** 历史影响 */
  impact: string;
  /** 详细描述 */
  description: string;
}

export const MIGRATION_EVENTS: MigrationEvent[] = [
  {
    id: 'yongjia-nandu',
    title: '永嘉南渡',
    emoji: '🌊',
    year: 311,
    yearDisplay: '公元311年',
    dynasty: '东晋',
    type: 'war-flee',
    scale: 90,
    routes: [
      {
        from: { name: '洛阳', lng: 112.4, lat: 34.6 },
        to: { name: '建康(南京)', lng: 118.8, lat: 32.1 },
        waypoints: [{ name: '南阳', lng: 112.5, lat: 33.0 }, { name: '襄阳', lng: 112.1, lat: 32.0 }],
      },
      {
        from: { name: '长安', lng: 108.9, lat: 34.3 },
        to: { name: '成都', lng: 104.1, lat: 30.7 },
      },
    ],
    cause: '永嘉之乱，匈奴刘聪攻破洛阳，俘虏晋怀帝。北方大乱，士族百姓纷纷南逃。',
    impact: '中国历史上第一次大规模人口南迁。北方士族将中原文化、技术带到江南，奠定了南方经济文化中心的基础。江南从此开始大开发。',
    description: '永嘉之乱后，中原士族"衣冠南渡"，以王导为首的北方士族拥立司马睿建立东晋。约90万人口南迁，占当时北方人口的八分之一。这次南迁深刻改变了中国经济文化格局，南方从此崛起。',
  },
  {
    id: 'anshi-nanqian',
    title: '安史之乱南迁',
    emoji: '⚔️',
    year: 755,
    yearDisplay: '公元755-763年',
    dynasty: '唐',
    type: 'war-flee',
    scale: 150,
    routes: [
      {
        from: { name: '长安', lng: 108.9, lat: 34.3 },
        to: { name: '扬州', lng: 119.4, lat: 32.4 },
        waypoints: [{ name: '襄阳', lng: 112.1, lat: 32.0 }, { name: '荆州', lng: 112.2, lat: 30.3 }],
      },
      {
        from: { name: '洛阳', lng: 112.4, lat: 34.6 },
        to: { name: '杭州', lng: 120.2, lat: 30.3 },
      },
      {
        from: { name: '汴州(开封)', lng: 114.3, lat: 34.8 },
        to: { name: '广州', lng: 113.3, lat: 23.1 },
      },
    ],
    cause: '安禄山、史思明叛乱，攻陷洛阳、长安。北方战乱八年，百姓大规模南逃。',
    impact: '中国第二次大规模人口南迁。南方人口首次超过北方，经济重心开始南移。李白、杜甫等文人亦随难民南迁，南方文化空前繁荣。',
    description: '安史之乱是唐朝由盛转衰的转折点，也是中国人口格局的转折点。约150万人南迁，江南成为新的经济文化中心。"赋之所出，江淮居多"，南方正式超越北方成为经济重心。',
  },
  {
    id: 'jingkang-nandu',
    title: '靖康南渡',
    emoji: '🏹',
    year: 1127,
    yearDisplay: '公元1127年',
    dynasty: '南宋',
    type: 'war-flee',
    scale: 500,
    routes: [
      {
        from: { name: '开封', lng: 114.3, lat: 34.8 },
        to: { name: '临安(杭州)', lng: 120.2, lat: 30.3 },
        waypoints: [{ name: '商丘', lng: 115.6, lat: 34.4 }, { name: '扬州', lng: 119.4, lat: 32.4 }],
      },
      {
        from: { name: '开封', lng: 114.3, lat: 34.8 },
        to: { name: '广州', lng: 113.3, lat: 23.1 },
        waypoints: [{ name: '武汉', lng: 114.3, lat: 30.6 }],
      },
      {
        from: { name: '太原', lng: 112.5, lat: 37.9 },
        to: { name: '成都', lng: 104.1, lat: 30.7 },
      },
    ],
    cause: '金兵攻破开封，俘虏宋徽宗、宋钦宗。北宋灭亡，赵构南渡建立南宋。',
    impact: '中国第三次也是规模最大的人口南迁。约500万人南迁，南方人口彻底压倒北方。南宋经济文化达到巅峰，江南成为世界最繁荣地区。',
    description: '靖康之变后，"中原士民，扶携南渡，不知其几千万人"。这是中国历史上规模最大的一次人口南迁，彻底完成了经济重心南移。南宋虽偏安一隅，却创造了空前繁荣的商品经济和灿烂文化。',
  },
  {
    id: 'huguang-tianchuangou',
    title: '湖广填四川',
    emoji: '🌾',
    year: 1680,
    yearDisplay: '清初康熙年间',
    dynasty: '清',
    type: 'policy',
    scale: 600,
    routes: [
      {
        from: { name: '武汉', lng: 114.3, lat: 30.6 },
        to: { name: '成都', lng: 104.1, lat: 30.7 },
        waypoints: [{ name: '宜昌', lng: 111.3, lat: 30.7 }, { name: '重庆', lng: 106.5, lat: 29.6 }],
      },
      {
        from: { name: '长沙', lng: 112.9, lat: 28.2 },
        to: { name: '重庆', lng: 106.5, lat: 29.6 },
      },
      {
        from: { name: '广州', lng: 113.3, lat: 23.1 },
        to: { name: '成都', lng: 104.1, lat: 30.7 },
      },
    ],
    cause: '明末清初战乱（张献忠屠川、三藩之乱），四川人口锐减至不足10万。清政府鼓励移民入川垦荒。',
    impact: '约600万人从湖广（湖北湖南）、广东、江西等地迁入四川，使四川人口从不足10万恢复到数千万。奠定了近代四川人口格局，客家文化传入四川。',
    description: '"湖广填四川"是中国历史上规模最大的政府主导移民运动。经历张献忠之乱和三藩之乱，四川"弥望千里，绝无人烟"。康熙下诏鼓励移民，湖广百姓沿长江入川，"填四川"持续百余年，彻底改变了四川的人口与文化面貌。',
  },
  {
    id: 'zouxikou',
    title: '走西口',
    emoji: '🏔️',
    year: 1700,
    yearDisplay: '清代中后期',
    dynasty: '清',
    type: 'economic',
    scale: 400,
    routes: [
      {
        from: { name: '晋北(忻州)', lng: 112.7, lat: 38.4 },
        to: { name: '包头', lng: 109.8, lat: 40.6 },
        waypoints: [{ name: '杀虎口', lng: 111.8, lat: 39.9 }],
      },
      {
        from: { name: '陕北(榆林)', lng: 109.7, lat: 38.3 },
        to: { name: '呼和浩特', lng: 111.7, lat: 40.8 },
      },
    ],
    cause: '山西陕西人多地少，土地贫瘠。清政府放宽边禁，允许汉人进入蒙古地区垦荒经商。',
    impact: '约400万晋陕百姓北上蒙古垦殖经商，开发了内蒙古河套地区，促进了蒙汉交融。晋商由此崛起，"汇通天下"的票号金融体系由此诞生。',
    description: '"走西口"与"闯关东""下南洋"并称近代三大移民潮。山西人经杀虎口、陕西人经榆林北上蒙古，垦荒种地、经商贸易。持续两百年的迁徙造就了包头、呼和浩特等城市，也孕育了影响深远的晋商文化。',
  },
  {
    id: 'chuangguandong',
    title: '闯关东',
    emoji: '❄️',
    year: 1860,
    yearDisplay: '清末至民国',
    dynasty: '清/民国',
    type: 'economic',
    scale: 3000,
    routes: [
      {
        from: { name: '山东(烟台)', lng: 121.4, lat: 37.5 },
        to: { name: '大连', lng: 121.6, lat: 38.9 },
      },
      {
        from: { name: '河北(沧州)', lng: 116.8, lat: 38.3 },
        to: { name: '沈阳', lng: 123.4, lat: 41.8 },
        waypoints: [{ name: '山海关', lng: 119.8, lat: 40.0 }],
      },
      {
        from: { name: '山东(青岛)', lng: 120.4, lat: 36.1 },
        to: { name: '哈尔滨', lng: 126.5, lat: 45.8 },
      },
    ],
    cause: '黄河下游连年灾荒，山东河北百姓生计困难。清政府1860年放开东北封禁，允许关内百姓出关垦荒。',
    impact: '约3000万山东、河北百姓迁入东北，是中国近代规模最大的移民运动。开发了广袤的东北黑土地，奠定了东北人口格局，传播了中原文化。',
    description: '"闯关东"是中国近代史上规模最大的人口迁徙。从1860年清政府开禁到1931年九一八事变，约3000万关内百姓"闯"过山海关或渡海到东北垦荒。山东人占七成以上，"东北话"本质上是山东方言的变体。这次迁徙彻底开发了东北，也改变了中国的经济版图。',
  },
  {
    id: 'xiananyang',
    title: '下南洋',
    emoji: '🚢',
    year: 1850,
    yearDisplay: '清末至民国',
    dynasty: '清/民国',
    type: 'economic',
    scale: 2000,
    routes: [
      {
        from: { name: '福建(厦门)', lng: 118.1, lat: 24.5 },
        to: { name: '新加坡', lng: 103.8, lat: 1.4 },
      },
      {
        from: { name: '广东(广州)', lng: 113.3, lat: 23.1 },
        to: { name: '吉隆坡', lng: 101.7, lat: 3.1 },
      },
      {
        from: { name: '广东(潮州)', lng: 116.6, lat: 23.4 },
        to: { name: '曼谷', lng: 100.5, lat: 13.8 },
      },
      {
        from: { name: '海南(海口)', lng: 110.3, lat: 20.0 },
        to: { name: '雅加达', lng: 106.8, lat: -6.2 },
      },
    ],
    cause: '清末战乱、人口压力、西方殖民者招募华工。东南沿海百姓出洋谋生，俗称"猪仔贸易"。',
    impact: '约2000万华人下南洋，分布于东南亚各国。华人成为东南亚经济的重要力量，也将中华文化传播到南洋。今日东南亚华人约5000万，是海外华人最大群体。',
    description: '"下南洋"持续百余年，福建、广东、海南百姓远渡重洋到东南亚谋生。早期多为契约华工（"猪仔"），后期为自由移民。华人勤劳智慧，逐渐掌控东南亚商业命脉，陈嘉庚、胡文虎等华侨巨商由此崛起。今日东南亚5000万华人，是这次大迁徙的遗产。',
  },
];

/** 迁徙类型标签 */
export const MIGRATION_TYPE_LABELS: Record<string, { label: string; color: string; emoji: string }> = {
  'war-flee': { label: '战乱迁徙', color: '#dc2626', emoji: '⚔️' },
  'policy': { label: '政策移民', color: '#0891b2', emoji: '📜' },
  'disaster': { label: '灾害迁徙', color: '#d97706', emoji: '🌪️' },
  'economic': { label: '经济迁徙', color: '#059669', emoji: '💰' },
};
