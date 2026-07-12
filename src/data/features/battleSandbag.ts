/**
 * 战役推演沙盘数据 — 简化版
 * @see history-museum/design/002-innovation-brainstorm.md §15
 */

export interface BattleTemplate {
  id: string;
  name: string;
  emoji: string;
  yearDisplay: string;
  dynasty: string;
  description: string;
  /** 地形类型 */
  terrain: 'river' | 'mountain' | 'plain' | 'city';
  /** 红方（用户方） */
  redForce: ForceInfo;
  /** 蓝方（敌方） */
  blueForce: ForceInfo;
  /** 可选战术 */
  tactics: TacticalOption[];
  /** 历史结果 */
  historicalResult: string;
  /** 历史教训 */
  lesson: string;
}

export interface ForceInfo {
  name: string;
  commander: string;
  /** 步兵数量（万） */
  infantry: number;
  /** 骑兵数量（万） */
  cavalry: number;
  /** 水军数量（万，仅水战） */
  navy: number;
  /** 士气 (0-100) */
  morale: number;
  /** 特殊能力描述 */
  special: string;
}

export interface TacticalOption {
  id: string;
  label: string;
  emoji: string;
  description: string;
  /** 对各兵种的加成系数 */
  modifiers: {
    infantry?: number;
    cavalry?: number;
    navy?: number;
    morale?: number;
  };
  /** 对敌方的削弱 */
  enemyModifiers: {
    infantry?: number;
    cavalry?: number;
    navy?: number;
    morale?: number;
  };
  /** 地形适配度 */
  terrainBonus: number;
  /** 风险描述 */
  risk: string;
}

