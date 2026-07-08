import { useEffect, useState, useRef } from 'react';

/**
 * 页面级 Loading 动画
 * 首次访问时显示 2-3 秒，毛笔书写"五千年史馆"效果后淡出
 * - 用 sessionStorage 标记"本次会话已加载过"，避免每次切换路由都触发
 * - 尊重 prefers-reduced-motion：直接跳过动画
 * - 全屏覆盖，z-index 极高
 */
const STORAGE_KEY = 'page-loader-shown';
const DURATION_MS = 2600; // 总时长 ≈ 2.6 秒，与 HeroAnimation 节奏一致

export default function PageLoader() {
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0); // 0: 初始 1: 书写中 2: 印章落下 3: 淡出
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // 减少动画偏好：直接跳过
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // 本次会话已显示过：跳过
    if (sessionStorage.getItem(STORAGE_KEY) === '1') return;

    setVisible(true);
    sessionStorage.setItem(STORAGE_KEY, '1');

    // 动画时序
    timerRef.current = setTimeout(() => setPhase(1), 100);   // 开始书写
    timerRef.current = setTimeout(() => setPhase(2), 1500);  // 印章落下
    timerRef.current = setTimeout(() => setPhase(3), 2200);  // 开始淡出
    timerRef.current = setTimeout(() => setVisible(false), DURATION_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-paper dark:bg-ink-950 transition-opacity duration-700 ease-out
                  ${phase >= 3 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      aria-hidden="true"
    >
      {/* 背景墨滴扩散 */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ opacity: phase >= 1 ? 0.15 : 0, transition: 'opacity 800ms ease-out' }}
      >
        <div
          className="w-32 h-32 rounded-full bg-accent/30"
          style={{
            animation: phase >= 1 ? 'inkDropSpread 2s ease-out forwards' : 'none',
          }}
        />
      </div>

      {/* 毛笔书写标题 */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="overflow-hidden">
          <h1
            className="text-5xl md:text-6xl font-black tracking-[0.3em] text-ink-900 dark:text-ink-100"
            style={{
              clipPath: phase >= 1 ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)',
              transition: 'clip-path 1.4s ease-out',
            }}
          >
            五千年史馆
          </h1>
        </div>

        {/* 书写中的毛笔指示线（动画结束后隐藏） */}
        {phase < 2 && (
          <div
            className="absolute top-1/2 -translate-y-1/2 h-12 w-0.5 bg-accent"
            style={{
              left: phase >= 1 ? 'calc(100% - 2px)' : '0',
              opacity: phase >= 1 ? 0.6 : 0,
              transition: 'left 1.4s ease-out, opacity 400ms ease-out',
            }}
          />
        )}

        {/* 印章落下 */}
        <div
          className={`mt-8 transition-all duration-500 ${
            phase >= 2
              ? 'translate-y-0 opacity-100 scale-100'
              : '-translate-y-12 opacity-0 scale-150'
          }`}
        >
          <div
            className="border-4 border-red-700 dark:border-red-500 text-red-700 dark:text-red-500 rounded-lg inline-flex items-center justify-center font-black bg-red-700/5 shadow-lg"
            style={{ width: '64px', height: '64px' }}
          >
            <span style={{ fontSize: '2rem' }}>史</span>
          </div>
        </div>

        {/* 副标题 */}
        <p
          className={`mt-6 text-sm text-ink-500 dark:text-ink-400 tracking-[0.5em] transition-opacity duration-500 ${
            phase >= 2 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          以 史 为 鉴
        </p>
      </div>

      {/* 进度指示 */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <div className="w-32 h-0.5 bg-ink-200 dark:bg-ink-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full"
            style={{
              width: phase >= 1 ? '100%' : '0%',
              transition: 'width 2s ease-out',
            }}
          />
        </div>
      </div>
    </div>
  );
}
