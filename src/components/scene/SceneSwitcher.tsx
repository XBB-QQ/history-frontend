/**
 * 场景切换器 — 首页右下角浮动按钮
 * @see history-museum/design/001-cultural-scene-system.md §6.1
 */

import { useState, useEffect, useRef } from 'react';
import { useSceneStore } from '@/store/sceneStore';
import { SCENE_LIST } from '@/data/scenes';
import type { SceneId } from '@/types/scene';

export default function SceneSwitcher() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { currentScene, setScene, isLoadingFont, ambientSound, toggleAmbient } =
    useSceneStore();

  // 点击外部关闭
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  // ESC 关闭
  useEffect(() => {
    if (!open) return;
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [open]);

  async function handleSelect(id: SceneId) {
    await setScene(id);
    // 切换后保持面板打开，方便用户查看效果
  }

  return (
    <>
      {/* 浮动按钮 */}
      <button
        ref={buttonRef}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-paper/95 dark:bg-ink-900/95 border-2 border-ink-300 dark:border-ink-600 shadow-lg hover:shadow-xl hover:scale-105 transition-all backdrop-blur-sm flex items-center justify-center"
        aria-label="切换文化场景"
        title="切换文化场景"
        style={{ fontSize: '20px' }}
      >
        <span aria-hidden>🎨</span>
        {isLoadingFont && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse" />
        )}
      </button>

      {/* 展开面板 */}
      {open && (
        <div
          ref={panelRef}
          className="fixed bottom-24 right-6 z-50 w-72 bg-paper/98 dark:bg-ink-900/98 backdrop-blur-md border border-ink-200 dark:border-ink-700 rounded-xl shadow-2xl overflow-hidden"
          role="dialog"
          aria-label="文化场景选择"
        >
          {/* 头部 */}
          <div className="px-4 py-3 border-b border-ink-200 dark:border-ink-700 bg-ink-50/50 dark:bg-ink-800/50">
            <h3 className="font-bold text-ink-900 dark:text-ink-100 flex items-center gap-2">
              <span aria-hidden>🎨</span>
              <span>文化场景</span>
            </h3>
            <p className="text-xs text-ink-500 dark:text-ink-400 mt-0.5">
              切换主题，沉浸式体验不同文化氛围
            </p>
          </div>

          {/* 场景列表 */}
          <div className="max-h-72 overflow-y-auto">
            {SCENE_LIST.map((scene) => {
              const active = scene.id === currentScene;
              return (
                <button
                  key={scene.id}
                  onClick={() => handleSelect(scene.id)}
                  className={`w-full px-4 py-3 flex items-center gap-3 text-left transition-colors ${
                    active
                      ? 'bg-accent/10 border-l-4 border-accent'
                      : 'hover:bg-ink-50 dark:hover:bg-ink-800 border-l-4 border-transparent'
                  }`}
                >
                  <span className="text-2xl flex-shrink-0" aria-hidden>
                    {scene.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-bold ${
                          active
                            ? 'text-accent'
                            : 'text-ink-900 dark:text-ink-100'
                        }`}
                      >
                        {scene.name}
                      </span>
                      {active && (
                        <span className="text-xs text-accent">●</span>
                      )}
                    </div>
                    <p className="text-xs text-ink-500 dark:text-ink-400 truncate">
                      {scene.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* 底部：音效开关 */}
          <div className="border-t border-ink-200 dark:border-ink-700">
            <label className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-ink-50 dark:hover:bg-ink-800 transition-colors">
              <span className="text-sm text-ink-700 dark:text-ink-300 flex items-center gap-2">
                <span aria-hidden>{ambientSound ? '🔊' : '🔇'}</span>
                <span>氛围音效</span>
              </span>
              <input
                type="checkbox"
                checked={ambientSound}
                onChange={toggleAmbient}
                className="w-4 h-4 accent-accent"
              />
            </label>
          </div>
        </div>
      )}
    </>
  );
}
