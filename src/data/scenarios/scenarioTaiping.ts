import type { Scenario } from '@/types/scenario';

export const taipingScenario: Scenario = {
  id: 'taiping-rebellion',
  title: '金田起义前的洪秀全',
  yearDisplay: '公元1851年1月',
  dynasty: '清',
  role: '洪秀全',
  background:
    '你是洪秀全，拜上帝会的创始人。你多次科举落榜，在绝望中读到基督教传教小册子《劝世良言》，从此自称是上帝的次子、耶稣的弟弟。你回到广西农村传教，吸引了大量贫苦农民加入。现在，官府的压迫已经到了极限——你决定起事。',
  dilemma:
    '广西天地会、瑶民、贫农都已经聚集在你身边。但力量分散、装备落后。你要如何选择起事策略？',
  difficulty: 'medium',
  relatedEventUid: 'taiping-rebellion',
  choices: [
    {
      id: 'a',
      text: '在金田正式起义，建立"太平天国"',
      description: '公开宣布建国号，与清廷分庭抗礼',
      outcome: 'historical',
      result:
        '你在金田村正式起义，建号"太平天国"。起义军迅速发展到十万人，攻占永安后分封五王。随后北伐西征，一度占领南京并定都于此（改名天京）。太平天国控制了半个中国，但最终在1864年被曾国藩的湘军攻陷天京。',
      plausibility: 100,
    },
    {
      id: 'b',
      text: '秘密发展，等待时机',
      description: '不急于建国号，先暗中壮大势力',
      outcome: 'alternate',
      result:
        '你决定暂不起事，继续秘密传教。但清廷发现了拜上帝会的活动，开始大规模搜捕。',
      alternateTimeline:
        '平行推演：如果继续秘密发展，可能避免清廷的早期打击。但太平天国的群众基础是贫苦农民——他们等不了。',
      plausibility: 30,
    },
    {
      id: 'c',
      text: '联合天地会，组成联军',
      description: '与广西各地的反清势力联合，共同起事',
      outcome: 'alternate',
      result:
        '你与天地会、瑶民武装联合，组成了庞大的联军。但各路势力各有打算——天地会要抢地盘，瑶民要自治，你的拜上帝会要建国。',
      alternateTimeline:
        '平行推演：联军初期声势浩大，但内部分裂更快。没有统一指挥的联军，最终会被清廷各个击破。',
      plausibility: 25,
    },
    {
      id: 'd',
      text: '北上中原，直取北京',
      description: '不走广西根据地，直接率军北上',
      outcome: 'failed',
      result:
        '你决定放弃广西，直接率军北上。但长途奔袭需要充足的补给——而你的军队大多是没有战斗经验的农民。',
      alternateTimeline:
        '平行推演：太平天国后来确实派了林凤祥、李开芳北伐，但孤军深入、补给不继，最终全军覆没。',
      plausibility: 10,
    },
  ],
  historicalResult:
    '历史上的洪秀全选择了 A。金田起义拉开了太平天国运动的序幕——这是一场持续十四年、波及半个中国的农民起义。它动摇了清朝的统治根基，也为后来的辛亥革命埋下了伏笔。',
  lesson:
    '洪秀全的悲剧在于：他有一个改变中国的愿景，却没有实现这个愿景的能力。太平天国提出的《资政新篇》是中国第一个资本主义改革方案，但在他手里，它变成了一场宗教狂热驱动的农民战争。',
};
