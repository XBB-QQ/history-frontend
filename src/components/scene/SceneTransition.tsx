/**
 * 场景过渡动画组件
 * 切换场景时显示淡入淡出遮罩
 */

import { useEffect, useState } from 'react';
import { useSceneStore } from '@/store/sceneStore';

export default function SceneTransition() {
  const { currentScene } = useSceneStore();
  const [visible, setVisible] = useState(false);

  // 场景变化时触发过渡
  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), 600);
    return () => clearTimeout(timer);
  }, [currentScene]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[60] pointer-events-none"
      style={{
        background:
          'radial-gradient(circle, rgba(245,240,232,0.3) 0%, transparent 70%)',
        animation: 'sceneFade 600ms ease-out forwards',
      }}
      aria-hidden
    >
      <style>{`
        @keyframes sceneFade {
          0% { opacity: 0.8; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
