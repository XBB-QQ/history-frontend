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
  name: string;
  emoji: string;
  description: string;
  earned: boolean;
}

/* ─── 徽章定义 ─── */
const BADGE_DEFINITIONS: Omit<Badge, 'earned'>[] = [
  { id: 'scholar', name: '博学之士', emoji: '📚', description: '浏览知识卡片 10 次以上' },
  { id: 'explorer', name: '历史探险家', emoji: '🗺️', description: '浏览朝代页面 5 次以上' },
  { id: 'debater', name: '辩论达人', emoji: '🎤', description: '参与跨时空辩论 3 次以上' },
  { id: 'simulator', name: '决策大师', emoji: '🎲', description: '完成历史决策 5 次以上' },
  { id: 'quizmaster', name: '答题高手', emoji: '🏅', description: '答题正确率达到 80%' },
  { id: 'collector', name: '收藏家', emoji: '💎', description: '收藏 5 个以上条目' },
  { id: 'reader', name: '深度阅读者', emoji: '📖', description: '阅读专题文章 3 篇以上' },
  { id: 'historian', name: '史学通才', emoji: '🏛️', description: '四个维度均超过 50' },
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
  const dims = [
    { key: 'governance' as const, label: '文治', emoji: '📜' },
    { key: 'military' as const, label: '武功', emoji: '⚔️' },
    { key: 'wisdom' as const, label: '智略', emoji: '🧠' },
    { key: 'charisma' as const, label: '博学', emoji: '🎭' },
  ];

  return (
    <div className="space-y-4">
      {dims.map(d => (
        <div key={d.key}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-bold text-ink-700 dark:text-ink-300">
              {d.emoji} {d.label}
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
  const [selectedYear] = useState(2025);
  const persona = usePersonaStore.getState().persona;
  const favorites = useFavoriteStore.getState().favorites;

  const report = useMemo<ReportData | null>(() => {
    if (!persona) return null;

    const browse = persona.browseSummary;
    const dims = persona.dimensions;

    // 确定偏好朝代
    const topDynasty = persona.favoriteDynasties[0] || '暂无数据';
    const topPerson = persona.favoritePersons[0] || '暂无数据';

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
            title="年度报告"
            description="暂无数据，请先浏览页面积累数据"
          />
          <div className="mt-12 text-6xl mb-4">📊</div>
          <p className="text-ink-500">开始探索历史长河，生成你的专属年度报告</p>
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
            title="我的史馆年度报告"
            description={`回顾你在 ${report.year} 年的历史之旅`}
          />
        </RevealOnScroll>

        {/* 总览 */}
        <RevealOnScroll delay={100}>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-accent to-amber-500 text-white text-center shadow-lg">
              <div className="text-3xl font-bold">{report.totalVisits}</div>
              <div className="text-sm opacity-90">总浏览</div>
            </div>
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white text-center shadow-lg">
              <div className="text-3xl font-bold">{report.favoriteCount}</div>
              <div className="text-sm opacity-90">收藏</div>
            </div>
            <div className="p-4 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 text-white text-center shadow-lg">
              <div className="text-3xl font-bold">{report.debateCount}</div>
              <div className="text-sm opacity-90">辩论</div>
            </div>
            <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white text-center shadow-lg">
              <div className="text-3xl font-bold">{report.simulationCount}</div>
              <div className="text-sm opacity-90">决策</div>
            </div>
          </div>
        </RevealOnScroll>

        {/* 偏好分析 */}
        <RevealOnScroll delay={200}>
          <div className="mt-8 bg-white dark:bg-ink-900 rounded-2xl border-2 border-ink-200 dark:border-ink-700 p-6 shadow-lg">
            <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-4">🎯 偏好分析</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center">
                <CircularProgress value={report.quizAccuracy} color="#22C55E" />
                <p className="text-sm text-ink-500 mt-2">答题正确率</p>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-ink-500">最爱朝代：</span>
                  <span className="font-bold text-accent">{report.topDynasty}</span>
                </div>
                <div>
                  <span className="text-sm text-ink-500">最关注人物：</span>
                  <span className="font-bold text-accent">{report.topPerson}</span>
                </div>
                {report.matchedFigure && (
                  <div>
                    <span className="text-sm text-ink-500">匹配历史人物：</span>
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
            <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-4">📊 性格维度</h3>
            <DimensionBars dimensions={report.dimensions} />
          </div>
        </RevealOnScroll>

        {/* 浏览分布 */}
        <RevealOnScroll delay={400}>
          <div className="mt-8 bg-white dark:bg-ink-900 rounded-2xl border-2 border-ink-200 dark:border-ink-700 p-6 shadow-lg">
            <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-4">📈 浏览分布</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                { label: '事件', value: report.browseSummary.eventsViewed, emoji: '📜' },
                { label: '人物', value: report.browseSummary.personsViewed, emoji: '👤' },
                { label: '朝代', value: report.browseSummary.dynastiesViewed, emoji: '🏛️' },
                { label: '知识', value: report.browseSummary.knowledgeViewed, emoji: '📚' },
                { label: '专题', value: report.browseSummary.topicsRead, emoji: '📖' },
              ].map(item => (
                <div key={item.label} className="text-center p-3 rounded-xl bg-ink-50 dark:bg-ink-800">
                  <div className="text-2xl mb-1">{item.emoji}</div>
                  <div className="text-xl font-bold text-ink-900 dark:text-ink-100">{item.value}</div>
                  <div className="text-xs text-ink-500">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* 徽章 */}
        <RevealOnScroll delay={500}>
          <div className="mt-8 bg-white dark:bg-ink-900 rounded-2xl border-2 border-ink-200 dark:border-ink-700 p-6 shadow-lg">
            <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-2">🏅 徽章成就</h3>
            <p className="text-sm text-ink-500 mb-4">已获得 {earnedBadges.length} / {report.badges.length} 枚徽章</p>

            {earnedBadges.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {earnedBadges.map(badge => (
                  <div key={badge.id} className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800 text-center">
                    <div className="text-3xl mb-1">{badge.emoji}</div>
                    <div className="font-bold text-sm text-ink-900 dark:text-ink-100">{badge.name}</div>
                    <div className="text-xs text-ink-500 mt-1">{badge.description}</div>
                  </div>
                ))}
              </div>
            )}

            {unearnedBadges.length > 0 && (
              <div>
                <h4 className="text-sm font-bold text-ink-500 mb-2">🔒 未解锁</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {unearnedBadges.map(badge => (
                    <div key={badge.id} className="p-3 rounded-xl bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700 text-center opacity-50">
                      <div className="text-2xl mb-1">🔒</div>
                      <div className="font-bold text-sm text-ink-500">{badge.name}</div>
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
