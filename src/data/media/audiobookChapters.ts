/**
 * 听书章节数据（来自 history-backend/123.md）
 * 《中华上下五千年》音频节目对应历史朝代章节映射
 * @see ITERATIONS.md #86
 */

export interface AudiobookChapter {
  /** 章节 ID */
  id: string;
  /** 章节标题 */
  title: string;
  /** 所属历史阶段 */
  period: string;
  /** 朝代标签 */
  dynasty: string;
  /** 音频时长（分钟） */
  durationMin: number;
  /** 关键人物 */
  keyFigures: string[];
  /** 关键事件 */
  keyEvents: string[];
  /** 对应影视列表 */
  relatedDramas: DramaEntry[];
}

export interface DramaEntry {
  /** 剧名 */
  title: string;
  /** 豆瓣评分 */
  doubanRating: number;
  /** 年份 */
  year: number;
  /** 必看程度 */
  priority: 'essential' | 'recommended' | 'optional';
  /** 主演 */
  cast: string[];
  /** 核心看点 */
  highlights: string[];
  /** 对应史实事件 */
  historicalEvents: string[];
}

export interface FactCheckEntry {
  /** 影视剧名 */
  dramaTitle: string;
  /** 剧集情节（可能虚构） */
  dramaPlot: string;
  /** 真实史实 */
  historicalFact: string;
  /** 严重程度：虚构/夸大/颠倒 */
  severity: 'fiction' | 'exaggeration' | 'inversion';
  /** 说明 */
  note: string;
}

/**
 * 各朝代听书章节
 */
