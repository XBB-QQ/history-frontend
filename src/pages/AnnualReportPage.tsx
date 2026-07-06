/**
 * 我的史馆年度报告
 * @see ITERATIONS.md #103
 *
 * 基于用户画像数据生成年度回顾报告。
 */

import { useState, useMemo } from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import { usePersonaStore } from '@/store/personaStore';
import { useFavoriteStore } from '@/store/favoriteStore';
import { useT } from '@/i18n/i18n';

/* ─── 年度报告数据 ─── */
interface ReportData {
  year: number;
  totalVisits: number;
  topDynasty: string;
  topPerson: string;
  quizAccuracy: number;
  debateCount: number;
  simulationCount: number;
  favoriteCount: number;
  browseSummary: {
    eventsViewed: number;
    personsViewed: number;
    dynastiesViewed: number;
    knowledgeViewed: number;
    topicsRead: number;
  };
  dimensions: {
    governance: number;
    military: number;
    wisdom: number;
    charisma: number;
  };
  matchedFigure: string;
  badges: Badge[];
}

interface Badge {
  id: string;
  nameKey: string;
  emoji: string;
  descKey: string;
  earned: boolean;
}

/* ─── 徽章定义 ─── */
const BADGE_DEFINITIONS: Omit<Badge, 'earned'>[] = [
  { id: 'scholar', nameKey: 'annualReport.badgeScholar', emoji: '📚', descKey: 'annualReport.badgeScholarDesc' },
  { id: 'explorer', nameKey: 'annualReport.badgeExplorer', emoji: '🗺️', descKey: 'annualReport.badgeExplorerDesc' },
  { id: 'debater', nameKey: 'annualReport.badgeDebater', emoji: '🎤', descKey: 'annualReport.badgeDebaterDesc' },
  { id: 'simulator', nameKey: 'annualReport.badgeSimulator', emoji: '🎲', descKey: 'annualReport.badgeSimulatorDesc' },
  { id: 'quizmaster', nameKey: 'annualReport.badgeQuizmaster', emoji: '🏅', descKey: 'annualReport.badgeQuizmasterDesc' },
  { id: 'collector', nameKey: 'annualReport.badgeCollector', emoji: '💎', descKey: 'annualReport.badgeCollectorDesc' },
  { id: 'reader', nameKey: 'annualReport.badgeReader', emoji: '📖', descKey: 'annualReport.badgeReaderDesc' },
  { id: 'historian', nameKey: 'annualReport.badgeHistorian', emoji: '🏛️', descKey: 'annualReport.badgeHistorianDesc' },
];

/* ─── 环形进度条 ─── */
function CircularProgress({ value, size = 120, strokeWidth = 8, color = '#F97316' }: {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-ink-200 dark:text-ink-700"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000"
        />
      </svg>
      <span className="absolute text-lg font-bold text-ink-900 dark:text-ink-100">{value}%</span>
    </div>
  );
}

