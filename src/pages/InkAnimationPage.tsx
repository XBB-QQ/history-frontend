/**
 * 水墨动画叙事短片页面
 * @see history-museum/design/002-innovation-brainstorm.md §7
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import { INK_ANIMATIONS, type InkAnimation, type InkScene } from '@/data/inkAnimations';

type Phase = 'select' | 'playing' | 'ended';

export default function InkAnimationPage() {
  const [phase, setPhase] = useState<Phase>('select');
  const [animation, setAnimation] = useState<InkAnimation | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentScene, setCurrentScene] = useState<InkScene | null>(null);
  const [currentNarration, setCurrentNarration] = useState('');
  const timerRef = useRef<number | null>(null);

  const TOTAL_DURATION = 30; // 30秒

  function startAnimation(anim: InkAnimation) {
    setAnimation(anim);
    setCurrentTime(0);
    setCurrentScene(anim.scenes[0]);
    setCurrentNarration(anim.scenes[0].narrationLine);
    setPhase('playing');
    setIsPlaying(true);
  }

  // 播放计时器
  useEffect(() => {
    if (isPlaying && animation) {
      timerRef.current = window.setInterval(() => {
        setCurrentTime(prev => {
          const next = prev + 0.1;
          if (next >= TOTAL_DURATION) {
            setIsPlaying(false);
            setPhase('ended');
            return TOTAL_DURATION;
          }

          // 更新当前场景
          const scene = animation.scenes.find(s => next >= s.startTime && next < s.endTime);
          if (scene) {
            setCurrentScene(scene);
            setCurrentNarration(scene.narrationLine);
          }
          return next;
        });
      }, 100);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, animation]);

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function restart() {
    setCurrentTime(0);
    if (animation) {
      setCurrentScene(animation.scenes[0]);
      setCurrentNarration(animation.scenes[0].narrationLine);
    }
    setIsPlaying(true);
  }

  function getAnimProgress(scene: InkScene): number {
    if (!scene || currentTime < scene.startTime) return 0;
    if (currentTime >= scene.endTime) return 1;
    return (currentTime - scene.startTime) / (scene.endTime - scene.startTime);
  }

  // 水墨动画 CSS 样式
  function getSceneStyle(scene: InkScene | null): string {
    if (!scene) return '';
    const progress = getAnimProgress(scene);
    switch (scene.animType) {
      case 'ink-spread': return `opacity: ${progress}; transform: scale(${0.3 + progress * 0.7});`;
      case 'stroke-draw': return `clip-path: inset(0 ${(1 - progress) * 100}% 0 0);`;
      case 'fade-in': return `opacity: ${progress};`;
      case 'particle': return `opacity: ${progress}; filter: blur(${(1 - progress) * 5}px);`;
      case 'scroll': return `transform: translateY(${(1 - progress) * 50}px); opacity: ${progress};`;
      default: return '';
    }
  }

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <RevealOnScroll direction="fade">
          <SectionHeader
            label="INK ANIMATION"
            title="水墨动画短片"
            description="水墨风格的动画短片"
          />
        </RevealOnScroll>

        {/* 动画选择 */}
        {phase === 'select' && (
          <RevealOnScroll direction="up" delay={200}>
            <div className="mt-8 space-y-4">
              {INK_ANIMATIONS.map(anim => (
                <button
                  key={anim.id}
                  onClick={() => startAnimation(anim)}
                  className="w-full p-5 bg-white/70 dark:bg-ink-900/70 rounded-xl border border-ink-200 dark:border-ink-700 hover:border-accent hover:shadow-lg transition-all text-left group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 group-hover:text-accent">
                      {anim.title}
                    </h3>
                    <span className="text-sm text-ink-500">{anim.yearDisplay} · {anim.dynasty}</span>
                  </div>
                  <p className="text-sm text-ink-600 dark:text-ink-400">{anim.background}</p>
                  <div className="mt-2 flex gap-2 text-xs">
                    {anim.scenes.slice(0, 4).map(s => (
                      <span key={s.startTime} className="px-2 py-0.5 rounded-full bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-400">
                        {s.visual.slice(0, 8)}…
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </RevealOnScroll>
        )}

        {/* 播放界面 */}
        {(phase === 'playing' || phase === 'ended') && animation && (
          <div className="mt-8 space-y-4">
            {/* 水墨动画画布 */}
            <div className="relative rounded-xl overflow-hidden bg-ink-950" style={{ aspectRatio: '16/9' }}>
              {/* 装饰背景 */}
              <div className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.02) 3px, rgba(255,255,255,0.02) 6px)`,
                }}
              />

              {/* SVG 场景 */}
              <svg viewBox="0 0 800 350" className="absolute inset-0 w-full h-full">
                {/* 水墨江面 */}
                <path
                  d="M0,300 Q200,270 400,290 Q600,270 800,300"
                  fill="none"
                  stroke="#1a1a2e"
                  strokeWidth="2"
                  style={{
                    clipPath: `inset(0 ${(1 - Math.min(currentTime / 10, 1)) * 100}% 0 0)`,
                    opacity: 0.6,
                  }}
                />

                {/* 战船/城墙 */}
                {animation.svgDefs.map(def => {
                  const animProgress = currentTime > def.animation.delay
                    ? Math.min((currentTime - def.animation.delay) / def.animation.duration, 1)
                    : 0;
                  return (
                    <g key={def.id} style={{ opacity: animProgress }}>
                      {def.paths.map((p, idx) => (
                        <path
                          key={idx}
                          d={p}
                          fill={def.animation.type === 'opacity' ? def.color : 'none'}
                          stroke={def.color}
                          strokeWidth="2"
                          style={{
                            clipPath: def.animation.type === 'stroke-draw'
                              ? `inset(0 ${(1 - animProgress) * 100}% 0 0)`
                              : 'none',
                            transform: def.animation.type === 'scale'
                              ? `scale(${0.1 + animProgress * 2})`
                              : 'none',
                          }}
                        />
                      ))}
                    </g>
                  );
                })}

                {/* 火焰粒子 */}
                {currentTime >= 12 && currentTime <= 26 && (
                  <g style={{ opacity: Math.min((currentTime - 12) / 2, 1) }}>
                    {[...Array(8)].map((_, i) => (
                      <circle
                        key={i}
                        cx={180 + i * 30}
                        cy={260 - Math.sin((currentTime + i) * 2) * 40}
                        r={3 + Math.random() * 5}
                        fill="#ff4500"
                        opacity={0.5 + Math.random() * 0.5}
                      />
                    ))}
                  </g>
                )}

                {/* 进度标记 */}
                <line x1="0" y1="340" x2={currentTime / TOTAL_DURATION * 800} y2="340" stroke="#d97706" strokeWidth="3" opacity="0.5" />
              </svg>

              {/* 场景叠加层 */}
              {currentScene && (
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={Object.fromEntries(
                    getSceneStyle(currentScene).split(';').map(s => {
                      const [k, v] = s.trim().split(':').map(x => x?.trim());
                      return k && v ? [k, v] : [];
                    })
                  )}
                >
                  {/* 水墨晕染效果 */}
                  <div className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse at center, transparent 30%, rgba(10,10,30,0.3) 100%)`,
                    }}
                  />
                </div>
              )}

              {/* 旁白字幕 */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                <div className="text-white text-sm font-serif text-center leading-relaxed animate-fade-in"
                  style={{ fontFamily: 'var(--font-heading), serif' }}
                >
                  {currentNarration}
                </div>
              </div>

              {/* 时间标记 */}
              <div className="absolute top-3 right-3 text-xs text-white/60 font-mono">
                {currentTime.toFixed(1)}s / {TOTAL_DURATION}s
              </div>
            </div>

            {/* 播放控制 */}
            <div className="flex items-center gap-3 justify-center">
              <button onClick={togglePlay} className="px-4 py-2 rounded-lg bg-accent text-white font-bold text-sm hover:shadow-lg transition-all">
                {isPlaying ? '⏸ 暂停' : '▶ 播放'}
              </button>
              <button onClick={restart} className="px-4 py-2 rounded-lg bg-ink-100 dark:bg-ink-800 text-ink-700 dark:text-ink-300 font-bold text-sm transition-all">
                🔁 重播
              </button>
              <button onClick={() => setPhase('select')} className="px-4 py-2 rounded-lg bg-ink-100 dark:bg-ink-800 text-ink-700 dark:text-ink-300 font-bold text-sm transition-all">
                返回选择
              </button>
            </div>

            {/* 分镜脚本 */}
            <div className="p-4 bg-ink-50/50 dark:bg-ink-900/30 rounded-lg border border-ink-200 dark:border-ink-700">
              <h4 className="text-xs font-bold text-ink-700 dark:text-ink-300 mb-2 tracking-widest">
                🎬 分镜脚本
              </h4>
              <div className="flex gap-1">
                {animation.scenes.map(s => (
                  <button
                    key={s.startTime}
                    onClick={() => { setCurrentTime(s.startTime); setCurrentScene(s); setCurrentNarration(s.narrationLine); setIsPlaying(false); }}
                    className={`flex-1 p-2 rounded text-xs transition-all ${
                      currentScene?.startTime === s.startTime
                        ? 'bg-accent text-white'
                        : 'bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-400 hover:bg-accent/10'
                    }`}
                  >
                    {s.startTime}s
                  </button>
                ))}
              </div>
            </div>

            {/* 旁白全文 */}
            <div className="p-4 bg-white/70 dark:bg-ink-900/70 rounded-lg border border-ink-200 dark:border-ink-700">
              <h4 className="text-xs font-bold text-ink-700 dark:text-ink-300 mb-2 tracking-widest">
                📖 旁白全文
              </h4>
              <p className="text-sm text-ink-800 dark:text-ink-200 leading-loose whitespace-pre-line font-serif"
                style={{ fontFamily: 'var(--font-heading), serif' }}
              >
                {animation.narration}
              </p>
            </div>

            {/* 历史背景 */}
            <div className="p-4 bg-accent/5 dark:bg-accent/10 rounded-lg border-l-4 border-accent">
              <h4 className="text-xs font-bold text-accent mb-1 tracking-widest">历史背景</h4>
              <p className="text-sm text-ink-800 dark:text-ink-200">{animation.background}</p>
            </div>
          </div>
        )}

        {/* 底部 */}
        <RevealOnScroll direction="fade" delay={400}>
          <div className="mt-12 text-center">
            <Link to="/" className="btn-secondary">返回首页</Link>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
