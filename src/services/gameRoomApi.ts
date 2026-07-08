/**
 * 联机剧本杀 — STOMP 客户端
 * @see ITERATIONS.md #101
 *
 * 后端：/ws-game SockJS 端点 + STOMP 协议
 *   - 应用 destination：/app/game/{roomId}/{action}
 *   - 广播 topic：/topic/game/{roomId}/events
 */

import { Client, type IMessage, type StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const HTTP_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
const WS_BASE = HTTP_BASE.replace(/^http/, 'ws').replace(/\/api$/, '');

/** 房间状态（与后端 GameRoom 字段对齐） */
export interface GameRoom {
  roomId: string;
  scriptId: string;
  hostName: string;
  players: Player[];
  phase: GamePhase;
  characterAssignments: Record<string, string>;
  collectedClues: string[];
  chatHistory: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface Player {
  playerId: string;
  name: string;
  isHost: boolean;
  joinedAt: string;
}

export type GamePhase = 'WAITING' | 'CHARACTER' | 'CLUES' | 'INTERROGATE' | 'DEDUCTION' | 'REVEAL';

export interface ChatMessage {
  playerId: string;
  playerName: string;
  content: string;
  timestamp: string;
}

/** 房间事件（与后端 RoomEvent 对齐） */
export interface RoomEvent {
  type:
    | 'player_join'
    | 'player_leave'
    | 'chat'
    | 'character_pick'
    | 'clue_collect'
    | 'phase_change'
    | 'reveal'
    | 'error';
  roomId: string;
  playerId: string;
  playerName: string | null;
  payload: {
    room?: GameRoom;
    content?: string;
    timestamp?: string;
    characterId?: string;
    clueText?: string;
    collectedClues?: string[];
    phase?: GamePhase;
    accusation?: string;
    allClues?: string[];
    message?: string;
    newHost?: string;
    [key: string]: unknown;
  };
  timestamp: string;
}

/** 事件回调集合 */
export interface RoomCallbacks {
  onEvent: (event: RoomEvent) => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (description: string) => void;
}

/** HTTP：创建房间 */
export async function createRoom(scriptId: string, hostName: string, hostPlayerId: string): Promise<GameRoom> {
  const res = await fetch(`${HTTP_BASE}/game/rooms`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ scriptId, hostName, hostPlayerId }),
  });
  if (!res.ok) throw new Error(`创建房间失败：${res.status}`);
  return res.json();
}

/** HTTP：查询房间状态 */
export async function fetchRoom(roomId: string): Promise<GameRoom | null> {
  const res = await fetch(`${HTTP_BASE}/game/rooms/${roomId}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`查询房间失败：${res.status}`);
  return res.json();
}

/**
 * STOMP 客户端连接封装
 *
 * 用法：
 *   const conn = connectRoom(roomId, playerId, playerName, callbacks);
 *   conn.sendChat('大家好');
 *   conn.disconnect();
 */
export interface RoomConnection {
  sendJoin: () => void;
  sendLeave: () => void;
  sendChat: (content: string) => void;
  pickCharacter: (characterId: string) => void;
  collectClue: (clueText: string) => void;
  changePhase: (phase: GamePhase) => void;
  reveal: (accusation: string) => void;
  disconnect: () => void;
  isConnected: () => boolean;
}

export function connectRoom(
  roomId: string,
  playerId: string,
  playerName: string,
  callbacks: RoomCallbacks,
): RoomConnection {
  const stomp = new Client({
    webSocketFactory: () => new SockJS(`${WS_BASE}/ws-game`),
    reconnectDelay: 3000,
    heartbeatIncoming: 10000,
    heartbeatOutgoing: 10000,
    debug: () => { /* 关闭调试输出 */ },
  });

  let subscription: StompSubscription | null = null;

  stomp.onConnect = () => {
    subscription = stomp.subscribe(`/topic/game/${roomId}/events`, (msg: IMessage) => {
      try {
        const event: RoomEvent = JSON.parse(msg.body);
        callbacks.onEvent(event);
      } catch (e) {
        console.error('解析房间事件失败', e);
      }
    });
    callbacks.onConnect?.();
    // 主动发送 join 让其他玩家看到自己
    publish('/app/game/' + roomId + '/join', { playerId, playerName });
  };

  stomp.onDisconnect = () => {
    callbacks.onDisconnect?.();
  };

  stomp.onStompError = (frame) => {
    console.error('STOMP 错误', frame.headers['message']);
    callbacks.onError?.(frame.headers['message'] || 'STOMP 协议错误');
  };

  stomp.activate();

  function publish(destination: string, body: unknown) {
    if (!stomp.connected) {
      console.warn('STOMP 未连接，丢弃消息', destination);
      return;
    }
    stomp.publish({
      destination,
      body: JSON.stringify(body),
      headers: { 'content-type': 'application/json' },
    });
  }

  return {
    sendJoin: () => publish(`/app/game/${roomId}/join`, { playerId, playerName }),
    sendLeave: () => publish(`/app/game/${roomId}/leave`, { playerId }),
    sendChat: (content) => publish(`/app/game/${roomId}/chat`, { playerId, playerName, content }),
    pickCharacter: (characterId) => publish(`/app/game/${roomId}/pick_character`, { playerId, characterId }),
    collectClue: (clueText) => publish(`/app/game/${roomId}/collect_clue`, { playerId, clueText }),
    changePhase: (phase) => publish(`/app/game/${roomId}/change_phase`, { playerId, phase }),
    reveal: (accusation) => publish(`/app/game/${roomId}/reveal`, { playerId, accusation }),
    disconnect: () => {
      if (subscription) subscription.unsubscribe();
      stomp.deactivate();
    },
    isConnected: () => stomp.connected,
  };
}

/** 生成玩家 ID（前端持久化到 localStorage） */
export function getOrCreatePlayerId(): string {
  const KEY = 'history_game_player_id';
  let id = localStorage.getItem(KEY);
  if (!id) {
    id = `p-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    localStorage.setItem(KEY, id);
  }
  return id;
}
