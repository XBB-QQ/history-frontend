/**
 * 全局知识图谱数据构造
 * 基于现有 data/ 目录下的 JSON 数据聚合
 * @see history-museum/design/000-future-roadmap.md §方向六 §6.4
 *
 * 数据来源：history-museum/data/*.json（唯一源）
 * 通过 history-museum/scripts/sync-to-frontend.ps1 同步到本目录
 * 不要直接修改本目录的 JSON，应在 museum/data/ 修改后同步
 */

import dynastiesData from '@/data/core/dynasties.json';
import eventsData from '@/data/core/events.json';
import personsData from '@/data/core/persons.json';
import knowledgeData from '@/data/core/knowledge-cards.json';
import type {
  GraphNode,
  GraphLink,
  KnowledgeGraph,
  NodeType,
} from '@/types/knowledgeGraph';

interface DynastyRaw {
  id: string;
  name: string;
  periodStart?: number;
  periodEnd?: number;
}

interface EventRaw {
  id: string;
  title: string;
  year?: number;
  dynasty?: string;
  category?: string;
  relatedEvents?: string[];
  relatedPersons?: string[];
}

interface PersonRaw {
  id: string;
  name: string;
  dynasty?: string;
  relatedEvents?: string[];
  relatedPersons?: string[];
}

interface KnowledgeRaw {
  id: string;
  title: string;
  relevantEvents?: string[];
  relevantPersons?: string[];
}

export function buildKnowledgeGraph(): KnowledgeGraph {
  const nodes: GraphNode[] = [];
  const links: GraphLink[] = [];

  (dynastiesData as DynastyRaw[]).forEach((d) => {
    nodes.push({
      id: `dynasty:${d.id}`,
      label: d.name,
      type: 'dynasty' as NodeType,
      weight: 5,
      year: d.periodStart,
    });
  });

  (eventsData as EventRaw[]).forEach((e) => {
    nodes.push({
      id: `event:${e.id}`,
      label: e.title,
      type: 'event',
      dynasty: e.dynasty,
      year: e.year,
      weight: e.category === '朝代更迭' ? 4 : 3,
    });
    if (e.dynasty) {
      links.push({
        source: `event:${e.id}`,
        target: `dynasty:${e.dynasty}`,
        relation: 'belongs',
      });
    }
  });

  (personsData as PersonRaw[]).forEach((p) => {
    nodes.push({
      id: `person:${p.id}`,
      label: p.name,
      type: 'person',
      dynasty: p.dynasty,
      weight: 4,
    });
    if (p.dynasty) {
      links.push({
        source: `person:${p.id}`,
        target: `dynasty:${p.dynasty}`,
        relation: 'belongs',
      });
    }
    (p.relatedEvents || []).forEach((eId) => {
      links.push({
        source: `person:${p.id}`,
        target: `event:${eId}`,
        relation: 'participates',
      });
    });
    (p.relatedPersons || []).forEach((otherId) => {
      if (p.id < otherId) {
        links.push({
          source: `person:${p.id}`,
          target: `person:${otherId}`,
          relation: 'related',
        });
      }
    });
  });

  (knowledgeData as KnowledgeRaw[]).forEach((k) => {
    nodes.push({
      id: `knowledge:${k.id}`,
      label: k.title,
      type: 'knowledge',
      weight: 3,
    });
    (k.relevantEvents || []).forEach((eId) => {
      links.push({
        source: `knowledge:${k.id}`,
        target: `event:${eId}`,
        relation: 'related',
      });
    });
    (k.relevantPersons || []).forEach((pId) => {
      links.push({
        source: `knowledge:${k.id}`,
        target: `person:${pId}`,
        relation: 'creates',
      });
    });
  });

  // 同朝代事件并发关系
  const eventsByDynasty = new Map<string, EventRaw[]>();
  (eventsData as EventRaw[]).forEach((e) => {
    if (!e.dynasty) return;
    if (!eventsByDynasty.has(e.dynasty)) eventsByDynasty.set(e.dynasty, []);
    eventsByDynasty.get(e.dynasty)!.push(e);
  });
  eventsByDynasty.forEach((events) => {
    for (let i = 0; i < events.length; i++) {
      for (let j = i + 1; j < events.length; j++) {
        const a = events[i];
        const b = events[j];
        if (a.year && b.year && Math.abs(a.year - b.year) <= 30) {
          links.push({
            source: `event:${a.id}`,
            target: `event:${b.id}`,
            relation: 'concurrent',
          });
        }
      }
    }
  });

  return { nodes, links };
}
