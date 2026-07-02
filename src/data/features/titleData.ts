/**
 * 谥号与年号生成器数据
 * 包含谥号、年号的各种组合规则和模板
 */

/**
 * 谥号类别
 */
export interface PosthumousTitle {
  id: string;
  category: string;
  title: string;
  meaning: string;
  dynasty: string[];
  examples: string[];
  description: string;
}

/**
 * 谥号类别定义
 */
export const POSTHUMOUS_TITLE_CATEGORIES = [
  {
    id: 'hui',
    name: '惠',
    full: '惠',
    meaning: '慈仁爱民',
    description: '对以仁爱治国、爱惜百姓的皇帝、大臣给予的谥号',
    keyWords: ['惠', '仁', '爱', '民', '德']
  },
  {
    id: 'jing',
    name: '静',
    full: '静',
    meaning: '敬慎威仪',
    description: '对性格谨慎、威仪庄重的统治者给予的谥号',
    keyWords: ['静', '敬', '慎', '庄', '严']
  },
  {
    id: 'wen',
    name: '文',
    full: '文',
    meaning: '经纬天地、道德博厚',
    description: '对中国古代历史上最高荣誉的谥号，表示对功业和文化的卓越贡献',
    keyWords: ['文', '章', '学', '艺', '经']
  },
  {
    id: 'wu',
    name: '武',
    full: '武',
    meaning: '刚强直理、威强敌德',
    description: '对武功卓著、开疆拓土的皇帝给予的谥号',
    keyWords: ['武', '勇', '战', '功', '威']
  },
  {
    id: 'xiao',
    name: '孝',
    full: '孝',
    meaning: '善事父母、追远思亲',
    description: '对孝顺父母的皇帝给予的谥号，是古代最核心的品德',
    keyWords: ['孝', '亲', '顺', '思', '念']
  },
  {
    id: 'miao',
    name: '明',
    full: '明',
    meaning: '照临四方、威德远扬',
    description: '对开明贤达、有治理能力的统治者给予的谥号',
    keyWords: ['明', '圣', '贤', '达', '智']
  },
  {
    id: 'lie',
    name: '烈',
    full: '烈',
    meaning: '刚强直理、死国无危',
    description: '对刚正不阿、临危不惧的忠臣义士给予的谥号',
    keyWords: ['烈', '刚', '正', '直', '勇']
  },
  {
    id: 'jing',
    name: '景',
    full: '景',
    meaning: '由义而济、布义行刚',
    description: '对崇尚道德、有政治建树的君主给予的谥号',
    keyWords: ['景', '德', '政', '治', '义']
  },
  {
    id: 'kang',
    name: '康',
    full: '康',
    meaning: '温和柔安、安乐百姓',
    description: '对休养生息、百姓安乐的太平君主给予的谥号',
    keyWords: ['康', '安', '平', '乐', '和']
  },
  {
    id: 'sheng',
    name: '圣',
    full: '圣',
    meaning: '德高瞻远、智慧深远',
    description: '对达到圣人境界的皇帝给予的极高荣誉',
    keyWords: ['圣', '神', '明', '大', '通']
  }
] as const;

/**
 * 年号模板
 */
export interface EraNameTemplate {
  id: string;
  base: string;
  variants: string[];
  meaning: string;
  dynasty: string[];
  exampleYears: string[];
  description: string;
}

/**
 * 年号模板数据
 */
