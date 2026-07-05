/**
 * 剧集映射数据（听书 × 看剧 × 史馆三联）
 * 按朝代组织国产历史剧、评分、勘误摘要、关联史馆页面
 * @see ITERATIONS.md #86
 */

import { AUDIOBOOK_CHAPTERS, type AudiobookChapter } from './audiobookChapters';

/** 剧集类型 */
export type DramaType = 'historical' | 'modern_adaptation' | 'documentary';

/** 剧集条目 */
export interface DramaMapping {
  /** 剧集 ID */
  id: string;
  /** 剧名 */
  title: string;
  /** 类型 */
  type: DramaType;
  /** 豆瓣评分 */
  doubanRating: number;
  /** 上映年份 */
  year: number;
  /** 集数 */
  episodes: number;
  /** 导演 */
  director?: string;
  /** 主演 */
  cast: string[];
  /** 涵盖朝代 */
  dynasties: string[];
  /** 优先级 */
  priority: 'essential' | 'recommended' | 'optional';
  /** 核心看点 */
  highlights: string[];
  /** 关联事件 UID（史馆事件） */
  matchedEventUids: string[];
  /** 关联人物 UID（史馆人物） */
  matchedPersonUids: string[];
  /** 史实勘误摘要 */
  factCheckSummaries: FactCheckSummary[];
  /** 对应听书章节 ID */
  audiobookChapterIds: string[];
  /** 推荐观看顺序 */
  watchOrder: number;
}

/** 史实勘误摘要 */
export interface FactCheckSummary {
  /** 剧集情节 */
  dramaClaim: string;
  /** 真实史实 */
  historicalFact: string;
  /** 性质 */
  nature: 'fiction' | 'exaggeration' | 'inversion' | 'omission';
  /** 详细说明 */
  explanation: string;
}

/** 朝代 Bundle — 听书+影视+史馆页面的整合 */
export interface DynastyMediaBundle {
  /** 朝代 */
  dynasty: string;
  /** 听书章节 */
  chapters: AudiobookChapter[];
  /** 剧集列表 */
  dramas: DramaMapping[];
  /** 推荐观看顺序 */
  watchOrder: string[];
}

/**
 * 各朝代剧集映射
 */
