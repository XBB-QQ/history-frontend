/**
 * 历史声音博物馆页面 — Web Audio API 合成版
 * @see history-museum/design/002-innovation-brainstorm.md §6
 */

import { useState } from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import {
  SOUND_PRESETS, PENTATONIC_SCALE, DYNASTY_SOUNDSCAPES,
  playNote, playDrum, playBell, playNoise,
  type SoundType, type SoundPreset,
} from '@/features/historicalSound';
import { useT } from '@/i18n/i18n';

export default function SoundMuseumPage() {
  const t = useT();
  const [activeSound, setActiveSound] = useState<SoundType | null>(null);
  const [activeDynasty, setActiveDynasty] = useState<string | null>(null);

  function playSound(sound: SoundType, params: SoundPreset['params']) {
    setActiveSound(sound);
    switch (sound) {
      case 'drum':
        playDrum();
        break;
      case 'bell':
        playBell(params.baseFreq * 2);
        break;
      case 'guqin':
        // 播放宫音
        playNote(PENTATONIC_SCALE[0].freq, params);
        break;
      case 'market':
      case 'wind':
      case 'rain':
        playNoise(sound, 4);
        break;
    }
    setTimeout(() => setActiveSound(null), 3000);
  }

  function playDynastySoundscape(dynastyId: string) {
    const dynasty = DYNASTY_SOUNDSCAPES.find(d => d.dynasty === dynastyId);
    if (!dynasty) return;
    setActiveDynasty(dynastyId);

    // 按顺序播放组合音效
    dynasty.sounds.forEach((sound, idx) => {
      const preset = SOUND_PRESETS.find(p => p.id === sound)!;
      setTimeout(() => playSound(sound, preset.params), idx * 600);
    });

    setTimeout(() => setActiveDynasty(null), dynasty.sounds.length * 600 + 3000);
  }

  function playMelody() {
    // 播放完整五声音阶旋律
    PENTATONIC_SCALE.forEach((note, idx) => {
      setTimeout(() => {
        const preset = SOUND_PRESETS.find(p => p.id === 'guqin')!;
        playNote(note.freq, preset.params);
      }, idx * 400);
    });
  }

  function playWarScene() {
    // 战场场景：连续鼓点 + 钟声
    [0, 300, 600, 900, 1200].forEach(t => {
      setTimeout(() => playDrum(), t);
    });
    setTimeout(() => playBell(220), 1500);
  }

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <RevealOnScroll direction="fade">
          <SectionHeader
            label={t('soundMuseum.label')}
            title={t('soundMuseum.title')}
            description={t('soundMuseum.description')}
          />
        </RevealOnScroll>

        {/* 提示 */}
        <RevealOnScroll direction="up" delay={200}>
          <div className="mt-8 p-4 bg-amber-50/60 dark:bg-amber-900/10 rounded-lg border-l-4 border-amber-500 text-sm text-ink-700 dark:text-ink-300">
            {t('soundMuseum.tip')}
          </div>
        </RevealOnScroll>

        {/* 音效面板 */}
        <RevealOnScroll direction="up" delay={300}>
          <div className="mt-6 p-5 bg-white/70 dark:bg-ink-900/70 rounded-xl border border-ink-200 dark:border-ink-700">
            <h3 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-3 tracking-widest">
              {t('soundMuseum.basic_sounds')}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {SOUND_PRESETS.map(preset => (
                <button
                  key={preset.id}
                  onClick={() => playSound(preset.id, preset.params)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    activeSound === preset.id
                      ? 'border-accent bg-accent/10 shadow-lg scale-105'
                      : 'border-ink-200 dark:border-ink-700 hover:border-accent hover:bg-accent/5'
                  }`}
                >
                  <div className="text-3xl mb-2">{preset.emoji}</div>
                  <div className="font-bold text-ink-900 dark:text-ink-100">{preset.name}</div>
                  <div className="text-xs text-ink-500 dark:text-ink-400 mt-1">{preset.description}</div>
                  {activeSound === preset.id && (
                    <div className="mt-2 flex justify-center gap-1">
                      {[...Array(3)].map((_, i) => (
                        <span key={i} className="w-1 h-3 bg-accent rounded animate-pulse"
                          style={{ animationDelay: `${i * 0.2}s` }} />
                      ))}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* 古琴五声音阶 */}
        <RevealOnScroll direction="up">
          <div className="mt-4 p-5 bg-white/70 dark:bg-ink-900/70 rounded-xl border border-ink-200 dark:border-ink-700">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-ink-700 dark:text-ink-300 tracking-widest">
                {t('soundMuseum.pentatonic_title')}
              </h3>
              <button
                onClick={playMelody}
                className="px-3 py-1 rounded-lg bg-accent text-white text-xs font-bold hover:shadow-lg transition-all"
              >
                {t('soundMuseum.play_melody')}
              </button>
            </div>
            <div className="flex gap-2 justify-center">
              {PENTATONIC_SCALE.map(note => {
                const preset = SOUND_PRESETS.find(p => p.id === 'guqin')!;
                return (
                  <button
                    key={note.name}
                    onClick={() => playNote(note.freq, preset.params)}
                    className="flex-1 max-w-20 p-3 rounded-lg bg-gradient-to-b from-ink-50 to-ink-100 dark:from-ink-800 dark:to-ink-900 border border-ink-200 dark:border-ink-600 hover:border-accent hover:shadow-md transition-all group"
                  >
                    <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">{note.emoji}</div>
                    <div className="font-bold text-ink-900 dark:text-ink-100">{note.name}</div>
                    <div className="text-xs text-ink-400">{note.freq.toFixed(0)}Hz</div>
                  </button>
                );
              })}
            </div>
            <div className="mt-2 text-center text-xs text-ink-400">
              {t('soundMuseum.pentatonic_desc')}
            </div>
          </div>
        </RevealOnScroll>

        {/* 朝代声景 */}
        <RevealOnScroll direction="up">
          <div className="mt-4 p-5 bg-white/70 dark:bg-ink-900/70 rounded-xl border border-ink-200 dark:border-ink-700">
            <h3 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-3 tracking-widest">
              {t('soundMuseum.dynasty_soundscape')}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {DYNASTY_SOUNDSCAPES.map(d => (
                <button
                  key={d.dynasty}
                  onClick={() => playDynastySoundscape(d.dynasty)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    activeDynasty === d.dynasty
                      ? 'border-accent bg-accent/10 shadow-lg scale-105'
                      : 'border-ink-200 dark:border-ink-700 hover:border-accent'
                  }`}
                >
                  <div className="text-3xl mb-1">{d.emoji}</div>
                  <div className="font-bold text-ink-900 dark:text-ink-100">{d.name}{t('soundMuseum.dynasty_suffix')}</div>
                  <div className="text-xs text-ink-500 dark:text-ink-400 mt-1">{d.description}</div>
                  <div className="flex gap-1 mt-2 justify-center">
                    {d.sounds.map(s => {
                      const p = SOUND_PRESETS.find(sp => sp.id === s)!;
                      return <span key={s} className="text-xs">{p.emoji}</span>;
                    })}
                  </div>
                  {activeDynasty === d.dynasty && (
                    <div className="mt-2 text-xs text-accent font-bold animate-pulse">{t('soundMuseum.playing')}</div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* 场景音效 */}
        <RevealOnScroll direction="up">
          <div className="mt-4 p-5 bg-white/70 dark:bg-ink-900/70 rounded-xl border border-ink-200 dark:border-ink-700">
            <h3 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-3 tracking-widest">
              {t('soundMuseum.scene_sounds')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={playWarScene}
                className="p-4 rounded-xl bg-gradient-to-br from-red-500/10 to-amber-500/10 border border-red-500/30 hover:shadow-lg transition-all"
              >
                <div className="text-3xl mb-1">战</div>
                <div className="font-bold text-ink-900 dark:text-ink-100">{t('soundMuseum.war_scene')}</div>
                <div className="text-xs text-ink-500">{t('soundMuseum.war_scene_desc')}</div>
              </button>
              <button
                onClick={() => playNoise('rain', 8)}
                className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-green-500/10 border border-blue-500/30 hover:shadow-lg transition-all"
              >
                <div className="text-3xl mb-1">雨</div>
                <div className="font-bold text-ink-900 dark:text-ink-100">{t('soundMuseum.rain_scene')}</div>
                <div className="text-xs text-ink-500">{t('soundMuseum.rain_scene_desc')}</div>
              </button>
              <button
                onClick={() => playNoise('market', 8)}
                className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 hover:shadow-lg transition-all"
              >
                <div className="text-3xl mb-1">🏪</div>
                <div className="font-bold text-ink-900 dark:text-ink-100">{t('soundMuseum.market_scene')}</div>
                <div className="text-xs text-ink-500">{t('soundMuseum.market_scene_desc')}</div>
              </button>
            </div>
          </div>
        </RevealOnScroll>

        {/* 底部 */}
      </div>
    </div>
  );
}
