import { useState, useEffect, useCallback, useRef } from 'react';
import { CHAR_EVOLUTIONS } from '@/data/features/charEvolution';
import { fetchCharEvolutions } from '@/services/api';
import { useT } from '@/i18n/i18n';

/** 统一的汉字演变数据类型（兼容本地数据和后端 API 响应） */
type CharData = {
  char: string;
  meaning: string;
  stages: Array<{ name: string; era: string; description: string; svgPath: string }>;
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

export default function CharEvolutionPage() {
  const t = useT();
  const [allChars, setAllChars] = useState<CharData[]>(CHAR_EVOLUTIONS as CharData[]);
  const [selectedChar, setSelectedChar] = useState<string>('王');
  const [activeStage, setActiveStage] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('全部');
  // M3 修复：保存 setInterval id，组件卸载或重新开始动画时清理
  const animationTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  const evolution = allChars.find((e) => e.char === selectedChar);
  const filteredChars = activeCategory === '全部'
    ? allChars
    : allChars.filter((e) => CHAR_CATEGORY_MAP[e.char] === activeCategory);

  const startAnimation = useCallback(() => {
    // M3 修复：开始新动画前先清理旧 timer，避免泄漏
    if (animationTimerRef.current) {
      clearInterval(animationTimerRef.current);
      animationTimerRef.current = null;
    }
    setIsAnimating(true);
    setActiveStage(0);
    animationTimerRef.current = setInterval(() => {
      setActiveStage((prev) => {
        if (prev >= (evolution?.stages.length ?? 1) - 1) {
          if (animationTimerRef.current) {
            clearInterval(animationTimerRef.current);
            animationTimerRef.current = null;
          }
          setIsAnimating(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1200);
  }, [evolution]);

  // M3 修复：组件卸载时清理 timer，避免 setState on unmounted
  useEffect(() => {
    return () => {
      if (animationTimerRef.current) {
        clearInterval(animationTimerRef.current);
        animationTimerRef.current = null;
      }
    };
  }, []);

  const handleSearch = useCallback(() => {
    const ch = inputValue.trim();
    if (!ch) return;
    const found = allChars.find((e) => e.char === ch);
    if (found) {
      setSelectedChar(ch);
      setActiveStage(0);
      setIsAnimating(false);
      setNotFound(false);
    } else {
      setNotFound(true);
    }
  }, [inputValue, allChars]);

  if (!evolution) return null;
  const currentStage = evolution.stages[activeStage];

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

        {/* 输入框 */}
        <div className="flex gap-2 mb-4 justify-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="输入汉字查询演变（如：马、龙、鱼）"
            maxLength={1}
            className="w-64 px-4 py-2 rounded-lg border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-800 text-ink-900 dark:text-ink-100 text-sm focus:outline-none focus:border-accent"
          />
          <button
            onClick={handleSearch}
            className="px-5 py-2 rounded-lg bg-accent text-white text-sm font-bold hover:shadow-lg transition-all"
          >
            查询
          </button>
        </div>

        {/* 未收录提示 */}
        {notFound && (
          <div className="mb-4 p-3 rounded-lg border border-amber-300 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 text-sm text-center">
            未收录「{inputValue.trim()}」的演变数据，当前共收录 {allChars.length} 个汉字
          </div>
        )}

        {/* loading 提示 */}
        {loading && (
          <div className="mb-4 text-center text-sm text-ink-400">
            正在从后端加载汉字数据...
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
              onClick={() => { setSelectedChar(e.char); setActiveStage(0); setIsAnimating(false); setNotFound(false); }}
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
        <div className="flex flex-col items-center mb-8">
          <div className="w-48 h-48 rounded-2xl border-2 border-ink-200 dark:border-ink-700 bg-ink-50/30 dark:bg-ink-800/30 flex items-center justify-center mb-4 overflow-hidden">
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
          </div>

          <div className="text-center">
            <span className="text-2xl font-serif font-bold text-ink-900 dark:text-ink-100">
              {evolution.char}
            </span>
            <span className="mx-3 text-ink-400">—</span>
            <span className="text-xl font-serif font-bold text-accent">
              {currentStage.name}
            </span>
          </div>
          <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">
            {currentStage.era}
          </p>
        </div>

        {/* 演变阶段时间轴 */}
        <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
          {evolution.stages.map((stage, i) => (
            <div key={i} className="flex items-center">
              <button
                onClick={() => { setActiveStage(i); setIsAnimating(false); }}
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

        {/* 自动播放按钮 */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={startAnimation}
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
            onClick={() => { setActiveStage(evolution.stages.length - 1); setIsAnimating(false); }}
            className="px-6 py-3 rounded-xl border border-ink-200 dark:border-ink-700 text-ink-700 dark:text-ink-300 font-bold hover:bg-ink-50 dark:hover:bg-ink-800 transition-colors"
          >
            {t('charEvolution.final_stage')}
          </button>
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
                onClick={() => { setActiveStage(i); setIsAnimating(false); }}
                className={`cursor-pointer p-3 rounded-xl border transition-all ${
                  i === activeStage
                    ? 'border-accent bg-accent/10'
                    : 'border-ink-200 dark:border-ink-700 hover:border-accent/50'
                }`}
              >
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
                <div className="text-xs text-ink-500 text-center mt-1">{stage.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