export const AUDIOBOOK_CHAPTERS: AudiobookChapter[] = [
  {
    id: 'ch-spring-autumn',
    title: '春秋篇：礼崩乐坏与百家争鸣',
    period: '春秋',
    dynasty: '周',
    durationMin: 45,
    keyFigures: ['齐桓公', '晋文公', '孔子', '老子', '勾践'],
    keyEvents: ['齐桓公称霸', '退避三舍', '卧薪尝胆', '孔子周游列国'],
    relatedDramas: [
      {
        title: '东周列国·春秋篇',
        doubanRating: 9.6,
        year: 1996,
        priority: 'essential',
        cast: [],
        highlights: ['还原春秋五霸争霸史', '诸子百家思想启蒙'],
        historicalEvents: ['齐桓公称霸', '退避三舍', '勾践灭吴'],
      },
    ],
  },
  {
    id: 'ch-warring-states',
    title: '战国篇：变法图强与合纵连横',
    period: '战国',
    dynasty: '秦',
    durationMin: 50,
    keyFigures: ['商鞅', '张仪', '白起', '嬴政', '孟尝君'],
    keyEvents: ['商鞅变法', '长平之战', '张仪连横', '嬴政灭六国'],
    relatedDramas: [
      {
        title: '大秦帝国' ,
        doubanRating: 8.8,
        year: 2009,
        priority: 'essential',
        cast: ['孙俪', '王志飞'],
        highlights: ['四部曲完整呈现秦国崛起史'],
        historicalEvents: ['商鞅变法', '长平之战', '嬴政统一六国'],
      },
    ],
  },
  {
    id: 'ch-qin-han',
    title: '秦汉篇：大一统帝国的建立',
    period: '秦末汉初',
    dynasty: '秦/汉',
    durationMin: 55,
    keyFigures: ['刘邦', '项羽', '韩信', '汉武帝', '司马迁'],
    keyEvents: ['鸿门宴', '霸王别姬', '汉武北伐', '巫蛊之祸'],
    relatedDramas: [
      {
        title: '楚汉风云',
        doubanRating: 8.2,
        year: 2005,
        priority: 'essential',
        cast: [],
        highlights: ['楚汉相争全景再现'],
        historicalEvents: ['鸿门宴', '霸王别姬', '韩信点兵'],
      },
      {
        title: '汉武大帝',
        doubanRating: 9.3,
        year: 2005,
        priority: 'essential',
        cast: ['陈宝国'],
        highlights: ['汉武帝一生功过'],
        historicalEvents: ['卫青霍去病北伐', '司马迁写史记', '巫蛊之祸'],
      },
    ],
  },
  {
    id: 'ch-three-kingdoms',
    title: '三国篇：英雄辈出的时代',
    period: '东汉-三国',
    dynasty: '三国',
    durationMin: 60,
    keyFigures: ['曹操', '诸葛亮', '刘备', '孙权', '司马懿'],
    keyEvents: ['黄巾起义', '官渡之战', '赤壁之战', '三国归晋'],
    relatedDramas: [
      {
        title: '三国演义',
        doubanRating: 9.6,
        year: 1994,
        priority: 'essential',
        cast: ['鲍国安', '唐国强'],
        highlights: ['经典名著改编巅峰之作'],
        historicalEvents: ['黄巾起义', '官渡之战', '赤壁之战', '三国归晋'],
      },
    ],
  },
  {
    id: 'ch-sui-tang',
    title: '隋唐篇：盛世华章',
    period: '隋唐',
    dynasty: '唐',
    durationMin: 50,
    keyFigures: ['李世民', '魏征', '武则天', '李白', '杨玉环'],
    keyEvents: ['玄武门之变', '贞观之治', '安史之乱', '黄巢起义'],
    relatedDramas: [
      {
        title: '贞观之治',
        doubanRating: 9.3,
        year: 2006,
        priority: 'essential',
        cast: [],
        highlights: ['李世民治国理政全过程'],
        historicalEvents: ['玄武门之变', '贞观之治', '魏征直谏'],
      },
    ],
  },
  {
    id: 'ch-song',
    title: '宋朝篇：文治巅峰与山河破碎',
    period: '北宋',
    dynasty: '宋',
    durationMin: 45,
    keyFigures: ['赵匡胤', '范仲淹', '包拯', '苏轼', '王安石'],
    keyEvents: ['陈桥兵变', '庆历新政', '王安石变法', '靖康之变'],
    relatedDramas: [
      {
        title: '清平乐',
        doubanRating: 8.6,
        year: 2020,
        priority: 'essential',
        cast: ['任嘉伦', '窦骁'],
        highlights: ['北宋仁宗朝的政治与文化'],
        historicalEvents: ['庆历新政', '范仲淹新政', '苏轼科举'],
      },
    ],
  },
  {
    id: 'ch-ming',
    title: '明朝篇：专制与变革',
    period: '明代',
    dynasty: '明',
    durationMin: 55,
    keyFigures: ['嘉靖帝', '海瑞', '胡宗宪', '戚继光', '张居正'],
    keyEvents: ['嘉靖修道', '海瑞上疏', '戚继光抗倭', '张居正改革'],
    relatedDramas: [
      {
        title: '大明王朝1566',
        doubanRating: 9.8,
        year: 2007,
        priority: 'essential',
        cast: ['陈宝国', '黄志忠', '王庆祥'],
        highlights: ['中国历史剧巅峰之作'],
        historicalEvents: ['嘉靖修道', '海瑞上治安疏', '戚继光抗倭', '胡宗宪督师'],
      },
    ],
  },
  {
    id: 'ch-qing',
    title: '清朝篇：从康乾到崩塌',
    period: '清',
    dynasty: '清',
    durationMin: 60,
    keyFigures: ['康熙', '雍正', '乾隆', '李鸿章', '慈禧', '袁世凯'],
    keyEvents: ['擒鳌拜', '平三藩', '摊丁入亩', '鸦片战争', '戊戌变法', '辛亥革命'],
    relatedDramas: [
      {
        title: '康熙王朝',
        doubanRating: 8.0,
        year: 2001,
        priority: 'essential',
        cast: ['陈道明'],
        highlights: ['康熙一生功业'],
        historicalEvents: ['擒鳌拜', '平三藩', '收台湾'],
      },
      {
        title: '雍正王朝',
        doubanRating: 9.2,
        year: 1999,
        priority: 'essential',
        cast: ['唐国强'],
        highlights: ['雍正改革与夺嫡之争'],
        historicalEvents: ['摊丁入亩', '火耗归公'],
      },
      {
        title: '走向共和',
        doubanRating: 9.7,
        year: 2003,
        priority: 'essential',
        cast: ['王冰', '吕中', '孙淳'],
        highlights: ['晚清到民国的完整历史'],
        historicalEvents: ['鸦片战争', '洋务运动', '甲午战争', '戊戌变法', '辛亥革命'],
      },
    ],
  },
];

