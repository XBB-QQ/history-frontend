/**
 * 历史文明熵模型数据
 * 定义从商周到清朝的文明熵值计算、预测和演化
 */

// 文明状态等级
export interface CivilizationStatus {
  level: number; // 熵值等级 1-5
  name: string;
  description: string;
  characteristics: string[];
  historicalExamples: string[];
}

export const CIVILIZATION_STATUS: CivilizationStatus[] = [
  {
    level: 1,
    name: '原始蒙昧',
    description: '混沌无序，文明萌芽期',
    characteristics: ['混沌', '原始', '部落联盟', '萌芽'],
    historicalExamples: ['新石器时代早期', '北京人', '河姆渡文化初期']
  },
  {
    level: 2,
    name: '早期有序',
    description: '建立初步秩序，部落向国家过渡',
    characteristics: ['有序', '部落', '早期国家', '礼制萌芽'],
    historicalExamples: ['夏商西周', '方国联盟', '氏族部落', '礼乐文明起步']
  },
  {
    level: 3,
    name: '繁荣秩序',
    description: '高度组织化，政治经济文化繁荣',
    characteristics: ['繁荣', '强盛', '大一统', '高度组织化'],
    historicalExamples: ['汉唐盛世', '宋元', '明清鼎盛']
  },
  {
    level: 4,
    name: '精细秩序',
    description: '制度精细，专业化程度极高',
    characteristics: ['精细', '专业化', '官僚体系', '士大夫阶层'],
    historicalExamples: ['隋唐科举', '宋明理学', '清代考据学', '高度官僚化']
  },
  {
    level: 5,
    name: '复杂有序',
    description: '极致复杂，系统高度精密',
    characteristics: ['复杂', '精密', '系统化', '极致组织'],
    historicalExamples: ['封建帝国顶峰', '传统社会成熟期', '传统文明的复杂性']
  }
];

// 文明接口
export interface Civilization {
  id: string;
  name: string;
  dynasty: string;
  period: string;
  startYear: number;
  endYear: number;
  entropy: number; // 熵值 0-100
  status: CivilizationStatus;
  timeline: CivilizationTimelineEvent[];
  keyFeatures: string[];
  challenges: string[];
  innovation: string[];
}

export interface CivilizationTimelineEvent {
  year: number;
  event: string;
  impact: string;
  entropyChange: number; // 熵值变化
}

