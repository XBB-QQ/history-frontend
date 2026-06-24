/**
 * 历史人物匹配数据
 * 按维度偏好匹配历史人物
 * @see history-museum/design/000-future-roadmap.md §方向五 §5.2
 */

export interface PersonalityMatch {
  /** 人物姓名 */
  name: string;
  /** 朝代 */
  dynasty: string;
  /** 身份标签 */
  role: string;
  /** 匹配维度的 key */
  dimension: DimensionKey;
  /** 画像描述 */
  description: string;
  /** 名言 */
  quote: string;
  /** emoji 头像占位 */
  emoji: string;
}

export type DimensionKey = 'governance' | 'martial' | 'wisdom' | 'erudition';

export const DIMENSION_LABELS: Record<DimensionKey, string> = {
  governance: '文治',
  martial: '武功',
  wisdom: '智略',
  erudition: '博学',
};

export const DIMENSION_DESCRIPTIONS: Record<DimensionKey, string> = {
  governance: '善于治国理政，关注制度变革与文化昌盛',
  martial: '勇于征战沙场，关注军事策略与国家安危',
  wisdom: '深谋远虑，洞察先机，运筹帷幄之中',
  erudition: '博闻强识，通晓古今，文采斐然',
};

/** 每个维度匹配的人物列表（取前 3 位作为候选） */
export const PERSONALITY_MATCHES: Record<DimensionKey, PersonalityMatch[]> = {
  governance: [
    {
      name: '诸葛亮',
      dynasty: '三国·蜀汉',
      role: '丞相',
      dimension: 'governance',
      description: '你如诸葛武侯，胸怀天下，心系苍生。治国理政有方，鞠躬尽瘁，死而后已。',
      quote: '鞠躬尽瘁，死而后已。',
      emoji: '🪶',
    },
    {
      name: '王安石',
      dynasty: '北宋',
      role: '宰相',
      dimension: 'governance',
      description: '你如王介甫，锐意改革，不畏权贵。以变法图强为己任，敢为天下先。',
      quote: '天变不足畏，祖宗不足法，人言不足恤。',
      emoji: '📜',
    },
    {
      name: '魏征',
      dynasty: '唐',
      role: '谏议大夫',
      dimension: 'governance',
      description: '你如魏玄成，直言敢谏，以社稷为重。守正不阿，成就贞观之治。',
      quote: '兼听则明，偏信则暗。',
      emoji: '⚖️',
    },
  ],
  martial: [
    {
      name: '岳飞',
      dynasty: '南宋',
      role: '将军',
      dimension: 'martial',
      description: '你如岳鹏举，精忠报国，矢志不渝。身先士卒，冲锋陷阵，气吞山河。',
      quote: '还我河山！',
      emoji: '⚔️',
    },
    {
      name: '韩信',
      dynasty: '西汉',
      role: '大将',
      dimension: 'martial',
      description: '你如韩重言，兵法神妙，出奇制胜。背水一战，十面埋伏，兵仙之名当之无愧。',
      quote: '韩信将兵，多多益善。',
      emoji: '🏹',
    },
    {
      name: '卫青',
      dynasty: '西汉',
      role: '大将军',
      dimension: 'martial',
      description: '你如卫仲卿，出身寒微而功盖当世。七战七捷，封狼居胥，扬我大汉国威。',
      quote: '匈奴未灭，何以家为！',
      emoji: '🐴',
    },
  ],
  wisdom: [
    {
      name: '张良',
      dynasty: '西汉',
      role: '谋圣',
      dimension: 'wisdom',
      description: '你如张子房，运筹帷幄之中，决胜千里之外。洞察人心，知进退之机。',
      quote: '运筹帷幄之中，决胜千里之外。',
      emoji: '🔮',
    },
    {
      name: '范蠡',
      dynasty: '春秋·越',
      role: '谋士',
      dimension: 'wisdom',
      description: '你如范少伯，智谋过人，知机识变。功成身退，泛舟五湖，智者之选。',
      quote: '飞鸟尽，良弓藏；狡兔死，走狗烹。',
      emoji: '🚣',
    },
    {
      name: '刘伯温',
      dynasty: '明',
      role: '诚意伯',
      dimension: 'wisdom',
      description: '你如刘伯温，神机妙算，料事如神。辅佐明主，开基立业，一代帝师。',
      quote: '广积粮，高筑墙，缓称王。',
      emoji: '🌌',
    },
  ],
  erudition: [
    {
      name: '苏轼',
      dynasty: '北宋',
      role: '文豪',
      dimension: 'erudition',
      description: '你如苏东坡，博闻强识，文采斐然。诗词书画，无所不精，豁达乐观，超然物外。',
      quote: '竹杖芒鞋轻胜马，谁怕？一蓑烟雨任平生。',
      emoji: '🎋',
    },
    {
      name: '司马迁',
      dynasty: '西汉',
      role: '太史令',
      dimension: 'erudition',
      description: '你如司马子长，究天人之际，通古今之变。忍辱负重，著成信史，流芳百世。',
      quote: '究天人之际，通古今之变，成一家之言。',
      emoji: '📚',
    },
    {
      name: '沈括',
      dynasty: '北宋',
      role: '科学家',
      dimension: 'erudition',
      description: '你如沈存中，博学多才，涉猎广博。天文地理、数学医学，无所不通，《梦溪笔谈》传世。',
      quote: '技进而道不坠。',
      emoji: '🔬',
    },
  ],
};

/** 未登录或数据不足时的默认画像 */
export const NEWCOMER_PERSONALITY: PersonalityMatch = {
  name: '仓颉',
  dynasty: '上古',
  role: '史皇氏',
  dimension: 'erudition',
  description: '你如仓颉，初启文明，尚待探索。五千年历史等你发掘，万千人物等你结识。',
  quote: '观鸟兽之迹，始作书契。',
  emoji: '📝',
};
