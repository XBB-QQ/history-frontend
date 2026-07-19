// 用户画像后端同步 API
// 跨设备同步：登录后从云端拉取画像覆盖本地，本地变更防抖 PUT 回云端
// 失败静默，不影响业务

import type { UserPersona } from '@/types/userPersona';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

function authHeaders(token: string): HeadersInit {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

/** GET 响应体 */
interface GetPersonaResponse {
  username: string;
  found: boolean;
  persona?: UserPersona;
}

/**
 * 拉取当前登录用户的画像
 * @returns 画像对象；云端无数据时返回 null
 */
export async function fetchPersona(token: string): Promise<UserPersona | null> {
  const res = await fetch(`${BASE_URL}/users/me/persona`, {
    headers: authHeaders(token),
  });
  if (!res.ok) throw new Error(`GET persona failed: ${res.status}`);
  const data = (await res.json()) as GetPersonaResponse;
  return data.found && data.persona ? data.persona : null;
}

/**
 * 保存画像到云端（全量覆盖）
 */
export async function savePersona(token: string, persona: UserPersona): Promise<void> {
  const res = await fetch(`${BASE_URL}/users/me/persona`, {
    method: 'PUT',
    headers: authHeaders(token),
    body: JSON.stringify(persona),
  });
  if (!res.ok) throw new Error(`PUT persona failed: ${res.status}`);
}

/**
 * 清除云端画像
 */
export async function clearPersona(token: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/users/me/persona`, {
    method: 'DELETE',
    headers: authHeaders(token),
  });
  if (!res.ok) throw new Error(`DELETE persona failed: ${res.status}`);
}