// 历史文明数据
export const CIVILIZATIONS: Civilization[] = [
  {
    id: 'shang',
    name: '商朝',
    dynasty: '商朝',
    period: '公元前1600年 - 公元前1046年',
    startYear: -1600,
    endYear: -1046,
    entropy: 25,
    status: CIVILIZATION_STATUS[1],
    timeline: [
      { year: -1600, event: '成汤灭夏，建立商朝', impact: '打破夏朝秩序，建立新政治体系', entropyChange: 3 },
      { year: -1300, event: '盘庚迁殷，商朝中兴', impact: '稳定政治中心，甲骨文兴起', entropyChange: 2 },
      { year: -1200, event: '青铜铸造技术成熟', impact: '礼器精美，礼乐制度确立', entropyChange: 2 },
      { year: -1046, event: '牧野之战，商亡周兴', impact: '王朝更替，新秩序建立', entropyChange: 4 }
    ],
    keyFeatures: ['甲骨文', '青铜文明', '祭祀文化', '奴隶制'],
    challenges: ['频繁迁都', '内战频发', '祭祀压迫'],
    innovation: ['甲骨文', '青铜器', '商代历法']
  },
  {
    id: 'zhou',
    name: '周朝',
    dynasty: '周朝',
    period: '公元前1046年 - 公元前256年',
    startYear: -1046,
    endYear: -256,
    entropy: 35,
    status: CIVILIZATION_STATUS[2],
    timeline: [
      { year: -1046, event: '武王伐纣，建立周朝', impact: '分封制确立，周礼建立', entropyChange: 4 },
      { year: -841, event: '国人暴动，周召共和', impact: '共和行政，制度完善', entropyChange: 2 },
      { year: -771, event: '犬戎破镐京，平王东迁', impact: '王室衰微，春秋开始', entropyChange: 3 },
      { year: -685, event: '齐桓公尊王攘夷', impact: '霸主制度确立，秩序重组', entropyChange: 2 },
      { year: -481, event: '孔子删定六经', impact: '文化秩序化，思想统一', entropyChange: 3 },
      { year: -256, event: '秦灭周，东周结束', impact: '封建制瓦解，大一统来临', entropyChange: 4 }
    ],
    keyFeatures: ['分封制', '礼乐制度', '百家争鸣', '宗法制'],
    challenges: ['王室衰微', '诸侯争霸', '制度僵化'],
    innovation: ['分封制', '礼乐文明', '百家争鸣', '宗法制度']
  },
  {
    id: 'qin',
    name: '秦朝',
    dynasty: '秦朝',
    period: '公元前221年 - 公元前207年',
    startYear: -221,
    endYear: -207,
    entropy: 45,
    status: CIVILIZATION_STATUS[3],
    timeline: [
      { year: -221, event: '秦始皇统一六国', impact: '统一度量衡、文字，建立中央集权', entropyChange: 6 },
      { year: -213, event: '焚书坑儒', impact: '统一思想，强化控制', entropyChange: 2 },
      { year: -214, event: '修筑长城', impact: '防御体系建立，动员能力提升', entropyChange: 2 },
      { year: -207, event: '秦朝灭亡', impact: '过度集权导致崩溃', entropyChange: -2 }
    ],
    keyFeatures: ['中央集权', '郡县制', '文字统一', '法家思想'],
    challenges: ['过度集权', '民力耗尽', '严刑峻法'],
    innovation: ['中央集权制', '郡县制', '书同文', '度量衡统一']
  },
  {
    id: 'han',
    name: '汉朝',
    dynasty: '汉朝',
    period: '公元前202年 - 公元220年',
    startYear: -202,
    endYear: 220,
    entropy: 55,
    status: CIVILIZATION_STATUS[3],
    timeline: [
      { year: -202, event: '刘邦称帝，建立汉朝', impact: '恢复秩序，建立制度', entropyChange: 5 },
      { year: -138, event: '张骞通西域', impact: '丝绸之路开辟，交流增强', entropyChange: 3 },
      { year: 8, event: '王莽改制', impact: '尝试制度创新，改革失败', entropyChange: 2 },
      { year: 25, event: '光武中兴', impact: '制度重建，社会恢复', entropyChange: 4 },
      { year: 105, event: '蔡伦改进造纸术', impact: '知识传播加速', entropyChange: 3 },
      { year: 184, event: '黄巾起义', impact: '东汉衰落，军阀混战', entropyChange: -3 },
      { year: 220, event: '汉朝灭亡', impact: '三足鼎立，新的秩序', entropyChange: 2 }
    ],
    keyFeatures: ['大一统', '儒家正统', '丝绸之路', '农业文明'],
    challenges: ['外戚宦官', '土地兼并', '农民起义'],
    innovation: ['丝绸之路', '造纸术', '蔡伦', '儒学正统']
  },
  {
    id: 'tang',
    name: '唐朝',
    dynasty: '唐朝',
    period: '公元618年 - 公元907年',
    startYear: 618,
    endYear: 907,
    entropy: 65,
    status: CIVILIZATION_STATUS[3],
    timeline: [
      { year: 618, event: '李渊称帝，建立唐朝', impact: '统一中国，盛世开启', entropyChange: 5 },
      { year: 626, event: '玄武门之变', impact: '权力集中，贞观之治', entropyChange: 3 },
      { year: 649, event: '贞观之治完成', impact: '制度完善，社会稳定', entropyChange: 4 },
      { year: 713, event: '开元盛世', impact: '文化经济繁荣', entropyChange: 5 },
      { year: 751, event: '怛罗斯之战', impact: '文化交流，技术传播', entropyChange: 3 },
      { year: 878, event: '黄巢起义', impact: '唐朝衰落，藩镇割据', entropyChange: -3 },
      { year: 907, event: '唐朝灭亡', impact: '五代十国，秩序重组', entropyChange: 2 }
    ],
    keyFeatures: ['盛世开放', '诗歌文化', '科举制', '民族融合'],
    challenges: ['安史之乱', '藩镇割据', '土地兼并'],
    innovation: ['唐诗', '三省六部制', '开元盛世', '国际交流']
  },
  {
    id: 'song',
    name: '宋朝',
    dynasty: '宋朝',
    period: '公元960年 - 公元1279年',
    startYear: 960,
    endYear: 1279,
    entropy: 72,
    status: CIVILIZATION_STATUS[4],
    timeline: [
      { year: 960, event: '赵匡胤黄袍加身，建立宋朝', impact: '军事妥协，文官政治', entropyChange: 4 },
      { year: 993, event: '庆历新政', impact: '制度改良，富国强兵', entropyChange: 3 },
      { year: 1041, event: '毕昇发明活字印刷', impact: '知识传播加速', entropyChange: 5 },
      { year: 1086, event: '王安石变法', impact: '经济制度改革', entropyChange: 3 },
      { year: 1101, event: '宋徽宗时期', impact: '文化极致繁荣', entropyChange: 4 },
      { year: 1127, event: '靖康之变，北宋灭亡', impact: '偏安江南，制度延续', entropyChange: 3 },
      { year: 1206, event: '铁木真统一蒙古', impact: '外部威胁增大', entropyChange: 2 },
      { year: 1279, event: '崖山海战，宋朝灭亡', impact: '元朝建立，新秩序', entropyChange: 3 }
    ],
    keyFeatures: ['文官政治', '商业繁荣', '理学发展', '科技进步'],
    challenges: ['军事软弱', '土地兼并', '外族威胁'],
    innovation: ['活字印刷', '毕昇', '火药', '指南针', '理学']
  },
  {
    id: 'ming',
    name: '明朝',
    dynasty: '明朝',
    period: '公元1368年 - 公元1644年',
    startYear: 1368,
    endYear: 1644,
    entropy: 78,
    status: CIVILIZATION_STATUS[4],
    timeline: [
      { year: 1368, event: '朱元璋称帝，建立明朝', impact: '恢复汉族统治，制度建设', entropyChange: 5 },
      { year: 1405, event: '郑和下西洋', impact: '外交交流，技术展示', entropyChange: 4 },
      { year: 1421, event: '迁都北京', impact: '政治中心确立', entropyChange: 2 },
      { year: 1522, event: '徐霞客出游', impact: '地理考察', entropyChange: 3 },
      { year: 1572, event: '万历新政', impact: '制度完善', entropyChange: 3 },
      { year: 1616, event: '努尔哈赤建立后金', impact: '满洲崛起', entropyChange: 2 },
      { year: 1644, event: '李自成攻入北京', impact: '明朝灭亡，清兵入关', entropyChange: -2 }
    ],
    keyFeatures: ['皇权集中', '内阁制', '士大夫政治', '资本主义萌芽'],
    challenges: ['宦官专权', '土地兼并', '外族威胁'],
    innovation: ['郑和下西洋', '工商业繁荣', '资本主义萌芽', '四书五经']
  },
  {
    id: 'qing',
    name: '清朝',
    dynasty: '清朝',
    period: '公元1644年 - 公元1912年',
    startYear: 1644,
    endYear: 1912,
    entropy: 85,
    status: CIVILIZATION_STATUS[5],
    timeline: [
      { year: 1644, event: '清兵入关，建立清朝', impact: '少数民族入主中原', entropyChange: 6 },
      { year: 1661, event: '康熙帝亲政', impact: '盛世开局', entropyChange: 4 },
      { year: 1689, event: '中俄《尼布楚条约》', impact: '疆域确立', entropyChange: 3 },
      { year: 1712, event: '摊丁入亩', impact: '人口增长', entropyChange: 4 },
      { year: 1723, event: '雍正改革', impact: '制度完善', entropyChange: 3 },
      { year: 1735, event: '乾隆盛世', impact: '传统文化高峰', entropyChange: 5 },
      { year: 1840, event: '鸦片战争', impact: '国门洞开', entropyChange: -3 },
      { year: 1856, event: '第二次鸦片战争', impact: '传统秩序崩溃', entropyChange: -2 },
      { year: 1912, event: '辛亥革命，清朝灭亡', impact: '封建制度终结', entropyChange: 3 }
    ],
    keyFeatures: ['皇权极盛', '多民族统一', '官僚体系成熟', '传统社会顶峰'],
    challenges: ['闭关锁国', '制度僵化', '列强入侵'],
    innovation: ['多民族统一', '人口突破4亿', '考据学', '文化集大成']
  }
];

