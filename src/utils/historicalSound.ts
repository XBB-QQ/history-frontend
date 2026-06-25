/**
 * 历史声音还原 — Web Audio API 合成版
 * @see history-museum/design/002-innovation-brainstorm.md §6
 *
 * 纯前端合成，无需外部音频素材：
 * - 古琴五声音阶（宫商角徵羽）
 * - 战鼓节奏
 * - 编钟音效
 * - 市井白噪音
 */

export type SoundType = 'guqin' | 'bell' | 'drum' | 'market' | 'wind' | 'rain';

export interface SoundPreset {
  id: SoundType;
  name: string;
  emoji: string;
  description: string;
  /** 音色参数 */
  params: {
    /** 基础频率 Hz */
    baseFreq: number;
    /** 音色类型 */
    oscType: OscillatorType;
    /** 音量 */
    gain: number;
    /** 衰减时间 */
    decay: number;
    /** 泛音数量 */
    harmonics: number;
  };
}

export const SOUND_PRESETS: SoundPreset[] = [
  {
    id: 'guqin',
    name: '古琴',
    emoji: '🎵',
    description: '五声音阶：宫商角徵羽，低沉悠远',
    params: { baseFreq: 220, oscType: 'sine', gain: 0.3, decay: 2.5, harmonics: 4 },
  },
  {
    id: 'bell',
    name: '编钟',
    emoji: '🔔',
    description: '青铜钟声，庄严悠长，带金属泛音',
    params: { baseFreq: 440, oscType: 'triangle', gain: 0.25, decay: 3.0, harmonics: 6 },
  },
  {
    id: 'drum',
    name: '战鼓',
    emoji: '🥁',
    description: '低频鼓点，节奏感强，战场氛围',
    params: { baseFreq: 80, oscType: 'sine', gain: 0.4, decay: 0.5, harmonics: 2 },
  },
  {
    id: 'market',
    name: '市井',
    emoji: '🏪',
    description: '嘈杂白噪音，模拟宋代夜市喧嚣',
    params: { baseFreq: 200, oscType: 'sawtooth', gain: 0.15, decay: 4.0, harmonics: 3 },
  },
  {
    id: 'wind',
    name: '风声',
    emoji: '🍃',
    description: '自然风声，空旷苍凉',
    params: { baseFreq: 150, oscType: 'sine', gain: 0.1, decay: 5.0, harmonics: 2 },
  },
  {
    id: 'rain',
    name: '雨声',
    emoji: '🌧️',
    description: '淅沥雨声，江南烟雨',
    params: { baseFreq: 300, oscType: 'square', gain: 0.08, decay: 3.0, harmonics: 1 },
  },
];

/** 中国五声音阶频率（宫商角徵羽） */
export const PENTATONIC_SCALE = [
  { name: '宫', freq: 261.63, emoji: '🟡' },  // C
  { name: '商', freq: 293.66, emoji: '⚪' },  // D
  { name: '角', freq: 329.63, emoji: '🟢' },  // E
  { name: '徵', freq: 392.00, emoji: '🔴' },  // G
  { name: '羽', freq: 440.00, emoji: '🔵' },  // A
];

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/** 播放单个音符 */
export function playNote(freq: number, params: SoundPreset['params'], duration?: number): void {
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  const decay = duration ?? params.decay;

  // 主振荡器
  const osc = ctx.createOscillator();
  osc.type = params.oscType;
  osc.frequency.value = freq;

  // 增益节点（ADSR 包络）
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(params.gain, now + 0.02);  // Attack
  gain.gain.exponentialRampToValueAtTime(0.001, now + decay);   // Decay/Release

  // 泛音（增加音色丰富度）
  const harmonicGains: GainNode[] = [];
  for (let i = 2; i <= params.harmonics; i++) {
    const hOsc = ctx.createOscillator();
    hOsc.type = params.oscType;
    hOsc.frequency.value = freq * i;
    const hGain = ctx.createGain();
    hGain.gain.setValueAtTime(params.gain / (i * 2), now);
    hGain.gain.exponentialRampToValueAtTime(0.001, now + decay * 0.7);
    hOsc.connect(hGain);
    hGain.connect(ctx.destination);
    hOsc.start(now);
    hOsc.stop(now + decay);
    harmonicGains.push(hGain);
  }

  // 低通滤波（让音色更柔和）
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = freq * 4;
  filter.Q.value = 1;

  osc.connect(gain);
  gain.connect(filter);
  filter.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + decay);
}

