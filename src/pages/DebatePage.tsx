import { useState } from 'react';
import { DEBATE_TOPICS } from '@/data/debateTopics';
import type { DebateTopic } from '@/data/debateTopics';

export default function DebatePage() {
  const [selectedId, setSelectedId] = useState<string>(DEBATE_TOPICS[0].id);
  const [votes, setVotes] = useState<Record<string, 'pro' | 'con'>>({});

  const topic = DEBATE_TOPICS.find(t => t.id === selectedId);
  if (!topic) return null;

  const myVote = votes[selectedId];
  const totalPro = Object.values(votes).filter(v => v === 'pro').length + 3;
  const totalCon = Object.values(votes).filter(v => v === 'con').length + 2;
  const total = totalPro + totalCon;

  return (
    <div className="min-h-screen bg-gradient-to-b from-rice to-stone-100 dark:from-ink-950 dark:to-ink-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 标题 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-ink-900 dark:text-ink-100 font-serif">
            ⚖️ 历史辩论场
          </h1>
          <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">
            历史没有标准答案 — 站队投票，思考你的史观
          </p>
        </div>

        {/* 话题选择 */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {DEBATE_TOPICS.map(t => (
            <button
              key={t.id}
              onClick={() => setSelectedId(t.id)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all border ${
                selectedId === t.id
                  ? 'border-accent bg-accent text-white'
                  : 'border-ink-200 dark:border-ink-700 text-ink-600 dark:text-ink-400 hover:border-accent/50'
              }`}
            >
              {t.era} · {t.title.slice(0, 12)}...
            </button>
          ))}
        </div>

        {/* 话题内容 */}
        <div className="space-y-6">
          {/* 话题描述 */}
          <div className="p-5 rounded-xl border border-ink-200 dark:border-ink-700 bg-ink-50/50 dark:bg-ink-800/50">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold px-2 py-1 rounded bg-amber-100 text-amber-700">
                {topic.era}
              </span>
              {topic.tags.map(tag => (
                <span key={tag} className="text-xs text-ink-400"># {tag}</span>
              ))}
            </div>
            <h2 className="text-xl font-serif font-bold text-ink-900 dark:text-ink-100 mb-2">
              ⚖️ {topic.title}
            </h2>
            <p className="text-sm text-ink-600 dark:text-ink-400 leading-relaxed">
              {topic.description}
            </p>
          </div>

          {/* 投票区域 */}
          <div className="grid grid-cols-2 gap-4">
            {/* 正方 */}
            <button
              onClick={() => setVotes(v => ({ ...v, [selectedId]: 'pro' }))}
              className={`p-5 rounded-xl border-2 transition-all text-left ${
                myVote === 'pro'
                  ? 'border-red-400 bg-red-50/50 dark:bg-red-900/20'
                  : 'border-ink-200 dark:border-ink-700 hover:border-red-400/50'
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{topic.proSide.icon}</span>
                <span className="font-bold text-red-700 dark:text-red-300">{topic.proSide.label}</span>
              </div>
              <ul className="space-y-2">
                {topic.proSide.arguments.map((arg, i) => (
                  <li key={i} className="text-sm text-ink-700 dark:text-ink-300">
                    <span className="text-red-500 font-bold mr-1">{i + 1}.</span> {arg}
                  </li>
                ))}
              </ul>
            </button>

            {/* 反方 */}
            <button
              onClick={() => setVotes(v => ({ ...v, [selectedId]: 'con' }))}
              className={`p-5 rounded-xl border-2 transition-all text-left ${
                myVote === 'con'
                  ? 'border-blue-400 bg-blue-50/50 dark:bg-blue-900/20'
                  : 'border-ink-200 dark:border-ink-700 hover:border-blue-400/50'
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{topic.conSide.icon}</span>
                <span className="font-bold text-blue-700 dark:text-blue-300">{topic.conSide.label}</span>
              </div>
              <ul className="space-y-2">
                {topic.conSide.arguments.map((arg, i) => (
                  <li key={i} className="text-sm text-ink-700 dark:text-ink-300">
                    <span className="text-blue-500 font-bold mr-1">{i + 1}.</span> {arg}
                  </li>
                ))}
              </ul>
            </button>
          </div>

          {/* 投票统计 */}
          {myVote && (
            <div className="p-4 rounded-xl border border-ink-200 dark:border-ink-700">
              <h3 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-3">📊 投票统计</h3>
              <div className="flex items-center gap-4 mb-2">
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-red-700">{topic.proSide.label}</span>
                    <span>{totalPro}票 ({Math.round(totalPro/total*100)}%)</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-ink-200 dark:bg-ink-700">
                    <div className="h-full rounded-full bg-red-400 transition-all" style={{ width: `${(totalPro/total)*100}%` }} />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-blue-700">{topic.conSide.label}</span>
                    <span>{totalCon}票 ({Math.round(totalCon/total*100)}%)</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-ink-200 dark:bg-ink-700">
                    <div className="h-full rounded-full bg-blue-400 transition-all" style={{ width: `${(totalCon/total)*100}%` }} />
                  </div>
                </div>
              </div>
              <p className="text-xs text-ink-400 text-center">你投了：{myVote === 'pro' ? topic.proSide.label : topic.conSide.label}</p>
            </div>
          )}

          {/* 专家观点 */}
          <div className="p-4 rounded-xl border border-accent/30 bg-accent/10 dark:bg-accent/5">
            <h3 className="text-sm font-bold text-accent mb-2">🎓 学者视角</h3>
            <p className="text-sm text-ink-700 dark:text-ink-300 leading-relaxed">
              {topic.expertView}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
