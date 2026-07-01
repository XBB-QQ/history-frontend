import type { Scenario } from '@/types/scenario';

export const caochaoScenario: Scenario = {
  id: 'caocao-choice',
  title: '官渡之战前的曹操',
  yearDisplay: '公元200年2月',
  dynasty: '三国',
  role: '曹操',
  background:
    '你是魏武帝曹操。袁绍率十万大军南下，你只有两三万人。官渡对峙三个月，粮草将尽，士兵疲惫。此时谋士许攸来投——他带来了一个关键情报：袁绍的粮草囤积在乌巢，守将淳于琼嗜酒无备。',
  dilemma:
    '你面临一个生死抉择：是坚守不出等袁绍自己退兵，还是冒险奇袭乌巢？',
  difficulty: 'hard',
  relatedEventUid: 'guandu',
  choices: [
    {
      id: 'a',
      text: '亲率五千精兵奇袭乌巢',
      description: '趁夜小路突袭，火烧粮草',
      outcome: 'historical',
      result:
        '你亲率五千精兵，伪装成袁军，口衔枚、马缚口，乘夜从小路突袭乌巢。大火一起，袁绍军心动摇。张郃、高览投降。官渡一战，你以两万兵力击溃袁绍十万大军，奠定了统一北方的基础。',
      plausibility: 100,
    },
    {
      id: 'b',
      text: '坚守不出，等袁绍粮尽自退',
      description: '不与袁军决战，消耗其粮草',
      outcome: 'alternate',
      result:
        '你选择坚守。但粮草只够一个月，一个月后士兵开始逃亡。袁绍趁机发动总攻，你被迫突围。',
      alternateTimeline:
        '平行推演：如果袁绍不急不躁，慢慢消耗你的粮草，你可能撑不过一个月。官渡之战的关键就是"快"——必须在粮尽之前做出决断。',
      plausibility: 20,
    },
    {
      id: 'c',
      text: '分兵偷袭，主力佯攻',
      description: '派夏侯惇佯攻吸引袁绍主力，自己率奇兵绕后',
      outcome: 'alternate',
      result:
        '你派夏侯惇率主力佯攻，自己率精锐绕后。但夏侯惇刚愎自用，中了袁绍伏击，主力大败。你不得不回援，奇袭计划流产。',
      alternateTimeline:
        '平行推演：如果夏侯惇不冒进，佯攻成功，你可能有机会绕到袁绍后方。但用人不当是曹操一生中少见的失误。',
      plausibility: 25,
    },
    {
      id: 'd',
      text: '与袁绍议和，划河而治',
      description: '承认袁绍对河北的控制，以黄河为界分治',
      outcome: 'failed',
      result:
        '你派使者与袁绍议和。袁绍拒绝——他要的不是平分天下，而是灭你。议和破裂后，袁绍加速南下。',
      alternateTimeline:
        '平行推演：即使议和成功，袁绍也不会放过你。他的野心是统一北方，不是与曹操平分秋色。',
      plausibility: 10,
    },
  ],
  historicalResult:
    '历史上的曹操选择了 A。奇袭乌巢是官渡之战的转折点，也是中国历史上最著名的军事冒险之一。',
  lesson:
    '在绝境中，冒险往往比保守更有机会。曹操的奇袭乌巢证明了一个道理：有时候，最大的风险是不冒风险。',
};