export const ERA_TEMPLATES: EraNameTemplate[] = [
  {
    id: 'taihe',
    base: '太和',
    variants: ['太平', '泰和', '泰康', '太初'],
    meaning: '天下大治、阴阳调和',
    dynasty: ['汉', '魏', '晋', '南北朝', '隋', '唐', '宋', '辽', '金', '元', '明', '清'],
    exampleYears: ['239-257 (魏)', '1040-1049 (宋)', '1400-1404 (明)'],
    description: '最常用的年号模板，寓意天下太平'
  },
  {
    id: 'zhihe',
    base: '至和',
    variants: ['中和', '大同', '咸和'],
    meaning: '达到完美的和谐状态',
    dynasty: ['宋', '辽', '金'],
    exampleYears: ['1054-1056 (宋)', '1128-1137 (金)'],
    description: '追求道德与政治的完美境界'
  },
  {
    id: 'jianxing',
    base: '建兴',
    variants: ['永兴', '兴元', '中兴'],
    meaning: '重建、兴起',
    dynasty: ['汉', '晋', '南北朝', '隋', '唐', '宋', '元', '明'],
    exampleYears: ['200-219 (魏)', '304-306 (西晋)', '785-805 (唐)'],
    description: '恢复旧制、重建秩序'
  },
  {
    id: 'zhenyuan',
    base: '贞元',
    variants: ['元和', '永贞', '天元'],
    meaning: '纯正、永远',
    dynasty: ['唐', '宋', '元'],
    exampleYears: ['785-805 (唐)', '1195-1200 (宋)', '1285-1290 (元)'],
    description: '强调德行的纯正与长久'
  },
  {
    id: 'hongwu',
    base: '洪武',
    variants: ['天洪', '大明', '永洪'],
    meaning: '宏伟的武功、伟大的文治',
    dynasty: ['元', '明'],
    exampleYears: ['1368-1398 (明)'],
    description: '明太祖朱元璋开创的年号'
  },
  {
    id: 'qianlong',
    base: '乾隆',
    variants: ['嘉庆', '道光', '咸丰', '同治', '光绪', '宣统'],
    meaning: '盛大的君王之治',
    dynasty: ['清'],
    exampleYears: ['1736-1795 (清)'],
    description: '清代盛世的象征'
  },
  {
    id: 'tianshou',
    base: '天授',
    variants: ['永授', '大授'],
    meaning: '上天授予',
    dynasty: ['唐', '宋', '元', '明', '清'],
    exampleYears: ['690-692 (武周)', '1101-1103 (宋)'],
    description: '强调皇权来自天命'
  },
  {
    id: 'taichang',
    base: '太昌',
    variants: ['永昌', '大昌', '天昌'],
    meaning: '永远昌盛',
    dynasty: ['魏', '晋', '北魏', '后梁', '南唐', '清'],
    exampleYears: ['528-530 (北魏)', '617-619 (隋)'],
    description: '寓意王朝永盛'
  },
  {
    id: 'taixu',
    base: '太熙',
    variants: ['永熙', '熙平', '熙元'],
    meaning: '光明盛大',
    dynasty: ['魏', '晋', '北魏', '西凉', '后凉', '北凉'],
    exampleYears: ['265-265 (西晋)'],
    description: '光明盛大，指治理有方'
  },
  {
    id: 'yuanxing',
    base: '元兴',
    variants: ['隆兴', '兴元', '庆元'],
    meaning: '起始、兴盛',
    dynasty: ['晋', '南北朝', '隋', '唐', '宋', '辽', '金', '元', '明', '清'],
    exampleYears: ['402-404 (东晋)', '1138-1140 (南宋)', '1351-1368 (元)'],
    description: '新朝或新时期的开端'
  },
  {
    id: 'xinghe',
    base: '兴和',
    variants: ['协和', '咸和', '承和'],
    meaning: '兴旺与和谐',
    dynasty: ['南北朝', '隋', '唐', '辽', '金'],
    exampleYears: ['539-546 (东魏)', '1078-1085 (宋)'],
    description: '政治清明、经济繁荣'
  },
  {
    id: 'chonghe',
    base: '崇和',
    variants: ['崇宁', '宣和', '绍兴'],
    meaning: '崇尚和谐、政治清明',
    dynasty: ['宋', '金', '元'],
    exampleYears: ['1102-1106 (宋)', '1127-1162 (南宋)'],
    description: '政治清明，百姓安乐'
  },
  {
    id: 'wanning',
    base: '万宁',
    variants: ['永宁', '长宁', '安宁'],
    meaning: '永远安宁',
    dynasty: ['汉', '魏', '晋', '南北朝', '隋', '唐', '宋', '元', '明', '清'],
    exampleYears: ['265-265 (西晋)', '1195-1200 (宋)', '1599-1606 (明)'],
    description: '和平稳定，天下安宁'
  },
  {
    id: 'yongguang',
    base: '永光',
    variants: ['元光', '正光', '永昌'],
    meaning: '永恒的光明',
    dynasty: ['汉', '魏', '晋', '北魏', '后凉', '南凉'],
    exampleYears: ['420-423 (西凉)', '535-544 (北魏)'],
    description: '象征永久的政治清明'
  },
  {
    id: 'taiyuan',
    base: '泰元',
    variants: ['开元', '天元', '永元'],
    meaning: '巨大的功德',
    dynasty: ['魏', '晋', '南北朝', '隋', '唐', '宋', '元', '明', '清'],
    exampleYears: ['380-396 (东晋)', '713-741 (唐)', '889-894 (唐)'],
    description: '象征功德盛大，影响深远'
  },
  {
    id: 'chaonian',
    base: '禅让',
    variants: ['绍圣', '绍定'],
    meaning: '接受禅让、继承皇位',
    dynasty: ['晋', '南北朝', '隋', '唐', '宋', '元', '明', '清'],
    exampleYears: ['304-311 (西晋)'],
    description: '暗示皇位继承的合法性'
  },
  {
    id: 'tianfu',
    base: '天辅',
    variants: ['天福', '天宝'],
    meaning: '上天辅佐',
    dynasty: ['唐', '五代', '辽', '金', '元'],
    exampleYears: ['926-936 (后唐)', '1038-1040 (辽)'],
    description: '强调天命所归'
  },
  {
    id: 'taichang',
    base: '太长',
    variants: ['永长', '大长'],
    meaning: '永远长久',
    dynasty: ['宋', '辽', '金', '元', '明', '清'],
    exampleYears: ['969-975 (宋)', '1195-1200 (宋)'],
    description: '象征王朝长久'
  }
] as const;

