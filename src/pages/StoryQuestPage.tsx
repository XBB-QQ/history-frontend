/**
 * 主题研学线（Story Quest）页面
 * 展示研学线列表、节点地图、进度环、完成印章与线报
 * @see ITERATIONS.md #85
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { STUDY_ROUTES, getRoutesByDifficulty, getRoutesByDynasty, type StudyRoute } from '@/data/features/storyQuests';
import { useQuestStore } from '@/store/questStore';
import SealStamp from '@/components/common/SealStamp';
import { useT } from '@/i18n/i18n';

const DIFFICULTY_LABEL_KEYS: Record<string, string> = {
  '入门': 'storyQuest.difficulty_beginner',
  '进阶': 'storyQuest.difficulty_intermediate',
  '高阶': 'storyQuest.difficulty_advanced',
};

/** 难度星级渲染 */
function DifficultyStars({ level }: { level: number }) {
  const t = useT();
  return (
    <div className="flex items-center gap-0.5" title={`${t('storyQuest.difficulty_label')} ${level}/5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`text-xs ${i < level ? 'text-amber-500' : 'text-ink-200 dark:text-ink-700'}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

/** 进度环组件 */
function ProgressRing({ percent, size = 48 }: { percent: number; size?: number }) {
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className="text-ink-200 dark:text-ink-700"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="text-accent transition-all duration-500 ease-out"
      />
    </svg>
  );
}

/** 单条研学线卡片 */
function RouteCard({ route }: { route: StudyRoute }) {
  const t = useT();
  const navigate = useNavigate();
  const questProgress = useQuestStore((s) => s.progress[route.id]);
  const startRoute = useQuestStore((s) => s.startRoute);
  const percent = questProgress ? Math.round(
    questProgress.nodeStatuses.filter((n) => n.completed).length /
    questProgress.nodeStatuses.length * 100
  ) : 0;
  const difficulty = getRoutesByDifficulty(route);

  const handleClick = () => {
    if (!questProgress) {
      startRoute(route.id);
    }
    navigate(`#${route.id}`);
    // 滚动到对应区块
    setTimeout(() => {
      const el = document.getElementById(`route-${route.id}`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div
      id={`route-${route.id}`}
      className="bg-white dark:bg-ink-900 rounded-2xl border border-ink-200 dark:border-ink-700 overflow-hidden hover:shadow-lg hover:border-amber-300 dark:hover:border-amber-600 transition-all cursor-pointer group"
      onClick={handleClick}
    >
      {/* 卡片头部 */}
      <div className="p-5 pb-3">
        <div className="flex items-start gap-3">
          <span className="text-3xl flex-shrink-0 group-hover:scale-110 transition-transform">
            {route.emoji}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-ink-900 dark:text-ink-100 truncate group-hover:text-accent transition-colors">
                {route.name}
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-ink-400 dark:text-ink-500">
              <span>{DIFFICULTY_LABEL_KEYS[difficulty] ? t(DIFFICULTY_LABEL_KEYS[difficulty]) : difficulty}</span>
              <span>·</span>
              <DifficultyStars level={route.difficulty} />
              <span>·</span>
              <span>{route.estimatedMinutes}{t('storyQuest.minutes')}</span>
            </div>
          </div>
          {/* 进度环 */}
          <div className="relative flex-shrink-0">
            <ProgressRing percent={percent} size={44} />
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-ink-600 dark:text-ink-400">
              {percent}%
            </span>
          </div>
        </div>
      </div>

      {/* 简介 */}
      <p className="px-5 pb-3 text-xs text-ink-500 dark:text-ink-400 leading-relaxed line-clamp-2">
        {route.description}
      </p>

      {/* 节点列表预览 */}
      <div className="px-5 pb-3">
        <div className="flex flex-wrap gap-1.5">
          {route.nodes.slice(0, 5).map((node) => {
            const isCompleted = questProgress?.nodeStatuses.find(
              (ns) => ns.nodeId === node.id
            )?.completed;
            return (
              <span
                key={node.id}
                className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border ${
                  isCompleted
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700 text-green-700 dark:text-green-400'
                    : 'bg-ink-50 dark:bg-ink-800/50 border-ink-200 dark:border-ink-700 text-ink-500 dark:text-ink-400'
                }`}
              >
                {isCompleted && '✓ '}
                {node.title.length > 8 ? node.title.slice(0, 8) + '…' : node.title}
              </span>
            );
          })}
          {route.nodes.length > 5 && (
            <span className="text-xs px-2 py-0.5 rounded-full text-ink-400">
              +{route.nodes.length - 5}
            </span>
          )}
        </div>
      </div>

      {/* 底部标签 */}
      <div className="px-5 py-3 border-t border-ink-100 dark:border-ink-800 flex items-center justify-between">
        <div className="flex gap-1.5 flex-wrap">
          {route.dynasties.map((d) => (
            <span key={d} className="text-xs px-2 py-0.5 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded-full">
              {d}
            </span>
          ))}
        </div>
        {questProgress?.sealObtained && (
          <span className="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1">
            {route.seal.icon} {route.seal.name}
          </span>
        )}
      </div>
    </div>
  );
}

/** 节点详情面板（点击某条研学线后展开） */
function NodeDetail({ route }: { route: StudyRoute }) {
  const t = useT();
  const questProgress = useQuestStore((s) => s.progress[route.id]);
  const markNodeComplete = useQuestStore((s) => s.markNodeComplete);
  const readBriefing = useQuestStore((s) => s.readBriefing);
  const briefingRead = questProgress?.briefingRead ?? false;
  const allCompleted = questProgress
    ? questProgress.nodeStatuses.every((n) => n.completed)
    : false;

  const handleComplete = (nodeId: string) => {
    markNodeComplete(route.id, nodeId);
  };

  return (
    <div className="mt-6 bg-white dark:bg-ink-900 rounded-2xl border border-ink-200 dark:border-ink-700 overflow-hidden">
      {/* 节点地图 */}
      <div className="p-5">
        <h3 className="font-bold text-lg text-ink-900 dark:text-ink-100 mb-4">
          📍 {t('storyQuest.nodes_title')}
        </h3>

        <div className="space-y-3">
          {route.nodes.map((node, idx) => {
            const nodeStatus = questProgress?.nodeStatuses.find(
              (ns) => ns.nodeId === node.id
            );
            const isCompleted = nodeStatus?.completed ?? false;

            return (
              <div key={node.id} className="flex items-start gap-3 group/node">
                {/* 连接线 */}
                {idx > 0 && (
                  <div className="absolute left-5 top-0 h-3 w-px bg-ink-200 dark:bg-ink-700" />
                )}

                {/* 序号 + 状态 */}
                <div className="flex-shrink-0 mt-0.5">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    isCompleted
                      ? 'bg-green-500 text-white'
                      : 'bg-ink-100 dark:bg-ink-800 text-ink-500 dark:text-ink-400'
                  }`}>
                    {isCompleted ? '✓' : idx + 1}
                  </div>
                </div>

                {/* 节点信息 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <Link
                      to={node.path}
                      onClick={(e) => e.stopPropagation()}
                      className="text-sm font-medium text-ink-900 dark:text-ink-100 hover:text-accent transition-colors"
                    >
                      {node.title}
                    </Link>
                    <span className={`text-xs px-1.5 py-0.5 rounded ${
                      node.type === 'quiz'
                        ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                        : 'bg-ink-50 dark:bg-ink-800 text-ink-500 dark:text-ink-400'
                    }`}>
                      {node.type === 'quiz' ? t('storyQuest.quiz') : node.type === 'milestone' ? t('storyQuest.milestone') : t('storyQuest.browse')}
                    </span>
                  </div>
                  {node.description && (
                    <p className="text-xs text-ink-500 dark:text-ink-400 mt-0.5">
                      {node.description}
                    </p>
                  )}
                </div>

                {/* 标记完成按钮 */}
                {!isCompleted && (
                  <button
                    onClick={() => handleComplete(node.id)}
                    className="flex-shrink-0 text-xs px-3 py-1.5 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
                  >
                    {t('storyQuest.mark_complete')}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* 完成印章 & 线报 */}
        {allCompleted && (
          <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 rounded-xl border border-amber-200 dark:border-amber-700">
            <div className="flex items-center gap-4 mb-3">
              <SealStamp text={route.seal.icon} size="lg" />
              <div>
                <h4 className="font-bold text-ink-900 dark:text-ink-100">
                  {t('storyQuest.seal_obtained')}：{route.seal.name}
                </h4>
                <p className="text-xs text-ink-500 dark:text-ink-400">{route.seal.obtainText}</p>
              </div>
            </div>

            {/* 线报 */}
            <button
              onClick={() => {
                if (!briefingRead) readBriefing(route.id);
              }}
              className="w-full text-left p-3 bg-white dark:bg-ink-800 rounded-lg border border-amber-200 dark:border-amber-700 hover:border-amber-300 dark:hover:border-amber-600 transition-colors"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm">📨</span>
                <h4 className="font-bold text-sm text-ink-900 dark:text-ink-100">
                  {route.briefing.title}
                </h4>
                {!briefingRead && (
                  <span className="text-xs px-1.5 py-0.5 rounded bg-red-500 text-white">{t('storyQuest.new_badge')}</span>
                )}
              </div>
              <p className="text-xs text-ink-600 dark:text-ink-400 leading-relaxed">
                {route.briefing.content}
              </p>
              {route.briefing.linkPath && (
                <Link
                  to={route.briefing.linkPath}
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs text-accent hover:underline mt-2 inline-block"
                >
                  {route.briefing.linkLabel} →
                </Link>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/** 筛选标签 */
type FilterType = 'all' | 'difficulty' | 'dynasty';

export default function StoryQuestPage() {
  const t = useT();
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [filterValue, setFilterValue] = useState<string>('');
  const [expandedRoute] = useState<string | null>(null);

  // 收集所有朝代标签
  const allDynasties = Array.from(new Set(STUDY_ROUTES.flatMap((r) => r.dynasties))).sort();

  // 筛选
  let filtered = [...STUDY_ROUTES];
  if (filterType === 'difficulty' && filterValue) {
    filtered = STUDY_ROUTES.filter((r) => getRoutesByDifficulty(r) === filterValue);
  } else if (filterType === 'dynasty' && filterValue) {
    filtered = getRoutesByDynasty(filterValue);
  }
  filtered.sort((a, b) => a.featuredOrder - b.featuredOrder);

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-ink-900 dark:text-ink-100 mb-2">
            📚 {t('storyQuest.title')}
          </h1>
          <p className="text-sm text-ink-500 dark:text-ink-400">
            {t('storyQuest.subtitle')}
          </p>
        </div>

        {/* 筛选栏 */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {/* 难度筛选 */}
          <select
            value={filterType === 'difficulty' ? filterValue : ''}
            onChange={(e) => {
              setFilterType('difficulty');
              setFilterValue(e.target.value);
            }}
            className="text-sm px-3 py-1.5 rounded-lg border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 text-ink-700 dark:text-ink-300"
          >
            <option value="">{t('storyQuest.all_difficulty')}</option>
            <option value="入门">{t('storyQuest.difficulty_beginner')}</option>
            <option value="进阶">{t('storyQuest.difficulty_intermediate')}</option>
            <option value="高阶">{t('storyQuest.difficulty_advanced')}</option>
          </select>

          {/* 朝代筛选 */}
          <select
            value={filterType === 'dynasty' ? filterValue : ''}
            onChange={(e) => {
              setFilterType('dynasty');
              setFilterValue(e.target.value);
            }}
            className="text-sm px-3 py-1.5 rounded-lg border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 text-ink-700 dark:text-ink-300"
          >
            <option value="">{t('storyQuest.all_dynasty')}</option>
            {allDynasties.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          {/* 重置 */}
          {(filterType !== 'all' || filterValue) && (
            <button
              onClick={() => { setFilterType('all'); setFilterValue(''); }}
              className="text-xs text-ink-400 hover:text-ink-600 dark:hover:text-ink-300 transition-colors"
            >
              ✕ {t('storyQuest.reset_filter')}
            </button>
          )}
        </div>

        {/* 研学线网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((route) => (
            <div key={route.id}>
              <RouteCard route={route} />
              {/* 展开的节点详情 */}
              {expandedRoute === route.id && <NodeDetail route={route} />}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-ink-400 dark:text-ink-500">
            <p className="text-lg mb-2">{t('storyQuest.no_match')}</p>
            <p className="text-sm">{t('storyQuest.adjust_filter')}</p>
          </div>
        )}

        {/* 总进度统计 */}
        <div className="mt-8 p-4 bg-white dark:bg-ink-900 rounded-xl border border-ink-200 dark:border-ink-700">
          <h3 className="font-bold text-sm text-ink-900 dark:text-ink-100 mb-3">
            📊 {t('storyQuest.overview_title')}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-accent">{STUDY_ROUTES.length}</div>
              <div className="text-xs text-ink-500 dark:text-ink-400">{t('storyQuest.total_routes')}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-500">
                {STUDY_ROUTES.reduce((sum, r) => sum + r.nodes.length, 0)}
              </div>
              <div className="text-xs text-ink-500 dark:text-ink-400">{t('storyQuest.total_nodes')}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-500">
                {Object.values(useQuestStore.getState().progress).filter(
                  (p) => p.sealObtained
                ).length}
              </div>
              <div className="text-xs text-ink-500 dark:text-ink-400">{t('storyQuest.seals_obtained')}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-500">
                {Math.round(
                  Object.entries(useQuestStore.getState().progress).reduce(
                    (sum, [, p]) => sum + (p.nodeStatuses.filter((n) => n.completed).length / p.nodeStatuses.length) * 100,
                    0
                  ) / STUDY_ROUTES.length
                ) || 0}
                %
              </div>
              <div className="text-xs text-ink-500 dark:text-ink-400">{t('storyQuest.avg_progress')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