// 预测场景接口
export interface PredictionScenario {
  id: string;
  name: string;
  description: string;
  variables: {
    name: string;
    value: number;
    min: number;
    max: number;
    step: number;
  }[];
  predictedEntropy: number;
  predictedYear: number;
  predictedStatus: CivilizationStatus;
  probability: number; // 0-100%
  riskLevel: 'low' | 'medium' | 'high';
}

// 预测场景数据
export const PREDICTION_SCENARIOS: PredictionScenario[] = [
  {
    id: 'scenario-1',
    name: '技术革命',
    description: '持续科技突破带来新秩序',
    variables: [
      { name: '科技突破率', value: 70, min: 0, max: 100, step: 5 },
      { name: '文化包容性', value: 80, min: 0, max: 100, step: 5 },
      { name: '社会公平性', value: 75, min: 0, max: 100, step: 5 }
    ],
    predictedEntropy: 45,
    predictedYear: 2150,
    predictedStatus: CIVILIZATION_STATUS[3],
    probability: 35,
    riskLevel: 'low'
  },
  {
    id: 'scenario-2',
    name: '生态崩溃',
    description: '环境恶化导致社会混乱',
    variables: [
      { name: '环境恶化率', value: 85, min: 0, max: 100, step: 5 },
      { name: '资源利用率', value: 40, min: 0, max: 100, step: 5 },
      { name: '社会凝聚力', value: 50, min: 0, max: 100, step: 5 }
    ],
    predictedEntropy: 95,
    predictedYear: 2100,
    predictedStatus: CIVILIZATION_STATUS[5],
    probability: 45,
    riskLevel: 'high'
  },
  {
    id: 'scenario-3',
    name: '文明融合',
    description: '多文明融合形成新秩序',
    variables: [
      { name: '文化融合率', value: 90, min: 0, max: 100, step: 5 },
      { name: '治理能力', value: 85, min: 0, max: 100, step: 5 },
      { name: '创新指数', value: 80, min: 0, max: 100, step: 5 }
    ],
    predictedEntropy: 30,
    predictedYear: 2200,
    predictedStatus: CIVILIZATION_STATUS[2],
    probability: 30,
    riskLevel: 'low'
  },
  {
    id: 'scenario-4',
    name: '制度僵化',
    description: '过度集权导致衰落',
    variables: [
      { name: '集权程度', value: 95, min: 0, max: 100, step: 5 },
      { name: '创新能力', value: 30, min: 0, max: 100, step: 5 },
      { name: '社会流动', value: 20, min: 0, max: 100, step: 5 }
    ],
    predictedEntropy: 75,
    predictedYear: 2080,
    predictedStatus: CIVILIZATION_STATUS[5],
    probability: 50,
    riskLevel: 'medium'
  },
  {
    id: 'scenario-5',
    name: '大分散',
    description: '小而美的文明网络',
    variables: [
      { name: '分散度', value: 80, min: 0, max: 100, step: 5 },
      { name: '合作程度', value: 70, min: 0, max: 100, step: 5 },
      { name: '技术创新', value: 75, min: 0, max: 100, step: 5 }
    ],
    predictedEntropy: 25,
    predictedYear: 2100,
    predictedStatus: CIVILIZATION_STATUS[1],
    probability: 25,
    riskLevel: 'low'
  }
];

