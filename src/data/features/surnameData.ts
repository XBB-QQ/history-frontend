/**
 * 百家姓迁徙与族谱数据 — 个人化姓氏溯源
 * @see history-museum/ITERATIONS.md Iteration #71
 *
 * 数据来源：基于《百家姓》《元和姓纂》《通志·氏族略》及郡望堂号研究整理
 * 坐标使用经纬度（与 MigrationMapPage / TerritoryMapPage 一致）
 * 复用 MigrationMapPage 的地图工具函数
 */

/** 迁徙节点 */
export interface SurnameMigrationNode {
  /** 节点名称（地名） */
  name: string;
  /** 经纬度 */
  lng: number;
  lat: number;
  /** 迁入时期 */
  period: string;
  /** 迁入原因 */
  reason: string;
}

/** 历代名人 */
export interface SurnameFigure {
  name: string;
  dynasty: string;
  achievement: string;
}

/** 郡望堂号 */
export interface SurnameJunwang {
  /** 郡望名 */
  name: string;
  /** 对应今地 */
  location: string;
  lng: number;
  lat: number;
  /** 堂号 */
  tanghao: string;
}

/** 单个姓氏数据 */
export interface Surname {
  /** 姓氏 */
  surname: string;
  /** 拼音 */
  pinyin: string;
  /** 百家姓排名 */
  rank: number;
  /** 当代人口排名（约） */
  populationRank: number;
  /** 当代人口（万） */
  population: number;
  /** 起源 */
  origin: string;
  /** 发源地 */
  originPlace: {
    name: string;
    lng: number;
    lat: number;
  };
  /** 起源时期 */
  originPeriod: string;
  /** 郡望堂号 */
  junwang: SurnameJunwang[];
  /** 迁徙轨迹（按时间顺序，首节点为发源地） */
  migration: SurnameMigrationNode[];
  /** 历代名人 */
  figures: SurnameFigure[];
  /** 姓氏图腾/标志描述 */
  totem: string;
  /** 简要族史 */
  history: string;
}

