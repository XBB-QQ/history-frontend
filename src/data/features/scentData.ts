/**
 * 历史气味博物馆数据
 * 包含不同历史时期的代表性气味及其描述
 */

export interface HistoricalScent {
  id: string;
  name: string;
  dynasty: string;
  era: string;
  description: string;
  baseScent: string;
  secondaryScent?: string;
  accords: string[];
  atmosphere: string;
  visualElements: string[];
  soundElements: string[];
  timeOfDay: '清晨' | '正午' | '黄昏' | '深夜';
  temperature: '极寒' | '寒冷' | '温暖' | '炎热';
  intensity: number; // 1-10
  emotionalImpact: string;
  historicalContext: string;
  trivia: string[];
  soundscape: string;
  texture: string;
  energy: 'calm' | 'energetic' | 'melancholy' | 'grand' | 'intimate';
  tags: string[];
}

/**
 * 历史时期分类
 */
export const DYNASTY_LABELS = {
  shang: '商代',
  zhou: '周代',
  qin: '秦代',
  han: '汉代',
  tang: '唐代',
  song: '宋代',
  yuan: '元代',
  ming: '明代',
  qing: '清代',
  republic: '民国',
  modern: '现代'
} as const;

/**
 * 核心气味数据
 */
export const HISTORICAL_SCENTS: HistoricalScent[] = [
  // 商代
  {
    id: 'scent-001',
    name: '青铜锻造的气息',
    dynasty: '商代',
    era: '公元前1600-前1046年',
    description: '商代青铜文明的标志性气味，混合着冶炼的热度与原始金属的味道。能感受到古代工匠们精心雕琢的虔诚。',
    baseScent: '金属',
    secondaryScent: '焦炭',
    accords: ['金属', '木质', '烟熏', '泥土'],
    atmosphere: '庄严肃穆，神圣不可侵犯',
    visualElements: ['熊熊炉火', '青铜器皿', '工匠的手', '飞扬的火星'],
    soundElements: ['打铁声', '炉火呼啸', '远处祭祀的钟声', '工匠的喘息'],
    timeOfDay: '正午',
    temperature: '炎热',
    intensity: 8,
    emotionalImpact: '震撼、敬畏、神秘',
    historicalContext: '商代崇尚鬼神，青铜器主要用于祭祀。这种气味代表着权力的象征与祖先的呼唤。',
    trivia: [
      '商代青铜器含有微量砷，使青铜呈现出独特的金黄色光泽',
      '青铜冶炼需要高达1000°C以上的高温',
      '商代工匠使用"失蜡法"制作复杂的青铜纹饰'
    ],
    soundscape: '锤子击打砧板的节奏，混合着风箱的鼓动声',
    texture: '粗糙、温热、坚实',
    energy: 'grand',
    tags: ['商代', '青铜', '祭祀', '青铜器', '商朝']
  },
  {
    id: 'scent-002',
    name: '甲骨占卜的香灰',
    dynasty: '商代',
    era: '公元前1600-前1046年',
    description: '龟甲与兽骨经过火灼后的灰烬，混合着祭祀用的香料。一种古老而神秘的气息，仿佛在回应着先民对上天的求问。',
    baseScent: '烟灰',
    secondaryScent: '檀香',
    accords: ['烟熏', '木质', '干燥', '宗教'],
    atmosphere: '虔诚、困惑、寻找答案',
    visualElements: ['龟甲裂痕', '燃烧的香烛', '祭司的跪姿', '祖先的阴影'],
    soundElements: ['龟甲炸裂声', '柴火噼啪', '低沉的吟唱', '香灰掉落声'],
    timeOfDay: '深夜',
    temperature: '凉爽',
    intensity: 6,
    emotionalImpact: '疑惑、渴望、灵性连接',
    historicalContext: '商代人通过灼烧甲骨观察裂纹来预测吉凶。这种气味是商代祭祀活动的核心体验。',
    trivia: [
      '甲骨占卜使用的甲骨多为龟腹甲或牛肩胛骨',
      '商代人认为裂纹显示神的旨意',
      '占卜后的甲骨会记录在"卜辞"中'
    ],
    soundscape: '火舌舔舐骨头的滋滋声，低沉的鼓点',
    texture: '干燥、焦脆、细腻',
    energy: 'calm',
    tags: ['商代', '甲骨文', '占卜', '祭祀', '商朝']
  },

  // 汉代
  {
    id: 'scent-003',
    name: '丝绸之路的香料',
    dynasty: '汉代',
    era: '公元前202-公元220年',
    description: '来自西域的沉香、肉桂、孜然等香料，混合着沙漠的干燥气息与丝绸之路的尘土。这是东西方文明交融的气味记忆。',
    baseScent: '香料',
    secondaryScent: '尘土',
    accords: ['异域', '辛辣', '温暖', '干燥'],
    atmosphere: '广阔、探索、交流',
    visualElements: ['驼队行进', '连绵沙丘', '星空', '绿洲'],
    soundElements: ['驼铃声', '风沙呼啸', '异域乐器的节奏', '商人的吆喝'],
    timeOfDay: '黄昏',
    temperature: '炎热',
    intensity: 7,
    emotionalImpact: '向往、自由、跨文化交流',
    historicalContext: '张骞通西域后，汉朝与西域建立了紧密联系，香料贸易成为繁荣的经济支柱。',
    trivia: [
      '汉代长途驼队一次出行需要200-300峰骆驼',
      '沉香在汉代被视为贵族的专属香料',
      '肉桂通过丝绸之路传入，改变了汉代饮食文化'
    ],
    soundscape: '驼铃声渐行渐远，混合着远处的乐声',
    texture: '细腻、燥热、流动',
    energy: 'energetic',
    tags: ['汉代', '丝绸之路', '香料', '张骞', '西域']
  },
  {
    id: 'scent-004',
    name: '汉宫的沉水香',
    dynasty: '汉代',
    era: '公元前202-公元220年',
    description: '汉宫深处缓缓升起的沉水香，混合着丝绸的柔软与玉石的清冷。一种宫廷特有的气息，象征着皇权的尊贵与帝王的威仪。',
    baseScent: '木质',
    secondaryScent: '花果',
    accords: ['华丽', '优雅', '冷冽', '香气'],
    atmosphere: '奢华、肃穆、深沉',
    visualElements: ['高耸的宫殿', '蜿蜒的回廊', '宫女踏步', '皇帝的龙袍'],
    soundElements: ['琴瑟和鸣', '漏刻滴水', '远处的钟声', '丝竹声'],
    timeOfDay: '深夜',
    temperature: '凉爽',
    intensity: 5,
    emotionalImpact: '庄重、孤独、崇高',
    historicalContext: '汉代崇尚黄老思想，宫殿祭祀与日常生活中广泛使用香料。沉水香价格昂贵，只有皇室享用。',
    trivia: [
      '沉水香是香中极品，入水即沉',
      '汉宫用"博山炉"燃烧香料',
      '汉代宫女有专门的"香室"负责熏香'
    ],
    soundscape: '悠扬的古琴声，混合着香炉的轻响',
    texture: '柔软、清冷、绵长',
    energy: 'calm',
    tags: ['汉代', '沉水香', '汉宫', '皇室', '博山炉']
  },

  // 唐代
  {
    id: 'scent-005',
    name: '长安的牡丹香',
    dynasty: '唐代',
    era: '公元618-907年',
    description: '大唐盛世的花香，牡丹的浓郁混合着长安城的繁华气息。能感受到李白吟诗的狂放与杨贵妃的丰韵，是大唐文化的缩影。',
    baseScent: '花香',
    secondaryScent: '酒香',
    accords: ['繁花', '馥郁', '华丽', '奔放'],
    atmosphere: '热闹、浪漫、雍容',
    visualElements: ['百花争艳', '长安酒楼', '舞女的裙摆', '诗人的酒杯'],
    soundElements: ['酒杯碰撞', '吟诗声', '胡旋舞的音乐', '长安的市井喧闹'],
    timeOfDay: '正午',
    temperature: '温暖',
    intensity: 8,
    emotionalImpact: '愉悦、豪迈、陶醉',
    historicalContext: '唐代是中国古代文化的巅峰，长安城是当时世界上最繁华的国际都市。牡丹成为大唐精神的象征。',
    trivia: [
      '唐代牡丹品种达到顶峰，"姚黄魏紫"成为名品',
      '李白写有《清平调》赞美杨贵妃',
      '长安城内酒肆林立，胡商云集'
    ],
    soundscape: '喧闹的市井声，混合着酒杯的碰撞与诗人的吟诵',
    texture: '柔软、馥郁、流动',
    energy: 'energetic',
    tags: ['唐代', '牡丹', '长安', '大唐', '诗歌']
  },
  {
    id: 'scent-006',
    name: '大唐胡风的烤肉香',
    dynasty: '唐代',
    era: '公元618-907年',
    description: '长安夜市的烤肉香，混合着孜然的辛辣与羊肉的鲜香。胡旋舞的热烈，胡人的喧闹，展现出大唐包容开放的胸怀。',
    baseScent: '肉香',
    secondaryScent: '孜然',
    accords: ['浓郁', '热烈', '异域', '食欲'],
    atmosphere: '热闹、欢庆、开放',
    visualElements: ['夜市灯火', '胡姬跳舞', '烤肉摊', '欢聚的人群'],
    soundElements: ['烤肉滋滋声', '胡旋舞的音乐', '市井喧闹', '胡人的欢呼声'],
    timeOfDay: '夜晚',
    temperature: '温暖',
    intensity: 9,
    emotionalImpact: '满足、欢乐、激昂',
    historicalContext: '唐代对外交流频繁，胡风盛行。胡旋舞、胡姬、烤肉成为长安夜市的标志性元素。',
    trivia: [
      '唐代烤肉使用孜然调味，这是从西域传入的',
      '胡旋舞来自中亚地区，唐代著名舞曲',
      '长安夜市一直持续到深夜，甚至通宵'
    ],
    soundscape: '滋滋作响的烤肉声，欢快的胡旋舞音乐',
    texture: '厚重、热烈、直接',
    energy: 'energetic',
    tags: ['唐代', '烤肉', '长安', '胡风', '胡旋舞']
  },

  // 宋代
  {
    id: 'scent-007',
    name: '清明上河图的市井',
    dynasty: '宋代',
    era: '公元960-1279年',
    description: '汴京（开封）的市井气息，叫卖声、茶香、酒香、香料的混合。这是宋代商业繁荣的活化石，能感受到普通市民的日常生活。',
    baseScent: '尘土',
    secondaryScent: '茶香',
    accords: ['世俗', '生活气息', '繁忙', '亲切'],
    atmosphere: '热闹、亲切、真实',
    visualElements: ['汴河船只', '虹桥', '商铺招牌', '市井行人'],
    soundElements: ['叫卖声', '船夫号子', '市井喧闹', '算盘声'],
    timeOfDay: '正午',
    temperature: '温暖',
    intensity: 7,
    emotionalImpact: '亲切、忙碌、满足',
    historicalContext: '宋代商业极度发达，开封是当时世界上最大的城市。清明上河图生动描绘了汴京的繁华景象。',
    trivia: [
      '宋代诞生了中国第一张完整的城市全景图——清明上河图',
      '宋代坊市制度被打破，夜市和早市盛行',
      '宋代茶文化达到顶峰，"点茶"成为流行'
    ],
    soundscape: '叫卖声、船夫号子、算盘声交织成一幅市井交响曲',
    texture: '粗粝、真实、温暖',
    energy: 'energetic',
    tags: ['宋代', '开封', '市井', '商业', '清明上河图']
  },
  {
    id: 'scent-008',
    name: '宋人的沉香与茶道',
    dynasty: '宋代',
    era: '公元960-1279年',
    description: '文人雅士的清雅气息，沉香缭绕，茶香袅袅。墨香与纸香交织，体现宋代文人的精神追求——清雅、内敛、超越世俗。',
    baseScent: '木质',
    secondaryScent: '茶香',
    accords: ['清雅', '内敛', '书卷气', '禅意'],
    atmosphere: '宁静、雅致、深邃',
    visualElements: ['书房窗前', '研墨挥毫', '点茶品茗', '竹林深处的雅集'],
    soundElements: ['窗外的雨声', '研墨的沙沙声', '古琴声', '茶具轻碰声'],
    timeOfDay: '黄昏',
    temperature: '凉爽',
    intensity: 4,
    emotionalImpact: '宁静、深邃、顿悟',
    historicalContext: '宋代文人精神高度发展，理学兴起。文人雅士以沉香、茶道、书法为雅事，追求内心的宁静与升华。',
    trivia: [
      '宋代"点茶"技艺达到顶峰，是现代茶道的雏形',
      '沉香在宋代有"香中之王"的美誉',
      '宋徽宗是茶道大师，著有《大观茶论》'
    ],
    soundscape: '窗外的雨声，研墨的沙沙声，古琴的悠扬声',
    texture: '细腻、清冷、绵长',
    energy: 'calm',
    tags: ['宋代', '沉香', '茶道', '文人', '点茶']
  },

  // 明代
  {
    id: 'scent-009',
    name: '紫禁城的檀香',
    dynasty: '明代',
    era: '公元1368-1644年',
    description: '紫禁城正殿的檀香烟雾，庄严肃穆，与殿前的金水河相映成趣。明代皇室对祭祀的重视，皇权的威仪，都浓缩在这缕檀香中。',
    baseScent: '檀香',
    secondaryScent: '金铜',
    accords: ['庄严', '威严', '金色', '神圣'],
    atmosphere: '庄重、肃穆、神圣',
    visualElements: ['午门', '金水河', '太和殿', '皇帝的龙袍'],
    soundElements: ['晨钟暮鼓', '仪式的法器声', '远处宫女的脚步声', '风过屋檐'],
    timeOfDay: '清晨',
    temperature: '凉爽',
    intensity: 6,
    emotionalImpact: '敬畏、庄严、崇高',
    historicalContext: '紫禁城在明代建立，成为明清两代的皇宫。明代皇室对祭祀极为重视，正殿常年燃烧檀香。',
    trivia: [
      '紫禁城太和殿又称"金銮殿"，是皇帝举行大典的地方',
      '明代使用"中和韶乐"进行皇家祭祀',
      '檀香是明代皇室祭祀的主要香料'
    ],
    soundscape: '晨钟的悠扬，混合着风过宫殿的回响',
    texture: '厚重、金色、绵长',
    energy: 'grand',
    tags: ['明代', '紫禁城', '檀香', '祭祀', '皇权']
  },
  {
    id: 'scent-010',
    name: '苏州园林的荷风',
    dynasty: '明代',
    era: '公元1368-1644年',
    description: '江南园林的清雅气息，荷香、竹香、水汽交织。能感受到明代文人对隐逸生活的向往，园林中的每一处景观都融入了诗情画意。',
    baseScent: '花香',
    secondaryScent: '竹香',
    accords: ['清雅', '诗意', '隐逸', '自然'],
    atmosphere: '清幽、雅致、诗意',
    visualElements: ['池塘荷花', '曲桥回廊', '太湖石', '读书的文人'],
    soundElements: ['雨打荷叶声', '风吹竹林声', '远处更漏声', '文人吟诗声'],
    timeOfDay: '黄昏',
    temperature: '凉爽',
    intensity: 5,
    emotionalImpact: '宁静、雅致、诗意',
    historicalContext: '明代文人偏爱园林生活，苏州成为园林之城。园林设计讲究"虽由人作，宛自天开"的意境。',
    trivia: [
      '苏州园林被誉为"中国园林之母"',
      '明代文震亨著有《长物志》，是造园指南',
      '园林中的"借景"手法将远处景色引入视野'
    ],
    soundscape: '雨打荷叶声，风吹竹林声，远处更漏声',
    texture: '柔软、清冷、绵长',
    energy: 'calm',
    tags: ['明代', '园林', '苏州', '荷风', '隐逸']
  },

  // 清代
  {
    id: 'scent-011',
    name: '颐和园的昆明湖',
    dynasty: '清代',
    era: '公元1644-1911年',
    description: '颐和园昆明湖的湿润气息，荷花香与水汽交织。能感受到清代皇家园林的气魄，帝王的富丽与艺术的完美融合。',
    baseScent: '水汽',
    secondaryScent: '荷花',
    accords: ['开阔', '华丽', '水灵', '皇家'],
    atmosphere: '宏大、秀丽、富贵',
    visualElements: ['昆明湖波光', '十七孔桥', '佛香阁', '垂柳倒影'],
    soundElements: ['船桨划水声', '风吹垂柳声', '远处钟声', '游人的欢笑声'],
    timeOfDay: '正午',
    temperature: '温暖',
    intensity: 6,
    emotionalImpact: '愉悦、舒适、富贵',
    historicalContext: '颐和园是清代皇家园林的代表作，昆明湖是园林的核心。它集中了中国古典园林艺术的精华。',
    trivia: [
      '昆明湖面积占颐和园的三分之二',
      '十七孔桥有544只石狮子，是中国最长古代石桥',
      '佛香阁是颐和园的制高点，高达41米'
    ],
    soundscape: '船桨划水声，风吹垂柳声，远处钟声',
    texture: '湿润、柔软、流动',
    energy: 'grand',
    tags: ['清代', '颐和园', '昆明湖', '园林', '皇家']
  },
  {
    id: 'scent-012',
    name: '江南烟雨的茶馆',
    dynasty: '清代',
    era: '公元1644-1911年',
    description: '江南小镇的茶馆气息，热茶、蒸笼、糖糕的香气。茶馆里的说书人、评弹艺人，营造出一种悠闲而充满市井情趣的氛围。',
    baseScent: '茶香',
    secondaryScent: '糕点香',
    accords: ['亲切', '悠闲', '生活气息', '亲切'],
    atmosphere: '闲适、亲切、民间',
    visualElements: ['江南小桥', '茶馆庭院', '说书人', '茶客闲聊'],
    soundElements: ['说书的声音', '评弹的乐器声', '蒸笼的呼呼声', '茶客的闲聊'],
    timeOfDay: '午后',
    temperature: '温暖',
    intensity: 6,
    emotionalImpact: '闲适、亲切、满足',
    historicalContext: '清代江南茶馆文化发达，茶馆是民间娱乐和交流的中心。说书和评弹是茶馆的两大特色。',
    trivia: [
      '苏州评弹是江南传统曲艺形式',
      '清代茶馆兼有餐饮、娱乐、社交功能',
      '江南茶馆的茶点以糖糕、汤团、糕点为主'
    ],
    soundscape: '说书的声音，评弹的乐器声，蒸笼的呼呼声',
    texture: '温热、柔软、亲切',
    energy: 'calm',
    tags: ['清代', '茶馆', '江南', '评弹', '说书']
  },

  // 民国时期
  {
    id: 'scent-013',
    name: '老上海的咖啡香',
    era: '民国时期',
    description: '老上海咖啡馆的混合气息，咖啡豆的烘焙香与老洋房的木质气息交织。能感受到民国时期的中西合璧，新旧交替的繁华。',
    baseScent: '咖啡香',
    secondaryScent: '木质',
    accords: ['时尚', '怀旧', '浪漫', '洋气'],
    atmosphere: '时尚、优雅、怀旧',
    visualElements: ['百乐门舞厅', '老洋房', '留声机', '穿着旗袍的女子'],
    soundElements: ['留声机的音乐', '舞步的节奏', '留声机的旋转声', '钢琴声'],
    timeOfDay: '夜晚',
    temperature: '凉爽',
    intensity: 5,
    emotionalImpact: '优雅、怀旧、浪漫',
    historicalContext: '上海是民国时期最繁华的国际都市，咖啡馆成为上流社会的社交场所。百乐门等场所代表了中国近代文化的开放与融合。',
    trivia: [
      '百乐门是民国时期上海最著名的舞厅',
      '民国时期上海的咖啡文化深受西方影响',
      '老上海旗袍是中西合璧的时尚代表'
    ],
    soundscape: '留声机的音乐，舞步的节奏，钢琴声',
    texture: '温热、优雅、绵长',
    energy: 'energetic',
    tags: ['民国', '老上海', '咖啡', '百乐门', '旗袍']
  },
  {
    id: 'scent-014',
    name: '大学图书馆的油墨',
    era: '民国时期',
    description: '大学图书馆的清冷气息，新书油墨、陈旧纸张与读书声的混合。能感受到民国知识分子的理想与追求，在动荡年代坚持学术的精神。',
    baseScent: '油墨',
    secondaryScent: '纸张',
    accords: ['书卷气', '理想主义', '清冷', '宁静'],
    atmosphere: '清冷、理想主义、学术',
    visualElements: ['大学图书馆', '翻开的书', '学生读书', '窗外的梧桐树'],
    soundElements: ['翻书声', '笔尖书写声', '远处钟声', '风吹梧桐叶'],
    timeOfDay: '深夜',
    temperature: '凉爽',
    intensity: 4,
    emotionalImpact: '坚定、理想、宁静',
    historicalContext: '民国时期中国大学蓬勃发展，图书馆是知识分子汲取知识的殿堂。在战乱年代，学术理想更显珍贵。',
    trivia: [
      '清华大学、北京大学等名校在民国时期培育了大量人才',
      '民国时期的大学图书馆收藏了大量珍贵书籍',
      '新文化运动推动了白话文运动，新书的油墨味充满变革气息'
    ],
    soundscape: '翻书声，笔尖书写声，风吹梧桐叶声',
    texture: '干燥、清冷、绵长',
    energy: 'calm',
    tags: ['民国', '大学', '图书馆', '油墨', '学术']
  },

  // 现代历史
  {
    id: 'scent-015',
    name: '红色经典的油墨',
    era: '建国初期',
    description: '50年代的油墨气息，印刷厂新书的味道。代表着新中国文化建设的热情，红色经典书籍散发着理想主义的光芒。',
    baseScent: '油墨',
    secondaryScent: '纸张',
    accords: ['革命', '理想', '书卷气', '奋斗'],
    atmosphere: '热烈、奋斗、理想主义',
    visualElements: ['印刷厂机器', '堆积的书籍', '工人的汗水', '红旗飘扬'],
    soundElements: ['印刷机的轰鸣', '机器的运转声', '工人的欢呼声', '远处的口号声'],
    timeOfDay: '正午',
    temperature: '炎热',
    intensity: 7,
    emotionalImpact: '激情、奋斗、希望',
    historicalContext: '建国初期，文化出版事业蓬勃发展，大量红色经典书籍出版发行。印刷厂是新时代文化建设的阵地。',
    trivia: [
      '50年代是中国印刷工业发展的黄金时期',
      '《红楼梦》《三国演义》等古典名著在50年代出版',
      '连环画（小人书）在50年代非常流行'
    ],
    soundscape: '印刷机的轰鸣声，工人的欢呼声',
    texture: '厚重、干燥、书卷气',
    energy: 'energetic',
    tags: ['建国', '油墨', '印刷', '红色经典', '50年代']
  },
  {
    id: 'scent-016',
    name: '改革开放的春风',
    era: '改革开放初期',
    description: '80年代改革的气息，夹杂着市场经济的萌芽与商业的活力。街头小贩的叫卖，新厂的机器声，交织成中国经济腾飞的序曲。',
    baseScent: '尘土',
    secondaryScent: '金属',
    accords: ['生机', '变革', '活力', '希望'],
    atmosphere: '活跃、变革、希望',
    visualElements: ['改革标语', '街头小贩', '新工厂', '期待的眼神'],
    soundElements: ['改革标语声', '机器运转声', '小贩的叫卖', '人们的欢呼声'],
    timeOfDay: '正午',
    temperature: '温暖',
    intensity: 8,
    emotionalImpact: '兴奋、希望、激动',
    historicalContext: '改革开放初期，中国经济开始腾飞，市场经济逐渐活跃。街头的小贩、工厂的机器，都代表着新的希望。',
    trivia: [
      '1978年党的十一届三中全会开启改革开放',
      '80年代"个体户"成为新职业，街头小贩增多',
      '乡镇企业开始兴起，成为中国经济的重要力量'
    ],
    soundscape: '改革标语声，机器运转声，小贩的叫卖',
    texture: '粗糙、温热、活跃',
    energy: 'energetic',
    tags: ['改革开放', '80年代', '变革', '活力', '希望']
  },
  {
    id: 'scent-017',
    name: '新时代的早晨',
    era: '21世纪',
    description: '现代都市的清晨气息，混合着早餐的香气、地铁的繁忙与人们的忙碌。代表着新时代的节奏与活力，是当代中国人的真实体验。',
    baseScent: '咖啡香',
    secondaryScent: '豆浆',
    accords: ['现代', '忙碌', '活力', '真实'],
    atmosphere: '现代、忙碌、活力',
    visualElements: ['现代都市', '地铁车厢', '匆忙的上班族', '繁华的街道'],
    soundElements: ['地铁报站', '车流的鸣笛', '手机铃声', '人们的交谈'],
    timeOfDay: '清晨',
    temperature: '凉爽',
    intensity: 6,
    emotionalImpact: '紧张、期待、活力',
    historicalContext: '21世纪是中国快速发展的时代，都市生活节奏加快。现代科技与传统文化交融，形成了独特的时代气息。',
    trivia: [
      '中国城市化率在21世纪初快速提升',
      '智能手机和互联网改变了人们的生活方式',
      '现代都市文化成为中国文化的重要组成部分'
    ],
    soundscape: '地铁报站，车流的鸣笛，手机铃声',
    texture: '现代、光滑、流动',
    energy: 'energetic',
    tags: ['21世纪', '现代', '都市', '忙碌', '活力']
  }
];