/**
 * 各朝代影视勘误（fact check）
 */
export const DRAMA_FACT_CHECKS: Record<string, FactCheckEntry[]> = {
  '三国演义': [
    {
      dramaTitle: '三国演义',
      dramaPlot: '关羽单刀赴会时已有青龙偃月刀',
      historicalFact: '青龙偃月刀在关羽死后才出现，三国时期没有这种兵器',
      severity: 'fiction',
      note: '小说和电视剧的艺术加工',
    },
    {
      dramaTitle: '三国演义',
      dramaPlot: '诸葛亮借东风 truly 呼风唤雨',
      historicalFact: '借东风是利用气象规律的巧合，并非法术',
      severity: 'exaggeration',
      note: '实际是诸葛亮精通天文地理',
    },
  ],
  '大明王朝1566': [
    {
      dramaTitle: '大明王朝1566',
      dramaPlot: '海瑞上《治安疏》前已安排好后事买好棺材',
      historicalFact: '史载海瑞确实买了棺材、遣散家僮，但细节有艺术加工',
      severity: 'exaggeration',
      note: '大体符合史实精神',
    },
  ],
  '汉武大帝': [
    {
      dramaTitle: '汉武大帝',
      dramaPlot: '卫青霍去病几乎百战百胜无一败绩',
      historicalFact: '卫青初期也有败绩，霍去病虽战绩辉煌但英年早逝',
      severity: 'exaggeration',
      note: '戏剧效果需要强化英雄形象',
    },
  ],
  '走向共和': [
    {
      dramaTitle: '走向共和',
      dramaPlot: '李鸿章被描绘为相对正面的外交家',
      historicalFact: '李鸿章既有洋务运动贡献，也有签订不平等条约的屈辱',
      severity: 'fiction',
      note: '该剧试图还原李鸿章的多面性，但引发争议',
    },
  ],
  '贞观之治': [
    {
      dramaTitle: '贞观之治',
      dramaPlot: '魏征频繁当面顶撞李世民且未遭杀身',
      historicalFact: '李世民虽纳谏但并非毫无怒意，剧中关系有所美化',
      severity: 'exaggeration',
      note: '整体符合贞观君臣关系基调',
    },
  ],
};

/**
 * 按朝代获取听书章节
 */
export function getChaptersByDynasty(dynasty: string): AudiobookChapter[] {
  return AUDIOBOOK_CHAPTERS.filter((ch) => ch.dynasty.includes(dynasty) || ch.dynasty === dynasty);
}

/**
 * 获取所有章节标题（用于听书列表）
 */
export function getAllChapterTitles(): string[] {
  return AUDIOBOOK_CHAPTERS.map((ch) => `[${ch.period}] ${ch.title}`);
}

/**
 * 按朝代获取影视勘误
 */
export function getFactChecksByDrama(dramaTitle: string): FactCheckEntry[] {
  return DRAMA_FACT_CHECKS[dramaTitle] || [];
}

/**
 * 获取所有有勘误数据的剧集名
 */
export function getDramasWithFactChecks(): string[] {
  return Object.keys(DRAMA_FACT_CHECKS);
}
