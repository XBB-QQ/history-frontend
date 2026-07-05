/**
 * 历史审判庭数据
 * @see history-museum/ITERATIONS.md Iteration #75
 *
 * 收集历史上著名的审判案例，包括朝代更迭、政治斗争等
 */

export interface HistoricalTrial {
  id: string;
  title: string;
  dynasty: string;
  period: string;
  year?: string;
  location: string;
  keyFigures: string[];
  judge: string;
  type: '政治' | '军事' | '贪腐' | '谋反' | '家族' | '文化';
  accusation: string;
  defense: string;
  verdict: '胜利' | '失败' | '无罪' | '有罪' | '流放' | '处死' | '未审判' | '有争议';
  consequences: string[];
  historicalSignificance: string;
  details: string;
}

export const HISTORICAL_TRIALS: HistoricalTrial[] = [
  {
    id: 'dai-zhou-qi',
    title: '吕后诛杀戚夫人',
    dynasty: '汉朝',
    period: '公元前195年',
    year: '公元前195年',
    location: '未央宫',
    keyFigures: ['吕后', '汉惠帝', '戚夫人', '刘如意'],
    judge: '吕后',
    type: '家族',
    accusation: '吕后认为戚夫人及其子刘如意威胁到吕氏家族的地位',
    defense: '戚夫人称病推辞，试图保护自己和儿子',
    verdict: '胜利',
    consequences: [
      '吕氏家族掌握实权，汉惠帝被软禁',
      '刘如意被毒死，戚夫人被做成"人彘"',
      '吕后掌权期间，汉朝政治更加腐败'
    ],
    historicalSignificance: '吕后成为中国历史上第一位临朝称制的女性，开启了外戚专权的先河',
    details: '戚夫人是刘邦的宠妃，生下儿子刘如意。刘邦去世后，吕后开始清洗刘邦的其他子女。戚夫人被制成"人彘"，刘如意被毒死。'
  },
  {
    id: 'wei-qin-fu-tan',
    title: '魏其侯窦婴案',
    dynasty: '汉朝',
    period: '公元前143年',
    year: '公元前143年',
    location: '未央宫廷',
    keyFigures: ['魏其侯窦婴', '灌夫', '田蚡', '汉武帝'],
    judge: '汉武帝',
    type: '政治',
    accusation: '魏其侯与灌夫结党营私，排挤田蚡集团',
    defense: '灌夫醉酒后言语冒犯，窦婴试图为他辩护',
    verdict: '有罪',
    consequences: [
      '灌夫被处死，全族被灭',
      '窦婴被腰斩，家人被流放',
      '田蚡权势达到顶峰，不久后暴病而亡',
      '汉武帝开始警惕外戚和朝臣的权力斗争'
    ],
    historicalSignificance: '这次审判标志着汉武帝开始亲自掌控朝政，清除异己',
    details: '魏其侯窦婴与丞相田蚡不和。灌夫因醉酒冒犯田蚡，被定罪。窦婴试图为灌夫辩护，引发朝堂辩论。汉武帝最终支持田蚡，窦婴被处死。'
  },
  {
    id: 'zhao-dan-puan',
    title: '赵丹骗局',
    dynasty: '秦朝',
    period: '公元前221年',
    year: '公元前221年',
    location: '咸阳',
    keyFigures: ['秦王政', '李斯', '赵丹'],
    judge: '秦王政',
    type: '政治',
    accusation: '赵丹伪造军功，骗取爵位',
    defense: '赵丹声称是真实的',
    verdict: '有罪',
    consequences: [
      '赵丹被处死',
      '李斯被任命为丞相，开始实行郡县制',
      '秦朝统治更加严格'
    ],
    historicalSignificance: '秦朝建立了严格的军功爵位制度，防止了军功造假',
    details: '赵丹伪造了自己的军功记录，骗取了爵位。秦王政发现后，亲自审理此案，赵丹被处死。'
  },
  {
    id: 'hui-kai-shou',
    title: '霍光废昌邑王',
    dynasty: '汉朝',
    period: '公元前74年',
    year: '公元前74年',
    location: '未央宫',
    keyFigures: ['霍光', '汉昭帝', '刘贺', '霍光'],
    judge: '霍光',
    type: '政治',
    accusation: '昌邑王刘贺荒淫无道，不守礼法',
    defense: '刘贺声称自己被冤枉',
    verdict: '失败',
    consequences: [
      '刘贺被废为海昏侯，享年约30岁',
      '霍光立汉宣帝为帝，朝政大权旁落'
    ],
    historicalSignificance: '霍光废帝事件标志着外戚权力的顶峰，但也为日后霍家的覆灭埋下伏笔',
    details: '汉昭帝去世，霍光迎立昌邑王刘贺为帝。刘贺在27天内做了1127件荒唐事，被霍光废黜。'
  },
  {
    id: 'cao-piao-zhong',
    title: '曹操诛杀孔融',
    dynasty: '三国',
    period: '公元208年',
    year: '公元208年',
    location: '许昌',
    keyFigures: ['曹操', '孔融', '杨修'],
    judge: '曹操',
    type: '政治',
    accusation: '孔融多次讥讽曹操，传播不利于他的言论',
    defense: '孔融认为自己只是在批评时政',
    verdict: '胜利',
    consequences: [
      '孔融被处死，全族被灭',
      '曹操进一步加强了对舆论的控制',
      '文人雅士开始对政治更加恐惧'
    ],
    historicalSignificance: '这次事件反映了三国时期政治的残酷性，文人为了自保必须谨言慎行',
    details: '孔融是东汉末年的著名学者，因多次讥讽曹操而被处死。他引用古语说："覆巢之下，安有完卵"，表达了对抗暴政的决心。'
  },
  {
    id: 'zhang-yang-chai',
    title: '董卓乱政',
    dynasty: '东汉',
    period: '公元189年',
    year: '公元189年',
    location: '洛阳',
    keyFigures: ['董卓', '袁绍', '王允', '吕布'],
    judge: '王允',
    type: '政治',
    accusation: '董卓残暴无道，废立皇帝，扰乱朝纲',
    defense: '董卓声称自己是在稳定局势',
    verdict: '胜利',
    consequences: [
      '董卓被吕布所杀',
      '汉末乱世加剧',
      '各地军阀开始割据'
    ],
    historicalSignificance: '这次事件标志着东汉彻底崩溃，三国时期正式开始',
    details: '董卓进入洛阳后，废除汉少帝，立汉献帝，独揽大权。后因残暴过度，被司徒王允设计，吕布奉命杀死董卓。'
  },
  {
    id: 'tao-qian-tao-bing',
    title: '陶谦举兵',
    dynasty: '东汉',
    period: '公元194年',
    year: '公元194年',
    location: '徐州',
    keyFigures: ['陶谦', '曹操', '刘备', '吕布'],
    judge: '陶谦',
    type: '军事',
    accusation: '陶谦拒绝曹操的征讨，主张抵抗',
    defense: '陶谦认为徐州百姓不应受苦',
    verdict: '胜利',
    consequences: [
      '陶谦的抵抗延缓了曹操的步伐',
      '刘备获得徐州，开始建立自己的势力'
    ],
    historicalSignificance: '这次抵抗表明了地方势力在乱世中的重要性',
    details: '曹操南下进攻徐州，陶谦组织抵抗。刘备主动请缨帮助陶谦，最终帮助陶谦击退曹操。'
  },
  {
    id: 'sun-jiang-lu',
    title: '孙坚乱政',
    dynasty: '东汉',
    period: '公元191年',
    year: '公元191年',
    location: '洛阳',
    keyFigures: ['孙坚', '董卓', '袁术'],
    judge: '孙坚',
    type: '军事',
    accusation: '孙坚在讨伐董卓时自立门户，与袁术对抗',
    defense: '孙坚声称自己只是在为朝廷效力',
    verdict: '胜利',
    consequences: [
      '孙坚建立孙氏势力',
      '后续形成三国吴国'
    ],
    historicalSignificance: '这次事件标志着孙氏势力的诞生，为三国吴国奠定基础',
    details: '孙坚在讨伐董卓时，被任命为豫州刺史。后来他与袁术合作，建立自己的势力。'
  },
  {
    id: 'tai-kang-tao-hui',
    title: '太康之治',
    dynasty: '西晋',
    period: '公元280年',
    year: '公元280年',
    location: '洛阳',
    keyFigures: ['晋武帝', '孙皓', '王濬'],
    judge: '晋武帝',
    type: '政治',
    accusation: '孙皓投降，西晋完成统一',
    defense: '孙皓认为自己已经尽力',
    verdict: '胜利',
    consequences: [
      '西晋完成统一，中国再次进入大一统时期',
      '太康之治开始，社会繁荣'
    ],
    historicalSignificance: '这次事件标志着三国时期的结束，西晋统一中国',
    details: '孙皓投降后，西晋完成了统一。晋武帝建立太康之治，社会繁荣，经济恢复。'
  },
  {
    id: 'tai-hou-zhen',
    title: '王莽篡汉',
    dynasty: '新朝',
    period: '公元8年',
    year: '公元8年',
    location: '长安',
    keyFigures: ['王莽', '汉平帝', '孺子婴', '王政君'],
    judge: '王莽',
    type: '政治',
    accusation: '王莽篡夺汉室皇位',
    defense: '王莽声称自己是在为民请命',
    verdict: '胜利',
    consequences: [
      '汉朝结束，新朝建立',
      '王莽推行新政策，导致社会动荡',
      '绿林赤眉起义爆发，王莽被杀'
    ],
    historicalSignificance: '这次篡位事件标志着汉朝的灭亡，新朝的建立',
    details: '王莽在汉平帝死后，夺取皇位，建立新朝。他推行新政，但社会动荡，最终被绿林赤眉起义军推翻。'
  },
  {
    id: 'yuan-shao-zhong',
    title: '袁绍中计',
    dynasty: '东汉',
    period: '公元200年',
    year: '公元200年',
    location: '官渡',
    keyFigures: ['袁绍', '曹操', '许攸', '郭图'],
    judge: '曹操',
    type: '军事',
    accusation: '袁绍轻敌，被曹操击败',
    defense: '袁绍认为自己的兵力是曹操的数倍',
    verdict: '失败',
    consequences: [
      '袁绍势力衰落',
      '曹操统一北方',
      '三国鼎立格局形成'
    ],
    historicalSignificance: '官渡之战是中国历史上著名的以少胜多的战役',
    details: '袁绍与曹操在官渡对峙。袁绍兵力是曹操的数倍，但曹操利用袁绍的轻敌，烧毁袁绍粮草，击败袁绍。'
  },
  {
    id: 'cao-piao-xia',
    title: '曹操夏侯惇案',
    dynasty: '三国',
    period: '公元197年',
    year: '公元197年',
    location: '濮阳',
    keyFigures: ['曹操', '夏侯惇', '吕虔'],
    judge: '曹操',
    type: '军事',
    accusation: '夏侯惇在濮阳被吕布俘虏',
    defense: '夏侯惇声称自己是为了保护百姓',
    verdict: '胜利',
    consequences: [
      '夏侯惇失去一只眼睛，但被曹操重用',
      '夏侯惇在军事上更加谨慎'
    ],
    historicalSignificance: '夏侯惇失去一只眼睛后，变得更加谨慎，成为曹操的重要将领',
    details: '夏侯惇在濮阳被吕布俘虏。吕布派人威胁夏侯惇，要求他投降。夏侯惇假装投降，趁机逃脱，但失去了一只眼睛。'
  },
  {
    id: 'liu-bang-chi',
    title: '刘邦除韩信',
    dynasty: '汉朝',
    period: '公元前202年',
    year: '公元前202年',
    location: '未央宫',
    keyFigures: ['刘邦', '韩信', '吕后', '萧何'],
    judge: '吕后',
    type: '政治',
    accusation: '韩信谋反',
    defense: '韩信声称自己从未谋反',
    verdict: '有罪',
    consequences: [
      '韩信被杀，封地为萧何',
      '汉朝统一，刘邦称帝',
      '刘邦开始清除异姓王'
    ],
    historicalSignificance: '这次事件标志着汉朝的建立，刘邦巩固了自己的统治',
    details: '刘邦称帝后，开始清除异姓王。韩信被吕后和萧何诱骗到宫中杀害。'
  },
  {
    id: 'tao-qian-tao-hui-2',
    title: '陶谦病逝',
    dynasty: '东汉',
    period: '公元194年',
    year: '公元194年',
    location: '徐州',
    keyFigures: ['陶谦', '刘备', '陈登', '糜竺'],
    judge: '刘备',
    type: '家族',
    accusation: '刘备继承徐州牧职位',
    defense: '刘备声称自己是出于仁义',
    verdict: '胜利',
    consequences: [
      '刘备获得徐州，开始建立自己的势力',
      '徐州成为刘备的第一个根据地'
    ],
    historicalSignificance: '这次事件标志着刘备势力的开始，为后续的三国故事奠定基础',
    details: '陶谦病重时，将徐州托付给刘备。刘备在陈登和糜竺的帮助下，成功继承了徐州。'
  },
  {
    id: 'ma-qin-sha-zhang',
    title: '马秦杀张翼',
    dynasty: '三国',
    period: '公元263年',
    year: '公元263年',
    location: '绵竹',
    keyFigures: ['姜维', '邓艾', '钟会', '马秦'],
    judge: '钟会',
    type: '政治',
    accusation: '马秦杀张翼，阻止姜维北伐',
    defense: '马秦声称张翼阻碍了国家大业',
    verdict: '胜利',
    consequences: [
      '姜维北伐失败',
      '蜀汉灭亡',
      '三国鼎立结束'
    ],
    historicalSignificance: '这次事件标志着蜀汉的灭亡，三国时代正式结束',
    details: '姜维计划北伐，但被张翼反对。马秦认为张翼阻碍了国家大业，杀死张翼，支持姜维北伐。'
  },
  {
    id: 'jiang-wei-zhong',
    title: '姜维中计',
    dynasty: '三国',
    period: '公元263年',
    year: '公元263年',
    location: '成都',
    keyFigures: ['姜维', '邓艾', '钟会', '刘禅'],
    judge: '刘禅',
    type: '政治',
    accusation: '姜维请求北伐',
    defense: '姜维声称自己是为了保卫国家',
    verdict: '失败',
    consequences: [
      '姜维北伐失败',
      '蜀汉灭亡',
      '三国时代结束'
    ],
    historicalSignificance: '这次失败标志着三国时代的结束，西晋统一中国',
    details: '姜维在刘禅的支持下北伐，但被邓艾和钟会击败。刘禅投降，蜀汉灭亡。'
  },
  {
    id: 'jin-ding-yuan',
    title: '晋定国立',
    dynasty: '西晋',
    period: '公元266年',
    year: '公元266年',
    location: '洛阳',
    keyFigures: ['司马炎', '曹奂', '王濬'],
    judge: '司马炎',
    type: '政治',
    accusation: '司马炎取代曹魏建立晋朝',
    defense: '司马炎声称自己是在顺应天命',
    verdict: '胜利',
    consequences: [
      '曹魏灭亡，西晋建立',
      '晋武帝开始统一中国',
      '三国时代正式结束'
    ],
    historicalSignificance: '这次篡位事件标志着三国时代的结束，西晋统一中国',
    details: '司马炎逼迫曹奂禅让，建立西晋。他励精图治，为统一中国奠定基础。'
  },
  {
    id: 'dong-zhao-sao',
    title: '董卓屠杀',
    dynasty: '东汉',
    period: '公元189年',
    year: '公元189年',
    location: '洛阳',
    keyFigures: ['董卓', '何进', '袁绍', '何苗'],
    judge: '董卓',
    type: '政治',
    accusation: '董卓屠杀官员，控制朝政',
    defense: '董卓声称自己是在平乱',
    verdict: '胜利',
    consequences: [
      '董卓控制朝政',
      '东汉政治更加腐败',
      '各地军阀开始割据'
    ],
    historicalSignificance: '这次屠杀事件标志着东汉的彻底崩溃，三国时期开始',
    details: '何进招董卓进京，但何进被宦官杀死。董卓进入洛阳后，屠杀官员，控制朝政。'
  },
  {
    id: 'liu-bang-qi',
    title: '刘邦诛韩信',
    dynasty: '汉朝',
    period: '公元前196年',
    year: '公元前196年',
    location: '未央宫',
    keyFigures: ['刘邦', '韩信', '吕后', '萧何'],
    judge: '刘邦',
    type: '政治',
    accusation: '韩信谋反',
    defense: '韩信声称自己从未谋反',
    verdict: '有罪',
    consequences: [
      '韩信被杀',
      '刘邦巩固了自己的统治',
      '汉朝统一'
    ],
    historicalSignificance: '这次事件标志着刘邦巩固了自己的统治，为汉朝的稳定奠定基础',
    details: '刘邦怀疑韩信谋反，派萧何将韩信骗到宫中杀害。'
  },
  {
    id: 'cao-tao-zhong',
    title: '曹曹中计',
    dynasty: '三国',
    period: '公元200年',
    year: '公元200年',
    location: '官渡',
    keyFigures: ['曹操', '袁绍', '许攸', '郭图'],
    judge: '曹操',
    type: '军事',
    accusation: '曹操轻敌，被袁绍击败',
    defense: '曹操声称自己有必胜的把握',
    verdict: '胜利',
    consequences: [
      '曹操统一北方',
      '袁绍势力衰落',
      '三国鼎立格局形成'
    ],
    historicalSignificance: '这次反败为胜标志着曹操势力的崛起，为三国鼎立奠定基础',
    details: '曹操在官渡之战中，利用袁绍的轻敌，烧毁袁绍粮草，击败袁绍。'
  }
];

// 按朝代分组
export const TRIALS_BY_DYNASTY = HISTORICAL_TRIALS.reduce((acc, trial) => {
  if (!acc[trial.dynasty]) {
    acc[trial.dynasty] = [];
  }
  acc[trial.dynasty].push(trial);
  return acc;
}, {} as Record<string, HistoricalTrial[]>);

// 按类型分组
export const TRIALS_BY_TYPE = HISTORICAL_TRIALS.reduce((acc, trial) => {
  if (!acc[trial.type]) {
    acc[trial.type] = [];
  }
  acc[trial.type].push(trial);
  return acc;
}, {} as Record<string, HistoricalTrial[]>);

// 胜利案例
export const TRIALS_WON = HISTORICAL_TRIALS.filter(trial =>
  trial.verdict === '胜利' || trial.verdict === '有罪' || trial.verdict === '无罪'
);

// 失败案例
export const TRIALS_LOST = HISTORICAL_TRIALS.filter(trial =>
  trial.verdict === '失败' || trial.verdict === '流放' || trial.verdict === '处死' || trial.verdict === '有争议'
);
