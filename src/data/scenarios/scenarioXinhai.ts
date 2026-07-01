import type { Scenario } from '@/types/scenario';

export const xinhaiScenario: Scenario = {
  id: 'xinhai-revolution',
  title: '武昌起义前的工程营士兵',
  yearDisplay: '公元1911年10月9日',
  dynasty: '清',
  role: '新军工程营第八营士兵',
  background:
    '你是湖北新军工程营第八营的一名普通士兵。革命党人已经在军中潜伏多年，许多士兵加入了共进会或文学社。明天就是起义的日子——但今天意外发生了：革命党人孙武在汉口租界配制炸弹时爆炸，清廷开始搜捕革命党人。',
  dilemma:
    '起义计划暴露，清廷下令搜查新军。你的战友们在讨论：是提前起义（可能准备不足），还是取消起义（可能被清廷逐个清算）？',
  difficulty: 'medium',
  relatedEventUid: 'xin-hai-ge-ming',
  choices: [
    {
      id: 'a',
      text: '提前起义，今晚动手',
      description: '不等命令，立即发动起义',
      outcome: 'historical',
      result:
        '10月10日晚，工程营第八营率先发难，攻占楚望台军械库。其他营随即响应。当晚占领武昌，第二天成立湖北军政府。这是历史上真实的起义——没有总指挥、没有周密计划，但时机到了，挡都挡不住。',
      plausibility: 100,
    },
    {
      id: 'b',
      text: '暂时隐蔽，等待上级命令',
      description: '按兵不动，等革命党人重新组织',
      outcome: 'alternate',
      result:
        '你选择按兵不动。但清廷的搜查越来越严，许多革命党人被捕。两周后，你的战友被逐个调离或逮捕。起义的机会错过了。',
      alternateTimeline:
        '平行推演：如果革命党人没能及时起义，清朝可能再撑几年。但民心的转变是不可逆的——迟早会有另一个人、另一个时间点点燃革命的火药桶。',
      plausibility: 15,
    },
    {
      id: 'c',
      text: '逃离武汉，保全性命',
      description: '请假离营，离开是非之地',
      outcome: 'alternate',
      result:
        '你请假离开武汉。但革命的风暴已经席卷全国——一个月后十七省独立，清朝灭亡。你错过了历史，也错过了改变命运的机会。',
      alternateTimeline:
        '平行推演：你逃到上海，加入了后来的北伐军。虽然没有参与武昌起义，但你可能在另一场战役中成名。',
      plausibility: 30,
    },
    {
      id: 'd',
      text: '向清廷告密，换取赏赐',
      description: '出卖革命党，投靠清廷',
      outcome: 'failed',
      result:
        '你向清廷告密，换得了赏银和升迁。但几个月后清朝灭亡，你成了"叛徒"。在新政权下，你的过去被翻了出来。',
      alternateTimeline:
        '平行推演：告密者可能在短期内获利，但历史的大潮不可阻挡。清朝灭亡后，告密者在新社会中几乎没有立足之地。',
      plausibility: 5,
    },
  ],
  historicalResult:
    '历史上的工程营士兵选择了 A。武昌起义没有总指挥、没有周密计划，是一群普通士兵在意外暴露后的自发行动——但就是这个"意外"，终结了两千年的帝制。',
  lesson:
    '历史有时候不是由伟人创造的，而是由普通人在关键时刻做出的选择改变的。武昌起义告诉我们：时机到了，挡都挡不住。',
};
