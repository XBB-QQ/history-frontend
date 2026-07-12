/**
 * 历代居住文化与建筑数据
 * 覆盖都城规划、宫殿建筑、民居形制、园林艺术、村落聚落
 */

export type DwellingCategory = 'capital' | 'palace' | 'residence' | 'garden' | 'village';

export interface DwellingEntry {
  id: string;
  name: string;
  category: DwellingCategory;
  dynasty: string;
  location: string;
  description: string;
  features: string[];
  historicalNote: string;
}

export const DWELLING_ENTRIES: DwellingEntry[] = [
  {
    id: 'changan-han',
    name: '汉长安城',
    category: 'capital',
    dynasty: '西汉',
    location: '陕西西安',
    description: '西汉都城，矩形布局，周回六十五里，人口约二十四万',
    features: ['矩形城墙', '十二城门', '八街九陌', '长乐宫、未央宫居城南', '闾里一百六十'],
    historicalNote: '汉高祖刘邦定都长安，萧何主持营建。城墙周长25.7公里，是当时世界最大城市之一',
  },
  {
    id: 'changan-tang',
    name: '唐长安城',
    category: 'capital',
    dynasty: '唐',
    location: '陕西西安',
    description: '隋唐都城，棋盘格里坊制，面积84平方公里，人口逾百万',
    features: ['棋盘格布局', '南北十一街、东西十四街', '108坊', '东西两市', '朱雀大街宽155米'],
    historicalNote: '隋大兴城为基础，唐改名长安城。是古代世界最大城市，日本平城京、平安京仿此布局',
  },
  {
    id: 'bianjing',
    name: '东京汴梁',
    category: 'capital',
    dynasty: '北宋',
    location: '河南开封',
    description: '北宋都城，打破坊市界限，沿街开店，夜市繁华',
    features: ['打破坊墙', '沿街开店', '夜市晓市', '汴河穿城', '人口逾百万'],
    historicalNote: '《清明上河图》描绘了汴京的繁华景象。坊市制度的打破是中国城市发展史的转折点',
  },
  {
    id: 'beijing-ming',
    name: '明清北京城',
    category: 'capital',
    dynasty: '明/清',
    location: '北京',
    description: '凸字形城垣，中轴线对称，紫禁城居中，四重城垣',
    features: ['中轴线7.8公里', '四重城垣（宫/皇/内/外）', '左祖右社', '前朝后市', '九经九纬'],
    historicalNote: '明永乐帝迁都北京后营建，延续元大都格局。中轴线建筑群是世界城市规划史上的杰作',
  },
  {
    id: 'epang-palace',
    name: '阿房宫',
    category: 'palace',
    dynasty: '秦',
    location: '陕西西安',
    description: '秦代朝宫前殿，东西五百步，南北五十丈',
    features: ['东西690米', '南北115米', '台上可坐万人', '前殿东西五百步'],
    historicalNote: '《史记》载阿房宫未建成而秦亡。2004年考古证实前殿夯土台基确实存在，但上部建筑未完工',
  },
  {
    id: 'weiyang-palace',
    name: '未央宫',
    category: 'palace',
    dynasty: '西汉',
    location: '陕西西安',
    description: '西汉正衙，周回二十八里，占长安城面积七分之一',
    features: ['前殿居中', '椒房殿为后妃居所', '天禄阁、石渠阁藏书', '沧池园林'],
    historicalNote: '萧何监修，刘邦始居。未央宫使用时间长达1041年，是中国历史上使用最久的宫殿',
  },
  {
    id: 'daming-palace',
    name: '大明宫',
    category: 'palace',
    dynasty: '唐',
    location: '陕西西安',
    description: '唐帝国的政治中心，面积3.2平方公里，为紫禁城4.5倍',
    features: ['含元殿为正衙', '麟德殿为宴会殿', '三清殿为道观', '太液池园林'],
    historicalNote: '唐太宗为太上皇李渊营建。含元殿气势恢宏，是唐代最重要的宫殿建筑群',
  },
  {
    id: 'forbidden-city',
    name: '紫禁城',
    category: 'palace',
    dynasty: '明/清',
    location: '北京',
    description: '明清两代皇宫，面积72万平方米，房屋8700余间',
    features: ['南北961米、东西753米', '前三殿（太和/中和/保和）', '后三宫（乾清/交泰/坤宁）', '周回10米高城墙'],
    historicalNote: '明永乐十八年建成，是世界上现存规模最大、保存最完整的木质结构古建筑群',
  },
  {
    id: 'siheyuan',
    name: '北京四合院',
    category: 'residence',
    dynasty: '明/清',
    location: '北京',
    description: '北方民居代表，四面建房围合院落，中轴对称',
    features: ['正房坐北朝南', '东西厢房', '倒座房南向', '影壁照墙', '垂花门内院'],
    historicalNote: '四合院布局体现尊卑有序：正房长辈居住，厢房子女居住，倒座房为客房或仆役居所',
  },
  {
    id: 'yaodong',
    name: '陕北窑洞',
    category: 'residence',
    dynasty: '自古延续',
    location: '陕北/陇东',
    description: '黄土高原民居，利用黄土特性挖洞而居，冬暖夏凉',
    features: ['靠崖式（沿崖挖）', '下沉式（地坑院）', '独立式（砖砌箍窑）', '拱形穹顶'],
    historicalNote: '窑洞是黄土高原地区延续数千年的民居形式，因地制宜利用黄土的保温特性',
  },
  {
    id: 'tulou',
    name: '福建土楼',
    category: 'residence',
    dynasty: '宋至清',
    location: '福建龙岩/漳州',
    description: '客家聚族而居的圆形或方形夯土建筑，可住数十户人家',
    features: ['夯土外墙厚1-2米', '圆形/方形/五凤形', '外环住房内环公共', '中央祖堂', '可住600人'],
    historicalNote: '2008年列入世界遗产。土楼兼具居住和防御功能，体现客家人聚族而居的传统',
  },
  {
    id: 'diaojiaolou',
    name: '吊脚楼',
    category: 'residence',
    dynasty: '自古延续',
    location: '湘西/黔东南/桂北',
    description: '苗族、土家族等少数民族民居，半边着陆半边悬空',
    features: ['依山而建', '下层架空养畜', '上层住人', '木质穿斗结构', '飞檐翘角'],
    historicalNote: '吊脚楼适应山地地形，防潮避虫，是西南少数民族最具特色的民居形式',
  },
  {
    id: 'huizhou-residence',
    name: '徽派民居',
    category: 'residence',
    dynasty: '明/清',
    location: '安徽徽州',
    description: '粉墙黛瓦马头墙，天井采光通风，雕梁画栋',
    features: ['马头墙（封火墙）', '天井（四水归堂）', '木雕砖雕石雕', '粉墙黛瓦'],
    historicalNote: '徽商致富后回乡营建大宅。天井"四水归堂"寓意财源不外流，马头墙兼具防火和美观功能',
  },
  {
    id: 'jiangnan-residence',
    name: '江南水乡民居',
    category: 'residence',
    dynasty: '明/清',
    location: '苏南/浙北',
    description: '依水而建，前街后河，白墙灰瓦，朴素雅致',
    features: ['前街后河', '水埠头', '骑楼廊棚', '粉墙黛瓦', '小桥流水'],
    historicalNote: '周庄、同里、乌镇等水乡古镇保存完好。依水而建的布局便于水路交通和生活取水',
  },
  {
    id: 'summer-palace',
    name: '颐和园',
    category: 'garden',
    dynasty: '清',
    location: '北京',
    description: '清代皇家园林，占地290公顷，以昆明湖、万寿山为基础',
    features: ['万寿山前山建筑群', '昆明湖占全园3/4', '长廊728米', '借景玉泉山'],
    historicalNote: '乾隆时清漪园基础上改建。是中国现存最大的皇家园林，集传统造园艺术之大成',
  },
  {
    id: 'yuanmingyuan',
    name: '圆明园',
    category: 'garden',
    dynasty: '清',
    location: '北京',
    description: '清代皇家园林，"万园之园"，1860年被英法联军焚毁',
    features: ['三园（圆明/长春/万春）', '面积350公顷', '百余处景观', '西洋楼景区'],
    historicalNote: '历经康熙、雍正、乾隆三朝营建。1860年第二次鸦片战争中被英法联军劫掠焚毁',
  },
  {
    id: 'suzhou-garden',
    name: '苏州私家园林',
    category: 'garden',
    dynasty: '宋至清',
    location: '江苏苏州',
    description: '文人写意山水园林，咫尺之内再造乾坤',
    features: ['叠石理水', '花木配置', '楹联匾额', '借景框景', '曲径通幽'],
    historicalNote: '拙政园、留园、网师园、狮子林为苏州四大名园。1997年列入世界遗产',
  },
  {
    id: 'hongcun',
    name: '宏村',
    category: 'village',
    dynasty: '明/清',
    location: '安徽黟县',
    description: '皖南古村落，牛形水系布局，"画里的乡村"',
    features: ['牛形村落布局', '水圳穿户', '月沼南湖', '承志堂雕饰'],
    historicalNote: '始建于南宋，现存明清建筑103栋。2000年列入世界遗产，是徽州村落的典范',
  },
];

/** 按类别分组 */
export const DWELLINGS_BY_CATEGORY: Record<DwellingCategory, DwellingEntry[]> = {
  capital: DWELLING_ENTRIES.filter(d => d.category === 'capital'),
  palace: DWELLING_ENTRIES.filter(d => d.category === 'palace'),
  residence: DWELLING_ENTRIES.filter(d => d.category === 'residence'),
  garden: DWELLING_ENTRIES.filter(d => d.category === 'garden'),
  village: DWELLING_ENTRIES.filter(d => d.category === 'village'),
};

/** 类别中文标签 */
export const DWELLING_CATEGORY_LABELS: Record<DwellingCategory, string> = {
  capital: '都城规划',
  palace: '宫殿建筑',
  residence: '民居形制',
  garden: '园林艺术',
  village: '村落聚落',
};
