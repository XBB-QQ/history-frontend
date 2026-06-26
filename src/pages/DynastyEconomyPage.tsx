/**
 * 朝代经济沙盘模拟页面
 * @see history-museum/design/002-innovation-brainstorm.md §14
 */

import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import { DYNASTY_ECONOMIES, type DynastyEconomyTemplate, type TurnState, type SandbagEvent, type SandbagOption } from '@/data/dynastyEconomy';

type Phase = 'select' | 'playing' | 'ended';

function clamp(v: number, min: number, max: number) { return Math.max(min, Math.min(max, v)); }

export default function DynastyEconomyPage() {
  const [phase, setPhase] = useState<Phase>('select');
  const [template, setTemplate] = useState<DynastyEconomyTemplate | null>(null);
  const [currentTurn, setCurrentTurn] = useState<TurnState | null>(null);
  const [history, setHistory] = useState<TurnState[]>([]);
  const [turnNum, setTurnNum] = useState(1);
  const [pendingEvent, setPendingEvent] = useState<SandbagEvent | null>(null);
  const [pendingOption, setPendingOption] = useState<SandbagOption | null>(null);
  const [taxRate, setTaxRate] = useState(10); // 税率百分比
  const [militaryBudget, setMilitaryBudget] = useState(20); // 军费百分比

  const MAX_TURNS = 8;

  function startGame(t: DynastyEconomyTemplate) {
    setTemplate(t);
    const initial: TurnState = {
      turn: 1,
      treasury: t.initialTreasury,
      morale: t.initialMorale,
      defense: t.initialDefense,
      culture: t.initialCulture,
      population: t.populationBase,
    };
    setCurrentTurn(initial);
    setHistory([initial]);
    setTurnNum(1);
    setTaxRate(10);
    setMilitaryBudget(20);
    setPendingEvent(null);
    setPendingOption(null);
    setPhase('playing');

    // 检查第1回合是否有事件
    checkEvent(1, t, initial);
  }

  function checkEvent(turn: number, t: DynastyEconomyTemplate, state: TurnState) {
    const event = t.events.find(e => e.turn === turn);
    if (event) {
      setPendingEvent(event);
      setPendingOption(null);
    } else {
      setPendingEvent(null);
    }
  }

  function applyPolicy(baseState: TurnState): TurnState {
    const income = template!.incomePerTurn;
    const taxMultiplier = taxRate / 10; // 税率10%=1.0倍
    const actualIncome = Math.round(income * taxMultiplier);

    // 军费开支
    const milSpend = Math.round(actualIncome * (militaryBudget / 100));
    // 文治开支 = 剩余
    const civSpend = actualIncome - milSpend;

    const treasuryChange = actualIncome - milSpend;
    const moraleChange = taxRate > 20 ? -5 : taxRate < 8 ? 3 : 0;
    const defenseChange = Math.round(milSpend / 50);
    const cultureChange = Math.round(civSpend / 80);
    const popGrowth = Math.round(baseState.population * (taxRate < 15 ? 0.02 : taxRate > 25 ? -0.01 : 0.01));

    return {
      ...baseState,
      treasury: clamp(baseState.treasury + treasuryChange, 0, 9999),
      morale: clamp(baseState.morale + moraleChange, 0, 100),
      defense: clamp(baseState.defense + defenseChange, 0, 100),
      culture: clamp(baseState.culture + cultureChange, 0, 100),
      population: clamp(baseState.population + popGrowth, 100, 99999),
    };
  }

  function nextTurn() {
    if (!currentTurn || !template) return;

    // 应用政策
    let newState = applyPolicy(currentTurn);

    // 应用事件效果
    if (pendingEvent) {
      const eff = pendingOption ? pendingOption.effects : pendingEvent.effects;
      newState = {
        turn: turnNum + 1,
        treasury: clamp(newState.treasury + (eff.treasury || 0), 0, 9999),
        morale: clamp(newState.morale + (eff.morale || 0), 0, 100),
        defense: clamp(newState.defense + (eff.defense || 0), 0, 100),
        culture: clamp(newState.culture + (eff.culture || 0), 0, 100),
        population: clamp(newState.population + (eff.population || 0), 100, 99999),
        eventTitle: pendingEvent.title,
        chosenOption: pendingOption?.label,
      };
    } else {
      newState = { ...newState, turn: turnNum + 1 };
    }

    setHistory(prev => [...prev, newState]);
    setCurrentTurn(newState);
    setTurnNum(prev => prev + 1);
    setPendingEvent(null);
    setPendingOption(null);

    // 检查是否结束
    if (turnNum >= MAX_TURNS || newState.morale <= 0 || newState.treasury <= 0 || newState.defense <= 0) {
      setPhase('ended');
      return;
    }

    // 检查下一回合事件
    checkEvent(turnNum + 1, template, newState);
  }

  function selectOption(opt: SandbagOption) {
    setPendingOption(opt);
  }

  function skipEvent() {
    setPendingOption(null);
  }

  // 渲染状态条
  function StatBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
    const pct = clamp(Math.round(value / max * 100), 0, 100);
    const status = pct > 60 ? '良好' : pct > 30 ? '一般' : '危险';
    const statusColor = pct > 60 ? 'text-green-600' : pct > 30 ? 'text-amber-600' : 'text-red-600';
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm font-bold text-ink-700 dark:text-ink-300 w-20">{label}</span>
        <div className="flex-1 h-3 rounded-full bg-ink-200 dark:bg-ink-700">
          <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${pct}%` }} />
        </div>
        <span className={`text-sm font-bold ${statusColor} w-16`}>{value} <span className="text-xs">{status}</span></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <RevealOnScroll direction="fade">
          <SectionHeader
            label="DYNASTY ECONOMY"
            title="朝代经济沙盘"
            description="模拟朝代经济管理"
          />
        </RevealOnScroll>

        {/* 朝代选择 */}
        {phase === 'select' && (
          <RevealOnScroll direction="up" delay={200}>
            <div className="mt-8 space-y-4">
              {DYNASTY_ECONOMIES.map(t => (
                <button
                  key={t.id}
                  onClick={() => startGame(t)}
                  className="w-full p-5 bg-white/70 dark:bg-ink-900/70 rounded-xl border border-ink-200 dark:border-ink-700 hover:border-accent hover:shadow-lg transition-all text-left group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{t.emoji}</span>
                    <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 group-hover:text-accent transition-colors">
                      {t.name}
                    </h3>
                    <span className="text-sm text-ink-500">{t.period}</span>
                  </div>
                  <p className="text-sm text-ink-600 dark:text-ink-400">
                    国库 {t.initialTreasury}万贯 · 民心 {t.initialMorale} · 边防 {t.initialDefense} · 人口 {t.populationBase}万
                  </p>
                  <div className="text-xs text-ink-400 mt-1">
                    关键事件：{t.events.map(e => e.title).join(' → ')}
                  </div>
                </button>
              ))}
            </div>
          </RevealOnScroll>
        )}

        {/* 游戏界面 */}
        {phase === 'playing' && currentTurn && template && (
          <div className="mt-8 space-y-6">
            {/* 回合信息 */}
            <div className="p-4 bg-gradient-to-br from-accent/5 to-amber-500/5 dark:from-accent/10 dark:to-amber-700/10 rounded-xl border border-accent/20 text-center">
              <div className="text-lg font-bold text-ink-900 dark:text-ink-100">
                {template.emoji} {template.name} · 第 {turnNum} / {MAX_TURNS} 回合
              </div>
            </div>

            {/* 状态面板 */}
            <div className="p-5 bg-white/70 dark:bg-ink-900/70 rounded-xl border border-ink-200 dark:border-ink-700 space-y-3">
              <StatBar label="💰 国库" value={currentTurn.treasury} max={1000} color="bg-amber-500" />
              <StatBar label="心 民心" value={currentTurn.morale} max={100} color="bg-green-500" />
              <StatBar label="🛡️ 边防" value={currentTurn.defense} max={100} color="bg-blue-500" />
              <StatBar label="文 文化" value={currentTurn.culture} max={100} color="bg-purple-500" />
              <div className="flex items-center gap-2 pt-1">
                <span className="text-sm font-bold text-ink-700 dark:text-ink-300 w-20">民 人口</span>
                <span className="text-lg font-bold text-ink-900 dark:text-ink-100">{currentTurn.population}万</span>
              </div>
            </div>

            {/* 政策调节 */}
            <div className="p-5 bg-white/70 dark:bg-ink-900/70 rounded-xl border border-ink-200 dark:border-ink-700">
              <h3 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-3 tracking-widest">
                策 本回合政策
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="font-bold text-ink-700 dark:text-ink-300">税率</span>
                    <span className="text-accent font-bold">{taxRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    step="1"
                    value={taxRate}
                    onChange={e => setTaxRate(Number(e.target.value))}
                    className="w-full h-2 rounded-lg accent-accent"
                  />
                  <div className="text-xs text-ink-400 mt-1">
                    {taxRate < 10 ? '极低税率，民心上升但国库收入少' :
                     taxRate < 15 ? '低税率，民心稳定，收入正常' :
                     taxRate < 20 ? '中等税率，收入可观，民心略降' :
                     taxRate < 25 ? '高税率，国库充盈但民心下降' :
                     '极高税率，民怨沸腾！'}
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="font-bold text-ink-700 dark:text-ink-300">军费占比</span>
                    <span className="text-blue-600 dark:text-blue-400 font-bold">{militaryBudget}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="60"
                    step="5"
                    value={militaryBudget}
                    onChange={e => setMilitaryBudget(Number(e.target.value))}
                    className="w-full h-2 rounded-lg accent-blue-500"
                  />
                  <div className="text-xs text-ink-400 mt-1">
                    {militaryBudget < 15 ? '轻武重文：边防弱，文化强' :
                     militaryBudget < 30 ? '均衡分配：边防和文化同步发展' :
                     militaryBudget < 45 ? '重武轻文：边防强，文化弱' :
                     '穷兵黩武！边防极强但国库和文化衰退'}
                  </div>
                </div>
              </div>
            </div>

            {/* 事件处理 */}
            {pendingEvent && (
              <div className="p-5 bg-red-50/60 dark:bg-red-900/10 rounded-xl border-l-4 border-red-500">
                <h3 className="text-sm font-bold text-red-700 dark:text-red-400 mb-2 tracking-widest">
                  警 历史事件：{pendingEvent.title}
                </h3>
                <p className="text-ink-800 dark:text-ink-200 mb-3">{pendingEvent.description}</p>

                {pendingEvent.options ? (
                  <div className="space-y-2">
                    {pendingEvent.options.map(opt => (
                      <button
                        key={opt.label}
                        onClick={() => selectOption(opt)}
                        className={`w-full p-3 rounded-lg text-left text-sm transition-all ${
                          pendingOption?.label === opt.label
                            ? 'bg-accent text-white font-bold shadow-lg'
                            : 'bg-white/70 dark:bg-ink-800 text-ink-700 dark:text-ink-300 border border-ink-200 dark:border-ink-600 hover:border-accent'
                        }`}
                      >
                        <div className="font-bold">{opt.label}</div>
                        <div className="text-xs opacity-80">{opt.description}</div>
                        <div className="text-xs mt-1">
                          效果：{Object.entries(opt.effects).filter(([k,v]) => v !== 0).map(([k,v]) => `${k} ${v>0?'+':''}${v}`).join(' / ')}
                        </div>
                      </button>
                    ))}
                    <button
                      onClick={skipEvent}
                      className="text-sm text-ink-400 hover:text-ink-600 transition-colors"
                    >
                      不做应对（接受默认影响）
                    </button>
                  </div>
                ) : (
                  <div className="text-xs text-ink-400">
                    无可选方案，将受默认影响：{Object.entries(pendingEvent.effects).filter(([k,v]) => v !== 0).map(([k,v]) => `${k} ${v>0?'+':''}${v}`).join(' / ')}
                  </div>
                )}
              </div>
            )}

            {/* 进度历史 */}
            {history.length > 1 && (
              <div className="p-4 bg-ink-50/50 dark:bg-ink-900/30 rounded-lg border border-ink-200 dark:border-ink-700">
                <h4 className="text-xs font-bold text-ink-700 dark:text-ink-300 mb-2 tracking-widest">
                  势 国运走势
                </h4>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  <div className="font-bold text-ink-500">回合</div>
                  <div className="font-bold text-amber-600">国库</div>
                  <div className="font-bold text-green-600">民心</div>
                  <div className="font-bold text-blue-600">边防</div>
                  {history.slice(-5).map(h => (
                    <React.Fragment key={h.turn}>
                      <div className="text-ink-500">{h.turn}{h.eventTitle ? `(${h.eventTitle.slice(0,4)})` : ''}</div>
                      <div className="text-ink-900 dark:text-ink-100">{h.treasury}</div>
                      <div className="text-ink-900 dark:text-ink-100">{h.morale}</div>
                      <div className="text-ink-900 dark:text-ink-100">{h.defense}</div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}

            {/* 下一回合按钮 */}
            <div className="flex gap-3 justify-center">
              <button
                onClick={nextTurn}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-accent to-amber-600 text-white font-bold hover:shadow-lg transition-all"
              >
                第 {turnNum + 1} 回合 →
              </button>
              <button
                onClick={() => setPhase('select')}
                className="px-6 py-3 rounded-lg border-2 border-ink-200 dark:border-ink-700 text-ink-700 dark:text-ink-300 font-bold hover:bg-ink-50 dark:hover:bg-ink-800 transition-colors"
              >
                返回选择
              </button>
            </div>
          </div>
        )}

        {/* 结局 */}
        {phase === 'ended' && currentTurn && template && (
          <div className="mt-8 space-y-6">
            <div className="p-6 bg-gradient-to-br from-accent/10 to-amber-500/10 dark:from-accent/15 dark:to-amber-700/15 rounded-xl text-center">
              <div className="text-3xl mb-2">{template.emoji}</div>
              <h2 className="text-xl font-bold text-ink-900 dark:text-ink-100 mb-1">
                {template.name} · {MAX_TURNS} 回合终
              </h2>
              <div className="text-sm text-ink-500 dark:text-ink-400">
                {currentTurn.morale <= 0 ? '民心崩溃，王朝覆灭！' :
                 currentTurn.defense <= 0 ? '边防崩溃，外敌入侵！' :
                 currentTurn.treasury <= 0 ? '国库空虚，财政崩溃！' :
                 '成功维持国运！'}
              </div>
            </div>

            {/* 最终状态 */}
            <div className="p-5 bg-white/70 dark:bg-ink-900/70 rounded-xl border border-ink-200 dark:border-ink-700 space-y-3">
              <StatBar label="💰 国库" value={currentTurn.treasury} max={1000} color="bg-amber-500" />
              <StatBar label="心 民心" value={currentTurn.morale} max={100} color="bg-green-500" />
              <StatBar label="🛡️ 边防" value={currentTurn.defense} max={100} color="bg-blue-500" />
              <StatBar label="文 文化" value={currentTurn.culture} max={100} color="bg-purple-500" />
              <div className="text-center mt-2">
                <span className="text-sm text-ink-500">人口：</span>
                <span className="font-bold text-ink-900 dark:text-ink-100">{currentTurn.population}万</span>
              </div>
            </div>

            {/* 评分 */}
            <div className="p-5 bg-accent/5 dark:bg-accent/10 rounded-xl text-center">
              <div className="text-xs text-accent tracking-widest mb-1">综合评分</div>
              <div className="text-4xl font-bold text-accent">
                {Math.round((currentTurn.treasury / 10 + currentTurn.morale + currentTurn.defense + currentTurn.culture + currentTurn.population / 100) / 5)}
              </div>
              <div className="text-xs text-ink-400 mt-1">满分 100</div>
            </div>

            {/* 历史结局对比 */}
            <div className="p-5 bg-amber-50/60 dark:bg-amber-900/10 rounded-lg border-l-4 border-amber-500">
              <h3 className="text-sm font-bold text-amber-700 dark:text-amber-400 mb-2 tracking-widest">
                史 真实历史结局
              </h3>
              <p className="text-ink-800 dark:text-ink-200 leading-loose">{template.historicalOutcome}</p>
            </div>

            {/* 操作 */}
            <div className="flex gap-3 justify-center">
              <button onClick={() => startGame(template)} className="px-6 py-3 rounded-lg bg-gradient-to-r from-accent to-amber-600 text-white font-bold hover:shadow-lg transition-all">
                重新挑战
              </button>
              <button onClick={() => setPhase('select')} className="px-6 py-3 rounded-lg border-2 border-ink-200 dark:border-ink-700 text-ink-700 dark:text-ink-300 font-bold hover:bg-ink-50 dark:hover:bg-ink-800 transition-colors">
                选择其他朝代
              </button>
              <Link to="/" className="btn-secondary">返回首页</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
