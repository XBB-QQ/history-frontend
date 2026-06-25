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
];