export const DRAMA_MAPPINGS: DramaMapping[] = [
  {
    id: 'drama-spring-autumn',
    title: '东周列国·春秋篇',
    type: 'historical',
    doubanRating: 9.6,
    year: 1996,
    episodes: 30,
    director: '孙树培',
    cast: [],
    dynasties: ['周'],
    priority: 'essential',
    highlights: ['春秋五霸争霸史', '诸子百家思想启蒙', '礼崩乐坏的时代变迁'],
    matchedEventUids: ['event-spring-autumn-huan-gong', 'event-goujian-woxin'],
    matchedPersonUids: ['person-kongzi', 'person-qihuangong', 'person-goujian'],
    factCheckSummaries: [
      {
        dramaClaim: '孔子周游列国十四年，每到一国都被重用',
        historicalFact: '孔子周游列国十四年，多数未被采纳，仅短暂在卫国任职',
        nature: 'exaggeration',
        explanation: '戏剧需要突出孔子的影响力，实际上他的主张在当时并未被广泛接受',
      },
    ],
    audiobookChapterIds: ['ch-spring-autumn'],
    watchOrder: 1,
  },
  {
    id: 'drama-qin',
    title: '大秦帝国',
    type: 'historical',
    doubanRating: 8.8,
    year: 2009,
    episodes: 75,
    cast: ['孙俪', '王志飞', '宁静'],
    dynasties: ['秦'],
    priority: 'essential',
    highlights: ['四部曲完整呈现秦国崛起', '商鞅变法深度刻画', '嬴政统一六国'],
    matchedEventUids: ['event-shangyang-bianfa', 'event-changping', 'event-qin-unify'],
    matchedPersonUids: ['person-shangyang', 'person-baiqi', 'person-yingzheng'],
    factCheckSummaries: [
      {
        dramaClaim: '商鞅变法得到秦孝公全力支持和百姓拥护',
        historicalFact: '商鞅变法遭到旧贵族强烈反对，秦孝公死后商鞅被车裂',
        nature: 'exaggeration',
        explanation: '剧集强化了变法的正面影响，弱化了当时激烈的阶级斗争',
      },
    ],
    audiobookChapterIds: ['ch-warring-states'],
    watchOrder: 2,
  },
  {
    id: 'drama-chuhansheng',
    title: '楚汉风云',
    type: 'historical',
    doubanRating: 8.2,
    year: 2005,
    episodes: 28,
    cast: [],
    dynasties: ['秦', '汉'],
    priority: 'essential',
    highlights: ['楚汉相争全景', '鸿门宴经典再现'],
    matchedEventUids: ['event-hongmenyan', 'event-bawang-bieji', 'event-han-gaozu-found'],
    matchedPersonUids: ['person-liubang', 'person-xiangyu', 'person-hanxin'],
    factCheckSummaries: [],
    audiobookChapterIds: ['ch-qin-han'],
    watchOrder: 3,
  },
  {
    id: 'drama-hanwu',
    title: '汉武大帝',
    type: 'historical',
    doubanRating: 9.3,
    year: 2005,
    episodes: 43,
    director: '胡玫',
    cast: ['陈宝国'],
    dynasties: ['汉'],
    priority: 'essential',
    highlights: ['汉武帝一生功业', '卫青霍去病北伐匈奴', '巫蛊之祸悲剧'],
    matchedEventUids: ['event-weiqing-north', 'event-huozhu-bing', 'event-wugu'],
    matchedPersonUids: ['person-wudi', 'person-weiqing', 'person-huozhu', 'person-simqian'],
    factCheckSummaries: [
      {
        dramaClaim: '卫青霍去病几乎百战百胜',
        historicalFact: '卫青初期也有败绩，霍去病虽战绩辉煌但英年早逝（24岁）',
        nature: 'exaggeration',
        explanation: '戏剧效果需要强化英雄形象，但基本战略方向符合史实',
      },
    ],
    audiobookChapterIds: ['ch-qin-han'],
    watchOrder: 4,
  },
  {
    id: 'drama-sanguo',
    title: '三国演义',
    type: 'historical',
    doubanRating: 9.6,
    year: 1994,
    episodes: 84,
    director: '王扶林',
    cast: ['鲍国安', '唐国强', '孙彦军'],
    dynasties: ['三国'],
    priority: 'essential',
    highlights: ['经典名著改编巅峰', '三国鼎立全景展现'],
    matchedEventUids: ['event-huangjin', 'event-guandu', 'event-chibi', 'event-san-guo-gui-jin'],
    matchedPersonUids: ['person-caocao', 'person-zhuge', 'person-liubei', 'person-sunquan'],
    factCheckSummaries: [
      {
        dramaClaim: '关羽使用青龙偃月刀单刀赴会',
        historicalFact: '青龙偃月刀在关羽死后才出现，三国时期没有这种兵器',
        nature: 'fiction',
        explanation: '后世小说和戏曲的艺术加工，影响了大众对三国兵器的认知',
      },
      {
        dramaClaim: '诸葛亮借东风呼风唤雨',
        historicalFact: '借东风是利用气象规律的巧合，并非法术',
        nature: 'exaggeration',
        explanation: '实际是诸葛亮精通天文地理，能预判天气变化',
      },
    ],
    audiobookChapterIds: ['ch-three-kingdoms'],
    watchOrder: 5,
  },
  {
    id: 'drama-zhenguan',
    title: '贞观之治',
    type: 'historical',
    doubanRating: 9.3,
    year: 2006,
    episodes: 37,
    director: '张建亚',
    cast: ['马景涛'],
    dynasties: ['唐'],
    priority: 'essential',
    highlights: ['李世民治国理政全过程', '贞观之治盛世再现'],
    matchedEventUids: ['event-xuanwumen', 'event-zhenguan-zhi-zhi', 'event-wei-zheng-jian'],
    matchedPersonUids: ['person-li Shimin', 'person-wei-zheng', 'person-fang-xuanling'],
    factCheckSummaries: [
      {
        dramaClaim: '魏征频繁当面顶撞李世民且从未遇险',
        historicalFact: '李世民虽纳谏但并非毫无怒意，曾有杀魏征之念',
        nature: 'exaggeration',
        explanation: '剧集美化了君臣关系，但整体符合贞观政治清明基调',
      },
    ],
    audiobookChapterIds: ['ch-sui-tang'],
    watchOrder: 6,
  },
  {
    id: 'drama-qingping-le',
    title: '清平乐',
    type: 'historical',
    doubanRating: 8.6,
    year: 2020,
    episodes: 73,
    director: '张开宙',
    cast: ['任嘉伦', '窦骁'],
    dynasties: ['宋'],
    priority: 'essential',
    highlights: ['北宋仁宗朝政治与文化', '宋词美学视觉化'],
    matchedEventUids: ['event-qingli-xinzheng', 'event-fan-zhongyan', 'su-shi-jinshi'],
    matchedPersonUids: ['person-zhaoxu', 'person-fan-zhongyan', 'person-baozheng', 'person-su-shi'],
    factCheckSummaries: [
      {
        dramaClaim: '大量篇幅描写仁宗感情生活',
        historicalFact: '宋仁宗在正史中感情记载较少，婚姻政治色彩浓厚',
        nature: 'fiction',
        explanation: '剧集为增强观赏性虚构了大量情感线',
      },
    ],
    audiobookChapterIds: ['ch-song'],
    watchOrder: 7,
  },
  {
    id: 'drama-daming-huiyong',
    title: '大明王朝1566',
    type: 'historical',
    doubanRating: 9.8,
    year: 2007,
    episodes: 46,
    director: '张黎',
    cast: ['陈宝国', '黄志忠', '王庆祥', '倪大红'],
    dynasties: ['明'],
    priority: 'essential',
    highlights: ['中国历史剧巅峰之作', '嘉靖朝政治生态全景', '海瑞上疏震撼人心'],
    matchedEventUids: ['jiajing-daoxiu', 'hairui-shuzhu', 'qijiguang-kanwei', 'huzongxian-dushi'],
    matchedPersonUids: ['person-jiajing', 'person-hairui', 'person-huzongxian', 'person-qi-jiiguang'],
    factCheckSummaries: [
      {
        dramaClaim: '海瑞上《治安疏》前买好棺材、遣散家僮',
        historicalFact: '史载海瑞确实做了后事安排，但细节有艺术加工',
        nature: 'exaggeration',
        explanation: '大体符合史实精神，体现了海瑞刚直不阿的品质',
      },
    ],
    audiobookChapterIds: ['ch-ming'],
    watchOrder: 8,
  },
  {
    id: 'drama-kangxi',
    title: '康熙王朝',
    type: 'historical',
    doubanRating: 8.0,
    year: 2001,
    episodes: 42,
    director: '陈家林',
    cast: ['陈道明'],
    dynasties: ['清'],
    priority: 'essential',
    highlights: ['康熙一生功业', '擒鳌拜平三藩收台湾'],
    matchedEventUids: ['qin-aobai', 'ping-sanfan', 'shou-taiwan'],
    matchedPersonUids: ['person-kangxi', 'person-ao-bai', 'person-wu-guifan'],
    factCheckSummaries: [],
    audiobookChapterIds: ['ch-qing'],
    watchOrder: 9,
  },
  {
    id: 'drama-yongzheng',
    title: '雍正王朝',
    type: 'historical',
    doubanRating: 9.2,
    year: 1999,
    episodes: 44,
    director: '胡玫',
    cast: ['唐国强'],
    dynasties: ['清'],
    priority: 'essential',
    highlights: ['雍正改革与九子夺嫡', '摊丁入亩火耗归公'],
    matchedEventUids: ['yongzheng-tanding', 'huohao-gong'],
    matchedPersonUids: ['person-yongzheng', 'person-yintuan', 'person-liu-tongcheng'],
    factCheckSummaries: [],
    audiobookChapterIds: ['ch-qing'],
    watchOrder: 10,
  },
  {
    id: 'drama-zouxiang-gonghe',
    title: '走向共和',
    type: 'historical',
    doubanRating: 9.7,
    year: 2003,
    episodes: 52,
    director: '张黎',
    cast: ['王冰', '吕中', '孙淳', '盖丽丽'],
    dynasties: ['清', '民国'],
    priority: 'essential',
    highlights: ['晚清到民国的完整历史', '多视角还原历史人物'],
    matchedEventUids: ['opium-war', 'yangwu', 'jiawu-war', 'wuxu-reform', 'xinhai-revolution'],
    matchedPersonUids: ['person-lihongzhang', 'person-cixi', 'person-yuan-shikai', 'person-sunzhongshan'],
    factCheckSummaries: [
      {
        dramaClaim: '李鸿章被塑造为相对正面的外交家',
        historicalFact: '李鸿章既有洋务运动贡献，也有签订不平等条约的屈辱',
        nature: 'inversion',
        explanation: '该剧试图还原李鸿章的多面性，挑战了传统负面评价，引发广泛争议',
      },
    ],
    audiobookChapterIds: ['ch-qing'],
    watchOrder: 11,
  },
  {
    id: 'drama-baipianyuan',
    title: '白鹿原',
    type: 'modern_adaptation',
    doubanRating: 8.8,
    year: 2017,
    episodes: 52,
    director: '刘进',
    cast: ['张嘉译', '秦海璐', '段奕宏'],
    dynasties: ['清', '民国'],
    priority: 'recommended',
    highlights: ['关中宗族半个世纪变迁', '陕籍双壁之一'],
    matchedEventUids: [],
    matchedPersonUids: [],
    factCheckSummaries: [],
    audiobookChapterIds: [],
    watchOrder: 12,
  },
  {
    id: 'drama-pingfande-shijie',
    title: '平凡的世界',
    type: 'modern_adaptation',
    doubanRating: 9.0,
    year: 2015,
    episodes: 49,
    director: '毛卫宁',
    cast: ['王雷', '佟丽娅'],
    dynasties: ['民国', '当代'],
    priority: 'recommended',
    highlights: ['路遥茅奖原著', '陕北黄土上的奋斗史'],
    matchedEventUids: [],
    matchedPersonUids: [],
    factCheckSummaries: [],
    audiobookChapterIds: [],
    watchOrder: 13,
  },
  {
    id: 'drama-changan-12-hours',
    title: '长安十二时辰',
    type: 'historical',
    doubanRating: 8.2,
    year: 2019,
    episodes: 36,
    director: '曹盾',
    cast: ['雷佳音', '易烊千玺'],
    dynasties: ['唐'],
    priority: 'optional',
    highlights: ['盛唐长安上元节24小时反恐', '极高还原度唐风市井'],
    matchedEventUids: [],
    matchedPersonUids: [],
    factCheckSummaries: [],
    audiobookChapterIds: ['ch-sui-tang'],
    watchOrder: 14,
  },
];

