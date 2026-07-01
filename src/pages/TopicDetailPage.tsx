/**
 * 专题详情页 — 分段阅读 + 进度追踪
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { findTopicByUid } from '@/data/topics';
import type { Topic } from '@/types/topic';

const CATEGORY_COLORS: Record<string, string> = {
  制度: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  经济: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  军事: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  文化: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
};

/** 从 localStorage 读取阅读进度 */
function getProgress(topicUid: string): string {
  try {
    const raw = localStorage.getItem(`topic_progress_${topicUid}`);
    return raw ? JSON.parse(raw).lastReadChapter : 'ch1';
  } catch {
    return 'ch1';
  }
}

/** 保存阅读进度到 localStorage */
function saveProgress(topicUid: string, chapterId: string) {
  try {
    const key = `topic_progress_${topicUid}`;
    const existing = (() => {
      try { return JSON.parse(localStorage.getItem(key) || '{}'); } catch { return {}; }
    })();
    localStorage.setItem(key, JSON.stringify({
      ...existing,
      lastReadChapter: chapterId,
      lastReadAt: new Date().toISOString(),
    }));
  } catch { /* 静默失败 */ }
}

export default function TopicDetailPage() {
  const { uid } = useParams<{ uid: string }>();
  const navigate = useNavigate();
  const topic = uid ? findTopicByUid(uid) : null;
  const [activeChapter, setActiveChapter] = useState('ch1');

  useEffect(() => {
    if (topic) {
      setActiveChapter(getProgress(topic.uid));
    }
  }, [topic]);

  if (!topic) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper dark:bg-ink-950">
        <div className="text-center">
          <div className="text-6xl mb-4">📜</div>
          <h2 className="text-xl font-bold text-ink-800 dark:text-ink-200 mb-2">专题未找到</h2>
          <button onClick={() => navigate('/topics')} className="text-accent hover:underline">
            返回首页
          </button>
        </div>
      </div>
    );
  }

  const currentChapter = topic.chapters.find(c => c.id === activeChapter) || topic.chapters[0];
  const chapterIndex = topic.chapters.findIndex(c => c.id === activeChapter);
  const prevChapter = chapterIndex > 0 ? topic.chapters[chapterIndex - 1] : null;
  const nextChapter = chapterIndex < topic.chapters.length - 1 ? topic.chapters[chapterIndex + 1] : null;
  const progressPercent = Math.round(((chapterIndex + 1) / topic.chapters.length) * 100);

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-40 bg-white/90 dark:bg-ink-900/90 backdrop-blur-sm border-b border-ink-200 dark:border-ink-700">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
          <button onClick={() => navigate('/topics')} className="text-sm text-ink-500 hover:text-accent transition-colors">
            ← 返回专题列表
          </button>
          <div className="flex items-center gap-3">
            <span className="text-xs text-ink-400 dark:text-ink-500">
              {progressPercent}% 完成
            </span>
            <div className="w-24 h-1.5 bg-ink-100 dark:bg-ink-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-accent rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* 专题头部 */}
        <div className="mb-8">
          <div className={`inline-block px-3 py-1 text-xs font-bold rounded-full mb-3 ${CATEGORY_COLORS[topic.category] || ''}`}>
            {topic.category}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-ink-900 dark:text-ink-100 mb-3">
            {topic.title}
          </h1>
          <p className="text-lg text-ink-600 dark:text-ink-400 leading-relaxed mb-4">
            {topic.summary}
          </p>
          <div className="flex flex-wrap gap-4 text-xs text-ink-400 dark:text-ink-500">
            <span>{topic.chapterCount} 章</span>
            <span>·</span>
            <span>约 {topic.estimatedMinutes} 分钟</span>
            <span>·</span>
            <span>{topic.tags.map(t => `#${t}`).join(' ')}</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* 左侧：章节目录 */}
          <aside className="md:w-64 flex-shrink-0">
            <div className="sticky top-20 bg-white dark:bg-ink-900 rounded-xl shadow-sm border border-ink-100 dark:border-ink-700 p-4">
              <h3 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-3">章节目录</h3>
              <ul className="space-y-1">
                {topic.chapters.map((chapter, i) => (
                  <li key={chapter.id}>
                    <button
                      onClick={() => {
                        setActiveChapter(chapter.id);
                        saveProgress(topic.uid, chapter.id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-all ${
                        activeChapter === chapter.id
                          ? 'bg-accent/10 text-accent font-bold'
                          : 'text-ink-600 dark:text-ink-400 hover:bg-ink-50 dark:hover:bg-ink-800'
                      }`}
                    >
                      <span className="text-xs opacity-60 mr-2">{i + 1}.</span>
                      {chapter.title.replace(/^第[一二三四五六七八九十]+章[：:]\s*/, '')}
                    </button>
                  </li>
                ))}
              </ul>

              {/* 参考资料 */}
              {topic.references.length > 0 && (
                <div className="mt-6 pt-4 border-t border-ink-100 dark:border-ink-700">
                  <h4 className="text-xs font-bold text-ink-500 dark:text-ink-400 mb-2">参考资料</h4>
                  <ul className="text-xs text-ink-400 dark:text-ink-500 space-y-1">
                    {topic.references.map((ref, i) => (
                      <li key={i}>• {ref}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>

          {/* 右侧：正文 */}
          <main className="flex-1 min-w-0">
            {currentChapter && (
              <article className="bg-white dark:bg-ink-900 rounded-xl shadow-sm border border-ink-100 dark:border-ink-700 p-6 md:p-8">
                <h2 className="text-xl font-bold text-ink-900 dark:text-ink-100 mb-6 pb-4 border-b border-ink-100 dark:border-ink-700">
                  {currentChapter.title}
                </h2>
                <div className="prose prose-ink dark:prose-invert max-w-none">
                  {currentChapter.content.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="text-ink-800 dark:text-ink-200 leading-loose mb-4 text-justify">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* 章节导航 */}
                <div className="mt-10 pt-6 border-t border-ink-100 dark:border-ink-700 flex items-center justify-between gap-4">
                  {prevChapter ? (
                    <button
                      onClick={() => {
                        setActiveChapter(prevChapter.id);
                        saveProgress(topic.uid, prevChapter.id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="flex items-center gap-2 text-sm text-ink-500 hover:text-accent transition-colors"
                    >
                      ← 上一章
                    </button>
                  ) : (
                    <div />
                  )}
                  {nextChapter ? (
                    <button
                      onClick={() => {
                        setActiveChapter(nextChapter.id);
                        saveProgress(topic.uid, nextChapter.id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="flex items-center gap-2 text-sm text-accent font-bold hover:underline"
                    >
                      下一章 →
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate('/topics')}
                      className="text-sm text-accent font-bold hover:underline"
                    >
                      读完！返回专题列表 →
                    </button>
                  )}
                </div>
              </article>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
