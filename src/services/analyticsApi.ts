// 页面访问埋点 API
// 前端在路由切换时调用 recordPageView()，后端异步落库
// 失败静默，不影响业务

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const SESSION_KEY = 'analytics_session_id';
const SESSION_TTL_MS = 30 * 60 * 1000; // 30 分钟无活动算新会话

/** 获取或创建会话 ID（localStorage 持久化，30 分钟 TTL） */
export function getSessionId(): string {
  const now = Date.now();
  const raw = localStorage.getItem(SESSION_KEY);
  if (raw) {
    try {
      const { sid, ts } = JSON.parse(raw);
      if (sid && now - ts < SESSION_TTL_MS) {
        // 续期
        localStorage.setItem(SESSION_KEY, JSON.stringify({ sid, ts: now }));
        return sid;
      }
    } catch {
      // 损坏数据，走重建逻辑
    }
  }
  const sid = crypto.randomUUID();
  localStorage.setItem(SESSION_KEY, JSON.stringify({ sid, ts: now }));
  return sid;
}

/** 触发会话续期（用户操作时调用，避免会话过期） */
export function touchSession(): void {
  const raw = localStorage.getItem(SESSION_KEY);
  if (raw) {
    try {
      const { sid } = JSON.parse(raw);
      if (sid) localStorage.setItem(SESSION_KEY, JSON.stringify({ sid, ts: Date.now() }));
    } catch {
      // 忽略
    }
  }
}

/**
 * 上报一次页面访问（fire-and-forget，失败静默）
 * @param pagePath 页面路径，如 /timeline
 * @param userId 已登录用户 ID（可选）
 *
 * 注意：不用 sendBeacon，因为它发 application/json 会触发 CORS preflight，
 * 而 sendBeacon 不处理 preflight 响应会被浏览器静默阻止。
 * fetch + keepalive 等价 sendBeacon（页面卸载时也能发出），且能正确处理 CORS。
 */
export function recordPageView(pagePath: string, userId?: string | null): void {
  const sessionId = getSessionId();
  const body: Record<string, unknown> = { pagePath, sessionId };
  if (userId) body.userId = userId;

  fetch(`${BASE_URL}/page-view`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    keepalive: true,
  }).catch(() => {
    // 埋点失败不处理
  });
}

/** 热度榜响应 */
export interface HotPagesResponse {
  total: number;
  days: number;
  pages: Record<string, number>; // pagePath -> viewCount
}

/**
 * 获取热度榜 Top N
 * @param limit 返回条数
 * @param days  时间窗口：0=全量（默认），7=近7天，30=近30天
 */
export async function getHotPages(limit = 20, days = 0): Promise<HotPagesResponse> {
  const res = await fetch(`${BASE_URL}/page-view/hot?limit=${limit}&days=${days}`);
  if (!res.ok) throw new Error(`热度榜获取失败: ${res.status}`);
  return res.json();
}

/** 冷门页面响应（结构与热度榜相同，但按访问数升序） */
export interface ColdPagesResponse {
  total: number;
  pages: Record<string, number>;
}

/**
 * 获取冷门页面（访问次数最少的 N 个已访问页面）
 */
export async function getColdPages(limit = 10): Promise<ColdPagesResponse> {
  const res = await fetch(`${BASE_URL}/page-view/cold?limit=${limit}`);
  if (!res.ok) throw new Error(`冷门页面获取失败: ${res.status}`);
  return res.json();
}

/** 单页访问数 */
export async function getPageViewCount(path: string): Promise<number> {
  const res = await fetch(`${BASE_URL}/page-view/count?path=${encodeURIComponent(path)}`);
  if (!res.ok) throw new Error(`访问数获取失败: ${res.status}`);
  const data = await res.json();
  return data.count as number;
}
