import type { ReactNode } from 'react';
import InkParticles from './InkParticles';
import MountainMist from './MountainMist';
import { useSceneStore } from '@/store/sceneStore';

interface BackgroundLayerProps {
  children: ReactNode;
  /** 是否显示粒子效果（首页推荐关闭，避免干扰） */
  showParticles?: boolean;
  /** 朝代主色（覆盖默认粒子颜色） */
  dynastyAccent?: string;
}

/**
 * 全局背景层
 * 组合水墨粒子 + 山水云雾，作为所有页面的统一背景
 * 响应文化场景皮肤系统，动态应用场景背景
 * 支持朝代专属配色（粒子颜色跟随）
 */
export default function BackgroundLayer({
  children,
  showParticles = true,
  dynastyAccent,
}: BackgroundLayerProps) {
  const { sceneConfig } = useSceneStore();

  // 朝代粒子颜色优先级：prop > CSS变量 > 场景配置
  const particleColor = dynastyAccent
    || getComputedStyle(document.documentElement).getPropertyValue('--dynasty-particle-color').trim()
    || sceneConfig.particleConfig?.color;

  return (
    <div
      className="relative min-h-screen scene-bg"
      data-scene={sceneConfig.id}
      style={{
        backgroundColor: 'var(--dynasty-paper, var(--color-paper))',
        backgroundImage: 'var(--dynasty-gradient, var(--bg-pattern))',
        transition: 'background-color var(--transition-slower, 800ms) ease, background-image var(--transition-slower, 800ms) ease',
      }}
    >
      {/* 背景效果层 */}
      {showParticles && <InkParticles count={20} dynastyColor={particleColor} />}
      <MountainMist />

      {/* 页面内容层（z-10 确保在背景之上可交互） */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
