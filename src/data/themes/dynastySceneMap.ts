/**
 * 朝代 → 文化场景映射
 * 根据朝代特色匹配最合适的视觉场景
 * @see history-museum/design/000-future-roadmap.md §方向一 §1.2
 */

import type { SceneId } from '@/types/scene';

/** 朝代名 → 场景 ID 映射 */
export const DYNASTY_SCENE_MAP: Record<string, SceneId> = {
  // 上古三代 — 竹简与青铜
  '夏': 'bamboo-slip',
  '商': 'bronze',
  '周': 'bamboo-slip',

  // 秦汉 — 竹简纪事
  '秦': 'bamboo-slip',
  '西汉': 'bamboo-slip',
  '东汉': 'bamboo-slip',
  '汉': 'bamboo-slip',

  // 魏晋南北朝 — 书画初兴
  '三国': 'seal',
  '晋': 'silk-scroll',
  '西晋': 'silk-scroll',
  '东晋': 'silk-scroll',
  '南北朝': 'silk-scroll',

  // 隋唐 — 绢本丹青
  '隋': 'silk-scroll',
  '唐': 'silk-scroll',

  // 五代十国 — 战乱更迭
  '五代十国': 'silk-scroll',

  // 宋元 — 瓷器巅峰
  '宋': 'porcelain',
  '北宋': 'porcelain',
  '南宋': 'porcelain',
  '元': 'porcelain',

  // 明清 — 篆刻集大成
  '明': 'seal',
  '清': 'seal',
};

/** 默认场景（未匹配到朝代时） */
export const DEFAULT_DYNASTY_SCENE: SceneId = 'ink-wash';

/**
 * 根据朝代名获取对应场景
 * 支持精确匹配和模糊匹配（包含关系）
 */
export function getSceneByDynasty(dynastyName: string): SceneId {
  // 精确匹配
  if (DYNASTY_SCENE_MAP[dynastyName]) {
    return DYNASTY_SCENE_MAP[dynastyName];
  }

  // 模糊匹配：朝代名包含映射表中的 key
  for (const key of Object.keys(DYNASTY_SCENE_MAP)) {
    if (dynastyName.includes(key)) {
      return DYNASTY_SCENE_MAP[key];
    }
  }

  return DEFAULT_DYNASTY_SCENE;
}
