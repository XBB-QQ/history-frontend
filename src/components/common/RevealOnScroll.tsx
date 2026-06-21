import { useEffect, useRef, useState } from 'react';

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  /** 触发时机: 'up' 上滑 | 'left' 右移 | 'right' 左移 | 'scale' 缩放 | 'fade' 淡入 */
  direction?: 'up' | 'left' | 'right' | 'scale' | 'fade';
  /** 延迟触发（毫秒） */
  delay?: number;
  /** 阈值：元素进入视口多少比例时触发 */
  threshold?: number;
}

/**
 * 滚动入场动画组件
 * 当元素滚动到视口中时，添加对应的入场动画类
 */
export default function RevealOnScroll({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  threshold = 0.15,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const hasTriggered = useRef(false);

  useEffect(() => {
    // 尊重减少动画偏好
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRevealed(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered.current) {
          hasTriggered.current = true;
          // 延迟触发，给用户一个准备时间
          setTimeout(() => setRevealed(true), delay);
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);

  const baseClasses = {
    up: 'translate-y-8',
    left: '-translate-x-8',
    right: 'translate-x-8',
    scale: 'scale-95',
    fade: '',
  };

  const revealClasses = {
    up: 'translate-y-0',
    left: 'translate-x-0',
    right: 'translate-x-0',
    scale: 'scale-100',
    fade: '',
  };

  const transitionClass = 'transition-all duration-700 ease-out';

  return (
    <div
      ref={ref}
      className={`${className} ${
        revealed ? `${transitionClass} ${revealClasses[direction]}` : `${baseClasses[direction]} opacity-0`
      }`}
    >
      {children}
    </div>
  );
}
