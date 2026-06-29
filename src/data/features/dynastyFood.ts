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
];
