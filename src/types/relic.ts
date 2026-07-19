/**
 * 文物与考古数据 — 精选代表性文物
 * 每件文物绑定：出土背景 + 工艺解读 + 现藏地
 *
 * 数据来源：本地精选 6 件代表性文物
 * service 层（relicApi.ts）封装数据访问，未来可替换为博物馆开放 API
 */

export interface Relic {
  id: string;
  name: string;
  dynasty: string;
  year: string;
  category: 'bronze' | 'jade' | 'ceramic' | 'gold-silver' | 'silk' | 'bamboo' | 'bone';
  /** 出土背景 */
  excavation: {
    site: string;
    location: string;
    year: string;
    context: string;
  };
  /** 工艺解读 */
  craftsmanship: string;
  /** 现藏地 */
  collection: string;
  /** 文物等级 */
  grade: '一级' | '国宝级';
  /** 简介 */
  summary: string;
  /** 文化意义 */
  significance: string;
  /** 高清图 URL */
  imageUrl?: string;
  tags: string[];
}
