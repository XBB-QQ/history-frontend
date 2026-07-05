/**
 * 历史信物鉴定小游戏 — 数据
 * @see ITERATIONS.md #100
 */

export interface ArtifactQuestion {
  id: string;
  name: string;
  dynasty: string;
  era: string;
  emoji: string;
  image: string;
  description: string;
  material: string;
  function: string;
  difficulty: 'easy' | 'medium' | 'hard';
  options: ArtifactOption[];
  correctAnswer: string;
  explanation: string;
  points: number;
}

export interface ArtifactOption {
  id: string;
  label: string;
  dynasty: string;
  description: string;
}

export interface QuizScore {
  total: number;
  correct: number;
  wrong: number;
  accuracy: number;
  grade: string;
}

export const ARTIFACT_QUESTIONS: ArtifactQuestion[] = [
  {
    id: 'q1',
    name: '何物？',
    dynasty: '商代',
    era: '公元前1600-前1046年',
    emoji: '🏺',
    image: '🏺',
    description: '这件器物造型庄重，纹饰精美，是古代祭祀的重要礼器。',
    material: '青铜',
    function: '盛酒器',
    difficulty: 'easy',
    options: [
      { id: 'a1', label: '鼎', dynasty: '商', description: '烹煮肉食的炊器，象征权力' },
      { id: 'a2', label: '爵', dynasty: '商', description: '饮酒器，三足两柱' },
      { id: 'a3', label: '尊', dynasty: '商', description: '盛酒器，造型庄严' },
      { id: 'a4', label: '壶', dynasty: '周', description: '盛水器或酒器，长颈鼓腹' },
    ],
    correctAnswer: 'a3',
    explanation: '尊是商周时期重要的盛酒礼器，多用于祭祀场合。造型庄严，常有饕餮纹、夔龙纹等精美纹饰。',
    points: 10,
  },
  {
    id: 'q2',
    name: '何物？',
    dynasty: '汉代',
    era: '公元前202-公元220年',
    emoji: '🐴',
    image: '🐴',
    description: '这匹马昂首嘶鸣，肌肉线条流畅，是汉代军事力量的象征。',
    material: '青铜',
    function: '装饰摆件',
    difficulty: 'medium',
    options: [
      { id: 'b1', label: '铜奔马（马踏飞燕）', dynasty: '东汉', description: '一脚踏飞鸟，平衡精妙' },
      { id: 'b2', label: '铜牛', dynasty: '西汉', description: '造型敦厚，用于祭祀' },
      { id: 'b3', label: '陶马', dynasty: '秦', description: '兵马俑中的战马' },
      { id: 'b4', label: '金兽', dynasty: '战国', description: '楚国铸金兽，重达9000多克' },
    ],
    correctAnswer: 'b1',
    explanation: '铜奔马（又名马踏飞燕）是东汉时期的青铜杰作，马身重心把握精准，一脚踏在飞鸟之上，展现了汉代工匠的高超技艺。',
    points: 15,
  },
  {
    id: 'q3',
    name: '何物？',
    dynasty: '唐代',
    era: '公元618-907年',
    emoji: '🐫',
    image: '🐫',
    description: '这件陶俑色彩绚丽，人物形象生动，反映了唐代开放包容的文化氛围。',
    material: '陶',
    function: '陪葬明器',
    difficulty: 'easy',
    options: [
      { id: 'c1', label: '唐三彩', dynasty: '唐', description: '黄绿白三色釉陶器' },
      { id: 'c2', label: '青花瓷', dynasty: '元', description: '白底蓝花瓷器' },
      { id: 'c3', label: '越窑青瓷', dynasty: '唐', description: '南青北白中的青瓷代表' },
      { id: 'c4', label: '紫砂壶', dynasty: '明', description: '宜兴特产陶器' },
    ],
    correctAnswer: 'c1',
    explanation: '唐三彩是唐代低温铅釉陶器的代表，以黄、绿、白三色为主，人物俑、动物俑造型生动，是唐代文化的瑰宝。',
    points: 10,
  },
  {
    id: 'q4',
    name: '何物？',
    dynasty: '宋代',
    era: '公元960-1279年',
    emoji: '💎',
    image: '💎',
    description: '这件瓷器釉色温润如玉，造型简约典雅，代表了宋代美学的最高境界。',
    material: '瓷器',
    function: '茶具/陈设',
    difficulty: 'hard',
    options: [
      { id: 'd1', label: '汝窑天青釉碗', dynasty: '北宋', description: '雨过天青云破处' },
      { id: 'd2', label: '官窑粉青瓶', dynasty: '南宋', description: '紫口铁足，金丝铁线' },
      { id: 'd3', label: '龙泉青瓷梅子青', dynasty: '南宋', description: '梅子青色，温润如玉' },
      { id: 'd4', label: '建盏兔毫', dynasty: '南宋', description: '福建建阳产，黑釉白毫' },
    ],
    correctAnswer: 'd1',
    explanation: '汝窑是宋代五大名窑之首，以天青色最为珍贵。"雨过天青云破处"是宋徽宗的御批，代表了宋代极简而高雅的美学追求。',
    points: 20,
  },
  {
    id: 'q5',
    name: '何物？',
    dynasty: '明代',
    era: '公元1368-1644年',
    emoji: '📜',
    image: '📜',
    description: '这件玉器雕琢精细，纹饰吉祥，是明代宫廷玉器中的精品。',
    material: '和田玉',
    function: '佩饰/陈设',
    difficulty: 'medium',
    options: [
      { id: 'e1', label: '翡翠白菜', dynasty: '清', description: '台北故宫三宝之一' },
      { id: 'e2', label: '渎山大玉海', dynasty: '元', description: '中国现存最早的大型玉器' },
      { id: 'e3', label: '青玉螭龙纹璧', dynasty: '明', description: '圆形中有方孔，螭龙缠绕' },
      { id: 'e4', label: '白玉如意', dynasty: '明', description: '吉祥如意的象征' },
    ],
    correctAnswer: 'e3',
    explanation: '明代玉器继承了宋元的传统，螭龙纹是明代玉器最常见的纹饰之一。青玉璧造型古朴，螭龙纹雕工精细，体现了明代玉雕的高超水平。',
    points: 15,
  },
  {
    id: 'q6',
    name: '何物？',
    dynasty: '清代',
    era: '公元1644-1912年',
    emoji: '🥬',
    image: '🥬',
    description: '这件翠玉雕刻成一棵大白菜，菜叶上还停着两只昆虫，栩栩如生。',
    material: '翠玉',
    function: '宫廷陈设',
    difficulty: 'easy',
    options: [
      { id: 'f1', label: '翡翠白菜', dynasty: '清', description: '台北故宫三宝之一，菜上有螽斯和蝗虫' },
      { id: 'f2', label: '玉鱼', dynasty: '明', description: '连年有余的寓意' },
      { id: 'f3', label: '金蟾', dynasty: '清', description: '招财进宝的象征' },
      { id: 'f4', label: '珊瑚树', dynasty: '清', description: '南海红珊瑚雕刻' },
    ],
    correctAnswer: 'f1',
    explanation: '翡翠白菜是台北故宫博物院的镇馆之宝之一，以翠玉天然色泽雕刻而成，菜叶上的螽斯和蝗虫象征多子多孙，是清代宫廷玉器精品。',
    points: 10,
  },
  {
    id: 'q7',
    name: '何物？',
    dynasty: '秦代',
    era: '公元前221-前207年',
    emoji: '⚔️',
    image: '⚔️',
    description: '这把剑埋藏地下两千多年，出土时依然锋利无比，堪称奇迹。',
    material: '青铜',
    function: '兵器',
    difficulty: 'hard',
    options: [
      { id: 'g1', label: '越王勾践剑', dynasty: '春秋', description: '菱形暗纹，鸟篆铭文' },
      { id: 'g2', label: '秦青铜剑', dynasty: '秦', description: '铬盐氧化处理，千年不锈' },
      { id: 'g3', label: '汉环首刀', dynasty: '汉', description: '直刃单环首，骑兵利器' },
      { id: 'g4', label: '唐陌刀', dynasty: '唐', description: '双刃长刀，步兵利器' },
    ],
    correctAnswer: 'g2',
    explanation: '秦始皇陵出土的青铜剑采用了先进的铬盐氧化处理技术，使剑身千年不锈。这一发现改写了世界冶金史，证明中国在秦代就掌握了先进的防锈技术。',
    points: 20,
  },
  {
    id: 'q8',
    name: '何物？',
    dynasty: '新石器时代',
    era: '约公元前5000-前2000年',
    emoji: '🫙',
    image: '🫙',
    description: '这个陶盆内壁绘有人面图案，口沿有对称的双耳，是新石器时代的代表作。',
    material: '陶',
    function: '盛水器/礼器',
    difficulty: 'medium',
    options: [
      { id: 'h1', label: '人面鱼纹盆', dynasty: '仰韶', description: '半坡遗址出土，神秘的人面鱼纹' },
      { id: 'h2', label: '彩陶壶', dynasty: '马家窑', description: '漩涡纹、蛙纹装饰' },
      { id: 'h3', label: '黑陶杯', dynasty: '龙山', description: '蛋壳黑陶，薄如蛋壳' },
      { id: 'h4', label: '红陶罐', dynasty: '河姆渡', description: '浙江余姚出土，夹砂红陶' },
    ],
    correctAnswer: 'h1',
    explanation: '人面鱼纹盆是西安半坡遗址出土的仰韶文化精品，盆内绘有人面衔鱼的图案，可能是部落图腾或巫术仪式用具，距今约6000年。',
    points: 15,
  },
];

/** 等级评定 */
export function getGrade(score: QuizScore): string {
  if (score.accuracy >= 90) return '🏆 鉴定大师';
  if (score.accuracy >= 70) return '🥇 资深藏家';
  if (score.accuracy >= 50) return '🥈 入门新手';
  return '🥉 历史小白';
}
