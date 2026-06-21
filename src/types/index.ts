// 五千年史馆 — TypeScript 类型定义

export interface EventItem {
  id: string;
  title: string;
  year: number | null;
  yearDisplay: string;
  yearPrecision: 'exact' | 'approx' | 'range';
  category: string;
  dynasty: string;
  description: string;
  fulltext: string;
  tags: string[];
  relatedEvents: string[];
  relatedPersons: string[];
  source: string;
  crawlDate: string;
}

export interface PersonItem {
  id: string;
  name: string;
  courtesyName: string;
  dynasty: string;
  years: [number | null, number | null];
  yearsDisplay: string;
  gender: 'male' | 'female' | 'unknown';
  roles: string[];
  quote: string;
  bio: string;
  tags: string[];
  relatedEvents: string[];
  relatedPersons: string[];
  source: string;
  crawlDate: string;
}

export interface DynastyItem {
  id: string;
  name: string;
  period: string;
  periodStart: number | null;
  periodEnd: number | null;
  periodPrecision: string;
  founder: string;
  capital: string;
  duration: string;
  durationYears: number | null;
  highlights: string;
  description: string;
  fallReason: string;
  legacy: string;
  relatedEvents: string[];
  relatedPersons: string[];
  source: string;
  crawlDate: string;
}

export interface KnowledgeCardItem {
  id: string;
  title: string;
  startYear: number | null;
  startYearDisplay: string;
  dynasty: string;
  description: string;
  fulltext: string;
  tags: string[];
  relevantEvents: string[];
  relevantPersons: string[];
  meta: string;
  source: string;
  crawlDate: string;
}

export type DataType = EventItem | PersonItem | DynastyItem | KnowledgeCardItem;

export type DetailType = 'event' | 'person' | 'dynasty' | 'knowledge';
