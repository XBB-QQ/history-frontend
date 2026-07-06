/**
 * 听书 × 看剧 × 史馆三联页面
 * 朝代选择 + 三栏布局（听书章节 + 历史剧 + 史馆链接）+ 勘误面板
 * @see ITERATIONS.md #86
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getMediaBundleByDynasty,
  getDynastiesWithDramas,
  getDramasByDynasty,
  type DramaMapping,
  type FactCheckSummary,
} from '@/data/media/dramaMapping';
import { getChaptersByDynasty } from '@/data/media/audiobookChapters';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import { useT } from '@/i18n/i18n';

/** 优先级标签颜色 */
const PRIORITY_COLORS: Record<DramaMapping['priority'], string> = {
  essential: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-300 dark:border-red-700',
  recommended: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-700',
  optional: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600',
};

/** 星级渲染 */
function Stars({ rating }: { rating: number }) {
  const t = useT();
  const full = Math.floor(rating / 2);
  const half = rating % 2 >= 1 ? 1 : 0;
  return (
    <span className="text-amber-500 text-sm" title={`${rating} ${t('mediaBridge.rating')}`}>
      {'★'.repeat(full)}{half ? '☆' : ''}{rating.toFixed(1)}
    </span>
  );
}

/** 听书章节卡片 */
function ChapterCard({ chapter }: { chapter: ReturnType<typeof getChaptersByDynasty>[0] }) {
  const t = useT();
  return (
    <div className="bg-white dark:bg-ink-900 rounded-xl border border-ink-200 dark:border-ink-700 p-4 hover:border-accent dark:hover:border-accent transition-colors">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">🎧</span>
        <h4 className="font-bold text-sm text-ink-900 dark:text-ink-100">{chapter.title}</h4>
        <span className="text-xs text-ink-400 ml-auto">{t('mediaBridge.minutes', { count: chapter.durationMin })}</span>
      </div>
      <div className="flex flex-wrap gap-1 mb-2">
        {chapter.keyEvents.map((e) => (
          <span key={e} className="text-xs px-1.5 py-0.5 bg-accent/10 text-accent rounded">
            {e}
          </span>
        ))}
      </div>
      <div className="text-xs text-ink-500 dark:text-ink-400">
        {t('mediaBridge.figures_label')}：{chapter.keyFigures.slice(0, 4).join('、')}
      </div>
    </div>
  );
}

