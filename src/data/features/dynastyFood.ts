/**
 * 历代饮食食谱与文化数据
 */

export interface DynastyFood {
  dynastyId: string;
  dynastyName: string;
  icon: string;
  description: string;
  representativeDish: FoodItem;
  dishes: FoodItem[];
}

export interface FoodItem {
  name: string;
  ingredients: string[];
  description: string;
  historicalNote: string;
  icon: string;
}

export const DYNASTY_FOODS: DynastyFood[] = [
  {
    dynastyId: 'zhou',
    dynastyName: '先秦（周）',
    icon: '🍖',
    description: '先秦饮食以黍稷为主食，鼎簋制度确立饮食等级，《周礼》规定天子九鼎、诸侯七鼎，"八珍"为宫廷最高规格',
    representativeDish: {
      name: '周八珍',
      ingredients: ['牛肉', '羊肉', '稻米', '黍', '油脂', '酒'],
      description: '周天子宫廷八道珍馐，中国最早的宫廷菜系，代表先秦烹饪技艺巅峰',
      historicalNote: '《周礼·天官》记载"珍用八物"：淳熬（肉酱盖饭）、淳母（黍米肉酱饭）、炮豚（烤乳猪）、炮牂（烤羊）、捣珍（捶肉松）、渍（酒浸牛肉）、熬（牛肉干）、肝膋（烤狗肝）。这是中国最早的菜谱体系。',
      icon: '🍖',
    },
    dishes: [
      { name: '淳熬', ingredients: ['稻米', '肉酱', '油脂'], description: '肉酱盖浇饭，八珍之首', historicalNote: '《礼记·内则》记载的周天子主食，被视为"盖浇饭"鼻祖', icon: '🍚' },
      { name: '炮豚', ingredients: ['乳猪', '枣', '芦苇'], description: '烤乳猪，先秦宫廷大菜', historicalNote: '炮豚工艺复杂：先裹泥烤、后炸、再炖，三道工序', icon: '🐷' },
      { name: '屑食', ingredients: ['黍', '稷', '肉酱'], description: '主食配肉酱，贵族日常饮食', historicalNote: '"酱"在周代是身份象征，天子可有百二十酱', icon: '🥣' },
      { name: '郁鬯', ingredients: ['黑黍', '郁金草', '酒曲'], description: '祭祀用香酒', historicalNote: '周代祭祀最高规格用酒，灌地降神之礼', icon: '🍶' },
    ],
  },
  {
    dynastyId: 'qin',
    dynastyName: '秦朝',
    icon: '🍚',
    description: '秦朝统一度量衡也规范了饮食规格，以粟麦为主食，肉食为贵族特权，平民以豆藿菜羹为常食',
    representativeDish: {
      name: '秦宫炙肉',
      ingredients: ['牛肉', '羊肉', '盐', '椒'],
      description: '秦宫烧烤肉食，配盐椒蘸料，体现秦人尚武豪迈之风',
      historicalNote: '秦人起于西陲，保留大量戎狄游牧饮食习惯，尚肉食。《史记》载秦宫廷宴饮以炙肉为主，统一后融合六国饮食。秦简《日书》记载了严格的饮食等级规制。',
      icon: '🍖',
    },
    dishes: [
      { name: '炙肉', ingredients: ['牛羊肉', '盐', '花椒'], description: '烤肉串，秦人传统肉食', historicalNote: '秦人源于游牧传统，炙肉为宫廷日常', icon: '🍖' },
      { name: '粟米饭', ingredients: ['粟'], description: '小米饭，秦人主食', historicalNote: '秦地盛产粟，云梦秦简载有粟的仓储制度', icon: '🍚' },
      { name: '豆藿羹', ingredients: ['大豆', '豆叶', '盐'], description: '平民常食的豆叶羹', historicalNote: '秦代平民以豆藿为食，"藿食者"指代平民', icon: '🥬' },
      { name: '鱼脍', ingredients: ['鲤鱼肉', '醋', '芥'], description: '生鱼片，秦宫宴客菜', historicalNote: '秦地近渭水，鱼脍为宫廷名菜，"脍炙人口"之源', icon: '🐟' },
    ],
  },
  {
    dynastyId: 'han',
    dynastyName: '汉朝',
    icon: '🫘',
    description: '汉代饮食以谷物为主，面食（饼）开始普及，豆豉酱醋调味体系确立',
    representativeDish: {
      name: '胡饼',
      ingredients: ['面粉', '芝麻', '羊肉'],
      description: '西域传入的烤面饼，夹肉食用，类似现代的肉夹馍',
      historicalNote: '《释名》载："胡饼，作之大漫沱也，亦言以胡麻著上也"。汉代丝绸之路带来了小麦加工技术革命。',
      icon: '🥖',
    },
    dishes: [
      { name: '胡饼', ingredients: ['面粉', '芝麻', '羊肉'], description: '西域烤面饼，夹肉食用', historicalNote: '丝绸之路带来的面食革命', icon: '🥖' },
      { name: '汤饼', ingredients: ['面粉', '水'], description: '面片汤，中国最早的"面条"', historicalNote: '《齐民要术》记载了汤饼制作方法', icon: '🍜' },
      { name: '羹', ingredients: ['羊肉', '羹汤', '豆豉'], description: '浓汤配豆豉调味', historicalNote: '豆豉是汉代核心调味品', icon: '🍲' },
      { name: '菹', ingredients: ['蔬菜', '盐', '醋'], description: '腌菜，最早的"泡菜"', historicalNote: '汉代已广泛使用醋腌制蔬菜', icon: '🥬' },
    ],
  },
  {
    dynastyId: 'nan-bei-chao',
    dynastyName: '南北朝',
    icon: '🥘',
    description: '南北朝饮食胡汉交融，北方胡食盛行酪浆羊肉，南方保留稻鱼传统，《齐民要术》成书系统总结烹饪技法',
    representativeDish: {
      name: '胡饼羊肉',
      ingredients: ['面粉', '芝麻', '羊肉', '酪浆'],
      description: '北方胡食代表，烤饼夹羊肉佐以发酵酪浆，胡汉饮食融合的典型',
      historicalNote: '《齐民要术》详细记载了胡饼做法和酪浆制作工艺。北魏贾思勰系统总结了北方农牧交汇的饮食体系。',
      icon: '🍖',
    },
    dishes: [
      { name: '胡饼羊肉', ingredients: ['面粉', '羊肉', '酪浆'], description: '胡汉融合烤饼夹肉', historicalNote: '《齐民要术》记载的胡饼工艺', icon: '🍖' },
      { name: '酪浆', ingredients: ['牛羊乳', '发酵'], description: '北方游牧民族发酵乳制品', historicalNote: '北朝酪浆盛行，南朝人初饮不惯', icon: '🥛' },
      { name: '脍鱼', ingredients: ['鲤鱼肉', '醋', '姜'], description: '南方生鱼片，切成薄片蘸食', historicalNote: '南朝文人雅集必备，"脍炙人口"出处', icon: '🐟' },
      { name: '菜羹', ingredients: ['时蔬', '稻米', '盐'], description: '南方稻作区蔬菜浓羹', historicalNote: '南朝寺院素斋发展出的清淡饮食', icon: '🥬' },
    ],
  },
  {
    dynastyId: 'tang',
    dynastyName: '唐朝',
    icon: '🍵',
    description: '唐代饮食极其丰富多元，胡食大量涌入，茶文化兴起，宴席文化鼎盛',
    representativeDish: {
      name: '长安胡食',
      ingredients: ['烤羊肉', '胡饼', '葡萄酒', '奶酪'],
      description: '融合波斯和中亚饮食习惯的异域盛宴',
      historicalNote: '长安西市汇聚各国商人，胡食餐厅遍布。唐代人吃奶酪（"酥"）、喝葡萄酒，饮食国际化程度远超想象。',
      icon: '🍖',
    },
    dishes: [
      { name: '长安胡食', ingredients: ['烤羊肉', '胡饼', '葡萄酒'], description: '异域盛宴', historicalNote: '长安西市的国际化饮食', icon: '🍖' },
      { name: '茶汤', ingredients: ['茶叶', '盐', '姜', '葱'], description: '加盐姜葱煮茶，唐代主流饮法', historicalNote: '陆羽《茶经》前，唐人喝茶加盐姜葱', icon: '🍵' },
      { name: '毕罗', ingredients: ['面粉', '馅料'], description: '唐代馅饼，类似现代馅饼', historicalNote: '韩愈诗"毕罗馅如雪"，唐代特色面食', icon: '🥧' },
      { name: '酥酪', ingredients: ['牛奶', '发酵'], description: '唐代奶酪/酸奶', historicalNote: '唐代已有成熟的奶制品加工技术', icon: '🧈' },
    ],
  },
  {
    dynastyId: 'wu-dai-shi-guo',
    dynastyName: '五代十国',
    icon: '🦆',
    description: '五代十国战乱频繁但南方经济繁荣，南唐宫廷菜精致典雅，茶文化兴起，南方饮食体系持续发展',
    representativeDish: {
      name: '金陵鸭馔',
      ingredients: ['鸭肉', '姜', '酱', '酒'],
      description: '南唐金陵宫廷名菜，以鸭为主料精心烹制，开南京鸭肴先河',
      historicalNote: '南唐宫廷饮食精致，金陵（南京）鸭馔闻名。后蜀花蕊夫人亦有饮食记载。五代时期南方十国偏安一隅，饮食文化反而繁荣。',
      icon: '🦆',
    },
    dishes: [
      { name: '金陵鸭馔', ingredients: ['鸭肉', '姜', '酱'], description: '南唐宫廷鸭肴', historicalNote: '南京食鸭传统可追溯至南唐宫廷', icon: '🦆' },
      { name: '蟹黄汤包', ingredients: ['蟹黄', '面粉', '猪肉'], description: '江南精致面点', historicalNote: '五代南方市镇繁荣催生的精细面点', icon: '🥟' },
      { name: '茶宴', ingredients: ['茶叶', '糕点', '果品'], description: '南唐文人茶会', historicalNote: '南唐茶文化兴盛，开宋代点茶先河', icon: '🍵' },
      { name: '果脯', ingredients: ['鲜果', '蜂蜜', '糖'], description: '蜜饯果脯', historicalNote: '南方果品丰富，蜜饯工艺成熟', icon: '🍇' },
    ],
  },
  {
    dynastyId: 'song',
    dynastyName: '宋朝',
    icon: '🥢',
    description: '宋代是中国饮食文化的巅峰——炒菜普及、外卖出现、夜市繁华，现代中式烹饪体系基本成形',
    representativeDish: {
      name: '东坡肉',
      ingredients: ['猪肉', '酒', '酱油', '糖'],
      description: '苏东坡发明的红烧肉，慢火焖炖，肥而不腻',
      historicalNote: '苏东坡被贬黄州时创制，写《猪肉颂》："黄州好猪肉，价贱如泥土。富者不肯吃，贫者不解煮。慢着火，少着水，火候足时它自美。"',
      icon: '🥩',
    },
    dishes: [
      { name: '东坡肉', ingredients: ['猪肉', '酒', '酱油', '糖'], description: '苏东坡红烧肉', historicalNote: '苏东坡被贬黄州创制', icon: '🥩' },
      { name: '宋式炒菜', ingredients: ['蔬菜', '油', '调料'], description: '铁锅炒菜在宋代普及', historicalNote: '宋代铁锅普及使炒菜成为主流烹饪方式', icon: '🍳' },
      { name: '灌肺', ingredients: ['猪肺', '面糊'], description: '宋代特色小吃', historicalNote: '夜市摊贩特色食品', icon: '🫔' },
      { name: '冰酪', ingredients: ['牛奶', '冰', '糖'], description: '宋代冰激凌！', historicalNote: '宋代已有冰激凌（冰酪），马可·波罗将技术带回欧洲', icon: '🍦' },
    ],
  },
  {
    dynastyId: 'yuan',
    dynastyName: '元朝',
    icon: '🐑',
    description: '元朝饮食呈现强烈的草原游牧色彩，蒙古贵族以牛羊肉、奶食为主，同时吸收汉地烹饪技法，形成"回回食品"与汉食并存的格局',
    representativeDish: {
      name: '涮羊肉',
      ingredients: ['羊肉', '铜锅', '麻酱', '韭菜花', '腐乳'],
      description: '传说忽必烈南征时创制的快餐羊肉，薄切肉片入沸汤即食',
      historicalNote: '相传忽必烈行军途中急欲食羊，厨子匆忙切薄片入沸水，忽必烈食后赞好，赐名"涮羊肉"。元代《饮膳正要》记载了宫廷御膳，蒙古八珍（醍醐、麆沆、野驼蹄、鹿唇、驼乳、天鹅炙、紫玉浆、玄玉浆）为最高规格。',
      icon: '🍲',
    },
    dishes: [
      { name: '涮羊肉', ingredients: ['羊肉', '麻酱', '韭菜花'], description: '铜锅涮肉，蒙古快餐', historicalNote: '传说忽必烈行军创制，元代宫廷御膳', icon: '🍲' },
      { name: '马奶酒', ingredients: ['马乳', '发酵'], description: '蒙古传统发酵酒', historicalNote: '元朝国宴必备，忽必烈赐马奶酒为最高礼遇', icon: '🍶' },
      { name: '烤全羊', ingredients: ['整羊', '盐', '香料'], description: '蒙古贵族宴客大菜', historicalNote: '蒙古宫廷"诈马宴"的压轴菜，烤整羊分食', icon: '🐑' },
      { name: '回回饮食', ingredients: ['面粉', '羊肉', '香料'], description: '中亚伊斯兰风味菜肴', historicalNote: '元朝色目人引入中亚烹饪，"回回豆子"（鹰嘴豆）等传入', icon: '🍛' },
    ],
  },
  {
    dynastyId: 'ming',
    dynastyName: '明朝',
    icon: '🫕',
    description: '明代饮食更加精致，辣椒传入中国（晚期），红薯玉米改变了主食结构',
    representativeDish: {
      name: '北京涮羊肉',
      ingredients: ['羊肉', '麻酱', '韭菜花', '腐乳'],
      description: '铜锅涮肉，北京经典美食',
      historicalNote: '明代北京宫廷饮食传统，后成为民间美食',
      icon: '🫕',
    },
    dishes: [
      { name: '涮羊肉', ingredients: ['羊肉', '麻酱'], description: '铜锅涮肉', historicalNote: '明代宫廷饮食传统', icon: '🫕' },
      { name: '番薯', ingredients: ['红薯'], description: '从美洲传入的救命粮', historicalNote: '明末红薯传入缓解了饥荒问题', icon: '🍠' },
      { name: '玉米', ingredients: ['玉米'], description: '从美洲传入的新谷物', historicalNote: '明代传入改变了北方主食结构', icon: '🌽' },
      { name: '辣椒', ingredients: ['辣椒'], description: '明末传入，彻底改变了川湘菜', historicalNote: '辣椒明代末年才传入中国，但迅速改变了南方饮食', icon: '🌶️' },
    ],
  },
  {
    dynastyId: 'qing',
    dynastyName: '清朝',
    icon: '🥘',
    description: '清代饮食融合南北，满汉全席登峰造极，八大菜系成型',
    representativeDish: {
      name: '满汉全席',
      ingredients: ['南北108道菜'],
      description: '108道菜的大宴，融合满族和汉族饮食精华',
      historicalNote: '清宫廷最高规格宴席，南菜54道北菜54道，代表了中国饮食文化的极致',
      icon: '🥘',
    },
    dishes: [
      { name: '满汉全席', ingredients: ['108道菜'], description: '宫廷大宴', historicalNote: '清宫廷最高规格宴席', icon: '🥘' },
      { name: '火锅', ingredients: ['铜锅', '肉片', '蔬菜'], description: '清代火锅文化成熟', historicalNote: '清代火锅从宫廷走向民间', icon: '🫕' },
      { name: '八大菜系', ingredients: ['各省代表菜'], description: '川鲁粤苏闽浙湘徽', historicalNote: '清代八大菜系正式成型', icon: '🍽️' },
      { name: '糕点', ingredients: ['面粉', '糖', '油'], description: '清代糕点极其精致', historicalNote: '宫廷糕点技术流传民间', icon: '🧁' },
    ],
  },
  {
    dynastyId: 'minguo',
    dynastyName: '民国',
    icon: '🥟',
    description: '民国饮食呈现中西交汇、南北融合的格局，上海成为东方美食之都，八大菜系定型，西餐与海派菜肴并盛，现代餐饮业兴起',
    representativeDish: {
      name: '海派西餐',
      ingredients: ['牛排', '土豆', '罗宋汤', '咖啡', '面包'],
      description: '上海租界中西融合的改良西餐，保留西式形式而融入中式口味',
      historicalNote: '民国上海霞飞路（今淮海中路）西餐馆林立，俄式罗宋汤、法式牛排经中式改良后成为"海派西餐"。红房子西菜馆、德大西菜社等老字号至今仍在经营，是中西饮食文化交流的活化石。',
      icon: '🍽️',
    },
    dishes: [
      { name: '大饼油条', ingredients: ['面粉', '油', '盐', '酵母'], description: '民国上海早点标配', historicalNote: '上海弄堂早餐文化的代表，配豆浆豆腐脑', icon: '🥖' },
      { name: '生煎馒头', ingredients: ['面粉', '猪肉', '芝麻', '葱花'], description: '上海特色水煎包', historicalNote: '民国上海弄堂小食，"沈大成"等老字号成名于此时', icon: '🥟' },
      { name: '本帮菜', ingredients: ['河鲜', '猪肉', '酱油', '糖'], description: '上海本帮菜系定型', historicalNote: '民国上海本帮菜（浓油赤酱）成型，老正兴、德兴馆闻名', icon: '🍖' },
      { name: '广式早茶', ingredients: ['虾饺', '烧卖', '肠粉', '茶'], description: '一盅两件粤式茶点', historicalNote: '民国广州茶楼文化鼎盛，北上影响上海香港', icon: '🍵' },
    ],
  },
];