/**
 * 谥号组合规则
 */
export const POSTHUMOUS_TITLE_COMBINATIONS = {
  // 双字谥号
  twoChar: {
    huiJing: { title: '惠景', description: '慈仁与敬慎的完美结合' },
    huiWen: { title: '惠文', description: '仁爱与文治的典范' },
    huiMiao: { title: '惠明', description: '慈爱而又开明的君主' },
    huiWu: { title: '惠武', description: '既仁爱又有武功的君主' },
    jingWen: { title: '景文', description: '文治与德行的统一' },
    jingMiao: { title: '景明', description: '明智而庄重的君主' },
    wuWen: { title: '武文', description: '文武双全的君主' },
    wuMiao: { title: '武明', description: '威武而开明的君主' },
    miaoJing: { title: '明景', description: '明理而有德行的君主' },
    miaoWen: { title: '明文', description: '有才德又有文化的君主' },
    xiaoMiao: { title: '孝明', description: '孝顺而又开明的君主' },
    xiaoWen: { title: '孝文', description: '孝顺而有文治的君主' },
    xiaoJing: { title: '孝静', description: '孝顺而谨慎的君主' },
    xiaoWu: { title: '孝武', description: '孝顺而威武的君主' },
    huiXiao: { title: '惠孝', description: '仁爱而又孝顺' }
  },
  // 三字谥号（部分）
  threeChar: {
    xiaoMiaoMing: { title: '孝明明', description: '至孝至明' },
    huiWenMing: { title: '惠文明', description: '仁爱文治明达' }
  },
  // 四字谥号（部分）
  fourChar: {
    liXiaoJingMing: { title: '烈孝景明', description: '忠烈孝顺明智' },
    wenXiaoHuiJing: { title: '文孝惠景', description: '文德孝心惠慈' }
  }
};

/**
 * 历史知名谥号示例
 */
