/**
 * 古代职业图鉴/穿越指南
 * @see history-museum/ITERATIONS.md Iteration #79
 *
 * 展示各个朝代的典型职业，帮助用户了解古代生活
 */

import React, { useState, useMemo } from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import { ANCIENT_JOBS, ANCIENT_JOBS_BY_DYNASTY, POPULAR_JOBS, UNCOMMON_JOBS, type AncientJob } from '@/data/features/jobsData';

export default function JobsPage() {
  const [selectedDynasty, setSelectedDynasty] = useState<string>('全部');
  const [selectedStatus, setSelectedStatus] = useState<string>('全部');
  const [selectedJob, setSelectedJob] = useState<AncientJob | null>(null);

  const allDynasties = useMemo(() => {
    const dynasties = ['全部', ...Object.keys(ANCIENT_JOBS_BY_DYNASTY)];
    return dynasties.sort();
  }, []);

  const filteredJobs = useMemo(() => {
    return ANCIENT_JOBS.filter(job => {
      const matchDynasty = selectedDynasty === '全部' || job.dynasty === selectedDynasty;
      const matchStatus = selectedStatus === '全部' || job.status === selectedStatus;
      return matchDynasty && matchStatus;
    });
  }, [selectedDynasty, selectedStatus]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'common':
        return <span className="badge-common">常见</span>;
      case 'rare':
        return <span className="badge-rare">稀有</span>;
      case 'elite':
        return <span className="badge-elite">精英</span>;
      case 'royal':
        return <span className="badge-royal">皇室</span>;
      default:
        return <span>{status}</span>;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'common':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'rare':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'elite':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      case 'royal':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <SectionHeader
        label="JOBS"
        title="古代职业图鉴"
        description="穿越时空，了解古代人的生活与职业"
      />

      <RevealOnScroll>
        <div className="jobs-container max-w-6xl mx-auto">
          {/* 筛选栏 */}
          <div className="filter-bar p-4 md:p-6 rounded-xl border-2 border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 shadow-lg mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-ink-700 dark:text-ink-300 mb-2">
                  选择朝代
                </label>
                <select
                  value={selectedDynasty}
                  onChange={(e) => setSelectedDynasty(e.target.value)}
                  className="input-field w-full"
                >
                  {allDynasties.map(dynasty => (
                    <option key={dynasty} value={dynasty}>
                      {dynasty}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-ink-700 dark:text-ink-300 mb-2">
                  职业等级
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="input-field w-full"
                >
                  <option value="全部">全部等级</option>
                  <option value="common">常见职业</option>
                  <option value="rare">稀有职业</option>
                  <option value="elite">精英职业</option>
                  <option value="royal">皇室职业</option>
                </select>
              </div>
            </div>
          </div>

          {/* 职业卡片网格 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className={`job-card p-5 rounded-xl border-2 border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 shadow-lg cursor-pointer transition-all hover:scale-105 hover:shadow-xl ${
                  selectedJob?.id === job.id ? 'ring-2 ring-accent' : ''
                }`}
                onClick={() => setSelectedJob(job)}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100">
                    {job.title}
                  </h3>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${getStatusColor(job.status)}`}>
                    {getStatusBadge(job.status)}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-ink-600 dark:text-ink-400">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">📅 {job.dynasty}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span>💰</span>
                    <span>{job.salary} {job.salaryUnit}</span>
                  </div>

                  <p className="line-clamp-2">{job.description}</p>
                </div>
              </div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-2">🔍</div>
              <div className="text-ink-600 dark:text-ink-400">
                没有找到符合条件的职业
              </div>
            </div>
          )}

          {/* 职业详情模态框 */}
          {selectedJob && (
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedJob(null)}
            >
              <div
                className="job-detail-card max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-2xl border-2 border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 md:p-8">
                  {/* 关闭按钮 */}
                  <button
                    className="absolute top-4 right-4 text-ink-400 hover:text-ink-900 dark:hover:text-ink-100"
                    onClick={() => setSelectedJob(null)}
                  >
                    ✕
                  </button>

                  {/* 标题 */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-ink-900 dark:text-ink-100 mb-2">
                        {selectedJob.title}
                      </h2>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(selectedJob.status)}`}>
                          {getStatusBadge(selectedJob.status)}
                        </span>
                        <span className="text-ink-600 dark:text-ink-400">
                          📅 {selectedJob.dynasty} - {selectedJob.period}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 薪资 */}
                  <div className="mb-6 p-4 rounded-xl bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700">
                    <div className="text-sm text-ink-500 mb-1">薪资水平</div>
                    <div className="text-2xl font-bold text-accent">
                      {selectedJob.salary} <span className="text-base">{selectedJob.salaryUnit}</span>
                    </div>
                  </div>

                  {/* 描述 */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-2">
                      📖 职业介绍
                    </h3>
                    <p className="text-ink-600 dark:text-ink-400 leading-relaxed">
                      {selectedJob.description}
                    </p>
                  </div>

                  {/* 要求 */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-2">
                      📋 入职要求
                    </h3>
                    <ul className="space-y-2">
                      {selectedJob.requirements.map((req: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-2 text-ink-600 dark:text-ink-400">
                          <span className="text-accent">✓</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 技能 */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-2">
                      🛠️ 所需技能
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.skills.map((skill: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full text-sm font-medium bg-accent/10 text-accent border border-accent/30"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 日常生活 */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-2">
                      🏠 日常工作
                    </h3>
                    <p className="text-ink-600 dark:text-ink-400 leading-relaxed">
                      {selectedJob.dailyLife}
                    </p>
                  </div>

                  {/* 穿越建议 */}
                  <div className="mb-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700">
                    <h3 className="text-lg font-bold text-amber-800 dark:text-amber-200 mb-2">
                      🎭 穿越建议
                    </h3>
                    <div className="text-amber-700 dark:text-amber-300 text-sm leading-relaxed">
                      {selectedJob.status === 'common' ? (
                        <>这是最常见的职业，最适合新手穿越。需要基本的体力或技能，生活相对稳定。</>
                      ) : selectedJob.status === 'rare' ? (
                        <>这是相对稀有的职业，需要特殊的才能或资源。竞争较少，但挑战也更大。</>
                      ) : selectedJob.status === 'elite' ? (
                        <>这是精英职业，需要顶级的专业技能。收入高但压力也大，需要完美表现。</>
                      ) : (
                        <>这是皇室职业，普通人难以触及。需要极高的地位或特殊的机缘。</>
                      )}
                    </div>
                  </div>

                  {/* 关闭按钮 */}
                  <button
                    className="w-full py-3 rounded-xl bg-accent text-white font-bold hover:bg-accent/90 transition-colors"
                    onClick={() => setSelectedJob(null)}
                  >
                    返回职业列表
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 热门职业推荐 */}
          <div className="mt-12 p-6 md:p-8 rounded-2xl border-2 border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 shadow-lg">
            <h2 className="text-2xl font-bold text-ink-900 dark:text-ink-100 mb-6">
              ⭐ 热门职业推荐
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-3">
                  常见职业（适合初次穿越）
                </h3>
                <div className="space-y-2">
                  {POPULAR_JOBS.slice(0, 6).map(job => (
                    <div
                      key={job.id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700 hover:bg-ink-100 dark:hover:bg-ink-800/50 cursor-pointer transition-colors"
                      onClick={() => setSelectedJob(job)}
                    >
                      <span className="text-2xl">👔</span>
                      <div>
                        <div className="font-bold text-ink-900 dark:text-ink-100">{job.title}</div>
                        <div className="text-sm text-ink-600 dark:text-ink-400">
                          {job.salary} {job.salaryUnit}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-3">
                  稀有/精英职业（适合进阶穿越）
                </h3>
                <div className="space-y-2">
                  {UNCOMMON_JOBS.slice(0, 6).map(job => (
                    <div
                      key={job.id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700 hover:bg-ink-100 dark:hover:bg-ink-800/50 cursor-pointer transition-colors"
                      onClick={() => setSelectedJob(job)}
                    >
                      <span className="text-2xl">⭐</span>
                      <div>
                        <div className="font-bold text-ink-900 dark:text-ink-100">{job.title}</div>
                        <div className="text-sm text-ink-600 dark:text-ink-400">
                          {job.salary} {job.salaryUnit}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </div>
  );
}
