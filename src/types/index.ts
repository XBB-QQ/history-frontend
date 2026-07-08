import type {
  FrontendEvent,
  FrontendPerson,
  FrontendDynasty,
  FrontendKnowledge,
} from '@/services/api';

// 五千年史馆 — TypeScript 类型定义
// 所有类型从 API 服务层统一导出，确保前后端数据结构一致

export {
  type FrontendEvent as EventItem,
  type FrontendPerson as PersonItem,
  type FrontendDynasty as DynastyItem,
  type FrontendKnowledge as KnowledgeCardItem,
  type DetailType,
} from '@/services/api';

// Re-export named types for convenience
export type { FrontendEvent, FrontendPerson, FrontendDynasty, FrontendKnowledge } from '@/services/api';

// Legacy union type
export type DataType = FrontendEvent | FrontendPerson | FrontendDynasty | FrontendKnowledge;
