/**
 * 百家姓迁徙与族谱数据 — 个人化姓氏溯源
 * @see history-museum/ITERATIONS.md Iteration #71
 *
 * 数据来源：基于《百家姓》《元和姓纂》《通志·氏族略》及郡望堂号研究整理
 * 坐标使用经纬度（与 MigrationMapPage / TerritoryMapPage 一致）
 * 复用 MigrationMapPage 的地图工具函数
 *
 * 第一批：rank 1-100 完整 + 已有 rank>100 姓氏（共 109 个）
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
    surname: '钱',

    pinyin: 'Qián',

    rank: 2,

    populationRank: 89,

    population: 222,
    origin: '出自彭姓，颛顼裔孙陆终子彭祖之后彭孚，周代为钱府上士，以官为氏。',
    originPlace: { name: '西安(镐京)', lng: 108.9, lat: 34.3 },
    originPeriod: '西周',
    junwang: [
      { name: '彭城郡', location: '江苏徐州', lng: 117.2, lat: 34.3, tanghao: '彭城堂' },
      { name: '下邳郡', location: '江苏睢宁', lng: 117.9, lat: 33.9, tanghao: '下邳堂' },
    ],
    migration: [
      { name: '西安', lng: 108.9, lat: 34.3, period: '西周', reason: '彭孚为钱府上士，以官为氏' },
      { name: '下邳', lng: 117.9, lat: 33.9, period: '汉', reason: '钱氏迁下邳，成郡望' },
      { name: '杭州', lng: 120.2, lat: 30.3, period: '唐末', reason: '钱镠建吴越国，定都杭州' },
      { name: '泉州', lng: 118.6, lat: 24.9, period: '宋', reason: '钱氏入闽繁衍' },
      { name: '无锡', lng: 120.3, lat: 31.5, period: '明清', reason: '钱氏迁无锡，近代名人辈出' },
    ],
    figures: [
      { name: '钱镠', dynasty: '五代', achievement: '吴越国王，保境安民' },
      { name: '钱大昕', dynasty: '清', achievement: '乾嘉学派代表，史学家' },
      { name: '钱学森', dynasty: '近代', achievement: '航天之父，两弹一星元勋' },
      { name: '钱钟书', dynasty: '近代', achievement: '文学家，围城作者' },
    ],
    totem: '钱字从金从戋，本义为农具铲锹。图腾为金属农具，象征农耕富足。',
    history: '钱姓源于彭姓彭孚，周代钱府上士以官得姓。钱镠建吴越国，保境安民，子孙繁盛江南。近代钱氏人才辈出，号称"钱氏现象"。',
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
    surname: '李',

    pinyin: 'Lǐ',

    rank: 4,

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
    surname: '褚',

    pinyin: 'Chǔ',

    rank: 11,

    populationRank: 225,

    population: 50,
    origin: '出自子姓，宋共公子段字子石，食采于褚，子孙以邑为氏。亦以职为氏，褚为古代服役之士。',
    originPlace: { name: '商丘(宋国)', lng: 115.7, lat: 34.4 },
    originPeriod: '春秋',
    junwang: [
      { name: '河南郡', location: '河南洛阳', lng: 112.4, lat: 34.6, tanghao: '河南堂' },
      { name: '颍川郡', location: '河南禹州', lng: 113.5, lat: 34.2, tanghao: '颍川堂' },
    ],
    migration: [
      { name: '商丘', lng: 115.7, lat: 34.4, period: '春秋', reason: '宋共公子段食采于褚' },
      { name: '洛阳', lng: 112.4, lat: 34.6, period: '汉', reason: '褚氏迁河南，成郡望' },
      { name: '杭州', lng: 120.2, lat: 30.3, period: '唐', reason: '褚遂良家族居钱塘' },
      { name: '苏州', lng: 120.6, lat: 31.3, period: '宋', reason: '褚氏南迁江南' },
      { name: '泉州', lng: 118.6, lat: 24.9, period: '明清', reason: '褚氏入闽' },
    ],
    figures: [
      { name: '褚少孙', dynasty: '西汉', achievement: '补史记，文学家' },
      { name: '褚遂良', dynasty: '唐', achievement: '初唐四大书法家，宰相' },
      { name: '褚璞', dynasty: '明', achievement: '理学家' },
      { name: '褚辅成', dynasty: '近代', achievement: '民主革命家' },
    ],
    totem: '褚字从衣从者，本义为储藏衣物。图腾为库房，象征储备富足。',
    history: '褚姓源于子姓宋国，公子段食采于褚。河南褚氏最盛，褚遂良为初唐书法四大家之一，名扬天下。',
  },
  {
    surname: '卫',

    pinyin: 'Wèi',

    rank: 12,

    populationRank: 170,

    population: 70,
    origin: '出自姬姓，周武王弟康叔封于卫，子孙以国为氏。亦出自鲜卑族卫古氏改姓。',
    originPlace: { name: '濮阳(卫国)', lng: 115.0, lat: 35.8 },
    originPeriod: '西周',
    junwang: [
      { name: '河东郡', location: '山西夏县', lng: 111.2, lat: 35.1, tanghao: '河东堂' },
      { name: '陈留郡', location: '河南开封', lng: 114.3, lat: 34.8, tanghao: '陈留堂' },
    ],
    migration: [
      { name: '濮阳', lng: 115.0, lat: 35.8, period: '西周', reason: '康叔封卫，卫国发祥' },
      { name: '咸阳', lng: 108.7, lat: 34.3, period: '秦', reason: '卫鞅入秦变法，封商鞅' },
      { name: '夏县', lng: 111.2, lat: 35.1, period: '汉', reason: '卫氏居河东，成郡望' },
      { name: '西安', lng: 108.9, lat: 34.3, period: '汉', reason: '卫青家族居长安，大将军' },
      { name: '苏州', lng: 120.6, lat: 31.3, period: '宋', reason: '卫氏南迁江南' },
    ],
    figures: [
      { name: '卫鞅', dynasty: '战国', achievement: '商鞅变法，富国强兵' },
      { name: '卫青', dynasty: '汉', achievement: '大将军，北击匈奴' },
      { name: '卫霍', dynasty: '汉', achievement: '卫青霍去病并称"帝国双璧"' },
      { name: '卫泾', dynasty: '南宋', achievement: '丞相' },
    ],
    totem: '卫字从行从韦，本义为守卫。图腾为持械守卫之人，象征护卫。',
    history: '卫姓源于姬姓卫国，康叔为始祖。商鞅变法、卫青击匈奴，皆卫姓之光。河东卫氏为郡望，南迁后遍布江南。',
  },
  {
    surname: '蒋',

    pinyin: 'Jiǎng',

    rank: 13,

    populationRank: 39,

    population: 540,
    origin: '出自姬姓，周公三子伯龄封于蒋，子孙以国为氏。',
    originPlace: { name: '固始(蒋国)', lng: 115.7, lat: 32.2 },
    originPeriod: '西周',
    junwang: [
      { name: '乐安郡', location: '山东广饶', lng: 118.4, lat: 37.1, tanghao: '乐安堂' },
      { name: '义兴郡', location: '江苏宜兴', lng: 119.8, lat: 31.4, tanghao: '义兴堂' },
    ],
    migration: [
      { name: '固始', lng: 115.7, lat: 32.2, period: '西周', reason: '伯龄封蒋，蒋国发祥' },
      { name: '广饶', lng: 118.4, lat: 37.1, period: '汉', reason: '蒋氏迁乐安，成郡望' },
      { name: '宜兴', lng: 119.8, lat: 31.4, period: '东汉', reason: '蒋默定居阳羡，开义兴蒋氏' },
      { name: '宁波', lng: 121.5, lat: 29.9, period: '宋', reason: '蒋氏南迁四明' },
      { name: '奉化', lng: 121.4, lat: 29.7, period: '明清', reason: '蒋氏迁奉化溪口' },
    ],
    figures: [
      { name: '蒋琬', dynasty: '三国', achievement: '蜀汉大将军，继诸葛亮执政' },
      { name: '蒋防', dynasty: '唐', achievement: '文学家，霍小玉传作者' },
      { name: '蒋廷黻', dynasty: '近代', achievement: '历史学家、外交家' },
      { name: '蒋中正', dynasty: '近代', achievement: '国民政府领导人' },
    ],
    totem: '蒋字从艹从将，本义为茭白。图腾为水生植物，象征水乡繁茂。',
    history: '蒋姓源于姬姓蒋国，伯龄为始祖。乐安蒋氏为郡望，义兴蒋氏南迁最盛。近代蒋氏影响中国命运，奉化溪口为祖籍地。',
  },
  {
    surname: '沈',

    pinyin: 'Shěn',

    rank: 14,

    populationRank: 37,

    population: 570,
    origin: '出自姬姓，周文王第十子季载封于沈，子孙以国为氏。亦出自芈姓，楚庄王子公子贞封于沈鹿。',
    originPlace: { name: '平舆(沈国)', lng: 114.6, lat: 33.0 },
    originPeriod: '西周',
    junwang: [
      { name: '吴兴郡', location: '浙江湖州', lng: 120.1, lat: 30.9, tanghao: '吴兴堂' },
      { name: '汝南郡', location: '河南汝南', lng: 114.4, lat: 33.0, tanghao: '汝南堂' },
    ],
    migration: [
      { name: '平舆', lng: 114.6, lat: 33.0, period: '西周', reason: '季载封沈，沈国发祥' },
      { name: '汝南', lng: 114.4, lat: 33.0, period: '汉', reason: '沈氏居汝南，成郡望' },
      { name: '湖州', lng: 120.1, lat: 30.9, period: '晋', reason: '沈氏南迁吴兴，成最大郡望' },
      { name: '杭州', lng: 120.2, lat: 30.3, period: '宋', reason: '沈括家族居钱塘' },
      { name: '梅州', lng: 116.1, lat: 24.3, period: '明清', reason: '客家沈氏入粤' },
    ],
    figures: [
      { name: '沈约', dynasty: '南朝', achievement: '文学家，创四声八病说' },
      { name: '沈括', dynasty: '北宋', achievement: '科学家，梦溪笔谈作者' },
      { name: '沈周', dynasty: '明', achievement: '吴门画派创始人' },
      { name: '沈从文', dynasty: '近代', achievement: '文学家，边城作者' },
    ],
    totem: '沈字从水从冘，本义为沉没。图腾为水中沉物，象征沉稳厚重。',
    history: '沈姓源于姬姓沈国。吴兴沈氏为最大郡望，沈约创四声说、沈括著梦溪笔谈，皆为文化巨匠。',
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
    surname: '秦',

    pinyin: 'Qín',

    rank: 18,

    populationRank: 74,

    population: 320,
    origin: '出自嬴姓，伯益之后非子封于秦，建秦国，子孙以国为氏。亦出自姬姓，鲁庄公子公子斑之后。',
    originPlace: { name: '张家川(秦亭)', lng: 106.8, lat: 35.0 },
    originPeriod: '西周',
    junwang: [
      { name: '天水郡', location: '甘肃天水', lng: 105.7, lat: 34.6, tanghao: '天水堂' },
      { name: '太原郡', location: '山西太原', lng: 112.5, lat: 37.9, tanghao: '太原堂' },
    ],
    migration: [
      { name: '张家川', lng: 106.8, lat: 35.0, period: '西周', reason: '非子封秦亭，秦人发祥' },
      { name: '雍城', lng: 107.4, lat: 34.5, period: '春秋', reason: '秦德公迁雍，秦国强大' },
      { name: '咸阳', lng: 108.7, lat: 34.3, period: '战国', reason: '秦孝公迁咸阳，一统六国' },
      { name: '天水', lng: 105.7, lat: 34.6, period: '汉', reason: '秦氏迁天水，成郡望' },
      { name: '无锡', lng: 120.3, lat: 31.5, period: '宋', reason: '秦观家族居无锡，开江南秦氏' },
    ],
    figures: [
      { name: '秦非子', dynasty: '西周', achievement: '秦人始祖，封秦亭' },
      { name: '秦琼', dynasty: '唐', achievement: '凌烟阁二十四功臣，门神' },
      { name: '秦观', dynasty: '北宋', achievement: '苏门四学士，婉约词宗' },
      { name: '秦桧', dynasty: '南宋', achievement: '权臣（负面历史人物）' },
    ],
    totem: '秦字从舂从禾，本义为舂谷。图腾为农具与谷物，象征农耕丰收。',
    history: '秦姓源于嬴姓非子封秦。秦国一统天下，秦氏因以为姓。天水秦氏为郡望，秦琼、秦观为后世名流。',
  },
  {
    surname: '尤',

    pinyin: 'Yóu',

    rank: 19,

    populationRank: 124,

    population: 100,
    origin: '出自沈姓，五代时王审知在闽称帝，闽人避其讳（"审"音近"沈"），改沈为尤。亦出自仇姓改尤。',
    originPlace: { name: '福州(闽国)', lng: 119.3, lat: 26.1 },
    originPeriod: '五代',
    junwang: [
      { name: '吴兴郡', location: '浙江湖州', lng: 120.1, lat: 30.9, tanghao: '吴兴堂' },
      { name: '福州郡', location: '福建福州', lng: 119.3, lat: 26.1, tanghao: '福州堂' },
    ],
    migration: [
      { name: '福州', lng: 119.3, lat: 26.1, period: '五代', reason: '避王审知讳，沈姓改尤' },
      { name: '泉州', lng: 118.6, lat: 24.9, period: '宋', reason: '尤氏繁衍闽南' },
      { name: '无锡', lng: 120.3, lat: 31.5, period: '宋', reason: '尤袤定居无锡，遂成望族' },
      { name: '苏州', lng: 120.6, lat: 31.3, period: '明清', reason: '尤氏迁江南' },
      { name: '潮汕', lng: 116.6, lat: 23.2, period: '明清', reason: '尤氏入粤' },
    ],
    figures: [
      { name: '尤袤', dynasty: '南宋', achievement: '南宋四大诗人之一' },
      { name: '尤怡', dynasty: '清', achievement: '医学家，伤寒论注家' },
      { name: '尤荫', dynasty: '清', achievement: '画家' },
      { name: '尤侗', dynasty: '清', achievement: '文学家，戏曲家' },
    ],
    totem: '尤字从又从乙，本义为特异。图腾为突出之人，象征优异卓越。',
    history: '尤姓主出沈姓，五代避王审知讳改尤。吴兴尤氏为郡望，尤袤为南宋四大诗人之一，江南尤氏多为其后。',
  },
  {
    surname: '许',

    pinyin: 'Xǔ',

    rank: 20,

    populationRank: 26,

    population: 780,
    origin: '出自姜姓，炎帝裔孙伯夷之后文叔封于许，子孙以国为氏。',
    originPlace: { name: '许昌(许国)', lng: 113.8, lat: 34.0 },
    originPeriod: '西周',
    junwang: [
      { name: '高阳郡', location: '河北高阳', lng: 115.8, lat: 38.7, tanghao: '高阳堂' },
      { name: '汝南郡', location: '河南汝南', lng: 114.4, lat: 33.0, tanghao: '汝南堂' },
    ],
    migration: [
      { name: '许昌', lng: 113.8, lat: 34.0, period: '西周', reason: '文叔封许，许国发祥' },
      { name: '汝南', lng: 114.4, lat: 33.0, period: '汉', reason: '许氏居汝南，成郡望' },
      { name: '高阳', lng: 115.8, lat: 38.7, period: '汉', reason: '许氏迁高阳，成北派郡望' },
      { name: '泉州', lng: 118.6, lat: 24.9, period: '唐', reason: '许氏入闽繁衍' },
      { name: '潮汕', lng: 116.6, lat: 23.2, period: '宋元', reason: '客家许氏入粤' },
    ],
    figures: [
      { name: '许慎', dynasty: '东汉', achievement: '说文解字作者，字圣' },
      { name: '许逊', dynasty: '晋', achievement: '道教净明道祖师，许真君' },
      { name: '许敬宗', dynasty: '唐', achievement: '宰相' },
      { name: '许地山', dynasty: '近代', achievement: '文学家，落华生作者' },
    ],
    totem: '许字从言从午，本义为允许、赞同。图腾为言语交流，象征信义。',
    history: '许姓源于姜姓许国，文叔为始祖。高阳、汝南两郡望并盛，许慎著说文解字传为字圣。南迁后闽粤许氏繁盛。',
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
    surname: '吕',

    pinyin: 'Lǚ',

    rank: 22,

    populationRank: 40,

    population: 530,
    origin: '出自姜姓，炎帝裔孙伯夷为尧舜四岳，封于吕，子孙以国为氏。亦出自魏氏改吕。',
    originPlace: { name: '南阳(吕国)', lng: 112.5, lat: 33.0 },
    originPeriod: '夏',
    junwang: [
      { name: '河东郡', location: '山西夏县', lng: 111.2, lat: 35.1, tanghao: '河东堂' },
      { name: '淮南郡', location: '安徽寿县', lng: 116.8, lat: 32.6, tanghao: '淮南堂' },
    ],
    migration: [
      { name: '南阳', lng: 112.5, lat: 33.0, period: '夏', reason: '伯夷封吕，吕国发祥' },
      { name: '河东', lng: 111.2, lat: 35.1, period: '春秋', reason: '吕氏迁河东，成郡望' },
      { name: '菏泽', lng: 115.5, lat: 35.2, period: '汉', reason: '吕后家族居单父，外戚盛极' },
      { name: '泉州', lng: 118.6, lat: 24.9, period: '唐', reason: '吕氏入闽' },
      { name: '潮汕', lng: 116.6, lat: 23.2, period: '宋元', reason: '客家吕氏入粤' },
    ],
    figures: [
      { name: '吕尚', dynasty: '商末', achievement: '姜太公，辅周灭商' },
      { name: '吕布', dynasty: '三国', achievement: '猛将，人中吕布' },
      { name: '吕蒙正', dynasty: '北宋', achievement: '宰相，寒窑出身的状元' },
      { name: '吕留良', dynasty: '清', achievement: '理学家，文字狱案' },
    ],
    totem: '吕字象形为脊骨相连。图腾为脊椎，象征骨气节操。',
    history: '吕姓源于姜姓伯夷封吕。姜太公吕尚为吕氏始祖，河东吕氏为郡望。吕后、吕蒙正、吕留良皆吕姓名人。',
  },
  {
    surname: '施',

    pinyin: 'Shī',

    rank: 23,

    populationRank: 97,

    population: 210,
    origin: '出自姬姓，鲁惠公子施父，后裔以字为氏。亦出自子姓，商施国之后。',
    originPlace: { name: '曲阜(鲁国)', lng: 116.6, lat: 35.6 },
    originPeriod: '春秋',
    junwang: [
      { name: '吴兴郡', location: '浙江湖州', lng: 120.1, lat: 30.9, tanghao: '吴兴堂' },
      { name: '沛郡', location: '江苏沛县', lng: 116.8, lat: 34.7, tanghao: '沛国堂' },
    ],
    migration: [
      { name: '曲阜', lng: 116.6, lat: 35.6, period: '春秋', reason: '施父之后，施氏发祥于鲁' },
      { name: '沛国', lng: 116.8, lat: 34.7, period: '汉', reason: '施氏迁沛，成郡望' },
      { name: '湖州', lng: 120.1, lat: 30.9, period: '晋', reason: '施氏南迁吴兴' },
      { name: '泉州', lng: 118.6, lat: 24.9, period: '唐', reason: '施氏入闽' },
      { name: '台南', lng: 120.2, lat: 23.0, period: '清', reason: '施琅收台湾，开台施氏' },
    ],
    figures: [
      { name: '施耐庵', dynasty: '元明', achievement: '水浒传作者' },
      { name: '施琅', dynasty: '清', achievement: '收复台湾，靖海侯' },
      { name: '施闰章', dynasty: '清', achievement: '诗人，燕台七子之一' },
      { name: '施肇基', dynasty: '近代', achievement: '外交家' },
    ],
    totem: '施字从方从也，本义为旗帜飘扬。图腾为旌旗，象征号召引领。',
    history: '施姓源于姬姓鲁国，施父为始祖。吴兴施氏为郡望，施耐庵著水浒传、施琅收台湾，皆为施姓之光。',
  },
  {
    surname: '张',

    pinyin: 'Zhāng',

    rank: 24,

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
    surname: '孔',

    pinyin: 'Kǒng',

    rank: 25,

    populationRank: 73,

    population: 330,
    origin: '出自子姓，商汤后裔孔父嘉，子孙以字为氏。亦出自姬姓，郑穆公子孔之后。',
    originPlace: { name: '商丘(宋国)', lng: 115.7, lat: 34.4 },
    originPeriod: '春秋',
    junwang: [
      { name: '鲁郡', location: '山东曲阜', lng: 116.6, lat: 35.6, tanghao: '鲁郡堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.4, lat: 34.6, tanghao: '河南堂' },
    ],
    migration: [
      { name: '商丘', lng: 115.7, lat: 34.4, period: '春秋', reason: '孔父嘉之后，孔氏发祥于宋' },
      { name: '曲阜', lng: 116.6, lat: 35.6, period: '春秋', reason: '孔父嘉曾孙防叔奔鲁，孔子诞生' },
      { name: '洛阳', lng: 112.4, lat: 34.6, period: '汉', reason: '孔氏迁河南，成郡望' },
      { name: '衢州', lng: 118.9, lat: 28.9, period: '南宋', reason: '孔端友随宋南渡，南宗居衢州' },
      { name: '泉州', lng: 118.6, lat: 24.9, period: '明清', reason: '孔氏入闽繁衍' },
    ],
    figures: [
      { name: '孔子', dynasty: '春秋', achievement: '至圣先师，儒家创始人' },
      { name: '孔融', dynasty: '东汉', achievement: '建安七子，让梨佳话' },
      { name: '孔颖达', dynasty: '唐', achievement: '经学家，五经正义主编' },
      { name: '孔尚任', dynasty: '清', achievement: '桃花扇作者' },
    ],
    totem: '孔字从子从乚，本义为小儿头盖囟门。图腾为婴儿，象征繁衍子嗣。',
    history: '孔姓源于子姓宋国，孔父嘉为始祖。孔子创儒学，曲阜孔氏为世家第一。南宗居衢州，北宗留曲阜，孔府为天下第一家。',
  },
  {
    surname: '曹',

    pinyin: 'Cáo',

    rank: 26,

    populationRank: 27,

    population: 770,
    origin: '出自姬姓，周文王子曹叔振铎封于曹，子孙以国为氏。亦出自颛顼裔孙晏安之后。',
    originPlace: { name: '定陶(曹国)', lng: 115.4, lat: 35.0 },
    originPeriod: '西周',
    junwang: [
      { name: '谯郡', location: '安徽亳州', lng: 115.8, lat: 33.9, tanghao: '谯郡堂' },
      { name: '彭城郡', location: '江苏徐州', lng: 117.2, lat: 34.3, tanghao: '彭城堂' },
    ],
    migration: [
      { name: '定陶', lng: 115.4, lat: 35.0, period: '西周', reason: '曹叔振铎封曹，曹国发祥' },
      { name: '亳州', lng: 115.8, lat: 33.9, period: '汉', reason: '曹氏居谯，成郡望' },
      { name: '洛阳', lng: 112.4, lat: 34.6, period: '东汉', reason: '曹腾家族显赫，曹操起家' },
      { name: '许昌', lng: 113.8, lat: 34.0, period: '三国', reason: '曹氏建魏，曹姓成皇族' },
      { name: '宁化', lng: 116.6, lat: 26.3, period: '唐', reason: '曹氏入闽，客家曹氏繁衍' },
    ],
    figures: [
      { name: '曹参', dynasty: '汉', achievement: '相国，萧规曹随' },
      { name: '曹操', dynasty: '三国', achievement: '政治家、军事家、诗人' },
      { name: '曹丕', dynasty: '三国', achievement: '魏文帝，建安文学代表' },
      { name: '雪芹', dynasty: '清', achievement: '曹雪芹，红楼梦作者' },
    ],
    totem: '曹字从曰从木，本义为诉讼。图腾为法官，象征公正断狱。',
    history: '曹姓源于姬姓曹国。谯郡曹氏因曹操建魏而盛极，曹参萧规曹随传为佳话，曹雪芹著红楼梦为中国小说之巅。',
  },
  {
    surname: '严',

    pinyin: 'Yán',

    rank: 27,

    populationRank: 94,

    population: 220,
    origin: '出自庄姓，东汉明帝名庄，避讳改庄为严。亦出自芈姓，楚庄王之后。',
    originPlace: { name: '江陵(楚国)', lng: 112.2, lat: 30.3 },
    originPeriod: '东汉',
    junwang: [
      { name: '天水郡', location: '甘肃天水', lng: 105.7, lat: 34.6, tanghao: '天水堂' },
      { name: '冯翊郡', location: '陕西大荔', lng: 109.9, lat: 34.8, tanghao: '冯翊堂' },
    ],
    migration: [
      { name: '江陵', lng: 112.2, lat: 30.3, period: '春秋', reason: '楚庄王之后，庄氏发祥' },
      { name: '会稽', lng: 120.6, lat: 30.0, period: '汉', reason: '庄助（严助）家族居会稽，避讳改严' },
      { name: '天水', lng: 105.7, lat: 34.6, period: '汉', reason: '严氏迁天水，成郡望' },
      { name: '苏州', lng: 120.6, lat: 31.3, period: '唐', reason: '严氏南迁江南' },
      { name: '泉州', lng: 118.6, lat: 24.9, period: '明清', reason: '严氏入闽' },
    ],
    figures: [
      { name: '严子陵', dynasty: '东汉', achievement: '高士，富春江垂钓' },
      { name: '严羽', dynasty: '南宋', achievement: '诗评家，沧浪诗话作者' },
      { name: '严复', dynasty: '近代', achievement: '翻译家，天演论译者' },
      { name: '严济慈', dynasty: '近代', achievement: '物理学家' },
    ],
    totem: '严字从吅从厂，本义为险峻。图腾为悬崖峭壁，象征威严险峻。',
    history: '严姓主出庄姓，东汉避明帝讳改严。天水严氏为郡望，严子陵垂钓富春、严复译天演论，皆为严姓之光。',
  },
  {
    surname: '华',

    pinyin: 'Huà',

    rank: 28,

    populationRank: 175,

    population: 67,
    origin: '出自子姓，宋戴公子考父食采于华，子孙以邑为氏。亦出自姒姓，夏禹之后。',
    originPlace: { name: '商丘(宋国)', lng: 115.7, lat: 34.4 },
    originPeriod: '春秋',
    junwang: [
      { name: '武陵郡', location: '湖南常德', lng: 111.7, lat: 29.0, tanghao: '武陵堂' },
      { name: '平原郡', location: '山东平原', lng: 116.4, lat: 37.3, tanghao: '平原堂' },
    ],
    migration: [
      { name: '商丘', lng: 115.7, lat: 34.4, period: '春秋', reason: '考父食采于华，华氏发祥' },
      { name: '平原', lng: 116.4, lat: 37.3, period: '汉', reason: '华氏迁平原，成郡望' },
      { name: '无锡', lng: 120.3, lat: 31.5, period: '三国', reason: '华歆家族居无锡，开无锡华氏' },
      { name: '苏州', lng: 120.6, lat: 31.3, period: '宋', reason: '华氏南迁江南' },
      { name: '泉州', lng: 118.6, lat: 24.9, period: '明清', reason: '华氏入闽' },
    ],
    figures: [
      { name: '华佗', dynasty: '东汉', achievement: '神医，发明麻沸散' },
      { name: '华歆', dynasty: '三国', achievement: '魏国司徒' },
      { name: '华表', dynasty: '明', achievement: '文学家' },
      { name: '华罗庚', dynasty: '近代', achievement: '数学家' },
    ],
    totem: '华字本义为花朵。图腾为花树，象征繁花似锦、光华灿烂。',
    history: '华姓源于子姓宋国，考父食采于华。平原华氏为郡望，华佗神医传千古，近代华罗庚为数学巨匠。',
  },
  {
    surname: '金',

    pinyin: 'Jīn',

    rank: 29,

    populationRank: 64,

    population: 380,
    origin: '出自少昊金天氏，以号为氏。亦出自匈奴休屠王太子金日磾，汉武帝赐姓金。又出自满族爱新觉罗氏改姓。',
    originPlace: { name: '曲阜(少昊之墟)', lng: 116.6, lat: 35.6 },
    originPeriod: '上古',
    junwang: [
      { name: '彭城郡', location: '江苏徐州', lng: 117.2, lat: 34.3, tanghao: '彭城堂' },
      { name: '京兆郡', location: '陕西西安', lng: 108.9, lat: 34.3, tanghao: '京兆堂' },
    ],
    migration: [
      { name: '曲阜', lng: 116.6, lat: 35.6, period: '上古', reason: '少昊金天氏，金氏远祖' },
      { name: '西安', lng: 108.9, lat: 34.3, period: '汉', reason: '金日磾归汉，居长安，赐姓金' },
      { name: '徐州', lng: 117.2, lat: 34.3, period: '汉', reason: '金氏迁彭城，成郡望' },
      { name: '苏州', lng: 120.6, lat: 31.3, period: '宋', reason: '金氏南迁江南' },
      { name: '沈阳', lng: 123.4, lat: 41.8, period: '清', reason: '爱新觉罗氏改姓金' },
    ],
    figures: [
      { name: '金日磾', dynasty: '汉', achievement: '匈奴归汉，托孤大臣' },
      { name: '金圣叹', dynasty: '清', achievement: '文学批评家' },
      { name: '金农', dynasty: '清', achievement: '扬州八怪之一' },
      { name: '金岳霖', dynasty: '近代', achievement: '哲学家、逻辑学家' },
    ],
    totem: '金字本义为金属。图腾为金属兵器，象征坚固锋利。',
    history: '金姓源头多元，少昊金天氏最古，匈奴金日磾归汉赐姓为盛。彭城金氏为郡望，金圣叹评点才子书传世。',
  },
  {
    surname: '魏',

    pinyin: 'Wèi',

    rank: 30,

    populationRank: 44,

    population: 470,
    origin: '出自姬姓，周文王子毕公高之后毕万封于魏，子孙以邑为氏。亦出自芈姓，魏冉之后。',
    originPlace: { name: '芮城(魏国)', lng: 110.7, lat: 34.7 },
    originPeriod: '西周',
    junwang: [
      { name: '巨鹿郡', location: '河北平乡', lng: 114.9, lat: 37.1, tanghao: '巨鹿堂' },
      { name: '任城郡', location: '山东济宁', lng: 116.6, lat: 35.4, tanghao: '任城堂' },
    ],
    migration: [
      { name: '芮城', lng: 110.7, lat: 34.7, period: '西周', reason: '毕万封魏，魏氏发祥' },
      { name: '开封', lng: 114.3, lat: 34.8, period: '战国', reason: '魏惠王迁都大梁，魏国鼎盛' },
      { name: '巨鹿', lng: 114.9, lat: 37.1, period: '汉', reason: '魏氏迁巨鹿，成郡望' },
      { name: '绍兴', lng: 120.6, lat: 30.0, period: '宋', reason: '魏氏南迁江南' },
      { name: '漳州', lng: 117.7, lat: 24.5, period: '明清', reason: '客家魏氏入闽' },
    ],
    figures: [
      { name: '魏文侯', dynasty: '战国', achievement: '魏国开国君主，变法图强' },
      { name: '魏征', dynasty: '唐', achievement: '诤臣，贞观之治功臣' },
      { name: '魏源', dynasty: '清', achievement: '海国图志作者，开眼看世界' },
      { name: '魏巍', dynasty: '近代', achievement: '作家，谁是最可爱的人作者' },
    ],
    totem: '魏字从鬼从委，本义为高大。图腾为巍峨宫室，象征崇高巍峨。',
    history: '魏姓源于姬姓毕万封魏。魏国为战国七雄之一，魏征以直谏传名，魏源开眼看世界，皆为魏姓之光。',
  },
  {
    surname: '陶',

    pinyin: 'Táo',

    rank: 31,

    populationRank: 83,

    population: 200,
    origin: '出自姬姓，唐尧初封于陶，后封于唐，子孙以封地为氏。亦出自虞阏父为周陶正，以职为氏。',
    originPlace: { name: '定陶(陶丘)', lng: 115.4, lat: 35.0 },
    originPeriod: '上古',
    junwang: [
      { name: '济阳郡', location: '河南兰考', lng: 114.8, lat: 34.8, tanghao: '济阳堂' },
      { name: '丹阳郡', location: '江苏南京', lng: 118.8, lat: 32.1, tanghao: '丹阳堂' },
    ],
    migration: [
      { name: '定陶', lng: 115.4, lat: 35.0, period: '上古', reason: '尧初封于陶，陶氏发祥' },
      { name: '济阳', lng: 114.8, lat: 34.8, period: '汉', reason: '陶氏居济阳，成郡望' },
      { name: '九江', lng: 116.0, lat: 29.7, period: '晋', reason: '陶侃家族居浔阳，陶渊明即其后' },
      { name: '南京', lng: 118.8, lat: 32.1, period: '南朝', reason: '陶弘景居茅山，开丹阳陶氏' },
      { name: '苏州', lng: 120.6, lat: 31.3, period: '宋', reason: '陶氏南迁江南' },
    ],
    figures: [
      { name: '陶渊明', dynasty: '东晋', achievement: '隐逸诗人之宗，桃花源记作者' },
      { name: '陶弘景', dynasty: '南朝', achievement: '道教思想家，本草集注作者' },
      { name: '陶行知', dynasty: '近代', achievement: '教育家' },
      { name: '陶铸', dynasty: '近代', achievement: '革命家' },
    ],
    totem: '陶字从阝从匋，本义为陶器。图腾为制陶转轮，象征工艺创造。',
    history: '陶姓源于唐尧封陶。济阳陶氏为郡望，陶渊明隐逸诗宗、陶弘景道教大家、陶行知教育家，皆为陶姓之光。',
  },
  {
    surname: '姜',

    pinyin: 'Jiāng',

    rank: 32,

    populationRank: 54,

    population: 440,
    origin: '出自炎帝神农氏，生于姜水，以水为姓。姜太公为姜姓最重要始祖。',
    originPlace: { name: '宝鸡(姜水)', lng: 107.1, lat: 34.4 },
    originPeriod: '上古',
    junwang: [
      { name: '天水郡', location: '甘肃天水', lng: 105.7, lat: 34.6, tanghao: '天水堂' },
      { name: '广汉郡', location: '四川广汉', lng: 104.2, lat: 30.9, tanghao: '广汉堂' },
    ],
    migration: [
      { name: '宝鸡', lng: 107.1, lat: 34.4, period: '上古', reason: '炎帝生于姜水，以水为姓' },
      { name: '淄博', lng: 118.1, lat: 36.8, period: '商末', reason: '姜太公封齐，建齐国' },
      { name: '天水', lng: 105.7, lat: 34.6, period: '汉', reason: '姜氏迁天水，成郡望' },
      { name: '甘谷', lng: 105.3, lat: 34.7, period: '三国', reason: '姜维居冀县，蜀汉大将军' },
      { name: '潍坊', lng: 119.1, lat: 36.7, period: '明清', reason: '姜氏繁衍山东' },
    ],
    figures: [
      { name: '姜太公', dynasty: '商末', achievement: '齐太公，兵家鼻祖' },
      { name: '姜子牙', dynasty: '周', achievement: '辅周灭商，封于齐' },
      { name: '姜维', dynasty: '三国', achievement: '蜀汉大将军，九伐中原' },
      { name: '姜夔', dynasty: '南宋', achievement: '词人、音乐家，白石道人' },
    ],
    totem: '姜字从羊从女，本义为牧羊之女。图腾为羊，象征炎帝游牧部落。',
    history: '姜姓为中国最古姓之一，源于炎帝神农氏。姜太公封齐建齐国，天水姜氏为郡望，姜维继诸葛亮北伐。',
  },
  {
    surname: '戚',

    pinyin: 'Qī',

    rank: 33,

    populationRank: 206,

    population: 60,
    origin: '出自姬姓，卫武公子孙孙林父食采于戚，子孙以邑为氏。亦出自公孙氏改戚。',
    originPlace: { name: '濮阳(戚邑)', lng: 115.0, lat: 35.8 },
    originPeriod: '春秋',
    junwang: [
      { name: '东海郡', location: '山东郯城', lng: 118.4, lat: 34.6, tanghao: '东海堂' },
      { name: '济阴郡', location: '山东定陶', lng: 115.4, lat: 35.0, tanghao: '济阴堂' },
    ],
    migration: [
      { name: '濮阳', lng: 115.0, lat: 35.8, period: '春秋', reason: '孙林父食采于戚，戚氏发祥' },
      { name: '东海', lng: 118.4, lat: 34.6, period: '汉', reason: '戚氏迁东海，成郡望' },
      { name: '定陶', lng: 115.4, lat: 35.0, period: '汉', reason: '戚氏居济阴' },
      { name: '苏州', lng: 120.6, lat: 31.3, period: '宋', reason: '戚氏南迁江南' },
      { name: '潮汕', lng: 116.6, lat: 23.2, period: '明清', reason: '戚氏入粤' },
    ],
    figures: [
      { name: '戚夫人', dynasty: '汉', achievement: '汉高祖宠妃' },
      { name: '戚继光', dynasty: '明', achievement: '抗倭名将，民族英雄' },
      { name: '戚继美', dynasty: '明', achievement: '戚继光弟，总兵' },
      { name: '戚本禹', dynasty: '近代', achievement: '历史学家' },
    ],
    totem: '戚字从戉从尗，本义为战斧。图腾为斧钺，象征威武征伐。',
    history: '戚姓源于姬姓卫国，孙林父食采于戚。东海戚氏为郡望，戚继光抗倭保国，名垂青史。',
  },
  {
    surname: '谢',

    pinyin: 'Xiè',

    rank: 34,

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
    surname: '邹',

    pinyin: 'Zōu',

    rank: 35,

    populationRank: 60,

    population: 400,
    origin: '出自子姓，宋闵公子孙正考父食采于邹，子孙以邑为氏。亦出自曹姓邾国改邹。',
    originPlace: { name: '邹城(邾国)', lng: 116.9, lat: 35.5 },
    originPeriod: '春秋',
    junwang: [
      { name: '范阳郡', location: '河北涿州', lng: 115.9, lat: 39.5, tanghao: '范阳堂' },
      { name: '太原郡', location: '山西太原', lng: 112.5, lat: 37.9, tanghao: '太原堂' },
    ],
    migration: [
      { name: '邹城', lng: 116.9, lat: 35.5, period: '春秋', reason: '邾国改邹，邹氏发祥' },
      { name: '范阳', lng: 115.9, lat: 39.5, period: '汉', reason: '邹氏迁范阳，成郡望' },
      { name: '无锡', lng: 120.3, lat: 31.5, period: '晋', reason: '邹氏南迁江南' },
      { name: '汀州', lng: 116.4, lat: 25.9, period: '宋', reason: '客家邹氏入闽' },
      { name: '梅州', lng: 116.1, lat: 24.3, period: '明清', reason: '客家邹氏入粤' },
    ],
    figures: [
      { name: '邹忌', dynasty: '战国', achievement: '齐国相国，讽齐王纳谏' },
      { name: '邹衍', dynasty: '战国', achievement: '阴阳家，五德终始说' },
      { name: '邹浩', dynasty: '北宋', achievement: '直臣，道乡先生' },
      { name: '邹韬奋', dynasty: '近代', achievement: '出版家、新闻记者' },
    ],
    totem: '邹字从刍从阝，本义为城邑间之草地。图腾为城郊牧场，象征畜牧农耕。',
    history: '邹姓源于邾国改邹。范阳邹氏为郡望，邹忌讽谏、邹衍创五德说，皆为战国名流。客家邹氏多出闽粤。',
  },
  {
    surname: '喻',

    pinyin: 'Yù',

    rank: 36,

    populationRank: 250,

    population: 40,
    origin: '出自谕姓，西汉苍梧太守谕猛之后，宋时改谕为喻。亦出自芈姓，楚勿喻之后。',
    originPlace: { name: '南昌(豫章)', lng: 115.9, lat: 28.7 },
    originPeriod: '汉',
    junwang: [
      { name: '江夏郡', location: '湖北武汉', lng: 114.3, lat: 30.6, tanghao: '江夏堂' },
      { name: '钱塘郡', location: '浙江杭州', lng: 120.2, lat: 30.3, tanghao: '钱塘堂' },
    ],
    migration: [
      { name: '南昌', lng: 115.9, lat: 28.7, period: '汉', reason: '谕猛为苍梧太守，后裔改喻' },
      { name: '武汉', lng: 114.3, lat: 30.6, period: '汉', reason: '喻氏居江夏，成郡望' },
      { name: '杭州', lng: 120.2, lat: 30.3, period: '宋', reason: '喻氏迁钱塘' },
      { name: '苏州', lng: 120.6, lat: 31.3, period: '明清', reason: '喻氏迁江南' },
      { name: '长沙', lng: 112.9, lat: 28.2, period: '清', reason: '喻氏入湘' },
    ],
    figures: [
      { name: '喻凫', dynasty: '唐', achievement: '诗人' },
      { name: '喻樗', dynasty: '南宋', achievement: '理学家，杨时弟子' },
      { name: '喻昌', dynasty: '清', achievement: '医学家，喻嘉言' },
      { name: '喻培伦', dynasty: '近代', achievement: '黄花岗七十二烈士之一' },
    ],
    totem: '喻字从口从俞，本义为告知、明白。图腾为言语传达，象征智慧启示。',
    history: '喻姓主出谕姓，宋时改谕为喻。江夏喻氏为郡望，喻凫诗名传唐，喻培伦黄花岗殉国，为革命先烈。',
  },
  {
    surname: '柏',

    pinyin: 'Bǎi',

    rank: 37,

    populationRank: 280,

    population: 30,
    origin: '出自柏皇氏，古帝柏皇之后。亦出自柏招，舜帝时为柏氏。又出自柏翳，即伯益。',
    originPlace: { name: '开封(柏皇氏)', lng: 114.3, lat: 34.8 },
    originPeriod: '上古',
    junwang: [
      { name: '魏郡', location: '河北临漳', lng: 114.6, lat: 36.3, tanghao: '魏郡堂' },
      { name: '济阴郡', location: '山东定陶', lng: 115.4, lat: 35.0, tanghao: '济阴堂' },
    ],
    migration: [
      { name: '开封', lng: 114.3, lat: 34.8, period: '上古', reason: '柏皇氏之后，柏氏远祖' },
      { name: '临漳', lng: 114.6, lat: 36.3, period: '汉', reason: '柏氏迁魏郡，成郡望' },
      { name: '定陶', lng: 115.4, lat: 35.0, period: '汉', reason: '柏氏居济阴' },
      { name: '苏州', lng: 120.6, lat: 31.3, period: '宋', reason: '柏氏南迁江南' },
      { name: '杭州', lng: 120.2, lat: 30.3, period: '明清', reason: '柏氏繁衍浙江' },
    ],
    figures: [
      { name: '柏招', dynasty: '上古', achievement: '舜帝时贤人' },
      { name: '柏良器', dynasty: '唐', achievement: '大将，封平原郡王' },
      { name: '柏丛桂', dynasty: '明', achievement: '水利家' },
      { name: '柏文蔚', dynasty: '近代', achievement: '革命家，安徽都督' },
    ],
    totem: '柏字从木从白，本义为柏树。图腾为常青柏木，象征坚贞不屈、四季常青。',
    history: '柏姓源于古帝柏皇氏，极为古老。魏郡柏氏为郡望，柏良器唐代名将，柏文蔚近代革命家。',
  },
  {
    surname: '水',

    pinyin: 'Shuǐ',

    rank: 38,

    populationRank: 300,

    population: 20,
    origin: '出自水正，古代治水之官，以职为氏。亦出于大禹治水之后。一说以水为居地而得姓。',
    originPlace: { name: '绍兴(会稽)', lng: 120.6, lat: 30.0 },
    originPeriod: '夏',
    junwang: [
      { name: '吴兴郡', location: '浙江湖州', lng: 120.1, lat: 30.9, tanghao: '吴兴堂' },
      { name: '临安郡', location: '浙江杭州', lng: 120.2, lat: 30.3, tanghao: '临安堂' },
    ],
    migration: [
      { name: '绍兴', lng: 120.6, lat: 30.0, period: '夏', reason: '大禹治水之后，水氏发祥' },
      { name: '湖州', lng: 120.1, lat: 30.9, period: '汉', reason: '水氏居吴兴，成郡望' },
      { name: '杭州', lng: 120.2, lat: 30.3, period: '宋', reason: '水氏迁临安' },
      { name: '温州', lng: 120.7, lat: 28.0, period: '明清', reason: '水氏繁衍浙南' },
      { name: '福州', lng: 119.3, lat: 26.1, period: '清', reason: '水氏入闽' },
    ],
    figures: [
      { name: '水佳深', dynasty: '明', achievement: '鄞县知县' },
      { name: '水乡谟', dynasty: '明', achievement: '文学家' },
      { name: '水渭滔', dynasty: '清', achievement: '画家' },
      { name: '水均益', dynasty: '近代', achievement: '记者、主持人' },
    ],
    totem: '水字象形为流水。图腾为河流，象征柔韧灵动、润泽万物。',
    history: '水姓源于水正之官，大禹治水之后。吴兴水氏为郡望，为中国罕见姓氏，主要分布在浙江。',
  },
  {
    surname: '窦',

    pinyin: 'Dòu',

    rank: 39,

    populationRank: 290,

    population: 25,
    origin: '出自姒姓，夏帝相后缗方娠，逃出自窦（洞口），生少康，后裔以窦为氏。',
    originPlace: { name: '潍坊(斟鄩)', lng: 119.1, lat: 36.7 },
    originPeriod: '夏',
    junwang: [
      { name: '扶风郡', location: '陕西兴平', lng: 108.5, lat: 34.3, tanghao: '扶风堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.4, lat: 34.6, tanghao: '河南堂' },
    ],
    migration: [
      { name: '潍坊', lng: 119.1, lat: 36.7, period: '夏', reason: '后缗从窦逃出，生少康' },
      { name: '洛阳', lng: 112.4, lat: 34.6, period: '汉', reason: '窦氏居河南，成郡望' },
      { name: '兴平', lng: 108.5, lat: 34.3, period: '汉', reason: '窦融家族居扶风，外戚盛极' },
      { name: '西安', lng: 108.9, lat: 34.3, period: '唐', reason: '窦皇后为唐高祖皇后' },
      { name: '苏州', lng: 120.6, lat: 31.3, period: '宋', reason: '窦氏南迁江南' },
    ],
    figures: [
      { name: '窦融', dynasty: '东汉', achievement: '河西割据，归光武，封安丰侯' },
      { name: '窦宪', dynasty: '东汉', achievement: '大将军，破北匈奴，勒石燕然' },
      { name: '窦建德', dynasty: '隋', achievement: '夏王，隋末群雄' },
      { name: '窦娥', dynasty: '元', achievement: '关汉卿杂剧窦娥冤主角（文学形象）' },
    ],
    totem: '窦字从穴从卖，本义为孔洞。图腾为洞穴出口，象征逃生通道。',
    history: '窦姓源于姒姓少康，后缗从窦逃出得姓。扶风窦氏为郡望，窦融归汉、窦宪破匈奴，皆为汉代名臣。',
  },
  {
    surname: '章',

    pinyin: 'Zhāng',

    rank: 40,

    populationRank: 118,

    population: 150,
    origin: '出自姜姓，齐太公之后鄣国为齐所灭，子孙去邑为章。亦出自任姓章氏。',
    originPlace: { name: '泰安(鄣国)', lng: 117.1, lat: 36.2 },
    originPeriod: '春秋',
    junwang: [
      { name: '豫章郡', location: '江西南昌', lng: 115.9, lat: 28.7, tanghao: '豫章堂' },
      { name: '河间郡', location: '河北河间', lng: 116.1, lat: 38.4, tanghao: '河间堂' },
    ],
    migration: [
      { name: '泰安', lng: 117.1, lat: 36.2, period: '春秋', reason: '鄣国灭后去邑为章' },
      { name: '河间', lng: 116.1, lat: 38.4, period: '汉', reason: '章氏居河间，成郡望' },
      { name: '南昌', lng: 115.9, lat: 28.7, period: '晋', reason: '章氏南迁豫章，成最大郡望' },
      { name: '泉州', lng: 118.6, lat: 24.9, period: '唐', reason: '章氏入闽' },
      { name: '温州', lng: 120.7, lat: 28.0, period: '宋', reason: '章氏繁衍浙南' },
    ],
    figures: [
      { name: '章邯', dynasty: '秦', achievement: '秦末大将，降项羽' },
      { name: '章学诚', dynasty: '清', achievement: '史学家，文史通义作者' },
      { name: '章炳麟', dynasty: '近代', achievement: '国学大师，即章太炎' },
      { name: '章士钊', dynasty: '近代', achievement: '学者、政治家' },
    ],
    totem: '章字从音从十，本义为乐曲段落。图腾为乐章，象征礼乐文明。',
    history: '章姓源于姜姓鄣国，去邑为章。豫章章氏为最大郡望，章学诚创史学理论，章太炎为国学大师。',
  },
  {
    surname: '云',

    pinyin: 'Yún',

    rank: 41,

    populationRank: 142,

    population: 110,
    origin: '出自妘姓，颛顼裔孙祝融氏之后，去女加云为氏。亦出自缙云氏之后。又出自鲜卑族牒云氏改云。',
    originPlace: { name: '新郑(祝融之墟)', lng: 113.7, lat: 34.4 },
    originPeriod: '上古',
    junwang: [
      { name: '琅琊郡', location: '山东临沂', lng: 118.4, lat: 35.0, tanghao: '琅琊堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.4, lat: 34.6, tanghao: '河南堂' },
    ],
    migration: [
      { name: '新郑', lng: 113.7, lat: 34.4, period: '上古', reason: '祝融氏之后，云氏远祖' },
      { name: '洛阳', lng: 112.4, lat: 34.6, period: '汉', reason: '云氏居河南，成郡望' },
      { name: '临沂', lng: 118.4, lat: 35.0, period: '汉', reason: '云氏迁琅琊' },
      { name: '海南', lng: 110.3, lat: 20.0, period: '宋', reason: '云氏入琼，海南大姓' },
      { name: '广州', lng: 113.3, lat: 23.1, period: '明清', reason: '云氏繁衍岭南' },
    ],
    figures: [
      { name: '云敞', dynasty: '汉', achievement: '吴郡太守，义士' },
      { name: '云景龙', dynasty: '宋', achievement: '知府' },
      { name: '云崇维', dynasty: '清', achievement: '海南学者' },
      { name: '云应霖', dynasty: '近代', achievement: '抗日将领' },
    ],
    totem: '云字象形为云气卷曲。图腾为云气，象征高远缥缈、变化无穷。',
    history: '云姓源于妘姓祝融氏。河南云氏为郡望，南迁后海南云氏最盛，为海南特色姓氏。',
  },
  {
    surname: '苏',

    pinyin: 'Sū',

    rank: 42,

    populationRank: 41,

    population: 520,
    origin: '出自己姓，颛顼裔孙昆吾之后封于苏，子孙以国为氏。亦出自少数民族改苏。',
    originPlace: { name: '焦作(苏国)', lng: 113.2, lat: 35.2 },
    originPeriod: '夏',
    junwang: [
      { name: '武功郡', location: '陕西武功', lng: 108.2, lat: 34.3, tanghao: '武功堂' },
      { name: '武陵郡', location: '湖南常德', lng: 111.7, lat: 29.0, tanghao: '武陵堂' },
    ],
    migration: [
      { name: '焦作', lng: 113.2, lat: 35.2, period: '夏', reason: '昆吾之后封苏，苏国发祥' },
      { name: '武功', lng: 108.2, lat: 34.3, period: '汉', reason: '苏氏迁武功，成最大郡望' },
      { name: '眉山', lng: 103.8, lat: 30.1, period: '唐', reason: '苏氏迁眉山，开三苏一脉' },
      { name: '泉州', lng: 118.6, lat: 24.9, period: '宋', reason: '苏氏入闽，同安苏氏盛' },
      { name: '梅州', lng: 116.1, lat: 24.3, period: '明清', reason: '客家苏氏入粤' },
    ],
    figures: [
      { name: '苏秦', dynasty: '战国', achievement: '六国相，合纵抗秦' },
      { name: '苏武', dynasty: '汉', achievement: '牧羊北海，节操传世' },
      { name: '苏轼', dynasty: '北宋', achievement: '文豪，唐宋八大家之一' },
      { name: '苏辙', dynasty: '北宋', achievement: '散文家，苏辙' },
    ],
    totem: '苏字从艹从办，本义为苏草。图腾为紫苏草，象征复苏生机。',
    history: '苏姓源于己姓苏国。武功苏氏为最大郡望，苏秦合纵、苏武牧羊、苏轼文豪，皆苏姓之光。眉山苏氏三苏名扬天下。',
  },
  {
    surname: '潘',

    pinyin: 'Pān',

    rank: 43,

    populationRank: 36,

    population: 620,
    origin: '出自姬姓，周文王子毕公高之子季孙食采于潘，子孙以邑为氏。亦出自芈姓，潘崇之后。',
    originPlace: { name: '西安(毕国)', lng: 108.9, lat: 34.3 },
    originPeriod: '西周',
    junwang: [
      { name: '荥阳郡', location: '河南荥阳', lng: 113.4, lat: 34.8, tanghao: '荥阳堂' },
      { name: '广宗郡', location: '河北广宗', lng: 115.1, lat: 37.1, tanghao: '广宗堂' },
    ],
    migration: [
      { name: '西安', lng: 108.9, lat: 34.3, period: '西周', reason: '季孙食采于潘，潘氏发祥' },
      { name: '荥阳', lng: 113.4, lat: 34.8, period: '汉', reason: '潘氏居荥阳，成郡望' },
      { name: '中牟', lng: 113.9, lat: 34.7, period: '晋', reason: '潘岳居中牟，"貌比潘安"' },
      { name: '泉州', lng: 118.6, lat: 24.9, period: '唐', reason: '潘氏入闽' },
      { name: '梅州', lng: 116.1, lat: 24.3, period: '宋元', reason: '客家潘氏入粤' },
    ],
    figures: [
      { name: '潘岳', dynasty: '西晋', achievement: '潘安，文学家，美男子' },
      { name: '潘美', dynasty: '北宋', achievement: '开国名将，潘仁美原型' },
      { name: '潘季驯', dynasty: '明', achievement: '水利家，治黄专家' },
      { name: '潘天寿', dynasty: '近代', achievement: '国画大师' },
    ],
    totem: '潘字从水从番，本义为淘米水。图腾为水米，象征农耕饮食。',
    history: '潘姓源于姬姓毕国。荥阳潘氏为郡望，潘安美貌传千古，潘美佐宋开国，潘天寿为近代国画大师。',
  },
  {
    surname: '葛',

    pinyin: 'Gé',

    rank: 44,

    populationRank: 126,

    population: 110,
    origin: '出自嬴姓，少昊之后葛伯封于葛，子孙以国为氏。亦出自葛天氏之后。',
    originPlace: { name: '宁陵(葛国)', lng: 115.3, lat: 34.4 },
    originPeriod: '夏',
    junwang: [
      { name: '顿丘郡', location: '河南清丰', lng: 115.1, lat: 36.0, tanghao: '顿丘堂' },
      { name: '梁国郡', location: '河南商丘', lng: 115.7, lat: 34.4, tanghao: '梁国堂' },
    ],
    migration: [
      { name: '宁陵', lng: 115.3, lat: 34.4, period: '夏', reason: '葛伯封葛，葛国发祥' },
      { name: '清丰', lng: 115.1, lat: 36.0, period: '汉', reason: '葛氏迁顿丘，成郡望' },
      { name: '临沂', lng: 118.4, lat: 35.0, period: '东汉', reason: '葛洪家族居琅琊' },
      { name: '杭州', lng: 120.2, lat: 30.3, period: '晋', reason: '葛洪居丹阳，著抱朴子' },
      { name: '苏州', lng: 120.6, lat: 31.3, period: '宋', reason: '葛氏南迁江南' },
    ],
    figures: [
      { name: '葛洪', dynasty: '东晋', achievement: '道教理论家，抱朴子作者' },
      { name: '葛云飞', dynasty: '清', achievement: '抗英将领，定海之战殉国' },
      { name: '葛烈格里', dynasty: '近代', achievement: '医学家' },
      { name: '葛存壮', dynasty: '近代', achievement: '表演艺术家' },
    ],
    totem: '葛字从艹从曷，本义为葛藤。图腾为葛藤，象征坚韧攀援、可织可食。',
    history: '葛姓源于嬴姓葛国。顿丘葛氏为郡望，葛洪著抱朴子为道教经典，葛云飞抗英殉国为民族英雄。',
  },
  {
    surname: '奚',

    pinyin: 'Xī',

    rank: 45,

    populationRank: 280,

    population: 30,
    origin: '出自任姓，黄帝裔孙仲虺为商汤左相，封于奚，子孙以邑为氏。亦出自鲜卑族达奚氏改奚。',
    originPlace: { name: '枣庄(薛国)', lng: 117.6, lat: 34.8 },
    originPeriod: '商',
    junwang: [
      { name: '谯郡', location: '安徽亳州', lng: 115.8, lat: 33.9, tanghao: '谯郡堂' },
      { name: '北海郡', location: '山东潍坊', lng: 119.1, lat: 36.7, tanghao: '北海堂' },
    ],
    migration: [
      { name: '枣庄', lng: 117.6, lat: 34.8, period: '商', reason: '仲虺封于奚，奚氏发祥' },
      { name: '亳州', lng: 115.8, lat: 33.9, period: '汉', reason: '奚氏居谯郡，成郡望' },
      { name: '潍坊', lng: 119.1, lat: 36.7, period: '汉', reason: '奚氏迁北海' },
      { name: '苏州', lng: 120.6, lat: 31.3, period: '宋', reason: '奚氏南迁江南' },
      { name: '南宁', lng: 108.4, lat: 22.8, period: '明清', reason: '奚氏入桂' },
    ],
    figures: [
      { name: '奚斤', dynasty: '北魏', achievement: '大将，司空' },
      { name: '奚陟', dynasty: '唐', achievement: '宰相' },
      { name: '奚冈', dynasty: '清', achievement: '画家，西泠八家之一' },
      { name: '奚啸伯', dynasty: '近代', achievement: '京剧表演艺术家' },
    ],
    totem: '奚字从爪从大，本义为奴隶。图腾为牵系之人，象征驯顺服从。',
    history: '奚姓源于任姓薛国，仲虺为始祖。谯郡奚氏为郡望，奚斤佐北魏、奚陟相唐，皆为名臣。',
  },
  {
    surname: '范',

    pinyin: 'Fàn',

    rank: 46,

    populationRank: 51,

    population: 450,
    origin: '出自祁姓，刘累之后士会封于范，子孙以邑为氏。亦出自楚范邑之后。',
    originPlace: { name: '范县(范邑)', lng: 115.9, lat: 35.9 },
    originPeriod: '春秋',
    junwang: [
      { name: '高平郡', location: '山东微山', lng: 116.8, lat: 35.0, tanghao: '高平堂' },
      { name: '南阳郡', location: '河南南阳', lng: 112.5, lat: 33.0, tanghao: '南阳堂' },
    ],
    migration: [
      { name: '范县', lng: 115.9, lat: 35.9, period: '春秋', reason: '士会封范，范氏发祥' },
      { name: '微山', lng: 116.8, lat: 35.0, period: '汉', reason: '范氏居高平，成郡望' },
      { name: '南阳', lng: 112.5, lat: 33.0, period: '汉', reason: '范氏迁南阳' },
      { name: '苏州', lng: 120.6, lat: 31.3, period: '宋', reason: '范仲淹家族居苏州' },
      { name: '汀州', lng: 116.4, lat: 25.9, period: '明清', reason: '客家范氏入闽' },
    ],
    figures: [
      { name: '范蠡', dynasty: '春秋', achievement: '陶朱公，助越灭吴，商圣' },
      { name: '范仲淹', dynasty: '北宋', achievement: '政治家、文学家，先忧后乐' },
      { name: '范成大', dynasty: '南宋', achievement: '诗人，南宋四大家' },
      { name: '范文澜', dynasty: '近代', achievement: '史学家' },
    ],
    totem: '范字从艹从水从巳，本义为蜂。图腾为蜜蜂，象征勤勉团结。',
    history: '范姓源于祁姓范邑，士会为始祖。高平范氏为郡望，范蠡经商、范仲淹先忧后乐，皆为范姓之光。',
  },
  {
    surname: '彭',

    pinyin: 'Péng',

    rank: 47,

    populationRank: 32,

    population: 660,
    origin: '出自祝融氏，颛顼裔孙陆终第三子彭祖，封于彭，子孙以国为氏。',
    originPlace: { name: '徐州(彭城)', lng: 117.2, lat: 34.3 },
    originPeriod: '夏',
    junwang: [
      { name: '淮阳郡', location: '河南淮阳', lng: 114.9, lat: 33.7, tanghao: '淮阳堂' },
      { name: '宜春郡', location: '江西宜春', lng: 114.4, lat: 27.8, tanghao: '宜春堂' },
    ],
    migration: [
      { name: '徐州', lng: 117.2, lat: 34.3, period: '夏', reason: '彭祖封彭，大彭国发祥' },
      { name: '淮阳', lng: 114.9, lat: 33.7, period: '汉', reason: '彭氏居淮阳，成郡望' },
      { name: '宜春', lng: 114.4, lat: 27.8, period: '唐', reason: '彭氏南迁江西，开宜春彭氏' },
      { name: '吉安', lng: 114.9, lat: 27.1, period: '宋', reason: '彭氏迁庐陵' },
      { name: '梅州', lng: 116.1, lat: 24.3, period: '明清', reason: '客家彭氏入粤' },
    ],
    figures: [
      { name: '彭越', dynasty: '汉', achievement: '梁王，佐刘邦灭项羽' },
      { name: '彭玕', dynasty: '五代', achievement: '吉州刺史，庐陵彭氏始祖' },
      { name: '彭玉麟', dynasty: '清', achievement: '湘军将领，雪琴' },
      { name: '彭德怀', dynasty: '近代', achievement: '元帅，国防部长' },
    ],
    totem: '彭字从壴从彡，本义为鼓声。图腾为战鼓，象征振奋号令。',
    history: '彭姓源于祝融氏彭祖，封于彭城。淮阳彭氏为郡望，庐陵彭氏南迁最盛，彭德怀元帅为革命功臣。',
  },
  {
    surname: '郎',

    pinyin: 'Láng',

    rank: 48,

    populationRank: 230,

    population: 50,
    origin: '出自姬姓，鲁懿公孙费伯食采于郎，子孙以邑为氏。亦出自南匈奴郎氏。',
    originPlace: { name: '曲阜(鲁国)', lng: 116.6, lat: 35.6 },
    originPeriod: '春秋',
    junwang: [
      { name: '中山郡', location: '河北定州', lng: 115.0, lat: 38.4, tanghao: '中山堂' },
      { name: '魏郡', location: '河北临漳', lng: 114.6, lat: 36.3, tanghao: '魏郡堂' },
    ],
    migration: [
      { name: '曲阜', lng: 116.6, lat: 35.6, period: '春秋', reason: '费伯食采于郎，郎氏发祥' },
      { name: '定州', lng: 115.0, lat: 38.4, period: '汉', reason: '郎氏居中山，成郡望' },
      { name: '临漳', lng: 114.6, lat: 36.3, period: '汉', reason: '郎氏迁魏郡' },
      { name: '杭州', lng: 120.2, lat: 30.3, period: '宋', reason: '郎氏南迁江南' },
      { name: '宁波', lng: 121.5, lat: 29.9, period: '明清', reason: '郎氏繁衍四明' },
    ],
    figures: [
      { name: '郎顗', dynasty: '东汉', achievement: '经学家' },
      { name: '郎士元', dynasty: '唐', achievement: '大历十才子之一' },
      { name: '郎廷极', dynasty: '清', achievement: '陶瓷家，郎窑红' },
      { name: '郎平', dynasty: '近代', achievement: '女排运动员、教练' },
    ],
    totem: '郎字从良从阝，本义为城邑之名。图腾为廊道，象征宫殿廊庑。',
    history: '郎姓源于姬姓鲁国。中山郎氏为郡望，郎士元为唐大历十才子，郎廷极创郎窑红瓷器，皆郎姓之光。',
  },
  {
    surname: '鲁',

    pinyin: 'Lǔ',

    rank: 49,

    populationRank: 115,

    population: 160,
    origin: '出自姬姓，周公旦封于鲁，子孙以国为氏。',
    originPlace: { name: '曲阜(鲁国)', lng: 116.6, lat: 35.6 },
    originPeriod: '西周',
    junwang: [
      { name: '扶风郡', location: '陕西兴平', lng: 108.5, lat: 34.3, tanghao: '扶风堂' },
      { name: '新蔡郡', location: '河南新蔡', lng: 114.9, lat: 32.8, tanghao: '新蔡堂' },
    ],
    migration: [
      { name: '曲阜', lng: 116.6, lat: 35.6, period: '西周', reason: '周公封鲁，鲁国发祥' },
      { name: '兴平', lng: 108.5, lat: 34.3, period: '汉', reason: '鲁氏迁扶风，成郡望' },
      { name: '新蔡', lng: 114.9, lat: 32.8, period: '晋', reason: '鲁氏迁新蔡' },
      { name: '杭州', lng: 120.2, lat: 30.3, period: '宋', reason: '鲁氏南迁江南' },
      { name: '宁波', lng: 121.5, lat: 29.9, period: '明清', reason: '鲁氏迁四明' },
    ],
    figures: [
      { name: '鲁肃', dynasty: '三国', achievement: '东吴名臣，联刘抗曹' },
      { name: '鲁宗道', dynasty: '北宋', achievement: '参知政事，直臣' },
      { name: '鲁迅', dynasty: '近代', achievement: '文学家，思想家，鲁迅' },
      { name: '鲁智深', dynasty: '文学', achievement: '水浒传人物（文学形象）' },
    ],
    totem: '鲁字从鱼从日，本义为鱼在水中。图腾为游鱼，象征丰饶富足。',
    history: '鲁姓源于姬姓鲁国，周公为始祖。扶风鲁氏为郡望，鲁肃联刘抗曹、鲁迅文化革命，皆为鲁姓之光。',
  },
  {
    surname: '韦',

    pinyin: 'Wéi',

    rank: 50,

    populationRank: 66,

    population: 370,
    origin: '出自彭姓，颛顼裔孙彭元哲之后，韦国为商所灭，子孙以国为氏。亦出自韩信之后，避难改韦。',
    originPlace: { name: '滑县(韦国)', lng: 114.5, lat: 35.6 },
    originPeriod: '夏',
    junwang: [
      { name: '京兆郡', location: '陕西西安', lng: 108.9, lat: 34.3, tanghao: '京兆堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.4, lat: 34.6, tanghao: '河南堂' },
    ],
    migration: [
      { name: '滑县', lng: 114.5, lat: 35.6, period: '夏', reason: '彭元哲封韦，韦国发祥' },
      { name: '西安', lng: 108.9, lat: 34.3, period: '汉', reason: '韦氏居京兆，成最大郡望' },
      { name: '洛阳', lng: 112.4, lat: 34.6, period: '汉', reason: '韦氏迁河南' },
      { name: '南宁', lng: 108.4, lat: 22.8, period: '明清', reason: '壮族韦氏繁衍岭南' },
      { name: '海口', lng: 110.3, lat: 20.0, period: '清', reason: '韦氏入琼' },
    ],
    figures: [
      { name: '韦贤', dynasty: '汉', achievement: '丞相，邹鲁大儒' },
      { name: '韦应物', dynasty: '唐', achievement: '诗人，苏州刺史' },
      { name: '韦庄', dynasty: '五代', achievement: '词人，花间派代表' },
      { name: '韦拔群', dynasty: '近代', achievement: '革命家，右江起义领导人' },
    ],
    totem: '韦字象形为兽皮之足。图腾为皮革，象征坚韧柔韧。',
    history: '韦姓源于彭姓韦国。京兆韦氏为最大郡望，"城南韦杜，去天尺五"。壮族韦氏为南方大姓，韦应物、韦庄诗词传世。',
  },
  {
    surname: '昌',

    pinyin: 'Chāng',

    rank: 51,

    populationRank: 270,

    population: 30,
    origin: '出自任姓，黄帝子之后昌意，子孙以名为氏。亦出自昌容，殷商时仙人。',
    originPlace: { name: '新郑(轩辕丘)', lng: 113.7, lat: 34.4 },
    originPeriod: '上古',
    junwang: [
      { name: '汝南郡', location: '河南汝南', lng: 114.4, lat: 33.0, tanghao: '汝南堂' },
      { name: '豫章郡', location: '江西南昌', lng: 115.9, lat: 28.7, tanghao: '豫章堂' },
    ],
    migration: [
      { name: '新郑', lng: 113.7, lat: 34.4, period: '上古', reason: '昌意之后，昌氏远祖' },
      { name: '汝南', lng: 114.4, lat: 33.0, period: '汉', reason: '昌氏居汝南，成郡望' },
      { name: '南昌', lng: 115.9, lat: 28.7, period: '晋', reason: '昌氏迁豫章' },
      { name: '孝感', lng: 113.9, lat: 30.9, period: '明清', reason: '昌氏迁湖北' },
      { name: '长沙', lng: 112.9, lat: 28.2, period: '清', reason: '昌氏入湘' },
    ],
    figures: [
      { name: '昌容', dynasty: '商', achievement: '仙人，传说常山道士' },
      { name: '昌祐', dynasty: '唐', achievement: '进士' },
      { name: '昌海', dynasty: '宋', achievement: '高僧' },
      { name: '昌金圣', dynasty: '近代', achievement: '革命烈士' },
    ],
    totem: '昌字从日从曰，本义为日光盛明。图腾为太阳，象征光明昌盛。',
    history: '昌姓源于黄帝子昌意，极为古老。汝南昌氏为郡望，为中国罕见姓氏，主要分布在鄂湘一带。',
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
    surname: '苗',

    pinyin: 'Miáo',

    rank: 53,

    populationRank: 146,

    population: 110,
    origin: '出自芈姓，楚庄王孙伯棼以罪诛，子贲皇奔晋，食采于苗，子孙以邑为氏。',
    originPlace: { name: '济源(苗邑)', lng: 112.6, lat: 35.1 },
    originPeriod: '春秋',
    junwang: [
      { name: '东阳郡', location: '浙江金华', lng: 119.6, lat: 29.1, tanghao: '东阳堂' },
      { name: '伊川郡', location: '河南伊川', lng: 112.4, lat: 34.4, tanghao: '伊川堂' },
    ],
    migration: [
      { name: '济源', lng: 112.6, lat: 35.1, period: '春秋', reason: '贲皇食采于苗，苗氏发祥' },
      { name: '伊川', lng: 112.4, lat: 34.4, period: '汉', reason: '苗氏居伊川' },
      { name: '金华', lng: 119.6, lat: 29.1, period: '唐', reason: '苗氏南迁东阳' },
      { name: '长治', lng: 113.1, lat: 36.2, period: '宋', reason: '苗氏迁上党' },
      { name: '保定', lng: 115.5, lat: 38.9, period: '明清', reason: '苗氏繁衍河北' },
    ],
    figures: [
      { name: '苗贲皇', dynasty: '春秋', achievement: '晋国大夫，苗氏始祖' },
      { name: '苗晋卿', dynasty: '唐', achievement: '宰相' },
      { name: '苗授', dynasty: '北宋', achievement: '将领' },
      { name: '苗沛霖', dynasty: '清', achievement: '团练首领' },
    ],
    totem: '苗字从艹从田，本义为禾苗。图腾为初生禾苗，象征生机繁茂。',
    history: '苗姓源于芈姓楚国，贲皇奔晋食采于苗。东阳苗氏为郡望，苗晋卿相唐，为唐代名臣。',
  },
  {
    surname: '凤',

    pinyin: 'Fèng',

    rank: 54,

    populationRank: 285,

    population: 25,
    origin: '出自高辛氏，帝喾臣凤鸟氏，以官为氏。亦出自汉代凤纲，好道，以鸟名得姓。',
    originPlace: { name: '洛阳(帝喾都)', lng: 112.4, lat: 34.6 },
    originPeriod: '上古',
    junwang: [
      { name: '平阳郡', location: '山西临汾', lng: 111.6, lat: 36.1, tanghao: '平阳堂' },
      { name: '邰阳郡', location: '陕西武功', lng: 108.2, lat: 34.3, tanghao: '邰阳堂' },
    ],
    migration: [
      { name: '洛阳', lng: 112.4, lat: 34.6, period: '上古', reason: '凤鸟氏之后，凤氏远祖' },
      { name: '临汾', lng: 111.6, lat: 36.1, period: '汉', reason: '凤氏居平阳，成郡望' },
      { name: '苏州', lng: 120.6, lat: 31.3, period: '宋', reason: '凤氏南迁江南' },
      { name: '合肥', lng: 117.3, lat: 31.8, period: '明清', reason: '凤氏迁安徽' },
      { name: '桂林', lng: 110.3, lat: 25.3, period: '清', reason: '凤氏入桂' },
    ],
    figures: [
      { name: '凤纲', dynasty: '汉', achievement: '仙人，好道' },
      { name: '凤绮', dynasty: '汉', achievement: '名医' },
      { name: '凤山', dynasty: '清', achievement: '满洲镶黄旗将领' },
      { name: '凤全', dynasty: '清', achievement: '驻藏大臣，巴塘事变殉国' },
    ],
    totem: '凤字从鸟从凡，本义为神鸟。图腾为凤凰，象征祥瑞至尊。',
    history: '凤姓源于高辛氏凤鸟氏之后。凤纲好道为汉代仙人，凤氏稀少但源远流长，散居南北。',
  },
  {
    surname: '花',

    pinyin: 'Huā',

    rank: 55,

    populationRank: 285,

    population: 25,
    origin: '出自何姓，唐人有花敬定，平乱有功，子孙以花为氏。亦出自华姓，避讳改花。',
    originPlace: { name: '临沂(华邑)', lng: 118.4, lat: 35.0 },
    originPeriod: '唐',
    junwang: [
      { name: '东平郡', location: '山东东平', lng: 116.3, lat: 35.9, tanghao: '东平堂' },
      { name: '中山郡', location: '河北定州', lng: 115.0, lat: 38.4, tanghao: '中山堂' },
    ],
    migration: [
      { name: '临沂', lng: 118.4, lat: 35.0, period: '唐', reason: '花敬定封临沂侯，花氏发祥' },
      { name: '东平', lng: 116.3, lat: 35.9, period: '宋', reason: '花氏迁东平，成郡望' },
      { name: '洛阳', lng: 112.4, lat: 34.6, period: '宋', reason: '花氏从军居洛阳' },
      { name: '吉安', lng: 114.9, lat: 27.1, period: '明', reason: '花氏南迁江西' },
      { name: '成都', lng: 104.1, lat: 30.7, period: '清', reason: '花氏入川繁衍' },
    ],
    figures: [
      { name: '花敬定', dynasty: '唐', achievement: '平乱将领，杜甫赠诗"花卿"' },
      { name: '花木兰', dynasty: '北朝', achievement: '代父从军，巾帼英雄' },
      { name: '花云', dynasty: '明', achievement: '开国功臣，死守太平' },
      { name: '花沙纳', dynasty: '清', achievement: '户部尚书' },
    ],
    totem: '花字从艹从化，本义为花朵。图腾为盛开之花，象征繁茂华美。',
    history: '花姓多源自华姓或何姓改姓。花敬定平乱有功始见于唐，花木兰代父从军传为千古佳话。花氏人数不多，分布较广。',
  },
  {
    surname: '方',

    pinyin: 'Fāng',

    rank: 56,

    populationRank: 74,

    population: 430,
    origin: '出自姬姓，周宣王封方叔于方，子孙以字为氏。方叔南征荆蛮有功，为方氏始祖。',
    originPlace: { name: '洛阳(方山)', lng: 112.4, lat: 34.6 },
    originPeriod: '西周',
    junwang: [
      { name: '河南郡', location: '河南洛阳', lng: 112.4, lat: 34.6, tanghao: '河南堂' },
      { name: '六桂郡', location: '福建莆田', lng: 119.0, lat: 25.4, tanghao: '六桂堂' },
    ],
    migration: [
      { name: '洛阳', lng: 112.4, lat: 34.6, period: '西周', reason: '方叔封方山，方氏发祥' },
      { name: '平江', lng: 113.6, lat: 28.7, period: '唐', reason: '方氏南迁江西' },
      { name: '莆田', lng: 119.0, lat: 25.4, period: '唐末', reason: '方廷范居莆田，开莆平方氏' },
      { name: '歙县', lng: 118.4, lat: 29.9, period: '宋', reason: '方氏迁徽州，成徽商望族' },
      { name: '桐城', lng: 116.9, lat: 31.0, period: '明清', reason: '方氏迁桐城，文人辈出' },
    ],
    figures: [
      { name: '方叔', dynasty: '西周', achievement: '南征荆蛮，方氏始祖' },
      { name: '方腊', dynasty: '北宋', achievement: '农民起义领袖' },
      { name: '方孝孺', dynasty: '明', achievement: '建文忠臣，被诛十族' },
      { name: '方以智', dynasty: '明末清初', achievement: '思想家，百科全书式学者' },
    ],
    totem: '方字象形为犁头，本义为方田。图腾为方田与农具，象征农耕定界。',
    history: '方姓源于姬姓方叔。河南方氏为郡望，唐末方廷范入闽开莆平方氏。明清桐城方氏文人辈出，方孝孺殉节诛十族，为忠义典范。',
  },
  {
    surname: '俞',

    pinyin: 'Yú',

    rank: 57,

    populationRank: 117,

    population: 140,
    origin: '出自黄帝臣俞附，善医。亦出自姬姓，春秋郑国大夫俞弥之后。',
    originPlace: { name: '新郑(郑国)', lng: 113.7, lat: 34.4 },
    originPeriod: '上古',
    junwang: [
      { name: '河间郡', location: '河北河间', lng: 116.1, lat: 38.4, tanghao: '河间堂' },
      { name: '晋昌郡', location: '甘肃安西', lng: 95.8, lat: 40.5, tanghao: '晋昌堂' },
    ],
    migration: [
      { name: '新郑', lng: 113.7, lat: 34.4, period: '春秋', reason: '俞弥居郑国，俞氏发祥' },
      { name: '河间', lng: 116.1, lat: 38.4, period: '汉', reason: '俞氏迁河间，成郡望' },
      { name: '婺源', lng: 117.9, lat: 29.3, period: '宋', reason: '俞氏南迁徽州' },
      { name: '绍兴', lng: 120.6, lat: 30.0, period: '宋', reason: '俞氏迁浙江' },
      { name: '天津', lng: 117.2, lat: 39.1, period: '明清', reason: '俞氏北迁京津' },
    ],
    figures: [
      { name: '俞附', dynasty: '上古', achievement: '黄帝神医，俞氏始祖' },
      { name: '俞大猷', dynasty: '明', achievement: '抗倭名将，与戚继光齐名' },
      { name: '俞樾', dynasty: '清', achievement: '经学大师，曲园居士' },
      { name: '俞正燮', dynasty: '清', achievement: '学者，癸巳类稿' },
    ],
    totem: '俞字从人从舟，本义为挖空树木成舟。图腾为独木舟，象征渡水开拓。',
    history: '俞姓源于黄帝臣俞附。河间俞氏为郡望，明代俞大猷抗倭立功，清代俞樾为经学大师，俞氏在江南文风甚盛。',
  },
  {
    surname: '任',

    pinyin: 'Rén',

    rank: 58,

    populationRank: 49,

    population: 720,
    origin: '出自风姓，太昊后裔，黄帝少子禹阳封于任，子孙以国为氏。亦出自姬姓，谢、章、薛、舒、吕、祝、终、泉、毕、过十国皆任姓。',
    originPlace: { name: '济宁(任国)', lng: 116.6, lat: 35.4 },
    originPeriod: '上古',
    junwang: [
      { name: '乐安郡', location: '山东广饶', lng: 118.4, lat: 37.1, tanghao: '乐安堂' },
      { name: '东安郡', location: '浙江富阳', lng: 119.9, lat: 30.0, tanghao: '东安堂' },
    ],
    migration: [
      { name: '济宁', lng: 116.6, lat: 35.4, period: '上古', reason: '禹阳封任国，任氏发祥' },
      { name: '广饶', lng: 118.4, lat: 37.1, period: '齐', reason: '任氏居乐安，成郡望' },
      { name: '富阳', lng: 119.9, lat: 30.0, period: '汉', reason: '任氏南迁浙江' },
      { name: '乐山', lng: 103.8, lat: 29.6, period: '唐', reason: '任氏入蜀' },
      { name: '广州', lng: 113.3, lat: 23.1, period: '宋', reason: '任氏南迁岭南' },
    ],
    figures: [
      { name: '任敖', dynasty: '汉', achievement: '广阿侯，佐刘邦' },
      { name: '任昉', dynasty: '南朝', achievement: '文学家，"任笔沈诗"' },
      { name: '任伯年', dynasty: '清', achievement: '海派画家，花鸟大家' },
      { name: '任弼时', dynasty: '近代', achievement: '革命家，五大书记之一' },
    ],
    totem: '任字从人从壬，壬象形为挑担。图腾为负担当差之人，象征担当。',
    history: '任姓源于风姓，为太昊后裔最古姓氏之一。乐安任氏为郡望，南朝任昉以文著称，近代任弼时为革命元勋。',
  },
  {
    surname: '袁',

    pinyin: 'Yuán',

    rank: 59,

    populationRank: 36,

    population: 900,
    origin: '出自妫姓，舜帝后裔妫满封陈，传至伯爰，孙涛涂以祖父字为爰氏，后改袁。',
    originPlace: { name: '淮阳(陈国)', lng: 114.9, lat: 33.7 },
    originPeriod: '春秋',
    junwang: [
      { name: '汝南郡', location: '河南汝南', lng: 114.4, lat: 33.0, tanghao: '汝南堂' },
      { name: '陈郡郡', location: '河南淮阳', lng: 114.9, lat: 33.7, tanghao: '陈郡堂' },
    ],
    migration: [
      { name: '淮阳', lng: 114.9, lat: 33.7, period: '春秋', reason: '涛涂以祖父字为氏，袁氏发祥' },
      { name: '汝南', lng: 114.4, lat: 33.0, period: '汉', reason: '袁安居汝南，开汝南袁氏' },
      { name: '洛阳', lng: 112.4, lat: 34.6, period: '东汉', reason: '袁绍袁术家族显赫，四世三公' },
      { name: '杭州', lng: 120.2, lat: 30.3, period: '宋', reason: '袁氏南迁江南' },
      { name: '项城', lng: 114.9, lat: 33.4, period: '清', reason: '袁世凯家族居项城' },
    ],
    figures: [
      { name: '袁绍', dynasty: '东汉', achievement: '四世三公，割据河北' },
      { name: '袁天罡', dynasty: '唐', achievement: '相术大师，推背图' },
      { name: '袁枚', dynasty: '清', achievement: '随园主人，随园诗话' },
      { name: '袁世凯', dynasty: '近代', achievement: '北洋领袖，民国总统' },
    ],
    totem: '袁字从衣从叀，本义为长衣。图腾为华服长袍，象征尊贵显赫。',
    history: '袁姓源于妫姓，涛涂以祖字得氏。汝南袁氏四世三公显于东汉，袁绍割据河北。清代袁枚以诗文名世，近代袁世凯为北洋领袖。',
  },
  {
    surname: '柳',

    pinyin: 'Liǔ',

    rank: 60,

    populationRank: 130,

    population: 120,
    origin: '出自姬姓，周公裔孙展禽，食采于柳下，谥惠，子孙以邑为氏。亦出自芈姓，楚怀王弟柳下惠之后。',
    originPlace: { name: '濮阳(柳下)', lng: 115.0, lat: 35.8 },
    originPeriod: '春秋',
    junwang: [
      { name: '河东郡', location: '山西永济', lng: 110.4, lat: 34.9, tanghao: '河东堂' },
      { name: '豫章郡', location: '江西南昌', lng: 115.9, lat: 28.7, tanghao: '豫章堂' },
    ],
    migration: [
      { name: '濮阳', lng: 115.0, lat: 35.8, period: '春秋', reason: '展禽食采柳下，柳氏发祥' },
      { name: '永济', lng: 110.4, lat: 34.9, period: '战国', reason: '柳氏迁河东，成最大郡望' },
      { name: '襄阳', lng: 112.1, lat: 32.0, period: '南朝', reason: '柳氏南迁襄阳' },
      { name: '南昌', lng: 115.9, lat: 28.7, period: '唐', reason: '柳氏迁豫章' },
      { name: '桂林', lng: 110.3, lat: 25.3, period: '宋', reason: '柳氏南迁岭南' },
    ],
    figures: [
      { name: '柳下惠', dynasty: '春秋', achievement: '坐怀不乱，道德典范' },
      { name: '柳宗元', dynasty: '唐', achievement: '唐宋八大家，柳柳州' },
      { name: '柳公权', dynasty: '唐', achievement: '书法大家，柳体楷书' },
      { name: '柳永', dynasty: '北宋', achievement: '婉约词宗，雨霖铃' },
    ],
    totem: '柳字从木从卯，本义为柳树。图腾为垂柳，象征柔韧生机。',
    history: '柳姓源于姬姓展禽，食采柳下得姓。河东柳氏为最大郡望，唐代柳宗元、柳公权一文一书，柳永开婉约词风，柳氏文风鼎盛。',
  },
  {
    surname: '酆',

    pinyin: 'Fēng',

    rank: 61,

    populationRank: 350,

    population: 8,
    origin: '出自姬姓，周文王第十七子酆侯，封于酆，子孙以国为氏。',
    originPlace: { name: '西安(酆京)', lng: 108.9, lat: 34.3 },
    originPeriod: '西周',
    junwang: [
      { name: '京兆郡', location: '陕西西安', lng: 108.9, lat: 34.3, tanghao: '京兆堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.4, lat: 34.6, tanghao: '河南堂' },
    ],
    migration: [
      { name: '西安', lng: 108.9, lat: 34.3, period: '西周', reason: '酆侯封酆京，酆氏发祥' },
      { name: '洛阳', lng: 112.4, lat: 34.6, period: '东周', reason: '酆氏东迁河南' },
      { name: '杭州', lng: 120.2, lat: 30.3, period: '宋', reason: '酆氏南迁江南' },
      { name: '福州', lng: 119.3, lat: 26.1, period: '明', reason: '酆氏入闽' },
      { name: '北京', lng: 116.4, lat: 39.9, period: '清', reason: '酆氏北迁京畿' },
    ],
    figures: [
      { name: '酆侯', dynasty: '西周', achievement: '文王第十七子，酆氏始祖' },
      { name: '酆庆', dynasty: '明', achievement: '德州知州，清官' },
      { name: '酆伸之', dynasty: '宋', achievement: '进士' },
      { name: '酆去奢', dynasty: '唐', achievement: '道士，好道术' },
    ],
    totem: '酆字从阝从豐，本义为丰邑。图腾为丰美之都城，象征富足。',
    history: '酆姓源于姬姓酆侯。文王第十七子封于酆京得姓。酆氏人数稀少，散居南北，历史记载不多。',
  },
  {
    surname: '鲍',

    pinyin: 'Bào',

    rank: 62,

    populationRank: 173,

    population: 68,
    origin: '出自姒姓，禹后裔敬叔仕齐，食采于鲍，子孙以邑为氏。',
    originPlace: { name: '济南(鲍邑)', lng: 117.0, lat: 36.7 },
    originPeriod: '春秋',
    junwang: [
      { name: '上党郡', location: '山西长治', lng: 113.1, lat: 36.2, tanghao: '上党堂' },
      { name: '泰山郡', location: '山东泰安', lng: 117.1, lat: 36.2, tanghao: '泰山堂' },
    ],
    migration: [
      { name: '济南', lng: 117.0, lat: 36.7, period: '春秋', reason: '敬叔食采鲍邑，鲍氏发祥' },
      { name: '泰山', lng: 117.1, lat: 36.2, period: '汉', reason: '鲍氏居泰山，成郡望' },
      { name: '上党', lng: 113.1, lat: 36.2, period: '汉', reason: '鲍氏迁上党' },
      { name: '新安', lng: 118.4, lat: 29.9, period: '宋', reason: '鲍氏南迁徽州' },
      { name: '广州', lng: 113.3, lat: 23.1, period: '清', reason: '鲍氏南迁岭南' },
    ],
    figures: [
      { name: '鲍叔牙', dynasty: '春秋', achievement: '管鲍之交，知人荐贤' },
      { name: '鲍敬言', dynasty: '晋', achievement: '思想家，无君论' },
      { name: '鲍照', dynasty: '南朝', achievement: '文学家，鲍参军' },
      { name: '鲍廷博', dynasty: '清', achievement: '藏书家，知不足斋' },
    ],
    totem: '鲍字从鱼从包，本义为咸鱼。图腾为海鱼，象征海滨生活。',
    history: '鲍姓源于姒姓敬叔，食采鲍邑得姓。鲍叔牙知人善荐，管鲍之交传为美谈。南朝鲍照以文学著称，泰山鲍氏为郡望。',
  },
  {
    surname: '史',

    pinyin: 'Shǐ',

    rank: 63,

    populationRank: 80,

    population: 300,
    origin: '出自黄帝史官仓颉，以官为氏。亦出自周太史史佚之后。',
    originPlace: { name: '新郑(黄帝都)', lng: 113.7, lat: 34.4 },
    originPeriod: '上古',
    junwang: [
      { name: '建康郡', location: '江苏南京', lng: 118.8, lat: 32.1, tanghao: '建康堂' },
      { name: '京兆郡', location: '陕西西安', lng: 108.9, lat: 34.3, tanghao: '京兆堂' },
    ],
    migration: [
      { name: '新郑', lng: 113.7, lat: 34.4, period: '上古', reason: '仓颉为史官，史氏远祖' },
      { name: '西安', lng: 108.9, lat: 34.3, period: '西周', reason: '史佚为太史，史氏得姓' },
      { name: '南京', lng: 118.8, lat: 32.1, period: '汉', reason: '史氏迁建康，成郡望' },
      { name: '宁化', lng: 116.6, lat: 26.3, period: '唐', reason: '史氏入闽' },
      { name: '溧阳', lng: 119.5, lat: 31.4, period: '明清', reason: '史氏迁江南，文人辈出' },
    ],
    figures: [
      { name: '史佚', dynasty: '西周', achievement: '太史，史氏始祖' },
      { name: '史可法', dynasty: '明末', achievement: '抗清殉国，忠烈之臣' },
      { name: '史震林', dynasty: '清', achievement: '文学家，西青散记' },
      { name: '史量才', dynasty: '近代', achievement: '申报总经理，报业巨子' },
    ],
    totem: '史字从中从又，本义为持笔记事。图腾为手持简册，象征记载传承。',
    history: '史姓源于黄帝史官仓颉及周太史史佚。建康史氏为郡望，明末史可法抗清殉国，近代史量才为报业巨子，史氏以忠义著称。',
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
    surname: '费',

    pinyin: 'Fèi',

    rank: 65,

    populationRank: 156,

    population: 80,
    origin: '出自姬姓，鲁桓公子季友，裔孙费伯，以邑为氏。亦出自姒姓，禹后裔费昌。',
    originPlace: { name: '鱼台(费邑)', lng: 116.6, lat: 35.0 },
    originPeriod: '春秋',
    junwang: [
      { name: '江夏郡', location: '湖北武汉', lng: 114.3, lat: 30.6, tanghao: '江夏堂' },
      { name: '琅琊郡', location: '山东临沂', lng: 118.4, lat: 35.0, tanghao: '琅琊堂' },
    ],
    migration: [
      { name: '鱼台', lng: 116.6, lat: 35.0, period: '春秋', reason: '季友封费邑，费氏发祥' },
      { name: '江夏', lng: 114.3, lat: 30.6, period: '汉', reason: '费氏迁江夏，成郡望' },
      { name: '琅琊', lng: 118.4, lat: 35.0, period: '汉', reason: '费氏居琅琊' },
      { name: '成都', lng: 104.1, lat: 30.7, period: '三国', reason: '费祎佐蜀汉' },
      { name: '苏州', lng: 120.6, lat: 31.3, period: '宋', reason: '费氏南迁江南' },
    ],
    figures: [
      { name: '费祎', dynasty: '三国', achievement: '蜀汉名臣，大将军' },
      { name: '费长房', dynasty: '东汉', achievement: '方术士，悬壶济世' },
      { name: '费密', dynasty: '清', achievement: '思想家，宏道论' },
      { name: '费孝通', dynasty: '近代', achievement: '社会学家，人类学家' },
    ],
    totem: '费字从弗从贝，本义为耗费财货。图腾为散财施惠，象征慷慨。',
    history: '费姓源于姬姓鲁国季友。江夏费氏为郡望，费祎佐蜀汉名垂青史。近代费孝通为社会学泰斗。',
  },
  {
    surname: '廉',

    pinyin: 'Lián',

    rank: 66,

    populationRank: 290,

    population: 22,
    origin: '出自颛顼裔孙大廉，以字为氏。亦出自维吾尔族廉氏。',
    originPlace: { name: '杞县(大廉)', lng: 114.7, lat: 34.5 },
    originPeriod: '上古',
    junwang: [
      { name: '河间郡', location: '河北河间', lng: 116.1, lat: 38.4, tanghao: '河间堂' },
      { name: '汝南郡', location: '河南汝南', lng: 114.4, lat: 33.0, tanghao: '汝南堂' },
    ],
    migration: [
      { name: '杞县', lng: 114.7, lat: 34.5, period: '上古', reason: '大廉得姓，廉氏远祖' },
      { name: '河间', lng: 116.1, lat: 38.4, period: '汉', reason: '廉氏迁河间，成郡望' },
      { name: '中山', lng: 115.0, lat: 38.4, period: '战国', reason: '廉颇居中山，赵国名将' },
      { name: '南京', lng: 118.8, lat: 32.1, period: '明', reason: '廉氏南迁江南' },
      { name: '哈尔滨', lng: 126.5, lat: 45.8, period: '清', reason: '廉氏北迁东北' },
    ],
    figures: [
      { name: '廉颇', dynasty: '战国', achievement: '赵国名将，负荆请罪' },
      { name: '廉公谔', dynasty: '宋', achievement: '循吏，德化一方' },
      { name: '廉布', dynasty: '宋', achievement: '画家' },
      { name: '廉希宪', dynasty: '元', achievement: '宰相，廉孟子' },
    ],
    totem: '廉字从广从兼，本义为堂之侧边。图腾为堂廉方正，象征清正守节。',
    history: '廉姓源于颛顼后裔大廉。战国廉颇为赵国名将，负荆请罪传为美谈。元代廉希宪为宰相，号称"廉孟子"。',
  },
  {
    surname: '岑',

    pinyin: 'Cén',

    rank: 67,

    populationRank: 235,

    population: 35,
    origin: '出自姬姓，周武王封渠季江于岑，子孙以国为氏。',
    originPlace: { name: '南阳(岑国)', lng: 112.5, lat: 33.0 },
    originPeriod: '西周',
    junwang: [
      { name: '南阳郡', location: '河南南阳', lng: 112.5, lat: 33.0, tanghao: '南阳堂' },
      { name: '棘阳郡', location: '河南新野', lng: 112.4, lat: 32.5, tanghao: '棘阳堂' },
    ],
    migration: [
      { name: '南阳', lng: 112.5, lat: 33.0, period: '西周', reason: '渠季江封岑国，岑氏发祥' },
      { name: '棘阳', lng: 112.4, lat: 32.5, period: '汉', reason: '岑氏居棘阳，成郡望' },
      { name: '江陵', lng: 112.2, lat: 30.3, period: '南北朝', reason: '岑氏南迁荆楚' },
      { name: '南宁', lng: 108.4, lat: 22.8, period: '宋', reason: '岑氏入广西' },
      { name: '田阳', lng: 106.7, lat: 23.7, period: '明清', reason: '岑氏土司世袭广西' },
    ],
    figures: [
      { name: '岑彭', dynasty: '东汉', achievement: '云台二十八将，征南大将军' },
      { name: '岑文本', dynasty: '唐', achievement: '宰相，文学家' },
      { name: '岑参', dynasty: '唐', achievement: '边塞诗人，白雪歌' },
      { name: '岑春煊', dynasty: '清', achievement: '两广总督，清末重臣' },
    ],
    totem: '岑字从山从今，本义为高而小之山。图腾为峻岭尖峰，象征高洁耸立。',
    history: '岑姓源于姬姓岑国。南阳岑氏为郡望，东汉岑彭为云台名将，唐代岑参以边塞诗著称。明清岑氏土司世袭广西。',
  },
  {
    surname: '薛',

    pinyin: 'Xuē',

    rank: 68,

    populationRank: 76,

    population: 420,
    origin: '出自妫姓，舜后裔孟尝君田文封于薛，子孙以国为氏。亦出自任姓，黄帝后裔奚仲封薛。',
    originPlace: { name: '枣庄(薛国)', lng: 117.6, lat: 34.8 },
    originPeriod: '夏',
    junwang: [
      { name: '河东郡', location: '山西永济', lng: 110.4, lat: 34.9, tanghao: '河东堂' },
      { name: '新蔡郡', location: '河南新蔡', lng: 114.9, lat: 32.7, tanghao: '新蔡堂' },
    ],
    migration: [
      { name: '枣庄', lng: 117.6, lat: 34.8, period: '夏', reason: '奚仲封薛国，薛氏远祖' },
      { name: '薛城', lng: 117.4, lat: 34.8, period: '战国', reason: '孟尝君田文封薛，子孙以邑为氏' },
      { name: '永济', lng: 110.4, lat: 34.9, period: '汉', reason: '薛氏迁河东，成郡望' },
      { name: '莆田', lng: 119.0, lat: 25.4, period: '唐', reason: '薛氏入闽繁衍' },
      { name: '潮汕', lng: 116.6, lat: 23.2, period: '宋元', reason: '客家薛氏入粤' },
    ],
    figures: [
      { name: '薛仁贵', dynasty: '唐', achievement: '名将，三箭定天山' },
      { name: '薛稷', dynasty: '唐', achievement: '书法家，信行禅师碑' },
      { name: '薛居正', dynasty: '北宋', achievement: '旧五代史监修' },
      { name: '薛涛', dynasty: '唐', achievement: '女诗人，薛涛笺' },
    ],
    totem: '薛字从艹从辛，本义为莎草。图腾为蒿草丛生之地，象征繁茂。',
    history: '薛姓源于任姓奚仲及妫姓孟尝君。河东薛氏最盛，薛仁贵三箭定天山，薛涛为唐代才女，薛氏文武双全。',
  },
  {
    surname: '雷',

    pinyin: 'Léi',

    rank: 69,

    populationRank: 78,

    population: 410,
    origin: '出自方雷氏，炎帝后裔方雷氏之后，以国为氏。亦出自少数民族改姓。',
    originPlace: { name: '新郑(方雷国)', lng: 113.7, lat: 34.4 },
    originPeriod: '上古',
    junwang: [
      { name: '冯翊郡', location: '陕西大荔', lng: 109.9, lat: 34.8, tanghao: '冯翊堂' },
      { name: '豫章郡', location: '江西南昌', lng: 115.9, lat: 28.7, tanghao: '豫章堂' },
    ],
    migration: [
      { name: '新郑', lng: 113.7, lat: 34.4, period: '上古', reason: '方雷氏之后，雷氏远祖' },
      { name: '大荔', lng: 109.9, lat: 34.8, period: '汉', reason: '雷氏迁冯翊，成郡望' },
      { name: '南昌', lng: 115.9, lat: 28.7, period: '晋', reason: '雷焕居豫章，丰城剑气' },
      { name: '宁化', lng: 116.6, lat: 26.3, period: '唐', reason: '雷氏入闽，畲族雷氏繁衍' },
      { name: '梅州', lng: 116.1, lat: 24.3, period: '宋元', reason: '客家雷氏入粤' },
    ],
    figures: [
      { name: '雷焕', dynasty: '晋', achievement: '丰城令，掘得龙泉太阿' },
      { name: '雷海青', dynasty: '唐', achievement: '乐师，安史之乱殉节' },
      { name: '雷万春', dynasty: '唐', achievement: '张巡部将，中六箭不倒' },
      { name: '雷震', dynasty: '近代', achievement: '台湾政治家，自由中国' },
    ],
    totem: '雷字从雨从畾，本义为雷电。图腾为闪电雷鸣，象征威严天威。',
    history: '雷姓源于方雷氏。冯翊雷氏为郡望，豫章雷氏繁盛南方。畲族雷氏为南方大姓，雷氏在少数民族中分布尤广。',
  },
  {
    surname: '贺',

    pinyin: 'Hè',

    rank: 70,

    populationRank: 87,

    population: 230,
    origin: '出自姜姓，齐桓公裔孙庆封，后避汉安帝父讳改贺。亦出自鲜卑族贺兰氏改姓。',
    originPlace: { name: '淄博(齐国)', lng: 118.0, lat: 36.8 },
    originPeriod: '春秋',
    junwang: [
      { name: '广平郡', location: '河北邯郸', lng: 114.5, lat: 36.1, tanghao: '广平堂' },
      { name: '会稽郡', location: '浙江绍兴', lng: 120.6, lat: 30.0, tanghao: '会稽堂' },
    ],
    migration: [
      { name: '淄博', lng: 118.0, lat: 36.8, period: '春秋', reason: '庆封之后，贺氏远祖' },
      { name: '绍兴', lng: 120.6, lat: 30.0, period: '汉', reason: '贺氏迁会稽，成最大郡望' },
      { name: '洛阳', lng: 112.4, lat: 34.6, period: '北魏', reason: '贺兰氏改贺姓，居洛阳' },
      { name: '长沙', lng: 112.9, lat: 28.2, period: '唐', reason: '贺氏迁湖南' },
      { name: '梅州', lng: 116.1, lat: 24.3, period: '宋元', reason: '客家贺氏入粤' },
    ],
    figures: [
      { name: '贺知章', dynasty: '唐', achievement: '诗人，四明狂客' },
      { name: '贺铸', dynasty: '北宋', achievement: '词人，贺梅子' },
      { name: '贺龙', dynasty: '近代', achievement: '元帅，两把菜刀闹革命' },
      { name: '贺子珍', dynasty: '近代', achievement: '革命家' },
    ],
    totem: '贺字从加从贝，本义为以礼物相庆贺。图腾为献礼庆贺，象征喜庆祝颂。',
    history: '贺姓源于庆氏避讳改姓。会稽贺氏最盛，贺知章为唐代诗豪。近代贺龙为开国元帅，贺氏在南方分布甚广。',
  },
  {
    surname: '倪',

    pinyin: 'Ní',

    rank: 71,

    populationRank: 111,

    population: 150,
    origin: '出自姬姓，周武王封曹挟于邾，邾武公封子于郳，后去邑为倪。',
    originPlace: { name: '滕州(郳国)', lng: 117.2, lat: 35.1 },
    originPeriod: '西周',
    junwang: [
      { name: '千乘郡', location: '山东高青', lng: 117.8, lat: 37.2, tanghao: '千乘堂' },
      { name: '中山郡', location: '河北定州', lng: 115.0, lat: 38.4, tanghao: '中山堂' },
    ],
    migration: [
      { name: '滕州', lng: 117.2, lat: 35.1, period: '西周', reason: '邾武公封子于郳，倪氏发祥' },
      { name: '高青', lng: 117.8, lat: 37.2, period: '汉', reason: '倪氏居千乘，成郡望' },
      { name: '洛阳', lng: 112.4, lat: 34.6, period: '唐', reason: '倪氏迁中原' },
      { name: '杭州', lng: 120.2, lat: 30.3, period: '宋', reason: '倪氏南迁江南' },
      { name: '无锡', lng: 120.3, lat: 31.5, period: '明清', reason: '倪氏迁无锡，文人辈出' },
    ],
    figures: [
      { name: '倪宽', dynasty: '汉', achievement: '御史大夫，千乘倪氏始祖' },
      { name: '倪瓒', dynasty: '元', achievement: '画家，元四家之一' },
      { name: '倪元璐', dynasty: '明', achievement: '书法家，殉国' },
      { name: '倪志福', dynasty: '近代', achievement: '工人发明家，政治家' },
    ],
    totem: '倪字从人从儿，本义为弱小之人。图腾为小儿，象征繁衍后代。',
    history: '倪姓源于姬姓郳国。千乘倪氏为郡望，元代倪瓒为元四家之一，明代倪元璐殉国，倪氏在江南文风甚盛。',
  },
  {
    surname: '汤',

    pinyin: 'Tāng',

    rank: 72,

    populationRank: 101,

    population: 200,
    origin: '出自子姓，商汤之后，以谥为氏。亦出自荡氏避讳改汤。',
    originPlace: { name: '商丘(商都)', lng: 115.6, lat: 34.4 },
    originPeriod: '商',
    junwang: [
      { name: '中山郡', location: '河北定州', lng: 115.0, lat: 38.4, tanghao: '中山堂' },
      { name: '范阳郡', location: '河北涿州', lng: 115.9, lat: 39.5, tanghao: '范阳堂' },
    ],
    migration: [
      { name: '商丘', lng: 115.6, lat: 34.4, period: '商', reason: '商汤建商，汤氏远祖' },
      { name: '定州', lng: 115.0, lat: 38.4, period: '汉', reason: '汤氏居中山，成郡望' },
      { name: '涿州', lng: 115.9, lat: 39.5, period: '汉', reason: '汤氏迁范阳' },
      { name: '常州', lng: 119.9, lat: 31.8, period: '宋', reason: '汤氏南迁江南' },
      { name: '梅州', lng: 116.1, lat: 24.3, period: '宋元', reason: '客家汤氏入粤' },
    ],
    figures: [
      { name: '汤显祖', dynasty: '明', achievement: '戏曲家，临川四梦' },
      { name: '汤和', dynasty: '明', achievement: '开国功臣，信国公' },
      { name: '汤斌', dynasty: '清', achievement: '理学家，江宁巡抚' },
      { name: '汤恩伯', dynasty: '近代', achievement: '国民党将领' },
    ],
    totem: '汤字从水从昜，本义为热水沸泉。图腾为沸腾之水，象征温热生机。',
    history: '汤姓源于商汤之后。中山汤氏为郡望，明代汤显祖以《牡丹亭》名扬天下，汤和为开国功臣，汤氏在江南分布甚广。',
  },
  {
    surname: '滕',

    pinyin: 'Téng',

    rank: 73,

    populationRank: 167,

    population: 75,
    origin: '出自姬姓，周武王封弟错叔绣于滕，子孙以国为氏。',
    originPlace: { name: '滕州(滕国)', lng: 117.2, lat: 35.1 },
    originPeriod: '西周',
    junwang: [
      { name: '南阳郡', location: '河南南阳', lng: 112.5, lat: 33.0, tanghao: '南阳堂' },
      { name: '北海郡', location: '山东潍坊', lng: 119.1, lat: 36.7, tanghao: '北海堂' },
    ],
    migration: [
      { name: '滕州', lng: 117.2, lat: 35.1, period: '西周', reason: '错叔绣封滕，滕氏发祥' },
      { name: '南阳', lng: 112.5, lat: 33.0, period: '汉', reason: '滕氏迁南阳，成郡望' },
      { name: '北海', lng: 119.1, lat: 36.7, period: '汉', reason: '滕氏居北海' },
      { name: '苏州', lng: 120.6, lat: 31.3, period: '宋', reason: '滕氏南迁江南' },
      { name: '梅州', lng: 116.1, lat: 24.3, period: '宋元', reason: '客家滕氏入粤' },
    ],
    figures: [
      { name: '滕婴', dynasty: '春秋', achievement: '滕国国君' },
      { name: '滕子京', dynasty: '北宋', achievement: '岳阳楼重修者，范仲淹记' },
      { name: '滕茂实', dynasty: '宋', achievement: '忠臣，使金被扣' },
      { name: '滕代远', dynasty: '近代', achievement: '革命家，铁道部长' },
    ],
    totem: '滕字从水从朕，本义为水涌上腾。图腾为腾涌之水，象征升腾向上。',
    history: '滕姓源于姬姓滕国。南阳滕氏为郡望，北宋滕子京重修岳阳楼名垂青史。近代滕代远为革命元勋。',
  },
  {
    surname: '殷',

    pinyin: 'Yīn',

    rank: 74,

    populationRank: 104,

    population: 190,
    origin: '出自子姓，商王盘庚迁殷，子孙以国为氏。亦出自北殷氏之后。',
    originPlace: { name: '安阳(殷都)', lng: 114.4, lat: 36.1 },
    originPeriod: '商',
    junwang: [
      { name: '汝南郡', location: '河南汝南', lng: 114.4, lat: 33.0, tanghao: '汝南堂' },
      { name: '琅琊郡', location: '山东临沂', lng: 118.4, lat: 35.0, tanghao: '琅琊堂' },
    ],
    migration: [
      { name: '安阳', lng: 114.4, lat: 36.1, period: '商', reason: '盘庚迁殷，殷氏远祖' },
      { name: '汝南', lng: 114.4, lat: 33.0, period: '汉', reason: '殷氏迁汝南，成郡望' },
      { name: '琅琊', lng: 118.4, lat: 35.0, period: '汉', reason: '殷氏居琅琊' },
      { name: '苏州', lng: 120.6, lat: 31.3, period: '宋', reason: '殷氏南迁江南' },
      { name: '常州', lng: 119.9, lat: 31.8, period: '明清', reason: '殷氏迁常州，文人辈出' },
    ],
    figures: [
      { name: '殷浩', dynasty: '东晋', achievement: '中军将军，清谈名士' },
      { name: '殷璠', dynasty: '唐', achievement: '诗评家，河岳英灵集' },
      { name: '殷树柏', dynasty: '清', achievement: '画家' },
      { name: '殷夫', dynasty: '近代', achievement: '左联烈士，诗人' },
    ],
    totem: '殷字从㐆从殳，本义为盛乐鼓舞。图腾为礼乐祭祀，象征盛大昌盛。',
    history: '殷姓源于子姓殷商之后。汝南殷氏为郡望，东晋殷浩以清谈著称。近代殷夫为左联烈士，殷氏以忠义文采传世。',
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
    surname: '毕',

    pinyin: 'Bì',

    rank: 76,

    populationRank: 138,

    population: 100,
    origin: '出自姬姓，周文王第十五子毕公高，封于毕，子孙以国为氏。',
    originPlace: { name: '咸阳(毕国)', lng: 108.7, lat: 34.4 },
    originPeriod: '西周',
    junwang: [
      { name: '河南郡', location: '河南洛阳', lng: 112.4, lat: 34.6, tanghao: '河南堂' },
      { name: '范阳郡', location: '河北涿州', lng: 115.9, lat: 39.5, tanghao: '范阳堂' },
    ],
    migration: [
      { name: '咸阳', lng: 108.7, lat: 34.4, period: '西周', reason: '毕公高封毕国，毕氏发祥' },
      { name: '洛阳', lng: 112.4, lat: 34.6, period: '东周', reason: '毕氏东迁河南' },
      { name: '涿州', lng: 115.9, lat: 39.5, period: '汉', reason: '毕氏迁范阳' },
      { name: '衢州', lng: 118.9, lat: 28.9, period: '宋', reason: '毕氏南迁浙江' },
      { name: '文登', lng: 122.0, lat: 37.2, period: '明清', reason: '毕氏迁胶东' },
    ],
    figures: [
      { name: '毕公高', dynasty: '西周', achievement: '文王第十五子，毕氏始祖' },
      { name: '毕昇', dynasty: '北宋', achievement: '活字印刷术发明者' },
      { name: '毕沅', dynasty: '清', achievement: '史学家，续资治通鉴' },
      { name: '毕加索', dynasty: '近代', achievement: '西班牙画家，立体派（非中国籍，仅供参照）' },
    ],
    totem: '毕字从田从比，本义为田猎之网。图腾为猎网，象征田猎捕获。',
    history: '毕姓源于姬姓毕公高。河南毕氏为郡望，北宋毕昇发明活字印刷术，改变人类文明进程。毕氏在江南及胶东均有分布。',
  },
  {
    surname: '郝',

    pinyin: 'Hǎo',

    rank: 77,

    populationRank: 82,

    population: 390,
    origin: '出自郝骨氏，太昊之后。亦出自子姓，帝乙封弟郝省于太原郝乡。',
    originPlace: { name: '太原(郝乡)', lng: 112.5, lat: 37.9 },
    originPeriod: '商',
    junwang: [
      { name: '太原郡', location: '山西太原', lng: 112.5, lat: 37.9, tanghao: '太原堂' },
      { name: '京兆郡', location: '陕西西安', lng: 108.9, lat: 34.3, tanghao: '京兆堂' },
    ],
    migration: [
      { name: '太原', lng: 112.5, lat: 37.9, period: '商', reason: '郝省封太原郝乡，郝氏发祥' },
      { name: '西安', lng: 108.9, lat: 34.3, period: '汉', reason: '郝氏迁京兆' },
      { name: '许昌', lng: 113.8, lat: 34.0, period: '三国', reason: '郝氏居颍川' },
      { name: '保定', lng: 115.5, lat: 38.9, period: '宋', reason: '郝氏北迁河北' },
      { name: '哈尔滨', lng: 126.5, lat: 45.8, period: '清', reason: '郝氏闯关东，东北繁衍' },
    ],
    figures: [
      { name: '郝昭', dynasty: '三国', achievement: '陈仓守将，拒诸葛亮' },
      { name: '郝经', dynasty: '元', achievement: '翰林学士，使宋被扣' },
      { name: '郝懿行', dynasty: '清', achievement: '经学家，尔雅义疏' },
      { name: '郝柏村', dynasty: '近代', achievement: '台湾行政院长' },
    ],
    totem: '郝字从邑从赤，本义为赤色之城。图腾为赤色城邑，象征显赫。',
    history: '郝姓源于子姓郝省，封于太原郝乡。太原郝氏为最大郡望，三国郝昭拒诸葛亮于陈仓，元代郝经使宋被扣，郝氏以忠义著称。',
  },
  {
    surname: '邬',

    pinyin: 'Wū',

    rank: 78,

    populationRank: 194,

    population: 52,
    origin: '出自妘姓，求言邬，封于邬，子孙以邑为氏。亦出自祁姓，赵简子家臣邬臧之后。',
    originPlace: { name: '介休(邬邑)', lng: 111.9, lat: 37.0 },
    originPeriod: '春秋',
    junwang: [
      { name: '颍川郡', location: '河南禹州', lng: 113.5, lat: 34.2, tanghao: '颍川堂' },
      { name: '豫章郡', location: '江西南昌', lng: 115.9, lat: 28.7, tanghao: '豫章堂' },
    ],
    migration: [
      { name: '介休', lng: 111.9, lat: 37.0, period: '春秋', reason: '邬臧食采邬邑，邬氏发祥' },
      { name: '禹州', lng: 113.5, lat: 34.2, period: '汉', reason: '邬氏迁颍川，成郡望' },
      { name: '南昌', lng: 115.9, lat: 28.7, period: '晋', reason: '邬氏迁豫章' },
      { name: '宁化', lng: 116.6, lat: 26.3, period: '唐', reason: '邬氏入闽' },
      { name: '梅州', lng: 116.1, lat: 24.3, period: '宋元', reason: '客家邬氏入粤' },
    ],
    figures: [
      { name: '邬臧', dynasty: '春秋', achievement: '赵简子家臣，邬氏始祖' },
      { name: '邬单', dynasty: '春秋', achievement: '孔子弟子，七十二贤' },
      { name: '邬彤', dynasty: '唐', achievement: '书法家，怀素之师' },
      { name: '邬大昕', dynasty: '宋', achievement: '官员，开东莆' },
    ],
    totem: '邬字从邑从乌，本义为乌鸦栖息之城。图腾为乌鸟城邑，象征聚居。',
    history: '邬姓源于妘姓及祁姓。颍川邬氏为郡望，邬单为孔子弟子，唐代邬彤以书法传世，邬氏人数不多但分布广泛。',
  },
  {
    surname: '安',

    pinyin: 'Ān',

    rank: 79,

    populationRank: 109,

    population: 170,
    origin: '出自姬姓，黄帝后裔安邑氏。亦出自安息国（帕提亚）太子安清入汉，以国为氏。又出自昭武九姓。',
    originPlace: { name: '洛阳(安息侨)', lng: 112.4, lat: 34.6 },
    originPeriod: '汉',
    junwang: [
      { name: '武威郡', location: '甘肃武威', lng: 102.6, lat: 37.9, tanghao: '武威堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.4, lat: 34.6, tanghao: '河南堂' },
    ],
    migration: [
      { name: '洛阳', lng: 112.4, lat: 34.6, period: '汉', reason: '安息太子安清入汉，居洛阳译佛经' },
      { name: '武威', lng: 102.6, lat: 37.9, period: '南北朝', reason: '安氏迁河西走廊' },
      { name: '长安', lng: 108.9, lat: 34.3, period: '唐', reason: '昭武九姓安国人人华，居长安' },
      { name: '保定', lng: 115.5, lat: 38.9, period: '明', reason: '安氏北迁河北' },
      { name: '哈尔滨', lng: 126.5, lat: 45.8, period: '清', reason: '安氏入东北，满族改安姓' },
    ],
    figures: [
      { name: '安清', dynasty: '汉', achievement: '安息国太子，译经大师' },
      { name: '安禄山', dynasty: '唐', achievement: '范阳节度使，安史之乱' },
      { name: '安重荣', dynasty: '五代', achievement: '成德军节度使' },
      { name: '安丙', dynasty: '南宋', achievement: '四川宣抚使，抗金' },
    ],
    totem: '安字从宀从女，本义为室中安坐。图腾为屋下安宁，象征安居定所。',
    history: '安姓多源，有姬姓、安息国、昭武九姓等多支。安息太子安清入汉译经，唐代安氏因安史之乱名声大振，满族改安姓使北方安姓增多。',
  },
  {
    surname: '常',

    pinyin: 'Cháng',

    rank: 80,

    populationRank: 94,

    population: 240,
    origin: '出自姬姓，卫康叔支孙食采于常，子孙以邑为氏。亦出自恒氏避宋讳改常。',
    originPlace: { name: '滕州(常邑)', lng: 117.2, lat: 35.1 },
    originPeriod: '西周',
    junwang: [
      { name: '平原郡', location: '山东平原', lng: 116.4, lat: 37.3, tanghao: '平原堂' },
      { name: '河内郡', location: '河南沁阳', lng: 112.9, lat: 35.1, tanghao: '河内堂' },
    ],
    migration: [
      { name: '滕州', lng: 117.2, lat: 35.1, period: '西周', reason: '康叔支孙封常邑，常氏发祥' },
      { name: '平原', lng: 116.4, lat: 37.3, period: '汉', reason: '常氏迁平原，成郡望' },
      { name: '西安', lng: 108.9, lat: 34.3, period: '唐', reason: '常氏迁长安' },
      { name: '福州', lng: 119.3, lat: 26.1, period: '宋', reason: '常氏南迁入闽' },
      { name: '哈尔滨', lng: 126.5, lat: 45.8, period: '清', reason: '常氏闯关东，东北繁衍' },
    ],
    figures: [
      { name: '常惠', dynasty: '汉', achievement: '长罗侯，佐苏武' },
      { name: '常璩', dynasty: '东晋', achievement: '史学家，华阳国志' },
      { name: '常遇春', dynasty: '明', achievement: '开国功臣，鄂国公' },
      { name: '常香玉', dynasty: '近代', achievement: '豫剧表演艺术家' },
    ],
    totem: '常字从尚从巾，本义为下裳。图腾为衣裳礼制，象征恒常不变。',
    history: '常姓源于姬姓卫康叔之后。平原常氏为郡望，东晋常璩著《华阳国志》，明代常遇春为开国猛将，常氏以忠勇著称。',
  },
  {
    surname: '乐',

    pinyin: 'Lè',

    rank: 81,

    populationRank: 250,

    population: 30,
    origin: '出自子姓，宋王偃之弟乐莒，以字为氏。亦出自姬姓，燕将乐毅之后。',
    originPlace: { name: '商丘(宋国)', lng: 115.6, lat: 34.4 },
    originPeriod: '战国',
    junwang: [
      { name: '南阳郡', location: '河南南阳', lng: 112.5, lat: 33.0, tanghao: '南阳堂' },
      { name: '武威郡', location: '甘肃武威', lng: 102.6, lat: 37.9, tanghao: '武威堂' },
    ],
    migration: [
      { name: '商丘', lng: 115.6, lat: 34.4, period: '战国', reason: '乐莒以字得姓，乐氏发祥' },
      { name: '灵寿', lng: 114.4, lat: 38.3, period: '战国', reason: '乐毅居中山，燕国名将' },
      { name: '南阳', lng: 112.5, lat: 33.0, period: '汉', reason: '乐氏迁南阳，成郡望' },
      { name: '杭州', lng: 120.2, lat: 30.3, period: '宋', reason: '乐氏南迁江南' },
      { name: '广州', lng: 113.3, lat: 23.1, period: '明清', reason: '乐氏入岭南' },
    ],
    figures: [
      { name: '乐毅', dynasty: '战国', achievement: '燕将，下齐七十余城' },
      { name: '乐正子', dynasty: '春秋', achievement: '孟子弟子' },
      { name: '乐府', dynasty: '汉', achievement: '乐府诗采集，文学传统' },
      { name: '乐钧', dynasty: '清', achievement: '文学家，耳食录' },
    ],
    totem: '乐字象形为乐器。图腾为琴瑟钟鼓，象征礼乐文明。',
    history: '乐姓源于子姓乐莒。战国乐毅下齐七十余城，名震天下。南阳乐氏为郡望，乐氏以武功文采传世。',
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
      { name: '于志宁', dynasty: '唐', achievement: '宰相，凌烟阁二十四功臣' },
      { name: '于谦', dynasty: '明', achievement: '北京保卫战，力挽狂澜' },
      { name: '于成龙', dynasty: '清', achievement: '天下第一廉吏' },
      { name: '于右任', dynasty: '近代', achievement: '草书大家，监察院长' },
    ],
    totem: '于字象形为制陶之转盘。图腾为陶轮，象征制陶之职。',
    history: '于姓源于姬姓邘国，去邑为于。东海于氏为郡望，于谦北京保卫战、于成龙天下廉吏，皆为名臣典范。',
  },
  {
    surname: '时',

    pinyin: 'Shí',

    rank: 83,

    populationRank: 164,

    population: 80,
    origin: '出自子姓，春秋宋国大夫来，封于时，子孙以邑为氏。亦出自时辰之官。',
    originPlace: { name: '商丘(宋国)', lng: 115.6, lat: 34.4 },
    originPeriod: '春秋',
    junwang: [
      { name: '陇西郡', location: '甘肃临洮', lng: 103.9, lat: 35.4, tanghao: '陇西堂' },
      { name: '陈留郡', location: '河南开封', lng: 114.3, lat: 34.8, tanghao: '陈留堂' },
    ],
    migration: [
      { name: '商丘', lng: 115.6, lat: 34.4, period: '春秋', reason: '宋大夫封时邑，时氏发祥' },
      { name: '开封', lng: 114.3, lat: 34.8, period: '汉', reason: '时氏迁陈留，成郡望' },
      { name: '临洮', lng: 103.9, lat: 35.4, period: '汉', reason: '时氏迁陇西' },
      { name: '徐州', lng: 117.2, lat: 34.3, period: '宋', reason: '时氏南迁彭城' },
      { name: '南昌', lng: 115.9, lat: 28.7, period: '明清', reason: '时氏迁江西' },
    ],
    figures: [
      { name: '时溥', dynasty: '唐', achievement: '武宁节度使，平黄巢' },
      { name: '时彦', dynasty: '北宋', achievement: '状元，吏部尚书' },
      { name: '时大彬', dynasty: '明', achievement: '紫砂壶大师' },
      { name: '时传祥', dynasty: '近代', achievement: '掏粪工人，全国劳模' },
    ],
    totem: '时字从日从寺，本义为季节时辰。图腾为日晷测时，象征四时有序。',
    history: '时姓源于子姓宋国。陈留时氏为郡望，唐代时溥平黄巢有功，明代时大彬为紫砂壶一代宗师，时氏分布广泛。',
  },
  {
    surname: '傅',

    pinyin: 'Fù',

    rank: 84,

    populationRank: 53,

    population: 610,
    origin: '出自姬姓，商王武丁相傅说，封于傅岩，子孙以地为氏。',
    originPlace: { name: '平陆(傅岩)', lng: 111.2, lat: 34.8 },
    originPeriod: '商',
    junwang: [
      { name: '清河郡', location: '河北清河', lng: 115.7, lat: 37.1, tanghao: '清河堂' },
      { name: '北地郡', location: '甘肃庆阳', lng: 107.6, lat: 36.0, tanghao: '北地堂' },
    ],
    migration: [
      { name: '平陆', lng: 111.2, lat: 34.8, period: '商', reason: '傅说版筑于傅岩，傅氏发祥' },
      { name: '清河', lng: 115.7, lat: 37.1, period: '汉', reason: '傅氏迁清河，成最大郡望' },
      { name: '庆阳', lng: 107.6, lat: 36.0, period: '汉', reason: '傅氏迁北地' },
      { name: '宁德', lng: 119.5, lat: 26.7, period: '唐', reason: '傅氏入闽' },
      { name: '梅州', lng: 116.1, lat: 24.3, period: '宋元', reason: '客家傅氏入粤' },
    ],
    figures: [
      { name: '傅说', dynasty: '商', achievement: '武丁宰相，版筑发明者' },
      { name: '傅玄', dynasty: '西晋', achievement: '文学家，哲学家' },
      { name: '傅山', dynasty: '明末清初', achievement: '思想家，书画家' },
      { name: '傅作义', dynasty: '近代', achievement: '北平和平起义，水利部长' },
    ],
    totem: '傅字从人从搏，本义为辅佐教导。图腾为太师辅佐，象征相业。',
    history: '傅姓源于商相傅说。清河傅氏为最大郡望，傅说版筑起家为千古名臣，近代傅作义北平起义，保护古都，功在千秋。',
  },
  {
    surname: '皮',

    pinyin: 'Pí',

    rank: 85,

    populationRank: 305,

    population: 15,
    origin: '出自姬姓，周卿士樊仲皮之后，以字为氏。亦出自皮氏，以制皮为业。',
    originPlace: { name: '西安(周都)', lng: 108.9, lat: 34.3 },
    originPeriod: '西周',
    junwang: [
      { name: '天水郡', location: '甘肃天水', lng: 105.7, lat: 34.6, tanghao: '天水堂' },
      { name: '下邳郡', location: '江苏睢宁', lng: 117.9, lat: 33.9, tanghao: '下邳堂' },
    ],
    migration: [
      { name: '西安', lng: 108.9, lat: 34.3, period: '西周', reason: '樊仲皮以字为氏，皮氏发祥' },
      { name: '天水', lng: 105.7, lat: 34.6, period: '汉', reason: '皮氏迁天水，成郡望' },
      { name: '睢宁', lng: 117.9, lat: 33.9, period: '汉', reason: '皮氏迁下邳' },
      { name: '襄阳', lng: 112.1, lat: 32.0, period: '晋', reason: '皮氏南迁荆楚' },
      { name: '杭州', lng: 120.2, lat: 30.3, period: '宋', reason: '皮氏迁江南' },
    ],
    figures: [
      { name: '皮日休', dynasty: '唐', achievement: '诗人，与陆龟蒙并称"皮陆"' },
      { name: '皮光业', dynasty: '五代', achievement: '吴越丞相' },
      { name: '皮锡瑞', dynasty: '清', achievement: '经学家，经学历史' },
      { name: '皮定均', dynasty: '近代', achievement: '中将，皮旅威震中原' },
    ],
    totem: '皮字从又从尸，本义为剥取兽皮。图腾为制皮工匠，象征手工技艺。',
    history: '皮姓源于姬姓樊仲皮。天水皮氏为郡望，唐代皮日休以诗文名世，近代皮定均为开国中将，皮氏人数不多但人才辈出。',
  },
  {
    surname: '卞',

    pinyin: 'Biàn',

    rank: 86,

    populationRank: 217,

    population: 38,
    origin: '出自姬姓，曹叔振铎之后，封于卞，子孙以邑为氏。亦出自卞和。',
    originPlace: { name: '泗水(卞邑)', lng: 117.2, lat: 35.6 },
    originPeriod: '西周',
    junwang: [
      { name: '济阳郡', location: '河南兰考', lng: 114.8, lat: 34.8, tanghao: '济阳堂' },
      { name: '琅琊郡', location: '山东临沂', lng: 118.4, lat: 35.0, tanghao: '琅琊堂' },
    ],
    migration: [
      { name: '泗水', lng: 117.2, lat: 35.6, period: '西周', reason: '曹叔之后封卞邑，卞氏发祥' },
      { name: '兰考', lng: 114.8, lat: 34.8, period: '汉', reason: '卞氏迁济阳，成郡望' },
      { name: '临沂', lng: 118.4, lat: 35.0, period: '汉', reason: '卞氏居琅琊' },
      { name: '南京', lng: 118.8, lat: 32.1, period: '晋', reason: '卞壶家族南迁建康' },
      { name: '福州', lng: 119.3, lat: 26.1, period: '宋', reason: '卞氏入闽' },
    ],
    figures: [
      { name: '卞和', dynasty: '春秋', achievement: '和氏璧发现者，泣玉荆山' },
      { name: '卞壶', dynasty: '东晋', achievement: '尚书令，苏峻之乱殉国' },
      { name: '卞彬', dynasty: '南朝', achievement: '文学家' },
      { name: '卞之琳', dynasty: '近代', achievement: '诗人，断章' },
    ],
    totem: '卞字象形为法度。图腾为刑法律令，象征守正裁断。',
    history: '卞姓源于姬姓曹叔之后。济阳卞氏为郡望，卞和献和氏璧名垂青史，东晋卞壶殉国，近代卞之琳以诗著称。',
  },
  {
    surname: '齐',

    pinyin: 'Qí',

    rank: 87,

    populationRank: 134,

    population: 110,
    origin: '出自姜姓，齐太公姜子牙之后，以国为氏。亦出自姬姓、妫姓等。',
    originPlace: { name: '淄博(齐国)', lng: 118.1, lat: 36.8 },
    originPeriod: '西周',
    junwang: [
      { name: '汝南郡', location: '河南汝南', lng: 114.4, lat: 33.0, tanghao: '汝南堂' },
      { name: '兰陵郡', location: '山东兰陵', lng: 118.0, lat: 34.8, tanghao: '兰陵堂' },
    ],
    migration: [
      { name: '淄博', lng: 118.1, lat: 36.8, period: '西周', reason: '太公封齐，齐氏发祥' },
      { name: '汝南', lng: 114.4, lat: 33.0, period: '汉', reason: '齐氏迁汝南，成郡望' },
      { name: '兰陵', lng: 118.0, lat: 34.8, period: '汉', reason: '齐氏居兰陵' },
      { name: '洛阳', lng: 112.4, lat: 34.6, period: '唐', reason: '齐氏北迁中原' },
      { name: '泉州', lng: 118.6, lat: 24.9, period: '宋', reason: '齐氏入闽' },
    ],
    figures: [
      { name: '齐桓公', dynasty: '春秋', achievement: '五霸之首，尊王攘夷' },
      { name: '齐己', dynasty: '唐', achievement: '诗僧，白莲社' },
      { name: '齐白石', dynasty: '近代', achievement: '国画大师，画虾闻名' },
      { name: '齐思和', dynasty: '近代', achievement: '史学家' },
    ],
    totem: '齐字象形为禾麦吐穗齐平。图腾为禾麦，象征农耕丰产。',
    history: '齐姓主出姜姓齐国，太公之后。汝南齐氏为郡望，现代齐白石以画虾闻名。',
  },
  {
    surname: '康',

    pinyin: 'Kāng',

    rank: 88,

    populationRank: 75,

    population: 220,
    origin: '出自姬姓，卫康叔之后，以谥为氏。亦出自西域康国，昭武九姓之一。',
    originPlace: { name: '淇县(卫国)', lng: 114.2, lat: 35.6 },
    originPeriod: '西周',
    junwang: [
      { name: '京兆郡', location: '陕西西安', lng: 108.9, lat: 34.3, tanghao: '京兆堂' },
      { name: '会稽郡', location: '浙江绍兴', lng: 120.6, lat: 30.0, tanghao: '会稽堂' },
    ],
    migration: [
      { name: '淇县', lng: 114.2, lat: 35.6, period: '西周', reason: '康叔封卫，康氏发祥' },
      { name: '长安', lng: 108.9, lat: 34.3, period: '汉', reason: '康氏迁京兆，成郡望' },
      { name: '会稽', lng: 120.6, lat: 30.0, period: '南北朝', reason: '康氏南迁会稽' },
      { name: '泉州', lng: 118.6, lat: 24.9, period: '唐', reason: '康居国人入华，昭武九姓' },
      { name: '梅州', lng: 116.1, lat: 24.3, period: '宋元', reason: '客家康氏入粤' },
    ],
    figures: [
      { name: '康叔', dynasty: '西周', achievement: '卫国始祖，康姓得姓祖' },
      { name: '康海', dynasty: '明', achievement: '前七子之一，文学家' },
      { name: '康有为', dynasty: '近代', achievement: '维新变法领袖' },
      { name: '康广仁', dynasty: '近代', achievement: '戊戌六君子之一' },
    ],
    totem: '康字从广从隶，本义为安宁。图腾为仓廪，象征丰足安康。',
    history: '康姓主出卫康叔之后。京兆康氏最盛，唐代康居国人入华亦姓康。近代康有为变法维新。',
  },
  {
    surname: '伍',

    pinyin: 'Wǔ',

    rank: 89,

    populationRank: 116,

    population: 140,
    origin: '出自芈姓，楚庄王时伍参之后，以名为氏。亦出自姬姓。',
    originPlace: { name: '常德(楚国)', lng: 111.7, lat: 29.0 },
    originPeriod: '春秋',
    junwang: [
      { name: '安定郡', location: '甘肃泾川', lng: 107.4, lat: 35.3, tanghao: '安定堂' },
      { name: '武陵郡', location: '湖南常德', lng: 111.7, lat: 29.0, tanghao: '武陵堂' },
    ],
    migration: [
      { name: '常德', lng: 111.7, lat: 29.0, period: '春秋', reason: '伍参仕楚，伍氏发祥' },
      { name: '阜南', lng: 115.6, lat: 32.6, period: '春秋', reason: '伍举居椒邑' },
      { name: '苏州', lng: 120.6, lat: 31.3, period: '春秋', reason: '伍子胥奔吴，建苏州城' },
      { name: '广州', lng: 113.3, lat: 23.1, period: '宋', reason: '伍氏南迁岭南' },
      { name: '梅州', lng: 116.1, lat: 24.3, period: '明清', reason: '客家伍氏入粤' },
    ],
    figures: [
      { name: '伍子胥', dynasty: '春秋', achievement: '吴国大夫，建苏州城' },
      { name: '伍建章', dynasty: '隋', achievement: '隋初名将' },
      { name: '伍隆起', dynasty: '宋', achievement: '抗元义士' },
      { name: '伍修权', dynasty: '近代', achievement: '外交家' },
    ],
    totem: '伍字从人从五，本义为行伍。图腾为军阵，象征武勇征伐。',
    history: '伍姓主出楚伍参之后。伍子胥奔吴建苏州城，为千古忠烈。武陵伍氏为郡望，岭南伍氏繁衍。',
  },
  {
    surname: '余',

    pinyin: 'Yú',

    rank: 90,

    populationRank: 41,

    population: 650,
    origin: '出自姬姓，由余之后。由余本晋人，后入秦，子孙以字为氏。',
    originPlace: { name: '凤翔(秦国)', lng: 107.4, lat: 34.5 },
    originPeriod: '春秋',
    junwang: [
      { name: '新安郡', location: '浙江衢州', lng: 118.9, lat: 28.9, tanghao: '新安堂' },
      { name: '下邳郡', location: '江苏邳州', lng: 117.9, lat: 34.3, tanghao: '下邳堂' },
    ],
    migration: [
      { name: '凤翔', lng: 107.4, lat: 34.5, period: '春秋', reason: '由余入秦，余氏发祥' },
      { name: '下邳', lng: 117.9, lat: 34.3, period: '汉', reason: '余氏迁下邳，成郡望' },
      { name: '衢州', lng: 118.9, lat: 28.9, period: '唐', reason: '余氏南迁新安' },
      { name: '邵武', lng: 117.5, lat: 27.3, period: '宋', reason: '客家余氏入闽' },
      { name: '梅州', lng: 116.1, lat: 24.3, period: '宋元', reason: '客家余氏入粤' },
    ],
    figures: [
      { name: '由余', dynasty: '春秋', achievement: '秦穆公名臣，余氏始祖' },
      { name: '余靖', dynasty: '北宋', achievement: '庆历四谏' },
      { name: '余玠', dynasty: '南宋', achievement: '抗蒙名臣，筑钓鱼城' },
      { name: '余怀', dynasty: '清', achievement: '文学家，板桥杂记' },
    ],
    totem: '余字象形为支撑之柱。图腾为屋柱，象征安居支撑。',
    history: '余姓源于由余之后。新安余氏最盛，余靖为庆历名臣。客家余氏南迁闽粤，今南方余姓尤多。',
  },
  {
    surname: '元',

    pinyin: 'Yuán',

    rank: 91,

    populationRank: 197,

    population: 50,
    origin: '出自姬姓，卫元咺之后，以谥为氏。亦出自鲜卑拓跋氏，北魏孝文帝改姓元。',
    originPlace: { name: '洛阳(北魏)', lng: 112.4, lat: 34.6 },
    originPeriod: '春秋',
    junwang: [
      { name: '河南郡', location: '河南洛阳', lng: 112.4, lat: 34.6, tanghao: '河南堂' },
      { name: '洛阳郡', location: '河南洛阳', lng: 112.4, lat: 34.6, tanghao: '洛阳堂' },
    ],
    migration: [
      { name: '洛阳', lng: 112.4, lat: 34.6, period: '春秋', reason: '卫元咺之后，元氏发祥' },
      { name: '大同', lng: 113.3, lat: 40.1, period: '北魏', reason: '拓跋氏改姓元，皇族' },
      { name: '洛阳', lng: 112.4, lat: 34.6, period: '北魏', reason: '孝文帝迁都洛阳，元氏鼎盛' },
      { name: '汴梁', lng: 114.3, lat: 34.8, period: '宋', reason: '元氏迁开封' },
      { name: '泉州', lng: 118.6, lat: 24.9, period: '宋元', reason: '元氏南迁' },
    ],
    figures: [
      { name: '元稹', dynasty: '唐', achievement: '诗人，元白' },
      { name: '元结', dynasty: '唐', achievement: '文学家' },
      { name: '元好问', dynasty: '金', achievement: '文学家，论诗三十首' },
      { name: '元世祖', dynasty: '元', achievement: '忽必烈，建元朝' },
    ],
    totem: '元字象形为人首。图腾为头领，象征始祖、首领。',
    history: '元姓主出卫元咺之后，北魏拓跋改姓元，皇族鼎盛。唐代元稹诗名卓著，金代元好问为一代文宗。',
  },
  {
    surname: '卜',

    pinyin: 'Bǔ',

    rank: 92,

    populationRank: 165,

    population: 80,
    origin: '出自夏代卜官，以职为氏。亦出自姬姓，周礼卜人之后。',
    originPlace: { name: '安阳(殷墟)', lng: 114.4, lat: 36.1 },
    originPeriod: '夏',
    junwang: [
      { name: '西河郡', location: '山西汾阳', lng: 111.8, lat: 37.3, tanghao: '西河堂' },
      { name: '武陵郡', location: '湖南常德', lng: 111.7, lat: 29.0, tanghao: '武陵堂' },
    ],
    migration: [
      { name: '安阳', lng: 114.4, lat: 36.1, period: '夏', reason: '卜官世袭，卜氏发祥' },
      { name: '汾阳', lng: 111.8, lat: 37.3, period: '周', reason: '卜氏迁西河' },
      { name: '常德', lng: 111.7, lat: 29.0, period: '汉', reason: '卜氏南迁武陵' },
      { name: '曲阜', lng: 116.6, lat: 35.6, period: '唐', reason: '卜商后裔居鲁' },
      { name: '广州', lng: 113.3, lat: 23.1, period: '宋元', reason: '卜氏南迁岭南' },
    ],
    figures: [
      { name: '卜商', dynasty: '春秋', achievement: '子夏，孔门十哲' },
      { name: '卜式', dynasty: '汉', achievement: '牧羊御史，捐财助边' },
      { name: '卜世臣', dynasty: '明', achievement: '戏曲家' },
      { name: '卜道明', dynasty: '近代', achievement: '教育家' },
    ],
    totem: '卜字象形为龟甲裂纹。图腾为龟甲占卜，象征沟通天人。',
    history: '卜姓源于卜官之职。卜商（子夏）为孔门十哲，西河卜氏为郡望。卜式捐财助边，传为佳话。',
  },
  {
    surname: '顾',

    pinyin: 'Gù',

    rank: 93,

    populationRank: 89,

    population: 230,
    origin: '出自妘姓，顾国之后。亦出自姒姓，越王勾践之后。',
    originPlace: { name: '范县(顾国)', lng: 115.4, lat: 35.9 },
    originPeriod: '夏',
    junwang: [
      { name: '会稽郡', location: '浙江绍兴', lng: 120.6, lat: 30.0, tanghao: '会稽堂' },
      { name: '武陵郡', location: '湖南常德', lng: 111.7, lat: 29.0, tanghao: '武陵堂' },
    ],
    migration: [
      { name: '范县', lng: 115.4, lat: 35.9, period: '夏', reason: '顾国故地，顾氏发祥' },
      { name: '绍兴', lng: 120.6, lat: 30.0, period: '汉', reason: '顾氏南迁会稽，成郡望' },
      { name: '苏州', lng: 120.6, lat: 31.3, period: '三国', reason: '顾雍为吴丞相，吴郡顾氏兴' },
      { name: '无锡', lng: 120.3, lat: 31.6, period: '明', reason: '顾宪成东林党领袖' },
      { name: '昆山', lng: 121.0, lat: 31.4, period: '清', reason: '顾炎武故里' },
    ],
    figures: [
      { name: '顾雍', dynasty: '三国', achievement: '吴国丞相' },
      { name: '顾恺之', dynasty: '东晋', achievement: '画家，洛神赋图' },
      { name: '顾炎武', dynasty: '清', achievement: '思想家，天下兴亡匹夫有责' },
      { name: '顾宪成', dynasty: '明', achievement: '东林党领袖' },
    ],
    totem: '顾字从雇从页，本义为回顾。图腾为回首之鸟，象征慎思追远。',
    history: '顾姓源于顾国之后。会稽顾氏最盛，三国顾雍为吴相，东晋顾恺之以画传世。明末顾宪成、顾炎武为一代宗师。',
  },
  {
    surname: '孟',

    pinyin: 'Mèng',

    rank: 94,

    populationRank: 73,

    population: 240,
    origin: '出自姬姓，鲁桓公之子孟孙氏之后，以字为氏。亦出自卫国孟絷之后。',
    originPlace: { name: '曲阜(鲁国)', lng: 116.6, lat: 35.6 },
    originPeriod: '春秋',
    junwang: [
      { name: '平昌郡', location: '山东安丘', lng: 119.2, lat: 36.4, tanghao: '平昌堂' },
      { name: '东海郡', location: '山东郯城', lng: 118.4, lat: 34.6, tanghao: '东海堂' },
    ],
    migration: [
      { name: '曲阜', lng: 116.6, lat: 35.6, period: '春秋', reason: '孟孙氏食邑，孟氏发祥' },
      { name: '安丘', lng: 119.2, lat: 36.4, period: '汉', reason: '孟氏迁平昌，成郡望' },
      { name: '郯城', lng: 118.4, lat: 34.6, period: '汉', reason: '孟氏居东海' },
      { name: '襄阳', lng: 112.1, lat: 32.0, period: '唐', reason: '孟浩然居襄阳' },
      { name: '泉州', lng: 118.6, lat: 24.9, period: '宋', reason: '孟氏南迁' },
    ],
    figures: [
      { name: '孟子', dynasty: '战国', achievement: '亚圣，儒家代表' },
      { name: '孟浩然', dynasty: '唐', achievement: '山水田园诗人' },
      { name: '孟郊', dynasty: '唐', achievement: '诗人，游子吟' },
      { name: '孟珙', dynasty: '南宋', achievement: '抗蒙名将' },
    ],
    totem: '孟字从子从皿，本义为长子。图腾为长嗣，象征宗法继承。',
    history: '孟姓主出鲁孟孙氏之后。孟子为亚圣，邹城孟氏世家最盛。唐代孟浩然、孟郊以诗名世。',
  },
  {
    surname: '平',

    pinyin: 'Píng',

    rank: 95,

    populationRank: 173,

    population: 70,
    origin: '出自姬姓，韩哀侯之子平氏之后。亦出自齐国晏平仲之后。',
    originPlace: { name: '新郑(韩国)', lng: 113.7, lat: 34.4 },
    originPeriod: '战国',
    junwang: [
      { name: '河内郡', location: '河南沁阳', lng: 112.9, lat: 35.1, tanghao: '河内堂' },
      { name: '汝南郡', location: '河南汝南', lng: 114.4, lat: 33.0, tanghao: '汝南堂' },
    ],
    migration: [
      { name: '新郑', lng: 113.7, lat: 34.4, period: '战国', reason: '韩平氏发祥' },
      { name: '沁阳', lng: 112.9, lat: 35.1, period: '汉', reason: '平氏迁河内，成郡望' },
      { name: '汝南', lng: 114.4, lat: 33.0, period: '汉', reason: '平当居汝南' },
      { name: '洛阳', lng: 112.4, lat: 34.6, period: '唐', reason: '平氏北迁中原' },
      { name: '苏州', lng: 120.6, lat: 31.3, period: '宋', reason: '平氏南迁江南' },
    ],
    figures: [
      { name: '平当', dynasty: '汉', achievement: '丞相' },
      { name: '平安', dynasty: '明', achievement: '将领' },
      { name: '平步青', dynasty: '清', achievement: '学者' },
      { name: '平海澜', dynasty: '近代', achievement: '教育家' },
    ],
    totem: '平字象形为号角平吹。图腾为平地，象征中正安舒。',
    history: '平姓主出韩平氏之后。河内平氏为郡望，汉代平当官至丞相。今平姓人数不多但分布广泛。',
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
      { name: '江夏', lng: 114.3, lat: 30.6, period: '汉', reason: '黄香扇枕温衾，江夏黄氏始祖' },
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
    surname: '和',

    pinyin: 'Hé',

    rank: 97,

    populationRank: 193,

    population: 60,
    origin: '出自羲和氏，为尧时掌天地之官。亦出自卞和、和仲之后。',
    originPlace: { name: '商丘(羲和氏)', lng: 115.7, lat: 34.4 },
    originPeriod: '上古',
    junwang: [
      { name: '汝南郡', location: '河南汝南', lng: 114.4, lat: 33.0, tanghao: '汝南堂' },
      { name: '代郡', location: '山西大同', lng: 113.3, lat: 40.1, tanghao: '代郡堂' },
    ],
    migration: [
      { name: '商丘', lng: 115.7, lat: 34.4, period: '上古', reason: '羲和氏掌天地，和氏发祥' },
      { name: '汝南', lng: 114.4, lat: 33.0, period: '汉', reason: '和氏迁汝南，成郡望' },
      { name: '大同', lng: 113.3, lat: 40.1, period: '北魏', reason: '和氏迁代郡' },
      { name: '洛阳', lng: 112.4, lat: 34.6, period: '唐', reason: '和氏居中原' },
      { name: '苏州', lng: 120.6, lat: 31.3, period: '宋', reason: '和氏南迁江南' },
    ],
    figures: [
      { name: '和峤', dynasty: '西晋', achievement: '中书令，有钱癖' },
      { name: '和凝', dynasty: '五代', achievement: '宰相，文学家' },
      { name: '和珅', dynasty: '清', achievement: '权臣，巨贪' },
      { name: '和齐嘉', dynasty: '近代', achievement: '学者' },
    ],
    totem: '和字从禾从口，本义为声音相应。图腾为禾笙，象征和谐共振。',
    history: '和姓主出羲和氏之后。汝南和氏为郡望，西晋和峤、五代和凝皆名臣。清代和珅权倾一时。',
  },
  {
    surname: '穆',

    pinyin: 'Mù',

    rank: 98,

    populationRank: 206,

    population: 45,
    origin: '出自子姓，宋穆公之后，以谥为氏。',
    originPlace: { name: '商丘(宋国)', lng: 115.7, lat: 34.4 },
    originPeriod: '春秋',
    junwang: [
      { name: '河南郡', location: '河南洛阳', lng: 112.4, lat: 34.6, tanghao: '河南堂' },
      { name: '汝南郡', location: '河南汝南', lng: 114.4, lat: 33.0, tanghao: '汝南堂' },
    ],
    migration: [
      { name: '商丘', lng: 115.7, lat: 34.4, period: '春秋', reason: '宋穆公之后，穆氏发祥' },
      { name: '洛阳', lng: 112.4, lat: 34.6, period: '汉', reason: '穆氏迁河南，成郡望' },
      { name: '汝南', lng: 114.4, lat: 33.0, period: '汉', reason: '穆氏居汝南' },
      { name: '西安', lng: 108.9, lat: 34.3, period: '唐', reason: '穆氏迁京兆' },
      { name: '苏州', lng: 120.6, lat: 31.3, period: '宋', reason: '穆氏南迁江南' },
    ],
    figures: [
      { name: '穆宁', dynasty: '唐', achievement: '安史之乱忠臣' },
      { name: '穆修', dynasty: '北宋', achievement: '古文家' },
      { name: '穆相', dynasty: '明', achievement: '官员' },
      { name: '穆彰阿', dynasty: '清', achievement: '权臣' },
    ],
    totem: '穆字从禾从白，本义为美好之禾。图腾为嘉禾，象征敬穆庄美。',
    history: '穆姓主出宋穆公之后。河南穆氏为郡望，唐代穆宁以忠烈称。北宋穆修为古文运动先驱。',
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
  {
    surname: '尹',

    pinyin: 'Yǐn',

    rank: 100,

    populationRank: 91,

    population: 220,
    origin: '出自少昊之后，尹城为氏。亦出自伊尹之后。',
    originPlace: { name: '隰县(尹城)', lng: 110.9, lat: 36.7 },
    originPeriod: '尧',
    junwang: [
      { name: '天水郡', location: '甘肃天水', lng: 105.7, lat: 34.6, tanghao: '天水堂' },
      { name: '河间郡', location: '河北河间', lng: 116.1, lat: 38.5, tanghao: '河间堂' },
    ],
    migration: [
      { name: '隰县', lng: 110.9, lat: 36.7, period: '尧', reason: '少昊之后封尹城，尹氏发祥' },
      { name: '天水', lng: 105.7, lat: 34.6, period: '汉', reason: '尹氏迁天水，成郡望' },
      { name: '河间', lng: 116.1, lat: 38.5, period: '汉', reason: '尹氏居河间' },
      { name: '洛阳', lng: 112.4, lat: 34.6, period: '唐', reason: '尹氏居中原' },
      { name: '苏州', lng: 120.6, lat: 31.3, period: '宋', reason: '尹氏南迁江南' },
    ],
    figures: [
      { name: '尹吉甫', dynasty: '西周', achievement: '诗经采集者' },
      { name: '尹洙', dynasty: '北宋', achievement: '古文家' },
      { name: '尹焞', dynasty: '北宋', achievement: '理学家' },
      { name: '尹继善', dynasty: '清', achievement: '大学士' },
    ],
    totem: '尹字从又从丿，本义为握权杖。图腾为权杖，象征官尹治理。',
    history: '尹姓主出少昊之后。天水尹氏为郡望，尹吉甫采集诗经传为千古。北宋尹洙、尹焞以文学理学称。',
  },
  {
    surname: '姚',

    pinyin: 'Yáo',

    rank: 101,

    populationRank: 62,

    population: 420,
    origin: '出自妫姓，舜帝之后。舜生于姚墟，子孙以地为氏。',
    originPlace: { name: '濮阳(姚墟)', lng: 115.0, lat: 35.8 },
    originPeriod: '上古',
    junwang: [
      { name: '吴兴郡', location: '浙江湖州', lng: 120.1, lat: 30.9, tanghao: '吴兴堂' },
      { name: '南安郡', location: '四川眉山', lng: 103.8, lat: 30.0, tanghao: '南安堂' },
    ],
    migration: [
      { name: '濮阳', lng: 115.0, lat: 35.8, period: '上古', reason: '舜生于姚墟，姚氏发祥' },
      { name: '湖州', lng: 120.1, lat: 30.9, period: '汉', reason: '姚氏迁吴兴，成最大郡望' },
      { name: '眉山', lng: 103.8, lat: 30.0, period: '唐', reason: '姚氏入蜀' },
      { name: '泉州', lng: 118.6, lat: 24.9, period: '宋', reason: '姚氏入闽' },
      { name: '潮汕', lng: 116.6, lat: 23.2, period: '宋元', reason: '客家姚氏入粤' },
    ],
    figures: [
      { name: '姚崇', dynasty: '唐', achievement: '开元名相，救时宰相' },
      { name: '姚合', dynasty: '唐', achievement: '诗人，武功体' },
      { name: '姚广孝', dynasty: '明', achievement: '靖难功臣，黑衣宰相' },
      { name: '姚鼐', dynasty: '清', achievement: '桐城派散文家' },
    ],
    totem: '姚字从女从兆，本义为美好。图腾为桃树，象征长寿吉祥。',
    history: '姚姓源于舜帝之后。吴兴姚氏最盛，姚崇为开元名相。明代姚广孝佐成祖，清代姚鼐为桐城派宗师。',
  },
  {
    surname: '邵',

    pinyin: 'Shào',

    rank: 102,

    populationRank: 83,

    population: 300,
    origin: '出自姬姓，召公奭之后。召转邵，子孙以地为氏。',
    originPlace: { name: '岐山(召国)', lng: 107.6, lat: 34.4 },
    originPeriod: '西周',
    junwang: [
      { name: '博陵郡', location: '河北安平', lng: 115.5, lat: 38.2, tanghao: '博陵堂' },
      { name: '汝南郡', location: '河南汝南', lng: 114.4, lat: 33.0, tanghao: '汝南堂' },
    ],
    migration: [
      { name: '岐山', lng: 107.6, lat: 34.4, period: '西周', reason: '召公封燕，邵氏发祥' },
      { name: '长安', lng: 108.9, lat: 34.3, period: '汉', reason: '邵氏迁京兆' },
      { name: '安平', lng: 115.5, lat: 38.2, period: '汉', reason: '邵氏居博陵，成郡望' },
      { name: '洛阳', lng: 112.4, lat: 34.6, period: '唐', reason: '邵氏迁中原' },
      { name: '苏州', lng: 120.6, lat: 31.3, period: '宋', reason: '邵雍后裔南迁' },
    ],
    figures: [
      { name: '邵雍', dynasty: '北宋', achievement: '理学家，皇极经世' },
      { name: '邵博', dynasty: '宋', achievement: '文学家' },
      { name: '邵晋涵', dynasty: '清', achievement: '史学家' },
      { name: '邵飘萍', dynasty: '近代', achievement: '新闻先驱' },
    ],
    totem: '邵字从召从阝，本义为高地之邑。图腾为城邑，象征封建守土。',
    history: '邵姓源于召公之后。博陵邵氏为郡望，北宋邵雍为理学大家，近代邵飘萍为新闻先驱。',
  },
  {
    surname: '湛',

    pinyin: 'Zhàn',

    rank: 103,

    populationRank: 203,

    population: 47,
    origin: '出自姬姓，卫国人居湛地，以地为氏。亦出自夏代湛国。',
    originPlace: { name: '遂平(湛地)', lng: 114.0, lat: 33.1 },
    originPeriod: '春秋',
    junwang: [
      { name: '豫章郡', location: '江西南昌', lng: 115.9, lat: 28.7, tanghao: '豫章堂' },
      { name: '新淦郡', location: '江西新干', lng: 115.4, lat: 27.8, tanghao: '新淦堂' },
    ],
    migration: [
      { name: '遂平', lng: 114.0, lat: 33.1, period: '春秋', reason: '卫人居湛地，湛氏发祥' },
      { name: '南阳', lng: 112.5, lat: 33.0, period: '汉', reason: '湛氏迁南阳' },
      { name: '南昌', lng: 115.9, lat: 28.7, period: '唐', reason: '湛氏南迁豫章' },
      { name: '苏州', lng: 120.6, lat: 31.3, period: '宋', reason: '湛氏居江南' },
      { name: '广州', lng: 113.3, lat: 23.1, period: '明清', reason: '湛氏入粤' },
    ],
    figures: [
      { name: '湛若水', dynasty: '明', achievement: '理学家，甘泉学派' },
      { name: '湛贲', dynasty: '唐', achievement: '进士' },
      { name: '湛温', dynasty: '五代', achievement: '官员' },
      { name: '湛同', dynasty: '宋', achievement: '文人' },
    ],
    totem: '湛字从水从甚，本义为水深清。图腾为深潭，象征清澈深沉。',
    history: '湛姓源于卫湛地。豫章湛氏为郡望，明代湛若水与王阳明齐名，为理学大家。',
  },
  {
    surname: '汪',

    pinyin: 'Wāng',

    rank: 104,

    populationRank: 56,

    population: 480,
    origin: '出自姬姓，鲁成公之子汪侯之后。亦出自汪芒氏。',
    originPlace: { name: '曲阜(鲁国)', lng: 116.6, lat: 35.6 },
    originPeriod: '春秋',
    junwang: [
      { name: '平阳郡', location: '浙江平阳', lng: 120.6, lat: 27.7, tanghao: '平阳堂' },
      { name: '新安郡', location: '安徽黄山', lng: 118.3, lat: 29.7, tanghao: '新安堂' },
    ],
    migration: [
      { name: '曲阜', lng: 116.6, lat: 35.6, period: '春秋', reason: '鲁汪侯之后，汪氏发祥' },
      { name: '平阳', lng: 120.6, lat: 27.7, period: '汉', reason: '汪氏南迁平阳' },
      { name: '黄山', lng: 118.3, lat: 29.7, period: '唐', reason: '汪华保据六州，新安汪氏兴' },
      { name: '泉州', lng: 118.6, lat: 24.9, period: '宋', reason: '汪氏入闽' },
      { name: '潮汕', lng: 116.6, lat: 23.2, period: '宋元', reason: '客家汪氏入粤' },
    ],
    figures: [
      { name: '汪华', dynasty: '隋末', achievement: '保据六州，吴王' },
      { name: '汪藻', dynasty: '宋', achievement: '文学家' },
      { name: '汪大渊', dynasty: '元', achievement: '航海家，岛夷志略' },
      { name: '汪精卫', dynasty: '近代', achievement: '政治人物' },
    ],
    totem: '汪字从水从王，本义为深广之水。图腾为深水，象征源远流长。',
    history: '汪姓源于鲁汪侯之后。新安汪氏最盛，隋末汪华保据六州。元代汪大渊航海远游，著岛夷志略。',
  },
  {
    surname: '祁',

    pinyin: 'Qí',

    rank: 105,

    populationRank: 105,

    population: 160,
    origin: '出自姬姓，晋献公四世孙祁奚之后，以字为氏。亦出自祁姓（陶唐氏之后）。',
    originPlace: { name: '祁县(晋国)', lng: 112.3, lat: 37.4 },
    originPeriod: '春秋',
    junwang: [
      { name: '太原郡', location: '山西太原', lng: 112.5, lat: 37.9, tanghao: '太原堂' },
      { name: '扶风郡', location: '陕西兴平', lng: 108.5, lat: 34.3, tanghao: '扶风堂' },
    ],
    migration: [
      { name: '祁县', lng: 112.3, lat: 37.4, period: '春秋', reason: '祁奚食邑，祁氏发祥' },
      { name: '太原', lng: 112.5, lat: 37.9, period: '汉', reason: '祁氏迁太原，成郡望' },
      { name: '长安', lng: 108.9, lat: 34.3, period: '唐', reason: '祁氏迁扶风' },
      { name: '洛阳', lng: 112.4, lat: 34.6, period: '宋', reason: '祁氏居中原' },
      { name: '苏州', lng: 120.6, lat: 31.3, period: '明', reason: '祁氏南迁江南' },
    ],
    figures: [
      { name: '祁奚', dynasty: '春秋', achievement: '举贤不避亲仇' },
      { name: '祁韵士', dynasty: '清', achievement: '史学家' },
      { name: '祁隽藻', dynasty: '清', achievement: '体仁阁大学士' },
      { name: '祁彪佳', dynasty: '明', achievement: '忠臣' },
    ],
    totem: '祁字从示从阝，本义为祭地。图腾为祭坛，象征敬天法祖。',
    history: '祁姓源于晋祁奚之后。太原祁氏为郡望，祁奚举贤不避亲仇传为千古。清代祁隽藻为体仁阁大学士。',
  },
  {
    surname: '毛',

    pinyin: 'Máo',

    rank: 106,

    populationRank: 76,

    population: 250,
    origin: '出自姬姓，周文王之子毛叔郑之后，以国为氏。',
    originPlace: { name: '济源(毛国)', lng: 112.6, lat: 35.1 },
    originPeriod: '西周',
    junwang: [
      { name: '西河郡', location: '山西汾阳', lng: 111.8, lat: 37.3, tanghao: '西河堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.4, lat: 34.6, tanghao: '河南堂' },
    ],
    migration: [
      { name: '济源', lng: 112.6, lat: 35.1, period: '西周', reason: '毛叔郑封毛国，毛氏发祥' },
      { name: '洛阳', lng: 112.4, lat: 34.6, period: '汉', reason: '毛氏迁河南，成郡望' },
      { name: '汾阳', lng: 111.8, lat: 37.3, period: '汉', reason: '毛氏居西河' },
      { name: '长沙', lng: 112.9, lat: 28.2, period: '宋', reason: '毛氏南迁湖南' },
      { name: '韶山', lng: 112.5, lat: 27.9, period: '明', reason: '毛氏居韶山' },
    ],
    figures: [
      { name: '毛遂', dynasty: '战国', achievement: '自荐使楚' },
      { name: '毛亨', dynasty: '汉', achievement: '毛诗传人' },
      { name: '毛奇龄', dynasty: '清', achievement: '经学家' },
      { name: '毛泽东', dynasty: '近代', achievement: '开国领袖' },
    ],
    totem: '毛字象形为毛发。图腾为旄牛尾，象征军旗装饰。',
    history: '毛姓源于周毛叔郑之后。西河毛氏为郡望，毛遂自荐传为佳话。近代毛泽东诞生湖南韶山，影响中国命运。',
  },
  {
    surname: '禹',

    pinyin: 'Yǔ',

    rank: 107,

    populationRank: 177,

    population: 65,
    origin: '出自姒姓，大禹之后，以谥为氏。',
    originPlace: { name: '登封(阳城)', lng: 113.0, lat: 34.5 },
    originPeriod: '夏',
    junwang: [
      { name: '陇西郡', location: '甘肃临洮', lng: 103.9, lat: 35.4, tanghao: '陇西堂' },
      { name: '琅琊郡', location: '山东临沂', lng: 118.4, lat: 35.0, tanghao: '琅琊堂' },
    ],
    migration: [
      { name: '登封', lng: 113.0, lat: 34.5, period: '夏', reason: '大禹治水，禹氏发祥' },
      { name: '临洮', lng: 103.9, lat: 35.4, period: '汉', reason: '禹氏迁陇西' },
      { name: '临沂', lng: 118.4, lat: 35.0, period: '汉', reason: '禹氏居琅琊' },
      { name: '洛阳', lng: 112.4, lat: 34.6, period: '唐', reason: '禹氏居中原' },
      { name: '苏州', lng: 120.6, lat: 31.3, period: '宋', reason: '禹氏南迁' },
    ],
    figures: [
      { name: '禹之鼎', dynasty: '清', achievement: '画家' },
      { name: '禹之谟', dynasty: '近代', achievement: '革命烈士' },
      { name: '禹祥', dynasty: '明', achievement: '官员' },
      { name: '禹显', dynasty: '金', achievement: '将军' },
    ],
    totem: '禹字从虫从九，本义为虫名。图腾为龙蛇，象征治水神力。',
    history: '禹姓源于大禹之后。陇西禹氏为郡望，人数不多但源远流长。',
  },
  {
    surname: '狄',

    pinyin: 'Dí',

    rank: 108,

    populationRank: 184,

    population: 60,
    origin: '出自姬姓，周成王封弟孝伯于狄，后裔以国为氏。亦出自狄人。',
    originPlace: { name: '临淄(狄城)', lng: 118.3, lat: 36.8 },
    originPeriod: '西周',
    junwang: [
      { name: '天水郡', location: '甘肃天水', lng: 105.7, lat: 34.6, tanghao: '天水堂' },
      { name: '太原郡', location: '山西太原', lng: 112.5, lat: 37.9, tanghao: '太原堂' },
    ],
    migration: [
      { name: '临淄', lng: 118.3, lat: 36.8, period: '西周', reason: '孝伯封狄，狄氏发祥' },
      { name: '天水', lng: 105.7, lat: 34.6, period: '汉', reason: '狄氏迁天水，成郡望' },
      { name: '太原', lng: 112.5, lat: 37.9, period: '唐', reason: '狄仁杰家族居太原' },
      { name: '洛阳', lng: 112.4, lat: 34.6, period: '唐', reason: '狄仁杰仕唐' },
      { name: '汾阳', lng: 111.8, lat: 37.3, period: '宋', reason: '狄青后裔居西河' },
    ],
    figures: [
      { name: '狄仁杰', dynasty: '唐', achievement: '宰相，神探' },
      { name: '狄青', dynasty: '北宋', achievement: '名将，平侬智高' },
      { name: '狄葆贤', dynasty: '近代', achievement: '报人' },
      { name: '狄楚青', dynasty: '近代', achievement: '教育家' },
    ],
    totem: '狄字从犬从火，本义为猎犬。图腾为猛犬，象征狩猎勇猛。',
    history: '狄姓源于周狄国之后。天水狄氏为郡望，唐代狄仁杰为名相，北宋狄青为名将。',
  },
  {
    surname: '米',

    pinyin: 'Mǐ',

    rank: 109,

    populationRank: 126,

    population: 130,
    origin: '出自西域米国，昭武九姓之一。亦出自芈姓，楚国之后。',
    originPlace: { name: '洛阳(入华)', lng: 112.4, lat: 34.6 },
    originPeriod: '唐',
    junwang: [
      { name: '京兆郡', location: '陕西西安', lng: 108.9, lat: 34.3, tanghao: '京兆堂' },
      { name: '陇西郡', location: '甘肃临洮', lng: 103.9, lat: 35.4, tanghao: '陇西堂' },
    ],
    migration: [
      { name: '洛阳', lng: 112.4, lat: 34.6, period: '唐', reason: '米国人入华，昭武九姓' },
      { name: '长安', lng: 108.9, lat: 34.3, period: '唐', reason: '米氏居京兆' },
      { name: '襄阳', lng: 112.1, lat: 32.0, period: '宋', reason: '米芾居襄阳' },
      { name: '镇江', lng: 119.5, lat: 32.2, period: '宋', reason: '米芾晚年居镇江' },
      { name: '苏州', lng: 120.6, lat: 31.3, period: '明清', reason: '米氏南迁江南' },
    ],
    figures: [
      { name: '米芾', dynasty: '北宋', achievement: '书法宋四家，米家山水' },
      { name: '米友仁', dynasty: '南宋', achievement: '画家' },
      { name: '米汉雯', dynasty: '清', achievement: '画家' },
      { name: '米万钟', dynasty: '明', achievement: '书画家' },
    ],
    totem: '米字象形为禾穗。图腾为粟米，象征农耕丰产。',
    history: '米姓主出西域米国，昭武九姓之一。北宋米芾为书法宋四家，与其子米友仁创米家山水。',
  },
  {
    surname: '贝',

    pinyin: 'Bèi',

    rank: 110,

    populationRank: 174,

    population: 70,
    origin: '出自姬姓，晋国大夫贝邑之后，以地为氏。亦出自贝丘氏。',
    originPlace: { name: '清河(贝邑)', lng: 115.7, lat: 37.1 },
    originPeriod: '春秋',
    junwang: [
      { name: '清河郡', location: '河北清河', lng: 115.7, lat: 37.1, tanghao: '清河堂' },
      { name: '东武郡', location: '山东诸城', lng: 119.4, lat: 35.9, tanghao: '东武堂' },
    ],
    migration: [
      { name: '清河', lng: 115.7, lat: 37.1, period: '春秋', reason: '晋大夫封贝邑，贝氏发祥' },
      { name: '诸城', lng: 119.4, lat: 35.9, period: '汉', reason: '贝氏迁东武' },
      { name: '苏州', lng: 120.6, lat: 31.3, period: '宋', reason: '贝氏南迁' },
      { name: '杭州', lng: 120.2, lat: 30.3, period: '明', reason: '贝琼居崇德' },
      { name: '广州', lng: 113.3, lat: 23.1, period: '清', reason: '贝氏入粤' },
    ],
    figures: [
      { name: '贝琼', dynasty: '明', achievement: '文学家' },
      { name: '贝泰', dynasty: '明', achievement: '官员' },
      { name: '贝钦世', dynasty: '宋', achievement: '官员' },
      { name: '贝经臣', dynasty: '宋', achievement: '孝子' },
    ],
    totem: '贝字象形为海贝。图腾为贝壳，象征财富交易。',
    history: '贝姓源于晋贝邑之后。清河贝氏为郡望，明代贝琼为文学家。',
  },
  {
    surname: '明',

    pinyin: 'Míng',

    rank: 111,

    populationRank: 281,

    population: 25,
    origin: '出自姬姓，秦穆公名百里视，字孟明，子孙以字为氏。亦出自鲜卑壹斗眷氏改姓。',
    originPlace: { name: '咸阳(秦国)', lng: 108.7, lat: 34.3 },
    originPeriod: '春秋',
    junwang: [
      { name: '平原郡', location: '山东平原', lng: 116.4, lat: 37.2, tanghao: '平原堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.4, lat: 34.6, tanghao: '河南堂' },
    ],
    migration: [
      { name: '咸阳', lng: 108.7, lat: 34.3, period: '春秋', reason: '孟明视之后，明氏发祥' },
      { name: '平原', lng: 116.4, lat: 37.2, period: '汉', reason: '明氏迁平原，成郡望' },
      { name: '洛阳', lng: 112.4, lat: 34.6, period: '南北朝', reason: '明氏居河南' },
      { name: '南京', lng: 118.8, lat: 32.1, period: '南朝', reason: '明僧绍居摄山' },
      { name: '苏州', lng: 120.6, lat: 31.3, period: '宋', reason: '明氏南迁江南' },
    ],
    figures: [
      { name: '明克让', dynasty: '隋', achievement: '学者' },
      { name: '明山宾', dynasty: '南朝', achievement: '官员' },
      { name: '明僧绍', dynasty: '南朝', achievement: '高士' },
      { name: '明玉珍', dynasty: '元', achievement: '大夏国建立者' },
    ],
    totem: '明字从日从月，本义为光明。图腾为日月，象征光明普照。',
    history: '明姓主出秦孟明之后。平原明氏为郡望，南朝明僧绍为高士。',
  },
  {
    surname: '臧',

    pinyin: 'Zāng',

    rank: 112,

    populationRank: 215,

    population: 40,
    origin: '出自姬姓，鲁孝公之子彄，封于臧，后裔以邑为氏。',
    originPlace: { name: '曲阜(鲁国)', lng: 116.6, lat: 35.6 },
    originPeriod: '春秋',
    junwang: [
      { name: '东海郡', location: '山东郯城', lng: 118.4, lat: 34.6, tanghao: '东海堂' },
      { name: '琅琊郡', location: '山东临沂', lng: 118.4, lat: 35.0, tanghao: '琅琊堂' },
    ],
    migration: [
      { name: '曲阜', lng: 116.6, lat: 35.6, period: '春秋', reason: '臧彄封臧，臧氏发祥' },
      { name: '郯城', lng: 118.4, lat: 34.6, period: '汉', reason: '臧氏迁东海' },
      { name: '临沂', lng: 118.4, lat: 35.0, period: '汉', reason: '臧氏居琅琊' },
      { name: '南京', lng: 118.8, lat: 32.1, period: '南朝', reason: '臧氏南迁' },
      { name: '苏州', lng: 120.6, lat: 31.3, period: '宋', reason: '臧氏居江南' },
    ],
    figures: [
      { name: '臧洪', dynasty: '东汉', achievement: '忠烈，死节' },
      { name: '臧荣绪', dynasty: '南朝', achievement: '史学家' },
      { name: '臧懋循', dynasty: '明', achievement: '戏曲家' },
      { name: '臧克家', dynasty: '近代', achievement: '诗人' },
    ],
    totem: '臧字从臣从戈，本义为兵器库。图腾为武库，象征守卫储藏。',
    history: '臧姓源于鲁臧邑之后。东海臧氏为郡望，东汉臧洪为忠烈，近代臧克家为诗人。',
  },
  {
    surname: '计',

    pinyin: 'Jì',

    rank: 113,

    populationRank: 165,

    population: 100,
    origin: '源于姒姓，夏禹后有计氏。周有计纪，鲁有计然。亦作地名，古有计斤城。',
    originPlace: { name: '山东胶州', lng: 120.03, lat: 36.26 },
    originPeriod: '夏朝',
    junwang: [
      { name: '京兆郡', location: '陕西西安', lng: 108.94, lat: 34.27, tanghao: '京兆堂' },
      { name: '齐郡', location: '山东淄博', lng: 118.05, lat: 36.78, tanghao: '齐郡堂' },
    ],
    migration: [
      { name: '山东胶州', lng: 120.03, lat: 36.26, period: '夏朝', reason: '起源地' },
      { name: '陕西西安', lng: 108.94, lat: 34.27, period: '汉代', reason: '中原望族' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '唐代', reason: '东迁洛阳' },
      { name: '江苏苏州', lng: 120.62, lat: 31.32, period: '宋代', reason: '南迁江南' },
      { name: '上海', lng: 121.47, lat: 31.23, period: '明清', reason: '经商定居' },
    ],
    figures: [
      { name: '计然', dynasty: '春秋', achievement: '经济学家，范蠡之师' },
      { name: '计有功', dynasty: '宋', achievement: '学者，著《唐诗纪事》' },
      { name: '计礼', dynasty: '明', achievement: '工部侍郎' },
      { name: '计元勋', dynasty: '清', achievement: '画家' },
    ],
    totem: '计字从言从十，本义为结算。图腾为算筹，象征数算谋划。',
    history: '计姓源于姒姓，夏禹之后。京兆计氏为郡望，春秋计然为谋略家，宋代计有功著《唐诗纪事》。',
  },
  {
    surname: '伏',

    pinyin: 'Fú',

    rank: 114,

    populationRank: 178,

    population: 85,
    origin: '源于风姓，伏羲氏之后。又春秋鲁有伏氏，孔子弟子伏不齐为得姓始祖。',
    originPlace: { name: '山东济南', lng: 117.00, lat: 36.67 },
    originPeriod: '春秋',
    junwang: [
      { name: '太原郡', location: '山西太原', lng: 112.55, lat: 37.87, tanghao: '太原堂' },
      { name: '琅琊郡', location: '山东青岛', lng: 120.38, lat: 36.07, tanghao: '琅琊堂' },
    ],
    migration: [
      { name: '山东济南', lng: 117.00, lat: 36.67, period: '春秋', reason: '起源地' },
      { name: '山西太原', lng: 112.55, lat: 37.87, period: '汉代', reason: '北迁太原' },
      { name: '山东曲阜', lng: 116.98, lat: 35.58, period: '唐代', reason: '近圣裔' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '宋代', reason: '中原定居' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '明清', reason: '南迁江宁' },
    ],
    figures: [
      { name: '伏不齐', dynasty: '春秋', achievement: '孔子弟子，单父宰' },
      { name: '伏胜', dynasty: '西汉', achievement: '经学家，传《尚书》' },
      { name: '伏湛', dynasty: '东汉', achievement: '大司徒' },
      { name: '伏恭', dynasty: '东汉', achievement: '司空' },
    ],
    totem: '伏字从人从犬，本义为驯服。图腾为伏羲八卦，象征文明开创。',
    history: '伏姓源于风姓，伏羲氏之后。太原伏氏为郡望，西汉伏胜传《尚书》，东汉伏湛为大司徒。',
  },
  {
    surname: '成',

    pinyin: 'Chéng',

    rank: 115,

    populationRank: 92,

    population: 220,
    origin: '源于姬姓，周文王第五子郕叔武之后，以国为氏。又楚有成氏，若敖之后。',
    originPlace: { name: '山东宁阳', lng: 116.81, lat: 35.76 },
    originPeriod: '西周',
    junwang: [
      { name: '上谷郡', location: '河北怀来', lng: 115.52, lat: 40.41, tanghao: '上谷堂' },
      { name: '弘农郡', location: '河南灵宝', lng: 110.85, lat: 34.52, tanghao: '弘农堂' },
    ],
    migration: [
      { name: '山东宁阳', lng: 116.81, lat: 35.76, period: '西周', reason: '郕国封地' },
      { name: '河北怀来', lng: 115.52, lat: 40.41, period: '春秋', reason: '北迁上谷' },
      { name: '河南灵宝', lng: 110.85, lat: 34.52, period: '汉代', reason: '弘农望族' },
      { name: '山东菏泽', lng: 115.48, lat: 35.24, period: '唐代', reason: '回迁齐鲁' },
      { name: '江苏苏州', lng: 120.62, lat: 31.32, period: '宋代', reason: '南迁江南' },
    ],
    figures: [
      { name: '成得臣', dynasty: '春秋', achievement: '楚国令尹' },
      { name: '成公绥', dynasty: '西晋', achievement: '文学家' },
      { name: '成无己', dynasty: '金', achievement: '医学家，注《伤寒论》' },
      { name: '成兆才', dynasty: '近代', achievement: '评剧创始人' },
    ],
    totem: '成字从戊从丁，本义为平定。图腾为郕国鼎彝，象征邦国安宁。',
    history: '成姓源于姬姓，郕叔武之后。上谷成氏为郡望，金代成无己注《伤寒论》，近代成兆才创评剧。',
  },
  {
    surname: '戴',

    pinyin: 'Dài',

    rank: 116,

    populationRank: 54,

    population: 440,
    origin: '源于姬姓，周初戴国之后，以国为氏。又宋戴公之后，以谥为氏。',
    originPlace: { name: '河南民权', lng: 115.15, lat: 34.65 },
    originPeriod: '西周',
    junwang: [
      { name: '谯郡', location: '安徽亳州', lng: 115.78, lat: 33.85, tanghao: '谯国堂' },
      { name: '广陵郡', location: '江苏扬州', lng: 119.42, lat: 32.39, tanghao: '广陵堂' },
    ],
    migration: [
      { name: '河南民权', lng: 115.15, lat: 34.65, period: '西周', reason: '戴国封地' },
      { name: '安徽亳州', lng: 115.78, lat: 33.85, period: '春秋', reason: '南迁谯郡' },
      { name: '河南商丘', lng: 115.65, lat: 33.38, period: '汉代', reason: '宋戴公后裔' },
      { name: '江苏扬州', lng: 119.42, lat: 32.39, period: '唐代', reason: '东迁广陵' },
      { name: '广东梅州', lng: 116.12, lat: 24.29, period: '宋代', reason: '南迁岭南' },
    ],
    figures: [
      { name: '戴德', dynasty: '西汉', achievement: '经学家，编《大戴礼记》' },
      { name: '戴圣', dynasty: '西汉', achievement: '经学家，编《小戴礼记》' },
      { name: '戴逵', dynasty: '东晋', achievement: '美术家、雕塑家' },
      { name: '戴震', dynasty: '清', achievement: '哲学家、考据学家' },
    ],
    totem: '戴字从异从戈，本义为承载。图腾为冠冕，象征礼制尊崇。',
    history: '戴姓源于姬姓，戴国之后。谯郡戴氏为郡望，西汉戴德戴圣编《礼记》，清代戴震为考据大师。',
  },
  {
    surname: '谈',

    pinyin: 'Tán',

    rank: 117,

    populationRank: 187,

    population: 70,
    origin: '源于子姓，殷商之后。又周有谈国，以国为氏。亦作地名，江苏有谈山。',
    originPlace: { name: '河南商丘', lng: 115.65, lat: 33.38 },
    originPeriod: '商朝',
    junwang: [
      { name: '广平郡', location: '河北邯郸', lng: 114.54, lat: 36.62, tanghao: '广平堂' },
      { name: '梁国郡', location: '河南商丘', lng: 115.65, lat: 33.38, tanghao: '梁国堂' },
    ],
    migration: [
      { name: '河南商丘', lng: 115.65, lat: 33.38, period: '商朝', reason: '殷商后裔' },
      { name: '河北邯郸', lng: 114.54, lat: 36.62, period: '汉代', reason: '北迁广平' },
      { name: '江苏无锡', lng: 120.30, lat: 31.57, period: '唐代', reason: '南迁江南' },
      { name: '浙江杭州', lng: 120.16, lat: 30.27, period: '宋代', reason: '迁居钱塘' },
      { name: '上海', lng: 121.47, lat: 31.23, period: '明清', reason: '经商定居' },
    ],
    figures: [
      { name: '谈迁', dynasty: '清', achievement: '史学家，著《国榷》' },
      { name: '谈恺', dynasty: '明', achievement: '兵部尚书' },
      { name: '谈钥', dynasty: '宋', achievement: '学者' },
      { name: '谈寿龄', dynasty: '清', achievement: '医学家' },
    ],
    totem: '谈字从言从炎，本义为论说。图腾为钟鼎铭文，象征言传史鉴。',
    history: '谈姓源于子姓，殷商之后。广平谈氏为郡望，清代谈迁著《国榷》为史学巨著。',
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
    surname: '茅',

    pinyin: 'Máo',

    rank: 119,

    populationRank: 168,

    population: 95,
    origin: '源于姬姓，周公第三子茅叔之后，以国为氏。茅国在今山东金乡。',
    originPlace: { name: '山东金乡', lng: 116.23, lat: 35.07 },
    originPeriod: '西周',
    junwang: [
      { name: '东海郡', location: '山东郯城', lng: 118.36, lat: 34.61, tanghao: '东海堂' },
      { name: '晋陵郡', location: '江苏常州', lng: 119.97, lat: 31.78, tanghao: '晋陵堂' },
    ],
    migration: [
      { name: '山东金乡', lng: 116.23, lat: 35.07, period: '西周', reason: '茅国封地' },
      { name: '山东郯城', lng: 118.36, lat: 34.61, period: '春秋', reason: '东迁东海' },
      { name: '陕西西安', lng: 108.94, lat: 34.27, period: '汉代', reason: '西迁京兆' },
      { name: '江苏常州', lng: 119.97, lat: 31.78, period: '唐代', reason: '南迁晋陵' },
      { name: '浙江宁波', lng: 121.55, lat: 29.87, period: '宋代', reason: '迁居四明' },
    ],
    figures: [
      { name: '茅焦', dynasty: '秦', achievement: '谏臣，说秦太后' },
      { name: '茅盈', dynasty: '西汉', achievement: '道士，茅山派祖师' },
      { name: '茅坤', dynasty: '明', achievement: '文学家，唐宋派代表' },
      { name: '茅以升', dynasty: '近代', achievement: '桥梁学家，建钱塘江大桥' },
    ],
    totem: '茅字从草从矛，本义为菅草。图腾为茅草旗幡，象征封国祭祀。',
    history: '茅姓源于姬姓，茅叔之后。东海茅氏为郡望，西汉茅盈创茅山派，近代茅以升为桥梁学家。',
  },
  {
    surname: '庞',

    pinyin: 'Páng',

    rank: 120,

    populationRank: 101,

    population: 180,
    origin: '源于姬姓，周文王子毕公高之后，支庶封于庞乡，因氏。又高阳氏之后有庞氏。',
    originPlace: { name: '陕西西安', lng: 108.94, lat: 34.27 },
    originPeriod: '西周',
    junwang: [
      { name: '始平郡', location: '陕西兴平', lng: 108.49, lat: 34.30, tanghao: '始平堂' },
      { name: '谯郡', location: '安徽亳州', lng: 115.78, lat: 33.85, tanghao: '谯国堂' },
    ],
    migration: [
      { name: '陕西西安', lng: 108.94, lat: 34.27, period: '西周', reason: '毕公高后裔' },
      { name: '陕西兴平', lng: 108.49, lat: 34.30, period: '汉代', reason: '始平望族' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '唐代', reason: '东迁中原' },
      { name: '四川成都', lng: 104.07, lat: 30.67, period: '宋代', reason: '入蜀定居' },
      { name: '广东湛江', lng: 110.36, lat: 21.27, period: '明清', reason: '南迁岭南' },
    ],
    figures: [
      { name: '庞涓', dynasty: '战国', achievement: '魏国名将' },
      { name: '庞统', dynasty: '三国', achievement: '刘备谋士，凤雏' },
      { name: '庞德', dynasty: '三国', achievement: '曹魏名将' },
      { name: '庞安常', dynasty: '宋', achievement: '医学家' },
    ],
    totem: '庞字从广从龙，本义为大屋。图腾为广厦龙柱，象征宗族宏大。',
    history: '庞姓源于姬姓，毕公高之后。始平庞氏为郡望，三国庞统为凤雏，庞德为曹魏名将。',
  },
  {
    surname: '熊',

    pinyin: 'Xióng',

    rank: 121,

    populationRank: 68,

    population: 360,
    origin: '源于芈姓，周成王封熊绎于楚，建楚国，子孙以氏为姓。黄帝有熊氏之后亦有熊氏。',
    originPlace: { name: '湖北秭归', lng: 110.98, lat: 30.83 },
    originPeriod: '西周',
    junwang: [
      { name: '江陵郡', location: '湖北荆州', lng: 112.24, lat: 30.33, tanghao: '江陵堂' },
      { name: '南昌郡', location: '江西南昌', lng: 115.89, lat: 28.68, tanghao: '南昌堂' },
    ],
    migration: [
      { name: '湖北秭归', lng: 110.98, lat: 30.83, period: '西周', reason: '楚国封地' },
      { name: '湖北荆州', lng: 112.24, lat: 30.33, period: '春秋', reason: '楚国都城' },
      { name: '江西南昌', lng: 115.89, lat: 28.68, period: '汉代', reason: '南迁豫章' },
      { name: '湖南长沙', lng: 112.94, lat: 28.23, period: '唐代', reason: '迁居潇湘' },
      { name: '四川成都', lng: 104.07, lat: 30.67, period: '明清', reason: '入蜀定居' },
    ],
    figures: [
      { name: '熊绎', dynasty: '西周', achievement: '楚国始封君' },
      { name: '熊通', dynasty: '春秋', achievement: '楚武王，称王' },
      { name: '熊廷弼', dynasty: '明', achievement: '兵部尚书，辽东经略' },
      { name: '熊十力', dynasty: '近代', achievement: '哲学家，新儒家代表' },
    ],
    totem: '熊字从火从能，本义为火势。图腾为楚人火崇拜，象征祝融之后。',
    history: '熊姓源于芈姓，楚王之后。江陵熊氏为郡望，明代熊廷弼经略辽东，近代熊十力创新儒家。',
  },
  {
    surname: '纪',

    pinyin: 'Jǐ',

    rank: 122,

    populationRank: 122,

    population: 110,
    origin: '源于姜姓，炎帝之后。周武王封炎帝后于纪，建纪国，子孙以国为氏。',
    originPlace: { name: '山东寿光', lng: 118.79, lat: 36.86 },
    originPeriod: '西周',
    junwang: [
      { name: '天水郡', location: '甘肃天水', lng: 105.72, lat: 34.58, tanghao: '天水堂' },
      { name: '平阳郡', location: '山西临汾', lng: 111.52, lat: 36.08, tanghao: '平阳堂' },
    ],
    migration: [
      { name: '山东寿光', lng: 118.79, lat: 36.86, period: '西周', reason: '纪国封地' },
      { name: '山东烟台', lng: 121.39, lat: 37.54, period: '春秋', reason: '纪亡迁东莱' },
      { name: '甘肃天水', lng: 105.72, lat: 34.58, period: '汉代', reason: '西迁天水' },
      { name: '山西临汾', lng: 111.52, lat: 36.08, period: '唐代', reason: '北迁平阳' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江宁' },
    ],
    figures: [
      { name: '纪信', dynasty: '西汉', achievement: '汉将，代刘邦而死' },
      { name: '纪瞻', dynasty: '东晋', achievement: '尚书' },
      { name: '纪晓岚', dynasty: '清', achievement: '学者，编《四库全书》' },
      { name: '纪大奎', dynasty: '清', achievement: '知县，理学名臣' },
    ],
    totem: '纪字从纟从己，本义为理丝。图腾为纪国鼎彝，象征记事秉笔。',
    history: '纪姓源于姜姓，纪国之后。天水纪氏为郡望，西汉纪信忠义殉主，清代纪晓岚编《四库全书》。',
  },
  {
    surname: '舒',

    pinyin: 'Shū',

    rank: 123,

    populationRank: 147,

    population: 90,
    origin: '源于偃姓，皋陶之后。周封偃姓于舒，建舒国，后为楚灭，子孙以国为氏。',
    originPlace: { name: '安徽庐江', lng: 117.29, lat: 31.23 },
    originPeriod: '西周',
    junwang: [
      { name: '京兆郡', location: '陕西西安', lng: 108.94, lat: 34.27, tanghao: '京兆堂' },
      { name: '巨鹿郡', location: '河北平乡', lng: 114.92, lat: 37.07, tanghao: '巨鹿堂' },
    ],
    migration: [
      { name: '安徽庐江', lng: 117.29, lat: 31.23, period: '西周', reason: '舒国封地' },
      { name: '湖北荆州', lng: 112.24, lat: 30.33, period: '春秋', reason: '楚灭舒迁楚' },
      { name: '陕西西安', lng: 108.94, lat: 34.27, period: '汉代', reason: '西迁京兆' },
      { name: '河北平乡', lng: 114.92, lat: 37.07, period: '唐代', reason: '北迁巨鹿' },
      { name: '浙江杭州', lng: 120.16, lat: 30.27, period: '宋代', reason: '南迁钱塘' },
    ],
    figures: [
      { name: '舒翁', dynasty: '宋', achievement: '吉州窑名家' },
      { name: '舒位', dynasty: '清', achievement: '诗人' },
      { name: '舒梦兰', dynasty: '清', achievement: '词学家' },
      { name: '舒庆春', dynasty: '近代', achievement: '作家老舍，著《茶馆》' },
    ],
    totem: '舒字从舍从予，本义为伸展。图腾为舒国弓矢，象征偃武修文。',
    history: '舒姓源于偃姓，舒国之后。京兆舒氏为郡望，近代老舍（舒庆春）为文学巨匠。',
  },
  {
    surname: '屈',

    pinyin: 'Qū',

    rank: 124,

    populationRank: 182,

    population: 76,
    origin: '源于芈姓，楚武王之子瑕封于屈，子孙以邑为氏。屈原为最著名后裔。',
    originPlace: { name: '湖北秭归', lng: 110.98, lat: 30.83 },
    originPeriod: '春秋',
    junwang: [
      { name: '临海郡', location: '浙江临海', lng: 121.13, lat: 28.80, tanghao: '临海堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '湖北秭归', lng: 110.98, lat: 30.83, period: '春秋', reason: '屈瑕封地' },
      { name: '湖南长沙', lng: 112.94, lat: 28.23, period: '战国', reason: '屈原流放' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '汉代', reason: '北迁中原' },
      { name: '浙江临海', lng: 121.13, lat: 28.80, period: '唐代', reason: '南迁临海' },
      { name: '广东广州', lng: 113.27, lat: 23.13, period: '明清', reason: '南迁岭南' },
    ],
    figures: [
      { name: '屈原', dynasty: '战国', achievement: '诗人，著《离骚》' },
      { name: '屈突通', dynasty: '唐', achievement: '凌烟阁功臣' },
      { name: '屈大均', dynasty: '清', achievement: '岭南三大家之一' },
      { name: '屈武', dynasty: '近代', achievement: '政治家' },
    ],
    totem: '屈字从尸从出，本义为弯曲。图腾为楚辞竹简，象征诗骚文脉。',
    history: '屈姓源于芈姓，楚武王子瑕之后。临海屈氏为郡望，屈原为辞赋之祖，唐代屈突通为开国功臣。',
  },
  {
    surname: '项',

    pinyin: 'Xiàng',

    rank: 125,

    populationRank: 163,

    population: 100,
    origin: '源于姬姓，齐太公之后有项地，后为楚灭，子孙以国为氏。亦出自芈姓。',
    originPlace: { name: '河南项城', lng: 114.90, lat: 33.44 },
    originPeriod: '西周',
    junwang: [
      { name: '辽西郡', location: '河北卢龙', lng: 118.86, lat: 39.89, tanghao: '辽西堂' },
      { name: '广平郡', location: '河北邯郸', lng: 114.54, lat: 36.62, tanghao: '广平堂' },
    ],
    migration: [
      { name: '河南项城', lng: 114.90, lat: 33.44, period: '西周', reason: '项国封地' },
      { name: '河北卢龙', lng: 118.86, lat: 39.89, period: '汉代', reason: '北迁辽西' },
      { name: '河北邯郸', lng: 114.54, lat: 36.62, period: '唐代', reason: '迁居广平' },
      { name: '浙江杭州', lng: 120.16, lat: 30.27, period: '宋代', reason: '南迁钱塘' },
      { name: '江苏苏州', lng: 120.62, lat: 31.32, period: '明清', reason: '迁居吴中' },
    ],
    figures: [
      { name: '项燕', dynasty: '战国', achievement: '楚将，抗秦' },
      { name: '项羽', dynasty: '秦', achievement: '西楚霸王' },
      { name: '项斯', dynasty: '唐', achievement: '诗人' },
      { name: '项元汴', dynasty: '明', achievement: '收藏家' },
    ],
    totem: '项字从页从工，本义为颈后。图腾为项国鼎彝，象征诸侯后嗣。',
    history: '项姓源于姬姓，项国之后。辽西项氏为郡望，项羽为西楚霸王，唐代项斯以诗名世。',
  },
  {
    surname: '祝',

    pinyin: 'Zhù',

    rank: 126,

    populationRank: 141,

    population: 100,
    origin: '源于姬姓，黄帝之后。周武王封黄帝后于祝，建祝国，子孙以国为氏。亦为官名，太祝之后。',
    originPlace: { name: '山东济南', lng: 117.00, lat: 36.67 },
    originPeriod: '西周',
    junwang: [
      { name: '太原郡', location: '山西太原', lng: 112.55, lat: 37.87, tanghao: '太原堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '山东济南', lng: 117.00, lat: 36.67, period: '西周', reason: '祝国封地' },
      { name: '山西太原', lng: 112.55, lat: 37.87, period: '汉代', reason: '北迁太原' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '唐代', reason: '迁居中原' },
      { name: '浙江杭州', lng: 120.16, lat: 30.27, period: '宋代', reason: '南迁钱塘' },
      { name: '安徽歙县', lng: 118.43, lat: 29.87, period: '明清', reason: '迁居徽州' },
    ],
    figures: [
      { name: '祝聃', dynasty: '春秋', achievement: '郑国名将' },
      { name: '祝允明', dynasty: '明', achievement: '书法家，吴中才子' },
      { name: '祝枝山', dynasty: '明', achievement: '文学家' },
      { name: '祝大年', dynasty: '近代', achievement: '工笔画家' },
    ],
    totem: '祝字从示从兄，本义为祭主。图腾为祭祀礼器，象征巫祝通神。',
    history: '祝姓源于姬姓，祝国之后。太原祝氏为郡望，明代祝允明为书法大家。',
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
      { name: '董源', dynasty: '五代南唐', achievement: '南派山水画开山' },
      { name: '董其昌', dynasty: '明', achievement: '书画大家，华亭派' },
      { name: '董必武', dynasty: '近代', achievement: '中共创始人之一' },
    ],
    totem: '董字从艹从重，本义为鼎草（药草）。图腾为龙，董父豢龙得姓。',
    history: '董姓源于己姓董父豢龙。济阴董氏为郡望，董仲舒罢黜百家定儒学千年。五代董源开南派山水画，明代董其昌书画双绝。',
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
    surname: '杜',

    pinyin: 'Dù',

    rank: 129,

    populationRank: 47,

    population: 520,
    origin: '源于祁姓，帝尧之后。周成王封尧后于杜，建杜国，后为周宣王所灭，子孙以国为氏。',
    originPlace: { name: '陕西西安', lng: 108.94, lat: 34.27 },
    originPeriod: '西周',
    junwang: [
      { name: '京兆郡', location: '陕西西安', lng: 108.94, lat: 34.27, tanghao: '京兆堂' },
      { name: '汉阳郡', location: '湖北武汉', lng: 114.30, lat: 30.59, tanghao: '汉阳堂' },
    ],
    migration: [
      { name: '陕西西安', lng: 108.94, lat: 34.27, period: '西周', reason: '杜国封地' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '春秋', reason: '东迁中原' },
      { name: '湖北武汉', lng: 114.30, lat: 30.59, period: '唐代', reason: '南迁汉阳' },
      { name: '四川成都', lng: 104.07, lat: 30.67, period: '宋代', reason: '入蜀定居' },
      { name: '广东广州', lng: 113.27, lat: 23.13, period: '明清', reason: '南迁岭南' },
    ],
    figures: [
      { name: '杜康', dynasty: '上古', achievement: '酿酒始祖' },
      { name: '杜甫', dynasty: '唐', achievement: '诗圣，著《三吏三别》' },
      { name: '杜牧', dynasty: '唐', achievement: '诗人' },
      { name: '杜如晦', dynasty: '唐', achievement: '宰相，凌烟阁功臣' },
    ],
    totem: '杜字从木从土，本义为杜树。图腾为杜林，象征封国根脉。',
    history: '杜姓源于祁姓，帝尧之后。京兆杜氏最盛，杜甫为诗圣，杜牧为小杜，杜如晦为贞观名相。',
  },
  {
    surname: '阮',

    pinyin: 'Ruǎn',

    rank: 130,

    populationRank: 131,

    population: 100,
    origin: '源于偃姓，皋陶之后。周有阮国，在今甘肃泾川，后为周文王所灭，子孙以国为氏。',
    originPlace: { name: '甘肃泾川', lng: 107.37, lat: 35.33 },
    originPeriod: '商朝',
    junwang: [
      { name: '陈留郡', location: '河南开封', lng: 114.30, lat: 34.80, tanghao: '陈留堂' },
      { name: '太原郡', location: '山西太原', lng: 112.55, lat: 37.87, tanghao: '太原堂' },
    ],
    migration: [
      { name: '甘肃泾川', lng: 107.37, lat: 35.33, period: '商朝', reason: '阮国封地' },
      { name: '河南开封', lng: 114.30, lat: 34.80, period: '周代', reason: '东迁陈留' },
      { name: '山西太原', lng: 112.55, lat: 37.87, period: '汉代', reason: '北迁太原' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '唐代', reason: '南迁江宁' },
      { name: '福建福州', lng: 119.30, lat: 26.08, period: '宋代', reason: '入闽定居' },
    ],
    figures: [
      { name: '阮籍', dynasty: '魏晋', achievement: '竹林七贤之一' },
      { name: '阮咸', dynasty: '西晋', achievement: '竹林七贤，乐器阮得名' },
      { name: '阮元', dynasty: '清', achievement: '经学家，一代文宗' },
      { name: '阮玲玉', dynasty: '近代', achievement: '电影演员' },
    ],
    totem: '阮字从阝从元，本义为关中地名。图腾为阮国青铜，象征西陲古国。',
    history: '阮姓源于偃姓，皋陶之后。陈留阮氏为郡望，魏晋阮籍阮咸为竹林七贤，清代阮元为经学大师。',
  },
  {
    surname: '蓝',

    pinyin: 'Lán',

    rank: 131,

    populationRank: 240,

    population: 35,
    origin: '源于嬴姓，梁惠王有蓝人，后以邑为氏。亦出自芈姓，楚国蓝邑之后。',
    originPlace: { name: '河南开封', lng: 114.30, lat: 34.80 },
    originPeriod: '战国',
    junwang: [
      { name: '中山郡', location: '河北定州', lng: 115.01, lat: 38.40, tanghao: '中山堂' },
      { name: '汝南郡', location: '河南汝南', lng: 114.36, lat: 33.00, tanghao: '汝南堂' },
    ],
    migration: [
      { name: '河南开封', lng: 114.30, lat: 34.80, period: '战国', reason: '蓝邑起源' },
      { name: '河北定州', lng: 115.01, lat: 38.40, period: '汉代', reason: '北迁中山' },
      { name: '河南汝南', lng: 114.36, lat: 33.00, period: '唐代', reason: '迁居汝南' },
      { name: '福建福州', lng: 119.30, lat: 26.08, period: '宋代', reason: '入闽定居' },
      { name: '广东梅州', lng: 116.12, lat: 24.29, period: '明清', reason: '南迁客家' },
    ],
    figures: [
      { name: '蓝玉', dynasty: '明', achievement: '大将军，凉国公' },
      { name: '蓝廷瑞', dynasty: '明', achievement: '农民起义领袖' },
      { name: '蓝鼎元', dynasty: '清', achievement: '学者，治台名臣' },
      { name: '蓝正樽', dynasty: '清', achievement: '教育家' },
    ],
    totem: '蓝字从草从监，本义为蓼蓝。图腾为蓝草染料，象征衣冠染色。',
    history: '蓝姓源于嬴姓，战国蓝邑之后。中山蓝氏为郡望，明代蓝玉为大将军，清代蓝鼎元治台有功。',
  },
  {
    surname: '闵',

    pinyin: 'Mǐn',

    rank: 132,

    populationRank: 174,

    population: 80,
    origin: '源于姬姓，鲁桓公之后。鲁庄公弟季友立闵公，闵公被弑，后人以谥为氏。',
    originPlace: { name: '山东曲阜', lng: 116.98, lat: 35.58 },
    originPeriod: '春秋',
    junwang: [
      { name: '陇西郡', location: '甘肃临洮', lng: 103.86, lat: 35.37, tanghao: '陇西堂' },
      { name: '太原郡', location: '山西太原', lng: 112.55, lat: 37.87, tanghao: '太原堂' },
    ],
    migration: [
      { name: '山东曲阜', lng: 116.98, lat: 35.58, period: '春秋', reason: '鲁闵公后裔' },
      { name: '甘肃临洮', lng: 103.86, lat: 35.37, period: '汉代', reason: '西迁陇西' },
      { name: '山西太原', lng: 112.55, lat: 37.87, period: '唐代', reason: '北迁太原' },
      { name: '江苏苏州', lng: 120.62, lat: 31.32, period: '宋代', reason: '南迁江南' },
      { name: '浙江湖州', lng: 120.10, lat: 30.87, period: '明清', reason: '迁居吴兴' },
    ],
    figures: [
      { name: '闵子骞', dynasty: '春秋', achievement: '孔子弟子，二十四孝' },
      { name: '闵贡', dynasty: '东汉', achievement: '名士，节操高洁' },
      { name: '闵如霖', dynasty: '明', achievement: '翰林学士' },
      { name: '闵一得', dynasty: '清', achievement: '道士，龙门派' },
    ],
    totem: '闵字从门从文，本义为怜恤。图腾为鲁宫门阙，象征忠孝传承。',
    history: '闵姓源于姬姓，鲁闵公之后。陇西闵氏为郡望，闵子骞为孔子弟子，列二十四孝。',
  },
  {
    surname: '席',

    pinyin: 'Xí',

    rank: 133,

    populationRank: 195,

    population: 60,
    origin: '源于姬姓，晋大夫籍谈之后。籍与席通，后为席氏。亦出自羌族，有席氏。',
    originPlace: { name: '山西临汾', lng: 111.52, lat: 36.08 },
    originPeriod: '春秋',
    junwang: [
      { name: '安定郡', location: '甘肃泾川', lng: 107.37, lat: 35.33, tanghao: '安定堂' },
      { name: '襄阳郡', location: '湖北襄阳', lng: 112.12, lat: 32.01, tanghao: '襄阳堂' },
    ],
    migration: [
      { name: '山西临汾', lng: 111.52, lat: 36.08, period: '春秋', reason: '晋国籍氏' },
      { name: '甘肃泾川', lng: 107.37, lat: 35.33, period: '汉代', reason: '西迁安定' },
      { name: '湖北襄阳', lng: 112.12, lat: 32.01, period: '唐代', reason: '南迁襄阳' },
      { name: '河南开封', lng: 114.30, lat: 34.80, period: '宋代', reason: '回迁中原' },
      { name: '江苏苏州', lng: 120.62, lat: 31.32, period: '明清', reason: '迁居江南' },
    ],
    figures: [
      { name: '席衡', dynasty: '西汉', achievement: '名士' },
      { name: '席豫', dynasty: '唐', achievement: '礼部尚书' },
      { name: '席书', dynasty: '明', achievement: '武英殿大学士' },
      { name: '席佩兰', dynasty: '清', achievement: '女诗人' },
    ],
    totem: '席字从广从巾，本义为铺设。图腾为几席礼器，象征宾客礼制。',
    history: '席姓源于姬姓，晋国籍谈之后，籍席相通。安定席氏为郡望，明代席书为大学士。',
  },
  {
    surname: '季',

    pinyin: 'Jì',

    rank: 134,

    populationRank: 116,

    population: 130,
    origin: '源于姬姓，鲁桓公幼子季友之后，以字为氏。亦出自芈姓，楚有季连氏。',
    originPlace: { name: '山东曲阜', lng: 116.98, lat: 35.58 },
    originPeriod: '春秋',
    junwang: [
      { name: '渤海郡', location: '河北沧州', lng: 116.84, lat: 38.30, tanghao: '渤海堂' },
      { name: '鲁郡', location: '山东曲阜', lng: 116.98, lat: 35.58, tanghao: '鲁国堂' },
    ],
    migration: [
      { name: '山东曲阜', lng: 116.98, lat: 35.58, period: '春秋', reason: '鲁季氏起源' },
      { name: '河北沧州', lng: 116.84, lat: 38.30, period: '汉代', reason: '北迁渤海' },
      { name: '江苏徐州', lng: 117.18, lat: 34.26, period: '唐代', reason: '南迁彭城' },
      { name: '浙江杭州', lng: 120.16, lat: 30.27, period: '宋代', reason: '迁居钱塘' },
      { name: '江苏常州', lng: 119.97, lat: 31.78, period: '明清', reason: '迁居晋陵' },
    ],
    figures: [
      { name: '季友', dynasty: '春秋', achievement: '鲁国正卿，季氏始祖' },
      { name: '季布', dynasty: '西汉', achievement: '侠义之士，一诺千金' },
      { name: '季振宜', dynasty: '清', achievement: '藏书家' },
      { name: '季羡林', dynasty: '近代', achievement: '语言学家，梵文大家' },
    ],
    totem: '季字从禾从子，本义为幼禾。图腾为鲁国季氏宗庙，象征少子传承。',
    history: '季姓源于姬姓，鲁季友之后。渤海季氏为郡望，西汉季布一诺千金，近代季羡林为东方学大师。',
  },
  {
    surname: '麻',

    pinyin: 'Má',

    rank: 135,

    populationRank: 283,

    population: 25,
    origin: '源于芈姓，楚国大夫食采于麻，因氏。亦为地名，汉有麻县。',
    originPlace: { name: '湖北荆州', lng: 112.24, lat: 30.33 },
    originPeriod: '春秋',
    junwang: [
      { name: '上谷郡', location: '河北怀来', lng: 115.52, lat: 40.41, tanghao: '上谷堂' },
      { name: '咸阳郡', location: '陕西咸阳', lng: 108.71, lat: 34.33, tanghao: '咸阳堂' },
    ],
    migration: [
      { name: '湖北荆州', lng: 112.24, lat: 30.33, period: '春秋', reason: '楚国麻邑' },
      { name: '河北怀来', lng: 115.52, lat: 40.41, period: '汉代', reason: '北迁上谷' },
      { name: '陕西咸阳', lng: 108.71, lat: 34.33, period: '唐代', reason: '西迁关中' },
      { name: '浙江杭州', lng: 120.16, lat: 30.27, period: '宋代', reason: '南迁钱塘' },
      { name: '广西桂林', lng: 110.29, lat: 25.27, period: '明清', reason: '南迁岭南' },
    ],
    figures: [
      { name: '麻婴', dynasty: '春秋', achievement: '楚国大夫' },
      { name: '麻秋', dynasty: '后赵', achievement: '将军' },
      { name: '麻祜', dynasty: '隋', achievement: '名将' },
      { name: '麻贵', dynasty: '明', achievement: '将军，抗倭援朝' },
    ],
    totem: '麻字从广从林，本义为麻田。图腾为麻布织机，象征农桑耕织。',
    history: '麻姓源于芈姓，楚国麻邑之后。上谷麻氏为郡望，明代麻贵抗倭援朝，为一代名将。',
  },
  {
    surname: '强',

    pinyin: 'Qiáng',

    rank: 136,

    populationRank: 205,

    population: 50,
    origin: '源于姜姓，齐国大夫强鉏之后。亦为氐族姓，前秦有强氏。又为百济姓。',
    originPlace: { name: '山东淄博', lng: 118.05, lat: 36.78 },
    originPeriod: '春秋',
    junwang: [
      { name: '天水郡', location: '甘肃天水', lng: 105.72, lat: 34.58, tanghao: '天水堂' },
      { name: '丹阳郡', location: '江苏南京', lng: 118.78, lat: 32.04, tanghao: '丹阳堂' },
    ],
    migration: [
      { name: '山东淄博', lng: 118.05, lat: 36.78, period: '春秋', reason: '齐国强氏' },
      { name: '甘肃天水', lng: 105.72, lat: 34.58, period: '汉代', reason: '西迁天水' },
      { name: '陕西西安', lng: 108.94, lat: 34.27, period: '十六国', reason: '氐族强氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '唐代', reason: '南迁丹阳' },
      { name: '浙江杭州', lng: 120.16, lat: 30.27, period: '宋代', reason: '迁居钱塘' },
    ],
    figures: [
      { name: '强鉏', dynasty: '春秋', achievement: '齐国大夫' },
      { name: '强循', dynasty: '唐', achievement: '刺史' },
      { name: '强至', dynasty: '宋', achievement: '诗人' },
      { name: '强渊明', dynasty: '宋', achievement: '翰林学士' },
    ],
    totem: '强字从虫从弘，本义为蚚虫。图腾为弓弩强力，象征武勇刚健。',
    history: '强姓源于姜姓，齐国强鉏之后。天水强氏为郡望，氐族强氏在前秦显赫，宋代强至以诗名世。',
  },
  {
    surname: '贾',

    pinyin: 'Jiǎ',

    rank: 137,

    populationRank: 64,

    population: 370,
    origin: '源于姬姓，唐叔虞少子公明封于贾，建贾国，后为晋所灭，子孙以国为氏。',
    originPlace: { name: '山西襄汾', lng: 111.44, lat: 35.88 },
    originPeriod: '西周',
    junwang: [
      { name: '武威郡', location: '甘肃武威', lng: 102.64, lat: 37.93, tanghao: '武威堂' },
      { name: '洛阳郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '洛阳堂' },
    ],
    migration: [
      { name: '山西襄汾', lng: 111.44, lat: 35.88, period: '西周', reason: '贾国封地' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '春秋', reason: '晋灭贾迁洛' },
      { name: '甘肃武威', lng: 102.64, lat: 37.93, period: '汉代', reason: '西迁武威' },
      { name: '山东潍坊', lng: 119.16, lat: 36.70, period: '唐代', reason: '东迁齐鲁' },
      { name: '福建福州', lng: 119.30, lat: 26.08, period: '宋代', reason: '入闽定居' },
    ],
    figures: [
      { name: '贾谊', dynasty: '西汉', achievement: '政论家，著《过秦论》' },
      { name: '贾思勰', dynasty: '北魏', achievement: '农学家，著《齐民要术》' },
      { name: '贾岛', dynasty: '唐', achievement: '诗人，苦吟派' },
      { name: '贾似道', dynasty: '南宋', achievement: '权相' },
    ],
    totem: '贾字从贝从襾，本义为商贾。图腾为贾国贝币，象征交易流通。',
    history: '贾姓源于姬姓，唐叔虞之后。武威贾氏为郡望，西汉贾谊著《过秦论》，北魏贾思勰著《齐民要术》。',
  },
  {
    surname: '路',

    pinyin: 'Lù',

    rank: 138,

    populationRank: 152,

    population: 95,
    origin: '源于姬姓，帝尧之后。周封尧后于路，建路国，子孙以国为氏。亦为水名。',
    originPlace: { name: '山西潞城', lng: 113.23, lat: 36.33 },
    originPeriod: '西周',
    junwang: [
      { name: '内黄郡', location: '河南内黄', lng: 114.90, lat: 35.97, tanghao: '内黄堂' },
      { name: '襄阳郡', location: '湖北襄阳', lng: 112.12, lat: 32.01, tanghao: '襄阳堂' },
    ],
    migration: [
      { name: '山西潞城', lng: 113.23, lat: 36.33, period: '西周', reason: '路国封地' },
      { name: '河南内黄', lng: 114.90, lat: 35.97, period: '汉代', reason: '南迁内黄' },
      { name: '湖北襄阳', lng: 112.12, lat: 32.01, period: '唐代', reason: '南迁襄阳' },
      { name: '江苏苏州', lng: 120.62, lat: 31.32, period: '宋代', reason: '迁居江南' },
      { name: '山东济南', lng: 117.00, lat: 36.67, period: '明清', reason: '回迁齐鲁' },
    ],
    figures: [
      { name: '路隋', dynasty: '唐', achievement: '宰相' },
      { name: '路振', dynasty: '宋', achievement: '史学家' },
      { name: '路迎', dynasty: '明', achievement: '兵部尚书' },
      { name: '路朝霖', dynasty: '清', achievement: '知府，诗人' },
    ],
    totem: '路字从足从各，本义为道路。图腾为路国疆域，象征四通八达。',
    history: '路姓源于姬姓，帝尧之后。内黄路氏为郡望，唐代路隋为宰相，明代路迎为兵部尚书。',
  },
  {
    surname: '娄',

    pinyin: 'Lóu',

    rank: 139,

    populationRank: 150,

    population: 96,
    origin: '源于姒姓，少康之后。周封少康后于娄，建邾国，后为楚灭，子孙以国为氏。',
    originPlace: { name: '山东邹城', lng: 116.97, lat: 35.55 },
    originPeriod: '西周',
    junwang: [
      { name: '谯郡', location: '安徽亳州', lng: 115.78, lat: 33.85, tanghao: '谯国堂' },
      { name: '东阳郡', location: '浙江金华', lng: 119.65, lat: 29.08, tanghao: '东阳堂' },
    ],
    migration: [
      { name: '山东邹城', lng: 116.97, lat: 35.55, period: '西周', reason: '邾国封地' },
      { name: '安徽亳州', lng: 115.78, lat: 33.85, period: '春秋', reason: '南迁谯郡' },
      { name: '河南商丘', lng: 115.65, lat: 33.38, period: '汉代', reason: '迁居中原' },
      { name: '浙江金华', lng: 119.65, lat: 29.08, period: '唐代', reason: '南迁东阳' },
      { name: '浙江绍兴', lng: 120.58, lat: 30.03, period: '宋代', reason: '迁居会稽' },
    ],
    figures: [
      { name: '娄敬', dynasty: '西汉', achievement: '建议迁都长安，赐姓刘' },
      { name: '娄师德', dynasty: '唐', achievement: '宰相' },
      { name: '娄坚', dynasty: '明', achievement: '书法家' },
      { name: '娄东谒', dynasty: '明', achievement: '画家' },
    ],
    totem: '娄字从女从毋，本义为中空。图腾为邾国礼器，象征少康之裔。',
    history: '娄姓源于姒姓，少康之后。谯郡娄氏为郡望，西汉娄敬建议迁都，唐代娄师德为宰相。',
  },
  {
    surname: '危',

    pinyin: 'Wēi',

    rank: 140,

    populationRank: 280,

    population: 25,
    origin: '源于姒姓，夏禹之后。三苗族后裔，迁于三危，因以为氏。亦为古地名。',
    originPlace: { name: '甘肃敦煌', lng: 94.66, lat: 40.14 },
    originPeriod: '夏朝',
    junwang: [
      { name: '齐郡', location: '山东淄博', lng: 118.05, lat: 36.78, tanghao: '齐郡堂' },
      { name: '汝南郡', location: '河南汝南', lng: 114.36, lat: 33.00, tanghao: '汝南堂' },
    ],
    migration: [
      { name: '甘肃敦煌', lng: 94.66, lat: 40.14, period: '夏朝', reason: '三危迁居' },
      { name: '河南汝南', lng: 114.36, lat: 33.00, period: '汉代', reason: '东迁汝南' },
      { name: '山东淄博', lng: 118.05, lat: 36.78, period: '唐代', reason: '东迁齐郡' },
      { name: '江西抚州', lng: 116.36, lat: 27.95, period: '宋代', reason: '南迁临川' },
      { name: '福建邵武', lng: 117.49, lat: 27.34, period: '明清', reason: '入闽定居' },
    ],
    figures: [
      { name: '危稹', dynasty: '宋', achievement: '诗人' },
      { name: '危昭德', dynasty: '宋', achievement: '史馆校勘' },
      { name: '危素', dynasty: '元明', achievement: '学者，参与修史' },
      { name: '危岳', dynasty: '明', achievement: '知府' },
    ],
    totem: '危字从厃从厄，本义为高险。图腾为三危山岳，象征夏裔迁徙。',
    history: '危姓源于姒姓，夏禹之后，迁三危得姓。汝南危氏为郡望，元代危素为参与修史之学者。',
  },
  {
    surname: '江',

    pinyin: 'Jiāng',

    rank: 141,

    populationRank: 52,

    population: 450,
    origin: '源于嬴姓，伯益之后。周封伯益后于江，建江国，后为楚灭，子孙以国为氏。',
    originPlace: { name: '河南正阳', lng: 114.39, lat: 32.61 },
    originPeriod: '西周',
    junwang: [
      { name: '济阳郡', location: '河南兰考', lng: 114.82, lat: 34.82, tanghao: '济阳堂' },
      { name: '淮阳郡', location: '河南周口', lng: 114.65, lat: 33.62, tanghao: '淮阳堂' },
    ],
    migration: [
      { name: '河南正阳', lng: 114.39, lat: 32.61, period: '西周', reason: '江国封地' },
      { name: '河南兰考', lng: 114.82, lat: 34.82, period: '春秋', reason: '北迁济阳' },
      { name: '山东济宁', lng: 116.59, lat: 35.41, period: '汉代', reason: '东迁齐鲁' },
      { name: '福建福州', lng: 119.30, lat: 26.08, period: '唐代', reason: '入闽定居' },
      { name: '广东广州', lng: 113.27, lat: 23.13, period: '明清', reason: '南迁岭南' },
    ],
    figures: [
      { name: '江淹', dynasty: '南朝', achievement: '文学家，江郎才尽' },
      { name: '江参', dynasty: '宋', achievement: '画家' },
      { name: '江永', dynasty: '清', achievement: '经学家，皖派开山' },
      { name: '江藩', dynasty: '清', achievement: '经学家' },
    ],
    totem: '江字从水从工，本义为大江。图腾为江国河流，象征伯益后裔。',
    history: '江姓源于嬴姓，伯益之后。济阳江氏为郡望，南朝江淹以文才著称，清代江永为皖派经学开山。',
  },
  {
    surname: '童',

    pinyin: 'Tóng',

    rank: 142,

    populationRank: 158,

    population: 90,
    origin: '源于姬姓，晋大夫胥童之后，以祖名为氏。亦出自风姓，古有童人氏。',
    originPlace: { name: '山西临汾', lng: 111.52, lat: 36.08 },
    originPeriod: '春秋',
    junwang: [
      { name: '雁门郡', location: '山西代县', lng: 112.96, lat: 39.07, tanghao: '雁门堂' },
      { name: '渤海郡', location: '河北沧州', lng: 116.84, lat: 38.30, tanghao: '渤海堂' },
    ],
    migration: [
      { name: '山西临汾', lng: 111.52, lat: 36.08, period: '春秋', reason: '晋国童氏' },
      { name: '山西代县', lng: 112.96, lat: 39.07, period: '汉代', reason: '北迁雁门' },
      { name: '河北沧州', lng: 116.84, lat: 38.30, period: '唐代', reason: '东迁渤海' },
      { name: '浙江宁波', lng: 121.55, lat: 29.87, period: '宋代', reason: '南迁四明' },
      { name: '江西吉安', lng: 114.99, lat: 27.11, period: '明清', reason: '迁居庐陵' },
    ],
    figures: [
      { name: '童恢', dynasty: '东汉', achievement: '循吏，治北海' },
      { name: '童贯', dynasty: '北宋', achievement: '宦官，枢密使' },
      { name: '童叶庚', dynasty: '清', achievement: '知县，创益智图' },
      { name: '童第周', dynasty: '近代', achievement: '生物学家，克隆先驱' },
    ],
    totem: '童字从立从里，本义为少年。图腾为晋国宗庙，象征少壮承嗣。',
    history: '童姓源于姬姓，晋胥童之后。雁门童氏为郡望，东汉童恢为循吏，近代童第周为克隆先驱。',
  },
  {
    surname: '颜',

    pinyin: 'Yán',

    rank: 143,

    populationRank: 112,

    population: 140,
    origin: '源于曹姓，邾武公字颜，子孙以字为氏。亦出自姬姓，鲁公族有颜氏。',
    originPlace: { name: '山东邹城', lng: 116.97, lat: 35.55 },
    originPeriod: '西周',
    junwang: [
      { name: '琅琊郡', location: '山东青岛', lng: 120.38, lat: 36.07, tanghao: '琅琊堂' },
      { name: '鲁郡', location: '山东曲阜', lng: 116.98, lat: 35.58, tanghao: '鲁国堂' },
    ],
    migration: [
      { name: '山东邹城', lng: 116.97, lat: 35.55, period: '西周', reason: '邾国颜氏' },
      { name: '山东曲阜', lng: 116.98, lat: 35.58, period: '春秋', reason: '鲁国颜氏' },
      { name: '山东青岛', lng: 120.38, lat: 36.07, period: '汉代', reason: '东迁琅琊' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '唐代', reason: '南迁江宁' },
      { name: '福建泉州', lng: 118.67, lat: 24.88, period: '宋代', reason: '入闽定居' },
    ],
    figures: [
      { name: '颜回', dynasty: '春秋', achievement: '孔子最得意弟子，复圣' },
      { name: '颜之推', dynasty: '北齐', achievement: '学者，著《颜氏家训》' },
      { name: '颜真卿', dynasty: '唐', achievement: '书法家，忠臣' },
      { name: '颜师古', dynasty: '唐', achievement: '经学家，注《汉书》' },
    ],
    totem: '颜字从页从彦，本义为眉目之间。图腾为邾国礼器，象征圣贤面容。',
    history: '颜姓源于曹姓，邾武公之后。琅琊颜氏最盛，颜回为复圣，颜真卿为书法大家，颜之推著《颜氏家训》。',
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
    history: '郭姓源于虢国，虢转郭。太原郭氏最盛，郭子仪再造大唐，封汾阳王，子孙以汾阳为堂号。回族郭氏为闽泉特色。',
  },
  {
    surname: '梅',

    pinyin: 'Méi',

    rank: 145,

    populationRank: 136,

    population: 110,
    origin: '源于子姓，殷商太丁封弟于梅，建梅国，后为楚灭，子孙以国为氏。',
    originPlace: { name: '安徽亳州', lng: 115.78, lat: 33.85 },
    originPeriod: '商朝',
    junwang: [
      { name: '汝南郡', location: '河南汝南', lng: 114.36, lat: 33.00, tanghao: '汝南堂' },
      { name: '宣城郡', location: '安徽宣城', lng: 118.76, lat: 30.95, tanghao: '宣城堂' },
    ],
    migration: [
      { name: '安徽亳州', lng: 115.78, lat: 33.85, period: '商朝', reason: '梅国封地' },
      { name: '河南汝南', lng: 114.36, lat: 33.00, period: '周代', reason: '北迁汝南' },
      { name: '湖北麻城', lng: 115.02, lat: 31.17, period: '唐代', reason: '南迁荆楚' },
      { name: '安徽宣城', lng: 118.76, lat: 30.95, period: '宋代', reason: '迁居宣城' },
      { name: '广东梅州', lng: 116.12, lat: 24.29, period: '明清', reason: '南迁岭南' },
    ],
    figures: [
      { name: '梅福', dynasty: '西汉', achievement: '南昌尉，后成仙传说' },
      { name: '梅尧臣', dynasty: '宋', achievement: '诗人，宋诗开山' },
      { name: '梅鼎祚', dynasty: '明', achievement: '文学家' },
      { name: '梅兰芳', dynasty: '近代', achievement: '京剧大师' },
    ],
    totem: '梅字从木从每，本义为梅树。图腾为梅国乔木，象征殷商封裔。',
    history: '梅姓源于子姓，殷商之后。汝南梅氏为郡望，西汉梅福有仙化传说，宋代梅尧臣为宋诗开山，近代梅兰芳为京剧大师。',
  },
  {
    surname: '盛',

    pinyin: 'Shèng',

    rank: 146,

    populationRank: 175,

    population: 80,
    origin: '源于姬姓，周穆王时盛国之后，以国为氏。亦为地名，古有盛邑。',
    originPlace: { name: '山东泰安', lng: 117.09, lat: 36.19 },
    originPeriod: '西周',
    junwang: [
      { name: '广陵郡', location: '江苏扬州', lng: 119.42, lat: 32.39, tanghao: '广陵堂' },
      { name: '梁国郡', location: '河南商丘', lng: 115.65, lat: 33.38, tanghao: '梁国堂' },
    ],
    migration: [
      { name: '山东泰安', lng: 117.09, lat: 36.19, period: '西周', reason: '盛国封地' },
      { name: '河南商丘', lng: 115.65, lat: 33.38, period: '春秋', reason: '南迁梁国' },
      { name: '江苏扬州', lng: 119.42, lat: 32.39, period: '唐代', reason: '东迁广陵' },
      { name: '浙江杭州', lng: 120.16, lat: 30.27, period: '宋代', reason: '南迁钱塘' },
      { name: '湖南长沙', lng: 112.94, lat: 28.23, period: '明清', reason: '迁居潇湘' },
    ],
    figures: [
      { name: '盛彦', dynasty: '东汉', achievement: '孝子' },
      { name: '盛度', dynasty: '北宋', achievement: '兵部尚书' },
      { name: '盛懋', dynasty: '元', achievement: '画家' },
      { name: '盛宣怀', dynasty: '清', achievement: '实业家，洋务运动' },
    ],
    totem: '盛字从皿从成，本义为盛放。图腾为盛国簋簠，象征丰盛祭祀。',
    history: '盛姓源于姬姓，盛国之后。广陵盛氏为郡望，北宋盛度为兵部尚书，近代盛宣怀为实业家。',
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
      { name: '漳州', lng: 117.7, lat: 24.5, period: '唐', reason: '林氏繁衍闽南，号称无林不开榜' },
      { name: '潮汕', lng: 116.6, lat: 23.2, period: '宋元', reason: '客家林氏入粤' },
    ],
    figures: [
      { name: '林禄', dynasty: '晋', achievement: '入闽始祖，晋安郡王' },
      { name: '林默娘', dynasty: '宋', achievement: '妈祖天后，海上保护神' },
      { name: '林则徐', dynasty: '清', achievement: '虎门销烟，民族英雄' },
      { name: '林语堂', dynasty: '近代', achievement: '文学大师' },
    ],
    totem: '林字从二木，本义为成片之树。图腾为双木（林），象征山林聚居。',
    history: '林姓源于比干之后，逃长林得姓。济南林氏为郡望，林禄入闽开闽林，妈祖林默娘、林则徐皆其后。闽粤台林姓极盛，陈林半天下。',
  },
  {
    surname: '刁',

    pinyin: 'Diāo',

    rank: 148,

    populationRank: 164,

    population: 100,
    origin: '源于姬姓，周文王时雕国之后，雕通刁。亦为百济姓，百济有刁氏。',
    originPlace: { name: '陕西西安', lng: 108.94, lat: 34.27 },
    originPeriod: '西周',
    junwang: [
      { name: '弘农郡', location: '河南灵宝', lng: 110.85, lat: 34.52, tanghao: '弘农堂' },
      { name: '渤海郡', location: '河北沧州', lng: 116.84, lat: 38.30, tanghao: '渤海堂' },
    ],
    migration: [
      { name: '陕西西安', lng: 108.94, lat: 34.27, period: '西周', reason: '雕国封地' },
      { name: '河南灵宝', lng: 110.85, lat: 34.52, period: '汉代', reason: '东迁弘农' },
      { name: '河北沧州', lng: 116.84, lat: 38.30, period: '唐代', reason: '北迁渤海' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江宁' },
      { name: '福建福州', lng: 119.30, lat: 26.08, period: '明清', reason: '入闽定居' },
    ],
    figures: [
      { name: '刁协', dynasty: '东晋', achievement: '尚书令' },
      { name: '刁衎', dynasty: '宋', achievement: '翰林学士' },
      { name: '刁包', dynasty: '明', achievement: '理学家' },
      { name: '刁光胤', dynasty: '唐', achievement: '画家' },
    ],
    totem: '刁字从刀从丶，本义为雕刻。图腾为雕国青铜，象征精工刻画。',
    history: '刁姓源于姬姓，雕国之后。弘农刁氏为郡望，东晋刁协为尚书令，明代刁包为理学家。',
  },
  {
    surname: '钟',

    pinyin: 'Zhōng',

    rank: 149,

    populationRank: 56,

    population: 420,
    origin: '源于子姓，殷商之后。伯宗之子州犁仕楚，食采于钟离，后分为钟氏、离氏。',
    originPlace: { name: '安徽凤阳', lng: 117.56, lat: 32.87 },
    originPeriod: '春秋',
    junwang: [
      { name: '颍川郡', location: '河南禹州', lng: 113.47, lat: 34.16, tanghao: '颍川堂' },
      { name: '竟陵郡', location: '湖北天门', lng: 113.17, lat: 30.65, tanghao: '竟陵堂' },
    ],
    migration: [
      { name: '安徽凤阳', lng: 117.56, lat: 32.87, period: '春秋', reason: '钟离封地' },
      { name: '河南禹州', lng: 113.47, lat: 34.16, period: '汉代', reason: '北迁颍川' },
      { name: '湖北天门', lng: 113.17, lat: 30.65, period: '唐代', reason: '南迁竟陵' },
      { name: '江西赣州', lng: 114.93, lat: 25.83, period: '宋代', reason: '南迁客家' },
      { name: '广东梅州', lng: 116.12, lat: 24.29, period: '明清', reason: '入粤定居' },
    ],
    figures: [
      { name: '钟子期', dynasty: '春秋', achievement: '知音，伯牙之友' },
      { name: '钟繇', dynasty: '三国', achievement: '书法家，楷书之祖' },
      { name: '钟会', dynasty: '三国', achievement: '灭蜀汉将领' },
      { name: '钟嵘', dynasty: '南朝', achievement: '文学批评家，著《诗品》' },
    ],
    totem: '钟字从金从重，本义为酒器。图腾为编钟礼乐，象征宗庙韶乐。',
    history: '钟姓源于子姓，州犁之后。颍川钟氏最盛，钟繇为楷书之祖，钟子期为知音典范，钟嵘著《诗品》。',
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
    surname: '邱',

    pinyin: 'Qiū',

    rank: 151,

    populationRank: 65,

    population: 360,
    origin: '源于姜姓，太公望封齐都营丘，支庶以地为氏。丘与邱通，清雍正后多改邱。',
    originPlace: { name: '山东昌乐', lng: 118.83, lat: 36.39 },
    originPeriod: '西周',
    junwang: [
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
      { name: '吴兴郡', location: '浙江湖州', lng: 120.10, lat: 30.87, tanghao: '吴兴堂' },
    ],
    migration: [
      { name: '山东昌乐', lng: 118.83, lat: 36.39, period: '西周', reason: '营丘起源' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '汉代', reason: '西迁河南' },
      { name: '甘肃天水', lng: 105.72, lat: 34.58, period: '唐代', reason: '西迁陇西' },
      { name: '福建泉州', lng: 118.67, lat: 24.88, period: '宋代', reason: '入闽定居' },
      { name: '广东潮州', lng: 116.63, lat: 23.68, period: '明清', reason: '南迁岭南' },
    ],
    figures: [
      { name: '丘处机', dynasty: '金元', achievement: '道士，全真七子' },
      { name: '丘濬', dynasty: '明', achievement: '文渊阁大学士' },
      { name: '邱迟', dynasty: '南朝', achievement: '文学家' },
      { name: '邱少云', dynasty: '近代', achievement: '烈士' },
    ],
    totem: '邱字从阝从丘，本义为丘墟。图腾为营丘社稷，象征太公后裔。',
    history: '邱姓源于姜姓，太公望之后，营丘得氏。河南邱氏为郡望，金元丘处机为全真高道，明代丘濬为大学士。',
  },
  {
    surname: '骆',

    pinyin: 'Luò',

    rank: 152,

    populationRank: 132,

    population: 100,
    origin: '源于姜姓，齐太公之后有骆子，后以字为氏。亦为嬴姓，恶来革之后。',
    originPlace: { name: '山东淄博', lng: 118.05, lat: 36.78 },
    originPeriod: '西周',
    junwang: [
      { name: '内黄郡', location: '河南内黄', lng: 114.90, lat: 35.97, tanghao: '内黄堂' },
      { name: '会稽郡', location: '浙江绍兴', lng: 120.58, lat: 30.03, tanghao: '会稽堂' },
    ],
    migration: [
      { name: '山东淄博', lng: 118.05, lat: 36.78, period: '西周', reason: '齐国骆氏' },
      { name: '河南内黄', lng: 114.90, lat: 35.97, period: '汉代', reason: '南迁内黄' },
      { name: '浙江绍兴', lng: 120.58, lat: 30.03, period: '唐代', reason: '南迁会稽' },
      { name: '福建福州', lng: 119.30, lat: 26.08, period: '宋代', reason: '入闽定居' },
      { name: '广东广州', lng: 113.27, lat: 23.13, period: '明清', reason: '南迁岭南' },
    ],
    figures: [
      { name: '骆统', dynasty: '三国', achievement: '吴国将领' },
      { name: '骆宾王', dynasty: '唐', achievement: '诗人，初唐四杰' },
      { name: '骆用卿', dynasty: '明', achievement: '进士' },
      { name: '骆成骧', dynasty: '清', achievement: '状元' },
    ],
    totem: '骆字从马从各，本义为黑鬣白马。图腾为齐骆骏马，象征太公之裔。',
    history: '骆姓源于姜姓，齐太公之后。内黄骆氏为郡望，唐代骆宾王为初唐四杰之一，清代骆成骧为状元。',
  },
  {
    surname: '夏',

    pinyin: 'Xià',

    rank: 153,

    populationRank: 55,

    population: 440,
    origin: '源于姒姓，夏禹之后。夏亡后，王族以朝代名为氏。亦出自妫姓，陈宣公庶子子夏之后。',
    originPlace: { name: '河南登封', lng: 113.03, lat: 34.46 },
    originPeriod: '夏朝',
    junwang: [
      { name: '会稽郡', location: '浙江绍兴', lng: 120.58, lat: 30.03, tanghao: '会稽堂' },
      { name: '谯郡', location: '安徽亳州', lng: 115.78, lat: 33.85, tanghao: '谯国堂' },
    ],
    migration: [
      { name: '河南登封', lng: 113.03, lat: 34.46, period: '夏朝', reason: '夏都阳城' },
      { name: '安徽亳州', lng: 115.78, lat: 33.85, period: '商周', reason: '南迁谯郡' },
      { name: '浙江绍兴', lng: 120.58, lat: 30.03, period: '汉代', reason: '南迁会稽' },
      { name: '江西九江', lng: 115.97, lat: 29.71, period: '唐代', reason: '迁居江州' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '明清', reason: '迁居江宁' },
    ],
    figures: [
      { name: '夏侯胜', dynasty: '西汉', achievement: '经学家' },
      { name: '夏竦', dynasty: '北宋', achievement: '宰相' },
      { name: '夏言', dynasty: '明', achievement: '首辅' },
      { name: '夏曾佑', dynasty: '清', achievement: '史学家' },
    ],
    totem: '夏字从页从臼，本义为中原之人。图腾为夏禹鼎彝，象征华夏正统。',
    history: '夏姓源于姒姓，夏禹之后。会稽夏氏为郡望，明代夏言为首辅，北宋夏竦为宰相。',
  },
  {
    surname: '高',

    pinyin: 'Gāo',

    rank: 154,

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
    surname: '蔡',

    pinyin: 'Cài',

    rank: 155,

    populationRank: 34,

    population: 700,
    origin: '源于姬姓，周文王第五子叔度封于蔡，建蔡国，后为楚灭，子孙以国为氏。',
    originPlace: { name: '河南上蔡', lng: 114.26, lat: 33.25 },
    originPeriod: '西周',
    junwang: [
      { name: '济阳郡', location: '河南兰考', lng: 114.82, lat: 34.82, tanghao: '济阳堂' },
      { name: '洛阳郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '洛阳堂' },
    ],
    migration: [
      { name: '河南上蔡', lng: 114.26, lat: 33.25, period: '西周', reason: '蔡国封地' },
      { name: '河南新蔡', lng: 114.98, lat: 32.75, period: '春秋', reason: '蔡迁新蔡' },
      { name: '安徽凤台', lng: 116.71, lat: 32.69, period: '战国', reason: '蔡迁州来' },
      { name: '福建泉州', lng: 118.67, lat: 24.88, period: '唐代', reason: '入闽定居' },
      { name: '广东潮州', lng: 116.63, lat: 23.68, period: '明清', reason: '南迁岭南' },
    ],
    figures: [
      { name: '蔡伦', dynasty: '东汉', achievement: '造纸术发明者' },
      { name: '蔡邕', dynasty: '东汉', achievement: '文学家、书法家' },
      { name: '蔡襄', dynasty: '北宋', achievement: '书法家，宋四家' },
      { name: '蔡元培', dynasty: '近代', achievement: '教育家，北大校长' },
    ],
    totem: '蔡字从草从祭，本义为野草。图腾为蔡国祭坛，象征姬姓诸侯。',
    history: '蔡姓源于姬姓，蔡叔度之后。济阳蔡氏最盛，蔡伦发明造纸术，蔡邕为文学大家，蔡襄为宋四家之一。',
  },
  {
    surname: '田',

    pinyin: 'Tián',

    rank: 156,

    populationRank: 36,

    population: 680,
    origin: '源于妫姓，陈完奔齐，改姓田氏。田氏代齐，为战国七雄之一。亦为地名。',
    originPlace: { name: '山东淄博', lng: 118.05, lat: 36.78 },
    originPeriod: '春秋',
    junwang: [
      { name: '雁门郡', location: '山西代县', lng: 112.96, lat: 39.07, tanghao: '雁门堂' },
      { name: '北平郡', location: '河北遵化', lng: 117.96, lat: 40.19, tanghao: '北平堂' },
    ],
    migration: [
      { name: '山东淄博', lng: 118.05, lat: 36.78, period: '春秋', reason: '田氏代齐' },
      { name: '山西代县', lng: 112.96, lat: 39.07, period: '汉代', reason: '北迁雁门' },
      { name: '陕西西安', lng: 108.94, lat: 34.27, period: '唐代', reason: '西迁京兆' },
      { name: '浙江杭州', lng: 120.16, lat: 30.27, period: '宋代', reason: '南迁钱塘' },
      { name: '湖北恩施', lng: 109.49, lat: 30.27, period: '明清', reason: '迁居施州' },
    ],
    figures: [
      { name: '田单', dynasty: '战国', achievement: '齐国名将，火牛阵' },
      { name: '田横', dynasty: '秦', achievement: '齐王，田横五百士' },
      { name: '田何', dynasty: '西汉', achievement: '易学大家' },
      { name: '田汉', dynasty: '近代', achievement: '剧作家，国歌词作者' },
    ],
    totem: '田字从口从十，本义为田地。图腾为齐国田畴，象征农耕立国。',
    history: '田姓源于妫姓，陈完之后，田氏代齐。雁门田氏为郡望，田单火牛阵复齐，田横五百士守义，近代田汉作国歌。',
  },
  {
    surname: '樊',

    pinyin: 'Fán',

    rank: 157,

    populationRank: 117,

    population: 130,
    origin: '源于姬姓，周太王子虞仲之后封于樊，建樊国。亦出嬴姓，商王武丁后裔。',
    originPlace: { name: '陕西长安', lng: 108.94, lat: 34.27 },
    originPeriod: '西周',
    junwang: [
      { name: '上党郡', location: '山西长治', lng: 113.12, lat: 36.20, tanghao: '上党堂' },
      { name: '南阳郡', location: '河南南阳', lng: 112.53, lat: 32.99, tanghao: '南阳堂' },
    ],
    migration: [
      { name: '陕西长安', lng: 108.94, lat: 34.27, period: '西周', reason: '樊国封地' },
      { name: '山西长治', lng: 113.12, lat: 36.20, period: '春秋', reason: '北迁上党' },
      { name: '河南南阳', lng: 112.53, lat: 32.99, period: '汉代', reason: '南迁南阳' },
      { name: '江苏苏州', lng: 120.62, lat: 31.32, period: '唐代', reason: '南迁江南' },
      { name: '浙江杭州', lng: 120.16, lat: 30.27, period: '宋代', reason: '迁居钱塘' },
    ],
    figures: [
      { name: '樊迟', dynasty: '春秋', achievement: '孔子弟子' },
      { name: '樊哙', dynasty: '西汉', achievement: '舞阳侯，鸿门救驾' },
      { name: '樊於期', dynasty: '战国', achievement: '舍头颅助荆轲' },
      { name: '樊增祥', dynasty: '清', achievement: '诗人' },
    ],
    totem: '樊字从木从爻，本义为笼篱。图腾为樊国笼藩，象征囚困守节。',
    history: '樊姓源于姬姓，周太王之后。上党樊氏为郡望，春秋樊迟为孔子弟子，西汉樊哙鸿门救驾。',
  },
  {
    surname: '胡',

    pinyin: 'Hú',

    rank: 158,

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
    totem: '胡字从肉从月，古同髦，本义为颔下之毛。图腾为白虎（少昊）。',
    history: '胡姓多源，主出妫姓胡公满。安定胡氏最古，华林胡氏南迁最盛。明经胡氏出胡适，影响近代。今南方胡姓尤多。',
  },
  {
    surname: '凌',

    pinyin: 'Líng',

    rank: 159,

    populationRank: 155,

    population: 90,
    origin: '源于姬姓，周文王子康叔封于卫，支庶有凌人为官，掌冰正，后以官为氏。',
    originPlace: { name: '河南濮阳', lng: 115.03, lat: 35.76 },
    originPeriod: '西周',
    junwang: [
      { name: '河间郡', location: '河北河间', lng: 116.10, lat: 38.45, tanghao: '河间堂' },
      { name: '渤海郡', location: '河北沧州', lng: 116.84, lat: 38.30, tanghao: '渤海堂' },
    ],
    migration: [
      { name: '河南濮阳', lng: 115.03, lat: 35.76, period: '西周', reason: '卫国凌人' },
      { name: '河北河间', lng: 116.10, lat: 38.45, period: '汉代', reason: '北迁河间' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '唐代', reason: '南迁江宁' },
      { name: '浙江杭州', lng: 120.16, lat: 30.27, period: '宋代', reason: '迁居钱塘' },
      { name: '广东梅州', lng: 116.12, lat: 24.29, period: '明清', reason: '南迁客家' },
    ],
    figures: [
      { name: '凌统', dynasty: '三国', achievement: '吴国名将' },
      { name: '凌濛初', dynasty: '明', achievement: '小说家，著《二刻拍案惊奇》' },
      { name: '凌廷堪', dynasty: '清', achievement: '经学家' },
      { name: '凌十八', dynasty: '清', achievement: '起义领袖' },
    ],
    totem: '凌字从冫从夌，本义为结冰。图腾为冰正官署，象征藏冰备礼。',
    history: '凌姓源于姬姓，卫康叔之后，以官为氏。河间凌氏为郡望，三国凌统为吴国名将，明代凌濛初著二拍。',
  },
  {
    surname: '霍',

    pinyin: 'Huò',

    rank: 160,

    populationRank: 176,

    population: 80,
    origin: '源于姬姓，周文王子叔处封于霍，建霍国，后为晋灭，子孙以国为氏。',
    originPlace: { name: '山西霍州', lng: 111.72, lat: 36.57 },
    originPeriod: '西周',
    junwang: [
      { name: '太原郡', location: '山西太原', lng: 112.55, lat: 37.87, tanghao: '太原堂' },
      { name: '河东郡', location: '山西运城', lng: 111.01, lat: 35.03, tanghao: '河东堂' },
    ],
    migration: [
      { name: '山西霍州', lng: 111.72, lat: 36.57, period: '西周', reason: '霍国封地' },
      { name: '山西太原', lng: 112.55, lat: 37.87, period: '春秋', reason: '晋灭霍迁太原' },
      { name: '陕西西安', lng: 108.94, lat: 34.27, period: '汉代', reason: '西迁京兆' },
      { name: '广东广州', lng: 113.27, lat: 23.13, period: '宋代', reason: '南迁岭南' },
      { name: '四川成都', lng: 104.07, lat: 30.67, period: '明清', reason: '入蜀定居' },
    ],
    figures: [
      { name: '霍去病', dynasty: '西汉', achievement: '冠军侯，封狼居胥' },
      { name: '霍光', dynasty: '西汉', achievement: '大将军，辅政三朝' },
      { name: '霍元甲', dynasty: '近代', achievement: '武术家，精武门' },
      { name: '霍韬', dynasty: '明', achievement: '礼部尚书' },
    ],
    totem: '霍字从雨从隹，本义为急雨。图腾为霍山崇岳，象征太岳后裔。',
    history: '霍姓源于姬姓，霍叔处之后。太原霍氏为郡望，西汉霍去病封狼居胥，霍光辅政三朝，近代霍元甲创精武门。',
  },
  {
    surname: '虞',

    pinyin: 'Yú',

    rank: 161,

    populationRank: 245,

    population: 33,
    origin: '源于妫姓，舜帝之后。周封舜后于虞，建虞国，子孙以国为氏。亦为远古氏族名。',
    originPlace: { name: '河南虞城', lng: 115.87, lat: 34.40 },
    originPeriod: '西周',
    junwang: [
      { name: '陈留郡', location: '河南开封', lng: 114.30, lat: 34.80, tanghao: '陈留堂' },
      { name: '会稽郡', location: '浙江绍兴', lng: 120.58, lat: 30.03, tanghao: '会稽堂' },
    ],
    migration: [
      { name: '河南虞城', lng: 115.87, lat: 34.40, period: '西周', reason: '虞国封地' },
      { name: '河南开封', lng: 114.30, lat: 34.80, period: '春秋', reason: '北迁陈留' },
      { name: '浙江绍兴', lng: 120.58, lat: 30.03, period: '汉代', reason: '南迁会稽' },
      { name: '江苏苏州', lng: 120.62, lat: 31.32, period: '唐代', reason: '迁居吴中' },
      { name: '浙江金华', lng: 119.65, lat: 29.08, period: '宋代', reason: '迁居东阳' },
    ],
    figures: [
      { name: '虞卿', dynasty: '战国', achievement: '赵国名士，著《虞氏春秋》' },
      { name: '虞世南', dynasty: '唐', achievement: '书法家，凌烟阁功臣' },
      { name: '虞集', dynasty: '元', achievement: '学者，元诗四大家' },
      { name: '虞允文', dynasty: '南宋', achievement: '宰相，采石之战' },
    ],
    totem: '虞字从虍从吴，本义为驺虞。图腾为有虞氏图腾，象征舜帝后裔。',
    history: '虞姓源于妫姓，舜帝之后。陈留虞氏为郡望，唐代虞世南为书法大家，南宋虞允文采石破金。',
  },
  {
    surname: '万',

    pinyin: 'Wàn',

    rank: 162,

    populationRank: 88,

    population: 250,
    origin: '源于姬姓，晋大夫毕万之后，以字为氏。亦出自芈姓，楚国万氏。又为地名。',
    originPlace: { name: '山西芮城', lng: 110.69, lat: 34.69 },
    originPeriod: '春秋',
    junwang: [
      { name: '扶风郡', location: '陕西兴平', lng: 108.49, lat: 34.30, tanghao: '扶风堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '山西芮城', lng: 110.69, lat: 34.69, period: '春秋', reason: '毕万封地' },
      { name: '陕西兴平', lng: 108.49, lat: 34.30, period: '汉代', reason: '西迁扶风' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '唐代', reason: '东迁河南' },
      { name: '江西南昌', lng: 115.89, lat: 28.68, period: '宋代', reason: '南迁豫章' },
      { name: '湖北武汉', lng: 114.30, lat: 30.59, period: '明清', reason: '迁居江夏' },
    ],
    figures: [
      { name: '万修', dynasty: '东汉', achievement: '将军，云台二十八将' },
      { name: '万表', dynasty: '明', achievement: '南京兵部尚书' },
      { name: '万斯同', dynasty: '清', achievement: '史学家' },
      { name: '万斯大', dynasty: '清', achievement: '经学家' },
    ],
    totem: '万字从一从禺，本义为蝎子。图腾为毕万鼎彝，象征晋卿后裔。',
    history: '万姓源于姬姓，毕万之后。扶风万氏为郡望，东汉万修为云台二十八将，清代万斯同为史学大家。',
  },
  {
    surname: '支',

    pinyin: 'Zhī',

    rank: 163,

    populationRank: 275,

    population: 25,
    origin: '源于子姓，殷商之后有支氏。亦为月氏人后裔，月支入中原改支氏。又为西域姓。',
    originPlace: { name: '河南商丘', lng: 115.65, lat: 33.38 },
    originPeriod: '商朝',
    junwang: [
      { name: '邺郡', location: '河北临漳', lng: 114.61, lat: 36.33, tanghao: '邺郡堂' },
      { name: '琅琊郡', location: '山东青岛', lng: 120.38, lat: 36.07, tanghao: '琅琊堂' },
    ],
    migration: [
      { name: '河南商丘', lng: 115.65, lat: 33.38, period: '商朝', reason: '殷商后裔' },
      { name: '甘肃敦煌', lng: 94.66, lat: 40.14, period: '汉代', reason: '月氏入居' },
      { name: '河北临漳', lng: 114.61, lat: 36.33, period: '唐代', reason: '东迁邺郡' },
      { name: '浙江杭州', lng: 120.16, lat: 30.27, period: '宋代', reason: '南迁钱塘' },
      { name: '江苏苏州', lng: 120.62, lat: 31.32, period: '明清', reason: '迁居江南' },
    ],
    figures: [
      { name: '支遁', dynasty: '东晋', achievement: '高僧，般若学派' },
      { name: '支谦', dynasty: '三国', achievement: '译经家' },
      { name: '支立', dynasty: '明', achievement: '翰林学士' },
      { name: '支如玉', dynasty: '明', achievement: '画家' },
    ],
    totem: '支字从手持竹，本义为枝干。图腾为月氏旗幡，象征西域来裔。',
    history: '支姓源于子姓及月氏。邺郡支氏为郡望，东晋支遁为高僧，三国支谦为译经家。',
  },
  {
    surname: '柯',

    pinyin: 'Kē',

    rank: 164,

    populationRank: 165,

    population: 100,
    origin: '源于姬姓，吴太伯之后。仲雍六世孙柯相封于柯，后以邑为氏。亦为地名。',
    originPlace: { name: '江苏无锡', lng: 120.30, lat: 31.57 },
    originPeriod: '西周',
    junwang: [
      { name: '济阳郡', location: '河南兰考', lng: 114.82, lat: 34.82, tanghao: '济阳堂' },
      { name: '钱塘郡', location: '浙江杭州', lng: 120.16, lat: 30.27, tanghao: '钱塘堂' },
    ],
    migration: [
      { name: '江苏无锡', lng: 120.30, lat: 31.57, period: '西周', reason: '吴国柯氏' },
      { name: '河南兰考', lng: 114.82, lat: 34.82, period: '汉代', reason: '北迁济阳' },
      { name: '浙江杭州', lng: 120.16, lat: 30.27, period: '唐代', reason: '南迁钱塘' },
      { name: '福建福州', lng: 119.30, lat: 26.08, period: '宋代', reason: '入闽定居' },
      { name: '广东潮州', lng: 116.63, lat: 23.68, period: '明清', reason: '南迁岭南' },
    ],
    figures: [
      { name: '柯九思', dynasty: '元', achievement: '书画家' },
      { name: '柯维骐', dynasty: '明', achievement: '史学家' },
      { name: '柯崇', dynasty: '唐', achievement: '诗人' },
      { name: '柯劭忞', dynasty: '清', achievement: '史学家，著《新元史》' },
    ],
    totem: '柯字从木从可，本义为斧柄。图腾为吴国乔木，象征太伯后裔。',
    history: '柯姓源于姬姓，吴太伯之后。济阳柯氏为郡望，元代柯九思为书画家，清代柯劭忞著《新元史》。',
  },
  {
    surname: '昝',

    pinyin: 'Zǎn',

    rank: 165,

    populationRank: 295,

    population: 20,
    origin: '源于子姓，商大夫咎单之后。咎通昝，后改昝氏。亦为蜀地姓。',
    originPlace: { name: '河南商丘', lng: 115.65, lat: 33.38 },
    originPeriod: '商朝',
    junwang: [
      { name: '太原郡', location: '山西太原', lng: 112.55, lat: 37.87, tanghao: '太原堂' },
      { name: '彭城郡', location: '江苏徐州', lng: 117.18, lat: 34.26, tanghao: '彭城堂' },
    ],
    migration: [
      { name: '河南商丘', lng: 115.65, lat: 33.38, period: '商朝', reason: '商大夫后裔' },
      { name: '山西太原', lng: 112.55, lat: 37.87, period: '汉代', reason: '北迁太原' },
      { name: '四川成都', lng: 104.07, lat: 30.67, period: '唐代', reason: '入蜀定居' },
      { name: '江苏徐州', lng: 117.18, lat: 34.26, period: '宋代', reason: '东迁彭城' },
      { name: '安徽合肥', lng: 117.23, lat: 31.82, period: '明清', reason: '迁居庐州' },
    ],
    figures: [
      { name: '昝商', dynasty: '商', achievement: '商大夫' },
      { name: '昝居润', dynasty: '北宋', achievement: '户部侍郎' },
      { name: '昝如心', dynasty: '明', achievement: '学者' },
      { name: '昝学易', dynasty: '明', achievement: '进士' },
    ],
    totem: '昝字从日从咎，本义为日明。图腾为商代日晷，象征时日吉占。',
    history: '昝姓源于子姓，商咎单之后。太原昝氏为郡望，北宋昝居润为户部侍郎。',
  },
  {
    surname: '管',

    pinyin: 'Guǎn',

    rank: 166,

    populationRank: 140,

    population: 100,
    origin: '源于姬姓，周文王子叔鲜封于管，建管国，后废，子孙以国为氏。',
    originPlace: { name: '河南郑州', lng: 113.62, lat: 34.75 },
    originPeriod: '西周',
    junwang: [
      { name: '平昌郡', location: '河南南乐', lng: 115.21, lat: 36.07, tanghao: '平昌堂' },
      { name: '晋阳郡', location: '山西太原', lng: 112.55, lat: 37.87, tanghao: '晋阳堂' },
    ],
    migration: [
      { name: '河南郑州', lng: 113.62, lat: 34.75, period: '西周', reason: '管国封地' },
      { name: '河南南乐', lng: 115.21, lat: 36.07, period: '春秋', reason: '北迁平昌' },
      { name: '山东淄博', lng: 118.05, lat: 36.78, period: '汉代', reason: '东迁齐地' },
      { name: '江苏苏州', lng: 120.62, lat: 31.32, period: '唐代', reason: '南迁江南' },
      { name: '浙江温州', lng: 120.70, lat: 27.99, period: '明清', reason: '迁居东瓯' },
    ],
    figures: [
      { name: '管仲', dynasty: '春秋', achievement: '齐相，佐桓公称霸' },
      { name: '管宁', dynasty: '三国', achievement: '高士，割席断交' },
      { name: '管师仁', dynasty: '北宋', achievement: '吏部侍郎' },
      { name: '管构', dynasty: '明', achievement: '画家' },
    ],
    totem: '管字从竹从官，本义为管钥。图腾为管国钥节，象征姬姓封裔。',
    history: '管姓源于姬姓，管叔鲜之后。平昌管氏为郡望，春秋管仲佐齐桓公称霸，三国管宁为高士。',
  },
  {
    surname: '卢',

    pinyin: 'Lú',

    rank: 167,

    populationRank: 42,

    population: 600,
    origin: '源于姜姓，齐太公之后。高傒食采于卢，子孙以邑为氏。亦为北魏莫芦氏所改。',
    originPlace: { name: '山东济南', lng: 117.00, lat: 36.67 },
    originPeriod: '春秋',
    junwang: [
      { name: '范阳郡', location: '河北涿州', lng: 115.98, lat: 39.49, tanghao: '范阳堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '山东济南', lng: 117.00, lat: 36.67, period: '春秋', reason: '齐国卢邑' },
      { name: '河北涿州', lng: 115.98, lat: 39.49, period: '汉代', reason: '北迁范阳' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '唐代', reason: '南迁河南' },
      { name: '福建福州', lng: 119.30, lat: 26.08, period: '宋代', reason: '入闽定居' },
      { name: '广东梅州', lng: 116.12, lat: 24.29, period: '明清', reason: '南迁客家' },
    ],
    figures: [
      { name: '卢植', dynasty: '东汉', achievement: '经学家，名将' },
      { name: '卢照邻', dynasty: '唐', achievement: '诗人，初唐四杰' },
      { name: '卢仝', dynasty: '唐', achievement: '诗人，茶仙' },
      { name: '卢象升', dynasty: '明', achievement: '名将，抗清' },
    ],
    totem: '卢字从卜从皿，本义为火炉。图腾为齐国炉火，象征姜姓后裔。',
    history: '卢姓源于姜姓，齐高傒之后。范阳卢氏最盛，东汉卢植为经学大师，唐代卢照邻为初唐四杰。',
  },
  {
    surname: '莫',

    pinyin: 'Mò',

    rank: 168,

    populationRank: 137,

    population: 110,
    origin: '源于姬姓，楚莫敖之后，以官为氏。亦为鄚国之后，去邑为莫。又为少数民族姓。',
    originPlace: { name: '河北任丘', lng: 116.10, lat: 38.71 },
    originPeriod: '春秋',
    junwang: [
      { name: '江陵郡', location: '湖北荆州', lng: 112.24, lat: 30.33, tanghao: '江陵堂' },
      { name: '河间郡', location: '河北河间', lng: 116.10, lat: 38.45, tanghao: '河间堂' },
    ],
    migration: [
      { name: '河北任丘', lng: 116.10, lat: 38.71, period: '春秋', reason: '鄚国起源' },
      { name: '湖北荆州', lng: 112.24, lat: 30.33, period: '战国', reason: '南迁楚地' },
      { name: '河北河间', lng: 116.10, lat: 38.45, period: '汉代', reason: '北迁河间' },
      { name: '浙江杭州', lng: 120.16, lat: 30.27, period: '宋代', reason: '南迁钱塘' },
      { name: '广西桂林', lng: 110.29, lat: 25.27, period: '明清', reason: '南迁岭南' },
    ],
    figures: [
      { name: '莫邪', dynasty: '春秋', achievement: '铸剑师，干将之妻' },
      { name: '莫休符', dynasty: '唐', achievement: '学者，著《桂林风土记》' },
      { name: '莫友芝', dynasty: '清', achievement: '学者，版本学家' },
      { name: '莫乃群', dynasty: '近代', achievement: '书法家' },
    ],
    totem: '莫字从草从日从大，本义为日落。图腾为鄚国日轮，象征晚霞余晖。',
    history: '莫姓源于姬姓及鄚国之后。江陵莫氏为郡望，春秋莫邪铸剑，清代莫友芝为版本学大家。',
  },
  {
    surname: '经',

    pinyin: 'Jīng',

    rank: 169,

    populationRank: 290,

    population: 20,
    origin: '源于姬姓，周经侯之后，以字为氏。亦为地名，古有经县。又为经师之后。',
    originPlace: { name: '河南洛阳', lng: 112.45, lat: 34.62 },
    originPeriod: '西周',
    junwang: [
      { name: '平阳郡', location: '山西临汾', lng: 111.52, lat: 36.08, tanghao: '平阳堂' },
      { name: '荥阳郡', location: '河南荥阳', lng: 113.38, lat: 34.79, tanghao: '荥阳堂' },
    ],
    migration: [
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '西周', reason: '经侯封地' },
      { name: '河南荥阳', lng: 113.38, lat: 34.79, period: '汉代', reason: '东迁荥阳' },
      { name: '山西临汾', lng: 111.52, lat: 36.08, period: '唐代', reason: '北迁平阳' },
      { name: '浙江杭州', lng: 120.16, lat: 30.27, period: '宋代', reason: '南迁钱塘' },
      { name: '江苏苏州', lng: 120.62, lat: 31.32, period: '明清', reason: '迁居江南' },
    ],
    figures: [
      { name: '经承', dynasty: '东汉', achievement: '名士' },
      { name: '经略', dynasty: '唐', achievement: '将军' },
      { name: '经纬', dynasty: '明', achievement: '知县' },
      { name: '经元善', dynasty: '清', achievement: '实业家' },
    ],
    totem: '经字从纟从巠，本义为经线。图腾为经国典籍，象征丝织经纬。',
    history: '经姓源于姬姓，经侯之后。平阳经氏为郡望，清代经元善为实业家。',
  },
  {
    surname: '房',

    pinyin: 'Fáng',

    rank: 170,

    populationRank: 183,

    population: 76,
    origin: '源于姬姓，周文王子丹封于房，建房国，后为楚灭，子孙以国为氏。亦为尧子丹朱之后。',
    originPlace: { name: '河南遂平', lng: 114.01, lat: 33.15 },
    originPeriod: '西周',
    junwang: [
      { name: '清河郡', location: '河北清河', lng: 115.67, lat: 37.06, tanghao: '清河堂' },
      { name: '济南郡', location: '山东济南', lng: 117.00, lat: 36.67, tanghao: '济南堂' },
    ],
    migration: [
      { name: '河南遂平', lng: 114.01, lat: 33.15, period: '西周', reason: '房国封地' },
      { name: '河北清河', lng: 115.67, lat: 37.06, period: '春秋', reason: '北迁清河' },
      { name: '山东济南', lng: 117.00, lat: 36.67, period: '汉代', reason: '东迁济南' },
      { name: '江苏苏州', lng: 120.62, lat: 31.32, period: '唐代', reason: '南迁江南' },
      { name: '浙江杭州', lng: 120.16, lat: 30.27, period: '宋代', reason: '迁居钱塘' },
    ],
    figures: [
      { name: '房玄龄', dynasty: '唐', achievement: '宰相，凌烟阁功臣' },
      { name: '房融', dynasty: '唐', achievement: '宰相' },
      { name: '房琯', dynasty: '唐', achievement: '宰相' },
      { name: '房胜', dynasty: '明', achievement: '将军' },
    ],
    totem: '房字从户从方，本义为正室。图腾为房国社庙，象征姬姓封裔。',
    history: '房姓源于姬姓，周文王子丹之后。清河房氏最盛，唐代房玄龄为贞观名相。',
  },
  {
    surname: '裘',

    pinyin: 'Qiú',

    rank: 171,

    populationRank: 235,

    population: 35,
    origin: '源于姬姓，周大夫食采于裘，后以官为氏。古有司裘官，掌皮毛。亦为地名。',
    originPlace: { name: '河南洛阳', lng: 112.45, lat: 34.62 },
    originPeriod: '西周',
    junwang: [
      { name: '渤海郡', location: '河北沧州', lng: 116.84, lat: 38.30, tanghao: '渤海堂' },
      { name: '新建郡', location: '江西南昌', lng: 115.89, lat: 28.68, tanghao: '新建堂' },
    ],
    migration: [
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '西周', reason: '司裘官署' },
      { name: '河北沧州', lng: 116.84, lat: 38.30, period: '汉代', reason: '北迁渤海' },
      { name: '浙江绍兴', lng: 120.58, lat: 30.03, period: '唐代', reason: '南迁会稽' },
      { name: '江西南昌', lng: 115.89, lat: 28.68, period: '宋代', reason: '迁居豫章' },
      { name: '浙江宁波', lng: 121.55, lat: 29.87, period: '明清', reason: '迁居四明' },
    ],
    figures: [
      { name: '裘仲', dynasty: '汉', achievement: '名士' },
      { name: '裘万顷', dynasty: '宋', achievement: '诗人' },
      { name: '裘琏', dynasty: '清', achievement: '戏曲家' },
      { name: '裘曰修', dynasty: '清', achievement: '工部尚书' },
    ],
    totem: '裘字从衣从求，本义为皮衣。图腾为司裘皮服，象征冬官皮毛。',
    history: '裘姓源于姬姓，周司裘之后。渤海裘氏为郡望，宋代裘万顷为诗人，清代裘曰修为尚书。',
  },
  {
    surname: '缪',

    pinyin: 'Miào',

    rank: 172,

    populationRank: 221,

    population: 45,
    origin: '源于姬姓，秦穆公谥缪，后为氏。亦为鲁缪公之后。缪穆通。',
    originPlace: { name: '陕西凤翔', lng: 107.39, lat: 34.52 },
    originPeriod: '春秋',
    junwang: [
      { name: '兰陵郡', location: '山东兰陵', lng: 118.10, lat: 34.85, tanghao: '兰陵堂' },
      { name: '鲁郡', location: '山东曲阜', lng: 116.98, lat: 35.58, tanghao: '鲁国堂' },
    ],
    migration: [
      { name: '陕西凤翔', lng: 107.39, lat: 34.52, period: '春秋', reason: '秦穆公后裔' },
      { name: '山东曲阜', lng: 116.98, lat: 35.58, period: '战国', reason: '鲁缪公后裔' },
      { name: '山东兰陵', lng: 118.10, lat: 34.85, period: '汉代', reason: '东迁兰陵' },
      { name: '江苏苏州', lng: 120.62, lat: 31.32, period: '宋代', reason: '南迁江南' },
      { name: '浙江温州', lng: 120.70, lat: 27.99, period: '明清', reason: '迁居东瓯' },
    ],
    figures: [
      { name: '缪袭', dynasty: '三国', achievement: '文学家' },
      { name: '缪彤', dynasty: '汉', achievement: '名士' },
      { name: '缪沅', dynasty: '清', achievement: '翰林' },
      { name: '缪荃孙', dynasty: '清', achievement: '藏书家，图书馆学家' },
    ],
    totem: '缪字从纟从翏，本义为绸缪。图腾为秦穆鼎彝，象征秦鲁后裔。',
    history: '缪姓源于姬姓，秦穆公之后。兰陵缪氏为郡望，清代缪荃孙为图书馆学先驱。',
  },
  {
    surname: '干',

    pinyin: 'Gān',

    rank: 173,

    populationRank: 270,

    population: 26,
    origin: '源于姬姓，周有干国，后以国为氏。亦为古干国，在今江苏。又为宋子姓之后。',
    originPlace: { name: '江苏扬州', lng: 119.42, lat: 32.39 },
    originPeriod: '商朝',
    junwang: [
      { name: '颍川郡', location: '河南禹州', lng: 113.47, lat: 34.16, tanghao: '颍川堂' },
      { name: '江都郡', location: '江苏扬州', lng: 119.42, lat: 32.39, tanghao: '江都堂' },
    ],
    migration: [
      { name: '江苏扬州', lng: 119.42, lat: 32.39, period: '商朝', reason: '干国起源' },
      { name: '河南禹州', lng: 113.47, lat: 34.16, period: '汉代', reason: '北迁颍川' },
      { name: '浙江绍兴', lng: 120.58, lat: 30.03, period: '唐代', reason: '南迁会稽' },
      { name: '四川成都', lng: 104.07, lat: 30.67, period: '宋代', reason: '入蜀定居' },
      { name: '湖北武汉', lng: 114.30, lat: 30.59, period: '明清', reason: '迁居江夏' },
    ],
    figures: [
      { name: '干宝', dynasty: '东晋', achievement: '史学家，著《搜神记》' },
      { name: '干吉', dynasty: '东汉', achievement: '道士' },
      { name: '干文传', dynasty: '元', achievement: '吴郡教授' },
      { name: '干建邦', dynasty: '清', achievement: '画家' },
    ],
    totem: '干字从一从十，本义为盾牌。图腾为干国盾甲，象征卫国武备。',
    history: '干姓源于姬姓及古干国。颍川干氏为郡望，东晋干宝著《搜神记》为志怪小说之祖。',
  },
  {
    surname: '解',

    pinyin: 'Xiè',

    rank: 174,

    populationRank: 187,

    population: 70,
    origin: '源于姬姓，周成王弟叔虞封于唐，后改晋，晋大夫解狐之后，以邑为氏。亦为地名。',
    originPlace: { name: '山西临汾', lng: 111.52, lat: 36.08 },
    originPeriod: '春秋',
    junwang: [
      { name: '平阳郡', location: '山西临汾', lng: 111.52, lat: 36.08, tanghao: '平阳堂' },
      { name: '雁门郡', location: '山西代县', lng: 112.96, lat: 39.07, tanghao: '雁门堂' },
    ],
    migration: [
      { name: '山西临汾', lng: 111.52, lat: 36.08, period: '春秋', reason: '晋解氏起源' },
      { name: '山西代县', lng: 112.96, lat: 39.07, period: '汉代', reason: '北迁雁门' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '唐代', reason: '南迁中原' },
      { name: '山东青州', lng: 118.48, lat: 36.68, period: '宋代', reason: '东迁齐鲁' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '明清', reason: '南迁江宁' },
    ],
    figures: [
      { name: '解狐', dynasty: '春秋', achievement: '晋国大夫' },
      { name: '解扬', dynasty: '春秋', achievement: '晋国使臣' },
      { name: '解缙', dynasty: '明', achievement: '学者，主编《永乐大典》' },
      { name: '解学龙', dynasty: '明', achievement: '兵部右侍郎' },
    ],
    totem: '解字从角从刀从牛，本义为解剖。图腾为晋国解邑，象征姬姓分支。',
    history: '解姓源于姬姓，晋解狐之后。平阳解氏为郡望，明代解缙主编《永乐大典》。',
  },
  {
    surname: '应',

    pinyin: 'Yìng',

    rank: 175,

    populationRank: 184,

    population: 75,
    origin: '源于姬姓，周武王封子于应，建应国，后为楚灭，子孙以国为氏。',
    originPlace: { name: '河南平顶山', lng: 113.19, lat: 33.77 },
    originPeriod: '西周',
    junwang: [
      { name: '汝南郡', location: '河南汝南', lng: 114.36, lat: 33.00, tanghao: '汝南堂' },
      { name: '颍川郡', location: '河南禹州', lng: 113.47, lat: 34.16, tanghao: '颍川堂' },
    ],
    migration: [
      { name: '河南平顶山', lng: 113.19, lat: 33.77, period: '西周', reason: '应国封地' },
      { name: '河南汝南', lng: 114.36, lat: 33.00, period: '春秋', reason: '南迁汝南' },
      { name: '河南禹州', lng: 113.47, lat: 34.16, period: '汉代', reason: '北迁颍川' },
      { name: '浙江杭州', lng: 120.16, lat: 30.27, period: '宋代', reason: '南迁钱塘' },
      { name: '福建福州', lng: 119.30, lat: 26.08, period: '明清', reason: '入闽定居' },
    ],
    figures: [
      { name: '应劭', dynasty: '东汉', achievement: '学者，著《风俗通义》' },
      { name: '应玚', dynasty: '东汉', achievement: '建安七子' },
      { name: '应顺', dynasty: '东汉', achievement: '河南尹' },
      { name: '应宝时', dynasty: '清', achievement: '江苏按察使' },
    ],
    totem: '应字从广从心，本义为响应。图腾为应国礼器，象征武王后裔。',
    history: '应姓源于姬姓，周武王子之后。汝南应氏为郡望，东汉应劭著《风俗通义》，应玚为建安七子。',
  },
  {
    surname: '宗',

    pinyin: 'Zōng',

    rank: 176,

    populationRank: 200,

    population: 55,
    origin: '源于子姓，殷商宗氏之后。亦为四岳之后，古有宗国。又为官名，宗伯之后。',
    originPlace: { name: '河南商丘', lng: 115.65, lat: 33.38 },
    originPeriod: '商朝',
    junwang: [
      { name: '京兆郡', location: '陕西西安', lng: 108.94, lat: 34.27, tanghao: '京兆堂' },
      { name: '南阳郡', location: '河南南阳', lng: 112.53, lat: 32.99, tanghao: '南阳堂' },
    ],
    migration: [
      { name: '河南商丘', lng: 115.65, lat: 33.38, period: '商朝', reason: '殷商后裔' },
      { name: '陕西西安', lng: 108.94, lat: 34.27, period: '汉代', reason: '西迁京兆' },
      { name: '河南南阳', lng: 112.53, lat: 32.99, period: '唐代', reason: '南迁南阳' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江宁' },
      { name: '浙江杭州', lng: 120.16, lat: 30.27, period: '明清', reason: '迁居钱塘' },
    ],
    figures: [
      { name: '宗悫', dynasty: '南朝', achievement: '将军，乘风破浪' },
      { name: '宗泽', dynasty: '北宋', achievement: '抗金名将' },
      { name: '宗臣', dynasty: '明', achievement: '文学家，后七子' },
      { name: '宗白华', dynasty: '近代', achievement: '美学家' },
    ],
    totem: '宗字从宀从示，本义为祖庙。图腾为殷商宗庙，象征子姓后裔。',
    history: '宗姓源于子姓，殷商之后。京兆宗氏为郡望，南朝宗悫乘风破浪，北宋宗泽为抗金名将。',
  },
  {
    surname: '丁',

    pinyin: 'Dīng',

    rank: 177,

    populationRank: 46,

    population: 550,
    origin: '源于姜姓，齐太公之子丁公伋之后，以谥为氏。亦为商代丁侯之后。又为孙姓所改。',
    originPlace: { name: '山东淄博', lng: 118.05, lat: 36.78 },
    originPeriod: '西周',
    junwang: [
      { name: '济阳郡', location: '河南兰考', lng: 114.82, lat: 34.82, tanghao: '济阳堂' },
      { name: '济阴郡', location: '山东定陶', lng: 115.41, lat: 35.23, tanghao: '济阴堂' },
    ],
    migration: [
      { name: '山东淄博', lng: 118.05, lat: 36.78, period: '西周', reason: '齐丁公后裔' },
      { name: '山东定陶', lng: 115.41, lat: 35.23, period: '汉代', reason: '迁居济阴' },
      { name: '河南兰考', lng: 114.82, lat: 34.82, period: '唐代', reason: '西迁济阳' },
      { name: '江苏苏州', lng: 120.62, lat: 31.32, period: '宋代', reason: '南迁江南' },
      { name: '福建福州', lng: 119.30, lat: 26.08, period: '明清', reason: '入闽定居' },
    ],
    figures: [
      { name: '丁奉', dynasty: '三国', achievement: '吴国名将' },
      { name: '丁度', dynasty: '北宋', achievement: '参知政事' },
      { name: '丁汝昌', dynasty: '清', achievement: '北洋水师提督' },
      { name: '丁汝夔', dynasty: '明', achievement: '兵部尚书' },
    ],
    totem: '丁字从一从亅，本义为钉子。图腾为齐丁公鼎彝，象征姜姓后裔。',
    history: '丁姓源于姜姓，齐丁公之后。济阳丁氏为郡望，三国丁奉为吴国名将，清代丁汝昌为北洋水师提督。',
  },
  {
    surname: '宣',

    pinyin: 'Xuān',

    rank: 178,

    populationRank: 215,

    population: 48,
    origin: '源于姬姓，周宣王之后，以谥为氏。亦为鲁宣公、宋宣公之后。又为谥号氏。',
    originPlace: { name: '陕西西安', lng: 108.94, lat: 34.27 },
    originPeriod: '西周',
    junwang: [
      { name: '汝南郡', location: '河南汝南', lng: 114.36, lat: 33.00, tanghao: '汝南堂' },
      { name: '濮阳郡', location: '河南濮阳', lng: 115.03, lat: 35.76, tanghao: '濮阳堂' },
    ],
    migration: [
      { name: '陕西西安', lng: 108.94, lat: 34.27, period: '西周', reason: '周宣王后裔' },
      { name: '河南汝南', lng: 114.36, lat: 33.00, period: '汉代', reason: '东迁汝南' },
      { name: '河南濮阳', lng: 115.03, lat: 35.76, period: '唐代', reason: '北迁濮阳' },
      { name: '浙江绍兴', lng: 120.58, lat: 30.03, period: '宋代', reason: '南迁会稽' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '明清', reason: '迁居江宁' },
    ],
    figures: [
      { name: '宣虎', dynasty: '西汉', achievement: '将军，封南安侯' },
      { name: '宣赞', dynasty: '北宋', achievement: '名将（《水浒》人物原型）' },
      { name: '宣鼎', dynasty: '清', achievement: '画家，小说家' },
      { name: '宣瘦梅', dynasty: '清', achievement: '文学家' },
    ],
    totem: '宣字从宀从亘，本义为天子宣室。图腾为周宣王庙，象征中兴之主。',
    history: '宣姓源于姬姓，周宣王之后。汝南宣氏为郡望，西汉宣虎封南安侯，清代宣鼎为文学家。',
  },
  {
    surname: '贲',

    pinyin: 'Bēn',

    rank: 179,

    populationRank: 290,

    population: 20,
    origin: '源于姬姓，周有贲国，后以国为氏。亦为秦非子之后。又为官名，虎贲之后。',
    originPlace: { name: '陕西西安', lng: 108.94, lat: 34.27 },
    originPeriod: '西周',
    junwang: [
      { name: '宣城郡', location: '安徽宣城', lng: 118.76, lat: 30.95, tanghao: '宣城堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '陕西西安', lng: 108.94, lat: 34.27, period: '西周', reason: '贲国起源' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '汉代', reason: '东迁河南' },
      { name: '安徽宣城', lng: 118.76, lat: 30.95, period: '唐代', reason: '南迁宣城' },
      { name: '浙江杭州', lng: 120.16, lat: 30.27, period: '宋代', reason: '迁居钱塘' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '明清', reason: '迁居江宁' },
    ],
    figures: [
      { name: '贲赫', dynasty: '西汉', achievement: '将军' },
      { name: '贲蒿', dynasty: '汉', achievement: '名士' },
      { name: '贲士林', dynasty: '元', achievement: '学者' },
      { name: '贲南枝', dynasty: '明', achievement: '画家' },
    ],
    totem: '贲字从贝从卉，本义为装饰。图腾为虎贲军旗，象征勇士武卫。',
    history: '贲姓源于姬姓，周贲国之后。宣城贲氏为郡望，西汉贲赫为将军。',
  },
  {
    surname: '邓',

    pinyin: 'Dèng',

    rank: 180,

    populationRank: 27,

    population: 800,
    origin: '源于子姓，商王武丁封叔父于邓，建邓国，后为楚灭，子孙以国为氏。亦为曼姓邓国。',
    originPlace: { name: '湖北襄阳', lng: 112.12, lat: 32.01 },
    originPeriod: '商朝',
    junwang: [
      { name: '南阳郡', location: '河南南阳', lng: 112.53, lat: 32.99, tanghao: '南阳堂' },
      { name: '南雄郡', location: '广东南雄', lng: 114.31, lat: 25.12, tanghao: '南雄堂' },
    ],
    migration: [
      { name: '湖北襄阳', lng: 112.12, lat: 32.01, period: '商朝', reason: '邓国封地' },
      { name: '河南南阳', lng: 112.53, lat: 32.99, period: '春秋', reason: '北迁南阳' },
      { name: '湖南长沙', lng: 112.94, lat: 28.23, period: '唐代', reason: '南迁潇湘' },
      { name: '江西吉安', lng: 114.99, lat: 27.11, period: '宋代', reason: '迁居庐陵' },
      { name: '广东南雄', lng: 114.31, lat: 25.12, period: '明清', reason: '南迁岭南' },
    ],
    figures: [
      { name: '邓禹', dynasty: '东汉', achievement: '云台二十八将之首' },
      { name: '邓芝', dynasty: '三国', achievement: '蜀汉外交家' },
      { name: '邓石如', dynasty: '清', achievement: '书法家，篆刻家' },
      { name: '邓世昌', dynasty: '清', achievement: '海军英雄，甲午海战' },
    ],
    totem: '邓字从阝从登，本义为登高。图腾为邓国邑墙，象征曼姓后裔。',
    history: '邓姓源于曼姓，商王武丁封叔父于邓。南阳邓氏最盛，东汉邓禹为云台首将，清代邓世昌甲午殉国。',
  },
  {
    surname: '郁',

    pinyin: 'Yù',

    rank: 181,

    populationRank: 220,

    population: 45,
    origin: '源于姬姓，周有郁国，后为氏。亦为地名，古有郁郅。又为少数民族姓。',
    originPlace: { name: '甘肃庆阳', lng: 107.64, lat: 36.16 },
    originPeriod: '西周',
    junwang: [
      { name: '太原郡', location: '山西太原', lng: 112.55, lat: 37.87, tanghao: '太原堂' },
      { name: '黎阳郡', location: '河南浚县', lng: 114.55, lat: 35.67, tanghao: '黎阳堂' },
    ],
    migration: [
      { name: '甘肃庆阳', lng: 107.64, lat: 36.16, period: '西周', reason: '郁郅起源' },
      { name: '山西太原', lng: 112.55, lat: 37.87, period: '汉代', reason: '东迁太原' },
      { name: '河南浚县', lng: 114.55, lat: 35.67, period: '唐代', reason: '南迁黎阳' },
      { name: '江苏苏州', lng: 120.62, lat: 31.32, period: '宋代', reason: '南迁江南' },
      { name: '浙江杭州', lng: 120.16, lat: 30.27, period: '明清', reason: '迁居钱塘' },
    ],
    figures: [
      { name: '郁贡', dynasty: '春秋', achievement: '鲁相' },
      { name: '郁浩', dynasty: '宋', achievement: '学者' },
      { name: '郁文', dynasty: '明', achievement: '进士' },
      { name: '郁达夫', dynasty: '近代', achievement: '作家，著《沉沦》' },
    ],
    totem: '郁字从邑从有，本义为茂盛。图腾为郁国林莽，象征丰饶繁茂。',
    history: '郁姓源于姬姓，郁国之后。太原郁氏为郡望，春秋郁贡为鲁相，近代郁达夫为文学巨匠。',
  },
  {
    surname: '单',

    pinyin: 'Shàn',

    rank: 182,

    populationRank: 151,

    population: 95,
    origin: '源于姬姓，周成王封少子于单，建单国，子孙以国为氏。亦为北魏单氏所改。',
    originPlace: { name: '河南济源', lng: 112.60, lat: 35.07 },
    originPeriod: '西周',
    junwang: [
      { name: '南安郡', location: '甘肃陇西', lng: 104.65, lat: 34.98, tanghao: '南安堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '河南济源', lng: 112.60, lat: 35.07, period: '西周', reason: '单国封地' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '春秋', reason: '迁居王畿' },
      { name: '甘肃陇西', lng: 104.65, lat: 34.98, period: '汉代', reason: '西迁南安' },
      { name: '福建福州', lng: 119.30, lat: 26.08, period: '宋代', reason: '入闽定居' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '明清', reason: '迁居江宁' },
    ],
    figures: [
      { name: '单公', dynasty: '西周', achievement: '单国始封君' },
      { name: '单超', dynasty: '东汉', achievement: '宦官，五侯之一' },
      { name: '单锷', dynasty: '北宋', achievement: '水利家' },
      { name: '单雄信', dynasty: '隋', achievement: '瓦岗军将领' },
    ],
    totem: '单字从吅从十，本义为大。图腾为单国礼器，象征姬姓封裔。',
    history: '单姓源于姬姓，周成王子之后。河南单氏为郡望，隋代单雄信为瓦岗军名将。',
  },
  {
    surname: '杭',

    pinyin: 'Háng',

    rank: 183,

    populationRank: 282,

    population: 25,
    origin: '源于姬姓，周文王子叔封于杭，后以国为氏。亦为古地名，余杭、杭州得名。',
    originPlace: { name: '浙江杭州', lng: 120.16, lat: 30.27 },
    originPeriod: '西周',
    junwang: [
      { name: '丹阳郡', location: '江苏南京', lng: 118.78, lat: 32.04, tanghao: '丹阳堂' },
      { name: '余杭郡', location: '浙江杭州', lng: 120.16, lat: 30.27, tanghao: '余杭堂' },
    ],
    migration: [
      { name: '浙江杭州', lng: 120.16, lat: 30.27, period: '西周', reason: '杭国起源' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '汉代', reason: '北迁丹阳' },
      { name: '安徽宣城', lng: 118.76, lat: 30.95, period: '唐代', reason: '迁居宣城' },
      { name: '浙江宁波', lng: 121.55, lat: 29.87, period: '宋代', reason: '迁居四明' },
      { name: '江苏苏州', lng: 120.62, lat: 31.32, period: '明清', reason: '迁居吴中' },
    ],
    figures: [
      { name: '杭徐', dynasty: '东汉', achievement: '中郎将' },
      { name: '杭世骏', dynasty: '清', achievement: '学者' },
      { name: '杭大宗', dynasty: '清', achievement: '编修' },
      { name: '杭樾', dynasty: '清', achievement: '画家' },
    ],
    totem: '杭字从木从亢，本义为渡船。图腾为杭国方舟，象征文王后裔。',
    history: '杭姓源于姬姓，周文王子之后。丹阳杭氏为郡望，东汉杭徐为中郎将，清代杭世骏为学者。',
  },
  {
    surname: '洪',

    pinyin: 'Hóng',

    rank: 184,

    populationRank: 99,

    population: 200,
    origin: '源于姬姓，周有共国，后为氏。共加水为洪，避讳改洪。亦为北魏洪那氏所改。',
    originPlace: { name: '河南辉县', lng: 113.80, lat: 35.46 },
    originPeriod: '西周',
    junwang: [
      { name: '敦煌郡', location: '甘肃敦煌', lng: 94.66, lat: 40.14, tanghao: '敦煌堂' },
      { name: '豫章郡', location: '江西南昌', lng: 115.89, lat: 28.68, tanghao: '豫章堂' },
    ],
    migration: [
      { name: '河南辉县', lng: 113.80, lat: 35.46, period: '西周', reason: '共国起源' },
      { name: '甘肃敦煌', lng: 94.66, lat: 40.14, period: '汉代', reason: '西迁敦煌' },
      { name: '江西南昌', lng: 115.89, lat: 28.68, period: '唐代', reason: '南迁豫章' },
      { name: '福建泉州', lng: 118.67, lat: 24.88, period: '宋代', reason: '入闽定居' },
      { name: '广东潮州', lng: 116.63, lat: 23.68, period: '明清', reason: '南迁岭南' },
    ],
    figures: [
      { name: '洪皓', dynasty: '南宋', achievement: '使金被留，气节凛然' },
      { name: '洪迈', dynasty: '南宋', achievement: '学者，著《容斋随笔》' },
      { name: '洪适', dynasty: '南宋', achievement: '宰相' },
      { name: '洪秀全', dynasty: '清', achievement: '太平天国天王' },
    ],
    totem: '洪字从水从共，本义为大水。图腾为共国洪水，象征姬姓分支。',
    history: '洪姓源于姬姓，共国之后，避讳加水。敦煌洪氏为郡望，南宋洪皓使金守节，洪迈著《容斋随笔》。',
  },
  {
    surname: '包',

    pinyin: 'Bāo',

    rank: 185,

    populationRank: 81,

    population: 280,
    origin: '源于芈姓，楚国大夫申包胥之后，以字为氏。亦为鲍姓所改，包鲍通。',
    originPlace: { name: '湖北荆州', lng: 112.24, lat: 30.33 },
    originPeriod: '春秋',
    junwang: [
      { name: '上党郡', location: '山西长治', lng: 113.12, lat: 36.20, tanghao: '上党堂' },
      { name: '丹阳郡', location: '江苏南京', lng: 118.78, lat: 32.04, tanghao: '丹阳堂' },
    ],
    migration: [
      { name: '湖北荆州', lng: 112.24, lat: 30.33, period: '春秋', reason: '楚国包氏' },
      { name: '山西长治', lng: 113.12, lat: 36.20, period: '汉代', reason: '北迁上党' },
      { name: '浙江杭州', lng: 120.16, lat: 30.27, period: '唐代', reason: '南迁钱塘' },
      { name: '福建福州', lng: 119.30, lat: 26.08, period: '宋代', reason: '入闽定居' },
      { name: '广东广州', lng: 113.27, lat: 23.13, period: '明清', reason: '南迁岭南' },
    ],
    figures: [
      { name: '包胥', dynasty: '春秋', achievement: '申包胥，哭秦庭救楚' },
      { name: '包拯', dynasty: '北宋', achievement: '铁面无私，包青天' },
      { name: '包恢', dynasty: '南宋', achievement: '资政殿学士' },
      { name: '包世臣', dynasty: '清', achievement: '书法家，碑学代表' },
    ],
    totem: '包字从勹从己，本义为包裹。图腾为楚国胞器，象征芈姓后裔。',
    history: '包姓源于芈姓，申包胥之后。上党包氏为郡望，春秋申包胥哭秦庭救楚，北宋包拯为清官典范。',
  },
  {
    surname: '诸',

    pinyin: 'Zhū',

    rank: 186,

    populationRank: 186,

    population: 72,
    origin: '源于姬姓，鲁有诸邑，后以邑为氏。亦为闽越王之后。又为诸葛姓所改。',
    originPlace: { name: '山东诸城', lng: 119.41, lat: 35.99 },
    originPeriod: '春秋',
    junwang: [
      { name: '琅琊郡', location: '山东青岛', lng: 120.38, lat: 36.07, tanghao: '琅琊堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '山东诸城', lng: 119.41, lat: 35.99, period: '春秋', reason: '鲁诸邑起源' },
      { name: '山东青岛', lng: 120.38, lat: 36.07, period: '汉代', reason: '东迁琅琊' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '唐代', reason: '西迁河南' },
      { name: '浙江绍兴', lng: 120.58, lat: 30.03, period: '宋代', reason: '南迁会稽' },
      { name: '福建福州', lng: 119.30, lat: 26.08, period: '明清', reason: '入闽定居' },
    ],
    figures: [
      { name: '诸燮', dynasty: '明', achievement: '兵部侍郎' },
      { name: '诸万里', dynasty: '宋', achievement: '学者' },
      { name: '诸九鼎', dynasty: '清', achievement: '画家' },
      { name: '诸福棠', dynasty: '近代', achievement: '儿科专家' },
    ],
    totem: '诸字从言从者，本义为众。图腾为鲁国诸邑，象征姬姓分支。',
    history: '诸姓源于姬姓，鲁诸邑之后。琅琊诸氏为郡望，明代诸燮为兵部侍郎。',
  },
  {
    surname: '左',

    pinyin: 'Zuǒ',

    rank: 187,

    populationRank: 159,

    population: 90,
    origin: '源于姬姓，周有左史官，后以官为氏。亦为齐国左公子之后。又为官名氏。',
    originPlace: { name: '山东淄博', lng: 118.05, lat: 36.78 },
    originPeriod: '西周',
    junwang: [
      { name: '济阳郡', location: '河南兰考', lng: 114.82, lat: 34.82, tanghao: '济阳堂' },
      { name: '传经堂', location: '江苏苏州', lng: 120.62, lat: 31.32, tanghao: '传经堂' },
    ],
    migration: [
      { name: '山东淄博', lng: 118.05, lat: 36.78, period: '西周', reason: '齐国左氏' },
      { name: '河南兰考', lng: 114.82, lat: 34.82, period: '汉代', reason: '西迁济阳' },
      { name: '江苏苏州', lng: 120.62, lat: 31.32, period: '唐代', reason: '南迁江南' },
      { name: '安徽合肥', lng: 117.23, lat: 31.82, period: '宋代', reason: '迁居庐州' },
      { name: '湖南长沙', lng: 112.94, lat: 28.23, period: '明清', reason: '迁居潇湘' },
    ],
    figures: [
      { name: '左丘明', dynasty: '春秋', achievement: '史学家，著《左传》' },
      { name: '左思', dynasty: '西晋', achievement: '文学家，洛阳纸贵' },
      { name: '左宗棠', dynasty: '清', achievement: '收复新疆，洋务名臣' },
      { name: '左光斗', dynasty: '明', achievement: '东林六君子' },
    ],
    totem: '左字从工从，本义为左手。图腾为左史简册，象征史官传承。',
    history: '左姓源于姬姓，周左史之后。济阳左氏为郡望，春秋左丘明著《左传》，清代左宗棠收复新疆。',
  },
  {
    surname: '石',

    pinyin: 'Shí',

    rank: 188,

    populationRank: 63,

    population: 390,
    origin: '源于姬姓，周成王封叔虞于唐，卫大夫石碏之后，以字为氏。亦为北魏乌石兰氏所改。',
    originPlace: { name: '河南淇县', lng: 114.17, lat: 35.61 },
    originPeriod: '春秋',
    junwang: [
      { name: '武威郡', location: '甘肃武威', lng: 102.64, lat: 37.93, tanghao: '武威堂' },
      { name: '渤海郡', location: '河北沧州', lng: 116.84, lat: 38.30, tanghao: '渤海堂' },
    ],
    migration: [
      { name: '河南淇县', lng: 114.17, lat: 35.61, period: '春秋', reason: '卫国石氏' },
      { name: '河北沧州', lng: 116.84, lat: 38.30, period: '汉代', reason: '北迁渤海' },
      { name: '甘肃武威', lng: 102.64, lat: 37.93, period: '十六国', reason: '西迁武威' },
      { name: '福建福州', lng: 119.30, lat: 26.08, period: '宋代', reason: '入闽定居' },
      { name: '广东梅州', lng: 116.12, lat: 24.29, period: '明清', reason: '南迁客家' },
    ],
    figures: [
      { name: '石碏', dynasty: '春秋', achievement: '卫大夫，大义灭亲' },
      { name: '石守信', dynasty: '北宋', achievement: '将军，开国功臣' },
      { name: '石延年', dynasty: '北宋', achievement: '诗人' },
      { name: '石达开', dynasty: '清', achievement: '太平天国翼王' },
    ],
    totem: '石字从厂从口，本义为山石。图腾为卫国石磐，象征坚贞不变。',
    history: '石姓源于姬姓，卫石碏之后。渤海石氏为郡望，春秋石碏大义灭亲，北宋石守信为开国功臣。',
  },
  {
    surname: '崔',

    pinyin: 'Cuī',

    rank: 189,

    populationRank: 58,

    population: 420,
    origin: '源于姜姓，齐丁公嫡子季子让国，食采于崔，子孙以邑为氏。崔邑在今山东章丘。',
    originPlace: { name: '山东章丘', lng: 117.53, lat: 36.72 },
    originPeriod: '西周',
    junwang: [
      { name: '博陵郡', location: '河北安平', lng: 115.52, lat: 38.23, tanghao: '博陵堂' },
      { name: '清河郡', location: '河北清河', lng: 115.67, lat: 37.06, tanghao: '清河堂' },
    ],
    migration: [
      { name: '山东章丘', lng: 117.53, lat: 36.72, period: '西周', reason: '齐崔邑起源' },
      { name: '河北安平', lng: 115.52, lat: 38.23, period: '汉代', reason: '北迁博陵' },
      { name: '河北清河', lng: 115.67, lat: 37.06, period: '唐代', reason: '迁居清河' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '宋代', reason: '西迁河南' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '明清', reason: '南迁江宁' },
    ],
    figures: [
      { name: '崔寔', dynasty: '东汉', achievement: '政论家，著《政论》' },
      { name: '崔浩', dynasty: '北魏', achievement: '宰相，史学家' },
      { name: '崔颢', dynasty: '唐', achievement: '诗人，著《黄鹤楼》' },
      { name: '崔护', dynasty: '唐', achievement: '诗人，人面桃花' },
    ],
    totem: '崔字从山从隹，本义为高大。图腾为崔邑山岳，象征姜姓分支。',
    history: '崔姓源于姜姓，齐丁公之后。博陵崔氏最盛，北魏崔浩为史学家，唐代崔颢著《黄鹤楼》。',
  },
  {
    surname: '吉',

    pinyin: 'Jí',

    rank: 190,

    populationRank: 195,

    population: 60,
    origin: '源于姞姓，黄帝后裔。周有南燕国，姞姓，后改吉氏。亦为殷商吉方之后。',
    originPlace: { name: '河南延津', lng: 114.19, lat: 35.14 },
    originPeriod: '西周',
    junwang: [
      { name: '冯翊郡', location: '陕西大荔', lng: 109.74, lat: 34.80, tanghao: '冯翊堂' },
      { name: '洛阳郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '洛阳堂' },
    ],
    migration: [
      { name: '河南延津', lng: 114.19, lat: 35.14, period: '西周', reason: '南燕国起源' },
      { name: '陕西大荔', lng: 109.74, lat: 34.80, period: '汉代', reason: '西迁冯翊' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '唐代', reason: '东迁洛阳' },
      { name: '江苏苏州', lng: 120.62, lat: 31.32, period: '宋代', reason: '南迁江南' },
      { name: '福建福州', lng: 119.30, lat: 26.08, period: '明清', reason: '入闽定居' },
    ],
    figures: [
      { name: '吉中孚', dynasty: '唐', achievement: '诗人，大历十才子' },
      { name: '吉翂', dynasty: '南朝', achievement: '孝子' },
      { name: '吉顼', dynasty: '唐', achievement: '宰相' },
      { name: '吉鸿昌', dynasty: '近代', achievement: '抗日名将' },
    ],
    totem: '吉字从士从口，本义为善。图腾为南燕礼器，象征姞姓后裔。',
    history: '吉姓源于姞姓，黄帝之后。冯翊吉氏为郡望，唐代吉中孚为大历十才子，近代吉鸿昌为抗日名将。',
  },
  {
    surname: '钮',

    pinyin: 'Niǔ',

    rank: 191,

    populationRank: 234,

    population: 35,
    origin: '源于官名，周有钮社之官，后以官为氏。亦为北魏钮呼氏所改。',
    originPlace: { name: '河南洛阳', lng: 112.45, lat: 34.62 },
    originPeriod: '西周',
    junwang: [
      { name: '吴兴郡', location: '浙江湖州', lng: 120.10, lat: 30.87, tanghao: '吴兴堂' },
      { name: '会稽郡', location: '浙江绍兴', lng: 120.58, lat: 30.03, tanghao: '会稽堂' },
    ],
    migration: [
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '西周', reason: '钮官起源' },
      { name: '浙江湖州', lng: 120.10, lat: 30.87, period: '汉代', reason: '南迁吴兴' },
      { name: '浙江绍兴', lng: 120.58, lat: 30.03, period: '唐代', reason: '迁居会稽' },
      { name: '江苏苏州', lng: 120.62, lat: 31.32, period: '宋代', reason: '迁居吴中' },
      { name: '上海', lng: 121.47, lat: 31.23, period: '明清', reason: '迁居松江' },
    ],
    figures: [
      { name: '钮衍', dynasty: '明', achievement: '知府' },
      { name: '钮纬', dynasty: '明', achievement: '藏书家' },
      { name: '钮福畴', dynasty: '清', achievement: '知县' },
      { name: '钮永建', dynasty: '近代', achievement: '政治家' },
    ],
    totem: '钮字从金从丑，本义为印鼻。图腾为钮官印信，象征执印传承。',
    history: '钮姓源于官名，周钮官之后。吴兴钮氏为郡望，明代钮纬为藏书家，近代钮永建为政治家。',
  },
  {
    surname: '龚',

    pinyin: 'Gōng',

    rank: 192,

    populationRank: 89,

    population: 270,
    origin: '源于姬姓，周有共国，后为氏。共龙为龚，避难改姓。亦为共工氏之后。',
    originPlace: { name: '河南辉县', lng: 113.80, lat: 35.46 },
    originPeriod: '西周',
    junwang: [
      { name: '武陵郡', location: '湖南常德', lng: 111.69, lat: 29.04, tanghao: '武陵堂' },
      { name: '渤海郡', location: '河北沧州', lng: 116.84, lat: 38.30, tanghao: '渤海堂' },
    ],
    migration: [
      { name: '河南辉县', lng: 113.80, lat: 35.46, period: '西周', reason: '共国起源' },
      { name: '河北沧州', lng: 116.84, lat: 38.30, period: '汉代', reason: '北迁渤海' },
      { name: '湖南常德', lng: 111.69, lat: 29.04, period: '唐代', reason: '南迁武陵' },
      { name: '福建福州', lng: 119.30, lat: 26.08, period: '宋代', reason: '入闽定居' },
      { name: '广东梅州', lng: 116.12, lat: 24.29, period: '明清', reason: '南迁客家' },
    ],
    figures: [
      { name: '龚胜', dynasty: '西汉', achievement: '名士，不事王莽' },
      { name: '龚开', dynasty: '宋元', achievement: '画家' },
      { name: '龚自珍', dynasty: '清', achievement: '思想家，著《己亥杂诗》' },
      { name: '龚贤', dynasty: '清', achievement: '画家，金陵八家' },
    ],
    totem: '龚字从龙从共，本义为供奉。图腾为共国龙纹，象征共工后裔。',
    history: '龚姓源于姬姓，共国之后，共龙为龚。武陵龚氏为郡望，西汉龚胜不事王莽，清代龚自珍为思想家。',
  },
  {
    surname: '程',

    pinyin: 'Chéng',

    rank: 193,

    populationRank: 33,

    population: 760,
    origin: '源于风姓，重黎之后。周有程国，伯益之后封于程，子孙以国为氏。亦为乔姓。',
    originPlace: { name: '陕西咸阳', lng: 108.71, lat: 34.33 },
    originPeriod: '西周',
    junwang: [
      { name: '广平郡', location: '河北邯郸', lng: 114.54, lat: 36.62, tanghao: '广平堂' },
      { name: '中山郡', location: '河北定州', lng: 115.01, lat: 38.40, tanghao: '中山堂' },
    ],
    migration: [
      { name: '陕西咸阳', lng: 108.71, lat: 34.33, period: '西周', reason: '程国封地' },
      { name: '河北邯郸', lng: 114.54, lat: 36.62, period: '汉代', reason: '东迁广平' },
      { name: '河北定州', lng: 115.01, lat: 38.40, period: '唐代', reason: '北迁中山' },
      { name: '安徽徽州', lng: 118.33, lat: 29.87, period: '宋代', reason: '南迁新安' },
      { name: '湖北武汉', lng: 114.30, lat: 30.59, period: '明清', reason: '迁居江夏' },
    ],
    figures: [
      { name: '程婴', dynasty: '春秋', achievement: '赵氏孤儿救孤义士' },
      { name: '程颐', dynasty: '北宋', achievement: '理学家，伊川先生' },
      { name: '程颢', dynasty: '北宋', achievement: '理学家，明道先生' },
      { name: '程大位', dynasty: '明', achievement: '数学家，算盘大师' },
    ],
    totem: '程字从禾从呈，本义为法度。图腾为程国圭表，象征度量衡制。',
    history: '程姓源于风姓，重黎之后。广平程氏为郡望，春秋程婴救赵氏孤儿，北宋二程为理学奠基。',
  },
  {
    surname: '嵇',

    pinyin: 'Jī',

    rank: 194,

    populationRank: 223,

    population: 45,
    origin: '源于姒姓，夏少康之后。会稽氏避乱去会留稽，后为嵇氏。亦为稽氏所改。',
    originPlace: { name: '浙江绍兴', lng: 120.58, lat: 30.03 },
    originPeriod: '夏朝',
    junwang: [
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
      { name: '谯郡', location: '安徽亳州', lng: 115.78, lat: 33.85, tanghao: '谯国堂' },
    ],
    migration: [
      { name: '浙江绍兴', lng: 120.58, lat: 30.03, period: '夏朝', reason: '会稽起源' },
      { name: '安徽亳州', lng: 115.78, lat: 33.85, period: '汉代', reason: '北迁谯郡' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '魏晋', reason: '迁居河南' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江宁' },
      { name: '浙江杭州', lng: 120.16, lat: 30.27, period: '明清', reason: '迁居钱塘' },
    ],
    figures: [
      { name: '嵇康', dynasty: '魏晋', achievement: '竹林七贤，著《广陵散》' },
      { name: '嵇绍', dynasty: '西晋', achievement: '侍中，血溅帝衣' },
      { name: '嵇曾筠', dynasty: '清', achievement: '大学士，治河名臣' },
      { name: '嵇璜', dynasty: '清', achievement: '大学士' },
    ],
    totem: '嵇字从山从稽，本义为山名。图腾为会稽山岳，象征少康后裔。',
    history: '嵇姓源于姒姓，少康之后，会稽改嵇。谯郡嵇氏为郡望，魏晋嵇康为竹林七贤，清代嵇曾筠治河有功。',
  },
  {
    surname: '邢',

    pinyin: 'Xíng',

    rank: 195,

    populationRank: 131,

    population: 100,
    origin: '源于姬姓，周公第四子苴封于邢，建邢国，后为卫灭，子孙以国为氏。',
    originPlace: { name: '河北邢台', lng: 114.50, lat: 37.07 },
    originPeriod: '西周',
    junwang: [
      { name: '河间郡', location: '河北河间', lng: 116.10, lat: 38.45, tanghao: '河间堂' },
      { name: '襄阳郡', location: '湖北襄阳', lng: 112.12, lat: 32.01, tanghao: '襄阳堂' },
    ],
    migration: [
      { name: '河北邢台', lng: 114.50, lat: 37.07, period: '西周', reason: '邢国封地' },
      { name: '河北河间', lng: 116.10, lat: 38.45, period: '春秋', reason: '北迁河间' },
      { name: '山东济南', lng: 117.00, lat: 36.67, period: '汉代', reason: '东迁齐地' },
      { name: '湖北襄阳', lng: 112.12, lat: 32.01, period: '唐代', reason: '南迁襄阳' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '明清', reason: '回迁中原' },
    ],
    figures: [
      { name: '邢劭', dynasty: '北齐', achievement: '文学家，北朝三才' },
      { name: '邢邵', dynasty: '北齐', achievement: '中书监' },
      { name: '邢昺', dynasty: '北宋', achievement: '礼部尚书，经学家' },
      { name: '邢侗', dynasty: '明', achievement: '书法家' },
    ],
    totem: '邢字从阝从井，本义为井田。图腾为邢国井邑，象征周公后裔。',
    history: '邢姓源于姬姓，周公四子之后。河间邢氏为郡望，北齐邢劭为文学家，北宋邢昺为经学家。',
  },
  {
    surname: '滑',

    pinyin: 'Huá',

    rank: 196,

    populationRank: 300,

    population: 18,
    origin: '源于姬姓，周有滑国，后为晋灭，子孙以国为氏。滑国在今河南偃师。',
    originPlace: { name: '河南偃师', lng: 112.78, lat: 34.73 },
    originPeriod: '西周',
    junwang: [
      { name: '京兆郡', location: '陕西西安', lng: 108.94, lat: 34.27, tanghao: '京兆堂' },
      { name: '下邳郡', location: '江苏邳州', lng: 117.97, lat: 34.31, tanghao: '下邳堂' },
    ],
    migration: [
      { name: '河南偃师', lng: 112.78, lat: 34.73, period: '西周', reason: '滑国封地' },
      { name: '陕西西安', lng: 108.94, lat: 34.27, period: '春秋', reason: '西迁京兆' },
      { name: '江苏邳州', lng: 117.97, lat: 34.31, period: '汉代', reason: '东迁下邳' },
      { name: '浙江杭州', lng: 120.16, lat: 30.27, period: '宋代', reason: '南迁钱塘' },
      { name: '安徽合肥', lng: 117.23, lat: 31.82, period: '明清', reason: '迁居庐州' },
    ],
    figures: [
      { name: '滑寿', dynasty: '元', achievement: '医学家' },
      { name: '滑涣', dynasty: '唐', achievement: '宦官' },
      { name: '滑受', dynasty: '明', achievement: '名士' },
      { name: '滑震', dynasty: '明', achievement: '画家' },
    ],
    totem: '滑字从水从骨，本义为光滑。图腾为滑国水流，象征姬姓封裔。',
    history: '滑姓源于姬姓，滑国之后。京兆滑氏为郡望，元代滑寿为医学家。',
  },
  {
    surname: '裴',

    pinyin: 'Péi',

    rank: 197,

    populationRank: 102,

    population: 180,
    origin: '源于嬴姓，伯益之后。周有裴国，后以国为氏。亦为秦非子之后，飞廉后裔。',
    originPlace: { name: '山西闻喜', lng: 111.22, lat: 35.36 },
    originPeriod: '西周',
    junwang: [
      { name: '河东郡', location: '山西运城', lng: 111.01, lat: 35.03, tanghao: '河东堂' },
      { name: '燕郡', location: '北京', lng: 116.41, lat: 39.90, tanghao: '燕郡堂' },
    ],
    migration: [
      { name: '山西闻喜', lng: 111.22, lat: 35.36, period: '西周', reason: '裴国封地' },
      { name: '山西运城', lng: 111.01, lat: 35.03, period: '汉代', reason: '迁居河东' },
      { name: '北京', lng: 116.41, lat: 39.90, period: '唐代', reason: '北迁燕郡' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江宁' },
      { name: '湖北武汉', lng: 114.30, lat: 30.59, period: '明清', reason: '迁居江夏' },
    ],
    figures: [
      { name: '裴松之', dynasty: '南朝', achievement: '史学家，注《三国志》' },
      { name: '裴度', dynasty: '唐', achievement: '宰相，中兴名臣' },
      { name: '裴矩', dynasty: '隋', achievement: '外交家' },
      { name: '裴行俭', dynasty: '唐', achievement: '将军，书法家' },
    ],
    totem: '裴字从衣从非，本义为长衣。图腾为裴国衣冠，象征嬴姓后裔。',
    history: '裴姓源于嬴姓，伯益之后。河东裴氏最盛，南朝裴松之注《三国志》，唐代裴度为中兴名臣。',
  },
  {
    surname: '陆',

    pinyin: 'Lù',

    rank: 198,

    populationRank: 57,

    population: 420,
    origin: '源于妫姓，田氏代齐后，齐宣王封少子通于陆乡，后以地为氏。亦为古帝颛顼之后。',
    originPlace: { name: '山东陵县', lng: 116.58, lat: 37.33 },
    originPeriod: '战国',
    junwang: [
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
      { name: '平原郡', location: '山东平原', lng: 116.44, lat: 37.31, tanghao: '平原堂' },
    ],
    migration: [
      { name: '山东陵县', lng: 116.58, lat: 37.33, period: '战国', reason: '齐陆乡起源' },
      { name: '山东平原', lng: 116.44, lat: 37.31, period: '汉代', reason: '迁居平原' },
      { name: '江苏苏州', lng: 120.62, lat: 31.32, period: '唐代', reason: '南迁吴中' },
      { name: '浙江杭州', lng: 120.16, lat: 30.27, period: '宋代', reason: '迁居钱塘' },
      { name: '上海', lng: 121.47, lat: 31.23, period: '明清', reason: '迁居松江' },
    ],
    figures: [
      { name: '陆逊', dynasty: '三国', achievement: '吴国名将，夷陵之战' },
      { name: '陆机', dynasty: '西晋', achievement: '文学家，著《文赋》' },
      { name: '陆游', dynasty: '南宋', achievement: '诗人，著《剑南诗稿》' },
      { name: '陆九渊', dynasty: '南宋', achievement: '哲学家，心学开山' },
    ],
    totem: '陆字从阝从圥，本义为高平之地。图腾为齐国陆乡，象征妫姓后裔。',
    history: '陆姓源于妫姓，齐宣王子之后。平原陆氏为郡望，三国陆逊夷陵破蜀，南宋陆游为爱国诗人。',
  },
  {
    surname: '荣',

    pinyin: 'Róng',

    rank: 199,

    populationRank: 283,

    population: 25,
    origin: '源于姬姓，周成王卿士荣伯之后，以字为氏。亦为黄帝臣荣将之后。又为地名。',
    originPlace: { name: '河南巩义', lng: 113.02, lat: 34.75 },
    originPeriod: '西周',
    junwang: [
      { name: '上谷郡', location: '河北怀来', lng: 115.52, lat: 40.41, tanghao: '上谷堂' },
      { name: '鲁郡', location: '山东曲阜', lng: 116.98, lat: 35.58, tanghao: '鲁国堂' },
    ],
    migration: [
      { name: '河南巩义', lng: 113.02, lat: 34.75, period: '西周', reason: '荣伯封地' },
      { name: '山东曲阜', lng: 116.98, lat: 35.58, period: '春秋', reason: '东迁鲁国' },
      { name: '河北怀来', lng: 115.52, lat: 40.41, period: '汉代', reason: '北迁上谷' },
      { name: '河北天津', lng: 117.20, lat: 39.13, period: '宋代', reason: '迁居渤海' },
      { name: '江苏苏州', lng: 120.62, lat: 31.32, period: '明清', reason: '南迁吴中' },
    ],
    figures: [
      { name: '荣启期', dynasty: '春秋', achievement: '隐士，知足常乐' },
      { name: '荣毗', dynasty: '隋', achievement: '侍御史' },
      { name: '荣諲', dynasty: '北宋', achievement: '秘书监' },
      { name: '荣毅仁', dynasty: '近代', achievement: '国家副主席，红色资本家' },
    ],
    totem: '荣字从艹从木从火，本义为梧桐。图腾为荣国桐木，象征姬姓封裔。',
    history: '荣姓源于姬姓，周荣伯之后。上谷荣氏为郡望，春秋荣启期为知足隐士，近代荣毅仁为红色资本家。',
  },
  {
    surname: '翁',

    pinyin: 'Wēng',

    rank: 200,

    populationRank: 159,

    population: 90,
    origin: '源于姬姓，周昭王庶子翁，后以字为氏。亦为夏后氏之后。又为官名氏。',
    originPlace: { name: '陕西西安', lng: 108.94, lat: 34.27 },
    originPeriod: '西周',
    junwang: [
      { name: '盐官郡', location: '浙江海宁', lng: 120.69, lat: 30.51, tanghao: '盐官堂' },
      { name: '钱塘郡', location: '浙江杭州', lng: 120.16, lat: 30.27, tanghao: '钱塘堂' },
    ],
    migration: [
      { name: '陕西西安', lng: 108.94, lat: 34.27, period: '西周', reason: '周昭王子后裔' },
      { name: '福建福州', lng: 119.30, lat: 26.08, period: '唐代', reason: '入闽定居' },
      { name: '浙江杭州', lng: 120.16, lat: 30.27, period: '宋代', reason: '迁居钱塘' },
      { name: '广东潮州', lng: 116.63, lat: 23.68, period: '明清', reason: '南迁岭南' },
      { name: '四川成都', lng: 104.07, lat: 30.67, period: '明清', reason: '入蜀定居' },
    ],
    figures: [
      { name: '翁同龢', dynasty: '清', achievement: '帝师，书法家' },
      { name: '翁方纲', dynasty: '清', achievement: '学者，书法家' },
      { name: '翁正春', dynasty: '明', achievement: '状元，礼部尚书' },
      { name: '翁心存', dynasty: '清', achievement: '大学士' },
    ],
    totem: '翁字从公从羽，本义为鸟颈毛。图腾为周昭王鸟羽，象征姬姓后裔。',
    history: '翁姓源于姬姓，周昭王子之后。钱塘翁氏为郡望，明代翁正春为状元，清代翁同龢为帝师。',
  },
  {
    surname: '荀',

    pinyin: 'Xún',

    rank: 201,

    populationRank: 175,

    population: 80,
    origin: '源于姬姓，周文王第十七子郇伯之后，郇通荀。亦出自荀国，春秋时晋邑。',
    originPlace: { name: '山西临猗', lng: 110.77, lat: 35.14 },
    originPeriod: '西周',
    junwang: [
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
      { name: '兰陵郡', location: '山东苍山', lng: 118.10, lat: 34.84, tanghao: '兰陵堂' },
    ],
    migration: [
      { name: '山西临猗', lng: 110.77, lat: 35.14, period: '西周', reason: '郇伯封地' },
      { name: '山东苍山', lng: 118.10, lat: 34.84, period: '战国', reason: '荀子迁居' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '汉代', reason: '河南荀氏兴起' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '晋代', reason: '南渡江左' },
      { name: '浙江绍兴', lng: 120.58, lat: 30.03, period: '宋代', reason: '迁居会稽' },
    ],
    figures: [
      { name: '荀子', dynasty: '战国', achievement: '儒家大师，著《荀子》' },
      { name: '荀爽', dynasty: '东汉', achievement: '经学家，司空' },
      { name: '荀彧', dynasty: '东汉', achievement: '曹操谋主，尚书令' },
      { name: '荀攸', dynasty: '东汉', achievement: '曹操军师，尚书令' },
    ],
    totem: '荀字从艹从旬，本义为草名。图腾为郇国花草，象征姬姓后裔。',
    history: '荀姓源于姬姓，郇伯之后。兰陵荀氏为郡望，战国荀子为儒家宗师，东汉荀彧为曹魏谋主。',
  },
  {
    surname: '羊',

    pinyin: 'Yáng',

    rank: 202,

    populationRank: 168,

    population: 100,
    origin: '源于姬姓，春秋时晋国大夫羊舌氏之后。亦出自官名，周代有羊人。',
    originPlace: { name: '山西洪洞', lng: 111.72, lat: 36.25 },
    originPeriod: '春秋',
    junwang: [
      { name: '泰山郡', location: '山东泰安', lng: 117.09, lat: 36.19, tanghao: '泰山堂' },
      { name: '京兆郡', location: '陕西西安', lng: 108.94, lat: 34.27, tanghao: '京兆堂' },
    ],
    migration: [
      { name: '山西洪洞', lng: 111.72, lat: 36.25, period: '春秋', reason: '羊舌氏封地' },
      { name: '山东泰安', lng: 117.09, lat: 36.19, period: '汉代', reason: '泰山羊氏兴起' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '魏晋', reason: '仕宦中原' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '南朝', reason: '南渡江左' },
      { name: '湖南长沙', lng: 112.94, lat: 28.23, period: '宋代', reason: '迁居湖湘' },
    ],
    figures: [
      { name: '羊舌肸', dynasty: '春秋', achievement: '晋国大夫，贤臣' },
      { name: '羊祜', dynasty: '西晋', achievement: '征南大将军，都督荆州' },
      { name: '羊续', dynasty: '东汉', achievement: '南阳太守，悬鱼拒贿' },
      { name: '羊欣', dynasty: '南朝宋', achievement: '书法家，王献之外甥' },
    ],
    totem: '羊字象形，本义为家畜。图腾为羊舌氏，象征晋国大夫后裔。',
    history: '羊姓源于姬姓，羊舌氏之后。泰山羊氏为郡望，西晋羊祜为一代名臣。',
  },
  {
    surname: '於',

    pinyin: 'Yū',

    rank: 203,

    populationRank: 320,

    population: 20,
    origin: '源于姬姓，周武王第三子邘叔之后，邘通於。亦出自地名，古有於陵。',
    originPlace: { name: '河南沁阳', lng: 112.93, lat: 35.09 },
    originPeriod: '西周',
    junwang: [
      { name: '京兆郡', location: '陕西西安', lng: 108.94, lat: 34.27, tanghao: '京兆堂' },
      { name: '广汉郡', location: '四川广汉', lng: 104.25, lat: 30.99, tanghao: '广汉堂' },
    ],
    migration: [
      { name: '河南沁阳', lng: 112.93, lat: 35.09, period: '西周', reason: '邘叔封地' },
      { name: '山东邹平', lng: 117.74, lat: 36.86, period: '战国', reason: '於陵定居' },
      { name: '陕西西安', lng: 108.94, lat: 34.27, period: '汉代', reason: '京兆於氏' },
      { name: '江苏苏州', lng: 120.62, lat: 31.32, period: '晋代', reason: '南渡江左' },
      { name: '浙江杭州', lng: 120.16, lat: 30.27, period: '宋代', reason: '迁居临安' },
    ],
    figures: [
      { name: '於陵子', dynasty: '战国', achievement: '隐士，廉洁高尚' },
      { name: '於清言', dynasty: '宋', achievement: '画家，善画墨梅' },
      { name: '於仲完', dynasty: '明', achievement: '永丰知县，循吏' },
      { name: '於敖', dynasty: '明', achievement: '陕西参政，文学家' },
    ],
    totem: '於字从方从人，本义为往。图腾为邘国方人，象征姬姓后裔。',
    history: '於姓源于姬姓，邘叔之后。京兆於氏为郡望，战国於陵子为高洁隐士。',
  },
  {
    surname: '惠',

    pinyin: 'Huì',

    rank: 204,

    populationRank: 155,

    population: 120,
    origin: '源于姬姓，周惠王之后，以谥为氏。亦出自颛顼帝之后惠连。',
    originPlace: { name: '河南洛阳', lng: 112.45, lat: 34.62 },
    originPeriod: '东周',
    junwang: [
      { name: '扶风郡', location: '陕西兴平', lng: 108.49, lat: 34.30, tanghao: '扶风堂' },
      { name: '琅琊郡', location: '山东临沂', lng: 118.35, lat: 35.05, tanghao: '琅琊堂' },
    ],
    migration: [
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '东周', reason: '周惠王后裔' },
      { name: '陕西兴平', lng: 108.49, lat: 34.30, period: '汉代', reason: '扶风惠氏' },
      { name: '山东临沂', lng: 118.35, lat: 35.05, period: '魏晋', reason: '琅琊惠氏' },
      { name: '江苏苏州', lng: 120.62, lat: 31.32, period: '南朝', reason: '南渡江左' },
      { name: '广东梅州', lng: 116.12, lat: 24.29, period: '宋代', reason: '迁居岭南' },
    ],
    figures: [
      { name: '惠施', dynasty: '战国', achievement: '名家代表，庄子论友' },
      { name: '惠生', dynasty: '北魏', achievement: '求法僧，著《行记》' },
      { name: '惠能', dynasty: '唐', achievement: '禅宗六祖' },
      { name: '惠士奇', dynasty: '清', achievement: '经学家，吴派代表' },
    ],
    totem: '惠字从心从叀，本义为仁恩。图腾为周惠王仁恩，象征姬姓后裔。',
    history: '惠姓源于姬姓，周惠王之后。扶风惠氏为郡望，战国惠施为名家大师，唐代惠能为禅宗六祖。',
  },
  {
    surname: '甄',

    pinyin: 'Zhēn',

    rank: 205,

    populationRank: 162,

    population: 100,
    origin: '源于妫姓，舜帝之后。周武王封舜后胡公于陈，陈有陶正甄人，以官为氏。',
    originPlace: { name: '河南淮阳', lng: 114.89, lat: 33.73 },
    originPeriod: '西周',
    junwang: [
      { name: '中山郡', location: '河北定州', lng: 115.01, lat: 38.51, tanghao: '中山堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '河南淮阳', lng: 114.89, lat: 33.73, period: '西周', reason: '陈国陶正' },
      { name: '河北定州', lng: 115.01, lat: 38.51, period: '汉代', reason: '中山甄氏' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '魏晋', reason: '河南甄氏' },
      { name: '山东郓城', lng: 115.94, lat: 35.59, period: '南朝', reason: '南迁定居' },
      { name: '广东台山', lng: 112.79, lat: 22.25, period: '宋代', reason: '迁居岭南' },
    ],
    figures: [
      { name: '甄宇', dynasty: '东汉', achievement: '太学博士，学者' },
      { name: '甄邯', dynasty: '东汉', achievement: '太保，承阳侯' },
      { name: '甄宓', dynasty: '三国魏', achievement: '魏文帝皇后' },
      { name: '甄鸾', dynasty: '北周', achievement: '数学家，算经注释' },
    ],
    totem: '甄字从瓦从垔，本义为陶器。图腾为陶正甄官，象征妫姓后裔。',
    history: '甄姓源于妫姓，舜帝之后。中山甄氏为郡望，东汉甄宇为经学博士。',
  },
  {
    surname: '曲',

    pinyin: 'Qū',

    rank: 206,

    populationRank: 185,

    population: 70,
    origin: '源于姬姓，晋穆侯封少子成师于曲沃，后裔以地为氏。亦出自夏桀之后曲烈。',
    originPlace: { name: '山西闻喜', lng: 111.22, lat: 35.36 },
    originPeriod: '春秋',
    junwang: [
      { name: '雁门郡', location: '山西代县', lng: 112.96, lat: 39.07, tanghao: '雁门堂' },
      { name: '陕郡', location: '河南三门峡', lng: 111.20, lat: 34.77, tanghao: '陕郡堂' },
    ],
    migration: [
      { name: '山西闻喜', lng: 111.22, lat: 35.36, period: '春秋', reason: '曲沃封地' },
      { name: '山西代县', lng: 112.96, lat: 39.07, period: '汉代', reason: '雁门曲氏' },
      { name: '河南三门峡', lng: 111.20, lat: 34.77, period: '唐代', reason: '陕郡曲氏' },
      { name: '山东掖县', lng: 119.93, lat: 37.18, period: '宋代', reason: '迁居胶东' },
      { name: '辽宁沈阳', lng: 123.43, lat: 41.80, period: '明清', reason: '出关定居' },
    ],
    figures: [
      { name: '曲环', dynasty: '唐', achievement: '陕虢节度使，司空' },
      { name: '曲端', dynasty: '南宋', achievement: '将领，泾原将领' },
      { name: '曲衍', dynasty: '明', achievement: '工部侍郎' },
      { name: '曲锐', dynasty: '明', achievement: '右副都御史，巡抚' },
    ],
    totem: '曲字象形，本义为弯曲。图腾为曲沃地名，象征晋国公族后裔。',
    history: '曲姓源于姬姓，曲沃之后。雁门曲氏为郡望，唐代曲环为名将。',
  },
  {
    surname: '家',

    pinyin: 'Jiā',

    rank: 207,

    populationRank: 230,

    population: 40,
    origin: '源于姬姓，周幽王时大夫家父之后。亦出自鲁孝公子子家之后，以字为氏。',
    originPlace: { name: '陕西西安', lng: 108.94, lat: 34.27 },
    originPeriod: '西周',
    junwang: [
      { name: '京兆郡', location: '陕西西安', lng: 108.94, lat: 34.27, tanghao: '京兆堂' },
      { name: '南安郡', location: '甘肃陇西', lng: 104.63, lat: 35.00, tanghao: '南安堂' },
    ],
    migration: [
      { name: '陕西西安', lng: 108.94, lat: 34.27, period: '西周', reason: '家父封邑' },
      { name: '山东曲阜', lng: 116.98, lat: 35.58, period: '春秋', reason: '鲁国子家' },
      { name: '甘肃陇西', lng: 104.63, lat: 35.00, period: '汉代', reason: '南安家氏' },
      { name: '四川成都', lng: 104.07, lat: 30.67, period: '唐代', reason: '仕宦入蜀' },
      { name: '江苏苏州', lng: 120.62, lat: 31.32, period: '宋代', reason: '迁居江南' },
    ],
    figures: [
      { name: '家父', dynasty: '西周', achievement: '周幽王大夫，作《节南山》' },
      { name: '家骥', dynasty: '东汉', achievement: '学者，经学家' },
      { name: '家勤国', dynasty: '宋', achievement: '学者，理学家' },
      { name: '家求仁', dynasty: '明', achievement: '举人，循吏' },
    ],
    totem: '家字从宀从豕，本义为居所。图腾为家父居室，象征姬姓后裔。',
    history: '家姓源于姬姓，周大夫家父之后。京兆家氏为郡望，西周家父作诗讽谏。',
  },
  {
    surname: '封',

    pinyin: 'Fēng',

    rank: 208,

    populationRank: 245,

    population: 35,
    origin: '源于姜姓，炎帝裔孙封巨之后。亦出自夏代封国，夏禹之后封父之后。',
    originPlace: { name: '河南封丘', lng: 114.42, lat: 35.03 },
    originPeriod: '夏代',
    junwang: [
      { name: '渤海郡', location: '河北沧州', lng: 116.84, lat: 38.31, tanghao: '渤海堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '河南封丘', lng: 114.42, lat: 35.03, period: '夏代', reason: '封父国' },
      { name: '河北沧州', lng: 116.84, lat: 38.31, period: '汉代', reason: '渤海封氏' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '魏晋', reason: '河南封氏' },
      { name: '山东蓬莱', lng: 120.75, lat: 37.81, period: '唐代', reason: '迁居胶东' },
      { name: '江苏扬州', lng: 119.42, lat: 32.39, period: '宋代', reason: '南迁江淮' },
    ],
    figures: [
      { name: '封孚', dynasty: '南燕', achievement: '太尉，吏部尚书' },
      { name: '封隆之', dynasty: '北齐', achievement: '尚书仆射，宰相' },
      { name: '封常清', dynasty: '唐', achievement: '范阳节度使，名将' },
      { name: '封敖', dynasty: '唐', achievement: '翰林学士，宰相' },
    ],
    totem: '封字从土从寸，本义为封土。图腾为封父国土，象征姜姓后裔。',
    history: '封姓源于姜姓，封巨之后。渤海封氏为郡望，唐代封常清为一代名将。',
  },
  {
    surname: '芮',

    pinyin: 'Ruì',

    rank: 209,

    populationRank: 215,

    population: 45,
    origin: '源于姬姓，周武王封司徒芮伯于芮，后裔以国为氏。',
    originPlace: { name: '陕西大荔', lng: 109.80, lat: 34.80 },
    originPeriod: '西周',
    junwang: [
      { name: '平原郡', location: '山东平原', lng: 116.43, lat: 37.16, tanghao: '平原堂' },
      { name: '扶风郡', location: '陕西兴平', lng: 108.49, lat: 34.30, tanghao: '扶风堂' },
    ],
    migration: [
      { name: '陕西大荔', lng: 109.80, lat: 34.80, period: '西周', reason: '芮伯封国' },
      { name: '陕西兴平', lng: 108.49, lat: 34.30, period: '东周', reason: '扶风芮氏' },
      { name: '山东平原', lng: 116.43, lat: 37.16, period: '汉代', reason: '平原芮氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '晋代', reason: '南渡江左' },
      { name: '浙江杭州', lng: 120.16, lat: 30.27, period: '宋代', reason: '迁居临安' },
    ],
    figures: [
      { name: '芮良夫', dynasty: '西周', achievement: '大夫，作《桑柔》' },
      { name: '芮挺章', dynasty: '唐', achievement: '国子进士，编《国秀集》' },
      { name: '芮晔', dynasty: '宋', achievement: '兵部侍郎' },
      { name: '芮城', dynasty: '明', achievement: '学者，文学家' },
    ],
    totem: '芮字从艹从内，本义为草初生。图腾为芮国草莽，象征姬姓后裔。',
    history: '芮姓源于姬姓，芮伯之后。平原芮氏为郡望，西周芮良夫作诗讽谏。',
  },
  {
    surname: '羿',

    pinyin: 'Yì',

    rank: 210,

    populationRank: 360,

    population: 12,
    origin: '源于妘姓，有穷氏后羿之后。亦出自夏代羿氏，以名为氏。',
    originPlace: { name: '山东德平', lng: 117.60, lat: 37.39 },
    originPeriod: '夏代',
    junwang: [
      { name: '齐郡', location: '山东淄博', lng: 118.05, lat: 36.78, tanghao: '齐郡堂' },
      { name: '太原郡', location: '山西太原', lng: 112.55, lat: 37.87, tanghao: '太原堂' },
    ],
    migration: [
      { name: '山东德平', lng: 117.60, lat: 37.39, period: '夏代', reason: '有穷氏故地' },
      { name: '山东淄博', lng: 118.05, lat: 36.78, period: '周代', reason: '齐郡羿氏' },
      { name: '山西太原', lng: 112.55, lat: 37.87, period: '汉代', reason: '太原羿氏' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '唐代', reason: '仕宦中原' },
      { name: '江苏苏州', lng: 120.62, lat: 31.32, period: '宋代', reason: '南迁江南' },
    ],
    figures: [
      { name: '后羿', dynasty: '夏', achievement: '有穷氏首领，善射' },
      { name: '羿忠', dynasty: '明', achievement: '黔江知县，循吏' },
      { name: '羿海', dynasty: '清', achievement: '学者，经学家' },
      { name: '羿逢春', dynasty: '清', achievement: '武举，将领' },
    ],
    totem: '羿字从羽从廾，本义为张弓射鸟。图腾为后羿射日，象征有穷氏后裔。',
    history: '羿姓源于妘姓，后羿之后。齐郡羿氏为郡望，夏代后羿为神射手。',
  },
  {
    surname: '储',

    pinyin: 'Chǔ',

    rank: 211,

    populationRank: 178,

    population: 80,
    origin: '源于姬姓，齐大夫储子之后。亦出自地名，古有储亭。',
    originPlace: { name: '山东泰安', lng: 117.09, lat: 36.19 },
    originPeriod: '春秋',
    junwang: [
      { name: '河东郡', location: '山西夏县', lng: 111.22, lat: 35.14, tanghao: '河东堂' },
      { name: '广平郡', location: '河北鸡泽', lng: 114.87, lat: 36.95, tanghao: '广平堂' },
    ],
    migration: [
      { name: '山东泰安', lng: 117.09, lat: 36.19, period: '春秋', reason: '储子封邑' },
      { name: '山西夏县', lng: 111.22, lat: 35.14, period: '汉代', reason: '河东储氏' },
      { name: '河北鸡泽', lng: 114.87, lat: 36.95, period: '魏晋', reason: '广平储氏' },
      { name: '江苏宜兴', lng: 119.78, lat: 31.34, period: '唐代', reason: '南迁江南' },
      { name: '安徽潜山', lng: 116.58, lat: 30.63, period: '宋代', reason: '迁居皖南' },
    ],
    figures: [
      { name: '储子', dynasty: '战国', achievement: '齐国大夫' },
      { name: '储光羲', dynasty: '唐', achievement: '诗人，田园派代表' },
      { name: '储嗣宗', dynasty: '唐', achievement: '诗人，进士' },
      { name: '储欣', dynasty: '清', achievement: '文学家，古文家' },
    ],
    totem: '储字从人从诸，本义为储备。图腾为齐大夫储子，象征姬姓后裔。',
    history: '储姓源于姬姓，储子之后。河东储氏为郡望，唐代储光羲为田园诗人。',
  },
  {
    surname: '靳',

    pinyin: 'Jìn',

    rank: 212,

    populationRank: 145,

    population: 130,
    origin: '源于姬姓，战国楚怀王侍臣靳尚之后。亦出自地名，古有靳亭。',
    originPlace: { name: '湖北宜昌', lng: 111.29, lat: 30.70 },
    originPeriod: '战国',
    junwang: [
      { name: '西河郡', location: '山西汾阳', lng: 111.78, lat: 37.27, tanghao: '西河堂' },
      { name: '辽东郡', location: '辽宁辽阳', lng: 123.17, lat: 41.27, tanghao: '辽东堂' },
    ],
    migration: [
      { name: '湖北宜昌', lng: 111.29, lat: 30.70, period: '战国', reason: '靳尚封地' },
      { name: '山西汾阳', lng: 111.78, lat: 37.27, period: '汉代', reason: '西河靳氏' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '魏晋', reason: '仕宦中原' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '南朝', reason: '南渡江左' },
      { name: '山东聊城', lng: 115.99, lat: 36.46, period: '明清', reason: '迁居鲁西' },
    ],
    figures: [
      { name: '靳尚', dynasty: '战国', achievement: '楚怀王侍臣' },
      { name: '靳歙', dynasty: '西汉', achievement: '信武侯，骑都尉' },
      { name: '靳强', dynasty: '西汉', achievement: '汾阳侯，将军' },
      { name: '靳辅', dynasty: '清', achievement: '河道总督，治河名臣' },
    ],
    totem: '靳字从革从斤，本义为革带。图腾为楚靳尚革带，象征姬姓后裔。',
    history: '靳姓源于姬姓，靳尚之后。西河靳氏为郡望，西汉靳歙为功侯，清代靳辅为治河名臣。',
  },
  {
    surname: '汲',

    pinyin: 'Jí',

    rank: 213,

    populationRank: 300,

    population: 22,
    origin: '源于姬姓，卫宣公太子伋之后，以字为氏。亦出自地名，古有汲邑。',
    originPlace: { name: '河南卫辉', lng: 114.07, lat: 35.40 },
    originPeriod: '春秋',
    junwang: [
      { name: '清河郡', location: '河北清河', lng: 115.67, lat: 37.07, tanghao: '清河堂' },
      { name: '濮阳郡', location: '河南濮阳', lng: 115.03, lat: 35.76, tanghao: '濮阳堂' },
    ],
    migration: [
      { name: '河南卫辉', lng: 114.07, lat: 35.40, period: '春秋', reason: '汲邑封地' },
      { name: '河南濮阳', lng: 115.03, lat: 35.76, period: '汉代', reason: '濮阳汲氏' },
      { name: '河北清河', lng: 115.67, lat: 37.07, period: '魏晋', reason: '清河汲氏' },
      { name: '山东淄博', lng: 118.05, lat: 36.78, period: '唐代', reason: '仕宦齐鲁' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南渡江左' },
    ],
    figures: [
      { name: '汲黯', dynasty: '西汉', achievement: '东海太守，主爵都尉' },
      { name: '汲固', dynasty: '北魏', achievement: '梁城太守，孝子' },
      { name: '汲明', dynasty: '明', achievement: '昌平知州，循吏' },
      { name: '汲金线', dynasty: '清', achievement: '学者，诗人' },
    ],
    totem: '汲字从水从及，本义为取水。图腾为汲邑水井，象征姬姓后裔。',
    history: '汲姓源于姬姓，卫太子伋之后。清河汲氏为郡望，西汉汲黯为直臣名臣。',
  },
  {
    surname: '邴',

    pinyin: 'Bǐng',

    rank: 214,

    populationRank: 290,

    population: 25,
    origin: '源于姬姓，春秋晋大夫邴豫之后，以地为氏。亦出自齐大夫邴师之后。',
    originPlace: { name: '山西太原', lng: 112.55, lat: 37.87 },
    originPeriod: '春秋',
    junwang: [
      { name: '鲁郡', location: '山东曲阜', lng: 116.98, lat: 35.58, tanghao: '鲁郡堂' },
      { name: '平阳郡', location: '山西临汾', lng: 111.52, lat: 36.08, tanghao: '平阳堂' },
    ],
    migration: [
      { name: '山西太原', lng: 112.55, lat: 37.87, period: '春秋', reason: '邴豫封邑' },
      { name: '山东曲阜', lng: 116.98, lat: 35.58, period: '战国', reason: '鲁郡邴氏' },
      { name: '山东临汾', lng: 111.52, lat: 36.08, period: '汉代', reason: '平阳邴氏' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '魏晋', reason: '仕宦中原' },
      { name: '浙江绍兴', lng: 120.58, lat: 30.03, period: '宋代', reason: '迁居会稽' },
    ],
    figures: [
      { name: '邴豫', dynasty: '春秋', achievement: '晋国大夫' },
      { name: '邴师', dynasty: '春秋', achievement: '齐国大夫' },
      { name: '邴汉', dynasty: '西汉', achievement: '京兆尹，光禄大夫' },
      { name: '邴郁', dynasty: '东汉', achievement: '名士，征博士' },
    ],
    totem: '邴字从邑从丙，本义为邑名。图腾为晋邴邑，象征姬姓后裔。',
    history: '邴姓源于姬姓，邴豫之后。鲁郡邴氏为郡望，西汉邴汉为京兆尹。',
  },
  {
    surname: '糜',

    pinyin: 'Mí',

    rank: 215,

    populationRank: 350,

    population: 15,
    origin: '源于姒姓，夏代同姓诸侯糜国之后，以国为氏。亦出自地名。',
    originPlace: { name: '陕西韩城', lng: 110.45, lat: 35.47 },
    originPeriod: '夏代',
    junwang: [
      { name: '汝南郡', location: '河南汝南', lng: 114.36, lat: 33.00, tanghao: '汝南堂' },
      { name: '南阳郡', location: '河南南阳', lng: 112.53, lat: 33.00, tanghao: '南阳堂' },
    ],
    migration: [
      { name: '陕西韩城', lng: 110.45, lat: 35.47, period: '夏代', reason: '糜国故地' },
      { name: '河南汝南', lng: 114.36, lat: 33.00, period: '汉代', reason: '汝南糜氏' },
      { name: '河南南阳', lng: 112.53, lat: 33.00, period: '魏晋', reason: '南阳糜氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '南朝', reason: '南渡江左' },
      { name: '四川成都', lng: 104.07, lat: 30.67, period: '明清', reason: '迁居蜀地' },
    ],
    figures: [
      { name: '糜竺', dynasty: '三国蜀', achievement: '安汉将军，刘备舅亲' },
      { name: '糜芳', dynasty: '三国蜀', achievement: '南郡太守' },
      { name: '糜信', dynasty: '魏', achievement: '乐平太守，学者' },
      { name: '糜溎', dynasty: '清', achievement: '画家，山水画家' },
    ],
    totem: '糜字从米从麻，本义为粥。图腾为糜国米麻，象征姒姓后裔。',
    history: '糜姓源于姒姓，糜国之后。汝南糜氏为郡望，三国糜竺为蜀汉重臣。',
  },
  {
    surname: '松',

    pinyin: 'Sōng',

    rank: 216,

    populationRank: 270,

    population: 28,
    origin: '源于姬姓，秦始皇封泰山，遇雨避松下，封松为五大夫，后裔以松为氏。',
    originPlace: { name: '山东泰安', lng: 117.09, lat: 36.19 },
    originPeriod: '秦代',
    junwang: [
      { name: '东莞郡', location: '山东沂水', lng: 118.63, lat: 35.78, tanghao: '东莞堂' },
      { name: '泰山郡', location: '山东泰安', lng: 117.09, lat: 36.19, tanghao: '泰山堂' },
    ],
    migration: [
      { name: '山东泰安', lng: 117.09, lat: 36.19, period: '秦代', reason: '泰山松封' },
      { name: '山东沂水', lng: 118.63, lat: 35.78, period: '汉代', reason: '东莞松氏' },
      { name: '河北清河', lng: 115.67, lat: 37.07, period: '魏晋', reason: '迁居河北' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '南朝', reason: '南渡江左' },
      { name: '广东梅州', lng: 116.12, lat: 24.29, period: '明清', reason: '迁居岭南' },
    ],
    figures: [
      { name: '松赟', dynasty: '隋', achievement: '北海令，循吏' },
      { name: '松冕', dynasty: '明', achievement: '长芦盐运使' },
      { name: '松嘉', dynasty: '清', achievement: '山东布政使' },
      { name: '松寿', dynasty: '清', achievement: '闽浙总督' },
    ],
    totem: '松字从木从公，本义为松树。图腾为泰山大夫松，象征秦封后裔。',
    history: '松姓源于姬姓，秦始皇封松之后。东莞松氏为郡望，隋代松赟为循吏。',
  },
  {
    surname: '井',

    pinyin: 'Jǐng',

    rank: 217,

    populationRank: 310,

    population: 20,
    origin: '源于姜姓，周代虞国大夫井伯之后。亦出自地名，古有井邑。',
    originPlace: { name: '山西平陆', lng: 111.22, lat: 34.84 },
    originPeriod: '西周',
    junwang: [
      { name: '扶风郡', location: '陕西兴平', lng: 108.49, lat: 34.30, tanghao: '扶风堂' },
      { name: '南阳郡', location: '河南南阳', lng: 112.53, lat: 33.00, tanghao: '南阳堂' },
    ],
    migration: [
      { name: '山西平陆', lng: 111.22, lat: 34.84, period: '西周', reason: '虞国井邑' },
      { name: '陕西兴平', lng: 108.49, lat: 34.30, period: '东周', reason: '扶风井氏' },
      { name: '河南南阳', lng: 112.53, lat: 33.00, period: '汉代', reason: '南阳井氏' },
      { name: '河北邢台', lng: 114.50, lat: 37.07, period: '唐代', reason: '仕宦河北' },
      { name: '江苏苏州', lng: 120.62, lat: 31.32, period: '宋代', reason: '南迁江南' },
    ],
    figures: [
      { name: '井伯', dynasty: '春秋', achievement: '虞国大夫' },
      { name: '井丹', dynasty: '东汉', achievement: '名士，学者' },
      { name: '井度', dynasty: '宋', achievement: '藏书家，四川转运使' },
      { name: '井源', dynasty: '明', achievement: '驸马都尉' },
    ],
    totem: '井字象形，本义为水井。图腾为虞国井邑，象征姜姓后裔。',
    history: '井姓源于姜姓，虞国井伯之后。扶风井氏为郡望，东汉井丹为名士。',
  },
  {
    surname: '段',

    pinyin: 'Duàn',

    rank: 218,

    populationRank: 87,

    population: 300,
    origin: '源于姬姓，春秋郑武公子共叔段之后，以字为氏。亦出自老子之后段干木。',
    originPlace: { name: '河南新郑', lng: 113.74, lat: 34.40 },
    originPeriod: '春秋',
    junwang: [
      { name: '京兆郡', location: '陕西西安', lng: 108.94, lat: 34.27, tanghao: '京兆堂' },
      { name: '辽西郡', location: '辽宁义县', lng: 121.52, lat: 41.54, tanghao: '辽西堂' },
    ],
    migration: [
      { name: '河南新郑', lng: 113.74, lat: 34.40, period: '春秋', reason: '共叔段封地' },
      { name: '陕西西安', lng: 108.94, lat: 34.27, period: '汉代', reason: '京兆段氏' },
      { name: '山东邹城', lng: 116.97, lat: 35.39, period: '魏晋', reason: '迁居鲁南' },
      { name: '四川成都', lng: 104.07, lat: 30.67, period: '唐代', reason: '仕宦入蜀' },
      { name: '云南大理', lng: 100.23, lat: 25.59, period: '明清', reason: '迁居云南' },
    ],
    figures: [
      { name: '段干木', dynasty: '战国', achievement: '魏国隐士，贤人' },
      { name: '段会宗', dynasty: '西汉', achievement: '西域都护' },
      { name: '段颎', dynasty: '东汉', achievement: '太尉，护羌校尉' },
      { name: '段祺瑞', dynasty: '近代', achievement: '北洋政府执政' },
    ],
    totem: '段字从殳从耑，本义为锤击。图腾为共叔段封地，象征姬姓后裔。',
    history: '段姓源于姬姓，共叔段之后。京兆段氏为郡望，东汉段颎为太尉，近代段祺瑞为北洋执政。',
  },
  {
    surname: '富',

    pinyin: 'Fù',

    rank: 219,

    populationRank: 138,

    population: 150,
    origin: '源于姬姓，周大夫富辰之后。亦出自鲁大夫富父之后，以字为氏。',
    originPlace: { name: '陕西西安', lng: 108.94, lat: 34.27 },
    originPeriod: '西周',
    junwang: [
      { name: '齐郡', location: '山东淄博', lng: 118.05, lat: 36.78, tanghao: '齐郡堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '陕西西安', lng: 108.94, lat: 34.27, period: '西周', reason: '富辰封邑' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '东周', reason: '河南富氏' },
      { name: '山东淄博', lng: 118.05, lat: 36.78, period: '汉代', reason: '齐郡富氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '南朝', reason: '南渡江左' },
      { name: '浙江宁波', lng: 121.55, lat: 29.87, period: '宋代', reason: '迁居四明' },
    ],
    figures: [
      { name: '富辰', dynasty: '西周', achievement: '周大夫，忠臣' },
      { name: '富弼', dynasty: '北宋', achievement: '宰相，郑国公' },
      { name: '富元衡', dynasty: '明', achievement: '大理寺卿' },
      { name: '富明阿', dynasty: '清', achievement: '吉林将军' },
    ],
    totem: '富字从宀从畐，本义为丰厚。图腾为周大夫富辰，象征姬姓后裔。',
    history: '富姓源于姬姓，富辰之后。齐郡富氏为郡望，北宋富弼为一代名相。',
  },
  {
    surname: '巫',

    pinyin: 'Wū',

    rank: 220,

    populationRank: 195,

    population: 60,
    origin: '源于上古，巫彭为黄帝神医，后裔以职为氏。亦出自商代巫咸、巫贤。',
    originPlace: { name: '河南洛阳', lng: 112.45, lat: 34.62 },
    originPeriod: '上古',
    junwang: [
      { name: '平阳郡', location: '山西临汾', lng: 111.52, lat: 36.08, tanghao: '平阳堂' },
      { name: '广汉郡', location: '四川广汉', lng: 104.25, lat: 30.99, tanghao: '广汉堂' },
    ],
    migration: [
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '上古', reason: '巫咸居地' },
      { name: '山西临汾', lng: 111.52, lat: 36.08, period: '商代', reason: '平阳巫氏' },
      { name: '山东济南', lng: 117.00, lat: 36.65, period: '汉代', reason: '迁居齐鲁' },
      { name: '福建宁化', lng: 116.65, lat: 26.26, period: '唐代', reason: '入闽客家' },
      { name: '广东梅州', lng: 116.12, lat: 24.29, period: '明清', reason: '迁居岭南' },
    ],
    figures: [
      { name: '巫彭', dynasty: '上古', achievement: '黄帝神医' },
      { name: '巫咸', dynasty: '商', achievement: '太宰，贤臣' },
      { name: '巫贤', dynasty: '商', achievement: '太宰，贤臣' },
      { name: '巫罗俊', dynasty: '唐', achievement: '黄连镇将，开闽始祖' },
    ],
    totem: '巫字象形，本义为祭神舞者。图腾为巫咸神职，象征上古神巫后裔。',
    history: '巫姓源于上古，巫彭之后。平阳巫氏为郡望，商代巫咸为太宰，唐代巫罗俊为开闽始祖。',
  },
  {
    surname: '乌',

    pinyin: 'Wū',

    rank: 221,

    populationRank: 240,

    population: 38,
    origin: '源于姬姓，鲁大夫乌止之后。亦出自南北朝乌丸氏，改姓乌。亦出自金代乌古论氏。',
    originPlace: { name: '山东曲阜', lng: 116.98, lat: 35.58 },
    originPeriod: '春秋',
    junwang: [
      { name: '颍川郡', location: '河南禹州', lng: 113.47, lat: 34.16, tanghao: '颍川堂' },
      { name: '汝南郡', location: '河南汝南', lng: 114.36, lat: 33.00, tanghao: '汝南堂' },
    ],
    migration: [
      { name: '山东曲阜', lng: 116.98, lat: 35.58, period: '春秋', reason: '鲁国乌止' },
      { name: '河南禹州', lng: 113.47, lat: 34.16, period: '汉代', reason: '颍川乌氏' },
      { name: '河南汝南', lng: 114.36, lat: 33.00, period: '魏晋', reason: '汝南乌氏' },
      { name: '浙江杭州', lng: 120.16, lat: 30.27, period: '宋代', reason: '南迁临安' },
      { name: '河北沧州', lng: 116.84, lat: 38.31, period: '明清', reason: '迁居河北' },
    ],
    figures: [
      { name: '乌获', dynasty: '战国', achievement: '秦国力士，猛将' },
      { name: '乌氏倮', dynasty: '秦', achievement: '畜牧商人，封君' },
      { name: '乌震', dynasty: '五代', achievement: '后唐将领，节度使' },
      { name: '乌本让', dynasty: '明', achievement: '学者，文学家' },
    ],
    totem: '乌字象形，本义为乌鸦。图腾为鲁大夫乌止，象征姬姓后裔。',
    history: '乌姓源于姬姓，乌止之后。颍川乌氏为郡望，战国乌获为秦国力士。',
  },
  {
    surname: '焦',

    pinyin: 'Jiāo',

    rank: 222,

    populationRank: 132,

    population: 160,
    origin: '源于姜姓，周武王封神农之后于焦，后裔以国为氏。亦出自地名。',
    originPlace: { name: '河南陕县', lng: 111.20, lat: 34.77 },
    originPeriod: '西周',
    junwang: [
      { name: '中山郡', location: '河北定州', lng: 115.01, lat: 38.51, tanghao: '中山堂' },
      { name: '广平郡', location: '河北鸡泽', lng: 114.87, lat: 36.95, tanghao: '广平堂' },
    ],
    migration: [
      { name: '河南陕县', lng: 111.20, lat: 34.77, period: '西周', reason: '焦国封地' },
      { name: '河北定州', lng: 115.01, lat: 38.51, period: '汉代', reason: '中山焦氏' },
      { name: '河北鸡泽', lng: 114.87, lat: 36.95, period: '魏晋', reason: '广平焦氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '南朝', reason: '南渡江左' },
      { name: '江西南昌', lng: 115.89, lat: 28.68, period: '明清', reason: '迁居江右' },
    ],
    figures: [
      { name: '焦先', dynasty: '汉末', achievement: '隐士，河东处士' },
      { name: '焦度', dynasty: '南齐', achievement: '辅国将军，名将' },
      { name: '焦循', dynasty: '清', achievement: '经学家，易学大家' },
      { name: '焦廷琥', dynasty: '清', achievement: '数学家，学者' },
    ],
    totem: '焦字从隹从灬，本义为火烤鸟。图腾为焦国烈火，象征神农后裔。',
    history: '焦姓源于姜姓，焦国之后。中山焦氏为郡望，汉末焦先为隐士，清代焦循为经学大家。',
  },
  {
    surname: '巴',

    pinyin: 'Bā',

    rank: 223,

    populationRank: 280,

    population: 28,
    origin: '源于风姓，太昊后裔巴人之后。周代有巴子国，后裔以国为氏。',
    originPlace: { name: '湖北长阳', lng: 111.20, lat: 30.47 },
    originPeriod: '夏代',
    junwang: [
      { name: '高平郡', location: '宁夏固原', lng: 106.24, lat: 36.01, tanghao: '高平堂' },
      { name: '渤海郡', location: '河北沧州', lng: 116.84, lat: 38.31, tanghao: '渤海堂' },
    ],
    migration: [
      { name: '湖北长阳', lng: 111.20, lat: 30.47, period: '夏代', reason: '巴人故地' },
      { name: '重庆', lng: 106.55, lat: 29.56, period: '商代', reason: '巴子国' },
      { name: '宁夏固原', lng: 106.24, lat: 36.01, period: '汉代', reason: '高平巴氏' },
      { name: '河北沧州', lng: 116.84, lat: 38.31, period: '魏晋', reason: '渤海巴氏' },
      { name: '四川成都', lng: 104.07, lat: 30.67, period: '明清', reason: '迁居蜀地' },
    ],
    figures: [
      { name: '巴蔓子', dynasty: '战国', achievement: '巴国将军，忠烈' },
      { name: '巴肃', dynasty: '东汉', achievement: '议郎，党锢名士' },
      { name: '巴宁', dynasty: '北魏', achievement: '秘书中散' },
      { name: '巴镛', dynasty: '明', achievement: '叙州府通判' },
    ],
    totem: '巴字象形，本义为大蛇。图腾为巴人蛇图腾，象征太昊后裔。',
    history: '巴姓源于风姓，巴人之后。高平巴氏为郡望，战国巴蔓子为忠烈将军。',
  },
  {
    surname: '弓',

    pinyin: 'Gōng',

    rank: 224,

    populationRank: 340,

    population: 16,
    origin: '源于官名，上古少昊时弓正之后，以官为氏。亦出自鲁大夫弓父之后。',
    originPlace: { name: '山东曲阜', lng: 116.98, lat: 35.58 },
    originPeriod: '上古',
    junwang: [
      { name: '太原郡', location: '山西太原', lng: 112.55, lat: 37.87, tanghao: '太原堂' },
      { name: '广平郡', location: '河北鸡泽', lng: 114.87, lat: 36.95, tanghao: '广平堂' },
    ],
    migration: [
      { name: '山东曲阜', lng: 116.98, lat: 35.58, period: '上古', reason: '少昊弓正' },
      { name: '山西太原', lng: 112.55, lat: 37.87, period: '汉代', reason: '太原弓氏' },
      { name: '河北鸡泽', lng: 114.87, lat: 36.95, period: '魏晋', reason: '广平弓氏' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '唐代', reason: '仕宦中原' },
      { name: '江苏扬州', lng: 119.42, lat: 32.39, period: '明清', reason: '南迁江淮' },
    ],
    figures: [
      { name: '弓工', dynasty: '春秋', achievement: '鲁国弓匠' },
      { name: '弓钦', dynasty: '汉', achievement: '羽林监' },
      { name: '弓元', dynasty: '明', achievement: '兵部主事' },
      { name: '弓翊清', dynasty: '清', achievement: '河南巡抚' },
    ],
    totem: '弓字象形，本义为射弓。图腾为少昊弓正，象征上古职官后裔。',
    history: '弓姓源于官名，少昊弓正之后。太原弓氏为郡望，明代弓元为兵部主事。',
  },
  {
    surname: '牧',

    pinyin: 'Mù',

    rank: 225,

    populationRank: 330,

    population: 18,
    origin: '源于姬姓，周武王时司牧官员之后，以官为氏。亦出自春秋卫康叔后裔牧人。',
    originPlace: { name: '河南濮阳', lng: 115.03, lat: 35.76 },
    originPeriod: '西周',
    junwang: [
      { name: '弘农郡', location: '河南灵宝', lng: 110.85, lat: 34.52, tanghao: '弘农堂' },
      { name: '中山郡', location: '河北定州', lng: 115.01, lat: 38.51, tanghao: '中山堂' },
    ],
    migration: [
      { name: '河南濮阳', lng: 115.03, lat: 35.76, period: '西周', reason: '卫康叔后裔' },
      { name: '河南灵宝', lng: 110.85, lat: 34.52, period: '汉代', reason: '弘农牧氏' },
      { name: '河北定州', lng: 115.01, lat: 38.51, period: '魏晋', reason: '中山牧氏' },
      { name: '山东济南', lng: 117.00, lat: 36.65, period: '唐代', reason: '迁居齐鲁' },
      { name: '浙江杭州', lng: 120.16, lat: 30.27, period: '宋代', reason: '南迁临安' },
    ],
    figures: [
      { name: '牧皮', dynasty: '春秋', achievement: '孔子弟子' },
      { name: '牧仲', dynasty: '春秋', achievement: '卫国大夫' },
      { name: '牧相', dynasty: '明', achievement: '南京兵部给事中' },
      { name: '牧大年', dynasty: '清', achievement: '画家，山水画家' },
    ],
    totem: '牧字从牛从攴，本义为放牧。图腾为周代司牧，象征职官后裔。',
    history: '牧姓源于姬姓，司牧之后。弘农牧氏为郡望，春秋牧皮为孔子弟子。',
  },
  {
    surname: '隗',

    pinyin: 'Kuí',

    rank: 226,

    populationRank: 250,

    population: 32,
    origin: '源于赤狄，商代鬼方之后。亦出自大禹之后隗氏，汤封其后于隗。',
    originPlace: { name: '湖北秭归', lng: 110.98, lat: 30.83 },
    originPeriod: '商代',
    junwang: [
      { name: '余杭郡', location: '浙江杭州', lng: 120.16, lat: 30.27, tanghao: '余杭堂' },
      { name: '京兆郡', location: '陕西西安', lng: 108.94, lat: 34.27, tanghao: '京兆堂' },
    ],
    migration: [
      { name: '湖北秭归', lng: 110.98, lat: 30.83, period: '商代', reason: '隗国故地' },
      { name: '陕西西安', lng: 108.94, lat: 34.27, period: '周代', reason: '京兆隗氏' },
      { name: '山西太原', lng: 112.55, lat: 37.87, period: '汉代', reason: '迁居并州' },
      { name: '河北沧州', lng: 116.84, lat: 38.31, period: '唐代', reason: '迁居河北' },
      { name: '浙江杭州', lng: 120.16, lat: 30.27, period: '宋代', reason: '南迁临安' },
    ],
    figures: [
      { name: '隗嚣', dynasty: '东汉', achievement: '西州上将军，割据陇右' },
      { name: '隗照', dynasty: '晋', achievement: '术士，易学名家' },
      { name: '隗仁', dynasty: '南燕', achievement: '忠臣，太守' },
      { name: '隗蒙', dynasty: '清', achievement: '学者，文学家' },
    ],
    totem: '隗字从阝从鬼，本义为高峻。图腾为鬼方后裔，象征赤狄后裔。',
    history: '隗姓源于赤狄，鬼方之后。余杭隗氏为郡望，东汉隗嚣为西州上将军。',
  },
  {
    surname: '山',

    pinyin: 'Shān',

    rank: 227,

    populationRank: 220,

    population: 42,
    origin: '源于官名，周代山师之后，以官为氏。亦出自烈山氏，炎帝之后。',
    originPlace: { name: '河南洛阳', lng: 112.45, lat: 34.62 },
    originPeriod: '西周',
    junwang: [
      { name: '河内郡', location: '河南沁阳', lng: 112.93, lat: 35.09, tanghao: '河内堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '西周', reason: '山师官署' },
      { name: '河南沁阳', lng: 112.93, lat: 35.09, period: '汉代', reason: '河内山氏' },
      { name: '山东济宁', lng: 116.59, lat: 35.41, period: '魏晋', reason: '迁居鲁西' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '南朝', reason: '南渡江左' },
      { name: '浙江绍兴', lng: 120.58, lat: 30.03, period: '宋代', reason: '迁居会稽' },
    ],
    figures: [
      { name: '山涛', dynasty: '西晋', achievement: '竹林七贤，吏部尚书' },
      { name: '山简', dynasty: '西晋', achievement: '征南将军' },
      { name: '山玄超', dynasty: '晋', achievement: '名士，隐士' },
      { name: '山行章', dynasty: '唐', achievement: '将领，节度使' },
    ],
    totem: '山字象形，本义为山峰。图腾为山师官职，象征周代职官后裔。',
    history: '山姓源于官名，山师之后。河内山氏为郡望，西晋山涛为竹林七贤之一。',
  },
  {
    surname: '谷',

    pinyin: 'Gǔ',

    rank: 228,

    populationRank: 118,

    population: 200,
    origin: '源于嬴姓，秦国谷地之后，以地为氏。亦出自颛顼之后谷父。亦出自复姓谷浑氏所改。',
    originPlace: { name: '甘肃天水', lng: 105.72, lat: 34.58 },
    originPeriod: '春秋',
    junwang: [
      { name: '上谷郡', location: '河北怀来', lng: 115.52, lat: 40.41, tanghao: '上谷堂' },
      { name: '济阴郡', location: '山东定陶', lng: 115.55, lat: 35.03, tanghao: '济阴堂' },
    ],
    migration: [
      { name: '甘肃天水', lng: 105.72, lat: 34.58, period: '春秋', reason: '秦国谷地' },
      { name: '河北怀来', lng: 115.52, lat: 40.41, period: '汉代', reason: '上谷谷氏' },
      { name: '山东定陶', lng: 115.55, lat: 35.03, period: '魏晋', reason: '济阴谷氏' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '唐代', reason: '仕宦中原' },
      { name: '江苏苏州', lng: 120.62, lat: 31.32, period: '宋代', reason: '南迁江南' },
    ],
    figures: [
      { name: '谷永', dynasty: '西汉', achievement: '光禄大夫，经学家' },
      { name: '谷浑', dynasty: '北魏', achievement: '尚书左仆射' },
      { name: '谷倚', dynasty: '唐', achievement: '文学家，魏州刺史' },
      { name: '谷那律', dynasty: '唐', achievement: '弘文馆学士，经学家' },
    ],
    totem: '谷字从禾从口，本义为山谷。图腾为秦谷地名，象征嬴姓后裔。',
    history: '谷姓源于嬴姓，秦国谷地之后。上谷谷氏为郡望，西汉谷永为经学家。',
  },
  {
    surname: '车',

    pinyin: 'Chē',

    rank: 229,

    populationRank: 196,

    population: 60,
    origin: '源于妫姓，黄帝臣车区之后。亦出自汉丞相田千秋以年老得乘小车，人称车丞相，后裔以车为氏。',
    originPlace: { name: '陕西西安', lng: 108.94, lat: 34.27 },
    originPeriod: '上古',
    junwang: [
      { name: '京兆郡', location: '陕西西安', lng: 108.94, lat: 34.27, tanghao: '京兆堂' },
      { name: '鲁郡', location: '山东曲阜', lng: 116.98, lat: 35.58, tanghao: '鲁郡堂' },
    ],
    migration: [
      { name: '陕西西安', lng: 108.94, lat: 34.27, period: '上古', reason: '车区后裔' },
      { name: '山东曲阜', lng: 116.98, lat: 35.58, period: '汉代', reason: '鲁郡车氏' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '魏晋', reason: '仕宦中原' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '南朝', reason: '南渡江左' },
      { name: '浙江绍兴', lng: 120.58, lat: 30.03, period: '宋代', reason: '迁居会稽' },
    ],
    figures: [
      { name: '车千秋', dynasty: '西汉', achievement: '丞相，富民侯' },
      { name: '车胤', dynasty: '东晋', achievement: '吏部尚书，囊萤苦读' },
      { name: '车似兰', dynasty: '晋', achievement: '女诗人' },
      { name: '车大任', dynasty: '明', achievement: '浙江参政，文学家' },
    ],
    totem: '车字象形，本义为车舆。图腾为汉丞相车千秋，象征妫姓后裔。',
    history: '车姓源于妫姓，车千秋之后。京兆车氏为郡望，东晋车胤为囊萤苦读名臣。',
  },
  {
    surname: '侯',

    pinyin: 'Hóu',

    rank: 230,

    populationRank: 82,

    population: 350,
    origin: '源于姬姓，春秋晋侯缗之后，以爵为氏。亦出自夏后氏之后侯国。',
    originPlace: { name: '山西翼城', lng: 111.70, lat: 35.64 },
    originPeriod: '春秋',
    junwang: [
      { name: '上谷郡', location: '河北怀来', lng: 115.52, lat: 40.41, tanghao: '上谷堂' },
      { name: '丹徒郡', location: '江苏镇江', lng: 119.45, lat: 32.20, tanghao: '丹徒堂' },
    ],
    migration: [
      { name: '山西翼城', lng: 111.70, lat: 35.64, period: '春秋', reason: '晋侯后裔' },
      { name: '河北怀来', lng: 115.52, lat: 40.41, period: '汉代', reason: '上谷侯氏' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '魏晋', reason: '仕宦中原' },
      { name: '江苏镇江', lng: 119.45, lat: 32.20, period: '南朝', reason: '南渡江左' },
      { name: '广东梅州', lng: 116.12, lat: 24.29, period: '明清', reason: '迁居岭南' },
    ],
    figures: [
      { name: '侯赢', dynasty: '战国', achievement: '魏国隐士，信陵君客' },
      { name: '侯景', dynasty: '南北朝', achievement: '汉帝，叛将' },
      { name: '侯方域', dynasty: '明末', achievement: '文学家，复社四公子' },
      { name: '侯镜如', dynasty: '近代', achievement: '革命家，起义将领' },
    ],
    totem: '侯字从人从厂从矢，本义为射侯。图腾为晋侯爵位，象征姬姓后裔。',
    history: '侯姓源于姬姓，晋侯之后。上谷侯氏为郡望，战国侯赢为信陵君客，明末侯方域为复社公子。',
  },
  {
    surname: '宓',

    pinyin: 'Fú',

    rank: 231,

    populationRank: 380,

    population: 10,
    origin: '源于太昊伏羲氏之后，伏通宓，以祖为氏。亦出自春秋鲁国宓子之后。',
    originPlace: { name: '山东曲阜', lng: 116.98, lat: 35.58 },
    originPeriod: '上古',
    junwang: [
      { name: '平昌郡', location: '山东安丘', lng: 119.20, lat: 36.42, tanghao: '平昌堂' },
      { name: '太原郡', location: '山西太原', lng: 112.55, lat: 37.87, tanghao: '太原堂' },
    ],
    migration: [
      { name: '山东曲阜', lng: 116.98, lat: 35.58, period: '上古', reason: '伏羲后裔' },
      { name: '山东安丘', lng: 119.20, lat: 36.42, period: '春秋', reason: '平昌宓氏' },
      { name: '山西太原', lng: 112.55, lat: 37.87, period: '汉代', reason: '太原宓氏' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '唐代', reason: '仕宦中原' },
      { name: '江苏苏州', lng: 120.62, lat: 31.32, period: '明清', reason: '南迁江南' },
    ],
    figures: [
      { name: '宓不齐', dynasty: '春秋', achievement: '孔子弟子，单父宰' },
      { name: '宓生', dynasty: '汉', achievement: '学者，经学家' },
      { name: '宓子贱', dynasty: '春秋', achievement: '孔子七十二贤' },
      { name: '宓妃', dynasty: '上古', achievement: '洛水女神' },
    ],
    totem: '宓字从宀从必，本义为安秘。图腾为伏羲后裔，象征太昊之后。',
    history: '宓姓源于太昊，伏羲之后。平昌宓氏为郡望，春秋宓不齐为孔子七十二贤。',
  },
  {
    surname: '蓬',

    pinyin: 'Péng',

    rank: 232,

    populationRank: 370,

    population: 11,
    origin: '源于姬姓，周成王封支子于蓬，后裔以地为氏。亦出自蓬莱地名。',
    originPlace: { name: '山东蓬莱', lng: 120.75, lat: 37.81 },
    originPeriod: '西周',
    junwang: [
      { name: '北海郡', location: '山东潍坊', lng: 119.16, lat: 36.71, tanghao: '北海堂' },
      { name: '长乐郡', location: '福建长乐', lng: 119.68, lat: 25.98, tanghao: '长乐堂' },
    ],
    migration: [
      { name: '山东蓬莱', lng: 120.75, lat: 37.81, period: '西周', reason: '蓬国封地' },
      { name: '山东潍坊', lng: 119.16, lat: 36.71, period: '汉代', reason: '北海蓬氏' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '魏晋', reason: '仕宦中原' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '南朝', reason: '南渡江左' },
      { name: '福建长乐', lng: 119.68, lat: 25.98, period: '唐代', reason: '入闽定居' },
    ],
    figures: [
      { name: '蓬球', dynasty: '汉', achievement: '隐士，入山遇仙' },
      { name: '蓬萌', dynasty: '汉', achievement: '名士，避乱辽东' },
      { name: '蓬元', dynasty: '北魏', achievement: '北海相' },
      { name: '蓬海', dynasty: '明', achievement: '举人，循吏' },
    ],
    totem: '蓬字从艹从逢，本义为草名。图腾为蓬莱仙草，象征姬姓后裔。',
    history: '蓬姓源于姬姓，周成王后裔。北海蓬氏为郡望，汉代蓬球为入山遇仙隐士。',
  },
  {
    surname: '全',

    pinyin: 'Quán',

    rank: 233,

    populationRank: 210,

    population: 45,
    origin: '源于姬姓，周代王族全师之后，以官为氏。亦出自地名，古有全邑。',
    originPlace: { name: '陕西西安', lng: 108.94, lat: 34.27 },
    originPeriod: '西周',
    junwang: [
      { name: '京兆郡', location: '陕西西安', lng: 108.94, lat: 34.27, tanghao: '京兆堂' },
      { name: '钱塘郡', location: '浙江杭州', lng: 120.16, lat: 30.27, tanghao: '钱塘堂' },
    ],
    migration: [
      { name: '陕西西安', lng: 108.94, lat: 34.27, period: '西周', reason: '全师官署' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '汉代', reason: '仕宦中原' },
      { name: '浙江杭州', lng: 120.16, lat: 30.27, period: '唐代', reason: '钱塘全氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南渡江左' },
      { name: '湖北武汉', lng: 114.31, lat: 30.59, period: '明清', reason: '迁居湖广' },
    ],
    figures: [
      { name: '全柔', dynasty: '三国吴', achievement: '桂阳太守' },
      { name: '全端', dynasty: '三国吴', achievement: '将领，乐安太守' },
      { name: '全谦孙', dynasty: '宋', achievement: '学者，文学家' },
      { name: '全祖望', dynasty: '清', achievement: '史学家，浙东学派代表' },
    ],
    totem: '全字从入从王，本义为完满。图腾为周代全师，象征职官后裔。',
    history: '全姓源于姬姓，全师之后。京兆全氏为郡望，清代全祖望为浙东学派史学家。',
  },
  {
    surname: '郗',

    pinyin: 'Chī',

    rank: 234,

    populationRank: 305,

    population: 20,
    origin: '源于姬姓，周武王时郗邑之后，以地为氏。亦出自春秋晋大夫郗犨之后。',
    originPlace: { name: '河南沁阳', lng: 112.93, lat: 35.09 },
    originPeriod: '西周',
    junwang: [
      { name: '山阳郡', location: '山东金乡', lng: 116.23, lat: 35.07, tanghao: '山阳堂' },
      { name: '高平郡', location: '山东巨野', lng: 116.06, lat: 35.39, tanghao: '高平堂' },
    ],
    migration: [
      { name: '河南沁阳', lng: 112.93, lat: 35.09, period: '西周', reason: '郗邑封地' },
      { name: '山东金乡', lng: 116.23, lat: 35.07, period: '汉代', reason: '山阳郗氏' },
      { name: '山东巨野', lng: 116.06, lat: 35.39, period: '魏晋', reason: '高平郗氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '南朝', reason: '南渡江左' },
      { name: '浙江绍兴', lng: 120.58, lat: 30.03, period: '宋代', reason: '迁居会稽' },
    ],
    figures: [
      { name: '郗鉴', dynasty: '东晋', achievement: '太尉，南昌县公' },
      { name: '郗愔', dynasty: '东晋', achievement: '徐兖二州刺史' },
      { name: '郗超', dynasty: '东晋', achievement: '中书侍郎，桓温谋主' },
      { name: '郗隆', dynasty: '西晋', achievement: '扬州刺史' },
    ],
    totem: '郗字从邑从希，本义为邑名。图腾为周代郗邑，象征姬姓后裔。',
    history: '郗姓源于姬姓，郗邑之后。高平郗氏为郡望，东晋郗鉴为太尉名臣。',
  },
  {
    surname: '班',

    pinyin: 'Bān',

    rank: 235,

    populationRank: 365,

    population: 12,
    origin: '源于芈姓，楚令尹子文之后，子文食邑于班，后裔以地为氏。亦出自鲁大夫班氏。',
    originPlace: { name: '湖北荆州', lng: 112.24, lat: 30.33 },
    originPeriod: '春秋',
    junwang: [
      { name: '黎阳郡', location: '河南浚县', lng: 114.55, lat: 35.67, tanghao: '黎阳堂' },
      { name: '扶风郡', location: '陕西兴平', lng: 108.49, lat: 34.30, tanghao: '扶风堂' },
    ],
    migration: [
      { name: '湖北荆州', lng: 112.24, lat: 30.33, period: '春秋', reason: '子文封邑' },
      { name: '陕西兴平', lng: 108.49, lat: 34.30, period: '汉代', reason: '扶风班氏' },
      { name: '河南浚县', lng: 114.55, lat: 35.67, period: '魏晋', reason: '黎阳班氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '南朝', reason: '南渡江左' },
      { name: '山西太原', lng: 112.55, lat: 37.87, period: '明清', reason: '迁居并州' },
    ],
    figures: [
      { name: '班彪', dynasty: '东汉', achievement: '史学家，文学家' },
      { name: '班固', dynasty: '东汉', achievement: '史学家，著《汉书》' },
      { name: '班超', dynasty: '东汉', achievement: '西域都护，定远侯' },
      { name: '班昭', dynasty: '东汉', achievement: '女史学家，著《女诫》' },
    ],
    totem: '班字从玉从刀，本义为分瑞玉。图腾为楚子文封邑，象征芈姓后裔。',
    history: '班姓源于芈姓，子文之后。扶风班氏为郡望，东汉班彪、班固、班超、班昭为史学世家。',
  },
  {
    surname: '仰',

    pinyin: 'Yǎng',

    rank: 236,

    populationRank: 355,

    population: 14,
    origin: '源于嬴姓，秦惠文王之后，以字为氏。亦出自舜帝之后仰延之后。',
    originPlace: { name: '陕西西安', lng: 108.94, lat: 34.27 },
    originPeriod: '春秋',
    junwang: [
      { name: '汝南郡', location: '河南汝南', lng: 114.36, lat: 33.00, tanghao: '汝南堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '陕西西安', lng: 108.94, lat: 34.27, period: '春秋', reason: '秦惠文王后裔' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '汉代', reason: '河南仰氏' },
      { name: '河南汝南', lng: 114.36, lat: 33.00, period: '魏晋', reason: '汝南仰氏' },
      { name: '浙江杭州', lng: 120.16, lat: 30.27, period: '宋代', reason: '南迁临安' },
      { name: '江苏苏州', lng: 120.62, lat: 31.32, period: '明清', reason: '迁居江南' },
    ],
    figures: [
      { name: '仰延', dynasty: '上古', achievement: '舜帝乐官' },
      { name: '仰忻', dynasty: '宋', achievement: '孝子，名士' },
      { name: '仰仁谦', dynasty: '明', achievement: '知县，循吏' },
      { name: '仰瞻', dynasty: '明', achievement: '大理寺丞，御史' },
    ],
    totem: '仰字从人从卬，本义为仰望。图腾为秦惠文王后裔，象征嬴姓之后。',
    history: '仰姓源于嬴姓，秦惠文王之后。汝南仰氏为郡望，上古仰延为舜帝乐官。',
  },
  {
    surname: '秋',

    pinyin: 'Qiū',

    rank: 237,

    populationRank: 235,

    population: 38,
    origin: '源于姬姓，鲁大夫仲叔秋之后，以字为氏。亦出自春秋陈国秋胡之后。',
    originPlace: { name: '山东曲阜', lng: 116.98, lat: 35.58 },
    originPeriod: '春秋',
    junwang: [
      { name: '天水郡', location: '甘肃天水', lng: 105.72, lat: 34.58, tanghao: '天水堂' },
      { name: '陇西郡', location: '甘肃临洮', lng: 103.86, lat: 35.37, tanghao: '陇西堂' },
    ],
    migration: [
      { name: '山东曲阜', lng: 116.98, lat: 35.58, period: '春秋', reason: '鲁国秋氏' },
      { name: '甘肃天水', lng: 105.72, lat: 34.58, period: '汉代', reason: '天水秋氏' },
      { name: '甘肃临洮', lng: 103.86, lat: 35.37, period: '魏晋', reason: '陇西秋氏' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '唐代', reason: '仕宦中原' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南渡江左' },
    ],
    figures: [
      { name: '秋胡', dynasty: '春秋', achievement: '鲁国大夫' },
      { name: '秋瑾', dynasty: '清末', achievement: '革命家，女权先锋' },
      { name: '秋嘉禾', dynasty: '清', achievement: '台湾知府' },
      { name: '秋桐', dynasty: '元', achievement: '画家' },
    ],
    totem: '秋字从禾从火，本义为禾谷成熟。图腾为鲁大夫秋氏，象征姬姓后裔。',
    history: '秋姓源于姬姓，仲叔秋之后。天水秋氏为郡望，清末秋瑾为革命女侠。',
  },
  {
    surname: '仲',

    pinyin: 'Zhòng',

    rank: 238,

    populationRank: 215,

    population: 45,
    origin: '源于姬姓，周宣王时仲山甫之后，以字为氏。亦出自春秋鲁国仲由之后。',
    originPlace: { name: '陕西西安', lng: 108.94, lat: 34.27 },
    originPeriod: '西周',
    junwang: [
      { name: '中山郡', location: '河北定州', lng: 115.01, lat: 38.51, tanghao: '中山堂' },
      { name: '乐安郡', location: '山东博兴', lng: 118.13, lat: 37.15, tanghao: '乐安堂' },
    ],
    migration: [
      { name: '陕西西安', lng: 108.94, lat: 34.27, period: '西周', reason: '仲山甫后裔' },
      { name: '山东曲阜', lng: 116.98, lat: 35.58, period: '春秋', reason: '鲁国仲氏' },
      { name: '河北定州', lng: 115.01, lat: 38.51, period: '汉代', reason: '中山仲氏' },
      { name: '山东博兴', lng: 118.13, lat: 37.15, period: '魏晋', reason: '乐安仲氏' },
      { name: '江苏苏州', lng: 120.62, lat: 31.32, period: '宋代', reason: '南迁江南' },
    ],
    figures: [
      { name: '仲由', dynasty: '春秋', achievement: '孔子弟子，政事科' },
      { name: '仲山甫', dynasty: '西周', achievement: '宣王中兴大臣' },
      { name: '仲长统', dynasty: '东汉', achievement: '思想家，著《昌言》' },
      { name: '仲永檀', dynasty: '清', achievement: '都察院副都御史' },
    ],
    totem: '仲字从人从中，本义为中行。图腾为仲山甫，象征姬姓后裔。',
    history: '仲姓源于姬姓，仲山甫之后。中山仲氏为郡望，春秋仲由为孔子弟子。',
  },
  {
    surname: '伊',

    pinyin: 'Yī',

    rank: 239,

    populationRank: 190,

    population: 65,
    origin: '源于妘姓，帝尧伊祁氏之后。亦出自商代伊尹之后，以名为氏。',
    originPlace: { name: '河南洛阳', lng: 112.45, lat: 34.62 },
    originPeriod: '上古',
    junwang: [
      { name: '陈留郡', location: '河南开封', lng: 114.31, lat: 34.80, tanghao: '陈留堂' },
      { name: '山阳郡', location: '山东金乡', lng: 116.23, lat: 35.07, tanghao: '山阳堂' },
    ],
    migration: [
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '上古', reason: '伊祁氏后裔' },
      { name: '河南开封', lng: 114.31, lat: 34.80, period: '商代', reason: '伊尹居地' },
      { name: '山东金乡', lng: 116.23, lat: 35.07, period: '汉代', reason: '山阳伊氏' },
      { name: '河北涿州', lng: 115.98, lat: 39.49, period: '唐代', reason: '迁居范阳' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南渡江左' },
    ],
    figures: [
      { name: '伊尹', dynasty: '商', achievement: '商汤宰相，名臣' },
      { name: '伊籍', dynasty: '三国蜀', achievement: '昭文将军' },
      { name: '伊慎', dynasty: '唐', achievement: '安黄等州节度使' },
      { name: '伊秉绶', dynasty: '清', achievement: '扬州知府，书法家' },
    ],
    totem: '伊字从人从尹，本义为治理。图腾为帝尧伊祁氏，象征妘姓后裔。',
    history: '伊姓源于妘姓，伊祁氏之后。陈留伊氏为郡望，商代伊尹为一代名相。',
  },
  {
    surname: '宫',

    pinyin: 'Gōng',

    rank: 240,

    populationRank: 205,

    population: 48,
    origin: '源于姬姓，周官宫人之后，以官为氏。亦出自春秋虞国宫之奇之后。',
    originPlace: { name: '山西平陆', lng: 111.22, lat: 34.84 },
    originPeriod: '西周',
    junwang: [
      { name: '河东郡', location: '山西夏县', lng: 111.22, lat: 35.14, tanghao: '河东堂' },
      { name: '太原郡', location: '山西太原', lng: 112.55, lat: 37.87, tanghao: '太原堂' },
    ],
    migration: [
      { name: '山西平陆', lng: 111.22, lat: 34.84, period: '西周', reason: '虞国宫之奇' },
      { name: '山西夏县', lng: 111.22, lat: 35.14, period: '汉代', reason: '河东宫氏' },
      { name: '山西太原', lng: 112.55, lat: 37.87, period: '魏晋', reason: '太原宫氏' },
      { name: '山东东阿', lng: 116.25, lat: 36.32, period: '唐代', reason: '迁居齐鲁' },
      { name: '江苏扬州', lng: 119.42, lat: 32.39, period: '明清', reason: '南迁江淮' },
    ],
    figures: [
      { name: '宫之奇', dynasty: '春秋', achievement: '虞国大夫，贤臣' },
      { name: '宫天挺', dynasty: '元', achievement: '杂剧作家' },
      { name: '宫伟镠', dynasty: '明', achievement: '翰林院检讨' },
      { name: '宫梦仁', dynasty: '清', achievement: '福建巡抚' },
    ],
    totem: '宫字从宀从吕，本义为屋室。图腾为周代宫人，象征职官后裔。',
    history: '宫姓源于姬姓，宫之奇之后。河东宫氏为郡望，春秋宫之奇为虞国贤臣。',
  },
  {
    surname: '宁',

    pinyin: 'Nìng',

    rank: 241,

    populationRank: 200,

    population: 60,
    origin: '源于姬姓，卫武公子季亹封于宁，后裔以地为氏。亦出自秦宁公之后。',
    originPlace: { name: '河南获嘉', lng: 113.64, lat: 35.27 },
    originPeriod: '春秋',
    junwang: [
      { name: '齐郡', location: '山东淄博', lng: 118.05, lat: 36.78, tanghao: '齐郡堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '河南获嘉', lng: 113.64, lat: 35.27, period: '春秋', reason: '季亹封邑' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '汉代', reason: '河南宁氏' },
      { name: '山东淄博', lng: 118.05, lat: 36.78, period: '魏晋', reason: '齐郡宁氏' },
      { name: '广西钦州', lng: 108.62, lat: 21.95, period: '唐代', reason: '迁居岭南' },
      { name: '广东广州', lng: 113.26, lat: 23.13, period: '明清', reason: '定居粤东' },
    ],
    figures: [
      { name: '宁俞', dynasty: '春秋', achievement: '卫国大夫，武子' },
      { name: '宁戚', dynasty: '春秋', achievement: '齐国大夫，桓公客' },
      { name: '宁逵', dynasty: '隋', achievement: '钦州刺史，岭南始祖' },
      { name: '宁完我', dynasty: '清', achievement: '内国史院大学士' },
    ],
    totem: '宁字从宀从丁从心，本义为安息。图腾为卫季亹封邑，象征姬姓后裔。',
    history: '宁姓源于姬姓，季亹之后。齐郡宁氏为郡望，春秋宁戚为齐桓公客卿。',
  },
  {
    surname: '仇',

    pinyin: 'Qiú',

    rank: 242,

    populationRank: 232,

    population: 40,
    origin: '源于姬姓，春秋宋湣公子仇之后，以名为氏。亦出自夏代诸侯九吾之后。',
    originPlace: { name: '河南商丘', lng: 115.65, lat: 33.38 },
    originPeriod: '春秋',
    junwang: [
      { name: '南阳郡', location: '河南南阳', lng: 112.53, lat: 33.00, tanghao: '南阳堂' },
      { name: '平阳郡', location: '山西临汾', lng: 111.52, lat: 36.08, tanghao: '平阳堂' },
    ],
    migration: [
      { name: '河南商丘', lng: 115.65, lat: 33.38, period: '春秋', reason: '宋湣公子仇' },
      { name: '河南南阳', lng: 112.53, lat: 33.00, period: '汉代', reason: '南阳仇氏' },
      { name: '山西临汾', lng: 111.52, lat: 36.08, period: '魏晋', reason: '平阳仇氏' },
      { name: '山东济南', lng: 117.00, lat: 36.65, period: '唐代', reason: '迁居齐鲁' },
      { name: '江苏扬州', lng: 119.42, lat: 32.39, period: '明清', reason: '南迁江淮' },
    ],
    figures: [
      { name: '仇牧', dynasty: '春秋', achievement: '宋国大夫，忠臣' },
      { name: '仇览', dynasty: '东汉', achievement: '蒲亭长，循吏' },
      { name: '仇博', dynasty: '宋', achievement: '学者，文学家' },
      { name: '仇远', dynasty: '元', achievement: '文学家，诗人' },
    ],
    totem: '仇字从人从九，本义为伴侣。图腾为宋湣公子仇，象征姬姓后裔。',
    history: '仇姓源于姬姓，宋湣公子仇之后。南阳仇氏为郡望，东汉仇览为循吏。',
  },
  {
    surname: '栾',

    pinyin: 'Luán',

    rank: 243,

    populationRank: 290,

    population: 25,
    origin: '源于姬姓，晋靖侯孙栾宾封于栾，后裔以地为氏。亦出自姜姓，齐惠公后裔栾氏。',
    originPlace: { name: '河北栾城', lng: 114.65, lat: 37.90 },
    originPeriod: '春秋',
    junwang: [
      { name: '西河郡', location: '山西汾阳', lng: 111.78, lat: 37.27, tanghao: '西河堂' },
      { name: '魏郡', location: '河北临漳', lng: 114.61, lat: 36.34, tanghao: '魏郡堂' },
    ],
    migration: [
      { name: '河北栾城', lng: 114.65, lat: 37.90, period: '春秋', reason: '栾宾封地' },
      { name: '山西汾阳', lng: 111.78, lat: 37.27, period: '汉代', reason: '西河栾氏' },
      { name: '河北临漳', lng: 114.61, lat: 36.34, period: '魏晋', reason: '魏郡栾氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '南朝', reason: '南渡江左' },
      { name: '山东掖县', lng: 119.93, lat: 37.18, period: '明清', reason: '迁居胶东' },
    ],
    figures: [
      { name: '栾宾', dynasty: '春秋', achievement: '晋国大夫' },
      { name: '栾书', dynasty: '春秋', achievement: '晋国中军将，执政' },
      { name: '栾布', dynasty: '西汉', achievement: '燕相，鄃侯' },
      { name: '栾巴', dynasty: '东汉', achievement: '桂阳太守，名臣' },
    ],
    totem: '栾字从木从䜌，本义为树名。图腾为栾宾封地，象征姬姓后裔。',
    history: '栾姓源于姬姓，栾宾之后。西河栾氏为郡望，春秋栾书为晋国执政。',
  },
  {
    surname: '暴',

    pinyin: 'Bào',

    rank: 244,

    populationRank: 400,

    population: 8,
    origin: '源于姬姓，周诸侯暴辛公之后，以国为氏。亦出自商代暴国之后。',
    originPlace: { name: '河南原阳', lng: 113.97, lat: 35.05 },
    originPeriod: '西周',
    junwang: [
      { name: '魏郡', location: '河北临漳', lng: 114.61, lat: 36.34, tanghao: '魏郡堂' },
      { name: '河东郡', location: '山西夏县', lng: 111.22, lat: 35.14, tanghao: '河东堂' },
    ],
    migration: [
      { name: '河南原阳', lng: 113.97, lat: 35.05, period: '西周', reason: '暴国封地' },
      { name: '河北临漳', lng: 114.61, lat: 36.34, period: '汉代', reason: '魏郡暴氏' },
      { name: '山西夏县', lng: 111.22, lat: 35.14, period: '魏晋', reason: '河东暴氏' },
      { name: '山东济南', lng: 117.00, lat: 36.65, period: '唐代', reason: '迁居齐鲁' },
      { name: '辽宁沈阳', lng: 123.43, lat: 41.80, period: '明清', reason: '出关定居' },
    ],
    figures: [
      { name: '暴公', dynasty: '西周', achievement: '暴国国君' },
      { name: '暴显', dynasty: '北齐', achievement: '骠骑大将军，定阳王' },
      { name: '暴昭', dynasty: '明', achievement: '刑部尚书，忠臣' },
      { name: '暴毅', dynasty: '明', achievement: '怀庆知府' },
    ],
    totem: '暴字从日从共从水，本义为日晒。图腾为暴辛公后裔，象征姬姓之后。',
    history: '暴姓源于姬姓，暴辛公之后。魏郡暴氏为郡望，明代暴昭为刑部尚书。',
  },
  {
    surname: '甘',

    pinyin: 'Gān',

    rank: 245,

    populationRank: 158,

    population: 110,
    origin: '源于姒姓，夏代诸侯甘国之后。亦出自周武王同族甘伯之后。亦出自殷商甘盘之后。',
    originPlace: { name: '陕西户县', lng: 108.61, lat: 34.11 },
    originPeriod: '夏代',
    junwang: [
      { name: '渤海郡', location: '河北沧州', lng: 116.84, lat: 38.31, tanghao: '渤海堂' },
      { name: '丹阳郡', location: '安徽当涂', lng: 118.49, lat: 31.55, tanghao: '丹阳堂' },
    ],
    migration: [
      { name: '陕西户县', lng: 108.61, lat: 34.11, period: '夏代', reason: '甘国封地' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '商代', reason: '甘盘居地' },
      { name: '河北沧州', lng: 116.84, lat: 38.31, period: '汉代', reason: '渤海甘氏' },
      { name: '安徽当涂', lng: 118.49, lat: 31.55, period: '唐代', reason: '丹阳甘氏' },
      { name: '广东梅州', lng: 116.12, lat: 24.29, period: '明清', reason: '迁居岭南' },
    ],
    figures: [
      { name: '甘盘', dynasty: '商', achievement: '商高宗武丁相' },
      { name: '甘茂', dynasty: '战国', achievement: '秦国左丞相' },
      { name: '甘罗', dynasty: '战国', achievement: '秦上卿，十二岁为使' },
      { name: '甘宁', dynasty: '三国吴', achievement: '折冲将军，名将' },
    ],
    totem: '甘字从口从一，本义为美味。图腾为夏代甘国，象征姒姓后裔。',
    history: '甘姓源于姒姓，甘国之后。渤海甘氏为郡望，商代甘盘为武丁相，三国甘宁为东吴名将。',
  },
  {
    surname: '钭',

    pinyin: 'Dǒu',

    rank: 246,

    populationRank: 470,

    population: 3,
    origin: '源于姜姓，齐康公之后。康公被迁于海上，居钭器为饮，后裔以器为氏。',
    originPlace: { name: '山东烟台', lng: 121.39, lat: 37.54 },
    originPeriod: '战国',
    junwang: [
      { name: '辽西郡', location: '辽宁义县', lng: 121.52, lat: 41.54, tanghao: '辽西堂' },
      { name: '齐郡', location: '山东淄博', lng: 118.05, lat: 36.78, tanghao: '齐郡堂' },
    ],
    migration: [
      { name: '山东烟台', lng: 121.39, lat: 37.54, period: '战国', reason: '齐康公迁地' },
      { name: '山东淄博', lng: 118.05, lat: 36.78, period: '汉代', reason: '齐郡钭氏' },
      { name: '辽宁义县', lng: 121.52, lat: 41.54, period: '魏晋', reason: '辽西钭氏' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '唐代', reason: '仕宦中原' },
      { name: '浙江杭州', lng: 120.16, lat: 30.27, period: '宋代', reason: '南迁临安' },
    ],
    figures: [
      { name: '钭滔', dynasty: '五代', achievement: '处州刺史' },
      { name: '钭文', dynasty: '明', achievement: '邛州知州' },
      { name: '钭挹青', dynasty: '清', achievement: '画家，山水画家' },
      { name: '钭彬', dynasty: '清', achievement: '学者，诗人' },
    ],
    totem: '钭字从金从斗，本义为斟器。图腾为齐康公钭器，象征姜姓后裔。',
    history: '钭姓源于姜姓，齐康公之后。辽西钭氏为郡望，五代钭滔为处州刺史。',
  },
  {
    surname: '厉',

    pinyin: 'Lì',

    rank: 247,

    populationRank: 285,

    population: 26,
    origin: '源于姜姓，齐厉公之后，以谥为氏。亦出自周厉王之后。亦出自复姓厉尹所改。',
    originPlace: { name: '山东淄博', lng: 118.05, lat: 36.78 },
    originPeriod: '春秋',
    junwang: [
      { name: '南阳郡', location: '河南南阳', lng: 112.53, lat: 33.00, tanghao: '南阳堂' },
      { name: '范阳郡', location: '河北涿州', lng: 115.98, lat: 39.49, tanghao: '范阳堂' },
    ],
    migration: [
      { name: '山东淄博', lng: 118.05, lat: 36.78, period: '春秋', reason: '齐厉公后裔' },
      { name: '河南南阳', lng: 112.53, lat: 33.00, period: '汉代', reason: '南阳厉氏' },
      { name: '河北涿州', lng: 115.98, lat: 39.49, period: '魏晋', reason: '范阳厉氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '南朝', reason: '南渡江左' },
      { name: '浙江东阳', lng: 120.23, lat: 29.20, period: '明清', reason: '迁居浙东' },
    ],
    figures: [
      { name: '厉温', dynasty: '东汉', achievement: '魏郡太守' },
      { name: '厉元', dynasty: '唐', achievement: '诗人' },
      { name: '厉鹗', dynasty: '清', achievement: '文学家，宋诗派代表' },
      { name: '厉志', dynasty: '清', achievement: '画家，诗人' },
    ],
    totem: '厉字从厂从万，本义为旱石。图腾为齐厉公谥号，象征姜姓后裔。',
    history: '厉姓源于姜姓，齐厉公之后。南阳厉氏为郡望，清代厉鹗为文学家。',
  },
  {
    surname: '戎',

    pinyin: 'Róng',

    rank: 248,

    populationRank: 320,

    population: 20,
    origin: '源于姜姓，周代戎国之后，以国为氏。亦出自春秋鲁国戎氏。亦出自周大夫戎夫。',
    originPlace: { name: '山东菏泽', lng: 115.48, lat: 35.24 },
    originPeriod: '西周',
    junwang: [
      { name: '江陵郡', location: '湖北江陵', lng: 112.41, lat: 30.05, tanghao: '江陵堂' },
      { name: '扶风郡', location: '陕西兴平', lng: 108.49, lat: 34.30, tanghao: '扶风堂' },
    ],
    migration: [
      { name: '山东菏泽', lng: 115.48, lat: 35.24, period: '西周', reason: '戎国封地' },
      { name: '陕西兴平', lng: 108.49, lat: 34.30, period: '汉代', reason: '扶风戎氏' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '魏晋', reason: '仕宦中原' },
      { name: '湖北江陵', lng: 112.41, lat: 30.05, period: '唐代', reason: '江陵戎氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南渡江左' },
    ],
    figures: [
      { name: '戎律', dynasty: '春秋', achievement: '鲁国大夫' },
      { name: '戎赐', dynasty: '西汉', achievement: '东海侯，将军' },
      { name: '戎宪', dynasty: '明', achievement: '枣阳知县，循吏' },
      { name: '戎洵', dynasty: '清', achievement: '画家，诗人' },
    ],
    totem: '戎字从戈从甲，本义为兵器。图腾为周代戎国，象征姜姓后裔。',
    history: '戎姓源于姜姓，戎国之后。江陵戎氏为郡望，西汉戎赐为东海侯。',
  },
  {
    surname: '祖',

    pinyin: 'Zǔ',

    rank: 249,

    populationRank: 176,

    population: 80,
    origin: '源于子姓，商代祖甲、祖乙之后，以字为氏。亦出自周代祖史之官，以官为氏。',
    originPlace: { name: '河南商丘', lng: 115.65, lat: 33.38 },
    originPeriod: '商代',
    junwang: [
      { name: '范阳郡', location: '河北涿州', lng: 115.98, lat: 39.49, tanghao: '范阳堂' },
      { name: '京兆郡', location: '陕西西安', lng: 108.94, lat: 34.27, tanghao: '京兆堂' },
    ],
    migration: [
      { name: '河南商丘', lng: 115.65, lat: 33.38, period: '商代', reason: '祖甲后裔' },
      { name: '陕西西安', lng: 108.94, lat: 34.27, period: '周代', reason: '京兆祖氏' },
      { name: '河北涿州', lng: 115.98, lat: 39.49, period: '汉代', reason: '范阳祖氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '南朝', reason: '南渡江左' },
      { name: '安徽巢湖', lng: 117.87, lat: 31.60, period: '明清', reason: '迁居江淮' },
    ],
    figures: [
      { name: '祖冲之', dynasty: '南北朝', achievement: '数学家，天文学家' },
      { name: '祖暅之', dynasty: '南北朝', achievement: '数学家，祖冲之子' },
      { name: '祖逖', dynasty: '东晋', achievement: '豫州刺史，闻鸡起舞' },
      { name: '祖孝孙', dynasty: '唐', achievement: '音乐家，定雅乐' },
    ],
    totem: '祖字从示从且，本义为祖庙。图腾为商王祖甲，象征子姓后裔。',
    history: '祖姓源于子姓，商王之后。范阳祖氏为郡望，南北朝祖冲之为数学大家。',
  },
  {
    surname: '武',

    pinyin: 'Wǔ',

    rank: 250,

    populationRank: 95,

    population: 270,
    origin: '源于姬姓，周平王少子武之后，以字为氏。亦出自夏臣武罗之后。亦出自汉代武强王之后。',
    originPlace: { name: '河南洛阳', lng: 112.45, lat: 34.62 },
    originPeriod: '东周',
    junwang: [
      { name: '太原郡', location: '山西太原', lng: 112.55, lat: 37.87, tanghao: '太原堂' },
      { name: '沛郡', location: '安徽濉溪', lng: 116.76, lat: 33.92, tanghao: '沛郡堂' },
    ],
    migration: [
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '东周', reason: '周平王子后' },
      { name: '山西太原', lng: 112.55, lat: 37.87, period: '汉代', reason: '太原武氏' },
      { name: '安徽濉溪', lng: 116.76, lat: 33.92, period: '魏晋', reason: '沛郡武氏' },
      { name: '山西文水', lng: 112.03, lat: 37.54, period: '唐代', reason: '武则天本支' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南渡江左' },
    ],
    figures: [
      { name: '武则天', dynasty: '唐', achievement: '女皇，武周皇帝' },
      { name: '武士彟', dynasty: '唐', achievement: '工部尚书，应国公' },
      { name: '武承嗣', dynasty: '唐', achievement: '宰相，魏王' },
      { name: '武禹襄', dynasty: '清', achievement: '武式太极拳创始人' },
    ],
    totem: '武字从止从戈，本义为征伐。图腾为周平王子武，象征姬姓后裔。',
    history: '武姓源于姬姓，周平王子之后。太原武氏为郡望，唐代武则天为一代女皇。',
  },
  {
    surname: '符',

    pinyin: 'Fú',

    rank: 251,

    populationRank: 180,

    population: 80,
    origin: '源于姬姓，鲁顷公孙公雅为秦符玺令，后裔以官为氏。亦出自姬姓，周代符人之后。',
    originPlace: { name: '山东曲阜', lng: 116.98, lat: 35.58 },
    originPeriod: '战国',
    junwang: [
      { name: '琅琊郡', location: '山东临沂', lng: 118.35, lat: 35.05, tanghao: '琅琊堂' },
      { name: '余杭郡', location: '浙江杭州', lng: 120.16, lat: 30.27, tanghao: '余杭堂' },
    ],
    migration: [
      { name: '山东曲阜', lng: 116.98, lat: 35.58, period: '战国', reason: '公雅任符玺令' },
      { name: '山东临沂', lng: 118.35, lat: 35.05, period: '汉代', reason: '琅琊符氏' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '魏晋', reason: '仕宦中原' },
      { name: '浙江杭州', lng: 120.16, lat: 30.27, period: '宋代', reason: '南迁临安' },
      { name: '海南文昌', lng: 110.75, lat: 19.61, period: '明清', reason: '迁居琼州' },
    ],
    figures: [
      { name: '符融', dynasty: '东汉', achievement: '名士，学者' },
      { name: '符存审', dynasty: '五代', achievement: '后唐将领，义直郡王' },
      { name: '符彦卿', dynasty: '五代宋', achievement: '魏王，名将' },
      { name: '符确', dynasty: '宋', achievement: '海南进士第一人' },
    ],
    totem: '符字从竹从付，本义为信符。图腾为秦符玺令，象征姬姓后裔。',
    history: '符姓源于姬姓，鲁公雅之后。琅琊符氏为郡望，五代符彦卿为魏王名将。',
  },
  {
    surname: '刘',

    pinyin: 'Liú',

    rank: 252,

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
    surname: '景',

    pinyin: 'Jǐng',

    rank: 253,

    populationRank: 142,

    population: 140,
    origin: '源于芈姓，楚公族景氏之后。亦出自姜姓，齐景公后裔以谥为氏。亦出自战国景舍、景鲤之后。',
    originPlace: { name: '湖北荆州', lng: 112.24, lat: 30.33 },
    originPeriod: '战国',
    junwang: [
      { name: '晋阳郡', location: '山西太原', lng: 112.55, lat: 37.87, tanghao: '晋阳堂' },
      { name: '丹阳郡', location: '安徽当涂', lng: 118.49, lat: 31.55, tanghao: '丹阳堂' },
    ],
    migration: [
      { name: '湖北荆州', lng: 112.24, lat: 30.33, period: '战国', reason: '楚国景氏' },
      { name: '山西太原', lng: 112.55, lat: 37.87, period: '汉代', reason: '晋阳景氏' },
      { name: '陕西西安', lng: 108.94, lat: 34.27, period: '魏晋', reason: '仕宦关中' },
      { name: '安徽当涂', lng: 118.49, lat: 31.55, period: '唐代', reason: '丹阳景氏' },
      { name: '山西洪洞', lng: 111.72, lat: 36.25, period: '明清', reason: '迁居晋南' },
    ],
    figures: [
      { name: '景差', dynasty: '战国', achievement: '楚国辞赋家' },
      { name: '景丹', dynasty: '东汉', achievement: '骠骑大将军，栎阳侯' },
      { name: '景延广', dynasty: '五代', achievement: '后晋侍卫亲军马步军都指挥使' },
      { name: '景廷宾', dynasty: '清末', achievement: '义和团首领，起义领袖' },
    ],
    totem: '景字从日从京，本义为日光。图腾为楚景氏，象征芈姓后裔。',
    history: '景姓源于芈姓，楚公族之后。晋阳景氏为郡望，东汉景丹为云台二十八将。',
  },
  {
    surname: '詹',

    pinyin: 'Zhān',

    rank: 254,

    populationRank: 175,

    population: 80,
    origin: '源于姬姓，周宣王封支子于詹，后裔以国为氏。亦出自楚詹尹之后，以官为氏。',
    originPlace: { name: '陕西西安', lng: 108.94, lat: 34.27 },
    originPeriod: '西周',
    junwang: [
      { name: '河间郡', location: '河北河间', lng: 116.10, lat: 38.45, tanghao: '河间堂' },
      { name: '渤海郡', location: '河北沧州', lng: 116.84, lat: 38.31, tanghao: '渤海堂' },
    ],
    migration: [
      { name: '陕西西安', lng: 108.94, lat: 34.27, period: '西周', reason: '詹侯封地' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '东周', reason: '河南詹氏' },
      { name: '河北河间', lng: 116.10, lat: 38.45, period: '汉代', reason: '河间詹氏' },
      { name: '福建崇安', lng: 118.03, lat: 27.76, period: '唐代', reason: '入闽定居' },
      { name: '广东潮州', lng: 116.63, lat: 23.68, period: '明清', reason: '迁居岭南' },
    ],
    figures: [
      { name: '詹体仁', dynasty: '南宋', achievement: '司农卿，名臣' },
      { name: '詹邈', dynasty: '宋', achievement: '状元，翰林学士' },
      { name: '詹同', dynasty: '明', achievement: '吏部尚书，学者' },
      { name: '詹天佑', dynasty: '近代', achievement: '铁路工程师，中国铁路之父' },
    ],
    totem: '詹字从言从八从厃，本义为多言。图腾为周詹侯，象征姬姓后裔。',
    history: '詹姓源于姬姓，詹侯之后。河间詹氏为郡望，近代詹天佑为中国铁路之父。',
  },
  {
    surname: '束',

    pinyin: 'Shù',

    rank: 255,

    populationRank: 300,

    population: 22,
    origin: '源于妫姓，战国齐康公之后，改疏为束。亦出自汉代疏广之后，改姓束。',
    originPlace: { name: '山东淄博', lng: 118.05, lat: 36.78 },
    originPeriod: '战国',
    junwang: [
      { name: '南阳郡', location: '河南南阳', lng: 112.53, lat: 33.00, tanghao: '南阳堂' },
      { name: '淮阳郡', location: '河南淮阳', lng: 114.89, lat: 33.73, tanghao: '淮阳堂' },
    ],
    migration: [
      { name: '山东淄博', lng: 118.05, lat: 36.78, period: '战国', reason: '齐康公后裔' },
      { name: '河南南阳', lng: 112.53, lat: 33.00, period: '汉代', reason: '南阳束氏' },
      { name: '江苏丹阳', lng: 119.57, lat: 32.00, period: '南朝', reason: '南渡江左' },
      { name: '安徽合肥', lng: 117.23, lat: 31.82, period: '唐代', reason: '迁居江淮' },
      { name: '江苏苏州', lng: 120.62, lat: 31.32, period: '明清', reason: '迁居江南' },
    ],
    figures: [
      { name: '束广', dynasty: '汉', achievement: '疏广之后，改束姓' },
      { name: '束皙', dynasty: '西晋', achievement: '文学家，学者' },
      { name: '束长孺', dynasty: '宋', achievement: '画家' },
      { name: '束宗庚', dynasty: '元', achievement: '画家，山水画家' },
    ],
    totem: '束字从木从口，本义为捆缚。图腾为齐康公后裔改姓，象征妫姓之后。',
    history: '束姓源于妫姓，疏广之后改姓。南阳束氏为郡望，西晋束皙为文学家。',
  },
  {
    surname: '龙',

    pinyin: 'Lóng',

    rank: 256,

    populationRank: 85,

    population: 320,
    origin: '源于妫姓，舜臣龙之后。亦出自御龙氏刘累之后。亦出自复姓龙丘氏所改。',
    originPlace: { name: '河南洛阳', lng: 112.45, lat: 34.62 },
    originPeriod: '上古',
    junwang: [
      { name: '武陵郡', location: '湖南常德', lng: 111.69, lat: 29.04, tanghao: '武陵堂' },
      { name: '天水郡', location: '甘肃天水', lng: 105.72, lat: 34.58, tanghao: '天水堂' },
    ],
    migration: [
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '上古', reason: '舜臣龙后裔' },
      { name: '甘肃天水', lng: 105.72, lat: 34.58, period: '汉代', reason: '天水龙氏' },
      { name: '湖南常德', lng: 111.69, lat: 29.04, period: '魏晋', reason: '武陵龙氏' },
      { name: '四川成都', lng: 104.07, lat: 30.67, period: '唐代', reason: '仕宦入蜀' },
      { name: '广东广州', lng: 113.26, lat: 23.13, period: '明清', reason: '迁居岭南' },
    ],
    figures: [
      { name: '龙且', dynasty: '楚汉', achievement: '楚军大将' },
      { name: '龙敏', dynasty: '五代', achievement: '吏部侍郎' },
      { name: '龙燮', dynasty: '清', achievement: '戏曲家，文学家' },
      { name: '龙云', dynasty: '近代', achievement: '云南省主席，滇军首领' },
    ],
    totem: '龙字象形，本义为神龙。图腾为舜臣龙，象征妫姓后裔。',
    history: '龙姓源于妫姓，舜臣龙之后。武陵龙氏为郡望，近代龙云为云南军阀。',
  },
  {
    surname: '叶',

    pinyin: 'Yè',

    rank: 257,

    populationRank: 42,

    population: 650,
    origin: '源于芈姓，春秋楚国沈尹戌之子沈诸梁，字子高，食采于叶，后裔以地为氏。',
    originPlace: { name: '河南叶县', lng: 113.36, lat: 33.62 },
    originPeriod: '春秋',
    junwang: [
      { name: '南阳郡', location: '河南南阳', lng: 112.53, lat: 33.00, tanghao: '南阳堂' },
      { name: '下邳郡', location: '江苏邳州', lng: 117.96, lat: 34.33, tanghao: '下邳堂' },
    ],
    migration: [
      { name: '河南叶县', lng: 113.36, lat: 33.62, period: '春秋', reason: '叶公封地' },
      { name: '河南南阳', lng: 112.53, lat: 33.00, period: '汉代', reason: '南阳叶氏' },
      { name: '江苏邳州', lng: 117.96, lat: 34.33, period: '魏晋', reason: '下邳叶氏' },
      { name: '福建泉州', lng: 118.67, lat: 24.88, period: '唐代', reason: '入闽定居' },
      { name: '广东梅州', lng: 116.12, lat: 24.29, period: '明清', reason: '迁居岭南' },
    ],
    figures: [
      { name: '叶公', dynasty: '春秋', achievement: '楚国令尹，沈诸梁' },
      { name: '叶适', dynasty: '南宋', achievement: '哲学家，永嘉学派代表' },
      { name: '叶梦得', dynasty: '南宋', achievement: '词人，文学家' },
      { name: '叶剑英', dynasty: '近代', achievement: '元帅，国家领导人' },
    ],
    totem: '叶字从艹从枼，本义为树叶。图腾为叶公封地，象征芈姓后裔。',
    history: '叶姓源于芈姓，叶公之后。南阳叶氏为郡望，南宋叶适为永嘉学派宗师。',
  },
  {
    surname: '幸',

    pinyin: 'Xìng',

    rank: 258,

    populationRank: 390,

    population: 9,
    origin: '源于姬姓，周大夫幸氏之后。亦出自古代幸臣之后，以宠为氏。',
    originPlace: { name: '陕西西安', lng: 108.94, lat: 34.27 },
    originPeriod: '西周',
    junwang: [
      { name: '雁门郡', location: '山西代县', lng: 112.96, lat: 39.07, tanghao: '雁门堂' },
      { name: '豫章郡', location: '江西南昌', lng: 115.89, lat: 28.68, tanghao: '豫章堂' },
    ],
    migration: [
      { name: '陕西西安', lng: 108.94, lat: 34.27, period: '西周', reason: '周大夫幸氏' },
      { name: '山西代县', lng: 112.96, lat: 39.07, period: '汉代', reason: '雁门幸氏' },
      { name: '江西南昌', lng: 115.89, lat: 28.68, period: '唐代', reason: '豫章幸氏' },
      { name: '福建宁化', lng: 116.65, lat: 26.26, period: '宋代', reason: '入闽客家' },
      { name: '广东梅州', lng: 116.12, lat: 24.29, period: '明清', reason: '迁居岭南' },
    ],
    figures: [
      { name: '幸灵', dynasty: '晋', achievement: '术士，道士' },
      { name: '幸南容', dynasty: '唐', achievement: '国子祭酒' },
      { name: '幸元龙', dynasty: '宋', achievement: '进士，文学家' },
      { name: '幸夤逊', dynasty: '五代', achievement: '翰林学士' },
    ],
    totem: '幸字从屰从夭，本义为吉运。图腾为周大夫幸氏，象征职官后裔。',
    history: '幸姓源于姬姓，周大夫之后。雁门幸氏为郡望，唐代幸南容为国子祭酒。',
  },
  {
    surname: '司',

    pinyin: 'Sī',

    rank: 259,

    populationRank: 170,

    population: 95,
    origin: '源于官名，上古司历、司徒、司马之后，以官为氏。亦出自复姓司马、司徒所改。',
    originPlace: { name: '河南商丘', lng: 115.65, lat: 33.38 },
    originPeriod: '上古',
    junwang: [
      { name: '顿丘郡', location: '河南清丰', lng: 115.10, lat: 35.89, tanghao: '顿丘堂' },
      { name: '淮右郡', location: '安徽合肥', lng: 117.23, lat: 31.82, tanghao: '淮右堂' },
    ],
    migration: [
      { name: '河南商丘', lng: 115.65, lat: 33.38, period: '上古', reason: '司官后裔' },
      { name: '河南清丰', lng: 115.10, lat: 35.89, period: '汉代', reason: '顿丘司氏' },
      { name: '陕西西安', lng: 108.94, lat: 34.27, period: '魏晋', reason: '仕宦关中' },
      { name: '安徽合肥', lng: 117.23, lat: 31.82, period: '唐代', reason: '淮右司氏' },
      { name: '江苏苏州', lng: 120.62, lat: 31.32, period: '明清', reason: '南迁江南' },
    ],
    figures: [
      { name: '司超', dynasty: '宋', achievement: '将领，舒州团练使' },
      { name: '司良辅', dynasty: '元', achievement: '翰林待制' },
      { name: '司五九', dynasty: '明', achievement: '御史，名臣' },
      { name: '司九经', dynasty: '清', achievement: '宣化总兵' },
    ],
    totem: '司字从反人，本义为掌管。图腾为上古司官，象征职官后裔。',
    history: '司姓源于官名，司历、司马之后。顿丘司氏为郡望，宋代司超为名将。',
  },
  {
    surname: '韶',

    pinyin: 'Sháo',

    rank: 260,

    populationRank: 450,

    population: 4,
    origin: '源于姬姓，周代韶国之后。亦出自舜乐韶箾之后，以乐为氏。',
    originPlace: { name: '河南洛阳', lng: 112.45, lat: 34.62 },
    originPeriod: '西周',
    junwang: [
      { name: '太原郡', location: '山西太原', lng: 112.55, lat: 37.87, tanghao: '太原堂' },
      { name: '沛郡', location: '安徽濉溪', lng: 116.76, lat: 33.92, tanghao: '沛郡堂' },
    ],
    migration: [
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '西周', reason: '韶国封地' },
      { name: '山西太原', lng: 112.55, lat: 37.87, period: '汉代', reason: '太原韶氏' },
      { name: '安徽濉溪', lng: 116.76, lat: 33.92, period: '魏晋', reason: '沛郡韶氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '南朝', reason: '南渡江左' },
      { name: '浙江绍兴', lng: 120.58, lat: 30.03, period: '明清', reason: '迁居会稽' },
    ],
    figures: [
      { name: '韶石', dynasty: '上古', achievement: '舜乐韶箾，孔子闻之三月不知肉味' },
      { name: '韶护', dynasty: '明', achievement: '兵部尚书' },
      { name: '韶暹', dynasty: '明', achievement: '按察佥事' },
      { name: '韶舞', dynasty: '明', achievement: '御史，名臣' },
    ],
    totem: '韶字从音从召，本义为舜乐。图腾为舜乐韶箾，象征上古乐官后裔。',
    history: '韶姓源于姬姓，韶国之后。太原韶氏为郡望，上古韶石为舜乐之名。',
  },
  {
    surname: '郜',

    pinyin: 'Gào',

    rank: 261,

    populationRank: 360,

    population: 12,
    origin: '源于姬姓，周文王第十一子郜叔封于郜，后裔以国为氏。',
    originPlace: { name: '山东成武', lng: 115.89, lat: 35.19 },
    originPeriod: '西周',
    junwang: [
      { name: '京兆郡', location: '陕西西安', lng: 108.94, lat: 34.27, tanghao: '京兆堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '山东成武', lng: 115.89, lat: 35.19, period: '西周', reason: '郜叔封国' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '汉代', reason: '河南郜氏' },
      { name: '陕西西安', lng: 108.94, lat: 34.27, period: '魏晋', reason: '京兆郜氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '南朝', reason: '南渡江左' },
      { name: '安徽亳州', lng: 115.78, lat: 33.85, period: '明清', reason: '迁居皖北' },
    ],
    figures: [
      { name: '郜鼎', dynasty: '春秋', achievement: '郜国所铸大鼎，文物' },
      { name: '郜知行', dynasty: '元', achievement: '学者，名士' },
      { name: '郜琏', dynasty: '清', achievement: '画家，山水画家' },
      { name: '郜煜', dynasty: '清', achievement: '进士，文学家' },
    ],
    totem: '郜字从邑从告，本义为邑名。图腾为郜叔封国，象征姬姓后裔。',
    history: '郜姓源于姬姓，郜叔之后。京兆郜氏为郡望，西周郜国为文王子封国。',
  },
  {
    surname: '黎',

    pinyin: 'Lí',

    rank: 262,

    populationRank: 92,

    population: 280,
    origin: '源于高阳氏，颛顼裔孙黎之后。亦出自周代黎国，后裔以国为氏。',
    originPlace: { name: '山西黎城', lng: 113.06, lat: 36.56 },
    originPeriod: '商代',
    junwang: [
      { name: '京兆郡', location: '陕西西安', lng: 108.94, lat: 34.27, tanghao: '京兆堂' },
      { name: '宋郡', location: '河南商丘', lng: 115.65, lat: 33.38, tanghao: '宋郡堂' },
    ],
    migration: [
      { name: '山西黎城', lng: 113.06, lat: 36.56, period: '商代', reason: '黎国故地' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '周代', reason: '京兆黎氏' },
      { name: '河南商丘', lng: 115.65, lat: 33.38, period: '汉代', reason: '宋郡黎氏' },
      { name: '广东梅州', lng: 116.12, lat: 24.29, period: '唐代', reason: '入闽粤客家' },
      { name: '江西宁都', lng: 116.01, lat: 26.47, period: '明清', reason: '迁居江右' },
    ],
    figures: [
      { name: '黎镦', dynasty: '春秋', achievement: '齐国大夫' },
      { name: '黎淳', dynasty: '明', achievement: '状元，礼部尚书' },
      { name: '黎简', dynasty: '清', achievement: '画家，诗人' },
      { name: '黎元洪', dynasty: '近代', achievement: '中华民国大总统' },
    ],
    totem: '黎字从黍从人，本义为黍民。图腾为黎国百姓，象征高阳氏后裔。',
    history: '黎姓源于高阳氏，黎国之后。京兆黎氏为郡望，近代黎元洪为民国大总统。',
  },
  {
    surname: '蓟',

    pinyin: 'Jì',

    rank: 263,

    populationRank: 460,

    population: 3,
    origin: '源于妫姓，周武王封黄帝后裔于蓟，后裔以地为氏。亦出自春秋蓟国之后。',
    originPlace: { name: '北京', lng: 116.41, lat: 39.90 },
    originPeriod: '西周',
    junwang: [
      { name: '内黄郡', location: '河南内黄', lng: 114.90, lat: 35.97, tanghao: '内黄堂' },
      { name: '渔阳郡', location: '北京密云', lng: 116.84, lat: 40.36, tanghao: '渔阳堂' },
    ],
    migration: [
      { name: '北京', lng: 116.41, lat: 39.90, period: '西周', reason: '蓟国封地' },
      { name: '北京密云', lng: 116.84, lat: 40.36, period: '汉代', reason: '渔阳蓟氏' },
      { name: '河南内黄', lng: 114.90, lat: 35.97, period: '魏晋', reason: '内黄蓟氏' },
      { name: '陕西西安', lng: 108.94, lat: 34.27, period: '唐代', reason: '仕宦关中' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南渡江左' },
    ],
    figures: [
      { name: '蓟子训', dynasty: '东汉', achievement: '术士，隐士' },
      { name: '蓟谦', dynasty: '明', achievement: '御史，名臣' },
      { name: '蓟逊', dynasty: '元', achievement: '学者，文学家' },
      { name: '蓟宗周', dynasty: '明', achievement: '处士，孝子' },
    ],
    totem: '蓟字从艹从魝，本义为草名。图腾为蓟国草莽，象征黄帝后裔。',
    history: '蓟姓源于妫姓，蓟国之后。内黄蓟氏为郡望，东汉蓟子训为术士隐士。',
  },
  {
    surname: '薄',

    pinyin: 'Bó',

    rank: 264,

    populationRank: 158,

    population: 110,
    origin: '源于姜姓，春秋薄姑氏之后。亦出自周代薄国，后裔以国为氏。亦出自春秋宋大夫薄氏。',
    originPlace: { name: '山东博兴', lng: 118.13, lat: 37.15 },
    originPeriod: '商代',
    junwang: [
      { name: '雁门郡', location: '山西代县', lng: 112.96, lat: 39.07, tanghao: '雁门堂' },
      { name: '谯郡', location: '安徽亳州', lng: 115.78, lat: 33.85, tanghao: '谯郡堂' },
    ],
    migration: [
      { name: '山东博兴', lng: 118.13, lat: 37.15, period: '商代', reason: '薄姑国故地' },
      { name: '山西代县', lng: 112.96, lat: 39.07, period: '汉代', reason: '雁门薄氏' },
      { name: '河南商丘', lng: 115.65, lat: 33.38, period: '魏晋', reason: '宋国薄氏' },
      { name: '安徽亳州', lng: 115.78, lat: 33.85, period: '唐代', reason: '谯郡薄氏' },
      { name: '江苏苏州', lng: 120.62, lat: 31.32, period: '明清', reason: '南迁江南' },
    ],
    figures: [
      { name: '薄昭', dynasty: '西汉', achievement: '轵侯，文帝舅' },
      { name: '薄太后', dynasty: '西汉', achievement: '汉文帝生母，皇太后' },
      { name: '薄绍之', dynasty: '南朝宋', achievement: '书法家' },
      { name: '薄一波', dynasty: '近代', achievement: '革命家，副总理' },
    ],
    totem: '薄字从艹从溥，本义为草丛。图腾为薄姑国草丛，象征姜姓后裔。',
    history: '薄姓源于姜姓，薄姑氏之后。雁门薄氏为郡望，西汉薄太后为文帝生母。',
  },
  {
    surname: '印',

    pinyin: 'Yìn',

    rank: 265,

    populationRank: 340,

    population: 16,
    origin: '源于姬姓，郑穆公子子印之后，以字为氏。亦出自周官印令之后，以官为氏。',
    originPlace: { name: '河南新郑', lng: 113.74, lat: 34.40 },
    originPeriod: '春秋',
    junwang: [
      { name: '冯翊郡', location: '陕西大荔', lng: 109.80, lat: 34.80, tanghao: '冯翊堂' },
      { name: '广汉郡', location: '四川广汉', lng: 104.25, lat: 30.99, tanghao: '广汉堂' },
    ],
    migration: [
      { name: '河南新郑', lng: 113.74, lat: 34.40, period: '春秋', reason: '子印后裔' },
      { name: '陕西大荔', lng: 109.80, lat: 34.80, period: '汉代', reason: '冯翊印氏' },
      { name: '四川广汉', lng: 104.25, lat: 30.99, period: '魏晋', reason: '广汉印氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '南朝', reason: '南渡江左' },
      { name: '浙江杭州', lng: 120.16, lat: 30.27, period: '宋代', reason: '迁居临安' },
    ],
    figures: [
      { name: '印段', dynasty: '春秋', achievement: '郑国大夫，子印' },
      { name: '印宝', dynasty: '明', achievement: '同知，循吏' },
      { name: '印应雷', dynasty: '宋', achievement: '常州通判，循吏' },
      { name: '印光任', dynasty: '清', achievement: '澳门同知' },
    ],
    totem: '印字从卩从手，本义为按压。图腾为郑子印，象征姬姓后裔。',
    history: '印姓源于姬姓，子印之后。冯翊印氏为郡望，春秋印段为郑国大夫。',
  },
  {
    surname: '宿',

    pinyin: 'Sù',

    rank: 266,

    populationRank: 305,

    population: 20,
    origin: '源于风姓，太昊后裔宿国之后，以国为氏。亦出自周代宿国之后。',
    originPlace: { name: '山东东平', lng: 116.30, lat: 35.91 },
    originPeriod: '西周',
    junwang: [
      { name: '东平郡', location: '山东东平', lng: 116.30, lat: 35.91, tanghao: '东平堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '山东东平', lng: 116.30, lat: 35.91, period: '西周', reason: '宿国封地' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '汉代', reason: '河南宿氏' },
      { name: '山东济南', lng: 117.00, lat: 36.65, period: '魏晋', reason: '迁居齐鲁' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '南朝', reason: '南渡江左' },
      { name: '安徽合肥', lng: 117.23, lat: 31.82, period: '明清', reason: '迁居江淮' },
    ],
    figures: [
      { name: '宿石', dynasty: '北魏', achievement: '吏部尚书，顺阳郡公' },
      { name: '宿元景', dynasty: '宋', achievement: '将领' },
      { name: '宿进', dynasty: '明', achievement: '刑部员外郎' },
      { name: '宿度', dynasty: '清', achievement: '学者，诗人' },
    ],
    totem: '宿字从宀从佰，本义为住宿。图腾为宿国风姓，象征太昊后裔。',
    history: '宿姓源于风姓，宿国之后。东平宿氏为郡望，北魏宿石为吏部尚书。',
  },
  {
    surname: '白',

    pinyin: 'Bái',

    rank: 267,

    populationRank: 73,

    population: 400,
    origin: '源于芈姓，楚平王孙白公胜之后。亦出自炎帝裔白阜之后。亦出自唐代白邛氏所改。',
    originPlace: { name: '河南息县', lng: 114.74, lat: 32.34 },
    originPeriod: '春秋',
    junwang: [
      { name: '太原郡', location: '山西太原', lng: 112.55, lat: 37.87, tanghao: '太原堂' },
      { name: '南阳郡', location: '河南南阳', lng: 112.53, lat: 33.00, tanghao: '南阳堂' },
    ],
    migration: [
      { name: '河南息县', lng: 114.74, lat: 32.34, period: '春秋', reason: '白公胜封地' },
      { name: '山西太原', lng: 112.55, lat: 37.87, period: '汉代', reason: '太原白氏' },
      { name: '河南南阳', lng: 112.53, lat: 33.00, period: '魏晋', reason: '南阳白氏' },
      { name: '陕西西安', lng: 108.94, lat: 34.27, period: '唐代', reason: '白居易本支' },
      { name: '江苏苏州', lng: 120.62, lat: 31.32, period: '宋代', reason: '南迁江南' },
    ],
    figures: [
      { name: '白公胜', dynasty: '春秋', achievement: '楚国大夫，白氏始祖' },
      { name: '白起', dynasty: '战国', achievement: '秦国名将，武安君' },
      { name: '白居易', dynasty: '唐', achievement: '诗人，著《长恨歌》' },
      { name: '白朴', dynasty: '元', achievement: '杂剧家，元曲四大家' },
    ],
    totem: '白字象形，本义为日光。图腾为白公胜，象征芈姓后裔。',
    history: '白姓源于芈姓，白公胜之后。太原白氏为郡望，唐代白居易为大诗人。',
  },
  {
    surname: '怀',

    pinyin: 'Huái',

    rank: 268,

    populationRank: 320,

    population: 20,
    origin: '源于姬姓，周武王时怀侯之后。亦出自春秋鲁大夫怀氏。亦出自无怀氏之后。',
    originPlace: { name: '河南武陟', lng: 113.40, lat: 35.10 },
    originPeriod: '西周',
    junwang: [
      { name: '河内郡', location: '河南沁阳', lng: 112.93, lat: 35.09, tanghao: '河内堂' },
      { name: '扶风郡', location: '陕西兴平', lng: 108.49, lat: 34.30, tanghao: '扶风堂' },
    ],
    migration: [
      { name: '河南武陟', lng: 113.40, lat: 35.10, period: '西周', reason: '怀侯封地' },
      { name: '河南沁阳', lng: 112.93, lat: 35.09, period: '汉代', reason: '河内怀氏' },
      { name: '陕西兴平', lng: 108.49, lat: 34.30, period: '魏晋', reason: '扶风怀氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '南朝', reason: '南渡江左' },
      { name: '浙江杭州', lng: 120.16, lat: 30.27, period: '宋代', reason: '迁居临安' },
    ],
    figures: [
      { name: '怀舜', dynasty: '汉', achievement: '名士，学者' },
      { name: '怀丙', dynasty: '宋', achievement: '僧人，巧匠' },
      { name: '怀才', dynasty: '明', achievement: '进士，循吏' },
      { name: '怀应', dynasty: '清', achievement: '画家' },
    ],
    totem: '怀字从心从褱，本义为思念。图腾为周怀侯，象征姬姓后裔。',
    history: '怀姓源于姬姓，怀侯之后。河内怀氏为郡望，宋代怀丙为巧匠。',
  },
  {
    surname: '蒲',

    pinyin: 'Pú',

    rank: 269,

    populationRank: 188,

    population: 65,
    origin: '源于姒姓，夏代蒲衣之后。亦出自夏后氏蒲卢氏之后。亦出自魏晋氐族蒲洪之后。',
    originPlace: { name: '河南长垣', lng: 114.65, lat: 35.19 },
    originPeriod: '夏代',
    junwang: [
      { name: '河东郡', location: '山西夏县', lng: 111.22, lat: 35.14, tanghao: '河东堂' },
      { name: '广汉郡', location: '四川广汉', lng: 104.25, lat: 30.99, tanghao: '广汉堂' },
    ],
    migration: [
      { name: '河南长垣', lng: 114.65, lat: 35.19, period: '夏代', reason: '蒲衣后裔' },
      { name: '山西夏县', lng: 111.22, lat: 35.14, period: '汉代', reason: '河东蒲氏' },
      { name: '四川广汉', lng: 104.25, lat: 30.99, period: '魏晋', reason: '广汉蒲氏' },
      { name: '福建泉州', lng: 118.67, lat: 24.88, period: '唐代', reason: '入闽定居' },
      { name: '广东潮州', lng: 116.63, lat: 23.68, period: '明清', reason: '迁居岭南' },
    ],
    figures: [
      { name: '蒲衣', dynasty: '上古', achievement: '舜帝师，贤人' },
      { name: '蒲洪', dynasty: '十六国', achievement: '前秦奠基者，苻洪' },
      { name: '蒲松龄', dynasty: '清', achievement: '文学家，著《聊斋志异》' },
      { name: '蒲寿庚', dynasty: '宋元', achievement: '泉州海商，闽南巨室' },
    ],
    totem: '蒲字从艹从浦，本义为草名。图腾为蒲衣草莽，象征姒姓后裔。',
    history: '蒲姓源于姒姓，蒲衣之后。河东蒲氏为郡望，清代蒲松龄著《聊斋志异》。',
  },
  {
    surname: '邰',

    pinyin: 'Tái',

    rank: 270,

    populationRank: 365,

    population: 12,
    origin: '源于姬姓，周始祖后稷母姜嫄，封于邰，后裔以地为氏。亦出自春秋邰氏。',
    originPlace: { name: '陕西武功', lng: 108.20, lat: 34.26 },
    originPeriod: '夏代',
    junwang: [
      { name: '平卢郡', location: '山东青州', lng: 118.48, lat: 36.68, tanghao: '平卢堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '陕西武功', lng: 108.20, lat: 34.26, period: '夏代', reason: '姜嫄封邰' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '周代', reason: '河南邰氏' },
      { name: '山东青州', lng: 118.48, lat: 36.68, period: '汉代', reason: '平卢邰氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '南朝', reason: '南渡江左' },
      { name: '浙江杭州', lng: 120.16, lat: 30.27, period: '宋代', reason: '迁居临安' },
    ],
    figures: [
      { name: '邰茂质', dynasty: '明', achievement: '孝子，名士' },
      { name: '邰鼎', dynasty: '宋', achievement: '进士' },
      { name: '邰中泰', dynasty: '清', achievement: '总兵，将领' },
      { name: '邰光华', dynasty: '清', achievement: '学者，诗人' },
    ],
    totem: '邰字从邑从台，本义为邑名。图腾为姜嫄封地，象征姬周母系后裔。',
    history: '邰姓源于姬姓，姜嫄之后。平卢邰氏为郡望，明代邰茂质为孝子。',
  },
  {
    surname: '从',

    pinyin: 'Cóng',

    rank: 271,

    populationRank: 330,

    population: 18,
    origin: '源于姬姓，周平王少子精英封于枞，后改从。亦出自汉代从公之后。亦出自复姓从省所改。',
    originPlace: { name: '河南洛阳', lng: 112.45, lat: 34.62 },
    originPeriod: '东周',
    junwang: [
      { name: '东莞郡', location: '山东沂水', lng: 118.63, lat: 35.78, tanghao: '东莞堂' },
      { name: '赵郡', location: '河北赵县', lng: 114.77, lat: 37.75, tanghao: '赵郡堂' },
    ],
    migration: [
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '东周', reason: '周平王子后' },
      { name: '山东沂水', lng: 118.63, lat: 35.78, period: '汉代', reason: '东莞从氏' },
      { name: '河北赵县', lng: 114.77, lat: 37.75, period: '魏晋', reason: '赵郡从氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '南朝', reason: '南渡江左' },
      { name: '安徽芜湖', lng: 118.38, lat: 31.33, period: '明清', reason: '迁居江淮' },
    ],
    figures: [
      { name: '从公', dynasty: '汉', achievement: '名士，学者' },
      { name: '从谂', dynasty: '唐', achievement: '禅师，赵州和尚' },
      { name: '从约', dynasty: '宋', achievement: '进士，循吏' },
      { name: '从所成', dynasty: '清', achievement: '画家' },
    ],
    totem: '从字从二人，本义为随行。图腾为周平王子后，象征姬姓后裔。',
    history: '从姓源于姬姓，周平王子之后。东莞从氏为郡望，唐代从谂为赵州禅师。',
  },
  {
    surname: '鄂',

    pinyin: 'È',

    rank: 272,

    populationRank: 300,

    population: 22,
    origin: '源于姬姓，晋侯孙鄂父之后。亦出自春秋鄂国之后。亦出自楚王弟鄂君之后。',
    originPlace: { name: '山西乡宁', lng: 110.84, lat: 35.97 },
    originPeriod: '春秋',
    junwang: [
      { name: '武昌郡', location: '湖北鄂州', lng: 114.89, lat: 30.39, tanghao: '武昌堂' },
      { name: '太原郡', location: '山西太原', lng: 112.55, lat: 37.87, tanghao: '太原堂' },
    ],
    migration: [
      { name: '山西乡宁', lng: 110.84, lat: 35.97, period: '春秋', reason: '鄂父封地' },
      { name: '山西太原', lng: 112.55, lat: 37.87, period: '汉代', reason: '太原鄂氏' },
      { name: '湖北鄂州', lng: 114.89, lat: 30.39, period: '魏晋', reason: '武昌鄂氏' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '唐代', reason: '仕宦中原' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南渡江左' },
    ],
    figures: [
      { name: '鄂崇禹', dynasty: '商', achievement: '南伯侯，商代诸侯' },
      { name: '鄂君', dynasty: '战国', achievement: '楚国封君' },
      { name: '鄂尔泰', dynasty: '清', achievement: '大学士，军机大臣' },
      { name: '鄂容安', dynasty: '清', achievement: '两江总督' },
    ],
    totem: '鄂字从阝从咢，本义为哗言。图腾为晋鄂父封地，象征姬姓后裔。',
    history: '鄂姓源于姬姓，鄂父之后。武昌鄂氏为郡望，清代鄂尔泰为军机大臣。',
  },
  {
    surname: '索',

    pinyin: 'Suǒ',

    rank: 273,

    populationRank: 275,

    population: 28,
    origin: '源于商代，殷人七族索氏之后。亦出自南北朝索卢氏所改。亦出自复姓索阳所改。',
    originPlace: { name: '河南商丘', lng: 115.65, lat: 33.38 },
    originPeriod: '商代',
    junwang: [
      { name: '武威郡', location: '甘肃武威', lng: 102.64, lat: 37.93, tanghao: '武威堂' },
      { name: '敦煌郡', location: '甘肃敦煌', lng: 94.66, lat: 40.14, tanghao: '敦煌堂' },
    ],
    migration: [
      { name: '河南商丘', lng: 115.65, lat: 33.38, period: '商代', reason: '殷人七族' },
      { name: '甘肃敦煌', lng: 94.66, lat: 40.14, period: '汉代', reason: '敦煌索氏' },
      { name: '甘肃武威', lng: 102.64, lat: 37.93, period: '魏晋', reason: '武威索氏' },
      { name: '山西太原', lng: 112.55, lat: 37.87, period: '唐代', reason: '迁居并州' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南渡江左' },
    ],
    figures: [
      { name: '索靖', dynasty: '西晋', achievement: '书法家，敦煌五龙之一' },
      { name: '索紞', dynasty: '前凉', achievement: '学者，经学家' },
      { name: '索湘', dynasty: '北宋', achievement: '河北转运使' },
      { name: '索林', dynasty: '明', achievement: '御史，名臣' },
    ],
    totem: '索字从糸从索，本义为绳索。图腾为殷人索氏，象征商代后裔。',
    history: '索姓源于商代，殷人七族之后。敦煌索氏为郡望，西晋索靖为书法大家。',
  },
  {
    surname: '咸',

    pinyin: 'Xián',

    rank: 274,

    populationRank: 350,

    population: 15,
    origin: '源于高阳氏，颛顼裔孙巫咸之后。亦出自商代咸氏。亦出自春秋鲁国咸氏。',
    originPlace: { name: '陕西西安', lng: 108.94, lat: 34.27 },
    originPeriod: '上古',
    junwang: [
      { name: '汝南郡', location: '河南汝南', lng: 114.36, lat: 33.00, tanghao: '汝南堂' },
      { name: '东海郡', location: '山东郯城', lng: 118.36, lat: 34.61, tanghao: '东海堂' },
    ],
    migration: [
      { name: '陕西西安', lng: 108.94, lat: 34.27, period: '上古', reason: '巫咸后裔' },
      { name: '河南汝南', lng: 114.36, lat: 33.00, period: '汉代', reason: '汝南咸氏' },
      { name: '山东郯城', lng: 118.36, lat: 34.61, period: '魏晋', reason: '东海咸氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '南朝', reason: '南渡江左' },
      { name: '浙江杭州', lng: 120.16, lat: 30.27, period: '宋代', reason: '迁居临安' },
    ],
    figures: [
      { name: '巫咸', dynasty: '商', achievement: '商王太戊大臣，神巫' },
      { name: '咸丘蒙', dynasty: '战国', achievement: '孟子弟子' },
      { name: '咸冀', dynasty: '唐', achievement: '学者，集贤院学士' },
      { name: '咸唯一', dynasty: '明', achievement: '参议，循吏' },
    ],
    totem: '咸字从口从戌，本义为皆。图腾为巫咸后裔，象征高阳氏后裔。',
    history: '咸姓源于高阳氏，巫咸之后。汝南咸氏为郡望，商代巫咸为神巫。',
  },
  {
    surname: '籍',

    pinyin: 'Jí',

    rank: 275,

    populationRank: 360,

    population: 12,
    origin: '源于姬姓，晋大夫籍氏之后。亦出自周官籍氏之后，以官为氏。',
    originPlace: { name: '山西翼城', lng: 111.70, lat: 35.64 },
    originPeriod: '春秋',
    junwang: [
      { name: '广平郡', location: '河北鸡泽', lng: 114.87, lat: 36.95, tanghao: '广平堂' },
      { name: '太原郡', location: '山西太原', lng: 112.55, lat: 37.87, tanghao: '太原堂' },
    ],
    migration: [
      { name: '山西翼城', lng: 111.70, lat: 35.64, period: '春秋', reason: '晋国籍氏' },
      { name: '山西太原', lng: 112.55, lat: 37.87, period: '汉代', reason: '太原籍氏' },
      { name: '河北鸡泽', lng: 114.87, lat: 36.95, period: '魏晋', reason: '广平籍氏' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '唐代', reason: '仕宦中原' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南渡江左' },
    ],
    figures: [
      { name: '籍谈', dynasty: '春秋', achievement: '晋国大夫，典籍家' },
      { name: '籍孺', dynasty: '西汉', achievement: '汉文帝宠臣' },
      { name: '籍建', dynasty: '明', achievement: '御史，名臣' },
      { name: '籍峡', dynasty: '清', achievement: '学者，诗人' },
    ],
    totem: '籍字从竹从耤，本义为书册。图腾为晋国籍氏，象征职官后裔。',
    history: '籍姓源于姬姓，晋大夫之后。广平籍氏为郡望，春秋籍谈为典籍家。',
  },
  {
    surname: '赖',

    pinyin: 'Lài',

    rank: 276,

    populationRank: 98,

    population: 260,
    origin: '源于姬姓，周武王弟叔颖封于赖，后裔以国为氏。亦出自春秋赖国之后。',
    originPlace: { name: '河南息县', lng: 114.74, lat: 32.34 },
    originPeriod: '西周',
    junwang: [
      { name: '颍川郡', location: '河南禹州', lng: 113.47, lat: 34.16, tanghao: '颍川堂' },
      { name: '南康郡', location: '江西赣州', lng: 114.93, lat: 25.83, tanghao: '南康堂' },
    ],
    migration: [
      { name: '河南息县', lng: 114.74, lat: 32.34, period: '西周', reason: '赖国封地' },
      { name: '河南禹州', lng: 113.47, lat: 34.16, period: '汉代', reason: '颍川赖氏' },
      { name: '浙江松阳', lng: 119.48, lat: 28.45, period: '唐代', reason: '南迁浙东' },
      { name: '江西赣州', lng: 114.93, lat: 25.83, period: '宋代', reason: '南康赖氏' },
      { name: '广东梅州', lng: 116.12, lat: 24.29, period: '明清', reason: '迁居岭南' },
    ],
    figures: [
      { name: '赖先', dynasty: '西汉', achievement: '交趾太守' },
      { name: '赖文光', dynasty: '清', achievement: '捻军首领，遵王' },
      { name: '赖汉英', dynasty: '清', achievement: '太平天国将领' },
      { name: '赖宁', dynasty: '当代', achievement: '少年英雄' },
    ],
    totem: '赖字从束从负，本义为赢利。图腾为赖国叔颖，象征姬姓后裔。',
    history: '赖姓源于姬姓，赖国之后。颍川赖氏为郡望，西周赖国为武王弟封国。',
  },
  {
    surname: '卓',

    pinyin: 'Zhuó',

    rank: 277,

    populationRank: 240,

    population: 38,
    origin: '源于芈姓，楚威王子公子卓之后。亦出自春秋晋大夫卓氏之后。亦出自明代卓氏所改。',
    originPlace: { name: '湖北荆州', lng: 112.24, lat: 30.33 },
    originPeriod: '战国',
    junwang: [
      { name: '西河郡', location: '山西汾阳', lng: 111.78, lat: 37.27, tanghao: '西河堂' },
      { name: '南阳郡', location: '河南南阳', lng: 112.53, lat: 33.00, tanghao: '南阳堂' },
    ],
    migration: [
      { name: '湖北荆州', lng: 112.24, lat: 30.33, period: '战国', reason: '楚公子卓' },
      { name: '山西汾阳', lng: 111.78, lat: 37.27, period: '汉代', reason: '西河卓氏' },
      { name: '河南南阳', lng: 112.53, lat: 33.00, period: '魏晋', reason: '南阳卓氏' },
      { name: '浙江杭州', lng: 120.16, lat: 30.27, period: '宋代', reason: '南迁临安' },
      { name: '福建福州', lng: 119.30, lat: 26.08, period: '明清', reason: '迁居闽中' },
    ],
    figures: [
      { name: '卓茂', dynasty: '东汉', achievement: '太傅，褒德侯' },
      { name: '卓敬', dynasty: '明', achievement: '户部侍郎，忠臣' },
      { name: '卓尔康', dynasty: '明', achievement: '学者，文学家' },
      { name: '卓秉恬', dynasty: '清', achievement: '大学士，书法家' },
    ],
    totem: '卓字从卜从早，本义为高超。图腾为楚公子卓，象征芈姓后裔。',
    history: '卓姓源于芈姓，楚公子卓之后。西河卓氏为郡望，东汉卓茂为太傅。',
  },
  {
    surname: '蔺',

    pinyin: 'Lìn',

    rank: 278,

    populationRank: 220,

    population: 42,
    origin: '源于姬姓，晋穆侯裔孙韩万封于蔺，后裔以地为氏。亦出自春秋赵国蔺氏之后。',
    originPlace: { name: '山西柳林', lng: 110.89, lat: 37.43 },
    originPeriod: '春秋',
    junwang: [
      { name: '中山郡', location: '河北定州', lng: 115.01, lat: 38.51, tanghao: '中山堂' },
      { name: '华阴郡', location: '陕西华阴', lng: 110.09, lat: 34.57, tanghao: '华阴堂' },
    ],
    migration: [
      { name: '山西柳林', lng: 110.89, lat: 37.43, period: '春秋', reason: '韩万封地' },
      { name: '河北定州', lng: 115.01, lat: 38.51, period: '汉代', reason: '中山蔺氏' },
      { name: '陕西华阴', lng: 110.09, lat: 34.57, period: '魏晋', reason: '华阴蔺氏' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '唐代', reason: '仕宦中原' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南渡江左' },
    ],
    figures: [
      { name: '蔺相如', dynasty: '战国', achievement: '赵国相，完璧归赵' },
      { name: '蔺道人', dynasty: '唐', achievement: '僧人，骨科名医' },
      { name: '蔺芳', dynasty: '明', achievement: '工部侍郎' },
      { name: '蔺从坦', dynasty: '金', achievement: '文学家，诗人' },
    ],
    totem: '蔺字从艹从閵，本义为草名。图腾为韩万封地，象征姬姓后裔。',
    history: '蔺姓源于姬姓，韩万之后。中山蔺氏为郡望，战国蔺相如为赵国名相。',
  },
  {
    surname: '屠',

    pinyin: 'Tú',

    rank: 279,

    populationRank: 235,

    population: 38,
    origin: '源于九黎氏，蚩尤之后。亦出自商代屠氏。亦出自周代职官屠人之后。',
    originPlace: { name: '山东郓城', lng: 115.94, lat: 35.59 },
    originPeriod: '上古',
    junwang: [
      { name: '广平郡', location: '河北鸡泽', lng: 114.87, lat: 36.95, tanghao: '广平堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '山东郓城', lng: 115.94, lat: 35.59, period: '上古', reason: '蚩尤后裔' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '汉代', reason: '河南屠氏' },
      { name: '河北鸡泽', lng: 114.87, lat: 36.95, period: '魏晋', reason: '广平屠氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '南朝', reason: '南渡江左' },
      { name: '浙江杭州', lng: 120.16, lat: 30.27, period: '宋代', reason: '迁居临安' },
    ],
    figures: [
      { name: '屠蒯', dynasty: '春秋', achievement: '晋国大夫' },
      { name: '屠本畯', dynasty: '明', achievement: '太常典簿，学者' },
      { name: '屠隆', dynasty: '明', achievement: '文学家，戏曲家' },
      { name: '屠寄', dynasty: '清', achievement: '史学家，著《蒙兀儿史记》' },
    ],
    totem: '屠字从尸从者，本义为宰杀。图腾为蚩尤后裔，象征九黎氏后裔。',
    history: '屠姓源于九黎氏，蚩尤之后。广平屠氏为郡望，明代屠隆为文学家。',
  },
  {
    surname: '蒙',

    pinyin: 'Méng',

    rank: 280,

    populationRank: 200,

    population: 60,
    origin: '源于高阳氏，颛顼后裔蒙双氏之后。亦出自周代蒙泽之后，以地为氏。亦出自春秋楚国蒙氏。',
    originPlace: { name: '山东菏泽', lng: 115.48, lat: 35.24 },
    originPeriod: '上古',
    junwang: [
      { name: '安定郡', location: '甘肃泾川', lng: 107.37, lat: 35.33, tanghao: '安定堂' },
      { name: '南安郡', location: '甘肃陇西', lng: 104.63, lat: 35.00, tanghao: '南安堂' },
    ],
    migration: [
      { name: '山东菏泽', lng: 115.48, lat: 35.24, period: '上古', reason: '蒙双氏后裔' },
      { name: '甘肃泾川', lng: 107.37, lat: 35.33, period: '汉代', reason: '安定蒙氏' },
      { name: '甘肃陇西', lng: 104.63, lat: 35.00, period: '魏晋', reason: '南安蒙氏' },
      { name: '广东广州', lng: 113.26, lat: 23.13, period: '唐代', reason: '迁居岭南' },
      { name: '广西桂林', lng: 110.29, lat: 25.27, period: '明清', reason: '定居桂北' },
    ],
    figures: [
      { name: '蒙恬', dynasty: '秦', achievement: '名将，造笔造长城' },
      { name: '蒙毅', dynasty: '秦', achievement: '上卿，内史' },
      { name: '蒙求', dynasty: '唐', achievement: '学者，著《蒙求》' },
      { name: '蒙得恩', dynasty: '清', achievement: '太平天国将领，赞王' },
    ],
    totem: '蒙字从艹从冡，本义为覆盖。图腾为蒙双氏，象征高阳氏后裔。',
    history: '蒙姓源于高阳氏，蒙双氏之后。安定蒙氏为郡望，秦代蒙恬为一代名将。',
  },
  {
    surname: '池',

    pinyin: 'Chí',

    rank: 281,

    populationRank: 215,

    population: 45,
    origin: '源于嬴姓，秦司马公子池之后。亦出自周代城池官员之后，以官为氏。',
    originPlace: { name: '陕西西安', lng: 108.94, lat: 34.27 },
    originPeriod: '春秋',
    junwang: [
      { name: '西平郡', location: '青海西宁', lng: 101.78, lat: 36.62, tanghao: '西平堂' },
      { name: '陈留郡', location: '河南开封', lng: 114.31, lat: 34.80, tanghao: '陈留堂' },
    ],
    migration: [
      { name: '陕西西安', lng: 108.94, lat: 34.27, period: '春秋', reason: '公子池后裔' },
      { name: '河南开封', lng: 114.31, lat: 34.80, period: '汉代', reason: '陈留池氏' },
      { name: '青海西宁', lng: 101.78, lat: 36.62, period: '魏晋', reason: '西平池氏' },
      { name: '福建福州', lng: 119.30, lat: 26.08, period: '唐代', reason: '入闽定居' },
      { name: '广东潮州', lng: 116.63, lat: 23.68, period: '明清', reason: '迁居岭南' },
    ],
    figures: [
      { name: '池瑗', dynasty: '汉', achievement: '中郎将，名臣' },
      { name: '池裕', dynasty: '宋', achievement: '学者，文学家' },
      { name: '池显方', dynasty: '明', achievement: '文学家，诗人' },
      { name: '池生春', dynasty: '清', achievement: '翰林院编修，学者' },
    ],
    totem: '池字从水从也，本义为水塘。图腾为秦公子池，象征嬴姓后裔。',
    history: '池姓源于嬴姓，公子池之后。西平池氏为郡望，明代池显方为文学家。',
  },
  {
    surname: '乔',

    pinyin: 'Qiáo',

    rank: 282,

    populationRank: 96,

    population: 270,
    origin: '源于姬姓，黄帝葬于桥山，后裔以地为氏。亦出自匈奴贵族乔氏所改。亦出自复姓桥氏所改。',
    originPlace: { name: '陕西黄陵', lng: 109.25, lat: 35.58 },
    originPeriod: '上古',
    junwang: [
      { name: '梁国郡', location: '河南商丘', lng: 115.65, lat: 33.38, tanghao: '梁国堂' },
      { name: '顿丘郡', location: '河南清丰', lng: 115.10, lat: 35.89, tanghao: '顿丘堂' },
    ],
    migration: [
      { name: '陕西黄陵', lng: 109.25, lat: 35.58, period: '上古', reason: '桥山后裔' },
      { name: '河南商丘', lng: 115.65, lat: 33.38, period: '汉代', reason: '梁国乔氏' },
      { name: '河南清丰', lng: 115.10, lat: 35.89, period: '魏晋', reason: '顿丘乔氏' },
      { name: '山西太原', lng: 112.55, lat: 37.87, period: '唐代', reason: '迁居并州' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南渡江左' },
    ],
    figures: [
      { name: '乔璘', dynasty: '汉', achievement: '名士，学者' },
      { name: '乔吉', dynasty: '元', achievement: '杂剧家，散曲家' },
      { name: '乔行简', dynasty: '南宋', achievement: '宰相，平章军国重事' },
      { name: '乔致庸', dynasty: '清', achievement: '晋商代表，乔家大院主人' },
    ],
    totem: '乔字从夭从高，本义为高树。图腾为桥山黄帝陵，象征姬姓后裔。',
    history: '乔姓源于姬姓，桥山之后。梁国乔氏为郡望，清代乔致庸为晋商代表。',
  },
  {
    surname: '阴',

    pinyin: 'Yīn',

    rank: 283,

    populationRank: 310,

    population: 20,
    origin: '源于姬姓，齐管仲母阴氏之后。亦出自周代阴国之后。亦出自春秋楚阴大夫之后。',
    originPlace: { name: '河南孟津', lng: 112.44, lat: 34.83 },
    originPeriod: '春秋',
    junwang: [
      { name: '始平郡', location: '陕西兴平', lng: 108.49, lat: 34.30, tanghao: '始平堂' },
      { name: '南阳郡', location: '河南南阳', lng: 112.53, lat: 33.00, tanghao: '南阳堂' },
    ],
    migration: [
      { name: '河南孟津', lng: 112.44, lat: 34.83, period: '春秋', reason: '阴国故地' },
      { name: '河南南阳', lng: 112.53, lat: 33.00, period: '汉代', reason: '南阳阴氏' },
      { name: '陕西兴平', lng: 108.49, lat: 34.30, period: '魏晋', reason: '始平阴氏' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '唐代', reason: '仕宦中原' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南渡江左' },
    ],
    figures: [
      { name: '阴丽华', dynasty: '东汉', achievement: '光武帝皇后' },
      { name: '阴识', dynasty: '东汉', achievement: '执金吾，原鹿侯' },
      { name: '阴兴', dynasty: '东汉', achievement: '卫尉，期思侯' },
      { name: '阴寿', dynasty: '隋', achievement: '将军，平原王' },
    ],
    totem: '阴字从阜从侌，本义为山北。图腾为阴国地名，象征姬姓后裔。',
    history: '阴姓源于姬姓，阴国之后。南阳阴氏为郡望，东汉阴丽华为光武帝皇后。',
  },
  {
    surname: '鬱',

    pinyin: 'Yù',

    rank: 284,

    populationRank: 500,

    population: 1,
    origin: '源于姬姓，周代鬱国之后，以国为氏。亦出自周官鬱鬯之后，以官为氏。亦出自地名鬱林。',
    originPlace: { name: '甘肃庆阳', lng: 107.64, lat: 35.73 },
    originPeriod: '西周',
    junwang: [
      { name: '黎阳郡', location: '河南浚县', lng: 114.55, lat: 35.67, tanghao: '黎阳堂' },
      { name: '广汉郡', location: '四川广汉', lng: 104.25, lat: 30.99, tanghao: '广汉堂' },
    ],
    migration: [
      { name: '甘肃庆阳', lng: 107.64, lat: 35.73, period: '西周', reason: '鬱国封地' },
      { name: '河南浚县', lng: 114.55, lat: 35.67, period: '汉代', reason: '黎阳鬱氏' },
      { name: '四川广汉', lng: 104.25, lat: 30.99, period: '魏晋', reason: '广汉鬱氏' },
      { name: '江苏苏州', lng: 120.62, lat: 31.32, period: '南朝', reason: '南渡江左' },
      { name: '浙江绍兴', lng: 120.58, lat: 30.03, period: '明清', reason: '迁居会稽' },
    ],
    figures: [
      { name: '鬱贡', dynasty: '春秋', achievement: '鲁相，名臣' },
      { name: '鬱浩', dynasty: '明', achievement: '学者，诗人' },
      { name: '鬱文', dynasty: '明', achievement: '御史，名臣' },
      { name: '鬱植', dynasty: '清', achievement: '画家，诗人' },
    ],
    totem: '鬱字从林从鬯从冖，本义为香草。图腾为鬱鬯香草，象征职官后裔。',
    history: '鬱姓源于姬姓，鬱国之后。黎阳鬱氏为郡望，春秋鬱贡为鲁相。',
  },
  {
    surname: '胥',

    pinyin: 'Xū',

    rank: 285,

    populationRank: 285,

    population: 26,
    origin: '源于姬姓，晋大夫胥臣之后，以字为氏。亦出自夏代胥氏之后。亦出自复姓胥门所改。',
    originPlace: { name: '山西翼城', lng: 111.70, lat: 35.64 },
    originPeriod: '春秋',
    junwang: [
      { name: '琅琊郡', location: '山东临沂', lng: 118.35, lat: 35.05, tanghao: '琅琊堂' },
      { name: '吴兴郡', location: '浙江湖州', lng: 120.10, lat: 30.87, tanghao: '吴兴堂' },
    ],
    migration: [
      { name: '山西翼城', lng: 111.70, lat: 35.64, period: '春秋', reason: '胥臣后裔' },
      { name: '山东临沂', lng: 118.35, lat: 35.05, period: '汉代', reason: '琅琊胥氏' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '魏晋', reason: '仕宦中原' },
      { name: '浙江湖州', lng: 120.10, lat: 30.87, period: '南朝', reason: '吴兴胥氏' },
      { name: '江苏苏州', lng: 120.62, lat: 31.32, period: '明清', reason: '迁居江南' },
    ],
    figures: [
      { name: '胥臣', dynasty: '春秋', achievement: '晋国大夫，司空' },
      { name: '胥甲', dynasty: '春秋', achievement: '晋国大夫' },
      { name: '胥鼎', dynasty: '金', achievement: '尚书右丞，温国公' },
      { name: '胥必彰', dynasty: '明', achievement: '御史，名臣' },
    ],
    totem: '胥字从肉从疋，本义为肉酱。图腾为晋胥臣，象征姬姓后裔。',
    history: '胥姓源于姬姓，胥臣之后。琅琊胥氏为郡望，春秋胥臣为晋国司空。',
  },
  {
    surname: '能',

    pinyin: 'Néng',

    rank: 286,

    populationRank: 380,

    population: 10,
    origin: '源于姬姓，周成王弟唐叔虞之后，封于能，后裔以地为氏。亦出自楚熊挚之后，改熊为能。',
    originPlace: { name: '山西太原', lng: 112.55, lat: 37.87 },
    originPeriod: '西周',
    junwang: [
      { name: '太原郡', location: '山西太原', lng: 112.55, lat: 37.87, tanghao: '太原堂' },
      { name: '华阴郡', location: '陕西华阴', lng: 110.09, lat: 34.57, tanghao: '华阴堂' },
    ],
    migration: [
      { name: '山西太原', lng: 112.55, lat: 37.87, period: '西周', reason: '唐叔虞后裔' },
      { name: '陕西华阴', lng: 110.09, lat: 34.57, period: '汉代', reason: '华阴能氏' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '魏晋', reason: '仕宦中原' },
      { name: '湖北荆州', lng: 112.24, lat: 30.33, period: '唐代', reason: '楚能氏后裔' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南渡江左' },
    ],
    figures: [
      { name: '能元皓', dynasty: '唐', achievement: '安禄山将领，后归唐' },
      { name: '能典', dynasty: '明', achievement: '学者，文学家' },
      { name: '能图', dynasty: '清', achievement: '进士，循吏' },
      { name: '能启', dynasty: '清', achievement: '画家，诗人' },
    ],
    totem: '能字从肉从匕从二足，本义为熊。图腾为唐叔虞后裔，象征姬姓后裔。',
    history: '能姓源于姬姓，唐叔虞之后。太原能氏为郡望，唐代能元皓为将领。',
  },
  {
    surname: '苍',

    pinyin: 'Cāng',

    rank: 287,

    populationRank: 380,

    population: 10,
    origin: '源于姬姓，黄帝孙颛顼之后苍氏。亦出自上古苍颉之后。亦出自史官仓氏所改。',
    originPlace: { name: '河南新郑', lng: 113.74, lat: 34.40 },
    originPeriod: '上古',
    junwang: [
      { name: '武陵郡', location: '湖南常德', lng: 111.69, lat: 29.04, tanghao: '武陵堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '河南新郑', lng: 113.74, lat: 34.40, period: '上古', reason: '黄帝后裔' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '汉代', reason: '河南苍氏' },
      { name: '湖南常德', lng: 111.69, lat: 29.04, period: '魏晋', reason: '武陵苍氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '南朝', reason: '南渡江左' },
      { name: '浙江杭州', lng: 120.16, lat: 30.27, period: '宋代', reason: '迁居临安' },
    ],
    figures: [
      { name: '苍颉', dynasty: '上古', achievement: '黄帝史官，造字' },
      { name: '苍葛', dynasty: '春秋', achievement: '周大夫' },
      { name: '苍恩', dynasty: '汉', achievement: '学者，经学家' },
      { name: '苍慈', dynasty: '明', achievement: '循吏，知县' },
    ],
    totem: '苍字从艹从仓，本义为草色。图腾为苍颉造字，象征黄帝史官后裔。',
    history: '苍姓源于姬姓，黄帝之后。武陵苍氏为郡望，上古苍颉为造字史官。',
  },
  {
    surname: '双',

    pinyin: 'Shuāng',

    rank: 288,

    populationRank: 320,

    population: 20,
    origin: '源于姬姓，颛顼裔孙双蒙之后。亦出自春秋卫国双氏之后。亦出自复姓双蒙所改。',
    originPlace: { name: '河南濮阳', lng: 115.03, lat: 35.76 },
    originPeriod: '上古',
    junwang: [
      { name: '天水郡', location: '甘肃天水', lng: 105.72, lat: 34.58, tanghao: '天水堂' },
      { name: '太原郡', location: '山西太原', lng: 112.55, lat: 37.87, tanghao: '太原堂' },
    ],
    migration: [
      { name: '河南濮阳', lng: 115.03, lat: 35.76, period: '上古', reason: '颛顼后裔' },
      { name: '甘肃天水', lng: 105.72, lat: 34.58, period: '汉代', reason: '天水双氏' },
      { name: '山西太原', lng: 112.55, lat: 37.87, period: '魏晋', reason: '太原双氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '南朝', reason: '南渡江左' },
      { name: '浙江杭州', lng: 120.16, lat: 30.27, period: '宋代', reason: '迁居临安' },
    ],
    figures: [
      { name: '双渐', dynasty: '宋', achievement: '进士，循吏' },
      { name: '双林', dynasty: '明', achievement: '御史，名臣' },
      { name: '双泰', dynasty: '元', achievement: '将领' },
      { name: '双鼎', dynasty: '清', achievement: '画家，诗人' },
    ],
    totem: '双字从雔，本义为两只。图腾为颛顼后裔，象征姬姓后裔。',
    history: '双姓源于姬姓，颛顼后裔。天水双氏为郡望，宋代双渐为循吏。',
  },
  {
    surname: '闻',

    pinyin: 'Wén',

    rank: 289,

    populationRank: 215,

    population: 45,
    origin: '源于姬姓，春秋鲁大夫闻人氏之后，后改为闻。亦出自商代闻氏。亦出自复姓闻人所改。',
    originPlace: { name: '山东曲阜', lng: 116.98, lat: 35.58 },
    originPeriod: '春秋',
    junwang: [
      { name: '吴兴郡', location: '浙江湖州', lng: 120.10, lat: 30.87, tanghao: '吴兴堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '山东曲阜', lng: 116.98, lat: 35.58, period: '春秋', reason: '闻人氏后裔' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '汉代', reason: '河南闻氏' },
      { name: '浙江湖州', lng: 120.10, lat: 30.87, period: '南朝', reason: '吴兴闻氏' },
      { name: '江苏苏州', lng: 120.62, lat: 31.32, period: '宋代', reason: '迁居江南' },
      { name: '湖北浠水', lng: 115.26, lat: 30.45, period: '明清', reason: '迁居荆楚' },
    ],
    figures: [
      { name: '闻人通汉', dynasty: '西汉', achievement: '经学家，太子太傅' },
      { name: '闻一多', dynasty: '近代', achievement: '诗人，学者，民主斗士' },
      { name: '闻云', dynasty: '明', achievement: '画家' },
      { name: '闻诗', dynasty: '清', achievement: '学者，文学家' },
    ],
    totem: '闻字从门从耳，本义为听到。图腾为闻人氏，象征职官后裔。',
    history: '闻姓源于姬姓，闻人氏之后。吴兴闻氏为郡望，近代闻一多为民主斗士。',
  },
  {
    surname: '莘',

    pinyin: 'Shēn',

    rank: 290,

    populationRank: 470,

    population: 3,
    origin: '源于姒姓，夏代莘国之后，以国为氏。亦出自周代莘国，后裔以地为氏。',
    originPlace: { name: '陕西合阳', lng: 110.15, lat: 35.23 },
    originPeriod: '夏代',
    junwang: [
      { name: '天水郡', location: '甘肃天水', lng: 105.72, lat: 34.58, tanghao: '天水堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '陕西合阳', lng: 110.15, lat: 35.23, period: '夏代', reason: '莘国封地' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '汉代', reason: '河南莘氏' },
      { name: '甘肃天水', lng: 105.72, lat: 34.58, period: '魏晋', reason: '天水莘氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '南朝', reason: '南渡江左' },
      { name: '浙江杭州', lng: 120.16, lat: 30.27, period: '宋代', reason: '迁居临安' },
    ],
    figures: [
      { name: '莘氏女', dynasty: '夏', achievement: '商汤妃，贤后' },
      { name: '莘融', dynasty: '春秋', achievement: '名士，学者' },
      { name: '莘野', dynasty: '明', achievement: '枣强知县，循吏' },
      { name: '莘立', dynasty: '清', achievement: '学者，诗人' },
    ],
    totem: '莘字从艹从辛，本义为草名。图腾为莘国草莽，象征姒姓后裔。',
    history: '莘姓源于姒姓，莘国之后。天水莘氏为郡望，夏代莘氏女为商汤妃。',
  },
  {
    surname: '党',

    pinyin: 'Dǎng',

    rank: 291,

    populationRank: 215,

    population: 45,
    origin: '源于姬姓，周代党氏之后。亦出自夏后氏党氏之后。亦出自西羌党项族所改。',
    originPlace: { name: '陕西西安', lng: 108.94, lat: 34.27 },
    originPeriod: '西周',
    junwang: [
      { name: '冯翊郡', location: '陕西大荔', lng: 109.80, lat: 34.80, tanghao: '冯翊堂' },
      { name: '华阴郡', location: '陕西华阴', lng: 110.09, lat: 34.57, tanghao: '华阴堂' },
    ],
    migration: [
      { name: '陕西西安', lng: 108.94, lat: 34.27, period: '西周', reason: '周党氏后裔' },
      { name: '陕西大荔', lng: 109.80, lat: 34.80, period: '汉代', reason: '冯翊党氏' },
      { name: '陕西华阴', lng: 110.09, lat: 34.57, period: '魏晋', reason: '华阴党氏' },
      { name: '甘肃宁夏', lng: 106.23, lat: 38.49, period: '唐代', reason: '党项族居地' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '明清', reason: '仕宦中原' },
    ],
    figures: [
      { name: '党霸', dynasty: '汉', achievement: '名士，学者' },
      { name: '党还醇', dynasty: '明', achievement: '良乡知县，忠臣' },
      { name: '党崇雅', dynasty: '清', achievement: '国史院大学士' },
      { name: '党蒙', dynasty: '清', achievement: '翰林院编修' },
    ],
    totem: '党字从儿从尚，本义为族党。图腾为周党氏，象征职官后裔。',
    history: '党姓源于姬姓，周党氏之后。冯翊党氏为郡望，明代党还醇为忠臣。',
  },
  {
    surname: '翟',

    pinyin: 'Zhái',

    rank: 292,

    populationRank: 125,

    population: 180,
    origin: '源于姬姓，周代翟国之后，以国为氏。亦出自赤狄族翟氏。亦出自春秋齐大夫翟氏。',
    originPlace: { name: '山西晋城', lng: 112.85, lat: 35.49 },
    originPeriod: '西周',
    junwang: [
      { name: '南阳郡', location: '河南南阳', lng: 112.53, lat: 33.00, tanghao: '南阳堂' },
      { name: '汝南郡', location: '河南汝南', lng: 114.36, lat: 33.00, tanghao: '汝南堂' },
    ],
    migration: [
      { name: '山西晋城', lng: 112.85, lat: 35.49, period: '西周', reason: '翟国封地' },
      { name: '河南南阳', lng: 112.53, lat: 33.00, period: '汉代', reason: '南阳翟氏' },
      { name: '河南汝南', lng: 114.36, lat: 33.00, period: '魏晋', reason: '汝南翟氏' },
      { name: '浙江杭州', lng: 120.16, lat: 30.27, period: '宋代', reason: '南迁临安' },
      { name: '山东青州', lng: 118.48, lat: 36.68, period: '明清', reason: '迁居齐鲁' },
    ],
    figures: [
      { name: '翟方进', dynasty: '西汉', achievement: '丞相，高陵侯' },
      { name: '翟义', dynasty: '西汉', achievement: '东郡太守，起义反抗王莽' },
      { name: '翟汤', dynasty: '东晋', achievement: '隐士，名士' },
      { name: '翟灏', dynasty: '清', achievement: '学者，著《通俗编》' },
    ],
    totem: '翟字从羽从隹，本义为长尾雉。图腾为翟国羽饰，象征姬姓后裔。',
    history: '翟姓源于姬姓，翟国之后。南阳翟氏为郡望，西汉翟方进为丞相。',
  },
  {
    surname: '谭',

    pinyin: 'Tán',

    rank: 293,

    populationRank: 65,

    population: 500,
    origin: '源于嬴姓，周代谭国之后，以国为氏。亦出自春秋谭子之后。亦出自巴南谭氏。',
    originPlace: { name: '山东章丘', lng: 117.53, lat: 36.72 },
    originPeriod: '西周',
    junwang: [
      { name: '齐郡', location: '山东淄博', lng: 118.05, lat: 36.78, tanghao: '齐郡堂' },
      { name: '弘农郡', location: '河南灵宝', lng: 110.85, lat: 34.52, tanghao: '弘农堂' },
    ],
    migration: [
      { name: '山东章丘', lng: 117.53, lat: 36.72, period: '西周', reason: '谭国封地' },
      { name: '山东淄博', lng: 118.05, lat: 36.78, period: '春秋', reason: '齐郡谭氏' },
      { name: '河南灵宝', lng: 110.85, lat: 34.52, period: '汉代', reason: '弘农谭氏' },
      { name: '广东广州', lng: 113.26, lat: 23.13, period: '唐代', reason: '迁居岭南' },
      { name: '湖南长沙', lng: 112.94, lat: 28.23, period: '明清', reason: '迁居湖湘' },
    ],
    figures: [
      { name: '谭峭', dynasty: '五代', achievement: '道家学者，著《化书》' },
      { name: '谭纶', dynasty: '明', achievement: '兵部尚书，抗倭名将' },
      { name: '谭嗣同', dynasty: '清末', achievement: '戊戌六君子，维新派' },
      { name: '谭震林', dynasty: '近代', achievement: '革命家，副总理' },
    ],
    totem: '谭字从言从覃，本义为深言。图腾为谭国覃深，象征嬴姓后裔。',
    history: '谭姓源于嬴姓，谭国之后。齐郡谭氏为郡望，清末谭嗣同为戊戌六君子。',
  },
  {
    surname: '贡',

    pinyin: 'Gòng',

    rank: 294,

    populationRank: 320,

    population: 20,
    origin: '源于姬姓，周代卫康叔后裔贡子之后。亦出自春秋鲁大夫贡氏。亦出自端木赐之后，改子贡为贡。',
    originPlace: { name: '河南濮阳', lng: 115.03, lat: 35.76 },
    originPeriod: '西周',
    junwang: [
      { name: '广平郡', location: '河北鸡泽', lng: 114.87, lat: 36.95, tanghao: '广平堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '河南濮阳', lng: 115.03, lat: 35.76, period: '西周', reason: '卫康叔后裔' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '汉代', reason: '河南贡氏' },
      { name: '河北鸡泽', lng: 114.87, lat: 36.95, period: '魏晋', reason: '广平贡氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '南朝', reason: '南渡江左' },
      { name: '浙江绍兴', lng: 120.58, lat: 30.03, period: '宋代', reason: '迁居会稽' },
    ],
    figures: [
      { name: '贡禹', dynasty: '西汉', achievement: '御史大夫，琅琊太守' },
      { name: '贡奎', dynasty: '元', achievement: '集贤直学士，文学家' },
      { name: '贡师道', dynasty: '元', achievement: '翰林学士' },
      { name: '贡祖文', dynasty: '南宋', achievement: '岳飞战友，知府' },
    ],
    totem: '贡字从贝从工，本义为献纳。图腾为周卫康叔后裔，象征职官后裔。',
    history: '贡姓源于姬姓，卫康叔后裔。广平贡氏为郡望，西汉贡禹为御史大夫。',
  },
  {
    surname: '劳',

    pinyin: 'Láo',

    rank: 295,

    populationRank: 300,

    population: 22,
    origin: '源于姬姓，周代劳人之后，以官为氏。亦出自秦代劳山之后，以地为氏。',
    originPlace: { name: '山东青岛', lng: 120.38, lat: 36.07 },
    originPeriod: '西周',
    junwang: [
      { name: '武阳郡', location: '河北大名', lng: 115.15, lat: 36.16, tanghao: '武阳堂' },
      { name: '松江郡', location: '上海松江', lng: 121.23, lat: 31.00, tanghao: '松江堂' },
    ],
    migration: [
      { name: '山东青岛', lng: 120.38, lat: 36.07, period: '西周', reason: '劳山后裔' },
      { name: '河北大名', lng: 115.15, lat: 36.16, period: '汉代', reason: '武阳劳氏' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '魏晋', reason: '仕宦中原' },
      { name: '上海松江', lng: 121.23, lat: 31.00, period: '宋代', reason: '松江劳氏' },
      { name: '广东广州', lng: 113.26, lat: 23.13, period: '明清', reason: '迁居岭南' },
    ],
    figures: [
      { name: '劳丙', dynasty: '汉', achievement: '名士，学者' },
      { name: '劳因', dynasty: '晋', achievement: '尚书郎' },
      { name: '劳湜', dynasty: '宋', achievement: '进士，循吏' },
      { name: '劳乃宣', dynasty: '清', achievement: '京师大学堂总监督' },
    ],
    totem: '劳字从力从荧省，本义为勤苦。图腾为劳山官署，象征职官后裔。',
    history: '劳姓源于姬姓，劳人之后。武阳劳氏为郡望，清代劳乃宣为京师大学堂总监督。',
  },
  {
    surname: '逄',

    pinyin: 'Páng',

    rank: 296,

    populationRank: 400,

    population: 8,
    origin: '源于姜姓，炎帝裔孙逄伯之后。亦出自商代逄国之后。亦出自夏代逄蒙之后。',
    originPlace: { name: '山东临淄', lng: 118.31, lat: 36.83 },
    originPeriod: '商代',
    junwang: [
      { name: '北海郡', location: '山东潍坊', lng: 119.16, lat: 36.71, tanghao: '北海堂' },
      { name: '谯郡', location: '安徽亳州', lng: 115.78, lat: 33.85, tanghao: '谯郡堂' },
    ],
    migration: [
      { name: '山东临淄', lng: 118.31, lat: 36.83, period: '商代', reason: '逄国封地' },
      { name: '山东潍坊', lng: 119.16, lat: 36.71, period: '汉代', reason: '北海逄氏' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '魏晋', reason: '仕宦中原' },
      { name: '安徽亳州', lng: 115.78, lat: 33.85, period: '唐代', reason: '谯郡逄氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南渡江左' },
    ],
    figures: [
      { name: '逄蒙', dynasty: '夏', achievement: '后羿弟子，善射' },
      { name: '逄安', dynasty: '东汉', achievement: '赤眉军将领' },
      { name: '逄尧', dynasty: '唐', achievement: '循吏，名臣' },
      { name: '逄振镳', dynasty: '清', achievement: '学者，文学家' },
    ],
    totem: '逄字从辵从夆，本义为相遇。图腾为逄伯后裔，象征姜姓后裔。',
    history: '逄姓源于姜姓，逄伯之后。北海逄氏为郡望，夏代逄蒙为善射手。',
  },
  {
    surname: '姬',

    pinyin: 'Jī',

    rank: 297,

    populationRank: 240,

    population: 38,
    origin: '源于姬姓，黄帝本姓姬，后裔以姓为氏。周王室本姓姬，后裔以国为氏。',
    originPlace: { name: '陕西宝鸡', lng: 107.24, lat: 34.36 },
    originPeriod: '上古',
    junwang: [
      { name: '南阳郡', location: '河南南阳', lng: 112.53, lat: 33.00, tanghao: '南阳堂' },
      { name: '寿春郡', location: '安徽寿县', lng: 116.79, lat: 32.57, tanghao: '寿春堂' },
    ],
    migration: [
      { name: '陕西宝鸡', lng: 107.24, lat: 34.36, period: '上古', reason: '黄帝后裔' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '周代', reason: '周王室后裔' },
      { name: '河南南阳', lng: 112.53, lat: 33.00, period: '汉代', reason: '南阳姬氏' },
      { name: '山东曲阜', lng: 116.98, lat: 35.58, period: '唐代', reason: '鲁国姬姓后裔' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南渡江左' },
    ],
    figures: [
      { name: '姬昌', dynasty: '商', achievement: '周文王，奠基周朝' },
      { name: '姬旦', dynasty: '西周', achievement: '周公，制礼作乐' },
      { name: '姬澹', dynasty: '北魏', achievement: '信义将军' },
      { name: '姬敏', dynasty: '明', achievement: '西安知府，循吏' },
    ],
    totem: '姬字从女从臣，本义为美女。图腾为黄帝本姓，象征华夏万姓之祖。',
    history: '姬姓源于黄帝，为华夏万姓之祖。南阳姬氏为郡望，周文王姬昌为奠基周朝。',
  },
  {
    surname: '申',

    pinyin: 'Shēn',

    rank: 298,

    populationRank: 130,

    population: 160,
    origin: '源于姜姓，炎帝后裔申吕之后。周代有申国，后裔以国为氏。亦出自楚大夫申氏。',
    originPlace: { name: '河南南阳', lng: 112.53, lat: 33.00 },
    originPeriod: '西周',
    junwang: [
      { name: '琅琊郡', location: '山东临沂', lng: 118.35, lat: 35.05, tanghao: '琅琊堂' },
      { name: '魏郡', location: '河北临漳', lng: 114.61, lat: 36.34, tanghao: '魏郡堂' },
    ],
    migration: [
      { name: '河南南阳', lng: 112.53, lat: 33.00, period: '西周', reason: '申国封地' },
      { name: '山东临沂', lng: 118.35, lat: 35.05, period: '汉代', reason: '琅琊申氏' },
      { name: '河北临漳', lng: 114.61, lat: 36.34, period: '魏晋', reason: '魏郡申氏' },
      { name: '山西太原', lng: 112.55, lat: 37.87, period: '唐代', reason: '迁居并州' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南渡江左' },
    ],
    figures: [
      { name: '申包胥', dynasty: '春秋', achievement: '楚国大夫，哭秦庭救楚' },
      { name: '申不害', dynasty: '战国', achievement: '韩国相，法家代表' },
      { name: '申恬', dynasty: '南朝宋', achievement: '青州刺史' },
      { name: '申时行', dynasty: '明', achievement: '内阁首辅，宰相' },
    ],
    totem: '申字象形，本义为闪电。图腾为申国炎帝后裔，象征姜姓之后。',
    history: '申姓源于姜姓，申国之后。琅琊申氏为郡望，春秋申包胥为哭秦庭救楚名臣。',
  },
  {
    surname: '扶',

    pinyin: 'Fú',

    rank: 299,

    populationRank: 360,

    population: 12,
    origin: '源于姬姓，周代扶人之后，以官为氏。亦出自汉代扶嘉之后。亦出自复姓扶伏所改。',
    originPlace: { name: '河南洛阳', lng: 112.45, lat: 34.62 },
    originPeriod: '西周',
    junwang: [
      { name: '京兆郡', location: '陕西西安', lng: 108.94, lat: 34.27, tanghao: '京兆堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '西周', reason: '扶人官署' },
      { name: '陕西西安', lng: 108.94, lat: 34.27, period: '汉代', reason: '京兆扶氏' },
      { name: '河南开封', lng: 114.31, lat: 34.80, period: '魏晋', reason: '迁居汴梁' },
      { name: '浙江杭州', lng: 120.16, lat: 30.27, period: '宋代', reason: '南迁临安' },
      { name: '江苏苏州', lng: 120.62, lat: 31.32, period: '明清', reason: '迁居江南' },
    ],
    figures: [
      { name: '扶嘉', dynasty: '汉', achievement: '廷尉，巴郡太守' },
      { name: '扶猛', dynasty: '北周', achievement: '大将军，少师' },
      { name: '扶克俭', dynasty: '明', achievement: '御史，名臣' },
      { name: '扶三纲', dynasty: '清', achievement: '画家，诗人' },
    ],
    totem: '扶字从手从夫，本义为扶持。图腾为周代扶人，象征职官后裔。',
    history: '扶姓源于姬姓，扶人之后。京兆扶氏为郡望，汉代扶嘉为廷尉。',
  },
  {
    surname: '堵',

    pinyin: 'Dǔ',

    rank: 300,

    populationRank: 410,

    population: 6,
    origin: '源于姬姓，春秋郑大夫堵叔之后，以字为氏。亦出自周代堵邑之后，以地为氏。',
    originPlace: { name: '河南新郑', lng: 113.74, lat: 34.40 },
    originPeriod: '春秋',
    junwang: [
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
      { name: '河东郡', location: '山西夏县', lng: 111.22, lat: 35.14, tanghao: '河东堂' },
    ],
    migration: [
      { name: '河南新郑', lng: 113.74, lat: 34.40, period: '春秋', reason: '堵叔封邑' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '汉代', reason: '河南堵氏' },
      { name: '山西夏县', lng: 111.22, lat: 35.14, period: '魏晋', reason: '河东堵氏' },
      { name: '江苏无锡', lng: 120.30, lat: 31.57, period: '宋代', reason: '南迁江南' },
      { name: '浙江绍兴', lng: 120.58, lat: 30.03, period: '明清', reason: '迁居会稽' },
    ],
    figures: [
      { name: '堵叔', dynasty: '春秋', achievement: '郑国大夫' },
      { name: '堵简', dynasty: '元', achievement: '诗人，画家' },
      { name: '堵允锡', dynasty: '南明', achievement: '大学士，忠臣' },
      { name: '堵霞', dynasty: '清', achievement: '女诗人，画家' },
    ],
    totem: '堵字从土从者，本义为墙垣。图腾为郑堵叔封邑，象征姬姓后裔。',
    history: '堵姓源于姬姓，堵叔之后。河南堵氏为郡望，南明堵允锡为忠臣。',
  },
  {
    surname: '冉',

    pinyin: 'Rǎn',

    rank: 301,

    populationRank: 162,

    population: 78,
    origin: '源于高辛氏，帝喾之后。又源于姬姓，周文王之后冉季载。',
    originPlace: { name: '河南鲁山', lng: 112.22, lat: 33.74 },
    originPeriod: '上古',
    junwang: [
      { name: '武陵郡', location: '湖南常德', lng: 111.69, lat: 29.04, tanghao: '武陵堂' },
      { name: '魏郡', location: '河北临漳', lng: 114.61, lat: 36.34, tanghao: '魏郡堂' },
    ],
    migration: [
      { name: '河南鲁山', lng: 112.22, lat: 33.74, period: '上古', reason: '帝喾后裔' },
      { name: '山东菏泽', lng: 115.48, lat: 35.24, period: '春秋', reason: '鲁国冉氏' },
      { name: '湖南常德', lng: 111.69, lat: 29.04, period: '汉代', reason: '武陵冉氏' },
      { name: '四川酉阳', lng: 108.77, lat: 28.84, period: '唐代', reason: '蛮酋冉氏' },
      { name: '湖北恩施', lng: 109.49, lat: 30.27, period: '明清', reason: '土司冉氏' },
    ],
    figures: [
      { name: '冉求', dynasty: '春秋', achievement: '孔子弟子，政事科' },
      { name: '冉伯牛', dynasty: '春秋', achievement: '孔子弟子，德行科' },
      { name: '冉闵', dynasty: '十六国', achievement: '魏国建立者' },
      { name: '冉觐祖', dynasty: '清', achievement: '理学家，著作等身' },
    ],
    totem: '冉字从冄，本义为毛柔弱下垂。图腾为帝喾后裔，象征华夏古老氏族。',
    history: '冉姓源于帝喾高辛氏，又出姬姓冉季载。武陵冉氏为郡望，孔子弟子冉求为名人。',
  },
  {
    surname: '宰',

    pinyin: 'Zǎi',

    rank: 302,

    populationRank: 350,

    population: 12,
    origin: '源于姬姓，周官太宰之后，以官为氏。又源于子姓，商太宰之后。',
    originPlace: { name: '河南洛阳', lng: 112.45, lat: 34.62 },
    originPeriod: '西周',
    junwang: [
      { name: '西河郡', location: '山西汾阳', lng: 111.78, lat: 37.27, tanghao: '西河堂' },
      { name: '鲁郡', location: '山东曲阜', lng: 116.98, lat: 35.58, tanghao: '鲁郡堂' },
    ],
    migration: [
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '西周', reason: '太宰官后' },
      { name: '山东曲阜', lng: 116.98, lat: 35.58, period: '春秋', reason: '鲁国宰氏' },
      { name: '山西汾阳', lng: 111.78, lat: 37.27, period: '汉代', reason: '西河宰氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南渡江左' },
      { name: '上海', lng: 121.47, lat: 31.23, period: '明清', reason: '迁居江南' },
    ],
    figures: [
      { name: '宰予', dynasty: '春秋', achievement: '孔子弟子，言语科' },
      { name: '宰罡', dynasty: '汉', achievement: '太守' },
      { name: '宰应文', dynasty: '明', achievement: '学者' },
      { name: '宰文焕', dynasty: '清', achievement: '循吏' },
    ],
    totem: '宰字从宀从辛，本义为官名。图腾为周太宰官后，象征以官为氏。',
    history: '宰姓源于姬姓，周太宰之后。西河宰氏为郡望，孔子弟子宰予为名人。',
  },
  {
    surname: '郦',

    pinyin: 'Lì',

    rank: 303,

    populationRank: 280,

    population: 28,
    origin: '源于姜姓，神农后裔。又源于姒姓，夏禹后裔封于郦。',
    originPlace: { name: '河南南阳', lng: 112.53, lat: 33.00 },
    originPeriod: '上古',
    junwang: [
      { name: '新安郡', location: '河南渑池', lng: 111.74, lat: 34.76, tanghao: '新安堂' },
      { name: '南阳郡', location: '河南南阳', lng: 112.53, lat: 33.00, tanghao: '南阳堂' },
    ],
    migration: [
      { name: '河南南阳', lng: 112.53, lat: 33.00, period: '上古', reason: '郦国封地' },
      { name: '河南渑池', lng: 111.74, lat: 34.76, period: '汉代', reason: '新安郦氏' },
      { name: '河北涿州', lng: 115.97, lat: 39.49, period: '魏晋', reason: '涿郡郦氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '浙江绍兴', lng: 120.58, lat: 30.03, period: '明清', reason: '迁居会稽' },
    ],
    figures: [
      { name: '郦食其', dynasty: '汉', achievement: '刘邦谋士，广野君' },
      { name: '郦商', dynasty: '汉', achievement: '曲周侯，名将' },
      { name: '郦道元', dynasty: '北魏', achievement: '《水经注》作者，地理学家' },
      { name: '郦权', dynasty: '金', achievement: '诗人，名士' },
    ],
    totem: '郦字从邑从丽，本义为地名。图腾为神农后裔封国，象征姜姓支脉。',
    history: '郦姓源于姜姓，神农后裔。新安郦氏为郡望，北魏郦道元著《水经注》传世。',
  },
  {
    surname: '雍',

    pinyin: 'Yōng',

    rank: 304,

    populationRank: 240,

    population: 38,
    origin: '源于姬姓，周文王第十三子雍伯之后。又源于姞姓，雍国之后。',
    originPlace: { name: '河南沁阳', lng: 112.93, lat: 35.09 },
    originPeriod: '西周',
    junwang: [
      { name: '京兆郡', location: '陕西西安', lng: 108.95, lat: 34.27, tanghao: '京兆堂' },
      { name: '平原郡', location: '山东平原', lng: 116.43, lat: 37.20, tanghao: '平原堂' },
    ],
    migration: [
      { name: '河南沁阳', lng: 112.93, lat: 35.09, period: '西周', reason: '雍伯封国' },
      { name: '陕西西安', lng: 108.95, lat: 34.27, period: '汉代', reason: '京兆雍氏' },
      { name: '山东平原', lng: 116.43, lat: 37.20, period: '魏晋', reason: '平原雍氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南渡江左' },
      { name: '四川成都', lng: 104.07, lat: 30.67, period: '明清', reason: '迁居蜀地' },
    ],
    figures: [
      { name: '雍齿', dynasty: '汉', achievement: '什方侯，汉初功臣' },
      { name: '雍陶', dynasty: '唐', achievement: '诗人，工部尚书' },
      { name: '雍泰', dynasty: '明', achievement: '宣府巡抚，清官' },
      { name: '雍正在', dynasty: '清', achievement: '学者，经学家' },
    ],
    totem: '雍字从水从隹，本义为池泽。图腾为雍伯封国，象征姬姓文王之后。',
    history: '雍姓源于姬姓，文王第十三子雍伯之后。京兆雍氏为郡望，汉初雍齿为功臣。',
  },
  {
    surname: '卻',

    pinyin: 'Xì',

    rank: 305,

    populationRank: 380,

    population: 8,
    origin: '源于姬姓，晋大夫却氏之后，以邑为氏。卻同郤，通用。',
    originPlace: { name: '山西乡宁', lng: 110.83, lat: 35.97 },
    originPeriod: '春秋',
    junwang: [
      { name: '济阴郡', location: '山东菏泽', lng: 115.48, lat: 35.24, tanghao: '济阴堂' },
      { name: '太原郡', location: '山西太原', lng: 112.55, lat: 37.87, tanghao: '太原堂' },
    ],
    migration: [
      { name: '山西乡宁', lng: 110.83, lat: 35.97, period: '春秋', reason: '晋却氏封邑' },
      { name: '山西太原', lng: 112.55, lat: 37.87, period: '战国', reason: '太原却氏' },
      { name: '山东菏泽', lng: 115.48, lat: 35.24, period: '汉代', reason: '济阴却氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南渡江左' },
      { name: '上海', lng: 121.47, lat: 31.23, period: '明清', reason: '迁居江南' },
    ],
    figures: [
      { name: '却至', dynasty: '春秋', achievement: '晋国大夫，步扬之后' },
      { name: '却犨', dynasty: '春秋', achievement: '晋国卿' },
      { name: '却克', dynasty: '春秋', achievement: '晋国中军将' },
      { name: '却正', dynasty: '三国', achievement: '蜀汉官员，学者' },
    ],
    totem: '卻字从卩从谷，本义为退却。图腾为晋却氏封邑，象征姬姓支脉。',
    history: '卻姓源于姬姓，晋却氏之后。济阴却氏为郡望，晋国却克为名将。',
  },
  {
    surname: '璩',

    pinyin: 'Qú',

    rank: 306,

    populationRank: 350,

    population: 12,
    origin: '源于姬姓，卫大夫蘧瑗之后，改蘧为璩。又源于玉工，以器为氏。',
    originPlace: { name: '河南长垣', lng: 114.67, lat: 35.20 },
    originPeriod: '春秋',
    junwang: [
      { name: '黎阳郡', location: '河南浚县', lng: 114.55, lat: 35.68, tanghao: '黎阳堂' },
      { name: '汲郡', location: '河南卫辉', lng: 114.06, lat: 35.40, tanghao: '汲郡堂' },
    ],
    migration: [
      { name: '河南长垣', lng: 114.67, lat: 35.20, period: '春秋', reason: '蘧瑗封地' },
      { name: '河南卫辉', lng: 114.06, lat: 35.40, period: '汉代', reason: '汲郡璩氏' },
      { name: '河南浚县', lng: 114.55, lat: 35.68, period: '魏晋', reason: '黎阳璩氏' },
      { name: '安徽桐城', lng: 116.95, lat: 31.05, period: '宋代', reason: '南迁桐城' },
      { name: '浙江绍兴', lng: 120.58, lat: 30.03, period: '明清', reason: '迁居会稽' },
    ],
    figures: [
      { name: '蘧瑗', dynasty: '春秋', achievement: '卫国大夫，孔子挚友' },
      { name: '璩光岳', dynasty: '唐', achievement: '秘书监，学者' },
      { name: '璩秉', dynasty: '明', achievement: '进士，循吏' },
      { name: '璩昆', dynasty: '清', achievement: '学者，经学家' },
    ],
    totem: '璩字从玉从豦，本义为玉环。图腾为蘧瑗之后，象征卫大夫后裔。',
    history: '璩姓源于姬姓，卫大夫蘧瑗之后改蘧为璩。黎阳璩氏为郡望，蘧瑗为孔子挚友。',
  },
  {
    surname: '桑',

    pinyin: 'Sāng',

    rank: 307,

    populationRank: 180,

    population: 65,
    origin: '源于穷桑氏，少昊之后。又源于姬姓，周秦穆公大夫桑后之后。',
    originPlace: { name: '山东曲阜', lng: 116.98, lat: 35.58 },
    originPeriod: '上古',
    junwang: [
      { name: '黎阳郡', location: '河南浚县', lng: 114.55, lat: 35.68, tanghao: '黎阳堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '山东曲阜', lng: 116.98, lat: 35.58, period: '上古', reason: '少昊穷桑' },
      { name: '陕西西安', lng: 108.95, lat: 34.27, period: '春秋', reason: '秦国桑氏' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '汉代', reason: '河南桑氏' },
      { name: '河南浚县', lng: 114.55, lat: 35.68, period: '魏晋', reason: '黎阳桑氏' },
      { name: '江苏苏州', lng: 120.62, lat: 31.30, period: '明清', reason: '迁居江南' },
    ],
    figures: [
      { name: '桑弘羊', dynasty: '汉', achievement: '御史大夫，理财家' },
      { name: '桑维翰', dynasty: '五代', achievement: '后晋宰相' },
      { name: '桑悦', dynasty: '明', achievement: '学者，思想家' },
      { name: '桑调元', dynasty: '清', achievement: '理学家，藏书家' },
    ],
    totem: '桑字从木叒，本义为桑树。图腾为少昊穷桑氏，象征上古氏族。',
    history: '桑姓源于穷桑氏，少昊之后。黎阳桑氏为郡望，汉桑弘羊为理财家。',
  },
  {
    surname: '桂',

    pinyin: 'Guì',

    rank: 308,

    populationRank: 190,

    population: 55,
    origin: '源于姬姓，鲁季氏之后，避汉景帝讳改桂。又源于匈奴，归明改桂。',
    originPlace: { name: '山东曲阜', lng: 116.98, lat: 35.58 },
    originPeriod: '汉代',
    junwang: [
      { name: '天水郡', location: '甘肃天水', lng: 105.72, lat: 34.58, tanghao: '天水堂' },
      { name: '幽州郡', location: '北京', lng: 116.40, lat: 39.90, tanghao: '幽州堂' },
    ],
    migration: [
      { name: '山东曲阜', lng: 116.98, lat: 35.58, period: '汉代', reason: '鲁季氏后' },
      { name: '甘肃天水', lng: 105.72, lat: 34.58, period: '汉代', reason: '天水桂氏' },
      { name: '河北北京', lng: 116.40, lat: 39.90, period: '魏晋', reason: '幽州桂氏' },
      { name: '江西景德镇', lng: 117.18, lat: 29.27, period: '宋代', reason: '南迁江西' },
      { name: '湖北武汉', lng: 114.31, lat: 30.59, period: '明清', reason: '迁居荆楚' },
    ],
    figures: [
      { name: '桂萼', dynasty: '明', achievement: '礼部尚书，大礼议功臣' },
      { name: '桂彦良', dynasty: '明', achievement: '晋王傅，学者' },
      { name: '桂文灿', dynasty: '清', achievement: '经学家，著述等身' },
      { name: '桂馥', dynasty: '清', achievement: '学者，文字学家' },
    ],
    totem: '桂字从木圭，本义为桂树。图腾为鲁季氏之后，象征避讳改姓。',
    history: '桂姓源于姬姓，鲁季氏之后避汉讳改。天水桂氏为郡望，明桂萼为大礼议功臣。',
  },
  {
    surname: '濮',

    pinyin: 'Pú',

    rank: 309,

    populationRank: 300,

    population: 22,
    origin: '源于姬姓，卫大夫濮水之后。又源于地名，以水为氏。',
    originPlace: { name: '河南濮阳', lng: 115.03, lat: 35.76 },
    originPeriod: '春秋',
    junwang: [
      { name: '鲁郡', location: '山东曲阜', lng: 116.98, lat: 35.58, tanghao: '鲁郡堂' },
      { name: '东平郡', location: '山东东平', lng: 116.30, lat: 35.91, tanghao: '东平堂' },
    ],
    migration: [
      { name: '河南濮阳', lng: 115.03, lat: 35.76, period: '春秋', reason: '濮水地望' },
      { name: '山东曲阜', lng: 116.98, lat: 35.58, period: '汉代', reason: '鲁郡濮氏' },
      { name: '山东东平', lng: 116.30, lat: 35.91, period: '魏晋', reason: '东平濮氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南渡江左' },
      { name: '安徽桐城', lng: 116.95, lat: 31.05, period: '明清', reason: '迁居桐城' },
    ],
    figures: [
      { name: '濮孟阳', dynasty: '明', achievement: '兵部主事，循吏' },
      { name: '濮巷', dynasty: '明', achievement: '学者' },
      { name: '濮本汉', dynasty: '清', achievement: '画家' },
      { name: '濮久', dynasty: '清', achievement: '诗人' },
    ],
    totem: '濮字从水仆，本义为水名。图腾为濮水地望，象征卫大夫后裔。',
    history: '濮姓源于姬姓，卫大夫濮水之后。鲁郡濮氏为郡望，明濮孟阳为循吏。',
  },
  {
    surname: '牛',

    pinyin: 'Niú',

    rank: 310,

    populationRank: 113,

    population: 180,
    origin: '源于子姓，宋微子之后牛父。又源于姬姓，周牛父之后。',
    originPlace: { name: '河南商丘', lng: 115.65, lat: 34.44 },
    originPeriod: '春秋',
    junwang: [
      { name: '陇西郡', location: '甘肃临洮', lng: 103.86, lat: 35.37, tanghao: '陇西堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '河南商丘', lng: 115.65, lat: 34.44, period: '春秋', reason: '宋微子后' },
      { name: '甘肃临洮', lng: 103.86, lat: 35.37, period: '汉代', reason: '陇西牛氏' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '魏晋', reason: '河南牛氏' },
      { name: '山西太原', lng: 112.55, lat: 37.87, period: '唐代', reason: '太原牛氏' },
      { name: '湖南长沙', lng: 112.94, lat: 28.23, period: '明清', reason: '迁居湖南' },
    ],
    figures: [
      { name: '牛弘', dynasty: '隋', achievement: '吏部尚书，奇章公' },
      { name: '牛僧孺', dynasty: '唐', achievement: '宰相，牛李党争领袖' },
      { name: '牛皋', dynasty: '宋', achievement: '抗金名将' },
      { name: '牛鉴', dynasty: '清', achievement: '两江总督' },
    ],
    totem: '牛字象形，本义为家畜。图腾为宋微子后牛父，象征以名为氏。',
    history: '牛姓源于子姓，宋微子之后牛父。陇西牛氏为郡望，隋牛弘为名臣。',
  },
  {
    surname: '寿',

    pinyin: 'Shòu',

    rank: 311,

    populationRank: 320,

    population: 18,
    origin: '源于姬姓，吴王寿梦之后，以名为氏。又源于地名，以地为氏。',
    originPlace: { name: '江苏苏州', lng: 120.62, lat: 31.30 },
    originPeriod: '春秋',
    junwang: [
      { name: '京兆郡', location: '陕西西安', lng: 108.95, lat: 34.27, tanghao: '京兆堂' },
      { name: '会稽郡', location: '浙江绍兴', lng: 120.58, lat: 30.03, tanghao: '会稽堂' },
    ],
    migration: [
      { name: '江苏苏州', lng: 120.62, lat: 31.30, period: '春秋', reason: '吴王寿梦' },
      { name: '陕西西安', lng: 108.95, lat: 34.27, period: '汉代', reason: '京兆寿氏' },
      { name: '浙江绍兴', lng: 120.58, lat: 30.03, period: '魏晋', reason: '会稽寿氏' },
      { name: '山东济南', lng: 117.00, lat: 36.65, period: '宋代', reason: '迁居齐鲁' },
      { name: '上海', lng: 121.47, lat: 31.23, period: '明清', reason: '迁居江南' },
    ],
    figures: [
      { name: '寿梦', dynasty: '春秋', achievement: '吴国国君，称王' },
      { name: '寿良', dynasty: '汉', achievement: '学者，博通经史' },
      { name: '寿宁', dynasty: '元', achievement: '高僧，诗人' },
      { name: '寿富', dynasty: '清', achievement: '翰林院编修，忠节' },
    ],
    totem: '寿字从老省，本义为长久。图腾为吴王寿梦，象征姬姓吴国后裔。',
    history: '寿姓源于姬姓，吴王寿梦之后。京兆寿氏为郡望，春秋寿梦为吴国称王之始。',
  },
  {
    surname: '通',

    pinyin: 'Tōng',

    rank: 312,

    populationRank: 340,

    population: 14,
    origin: '源于姬姓，燕大夫通之后。又源于彻侯，避汉武帝讳改彻为通。',
    originPlace: { name: '北京', lng: 116.40, lat: 39.90 },
    originPeriod: '春秋',
    junwang: [
      { name: '西河郡', location: '山西汾阳', lng: 111.78, lat: 37.27, tanghao: '西河堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '北京', lng: 116.40, lat: 39.90, period: '春秋', reason: '燕国通氏' },
      { name: '山西汾阳', lng: 111.78, lat: 37.27, period: '汉代', reason: '西河通氏' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '魏晋', reason: '河南通氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南渡江左' },
      { name: '上海', lng: 121.47, lat: 31.23, period: '明清', reason: '迁居江南' },
    ],
    figures: [
      { name: '通辩', dynasty: '唐', achievement: '高僧，佛学家' },
      { name: '通复', dynasty: '明', achievement: '高僧，诗人' },
      { name: '通润', dynasty: '明', achievement: '高僧，书法家' },
      { name: '通泰', dynasty: '清', achievement: '循吏' },
    ],
    totem: '通字从辵从甬，本义为通达。图腾为燕大夫后，象征姬姓燕国支脉。',
    history: '通姓源于姬姓，燕大夫之后。西河通氏为郡望，避汉武帝讳改彻为通。',
  },
  {
    surname: '边',

    pinyin: 'Biān',

    rank: 313,

    populationRank: 200,

    population: 50,
    origin: '源于子姓，宋平公子边之后。又源于姬姓，卫公子边之后。',
    originPlace: { name: '河南商丘', lng: 115.65, lat: 34.44 },
    originPeriod: '春秋',
    junwang: [
      { name: '陈留郡', location: '河南开封', lng: 114.31, lat: 34.80, tanghao: '陈留堂' },
      { name: '陇西郡', location: '甘肃临洮', lng: 103.86, lat: 35.37, tanghao: '陇西堂' },
    ],
    migration: [
      { name: '河南商丘', lng: 115.65, lat: 34.44, period: '春秋', reason: '宋平公子边' },
      { name: '河南开封', lng: 114.31, lat: 34.80, period: '汉代', reason: '陈留边氏' },
      { name: '甘肃临洮', lng: 103.86, lat: 35.37, period: '魏晋', reason: '陇西边氏' },
      { name: '陕西西安', lng: 108.95, lat: 34.27, period: '唐代', reason: '京兆边氏' },
      { name: '河北任丘', lng: 116.10, lat: 38.71, period: '明清', reason: '迁居河间' },
    ],
    figures: [
      { name: '边韶', dynasty: '汉', achievement: '文学家，尚书' },
      { name: '边让', dynasty: '汉', achievement: '九江太守，名士' },
      { name: '边鸾', dynasty: '唐', achievement: '画家，花鸟画之祖' },
      { name: '边贡', dynasty: '明', achievement: '文学家，前七子之一' },
    ],
    totem: '边字从辵从边，本义为边缘。图腾为宋平公子边，象征子姓宋国后裔。',
    history: '边姓源于子姓，宋平公子边之后。陈留边氏为郡望，唐边鸾为花鸟画之祖。',
  },
  {
    surname: '扈',

    pinyin: 'Hù',

    rank: 314,

    populationRank: 360,

    population: 10,
    origin: '源于姒姓，夏有扈氏之后。又源于地名，以地为氏。',
    originPlace: { name: '陕西户县', lng: 108.61, lat: 34.11 },
    originPeriod: '夏代',
    junwang: [
      { name: '京兆郡', location: '陕西西安', lng: 108.95, lat: 34.27, tanghao: '京兆堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '陕西户县', lng: 108.61, lat: 34.11, period: '夏代', reason: '有扈氏封地' },
      { name: '陕西西安', lng: 108.95, lat: 34.27, period: '汉代', reason: '京兆扈氏' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '魏晋', reason: '河南扈氏' },
      { name: '河北涿州', lng: 115.97, lat: 39.49, period: '唐代', reason: '涿郡扈氏' },
      { name: '山东济南', lng: 117.00, lat: 36.65, period: '明清', reason: '迁居齐鲁' },
    ],
    figures: [
      { name: '扈辄', dynasty: '战国', achievement: '赵国将领' },
      { name: '扈载', dynasty: '五代', achievement: '翰林学士，文学家' },
      { name: '扈再兴', dynasty: '宋', achievement: '抗金将领' },
      { name: '扈尔汉', dynasty: '清', achievement: '满洲镶黄旗大臣' },
    ],
    totem: '扈字从邑从户，本义为地名。图腾为夏有扈氏，象征姒姓夏后氏支脉。',
    history: '扈姓源于姒姓，夏有扈氏之后。京兆扈氏为郡望，五代扈载为翰林学士。',
  },
  {
    surname: '燕',

    pinyin: 'Yān',

    rank: 315,

    populationRank: 240,

    population: 38,
    origin: '源于姬姓，召公奭封于燕，后裔以国为氏。又源于姞姓，南燕国之后。',
    originPlace: { name: '北京', lng: 116.40, lat: 39.90 },
    originPeriod: '西周',
    junwang: [
      { name: '范阳郡', location: '河北涿州', lng: 115.97, lat: 39.49, tanghao: '范阳堂' },
      { name: '上谷郡', location: '河北易县', lng: 115.50, lat: 39.35, tanghao: '上谷堂' },
    ],
    migration: [
      { name: '北京', lng: 116.40, lat: 39.90, period: '西周', reason: '召公奭封燕' },
      { name: '河北涿州', lng: 115.97, lat: 39.49, period: '汉代', reason: '范阳燕氏' },
      { name: '河北易县', lng: 115.50, lat: 39.35, period: '魏晋', reason: '上谷燕氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南渡江左' },
      { name: '湖北武汉', lng: 114.31, lat: 30.59, period: '明清', reason: '迁居荆楚' },
    ],
    figures: [
      { name: '燕丹', dynasty: '战国', achievement: '燕太子丹，谋刺秦王' },
      { name: '燕肃', dynasty: '宋', achievement: '龙图阁直学士，科学家' },
      { name: '燕达', dynasty: '宋', achievement: '名将，节度使' },
      { name: '燕忠', dynasty: '明', achievement: '工部尚书' },
    ],
    totem: '燕字象形，本义为玄鸟。图腾为召公奭封燕，象征姬姓周室支脉。',
    history: '燕姓源于姬姓，召公奭封燕。范阳燕氏为郡望，战国燕太子丹谋刺秦王。',
  },
  {
    surname: '冀',

    pinyin: 'Jì',

    rank: 316,

    populationRank: 280,

    population: 28,
    origin: '源于姬姓，晋大夫冀芮之后。又源于地名，以地为氏。',
    originPlace: { name: '山西河津', lng: 110.71, lat: 35.59 },
    originPeriod: '春秋',
    junwang: [
      { name: '渤海郡', location: '河北沧州', lng: 116.84, lat: 38.31, tanghao: '渤海堂' },
      { name: '太原郡', location: '山西太原', lng: 112.55, lat: 37.87, tanghao: '太原堂' },
    ],
    migration: [
      { name: '山西河津', lng: 110.71, lat: 35.59, period: '春秋', reason: '冀芮封邑' },
      { name: '山西太原', lng: 112.55, lat: 37.87, period: '汉代', reason: '太原冀氏' },
      { name: '河北沧州', lng: 116.84, lat: 38.31, period: '魏晋', reason: '渤海冀氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南渡江左' },
      { name: '山东平原', lng: 116.43, lat: 37.20, period: '明清', reason: '迁居齐鲁' },
    ],
    figures: [
      { name: '冀芮', dynasty: '春秋', achievement: '晋国大夫' },
      { name: '冀俊', dynasty: '北周', achievement: '骠骑大将军，书法家' },
      { name: '冀绮', dynasty: '明', achievement: '兵部尚书' },
      { name: '冀如锡', dynasty: '清', achievement: '工部侍郎，循吏' },
    ],
    totem: '冀字从北异声，本义为北方。图腾为晋冀芮封邑，象征姬姓晋国支脉。',
    history: '冀姓源于姬姓，晋大夫冀芮之后。渤海冀氏为郡望，北周冀俊为书法家。',
  },
  {
    surname: '郏',

    pinyin: 'Jiá',

    rank: 317,

    populationRank: 370,

    population: 9,
    origin: '源于姬姓，郑郏邑之后，以邑为氏。又源于姜姓，齐郏氏之后。',
    originPlace: { name: '河南郏县', lng: 113.21, lat: 34.04 },
    originPeriod: '春秋',
    junwang: [
      { name: '武陵郡', location: '湖南常德', lng: 111.69, lat: 29.04, tanghao: '武陵堂' },
      { name: '荥阳郡', location: '河南荥阳', lng: 113.39, lat: 34.79, tanghao: '荥阳堂' },
    ],
    migration: [
      { name: '河南郏县', lng: 113.21, lat: 34.04, period: '春秋', reason: '郑郏邑后' },
      { name: '河南荥阳', lng: 113.39, lat: 34.79, period: '汉代', reason: '荥阳郏氏' },
      { name: '湖南常德', lng: 111.69, lat: 29.04, period: '魏晋', reason: '武陵郏氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南渡江左' },
      { name: '上海', lng: 121.47, lat: 31.23, period: '明清', reason: '迁居江南' },
    ],
    figures: [
      { name: '郏亶', dynasty: '宋', achievement: '水利家，治水专家' },
      { name: '郏侨', dynasty: '宋', achievement: '郏亶之子，水利家' },
      { name: '郏鼎', dynasty: '明', achievement: '进士，循吏' },
      { name: '郏抡元', dynasty: '清', achievement: '学者' },
    ],
    totem: '郏字从邑从夹，本义为地名。图腾为郑郏邑后，象征姬姓郑国支脉。',
    history: '郏姓源于姬姓，郑郏邑之后。荥阳郏氏为郡望，宋郏亶为水利家。',
  },
  {
    surname: '浦',

    pinyin: 'Pǔ',

    rank: 318,

    populationRank: 330,

    population: 16,
    origin: '源于姜姓，齐太公之后浦氏。又源于地名，以水为氏。',
    originPlace: { name: '山东淄博', lng: 118.05, lat: 36.78 },
    originPeriod: '春秋',
    junwang: [
      { name: '京兆郡', location: '陕西西安', lng: 108.95, lat: 34.27, tanghao: '京兆堂' },
      { name: '豫章郡', location: '江西南昌', lng: 115.89, lat: 28.68, tanghao: '豫章堂' },
    ],
    migration: [
      { name: '山东淄博', lng: 118.05, lat: 36.78, period: '春秋', reason: '齐太公后' },
      { name: '陕西西安', lng: 108.95, lat: 34.27, period: '汉代', reason: '京兆浦氏' },
      { name: '江西南昌', lng: 115.89, lat: 28.68, period: '魏晋', reason: '豫章浦氏' },
      { name: '江苏苏州', lng: 120.62, lat: 31.30, period: '宋代', reason: '迁居江南' },
      { name: '上海', lng: 121.47, lat: 31.23, period: '明清', reason: '迁居松江' },
    ],
    figures: [
      { name: '浦源', dynasty: '明', achievement: '诗人，画家' },
      { name: '浦瑾', dynasty: '明', achievement: '进士，学者' },
      { name: '浦南金', dynasty: '明', achievement: '诗人' },
      { name: '浦起龙', dynasty: '清', achievement: '学者，著述家' },
    ],
    totem: '浦字从水甫，本义为水滨。图腾为齐太公后，象征姜姓齐国支脉。',
    history: '浦姓源于姜姓，齐太公之后。京兆浦氏为郡望，明浦源为诗人画家。',
  },
  {
    surname: '尚',

    pinyin: 'Shàng',

    rank: 319,

    populationRank: 140,

    population: 120,
    origin: '源于姜姓，齐太公尚父之后。又源于姬姓，周尚父之后。',
    originPlace: { name: '山东淄博', lng: 118.05, lat: 36.78 },
    originPeriod: '西周',
    junwang: [
      { name: '京兆郡', location: '陕西西安', lng: 108.95, lat: 34.27, tanghao: '京兆堂' },
      { name: '清河郡', location: '河北清河', lng: 115.67, lat: 37.07, tanghao: '清河堂' },
    ],
    migration: [
      { name: '山东淄博', lng: 118.05, lat: 36.78, period: '西周', reason: '齐太公尚父' },
      { name: '陕西西安', lng: 108.95, lat: 34.27, period: '汉代', reason: '京兆尚氏' },
      { name: '河北清河', lng: 115.67, lat: 37.07, period: '魏晋', reason: '清河尚氏' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '唐代', reason: '河南尚氏' },
      { name: '山西太原', lng: 112.55, lat: 37.87, period: '明清', reason: '迁居三晋' },
    ],
    figures: [
      { name: '尚可喜', dynasty: '清', achievement: '平南王，三藩之一' },
      { name: '尚让', dynasty: '唐', achievement: '黄巢起义军大将' },
      { name: '尚结息', dynasty: '唐', achievement: '吐蕃宰相' },
      { name: '尚云祥', dynasty: '清', achievement: '形意拳大师' },
    ],
    totem: '尚字从八从冂，本义为尊崇。图腾为齐太公尚父，象征姜姓齐国始祖。',
    history: '尚姓源于姜姓，齐太公尚父之后。京兆尚氏为郡望，清尚可喜为平南王。',
  },
  {
    surname: '农',

    pinyin: 'Nóng',

    rank: 320,

    populationRank: 200,

    population: 50,
    origin: '源于神农氏，炎帝之后。又源于官名，周官农正之后。',
    originPlace: { name: '湖南炎陵', lng: 113.78, lat: 26.49 },
    originPeriod: '上古',
    junwang: [
      { name: '雁门郡', location: '山西代县', lng: 112.96, lat: 39.07, tanghao: '雁门堂' },
      { name: '钦州郡', location: '广西钦州', lng: 108.62, lat: 21.95, tanghao: '钦州堂' },
    ],
    migration: [
      { name: '湖南炎陵', lng: 113.78, lat: 26.49, period: '上古', reason: '神农炎帝' },
      { name: '山西代县', lng: 112.96, lat: 39.07, period: '汉代', reason: '雁门农氏' },
      { name: '广西钦州', lng: 108.62, lat: 21.95, period: '唐代', reason: '钦州农氏' },
      { name: '广东广州', lng: 113.27, lat: 23.13, period: '宋代', reason: '岭南农氏' },
      { name: '广西南宁', lng: 108.37, lat: 22.82, period: '明清', reason: '壮族农氏' },
    ],
    figures: [
      { name: '农益', dynasty: '明', achievement: '翰林院编修' },
      { name: '农志科', dynasty: '明', achievement: '进士，循吏' },
      { name: '农起', dynasty: '清', achievement: '布政使，循吏' },
      { name: '农劲荪', dynasty: '清末', achievement: '革命家，同盟会成员' },
    ],
    totem: '农字从辰从林，本义为耕作。图腾为神农炎帝，象征农耕文明始祖。',
    history: '农姓源于神农氏，炎帝之后。雁门农氏为郡望，主要聚居于岭南壮族地区。',
  },
  {
    surname: '温',

    pinyin: 'Wēn',

    rank: 321,

    populationRank: 100,

    population: 210,
    origin: '源于姬姓，唐叔虞之后温伯。又源于己姓，温国之后。',
    originPlace: { name: '河南温县', lng: 113.08, lat: 34.95 },
    originPeriod: '西周',
    junwang: [
      { name: '太原郡', location: '山西太原', lng: 112.55, lat: 37.87, tanghao: '太原堂' },
      { name: '汲郡', location: '河南卫辉', lng: 114.06, lat: 35.40, tanghao: '汲郡堂' },
    ],
    migration: [
      { name: '河南温县', lng: 113.08, lat: 34.95, period: '西周', reason: '唐叔虞后温伯' },
      { name: '山西太原', lng: 112.55, lat: 37.87, period: '汉代', reason: '太原温氏' },
      { name: '河南卫辉', lng: 114.06, lat: 35.40, period: '魏晋', reason: '汲郡温氏' },
      { name: '广东梅州', lng: 116.12, lat: 24.29, period: '宋代', reason: '客家温氏' },
      { name: '福建泉州', lng: 118.58, lat: 24.93, period: '明清', reason: '迁居闽南' },
    ],
    figures: [
      { name: '温峤', dynasty: '晋', achievement: '江州刺史，忠武公' },
      { name: '温庭筠', dynasty: '唐', achievement: '花间派词人代表' },
      { name: '温体仁', dynasty: '明', achievement: '内阁首辅' },
      { name: '温睿临', dynasty: '清', achievement: '史学家' },
    ],
    totem: '温字从水从昷，本义为暖水。图腾为唐叔虞后温伯，象征姬姓晋国支脉。',
    history: '温姓源于姬姓，唐叔虞之后温伯。太原温氏为郡望，唐温庭筠为花间词派代表。',
  },
  {
    surname: '别',

    pinyin: 'Bié',

    rank: 322,

    populationRank: 320,

    population: 18,
    origin: '源于姬姓，周官别将之后。又源于地名，以地为氏。',
    originPlace: { name: '陕西西安', lng: 108.95, lat: 34.27 },
    originPeriod: '西周',
    junwang: [
      { name: '京兆郡', location: '陕西西安', lng: 108.95, lat: 34.27, tanghao: '京兆堂' },
      { name: '天水郡', location: '甘肃天水', lng: 105.72, lat: 34.58, tanghao: '天水堂' },
    ],
    migration: [
      { name: '陕西西安', lng: 108.95, lat: 34.27, period: '西周', reason: '周别将后' },
      { name: '甘肃天水', lng: 105.72, lat: 34.58, period: '汉代', reason: '天水别氏' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '魏晋', reason: '河南别氏' },
      { name: '湖北武汉', lng: 114.31, lat: 30.59, period: '宋代', reason: '迁居荆楚' },
      { name: '四川成都', lng: 104.07, lat: 30.67, period: '明清', reason: '迁居蜀地' },
    ],
    figures: [
      { name: '别之杰', dynasty: '宋', achievement: '京湖制置使，抗蒙将领' },
      { name: '别敦', dynasty: '明', achievement: '进士，循吏' },
      { name: '别楷', dynasty: '明', achievement: '学者' },
      { name: '别文榽', dynasty: '清', achievement: '诗人' },
    ],
    totem: '别字从口从刂，本义为分离。图腾为周别将后，象征以官为氏。',
    history: '别姓源于姬姓，周官别将之后。京兆别氏为郡望，宋别之杰为抗蒙将领。',
  },
  {
    surname: '庄',

    pinyin: 'Zhuāng',

    rank: 323,

    populationRank: 113,

    population: 180,
    origin: '源于芈姓，楚庄王之后，以谥为氏。又源于姬姓，鲁庄公之后。',
    originPlace: { name: '湖北荆州', lng: 112.24, lat: 30.33 },
    originPeriod: '春秋',
    junwang: [
      { name: '天水郡', location: '甘肃天水', lng: 105.72, lat: 34.58, tanghao: '天水堂' },
      { name: '会稽郡', location: '浙江绍兴', lng: 120.58, lat: 30.03, tanghao: '会稽堂' },
    ],
    migration: [
      { name: '湖北荆州', lng: 112.24, lat: 30.33, period: '春秋', reason: '楚庄王后' },
      { name: '甘肃天水', lng: 105.72, lat: 34.58, period: '汉代', reason: '天水庄氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '魏晋', reason: '南迁江左' },
      { name: '福建泉州', lng: 118.58, lat: 24.93, period: '宋代', reason: '迁居闽南' },
      { name: '广东潮州', lng: 116.63, lat: 23.68, period: '明清', reason: '潮汕庄氏' },
    ],
    figures: [
      { name: '庄子', dynasty: '战国', achievement: '哲学家，道家代表' },
      { name: '庄周', dynasty: '战国', achievement: '即庄子，著《庄子》' },
      { name: '庄夏', dynasty: '宋', achievement: '兵部侍郎，著述家' },
      { name: '庄有恭', dynasty: '清', achievement: '状元，江苏巡抚' },
    ],
    totem: '庄字从广从土，本义为庄院。图腾为楚庄王后，象征芈姓楚国后裔。',
    history: '庄姓源于芈姓，楚庄王之后。天水庄氏为郡望，战国庄子为道家代表。',
  },
  {
    surname: '晏',

    pinyin: 'Yàn',

    rank: 324,

    populationRank: 180,

    population: 65,
    origin: '源于姜姓，齐晏婴之后。又源于姬姓，鲁晏氏之后。',
    originPlace: { name: '山东淄博', lng: 118.05, lat: 36.78 },
    originPeriod: '春秋',
    junwang: [
      { name: '齐郡', location: '山东淄博', lng: 118.05, lat: 36.78, tanghao: '齐郡堂' },
      { name: '临川郡', location: '江西抚州', lng: 116.36, lat: 27.95, tanghao: '临川堂' },
    ],
    migration: [
      { name: '山东淄博', lng: 118.05, lat: 36.78, period: '春秋', reason: '齐晏婴后' },
      { name: '江西抚州', lng: 116.36, lat: 27.95, period: '汉代', reason: '临川晏氏' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '魏晋', reason: '河南晏氏' },
      { name: '四川成都', lng: 104.07, lat: 30.67, period: '宋代', reason: '迁居蜀地' },
      { name: '湖南长沙', lng: 112.94, lat: 28.23, period: '明清', reason: '迁居湖南' },
    ],
    figures: [
      { name: '晏婴', dynasty: '春秋', achievement: '齐相，晏子春秋作者' },
      { name: '晏殊', dynasty: '宋', achievement: '宰相，词人' },
      { name: '晏几道', dynasty: '宋', achievement: '词人，小晏' },
      { name: '晏端书', dynasty: '清', achievement: '两广总督' },
    ],
    totem: '晏字从日从安，本义为晚。图腾为齐晏婴后，象征姜姓齐国支脉。',
    history: '晏姓源于姜姓，齐晏婴之后。齐郡晏氏为郡望，宋晏殊为宰相词人。',
  },
  {
    surname: '柴',

    pinyin: 'Chái',

    rank: 325,

    populationRank: 130,

    population: 140,
    origin: '源于姜姓，齐太公后高柴之后。又源于姬姓，鲁柴氏之后。',
    originPlace: { name: '山东淄博', lng: 118.05, lat: 36.78 },
    originPeriod: '春秋',
    junwang: [
      { name: '平阳郡', location: '山西临汾', lng: 111.52, lat: 36.08, tanghao: '平阳堂' },
      { name: '寿春郡', location: '安徽寿县', lng: 116.79, lat: 32.57, tanghao: '寿春堂' },
    ],
    migration: [
      { name: '山东淄博', lng: 118.05, lat: 36.78, period: '春秋', reason: '高柴之后' },
      { name: '山西临汾', lng: 111.52, lat: 36.08, period: '汉代', reason: '平阳柴氏' },
      { name: '安徽寿县', lng: 116.79, lat: 32.57, period: '魏晋', reason: '寿春柴氏' },
      { name: '浙江杭州', lng: 120.16, lat: 30.27, period: '宋代', reason: '迁居钱塘' },
      { name: '河北邢台', lng: 114.50, lat: 37.07, period: '明清', reason: '迁居燕赵' },
    ],
    figures: [
      { name: '柴荣', dynasty: '五代', achievement: '后周世宗，明君' },
      { name: '柴绍', dynasty: '唐', achievement: '霍国公，凌烟阁功臣' },
      { name: '柴车', dynasty: '明', achievement: '兵部尚书' },
      { name: '柴大纪', dynasty: '清', achievement: '台湾总兵，抗林爽文' },
    ],
    totem: '柴字从木从此，本义为柴火。图腾为高柴之后，象征姜姓齐国支脉。',
    history: '柴姓源于姜姓，高柴之后。平阳柴氏为郡望，后周世宗柴荣为明君。',
  },
  {
    surname: '瞿',

    pinyin: 'Qú',

    rank: 326,

    populationRank: 200,

    population: 50,
    origin: '源于姬姓，商瞿之后。又源于地名，以地为氏。',
    originPlace: { name: '河南商丘', lng: 115.65, lat: 34.44 },
    originPeriod: '春秋',
    junwang: [
      { name: '松阳郡', location: '浙江松阳', lng: 119.48, lat: 28.45, tanghao: '松阳堂' },
      { name: '京兆郡', location: '陕西西安', lng: 108.95, lat: 34.27, tanghao: '京兆堂' },
    ],
    migration: [
      { name: '河南商丘', lng: 115.65, lat: 34.44, period: '春秋', reason: '商瞿之后' },
      { name: '陕西西安', lng: 108.95, lat: 34.27, period: '汉代', reason: '京兆瞿氏' },
      { name: '浙江松阳', lng: 119.48, lat: 28.45, period: '魏晋', reason: '松阳瞿氏' },
      { name: '江苏苏州', lng: 120.62, lat: 31.30, period: '宋代', reason: '迁居江南' },
      { name: '上海', lng: 121.47, lat: 31.23, period: '明清', reason: '迁居松江' },
    ],
    figures: [
      { name: '商瞿', dynasty: '春秋', achievement: '孔子弟子，传易学' },
      { name: '瞿佑', dynasty: '明', achievement: '文学家，《剪灯新话》作者' },
      { name: '瞿景淳', dynasty: '明', achievement: '翰林院编修，会元' },
      { name: '瞿鸿禨', dynasty: '清', achievement: '军机大臣，外务部尚书' },
    ],
    totem: '瞿字从目从隹，本义为鹰隼之视。图腾为商瞿之后，象征孔子弟子后裔。',
    history: '瞿姓源于姬姓，商瞿之后。松阳瞿氏为郡望，明瞿佑著《剪灯新话》。',
  },
  {
    surname: '阎',

    pinyin: 'Yán',

    rank: 327,

    populationRank: 75,

    population: 340,
    origin: '源于姬姓，太伯之后阎乡。又源于芈姓，楚阎敖之后。',
    originPlace: { name: '山西运城', lng: 111.01, lat: 35.03 },
    originPeriod: '西周',
    junwang: [
      { name: '太原郡', location: '山西太原', lng: 112.55, lat: 37.87, tanghao: '太原堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '山西运城', lng: 111.01, lat: 35.03, period: '西周', reason: '太伯后阎乡' },
      { name: '山西太原', lng: 112.55, lat: 37.87, period: '汉代', reason: '太原阎氏' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '魏晋', reason: '河南阎氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '山东潍坊', lng: 119.16, lat: 36.70, period: '明清', reason: '迁居齐鲁' },
    ],
    figures: [
      { name: '阎立本', dynasty: '唐', achievement: '宰相，画家' },
      { name: '阎立德', dynasty: '唐', achievement: '工部尚书，建筑家' },
      { name: '阎敬铭', dynasty: '清', achievement: '户部尚书，理财家' },
      { name: '阎锡山', dynasty: '民国', achievement: '山西督军，山西王' },
    ],
    totem: '阎字从门从臽，本义为里巷之门。图腾为太伯后阎乡，象征姬姓周室支脉。',
    history: '阎姓源于姬姓，太伯之后阎乡。太原阎氏为郡望，唐阎立本为宰相画家。',
  },
  {
    surname: '充',

    pinyin: 'Chōng',

    rank: 328,

    populationRank: 380,

    population: 8,
    origin: '源于姬姓，周官充人之后，以官为氏。又源于姜姓，齐充氏之后。',
    originPlace: { name: '陕西西安', lng: 108.95, lat: 34.27 },
    originPeriod: '西周',
    junwang: [
      { name: '太原郡', location: '山西太原', lng: 112.55, lat: 37.87, tanghao: '太原堂' },
      { name: '赞皇郡', location: '河北赞皇', lng: 114.36, lat: 37.66, tanghao: '赞皇堂' },
    ],
    migration: [
      { name: '陕西西安', lng: 108.95, lat: 34.27, period: '西周', reason: '周充人后' },
      { name: '山西太原', lng: 112.55, lat: 37.87, period: '汉代', reason: '太原充氏' },
      { name: '河北赞皇', lng: 114.36, lat: 37.66, period: '魏晋', reason: '赞皇充氏' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '唐代', reason: '河南充氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '明清', reason: '南迁江左' },
    ],
    figures: [
      { name: '充尚', dynasty: '汉', achievement: '燕人，方士' },
      { name: '充虞', dynasty: '战国', achievement: '孟子弟子' },
      { name: '充信', dynasty: '明', achievement: '进士，循吏' },
      { name: '充炜', dynasty: '清', achievement: '学者' },
    ],
    totem: '充字从儿从育省，本义为长养。图腾为周充人官后，象征以官为氏。',
    history: '充姓源于姬姓，周官充人之后。太原充氏为郡望，战国充虞为孟子弟子。',
  },
  {
    surname: '慕',

    pinyin: 'Mù',

    rank: 329,

    populationRank: 310,

    population: 20,
    origin: '源于慕容氏，鲜卑后裔，单取慕字。又源于帝王慕之之后。',
    originPlace: { name: '内蒙古呼和浩特', lng: 111.75, lat: 40.84 },
    originPeriod: '晋代',
    junwang: [
      { name: '敦煌郡', location: '甘肃敦煌', lng: 94.66, lat: 40.14, tanghao: '敦煌堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '内蒙古呼和浩特', lng: 111.75, lat: 40.84, period: '晋代', reason: '鲜卑慕容部' },
      { name: '甘肃敦煌', lng: 94.66, lat: 40.14, period: '南北朝', reason: '敦煌慕氏' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '唐代', reason: '河南慕氏' },
      { name: '山东烟台', lng: 121.39, lat: 37.54, period: '宋代', reason: '迁居胶东' },
      { name: '辽宁沈阳', lng: 123.43, lat: 41.80, period: '明清', reason: '迁居辽东' },
    ],
    figures: [
      { name: '慕昌桂', dynasty: '清', achievement: '诗人，画家' },
      { name: '慕甲荣', dynasty: '清', achievement: '学者，经学家' },
      { name: '慕维德', dynasty: '清', achievement: '循吏' },
      { name: '慕生忠', dynasty: '现代', achievement: '开国少将，青藏公路之父' },
    ],
    totem: '慕字从心从莫，本义为思慕。图腾为鲜卑慕容部，象征少数民族汉化。',
    history: '慕姓源于鲜卑慕容氏，单取慕字。敦煌慕氏为郡望，现代慕生忠为青藏公路之父。',
  },
  {
    surname: '连',

    pinyin: 'Lián',

    rank: 330,

    populationRank: 150,

    population: 110,
    origin: '源于姬姓，齐连称之后。又源于芈姓，楚连氏之后。',
    originPlace: { name: '山东淄博', lng: 118.05, lat: 36.78 },
    originPeriod: '春秋',
    junwang: [
      { name: '上党郡', location: '山西长治', lng: 113.12, lat: 36.20, tanghao: '上党堂' },
      { name: '齐郡', location: '山东淄博', lng: 118.05, lat: 36.78, tanghao: '齐郡堂' },
    ],
    migration: [
      { name: '山东淄博', lng: 118.05, lat: 36.78, period: '春秋', reason: '齐连称后' },
      { name: '山西长治', lng: 113.12, lat: 36.20, period: '汉代', reason: '上党连氏' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '魏晋', reason: '河南连氏' },
      { name: '福建福州', lng: 119.30, lat: 26.08, period: '宋代', reason: '迁居闽中' },
      { name: '广东广州', lng: 113.27, lat: 23.13, period: '明清', reason: '迁居岭南' },
    ],
    figures: [
      { name: '连称', dynasty: '春秋', achievement: '齐国大夫' },
      { name: '连舜宾', dynasty: '宋', achievement: '处士，广平先生' },
      { name: '连久道', dynasty: '宋', achievement: '诗人' },
      { name: '连横', dynasty: '清末', achievement: '史学家，《台湾通史》作者' },
    ],
    totem: '连字从辵从车，本义为相接。图腾为齐连称后，象征姜姓齐国支脉。',
    history: '连姓源于姬姓，齐连称之后。上党连氏为郡望，清末连横著《台湾通史》。',
  },
  {
    surname: '茹',

    pinyin: 'Rú',

    rank: 331,

    populationRank: 250,

    population: 35,
    origin: '源于柔然，蠕蠕族汉化。又源于地名，以地为氏。',
    originPlace: { name: '内蒙古呼和浩特', lng: 111.75, lat: 40.84 },
    originPeriod: '南北朝',
    junwang: [
      { name: '河内郡', location: '河南沁阳', lng: 112.93, lat: 35.09, tanghao: '河内堂' },
      { name: '江都郡', location: '江苏扬州', lng: 119.42, lat: 32.39, tanghao: '江都堂' },
    ],
    migration: [
      { name: '内蒙古呼和浩特', lng: 111.75, lat: 40.84, period: '南北朝', reason: '柔然汉化' },
      { name: '河南沁阳', lng: 112.93, lat: 35.09, period: '汉代', reason: '河内茹氏' },
      { name: '江苏扬州', lng: 119.42, lat: 32.39, period: '唐代', reason: '江都茹氏' },
      { name: '浙江绍兴', lng: 120.58, lat: 30.03, period: '宋代', reason: '迁居会稽' },
      { name: '广东广州', lng: 113.27, lat: 23.13, period: '明清', reason: '迁居岭南' },
    ],
    figures: [
      { name: '茹法珍', dynasty: '南朝', achievement: '南齐权宦' },
      { name: '茹瞻', dynasty: '北齐', achievement: '兵部尚书' },
      { name: '茹洪', dynasty: '明', achievement: '画家，书法家' },
      { name: '茹棻', dynasty: '清', achievement: '状元，兵部侍郎' },
    ],
    totem: '茹字从艹从如，本义为根茎相连接。图腾为柔然汉化，象征少数民族融入。',
    history: '茹姓源于柔然，蠕蠕族汉化。河内茹氏为郡望，清茹棻为状元。',
  },
  {
    surname: '习',

    pinyin: 'Xí',

    rank: 332,

    populationRank: 200,

    population: 50,
    origin: '源于姬姓，少习国之后。又源于地名，习国之后。',
    originPlace: { name: '河南南阳', lng: 112.53, lat: 33.00 },
    originPeriod: '西周',
    junwang: [
      { name: '东阳郡', location: '浙江金华', lng: 119.65, lat: 29.09, tanghao: '东阳堂' },
      { name: '襄阳郡', location: '湖北襄阳', lng: 112.14, lat: 32.02, tanghao: '襄阳堂' },
    ],
    migration: [
      { name: '河南南阳', lng: 112.53, lat: 33.00, period: '西周', reason: '少习国后' },
      { name: '湖北襄阳', lng: 112.14, lat: 32.02, period: '汉代', reason: '襄阳习氏' },
      { name: '浙江金华', lng: 119.65, lat: 29.09, period: '魏晋', reason: '东阳习氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '湖南长沙', lng: 112.94, lat: 28.23, period: '明清', reason: '迁居湖南' },
    ],
    figures: [
      { name: '习郁', dynasty: '汉', achievement: '侍中，建习家池' },
      { name: '习凿齿', dynasty: '晋', achievement: '史学家，《汉晋春秋》作者' },
      { name: '习祯', dynasty: '三国', achievement: '蜀汉官员' },
      { name: '习经', dynasty: '明', achievement: '进士，学者' },
    ],
    totem: '习字从羽从白，本义为鸟数飞。图腾为少习国后，象征姬姓古国后裔。',
    history: '习姓源于姬姓，少习国之后。襄阳习氏为郡望，晋习凿齿著《汉晋春秋》。',
  },
  {
    surname: '宦',

    pinyin: 'Huàn',

    rank: 333,

    populationRank: 360,

    population: 10,
    origin: '源于姬姓，周官宦者之后，以官为氏。又源于地名，以地为氏。',
    originPlace: { name: '陕西西安', lng: 108.95, lat: 34.27 },
    originPeriod: '西周',
    junwang: [
      { name: '中山郡', location: '河北定州', lng: 115.00, lat: 38.51, tanghao: '中山堂' },
      { name: '江夏郡', location: '湖北武汉', lng: 114.31, lat: 30.59, tanghao: '江夏堂' },
    ],
    migration: [
      { name: '陕西西安', lng: 108.95, lat: 34.27, period: '西周', reason: '周宦者后' },
      { name: '河北定州', lng: 115.00, lat: 38.51, period: '汉代', reason: '中山宦氏' },
      { name: '湖北武汉', lng: 114.31, lat: 30.59, period: '魏晋', reason: '江夏宦氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '四川成都', lng: 104.07, lat: 30.67, period: '明清', reason: '迁居蜀地' },
    ],
    figures: [
      { name: '宦绩', dynasty: '明', achievement: '进士，循吏' },
      { name: '宦官', dynasty: '明', achievement: '学者' },
      { name: '宦懋庸', dynasty: '清', achievement: '学者，著述家' },
      { name: '宦应清', dynasty: '清', achievement: '诗人' },
    ],
    totem: '宦字从宀从臣，本义为家臣。图腾为周宦者后，象征以官为氏。',
    history: '宦姓源于姬姓，周官宦者之后。中山宦氏为郡望，明宦绩为循吏。',
  },
  {
    surname: '艾',

    pinyin: 'Ài',

    rank: 334,

    populationRank: 240,

    population: 38,
    origin: '源于姬姓，周艾侯之后。又源于地名，以艾山为氏。',
    originPlace: { name: '山东泰安', lng: 117.09, lat: 36.19 },
    originPeriod: '西周',
    junwang: [
      { name: '陇西郡', location: '甘肃临洮', lng: 103.86, lat: 35.37, tanghao: '陇西堂' },
      { name: '天水郡', location: '甘肃天水', lng: 105.72, lat: 34.58, tanghao: '天水堂' },
    ],
    migration: [
      { name: '山东泰安', lng: 117.09, lat: 36.19, period: '西周', reason: '艾侯封地' },
      { name: '甘肃临洮', lng: 103.86, lat: 35.37, period: '汉代', reason: '陇西艾氏' },
      { name: '甘肃天水', lng: 105.72, lat: 34.58, period: '魏晋', reason: '天水艾氏' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '唐代', reason: '河南艾氏' },
      { name: '江西南昌', lng: 115.89, lat: 28.68, period: '明清', reason: '迁居豫章' },
    ],
    figures: [
      { name: '艾若讷', dynasty: '宋', achievement: '哲学家，学者' },
      { name: '艾南英', dynasty: '明', achievement: '文学家，散文家' },
      { name: '艾自修', dynasty: '明', achievement: '学者' },
      { name: '艾显', dynasty: '清', achievement: '画家，篆刻家' },
    ],
    totem: '艾字从艹从乂，本义为艾草。图腾为周艾侯后，象征姬姓周室支脉。',
    history: '艾姓源于姬姓，周艾侯之后。陇西艾氏为郡望，明艾南英为文学家。',
  },
  {
    surname: '鱼',

    pinyin: 'Yú',

    rank: 335,

    populationRank: 300,

    population: 22,
    origin: '源于姬姓，宋鱼氏之后。又源于子姓，宋司马子鱼之后。',
    originPlace: { name: '河南商丘', lng: 115.65, lat: 34.44 },
    originPeriod: '春秋',
    junwang: [
      { name: '雁门郡', location: '山西代县', lng: 112.96, lat: 39.07, tanghao: '雁门堂' },
      { name: '冯翊郡', location: '陕西大荔', lng: 109.74, lat: 34.80, tanghao: '冯翊堂' },
    ],
    migration: [
      { name: '河南商丘', lng: 115.65, lat: 34.44, period: '春秋', reason: '宋子鱼后' },
      { name: '陕西大荔', lng: 109.74, lat: 34.80, period: '汉代', reason: '冯翊鱼氏' },
      { name: '山西代县', lng: 112.96, lat: 39.07, period: '魏晋', reason: '雁门鱼氏' },
      { name: '四川成都', lng: 104.07, lat: 30.67, period: '唐代', reason: '蜀地鱼氏' },
      { name: '江苏苏州', lng: 120.62, lat: 31.30, period: '明清', reason: '迁居江南' },
    ],
    figures: [
      { name: '子鱼', dynasty: '春秋', achievement: '宋司马，名臣' },
      { name: '鱼豢', dynasty: '三国', achievement: '史学家，《魏略》作者' },
      { name: '鱼朝恩', dynasty: '唐', achievement: '权宦，观军容使' },
      { name: '鱼玄机', dynasty: '唐', achievement: '女诗人，道士' },
    ],
    totem: '鱼字象形，本义为水族。图腾为宋子鱼后，象征子姓宋国后裔。',
    history: '鱼姓源于子姓，宋司马子鱼之后。雁门鱼氏为郡望，唐鱼玄机为女诗人。',
  },
  {
    surname: '容',

    pinyin: 'Róng',

    rank: 336,

    populationRank: 280,

    population: 28,
    origin: '源于姬姓，容成氏之后。又源于地名，以地为氏。',
    originPlace: { name: '河南洛阳', lng: 112.45, lat: 34.62 },
    originPeriod: '上古',
    junwang: [
      { name: '敦煌郡', location: '甘肃敦煌', lng: 94.66, lat: 40.14, tanghao: '敦煌堂' },
      { name: '鲁郡', location: '山东曲阜', lng: 116.98, lat: 35.58, tanghao: '鲁郡堂' },
    ],
    migration: [
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '上古', reason: '容成氏后' },
      { name: '山东曲阜', lng: 116.98, lat: 35.58, period: '汉代', reason: '鲁郡容氏' },
      { name: '甘肃敦煌', lng: 94.66, lat: 40.14, period: '魏晋', reason: '敦煌容氏' },
      { name: '广东广州', lng: 113.27, lat: 23.13, period: '宋代', reason: '迁居岭南' },
      { name: '广西玉林', lng: 110.15, lat: 22.65, period: '明清', reason: '迁居容州' },
    ],
    figures: [
      { name: '容成', dynasty: '上古', achievement: '黄帝臣，发明历法' },
      { name: '容闳', dynasty: '清末', achievement: '教育家，中国留学生之父' },
      { name: '容庚', dynasty: '现代', achievement: '古文字学家，《金文编》作者' },
      { name: '容肇祖', dynasty: '现代', achievement: '哲学家，民俗学家' },
    ],
    totem: '容字从宀从谷，本义为受纳。图腾为容成氏后，象征黄帝臣后裔。',
    history: '容姓源于容成氏，黄帝臣之后。敦煌容氏为郡望，清末容闳为留学生之父。',
  },
  {
    surname: '向',

    pinyin: 'Xiàng',

    rank: 337,

    populationRank: 100,

    population: 210,
    origin: '源于姬姓，宋向父之后。又源于姜姓，齐向氏之后。',
    originPlace: { name: '河南商丘', lng: 115.65, lat: 34.44 },
    originPeriod: '春秋',
    junwang: [
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
      { name: '河东郡', location: '山西夏县', lng: 111.22, lat: 35.14, tanghao: '河东堂' },
    ],
    migration: [
      { name: '河南商丘', lng: 115.65, lat: 34.44, period: '春秋', reason: '宋向父后' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '汉代', reason: '河南向氏' },
      { name: '山西夏县', lng: 111.22, lat: 35.14, period: '魏晋', reason: '河东向氏' },
      { name: '湖南衡阳', lng: 112.61, lat: 26.89, period: '宋代', reason: '迁居湖南' },
      { name: '湖北武汉', lng: 114.31, lat: 30.59, period: '明清', reason: '迁居荆楚' },
    ],
    figures: [
      { name: '向戌', dynasty: '春秋', achievement: '宋左师，弭兵之会' },
      { name: '向秀', dynasty: '晋', achievement: '竹林七贤之一' },
      { name: '向敏中', dynasty: '宋', achievement: '宰相' },
      { name: '向荣', dynasty: '清', achievement: '江南大营钦差大臣' },
    ],
    totem: '向字从宀从口，本义为北出牖。图腾为宋向父后，象征子姓宋国后裔。',
    history: '向姓源于姬姓，宋向父之后。河南向氏为郡望，晋向秀为竹林七贤之一。',
  },
  {
    surname: '古',

    pinyin: 'Gǔ',

    rank: 338,

    populationRank: 200,

    population: 50,
    origin: '源于姬姓，周古公亶父之后。又源于地名，以地为氏。',
    originPlace: { name: '陕西旬邑', lng: 108.33, lat: 35.11 },
    originPeriod: '商代',
    junwang: [
      { name: '新安郡', location: '河南渑池', lng: 111.74, lat: 34.76, tanghao: '新安堂' },
      { name: '河内郡', location: '河南沁阳', lng: 112.93, lat: 35.09, tanghao: '河内堂' },
    ],
    migration: [
      { name: '陕西旬邑', lng: 108.33, lat: 35.11, period: '商代', reason: '古公亶父后' },
      { name: '河南渑池', lng: 111.74, lat: 34.76, period: '汉代', reason: '新安古氏' },
      { name: '河南沁阳', lng: 112.93, lat: 35.09, period: '魏晋', reason: '河内古氏' },
      { name: '广东梅州', lng: 116.12, lat: 24.29, period: '宋代', reason: '客家古氏' },
      { name: '四川成都', lng: 104.07, lat: 30.67, period: '明清', reason: '迁居蜀地' },
    ],
    figures: [
      { name: '古公亶父', dynasty: '商代', achievement: '周先祖，迁岐奠基' },
      { name: '古弼', dynasty: '北魏', achievement: '司徒，直臣' },
      { name: '古之奇', dynasty: '唐', achievement: '诗人' },
      { name: '古柏', dynasty: '现代', achievement: '革命烈士' },
    ],
    totem: '古字从十从口，本义为故旧。图腾为古公亶父后，象征周先祖后裔。',
    history: '古姓源于姬姓，周古公亶父之后。新安古氏为郡望，古公亶父为周先祖。',
  },
  {
    surname: '易',

    pinyin: 'Yì',

    rank: 339,

    populationRank: 90,

    population: 230,
    origin: '源于姬姓，齐易氏之后。又源于地名，易水之后。',
    originPlace: { name: '河北易县', lng: 115.50, lat: 39.35 },
    originPeriod: '春秋',
    junwang: [
      { name: '太原郡', location: '山西太原', lng: 112.55, lat: 37.87, tanghao: '太原堂' },
      { name: '济阳郡', location: '河南兰考', lng: 114.82, lat: 34.82, tanghao: '济阳堂' },
    ],
    migration: [
      { name: '河北易县', lng: 115.50, lat: 39.35, period: '春秋', reason: '易水地望' },
      { name: '山西太原', lng: 112.55, lat: 37.87, period: '汉代', reason: '太原易氏' },
      { name: '河南兰考', lng: 114.82, lat: 34.82, period: '魏晋', reason: '济阳易氏' },
      { name: '湖南长沙', lng: 112.94, lat: 28.23, period: '宋代', reason: '迁居湖南' },
      { name: '广东广州', lng: 113.27, lat: 23.13, period: '明清', reason: '迁居岭南' },
    ],
    figures: [
      { name: '易雄', dynasty: '晋', achievement: '舂陵令，忠臣' },
      { name: '易重', dynasty: '唐', achievement: '状元，诗人' },
      { name: '易祓', dynasty: '宋', achievement: '礼部尚书，学者' },
      { name: '易顺鼎', dynasty: '清', achievement: '诗人，名士' },
    ],
    totem: '易字从日从勿，本义为变化。图腾为易水地望，象征以水为氏。',
    history: '易姓源于姬姓，齐易氏之后。太原易氏为郡望，唐易重为状元。',
  },
  {
    surname: '慎',

    pinyin: 'Shèn',

    rank: 340,

    populationRank: 320,

    population: 18,
    origin: '源于姬姓，楚白公胜封慎。又源于地名，以地为氏。',
    originPlace: { name: '安徽颍上', lng: 116.26, lat: 32.63 },
    originPeriod: '春秋',
    junwang: [
      { name: '天水郡', location: '甘肃天水', lng: 105.72, lat: 34.58, tanghao: '天水堂' },
      { name: '广平郡', location: '河北鸡泽', lng: 114.87, lat: 36.95, tanghao: '广平堂' },
    ],
    migration: [
      { name: '安徽颍上', lng: 116.26, lat: 32.63, period: '春秋', reason: '白公胜封慎' },
      { name: '甘肃天水', lng: 105.72, lat: 34.58, period: '汉代', reason: '天水慎氏' },
      { name: '河北鸡泽', lng: 114.87, lat: 36.95, period: '魏晋', reason: '广平慎氏' },
      { name: '浙江湖州', lng: 120.10, lat: 30.87, period: '宋代', reason: '迁居吴兴' },
      { name: '上海', lng: 121.47, lat: 31.23, period: '明清', reason: '迁居江南' },
    ],
    figures: [
      { name: '慎到', dynasty: '战国', achievement: '法家代表，赵人' },
      { name: '慎伯筠', dynasty: '宋', achievement: '学者，处士' },
      { name: '慎镛', dynasty: '宋', achievement: '知制诰' },
      { name: '慎蒙', dynasty: '明', achievement: '御史，学者' },
    ],
    totem: '慎字从心从真，本义为谨慎。图腾为白公胜封慎，象征姬姓楚国后裔。',
    history: '慎姓源于姬姓，白公胜封慎。天水慎氏为郡望，战国慎到为法家代表。',
  },
  {
    surname: '戈',

    pinyin: 'Gē',

    rank: 341,

    populationRank: 320,

    population: 18,
    origin: '源于姒姓，夏戈国之后，以国为氏。又源于官名，以戈为氏。',
    originPlace: { name: '河南洛阳', lng: 112.45, lat: 34.62 },
    originPeriod: '夏代',
    junwang: [
      { name: '临海郡', location: '浙江临海', lng: 121.13, lat: 28.85, tanghao: '临海堂' },
      { name: '景州郡', location: '河北景县', lng: 116.27, lat: 37.69, tanghao: '景州堂' },
    ],
    migration: [
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '夏代', reason: '戈国封地' },
      { name: '河北景县', lng: 116.27, lat: 37.69, period: '汉代', reason: '景州戈氏' },
      { name: '浙江临海', lng: 121.13, lat: 28.85, period: '魏晋', reason: '临海戈氏' },
      { name: '江苏苏州', lng: 120.62, lat: 31.30, period: '宋代', reason: '迁居江南' },
      { name: '上海', lng: 121.47, lat: 31.23, period: '明清', reason: '迁居松江' },
    ],
    figures: [
      { name: '戈毅', dynasty: '明', achievement: '进士，循吏' },
      { name: '戈允礼', dynasty: '明', achievement: '兵部侍郎' },
      { name: '戈涛', dynasty: '清', achievement: '翰林院编修，文学家' },
      { name: '戈载', dynasty: '清', achievement: '词学家，《词林正韵》作者' },
    ],
    totem: '戈字象形，本义为兵器。图腾为夏戈国后，象征姒姓夏后氏后裔。',
    history: '戈姓源于姒姓，夏戈国之后。临海戈氏为郡望，清戈载著《词林正韵》。',
  },
  {
    surname: '廖',

    pinyin: 'Liào',

    rank: 342,

    populationRank: 60,

    population: 490,
    origin: '源于姬姓，周廖伯之后。又源于己姓，叔安之后。',
    originPlace: { name: '河南唐河', lng: 112.84, lat: 32.69 },
    originPeriod: '西周',
    junwang: [
      { name: '武威郡', location: '甘肃武威', lng: 102.64, lat: 37.93, tanghao: '武威堂' },
      { name: '清河郡', location: '河北清河', lng: 115.67, lat: 37.07, tanghao: '清河堂' },
    ],
    migration: [
      { name: '河南唐河', lng: 112.84, lat: 32.69, period: '西周', reason: '廖伯封地' },
      { name: '甘肃武威', lng: 102.64, lat: 37.93, period: '汉代', reason: '武威廖氏' },
      { name: '河北清河', lng: 115.67, lat: 37.07, period: '魏晋', reason: '清河廖氏' },
      { name: '福建福州', lng: 119.30, lat: 26.08, period: '宋代', reason: '迁居闽中' },
      { name: '广东梅州', lng: 116.12, lat: 24.29, period: '明清', reason: '客家廖氏' },
    ],
    figures: [
      { name: '廖化', dynasty: '三国', achievement: '蜀汉右车骑将军' },
      { name: '廖刚', dynasty: '宋', achievement: '御史中丞，名臣' },
      { name: '廖燕', dynasty: '清', achievement: '文学家，思想家' },
      { name: '廖仲恺', dynasty: '民国', achievement: '国民党元老，革命家' },
    ],
    totem: '廖字从广从翏，本义为广屋。图腾为廖伯封地，象征姬姓周室后裔。',
    history: '廖姓源于姬姓，周廖伯之后。武威廖氏为郡望，三国廖化为蜀汉名将。',
  },
  {
    surname: '庾',

    pinyin: 'Yǔ',

    rank: 343,

    populationRank: 320,

    population: 18,
    origin: '源于姬姓，周官庾人之后，以官为氏。又源于地名，以地为氏。',
    originPlace: { name: '陕西西安', lng: 108.95, lat: 34.27 },
    originPeriod: '西周',
    junwang: [
      { name: '颍川郡', location: '河南禹州', lng: 113.49, lat: 34.16, tanghao: '颍川堂' },
      { name: '济阳郡', location: '河南兰考', lng: 114.82, lat: 34.82, tanghao: '济阳堂' },
    ],
    migration: [
      { name: '陕西西安', lng: 108.95, lat: 34.27, period: '西周', reason: '周庾人后' },
      { name: '河南禹州', lng: 113.49, lat: 34.16, period: '汉代', reason: '颍川庾氏' },
      { name: '河南兰考', lng: 114.82, lat: 34.82, period: '魏晋', reason: '济阳庾氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '广东广州', lng: 113.27, lat: 23.13, period: '明清', reason: '迁居岭南' },
    ],
    figures: [
      { name: '庾亮', dynasty: '晋', achievement: '外戚，征西将军' },
      { name: '庾信', dynasty: '北周', achievement: '文学家，《哀江南赋》作者' },
      { name: '庾抱', dynasty: '唐', achievement: '太子舍人' },
      { name: '庾肩吾', dynasty: '南朝', achievement: '文学家，书法家' },
    ],
    totem: '庾字从广从臾，本义为粮仓。图腾为周庾人官后，象征以官为氏。',
    history: '庾姓源于姬姓，周官庾人之后。颍川庾氏为郡望，北周庾信为文学家。',
  },
  {
    surname: '终',

    pinyin: 'Zhōng',

    rank: 344,

    populationRank: 330,

    population: 16,
    origin: '源于姬姓，陆终之后。又源于高阳氏，颛顼之后。',
    originPlace: { name: '河南洛阳', lng: 112.45, lat: 34.62 },
    originPeriod: '上古',
    junwang: [
      { name: '南阳郡', location: '河南南阳', lng: 112.53, lat: 33.00, tanghao: '南阳堂' },
      { name: '济南郡', location: '山东济南', lng: 117.00, lat: 36.65, tanghao: '济南堂' },
    ],
    migration: [
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '上古', reason: '陆终后' },
      { name: '河南南阳', lng: 112.53, lat: 33.00, period: '汉代', reason: '南阳终氏' },
      { name: '山东济南', lng: 117.00, lat: 36.65, period: '魏晋', reason: '济南终氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '上海', lng: 121.47, lat: 31.23, period: '明清', reason: '迁居江南' },
    ],
    figures: [
      { name: '终军', dynasty: '汉', achievement: '谏议大夫，终军请缨' },
      { name: '终郁', dynasty: '唐', achievement: '诗人' },
      { name: '终慎思', dynasty: '明', achievement: '学者' },
      { name: '终其信', dynasty: '清', achievement: '循吏' },
    ],
    totem: '终字从糸从冬，本义为结束。图腾为陆终后，象征高阳氏后裔。',
    history: '终姓源于姬姓，陆终之后。南阳终氏为郡望，汉终军请缨为少年英雄。',
  },
  {
    surname: '暨',

    pinyin: 'Jì',

    rank: 345,

    populationRank: 340,

    population: 14,
    origin: '源于姬姓，吴太伯之后暨。又源于地名，以地为氏。',
    originPlace: { name: '江苏无锡', lng: 120.30, lat: 31.57 },
    originPeriod: '春秋',
    junwang: [
      { name: '渤海郡', location: '河北沧州', lng: 116.84, lat: 38.31, tanghao: '渤海堂' },
      { name: '余杭郡', location: '浙江杭州', lng: 120.16, lat: 30.27, tanghao: '余杭堂' },
    ],
    migration: [
      { name: '江苏无锡', lng: 120.30, lat: 31.57, period: '春秋', reason: '吴太伯后暨' },
      { name: '河北沧州', lng: 116.84, lat: 38.31, period: '汉代', reason: '渤海暨氏' },
      { name: '浙江杭州', lng: 120.16, lat: 30.27, period: '魏晋', reason: '余杭暨氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '上海', lng: 121.47, lat: 31.23, period: '明清', reason: '迁居江南' },
    ],
    figures: [
      { name: '暨逊', dynasty: '晋', achievement: '关内侯' },
      { name: '暨陶', dynasty: '宋', achievement: '状元' },
      { name: '暨文', dynasty: '明', achievement: '进士，循吏' },
      { name: '暨正', dynasty: '清', achievement: '学者' },
    ],
    totem: '暨字从日从既，本义为日颇见。图腾为吴太伯后，象征姬姓吴国后裔。',
    history: '暨姓源于姬姓，吴太伯之后暨。渤海暨氏为郡望，宋暨陶为状元。',
  },
  {
    surname: '居',

    pinyin: 'Jū',

    rank: 346,

    populationRank: 280,

    population: 28,
    origin: '源于姬姓，晋大夫先且居之后。又源于地名，以地为氏。',
    originPlace: { name: '山西闻喜', lng: 111.23, lat: 35.36 },
    originPeriod: '春秋',
    junwang: [
      { name: '渤海郡', location: '河北沧州', lng: 116.84, lat: 38.31, tanghao: '渤海堂' },
      { name: '睢阳郡', location: '河南商丘', lng: 115.65, lat: 34.44, tanghao: '睢阳堂' },
    ],
    migration: [
      { name: '山西闻喜', lng: 111.23, lat: 35.36, period: '春秋', reason: '先且居后' },
      { name: '河北沧州', lng: 116.84, lat: 38.31, period: '汉代', reason: '渤海居氏' },
      { name: '河南商丘', lng: 115.65, lat: 34.44, period: '魏晋', reason: '睢阳居氏' },
      { name: '江苏扬州', lng: 119.42, lat: 32.39, period: '宋代', reason: '迁居江南' },
      { name: '上海', lng: 121.47, lat: 31.23, period: '明清', reason: '迁居松江' },
    ],
    figures: [
      { name: '先且居', dynasty: '春秋', achievement: '晋国中军将' },
      { name: '居股', dynasty: '汉', achievement: '东成侯' },
      { name: '居节', dynasty: '明', achievement: '画家，诗人' },
      { name: '居大本', dynasty: '清', achievement: '学者' },
    ],
    totem: '居字从尸从古，本义为蹲踞。图腾为先且居后，象征姬姓晋国后裔。',
    history: '居姓源于姬姓，晋大夫先且居之后。渤海居氏为郡望，明居节为画家。',
  },
  {
    surname: '衡',

    pinyin: 'Héng',

    rank: 347,

    populationRank: 280,

    population: 28,
    origin: '源于姬姓，鲁衡父之后。又源于伊尹阿衡之后。',
    originPlace: { name: '山东曲阜', lng: 116.98, lat: 35.58 },
    originPeriod: '春秋',
    junwang: [
      { name: '雁门郡', location: '山西代县', lng: 112.96, lat: 39.07, tanghao: '雁门堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '山东曲阜', lng: 116.98, lat: 35.58, period: '春秋', reason: '鲁衡父后' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '汉代', reason: '河南衡氏' },
      { name: '山西代县', lng: 112.96, lat: 39.07, period: '魏晋', reason: '雁门衡氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '上海', lng: 121.47, lat: 31.23, period: '明清', reason: '迁居江南' },
    ],
    figures: [
      { name: '衡咸', dynasty: '汉', achievement: '学者，博通五经' },
      { name: '衡方', dynasty: '汉', achievement: '雁门太守' },
      { name: '衡岳', dynasty: '明', achievement: '进士，循吏' },
      { name: '衡权', dynasty: '清', achievement: '学者' },
    ],
    totem: '衡字从角从大，本义为牛角触。图腾为鲁衡父后，象征姬姓鲁国后裔。',
    history: '衡姓源于姬姓，鲁衡父之后。雁门衡氏为郡望，汉衡咸为博通五经学者。',
  },
  {
    surname: '步',

    pinyin: 'Bù',

    rank: 348,

    populationRank: 300,

    population: 22,
    origin: '源于姬姓，晋步扬之后。又源于官名，以步为氏。',
    originPlace: { name: '山西临汾', lng: 111.52, lat: 36.08 },
    originPeriod: '春秋',
    junwang: [
      { name: '平阳郡', location: '山西临汾', lng: 111.52, lat: 36.08, tanghao: '平阳堂' },
      { name: '河内郡', location: '河南沁阳', lng: 112.93, lat: 35.09, tanghao: '河内堂' },
    ],
    migration: [
      { name: '山西临汾', lng: 111.52, lat: 36.08, period: '春秋', reason: '晋步扬后' },
      { name: '河南沁阳', lng: 112.93, lat: 35.09, period: '汉代', reason: '河内步氏' },
      { name: '江西南昌', lng: 115.89, lat: 28.68, period: '魏晋', reason: '豫章步氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '上海', lng: 121.47, lat: 31.23, period: '明清', reason: '迁居江南' },
    ],
    figures: [
      { name: '步扬', dynasty: '春秋', achievement: '晋国大夫' },
      { name: '步骘', dynasty: '三国', achievement: '吴国丞相，临湘侯' },
      { name: '步阐', dynasty: '三国', achievement: '吴国西陵督' },
      { name: '步熊', dynasty: '晋', achievement: '术士，学者' },
    ],
    totem: '步字从止从少，本义为行走。图腾为晋步扬后，象征姬姓晋国后裔。',
    history: '步姓源于姬姓，晋步扬之后。平阳步氏为郡望，三国步骘为吴国丞相。',
  },
  {
    surname: '都',

    pinyin: 'Dū',

    rank: 349,

    populationRank: 280,

    population: 28,
    origin: '源于姬姓，郑公孙都之后。又源于地名，以都邑为氏。',
    originPlace: { name: '河南新郑', lng: 113.74, lat: 34.40 },
    originPeriod: '春秋',
    junwang: [
      { name: '黎阳郡', location: '河南浚县', lng: 114.55, lat: 35.68, tanghao: '黎阳堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '河南新郑', lng: 113.74, lat: 34.40, period: '春秋', reason: '公孙都后' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '汉代', reason: '河南都氏' },
      { name: '河南浚县', lng: 114.55, lat: 35.68, period: '魏晋', reason: '黎阳都氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '上海', lng: 121.47, lat: 31.23, period: '明清', reason: '迁居江南' },
    ],
    figures: [
      { name: '都胜', dynasty: '明', achievement: '贵州布政使' },
      { name: '都穆', dynasty: '明', achievement: '文学家，金石学家' },
      { name: '都杰', dynasty: '明', achievement: '进士，循吏' },
      { name: '都任', dynasty: '清', achievement: '榆林巡抚，忠节' },
    ],
    totem: '都字从邑从者，本义为国都。图腾为公孙都后，象征姬姓郑国后裔。',
    history: '都姓源于姬姓，郑公孙都之后。黎阳都氏为郡望，明都穆为金石学家。',
  },
  {
    surname: '耿',

    pinyin: 'Gěng',

    rank: 350,

    populationRank: 130,

    population: 140,
    origin: '源于姬姓，晋耿国之后。又源于地名，以耿邑为氏。',
    originPlace: { name: '山西河津', lng: 110.71, lat: 35.59 },
    originPeriod: '春秋',
    junwang: [
      { name: '高阳郡', location: '河北高阳', lng: 115.79, lat: 38.68, tanghao: '高阳堂' },
      { name: '扶风郡', location: '陕西兴平', lng: 108.49, lat: 34.30, tanghao: '扶风堂' },
    ],
    migration: [
      { name: '山西河津', lng: 110.71, lat: 35.59, period: '春秋', reason: '晋耿国后' },
      { name: '陕西兴平', lng: 108.49, lat: 34.30, period: '汉代', reason: '扶风耿氏' },
      { name: '河北高阳', lng: 115.79, lat: 38.68, period: '魏晋', reason: '高阳耿氏' },
      { name: '河北石家庄', lng: 114.50, lat: 38.05, period: '宋代', reason: '迁居常山' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '明清', reason: '南迁江左' },
    ],
    figures: [
      { name: '耿弇', dynasty: '汉', achievement: '建威大将军，好畤侯' },
      { name: '耿恭', dynasty: '汉', achievement: '戊己校尉，坚守西域' },
      { name: '耿京', dynasty: '宋', achievement: '抗金义军领袖' },
      { name: '耿继茂', dynasty: '清', achievement: '靖南王' },
    ],
    totem: '耿字从耳从炏，本义为耳听。图腾为晋耿国后，象征姬姓晋国后裔。',
    history: '耿姓源于姬姓，晋耿国之后。高阳耿氏为郡望，汉耿弇为云台二十八将之一。',
  },
  {
    surname: '满',

    pinyin: 'Mǎn',

    rank: 351,

    populationRank: 240,

    population: 38,
    origin: '源于姬姓，周满父之后。又源于荆蛮，蛮夷汉化。',
    originPlace: { name: '河南洛阳', lng: 112.45, lat: 34.62 },
    originPeriod: '西周',
    junwang: [
      { name: '河东郡', location: '山西夏县', lng: 111.22, lat: 35.14, tanghao: '河东堂' },
      { name: '山阳郡', location: '山东金乡', lng: 116.23, lat: 35.07, tanghao: '山阳堂' },
    ],
    migration: [
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '西周', reason: '周满父后' },
      { name: '山西夏县', lng: 111.22, lat: 35.14, period: '汉代', reason: '河东满氏' },
      { name: '山东金乡', lng: 116.23, lat: 35.07, period: '魏晋', reason: '山阳满氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '湖北武汉', lng: 114.31, lat: 30.59, period: '明清', reason: '迁居荆楚' },
    ],
    figures: [
      { name: '满宠', dynasty: '三国', achievement: '魏国太尉，名将' },
      { name: '满奋', dynasty: '晋', achievement: '尚书令' },
      { name: '满朝荐', dynasty: '明', achievement: '太仆寺少卿，循吏' },
      { name: '满洲正', dynasty: '清', achievement: '满族汉化取姓' },
    ],
    totem: '满字从水从廿，本义为盈溢。图腾为周满父后，象征姬姓周室后裔。',
    history: '满姓源于姬姓，周满父之后。河东满氏为郡望，三国满宠为魏国太尉。',
  },
  {
    surname: '弘',

    pinyin: 'Hóng',

    rank: 352,

    populationRank: 330,

    population: 16,
    origin: '源于姬姓，卫弘演之后。又源于弘农，以地为氏。',
    originPlace: { name: '河南灵宝', lng: 110.85, lat: 34.52 },
    originPeriod: '春秋',
    junwang: [
      { name: '太原郡', location: '山西太原', lng: 112.55, lat: 37.87, tanghao: '太原堂' },
      { name: '京兆郡', location: '陕西西安', lng: 108.95, lat: 34.27, tanghao: '京兆堂' },
    ],
    migration: [
      { name: '河南灵宝', lng: 110.85, lat: 34.52, period: '春秋', reason: '弘农地望' },
      { name: '陕西西安', lng: 108.95, lat: 34.27, period: '汉代', reason: '京兆弘氏' },
      { name: '山西太原', lng: 112.55, lat: 37.87, period: '魏晋', reason: '太原弘氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '上海', lng: 121.47, lat: 31.23, period: '明清', reason: '迁居江南' },
    ],
    figures: [
      { name: '弘演', dynasty: '春秋', achievement: '卫大夫，忠臣' },
      { name: '弘恭', dynasty: '汉', achievement: '中书令' },
      { name: '弘智', dynasty: '明', achievement: '高僧，文学家' },
      { name: '弘历', dynasty: '清', achievement: '清高宗乾隆皇帝' },
    ],
    totem: '弘字从弓从厶，本义为弓声。图腾为卫弘演后，象征姬姓卫国后裔。',
    history: '弘姓源于姬姓，卫弘演之后。太原弘氏为郡望，春秋弘演为忠臣。',
  },
  {
    surname: '匡',

    pinyin: 'Kuāng',

    rank: 353,

    populationRank: 250,

    population: 35,
    origin: '源于姬姓，鲁匡邑宰之后。又源于地名，以匡地为氏。',
    originPlace: { name: '山东长清', lng: 116.75, lat: 36.55 },
    originPeriod: '春秋',
    junwang: [
      { name: '晋阳郡', location: '山西太原', lng: 112.55, lat: 37.87, tanghao: '晋阳堂' },
      { name: '任城郡', location: '山东济宁', lng: 116.59, lat: 35.41, tanghao: '任城堂' },
    ],
    migration: [
      { name: '山东长清', lng: 116.75, lat: 36.55, period: '春秋', reason: '鲁匡邑后' },
      { name: '山东济宁', lng: 116.59, lat: 35.41, period: '汉代', reason: '任城匡氏' },
      { name: '山西太原', lng: 112.55, lat: 37.87, period: '魏晋', reason: '晋阳匡氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '湖南长沙', lng: 112.94, lat: 28.23, period: '明清', reason: '迁居湖南' },
    ],
    figures: [
      { name: '匡衡', dynasty: '汉', achievement: '丞相，凿壁偷光' },
      { name: '匡章', dynasty: '战国', achievement: '齐将，名将' },
      { name: '匡才', dynasty: '元', achievement: '总管，循吏' },
      { name: '匡如桐', dynasty: '清', achievement: '学者，经学家' },
    ],
    totem: '匡字从匚从王，本义为盛物之器。图腾为鲁匡邑后，象征姬姓鲁国后裔。',
    history: '匡姓源于姬姓，鲁匡邑宰之后。晋阳匡氏为郡望，汉匡衡凿壁偷光为名相。',
  },
  {
    surname: '国',

    pinyin: 'Guó',

    rank: 354,

    populationRank: 280,

    population: 28,
    origin: '源于姬姓，齐国氏之后。又源于官名，周官国正之后。',
    originPlace: { name: '山东淄博', lng: 118.05, lat: 36.78 },
    originPeriod: '春秋',
    junwang: [
      { name: '下邳郡', location: '江苏睢宁', lng: 117.94, lat: 33.90, tanghao: '下邳堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '山东淄博', lng: 118.05, lat: 36.78, period: '春秋', reason: '齐国氏后' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '汉代', reason: '河南国氏' },
      { name: '江苏睢宁', lng: 117.94, lat: 33.90, period: '魏晋', reason: '下邳国氏' },
      { name: '辽宁沈阳', lng: 123.43, lat: 41.80, period: '清代', reason: '满族汉化' },
      { name: '吉林长春', lng: 125.32, lat: 43.82, period: '现代', reason: '满族国氏' },
    ],
    figures: [
      { name: '国侨', dynasty: '春秋', achievement: '即子产，郑国名相' },
      { name: '国渊', dynasty: '三国', achievement: '魏国太仆' },
      { name: '国镠', dynasty: '明', achievement: '进士，循吏' },
      { name: '国柱', dynasty: '清', achievement: '满族大臣' },
    ],
    totem: '国字从囗从或，本义为邦国。图腾为齐国氏后，象征姜姓齐国支脉。',
    history: '国姓源于姬姓，齐国氏之后。下邳国氏为郡望，春秋国侨即子产为名相。',
  },
  {
    surname: '文',

    pinyin: 'Wén',

    rank: 355,

    populationRank: 100,

    population: 210,
    origin: '源于姬姓，周文王之后，以谥为氏。又源于姜姓，齐文公之后。',
    originPlace: { name: '陕西西安', lng: 108.95, lat: 34.27 },
    originPeriod: '西周',
    junwang: [
      { name: '雁门郡', location: '山西代县', lng: 112.96, lat: 39.07, tanghao: '雁门堂' },
      { name: '颖川郡', location: '河南禹州', lng: 113.49, lat: 34.16, tanghao: '颖川堂' },
    ],
    migration: [
      { name: '陕西西安', lng: 108.95, lat: 34.27, period: '西周', reason: '周文王后' },
      { name: '河南禹州', lng: 113.49, lat: 34.16, period: '汉代', reason: '颍川文氏' },
      { name: '山西代县', lng: 112.96, lat: 39.07, period: '魏晋', reason: '雁门文氏' },
      { name: '江西吉安', lng: 114.99, lat: 27.11, period: '宋代', reason: '迁居庐陵' },
      { name: '广东深圳', lng: 114.06, lat: 22.55, period: '明清', reason: '迁居岭南' },
    ],
    figures: [
      { name: '文种', dynasty: '春秋', achievement: '越国大夫，灭吴功臣' },
      { name: '文翁', dynasty: '汉', achievement: '蜀郡太守，兴学' },
      { name: '文天祥', dynasty: '宋', achievement: '丞相，民族英雄' },
      { name: '文徵明', dynasty: '明', achievement: '画家，吴门四家之一' },
    ],
    totem: '文字象形，本义为错画。图腾为周文王后，象征姬姓周室后裔。',
    history: '文姓源于姬姓，周文王之后。雁门文氏为郡望，宋文天祥为民族英雄。',
  },
  {
    surname: '寇',

    pinyin: 'Kòu',

    rank: 356,

    populationRank: 250,

    population: 35,
    origin: '源于姬姓，周官司寇之后，以官为氏。又源于地名，以地为氏。',
    originPlace: { name: '河南洛阳', lng: 112.45, lat: 34.62 },
    originPeriod: '西周',
    junwang: [
      { name: '上谷郡', location: '河北易县', lng: 115.50, lat: 39.35, tanghao: '上谷堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '西周', reason: '周司寇后' },
      { name: '河北易县', lng: 115.50, lat: 39.35, period: '汉代', reason: '上谷寇氏' },
      { name: '陕西西安', lng: 108.95, lat: 34.27, period: '魏晋', reason: '京兆寇氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '四川成都', lng: 104.07, lat: 30.67, period: '明清', reason: '迁居蜀地' },
    ],
    figures: [
      { name: '寇恂', dynasty: '汉', achievement: '雍奴侯，云台二十八将之一' },
      { name: '寇准', dynasty: '宋', achievement: '宰相，莱国公' },
      { name: '寇靖', dynasty: '明', achievement: '学者' },
      { name: '寇美', dynasty: '清', achievement: '循吏' },
    ],
    totem: '寇字从宀从元从攴，本义为劫掠。图腾为周司寇后，象征以官为氏。',
    history: '寇姓源于姬姓，周官司寇之后。上谷寇氏为郡望，宋寇准为宰相莱国公。',
  },
  {
    surname: '广',

    pinyin: 'Guǎng',

    rank: 357,

    populationRank: 360,

    population: 10,
    origin: '源于姬姓，黄帝后广成氏之后。又源于地名，以广武为氏。',
    originPlace: { name: '河南临汝', lng: 112.84, lat: 34.17 },
    originPeriod: '上古',
    junwang: [
      { name: '丹阳郡', location: '安徽当涂', lng: 118.49, lat: 31.55, tanghao: '丹阳堂' },
      { name: '庐江郡', location: '安徽庐江', lng: 117.29, lat: 31.26, tanghao: '庐江堂' },
    ],
    migration: [
      { name: '河南临汝', lng: 112.84, lat: 34.17, period: '上古', reason: '广成子后' },
      { name: '安徽当涂', lng: 118.49, lat: 31.55, period: '汉代', reason: '丹阳广氏' },
      { name: '安徽庐江', lng: 117.29, lat: 31.26, period: '魏晋', reason: '庐江广氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '广东广州', lng: 113.27, lat: 23.13, period: '明清', reason: '迁居岭南' },
    ],
    figures: [
      { name: '广汉', dynasty: '汉', achievement: '京兆尹，名臣' },
      { name: '广明', dynasty: '唐', achievement: '高僧' },
      { name: '广智', dynasty: '明', achievement: '进士，循吏' },
      { name: '广廉', dynasty: '清', achievement: '学者' },
    ],
    totem: '广字从广黄声，本义为大屋。图腾为广成子后，象征黄帝后裔。',
    history: '广姓源于姬姓，广成氏之后。丹阳广氏为郡望，汉广汉为京兆尹名臣。',
  },
  {
    surname: '禄',

    pinyin: 'Lù',

    rank: 358,

    populationRank: 340,

    population: 14,
    origin: '源于姬姓，殷武王之后禄父。又源于官名，周官禄之后。',
    originPlace: { name: '河南安阳', lng: 114.40, lat: 36.10 },
    originPeriod: '商代',
    junwang: [
      { name: '扶风郡', location: '陕西兴平', lng: 108.49, lat: 34.30, tanghao: '扶风堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '河南安阳', lng: 114.40, lat: 36.10, period: '商代', reason: '武庚禄父后' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '汉代', reason: '河南禄氏' },
      { name: '陕西兴平', lng: 108.49, lat: 34.30, period: '魏晋', reason: '扶风禄氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '云南昆明', lng: 102.72, lat: 25.04, period: '明清', reason: '迁居云南' },
    ],
    figures: [
      { name: '禄东赞', dynasty: '唐', achievement: '吐蕃大相，赴唐求婚' },
      { name: '禄钦', dynasty: '明', achievement: '进士，循吏' },
      { name: '禄氏', dynasty: '清', achievement: '云南土司' },
      { name: '禄康', dynasty: '清', achievement: '满族大臣' },
    ],
    totem: '禄字从示从录，本义为福禄。图腾为武庚禄父后，象征商殷后裔。',
    history: '禄姓源于姬姓，殷武王之后禄父。扶风禄氏为郡望，唐禄东赞为吐蕃大相。',
  },
  {
    surname: '阙',

    pinyin: 'Quē',

    rank: 359,

    populationRank: 280,

    population: 28,
    origin: '源于姬姓，鲁阙党之后。又源于地名，以阙地为氏。',
    originPlace: { name: '山东曲阜', lng: 116.98, lat: 35.58 },
    originPeriod: '春秋',
    junwang: [
      { name: '下邳郡', location: '江苏睢宁', lng: 117.94, lat: 33.90, tanghao: '下邳堂' },
      { name: '渤海郡', location: '河北沧州', lng: 116.84, lat: 38.31, tanghao: '渤海堂' },
    ],
    migration: [
      { name: '山东曲阜', lng: 116.98, lat: 35.58, period: '春秋', reason: '鲁阙党后' },
      { name: '河北沧州', lng: 116.84, lat: 38.31, period: '汉代', reason: '渤海阙氏' },
      { name: '江苏睢宁', lng: 117.94, lat: 33.90, period: '魏晋', reason: '下邳阙氏' },
      { name: '福建泉州', lng: 118.58, lat: 24.93, period: '宋代', reason: '迁居闽南' },
      { name: '台湾', lng: 121.55, lat: 25.03, period: '明清', reason: '迁居台湾' },
    ],
    figures: [
      { name: '阙子', dynasty: '战国', achievement: '道家学者' },
      { name: '阙羽', dynasty: '汉', achievement: '荆州刺史' },
      { name: '阙礼', dynasty: '宋', achievement: '宦官，知省事' },
      { name: '阙岚', dynasty: '清', achievement: '画家' },
    ],
    totem: '阙字从门从欮，本义为门观。图腾为鲁阙党后，象征姬姓鲁国后裔。',
    history: '阙姓源于姬姓，鲁阙党之后。下邳阙氏为郡望，清阙岚为画家。',
  },
  {
    surname: '东',

    pinyin: 'Dōng',

    rank: 360,

    populationRank: 280,

    population: 28,
    origin: '源于姬姓，周东里之后。又源于地名，以东方为氏。',
    originPlace: { name: '河南新郑', lng: 113.74, lat: 34.40 },
    originPeriod: '春秋',
    junwang: [
      { name: '平原郡', location: '山东平原', lng: 116.43, lat: 37.20, tanghao: '平原堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '河南新郑', lng: 113.74, lat: 34.40, period: '春秋', reason: '东里后' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '汉代', reason: '河南东氏' },
      { name: '山东平原', lng: 116.43, lat: 37.20, period: '魏晋', reason: '平原东氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '河北沧州', lng: 116.84, lat: 38.31, period: '明清', reason: '迁居燕赵' },
    ],
    figures: [
      { name: '东方朔', dynasty: '汉', achievement: '太中大夫，文学家' },
      { name: '东明', dynasty: '汉', achievement: '高僧' },
      { name: '东郊', dynasty: '明', achievement: '进士，循吏' },
      { name: '东鲁', dynasty: '清', achievement: '学者' },
    ],
    totem: '东字从木从日，本义为日出。图腾为东里后，象征姬姓周室后裔。',
    history: '东姓源于姬姓，周东里之后。平原东氏为郡望，汉东方朔为文学家。',
  },
  {
    surname: '欧',

    pinyin: 'Ōu',

    rank: 361,

    populationRank: 130,

    population: 140,
    origin: '源于姒姓，越王无疆之后欧冶子。又源于欧阳氏，单取欧字。',
    originPlace: { name: '浙江绍兴', lng: 120.58, lat: 30.03 },
    originPeriod: '春秋',
    junwang: [
      { name: '平阳郡', location: '山西临汾', lng: 111.52, lat: 36.08, tanghao: '平阳堂' },
      { name: '渤海郡', location: '河北沧州', lng: 116.84, lat: 38.31, tanghao: '渤海堂' },
    ],
    migration: [
      { name: '浙江绍兴', lng: 120.58, lat: 30.03, period: '春秋', reason: '越王无疆后' },
      { name: '山西临汾', lng: 111.52, lat: 36.08, period: '汉代', reason: '平阳欧氏' },
      { name: '河北沧州', lng: 116.84, lat: 38.31, period: '魏晋', reason: '渤海欧氏' },
      { name: '广东广州', lng: 113.27, lat: 23.13, period: '宋代', reason: '迁居岭南' },
      { name: '福建福州', lng: 119.30, lat: 26.08, period: '明清', reason: '迁居闽中' },
    ],
    figures: [
      { name: '欧冶子', dynasty: '春秋', achievement: '铸剑大师，铸龙渊剑' },
      { name: '欧大任', dynasty: '明', achievement: '南京工部主事，诗人' },
      { name: '欧必元', dynasty: '明', achievement: '诗人，学者' },
      { name: '欧光辰', dynasty: '清', achievement: '进士，循吏' },
    ],
    totem: '欧字从欠从区，本义为歌唱。图腾为越王无疆后，象征姒姓越国后裔。',
    history: '欧姓源于姒姓，越王无疆之后欧冶子。平阳欧氏为郡望，春秋欧冶子为铸剑大师。',
  },
  {
    surname: '殳',

    pinyin: 'Shū',

    rank: 362,

    populationRank: 380,

    population: 8,
    origin: '源于姜姓，齐殳氏之后。又源于官名，周官殳仗之后。',
    originPlace: { name: '山东淄博', lng: 118.05, lat: 36.78 },
    originPeriod: '春秋',
    junwang: [
      { name: '武功郡', location: '陕西武功', lng: 108.20, lat: 34.26, tanghao: '武功堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '山东淄博', lng: 118.05, lat: 36.78, period: '春秋', reason: '齐殳氏后' },
      { name: '陕西武功', lng: 108.20, lat: 34.26, period: '汉代', reason: '武功殳氏' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '魏晋', reason: '河南殳氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '浙江嘉兴', lng: 120.75, lat: 30.75, period: '明清', reason: '迁居浙江' },
    ],
    figures: [
      { name: '殳默', dynasty: '汉', achievement: '学者' },
      { name: '殳季', dynasty: '宋', achievement: '进士' },
      { name: '殳邦清', dynasty: '明', achievement: '循吏' },
      { name: '殳丹生', dynasty: '清', achievement: '诗人，画家' },
    ],
    totem: '殳字象形，本义为兵器。图腾为齐殳氏后，象征姜姓齐国后裔。',
    history: '殳姓源于姜姓，齐殳氏之后。武功殳氏为郡望，清殳丹生为诗人画家。',
  },
  {
    surname: '沃',

    pinyin: 'Wò',

    rank: 363,

    populationRank: 350,

    population: 12,
    origin: '源于姬姓，商沃丁之后。又源于地名，以沃地为氏。',
    originPlace: { name: '河南安阳', lng: 114.40, lat: 36.10 },
    originPeriod: '商代',
    junwang: [
      { name: '太原郡', location: '山西太原', lng: 112.55, lat: 37.87, tanghao: '太原堂' },
      { name: '吴兴郡', location: '浙江湖州', lng: 120.10, lat: 30.87, tanghao: '吴兴堂' },
    ],
    migration: [
      { name: '河南安阳', lng: 114.40, lat: 36.10, period: '商代', reason: '沃丁后' },
      { name: '山西太原', lng: 112.55, lat: 37.87, period: '汉代', reason: '太原沃氏' },
      { name: '浙江湖州', lng: 120.10, lat: 30.87, period: '魏晋', reason: '吴兴沃氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '上海', lng: 121.47, lat: 31.23, period: '明清', reason: '迁居江南' },
    ],
    figures: [
      { name: '沃田', dynasty: '明', achievement: '监察御史，循吏' },
      { name: '沃墅', dynasty: '明', achievement: '进士，学者' },
      { name: '沃之', dynasty: '清', achievement: '画家' },
      { name: '沃祥', dynasty: '清', achievement: '学者' },
    ],
    totem: '沃字从水从夭，本义为浇灌。图腾为商沃丁后，象征商殷后裔。',
    history: '沃姓源于姬姓，商沃丁之后。太原沃氏为郡望，明沃田为监察御史。',
  },
  {
    surname: '利',

    pinyin: 'Lì',

    rank: 364,

    populationRank: 280,

    population: 28,
    origin: '源于姬姓，楚利氏之后。又源于官名，周官利氏之后。',
    originPlace: { name: '湖北荆州', lng: 112.24, lat: 30.33 },
    originPeriod: '春秋',
    junwang: [
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
      { name: '广汉郡', location: '四川广汉', lng: 104.25, lat: 30.99, tanghao: '广汉堂' },
    ],
    migration: [
      { name: '湖北荆州', lng: 112.24, lat: 30.33, period: '春秋', reason: '楚利氏后' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '汉代', reason: '河南利氏' },
      { name: '四川广汉', lng: 104.25, lat: 30.99, period: '魏晋', reason: '广汉利氏' },
      { name: '广东广州', lng: 113.27, lat: 23.13, period: '宋代', reason: '迁居岭南' },
      { name: '广西南宁', lng: 108.37, lat: 22.82, period: '明清', reason: '壮族利氏' },
    ],
    figures: [
      { name: '利几', dynasty: '汉', achievement: '颍川侯' },
      { name: '利元吉', dynasty: '宋', achievement: '学者，朱熹弟子' },
      { name: '利瓦伊', dynasty: '明', achievement: '进士，循吏' },
      { name: '利瓦伊桢', dynasty: '明', achievement: '礼部尚书，文学家' },
    ],
    totem: '利字从刀从禾，本义为锋利。图腾为楚利氏后，象征芈姓楚国后裔。',
    history: '利姓源于姬姓，楚利氏之后。河南利氏为郡望，明利瓦伊桢为礼部尚书。',
  },
  {
    surname: '蔚',

    pinyin: 'Wèi',

    rank: 365,

    populationRank: 320,

    population: 18,
    origin: '源于姬姓，郑蔚氏之后。又源于地名，以蔚州为氏。',
    originPlace: { name: '河北蔚县', lng: 114.59, lat: 39.84 },
    originPeriod: '春秋',
    junwang: [
      { name: '琅邪郡', location: '山东临沂', lng: 118.35, lat: 35.05, tanghao: '琅邪堂' },
      { name: '代郡', location: '河北蔚县', lng: 114.59, lat: 39.84, tanghao: '代郡堂' },
    ],
    migration: [
      { name: '河北蔚县', lng: 114.59, lat: 39.84, period: '春秋', reason: '蔚州地望' },
      { name: '山东临沂', lng: 118.35, lat: 35.05, period: '汉代', reason: '琅邪蔚氏' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '魏晋', reason: '河南蔚氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '上海', lng: 121.47, lat: 31.23, period: '明清', reason: '迁居江南' },
    ],
    figures: [
      { name: '蔚昭', dynasty: '宋', achievement: '将领' },
      { name: '蔚兴', dynasty: '宋', achievement: '武翼大夫' },
      { name: '蔚能', dynasty: '明', achievement: '光禄寺卿，循吏' },
      { name: '蔚春', dynasty: '清', achievement: '进士，学者' },
    ],
    totem: '蔚字从艹从尉，本义为草木茂盛。图腾为蔚州地望，象征以地为氏。',
    history: '蔚姓源于姬姓，郑蔚氏之后。琅邪蔚氏为郡望，明蔚能为光禄寺卿。',
  },
  {
    surname: '越',

    pinyin: 'Yuè',

    rank: 366,

    populationRank: 340,

    population: 14,
    origin: '源于姒姓，越王后裔，以国为氏。又源于地名，以越地为氏。',
    originPlace: { name: '浙江绍兴', lng: 120.58, lat: 30.03 },
    originPeriod: '春秋',
    junwang: [
      { name: '会稽郡', location: '浙江绍兴', lng: 120.58, lat: 30.03, tanghao: '会稽堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '浙江绍兴', lng: 120.58, lat: 30.03, period: '春秋', reason: '越国地望' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '汉代', reason: '河南越氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '魏晋', reason: '南迁江左' },
      { name: '福建福州', lng: 119.30, lat: 26.08, period: '宋代', reason: '迁居闽中' },
      { name: '广东广州', lng: 113.27, lat: 23.13, period: '明清', reason: '迁居岭南' },
    ],
    figures: [
      { name: '越勾践', dynasty: '春秋', achievement: '越王，卧薪尝胆' },
      { name: '越石父', dynasty: '春秋', achievement: '齐贤人，晏婴解骖' },
      { name: '越智', dynasty: '明', achievement: '进士，循吏' },
      { name: '越其杰', dynasty: '明', achievement: '河南巡抚，诗人' },
    ],
    totem: '越字从走从戉，本义为度过。图腾为越国地望，象征姒姓越国后裔。',
    history: '越姓源于姒姓，越王后裔。会稽越氏为郡望，春秋越王勾践卧薪尝胆。',
  },
  {
    surname: '夔',

    pinyin: 'Kuí',

    rank: 367,

    populationRank: 380,

    population: 8,
    origin: '源于姬姓，楚夔国之后。又源于尧乐官夔之后。',
    originPlace: { name: '湖北秭归', lng: 110.98, lat: 30.83 },
    originPeriod: '春秋',
    junwang: [
      { name: '京兆郡', location: '陕西西安', lng: 108.95, lat: 34.27, tanghao: '京兆堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '湖北秭归', lng: 110.98, lat: 30.83, period: '春秋', reason: '夔国封地' },
      { name: '陕西西安', lng: 108.95, lat: 34.27, period: '汉代', reason: '京兆夔氏' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '魏晋', reason: '河南夔氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '上海', lng: 121.47, lat: 31.23, period: '明清', reason: '迁居江南' },
    ],
    figures: [
      { name: '夔', dynasty: '上古', achievement: '尧乐官，制乐' },
      { name: '夔安', dynasty: '汉', achievement: '学者' },
      { name: '夔信', dynasty: '明', achievement: '进士，循吏' },
      { name: '夔伯', dynasty: '清', achievement: '学者' },
    ],
    totem: '夔字象形，本义为神兽。图腾为楚夔国后，象征芈姓楚国后裔。',
    history: '夔姓源于姬姓，楚夔国之后。京兆夔氏为郡望，上古夔为尧乐官制乐。',
  },
  {
    surname: '隆',

    pinyin: 'Lóng',

    rank: 368,

    populationRank: 300,

    population: 22,
    origin: '源于姬姓，鲁隆氏之后。又源于地名，以隆地为氏。',
    originPlace: { name: '山东曲阜', lng: 116.98, lat: 35.58 },
    originPeriod: '春秋',
    junwang: [
      { name: '南阳郡', location: '河南南阳', lng: 112.53, lat: 33.00, tanghao: '南阳堂' },
      { name: '天水郡', location: '甘肃天水', lng: 105.72, lat: 34.58, tanghao: '天水堂' },
    ],
    migration: [
      { name: '山东曲阜', lng: 116.98, lat: 35.58, period: '春秋', reason: '鲁隆氏后' },
      { name: '河南南阳', lng: 112.53, lat: 33.00, period: '汉代', reason: '南阳隆氏' },
      { name: '甘肃天水', lng: 105.72, lat: 34.58, period: '魏晋', reason: '天水隆氏' },
      { name: '湖南长沙', lng: 112.94, lat: 28.23, period: '宋代', reason: '迁居湖南' },
      { name: '广西南宁', lng: 108.37, lat: 22.82, period: '明清', reason: '壮族隆氏' },
    ],
    figures: [
      { name: '隆山', dynasty: '宋', achievement: '高僧' },
      { name: '隆光先', dynasty: '明', achievement: '进士，循吏' },
      { name: '隆俊', dynasty: '清', achievement: '学者' },
      { name: '隆中翰', dynasty: '清', achievement: '进士，文学家' },
    ],
    totem: '隆字从阝从龙，本义为高起。图腾为鲁隆氏后，象征姬姓鲁国后裔。',
    history: '隆姓源于姬姓，鲁隆氏之后。南阳隆氏为郡望，清隆中翰为进士。',
  },
  {
    surname: '师',

    pinyin: 'Shī',

    rank: 369,

    populationRank: 250,

    population: 35,
    origin: '源于姬姓，周官师氏之后，以官为氏。又源于官名，乐师之后。',
    originPlace: { name: '陕西西安', lng: 108.95, lat: 34.27 },
    originPeriod: '西周',
    junwang: [
      { name: '琅邪郡', location: '山东临沂', lng: 118.35, lat: 35.05, tanghao: '琅邪堂' },
      { name: '平原郡', location: '山东平原', lng: 116.43, lat: 37.20, tanghao: '平原堂' },
    ],
    migration: [
      { name: '陕西西安', lng: 108.95, lat: 34.27, period: '西周', reason: '周师氏后' },
      { name: '山东临沂', lng: 118.35, lat: 35.05, period: '汉代', reason: '琅邪师氏' },
      { name: '山东平原', lng: 116.43, lat: 37.20, period: '魏晋', reason: '平原师氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '山西太原', lng: 112.55, lat: 37.87, period: '明清', reason: '迁居三晋' },
    ],
    figures: [
      { name: '师服', dynasty: '春秋', achievement: '晋国大夫' },
      { name: '师丹', dynasty: '汉', achievement: '大司马，高乐侯' },
      { name: '师心', dynasty: '宋', achievement: '画家' },
      { name: '师逵', dynasty: '明', achievement: '吏部尚书，忠臣' },
    ],
    totem: '师字从帀从匝，本义为官长。图腾为周师氏官后，象征以官为氏。',
    history: '师姓源于姬姓，周官师氏之后。琅邪师氏为郡望，汉师丹为大司马。',
  },
  {
    surname: '巩',

    pinyin: 'Gǒng',

    rank: 370,

    populationRank: 200,

    population: 50,
    origin: '源于姬姓，周巩伯之后。又源于地名，以巩地为氏。',
    originPlace: { name: '河南巩义', lng: 112.97, lat: 34.76 },
    originPeriod: '西周',
    junwang: [
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
      { name: '山阳郡', location: '山东金乡', lng: 116.23, lat: 35.07, tanghao: '山阳堂' },
    ],
    migration: [
      { name: '河南巩义', lng: 112.97, lat: 34.76, period: '西周', reason: '巩伯封地' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '汉代', reason: '河南巩氏' },
      { name: '山东金乡', lng: 116.23, lat: 35.07, period: '魏晋', reason: '山阳巩氏' },
      { name: '山西太原', lng: 112.55, lat: 37.87, period: '宋代', reason: '迁居三晋' },
      { name: '陕西西安', lng: 108.95, lat: 34.27, period: '明清', reason: '迁居关中' },
    ],
    figures: [
      { name: '巩朔', dynasty: '春秋', achievement: '晋国大夫' },
      { name: '巩信', dynasty: '宋', achievement: '抗金将领' },
      { name: '巩丰', dynasty: '宋', achievement: '学者，诗人' },
      { name: '巩建丰', dynasty: '清', achievement: '侍讲学士，陇上铁汉' },
    ],
    totem: '巩字从工从凡，本义为坚固。图腾为周巩伯后，象征姬姓周室后裔。',
    history: '巩姓源于姬姓，周巩伯之后。河南巩氏为郡望，清巩建丰为陇上铁汉。',
  },
  {
    surname: '厍',

    pinyin: 'Shè',

    rank: 371,

    populationRank: 350,

    population: 12,
    origin: '源于官名，周官厍人之后。又源于地名，以厍地为氏。',
    originPlace: { name: '陕西西安', lng: 108.95, lat: 34.27 },
    originPeriod: '西周',
    junwang: [
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
      { name: '松阳郡', location: '浙江松阳', lng: 119.48, lat: 28.45, tanghao: '松阳堂' },
    ],
    migration: [
      { name: '陕西西安', lng: 108.95, lat: 34.27, period: '西周', reason: '周厍人后' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '汉代', reason: '河南厍氏' },
      { name: '浙江松阳', lng: 119.48, lat: 28.45, period: '魏晋', reason: '松阳厍氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '上海', lng: 121.47, lat: 31.23, period: '明清', reason: '迁居江南' },
    ],
    figures: [
      { name: '厍钧', dynasty: '汉', achievement: '金城太守' },
      { name: '厍狄', dynasty: '北朝', achievement: '鲜卑姓汉化' },
      { name: '厍德旋', dynasty: '清', achievement: '学者' },
      { name: '厍容', dynasty: '清', achievement: '女诗人' },
    ],
    totem: '厍字从厂从车，本义为库房。图腾为周厍人官后，象征以官为氏。',
    history: '厍姓源于官名，周官厍人之后。河南厍氏为郡望，汉厍钧为金城太守。',
  },
  {
    surname: '聂',

    pinyin: 'Niè',

    rank: 372,

    populationRank: 126,

    population: 140,
    origin: '出自姜姓，齐丁公支庶封于聂，子孙以邑为氏。又出自姬姓，卫大夫食采于聂。',
    originPlace: { name: '聊城(聂邑)', lng: 115.99, lat: 36.46 },
    originPeriod: '春秋',
    junwang: [
      { name: '河东郡', location: '山西运城', lng: 111.00, lat: 35.03, tanghao: '河东堂' },
      { name: '新安郡', location: '河南新安', lng: 112.14, lat: 34.73, tanghao: '新安堂' },
    ],
    migration: [
      { name: '聊城', lng: 115.99, lat: 36.46, period: '春秋', reason: '齐丁公支庶封聂邑' },
      { name: '运城', lng: 111.00, lat: 35.03, period: '汉', reason: '聂氏迁河东，成郡望' },
      { name: '洛阳', lng: 112.45, lat: 34.62, period: '晋', reason: '聂氏仕宦中原' },
      { name: '南昌', lng: 115.89, lat: 28.68, period: '宋', reason: '聂氏南迁江西' },
      { name: '武汉', lng: 114.31, lat: 30.59, period: '明清', reason: '聂氏迁居湖广' },
    ],
    figures: [
      { name: '聂政', dynasty: '战国', achievement: '刺客，为知己者死' },
      { name: '聂夷中', dynasty: '唐', achievement: '诗人，咏田家作者' },
      { name: '聂冠卿', dynasty: '宋', achievement: '翰林学士，文学家' },
      { name: '聂荣臻', dynasty: '近代', achievement: '元帅，国防科技奠基人' },
    ],
    totem: '聂字从三耳会意，本义为附耳小语。图腾为多耳之人，象征聪听明察。',
    history: '聂姓源于姜姓，齐丁公支庶封聂邑得姓。河东聂氏为郡望，聂政为战国刺客，近代聂荣臻为开国元帅。',
  },
  {
    surname: '晁',

    pinyin: 'Cháo',

    rank: 373,

    populationRank: 200,

    population: 50,
    origin: '源于姬姓，周景王子朝之后。又源于地名，以晁地为氏。',
    originPlace: { name: '河南洛阳', lng: 112.45, lat: 34.62 },
    originPeriod: '春秋',
    junwang: [
      { name: '京兆郡', location: '陕西西安', lng: 108.95, lat: 34.27, tanghao: '京兆堂' },
      { name: '颍川郡', location: '河南禹州', lng: 113.49, lat: 34.16, tanghao: '颍川堂' },
    ],
    migration: [
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '春秋', reason: '王子朝后' },
      { name: '陕西西安', lng: 108.95, lat: 34.27, period: '汉代', reason: '京兆晁氏' },
      { name: '河南禹州', lng: 113.49, lat: 34.16, period: '魏晋', reason: '颍川晁氏' },
      { name: '浙江绍兴', lng: 120.58, lat: 30.03, period: '宋代', reason: '迁居会稽' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '明清', reason: '南迁江左' },
    ],
    figures: [
      { name: '晁错', dynasty: '汉', achievement: '御史大夫，政治家' },
      { name: '晁迥', dynasty: '宋', achievement: '礼部尚书' },
      { name: '晁补之', dynasty: '宋', achievement: '文学家，苏门四学士之一' },
      { name: '晁冲之', dynasty: '宋', achievement: '诗人，江西诗派' },
    ],
    totem: '晁字从日从兆，本义为晨旦。图腾为王子朝后，象征姬姓周室后裔。',
    history: '晁姓源于姬姓，周景王子朝之后。京兆晁氏为郡望，汉晁错为御史大夫。',
  },
  {
    surname: '勾',

    pinyin: 'Gōu',

    rank: 374,

    populationRank: 320,

    population: 18,
    origin: '源于姬姓，又源于官名。又作句，通用。',
    originPlace: { name: '河南洛阳', lng: 112.45, lat: 34.62 },
    originPeriod: '西周',
    junwang: [
      { name: '平阳郡', location: '山西临汾', lng: 111.52, lat: 36.08, tanghao: '平阳堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '西周', reason: '姬姓后裔' },
      { name: '山西临汾', lng: 111.52, lat: 36.08, period: '汉代', reason: '平阳勾氏' },
      { name: '四川成都', lng: 104.07, lat: 30.67, period: '魏晋', reason: '蜀地勾氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '山东济南', lng: 117.00, lat: 36.65, period: '明清', reason: '迁居齐鲁' },
    ],
    figures: [
      { name: '勾涛', dynasty: '宋', achievement: '川陕宣抚使' },
      { name: '勾龙', dynasty: '宋', achievement: '学者' },
      { name: '勾华', dynasty: '明', achievement: '进士，循吏' },
      { name: '勾兆奎', dynasty: '清', achievement: '学者' },
    ],
    totem: '勾字从勹从厶，本义为曲。图腾为姬姓后裔，象征以字为氏。',
    history: '勾姓源于姬姓，又作句。平阳勾氏为郡望，宋勾涛为川陕宣抚使。',
  },
  {
    surname: '敖',

    pinyin: 'Áo',

    rank: 375,

    populationRank: 250,

    population: 35,
    origin: '源于姬姓，颛顼大敖之后。又源于地名，以敖地为氏。',
    originPlace: { name: '河南洛阳', lng: 112.45, lat: 34.62 },
    originPeriod: '上古',
    junwang: [
      { name: '谯国郡', location: '安徽亳州', lng: 115.78, lat: 33.85, tanghao: '谯国堂' },
      { name: '鲁郡', location: '山东曲阜', lng: 116.98, lat: 35.58, tanghao: '鲁郡堂' },
    ],
    migration: [
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '上古', reason: '颛顼大敖后' },
      { name: '山东曲阜', lng: 116.98, lat: 35.58, period: '汉代', reason: '鲁郡敖氏' },
      { name: '安徽亳州', lng: 115.78, lat: 33.85, period: '魏晋', reason: '谯国敖氏' },
      { name: '江西新干', lng: 115.39, lat: 27.78, period: '宋代', reason: '迁居江西' },
      { name: '四川成都', lng: 104.07, lat: 30.67, period: '明清', reason: '迁居蜀地' },
    ],
    figures: [
      { name: '敖陶孙', dynasty: '宋', achievement: '诗人，名士' },
      { name: '敖继公', dynasty: '元', achievement: '经学家，学者' },
      { name: '敖山', dynasty: '明', achievement: '河南右布政使' },
      { name: '敖英', dynasty: '明', achievement: '四川布政使，文学家' },
    ],
    totem: '敖字从出从放，本义为游遨。图腾为颛顼大敖后，象征高阳氏后裔。',
    history: '敖姓源于姬姓，颛顼大敖之后。谯国敖氏为郡望，宋敖陶孙为诗人名士。',
  },
  {
    surname: '融',

    pinyin: 'Róng',

    rank: 376,

    populationRank: 340,

    population: 14,
    origin: '源于高阳氏，祝融之后。又源于官名，火正之后。',
    originPlace: { name: '河南新郑', lng: 113.74, lat: 34.40 },
    originPeriod: '上古',
    junwang: [
      { name: '南康郡', location: '江西于都', lng: 115.41, lat: 25.95, tanghao: '南康堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '河南新郑', lng: 113.74, lat: 34.40, period: '上古', reason: '祝融后' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '汉代', reason: '河南融氏' },
      { name: '江西于都', lng: 115.41, lat: 25.95, period: '魏晋', reason: '南康融氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '广西桂林', lng: 110.18, lat: 25.24, period: '明清', reason: '迁居岭南' },
    ],
    figures: [
      { name: '融照', dynasty: '南朝', achievement: '高僧，律师' },
      { name: '融曾', dynasty: '明', achievement: '进士，循吏' },
      { name: '融端', dynasty: '清', achievement: '女诗人' },
      { name: '融明', dynasty: '清', achievement: '学者' },
    ],
    totem: '融字从鬲从虫，本义为炊气上出。图腾为祝融后，象征高阳氏火正后裔。',
    history: '融姓源于高阳氏，祝融之后。南康融氏为郡望，南朝融照为高僧律师。',
  },
  {
    surname: '冷',

    pinyin: 'Lěng',

    rank: 377,

    populationRank: 250,

    population: 35,
    origin: '源于姬姓，泠人之后，后改泠为冷。又源于官名，泠官之后。',
    originPlace: { name: '陕西西安', lng: 108.95, lat: 34.27 },
    originPeriod: '西周',
    junwang: [
      { name: '京兆郡', location: '陕西西安', lng: 108.95, lat: 34.27, tanghao: '京兆堂' },
      { name: '新蔡郡', location: '河南新蔡', lng: 114.98, lat: 32.75, tanghao: '新蔡堂' },
    ],
    migration: [
      { name: '陕西西安', lng: 108.95, lat: 34.27, period: '西周', reason: '泠人后' },
      { name: '河南新蔡', lng: 114.98, lat: 32.75, period: '汉代', reason: '新蔡冷氏' },
      { name: '四川成都', lng: 104.07, lat: 30.67, period: '魏晋', reason: '蜀地冷氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '湖南长沙', lng: 112.94, lat: 28.23, period: '明清', reason: '迁居湖南' },
    ],
    figures: [
      { name: '冷谦', dynasty: '明', achievement: '道士，画家，音乐家' },
      { name: '冷宽', dynasty: '明', achievement: '进士，循吏' },
      { name: '冷枚', dynasty: '清', achievement: '画家，宫廷画师' },
      { name: '冷玉', dynasty: '清', achievement: '学者' },
    ],
    totem: '冷字从冫从令，本义为寒凉。图腾为泠人后，象征以官为氏改泠为冷。',
    history: '冷姓源于姬姓，泠人之后改泠为冷。京兆冷氏为郡望，明冷谦为道士画家。',
  },
  {
    surname: '訾',

    pinyin: 'Zī',

    rank: 378,

    populationRank: 320,

    population: 18,
    origin: '源于姬姓，晋大夫訾祐之后。又源于地名，以訾地为氏。',
    originPlace: { name: '山西闻喜', lng: 111.23, lat: 35.36 },
    originPeriod: '春秋',
    junwang: [
      { name: '渤海郡', location: '河北沧州', lng: 116.84, lat: 38.31, tanghao: '渤海堂' },
      { name: '齐郡', location: '山东淄博', lng: 118.05, lat: 36.78, tanghao: '齐郡堂' },
    ],
    migration: [
      { name: '山西闻喜', lng: 111.23, lat: 35.36, period: '春秋', reason: '晋訾祐后' },
      { name: '山东淄博', lng: 118.05, lat: 36.78, period: '汉代', reason: '齐郡訾氏' },
      { name: '河北沧州', lng: 116.84, lat: 38.31, period: '魏晋', reason: '渤海訾氏' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '宋代', reason: '河南訾氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '明清', reason: '南迁江左' },
    ],
    figures: [
      { name: '訾顺', dynasty: '汉', achievement: '中垒校尉' },
      { name: '訾祏', dynasty: '春秋', achievement: '晋国大夫' },
      { name: '訾亘', dynasty: '元', achievement: '高道，全真道士' },
      { name: '訾汝道', dynasty: '元', achievement: '孝子，义士' },
    ],
    totem: '訾字从言从此，本义为思量。图腾为晋訾祐后，象征姬姓晋国后裔。',
    history: '訾姓源于姬姓，晋大夫訾祐之后。渤海訾氏为郡望，汉訾顺为中垒校尉。',
  },
  {
    surname: '辛',

    pinyin: 'Xīn',

    rank: 379,

    populationRank: 130,

    population: 140,
    origin: '源于姒姓，夏启封支子于辛。又源于官名，周官辛氏之后。',
    originPlace: { name: '河南禹州', lng: 113.49, lat: 34.16 },
    originPeriod: '夏代',
    junwang: [
      { name: '陇西郡', location: '甘肃临洮', lng: 103.86, lat: 35.37, tanghao: '陇西堂' },
      { name: '雁门郡', location: '山西代县', lng: 112.96, lat: 39.07, tanghao: '雁门堂' },
    ],
    migration: [
      { name: '河南禹州', lng: 113.49, lat: 34.16, period: '夏代', reason: '夏启封支子' },
      { name: '甘肃临洮', lng: 103.86, lat: 35.37, period: '汉代', reason: '陇西辛氏' },
      { name: '山西代县', lng: 112.96, lat: 39.07, period: '魏晋', reason: '雁门辛氏' },
      { name: '山东济南', lng: 117.00, lat: 36.65, period: '宋代', reason: '迁居齐鲁' },
      { name: '江苏徐州', lng: 117.18, lat: 34.26, period: '明清', reason: '迁居徐州' },
    ],
    figures: [
      { name: '辛毗', dynasty: '三国', achievement: '魏国卫尉，直臣' },
      { name: '辛弃疾', dynasty: '宋', achievement: '词人，将领，豪放派代表' },
      { name: '辛赞', dynasty: '宋', achievement: '金朝官员，辛弃疾祖父' },
      { name: '辛文悦', dynasty: '宋', achievement: '参知政事' },
    ],
    totem: '辛字象形，本义为刑刀。图腾为夏启封支子于辛，象征姒姓夏后氏后裔。',
    history: '辛姓源于姒姓，夏启封支子于辛。陇西辛氏为郡望，宋辛弃疾为豪放词派代表。',
  },
  {
    surname: '阚',

    pinyin: 'Kàn',

    rank: 380,

    populationRank: 200,

    population: 50,
    origin: '源于姬姓，齐阚止之后。又源于地名，以阚地为氏。',
    originPlace: { name: '山东汶上', lng: 116.49, lat: 35.71 },
    originPeriod: '春秋',
    junwang: [
      { name: '会稽郡', location: '浙江绍兴', lng: 120.58, lat: 30.03, tanghao: '会稽堂' },
      { name: '鲁郡', location: '山东曲阜', lng: 116.98, lat: 35.58, tanghao: '鲁郡堂' },
    ],
    migration: [
      { name: '山东汶上', lng: 116.49, lat: 35.71, period: '春秋', reason: '齐阚止后' },
      { name: '山东曲阜', lng: 116.98, lat: 35.58, period: '汉代', reason: '鲁郡阚氏' },
      { name: '浙江绍兴', lng: 120.58, lat: 30.03, period: '魏晋', reason: '会稽阚氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '安徽合肥', lng: 117.27, lat: 31.86, period: '明清', reason: '迁居庐州' },
    ],
    figures: [
      { name: '阚泽', dynasty: '三国', achievement: '吴国太傅，学者' },
      { name: '阚駰', dynasty: '北魏', achievement: '地理学家，《十三州志》作者' },
      { name: '阚棱', dynasty: '唐', achievement: '左领将军，名将' },
      { name: '阚祯兆', dynasty: '清', achievement: '诗人，学者' },
    ],
    totem: '阚字从门从敢，本义为望。图腾为齐阚止后，象征姜姓齐国后裔。',
    history: '阚姓源于姬姓，齐阚止之后。会稽阚氏为郡望，三国阚泽为吴国太傅。',
  },
  {
    surname: '那',

    pinyin: 'Nā',

    rank: 381,

    populationRank: 280,

    population: 28,
    origin: '源于姬姓，楚那处之后。又源于地名，以那地为氏。',
    originPlace: { name: '湖北荆门', lng: 112.20, lat: 31.04 },
    originPeriod: '春秋',
    junwang: [
      { name: '丹阳郡', location: '安徽当涂', lng: 118.49, lat: 31.55, tanghao: '丹阳堂' },
      { name: '京兆郡', location: '陕西西安', lng: 108.95, lat: 34.27, tanghao: '京兆堂' },
    ],
    migration: [
      { name: '湖北荆门', lng: 112.20, lat: 31.04, period: '春秋', reason: '楚那处后' },
      { name: '陕西西安', lng: 108.95, lat: 34.27, period: '汉代', reason: '京兆那氏' },
      { name: '安徽当涂', lng: 118.49, lat: 31.55, period: '魏晋', reason: '丹阳那氏' },
      { name: '辽宁沈阳', lng: 123.43, lat: 41.80, period: '清代', reason: '满族汉化' },
      { name: '吉林延吉', lng: 129.51, lat: 42.89, period: '现代', reason: '朝鲜族那氏' },
    ],
    figures: [
      { name: '那椿', dynasty: '明', achievement: '进士，循吏' },
      { name: '那宪', dynasty: '明', achievement: '学者' },
      { name: '那彦成', dynasty: '清', achievement: '直隶总督，满族' },
      { name: '那桐', dynasty: '清', achievement: '内阁总理大臣' },
    ],
    totem: '那字从邑从冉，本义为西夷国名。图腾为楚那处后，象征芈姓楚国后裔。',
    history: '那姓源于姬姓，楚那处之后。丹阳那氏为郡望，清那彦成为直隶总督。',
  },
  {
    surname: '简',

    pinyin: 'Jiǎn',

    rank: 382,

    populationRank: 180,

    population: 65,
    origin: '源于姬姓，晋大夫简氏之后。又源于谥号，周简王之后。',
    originPlace: { name: '山西闻喜', lng: 111.23, lat: 35.36 },
    originPeriod: '春秋',
    junwang: [
      { name: '范阳郡', location: '河北涿州', lng: 115.97, lat: 39.49, tanghao: '范阳堂' },
      { name: '涿郡', location: '河北涿州', lng: 115.97, lat: 39.49, tanghao: '涿郡堂' },
    ],
    migration: [
      { name: '山西闻喜', lng: 111.23, lat: 35.36, period: '春秋', reason: '晋简氏后' },
      { name: '河北涿州', lng: 115.97, lat: 39.49, period: '汉代', reason: '范阳简氏' },
      { name: '江西新余', lng: 114.92, lat: 27.81, period: '宋代', reason: '迁居江西' },
      { name: '广东广州', lng: 113.27, lat: 23.13, period: '明清', reason: '迁居岭南' },
      { name: '四川成都', lng: 104.07, lat: 30.67, period: '现代', reason: '迁居蜀地' },
    ],
    figures: [
      { name: '简雍', dynasty: '三国', achievement: '蜀汉昭德将军' },
      { name: '简大猷', dynasty: '宋', achievement: '进士' },
      { name: '简而廉', dynasty: '明', achievement: '学者' },
      { name: '简朝亮', dynasty: '清', achievement: '学者，岭南名儒' },
    ],
    totem: '简字从竹从间，本义为竹简。图腾为晋简氏后，象征姬姓晋国后裔。',
    history: '简姓源于姬姓，晋大夫简氏之后。范阳简氏为郡望，三国简雍为蜀汉昭德将军。',
  },
  {
    surname: '饶',

    pinyin: 'Ráo',

    rank: 383,

    populationRank: 170,

    population: 72,
    origin: '源于姬姓，燕饶地之后。又源于地名，以饶地为氏。',
    originPlace: { name: '河北饶阳', lng: 115.74, lat: 38.23 },
    originPeriod: '春秋',
    junwang: [
      { name: '平阳郡', location: '山西临汾', lng: 111.52, lat: 36.08, tanghao: '平阳堂' },
      { name: '临川郡', location: '江西抚州', lng: 116.36, lat: 27.95, tanghao: '临川堂' },
    ],
    migration: [
      { name: '河北饶阳', lng: 115.74, lat: 38.23, period: '春秋', reason: '燕饶地后' },
      { name: '山西临汾', lng: 111.52, lat: 36.08, period: '汉代', reason: '平阳饶氏' },
      { name: '江西抚州', lng: 116.36, lat: 27.95, period: '魏晋', reason: '临川饶氏' },
      { name: '福建福州', lng: 119.30, lat: 26.08, period: '宋代', reason: '迁居闽中' },
      { name: '广东梅州', lng: 116.12, lat: 24.29, period: '明清', reason: '客家饶氏' },
    ],
    figures: [
      { name: '饶娥', dynasty: '唐', achievement: '孝女' },
      { name: '饶鲁', dynasty: '宋', achievement: '理学家，双峰先生' },
      { name: '饶介', dynasty: '元', achievement: '书法家' },
      { name: '饶宗颐', dynasty: '现代', achievement: '国学大师，汉学家' },
    ],
    totem: '饶字从食从尧，本义为饱食。图腾为燕饶地后，象征姬姓燕国后裔。',
    history: '饶姓源于姬姓，燕饶地之后。平阳饶氏为郡望，现代饶宗颐为国学大师。',
  },
  {
    surname: '空',

    pinyin: 'Kōng',

    rank: 384,

    populationRank: 350,

    population: 12,
    origin: '源于姬姓，周空桐氏之后。又源于地名，以空桐为氏。',
    originPlace: { name: '河南虞城', lng: 115.87, lat: 34.07 },
    originPeriod: '西周',
    junwang: [
      { name: '孔丘郡', location: '山东曲阜', lng: 116.98, lat: 35.58, tanghao: '孔丘堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '河南虞城', lng: 115.87, lat: 34.07, period: '西周', reason: '空桐地望' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '汉代', reason: '河南空氏' },
      { name: '山东曲阜', lng: 116.98, lat: 35.58, period: '魏晋', reason: '鲁郡空氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '上海', lng: 121.47, lat: 31.23, period: '明清', reason: '迁居江南' },
    ],
    figures: [
      { name: '空空', dynasty: '唐', achievement: '高僧，高力士养子' },
      { name: '空海', dynasty: '唐', achievement: '日本僧人，入唐求法' },
      { name: '空同', dynasty: '明', achievement: '道士' },
      { name: '空隐', dynasty: '清', achievement: '高僧' },
    ],
    totem: '空字从穴从工，本义为孔窍。图腾为空桐地望，象征姬姓周室后裔。',
    history: '空姓源于姬姓，周空桐氏之后。河南空氏为郡望，以空桐地望为氏。',
  },
  {
    surname: '曾',

    pinyin: 'Zēng',

    rank: 385,

    populationRank: 32,

    population: 770,
    origin: '源于姒姓，鄫国之后，去邑为曾。又源于地名，以鄫地为氏。',
    originPlace: { name: '山东兰陵', lng: 118.05, lat: 34.85 },
    originPeriod: '春秋',
    junwang: [
      { name: '鲁郡', location: '山东曲阜', lng: 116.98, lat: 35.58, tanghao: '鲁郡堂' },
      { name: '庐陵郡', location: '江西吉安', lng: 114.99, lat: 27.11, tanghao: '庐陵堂' },
    ],
    migration: [
      { name: '山东兰陵', lng: 118.05, lat: 34.85, period: '春秋', reason: '鄫国后改' },
      { name: '山东曲阜', lng: 116.98, lat: 35.58, period: '汉代', reason: '鲁郡曾氏' },
      { name: '江西吉安', lng: 114.99, lat: 27.11, period: '宋代', reason: '迁居庐陵' },
      { name: '福建泉州', lng: 118.58, lat: 24.93, period: '明清', reason: '迁居闽南' },
      { name: '广东梅州', lng: 116.12, lat: 24.29, period: '现代', reason: '客家曾氏' },
    ],
    figures: [
      { name: '曾参', dynasty: '春秋', achievement: '孔子弟子，宗圣' },
      { name: '曾巩', dynasty: '宋', achievement: '文学家，唐宋八大家之一' },
      { name: '曾国藩', dynasty: '清', achievement: '两江总督，湘军创立者' },
      { name: '曾纪泽', dynasty: '清', achievement: '外交家，驻英法公使' },
    ],
    totem: '曾字从曰从八从田，本义为乃。图腾为鄫国后去邑为曾，象征姒姓后裔。',
    history: '曾姓源于姒姓，鄫国之后去邑为曾。鲁郡曾氏为郡望，春秋曾参为宗圣。',
  },
  {
    surname: '毋',

    pinyin: 'Wú',

    rank: 386,

    populationRank: 350,

    population: 12,
    origin: '源于姬姓，又源于地名毋丘。又源于官名。',
    originPlace: { name: '山东聊城', lng: 115.99, lat: 36.46 },
    originPeriod: '春秋',
    junwang: [
      { name: '河东郡', location: '山西夏县', lng: 111.22, lat: 35.14, tanghao: '河东堂' },
      { name: '巨鹿郡', location: '河北平乡', lng: 114.92, lat: 37.07, tanghao: '巨鹿堂' },
    ],
    migration: [
      { name: '山东聊城', lng: 115.99, lat: 36.46, period: '春秋', reason: '毋丘地望' },
      { name: '山西夏县', lng: 111.22, lat: 35.14, period: '汉代', reason: '河东毋氏' },
      { name: '河北平乡', lng: 114.92, lat: 37.07, period: '魏晋', reason: '巨鹿毋氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '四川成都', lng: 104.07, lat: 30.67, period: '明清', reason: '迁居蜀地' },
    ],
    figures: [
      { name: '毋将隆', dynasty: '汉', achievement: '颍川太守，直臣' },
      { name: '毋雅', dynasty: '晋', achievement: '涪陵太守' },
      { name: '毋炯', dynasty: '宋', achievement: '进士' },
      { name: '毋制机', dynasty: '宋', achievement: '学者，藏书家' },
    ],
    totem: '毋字象形，本义为禁止。图腾为毋丘地望，象征以地为氏。',
    history: '毋姓源于姬姓，又源于地名毋丘。河东毋氏为郡望，汉毋将隆为颍川太守。',
  },
  {
    surname: '沙',

    pinyin: 'Shā',

    rank: 387,

    populationRank: 200,

    population: 50,
    origin: '源于姬姓，宋沙氏之后。又源于地名，以沙地为氏。',
    originPlace: { name: '河南商丘', lng: 115.65, lat: 34.44 },
    originPeriod: '春秋',
    junwang: [
      { name: '东莞郡', location: '山东沂水', lng: 118.63, lat: 35.78, tanghao: '东莞堂' },
      { name: '汝南郡', location: '河南汝南', lng: 114.36, lat: 33.00, tanghao: '汝南堂' },
    ],
    migration: [
      { name: '河南商丘', lng: 115.65, lat: 34.44, period: '春秋', reason: '宋沙氏后' },
      { name: '河南汝南', lng: 114.36, lat: 33.00, period: '汉代', reason: '汝南沙氏' },
      { name: '山东沂水', lng: 118.63, lat: 35.78, period: '魏晋', reason: '东莞沙氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '广东广州', lng: 113.27, lat: 23.13, period: '明清', reason: '回族沙氏' },
    ],
    figures: [
      { name: '沙世坚', dynasty: '宋', achievement: '武经郎，名将' },
      { name: '沙玉', dynasty: '明', achievement: '刑部侍郎，循吏' },
      { name: '沙金', dynasty: '明', achievement: '画家' },
      { name: '沙琛', dynasty: '清', achievement: '学者，诗人' },
    ],
    totem: '沙字从水从少，本义为水旁细石。图腾为宋沙氏后，象征子姓宋国后裔。',
    history: '沙姓源于姬姓，宋沙氏之后。汝南沙氏为郡望，宋沙世坚为武经郎名将。',
  },
  {
    surname: '乜',

    pinyin: 'Niè',

    rank: 388,

    populationRank: 360,

    population: 10,
    origin: '源于姬姓，晋大夫乜氏之后。又源于蕃姓，乜摄之后。',
    originPlace: { name: '山西晋城', lng: 112.85, lat: 35.49 },
    originPeriod: '春秋',
    junwang: [
      { name: '晋昌郡', location: '山西介休', lng: 111.92, lat: 37.03, tanghao: '晋昌堂' },
      { name: '赵郡', location: '河北赵县', lng: 114.77, lat: 37.75, tanghao: '赵郡堂' },
    ],
    migration: [
      { name: '山西晋城', lng: 112.85, lat: 35.49, period: '春秋', reason: '晋乜氏后' },
      { name: '山西介休', lng: 111.92, lat: 37.03, period: '汉代', reason: '晋昌乜氏' },
      { name: '河北赵县', lng: 114.77, lat: 37.75, period: '魏晋', reason: '赵郡乜氏' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '宋代', reason: '河南乜氏' },
      { name: '山东临清', lng: 115.71, lat: 36.84, period: '明清', reason: '回族乜氏' },
    ],
    figures: [
      { name: '乜先', dynasty: '明', achievement: '蒙古瓦剌部首领' },
      { name: '乜富', dynasty: '明', achievement: '进士，循吏' },
      { name: '乜贤', dynasty: '清', achievement: '学者' },
      { name: '乜永桢', dynasty: '清', achievement: '诗人' },
    ],
    totem: '乜字象形，本义为斜视。图腾为晋乜氏后，象征姬姓晋国后裔。',
    history: '乜姓源于姬姓，晋大夫乜氏之后。晋昌乜氏为郡望，明乜先为瓦剌部首领。',
  },
  {
    surname: '养',

    pinyin: 'Yǎng',

    rank: 389,

    populationRank: 340,

    population: 14,
    origin: '源于姬姓，楚养由基之后。又源于地名，以养地为氏。',
    originPlace: { name: '河南宝丰', lng: 113.05, lat: 33.87 },
    originPeriod: '春秋',
    junwang: [
      { name: '山阳郡', location: '山东金乡', lng: 116.23, lat: 35.07, tanghao: '山阳堂' },
      { name: '南阳郡', location: '河南南阳', lng: 112.53, lat: 33.00, tanghao: '南阳堂' },
    ],
    migration: [
      { name: '河南宝丰', lng: 113.05, lat: 33.87, period: '春秋', reason: '楚养地后' },
      { name: '河南南阳', lng: 112.53, lat: 33.00, period: '汉代', reason: '南阳养氏' },
      { name: '山东金乡', lng: 116.23, lat: 35.07, period: '魏晋', reason: '山阳养氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '安徽合肥', lng: 117.27, lat: 31.86, period: '明清', reason: '迁居庐州' },
    ],
    figures: [
      { name: '养由基', dynasty: '春秋', achievement: '楚国大夫，百步穿杨' },
      { name: '养奋', dynasty: '汉', achievement: '处士，博通经史' },
      { name: '养岿', dynasty: '明', achievement: '进士，循吏' },
      { name: '养盛', dynasty: '清', achievement: '学者' },
    ],
    totem: '养字从食从羊，本义为饲养。图腾为楚养由基后，象征芈姓楚国后裔。',
    history: '养姓源于姬姓，楚养由基之后。山阳养氏为郡望，春秋养由基百步穿杨。',
  },
  {
    surname: '鞠',

    pinyin: 'Jū',

    rank: 390,

    populationRank: 280,

    population: 28,
    origin: '源于姬姓，周鞠伯之后。又源于地名，以鞠地为氏。',
    originPlace: { name: '河南洛阳', lng: 112.45, lat: 34.62 },
    originPeriod: '西周',
    junwang: [
      { name: '汝南郡', location: '河南汝南', lng: 114.36, lat: 33.00, tanghao: '汝南堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '西周', reason: '鞠伯后' },
      { name: '河南汝南', lng: 114.36, lat: 33.00, period: '汉代', reason: '汝南鞠氏' },
      { name: '山东潍坊', lng: 119.16, lat: 36.70, period: '魏晋', reason: '东莱鞠氏' },
      { name: '辽宁沈阳', lng: 123.43, lat: 41.80, period: '清代', reason: '满族汉化' },
      { name: '吉林长春', lng: 125.32, lat: 43.82, period: '现代', reason: '东北鞠氏' },
    ],
    figures: [
      { name: '鞠武', dynasty: '战国', achievement: '燕太子丹太傅' },
      { name: '鞠允', dynasty: '晋', achievement: '左仆射' },
      { name: '鞠嗣捴', dynasty: '宋', achievement: '进士，循吏' },
      { name: '鞠清远', dynasty: '清', achievement: '学者' },
    ],
    totem: '鞠字从革从匊，本义为蹋鞠。图腾为周鞠伯后，象征姬姓周室后裔。',
    history: '鞠姓源于姬姓，周鞠伯之后。汝南鞠氏为郡望，战国鞠武为燕太子丹太傅。',
  },
  {
    surname: '须',

    pinyin: 'Xū',

    rank: 391,

    populationRank: 360,

    population: 10,
    origin: '源于风姓，太昊须句之后。又源于地名，以须地为氏。',
    originPlace: { name: '山东东平', lng: 116.30, lat: 35.91 },
    originPeriod: '春秋',
    junwang: [
      { name: '渤海郡', location: '河北沧州', lng: 116.84, lat: 38.31, tanghao: '渤海堂' },
      { name: '琅邪郡', location: '山东临沂', lng: 118.35, lat: 35.05, tanghao: '琅邪堂' },
    ],
    migration: [
      { name: '山东东平', lng: 116.30, lat: 35.91, period: '春秋', reason: '须句国后' },
      { name: '山东临沂', lng: 118.35, lat: 35.05, period: '汉代', reason: '琅邪须氏' },
      { name: '河北沧州', lng: 116.84, lat: 38.31, period: '魏晋', reason: '渤海须氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '上海', lng: 121.47, lat: 31.23, period: '明清', reason: '迁居江南' },
    ],
    figures: [
      { name: '须无', dynasty: '汉', achievement: '陆量侯' },
      { name: '须绍', dynasty: '汉', achievement: '学者' },
      { name: '须用纶', dynasty: '明', achievement: '进士，循吏' },
      { name: '须良知', dynasty: '清', achievement: '学者' },
    ],
    totem: '须字从页从彡，本义为胡须。图腾为须句国后，象征风姓太昊后裔。',
    history: '须姓源于风姓，太昊须句之后。渤海须氏为郡望，汉须无为陆量侯。',
  },
  {
    surname: '丰',

    pinyin: 'Fēng',

    rank: 392,

    populationRank: 200,

    population: 50,
    origin: '源于姬姓，周文王之后丰侯。又源于地名，以丰地为氏。',
    originPlace: { name: '陕西西安', lng: 108.95, lat: 34.27 },
    originPeriod: '西周',
    junwang: [
      { name: '京兆郡', location: '陕西西安', lng: 108.95, lat: 34.27, tanghao: '京兆堂' },
      { name: '松阳郡', location: '浙江松阳', lng: 119.48, lat: 28.45, tanghao: '松阳堂' },
    ],
    migration: [
      { name: '陕西西安', lng: 108.95, lat: 34.27, period: '西周', reason: '文王子丰侯' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '汉代', reason: '河南丰氏' },
      { name: '浙江松阳', lng: 119.48, lat: 28.45, period: '魏晋', reason: '松阳丰氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '广东广州', lng: 113.27, lat: 23.13, period: '明清', reason: '迁居岭南' },
    ],
    figures: [
      { name: '丰干', dynasty: '唐', achievement: '高僧，丰干禅师' },
      { name: '丰稷', dynasty: '宋', achievement: '吏部尚书，清官' },
      { name: '丰坊', dynasty: '明', achievement: '书法家，藏书家' },
      { name: '丰伸豪', dynasty: '清', achievement: '满族大臣' },
    ],
    totem: '丰字象形，本义为豆器满。图腾为文王子丰侯后，象征姬姓周室后裔。',
    history: '丰姓源于姬姓，周文王之后丰侯。京兆丰氏为郡望，宋丰稷为吏部尚书。',
  },
  {
    surname: '巢',

    pinyin: 'Cháo',

    rank: 393,

    populationRank: 280,

    population: 28,
    origin: '源于有巢氏，又有巢国之后。又源于地名，以巢地为氏。',
    originPlace: { name: '安徽巢湖', lng: 117.87, lat: 31.60 },
    originPeriod: '上古',
    junwang: [
      { name: '彭城郡', location: '江苏徐州', lng: 117.18, lat: 34.26, tanghao: '彭城堂' },
      { name: '鲁郡', location: '山东曲阜', lng: 116.98, lat: 35.58, tanghao: '鲁郡堂' },
    ],
    migration: [
      { name: '安徽巢湖', lng: 117.87, lat: 31.60, period: '上古', reason: '有巢国后' },
      { name: '山东曲阜', lng: 116.98, lat: 35.58, period: '汉代', reason: '鲁郡巢氏' },
      { name: '江苏徐州', lng: 117.18, lat: 34.26, period: '魏晋', reason: '彭城巢氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '广东广州', lng: 113.27, lat: 23.13, period: '明清', reason: '迁居岭南' },
    ],
    figures: [
      { name: '巢父', dynasty: '上古', achievement: '隐士，许由之友' },
      { name: '巢堪', dynasty: '汉', achievement: '司空' },
      { name: '巢谷', dynasty: '宋', achievement: '苏辙友人，义士' },
      { name: '巢鸣盛', dynasty: '清', achievement: '明遗民，孝子' },
    ],
    totem: '巢字从巢从木，本义为鸟巢。图腾为有巢氏后，象征上古氏族后裔。',
    history: '巢姓源于有巢氏，有巢国之后。彭城巢氏为郡望，上古巢父为隐士。',
  },
  {
    surname: '关',

    pinyin: 'Guān',

    rank: 394,

    populationRank: 131,

    population: 171,
    origin: '源于夏代关龙逢之后，以官为氏。又源于姬姓，春秋关尹喜之后。',
    originPlace: { name: '河南颍川', lng: 113.04, lat: 34.09 },
    originPeriod: '夏代',
    junwang: [
      { name: '陇西郡', location: '甘肃临洮', lng: 103.86, lat: 35.37, tanghao: '陇西堂' },
      { name: '东海郡', location: '山东郯城', lng: 118.36, lat: 34.61, tanghao: '东海堂' },
    ],
    migration: [
      { name: '河南颍川', lng: 113.04, lat: 34.09, period: '夏代', reason: '关龙逢之后' },
      { name: '甘肃临洮', lng: 103.86, lat: 35.37, period: '汉代', reason: '陇西望族' },
      { name: '山西运城', lng: 111.01, lat: 35.02, period: '三国', reason: '关羽祖籍' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '唐代', reason: '仕宦中原' },
      { name: '广东广州', lng: 113.27, lat: 23.13, period: '宋代', reason: '南迁岭南' },
    ],
    figures: [
      { name: '关龙逢', dynasty: '夏', achievement: '忠臣，直言被杀' },
      { name: '关羽', dynasty: '三国', achievement: '蜀汉名将，武圣' },
      { name: '关仝', dynasty: '五代', achievement: '画家，关家山水' },
      { name: '关天培', dynasty: '清', achievement: '抗英将领' },
    ],
    totem: '关字从门从丝，本义为门闩。图腾象征守关护族，夏代关龙逢之后。',
    history: '关姓源于夏代关龙逢之后，以官为氏。陇西关氏为郡望，三国关羽最为著名。',
  },
  {
    surname: '蒯',

    pinyin: 'Kuǎi',

    rank: 395,

    populationRank: 288,

    population: 23,
    origin: '源于姬姓，春秋晋国大夫蒯得之后，以邑为氏。又源于商代蒯国之后。',
    originPlace: { name: '河南洛阳', lng: 112.45, lat: 34.62 },
    originPeriod: '春秋',
    junwang: [
      { name: '襄阳郡', location: '湖北襄阳', lng: 112.14, lat: 32.02, tanghao: '襄阳堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '春秋', reason: '蒯得之后' },
      { name: '山西临汾', lng: 111.52, lat: 36.08, period: '晋代', reason: '晋地蒯氏' },
      { name: '湖北襄阳', lng: 112.14, lat: 32.02, period: '汉代', reason: '襄阳望族' },
      { name: '江苏苏州', lng: 120.62, lat: 31.32, period: '宋代', reason: '南迁江南' },
      { name: '上海', lng: 121.47, lat: 31.23, period: '明清', reason: '江南聚居' },
    ],
    figures: [
      { name: '蒯得', dynasty: '春秋', achievement: '晋国大夫' },
      { name: '蒯通', dynasty: '汉', achievement: '谋士，说韩信' },
      { name: '蒯祥', dynasty: '明', achievement: '建筑师，设计紫禁城' },
      { name: '蒯光典', dynasty: '清', achievement: '学者，官员' },
    ],
    totem: '蒯字从艹从㕟，本义为草名。图腾以邑为氏，象征晋大夫后裔。',
    history: '蒯姓源于姬姓，春秋晋国大夫蒯得之后。襄阳蒯氏为郡望，明代蒯祥设计紫禁城。',
  },
  {
    surname: '相',

    pinyin: 'Xiāng',

    rank: 396,

    populationRank: 295,

    population: 18,
    origin: '源于夏代相帝之后，以谥为氏。又源于商代相土之后。又源于官名，以相为氏。',
    originPlace: { name: '河南安阳', lng: 114.39, lat: 36.10 },
    originPeriod: '夏代',
    junwang: [
      { name: '西河郡', location: '山西汾阳', lng: 111.79, lat: 37.27, tanghao: '西河堂' },
      { name: '巴郡', location: '重庆', lng: 106.55, lat: 29.56, tanghao: '巴郡堂' },
    ],
    migration: [
      { name: '河南安阳', lng: 114.39, lat: 36.10, period: '夏代', reason: '相帝之后' },
      { name: '山西汾阳', lng: 111.79, lat: 37.27, period: '汉代', reason: '西河望族' },
      { name: '河南商丘', lng: 115.65, lat: 34.44, period: '唐代', reason: '相土之后' },
      { name: '四川重庆', lng: 106.55, lat: 29.56, period: '宋代', reason: '巴郡相氏' },
      { name: '江苏徐州', lng: 117.18, lat: 34.26, period: '明清', reason: '迁居江淮' },
    ],
    figures: [
      { name: '相帝', dynasty: '夏', achievement: '夏代帝王' },
      { name: '相土', dynasty: '商', achievement: '商先公，发明马车' },
      { name: '相威', dynasty: '元', achievement: '将领' },
      { name: '相世杰', dynasty: '明', achievement: '学者' },
    ],
    totem: '相字从木从目，本义为观察。图腾以帝号为氏，象征夏商后裔。',
    history: '相姓源于夏代相帝之后，又商代相土之后。西河相氏为郡望，历史悠远。',
  },
  {
    surname: '查',

    pinyin: 'Zhā',

    rank: 397,

    populationRank: 197,

    population: 65,
    origin: '源于姬姓，春秋鲁国大夫查邑之后，以邑为氏。又源于姜姓，齐桓公之后。',
    originPlace: { name: '山东济宁', lng: 116.59, lat: 35.41 },
    originPeriod: '春秋',
    junwang: [
      { name: '齐郡', location: '山东淄博', lng: 118.05, lat: 36.78, tanghao: '齐郡堂' },
      { name: '海陵郡', location: '江苏泰州', lng: 119.92, lat: 32.46, tanghao: '海陵堂' },
    ],
    migration: [
      { name: '山东济宁', lng: 116.59, lat: 35.41, period: '春秋', reason: '鲁国查邑' },
      { name: '山东淄博', lng: 118.05, lat: 36.78, period: '汉代', reason: '齐郡望族' },
      { name: '安徽泾县', lng: 118.42, lat: 30.69, period: '唐代', reason: '南迁宣州' },
      { name: '江苏泰州', lng: 119.92, lat: 32.46, period: '宋代', reason: '海陵查氏' },
      { name: '浙江海宁', lng: 120.69, lat: 30.51, period: '明清', reason: '海宁查氏' },
    ],
    figures: [
      { name: '查何', dynasty: '汉', achievement: '官员' },
      { name: '查许国', dynasty: '宋', achievement: '进士' },
      { name: '查慎行', dynasty: '清', achievement: '诗人，康熙进士' },
      { name: '查继佐', dynasty: '清', achievement: '学者，明史案' },
    ],
    totem: '查字从木从旦，本义为水中浮木。图腾以邑为氏，象征鲁大夫后裔。',
    history: '查姓源于姬姓，春秋鲁国大夫查邑之后。齐郡查氏为郡望，清代查慎行最为著名。',
  },
  {
    surname: '后',

    pinyin: 'Hòu',

    rank: 398,

    populationRank: 269,

    population: 33,
    origin: '源于太昊后裔之后，以号为氏。又源于姬姓，春秋鲁国后氏之后。又源于官名。',
    originPlace: { name: '河南淮阳', lng: 114.88, lat: 33.73 },
    originPeriod: '上古',
    junwang: [
      { name: '东海郡', location: '山东郯城', lng: 118.36, lat: 34.61, tanghao: '东海堂' },
      { name: '冯翊郡', location: '陕西大荔', lng: 109.75, lat: 34.80, tanghao: '冯翊堂' },
    ],
    migration: [
      { name: '河南淮阳', lng: 114.88, lat: 33.73, period: '上古', reason: '太昊后裔' },
      { name: '山东郯城', lng: 118.36, lat: 34.61, period: '汉代', reason: '东海望族' },
      { name: '陕西大荔', lng: 109.75, lat: 34.80, period: '晋代', reason: '冯翊后氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '安徽合肥', lng: 117.28, lat: 31.86, period: '明清', reason: '江淮聚居' },
    ],
    figures: [
      { name: '后稷', dynasty: '上古', achievement: '周朝始祖，农神' },
      { name: '后羿', dynasty: '夏', achievement: '传说射手' },
      { name: '后章', dynasty: '汉', achievement: '东海名士' },
      { name: '后敏', dynasty: '明', achievement: '官员' },
    ],
    totem: '后字从厂从口，本义为君主。图腾以帝号为氏，象征太昊后裔。',
    history: '后姓源于太昊后裔之后，以号为氏。东海后氏为郡望，上古后稷为周朝始祖。',
  },
  {
    surname: '荆',

    pinyin: 'Jīng',

    rank: 399,

    populationRank: 222,

    population: 50,
    origin: '源于姬姓，西周荆国之后，以国为氏。又源于芈姓，楚国之后。',
    originPlace: { name: '湖北秭归', lng: 110.98, lat: 30.83 },
    originPeriod: '西周',
    junwang: [
      { name: '广陵郡', location: '江苏扬州', lng: 119.42, lat: 32.39, tanghao: '广陵堂' },
      { name: '丹阳郡', location: '安徽宣城', lng: 118.76, lat: 30.95, tanghao: '丹阳堂' },
    ],
    migration: [
      { name: '湖北秭归', lng: 110.98, lat: 30.83, period: '西周', reason: '荆国始封' },
      { name: '湖北荆州', lng: 112.24, lat: 30.33, period: '春秋', reason: '楚国都城' },
      { name: '江苏扬州', lng: 119.42, lat: 32.39, period: '汉代', reason: '广陵望族' },
      { name: '安徽宣城', lng: 118.76, lat: 30.95, period: '唐代', reason: '丹阳荆氏' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '宋代', reason: '仕宦中原' },
    ],
    figures: [
      { name: '荆轲', dynasty: '战国', achievement: '刺客，刺秦王' },
      { name: '荆浩', dynasty: '五代', achievement: '画家，北方山水画派' },
      { name: '荆国治', dynasty: '宋', achievement: '进士' },
      { name: '荆干蜀', dynasty: '明', achievement: '官员' },
    ],
    totem: '荆字从艹从刑，本义为灌木。图腾以国为氏，象征楚国先祖后裔。',
    history: '荆姓源于姬姓，西周荆国之后。广陵荆氏为郡望，战国荆轲最为著名。',
  },
  {
    surname: '红',

    pinyin: 'Hóng',

    rank: 400,

    populationRank: 252,

    population: 38,
    origin: '源于芈姓，春秋楚国公族之后，以字为氏。又源于刘姓，汉初红侯之后。',
    originPlace: { name: '湖北荆州', lng: 112.24, lat: 30.33 },
    originPeriod: '春秋',
    junwang: [
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
      { name: '平昌郡', location: '河南安阳', lng: 114.39, lat: 36.10, tanghao: '平昌堂' },
    ],
    migration: [
      { name: '湖北荆州', lng: 112.24, lat: 30.33, period: '春秋', reason: '楚国公族' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '汉代', reason: '红侯封地' },
      { name: '山西临汾', lng: 111.52, lat: 36.08, period: '晋代', reason: '中原迁徙' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '广东梅州', lng: 116.12, lat: 24.29, period: '明清', reason: '客家红氏' },
    ],
    figures: [
      { name: '红刘', dynasty: '汉', achievement: '红侯' },
      { name: '红长', dynasty: '汉', achievement: '官员' },
      { name: '红友', dynasty: '宋', achievement: '进士' },
      { name: '红尚', dynasty: '明', achievement: '学者' },
    ],
    totem: '红字从纟从工，本义为丝织品红色。图腾以字为氏，象征楚公族后裔。',
    history: '红姓源于芈姓，春秋楚国公族之后。河南红氏为郡望，汉初红侯之后。',
  },
  {
    surname: '游',

    pinyin: 'Yóu',

    rank: 401,

    populationRank: 156,

    population: 116,
    origin: '源于姬姓，春秋郑国公族游吉之后，以字为氏。又源于姬姓，晋国游氏之后。',
    originPlace: { name: '河南新郑', lng: 113.74, lat: 34.40 },
    originPeriod: '春秋',
    junwang: [
      { name: '广平郡', location: '河北邯郸', lng: 114.54, lat: 36.62, tanghao: '广平堂' },
      { name: '冯翊郡', location: '陕西大荔', lng: 109.75, lat: 34.80, tanghao: '冯翊堂' },
    ],
    migration: [
      { name: '河南新郑', lng: 113.74, lat: 34.40, period: '春秋', reason: '郑国公族' },
      { name: '河北邯郸', lng: 114.54, lat: 36.62, period: '汉代', reason: '广平望族' },
      { name: '陕西大荔', lng: 109.75, lat: 34.80, period: '晋代', reason: '冯翊游氏' },
      { name: '福建莆田', lng: 119.01, lat: 25.43, period: '宋代', reason: '南迁闽地' },
      { name: '广东潮州', lng: 116.63, lat: 23.68, period: '明清', reason: '潮汕游氏' },
    ],
    figures: [
      { name: '游吉', dynasty: '春秋', achievement: '郑国大夫' },
      { name: '游肇', dynasty: '北魏', achievement: '官员，尚书' },
      { name: '游酢', dynasty: '宋', achievement: '理学家，程门四先生之一' },
      { name: '游似', dynasty: '宋', achievement: '丞相' },
    ],
    totem: '游字从氵从斿，本义为游泳。图腾以字为氏，象征郑公族后裔。',
    history: '游姓源于姬姓，春秋郑国公族游吉之后。广平游氏为郡望，宋代游酢为理学名家。',
  },
  {
    surname: '竺',

    pinyin: 'Zhú',

    rank: 402,

    populationRank: 250,

    population: 40,
    origin: '源于竹姓，以地为氏。又源于天竺国，以国为氏。又源于姬姓，孤竹国之后。',
    originPlace: { name: '山东潍坊', lng: 119.16, lat: 36.70 },
    originPeriod: '商代',
    junwang: [
      { name: '东海郡', location: '山东郯城', lng: 118.36, lat: 34.61, tanghao: '东海堂' },
      { name: '汉阳郡', location: '甘肃兰州', lng: 103.83, lat: 36.06, tanghao: '汉阳堂' },
    ],
    migration: [
      { name: '山东潍坊', lng: 119.16, lat: 36.70, period: '商代', reason: '孤竹国后' },
      { name: '山东郯城', lng: 118.36, lat: 34.61, period: '汉代', reason: '东海望族' },
      { name: '甘肃兰州', lng: 103.83, lat: 36.06, period: '晋代', reason: '汉阳竺氏' },
      { name: '浙江绍兴', lng: 120.58, lat: 30.03, period: '宋代', reason: '南迁江南' },
      { name: '广东广州', lng: 113.27, lat: 23.13, period: '明清', reason: '岭南竺氏' },
    ],
    figures: [
      { name: '竺晏', dynasty: '汉', achievement: '东海名士' },
      { name: '竺法深', dynasty: '晋', achievement: '高僧' },
      { name: '竺道生', dynasty: '晋', achievement: '高僧，顿悟说' },
      { name: '竺可桢', dynasty: '现代', achievement: '气象学家，地理学家' },
    ],
    totem: '竺字从竹从二，本义为竹。图腾以国为氏，象征天竺或孤竹后裔。',
    history: '竺姓源于竹姓，又源于天竺国。东海竺氏为郡望，现代竺可桢为科学泰斗。',
  },
  {
    surname: '权',

    pinyin: 'Quán',

    rank: 403,

    populationRank: 283,

    population: 26,
    origin: '源于子姓，商代权国之后，以国为氏。又源于姬姓，楚国权邑之后。',
    originPlace: { name: '湖北当阳', lng: 111.79, lat: 30.82 },
    originPeriod: '商代',
    junwang: [
      { name: '天水郡', location: '甘肃天水', lng: 105.72, lat: 34.58, tanghao: '天水堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '湖北当阳', lng: 111.79, lat: 30.82, period: '商代', reason: '权国始封' },
      { name: '甘肃天水', lng: 105.72, lat: 34.58, period: '汉代', reason: '天水望族' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '晋代', reason: '河南权氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '广东梅州', lng: 116.12, lat: 24.29, period: '明清', reason: '客家权氏' },
    ],
    figures: [
      { name: '权翼', dynasty: '前秦', achievement: '大臣' },
      { name: '权武', dynasty: '隋', achievement: '将领' },
      { name: '权德舆', dynasty: '唐', achievement: '宰相，文学家' },
      { name: '权邦彦', dynasty: '宋', achievement: '官员' },
    ],
    totem: '权字从木从雚，本义为秤砣。图腾以国为氏，象征商代权国后裔。',
    history: '权姓源于子姓，商代权国之后。天水权氏为郡望，唐代权德舆为宰相。',
  },
  {
    surname: '逯',

    pinyin: 'Lù',

    rank: 404,

    populationRank: 298,

    population: 16,
    origin: '源于姬姓，春秋秦国公族逯之后，以字为氏。又源于楚国王族之后。',
    originPlace: { name: '陕西西安', lng: 108.93, lat: 34.27 },
    originPeriod: '春秋',
    junwang: [
      { name: '广平郡', location: '河北邯郸', lng: 114.54, lat: 36.62, tanghao: '广平堂' },
      { name: '临河郡', location: '山西临汾', lng: 111.52, lat: 36.08, tanghao: '临河堂' },
    ],
    migration: [
      { name: '陕西西安', lng: 108.93, lat: 34.27, period: '春秋', reason: '秦国公族' },
      { name: '河北邯郸', lng: 114.54, lat: 36.62, period: '汉代', reason: '广平望族' },
      { name: '山西临汾', lng: 111.52, lat: 36.08, period: '晋代', reason: '临河逯氏' },
      { name: '江苏苏州', lng: 120.62, lat: 31.32, period: '宋代', reason: '南迁江南' },
      { name: '浙江杭州', lng: 120.16, lat: 30.27, period: '明清', reason: '江浙逯氏' },
    ],
    figures: [
      { name: '逯普', dynasty: '汉', achievement: '广平名士' },
      { name: '逯明', dynasty: '晋', achievement: '官员' },
      { name: '逯中立', dynasty: '明', achievement: '官员，正直' },
      { name: '逯宏', dynasty: '清', achievement: '学者' },
    ],
    totem: '逯字从辶从录，本义为到达。图腾以字为氏，象征秦公族后裔。',
    history: '逯姓源于姬姓，春秋秦国公族逯之后。广平逯氏为郡望，明代逯中立以正直著称。',
  },
  {
    surname: '盖',

    pinyin: 'Gài',

    rank: 405,

    populationRank: 264,

    population: 34,
    origin: '源于姜姓，战国齐大夫盖邑之后，以邑为氏。又源于姬姓，鲁国盖邑之后。',
    originPlace: { name: '山东沂源', lng: 118.31, lat: 36.19 },
    originPeriod: '战国',
    junwang: [
      { name: '渔阳郡', location: '北京', lng: 116.40, lat: 39.90, tanghao: '渔阳堂' },
      { name: '汝南郡', location: '河南汝南', lng: 114.36, lat: 33.00, tanghao: '汝南堂' },
    ],
    migration: [
      { name: '山东沂源', lng: 118.31, lat: 36.19, period: '战国', reason: '齐盖邑后' },
      { name: '北京', lng: 116.40, lat: 39.90, period: '汉代', reason: '渔阳望族' },
      { name: '河南汝南', lng: 114.36, lat: 33.00, period: '晋代', reason: '汝南盖氏' },
      { name: '山东济南', lng: 117.00, lat: 36.65, period: '唐代', reason: '齐鲁故地' },
      { name: '辽宁沈阳', lng: 123.43, lat: 41.80, period: '明清', reason: '迁居东北' },
    ],
    figures: [
      { name: '盖聂', dynasty: '战国', achievement: '剑客，刺客' },
      { name: '盖宽饶', dynasty: '汉', achievement: '司隶校尉，刚直' },
      { name: '盖文达', dynasty: '唐', achievement: '学者，国子博士' },
      { name: '盖延', dynasty: '汉', achievement: '东汉名将，虎牙将军' },
    ],
    totem: '盖字从艹从盍，本义为覆盖。图腾以邑为氏，象征齐大夫后裔。',
    history: '盖姓源于姜姓，战国齐大夫盖邑之后。渔阳盖氏为郡望，汉代盖宽饶以刚直著称。',
  },
  {
    surname: '益',

    pinyin: 'Yì',

    rank: 406,

    populationRank: 301,

    population: 14,
    origin: '源于姬姓，春秋晋国大夫益之后，以字为氏。又源于嬴姓，伯益之后。又源于地名。',
    originPlace: { name: '山东莱芜', lng: 117.68, lat: 36.21 },
    originPeriod: '上古',
    junwang: [
      { name: '冯翊郡', location: '陕西大荔', lng: 109.75, lat: 34.80, tanghao: '冯翊堂' },
      { name: '华阳郡', location: '四川成都', lng: 104.07, lat: 30.67, tanghao: '华阳堂' },
    ],
    migration: [
      { name: '山东莱芜', lng: 117.68, lat: 36.21, period: '上古', reason: '伯益后裔' },
      { name: '陕西大荔', lng: 109.75, lat: 34.80, period: '汉代', reason: '冯翊望族' },
      { name: '四川成都', lng: 104.07, lat: 30.67, period: '晋代', reason: '华阳益氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '广东广州', lng: 113.27, lat: 23.13, period: '明清', reason: '岭南益氏' },
    ],
    figures: [
      { name: '伯益', dynasty: '上古', achievement: '舜臣，助禹治水' },
      { name: '益寿', dynasty: '汉', achievement: '冯翊名士' },
      { name: '益智', dynasty: '宋', achievement: '进士' },
      { name: '益畅', dynasty: '明', achievement: '官员' },
    ],
    totem: '益字从水从皿，本义为水漫出。图腾以字为氏，象征伯益后裔。',
    history: '益姓源于嬴姓，伯益之后。冯翊益氏为郡望，上古伯益助禹治水。',
  },
  {
    surname: '桓',

    pinyin: 'Huán',

    rank: 407,

    populationRank: 282,

    population: 26,
    origin: '源于姬姓，春秋齐国桓公之后，以谥为氏。又源于子姓，宋国桓公之后。',
    originPlace: { name: '山东淄博', lng: 118.05, lat: 36.78 },
    originPeriod: '春秋',
    junwang: [
      { name: '谯国郡', location: '安徽亳州', lng: 115.78, lat: 33.85, tanghao: '谯国堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '山东淄博', lng: 118.05, lat: 36.78, period: '春秋', reason: '齐桓公后' },
      { name: '安徽亳州', lng: 115.78, lat: 33.85, period: '汉代', reason: '谯国望族' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '晋代', reason: '河南桓氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '唐代', reason: '南迁江左' },
      { name: '湖南长沙', lng: 112.94, lat: 28.23, period: '明清', reason: '迁居湖广' },
    ],
    figures: [
      { name: '桓公', dynasty: '春秋', achievement: '齐桓公，春秋五霸之首' },
      { name: '桓谭', dynasty: '汉', achievement: '哲学家，文学家' },
      { name: '桓温', dynasty: '晋', achievement: '权臣，将领' },
      { name: '桓伊', dynasty: '晋', achievement: '将领，音乐家' },
    ],
    totem: '桓字从木从亘，本义为古代邮亭表木。图腾以谥为氏，象征齐桓公后裔。',
    history: '桓姓源于姬姓，春秋齐国桓公之后。谯国桓氏为郡望，东晋桓温权倾一时。',
  },
  {
    surname: '公',

    pinyin: 'Gōng',

    rank: 408,

    populationRank: 289,

    population: 22,
    origin: '源于姬姓，春秋鲁国公族之后，以爵为氏。又源于官名，以公为氏。',
    originPlace: { name: '山东曲阜', lng: 116.98, lat: 35.58 },
    originPeriod: '春秋',
    junwang: [
      { name: '括苍郡', location: '浙江丽水', lng: 119.92, lat: 28.45, tanghao: '括苍堂' },
      { name: '蒙阴郡', location: '山东蒙阴', lng: 117.96, lat: 35.71, tanghao: '蒙阴堂' },
    ],
    migration: [
      { name: '山东曲阜', lng: 116.98, lat: 35.58, period: '春秋', reason: '鲁国公族' },
      { name: '山东蒙阴', lng: 117.96, lat: 35.71, period: '汉代', reason: '蒙阴望族' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '晋代', reason: '中原迁徙' },
      { name: '浙江丽水', lng: 119.92, lat: 28.45, period: '宋代', reason: '括苍公氏' },
      { name: '江苏苏州', lng: 120.62, lat: 31.32, period: '明清', reason: '江南公氏' },
    ],
    figures: [
      { name: '公羊高', dynasty: '战国', achievement: '学者，公羊传作者' },
      { name: '公皙衰', dynasty: '春秋', achievement: '孔子弟子' },
      { name: '公勉', dynasty: '明', achievement: '官员' },
      { name: '公鼐', dynasty: '明', achievement: '文学家，官员' },
    ],
    totem: '公字从八从厶，本义为公正。图腾以爵为氏，象征鲁公族后裔。',
    history: '公姓源于姬姓，春秋鲁国公族之后。蒙阴公氏为郡望，明代公鼐为文学家。',
  },
  {
    surname: '万俟',

    pinyin: 'Mòqí',

    rank: 409,

    populationRank: 450,

    population: 3,
    origin: '源于鲜卑族，北魏万俟部落之后，以部落为氏。',
    originPlace: { name: '山西大同', lng: 113.30, lat: 40.08 },
    originPeriod: '南北朝',
    junwang: [
      { name: '兰陵郡', location: '山东兰陵', lng: 118.05, lat: 34.81, tanghao: '兰陵堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '山西大同', lng: 113.30, lat: 40.08, period: '南北朝', reason: '鲜卑万俟部' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '北魏', reason: '孝文南迁' },
      { name: '山东兰陵', lng: 118.05, lat: 34.81, period: '唐代', reason: '兰陵望族' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '福建福州', lng: 119.30, lat: 26.08, period: '明清', reason: '迁居闽地' },
    ],
    figures: [
      { name: '万俟丑奴', dynasty: '北魏', achievement: '关陇起义首领' },
      { name: '万俟普', dynasty: '北魏', achievement: '将领' },
      { name: '万俟卨', dynasty: '宋', achievement: '宰相，主和派' },
      { name: '万俟咏', dynasty: '宋', achievement: '词人' },
    ],
    totem: '万俟为鲜卑部落名，图腾以部落为氏，象征北魏鲜卑后裔。',
    history: '万俟姓源于鲜卑族，北魏万俟部落之后。兰陵万俟氏为郡望，宋代万俟卨为宰相。',
  },
  {
    surname: '司马',

    pinyin: 'Sīmǎ',

    rank: 410,

    populationRank: 410,

    population: 5,
    origin: '源于官名，西周司马职之后，以官为氏。又源于姬姓，程伯休父之后。',
    originPlace: { name: '河南洛阳', lng: 112.45, lat: 34.62 },
    originPeriod: '西周',
    junwang: [
      { name: '河内郡', location: '河南沁阳', lng: 112.93, lat: 35.09, tanghao: '河内堂' },
      { name: '颍川郡', location: '河南禹州', lng: 113.49, lat: 34.16, tanghao: '颍川堂' },
    ],
    migration: [
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '西周', reason: '程伯休父后' },
      { name: '河南沁阳', lng: 112.93, lat: 35.09, period: '汉代', reason: '河内望族' },
      { name: '山西夏县', lng: 111.22, lat: 35.14, period: '三国', reason: '司马懿祖籍' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '晋代', reason: '西晋皇族' },
      { name: '浙江绍兴', lng: 120.58, lat: 30.03, period: '宋代', reason: '南迁江南' },
    ],
    figures: [
      { name: '司马迁', dynasty: '汉', achievement: '史学家，史记作者' },
      { name: '司马懿', dynasty: '三国', achievement: '魏国权臣，晋朝奠基人' },
      { name: '司马光', dynasty: '宋', achievement: '宰相，资治通鉴作者' },
      { name: '司马相如', dynasty: '汉', achievement: '文学家，辞赋家' },
    ],
    totem: '司马为古代官名，掌管军事。图腾以官为氏，象征西周司马后裔。',
    history: '司马姓源于官名，西周司马职之后。河内司马氏为郡望，晋朝皇族姓司马。',
  },
  {
    surname: '上官',

    pinyin: 'Shàngguān',

    rank: 411,

    populationRank: 380,

    population: 8,
    origin: '源于芈姓，春秋楚国大夫上官之后，以邑为氏。',
    originPlace: { name: '河南滑县', lng: 114.52, lat: 35.58 },
    originPeriod: '春秋',
    junwang: [
      { name: '天水郡', location: '甘肃天水', lng: 105.72, lat: 34.58, tanghao: '天水堂' },
      { name: '江都郡', location: '江苏扬州', lng: 119.42, lat: 32.39, tanghao: '江都堂' },
    ],
    migration: [
      { name: '河南滑县', lng: 114.52, lat: 35.58, period: '春秋', reason: '楚上官邑' },
      { name: '甘肃天水', lng: 105.72, lat: 34.58, period: '汉代', reason: '天水望族' },
      { name: '陕西西安', lng: 108.93, lat: 34.27, period: '唐代', reason: '仕宦长安' },
      { name: '福建邵武', lng: 117.49, lat: 27.34, period: '宋代', reason: '南迁闽地' },
      { name: '广东广州', lng: 113.27, lat: 23.13, period: '明清', reason: '岭南上官氏' },
    ],
    figures: [
      { name: '上官桀', dynasty: '汉', achievement: '左将军，辅政大臣' },
      { name: '上官仪', dynasty: '唐', achievement: '宰相，诗人' },
      { name: '上官婉儿', dynasty: '唐', achievement: '才女，巾帼宰相' },
      { name: '上官均', dynasty: '宋', achievement: '官员' },
    ],
    totem: '上官为古代官名，图腾以邑为氏，象征楚大夫后裔。',
    history: '上官姓源于芈姓，春秋楚国大夫上官之后。天水上官氏为郡望，唐代上官婉儿最为著名。',
  },
  {
    surname: '欧阳',

    pinyin: 'Ōuyáng',

    rank: 412,

    populationRank: 169,

    population: 90,
    origin: '源于姒姓，越王勾践之后，欧阳亭侯之后，以地为氏。',
    originPlace: { name: '浙江绍兴', lng: 120.58, lat: 30.03 },
    originPeriod: '战国',
    junwang: [
      { name: '渤海郡', location: '河北沧州', lng: 116.84, lat: 38.31, tanghao: '渤海堂' },
      { name: '长沙郡', location: '湖南长沙', lng: 112.94, lat: 28.23, tanghao: '长沙堂' },
    ],
    migration: [
      { name: '浙江绍兴', lng: 120.58, lat: 30.03, period: '战国', reason: '越王后裔' },
      { name: '山东青州', lng: 118.48, lat: 36.68, period: '汉代', reason: '渤海望族' },
      { name: '湖南长沙', lng: 112.94, lat: 28.23, period: '唐代', reason: '长沙欧阳氏' },
      { name: '江西吉安', lng: 114.99, lat: 27.12, period: '宋代', reason: '庐陵欧阳氏' },
      { name: '广东广州', lng: 113.27, lat: 23.13, period: '明清', reason: '岭南欧阳氏' },
    ],
    figures: [
      { name: '欧阳询', dynasty: '唐', achievement: '书法家，楷书四大家之一' },
      { name: '欧阳修', dynasty: '宋', achievement: '文学家，唐宋八大家之一' },
      { name: '欧阳通', dynasty: '唐', achievement: '宰相，书法家' },
      { name: '欧阳炯', dynasty: '五代', achievement: '词人' },
    ],
    totem: '欧阳以地为氏，图腾象征越王勾践后裔，欧阳亭侯之后。',
    history: '欧阳姓源于姒姓，越王勾践之后。渤海欧阳氏为郡望，宋代欧阳修为文学泰斗。',
  },
  {
    surname: '夏侯',

    pinyin: 'Xiàhóu',

    rank: 413,

    populationRank: 420,

    population: 4,
    origin: '源于姒姓，夏禹之后，以号为氏。又源于官名。',
    originPlace: { name: '河南禹州', lng: 113.49, lat: 34.16 },
    originPeriod: '西周',
    junwang: [
      { name: '谯国郡', location: '安徽亳州', lng: 115.78, lat: 33.85, tanghao: '谯国堂' },
      { name: '鲁郡', location: '山东曲阜', lng: 116.98, lat: 35.58, tanghao: '鲁郡堂' },
    ],
    migration: [
      { name: '河南禹州', lng: 113.49, lat: 34.16, period: '西周', reason: '夏禹后裔' },
      { name: '安徽亳州', lng: 115.78, lat: 33.85, period: '汉代', reason: '谯国望族' },
      { name: '山东曲阜', lng: 116.98, lat: 35.58, period: '三国', reason: '夏侯惇家族' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '晋代', reason: '仕宦中原' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
    ],
    figures: [
      { name: '夏侯婴', dynasty: '汉', achievement: '汝阴侯，开国功臣' },
      { name: '夏侯惇', dynasty: '三国', achievement: '曹魏名将' },
      { name: '夏侯渊', dynasty: '三国', achievement: '曹魏名将' },
      { name: '夏侯玄', dynasty: '三国', achievement: '玄学家，官员' },
    ],
    totem: '夏侯以夏禹之号为氏，图腾象征夏代王族后裔。',
    history: '夏侯姓源于姒姓，夏禹之后。谯国夏侯氏为郡望，三国夏侯惇为曹魏名将。',
  },
  {
    surname: '诸葛',

    pinyin: 'Zhūgě',

    rank: 414,

    populationRank: 390,

    population: 7,
    origin: '源于姬姓，葛伯之后，迁居诸地，以地为氏。又源于姜姓。',
    originPlace: { name: '山东诸城', lng: 119.40, lat: 35.99 },
    originPeriod: '商代',
    junwang: [
      { name: '琅琊郡', location: '山东临沂', lng: 118.35, lat: 35.05, tanghao: '琅琊堂' },
      { name: '颍川郡', location: '河南禹州', lng: 113.49, lat: 34.16, tanghao: '颍川堂' },
    ],
    migration: [
      { name: '山东诸城', lng: 119.40, lat: 35.99, period: '商代', reason: '葛伯后裔' },
      { name: '山东临沂', lng: 118.35, lat: 35.05, period: '汉代', reason: '琅琊望族' },
      { name: '河南禹州', lng: 113.49, lat: 34.16, period: '三国', reason: '颍川诸葛氏' },
      { name: '四川成都', lng: 104.07, lat: 30.67, period: '三国', reason: '诸葛亮入蜀' },
      { name: '浙江绍兴', lng: 120.58, lat: 30.03, period: '宋代', reason: '南迁江南' },
    ],
    figures: [
      { name: '诸葛亮', dynasty: '三国', achievement: '蜀汉丞相，杰出政治家' },
      { name: '诸葛瑾', dynasty: '三国', achievement: '东吴大臣' },
      { name: '诸葛恪', dynasty: '三国', achievement: '东吴权臣' },
      { name: '诸葛诞', dynasty: '三国', achievement: '曹魏将领' },
    ],
    totem: '诸葛以地为氏，图腾象征葛伯后裔迁居诸地。',
    history: '诸葛姓源于姬姓，葛伯之后。琅琊诸葛氏为郡望，三国诸葛亮最为著名。',
  },
  {
    surname: '闻人',

    pinyin: 'Wénrén',

    rank: 415,

    populationRank: 460,

    population: 2,
    origin: '源于姬姓，春秋鲁国少正卯之后，以号为氏。少正卯为闻人。',
    originPlace: { name: '山东曲阜', lng: 116.98, lat: 35.58 },
    originPeriod: '春秋',
    junwang: [
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
      { name: '吴兴郡', location: '浙江湖州', lng: 120.10, lat: 30.87, tanghao: '吴兴堂' },
    ],
    migration: [
      { name: '山东曲阜', lng: 116.98, lat: 35.58, period: '春秋', reason: '少正卯后' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '汉代', reason: '河南望族' },
      { name: '浙江湖州', lng: 120.10, lat: 30.87, period: '晋代', reason: '吴兴闻人氏' },
      { name: '江苏苏州', lng: 120.62, lat: 31.32, period: '宋代', reason: '南迁江南' },
      { name: '上海', lng: 121.47, lat: 31.23, period: '明清', reason: '江南聚居' },
    ],
    figures: [
      { name: '闻人梦', dynasty: '汉', achievement: '学者' },
      { name: '闻人袭', dynasty: '汉', achievement: '太尉' },
      { name: '闻人宏', dynasty: '宋', achievement: '学者' },
      { name: '闻人铨', dynasty: '明', achievement: '官员，刊刻旧唐书' },
    ],
    totem: '闻人以号为氏，图腾象征鲁国闻人之后。',
    history: '闻人姓源于姬姓，春秋鲁国少正卯之后。吴兴闻人氏为郡望，汉代闻人袭为太尉。',
  },
  {
    surname: '东方',

    pinyin: 'Dōngfāng',

    rank: 416,

    populationRank: 455,

    population: 3,
    origin: '源于伏羲氏，以方位为氏。又源于姜姓，齐太公之后。又源于汉东方朔。',
    originPlace: { name: '河南淮阳', lng: 114.88, lat: 33.73 },
    originPeriod: '上古',
    junwang: [
      { name: '平原郡', location: '山东平原', lng: 116.43, lat: 37.16, tanghao: '平原堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '河南淮阳', lng: 114.88, lat: 33.73, period: '上古', reason: '伏羲后裔' },
      { name: '山东平原', lng: 116.43, lat: 37.16, period: '汉代', reason: '东方朔故里' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '唐代', reason: '河南望族' },
      { name: '河北沧州', lng: 116.84, lat: 38.31, period: '宋代', reason: '北方聚居' },
      { name: '山东济南', lng: 117.00, lat: 36.65, period: '明清', reason: '齐鲁故地' },
    ],
    figures: [
      { name: '东方朔', dynasty: '汉', achievement: '文学家，太中大夫' },
      { name: '东方虬', dynasty: '唐', achievement: '诗人' },
      { name: '东方显', dynasty: '唐', achievement: '学者' },
      { name: '东方正', dynasty: '明', achievement: '官员' },
    ],
    totem: '东方以方位为氏，图腾象征伏羲后裔，居东方之地。',
    history: '东方姓源于伏羲氏，以方位为氏。平原东方氏为郡望，汉代东方朔最为著名。',
  },
  {
    surname: '赫连',

    pinyin: 'Hèlián',

    rank: 417,

    populationRank: 470,

    population: 2,
    origin: '源于匈奴族，十六国夏国赫连勃勃之后，以号为氏。',
    originPlace: { name: '陕西延安', lng: 109.49, lat: 36.59 },
    originPeriod: '十六国',
    junwang: [
      { name: '渤海郡', location: '河北沧州', lng: 116.84, lat: 38.31, tanghao: '渤海堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '陕西延安', lng: 109.49, lat: 36.59, period: '十六国', reason: '赫连勃勃' },
      { name: '陕西榆林', lng: 109.73, lat: 38.30, period: '夏国', reason: '大夏都城' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '北魏', reason: '孝文南迁' },
      { name: '河北沧州', lng: 116.84, lat: 38.31, period: '唐代', reason: '渤海望族' },
      { name: '山西太原', lng: 112.55, lat: 37.87, period: '明清', reason: '北方聚居' },
    ],
    figures: [
      { name: '赫连勃勃', dynasty: '十六国', achievement: '夏国建立者' },
      { name: '赫连达', dynasty: '北周', achievement: '将领' },
      { name: '赫连子悦', dynasty: '北齐', achievement: '官员' },
      { name: '赫连华', dynasty: '唐', achievement: '官员' },
    ],
    totem: '赫连为匈奴贵族号，图腾以号为氏，象征夏国王族后裔。',
    history: '赫连姓源于匈奴族，十六国夏国赫连勃勃之后。渤海赫连氏为郡望，赫连勃勃建立大夏。',
  },
  {
    surname: '皇甫',

    pinyin: 'Huángfǔ',

    rank: 418,

    populationRank: 400,

    population: 6,
    origin: '源于子姓，春秋宋国皇父之后，以字为氏。后改皇甫。',
    originPlace: { name: '河南商丘', lng: 115.65, lat: 34.44 },
    originPeriod: '春秋',
    junwang: [
      { name: '京兆郡', location: '陕西西安', lng: 108.93, lat: 34.27, tanghao: '京兆堂' },
      { name: '安定郡', location: '甘肃泾川', lng: 107.37, lat: 35.33, tanghao: '安定堂' },
    ],
    migration: [
      { name: '河南商丘', lng: 115.65, lat: 34.44, period: '春秋', reason: '宋国皇父后' },
      { name: '甘肃泾川', lng: 107.37, lat: 35.33, period: '汉代', reason: '安定望族' },
      { name: '陕西西安', lng: 108.93, lat: 34.27, period: '唐代', reason: '京兆皇甫氏' },
      { name: '河北沧州', lng: 116.84, lat: 38.31, period: '宋代', reason: '北方聚居' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '明清', reason: '南迁江左' },
    ],
    figures: [
      { name: '皇甫谧', dynasty: '晋', achievement: '医学家，针灸甲乙经作者' },
      { name: '皇甫规', dynasty: '汉', achievement: '将领，名臣' },
      { name: '皇甫嵩', dynasty: '汉', achievement: '将领，平黄巾' },
      { name: '皇甫湜', dynasty: '唐', achievement: '文学家' },
    ],
    totem: '皇甫以字为氏，图腾象征宋国皇父后裔。',
    history: '皇甫姓源于子姓，春秋宋国皇父之后。安定皇甫氏为郡望，晋代皇甫谧为医学家。',
  },
  {
    surname: '尉迟',

    pinyin: 'Yùchí',

    rank: 419,

    populationRank: 430,

    population: 4,
    origin: '源于鲜卑族，北魏尉迟部落之后，以部落为氏。',
    originPlace: { name: '山西大同', lng: 113.30, lat: 40.08 },
    originPeriod: '南北朝',
    junwang: [
      { name: '太原郡', location: '山西太原', lng: 112.55, lat: 37.87, tanghao: '太原堂' },
      { name: '冯翊郡', location: '陕西大荔', lng: 109.75, lat: 34.80, tanghao: '冯翊堂' },
    ],
    migration: [
      { name: '山西大同', lng: 113.30, lat: 40.08, period: '南北朝', reason: '鲜卑尉迟部' },
      { name: '山西太原', lng: 112.55, lat: 37.87, period: '唐代', reason: '尉迟敬德家族' },
      { name: '陕西大荔', lng: 109.75, lat: 34.80, period: '唐代', reason: '冯翊望族' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '宋代', reason: '仕宦中原' },
      { name: '河北保定', lng: 115.47, lat: 38.87, period: '明清', reason: '北方聚居' },
    ],
    figures: [
      { name: '尉迟迥', dynasty: '北周', achievement: '相州总管，蜀国公' },
      { name: '尉迟敬德', dynasty: '唐', achievement: '鄂国公，凌烟阁二十四功臣' },
      { name: '尉迟乙僧', dynasty: '唐', achievement: '画家' },
      { name: '尉迟胜', dynasty: '唐', achievement: '于阗王' },
    ],
    totem: '尉迟为鲜卑部落名，图腾以部落为氏，象征北魏鲜卑后裔。',
    history: '尉迟姓源于鲜卑族，北魏尉迟部落之后。太原尉迟氏为郡望，唐代尉迟敬德为门神。',
  },
  {
    surname: '公羊',

    pinyin: 'Gōngyáng',

    rank: 420,

    populationRank: 490,

    population: 1,
    origin: '源于姬姓，春秋鲁国公孙羊之后，以字为氏。又源于官名。',
    originPlace: { name: '山东曲阜', lng: 116.98, lat: 35.58 },
    originPeriod: '春秋',
    junwang: [
      { name: '顿丘郡', location: '河南清丰', lng: 115.07, lat: 35.89, tanghao: '顿丘堂' },
      { name: '鲁郡', location: '山东曲阜', lng: 116.98, lat: 35.58, tanghao: '鲁郡堂' },
    ],
    migration: [
      { name: '山东曲阜', lng: 116.98, lat: 35.58, period: '春秋', reason: '鲁国公孙羊后' },
      { name: '河南清丰', lng: 115.07, lat: 35.89, period: '汉代', reason: '顿丘望族' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '晋代', reason: '仕宦中原' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '山东济南', lng: 117.00, lat: 36.65, period: '明清', reason: '齐鲁故地' },
    ],
    figures: [
      { name: '公羊高', dynasty: '战国', achievement: '学者，公羊传作者' },
      { name: '公羊寿', dynasty: '汉', achievement: '学者' },
      { name: '公羊段', dynasty: '汉', achievement: '学者' },
      { name: '公羊传', dynasty: '汉', achievement: '春秋三传之一' },
    ],
    totem: '公羊以字为氏，图腾象征鲁国公孙羊后裔。',
    history: '公羊姓源于姬姓，春秋鲁国公孙羊之后。顿丘公羊氏为郡望，战国公羊高传春秋。',
  },
  {
    surname: '澹台',

    pinyin: 'Tántái',

    rank: 421,

    populationRank: 480,

    population: 1,
    origin: '源于姬姓，春秋鲁国澹台灭明之后，以地为氏。',
    originPlace: { name: '山东嘉祥', lng: 116.35, lat: 35.39 },
    originPeriod: '春秋',
    junwang: [
      { name: '太原郡', location: '山西太原', lng: 112.55, lat: 37.87, tanghao: '太原堂' },
      { name: '鲁郡', location: '山东曲阜', lng: 116.98, lat: 35.58, tanghao: '鲁郡堂' },
    ],
    migration: [
      { name: '山东嘉祥', lng: 116.35, lat: 35.39, period: '春秋', reason: '澹台灭明故里' },
      { name: '山东曲阜', lng: 116.98, lat: 35.58, period: '汉代', reason: '鲁郡望族' },
      { name: '山西太原', lng: 112.55, lat: 37.87, period: '晋代', reason: '太原澹台氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '山东济南', lng: 117.00, lat: 36.65, period: '明清', reason: '齐鲁故地' },
    ],
    figures: [
      { name: '澹台灭明', dynasty: '春秋', achievement: '孔子弟子，七十二贤之一' },
      { name: '澹台敬伯', dynasty: '汉', achievement: '学者' },
      { name: '澹台玄明', dynasty: '唐', achievement: '官员' },
      { name: '澹台景', dynasty: '明', achievement: '官员' },
    ],
    totem: '澹台以地为氏，图腾象征鲁国澹台灭明后裔。',
    history: '澹台姓源于姬姓，春秋鲁国澹台灭明之后。太原澹台氏为郡望，澹台灭明为孔子弟子。',
  },
  {
    surname: '公冶',

    pinyin: 'Gōngyě',

    rank: 422,

    populationRank: 485,

    population: 1,
    origin: '源于姬姓，春秋鲁国公冶长之后，以字为氏。',
    originPlace: { name: '山东诸城', lng: 119.40, lat: 35.99 },
    originPeriod: '春秋',
    junwang: [
      { name: '鲁郡', location: '山东曲阜', lng: 116.98, lat: 35.58, tanghao: '鲁郡堂' },
      { name: '顿丘郡', location: '河南清丰', lng: 115.07, lat: 35.89, tanghao: '顿丘堂' },
    ],
    migration: [
      { name: '山东诸城', lng: 119.40, lat: 35.99, period: '春秋', reason: '公冶长故里' },
      { name: '山东曲阜', lng: 116.98, lat: 35.58, period: '汉代', reason: '鲁郡望族' },
      { name: '河南清丰', lng: 115.07, lat: 35.89, period: '晋代', reason: '顿丘公冶氏' },
      { name: '山东济南', lng: 117.00, lat: 36.65, period: '宋代', reason: '齐鲁故地' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '明清', reason: '南迁江左' },
    ],
    figures: [
      { name: '公冶长', dynasty: '春秋', achievement: '孔子弟子，七十二贤之一' },
      { name: '公冶构', dynasty: '汉', achievement: '官员' },
      { name: '公冶志', dynasty: '唐', achievement: '学者' },
      { name: '公冶信', dynasty: '明', achievement: '官员' },
    ],
    totem: '公冶以字为氏，图腾象征鲁国公冶长后裔。',
    history: '公冶姓源于姬姓，春秋鲁国公冶长之后。鲁郡公冶氏为郡望，公冶长为孔子弟子。',
  },
  {
    surname: '宗政',

    pinyin: 'Zōngzhèng',

    rank: 423,

    populationRank: 475,

    population: 2,
    origin: '源于官名，汉代宗正官之后，以官为氏。又源于刘姓，楚王刘交之后。',
    originPlace: { name: '江苏徐州', lng: 117.18, lat: 34.26 },
    originPeriod: '汉代',
    junwang: [
      { name: '彭城郡', location: '江苏徐州', lng: 117.18, lat: 34.26, tanghao: '彭城堂' },
      { name: '京兆郡', location: '陕西西安', lng: 108.93, lat: 34.27, tanghao: '京兆堂' },
    ],
    migration: [
      { name: '江苏徐州', lng: 117.18, lat: 34.26, period: '汉代', reason: '楚王刘交后' },
      { name: '陕西西安', lng: 108.93, lat: 34.27, period: '唐代', reason: '京兆望族' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '宋代', reason: '仕宦中原' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '明代', reason: '南迁江左' },
      { name: '安徽合肥', lng: 117.28, lat: 31.86, period: '清代', reason: '江淮聚居' },
    ],
    figures: [
      { name: '宗正刘', dynasty: '汉', achievement: '宗正官，楚王后' },
      { name: '宗政均', dynasty: '汉', achievement: '官员' },
      { name: '宗政弘', dynasty: '唐', achievement: '官员' },
      { name: '宗政焕', dynasty: '明', achievement: '官员' },
    ],
    totem: '宗政以官为氏，图腾象征汉代宗正官后裔。',
    history: '宗政姓源于官名，汉代宗正官之后。彭城宗政氏为郡望，源于楚王刘交之后。',
  },
  {
    surname: '濮阳',

    pinyin: 'Púyáng',

    rank: 424,

    populationRank: 465,

    population: 3,
    origin: '源于地名，以地为氏。濮阳为古地名，居濮水之北。',
    originPlace: { name: '河南濮阳', lng: 115.03, lat: 35.77 },
    originPeriod: '春秋',
    junwang: [
      { name: '博陵郡', location: '河北安平', lng: 115.52, lat: 38.22, tanghao: '博陵堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '河南濮阳', lng: 115.03, lat: 35.77, period: '春秋', reason: '以地为氏' },
      { name: '河北安平', lng: 115.52, lat: 38.22, period: '汉代', reason: '博陵望族' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '晋代', reason: '河南濮阳氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '山东菏泽', lng: 115.49, lat: 35.24, period: '明清', reason: '中原聚居' },
    ],
    figures: [
      { name: '濮阳兴', dynasty: '三国', achievement: '东吴丞相' },
      { name: '濮阳逸', dynasty: '晋', achievement: '官员' },
      { name: '濮阳藻', dynasty: '唐', achievement: '官员' },
      { name: '濮阳瓘', dynasty: '明', achievement: '官员' },
    ],
    totem: '濮阳以地为氏，图腾象征濮水之北居地后裔。',
    history: '濮阳姓源于地名，以地为氏。博陵濮阳氏为郡望，三国濮阳兴为东吴丞相。',
  },
  {
    surname: '淳于',

    pinyin: 'Chúnyú',

    rank: 425,

    populationRank: 440,

    population: 4,
    origin: '源于姜姓，春秋淳于国之后，以国为氏。又源于姜姓，齐国淳于氏。',
    originPlace: { name: '山东安丘', lng: 119.27, lat: 36.42 },
    originPeriod: '春秋',
    junwang: [
      { name: '河内郡', location: '河南沁阳', lng: 112.93, lat: 35.09, tanghao: '河内堂' },
      { name: '齐郡', location: '山东淄博', lng: 118.05, lat: 36.78, tanghao: '齐郡堂' },
    ],
    migration: [
      { name: '山东安丘', lng: 119.27, lat: 36.42, period: '春秋', reason: '淳于国故地' },
      { name: '山东淄博', lng: 118.05, lat: 36.78, period: '战国', reason: '齐郡望族' },
      { name: '河南沁阳', lng: 112.93, lat: 35.09, period: '汉代', reason: '河内淳于氏' },
      { name: '四川成都', lng: 104.07, lat: 30.67, period: '宋代', reason: '南迁蜀地' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '明清', reason: '南迁江左' },
    ],
    figures: [
      { name: '淳于髡', dynasty: '战国', achievement: '齐国人，滑稽多智' },
      { name: '淳于意', dynasty: '汉', achievement: '医学家，仓公' },
      { name: '淳于禁', dynasty: '汉', achievement: '官员' },
      { name: '淳于堪', dynasty: '晋', achievement: '官员' },
    ],
    totem: '淳于以国为氏，图腾象征姜姓淳于国后裔。',
    history: '淳于姓源于姜姓，春秋淳于国之后。河内淳于氏为郡望，汉代淳于意为名医。',
  },
  {
    surname: '单于',

    pinyin: 'Chányú',

    rank: 426,

    populationRank: 500,

    population: 1,
    origin: '源于匈奴族，匈奴单于之后，以号为氏。',
    originPlace: { name: '内蒙古呼和浩特', lng: 111.75, lat: 40.84 },
    originPeriod: '秦汉',
    junwang: [
      { name: '千乘郡', location: '山东高青', lng: 117.59, lat: 37.15, tanghao: '千乘堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '内蒙古呼和浩特', lng: 111.75, lat: 40.84, period: '秦汉', reason: '匈奴单于' },
      { name: '山西大同', lng: 113.30, lat: 40.08, period: '汉代', reason: '南匈奴内附' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '北魏', reason: '孝文南迁' },
      { name: '山东高青', lng: 117.59, lat: 37.15, period: '唐代', reason: '千乘望族' },
      { name: '河北保定', lng: 115.47, lat: 38.87, period: '明清', reason: '北方聚居' },
    ],
    figures: [
      { name: '单于呼韩邪', dynasty: '汉', achievement: '匈奴呼韩邪单于' },
      { name: '单于固', dynasty: '汉', achievement: '官员' },
      { name: '单于耽', dynasty: '唐', achievement: '官员' },
      { name: '单于辅', dynasty: '唐', achievement: '官员' },
    ],
    totem: '单于为匈奴君主号，图腾以号为氏，象征匈奴王族后裔。',
    history: '单于姓源于匈奴族，匈奴单于之后。千乘单于氏为郡望，呼韩邪单于最为著名。',
  },
  {
    surname: '太叔',

    pinyin: 'Tàishū',

    rank: 427,

    populationRank: 495,

    population: 1,
    origin: '源于姬姓，春秋郑国太叔之后，以字为氏。又源于卫太叔。',
    originPlace: { name: '河南新郑', lng: 113.74, lat: 34.40 },
    originPeriod: '春秋',
    junwang: [
      { name: '东平郡', location: '山东东平', lng: 116.47, lat: 35.91, tanghao: '东平堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '河南新郑', lng: 113.74, lat: 34.40, period: '春秋', reason: '郑国太叔后' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '汉代', reason: '河南望族' },
      { name: '山东东平', lng: 116.47, lat: 35.91, period: '晋代', reason: '东平太叔氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '山东济南', lng: 117.00, lat: 36.65, period: '明清', reason: '齐鲁故地' },
    ],
    figures: [
      { name: '太叔仪', dynasty: '春秋', achievement: '卫国大夫' },
      { name: '太叔段', dynasty: '春秋', achievement: '郑庄公弟' },
      { name: '太叔弘', dynasty: '汉', achievement: '官员' },
      { name: '太叔广', dynasty: '晋', achievement: '官员' },
    ],
    totem: '太叔以字为氏，图腾象征郑国太叔后裔。',
    history: '太叔姓源于姬姓，春秋郑国太叔之后。东平太叔氏为郡望，太叔段为郑庄公之弟。',
  },
  {
    surname: '申屠',

    pinyin: 'Shēntú',

    rank: 428,

    populationRank: 435,

    population: 5,
    origin: '源于姜姓，申国人迁屠地，以地为氏。又源于官名。又改姓申徒、胜屠。',
    originPlace: { name: '河南南阳', lng: 112.53, lat: 33.00 },
    originPeriod: '西周',
    junwang: [
      { name: '京兆郡', location: '陕西西安', lng: 108.93, lat: 34.27, tanghao: '京兆堂' },
      { name: '西河郡', location: '山西汾阳', lng: 111.79, lat: 37.27, tanghao: '西河堂' },
    ],
    migration: [
      { name: '河南南阳', lng: 112.53, lat: 33.00, period: '西周', reason: '申国故地' },
      { name: '陕西西安', lng: 108.93, lat: 34.27, period: '汉代', reason: '京兆望族' },
      { name: '山西汾阳', lng: 111.79, lat: 37.27, period: '晋代', reason: '西河申屠氏' },
      { name: '浙江杭州', lng: 120.16, lat: 30.27, period: '宋代', reason: '南迁江南' },
      { name: '广东广州', lng: 113.27, lat: 23.13, period: '明清', reason: '岭南申屠氏' },
    ],
    figures: [
      { name: '申屠嘉', dynasty: '汉', achievement: '丞相，故安侯' },
      { name: '申屠刚', dynasty: '汉', achievement: '侍御史' },
      { name: '申屠蟠', dynasty: '汉', achievement: '处士，名士' },
      { name: '申屠致远', dynasty: '元', achievement: '官员，学者' },
    ],
    totem: '申屠以地为氏，图腾象征申国人迁屠地后裔。',
    history: '申屠姓源于姜姓，申国人迁屠地。京兆申屠氏为郡望，汉代申屠嘉为丞相。',
  },
  {
    surname: '公孙',

    pinyin: 'Gōngsūn',

    rank: 429,

    populationRank: 350,

    population: 12,
    origin: '源于姬姓，春秋诸侯之孙，以号为氏。又源于黄帝，公孙轩辕之后。',
    originPlace: { name: '河南新郑', lng: 113.74, lat: 34.40 },
    originPeriod: '春秋',
    junwang: [
      { name: '高阳郡', location: '河北高阳', lng: 115.91, lat: 38.68, tanghao: '高阳堂' },
      { name: '扶风郡', location: '陕西兴平', lng: 108.49, lat: 34.30, tanghao: '扶风堂' },
    ],
    migration: [
      { name: '河南新郑', lng: 113.74, lat: 34.40, period: '春秋', reason: '黄帝后裔' },
      { name: '陕西兴平', lng: 108.49, lat: 34.30, period: '汉代', reason: '扶风望族' },
      { name: '河北高阳', lng: 115.91, lat: 38.68, period: '晋代', reason: '高阳公孙氏' },
      { name: '四川成都', lng: 104.07, lat: 30.67, period: '唐代', reason: '蜀地公孙氏' },
      { name: '广东广州', lng: 113.27, lat: 23.13, period: '明清', reason: '岭南公孙氏' },
    ],
    figures: [
      { name: '公孙鞅', dynasty: '战国', achievement: '商鞅变法' },
      { name: '公孙龙', dynasty: '战国', achievement: '名家，白马非马' },
      { name: '公孙瓒', dynasty: '汉', achievement: '北平太守' },
      { name: '公孙度', dynasty: '汉', achievement: '辽东太守' },
    ],
    totem: '公孙以号为氏，图腾象征诸侯之孙，又黄帝公孙轩辕后裔。',
    history: '公孙姓源于姬姓，春秋诸侯之孙。高阳公孙氏为郡望，战国商鞅本公孙鞅。',
  },
  {
    surname: '仲孙',

    pinyin: 'Zhòngsūn',

    rank: 430,

    populationRank: 445,

    population: 3,
    origin: '源于姬姓，春秋鲁国桓公之后，庆父为仲孙氏，以字为氏。',
    originPlace: { name: '山东曲阜', lng: 116.98, lat: 35.58 },
    originPeriod: '春秋',
    junwang: [
      { name: '高阳郡', location: '河北高阳', lng: 115.91, lat: 38.68, tanghao: '高阳堂' },
      { name: '鲁郡', location: '山东曲阜', lng: 116.98, lat: 35.58, tanghao: '鲁郡堂' },
    ],
    migration: [
      { name: '山东曲阜', lng: 116.98, lat: 35.58, period: '春秋', reason: '鲁桓公后' },
      { name: '河北高阳', lng: 115.91, lat: 38.68, period: '汉代', reason: '高阳望族' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '晋代', reason: '仕宦中原' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '山东济南', lng: 117.00, lat: 36.65, period: '明清', reason: '齐鲁故地' },
    ],
    figures: [
      { name: '仲孙庆父', dynasty: '春秋', achievement: '鲁国权臣' },
      { name: '仲孙湫', dynasty: '春秋', achievement: '鲁国大夫' },
      { name: '仲孙何忌', dynasty: '春秋', achievement: '鲁国大夫' },
      { name: '仲孙蔑', dynasty: '春秋', achievement: '鲁国孟献子' },
    ],
    totem: '仲孙以字为氏，图腾象征鲁桓公后裔庆父之后。',
    history: '仲孙姓源于姬姓，春秋鲁国桓公之后。高阳仲孙氏为郡望，庆父为仲孙氏始祖。',
  },
  {
    surname: '轩辕',

    pinyin: 'Xuānyuán',

    rank: 431,

    populationRank: 450,

    population: 3,
    origin: '源于姬姓，黄帝轩辕氏之后，以号为氏。',
    originPlace: { name: '河南新郑', lng: 113.74, lat: 34.40 },
    originPeriod: '上古',
    junwang: [
      { name: '郿城郡', location: '陕西眉县', lng: 107.76, lat: 34.28, tanghao: '郿城堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '河南新郑', lng: 113.74, lat: 34.40, period: '上古', reason: '黄帝故里' },
      { name: '陕西眉县', lng: 107.76, lat: 34.28, period: '汉代', reason: '郿城望族' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '晋代', reason: '河南轩辕氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '山东曲阜', lng: 116.98, lat: 35.58, period: '明清', reason: '齐鲁故地' },
    ],
    figures: [
      { name: '轩辕黄帝', dynasty: '上古', achievement: '华夏人文始祖' },
      { name: '轩辕弥明', dynasty: '唐', achievement: '道士，诗人' },
      { name: '轩辕述', dynasty: '唐', achievement: '官员' },
      { name: '轩辕范', dynasty: '明', achievement: '官员' },
    ],
    totem: '轩辕以黄帝号为氏，图腾象征华夏始祖后裔。',
    history: '轩辕姓源于姬姓，黄帝轩辕氏之后。郿城轩辕氏为郡望，黄帝为华夏始祖。',
  },
  {
    surname: '令狐',

    pinyin: 'Línghú',

    rank: 432,

    populationRank: 385,

    population: 8,
    origin: '源于姬姓，春秋晋国魏颗封令狐，以地为氏。',
    originPlace: { name: '山西临猗', lng: 110.77, lat: 35.15 },
    originPeriod: '春秋',
    junwang: [
      { name: '太原郡', location: '山西太原', lng: 112.55, lat: 37.87, tanghao: '太原堂' },
      { name: '河内郡', location: '河南沁阳', lng: 112.93, lat: 35.09, tanghao: '河内堂' },
    ],
    migration: [
      { name: '山西临猗', lng: 110.77, lat: 35.15, period: '春秋', reason: '魏颗封地' },
      { name: '山西太原', lng: 112.55, lat: 37.87, period: '汉代', reason: '太原望族' },
      { name: '河南沁阳', lng: 112.93, lat: 35.09, period: '晋代', reason: '河内令狐氏' },
      { name: '陕西西安', lng: 108.93, lat: 34.27, period: '唐代', reason: '令狐绹家族' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
    ],
    figures: [
      { name: '令狐楚', dynasty: '唐', achievement: '宰相，文学家' },
      { name: '令狐绹', dynasty: '唐', achievement: '宰相，太尉' },
      { name: '令狐德棻', dynasty: '唐', achievement: '史学家，修周书' },
      { name: '令狐峘', dynasty: '唐', achievement: '史学家' },
    ],
    totem: '令狐以地为氏，图腾象征晋国魏颗后裔。',
    history: '令狐姓源于姬姓，春秋晋国魏颗封令狐。太原令狐氏为郡望，唐代令狐楚为宰相。',
  },
  {
    surname: '钟离',

    pinyin: 'Zhōnglí',

    rank: 433,

    populationRank: 420,

    population: 4,
    origin: '源于姬姓，春秋晋国伯宗之后，封钟离，以地为氏。又源于嬴姓。',
    originPlace: { name: '安徽凤阳', lng: 117.56, lat: 32.86 },
    originPeriod: '春秋',
    junwang: [
      { name: '会稽郡', location: '浙江绍兴', lng: 120.58, lat: 30.03, tanghao: '会稽堂' },
      { name: '颍川郡', location: '河南禹州', lng: 113.49, lat: 34.16, tanghao: '颍川堂' },
    ],
    migration: [
      { name: '安徽凤阳', lng: 117.56, lat: 32.86, period: '春秋', reason: '钟离国故地' },
      { name: '河南禹州', lng: 113.49, lat: 34.16, period: '汉代', reason: '颍川望族' },
      { name: '浙江绍兴', lng: 120.58, lat: 30.03, period: '晋代', reason: '会稽钟离氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '广东广州', lng: 113.27, lat: 23.13, period: '明清', reason: '岭南钟离氏' },
    ],
    figures: [
      { name: '钟离春', dynasty: '战国', achievement: '齐宣王后，钟无艳' },
      { name: '钟离昧', dynasty: '汉', achievement: '项羽部将' },
      { name: '钟离权', dynasty: '唐', achievement: '道士，汉钟离，八仙之一' },
      { name: '钟离瑾', dynasty: '宋', achievement: '官员' },
    ],
    totem: '钟离以地为氏，图腾象征钟离国后裔。',
    history: '钟离姓源于姬姓，春秋钟离国之后。会稽钟离氏为郡望，唐代钟离权为八仙之一。',
  },
  {
    surname: '宇文',

    pinyin: 'Yǔwén',

    rank: 434,

    populationRank: 400,

    population: 6,
    origin: '源于鲜卑族，北魏宇文部落之后，以部落为氏。又源于匈奴。',
    originPlace: { name: '内蒙古赤峰', lng: 118.89, lat: 42.26 },
    originPeriod: '南北朝',
    junwang: [
      { name: '赵郡', location: '河北赵县', lng: 114.78, lat: 37.75, tanghao: '赵郡堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '内蒙古赤峰', lng: 118.89, lat: 42.26, period: '南北朝', reason: '鲜卑宇文部' },
      { name: '陕西西安', lng: 108.93, lat: 34.27, period: '北周', reason: '宇文氏建周' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '隋代', reason: '河南望族' },
      { name: '河北赵县', lng: 114.78, lat: 37.75, period: '唐代', reason: '赵郡宇文氏' },
      { name: '四川成都', lng: 104.07, lat: 30.67, period: '明清', reason: '蜀地宇文氏' },
    ],
    figures: [
      { name: '宇文泰', dynasty: '北周', achievement: '北周奠基者，权臣' },
      { name: '宇文邕', dynasty: '北周', achievement: '北周武帝' },
      { name: '宇文护', dynasty: '北周', achievement: '权臣，大冢宰' },
      { name: '宇文虚中', dynasty: '宋', achievement: '官员，诗人' },
    ],
    totem: '宇文为鲜卑部落名，图腾以部落为氏，象征北周皇族后裔。',
    history: '宇文姓源于鲜卑族，北魏宇文部落之后。赵郡宇文氏为郡望，北周皇族姓宇文。',
  },
  {
    surname: '长孙',

    pinyin: 'Zhǎngsūn',

    rank: 435,

    populationRank: 425,

    population: 5,
    origin: '源于鲜卑族，北魏拓拔氏之后，长孙嵩为长孙氏，以字为氏。',
    originPlace: { name: '山西大同', lng: 113.30, lat: 40.08 },
    originPeriod: '南北朝',
    junwang: [
      { name: '济阳郡', location: '河南兰考', lng: 114.82, lat: 34.82, tanghao: '济阳堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '山西大同', lng: 113.30, lat: 40.08, period: '南北朝', reason: '鲜卑拓拔后' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '北魏', reason: '孝文南迁' },
      { name: '河南兰考', lng: 114.82, lat: 34.82, period: '唐代', reason: '济阳望族' },
      { name: '陕西西安', lng: 108.93, lat: 34.27, period: '唐代', reason: '长孙无忌家族' },
      { name: '河北保定', lng: 115.47, lat: 38.87, period: '明清', reason: '北方聚居' },
    ],
    figures: [
      { name: '长孙嵩', dynasty: '北魏', achievement: '北平王' },
      { name: '长孙无忌', dynasty: '唐', achievement: '赵国公，凌烟阁之首' },
      { name: '长孙皇后', dynasty: '唐', achievement: '文德皇后，贤后' },
      { name: '长孙顺德', dynasty: '唐', achievement: '薛国公，凌烟阁功臣' },
    ],
    totem: '长孙以字为氏，图腾象征鲜卑拓拔后裔。',
    history: '长孙姓源于鲜卑族，北魏拓拔氏之后。济阳长孙氏为郡望，唐代长孙无忌为宰相。',
  },
  {
    surname: '慕容',

    pinyin: 'Mùróng',

    rank: 436,

    populationRank: 380,

    population: 8,
    origin: '源于鲜卑族，慕容部之后，以部落为氏。又源于高辛氏。',
    originPlace: { name: '辽宁朝阳', lng: 120.45, lat: 41.57 },
    originPeriod: '魏晋',
    junwang: [
      { name: '敦煌郡', location: '甘肃敦煌', lng: 94.66, lat: 40.14, tanghao: '敦煌堂' },
      { name: '辽东郡', location: '辽宁辽阳', lng: 123.17, lat: 41.27, tanghao: '辽东堂' },
    ],
    migration: [
      { name: '辽宁朝阳', lng: 120.45, lat: 41.57, period: '魏晋', reason: '慕容部故地' },
      { name: '辽宁辽阳', lng: 123.17, lat: 41.27, period: '十六国', reason: '前燕都城' },
      { name: '甘肃敦煌', lng: 94.66, lat: 40.14, period: '唐代', reason: '敦煌望族' },
      { name: '广东广州', lng: 113.27, lat: 23.13, period: '宋代', reason: '南迁岭南' },
      { name: '广西桂林', lng: 110.29, lat: 25.27, period: '明清', reason: '岭南慕容氏' },
    ],
    figures: [
      { name: '慕容廆', dynasty: '晋', achievement: '前燕奠基者' },
      { name: '慕容皝', dynasty: '十六国', achievement: '前燕建立者' },
      { name: '慕容垂', dynasty: '十六国', achievement: '后燕建立者' },
      { name: '慕容冲', dynasty: '十六国', achievement: '西燕皇帝' },
    ],
    totem: '慕容为鲜卑部落名，图腾以部落为氏，象征燕国王族后裔。',
    history: '慕容姓源于鲜卑族，慕容部之后。敦煌慕容氏为郡望，十六国慕容氏建诸燕。',
  },
  {
    surname: '鲜于',

    pinyin: 'Xiānyú',

    rank: 437,

    populationRank: 415,

    population: 5,
    origin: '源于子姓，商代箕子之后，封鲜于，以地为氏。',
    originPlace: { name: '河北涿州', lng: 115.98, lat: 39.49 },
    originPeriod: '商代',
    junwang: [
      { name: '渔阳郡', location: '北京', lng: 116.40, lat: 39.90, tanghao: '渔阳堂' },
      { name: '太原郡', location: '山西太原', lng: 112.55, lat: 37.87, tanghao: '太原堂' },
    ],
    migration: [
      { name: '河北涿州', lng: 115.98, lat: 39.49, period: '商代', reason: '箕子封地' },
      { name: '北京', lng: 116.40, lat: 39.90, period: '汉代', reason: '渔阳望族' },
      { name: '山西太原', lng: 112.55, lat: 37.87, period: '晋代', reason: '太原鲜于氏' },
      { name: '四川成都', lng: 104.07, lat: 30.67, period: '唐代', reason: '蜀地鲜于氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '明清', reason: '南迁江左' },
    ],
    figures: [
      { name: '鲜于辅', dynasty: '汉', achievement: '将领' },
      { name: '鲜于修礼', dynasty: '北魏', achievement: '起义首领' },
      { name: '鲜于枢', dynasty: '元', achievement: '书法家' },
      { name: '鲜于必仁', dynasty: '元', achievement: '散曲家' },
    ],
    totem: '鲜于以地为氏，图腾象征箕子后裔。',
    history: '鲜于姓源于子姓，商代箕子之后。渔阳鲜于氏为郡望，元代鲜于枢为书法家。',
  },
  {
    surname: '闾丘',

    pinyin: 'Lǘqiū',

    rank: 438,

    populationRank: 470,

    population: 2,
    origin: '源于姜姓，春秋齐国闾丘之后，以地为氏。',
    originPlace: { name: '山东淄博', lng: 118.05, lat: 36.78 },
    originPeriod: '春秋',
    junwang: [
      { name: '顿丘郡', location: '河南清丰', lng: 115.07, lat: 35.89, tanghao: '顿丘堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '山东淄博', lng: 118.05, lat: 36.78, period: '春秋', reason: '齐国闾丘' },
      { name: '河南清丰', lng: 115.07, lat: 35.89, period: '汉代', reason: '顿丘望族' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '晋代', reason: '河南闾丘氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '山东济南', lng: 117.00, lat: 36.65, period: '明清', reason: '齐鲁故地' },
    ],
    figures: [
      { name: '闾丘婴', dynasty: '春秋', achievement: '齐国大夫' },
      { name: '闾丘望', dynasty: '汉', achievement: '学者' },
      { name: '闾丘昉', dynasty: '宋', achievement: '官员' },
      { name: '闾丘孝终', dynasty: '宋', achievement: '官员，苏轼友' },
    ],
    totem: '闾丘以地为氏，图腾象征齐国闾丘后裔。',
    history: '闾丘姓源于姜姓，春秋齐国闾丘之后。顿丘闾丘氏为郡望，宋代闾丘孝终与苏轼交好。',
  },
  {
    surname: '司徒',

    pinyin: 'Sītú',

    rank: 439,

    populationRank: 395,

    population: 7,
    origin: '源于官名，上古司徒之后，以官为氏。又源于姬姓，虞舜之后。',
    originPlace: { name: '河南商丘', lng: 115.65, lat: 34.44 },
    originPeriod: '上古',
    junwang: [
      { name: '赵郡', location: '河北赵县', lng: 114.78, lat: 37.75, tanghao: '赵郡堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '河南商丘', lng: 115.65, lat: 34.44, period: '上古', reason: '舜后司徒' },
      { name: '河北赵县', lng: 114.78, lat: 37.75, period: '汉代', reason: '赵郡望族' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '晋代', reason: '河南司徒氏' },
      { name: '广东广州', lng: 113.27, lat: 23.13, period: '宋代', reason: '南迁岭南' },
      { name: '广西桂林', lng: 110.29, lat: 25.27, period: '明清', reason: '岭南司徒氏' },
    ],
    figures: [
      { name: '司徒映', dynasty: '汉', achievement: '官员' },
      { name: '司徒肃', dynasty: '唐', achievement: '官员' },
      { name: '司徒伦', dynasty: '宋', achievement: '官员' },
      { name: '司徒美堂', dynasty: '近代', achievement: '爱国侨领，致公党创始人' },
    ],
    totem: '司徒为古代官名，掌管土地教化。图腾以官为氏，象征上古司徒后裔。',
    history: '司徒姓源于官名，上古司徒之后。赵郡司徒氏为郡望，近代司徒美堂为爱国侨领。',
  },
  {
    surname: '司空',

    pinyin: 'Sīkōng',

    rank: 440,

    populationRank: 410,

    population: 5,
    origin: '源于官名，西周司空职之后，以官为氏。又源于姬姓，春秋晋国司空氏。',
    originPlace: { name: '河南洛阳', lng: 112.45, lat: 34.62 },
    originPeriod: '西周',
    junwang: [
      { name: '须昌郡', location: '山东东平', lng: 116.47, lat: 35.91, tanghao: '须昌堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '西周', reason: '司空官后' },
      { name: '山东东平', lng: 116.47, lat: 35.91, period: '汉代', reason: '须昌望族' },
      { name: '山西临汾', lng: 111.52, lat: 36.08, period: '晋代', reason: '晋地司空氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '广东广州', lng: 113.27, lat: 23.13, period: '明清', reason: '岭南司空氏' },
    ],
    figures: [
      { name: '司空图', dynasty: '唐', achievement: '诗人，诗品作者' },
      { name: '司空曙', dynasty: '唐', achievement: '诗人，大历十才子' },
      { name: '司空照', dynasty: '唐', achievement: '官员' },
      { name: '司空颖', dynasty: '宋', achievement: '官员' },
    ],
    totem: '司空为古代官名，掌管工程。图腾以官为氏，象征西周司空后裔。',
    history: '司空姓源于官名，西周司空职之后。须昌司空氏为郡望，唐代司空图为诗品作者。',
  },
  {
    surname: '仉督',

    pinyin: 'Zhǎngdū',

    rank: 441,

    populationRank: 495,

    population: 1,
    origin: '源于官名，古代仉督官之后，以官为氏。',
    originPlace: { name: '河南洛阳', lng: 112.45, lat: 34.62 },
    originPeriod: '春秋',
    junwang: [
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
      { name: '鲁郡', location: '山东曲阜', lng: 116.98, lat: 35.58, tanghao: '鲁郡堂' },
    ],
    migration: [
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '春秋', reason: '仉督官后' },
      { name: '山东曲阜', lng: 116.98, lat: 35.58, period: '汉代', reason: '鲁郡望族' },
      { name: '河南开封', lng: 114.31, lat: 34.80, period: '晋代', reason: '中原迁徙' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '山东济南', lng: 117.00, lat: 36.65, period: '明清', reason: '齐鲁故地' },
    ],
    figures: [
      { name: '仉督经', dynasty: '汉', achievement: '官员' },
      { name: '仉督晦', dynasty: '唐', achievement: '官员' },
      { name: '仉督固', dynasty: '宋', achievement: '官员' },
      { name: '仉督仁', dynasty: '明', achievement: '官员' },
    ],
    totem: '仉督以官为氏，图腾象征古代仉督官后裔。',
    history: '仉督姓源于官名，古代仉督官之后。河南仉督氏为郡望，极为罕见。',
  },
  {
    surname: '子车',

    pinyin: 'Zǐchē',

    rank: 442,

    populationRank: 500,

    population: 1,
    origin: '源于姬姓，春秋秦国子车氏之后，以字为氏。三良之后。',
    originPlace: { name: '陕西宝鸡', lng: 107.24, lat: 34.36 },
    originPeriod: '春秋',
    junwang: [
      { name: '天水郡', location: '甘肃天水', lng: 105.72, lat: 34.58, tanghao: '天水堂' },
      { name: '京兆郡', location: '陕西西安', lng: 108.93, lat: 34.27, tanghao: '京兆堂' },
    ],
    migration: [
      { name: '陕西宝鸡', lng: 107.24, lat: 34.36, period: '春秋', reason: '秦国子车氏' },
      { name: '甘肃天水', lng: 105.72, lat: 34.58, period: '汉代', reason: '天水望族' },
      { name: '陕西西安', lng: 108.93, lat: 34.27, period: '唐代', reason: '京兆子车氏' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '宋代', reason: '仕宦中原' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '明清', reason: '南迁江左' },
    ],
    figures: [
      { name: '子车奄息', dynasty: '春秋', achievement: '秦国三良之一' },
      { name: '子车仲行', dynasty: '春秋', achievement: '秦国三良之一' },
      { name: '子车针虎', dynasty: '春秋', achievement: '秦国三良之一' },
      { name: '子车氏', dynasty: '春秋', achievement: '秦穆公殉葬三良' },
    ],
    totem: '子车以字为氏，图腾象征秦国三良后裔。',
    history: '子车姓源于姬姓，春秋秦国子车氏之后。天车子车氏为郡望，三良殉秦穆公最为著名。',
  },
  {
    surname: '颛孙',

    pinyin: 'Zhuānsūn',

    rank: 443,

    populationRank: 485,

    population: 1,
    origin: '源于姬姓，春秋颛孙之后，以字为氏。又源于妫姓，陈国颛孙氏。',
    originPlace: { name: '河南淮阳', lng: 114.88, lat: 33.73 },
    originPeriod: '春秋',
    junwang: [
      { name: '丹阳郡', location: '安徽宣城', lng: 118.76, lat: 30.95, tanghao: '丹阳堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '河南淮阳', lng: 114.88, lat: 33.73, period: '春秋', reason: '陈国颛孙' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '汉代', reason: '河南望族' },
      { name: '安徽宣城', lng: 118.76, lat: 30.95, period: '晋代', reason: '丹阳颛孙氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '安徽合肥', lng: 117.28, lat: 31.86, period: '明清', reason: '江淮聚居' },
    ],
    figures: [
      { name: '颛孙师', dynasty: '春秋', achievement: '孔子弟子，子张' },
      { name: '颛孙冥', dynasty: '汉', achievement: '官员' },
      { name: '颛孙裔', dynasty: '唐', achievement: '官员' },
      { name: '颛孙端', dynasty: '明', achievement: '官员' },
    ],
    totem: '颛孙以字为氏，图腾象征陈国颛孙后裔。',
    history: '颛孙姓源于姬姓，春秋颛孙之后。丹阳颛孙氏为郡望，颛孙师为孔子弟子子张。',
  },
  {
    surname: '端木',

    pinyin: 'Duānmù',

    rank: 444,

    populationRank: 400,

    population: 6,
    origin: '源于姬姓，春秋卫国端木之后，以字为氏。',
    originPlace: { name: '河南浚县', lng: 114.55, lat: 35.67 },
    originPeriod: '春秋',
    junwang: [
      { name: '广平郡', location: '河北邯郸', lng: 114.54, lat: 36.62, tanghao: '广平堂' },
      { name: '鲁郡', location: '山东曲阜', lng: 116.98, lat: 35.58, tanghao: '鲁郡堂' },
    ],
    migration: [
      { name: '河南浚县', lng: 114.55, lat: 35.67, period: '春秋', reason: '卫国端木' },
      { name: '河北邯郸', lng: 114.54, lat: 36.62, period: '汉代', reason: '广平望族' },
      { name: '山东曲阜', lng: 116.98, lat: 35.58, period: '晋代', reason: '鲁郡端木氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '浙江绍兴', lng: 120.58, lat: 30.03, period: '明清', reason: '江南端木氏' },
    ],
    figures: [
      { name: '端木赐', dynasty: '春秋', achievement: '孔子弟子，子贡，外交家' },
      { name: '端木叔', dynasty: '战国', achievement: '学者' },
      { name: '端木孝文', dynasty: '明', achievement: '官员' },
      { name: '端木国瑚', dynasty: '清', achievement: '学者，文学家' },
    ],
    totem: '端木以字为氏，图腾象征卫国端木后裔。',
    history: '端木姓源于姬姓，春秋卫国端木之后。广平端木氏为郡望，端木赐为孔子弟子子贡。',
  },
  {
    surname: '巫马',

    pinyin: 'Wūmǎ',

    rank: 445,

    populationRank: 500,

    population: 1,
    origin: '源于官名，古代巫马官之后，以官为氏。又源于姬姓。',
    originPlace: { name: '山东曲阜', lng: 116.98, lat: 35.58 },
    originPeriod: '春秋',
    junwang: [
      { name: '鲁郡', location: '山东曲阜', lng: 116.98, lat: 35.58, tanghao: '鲁郡堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '山东曲阜', lng: 116.98, lat: 35.58, period: '春秋', reason: '鲁国巫马' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '汉代', reason: '河南望族' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '山东济南', lng: 117.00, lat: 36.65, period: '明代', reason: '齐鲁故地' },
      { name: '河南开封', lng: 114.31, lat: 34.80, period: '清代', reason: '中原聚居' },
    ],
    figures: [
      { name: '巫马期', dynasty: '春秋', achievement: '孔子弟子，巫马施' },
      { name: '巫马乔', dynasty: '汉', achievement: '官员' },
      { name: '巫马逸', dynasty: '唐', achievement: '官员' },
      { name: '巫马信', dynasty: '明', achievement: '官员' },
    ],
    totem: '巫马以官为氏，图腾象征古代巫马官后裔。',
    history: '巫马姓源于官名，古代巫马官之后。鲁郡巫马氏为郡望，巫马期为孔子弟子。',
  },
  {
    surname: '公西',

    pinyin: 'Gōngxī',

    rank: 446,

    populationRank: 490,

    population: 1,
    origin: '源于姬姓，春秋鲁国公西之后，以字为氏。',
    originPlace: { name: '山东曲阜', lng: 116.98, lat: 35.58 },
    originPeriod: '春秋',
    junwang: [
      { name: '顿丘郡', location: '河南清丰', lng: 115.07, lat: 35.89, tanghao: '顿丘堂' },
      { name: '鲁郡', location: '山东曲阜', lng: 116.98, lat: 35.58, tanghao: '鲁郡堂' },
    ],
    migration: [
      { name: '山东曲阜', lng: 116.98, lat: 35.58, period: '春秋', reason: '鲁国公西' },
      { name: '河南清丰', lng: 115.07, lat: 35.89, period: '汉代', reason: '顿丘望族' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '晋代', reason: '仕宦中原' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '山东济南', lng: 117.00, lat: 36.65, period: '明清', reason: '齐鲁故地' },
    ],
    figures: [
      { name: '公西赤', dynasty: '春秋', achievement: '孔子弟子，子华' },
      { name: '公西箴', dynasty: '春秋', achievement: '鲁国大夫' },
      { name: '公西务明', dynasty: '汉', achievement: '官员' },
      { name: '公西矩', dynasty: '唐', achievement: '官员' },
    ],
    totem: '公西以字为氏，图腾象征鲁国公西后裔。',
    history: '公西姓源于姬姓，春秋鲁国公西之后。顿丘公西氏为郡望，公西赤为孔子弟子。',
  },
  {
    surname: '漆雕',

    pinyin: 'Qīdiāo',

    rank: 447,

    populationRank: 480,

    population: 1,
    origin: '源于姬姓，春秋鲁国漆雕之后，以字为氏。又源于官名，漆雕工之后。',
    originPlace: { name: '山东曲阜', lng: 116.98, lat: 35.58 },
    originPeriod: '春秋',
    junwang: [
      { name: '鲁郡', location: '山东曲阜', lng: 116.98, lat: 35.58, tanghao: '鲁郡堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '山东曲阜', lng: 116.98, lat: 35.58, period: '春秋', reason: '鲁国漆雕' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '汉代', reason: '河南望族' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '山东济南', lng: 117.00, lat: 36.65, period: '明代', reason: '齐鲁故地' },
      { name: '河南开封', lng: 114.31, lat: 34.80, period: '清代', reason: '中原聚居' },
    ],
    figures: [
      { name: '漆雕开', dynasty: '春秋', achievement: '孔子弟子，漆雕启' },
      { name: '漆雕哆', dynasty: '春秋', achievement: '孔子弟子' },
      { name: '漆雕徒父', dynasty: '春秋', achievement: '孔子弟子' },
      { name: '漆雕子元', dynasty: '汉', achievement: '学者' },
    ],
    totem: '漆雕以字为氏，图腾象征鲁国漆雕后裔。',
    history: '漆雕姓源于姬姓，春秋鲁国漆雕之后。鲁郡漆雕氏为郡望，漆雕开为孔子弟子。',
  },
  {
    surname: '乐正',

    pinyin: 'Yuèzhèng',

    rank: 448,

    populationRank: 490,

    population: 1,
    origin: '源于官名，周代乐正官之后，以官为氏。',
    originPlace: { name: '河南洛阳', lng: 112.45, lat: 34.62 },
    originPeriod: '西周',
    junwang: [
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
      { name: '天水郡', location: '甘肃天水', lng: 105.72, lat: 34.58, tanghao: '天水堂' },
    ],
    migration: [
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '西周', reason: '乐正官后' },
      { name: '甘肃天水', lng: 105.72, lat: 34.58, period: '汉代', reason: '天水望族' },
      { name: '山东曲阜', lng: 116.98, lat: 35.58, period: '晋代', reason: '鲁郡乐正氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '河南开封', lng: 114.31, lat: 34.80, period: '明清', reason: '中原聚居' },
    ],
    figures: [
      { name: '乐正子', dynasty: '战国', achievement: '孟子弟子，乐正克' },
      { name: '乐正裘', dynasty: '春秋', achievement: '鲁国大夫' },
      { name: '乐正融', dynasty: '汉', achievement: '官员' },
      { name: '乐正仪', dynasty: '唐', achievement: '官员' },
    ],
    totem: '乐正以官为氏，图腾象征周代乐正官后裔。',
    history: '乐正姓源于官名，周代乐正官之后。河南乐正氏为郡望，乐正克为孟子弟子。',
  },
  {
    surname: '壤驷',

    pinyin: 'Rǎngsì',

    rank: 449,

    populationRank: 500,

    population: 1,
    origin: '源于姬姓，春秋鲁国壤驷之后，以字为氏。又源于官名。',
    originPlace: { name: '山东曲阜', lng: 116.98, lat: 35.58 },
    originPeriod: '春秋',
    junwang: [
      { name: '鲁郡', location: '山东曲阜', lng: 116.98, lat: 35.58, tanghao: '鲁郡堂' },
      { name: '京兆郡', location: '陕西西安', lng: 108.93, lat: 34.27, tanghao: '京兆堂' },
    ],
    migration: [
      { name: '山东曲阜', lng: 116.98, lat: 35.58, period: '春秋', reason: '鲁国壤驷' },
      { name: '陕西西安', lng: 108.93, lat: 34.27, period: '汉代', reason: '京兆望族' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '晋代', reason: '仕宦中原' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '山东济南', lng: 117.00, lat: 36.65, period: '明清', reason: '齐鲁故地' },
    ],
    figures: [
      { name: '壤驷赤', dynasty: '春秋', achievement: '孔子弟子' },
      { name: '壤驷固', dynasty: '汉', achievement: '官员' },
      { name: '壤驷宏', dynasty: '唐', achievement: '官员' },
      { name: '壤驷端', dynasty: '明', achievement: '官员' },
    ],
    totem: '壤驷以字为氏，图腾象征鲁国壤驷后裔。',
    history: '壤驷姓源于姬姓，春秋鲁国壤驷之后。鲁郡壤驷氏为郡望，壤驷赤为孔子弟子。',
  },
  {
    surname: '公良',

    pinyin: 'Gōngliáng',

    rank: 450,

    populationRank: 495,

    population: 1,
    origin: '源于姬姓，春秋陈国公族良之后，以字为氏。又出自孔子弟子公良孺之后。',
    originPlace: { name: '河南淮阳(陈国)', lng: 114.89, lat: 33.73 },
    originPeriod: '春秋',
    junwang: [
      { name: '陈留郡', location: '河南开封', lng: 114.31, lat: 34.80, tanghao: '陈留堂' },
      { name: '京兆郡', location: '陕西西安', lng: 108.95, lat: 34.27, tanghao: '京兆堂' },
    ],
    migration: [
      { name: '河南淮阳', lng: 114.89, lat: 33.73, period: '春秋', reason: '陈国公族良之后，公良氏发祥' },
      { name: '河南开封', lng: 114.31, lat: 34.80, period: '汉', reason: '公良氏迁陈留，成郡望' },
      { name: '陕西西安', lng: 108.95, lat: 34.27, period: '唐', reason: '公良氏仕宦京兆' },
      { name: '山东曲阜', lng: 116.98, lat: 35.58, period: '宋', reason: '孔子弟子公良孺后裔南迁' },
      { name: '江苏苏州', lng: 120.62, lat: 31.32, period: '明清', reason: '公良氏迁居江南' },
    ],
    figures: [
      { name: '公良孺', dynasty: '春秋', achievement: '孔子弟子，陈国人，以勇力护孔子' },
      { name: '公良羁', dynasty: '汉', achievement: '学者' },
      { name: '公良遂', dynasty: '唐', achievement: '官员' },
      { name: '公良楷', dynasty: '明', achievement: '举人' },
    ],
    totem: '公良以字为氏，公表爵位，良表品德，图腾象征贵族贤良之后。',
    history: '公良姓源于姬姓，春秋陈国公族良之后。孔子弟子公良孺以勇力护驾闻名。陈留公良氏为郡望，后世稀少。',
  },
  {
    surname: '夹谷',

    pinyin: 'Jiāgǔ',

    rank: 451,

    populationRank: 460,

    population: 2,
    origin: '源于女真族，金代夹谷部落之后，以部落为氏。又源于地名。',
    originPlace: { name: '吉林长春', lng: 125.32, lat: 43.82 },
    originPeriod: '金代',
    junwang: [
      { name: '抚城郡', location: '河北张北', lng: 114.71, lat: 41.15, tanghao: '抚城堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '吉林长春', lng: 125.32, lat: 43.82, period: '金代', reason: '女真夹谷部' },
      { name: '北京', lng: 116.40, lat: 39.90, period: '金代', reason: '金中都' },
      { name: '河北张北', lng: 114.71, lat: 41.15, period: '元代', reason: '抚城望族' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '明代', reason: '仕宦中原' },
      { name: '山东济南', lng: 117.00, lat: 36.65, period: '清代', reason: '齐鲁故地' },
    ],
    figures: [
      { name: '夹谷清臣', dynasty: '金', achievement: '大臣' },
      { name: '夹谷衡', dynasty: '金', achievement: '宰相' },
      { name: '夹谷吾里', dynasty: '金', achievement: '将领' },
      { name: '夹谷阿里', dynasty: '金', achievement: '官员' },
    ],
    totem: '夹谷为女真部落名，图腾以部落为氏，象征金代女真后裔。',
    history: '夹谷姓源于女真族，金代夹谷部落之后。抚城夹谷氏为郡望，金代夹谷衡为宰相。',
  },
  {
    surname: '宰父',

    pinyin: 'Zǎifǔ',

    rank: 452,

    populationRank: 495,

    population: 1,
    origin: '源于官名，周代宰父官之后，以官为氏。',
    originPlace: { name: '河南洛阳', lng: 112.45, lat: 34.62 },
    originPeriod: '西周',
    junwang: [
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
      { name: '鲁郡', location: '山东曲阜', lng: 116.98, lat: 35.58, tanghao: '鲁郡堂' },
    ],
    migration: [
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '西周', reason: '宰父官后' },
      { name: '山东曲阜', lng: 116.98, lat: 35.58, period: '汉代', reason: '鲁郡望族' },
      { name: '河南开封', lng: 114.31, lat: 34.80, period: '晋代', reason: '仕宦中原' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '山东济南', lng: 117.00, lat: 36.65, period: '明清', reason: '齐鲁故地' },
    ],
    figures: [
      { name: '宰父黑', dynasty: '春秋', achievement: '孔子弟子' },
      { name: '宰父亥', dynasty: '汉', achievement: '官员' },
      { name: '宰父宏', dynasty: '唐', achievement: '官员' },
      { name: '宰父端', dynasty: '明', achievement: '官员' },
    ],
    totem: '宰父以官为氏，图腾象征周代宰父官后裔。',
    history: '宰父姓源于官名，周代宰父官之后。河南宰父氏为郡望，宰父黑为孔子弟子。',
  },
  {
    surname: '谷梁',

    pinyin: 'Gǔliáng',

    rank: 453,

    populationRank: 490,

    population: 1,
    origin: '源于姬姓，春秋鲁国谷梁之后，以字为氏。又源于地名。',
    originPlace: { name: '山东曲阜', lng: 116.98, lat: 35.58 },
    originPeriod: '春秋',
    junwang: [
      { name: '鲁郡', location: '山东曲阜', lng: 116.98, lat: 35.58, tanghao: '鲁郡堂' },
      { name: '下邳郡', location: '江苏睢宁', lng: 117.94, lat: 33.89, tanghao: '下邳堂' },
    ],
    migration: [
      { name: '山东曲阜', lng: 116.98, lat: 35.58, period: '春秋', reason: '鲁国谷梁' },
      { name: '江苏睢宁', lng: 117.94, lat: 33.89, period: '汉代', reason: '下邳望族' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '晋代', reason: '仕宦中原' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '山东济南', lng: 117.00, lat: 36.65, period: '明清', reason: '齐鲁故地' },
    ],
    figures: [
      { name: '谷梁赤', dynasty: '战国', achievement: '学者，谷梁传作者' },
      { name: '谷梁淑', dynasty: '汉', achievement: '学者' },
      { name: '谷梁真', dynasty: '汉', achievement: '学者' },
      { name: '谷梁规', dynasty: '唐', achievement: '官员' },
    ],
    totem: '谷梁以字为氏，图腾象征鲁国谷梁后裔。',
    history: '谷梁姓源于姬姓，春秋鲁国谷梁之后。鲁郡谷梁氏为郡望，谷梁赤传春秋。',
  },
  {
    surname: '晋楚',

    pinyin: 'Jìnchǔ',

    rank: 454,

    populationRank: 500,

    population: 1,
    origin: '源于姬姓，春秋晋楚之后，以地为氏。极为罕见。',
    originPlace: { name: '山西临汾', lng: 111.52, lat: 36.08 },
    originPeriod: '春秋',
    junwang: [
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
      { name: '太原郡', location: '山西太原', lng: 112.55, lat: 37.87, tanghao: '太原堂' },
    ],
    migration: [
      { name: '山西临汾', lng: 111.52, lat: 36.08, period: '春秋', reason: '晋国故地' },
      { name: '山西太原', lng: 112.55, lat: 37.87, period: '汉代', reason: '太原望族' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '晋代', reason: '仕宦中原' },
      { name: '湖北荆州', lng: 112.24, lat: 30.33, period: '唐代', reason: '楚地迁徙' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '明清', reason: '南迁江左' },
    ],
    figures: [
      { name: '晋楚臣', dynasty: '春秋', achievement: '晋国大夫' },
      { name: '晋楚辅', dynasty: '汉', achievement: '官员' },
      { name: '晋楚义', dynasty: '唐', achievement: '官员' },
      { name: '晋楚端', dynasty: '明', achievement: '官员' },
    ],
    totem: '晋楚以地为氏，图腾象征晋国后裔。',
    history: '晋楚姓源于姬姓，春秋晋楚之后。太原晋楚氏为郡望，极为罕见。',
  },
  {
    surname: '闫法',

    pinyin: 'Yánfǎ',

    rank: 455,

    populationRank: 500,

    population: 1,
    origin: '源于官名，古代闫法官之后，以官为氏。极为罕见。',
    originPlace: { name: '河南洛阳', lng: 112.45, lat: 34.62 },
    originPeriod: '春秋',
    junwang: [
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
      { name: '天水郡', location: '甘肃天水', lng: 105.72, lat: 34.58, tanghao: '天水堂' },
    ],
    migration: [
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '春秋', reason: '闫法官后' },
      { name: '甘肃天水', lng: 105.72, lat: 34.58, period: '汉代', reason: '天水望族' },
      { name: '陕西西安', lng: 108.93, lat: 34.27, period: '晋代', reason: '仕宦关中' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '河南开封', lng: 114.31, lat: 34.80, period: '明清', reason: '中原聚居' },
    ],
    figures: [
      { name: '闫法明', dynasty: '汉', achievement: '官员' },
      { name: '闫法义', dynasty: '唐', achievement: '官员' },
      { name: '闫法信', dynasty: '宋', achievement: '官员' },
      { name: '闫法端', dynasty: '明', achievement: '官员' },
    ],
    totem: '闫法以官为氏，图腾象征古代闫法官后裔。',
    history: '闫法姓源于官名，古代闫法官之后。河南闫法氏为郡望，极为罕见。',
  },
  {
    surname: '汝鄢',

    pinyin: 'Rǔyān',

    rank: 456,

    populationRank: 500,

    population: 1,
    origin: '源于地名，春秋汝水与鄢地之后，以地为氏。极为罕见。',
    originPlace: { name: '河南汝州', lng: 112.84, lat: 34.17 },
    originPeriod: '春秋',
    junwang: [
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
      { name: '颍川郡', location: '河南禹州', lng: 113.49, lat: 34.16, tanghao: '颍川堂' },
    ],
    migration: [
      { name: '河南汝州', lng: 112.84, lat: 34.17, period: '春秋', reason: '汝水鄢地' },
      { name: '河南禹州', lng: 113.49, lat: 34.16, period: '汉代', reason: '颍川望族' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '晋代', reason: '河南汝鄢氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '河南开封', lng: 114.31, lat: 34.80, period: '明清', reason: '中原聚居' },
    ],
    figures: [
      { name: '汝鄢助', dynasty: '汉', achievement: '官员' },
      { name: '汝鄢宏', dynasty: '唐', achievement: '官员' },
      { name: '汝鄢端', dynasty: '宋', achievement: '官员' },
      { name: '汝鄢信', dynasty: '明', achievement: '官员' },
    ],
    totem: '汝鄢以地为氏，图腾象征汝水鄢地后裔。',
    history: '汝鄢姓源于地名，以地为氏。河南汝鄢氏为郡望，极为罕见。',
  },
  {
    surname: '涂钦',

    pinyin: 'Túqīn',

    rank: 457,

    populationRank: 500,

    population: 1,
    origin: '源于官名，古代涂钦官之后，以官为氏。极为罕见。',
    originPlace: { name: '安徽合肥', lng: 117.28, lat: 31.86 },
    originPeriod: '春秋',
    junwang: [
      { name: '豫章郡', location: '江西南昌', lng: 115.89, lat: 28.68, tanghao: '豫章堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '安徽合肥', lng: 117.28, lat: 31.86, period: '春秋', reason: '涂钦官后' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '汉代', reason: '河南望族' },
      { name: '江西南昌', lng: 115.89, lat: 28.68, period: '晋代', reason: '豫章涂钦氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '安徽黄山', lng: 118.31, lat: 29.72, period: '明清', reason: '江淮聚居' },
    ],
    figures: [
      { name: '涂钦明', dynasty: '汉', achievement: '官员' },
      { name: '涂钦义', dynasty: '唐', achievement: '官员' },
      { name: '涂钦信', dynasty: '宋', achievement: '官员' },
      { name: '涂钦端', dynasty: '明', achievement: '官员' },
    ],
    totem: '涂钦以官为氏，图腾象征古代涂钦官后裔。',
    history: '涂钦姓源于官名，古代涂钦官之后。豫章涂钦氏为郡望，极为罕见。',
  },
  {
    surname: '段干',

    pinyin: 'Duàngān',

    rank: 458,

    populationRank: 495,

    population: 1,
    origin: '源于姬姓，春秋晋国段干之后，以邑为氏。又源于老子，李聃封段干。',
    originPlace: { name: '山西运城', lng: 111.01, lat: 35.02 },
    originPeriod: '春秋',
    junwang: [
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
      { name: '河东郡', location: '山西运城', lng: 111.01, lat: 35.02, tanghao: '河东堂' },
    ],
    migration: [
      { name: '山西运城', lng: 111.01, lat: 35.02, period: '春秋', reason: '晋国段干' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '汉代', reason: '河南望族' },
      { name: '陕西西安', lng: 108.93, lat: 34.27, period: '晋代', reason: '关中段干氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '河南开封', lng: 114.31, lat: 34.80, period: '明清', reason: '中原聚居' },
    ],
    figures: [
      { name: '段干木', dynasty: '战国', achievement: '魏国贤士，子夏弟子' },
      { name: '段干伦', dynasty: '汉', achievement: '官员' },
      { name: '段干宏', dynasty: '唐', achievement: '官员' },
      { name: '段干端', dynasty: '明', achievement: '官员' },
    ],
    totem: '段干以邑为氏，图腾象征晋国段干后裔。',
    history: '段干姓源于姬姓，春秋晋国段干之后。河南段干氏为郡望，段干木为魏国贤士。',
  },
  {
    surname: '百里',

    pinyin: 'Bǎilǐ',

    rank: 459,

    populationRank: 480,

    population: 1,
    origin: '源于姬姓，春秋虞国百里奚之后，以邑为氏。又源于官名。',
    originPlace: { name: '山西平陆', lng: 111.21, lat: 34.85 },
    originPeriod: '春秋',
    junwang: [
      { name: '新蔡郡', location: '河南新蔡', lng: 114.99, lat: 32.75, tanghao: '新蔡堂' },
      { name: '京兆郡', location: '陕西西安', lng: 108.93, lat: 34.27, tanghao: '京兆堂' },
    ],
    migration: [
      { name: '山西平陆', lng: 111.21, lat: 34.85, period: '春秋', reason: '虞国百里' },
      { name: '河南南阳', lng: 112.53, lat: 33.00, period: '春秋', reason: '百里奚入秦' },
      { name: '陕西西安', lng: 108.93, lat: 34.27, period: '汉代', reason: '京兆望族' },
      { name: '河南新蔡', lng: 114.99, lat: 32.75, period: '晋代', reason: '新蔡百里氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '明清', reason: '南迁江左' },
    ],
    figures: [
      { name: '百里奚', dynasty: '春秋', achievement: '秦国名相，五羖大夫' },
      { name: '百里视', dynasty: '春秋', achievement: '秦国将领，孟明视' },
      { name: '百里嵩', dynasty: '汉', achievement: '徐州刺史' },
      { name: '百里端', dynasty: '明', achievement: '官员' },
    ],
    totem: '百里以邑为氏，图腾象征虞国百里后裔。',
    history: '百里姓源于姬姓，春秋虞国百里奚之后。新蔡百里氏为郡望，百里奚为秦国名相。',
  },
  {
    surname: '东郭',

    pinyin: 'Dōngguō',

    rank: 460,

    populationRank: 470,

    population: 2,
    origin: '源于姜姓，春秋齐国公族居东郭，以居为氏。',
    originPlace: { name: '山东淄博', lng: 118.05, lat: 36.78 },
    originPeriod: '春秋',
    junwang: [
      { name: '齐郡', location: '山东淄博', lng: 118.05, lat: 36.78, tanghao: '齐郡堂' },
      { name: '济南郡', location: '山东济南', lng: 117.00, lat: 36.65, tanghao: '济南堂' },
    ],
    migration: [
      { name: '山东淄博', lng: 118.05, lat: 36.78, period: '春秋', reason: '齐东郭' },
      { name: '山东济南', lng: 117.00, lat: 36.65, period: '汉代', reason: '济南望族' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '晋代', reason: '仕宦中原' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '山东青岛', lng: 120.38, lat: 36.07, period: '明清', reason: '齐鲁故地' },
    ],
    figures: [
      { name: '东郭咸', dynasty: '春秋', achievement: '齐国大夫' },
      { name: '东郭贾', dynasty: '春秋', achievement: '齐国大夫' },
      { name: '东郭顺子', dynasty: '战国', achievement: '魏国贤士' },
      { name: '东郭先生', dynasty: '汉', achievement: '传说人物' },
    ],
    totem: '东郭以居为氏，图腾象征齐国东郭后裔。',
    history: '东郭姓源于姜姓，春秋齐国公族居东郭。齐郡东郭氏为郡望，东郭先生传说著名。',
  },
  {
    surname: '南门',

    pinyin: 'Nánmén',

    rank: 461,

    populationRank: 500,

    population: 1,
    origin: '源于居地，古代居南门者之后，以居为氏。又源于官名。',
    originPlace: { name: '河南洛阳', lng: 112.45, lat: 34.62 },
    originPeriod: '上古',
    junwang: [
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
      { name: '河内郡', location: '河南沁阳', lng: 112.93, lat: 35.09, tanghao: '河内堂' },
    ],
    migration: [
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '上古', reason: '居南门' },
      { name: '河南沁阳', lng: 112.93, lat: 35.09, period: '汉代', reason: '河内望族' },
      { name: '陕西西安', lng: 108.93, lat: 34.27, period: '晋代', reason: '仕宦关中' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '河南开封', lng: 114.31, lat: 34.80, period: '明清', reason: '中原聚居' },
    ],
    figures: [
      { name: '南门蠕', dynasty: '商', achievement: '商代大臣' },
      { name: '南门明', dynasty: '汉', achievement: '官员' },
      { name: '南门义', dynasty: '唐', achievement: '官员' },
      { name: '南门端', dynasty: '明', achievement: '官员' },
    ],
    totem: '南门以居为氏，图腾象征古代居南门者后裔。',
    history: '南门姓源于居地，以居为氏。河南南门氏为郡望，极为罕见。',
  },
  {
    surname: '呼延',

    pinyin: 'Hūyán',

    rank: 462,

    populationRank: 400,

    population: 6,
    origin: '源于匈奴族，北魏呼延部落之后，以部落为氏。又改姓呼衍。',
    originPlace: { name: '山西大同', lng: 113.30, lat: 40.08 },
    originPeriod: '南北朝',
    junwang: [
      { name: '太原郡', location: '山西太原', lng: 112.55, lat: 37.87, tanghao: '太原堂' },
      { name: '安定郡', location: '甘肃泾川', lng: 107.37, lat: 35.33, tanghao: '安定堂' },
    ],
    migration: [
      { name: '山西大同', lng: 113.30, lat: 40.08, period: '南北朝', reason: '匈奴呼延部' },
      { name: '山西太原', lng: 112.55, lat: 37.87, period: '汉代', reason: '太原望族' },
      { name: '甘肃泾川', lng: 107.37, lat: 35.33, period: '晋代', reason: '安定呼延氏' },
      { name: '陕西西安', lng: 108.93, lat: 34.27, period: '唐代', reason: '仕宦长安' },
      { name: '四川成都', lng: 104.07, lat: 30.67, period: '明清', reason: '蜀地呼延氏' },
    ],
    figures: [
      { name: '呼延赞', dynasty: '宋', achievement: '将领，骁勇' },
      { name: '呼延庆', dynasty: '宋', achievement: '将领，传说人物' },
      { name: '呼延震', dynasty: '唐', achievement: '官员' },
      { name: '呼延晏', dynasty: '汉', achievement: '官员' },
    ],
    totem: '呼延为匈奴部落名，图腾以部落为氏，象征匈奴贵族后裔。',
    history: '呼延姓源于匈奴族，北魏呼延部落之后。太原呼延氏为郡望，宋代呼延赞为名将。',
  },
  {
    surname: '归海',

    pinyin: 'Guīhǎi',

    rank: 463,

    populationRank: 500,

    population: 1,
    origin: '源于地名，古代归海之后，以地为氏。极为罕见。又传说姓。',
    originPlace: { name: '江苏苏州', lng: 120.62, lat: 31.32 },
    originPeriod: '春秋',
    junwang: [
      { name: '吴郡', location: '江苏苏州', lng: 120.62, lat: 31.32, tanghao: '吴郡堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '江苏苏州', lng: 120.62, lat: 31.32, period: '春秋', reason: '吴地归海' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '汉代', reason: '河南望族' },
      { name: '浙江杭州', lng: 120.16, lat: 30.27, period: '宋代', reason: '江南迁徙' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '明代', reason: '江左聚居' },
      { name: '上海', lng: 121.47, lat: 31.23, period: '清代', reason: '江南聚居' },
    ],
    figures: [
      { name: '归海明', dynasty: '汉', achievement: '官员' },
      { name: '归海义', dynasty: '唐', achievement: '官员' },
      { name: '归海信', dynasty: '宋', achievement: '官员' },
      { name: '归海端', dynasty: '明', achievement: '官员' },
    ],
    totem: '归海以地为氏，图腾象征古代归海后裔。',
    history: '归海姓源于地名，以地为氏。吴郡归海氏为郡望，极为罕见。',
  },
  {
    surname: '羊舌',

    pinyin: 'Yángshé',

    rank: 464,

    populationRank: 500,

    population: 1,
    origin: '源于姬姓，春秋晋国羊舌氏之后，以邑为氏。',
    originPlace: { name: '山西洪洞', lng: 111.72, lat: 36.25 },
    originPeriod: '春秋',
    junwang: [
      { name: '河东郡', location: '山西运城', lng: 111.01, lat: 35.02, tanghao: '河东堂' },
      { name: '京兆郡', location: '陕西西安', lng: 108.93, lat: 34.27, tanghao: '京兆堂' },
    ],
    migration: [
      { name: '山西洪洞', lng: 111.72, lat: 36.25, period: '春秋', reason: '晋国羊舌' },
      { name: '山西运城', lng: 111.01, lat: 35.02, period: '汉代', reason: '河东望族' },
      { name: '陕西西安', lng: 108.93, lat: 34.27, period: '晋代', reason: '京兆羊舌氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '山西太原', lng: 112.55, lat: 37.87, period: '明清', reason: '晋地聚居' },
    ],
    figures: [
      { name: '羊舌赤', dynasty: '春秋', achievement: '晋国大夫，铜鞮伯华' },
      { name: '羊舌肸', dynasty: '春秋', achievement: '晋国大夫，叔向' },
      { name: '羊舌虎', dynasty: '春秋', achievement: '晋国大夫' },
      { name: '羊舌职', dynasty: '春秋', achievement: '晋国大夫' },
    ],
    totem: '羊舌以邑为氏，图腾象征晋国羊舌后裔。',
    history: '羊舌姓源于姬姓，春秋晋国羊舌氏之后。河东羊舌氏为郡望，叔向为晋国名臣。',
  },
  {
    surname: '微生',

    pinyin: 'Wēishēng',

    rank: 465,

    populationRank: 485,

    population: 1,
    origin: '源于姬姓，春秋鲁国微生之后，以字为氏。又源于姬姓，卫国微生氏。',
    originPlace: { name: '山东曲阜', lng: 116.98, lat: 35.58 },
    originPeriod: '春秋',
    junwang: [
      { name: '鲁郡', location: '山东曲阜', lng: 116.98, lat: 35.58, tanghao: '鲁郡堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '山东曲阜', lng: 116.98, lat: 35.58, period: '春秋', reason: '鲁国微生' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '汉代', reason: '河南望族' },
      { name: '山西太原', lng: 112.55, lat: 37.87, period: '晋代', reason: '仕宦晋地' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '山东济南', lng: 117.00, lat: 36.65, period: '明清', reason: '齐鲁故地' },
    ],
    figures: [
      { name: '微生高', dynasty: '春秋', achievement: '鲁国名士' },
      { name: '微生亩', dynasty: '春秋', achievement: '鲁国隐士' },
      { name: '微生明', dynasty: '汉', achievement: '官员' },
      { name: '微生端', dynasty: '明', achievement: '官员' },
    ],
    totem: '微生以字为氏，图腾象征鲁国微生后裔。',
    history: '微生姓源于姬姓，春秋鲁国微生之后。鲁郡微生氏为郡望，微生高为鲁国名士。',
  },
  {
    surname: '岳帅',

    pinyin: 'Yuèshuài',

    rank: 466,

    populationRank: 500,

    population: 1,
    origin: '源于官名，古代岳帅官之后，以官为氏。极为罕见。',
    originPlace: { name: '河南洛阳', lng: 112.45, lat: 34.62 },
    originPeriod: '西周',
    junwang: [
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
      { name: '山阳郡', location: '河南焦作', lng: 113.24, lat: 35.22, tanghao: '山阳堂' },
    ],
    migration: [
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '西周', reason: '岳帅官后' },
      { name: '河南焦作', lng: 113.24, lat: 35.22, period: '汉代', reason: '山阳望族' },
      { name: '陕西西安', lng: 108.93, lat: 34.27, period: '晋代', reason: '仕宦关中' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '河南开封', lng: 114.31, lat: 34.80, period: '明清', reason: '中原聚居' },
    ],
    figures: [
      { name: '岳帅明', dynasty: '汉', achievement: '官员' },
      { name: '岳帅义', dynasty: '唐', achievement: '官员' },
      { name: '岳帅信', dynasty: '宋', achievement: '官员' },
      { name: '岳帅端', dynasty: '明', achievement: '官员' },
    ],
    totem: '岳帅以官为氏，图腾象征古代岳帅官后裔。',
    history: '岳帅姓源于官名，古代岳帅官之后。河南岳帅氏为郡望，极为罕见。',
  },
  {
    surname: '缑亢',

    pinyin: 'Gōukàng',

    rank: 467,

    populationRank: 500,

    population: 1,
    origin: '源于地名，古代缑亢之后，以地为氏。极为罕见。又源于姬姓。',
    originPlace: { name: '河南偃师', lng: 112.78, lat: 34.73 },
    originPeriod: '春秋',
    junwang: [
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
      { name: '太原郡', location: '山西太原', lng: 112.55, lat: 37.87, tanghao: '太原堂' },
    ],
    migration: [
      { name: '河南偃师', lng: 112.78, lat: 34.73, period: '春秋', reason: '缑亢地' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '汉代', reason: '河南望族' },
      { name: '山西太原', lng: 112.55, lat: 37.87, period: '晋代', reason: '太原缑亢氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '河南开封', lng: 114.31, lat: 34.80, period: '明清', reason: '中原聚居' },
    ],
    figures: [
      { name: '缑亢明', dynasty: '汉', achievement: '官员' },
      { name: '缑亢义', dynasty: '唐', achievement: '官员' },
      { name: '缑亢信', dynasty: '宋', achievement: '官员' },
      { name: '缑亢端', dynasty: '明', achievement: '官员' },
    ],
    totem: '缑亢以地为氏，图腾象征古代缑亢后裔。',
    history: '缑亢姓源于地名，以地为氏。河南缑亢氏为郡望，极为罕见。',
  },
  {
    surname: '况后',

    pinyin: 'Kuànghòu',

    rank: 468,

    populationRank: 500,

    population: 1,
    origin: '源于官名，古代况后官之后，以官为氏。极为罕见。又源于地名。',
    originPlace: { name: '江西高安', lng: 115.38, lat: 28.42 },
    originPeriod: '春秋',
    junwang: [
      { name: '豫章郡', location: '江西南昌', lng: 115.89, lat: 28.68, tanghao: '豫章堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '江西高安', lng: 115.38, lat: 28.42, period: '春秋', reason: '况后地' },
      { name: '江西南昌', lng: 115.89, lat: 28.68, period: '汉代', reason: '豫章望族' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '晋代', reason: '仕宦中原' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '江西九江', lng: 116.00, lat: 29.71, period: '明清', reason: '江右聚居' },
    ],
    figures: [
      { name: '况后明', dynasty: '汉', achievement: '官员' },
      { name: '况后义', dynasty: '唐', achievement: '官员' },
      { name: '况后信', dynasty: '宋', achievement: '官员' },
      { name: '况后端', dynasty: '明', achievement: '官员' },
    ],
    totem: '况后以官为氏，图腾象征古代况后官后裔。',
    history: '况后姓源于官名，古代况后官之后。豫章况后氏为郡望，极为罕见。',
  },
  {
    surname: '有琴',

    pinyin: 'Yǒuqín',

    rank: 469,

    populationRank: 500,

    population: 1,
    origin: '源于官名，古代有琴官之后，以官为氏。极为罕见。',
    originPlace: { name: '河南洛阳', lng: 112.45, lat: 34.62 },
    originPeriod: '西周',
    junwang: [
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
      { name: '鲁郡', location: '山东曲阜', lng: 116.98, lat: 35.58, tanghao: '鲁郡堂' },
    ],
    migration: [
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '西周', reason: '有琴官后' },
      { name: '山东曲阜', lng: 116.98, lat: 35.58, period: '汉代', reason: '鲁郡望族' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '浙江杭州', lng: 120.16, lat: 30.27, period: '明代', reason: '江南聚居' },
      { name: '河南开封', lng: 114.31, lat: 34.80, period: '清代', reason: '中原聚居' },
    ],
    figures: [
      { name: '有琴明', dynasty: '汉', achievement: '官员' },
      { name: '有琴义', dynasty: '唐', achievement: '官员' },
      { name: '有琴信', dynasty: '宋', achievement: '官员' },
      { name: '有琴端', dynasty: '明', achievement: '官员' },
    ],
    totem: '有琴以官为氏，图腾象征古代有琴官后裔。',
    history: '有琴姓源于官名，古代有琴官之后。河南有琴氏为郡望，极为罕见。',
  },
  {
    surname: '梁丘',

    pinyin: 'Liángqiū',

    rank: 470,

    populationRank: 490,

    population: 1,
    origin: '源于姬姓，春秋齐国梁丘之后，以邑为氏。',
    originPlace: { name: '山东菏泽', lng: 115.49, lat: 35.24 },
    originPeriod: '春秋',
    junwang: [
      { name: '齐郡', location: '山东淄博', lng: 118.05, lat: 36.78, tanghao: '齐郡堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '山东菏泽', lng: 115.49, lat: 35.24, period: '春秋', reason: '齐梁丘邑' },
      { name: '山东淄博', lng: 118.05, lat: 36.78, period: '汉代', reason: '齐郡望族' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '晋代', reason: '河南梁丘氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '山东济南', lng: 117.00, lat: 36.65, period: '明清', reason: '齐鲁故地' },
    ],
    figures: [
      { name: '梁丘据', dynasty: '春秋', achievement: '齐国大夫' },
      { name: '梁丘贺', dynasty: '汉', achievement: '学者，易经' },
      { name: '梁丘临', dynasty: '汉', achievement: '学者' },
      { name: '梁丘端', dynasty: '明', achievement: '官员' },
    ],
    totem: '梁丘以邑为氏，图腾象征齐国梁丘后裔。',
    history: '梁丘姓源于姬姓，春秋齐国梁丘之后。齐郡梁丘氏为郡望，汉代梁丘贺传易学。',
  },
  {
    surname: '左丘',

    pinyin: 'Zuǒqiū',

    rank: 471,

    populationRank: 490,

    population: 1,
    origin: '源于姬姓，春秋鲁国左丘之后，以字为氏。又源于地名。',
    originPlace: { name: '山东肥城', lng: 116.77, lat: 36.18 },
    originPeriod: '春秋',
    junwang: [
      { name: '鲁郡', location: '山东曲阜', lng: 116.98, lat: 35.58, tanghao: '鲁郡堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '山东肥城', lng: 116.77, lat: 36.18, period: '春秋', reason: '左丘明故里' },
      { name: '山东曲阜', lng: 116.98, lat: 35.58, period: '汉代', reason: '鲁郡望族' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '晋代', reason: '仕宦中原' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '山东济南', lng: 117.00, lat: 36.65, period: '明清', reason: '齐鲁故地' },
    ],
    figures: [
      { name: '左丘明', dynasty: '春秋', achievement: '史学家，左传国语作者' },
      { name: '左丘毅', dynasty: '汉', achievement: '官员' },
      { name: '左丘明', dynasty: '春秋', achievement: '鲁国太史' },
      { name: '左丘端', dynasty: '明', achievement: '官员' },
    ],
    totem: '左丘以字为氏，图腾象征鲁国左丘后裔。',
    history: '左丘姓源于姬姓，春秋鲁国左丘之后。鲁郡左丘氏为郡望，左丘明为史学鼻祖。',
  },
  {
    surname: '东门',

    pinyin: 'Dōngmén',

    rank: 472,

    populationRank: 470,

    population: 2,
    origin: '源于姬姓，春秋鲁国东门之后，以居为氏。又源于居地。',
    originPlace: { name: '山东曲阜', lng: 116.98, lat: 35.58 },
    originPeriod: '春秋',
    junwang: [
      { name: '济阴郡', location: '山东菏泽', lng: 115.49, lat: 35.24, tanghao: '济阴堂' },
      { name: '鲁郡', location: '山东曲阜', lng: 116.98, lat: 35.58, tanghao: '鲁郡堂' },
    ],
    migration: [
      { name: '山东曲阜', lng: 116.98, lat: 35.58, period: '春秋', reason: '鲁东门' },
      { name: '山东菏泽', lng: 115.49, lat: 35.24, period: '汉代', reason: '济阴望族' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '晋代', reason: '仕宦中原' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '山东济南', lng: 117.00, lat: 36.65, period: '明清', reason: '齐鲁故地' },
    ],
    figures: [
      { name: '东门襄仲', dynasty: '春秋', achievement: '鲁国权臣，公子遂' },
      { name: '东门归父', dynasty: '春秋', achievement: '鲁国大夫' },
      { name: '东门京', dynasty: '汉', achievement: '官员' },
      { name: '东门端', dynasty: '明', achievement: '官员' },
    ],
    totem: '东门以居为氏，图腾象征鲁国东门后裔。',
    history: '东门姓源于姬姓，春秋鲁国东门之后。济阴东门氏为郡望，东门襄仲为鲁国权臣。',
  },
  {
    surname: '西门',

    pinyin: 'Xīmén',

    rank: 473,

    populationRank: 440,

    population: 4,
    origin: '源于姬姓，春秋郑国西门之后，以居为氏。又源于居地。',
    originPlace: { name: '河南新郑', lng: 113.74, lat: 34.40 },
    originPeriod: '春秋',
    junwang: [
      { name: '梁郡', location: '河南商丘', lng: 115.65, lat: 34.44, tanghao: '梁郡堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '河南新郑', lng: 113.74, lat: 34.40, period: '春秋', reason: '郑西门' },
      { name: '河南商丘', lng: 115.65, lat: 34.44, period: '汉代', reason: '梁郡望族' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '晋代', reason: '河南西门氏' },
      { name: '山东平原', lng: 116.43, lat: 37.16, period: '唐代', reason: '西门豹故里' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '明清', reason: '南迁江左' },
    ],
    figures: [
      { name: '西门豹', dynasty: '战国', achievement: '邺令，投巫治水' },
      { name: '西门季', dynasty: '汉', achievement: '官员' },
      { name: '西门恭', dynasty: '唐', achievement: '官员' },
      { name: '西门端', dynasty: '明', achievement: '官员' },
    ],
    totem: '西门以居为氏，图腾象征郑国西门后裔。',
    history: '西门姓源于姬姓，春秋郑国西门之后。梁郡西门氏为郡望，战国西门豹治邺最著名。',
  },
  {
    surname: '商牟',

    pinyin: 'Shāngmóu',

    rank: 474,

    populationRank: 500,

    population: 1,
    origin: '源于官名，古代商牟官之后，以官为氏。极为罕见。又源于地名。',
    originPlace: { name: '河南商丘', lng: 115.65, lat: 34.44 },
    originPeriod: '商代',
    junwang: [
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
      { name: '鲁郡', location: '山东曲阜', lng: 116.98, lat: 35.58, tanghao: '鲁郡堂' },
    ],
    migration: [
      { name: '河南商丘', lng: 115.65, lat: 34.44, period: '商代', reason: '商牟官后' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '汉代', reason: '河南望族' },
      { name: '山东曲阜', lng: 116.98, lat: 35.58, period: '晋代', reason: '鲁郡商牟氏' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '河南开封', lng: 114.31, lat: 34.80, period: '明清', reason: '中原聚居' },
    ],
    figures: [
      { name: '商牟明', dynasty: '汉', achievement: '官员' },
      { name: '商牟义', dynasty: '唐', achievement: '官员' },
      { name: '商牟信', dynasty: '宋', achievement: '官员' },
      { name: '商牟端', dynasty: '明', achievement: '官员' },
    ],
    totem: '商牟以官为氏，图腾象征古代商牟官后裔。',
    history: '商牟姓源于官名，古代商牟官之后。河南商牟氏为郡望，极为罕见。',
  },
  {
    surname: '佘佴',

    pinyin: 'Shéèr',

    rank: 475,

    populationRank: 500,

    population: 1,
    origin: '源于地名，古代佘佴之后，以地为氏。极为罕见。又源于佘姓与佴姓合称。',
    originPlace: { name: '江苏南京', lng: 118.78, lat: 32.04 },
    originPeriod: '春秋',
    junwang: [
      { name: '吴郡', location: '江苏苏州', lng: 120.62, lat: 31.32, tanghao: '吴郡堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '春秋', reason: '佘佴地' },
      { name: '江苏苏州', lng: 120.62, lat: 31.32, period: '汉代', reason: '吴郡望族' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '晋代', reason: '仕宦中原' },
      { name: '浙江杭州', lng: 120.16, lat: 30.27, period: '宋代', reason: '南迁江南' },
      { name: '上海', lng: 121.47, lat: 31.23, period: '明清', reason: '江南聚居' },
    ],
    figures: [
      { name: '佘佴明', dynasty: '汉', achievement: '官员' },
      { name: '佘佴义', dynasty: '唐', achievement: '官员' },
      { name: '佘佴信', dynasty: '宋', achievement: '官员' },
      { name: '佘佴端', dynasty: '明', achievement: '官员' },
    ],
    totem: '佘佴以地为氏，图腾象征古代佘佴后裔。',
    history: '佘佴姓源于地名，以地为氏。吴郡佘佴氏为郡望，极为罕见。',
  },
  {
    surname: '伯赏',

    pinyin: 'Bóshǎng',

    rank: 476,

    populationRank: 500,

    population: 1,
    origin: '源于官名，古代伯赏官之后，以官为氏。极为罕见。又源于姬姓。',
    originPlace: { name: '河南洛阳', lng: 112.45, lat: 34.62 },
    originPeriod: '西周',
    junwang: [
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
      { name: '河东郡', location: '山西运城', lng: 111.01, lat: 35.02, tanghao: '河东堂' },
    ],
    migration: [
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '西周', reason: '伯赏官后' },
      { name: '山西运城', lng: 111.01, lat: 35.02, period: '汉代', reason: '河东望族' },
      { name: '陕西西安', lng: 108.93, lat: 34.27, period: '晋代', reason: '仕宦关中' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '河南开封', lng: 114.31, lat: 34.80, period: '明清', reason: '中原聚居' },
    ],
    figures: [
      { name: '伯赏明', dynasty: '汉', achievement: '官员' },
      { name: '伯赏义', dynasty: '唐', achievement: '官员' },
      { name: '伯赏信', dynasty: '宋', achievement: '官员' },
      { name: '伯赏端', dynasty: '明', achievement: '官员' },
    ],
    totem: '伯赏以官为氏，图腾象征古代伯赏官后裔。',
    history: '伯赏姓源于官名，古代伯赏官之后。河南伯赏氏为郡望，极为罕见。',
  },
  {
    surname: '南宫',

    pinyin: 'Nángōng',

    rank: 477,

    populationRank: 420,

    population: 4,
    origin: '源于姬姓，春秋鲁国南宫之后，以字为氏。又源于官名。',
    originPlace: { name: '山东曲阜', lng: 116.98, lat: 35.58 },
    originPeriod: '春秋',
    junwang: [
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
      { name: '鲁郡', location: '山东曲阜', lng: 116.98, lat: 35.58, tanghao: '鲁郡堂' },
    ],
    migration: [
      { name: '山东曲阜', lng: 116.98, lat: 35.58, period: '春秋', reason: '鲁南宫' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '汉代', reason: '河南望族' },
      { name: '河北南宫', lng: 115.38, lat: 37.36, period: '晋代', reason: '南宫地' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '山东济南', lng: 117.00, lat: 36.65, period: '明清', reason: '齐鲁故地' },
    ],
    figures: [
      { name: '南宫适', dynasty: '春秋', achievement: '孔子弟子，南容' },
      { name: '南宫括', dynasty: '商', achievement: '周文王四友之一' },
      { name: '南宫敬叔', dynasty: '春秋', achievement: '鲁国大夫' },
      { name: '南宫长万', dynasty: '春秋', achievement: '宋国将领' },
    ],
    totem: '南宫以字为氏，图腾象征鲁国南宫后裔。',
    history: '南宫姓源于姬姓，春秋鲁国南宫之后。河南南宫氏为郡望，南宫适为孔子弟子。',
  },
  {
    surname: '墨哈',

    pinyin: 'Mòhā',

    rank: 478,

    populationRank: 500,

    population: 1,
    origin: '源于少数民族，古代墨哈部落之后，以部落为氏。极为罕见。',
    originPlace: { name: '云南昆明', lng: 102.72, lat: 25.04 },
    originPeriod: '明代',
    junwang: [
      { name: '云南郡', location: '云南昆明', lng: 102.72, lat: 25.04, tanghao: '云南堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '云南昆明', lng: 102.72, lat: 25.04, period: '明代', reason: '墨哈部' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '清代', reason: '仕宦中原' },
      { name: '北京', lng: 116.40, lat: 39.90, period: '清代', reason: '京城任职' },
      { name: '四川成都', lng: 104.07, lat: 30.67, period: '近代', reason: '蜀地迁徙' },
      { name: '广东广州', lng: 113.27, lat: 23.13, period: '现代', reason: '岭南迁徙' },
    ],
    figures: [
      { name: '墨哈明', dynasty: '明', achievement: '官员' },
      { name: '墨哈义', dynasty: '清', achievement: '官员' },
      { name: '墨哈信', dynasty: '清', achievement: '官员' },
      { name: '墨哈端', dynasty: '近代', achievement: '学者' },
    ],
    totem: '墨哈为少数民族部落名，图腾以部落为氏。',
    history: '墨哈姓源于少数民族，古代墨哈部落之后。云南墨哈氏为郡望，极为罕见。',
  },
  {
    surname: '谯笪',

    pinyin: 'Qiáodá',

    rank: 479,

    populationRank: 500,

    population: 1,
    origin: '源于地名，古代谯笪之后，以地为氏。极为罕见。又源于谯姓与笪姓合称。',
    originPlace: { name: '安徽亳州', lng: 115.78, lat: 33.85 },
    originPeriod: '春秋',
    junwang: [
      { name: '谯国郡', location: '安徽亳州', lng: 115.78, lat: 33.85, tanghao: '谯国堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '安徽亳州', lng: 115.78, lat: 33.85, period: '春秋', reason: '谯笪地' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '汉代', reason: '河南望族' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '浙江杭州', lng: 120.16, lat: 30.27, period: '明代', reason: '江南聚居' },
      { name: '安徽合肥', lng: 117.28, lat: 31.86, period: '清代', reason: '江淮聚居' },
    ],
    figures: [
      { name: '谯笪明', dynasty: '汉', achievement: '官员' },
      { name: '谯笪义', dynasty: '唐', achievement: '官员' },
      { name: '谯笪信', dynasty: '宋', achievement: '官员' },
      { name: '谯笪端', dynasty: '明', achievement: '官员' },
    ],
    totem: '谯笪以地为氏，图腾象征古代谯笪后裔。',
    history: '谯笪姓源于地名，以地为氏。谯国谯笪氏为郡望，极为罕见。',
  },
  {
    surname: '年爱',

    pinyin: 'Niánài',

    rank: 480,

    populationRank: 500,

    population: 1,
    origin: '源于官名，古代年爱官之后，以官为氏。极为罕见。又源于年姓与爱姓合称。',
    originPlace: { name: '河北保定', lng: 115.47, lat: 38.87 },
    originPeriod: '春秋',
    junwang: [
      { name: '河北郡', location: '河北保定', lng: 115.47, lat: 38.87, tanghao: '河北堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '河北保定', lng: 115.47, lat: 38.87, period: '春秋', reason: '年爱官后' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '汉代', reason: '河南望族' },
      { name: '北京', lng: 116.40, lat: 39.90, period: '晋代', reason: '仕宦幽州' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '河北石家庄', lng: 114.51, lat: 38.04, period: '明清', reason: '北方聚居' },
    ],
    figures: [
      { name: '年爱明', dynasty: '汉', achievement: '官员' },
      { name: '年爱义', dynasty: '唐', achievement: '官员' },
      { name: '年爱信', dynasty: '宋', achievement: '官员' },
      { name: '年爱端', dynasty: '明', achievement: '官员' },
    ],
    totem: '年爱以官为氏，图腾象征古代年爱官后裔。',
    history: '年爱姓源于官名，古代年爱官之后。河北年爱氏为郡望，极为罕见。',
  },
  {
    surname: '阳佟',

    pinyin: 'Yángtóng',

    rank: 481,

    populationRank: 500,

    population: 1,
    origin: '源于地名，古代阳佟之后，以地为氏。极为罕见。又源于阳姓与佟姓合称。',
    originPlace: { name: '山东临沂', lng: 118.35, lat: 35.05 },
    originPeriod: '春秋',
    junwang: [
      { name: '琅琊郡', location: '山东临沂', lng: 118.35, lat: 35.05, tanghao: '琅琊堂' },
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
    ],
    migration: [
      { name: '山东临沂', lng: 118.35, lat: 35.05, period: '春秋', reason: '阳佟地' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '汉代', reason: '河南望族' },
      { name: '辽宁辽阳', lng: 123.17, lat: 41.27, period: '晋代', reason: '佟姓故地' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '山东济南', lng: 117.00, lat: 36.65, period: '明清', reason: '齐鲁故地' },
    ],
    figures: [
      { name: '阳佟明', dynasty: '汉', achievement: '官员' },
      { name: '阳佟义', dynasty: '唐', achievement: '官员' },
      { name: '阳佟信', dynasty: '宋', achievement: '官员' },
      { name: '阳佟端', dynasty: '明', achievement: '官员' },
    ],
    totem: '阳佟以地为氏，图腾象征古代阳佟后裔。',
    history: '阳佟姓源于地名，以地为氏。琅琊阳佟氏为郡望，极为罕见。',
  },
  {
    surname: '第五',

    pinyin: 'Dìwǔ',

    rank: 482,

    populationRank: 490,

    population: 1,
    origin: '源于汉皇族，汉元帝皇族之后，以排行为氏。刘氏后裔第五房。',
    originPlace: { name: '陕西西安', lng: 108.93, lat: 34.27 },
    originPeriod: '汉代',
    junwang: [
      { name: '陇西郡', location: '甘肃临洮', lng: 103.86, lat: 35.37, tanghao: '陇西堂' },
      { name: '京兆郡', location: '陕西西安', lng: 108.93, lat: 34.27, tanghao: '京兆堂' },
    ],
    migration: [
      { name: '陕西西安', lng: 108.93, lat: 34.27, period: '汉代', reason: '刘氏第五房' },
      { name: '甘肃临洮', lng: 103.86, lat: 35.37, period: '晋代', reason: '陇西望族' },
      { name: '陕西延安', lng: 109.49, lat: 36.59, period: '唐代', reason: '关中迁徙' },
      { name: '江苏南京', lng: 118.78, lat: 32.04, period: '宋代', reason: '南迁江左' },
      { name: '浙江杭州', lng: 120.16, lat: 30.27, period: '明清', reason: '江南聚居' },
    ],
    figures: [
      { name: '第五伦', dynasty: '汉', achievement: '司空，以清廉著称' },
      { name: '第五颖', dynasty: '汉', achievement: '官员' },
      { name: '第五元', dynasty: '汉', achievement: '学者' },
      { name: '第五规', dynasty: '唐', achievement: '官员' },
    ],
    totem: '第五以排行为氏，图腾象征汉皇族刘氏后裔。',
    history: '第五姓源于汉皇族，刘氏后裔第五房。陇西第五氏为郡望，汉代第五伦为司空。',
  },
  {
    surname: '言',

    pinyin: 'Yán',

    rank: 483,

    populationRank: 310,

    population: 13,
    origin: '源于姬姓，春秋吴国言偃之后，以字为氏。又源于官名。',
    originPlace: { name: '江苏苏州', lng: 120.62, lat: 31.32 },
    originPeriod: '春秋',
    junwang: [
      { name: '汝南郡', location: '河南汝南', lng: 114.36, lat: 33.00, tanghao: '汝南堂' },
      { name: '吴郡', location: '江苏苏州', lng: 120.62, lat: 31.32, tanghao: '吴郡堂' },
    ],
    migration: [
      { name: '江苏苏州', lng: 120.62, lat: 31.32, period: '春秋', reason: '言偃故里' },
      { name: '河南汝南', lng: 114.36, lat: 33.00, period: '汉代', reason: '汝南望族' },
      { name: '山东曲阜', lng: 116.98, lat: 35.58, period: '唐代', reason: '孔庙从祀' },
      { name: '浙江绍兴', lng: 120.58, lat: 30.03, period: '宋代', reason: '南迁江南' },
      { name: '上海', lng: 121.47, lat: 31.23, period: '明清', reason: '江南聚居' },
    ],
    figures: [
      { name: '言偃', dynasty: '春秋', achievement: '孔子弟子，子游，文学科' },
      { name: '言章', dynasty: '汉', achievement: '官员' },
      { name: '言极', dynasty: '唐', achievement: '官员' },
      { name: '言友信', dynasty: '明', achievement: '学者' },
    ],
    totem: '言字从口从辛，本义为说话。图腾以字为氏，象征吴国言偃后裔。',
    history: '言姓源于姬姓，春秋吴国言偃之后。汝南言氏为郡望，言偃为孔子弟子子游。',
  },
  {
    surname: '福',

    pinyin: 'Fú',

    rank: 484,

    populationRank: 285,

    population: 25,
    origin: '源于姬姓，春秋齐国福之后，以字为氏。又源于官名。又源于地名。',
    originPlace: { name: '山东淄博', lng: 118.05, lat: 36.78 },
    originPeriod: '春秋',
    junwang: [
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
      { name: '渤海郡', location: '河北沧州', lng: 116.84, lat: 38.31, tanghao: '渤海堂' },
    ],
    migration: [
      { name: '山东淄博', lng: 118.05, lat: 36.78, period: '春秋', reason: '齐福氏' },
      { name: '河北沧州', lng: 116.84, lat: 38.31, period: '汉代', reason: '渤海望族' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '晋代', reason: '河南福氏' },
      { name: '辽宁沈阳', lng: 123.43, lat: 41.80, period: '清代', reason: '满族改姓' },
      { name: '北京', lng: 116.40, lat: 39.90, period: '现代', reason: '京城聚居' },
    ],
    figures: [
      { name: '福寿', dynasty: '元', achievement: '将领' },
      { name: '福敏', dynasty: '清', achievement: '官员' },
      { name: '福康安', dynasty: '清', achievement: '大臣，大学士' },
      { name: '福增', dynasty: '清', achievement: '官员' },
    ],
    totem: '福字从示从畐，本义为福气。图腾以字为氏，象征齐国福氏后裔。',
    history: '福姓源于姬姓，春秋齐国福之后。河南福氏为郡望，清代福康安为大臣。',
  },
  {
    surname: '操',

    pinyin: 'Cāo',

    rank: 485,

    populationRank: 290,

    population: 22,
    origin: '源于姬姓，曹操后裔，以名为氏。又源于地名。又源于少数民族改姓。',
    originPlace: { name: '安徽亳州', lng: 115.78, lat: 33.85 },
    originPeriod: '三国',
    junwang: [
      { name: '谯郡', location: '安徽亳州', lng: 115.78, lat: 33.85, tanghao: '谯国堂' },
      { name: '沛国郡', location: '江苏徐州', lng: 117.18, lat: 34.26, tanghao: '沛国堂' },
    ],
    migration: [
      { name: '安徽亳州', lng: 115.78, lat: 33.85, period: '三国', reason: '曹魏故地' },
      { name: '江西鄱阳', lng: 116.70, lat: 29.00, period: '唐代', reason: '南迁聚居' },
      { name: '湖北蕲春', lng: 115.43, lat: 30.22, period: '宋代', reason: '蕲州任职' },
      { name: '安徽潜山', lng: 116.58, lat: 30.63, period: '明代', reason: '潜山屯田' },
      { name: '河南南阳', lng: 112.53, lat: 32.99, period: '现代', reason: '南阳聚居' },
    ],
    figures: [
      { name: '操天成', dynasty: '隋', achievement: '农民起义领袖' },
      { name: '操震', dynasty: '明', achievement: '学者' },
      { name: '操纵', dynasty: '明', achievement: '官员' },
      { name: '操守经', dynasty: '清', achievement: '文人' },
    ],
    totem: '操字从手喿声，本义为持握。图腾以字为氏，象征曹魏后裔以名为姓。',
    history: '操姓源于姬姓，曹操后裔。谯郡、沛国为郡望，隋代操天成为起义领袖。',
  },
  {
    surname: '种',

    pinyin: 'Chóng',

    rank: 486,

    populationRank: 295,

    population: 20,
    origin: '源于姬姓，周王室之后，以字为氏。又源于少数民族改姓。',
    originPlace: { name: '山东济南', lng: 117.00, lat: 36.65 },
    originPeriod: '春秋',
    junwang: [
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
      { name: '京兆郡', location: '陕西西安', lng: 108.95, lat: 34.27, tanghao: '京兆堂' },
    ],
    migration: [
      { name: '山东济南', lng: 117.00, lat: 36.65, period: '春秋', reason: '种氏发源' },
      { name: '陕西西安', lng: 108.95, lat: 34.27, period: '汉代', reason: '京兆望族' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '唐代', reason: '河南望族' },
      { name: '山西太原', lng: 112.55, lat: 37.87, period: '宋代', reason: '种世衡戍边' },
      { name: '山东枣庄', lng: 117.32, lat: 34.81, period: '现代', reason: '枣庄聚居' },
    ],
    figures: [
      { name: '种暠', dynasty: '东汉', achievement: '司隶校尉' },
      { name: '种放', dynasty: '宋', achievement: '隐士，教育家' },
      { name: '种世衡', dynasty: '宋', achievement: '将领，建清涧城' },
      { name: '种师道', dynasty: '宋', achievement: '将军，抗金名将' },
    ],
    totem: '种字从禾重声，本义为播种。图腾以字为氏，象征周王室后裔农耕传承。',
    history: '种姓源于姬姓，周王室之后。河南、京兆为郡望，宋代种世衡、种师道为名将。',
  },
  {
    surname: '过',

    pinyin: 'Guō',

    rank: 487,

    populationRank: 300,

    population: 18,
    origin: '源于姬姓，寒浞之子过封于过国，以国为氏。又源于地名。',
    originPlace: { name: '山东莱州', lng: 119.94, lat: 37.18 },
    originPeriod: '夏代',
    junwang: [
      { name: '高平郡', location: '山东微山', lng: 117.13, lat: 35.05, tanghao: '高平堂' },
      { name: '东海郡', location: '山东郯城', lng: 118.37, lat: 34.61, tanghao: '东海堂' },
    ],
    migration: [
      { name: '山东莱州', lng: 119.94, lat: 37.18, period: '夏代', reason: '过国故地' },
      { name: '江苏苏州', lng: 120.62, lat: 31.32, period: '宋代', reason: '南迁吴中' },
      { name: '浙江杭州', lng: 120.16, lat: 30.27, period: '元代', reason: '杭州定居' },
      { name: '安徽无为', lng: 117.90, lat: 31.30, period: '明代', reason: '无为屯田' },
      { name: '江西南昌', lng: 115.89, lat: 28.68, period: '现代', reason: '南昌聚居' },
    ],
    figures: [
      { name: '过源', dynasty: '宋', achievement: '学者' },
      { name: '过勗', dynasty: '宋', achievement: '官员' },
      { name: '过百龄', dynasty: '明', achievement: '围棋名手' },
      { name: '过铭旂', dynasty: '清', achievement: '文人' },
    ],
    totem: '过字从辶咼声，本义为经过。图腾以国为氏，象征过国后裔。',
    history: '过姓源于姬姓，夏代过国之后。高平、东海为郡望，明代过百龄为围棋名手。',
  },
  {
    surname: '苟',

    pinyin: 'Gǒu',

    rank: 488,

    populationRank: 305,

    population: 16,
    origin: '源于姬姓，春秋卫国苟氏。又源于地名。又源于少数民族改姓。',
    originPlace: { name: '河南洛阳', lng: 112.45, lat: 34.62 },
    originPeriod: '春秋',
    junwang: [
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
      { name: '河内郡', location: '河南沁阳', lng: 112.95, lat: 35.09, tanghao: '河内堂' },
    ],
    migration: [
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '春秋', reason: '卫国苟氏' },
      { name: '甘肃天水', lng: 105.72, lat: 34.58, period: '汉代', reason: '天水任职' },
      { name: '四川成都', lng: 104.07, lat: 30.67, period: '唐代', reason: '蜀中定居' },
      { name: '陕西西安', lng: 108.95, lat: 34.27, period: '明代', reason: '关中聚居' },
      { name: '甘肃兰州', lng: 103.83, lat: 36.06, period: '现代', reason: '兰州聚居' },
    ],
    figures: [
      { name: '苟变', dynasty: '战国', achievement: '卫国将领' },
      { name: '苟晞', dynasty: '西晋', achievement: '大将，青州刺史' },
      { name: '苟妃', dynasty: '十六国', achievement: '前赵皇后' },
      { name: '苟日新', dynasty: '宋', achievement: '学者' },
    ],
    totem: '苟字从艸句声，本义为草。图腾以字为氏，象征卫国苟氏后裔。',
    history: '苟姓源于姬姓，春秋卫国之后。河南、河内为郡望，西晋苟晞为名将。',
  },
  {
    surname: '冼',

    pinyin: 'Xiǎn',

    rank: 489,

    populationRank: 280,

    population: 30,
    origin: '源于壮族，岭南土著首领冼氏。又源于少数民族改姓。',
    originPlace: { name: '广东茂名', lng: 110.92, lat: 21.66 },
    originPeriod: '南北朝',
    junwang: [
      { name: '高凉郡', location: '广东阳江', lng: 111.98, lat: 21.86, tanghao: '高凉堂' },
      { name: '南海郡', location: '广东广州', lng: 113.27, lat: 23.13, tanghao: '南海堂' },
    ],
    migration: [
      { name: '广东茂名', lng: 110.92, lat: 21.66, period: '南北朝', reason: '冼氏发源' },
      { name: '广东阳江', lng: 111.98, lat: 21.86, period: '隋代', reason: '高凉定居' },
      { name: '海南海口', lng: 110.32, lat: 20.04, period: '唐代', reason: '海南开发' },
      { name: '广西南宁', lng: 108.37, lat: 22.82, period: '宋代', reason: '岭南迁徙' },
      { name: '广东广州', lng: 113.27, lat: 23.13, period: '现代', reason: '省城聚居' },
    ],
    figures: [
      { name: '冼夫人', dynasty: '南北朝', achievement: '岭南圣母，高凉太守夫人' },
      { name: '冼劲', dynasty: '东晋', achievement: '广州中兵参军' },
      { name: '冼光', dynasty: '明', achievement: '官员' },
      { name: '冼星海', dynasty: '现代', achievement: '作曲家，人民音乐家' },
    ],
    totem: '冼字从冫先声，本义为寒冷。图腾以字为氏，象征岭南冼氏后裔。',
    history: '冼姓源于岭南土著，南北朝冼夫人为岭南圣母。高凉、南海为郡望，现代冼星海为作曲家。',
  },
  {
    surname: '菅',

    pinyin: 'Jiān',

    rank: 490,

    populationRank: 310,

    population: 14,
    origin: '源于姬姓，春秋宋国菅氏。又源于地名。又源于官名。',
    originPlace: { name: '河南商丘', lng: 115.65, lat: 34.44 },
    originPeriod: '春秋',
    junwang: [
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
      { name: '济阳郡', location: '河南兰考', lng: 114.82, lat: 34.82, tanghao: '济阳堂' },
    ],
    migration: [
      { name: '河南商丘', lng: 115.65, lat: 34.44, period: '春秋', reason: '宋国菅氏' },
      { name: '河南兰考', lng: 114.82, lat: 34.82, period: '汉代', reason: '济阳望族' },
      { name: '山东菏泽', lng: 115.48, lat: 35.24, period: '唐代', reason: '菏泽定居' },
      { name: '河北邯郸', lng: 114.54, lat: 36.62, period: '明代', reason: '邯郸迁徙' },
      { name: '河南郑州', lng: 113.62, lat: 34.75, period: '现代', reason: '郑州聚居' },
    ],
    figures: [
      { name: '菅地', dynasty: '汉', achievement: '官员' },
      { name: '菅崇嗣', dynasty: '唐', achievement: '官员' },
      { name: '菅怀礼', dynasty: '明', achievement: '进士，官员' },
      { name: '菅时中', dynasty: '清', achievement: '文人' },
    ],
    totem: '菅字从艸官声，本义为茅草。图腾以字为氏，象征宋国菅氏后裔。',
    history: '菅姓源于姬姓，春秋宋国之后。河南、济阳为郡望，明代菅怀礼为进士。',
  },
  {
    surname: '仝',

    pinyin: 'Tóng',

    rank: 491,

    populationRank: 315,

    population: 12,
    origin: '源于回族，元代仝氏。又源于汉族改姓。又源于少数民族改姓。',
    originPlace: { name: '河南开封', lng: 114.34, lat: 34.79 },
    originPeriod: '元代',
    junwang: [
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
      { name: '渤海郡', location: '河北沧州', lng: 116.84, lat: 38.31, tanghao: '渤海堂' },
    ],
    migration: [
      { name: '河南开封', lng: 114.34, lat: 34.79, period: '元代', reason: '仝氏发源' },
      { name: '山东郓城', lng: 115.94, lat: 35.59, period: '明代', reason: '郓城定居' },
      { name: '江苏徐州', lng: 117.18, lat: 34.26, period: '清代', reason: '徐州迁徙' },
      { name: '安徽萧县', lng: 116.93, lat: 34.19, period: '清代', reason: '萧县聚居' },
      { name: '北京', lng: 116.40, lat: 39.90, period: '现代', reason: '京城聚居' },
    ],
    figures: [
      { name: '仝格', dynasty: '明', achievement: '官员' },
      { name: '仝正', dynasty: '明', achievement: '进士' },
      { name: '仝轨', dynasty: '清', achievement: '学者' },
      { name: '仝道云', dynasty: '清', achievement: '文人' },
    ],
    totem: '仝字从人工，本义为同。图腾以字为氏，象征元代仝氏后裔。',
    history: '仝姓源于回族，元代之后。河南、渤海为郡望，明代仝正为进士。',
  },
  {
    surname: '闪',

    pinyin: 'Shǎn',

    rank: 492,

    populationRank: 320,

    population: 10,
    origin: '源于回族，元代赛典赤·瞻思丁后裔，以名为氏。又源于汉族改姓。',
    originPlace: { name: '安徽合肥', lng: 117.23, lat: 31.82 },
    originPeriod: '元代',
    junwang: [
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
      { name: '京兆郡', location: '陕西西安', lng: 108.95, lat: 34.27, tanghao: '京兆堂' },
    ],
    migration: [
      { name: '安徽合肥', lng: 117.23, lat: 31.82, period: '元代', reason: '闪氏发源' },
      { name: '河南开封', lng: 114.34, lat: 34.79, period: '明代', reason: '开封定居' },
      { name: '山东济宁', lng: 116.59, lat: 35.41, period: '明代', reason: '济宁迁徙' },
      { name: '甘肃临夏', lng: 103.21, lat: 35.60, period: '清代', reason: '临夏聚居' },
      { name: '宁夏银川', lng: 106.23, lat: 38.49, period: '现代', reason: '银川聚居' },
    ],
    figures: [
      { name: '闪霭', dynasty: '明', achievement: '诗人' },
      { name: '闪仲侗', dynasty: '明', achievement: '进士，文学家' },
      { name: '闪应雷', dynasty: '明', achievement: '官员' },
      { name: '闪殿魁', dynasty: '清', achievement: '武将' },
    ],
    totem: '闪字从门人在门中，本义为人出门。图腾以字为氏，象征回族闪氏后裔。',
    history: '闪姓源于回族，元代赛典赤之后。河南、京兆为郡望，明代闪仲侗为文学家。',
  },
  {
    surname: '郇',

    pinyin: 'Huán',

    rank: 493,

    populationRank: 325,

    population: 9,
    origin: '源于姬姓，周文王之子封于郇国，以国为氏。又源于地名。',
    originPlace: { name: '山西临猗', lng: 110.77, lat: 35.14 },
    originPeriod: '西周',
    junwang: [
      { name: '平阳郡', location: '山西临汾', lng: 111.52, lat: 36.08, tanghao: '平阳堂' },
      { name: '河东郡', location: '山西永济', lng: 110.45, lat: 34.87, tanghao: '河东堂' },
    ],
    migration: [
      { name: '山西临猗', lng: 110.77, lat: 35.14, period: '西周', reason: '郇国故地' },
      { name: '山西永济', lng: 110.45, lat: 34.87, period: '春秋', reason: '河东望族' },
      { name: '陕西西安', lng: 108.95, lat: 34.27, period: '汉代', reason: '关中迁徙' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '唐代', reason: '洛阳定居' },
      { name: '山东济南', lng: 117.00, lat: 36.65, period: '现代', reason: '济南聚居' },
    ],
    figures: [
      { name: '郇谟', dynasty: '唐', achievement: '官员' },
      { name: '郇庚', dynasty: '宋', achievement: '学者' },
      { name: '郇环', dynasty: '明', achievement: '官员' },
      { name: '郇朝', dynasty: '清', achievement: '文人' },
    ],
    totem: '郇字从邑旬声，本义为周代封国。图腾以国为氏，象征周文王之后。',
    history: '郇姓源于姬姓，周文王之子封于郇国。平阳、河东为郡望，唐代郇谟为官员。',
  },
  {
    surname: '脱',

    pinyin: 'Tuō',

    rank: 494,

    populationRank: 330,

    population: 8,
    origin: '源于蒙古族，元代脱脱之后，以名为氏。又源于回族。又源于少数民族改姓。',
    originPlace: { name: '内蒙古呼和浩特', lng: 111.75, lat: 40.84 },
    originPeriod: '元代',
    junwang: [
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
      { name: '京兆郡', location: '陕西西安', lng: 108.95, lat: 34.27, tanghao: '京兆堂' },
    ],
    migration: [
      { name: '内蒙古呼和浩特', lng: 111.75, lat: 40.84, period: '元代', reason: '脱氏发源' },
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '明代', reason: '河南定居' },
      { name: '江苏南京', lng: 118.78, lat: 32.06, period: '明代', reason: '南京迁徙' },
      { name: '河北沧州', lng: 116.84, lat: 38.31, period: '清代', reason: '沧州聚居' },
      { name: '宁夏银川', lng: 106.23, lat: 38.49, period: '现代', reason: '银川聚居' },
    ],
    figures: [
      { name: '脱脱', dynasty: '元', achievement: '丞相，主编辽金宋三史' },
      { name: '脱因', dynasty: '元', achievement: '将领' },
      { name: '脱纲', dynasty: '明', achievement: '官员' },
      { name: '脱颖', dynasty: '清', achievement: '文人' },
    ],
    totem: '脱字从肉兑声，本义为去皮。图腾以名为氏，象征元代脱脱之后。',
    history: '脱姓源于蒙古族，元代脱脱之后。河南、京兆为郡望，元代脱脱为丞相。',
  },
  {
    surname: '邸',

    pinyin: 'Dǐ',

    rank: 495,

    populationRank: 335,

    population: 7,
    origin: '源于姬姓，西周邸国之裔，以国为氏。又源于官名。又源于少数民族改姓。',
    originPlace: { name: '河北保定', lng: 115.46, lat: 38.87 },
    originPeriod: '西周',
    junwang: [
      { name: '中山郡', location: '河北定州', lng: 115.00, lat: 38.51, tanghao: '中山堂' },
      { name: '河间郡', location: '河北河间', lng: 116.10, lat: 38.45, tanghao: '河间堂' },
    ],
    migration: [
      { name: '河北保定', lng: 115.46, lat: 38.87, period: '西周', reason: '邸氏发源' },
      { name: '河北定州', lng: 115.00, lat: 38.51, period: '汉代', reason: '中山望族' },
      { name: '河北河间', lng: 116.10, lat: 38.45, period: '晋代', reason: '河间迁徙' },
      { name: '辽宁沈阳', lng: 123.43, lat: 41.80, period: '清代', reason: '满族改姓' },
      { name: '北京', lng: 116.40, lat: 39.90, period: '现代', reason: '京城聚居' },
    ],
    figures: [
      { name: '邸珍', dynasty: '北魏', achievement: '官员' },
      { name: '邸顺', dynasty: '元', achievement: '将领' },
      { name: '邸鹏', dynasty: '明', achievement: '进士' },
      { name: '邸宪章', dynasty: '清', achievement: '官员' },
    ],
    totem: '邸字从邑氐声，本义为官舍。图腾以国为氏，象征西周邸国后裔。',
    history: '邸姓源于姬姓，西周邸国之后。中山、河间为郡望，明代邸鹏为进士。',
  },
  {
    surname: '郅',

    pinyin: 'Zhì',

    rank: 496,

    populationRank: 340,

    population: 6,
    origin: '源于姬姓，西周郅国之后，以国为氏。又源于地名。又源于少数民族改姓。',
    originPlace: { name: '山东济南', lng: 117.00, lat: 36.65 },
    originPeriod: '西周',
    junwang: [
      { name: '平阳郡', location: '山西临汾', lng: 111.52, lat: 36.08, tanghao: '平阳堂' },
      { name: '京兆郡', location: '陕西西安', lng: 108.95, lat: 34.27, tanghao: '京兆堂' },
    ],
    migration: [
      { name: '山东济南', lng: 117.00, lat: 36.65, period: '西周', reason: '郅国故地' },
      { name: '山西临汾', lng: 111.52, lat: 36.08, period: '春秋', reason: '平阳迁徙' },
      { name: '陕西西安', lng: 108.95, lat: 34.27, period: '汉代', reason: '京兆望族' },
      { name: '河南南阳', lng: 112.53, lat: 32.99, period: '唐代', reason: '南阳定居' },
      { name: '河北石家庄', lng: 114.51, lat: 38.04, period: '现代', reason: '石家庄聚居' },
    ],
    figures: [
      { name: '郅都', dynasty: '西汉', achievement: '酷吏，雁门太守' },
      { name: '郅恽', dynasty: '东汉', achievement: '学者，官员' },
      { name: '郅寿', dynasty: '东汉', achievement: '官员' },
      { name: '郅朗', dynasty: '唐', achievement: '文人' },
    ],
    totem: '郅字从邑至声，本义为周代封国。图腾以国为氏，象征西周郅国后裔。',
    history: '郅姓源于姬姓，西周郅国之后。平阳、京兆为郡望，西汉郅都为雁门太守。',
  },
  {
    surname: '仉',

    pinyin: 'Zhǎng',

    rank: 497,

    populationRank: 345,

    population: 5,
    origin: '源于姬姓，春秋鲁国仉氏。又源于官名。又源于少数民族改姓。',
    originPlace: { name: '山东济南', lng: 117.00, lat: 36.65 },
    originPeriod: '春秋',
    junwang: [
      { name: '鲁郡', location: '山东曲阜', lng: 116.98, lat: 35.58, tanghao: '鲁国堂' },
      { name: '琅琊郡', location: '山东临沂', lng: 118.35, lat: 35.05, tanghao: '琅琊堂' },
    ],
    migration: [
      { name: '山东济南', lng: 117.00, lat: 36.65, period: '春秋', reason: '鲁国仉氏' },
      { name: '山东曲阜', lng: 116.98, lat: 35.58, period: '战国', reason: '鲁郡望族' },
      { name: '山西太原', lng: 112.55, lat: 37.87, period: '唐代', reason: '太原迁徙' },
      { name: '河北沧州', lng: 116.84, lat: 38.31, period: '明代', reason: '沧州定居' },
      { name: '北京', lng: 116.40, lat: 39.90, period: '现代', reason: '京城聚居' },
    ],
    figures: [
      { name: '仉氏', dynasty: '战国', achievement: '孟母，孟子之母，教子有方' },
      { name: '仉晅', dynasty: '明', achievement: '官员' },
      { name: '仉嘉', dynasty: '明', achievement: '举人' },
      { name: '仉毓秀', dynasty: '清', achievement: '文人' },
    ],
    totem: '仉字从人几声，本义为官名。图腾以字为氏，象征鲁国仉氏后裔。',
    history: '仉姓源于姬姓，春秋鲁国之后。鲁郡、琅琊为郡望，战国孟母仉氏为贤母典范。',
  },
  {
    surname: '笪',

    pinyin: 'Dá',

    rank: 498,

    populationRank: 350,

    population: 4,
    origin: '源于回族，元代笪氏。又源于汉族改姓。又源于少数民族改姓。',
    originPlace: { name: '江苏南京', lng: 118.78, lat: 32.06 },
    originPeriod: '元代',
    junwang: [
      { name: '建安郡', location: '福建建瓯', lng: 118.32, lat: 27.05, tanghao: '建安堂' },
      { name: '江宁郡', location: '江苏南京', lng: 118.78, lat: 32.06, tanghao: '江宁堂' },
    ],
    migration: [
      { name: '江苏南京', lng: 118.78, lat: 32.06, period: '元代', reason: '笪氏发源' },
      { name: '福建建瓯', lng: 118.32, lat: 27.05, period: '明代', reason: '建安迁徙' },
      { name: '安徽当涂', lng: 118.49, lat: 31.55, period: '明代', reason: '当涂定居' },
      { name: '江苏苏州', lng: 120.62, lat: 31.32, period: '清代', reason: '苏州聚居' },
      { name: '上海', lng: 121.47, lat: 31.23, period: '现代', reason: '沪上聚居' },
    ],
    figures: [
      { name: '笪重光', dynasty: '清', achievement: '书画家，进士' },
      { name: '笪立枢', dynasty: '清', achievement: '官员' },
      { name: '笪懋', dynasty: '明', achievement: '文人' },
      { name: '笪志仁', dynasty: '清', achievement: '学者' },
    ],
    totem: '笪字从竹旦声，本义为竹编。图腾以字为氏，象征元代笪氏后裔。',
    history: '笪姓源于回族，元代之后。建安、江宁为郡望，清代笪重光为书画家。',
  },
  {
    surname: '葭',

    pinyin: 'Jiā',

    rank: 499,

    populationRank: 355,

    population: 3,
    origin: '源于地名，春秋秦国葭氏，以地为氏。又源于植物名。',
    originPlace: { name: '陕西佳县', lng: 110.48, lat: 38.03 },
    originPeriod: '春秋',
    junwang: [
      { name: '天水郡', location: '甘肃天水', lng: 105.72, lat: 34.58, tanghao: '天水堂' },
      { name: '京兆郡', location: '陕西西安', lng: 108.95, lat: 34.27, tanghao: '京兆堂' },
    ],
    migration: [
      { name: '陕西佳县', lng: 110.48, lat: 38.03, period: '春秋', reason: '葭氏发源' },
      { name: '甘肃天水', lng: 105.72, lat: 34.58, period: '汉代', reason: '天水望族' },
      { name: '陕西西安', lng: 108.95, lat: 34.27, period: '唐代', reason: '京兆迁徙' },
      { name: '山西运城', lng: 111.05, lat: 35.03, period: '明代', reason: '运城定居' },
      { name: '陕西榆林', lng: 109.73, lat: 38.28, period: '现代', reason: '榆林聚居' },
    ],
    figures: [
      { name: '葭众', dynasty: '汉', achievement: '官员' },
      { name: '葭明', dynasty: '唐', achievement: '文人' },
      { name: '葭辉', dynasty: '明', achievement: '学者' },
      { name: '葭蔚', dynasty: '清', achievement: '文人' },
    ],
    totem: '葭字从艸加声，本义为芦苇。图腾以地为氏，象征秦国葭氏后裔。',
    history: '葭姓源于地名，春秋秦国之后。天水、京兆为郡望，汉代葭众为官员。',
  },
  {
    surname: '邿',

    pinyin: 'Shī',

    rank: 500,

    populationRank: 360,

    population: 2,
    origin: '源于姬姓，春秋邿国之后，以国为氏。又源于地名。',
    originPlace: { name: '山东济宁', lng: 116.59, lat: 35.41 },
    originPeriod: '春秋',
    junwang: [
      { name: '鲁郡', location: '山东曲阜', lng: 116.98, lat: 35.58, tanghao: '鲁国堂' },
      { name: '高平郡', location: '山东微山', lng: 117.13, lat: 35.05, tanghao: '高平堂' },
    ],
    migration: [
      { name: '山东济宁', lng: 116.59, lat: 35.41, period: '春秋', reason: '邿国故地' },
      { name: '山东曲阜', lng: 116.98, lat: 35.58, period: '战国', reason: '鲁郡迁徙' },
      { name: '山东微山', lng: 117.13, lat: 35.05, period: '汉代', reason: '高平望族' },
      { name: '江苏徐州', lng: 117.18, lat: 34.26, period: '唐代', reason: '徐州定居' },
      { name: '山东济南', lng: 117.00, lat: 36.65, period: '现代', reason: '济南聚居' },
    ],
    figures: [
      { name: '邿子', dynasty: '春秋', achievement: '邿国国君' },
      { name: '邿生', dynasty: '汉', achievement: '学者' },
      { name: '邿安', dynasty: '唐', achievement: '官员' },
      { name: '邿文', dynasty: '明', achievement: '文人' },
    ],
    totem: '邿字从邑寺声，本义为周代封国。图腾以国为氏，象征春秋邿国后裔。',
    history: '邿姓源于姬姓，春秋邿国之后。鲁郡、高平为郡望，春秋邿子为国君。',
  },
  {
    surname: '郯',

    pinyin: 'Tán',

    rank: 501,

    populationRank: 365,

    population: 2,
    origin: '源于己姓，少昊后裔封于郯国，以国为氏。又源于地名。',
    originPlace: { name: '山东郯城', lng: 118.37, lat: 34.61 },
    originPeriod: '西周',
    junwang: [
      { name: '东海郡', location: '山东郯城', lng: 118.37, lat: 34.61, tanghao: '东海堂' },
      { name: '琅琊郡', location: '山东临沂', lng: 118.35, lat: 35.05, tanghao: '琅琊堂' },
    ],
    migration: [
      { name: '山东郯城', lng: 118.37, lat: 34.61, period: '西周', reason: '郯国故地' },
      { name: '山东临沂', lng: 118.35, lat: 35.05, period: '春秋', reason: '琅琊迁徙' },
      { name: '江苏徐州', lng: 117.18, lat: 34.26, period: '汉代', reason: '徐州定居' },
      { name: '河南开封', lng: 114.34, lat: 34.79, period: '唐代', reason: '汴梁迁徙' },
      { name: '山东济南', lng: 117.00, lat: 36.65, period: '现代', reason: '济南聚居' },
    ],
    figures: [
      { name: '郯子', dynasty: '春秋', achievement: '郯国国君，孔子问官于郯' },
      { name: '郯同', dynasty: '汉', achievement: '官员' },
      { name: '郯钦', dynasty: '唐', achievement: '文人' },
      { name: '郯俊', dynasty: '明', achievement: '官员' },
    ],
    totem: '郯字从邑炎声，本义为周代封国。图腾以国为氏，象征少昊后裔。',
    history: '郯姓源于己姓，少昊后裔封于郯国。东海、琅琊为郡望，春秋郯子为国君，孔子曾问官于郯。',
  },
  {
    surname: '邙',

    pinyin: 'Máng',

    rank: 502,

    populationRank: 370,

    population: 1,
    origin: '源于地名，北邙山之裔，以山为氏。又源于官名。又源于少数民族改姓。',
    originPlace: { name: '河南洛阳', lng: 112.45, lat: 34.62 },
    originPeriod: '汉代',
    junwang: [
      { name: '河南郡', location: '河南洛阳', lng: 112.45, lat: 34.62, tanghao: '河南堂' },
      { name: '河内郡', location: '河南沁阳', lng: 112.95, lat: 35.09, tanghao: '河内堂' },
    ],
    migration: [
      { name: '河南洛阳', lng: 112.45, lat: 34.62, period: '汉代', reason: '邙氏发源' },
      { name: '河南沁阳', lng: 112.95, lat: 35.09, period: '晋代', reason: '河内迁徙' },
      { name: '陕西西安', lng: 108.95, lat: 34.27, period: '唐代', reason: '京兆定居' },
      { name: '山西太原', lng: 112.55, lat: 37.87, period: '明代', reason: '太原迁徙' },
      { name: '河南郑州', lng: 113.62, lat: 34.75, period: '现代', reason: '郑州聚居' },
    ],
    figures: [
      { name: '邙泰', dynasty: '汉', achievement: '官员' },
      { name: '邙端', dynasty: '唐', achievement: '文人' },
      { name: '邙敬', dynasty: '明', achievement: '学者' },
      { name: '邙霖', dynasty: '清', achievement: '文人' },
    ],
    totem: '邙字从邑亡声，本义为山名。图腾以山为氏，象征北邙山之裔。',
    history: '邙姓源于地名，北邙山之裔。河南、河内为郡望，汉代邙泰为官员。',
  },
  {
    surname: '鄣',

    pinyin: 'Zhāng',

    rank: 503,

    populationRank: 375,

    population: 1,
    origin: '源于姜姓，齐太公之后封于鄣国，以国为氏。又源于地名。',
    originPlace: { name: '山东东平', lng: 116.46, lat: 35.91 },
    originPeriod: '西周',
    junwang: [
      { name: '齐郡', location: '山东淄博', lng: 118.05, lat: 36.78, tanghao: '齐郡堂' },
      { name: '东海郡', location: '山东郯城', lng: 118.37, lat: 34.61, tanghao: '东海堂' },
    ],
    migration: [
      { name: '山东东平', lng: 116.46, lat: 35.91, period: '西周', reason: '鄣国故地' },
      { name: '山东淄博', lng: 118.05, lat: 36.78, period: '春秋', reason: '齐郡望族' },
      { name: '江苏南京', lng: 118.78, lat: 32.06, period: '唐代', reason: '金陵迁徙' },
      { name: '浙江杭州', lng: 120.16, lat: 30.27, period: '宋代', reason: '临安定居' },
      { name: '安徽合肥', lng: 117.23, lat: 31.82, period: '现代', reason: '合肥聚居' },
    ],
    figures: [
      { name: '鄣桓公', dynasty: '春秋', achievement: '鄣国国君' },
      { name: '鄣穆', dynasty: '汉', achievement: '官员' },
      { name: '鄣琦', dynasty: '唐', achievement: '文人' },
      { name: '鄣鉴', dynasty: '明', achievement: '学者' },
    ],
    totem: '鄣字从邑章声，本义为周代封国。图腾以国为氏，象征齐太公之后。',
    history: '鄣姓源于姜姓，齐太公之后封于鄣国。齐郡、东海为郡望，春秋鄣桓公为国君。',
  },
  {
    surname: '郚',

    pinyin: 'Wú',

    rank: 504,

    populationRank: 380,

    population: 1,
    origin: '源于姜姓，春秋齐国郚氏，以地为氏。又源于地名。又源于少数民族改姓。',
    originPlace: { name: '山东安丘', lng: 119.21, lat: 36.42 },
    originPeriod: '春秋',
    junwang: [
      { name: '齐郡', location: '山东淄博', lng: 118.05, lat: 36.78, tanghao: '齐郡堂' },
      { name: '北海郡', location: '山东潍坊', lng: 119.16, lat: 36.70, tanghao: '北海堂' },
    ],
    migration: [
      { name: '山东安丘', lng: 119.21, lat: 36.42, period: '春秋', reason: '郚氏发源' },
      { name: '山东淄博', lng: 118.05, lat: 36.78, period: '战国', reason: '齐郡望族' },
      { name: '山东潍坊', lng: 119.16, lat: 36.70, period: '汉代', reason: '北海迁徙' },
      { name: '辽宁大连', lng: 121.62, lat: 38.91, period: '清代', reason: '辽东迁徙' },
      { name: '山东青岛', lng: 120.38, lat: 36.07, period: '现代', reason: '青岛聚居' },
    ],
    figures: [
      { name: '郚忌', dynasty: '春秋', achievement: '齐国大夫' },
      { name: '郚广', dynasty: '汉', achievement: '官员' },
      { name: '郚肱', dynasty: '唐', achievement: '文人' },
      { name: '郚慎', dynasty: '明', achievement: '学者' },
    ],
    totem: '郚字从邑吾声，本义为地名。图腾以地为氏，象征齐国郚氏后裔。',
    history: '郚姓源于姜姓，春秋齐国之后。齐郡、北海为郡望，春秋郚忌为齐国大夫。',
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

/** 根据《百家姓》排名查找姓氏 */
export function findSurnameByRank(rank: number): Surname | undefined {
  return SURNAMES.find(s => s.rank === rank);
}

/** 获取上一个与下一个姓氏排名（用于详情页导航） */
export function getAdjacentSurnames(rank: number): { prev?: Surname; next?: Surname } {
  const sorted = [...SURNAMES].sort((a, b) => a.rank - b.rank);
  const idx = sorted.findIndex(s => s.rank === rank);
  if (idx === -1) return {};
  return {
    prev: idx > 0 ? sorted[idx - 1] : undefined,
    next: idx < sorted.length - 1 ? sorted[idx + 1] : undefined,
  };
}
