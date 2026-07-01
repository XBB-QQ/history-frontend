import type { Scenario } from '@/types/scenario';

export const jingkangCrisisScenario: Scenario = {
  id: 'jingkang-crisis',
  title: '靖康之变前的宋钦宗',
  yearDisplay: '公元1126年冬',
  dynasty: '北宋',
  role: '宋钦宗赵桓',
  background:
    '你是北宋皇帝宋钦宗。父亲宋徽宗退位后你当了十七个月皇帝。金军分两路南下，东路已围开封。城内粮草只够十天，军民人心惶惶。你面前有两条路：死守开封，还是南逃临安？',
  dilemma:
    '金军主帅斡离不要求你亲赴金营议和。去，可能成为俘虏；不去，金军攻城。朝堂上主战主和两派争执不休——你该如何抉择？',
  difficulty: 'hard',
  relatedEventUid: 'jingkang-incident',
  choices: [
    {
      id: 'a',
      text: '亲赴金营，争取谈判时间',
      description: '以皇帝身份赴金营议和，为守城争取时间',
      outcome: 'historical',
      result:
        '你亲赴金营，被扣为人质。城内群龙无首，金军趁机攻城。开封陷落，你和父亲徽宗一起被俘北去。靖康之耻，千古之辱。但你的勇气赢得了部分史学家的同情——"非不为也，是不能也"。',
      plausibility: 100,
    },
    {
      id: 'b',
      text: '死守开封，动员全城军民',
      description: '号召全城百姓一起守城，背水一战',
      outcome: 'alternate',
      result:
        '你动员开封军民，李纲率众死守。金军攻城一个月不下。但金军主力还在路上，你无法持久。',
      alternateTimeline:
        '平行推演：如果坚持守城到金军粮尽，可能逼和金军退兵。但城内粮草只够十天，军民士气在长期围城中会崩溃。',
      plausibility: 35,
    },
    {
      id: 'c',
      text: '南逃临安，重建朝廷',
      description: '放弃开封，南渡建立南宋',
      outcome: 'alternate',
      result:
        '你决定南逃。但逃跑的路上，禁军哗变，要求你回去守城。你被迫返回开封，但士气已经崩溃。',
      alternateTimeline:
        '平行推演：如果你成功南逃并稳定局势，可能提前建立南宋。但放弃中原意味着放弃半壁江山——这在政治上几乎是自杀。',
      plausibility: 20,
    },
    {
      id: 'd',
      text: '联络西夏、辽残余，合击金军',
      description: '寻求外部盟友，从侧翼打击金军',
      outcome: 'failed',
      result:
        '你派人联络西夏和辽国残余势力。但西夏自身难保，辽残余被金军逐一消灭。外援无望。',
      alternateTimeline:
        '平行推演：即使有外援，北宋的军事实力也不足以扭转战局。靖康之变的根本原因是北宋积贫积弱，不是战术问题。',
      plausibility: 10,
    },
  ],
  historicalResult:
    '历史上的宋钦宗选择了 A。他亲赴金营议和，结果被俘。他的优柔寡断和缺乏决断力，是靖康之变的重要原因。',
  lesson:
    '在关键时刻，犹豫不决比错误决定更致命。宋钦宗的问题不是没有选择，而是在每个选择面前都犹豫不决——该守不守，该逃不逃，该战不战。',
};
