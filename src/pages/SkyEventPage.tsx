import { useState } from 'react';
import { SKY_EVENTS } from '@/data/features/skyEvents';
import type { SkyEvent } from '@/data/features/skyEvents';

const CREDIBILITY_MAP = {
  high: { label: '高可信度', color: 'text-green-600 bg-green-100', icon: '确' },
  medium: { label: '中等可信度', color: 'text-yellow-600 bg-yellow-100', icon: '注' },
  low: { label: '推测性', color: 'text-red-600 bg-red-100', icon: '推' },
};

export default function SkyEventPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  const selectedItem = SKY_EVENTS.find(e => e.eventId === selected);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rice to-stone-100 dark:from-ink-950 dark:to-ink-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-ink-900 dark:text-ink-100 font-serif">
            推 历史天象推算
          </h1>
          <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">
            天文反推历史关键时刻 — 当年的天象与天气，验证史书记载
          </p>
        </div>

        {/* 事件列表 */}
        {!showDetail ? (
          <div className="space-y-4">
            {SKY_EVENTS.map(event => {
              const cred = CREDIBILITY_MAP[event.credibility];
              return (
                <button
                  key={event.eventId}
                  onClick={() => { setSelected(event.eventId); setShowDetail(true); }}
                  className="w-full p-5 rounded-xl border border-ink-200 dark:border-ink-700 bg-ink-50/50 dark:bg-ink-800/50 hover:border-accent dark:hover:border-accent transition-all text-left group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-serif font-bold text-ink-800 dark:text-ink-200 group-hover:text-accent transition-colors">
                        {event.eventTitle}
                      </span>
                      <span className="text-xs text-ink-400">
                        {event.year < 0 ? `前${Math.abs(event.year)}年` : `${event.year}年`}
                      </span>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-bold ${cred.color}`}>
                      {cred.icon} {cred.label}
                    </span>
                  </div>
                  <p className="text-sm text-ink-600 dark:text-ink-400 leading-relaxed">
                    {event.astronomicalDescription.slice(0, 80)}...
                  </p>
                </button>
              );
            })}
          </div>
        ) : selectedItem ? (
          <SkyEventDetail event={selectedItem} onBack={() => setShowDetail(false)} />
        ) : null}
      </div>
    </div>
  );
}

function SkyEventDetail({ event, onBack }: { event: SkyEvent; onBack: () => void }) {
  const cred = CREDIBILITY_MAP[event.credibility];

  return (
    <div className="space-y-6">
      {/* 返回 */}
      <button
        onClick={onBack}
        className="text-sm text-ink-500 dark:text-ink-400 hover:text-accent transition-colors flex items-center gap-1"
      >
        ← 返回列表
      </button>

      {/* 标题 */}
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-serif font-bold text-ink-900 dark:text-ink-100">
          推 {event.eventTitle}
        </h2>
        <span className="text-sm text-ink-400">
          {event.year < 0 ? `前${Math.abs(event.year)}年` : `${event.year}年`}
        </span>
        <span className={`px-3 py-1 rounded-lg text-xs font-bold ${cred.color}`}>
          {cred.icon} {cred.label}
        </span>
      </div>

      {/* 天象描述 */}
      <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50/30 dark:bg-blue-900/20">
        <h3 className="text-sm font-bold text-blue-700 dark:text-blue-300 mb-2">天 天象推算</h3>
        <p className="text-sm text-ink-700 dark:text-ink-300 leading-relaxed">
          {event.astronomicalDescription}
        </p>
      </div>

      {/* 历史记载 */}
      <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50/30 dark:bg-amber-900/20">
        <h3 className="text-sm font-bold text-amber-700 dark:text-amber-300 mb-2">史书记载</h3>
        <p className="text-sm text-ink-700 dark:text-ink-300 leading-relaxed italic">
          {event.historicalRecord}
        </p>
      </div>

      {/* 天气推算 */}
      <div className="p-4 rounded-xl border border-green-200 dark:border-green-800 bg-green-50/30 dark:bg-green-900/20">
        <h3 className="text-sm font-bold text-green-700 dark:text-green-300 mb-2">气 天气/气候推算</h3>
        <p className="text-sm text-ink-700 dark:text-ink-300 leading-relaxed">
          {event.weatherEstimate}
        </p>
      </div>

      {/* 验证结论 */}
      <div className="p-4 rounded-xl border border-accent/30 bg-accent/10 dark:bg-accent/5">
        <h3 className="text-sm font-bold text-accent mb-2">确 验证结论</h3>
        <p className="text-sm text-ink-700 dark:text-ink-300 leading-relaxed">
          {event.verification}
        </p>
      </div>

      {/* 科学依据 */}
      <div className="p-4 rounded-xl border border-ink-200 dark:border-ink-700 bg-ink-50/30 dark:bg-ink-800/20">
        <h3 className="text-sm font-bold text-ink-600 dark:text-ink-400 mb-2">🔬 科学依据</h3>
        <p className="text-xs text-ink-500 dark:text-ink-500 leading-relaxed">
          {event.scientificBasis}
        </p>
      </div>
    </div>
  );
}
