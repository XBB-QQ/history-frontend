import type { Scenario } from '@/types/scenario';

export const opiumScenario: Scenario = {
  id: 'opium-war',
  title: '虎门销烟前的林则徐',
  yearDisplay: '公元1838年12月',
  dynasty: '清',
  role: '林则徐',
  background:
    '你是湖广总督林则徐。鸦片泛滥已危及国本——每年白银外流数百万两，士兵吸食者十之八九。道光帝召你进京，问你："鸦片可否禁绝？"你知道，这将决定你的命运，也决定大清的未来。',
  dilemma:
    '道光帝在养心殿召见。你面前有三条路：严令禁绝（可能引发战争）、妥协缓和（保住官位但鸦片继续流入）、或者第三条路——你会怎么选？',
  difficulty: 'hard',
  relatedEventUid: 'opium-war',
  choices: [
    {
      id: 'a',
      text: '严令禁绝，不惜一战',
      description: '上书请求派钦差大臣赴广东严厉禁烟',
      outcome: 'historical',
      result:
        '你上书"若犹泄泄视之者，二十年后中原几无可以御敌之兵，且无可以充饷之银"。道光帝震撼，任命你为钦差大臣赴广东禁烟。你在虎门当众销毁鸦片二百三十七万斤。英国以此为借口发动战争，你虽战败被贬，但禁烟的决心赢得了万世尊敬。',
      plausibility: 100,
    },
    {
      id: 'b',
      text: '妥协缓和，逐步禁烟',
      description: '建议 gradual prohibition，给商人过渡期',
      outcome: 'alternate',
      result:
        '你建议分三年逐步减少鸦片进口，同时鼓励种植罂粟替代（以毒攻毒）。道光帝采纳。然而三年后鸦片销量不减反增——本土种植的罂粟品质更差但价格更低，反而加速了毒害。',
      alternateTimeline:
        '平行推演：渐进政策给了鸦片商人缓冲时间。英国东印度公司趁机加大在印度的鸦片种植，十年后鸦片流入量翻倍。你被道光帝罢免，罪名是"禁烟不力"。',
      plausibility: 15,
    },
    {
      id: 'c',
      text: '承认现实，合法征税',
      description: '建议鸦片合法化，征收高额关税',
      outcome: 'failed',
      result:
        '你上书建议鸦片合法化，以关税弥补白银流失。道光帝震怒，认为你"丧心病狂"。但你的想法在官场引起共鸣——许多大臣私下赞同。',
      alternateTimeline:
        '平行推演：如果鸦片合法化，清朝短期内财政收入增加，但社会毒害加深。十年后中国可能像印度一样成为英国的殖民地——鸦片是殖民统治最有效的工具。',
      plausibility: 5,
    },
    {
      id: 'd',
      text: '上书劝谏，请求开海通商',
      description: '建议学习西方，开放海禁促进贸易平衡',
      outcome: 'alternate',
      result:
        '你上书请求开放海禁，鼓励中国商人与东南亚、欧洲贸易，以正常贸易收入抵消鸦片白银外流。道光帝认为你"眼光太远"，不予采纳。',
      alternateTimeline:
        '平行推演：如果开放海禁，中国商人可能在大航海时代后重新融入国际贸易。但清朝的官僚体系和海禁传统根深蒂固，这个建议在当时几乎不可能实现。',
      plausibility: 25,
    },
  ],
  historicalResult:
    '历史上的林则徐选择了 A。他以"苟利国家生死以，岂因祸福避趋之"自勉，赴广东严厉禁烟，虽然引发了鸦片战争并导致自己被贬，但他的爱国精神和禁烟决心永载史册。',
  lesson:
    '面对两难抉择，林则徐选择了最难但最正确的路。有时候，明知会失败也要去做——这就是英雄的意义。',
};
