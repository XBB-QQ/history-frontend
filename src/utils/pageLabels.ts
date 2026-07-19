// 页面路径 → {emoji, labelKey} 映射
// 数据源：复用 Navbar 的 PRIMARY_NAV + NAV_GROUPS，避免维护两份
// 用法：getPageMeta(path) → {emoji, labelKey} | null

import { PRIMARY_NAV, NAV_GROUPS } from '@/components/layout/Navbar';

interface PageMeta {
  emoji: string;
  labelKey: string;
}

/** 构建 path → meta 查找表 */
const PATH_META: Record<string, PageMeta> = (() => {
  const map: Record<string, PageMeta> = {};
  // 核心导航
  for (const item of PRIMARY_NAV) {
    map[item.path] = { emoji: item.emoji, labelKey: item.labelKey };
  }
  // 分组导航：每个 item 继承组 emoji
  for (const group of NAV_GROUPS) {
    for (const item of group.items) {
      map[item.path] = { emoji: group.emoji, labelKey: item.labelKey };
    }
  }
  return map;
})();

/** 动态路由特殊处理（带 :param 的路由按前缀匹配） */
const DYNAMIC_ROUTE_META: Array<{ prefix: string; meta: PageMeta }> = [
  { prefix: '/topic/', meta: { emoji: '💭', labelKey: 'nav.topic_detail' } },
  { prefix: '/surname/', meta: { emoji: '📊', labelKey: 'nav.surname_detail' } },
  { prefix: '/admin/', meta: { emoji: '🛠', labelKey: 'nav.admin' } },
];

/** 根据路径获取页面元信息（emoji + i18n key），未知路径返回 null */
export function getPageMeta(path: string): PageMeta | null {
  // 精确匹配
  if (PATH_META[path]) return PATH_META[path];
  // 动态路由前缀匹配
  for (const rule of DYNAMIC_ROUTE_META) {
    if (path.startsWith(rule.prefix)) return rule.meta;
  }
  return null;
}
