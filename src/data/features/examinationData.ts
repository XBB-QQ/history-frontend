/**
 * 科举考试数据
 * @see history-museum/ITERATIONS.md Iteration #80
 *
 * 包含历代科举考试的题型、题目和评分标准
 */

export type QuestionType = 'choice' | 'fill' | 'essay' | 'match' | 'true_false';

export interface Question {
  id: string;
  type: QuestionType;
  dynasty: string;
  category: '四书五经' | '历史' | '诗词' | '政治' | '文学' | '礼仪' | '其他';
  question: string;
  options?: string[];
  answer: string;
  points: number;
  explanation?: string;
  difficulty: '入门' | '中级' | '高级';
}

export interface ExamPaper {
  id: string;
  title: string;
  dynasty: string;
  period: string;
  year?: string;
  description: string;
  totalScore: number;
  passingScore: number;
  duration: number; // 分钟
  questions: Question[];
  passingRate: string; // 如 '1:10'
}

export const EXAM_PAPERS: ExamPaper[] = [
  {
    id: 'ming-keju-1',
    title: '明太祖洪武三年乡试',
    dynasty: '明朝',
    period: '洪武三年（1370年）',
    year: '1370年',
    description: '明太祖朱元璋设立科举制度，这是第一次正式的乡试',
    totalScore: 100,
    passingScore: 60,
    duration: 120,
    passingRate: '1:5',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        dynasty: '明朝',
        category: '政治',
        question: '朱元璋恢复科举制度，主要目的是什么？',
        options: [
          '选拔人才治理国家',
          '压制文人',
          '改变历法',
          '推广佛教'
        ],
        answer: '选拔人才治理国家',
        points: 10,
        explanation: '朱元璋通过科举制度选拔贤才，巩固统治',
        difficulty: '入门'
      },
      {
        id: 'q2',
        type: 'choice',
        dynasty: '明朝',
        category: '政治',
        question: '明太祖恢复科举后，首次乡试是哪一年？',
        options: [
          '1368年',
          '1370年',
          '1380年',
          '1390年'
        ],
        answer: '1370年',
        points: 10,
        explanation: '洪武三年（1370年）首次举行乡试',
        difficulty: '中级'
      },
      {
        id: 'q3',
        type: 'fill',
        dynasty: '明朝',
        category: '政治',
        question: '明太祖朱元璋废除丞相制度是在哪一年？',
        answer: '1380年',
        points: 15,
        explanation: '1380年，朱元璋借口胡惟庸案，废除丞相制度',
        difficulty: '中级'
      },
      {
        id: 'q4',
        type: 'choice',
        dynasty: '明朝',
        category: '礼仪',
        question: '明朝科举考试分为几个阶段？',
        options: [
          '两个阶段',
          '三个阶段',
          '四个阶段',
          '五个阶段'
        ],
        answer: '三个阶段',
        points: 10,
        explanation: '科举考试分为：童生试、乡试、会试、殿试四个阶段',
        difficulty: '中级'
      },
      {
        id: 'q5',
        type: 'choice',
        dynasty: '明朝',
        category: '文学',
        question: '明朝科举考试的标准教材是哪本书？',
        options: [
          '史记',
          '资治通鉴',
          '四书五经',
          '本草纲目'
        ],
        answer: '四书五经',
        points: 10,
        explanation: '明清科举以《四书五经》为考试内容',
        difficulty: '入门'
      },
      {
        id: 'q6',
        type: 'true_false',
        dynasty: '明朝',
        category: '政治',
        question: '明朝科举考试允许考生自由发挥作答。',
        answer: 'false',
        points: 10,
        explanation: '科举考试有严格的标准答案，考生必须在文章中引用程朱理学的观点',
        difficulty: '中级'
      },
      {
        id: 'q7',
        type: 'essay',
        dynasty: '明朝',
        category: '政治',
        question: '请简述明朝科举考试对政治制度的影响。',
        answer: '需要写150字以上的分析，内容包括：1. 选拔了大批文官 2. 统一了思想 3. 促进了儒家文化传承 4. 但也扼杀了文人的创造力',
        points: 25,
        explanation: '这是典型的论述题，要求考生分析科举对政治的影响',
        difficulty: '高级'
      },
      {
        id: 'q8',
        type: 'choice',
        dynasty: '明朝',
        category: '文学',
        question: '明朝科举考试的主旨是？',
        options: [
          '选拔技术人才',
          '培养忠臣',
          '歌功颂德',
          '普及知识'
        ],
        answer: '培养忠臣',
        points: 10,
        explanation: '明朝科举考试的核心是培养忠于皇帝的文官',
        difficulty: '入门'
      },
      {
        id: 'q9',
        type: 'match',
        dynasty: '明朝',
        category: '政治',
        question: '将以下科举阶段与对应名称匹配',
        answer: '童生试-院试, 乡试-乡试, 会试-会试, 殿试-殿试',
        points: 20,
        explanation: '科举考试分为四个阶段：童生试（院试）、乡试、会试、殿试',
        difficulty: '中级'
      },
      {
        id: 'q10',
        type: 'essay',
        dynasty: '明朝',
        category: '政治',
        question: '有人说"八股文扼杀了文人的创造力"，请结合明朝科举制度谈谈你的看法。',
        answer: '需要写200字以上的评论，平衡分析：既要承认八股文形式僵化的问题，也要看到其在规范文化传承方面的作用',
        points: 20,
        explanation: '这是论述题，考察考生对科举制度利弊的分析能力',
        difficulty: '高级'
      }
    ]
  },
  {
    id: 'qing-keju-1',
    title: '清朝顺治九年会试',
    dynasty: '清朝',
    period: '顺治九年（1652年）',
    year: '1652年',
    description: '清朝建立后首次举行会试，标志着清廷正式采用科举制度',
    totalScore: 100,
    passingScore: 60,
    duration: 180,
    passingRate: '1:8',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        dynasty: '清朝',
        category: '政治',
        question: '清朝顺治年间，清廷首次采用科举制度是在哪一年？',
        options: [
          '1644年',
          '1652年',
          '1661年',
          '1665年'
        ],
        answer: '1652年',
        points: 10,
        explanation: '顺治九年（1652年）首次采用科举制度',
        difficulty: '入门'
      },
      {
        id: 'q2',
        type: 'choice',
        dynasty: '清朝',
        category: '政治',
        question: '清朝科举考试的主导思想是？',
        options: [
          '提倡百家争鸣',
          '程朱理学',
          '法家思想',
          '道家思想'
        ],
        answer: '程朱理学',
        points: 10,
        explanation: '清朝科举以程朱理学为主要思想',
        difficulty: '入门'
      },
      {
        id: 'q3',
        type: 'fill',
        dynasty: '清朝',
        category: '政治',
        question: '清朝"八股取士"的标准文本是？',
        answer: '四书五经',
        points: 15,
        explanation: '清朝科举以《四书五经》为标准文本',
        difficulty: '中级'
      },
      {
        id: 'q4',
        type: 'choice',
        dynasty: '清朝',
        category: '礼仪',
        question: '清朝科举考试要求文章的字数是多少？',
        options: [
          '200字左右',
          '800字左右',
          '1000字左右',
          '2000字左右'
        ],
        answer: '800字左右',
        points: 10,
        explanation: '清朝科举文章要求在800字左右',
        difficulty: '中级'
      },
      {
        id: 'q5',
        type: 'choice',
        dynasty: '清朝',
        category: '历史',
        question: '清朝科举考试最严格的标准是？',
        options: [
          '文章字数',
          '观点正确性',
          '格式规范',
          '文采华丽'
        ],
        answer: '格式规范',
        points: 10,
        explanation: '清朝科举最严格的是八股文的格式规范',
        difficulty: '中级'
      },
      {
        id: 'q6',
        type: 'true_false',
        dynasty: '清朝',
        category: '政治',
        question: '清朝科举考试允许考生创新。',
        answer: 'false',
        points: 10,
        explanation: '清朝科举考试要求严格遵循程朱理学的标准答案，不允许创新',
        difficulty: '中级'
      },
      {
        id: 'q7',
        type: 'essay',
        dynasty: '清朝',
        category: '政治',
        question: '请分析清朝科举制度对清朝统治的影响。',
        answer: '需要写150字以上的分析，内容包括：1. 统一了思想 2. 培养了大批官员 3. 巩固了统治 4. 但也扼杀了创新精神',
        points: 25,
        explanation: '分析科举对清朝政治的影响',
        difficulty: '高级'
      },
      {
        id: 'q8',
        type: 'choice',
        dynasty: '清朝',
        category: '政治',
        question: '清朝科举考试的最终目的是？',
        options: [
          '培养创新人才',
          '选拔贤能',
          '统一思想',
          '推广科学'
        ],
        answer: '统一思想',
        points: 10,
        explanation: '清朝科举考试的核心是统一思想，培养忠于皇权的官员',
        difficulty: '入门'
      },
      {
        id: 'q9',
        type: 'match',
        dynasty: '清朝',
        category: '政治',
        question: '将以下科举阶段与对应名称匹配',
        answer: '童生试-院试, 乡试-乡试, 会试-会试, 殿试-殿试',
        points: 20,
        explanation: '科举考试分为四个阶段',
        difficulty: '中级'
      },
      {
        id: 'q10',
        type: 'essay',
        dynasty: '清朝',
        category: '政治',
        question: '有人说"八股文束缚了思想"，请结合清朝科举谈谈你的看法。',
        answer: '需要写200字以上的评论，分析八股文的利弊',
        points: 20,
        explanation: '论述题，考察对科举制度的批判性思维',
        difficulty: '高级'
      }
    ]
  },
  {
    id: 'song-keju-1',
    title: '北宋科举改革',
    dynasty: '宋朝',
    period: '北宋中期',
    year: '1057年',
    description: '北宋嘉祐二年（1057年）欧阳修主持科举，这次改革对后世影响深远',
    totalScore: 100,
    passingScore: 60,
    duration: 180,
    passingRate: '1:3',
    questions: [
      {
        id: 'q1',
        type: 'choice',
        dynasty: '宋朝',
        category: '政治',
        question: '北宋嘉祐二年（1057年）主持科举的是谁？',
        options: [
          '欧阳修',
          '苏轼',
          '司马光',
          '王安石'
        ],
        answer: '欧阳修',
        points: 10,
        explanation: '嘉祐二年，欧阳修主持科举',
        difficulty: '入门'
      },
      {
        id: 'q2',
        type: 'choice',
        dynasty: '宋朝',
        category: '政治',
        question: '北宋科举改革的主要特点是？',
        options: [
          '废除科举',
          '提倡自由',
          '重视文采',
          '只考技术'
        ],
        answer: '重视文采',
        points: 10,
        explanation: '欧阳修主持的科举改革重视文采',
        difficulty: '中级'
      },
      {
        id: 'q3',
        type: 'fill',
        dynasty: '宋朝',
        category: '政治',
        question: '欧阳修主持的科举改革影响了几代人？',
        answer: '几代人',
        points: 15,
        explanation: '欧阳修主持的科举改革对后世影响深远，影响了几代人',
        difficulty: '中级'
      },
      {
        id: 'q4',
        type: 'choice',
        dynasty: '宋朝',
        category: '文学',
        question: '欧阳修主持的科举考试，最看重的方面是？',
        options: [
          '文章的文采',
          '科举的格式',
          '文章的字数',
          '文章的创新'
        ],
        answer: '文章的文采',
        points: 10,
        explanation: '欧阳修重视文采',
        difficulty: '中级'
      },
      {
        id: 'q5',
        type: 'choice',
        dynasty: '宋朝',
        category: '政治',
        question: '欧阳修主持的科举改革对后世的影响是？',
        options: [
          '完全废除科举',
          '彻底改变科举',
          '影响深远',
          '没有影响'
        ],
        answer: '影响深远',
        points: 10,
        explanation: '欧阳修主持的科举改革影响深远',
        difficulty: '中级'
      },
      {
        id: 'q6',
        type: 'true_false',
        dynasty: '宋朝',
        category: '政治',
        question: '欧阳修主持的科举改革完全废除了八股文。',
        answer: 'false',
        points: 10,
        explanation: '欧阳修没有废除八股文，只是更重视文采',
        difficulty: '中级'
      },
      {
        id: 'q7',
        type: 'essay',
        dynasty: '宋朝',
        category: '政治',
        question: '请分析欧阳修主持的科举改革的意义。',
        answer: '需要写150字以上的分析，内容包括：1. 推崇文采 2. 培养了大批优秀人才 3. 促进了宋代文学发展 4. 对后世科举有重要影响',
        points: 25,
        explanation: '分析欧阳修科举改革的意义',
        difficulty: '高级'
      },
      {
        id: 'q8',
        type: 'choice',
        dynasty: '宋朝',
        category: '政治',
        question: '欧阳修主持的科举改革主要倡导的是？',
        options: [
          '文采',
          '八股文',
          '程朱理学',
          '法家思想'
        ],
        answer: '文采',
        points: 10,
        explanation: '欧阳修主要倡导文采',
        difficulty: '入门'
      },
      {
        id: 'q9',
        type: 'match',
        dynasty: '宋朝',
        category: '政治',
        question: '将以下科举改革者与对应影响匹配',
        answer: '欧阳修-重视文采, 宋真宗-重视才华, 王安石-改革制度, 朱熹-确立程朱理学',
        points: 20,
        explanation: '匹配不同的科举改革者及其影响',
        difficulty: '中级'
      },
      {
        id: 'q10',
        type: 'essay',
        dynasty: '宋朝',
        category: '政治',
        question: '有人说"欧阳修的科举改革是宋代文学的转折点"，请谈谈你的看法。',
        answer: '需要写200字以上的评论，分析欧阳修改革对宋代文学的影响',
        points: 20,
        explanation: '论述题，考察对文学与科举关系的理解',
        difficulty: '高级'
      }
    ]
  }
];

// 科目统计
export const CATEGORY_STATS = {
  '四书五经': { label: '四书五经', icon: '📖', count: 0 },
  '历史': { label: '历史', icon: '📜', count: 0 },
  '诗词': { label: '诗词', icon: '✒️', count: 0 },
  '政治': { label: '政治', icon: '🏛️', count: 0 },
  '文学': { label: '文学', icon: '📚', count: 0 },
  '礼仪': { label: '礼仪', icon: '🎎', count: 0 },
  '其他': { label: '其他', icon: '📝', count: 0 }
};

// 按类型统计
export const TYPE_STATS = {
  'choice': { label: '选择题', icon: '🔘', count: 0 },
  'fill': { label: '填空题', icon: '□', count: 0 },
  'essay': { label: '论述题', icon: '📝', count: 0 },
  'match': { label: '匹配题', icon: '🔗', count: 0 },
  'true_false': { label: '判断题', icon: '✓✗', count: 0 }
};
