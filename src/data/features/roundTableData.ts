// 跨朝代圆桌会议数据
export interface HistoricalFigure {
  id: string;
  name: string;
  displayName: string;
  dynasty: string;
  era: string;
  eraId: string;
  category: string;
  role: string;
  avatar: string;
  biography: string;
  keyOpinion: string;
  keyConcept: string;
  modernRelevance: string;
  questions: string[];
  tags: string[];
}

export interface RoundTableTopic {
  id: string;
  title: string;
  description: string;
  question: string;
  historicalContext: string;
  tags: string[];
}

export interface DiscussionSession {
  id: string;
  topicId: string;
  topicTitle: string;
  participants: HistoricalFigure[];
  timestamp: Date;
  duration: number;
  keyPoints: DiscussionPoint[];
}

export interface DiscussionPoint {
  id: string;
  participantId: string;
  participantName: string;
  participantRole: string;
  participantAvatar: string;
  content: string;
  timestamp: number;
  position: 'left' | 'center' | 'right';
}

// 历史人物
export const HISTORICAL_FIGURES: HistoricalFigure[] = [
  {
    id: 'confucius',
    name: '孔丘',
    displayName: '孔子',
    dynasty: '春秋',
    era: '春秋时期',
    eraId: 'spring-autumn',
    category: '思想家',
    role: '儒家创始人',
    avatar: '👴',
    biography: '孔子（公元前551年-公元前479年），名丘，字仲尼，春秋末期鲁国人，中国古代伟大的思想家、教育家，儒家学派创始人。',
    keyOpinion: '己所不欲，勿施于人；仁者爱人；有教无类',
    keyConcept: '儒家思想体系',
    modernRelevance: '儒家思想对现代教育、人际关系和社会治理仍有重要影响',
    questions: [
      '如何平衡个人道德修养与社会实践的关系？',
      '在今天的社会中，如何实践"仁"的理念？',
      '教育应该以什么为根本？',
      '如何处理家庭、国家、天下的关系？'
    ],
    tags: ['儒家', '教育家', '圣人', '仁', '礼', '教育']
  },
  {
    id: 'laozi',
    name: '李耳',
    displayName: '老子',
    dynasty: '春秋',
    era: '春秋末期',
    eraId: 'spring-autumn',
    category: '哲学家',
    role: '道家创始人',
    avatar: '🧙',
    biography: '老子（约公元前571年-公元前471年），名耳，字聃，春秋末期楚国人，中国古代伟大的思想家，道家学派创始人。',
    keyOpinion: '上善若水；道法自然；无为而治；知足常乐',
    keyConcept: '道家思想体系',
    modernRelevance: '老子的"无为而治"对现代管理学和环境保护有深刻启示',
    questions: [
      '如何在现代社会中实现"无为而治"？',
      '"道法自然"在当今社会有何意义？',
      '如何理解"上善若水"的智慧？',
      '知足常乐是否阻碍了个人追求？'
    ],
    tags: ['道家', '哲学家', '老子', '道', '自然', '无为']
  },
  {
    id: 'han-wei',
    name: '韩非',
    displayName: '韩非',
    dynasty: '战国',
    era: '战国末期',
    eraId: 'warring-states',
    category: '思想家',
    role: '法家集大成者',
    avatar: '🧔',
    biography: '韩非（约公元前280年-公元前233年），战国末期韩国人，道家思想家荀子的弟子，法家思想集大成者，著有《韩非子》。',
    keyOpinion: '法不阿贵；信赏必罚；以法治国；势、术、法结合',
    keyConcept: '法家思想体系',
    modernRelevance: '法家的法治思想对现代法治建设有重要参考价值',
    questions: [
      '如何平衡法家的"法治"与儒家的"德治"？',
      '在今天的社会治理中，如何运用法家的智慧？',
      '法家是否忽视了人性的善？',
      '如何避免法家思想的极端化？'
    ],
    tags: ['法家', '思想家', '韩非', '法治', '制度', '权术']
  },
  {
    id: 'mencius',
    name: '孟轲',
    displayName: '孟子',
    dynasty: '战国',
    era: '战国时期',
    eraId: 'warring-states',
    category: '思想家',
    role: '儒家亚圣',
    avatar: '🧓',
    biography: '孟子（约公元前372年-公元前289年），名轲，战国时期邹国人，儒家学派代表人物，被尊称为"亚圣"。',
    keyOpinion: '性善论；民为贵，社稷次之，君为轻；浩然之气；舍生取义',
    keyConcept: '儒家思想体系',
    modernRelevance: '孟子的民本思想对现代民主建设有启示意义',
    questions: [
      '如何理解孟子的"性善论"？',
      '如何实践"民为贵"的理念？',
      '在今天的社会中，如何培养"浩然之气"？',
      '"舍生取义"在现代有何意义？'
    ],
    tags: ['儒家', '亚圣', '民本', '性善', '仁政', '浩然正气']
  },
  {
    id: 'zhuangzi',
    name: '庄周',
    displayName: '庄子',
    dynasty: '战国',
    era: '战国时期',
    eraId: 'warring-states',
    category: '哲学家',
    role: '道家代表',
    avatar: '🧘',
    biography: '庄子（约公元前369年-公元前286年），名周，战国时期宋国人，道家学派代表人物，著有《庄子》。',
    keyOpinion: '逍遥游；庖丁解牛；庄周梦蝶；相忘于江湖；天地与我并生',
    keyConcept: '道家思想体系',
    modernRelevance: '庄子的哲学对现代人缓解压力、调整心态有重要意义',
    questions: [
      '如何理解"逍遥游"的理想？',
      '在现代社会中，如何实践"相忘于江湖"？',
      '庄子的"无用之用"有何现实意义？',
      '如何应对人生的苦难？'
    ],
    tags: ['道家', '哲学家', '庄子', '逍遥', '自由', '超脱']
  },
  {
    id: 'shang-jun',
    name: '商鞅',
    displayName: '商鞅',
    dynasty: '战国',
    era: '战国时期',
    eraId: 'warring-states',
    category: '政治家',
    role: '法家改革家',
    avatar: '⚔️',
    biography: '商鞅（约公元前390年-公元前338年），战国时期卫国人，法家代表人物，在秦国推行变法，使秦国逐渐强大。',
    keyOpinion: '废井田、开阡陌；奖励耕战；连坐法；统一度量衡；变法图强',
    keyConcept: '法家改革思想',
    modernRelevance: '商鞅的改革精神对现代国家建设有借鉴意义',
    questions: [
      '商鞅变法对现代改革的启示是什么？',
      '如何避免改革过程中的激进与冲突？',
      '商鞅的"连坐法"在现代社会有何争议？',
      '改革的代价与收益如何权衡？'
    ],
    tags: ['法家', '改革家', '商鞅', '变法', '改革', '秦国']
  },
  {
    id: 'li-si',
    name: '李斯',
    displayName: '李斯',
    dynasty: '秦代',
    era: '秦代',
    eraId: 'qin',
    category: '政治家',
    role: '秦相',
    avatar: '🏛️',
    biography: '李斯（约公元前280年-公元前208年），战国末期楚国人，秦朝丞相，协助秦始皇统一六国，制定统一政策和度量衡。',
    keyOpinion: '废分封、行郡县；书同文；车同轨；焚书坑儒；以吏为师',
    keyConcept: '秦代中央集权制度',
    modernRelevance: '李斯的制度设计对现代行政区划和法治建设有参考价值',
    questions: [
      '李斯的"书同文"对现代有何意义？',
      '如何评价李斯的"焚书坑儒"？',
      '如何平衡中央集权与地方自治？',
      '李斯的悲剧对现代管理者有何警示？'
    ],
    tags: ['法家', '政治家', '李斯', '统一', '制度', '秦代']
  },
  {
    id: 'gan-nong',
    name: '贾谊',
    displayName: '贾谊',
    dynasty: '西汉',
    era: '西汉初期',
    eraId: 'western-han',
    category: '思想家',
    role: '政论家',
    avatar: '📜',
    biography: '贾谊（公元前200年-公元前168年），洛阳人，西汉初期著名政论家、文学家，著有《过秦论》、《治安策》等。',
    keyOpinion: '重农抑商；民为邦本；以德治国；戒骄戒躁；居安思危',
    keyConcept: '西汉初期治国思想',
    modernRelevance: '贾谊的民本思想和对政策失误的反思对现代治理有启示',
    questions: [
      '如何理解贾谊的"居安思危"？',
      '在今天的社会中，如何实践"以德治国"？',
      '贾谊的《过秦论》有何现实意义？',
      '如何平衡重农与商业发展？'
    ],
    tags: ['政论家', '贾谊', '西汉', '民本', '治道', '过秦论']
  },
  {
    id: 'wang-an-shi',
    name: '王安石',
    displayName: '王安石',
    dynasty: '北宋',
    era: '北宋',
    eraId: 'northern-song',
    category: '政治家',
    role: '变法宰相',
    avatar: '📜',
    biography: '王安石（1021年-1086年），字介甫，号半山，北宋著名政治家、文学家、思想家，推行熙宁变法。',
    keyOpinion: '天变不足畏；祖宗不足法；人言不足恤；青苗法；募役法',
    keyConcept: '熙宁变法改革',
    modernRelevance: '王安石的改革精神对现代改革创新有重要启示',
    questions: [
      '如何理解王安石的"三不足"精神？',
      '王安石的变法为何失败？',
      '在今天的社会中，如何推进改革？',
      '改革的阻力与动力如何分析？'
    ],
    tags: ['政治家', '改革家', '王安石', '变法', '北宋', '三不足']
  },
  {
    id: 'zhuge-liang',
    name: '诸葛亮',
    displayName: '诸葛亮',
    dynasty: '三国',
    era: '三国蜀汉',
    eraId: 'three-kingdoms',
    category: '政治家',
    role: '蜀汉丞相',
    avatar: '🦅',
    biography: '诸葛亮（181年-234年），字孔明，号卧龙，三国时期蜀汉丞相，杰出的政治家、军事家、发明家。',
    keyOpinion: '鞠躬尽瘁，死而后已；兼听则明，偏信则暗；淡泊明志，宁静致远',
    keyConcept: '蜀汉治国理念',
    modernRelevance: '诸葛亮的忠诚和智慧对现代管理者和领导者有深刻启示',
    questions: [
      '如何理解诸葛亮的"鞠躬尽瘁"？',
      '在今天的社会中，如何实践"兼听则明"？',
      '诸葛亮为何未能统一三国？',
      '诸葛亮的理想与现实的冲突如何解决？'
    ],
    tags: ['政治家', '军事家', '诸葛亮', '忠诚', '智慧', '蜀汉']
  },
  {
    id: 'wang-xiangzhi',
    name: '王阳明',
    displayName: '王阳明',
    dynasty: '明代',
    era: '明代',
    eraId: 'ming',
    category: '哲学家',
    role: '心学集大成者',
    avatar: '📖',
    biography: '王阳明（1472年-1529年），名守仁，字伯安，号阳明，明代著名哲学家、军事家、教育家，心学集大成者。',
    keyOpinion: '知行合一；致良知；心即理；圣人之道，吾性自足；破山中贼易，破心中贼难',
    keyConcept: '阳明心学体系',
    modernRelevance: '王阳明的"知行合一"对现代教育和个人修养有重要指导意义',
    questions: [
      '如何理解王阳明的"知行合一"？',
      '在今天的社会中，如何实践"致良知"？',
      '"心即理"与现代心理学有何关联？',
      '如何破除"心中贼"？'
    ],
    tags: ['心学', '哲学家', '王阳明', '知行合一', '良知', '心学']
  },
  {
    id: 'gu-yanwu',
    name: '顾炎武',
    displayName: '顾炎武',
    dynasty: '明清之际',
    era: '明清之际',
    eraId: 'late-qing',
    category: '思想家',
    role: '经世致用',
    avatar: '📚',
    biography: '顾炎武（1613年-1682年），原名绛，字宁人，号亭林，明清之际著名思想家、史学家、语言学家。',
    keyOpinion: '天下兴亡，匹夫有责；博学于文，行己有耻；天下事有为之然后为；经世致用',
    keyConcept: '经世致用思想',
    modernRelevance: '顾炎武的思想对现代爱国主义和社会责任感培养有重要意义',
    questions: [
      '如何理解"天下兴亡，匹夫有责"？',
      '在今天的社会中，如何实践"经世致用"？',
      '如何平衡"博学"与"专精"？',
      '如何培养"行己有耻"的品格？'
    ],
    tags: ['思想家', '顾炎武', '天下兴亡', '经世致用', '民族意识', '爱国主义']
  },
  {
    id: 'kang-youwei',
    name: '康有为',
    displayName: '康有为',
    dynasty: '晚清',
    era: '晚清',
    eraId: 'late-qing',
    category: '思想家',
    role: '维新变法领袖',
    avatar: '📜',
    biography: '康有为（1858年-1927年），字广厦，号长素，晚清著名思想家、政治家、教育家，维新变法领袖。',
    keyOpinion: '托古改制；大同思想；民权思想；君主立宪；变法图强',
    keyConcept: '维新变法思想',
    modernRelevance: '康有为的变法思想对现代民主建设有启发意义',
    questions: [
      '康有为的变法为何失败？',
      '如何理解康有为的"大同思想"？',
      '在今天的社会中，如何推进改革？',
      '如何平衡传统与现代？'
    ],
    tags: ['思想家', '变法领袖', '康有为', '维新变法', '大同', '民主']
  },
  {
    id: 'liang-qichao',
    name: '梁启超',
    displayName: '梁启超',
    dynasty: '晚清',
    era: '晚清',
    eraId: 'late-qing',
    category: '思想家',
    role: '维新变法代表',
    avatar: '📝',
    biography: '梁启超（1873年-1929年），字卓如，号任公，晚清著名思想家、政治家、教育家、文学家。',
    keyOpinion: '新民说；少年中国说；君主立宪；民权思想；自由平等',
    keyConcept: '维新变法思想',
    modernRelevance: '梁启超的"新民说"对现代公民教育有重要指导意义',
    questions: [
      '如何理解梁启超的"少年中国说"？',
      '在今天的社会中，如何培养"新民"？',
      '梁启超的学术贡献有哪些？',
      '如何平衡传统与创新？'
    ],
    tags: ['思想家', '维新代表', '梁启超', '新民说', '少年中国', '自由']
  }
];

