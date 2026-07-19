/**
 * 典籍原典数据 — 精选史书选段 + 白话对照
 * @see classicsApi.ts service 层封装，未来可对接 ctext.org API
 */

export interface ClassicText {
  id: string;
  title: string;
  /** 原典出处（书名+篇章） */
  source: string;
  author?: string;
  dynasty: string;
  year: string;
  /** 选段类型 */
  category: 'history' | 'philosophy' | 'literature' | 'military' | 'science';
  /** 主题分类（如：本纪/列传/世家） */
  section?: string;
  /** 原文 */
  original: string;
  /** 白话翻译 */
  translation: string;
  /** 注解（人名/地名/制度） */
  annotations?: { term: string; explanation: string }[];
  /** 出处上下文与历史价值 */
  context: string;
  /** ctext.org 链接（外链查阅全文） */
  ctextUrl: string;
  tags: string[];
}
