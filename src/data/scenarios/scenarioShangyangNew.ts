import type { Scenario } from '@/types/scenario';

export const shangyangReformScenario: Scenario = {
  id: 'shangyang-reform',
  title: '商鞅变法前的抉择',
  yearDisplay: '公元前359年',
  dynasty: '战国·秦',
  role: '商鞅',
  background:
    '你是卫国公子公孙鞅（后称商鞅）。在魏国相国公叔痤门下做事，公叔痤临死前向魏惠王推荐你，但惠王不用。你听说秦国秦孝公求贤若渴，决定西入秦国。你知道——这是一次改变命运的赌注。',
  dilemma:
    '秦孝公召见，问你："如何强国？"你有三种方案可以选择——你会如何说服这位渴望改革的君主？',
  difficulty: 'medium',
  relatedEventUid: 'shangyang-reform',
  choices: [
    {
      id: 'a',
      text: '严刑峻法，奖励耕战',
      description: '以法治国，重赏军功，废井田开阡陌',
      outcome: 'historical',
      result:
        '你在秦国推行变法：废井田、开阡陌、奖励耕战、统一度量衡、实行连坐法。起初百姓不理解——你在都城南门立木，悬赏五十金让人搬到北门，以实际行动证明"法出必行"。三年后，秦国大治。十年后，秦国成为战国最强。但你也为自已埋下了祸根——你处罚了太子师傅，结下了仇怨。',
      plausibility: 100,
    },
    {
      id: 'b',
      text: '渐进改革，先易后难',
      description: '从经济入手，逐步推进政治改革',
      outcome: 'alternate',
      result:
        '你建议先从经济入手——鼓励农耕、发展手工业、改善交通。秦孝公觉得不错，但觉得太慢。"寡人要的是强国，不是富国。"他没有采纳你的渐进方案。',
      alternateTimeline:
        '平行推演：渐进改革可能更稳妥，但在战国时代，慢一步就可能被吞并。秦国需要的是立竿见影的效果，而不是温水煮青蛙。',
      plausibility: 40,
    },
    {
      id: 'c',
      text: '效仿齐国，发展商业',
      description: '学习管仲、晏婴的商业治国理念',
      outcome: 'failed',
      result:
        '你建议秦国发展工商业，设立市场、鼓励贸易。但秦孝公皱眉："秦国是农业国，百姓习惯了种地。搞商业，他们能打仗吗？"',
      alternateTimeline:
        '平行推演：如果秦国走商业强国之路，可能会像齐国一样富庶但军事软弱。在战国那个"强者生存"的时代，这可能是一条死路。',
      plausibility: 10,
    },
    {
      id: 'd',
      text: '学习楚国，分封贵族',
      description: '保留贵族特权，给予他们改革参与权',
      outcome: 'alternate',
      result:
        '你建议尊重秦国贵族利益，让他们参与改革决策。秦孝公摇头："寡人要的是变法，不是妥协。如果向贵族让步，还叫什么改革？"',
      alternateTimeline:
        '平行推演：如果商鞅向贵族让步，变法可能更容易推行，但也可能失去彻底性。历史上的王安石变法就是教训——妥协太多，最后什么都改不成。',
      plausibility: 25,
    },
  ],
  historicalResult:
    '历史上的商鞅选择了 A。他的严刑峻法让秦国强大，也让他自己走向了车裂的结局。变法者往往是最先被变法牺牲的人。',
  lesson:
    '改革有两种选择：温和但无效，或者激进但有效。商鞅选择了后者，代价是他自己的生命。历史的评价从来不是看改革者的生死，而是看他留下的制度。',
};
