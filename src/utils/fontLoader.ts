/**
 * 字体加载工具
 * 按场景懒加载字体，避免首屏加载所有字体
 * @see history-museum/design/001-cultural-scene-system.md §5.2
 */

import type { SceneId } from '@/types/scene';

/** 各场景需要的字体清单（Google Fonts 免费中文字体） */
export const SCENE_FONTS: Record<SceneId, string[]> = {
  'ink-wash': ['Noto Serif SC'],
  'bamboo-slip': ['Ma Shan Zheng', 'ZCOOL XiaoWei'],
  'silk-scroll': ['ZCOOL QingKe HuangYou', 'Liu Jian Mao Cao'],
  'porcelain': ['Noto Serif SC'],
  'bronze': ['ZCOOL KuaiLe', 'Ma Shan Zheng'],
  'seal': ['ZCOOL XiaoWei'],
};

/** 已加载的字体集合（去重） */
const loadedFonts = new Set<string>();

/** 动态注入 Google Fonts <link> */
function injectFontLink(font: string): void {
  if (loadedFonts.has(font)) return;
  loadedFonts.add(font);

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    font
  ).replace(/%20/g, '+')}:wght@400;700&display=swap`;
  document.head.appendChild(link);
}

/**
 * 加载场景所需的所有字体
 * 使用 CSS Font Loading API 确保字体真正可用后再返回
 */
export async function loadSceneFonts(sceneId: SceneId): Promise<void> {
  const fonts = SCENE_FONTS[sceneId];

  // 1. 注入 <link> 标签
  fonts.forEach(injectFontLink);

  // 2. 等待字体加载完成
  try {
    const promises = fonts.map((f) =>
      (document as any).fonts.load(`16px "${f}"`)
    );
    await Promise.all(promises);
    await (document as any).fonts.ready;
  } catch (e) {
    // 字体加载失败不阻塞场景切换
    console.warn(`[SceneSystem] 字体加载失败:`, fonts, e);
  }
}

/** 预加载所有场景字体（后台静默加载，不阻塞） */
export function preloadAllSceneFonts(): void {
  const allFonts = new Set<string>();
  Object.values(SCENE_FONTS).forEach((fonts) => {
    fonts.forEach((f) => allFonts.add(f));
  });
  allFonts.forEach(injectFontLink);
}
