// 后台管理 API 客户端

const ADMIN_BASE_URL = import.meta.env.VITE_ADMIN_API_BASE_URL || 'http://localhost:8080/api/admin';

interface ApiResponse<T> {
  data?: T;
  message?: string;
}

async function adminFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...(options?.headers as Record<string, string>) },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || '请求失败');
  }
  return res.json();
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  username: string;
  role: string;
  apiKey: string;
  message: string;
}

export interface AuthPayload {
  username: string;
  password: string;
}

/** 登录 */
export async function adminLogin(payload: AuthPayload): Promise<LoginResponse> {
  return adminFetch<LoginResponse>(`${ADMIN_BASE_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/** 验证 API Key */
export async function verifyApiKey(apiKey: string): Promise<{ valid: boolean; message: string }> {
  return adminFetch<{ valid: boolean; message: string }>(`${ADMIN_BASE_URL}/auth/verify`, {
    method: 'POST',
    body: JSON.stringify({ apiKey }),
  });
}

// ── 事件管理 ──

export interface AdminEventDTO {
  id?: number;
  uid: string;
  title: string;
  year: number;
  yearDisplay: string;
  yearPrecision: string;
  category: string;
  dynastyName?: string;
  description: string;
  fulltext: string;
  tags: string[];
  relatedEvents: string[];
  relatedPersons: string[];
}

export async function adminGetEvents(): Promise<AdminEventDTO[]> {
  return adminFetch<AdminEventDTO[]>(`${ADMIN_BASE_URL}/events`);
}

export async function adminSaveEvent(dto: AdminEventDTO): Promise<AdminEventDTO> {
  if (dto.id) {
    return adminFetch<AdminEventDTO>(`${ADMIN_BASE_URL}/events/${dto.id}`, {
      method: 'PUT',
      body: JSON.stringify(dto),
    });
  }
  return adminFetch<AdminEventDTO>(`${ADMIN_BASE_URL}/events`, {
    method: 'POST',
    body: JSON.stringify(dto),
  });
}

export async function adminDeleteEvent(id: number): Promise<void> {
  await fetch(`${ADMIN_BASE_URL}/events/${id}`, { method: 'DELETE' });
}

// ── 人物管理 ──

export interface AdminPersonDTO {
  id?: number;
  uid: string;
  name: string;
  courtesyName: string;
  dynastyName?: string;
  years?: number[];
  yearsDisplay: string;
  gender: string;
  roles: string[];
  quote: string;
  bio: string;
  tags: string[];
  relatedEvents: string[];
  relatedPersons: string[];
}

export async function adminGetPersons(): Promise<AdminPersonDTO[]> {
  return adminFetch<AdminPersonDTO[]>(`${ADMIN_BASE_URL}/persons`);
}

export async function adminSavePerson(dto: AdminPersonDTO): Promise<AdminPersonDTO> {
  if (dto.id) {
    return adminFetch<AdminPersonDTO>(`${ADMIN_BASE_URL}/persons/${dto.id}`, {
      method: 'PUT',
      body: JSON.stringify(dto),
    });
  }
  return adminFetch<AdminPersonDTO>(`${ADMIN_BASE_URL}/persons`, {
    method: 'POST',
    body: JSON.stringify(dto),
  });
}

export async function adminDeletePerson(id: number): Promise<void> {
  await fetch(`${ADMIN_BASE_URL}/persons/${id}`, { method: 'DELETE' });
}

// ── 朝代管理 ──

export interface AdminDynastyDTO {
  id?: number;
  uid: string;
  name: string;
  fullName: string;
  period: string;
  periodStart: number | null;
  periodEnd: number | null;
  founder: string;
  lastRuler: string;
  capital: string;
  duration: string;
  highlights: string;
  description: string;
  fallReason: string;
  legacy: string;
}

export async function adminGetDynasties(): Promise<AdminDynastyDTO[]> {
  return adminFetch<AdminDynastyDTO[]>(`${ADMIN_BASE_URL}/dynasties`);
}

export async function adminSaveDynasty(dto: AdminDynastyDTO): Promise<AdminDynastyDTO> {
  if (dto.id) {
    return adminFetch<AdminDynastyDTO>(`${ADMIN_BASE_URL}/dynasties/${dto.id}`, {
      method: 'PUT',
      body: JSON.stringify(dto),
    });
  }
  return adminFetch<AdminDynastyDTO>(`${ADMIN_BASE_URL}/dynasties`, {
    method: 'POST',
    body: JSON.stringify(dto),
  });
}

export async function adminDeleteDynasty(id: number): Promise<void> {
  await fetch(`${ADMIN_BASE_URL}/dynasties/${id}`, { method: 'DELETE' });
}

// ── 知识卡片管理 ──

export interface AdminKnowledgeDTO {
  id?: number;
  uid: string;
  title: string;
  startYear: number | null;
  startYearDisplay: string;
  dynastyName?: string;
  description: string;
  fulltext: string;
  tags: string[];
  relevantEvents: string[];
  relevantPersons: string[];
  meta: string;
}

export async function adminGetKnowledge(): Promise<AdminKnowledgeDTO[]> {
  return adminFetch<AdminKnowledgeDTO[]>(`${ADMIN_BASE_URL}/knowledge`);
}

export async function adminSaveKnowledge(dto: AdminKnowledgeDTO): Promise<AdminKnowledgeDTO> {
  if (dto.id) {
    return adminFetch<AdminKnowledgeDTO>(`${ADMIN_BASE_URL}/knowledge/${dto.id}`, {
      method: 'PUT',
      body: JSON.stringify(dto),
    });
  }
  return adminFetch<AdminKnowledgeDTO>(`${ADMIN_BASE_URL}/knowledge`, {
    method: 'POST',
    body: JSON.stringify(dto),
  });
}

export async function adminDeleteKnowledge(id: number): Promise<void> {
  await fetch(`${ADMIN_BASE_URL}/knowledge/${id}`, { method: 'DELETE' });
}
