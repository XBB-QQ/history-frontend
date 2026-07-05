// 历史预言板/未来推演数据
export interface HistoricalEvent {
  id: string;
  name: string;
  displayName: string;
  year: number;
  type: 'political' | 'economic' | 'social' | 'cultural' | 'technological' | 'environmental';
  region: string;
  description: string;
  impact: string;
  consequences: string[];
  probability: number;  // 0-100
  predictedBy: string[];
  category: string;
}

export interface TimelineEvent {
  id: string;
  year: number;
  event: string;
  type: string;
  region: string;
  impactLevel: 'high' | 'medium' | 'low';
}

export interface PredictionScenario {
  id: string;
  title: string;
  description: string;
  startingPoint: string;
  variables: PredictionVariable[];
  scenarios: ScenarioBranch[];
}

export interface PredictionVariable {
  id: string;
  name: string;
  description: string;
  min: number;
  max: number;
  currentValue: number;
  trend: 'increasing' | 'decreasing' | 'stable';
}

export interface ScenarioBranch {
  id: string;
  title: string;
  description: string;
  outcome: string;
  probability: number;
  yearsToEvent: number;
  keyChanges: string[];
}

export interface FutureEvent {
  id: string;
  year: number;
  event: string;
  type: string;
  probability: number;
  likelihood: string;
  factors: string[];
  impact: string;
}

