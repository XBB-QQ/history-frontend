/**
 * 跨时空辩论 — 辩论人物对应数据
 * 每个辩论话题配两个历史人物，作为正反方辩手
 */

import type { DebateTopic } from '@/data/debateTopics';

export interface DebateFigurePair {
  topicId: string;
  /** 正方辩手 — 来自 figures.ts 的 id */
  proFigureId: string;
  /** 反方辩手 — 来自 figures.ts 的 id */
  conFigureId: string;
  /** 正方立场说明 */
  proStance: string;
  /** 反方立场说明 */
  conStance: string;
}

export const DEBATE_FIGURE_PAIRS: DebateFigurePair[] = [
  {
    topicId: 'qinshi-standardize',
    proFigureId: 'yingzheng',
    conFigureId: 'confucius',
    proStance: '统一六国、统一文字度量衡是划时代进步，结束了数百年战乱分裂',
    conStance: '焚书坑儒摧毁文化多样性，严刑峻法使人民恐惧，仁义礼治才是正道',
  },
  {
    topicId: 'wanganshi-reform',
    proFigureId: 'sushi',
    conFigureId: 'zhugeliang',
    proStance: '变法虽执行有问题，但理念先进，利国利民的方向没错',
    conStance: '改革需审时度势、稳扎稳打，激进变法反而撕裂朝政，应以治国之慎处之',
  },
  {
    topicId: 'yuefei-return',
    proFigureId: 'yuefei',
    conFigureId: 'zhugeliang',
    proStance: '收复中原是民族尊严，岳家军战力足以直捣黄龙，忠义不可妥协',
    conStance: '北伐需权衡国力与时机，冒进可能耗尽国本，治国与军事须统筹兼顾',
  },
  {
    topicId: 'yongzheng-legitimacy',
    proFigureId: 'yingzheng',
    conFigureId: 'confucius',
    proStance: '雍正治国有方，康熙遗诏满文无法篡改，继位合法无疑',
    conStance: '继位过程不够透明，有违礼制，皇权应受道德与制度约束',
  },
  {
    topicId: 'ming-seaban',
    proFigureId: 'yingzheng',
    conFigureId: 'sushi',
    proStance: '海禁是维护国家安全和稳定的合理选择，集中力量应对北方威胁',
    conStance: '闭关锁国错失了大航海时代，开放交流才能带来进步与繁荣',
  },
];
