/**
 * 氛围音效播放器 — 基于现有 Web Audio API 合成系统
 * 循环播放场景对应的氛围音，复用 historicalSound.ts 的合成函数
 */

import {
  playNote,
  playDrum,
  playBell,
  playNoise,
  PENTATONIC_SCALE,
  type SoundType,
} from './historicalSound';

/** 场景 → 氛围音类型映射 */
const SCENE_SOUND_MAP: Record<string, SoundType> = {
  'ink-wash': 'rain',
  'bamboo-slip': 'wind',
  'silk-scroll': 'guqin',
  'porcelain': 'rain',
  'bronze': 'bell',
  'seal': 'guqin',
};

let intervalId: number | null = null;

/** 各音效类型的播放间隔（毫秒） */
function getInterval(soundType: SoundType): number {
  switch (soundType) {
    case 'guqin':
      return 3000;
    case 'bell':
      return 5000;
    case 'drum':
      return 1500;
    case 'wind':
    case 'rain':
    case 'market':
      return 4000;
    default:
      return 3000;
  }
}

/** 播放一次指定类型的氛围音 */
function playOnce(soundType: SoundType): void {
  switch (soundType) {
    case 'guqin': {
      const note = PENTATONIC_SCALE[Math.floor(Math.random() * PENTATONIC_SCALE.length)];
      playNote(note.freq, {
        baseFreq: 220,
        oscType: 'sine',
        gain: 0.15,
        decay: 3,
        harmonics: 4,
      });
      break;
    }
    case 'bell':
      playBell(220 + Math.random() * 220);
      break;
    case 'drum':
      playDrum();
      break;
    case 'wind':
    case 'rain':
    case 'market':
      playNoise(soundType, 5);
      break;
  }
}

/** 开始播放场景氛围音 */
export function startAmbient(sceneId: string): void {
  stopAmbient();
  const soundType = SCENE_SOUND_MAP[sceneId] || 'guqin';
  playOnce(soundType);
  intervalId = window.setInterval(() => playOnce(soundType), getInterval(soundType));
}

/** 停止播放氛围音 */
export function stopAmbient(): void {
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
}
