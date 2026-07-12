/**
 * 朝代专属配色方案
 * 每个朝代有独特的主色、背景色、粒子颜色，用于视觉沉浸
 * 暗色模式下自动适配配色
 * @see ITERATIONS.md Iteration #21
 */

export interface DynastyTheme {
  /** 朝代名称 */
  name: string;
  /** 主色（用于高亮、按钮、边框） */
  primary: string;
  /** 背景色（用于渐变背景） */
  background: string;
  /** 粒子颜色（用于水墨粒子效果） */
  particle: string;
  /** 暗色模式主色 */
  primaryDark: string;
  /** 暗色模式背景色 */
  backgroundDark: string;
  /** 暗色模式粒子颜色 */
  particleDark: string;
  /** 纸张底色（浅色模式） */
  paper: string;
  /** 墨色（正文文字） */
  ink: string;
  /** 边框色 */
  border: string;
  /** 粒子字符集 */
  particleChars: string;
  /** 渐变背景方向 */
  gradientDir: string;
  /** 渐变起始色（半透明） */
  gradientFrom: string;
  /** 渐变结束色 */
  gradientTo: string;
}

/** 所有朝代的配色方案 */
export const dynastyThemes: DynastyTheme[] = [
  {
    name: '夏',
    primary: '#5b8c5a',
    background: 'linear-gradient(135deg, #f2efe6 0%, #e8dfd0 100%)',
    particle: '#5b8c5a',
    primaryDark: '#8bc48b',
    backgroundDark: 'linear-gradient(135deg, #141a14 0%, #1a241a 100%)',
    particleDark: '#8bc48b',
    paper: '#f2efe6',
    ink: '#2c3328',
    border: '#b8c4b0',
    particleChars: '天地禹汤禅让世袭家天下',
    gradientDir: '135deg',
    gradientFrom: 'rgba(91,140,90,0.06)',
    gradientTo: 'transparent',
  },
  {
    name: '商',
    primary: '#8b7d3c',
    background: 'linear-gradient(135deg, #f0e8d0 0%, #e0d4b0 100%)',
    particle: '#8b7d3c',
    primaryDark: '#c8b860',
    backgroundDark: 'linear-gradient(135deg, #1a1810 0%, #242018 100%)',
    particleDark: '#c8b860',
    paper: '#f0e8d0',
    ink: '#3a3020',
    border: '#c8b88a',
    particleChars: '甲骨文司母戊鼎祭祀青铜',
    gradientDir: '135deg',
    gradientFrom: 'rgba(139,125,60,0.06)',
    gradientTo: 'transparent',
  },
  {
    name: '周',
    primary: '#4a6fa5',
    background: 'linear-gradient(135deg, #f0f3f8 0%, #dce5f0 100%)',
    particle: '#4a6fa5',
    primaryDark: '#7aa0d4',
    backgroundDark: 'linear-gradient(135deg, #10141c 0%, #182028 100%)',
    particleDark: '#7aa0d4',
    paper: '#f5f0e8',
    ink: '#2a3040',
    border: '#b0c0d8',
    particleChars: '礼乐分封宗法井田百家',
    gradientDir: '135deg',
    gradientFrom: 'rgba(74,111,165,0.06)',
    gradientTo: 'transparent',
  },
  {
    name: '秦',
    primary: '#2c2c3a',
    background: 'linear-gradient(180deg, #e8e4dc 0%, #d8d4cc 100%)',
    particle: '#2c2c3a',
    primaryDark: '#6a6a80',
    backgroundDark: 'linear-gradient(180deg, #141418 0%, #1c1c24 100%)',
    particleDark: '#6a6a80',
    paper: '#e8e4dc',
    ink: '#1a1a24',
    border: '#a09888',
    particleChars: '郡县法刑大一统长城',
    gradientDir: '180deg',
    gradientFrom: 'rgba(44,44,58,0.05)',
    gradientTo: 'transparent',
  },
  {
    name: '西汉',
    primary: '#c23b22',
    background: 'linear-gradient(135deg, #f5ede0 0%, #e8dcc8 100%)',
    particle: '#c23b22',
    primaryDark: '#e06050',
    backgroundDark: 'linear-gradient(135deg, #1a1410 0%, #241c18 100%)',
    particleDark: '#e06050',
    paper: '#f5ede0',
    ink: '#3a2820',
    border: '#d4b896',
    particleChars: '丝路儒术驼铃张骞司马',
    gradientDir: '135deg',
    gradientFrom: 'rgba(194,59,34,0.06)',
    gradientTo: 'transparent',
  },
  {
    name: '东汉',
    primary: '#b8860b',
    background: 'linear-gradient(135deg, #f5ede0 0%, #e8dcc8 100%)',
    particle: '#b8860b',
    primaryDark: '#dab030',
    backgroundDark: 'linear-gradient(135deg, #1a1610 0%, #241c18 100%)',
    particleDark: '#dab030',
    paper: '#f5ede0',
    ink: '#3a2820',
    border: '#d4b896',
    particleChars: '蔡伦造纸光武外戚宦官',
    gradientDir: '135deg',
    gradientFrom: 'rgba(184,134,11,0.06)',
    gradientTo: 'transparent',
  },
  {
    name: '三国',
    primary: '#8b4513',
    background: 'linear-gradient(135deg, #ede5d5 0%, #d8ccc0 100%)',
    particle: '#8b4513',
    primaryDark: '#c07040',
    backgroundDark: 'linear-gradient(135deg, #1a1614 0%, #241e18 100%)',
    particleDark: '#c07040',
    paper: '#ede5d5',
    ink: '#3a2a1a',
    border: '#c8b896',
    particleChars: '魏蜀吴孔明关羽曹操周瑜',
    gradientDir: '135deg',
    gradientFrom: 'rgba(139,69,19,0.06)',
    gradientTo: 'transparent',
  },
  {
    name: '晋',
    primary: '#6b7b8d',
    background: 'linear-gradient(135deg, #f0ece4 0%, #d8d4cc 100%)',
    particle: '#6b7b8d',
    primaryDark: '#9aa8b8',
    backgroundDark: 'linear-gradient(135deg, #14181c 0%, #1c2028 100%)',
    particleDark: '#9aa8b8',
    paper: '#f0ece4',
    ink: '#3a3530',
    border: '#b8c0c8',
    particleChars: '兰亭玄学八王江南',
    gradientDir: '135deg',
    gradientFrom: 'rgba(107,123,141,0.06)',
    gradientTo: 'transparent',
  },
  {
    name: '南北朝',
    primary: '#a0522d',
    background: 'linear-gradient(135deg, #f2ece4 0%, #e0d4c4 100%)',
    particle: '#a0522d',
    primaryDark: '#d4845a',
    backgroundDark: 'linear-gradient(135deg, #1a1612 0%, #241e18 100%)',
    particleDark: '#d4845a',
    paper: '#f2ece4',
    ink: '#3a2a20',
    border: '#c8b096',
    particleChars: '佛石窟梵文融合魏碑',
    gradientDir: '135deg',
    gradientFrom: 'rgba(160,82,45,0.06)',
    gradientTo: 'transparent',
  },
  {
    name: '隋',
    primary: '#4682b4',
    background: 'linear-gradient(135deg, #f2efe6 0%, #dce8f0 100%)',
    particle: '#4682b4',
    primaryDark: '#70a8d8',
    backgroundDark: 'linear-gradient(135deg, #10181c 0%, #182028 100%)',
    particleDark: '#70a8d8',
    paper: '#f2efe6',
    ink: '#2a3540',
    border: '#a8c0d8',
    particleChars: '科举运河三省六部',
    gradientDir: '135deg',
    gradientFrom: 'rgba(70,130,180,0.06)',
    gradientTo: 'transparent',
  },
  {
    name: '唐',
    primary: '#d4a017',
    background: 'linear-gradient(135deg, #faf5e8 0%, #f0e4c8 100%)',
    particle: '#d4a017',
    primaryDark: '#f0c040',
    backgroundDark: 'linear-gradient(135deg, #1a1810 0%, #242018 100%)',
    particleDark: '#f0c040',
    paper: '#faf5e8',
    ink: '#3a3020',
    border: '#e0d0a0',
    particleChars: '李白杜甫长安牡丹诗',
    gradientDir: '135deg',
    gradientFrom: 'rgba(212,160,23,0.06)',
    gradientTo: 'transparent',
  },
  {
    name: '五代十国',
    primary: '#6b2c2c',
    background: 'linear-gradient(135deg, #f0e8e4 0%, #dcd0cc 100%)',
    particle: '#6b2c2c',
    primaryDark: '#a05050',
    backgroundDark: 'linear-gradient(135deg, #1a1414 0%, #241c1c 100%)',
    particleDark: '#a05050',
    paper: '#f0e8e4',
    ink: '#3a2020',
    border: '#c8a8a0',
    particleChars: '军阀割据五代十国词',
    gradientDir: '135deg',
    gradientFrom: 'rgba(107,44,44,0.06)',
    gradientTo: 'transparent',
  },
  {
    name: '宋',
    primary: '#5a8a7a',
    background: 'linear-gradient(135deg, #f5f8f5 0%, #d8e8dc 100%)',
    particle: '#5a8a7a',
    primaryDark: '#80b8a0',
    backgroundDark: 'linear-gradient(135deg, #101a18 0%, #182420 100%)',
    particleDark: '#80b8a0',
    paper: '#f5f8f5',
    ink: '#2a3a35',
    border: '#b8d0c8',
    particleChars: '宋词理学交子清明',
    gradientDir: '135deg',
    gradientFrom: 'rgba(90,138,122,0.06)',
    gradientTo: 'transparent',
  },
  {
    name: '元',
    primary: '#708090',
    background: 'linear-gradient(135deg, #f0ece4 0%, #d8d4cc 100%)',
    particle: '#708090',
    primaryDark: '#a0b0c0',
    backgroundDark: 'linear-gradient(135deg, #14181c 0%, #1c2028 100%)',
    particleDark: '#a0b0c0',
    paper: '#f0ece4',
    ink: '#3a3530',
    border: '#b8c0c8',
    particleChars: '行省驿站马可波罗',
    gradientDir: '135deg',
    gradientFrom: 'rgba(112,128,144,0.06)',
    gradientTo: 'transparent',
  },
  {
    name: '明',
    primary: '#c23b22',
    background: 'linear-gradient(135deg, #f5ede0 0%, #e8d0c0 100%)',
    particle: '#c23b22',
    primaryDark: '#e06050',
    backgroundDark: 'linear-gradient(135deg, #1a1410 0%, #241c18 100%)',
    particleDark: '#e06050',
    paper: '#f5ede0',
    ink: '#3a2020',
    border: '#d4b896',
    particleChars: '长城郑和紫禁城',
    gradientDir: '135deg',
    gradientFrom: 'rgba(194,59,34,0.06)',
    gradientTo: 'transparent',
  },
  {
    name: '清',
    primary: '#8b0000',
    background: 'linear-gradient(135deg, #f5ede0 0%, #e8d0c0 100%)',
    particle: '#8b0000',
    primaryDark: '#c03030',
    backgroundDark: 'linear-gradient(135deg, #1a1414 0%, #241c1c 100%)',
    particleDark: '#c03030',
    paper: '#f5ede0',
    ink: '#2a2020',
    border: '#d4b096',
    particleChars: '康乾闭关洋务',
    gradientDir: '135deg',
    gradientFrom: 'rgba(139,0,0,0.06)',
    gradientTo: 'transparent',
  },
];

