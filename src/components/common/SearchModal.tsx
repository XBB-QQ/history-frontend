import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchStore } from '@/store/searchStore';
import { searchEvents, searchPersons, searchKnowledge } from '@/services/api';
import type { FrontendEvent, FrontendPerson, FrontendKnowledge } from '@/services/api';

interface SearchResult {
  type: 'event' | 'person' | 'knowledge';
  id: number;
  title: string;
  subtitle: string;
}

/** 搜索类型标签 */
const typeLabels: Record<string, string> = {
  event: '事件',
  person: '人物',
  knowledge: '知识',
};

const typeColors: Record<string, string> = {
  event: 'bg-accent/10 text-accent',
  person: 'bg-indigo-100 text-indigo-700',
  knowledge: 'bg-darkGreen/10 text-darkGreen',
};

export default function SearchModal() {
  const { isOpen, closeSearch } = useSearchStore();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // 打开时聚焦输入框
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // 全局 Ctrl+K 快捷键
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const store = useSearchStore.getState();
        if (store.isOpen) {
          store.closeSearch();
        } else {
          store.openSearch();
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // 防抖搜索
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const doSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const [events, persons, knowledge] = await Promise.all([
        searchEvents(q).catch(() => []),
        searchPersons(q).catch(() => []),
        searchKnowledge(q).catch(() => []),
      ]);

      const mapped: SearchResult[] = [
        ...events.map((e: FrontendEvent) => ({
          type: 'event',
          id: Number(e.id),
          title: e.title,
          subtitle: `${e.dynasty} · ${e.category}`,
        })),
        ...persons.map((p: FrontendPerson) => ({
          type: 'person',
          id: Number(p.id),
          title: p.name,
          subtitle: `${p.dynasty}${p.courtesyName ? ` · 字${p.courtesyName}` : ''}`,
        })),
        ...knowledge.map((k: FrontendKnowledge) => ({
          type: 'knowledge',
          id: Number(k.id),
          title: k.title,
          subtitle: k.dynasty || k.startYearDisplay || '',
        })),
      ];
      setResults(mapped);
    } catch {
      // 静默失败
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => doSearch(query), 300);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [query, doSearch]);

  // ESC 关闭
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSearch();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, -1));
      }
      if (e.key === 'Enter' && selectedIndex >= 0) {
        handleSelect(results[selectedIndex]);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, results, selectedIndex, closeSearch]);

  const handleSelect = (r: SearchResult) => {
    const routeMap: Record<string, string> = {
      event: '/timeline',
      person: '/persons',
      knowledge: '/knowledge',
    };
    navigate(`${routeMap[r.type]}?id=${r.id}`);
    closeSearch();
    setQuery('');
    setResults([]);
    setSelectedIndex(-1);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/50 flex items-start justify-center pt-24 px-4 animate-fade-in"
      onClick={closeSearch}
    >
      <div
        className="bg-paper dark:bg-ink-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-ink-200 dark:border-ink-700 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 搜索栏 */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-ink-200 dark:border-ink-700">
          <svg className="w-5 h-5 text-ink-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(-1);
            }}
            placeholder="搜索事件、人物、知识..."
            className="flex-1 bg-transparent text-ink-900 dark:text-ink-100 text-lg outline-none placeholder:text-ink-400"
          />
          <kbd className="text-xs px-2 py-1 rounded bg-ink-100 dark:bg-ink-800 text-ink-400 dark:text-ink-500 font-mono">
            ESC
          </kbd>
        </div>

        {/* 结果列表 */}
        <div className="max-h-[50vh] overflow-y-auto">
          {loading && (
            <div className="flex items-center justify-center py-8 text-ink-400">
              <svg className="w-5 h-5 mr-2 animate-spin" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              搜索中...
            </div>
          )}

          {!loading && query && results.length === 0 && (
            <div className="text-center py-10 text-ink-400">
              <p>未找到与「{query}」相关的结果</p>
            </div>
          )}

          {!loading && results.length > 0 && (
            <ul className="py-2">
              {results.map((r, i) => (
                <li key={`${r.type}-${r.id}`}>
                  <button
                    onClick={() => handleSelect(r)}
                    onMouseEnter={() => setSelectedIndex(i)}
                    className={`w-full text-left px-5 py-3 flex items-center gap-4 transition-colors ${
                      i === selectedIndex
                        ? 'bg-ink-100 dark:bg-ink-800'
                        : 'hover:bg-ink-50 dark:hover:bg-ink-800/50'
                    }`}
                  >
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${typeColors[r.type]}`}>
                      {typeLabels[r.type]}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-ink-900 dark:text-ink-100 font-semibold truncate">{r.title}</div>
                      {r.subtitle && (
                        <div className="text-sm text-ink-400 dark:text-ink-500 truncate">{r.subtitle}</div>
                      )}
                    </div>
                    <svg className="w-4 h-4 text-ink-300 dark:text-ink-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* 无搜索时显示提示 */}
          {!query && (
            <div className="text-center py-8 text-ink-400 text-sm">
              <p>输入关键词开始搜索</p>
              <p className="text-xs mt-1">支持搜索事件、人物、朝代、知识卡片</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
