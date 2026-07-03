/**
 * 历史事件因果链数据
 * 描述事件之间的因果关系，构建有向因果链图谱
 */

export interface CausalLink {
  /** 起因事件 uid */
  cause: string;
  /** 起因事件名称 */
  causeName: string;
  /** 结果事件 uid */
  effect: string;
  /** 结果事件名称 */
  effectName: string;
  /** 因果关系描述 */
  description: string;
  /** 关系强度 */
  strength: 'direct' | 'contributing' | 'background';
}

export const CAUSAL_CHAINS: CausalLink[] = [
  // ─── 秦统一因果链 ───
  {
    cause: 'shangyang-reform',
    causeName: '商鞅变法',
    effect: 'qin-unify',
    effectName: '秦统一六国',
    description: '商鞅变法奠定了秦国的军事和经济基础，使秦成为最强诸侯',
    strength: 'direct',
  },
  {
    cause: 'qin-unify',
    causeName: '秦统一六国',
    effect: 'qin-fall',
    effectName: '秦朝灭亡',
    description: '秦暴政和苛法激起民愤，陈胜吴广起义引发连锁崩溃',
    strength: 'direct',
  },

  // ─── 汉朝因果链 ───
  {
    cause: 'qin-fall',
    causeName: '秦朝灭亡',
    effect: 'han-founding',
    effectName: '汉朝建立',
    description: '秦亡后楚汉争霸，刘邦胜出建立汉朝',
    strength: 'direct',
  },
  {
    cause: 'zhangqian-western',
    causeName: '张骞通西域',
    effect: 'han-silk-road',
    effectName: '丝绸之路',
    description: '张骞出使打通了中西交通通道，促成丝绸之路繁荣',
    strength: 'direct',
  },

  // ─── 三国因果链 ───
  {
    cause: 'han-fall',
    causeName: '汉朝衰落',
    effect: 'three-kingdoms',
    effectName: '三国鼎立',
    description: '东汉末年宦官专权和诸侯割据，最终分裂为三国',
    strength: 'direct',
  },
  {
    cause: 'chibi-battle',
    causeName: '赤壁之战',
    effect: 'three-kingdoms',
    effectName: '三国鼎立',
    description: '赤壁之战阻止曹操统一，奠定三分天下格局',
    strength: 'direct',
  },

  // ─── 唐朝因果链 ───
  {
    cause: 'sui-fall',
    causeName: '隋朝灭亡',
    effect: 'tang-founding',
    effectName: '唐朝建立',
    description: '隋末农民起义后李渊起兵，建立唐朝',
    strength: 'direct',
  },
  {
    cause: 'zhenguan',
    causeName: '贞观之治',
    effect: 'kaiyuan',
    effectName: '开元盛世',
    description: '贞观之治奠定制度和国力基础，延续至开元盛世',
    strength: 'contributing',
  },
  {
    cause: 'an-shi-rebellion',
    causeName: '安史之乱',
    effect: 'tang-fall',
    effectName: '唐朝衰落',
    description: '安史之乱重创唐朝国力，藩镇割据加速衰落',
    strength: 'direct',
  },
  {
    cause: 'tang-fall',
    causeName: '唐朝灭亡',
    effect: 'five-dynasties',
    effectName: '五代十国',
    description: '唐亡后中原陷入割据混战，进入五代十国时期',
    strength: 'direct',
  },

  // ─── 宋朝因果链 ───
  {
    cause: 'five-dynasties',
    causeName: '五代十国',
    effect: 'song-founding',
    effectName: '宋朝建立',
    description: '赵匡胤在混乱中崛起，陈桥兵变建立宋朝',
    strength: 'direct',
  },
  {
    cause: 'wanganshi-reform',
    causeName: '王安石变法',
    effect: 'song-decline',
    effectName: '宋朝内政混乱',
    description: '变法失败加剧党争，削弱宋朝治理能力',
    strength: 'contributing',
  },
  {
    cause: 'song-decline',
    causeName: '宋朝内政混乱',
    effect: 'jingkang-incident',
    effectName: '靖康之变',
    description: '内政混乱使宋朝军事防御能力下降，金兵趁机南下',
    strength: 'contributing',
  },
  {
    cause: 'jingkang-incident',
    causeName: '靖康之变',
    effect: 'song-south',
    effectName: '南宋建立',
    description: '靖康之变后赵构南渡，建立南宋',
    strength: 'direct',
  },

  // ─── 明朝因果链 ───
  {
    cause: 'yuan-fall',
    causeName: '元朝灭亡',
    effect: 'ming-founding',
    effectName: '明朝建立',
    description: '元末红巾军起义，朱元璋统一天下建立明朝',
    strength: 'direct',
  },
  {
    cause: 'zheng-he',
    causeName: '郑和下西洋',
    effect: 'ming-sea-ban',
    effectName: '明朝海禁',
    description: '郑和之后明朝转向保守，实施海禁政策',
    strength: 'background',
  },
  {
    cause: 'ming-sea-ban',
    causeName: '明朝海禁',
    effect: 'ming-fall',
    effectName: '明朝灭亡',
    description: '海禁使明朝错失大航海时代机遇，经济和技术逐渐落后',
    strength: 'contributing',
  },

  // ─── 清朝因果链 ───
  {
    cause: 'ming-fall',
    causeName: '明朝灭亡',
    effect: 'qing-founding',
    effectName: '清朝建立',
    description: '明亡后清军入关，建立清朝统治',
    strength: 'direct',
  },
  {
    cause: 'kangqian-prosperity',
    causeName: '康乾盛世',
    effect: 'qing-decline',
    effectName: '清朝衰落',
    description: '盛世后期人口膨胀、吏治腐败、闭关锁国，埋下衰落隐患',
    strength: 'background',
  },
  {
    cause: 'qing-decline',
    causeName: '清朝衰落',
    effect: 'opium-war',
    effectName: '鸦片战争',
    description: '清朝衰落使英国趁虚而入，发动鸦片战争',
    strength: 'contributing',
  },

  // ─── 跨朝代因果链 ───
  {
    cause: 'shangyang-reform',
    causeName: '商鞅变法',
    effect: 'qin-fall',
    effectName: '秦朝灭亡',
    description: '商鞅的严刑峻法使秦国强大但也使民怨积累，秦二世而亡',
    strength: 'background',
  },
  {
    cause: 'han-silk-road',
    causeName: '丝绸之路',
    effect: 'tang-prosperity',
    effectName: '唐朝繁荣',
    description: '丝绸之路带来的贸易和文化交流促进了唐朝的繁荣',
    strength: 'contributing',
  },
  {
    cause: 'zheng-he',
    causeName: '郑和下西洋',
    effect: 'qing-sea-ban',
    effectName: '清朝闭关锁国',
    description: '明朝海禁政策延续到清朝，形成闭关锁国传统',
    strength: 'background',
  },

  // ─── 宋朝因果链（新增） ───
  {
    cause: 'chen-qiao-motor',
    causeName: '陈桥兵变',
    effect: 'song-founding',
    effectName: '宋朝建立',
    description: '赵匡胤陈桥兵变黄袍加身，建立宋朝，结束了五代十国的混乱局面',
    strength: 'direct',
  },
  {
    cause: 'song-founding',
    causeName: '宋朝建立',
    effect: 'chao-wen-zheng-ce',
    effectName: '重文轻武国策',
    description: '赵匡胤鉴于唐末藩镇割据教训，确立重文轻武的基本国策',
    strength: 'direct',
  },
  {
    cause: 'chao-wen-zheng-ce',
    causeName: '重文轻武',
    effect: 'song-military-weak',
    effectName: '军事积弱',
    description: '重文轻武导致武将地位低下、兵将分离，宋朝军事长期处于被动',
    strength: 'direct',
  },
  {
    cause: 'song-military-weak',
    causeName: '军事积弱',
    effect: 'yanran-loss',
    effectName: '丧失燕云十六州',
    description: '军事积弱使宋朝始终无法收复燕云十六州，北方防线暴露在辽国骑兵之下',
    strength: 'contributing',
  },
  {
    cause: 'yanran-loss',
    causeName: '丧失燕云十六州',
    effect: 'dan-yuan-pressure',
    effectName: '辽国威胁',
    description: '没有燕云屏障，中原平原无险可守，辽国骑兵可以随时南下',
    strength: 'direct',
  },
  {
    cause: 'dan-yuan-pressure',
    causeName: '辽国威胁',
    effect: 'chan-yuan-treaty',
    effectName: '澶渊之盟',
    description: '面对辽国持续威胁，宋真宗被迫签订澶渊之盟，每年输送岁币求和',
    strength: 'direct',
  },
  {
    cause: 'chan-yuan-treaty',
    causeName: '澶渊之盟',
    effect: 'song-financial-burden',
    effectName: '财政负担加重',
    description: '岁币加上养兵费用，宋朝财政日益紧张，"三元之费"成为沉重负担',
    strength: 'contributing',
  },
  {
    cause: 'song-financial-burden',
    causeName: '财政负担加重',
    effect: 'wanganshi-reform',
    effectName: '王安石变法',
    description: '为缓解财政危机，王安石推行变法试图富国强兵',
    strength: 'direct',
  },
  {
    cause: 'wanganshi-reform',
    causeName: '王安石变法',
    effect: 'dang-zheng',
    effectName: '党争激化',
    description: '变法引发新旧党争，朝政分裂，苏轼、司马光等反对派遭到打压',
    strength: 'direct',
  },
  {
    cause: 'dang-zheng',
    causeName: '党争激化',
    effect: 'song-governance-weak',
    effectName: '治理能力下降',
    description: '持续的党争使宋朝政局不稳，政策反复无常，治理能力大幅下降',
    strength: 'direct',
  },
  {
    cause: 'song-governance-weak',
    causeName: '治理能力下降',
    effect: 'jingkang-incident',
    effectName: '靖康之变',
    description: '治理能力下降使宋朝在面对金国入侵时无力抵抗，最终导致靖康之变',
    strength: 'contributing',
  },
  {
    cause: 'jingkang-incident',
    causeName: '靖康之变',
    effect: 'nan-song-founding',
    effectName: '南宋建立',
    description: '北宋灭亡后，赵构在南宋建立，定都临安',
    strength: 'direct',
  },
  {
    cause: 'nan-song-founding',
    causeName: '南宋建立',
    effect: 'yuefei-ant-jin',
    effectName: '岳飞抗金',
    description: '南宋面临金国威胁，岳飞等将领率军抗金',
    strength: 'direct',
  },
  {
    cause: 'yuefei-ant-jin',
    causeName: '岳飞抗金',
    effect: 'longxing-treaty',
    effectName: '隆兴和议',
    description: '岳飞被召回后，南宋与金国签订隆兴和议，维持南北对峙局面',
    strength: 'direct',
  },

  // ─── 元朝因果链（新增） ───
  {
    cause: 'mongol-rise',
    causeName: '蒙古崛起',
    effect: 'jin-fall',
    effectName: '金朝灭亡',
    description: '成吉思汗统一蒙古各部后，发动对金国的战争，最终灭金',
    strength: 'direct',
  },
  {
    cause: 'jin-fall',
    causeName: '金朝灭亡',
    effect: 'song-mongol-war',
    effectName: '宋蒙战争',
    description: '金亡后，蒙古直接将目标转向南宋，开始了长达45年的宋蒙战争',
    strength: 'direct',
  },
  {
    cause: 'yuan-establish',
    causeName: '元朝建立',
    effect: 'yuan-administration',
    effectName: '行省制度',
    description: '忽必烈建立元朝后，创立行省制度，加强中央集权',
    strength: 'direct',
  },
  {
    cause: 'yuan-administration',
    causeName: '行省制度',
    effect: 'yuan-territory',
    effectName: '疆域扩张',
    description: '行省制度使元朝能够有效管理辽阔的领土，成为中国历史上版图最大的朝代',
    strength: 'contributing',
  },
  {
    cause: 'yuan-territory',
    causeName: '疆域扩张',
    effect: 'yuan-overextend',
    effectName: '过度扩张',
    description: '过大的疆域导致管理成本极高，中央对地方的控制力逐渐减弱',
    strength: 'contributing',
  },
  {
    cause: 'yuan-overextend',
    causeName: '过度扩张',
    effect: 'yuan-rebellion',
    effectName: '红巾军起义',
    description: '过度扩张加上民族压迫政策，导致各地起义不断，最终红巾军掀起反元浪潮',
    strength: 'direct',
  },

  // ─── 明朝因果链（新增） ───
  {
    cause: 'ming-founding',
    causeName: '明朝建立',
    effect: 'hongwu-centralization',
    effectName: '朱元璋高度集权',
    description: '朱元璋废除丞相制度，将权力高度集中于皇帝一人',
    strength: 'direct',
  },
  {
    cause: 'hongwu-centralization',
    causeName: '高度集权',
    effect: 'yongle-strong',
    effectName: '永乐盛世',
    description: '朱棣继承父祖集权传统，发动靖难之役后推行一系列强国政策',
    strength: 'contributing',
  },
  {
    cause: 'yongle-strong',
    causeName: '永乐盛世',
    effect: 'zheng-he-voyage',
    effectName: '郑和下西洋',
    description: '永乐帝派郑和七下西洋，展示国威、建立朝贡体系',
    strength: 'direct',
  },
  {
    cause: 'zheng-he-voyage',
    causeName: '郑和下西洋',
    effect: 'ming-financial-drain',
    effectName: '财政消耗',
    description: '郑和航行耗费巨大，后继皇帝认为"劳民伤财"而停止',
    strength: 'direct',
  },
  {
    cause: 'ming-financial-drain',
    causeName: '财政消耗',
    effect: 'hai-jin-policy',
    effectName: '海禁政策强化',
    description: '停止航海后，明朝进一步强化海禁，禁止民间海外贸易',
    strength: 'direct',
  },
  {
    cause: 'hai-jin-policy',
    causeName: '海禁政策',
    effect: 'wokou-raids',
    effectName: '倭寇肆虐',
    description: '海禁导致沿海走私猖獗，日本浪人与中国海盗勾结，倭寇之患愈演愈烈',
    strength: 'direct',
  },
  {
    cause: 'tai-wen-reform',
    causeName: '张居正改革',
    effect: 'ming-temporary-strength',
    effectName: '明朝短暂中兴',
    description: '张居正推行一条鞭法等改革，使明朝出现"万历中兴"的短暂繁荣',
    strength: 'direct',
  },
  {
    cause: 'ming-temporary-strength',
    causeName: '短暂中兴',
    effect: 'tai-wen-aftermath',
    effectName: '改革人亡政息',
    description: '张居正死后改革措施被逐一废除，明朝重新陷入腐败和混乱',
    strength: 'direct',
  },
  {
    cause: 'ming-weak-governance',
    causeName: '治理衰弱',
    effect: 'li-zicheng-rebellion',
    effectName: '李自成起义',
    description: '明末政治腐败、天灾频发，最终导致李自成起义',
    strength: 'direct',
  },
  {
    cause: 'li-zicheng-rebellion',
    causeName: '李自成起义',
    effect: 'ming-fall',
    effectName: '明朝灭亡',
    description: '李自成攻入北京，崇祯帝自缢，明朝灭亡',
    strength: 'direct',
  },
  {
    cause: 'ming-fall',
    causeName: '明朝灭亡',
    effect: 'wu-san-gui-choice',
    effectName: '吴三桂抉择',
    description: '明亡后，镇守山海关的吴三桂面临降李还是降清的抉择',
    strength: 'direct',
  },
  {
    cause: 'wu-san-gui-choice',
    causeName: '吴三桂抉择',
    effect: 'qing-enter-pass',
    effectName: '清军入关',
    description: '吴三桂引清兵入关，清朝开始统治中国',
    strength: 'direct',
  },

  // ─── 清朝因果链（新增） ───
  {
    cause: 'qing-enter-pass',
    causeName: '清军入关',
    effect: 'qing-consolidation',
    effectName: '清朝 Consolidation',
    description: '清朝入关后经过数十年战争，逐步平定全国',
    strength: 'direct',
  },
  {
    cause: 'qing-consolidation',
    causeName: '清朝巩固',
    effect: 'kang-qian-prosperity',
    effectName: '康乾盛世',
    description: '康熙、雍正、乾隆三朝出现清朝鼎盛时期，国力达到巅峰',
    strength: 'direct',
  },
  {
    cause: 'kang-qian-prosperity',
    causeName: '康乾盛世',
    effect: 'qing-isolation',
    effectName: '闭关锁国加深',
    description: '盛世背后是清朝的盲目自信，认为"天朝上国"无需与外邦交往',
    strength: 'contributing',
  },
  {
    cause: 'qing-isolation',
    causeName: '闭关锁国',
    effect: 'qing-tech-backward',
    effectName: '技术落后西方',
    description: '闭关锁国使清朝错过了工业革命和科学技术的发展',
    strength: 'direct',
  },
  {
    cause: 'qing-tech-backward',
    causeName: '技术落后',
    effect: 'opium-war-defeat',
    effectName: '鸦片战争失败',
    description: '技术落后使清朝在鸦片战争中不堪一击，被迫签订不平等条约',
    strength: 'direct',
  },
  {
    cause: 'opium-war-defeat',
    causeName: '鸦片战争失败',
    effect: 'yangwu-movement',
    effectName: '洋务运动兴起',
    description: '鸦片战争的惨败刺激了有识之士，引发了持续三十年的洋务运动',
    strength: 'direct',
  },
  {
    cause: 'yangwu-movement',
    causeName: '洋务运动',
    effect: 'bei-yang-fleet',
    effectName: '北洋水师建立',
    description: '洋务运动建立了亚洲最强的北洋水师',
    strength: 'direct',
  },
  {
    cause: 'bei-yang-fleet',
    causeName: '北洋水师',
    effect: 'jiawu-war',
    effectName: '甲午战争',
    description: '北洋水师在甲午战争中被日本联合舰队全歼',
    strength: 'direct',
  },
  {
    cause: 'jiawu-war',
    causeName: '甲午战争失败',
    effect: 'wuxu-reform',
    effectName: '戊戌变法',
    description: '甲午战败彻底暴露了洋务运动的局限，促使维新派发起变法',
    strength: 'direct',
  },
  {
    cause: 'wuxu-reform',
    causeName: '戊戌变法失败',
    effect: 'boxer-rebellion',
    effectName: '义和团运动',
    description: '变法失败后，保守势力反扑，民间排外情绪高涨，最终引发义和团运动',
    strength: 'contributing',
  },
  {
    cause: 'boxer-rebellion',
    causeName: '义和团运动',
    effect: 'eight-nation-alliance',
    effectName: '八国联军侵华',
    description: '义和团围攻使馆区，引发八国联军侵华',
    strength: 'direct',
  },
  {
    cause: 'eight-nation-alliance',
    causeName: '八国联军侵华',
    effect: 'xin-zheng',
    effectName: '清末新政',
    description: '惨败后清廷被迫推行新政：废科举、练新军、预备立宪',
    strength: 'direct',
  },
  {
    cause: 'xin-zheng-new-army',
    causeName: '新军训练',
    effect: 'xin-hai-revolution',
    effectName: '辛亥革命',
    description: '清末新政训练的新军成为革命的骨干力量——武昌起义就是由湖北新军发动',
    strength: 'direct',
  },
];

/** 查找某事件的因果链（前因 + 后果） */
export function findCausalChain(eventId: string): { causes: CausalLink[]; effects: CausalLink[] } {
  const causes = CAUSAL_CHAINS.filter(link => link.effect === eventId);
  const effects = CAUSAL_CHAINS.filter(link => link.cause === eventId);
  return { causes, effects };
}

/** 查找完整的因果链路径（递归追溯前因） */
export function traceCausalRoot(eventId: string, maxDepth: number = 5): CausalLink[] {
  const chain: CausalLink[] = [];
  let current = eventId;
  let depth = 0;

  while (depth < maxDepth) {
    const directCause = CAUSAL_CHAINS.find(
      link => link.effect === current && link.strength === 'direct'
    );
    if (!directCause) break;
    chain.unshift(directCause);
    current = directCause.cause;
    depth++;
  }

  return chain;
}
