/**
 * 水墨动画叙事短片数据 — SVG+CSS 简化版
 * @see history-museum/design/002-innovation-brainstorm.md §7
 */

export interface InkAnimation {
  id: string;
  title: string;
  yearDisplay: string;
  dynasty: string;
  /** 30秒分镜脚本 */
  scenes: InkScene[];
  /** 旁白文本（配合 TTS） */
  narration: string;
  /** 历史背景 */
  background: string;
  /** SVG 动画定义 */
  svgDefs: SvgAnimDef[];
}

export interface InkScene {
  /** 开始时间（秒） */
  startTime: number;
  /** 结束时间（秒） */
  endTime: number;
  /** 画面描述 */
  visual: string;
  /** 旁白片段 */
  narrationLine: string;
  /** 动画类型 */
  animType: 'ink-spread' | 'stroke-draw' | 'fade-in' | 'particle' | 'scroll';
}

export interface SvgAnimDef {
  id: string;
  /** SVG path 或形状 */
  paths: string[];
  /** 颜色 */
  color: string;
  /** 动画参数 */
  animation: {
    type: 'stroke-draw' | 'opacity' | 'scale' | 'translate';
    duration: number;
    delay: number;
  };
}

export const INK_ANIMATIONS: InkAnimation[] = [
  {
    id: 'chibi-ink',
    title: '赤壁之战 · 水墨动画',
    yearDisplay: '公元208年',
    dynasty: '三国',
    background: '曹操率大军南下，企图一统天下。孙刘联军以火攻击败曹军，奠定三国格局。',
    narration: '公元208年，曹操挥师南下，号称百万大军。江面战船连绵数十里，铁索连环，气势磅礴。然而，东南风起。周瑜与黄盖密谋火攻。一把烈火，从黄盖的船上燃起，瞬间吞噬了曹军连环船。火光映红了长江两岸，照亮了整个赤壁夜空。曹操仓皇北逃，天下三分之势就此奠定。赤壁之战，以少胜多，以智取胜，成为千古传诵的传奇。',
    scenes: [
      { startTime: 0, endTime: 6, visual: '江面宽阔，战船阵列', narrationLine: '公元208年，曹操挥师南下', animType: 'ink-spread' },
      { startTime: 6, endTime: 12, visual: '连环战船，铁索横江', narrationLine: '号称百万大军。江面战船连绵数十里，铁索连环', animType: 'stroke-draw' },
      { startTime: 12, endTime: 18, visual: '东南风起，旗帜飘动', narrationLine: '然而，东南风起', animType: 'particle' },
      { startTime: 18, endTime: 24, visual: '火船冲击，烈焰吞噬', narrationLine: '一把烈火，从黄盖的船上燃起，瞬间吞噬了曹军连环船', animType: 'ink-spread' },
      { startTime: 24, endTime: 28, visual: '火光映江，天际赤红', narrationLine: '火光映红了长江两岸，照亮了整个赤壁夜空', animType: 'particle' },
      { startTime: 28, endTime: 30, visual: '三分天下格局', narrationLine: '天下三分之势就此奠定', animType: 'fade-in' },
    ],
    svgDefs: [
      { id: 'river', paths: ['M0,300 Q200,280 400,300 Q600,280 800,300'], color: '#1a1a2e', animation: { type: 'stroke-draw', duration: 3, delay: 0 } },
      { id: 'ships', paths: ['M100,290 L120,260 L140,290', 'M200,290 L220,260 L240,290', 'M300,290 L320,260 L340,290'], color: '#4a4a5a', animation: { type: 'opacity', duration: 2, delay: 3 } },
      { id: 'fire', paths: ['M180,260 Q190,200 200,260', 'M195,240 Q200,180 205,240'], color: '#ff4500', animation: { type: 'scale', duration: 2, delay: 12 } },
    ],
  },
  {
    id: 'xuanwu-ink',
    title: '玄武门之变 · 水墨动画',
    yearDisplay: '公元626年',
    dynasty: '唐',
    background: '李世民在玄武门设伏，射杀太子建成和齐王元吉，登基为唐太宗。',
    narration: '武德九年六月初四，长安城玄武门。黎明前最黑暗的时刻，秦王李世民率九名亲信隐于门内。太子建成与齐王元吉骑马入朝，行至临湖殿觉察异常，掉转马头欲逃。李世民纵马追出，建成中箭身亡。尉迟敬德射杀元吉。两颗人头，悬于城门之上。长安，从此换了主人。两个月后，李渊禅让。贞观盛世，就此开启。',
    scenes: [
      { startTime: 0, endTime: 5, visual: '玄武门黎明，暗色城墙', narrationLine: '武德九年六月初四，长安城玄武门', animType: 'fade-in' },
      { startTime: 5, endTime: 10, visual: '伏兵隐于门内', narrationLine: '黎明前最黑暗的时刻，秦王李世民率九名亲信隐于门内', animType: 'ink-spread' },
      { startTime: 10, endTime: 15, visual: '建成元吉骑马入朝', narrationLine: '太子建成与齐王元吉骑马入朝', animType: 'stroke-draw' },
      { startTime: 15, endTime: 22, visual: '箭矢飞出，建成落马', narrationLine: '李世民纵马追出，建成中箭身亡', animType: 'particle' },
      { startTime: 22, endTime: 26, visual: '城门悬首，长安变色', narrationLine: '两颗人头，悬于城门之上。长安，从此换了主人', animType: 'scroll' },
      { startTime: 26, endTime: 30, visual: '贞观盛世开启', narrationLine: '贞观盛世，就此开启', animType: 'fade-in' },
    ],
    svgDefs: [
      { id: 'gate', paths: ['M350,50 L350,300 L450,300 L450,50'], color: '#2a2a3e', animation: { type: 'stroke-draw', duration: 3, delay: 0 } },
      { id: 'arrow', paths: ['M320,200 L360,180'], color: '#c0392b', animation: { type: 'stroke-draw', duration: 0.5, delay: 15 } },
    ],
  },
];

/** 获取旁白分段文本 */
export function getNarrationSegments(animation: InkAnimation): { time: number; text: string }[] {
  return animation.scenes.map(s => ({
    time: s.startTime,
    text: s.narrationLine,
  }));
}
