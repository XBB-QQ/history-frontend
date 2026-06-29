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
