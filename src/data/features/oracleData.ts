/**
 * 甲骨文识读游戏数据
 * 包含甲骨文字形、读音和含义
 */

export interface OracleBoneChar {
  id: string;
  character: string; // 甲骨文原始字形（简化显示）
  traditional: string; // 简体字
  traditionalFull: string; // 传统汉字（如果有）
  pronunciation: string; // 拼音
  meaning: string; // 含义
  visualDescription: string; // 视觉描述（如何认读）
  strokeCount: number; // 笔画数
  category: string; // 类别（自然、社会、生活等）
  dynasty: string; // 商代
  culturalContext: string; // 文化背景
  relatedCharacters: string[]; // 相关字
  difficulty: 'easy' | 'medium' | 'hard'; // 难度
  exampleSentence: string; // 例句
  icon: string; // 图标
}

/**
 * 甲骨文字符数据
 */
export const ORACLE_BONE_CHARS: OracleBoneChar[] = [
  {
    id: 'oracle-001',
    character: '日',
    traditional: '日',
    traditionalFull: '日',
    pronunciation: 'rì',
    meaning: '太阳、白天',
    visualDescription: '像是一个圆圈中间有一横，象征太阳的光芒',
    strokeCount: 4,
    category: '自然',
    dynasty: '商代',
    culturalContext: '太阳对于商代非常重要，是时间和农业的重要标志',
    relatedCharacters: ['月', '星', '明'],
    difficulty: 'easy',
    exampleSentence: '今日天晴。',
    icon: '☀️'
  },
  {
    id: 'oracle-002',
    character: '月',
    traditional: '月',
    traditionalFull: '月',
    pronunciation: 'yuè',
    meaning: '月亮、月份',
    visualDescription: '像是一个弯弯的月牙，象征月亮的形状',
    strokeCount: 4,
    category: '自然',
    dynasty: '商代',
    culturalContext: '月亮和太阳一样重要，古人观察月相变化制定历法',
    relatedCharacters: ['日', '年', '明'],
    difficulty: 'easy',
    exampleSentence: '今夕何夕？',
    icon: '🌙'
  },
  {
    id: 'oracle-003',
    character: '水',
    traditional: '水',
    traditionalFull: '水',
    pronunciation: 'shuǐ',
    meaning: '水、河流',
    visualDescription: '像是一个流动的曲线，象征水的形态',
    strokeCount: 4,
    category: '自然',
    dynasty: '商代',
    culturalContext: '黄河是商代的母亲河，对农业和生存至关重要',
    relatedCharacters: ['河', '海', '湖'],
    difficulty: 'easy',
    exampleSentence: '上善若水。',
    icon: '💧'
  },
  {
    id: 'oracle-004',
    character: '火',
    traditional: '火',
    traditionalFull: '火',
    pronunciation: 'huǒ',
    meaning: '火、火焰',
    visualDescription: '像是一个燃烧的火焰，有向上的火苗',
    strokeCount: 4,
    category: '自然',
    dynasty: '商代',
    culturalContext: '火是文明发展的关键，用于烹饪、取暖和祭祀',
    relatedCharacters: ['光', '热', '灯'],
    difficulty: 'easy',
    exampleSentence: '祝融祝融，火之精也。',
    icon: '🔥'
  },
  {
    id: 'oracle-005',
    character: '人',
    traditional: '人',
    traditionalFull: '人',
    pronunciation: 'rén',
    meaning: '人、人类',
    visualDescription: '像是一个侧身站立的人，手臂伸展',
    strokeCount: 2,
    category: '社会',
    dynasty: '商代',
    culturalContext: '商代人认为人是由天地阴阳生成，是万物之灵',
    relatedCharacters: ['大', '天', '地'],
    difficulty: 'easy',
    exampleSentence: '人定胜天。',
    icon: '👤'
  },
  {
    id: 'oracle-006',
    character: '大',
    traditional: '大',
    traditionalFull: '大',
    pronunciation: 'dà',
    meaning: '巨大、伟大',
    visualDescription: '像是一个张开双臂和双腿的人，象征广阔',
    strokeCount: 3,
    category: '社会',
    dynasty: '商代',
    culturalContext: '象征力量和胸怀，也用来形容规模和重要性',
    relatedCharacters: ['人', '天', '地'],
    difficulty: 'easy',
    exampleSentence: '志大才疏。',
    icon: '🦸'
  },
  {
    id: 'oracle-007',
    character: '天',
    traditional: '天',
    traditionalFull: '天',
    pronunciation: 'tiān',
    meaning: '天空、上天',
    visualDescription: '像是一个人的头部，或者从高处向下看',
    strokeCount: 4,
    category: '社会',
    dynasty: '商代',
    culturalContext: '商代人崇拜天，认为天子受命于天',
    relatedCharacters: ['人', '大', '日'],
    difficulty: 'medium',
    exampleSentence: '天行健，君子以自强不息。',
    icon: '🌟'
  },
  {
    id: 'oracle-008',
    character: '王',
    traditional: '王',
    traditionalFull: '王',
    pronunciation: 'wáng',
    meaning: '国王、统治者',
    visualDescription: '像是一把斧钺，象征权力的象征',
    strokeCount: 4,
    category: '社会',
    dynasty: '商代',
    culturalContext: '商代是奴隶制国家，国王拥有至高无上的权力',
    relatedCharacters: ['君', '主', '霸'],
    difficulty: 'medium',
    exampleSentence: '王侯将相宁有种乎？',
    icon: '👑'
  },
  {
    id: 'oracle-009',
    character: '田',
    traditional: '田',
    traditionalFull: '田',
    pronunciation: 'tián',
    meaning: '田地、农田',
    visualDescription: '像是一块被分割的田地，纵横交错',
    strokeCount: 5,
    category: '生活',
    dynasty: '商代',
    culturalContext: '农业是商代经济的核心，田地分配关系着社会秩序',
    relatedCharacters: ['地', '土', '种'],
    difficulty: 'easy',
    exampleSentence: '耕田种地，养活百姓。',
    icon: '🌾'
  },
  {
    id: 'oracle-010',
    character: '禾',
    traditional: '禾',
    traditionalFull: '禾',
    pronunciation: 'hé',
    meaning: '禾苗、谷物',
    visualDescription: '像是一株垂着谷穗的禾苗',
    strokeCount: 5,
    category: '生活',
    dynasty: '商代',
    culturalContext: '谷物是人们的主要食物来源，象征着丰收和富足',
    relatedCharacters: ['米', '麦', '谷'],
    difficulty: 'easy',
    exampleSentence: '禾苗长势喜人。',
    icon: '🌱'
  },
  {
    id: 'oracle-011',
    character: '雨',
    traditional: '雨',
    traditionalFull: '雨',
    pronunciation: 'yǔ',
    meaning: '雨、雨水',
    visualDescription: '像是从云层落下的水滴，呈滴落状',
    strokeCount: 8,
    category: '自然',
    dynasty: '商代',
    culturalContext: '雨水对农业至关重要，商代人举行求雨祭祀',
    relatedCharacters: ['云', '雪', '露'],
    difficulty: 'medium',
    exampleSentence: '瑞雪兆丰年。',
    icon: '🌧️'
  },
  {
    id: 'oracle-012',
    character: '山',
    traditional: '山',
    traditionalFull: '山',
    pronunciation: 'shān',
    meaning: '山脉、高山',
    visualDescription: '像是一个山峰重叠的形状，有三座山峰',
    strokeCount: 3,
    category: '自然',
    dynasty: '商代',
    culturalContext: '商代人敬畏高山，认为山上有神灵',
    relatedCharacters: ['水', '石', '峰'],
    difficulty: 'easy',
    exampleSentence: '山高水长。',
    icon: '⛰️'
  },
  {
    id: 'oracle-013',
    character: '林',
    traditional: '林',
    traditionalFull: '林',
    pronunciation: 'lín',
    meaning: '森林、树林',
    visualDescription: '像是一丛树木，两棵树并排',
    strokeCount: 8,
    category: '自然',
    dynasty: '商代',
    culturalContext: '森林是木材和猎物的重要来源，也是神圣之地',
    relatedCharacters: ['木', '森', '树'],
    difficulty: 'medium',
    exampleSentence: '森林茂密，鸟兽栖息。',
    icon: '🌲'
  },
  {
    id: 'oracle-014',
    character: '木',
    traditional: '木',
    traditionalFull: '木',
    pronunciation: 'mù',
    meaning: '树木、木头',
    visualDescription: '像是一棵树，有树干和树枝',
    strokeCount: 4,
    category: '自然',
    dynasty: '商代',
    culturalContext: '木材是商代建筑和工具的重要材料',
    relatedCharacters: ['林', '森', '树'],
    difficulty: 'easy',
    exampleSentence: '十年树木，百年树人。',
    icon: '🪵'
  },
  {
    id: 'oracle-015',
    character: '人',
    traditional: '入',
    traditionalFull: '入',
    pronunciation: 'rù',
    meaning: '进入、进入里面',
    visualDescription: '像是一个人侧身行走，向里走去',
    strokeCount: 2,
    category: '社会',
    dynasty: '商代',
    culturalContext: '表示动作或方向，日常使用广泛',
    relatedCharacters: ['出', '进', '进'],
    difficulty: 'easy',
    exampleSentence: '入室必先问安。',
    icon: '🚪'
  },
  {
    id: 'oracle-016',
    character: '口',
    traditional: '口',
    traditionalFull: '口',
    pronunciation: 'kǒu',
    meaning: '嘴巴、说话',
    visualDescription: '像是一个张开的嘴巴形状',
    strokeCount: 3,
    category: '生活',
    dynasty: '商代',
    culturalContext: '嘴巴用于说话、进食和表达，是交流的重要工具',
    relatedCharacters: ['言', '说', '语'],
    difficulty: 'easy',
    exampleSentence: '口舌生疮，不能进食。',
    icon: '👄'
  },
  {
    id: 'oracle-017',
    character: '言',
    traditional: '言',
    traditionalFull: '言',
    pronunciation: 'yán',
    meaning: '言语、语言',
    visualDescription: '像是一个说话的嘴，上面有音律符号',
    strokeCount: 7,
    category: '社会',
    dynasty: '商代',
    culturalContext: '言语是治理国家、交流思想的重要工具',
    relatedCharacters: ['口', '说', '语'],
    difficulty: 'medium',
    exampleSentence: '一言九鼎，重于泰山。',
    icon: '💬'
  },
  {
    id: 'oracle-018',
    character: '左',
    traditional: '左',
    traditionalFull: '左',
    pronunciation: 'zuǒ',
    meaning: '左边、左侧',
    visualDescription: '像是一只手握着某物，指向左侧',
    strokeCount: 5,
    category: '社会',
    dynasty: '商代',
    culturalContext: '中国古代以右为尊，但"左"也有重要地位',
    relatedCharacters: ['右', '手', '边'],
    difficulty: 'medium',
    exampleSentence: '左右为难。',
    icon: '👈'
  },
  {
    id: 'oracle-019',
    character: '右',
    traditional: '右',
    traditionalFull: '右',
    pronunciation: 'yòu',
    meaning: '右边、右侧',
    visualDescription: '像是一只手握着某物，指向右侧',
    strokeCount: 5,
    category: '社会',
    dynasty: '商代',
    culturalContext: '古代礼仪以右为尊，表示重要和尊贵',
    relatedCharacters: ['左', '手', '边'],
    difficulty: 'medium',
    exampleSentence: '右尊左卑。',
    icon: '👉'
  },
  {
    id: 'oracle-020',
    character: '手',
    traditional: '手',
    traditionalFull: '手',
    pronunciation: 'shǒu',
    meaning: '手、手掌',
    visualDescription: '像是一只张开的手掌',
    strokeCount: 4,
    category: '社会',
    dynasty: '商代',
    culturalContext: '手是劳动的工具，象征劳动和创造',
    relatedCharacters: ['足', '指', '掌'],
    difficulty: 'easy',
    exampleSentence: '手巧心灵。',
    icon: '🖐️'
  },
  {
    id: 'oracle-021',
    character: '足',
    traditional: '足',
    traditionalFull: '足',
    pronunciation: 'zú',
    meaning: '脚、足部',
    visualDescription: '像是一只行走中的脚',
    strokeCount: 7,
    category: '社会',
    dynasty: '商代',
    culturalContext: '脚用于行走，象征着远方和旅行',
    relatedCharacters: ['手', '行', '走'],
    difficulty: 'medium',
    exampleSentence: '足下生风。',
    icon: '👣'
  },
  {
    id: 'oracle-022',
    character: '止',
    traditional: '止',
    traditionalFull: '止',
    pronunciation: 'zhǐ',
    meaning: '停止、停下',
    visualDescription: '像是一只脚站立不动的样子',
    strokeCount: 4,
    category: '社会',
    dynasty: '商代',
    culturalContext: '表示停止、暂停的动作',
    relatedCharacters: ['行', '走', '去'],
    difficulty: 'medium',
    exampleSentence: '行百里者半九十。',
    icon: '🚫'
  },
  {
    id: 'oracle-023',
    character: '行',
    traditional: '行',
    traditionalFull: '行',
    pronunciation: 'xíng',
    meaning: '行走、道路、行为',
    visualDescription: '像是一条十字路口，表示行动或道路',
    strokeCount: 6,
    category: '社会',
    dynasty: '商代',
    culturalContext: '行象征着行动和道德实践',
    relatedCharacters: ['走', '去', '路'],
    difficulty: 'medium',
    exampleSentence: '言行一致。',
    icon: '🚶'
  },
  {
    id: 'oracle-024',
    character: '血',
    traditional: '血',
    traditionalFull: '血',
    pronunciation: 'xuè',
    meaning: '血液、牺牲',
    visualDescription: '像是一摊血迹，或者流动的液体',
    strokeCount: 6,
    category: '生活',
    dynasty: '商代',
    culturalContext: '商代祭祀用血，血象征着生命和祭祀',
    relatedCharacters: ['命', '生', '死'],
    difficulty: 'medium',
    exampleSentence: '鲜血染红了大地。',
    icon: '🩸'
  },
  {
    id: 'oracle-025',
    character: '目',
    traditional: '目',
    traditionalFull: '目',
    pronunciation: 'mù',
    meaning: '眼睛、视觉',
    visualDescription: '像是一个有瞳孔的眼睛形状',
    strokeCount: 5,
    category: '自然',
    dynasty: '商代',
    culturalContext: '眼睛是感知世界的器官，象征观察和洞察',
    relatedCharacters: ['见', '视', '看'],
    difficulty: 'easy',
    exampleSentence: '目瞪口呆。',
    icon: '👁️'
  },
  {
    id: 'oracle-026',
    character: '见',
    traditional: '見',
    traditionalFull: '見',
    pronunciation: 'jiàn',
    meaning: '看见、看见对方',
    visualDescription: '像是一只眼睛，上方有一横，表示看见',
    strokeCount: 4,
    category: '社会',
    dynasty: '商代',
    culturalContext: '表示看见的动作，也引申为会面',
    relatedCharacters: ['看', '见', '观'],
    difficulty: 'easy',
    exampleSentence: '有朋自远方来，不亦乐乎？',
    icon: '👀'
  },
  {
    id: 'oracle-027',
    character: '耳',
    traditional: '耳',
    traditionalFull: '耳',
    pronunciation: 'ěr',
    meaning: '耳朵、听觉',
    visualDescription: '像是一个耳朵的形状',
    strokeCount: 6,
    category: '社会',
    dynasty: '商代',
    culturalContext: '耳朵用于聆听，象征听取和倾听',
    relatedCharacters: ['听', '闻', '声'],
    difficulty: 'medium',
    exampleSentence: '耳听八方。',
    icon: '👂'
  },
  {
    id: 'oracle-028',
    character: '耳',
    traditional: '闻',
    traditionalFull: '聞',
    pronunciation: 'wén',
    meaning: '听、听见',
    visualDescription: '像是一个耳朵，旁边有一个口，表示听闻',
    strokeCount: 9,
    category: '社会',
    dynasty: '商代',
    culturalContext: '表示听闻和听取的动作',
    relatedCharacters: ['听', '闻', '声'],
    difficulty: 'medium',
    exampleSentence: '闻鸡起舞。',
    icon: '👂'
  },
  {
    id: 'oracle-029',
    character: '心',
    traditional: '心',
    traditionalFull: '心',
    pronunciation: 'xīn',
    meaning: '心脏、内心',
    visualDescription: '像是一个空心的心脏形状，中间有纹路',
    strokeCount: 4,
    category: '社会',
    dynasty: '商代',
    culturalContext: '商代人认为心是思维和情感的器官',
    relatedCharacters: ['思', '想', '意'],
    difficulty: 'medium',
    exampleSentence: '心有所想，意有所动。',
    icon: '❤️'
  },
  {
    id: 'oracle-030',
    character: '思',
    traditional: '思',
    traditionalFull: '思',
    pronunciation: 'sī',
    meaning: '思考、思想',
    visualDescription: '像是一个心，旁边有一口，表示用心思考',
    strokeCount: 9,
    category: '社会',
    dynasty: '商代',
    culturalContext: '思是治理国家的重要能力，需要深思熟虑',
    relatedCharacters: ['心', '想', '意'],
    difficulty: 'medium',
    exampleSentence: '三思而后行。',
    icon: '💭'
  },
  {
    id: 'oracle-031',
    character: '玉',
    traditional: '玉',
    traditionalFull: '玉',
    pronunciation: 'yù',
    meaning: '玉石、宝石',
    visualDescription: '像是一块有光泽的玉石，有纹理',
    strokeCount: 5,
    category: '生活',
    dynasty: '商代',
    culturalContext: '商代是玉文化的高峰期，玉器用于祭祀和装饰',
    relatedCharacters: ['石', '宝', '珍'],
    difficulty: 'medium',
    exampleSentence: '金玉良言。',
    icon: '💎'
  },
  {
    id: 'oracle-032',
    character: '贝',
    traditional: '貝',
    traditionalFull: '貝',
    pronunciation: 'bèi',
    meaning: '贝壳、货币',
    visualDescription: '像是一个贝壳的形状',
    strokeCount: 7,
    category: '生活',
    dynasty: '商代',
    culturalContext: '贝币是商代的货币，象征着财富',
    relatedCharacters: ['钱', '财', '金'],
    difficulty: 'medium',
    exampleSentence: '珍爱金钱，莫贪图。',
    icon: '🐚'
  },
  {
    id: 'oracle-033',
    character: '田',
    traditional: '田',
    traditionalFull: '田',
    pronunciation: 'tián',
    meaning: '田地、农田',
    visualDescription: '像是一块被划分的田地',
    strokeCount: 5,
    category: '生活',
    dynasty: '商代',
    culturalContext: '田地是商代最重要的资源，象征财富和地位',
    relatedCharacters: ['地', '土', '种'],
    difficulty: 'easy',
    exampleSentence: '田地广阔，五谷丰登。',
    icon: '🌾'
  },
  {
    id: 'oracle-034',
    character: '舟',
    traditional: '舟',
    traditionalFull: '舟',
    pronunciation: 'zhōu',
    meaning: '船只、船只',
    visualDescription: '像是一艘船的形状，有船身和船桨',
    strokeCount: 6,
    category: '生活',
    dynasty: '商代',
    culturalContext: '商代水路运输发达，舟船是重要的交通工具',
    relatedCharacters: ['船', '水', '航'],
    difficulty: 'medium',
    exampleSentence: '顺水推舟，事半功倍。',
    icon: '🚢'
  },
  {
    id: 'oracle-035',
    character: '弓',
    traditional: '弓',
    traditionalFull: '弓',
    pronunciation: 'gōng',
    meaning: '弓箭、武器',
    visualDescription: '像是一把弯曲的弓箭，有弓弦',
    strokeCount: 3,
    category: '社会',
    dynasty: '商代',
    culturalContext: '商代战争频繁，弓箭是重要的武器',
    relatedCharacters: ['箭', '射', '兵'],
    difficulty: 'easy',
    exampleSentence: '弓开如满月，箭发如流星。',
    icon: '🏹'
  },
  {
    id: 'oracle-036',
    character: '射',
    traditional: '射',
    traditionalFull: '射',
    pronunciation: 'shè',
    meaning: '射击、射箭',
    visualDescription: '像是一个人拉开弓箭射击的样子',
    strokeCount: 10,
    category: '社会',
    dynasty: '商代',
    culturalContext: '射是古代六艺之一，也是战争技能',
    relatedCharacters: ['弓', '箭', '击'],
    difficulty: 'medium',
    exampleSentence: '射箭需要专注和技巧。',
    icon: '🎯'
  },
  {
    id: 'oracle-037',
    character: '衣',
    traditional: '衣',
    traditionalFull: '衣',
    pronunciation: 'yī',
    meaning: '衣服、衣物',
    visualDescription: '像是一件衣服的形状，有领子和袖子',
    strokeCount: 6,
    category: '生活',
    dynasty: '商代',
    culturalContext: '衣服是人们日常用品，也象征身份地位',
    relatedCharacters: ['服', '饰', '裳'],
    difficulty: 'medium',
    exampleSentence: '衣衫整洁，仪容端庄。',
    icon: '👕'
  },
  {
    id: 'oracle-038',
    character: '食',
    traditional: '食',
    traditionalFull: '食',
    pronunciation: 'shí',
    meaning: '食物、饮食',
    visualDescription: '像是一张嘴在吃东西，或者碗筷',
    strokeCount: 9,
    category: '生活',
    dynasty: '商代',
    culturalContext: '食是人们生存的基本需求，也象征宴席和祭祀',
    relatedCharacters: ['饭', '餐', '喝'],
    difficulty: 'medium',
    exampleSentence: '食不厌精，脍不厌细。',
    icon: '🍽️'
  },
  {
    id: 'oracle-039',
    character: '网',
    traditional: '网',
    traditionalFull: '网',
    pronunciation: 'wǎng',
    meaning: '网、网罗',
    visualDescription: '像是一个网状的结构',
    strokeCount: 6,
    category: '生活',
    dynasty: '商代',
    culturalContext: '网用于捕鱼和捕猎，象征着收获',
    relatedCharacters: ['捕', '获', '鱼'],
    difficulty: 'medium',
    exampleSentence: '网开一面，留有余地。',
    icon: '🕸️'
  },
  {
    id: 'oracle-040',
    character: '牧',
    traditional: '牧',
    traditionalFull: '牧',
    pronunciation: 'mù',
    meaning: '放牧、治理',
    visualDescription: '像是一个人手持鞭子在放牧',
    strokeCount: 8,
    category: '社会',
    dynasty: '商代',
    culturalContext: '牧象征着管理和治理，引申为统治',
    relatedCharacters: ['养', '管', '治'],
    difficulty: 'medium',
    exampleSentence: '牧民爱民，百姓安居。',
    icon: '👨‍🌾'
  }
];