/** 根据朝代名称获取配色方案 */
export function getDynastyTheme(name: string): DynastyTheme | undefined {
  return dynastyThemes.find((t) => t.name === name);
}

/** 根据朝代名称获取主色 */
export function getDynastyColor(name: string): string {
  return getDynastyTheme(name)?.primary || '#C41E3A';
}

/** 根据朝代名称获取暗色模式主色 */
export function getDynastyColorDark(name: string): string {
  return getDynastyTheme(name)?.primaryDark || '#FF6B6B';
}

/** 根据朝代名称获取完整配色（含背景渐变、粒子字符等） */
export function getFullDynastyTheme(name: string): DynastyTheme | undefined {
  return getDynastyTheme(name);
}

/** 根据朝代 UID 获取配色（兼容后端 UID） */
export function getDynastyThemeByUid(uid: string): DynastyTheme | undefined {
  const uidToName: Record<string, string> = {
    'xia': '夏',
    'shang': '商',
    'zhou': '周',
    'qin': '秦',
    'han': '西汉',
    'dong-han': '东汉',
    'three-kingdoms': '三国',
    'jin': '晋',
    'nan-bei-chao': '南北朝',
    'sui': '隋',
    'tang': '唐',
    'wu-dai-shi-guo': '五代十国',
    'song': '宋',
    'yuan': '元',
    'ming': '明',
    'qing': '清',
  };
  const name = uidToName[uid];
  return name ? getDynastyTheme(name) : undefined;
}
