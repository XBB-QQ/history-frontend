/**
 * 历史决策模拟器 — 剧本数据
 * 14 个剧本，覆盖先秦→近代
 * @see history-museum/design/000-future-roadmap.md §方向三 §3.1
 */

import type { Scenario } from '@/types/scenario';
import { xuanwuScenario } from './scenarioXuanwu';
import { yuefeiScenario } from './scenarioYuefei';
import { chibiScenario } from './scenarioChibi';
import { shangyangScenario } from './scenarioShangyang';
import { jingkangScenario } from './scenarioJingkang';
import { opiumScenario } from './scenarioOpium';
import { wuxuScenario } from './scenarioWuxu';
import { shangyangReformScenario } from './scenarioShangyangNew';
import { jingkangCrisisScenario } from './scenarioJingkangNew';
import { xinhaiScenario } from './scenarioXinhai';
import { caochaoScenario } from './scenarioCaocao';
import { zhugeScenario } from './scenarioZhuge';
import { hongwuScenario } from './scenarioHongwu';
import { taipingScenario } from './scenarioTaiping';

export const SCENARIOS: Scenario[] = [
  xuanwuScenario,
  yuefeiScenario,
  chibiScenario,
  shangyangScenario,
  jingkangScenario,
  opiumScenario,
  wuxuScenario,
  shangyangReformScenario,
  jingkangCrisisScenario,
  xinhaiScenario,
  caochaoScenario,
  zhugeScenario,
  hongwuScenario,
  taipingScenario,
];
