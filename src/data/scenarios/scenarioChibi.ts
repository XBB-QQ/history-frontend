import type { Scenario } from '@/types/scenario';

export const chibiScenario: Scenario = {
  id: 'chibi',
  title: '赤壁前夕的孙权',
  yearDisplay: '公元208年冬',
  dynasty: '三国',
  role: '孙权',
  background:
    '你是江东之主孙权，年仅26岁。曹操率八十万大军南下，号称百万，已占领荆州，刘备败走夏口。江东文臣多主降，武将多主战。鲁肃建议联合刘备抗曹，周瑜已从鄱阳湖赶回。',
  dilemma:
    '朝堂之上，张昭等文臣力主投降，认为"曹公豺虎也，挟天子以征四方，动以朝廷为辞"。周瑜则分析曹军虚实，认为可一战而破。你拔剑斩案角："诸将有言降操者，与此案同！"——但剑已落下，你还要做最终决断——',
  difficulty: 'medium',
  relatedEventUid: 'chibi-battle',
  choices: [
    {
      id: 'a',
      text: '联刘抗曹，决战赤壁',
      description: '命周瑜为大都督，程普为副，率军三万联合刘备',
      outcome: 'historical',
      result:
        '你任命周瑜为大都督，率精兵三万联合刘备。赤壁一战，火攻大破曹军。曹操北逃，三分天下之势成矣。你保住江东基业，为日后称帝奠基。',
      plausibility: 100,
    },
    {
      id: 'b',
      text: '献江东而降，保全富贵',
      description: '接受张昭建议，向曹操称臣',
      outcome: 'alternate',
      result:
        '你遣使投降，曹操封你为会稽太守。江东世家保全了产业，但你失去了自主权。',
      alternateTimeline:
        '平行推演：曹操稳定南方后，逐步削夺江东世族权力。你被征入朝为官，实质是软禁。江东沦为曹魏的一个州郡，孙氏基业终结。三国鼎立未曾出现，中国提前统一。',
      plausibility: 30,
    },
    {
      id: 'c',
      text: '中立观望，两不得罪',
      description: '既不降曹，也不联刘，闭境自守',
      outcome: 'alternate',
      result:
        '你宣布中立。曹操击败刘备后，转而专攻江东。没有了孙刘联军，周瑜独木难支。',
      alternateTimeline:
        '平行推演：曹操分兵多路进攻，江东腹背受敌。三个月后建业陷落，你被俘。曹操虽善待你，但江东基业尽失。',
      plausibility: 20,
    },
    {
      id: 'd',
      text: '联刘抗曹，但亲自统兵',
      description: '不用周瑜，自己担任大都督',
      outcome: 'failed',
      result:
        '你年轻气盛，决定亲自统兵。然而你缺乏实战经验，指挥混乱。赤壁之战中，你未能及时响应周瑜建议，战机延误。',
      alternateTimeline:
        '平行推演：曹军抓住战机反攻，孙刘联军溃败。你退守会稽，最终仍难逃灭亡命运。英雄出少年，但少年未必是英雄。',
      plausibility: 10,
    },
  ],
  historicalResult:
    '历史上的孙权选择了 A。赤壁之战成为以少胜多的经典战役，奠定了三国鼎立格局。孙权后称帝建立东吴，在位52年，是三国最长寿的君主之一。',
  lesson:
    '年轻不是软弱的理由。孙权26岁做出抗曹决策，体现了识人善任（用周瑜）和决断力。有时候，选择比能力更重要。',
};