export const BATTLE_LIST: BattleTemplate[] = [
  {
    id: 'chibi',
    name: '赤壁之战',
    emoji: '🔥',
    yearDisplay: '公元208年',
    dynasty: '三国',
    description: '孙刘联军在赤壁以火攻击败曹操南下大军，奠定三国鼎立格局。',
    terrain: 'river',
    redForce: {
      name: '孙刘联军',
      commander: '周瑜',
      infantry: 3,
      cavalry: 0.5,
      navy: 5,
      morale: 85,
      special: '水战精通 + 火攻专长',
    },
    blueForce: {
      name: '曹军',
      commander: '曹操',
      infantry: 15,
      cavalry: 3,
      navy: 2,
      morale: 50,
      special: '兵力优势但水土不服',
    },
    tactics: [
      { id: 'fire', label: '火攻连环', emoji: '🔥', description: '利用东南风火烧连环船，水战大杀器', modifiers: { navy: 2.5, morale: 20 }, enemyModifiers: { navy: -3, infantry: -0.5, morale: -30 }, terrainBonus: 2, risk: '需要东南风配合，若无风则自伤' },
      { id: 'ambush', label: '两岸伏击', emoji: '🏹', description: '在南岸设伏，趁曹军混乱时夹击', modifiers: { infantry: 1.5 }, enemyModifiers: { infantry: -0.3 }, terrainBonus: 1, risk: '伏击成功依赖火攻先行' },
      { id: 'direct', label: '正面硬刚', emoji: '⚔️', description: '直接水战对决，以少打多', modifiers: { navy: 1 }, enemyModifiers: {}, terrainBonus: 0.5, risk: '兵力劣势，正面交锋胜算极低' },
      { id: 'retreat', label: '诱敌深入', emoji: '🚢', description: '佯退引曹军追击，再反击', modifiers: { navy: 1.5, morale: 10 }, enemyModifiers: { morale: -10 }, terrainBonus: 1.5, risk: '若敌不追则浪费战机' },
    ],
    historicalResult: '周瑜选择火攻，黄盖诈降火烧连环船。曹军大败北归，损失超半数兵力。',
    lesson: '以少胜多的关键不是兵力而是地利和战术。火攻是水战的最优解，赤壁之战证明"天时+地利+战术"可以弥补兵力劣势。',
  },
  {
    id: 'feishui',
    name: '淝水之战',
    emoji: '🌊',
    yearDisplay: '公元383年',
    dynasty: '东晋',
    description: '东晋八万北府兵击败前秦八十万大军，"风声鹤唳"典故出处。',
    terrain: 'river',
    redForce: {
      name: '东晋北府兵',
      commander: '谢玄',
      infantry: 8,
      cavalry: 1,
      navy: 0,
      morale: 95,
      special: '精锐步兵，训练有素',
    },
    blueForce: {
      name: '前秦大军',
      commander: '苻坚',
      infantry: 60,
      cavalry: 20,
      navy: 0,
      morale: 40,
      special: '兵力十倍优势但军心不稳',
    },
    tactics: [
      { id: 'half-cross', label: '半渡而击', emoji: '🌊', description: '等敌军渡河一半时出击，分割敌军', modifiers: { infantry: 2, morale: 15 }, enemyModifiers: { infantry: -0.5, cavalry: -0.5, morale: -25 }, terrainBonus: 2, risk: '需要精确判断渡河时机' },
      { id: 'false-retreat', label: '诱敌后退', emoji: '🚩', description: '佯退诱苻坚追击，趁其渡河混乱反击', modifiers: { infantry: 1.5 }, enemyModifiers: { infantry: -0.3, morale: -20 }, terrainBonus: 1.5, risk: '若敌不追则丧失阵地' },
      { id: 'fortify', label: '据岸固守', emoji: '🛡️', description: '依托淝水天然防线坚守', modifiers: { infantry: 1.2, morale: 5 }, enemyModifiers: { morale: -5 }, terrainBonus: 1, risk: '长期防守消耗大，敌军优势持久' },
      { id: 'night-raid', label: '夜袭敌营', emoji: '🌙', description: '趁夜偷袭敌营制造混乱', modifiers: { infantry: 1.8, morale: 10 }, enemyModifiers: { morale: -30 }, terrainBonus: 0.5, risk: '夜袭若被发现则反遭围歼' },
    ],
    historicalResult: '谢玄选择半渡而击，苻坚下令后退让东晋渡河，结果前秦军大乱，"风声鹤唳"溃不成军。',
    lesson: '兵力优势不是胜利保证。淝水之战的核心是心理战——敌军军心不稳时，一个小小的混乱就能引发雪崩式溃败。',
  },
  {
    id: 'maling',
    name: '马陵之战',
    emoji: '🌲',
    yearDisplay: '公元前342年',
    dynasty: '战国',
    description: '孙膑减灶诱敌，在马陵道设伏大败庞涓。经典以弱胜强。',
    terrain: 'mountain',
    redForce: {
      name: '齐军',
      commander: '孙膑',
      infantry: 8,
      cavalry: 1,
      navy: 0,
      morale: 90,
      special: '谋略大师，擅长设伏和心理战',
    },
    blueForce: {
      name: '魏军',
      commander: '庞涓',
      infantry: 10,
      cavalry: 3,
      navy: 0,
      morale: 70,
      special: '精锐重步兵，但轻敌冒进',
    },
    tactics: [
      { id: 'reduce-camp', label: '减灶诱敌', emoji: '🔥', description: '逐日减少灶数诱敌追击，制造齐军逃亡假象', modifiers: { infantry: 1 }, enemyModifiers: { morale: -25, cavalry: -0.5 }, terrainBonus: 2, risk: '若敌不追则白费力气' },
      { id: 'tree-trap', label: '剥树写"庞涓死于此树之下"', emoji: '🌲', description: '在路旁剥树皮写挑衅文字，激怒庞涓夜间查看', modifiers: { infantry: 2, morale: 15 }, enemyModifiers: { morale: -30, infantry: -0.5 }, terrainBonus: 2.5, risk: '需要精确预判敌军到达时间' },
      { id: 'fortify', label: '据险固守', emoji: '🛡️', description: '利用马陵道地形坚守', modifiers: { infantry: 1.3 }, enemyModifiers: { cavalry: -1 }, terrainBonus: 1.5, risk: '正面交锋兵力劣势' },
      { id: 'flank', label: '侧翼迂回', emoji: '↩️', description: '绕到敌军侧翼突袭', modifiers: { cavalry: 2 }, enemyModifiers: { infantry: -0.3 }, terrainBonus: 0.5, risk: '山地迂回困难，可能暴露侧翼' },
    ],
    historicalResult: '孙膑减灶诱敌，庞涓怒追至马陵。孙膑剥树写"庞涓死于此树之下"，庞涓夜间点火查看，齐军万箭齐发，魏军大败，庞涓自杀。',
    lesson: '谋略胜于兵力。孙膑用心理战（减灶）+地利（马陵道设伏）+信息战（剥树文字），三重战术叠加创造完美歼灭战。',
  },
  {
    id: 'muye',
    name: '牧野之战',
    emoji: '⚔️',
    yearDisplay: '公元前1046年',
    dynasty: '商周',
    description: '周武王联军在牧野大破商军，阵前奴隶倒戈，商纣王自焚，商朝灭亡周朝建立。',
    terrain: 'plain',
    redForce: {
      name: '周联军',
      commander: '周武王',
      infantry: 5,
      cavalry: 0.3,
      navy: 0,
      morale: 95,
      special: '战车冲阵 + 联军同心',
    },
    blueForce: {
      name: '商军',
      commander: '帝辛',
      infantry: 17,
      cavalry: 0,
      navy: 0,
      morale: 30,
      special: '兵力优势但多为奴隶战俘，军心不稳',
    },
    tactics: [
      { id: 'chariot-charge', label: '战车冲阵', emoji: '🐎', description: '集中战车冲击商军中军，撕裂阵线', modifiers: { cavalry: 2.5, morale: 15 }, enemyModifiers: { infantry: -0.4, morale: -20 }, terrainBonus: 2, risk: '战车在平原威力最大，但若被包围则损失惨重' },
      { id: 'psyc-war', label: '阵前喊话', emoji: '📢', description: '战前向商军奴隶喊话，动摇其军心', modifiers: { morale: 10 }, enemyModifiers: { infantry: -0.3, morale: -35 }, terrainBonus: 1, risk: '喊话无效则浪费战机' },
      { id: 'flank', label: '两翼包抄', emoji: '↩️', description: '姜尚率左翼迂回包抄商军侧后', modifiers: { infantry: 1.5, cavalry: 1.5 }, enemyModifiers: { morale: -10 }, terrainBonus: 1.5, risk: '侧翼薄弱若被反扑则溃败' },
      { id: 'direct', label: '正面强攻', emoji: '⚔️', description: '联军正面强攻商军中军', modifiers: { infantry: 1.2 }, enemyModifiers: {}, terrainBonus: 0.5, risk: '兵力劣势，正面强攻伤亡巨大' },
    ],
    historicalResult: '周武王战前誓师（"牧誓"），姜尚率战车冲阵。商军奴隶阵前倒戈，帝辛逃回鹿台自焚，商亡周立。',
    lesson: '得道多助，失道寡助。商军兵力优势却被自家奴隶倒戈所灭，证明战争胜负取决于人心向背而非单纯兵力对比。',
  },
  {
    id: 'changping',
    name: '长平之战',
    emoji: '⛰️',
    yearDisplay: '公元前260年',
    dynasty: '战国',
    description: '秦将白起在长平围歼赵军四十万，战国最大规模歼灭战，赵国元气大伤。',
    terrain: 'mountain',
    redForce: {
      name: '秦军',
      commander: '白起',
      infantry: 50,
      cavalry: 5,
      navy: 0,
      morale: 85,
      special: '谋略大师，擅长诱敌与围歼',
    },
    blueForce: {
      name: '赵军',
      commander: '赵括',
      infantry: 45,
      cavalry: 3,
      navy: 0,
      morale: 60,
      special: '兵力相当但主将纸上谈兵，轻敌冒进',
    },
    tactics: [
      { id: 'lure-deep', label: '诱敌深入', emoji: '🪤', description: '佯败诱赵括追击，拉长其补给线', modifiers: { infantry: 1.2, morale: 5 }, enemyModifiers: { infantry: -0.2, morale: -15 }, terrainBonus: 2, risk: '诱敌需精确控制败退节奏，过度则真败' },
      { id: 'encircle', label: '分割包围', emoji: '🌀', description: '利用山地地形将赵军分割为多段，切断互相联系', modifiers: { infantry: 1.8, cavalry: 1.5 }, enemyModifiers: { infantry: -0.4, morale: -25 }, terrainBonus: 2.5, risk: '包围圈若被突破则前功尽弃' },
      { id: 'cut-supply', label: '断粮困敌', emoji: '🌾', description: '切断赵军粮道，困敌46天待其自乱', modifiers: { morale: 10 }, enemyModifiers: { infantry: -0.5, cavalry: -0.5, morale: -40 }, terrainBonus: 1.5, risk: '围困耗时长久，秦军自身补给压力大' },
      { id: 'direct', label: '正面强攻', emoji: '⚔️', description: '秦军正面强攻赵军营垒', modifiers: { infantry: 1 }, enemyModifiers: {}, terrainBonus: 0.5, risk: '赵军营垒坚固，强攻伤亡惨重' },
    ],
    historicalResult: '白起佯败诱赵括追击，随后分割包围切断粮道。赵军被困46天断粮，突围时赵括战死，40万赵军投降被坑杀。',
    lesson: '纸上谈兵必败。赵括替换廉颇后改防守为进攻，中了白起诱敌之计。长平之战证明：换将需谨慎，地形与补给才是山地战关键。',
  },
  {
    id: 'guandu',
    name: '官渡之战',
    emoji: '🌾',
    yearDisplay: '公元200年',
    dynasty: '三国',
    description: '曹操以两万兵力在官渡击败袁绍十万大军，火烧乌巢粮仓，奠定北方霸权。',
    terrain: 'plain',
    redForce: {
      name: '曹军',
      commander: '曹操',
      infantry: 2,
      cavalry: 0.5,
      navy: 0,
      morale: 90,
      special: '谋略出众，善用奇袭',
    },
    blueForce: {
      name: '袁军',
      commander: '袁绍',
      infantry: 10,
      cavalry: 1,
      navy: 0,
      morale: 55,
      special: '兵力五倍优势但内部不和，谋士相争',
    },
    tactics: [
      { id: 'fire-supply', label: '火烧乌巢', emoji: '🔥', description: '夜袭袁绍粮仓乌巢，烧毁全部军粮', modifiers: { infantry: 1.5, morale: 20 }, enemyModifiers: { infantry: -0.5, cavalry: -0.5, morale: -45 }, terrainBonus: 2.5, risk: '奇袭若被识破则反被包围' },
      { id: 'fortify', label: '据营固守', emoji: '🛡️', description: '依托官渡营垒坚守消耗敌军', modifiers: { infantry: 1.3, morale: 5 }, enemyModifiers: { morale: -10 }, terrainBonus: 1.5, risk: '粮草不足，长期坚守不可持续' },
      { id: 'sow-discord', label: '离间敌将', emoji: '🗡️', description: '利用袁绍内部矛盾，诱使其谋士相争', modifiers: { morale: 5 }, enemyModifiers: { infantry: -0.2, morale: -20 }, terrainBonus: 1, risk: '离间需要时间，效果不确定' },
      { id: 'flank', label: '侧翼奇袭', emoji: '↩️', description: '趁袁军主力前出，奇袭其侧翼', modifiers: { cavalry: 2 }, enemyModifiers: { infantry: -0.3 }, terrainBonus: 1, risk: '骑兵不足，奇袭规模有限' },
    ],
    historicalResult: '曹操夜袭乌巢，烧毁袁军全部粮草。袁军军心溃散，张郃高览投降，袁绍仅带八百骑北逃，曹操统一北方。',
    lesson: '兵马未动粮草先行。官渡之战的核心是断粮——曹操以两万兵力胜十万，关键在于精准打击敌方粮草这一命脉。',
  },
  {
    id: 'poyanghu',
    name: '鄱阳湖之战',
    emoji: '🚢',
    yearDisplay: '公元1363年',
    dynasty: '元末',
    description: '朱元璋二十万水军击败陈友谅六十万大军，中世纪规模最大的水战，奠定明朝基业。',
    terrain: 'river',
    redForce: {
      name: '朱元璋军',
      commander: '朱元璋',
      infantry: 5,
      cavalry: 0,
      navy: 15,
      morale: 92,
      special: '小船灵活 + 火攻专长',
    },
    blueForce: {
      name: '陈友谅军',
      commander: '陈友谅',
      infantry: 15,
      cavalry: 0,
      navy: 45,
      morale: 50,
      special: '巨舰三层楼船，体型优势但笨重',
    },
    tactics: [
      { id: 'fire-ships', label: '火船冲阵', emoji: '🔥', description: '以装满火药柴草的小船冲撞敌连环巨舰', modifiers: { navy: 2.5, morale: 20 }, enemyModifiers: { navy: -3, infantry: -0.5, morale: -35 }, terrainBonus: 2.5, risk: '需要风向配合，火船易被规避' },
      { id: 'divide', label: '分兵骚扰', emoji: '🔀', description: '以小船群分多路骚扰敌巨舰，疲惫敌军', modifiers: { navy: 1.5, morale: 5 }, enemyModifiers: { morale: -15, navy: -0.5 }, terrainBonus: 1.5, risk: '分兵过散易被各个击破' },
      { id: 'lure-shoal', label: '诱入浅滩', emoji: '🏖️', description: '诱敌巨舰进入浅滩搁浅，使其丧失机动', modifiers: { navy: 1.8 }, enemyModifiers: { navy: -2, infantry: -0.3 }, terrainBonus: 2, risk: '需熟悉湖中地形，诱敌不准则无效' },
      { id: 'direct', label: '正面水战', emoji: '⚓', description: '以小船正面硬刚巨舰', modifiers: { navy: 0.8 }, enemyModifiers: {}, terrainBonus: 0.3, risk: '船小处于劣势，正面硬刚必败' },
    ],
    historicalResult: '朱元璋采用火攻，以火船冲撞陈友谅连环巨舰。陈友谅从船窗探头指挥时中箭身亡，汉军溃败，陈汉政权灭亡。',
    lesson: '灵活胜于庞大。朱元璋小船胜巨舰，证明水战中机动性优于体量。陈友谅巨舰虽大却笨重，被火攻与游击战术击败。',
  },
];