// 计算熵值函数
export function calculateEntropy(
  innovation: number,
  organization: number,
  stability: number,
  communication: number,
  mobility: number,
  hierarchy: number
): number {
  // 熵值公式：综合各项指标，反映秩序复杂度
  const entropy = (innovation * 0.2 + organization * 0.15 + stability * 0.15 +
                  communication * 0.15 + mobility * 0.15 + hierarchy * 0.2) / 100 * 100;
  return Math.min(100, Math.max(0, entropy));
}

// 预测熵值变化函数
export function predictEntropyChange(currentEntropy: number, factors: {
  innovation: number;
  organization: number;
  stability: number;
}): number {
  // 基于当前熵值和历史模式预测变化
  let change = 0;

  // 创新因素：适度创新促进秩序优化
  if (factors.innovation > 60) {
    change += (factors.innovation - 60) * 0.2;
  }

  // 组织因素：过度组织降低熵值
  if (factors.organization > 70) {
    change -= (factors.organization - 70) * 0.15;
  }

  // 稳定性因素：不稳定增加熵值
  if (factors.stability < 50) {
    change += (50 - factors.stability) * 0.25;
  }

  return Math.round(change);
}

// 熵值等级评估函数
export function getEntropyLevel(entropy: number): CivilizationStatus {
  if (entropy < 20) return CIVILIZATION_STATUS[0];
  if (entropy < 35) return CIVILIZATION_STATUS[1];
  if (entropy < 50) return CIVILIZATION_STATUS[2];
  if (entropy < 70) return CIVILIZATION_STATUS[3];
  if (entropy < 85) return CIVILIZATION_STATUS[4];
  return CIVILIZATION_STATUS[5];
}

