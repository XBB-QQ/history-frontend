import { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CHAR_EVOLUTIONS } from '@/data/features/charEvolution';
import { fetchCharEvolutions } from '@/services/api';
import { useCharEvolutionStore } from '@/store/charEvolutionStore';
import { useT } from '@/i18n/i18n';

/** 统一的汉字演变数据类型（兼容本地数据和后端 API 响应） */
type CharData = {
  char: string;
  meaning: string;
  stages: Array<{ name: string; era: string; description: string; svgPath?: string; svgXml?: string }>;
};

/** 汉字分类映射（UI 层概念，不进后端数据） */
const CHAR_CATEGORIES = ['全部', '自然', '动物', '器物', '人体', '植物'] as const;

const CHAR_CATEGORY_MAP: Record<string, string> = {
  '日': '自然', '月': '自然', '火': '自然', '水': '自然', '山': '自然',
  '石': '自然', '田': '自然', '雨': '自然', '云': '自然', '天': '自然',
  '马': '动物', '牛': '动物', '羊': '动物', '鸟': '动物', '鱼': '动物',
  '龙': '动物', '虎': '动物',
  '王': '器物', '车': '器物', '舟': '器物', '门': '器物', '弓': '器物',
  '矢': '器物', '刀': '器物',
  '人': '人体', '目': '人体', '手': '人体', '心': '人体',
  '木': '植物', '禾': '植物',
};

/** 五阶段总览（时代跨度与特征） */
const STAGE_OVERVIEW = [
  { name: '甲骨文', era: '商代', span: '前14-11世纪', trait: '象形为主，刻于龟甲兽骨' },
  { name: '金文',   era: '西周', span: '前10-8世纪',  trait: '铸于青铜器，线条圆润' },
  { name: '小篆',   era: '秦',   span: '前3世纪',     trait: '统一文字，结构规整' },
  { name: '隶书',   era: '汉',   span: '前2-2世纪',   trait: '蚕头燕尾，方块化' },
  { name: '楷书',   era: '魏晋至今', span: '3世纪起',  trait: '方正端庄，沿用至今' },
] as const;

const ANIMATION_INTERVAL_MS = 1200;

