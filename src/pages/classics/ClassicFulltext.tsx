/**
 * 典籍全文加载子组件（双源：ctext + Wikisource）
 * - book 模式：从 ctext 搜索结果展示，提供"加载全文"按钮
 * - ctextUrl 模式：从本地典籍的 ctextUrl 展示，先 readlink 反查 URN 再加载全文
 *
 * 双源策略：
 *   - ctext.org：权威但需 API key，国内访问慢
 *   - Wikisource：无需 key，国内访问稳定，作为默认源和 ctext 失败时的 fallback
 *
 * 当 ctext 返回 ERR_REQUIRES_AUTHENTICATION 时自动切换到 Wikisource
 */
import { useEffect, useRef, useState } from 'react';
import {
  fetchCtextFulltext,
  fetchTranslationStream,
  fetchWikisourceFulltext,
  readCtextLink,
  searchWikisourceBooks,
  type CtextBook,
  type CtextFulltext as CtextFulltextData,
  type WikisourceFulltext as WikisourceFulltextData,
} from '@/services/classicsApi';

interface Props {
  /** 搜索结果模式：直接传入 URN */
  book?: CtextBook;
  /** 本地典籍模式：传入 ctextUrl + 标题 */
  ctextUrl?: string;
  title?: string;
  /** 展开时自动加载全文（不需要手动点按钮） */
  autoLoad?: boolean;
  /** Wikisource 搜索词（优先于 title，用于更精确匹配） */
  searchTitle?: string;
}

type LoadState = 'idle' | 'loading' | 'success' | 'error';
type Source = 'ctext' | 'wikisource';