export const SURNAMES: Surname[] = [
  {
    surname: '王',
    pinyin: 'Wáng',
    rank: 8,
    populationRank: 1,
    population: 10153,
    origin: '出自姬姓，周灵王太子晋之后；亦出自妫姓，舜帝后裔田齐王族之后；部分出自子姓比干之后。',
    originPlace: { name: '洛阳(成周)', lng: 112.4, lat: 34.6 },
    originPeriod: '春秋',
    junwang: [
      { name: '太原郡', location: '山西太原', lng: 112.5, lat: 37.9, tanghao: '太原堂' },
      { name: '琅琊郡', location: '山东临沂', lng: 118.4, lat: 35.0, tanghao: '琅琊堂' },
    ],
    migration: [
      { name: '洛阳', lng: 112.4, lat: 34.6, period: '春秋', reason: '太子晋封于王城，后裔以王为氏' },
      { name: '太原', lng: 112.5, lat: 37.9, period: '战国', reason: '王翦家族迁居太原，形成太原王氏' },
      { name: '琅琊', lng: 118.4, lat: 35.0, period: '汉', reason: '王吉徙临沂，开琅琊王氏' },
      { name: '建康', lng: 118.8, lat: 32.1, period: '东晋', reason: '永嘉南渡，王导拥立东晋，"王与马共天下"' },
      { name: '闽中', lng: 119.3, lat: 26.1, period: '唐末', reason: '王审知入闽建国，开闽王氏' },
    ],
    figures: [
      { name: '王翦', dynasty: '秦', achievement: '灭楚名将，太原王氏始祖' },
      { name: '王导', dynasty: '东晋', achievement: '开国元勋，"王与马共天下"' },
      { name: '王羲之', dynasty: '东晋', achievement: '书圣，琅琊王氏代表' },
      { name: '王安石', dynasty: '北宋', achievement: '变法宰相，临川王氏' },
    ],
    totem: '王字三横一竖，象征天地人贯通，王者之尊。图腾为头顶王冠之人。',
    history: '王姓源头多元，主要有姬姓、妫姓、子姓三系。太原王氏、琅琊王氏为两大郡望，南朝时"王与马共天下"，唐末王审知开闽，明清遍布全国，今为中国第一大姓。',
  },
  {
    surname: '李',
    pinyin: 'Lǐ',
    rank: 1,
    populationRank: 2,
    population: 10090,
    origin: '出自嬴姓，皋陶之后，官为"大理"（司法官），以官为氏理，后避难改李。一说因食李子得姓。',
    originPlace: { name: '鹿邑(苦县)', lng: 115.5, lat: 33.9 },
    originPeriod: '商末周初',
    junwang: [
      { name: '陇西郡', location: '甘肃临洮', lng: 103.9, lat: 35.4, tanghao: '陇西堂' },
      { name: '赵郡', location: '河北赵县', lng: 114.8, lat: 37.8, tanghao: '赵郡堂' },
    ],
    migration: [
      { name: '鹿邑', lng: 115.5, lat: 33.9, period: '商末', reason: '李利贞避难于伊侯之墟，食李得姓' },
      { name: '陇西', lng: 103.9, lat: 35.4, period: '战国', reason: '李崇为陇西守，开陇西李氏' },
      { name: '赵郡', lng: 114.8, lat: 37.8, period: '汉', reason: '李牧后裔定居赵郡，开赵郡李氏' },
      { name: '长安', lng: 108.9, lat: 34.3, period: '唐', reason: '李渊建唐，李姓成国姓，赐姓众多' },
      { name: '宁化', lng: 116.6, lat: 26.3, period: '唐末', reason: '李火德入闽，为南方李氏共祖' },
    ],
    figures: [
      { name: '李耳', dynasty: '春秋', achievement: '老子，道家创始人' },
      { name: '李世民', dynasty: '唐', achievement: '唐太宗，贞观之治' },
      { name: '李白', dynasty: '唐', achievement: '诗仙' },
      { name: '李清照', dynasty: '宋', achievement: '婉约词宗' },
    ],
    totem: '李字上木下子，源于"食李得姓"传说。图腾为李树与子孙繁衍之意。',
    history: '李姓源于嬴姓理氏，避难食李得姓。陇西李氏最盛，李渊建唐后李姓成国姓，大量赐姓使李姓激增。唐末李火德入闽，南方李氏多为其后。',
  },
  {
    surname: '张',
    pinyin: 'Zhāng',
    rank: 11,
    populationRank: 3,
    population: 9575,
    origin: '出自黄帝之后，挥公始造弓矢，官为弓正（弓长），以职为氏，故张字为弓长合文。',
    originPlace: { name: '濮阳', lng: 115.0, lat: 35.8 },
    originPeriod: '上古',
    junwang: [
      { name: '清河郡', location: '河北清河', lng: 115.7, lat: 37.1, tanghao: '清河堂' },
      { name: '南阳郡', location: '河南南阳', lng: 112.5, lat: 33.0, tanghao: '南阳堂' },
    ],
    migration: [
      { name: '濮阳', lng: 115.0, lat: 35.8, period: '上古', reason: '挥公造弓矢，封于濮阳' },
      { name: '清河', lng: 115.7, lat: 37.1, period: '春秋', reason: '张氏大宗迁清河，为天下张氏郡望' },
      { name: '南阳', lng: 112.5, lat: 33.0, period: '汉', reason: '张良封地留侯，后裔衍南阳' },
      { name: '韶州', lng: 113.6, lat: 24.8, period: '唐', reason: '张九龄家族居韶州，开岭南张氏' },
      { name: '宁化石壁', lng: 116.6, lat: 26.3, period: '宋', reason: '张化孙入闽，客家张氏始祖' },
    ],
    figures: [
      { name: '张良', dynasty: '汉', achievement: '汉初三杰，运筹帷幄' },
      { name: '张衡', dynasty: '东汉', achievement: '科学家，发明地动仪' },
      { name: '张九龄', dynasty: '唐', achievement: '开元名相，岭南第一人' },
      { name: '张居正', dynasty: '明', achievement: '改革名相，万历中兴' },
    ],
    totem: '张字弓长，源于挥公造弓矢。图腾为长弓与射手，象征尚武善射。',
    history: '张姓源自黄帝之后挥公，因造弓矢得姓。清河张氏为天下郡望，张良、张衡显于汉，张九龄开岭南派，客家张氏多出宁化石壁。今为第三大姓。',
  },
  {
    surname: '刘',
    pinyin: 'Liú',
    rank: 4,
    populationRank: 4,
    population: 7200,
    origin: '出自祁姓，帝尧后裔，刘累为夏代御龙氏，以名为氏。亦出自姬姓，周成王封弟于刘邑。',
    originPlace: { name: '偃师(刘国)', lng: 112.8, lat: 34.7 },
    originPeriod: '夏',
    junwang: [
      { name: '彭城郡', location: '江苏徐州', lng: 117.2, lat: 34.3, tanghao: '彭城堂' },
      { name: '中山郡', location: '河北定州', lng: 115.0, lat: 38.4, tanghao: '中山堂' },
    ],
    migration: [
      { name: '偃师', lng: 112.8, lat: 34.7, period: '夏', reason: '刘累居刘邑，为刘氏远祖' },
      { name: '沛县', lng: 116.8, lat: 34.7, period: '秦', reason: '刘邦起兵沛县，开汉室' },
      { name: '彭城', lng: 117.2, lat: 34.3, period: '汉', reason: '汉室宗亲聚彭城，成刘氏大郡望' },
      { name: '洛阳', lng: 112.4, lat: 34.6, period: '东汉', reason: '光武中兴，刘氏皇族居洛阳' },
      { name: '宁化', lng: 116.6, lat: 26.3, period: '唐末', reason: '刘祥入闽，开客家刘氏' },
    ],
    figures: [
      { name: '刘邦', dynasty: '汉', achievement: '汉高祖，开四百年汉室' },
      { name: '刘秀', dynasty: '东汉', achievement: '光武帝，中兴汉室' },
      { name: '刘备', dynasty: '三国', achievement: '蜀汉昭烈帝' },
      { name: '刘禹锡', dynasty: '唐', achievement: '诗豪' },
    ],
    totem: '刘字从刀从金，本义为战斧。图腾为持斧之武士，象征勇武征伐。',
    history: '刘姓源于帝尧后裔刘累。刘邦起沛县建汉，刘氏成皇姓，宗亲遍布天下。彭城刘氏为最大郡望。汉室四百年使刘姓人口激增，今为第四大姓。',
  },
  {
    surname: '陈',
    pinyin: 'Chén',
    rank: 10,
    populationRank: 5,
    population: 6330,
    origin: '出自妫姓，舜帝后裔妫满封于陈，谥胡公，子孙以国为氏。',
    originPlace: { name: '淮阳(宛丘)', lng: 114.9, lat: 33.7 },
    originPeriod: '西周',
    junwang: [
      { name: '颍川郡', location: '河南禹州', lng: 113.5, lat: 34.2, tanghao: '颍川堂' },
      { name: '汝南郡', location: '河南汝南', lng: 114.4, lat: 33.0, tanghao: '汝南堂' },
    ],
    migration: [
      { name: '淮阳', lng: 114.9, lat: 33.7, period: '西周', reason: '妫满封陈，建都宛丘' },
      { name: '颍川', lng: 113.5, lat: 34.2, period: '汉', reason: '陈寔居许昌，德冠乡里，开颍川陈氏' },
      { name: '固始', lng: 115.7, lat: 32.2, period: '唐', reason: '陈政、陈元光入闽平乱，开漳圣王' },
      { name: '泉州', lng: 118.6, lat: 24.9, period: '宋', reason: '南院派陈氏繁衍闽南' },
      { name: '潮汕', lng: 116.6, lat: 23.2, period: '宋元', reason: '陈氏南迁粤东，今潮汕陈姓最盛' },
    ],
    figures: [
      { name: '陈寔', dynasty: '汉', achievement: '德高望重，颍川陈氏始祖' },
      { name: '陈霸先', dynasty: '南朝', achievement: '陈武帝，建陈朝' },
      { name: '陈元光', dynasty: '唐', achievement: '开漳圣王，开发闽南' },
      { name: '陈天华', dynasty: '近代', achievement: '革命志士' },
    ],
    totem: '陈字从阝从东，本义为旌旗飘扬于东方。图腾为太昊伏羲都宛丘之地。',
    history: '陈姓源于妫姓，妫满封陈得姓。颍川陈氏为最大郡望，陈元光入闽开漳使陈姓南传，今闽粤台陈姓极盛，号称"陈林半天下"。',
  },
  {
    surname: '杨',
    pinyin: 'Yáng',
    rank: 16,
    populationRank: 6,
    population: 4648,
    origin: '出自姬姓，晋武公子伯侨封于杨，子孙以邑为氏。一说周宣王子尚父封杨侯。',
    originPlace: { name: '洪洞(杨国)', lng: 111.7, lat: 36.3 },
    originPeriod: '西周',
    junwang: [
      { name: '弘农郡', location: '河南灵宝', lng: 110.9, lat: 34.5, tanghao: '弘农堂' },
      { name: '天水郡', location: '甘肃天水', lng: 105.7, lat: 34.6, tanghao: '天水堂' },
    ],
    migration: [
      { name: '洪洞', lng: 111.7, lat: 36.3, period: '西周', reason: '伯侨封杨侯，杨国故地' },
      { name: '华阴', lng: 110.1, lat: 34.6, period: '汉', reason: '杨震居华阴，"四知"先生，开弘农杨氏' },
      { name: '洛阳', lng: 112.4, lat: 34.6, period: '隋', reason: '杨坚建隋，杨氏成皇族' },
      { name: '播州', lng: 106.9, lat: 27.7, period: '唐', reason: '杨端入播州，开西南杨氏，传至杨应龙' },
      { name: '梅州', lng: 116.1, lat: 24.3, period: '宋', reason: '杨辂入粤，客家杨氏繁衍' },
    ],
    figures: [
      { name: '杨震', dynasty: '东汉', achievement: '"四知"先生，弘农杨氏始祖' },
      { name: '杨坚', dynasty: '隋', achievement: '隋文帝，统一南北' },
      { name: '杨业', dynasty: '北宋', achievement: '杨家将，抗辽英雄' },
      { name: '杨万里', dynasty: '南宋', achievement: '诚斋体诗人' },
    ],
    totem: '杨字从木从易，本义为太阳升起于扶桑木。图腾为神树与太阳。',
    history: '杨姓源于姬姓，封杨侯得姓。弘农杨氏为第一郡望，杨震"四知"传为佳话。隋朝皇族使杨姓达于鼎盛，杨家将故事广为流传。',
  },
  {
    surname: '赵',
    pinyin: 'Zhào',
    rank: 1,
    populationRank: 7,
    population: 2748,
    origin: '出自嬴姓，造父善御，周穆王封于赵城，子孙以邑为氏。',
    originPlace: { name: '洪洞(赵城)', lng: 111.7, lat: 36.3 },
    originPeriod: '西周',
    junwang: [
      { name: '天水郡', location: '甘肃天水', lng: 105.7, lat: 34.6, tanghao: '天水堂' },
      { name: '涿郡', location: '河北涿州', lng: 115.9, lat: 39.5, tanghao: '涿郡堂' },
    ],
    migration: [
      { name: '洪洞', lng: 111.7, lat: 36.3, period: '西周', reason: '造父封赵城，赵氏发祥' },
      { name: '晋阳', lng: 112.5, lat: 37.9, period: '春秋', reason: '赵衰随晋文公，赵氏居晋阳' },
      { name: '邯郸', lng: 114.5, lat: 36.1, period: '战国', reason: '赵敬侯迁都邯郸，赵国鼎盛' },
      { name: '涿郡', lng: 115.9, lat: 39.5, period: '唐', reason: '赵氏北迁涿郡，宋室祖籍' },
      { name: '汴京', lng: 114.3, lat: 34.8, period: '北宋', reason: '赵匡胤建宋，赵氏成皇族' },
    ],
    figures: [
      { name: '赵武', dynasty: '春秋', achievement: '赵氏孤儿，复兴赵氏' },
      { name: '赵武灵王', dynasty: '战国', achievement: '胡服骑射改革' },
      { name: '赵匡胤', dynasty: '北宋', achievement: '宋太祖，黄袍加身' },
      { name: '赵孟頫', dynasty: '元', achievement: '书画大家，宋宗室后裔' },
    ],
    totem: '赵字从走从肖，本义为疾行趋赴。图腾为奔走之人，象征开拓进取。',
    history: '赵姓源于嬴姓造父，封赵城得姓。赵氏建赵国、宋朝两大政权，百家姓居首因宋朝国姓。靖康后赵氏南迁，今南方赵姓亦多。',
  },
  {
    surname: '黄',
    pinyin: 'Huáng',
    rank: 96,
    populationRank: 8,
    population: 3260,
    origin: '出自嬴姓，伯益之后，受封于黄，子孙以国为氏。黄国为楚所灭，后人以国为姓。',
    originPlace: { name: '潢川(黄国)', lng: 115.0, lat: 32.1 },
    originPeriod: '西周',
    junwang: [
      { name: '江夏郡', location: '湖北武汉', lng: 114.3, lat: 30.6, tanghao: '江夏堂' },
      { name: '濮阳郡', location: '河南濮阳', lng: 115.0, lat: 35.8, tanghao: '濮阳堂' },
    ],
    migration: [
      { name: '潢川', lng: 115.0, lat: 32.1, period: '西周', reason: '黄国故地，嬴姓黄氏发祥' },
      { name: '江夏', lng: 114.3, lat: 30.6, period: '汉', reason: '黄香"扇枕温衾"，江夏黄氏始祖' },
      { name: '固始', lng: 115.7, lat: 32.2, period: '唐', reason: '黄鞠随王审知入闽' },
      { name: '邵武', lng: 117.5, lat: 27.3, period: '宋', reason: '黄峭山遣二十一子散播各地' },
      { name: '梅州', lng: 116.1, lat: 24.3, period: '宋元', reason: '客家黄氏入粤，今为客家大姓' },
    ],
    figures: [
      { name: '黄香', dynasty: '汉', achievement: '二十四孝，江夏黄氏始祖' },
      { name: '黄庭坚', dynasty: '北宋', achievement: '江西诗派开山，书法宋四家' },
      { name: '黄道婆', dynasty: '元', achievement: '棉纺织革新者' },
      { name: '黄宗羲', dynasty: '清', achievement: '思想大师，梨洲学派' },
    ],
    totem: '黄字本义为佩玉。图腾为龟（玄武），北方玄武主水，黄字古文似龟形。',
    history: '黄姓源于嬴姓，黄国灭后以国为氏。江夏黄氏最盛，黄香二十四孝传为佳话。唐末入闽，黄峭山遣子散播，使黄姓成为南方大姓，闽粤台极盛。',
  },
  {
    surname: '周',
    pinyin: 'Zhōu',
    rank: 5,
    populationRank: 9,
    population: 2530,
    origin: '出自姬姓，周平王少子烈封于汝坟，后裔周仁封汝坟侯。亦出自周王室后裔以朝代名为氏。',
    originPlace: { name: '汝南(汝坟)', lng: 114.4, lat: 33.0 },
    originPeriod: '东周',
    junwang: [
      { name: '汝南郡', location: '河南汝南', lng: 114.4, lat: 33.0, tanghao: '汝南堂' },
      { name: '庐江郡', location: '安徽庐江', lng: 117.3, lat: 31.2, tanghao: '庐江堂' },
    ],
    migration: [
      { name: '汝南', lng: 114.4, lat: 33.0, period: '东周', reason: '周平王少子封汝坟，周氏发祥' },
      { name: '庐江', lng: 117.3, lat: 31.2, period: '汉', reason: '周瑜家族居庐江舒县' },
      { name: '道州', lng: 111.6, lat: 25.5, period: '唐', reason: '周敦颐先世迁湖南' },
      { name: '苏州', lng: 120.6, lat: 31.3, period: '宋', reason: '周氏南迁江南，文人辈出' },
      { name: '梅州', lng: 116.1, lat: 24.3, period: '元', reason: '客家周氏入粤' },
    ],
    figures: [
      { name: '周瑜', dynasty: '三国', achievement: '赤壁之战，东吴名将' },
      { name: '周敦颐', dynasty: '北宋', achievement: '理学开山，爱莲说' },
      { name: '周邦彦', dynasty: '北宋', achievement: '词中老杜' },
      { name: '周恩来', dynasty: '近代', achievement: '共和国总理' },
    ],
    totem: '周字从田从口，本义为田畴密布、人口稠密之地。图腾为农田与城邑。',
    history: '周姓源于姬姓周王室，以朝代名得姓。汝南周氏为郡望，周瑜显于三国。南迁后江南周氏文人辈出，周敦颐开理学，今遍布全国。',
  },
  {
    surname: '吴',
    pinyin: 'Wú',
    rank: 6,
    populationRank: 10,
    population: 2460,
    origin: '出自姬姓，周太王长子太伯、仲雍让位南奔荆蛮，建吴国，子孙以国为氏。',
    originPlace: { name: '无锡(梅里)', lng: 120.3, lat: 31.5 },
    originPeriod: '商末',
    junwang: [
      { name: '延陵郡', location: '江苏丹阳', lng: 119.6, lat: 32.0, tanghao: '延陵堂' },
      { name: '濮阳郡', location: '河南濮阳', lng: 115.0, lat: 35.8, tanghao: '濮阳堂' },
    ],
    migration: [
      { name: '无锡', lng: 120.3, lat: 31.5, period: '商末', reason: '太伯奔吴，建都梅里' },
      { name: '苏州', lng: 120.6, lat: 31.3, period: '春秋', reason: '吴王阖闾迁都姑苏' },
      { name: '延陵', lng: 119.6, lat: 32.0, period: '春秋', reason: '季札封延陵，延陵季子' },
      { name: '蒲圻', lng: 114.3, lat: 29.7, period: '唐', reason: '吴氏入江西，广传南方' },
      { name: '潮汕', lng: 116.6, lat: 23.2, period: '宋元', reason: '客家吴氏南迁粤东' },
    ],
    figures: [
      { name: '太伯', dynasty: '商末', achievement: '三让王位，吴氏始祖' },
      { name: '季札', dynasty: '春秋', achievement: '延陵季子，让国挂剑' },
      { name: '吴道子', dynasty: '唐', achievement: '画圣' },
      { name: '吴承恩', dynasty: '明', achievement: '西游记作者' },
    ],
    totem: '吴字从口从矢，本义为大呼奔跑。图腾为手持兽皮大呼之猎人，象征尚武。',
    history: '吴姓源于太伯仲雍让国南奔。延陵季子让国传为美谈，吴国一度称霸。南迁后吴姓在江南、闽粤繁盛，"延陵世泽"为堂号。',
  },
  {
    surname: '徐',
    pinyin: 'Xú',
    rank: 150,
    populationRank: 11,
    population: 2020,
    origin: '出自嬴姓，伯益之子若木封于徐，建徐国，子孙以国为氏。',
    originPlace: { name: '郯城(徐国)', lng: 118.4, lat: 34.6 },
    originPeriod: '夏',
    junwang: [
      { name: '东海郡', location: '山东郯城', lng: 118.4, lat: 34.6, tanghao: '东海堂' },
      { name: '琅琊郡', location: '山东临沂', lng: 118.4, lat: 35.0, tanghao: '琅琊堂' },
    ],
    migration: [
      { name: '郯城', lng: 118.4, lat: 34.6, period: '夏', reason: '若木封徐，徐国故地' },
      { name: '东海', lng: 118.4, lat: 34.6, period: '汉', reason: '徐氏聚东海，为第一大郡望' },
      { name: '南昌', lng: 115.9, lat: 28.7, period: '唐', reason: '徐孺子居南昌，高士传名' },
      { name: '邵武', lng: 117.5, lat: 27.3, period: '宋', reason: '客家徐氏入闽' },
      { name: '潮汕', lng: 116.6, lat: 23.2, period: '宋元', reason: '徐氏入粤繁衍' },
    ],
    figures: [
      { name: '徐福', dynasty: '秦', achievement: '东渡求仙，传说到日本' },
      { name: '徐稚', dynasty: '东汉', achievement: '徐孺子，南昌高士' },
      { name: '徐达', dynasty: '明', achievement: '开国第一功臣' },
      { name: '徐霞客', dynasty: '明', achievement: '地理学家，游记大家' },
    ],
    totem: '徐字从彳从余，本义为缓行。图腾为玄鸟（燕子），嬴姓共祖少昊之徽。',
    history: '徐姓源于嬴姓，徐国为徐戎所建。东海徐氏最大，徐福东渡成千古之谜。南迁后遍布江南，徐达佐明开国，徐霞客以游记传世。',
  },
  {
    surname: '孙',
    pinyin: 'Sūn',
    rank: 3,
    populationRank: 12,
    population: 1940,
    origin: '出自姬姓，卫武公子惠孙，孙氏以字为氏。亦出自妫姓田齐之后，田书赐姓孙。又出自芈姓蒍氏孙叔敖之后。',
    originPlace: { name: '濮阳(卫国)', lng: 115.0, lat: 35.8 },
    originPeriod: '春秋',
    junwang: [
      { name: '乐安郡', location: '山东广饶', lng: 118.4, lat: 37.1, tanghao: '乐安堂' },
      { name: '东莞郡', location: '山东沂水', lng: 118.6, lat: 35.8, tanghao: '东莞堂' },
    ],
    migration: [
      { name: '濮阳', lng: 115.0, lat: 35.8, period: '春秋', reason: '卫武公子惠孙，孙氏得姓' },
      { name: '乐安', lng: 118.4, lat: 37.1, period: '齐', reason: '田书赐姓孙，食采乐安，孙武祖籍' },
      { name: '苏州', lng: 120.6, lat: 31.3, period: '春秋', reason: '孙武奔吴，著兵法' },
      { name: '富春', lng: 119.9, lat: 30.0, period: '汉', reason: '孙坚家族居富春，开东吴孙氏' },
      { name: '中山', lng: 115.0, lat: 38.4, period: '近代', reason: '孙中山先生祖籍，革命先驱' },
    ],
    figures: [
      { name: '孙武', dynasty: '春秋', achievement: '兵圣，著孙子兵法' },
      { name: '孙膑', dynasty: '战国', achievement: '孙膑兵法，围魏救赵' },
      { name: '孙权', dynasty: '三国', achievement: '东吴大帝' },
      { name: '孙中山', dynasty: '近代', achievement: '革命先行者，国父' },
    ],
    totem: '孙字从子从系，本义为子之系绪。图腾为玄鸟之卵，殷商共祖。',
    history: '孙姓源头多元，姬姓、妫姓、芈姓皆有。乐安孙氏出孙武、孙膑兵法世家，富春孙氏建东吴。近代孙中山开创新纪元。',
  },
  {
    surname: '胡',
    pinyin: 'Hú',
    rank: 79,
    populationRank: 13,
    population: 1820,
    origin: '出自妫姓，陈胡公妫满之后，以谥为氏。亦出自姬姓、归姓等。',
    originPlace: { name: '淮阳(陈国)', lng: 114.9, lat: 33.7 },
    originPeriod: '西周',
    junwang: [
      { name: '安定郡', location: '甘肃泾川', lng: 107.4, lat: 35.3, tanghao: '安定堂' },
      { name: '新蔡郡', location: '河南新蔡', lng: 114.9, lat: 32.8, tanghao: '新蔡堂' },
    ],
    migration: [
      { name: '淮阳', lng: 114.9, lat: 33.7, period: '西周', reason: '妫满谥胡公，后裔以谥为氏' },
      { name: '安定', lng: 107.4, lat: 35.3, period: '汉', reason: '胡建迁安定，开安定胡氏' },
      { name: '庐陵', lng: 114.9, lat: 27.1, period: '唐', reason: '胡赟迁江西，开华林胡氏' },
      { name: '婺源', lng: 117.9, lat: 29.2, period: '宋', reason: '胡氏居徽州，明经胡氏兴' },
      { name: '绩溪', lng: 118.6, lat: 30.1, period: '近代', reason: '胡适故里，明经胡氏后裔' },
    ],
    figures: [
      { name: '胡瑗', dynasty: '北宋', achievement: '安定先生，理学先驱' },
      { name: '胡安国', dynasty: '南宋', achievement: '春秋胡传' },
      { name: '胡雪岩', dynasty: '清', achievement: '红顶商人' },
      { name: '胡适', dynasty: '近代', achievement: '新文化运动领袖' },
    ],
    totem: '胡字从肉从月，古同"髦"，本义为颔下之毛。图腾为白虎（少昊）。',
    history: '胡姓多源，主出妫姓胡公满。安定胡氏最古，华林胡氏南迁最盛。明经胡氏出胡适，影响近代。今南方胡姓尤多。',
  },
  {
    surname: '朱',
    pinyin: 'Zhū',
    rank: 17,
    populationRank: 14,
    population: 1810,
    origin: '出自曹姓，颛顼之后晏安封曹，曹侠封邾，邾为楚灭，子孙去邑为朱氏。',
    originPlace: { name: '邹城(邾国)', lng: 116.9, lat: 35.5 },
    originPeriod: '西周',
    junwang: [
      { name: '沛郡', location: '江苏沛县', lng: 116.8, lat: 34.7, tanghao: '沛国堂' },
      { name: '吴郡', location: '江苏苏州', lng: 120.6, lat: 31.3, tanghao: '吴郡堂' },
    ],
    migration: [
      { name: '邹城', lng: 116.9, lat: 35.5, period: '西周', reason: '曹侠封邾，邾国故地' },
      { name: '沛国', lng: 116.8, lat: 34.7, period: '汉', reason: '朱氏迁沛，为最大郡望' },
      { name: '婺源', lng: 117.9, lat: 29.2, period: '唐', reason: '朱环镇婺源，开紫阳朱氏' },
      { name: '建阳', lng: 118.1, lat: 27.3, period: '宋', reason: '朱熹居考亭，考亭学派' },
      { name: '凤阳', lng: 117.6, lat: 32.9, period: '明', reason: '朱元璋建明，朱氏成皇族' },
    ],
    figures: [
      { name: '朱熹', dynasty: '南宋', achievement: '理学集大成者，朱子' },
      { name: '朱元璋', dynasty: '明', achievement: '明太祖，草根天子' },
      { name: '朱棣', dynasty: '明', achievement: '永乐帝，迁都北京' },
      { name: '朱自清', dynasty: '近代', achievement: '散文家' },
    ],
    totem: '朱字本义为赤心木（松柏类）。图腾为赤色树木，象征南方火德。',
    history: '朱姓源于曹姓邾国，去邑为朱。沛国朱氏为郡望，朱熹集理学大成，朱元璋建明使朱姓成皇族，人口大增。',
  },
  {
    surname: '高',
    pinyin: 'Gāo',
    rank: 153,
    populationRank: 15,
    population: 1710,
    origin: '出自姜姓，齐太公六世孙文公之子公子高，孙傒以祖字为氏。亦出自姬姓高氏。',
    originPlace: { name: '淄博(齐国)', lng: 118.1, lat: 36.8 },
    originPeriod: '春秋',
    junwang: [
      { name: '渤海郡', location: '河北沧州', lng: 116.8, lat: 38.3, tanghao: '渤海堂' },
      { name: '渔阳郡', location: '北京密云', lng: 116.8, lat: 40.4, tanghao: '渔阳堂' },
    ],
    migration: [
      { name: '淄博', lng: 118.1, lat: 36.8, period: '春秋', reason: '高傒佐齐桓公，高氏得姓于齐' },
      { name: '渤海', lng: 116.8, lat: 38.3, period: '汉', reason: '高氏迁渤海，成最大郡望' },
      { name: '洛阳', lng: 112.4, lat: 34.6, period: '北魏', reason: '高欢掌东魏，北齐皇族' },
      { name: '苏州', lng: 120.6, lat: 31.3, period: '宋', reason: '高氏南迁江南' },
      { name: '漳州', lng: 117.7, lat: 24.5, period: '宋元', reason: '客家高氏入闽' },
    ],
    figures: [
      { name: '高俅', dynasty: '北宋', achievement: '水浒传中之权臣（文学形象）' },
      { name: '高适', dynasty: '唐', achievement: '边塞诗人' },
      { name: '高鹗', dynasty: '清', achievement: '续红楼梦' },
      { name: '高剑父', dynasty: '近代', achievement: '岭南画派创始人' },
    ],
    totem: '高字象形为高台建筑。图腾为高楼观象台，象征观天测影之职。',
    history: '高姓主出姜姓齐国，高傒佐齐桓公得姓。渤海高氏最盛，北齐高氏为皇族。南迁后遍布江南，今南北皆有。',
  },
  {
    surname: '林',
    pinyin: 'Lín',
    rank: 147,
    populationRank: 16,
    population: 1620,
    origin: '出自子姓，比干之子坚逃难长林之山，周武王赐姓林。亦出自姬姓，周平王庶子林开之后。',
    originPlace: { name: '卫辉(牧野)', lng: 114.0, lat: 35.4 },
    originPeriod: '商末',
    junwang: [
      { name: '西河郡', location: '河南安阳', lng: 114.4, lat: 36.1, tanghao: '西河堂' },
      { name: '济南郡', location: '山东济南', lng: 117.0, lat: 36.7, tanghao: '济南堂' },
    ],
    migration: [
      { name: '卫辉', lng: 114.0, lat: 35.4, period: '商末', reason: '比干死节，子坚逃长林得姓' },
      { name: '济南', lng: 117.0, lat: 36.7, period: '汉', reason: '林氏迁济南，成最大郡望' },
      { name: '莆田', lng: 119.0, lat: 25.4, period: '晋', reason: '林禄入闽，开闽林氏始祖' },
      { name: '漳州', lng: 117.7, lat: 24.5, period: '唐', reason: '林氏繁衍闽南，号称"无林不开榜"' },
      { name: '潮汕', lng: 116.6, lat: 23.2, period: '宋元', reason: '客家林氏入粤' },
    ],
    figures: [
      { name: '林禄', dynasty: '晋', achievement: '入闽始祖，晋安郡王' },
      { name: '林默娘', dynasty: '宋', achievement: '妈祖天后，海上保护神' },
      { name: '林则徐', dynasty: '清', achievement: '虎门销烟，民族英雄' },
      { name: '林语堂', dynasty: '近代', achievement: '文学大师' },
    ],
    totem: '林字从二木，本义为成片之树。图腾为双木（林），象征山林聚居。',
    history: '林姓源于比干之后，逃长林得姓。济南林氏为郡望，林禄入闽开闽林，妈祖林默娘、林则徐皆其后。闽粤台林姓极盛，"陈林半天下"。',
  },
  {
    surname: '何',
    pinyin: 'Hé',
    rank: 21,
    populationRank: 17,
    population: 1480,
    origin: '出自姬姓，韩王安之后，韩灭于秦，子孙避难江淮，因音近改韩为何。',
    originPlace: { name: '新郑(韩国)', lng: 113.7, lat: 34.4 },
    originPeriod: '战国',
    junwang: [
      { name: '庐江郡', location: '安徽庐江', lng: 117.3, lat: 31.2, tanghao: '庐江堂' },
      { name: '东海郡', location: '山东郯城', lng: 118.4, lat: 34.6, tanghao: '东海堂' },
    ],
    migration: [
      { name: '新郑', lng: 113.7, lat: 34.4, period: '战国', reason: '韩王安之后，韩国故地' },
      { name: '庐江', lng: 117.3, lat: 31.2, period: '秦', reason: '韩氏避难江淮，改姓何，开庐江何氏' },
      { name: '郯城', lng: 118.4, lat: 34.6, period: '汉', reason: '何氏一支迁东海' },
      { name: '漳州', lng: 117.7, lat: 24.5, period: '唐', reason: '何氏入闽繁衍' },
      { name: '潮汕', lng: 116.6, lat: 23.2, period: '宋', reason: '客家何氏入粤' },
    ],
    figures: [
      { name: '何晏', dynasty: '魏晋', achievement: '玄学领袖' },
      { name: '何景明', dynasty: '明', achievement: '前七子之一' },
      { name: '何绍基', dynasty: '清', achievement: '书法大家' },
      { name: '何子渊', dynasty: '近代', achievement: '辛亥革命元老' },
    ],
    totem: '何字从人从可，本义为担荷。图腾为背负重物之人，象征担当。',
    history: '何姓源于韩氏避难改姓，"韩为何"为千古佳话。庐江何氏最大，南迁后遍布闽粤，客家何姓尤多。',
  },
  {
    surname: '郭',
    pinyin: 'Guō',
    rank: 144,
    populationRank: 18,
    population: 1380,
    origin: '出自姬姓，周武王封弟叔虞于虢，后裔以国为氏，虢转郭。亦出自任姓等。',
    originPlace: { name: '宝鸡(西虢)', lng: 107.1, lat: 34.4 },
    originPeriod: '西周',
    junwang: [
      { name: '太原郡', location: '山西太原', lng: 112.5, lat: 37.9, tanghao: '太原堂' },
      { name: '华阴郡', location: '陕西华阴', lng: 110.1, lat: 34.6, tanghao: '华阴堂' },
    ],
    migration: [
      { name: '宝鸡', lng: 107.1, lat: 34.4, period: '西周', reason: '虢叔封西虢，郭氏发祥' },
      { name: '太原', lng: 112.5, lat: 37.9, period: '汉', reason: '郭氏迁太原，成最大郡望' },
      { name: '汾阳', lng: 111.8, lat: 37.3, period: '唐', reason: '郭子仪封汾阳王，汾阳郭氏' },
      { name: '泉州', lng: 118.6, lat: 24.9, period: '宋', reason: '郭氏入闽，回族郭氏兴' },
      { name: '潮汕', lng: 116.6, lat: 23.2, period: '宋元', reason: '客家郭氏入粤' },
    ],
    figures: [
      { name: '郭泰', dynasty: '东汉', achievement: '党锢之祸名士，太原郭氏' },
      { name: '郭子仪', dynasty: '唐', achievement: '平定安史之乱，汾阳王' },
      { name: '郭守敬', dynasty: '元', achievement: '天文学家，授时历' },
      { name: '郭沫若', dynasty: '近代', achievement: '文学家、史学家' },
    ],
    totem: '郭字从阝从享，本义为外城墙。图腾为城郭，象征守卫之城。',
    history: '郭姓源于虢国，虢转郭。太原郭氏最盛，郭子仪再造大唐，封汾阳王，子孙以"汾阳"为堂号。回族郭氏为闽泉特色。',
  },
  {
    surname: '马',
    pinyin: 'Mǎ',
    rank: 52,
    populationRank: 19,
    population: 1280,
    origin: '出自嬴姓，赵奢封马服君，子孙以官封为氏，后省为马。亦出自西域马氏、回族马氏。',
    originPlace: { name: '邯郸(马服)', lng: 114.5, lat: 36.1 },
    originPeriod: '战国',
    junwang: [
      { name: '扶风郡', location: '陕西兴平', lng: 108.5, lat: 34.3, tanghao: '扶风堂' },
      { name: '京兆郡', location: '陕西西安', lng: 108.9, lat: 34.3, tanghao: '京兆堂' },
    ],
    migration: [
      { name: '邯郸', lng: 114.5, lat: 36.1, period: '战国', reason: '赵奢封马服君，马氏发祥' },
      { name: '扶风', lng: 108.5, lat: 34.3, period: '汉', reason: '马援居茂陵，伏波将军，扶风马氏' },
      { name: '洛阳', lng: 112.4, lat: 34.6, period: '东汉', reason: '马融讲学，门徒千人' },
      { name: '临安', lng: 120.2, lat: 30.3, period: '宋', reason: '马氏南迁江南' },
      { name: '西北', lng: 103.8, lat: 36.1, period: '元明清', reason: '回族马氏繁衍，西北大姓' },
    ],
    figures: [
      { name: '马援', dynasty: '东汉', achievement: '伏波将军，马革裹尸' },
      { name: '马融', dynasty: '东汉', achievement: '经学大师' },
      { name: '马致远', dynasty: '元', achievement: '曲状元，天净沙' },
      { name: '马寅初', dynasty: '近代', achievement: '经济学家' },
    ],
    totem: '马字象形为马。图腾为战马，赵奢以骑战封君，马氏尚武。',
    history: '马姓源于赵奢封马服君。扶风马氏最盛，马援马革裹尸传为壮志。回族马氏为西北大姓，使马姓在西北极盛。',
  },
  {
    surname: '罗',
    pinyin: 'Luó',
    rank: 75,
    populationRank: 20,
    population: 1240,
    origin: '出自妘姓，颛顼之后祝融氏，封于罗国，为楚所灭，子孙以国为氏。',
    originPlace: { name: '宜城(罗国)', lng: 112.0, lat: 31.7 },
    originPeriod: '周',
    junwang: [
      { name: '豫章郡', location: '江西南昌', lng: 115.9, lat: 28.7, tanghao: '豫章堂' },
      { name: '长沙郡', location: '湖南长沙', lng: 112.9, lat: 28.2, tanghao: '长沙堂' },
    ],
    migration: [
      { name: '宜城', lng: 112.0, lat: 31.7, period: '周', reason: '罗国故地，妘姓罗氏发祥' },
      { name: '枝江', lng: 111.7, lat: 30.4, period: '春秋', reason: '罗为楚灭，迁枝江' },
      { name: '长沙', lng: 112.9, lat: 28.2, period: '汉', reason: '罗氏南迁长沙' },
      { name: '南昌', lng: 115.9, lat: 28.7, period: '晋', reason: '罗氏居豫章，成最大郡望' },
      { name: '宁化', lng: 116.6, lat: 26.3, period: '宋', reason: '罗氏入闽，客家罗氏始祖' },
    ],
    figures: [
      { name: '罗隐', dynasty: '唐', achievement: '诗人，"今朝有酒今朝醉"' },
      { name: '罗从彦', dynasty: '北宋', achievement: '理学豫章先生' },
      { name: '罗贯中', dynasty: '元明', achievement: '三国演义作者' },
      { name: '罗荣桓', dynasty: '近代', achievement: '元帅' },
    ],
    totem: '罗字从网从维，本义为捕鸟之网。图腾为罗网与飞鸟，祝融氏之徽。',
    history: '罗姓源于妘姓罗国，国灭南迁。豫章罗氏最大，客家罗氏多出宁化。罗贯中著三国，名扬天下。',
  },
  {
    surname: '梁',
    pinyin: 'Liáng',
    rank: 128,
    populationRank: 21,
    population: 1130,
    origin: '出自嬴姓，伯益之后，秦仲有功封少子康于梁山，建梁国，为秦所灭，子孙以国为氏。',
    originPlace: { name: '韩城(梁国)', lng: 110.4, lat: 35.5 },
    originPeriod: '西周',
    junwang: [
      { name: '安定郡', location: '甘肃泾川', lng: 107.4, lat: 35.3, tanghao: '安定堂' },
      { name: '天水郡', location: '甘肃天水', lng: 105.7, lat: 34.6, tanghao: '天水堂' },
    ],
    migration: [
      { name: '韩城', lng: 110.4, lat: 35.5, period: '西周', reason: '梁康伯封梁，梁国故地' },
      { name: '安定', lng: 107.4, lat: 35.3, period: '汉', reason: '梁氏迁安定，成最大郡望' },
      { name: '洛阳', lng: 112.4, lat: 34.6, period: '东汉', reason: '梁冀专权，外戚盛极' },
      { name: '福州', lng: 119.3, lat: 26.1, period: '唐', reason: '梁氏入闽' },
      { name: '梅州', lng: 116.1, lat: 24.3, period: '宋', reason: '客家梁氏入粤' },
    ],
    figures: [
      { name: '梁鸿', dynasty: '东汉', achievement: '举案齐眉，高士' },
      { name: '梁漱溟', dynasty: '近代', achievement: '现代新儒家' },
      { name: '梁启超', dynasty: '近代', achievement: '维新领袖，史学家' },
      { name: '梁思成', dynasty: '近代', achievement: '建筑学家' },
    ],
    totem: '梁字从木从水从刃，本义为桥梁。图腾为水桥，象征沟通两岸。',
    history: '梁姓源于嬴姓梁国。安定梁氏最盛，东汉梁冀盛极。南迁后闽粤梁氏繁衍，近代梁启超一门三家学者传佳话。',
  },
  {
    surname: '宋',
    pinyin: 'Sòng',
    rank: 118,
    populationRank: 22,
    population: 972,
    origin: '出自子姓，微子启封于宋，宋为齐楚魏所灭，子孙以国为氏。',
    originPlace: { name: '商丘(宋国)', lng: 115.7, lat: 34.4 },
    originPeriod: '西周',
    junwang: [
      { name: '京兆郡', location: '陕西西安', lng: 108.9, lat: 34.3, tanghao: '京兆堂' },
      { name: '广平郡', location: '河北邯郸', lng: 114.5, lat: 36.4, tanghao: '广平堂' },
    ],
    migration: [
      { name: '商丘', lng: 115.7, lat: 34.4, period: '西周', reason: '微子启封宋，宋国故地' },
      { name: '京兆', lng: 108.9, lat: 34.3, period: '汉', reason: '宋氏西迁长安，成京兆郡望' },
      { name: '广平', lng: 114.5, lat: 36.4, period: '南北朝', reason: '宋璟祖籍广平，名相' },
      { name: '梅州', lng: 116.1, lat: 24.3, period: '宋元', reason: '客家宋氏南迁' },
      { name: '文昌', lng: 110.8, lat: 19.5, period: '明', reason: '宋氏入琼，宋庆龄祖籍' },
    ],
    figures: [
      { name: '宋璟', dynasty: '唐', achievement: '开元名相' },
      { name: '宋应星', dynasty: '明', achievement: '天工开物作者' },
      { name: '宋教仁', dynasty: '近代', achievement: '宪政先驱' },
      { name: '宋庆龄', dynasty: '近代', achievement: '国家名誉主席' },
    ],
    totem: '宋字从宀从木，本义为居所旁之树木。图腾为家屋与桑木，象征定居农耕。',
    history: '宋姓源于子姓宋国，微子启为始祖。京兆宋氏最大，宋璟开元名相。近代宋氏家族影响中国命运，宋庆龄为代表性人物。',
  },
  {
    surname: '郑',
    pinyin: 'Zhèng',
    rank: 7,
    populationRank: 23,
    population: 936,
    origin: '出自姬姓，周宣王封弟友于郑，郑桓公，后郑国为韩所灭，子孙以国为氏。',
    originPlace: { name: '华县(郑国)', lng: 109.8, lat: 34.5 },
    originPeriod: '西周',
    junwang: [
      { name: '荥阳郡', location: '河南荥阳', lng: 113.4, lat: 34.8, tanghao: '荥阳堂' },
      { name: '陇西郡', location: '甘肃临洮', lng: 103.9, lat: 35.4, tanghao: '陇西堂' },
    ],
    migration: [
      { name: '华县', lng: 109.8, lat: 34.5, period: '西周', reason: '郑桓公初封，郑国发祥' },
      { name: '新郑', lng: 113.7, lat: 34.4, period: '春秋', reason: '郑武公迁新郑，郑国鼎盛' },
      { name: '荥阳', lng: 113.4, lat: 34.8, period: '汉', reason: '郑氏居荥阳，成最大郡望' },
      { name: '莆田', lng: 119.0, lat: 25.4, period: '唐', reason: '郑氏入闽繁衍' },
      { name: '潮汕', lng: 116.6, lat: 23.2, period: '宋元', reason: '客家郑氏入粤' },
    ],
    figures: [
      { name: '郑玄', dynasty: '东汉', achievement: '经学集大成者，郑学' },
      { name: '郑成功', dynasty: '明末', achievement: '收复台湾，民族英雄' },
      { name: '郑和', dynasty: '明', achievement: '七下西洋' },
      { name: '郑板桥', dynasty: '清', achievement: '扬州八怪之一' },
    ],
    totem: '郑字从关从阝，本义为城邑关隘。图腾为关城，象征守卫。',
    history: '郑姓源于姬姓郑国。荥阳郑氏为最大郡望，郑玄集经学大成。郑成功收复台湾、郑和下西洋，皆为民族壮举。',
  },
  {
    surname: '谢',
    pinyin: 'Xiè',
    rank: 36,
    populationRank: 24,
    population: 870,
    origin: '出自姜姓，申伯封于谢，子孙以邑为氏。亦出自任姓谢氏。',
    originPlace: { name: '南阳(谢邑)', lng: 112.5, lat: 33.0 },
    originPeriod: '西周',
    junwang: [
      { name: '陈留郡', location: '河南开封', lng: 114.3, lat: 34.8, tanghao: '陈留堂' },
      { name: '会稽郡', location: '浙江绍兴', lng: 120.6, lat: 30.0, tanghao: '会稽堂' },
    ],
    migration: [
      { name: '南阳', lng: 112.5, lat: 33.0, period: '西周', reason: '申伯封谢邑，谢氏发祥' },
      { name: '陈留', lng: 114.3, lat: 34.8, period: '汉', reason: '谢氏迁陈留，成郡望' },
      { name: '建康', lng: 118.8, lat: 32.1, period: '东晋', reason: '谢安家族南渡，"旧时王谢堂前燕"' },
      { name: '梅州', lng: 116.1, lat: 24.3, period: '宋元', reason: '客家谢氏入粤' },
      { name: '潮汕', lng: 116.6, lat: 23.2, period: '明清', reason: '谢氏繁衍粤东' },
    ],
    figures: [
      { name: '谢安', dynasty: '东晋', achievement: '淝水之战，风流宰相' },
      { name: '谢灵运', dynasty: '南朝', achievement: '山水诗派开山' },
      { name: '谢朓', dynasty: '南齐', achievement: '永明体诗人' },
      { name: '谢晋', dynasty: '近代', achievement: '电影导演' },
    ],
    totem: '谢字从言从射，本义为辞谢。图腾为射箭辞让，象征礼让射艺。',
    history: '谢姓源于姜姓申伯封谢。东晋谢安家族与王氏并称"王谢"，淝水之战保东晋。南迁后闽粤谢氏繁盛，多出文化名人。',
  },
  {
    surname: '韩',
    pinyin: 'Hán',
    rank: 15,
    populationRank: 25,
    population: 825,
    origin: '出自姬姓，周武王子唐叔虞封晋，后裔曲沃桓叔子韩万封于韩原，子孙以邑为氏。',
    originPlace: { name: '韩城(韩原)', lng: 110.4, lat: 35.5 },
    originPeriod: '春秋',
    junwang: [
      { name: '南阳郡', location: '河南南阳', lng: 112.5, lat: 33.0, tanghao: '南阳堂' },
      { name: '颍川郡', location: '河南禹州', lng: 113.5, lat: 34.2, tanghao: '颍川堂' },
    ],
    migration: [
      { name: '韩城', lng: 110.4, lat: 35.5, period: '春秋', reason: '韩万封韩原，韩氏发祥' },
      { name: '新郑', lng: 113.7, lat: 34.4, period: '战国', reason: '韩氏建韩国，战国七雄' },
      { name: '颍川', lng: 113.5, lat: 34.2, period: '汉', reason: '韩氏居颍川，成郡望' },
      { name: '南阳', lng: 112.5, lat: 33.0, period: '唐', reason: '韩愈祖籍南阳，唐宋八大家' },
      { name: '潮汕', lng: 116.6, lat: 23.2, period: '宋元', reason: '客家韩氏入粤' },
    ],
    figures: [
      { name: '韩非', dynasty: '战国', achievement: '法家集大成者' },
      { name: '韩信', dynasty: '汉', achievement: '兵仙，汉初三杰' },
      { name: '韩愈', dynasty: '唐', achievement: '唐宋八大家之首，文起八代之衰' },
      { name: '韩世忠', dynasty: '南宋', achievement: '抗金名将' },
    ],
    totem: '韩字从韦从倝，本义为井垣。图腾为井栏，象征水井聚居。',
    history: '韩姓源于姬姓韩原。韩国为战国七雄，韩非集法家。韩信兵仙，韩愈文起八代之衰，皆为韩姓之光。',
  },
  {
    surname: '唐',
    pinyin: 'Táng',
    rank: 64,
    populationRank: 26,
    population: 780,
    origin: '出自姬姓，周成王封弟叔虞于唐，子孙以国为氏。亦出自祁姓尧之后唐侯。',
    originPlace: { name: '太原(唐国)', lng: 112.5, lat: 37.9 },
    originPeriod: '西周',
    junwang: [
      { name: '晋昌郡', location: '山西定襄', lng: 112.9, lat: 38.5, tanghao: '晋昌堂' },
      { name: '北海郡', location: '山东潍坊', lng: 119.1, lat: 36.7, tanghao: '北海堂' },
    ],
    migration: [
      { name: '太原', lng: 112.5, lat: 37.9, period: '西周', reason: '唐叔虞封唐，唐氏发祥' },
      { name: '晋昌', lng: 112.9, lat: 38.5, period: '汉', reason: '唐氏居晋昌，成郡望' },
      { name: '太原', lng: 112.5, lat: 37.9, period: '北朝', reason: '唐瑶家族居晋昌' },
      { name: '荆州', lng: 112.2, lat: 30.3, period: '宋', reason: '唐氏南迁荆楚' },
      { name: '梅州', lng: 116.1, lat: 24.3, period: '元', reason: '客家唐氏入粤' },
    ],
    figures: [
      { name: '唐婉', dynasty: '南宋', achievement: '陆游表妹，钗头凤' },
      { name: '唐寅', dynasty: '明', achievement: '唐伯虎，江南四大才子' },
      { name: '唐顺之', dynasty: '明', achievement: '嘉靖八才子' },
      { name: '唐绍仪', dynasty: '近代', achievement: '民国首任内阁总理' },
    ],
    totem: '唐字从庚从口，本义为大言。图腾为陶唐氏（尧）之号，象征光明盛大。',
    history: '唐姓源于姬姓唐叔虞。晋昌唐氏最大，明代唐寅风流才子名扬天下。南迁后遍布湘粤。',
  },
  {
    surname: '冯',
    pinyin: 'Féng',
    rank: 9,
    populationRank: 27,
    population: 760,
    origin: '出自姬姓，周文王子毕公高之后毕万封于冯城，子孙以邑为氏。',
    originPlace: { name: '荥阳(冯城)', lng: 113.4, lat: 34.8 },
    originPeriod: '春秋',
    junwang: [
      { name: '杜陵郡', location: '陕西西安', lng: 108.9, lat: 34.3, tanghao: '杜陵堂' },
      { name: '颍川郡', location: '河南禹州', lng: 113.5, lat: 34.2, tanghao: '颍川堂' },
    ],
    migration: [
      { name: '荥阳', lng: 113.4, lat: 34.8, period: '春秋', reason: '毕万封冯城，冯氏发祥' },
      { name: '杜陵', lng: 108.9, lat: 34.3, period: '汉', reason: '冯唐居杜陵，"冯唐易老"' },
      { name: '颍川', lng: 113.5, lat: 34.2, period: '汉', reason: '冯氏居长社，成郡望' },
      { name: '宁化', lng: 116.6, lat: 26.3, period: '唐', reason: '冯氏入闽' },
      { name: '潮汕', lng: 116.6, lat: 23.2, period: '宋', reason: '客家冯氏入粤' },
    ],
    figures: [
      { name: '冯唐', dynasty: '汉', achievement: '"冯唐易老"，直言名臣' },
      { name: '冯道', dynasty: '五代', achievement: '历四朝十帝，长乐老' },
      { name: '冯子材', dynasty: '清', achievement: '镇南关大捷抗法' },
      { name: '冯友兰', dynasty: '近代', achievement: '哲学家，贞元六书' },
    ],
    totem: '冯字从冫从马，本义为马奔驰。图腾为奔马，象征迅捷。',
    history: '冯姓源于姬姓毕万之后。杜陵冯唐"易老"传世，颍川冯氏为郡望。南迁后遍布闽粤，近代冯友兰成哲学大家。',
  },
  {
    surname: '于',
    pinyin: 'Yú',
    rank: 82,
    populationRank: 28,
    population: 740,
    origin: '出自姬姓，周武王第三子邘叔封于邘，子孙去邑为于。亦出自子姓等。',
    originPlace: { name: '沁阳(邘国)', lng: 112.9, lat: 35.1 },
    originPeriod: '西周',
    junwang: [
      { name: '东海郡', location: '山东郯城', lng: 118.4, lat: 34.6, tanghao: '东海堂' },
      { name: '河内郡', location: '河南沁阳', lng: 112.9, lat: 35.1, tanghao: '河内堂' },
    ],
    migration: [
      { name: '沁阳', lng: 112.9, lat: 35.1, period: '西周', reason: '邘叔封邘，去邑为于' },
      { name: '东海', lng: 118.4, lat: 34.6, period: '汉', reason: '于氏迁东海，成郡望' },
      { name: '洛阳', lng: 112.4, lat: 34.6, period: '北魏', reason: '于栗磾家族居洛阳' },
      { name: '文登', lng: 122.0, lat: 37.2, period: '宋', reason: '于氏东迁胶东' },
      { name: '岫岩', lng: 123.3, lat: 40.3, period: '清', reason: '于氏闯关东，东北大姓' },
    ],
    figures: [
      { name: '于谦', dynasty: '明', achievement: '北京保卫战，力挽狂澜' },
      { name: '于成龙', dynasty: '清', achievement: '天下第一廉吏' },
      { name: '于右任', dynasty: '近代', achievement: '草书大家，监察院长' },
    ],
    totem: '于字象形为制陶之转盘。图腾为陶轮，象征制陶之职。',
    history: '于姓源于姬姓邘国，去邑为于。东海于氏为郡望，于谦北京保卫战、于成龙天下廉吏，皆为名臣典范。',
  },
  {
    surname: '董',
    pinyin: 'Dǒng',
    rank: 127,
    populationRank: 29,
    population: 720,
    origin: '出自己姓，颛顼之后飂叔安之子董父，善养龙，帝舜赐姓董。亦出自姬姓辛有之后。',
    originPlace: { name: '临颍(董国)', lng: 113.9, lat: 33.8 },
    originPeriod: '夏',
    junwang: [
      { name: '陇西郡', location: '甘肃临洮', lng: 103.9, lat: 35.4, tanghao: '陇西堂' },
      { name: '济阴郡', location: '山东定陶', lng: 115.4, lat: 35.0, tanghao: '济阴堂' },
    ],
    migration: [
      { name: '临颍', lng: 113.9, lat: 33.8, period: '夏', reason: '董父豢龙，封鬷川' },
      { name: '济阴', lng: 115.4, lat: 35.0, period: '汉', reason: '董氏居济阴，成郡望' },
      { name: '陇西', lng: 103.9, lat: 35.4, period: '汉', reason: '董卓掌权，陇西董氏显' },
      { name: '泉州', lng: 118.6, lat: 24.9, period: '宋', reason: '董氏入闽繁衍' },
      { name: '潮汕', lng: 116.6, lat: 23.2, period: '明清', reason: '客家董氏入粤' },
    ],
    figures: [
      { name: '董仲舒', dynasty: '汉', achievement: '罢黜百家独尊儒术' },
      { name: '董其昌', dynasty: '明', achievement: '书画大家，华亭派' },
      { name: '董必武', dynasty: '近代', achievement: '中共创始人之一' },
    ],
    totem: '董字从艹从重，本义为鼎草（药草）。图腾为龙，董父豢龙得姓。',
    history: '董姓源于己姓董父豢龙。济阴董氏为郡望，董仲舒"罢黜百家"定儒学千年。明代董其昌书画双绝。',
  },
  {
    surname: '萧',
    pinyin: 'Xiāo',
    rank: 99,
    populationRank: 30,
    population: 700,
    origin: '出自子姓，宋微子之后萧叔大心，平南宫长万之乱有功封萧，子孙以国为氏。',
    originPlace: { name: '萧县(萧国)', lng: 116.9, lat: 34.2 },
    originPeriod: '春秋',
    junwang: [
      { name: '兰陵郡', location: '山东兰陵', lng: 118.0, lat: 34.8, tanghao: '兰陵堂' },
      { name: '广陵郡', location: '江苏扬州', lng: 119.4, lat: 32.4, tanghao: '广陵堂' },
    ],
    migration: [
      { name: '萧县', lng: 116.9, lat: 34.2, period: '春秋', reason: '萧叔大心封萧，萧氏发祥' },
      { name: '兰陵', lng: 118.0, lat: 34.8, period: '汉', reason: '萧氏居兰陵，成最大郡望' },
      { name: '建康', lng: 118.8, lat: 32.1, period: '南朝', reason: '萧道成建齐、萧衍建梁，皇族' },
      { name: '吉安', lng: 114.9, lat: 27.1, period: '宋', reason: '萧氏南迁江西' },
      { name: '梅州', lng: 116.1, lat: 24.3, period: '明清', reason: '客家萧氏入粤' },
    ],
    figures: [
      { name: '萧何', dynasty: '汉', achievement: '汉初三杰，镇国家' },
      { name: '萧衍', dynasty: '南朝', achievement: '梁武帝，崇佛' },
      { name: '萧统', dynasty: '南朝', achievement: '昭明太子，文选' },
      { name: '萧锋', dynasty: '近代', achievement: '开国将军' },
    ],
    totem: '萧字从艹从肃，本义为艾蒿。图腾为艾草，象征肃敬祭祀。',
    history: '萧姓源于子姓萧国。兰陵萧氏最盛，南朝齐梁两代皇族皆出萧氏，萧何佐汉、萧统文选，皆为千古佳话。',
  },
];

/** 姓氏快速索引：按拼音首字母分组 */
export const SURNAMES_BY_INITIAL: Record<string, Surname[]> = SURNAMES.reduce((acc, s) => {
  const initial = s.pinyin.charAt(0).toUpperCase();
  if (!acc[initial]) acc[initial] = [];
  acc[initial].push(s);
  return acc;
}, {} as Record<string, Surname[]>);

/** 获取所有出现的姓氏首字母（排序后） */
export const SURNAMES_INITIALS: string[] = Object.keys(SURNAMES_BY_INITIAL).sort();