/* ─── 维度雷达图（简化版条形图） ─── */
function DimensionBars({ dimensions }: { dimensions: ReportData['dimensions'] }) {
  const t = useT();
  const dims = [
    { key: 'governance' as const, labelKey: 'annualReport.dimGovernance', emoji: '📜' },
    { key: 'military' as const, labelKey: 'annualReport.dimMilitary', emoji: '⚔️' },
    { key: 'wisdom' as const, labelKey: 'annualReport.dimWisdom', emoji: '🧠' },
    { key: 'charisma' as const, labelKey: 'annualReport.dimCharisma', emoji: '🎭' },
  ];

  return (
    <div className="space-y-4">
      {dims.map(d => (
        <div key={d.key}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-bold text-ink-700 dark:text-ink-300">
              {d.emoji} {t(d.labelKey)}
            </span>
            <span className="text-sm font-bold text-accent">{dimensions[d.key]}</span>
          </div>
          <div className="h-3 bg-ink-200 dark:bg-ink-700 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent to-amber-500 transition-all duration-1000"
              style={{ width: `${dimensions[d.key]}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── 主页面 ─── */
export default function AnnualReportPage() {
  const t = useT();
  const [selectedYear] = useState(2025);
  const persona = usePersonaStore.getState().persona;
  const favorites = useFavoriteStore.getState().favorites;

  const report = useMemo<ReportData | null>(() => {
    if (!persona) return null;

    const browse = persona.browseSummary;
    const dims = persona.dimensions;

    // 确定偏好朝代
    const topDynasty = persona.favoriteDynasties[0] || t('annualReport.noDataFallback');
    const topPerson = persona.favoritePersons[0] || t('annualReport.noDataFallback');

    // 计算总浏览
    const totalVisits = browse.eventsViewed + browse.personsViewed + browse.dynastiesViewed + browse.knowledgeViewed + browse.topicsRead;

    // 计算辩论次数
    const debateCount = persona.debateStances.length;
    const simulationCount = persona.simulatorChoices.length;

    // 徽章判定
    const badges: Badge[] = BADGE_DEFINITIONS.map(def => {
      let earned = false;
      switch (def.id) {
        case 'scholar': earned = browse.knowledgeViewed >= 10; break;
        case 'explorer': earned = browse.dynastiesViewed >= 5; break;
        case 'debater': earned = debateCount >= 3; break;
        case 'simulator': earned = simulationCount >= 5; break;
        case 'quizmaster': earned = persona.quizAccuracy >= 80; break;
        case 'collector': earned = favorites.length >= 5; break;
        case 'reader': earned = browse.topicsRead >= 3; break;
        case 'historian': earned = dims.governance >= 50 && dims.military >= 50 && dims.wisdom >= 50 && dims.charisma >= 50; break;
      }
      return { ...def, earned };
    });

    return {
      year: selectedYear,
      totalVisits,
      topDynasty,
      topPerson,
      quizAccuracy: persona.quizAccuracy,
      debateCount,
      simulationCount,
      favoriteCount: favorites.length,
      browseSummary: browse,
      dimensions: dims,
      matchedFigure: persona.matchedFigure || '',
      badges,
    };
  }, [persona, favorites, selectedYear]);

  if (!report) {
    return (
      <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeader
            label="ANNUAL REPORT"
            title={t('annualReport.emptyTitle')}
            description={t('annualReport.emptyDesc')}
          />
          <div className="mt-12 text-6xl mb-4">📊</div>
          <p className="text-ink-500">{t('annualReport.emptyHint')}</p>
        </div>
      </div>
    );
  }

  const earnedBadges = report.badges.filter(b => b.earned);
  const unearnedBadges = report.badges.filter(b => !b.earned);

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 头部 */}
        <RevealOnScroll>
          <SectionHeader
            label="ANNUAL REPORT"
            title={t('annualReport.title')}
            description={t('annualReport.subtitle', { year: report.year })}
          />
        </RevealOnScroll>

        {/* 总览 */}
        <RevealOnScroll delay={100}>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-accent to-amber-500 text-white text-center shadow-lg">
              <div className="text-3xl font-bold">{report.totalVisits}</div>
              <div className="text-sm opacity-90">{t('annualReport.statVisits')}</div>
            </div>
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white text-center shadow-lg">
              <div className="text-3xl font-bold">{report.favoriteCount}</div>
              <div className="text-sm opacity-90">{t('annualReport.statFavorites')}</div>
            </div>
            <div className="p-4 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 text-white text-center shadow-lg">
              <div className="text-3xl font-bold">{report.debateCount}</div>
              <div className="text-sm opacity-90">{t('annualReport.statDebates')}</div>
            </div>
            <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white text-center shadow-lg">
              <div className="text-3xl font-bold">{report.simulationCount}</div>
              <div className="text-sm opacity-90">{t('annualReport.statSimulations')}</div>
            </div>
          </div>
        </RevealOnScroll>

        {/* 偏好分析 */}
        <RevealOnScroll delay={200}>
          <div className="mt-8 bg-white dark:bg-ink-900 rounded-2xl border-2 border-ink-200 dark:border-ink-700 p-6 shadow-lg">
            <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-4">🎯 {t('annualReport.preferenceAnalysis')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center">
                <CircularProgress value={report.quizAccuracy} color="#22C55E" />
                <p className="text-sm text-ink-500 mt-2">{t('annualReport.quizAccuracy')}</p>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-ink-500">{t('annualReport.favoriteDynasty')}：</span>
                  <span className="font-bold text-accent">{report.topDynasty}</span>
                </div>
                <div>
                  <span className="text-sm text-ink-500">{t('annualReport.favoritePerson')}：</span>
                  <span className="font-bold text-accent">{report.topPerson}</span>
                </div>
                {report.matchedFigure && (
                  <div>
                    <span className="text-sm text-ink-500">{t('annualReport.matchedFigure')}：</span>
                    <span className="font-bold text-amber-600">{report.matchedFigure}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* 性格维度 */}
        <RevealOnScroll delay={300}>
          <div className="mt-8 bg-white dark:bg-ink-900 rounded-2xl border-2 border-ink-200 dark:border-ink-700 p-6 shadow-lg">
            <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-4">📊 {t('annualReport.dimensionAnalysis')}</h3>
            <DimensionBars dimensions={report.dimensions} />
          </div>
        </RevealOnScroll>

        {/* 浏览分布 */}
        <RevealOnScroll delay={400}>
          <div className="mt-8 bg-white dark:bg-ink-900 rounded-2xl border-2 border-ink-200 dark:border-ink-700 p-6 shadow-lg">
            <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-4">📈 {t('annualReport.browseDistribution')}</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                { labelKey: 'annualReport.browseEvents', value: report.browseSummary.eventsViewed, emoji: '📜' },
                { labelKey: 'annualReport.browsePersons', value: report.browseSummary.personsViewed, emoji: '👤' },
                { labelKey: 'annualReport.browseDynasties', value: report.browseSummary.dynastiesViewed, emoji: '🏛️' },
                { labelKey: 'annualReport.browseKnowledge', value: report.browseSummary.knowledgeViewed, emoji: '📚' },
                { labelKey: 'annualReport.browseTopics', value: report.browseSummary.topicsRead, emoji: '📖' },
              ].map(item => (
                <div key={item.labelKey} className="text-center p-3 rounded-xl bg-ink-50 dark:bg-ink-800">
                  <div className="text-2xl mb-1">{item.emoji}</div>
                  <div className="text-xl font-bold text-ink-900 dark:text-ink-100">{item.value}</div>
                  <div className="text-xs text-ink-500">{t(item.labelKey)}</div>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* 徽章 */}
        <RevealOnScroll delay={500}>
          <div className="mt-8 bg-white dark:bg-ink-900 rounded-2xl border-2 border-ink-200 dark:border-ink-700 p-6 shadow-lg">
            <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-2">🏅 {t('annualReport.badgeAchievements')}</h3>
            <p className="text-sm text-ink-500 mb-4">{t('annualReport.badgeProgress', { earned: earnedBadges.length, total: report.badges.length })}</p>

            {earnedBadges.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {earnedBadges.map(badge => (
                  <div key={badge.id} className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800 text-center">
                    <div className="text-3xl mb-1">{badge.emoji}</div>
                    <div className="font-bold text-sm text-ink-900 dark:text-ink-100">{t(badge.nameKey)}</div>
                    <div className="text-xs text-ink-500 mt-1">{t(badge.descKey)}</div>
                  </div>
                ))}
              </div>
            )}

            {unearnedBadges.length > 0 && (
              <div>
                <h4 className="text-sm font-bold text-ink-500 mb-2">🔒 {t('annualReport.badgeLocked')}</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {unearnedBadges.map(badge => (
                    <div key={badge.id} className="p-3 rounded-xl bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700 text-center opacity-50">
                      <div className="text-2xl mb-1">🔒</div>
                      <div className="font-bold text-sm text-ink-500">{t(badge.nameKey)}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
