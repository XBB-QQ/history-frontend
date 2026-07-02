/**
 * 古代职业图鉴数据
 * @see history-museum/ITERATIONS.md Iteration #79
 *
 * 包含各个朝代的典型职业、薪资、技能要求等
 */

export interface AncientJob {
  id: string;
  title: string;
  dynasty: string;
  period: string;
  description: string;
  salary: string;
  salaryUnit: string;
  requirements: string[];
  skills: string[];
  dailyLife: string;
  status: 'common' | 'rare' | 'elite' | 'royal';
}

export const ANCIENT_JOBS: AncientJob[] = [
  {
    id: 'farmer',
    title: '农民',
    dynasty: '夏商西周',
    period: '至明清',
    description: '古代最基本的职业，耕种土地，养活家庭',
    salary: '自给自足',
    salaryUnit: '口粮',
    requirements: ['体力', '耐力', '简单农具使用'],
    skills: ['耕种', '施肥', '浇水', '收割', '粮食加工'],
    dailyLife: '日出而作，日落而息。春耕、夏耘、秋收、冬藏。农忙时需要全家一起劳作，农闲时休息',
    status: 'common'
  },
  {
    id: 'craftsman',
    title: '工匠',
    dynasty: '夏商西周',
    period: '至明清',
    description: '掌握各种手艺技能的技师，包括铁匠、木匠、瓦匠、铜匠等',
    salary: '10-50',
    salaryUnit: '文/月',
    requirements: ['技艺', '耐心', '长时间工作'],
    skills: ['雕刻', '锻造', '木工', '建筑', '精密操作'],
    dailyLife: '在作坊工作，经常接触危险材料。工匠需要不断创新以保持竞争力',
    status: 'common'
  },
  {
    id: 'merchant',
    title: '商贩',
    dynasty: '夏商西周',
    period: '至明清',
    description: '从事商品买卖的商人，经营布匹、粮食、珠宝等',
    salary: '未定',
    salaryUnit: '利润',
    requirements: ['算账', '口才', '胆量'],
    skills: ['记账', '讨价还价', '货物鉴定', '市场分析'],
    dailyLife: '走街串巷叫卖，或经营店铺。需要四处奔波寻找货源和客户',
    status: 'common'
  },
  {
    id: 'soldier',
    title: '士兵',
    dynasty: '夏商西周',
    period: '至明清',
    description: '军队中的职业军人，负责保卫国家',
    salary: '10-100',
    salaryUnit: '文/月',
    requirements: ['体力', '纪律', '忠诚'],
    skills: ['使用武器', '战斗技巧', '团队合作', '服从命令'],
    dailyLife: '严格训练，驻扎军营。战争时出征作战，和平时巡逻守卫',
    status: 'common'
  },
  {
    id: 'teacher',
    title: '私塾先生',
    dynasty: '春秋战国',
    period: '至民国',
    description: '在私塾中教授儿童读书写字的启蒙老师',
    salary: '50-200',
    salaryUnit: '文/月',
    requirements: ['识字', '文笔', '耐心'],
    skills: ['教授经典', '批改作业', '管理学生', '德育'],
    dailyLife: '在私塾中教书，负责学生的全部学业。工作稳定但压力大',
    status: 'common'
  },
  {
    id: 'doctor',
    title: '郎中/医生',
    dynasty: '春秋战国',
    period: '至民国',
    description: '治病救人的医师，通过草药、针灸等手段治疗疾病',
    salary: '50-300',
    salaryUnit: '文/月',
    requirements: ['医学知识', '经验', '医德'],
    skills: ['诊断', '开方', '针灸', '草药调配', '外科手术'],
    dailyLife: '坐堂看病或上门出诊。需要不断学习新知识，对病人耐心细致',
    status: 'common'
  },
  {
    id: 'chef',
    title: '御厨',
    dynasty: '秦汉',
    period: '至明清',
    description: '为皇室贵族烹饪美食的顶级厨师',
    salary: '200-1000',
    salaryUnit: '文/月',
    requirements: ['顶级烹饪技艺', '创意', '忠诚'],
    skills: ['宫廷菜制作', '食材搭配', '摆盘艺术', '创新菜式'],
    dailyLife: '在御膳房工作，为皇帝和贵族制作精美菜肴。压力极大，必须完美',
    status: 'elite'
  },
  {
    id: 'writer',
    title: '文人/书生',
    dynasty: '秦汉',
    period: '至民国',
    description: '擅长文学创作、写作的文人雅士',
    salary: '50-500',
    salaryUnit: '文/月',
    requirements: ['才华', '学问', '文笔'],
    skills: ['写作', '诗词', '文章', '书法', '翻译'],
    dailyLife: '读书写字，撰写文章诗词。可能为官，也可能做私人教师',
    status: 'common'
  },
  {
    id: 'calligrapher',
    title: '书法家',
    dynasty: '秦汉',
    period: '至民国',
    description: '擅长书法艺术，以字迹优美著称的艺术家',
    salary: '200-1000',
    salaryUnit: '文/幅',
    requirements: ['天赋', '练习', '审美'],
    skills: ['楷书', '行书', '草书', '隶书', '篆书'],
    dailyLife: '潜心练习书法，为达官贵人书写匾额、书信。作品可作为艺术品收藏',
    status: 'elite'
  },
  {
    id: 'painter',
    title: '画家',
    dynasty: '秦汉',
    period: '至民国',
    description: '擅长绘画艺术，以笔墨技巧著称的艺术家',
    salary: '200-1000',
    salaryUnit: '文/幅',
    requirements: ['天赋', '观察力', '审美'],
    skills: ['山水画', '人物画', '花鸟画', '工笔', '写意'],
    dailyLife: '创作绘画作品，可能为官廷画师或自由画家。作品可作为艺术品收藏',
    status: 'elite'
  },
  {
    id: 'silkmaster',
    title: '丝绸工匠',
    dynasty: '汉',
    period: '至明清',
    description: '专门从事丝绸纺织、印染的工匠',
    salary: '30-150',
    salaryUnit: '文/月',
    requirements: ['精细操作', '耐心', '审美'],
    skills: ['养蚕', '缫丝', '织布', '染色', '印花'],
    dailyLife: '在丝绸作坊工作，需要极其精细的手工操作。工作环境艰苦',
    status: 'common'
  },
  {
    id: 'teaproducer',
    title: '茶农/茶商',
    dynasty: '唐',
    period: '至现代',
    description: '种植茶叶、制作茶叶、经营茶叶的从业者',
    salary: '30-200',
    salaryUnit: '利润',
    requirements: ['农业知识', '营销', '鉴别能力'],
    skills: ['种茶', '采茶', '制茶', '品茶', '茶艺'],
    dailyLife: '在茶园劳作或经营茶店。需要不断学习茶叶知识，与客人交流',
    status: 'common'
  },
  {
    id: 'miners',
    title: '矿工',
    dynasty: '唐',
    period: '至明清',
    description: '开采金银矿、煤矿、铜矿等矿藏的工人',
    salary: '20-80',
    salaryUnit: '文/月',
    requirements: ['体力', '勇气', '安全意识'],
    skills: ['采矿', '爆破', '矿物识别', '安全操作'],
    dailyLife: '在矿洞中工作，环境恶劣危险。需要高超的安全意识和操作技巧',
    status: 'rare'
  },
  {
    id: 'musician',
    title: '乐师',
    dynasty: '唐',
    period: '至明清',
    description: '演奏传统乐器、为宫廷或民间服务的音乐家',
    salary: '50-400',
    salaryUnit: '文/月',
    requirements: ['音乐天赋', '技巧', '舞台表现'],
    skills: ['演奏乐器', '作曲', '乐理', '舞台表演'],
    dailyLife: '在宫廷或乐府工作，为皇室演奏。可能随军出征，为战士鼓劲',
    status: 'elite'
  },
  {
    id: 'tailor',
    title: '裁缝',
    dynasty: '宋',
    period: '至现代',
    description: '制作和修改服装的缝纫工人',
    salary: '20-100',
    salaryUnit: '文/件',
    requirements: ['针线活', '审美', '细心'],
    skills: ['裁剪', '缝纫', '刺绣', '打版', '配饰'],
    dailyLife: '在裁缝铺工作，为顾客制作和修改服装。手艺越好，收入越高',
    status: 'common'
  },
  {
    id: 'swimmer',
    title: '游泳高手',
    dynasty: '宋',
    period: '至现代',
    description: '精通游泳技能，可用于救援或水上作战',
    salary: '30-150',
    salaryUnit: '文/月',
    requirements: ['游泳天赋', '力量', '反应'],
    skills: ['自由泳', '仰泳', '蛙泳', '踩水', '救援'],
    dailyLife: '在水上作业，或在军中服役。需要时刻保持水中警惕',
    status: 'common'
  },
  {
    id: 'bodyguard',
    title: '保镖/护卫',
    dynasty: '宋',
    period: '至民国',
    description: '保护雇主人身安全的职业护卫',
    salary: '50-300',
    salaryUnit: '文/月',
    requirements: ['武力', '警觉', '忠诚'],
    skills: ['格斗', '武器使用', '侦查', '应变'],
    dailyLife: '全天候保护雇主安全，随时准备应对威胁。需要高度警觉',
    status: 'rare'
  },
  {
    id: 'taxcollector',
    title: '税务官',
    dynasty: '宋',
    period: '至现代',
    description: '负责征收税收的政府官员',
    salary: '100-500',
    salaryUnit: '文/月',
    requirements: ['数学能力', '公正', '沟通'],
    skills: ['算账', '征税', '谈判', '法律'],
    dailyLife: '在衙门工作，负责税务征收工作。需要与百姓打交道',
    status: 'common'
  },
  {
    id: 'newspaperman',
    title: '报人/记者',
    dynasty: '清',
    period: '至现代',
    description: '撰写新闻、报道时事的新闻工作者',
    salary: '50-500',
    salaryUnit: '文/篇',
    requirements: ['文笔', '观察力', '胆量'],
    skills: ['采访', '写作', '编辑', '摄影', '排版'],
    dailyLife: '外出采访，撰写新闻稿。需要快速反应，报道突发事件',
    status: 'common'
  },
  {
    id: 'pilot',
    title: '水手/船长',
    dynasty: '宋',
    period: '至明清',
    description: '驾驶船只、带领船队的水上指挥官',
    salary: '100-600',
    salaryUnit: '文/月',
    requirements: ['航海经验', '领导力', '勇气'],
    skills: ['掌舵', '航海技术', '管理船员', '应急处理'],
    dailyLife: '在船上工作，指挥船队航行。需要面对风浪和海盗等危险',
    status: 'elite'
  },
  {
    id: 'silkroadmerchant',
    title: '丝绸之路商队',
    dynasty: '汉',
    period: '至唐',
    description: '穿越丝绸之路的商队首领，经营跨国贸易',
    salary: '未定',
    salaryUnit: '利润',
    requirements: ['商业头脑', '语言能力', '应变能力'],
    skills: ['长途旅行', '多语言', '货物鉴定', '谈判', '风险管理'],
    dailyLife: '在沙漠、戈壁中长途跋涉，穿越多个国家。面临战乱、抢劫等风险',
    status: 'rare'
  },
  {
    id: 'martialartist',
    title: '武术家',
    dynasty: '明',
    period: '至现代',
    description: '精通武术，有实战能力的格斗家',
    salary: '50-500',
    salaryUnit: '文/月',
    requirements: ['天赋', '毅力', '悟性'],
    skills: ['武术套路', '实战技巧', '兵器使用', '教学'],
    dailyLife: '在武馆授课，或在江湖上行走。需要不断修炼提升',
    status: 'rare'
  },
  {
    id: 'gunsmith',
    title: '火器工匠',
    dynasty: '明',
    period: '至近代',
    description: '制造火枪、火炮等火器设备的工匠',
    salary: '100-400',
    salaryUnit: '文/月',
    requirements: ['金属工艺', '数学', '化学知识'],
    skills: ['铸造', '枪械制造', '化学配比', '机械原理'],
    dailyLife: '在军工厂工作，制造先进的火器。技术要求高，工作危险',
    status: 'elite'
  },
  {
    id: 'merchant_classic',
    title: '富商/巨贾',
    dynasty: '明',
    period: '至民国',
    description: '拥有巨额财富的大型商人，经营工商业',
    salary: '未定',
    salaryUnit: '利润',
    requirements: ['商业头脑', '人脉', '胆识'],
    skills: ['商业管理', '市场分析', '金融', '人脉经营'],
    dailyLife: '管理庞大的商业帝国，社交活动频繁。可以影响当地经济',
    status: 'elite'
  },
  {
    id: 'official',
    title: '官员/士大夫',
    dynasty: '唐',
    period: '至清末',
    description: '在政府中担任官职的文官或武官',
    salary: '100-10000',
    salaryUnit: '文/月',
    requirements: ['科举成功', '才学', '德行'],
    skills: ['政务处理', '公文写作', '决策', '管理'],
    dailyLife: '在官府工作，处理政务。需要平衡官场关系，为民服务',
    status: 'elite'
  },
  {
    id: 'nunner',
    title: '尼姑',
    dynasty: '汉',
    period: '至民国',
    description: '出家为尼，在寺庙中修行念佛的女性',
    salary: '自给自足',
    salaryUnit: '香火',
    requirements: ['虔诚', '守戒', '忍耐'],
    skills: ['诵经', '打坐', '禅修', ' herbal medicine'],
    dailyLife: '在寺庙中生活修行，为信众祈福。生活清苦但内心宁静',
    status: 'common'
  },
  {
    id: 'monk',
    title: '和尚',
    dynasty: '汉',
    period: '至民国',
    description: '出家为僧，在寺庙中修行诵经的男性',
    salary: '自给自足',
    salaryUnit: '香火',
    requirements: ['虔诚', '守戒', '忍耐'],
    skills: ['诵经', '打坐', '禅修', ' herb knowledge'],
    dailyLife: '在寺庙中生活修行，为信众祈福。可能参与佛事活动',
    status: 'common'
  },
  {
    id: 'fortune_teller',
    title: '算命先生',
    dynasty: '唐',
    period: '至民国',
    description: '以周易、八字等预测命运的江湖术士',
    salary: '20-200',
    salaryUnit: '文/卦',
    requirements: ['周易知识', '口才', '观察力'],
    skills: ['算卦', '看相', '批八字', '心理咨询'],
    dailyLife: '在街头摆摊或游走江湖，为路人算命。需要巧言善辩',
    status: 'rare'
  },
  {
    id: 'prostitute',
    title: '青楼女子',
    dynasty: '汉',
    period: '至民国',
    description: '在青楼中服务的女子，需要具备才艺',
    salary: '100-1000',
    salaryUnit: '文/月',
    requirements: ['才艺', '美貌', '情商'],
    skills: ['弹琴', '歌舞', '诗词', '茶艺', '人际交往'],
    dailyLife: '在青楼中生活，为客人提供娱乐服务。生活复杂辛苦',
    status: 'rare'
  },
  {
    id: 'cross_dresser',
    title: '优伶/戏曲演员',
    dynasty: '宋',
    period: '至民国',
    description: '在戏台上表演戏曲的艺人，反串表演',
    salary: '50-400',
    salaryUnit: '文/场',
    requirements: ['才艺', '表演力', '忍耐力'],
    skills: ['戏曲表演', '化妆', '身段', '嗓音'],
    dailyLife: '在戏台上表演，需要承受观众的评价和批评',
    status: 'common'
  },
  {
    id: 'inventor',
    title: '发明家',
    dynasty: '明',
    period: '至近代',
    description: '创造发明、改进现有技术的工匠',
    salary: '100-500',
    salaryUnit: '文/项',
    requirements: ['创造力', '动手能力', '毅力'],
    skills: ['机械设计', '材料科学', '试错实验', '专利意识'],
    dailyLife: '在作坊中不断试验创新。成功后可能获得朝廷赏识',
    status: 'rare'
  },
  {
    id: 'archaeologist',
    title: '考古学家',
    dynasty: '现代',
    period: '现代',
    description: '挖掘和研究中古历史遗迹的学者',
    salary: '500-5000',
    salaryUnit: '文/月',
    requirements: ['历史知识', '考古技能', '探险精神'],
    skills: ['挖掘', '文物修复', '历史研究', '团队管理'],
    dailyLife: '在野外挖掘遗址，或在学校研究考古成果',
    status: 'rare'
  }
];

// 按朝代分组
export const ANCIENT_JOBS_BY_DYNASTY = ANCIENT_JOBS.reduce((acc, job) => {
  if (!acc[job.dynasty]) {
    acc[job.dynasty] = [];
  }
  acc[job.dynasty].push(job);
  return acc;
}, {} as Record<string, AncientJob[]>);

// 按技能分类
export const ANCIENT_JOBS_BY_SKILL = ANCIENT_JOBS.reduce((acc, job) => {
  job.skills.forEach(skill => {
    if (!acc[skill]) {
      acc[skill] = [];
    }
    acc[skill].push(job);
  });
  return acc;
}, {} as Record<string, AncientJob[]>);

// 热门职业（按状态）
export const POPULAR_JOBS = ANCIENT_JOBS.filter(job =>
  job.status === 'common' || job.status === 'rare'
).slice(0, 12);

// 奇异职业
export const UNCOMMON_JOBS = ANCIENT_JOBS.filter(job =>
  job.status === 'rare' || job.status === 'elite'
).slice(0, 12);
