/**
 * 影视历史勘误台
 * @see ITERATIONS.md #98
 *
 * 展示影视剧与真实历史的差异，支持 UGC 提交勘误。
 */

import { useState, useMemo } from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import {
  DRAMA_MAPPINGS,
  getDramasByDynasty,
  getDynastiesWithDramas,
  type DramaMapping,
  type FactCheckSummary,
} from '@/data/media/dramaMapping';
import { useT } from '@/i18n/i18n';

type TabType = 'dramas' | 'factcheck' | 'submit';

/* ─── 勘误性质标签 ─── */
const NATURE_CONFIG: Record<FactCheckSummary['nature'], { labelKey: string; color: string; emoji: string }> = {
  fiction: { labelKey: 'dramaFactCheck.natureFiction', color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400', emoji: '🎭' },
  exaggeration: { labelKey: 'dramaFactCheck.natureExaggeration', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400', emoji: '📢' },
  inversion: { labelKey: 'dramaFactCheck.natureInversion', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400', emoji: '🔄' },
  omission: { labelKey: 'dramaFactCheck.natureOmission', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400', emoji: '📝' },
};

/* ─── 剧集卡片 ─── */
function DramaCard({ drama }: { drama: DramaMapping }) {
  const t = useT();
  const [expanded, setExpanded] = useState(false);

  const factCheckCount = drama.factCheckSummaries.length;

  return (
    <div className="bg-white dark:bg-ink-900 rounded-2xl border-2 border-ink-200 dark:border-ink-700 shadow-lg overflow-hidden hover:shadow-xl transition-all">
      {/* 头部 */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100">{drama.title}</h3>
            <p className="text-sm text-ink-500">{drama.year} · {drama.episodes}{t('dramaFactCheck.episodes')} · {drama.director ? drama.director + ' ' + t('dramaFactCheck.directorSuffix') : ''}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 rounded-full bg-accent/10 text-accent text-sm font-bold">
              ⭐ {drama.doubanRating}
            </span>
            {factCheckCount > 0 && (
              <span className="px-2 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-bold">
                {t('dramaFactCheck.factCheckCount', { count: factCheckCount })}
              </span>
            )}
          </div>
        </div>

        {/* 朝代标签 */}
        <div className="flex flex-wrap gap-1 mb-3">
          {drama.dynasties.map(d => (
            <span key={d} className="px-2 py-0.5 rounded-full bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-400 text-xs font-bold">
              {d}
            </span>
          ))}
        </div>

        {/* 亮点 */}
        <div className="flex flex-wrap gap-1 mb-3">
          {drama.highlights.slice(0, 3).map((h, i) => (
            <span key={i} className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 px-2 py-0.5 rounded">
              {h}
            </span>
          ))}
        </div>

        {/* 展开/收起 */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm text-accent font-bold hover:underline"
        >
          {expanded ? `▲ ${t('dramaFactCheck.collapse')}` : `▼ ${t('dramaFactCheck.expand')}`}
        </button>

        {/* 勘误详情 */}
        {expanded && factCheckCount > 0 && (
          <div className="mt-4 space-y-3">
            {drama.factCheckSummaries.map((fc, i) => (
              <FactCheckCard key={i} factCheck={fc} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── 勘误卡片 ─── */
function FactCheckCard({ factCheck }: { factCheck: FactCheckSummary }) {
  const t = useT();
  const config = NATURE_CONFIG[factCheck.nature];

  return (
    <div className="p-4 rounded-xl bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700">
      <div className="flex items-center gap-2 mb-3">
        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${config.color}`}>
          {config.emoji} {t(config.labelKey)}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h5 className="text-sm font-bold text-red-700 dark:text-red-400 mb-1">🎬 {t('dramaFactCheck.dramaPlot')}</h5>
          <p className="text-sm text-ink-700 dark:text-ink-300">{factCheck.dramaClaim}</p>
        </div>
        <div>
          <h5 className="text-sm font-bold text-green-700 dark:text-green-400 mb-1">📚 {t('dramaFactCheck.trueHistory')}</h5>
          <p className="text-sm text-ink-700 dark:text-ink-300">{factCheck.historicalFact}</p>
        </div>
      </div>

      <div className="mt-3 p-3 rounded-lg bg-white dark:bg-ink-900 border border-ink-200 dark:border-ink-700">
        <h5 className="text-xs font-bold text-ink-500 mb-1">💡 {t('dramaFactCheck.detailExplain')}</h5>
        <p className="text-sm text-ink-600 dark:text-ink-400">{factCheck.explanation}</p>
      </div>
    </div>
  );
}

/* ─── 提交勘误表单 ─── */
function SubmitFactCheckForm() {
  const t = useT();
  const [formData, setFormData] = useState({
    drama: '',
    dramaClaim: '',
    historicalFact: '',
    explanation: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 保存到 localStorage
    const existing = JSON.parse(localStorage.getItem('ugc-factchecks') || '[]');
    existing.push({ ...formData, timestamp: Date.now(), status: 'pending' });
    localStorage.setItem('ugc-factchecks', JSON.stringify(existing));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-8 rounded-2xl bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 text-center">
        <span className="text-4xl block mb-3">✅</span>
        <h3 className="text-lg font-bold text-green-800 dark:text-green-400 mb-2">{t('dramaFactCheck.submitSuccess')}</h3>
        <p className="text-sm text-ink-600 dark:text-ink-400">{t('dramaFactCheck.submitSuccessDesc')}</p>
        <button
          onClick={() => { setSubmitted(false); setFormData({ drama: '', dramaClaim: '', historicalFact: '', explanation: '' }); }}
          className="mt-4 px-4 py-2 rounded-lg bg-green-500 text-white font-bold"
        >
          {t('dramaFactCheck.continueSubmit')}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-ink-600 dark:text-ink-400 mb-1">{t('dramaFactCheck.formDramaName')}</label>
        <input
          type="text"
          value={formData.drama}
          onChange={(e) => setFormData({ ...formData, drama: e.target.value })}
          className="input-field"
          placeholder={t('dramaFactCheck.formDramaNamePlaceholder')}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-ink-600 dark:text-ink-400 mb-1">{t('dramaFactCheck.formDramaClaim')}</label>
        <textarea
          value={formData.dramaClaim}
          onChange={(e) => setFormData({ ...formData, dramaClaim: e.target.value })}
          className="input-field h-20"
          placeholder={t('dramaFactCheck.formDramaClaimPlaceholder')}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-ink-600 dark:text-ink-400 mb-1">{t('dramaFactCheck.formHistoricalFact')}</label>
        <textarea
          value={formData.historicalFact}
          onChange={(e) => setFormData({ ...formData, historicalFact: e.target.value })}
          className="input-field h-20"
          placeholder={t('dramaFactCheck.formHistoricalFactPlaceholder')}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-ink-600 dark:text-ink-400 mb-1">{t('dramaFactCheck.formExplanation')}</label>
        <textarea
          value={formData.explanation}
          onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
          className="input-field h-24"
          placeholder={t('dramaFactCheck.formExplanationPlaceholder')}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 rounded-xl bg-accent text-white font-bold hover:bg-accent/90 shadow-lg"
      >
        📤 {t('dramaFactCheck.submitBtn')}
      </button>
    </form>
  );
}

/* ─── 主页面 ─── */
export default function DramaFactCheckPage() {
  const t = useT();
  const [activeTab, setActiveTab] = useState<TabType>('dramas');
  const [filterDynasty, setFilterDynasty] = useState('all');
  const [sortBy, setSortBy] = useState<'rating' | 'year' | 'title'>('rating');

  const dynasties = useMemo(() => getDynastiesWithDramas(), []);

  const filteredDramas = useMemo(() => {
    let dramas: DramaMapping[];
    if (filterDynasty === 'all') {
      dramas = [...DRAMA_MAPPINGS];
    } else {
      dramas = getDramasByDynasty(filterDynasty);
    }

    switch (sortBy) {
      case 'rating':
        return dramas.sort((a, b) => b.doubanRating - a.doubanRating);
      case 'year':
        return dramas.sort((a, b) => b.year - a.year);
      case 'title':
        return dramas.sort((a, b) => a.title.localeCompare(b.title, 'zh'));
      default:
        return dramas;
    }
  }, [filterDynasty, sortBy]);

  /* 统计 */
  const totalDramas = DRAMA_MAPPINGS.length;
  const totalFactChecks = DRAMA_MAPPINGS.reduce((sum, d) => sum + d.factCheckSummaries.length, 0);
  const totalFiction = DRAMA_MAPPINGS.reduce((sum, d) => sum + d.factCheckSummaries.filter(f => f.nature === 'fiction').length, 0);
  const totalExaggeration = DRAMA_MAPPINGS.reduce((sum, d) => sum + d.factCheckSummaries.filter(f => f.nature === 'exaggeration').length, 0);

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 头部 */}
        <RevealOnScroll>
          <SectionHeader
            label="DRAMA FACT CHECK"
            title={t('dramaFactCheck.title')}
            description={t('dramaFactCheck.description')}
          />
        </RevealOnScroll>

        {/* 统计面板 */}
        <RevealOnScroll delay={100}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="p-4 rounded-xl bg-white dark:bg-ink-900 border-2 border-ink-200 dark:border-ink-700 text-center">
              <div className="text-2xl font-bold text-accent">{totalDramas}</div>
              <div className="text-sm text-ink-500">{t('dramaFactCheck.statDramas')}</div>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-ink-900 border-2 border-ink-200 dark:border-ink-700 text-center">
              <div className="text-2xl font-bold text-red-600">{totalFactChecks}</div>
              <div className="text-sm text-ink-500">{t('dramaFactCheck.statFactChecks')}</div>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-ink-900 border-2 border-ink-200 dark:border-ink-700 text-center">
              <div className="text-2xl font-bold text-purple-600">{totalFiction}</div>
              <div className="text-sm text-ink-500">{t('dramaFactCheck.statFiction')}</div>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-ink-900 border-2 border-ink-200 dark:border-ink-700 text-center">
              <div className="text-2xl font-bold text-yellow-600">{totalExaggeration}</div>
              <div className="text-sm text-ink-500">{t('dramaFactCheck.statExaggeration')}</div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Tab 导航 */}
        <RevealOnScroll delay={150}>
          <div className="flex gap-2 mt-6 mb-8">
            {[
              { id: 'dramas' as const, labelKey: 'dramaFactCheck.tabDramas', emoji: '🎬' },
              { id: 'factcheck' as const, labelKey: 'dramaFactCheck.tabFactcheck', emoji: '📋' },
              { id: 'submit' as const, labelKey: 'dramaFactCheck.tabSubmit', emoji: '✏️' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-accent text-white shadow-lg'
                    : 'bg-white/70 dark:bg-ink-900/70 text-ink-600 dark:text-ink-400 hover:bg-ink-100 dark:hover:bg-ink-800'
                }`}
              >
                {tab.emoji} {t(tab.labelKey)}
              </button>
            ))}
          </div>
        </RevealOnScroll>

        {/* Tab 1: 剧集列表 */}
        {activeTab === 'dramas' && (
          <RevealOnScroll direction="up" delay={200}>
            {/* 筛选 */}
            <div className="flex flex-wrap gap-3 mb-6">
              <select
                value={filterDynasty}
                onChange={(e) => setFilterDynasty(e.target.value)}
                className="px-4 py-2 rounded-lg border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 text-sm"
              >
                <option value="all">{t('dramaFactCheck.allDynasties')}</option>
                {dynasties.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="px-4 py-2 rounded-lg border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 text-sm"
              >
                <option value="rating">{t('dramaFactCheck.sortByRating')}</option>
                <option value="year">{t('dramaFactCheck.sortByYear')}</option>
                <option value="title">{t('dramaFactCheck.sortByTitle')}</option>
              </select>
            </div>

            {/* 剧集卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredDramas.map(drama => (
                <DramaCard key={drama.id} drama={drama} />
              ))}
            </div>
          </RevealOnScroll>
        )}

        {/* Tab 2: 全部勘误 */}
        {activeTab === 'factcheck' && (
          <RevealOnScroll direction="up" delay={200}>
            <div className="space-y-6">
              {DRAMA_MAPPINGS.filter(d => d.factCheckSummaries.length > 0).map(drama => (
                <div key={drama.id} className="bg-white dark:bg-ink-900 rounded-2xl border-2 border-ink-200 dark:border-ink-700 shadow-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100">{drama.title}</h3>
                    <span className="text-sm bg-accent/10 text-accent px-2 py-0.5 rounded-full font-bold">
                      ⭐ {drama.doubanRating}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {drama.factCheckSummaries.map((fc, i) => (
                      <FactCheckCard key={i} factCheck={fc} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        )}

        {/* Tab 3: 提交勘误 */}
        {activeTab === 'submit' && (
          <RevealOnScroll direction="up" delay={200}>
            <div className="bg-white dark:bg-ink-900 rounded-2xl border-2 border-ink-200 dark:border-ink-700 p-6 shadow-lg">
              <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-4">{t('dramaFactCheck.submitTitle')}</h3>
              <p className="text-sm text-ink-500 mb-6">
                {t('dramaFactCheck.submitDesc')}
              </p>
              <SubmitFactCheckForm />
            </div>
          </RevealOnScroll>
        )}
      </div>
    </div>
  );
}