export default function ClassicFulltext({ book, ctextUrl, title, autoLoad, searchTitle }: Props) {
  const [state, setState] = useState<LoadState>('idle');
  const [source, setSource] = useState<Source>('wikisource'); // 默认 Wikisource（国内快速）
  const [ctextData, setCtextData] = useState<CtextFulltextData | null>(null);
  const [wsData, setWsData] = useState<WikisourceFulltextData | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [translation, setTranslation] = useState(''); // AI 译文（逐段追加）
  const [translating, setTranslating] = useState(false); // 翻译中
  const [chunkProgress, setChunkProgress] = useState<{ index: number; total: number } | null>(null); // 段进度
  const [translateError, setTranslateError] = useState(''); // 翻译错误信息
  // 修复 H1：用请求序号判断是否最新请求，避免旧请求的 finally 覆盖新请求的 translating 状态
  const translateReqIdRef = useRef(0);
  // 修复 H3：用 ref 保存 setTimeout id，cleanup 中清理，避免旧定时器误清新请求的进度
  const translateTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // 修复 M2：用 AbortController 中断未完成的翻译请求，节省后端 LLM 调用
  const translateAbortRef = useRef<AbortController | null>(null);

  const displayTitle = book?.title || title || '';
  const urn = book?.urn || '';
  // Wikisource 搜索词：优先用 searchTitle（更精确），fallback 到 displayTitle
  const wsQuery = searchTitle || displayTitle;

  // 自动加载：组件挂载且 autoLoad=true 时触发
  useEffect(() => {
    if (autoLoad && state === 'idle' && source === 'wikisource') {
      handleLoad();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoLoad]);

  /** 加载 ctext 全文 */
  const loadFromCtext = async (targetUrn: string): Promise<boolean> => {
    const result = await fetchCtextFulltext(targetUrn);
    setCtextData(result);
    if (result.errorCode) {
      setErrorMsg(
        result.errorCode === 'ERR_REQUIRES_AUTHENTICATION'
          ? '需后端配置 ctext API key 才能获取全文'
          : result.errorDescription || '未知错误',
      );
      return false;
    }
    return true;
  };

  /** 加载 Wikisource 全文：先搜索，取第一个结果加载 */
  const loadFromWikisource = async (bookTitle: string): Promise<boolean> => {
    if (!bookTitle) {
      setErrorMsg('缺少书名，无法搜索 Wikisource');
      return false;
    }
    const results = await searchWikisourceBooks(bookTitle);
    if (results.length === 0) {
      setErrorMsg(`Wikisource 未找到 "${bookTitle}" 相关页面`);
      return false;
    }
    // 优先选标题完全匹配或包含书名的结果
    const exact = results.find((r) => r.title === bookTitle);
    const partial = results.find((r) => r.title.includes(bookTitle) || r.title.startsWith(bookTitle));
    const target = exact || partial || results[0];
    const result = await fetchWikisourceFulltext(target.title);
    setWsData(result);
    if (result.errorCode) {
      setErrorMsg(result.errorDescription || '未知错误');
      return false;
    }
    return true;
  };

  const handleLoad = async () => {
    setState('loading');
    setErrorMsg('');
    try {
      if (source === 'ctext') {
        // ctext 模式
        let targetUrn = urn;
        if (!targetUrn && ctextUrl) {
          targetUrn = await readCtextLink(ctextUrl);
        }
        if (!targetUrn) {
          setErrorMsg('无法解析 URN');
          setState('error');
          return;
        }
        const ok = await loadFromCtext(targetUrn);
        if (!ok) {
          // ctext 失败，自动 fallback 到 Wikisource
          setSource('wikisource');
          const wsOk = await loadFromWikisource(wsQuery);
          setState(wsOk ? 'success' : 'error');
          return;
        }
        setState('success');
      } else {
        // Wikisource 模式：用 wsQuery（searchTitle 优先）搜索
        const ok = await loadFromWikisource(wsQuery);
        setState(ok ? 'success' : 'error');
      }
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : String(e));
      setState('error');
    }
  };

  /** 切换源并重置状态 */
  const switchSource = (newSource: Source) => {
    if (newSource === source) return;
    setSource(newSource);
    setState('idle');
    setCtextData(null);
    setWsData(null);
    setErrorMsg('');
  };

  // 当前源的数据
  const currentFulltext: string = source === 'ctext'
    ? (ctextData?.fulltext?.join('\n') || '')
    : (wsData?.fulltext || '');
  const currentTitle: string = source === 'ctext'
    ? (ctextData?.title || '')
    : (wsData?.title || '');
  const currentSubsections: string[] = source === 'ctext'
    ? (ctextData?.subsections || [])
    : (wsData?.subsections || []);

  // 原文加载成功后，自动调用 AI 翻译（SSE 流式，逐段显示）
  // H1: 用 reqId 防止旧请求 finally 覆盖新请求的 translating 状态
  // H3: 用 timerRef 在 cleanup 中 clearTimeout，防止旧定时器误清新请求的进度
  // M2: 用 AbortController 中断未完成的请求，节省后端 LLM 调用
  useEffect(() => {
    if (!currentFulltext) {
      setTranslation('');
      setChunkProgress(null);
      setTranslateError('');
      return;
    }
    // 递增 reqId，让所有未完成的旧请求回调失效
    const reqId = ++translateReqIdRef.current;
    // 清理上一轮的定时器和未完成请求
    if (translateTimerRef.current) {
      clearTimeout(translateTimerRef.current);
      translateTimerRef.current = null;
    }
    if (translateAbortRef.current) {
      translateAbortRef.current.abort();
    }
    const abortController = new AbortController();
    translateAbortRef.current = abortController;

    setTranslating(true);
    setTranslation('');
    setChunkProgress(null);
    setTranslateError('');

    fetchTranslationStream(
      currentFulltext,
      displayTitle,
      (chunk) => {
        // 只处理最新请求的回调
        if (reqId !== translateReqIdRef.current) return;
        setTranslation((prev) => (prev ? prev + '\n\n' + chunk.translation : chunk.translation));
        setChunkProgress({ index: chunk.index, total: chunk.total });
      },
      undefined,
      (errMsg) => {
        // 只处理最新请求的错误
        if (reqId !== translateReqIdRef.current) return;
        setTranslateError(errMsg);
      },
      abortController.signal,
    ).finally(() => {
      // 只处理最新请求的 finally（旧请求的 finally 会被 reqId 检查跳过）
      if (reqId !== translateReqIdRef.current) return;
      setTranslating(false);
      // 翻译完成后保留进度 2 秒，避免视觉突兀
      translateTimerRef.current = setTimeout(() => {
        if (reqId !== translateReqIdRef.current) return;
        setChunkProgress(null);
        translateTimerRef.current = null;
      }, 2000);
    });
    return () => {
      // cleanup：让旧请求失效 + 清理定时器 + 中断未完成的 fetch
      translateReqIdRef.current++;
      if (translateTimerRef.current) {
        clearTimeout(translateTimerRef.current);
        translateTimerRef.current = null;
      }
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFulltext]);

  // 源切换 UI
  const SourceToggle = (
    <div className="inline-flex rounded border border-ink-200 dark:border-ink-700 overflow-hidden text-xs">
      <button
        onClick={() => switchSource('wikisource')}
        className={`px-2 py-0.5 transition-colors ${
          source === 'wikisource'
            ? 'bg-emerald-700 text-white'
            : 'bg-stone-50 dark:bg-ink-900 text-ink-600 dark:text-ink-400 hover:bg-stone-100 dark:hover:bg-ink-800'
        }`}
        title="无需 API key，国内访问稳定"
      >
        Wikisource
      </button>
      <button
        onClick={() => switchSource('ctext')}
        className={`px-2 py-0.5 transition-colors ${
          source === 'ctext'
            ? 'bg-amber-700 text-white'
            : 'bg-stone-50 dark:bg-ink-900 text-ink-600 dark:text-ink-400 hover:bg-stone-100 dark:hover:bg-ink-800'
        }`}
        title="权威但需 API key，国内访问慢"
      >
        ctext
      </button>
    </div>
  );

  // book 模式：紧凑展示
  if (book) {
    return (
      <div className="bg-stone-50 dark:bg-ink-900 rounded-lg p-3 border border-ink-100 dark:border-ink-700">
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-ink-800 dark:text-ink-200 truncate">{book.title}</p>
            <p className="text-xs text-ink-500 dark:text-ink-400 truncate">URN: {book.urn}</p>
          </div>
          <div className="flex items-center gap-2">
            {SourceToggle}
            <button
              onClick={handleLoad}
              disabled={state === 'loading'}
              className="text-xs px-2 py-1 rounded bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-900/50 disabled:opacity-50 whitespace-nowrap"
            >
              {state === 'loading' ? '加载中...' : '加载全文'}
            </button>
          </div>
        </div>

        {state === 'success' && currentFulltext && (
          <div className="mt-2 pt-2 border-t border-ink-100 dark:border-ink-700 max-h-60 overflow-y-auto">
            {currentSubsections.length > 0 && (
              <p className="text-xs text-ink-500 dark:text-ink-400 mb-1">
                章节：{currentSubsections.slice(0, 5).join(' · ')}
                {currentSubsections.length > 5 && ' ...'}
              </p>
            )}
            <pre className="font-serif text-sm text-ink-700 dark:text-ink-300 whitespace-pre-wrap leading-relaxed">
              {currentFulltext}
            </pre>
          </div>
        )}

        {state === 'error' && (
          <div className="mt-2 pt-2 border-t border-ink-100 dark:border-ink-700 text-xs text-amber-700 dark:text-amber-400">
            加载失败：{errorMsg}
            <a
              href={`https://ctext.org/plugins/getlink?urn=${encodeURIComponent(book.urn)}&redirect=1`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 underline"
            >
              在 ctext.org 查看 →
            </a>
          </div>
        )}
      </div>
    );
  }

  // 本地典籍扩展模式：折叠式
  return (
    <div className="bg-amber-50/50 dark:bg-ink-900/50 rounded-lg p-3 border border-amber-100 dark:border-ink-700">
      <div className="flex items-center justify-between gap-2">
        <h4 className="text-sm font-bold text-amber-700 dark:text-amber-400">
          📜 原典全文（{source === 'wikisource' ? 'Wikisource' : 'ctext.org'}）
        </h4>
        <div className="flex items-center gap-2">
          {SourceToggle}
          <button
            onClick={handleLoad}
            disabled={state === 'loading'}
            className="text-xs px-3 py-1 rounded bg-amber-700 text-white hover:bg-amber-800 disabled:opacity-50"
          >
            {state === 'loading' ? '加载中...' : state === 'success' ? '重新加载' : '加载全文'}
          </button>
        </div>
      </div>

      {state === 'success' && currentFulltext && (
        <div className="mt-3">
          {currentTitle && (
            <p className="text-sm font-bold text-ink-800 dark:text-ink-200 mb-2">{currentTitle}</p>
          )}
          {currentSubsections.length > 0 && (
            <p className="text-xs text-ink-500 dark:text-ink-400 mb-2">
              章节：{currentSubsections.slice(0, 8).join(' · ')}
              {currentSubsections.length > 8 && ' ...'}
            </p>
          )}
          {/* 原文 / 译文 双栏对照 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-h-[480px] overflow-y-auto">
            {/* 左栏：完整原文 */}
            <div className="bg-stone-50 dark:bg-ink-900/50 rounded-lg p-3 border border-ink-100 dark:border-ink-700">
              <h5 className="text-xs font-bold text-amber-700 dark:text-amber-400 mb-2 pb-1 border-b border-amber-200 dark:border-amber-900/50">
                📜 原文
              </h5>
              <pre className="font-serif text-sm text-ink-800 dark:text-ink-200 whitespace-pre-wrap leading-loose tracking-wider">
                {currentFulltext}
              </pre>
            </div>
            {/* 右栏：AI 白话译文（流式逐段显示） */}
            <div className="bg-amber-50/50 dark:bg-ink-900/30 rounded-lg p-3 border border-amber-100 dark:border-ink-700">
              <h5 className="text-xs font-bold text-amber-700 dark:text-amber-400 mb-2 pb-1 border-b border-amber-200 dark:border-amber-900/50 flex items-center gap-2">
                <span>📖 白话译文</span>
                {translating && chunkProgress && (
                  <span className="text-[10px] font-normal text-ink-500 dark:text-ink-400 animate-pulse">
                    AI 翻译中 {chunkProgress.index}/{chunkProgress.total} 段...
                  </span>
                )}
                {translating && !chunkProgress && (
                  <span className="text-[10px] font-normal text-ink-500 dark:text-ink-400 animate-pulse">
                    AI 翻译中...
                  </span>
                )}
              </h5>
              {translating && !translation ? (
                <div className="space-y-2 animate-pulse">
                  <div className="h-3 bg-amber-100 dark:bg-ink-700 rounded w-3/4" />
                  <div className="h-3 bg-amber-100 dark:bg-ink-700 rounded w-full" />
                  <div className="h-3 bg-amber-100 dark:bg-ink-700 rounded w-5/6" />
                  <div className="h-3 bg-amber-100 dark:bg-ink-700 rounded w-2/3" />
                </div>
              ) : translateError ? (
                <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
                  {translateError}
                </p>
              ) : (
                <pre className="font-serif text-sm text-ink-700 dark:text-ink-300 whitespace-pre-wrap leading-relaxed">
                  {translation || '（暂无译文）'}
                  {translating && translation && (
                    <span className="inline-block w-1.5 h-3 bg-amber-500 ml-0.5 animate-pulse align-middle" />
                  )}
                </pre>
              )}
            </div>
          </div>
        </div>
      )}

      {state === 'error' && (
        <p className="mt-2 text-xs text-amber-700 dark:text-amber-400">
          加载失败：{errorMsg}
          {source === 'ctext' && (
            <span className="ml-2">可尝试切换到 Wikisource 源</span>
          )}
        </p>
      )}

      {state === 'idle' && (
        <p className="mt-2 text-xs text-ink-500 dark:text-ink-400">
          点击"加载全文"从 {source === 'wikisource' ? 'Wikisource' : 'ctext.org'} 获取 {displayTitle} 的完整原典
          {source === 'wikisource' && '（无需 API key，国内访问稳定）'}
        </p>
      )}
    </div>
  );
}
