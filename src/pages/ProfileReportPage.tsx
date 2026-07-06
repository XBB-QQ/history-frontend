/**
 * 历史画像报告页面
 * 基于用户行为生成个性化历史人物画像
 * @see history-museum/design/000-future-roadmap.md §方向五 §5.2
 */

import { useMemo, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useUserStore } from '@/store/userStore';
import { useFavoriteStore } from '@/store/favoriteStore';
import { computeProfile } from '@/features/profileReport';
import { generateGeneReportStream } from '@/features/geneReport';
import {
  PERSONALITY_MATCHES,
  DIMENSION_LABELS,
  DIMENSION_DESCRIPTIONS,
  NEWCOMER_PERSONALITY,
  type PersonalityMatch,
} from '@/data/core/personalityMatches';
import DimensionRadar from '@/components/profile/DimensionRadar';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import { useT } from '@/i18n/i18n';

/** 渲染基因检测报告 — 解析【】标题，其余按段落显示 */
function renderGeneReport(text: string) {
  const lines = text.split('\n');
  const blocks: JSX.Element[] = [];
  lines.forEach((line, i) => {
    const trimmed = line.trim();
    if (!trimmed) return;
    const titleMatch = trimmed.match(/^【(.+)】$/);
    if (titleMatch) {
      blocks.push(<h4 key={i} className="text-base font-bold text-accent mt-4 mb-2">{titleMatch[1]}</h4>);
    } else {
      blocks.push(<p key={i} className="text-sm text-ink-700 dark:text-ink-300 leading-loose mb-2">{trimmed}</p>);
    }
  });
  return blocks;
}

