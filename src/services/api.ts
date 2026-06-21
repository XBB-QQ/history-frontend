// 五千年史馆 — API 客户端
// 调用 Spring Boot 后端 REST API，返回前端类型格式

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

// ──────────────────────────────────────────────
// 类型定义（后端 DTO 原始响应）
// ──────────────────────────────────────────────

interface BackendEventDTO {
  id: number;
  uid: string;
  title: string;
  year: number;
  yearDisplay: string;
  yearPrecision: string;
  category: string;
  dynastyName: string | null;
  description: string;
  fulltext: string;
  tags: string[];
  relatedEvents: string[];
  relatedPersons: string[];
}

interface BackendPersonDTO {
  id: number;
  uid: string;
  name: string;
  courtesyName: string;
  dynastyName: string | null;
  years: string[];
  yearsDisplay: string;
  gender: string;
  roles: string[];
  quote: string;
  bio: string;
  tags: string[];
  relatedEvents: string[];
  relatedPersons: string[];
}

interface BackendDynastyDTO {
  id: number;
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

interface BackendKnowledgeDTO {
  id: number;
  uid: string;
  title: string;
  startYear: number | null;
  startYearDisplay: string;
  dynastyName: string | null;
  description: string;
  fulltext: string;
  tags: string[];
  relevantEvents: string[];
  relevantPersons: string[];
  meta: string;
}

// ──────────────────────────────────────────────
// 前端类型（与 src/types/index.ts 一致）
// ──────────────────────────────────────────────

export interface FrontendEvent {
  id: string;
  title: string;
  year: number | null;
  yearDisplay: string;
  yearPrecision: 'exact' | 'approx' | 'range';
  category: string;
  dynasty: string;
  description: string;
  fulltext: string;
  tags: string[];
  relatedEvents: string[];
  relatedPersons: string[];
  source: string;
  crawlDate: string;
}

export interface FrontendPerson {
  id: string;
  name: string;
  courtesyName: string;
  dynasty: string;
  years: [number | null, number | null];
  yearsDisplay: string;
  gender: 'male' | 'female' | 'unknown';
  roles: string[];
  quote: string;
  bio: string;
  tags: string[];
  relatedEvents: string[];
  relatedPersons: string[];
  source: string;
  crawlDate: string;
}

export interface FrontendDynasty {
  id: string;
  name: string;
  period: string;
  periodStart: number | null;
  periodEnd: number | null;
  periodPrecision: string;
  founder: string;
  capital: string;
  duration: string;
  durationYears: number | null;
  highlights: string;
  description: string;
  fallReason: string;
  legacy: string;
  relatedEvents: string[];
  relatedPersons: string[];
  source: string;
  crawlDate: string;
}

export interface FrontendKnowledge {
  id: string;
  title: string;
  startYear: number | null;
  startYearDisplay: string;
  dynasty: string;
  description: string;
  fulltext: string;
  tags: string[];
  relevantEvents: string[];
  relevantPersons: string[];
  meta: string;
  source: string;
  crawlDate: string;
}

// ──────────────────────────────────────────────
// 适配器
// ──────────────────────────────────────────────

function adaptYearPrecision(precision: string): 'exact' | 'approx' | 'range' {
  if (precision === 'range') return 'range';
  if (precision === 'approx') return 'approx';
  return 'exact';
}

function adaptGender(g: string): 'male' | 'female' | 'unknown' {
  if (g === 'female') return 'female';
  if (g === 'male') return 'male';
  return 'unknown';
}

function extractDurationYears(duration: string): number | null {
  // 从 "约470年" 或 "422年" 提取数字
  const match = duration.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : null;
}

function adaptEvent(dto: BackendEventDTO): FrontendEvent {
  return {
    id: String(dto.id),
    title: dto.title,
    year: dto.year,
    yearDisplay: dto.yearDisplay,
    yearPrecision: adaptYearPrecision(dto.yearPrecision),
    category: dto.category,
    dynasty: dto.dynastyName ?? '',
    description: dto.description,
    fulltext: dto.fulltext,
    tags: dto.tags,
    relatedEvents: dto.relatedEvents,
    relatedPersons: dto.relatedPersons,
    source: '',
    crawlDate: '',
  };
}

function adaptPerson(dto: BackendPersonDTO): FrontendPerson {
  // 后端 years 是字符串数组，如 ["-202", "220"] 或 ["618", "907"]
  const numParts = dto.years.map((s) => (s ? parseInt(s, 10) : null));
  const years: [number | null, number | null] =
    numParts.length >= 2
      ? [numParts[0] ?? null, numParts[1] ?? null]
      : [numParts[0] ?? null, null];

  return {
    id: String(dto.id),
    name: dto.name,
    courtesyName: dto.courtesyName,
    dynasty: dto.dynastyName ?? '',
    years,
    yearsDisplay: dto.yearsDisplay,
    gender: adaptGender(dto.gender),
    roles: dto.roles,
    quote: dto.quote,
    bio: dto.bio,
    tags: dto.tags,
    relatedEvents: dto.relatedEvents,
    relatedPersons: dto.relatedPersons,
    source: '',
    crawlDate: '',
  };
}

function adaptDynasty(dto: BackendDynastyDTO): FrontendDynasty {
  return {
    id: String(dto.id),
    name: dto.name,
    period: dto.period,
    periodStart: dto.periodStart,
    periodEnd: dto.periodEnd,
    periodPrecision: 'range',
    founder: dto.founder,
    capital: dto.capital,
    duration: dto.duration,
    durationYears: extractDurationYears(dto.duration),
    highlights: dto.highlights,
    description: dto.description,
    fallReason: dto.fallReason,
    legacy: dto.legacy,
    relatedEvents: [],
    relatedPersons: [],
    source: '',
    crawlDate: '',
  };
}

function adaptKnowledge(dto: BackendKnowledgeDTO): FrontendKnowledge {
  return {
    id: String(dto.id),
    title: dto.title,
    startYear: dto.startYear,
    startYearDisplay: dto.startYearDisplay,
    dynasty: dto.dynastyName ?? '',
    description: dto.description,
    fulltext: dto.fulltext,
    tags: dto.tags,
    relevantEvents: dto.relevantEvents,
    relevantPersons: dto.relevantPersons,
    meta: dto.meta,
    source: '',
    crawlDate: '',
  };
}

// ──────────────────────────────────────────────
// API 函数
// ──────────────────────────────────────────────

async function fetchJSON<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: { 'Accept': 'application/json' },
  });
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText} for ${url}`);
  }
  return response.json();
}

/**
 * 获取时间轴事件（按年份排序，不分页）
 */
export async function fetchTimelineEvents(): Promise<FrontendEvent[]> {
  const data = await fetchJSON<BackendEventDTO[]>(`${BASE_URL}/events/timeline`);
  return data.map(adaptEvent);
}

/**
 * 分页获取事件
 */
export async function fetchEvents(page = 0, size = 50): Promise<{ content: FrontendEvent[]; total: number }> {
  const data = await fetchJSON<{ content: BackendEventDTO[]; totalElements: number }>(
    `${BASE_URL}/events?page=${page}&size=${size}`
  );
  return {
    content: data.content.map(adaptEvent),
    total: data.totalElements,
  };
}

/**
 * 获取事件详情
 */
export async function fetchEventById(id: number): Promise<FrontendEvent> {
  const dto = await fetchJSON<BackendEventDTO>(`${BASE_URL}/events/${id}`);
  return adaptEvent(dto);
}

/**
 * 通过 UID 获取事件
 */
export async function fetchEventByUid(uid: string): Promise<FrontendEvent> {
  const dto = await fetchJSON<BackendEventDTO>(`${BASE_URL}/events/uid/${uid}`);
  return adaptEvent(dto);
}

/**
 * 搜索事件
 */
export async function searchEvents(query: string): Promise<FrontendEvent[]> {
  const data = await fetchJSON<{ content: BackendEventDTO[]; totalElements: number }>(
    `${BASE_URL}/events/search?keyword=${encodeURIComponent(query)}`
  );
  return data.content.map(adaptEvent);
}

/**
 * 获取所有朝代
 */
export async function fetchDynasties(): Promise<FrontendDynasty[]> {
  const data = await fetchJSON<{ content: BackendDynastyDTO[]; totalElements: number }>(
    `${BASE_URL}/dynasties?page=0&size=50`
  );
  return data.content.map(adaptDynasty);
}

/**
 * 获取朝代详情
 */
export async function fetchDynastyById(id: number): Promise<FrontendDynasty> {
  const dto = await fetchJSON<BackendDynastyDTO>(`${BASE_URL}/dynasties/${id}`);
  return adaptDynasty(dto);
}

/**
 * 通过 UID 获取朝代
 */
export async function fetchDynastyByUid(uid: string): Promise<FrontendDynasty> {
  const dto = await fetchJSON<BackendDynastyDTO>(`${BASE_URL}/dynasties/uid/${uid}`);
  return adaptDynasty(dto);
}

/**
 * 通过名称获取朝代
 */
export async function fetchDynastyByName(name: string): Promise<FrontendDynasty> {
  const dto = await fetchJSON<BackendDynastyDTO>(`${BASE_URL}/dynasties/name/${name}`);
  return adaptDynasty(dto);
}

/**
 * 分页获取人物
 */
export async function fetchPersons(page = 0, size = 50, filters?: {
  gender?: string;
  dynasty?: string;
  role?: string;
}): Promise<{ content: FrontendPerson[]; total: number }> {
  const params = new URLSearchParams({ page: String(page), size: String(size) });
  if (filters?.gender) params.set('gender', filters.gender);
  if (filters?.dynasty) params.set('dynasty', filters.dynasty);
  if (filters?.role) params.set('role', filters.role);

  const data = await fetchJSON<{ content: BackendPersonDTO[]; totalElements: number }>(
    `${BASE_URL}/persons?${params}`
  );
  return {
    content: data.content.map(adaptPerson),
    total: data.totalElements,
  };
}

/**
 * 获取所有人物（通过大分页获取全部）
 */
export async function fetchAllPersons(): Promise<FrontendPerson[]> {
  // 取一页足够大的数据覆盖所有人物（已知约50人）
  const data = await fetchJSON<{ content: BackendPersonDTO[]; totalElements: number }>(
    `${BASE_URL}/persons?page=0&size=100`
  );
  return data.content.map(adaptPerson);
}

/**
 * 获取人物详情
 */
export async function fetchPersonById(id: number): Promise<FrontendPerson> {
  const dto = await fetchJSON<BackendPersonDTO>(`${BASE_URL}/persons/${id}`);
  return adaptPerson(dto);
}

/**
 * 通过 UID 获取人物
 */
export async function fetchPersonByUid(uid: string): Promise<FrontendPerson> {
  const dto = await fetchJSON<BackendPersonDTO>(`${BASE_URL}/persons/uid/${uid}`);
  return adaptPerson(dto);
}

/**
 * 搜索人物
 */
export async function searchPersons(query: string): Promise<FrontendPerson[]> {
  const data = await fetchJSON<{ content: BackendPersonDTO[]; totalElements: number }>(
    `${BASE_URL}/persons/search?keyword=${encodeURIComponent(query)}`
  );
  return data.content.map(adaptPerson);
}

/**
 * 获取知识卡片（取一页足够大的数据覆盖所有卡片）
 */
export async function fetchKnowledgeCards(): Promise<FrontendKnowledge[]> {
  const data = await fetchJSON<{ content: BackendKnowledgeDTO[]; totalElements: number }>(
    `${BASE_URL}/knowledge?page=0&size=50`
  );
  return data.content.map(adaptKnowledge);
}

/**
 * 分页获取知识卡片
 */
export async function fetchKnowledgePage(page = 0, size = 50): Promise<{ content: FrontendKnowledge[]; total: number }> {
  const data = await fetchJSON<{ content: BackendKnowledgeDTO[]; totalElements: number }>(
    `${BASE_URL}/knowledge?page=${page}&size=${size}`
  );
  return {
    content: data.content.map(adaptKnowledge),
    total: data.totalElements,
  };
}

/**
 * 获取知识卡片详情
 */
export async function fetchKnowledgeById(id: number): Promise<FrontendKnowledge> {
  const dto = await fetchJSON<BackendKnowledgeDTO>(`${BASE_URL}/knowledge/${id}`);
  return adaptKnowledge(dto);
}

/**
 * 通过 UID 获取知识卡片
 */
export async function fetchKnowledgeByUid(uid: string): Promise<FrontendKnowledge> {
  const dto = await fetchJSON<BackendKnowledgeDTO>(`${BASE_URL}/knowledge/uid/${uid}`);
  return adaptKnowledge(dto);
}

/**
 * 搜索知识卡片
 */
export async function searchKnowledge(query: string): Promise<FrontendKnowledge[]> {
  const data = await fetchJSON<{ content: BackendKnowledgeDTO[]; totalElements: number }>(
    `${BASE_URL}/knowledge/search?keyword=${encodeURIComponent(query)}`
  );
  return data.content.map(adaptKnowledge);
}
