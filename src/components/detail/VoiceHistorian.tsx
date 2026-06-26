import { useState, useCallback } from 'react';
import {
  speakText,
  stopSpeaking,
  pauseSpeaking,
  resumeSpeaking,
  isSpeaking,
  isVoiceSupported,
  VoiceStyle,
  VOICE_STYLES,
  buildEventNarration,
} from '@/utils/voiceHistorian';

interface VoiceHistorianProps {
  event: {
    title: string;
    yearDisplay: string;
    dynasty: string;
    description: string;
    fulltext?: string;
    classicalText?: string;
    modernTranslation?: string;
  };
}

export default function VoiceHistorian({ event }: VoiceHistorianProps) {
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const [style, setStyle] = useState<VoiceStyle>('scholar');
  const [progress, setProgress] = useState(0);

  if (!isVoiceSupported()) {
    return (
      <div className="text-xs text-ink-400 dark:text-ink-500 italic">
        当前浏览器不支持语音朗读
      </div>
    );
  }

  const handlePlay = useCallback(() => {
    if (playing && !paused) {
      pauseSpeaking();
      setPaused(true);
      return;
    }
    if (paused) {
      resumeSpeaking();
      setPaused(false);
      return;
    }

    const text = buildEventNarration(event);
    const success = speakText(text, style, () => {
      setPlaying(false);
      setPaused(false);
      setProgress(0);
    }, (charIndex) => {
      setProgress(charIndex / text.length);
    });

    if (success) setPlaying(true);
  }, [event, style, playing, paused]);

  const handleStop = useCallback(() => {
    stopSpeaking();
    setPlaying(false);
    setPaused(false);
    setProgress(0);
  }, []);

  return (
    <div className="rounded-xl border border-ink-200 dark:border-ink-700 bg-gradient-to-br from-amber-50/50 to-stone-50/50 dark:from-ink-800/50 dark:to-ink-900/50 p-4">
      {/* 标题栏 */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-sm font-bold text-ink-700 dark:text-ink-300">
          <span aria-hidden>录</span>
          <span>语音史官</span>
          <span className="text-xs text-ink-400">— {VOICE_STYLES[style].label}风格</span>
        </div>
        {/* 进度条 */}
        {playing && (
          <div className="w-24 h-1.5 rounded-full bg-ink-200 dark:bg-ink-700 overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all"
              style={{ width: `${Math.min(progress * 100, 100)}%` }}
            />
          </div>
        )}
      </div>

      {/* 风格选择 */}
      <div className="flex gap-2 mb-3">
        {(Object.entries(VOICE_STYLES) as [VoiceStyle, typeof VOICE_STYLES[VoiceStyle]][]).map(
          ([key, cfg]) => (
            <button
              key={key}
              onClick={() => {
                if (playing) handleStop();
                setStyle(key);
              }}
              className={`flex-1 px-3 py-2 rounded-lg text-xs font-bold transition-all border ${
                style === key
                  ? 'bg-accent text-white border-accent'
                  : 'bg-ink-50 dark:bg-ink-800 text-ink-600 dark:text-ink-400 border-ink-200 dark:border-ink-700 hover:bg-ink-100 dark:hover:bg-ink-700'
              }`}
            >
              <span className="mr-1">{cfg.icon}</span>
              {cfg.label}
            </button>
          ),
        )}
      </div>

      {/* 控制按钮 */}
      <div className="flex gap-3">
        <button
          onClick={handlePlay}
          className="px-5 py-2 rounded-lg bg-accent text-white font-bold hover:shadow-lg transition-all flex items-center gap-2"
        >
          {playing && !paused ? (
            <>
              <span aria-hidden>停</span>
              暂停
            </>
          ) : paused ? (
            <>
              <span aria-hidden>播</span>
              继续
            </>
          ) : (
            <>
              <span aria-hidden>录</span>
              开始朗读
            </>
          )}
        </button>
        {playing && (
          <button
            onClick={handleStop}
            className="px-4 py-2 rounded-lg border border-ink-200 dark:border-ink-700 text-ink-600 dark:text-ink-400 font-bold hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors"
          >
            止 停止
          </button>
        )}
      </div>

      {/* 提示 */}
      <p className="mt-2 text-xs text-ink-400 dark:text-ink-500">
        {VOICE_STYLES[style].description}
      </p>
    </div>
  );
}
