/**
 * 学习路径系统 — 系统化历史课程
 */

export interface LearningPath {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  totalDays: number;
  description: string;
  /** 每日课程安排 */
  days: PathDay[];
}

export interface PathDay {
  day: number;
  title: string;
  /** 关联事件 uid */
  events: string[];
  /** 关联人物 uid */
  persons: string[];
  /** 关联朝代 */
  dynasties: string[];
  /** 学习要点 */
  keyPoints: string[];
  /** 思考题 */
  question: string;
}

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'three-kingdoms',
    title: '三国十日谈',
    subtitle: '十天读懂三国乱世',
    icon: '⚔️',
    difficulty: 'beginner',
    totalDays: 10,
    description: '从东汉末年到三国归晋，十天穿越最精彩的历史时期。',
    days: [
      { day: 1, title: '乱世序幕：东汉末年', events: ['han-fall'], persons: [], dynasties: ['han'], keyPoints: ['宦官专权', '黄巾起义', '董卓进京'], question: '东汉衰落的根本原因是什么？' },
      { day: 2, title: '群雄并起：诸侯割据', events: ['chibi-battle'], persons: [], dynasties: ['threeKingdoms'], keyPoints: ['曹操崛起', '袁绍败亡', '官渡之战'], question: '曹操为什么能从群雄中脱颖而出？' },
      { day: 3, title: '赤壁风云：三分天下', events: ['chibi-battle'], persons: [], dynasties: ['threeKingdoms'], keyPoints: ['孙刘联盟', '火攻之策', '三国格局'], question: '如果曹操赢了赤壁之战，历史会怎样？' },
      { day: 4, title: '蜀汉立国：刘备入川', events: [], persons: [], dynasties: ['threeKingdoms'], keyPoints: ['三顾茅庐', '隆中对', '入主益州'], question: '诸葛亮的隆中对为什么最终失败了？' },
      { day: 5, title: '吴国根基：江东霸业', events: [], persons: [], dynasties: ['threeKingdoms'], keyPoints: ['孙策创业', '孙权守成', '水军优势'], question: '吴国为什么能坚持最久？' },
      { day: 6, title: '北伐之路：诸葛亮六出祁山', events: [], persons: [], dynasties: ['threeKingdoms'], keyPoints: ['出师表', '街亭之败', '木牛流马'], question: '诸葛亮北伐为何屡败屡战？' },
      { day: 7, title: '司马夺权：曹魏变晋', events: [], persons: [], dynasties: ['threeKingdoms'], keyPoints: ['高平陵之变', '司马昭之心', '禅让'], question: '司马懿为什么能最终夺取天下？' },
      { day: 8, title: '蜀汉灭亡：大势已去', events: [], persons: [], dynasties: ['threeKingdoms'], keyPoints: ['姜维无力', '邓艾偷渡阴平', '刘禅降魏'], question: '蜀汉灭亡是因为内部还是外部原因？' },
      { day: 9, title: '三国归晋：天下一统', events: [], persons: [], dynasties: ['threeKingdoms'], keyPoints: ['晋灭吴', '天下一统', '新秩序'], question: '晋统一后的中国为什么很快就再次分裂？' },
      { day: 10, title: '三国遗产：对后世的影响', events: [], persons: [], dynasties: ['threeKingdoms'], keyPoints: ['军事遗产', '文化影响', '忠义精神'], question: '三国故事为什么能千年流传？' },
    ],
  },
  {
    id: 'tang-splendor',
    title: '大唐七日行',
    subtitle: '七天穿越盛唐',
    icon: '🌸',
    difficulty: 'intermediate',
    totalDays: 7,
    description: '从开国到衰落，七天领略大唐三百年的辉煌与隐忧。',
    days: [
      { day: 1, title: '开国之路：李唐崛起', events: [], persons: [], dynasties: ['tang'], keyPoints: ['李渊起兵', '玄武门之变', '唐朝建立'], question: '玄武门之变对唐朝政治文化有什么深远影响？' },
      { day: 2, title: '贞观之治：盛世之基', events: [], persons: [], dynasties: ['tang'], keyPoints: ['纳谏如流', '均田制', '科举完善'], question: '唐太宗为什么被称为千古一帝？' },
      { day: 3, title: '武则天：女皇传奇', events: [], persons: [], dynasties: ['tang'], keyPoints: ['从皇后到皇帝', '政绩与争议', '武周政权'], question: '武则天的统治是进步还是倒退？' },
      { day: 4, title: '开元盛世：巅峰时刻', events: [], persons: [], dynasties: ['tang'], keyPoints: ['经济繁荣', '文化灿烂', '万国来朝'], question: '开元盛世为什么是中国古代文明的最高峰？' },
      { day: 5, title: '安史之乱：盛极而衰', events: ['an-shi-rebellion'], persons: [], dynasties: ['tang'], keyPoints: ['安禄山起兵', '马嵬坡之变', '藩镇割据'], question: '唐朝衰落是安史之乱直接导致还是深层制度问题？' },
      { day: 6, title: '晚唐困局：风雨飘摇', events: [], persons: [], dynasties: ['tang'], keyPoints: ['宦官专权', '黄巢起义', '朋党之争'], question: '晚唐为什么始终无法恢复元气？' },
      { day: 7, title: '唐朝遗产：千年回响', events: [], persons: [], dynasties: ['tang'], keyPoints: ['唐诗永恒', '制度遗产', '文化影响'], question: '唐朝为什么是"中国人"身份认同的核心？' },
    ],
  },
  {
    id: 'song-civilization',
    title: '宋史五讲',
    subtitle: '五讲读懂宋朝文明',
    icon: '📜',
    difficulty: 'advanced',
    totalDays: 5,
    description: '宋朝是中国古代文明巅峰——经济、科技、文化全面超越前代。',
    days: [
      { day: 1, title: '建国与巩固：杯酒释兵权', events: [], persons: [], dynasties: ['song'], keyPoints: ['陈桥兵变', '杯酒释兵权', '文治导向'], question: '宋朝为什么选择文治而非武功？' },
      { day: 2, title: '经济革命：商业帝国', events: [], persons: [], dynasties: ['song'], keyPoints: ['交子纸币', '市井繁华', '海外贸易'], question: '宋朝经济为什么能做到古代世界第一？' },
      { day: 3, title: '科技巅峰：四大发明', events: [], persons: [], dynasties: ['song'], keyPoints: ['活字印刷', '指南针', '火药应用', '沈括科学'], question: '宋朝科技为什么领先世界却没能转化为持续优势？' },
      { day: 4, title: '文化繁荣：诗词书画', events: [], persons: [], dynasties: ['song'], keyPoints: ['宋词巅峰', '理学兴起', '书画成就'], question: '宋朝文化的"精致化"是进步还是衰退信号？' },
      { day: 5, title: '靖康之变与南宋', events: ['jingkang-incident'], persons: [], dynasties: ['song'], keyPoints: ['靖康之耻', '南渡偏安', '岳飞冤案'], question: '宋朝"文治"传统是否导致了军事上的软弱？' },
    ],
  },
];

export const DIFFICULTY_STYLE = {
  beginner: { label: '入门', color: 'bg-green-100 text-green-700' },
  intermediate: { label: '进阶', color: 'bg-yellow-100 text-yellow-700' },
  advanced: { label: '深入', color: 'bg-red-100 text-red-700' },
};
