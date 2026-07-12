/**
 * 文化场景配置
 * 6 个场景的完整定义
 * @see history-museum/design/001-cultural-scene-system.md §2
 */

import type { CulturalScene, SceneId } from '@/types/scene';

export const SCENE_CONFIGS: Record<SceneId, CulturalScene> = {
  // ========== 1. 水墨丹青（默认） ==========
  'ink-wash': {
    id: 'ink-wash',
    name: '水墨丹青',
    description: '宣纸质感，墨色晕染，传统水墨意境',
    icon: '墨',
    isDefault: true,
    theme: {
      '--color-paper': '#f5f0e8',
      '--color-ink': '#27231e',
      '--color-accent': '#c23b22',
      '--bg-pattern': '',
      '--font-heading': "'Noto Serif SC', 'STSong', serif",
      '--font-body': "'Noto Serif SC', 'STSong', serif",
    },
    background: {
      type: 'particle',
      layers: [
        {
          type: 'svg',
          opacity: 0.05,
          zIndex: 0,
        },
      ],
    },
    particleConfig: {
      color: '#27231e',
      chars: '天地玄黄宇宙洪荒日月盈昃辰宿列张寒来暑往秋收冬藏',
      charProbability: 0.3,
      radiusRange: [1, 4],
      opacityRange: [0.15, 0.4],
    },
    ambientSound: '',
    fontStack: ['Noto Serif SC'],
  },

  // ========== 2. 简牍遗风 ==========
  'bamboo-slip': {
    id: 'bamboo-slip',
    name: '简牍遗风',
    description: '竹简黄褐，隶书古意，先秦两汉风骨',
    icon: '简',
    theme: {
      '--color-paper': '#ddc998',
      '--color-ink': '#3d2817',
      '--color-accent': '#8b4513',
      '--bg-pattern':
        'repeating-linear-gradient(90deg, transparent 0px, transparent 28px, rgba(61,40,23,0.15) 28px, rgba(61,40,23,0.15) 30px), repeating-linear-gradient(0deg, transparent 0px, transparent 80px, rgba(61,40,23,0.12) 80px, rgba(61,40,23,0.12) 82px)',
      '--font-heading': "'Ma Shan Zheng', 'ZCOOL XiaoWei', serif",
      '--font-body': "'ZCOOL XiaoWei', 'Noto Serif SC', serif",
    },
    background: {
      type: 'pattern',
      layers: [
        {
          type: 'gradient',
          opacity: 1,
          zIndex: 0,
        },
      ],
    },
    particleConfig: {
      color: '#3d2817',
      chars: '甲骨金文小篆隶书简牍竹简丝帛',
      charProbability: 0.5,
      radiusRange: [1, 3],
      opacityRange: [0.1, 0.3],
    },
    ambientSound: '',
    fontStack: ['Ma Shan Zheng', 'ZCOOL XiaoWei'],
  },

  // ========== 3. 绢本设色 ==========
  'silk-scroll': {
    id: 'silk-scroll',
    name: '绢本设色',
    description: '石青赭石，山水卷轴，唐宋丹青神韵',
    icon: '绢',
    theme: {
      '--color-paper': '#ece0c0',
      '--color-ink': '#3a3a3a',
      '--color-accent': '#1e5b8e',
      '--bg-pattern':
        'linear-gradient(135deg, rgba(30,91,142,0.10) 0%, transparent 50%, rgba(184,148,29,0.10) 100%)',
      '--font-heading': "'ZCOOL QingKe HuangYou', serif",
      '--font-body': "'Liu Jian Mao Cao', 'Noto Serif SC', serif",
    },
    background: {
      type: 'scroll',
      layers: [
        {
          type: 'gradient',
          opacity: 1,
          zIndex: 0,
        },
      ],
    },
    particleConfig: {
      color: '#1e5b8e',
      chars: '山水花鸟人物工笔写意泼墨青绿',
      charProbability: 0.35,
      radiusRange: [1, 4],
      opacityRange: [0.12, 0.35],
    },
    ambientSound: '',
    fontStack: ['ZCOOL QingKe HuangYou', 'Liu Jian Mao Cao'],
  },

  // ========== 4. 青瓷雅韵 ==========
  'porcelain': {
    id: 'porcelain',
    name: '青瓷雅韵',
    description: '天青月白，冰裂纹理，宋瓷极简美学',
    icon: '瓷',
    theme: {
      '--color-paper': '#d0ddd6',
      '--color-ink': '#2c3e3a',
      '--color-accent': '#5a8a7a',
      '--bg-pattern':
        'radial-gradient(circle at 25% 25%, rgba(90,138,122,0.12) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(200,216,210,0.18) 0%, transparent 50%)',
      '--font-heading': "'Noto Serif SC', serif",
      '--font-body': "'Noto Serif SC', serif",
    },
    background: {
      type: 'pattern',
      layers: [
        {
          type: 'gradient',
          opacity: 1,
          zIndex: 0,
        },
      ],
    },
    particleConfig: {
      color: '#5a8a7a',
      chars: '汝官哥定钧天青月白冰裂开片',
      charProbability: 0.25,
      radiusRange: [1, 3],
      opacityRange: [0.1, 0.3],
    },
    ambientSound: '',
    fontStack: ['Noto Serif SC'],
  },

  // ========== 5. 青铜礼器 ==========
  'bronze': {
    id: 'bronze',
    name: '青铜礼器',
    description: '铜绿玄黑，铭文浮动，商周礼乐威仪',
    icon: '铜',
    theme: {
      '--color-paper': '#1a1a1a',
      '--color-ink': '#c9b89a',
      '--color-accent': '#7a8b3e',
      '--bg-pattern':
        'radial-gradient(ellipse at top, rgba(122,139,62,0.15) 0%, transparent 60%), radial-gradient(ellipse at bottom, rgba(201,184,154,0.10) 0%, transparent 60%)',
      '--font-heading': "'ZCOOL KuaiLe', 'Ma Shan Zheng', serif",
      '--font-body': "'Ma Shan Zheng', 'Noto Serif SC', serif",
    },
    background: {
      type: 'pattern',
      layers: [
        {
          type: 'gradient',
          opacity: 1,
          zIndex: 0,
        },
      ],
    },
    particleConfig: {
      color: '#7a8b3e',
      chars: '鼎簋爵尊卣觚觯钟鼓磬',
      charProbability: 0.4,
      radiusRange: [1, 4],
      opacityRange: [0.12, 0.35],
    },
    ambientSound: '',
    fontStack: ['ZCOOL KuaiLe', 'Ma Shan Zheng'],
  },

  // ========== 6. 印谱篆刻 ==========
  'seal': {
    id: 'seal',
    name: '印谱篆刻',
    description: '朱砂宣纸，篆刻章法，方寸之间气象',
    icon: '印',
    theme: {
      '--color-paper': '#f0dcc0',
      '--color-ink': '#8b0000',
      '--color-accent': '#c23b22',
      '--bg-pattern':
        'radial-gradient(circle at 30% 30%, rgba(194,59,34,0.12) 0%, transparent 40%), radial-gradient(circle at 70% 70%, rgba(139,0,0,0.10) 0%, transparent 40%)',
      '--font-heading': "'ZCOOL XiaoWei', serif",
      '--font-body': "'ZCOOL XiaoWei', 'Noto Serif SC', serif",
    },
    background: {
      type: 'pattern',
      layers: [
        {
          type: 'gradient',
          opacity: 1,
          zIndex: 0,
        },
      ],
    },
    particleConfig: {
      color: '#c23b22',
      chars: '金石篆刻朱文白文方圆章法',
      charProbability: 0.45,
      radiusRange: [1, 3],
      opacityRange: [0.15, 0.4],
    },
    ambientSound: '',
    fontStack: ['ZCOOL XiaoWei'],
  },
};

/** 场景列表（按推荐顺序） */
export const SCENE_LIST: CulturalScene[] = [
  SCENE_CONFIGS['ink-wash'],
  SCENE_CONFIGS['bamboo-slip'],
  SCENE_CONFIGS['silk-scroll'],
  SCENE_CONFIGS['porcelain'],
  SCENE_CONFIGS['bronze'],
  SCENE_CONFIGS['seal'],
];

/** 默认场景 */
export const DEFAULT_SCENE: SceneId = 'ink-wash';
