/**
 * 统一时间轴 Hub 页面
 * 聚合所有时间轴相关功能，提供统一的视觉导航
 * @see ITERATIONS.md #87
 */

import { Link } from 'react-router-dom';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';

interface TimelineFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  link: string;
  color: string;
  darkBg: string;
  tags: string[];
  featured?: boolean;
}

const TIMELINE_FEATURES: TimelineFeature[] = [
  {
    id: 'events',
    title: '历史大事记',
    description: '按时间线浏览中国历代重大事件，支持朝代和分类筛选',
    icon: '📜',
    link: '/timeline',
    color: 'text-accent',
    darkBg: 'bg-accent/10',
    tags: ['朝代筛选', '分类浏览', '交互式时间线'],
    featured: true,
  },
  {
    id: 'transport',
    title: '古代交通图',
    description: '从商代到清代，探索历代交通路线、工具和基础设施的演变',
    icon: '🛣️',
    link: '/transport-timeline',
    color: 'text-orange-600',
    darkBg: 'bg-orange-100 dark:bg-orange-900/30',
    tags: ['路线图', '朝代对比', '基础设施'],
  },
  {
    id: 'simulator',
    title: '历史决策模拟',
    description: '穿越到关键历史时刻，做出你的选择，体验平行历史推演',
    icon: '🎲',
    link: '/simulator',
    color: 'text-indigo-600',
    darkBg: 'bg-indigo-100 dark:bg-indigo-900/30',
    tags: ['互动体验', '平行历史', '多结局'],
  },
  {
    id: 'story-quest',
    title: '主题研学线',
    description: '8 条精心设计的主题研究路线，带你深度探索历史长河',
    icon: '🗺️',
    link: '/story-quest',
    color: 'text-emerald-600',
    darkBg: 'bg-emerald-100 dark:bg-emerald-900/30',
    tags: ['主题路线', '进度追踪', '深度学习'],
  },
  {
    id: 'dynasty-compare',
    title: '朝代对比',
    description: '横向对比不同朝代在政治、经济、文化、军事等方面的表现',
    icon: '⚖️',
    link: '/dynasty-compare',
    color: 'text-purple-600',
    darkBg: 'bg-purple-100 dark:bg-purple-900/30',
    tags: ['多维度对比', '雷达图', '数据可视化'],
  },
  {
    id: 'causal-chain',
    title: '因果链',
    description: '追溯历史事件的因果关系，理解蝴蝶效应如何改变历史走向',
    icon: '🔗',
    link: '/causal-chain',
    color: 'text-cyan-600',
    darkBg: 'bg-cyan-100 dark:bg-cyan-900/30',
    tags: ['因果分析', '事件关联', '深度推理'],
  },
];

/* ─── 时间轴缩略预览组件 ─── */
function TimelineMiniPreview() {
  return (
    <div className="mt-12 p-6 bg-white/50 dark:bg-ink-900/50 rounded-xl border border-ink-200 dark:border-ink-700">
      <h3 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-4 tracking-widest text-center">
        时间轴总览 · 千年一瞬
      </h3>
      <div className="relative h-32 overflow-hidden rounded-lg bg-gradient-to-r from-ink-100 via-ink-200 to-ink-100 dark:from-ink-800 dark:via-ink-700 dark:to-ink-800">
        {/* 中心时间线 */}
        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

        {/* 朝代节点 */}
        {['夏', '商', '周', '秦', '汉', '三国', '唐', '宋', '元', '明', '清'].map((dynasty, i) => (
          <div
            key={dynasty}
            className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center"
            style={{ left: `${(i + 0.5) * 9.09}%` }}
          >
            <div className={`w-3 h-3 rounded-full ${i % 2 === 0 ? 'bg-accent' : 'bg-amber-500'} ring-4 ring-white/50 dark:ring-ink-900/50`} />
            <span className="text-[10px] mt-1 font-bold text-ink-600 dark:text-ink-400">{dynasty}</span>
          </div>
        ))}

        {/* 左右箭头提示 */}
        <div className="absolute left-2 top-1/2 -translate-y-1/2 text-ink-400 text-xs">←</div>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-ink-400 text-xs">→</div>
      </div>
      <p className="text-center text-xs text-ink-500 dark:text-ink-400 mt-3">
        从夏商周到明清，五千年文明尽在眼前
      </p>
    </div>
  );
}

export default function TimelineHubPage() {
  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* 头部 */}
        <RevealOnScroll direction="fade">
          <SectionHeader
            label="UNIFIED TIMELINE"
            title="统一时间轴"
            description="聚合所有时间轴相关功能，一站式探索历史长河"
          />
        </RevealOnScroll>

        {/* 功能网格 */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TIMELINE_FEATURES.map((feature, index) => (
            <RevealOnScroll direction="up" delay={100 + index * 80} key={feature.id}>
              <Link
                to={feature.link}
                className="block p-5 bg-white/70 dark:bg-ink-900/70 rounded-xl border border-ink-200 dark:border-ink-700 hover:border-accent hover:shadow-lg hover:-translate-y-1 transition-all group h-full"
              >
                {/* 图标 + 标题 */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{feature.icon}</span>
                  <div>
                    <h3 className={`text-base font-bold ${feature.color} group-hover:text-accent transition-colors`}>
                      {feature.title}
                    </h3>
                    {feature.featured && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-accent/10 text-accent font-bold">
                        核心
                      </span>
                    )}
                  </div>
                </div>

                {/* 描述 */}
                <p className="text-sm text-ink-600 dark:text-ink-400 leading-relaxed mb-3 line-clamp-2">
                  {feature.description}
                </p>

                {/* 标签 */}
                <div className="flex flex-wrap gap-1.5">
                  {feature.tags.map(tag => (
                    <span
                      key={tag}
                      className={`text-[10px] px-2 py-0.5 rounded-full ${feature.darkBg} ${feature.color}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </RevealOnScroll>
          ))}
        </div>

        {/* 时间轴缩略预览 */}
        <TimelineMiniPreview />

        {/* 底部 */}
        <RevealOnScroll direction="fade" delay={400}>
          <div className="mt-12 text-center">
            <Link to="/" className="btn-secondary">返回首页</Link>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
