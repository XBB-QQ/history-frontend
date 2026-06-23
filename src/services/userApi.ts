// 用户 API 客户端

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
  token?: string;
}

async function userFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...(options?.headers as Record<string, string>) },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || err.error || '请求失败');
  }
  return res.json();
}

/** 用户信息 DTO */
export interface UserDTO {
  id: number;
  username: string;
  nickname: string;
  email?: string;
  phone?: string;
  role: string;
  avatarUrl?: string;
  bio?: string;
  createdAt: string;
  lastLoginAt?: string;
}

/** 登录响应 */
export interface LoginResponse {
  token: string;
  user: UserDTO;
  message: string;
}

/** 注册请求 */
export interface RegisterRequest {
  username: string;
  password: string;
  nickname: string;
  email?: string;
  phone?: string;
}

/** 登录请求 */
export interface LoginRequest {
  username: string;
  password: string;
}

/** 更新用户请求 */
export interface UpdateUserRequest {
  nickname?: string;
  email?: string;
  phone?: string;
  bio?: string;
  avatarUrl?: string;
}

/** 登录 */
export async function loginUser(payload: LoginRequest): Promise<LoginResponse> {
  const data = await userFetch<LoginResponse>(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return data as LoginResponse;
}

/** 注册 */
export async function registerUser(payload: RegisterRequest): Promise<{ user: UserDTO; message: string }> {
  return userFetch<{ user: UserDTO; message: string }>(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/** 验证 Token */
export async function verifyUserToken(token: string): Promise<{ valid: boolean; user?: UserDTO }> {
  return userFetch<{ valid: boolean; user?: UserDTO }>(`${API_BASE_URL}/auth/verify`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  });
}

/** 获取当前用户信息 */
export async function getMe(token: string): Promise<UserDTO> {
  return userFetch<UserDTO>(`${API_BASE_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

/** 更新用户信息 */
export async function updateUser(token: string, payload: UpdateUserRequest): Promise<UserDTO> {
  return userFetch<UserDTO>(`${API_BASE_URL}/auth/me`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
  });
}
