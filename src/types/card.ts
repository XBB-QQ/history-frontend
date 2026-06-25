/**
 * 历史人物卡牌系统 — 类型定义
 * @see history-museum/design/000-future-roadmap.md §方向三 §3.3
 */

export type CardRarity = 'N' | 'R' | 'SR' | 'SSR';

export interface PersonCard {
  id: string;
  name: string;
  dynasty: string;
  role: string;
  emoji: string;
  rarity: CardRarity;
  stats: {
    military: number;
    wisdom: number;
    governance: number;
    charisma: number;
  };
  quote: string;
  bio: string;
  bonds: string[];
  bondName?: string;
  bondEffect?: string;
}

export interface CollectedCard {
  cardId: string;
  count: number;
  collectedAt: number;
}

export interface CardCollection {
  cards: CollectedCard[];
  totalDraws: number;
  points: number;
}

export const RARITY_CONFIG: Record<CardRarity, {
  name: string;
  color: string;
  gradient: string;
  probability: number;
  points: number;
}> = {
  N: {
    name: '普通',
    color: 'text-gray-600',
    gradient: 'from-gray-300 to-gray-400',
    probability: 0.60,
    points: 5,
  },
  R: {
    name: '稀有',
    color: 'text-blue-600',
    gradient: 'from-blue-400 to-blue-600',
    probability: 0.25,
    points: 20,
  },
  SR: {
    name: '史诗',
    color: 'text-purple-600',
    gradient: 'from-purple-400 to-purple-600',
    probability: 0.12,
    points: 50,
  },
  SSR: {
    name: '传说',
    color: 'text-amber-600',
    gradient: 'from-amber-400 to-amber-600',
    probability: 0.03,
    points: 200,
  },
};
