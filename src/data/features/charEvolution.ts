/**
 * 汉字演变数据
 * 常用汉字从甲骨文→金文→小篆→隶书→楷书的字形演变
 * SVG path 数据基于汉字字形轮廓的简化表示
 */

export interface CharEvolution {
  char: string;
  meaning: string;
  stages: CharStage[];
}

export interface CharStage {
  name: string;
  era: string;
  description: string;
  /** SVG path（简化字形轮廓） */
  svgPath: string;
}

export const CHAR_EVOLUTIONS: CharEvolution[] = [
  {
    char: '王',
    meaning: '国王、君主',
    stages: [
      {
        name: '甲骨文',
        era: '商（前14-11世纪）',
        description: '像一把大斧头，代表军事统帅的权力',
        svgPath: 'M30,10 L30,90 M10,30 L50,30 M10,70 L50,70',
      },
      {
        name: '金文',
        era: '西周（前10-8世纪）',
        description: '斧头形状更加圆润，底部加横线表示土地',
        svgPath: 'M30,15 L30,85 M15,35 L45,35 M10,75 L50,75',
      },
      {
        name: '小篆',
        era: '秦（前3世纪）',
        description: '三横一竖，结构趋于规整，线条圆润流畅',
        svgPath: 'M30,10 L30,90 M10,30 L50,30 M10,55 L50,55 M10,80 L50,80',
      },
      {
        name: '隶书',
        era: '汉（前2-2世纪）',
        description: '横线扁平，竖线缩短，蚕头燕尾特征明显',
        svgPath: 'M30,15 L30,85 M5,30 L55,30 M5,55 L55,55 M5,80 L55,80',
      },
      {
        name: '楷书',
        era: '魏晋至今（3世纪起）',
        description: '方正端庄，笔画分明，沿用至今的标准字形',
        svgPath: 'M30,12 L30,88 M8,30 L52,30 M8,55 L52,55 M8,80 L52,80',
      },
    ],
  },
  {
    char: '日',
    meaning: '太阳、日子',
    stages: [
      {
        name: '甲骨文',
        era: '商（前14-11世纪）',
        description: '圆圈中有一点，像太阳的样子',
        svgPath: 'M30,15 C45,15 50,30 50,45 C50,60 45,75 30,75 C15,75 10,60 10,45 C10,30 15,15 30,15 M30,30 L30,60',
      },
      {
        name: '金文',
        era: '西周（前10-8世纪）',
        description: '圆形更加规整，中心横线代替点',
        svgPath: 'M30,15 C45,15 50,30 50,45 C50,60 45,75 30,75 C15,75 10,60 10,45 C10,30 15,15 30,15 M15,45 L45,45',
      },
      {
        name: '小篆',
        era: '秦（前3世纪）',
        description: '变为长方形框内有横线',
        svgPath: 'M10,15 L50,15 L50,75 L10,75 Z M15,45 L45,45',
      },
      {
        name: '隶书',
        era: '汉（前2-2世纪）',
        description: '方形扁平化，横线加粗',
        svgPath: 'M8,20 L52,20 L52,70 L8,70 Z M12,45 L48,45',
      },
      {
        name: '楷书',
        era: '魏晋至今（3世纪起）',
        description: '标准方形日字，外框内横',
        svgPath: 'M10,15 L50,15 L50,80 L10,80 Z M15,47 L45,47',
      },
    ],
  },
  {
    char: '人',
    meaning: '人、人类',
    stages: [
      {
        name: '甲骨文',
        era: '商（前14-11世纪）',
        description: '像侧身站立的人形，长臂弯腰',
        svgPath: 'M30,10 L30,40 L15,80 M30,40 L45,80',
      },
      {
        name: '金文',
        era: '西周（前10-8世纪）',
        description: '人形更加抽象，两臂向下伸展',
        svgPath: 'M30,12 L20,50 L10,85 M30,12 L40,50 L50,85',
      },
      {
        name: '小篆',
        era: '秦（前3世纪）',
        description: '弧线圆润，左弯右直',
        svgPath: 'M30,10 C25,30 15,50 10,85 M30,10 L50,85',
      },
      {
        name: '隶书',
        era: '汉（前2-2世纪）',
        description: '笔画趋于方正，撇捺分明',
        svgPath: 'M30,10 L12,85 M30,10 L48,85',
      },
      {
        name: '楷书',
        era: '魏晋至今（3世纪起）',
        description: '撇捺对称，端点收笔',
        svgPath: 'M32,8 L10,85 M32,8 L54,85',
      },
    ],
  },
  {
    char: '水',
    meaning: '水、河流',
    stages: [
      {
        name: '甲骨文',
        era: '商（前14-11世纪）',
        description: '中间一条弯曲的河流，两侧是小水波',
        svgPath: 'M30,10 C25,30 35,50 30,85 M15,30 C18,40 12,50 15,55 M45,30 C48,40 42,50 45,55',
      },
      {
        name: '金文',
        era: '西周（前10-8世纪）',
        description: '中间弯曲水流加两侧波纹更规整',
        svgPath: 'M30,10 C25,35 35,55 30,85 M12,25 C15,40 10,50 12,60 M48,25 C45,40 50,50 48,60',
      },
      {
        name: '小篆',
        era: '秦（前3世纪）',
        description: '线条流畅优美，中竖弯曲两侧对称',
        svgPath: 'M30,10 C22,30 38,55 30,85 M10,25 C18,35 8,50 15,60 M50,25 C42,35 52,50 45,60',
      },
      {
        name: '隶书',
        era: '汉（前2-2世纪）',
        description: '竖钩+左右两点一挑',
        svgPath: 'M30,10 L30,75 C30,80 25,85 20,85 M18,30 L15,55 M45,30 L48,55',
      },
      {
        name: '楷书',
        era: '魏晋至今（3世纪起）',
        description: '竖钩+左挑+右撇+右捺',
        svgPath: 'M28,8 L28,72 Q28,80 22,85 M15,28 L10,48 M42,28 L38,48 M35,50 L52,80',
      },
    ],
  },
  {
    char: '山',
    meaning: '山、山峰',
    stages: [
      {
        name: '甲骨文',
        era: '商（前14-11世纪）',
        description: '三座山峰的形状，中间最高',
        svgPath: 'M30,10 L30,85 M10,30 L10,85 M50,30 L50,85',
      },
      {
        name: '金文',
        era: '西周（前10-8世纪）',
        description: '山峰更圆润，底部相连',
        svgPath: 'M30,10 L30,50 L50,85 M30,50 L10,85 M10,85 L50,85',
      },
      {
        name: '小篆',
        era: '秦（前3世纪）',
        description: '三竖底线连接，形如山峦',
        svgPath: 'M30,8 L30,55 M10,30 L10,85 L50,85 L50,30',
      },
      {
        name: '隶书',
        era: '汉（前2-2世纪）',
        description: '竖画简化，底线加粗',
        svgPath: 'M30,12 L30,60 M12,35 L12,82 L48,82 L48,35',
      },
      {
        name: '楷书',
        era: '魏晋至今（3世纪起）',
        description: '标准山字形，中竖长两侧短',
        svgPath: 'M30,10 L30,80 M12,35 L12,80 M48,35 L48,80 M12,80 L48,80',
      },
    ],
  },
  {
    char: '天',
    meaning: '天空、上天',
    stages: [
      {
        name: '甲骨文',
        era: '商（前14-11世纪）',
        description: '大字上面加一横，表示人头顶之上的天空',
        svgPath: 'M10,10 L50,10 M30,10 L15,50 L10,85 M30,50 L45,85',
      },
      {
        name: '金文',
        era: '西周（前10-8世纪）',
        description: '更突出"头顶"之意，横线加重',
        svgPath: 'M8,10 L52,10 M30,12 L15,50 L10,80 M30,50 L45,80',
      },
      {
        name: '小篆',
        era: '秦（前3世纪）',
        description: '横线上人形规整化，两横两撇',
        svgPath: 'M8,10 L52,10 M8,40 L52,40 M30,10 L30,40 M30,40 L12,80 M30,40 L48,80',
      },
      {
        name: '隶书',
        era: '汉（前2-2世纪）',
        description: '两横扁平，下方人变为撇捺',
        svgPath: 'M5,12 L55,12 M5,42 L55,42 M30,42 L10,85 M30,42 L50,85',
      },
      {
        name: '楷书',
        era: '魏晋至今（3世纪起）',
        description: '上横短下横长，撇捺舒展',
        svgPath: 'M15,10 L45,10 M5,40 L55,40 M30,40 L8,85 M30,40 L52,85',
      },
    ],
  },
];

/** 可搜索的汉字列表 */
export const SEARCHABLE_CHARS = CHAR_EVOLUTIONS.map(e => e.char);

/** 获取汉字演变数据 */
export function getCharEvolution(char: string): CharEvolution | undefined {
  return CHAR_EVOLUTIONS.find(e => e.char === char);
}