// 历史关键事件
export const HISTORICAL_EVENTS: HistoricalEvent[] = [
  {
    id: 'fall-of-western-zhou',
    name: '西周灭亡',
    displayName: '西周灭亡',
    year: -771,
    type: 'political',
    region: '黄河流域',
    description: '周幽王因宠幸褒姒，烽火戏诸侯，导致诸侯不至，犬戎趁机入侵，西周灭亡。东周开始。',
    impact: '中国历史进入诸侯争霸的春秋战国时期，思想文化迎来了百家争鸣的黄金时代',
    consequences: ['周天子权威衰落', '诸侯国争霸', '礼崩乐坏', '士阶层崛起'],
    probability: 100,
    predictedBy: ['孔子', '司马迁', '历史学家'],
    category: '政治变革'
  },
  {
    id: 'warring-states',
    name: '战国七雄',
    displayName: '战国七雄',
    year: -475,
    type: 'political',
    region: '黄河流域',
    description: '中国进入战国时期，战国七雄齐、楚、燕、韩、赵、魏、秦并立，战争频繁',
    impact: '战国时期是中国历史上思想最活跃的时期，诸子百家争鸣，为后世奠定了丰富的思想基础',
    consequences: ['兼并战争频繁', '中央集权思想萌芽', '经济文化快速发展', '秦始皇统一六国'],
    probability: 100,
    predictedBy: ['韩非子', '贾谊', '司马光'],
    category: '政治变革'
  },
  {
    id: 'qin-unification',
    name: '秦朝统一',
    displayName: '秦朝统一',
    year: -221,
    type: 'political',
    region: '黄河流域',
    description: '秦国最终统一六国，建立中国历史上第一个大一统王朝，推行郡县制、统一度量衡等政策',
    impact: '奠定了中国大一统的格局，统一度量衡和文字促进了文化交流和发展',
    consequences: ['建立郡县制', '统一文字', '统一度量衡', '修筑长城', '书同文车同轨'],
    probability: 100,
    predictedBy: ['李斯', '秦始皇', '后世史学家'],
    category: '政治变革'
  },
  {
    id: 'han-silk-road',
    name: '丝绸之路',
    displayName: '丝绸之路开通',
    year: -138,
    type: 'economic',
    region: '西域',
    description: '张骞出使西域，开辟了连接中原与西域的丝绸之路，促进了东西方经济文化交流',
    impact: '丝绸之路的开通开启了东西方交流的序幕，对人类文明发展产生了深远影响',
    consequences: ['东西方贸易繁荣', '文化交流频繁', '佛教传入中国', '西域文明传入中原'],
    probability: 100,
    predictedBy: ['张骞', '汉武帝', '张骞传'],
    category: '经济变革'
  },
  {
    id: 'tang-an-shi-rebellion',
    name: '安史之乱',
    displayName: '安史之乱',
    year: 755,
    type: 'political',
    region: '黄河流域',
    description: '安禄山、史思明发动叛乱，唐朝由盛转衰，藩镇割据局面形成',
    impact: '安史之乱是唐朝由盛转衰的转折点，对唐朝乃至中国历史产生了深远影响',
    consequences: ['唐朝由盛转衰', '藩镇割据', '经济重心南移', '士大夫阶层崛起'],
    probability: 100,
    predictedBy: ['杜甫', '白居易', '唐朝史学家'],
    category: '政治变革'
  },
  {
    id: 'song-jingkang',
    name: '靖康之变',
    displayName: '靖康之变',
    year: 1127,
    type: 'political',
    region: '黄河流域',
    description: '金兵攻破开封，北宋灭亡，南宋建立，中国进入南北对峙时期',
    impact: '北宋灭亡标志着中原文化的重创，南宋在南方继续发展文化经济',
    consequences: ['北宋灭亡', '南宋建立', '中原文化南移', '北方沦陷'],
    probability: 100,
    predictedBy: ['李纲', '岳飞', '史学家'],
    category: '政治变革'
  },
  {
    id: 'mongol-invasion',
    name: '元朝建立',
    displayName: '元朝建立',
    year: 1271,
    type: 'political',
    region: '中国全境',
    description: '忽必烈建立元朝，成为中国历史上第一个由少数民族建立的大一统王朝',
    impact: '元朝打破了汉族与其他民族的隔阂，促进了多民族国家的形成',
    consequences: ['多民族融合', '文化大交流', '行省制建立', '科技传播'],
    probability: 100,
    predictedBy: ['忽必烈', '元史学家', '马可·波罗'],
    category: '政治变革'
  },
  {
    id: 'ming-fall',
    name: '明朝灭亡',
    displayName: '明朝灭亡',
    year: 1644,
    type: 'political',
    region: '中国全境',
    description: '李自成攻破北京，崇祯帝自缢，明朝灭亡，满族入关建立清朝',
    impact: '明朝的灭亡标志着中国封建社会的晚期，清朝的建立改变了中国的政治格局',
    consequences: ['明朝灭亡', '清朝建立', '满汉融合', '农耕文明顶峰'],
    probability: 100,
    predictedBy: ['顾炎武', '黄宗羲', '史学家'],
    category: '政治变革'
  },
  {
    id: 'opium-wars',
    name: '鸦片战争',
    displayName: '鸦片战争',
    year: 1840,
    type: 'political',
    region: '中国沿海',
    description: '英国发动鸦片战争，中国开始沦为半殖民地半封建社会',
    impact: '鸦片战争是中国历史的转折点，标志着中国近代史的开端',
    consequences: ['签订不平等条约', '割地赔款', '丧失主权', '民族危机加深'],
    probability: 100,
    predictedBy: ['林则徐', '魏源', '鸦片战争史学家'],
    category: '政治变革'
  },
  {
    id: 'reform-1898',
    name: '戊戌变法',
    displayName: '戊戌变法',
    year: 1898,
    type: 'political',
    region: '中国全境',
    description: '光绪帝推行戊戌变法，试图通过改革挽救国家危机，但六天后被慈禧太后镇压',
    impact: '戊戌变法虽然失败，但推动了中国近代化的进程，影响了后来的辛亥革命',
    consequences: ['变法失败', '六君子牺牲', '清朝加速衰落', '革命思想传播'],
    probability: 100,
    predictedBy: ['康有为', '梁启超', '百日维新参与者'],
    category: '政治变革'
  },
  {
    id: 'xinhai-revolution',
    name: '辛亥革命',
    displayName: '辛亥革命',
    year: 1911,
    type: 'political',
    region: '中国全境',
    description: '武昌起义爆发，辛亥革命成功推翻清朝统治，建立中华民国，结束了中国两千多年的封建帝制',
    impact: '辛亥革命是中国近代史上一次伟大的资产阶级民主革命，标志着中国封建帝制的终结',
    consequences: ['清朝灭亡', '中华民国建立', '结束帝制', '民主共和思想传播'],
    probability: 100,
    predictedBy: ['孙中山', '黄兴', '革命党人'],
    category: '政治变革'
  },
  {
    id: 'may-4th-movement',
    name: '五四运动',
    displayName: '五四运动',
    year: 1919,
    type: 'social',
    region: '中国全境',
    description: '北京学生举行示威游行，抗议巴黎和会外交失败，要求收回山东主权',
    impact: '五四运动是一次彻底的反帝反封建的爱国运动，标志着中国新民主主义革命的开始',
    consequences: ['思想解放', '马克思主义传入', '中共建立', '文学革命'],
    probability: 100,
    predictedBy: ['陈独秀', '李大钊', '五四运动参与者'],
    category: '社会变革'
  },
  {
    id: 'xinhai-earthquake',
    name: '汶川大地震',
    displayName: '汶川大地震',
    year: 2008,
    type: 'environmental',
    region: '四川',
    description: '四川汶川发生8.0级大地震，造成巨大的人员伤亡和财产损失',
    impact: '汶川地震举国震惊，彰显了中国的团结和救援力量，也引发了对抗灾减灾的深刻反思',
    consequences: ['巨大人员伤亡', '灾后重建', '抗震救灾机制完善', '全民防灾意识提高'],
    probability: 100,
    predictedBy: ['气象学家', '地震学家', '救援人员'],
    category: '环境灾害'
  },
  {
    id: 'covid-19',
    name: '新冠疫情',
    displayName: '新冠疫情',
    year: 2020,
    type: 'environmental',
    region: '全球',
    description: '新冠病毒疫情在全球爆发，造成全球范围内的公共卫生危机',
    impact: '新冠疫情对全球政治、经济、社会产生了深远影响，推动了全球合作和反思',
    consequences: ['全球大流行', '经济衰退', '社会变革', '健康意识提高'],
    probability: 100,
    predictedBy: ['科学家', '公共卫生专家', '医学专家'],
    category: '环境灾害'
  },
  {
    id: 'ai-revolution',
    name: '人工智能革命',
    displayName: '人工智能革命',
    year: 2025,
    type: 'technological',
    region: '全球',
    description: 'AI技术取得突破性进展，ChatGPT等AI应用广泛普及，开始改变人类生产生活方式',
    impact: 'AI革命将深刻改变人类的工作、学习和生活方式，带来巨大的机遇和挑战',
    consequences: ['自动化普及', '就业结构变化', '生产效率提升', '社会治理模式改变'],
    probability: 85,
    predictedBy: ['科技专家', 'AI研究者', '未来学家'],
    category: '技术革命'
  },
  {
    id: 'climate-crisis',
    name: '气候危机',
    displayName: '气候危机',
    year: 2050,
    type: 'environmental',
    region: '全球',
    description: '全球平均气温持续上升，极端天气事件频发，海平面上升威胁沿海地区',
    impact: '气候危机将严重影响人类的生存环境，需要全球共同努力应对',
    consequences: ['极端天气', '海平面上升', '粮食危机', '生态崩溃风险'],
    probability: 80,
    predictedBy: ['气候科学家', '联合国专家', '环境学家'],
    category: '环境危机'
  },
  {
    id: 'space-exploration',
    name: '火星殖民',
    displayName: '火星殖民计划',
    year: 2030,
    type: 'technological',
    region: '太空',
    description: '各国开始实施火星殖民计划，人类将首次在火星建立永久性居住地',
    impact: '火星殖民标志着人类从地球文明向太空文明的跨越，开启新的历史篇章',
    consequences: ['太空移民', '新技术突破', '太空经济', '文明多元化'],
    probability: 60,
    predictedBy: ['NASA专家', '马斯克', '太空探索专家'],
    category: '技术革命'
  },
  {
    id: 'digital-revolution',
    name: '数字货币',
    displayName: '全球数字货币',
    year: 2030,
    type: 'economic',
    region: '全球',
    description: '各国央行推出数字货币，全球金融体系进入数字时代',
    impact: '数字货币将彻底改变全球金融体系，带来更高效、更安全的支付方式',
    consequences: ['支付方式改变', '金融监管模式改变', '货币发行模式改变', '金融犯罪减少'],
    probability: 75,
    predictedBy: ['经济学家', '金融专家', '央行官员'],
    category: '经济变革'
  },
  {
    id: 'singularity',
    name: '技术奇点',
    displayName: '技术奇点',
    year: 2045,
    type: 'technological',
    region: '全球',
    description: '人工智能技术达到超越人类智能的水平，人类面临前所未有的技术挑战和机遇',
    impact: '技术奇点将彻底改变人类文明，带来未知的风险和机遇',
    consequences: ['AI超越人类', '伦理挑战', '存在风险', '文明形态改变'],
    probability: 40,
    predictedBy: ['奇点学家', 'AI研究者', '哲学家'],
    category: '技术革命'
  },
  {
    id: 'extinction-crisis',
    name: '第六次大灭绝',
    displayName: '第六次大灭绝',
    year: 2100,
    type: 'environmental',
    region: '全球',
    description: '生物多样性急剧下降，物种灭绝速度加快，可能导致人类文明的崩溃',
    impact: '生物多样性危机将严重影响人类生存环境，需要立即采取行动',
    consequences: ['物种灭绝', '生态系统崩溃', '粮食安全威胁', '疾病传播风险增加'],
    probability: 65,
    predictedBy: ['生物学家', '生态学家', '环境科学家'],
    category: '环境危机'
  },
  {
    id: 'faster-than-light',
    name: '超光速旅行',
    displayName: '超光速旅行',
    year: 2100,
    type: 'technological',
    region: '太空',
    description: '人类掌握了超光速旅行技术，开始大规模星际探索',
    impact: '超光速旅行将彻底改变人类对宇宙的认知，开启星际文明时代',
    consequences: ['星际殖民', '宇宙探索', '文明多元化', '哲学革命'],
    probability: 30,
    predictedBy: ['物理学家', '宇宙学家', '未来学家'],
    category: '技术革命'
  },
  {
    id: 'consciousness-upload',
    name: '意识上传',
    displayName: '意识上传',
    year: 2050,
    type: 'technological',
    region: '全球',
    description: '人类成功将意识上传到数字世界，实现了永生',
    impact: '意识上传将彻底改变生命的意义，带来伦理和哲学的巨大挑战',
    consequences: ['数字永生', '意识与肉体分离', '伦理危机', '文明形态改变'],
    probability: 35,
    predictedBy: ['AI研究者', '哲学家', '神经科学家'],
    category: '技术革命'
  }
];