// 时间序列预测函数
export function predictTimeline(
  currentEntropy: number,
  yearsToPredict: number,
  factors: {
    innovation: number;
    organization: number;
    stability: number;
  }
): CivilizationTimelineEvent[] {
  const timeline: CivilizationTimelineEvent[] = [];
  let currentYear = new Date().getFullYear();
  let currentEntropyValue = currentEntropy;

  for (let year = 1; year <= yearsToPredict; year++) {
    const change = predictEntropyChange(currentEntropyValue, factors);
    currentEntropyValue = Math.max(0, Math.min(100, currentEntropyValue + change));

    // 根据熵值变化生成预测事件
    let event = '';
    let impact = '';
    let impactEntropyChange = change;

    if (change > 3) {
      event = '制度创新与改革';
      impact = '社会秩序优化，文明等级提升';
    } else if (change < -3) {
      event = '危机与动荡';
      impact = '秩序衰退，文明等级下降';
    } else if (Math.random() > 0.7) {
      event = '重大突破';
      impact = '技术或文化重大进步';
    }

    timeline.push({
      year: currentYear + year,
      event,
      impact,
      entropyChange: impactEntropyChange
    });
  }

  return timeline;
}

// 导出常量
export const ENTROPY_LEVELS = {
  1: CIVILIZATION_STATUS[0].name,
  2: CIVILIZATION_STATUS[1].name,
  3: CIVILIZATION_STATUS[2].name,
  4: CIVILIZATION_STATUS[3].name,
  5: CIVILIZATION_STATUS[4].name,
  6: CIVILIZATION_STATUS[5].name
};

export const CHALLENGE_CATEGORIES = [
  '政治制度', '经济结构', '社会矛盾', '外部威胁', '资源限制'
];
