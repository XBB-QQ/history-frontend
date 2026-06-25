import type { Scenario } from '@/types/scenario';

export const jingkangScenario: Scenario = {
  id: 'jingkang',
  title: '金兵围城的宋钦宗',
  yearDisplay: '公元1126年闰十一月',
  dynasty: '北宋',
  role: '宋钦宗赵桓',
  background:
    '你是北宋皇帝赵桓。金兵第二次南下，已包围汴京。城中兵少粮乏，勤王之师未至。郭京自称能施"六甲法"召神兵，要求率七千七百七十七人出城退敌。父皇徽宗已仓皇南逃。',
  dilemma:
    '城外金兵攻势日急，郭京坚持要开宣化门施法。大臣们有的反对，有的将信将疑。你作为天子，必须决断——',
  difficulty: 'easy',
  relatedEventUid: 'jingkang-incident',
  choices: [
    {
      id: 'a',
      text: '信任郭京，开城门施法',
      description: '让郭京率六甲神兵出城退敌',
      outcome: 'historical',
      result:
        '你轻信郭京妖言，开宣化门。郭京的"神兵"一战溃败，金军趁势攻入城中。汴京陷落，你与父皇徽宗被俘。靖康之变发生，北宋灭亡。',
      plausibility: 100,
    },
    {
      id: 'b',
      text: '拒绝妖言，坚守城池',
      description: '处死郭京，依靠正规军死守',
      outcome: 'alternate',
      result:
        '你处死郭京，令姚仲友、吴革等将领死守。城池勉强守住，等待勤王之师。',
      alternateTimeline:
        '平行推演：康王赵构（后来的宋高宗）在相州组织勤王军，二十日后抵达汴京。金军粮草不济，被迫撤退。北宋延续，但你因守城无能被迫禅让给赵构。',
      plausibility: 50,
    },
    {
      id: 'c',
      text: '弃城南逃，迁都江南',
      description: '趁夜突围，迁都建康（南京）',
      outcome: 'alternate',
      result:
        '你率宗室南逃。汴京百姓遭金军屠戮，但宋室正统得以保全。',
      alternateTimeline:
        '平行推演：虽然失去中原，但南方政权完整。赵构无需经历海上逃亡之苦，南宋国力更强。但"弃民南逃"的骂名将伴随你一生。',
      plausibility: 35,
    },
    {
      id: 'd',
      text: '御驾亲征，决死一战',
      description: '皇帝亲临城头督战，激励士气',
      outcome: 'alternate',
      result:
        '你披甲登城，宋军士气大振。金军强攻三日不克，被迫退兵十里。然而你也在守城战中身负箭伤。',
      alternateTimeline:
        '平行推演：你成为英雄皇帝，但箭伤复发，次年病逝。弟赵构继位，利用你积累的声望稳定局势，北宋延续。虽然失去河北部分领土，但避免了靖康之耻。',
      plausibility: 20,
    },
  ],
  historicalResult:
    '历史上的宋钦宗选择了 A。他轻信妖人郭京，导致汴京陷落。靖康之变成为汉民族千年耻辱，徽钦二帝被掳至五国城，客死他乡。',
  lesson:
    '在国家危亡之际，迷信和逃避都不是出路。宋钦宗的失败，是判断力的失败，更是责任感的失败。一个皇帝，不能把命运交给神棍。',
};
