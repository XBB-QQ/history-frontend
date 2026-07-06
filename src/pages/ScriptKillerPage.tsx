/**
 * 历史剧本杀 — 带 AI DM 增强
 * @see ITERATIONS.md #78, #91
 *
 * 原有静态流程 + AI 动态审问 + 线索状态机 + 真相史实对照
 */

import { useState, useMemo, useCallback } from 'react';
import {
  SCRIPTS,
  type Clue,
  type Character,
} from '@/data/features/scriptKillerData';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import {
  interrogateCharacter,
  getDMHint,
  compareTruthWithHistory,
  type DMMessage,
  type InterrogationResult,
  type TruthComparison,
} from '@/features/mysteryDM';
import { usePersonaStore } from '@/store/personaStore';
import { useT } from '@/i18n/i18n';

/* ─── 类型定义 ─── */
type GamePhase = 'intro' | 'character' | 'clues' | 'interrogate' | 'deduction' | 'reveal';

/* ─── 线索卡片 ─── */
function ClueCard({
  clue,
  collected,
  onCollect,
}: {
  clue: string;
  collected: boolean;
  onCollect: () => void;
}) {
  const t = useT();
  return (
    <button
      onClick={onCollect}
      disabled={collected}
      className={`p-4 rounded-xl transition-all text-left ${
        collected
          ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-400 opacity-60'
          : 'bg-gray-50 dark:bg-ink-800 border-2 border-ink-200 dark:border-ink-700 hover:border-accent hover:shadow-md'
      }`}
    >
      <div className="flex items-center gap-2">
        <h4 className="font-bold text-gray-800 dark:text-ink-100">{clue}</h4>
      </div>
      <p className="text-sm text-gray-600 dark:text-ink-400 mt-1">
        {collected ? t('scriptKiller.collected') : t('scriptKiller.collect_clue')}
      </p>
    </button>
  );
}

