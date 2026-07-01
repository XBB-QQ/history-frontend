/**
 * 专题深度长文 — 类型定义
 */

export interface TopicChapter {
  id: string;
  title: string;
  content: string;
}

export interface Topic {
  id: number;
  uid: string;
  title: string;
  category: '制度' | '经济' | '军事' | '文化';
  coverImage?: string;
  summary: string;
  description: string;
  chapterCount: number;
  estimatedMinutes: number;
  tags: string[];
  relatedEvents: string[];
  relatedPersons: string[];
  chapters: TopicChapter[];
  references: string[];
  sortOrder: number;
}

export interface TopicReadingProgress {
  topicUid: string;
  lastReadChapter: string;
  lastReadAt: string;
  completedChapters: string[];
}
