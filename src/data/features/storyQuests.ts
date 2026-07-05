/**
 * 主题研学线（Story Quest）数据
 * 将现有 60+ 页面按历史主题编排为 8 条研学线
 * @see ITERATIONS.md #85
 */

/** 研学节点完成条件 */
export type QuestCompleteCondition = 'visit' | 'quiz_pass' | 'read_time';

/** 研学节点 */
export interface QuestNode {
  /** 唯一标识 */
  id: string;
  /** 节点标题 */
  title: string;
  /** 目标路由路径 */
  path: string;
  /** 节点类型 */
  type: 'event' | 'page' | 'quiz' | 'milestone';
  /** 完成条件 */
  condition: QuestCompleteCondition;
  /** 完成所需参数 */
  conditionMeta?: Record<string, unknown>;
  /** 节点描述 */
  description?: string;
  /** 排序权重 */
  order: number;
}

/** 研学线印章 */
export interface QuestSeal {
  /** 印章名称 */
  name: string;
  /** 图标 emoji */
  icon: string;
  /** 获取文案 */
  obtainText: string;
}

/** 研学线线报 */
export interface QuestBriefing {
  /** 线报标题 */
  title: string;
  /** 线报内容 */
  content: string;
  /** 附加链接（可选） */
  linkPath?: string;
  linkLabel?: string;
}

/** 研学线 */
export interface StudyRoute {
  /** 唯一标识 */
  id: string;
  /** 研学线名称 */
  name: string;
  /** 封面 emoji */
  emoji: string;
  /** 简介 */
  description: string;
  /** 难度等级 1-5 */
  difficulty: number;
  /** 预计耗时（分钟） */
  estimatedMinutes: number;
  /** 关联朝代标签 */
  dynasties: string[];
  /** 节点列表 */
  nodes: QuestNode[];
  /** 完成印章 */
  seal: QuestSeal;
  /** 完成线报 */
  briefing: QuestBriefing;
  /** 推荐顺序（首页展示优先级） */
  featuredOrder: number;
}

/**
 * 8 条研学线 — 覆盖现有 60+ 页面
 */
