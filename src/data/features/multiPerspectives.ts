/**
 * 多视角事件叙事数据 — 罗生门式
 * @see history-museum/design/002-innovation-brainstorm.md §11
 */

export interface Perspective {
  /** 视角人物名 */
  figureName: string;
  /** 视角人物身份 */
  figureRole: string;
  /** 视角人物 emoji */
  emoji: string;
  /** 视角人物阵营 */
  faction: string;
  /** 此视角的叙事文本 */
  narrative: string;
  /** 此视角的独有信息（其他视角不知道的） */
  exclusiveInfo: string;
  /** 此视角对事件的评价 */
  judgment: string;
}

export interface MultiPerspectiveEvent {
  id: string;
  title: string;
  yearDisplay: string;
  dynasty: string;
  /** 中立背景（上帝视角简述） */
  neutralSummary: string;
  /** 3 个视角 */
  perspectives: Perspective[];
  /** 视角间矛盾点 */
  contradictions: string[];
  /** 历史教训 */
  lesson: string;
}

export const MULTI_PERSPECTIVE_EVENTS: MultiPerspectiveEvent[] = [
  {
    id: 'chibi-perspective',
    title: '赤壁之战',
    yearDisplay: '公元208年',
    dynasty: '三国',
    neutralSummary: '孙刘联军在赤壁以少胜多击败曹操，奠定三国鼎立格局。火攻是核心战术，但背后有复杂的政治博弈和战略考量。',
    perspectives: [
      {
        figureName: '曹操',
        figureRole: '魏武帝（时任丞相）',
        emoji: '⚔️',
        faction: '曹魏',
        narrative: '我率八十万大军南下，本欲一统天下。不料北方将士水土不服，疫病横行。黄盖诈降，火烧连营，仓皇北归。此败非战之罪，实乃天时不利。然北方根基未损，终将再图南征。',
        exclusiveInfo: '曹操当时已患头风病，决策力下降。军中疫病实际病死超过战斗伤亡。',
        judgment: '非战之罪，天时不利。赤壁之败是暂时的，统一大局不会改变。',
      },
      {
        figureName: '周瑜',
        figureRole: '东吴大都督',
        emoji: '🔥',
        faction: '东吴',
        narrative: '曹操号称百万，实际不过二十余万，且多为降兵，军心不稳。我与黄盖定下火攻之计，利用东南风天时，一举烧毁连环船。此战以智取胜，非侥幸也。可惜功高遭忌，终被孙权疑心。',
        exclusiveInfo: '周瑜早就发现曹军弱点——降兵多、疫病重、水战弱。火攻不是临时起意，而是精心策划。',
        judgment: '赤壁之胜是实力的体现。吴军水战能力远胜曹军，此胜理所当然。',
      },
      {
        figureName: '诸葛亮',
        figureRole: '蜀汉丞相（时任军师）',
        emoji: '🪶',
        faction: '蜀汉',
        narrative: '我促成了孙刘联盟，这是赤壁之胜的关键。没有刘备的参战，孙权未必敢抗曹。借东风之事虽为后人渲染，但天时预报确实是我之功。此战保全了荆州，为日后入蜀奠定基础。',
        exclusiveInfo: '诸葛亮的主要贡献是促成联盟和后勤保障，而非直接指挥战斗。火攻战术主要由周瑜策划。',
        judgment: '联盟是胜利的根本。没有蜀军的参战，吴军独木难支。',
      },
    ],
    contradictions: [
      '曹操认为败因是天时（东南风、疫病），周瑜认为是实力差距（水战能力），诸葛亮认为是联盟之功',
      '火攻策划者：周瑜自称为主谋，诸葛亮也声称有功',
      '军队数量：曹操称八十万，周瑜估计二十余万——谁的数据更准确？',
    ],
    lesson: '同一事件，不同立场看到完全不同的真相。历史叙事永远有立场，"客观"需要对比多方视角。',
  },
  {
    id: 'jingkang-perspective',
    title: '靖康之变',
    yearDisplay: '公元1127年',
    dynasty: '北宋',
    neutralSummary: '金兵攻破开封，俘虏宋徽宗、宋钦宗及后宫宗室数千人北去。北宋灭亡，史称"靖康之耻"。这是中国历史上最屈辱的亡国事件之一。',
    perspectives: [
      {
        figureName: '宋徽宗',
        figureRole: '北宋皇帝（退位后为太上皇）',
        emoji: '🎨',
        faction: '北宋皇室',
        narrative: '朕一生醉心书画，创瘦金体，编《宣和画谱》，何罪之有？蔡京等人蒙蔽圣听，朕用非其人。退位后本欲安度晚年，不料金兵突至，朕与钦宗皆被俘虏，受尽屈辱。五国城苦寒之地，朕终以泪洗面而亡。',
        exclusiveInfo: '徽宗退位前曾试图改革，但被大臣阻挠。他晚年后悔沉迷艺术而忽视国政。',
        judgment: '朕非暴君，只是不善治国。该怪的是那些误国的大臣。',
      },
      {
        figureName: '完颜阿骨打（金太祖）',
        figureRole: '金朝开国皇帝',
        emoji: '🛡️',
        faction: '金国',
        narrative: '宋朝何其软弱！我金国起兵抗辽，十年灭辽。宋朝趁火打劫想收燕云，却不守盟约，屡次违约。我军南下，宋军一触即溃。开封城破，二帝俯首请降。此乃天命归金，弱者不配立国。',
        exclusiveInfo: '金太祖对宋朝的蔑视源于宋朝外交上的反复无常——先联合攻辽，又私下与辽议和。',
        judgment: '宋人软弱失信，亡国是其自身之过。',
      },
      {
        figureName: '开封百姓',
        figureRole: '普通市民',
        emoji: '😭',
        faction: '平民',
        narrative: '皇帝逃跑，把我们丢给金兵！金兵进城后烧杀抢掠，妇女被掳，男子被杀。那些大臣平日搜刮民脂民膏，城破时自己先跑，留下百姓受难。靖康之耻，耻的不是皇室的屈辱，是千万百姓的血泪！',
        exclusiveInfo: '开封被围期间，百姓自发守城，但缺少武器和粮食。很多百姓饿死在城墙上。',
        judgment: '亡国是皇帝和大臣的责任，百姓却承受最大的苦难。',
      },
    ],
    contradictions: [
      '徽宗认为是大臣误国，金人认为是宋朝失信，百姓认为是皇室无能',
      '靖康之耻的核心是谁的耻？皇室屈辱 vs 百姓苦难',
      '宋朝外交是否真的反复无常？金国是否过度扩张？',
    ],
    lesson: '亡国之痛，皇室受辱只是表象，真正的代价是千万百姓的生命。读史不能只看帝王将相。',
  },
  {
    id: 'xuanwu-perspective',
    title: '玄武门之变',
    yearDisplay: '公元626年7月2日',
    dynasty: '唐',
    neutralSummary: '秦王李世民在玄武门设伏，射杀太子李建成和齐王李元吉。随后逼迫父皇李渊立其为太子，两个月后禅让。李世民登基为唐太宗，开创贞观之治。',
    perspectives: [
      {
        figureName: '李世民',
        figureRole: '秦王 → 唐太宗',
        emoji: '⚔️',
        faction: '秦王派',
        narrative: '建成元吉屡次谋害我，甚至在酒中下毒。父皇偏袒太子，我被逼无奈。玄武门之变是自卫，不是篡位。此后我励精图治，开创贞观盛世，天下太平百姓安乐。历史会证明我的选择是对的。',
        exclusiveInfo: '李世民确实收到密报——太子计划在昆明池伏杀他。但玄武门设伏的准备早在密报之前。',
        judgment: '兄弟相残是被迫的自卫，贞观盛世证明这个选择的历史合理性。',
      },
      {
        figureName: '李建成',
        figureRole: '太子',
        emoji: '📜',
        faction: '太子派',
        narrative: '我是合法太子，父皇钦定。李世民功高震主，觊觎皇位，才是真正的威胁。我多次忍让，不愿骨肉相残。若非他设伏谋杀，大唐本可和平传承。我的死不是正义，是权力暴力。',
        exclusiveInfo: '李建成确实有防范李世民的行为，但没有确凿证据证明他计划谋杀李世民。',
        judgment: '合法继承人被谋杀，这是篡位，不是正义。',
      },
      {
        figureName: '李渊',
        figureRole: '唐高祖（开国皇帝）',
        emoji: '👑',
        faction: '皇帝',
        narrative: '朕建大唐，功勋盖世。然二子相争，朕左右为难。建成是嫡长子，世民是功臣。朕倾向于建成，但世民功大难以压制。玄武门之变后，朕已被架空，只得禅让。开国帝王沦为傀儡，此乃朕一生最大悲剧。',
        exclusiveInfo: '李渊在事变后曾试图让世民和建成分治（东西分治方案），但未被采纳。',
        judgment: '两个儿子都是朕的骨肉，无论谁赢朕都是输家。',
      },
    ],
    contradictions: [
      '李世民称自卫，李建成称被篡位——谁先动的杀心？',
      '李渊倾向太子还是秦王？他的态度是否催化了冲突？',
      '贞观之治能否证明杀兄的合理性？结果正义是否等于过程正义？',
    ],
    lesson: '权力斗争中没有绝对正义。李世民的选择避免了更大内战，但杀了亲兄弟。历史的评价往往是结果导向的。',
  },
];
