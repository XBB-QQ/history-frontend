import { useEffect, useState } from 'react';
import { adminGetEvents, adminGetPersons, adminGetDynasties, adminGetKnowledge } from '@/services/adminApi';

interface Stats {
  events: number;
  persons: number;
  dynasties: number;
  knowledge: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ events: 0, persons: 0, dynasties: 0, knowledge: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      adminGetEvents().then((d) => setStats((s) => ({ ...s, events: d.length }))).catch(() => {}),
      adminGetPersons().then((d) => setStats((s) => ({ ...s, persons: d.length }))).catch(() => {}),
      adminGetDynasties().then((d) => setStats((s) => ({ ...s, dynasties: d.length }))).catch(() => {}),
      adminGetKnowledge().then((d) => setStats((s) => ({ ...s, knowledge: d.length }))).catch(() => {}),
    ]).finally(() => setLoading(false));
  }, []);

  const cards = [
    { label: '事件', count: stats.events, icon: '事', color: 'from-red-500 to-red-700', path: '/admin/events' },
    { label: '人物', count: stats.persons, icon: '人', color: 'from-blue-500 to-blue-700', path: '/admin/persons' },
    { label: '朝代', count: stats.dynasties, icon: '朝', color: 'from-green-500 to-green-700', path: '/admin/dynasties' },
    { label: '知识卡片', count: stats.knowledge, icon: '知', color: 'from-purple-500 to-purple-700', path: '/admin/knowledge' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-6">仪表盘</h1>

      {loading ? (
        <div className="text-center py-20 text-ink-500">加载中...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card) => (
            <a
              key={card.label}
              href={card.path}
              className={`bg-gradient-to-br ${card.color} rounded-xl p-5 text-white hover:scale-105 transition-transform shadow-lg`}
            >
              <div className="text-3xl mb-2">{card.icon}</div>
              <div className="text-sm opacity-80">{card.label}</div>
              <div className="text-3xl font-bold">{card.count}</div>
            </a>
          ))}
        </div>
      )}

      <div className="mt-8 bg-ink-900 rounded-xl p-6 border border-ink-800">
        <h2 className="text-lg font-bold text-white mb-2">快速操作</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {cards.map((card) => (
            <a
              key={card.label}
              href={card.path}
              className="px-4 py-3 rounded-lg bg-ink-800 text-ink-300 hover:bg-ink-700 hover:text-white text-center text-sm transition-colors"
            >
              管理{card.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
