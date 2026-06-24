/**
 * 文化场景皮肤系统 — 类型定义
 * @see history-museum/design/001-cultural-scene-system.md
 */

export type SceneId =
  | 'ink-wash'
  | 'bamboo-slip'
  | 'silk-scroll'
  | 'porcelain'
  | 'bronze'
  | 'seal';

/** 背景层类型 */
export interface BackgroundLayer {
  type: 'svg' | 'image' | 'particle' | 'gradient';
  src?: string;
  animation?: string;
  opacity?: number;
  zIndex: number;
}

/** 场景主题（CSS 变量覆盖） */
export interface SceneTheme {
  '--color-paper': string;
  '--color-ink': string;
  '--color-accent': string;
  '--bg-pattern': string;
  '--font-heading': string;
  '--font-body': string;
}

/** 文化场景配置 */
export interface CulturalScene {
  id: SceneId;
  name: string;
  description: string;
  icon: string;
  theme: SceneTheme;
  background: {
    type: 'particle' | 'scroll' | 'pattern' | 'animation';
    layers: BackgroundLayer[];
  };
  /** 粒子配置（供 InkParticles 使用） */
  particleConfig?: {
    color: string;
    chars?: string;
    charProbability?: number;
    radiusRange?: [number, number];
    opacityRange?: [number, number];
  };
  ambientSound?: string;
  fontStack: string[];
  isDefault?: boolean;
  unlockCondition?: {
    type: 'points' | 'achievement';
    value: number | string;
  };
}

/** 场景偏好（用户持久化） */
export interface ScenePreference {
  current: SceneId;
  ambientSound: boolean;
  autoSwitchByContent: boolean;
}
