import type { Scenario } from '@/types/scenario';

export const yuefeiScenario: Scenario = {
  id: 'yue-fei',
  title: '岳飞朱仙镇抉择',
  yearDisplay: '公元1140年7月',
  dynasty: '南宋',
  role: '岳飞',
  background:
    '你是南宋名将岳飞。郾城大捷后，金军主力溃败，你率军北伐至朱仙镇，距故都汴京仅四十五里。金兀术已渡河北逃，中原义军纷纷响应，收复旧山河指日可待。然而朝廷连下十二道金牌，急令你班师回朝。',
  dilemma:
    '此刻你站在朱仙镇大营。十二道金牌如催命符咒，而前方汴京指日可下。十年心血，毁于一旦？你的将士们望着你，等着你的决定——',
  difficulty: 'hard',
  relatedEventUid: 'jingkang-incident',
  choices: [
    {
      id: 'a',
      text: '遵旨班师，回临安复命',
      description: '服从朝廷命令，率军南撤',
      outcome: 'historical',
      result:
        '你长叹"十年之功，废于一旦"，率军南撤。中原百姓遮马痛哭。次年，你被秦桧以"莫须有"罪名杀害于风波亭，年仅三十九岁。',
      plausibility: 100,
    },
    {
      id: 'b',
      text: '抗旨继续北伐，直捣黄龙',
      description: '将在外君命有所不受，继续北上收复汴京',
      outcome: 'alternate',
      result:
        '你挥师北上，一举收复汴京。金兀术退守黄河以北。然而朝廷断绝粮草，其他宋军按兵不动。三个月后，你陷入孤军深入的困境。',
      alternateTimeline:
        '平行推演：你最终在粮尽援绝下兵败，残部退守山东。朝廷以"叛逆"之名将你定性，岳家军被迫流亡。虽然民间仍尊你为英雄，但官方记载中你成了叛将。',
      plausibility: 20,
    },
    {
      id: 'c',
      text: '上书请旨，请求延期',
      description: '以"机不可失"为由，请求朝廷宽限时日',
      outcome: 'alternate',
      result:
        '你上奏高宗，陈明形势。高宗犹豫，但秦桧在旁进言"岳飞拥兵自重"。朝廷表面同意宽限十日，暗中却调集张俊、韩世忠部包围你。',
      alternateTimeline:
        '平行推演：你看清朝廷猜忌，被迫举兵"清君侧"。然而这正坐实了"谋反"之名。南宋内战爆发，金人坐收渔利。你最终战死沙场，背负"叛将"骂名。',
      plausibility: 15,
    },
    {
      id: 'd',
      text: '解甲归田，交出兵权',
      description: '主动辞职，以示忠心，保全性命',
      outcome: 'alternate',
      result:
        '你上表请辞，交出兵权。高宗表面慰留，实则准奏。你退隐庐山，然而秦桧仍不放心。',
      alternateTimeline:
        '平行推演：绍兴和议达成后，秦桧为绝后患，仍以"莫须有"罪名将你赐死。区别只是没有风波亭的悲壮，只有庐山冷月的寂寥。',
      plausibility: 40,
    },
  ],
  historicalResult:
    '历史上的岳飞选择了 A。他选择了忠诚，却付出了生命代价。二十年后宋孝宗为他平反，谥号"武穆"，后追封鄂王。',
  lesson:
    '在忠诚与理想冲突时，岳飞选择了前者。这既是儒家的悲剧，也是中华文明对"忠义"的最高诠释。有时候，英雄的悲剧比成功更震撼人心。',
};