/**
 * 按时期分类的气味
 */
export const SCENTS_BY_DYNASTY: Record<string, HistoricalScent[]> = {
  shang: HISTORICAL_SCENTS.filter(s => s.dynasty === '商代'),
  zhou: [],
  qin: [],
  han: HISTORICAL_SCENTS.filter(s => s.dynasty === '汉代'),
  tang: HISTORICAL_SCENTS.filter(s => s.dynasty === '唐代'),
  song: HISTORICAL_SCENTS.filter(s => s.dynasty === '宋代'),
  yuan: [],
  ming: HISTORICAL_SCENTS.filter(s => s.dynasty === '明代'),
  qing: HISTORICAL_SCENTS.filter(s => s.dynasty === '清代'),
  republic: HISTORICAL_SCENTS.filter(s => s.era === '民国时期'),
  modern: HISTORICAL_SCENTS.filter(s => s.era === '21世纪')
};

/**
 * 按氛围能量分类
 */
export const SCENTS_BY_ENERGY: Record<string, HistoricalScent[]> = {
  calm: HISTORICAL_SCENTS.filter(s => s.energy === 'calm'),
  energetic: HISTORICAL_SCENTS.filter(s => s.energy === 'energetic'),
  melancholy: [],
  grand: HISTORICAL_SCENTS.filter(s => s.energy === 'grand'),
  intimate: []
};

/**
 * 热门气味（推荐给用户）
 */
export const POPULAR_SCENTS = HISTORICAL_SCENTS.filter(s => s.tags.includes('热门') || Math.random() > 0.7).slice(0, 6);

/**
 * 获取气味能量的颜色
 */
export const ENERGY_COLORS = {
  calm: 'from-blue-400 to-teal-500',
  energetic: 'from-orange-400 to-red-500',
  melancholy: 'from-gray-400 to-slate-500',
  grand: 'from-amber-400 to-yellow-500',
  intimate: 'from-pink-400 to-rose-500'
};

/**
 * 获取气味的图标
 */
export const ScentIcons = {
  bronze: '🛡️',
  oracle: '📜',
  silkRoad: '🐪',
  palace: '🏯',
  peony: '🌸',
  barbecue: '🍖',
  town: '🏪',
  tea: '🍵',
  garden: '🌿',
  lake: '🌊',
  cafe: '☕',
  library: '📚',
  printing: '🖨️',
  reform: '🚀',
  modern: '🏙️'
};

/**
 * 根据ID获取气味
 */
export const getScentById = (id: string): HistoricalScent | undefined => {
  return HISTORICAL_SCENTS.find(s => s.id === id);
};
