import { useEffect, useState, useRef } from 'react';

/**
 * Hero 开场动画
 * 三段式仪式感动画：
 * 1. 卷轴展开 — 标题从中间向两侧缓缓展开
 * 2. 印章落下 — 红色印章"史"字砸下带震动
 * 3. 内容浮现 — 副标题和入口卡片依次淡入
 */
export default function HeroAnimation() {
  const [phase, setPhase] = useState<0 | 1 | 2 | 3 | 4>(0);
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    // 初始延迟后开始动画
    setTimeout(() => setPhase(1), 300);
    setTimeout(() => setPhase(2), 1200);
    setTimeout(() => setPhase(3), 2000);
    setTimeout(() => setPhase(4), 2600);
    return () => { mountedRef.current = false; };
  }, []);

  // 尊重减少动画偏好
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ).current;

  if (prefersReducedMotion) {
    return <HeroContent phase={4} />;
  }

  return <HeroContent phase={phase} />;
}

// ──────────────────────────────────────────────
// 内部内容组件
// ──────────────────────────────────────────────

function HeroContent({ phase }: { phase: number }) {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      {/* 阶段 1-2: 卷轴展开的标题 */}
      <div className="overflow-hidden mb-2">
        <h1
          className={`text-4xl md:text-5xl font-black tracking-[0.3em] transition-all duration-1000 ${
            phase >= 1
              ? 'translate-x-0 opacity-100 scale-x-100'
              : '-translate-x-full opacity-0 scale-x-0'
          }`}
          style={{ transformOrigin: 'center center' }}
        >
          五千年史馆
        </h1>
      </div>

      {/* 阶段 2-3: 印章落下 */}
      <div
        className={`mb-8 transition-all duration-700 ${
          phase >= 2
            ? 'translate-y-0 opacity-100 scale-100'
            : '-translate-y-20 opacity-0 scale-150'
        }`}
      >
        <div className="relative">
          <div
            className="border-4 border-red-700 dark:border-red-500 text-red-700 dark:text-red-500 rounded-lg inline-flex items-center justify-center
                       font-black bg-red-700 dark:bg-red-600/5 shadow-lg"
            style={{
              width: phase >= 2 ? '80px' : '0px',
              height: phase >= 2 ? '80px' : '0px',
            }}
          >
            <span
              className={`transition-opacity duration-300 ${phase >= 2 ? 'opacity-100' : 'opacity-0'}`}
              style={{ fontSize: '2.5rem' }}
            >
              史
            </span>
          </div>
          {/* 印章震动波纹 */}
          {phase >= 2 && (
            <div
              className="absolute inset-0 border-2 border-red-700 dark:border-red-500/30 rounded-lg"
              style={{
                animation: 'sealPulse 1s ease-out forwards',
                animationDelay: '0.5s',
              }}
            />
          )}
        </div>
      </div>

      {/* 阶段 3: 副标题 */}
      <p
        className={`text-lg md:text-xl text-ink-600 mb-12 tracking-wider transition-all duration-800 ${
          phase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        以史为鉴
      </p>

      {/* 阶段 4: 入口卡片 */}
      <EntryCards phase={phase} />
    </div>
  );
}

// ──────────────────────────────────────────────
// 入口卡片（延迟依次出现）
// ──────────────────────────────────────────────

const CARDS = [
  { to: '/timeline', icon: 'line', title: '时间轴', desc: '从炎黄到清末的大事记' },
  { to: '/dynasties', icon: 'line', title: '朝代更迭', desc: '十三王朝的兴衰' },
  { to: '/persons', icon: 'line', title: '人物志', desc: '五十个人物的故事' },
  { to: '/knowledge', icon: 'line', title: '史海钩沉', desc: '制度、发明、文化' },
];

function EntryCards({ phase }: { phase: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl px-6 w-full">
      {CARDS.map((card, i) => (
        <HeroCard key={card.to} card={card} index={i} phase={phase} />
      ))}
    </div>
  );
}

function HeroCard({
  card,
  index,
  phase,
}: {
  card: (typeof CARDS)[number];
  index: number;
  phase: number;
}) {
  const isVisible = phase >= 4;
  // 每张卡延迟 150ms 依次出现
  const delay = index * 150;

  return (
    <a
      href={card.to}
      className={`group block transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
    >
      <div className="bg-white/60 dark:bg-ink-900/60 backdrop-blur-sm rounded-xl p-8 border border-ink-200 dark:border-ink-700 hover:border-accent dark:hover:border-accent transition-all duration-300 hover:shadow-lg">
        <div className="w-12 h-12 mb-4 rounded-lg border border-ink-300 dark:border-ink-600 flex items-center justify-center text-ink-500 dark:text-ink-400 group-hover:border-accent group-hover:text-accent transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
        <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
          {card.title}
        </h3>
        <p className="text-ink-500 text-sm">{card.desc}</p>
      </div>
    </a>
  );
}
