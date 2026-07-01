/**
 * 专题数据索引
 * 首批5个专题：制度(2) + 经济(1) + 军事(1) + 文化(1)
 */
import type { Topic } from '@/types/topic';
import { junxianTopic } from './junxian';
import { kejuTopic } from './keju';
import { tangSongCommerceTopic } from './tang-song-commerce';
import { cavalryInfantryTopic } from './cavalry-infantry';
import { ruFaDaoTopic } from './ru-fa-dao';

export const TOPICS: Topic[] = [
  junxianTopic,
  kejuTopic,
  tangSongCommerceTopic,
  cavalryInfantryTopic,
  ruFaDaoTopic,
];

export function getTopicsByCategory(category: string): Topic[] {
  return TOPICS.filter(t => t.category === category);
}

export function findTopicByUid(uid: string): Topic | undefined {
  return TOPICS.find(t => t.uid === uid);
}
