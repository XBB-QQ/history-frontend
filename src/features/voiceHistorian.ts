/**
 * 语音史官 — Web Speech API TTS 朗读
 * 支持三种风格：说书人（慢速+低音）/ 学者（中速+中音）/ 少儿（快速+高音）
 */

export type VoiceStyle = 'storyteller' | 'scholar' | 'children';

export interface VoiceConfig {
  rate: number;     // 语速 0.1-10
  pitch: number;    // 音调 0-2
  volume: number;   // 音量 0-1
  label: string;
  icon: string;
  description: string;
}

export const VOICE_STYLES: Record<VoiceStyle, VoiceConfig> = {
  storyteller: {
    rate: 0.85,
    pitch: 0.8,
    volume: 1,
    label: '说书人',
    icon: '📖',
    description: '慢节奏低沉讲述，适合品鉴历史故事',
  },
  scholar: {
    rate: 1.0,
    pitch: 1.0,
    volume: 1,
    label: '学者',
    icon: '🎓',
    description: '平稳中速朗读，适合学术阅读',
  },
  children: {
    rate: 1.2,
    pitch: 1.4,
    volume: 1,
    label: '少儿版',
    icon: '🧒',
    description: '活泼快速讲述，适合青少年入门',
  },
};

let synthesis: SpeechSynthesis | null = null;
let currentUtterance: SpeechSynthesisUtterance | null = null;

function getSynthesis(): SpeechSynthesis | null {
  if (typeof window === 'undefined') return null;
  if (!window.speechSynthesis) return null;
  return window.speechSynthesis;
}

/** 选择最佳中文语音 */
function pickChineseVoice(): SpeechSynthesisVoice | null {
  const synth = getSynthesis();
  if (!synth) return null;

  const voices = synth.getVoices();
  // 优先选择中文普通话语音
  const zhVoice = voices.find(v => v.lang === 'zh-CN') ||
                  voices.find(v => v.lang.startsWith('zh')) ||
                  voices.find(v => v.lang === 'cmn-Hans-CN');
  return zhVoice || null;
}

/** 朗读文本 */
export function speakText(
  text: string,
  style: VoiceStyle = 'scholar',
  onEnd?: () => void,
  onProgress?: (charIndex: number) => void,
): boolean {
  const synth = getSynthesis();
  if (!synth) return false;

  // 先停止当前朗读
  stopSpeaking();

  const config = VOICE_STYLES[style];
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = config.rate;
  utterance.pitch = config.pitch;
  utterance.volume = config.volume;

  const voice = pickChineseVoice();
  if (voice) utterance.voice = voice;

  utterance.onend = () => {
    currentUtterance = null;
    onEnd?.();
  };

  utterance.onboundary = (event) => {
    onProgress?.(event.charIndex);
  };

  utterance.onerror = () => {
    currentUtterance = null;
  };

  currentUtterance = utterance;
  synth.speak(utterance);
  return true;
}

/** 停止朗读 */
export function stopSpeaking(): void {
  const synth = getSynthesis();
  if (!synth) return;
  synth.cancel();
  currentUtterance = null;
}

/** 暂停朗读 */
export function pauseSpeaking(): void {
  const synth = getSynthesis();
  if (!synth) return;
  synth.pause();
}

/** 继续朗读 */
export function resumeSpeaking(): void {
  const synth = getSynthesis();
  if (!synth) return;
  synth.resume();
}

/** 是否正在朗读 */
export function isSpeaking(): boolean {
  const synth = getSynthesis();
  if (!synth) return false;
  return synth.speaking;
}

/** 是否支持语音 */
export function isVoiceSupported(): boolean {
  return typeof window !== 'undefined' && !!window.speechSynthesis;
}

/** 为事件详情生成朗读文本 */
export function buildEventNarration(event: {
  title: string;
  yearDisplay: string;
  dynasty: string;
  description: string;
  fulltext?: string;
  classicalText?: string;
  modernTranslation?: string;
}): string {
  let text = `${event.title}。发生于${event.yearDisplay}，${event.dynasty}时期。`;
  text += event.description;
  if (event.fulltext) {
    text += `。${event.fulltext}`;
  }
  if (event.classicalText && event.modernTranslation) {
    text += `。史书记载：${event.modernTranslation}`;
  }
  return text;
}
