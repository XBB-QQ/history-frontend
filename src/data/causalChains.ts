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