/**
 * 随机选择指定数量的甲骨文
 */
export const getRandomOracleChars = (count: number, difficulty?: string): OracleBoneChar[] => {
  let chars = ORACLE_BONE_CHARS;

  if (difficulty) {
    chars = chars.filter(char => char.difficulty === difficulty);
  }

  // Fisher-Yates 洗牌算法
  const shuffled = [...chars];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, count);
};

/**
 * 根据类别获取甲骨文
 */
export const getOracleCharsByCategory = (category: string): OracleBoneChar[] => {
  return ORACLE_BONE_CHARS.filter(char => char.category === category);
};

/**
 * 根据难度获取甲骨文
 */
export const getOracleCharsByDifficulty = (difficulty: 'easy' | 'medium' | 'hard'): OracleBoneChar[] => {
  return ORACLE_BONE_CHARS.filter(char => char.difficulty === difficulty);
};

/**
 * 根据ID获取甲骨文详情
 */
export const getOracleCharById = (id: string): OracleBoneChar | undefined => {
  return ORACLE_BONE_CHARS.find(char => char.id === id);
};

/**
 * 计算得分
 */
export const calculateScore = (answers: Record<string, string>, correctAnswers: Record<string, string>): number => {
  let correct = 0;

  Object.keys(answers).forEach(id => {
    if (answers[id] === correctAnswers[id]) {
      correct++;
    }
  });

  return Math.round((correct / Object.keys(answers).length) * 100);
};
