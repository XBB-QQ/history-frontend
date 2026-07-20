/**
 * 古代职业图鉴/穿越指南
 * @see history-museum/ITERATIONS.md Iteration #79
 *
 * 展示各个朝代的典型职业，帮助用户了解古代生活
 */

import { useState, useMemo } from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import { ANCIENT_JOBS, ANCIENT_JOBS_BY_DYNASTY, POPULAR_JOBS, UNCOMMON_JOBS, type AncientJob } from '@/data/features/jobsData';
import { useT } from '@/i18n/i18n';

export default function JobsPage() {
  const t = useT();
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
        return <span className="badge-common">{t('jobs.badge_common')}</span>;
      case 'rare':
        return <span className="badge-rare">{t('jobs.badge_rare')}</span>;
      case 'elite':
        return <span className="badge-elite">{t('jobs.badge_elite')}</span>;
      case 'royal':
        return <span className="badge-royal">{t('jobs.badge_royal')}</span>;
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
        label={t('jobs.label')}
        title={t('jobs.title')}
        description={t('jobs.description')}
      />

      <RevealOnScroll>
        <div className="jobs-container max-w-6xl mx-auto">
          {/* 筛选栏 */}
          <div className="filter-bar p-4 md:p-6 rounded-xl border-2 border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 shadow-lg mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-ink-700 dark:text-ink-300 mb-2">
                  {t('jobs.select_dynasty')}
                </label>
                <select
                  value={selectedDynasty}
                  onChange={(e) => setSelectedDynasty(e.target.value)}
                  className="input-field w-full"
                >
                  {allDynasties.map(dynasty => (
                    <option key={dynasty} value={dynasty}>
                      {dynasty === '全部' ? t('jobs.all') : dynasty}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-ink-700 dark:text-ink-300 mb-2">
                  {t('jobs.select_status')}
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="input-field w-full"
                >
                  <option value="全部">{t('jobs.all_status')}</option>
                  <option value="common">{t('jobs.status_common')}</option>
                  <option value="rare">{t('jobs.status_rare')}</option>
                  <option value="elite">{t('jobs.status_elite')}</option>
                  <option value="royal">{t('jobs.status_royal')}</option>
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
                    <span className="font-bold">[时] {job.dynasty}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span>[资]</span>
                    <span>{job.salary} {job.salaryUnit}</span>
                  </div>

                  <p className="line-clamp-2">{job.description}</p>
                </div>
              </div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-2 text-ink-400">?</div>
              <div className="text-ink-600 dark:text-ink-400">
                {t('jobs.no_match')}
              </div>
            </div>
          )}

          {/* 职业详情模态框 */}
          {selectedJob && (
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center overflow-y-auto p-4"
              onClick={() => setSelectedJob(null)}
            >
              <div
                className="job-detail-card relative max-w-2xl w-full my-8 rounded-2xl border-2 border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 shadow-2xl"
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
                          [时] {selectedJob.dynasty} - {selectedJob.period}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 薪资 */}
                  <div className="mb-6 p-4 rounded-xl bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700">
                    <div className="text-sm text-ink-500 mb-1">{t('jobs.salary_level')}</div>
                    <div className="text-2xl font-bold text-accent">
                      {selectedJob.salary} <span className="text-base">{selectedJob.salaryUnit}</span>
                    </div>
                  </div>

                  {/* 描述 */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-2">
                      {t('jobs.job_intro')}
                    </h3>
                    <p className="text-ink-600 dark:text-ink-400 leading-relaxed">
                      {selectedJob.description}
                    </p>
                  </div>

                  {/* 要求 */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-2">
                      {t('jobs.requirements')}
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
                      {t('jobs.skills')}
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
                      {t('jobs.daily_work')}
                    </h3>
                    <p className="text-ink-600 dark:text-ink-400 leading-relaxed">
                      {selectedJob.dailyLife}
                    </p>
                  </div>

                  {/* 穿越建议 */}
                  <div className="mb-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700">
                    <h3 className="text-lg font-bold text-amber-800 dark:text-amber-200 mb-2">
                      {t('jobs.travel_advice')}
                    </h3>
                    <div className="text-amber-700 dark:text-amber-300 text-sm leading-relaxed">
                      {selectedJob.status === 'common' ? (
                        <>{t('jobs.advice_common')}</>
                      ) : selectedJob.status === 'rare' ? (
                        <>{t('jobs.advice_rare')}</>
                      ) : selectedJob.status === 'elite' ? (
                        <>{t('jobs.advice_elite')}</>
                      ) : (
                        <>{t('jobs.advice_royal')}</>
                      )}
                    </div>
                  </div>

                  {/* 关闭按钮 */}
                  <button
                    className="w-full py-3 rounded-xl bg-accent text-white font-bold hover:bg-accent/90 transition-colors"
                    onClick={() => setSelectedJob(null)}
                  >
                    {t('jobs.back_to_list')}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 热门职业推荐 */}
          <div className="mt-12 p-6 md:p-8 rounded-2xl border-2 border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 shadow-lg">
            <h2 className="text-2xl font-bold text-ink-900 dark:text-ink-100 mb-6">
              {t('jobs.popular_jobs')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-3">
                  {t('jobs.popular_section')}
                </h3>
                <div className="space-y-2">
                  {POPULAR_JOBS.slice(0, 6).map(job => (
                    <div
                      key={job.id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700 hover:bg-ink-100 dark:hover:bg-ink-800/50 cursor-pointer transition-colors"
                      onClick={() => setSelectedJob(job)}
                    >
                      <span className="text-2xl">冠</span>
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
                  {t('jobs.uncommon_section')}
                </h3>
                <div className="space-y-2">
                  {UNCOMMON_JOBS.slice(0, 6).map(job => (
                    <div
                      key={job.id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700 hover:bg-ink-100 dark:hover:bg-ink-800/50 cursor-pointer transition-colors"
                      onClick={() => setSelectedJob(job)}
                    >
                      <span className="text-2xl">星</span>
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
