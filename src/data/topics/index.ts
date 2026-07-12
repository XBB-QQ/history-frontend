/**
 * 专题数据索引
 * 首批5个专题：制度(2) + 经济(1) + 军事(1) + 文化(1)
 * 补盲专题4个：女性史 + 边疆史 + 海洋史 + 疫病史
 * 第二批4个专题：丝绸之路 + 汉字演变 + 长城防御 + 疫病与社会
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
import { silkRoadTopic } from './silk-road';
import { hanziEvolutionTopic } from './hanzi-evolution';
import { greatWallTopic } from './great-wall';
import { epidemicHistoryTopic } from './epidemic-history';
import { currencyHistoryTopic } from './currency-history';
import { bureaucracyTopic } from './bureaucracy';
import { grandCanalTopic } from './grand-canal';
import { buddhismChinaTopic } from './buddhism-china';
import { fourInventionsTopic } from './four-inventions';
import { ethnicFusionTopic } from './ethnic-fusion';
import { teaHorseTradeTopic } from './tea-horse-trade';
import { saltIronMonopolyTopic } from './salt-iron-monopoly';
import { militarySystemTopic } from './military-system';
import { patriarchalClanTopic } from './patriarchal-clan';
import { academySystemTopic } from './academy-system';
import { tcmHistoryTopic } from './tcm-history';
import { threeSovereignsFiveEmperorsTopic } from './three-sovereigns-five-emperors';

export const TOPICS: Topic[] = [
  junxianTopic,
  kejuTopic,
  tangSongCommerceTopic,
  cavalryInfantryTopic,
  ruFaDaoTopic,
  womenHistoryTopic,
  frontierHistoryTopic,
  maritimeHistoryTopic,
  silkRoadTopic,
  hanziEvolutionTopic,
  greatWallTopic,
  epidemicHistoryTopic,
  currencyHistoryTopic,
  bureaucracyTopic,
  grandCanalTopic,
  buddhismChinaTopic,
  fourInventionsTopic,
  ethnicFusionTopic,
  teaHorseTradeTopic,
  saltIronMonopolyTopic,
  militarySystemTopic,
  patriarchalClanTopic,
  academySystemTopic,
  tcmHistoryTopic,
  threeSovereignsFiveEmperorsTopic,
];

/** 补盲专题 tag 列表 */
export const BLIND_SPOT_TAGS = ['女性史', '边疆史', '海洋史', '疫病史', '民族史', '上古史'] as const;

export function getTopicsByCategory(category: string): Topic[] {
  return TOPICS.filter(t => t.category === category);
}

export function getTopicsByTag(tag: string): Topic[] {
  return TOPICS.filter(t => t.tags.includes(tag));
}

export function findTopicByUid(uid: string): Topic | undefined {
  return TOPICS.find(t => t.uid === uid);
}
