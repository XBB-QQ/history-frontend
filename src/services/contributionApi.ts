/**
 * 协作式知识贡献 — 前端 API 服务
 */
import { fetchJSON } from './api';

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

/** 提交贡献 */
export async function submitContribution(req: ContributionRequest): Promise<Contribution> {
  // P0-3 token 治理：改用 fetchJSON，自动注入 Authorization（原 getAuthHeaders 重复造轮子）
  return fetchJSON<Contribution>(`${API_BASE}/user/contributions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });
}

/** 查看我的贡献 */
export async function getMyContributions(): Promise<MyContributionsResult> {
  return fetchJSON<MyContributionsResult>(`${API_BASE}/user/contributions/mine`);
}
