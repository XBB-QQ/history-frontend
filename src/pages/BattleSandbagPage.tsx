/**
 * 战役推演沙盘页面 — 简化版
 * @see history-museum/design/002-innovation-brainstorm.md §15
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import { BATTLE_LIST, calculateBattle, type BattleTemplate, type TacticalOption, type BattleResult } from '@/data/battleSandbag';

type Phase = 'select' | 'deploy' | 'result';

const TERRAIN_LABELS: Record<string, { emoji: string; label: string }> = {
  river: { emoji: '水', label: '水战' },
  mountain: { emoji: '山', label: '山地' },
  plain: { emoji: '原', label: '平原' },
  city: { emoji: '🏯', label: '城战' },
};

const OUTCOME_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  victory: { bg: 'bg-green-500/10 dark:bg-green-700/10', text: 'text-green-700 dark:text-green-400', label: '胜利' },
  defeat: { bg: 'bg-red-500/10 dark:bg-red-700/10', text: 'text-red-700 dark:text-red-400', label: '失败' },
  draw: { bg: 'bg-amber-500/10 dark:bg-amber-700/10', text: 'text-amber-700 dark:text-amber-400', label: '僵持' },
};

export default function BattleSandbagPage() {
  const [phase, setPhase] = useState<Phase>('select');
  const [battle, setBattle] = useState<BattleTemplate | null>(null);
  const [selectedTactic, setSelectedTactic] = useState<TacticalOption | null>(null);
  const [result, setResult] = useState<BattleResult | null>(null);

  function startBattle(b: BattleTemplate) {
    setBattle(b);
    setSelectedTactic(null);
    setResult(null);
    setPhase('deploy');
  }

  function executeBattle() {
    if (!battle || !selectedTactic) return;
    const res = calculateBattle(selectedTactic, battle);
    setResult(res);
    setPhase('result');
  }

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <RevealOnScroll direction="fade">
          <SectionHeader
            label="BATTLE SIMULATOR"
            title="战役推演沙盘"
            description="用兵棋推演重现经典战役"
          />
        </RevealOnScroll>

        {/* 战役选择 */}
        {phase === 'select' && (
          <RevealOnScroll direction="up" delay={200}>
            <div className="mt-8 space-y-4">
              {BATTLE_LIST.map(b => {
                const terrain = TERRAIN_LABELS[b.terrain];
                return (
                  <button
                    key={b.id}
                    onClick={() => startBattle(b)}
                    className="w-full p-5 bg-white/70 dark:bg-ink-900/70 rounded-xl border border-ink-200 dark:border-ink-700 hover:border-accent hover:shadow-lg transition-all text-left group"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{b.emoji}</span>
                      <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 group-hover:text-accent">
                        {b.name}
                      </h3>
                      <span className="text-sm text-ink-500">{b.yearDisplay} · {b.dynasty}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-ink-100 dark:bg-ink-800 text-ink-600">
                        {terrain.emoji} {terrain.label}
                      </span>
                    </div>
                    <p className="text-sm text-ink-600 dark:text-ink-400">{b.description}</p>
                    <div className="mt-2 flex gap-4 text-xs">
                      <span className="text-green-600">🛡️ {b.redForce.name} ({b.redForce.commander})</span>
                      <span className="text-red-600">战 {b.blueForce.name} ({b.blueForce.commander})</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </RevealOnScroll>
        )}

        {/* 战术部署 */}
        {phase === 'deploy' && battle && (
          <div className="mt-8 space-y-6">
            {/* 战场概况 */}
            <div className="p-5 bg-gradient-to-br from-accent/5 to-red-500/5 dark:from-accent/10 dark:to-red-700/10 rounded-xl border border-accent/20">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{battle.emoji}</span>
                <h2 className="text-xl font-bold text-ink-900 dark:text-ink-100">{battle.name}</h2>
                <span className="text-sm text-ink-500">{battle.yearDisplay} · {battle.dynasty}</span>
              </div>
              <p className="text-sm text-ink-800 dark:text-ink-200">{battle.description}</p>
            </div>

            {/* 双方兵力对比 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* 红方 */}
              <div className="p-4 bg-green-500/10 dark:bg-green-700/10 rounded-lg border-l-4 border-green-500">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-green-700 dark:text-green-400">🛡️ {battle.redForce.name}</span>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between"><span>统帅</span><span className="font-bold">{battle.redForce.commander}</span></div>
                  <div className="flex justify-between"><span>步兵</span><span className="font-bold">{battle.redForce.infantry}万</span></div>
                  <div className="flex justify-between"><span>骑兵</span><span className="font-bold">{battle.redForce.cavalry}万</span></div>
                  {battle.redForce.navy > 0 && <div className="flex justify-between"><span>水军</span><span className="font-bold">{battle.redForce.navy}万</span></div>}
                  <div className="flex justify-between"><span>士气</span><span className="font-bold text-green-600">{battle.redForce.morale}</span></div>
                  <div className="text-xs text-ink-400 mt-1">{battle.redForce.special}</div>
                </div>
              </div>
              {/* 蓝方 */}
              <div className="p-4 bg-red-500/10 dark:bg-red-700/10 rounded-lg border-l-4 border-red-500">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-red-700 dark:text-red-400">战 {battle.blueForce.name}</span>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between"><span>统帅</span><span className="font-bold">{battle.blueForce.commander}</span></div>
                  <div className="flex justify-between"><span>步兵</span><span className="font-bold">{battle.blueForce.infantry}万</span></div>
                  <div className="flex justify-between"><span>骑兵</span><span className="font-bold">{battle.blueForce.cavalry}万</span></div>
                  {battle.blueForce.navy > 0 && <div className="flex justify-between"><span>水军</span><span className="font-bold">{battle.blueForce.navy}万</span></div>}
                  <div className="flex justify-between"><span>士气</span><span className="font-bold text-red-600">{battle.blueForce.morale}</span></div>
                  <div className="text-xs text-ink-400 mt-1">{battle.blueForce.special}</div>
                </div>
              </div>
            </div>

            {/* 战术选择 */}
            <div className="p-5 bg-white/70 dark:bg-ink-900/70 rounded-xl border border-ink-200 dark:border-ink-700">
              <h3 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-3 tracking-widest">
                战 选择战术
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {battle.tactics.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTactic(t)}
                    className={`p-4 rounded-lg text-left transition-all ${
                      selectedTactic?.id === t.id
                        ? 'bg-accent text-white font-bold shadow-lg'
                        : 'bg-ink-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-600 hover:border-accent'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{t.emoji}</span>
                      <span className={`font-bold ${selectedTactic?.id === t.id ? 'text-white' : 'text-ink-900 dark:text-ink-100'}`}>
                        {t.label}
                      </span>
                    </div>
                    <p className={`text-sm ${selectedTactic?.id === t.id ? 'text-white/80' : 'text-ink-600 dark:text-ink-400'}`}>
                      {t.description}
                    </p>
                    <div className={`text-xs mt-2 ${selectedTactic?.id === t.id ? 'text-white/60' : 'text-ink-400'}`}>
                      地形适配：{t.terrainBonus > 1.5 ? '极佳' : t.terrainBonus > 1 ? '良好' : '一般'} · 风险：{t.risk}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 操作 */}
            <div className="flex gap-3 justify-center">
              <button
                onClick={executeBattle}
                disabled={!selectedTactic}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-accent to-amber-600 text-white font-bold hover:shadow-lg disabled:opacity-50 transition-all"
              >
                战 开战
              </button>
              <button onClick={() => setPhase('select')} className="px-6 py-3 rounded-lg border-2 border-ink-200 dark:border-ink-700 text-ink-700 dark:text-ink-300 font-bold hover:bg-ink-50 dark:hover:bg-ink-800 transition-colors">
                返回选择
              </button>
            </div>
          </div>
        )}

        {/* 战斗结果 */}
        {phase === 'result' && battle && result && selectedTactic && (
          <div className="mt-8 space-y-6">
            {/* 结局 */}
            <div className={`p-6 rounded-xl ${OUTCOME_STYLES[result.outcome].bg} text-center`}>
              <div className="text-4xl mb-2">
                {result.outcome === 'victory' ? '胜' : result.outcome === 'defeat' ? '败' : '战'}
              </div>
              <h2 className={`text-xl font-bold ${OUTCOME_STYLES[result.outcome].text}`}>
                {OUTCOME_STYLES[result.outcome].label}！
              </h2>
              <p className="text-ink-800 dark:text-ink-200 mt-2">{result.narrative}</p>
            </div>

            {/* 战力对比图 */}
            <div className="p-4 bg-ink-50/50 dark:bg-ink-900/30 rounded-lg border border-ink-200 dark:border-ink-700">
              <h4 className="text-xs font-bold text-ink-700 dark:text-ink-300 mb-3 tracking-widest">
                力 战力对比
              </h4>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm font-bold text-green-700 dark:text-green-400">{battle.redForce.name}</div>
                  <div className="text-2xl font-bold text-green-600">{Math.round(result.redScore)}</div>
                </div>
                <div className="flex-1">
                  <div className="flex h-6 rounded-full overflow-hidden bg-ink-200 dark:bg-ink-700">
                    <div className="bg-green-500 transition-all" style={{ width: `${clamp(result.redScore / (result.redScore + result.blueScore) * 100, 5, 95)}%` }} />
                    <div className="bg-red-500 transition-all" style={{ width: `${clamp(result.blueScore / (result.redScore + result.blueScore) * 100, 5, 95)}%` }} />
                  </div>
                </div>
                <div>
                  <div className="text-sm font-bold text-red-700 dark:text-red-400">{battle.blueForce.name}</div>
                  <div className="text-2xl font-bold text-red-600">{Math.round(result.blueScore)}</div>
                </div>
              </div>
            </div>

            {/* 你 vs 历史 */}
            <div className="p-5 bg-white/70 dark:bg-ink-900/70 rounded-xl border border-ink-200 dark:border-ink-700">
              <h3 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-3 tracking-widest">
                史 你的决策 vs 历史实际
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <div className="text-xs text-accent font-bold mb-1">你的战术</div>
                  <div className="text-sm font-bold">{selectedTactic.emoji} {selectedTactic.label}</div>
                  <div className="text-xs text-ink-400">{selectedTactic.description}</div>
                  <div className="text-xs text-accent mt-1">结果：{OUTCOME_STYLES[result.outcome].label}</div>
                </div>
                <div className="p-3 bg-amber-50/60 dark:bg-amber-900/10 rounded-lg">
                  <div className="text-xs text-amber-700 dark:text-amber-400 font-bold mb-1">历史实际</div>
                  <div className="text-xs text-ink-600 dark:text-ink-400">{battle.historicalResult}</div>
                </div>
              </div>
            </div>

            {/* 历史教训 */}
            <div className="p-5 bg-gradient-to-br from-amber-500/10 to-accent/10 dark:from-amber-700/15 dark:to-accent/15 rounded-lg">
              <h3 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-2 tracking-widest">
                注 历史教训
              </h3>
              <p className="text-ink-800 dark:text-ink-200 leading-loose italic">{battle.lesson}</p>
            </div>

            {/* 操作 */}
            <div className="flex gap-3 justify-center">
              <button onClick={() => { setPhase('deploy'); setSelectedTactic(null); setResult(null); }} className="px-6 py-3 rounded-lg bg-gradient-to-r from-accent to-amber-600 text-white font-bold hover:shadow-lg transition-all">
                重新选择战术
              </button>
              <button onClick={() => setPhase('select')} className="px-6 py-3 rounded-lg border-2 border-ink-200 dark:border-ink-700 text-ink-700 dark:text-ink-300 font-bold hover:bg-ink-50 dark:hover:bg-ink-800 transition-colors">
                其他战役
              </button>
              <Link to="/" className="btn-secondary">返回首页</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function clamp(v: number, min: number, max: number) { return Math.max(min, Math.min(max, v)); }