/** 播放鼓点（特殊处理：低频 + 快速衰减） */
export function playDrum(): void {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(120, now);
  osc.frequency.exponentialRampToValueAtTime(40, now + 0.15);  // 鼓声下扫

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.5, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

  // 噪音层（鼓皮振动）
  const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.1, ctx.sampleRate);
  const data = noiseBuffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.02));
  }
  const noise = ctx.createBufferSource();
  noise.buffer = noiseBuffer;
  const noiseGain = ctx.createGain();
  noiseGain.gain.value = 0.15;

  osc.connect(gain);
  gain.connect(ctx.destination);
  noise.connect(noiseGain);
  noiseGain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.4);
  noise.start(now);
  noise.stop(now + 0.1);
}

/** 播放编钟（特殊处理：金属泛音 + 长尾） */
export function playBell(freq: number = 440): void {
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  const harmonics = [1, 2.76, 5.4, 8.93];  // 编钟特征泛音比

  harmonics.forEach((mult, idx) => {
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = freq * mult;

    const gain = ctx.createGain();
    const vol = 0.3 / (idx + 1);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(vol, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 3 - idx * 0.5);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 3);
  });
}

/** 播放白噪音（市井/风声/雨声） */
export function playNoise(type: SoundType, duration: number = 3): void {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  if (type === 'market') {
    // 市井：带节奏的嘈杂声
    for (let i = 0; i < bufferSize; i++) {
      const t = i / ctx.sampleRate;
      const envelope = Math.sin(t * 2) * 0.5 + 0.5;
      data[i] = (Math.random() * 2 - 1) * envelope * 0.3;
    }
  } else if (type === 'wind') {
    // 风声：低频起伏白噪
    for (let i = 0; i < bufferSize; i++) {
      const t = i / ctx.sampleRate;
      const envelope = Math.sin(t * 0.5) * 0.5 + 0.5;
      data[i] = (Math.random() * 2 - 1) * envelope * 0.2;
    }
  } else if (type === 'rain') {
    // 雨声：高频白噪 + 随机滴答
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.15;
      if (Math.random() < 0.001) data[i] += Math.random() * 0.5;  // 随机水滴
    }
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = type === 'rain' ? 'highpass' : 'lowpass';
  filter.frequency.value = type === 'rain' ? 1000 : type === 'wind' ? 400 : 800;

  const gain = ctx.createGain();
  gain.gain.value = 0.3;

  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  source.start(now);
}

/** 朝代声景预设组合 */
export interface DynastySoundscape {
  dynasty: string;
  name: string;
  emoji: string;
  description: string;
  /** 推荐音效组合 */
  sounds: SoundType[];
  /** 推荐音阶 */
  scale?: string;
}

export const DYNASTY_SOUNDSCAPES: DynastySoundscape[] = [
  { dynasty: 'qin', name: '秦', emoji: '⚔️', description: '金戈铁马，一统天下', sounds: ['drum', 'bell'], scale: '宫' },
  { dynasty: 'han', name: '汉', emoji: '🏛️', description: '钟磬齐鸣，大汉威仪', sounds: ['bell', 'guqin'] },
  { dynasty: 'tang', name: '唐', emoji: '🏮', description: '盛世胡音，万邦来朝', sounds: ['guqin', 'bell', 'market'] },
  { dynasty: 'song', name: '宋', emoji: '📜', description: '市井繁华，夜市喧嚣', sounds: ['guqin', 'market', 'rain'] },
  { dynasty: 'yuan', name: '元', emoji: '🐎', description: '草原风啸，铁骑铮铮', sounds: ['drum', 'wind'] },
  { dynasty: 'ming', name: '明', emoji: '🏯', description: '钟鼓楼声，市井烟火', sounds: ['bell', 'drum', 'market'] },
  { dynasty: 'qing', name: '清', emoji: '🐉', description: '宫廷雅乐，盛世余晖', sounds: ['guqin', 'bell'] },
];
