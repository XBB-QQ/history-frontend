/**
 * 朝代专属配色方案
 * 每个朝代有独特的主色、背景色、粒子颜色，用于视觉沉浸
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
}

/** 所有朝代的配色方案 */
export const dynastyThemes: DynastyTheme[] = [
  {
    name: '夏',
    primary: '#8B7355',
    background: 'linear-gradient(135deg, #F5F0E8 0%, #E8DDD0 100%)',
    particle: '#8B7355',
    primaryDark: '#C4A87A',
    backgroundDark: 'linear-gradient(135deg, #1A1814 0%, #2A2520 100%)',
    particleDark: '#C4A87A',
  },
  {
    name: '商',
    primary: '#A0522D',
    background: 'linear-gradient(135deg, #FFF5EE 0%, #FFE4D6 100%)',
    particle: '#A0522D',
    primaryDark: '#CD853F',
    backgroundDark: 'linear-gradient(135deg, #1C1612 0%, #2A1E18 100%)',
    particleDark: '#CD853F',
  },
  {
    name: '周',
    primary: '#6B8E23',
    background: 'linear-gradient(135deg, #F0F5E8 0%, #E0ECCE 100%)',
    particle: '#6B8E23',
    primaryDark: '#9ACD32',
    backgroundDark: 'linear-gradient(135deg, #141A10 0%, #1E2A18 100%)',
    particleDark: '#9ACD32',
  },
  {
    name: '秦',
    primary: '#4682B4',
    background: 'linear-gradient(135deg, #F0F4F8 0%, #DCE6F0 100%)',
    particle: '#4682B4',
    primaryDark: '#6CA0DC',
    backgroundDark: 'linear-gradient(135deg, #101418 0%, #182028 100%)',
    particleDark: '#6CA0DC',
  },
  {
    name: '西汉',
    primary: '#CD853F',
    background: 'linear-gradient(135deg, #FFF8F0 0%, #FFE8CC 100%)',
    particle: '#CD853F',
    primaryDark: '#DEB887',
    backgroundDark: 'linear-gradient(135deg, #1A1610 0%, #2A2018 100%)',
    particleDark: '#DEB887',
  },
  {
    name: '东汉',
    primary: '#B8860B',
    background: 'linear-gradient(135deg, #FFFDF0 0%, #FFF0C0 100%)',
    particle: '#B8860B',
    primaryDark: '#DAA520',
    backgroundDark: 'linear-gradient(135deg, #1A1810 0%, #2A2518 100%)',
    particleDark: '#DAA520',
  },
  {
    name: '三国',
    primary: '#DC143C',
    background: 'linear-gradient(135deg, #FFF0F0 0%, #FFE0E0 100%)',
    particle: '#DC143C',
    primaryDark: '#FF4466',
    backgroundDark: 'linear-gradient(135deg, #1A1014 0%, #2A1820 100%)',
    particleDark: '#FF4466',
  },
  {
    name: '晋',
    primary: '#4169E1',
    background: 'linear-gradient(135deg, #F0F0FF 0%, #E0E0FF 100%)',
    particle: '#4169E1',
    primaryDark: '#6B8AFF',
    backgroundDark: 'linear-gradient(135deg, #10101A 0%, #181828 100%)',
    particleDark: '#6B8AFF',
  },
  {
    name: '隋',
    primary: '#2F4F4F',
    background: 'linear-gradient(135deg, #F0F5F5 0%, #DCE8E8 100%)',
    particle: '#2F4F4F',
    primaryDark: '#5F8F8F',
    backgroundDark: 'linear-gradient(135deg, #101818 0%, #182020 100%)',
    particleDark: '#5F8F8F',
  },
  {
    name: '唐',
    primary: '#DC143C',
    background: 'linear-gradient(135deg, #FFF5EE 0%, #FFE4C4 100%)',
    particle: '#FFD700',
    primaryDark: '#FF6B6B',
    backgroundDark: 'linear-gradient(135deg, #1C1410 0%, #2A1E14 100%)',
    particleDark: '#FFD700',
  },
  {
    name: '宋',
    primary: '#4169E1',
    background: 'linear-gradient(135deg, #F0F5FF 0%, #DCE8FF 100%)',
    particle: '#4169E1',
    primaryDark: '#6CA0DC',
    backgroundDark: 'linear-gradient(135deg, #10141C 0%, #182028 100%)',
    particleDark: '#6CA0DC',
  },
  {
    name: '元',
    primary: '#2F4F4F',
    background: 'linear-gradient(135deg, #F5F0E8 0%, #E8DDD0 100%)',
    particle: '#8B7355',
    primaryDark: '#A08060',
    backgroundDark: 'linear-gradient(135deg, #1A1814 0%, #2A2520 100%)',
    particleDark: '#A08060',
  },
  {
    name: '明',
    primary: '#8B0000',
    background: 'linear-gradient(135deg, #FFF0F0 0%, #FFE0E0 100%)',
    particle: '#8B0000',
    primaryDark: '#CC3333',
    backgroundDark: 'linear-gradient(135deg, #1A1014 0%, #2A1820 100%)',
    particleDark: '#CC3333',
  },
  {
    name: '清',
    primary: '#B22222',
    background: 'linear-gradient(135deg, #FFF5F5 0%, #FFE8E8 100%)',
    particle: '#B22222',
    primaryDark: '#DD4444',
    backgroundDark: 'linear-gradient(135deg, #1A1414 0%, #2A1E1E 100%)',
    particleDark: '#DD4444',
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
