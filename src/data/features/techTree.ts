/**
 * 中国发明科技树数据
 * 展示中国发明间的演进关系：造纸→印刷→活字印刷；火药→火器→火箭
 */

export interface InventionNode {
  id: string;
  name: string;
  dynasty: string;
  year: string;
  description: string;
  category: 'material' | 'engineering' | 'medicine' | 'math' | 'agriculture' | 'military' | 'navigation';
  /** 前置发明（依赖关系） */
  dependsOn: string[];
  /** 关键性 */
  importance: 'world-changing' | 'major' | 'significant' | 'regional';
}

export const INVENTIONS: InventionNode[] = [
  // ─── 材料与书写 ───
  {
    id: 'paper',
    name: '造纸术',
    dynasty: '汉',
    year: '约105年',
    description: '蔡伦改良造纸工艺，用树皮、麻头、破布等制纸，取代昂贵的竹简和帛书',
    category: 'material',
    dependsOn: [],
    importance: 'world-changing',
  },
  {
    id: 'ink',
    name: '墨',
    dynasty: '汉',
    year: '前3世纪',
    description: '松烟墨的出现使书写更加便捷持久',
    category: 'material',
    dependsOn: [],
    importance: 'major',
  },
  {
    id: 'block-printing',
    name: '雕版印刷',
    dynasty: '唐',
    year: '约7世纪',
    description: '将文字刻在木板上批量印刷，大幅降低书籍复制成本',
    category: 'material',
    dependsOn: ['paper', 'ink'],
    importance: 'world-changing',
  },
  {
    id: 'moveable-type',
    name: '活字印刷',
    dynasty: '宋',
    year: '约1040年',
    description: '毕昇发明泥活字，每个字可重复使用，比雕版更灵活高效',
    category: 'material',
    dependsOn: ['block-printing'],
    importance: 'world-changing',
  },
  {
    id: 'porcelain',
    name: '瓷器',
    dynasty: '汉',
    year: '前1世纪',
    description: '高温烧制的硬质瓷器，是中国独有发明，后传入欧洲被称为"china"',
    category: 'material',
    dependsOn: [],
    importance: 'world-changing',
  },

  // ─── 军事与火药 ───
  {
    id: 'gunpowder',
    name: '火药',
    dynasty: '唐',
    year: '约9世纪',
    description: '炼丹师意外发现硝石+硫磺+木炭的爆炸组合，最初用于烟火',
    category: 'military',
    dependsOn: [],
    importance: 'world-changing',
  },
  {
    id: 'fire-lance',
    name: '火枪',
    dynasty: '宋',
    year: '约10世纪',
    description: '火药装在竹管中喷射火焰，是火器时代的开端',
    category: 'military',
    dependsOn: ['gunpowder'],
    importance: 'major',
  },
  {
    id: 'cannon',
    name: '火炮',
    dynasty: '宋/元',
    year: '约12-13世纪',
    description: '金属管身火器，威力远超火枪，改变了战争形态',
    category: 'military',
    dependsOn: ['fire-lance', 'cast-iron'],
    importance: 'major',
  },
  {
    id: 'rocket',
    name: '火箭',
    dynasty: '宋',
    year: '约12世纪',
    description: '火药推进的飞行器，"万户飞天"是人类最早的火箭飞行尝试',
    category: 'military',
    dependsOn: ['gunpowder'],
    importance: 'significant',
  },

  // ─── 工程与建筑 ───
  {
    id: 'cast-iron',
    name: '铸铁术',
    dynasty: '汉',
    year: '前4世纪',
    description: '中国比欧洲早1600年掌握铸铁技术，推动工具和兵器革命',
    category: 'engineering',
    dependsOn: [],
    importance: 'world-changing',
  },
  {
    id: 'great-wall',
    name: '长城',
    dynasty: '秦/汉/明',
    year: '前3世纪起',
    description: '世界最长的防御工程，历代修缮，体现了中国古代工程智慧',
    category: 'engineering',
    dependsOn: ['cast-iron'],
    importance: 'major',
  },
  {
    id: 'grand-canal',
    name: '大运河',
    dynasty: '隋',
    year: '605-610年',
    description: '贯通南北的水运大动脉，全长1700公里，世界最长人工运河',
    category: 'engineering',
    dependsOn: [],
    importance: 'major',
  },
  {
    id: 'dujiangyan',
    name: '都江堰',
    dynasty: '战国·秦',
    year: '前256年',
    description: '李冰父子主持修建的无坝引水工程，鱼嘴分水、飞沙堰排沙、宝瓶口引水，至今灌溉成都平原2200余年，世界现存最古老的水利工程之一',
    category: 'engineering',
    dependsOn: [],
    importance: 'world-changing',
  },
  {
    id: 'bridges',
    name: '拱桥技术',
    dynasty: '隋',
    year: '约605年',
    description: '赵州桥是世界最早的敞肩石拱桥，设计领先欧洲800年',
    category: 'engineering',
    dependsOn: [],
    importance: 'significant',
  },
  {
    id: 'water-clock',
    name: '水钟/漏刻',
    dynasty: '汉',
    year: '前2世纪',
    description: '精密水力计时装置，比欧洲机械钟早出现千年',
    category: 'engineering',
    dependsOn: [],
    importance: 'significant',
  },

  // ─── 航海 ───
  {
    id: 'compass',
    name: '指南针',
    dynasty: '宋',
    year: '约11世纪',
    description: '磁针指向北方，使远洋航行成为可能，开启大航海时代',
    category: 'navigation',
    dependsOn: [],
    importance: 'world-changing',
  },
  {
    id: 'rudder',
    name: '船舵',
    dynasty: '汉',
    year: '约1世纪',
    description: '中国古代发明，取代了原始的桨舵，大大提升了船舶操控性',
    category: 'navigation',
    dependsOn: [],
    importance: 'major',
  },
  {
    id: 'segree',
    name: '水密隔舱',
    dynasty: '宋',
    year: '约11世纪',
    description: '船体分隔为多个密封舱室，即使一舱进水也不会沉没',
    category: 'navigation',
    dependsOn: [],
    importance: 'major',
  },

  // ─── 农业 ───
  {
    id: 'silk',
    name: '丝绸',
    dynasty: '传说夏/商证实',
    year: '前3000年起',
    description: '蚕丝纺织技术，丝绸之路因之得名，是中华文明标志性发明',
    category: 'agriculture',
    dependsOn: [],
    importance: 'world-changing',
  },
  {
    id: 'tea',
    name: '茶',
    dynasty: '传说神农/汉证实',
    year: '前2世纪起',
    description: '从药用饮品发展为文化符号，唐代茶道影响全世界',
    category: 'agriculture',
    dependsOn: [],
    importance: 'major',
  },
  {
    id: 'iron-plow',
    name: '铁犁',
    dynasty: '汉',
    year: '前2世纪',
    description: '铸铁犁头取代木犁，大幅提升耕作效率',
    category: 'agriculture',
    dependsOn: ['cast-iron'],
    importance: 'major',
  },
  {
    id: 'paper-money',
    name: '纸币（交子）',
    dynasty: '宋',
    year: '约1023年',
    description: '世界上最早的官方纸币，比欧洲早600多年',
    category: 'material',
    dependsOn: ['paper', 'block-printing'],
    importance: 'world-changing',
  },

  // ─── 数学 ───
  {
    id: 'decimal',
    name: '十进位值制',
    dynasty: '商',
    year: '前14世纪',
    description: '甲骨文已使用十进位值制记数，比印度早1000多年',
    category: 'math',
    dependsOn: [],
    importance: 'world-changing',
  },
  {
    id: 'pi',
    name: '圆周率精确计算',
    dynasty: '南北朝',
    year: '约470年',
    description: '祖冲之将π精确到3.1415926-3.1415927，领先世界近千年',
    category: 'math',
    dependsOn: ['decimal'],
    importance: 'major',
  },
  {
    id: 'solar-terms',
    name: '二十四节气',
    dynasty: '战国/汉',
    year: '前104年《太初历》确立',
    description: '基于太阳黄道划分的历法体系，指导农耕千年，2016年列入联合国非遗，是唯一被现代公历仍广泛使用的中国古代历法',
    category: 'math',
    dependsOn: [],
    importance: 'world-changing',
  },

  // ─── 医学 ───
  {
    id: 'tcm-theory',
    name: '中医理论体系',
    dynasty: '战国/汉',
    year: '前3世纪-前1世纪',
    description: '《黄帝内经》奠基，以阴阳五行、脏腑经络、气血津液为核心，构建了天人合一的整体医学观，是中医理论源头，影响东亚医学两千余年',
    category: 'medicine',
    dependsOn: [],
    importance: 'world-changing',
  },
  {
    id: 'acupuncture',
    name: '针灸',
    dynasty: '传说黄帝/汉证实',
    year: '前2世纪',
    description: '经络穴位理论与针刺疗法，至今仍是全球认可的中医技术',
    category: 'medicine',
    dependsOn: ['tcm-theory'],
    importance: 'major',
  },
  {
    id: 'herbal',
    name: '本草学',
    dynasty: '汉',
    year: '约1世纪',
    description: '《神农本草经》系统记载365种药物，是中药学奠基之作',
    category: 'medicine',
    dependsOn: ['tcm-theory'],
    importance: 'significant',
  },

  // ─── 综合·百科 ───
  {
    id: 'tiangong-kaiwu',
    name: '天工开物',
    dynasty: '明',
    year: '1637年',
    description: '宋应星著，系统总结明代农业手工业技术，涵盖冶金、纺织、制瓷、造纸等18个生产门类，被誉为"中国17世纪的工艺百科全书"，已译成多国文字',
    category: 'agriculture',
    dependsOn: ['paper', 'cast-iron', 'silk'],
    importance: 'major',
  },
];

export const CATEGORY_STYLE = {
  material: { label: '材料·书写', color: '#DAA520', icon: '📜' },
  engineering: { label: '工程·建筑', color: '#8B4513', icon: '🏗️' },
  military: { label: '军事·火器', color: '#C44536', icon: '⚔️' },
  navigation: { label: '航海·交通', color: '#4169E1', icon: '🧭' },
  agriculture: { label: '农业·民生', color: '#2D5016', icon: '🌾' },
  math: { label: '数学·天文', color: '#6B5B95', icon: '🔢' },
  medicine: { label: '医学·本草', color: '#3CB371', icon: '🌿' },
};

export const IMPORTANCE_STYLE = {
  'world-changing': { label: '改变世界', icon: '🌍', size: 28 },
  major: { label: '重大发明', icon: '⭐', size: 22 },
  significant: { label: '重要发明', icon: '💡', size: 18 },
  regional: { label: '区域影响', icon: '📍', size: 14 },
};

/** 构建科技树的层级关系 */
export function buildTechTree(): Map<string, string[]> {
  const tree = new Map<string, string[]>();
  INVENTIONS.forEach(inv => {
    tree.set(inv.id, inv.dependsOn);
  });
  return tree;
}
