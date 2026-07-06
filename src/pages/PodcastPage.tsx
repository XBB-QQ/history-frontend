import { useState, useRef, useEffect } from 'react';
import { PODCAST_EPISODES, CATEGORY_ICON } from '@/data/features/podcastList';
import { speakText, stopSpeaking, isVoiceSupported } from '@/features/voiceHistorian';
import type { PodcastEpisode } from '@/data/features/podcastList';
import { useT } from '@/i18n/i18n';

export default function PodcastPage() {
  const t = useT();
  const [selectedId, setSelectedId] = useState<string>(PODCAST_EPISODES[0].id);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('00:00');

  const episode = PODCAST_EPISODES.find(e => e.id === selectedId)!;
  const totalSeconds = 180; // 约3分钟

  const handlePlay = () => {
    if (playing) {
      stopSpeaking();
      setPlaying(false);
      setProgress(0);
      return;
    }

    const success = speakText(episode.narrationText, 'storyteller', () => {
      setPlaying(false);
      setProgress(0);
      setCurrentTime('00:00');
    }, (charIndex) => {
      const pct = charIndex / episode.narrationText.length;
      setProgress(pct);
      const elapsed = Math.floor(pct * totalSeconds);
      const mm = String(Math.floor(elapsed / 60)).padStart(2, '0');
      const ss = String(elapsed % 60).padStart(2, '0');
      setCurrentTime(`${mm}:${ss}`);
    });

    if (success) setPlaying(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rice to-stone-100 dark:from-ink-950 dark:to-ink-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 标题 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-ink-900 dark:text-ink-100 font-serif">
            {t('podcast.title')}
          </h1>
          <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">
            {t('podcast.subtitle')}
          </p>
        </div>

        {/* 节目单 */}
        <div className="space-y-3 mb-8">
          {PODCAST_EPISODES.map(ep => (
            <button
              key={ep.id}
              onClick={() => { setSelectedId(ep.id); if (playing) { stopSpeaking(); setPlaying(false); } }}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                selectedId === ep.id
                  ? 'border-accent bg-accent/10 dark:bg-accent/5'
                  : 'border-ink-200 dark:border-ink-700 hover:border-accent/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{CATEGORY_ICON[ep.category]}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-ink-800 dark:text-ink-200">{ep.title}</span>
                    <span className="text-xs text-ink-400">{ep.dynasty} · {ep.yearDisplay}</span>
                  </div>
                  <p className="text-xs text-ink-500 dark:text-ink-400">{ep.summary.slice(0, 60)}...</p>
                </div>
                <span className="text-xs text-ink-400">{ep.duration}</span>
              </div>
            </button>
          ))}
        </div>

        {/* 当前节目详情 */}
        <div className="p-6 rounded-xl border-2 border-accent/30 bg-accent/10 dark:bg-accent/5">
          {/* 标题区 */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">{CATEGORY_ICON[episode.category]}</span>
            <h2 className="text-xl font-serif font-bold text-ink-900 dark:text-ink-100">
              {episode.title}
            </h2>
            <span className="text-sm text-ink-400">{episode.dynasty} · {episode.yearDisplay}</span>
          </div>

          {/* 概述 */}
          <p className="text-sm text-ink-600 dark:text-ink-400 leading-relaxed mb-6">
            {episode.summary}
          </p>

          {/* 播放器 */}
          {isVoiceSupported() ? (
            <div className="p-4 rounded-xl border border-ink-200 dark:border-ink-700 bg-ink-50/30 dark:bg-ink-800/20">
              {/* 进度条 */}
              <div className="flex items-center gap-3 mb-4">
                <button
                  onClick={handlePlay}
                  className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center text-lg hover:shadow-lg transition-all"
                >
                  {playing ? t('podcast.stop') : t('podcast.play')}
                </button>
                <div className="flex-1">
                  <div className="w-full h-2 rounded-full bg-ink-200 dark:bg-ink-700">
                    <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${progress * 100}%` }} />
                  </div>
                </div>
                <span className="text-xs text-ink-400 w-12">{currentTime}</span>
                <span className="text-xs text-ink-400">{episode.duration}</span>
              </div>

              {/* 章节标记 */}
              <div className="flex flex-wrap gap-2">
                {episode.chapters.map((ch, i) => (
                  <span key={i} className="px-2 py-1 rounded-lg text-xs font-bold bg-ink-100 dark:bg-ink-700 text-ink-600 dark:text-ink-400">
                    {ch.startTime} {ch.title}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-sm text-ink-400 text-center">
              {t('podcast.voice_unsupported')}
            </div>
          )}

          {/* 全文阅读 */}
          <div className="mt-6 p-4 rounded-xl border border-ink-200 dark:border-ink-700 bg-ink-50/30 dark:bg-ink-800/20">
            <h3 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-3">{t('podcast.full_text')}</h3>
            <p className="text-sm text-ink-600 dark:text-ink-400 leading-relaxed">
              {episode.narrationText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
