import type { Scenario } from '@/types/scenario';

export const hongwuScenario: Scenario = {
  id: 'hongwu-succession',
  title: '洪武晚年：皇位继承人的选择',
  yearDisplay: '公元1392年',
  dynasty: '明',
  role: '明太祖朱元璋',
  background:
    '你是大明皇帝朱元璋。出身贫寒，你从一个乞丐、和尚、红巾军士兵，一步步走到皇帝的位置。你诛杀功臣、整顿吏治、建立锦衣卫，为大明的长治久安打下了基础。但现在，你的皇太子朱标去世了——他是你最信任的继承人，宽厚仁慈，深得民心。',
  dilemma:
    '太子朱标已于今年春天病逝。你面临一个艰难选择：立年幼的皇太孙朱允炆，还是分封在各处的儿子们（尤其是手握重兵的第四子朱棣）？',
  difficulty: 'hard',
  relatedEventUid: 'hongwu-death',
  choices: [
    {
      id: 'a',
      text: '立皇太孙朱允炆',
      description: '按嫡长子继承制，立朱标的儿子朱允炆',
      outcome: 'historical',
      result:
        '你最终选择了皇太孙朱允炆。但你知道这个年轻人太柔弱——你的儿子们都虎视眈眈，尤其是燕王朱棣。你在临终前诛杀了可能威胁太孙的功臣，但这也让朱允炆失去了有力的辅佐。四年后，朱棣发动靖难之役，攻入南京。',
      plausibility: 100,
    },
    {
      id: 'b',
      text: '立燕王朱棣',
      description: '跳过孙子，直接立最有能力的儿子',
      outcome: 'alternate',
      result:
        '你决定立朱棣为继承人。朱棣军事才能出众，在北方经营多年，深得军心。但他野心勃勃，你可能是在养虎为患。',
      alternateTimeline:
        '平行推演：如果朱棣继位，他可能会提前二十年发动"靖难"——只不过这次是合法的。大明可能更早走向对外扩张，但内部斗争也会更残酷。',
      plausibility: 40,
    },
    {
      id: 'c',
      text: '分封诸王，共同辅政',
      description: '不设单一继承人，让几个儿子共同治理',
      outcome: 'failed',
      result:
        '你决定不让一人独大，而是让几个儿子轮流执政。但权力斗争不可避免——三个月内，两个皇子被杀，朝堂大乱。',
      alternateTimeline:
        '平行推演：分权设计听起来合理，但在皇权体制下，"共同治理"最终会变成"轮流厮杀"。',
      plausibility: 5,
    },
    {
      id: 'd',
      text: '立年龄最长的儿子朱橚',
      description: '按长幼有序，立第五子周王朱橚',
      outcome: 'alternate',
      result:
        '你选择周王朱橚。但他性格懦弱，不善军事。藩王们不服，功臣们也观望。',
      alternateTimeline:
        '平行推演：一个懦弱的皇帝可能让权臣（如李善长后代）或藩王（如朱棣）趁机夺权。大明可能提前进入权臣时代。',
      plausibility: 20,
    },
  ],
  historicalResult:
    '历史上的朱元璋选择了 A。他立了皇太孙朱允炆，并在临终前诛杀了潜在威胁。但这个决定最终导致了靖难之役——他亲手建立的制度，被他自己的孙子打破了。',
  lesson:
    '朱元璋一生精明强干，却在继承人的选择上犯了致命的错误。他以为杀掉功臣就能保护皇太孙，却忘了——真正能保护皇太孙的，恰恰是他杀的这些人。',
};
