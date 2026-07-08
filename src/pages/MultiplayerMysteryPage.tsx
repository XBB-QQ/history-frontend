/**
 * 联机剧本杀 — 多人协作版
 * @see ITERATIONS.md #101
 *
 * 通过 WebSocket STOMP 与其他浏览器同步：
 *   - 创建/加入房间 → 共享房间号
 *   - 实时玩家列表
 *   - 互斥角色选择
 *   - 共享线索收集
 *   - 房内聊天
 *   - 房主切换阶段
 *   - 真相揭示
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import { SCRIPTS } from '@/data/features/scriptKillerData';
import { useT } from '@/i18n/i18n';
import {
  createRoom,
  fetchRoom,
  connectRoom,
  getOrCreatePlayerId,
  type GameRoom,
  type GamePhase,
  type RoomEvent,
  type RoomConnection,
} from '@/services/gameRoomApi';

type View = 'landing' | 'room';

export default function MultiplayerMysteryPage() {
  const t = useT();
  const playerId = getOrCreatePlayerId();

  const [view, setView] = useState<View>('landing');
  const [playerName, setPlayerName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [room, setRoom] = useState<GameRoom | null>(null);
  const [conn, setConn] = useState<RoomConnection | null>(null);
  const [error, setError] = useState('');
  const [connected, setConnected] = useState(false);

  /* 处理收到的房间事件 */
  const handleEvent = useCallback((event: RoomEvent) => {
    if (event.type === 'error' && event.playerId === playerId) {
      setError(event.payload.message || '未知错误');
      setTimeout(() => setError(''), 3000);
      return;
    }
    if (event.payload.room) {
      setRoom(event.payload.room);
    }
  }, [playerId]);

  /* 创建房间 */
  const handleCreate = async () => {
    if (!playerName.trim()) {
      setError(t('multiMystery.error_name_required'));
      return;
    }
    setError('');
    try {
      const newRoom = await createRoom('shang-mystery', playerName.trim(), playerId);
      setRoom(newRoom);
      setRoomId(newRoom.roomId);
      setView('room');
      const c = connectRoom(newRoom.roomId, playerId, playerName.trim(), {
        onEvent: handleEvent,
        onConnect: () => setConnected(true),
        onDisconnect: () => setConnected(false),
      });
      setConn(c);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  };

  /* 加入房间 */
  const handleJoin = async () => {
    if (!playerName.trim() || !roomId.trim()) {
      setError(t('multiMystery.error_name_and_room_required'));
      return;
    }
    setError('');
    try {
      const existing = await fetchRoom(roomId.trim().toUpperCase());
      if (!existing) {
        setError(t('multiMystery.error_room_not_found'));
        return;
      }
      setRoom(existing);
      setRoomId(existing.roomId);
      setView('room');
      const c = connectRoom(existing.roomId, playerId, playerName.trim(), {
        onEvent: handleEvent,
        onConnect: () => setConnected(true),
        onDisconnect: () => setConnected(false),
      });
      setConn(c);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  };

  /* 离开房间 */
  const handleLeave = () => {
    conn?.sendLeave();
    conn?.disconnect();
    setConn(null);
    setRoom(null);
    setRoomId('');
    setConnected(false);
    setView('landing');
  };

  /* 卸载时断开 */
  useEffect(() => {
    return () => {
      conn?.sendLeave();
      conn?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-paper dark:bg-ink-950 pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll>
          <SectionHeader
            label={t('multiMystery.label')}
            title={t('multiMystery.title')}
            description={t('multiMystery.description')}
          />
        </RevealOnScroll>

        {/* 连接状态条 */}
        {view === 'room' && (
          <div className="mt-4 flex items-center justify-between bg-white dark:bg-ink-900 rounded-xl border-2 border-ink-200 dark:border-ink-700 p-3 px-5">
            <div className="flex items-center gap-3">
              <span className={`w-3 h-3 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
              <span className="text-sm text-ink-700 dark:text-ink-300">
                {connected ? t('multiMystery.connected') : t('multiMystery.connecting')}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-mono font-bold text-accent">{roomId}</span>
              <button
                onClick={() => navigator.clipboard?.writeText(roomId)}
                className="px-2 py-1 text-xs rounded bg-ink-100 dark:bg-ink-800 hover:bg-ink-200 dark:hover:bg-ink-700"
              >
                {t('multiMystery.copy_room_id')}
              </button>
              <button
                onClick={handleLeave}
                className="px-3 py-1 text-sm rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-200"
              >
                {t('multiMystery.leave_room')}
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border-2 border-red-300 text-red-700 dark:text-red-300 text-sm">
            {error}
          </div>
        )}

        {view === 'landing' && (
          <LandingView
            t={t}
            playerName={playerName}
            setPlayerName={setPlayerName}
            roomId={roomId}
            setRoomId={setRoomId}
            onCreate={handleCreate}
            onJoin={handleJoin}
          />
        )}

        {view === 'room' && room && (
          <RoomView
            t={t}
            room={room}
            playerId={playerId}
            conn={conn}
            onError={setError}
          />
        )}
      </div>
    </div>
  );
}

/* ─────────────────── 大厅视图 ─────────────────── */
function LandingView({ t, playerName, setPlayerName, roomId, setRoomId, onCreate, onJoin }: {
  t: ReturnType<typeof useT>;
  playerName: string;
  setPlayerName: (s: string) => void;
  roomId: string;
  setRoomId: (s: string) => void;
  onCreate: () => void;
  onJoin: () => void;
}) {
  return (
    <RevealOnScroll direction="up" delay={100}>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 创建房间 */}
        <div className="bg-white dark:bg-ink-900 rounded-2xl border-2 border-ink-200 dark:border-ink-700 p-6 shadow-lg">
          <h3 className="text-xl font-bold text-ink-900 dark:text-ink-100 mb-2">
            {t('multiMystery.create_room')}
          </h3>
          <p className="text-sm text-ink-600 dark:text-ink-400 mb-4">
            {t('multiMystery.create_room_tip')}
          </p>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder={t('multiMystery.your_name')}
            className="w-full px-4 py-2 rounded-xl border border-ink-200 dark:border-ink-700 bg-ink-50 dark:bg-ink-800 focus:outline-none focus:ring-2 focus:ring-accent mb-4"
          />
          <button
            onClick={onCreate}
            disabled={!playerName.trim()}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold hover:opacity-90 disabled:opacity-50"
          >
            {t('multiMystery.create_room_btn')}
          </button>
        </div>

        {/* 加入房间 */}
        <div className="bg-white dark:bg-ink-900 rounded-2xl border-2 border-ink-200 dark:border-ink-700 p-6 shadow-lg">
          <h3 className="text-xl font-bold text-ink-900 dark:text-ink-100 mb-2">
            {t('multiMystery.join_room')}
          </h3>
          <p className="text-sm text-ink-600 dark:text-ink-400 mb-4">
            {t('multiMystery.join_room_tip')}
          </p>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder={t('multiMystery.your_name')}
            className="w-full px-4 py-2 rounded-xl border border-ink-200 dark:border-ink-700 bg-ink-50 dark:bg-ink-800 focus:outline-none focus:ring-2 focus:ring-accent mb-3"
          />
          <input
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value.toUpperCase())}
            placeholder={t('multiMystery.room_id_placeholder')}
            className="w-full px-4 py-2 rounded-xl border border-ink-200 dark:border-ink-700 bg-ink-50 dark:bg-ink-800 focus:outline-none focus:ring-2 focus:ring-accent mb-4 font-mono"
          />
          <button
            onClick={onJoin}
            disabled={!playerName.trim() || !roomId.trim()}
            className="w-full py-3 rounded-xl bg-accent text-white font-bold hover:bg-accent/90 disabled:opacity-50"
          >
            {t('multiMystery.join_room_btn')}
          </button>
        </div>
      </div>

      {/* 剧本预览 */}
      <div className="mt-8 bg-white dark:bg-ink-900 rounded-2xl border-2 border-ink-200 dark:border-ink-700 p-6 shadow-lg">
        <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100 mb-4">
          {t('multiMystery.available_scripts')}
        </h3>
        {SCRIPTS.map(script => (
          <div key={script.id} className="p-4 rounded-xl bg-ink-50 dark:bg-ink-800 mb-3">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-lg">{script.title}</h4>
              <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-2 py-1 rounded">
                {t('multiMystery.players_label', { count: script.playerCount })}
              </span>
            </div>
            <p className="text-sm text-ink-600 dark:text-ink-400">{script.description}</p>
          </div>
        ))}
      </div>
    </RevealOnScroll>
  );
}

/* ─────────────────── 房间视图（按阶段渲染） ─────────────────── */
function RoomView({ t, room, playerId, conn, onError }: {
  t: ReturnType<typeof useT>;
  room: GameRoom;
  playerId: string;
  conn: RoomConnection | null;
  onError: (msg: string) => void;
}) {
  const currentPlayer = room.players.find(p => p.playerId === playerId);
  const isHost = currentPlayer?.isHost ?? false;
  const script = SCRIPTS.find(s => s.id === room.scriptId);

  if (!script || !currentPlayer) {
    return <div className="mt-8 text-center text-ink-400">Loading...</div>;
  }

  return (
    <RevealOnScroll direction="up" delay={50}>
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：玩家列表 + 阶段指示 */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white dark:bg-ink-900 rounded-2xl border-2 border-ink-200 dark:border-ink-700 p-5 shadow-lg">
            <h3 className="font-bold text-ink-900 dark:text-ink-100 mb-3">
              {t('multiMystery.players_in_room')} ({room.players.length})
            </h3>
            <ul className="space-y-2">
              {room.players.map(p => {
                const charId = room.characterAssignments[p.playerId];
                const character = script.characters.find(c => c.id === charId);
                return (
                  <li key={p.playerId} className={`p-2 rounded-lg ${p.playerId === playerId ? 'bg-accent/10 border border-accent/30' : 'bg-ink-50 dark:bg-ink-800'}`}>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{character?.avatar || '👤'}</span>
                      <div className="flex-1">
                        <div className="text-sm font-bold flex items-center gap-1">
                          {p.name}
                          {p.isHost && <span className="text-xs bg-yellow-400 text-yellow-900 px-1.5 rounded">HOST</span>}
                          {p.playerId === playerId && <span className="text-xs text-accent">(你)</span>}
                        </div>
                        <div className="text-xs text-ink-500">
                          {character ? character.displayName : t('multiMystery.not_picked')}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* 阶段控制 */}
          <div className="bg-white dark:bg-ink-900 rounded-2xl border-2 border-ink-200 dark:border-ink-700 p-5 shadow-lg">
            <h3 className="font-bold text-ink-900 dark:text-ink-100 mb-3">
              {t('multiMystery.current_phase')}
            </h3>
            <div className="text-sm mb-3 font-bold text-accent">
              {phaseLabel(t, room.phase)}
            </div>
            {isHost && <PhaseControls t={t} phase={room.phase} conn={conn} />}
          </div>
        </div>

        {/* 右侧：阶段内容 */}
        <div className="lg:col-span-2">
          {room.phase === 'WAITING' && (
            <WaitingPhase t={t} room={room} script={script} playerId={playerId} />
          )}
          {room.phase === 'CHARACTER' && (
            <CharacterPhase t={t} room={room} script={script} playerId={playerId} conn={conn} onError={onError} />
          )}
          {room.phase === 'CLUES' && (
            <CluesPhase t={t} room={room} script={script} conn={conn} />
          )}
          {room.phase === 'INTERROGATE' && (
            <ChatPhase t={t} room={room} playerId={playerId} conn={conn} />
          )}
          {room.phase === 'DEDUCTION' && (
            <VotingPhase t={t} room={room} script={script} playerId={playerId} conn={conn} />
          )}
          {room.phase === 'REVEAL' && (
            <RevealPhase t={t} script={script} />
          )}
        </div>
      </div>
    </RevealOnScroll>
  );
}

/* ───────── 阶段标签 ───────── */
function phaseLabel(t: ReturnType<typeof useT>, phase: GamePhase): string {
  const map: Record<GamePhase, string> = {
    WAITING: t('multiMystery.phase_waiting'),
    CHARACTER: t('multiMystery.phase_character'),
    CLUES: t('multiMystery.phase_clues'),
    INTERROGATE: t('multiMystery.phase_interrogate'),
    DEDUCTION: t('multiMystery.phase_deduction'),
    REVEAL: t('multiMystery.phase_reveal'),
  };
  return map[phase];
}

/* ───────── 房主阶段控制按钮 ───────── */
function PhaseControls({ t, phase, conn }: {
  t: ReturnType<typeof useT>;
  phase: GamePhase;
  conn: RoomConnection | null;
}) {
  const next: Record<GamePhase, GamePhase | null> = {
    WAITING: 'CHARACTER',
    CHARACTER: 'CLUES',
    CLUES: 'INTERROGATE',
    INTERROGATE: 'DEDUCTION',
    DEDUCTION: 'REVEAL',
    REVEAL: null,
  };
  const nextPhase = next[phase];
  if (!nextPhase || !conn) return null;
  return (
    <button
      onClick={() => conn.changePhase(nextPhase)}
      className="w-full py-2 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-sm hover:opacity-90"
    >
      {t('multiMystery.advance_to')} {phaseLabel(t, nextPhase)} →
    </button>
  );
}

/* ───────── 等待阶段 ───────── */
function WaitingPhase({ t, room, script, playerId }: {
  t: ReturnType<typeof useT>;
  room: GameRoom;
  script: typeof SCRIPTS[number];
  playerId: string;
}) {
  const isHost = room.players.find(p => p.playerId === playerId)?.isHost;
  return (
    <div className="bg-white dark:bg-ink-900 rounded-2xl border-2 border-ink-200 dark:border-ink-700 p-6 shadow-lg space-y-4">
      <h3 className="text-xl font-bold">{script.title}</h3>
      <p className="text-sm text-ink-600 dark:text-ink-400">{script.description}</p>
      <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800">
        <p className="text-sm text-amber-800 dark:text-amber-400">
          {isHost
            ? t('multiMystery.host_waiting_tip')
            : t('multiMystery.player_waiting_tip')}
        </p>
      </div>
      <div className="text-sm text-ink-600 dark:text-ink-400">
        {t('multiMystery.share_room_id_tip', { roomId: room.roomId })}
      </div>
    </div>
  );
}

/* ───────── 角色选择阶段 ───────── */
function CharacterPhase({ t, room, script, playerId, conn, onError }: {
  t: ReturnType<typeof useT>;
  room: GameRoom;
  script: typeof SCRIPTS[number];
  playerId: string;
  conn: RoomConnection | null;
  onError: (msg: string) => void;
}) {
  const myCharId = room.characterAssignments[playerId];
  const myChar = script.characters.find(c => c.id === myCharId);

  const handlePick = (charId: string) => {
    if (!conn) return;
    if (Object.entries(room.characterAssignments).some(([pid, cid]) => pid !== playerId && cid === charId)) {
      onError(t('multiMystery.error_char_taken'));
      return;
    }
    conn.pickCharacter(charId);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-ink-900 rounded-2xl border-2 border-ink-200 dark:border-ink-700 p-6 shadow-lg">
        <h3 className="text-xl font-bold mb-4">{t('multiMystery.select_character')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {script.characters.map(char => {
            const pickedBy = Object.entries(room.characterAssignments).find(([, cid]) => cid === char.id);
            const isMine = myCharId === char.id;
            const takenByOther = pickedBy && pickedBy[0] !== playerId;
            const picker = pickedBy ? room.players.find(p => p.playerId === pickedBy[0]) : null;
            return (
              <button
                key={char.id}
                onClick={() => !takenByOther && handlePick(char.id)}
                disabled={!!takenByOther}
                className={`p-4 rounded-xl text-left transition-all ${
                  isMine
                    ? 'bg-accent text-white shadow-lg'
                    : takenByOther
                      ? 'bg-ink-100 dark:bg-ink-800 opacity-50 cursor-not-allowed'
                      : 'bg-ink-50 dark:bg-ink-800 hover:bg-ink-100 dark:hover:bg-ink-700 border-2 border-transparent hover:border-accent'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">{char.avatar}</span>
                  <div className="flex-1">
                    <div className="font-bold">{char.displayName}</div>
                    <div className="text-xs opacity-80">{char.role}</div>
                  </div>
                </div>
                {picker && (
                  <div className="text-xs opacity-70">
                    {t('multiMystery.picked_by', { name: picker.name })}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 我的角色档案 */}
      {myChar && (
        <div className="bg-white dark:bg-ink-900 rounded-2xl border-2 border-accent p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">{myChar.avatar}</span>
            <div>
              <h4 className="font-bold text-lg">{myChar.displayName}</h4>
              <p className="text-sm text-ink-500">{myChar.role} · {myChar.dynasty}</p>
            </div>
          </div>
          <div className="space-y-3 text-sm">
            <div>
              <h5 className="font-bold text-ink-700 dark:text-ink-300 mb-1">{t('multiMystery.background')}</h5>
              <p className="text-ink-600 dark:text-ink-400">{myChar.background}</p>
            </div>
            <div>
              <h5 className="font-bold text-ink-700 dark:text-ink-300 mb-1">{t('multiMystery.alibi')}</h5>
              <p className="text-ink-600 dark:text-ink-400">{myChar.alibi}</p>
            </div>
            <div>
              <h5 className="font-bold text-ink-700 dark:text-ink-300 mb-1">{t('multiMystery.testimony')}</h5>
              <p className="text-ink-600 dark:text-ink-400 italic">"{myChar.testimony}"</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ───────── 线索收集阶段 ───────── */
function CluesPhase({ t, room, script, conn }: {
  t: ReturnType<typeof useT>;
  room: GameRoom;
  script: typeof SCRIPTS[number];
  conn: RoomConnection | null;
}) {
  const clues = script.mysteryEvent.keyClues;
  return (
    <div className="bg-white dark:bg-ink-900 rounded-2xl border-2 border-ink-200 dark:border-ink-700 p-6 shadow-lg space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">{t('multiMystery.collect_clues')}</h3>
        <span className="text-sm bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-3 py-1 rounded-full font-bold">
          {room.collectedClues.length} / {clues.length}
        </span>
      </div>
      <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800 text-sm">
        <p className="text-amber-800 dark:text-amber-400">{t('multiMystery.clues_tip')}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {clues.map((clue, i) => {
          const collected = room.collectedClues.includes(clue);
          return (
            <button
              key={i}
              onClick={() => !collected && conn?.collectClue(clue)}
              disabled={collected}
              className={`p-4 rounded-xl text-left transition-all ${
                collected
                  ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-400 opacity-70'
                  : 'bg-ink-50 dark:bg-ink-800 hover:bg-ink-100 dark:hover:bg-ink-700 border-2 border-transparent hover:border-accent'
              }`}
            >
              <p className="font-bold text-sm mb-1">{clue}</p>
              <p className="text-xs text-ink-500">
                {collected ? t('multiMystery.collected') : t('multiMystery.click_to_collect')}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ───────── 审问/聊天阶段 ───────── */
function ChatPhase({ t, room, playerId, conn }: {
  t: ReturnType<typeof useT>;
  room: GameRoom;
  playerId: string;
  conn: RoomConnection | null;
}) {
  const [input, setInput] = useState('');
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight, behavior: 'smooth' });
  }, [room.chatHistory.length]);

  const handleSend = () => {
    if (!input.trim() || !conn) return;
    conn.sendChat(input.trim());
    setInput('');
  };

  return (
    <div className="bg-white dark:bg-ink-900 rounded-2xl border-2 border-ink-200 dark:border-ink-700 shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-red-500 to-orange-500 p-4 text-white">
        <h3 className="font-bold text-lg">{t('multiMystery.discuss_title')}</h3>
        <p className="text-sm opacity-90">{t('multiMystery.discuss_tip')}</p>
      </div>
      <div ref={messagesRef} className="h-80 overflow-y-auto p-4 space-y-3 bg-ink-50 dark:bg-ink-950">
        {room.chatHistory.length === 0 && (
          <div className="text-center text-ink-400 py-12">
            {t('multiMystery.no_messages')}
          </div>
        )}
        {room.chatHistory.map((msg, i) => {
          const mine = msg.playerId === playerId;
          return (
            <div key={i} className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-xl p-3 ${mine ? 'bg-accent text-white' : 'bg-white dark:bg-ink-800 border border-ink-200 dark:border-ink-700'}`}>
                {!mine && <div className="text-xs font-bold mb-1 opacity-70">{msg.playerName}</div>}
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-4 bg-white dark:bg-ink-900 border-t border-ink-200 dark:border-ink-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t('multiMystery.chat_placeholder')}
            className="flex-1 px-4 py-2 rounded-xl border border-ink-200 dark:border-ink-700 bg-ink-50 dark:bg-ink-800 focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="px-6 py-2 rounded-xl bg-accent text-white font-bold hover:bg-accent/90 disabled:opacity-50"
          >
            {t('multiMystery.send')}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ───────── 推理阶段（投票指控） ───────── */
function VotingPhase({
  t,
  room,
  script,
  playerId: _playerId,
  conn,
}: {
  t: ReturnType<typeof useT>;
  room: GameRoom;
  script: typeof SCRIPTS[number];
  playerId: string;
  conn: RoomConnection | null;
}) {
  const [myVote, setMyVote] = useState<string | null>(null);

  const handleVote = (charId: string) => {
    setMyVote(charId);
    if (conn) {
      // 用 chat 广播投票
      const character = script.characters.find(c => c.id === charId);
      conn.sendChat(t('multiMystery.vote_broadcast', { name: character?.displayName || charId }));
    }
  };

  const handleReveal = () => {
    if (!conn || !myVote) return;
    const character = script.characters.find(c => c.id === myVote);
    conn.reveal(character?.displayName || myVote);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-ink-900 rounded-2xl border-2 border-ink-200 dark:border-ink-700 p-6 shadow-lg">
        <h3 className="text-xl font-bold mb-2">{t('multiMystery.accuse_killer')}</h3>
        <p className="text-sm text-ink-600 dark:text-ink-400 mb-4">{t('multiMystery.accuse_tip')}</p>

        {/* 已收集线索 */}
        <div className="mb-4 p-3 rounded-lg bg-ink-50 dark:bg-ink-800">
          <h4 className="font-bold text-sm mb-2">{t('multiMystery.collected_clues')} ({room.collectedClues.length})</h4>
          <ul className="text-xs text-ink-600 dark:text-ink-400 space-y-1">
            {room.collectedClues.map((c, i) => <li key={i}>• {c}</li>)}
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {script.characters.map(char => (
            <button
              key={char.id}
              onClick={() => handleVote(char.id)}
              className={`p-3 rounded-xl text-left transition-all ${
                myVote === char.id
                  ? 'bg-red-500 text-white shadow-lg'
                  : 'bg-ink-50 dark:bg-ink-800 hover:bg-ink-100 dark:hover:bg-ink-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">{char.avatar}</span>
                <div>
                  <div className="font-bold text-sm">{char.displayName}</div>
                  <div className="text-xs opacity-80">{char.role}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {myVote && (
          <button
            onClick={handleReveal}
            className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold hover:opacity-90"
          >
            {t('multiMystery.reveal_truth_btn')}
          </button>
        )}
      </div>
    </div>
  );
}

/* ───────── 揭示阶段 ───────── */
function RevealPhase({ t, script }: {
  t: ReturnType<typeof useT>;
  script: typeof SCRIPTS[number];
}) {
  return (
    <div className="bg-white dark:bg-ink-900 rounded-2xl border-2 border-ink-200 dark:border-ink-700 p-6 shadow-lg space-y-4">
      <h3 className="text-2xl font-bold text-center text-ink-900 dark:text-ink-100">
        {t('multiMystery.truth_revealed', { title: script.title })}
      </h3>
      <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800">
        <h4 className="font-bold text-amber-800 dark:text-amber-400 mb-2">{t('multiMystery.truth_label')}</h4>
        <p className="text-sm text-ink-700 dark:text-ink-300">{script.solution}</p>
      </div>
      <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800">
        <h4 className="font-bold text-blue-800 dark:text-blue-400 mb-2">{t('multiMystery.setup_label')}</h4>
        <p className="text-sm text-ink-700 dark:text-ink-300">{script.setup}</p>
      </div>
    </div>
  );
}
