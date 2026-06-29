/**
 * 场景状态管理
 * @see history-museum/design/001-cultural-scene-system.md §5.3
 */

import { create } from 'zustand';
import type { CulturalScene, SceneId, ScenePreference } from '@/types/scene';
import { SCENE_CONFIGS, DEFAULT_SCENE } from '@/data/themes/scenes';
import { loadSceneFonts } from '@/utils/fontLoader';
import { getSceneByDynasty } from '@/data/themes/dynastySceneMap';

const STORAGE_KEY = 'history-museum-scene';

interface SceneStore {
  /** 当前场景 ID */
  currentScene: SceneId;
  /** 当前场景完整配置 */
  sceneConfig: CulturalScene;
  /** 字体加载中 */
  isLoadingFont: boolean;
  /** 氛围音效开关 */
  ambientSound: boolean;
  /** 内容联动自动切换（hover 朝代时自动切换场景） */
  autoSwitchByContent: boolean;
  /** 自动切换前的场景（用于恢复） */
  previousScene: SceneId | null;

  /** 手动切换场景 */
  setScene: (id: SceneId) => Promise<void>;
  /** 根据朝代自动切换场景（受 autoSwitchByContent 控制） */
  setSceneByDynasty: (dynastyName: string) => Promise<void>;
  /** 恢复到自动切换前的场景 */
  restoreScene: () => Promise<void>;
  /** 切换音效 */
  toggleAmbient: () => void;
  /** 设置自动切换 */
  setAutoSwitch: (enabled: boolean) => void;
  /** 从 localStorage 恢复偏好 */
  hydrateFromStorage: () => void;
}

/** 应用场景主题到 document.documentElement */
function applySceneTheme(scene: CulturalScene): void {
  const root = document.documentElement;
  Object.entries(scene.theme).forEach(([key, value]) => {
    if (value) {
      root.style.setProperty(key, value);
    } else {
      root.style.removeProperty(key);
    }
  });
  root.setAttribute('data-scene', scene.id);
}

/** 读取偏好 */
function readPreference(): ScenePreference | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ScenePreference;
  } catch {
    return null;
  }
}

/** 写入偏好 */
function writePreference(pref: ScenePreference): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pref));
  } catch {
    // ignore
  }
}

export const useSceneStore = create<SceneStore>((set, get) => ({
  currentScene: DEFAULT_SCENE,
  sceneConfig: SCENE_CONFIGS[DEFAULT_SCENE],
  isLoadingFont: false,
  ambientSound: false,
  autoSwitchByContent: false,
  previousScene: null,

  setScene: async (id: SceneId) => {
    const scene = SCENE_CONFIGS[id];
    if (!scene) return;

    set({ isLoadingFont: true });

    // 字体加载（不阻塞主题应用，但字体就绪后再完成 loading）
    loadSceneFonts(id).finally(() => {
      set({ isLoadingFont: false });
    });

    // 立即应用主题 CSS 变量
    applySceneTheme(scene);

    // 更新状态
    set({
      currentScene: id,
      sceneConfig: scene,
      previousScene: null, // 手动切换清空 previousScene
    });

    // 持久化
    const pref: ScenePreference = {
      current: id,
      ambientSound: get().ambientSound,
      autoSwitchByContent: get().autoSwitchByContent,
    };
    writePreference(pref);
  },

  setSceneByDynasty: async (dynastyName: string) => {
    // 只在开启自动切换时生效
    if (!get().autoSwitchByContent) return;

    const targetScene = getSceneByDynasty(dynastyName);
    const currentScene = get().currentScene;

    // 相同场景不切换
    if (targetScene === currentScene) return;

    // 保存当前场景作为 previousScene
    set({ previousScene: currentScene });

    // 应用场景（不持久化，只是临时切换）
    const scene = SCENE_CONFIGS[targetScene];
    if (!scene) return;

    set({ isLoadingFont: true });
    loadSceneFonts(targetScene).finally(() => {
      set({ isLoadingFont: false });
    });

    applySceneTheme(scene);
    set({
      currentScene: targetScene,
      sceneConfig: scene,
    });
  },

  restoreScene: async () => {
    if (!get().autoSwitchByContent) return;

    const prev = get().previousScene;
    if (!prev) return;

    const scene = SCENE_CONFIGS[prev];
    if (!scene) return;

    applySceneTheme(scene);
    set({
      currentScene: prev,
      sceneConfig: scene,
      previousScene: null,
    });
  },

  toggleAmbient: () => {
    const next = !get().ambientSound;
    set({ ambientSound: next });
    const pref = readPreference();
    if (pref) {
      pref.ambientSound = next;
      writePreference(pref);
    }
  },

  setAutoSwitch: (enabled: boolean) => {
    set({ autoSwitchByContent: enabled });
    const pref = readPreference();
    if (pref) {
      pref.autoSwitchByContent = enabled;
      writePreference(pref);
    } else {
      // 没有历史偏好时创建一个
      writePreference({
        current: get().currentScene,
        ambientSound: get().ambientSound,
        autoSwitchByContent: enabled,
      });
    }
  },

  hydrateFromStorage: () => {
    const pref = readPreference();
    if (!pref) return;
    const scene = SCENE_CONFIGS[pref.current] || SCENE_CONFIGS[DEFAULT_SCENE];
    applySceneTheme(scene);
    set({
      currentScene: scene.id,
      sceneConfig: scene,
      ambientSound: pref.ambientSound,
      autoSwitchByContent: pref.autoSwitchByContent,
    });
  },
}));
