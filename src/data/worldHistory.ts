/**
 * 中外时间轴对照数据
 * 展示同一时期中国朝代与世界文明的横向对照
 * @see history-museum/design/000-future-roadmap.md §方向二 §2.4
 */

export interface WorldEvent {
  year: number;
  yearDisplay: string;
  china: {
    dynasty: string;
    event: string;
  };
  world: {
    region: string;
    event: string;
  };
}

/** 中外对照事件（按时间顺序） */
export const WORLD_HISTORY: WorldEvent[] = [
  {
    year: -2070,
    yearDisplay: '约公元前2070年',
    china: {
      dynasty: '夏',
      event: '大禹建立夏朝，开启世袭制',
    },
    world: {
      region: '美索不达米亚',
      event: '苏美尔文明兴起，乌尔城邦建立',
    },
  },
  {
    year: -1750,
    yearDisplay: '约公元前1750年',
    china: {
      dynasty: '夏',
      event: '夏朝中期，二里头文化繁荣',
    },
    world: {
      region: '巴比伦',
      event: '汉谟拉比法典颁布，古巴比伦王国鼎盛',
    },
  },
  {
    year: -1046,
    yearDisplay: '公元前1046年',
    china: {
      dynasty: '周',
      event: '武王伐纣，牧野之战，西周建立',
    },
    world: {
      region: '地中海',
      event: '腓尼基人海上贸易兴盛，字母文字传播',
    },
  },
  {
    year: -551,
    yearDisplay: '公元前551年',
    china: {
      dynasty: '春秋',
      event: '孔子诞生，儒家思想奠基',
    },
    world: {
      region: '印度',
      event: '释迦牟尼佛诞生（约同时期），佛教兴起',
    },
  },
  {
    year: -490,
    yearDisplay: '公元前490年',
    china: {
      dynasty: '春秋',
      event: '吴越争霸，勾践卧薪尝胆',
    },
    world: {
      region: '希腊',
      event: '马拉松战役，希腊击退波斯入侵',
    },
  },
  {
    year: -336,
    yearDisplay: '公元前336年',
    china: {
      dynasty: '战国',
      event: '秦惠文王任用张仪连横，合纵瓦解',
    },
    world: {
      region: '希腊',
      event: '亚历山大大帝东征，建立横跨欧亚的帝国',
    },
  },
  {
    year: -221,
    yearDisplay: '公元前221年',
    china: {
      dynasty: '秦',
      event: '秦始皇统一六国，建立中央集权帝国',
    },
    world: {
      region: '罗马',
      event: '第二次布匿战争，罗马与迦太基争霸地中海',
    },
  },
  {
    year: -100,
    yearDisplay: '公元前100年',
    china: {
      dynasty: '西汉',
      event: '汉武帝时期，张骞通西域，开辟丝绸之路',
    },
    world: {
      region: '罗马',
      event: '恺撒崛起，罗马共和国走向帝国',
    },
  },
  {
    year: 100,
    yearDisplay: '公元100年',
    china: {
      dynasty: '东汉',
      event: '蔡伦改进造纸术，许慎著《说文解字》',
    },
    world: {
      region: '罗马',
      event: '图拉真皇帝在位，罗马帝国疆域达至巅峰',
    },
  },
  {
    year: 313,
    yearDisplay: '公元313年',
    china: {
      dynasty: '西晋',
      event: '八王之乱后，五胡乱华序幕',
    },
    world: {
      region: '罗马',
      event: '米兰敕令颁布，基督教在罗马合法化',
    },
  },
  {
    year: 618,
    yearDisplay: '公元618年',
    china: {
      dynasty: '唐',
      event: '李渊建立唐朝，开启大唐盛世',
    },
    world: {
      region: '阿拉伯',
      event: '穆罕默德传播伊斯兰教，阿拉伯帝国兴起',
    },
  },
  {
    year: 800,
    yearDisplay: '公元800年',
    china: {
      dynasty: '唐',
      event: '唐德宗时期，安史之乱后藩镇割据',
    },
    world: {
      region: '欧洲',
      event: '查理曼加冕为罗马皇帝，加洛林文艺复兴',
    },
  },
  {
    year: 1066,
    yearDisplay: '公元1066年',
    china: {
      dynasty: '北宋',
      event: '王安石变法前夕，司马光编纂《资治通鉴》',
    },
    world: {
      region: '英格兰',
      event: '黑斯廷斯战役，诺曼征服英格兰',
    },
  },
  {
    year: 1271,
    yearDisplay: '公元1271年',
    china: {
      dynasty: '元',
      event: '忽必烈建立元朝，马可波罗东游',
    },
    world: {
      region: '欧洲',
      event: '十字军第八次东征，路易九世去世',
    },
  },
  {
    year: 1492,
    yearDisplay: '公元1492年',
    china: {
      dynasty: '明',
      event: '弘治中兴前夕，明朝海禁政策延续',
    },
    world: {
      region: '欧洲',
      event: '哥伦布发现美洲新大陆，大航海时代开启',
    },
  },
  {
    year: 1640,
    yearDisplay: '公元1640年',
    china: {
      dynasty: '明',
      event: '李自成起义，明朝灭亡前夕',
    },
    world: {
      region: '英格兰',
      event: '英国资产阶级革命爆发，查理一世被处死',
    },
  },
  {
    year: 1789,
    yearDisplay: '公元1789年',
    china: {
      dynasty: '清',
      event: '乾隆帝驾崩前数年，盛世走向落幕',
    },
    world: {
      region: '法国',
      event: '法国大革命爆发，攻占巴士底狱',
    },
  },
  {
    year: 1868,
    yearDisplay: '公元1868年',
    china: {
      dynasty: '清',
      event: '洋务运动进行中，同治中兴',
    },
    world: {
      region: '日本',
      event: '明治维新开始，日本走上近代化道路',
    },
  },
  {
    year: 1949,
    yearDisplay: '公元1949年',
    china: {
      dynasty: '现代',
      event: '中华人民共和国成立',
    },
    world: {
      region: '世界',
      event: '北约成立，冷战格局形成',
    },
  },
];
