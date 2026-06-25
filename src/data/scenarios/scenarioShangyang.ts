import type { Scenario } from '@/types/scenario';

export const shangyangScenario: Scenario = {
  id: 'shang-yang',
  title: '商鞅变法的抉择',
  yearDisplay: '公元前356年',
  dynasty: '战国·秦',
  role: '商鞅',
  background:
    '你是卫国公族商鞅，受秦孝公求贤令召入秦国。秦国偏居西陲，被中原诸侯视为蛮夷。孝公支持你变法，但旧贵族以甘龙、杜挚为首激烈反对，认为"法古无过，循礼无邪"。',
  dilemma:
    '孝公召你入朝议论变法。甘龙当庭质问："圣人不易民而教，智者不变法而治。"你如何回应？这将决定变法能否推行——',
  difficulty: 'medium',
  relatedEventUid: 'shang-yang-reform',
  choices: [
    {
      id: 'a',
      text: '据理力争，主张变法',
      description: '反驳"前世不同教，何古之法？帝王不相复，何礼之循？"',
      outcome: 'historical',
      result:
        '你雄辩滔滔："治世不一道，便国不法古。"孝公大悦，任命你为左庶长，推行变法。废井田、开阡陌、重农桑、奖军功，秦国十年之间国富兵强。',
      plausibility: 100,
    },
    {
      id: 'b',
      text: '妥协求稳，小步改革',
      description: '保留部分旧制，只做温和调整',
      outcome: 'alternate',
      result:
        '你与旧贵族妥协，只推行了减轻赋税等温和措施。秦国国力略有提升，但根本问题未解。',
      alternateTimeline:
        '平行推演：秦国继续被魏国压制，丢失河西之地。孝公死后，秦国更加衰弱。百年后秦始皇统一六国的伟业，或许要推迟数百年，甚至永远不会发生。',
      plausibility: 25,
    },
    {
      id: 'c',
      text: '放弃变法，回归卫国',
      description: '见阻力太大，辞职回国',
      outcome: 'failed',
      result:
        '你见变法无望，辞职归卫。秦国继续衰落，你也在历史中湮没无闻。',
      alternateTimeline: '没有商鞅变法，秦国不可能统一六国。中华文明的走向将完全不同。',
      plausibility: 5,
    },
    {
      id: 'd',
      text: '勾结魏国，颠覆秦国',
      description: '将秦国情报卖给魏国，谋取私利',
      outcome: 'failed',
      result:
        '你的叛变被秦孝公发现，车裂而死。你成为历史的笑柄，遗臭万年。',
      alternateTimeline: '叛徒从来不会有好下场，无论在哪个时代。',
      plausibility: 0,
    },
  ],
  historicalResult:
    '历史上的商鞅选择了 A。变法使秦国强大，但他本人因得罪太子（后来的秦惠文王），孝公死后被车裂而死。法立身死，却是历史最常见的悲剧。',
  lesson:
    '改革者往往没有好下场，但改革本身可以改变历史。商鞅变法奠定了秦国统一六国的基础，影响中国两千年。',
};
