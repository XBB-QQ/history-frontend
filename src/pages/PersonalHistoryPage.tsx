/**
 * 个人史册编纂系统
 * @see history-museum/ITERATIONS.md Iteration #77
 *
 * 用户可以记录自己的个人历史、人生大事和传记
 */

import React, { useState, useMemo } from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import { EVENT_TYPE_LABELS, EVENT_TYPE_ICONS, EVENT_TYPE_COLORS, EVENT_TYPE_STATS } from '@/data/features/personalHistoryData';

import './PersonalHistoryPage.module.css';

export default function PersonalHistoryPage() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [personalHistory, setPersonalHistory] = useState({
    id: 'user-1',
    name: '',
    gender: 'male' as 'male' | 'female' | 'other',
    birthDate: '',
    birthLocation: '',
    education: { school: '', major: '', degree: '', year: '' },
    work: { company: '', position: '', industry: '' },
    biography: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedEventIndex, setSelectedEventIndex] = useState<number | null>(null);

  const lifeEvents = [
    {
      id: '1',
      type: 'education',
      title: '大学毕业',
      date: '2012-07-01',
      location: '北京市',
      description: '从北京大学计算机系毕业，获得学士学位',
      tags: ['学习', '毕业', '大学']
    },
    {
      id: '2',
      type: 'work',
      title: '加入腾讯',
      date: '2012-07-15',
      location: '深圳市',
      description: '加入腾讯公司，开始软件工程师职业生涯',
      tags: ['工作', '入职', '腾讯']
    },
    {
      id: '3',
      type: 'travel',
      title: '第一次出国',
      date: '2015-05-20',
      location: '日本东京',
      description: '与朋友一起去日本旅游，体验异国文化',
      tags: ['旅行', '日本', '旅游']
    }
  ];

  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredEvents = useMemo(() => {
    if (selectedType === 'all') {
      return lifeEvents;
    }
    return lifeEvents.filter(event => event.type === selectedType);
  }, [selectedType]);

  const handleSave = () => {
    setIsEditMode(false);
    alert('个人史册已保存！');
  };

  const handleAddEvent = () => {
    setShowEventForm(true);
  };

  const handleEditEvent = (index: number) => {
    setSelectedEventIndex(index);
    setShowEventForm(true);
  };

  const handleDeleteEvent = (index: number) => {
    if (window.confirm('确定要删除这个事件吗？')) {
      lifeEvents.splice(index, 1);
      setSelectedEventIndex(null);
      setShowEventForm(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <SectionHeader
        title="个人史册编纂系统"
        subtitle="记录你的人生历程，打造属于你的传记"
        emoji="📖"
      />

      <RevealOnScroll>
        <div className="personal-history-container max-w-6xl mx-auto">
          {/* 操作栏 */}
          <div className="action-bar p-4 md:p-6 rounded-xl border-2 border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 shadow-lg mb-6">
            <div className="flex flex-wrap gap-4 justify-between items-center">
              <div className="flex gap-2">
                <button
                  className="px-4 py-2 rounded-lg bg-accent text-white font-bold hover:bg-accent/90 transition-colors"
                  onClick={() => setIsEditMode(true)}
                >
                  {isEditMode ? '保存修改' : '编辑个人信息'}
                </button>
                <button
                  className="px-4 py-2 rounded-lg bg-ink-100 dark:bg-ink-800 text-ink-900 dark:text-ink-100 font-bold hover:bg-ink-200 dark:hover:bg-ink-700 transition-colors"
                  onClick={() => alert('个人史册导出成功！')}
                >
                  📤 导出
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  className="px-4 py-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 font-bold hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                  onClick={() => handleAddEvent()}
                >
                  ➕ 添加事件
                </button>
              </div>
            </div>
          </div>

          {/* 基本信息 */}
          <div className="info-card p-6 md:p-8 rounded-2xl border-2 border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 shadow-lg mb-6">
            <div className="flex items-start gap-6">
              <div className="text-6xl md:text-7xl">👤</div>
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-ink-900 dark:text-ink-100">
                    {isEditMode ? (
                      <input
                        type="text"
                        value={personalHistory.name}
                        onChange={(e) => setPersonalHistory({...personalHistory, name: e.target.value})}
                        className="input-field text-2xl font-bold"
                      />
                    ) : (
                      personalHistory.name || '未命名'
                    )}
                  </h2>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                    personalHistory.gender === 'male' ? 'bg-blue-100 text-blue-800' :
                    personalHistory.gender === 'female' ? 'bg-pink-100 text-pink-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {personalHistory.gender === 'male' ? '男' : personalHistory.gender === 'female' ? '女' : '其他'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <div className="text-sm text-ink-500 mb-1">🎂 出生日期</div>
                    <div className="text-lg font-bold text-ink-900 dark:text-ink-100">
                      {isEditMode ? (
                        <input
                          type="date"
                          value={personalHistory.birthDate}
                          onChange={(e) => setPersonalHistory({...personalHistory, birthDate: e.target.value})}
                          className="input-field"
                        />
                      ) : (
                        personalHistory.birthDate || '未填写'
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-ink-500 mb-1">📍 出生地</div>
                    <div className="text-lg font-bold text-ink-900 dark:text-ink-100">
                      {isEditMode ? (
                        <input
                          type="text"
                          value={personalHistory.birthLocation}
                          onChange={(e) => setPersonalHistory({...personalHistory, birthLocation: e.target.value})}
                          className="input-field"
                        />
                      ) : (
                        personalHistory.birthLocation || '未填写'
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 rounded-xl bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700">
                    <div className="text-sm text-ink-500 mb-2">🎓 教育</div>
                    {isEditMode ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          placeholder="学校"
                          value={personalHistory.education.school}
                          onChange={(e) => setPersonalHistory({...personalHistory, education: {...personalHistory.education, school: e.target.value}})}
                          className="input-field text-sm"
                        />
                        <input
                          type="text"
                          placeholder="专业"
                          value={personalHistory.education.major}
                          onChange={(e) => setPersonalHistory({...personalHistory, education: {...personalHistory.education, major: e.target.value}})}
                          className="input-field text-sm"
                        />
                        <input
                          type="text"
                          placeholder="学位"
                          value={personalHistory.education.degree}
                          onChange={(e) => setPersonalHistory({...personalHistory, education: {...personalHistory.education, degree: e.target.value}})}
                          className="input-field text-sm"
                        />
                        <input
                          type="text"
                          placeholder="年份"
                          value={personalHistory.education.year}
                          onChange={(e) => setPersonalHistory({...personalHistory, education: {...personalHistory.education, year: e.target.value}})}
                          className="input-field text-sm"
                        />
                      </div>
                    ) : personalHistory.education.school ? (
                      <div>
                        <div className="font-bold text-ink-900 dark:text-ink-100">
                          {personalHistory.education.school}
                        </div>
                        <div className="text-sm text-ink-600 dark:text-ink-400">
                          {personalHistory.education.major} · {personalHistory.education.degree}
                        </div>
                        {personalHistory.education.year && (
                          <div className="text-xs text-ink-500">
                            {personalHistory.education.year}年毕业
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-sm text-ink-400">未填写</div>
                    )}
                  </div>

                  <div className="p-4 rounded-xl bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700">
                    <div className="text-sm text-ink-500 mb-2">💼 工作</div>
                    {isEditMode ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          placeholder="公司"
                          value={personalHistory.work.company}
                          onChange={(e) => setPersonalHistory({...personalHistory, work: {...personalHistory.work, company: e.target.value}})}
                          className="input-field text-sm"
                        />
                        <input
                          type="text"
                          placeholder="职位"
                          value={personalHistory.work.position}
                          onChange={(e) => setPersonalHistory({...personalHistory, work: {...personalHistory.work, position: e.target.value}})}
                          className="input-field text-sm"
                        />
                        <input
                          type="text"
                          placeholder="行业"
                          value={personalHistory.work.industry}
                          onChange={(e) => setPersonalHistory({...personalHistory, work: {...personalHistory.work, industry: e.target.value}})}
                          className="input-field text-sm"
                        />
                      </div>
                    ) : personalHistory.work.company ? (
                      <div>
                        <div className="font-bold text-ink-900 dark:text-ink-100">
                          {personalHistory.work.company}
                        </div>
                        <div className="text-sm text-ink-600 dark:text-ink-400">
                          {personalHistory.work.position}
                        </div>
                        {personalHistory.work.industry && (
                          <div className="text-xs text-ink-500">
                            {personalHistory.work.industry}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-sm text-ink-400">未填写</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 个人简介 */}
          <div className="biography-card p-6 md:p-8 rounded-2xl border-2 border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 shadow-lg mb-6">
            <h3 className="text-xl font-bold text-ink-900 dark:text-ink-100 mb-4">
              📝 个人简介
            </h3>
            {isEditMode ? (
              <textarea
                value={personalHistory.biography}
                onChange={(e) => setPersonalHistory({...personalHistory, biography: e.target.value})}
                className="input-field w-full h-40"
                placeholder="写下你的个人简介..."
              />
            ) : (
              <p className="text-ink-600 dark:text-ink-400 leading-relaxed">
                {personalHistory.biography || '还没有填写个人简介...'}
              </p>
            )}
          </div>

          {/* 时间轴事件 */}
          <div className="timeline-card p-6 md:p-8 rounded-2xl border-2 border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 shadow-lg mb-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-ink-900 dark:text-ink-100">
                📅 人生历程
              </h3>

              <div className="flex gap-2">
                {Object.entries(EVENT_TYPE_STATS).map(([type, stat]) => (
                  <button
                    key={type}
                    className={`px-3 py-1 rounded-full text-sm font-bold transition-colors ${
                      selectedType === type ? EVENT_TYPE_COLORS[type as keyof typeof EVENT_TYPE_COLORS] : 'bg-ink-100 dark:bg-ink-800 text-ink-900 dark:text-ink-100'
                    }`}
                    onClick={() => setSelectedType(type === 'all' ? 'all' : type)}
                  >
                    {stat.icon} {stat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 事件列表 */}
            <div className="space-y-6">
              {filteredEvents.map((event, index) => (
                <div
                  key={event.id}
                  className="event-item relative pl-8 pb-8 border-l-2 border-accent/30 last:pb-0"
                >
                  {/* 时间轴节点 */}
                  <div className="absolute -left-[9px] top-0 w-5 h-5 rounded-full bg-accent border-4 border-ink-900 dark:border-ink-50"></div>

                  {/* 事件内容 */}
                  <div className="p-4 rounded-xl bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700 hover:border-accent/50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{EVENT_TYPE_ICONS[event.type]}</span>
                        <h4 className="text-lg font-bold text-ink-900 dark:text-ink-100">
                          {event.title}
                        </h4>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-bold ${EVENT_TYPE_COLORS[event.type]}`}>
                        {EVENT_TYPE_LABELS[event.type]}
                      </span>
                    </div>

                    <div className="text-sm text-ink-500 mb-2">
                      📅 {event.date}
                      {event.location && ` · 📍 ${event.location}`}
                    </div>

                    <p className="text-ink-600 dark:text-ink-400 mb-3">
                      {event.description}
                    </p>

                    <div className="flex flex-wrap gap-1">
                      {event.tags?.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-xs bg-ink-100 dark:bg-ink-700 text-ink-600 dark:text-ink-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 操作按钮 */}
                  <div className="flex gap-2 mt-2">
                    <button
                      className="px-3 py-1 rounded-lg text-sm font-bold bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                      onClick={() => handleEditEvent(index)}
                    >
                      ✏️ 编辑
                    </button>
                    <button
                      className="px-3 py-1 rounded-lg text-sm font-bold bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                      onClick={() => handleDeleteEvent(index)}
                    >
                      🗑️ 删除
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <div className="text-4xl mb-2">📝</div>
                <div className="text-ink-600 dark:text-ink-400">
                  没有符合条件的里程碑事件
                </div>
              </div>
            )}
          </div>
        </div>
      </RevealOnScroll>
    </div>
  );
}