/* ─── DM 对话面板 ─── */
function DMDialoguePanel({
  character,
  messages,
  onSendMessage,
  onGetHint,
  isProcessing,
}: {
  character: Character;
  messages: DMMessage[];
  onSendMessage: (content: string) => void;
  onGetHint: () => void;
  isProcessing: boolean;
}) {
  const t = useT();
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (!input.trim()) return;
    onSendMessage(input.trim());
    setInput('');
  };

  return (
    <div className="bg-white dark:bg-ink-900 rounded-2xl border-2 border-ink-200 dark:border-ink-700 shadow-lg overflow-hidden">
      {/* 头部 */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{character.avatar}</span>
            <div>
              <h3 className="font-bold text-lg">{character.displayName}</h3>
              <p className="text-sm opacity-90">{character.role} · {character.dynasty}</p>
            </div>
          </div>
          <button
            onClick={onGetHint}
            className="px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-colors text-sm font-bold"
          >
            {t('scriptKiller.ask_hint')}
          </button>
        </div>
      </div>

      {/* 对话历史 */}
      <div className="h-80 overflow-y-auto p-4 space-y-4 bg-ink-50 dark:bg-ink-950">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            <p>{t('scriptKiller.ask_prompt', { name: character.displayName })}</p>
            <p className="text-sm mt-1">{t('scriptKiller.ask_subprompt')}</p>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'player' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] rounded-xl p-3 ${
                msg.role === 'player'
                  ? 'bg-accent text-white'
                  : 'bg-white dark:bg-ink-800 border border-ink-200 dark:border-ink-700'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        {isProcessing && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-ink-800 border border-ink-200 dark:border-ink-700 rounded-xl p-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 输入框 */}
      <div className="p-4 bg-white dark:bg-ink-900 border-t border-ink-200 dark:border-ink-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder={t('scriptKiller.ask_placeholder', { name: character.displayName })}
            className="flex-1 px-4 py-2 rounded-xl border border-ink-200 dark:border-ink-700 bg-ink-50 dark:bg-ink-800 focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button
            onClick={handleSubmit}
            disabled={!input.trim() || isProcessing}
            className="px-6 py-2 rounded-xl bg-accent text-white font-bold hover:bg-accent/90 disabled:opacity-50"
          >
            {t('scriptKiller.send')}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── 审问结果展示 ─── */
function InterrogationResultDisplay({
  result,
  unlockedClues,
}: {
  result: InterrogationResult;
  unlockedClues: string[];
}) {
  const t = useT();
  if (!result.dmComment && !unlockedClues.length) return null;

  return (
    <div className="space-y-4 mt-4">
      {result.dmComment && (
        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800">
          <h4 className="font-bold text-amber-800 dark:text-amber-400 mb-2">{t('scriptKiller.dm_comment')}</h4>
          <p className="text-sm text-ink-700 dark:text-ink-300">{result.dmComment}</p>
        </div>
      )}
      {unlockedClues.length > 0 && (
        <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800">
          <h4 className="font-bold text-green-800 dark:text-green-400 mb-2">{t('scriptKiller.new_clue')}</h4>
          <ul className="space-y-1">
            {unlockedClues.map((clue, i) => (
              <li key={i} className="text-sm text-ink-700 dark:text-ink-300">• {clue}</li>
            ))}
          </ul>
        </div>
      )}
      {result.hint && (
        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800">
          <h4 className="font-bold text-blue-800 dark:text-blue-400 mb-2">{t('scriptKiller.hint')}</h4>
          <p className="text-sm text-ink-700 dark:text-ink-300">{result.hint}</p>
        </div>
      )}
    </div>
  );
}

/* ─── 主页面 ─── */
export default function ScriptKillerPage() {
  const t = useT();
  const [selectedScriptId, setSelectedScriptId] = useState('shang-mystery');
  const [phase, setPhase] = useState<GamePhase>('intro');
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([]);
  const [currentCharacter, setCurrentCharacter] = useState<Character | null>(null);
  const [clueCollection, setClueCollection] = useState<Clue[]>([]);
  const [dmMessages, setDmMessages] = useState<DMMessage[]>([]);
  const [lastResult, setLastResult] = useState<InterrogationResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [finalAccusation, setFinalAccusation] = useState<string | null>(null);
  const [truthComparison, setTruthComparison] = useState<TruthComparison | null>(null);

  const currentScript = useMemo(() => SCRIPTS.find(s => s.id === selectedScriptId), [selectedScriptId]);
  const mysteryEvent = currentScript?.mysteryEvent;
  const characters = currentScript?.characters || [];

  /* 收集线索 */
  const collectClue = useCallback((clueText: string) => {
    if (!currentScript) return;
    const exists = clueCollection.some(c => c.description === clueText);
    if (exists) return;

    const newClue: Clue = {
      id: `clue-${clueText}-${Date.now()}`,
      location: '现场',
      characterId: currentScript.characters[0]?.id || '',
      characterName: currentScript.characters[0]?.displayName || '',
      type: 'physical',
      description: clueText,
      content: `线索：${clueText}`,
      importance: 3,
    };
    setClueCollection(prev => [...prev, newClue]);
  }, [currentScript, clueCollection]);

  /* AI 审问 */
  const handleInterrogate = useCallback(async (query: string) => {
    if (!currentScript || !currentCharacter) return;

    setIsProcessing(true);
    try {
      // 添加玩家消息
      setDmMessages(prev => [...prev, { role: 'player', content: query, timestamp: Date.now() }]);

      // 调用 AI DM
      const result = await interrogateCharacter(
        currentScript,
        currentCharacter.id,
        clueCollection,
      );
      setLastResult(result);

      // 添加 DM 回复
      const dmReply = result.dmComment
        ? `${t('scriptKiller.dm_comment_prefix', { comment: result.dmComment })}\n\n${currentCharacter.testimony}`
        : currentCharacter.testimony;
      setDmMessages(prev => [...prev, { role: 'dm', content: dmReply, timestamp: Date.now() }]);

      // 解锁新线索到收集箱
      if (result.unlockedClues.length > 0) {
        result.unlockedClues.forEach(clue => collectClue(clue));
      }

      // 记录到 persona
      usePersonaStore.getState().recordBrowse('knowledgeViewed');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : t('scriptKiller.alert_interrogate_failed');
      setDmMessages(prev => [...prev, { role: 'dm', content: t('scriptKiller.error_prefix', { message }), timestamp: Date.now() }]);
    } finally {
      setIsProcessing(false);
    }
  }, [currentScript, currentCharacter, clueCollection, dmMessages, collectClue]);

  /* 获取提示 */
  const handleGetHint = useCallback(async () => {
    if (!currentScript) return;
    setIsProcessing(true);
    try {
      const hint = await getDMHint(currentScript, clueCollection, dmMessages.length + 1);
      setDmMessages(prev => [...prev, { role: 'dm', content: t('scriptKiller.dm_hint_prefix', { hint }), timestamp: Date.now() }]);
    } catch {
      // ignore
    } finally {
      setIsProcessing(false);
    }
  }, [currentScript, clueCollection, dmMessages.length]);

  /* 指控 */
  const handleAccuse = useCallback((characterId: string) => {
    setFinalAccusation(characterId);
  }, []);

  /* 真相对照 */
  const handleCompareTruth = useCallback(async () => {
    if (!currentScript || !finalAccusation) return;
    setIsProcessing(true);
    try {
      const accused = characters.find(c => c.id === finalAccusation);
      const reasoning = t('scriptKiller.accuse_reasoning', { name: accused?.displayName || t('scriptKiller.actual_killer_pending'), count: clueCollection.length });
      const comparison = await compareTruthWithHistory(currentScript, finalAccusation, reasoning, clueCollection);
      setTruthComparison(comparison);
    } catch {
      // ignore
    } finally {
      setIsProcessing(false);
    }
  }, [currentScript, finalAccusation, characters, clueCollection]);

  /* 重置 */
  const handleReset = useCallback(() => {
    setPhase('intro');
    setSelectedCharacters([]);
    setCurrentCharacter(null);
    setClueCollection([]);
    setDmMessages([]);
    setLastResult(null);
    setFinalAccusation(null);
    setTruthComparison(null);
  }, []);

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 头部 */}
        <RevealOnScroll>
          <SectionHeader
            label={t('scriptKiller.label')}
            title={t('scriptKiller.title')}
            description={t('scriptKiller.description')}
          />
        </RevealOnScroll>

        {/* Phase 1: 选择剧本 */}
        {phase === 'intro' && (
          <RevealOnScroll direction="up" delay={100}>
            <div className="mt-8 bg-white dark:bg-ink-900 rounded-2xl border-2 border-ink-200 dark:border-ink-700 p-6 md:p-8 shadow-lg">
              <h3 className="text-xl font-bold text-ink-900 dark:text-ink-100 mb-6">{t('scriptKiller.select_script')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SCRIPTS.map(script => (
                  <button
                    key={script.id}
                    onClick={() => { setSelectedScriptId(script.id); }}
                    className={`p-5 rounded-xl text-left transition-all ${
                      selectedScriptId === script.id
                        ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg scale-105'
                        : 'bg-ink-50 dark:bg-ink-800 hover:bg-ink-100 dark:hover:bg-ink-700 border-2 border-ink-200 dark:border-ink-700'
                    }`}
                  >
                    <h4 className="font-bold text-lg mb-2">{script.title}</h4>
                    <p className="text-sm opacity-90 mb-3">{script.description}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-white/20 px-2 py-1 rounded">{t('scriptKiller.players', { count: script.playerCount })}</span>
                      <span className="text-xs bg-white/20 px-2 py-1 rounded">{t('scriptKiller.duration', { minutes: script.duration })}</span>
                      <span className="text-xs bg-white/20 px-2 py-1 rounded">{t('scriptKiller.difficulty', { level: script.difficulty })}</span>
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setPhase('character')}
                  className="px-8 py-3 rounded-xl bg-accent text-white font-bold text-lg hover:bg-accent/90 shadow-lg"
                >
                  {t('scriptKiller.start_game')}
                </button>
              </div>
            </div>
          </RevealOnScroll>
        )}

        {/* Phase 2: 选择角色 */}
        {phase === 'character' && currentScript && (
          <RevealOnScroll direction="up" delay={100}>
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-ink-900 rounded-2xl border-2 border-ink-200 dark:border-ink-700 p-6 shadow-lg">
                <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-4">{t('scriptKiller.select_character')}</h3>
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                  {characters.map(char => (
                    <button
                      key={char.id}
                      onClick={() => {
                        setCurrentCharacter(char);
                        setSelectedCharacters(prev =>
                          prev.includes(char.id) ? prev : [...prev, char.id]
                        );
                      }}
                      className={`w-full p-4 rounded-xl text-left transition-all ${
                        selectedCharacters.includes(char.id)
                          ? 'bg-red-50 dark:bg-red-900/20 border-2 border-red-400'
                          : 'bg-ink-50 dark:bg-ink-800 hover:bg-ink-100 dark:hover:bg-ink-700 border-2 border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{char.avatar}</span>
                        <div>
                          <h4 className="font-bold text-ink-900 dark:text-ink-100">{char.displayName}</h4>
                          <p className="text-sm text-ink-600 dark:text-ink-400">{char.role}</p>
                          <p className="text-xs text-red-600 dark:text-red-400">{char.dynasty}·{char.era}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 角色档案 */}
              <div className="bg-white dark:bg-ink-900 rounded-2xl border-2 border-ink-200 dark:border-ink-700 p-6 shadow-lg">
                <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-4">{t('scriptKiller.character_profile')}</h3>
                {currentCharacter ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{currentCharacter.avatar}</span>
                      <div>
                        <h4 className="font-bold text-lg text-ink-900 dark:text-ink-100">{currentCharacter.displayName}</h4>
                        <p className="text-sm text-ink-600 dark:text-ink-400">{currentCharacter.role}</p>
                      </div>
                    </div>
                    <div>
                      <h5 className="font-bold text-sm text-ink-700 dark:text-ink-300 mb-1">{t('scriptKiller.background')}</h5>
                      <p className="text-sm text-ink-600 dark:text-ink-400">{currentCharacter.background}</p>
                    </div>
                    <div>
                      <h5 className="font-bold text-sm text-ink-700 dark:text-ink-300 mb-1">{t('scriptKiller.motive')}</h5>
                      <ul className="text-sm text-ink-600 dark:text-ink-400 space-y-1">
                        {currentCharacter.motivations.map((m, i) => (
                          <li key={i}>• {m}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-bold text-sm text-ink-700 dark:text-ink-300 mb-1">{t('scriptKiller.alibi')}</h5>
                      <p className="text-sm text-ink-600 dark:text-ink-400">{currentCharacter.alibi}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-ink-400 py-12">
                    {t('scriptKiller.select_character_tip')}
                  </div>
                )}
                <div className="flex justify-between mt-6">
                  <button
                    onClick={() => setPhase('intro')}
                    className="px-4 py-2 rounded-lg bg-ink-100 dark:bg-ink-800 text-ink-700 dark:text-ink-300 font-bold"
                  >
                    {t('scriptKiller.back')}
                  </button>
                  <button
                    onClick={() => setPhase('clues')}
                    className="px-4 py-2 rounded-lg bg-accent text-white font-bold"
                  >
                    {t('scriptKiller.next_step')}
                  </button>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        )}

        {/* Phase 3: 收集线索 */}
        {phase === 'clues' && currentScript && mysteryEvent && (
          <RevealOnScroll direction="up" delay={100}>
            <div className="mt-8 bg-white dark:bg-ink-900 rounded-2xl border-2 border-ink-200 dark:border-ink-700 p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-ink-900 dark:text-ink-100">{t('scriptKiller.collect_clues')}</h3>
                <span className="text-sm bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-3 py-1 rounded-full font-bold">
                  {t('scriptKiller.clue_collected_count', { collected: clueCollection.length, total: mysteryEvent.keyClues.length })}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {mysteryEvent.keyClues.map((clue, i) => (
                  <ClueCard
                    key={i}
                    clue={clue}
                    collected={clueCollection.some(c => c.description === clue)}
                    onCollect={() => collectClue(clue)}
                  />
                ))}
              </div>
              <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl p-4 mb-6">
                <h4 className="font-bold text-ink-900 dark:text-ink-100 mb-2">{t('scriptKiller.case_background')}</h4>
                <p className="text-sm text-ink-700 dark:text-ink-300">{mysteryEvent.description}</p>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => setPhase('character')}
                  className="px-4 py-2 rounded-lg bg-ink-100 dark:bg-ink-800 font-bold"
                >
                  ← 返回
                </button>
                <button
                  onClick={() => setPhase('interrogate')}
                  className="px-4 py-2 rounded-lg bg-accent text-white font-bold"
                >
                  {t('scriptKiller.start_interrogate')}
                </button>
              </div>
            </div>
          </RevealOnScroll>
        )}

        {/* Phase 4: AI 审问 */}
        {phase === 'interrogate' && currentScript && currentCharacter && (
          <RevealOnScroll direction="up" delay={100}>
            <div className="mt-8 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-ink-900 dark:text-ink-100">
                  {t('scriptKiller.ai_interrogate', { name: currentCharacter.displayName })}
                </h3>
                <button
                  onClick={() => setPhase('clues')}
                  className="px-4 py-2 rounded-lg bg-ink-100 dark:bg-ink-800 font-bold text-sm"
                >
                  {t('scriptKiller.back_to_clues')}
                </button>
              </div>

              <DMDialoguePanel
                character={currentCharacter}
                messages={dmMessages}
                onSendMessage={handleInterrogate}
                onGetHint={handleGetHint}
                isProcessing={isProcessing}
              />

              {lastResult && (
                <InterrogationResultDisplay
                  result={lastResult}
                  unlockedClues={lastResult.unlockedClues}
                />
              )}

              {/* 角色切换 */}
              <div className="bg-white dark:bg-ink-900 rounded-2xl border-2 border-ink-200 dark:border-ink-700 p-6 shadow-lg">
                <h4 className="font-bold text-ink-900 dark:text-ink-100 mb-4">{t('scriptKiller.select_other_character')}</h4>
                <div className="flex flex-wrap gap-3">
                  {characters.map(char => (
                    <button
                      key={char.id}
                      onClick={() => {
                        setCurrentCharacter(char);
                        setDmMessages([]);
                        setLastResult(null);
                      }}
                      className={`px-4 py-2 rounded-xl font-bold transition-all ${
                        currentCharacter.id === char.id
                          ? 'bg-accent text-white'
                          : 'bg-ink-100 dark:bg-ink-800 hover:bg-ink-200 dark:hover:bg-ink-700'
                      }`}
                    >
                      {char.avatar} {char.displayName}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between mt-6">
                  <button
                    onClick={() => setPhase('clues')}
                    className="px-4 py-2 rounded-lg bg-ink-100 dark:bg-ink-800 font-bold"
                  >
                    {t('scriptKiller.back')}
                  </button>
                  <button
                    onClick={() => setPhase('deduction')}
                    className="px-4 py-2 rounded-lg bg-red-500 text-white font-bold"
                  >
                    {t('scriptKiller.to_deduction')}
                  </button>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        )}

        {/* Phase 5: 推理指控 */}
        {phase === 'deduction' && currentScript && (
          <RevealOnScroll direction="up" delay={100}>
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 已收集线索 */}
              <div className="bg-white dark:bg-ink-900 rounded-2xl border-2 border-ink-200 dark:border-ink-700 p-6 shadow-lg">
                <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-4">{t('scriptKiller.collected_clues')}</h3>
                <div className="space-y-2">
                  {clueCollection.length === 0 ? (
                    <p className="text-sm text-ink-400">{t('scriptKiller.no_clues')}</p>
                  ) : (
                    clueCollection.map((clue, i) => (
                      <div key={i} className="p-3 rounded-lg bg-ink-50 dark:bg-ink-800">
                        <p className="text-sm font-bold text-ink-900 dark:text-ink-100">{clue.description}</p>
                        <p className="text-xs text-ink-600 dark:text-ink-400">{clue.content}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* 指控 */}
              <div className="bg-white dark:bg-ink-900 rounded-2xl border-2 border-ink-200 dark:border-ink-700 p-6 shadow-lg">
                <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-4">{t('scriptKiller.accuse_killer')}</h3>
                <p className="text-sm text-ink-600 dark:text-ink-400 mb-4">{t('scriptKiller.accuse_tip')}</p>
                <div className="space-y-3">
                  {characters.map(char => (
                    <button
                      key={char.id}
                      onClick={() => handleAccuse(char.id)}
                      className={`w-full p-4 rounded-xl text-left transition-all ${
                        finalAccusation === char.id
                          ? 'bg-red-500 text-white shadow-lg scale-105'
                          : 'bg-ink-50 dark:bg-ink-800 hover:bg-ink-100 dark:hover:bg-ink-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{char.avatar}</span>
                        <div>
                          <h4 className="font-bold">{char.displayName}</h4>
                          <p className="text-sm opacity-80">{char.role}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                {finalAccusation && (
                  <button
                    onClick={handleCompareTruth}
                    disabled={isProcessing}
                    className="w-full mt-4 py-3 rounded-xl bg-accent text-white font-bold hover:bg-accent/90 disabled:opacity-50"
                  >
                    {isProcessing ? t('scriptKiller.analyzing') : t('scriptKiller.reveal_truth')}
                  </button>
                )}
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => setPhase('interrogate')}
                    className="px-4 py-2 rounded-lg bg-ink-100 dark:bg-ink-800 font-bold text-sm"
                  >
                    {t('scriptKiller.back_to_interrogate')}
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 rounded-lg bg-ink-100 dark:bg-ink-800 font-bold text-sm"
                  >
                    {t('scriptKiller.restart')}
                  </button>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        )}

        {/* Phase 6: 真相对照 */}
        {phase === 'reveal' && truthComparison && currentScript && (
          <RevealOnScroll direction="up" delay={100}>
            <div className="mt-8 space-y-6">
              <div className="bg-white dark:bg-ink-900 rounded-2xl border-2 border-ink-200 dark:border-ink-700 p-6 shadow-lg">
                <h3 className="text-xl font-bold text-ink-900 dark:text-ink-100 mb-4 text-center">
                  {t('scriptKiller.truth_reveal', { title: currentScript.title })}
                </h3>

                {/* 用户指控结果 */}
                <div className={`p-4 rounded-xl mb-6 ${
                  finalAccusation === currentScript.mysteryEvent.killer
                    ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-400'
                    : 'bg-red-50 dark:bg-red-900/20 border-2 border-red-400'
                }`}>
                  <h4 className="font-bold mb-2">
                    {finalAccusation === currentScript.mysteryEvent.killer ? t('scriptKiller.accuse_correct') : t('scriptKiller.accuse_wrong')}
                  </h4>
                  <p className="text-sm">
                    {currentScript.mysteryEvent.killer ? t('scriptKiller.actual_killer', { name: currentScript.mysteryEvent.killer }) : t('scriptKiller.actual_killer_pending')}
                  </p>
                </div>

                {/* AI 评价 */}
                {truthComparison.evaluation && (
                  <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800 mb-4">
                    <h4 className="font-bold text-amber-800 dark:text-amber-400 mb-2">{t('scriptKiller.dm_evaluation')}</h4>
                    <p className="text-sm text-ink-700 dark:text-ink-300">{truthComparison.evaluation}</p>
                  </div>
                )}

                {/* 史实对照 */}
                {truthComparison.historicalFact && (
                  <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 mb-4">
                    <h4 className="font-bold text-blue-800 dark:text-blue-400 mb-2">{t('scriptKiller.history_compare')}</h4>
                    <p className="text-sm text-ink-700 dark:text-ink-300">{truthComparison.historicalFact}</p>
                  </div>
                )}

                {/* 遗漏线索 */}
                {truthComparison.missedClues.length > 0 && (
                  <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-200 dark:border-purple-800">
                    <h4 className="font-bold text-purple-800 dark:text-purple-400 mb-2">{t('scriptKiller.missed_clues')}</h4>
                    <ul className="text-sm space-y-1">
                      {truthComparison.missedClues.map((clue, i) => (
                        <li key={i}>• {clue}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex justify-center gap-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-3 rounded-xl bg-ink-100 dark:bg-ink-800 font-bold"
                >
                  {t('scriptKiller.back_home')}
                </button>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 rounded-xl bg-accent text-white font-bold"
                >
                  {t('scriptKiller.restart')}
                </button>
              </div>
            </div>
          </RevealOnScroll>
        )}
      </div>
    </div>
  );
}
