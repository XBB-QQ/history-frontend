/**
 * 课程对齐学习路径 — 对标人教版历史教材大纲
 * 从初中七年级到高中必修，知识点映射到平台内容
 */

export interface K12Path {
  id: string;
  grade: string;
  semester: string;
  textbook: string;
  chapters: K12Chapter[];
}

export interface K12Chapter {
  chapterNum: number;
  title: string;
  /** 关联的平台内容 */
  relatedDynasties: string[];
  relatedEvents: string[];
  relatedPersons: string[];
  /** 核心知识点 */
  keyPoints: string[];
  /** 章节测试题 */
  quiz: K12Quiz;
}

export interface K12Quiz {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export const K12_PATHS: K12Path[] = [
  {
    id: 'grade7-1',
    grade: '七年级',
    semester: '上学期',
    textbook: '人教版·中国历史（第一册）',
    chapters: [
      {
        chapterNum: 1,
        title: '中国早期人类的代表——北京人',
        relatedDynasties: ['xia'],
        relatedEvents: [],
        relatedPersons: [],
        keyPoints: ['元谋人是最早的人类', '北京人使用天然火', '山顶洞人掌握人工取火'],
        quiz: { question: '我国境内已知最早的人类是？', options: ['北京人', '元谋人', '山顶洞人', '河姆渡人'], answer: 1, explanation: '元谋人距今约170万年，是目前我国境内已知最早的人类' },
      },
      {
        chapterNum: 2,
        title: '原始农耕生活',
        relatedDynasties: ['xia'],
        relatedEvents: [],
        relatedPersons: [],
        keyPoints: ['河姆渡人种水稻', '半坡居民种粟', '原始农业的出现'],
        quiz: { question: '河姆渡原始居民最早种植的农作物是？', options: ['粟', '水稻', '小麦', '玉米'], answer: 1, explanation: '河姆渡位于南方，气候适合种植水稻' },
      },
      {
        chapterNum: 3,
        title: '华夏之祖',
        relatedDynasties: ['xia'],
        relatedEvents: [],
        relatedPersons: [],
        keyPoints: ['黄帝和炎帝的传说', '禹建立夏朝', '禅让制到世袭制'],
        quiz: { question: '标志着中国进入文明时代的是？', options: ['炎黄传说', '夏朝的建立', '商朝的建立', '周朝的建立'], answer: 1, explanation: '夏朝是中国第一个王朝，标志着文明时代的开始' },
      },
      {
        chapterNum: 4,
        title: '夏商周的兴亡',
        relatedDynasties: ['shang', 'zhou'],
        relatedEvents: ['muye-battle'],
        relatedPersons: [],
        keyPoints: ['夏朝灭亡', '商朝青铜器', '西周分封制', '牧野之战'],
        quiz: { question: '商朝最著名的青铜器是？', options: ['司母戊鼎', '四羊方尊', '铜车马', '编钟'], answer: 0, explanation: '司母戊鼎（后母戊鼎）是商朝最大的青铜器' },
      },
      {
        chapterNum: 9,
        title: '秦统一中国',
        relatedDynasties: ['qin'],
        relatedEvents: ['qin-unify'],
        relatedPersons: [],
        keyPoints: ['秦始皇统一六国', '郡县制', '统一文字货币度量衡', '中央集权制度'],
        quiz: { question: '秦始皇统一后推行的文字是？', options: ['甲骨文', '金文', '小篆', '楷书'], answer: 2, explanation: '秦始皇统一文字为小篆，由李斯制定标准' },
      },
      {
        chapterNum: 11,
        title: '西汉的建立与强盛',
        relatedDynasties: ['han'],
        relatedEvents: ['zhangqian-western'],
        relatedPersons: [],
        keyPoints: ['汉武帝加强中央集权', '张骞通西域', '丝绸之路', '察举制'],
        quiz: { question: '丝绸之路的起点是？', options: ['洛阳', '长安', '咸阳', '开封'], answer: 1, explanation: '长安（今西安）是丝绸之路的东方起点' },
      },
      {
        chapterNum: 15,
        title: '两汉的科技和文化',
        relatedDynasties: ['han'],
        relatedEvents: [],
        relatedPersons: [],
        keyPoints: ['造纸术', '张衡地动仪', '华佗', '司马迁《史记》'],
        quiz: { question: '改进造纸术的人是？', options: ['张衡', '蔡伦', '华佗', '司马迁'], answer: 1, explanation: '蔡伦在105年改进造纸工艺，用廉价材料制纸' },
      },
    ],
  },
  {
    id: 'grade7-2',
    grade: '七年级',
    semester: '下学期',
    textbook: '人教版·中国历史（第二册）',
    chapters: [
      {
        chapterNum: 1,
        title: '隋朝的统一与灭亡',
        relatedDynasties: ['sui'],
        relatedEvents: [],
        relatedPersons: [],
        keyPoints: ['隋朝统一', '大运河', '科举制创立', '隋炀帝暴政'],
        quiz: { question: '科举制正式诞生的标志是？', options: ['隋文帝分科考试', '隋炀帝设进士科', '唐太宗完善科举', '武则天殿试'], answer: 1, explanation: '隋炀帝设置进士科标志着科举制的正式诞生' },
      },
      {
        chapterNum: 2,
        title: '从"贞观之治"到"开元盛世"',
        relatedDynasties: ['tang'],
        relatedEvents: [],
        relatedPersons: [],
        keyPoints: ['唐太宗纳谏', '贞观之治', '开元盛世', '武则天执政'],
        quiz: { question: '"贞观之治"指的是哪个皇帝在位时期？', options: ['唐高祖', '唐太宗', '唐玄宗', '武则天'], answer: 1, explanation: '贞观是唐太宗李世民的年号' },
      },
      {
        chapterNum: 3,
        title: '盛唐气象',
        relatedDynasties: ['tang'],
        relatedEvents: [],
        relatedPersons: [],
        keyPoints: ['经济繁荣', '民族交融', '开放的社会风气', '唐诗'],
        quiz: { question: '被誉为"诗仙"的唐代诗人是？', options: ['杜甫', '白居易', '李白', '王维'], answer: 2, explanation: '李白诗风浪漫豪放，被后人称为"诗仙"' },
      },
      {
        chapterNum: 4,
        title: '唐朝的中外文化交流',
        relatedDynasties: ['tang'],
        relatedEvents: [],
        relatedPersons: [],
        keyPoints: ['遣唐使', '鉴真东渡', '玄奘西行', '唐文化影响'],
        quiz: { question: '东渡日本传播唐朝文化的是？', options: ['玄奘', '鉴真', '郑和', '张骞'], answer: 1, explanation: '鉴真六次东渡日本成功，传播了唐朝文化' },
      },
      {
        chapterNum: 5,
        title: '安史之乱与唐朝衰亡',
        relatedDynasties: ['tang'],
        relatedEvents: ['an-shi-rebellion'],
        relatedPersons: [],
        keyPoints: ['安史之乱', '藩镇割据', '唐朝灭亡', '五代十国'],
        quiz: { question: '唐朝由盛转衰的转折点是？', options: ['玄武门之变', '安史之乱', '黄巢起义', '藩镇割据'], answer: 1, explanation: '安史之乱使唐朝从巅峰走向衰落' },
      },
    ],
  },
  {
    id: 'grade8-1',
    grade: '八年级',
    semester: '上学期',
    textbook: '人教版·中国历史（近代史）',
    chapters: [
      {
        chapterNum: 1,
        title: '鸦片战争',
        relatedDynasties: ['qing'],
        relatedEvents: [],
        relatedPersons: [],
        keyPoints: ['林则徐虎门销烟', '鸦片战争爆发', '《南京条约》', '中国开始沦为半殖民地'],
        quiz: { question: '中国近代史的开端是？', options: ['鸦片战争', '甲午战争', '辛亥革命', '五四运动'], answer: 0, explanation: '1840年鸦片战争标志着中国近代史的开端' },
      },
    ],
  },
];
