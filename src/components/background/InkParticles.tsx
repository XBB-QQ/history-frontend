import { useEffect, useRef, useCallback } from 'react';
import { useTheme } from '@/components/layout/ThemeProvider';
import { useTimeTravelStore } from '@/store/timeTravelStore';
import { useSceneStore } from '@/store/sceneStore';

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
  /** 朝代粒子颜色（覆盖默认） */
  dynastyColor?: string;
}

/**
 * 粒子背景效果
 * 默认模拟宣纸上飘散的墨粒，部分粒子携带淡化的汉字
 * 根据当前文化场景动态调整：粒子颜色、字符集、大小、透明度
 */
export default function InkParticles({
  count: baseCount = 30,
  className = '',
  dynastyColor,
}: InkParticlesProps) {
  const { primaryColor, isDefault } = useTheme();
  const ttActive = useTimeTravelStore((s) => s.active);
  const { sceneConfig } = useSceneStore();
  // 时间旅行激活时增加粒子密度
  const count = ttActive ? baseCount * 2 : baseCount;

  // 场景配置的粒子颜色优先；其次朝代配色；否则用主题色；否则默认墨色
  const sceneParticleColor = sceneConfig.particleConfig?.color;
  const dynastyParticleColor = dynastyColor
    || getComputedStyle(document.documentElement).getPropertyValue('--dynasty-particle-color').trim();
  const particleColor =
    sceneParticleColor || dynastyParticleColor || (isDefault ? '#27231e' : primaryColor);

  // 场景字符集
  const sceneChars = sceneConfig.particleConfig?.chars;
  const inkChars =
    sceneChars || '天地玄黄宇宙洪荒日月盈昃辰宿列张寒来暑往秋收冬藏';
  const charProbability = sceneConfig.particleConfig?.charProbability ?? 0.3;
  const radiusRange = sceneConfig.particleConfig?.radiusRange || [1, 3.5];
  const opacityRange = sceneConfig.particleConfig?.opacityRange || [0.15, 0.4];

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const colorRef = useRef(particleColor);
  const charsRef = useRef(inkChars);
  const charProbRef = useRef(charProbability);
  const radiusRangeRef = useRef(radiusRange);
  const opacityRangeRef = useRef(opacityRange);

  // 同步 ref
  useEffect(() => {
    colorRef.current = particleColor;
  }, [particleColor]);
  useEffect(() => {
    charsRef.current = inkChars;
    charProbRef.current = charProbability;
    radiusRangeRef.current = radiusRange;
    opacityRangeRef.current = opacityRange;
  }, [inkChars, charProbability, radiusRange, opacityRange]);

  const spawnParticle = useCallback((_w: number, _h: number): Particle => {
    const fromEdge = Math.random() > 0.5;
    let x: number, y: number;

    if (fromEdge) {
      if (Math.random() > 0.5) {
        x = Math.random() * window.innerWidth;
        y = Math.random() > 0.5 ? -10 : window.innerHeight + 10;
      } else {
        x = Math.random() > 0.5 ? -10 : window.innerWidth + 10;
        y = Math.random() * window.innerHeight;
      }
    } else {
      x = Math.random() * window.innerWidth;
      y = Math.random() * window.innerHeight;
    }

    const hasChar = Math.random() < charProbRef.current;
    const [rMin, rMax] = radiusRangeRef.current;
    const [oMin, oMax] = opacityRangeRef.current;
    const chars = charsRef.current;
    return {
      x,
      y,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.5 - 0.1,
      radius: hasChar ? rMin + 8 + Math.random() * (rMax + 4) : rMin + Math.random() * (rMax - rMin),
      opacity: hasChar ? oMin * 0.5 + Math.random() * (oMax - oMin) * 0.5 : oMin + Math.random() * (oMax - oMin),
      decay: 0.0002 + Math.random() * 0.0003,
      char: hasChar ? chars[Math.floor(Math.random() * chars.length)] : undefined,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

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
      p.x = Math.random() * w;
      p.y = Math.random() * h;
      particlesRef.current.push(p);
    }

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      const currentColor = colorRef.current;
      const particles = particlesRef.current;
      const headingFont = sceneConfig.theme['--font-heading'] || "'Noto Serif SC', serif";

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.opacity -= p.decay;

        if (p.opacity <= 0 || p.x < -50 || p.x > w + 50 || p.y < -50 || p.y > h + 50) {
          particles.splice(i, 1);
          const newP = spawnParticle(w, h);
          particles.push(newP);
          continue;
        }

        if (p.char) {
          ctx.save();
          ctx.globalAlpha = p.opacity * 0.6;
          ctx.fillStyle = currentColor;
          ctx.font = `${p.radius * 2}px ${headingFont}`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(p.char, p.x, p.y);
          ctx.restore();
        } else {
          ctx.save();
          ctx.globalAlpha = p.opacity;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = currentColor;
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
  }, [count, spawnParticle, sceneConfig]);

  // 检查 prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
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
