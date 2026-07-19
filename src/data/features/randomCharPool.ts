/**
 * 随机挑战字池
 * 用于 oracle-game 的「随机挑战」模式，覆盖常用汉字 120 字
 * 甲骨文 SVG 通过 fetchCharEvolutionByChar 实时抓取（hanziyuan.net）
 * 含义字段用于答题后的解释展示
 */

export interface RandomChar {
  char: string;
  meaning: string;
  category: '自然' | '动物' | '植物' | '人体' | '器物' | '动作' | '方位' | '数字';
}

export const RANDOM_CHAR_POOL: RandomChar[] = [
  // 自然（20）
  { char: '日', meaning: '太阳、白天', category: '自然' },
  { char: '月', meaning: '月亮、月份', category: '自然' },
  { char: '星', meaning: '星辰', category: '自然' },
  { char: '云', meaning: '云彩', category: '自然' },
  { char: '雨', meaning: '降雨', category: '自然' },
  { char: '雪', meaning: '雪花', category: '自然' },
  { char: '风', meaning: '风', category: '自然' },
  { char: '雷', meaning: '雷电', category: '自然' },
  { char: '电', meaning: '闪电', category: '自然' },
  { char: '水', meaning: '水流', category: '自然' },
  { char: '火', meaning: '火焰', category: '自然' },
  { char: '山', meaning: '山峰', category: '自然' },
  { char: '川', meaning: '河流', category: '自然' },
  { char: '海', meaning: '海洋', category: '自然' },
  { char: '石', meaning: '石头', category: '自然' },
  { char: '土', meaning: '土地', category: '自然' },
  { char: '田', meaning: '田地', category: '自然' },
  { char: '天', meaning: '天空', category: '自然' },
  { char: '地', meaning: '大地', category: '自然' },
  { char: '气', meaning: '气息', category: '自然' },

  // 动物（20）
  { char: '龙', meaning: '神龙', category: '动物' },
  { char: '凤', meaning: '凤凰', category: '动物' },
  { char: '龟', meaning: '乌龟', category: '动物' },
  { char: '鱼', meaning: '鱼类', category: '动物' },
  { char: '鸟', meaning: '鸟类', category: '动物' },
  { char: '马', meaning: '马匹', category: '动物' },
  { char: '牛', meaning: '牛', category: '动物' },
  { char: '羊', meaning: '羊', category: '动物' },
  { char: '鸡', meaning: '鸡', category: '动物' },
  { char: '犬', meaning: '狗', category: '动物' },
  { char: '猪', meaning: '猪', category: '动物' },
  { char: '猫', meaning: '猫', category: '动物' },
  { char: '虎', meaning: '老虎', category: '动物' },
  { char: '鹿', meaning: '鹿', category: '动物' },
  { char: '象', meaning: '大象', category: '动物' },
  { char: '蛇', meaning: '蛇', category: '动物' },
  { char: '兔', meaning: '兔子', category: '动物' },
  { char: '燕', meaning: '燕子', category: '动物' },
  { char: '虫', meaning: '虫子', category: '动物' },
  { char: '贝', meaning: '贝壳', category: '动物' },

  // 植物（12）
  { char: '木', meaning: '树木', category: '植物' },
  { char: '林', meaning: '树林', category: '植物' },
  { char: '森', meaning: '森林', category: '植物' },
  { char: '禾', meaning: '禾苗', category: '植物' },
  { char: '米', meaning: '米粒', category: '植物' },
  { char: '竹', meaning: '竹子', category: '植物' },
  { char: '花', meaning: '花朵', category: '植物' },
  { char: '草', meaning: '草', category: '植物' },
  { char: '果', meaning: '果实', category: '植物' },
  { char: '叶', meaning: '叶子', category: '植物' },
  { char: '根', meaning: '根', category: '植物' },
  { char: '茶', meaning: '茶', category: '植物' },

  // 人体（16）
  { char: '人', meaning: '人', category: '人体' },
  { char: '大', meaning: '大', category: '人体' },
  { char: '小', meaning: '小', category: '人体' },
  { char: '口', meaning: '嘴巴', category: '人体' },
  { char: '目', meaning: '眼睛', category: '人体' },
  { char: '耳', meaning: '耳朵', category: '人体' },
  { char: '鼻', meaning: '鼻子', category: '人体' },
  { char: '舌', meaning: '舌头', category: '人体' },
  { char: '牙', meaning: '牙齿', category: '人体' },
  { char: '手', meaning: '手', category: '人体' },
  { char: '足', meaning: '脚', category: '人体' },
  { char: '心', meaning: '心脏', category: '人体' },
  { char: '首', meaning: '头', category: '人体' },
  { char: '面', meaning: '脸面', category: '人体' },
  { char: '身', meaning: '身体', category: '人体' },
  { char: '血', meaning: '血液', category: '人体' },

  // 器物（20）
  { char: '刀', meaning: '刀', category: '器物' },
  { char: '弓', meaning: '弓箭', category: '器物' },
  { char: '矢', meaning: '箭', category: '器物' },
  { char: '车', meaning: '车', category: '器物' },
  { char: '舟', meaning: '船', category: '器物' },
  { char: '网', meaning: '网', category: '器物' },
  { char: '鼎', meaning: '鼎', category: '器物' },
  { char: '玉', meaning: '玉', category: '器物' },
  { char: '金', meaning: '金属', category: '器物' },
  { char: '银', meaning: '银', category: '器物' },
  { char: '门', meaning: '门', category: '器物' },
  { char: '窗', meaning: '窗户', category: '器物' },
  { char: '床', meaning: '床', category: '器物' },
  { char: '席', meaning: '席子', category: '器物' },
  { char: '皿', meaning: '器皿', category: '器物' },
  { char: '壶', meaning: '壶', category: '器物' },
  { char: '斗', meaning: '量器', category: '器物' },
  { char: '尺', meaning: '尺子', category: '器物' },
  { char: '伞', meaning: '伞', category: '器物' },
  { char: '灯', meaning: '灯', category: '器物' },

  // 动作（16）
  { char: '走', meaning: '行走', category: '动作' },
  { char: '奔', meaning: '奔跑', category: '动作' },
  { char: '飞', meaning: '飞翔', category: '动作' },
  { char: '看', meaning: '观看', category: '动作' },
  { char: '听', meaning: '聆听', category: '动作' },
  { char: '言', meaning: '说话', category: '动作' },
  { char: '食', meaning: '进食', category: '动作' },
  { char: '饮', meaning: '饮用', category: '动作' },
  { char: '立', meaning: '站立', category: '动作' },
  { char: '坐', meaning: '坐下', category: '动作' },
  { char: '卧', meaning: '躺卧', category: '动作' },
  { char: '舞', meaning: '跳舞', category: '动作' },
  { char: '射', meaning: '射箭', category: '动作' },
  { char: '牧', meaning: '放牧', category: '动作' },
  { char: '耕', meaning: '耕种', category: '动作' },
  { char: '渔', meaning: '捕鱼', category: '动作' },

  // 方位（8）
  { char: '上', meaning: '上方', category: '方位' },
  { char: '下', meaning: '下方', category: '方位' },
  { char: '左', meaning: '左边', category: '方位' },
  { char: '右', meaning: '右边', category: '方位' },
  { char: '中', meaning: '中间', category: '方位' },
  { char: '东', meaning: '东方', category: '方位' },
  { char: '南', meaning: '南方', category: '方位' },
  { char: '北', meaning: '北方', category: '方位' },

  // 数字（8）
  { char: '一', meaning: '数字一', category: '数字' },
  { char: '二', meaning: '数字二', category: '数字' },
  { char: '三', meaning: '数字三', category: '数字' },
  { char: '四', meaning: '数字四', category: '数字' },
  { char: '五', meaning: '数字五', category: '数字' },
  { char: '六', meaning: '数字六', category: '数字' },
  { char: '七', meaning: '数字七', category: '数字' },
  { char: '八', meaning: '数字八', category: '数字' },
];

/**
 * 从字池随机选 N 个字（不重复）
 */
export const getRandomChars = (count: number): RandomChar[] => {
  const shuffled = [...RANDOM_CHAR_POOL];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
};
