/**
 * 历史色谱 / 染料演变
 * @see ITERATIONS.md #96
 */

export interface DynastyColor {
  id: string;
  name: string;
  hex: string;
  rgb: string;
  source: string;
  description: string;
  category: 'royal' | 'common' | 'ritual' | 'dyed';
}

export interface DynastyPalette {
  id: string;
  dynasty: string;
  era: string;
  description: string;
  colors: DynastyColor[];
  dyeMethods: string[];
  culturalMeaning: string;
}

export const DYNASTY_PALETTES: DynastyPalette[] = [
  {
    id: 'shang',
    dynasty: '商代',
    era: '公元前1600-前1046年',
    description: '尚黑尚玄，以矿物颜料和植物染料并用',
    colors: [
      { id: 'shang-black', name: '玄色', hex: '#2B1B17', rgb: 'rgb(43, 27, 23)', source: '漆树染料', description: '黑中带红，商代最尊贵的颜色', category: 'royal' },
      { id: 'shang-white', name: '素色', hex: '#F5F0E8', rgb: 'rgb(245, 240, 232)', source: '石灰', description: '白色象征纯洁，用于祭祀服饰', category: 'ritual' },
      { id: 'shang-red', name: '朱砂红', hex: '#C42828', rgb: 'rgb(196, 40, 40)', source: '朱砂矿', description: '朱砂研磨，用于礼器和印章', category: 'ritual' },
      { id: 'shang-yellow', name: '缃色', hex: '#E9C46A', rgb: 'rgb(233, 196, 106)', source: '茜草', description: '浅黄色，平民常用染色', category: 'common' },
      { id: 'shang-green', name: '苍色', hex: '#2D6A4F', rgb: 'rgb(45, 106, 79)', source: '蓝草+黄檗', description: '蓝黄混合的深绿色', category: 'dyed' },
    ],
    dyeMethods: ['矿物研磨染色', '漆树汁染', '茜草根染', '朱砂涂绘'],
    culturalMeaning: '商代崇尚玄黑色，认为黑色代表北方和水德，是至高无上的颜色',
  },
  {
    id: 'zhou',
    dynasty: '周代',
    era: '公元前1046-前256年',
    description: '五方正色体系确立，礼制色彩规范化',
    colors: [
      { id: 'zhou-red', name: '赤色', hex: '#DC143C', rgb: 'rgb(220, 20, 60)', source: '茜草+明矾', description: '正红色，南方之色，象征火德', category: 'royal' },
      { id: 'zhou-blue', name: '青色', hex: '#1E3A5F', rgb: 'rgb(30, 58, 95)', source: '蓼蓝', description: '东方之色，象征木德和生机', category: 'royal' },
      { id: 'zhou-yellow', name: '黄色', hex: '#D4A017', rgb: 'rgb(212, 160, 23)', source: '黄檗', description: '中央之色，象征土德和皇权', category: 'royal' },
      { id: 'zhou-white', name: '白色', hex: '#FAF9F6', rgb: 'rgb(250, 249, 246)', source: '石灰/铅白', description: '西方之色，象征金德', category: 'royal' },
      { id: 'zhou-black', name: '黑色', hex: '#1A1A2E', rgb: 'rgb(26, 26, 46)', source: '皂斗', description: '北方之色，象征水德', category: 'royal' },
      { id: 'zhou-purple', name: '紫色', hex: '#6B2D5B', rgb: 'rgb(107, 45, 91)', source: '紫草', description: '赤黑相间，高贵之色', category: 'dyed' },
    ],
    dyeMethods: ['蓼蓝发酵染色', '茜草明矾媒染', '黄檗浸染', '紫草反复浸染'],
    culturalMeaning: '周代确立五色体系（青赤黄白黑），对应五行五方，成为后世色彩观的基础',
  },
  {
    id: 'han',
    dynasty: '汉代',
    era: '公元前202-公元220年',
    description: '织锦技术飞跃，丝绸之路带来外来染料',
    colors: [
      { id: 'han-crimson', name: '绛色', hex: '#8B0000', rgb: 'rgb(139, 0, 0)', source: '茜草重染', description: '深红色，汉代最流行的礼服色', category: 'royal' },
      { id: 'han-silk', name: '素绢色', hex: '#F8F4E8', rgb: 'rgb(248, 244, 232)', source: '生丝本色', description: '未经染色的丝绸原色', category: 'common' },
      { id: 'han-indigo', name: '靛青色', hex: '#003366', rgb: 'rgb(0, 51, 102)', source: '靛蓝', description: '深蓝近黑，官员常服色', category: 'dyed' },
      { id: 'han-gold', name: '金色', hex: '#DAA520', rgb: 'rgb(218, 165, 32)', source: '金箔/黄丹', description: '金黄色，帝王专用', category: 'royal' },
      { id: 'han-magenta', name: '枣红色', hex: '#5C1A1B', rgb: 'rgb(92, 26, 27)', source: '苏木', description: '从西域传入的染料色', category: 'dyed' },
    ],
    dyeMethods: ['多层浸染法', '明矾媒染', '锡媒染', '金箔贴饰', '苏木染'],
    culturalMeaning: '汉代尚赤（红色），认为火德旺盛，同时通过丝绸之路吸收了西域染料技术',
  },
  {
    id: 'tang',
    dynasty: '唐代',
    era: '公元618-907年',
    description: '色彩审美巅峰，九品官服颜色制度化',
    colors: [
      { id: 'tang-purple', name: '紫绶色', hex: '#6A0DAD', rgb: 'rgb(106, 13, 173)', source: '紫草+明矾', description: '三品以上官员专用，最尊贵', category: 'royal' },
      { id: 'tang-rouge', name: '绯红色', hex: '#DC143C', rgb: 'rgb(220, 20, 60)', source: '茜草+苏木', description: '四至五品官员服色', category: 'royal' },
      { id: 'tang-green', name: '绿袍色', hex: '#228B22', rgb: 'rgb(34, 139, 34)', source: '蓝草+黄檗', description: '六至七品官员服色', category: 'common' },
      { id: 'tang-teal', name: '青碧色', hex: '#008B8B', rgb: 'rgb(0, 139, 139)', source: '靛蓝', description: '八至九品官员服色', category: 'common' },
      { id: 'tang-peach', name: '桃红色', hex: '#FF69B4', rgb: 'rgb(255, 105, 180)', source: '胭脂花', description: '仕女妆容常用色', category: 'common' },
      { id: 'tang-cream', name: '鹅黄色', hex: '#FFFACD', rgb: 'rgb(255, 250, 205)', source: '黄檗轻染', description: '淡雅柔和，宫廷常用', category: 'common' },
    ],
    dyeMethods: ['紫草三浸三染', '茜草明矾媒染', '靛蓝发酵', '蜡缬（扎染）', '夹缬（模板染）'],
    culturalMeaning: '唐代以紫色为最高贵，"紫袍金带"是官员地位的象征，色彩审美达到古代巅峰',
  },
  {
    id: 'song',
    dynasty: '宋代',
    era: '公元960-1279年',
    description: '理学影响下趋向雅致简约，染料工艺精进',
    colors: [
      { id: 'song-celestial', name: '天青色', hex: '#7FB2D6', rgb: 'rgb(127, 178, 214)', source: '钴料', description: '雨过天青云破处，宋代美学巅峰之色', category: 'royal' },
      { id: 'song-moss', name: '苔绿色', hex: '#8A9A5B', rgb: 'rgb(138, 154, 91)', source: '槐花+靛蓝', description: '淡雅的绿色，文人喜爱', category: 'common' },
      { id: 'song-ink', name: '墨色', hex: '#2C2C2C', rgb: 'rgb(44, 44, 44)', source: '松烟墨', description: '水墨画基础色，宋代文人崇尚', category: 'common' },
      { id: 'song-ivory', name: '象牙色', hex: '#FFFFF0', rgb: 'rgb(255, 255, 240)', source: '蚕丝本色', description: '温润如玉的白色', category: 'common' },
      { id: 'song-plum', name: '梅子青', hex: '#618970', rgb: 'rgb(97, 137, 112)', source: '铜料还原焰', description: '哥窑釉色，青瓷经典', category: 'dyed' },
    ],
    dyeMethods: ['槐花靛蓝套染', '茶染', '杨梅染', '苏木媒染', '铜盐媒染'],
    culturalMeaning: '宋代受理学影响，色彩趋向素雅内敛，青瓷的天青色成为宋代美学的标志',
  },
  {
    id: 'qing',
    dynasty: '清代',
    era: '公元1644-1912年',
    description: '织造局鼎盛，洋染料开始传入',
    colors: [
      { id: 'qing-imperial', name: '明黄色', hex: '#FFD700', rgb: 'rgb(255, 215, 0)', source: '黄檗+明矾', description: '帝王专用色，龙袍主色', category: 'royal' },
      { id: 'qing-cinnabar', name: '朱砂色', hex: '#E34234', rgb: 'rgb(227, 66, 52)', source: '朱砂', description: '正红色，喜庆和官方场合', category: 'royal' },
      { id: 'qing-coBalt', name: '洋蓝色', hex: '#0047AB', rgb: 'rgb(0, 71, 171)', source: '进口钴料', description: '从欧洲传入的蓝色染料', category: 'dyed' },
      { id: 'qing-mahogany', name: '紫檀色', hex: '#4A2C2A', rgb: 'rgb(74, 44, 42)', source: '苏木+铁媒', description: '深沉的红褐色，家具常用', category: 'dyed' },
      { id: 'qing-jade', name: '碧玉色', hex: '#00A86B', rgb: 'rgb(0, 168, 107)', source: '翡翠研磨', description: '翠绿色，玉石本色', category: 'common' },
    ],
    dyeMethods: ['黄檗重染', '苏木铁媒染', '洋红（胭脂虫）', '靛蓝缸染', '化学染料'],
    culturalMeaning: '清代明黄色为帝王专属，龙袍用色极为严格，同时西洋染料开始影响中国传统色谱',
  },
];

/** 所有颜色扁平列表 */
export const ALL_HISTORICAL_COLORS = DYNASTY_PALETTES.flatMap(p =>
  p.colors.map(c => ({ ...c, dynasty: p.dynasty, dyeMethods: p.dyeMethods }))
);

/** 按类别分组 */
export const COLORS_BY_CATEGORY = {
  royal: DYNASTY_PALETTES.flatMap(p => p.colors.filter(c => c.category === 'royal')),
  common: DYNASTY_PALETTES.flatMap(p => p.colors.filter(c => c.category === 'common')),
  ritual: DYNASTY_PALETTES.flatMap(p => p.colors.filter(c => c.category === 'ritual')),
  dyed: DYNASTY_PALETTES.flatMap(p => p.colors.filter(c => c.category === 'dyed')),
};
