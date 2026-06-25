/**
 * 朝代名片生成器
 * 根据朝代信息和用户学习数据生成名片卡片配置
 */

export interface DynastyCardProfile {
  dynastyId: string;
  dynastyName: string;
  period: string;          // 国祚时间
  capital: string;         // 都城
  foundingEmperor: string; // 开国皇帝
  peakEvent: string;       // 代表事件
  tagline: string;         // 一句话概述
  sealStyle: string;       // 印章风格描述
  colorPrimary: string;    // 主色
  colorSecondary: string;  // 辅色
  learnedEvents: number;   // 已学习事件数
  totalEvents: number;     // 总事件数
  quizCorrect: number;     // 答题正确数
  quizTotal: number;       // 答题总数
  userName: string;        // 用户名
  generatedAt: string;     // 生成时间
}

/** 名片模板数据 */
export const DYNASTY_CARD_TEMPLATES: Record<string, Omit<DynastyCardProfile, 'learnedEvents' | 'totalEvents' | 'quizCorrect' | 'quizTotal' | 'userName' | 'generatedAt'>> = {
  xia: {
    dynastyId: 'xia',
    dynastyName: '夏',
    period: '约前2070—前1600',
    capital: '阳城',
    foundingEmperor: '大禹',
    peakEvent: '大禹治水',
    tagline: '华夏肇始，治水定邦',
    sealStyle: '古朴浑厚',
    colorPrimary: '#8B7355',
    colorSecondary: '#D4C5A9',
  },
  shang: {
    dynastyId: 'shang',
    dynastyName: '商',
    period: '约前1600—前1046',
    capital: '殷',
    foundingEmperor: '汤',
    peakEvent: '盘庚迁殷',
    tagline: '青铜辉煌，甲骨铭文',
    sealStyle: '鼎铭庄严',
    colorPrimary: '#2D5016',
    colorSecondary: '#A0522D',
  },
  zhou: {
    dynastyId: 'zhou',
    dynastyName: '周',
    period: '前1046—前256',
    capital: '镐京/洛邑',
    foundingEmperor: '周武王',
    peakEvent: '牧野之战',
    tagline: '礼乐制度，华夏根基',
    sealStyle: '礼器端庄',
    colorPrimary: '#4A4A4A',
    colorSecondary: '#C0C0C0',
  },
  qin: {
    dynastyId: 'qin',
    dynastyName: '秦',
    period: '前221—前207',
    capital: '咸阳',
    foundingEmperor: '秦始皇',
    peakEvent: '秦统一六国',
    tagline: '一统天下，千古帝制',
    sealStyle: '小篆方正',
    colorPrimary: '#1A1A2E',
    colorSecondary: '#C41E3A',
  },
  han: {
    dynastyId: 'han',
    dynastyName: '汉',
    period: '前206—220',
    capital: '长安/洛阳',
    foundingEmperor: '刘邦',
    peakEvent: '张骞通西域',
    tagline: '汉族之名，丝路之源',
    sealStyle: '隶书舒展',
    colorPrimary: '#B22222',
    colorSecondary: '#FFD700',
  },
  threeKingdoms: {
    dynastyId: 'threeKingdoms',
    dynastyName: '三国',
    period: '220—280',
    capital: '洛阳/成都/建业',
    foundingEmperor: '曹丕/刘备/孙权',
    peakEvent: '赤壁之战',
    tagline: '英雄辈出，三分天下',
    sealStyle: '兵符锐利',
    colorPrimary: '#2F4F4F',
    colorSecondary: '#708090',
  },
  jin: {
    dynastyId: 'jin',
    dynastyName: '晋',
    period: '265—420',
    capital: '洛阳/建康',
    foundingEmperor: '司马炎',
    peakEvent: '永嘉之乱',
    tagline: '风流清谈，衣冠南渡',
    sealStyle: '行书飘逸',
    colorPrimary: '#5F9EA0',
    colorSecondary: '#E0E0E0',
  },
  sui: {
    dynastyId: 'sui',
    dynastyName: '隋',
    period: '581—618',
    capital: '大兴',
    foundingEmperor: '杨坚',
    peakEvent: '开凿大运河',
    tagline: '运河贯通，科举初兴',
    sealStyle: '楷书端正',
    colorPrimary: '#556B2F',
    colorSecondary: '#BDB76B',
  },
  tang: {
    dynastyId: 'tang',
    dynastyName: '唐',
    period: '618—907',
    capital: '长安',
    foundingEmperor: '李渊',
    peakEvent: '贞观之治',
    tagline: '盛世华章，万国来朝',
    sealStyle: '牡丹雍容',
    colorPrimary: '#DAA520',
    colorSecondary: '#8B4513',
  },
  song: {
    dynastyId: 'song',
    dynastyName: '宋',
    period: '960—1279',
    capital: '开封/临安',
    foundingEmperor: '赵匡胤',
    peakEvent: '靖康之变',
    tagline: '文化巅峰，市井繁华',
    sealStyle: '青瓷温润',
    colorPrimary: '#5F9EA0',
    colorSecondary: '#E6E6FA',
  },
  yuan: {
    dynastyId: 'yuan',
    dynastyName: '元',
    period: '1271—1368',
    capital: '大都',
    foundingEmperor: '忽必烈',
    peakEvent: '蒙古西征',
    tagline: '草原帝国，横跨欧亚',
    sealStyle: '蒙文奔放',
    colorPrimary: '#3CB371',
    colorSecondary: '#F5F5DC',
  },
  ming: {
    dynastyId: 'ming',
    dynastyName: '明',
    period: '1368—1644',
    capital: '南京/北京',
    foundingEmperor: '朱元璋',
    peakEvent: '郑和下西洋',
    tagline: '万里长城，七下西洋',
    sealStyle: '龙纹威严',
    colorPrimary: '#CD853F',
    colorSecondary: '#FFD700',
  },
  qing: {
    dynastyId: 'qing',
    dynastyName: '清',
    period: '1644—1912',
    capital: '北京',
    foundingEmperor: '顺治',
    peakEvent: '康乾盛世',
    tagline: '最后王朝，古今交汇',
    sealStyle: '缠枝繁复',
    colorPrimary: '#4169E1',
    colorSecondary: '#FFD700',
  },
};
