/**
 * 个人史册数据
 * @see history-museum/ITERATIONS.md Iteration #77
 *
 * 用户可以记录自己的个人历史、人生大事和传记
 */

export interface LifeEvent {
  id: string;
  type: 'education' | 'work' | 'travel' | 'marriage' | 'family' | 'achievement' | 'other';
  title: string;
  date: string;
  location?: string;
  description: string;
  tags?: string[];
}

export interface PersonalHistory {
  id: string;
  name: string;
  gender: 'male' | 'female' | 'other';
  birthDate: string;
  birthLocation: string;
  education?: {
    school?: string;
    major?: string;
    degree?: string;
    year?: string;
  };
  work?: {
    company?: string;
    position?: string;
    industry?: string;
  };
  lifeEvents: LifeEvent[];
  biography: string;
  createdAt: string;
  updatedAt: string;
}

export const DEMO_HISTORY: PersonalHistory = {
  id: 'demo-1',
  name: '示例用户',
  gender: 'male',
  birthDate: '1990-01-01',
  birthLocation: '北京市',
  education: {
    school: '北京大学',
    major: '计算机科学与技术',
    degree: '学士',
    year: '2012'
  },
  work: {
    company: '腾讯',
    position: '软件工程师',
    industry: '互联网'
  },
  lifeEvents: [
    {
      id: '1',
      type: 'education',
      title: '大学毕业',
      date: '2012-07-01',
      location: '北京市',
      description: '从北京大学计算机系毕业，获得学士学位',
      tags: ['学习', '毕业', '大学']
    },
    {
      id: '2',
      type: 'work',
      title: '加入腾讯',
      date: '2012-07-15',
      location: '深圳市',
      description: '加入腾讯公司，开始软件工程师职业生涯',
      tags: ['工作', '入职', '腾讯']
    },
    {
      id: '3',
      type: 'travel',
      title: '第一次出国',
      date: '2015-05-20',
      location: '日本东京',
      description: '与朋友一起去日本旅游，体验异国文化',
      tags: ['旅行', '日本', '旅游']
    },
    {
      id: '4',
      type: 'marriage',
      title: '结婚',
      date: '2020-01-01',
      location: '北京市',
      description: '与相恋5年的恋人结婚',
      tags: ['结婚', '爱情', '家庭']
    },
    {
      id: '5',
      type: 'achievement',
      title: '晋升高级工程师',
      date: '2023-03-01',
      location: '深圳市',
      description: '在腾讯工作10年，晋升为高级工程师',
      tags: ['晋升', '成就', '工作']
    },
    {
      id: '6',
      type: 'family',
      title: '孩子出生',
      date: '2023-10-15',
      location: '深圳市',
      description: '第一个孩子出生，成为一名父亲',
      tags: ['家庭', '父亲', '孩子']
    }
  ],
  biography: '生于北京，毕业于北京大学计算机系。曾在腾讯工作多年，负责软件开发。热爱旅行和摄影，喜欢探索世界。',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z'
};

// 事件类型标签映射
export const EVENT_TYPE_LABELS: Record<LifeEvent['type'], string> = {
  education: '教育',
  work: '工作',
  travel: '旅行',
  marriage: '婚姻',
  family: '家庭',
  achievement: '成就',
  other: '其他'
};

// 事件类型图标映射
export const EVENT_TYPE_ICONS: Record<LifeEvent['type'], string> = {
  education: '🎓',
  work: '💼',
  travel: '✈️',
  marriage: '💒',
  family: '👨‍👩‍👧',
  achievement: '🏆',
  other: '📝'
};

// 事件类型颜色映射
export const EVENT_TYPE_COLORS: Record<LifeEvent['type'], string> = {
  education: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  work: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  travel: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  marriage: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
  family: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  achievement: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  other: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
};

// 事件类型统计
export const EVENT_TYPE_STATS = {
  education: { label: '教育', icon: '🎓', count: 0 },
  work: { label: '工作', icon: '💼', count: 0 },
  travel: { label: '旅行', icon: '✈️', count: 0 },
  marriage: { label: '婚姻', icon: '💒', count: 0 },
  family: { label: '家庭', icon: '👨‍👩‍👧', count: 0 },
  achievement: { label: '成就', icon: '🏆', count: 0 },
  other: { label: '其他', icon: '📝', count: 0 }
};
