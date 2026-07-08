/**
 * 专题数据索引
 * 首批5个专题：制度(2) + 经济(1) + 军事(1) + 文化(1)
 * 补盲专题3个：女性史 + 边疆史 + 海洋史
 */
import type { Topic } from '@/types/topic';
import { junxianTopic } from './junxian';
import { kejuTopic } from './keju';
import { tangSongCommerceTopic } from './tang-song-commerce';
import { cavalryInfantryTopic } from './cavalry-infantry';
import { ruFaDaoTopic } from './ru-fa-dao';
import { womenHistoryTopic } from './women-history';
import { frontierHistoryTopic } from './frontier-history';
import { maritimeHistoryTopic } from './maritime-history';

export const TOPICS: Topic[] = [
  junxianTopic,
  kejuTopic,
  tangSongCommerceTopic,
  cavalryInfantryTopic,
  ruFaDaoTopic,
  womenHistoryTopic,
  frontierHistoryTopic,
  maritimeHistoryTopic,
];

/** 补盲专题 tag 列表 */
export const BLIND_SPOT_TAGS = ['女性史', '边疆史', '海洋史'] as const;

export function getTopicsByCategory(category: string): Topic[] {
  return TOPICS.filter(t => t.category === category);
}

export function getTopicsByTag(tag: string): Topic[] {
  return TOPICS.filter(t => t.tags.includes(tag));
}

export function findTopicByUid(uid: string): Topic | undefined {
  return TOPICS.find(t => t.uid === uid);
}
