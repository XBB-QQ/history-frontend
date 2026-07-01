/**
 * 协作式知识贡献 — 前端 API 服务
 */

import { apiGet, apiPost } from './api';

export interface Contribution {
  id: number;
  type: string;        // event / person / dynasty / knowledge / correction
  entityId: number | null;
  title: string;
  content: string;
  changeDescription: string;
  status: 'pending' | 'approved' | 'rejected' | 'published';
  userId: number;
  username: string;
  reviewerId: number | null;
  reviewComment: string | null;
  submittedAt: string;
  reviewedAt: string | null;
  points: number;
}

export interface ContributionRequest {
  type: string;
  entityId?: number | null;
  title: string;
  content: string;
  changeDescription: string;
}

export interface MyContributionsResult {
  contributions: Contribution[];
  total: number;
  approved: number;
}

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem('user_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/** 提交贡献 */
export async function submitContribution(req: ContributionRequest): Promise<Contribution> {
  const res = await fetch(`${API_BASE}/user/contributions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(req),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: '提交失败' }));
    throw new Error(err.error || `提交失败 (${res.status})`);
  }

  return res.json();
}

/** 查看我的贡献 */
export async function getMyContributions(): Promise<MyContributionsResult> {
  const res = await fetch(`${API_BASE}/user/contributions/mine`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error(`获取失败 (${res.status})`);
  }

  return res.json();
}