export const STUDY_ROUTES: StudyRoute[] = [
  {
    id: 'anshi',
    name: '安史之乱暗线',
    emoji: '⚔️',
    description: '从开元盛世到马嵬坡之变，深入挖掘安史之乱背后的政治、经济、文化暗线',
    difficulty: 4,
    estimatedMinutes: 120,
    dynasties: ['唐'],
    nodes: [
      { id: 'n1', title: '气候变暖与开元盛世', path: '/climate', type: 'page', condition: 'visit', order: 1, description: '了解唐代气候变暖如何促成开元盛世' },
      { id: 'n2', title: '唐朝疆域巅峰', path: '/territory', type: 'page', condition: 'visit', order: 2, description: '查看唐玄宗时期最大疆域' },
      { id: 'n3', title: '节度使制度演变', path: '/dynasty-economy', type: 'page', condition: 'visit', order: 3, description: '在朝代沙盘中理解节度使权力膨胀' },
      { id: 'n4', title: '安禄山人物传记', path: '/persons', type: 'page', condition: 'visit', order: 4, description: '研究安禄山的粟特-突厥混合背景' },
      { id: 'n5', title: '渔阳鼙鼓动地来', path: '/battle', type: 'page', condition: 'visit', order: 5, description: '战役推演安史之乱关键战斗' },
      { id: 'n6', title: '马嵬坡之变多视角', path: '/multi-perspective', type: 'page', condition: 'visit', order: 6, description: '从玄宗/贵妃/将士不同角度看待马嵬坡' },
      { id: 'n7', title: '安史之乱 quiz', path: '/leaderboard', type: 'quiz', condition: 'quiz_pass', order: 7, conditionMeta: { topic: '安史之乱' }},
    ],
    seal: { name: '乱世洞察者', icon: '🏅', obtainText: '完成安史之乱暗线全部节点' },
    briefing: {
      title: '线报：盛极而衰的规律',
      content: '安史之乱并非偶然——气候回暖带来人口暴增，节度使制度失衡，民族政策埋雷。当你把气候、疆域、经济、人物串联起来，历史的暗线自然浮现。',
      linkPath: '/timeline',
      linkLabel: '回到时间轴查看更多',
    },
    featuredOrder: 1,
  },
  {
    id: 'three-kingdoms',
    name: '三国风云全览',
    emoji: '🦁',
    description: '从黄巾之乱到三国归晋，全景式理解三国时代的关键转折',
    difficulty: 3,
    estimatedMinutes: 90,
    dynasties: ['汉', '三国'],
    nodes: [
      { id: 'n1', title: '东汉末年气候灾难', path: '/climate', type: 'page', condition: 'visit', order: 1, description: '小冰河期如何加速东汉崩溃' },
      { id: 'n2', title: '三国疆域对比', path: '/territory', type: 'page', condition: 'visit', order: 2, description: '对比三国各自疆域变化' },
      { id: 'n3', title: '曹操人物深度解读', path: '/persons', type: 'page', condition: 'visit', order: 3, description: '曹操的多面性：政治家、军事家、诗人' },
      { id: 'n4', title: '赤壁之战推演', path: '/battle', type: 'page', condition: 'visit', order: 4, description: '在沙盘上重现赤壁之战' },
      { id: 'n5', title: '三国经济对比', path: '/dynasty-economy', type: 'page', condition: 'visit', order: 5, description: '三国各自的经济发展模式' },
      { id: 'n6', title: '三国人物对话', path: '/dialog', type: 'page', condition: 'visit', order: 6, description: '让曹操和刘备辩论天下' },
    ],
    seal: { name: '三国通', icon: '🎖️', obtainText: '完成三国风云全览全部节点' },
    briefing: {
      title: '线报：三分天下的本质',
      content: '三国不是简单的武力征服，而是三种治国模式的竞争：曹魏的制度创新、蜀汉的意识形态、东吴的航海贸易。理解了这一点，你就理解了三国。',
    },
    featuredOrder: 2,
  },
  {
    id: 'qin-han',
    name: '秦汉大一统之路',
    emoji: '👑',
    description: '从商鞅变法到汉武帝独尊儒术，理解中国第一次真正的大一统',
    difficulty: 4,
    estimatedMinutes: 150,
    dynasties: ['秦', '汉'],
    nodes: [
      { id: 'n1', title: '商鞅变法与经济', path: '/dynasty-economy', type: 'page', condition: 'visit', order: 1 },
      { id: 'n2', title: '秦朝疆域与郡县制', path: '/territory', type: 'page', condition: 'visit', order: 2 },
      { id: 'n3', title: '秦始皇人物档案', path: '/persons', type: 'page', condition: 'visit', order: 3 },
      { id: 'n4', title: '秦汉战役推演', path: '/battle', type: 'page', condition: 'visit', order: 4 },
      { id: 'n5', title: '汉字演变（篆→隶）', path: '/char-evolution', type: 'page', condition: 'visit', order: 5 },
      { id: 'n6', title: '秦汉科技树', path: '/tech-tree', type: 'page', condition: 'visit', order: 6 },
      { id: 'n7', title: '历史抉择：如果你是刘邦', path: '/simulator', type: 'page', condition: 'visit', order: 7 },
      { id: 'n8', title: '秦汉 quiz 挑战', path: '/leaderboard', type: 'quiz', condition: 'quiz_pass', order: 8 },
    ],
    seal: { name: '大一统学家', icon: '🏆', obtainText: '完成秦汉大一统之路全部节点' },
    briefing: {
      title: '线报：什么是一统？',
      content: '秦汉大一统不只是领土统一，更是文字、度量衡、货币、思想、制度的全面统一。这条研学线帮你串联起这些看似独立的变革。',
      linkPath: '/knowledge',
      linkLabel: '探索更多知识卡片',
    },
    featuredOrder: 3,
  },
  {
    id: 'tang-song',
    name: '唐宋变革论',
    emoji: '🏯',
    description: '从唐代门阀社会到宋代平民社会，理解中国历史上最重要的结构性转变',
    difficulty: 5,
    estimatedMinutes: 180,
    dynasties: ['唐', '宋'],
    nodes: [
      { id: 'n1', title: '唐朝气候与农业', path: '/climate', type: 'page', condition: 'visit', order: 1 },
      { id: 'n2', title: '唐宋食物变迁', path: '/dynasty-food', type: 'page', condition: 'visit', order: 2 },
      { id: 'n3', title: '科举制度演变', path: '/examination', type: 'page', condition: 'visit', order: 3 },
      { id: 'n4', title: '宋朝经济沙盘', path: '/dynasty-economy', type: 'page', condition: 'visit', order: 4 },
      { id: 'n5', title: '唐宋人物对比', path: '/compare', type: 'page', condition: 'visit', order: 5 },
      { id: 'n6', title: '唐诗宋词音频', path: '/podcast', type: 'page', condition: 'visit', order: 6 },
      { id: 'n7', title: '唐宋疆域变化', path: '/territory', type: 'page', condition: 'visit', order: 7 },
    ],
    seal: { name: '变革观察者', icon: '🎗️', obtainText: '完成唐宋变革论全部节点' },
    briefing: {
      title: '线报：陈寅恪的洞见',
      content: '"华夏民族之文化，历数千载之演进，造极于赵宋之世。"唐宋变革论揭示了中国从中古贵族社会向近世平民社会的根本转型。',
    },
    featuredOrder: 4,
  },
  {
    id: 'ming-qing',
    name: '明清鼎革与闭关',
    emoji: '🏯',
    description: '从朱元璋建国到鸦片战争，理解明清两代的兴衰逻辑',
    difficulty: 4,
    estimatedMinutes: 140,
    dynasties: ['明', '清'],
    nodes: [
      { id: 'n1', title: '明朝经济改革', path: '/dynasty-economy', type: 'page', condition: 'visit', order: 1 },
      { id: 'n2', title: '郑和下西洋', path: '/migration', type: 'page', condition: 'visit', order: 2 },
      { id: 'n3', title: '明清人物群像', path: '/persons', type: 'page', condition: 'visit', order: 3 },
      { id: 'n4', title: '明清疆域巅峰', path: '/territory', type: 'page', condition: 'visit', order: 4 },
      { id: 'n5', title: '明清科技树', path: '/tech-tree', type: 'page', condition: 'visit', order: 5 },
      { id: 'n6', title: '鸦片战争推演', path: '/battle', type: 'page', condition: 'visit', order: 6 },
      { id: 'n7', title: '明清辩论：海禁vs开海', path: '/cross-debate', type: 'page', condition: 'visit', order: 7 },
    ],
    seal: { name: '鼎革学者', icon: '📜', obtainText: '完成明清鼎革与闭关全部节点' },
    briefing: {
      title: '线报：闭关还是自保？',
      content: '明清的海禁政策不能简单用"闭关锁国"概括。从郑和下西洋的开放到乾隆拒绝马戛尔尼的保守，背后是农业帝国面对海洋文明的结构性困境。',
    },
    featuredOrder: 5,
  },
  {
    id: 'modern',
    name: '近代救亡图存',
    emoji: '🔥',
    description: '从鸦片战争到新中国成立，理解中国近代化的艰难历程',
    difficulty: 5,
    estimatedMinutes: 200,
    dynasties: ['清', '民国'],
    nodes: [
      { id: 'n1', title: '晚清经济崩溃', path: '/dynasty-economy', type: 'page', condition: 'visit', order: 1 },
      { id: 'n2', title: '人口迁徙与太平天国', path: '/migration', type: 'page', condition: 'visit', order: 2 },
      { id: 'n3', title: '近代战役推演', path: '/battle', type: 'page', condition: 'visit', order: 3 },
      { id: 'n4', title: '近代人物群像', path: '/persons', type: 'page', condition: 'visit', order: 4 },
      { id: 'n5', title: '戊戌变法情景', path: '/scenario-jingkang', type: 'page', condition: 'visit', order: 5 },
      { id: 'n6', title: '辛亥革命情景', path: '/scenario-xinhai', type: 'page', condition: 'visit', order: 6 },
      { id: 'n7', title: '近代预言：如果清末改革成功', path: '/future-prediction', type: 'page', condition: 'visit', order: 7 },
      { id: 'n8', title: '近代 quiz 挑战', path: '/leaderboard', type: 'quiz', condition: 'quiz_pass', order: 8 },
    ],
    seal: { name: '近代史专家', icon: '🌟', obtainText: '完成近代救亡图存全部节点' },
    briefing: {
      title: '线报：历史的十字路口',
      content: '近代中国的每一次选择都是生死攸关的。这条研学线带你穿越鸦片战争到新中国成立的每一个关键节点，理解为什么历史走上了这条路。',
      linkPath: '/time-capsule',
      linkLabel: '给未来写一封历史信',
    },
    featuredOrder: 6,
  },
  {
    id: 'culture',
    name: '中华文化基因',
    emoji: '🎭',
    description: '从汉字、美食到气味、色彩，解码中华文化深处的基因密码',
    difficulty: 2,
    estimatedMinutes: 60,
    dynasties: ['多朝代'],
    nodes: [
      { id: 'n1', title: '汉字三千年的演变', path: '/char-evolution', type: 'page', condition: 'visit', order: 1 },
      { id: 'n2', title: '历代名菜谱', path: '/dynasty-food', type: 'page', condition: 'visit', order: 2 },
      { id: 'n3', title: '历史气味博物馆', path: '/scent-museum', type: 'page', condition: 'visit', order: 3 },
      { id: 'n4', title: '水墨动画欣赏', path: '/ink-animation', type: 'page', condition: 'visit', order: 4 },
      { id: 'n5', title: '历史声音博物馆', path: '/sound-museum', type: 'page', condition: 'visit', order: 5 },
      { id: 'n6', title: '古建筑榫卯结构', path: '/architecture-mortise', type: 'page', condition: 'visit', order: 6 },
    ],
    seal: { name: '文化解码者', icon: '🎨', obtainText: '完成中华文化基因全部节点' },
    briefing: {
      title: '线报：文化的底层代码',
      content: '汉字、美食、气味、建筑——这些看似分散的文化元素其实共享着一套底层逻辑。当你把它们串联起来，中华文明的独特基因就清晰可见了。',
    },
    featuredOrder: 7,
  },
  {
    id: 'global',
    name: '中外文明对照',
    emoji: '🌍',
    description: '将中国历史放在世界坐标系中，理解中华文明在全球历史中的位置',
    difficulty: 3,
    estimatedMinutes: 100,
    dynasties: ['多朝代'],
    nodes: [
      { id: 'n1', title: '中外朝代对照表', path: '/world-compare', type: 'page', condition: 'visit', order: 1 },
      { id: 'n2', title: '丝绸之路交通', path: '/transport-timeline', type: 'page', condition: 'visit', order: 2 },
      { id: 'n3', title: '人口迁徙地图', path: '/migration', type: 'page', condition: 'visit', order: 3 },
      { id: 'n4', title: '中外科技树对比', path: '/tech-tree', type: 'page', condition: 'visit', order: 4 },
      { id: 'n5', title: '跨朝代圆桌讨论', path: '/roundtable', type: 'page', condition: 'visit', order: 5 },
      { id: 'n6', title: '世界天象推算', path: '/sky-events', type: 'page', condition: 'visit', order: 6 },
    ],
    seal: { name: '全球视野家', icon: '🌐', obtainText: '完成中外文明对照全部节点' },
    briefing: {
      title: '线报：世界的中国，中国的 worlds',
      content: '当唐朝的诗人吟诵月亮时，欧洲的加洛林王朝正在摸索识字；当郑和的宝船驶向非洲时，哥伦布还在筹集航资。中外对照让你看见文明的时间差。',
      linkPath: '/knowledge',
      linkLabel: '探索更多知识',
    },
    featuredOrder: 8,
  },
];

/** 按难度分组 */
export function getRoutesByDifficulty(route: StudyRoute): string {
  const map: Record<number, string> = {
    1: '入门',
    2: '入门',
    3: '进阶',
    4: '进阶',
    5: '高阶',
  };
  return map[route.difficulty] || '进阶';
}

/** 获取推荐的前 N 条研学线 */
export function getFeaturedRoutes(count = 3): StudyRoute[] {
  return [...STUDY_ROUTES].sort((a, b) => a.featuredOrder - b.featuredOrder).slice(0, count);
}

/** 按朝代筛选 */
export function getRoutesByDynasty(dynasty: string): StudyRoute[] {
  return STUDY_ROUTES.filter((r) => r.dynasties.includes(dynasty) || r.dynasties.includes('多朝代'));
}