// 圆桌会议话题
export const ROUND_TABLE_TOPICS: RoundTableTopic[] = [
  {
    id: 'yin-yang',
    title: '道与儒：中国思想的对话',
    description: '道家与儒家作为中国传统思想的两大支柱，各自的核心观点和现代意义。',
    question: '如果孔子与老子进行一场跨时空对话，他们会如何讨论？"无为"与"有为"的关系是什么？',
    historicalContext: '春秋战国时期是中国思想史上百花齐放的黄金时代，道家与儒家各成一派，形成了中国思想史上的第一次大辩论。',
    tags: ['道家', '儒家', '哲学', '对话', '中国思想']
  },
  {
    id: 'fa-ya',
    title: '法家的智慧：如何治理国家',
    description: '法家强调法治、制度和效率，但忽视了人情和道德，法家思想在现代有何价值？',
    question: '韩非与商鞅如果讨论今天的治理，他们会认为应该以什么为根本？法家是否可能与社会进步共存？',
    historicalContext: '战国末期，各国面临统一天下的大趋势，法家思想因其务实和高效的特性被各国统治者重视。',
    tags: ['法家', '法治', '制度', '治理', '实用主义']
  },
  {
    id: 'xue-xing',
    title: '性善与性恶：人性的探讨',
    description: '孟子主张性善，荀子主张性恶，人性本善还是本恶？这个问题在今天有何现实意义？',
    question: '如果孟子与荀子进行一场辩论，他们会如何论证自己的观点？现代教育应该如何平衡对"善"与"恶"的引导？',
    historicalContext: '战国时期，人性问题是思想界讨论的焦点，孟子与荀子各自提出了不同的人性观。',
    tags: ['性善', '性恶', '人性', '辩论', '教育']
  },
  {
    id: 'zhi-xing',
    title: '知行合一：理论与实践的统一',
    description: '王阳明提出的"知行合一"思想对现代教育和个人修养有何指导意义？',
    question: '王阳明与朱熹如果讨论"知"与"行"的关系，他们会如何辩论？在今天的社会中，如何实践"知行合一"？',
    historicalContext: '明代中期，程朱理学与心学成为思想界的两大派别，王阳明提出"知行合一"是对朱熹思想的重大突破。',
    tags: ['知行合一', '实践', '修养', '教育', '心学']
  },
  {
    id: 'min-ben',
    title: '民为邦本：民本思想的现代意义',
    description: '孟子提出的"民为贵，社稷次之，君为轻"思想，对现代民主建设有何启示？',
    question: '如果孟子与商鞅讨论"民"的作用，他们会得出什么不同的结论？在今天的社会中，如何实践"民为贵"？',
    historicalContext: '战国时期，各国统治者开始重视民众的力量，孟子提出民本思想，强调民众的重要性。',
    tags: ['民本', '民主', '民生', '君民关系', '现代启示']
  },
  {
    id: 'zhong-liu-bi-tong',
    title: '古今对话：传统与现代的碰撞',
    description: '中国传统文化与现代社会如何融合？传统智慧在现代社会有何应用价值？',
    question: '如果顾炎武与康有为进行一场对话，他们会如何评价中国传统与现代的关系？传统在今天还有何价值？',
    historicalContext: '晚清时期，中国社会面临前所未有的变革，传统与现代的碰撞成为时代主题。',
    tags: ['传统', '现代', '对话', '文化', '融合']
  },
  {
    id: 'zhong-sheng-bi-zhi',
    title: '中庸之道：在极端中寻求平衡',
    description: '儒家强调中庸之道，在极端中寻求平衡。这种思想对现代生活和工作有何指导意义？',
    question: '如果孔子与庄子讨论"中庸"与"逍遥"，他们如何理解"平衡"与"自由"？在现代生活中，如何寻求中庸？',
    historicalContext: '春秋战国时期，各种思想流派林立，儒家强调中庸之道，主张在极端中寻求平衡。',
    tags: ['中庸', '平衡', '哲学', '生活方式', '智慧']
  },
  {
    id: 'dang-dai-guo-zhi',
    title: '当代治国：古智今用',
    description: '中国古代思想家对治国理政的智慧，对现代国家治理有何启示？',
    question: '如果王阳明与诸葛亮讨论如何治理一个现代国家，他们会提出什么建议？古代智慧如何应用于现代治理？',
    historicalContext: '从古代到现代，治国理政始终是国家面临的核心问题，古代思想家的智慧为现代治理提供了丰富的启示。',
    tags: ['治国', '治理', '现代应用', '古为今用', '政治']
  },
  {
    id: 'ren-lei-jia-zu',
    title: '天下大同：人类命运共同体',
    description: '康有为的"大同思想"与现代"人类命运共同体"理念有何异同？传统智慧如何应对全球化时代的问题？',
    question: '如果康有为与今天的人类学家讨论"大同"，他们如何理解"人类命运共同体"？传统智慧如何解决全球化问题？',
    historicalContext: '晚清时期，康有为提出"大同思想"，憧憬人类社会的理想状态；当代中国提出"人类命运共同体"理念。',
    tags: ['大同', '共同体', '全球化', '人类', '未来']
  }
];

// 知识标签和关键词
export const KNOWLEDGE_TAGS = {
  philosophy: ['哲学', '思想家', '儒家', '道家', '法家', '心学', '经世致用'],
  politics: ['政治家', '改革家', '治理', '治国', '制度', '民主'],
  ethics: ['道德', '仁爱', '礼', '义', '诚信', '忠诚'],
  culture: ['文化', '传统', '传承', '创新', '教育', '文明'],
  modern: ['现代', '当代', '未来', '启示', '应用', '实践']
};

export const DYNASTY_GROUPS = {
  'spring-autumn': '春秋时期',
  'warring-states': '战国时期',
  'qin': '秦代',
  'western-han': '西汉',
  'northern-song': '北宋',
  'three-kingdoms': '三国',
  'ming': '明代',
  'late-qing': '晚清'
};
