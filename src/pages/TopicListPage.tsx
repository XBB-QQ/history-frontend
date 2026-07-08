/**
 * 专题列表页
 * 展示所有专题，支持按分类筛选
 */

import { useState } from 'react';
import { TOPICS, BLIND_SPOT_TAGS } from '@/data/topics';
import { useNavigate } from 'react-router-dom';
import { useT } from '@/i18n/i18n';

const CATEGORIES = ['全部', '制度', '经济', '军事', '文化'];
const CATEGORY_LABEL_KEYS: Record<string, string> = {
  '全部': 'topicList.category_all',
  '制度': 'topicList.category_system',
  '经济': 'topicList.category_economy',
  '军事': 'topicList.category_military',
  '文化': 'topicList.category_culture',
};
const CATEGORY_COLORS: Record<string, string> = {
  制度: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  经济: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  军事: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  文化: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
};

export default function TopicListPage() {
  const navigate = useNavigate();
  const t = useT();
  const [activeCategory, setActiveCategory] = useState('全部');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? TOPICS.filter(topic => topic.tags.includes(activeTag))
    : activeCategory === '全部'
      ? TOPICS
      : TOPICS.filter(topic => topic.category === activeCategory);

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 dark:from-ink-900 dark:to-ink-800 py-12 md:py-20">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-4 left-10 text-8xl font-serif text-ink-900">专题</div>
          <div className="absolute bottom-4 right-10 text-6xl font-serif text-ink-900">长文</div>
        </div>
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-ink-900 dark:text-ink-100 mb-4">
            {t('topicList.hero_title')}
          </h1>
          <p className="text-lg text-ink-600 dark:text-ink-400 max-w-2xl mx-auto">
            {t('topicList.hero_subtitle')}
          </p>
        </div>
      </div>

      {/* 分类筛选 */}
      <div className="max-w-6xl mx-auto px-6 -mt-6">
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setActiveTag(null); }}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                !activeTag && activeCategory === cat
                  ? 'bg-accent text-white shadow-lg'
                  : 'bg-white dark:bg-ink-800 text-ink-600 dark:text-ink-400 hover:bg-ink-100 dark:hover:bg-ink-700'
              }`}
            >
              {t(CATEGORY_LABEL_KEYS[cat] || cat)}
            </button>
          ))}
        </div>

        {/* 补盲视角筛选 */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <span className="text-xs text-ink-400 dark:text-ink-500 self-center mr-1">补盲视角:</span>
          {BLIND_SPOT_TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all border ${
                activeTag === tag
                  ? 'bg-amber-500 text-white border-amber-500 shadow-md'
                  : 'bg-transparent text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-700 hover:bg-amber-50 dark:hover:bg-amber-900/20'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* 专题卡片列表 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(topic => (
            <div
              key={topic.uid}
              onClick={() => navigate(`/topic/${topic.uid}`)}
              className="bg-white dark:bg-ink-900 rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer border border-ink-100 dark:border-ink-700 overflow-hidden group"
            >
              {/* 分类标签 */}
              <div className={`px-4 py-2 text-xs font-bold ${CATEGORY_COLORS[topic.category] || 'bg-ink-100 text-ink-600'}`}>
                {topic.category}
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-2 group-hover:text-accent transition-colors">
                  {topic.title}
                </h3>
                <p className="text-sm text-ink-600 dark:text-ink-400 leading-relaxed mb-4 line-clamp-3">
                  {topic.summary}
                </p>

                <div className="flex items-center justify-between text-xs text-ink-400 dark:text-ink-500">
                  <span>{t('topicList.chapter_minutes', { chapters: topic.chapterCount, minutes: topic.estimatedMinutes })}</span>
                  <span className="flex gap-1">
                    {topic.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="px-1.5 py-0.5 bg-ink-50 dark:bg-ink-800 rounded">#{tag}</span>
                    ))}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-ink-400">
            {t('topicList.empty')}
          </div>
        )}
      </div>
    </div>
  );
}
