/**
 * 历史瘟疫数据
 * @see history-museum/ITERATIONS.md Iteration #69
 *
 * 记录中国历史上的重大瘟疫及其影响
 */

export interface PlagueEpidemic {
  id: string;
  year?: string;
  name: string;
  dynasty: string;
  period: string;
  location: string;
  cause: string;
  symptoms: string;
  deathRate?: string;
  duration?: string;
  impact: string;
  casualties?: string;
  famousPeople?: string[];
  consequences: string[];
  prevention?: string;
  afterEffects?: string;
}

export const PLAGUE_EPIDEMICS: PlagueEpidemic[] = [
  {
    id: 'han-yellow-fever',
    name: '东汉末年大瘟疫',
    dynasty: '东汉',
    period: '公元2世纪末-3世纪初',
    location: '黄河流域',
    cause: '气候变化、战乱、饥荒导致卫生条件恶化',
    symptoms: '高热、咳嗽、黄疽、吐血、心悸',
    deathRate: '死亡人数约250万-500万',
    duration: '持续数十年',
    impact: '直接导致汉末混乱，间接促成三国鼎立局面',
    casualties: '估计死亡人数250万-500万',
    famousPeople: ['华佗', '张仲景', '蔡邕'],
    consequences: [
      '催生了华佗的外科手术',
      '张仲景撰写《伤寒杂病论》，奠定中医理论基础',
      '文人雅士染病，诗歌中频繁出现瘟疫主题'
    ],
    prevention: '传统医术：隔离、草药、针灸',
    afterEffects: '瘟疫后社会结构重组，文化氛围更加悲悯'
  },
  {
    id: 'tang-plague',
    name: '唐代大瘟疫',
    dynasty: '唐朝',
    period: '公元7世纪末',
    location: '黄河流域',
    cause: '气候变化与贸易路线传播',
    symptoms: '高热、呕血、腹泻、皮肤斑疹',
    deathRate: '未明确统计，估计数万至数十万',
    duration: '约数月',
    impact: '导致唐朝人口锐减，财政困难',
    casualties: '估计死亡人数10万-50万',
    famousPeople: [],
    consequences: [
      '唐朝人口从约5000万降至约3000万',
      '杜甫诗作中多次提及瘟疫',
      '加速了安史之乱前的社会动荡'
    ],
    prevention: '隔离患者，焚毁染病衣物',
    afterEffects: '削弱了唐朝国力，加速了安史之乱'
  },
  {
    id: 'song-plague',
    name: '宋代大瘟疫',
    dynasty: '宋朝',
    period: '公元12世纪初',
    location: '江南地区',
    cause: '旱灾、蝗灾、饥荒叠加',
    symptoms: '高热、呕吐、皮肤溃烂',
    deathRate: '估计死亡数十万',
    duration: '持续数年',
    impact: '导致南宋财政恶化，加速了金国南侵',
    casualties: '估计死亡人数20万-100万',
    famousPeople: ['陆游', '辛弃疾'],
    consequences: [
      '陆游诗中描写瘟疫惨状',
      '宋朝政府加强卫生管理，建立瘟疫记录制度',
      '促成了宋朝的公共卫生政策改革'
    ],
    prevention: '建立瘟疫报告制度，隔离检疫',
    afterEffects: '宋朝建立了最早的公共卫生管理体系'
  },
  {
    id: 'ming-plague',
    name: '明代大瘟疫',
    dynasty: '明朝',
    period: '公元17世纪初',
    location: '华北地区',
    cause: '干旱、饥荒、鼠疫杆菌',
    symptoms: '高热、淋巴结肿大、皮肤出血',
    deathRate: '严重地区死亡率超过50%',
    duration: '约10年',
    impact: '直接导致明朝灭亡',
    casualties: '估计死亡人数1000万-2000万',
    famousPeople: ['吴伟业', '谈迁'],
    consequences: [
      '李自成起义军利用瘟疫削弱明朝',
      '加速了北京陷落',
      '明朝统治者施政无能，百姓流离失所'
    ],
    prevention: '隔离患者，焚毁衣物，焚烧尸体',
    afterEffects: '明朝灭亡，清朝建立'
  },
  {
    id: 'qing-plague',
    name: '清代大瘟疫',
    dynasty: '清朝',
    period: '公元19世纪中叶',
    location: '全国范围',
    cause: '战乱、交通不便、医疗条件差',
    symptoms: '高热、皮肤斑疹、淋巴结肿大',
    deathRate: '不同地区差异很大',
    duration: '数月到数年',
    impact: '削弱了清军战斗力，间接影响了太平天国运动',
    casualties: '估计死亡人数数百万',
    famousPeople: [],
    consequences: [
      '太平军利用瘟疫攻击清朝',
      '清政府加强了对疫区的控制',
      '中医开始应用抗菌药物'
    ],
    prevention: '封锁疫区，隔离治疗',
    afterEffects: '清政府对公共卫生的认识加深'
  },
  {
    id: 'tongzhi-plague',
    name: '光绪年间大瘟疫',
    dynasty: '清朝',
    period: '公元1876-1877年',
    location: '华北、西北',
    cause: '极度干旱导致的饥荒和鼠疫',
    symptoms: '高热、皮肤出血、淋巴结肿大',
    deathRate: '严重地区死亡率超过70%',
    duration: '2-3年',
    impact: '人口锐减，经济崩溃',
    casualties: '估计死亡人数200万-500万',
    famousPeople: [],
    consequences: [
      '引发了大规模的难民潮',
      '加剧了社会动荡',
      '清朝统治更加虚弱'
    ],
    prevention: '封锁疫区，焚烧尸体，隔离',
    afterEffects: '加剧了清末的社会危机'
  },
  {
    id: 'wuhan-plague',
    name: '1910-1911年东北鼠疫',
    dynasty: '清朝',
    period: '公元1910-1911年',
    location: '东北三省',
    cause: '俄蒙边境鼠疫传入',
    symptoms: '高热、皮肤瘀斑、淋巴结肿大',
    deathRate: '初期死亡率极高',
    duration: '约8个月',
    impact: '伍连德博士成功防控，创造世界记录',
    casualties: '约6万人',
    famousPeople: ['伍连德'],
    consequences: [
      '创造了"戴口罩"防控疫情的先例',
      '建立了中国近代公共卫生体系',
      '伍连德成为中国第一位诺贝尔奖候选人'
    ],
    prevention: '戴口罩，隔离，焚烧尸体',
    afterEffects: '中国公共卫生进入近代化阶段'
  },
  {
    id: 'cholera',
    name: '多次霍乱疫情',
    dynasty: '清末民初',
    period: '1830s-1930s',
    location: '中国沿海及内陆',
    cause: '水污染、卫生条件差',
    symptoms: '剧烈腹泻、呕吐、脱水、肌肉痉挛',
    deathRate: '未明确统计，估计数万',
    duration: '每次持续数月',
    impact: '加速了清末社会的崩溃',
    casualties: '估计死亡人数数万至数十万',
    famousPeople: [],
    consequences: [
      '推动了公共卫生改革',
      '建立了最早的医院和卫生局',
      '催生了现代医学传播'
    ],
    prevention: '饮用水消毒，隔离患者',
    afterEffects: '中国开始重视环境卫生'
  },
  {
    id: 'smallpox',
    name: '天花疫情',
    dynasty: '历代',
    period: '古代至19世纪末',
    location: '中国各地',
    cause: '病毒传播',
    symptoms: '高热、头痛、皮肤出现斑疹',
    deathRate: '死亡率可达30%',
    duration: '未明确统计',
    impact: '严重威胁人口健康',
    casualties: '估计死亡人数数百万',
    famousPeople: ['光绪皇帝'],
    consequences: [
      '中国最早尝试接种人痘',
      '促进了免疫学发展',
      '最终通过牛痘消灭天花'
    ],
    prevention: '人痘接种，牛痘接种',
    afterEffects: '中国免疫学先导'
  },
  {
    id: 'plague-1910-1920',
    name: '1910-1920年鼠疫',
    dynasty: '民国',
    period: '公元1910-1920年',
    location: '中国北方',
    cause: '国际传播',
    symptoms: '高热、淋巴结肿大、皮肤瘀斑',
    deathRate: '较高',
    duration: '约10年',
    impact: '造成巨大人口损失',
    casualties: '估计死亡人数数百万',
    famousPeople: [],
    consequences: [
      '促进了中西医合作',
      '建立了完善的防疫体系',
      '推动了公共卫生教育'
    ],
    prevention: '戴口罩，隔离，焚烧',
    afterEffects: '公共卫生意识大幅提升'
  },
  {
    id: 'smallpox-1950s',
    name: '1950s天花防疫',
    dynasty: '新中国',
    period: '1950s',
    location: '全国范围',
    cause: '国家组织大规模防疫',
    symptoms: '与历史上天花相同',
    deathRate: '较低',
    duration: '1950-1959',
    impact: '中国成为世界消灭天花的里程碑',
    casualties: '数万',
    famousPeople: [],
    consequences: [
      '中国成为世界上消灭天花的国家之一',
      '建立了一流的防疫体系',
      '培养了大批公共卫生人才'
    ],
    prevention: '疫苗接种，建立监测网络',
    afterEffects: '中国公共卫生成就斐然'
  }
];

// 按朝代分组
export const PLAGUES_BY_DYNASTY = PLAGUE_EPIDEMICS.reduce((acc, plague) => {
  if (!acc[plague.dynasty]) {
    acc[plague.dynasty] = [];
  }
  acc[plague.dynasty].push(plague);
  return acc;
}, {} as Record<string, PlagueEpidemic[]>);

// 按影响等级分类
export const HIGH_IMPACT_PLAGUES = PLAGUE_EPIDEMICS.filter(plague =>
  plague.casualties && parseInt(plague.casualties) > 1000000
);

export const MEDIUM_IMPACT_PLAGUES = PLAGUE_EPIDEMICS.filter(plague =>
  plague.casualties && parseInt(plague.casualties) >= 100000 && parseInt(plague.casualties) <= 1000000
);

export const LOW_IMPACT_PLAGUES = PLAGUE_EPIDEMICS.filter(plague =>
  !plague.casualties || parseInt(plague.casualties) < 100000
);

// 关键词标签
export const PLAGUE_TAGS = PLAGUE_EPIDEMICS.flatMap(plague => plague.consequences);
export const UNIQUE_TAGS = Array.from(new Set(PLAGUE_TAGS));