export const FAMOUS_POSTHUMOUS_TITLES: PosthumousTitle[] = [
  {
    id: 'taiwu',
    category: '武',
    title: '武帝',
    meaning: '刚强直理、威强敌德',
    dynasty: ['汉', '魏', '晋', '南北朝', '隋', '唐', '宋', '元', '明', '清'],
    examples: ['汉武帝刘彻', '魏武帝曹操', '隋文帝杨坚'],
    description: '最常见也是最荣耀的谥号之一，象征武功卓著'
  },
  {
    id: 'wenwu',
    category: '文',
    title: '文帝',
    meaning: '经纬天地、道德博厚',
    dynasty: ['汉', '魏', '晋', '南北朝', '隋', '唐', '宋', '辽', '金', '元', '明', '清'],
    examples: ['汉文帝刘恒', '魏文帝曹丕', '隋文帝杨坚'],
    description: '文治最高荣誉，象征文化繁荣'
  },
  {
    id: 'haodi',
    category: '惠',
    title: '惠帝',
    meaning: '慈仁爱民',
    dynasty: ['汉', '魏', '晋', '南北朝', '隋', '唐', '宋', '元', '明', '清'],
    examples: ['汉惠帝刘盈', '晋惠帝司马衷', '北魏惠帝元诩'],
    description: '对仁爱百姓的统治者的表彰'
  },
  {
    id: 'jingdi',
    category: '静',
    title: '静帝',
    meaning: '敬慎威仪',
    dynasty: ['晋', '南北朝', '隋', '唐', '宋', '元', '明', '清'],
    examples: ['北齐静帝高恒', '北周静帝宇文阐', '隋静帝杨侑'],
    description: '对谨慎稳重的统治者的表彰'
  },
  {
    id: 'shengdi',
    category: '圣',
    title: '圣帝',
    meaning: '德高瞻远、智慧深远',
    dynasty: ['汉', '魏', '晋', '南北朝', '隋', '唐', '宋', '元', '明', '清'],
    examples: ['晋圣帝司马炎', '清圣祖（康熙）'],
    description: '极高的荣誉，象征达到圣人境界'
  },
  {
    id: 'liaodi',
    category: '烈',
    title: '烈帝',
    meaning: '刚强直理、死国无危',
    dynasty: ['汉', '魏', '晋', '南北朝', '唐', '宋', '元', '明', '清'],
    examples: ['汉武帝刘彻', '唐玄宗（追尊）'],
    description: '对刚正不阿、临危不惧的忠臣义士的表彰'
  },
  {
    id: 'jingdi',
    category: '景',
    title: '景帝',
    meaning: '由义而济、布义行刚',
    dynasty: ['汉', '魏', '晋', '南北朝', '隋', '唐', '宋', '元', '明', '清'],
    examples: ['汉景帝刘启', '魏景帝曹髦', '梁简文帝（追尊）'],
    description: '对崇尚道德、有政治建树的君主的表彰'
  },
  {
    id: 'kangdi',
    category: '康',
    title: '康帝',
    meaning: '温和柔安、安乐百姓',
    dynasty: ['晋', '南北朝', '隋', '唐', '宋', '元', '明', '清'],
    examples: ['晋康帝司马岳', '隋康帝（追尊）'],
    description: '对休养生息、百姓安乐的太平君主的表彰'
  },
  {
    id: 'miao',
    category: '明',
    title: '明帝',
    meaning: '照临四方、威德远扬',
    dynasty: ['汉', '魏', '晋', '南北朝', '隋', '唐', '宋', '辽', '金', '元', '明', '清'],
    examples: ['汉明帝刘庄', '魏明帝曹叡', '吴明帝孙休'],
    description: '对开明贤达、有治理能力的统治者的表彰'
  },
  {
    id: 'xiao',
    category: '孝',
    title: '孝帝',
    meaning: '善事父母、追远思亲',
    dynasty: ['汉', '魏', '晋', '南北朝', '隋', '唐', '宋', '元', '明', '清'],
    examples: ['魏孝文帝元宏', '唐孝明帝（追尊）'],
    description: '对孝顺父母的统治者的表彰'
  }
];

/**
 * 获取随机谥号组合
 */
export const getRandomPosthumousTitle = (): string => {
  const categories = POSTHUMOUS_TITLE_CATEGORIES;
  const category1 = categories[Math.floor(Math.random() * categories.length)];
  const category2 = categories[Math.floor(Math.random() * categories.length)];

  return `${category1.name}${category2.name}`;
};

/**
 * 获取随机年号
 */
export const getRandomEraName = (): string => {
  const templates = ERA_TEMPLATES;
  const template = templates[Math.floor(Math.random() * templates.length)];

  // 随机选择变体或基础
  const eraName = Math.random() > 0.7
    ? template.variants[Math.floor(Math.random() * template.variants.length)]
    : template.base;

  return eraName;
};

/**
 * 获取谥号详细信息
 */
export const getPosthumousTitleById = (id: string): PosthumousTitle | undefined => {
  return FAMOUS_POSTHUMOUS_TITLES.find(t => t.id === id);
};

/**
 * 获取年号详细信息
 */
export const getEraTemplateById = (id: string): EraNameTemplate | undefined => {
  return ERA_TEMPLATES.find(t => t.id === id);
};

/**
 * 计算谥号得分
 */
export const calculatePosthumousTitleScore = (title: string): number => {
  let score = 0;

  const categories = POSTHUMOUS_TITLE_CATEGORIES;
  for (const category of categories) {
    if (title.includes(category.name)) {
      score += 1;
    }
  }

  // 双字谥号加分
  if (title.length === 2) score += 2;

  // 三字谥号额外加分
  if (title.length === 3) score += 3;

  // 四字谥号最高分
  if (title.length === 4) score += 4;

  return Math.min(score, 10);
};
