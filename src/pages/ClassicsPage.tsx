/**
 * 典籍原典页 — 完整原典 + AI 白话译文双栏对照
 * 数据三源：
 *   1. 本地精选 30 段（含注解与历史背景）
 *   2. Wikisource / ctext.org API（展开时自动加载完整原典原文）
 *   3. GLM-4-Flash AI 翻译（自动生成白话译文，带 24h 缓存）
 */
import { useEffect, useMemo, useState } from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import {
  fetchClassics,
  fetchCtextStatus,
  getClassicSources,
  searchCtextBooks,
  type ClassicQuery,
  type CtextBook,
  type CtextStatus,
} from '@/services/classicsApi';
import type { ClassicText } from '@/types/classic';
import ClassicFulltext from '@/pages/classics/ClassicFulltext';

const CATEGORY_LABEL: Record<string, string> = {
  history: '史书',
  philosophy: '子部',
  literature: '集部',
  military: '兵书',
  science: '科技',
};

export default function ClassicsPage() {
  const [classics, setClassics] = useState<ClassicText[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<ClassicQuery>({});
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // ctext 扩展功能
  const [ctextStatus, setCtextStatus] = useState<CtextStatus | null>(null);
  const [showCtextSearch, setShowCtextSearch] = useState(false);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchResults, setSearchResults] = useState<CtextBook[]>([]);
  const [searching, setSearching] = useState(false);

  // 初次加载：本地典籍 + ctext 状态
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchClassics(query)
      .then((data) => {
        if (!cancelled) setClassics(data);
      })
      .catch((e) => {
        if (!cancelled) setError(e.message || '加载失败');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    // 并行查询 ctext 认证状态（非阻塞，失败静默）
    fetchCtextStatus().then((s) => {
      if (!cancelled) setCtextStatus(s);
    });

    return () => {
      cancelled = true;
    };
  }, [query]);

  const sources = useMemo(() => getClassicSources(), []);

  /** 执行 ctext 书名搜索 */
  const handleCtextSearch = async () => {
    if (!searchTitle.trim()) return;
    setSearching(true);
    setSearchResults([]);
    try {
      const books = await searchCtextBooks(searchTitle);
      setSearchResults(books);
    } finally {
      setSearching(false);
    }
  };

  // ctext 是否可用（用于 UI 提示）
  const ctextAvailable = ctextStatus?.loggedin === 'true' || ctextStatus?.subscriber === 'true';

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-amber-50 to-yellow-50 dark:from-ink-950 dark:via-ink-950 dark:to-ink-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="典籍原典"
          title="史海撷英"
          description="《史记》《资治通鉴》《二十四史》选段，原文与白话对照研读"
        />

        {/* 筛选栏 */}
        <RevealOnScroll>
          <div className="bg-white dark:bg-ink-800 rounded-2xl shadow-md p-4 mb-8 space-y-3">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm font-bold text-ink-700 dark:text-ink-300">类型：</span>
              <button
                onClick={() => setQuery((q) => ({ ...q, category: undefined }))}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  !query.category
                    ? 'bg-stone-700 text-white'
                    : 'bg-stone-100 dark:bg-ink-700 text-ink-600 dark:text-ink-300'
                }`}
              >
                全部
              </button>
              {(['history', 'philosophy', 'literature', 'military'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setQuery((q) => ({ ...q, category: cat }))}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                    query.category === cat
                      ? 'bg-stone-700 text-white'
                      : 'bg-stone-100 dark:bg-ink-700 text-ink-600 dark:text-ink-300'
                  }`}
                >
                  {CATEGORY_LABEL[cat]}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm font-bold text-ink-700 dark:text-ink-300">来源：</span>
              <button
                onClick={() => setQuery((q) => ({ ...q, source: undefined }))}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  !query.source
                    ? 'bg-amber-700 text-white'
                    : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                }`}
              >
                全部
              </button>
              {sources.map((src) => (
                <button
                  key={src}
                  onClick={() => setQuery((q) => ({ ...q, source: src }))}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                    query.source === src
                      ? 'bg-amber-700 text-white'
                      : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                  }`}
                >
                  《{src}》
                </button>
              ))}
            </div>

            {/* ctext 搜索切换 */}
            <div className="pt-2 border-t border-ink-100 dark:border-ink-700">
              <button
                onClick={() => setShowCtextSearch((v) => !v)}
                className="text-xs text-amber-700 dark:text-amber-400 hover:underline"
              >
                {showCtextSearch ? '▾ 收起 ctext 在线搜索' : '▸ 展开在 ctext.org 搜索更多典籍'}
              </button>
              <span className="ml-2 text-xs text-ink-400 dark:text-ink-500">
                {ctextStatus === null
                  ? '(状态查询中)'
                  : ctextAvailable
                    ? '(已认证·可获取全文)'
                    : '(未认证·仅显示搜索结果)'}
              </span>
            </div>

            {showCtextSearch && (
              <div className="space-y-3 pt-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCtextSearch()}
                    placeholder="输入书名，如：论语、史记、孙子兵法"
                    className="flex-1 px-3 py-1.5 rounded-lg border border-ink-200 dark:border-ink-700 bg-stone-50 dark:bg-ink-900 text-sm text-ink-800 dark:text-ink-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                  <button
                    onClick={handleCtextSearch}
                    disabled={searching || !searchTitle.trim()}
                    className="px-4 py-1.5 rounded-lg bg-amber-700 text-white text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-amber-800"
                  >
                    {searching ? '搜索中...' : '搜索'}
                  </button>
                </div>

                {searchResults.length > 0 && (
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {searchResults.slice(0, 30).map((book) => (
                      <ClassicFulltext key={book.urn} book={book} />
                    ))}
                  </div>
                )}

                {!searching && searchResults.length === 0 && searchTitle && (
                  <p className="text-xs text-ink-400">输入书名后按回车或点击搜索</p>
                )}
              </div>
            )}
          </div>
        </RevealOnScroll>

        {loading && <div className="text-center py-12 text-ink-400">加载中...</div>}
        {error && (
          <div className="text-center py-12 text-red-500">
            {error}
            <button
              onClick={() => window.location.reload()}
              className="block mx-auto mt-3 px-4 py-1.5 rounded bg-ink-100 dark:bg-ink-800 text-sm"
            >
              重试
            </button>
          </div>
        )}

        {!loading && !error && classics.length === 0 && (
          <div className="text-center py-12 text-ink-400">暂无符合条件的典籍选段</div>
        )}

        {/* 典籍列表 */}
        <div className="space-y-4">
          {classics.map((classic, idx) => {
            // Wikisource 搜索词：取 source 去掉书名号（如"《史记·项羽本纪》"→"史记·项羽本纪"）
            const wsSearch = classic.source.replace(/[《》]/g, '');
            return (
            <RevealOnScroll key={classic.id} delay={idx * 50}>
              <article className="bg-white dark:bg-ink-800 rounded-2xl shadow-lg overflow-hidden border border-ink-100 dark:border-ink-700">
                <div
                  className="p-6 cursor-pointer hover:bg-amber-50/50 dark:hover:bg-ink-700/30 transition-colors"
                  onClick={() => setExpandedId(expandedId === classic.id ? null : classic.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-ink-900 dark:text-ink-100 mb-1">{classic.title}</h3>
                      <p className="text-sm text-ink-600 dark:text-ink-400">
                        <span className="font-medium">{classic.source}</span>
                        {classic.author && <span> · {classic.author}</span>}
                        <span className="ml-2 text-ink-400 dark:text-ink-500">{classic.dynasty} · {classic.year}</span>
                      </p>
                    </div>
                    {classic.section && (
                      <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                        {classic.section}
                      </span>
                    )}
                  </div>

                  {/* 折叠时预览原文前两行 */}
                  <pre
                    className={`font-serif text-ink-800 dark:text-ink-200 whitespace-pre-wrap leading-loose tracking-wider ${
                      expandedId === classic.id ? 'hidden' : 'line-clamp-2'
                    }`}
                  >
                    {classic.original}
                  </pre>

                  <div className="mt-3 text-sm text-amber-600 dark:text-amber-400">
                    {expandedId === classic.id ? '收起 ↑' : '展开原文与译文对照 ↓'}
                  </div>
                </div>

                {expandedId === classic.id && (
                  <div className="px-6 pb-6 pt-2 border-t border-ink-100 dark:border-ink-700 space-y-4">
                    {/* 完整原典 + AI 译文双栏（展开时自动加载） */}
                    <ClassicFulltext
                      ctextUrl={classic.ctextUrl}
                      title={classic.title}
                      searchTitle={wsSearch}
                      autoLoad
                    />

                    {/* 注解 */}
                    {classic.annotations && classic.annotations.length > 0 && (
                      <div>
                        <h4 className="text-sm font-bold text-amber-700 dark:text-amber-400 mb-2">注解</h4>
                        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                          {classic.annotations.map((ann) => (
                            <div key={ann.term} className="flex gap-2">
                              <dt className="font-bold text-ink-800 dark:text-ink-200 whitespace-nowrap">
                                {ann.term}：
                              </dt>
                              <dd className="text-ink-700 dark:text-ink-300">{ann.explanation}</dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                    )}

                    {/* 历史背景 */}
                    <div>
                      <h4 className="text-sm font-bold text-amber-700 dark:text-amber-400 mb-2">历史背景</h4>
                      <p className="text-ink-700 dark:text-ink-300 leading-relaxed text-sm">{classic.context}</p>
                    </div>

                    <div className="flex items-center justify-between flex-wrap gap-3 pt-2 border-t border-ink-100 dark:border-ink-700">
                      <div className="flex flex-wrap gap-2">
                        {classic.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-ink-100 dark:bg-ink-700 text-ink-600 dark:text-ink-300 px-2 py-1 rounded"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <a
                        href={classic.ctextUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-amber-700 dark:text-amber-400 hover:underline"
                      >
                        📖 查阅原典全文 →
                      </a>
                    </div>
                  </div>
                )}
              </article>
            </RevealOnScroll>
            );
          })}
        </div>

        {/* 数据来源说明 */}
        <RevealOnScroll>
          <div className="mt-12 text-center text-xs text-ink-500 dark:text-ink-500">
            数据来源：本地精选节段（原文+译文+注解） · Wikisource / ctext.org 全文扩展
            <br />
            后端代理：/api/classics/wikisource/* · /api/classics/*
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
