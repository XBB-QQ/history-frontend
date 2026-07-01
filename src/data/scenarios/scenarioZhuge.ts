import type { Scenario } from '@/types/scenario';

export const zhugeScenario: Scenario = {
  id: 'zhuge-north',
  title: '诸葛亮北伐前的抉择',
  yearDisplay: '公元227年',
  dynasty: '三国·蜀汉',
  role: '诸葛亮',
  background:
    '你是蜀汉丞相诸葛亮。刘备夷陵兵败后，蜀汉元气大伤。你花了两年时间休养生息、整顿军政，现在具备了北伐的条件。但蜀汉只有益州一地，人口不足百万，而曹魏拥有中原九州，人口超过四百万。',
  dilemma:
    '出师表已上，后主已批准北伐。你面临一个战略抉择：是走秦岭直取长安（稳健），还是走街谷奇袭祁山（冒险）？',
  difficulty: 'hard',
  relatedEventUid: 'zhuge-liang',
  choices: [
    {
      id: 'a',
      text: '出祁山，取陇右',
      description: '先取陇右，切断曹魏与西域的联系',
      outcome: 'historical',
      result:
        '你率军出祁山，天水、南安、安定三郡叛魏应蜀。曹叡大惊，派张郃率军迎战。你任用马谡为前锋，驻守街亭。但马谡违背你的部署，上山扎营，被张郃切断水源，街亭失守。北伐功亏一篑，你挥泪斩马谡，上表自贬三级。',
      plausibility: 100,
    },
    {
      id: 'b',
      text: '出子午谷，直取长安',
      description: '派夏侯楙率五千精兵走子午谷奇袭长安',
      outcome: 'alternate',
      result:
        '你采纳魏延的子午谷奇谋，派五千精兵走险道直扑长安。但天降暴雨，山路塌方，一半士兵掉队。奇袭失败。',
      alternateTimeline:
        '平行推演：如果天气好、奇袭成功，长安可能落入蜀军之手。但长安城墙坚固、守军众多，蜀军能否守住是另一个问题。',
      plausibility: 30,
    },
    {
      id: 'c',
      text: '暂不出兵，继续休养生息',
      description: '蜀弱魏强，再等五年',
      outcome: 'alternate',
      result:
        '你决定暂缓北伐，继续发展农业、训练士兵。五年后蜀汉国力大增，但曹魏也在同步发展——差距没有缩小，反而可能扩大。',
      alternateTimeline:
        '平行推演：等待是最安全的策略，但也可能错失最佳时机。曹魏内部也在发生变化——司马懿逐渐掌权，对蜀汉的威胁更大。',
      plausibility: 40,
    },
    {
      id: 'd',
      text: '先联吴，后北伐',
      description: '派使者修复孙刘联盟，东西夹击曹魏',
      outcome: 'alternate',
      result:
        '你派邓芝出使东吴，修复孙刘联盟。孙权同意共同北伐。但东吴在北伐中表现消极——只攻不守，蜀军孤军奋战。',
      alternateTimeline:
        '平行推演：如果东吴真正配合，两路夹击可能成功。但东吴的战略目标是保境安民，不是恢复汉室。',
      plausibility: 35,
    },
  ],
  historicalResult:
    '历史上的诸葛亮选择了 A。他出祁山取陇右，但因为马谡失街亭而功败垂成。此后他五次北伐，始终未能突破秦岭天险。',
  lesson:
    '诸葛亮北伐的本质是一个不可能完成的任务——以弱攻强。但他明知不可为而为之，因为他知道：如果不北伐，蜀汉只能坐以待毙。北伐不是战术选择，而是战略必需。',
};
