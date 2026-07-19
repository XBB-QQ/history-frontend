/**
 * 文物数据 service 层
 * 当前实现：本地精选数据
 * 未来可替换为博物馆开放 API（故宫数字文物库 / 国博开放数据）
 *
 * 替换步骤：
 * 1. 修改 fetchRelics / fetchRelicById 内部为 fetch 调用
 * 2. 在后端 history-backend 新增 /api/relics 代理接口（避免 CORS）
 * 3. 数据结构保持 Relic 接口不变，UI 层无需改动
 */
import type { Relic } from '@/types/relic';
import { RELICS } from '@/data/features/relicData';

/** 模拟网络延迟，便于未来 API 切换时 UI 体验保持一致 */
const MOCK_DELAY_MS = 0;

export interface RelicQuery {
  category?: Relic['category'];
  dynasty?: string;
  keyword?: string;
}

/**
 * 获取文物列表（支持分类/朝代/关键词筛选）
 */
export async function fetchRelics(query: RelicQuery = {}): Promise<Relic[]> {
  await mockDelay();
  let result = RELICS;
  if (query.category) {
    result = result.filter((r) => r.category === query.category);
  }
  if (query.dynasty) {
    result = result.filter((r) => r.dynasty === query.dynasty);
  }
  if (query.keyword) {
    const kw = query.keyword.toLowerCase();
    result = result.filter(
      (r) =>
        r.name.toLowerCase().includes(kw) ||
        r.summary.toLowerCase().includes(kw) ||
        r.tags.some((t) => t.toLowerCase().includes(kw)),
    );
  }
  return result;
}

/**
 * 获取文物详情
 */
export async function fetchRelicById(id: string): Promise<Relic | null> {
  await mockDelay();
  return RELICS.find((r) => r.id === id) || null;
}

/**
 * 获取所有文物分类（用于筛选 UI）
 */
export function getRelicCategories(): { id: Relic['category']; name: string }[] {
  return [
    { id: 'bronze', name: '青铜' },
    { id: 'jade', name: '玉器' },
    { id: 'ceramic', name: '陶瓷' },
    { id: 'gold-silver', name: '金银' },
    { id: 'silk', name: '丝织' },
    { id: 'bamboo', name: '竹木' },
    { id: 'bone', name: '骨甲' },
  ];
}

function mockDelay(): Promise<void> {
  if (MOCK_DELAY_MS === 0) return Promise.resolve();
  return new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));
}
