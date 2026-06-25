/**
 * 历史决策模拟器 — 剧本数据
 * @see history-museum/design/000-future-roadmap.md §方向三 §3.1
 */

import type { Scenario } from '@/types/scenario';
import { xuanwuScenario } from './scenarioXuanwu';
import { yuefeiScenario } from './scenarioYuefei';
import { chibiScenario } from './scenarioChibi';
import { shangyangScenario } from './scenarioShangyang';
import { jingkangScenario } from './scenarioJingkang';

export const SCENARIOS: Scenario[] = [
  xuanwuScenario,
  yuefeiScenario,
  chibiScenario,
  shangyangScenario,
  jingkangScenario,
];