/**
 * 按朝代获取剧集
 */
export function getDramasByDynasty(dynasty: string): DramaMapping[] {
  return DRAMA_MAPPINGS.filter((d) => d.dynasties.includes(dynasty)).sort((a, b) => a.watchOrder - b.watchOrder);
}

/**
 * 获取所有有剧集的朝代列表
 */
export function getDynastiesWithDramas(): string[] {
  const set = new Set<string>();
  DRAMA_MAPPINGS.forEach((d) => d.dynasties.forEach((dy) => set.add(dy)));
  return Array.from(set).sort();
}

/**
 * 获取朝代媒体 Bundle（听书+剧集+勘误）
 */
export function getMediaBundleByDynasty(dynasty: string): DynastyMediaBundle {
  const chapters = AUDIOBOOK_CHAPTERS.filter((ch) => ch.dynasty.includes(dynasty) || ch.dynasty === dynasty);
  const dramas = getDramasByDynasty(dynasty);

  return {
    dynasty,
    chapters,
    dramas,
    watchOrder: dramas.map((d) => d.title),
  };
}

/**
 * 获取所有剧集（按评分排序）
 */
export function getAllDramasSortedByRating(): DramaMapping[] {
  return [...DRAMA_MAPPINGS].sort((a, b) => b.doubanRating - a.doubanRating);
}

/**
 * 按优先级筛选
 */
export function getDramasByPriority(priority: DramaMapping['priority']): DramaMapping[] {
  return DRAMA_MAPPINGS.filter((d) => d.priority === priority);
}
