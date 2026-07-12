/**
 * 朝代经济沙盘数据 — 简化版数值模拟
 * @see history-museum/design/002-innovation-brainstorm.md §14
 */

export interface DynastyEconomyTemplate {
  id: string;
  name: string;
  emoji: string;
  period: string;
  /** 初始国库（万贯） */
  initialTreasury: number;
  /** 初始民心 (0-100) */
  initialMorale: number;
  /** 初始边防 (0-100) */
  initialDefense: number;
  /** 初始文化 (0-100) */
  initialCulture: number;
  /** 人口基线（万） */
  populationBase: number;
  /** 年收入基数（万贯/回合） */
  incomePerTurn: number;
  /** 历史事件（按回合触发） */
  events: SandbagEvent[];
  /** 历史结局 */
  historicalOutcome: string;
}

export interface SandbagEvent {
  /** 触发回合 */
  turn: number;
  title: string;
  description: string;
  /** 事件对各维度的影响 */
  effects: {
    treasury?: number;
    morale?: number;
    defense?: number;
    culture?: number;
    population?: number;
  };
  /** 可选应对方案 */
  options?: SandbagOption[];
}

export interface SandbagOption {
  label: string;
  description: string;
  effects: {
    treasury?: number;
    morale?: number;
    defense?: number;
    culture?: number;
    population?: number;
  };
}

