/**
 * 全局知识图谱 — 类型定义
 * 所有实体（朝代/事件/人物/知识卡片）作为节点，关系为边
 * @see history-museum/design/000-future-roadmap.md §方向六 §6.4
 */

export type NodeType = 'dynasty' | 'event' | 'person' | 'knowledge';

export interface GraphNode {
  id: string;
  label: string;
  type: NodeType;
  /** 所属朝代（用于着色） */
  dynasty?: string;
  /** 年份（用于排序） */
  year?: number;
  /** 节点大小权重 1-5 */
  weight: number;
}

export type RelationType =
  | 'belongs'        // 事件/人物属于朝代
  | 'participates'   // 人物参与事件
  | 'related'        // 事件相关
  | 'creates'        // 人物创作知识卡片
  | 'concurrent';    // 同时期

export interface GraphLink {
  source: string;
  target: string;
  relation: RelationType;
}

export interface KnowledgeGraph {
  nodes: GraphNode[];
  links: GraphLink[];
}

/** 节点类型样式配置 */
export const NODE_STYLES: Record<NodeType, {
  color: string;
  size: number;
  label: string;
  emoji: string;
}> = {
  dynasty: {
    color: '#c23b22',
    size: 28,
    label: '朝代',
    emoji: '🏯',
  },
  event: {
    color: '#b8941d',
    size: 18,
    label: '事件',
    emoji: '📜',
  },
  person: {
    color: '#2e5a88',
    size: 20,
    label: '人物',
    emoji: '👤',
  },
  knowledge: {
    color: '#3a5f5a',
    size: 22,
    label: '知识',
    emoji: '📚',
  },
};

/** 关系类型样式配置 */
export const LINK_STYLES: Record<RelationType, {
  color: string;
  label: string;
  dashed?: boolean;
}> = {
  belongs: { color: '#c23b22', label: '属于' },
  participates: { color: '#2e5a88', label: '参与' },
  related: { color: '#999', label: '相关', dashed: true },
  creates: { color: '#3a5f5a', label: '相关' },
  concurrent: { color: '#b8941d', label: '同期', dashed: true },
};