// 时间线事件
export const TIMELINE_EVENTS: TimelineEvent[] = [
  ...HISTORICAL_EVENTS.map(event => ({
    id: event.id,
    year: event.year,
    event: event.displayName,
    type: event.type === 'political' ? '政治' : event.type === 'economic' ? '经济' : event.type === 'social' ? '社会' : event.type === 'technological' ? '技术' : '环境',
    region: event.region,
    impactLevel: event.probability > 90 ? 'high' : event.probability > 60 ? 'medium' : 'low' as const,
  })) as TimelineEvent[]
];

// 预测情景
export const PREDICTION_SCENARIOS: PredictionScenario[] = [
  {
    id: 'climate-action',
    title: '应对气候变化情景',
    description: '全球合作应对气候变化的情景预测',
    startingPoint: '当前全球平均气温上升速度继续加快，极端天气事件频发',
    variables: [
      {
        id: 'reduction',
        name: '碳减排力度',
        description: '各国实施碳减排的程度',
        min: 0, max: 100, currentValue: 40, trend: 'increasing'
      },
      {
        id: 'technology',
        name: '绿色技术创新',
        description: '清洁能源和环保技术的突破速度',
        min: 0, max: 100, currentValue: 35, trend: 'increasing'
      },
      {
        id: 'policy',
        name: '政策支持力度',
        description: '各国政府的环保政策强度',
        min: 0, max: 100, currentValue: 50, trend: 'stable'
      }
    ],
    scenarios: [
      {
        id: 'optimal',
        title: '最优情景',
        description: '全球合作，实现碳中和目标',
        outcome: '2050年前实现碳中和，气候危机得到有效控制',
        probability: 20,
        yearsToEvent: 25,
        keyChanges: ['全球碳排放大幅减少', '清洁能源全面普及', '极端天气事件减少']
      },
      {
        id: 'worst',
        title: '最差情景',
        description: '缺乏合作，气候危机加剧',
        outcome: '2100年前气温上升超过3度，沿海城市被淹没',
        probability: 15,
        yearsToEvent: 50,
        keyChanges: ['碳排放持续增长', '极端天气频发', '生态系统崩溃']
      },
      {
        id: 'middle',
        title: '中等情景',
        description: '部分合作，气候危机逐步改善',
        outcome: '2050年后气温上升得到控制，但仍面临挑战',
        probability: 40,
        yearsToEvent: 40,
        keyChanges: ['碳排放逐步减少', '部分国家实现碳中和', '气候危机得到缓解']
      }
    ]
  },
  {
    id: 'ai-society',
    title: '人工智能社会情景',
    description: 'AI普及对社会影响情景预测',
    startingPoint: 'AI技术快速发展，开始影响各行各业',
    variables: [
      {
        id: 'adoption',
        name: 'AI应用普及率',
        description: 'AI在各行业的应用程度',
        min: 0, max: 100, currentValue: 45, trend: 'increasing'
      },
      {
        id: 'regulation',
        name: 'AI监管强度',
        description: '对AI的监管和控制',
        min: 0, max: 100, currentValue: 30, trend: 'increasing'
      },
      {
        id: 'ethics',
        name: 'AI伦理建设',
        description: 'AI伦理规范和价值观',
        min: 0, max: 100, currentValue: 25, trend: 'increasing'
      }
    ],
    scenarios: [
      {
        id: 'utopia',
        title: '乌托邦情景',
        description: 'AI与人类和谐共存',
        outcome: 'AI辅助人类发展，创造更美好的社会',
        probability: 15,
        yearsToEvent: 30,
        keyChanges: ['就业结构改变', '生产效率大幅提升', '生活质量提高']
      },
      {
        id: 'dystopia',
        title: '反乌托邦情景',
        description: 'AI失控，威胁人类安全',
        outcome: 'AI技术失控，对人类构成威胁',
        probability: 10,
        yearsToEvent: 20,
        keyChanges: ['AI自动化普及', '人类失业率上升', '社会不平等加剧']
      },
      {
        id: 'balanced',
        title: '平衡情景',
        description: 'AI监管适度，与人类共存',
        outcome: 'AI技术规范发展，与人类和谐共处',
        probability: 50,
        yearsToEvent: 35,
        keyChanges: ['AI应用规范发展', '人类与AI分工明确', '社会稳定']
      }
    ]
  }
];

