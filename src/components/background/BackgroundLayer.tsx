import type { ReactNode } from 'react';
import InkParticles from './InkParticles';
import MountainMist from './MountainMist';
import { useSceneStore } from '@/store/sceneStore';

interface BackgroundLayerProps {
  children: ReactNode;
  /** 是否显示粒子效果（首页推荐关闭，避免干扰） */
  showParticles?: boolean;
}

/**
 * 全局背景层
 * 组合水墨粒子 + 山水云雾，作为所有页面的统一背景
 * 响应文化场景皮肤系统，动态应用场景背景
 */
export default function BackgroundLayer({
  children,
  showParticles = true,
}: BackgroundLayerProps) {
  const { sceneConfig } = useSceneStore();

  return (
    <div
      className="relative min-h-screen scene-bg"
      data-scene={sceneConfig.id}
      style={{
        backgroundColor: 'var(--color-paper)',
        backgroundImage: 'var(--bg-pattern)',
        transition: 'background-color 800ms ease, background-image 800ms ease',
      }}
    >
      {/* 背景效果层 */}
      {showParticles && <InkParticles count={20} />}
      <MountainMist />

      {/* 页面内容层（z-10 确保在背景之上可交互） */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
