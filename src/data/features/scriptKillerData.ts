// 历史剧本杀数据
export interface Character {
  id: string;
  name: string;
  displayName: string;
  dynasty: string;
  era: string;
  eraId: string;
  role: string;
  avatar: string;
  portrait: string;
  background: string;
  keyEvents: string[];
  alibi: string;
  motivations: string[];
  relationship: Relationship[];
  secrets: string[];
  skills: string[];
  clues: string[];
  testimony: string;
  suspicionLevel: number;
}

export interface Relationship {
  characterId: string;
  characterName: string;
  type: 'friend' | 'enemy' | 'rival' | 'lovers' | 'family' | 'colleague';
  description: string;
}

export interface MysteryEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  victim: string;
  killer?: string;
  witnesses: string[];
  keyClues: string[];
  timeLine: TimelineEvent[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface TimelineEvent {
  time: string;
  description: string;
  location: string;
  characterId?: string;
  isPlayer?: boolean;
  isAlibi?: boolean;
}

export interface Clue {
  id: string;
  location: string;
  characterId: string;
  characterName: string;
  type: 'document' | 'artifact' | 'testimony' | 'physical' | 'digital';
  description: string;
  content: string;
  importance: number;
  evidence?: boolean;
}

export interface Script {
  id: string;
  title: string;
  era: string;
  eraId: string;
  difficulty: 'easy' | 'medium' | 'hard';
  playerCount: number;
  duration: number;
  description: string;
  characters: Character[];
  mysteryEvent: MysteryEvent;
  clues: Clue[];
  solution: string;
  setup: string;
}

// 角色数据
export const CHARACTER_DATABASE: Character[] = [
  {
    id: 'wei-wang-xian-jia',
    name: '卫王献嘉',
    displayName: '卫王献嘉',
    dynasty: '商代',
    era: '商代晚期',
    eraId: 'shang',
    role: '商王',
    avatar: '👑',
    portrait: '🏯',
    background: '商王武丁之子，继位后励精图治，但暗中与外族勾结，企图推翻父王的统治。性格阴沉多疑，喜怒无常。',
    keyEvents: ['迁都大邑商', '推行新政', '暗中联络西夷', '被神庙长老指控'],
    alibi: '被神庙长老证实当晚在祭祀仪式上负责主持，有大量证人证明其不在场',
    motivations: ['巩固自己的统治地位', '摆脱父亲的阴影', '获得更多的权力和财富', '报复父亲的严厉管教'],
    relationship: [
      {
        characterId: 'pan-geng-wo',
        characterName: '盘庚',
        type: 'family',
        description: '严厉的父亲，对他要求极高'
      },
      {
        characterId: 'zhou-yu',
        characterName: '周瑜',
        type: 'enemy',
        description: '主张改革的保守派长老'
      }
    ],
    secrets: ['暗中使用巫术诅咒父亲', '与西夷首领有私下的通信', '暗中收受贿赂', '暗中杀害反对改革的贵族'],
    skills: ['政治手腕强', '善于谋略', '精通巫术', '控制力强'],
    clues: ['西夷使者的信件', '用于诅咒的巫术器具', '贿赂的黄金', '反对派贵族的死亡报告'],
    testimony: '我那天晚上确实在神庙主持祭祀仪式，这是我和神庙长老共同见证的。我没有谋杀任何人，你们可以查证。',
    suspicionLevel: 3
  },
  {
    id: 'pan-geng-wo',
    name: '盘庚',
    displayName: '盘庚',
    dynasty: '商代',
    era: '商代晚期',
    eraId: 'shang',
    role: '太师',
    avatar: '🧙',
    portrait: '📜',
    background: '商朝太师，王族长老，坚定的改革派。主持迁都大邑商，推行新政，反对王子的腐败行为。为人正直，不畏权贵。',
    keyEvents: ['主持迁都', '推行新政', '抵制王子的腐败', '发现王子阴谋'],
    alibi: '当晚在王宫书房整理文件，有侍从和文官可以作证',
    motivations: ['维护商朝的稳定', '清除腐败', '为商朝的长远发展着想', '维护传统的道德秩序'],
    relationship: [
      {
        characterId: 'wei-wang-xian-jia',
        characterName: '卫王献嘉',
        type: 'family',
        description: '严厉地管教他'
      },
      {
        characterId: 'ta-kao',
        characterName: '太考',
        type: 'friend',
        description: '共同改革的伙伴'
      }
    ],
    secrets: ['暗中调查王子的腐败行为', '准备揭露王子的阴谋', '私下收集王子与外族勾结的证据', '曾被王子威胁'],
    skills: ['政治洞察力强', '善于组织协调', '治理能力卓越', '威望高'],
    clues: ['王子的贿赂记录', '王子与西夷的通信', '反对派贵族的死亡报告', '用于诅咒的巫术器具'],
    testimony: '我那天晚上在书房整理文件，这是大家都知道的。我经常工作到深夜，我的下属都可以作证。我没有时间也没有动机去杀害任何人。',
    suspicionLevel: 1
  },
  {
    id: 'zhou-yu',
    name: '周瑜',
    displayName: '周瑜',
    dynasty: '商代',
    era: '商代晚期',
    eraId: 'shang',
    role: '神庙长老',
    avatar: '🧙‍♂️',
    portrait: '🏛️',
    background: '商朝神庙长老，负责主持祭祀仪式和占卜。性格保守，支持传统的保守派。对王子的改革政策持批评态度。',
    keyEvents: ['主持祭祀仪式', '指控王子诅咒商王', '发现王子的阴谋', '提供保护帮助'],
    alibi: '当晚在神庙主持祭祀仪式，这是他一贯的工作，有大量神庙祭司可以作证',
    motivations: ['维护神庙的权威', '维护传统的价值观', '保护商朝的稳定', '保护自己的人身安全'],
    relationship: [
      {
        characterId: 'wei-wang-xian-jia',
        characterName: '卫王献嘉',
        type: 'enemy',
        description: '多次发生冲突'
      },
      {
        characterId: 'ta-kao',
        characterName: '太考',
        type: 'colleague',
        description: '经常共同讨论国家大事'
      }
    ],
    secrets: ['知道王子的真实想法', '暗中调查王子的行为', '准备在关键时刻揭露王子', '曾私下警告过太子'],
    skills: ['占卜能力卓越', '善于组织仪式', '政治影响力大', '深受神庙信徒尊敬'],
    clues: ['用于诅咒的巫术器具', '王子的贿赂记录', '西夷使者的信件', '神庙的占卜结果'],
    testimony: '那天晚上我确实在神庙主持祭祀仪式。王子也来到神庙，我们一起完成了仪式。我亲眼看到他一直待到仪式结束。我是为了保护商朝，才不得不指控他。',
    suspicionLevel: 2
  },
  {
    id: 'ta-kao',
    name: '太考',
    displayName: '太考',
    dynasty: '商代',
    era: '商代晚期',
    eraId: 'shang',
    role: '大将军',
    avatar: '⚔️',
    portrait: '🗡️',
    background: '商朝大将军，盘庚的好友，支持改革派。军事才能卓越，性格直爽，不畏权贵，是保护盘庚的重要力量。',
    keyEvents: ['平定外族叛乱', '支持盘庚改革', '保护盘庚的安全', '调查王子的阴谋'],
    alibi: '当晚在军营训练士兵，有大量士兵可以作证',
    motivations: ['支持盘庚的改革', '维护商朝的军事力量', '保护好朋友', '惩罚腐败'],
    relationship: [
      {
        characterId: 'pan-geng-wo',
        characterName: '盘庚',
        type: 'friend',
        description: '亲密的伙伴'
      },
      {
        characterId: 'zhou-yu',
        characterName: '周瑜',
        type: 'colleague',
        description: '经常共同讨论'
      },
      {
        characterId: 'wei-wang-xian-jia',
        characterName: '卫王献嘉',
        type: 'rival',
        description: '多次发生冲突'
      }
    ],
    secrets: ['知道王子的真实意图', '暗中监视王子', '准备在必要时采取行动', '曾承诺保护盘庚'],
    skills: ['军事才能卓越', '领导能力强', '战斗经验丰富', '忠诚可靠'],
    clues: ['用于诅咒的巫术器具', '王子的贿赂记录', '西夷使者的信件', '反对派贵族的死亡报告'],
    testimony: '那天晚上我在军营训练士兵，这是我的日常工作。我和士兵们一起训练到很晚，有大量士兵可以作证。我没有时间去谋杀任何人，我更关心军队的训练和商朝的稳定。',
    suspicionLevel: 1
  },
  {
    id: 'shi-yu',
    name: '师尹',
    displayName: '师尹',
    dynasty: '商代',
    era: '商代晚期',
    eraId: 'shang',
    role: '太师',
    avatar: '📜',
    portrait: '📚',
    background: '商朝太师，负责宫廷礼仪和文职工作。性格温和，善于调解，经常在王子和长老之间进行调解。',
    keyEvents: ['调解王子和长老之间的矛盾', '整理历史文献', '处理宫廷事务', '被发现死亡'],
    alibi: '当晚在王宫整理历史文献，有文官可以作证',
    motivations: ['维护宫廷的秩序', '保护国家', '调解矛盾', '维持和平'],
    relationship: [
      {
        characterId: 'wei-wang-xian-jia',
        characterName: '卫王献嘉',
        type: 'colleague',
        description: '工作伙伴'
      },
      {
        characterId: 'zhou-yu',
        characterName: '周瑜',
        type: 'colleague',
        description: '经常讨论'
      },
      {
        characterId: 'ta-kao',
        characterName: '太考',
        type: 'friend',
        description: '经常共同讨论'
      }
    ],
    secrets: ['知道王子的秘密', '记录了所有宫廷的机密文件', '发现王子的贿赂记录', '被王子威胁要灭口'],
    skills: ['善于调解', '记忆力好', '整理文档能力强', '善于保守秘密'],
    clues: ['用于诅咒的巫术器具', '王子的贿赂记录', '西夷使者的信件', '反对派贵族的死亡报告', '师尹的死亡报告'],
    testimony: '我那天晚上在王宫整理历史文献，这是我的日常工作。我知道很多宫廷的秘密，我也知道王子的秘密。但是我没有时间去谋杀任何人。',
    suspicionLevel: 2
  },
  {
    id: 'shi-ren',
    name: '师任',
    displayName: '师任',
    dynasty: '商代',
    era: '商代晚期',
    eraId: 'shang',
    role: '宫廷侍卫',
    avatar: '🗡️',
    portrait: '🛡️',
    background: '商朝宫廷侍卫，负责保护王子的安全。忠诚可靠，工作认真，对王子有深厚的感情。性格刚直，不畏权贵。',
    keyEvents: ['保护王子', '调查师尹的死亡', '发现王子的阴谋', '提供保护'],
    alibi: '当晚在王宫巡逻，有其他侍卫可以作证',
    motivations: ['保护王子', '忠于职守', '维护商朝的稳定', '报答王子的信任'],
    relationship: [
      {
        characterId: 'wei-wang-xian-jia',
        characterName: '卫王献嘉',
        type: 'colleague',
        description: '忠诚地保护他'
      },
      {
        characterId: 'pan-geng-wo',
        characterName: '盘庚',
        type: 'friend',
        description: '工作伙伴'
      }
    ],
    secrets: ['知道师尹的死亡真相', '发现王子的真正动机', '暗中调查师尹的死亡', '被王子威胁要灭口'],
    skills: ['剑术高超', '忠诚可靠', '观察力敏锐', '善于隐藏'],
    clues: ['用于诅咒的巫术器具', '王子的贿赂记录', '西夷使者的信件', '反对派贵族的死亡报告', '师尹的死亡报告'],
    testimony: '我那天晚上在王宫巡逻，这是我工作的常规。我确保了王宫的安全，没有人可以随意进入。我没有时间去谋杀任何人。',
    suspicionLevel: 1
  }
];

// 神秘事件数据
export const MYSTERY_EVENTS: MysteryEvent[] = [
  {
    id: 'shang-mu-ming-tu',
    title: '商王神秘之死',
    date: '商代晚期·甲子日',
    location: '王宫·神庙广场',
    description: '商王在神庙广场参加祭祀仪式后突然倒地身亡。现场发现了用于巫术的器具和贿赂的黄金，同时师尹也在这天晚上被发现死亡。现场没有明显的凶手痕迹，只有一片混乱。',
    victim: '商王武丁',
    killer: '',
    witnesses: ['卫王献嘉', '盘庚', '周瑜', '太考', '师尹', '师任'],
    keyClues: [
      '用于诅咒的巫术器具',
      '西夷使者的信件',
      '王子的贿赂记录',
      '反对派贵族的死亡报告',
      '师尹的死亡报告',
      '神庙的占卜结果'
    ],
    timeLine: [
      { time: '19:00', description: '神庙举行祭祀仪式', location: '神庙广场', characterId: 'wei-wang-xian-jia', isPlayer: true, isAlibi: true },
      { time: '20:00', description: '仪式结束，商王在广场休息', location: '神庙广场', characterId: 'wei-wang-xian-jia', isPlayer: true, isAlibi: true },
      { time: '20:30', description: '师尹在书房被发现死亡', location: '王宫书房', characterId: 'shi-yu', isAlibi: true },
      { time: '21:00', description: '卫王回到王宫', location: '王宫', characterId: 'wei-wang-xian-jia', isPlayer: true, isAlibi: true },
      { time: '21:30', description: '商王突然倒地身亡', location: '王宫', characterId: 'wei-wang-xian-jia', isPlayer: true, isAlibi: true }
    ],
    difficulty: 'medium'
  },
  {
    id: 'qin-jiang-lu',
    title: '秦江之谜',
    date: '秦代·公元前210年',
    location: '咸阳宫',
    description: '秦始皇在咸阳宫突然死亡，现场有大量隐藏的线索。丞相李斯、宦官赵高、太子扶苏和将军蒙恬都被发现有关联。每个人似乎都有自己的秘密和动机。',
    victim: '秦始皇',
    killer: '',
    witnesses: ['李斯', '赵高', '扶苏', '蒙恬', '胡亥'],
    keyClues: [
      '伪造的诏书',
      '毒药残留',
      '隐藏的密信',
      '篡改的历史记录',
      '政治联姻的契约',
      '兵权的转移'
    ],
    timeLine: [
      { time: '09:00', description: '秦始皇召见李斯', location: '咸阳宫', characterId: 'li-si', isPlayer: true, isAlibi: true },
      { time: '10:30', description: '赵高到达咸阳宫', location: '咸阳宫', characterId: 'zhao-gao', isPlayer: true, isAlibi: true },
      { time: '11:00', description: '扶苏到达咸阳宫', location: '咸阳宫', characterId: 'fu-su', isPlayer: true, isAlibi: true },
      { time: '12:00', description: '蒙恬到达咸阳宫', location: '咸阳宫', characterId: 'meng-tian', isPlayer: true, isAlibi: true },
      { time: '14:00', description: '秦始皇突然死亡', location: '咸阳宫', characterId: 'li-si', isPlayer: true, isAlibi: true }
    ],
    difficulty: 'hard'
  }
];

// 谜题剧本
export const SCRIPTS: Script[] = [
  {
    id: 'shang-mystery',
    title: '商王之谜',
    era: '商代',
    eraId: 'shang',
    difficulty: 'medium',
    playerCount: 5,
    duration: 60,
    description: '商王武丁在神庙广场祭祀仪式后突然死亡，现场一片混乱。师尹也在当晚被发现死亡。你有5个嫌疑人，每个人都有自己的秘密和动机。找出真正的凶手！',
    characters: CHARACTER_DATABASE.slice(0, 5),
    mysteryEvent: MYSTERY_EVENTS[0],
    clues: [],
    solution: '师尹是受害者，被卫王谋杀。卫王因为师尹知道了他的秘密而将其灭口。商王的死亡是诅咒导致的意外，但诅咒的真正来源与卫王的巫术有关。',
    setup: '你是一名秘密调查员，被卷入了商朝王室的内斗。你必须通过调查每个人的秘密和动机，找出真正的凶手。'
  }
];

// 案件模板
export const CASE_TEMPLATES = {
  shang: {
    title: '商代宫廷谜案',
    description: '在商代晚期的宫廷中，一位重要的角色突然死亡。每个人都有自己的秘密和动机。',
    era: '商代',
    eraId: 'shang',
    difficulty: 'medium'
  }
};
