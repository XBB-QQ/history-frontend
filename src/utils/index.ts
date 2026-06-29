import type { EventItem, PersonItem, DynastyItem, KnowledgeCardItem } from '@/types';

/** 从 JSON 数据加载事件 */
export async function loadEvents(): Promise<EventItem[]> {
  const mod = await import('@/data/core/events.json');
  return mod.default as EventItem[];
}

/** 从 JSON 数据加载人物 */
export async function loadPersons(): Promise<PersonItem[]> {
  const mod = await import('@/data/core/persons.json');
  return mod.default as PersonItem[];
}

/** 从 JSON 数据加载朝代 */
export async function loadDynasties(): Promise<DynastyItem[]> {
  const mod = await import('@/data/core/dynasties.json');
  return mod.default as DynastyItem[];
}

/** 从 JSON 数据加载知识卡片 */
export async function loadKnowledgeCards(): Promise<KnowledgeCardItem[]> {
  const mod = await import('@/data/core/knowledge-cards.json');
  return mod.default as KnowledgeCardItem[];
}

/** 根据 ID 查找事件 */
export function findEvent(events: EventItem[], id: string): EventItem | undefined {
  return events.find((e) => e.id === id);
}

/** 根据 ID 查找人物 */
export function findPerson(persons: PersonItem[], id: string): PersonItem | undefined {
  return persons.find((p) => p.id === id);
}
