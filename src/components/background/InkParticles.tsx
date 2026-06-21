import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  decay: number;
  char?: string;
}

interface InkParticlesProps {
  count?: number;
  className?: string;
}

/**
 * 水墨粒子背景效果
 * 模拟宣纸上飘散的墨粒，部分粒子携带淡化的汉字
 */
export default function InkParticles({
  count = 30,
  className = '',
}: InkParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const lastSpawnRef = useRef<number>(0);

  // 用于粒子效果的汉字库
  const inkChars = '天地玄黄宇宙洪荒日月盈昃辰宿列张寒来暑往秋收冬藏';

  const spawnParticle = useCallback((w: number, h: number): Particle => {
    const fromEdge = Math.random() > 0.5;
    let x: number, y: number;

    if (fromEdge) {
      // 从边缘生成
      if (Math.random() > 0.5) {
        x = Math.random() * w;
        y = Math.random() > 0.5 ? -10 : h + 10;
      } else {
        x = Math.random() > 0.5 ? -10 : w + 10;
        y = Math.random() * h;
      }
    } else {
      // 从随机位置生成
      x = Math.random() * w;
      y = Math.random() * h;
    }

    const hasChar = Math.random() > 0.7;
    return {
      x,
      y,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.5 - 0.1, // 微微向上飘
      radius: hasChar ? 10 + Math.random() * 6 : 1 + Math.random() * 2.5,
      opacity: hasChar ? 0.06 + Math.random() * 0.08 : 0.15 + Math.random() * 0.25,
      decay: 0.0002 + Math.random() * 0.0003,
      char: hasChar ? inkChars[Math.floor(Math.random() * inkChars.length)] : undefined,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 设置高分辨率 Canvas
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    // 初始化粒子池
    const w = window.innerWidth;
    const h = window.innerHeight;
    for (let i = 0; i < count; i++) {
      const p = spawnParticle(w, h);
      // 随机分布在屏幕上
      p.x = Math.random() * w;
      p.y = Math.random() * h;
      particlesRef.current.push(p);
    }

    const animate = (timestamp: number) => {
      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // 更新位置
        p.x += p.vx;
        p.y += p.vy;
        p.opacity -= p.decay;

        // 边界检测 + 衰减
        if (p.opacity <= 0 || p.x < -50 || p.x > w + 50 || p.y < -50 || p.y > h + 50) {
          // 重生
          particles.splice(i, 1);
          const newP = spawnParticle(w, h);
          particles.push(newP);
          continue;
        }

        if (p.char) {
          // 绘制汉字粒子
          ctx.save();
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = '#484037';
          ctx.font = `${p.radius * 2}px 'Noto Serif SC', serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(p.char, p.x, p.y);
          ctx.restore();
        } else {
          // 绘制墨点粒子
          ctx.save();
          ctx.globalAlpha = p.opacity;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = '#27231e';
          ctx.fill();
          ctx.restore();
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [count, spawnParticle]);

  // 检查 prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      // 用户偏好减少动画，隐藏 Canvas
      canvasRef.current?.classList.add('!hidden');
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      aria-hidden="true"
    />
  );
}