/** 战斗结算 */
export interface BattleResult {
  redScore: number;
  blueScore: number;
  outcome: 'victory' | 'defeat' | 'draw';
  narrative: string;
}

export function calculateBattle(tactic: TacticalOption, battle: BattleTemplate): BattleResult {
  const r = battle.redForce;
  const b = battle.blueForce;

  // 计算红方战斗力
  const redBase = r.infantry * 1 + r.cavalry * 2 + r.navy * 1.5;
  const redModInf = redBase * (tactic.modifiers.infantry ?? 1);
  const redModCav = r.cavalry * 2 * (tactic.modifiers.cavalry ?? 1);
  const redModNavy = r.navy * 1.5 * (tactic.modifiers.navy ?? 1);
  const redMorale = (r.morale + (tactic.modifiers.morale ?? 0)) / 100;
  const terrainFactor = tactic.terrainBonus;
  const redScore = (redModInf + redModCav + redModNavy) * redMorale * terrainFactor;

  // 计算蓝方战斗力
  const blueBase = b.infantry * 1 + b.cavalry * 2 + b.navy * 1.5;
  const blueModInf = blueBase * (tactic.enemyModifiers.infantry ?? 1);
  const blueModCav = b.cavalry * 2 * (tactic.enemyModifiers.cavalry ?? 1);
  const blueModNavy = b.navy * 1.5 * (tactic.enemyModifiers.navy ?? 1);
  const blueMorale = (b.morale + (tactic.enemyModifiers.morale ?? 0)) / 100;
  const blueScore = (blueModInf + blueModCav + blueModNavy) * blueMorale;

  // 判断胜负
  if (redScore > blueScore * 1.5) return { redScore, blueScore, outcome: 'victory', narrative: `${r.name}大获全胜！${tactic.label}战术完美执行，敌军溃败。` };
  if (redScore > blueScore) return { redScore, blueScore, outcome: 'victory', narrative: `${r.name}取胜，但代价不小。${tactic.label}战术有效但敌军顽强抵抗。` };
  if (redScore > blueScore * 0.7) return { redScore, blueScore, outcome: 'draw', narrative: `双方势均力敌，战局僵持。${tactic.label}效果有限。` };
  return { redScore, blueScore, outcome: 'defeat', narrative: `${r.name}败北！${tactic.label}未能弥补兵力劣势，${b.name}获胜。` };
}