export const DYNASTY_ECONOMIES: DynastyEconomyTemplate[] = [
  {
    id: 'nan-bei-chao',
    name: '南北朝',
    emoji: '🕯️',
    period: '420-589',
    initialTreasury: 300,
    initialMorale: 55,
    initialDefense: 45,
    initialCulture: 70,
    populationBase: 3000,
    incomePerTurn: 80,
    events: [
      { turn: 2, title: '孝文帝汉化改革', description: '北魏孝文帝推行全面汉化改革，迁都洛阳，改姓易服，促进民族融合但触动鲜卑贵族利益', effects: { morale: -10, defense: -10, culture: 15 }, options: [
        { label: '全面汉化', description: '推行汉化政策，促进民族融合', effects: { treasury: -50, morale: 5, defense: -5, culture: 20 } },
        { label: '维持鲜卑旧制', description: '保留鲜卑传统，稳定但错过融合机遇', effects: { treasury: -10, morale: -5, defense: 5, culture: -10 } },
      ]},
      { turn: 4, title: '侯景之乱', description: '侯景叛乱攻破建康，南朝经济文化遭受毁灭性打击', effects: { treasury: -100, morale: -30, defense: -20, population: -800, culture: -15 } },
      { turn: 6, title: '北方六镇起义', description: '北魏六镇戍卒起义，北方陷入混乱，最终导致东西魏分裂', effects: { treasury: -80, morale: -15, defense: -25, population: -500 }, options: [
        { label: '调兵镇压', description: '集中兵力镇压起义', effects: { treasury: -60, morale: 5, defense: 10 } },
        { label: '招抚安抚', description: '招降起义军，缓和矛盾', effects: { treasury: -30, morale: 10, defense: -5, culture: 5 } },
      ]},
    ],
    historicalOutcome: '南北朝对峙近170年，南朝因侯景之乱走向衰亡，北朝因六镇起义分裂为东西魏。最终北周武帝灭佛积蓄国力，杨坚代周建隋，589年灭陈统一全国，结束了近四百年的分裂局面。',
  },
  {
    id: 'tang',
    name: '唐朝',
    emoji: '🏛️',
    period: '618-907',
    initialTreasury: 500,
    initialMorale: 80,
    initialDefense: 70,
    initialCulture: 90,
    populationBase: 5000,
    incomePerTurn: 120,
    events: [
      { turn: 3, title: '安史之乱', description: '安禄山起兵叛乱，北方大片领土沦陷', effects: { treasury: -200, morale: -30, defense: -40, population: -2000 }, options: [
        { label: '全力平叛', description: '调集全国兵力镇压，耗资巨大', effects: { treasury: -150, morale: 10, defense: 20 } },
        { label: '妥协议和', description: '承认藩镇割据，换取表面和平', effects: { treasury: -30, morale: -20, defense: -10, culture: -5 } },
      ]},
      { turn: 5, title: '藩镇割据', description: '地方节度使拥兵自重，不听中央调遣', effects: { treasury: -50, morale: -10, defense: -15 }, options: [
        { label: '削藩改革', description: '强制收回藩镇权力，风险极大', effects: { treasury: -100, morale: 5, defense: 15 } },
        { label: '维持现状', description: '默认藩镇权力，中央收入减少', effects: { treasury: -30, morale: -5, defense: -5 } },
      ]},
      { turn: 7, title: '黄巢起义', description: '黄巢率农民军攻入长安，唐朝根基动摇', effects: { treasury: -100, morale: -25, defense: -20, population: -1000 } },
    ],
    historicalOutcome: '唐朝因安史之乱后藩镇割据、宦官专权，最终在907年被朱温篡位灭亡。从盛世到灭亡，核心转折点是未能有效处理安禄山叛乱后的权力重组。',
  },
  {
    id: 'wu-dai-shi-guo',
    name: '五代十国',
    emoji: '⚔️',
    period: '907-960',
    initialTreasury: 250,
    initialMorale: 40,
    initialDefense: 35,
    initialCulture: 50,
    populationBase: 2500,
    incomePerTurn: 70,
    events: [
      { turn: 2, title: '石敬瑭割燕云十六州', description: '后晋石敬瑭为换取契丹支持，割让燕云十六州，自称"儿皇帝"，中原失去北方屏障', effects: { morale: -20, defense: -30, culture: -5 }, options: [
        { label: '称臣求援', description: '向契丹称臣，换取军事支持', effects: { treasury: 50, morale: -25, defense: -20, culture: -10 } },
        { label: '独立抵抗', description: '拒绝割地，独立对抗外敌', effects: { treasury: -80, morale: 15, defense: -10, population: -300 } },
      ]},
      { turn: 4, title: '后周世宗柴荣改革', description: '后周世宗柴荣推行政治军事改革，南征北战，为统一奠定基础', effects: { treasury: 30, morale: 10, defense: 15, culture: 5 }, options: [
        { label: '励精图治', description: '全面推行改革，强化中央集权', effects: { treasury: -20, morale: 15, defense: 20, culture: 10 } },
        { label: '维持现状', description: '谨慎行事，不冒进改革', effects: { treasury: 20, morale: 0, defense: 5 } },
      ]},
      { turn: 6, title: '南唐词学兴盛', description: '南唐偏安江南，李煜父子词学兴盛，文化繁荣但军事衰弱', effects: { treasury: 20, culture: 25, defense: -10 } },
    ],
    historicalOutcome: '五代十国战乱频繁，中原五十三年换五个王朝。后周世宗柴荣励精图治为统一奠定基础，可惜英年早逝。960年赵匡胤陈桥兵变代后周建宋，随后十年内统一十国，结束了五代十国的分裂局面。石敬瑭割让的燕云十六州成为中原王朝长达四百年的北方隐患。',
  },
  {
    id: 'song',
    name: '宋朝',
    emoji: '📜',
    period: '960-1279',
    initialTreasury: 800,
    initialMorale: 60,
    initialDefense: 30,
    initialCulture: 95,
    populationBase: 8000,
    incomePerTurn: 200,
    events: [
      { turn: 2, title: '王安石变法', description: '王安石推行青苗法、保甲法等改革', effects: { treasury: 50, morale: -5, defense: 10 }, options: [
        { label: '支持变法', description: '推行新政，增加国库收入', effects: { treasury: 80, morale: -10, defense: 15, culture: -5 } },
        { label: '保守反对', description: '维持旧制，稳定但收入不足', effects: { treasury: 10, morale: 5, defense: 0 } },
      ]},
      { turn: 4, title: '靖康之变', description: '金兵攻破开封，二帝被俘', effects: { treasury: -400, morale: -40, defense: -30, population: -3000, culture: -20 }, options: [
        { label: '坚决抗战', description: '全力抵抗，可能收复失地', effects: { treasury: -200, morale: 15, defense: 10 } },
        { label: '南迁避战', description: '退守江南，保存实力', effects: { treasury: -50, morale: -20, defense: 5, culture: 5 } },
      ]},
      { turn: 6, title: '蒙古南下', description: '蒙古铁骑大举南侵，南宋危在旦夕', effects: { treasury: -100, morale: -15, defense: -20, population: -1500 } },
    ],
    historicalOutcome: '宋朝文化经济繁荣但军事薄弱，"重文轻武"导致国防空虚。靖康之变后南宋苟安，最终1279年被元灭于崖山。',
  },
  {
    id: 'ming',
    name: '明朝',
    emoji: '🏯',
    period: '1368-1644',
    initialTreasury: 600,
    initialMorale: 70,
    initialDefense: 65,
    initialCulture: 75,
    populationBase: 15000,
    incomePerTurn: 150,
    events: [
      { turn: 2, title: '郑和下西洋', description: '耗资巨大的海上远航，展示国威', effects: { treasury: -80, morale: 10, culture: 15, defense: 5 }, options: [
        { label: '继续远航', description: '维持海洋霸权，但耗资惊人', effects: { treasury: -120, morale: 10, culture: 20, defense: 10 } },
        { label: '停止远航', description: '节省开支，但失去海洋影响力', effects: { treasury: 0, morale: -5, culture: -10, defense: -5 } },
      ]},
      { turn: 4, title: '土木堡之变', description: '英宗被瓦剌俘虏，朝野震惊', effects: { treasury: -50, morale: -30, defense: -25 }, options: [
        { label: '于谦守京', description: '坚决保卫京城，拒不南迁', effects: { treasury: -30, morale: 20, defense: 15 } },
        { label: '南迁避祸', description: '放弃北方，退守江南', effects: { treasury: 20, morale: -20, defense: -30 } },
      ]},
      { turn: 5, title: '小冰河期', description: '极端寒冷天气导致粮食减产，农民起义', effects: { treasury: -100, morale: -20, defense: -10, population: -2000 } },
      { turn: 7, title: '李自成攻京', description: '农民军攻入北京，明朝灭亡', effects: { treasury: -200, morale: -40, defense: -40, population: -3000 } },
    ],
    historicalOutcome: '明朝因小冰河期导致的粮食危机、财政崩溃和农民起义而亡。崇祯虽勤政但已无力挽回。海禁政策也使明朝错失了全球化的机遇。',
  },
];

/** 回合状态 */
export interface TurnState {
  turn: number;
  treasury: number;
  morale: number;
  defense: number;
  culture: number;
  population: number;
  /** 本回合事件标题 */
  eventTitle?: string;
  /** 本回合选择的方案 */
  chosenOption?: string;
}