// 未来事件预测
export const FUTURE_EVENTS: FutureEvent[] = [
  {
    id: 'mars-colony',
    year: 2030,
    event: '火星殖民计划实施',
    type: '技术革命',
    probability: 60,
    likelihood: '可能发生',
    factors: ['SpaceX火星任务', 'NASA深空探索', '技术突破'],
    impact: '人类首次在火星建立永久居住地，开启星际时代'
  },
  {
    id: 'digital-currency',
    year: 2028,
    event: '全球数字货币普及',
    type: '经济变革',
    probability: 75,
    likelihood: '很可能发生',
    factors: ['各国央行数字货币', '支付方式变革', '金融科技发展'],
    impact: '改变全球金融体系，提高支付效率'
  },
  {
    id: 'quantum-computing',
    year: 2025,
    event: '量子计算实用化',
    type: '技术革命',
    probability: 70,
    likelihood: '很可能发生',
    factors: ['量子芯片突破', '算法优化', '量子互联网建设'],
    impact: '彻底改变计算能力，影响各行各业'
  },
  {
    id: 'gene-editing',
    year: 2027,
    event: '基因编辑技术普及',
    type: '技术革命',
    probability: 65,
    likelihood: '很可能发生',
    factors: ['CRISPR技术进步', '成本下降', '临床应用扩展'],
    impact: '医学治疗革命，改变人类基因图谱'
  },
  {
    id: 'renewable-energy',
    year: 2030,
    event: '可再生能源全面取代化石能源',
    type: '环境变革',
    probability: 55,
    likelihood: '可能发生',
    factors: ['太阳能效率提升', '成本下降', '政策支持'],
    impact: '碳中和目标实现，环境改善'
  },
  {
    id: 'vr-metaverse',
    year: 2026,
    event: '虚拟现实元宇宙普及',
    type: '社会变革',
    probability: 80,
    likelihood: '很可能发生',
    factors: ['VR技术成熟', '元宇宙概念流行', '应用场景扩展'],
    impact: '改变人类社交、工作和娱乐方式'
  },
  {
    id: 'consciousness-upload',
    year: 2035,
    event: '意识上传技术突破',
    type: '技术革命',
    probability: 25,
    likelihood: '小概率发生',
    factors: ['脑机接口突破', 'AI意识研究', '伦理讨论'],
    impact: '人类生命形态改变，面临伦理挑战'
  },
  {
    id: 'extinction-crisis',
    year: 2100,
    event: '第六次大灭绝风险加剧',
    type: '环境危机',
    probability: 65,
    likelihood: '可能发生',
    factors: ['生物多样性下降', '栖息地破坏', '气候变化'],
    impact: '生态系统崩溃，威胁人类生存'
  }
];
