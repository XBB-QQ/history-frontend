/**
 * 五千年人物长廊横向滚动
 * @see ITERATIONS.md #89 C8
 *
 * 横向滚动展示 12 个标志性历史人物
 * 每人一张卡片：朝代色背景 + 名字 + 朝代 + 一句话 quote
 * hover 停留放大，点击跳 /persons?highlight=xxx
 */

import { useState, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPersons, type FrontendPerson } from '@/services/api';
import { useT } from '@/i18n/i18n';

// 朝代 → 色彩映射（用于卡片背景渐变）
const DYNASTY_GRADIENT: Record<string, string> = {
  '汉': 'from-red-500 to-red-700',
  '秦': 'from-gray-700 to-gray-900',
  '唐': 'from-rose-500 to-rose-700',
  '宋': 'from-green-500 to-green-700',
  '元': 'from-blue-600 to-blue-800',
  '明': 'from-orange-500 to-orange-700',
  '清': 'from-red-700 to-red-900',
  '三国': 'from-amber-500 to-amber-700',
  '春秋': 'from-yellow-600 to-yellow-800',
  '战国': 'from-amber-700 to-amber-900',
  '晋': 'from-lime-500 to-lime-700',
  '南北朝': 'from-cyan-500 to-cyan-700',
  '隋': 'from-sky-500 to-sky-700',
  '五代': 'from-purple-500 to-purple-700',
};

function getGradient(dynasty: string): string {
  // 精确匹配
  if (DYNASTY_GRADIENT[dynasty]) return DYNASTY_GRADIENT[dynasty];
  // 模糊匹配（包含关系）
  for (const key of Object.keys(DYNASTY_GRADIENT)) {
    if (dynasty.includes(key)) return DYNASTY_GRADIENT[key];
  }
  return 'from-ink-500 to-ink-700';
}

// 预定义的 12 个标志性人物姓名（用于筛选）
const ICONIC_NAMES = [
  '孔子', '秦始皇', '汉武帝', '诸葛亮', '唐太宗', '李白',
  '苏轼', '成吉思汗', '朱元璋', '康熙', '孙中山', '毛泽东',
];

export default function PersonGallery() {
  const t = useT();
  const navigate = useNavigate();
  const [persons, setPersons] = useState<FrontendPerson[]>([]);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 加载人物（取 100 条，再按预定义名字筛选）
  useMemo(() => {
    fetchPersons(0, 100)
      .then(({ content }) => {
        // 优先匹配预定义名字
        const iconic = ICONIC_NAMES
          .map(name => content.find(p => p.name === name))
          .filter(Boolean) as FrontendPerson[];
        if (iconic.length >= 6) {
          setPersons(iconic);
        } else {
          // 不够 6 个就用前 12 个
          setPersons(content.slice(0, 12));
        }
      })
      .catch(() => {});
  }, []);

  const handleScroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' });
  };

  if (persons.length === 0) return null;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3 px-1">
        <div>
          <h3 className="text-base font-bold text-ink-900 dark:text-ink-100">
            👥 {t('home.person_gallery_title')}
          </h3>
          <p className="text-xs text-ink-500 dark:text-ink-400 mt-0.5">
            {t('home.person_gallery_subtitle')}
          </p>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => handleScroll('left')}
            className="w-8 h-8 rounded-full bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-400 hover:bg-accent/20 transition-colors flex items-center justify-center"
            aria-label="向左滚动"
          >
            ←
          </button>
          <button
            onClick={() => handleScroll('right')}
            className="w-8 h-8 rounded-full bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-400 hover:bg-accent/20 transition-colors flex items-center justify-center"
            aria-label="向右滚动"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-3 snap-x scrollbar-hide"
        style={{ scrollbarWidth: 'none' }}
      >
        {persons.map((p, i) => (
          <button
            key={p.id}
            onClick={() => navigate(`/persons?highlight=${p.id}`)}
            onMouseEnter={() => setHoverIdx(i)}
            onMouseLeave={() => setHoverIdx(null)}
            className={`flex-shrink-0 w-56 rounded-2xl overflow-hidden border border-ink-200 dark:border-ink-700 transition-all snap-start text-left ${
              hoverIdx === i ? '-translate-y-1 shadow-xl' : 'shadow-md'
            }`}
          >
            {/* 顶部：朝代色渐变 + 大姓名 */}
            <div className={`bg-gradient-to-br ${getGradient(p.dynasty)} p-4 relative`}>
              <div className="text-[10px] text-white/80 font-bold mb-1">
                {p.dynasty}
              </div>
              <div className="text-2xl font-black text-white tracking-wider">
                {p.name}
              </div>
              <div className="text-[10px] text-white/70 mt-1">
                {p.yearsDisplay}
              </div>
              {/* 装饰：印章效果 */}
              <div className="absolute top-2 right-2 w-6 h-6 rounded border border-white/40 flex items-center justify-center">
                <span className="text-[10px] text-white/80 font-bold">史</span>
              </div>
            </div>

            {/* 底部：一句话 quote */}
            <div className="bg-white/80 dark:bg-ink-900/80 p-3">
              {p.quote ? (
                <p className="text-xs text-ink-700 dark:text-ink-300 leading-relaxed line-clamp-2">
                  {t('home.person_gallery_quote_prefix')}{p.quote}{t('home.person_gallery_quote_suffix')}
                </p>
              ) : (
                <p className="text-xs text-ink-500 dark:text-ink-400 leading-relaxed line-clamp-2">
                  {p.bio}
                </p>
              )}
              {p.courtesyName && (
                <div className="text-[10px] text-ink-400 mt-2">
                  字 {p.courtesyName}
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
