/**
 * 跨时空辩论引擎页面
 * @see history-museum/design/002-innovation-brainstorm.md §1
 */

import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import { DEBATE_TOPICS } from '@/data/debateTopics';
import { DEBATE_FIGURE_PAIRS } from '@/data/debateFigures';
import { getFigureById } from '@/data/figures';
import { generateDebateRound, generateDebateConclusion, askDebateQuestion, type DebateRound } from '@/utils/debateEngine';

type Phase = 'select' | 'debating' | 'concluded';

export default function CrossDebatePage() {
  const [phase, setPhase] = useState<Phase>('select');
  const [topicIdx, setTopicIdx] = useState(0);
  const [rounds, setRounds] = useState<DebateRound[]>([]);
  const [loading, setLoading] = useState(false);
  const [conclusion, setConclusion] = useState('');
  const [userQuestion, setUserQuestion] = useState('');
  const [userResponses, setUserResponses] = useState<{ proResponse?: string; conResponse?: string }[]>([]);
  const [proVotes, setProVotes] = useState(0);
  const [conVotes, setConVotes] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const topic = DEBATE_TOPICS[topicIdx];
  const pair = DEBATE_FIGURE_PAIRS.find(p => p.topicId === topic.id);
  const proFigure = pair ? getFigureById(pair.proFigureId) : null;
  const conFigure = pair ? getFigureById(pair.conFigureId) : null;

  async function startDebate(idx: number) {
    setTopicIdx(idx);
    setRounds([]);
    setConclusion('');
    setUserResponses([]);
    setProVotes(0);
    setConVotes(0);
    setPhase('debating');
    setLoading(true);

    try {
      // 生成第1轮
      const r1 = await generateDebateRound(DEBATE_TOPICS[idx], DEBATE_FIGURE_PAIRS[idx], []);
      setRounds([r1]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  async function nextRound() {
    if (rounds.length >= 3) {
      // 最多3轮，然后出结论
      setLoading(true);
      try {
        const conc = await generateDebateConclusion(topic, rounds);
        setConclusion(conc);
        setPhase('concluded');
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
      return;
    }

    setLoading(true);
    try {
      const newRound = await generateDebateRound(topic, pair!, rounds);
      setRounds(prev => [...prev, newRound]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  async function handleAsk() {
    if (!userQuestion.trim()) return;
    setLoading(true);
    try {
      const resp = await askDebateQuestion(userQuestion, topic, pair!, rounds, 'both');
      setUserResponses(prev => [...prev, resp]);
      setUserQuestion('');
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <RevealOnScroll direction="fade">
          <SectionHeader
            label="CROSS-TIME DEBATE"
            title="跨时空辩论场"
            description="不同时代的人怎么想同一件事"
          />
        </RevealOnScroll>

        {/* 话题选择 */}
        {phase === 'select' && (
          <RevealOnScroll direction="up" delay={200}>
            <div className="mt-8 space-y-4">
              {DEBATE_TOPICS.map((t, idx) => {
                const p = DEBATE_FIGURE_PAIRS[idx];
                const pro = getFigureById(p.proFigureId);
                const con = getFigureById(p.conFigureId);
                return (
                  <button
                    key={t.id}
                    onClick={() => startDebate(idx)}
                    className="w-full p-5 bg-white/70 dark:bg-ink-900/70 rounded-xl border border-ink-200 dark:border-ink-700 hover:border-accent hover:shadow-lg transition-all text-left group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{pro?.emoji || '👤'}</span>
                        <span className="text-sm font-bold text-accent">{pro?.name || '正方'}</span>
                      </div>
                      <span className="text-lg font-bold text-ink-400">⚔️</span>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{con?.emoji || '👤'}</span>
                        <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{con?.name || '反方'}</span>
                      </div>
                    </div>
                    <div className="mt-2 text-lg font-bold text-ink-900 dark:text-ink-100 group-hover:text-accent transition-colors">
                      {t.title}
                    </div>
                    <div className="text-xs text-ink-500 dark:text-ink-400 mt-1">
                      {t.era} · {t.description.slice(0, 60)}…
                    </div>
                  </button>
                );
              })}
            </div>
          </RevealOnScroll>
        )}

        {/* 辩论进行中 */}
        {phase === 'debating' && (
          <div className="mt-8 space-y-6">
            {/* 话题卡片 */}
            <div className="p-5 bg-gradient-to-br from-accent/5 to-indigo-500/5 dark:from-accent/10 dark:to-indigo-700/10 rounded-xl border border-accent/20">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                <h2 className="text-xl font-bold text-ink-900 dark:text-ink-100">{topic.title}</h2>
                <span className="text-sm text-ink-500">{topic.era}</span>
              </div>
              <p className="text-sm text-ink-600 dark:text-ink-400">{topic.description}</p>
              {/* 辩手信息 */}
              {proFigure && conFigure && (
                <div className="mt-3 flex items-center justify-center gap-6">
                  <div className="text-center">
                    <div className="text-3xl mb-1">{proFigure.emoji}</div>
                    <div className="text-sm font-bold text-accent">{proFigure.name}</div>
                    <div className="text-xs text-ink-400">{topic.proSide.label}</div>
                  </div>
                  <div className="text-2xl text-ink-400 font-bold">⚔️</div>
                  <div className="text-center">
                    <div className="text-3xl mb-1">{conFigure.emoji}</div>
                    <div className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{conFigure.name}</div>
                    <div className="text-xs text-ink-400">{topic.conSide.label}</div>
                  </div>
                </div>
              )}
            </div>

            {/* 辩论回合 */}
            {rounds.map((r) => (
              <div key={r.round} className="space-y-3">
                <div className="text-center text-sm font-bold text-ink-500 tracking-widest">
                  — 第 {r.round} 轮 —
                </div>
                {/* 正方 */}
                <div className="p-4 bg-accent/5 dark:bg-accent/10 rounded-lg border-l-4 border-accent">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{proFigure?.emoji}</span>
                    <span className="font-bold text-accent">{proFigure?.name || '正方'}</span>
                  </div>
                  <p className="text-ink-800 dark:text-ink-200 leading-relaxed">{r.proArgument}</p>
                  <button
                    onClick={() => setProVotes(v => v + 1)}
                    className="mt-2 text-xs text-accent hover:underline"
                  >
                    👍 有道理 ({proVotes})
                  </button>
                </div>
                {/* 反方 */}
                <div className="p-4 bg-indigo-500/5 dark:bg-indigo-700/10 rounded-lg border-l-4 border-indigo-500">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{conFigure?.emoji}</span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">{conFigure?.name || '反方'}</span>
                  </div>
                  <p className="text-ink-800 dark:text-ink-200 leading-relaxed">{r.conArgument}</p>
                  <button
                    onClick={() => setConVotes(v => v + 1)}
                    className="mt-2 text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    👍 有道理 ({conVotes})
                  </button>
                </div>
              </div>
            ))}

            {/* Loading */}
            {loading && (
              <div className="text-center py-4">
                <div className="inline-block animate-pulse text-2xl">⚖️</div>
                <div className="text-sm text-ink-500 mt-1">辩手正在思考…</div>
              </div>
            )}

            <div ref={scrollRef} />

            {/* 用户提问 */}
            {!loading && rounds.length > 0 && (
              <div className="p-4 bg-ink-50 dark:bg-ink-900 rounded-lg border border-ink-200 dark:border-ink-700">
                <h4 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-2">💬 向辩手提问</h4>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={userQuestion}
                    onChange={e => setUserQuestion(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleAsk()}
                    placeholder="你想问什么？两位辩手都会回答…"
                    className="flex-1 px-3 py-2 rounded-lg bg-white dark:bg-ink-800 border border-ink-200 dark:border-ink-600 text-sm focus:border-accent outline-none"
                    disabled={loading}
                  />
                  <button
                    onClick={handleAsk}
                    disabled={loading || !userQuestion.trim()}
                    className="px-4 py-2 rounded-lg bg-accent text-white text-sm font-bold disabled:opacity-50"
                  >
                    提问
                  </button>
                </div>
                {/* 用户提问的回答 */}
                {userResponses.map((resp, idx) => (
                  <div key={idx} className="mt-3 space-y-2">
                    {resp.proResponse && (
                      <div className="text-sm text-accent">
                        <b>{proFigure?.name}：</b>{resp.proResponse}
                      </div>
                    )}
                    {resp.conResponse && (
                      <div className="text-sm text-indigo-600 dark:text-indigo-400">
                        <b>{conFigure?.name}：</b>{resp.conResponse}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* 操作按钮 */}
            {!loading && (
              <div className="flex gap-3 justify-center">
                <button
                  onClick={nextRound}
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-accent to-amber-600 text-white font-bold hover:shadow-lg transition-all"
                >
                  {rounds.length >= 3 ? '📜 出结论' : `第 ${rounds.length + 1} 轮 →`}
                </button>
                <button
                  onClick={() => { setPhase('select'); setRounds([]); }}
                  className="px-6 py-3 rounded-lg border-2 border-ink-200 dark:border-ink-700 text-ink-700 dark:text-ink-300 font-bold hover:bg-ink-50 dark:hover:bg-ink-800 transition-colors"
                >
                  返回选择
                </button>
              </div>
            )}
          </div>
        )}

        {/* 结论 */}
        {phase === 'concluded' && (
          <div className="mt-8 space-y-6">
            {/* 投票统计 */}
            <div className="p-5 bg-gradient-to-br from-accent/10 to-indigo-500/10 dark:from-accent/15 dark:to-indigo-700/15 rounded-xl text-center">
              <h3 className="text-sm font-bold text-ink-700 dark:text-ink-300 tracking-widest mb-3">
                观众投票结果
              </h3>
              <div className="flex items-center justify-center gap-8">
                <div>
                  <div className="text-2xl">{proFigure?.emoji}</div>
                  <div className="text-lg font-bold text-accent">{proFigure?.name}</div>
                  <div className="text-3xl font-bold text-accent">{proVotes}</div>
                </div>
                <div className="text-4xl text-ink-300">⚖️</div>
                <div>
                  <div className="text-2xl">{conFigure?.emoji}</div>
                  <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{conFigure?.name}</div>
                  <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{conVotes}</div>
                </div>
              </div>
            </div>

            {/* 所有辩论回合 */}
            {rounds.map((r) => (
              <div key={r.round} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-accent/5 rounded-lg text-sm">
                  <b className="text-accent">{proFigure?.name}：</b>{r.proArgument}
                </div>
                <div className="p-3 bg-indigo-500/5 rounded-lg text-sm">
                  <b className="text-indigo-600 dark:text-indigo-400">{conFigure?.name}：</b>{r.conArgument}
                </div>
              </div>
            ))}

            {/* 史官评语 */}
            {conclusion && (
              <div className="p-5 bg-white/70 dark:bg-ink-900/70 rounded-xl border border-ink-200 dark:border-ink-700">
                <h3 className="text-sm font-bold text-accent mb-3 tracking-widest">史官评语</h3>
                <p className="text-ink-800 dark:text-ink-200 leading-loose whitespace-pre-line">{conclusion}</p>
              </div>
            )}

            {/* 专家观点 */}
            <div className="p-5 bg-amber-50/60 dark:bg-amber-900/10 rounded-lg border-l-4 border-amber-500">
              <h3 className="text-sm font-bold text-amber-700 dark:text-amber-400 mb-2 tracking-widest">
                💡 学术观点
              </h3>
              <p className="text-ink-800 dark:text-ink-200 leading-loose">{topic.expertView}</p>
            </div>

            {/* 操作按钮 */}
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => { setPhase('select'); setRounds([]); setConclusion(''); }}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-accent to-amber-600 text-white font-bold hover:shadow-lg transition-all"
              >
                选择新话题
              </button>
              <Link to="/" className="btn-secondary">
                返回首页
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
