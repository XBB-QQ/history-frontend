/**
 * 古文注解词典 — 常见古汉语词汇解释
 * @see history-museum/design/002-innovation-brainstorm.md §4
 */

export interface DictEntry {
  word: string;
  /** 古汉语含义 */
  classicalMeaning: string;
  /** 白话翻译 */
  modernEquivalent: string;
  /** 用法示例 */
  example: string;
  /** 示例出处 */
  source: string;
  /** 相关典故（可选） */
  allusion?: string;
}

export const CLASSICAL_DICT: DictEntry[] = [
  { word: '朕', classicalMeaning: '皇帝自称', modernEquivalent: '我（皇帝专用）', example: '朕为始皇帝', source: '《史记·秦始皇本纪》', allusion: '秦始皇统一后规定"朕"为皇帝专属自称，此前任何人可用' },
  { word: '寡人', classicalMeaning: '诸侯自称，意为"寡德之人"', modernEquivalent: '我（诸侯用）', example: '寡人虽不肖', source: '《孟子》', allusion: '春秋时期诸侯谦称，比"朕"等级低' },
  { word: '社稷', classicalMeaning: '社=土地神，稷=谷神，合指国家', modernEquivalent: '国家', example: '欲安社稷', source: '《左传》', allusion: '古代建国必立社稷坛，故以社稷代指国家政权' },
  { word: '鼎', classicalMeaning: '烹饪器→权力象征', modernEquivalent: '权力/国器', example: '问鼎中原', source: '《左传·宣公三年》', allusion: '楚庄王问鼎轻重，意在取代周天子，故"问鼎"喻篡位野心' },
  { word: '朕躬', classicalMeaning: '皇帝自身', modernEquivalent: '我本人（皇帝）', example: '朕躬有罪', source: '《尚书》', allusion: '' },
  { word: '郡县', classicalMeaning: '郡=大区，县=小区，行政单位', modernEquivalent: '省市/地方行政', example: '废封建，立郡县', source: '《史记》', allusion: '秦始皇废分封、立郡县是中国政治制度重大变革' },
  { word: '分封', classicalMeaning: '天子将土地分给诸侯', modernEquivalent: '诸侯分治', example: '周初分封天下', source: '《史记·周本纪》', allusion: '分封制导致诸侯割据，是秦统一前的主要政治制度' },
  { word: '觐', classicalMeaning: '朝见天子', modernEquivalent: '觐见/会见上级', example: '诸侯觐于天子', source: '《礼记》', allusion: '' },
  { word: '赋', classicalMeaning: '兵役/租税/诗歌体裁', modernEquivalent: '税/兵役/赋体诗', example: '苛政猛于虎也，赋敛之重', source: '《礼记·檀弓》', allusion: '一字多义：赋税、兵赋、辞赋' },
  { word: '禅', classicalMeaning: '让位/佛教修行', modernEquivalent: '禅让/禅宗', example: '尧舜禅让', source: '《尚书》', allusion: '禅让制是最早的权力交接方式，后被世袭制取代' },
  { word: '征', classicalMeaning: '天子伐诸侯', modernEquivalent: '讨伐/出征', example: '汤征诸侯', source: '《史记·殷本纪》', allusion: '古代军事用语等级：征（天子伐诸侯）>伐（诸侯伐诸侯）>侵（不宣而战）>袭（偷袭）' },
  { word: '弑', classicalMeaning: '臣杀君/子杀父', modernEquivalent: '以下杀上', example: '弑其君', source: '《春秋》', allusion: '严格等级用语：杀（平等间）<弑（臣杀君）<诛（正义杀）' },
  { word: '谥', classicalMeaning: '死后评价性称号', modernEquivalent: '死后称号/评价', example: '谥曰文王', source: '《史记》', allusion: '谥号制度：美谥（文、武、仁）>平谥（哀、悼）>恶谥（厉、炀、荒）' },
  { word: '崩', classicalMeaning: '帝王死亡', modernEquivalent: '皇帝去世', example: '太祖崩', source: '《资治通鉴》', allusion: '古代死亡等级：崩（帝王）>薨（诸侯）>卒（大夫）>不禄（士）>死（庶人）' },
  { word: '阙', classicalMeaning: '宫门/城门两侧观望台', modernEquivalent: '宫门/朝廷', example: '诣阙上书', source: '《史记》', allusion: '"阙"也指朝廷——诣阙即到朝廷申诉' },
  { word: '辟', classicalMeaning: '君主/征召/法律', modernEquivalent: '君王/征召/刑律', example: '复辟/征辟', source: '《汉书》', allusion: '多义字：君主（复辟）、征召（辟举）、法律（大辟=死刑）' },
  { word: '夷', classicalMeaning: '东方少数民族/平定', modernEquivalent: '少数民族/消灭', example: '化险为夷', source: '《尚书》', allusion: '古代四夷：东夷、南蛮、西戎、北狄——带有华夏中心色彩' },
  { word: '戎', classicalMeaning: '西方少数民族/军事', modernEquivalent: '少数民族/兵器', example: '戎马倥偬', source: '《左传》', allusion: '戎既指西戎民族，也指军事（戎装、戎机）' },
  { word: '诏', classicalMeaning: '皇帝下达命令', modernEquivalent: '皇帝命令/圣旨', example: '奉诏', source: '《汉书》', allusion: '' },
  { word: '笺', classicalMeaning: '小纸条/注释', modernEquivalent: '注释/便条', example: '笺注《诗经》', source: '', allusion: '' },
  { word: '策', classicalMeaning: '竹简/计策/策问', modernEquivalent: '公文/策略/考题', example: '运筹帷幄之中，决胜千里之策', source: '《史记·高祖本纪》', allusion: '' },
  { word: '表', classicalMeaning: '臣对君的奏文', modernEquivalent: '奏章/报告', example: '出师表', source: '诸葛亮《出师表》', allusion: '' },
  { word: '檄', classicalMeaning: '声讨性公文', modernEquivalent: '讨伐宣言', example: '檄文天下', source: '《后汉书》', allusion: '' },
  { word: '笞', classicalMeaning: '竹板鞭打（轻刑）', modernEquivalent: '鞭刑/体罚', example: '笞刑', source: '《汉书·刑法志》', allusion: '五刑等级：笞（最轻）→杖→徒→流→死' },
  { word: '朕', classicalMeaning: '皇帝自称', modernEquivalent: '我（皇帝）', example: '朕为始皇帝', source: '《史记》', allusion: '' },
  { word: '庙', classicalMeaning: '祖庙/宗庙', modernEquivalent: '祠堂/祖庙', example: '宗庙之事', source: '《论语》', allusion: '古代最神圣场所——社稷坛+宗庙=国家象征' },
  { word: '薨', classicalMeaning: '诸侯/高级贵族死亡', modernEquivalent: '高官去世', example: '公薨', source: '《春秋》', allusion: '' },
];

/** 搜索古汉语词典 */
export function searchDict(query: string): DictEntry[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return CLASSICAL_DICT.filter(e =>
    e.word.includes(q) ||
    e.classicalMeaning.includes(q) ||
    e.modernEquivalent.includes(q)
  ).slice(0, 10);
}