export default function CharEvolutionPage() {
  const t = useT();
  const [searchParams] = useSearchParams();
  const [allChars, setAllChars] = useState<CharData[]>(CHAR_EVOLUTIONS as CharData[]);
  const [selectedChar, setSelectedChar] = useState<string>('王');
  const [activeStage, setActiveStage] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fetchingChar, setFetchingChar] = useState(false);
  const [fetchedChar, setFetchedChar] = useState<CharData | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('全部');
  // M3 修复：保存 setInterval id，组件卸载或重新开始动画时清理
  const animationTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // 全局字源缓存（跨页面共享，命中即跳过请求）
  const getOrFetch = useCharEvolutionStore((s) => s.getOrFetch);

  useEffect(() => {
    fetchCharEvolutions()
      .then((data) => {
        if (data.length > 0) setAllChars(data as CharData[]);
        setLoading(false);
      })
      .catch((err) => {
        console.warn('后端 char-evolution API 不可用，使用本地数据', err);
        setLoading(false);
      });
  }, []);

  // URL query 预选字：?char=王 自动选中并演示
  // 仅在首次挂载或 query 变化时触发，避免与用户手动输入冲突
  useEffect(() => {
    const ch = searchParams.get('char');
    if (!ch || ch.length !== 1) return;
    setInputValue(ch);
    // 复用 handleSearch 逻辑：先查内置，未命中再抓取
    // 这里直接调 fetchCharEvolutionByChar 是为了避免 handleSearch 的 useCallback 依赖循环
    const found = allChars.find((e) => e.char === ch);
    if (found) {
      setFetchedChar(null);
      setSelectedChar(ch);
      setActiveStage(0);
      setNotFound(false);
      // 等 evolution 重新计算后再启动动画——用 setTimeout 0 让出渲染帧
      setTimeout(() => startAnimation(found.stages.length), 0);
    } else if (!loading) {
      // 内置未命中：抓取 hanziyuan（走全局 cache，跨页面共享）
      setFetchingChar(true);
      setFetchedChar(null);
      getOrFetch(ch)
        .then((data) => {
          if (data && data.stages && data.stages.length > 0) {
            setFetchedChar(data as CharData);
            setActiveStage(0);
            setTimeout(() => startAnimation(data.stages.length), 0);
          } else {
            setNotFound(true);
          }
        })
        .catch(() => setNotFound(true))
        .finally(() => setFetchingChar(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, loading]);

  // 渲染数据源：优先 fetchedChar（hanziyuan 抓取的字源数据），否则用内置数据
  const evolution = fetchedChar || allChars.find((e) => e.char === selectedChar);
  const filteredChars = activeCategory === '全部'
    ? allChars
    : allChars.filter((e) => CHAR_CATEGORY_MAP[e.char] === activeCategory);

  // 重构：startAnimation 接受 stagesCount 参数，解除对 evolution 闭包的依赖
  // 这样 handleSearch 在选中新字后可以立即调用，无需等 evolution 重新计算
  const startAnimation = useCallback((stagesCount: number) => {
    if (stagesCount <= 0) return;
    // M3 修复：开始新动画前先清理旧 timer，避免泄漏
    if (animationTimerRef.current) {
      clearInterval(animationTimerRef.current);
      animationTimerRef.current = null;
    }
    setIsAnimating(true);
    setActiveStage(0);
    animationTimerRef.current = setInterval(() => {
      setActiveStage((prev) => {
        if (prev >= stagesCount - 1) {
          if (animationTimerRef.current) {
            clearInterval(animationTimerRef.current);
            animationTimerRef.current = null;
          }
          setIsAnimating(false);
          return prev;
        }
        return prev + 1;
      });
    }, ANIMATION_INTERVAL_MS);
  }, []);

  const stopAnimation = useCallback(() => {
    if (animationTimerRef.current) {
      clearInterval(animationTimerRef.current);
      animationTimerRef.current = null;
    }
    setIsAnimating(false);
  }, []);

  // M3 修复：组件卸载时清理 timer，避免 setState on unmounted
  useEffect(() => {
    return () => {
      if (animationTimerRef.current) {
        clearInterval(animationTimerRef.current);
        animationTimerRef.current = null;
      }
    };
  }, []);

  // 键盘快捷键：← 上一阶段 / → 下一阶段 / 空格 播放或暂停
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // 输入框聚焦时不拦截，避免影响打字
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (!evolution) return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        stopAnimation();
        setActiveStage((p) => Math.max(0, p - 1));
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        stopAnimation();
        setActiveStage((p) => Math.min(evolution.stages.length - 1, p + 1));
      } else if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        if (isAnimating) {
          stopAnimation();
        } else {
          startAnimation(evolution.stages.length);
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [evolution, isAnimating, startAnimation, stopAnimation]);

  // 输入即演示：搜索命中后立即开始演变动画
  // 1. 先查内置数据（allChars）；2. 未命中则调后端单字 API（hanziyuan 抓取）；3. 都失败提示未收录
  const handleSearch = useCallback(async () => {
    const ch = inputValue.trim();
    if (!ch) return;
    setNotFound(false);
    const found = allChars.find((e) => e.char === ch);
    if (found) {
      // 命中内置数据：清空 fetchedChar，切回内置渲染
      setFetchedChar(null);
      setSelectedChar(ch);
      setActiveStage(0);
      startAnimation(found.stages.length);
      return;
    }
    // 未命中内置数据：调后端单字 API 实时抓取（走全局 cache，跨页面共享）
    setFetchingChar(true);
    setFetchedChar(null);
    try {
      const data = await getOrFetch(ch);
      if (data && data.stages && data.stages.length > 0) {
        setFetchedChar(data as CharData);
        setActiveStage(0);
        startAnimation(data.stages.length);
      } else {
        setNotFound(true);
      }
    } catch (err) {
      console.warn('字源数据抓取失败', err);
      setNotFound(true);
    } finally {
      setFetchingChar(false);
    }
  }, [inputValue, allChars, startAnimation, getOrFetch]);

  // 既没数据也没在抓取时直接返回 null（仅在初始化或异常状态）
  if (!evolution) {
    if (fetchingChar) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-rice to-stone-100 dark:from-ink-950 dark:to-ink-900 py-8 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-3xl font-bold text-ink-900 dark:text-ink-100 font-serif mb-6">
              {t('charEvolution.title')}
            </div>
            <div className="text-lg text-ink-500 animate-pulse">
              正在从 hanziyuan.net 抓取「{inputValue.trim()}」的字源数据...
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
  const currentStage = evolution.stages[activeStage];
  const totalStages = evolution.stages.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-rice to-stone-100 dark:from-ink-950 dark:to-ink-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 标题 */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-ink-900 dark:text-ink-100 font-serif">
            {t('charEvolution.title')}
          </h1>
          <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">
            {t('charEvolution.subtitle')}
          </p>
        </div>

        {/* 五阶段总览 — 顶部时代轴 */}
        <div className="mb-6 p-4 rounded-xl border border-ink-200 dark:border-ink-700 bg-white/50 dark:bg-ink-800/30">
          <div className="text-xs font-bold text-ink-500 dark:text-ink-400 mb-3 text-center">
            汉字演变五阶段 · 三千年字形脉络
          </div>
          <div className="flex items-stretch justify-between gap-1">
            {STAGE_OVERVIEW.map((s, i) => (
              <div key={s.name} className="flex-1 text-center min-w-0">
                <div className={`text-sm font-serif font-bold ${
                  i === activeStage ? 'text-accent' : 'text-ink-700 dark:text-ink-300'
                }`}>{s.name}</div>
                <div className="text-[10px] text-ink-400 mt-0.5">{s.era}</div>
                <div className="text-[10px] text-ink-400">{s.span}</div>
                <div className="text-[10px] text-ink-500 dark:text-ink-500 mt-1 leading-tight hidden sm:block">
                  {s.trait}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 输入框 — 输入即演示 */}
        <div className="flex gap-2 mb-3 justify-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="输入任意汉字（未收录字会自动从 hanziyuan.net 抓取）"
            maxLength={1}
            className="w-72 px-4 py-2 rounded-lg border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-800 text-ink-900 dark:text-ink-100 text-sm focus:outline-none focus:border-accent"
          />
          <button
            onClick={handleSearch}
            className="px-5 py-2 rounded-lg bg-accent text-white text-sm font-bold hover:shadow-lg transition-all"
          >
            演示
          </button>
        </div>
        <div className="text-center text-[11px] text-ink-400 mb-4">
          快捷键：← → 切换阶段 · 空格 播放/暂停 · 共收录 {allChars.length} 字
        </div>

        {/* 未收录提示 — 内置 + hanziyuan 均失败时显示 */}
        {notFound && (
          <div className="mb-4 p-3 rounded-lg border border-amber-300 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 text-sm text-center">
            <div>未收录「{inputValue.trim()}」的演变数据，且 hanziyuan.net 抓取失败</div>
            <div className="mt-1 text-xs">
              可访问{' '}
              <a
                href={`https://hanziyuan.net/#${inputValue.trim()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-amber-800 dark:hover:text-amber-200"
              >
                hanziyuan.net/#{inputValue.trim()}
              </a>{' '}
              查看
            </div>
          </div>
        )}

        {/* loading 提示 */}
        {loading && (
          <div className="mb-4 text-center text-sm text-ink-400">
            正在从后端加载汉字数据...
          </div>
        )}

        {/* 抓取中提示（输入非内置字时调用 hanziyuan） */}
        {fetchingChar && (
          <div className="mb-4 p-3 rounded-lg border border-blue-300 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm text-center animate-pulse">
            正在从 hanziyuan.net 实时抓取「{inputValue.trim()}」的字源数据，请稍候...
          </div>
        )}

        {/* 分类筛选 tab */}
        <div className="flex flex-wrap gap-2 mb-4 justify-center">
          {CHAR_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-accent text-white'
                  : 'bg-ink-100 dark:bg-ink-800 text-ink-500 dark:text-ink-400 hover:bg-ink-200 dark:hover:bg-ink-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 汉字选择 — 可换行的按钮网格 */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center max-h-48 overflow-y-auto p-2">
          {filteredChars.map((e) => (
            <button
              key={e.char}
              onClick={() => { setSelectedChar(e.char); setActiveStage(0); setIsAnimating(false); setNotFound(false); setFetchedChar(null); }}
              className={`w-12 h-12 rounded-lg text-xl font-serif font-bold transition-all border-2 ${
                selectedChar === e.char
                  ? 'border-accent bg-accent/10 dark:bg-accent/5 scale-110'
                  : 'border-ink-200 dark:border-ink-700 text-ink-600 dark:text-ink-400 hover:border-accent/50'
              }`}
            >
              {e.char}
            </button>
          ))}
        </div>

        {/* 当前汉字展示 */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-48 h-48 rounded-2xl border-2 border-ink-200 dark:border-ink-700 bg-ink-50/30 dark:bg-ink-800/30 flex items-center justify-center mb-4 overflow-hidden relative">
            {currentStage.svgXml ? (
              // hanziyuan 抓取的真实字源 SVG：完整 XML，dark 模式下反色显示
              <div
                className="w-40 h-40 flex items-center justify-center dark:invert [&_svg]:w-full [&_svg]:h-full [&_svg]:max-w-[160px] [&_svg]:max-h-[160px]"
                dangerouslySetInnerHTML={{ __html: currentStage.svgXml }}
              />
            ) : (
              <svg viewBox="0 0 60 90" width="160" height="160" className="transition-all duration-500">
                <path
                  d={currentStage.svgPath}
                  stroke="#27231e"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-all duration-500"
                />
              </svg>
            )}
            {/* 演示进度角标 */}
            <div className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-ink-900/70 text-white">
              {activeStage + 1}/{totalStages}
            </div>
          </div>

          <div className="text-center">
            <span className="text-2xl font-serif font-bold text-ink-900 dark:text-ink-100">
              {evolution.char}
            </span>
            <span className="mx-3 text-ink-400">—</span>
            <span className="text-xl font-serif font-bold text-accent">
              {currentStage.name}
            </span>
            {isAnimating && (
              <span className="ml-2 text-xs text-accent animate-pulse">演示中…</span>
            )}
          </div>
          <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">
            {currentStage.era}
          </p>
        </div>

        {/* 演变阶段时间轴 + 进度条 */}
        <div className="mb-6">
          <div className="flex items-center justify-center gap-2 mb-2 flex-wrap">
            {evolution.stages.map((stage, i) => (
              <div key={i} className="flex items-center">
                <button
                  onClick={() => { stopAnimation(); setActiveStage(i); }}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                    i === activeStage
                      ? 'bg-accent text-white'
                      : i <= activeStage
                        ? 'bg-accent/30 text-accent'
                        : 'bg-ink-100 dark:bg-ink-800 text-ink-500 dark:text-ink-500'
                  }`}
                >
                  {stage.name}
                </button>
                {i < evolution.stages.length - 1 && (
                  <span className="text-ink-300 mx-1">→</span>
                )}
              </div>
            ))}
          </div>
          {/* 进度条 */}
          <div className="h-1 bg-ink-100 dark:bg-ink-800 rounded-full overflow-hidden max-w-md mx-auto">
            <div
              className="h-full bg-accent transition-all duration-500"
              style={{ width: `${((activeStage + 1) / totalStages) * 100}%` }}
            />
          </div>
        </div>

        {/* 自动播放按钮 */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => startAnimation(totalStages)}
            disabled={isAnimating}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              isAnimating
                ? 'bg-ink-200 text-ink-400 cursor-not-allowed'
                : 'bg-accent text-white hover:shadow-lg'
            }`}
          >
            {isAnimating ? t('charEvolution.playing') : t('charEvolution.auto_evolve')}
          </button>
          <button
            onClick={() => { stopAnimation(); setActiveStage(totalStages - 1); }}
            className="px-6 py-3 rounded-xl border border-ink-200 dark:border-ink-700 text-ink-700 dark:text-ink-300 font-bold hover:bg-ink-50 dark:hover:bg-ink-800 transition-colors"
          >
            {t('charEvolution.final_stage')}
          </button>
          <Link
            to="/oracle-game"
            className="px-6 py-3 rounded-xl border border-accent/50 text-accent font-bold hover:bg-accent/10 transition-colors text-sm"
          >
            挑战甲骨文答题 →
          </Link>
        </div>

        {/* 当前阶段详细解说 */}
        <div className="p-5 rounded-xl border border-ink-200 dark:border-ink-700 bg-ink-50/50 dark:bg-ink-800/50">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-serif font-bold text-accent">{currentStage.name}</span>
            <span className="text-sm text-ink-400">{currentStage.era}</span>
          </div>
          <p className="text-sm text-ink-700 dark:text-ink-300 leading-relaxed">
            {currentStage.description}
          </p>
          <div className="mt-4 text-center text-xs text-ink-400">
            {t('charEvolution.meaning_label')}{evolution.meaning}
          </div>
        </div>

        {/* 全阶段对比 */}
        <div className="mt-8">
          <h3 className="text-sm font-bold text-ink-600 dark:text-ink-400 mb-4 text-center">
            {t('charEvolution.full_comparison')}
          </h3>
          <div className="flex justify-center gap-3 flex-wrap">
            {evolution.stages.map((stage, i) => (
              <div
                key={i}
                onClick={() => { stopAnimation(); setActiveStage(i); }}
                className={`cursor-pointer p-3 rounded-xl border transition-all ${
                  i === activeStage
                    ? 'border-accent bg-accent/10'
                    : 'border-ink-200 dark:border-ink-700 hover:border-accent/50'
                }`}
              >
                {stage.svgXml ? (
                  <div
                    className="w-[50px] h-[50px] flex items-center justify-center dark:invert [&_svg]:w-full [&_svg]:h-full"
                    dangerouslySetInnerHTML={{ __html: stage.svgXml }}
                  />
                ) : (
                  <svg viewBox="0 0 60 90" width="50" height="50">
                    <path
                      d={stage.svgPath}
                      stroke="#27231e"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                <div className="text-xs text-ink-500 text-center mt-1">{stage.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
