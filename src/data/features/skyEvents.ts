/**
 * 历史天气/天象推算数据
 * 基于天文计算和历史记载的关键事件天象对照
 */

export interface SkyEvent {
  eventId: string;
  eventTitle: string;
  year: number;
  /** 推算的天象描述 */
  astronomicalDescription: string;
  /** 历史文献记载的天象 */
  historicalRecord: string;
  /** 推算的天气/气候 */
  weatherEstimate: string;
  /** 推算可信度 */
  credibility: 'high' | 'medium' | 'low';
  /** 验证结论 */
  verification: string;
  /** 科学依据 */
  scientificBasis: string;
}

export const SKY_EVENTS: SkyEvent[] = [
  {
    eventId: 'chibi-battle',
    eventTitle: '赤壁之战',
    year: 208,
    astronomicalDescription:
      '公元208年冬至前后，长江中游地区应处于冬季。天文推算显示该年冬至在12月22日前后，长江流域冬季盛行北风，偶有东风扰动。',
    historicalRecord:
      '《三国志》载："时东南风急"。诸葛亮"借东风"成为千古传说。',
    weatherEstimate:
      '冬季长江中游以西北风为主。但冬至前后，冷高压东移出海时，短暂可出现东南风回暖天气（气象学称为"冷锋过境后回暖"）。',
    credibility: 'medium',
    verification:
      '东南风在冬至前后确实可能短暂出现，属于罕见但非不可能的天气现象。诸葛亮可能利用了当地经验性天气预报，而非"神术"。',
    scientificBasis: '现代气象学冷锋过境回暖模型 + 长江中游冬季风场历史统计',
  },
  {
    eventId: 'muye-battle',
    eventTitle: '牧野之战',
    year: -1046,
    astronomicalDescription:
      '公元前1046年1月20日（夏历正月），黎明时分。推算该日太阳刚刚升起，地平线上可见晨光。有学者认为"天再旦"记录即指此日黎明时发生的日食现象。',
    historicalRecord:
      '《逸周书》载："王以正月庚寅黎明，伐商"。《竹书纪年》载周懿王元年"天再旦于郑"。',
    weatherEstimate:
      '黄河中游冬季清晨，天气寒冷干燥，适合军队行进。',
    credibility: 'high',
    verification:
      '夏商周断代工程利用"天再旦"日食记录，推算牧野之战发生在公元前1046年1月20日。该推算已被国际天文学界认可。',
    scientificBasis: 'NASA 日食数据库 + 中国古代日食记录反推计算',
  },
  {
    eventId: 'qin-unify',
    eventTitle: '秦统一六国',
    year: -221,
    astronomicalDescription:
      '公元前221年为中国历史转折点。该年并无重大天象记录，但秦以水德自居，崇尚黑色，与当时五行学说密切相关。',
    historicalRecord:
      '《史记》载秦始皇统一后"更名河曰德水，以冬十月为岁首，色上黑"。',
    weatherEstimate:
      '战国末期气候处于温暖期向寒冷期过渡阶段。北方冬季严寒有利于秦军军事行动。',
    credibility: 'low',
    verification:
      '秦朝五行理论将水德与冬季、黑色关联，体现了当时的天人感应思想体系。具体天气无法精确推算。',
    scientificBasis: '中国历史气候序列 + 五行学说文献分析',
  },
  {
    eventId: 'an-shi-rebellion',
    eventTitle: '安史之乱',
    year: 755,
    astronomicalDescription:
      '公元755年11月（天宝十四载冬），安禄山起兵。该年气候史料显示华北冬季偏暖，可能影响了叛军南下速度。',
    historicalRecord:
      '《旧唐书》载："天宝十四载十一月甲子，禄山起兵"。此前有"彗星出东北"等天象记录。',
    weatherEstimate:
      '唐代中期处于中国历史气候温暖期。华北冬季偏暖，黄河流域冰封期缩短，利于叛军快速南下。',
    credibility: 'low',
    verification:
      '温暖期气候确实可能加速了叛军行动，但起兵决策更多出于政治军事因素而非天象。',
    scientificBasis: '唐代气候重建序列 + 历史文献天象记录',
  },
  {
    eventId: 'jingkang-incident',
    eventTitle: '靖康之变',
    year: 1127,
    astronomicalDescription:
      '公元1127年1月（靖康元年冬），金兵攻陷开封。该年中国北方处于寒冷期初期，冬季严寒。',
    historicalRecord:
      '《宋史·钦宗纪》载靖康元年正月金兵破城。此前连续数年天灾：大旱、地震、异常寒冷。',
    weatherEstimate:
      '北宋末年进入中世纪温暖期尾声，开始向寒冷期过渡。开封冬季异常寒冷，黄河冰封坚固，利于金军渡河南下。',
    credibility: 'medium',
    verification:
      '气候寒冷确实有利于金军冬季攻势。黄河冰封使骑兵可直接渡河，免去了舟船渡江的困难。',
    scientificBasis: '中世纪气候异常期研究 + 黄河冰情历史记录',
  },
  {
    eventId: 'zheng-he',
    eventTitle: '郑和下西洋',
    year: 1405,
    astronomicalDescription:
      '公元1405年（永乐三年），郑和首次出航。该年南中国海季风正常，冬季东北季风利于南下，夏季西南季风利于返航。',
    historicalRecord:
      '《明史》载郑和利用季风规律："冬出夏返"。每次航行严格遵循季风周期。',
    weatherEstimate:
      '明代初期气候处于小冰期之前相对温暖阶段。南中国海季风规律稳定，利于远洋航行。',
    credibility: 'high',
    verification:
      '郑和船队精确利用季风规律是确凿的历史事实。冬乘东北季风南下，夏乘西南季风返航，体现了明代高超的航海气象知识。',
    scientificBasis: '南中国海季风气候数据 + 明代航海记录',
  },
  {
    eventId: 'shangyang-reform',
    eventTitle: '商鞅变法',
    year: -356,
    astronomicalDescription:
      '公元前356年战国中期。该时期气候史料较少，但处于温暖期尾声。',
    historicalRecord:
      '《史记·商君列传》载商鞅变法期间并无特殊天象记录。变法更多出于政治经济考量。',
    weatherEstimate:
      '战国中期处于温暖期尾声，秦国关中地区气候温和，农业条件优越，为变法提供了经济基础。',
    credibility: 'low',
    verification:
      '气候条件有利于秦农业发展，但变法成功更关键在于制度创新而非天象。',
    scientificBasis: '战国时期气候重建 + 秦农业地理分析',
  },
  {
    eventId: 'gaixia-battle',
    eventTitle: '垓下之战',
    year: -202,
    astronomicalDescription:
      '公元前202年12月（汉高祖五年冬），楚汉决战于垓下。该年处于战国秦汉温暖期，但冬季仍寒冷。推算该月有月相变化，"四面楚歌"之夜或为月圆前后。',
    historicalRecord:
      '《史记·项羽本纪》载："项王军壁垓下，兵少食尽，汉军及诸侯兵围之数重。夜闻汉军四面皆楚歌"。又载项羽突围时"时不利兮骓不逝"。',
    weatherEstimate:
      '冬季黄淮平原夜间寒冷，利于围困消耗楚军粮草。楚军被围断粮，加之夜寒，士气崩溃。',
    credibility: 'medium',
    verification:
      '冬季围城断粮是经典战术，天气寒冷加速了楚军崩溃。"四面楚歌"的心理战在夜间寒冷、粮尽兵疲的条件下效果最大化。',
    scientificBasis: '黄淮平原冬季气候统计 + 《史记》记载的军事地理分析',
  },
  {
    eventId: 'yashan-battle',
    eventTitle: '崖山之战',
    year: 1279,
    astronomicalDescription:
      '公元1279年3月19日（祥兴二年二月初六），宋元崖山决战。该日为农历二月初六，接近上弦月，夜间月光微弱。春季南海北部多雾，能见度受限。',
    historicalRecord:
      '《宋史》载："二月癸未，张弘范攻崖山，张世杰力战，兵败。陆秀夫负幼帝昺投海"。崖山海战是南宋灭亡的标志。',
    weatherEstimate:
      '春季珠江口海域多雾，能见度低。宋军千余艘战船连环相连，机动性差，在雾天更难应对元军火船攻击。',
    credibility: 'medium',
    verification:
      '春雾确实可能影响海战能见度，但宋军战败主因是战术失误（连环船）和兵力劣势。天气是次要因素。',
    scientificBasis: '珠江口春季海雾气候数据 + 南宋海战记录分析',
  },
  {
    eventId: 'ming-qing-transition',
    eventTitle: '明亡清兴',
    year: 1644,
    astronomicalDescription:
      '公元1644年（崇祯十七年），处于小冰期最寒冷阶段。该年华北冬季异常严寒，春季干旱持续。太阳活动处于蒙德极小期前夕，全球气温偏低。',
    historicalRecord:
      '《明史》载崇祯年间连年大旱、蝗灾、瘟疫。北京城内"人相食"记录频现。李自成正月从西安出发，三月十八日攻入北京。',
    weatherEstimate:
      '小冰期导致华北持续干旱严寒，粮食歉收引发饥荒和流民起义。1644年春季干旱利于李自成军队快速行军（无泥泞阻隔）。',
    credibility: 'high',
    verification:
      '小冰期是明朝灭亡的重要气候背景。持续低温干旱导致农业崩溃、饥荒蔓延、瘟疫流行，直接催生了农民起义。气候因素是明亡清兴的关键推手之一。',
    scientificBasis: '小冰期气候重建 + 蒙德极小期太阳活动数据 + 明末灾害记录',
  },
  {
    eventId: 'xinhai-revolution',
    eventTitle: '辛亥革命',
    year: 1911,
    astronomicalDescription:
      '公元1911年10月10日（宣统三年八月十九日），武昌起义爆发。该日为农历八月十九，中秋后第四日，月相接近下弦月。秋季武汉天气晴朗干燥。',
    historicalRecord:
      '《清史稿》载："八月十九日，武昌新军变"。起义原计划于10月6日中秋起义，因故推迟至10日。熊秉坤打响了"第一枪"。',
    weatherEstimate:
      '10月中旬武汉秋季干燥，夜间凉爽，利于新军秘密集结和夜间行动。秋高气爽的天气也利于消息快速传播。',
    credibility: 'high',
    verification:
      '秋季天气确实利于起义行动。晴朗干燥的天气便于军队调动和信号传递，且无酷暑严寒影响战斗力。辛亥革命选择秋季起义，天气因素起到了积极作用。',
    scientificBasis: '武汉秋季气候统计 + 近代气象记录 + 辛亥革命史料',
  },
];
