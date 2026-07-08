import { useEffect, useRef, useState, useCallback } from 'react';

interface MountainMistProps {
  className?: string;
}

/**
 * 山水云雾装饰层
 * 用 SVG 绘制远处的山峦剪影和缓慢流动的云雾
 *
 * 视差滚动深化：
 * - 多层山峦以不同速度位移（远山慢、近山快）
 * - requestAnimationFrame + 节流（每帧最多更新一次）
 * - 移动端（<768px）减弱效果（位移幅度减半）
 * - 尊重 prefers-reduced-motion：完全禁用视差
 */
export default function MountainMist({ className = '' }: MountainMistProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const farMountainRef = useRef<SVGSVGElement>(null);
  const nearMountainRef = useRef<SVGSVGElement>(null);
  const mistLayerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // 懒加载：进入视口时才渲染
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 视差滚动：多层山峦以不同速度位移
  useEffect(() => {
    if (!visible) return;

    // 减少动画偏好：完全禁用视差
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let rafId: number | null = null;
    let lastScrollY = window.scrollY;
    let isTicking = false;

    const handleScroll = () => {
      lastScrollY = window.scrollY;
      if (!isTicking) {
        isTicking = true;
        rafId = requestAnimationFrame(() => {
          applyParallax(lastScrollY);
          isTicking = false;
        });
      }
    };

    const applyParallax = (scrollY: number) => {
      // 移动端减弱：位移幅度减半
      const isMobile = window.innerWidth < 768;
      const factor = isMobile ? 0.5 : 1;

      // 不同层不同速度：远山最慢，近山中速，云雾最快
      const farTranslate = scrollY * 0.05 * factor;   // 远山：5%
      const nearTranslate = scrollY * 0.12 * factor;  // 近山：12%
      const mistTranslate = scrollY * 0.18 * factor;  // 云雾：18%

      if (farMountainRef.current) {
        farMountainRef.current.style.transform = `translateY(${farTranslate}px)`;
      }
      if (nearMountainRef.current) {
        nearMountainRef.current.style.transform = `translateY(${nearTranslate}px)`;
      }
      if (mistLayerRef.current) {
        mistLayerRef.current.style.transform = `translateY(${mistTranslate}px)`;
      }
    };

    // 初始应用一次
    applyParallax(window.scrollY);

    // 节流：passive 监听器 + rAF
    window.addEventListener('scroll', handleScroll, { passive: true });
    // 窗口尺寸变化时重新计算（移动端切换桌面端）
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [visible]);

  // 云雾漂浮动画
  const mistKeyframes = useCallback(() => {
    if (!visible) return '';
    return `
      @keyframes mistDrift1 {
        0%, 100% { transform: translateX(0); }
        50% { transform: translateX(30px); }
      }
      @keyframes mistDrift2 {
        0%, 100% { transform: translateX(0); }
        50% { transform: translateX(-25px); }
      }
      @keyframes mistDrift3 {
        0%, 100% { transform: translateX(0); }
        50% { transform: translateX(20px); }
      }
      @keyframes mountainBreath {
        0%, 100% { opacity: 0.04; }
        50% { opacity: 0.07; }
      }
    `;
  }, [visible]);

  if (!visible) {
    return (
      <div ref={containerRef} className={`fixed inset-0 pointer-events-none z-0 ${className}`} />
    );
  }

  return (
    <div ref={containerRef} className={`fixed inset-0 pointer-events-none z-0 ${className}`}>
      {/* 注入动画样式 */}
      <style dangerouslySetInnerHTML={{ __html: mistKeyframes() }} />

      {/* 远处山峦剪影 — 多层视差 */}
      <svg
        ref={farMountainRef}
        className="absolute bottom-0 left-0 w-full will-change-transform"
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
        style={{ height: '40vh', opacity: 0.05, transition: 'transform 100ms ease-out' }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="mountainGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#484037" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#484037" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="mountainGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#484037" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#484037" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        {/* 远山层 */}
        <path
          d="M0,400 L0,280 Q100,200 200,250 Q300,180 400,220 Q500,150 600,200 Q700,120 800,180 Q900,100 1000,160 Q1100,130 1200,190 Q1300,150 1440,220 L1440,400 Z"
          fill="url(#mountainGrad1)"
          style={{ animation: 'mountainBreath 12s ease-in-out infinite' }}
        />
      </svg>

      {/* 近山层 — 独立 SVG，更快视差速度 */}
      <svg
        ref={nearMountainRef}
        className="absolute bottom-0 left-0 w-full will-change-transform"
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
        style={{ height: '35vh', opacity: 0.06, transition: 'transform 100ms ease-out' }}
        aria-hidden="true"
      >
        <path
          d="M0,400 L0,320 Q150,260 300,300 Q450,240 600,280 Q750,220 900,270 Q1050,230 1200,280 Q1350,250 1440,300 L1440,400 Z"
          fill="url(#mountainGrad2)"
          style={{ animation: 'mountainBreath 15s ease-in-out infinite 2s' }}
        />
      </svg>

      {/* 云雾层 — 最快视差速度 */}
      <div
        ref={mistLayerRef}
        className="absolute inset-0 overflow-hidden will-change-transform"
        style={{ transition: 'transform 100ms ease-out' }}
        aria-hidden="true"
      >
        <div
          className="absolute -bottom-20 left-0 w-[120%] h-40 rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(72,64,55,0.06) 0%, transparent 70%)',
            animation: 'mistDrift1 20s ease-in-out infinite',
          }}
        />
        <div
          className="absolute -bottom-10 left-10 w-[100%] h-32 rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(72,64,55,0.04) 0%, transparent 60%)',
            animation: 'mistDrift2 25s ease-in-out infinite 3s',
          }}
        />
        <div
          className="absolute bottom-0 right-20 w-[80%] h-28 rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(72,64,55,0.05) 0%, transparent 65%)',
            animation: 'mistDrift3 18s ease-in-out infinite 6s',
          }}
        />
      </div>
    </div>
  );
}