function ProfileReportPage() {
  const t = useT();
  const user = useUserStore((s) => s.user);
  const isAuthenticated = useUserStore((s) => s.isAuthenticated);
  const favorites = useFavoriteStore((s) => s.favorites);

  const report = useMemo(
    () => computeProfile(user, favorites),
    [user, favorites]
  );

  // 匹配的历史人物
  const matchedPersonality: PersonalityMatch = report.hasData
    ? PERSONALITY_MATCHES[report.dominantDimension][0]
    : NEWCOMER_PERSONALITY;

  // 基因检测报告状态
  const [geneReport, setGeneReport] = useState('');
  const [generating, setGenerating] = useState(false);
  const [geneError, setGeneError] = useState('');
  const reportRef = useRef<HTMLDivElement>(null);

  const handleGenerateGene = useCallback(async () => {
    if (!report.hasData) return;
    setGenerating(true);
    setGeneError('');
    setGeneReport('');
    try {
      await generateGeneReportStream(
        {
          profile: report,
          matched: matchedPersonality,
          username: user?.nickname || user?.username || t('profileReport.default_username'),
          favoritesCount: favorites.length,
        },
        (chunk) => {
          setGeneReport((prev) => prev + chunk);
          reportRef.current?.scrollIntoView({ behavior: 'smooth' });
        },
      );
    } catch (e) {
      setGeneError(e instanceof Error ? e.message : t('profileReport.generation_failed'));
    } finally {
      setGenerating(false);
    }
  }, [report, matchedPersonality, user, favorites.length, t]);


  // 生成日期
  const today = new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <RevealOnScroll direction="fade">
          <SectionHeader
            label="PROFILE REPORT"
            title={t('profileReport.title')}
            description={t('profileReport.description')}
          />
        </RevealOnScroll>

        {!isAuthenticated ? (
          /* 未登录提示 */
          <RevealOnScroll direction="up" delay={200}>
            <div className="mt-8 p-8 bg-white/60 dark:bg-ink-900/60 rounded-xl border border-ink-200 dark:border-ink-700 text-center">
              <div className="text-5xl mb-3">{NEWCOMER_PERSONALITY.emoji}</div>
              <h3 className="text-xl font-bold text-ink-900 dark:text-ink-100 mb-2">
                {NEWCOMER_PERSONALITY.name}
              </h3>
              <p className="text-ink-500 dark:text-ink-400 mb-4 italic">
                "{NEWCOMER_PERSONALITY.quote}"
              </p>
              <p className="text-ink-700 dark:text-ink-300 mb-6">
                {NEWCOMER_PERSONALITY.description}
              </p>
              <div className="flex gap-3 justify-center">
                <Link to="/login" className="btn-primary">
                  {t('profileReport.login_cta')}
                </Link>
                <Link to="/register" className="btn-secondary">
                  {t('profileReport.register_cta')}
                </Link>
              </div>
            </div>
          </RevealOnScroll>
        ) : (
          <>
            {/* 报告头部 */}
            <RevealOnScroll direction="up" delay={200}>
              <div className="mt-8 p-6 bg-gradient-to-br from-accent/5 to-amber-500/5 dark:from-accent/10 dark:to-amber-700/10 rounded-xl border border-accent/20">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div>
                    <div className="text-xs text-ink-500 dark:text-ink-400 mb-1">
                      {t('profileReport.generated_at', { date: today })}
                    </div>
                    <h2 className="text-2xl font-bold text-ink-900 dark:text-ink-100">
                      {user?.nickname || user?.username || t('profileReport.default_username')} ·{' '}
                      <span className="text-accent">{report.level}</span>
                    </h2>
                    <p className="text-sm text-ink-600 dark:text-ink-400 mt-1">
                      {t('profileReport.profile_score_label')}
                      <span className="font-bold text-accent ml-1">
                        {report.totalScore}
                      </span>
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-ink-500 dark:text-ink-400">
                      {t('profileReport.collected_label')}
                    </div>
                    <div className="text-2xl font-bold text-ink-900 dark:text-ink-100">
                      {report.matchCount}
                    </div>
                    <div className="text-xs text-ink-500 dark:text-ink-400">
                      {t('profileReport.footprints_label')}
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            {/* 雷达图 + 匹配人物 */}
            <div className="mt-6 grid md:grid-cols-2 gap-6">
              {/* 维度雷达图 */}
              <RevealOnScroll direction="right" delay={300}>
                <div className="p-6 bg-white/60 dark:bg-ink-900/60 rounded-xl border border-ink-200 dark:border-ink-700 h-full">
                  <h3 className="font-bold text-ink-900 dark:text-ink-100 mb-4 text-center">
                    {t('profileReport.four_dim_title')}
                  </h3>
                  <DimensionRadar dimensions={report.dimensions} size={260} />
                  <div className="mt-4 space-y-2 text-sm">
                    {report.dimensions.map((d) => (
                      <div
                        key={d.key}
                        className="flex items-center justify-between"
                      >
                        <span className="text-ink-600 dark:text-ink-400">
                          {DIMENSION_LABELS[d.key]}
                        </span>
                        <div className="flex items-center gap-2 flex-1 mx-3">
                          <div className="flex-1 h-2 bg-ink-100 dark:bg-ink-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-accent rounded-full transition-all"
                              style={{ width: `${d.normalized}%` }}
                            />
                          </div>
                        </div>
                        <span className="font-bold text-ink-900 dark:text-ink-100 w-10 text-right">
                          {d.normalized}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>

              {/* 匹配人物 */}
              <RevealOnScroll direction="left" delay={400}>
                <div className="p-6 bg-gradient-to-br from-accent/5 to-amber-500/5 dark:from-accent/10 dark:to-amber-700/10 rounded-xl border border-accent/30 h-full flex flex-col">
                  <div className="text-xs text-accent tracking-widest text-center mb-2">
                    {t('profileReport.match_title')}
                  </div>
                  <div className="text-6xl text-center mb-3">
                    {matchedPersonality.emoji}
                  </div>
                  <h3 className="text-2xl font-bold text-center text-ink-900 dark:text-ink-100">
                    {matchedPersonality.name}
                  </h3>
                  <div className="text-sm text-center text-ink-500 dark:text-ink-400 mt-1">
                    {matchedPersonality.dynasty} · {matchedPersonality.role}
                  </div>
                  <div className="mt-4 p-3 bg-white/50 dark:bg-ink-900/50 rounded-lg border-l-4 border-accent">
                    <p className="text-sm italic text-ink-700 dark:text-ink-300 text-center">
                      "{matchedPersonality.quote}"
                    </p>
                  </div>
                  <p className="mt-4 text-sm text-ink-700 dark:text-ink-300 leading-relaxed flex-1">
                    {matchedPersonality.description}
                  </p>
                  <div className="mt-4 pt-4 border-t border-accent/20">
                    <div className="text-xs text-ink-500 dark:text-ink-400 mb-1">
                      {t('profileReport.dominant_dim_label', { name: DIMENSION_LABELS[report.dominantDimension] })}
                    </div>
                    <div className="text-xs text-ink-600 dark:text-ink-400">
                      {DIMENSION_DESCRIPTIONS[report.dominantDimension]}
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            </div>

            {/* 同维其他匹配 */}
            <RevealOnScroll direction="up" delay={500}>
              <div className="mt-6 p-6 bg-white/60 dark:bg-ink-900/60 rounded-xl border border-ink-200 dark:border-ink-700">
                <h3 className="font-bold text-ink-900 dark:text-ink-100 mb-4">
                  {t('profileReport.same_dim_title')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {PERSONALITY_MATCHES[report.dominantDimension]
                    .slice(1)
                    .map((p) => (
                      <div
                        key={p.name}
                        className="p-3 bg-ink-50/50 dark:bg-ink-800/50 rounded-lg text-center"
                      >
                        <div className="text-2xl mb-1">{p.emoji}</div>
                        <div className="font-bold text-ink-900 dark:text-ink-100">
                          {p.name}
                        </div>
                        <div className="text-xs text-ink-500 dark:text-ink-400">
                          {p.dynasty} · {p.role}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </RevealOnScroll>

            {/* 数据统计 */}
            <RevealOnScroll direction="up" delay={600}>
              <div className="mt-6 p-6 bg-white/60 dark:bg-ink-900/60 rounded-xl border border-ink-200 dark:border-ink-700">
                <h3 className="font-bold text-ink-900 dark:text-ink-100 mb-4">
                  {t('profileReport.footprint_title')}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-accent">
                      {user?.score ?? 0}
                    </div>
                    <div className="text-xs text-ink-500 dark:text-ink-400 mt-1">
                      {t('profileReport.stat_score')}
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-accent">
                      {user?.quizzesAnswered ?? 0}
                    </div>
                    <div className="text-xs text-ink-500 dark:text-ink-400 mt-1">
                      {t('profileReport.stat_quizzes')}
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-accent">
                      {user?.quizzesCorrect ?? 0}
                    </div>
                    <div className="text-xs text-ink-500 dark:text-ink-400 mt-1">
                      {t('profileReport.stat_correct')}
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-accent">
                      {favorites.length}
                    </div>
                    <div className="text-xs text-ink-500 dark:text-ink-400 mt-1">
                      {t('profileReport.stat_favorites')}
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            {/* {t('profileReport.gene_report_title')} */}
            <RevealOnScroll direction="up" delay={700}>
              <div ref={reportRef} className="mt-6 p-6 bg-gradient-to-br from-accent/5 via-purple-500/5 to-amber-500/5 dark:from-accent/10 dark:via-purple-700/10 dark:to-amber-700/10 rounded-xl border border-accent/30">
                <div className="flex items-center gap-3 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-ink-900 dark:text-ink-100">
                      {t('profileReport.gene_report_title')}
                    </h3>
                    <p className="text-xs text-ink-500 dark:text-ink-400">
                      {t('profileReport.gene_report_desc')}
                    </p>
                  </div>
                </div>

                {!geneReport && !generating && (
                  <button
                    onClick={handleGenerateGene}
                    disabled={!report.hasData}
                    className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-accent to-purple-600 text-white font-bold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {report.hasData ? t('profileReport.gene_start') : t('profileReport.gene_need_data')}
                  </button>
                )}

                {generating && (
                  <div className="text-center py-4">
                    <div className="inline-block w-8 h-8 border-3 border-accent border-t-transparent rounded-full animate-spin mb-2" />
                    <div className="text-sm text-ink-500 dark:text-ink-400">{t('profileReport.gene_sequencing')}</div>
                  </div>
                )}

                {geneError && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 text-sm text-red-700 dark:text-red-400">
                    {geneError}
                  </div>
                )}

                {geneReport && (
                  <div className="mt-4 p-4 bg-white/70 dark:bg-ink-900/70 rounded-lg border border-ink-200 dark:border-ink-700">
                    {renderGeneReport(geneReport)}
                    {generating && (
                      <span className="inline-block w-2 h-5 bg-accent animate-pulse ml-1" />
                    )}
                    {!generating && (
                      <div className="mt-4 pt-4 border-t border-ink-200 dark:border-ink-700 flex gap-3 flex-wrap">
                        <button
                          onClick={handleGenerateGene}
                          className="text-xs px-3 py-1.5 rounded-full bg-accent/10 text-accent hover:bg-accent hover:text-white transition-all"
                        >
                          🔄 {t('profileReport.gene_regenerate')}
                        </button>
                        <button
                          onClick={() => {
                            navigator.clipboard?.writeText(geneReport);
                          }}
                          className="text-xs px-3 py-1.5 rounded-full bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-400 hover:bg-ink-200 dark:hover:bg-ink-700 transition-all"
                        >
                          📋 {t('profileReport.gene_copy')}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </RevealOnScroll>

            {/* 底部 CTA */}
            <RevealOnScroll direction="fade" delay={700}>
              <div className="mt-8 text-center">
                <Link to="/" className="btn-secondary mr-3">
                  {t('common.back_home')}
                </Link>
                <Link to="/profile" className="btn-secondary">
                  {t('profileReport.profile_center')}
                </Link>
              </div>
            </RevealOnScroll>
          </>
        )}
      </div>
    </div>
  );
}

export default ProfileReportPage;