/** 剧集卡片 */
function DramaCard({ drama }: { drama: DramaMapping }) {
  const t = useT();
  const [showFactCheck, setShowFactCheck] = useState(false);

  return (
    <div className="bg-white dark:bg-ink-900 rounded-xl border border-ink-200 dark:border-ink-700 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex items-start gap-2 mb-2">
          <span className="text-lg">🎬</span>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-sm text-ink-900 dark:text-ink-100 truncate">{drama.title}</h4>
            <div className="flex items-center gap-2 text-xs text-ink-400">
              <span>{drama.year}</span>
              <span>·</span>
              <span>{t('mediaBridge.years', { count: drama.episodes })}</span>
              <span>·</span>
              <Stars rating={drama.doubanRating} />
            </div>
          </div>
        </div>

        {/* 优先级标签 */}
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-xs px-2 py-0.5 rounded-full border ${PRIORITY_COLORS[drama.priority]}`}>
            {t(drama.priority === 'essential' ? 'mediaBridge.essential' : drama.priority === 'recommended' ? 'mediaBridge.recommended' : 'mediaBridge.optional')}
          </span>
        </div>

        {/* 主演 */}
        {drama.cast.length > 0 && (
          <p className="text-xs text-ink-500 dark:text-ink-400 mb-2">
            {t('mediaBridge.starring_label')}：{drama.cast.join('、')}
          </p>
        )}

        {/* 看点 */}
        <div className="flex flex-wrap gap-1 mb-2">
          {drama.highlights.slice(0, 2).map((h) => (
            <span key={h} className="text-xs px-1.5 py-0.5 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded">
              {h}
            </span>
          ))}
        </div>

        {/* 勘误开关 */}
        {drama.factCheckSummaries.length > 0 && (
          <button
            onClick={() => setShowFactCheck(!showFactCheck)}
            className="text-xs text-red-500 dark:text-red-400 hover:underline flex items-center gap-1"
          >
            📋 {t('mediaBridge.fact_check_count', { count: drama.factCheckSummaries.length })}{' '}
            <span className={`transition-transform ${showFactCheck ? 'rotate-90' : ''}`}>▶</span>
          </button>
        )}

        {/* 勘误详情 */}
        {showFactCheck && drama.factCheckSummaries.length > 0 && (
          <div className="mt-2 space-y-2">
            {drama.factCheckSummaries.map((fc, idx) => (
              <FactCheckCard key={idx} factCheck={fc} />
            ))}
          </div>
        )}

        {/* 史馆链接 */}
        <div className="mt-3 pt-3 border-t border-ink-100 dark:border-ink-800">
          <div className="text-xs text-ink-400 mb-1">{t('mediaBridge.related_pages')}：</div>
          <div className="flex flex-wrap gap-1">
            {drama.matchedEventUids.length > 0 && (
              <Link to="/timeline" className="text-xs px-2 py-0.5 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                📜 {t('mediaBridge.timeline')}
              </Link>
            )}
            {drama.matchedPersonUids.length > 0 && (
              <Link to="/persons" className="text-xs px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                👤 {t('mediaBridge.persons')}
              </Link>
            )}
            <Link to="/knowledge" className="text-xs px-2 py-0.5 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
              💡 {t('mediaBridge.knowledge')}
            </Link>
            <Link to="/multi-perspective" className="text-xs px-2 py-0.5 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 rounded hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors">
              🎭 {t('mediaBridge.perspective')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/** 勘误卡片 */
function FactCheckCard({ factCheck }: { factCheck: FactCheckSummary }) {
  const t = useT();

  return (
    <div className="bg-ink-50 dark:bg-ink-800/50 rounded-lg p-3 border border-ink-200 dark:border-ink-700">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs font-bold text-red-600 dark:text-red-400">
          {factCheck.nature === 'fiction' ? `✕ ${t('mediaBridge.fiction')}` :
           factCheck.nature === 'exaggeration' ? `⚠ ${t('mediaBridge.exaggeration')}` :
           factCheck.nature === 'inversion' ? `↔ ${t('mediaBridge.inversion')}` :
           `… ${t('mediaBridge.omission')}`}
        </span>
      </div>
      <div className="text-xs space-y-1">
        <div><span className="text-ink-500">{t('mediaBridge.drama_claim')}：</span><span className="text-ink-700 dark:text-ink-300">{factCheck.dramaClaim}</span></div>
        <div><span className="text-ink-500">{t('mediaBridge.historical_fact')}：</span><span className="text-green-700 dark:text-green-400">{factCheck.historicalFact}</span></div>
        <div className="text-ink-400 dark:text-ink-500 italic">{factCheck.explanation}</div>
      </div>
    </div>
  );
}

/** 史馆快捷入口 */
function KnowledgeHubLinks({ dynasty }: { dynasty: string }) {
  const t = useT();
  const links = [
    { labelKey: 'mediaBridge.timeline', path: '/timeline', emoji: '📜', descKey: 'mediaBridge.dynasty_chronology' },
    { labelKey: 'mediaBridge.persons_hub', path: '/persons', emoji: '👤', descKey: 'mediaBridge.dynasty_figures' },
    { labelKey: 'mediaBridge.knowledge', path: '/knowledge', emoji: '💡', descKey: 'mediaBridge.dynasty_knowledge' },
    { labelKey: 'mediaBridge.territory', path: '/territory', emoji: '🗺️', descKey: 'mediaBridge.dynasty_territory' },
    { labelKey: 'mediaBridge.battle', path: '/battle', emoji: '⚔️', descKey: 'mediaBridge.dynasty_battle' },
    { labelKey: 'mediaBridge.perspective', path: '/multi-perspective', emoji: '🎭', descKey: 'mediaBridge.dynasty_perspective' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {links.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className="flex items-center gap-2 p-2 rounded-lg bg-white dark:bg-ink-900 border border-ink-200 dark:border-ink-700 hover:border-accent transition-colors text-center"
        >
          <span className="text-lg">{link.emoji}</span>
          <div className="text-left min-w-0">
            <div className="text-xs font-bold text-ink-900 dark:text-ink-100 truncate">{t(link.labelKey)}</div>
            <div className="text-xs text-ink-400 truncate">{t(link.descKey, { dynasty })}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default function MediaBridgePage() {
  const t = useT();
  const dynasties = getDynastiesWithDramas();
  const [selectedDynasty, setSelectedDynasty] = useState(dynasties[0] || '');

  const bundle = selectedDynasty ? getMediaBundleByDynasty(selectedDynasty) : null;
  const dramas = selectedDynasty ? getDramasByDynasty(selectedDynasty) : [];
  const chapters = selectedDynasty ? getChaptersByDynasty(selectedDynasty) : [];

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* 页面标题 */}
        <RevealOnScroll>
          <SectionHeader
            label={t('mediaBridge.section_label')}
            title={t('mediaBridge.title')}
            description={t('mediaBridge.subtitle')}
          />
        </RevealOnScroll>

        {/* 朝代选择 */}
        <RevealOnScroll>
          <div className="flex flex-wrap gap-2 mb-6">
            {dynasties.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDynasty(d)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  selectedDynasty === d
                    ? 'bg-accent text-white shadow-lg'
                    : 'bg-white dark:bg-ink-900 text-ink-600 dark:text-ink-400 border border-ink-200 dark:border-ink-700 hover:border-accent'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </RevealOnScroll>

        {bundle && (
          <>
            {/* 三联布局 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* 左栏：听书 */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">🎧</span>
                  <h3 className="font-bold text-ink-900 dark:text-ink-100">{t('mediaBridge.listening')}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent">
                    {t('mediaBridge.chapters', { count: chapters.length })}
                  </span>
                </div>
                {chapters.length > 0 ? (
                  <div className="space-y-3">
                    {chapters.map((ch) => (
                      <ChapterCard key={ch.id} chapter={ch} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-ink-400">
                    <p className="text-3xl mb-2">🎧</p>
                    <p className="text-sm">{t('mediaBridge.no_chapter_data')}</p>
                  </div>
                )}
              </div>

              {/* 中栏：影视 */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">🎬</span>
                  <h3 className="font-bold text-ink-900 dark:text-ink-100">{t('mediaBridge.drama')}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                    {t('mediaBridge.dramas', { count: dramas.length })}
                  </span>
                </div>
                {dramas.length > 0 ? (
                  <div className="space-y-3">
                    {dramas.map((drama) => (
                      <DramaCard key={drama.id} drama={drama} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-ink-400">
                    <p className="text-3xl mb-2">🎬</p>
                    <p className="text-sm">{t('mediaBridge.no_drama_data')}</p>
                  </div>
                )}
              </div>

              {/* 右栏：史馆入口 */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">📚</span>
                  <h3 className="font-bold text-ink-900 dark:text-ink-100">{t('mediaBridge.museum')}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                    {t('mediaBridge.quick_entry')}
                  </span>
                </div>
                <KnowledgeHubLinks dynasty={selectedDynasty} />

                {/* 推荐观看顺序 */}
                <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-200 dark:border-amber-700">
                  <h4 className="font-bold text-sm text-ink-900 dark:text-ink-100 mb-2">
                    🎯 {t('mediaBridge.watch_order')}
                  </h4>
                  <ol className="space-y-1">
                    {dramas
                      .filter((d) => d.priority === 'essential')
                      .slice(0, 5)
                      .map((drama, idx) => (
                        <li key={drama.id} className="text-xs text-ink-600 dark:text-ink-400 flex items-start gap-2">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-accent/20 text-accent text-center leading-5 text-xs font-bold">
                            {idx + 1}
                          </span>
                          <span>
                            <span className="font-bold text-ink-900 dark:text-ink-100">{drama.title}</span>
                            <span className="text-ink-400 ml-1">{drama.doubanRating}{t('mediaBridge.rating')}</span>
                          </span>
                        </li>
                      ))}
                  </ol>
                </div>
              </div>
            </div>

            {/* 综合勘误汇总 */}
            {dramas.some((d) => d.factCheckSummaries.length > 0) && (
              <RevealOnScroll>
                <div className="mb-8">
                  <h3 className="font-bold text-lg text-ink-900 dark:text-ink-100 mb-4 flex items-center gap-2">
                    <span className="text-xl">📋</span>
                    {t('mediaBridge.fact_check_summary')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {dramas
                      .filter((d) => d.factCheckSummaries.length > 0)
                      .flatMap((drama) =>
                        drama.factCheckSummaries.map((fc, idx) => (
                          <FactCheckCard key={`${drama.id}-${idx}`} factCheck={fc} />
                        ))
                      )}
                  </div>
                </div>
              </RevealOnScroll>
            )}
          </>
        )}
      </div>
    </div>
  );
}
