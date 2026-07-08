/**
 * 历史画像报告计算工具
 * 基于用户行为数据计算 4 维度画像并匹配历史人物
 * @see history-museum/design/000-future-roadmap.md §方向五 §5.2
 */

import type { DimensionKey } from '@/data/core/personalityMatches';
import type { UserDTO } from '@/services/userApi';

export interface FavoriteEntryLike {
  id: string;
  type: 'event' | 'person' | 'dynasty' | 'knowledge';
  title: string;
}

export interface DimensionScore {
  key: DimensionKey;
  score: number;
  /** 0-100 归一化分值 */
  normalized: number;
}

export interface ProfileReport {
  dimensions: DimensionScore[];
  dominantDimension: DimensionKey;
  totalScore: number;
  level: string;
  matchCount: number;
  hasData: boolean;
}

/** 从事件标题/分类推断维度（简化版，因为收藏数据里只有 title） */
function inferDimensionFromTitle(title: string): DimensionKey | null {
  // 关键词匹配
  const governanceKeywords = ['治', '政', '法', '变', '制', '盛', '中兴', '改革', '统一'];
  const martialKeywords = ['战', '征', '伐', '军', '兵', '乱', '起义', '入侵', '之变', '之战'];
  const wisdomKeywords = ['谋', '计', '策', '略', '智'];
  const eruditionKeywords = ['文', '学', '诗', '书', '艺', '思想', '发明', '学术'];

  for (const k of governanceKeywords) if (title.includes(k)) return 'governance';
  for (const k of martialKeywords) if (title.includes(k)) return 'martial';
  for (const k of wisdomKeywords) if (title.includes(k)) return 'wisdom';
  for (const k of eruditionKeywords) if (title.includes(k)) return 'erudition';
  return null;
}

/**
 * 计算用户画像
 */
export function computeProfile(
  user: UserDTO | null,
  favorites: FavoriteEntryLike[]
): ProfileReport {
  // 基础数据
  const score = user?.score ?? 0;
  const quizzesAnswered = user?.quizzesAnswered ?? 0;
  const quizzesCorrect = user?.quizzesCorrect ?? 0;
  const accuracy = quizzesAnswered > 0 ? quizzesCorrect / quizzesAnswered : 0;

  // 收藏分类
  const eventFavorites = favorites.filter((f) => f.type === 'event');
  const personFavorites = favorites.filter((f) => f.type === 'person');
  const dynastyFavorites = favorites.filter((f) => f.type === 'dynasty');
  const knowledgeFavorites = favorites.filter((f) => f.type === 'knowledge');

  // 维度原始分计算
  let governance = 0;
  let martial = 0;
  let wisdom = 0;
  let erudition = 0;

  // 从收藏事件标题推断维度
  eventFavorites.forEach((f) => {
    const dim = inferDimensionFromTitle(f.title);
    if (dim === 'governance') governance += 15;
    else if (dim === 'martial') martial += 15;
    else if (dim === 'wisdom') wisdom += 15;
    else if (dim === 'erudition') erudition += 15;
  });

  // 答题智略分
  wisdom += score * 0.5 + quizzesCorrect * 5;

  // 博学分：收藏广度
  const uniqueTypes = new Set(favorites.map((f) => f.type)).size;
  erudition += uniqueTypes * 15 + favorites.length * 2;
  erudition += personFavorites.length * 8;
  erudition += dynastyFavorites.length * 10;
  erudition += knowledgeFavorites.length * 12;

  // 文治加成：答题准确率
  governance += accuracy * 30;

  // 武功加成：答题数
  martial += quizzesAnswered * 3;

  const dimensions: DimensionScore[] = [
    { key: 'governance', score: governance, normalized: 0 },
    { key: 'martial', score: martial, normalized: 0 },
    { key: 'wisdom', score: wisdom, normalized: 0 },
    { key: 'erudition', score: erudition, normalized: 0 },
  ];

  // 归一化到 0-100
  const maxScore = Math.max(...dimensions.map((d) => d.score), 1);
  dimensions.forEach((d) => {
    d.normalized = Math.min(100, Math.round((d.score / maxScore) * 100));
  });

  // 主导维度
  const dominant = dimensions.reduce((max, d) =>
    d.score > max.score ? d : max
  );

  const totalScore = Math.round(
    dimensions.reduce((sum, d) => sum + d.score, 0)
  );

  // 等级
  let level = '史馆新客';
  if (totalScore > 500) level = '青史探者';
  if (totalScore > 1500) level = '史海舟人';
  if (totalScore > 3000) level = '史馆编修';
  if (totalScore > 6000) level = '翰林学士';
  if (totalScore > 12000) level = '太史令';

  const hasData = quizzesAnswered > 0 || favorites.length > 0;

  return {
    dimensions,
    dominantDimension: dominant.key,
    totalScore,
    level,
    matchCount: favorites.length + quizzesAnswered,
    hasData,
  };
}

/** 格式化日期为 YYYY-MM-DD */
export function formatDate(ts: number): string {
  const d = new Date(ts);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
