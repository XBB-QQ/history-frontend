/**
 * 个人史册编纂系统 — 带 LLM 著史功能
 * @see history-museum/ITERATIONS.md Iteration #77, #90
 */

import { useState, useMemo, useCallback } from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import {
  EVENT_TYPE_LABELS,
  EVENT_TYPE_ICONS,
  EVENT_TYPE_COLORS,
  EVENT_TYPE_STATS,
  type LifeEvent,
  type PersonalHistory,
} from '@/data/features/personalHistoryData';
import { generatePersonalBiography, type PersonalBiography } from '@/features/personalHistoryAI';
import { usePersonaStore } from '@/store/personaStore';
import { useT } from '@/i18n/i18n';
import './PersonalHistoryPage.module.css';

/* ─── Tab 定义 ─── */
type TabId = 'edit' | 'biography' | 'ai';
const TABS: { id: TabId; labelKey: string; emoji: string }[] = [
  { id: 'edit', labelKey: 'personalHistory.tab_edit', emoji: '✏️' },
  { id: 'biography', labelKey: 'personalHistory.tab_biography', emoji: '📅' },
  { id: 'ai', labelKey: 'personalHistory.tab_ai', emoji: '🖊️' },
];

/* ─── 个人信息编辑面板 ─── */
function EditPanel({
  history,
  onChange,
}: {
  history: PersonalHistory;
  onChange: (patch: Partial<PersonalHistory>) => void;
}) {
  const t = useT();
  return (
    <div className="info-card p-6 md:p-8 rounded-2xl border-2 border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 shadow-lg">
      <div className="flex items-start gap-6">
        <div className="text-6xl md:text-7xl">👤</div>
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              value={history.name}
              onChange={(e) => onChange({ name: e.target.value })}
              placeholder={t('personalHistory.name_placeholder')}
              className="input-field text-2xl font-bold flex-1"
            />
            <select
              value={history.gender}
              onChange={(e) => onChange({ gender: e.target.value as PersonalHistory['gender'] })}
              className={`px-3 py-1 rounded-full text-sm font-bold border-0 ${
                history.gender === 'male' ? 'bg-blue-100 text-blue-800' :
                history.gender === 'female' ? 'bg-pink-100 text-pink-800' :
                'bg-gray-100 text-gray-800'
              }`}
            >
              <option value="male">{t('personalHistory.gender_male')}</option>
              <option value="female">{t('personalHistory.gender_female')}</option>
              <option value="other">{t('personalHistory.gender_other')}</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <div className="text-sm text-ink-500 mb-1">{t('personalHistory.birth_date')}</div>
              <input
                type="date"
                value={history.birthDate}
                onChange={(e) => onChange({ birthDate: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <div className="text-sm text-ink-500 mb-1">{t('personalHistory.birth_location')}</div>
              <input
                type="text"
                value={history.birthLocation}
                onChange={(e) => onChange({ birthLocation: e.target.value })}
                placeholder={t('personalHistory.birth_location_placeholder')}
                className="input-field"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 教育 */}
            <div className="p-4 rounded-xl bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700">
              <div className="text-sm text-ink-500 mb-2">{t('personalHistory.education')}</div>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder={t('personalHistory.school_placeholder')}
                  value={history.education?.school || ''}
                  onChange={(e) => onChange({ education: { ...history.education, school: e.target.value } })}
                  className="input-field text-sm w-full"
                />
                <input
                  type="text"
                  placeholder={t('personalHistory.major_placeholder')}
                  value={history.education?.major || ''}
                  onChange={(e) => onChange({ education: { ...history.education, major: e.target.value } })}
                  className="input-field text-sm w-full"
                />
                <input
                  type="text"
                  placeholder={t('personalHistory.degree_placeholder')}
                  value={history.education?.degree || ''}
                  onChange={(e) => onChange({ education: { ...history.education, degree: e.target.value } })}
                  className="input-field text-sm w-full"
                />
                <input
                  type="text"
                  placeholder={t('personalHistory.graduation_year_placeholder')}
                  value={history.education?.year || ''}
                  onChange={(e) => onChange({ education: { ...history.education, year: e.target.value } })}
                  className="input-field text-sm w-full"
                />
              </div>
            </div>

            {/* 工作 */}
            <div className="p-4 rounded-xl bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700">
              <div className="text-sm text-ink-500 mb-2">{t('personalHistory.work')}</div>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder={t('personalHistory.company_placeholder')}
                  value={history.work?.company || ''}
                  onChange={(e) => onChange({ work: { ...history.work, company: e.target.value } })}
                  className="input-field text-sm w-full"
                />
                <input
                  type="text"
                  placeholder={t('personalHistory.position_placeholder')}
                  value={history.work?.position || ''}
                  onChange={(e) => onChange({ work: { ...history.work, position: e.target.value } })}
                  className="input-field text-sm w-full"
                />
                <input
                  type="text"
                  placeholder={t('personalHistory.industry_placeholder')}
                  value={history.work?.industry || ''}
                  onChange={(e) => onChange({ work: { ...history.work, industry: e.target.value } })}
                  className="input-field text-sm w-full"
                />
              </div>
            </div>
          </div>

          {/* 个人简介 */}
          <div className="mt-6">
            <div className="text-sm text-ink-500 mb-2">{t('personalHistory.biography')}</div>
            <textarea
              value={history.biography || ''}
              onChange={(e) => onChange({ biography: e.target.value })}
              className="input-field w-full h-24"
              placeholder={t('personalHistory.biography_placeholder')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── 人生历程时间轴 ─── */
function TimelinePanel({
  events,
  onAddEvent,
  onDeleteEvent,
}: {
  events: LifeEvent[];
  onAddEvent: (event: LifeEvent) => void;
  onDeleteEvent: (id: string) => void;
}) {
  const t = useT();
  const [selectedType, setSelectedType] = useState<string>('all');
  const [showForm, setShowForm] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<LifeEvent>>({
    type: 'other',
    title: '',
    date: '',
    description: '',
  });

  const filteredEvents = useMemo(() => {
    const sorted = [...events].sort((a, b) => b.date.localeCompare(a.date));
    if (selectedType === 'all') return sorted;
    return sorted.filter(e => e.type === selectedType);
  }, [events, selectedType]);

  const handleAdd = () => {
    if (!newEvent.title || !newEvent.date) {
      alert(t('personalHistory.alert_title_date'));
      return;
    }
    onAddEvent({
      id: Date.now().toString(),
      type: (newEvent.type || 'other') as LifeEvent['type'],
      title: newEvent.title,
      date: newEvent.date,
      location: newEvent.location || '',
      description: newEvent.description || '',
      tags: newEvent.tags || [],
    } as LifeEvent);
    setShowForm(false);
    setNewEvent({ type: 'other', title: '', date: '', description: '' });
  };

  return (
    <div className="timeline-card p-6 md:p-8 rounded-2xl border-2 border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h3 className="text-xl font-bold text-ink-900 dark:text-ink-100">{t('personalHistory.timeline_title')}</h3>
        <div className="flex gap-2 flex-wrap">
          {Object.entries(EVENT_TYPE_STATS).map(([type, stat]) => (
            <button
              key={type}
              className={`px-3 py-1 rounded-full text-sm font-bold transition-colors ${
                selectedType === type ? EVENT_TYPE_COLORS[type as keyof typeof EVENT_TYPE_COLORS] : 'bg-ink-100 dark:bg-ink-800 text-ink-900 dark:text-ink-100'
              }`}
              onClick={() => setSelectedType(type)}
            >
              {stat.icon} {stat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 添加事件表单 */}
      {showForm && (
        <div className="mb-6 p-4 rounded-xl bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700">
          <div className="space-y-3">
            <select
              value={newEvent.type}
              onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value as LifeEvent['type'] })}
              className="input-field text-sm"
            >
              {Object.entries(EVENT_TYPE_LABELS).map(([k, v]) => (
                <option key={k} value={k}>{EVENT_TYPE_ICONS[k as LifeEvent['type']]} {v}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder={t('personalHistory.event_title_placeholder')}
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              className="input-field"
            />
            <input
              type="date"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              className="input-field"
            />
            <input
              type="text"
              placeholder={t('personalHistory.event_location_placeholder')}
              value={newEvent.location || ''}
              onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
              className="input-field"
            />
            <textarea
              placeholder={t('personalHistory.event_description_placeholder')}
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              className="input-field h-20"
            />
            <div className="flex gap-2">
              <button onClick={handleAdd} className="px-4 py-2 rounded-lg bg-accent text-white font-bold hover:bg-accent/90">
                {t('personalHistory.add')}
              </button>
              <button onClick={() => setShowForm(false)} className="px-4 py-2 rounded-lg bg-ink-100 dark:bg-ink-800 font-bold">
                {t('personalHistory.cancel')}
              </button>
            </div>
          </div>
        </div>
      )}

      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="w-full mb-6 py-3 rounded-xl border-2 border-dashed border-ink-300 dark:border-ink-600 text-ink-500 dark:text-ink-400 hover:border-accent hover:text-accent transition-colors font-bold"
        >
          {t('personalHistory.add_event')}
        </button>
      )}

      {/* 事件列表 */}
      <div className="space-y-6">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="event-item relative pl-8 pb-8 border-l-2 border-accent/30 last:pb-0"
          >
            <div className="absolute -left-[9px] top-0 w-5 h-5 rounded-full bg-accent border-4 border-ink-900 dark:border-ink-50" />
            <div className="p-4 rounded-xl bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700 hover:border-accent/50 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{EVENT_TYPE_ICONS[event.type]}</span>
                  <h4 className="text-lg font-bold text-ink-900 dark:text-ink-100">{event.title}</h4>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-bold ${EVENT_TYPE_COLORS[event.type]}`}>
                  {EVENT_TYPE_LABELS[event.type]}
                </span>
              </div>
              <div className="text-sm text-ink-500 mb-2">
                📅 {event.date}{event.location ? ` · 📍 ${event.location}` : ''}
              </div>
              <p className="text-ink-600 dark:text-ink-400 mb-3">{event.description}</p>
              {event.tags && event.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {event.tags.map((tag, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded text-xs bg-ink-100 dark:bg-ink-700 text-ink-600 dark:text-ink-400">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => onDeleteEvent(event.id)}
                  className="px-3 py-1 rounded-lg text-sm font-bold bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                >
                  {t('personalHistory.delete')}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-2">📝</div>
          <div className="text-ink-600 dark:text-ink-400">{t('personalHistory.no_events')}</div>
        </div>
      )}
    </div>
  );
}

/* ─── AI 著史结果展示 ─── */
function AIBiographyDisplay({ biography }: { biography: PersonalBiography }) {
  const t = useT();
  const [showModern, setShowModern] = useState(false);

  if (!biography) return null;

  return (
    <div className="space-y-6">
      {/* 关键词标签 */}
      {biography.keywords.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center">
          {biography.keywords.map((kw, i) => (
            <span
              key={i}
              className="px-4 py-1.5 rounded-full bg-accent/10 text-accent font-bold text-sm"
            >
              {kw}
            </span>
          ))}
        </div>
      )}

      {/* 正史体传记 */}
      <div className="p-6 md:p-8 rounded-2xl border-2 border-ink-200 dark:border-ink-700 bg-gradient-to-br from-paper to-ink-50 dark:from-ink-900 dark:to-ink-800 shadow-lg">
        <h3 className="text-lg font-bold text-accent mb-4 tracking-widest text-center">
          {t('personalHistory.liezhuan')}
        </h3>
        <div className="prose prose-ink dark:prose-invert max-w-none">
          <p className="text-ink-800 dark:text-ink-200 leading-loose whitespace-pre-wrap text-base">
            {biography.formalBiography}
          </p>
        </div>
      </div>

      {/* 史官评语 */}
      {biography.historianComment && (
        <div className="p-6 rounded-2xl border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20">
          <h3 className="text-sm font-bold text-amber-700 dark:text-amber-400 mb-2 tracking-widest">
            {t('personalHistory.taishigong')}
          </h3>
          <p className="text-ink-700 dark:text-ink-300 leading-relaxed italic">
            {biography.historianComment}
          </p>
        </div>
      )}

      {/* 现代语译切换 */}
      {biography.modernTranslation && (
        <div>
          <button
            onClick={() => setShowModern(!showModern)}
            className="px-4 py-2 rounded-lg bg-ink-100 dark:bg-ink-800 text-ink-700 dark:text-ink-300 font-bold hover:bg-ink-200 dark:hover:bg-ink-700 transition-colors"
          >
            {showModern ? t('personalHistory.hide_modern') : t('personalHistory.show_modern')}
          </button>
          {showModern && (
            <div className="mt-4 p-6 rounded-2xl border-2 border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 shadow-lg">
              <h3 className="text-sm font-bold text-ink-500 mb-3 tracking-widest">
                {t('personalHistory.modern_translation')}
              </h3>
              <p className="text-ink-700 dark:text-ink-300 leading-relaxed whitespace-pre-wrap">
                {biography.modernTranslation}
              </p>
            </div>
          )}
        </div>
      )}

      {/* 人生阶段 */}
      {biography.lifeStages.length > 0 && (
        <div className="p-6 md:p-8 rounded-2xl border-2 border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 shadow-lg">
          <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-6 tracking-widest text-center">
            {t('personalHistory.life_stages')}
          </h3>
          <div className="space-y-6">
            {biography.lifeStages.map((stage, i) => (
              <div key={i} className="relative pl-8 pb-6 border-l-2 border-accent/30 last:pb-0 last:border-0">
                <div className="absolute -left-[9px] top-0 w-5 h-5 rounded-full bg-accent border-4 border-ink-900 dark:border-ink-50" />
                <h4 className="font-bold text-accent mb-1">{stage.name}</h4>
                <div className="text-xs text-ink-500 mb-2">{stage.period}</div>
                <p className="text-sm text-ink-600 dark:text-ink-400 mb-2 italic">{stage.characteristic}</p>
                <ul className="text-sm text-ink-700 dark:text-ink-300 space-y-1">
                  {stage.events.map((e, j) => (
                    <li key={j}>• {e}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── 主页面 ─── */
export default function PersonalHistoryPage() {
  const t = useT();
  const [activeTab, setActiveTab] = useState<TabId>('edit');

  // 从 localStorage 读取个人史册数据
  const [personalHistory, setPersonalHistory] = useState<PersonalHistory>(() => {
    const stored = localStorage.getItem('personal-history-storage');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        // ignore
      }
    }
    // 如果没有存储数据，返回空模板
    return {
      id: 'user-1',
      name: '',
      gender: 'other' as const,
      birthDate: '',
      birthLocation: '',
      education: {},
      work: {},
      lifeEvents: [],
      biography: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  });

  // 更新个人信息
  const handleUpdateInfo = useCallback((patch: Partial<PersonalHistory>) => {
    setPersonalHistory(prev => ({
      ...prev,
      ...patch,
      education: { ...prev.education, ...(patch.education || {}) },
      work: { ...prev.work, ...(patch.work || {}) },
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  // 添加事件
  const handleAddEvent = useCallback((event: LifeEvent) => {
    setPersonalHistory(prev => ({
      ...prev,
      lifeEvents: [...prev.lifeEvents, event],
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  // 删除事件
  const handleDeleteEvent = useCallback((id: string) => {
    if (window.confirm(t('personalHistory.confirm_delete'))) {
      setPersonalHistory(prev => ({
        ...prev,
        lifeEvents: prev.lifeEvents.filter(e => e.id !== id),
        updatedAt: new Date().toISOString(),
      }));
    }
  }, []);

  // 手动触发 AI 著史
  const [manualBiography, setManualBiography] = useState<PersonalBiography | null>(null);
  const [isManualGenerating, setIsManualGenerating] = useState(false);

  const handleGenerateBiography = useCallback(async () => {
    if (personalHistory.lifeEvents.length === 0) {
      alert(t('personalHistory.alert_no_events'));
      return;
    }

    setIsManualGenerating(true);
    try {
      const persona = usePersonaStore.getState().persona;
      const result = await generatePersonalBiography(personalHistory, persona || undefined);
      setManualBiography(result);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : t('personalHistory.error_default');
      alert(t('personalHistory.alert_ai_failed', { message }));
    } finally {
      setIsManualGenerating(false);
    }
  }, [personalHistory]);

  // 记录浏览事件到 persona（当切换到 AI 著史 tab 时）
  const handleTabChange = useCallback((tab: TabId) => {
    setActiveTab(tab);
    if (tab === 'ai') {
      usePersonaStore.getState().recordBrowse('eventsViewed');
    }
  }, [personalHistory.name]);

  // 显示用传记
  const displayBiography = manualBiography;

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* 头部 */}
        <RevealOnScroll direction="fade">
          <SectionHeader
            label={t('personalHistory.label')}
            title={t('personalHistory.title')}
            description={t('personalHistory.description')}
          />
        </RevealOnScroll>

        {/* Tab 导航 */}
        <RevealOnScroll delay={100}>
          <div className="flex gap-2 mt-6 mb-8 overflow-x-auto pb-2">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
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

        {/* Tab 内容 */}
        <RevealOnScroll direction="up" delay={200}>
          {activeTab === 'edit' && (
            <EditPanel history={personalHistory} onChange={handleUpdateInfo} />
          )}

          {activeTab === 'biography' && (
            <TimelinePanel
              events={personalHistory.lifeEvents}
              onAddEvent={handleAddEvent}
              onDeleteEvent={handleDeleteEvent}
            />
          )}

          {activeTab === 'ai' && (
            <div className="space-y-6">
              {/* 生成按钮 */}
              <div className="text-center py-4">
                {personalHistory.lifeEvents.length === 0 ? (
                  <div className="p-6 rounded-2xl bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800">
                    <div className="text-4xl mb-2">📭</div>
                    <p className="text-ink-600 dark:text-ink-400 mb-4">
                      {t('personalHistory.no_events_record')}
                    </p>
                    <button
                      onClick={() => handleTabChange('biography')}
                      className="px-6 py-2 rounded-lg bg-accent text-white font-bold hover:bg-accent/90"
                    >
                      {t('personalHistory.go_add_events')}
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-ink-500 dark:text-ink-400 mb-4">
                      {t('personalHistory.events_count_tip', { count: personalHistory.lifeEvents.length })}
                    </p>
                    <button
                      onClick={handleGenerateBiography}
                      disabled={isManualGenerating}
                      className="px-8 py-3 rounded-xl bg-accent text-white font-bold text-lg hover:bg-accent/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                    >
                      {isManualGenerating ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          {t('personalHistory.generating')}
                        </span>
                      ) : (
                        t('personalHistory.generate')
                      )}
                    </button>
                  </>
                )}
              </div>

              {/* 加载中骨架屏 */}
              {(isManualGenerating) && (
                <div className="p-8 rounded-2xl bg-white dark:bg-ink-900 border-2 border-ink-200 dark:border-ink-700">
                  <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-ink-200 dark:bg-ink-700 rounded w-3/4 mx-auto" />
                    <div className="h-4 bg-ink-200 dark:bg-ink-700 rounded w-full" />
                    <div className="h-4 bg-ink-200 dark:bg-ink-700 rounded w-5/6" />
                    <div className="h-4 bg-ink-200 dark:bg-ink-700 rounded w-2/3 mx-auto" />
                  </div>
                </div>
              )}

              {/* 传记结果 */}
              {displayBiography && !isManualGenerating && (
                <AIBiographyDisplay biography={displayBiography} />
              )}

              {/* 无结果提示 */}
              {!displayBiography && !isManualGenerating && personalHistory.lifeEvents.length > 0 && (
                <div className="text-center py-8 text-ink-400">
                  {t('personalHistory.click_to_generate')}
                </div>
              )}
            </div>
          )}
        </RevealOnScroll>
      </div>
    </div>
  );
}
