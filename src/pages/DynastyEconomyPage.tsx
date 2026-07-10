/**
 * 朝代经济沙盘模拟页面
 * @see history-museum/design/002-innovation-brainstorm.md §14
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import { DYNASTY_ECONOMIES, type DynastyEconomyTemplate, type TurnState, type SandbagEvent, type SandbagOption } from '@/data/features/dynastyEconomy';
import { useT } from '@/i18n/i18n';

type Phase = 'select' | 'playing' | 'ended';

function clamp(v: number, min: number, max: number) { return Math.max(min, Math.min(max, v)); }

export default function DynastyEconomyPage() {
  const t = useT();
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

  function checkEvent(turn: number, t: DynastyEconomyTemplate, _state: TurnState) {
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
    const status = pct > 60 ? t('dynastyEconomy.status_good') : pct > 30 ? t('dynastyEconomy.status_normal') : t('dynastyEconomy.status_danger');
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
            title={t('dynastyEconomy.title')}
            description={t('dynastyEconomy.description')}
          />
        </RevealOnScroll>

        {/* 朝代选择 */}
        {phase === 'select' && (
          <RevealOnScroll direction="up" delay={200}>
            <div className="mt-8 space-y-4">
              {DYNASTY_ECONOMIES.map(tpl => (
                <button
                  key={tpl.id}
                  onClick={() => startGame(tpl)}
                  className="w-full p-5 bg-white/70 dark:bg-ink-900/70 rounded-xl border border-ink-200 dark:border-ink-700 hover:border-accent hover:shadow-lg transition-all text-left group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-bold text-accent border border-accent px-2 py-0.5 rounded">经</span>
                    <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 group-hover:text-accent transition-colors">
                      {tpl.name}
                    </h3>
                    <span className="text-sm text-ink-500">{tpl.period}</span>
                  </div>
                  <p className="text-sm text-ink-600 dark:text-ink-400">
                    {t('dynastyEconomy.treasury')} {tpl.initialTreasury}万贯 · {t('dynastyEconomy.morale')} {tpl.initialMorale} · {t('dynastyEconomy.defense')} {tpl.initialDefense} · {t('dynastyEconomy.population')} {tpl.populationBase}万
                  </p>
                  <div className="text-xs text-ink-400 mt-1">
                    {t('dynastyEconomy.key_events')}{tpl.events.map(e => e.title).join(' → ')}
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
                {template.name} · {t('dynastyEconomy.turn_of', { turn: turnNum, max: MAX_TURNS })}
              </div>
            </div>

            {/* 状态面板 */}
            <div className="p-5 bg-white/70 dark:bg-ink-900/70 rounded-xl border border-ink-200 dark:border-ink-700 space-y-3">
              <StatBar label={`💰 ${t('dynastyEconomy.treasury')}`} value={currentTurn.treasury} max={1000} color="bg-amber-500" />
              <StatBar label={`心 ${t('dynastyEconomy.morale')}`} value={currentTurn.morale} max={100} color="bg-green-500" />
              <StatBar label={`🛡️ ${t('dynastyEconomy.defense')}`} value={currentTurn.defense} max={100} color="bg-blue-500" />
              <StatBar label={`文 ${t('dynastyEconomy.culture')}`} value={currentTurn.culture} max={100} color="bg-purple-500" />
              <div className="flex items-center gap-2 pt-1">
                <span className="text-sm font-bold text-ink-700 dark:text-ink-300 w-20">民 {t('dynastyEconomy.population')}</span>
                <span className="text-lg font-bold text-ink-900 dark:text-ink-100">{currentTurn.population}万</span>
              </div>
            </div>

            {/* 政策调节 */}
            <div className="p-5 bg-white/70 dark:bg-ink-900/70 rounded-xl border border-ink-200 dark:border-ink-700">
              <h3 className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-3 tracking-widest">
                策 {t('dynastyEconomy.policy_this_turn')}
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="font-bold text-ink-700 dark:text-ink-300">{t('dynastyEconomy.tax_rate')}</span>
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
                    {taxRate < 10 ? t('dynastyEconomy.tax_very_low') :
                     taxRate < 15 ? t('dynastyEconomy.tax_low') :
                     taxRate < 20 ? t('dynastyEconomy.tax_medium') :
                     taxRate < 25 ? t('dynastyEconomy.tax_high') :
                     t('dynastyEconomy.tax_very_high')}
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="font-bold text-ink-700 dark:text-ink-300">{t('dynastyEconomy.military_budget')}</span>
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
                    {militaryBudget < 15 ? t('dynastyEconomy.mil_very_low') :
                     militaryBudget < 30 ? t('dynastyEconomy.mil_low') :
                     militaryBudget < 45 ? t('dynastyEconomy.mil_high') :
                     t('dynastyEconomy.mil_very_high')}
                  </div>
                </div>
              </div>
            </div>

            {/* 事件处理 */}
            {pendingEvent && (
              <div className="p-5 bg-red-50/60 dark:bg-red-900/10 rounded-xl border-l-4 border-red-500">
                <h3 className="text-sm font-bold text-red-700 dark:text-red-400 mb-2 tracking-widest">
                  警 {t('dynastyEconomy.historical_event')}{pendingEvent.title}
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
                          {t('dynastyEconomy.effects')}{Object.entries(opt.effects).filter(([,v]) => v !== 0).map(([k,v]) => `${k} ${v>0?'+':''}${v}`).join(' / ')}
                        </div>
                      </button>
                    ))}
                    <button
                      onClick={skipEvent}
                      className="text-sm text-ink-400 hover:text-ink-600 transition-colors"
                    >
                      {t('dynastyEconomy.skip_event')}
                    </button>
                  </div>
                ) : (
                  <div className="text-xs text-ink-400">
                    {t('dynastyEconomy.no_options')}{Object.entries(pendingEvent.effects).filter(([,v]) => v !== 0).map(([k,v]) => `${k} ${v>0?'+':''}${v}`).join(' / ')}
                  </div>
                )}
              </div>
            )}

            {/* 进度历史 */}
            {history.length > 1 && (
              <div className="p-4 bg-ink-50/50 dark:bg-ink-900/30 rounded-lg border border-ink-200 dark:border-ink-700">
                <h4 className="text-xs font-bold text-ink-700 dark:text-ink-300 mb-2 tracking-widest">
                  势 {t('dynastyEconomy.trend')}
                </h4>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  <div className="font-bold text-ink-500">{t('dynastyEconomy.turn')}</div>
                  <div className="font-bold text-amber-600">{t('dynastyEconomy.treasury')}</div>
                  <div className="font-bold text-green-600">{t('dynastyEconomy.morale')}</div>
                  <div className="font-bold text-blue-600">{t('dynastyEconomy.defense')}</div>
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
                {t('dynastyEconomy.turn_next', { turn: turnNum + 1 })}
              </button>
              <button
                onClick={() => setPhase('select')}
                className="px-6 py-3 rounded-lg border-2 border-ink-200 dark:border-ink-700 text-ink-700 dark:text-ink-300 font-bold hover:bg-ink-50 dark:hover:bg-ink-800 transition-colors"
              >
                {t('dynastyEconomy.back_to_select')}
              </button>
            </div>
          </div>
        )}

        {/* 结局 */}
        {phase === 'ended' && currentTurn && template && (
          <div className="mt-8 space-y-6">
            <div className="p-6 bg-gradient-to-br from-accent/10 to-amber-500/10 dark:from-accent/15 dark:to-amber-700/15 rounded-xl text-center">
              <div className="text-2xl mb-2 font-bold text-accent">经</div>
              <h2 className="text-xl font-bold text-ink-900 dark:text-ink-100 mb-1">
                {template.name} · {t('dynastyEconomy.turns_ended', { max: MAX_TURNS })}
              </h2>
              <div className="text-sm text-ink-500 dark:text-ink-400">
                {currentTurn.morale <= 0 ? t('dynastyEconomy.end_morale') :
                 currentTurn.defense <= 0 ? t('dynastyEconomy.end_defense') :
                 currentTurn.treasury <= 0 ? t('dynastyEconomy.end_treasury') :
                 t('dynastyEconomy.end_success')}
              </div>
            </div>

            {/* 最终状态 */}
            <div className="p-5 bg-white/70 dark:bg-ink-900/70 rounded-xl border border-ink-200 dark:border-ink-700 space-y-3">
              <StatBar label={`💰 ${t('dynastyEconomy.treasury')}`} value={currentTurn.treasury} max={1000} color="bg-amber-500" />
              <StatBar label={`心 ${t('dynastyEconomy.morale')}`} value={currentTurn.morale} max={100} color="bg-green-500" />
              <StatBar label={`🛡️ ${t('dynastyEconomy.defense')}`} value={currentTurn.defense} max={100} color="bg-blue-500" />
              <StatBar label={`文 ${t('dynastyEconomy.culture')}`} value={currentTurn.culture} max={100} color="bg-purple-500" />
              <div className="text-center mt-2">
                <span className="text-sm text-ink-500">{t('dynastyEconomy.population')}：</span>
                <span className="font-bold text-ink-900 dark:text-ink-100">{currentTurn.population}万</span>
              </div>
            </div>

            {/* 评分 */}
            <div className="p-5 bg-accent/5 dark:bg-accent/10 rounded-xl text-center">
              <div className="text-xs text-accent tracking-widest mb-1">{t('dynastyEconomy.score')}</div>
              <div className="text-4xl font-bold text-accent">
                {Math.round((currentTurn.treasury / 10 + currentTurn.morale + currentTurn.defense + currentTurn.culture + currentTurn.population / 100) / 5)}
              </div>
              <div className="text-xs text-ink-400 mt-1">{t('dynastyEconomy.max_score')}</div>
            </div>

            {/* 历史结局对比 */}
            <div className="p-5 bg-amber-50/60 dark:bg-amber-900/10 rounded-lg border-l-4 border-amber-500">
              <h3 className="text-sm font-bold text-amber-700 dark:text-amber-400 mb-2 tracking-widest">
                史 {t('dynastyEconomy.historical_outcome')}
              </h3>
              <p className="text-ink-800 dark:text-ink-200 leading-loose">{template.historicalOutcome}</p>
            </div>

            {/* 操作 */}
            <div className="flex gap-3 justify-center">
              <button onClick={() => startGame(template)} className="px-6 py-3 rounded-lg bg-gradient-to-r from-accent to-amber-600 text-white font-bold hover:shadow-lg transition-all">
                {t('dynastyEconomy.retry')}
              </button>
              <button onClick={() => setPhase('select')} className="px-6 py-3 rounded-lg border-2 border-ink-200 dark:border-ink-700 text-ink-700 dark:text-ink-300 font-bold hover:bg-ink-50 dark:hover:bg-ink-800 transition-colors">
                {t('dynastyEconomy.choose_other')}
              </button>
              <Link to="/" className="btn-secondary">{t('dynastyEconomy.back_home')}</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
