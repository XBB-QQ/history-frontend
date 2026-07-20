/**
 * 首页搜索框（带即时联想）
 * @see ITERATIONS.md #89 B4
 *
 * 输入文字 → debounce 300ms → 并行调 searchEvents / searchPersons / 本地 dynasties 过滤
 * 显示分组联想（事件/人物/朝代 各最多 3 条）
 * 回车跳 /search?q=xxx 查看全部
 */

import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchEvents, searchPersons, fetchDynasties, type FrontendEvent, type FrontendPerson, type FrontendDynasty } from '@/services/api';
import { useT } from '@/i18n/i18n';

interface Suggestion {
  type: 'event' | 'person' | 'dynasty';
  id: string;
  title: string;
  subtitle: string;
  link: string;
}

export default function HomeSearchBox() {
  const t = useT();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [highlightIdx, setHighlightIdx] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const dynastiesRef = useRef<FrontendDynasty[]>([]);

  // 加载朝代列表（本地缓存用于联想）
  useEffect(() => {
    fetchDynasties()
      .then(list => { dynastiesRef.current = list; })
      .catch(() => {});
  }, []);

  // debounce 300ms 搜索
  useEffect(() => {
    const q = query.trim();
    if (!q) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const [events, persons] = await Promise.all([
          searchEvents(q).catch(() => [] as FrontendEvent[]),
          searchPersons(q).catch(() => [] as FrontendPerson[]),
        ]);
        const dynasties = dynastiesRef.current
          .filter(d => d.name.includes(q) || d.founder.includes(q) || d.capital.includes(q))
          .slice(0, 3);

        const list: Suggestion[] = [
          ...events.slice(0, 3).map(e => ({
            type: 'event' as const,
            id: e.id,
            title: e.title,
            subtitle: `${e.yearDisplay} · ${e.dynasty}`,
            link: `/timeline?event=${e.id}`,
          })),
          ...persons.slice(0, 3).map(p => ({
            type: 'person' as const,
            id: p.id,
            title: p.name,
            subtitle: `${p.dynasty} · ${p.yearsDisplay}`,
            link: `/persons?highlight=${p.id}`,
          })),
          ...dynasties.map(d => ({
            type: 'dynasty' as const,
            id: d.id,
            title: d.name,
            subtitle: `${d.period} · 开国 ${d.founder}`,
            link: `/dynasties/${d.id}`,
          })),
        ];
        setSuggestions(list);
        setOpen(true);
        setHighlightIdx(-1);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  // 点击外部关闭
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const grouped = useMemo(() => {
    const g: Record<string, Suggestion[]> = { event: [], person: [], dynasty: [] };
    suggestions.forEach(s => g[s.type].push(s));
    return g;
  }, [suggestions]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    // 如果有高亮项，跳到该项
    if (highlightIdx >= 0 && highlightIdx < suggestions.length) {
      navigate(suggestions[highlightIdx].link);
      setOpen(false);
      return;
    }
    navigate(`/search?q=${encodeURIComponent(q)}`);
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open || suggestions.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIdx(prev => (prev + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIdx(prev => (prev <= 0 ? suggestions.length - 1 : prev - 1));
    } else if (e.key === 'Escape') {
      setOpen(false);
      setHighlightIdx(-1);
    }
  };

  const typeLabel = (type: string) =>
    type === 'event' ? t('home.search_suggestion_events')
      : type === 'person' ? t('home.search_suggestion_persons')
        : t('home.search_suggestion_dynasties');

  const typeColor = (type: string) =>
    type === 'event' ? 'text-accent bg-accent/10'
      : type === 'person' ? 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30'
        : 'text-purple-600 bg-purple-100 dark:bg-purple-900/30';

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          {/* 搜索图标 */}
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => suggestions.length > 0 && setOpen(true)}
            placeholder={t('home.search_placeholder')}
            className="w-full pl-12 pr-4 py-3 bg-white/80 dark:bg-ink-900/80 rounded-2xl border border-ink-200 dark:border-ink-700 text-ink-900 dark:text-ink-100 placeholder-ink-400 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
            aria-label={t('home.search_placeholder')}
          />
          {loading && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-ink-400 animate-pulse">
              …
            </span>
          )}
        </div>
      </form>

      {/* 联想下拉 */}
      {open && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-ink-900 rounded-xl border border-ink-200 dark:border-ink-700 shadow-xl overflow-hidden z-50 max-h-[60vh] overflow-y-auto">
          {suggestions.length === 0 && !loading ? (
            <div className="px-4 py-6 text-center text-sm text-ink-400">
              {t('home.search_no_result')}
            </div>
          ) : (
            <>
              {(['event', 'person', 'dynasty'] as const).map(type => {
                const list = grouped[type];
                if (list.length === 0) return null;
                return (
                  <div key={type}>
                    <div className="px-4 pt-3 pb-1 text-[10px] font-bold text-ink-400 uppercase tracking-widest bg-ink-50/50 dark:bg-ink-800/50">
                      {typeLabel(type)} ({list.length})
                    </div>
                    {list.map(s => {
                      const idx = suggestions.indexOf(s);
                      return (
                        <button
                          key={`${s.type}-${s.id}`}
                          onClick={() => {
                            navigate(s.link);
                            setOpen(false);
                            setQuery('');
                          }}
                          onMouseEnter={() => setHighlightIdx(idx)}
                          className={`w-full text-left px-4 py-2.5 flex items-center gap-3 transition-colors ${
                            highlightIdx === idx ? 'bg-accent/10' : 'hover:bg-ink-50 dark:hover:bg-ink-800'
                          }`}
                        >
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${typeColor(s.type)}`}>
                            {typeLabel(s.type)}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-ink-900 dark:text-ink-100 truncate">
                              {s.title}
                            </div>
                            <div className="text-xs text-ink-500 dark:text-ink-400 truncate">
                              {s.subtitle}
                            </div>
                          </div>
                          <span className="text-ink-400">→</span>
                        </button>
                      );
                    })}
                  </div>
                );
              })}
              <div className="px-4 py-2 text-center text-[10px] text-ink-400 border-t border-ink-100 dark:border-ink-800">
                {t('home.search_hint')}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
