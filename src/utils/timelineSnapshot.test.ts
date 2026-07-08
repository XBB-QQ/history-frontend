/**
 * timelineSnapshot — L1 单元测试
 * @see ITERATIONS.md #87
 *
 * 覆盖闭环验收 T87-02~T87-04：
 *  - T87-02 快照事件与独立页同年份事件一致
 *  - T87-03 快照人物与独立页同年份在世人物一致
 *  - T87-04 快照朝代与独立页同年份在位朝代一致
 *
 * 另外覆盖疆域/气候/迁徙模块的一致性、朝代名归一化、边界情况。
 */

import { describe, it, expect } from 'vitest';
import {
  getSnapshotAtYear,
  getDynastyAtYear,
  getEventsAtYear,
  getPersonsAtYear,
  getSnapshotYearRange,
  DEFAULT_SNAPSHOT_YEAR_RANGE,
  type SnapshotInput,
} from '@/utils/timelineSnapshot';
import type { FrontendEvent, FrontendPerson, FrontendDynasty } from '@/services/api';
import { getTerritoryAtYear } from '@/data/features/dynastyTerritory';
import { getClimateForYear } from '@/data/features/climateHistory';
import { MIGRATION_EVENTS } from '@/data/features/migrationData';

// ──────────────────────────────────────────────
// Mock 数据工厂（填默认值，覆盖关键字段）
// ──────────────────────────────────────────────

function makeDynasty(over: Partial<FrontendDynasty>): FrontendDynasty {
  return {
    id: '0',
    name: '',
    period: '',
    periodStart: null,
    periodEnd: null,
    periodPrecision: 'range',
    founder: '',
    capital: '',
    duration: '',
    durationYears: null,
    highlights: '',
    description: '',
    fallReason: '',
    legacy: '',
    populationPeak: '',
    gdpEstimate: '',
    majorTradeRoutes: '',
    culturalHighlights: '',
    relatedEvents: [],
    relatedPersons: [],
    source: '',
    crawlDate: '',
    ...over,
  };
}

function makeEvent(over: Partial<FrontendEvent>): FrontendEvent {
  return {
    id: '0',
    title: '',
    year: null,
    yearDisplay: '',
    yearPrecision: 'exact',
    category: '',
    dynasty: '',
    description: '',
    fulltext: '',
    impact: '',
    significance: 3,
    relatedArticles: [],
    tags: [],
    relatedEvents: [],
    relatedPersons: [],
    source: '',
    crawlDate: '',
    ...over,
  };
}

function makePerson(over: Partial<FrontendPerson>): FrontendPerson {
  return {
    id: '0',
    uid: '',
    name: '',
    courtesyName: '',
    dynasty: '',
    birthPlace: '',
    deathPlace: '',
    achievements: '',
    years: [null, null],
    yearsDisplay: '',
    gender: 'unknown',
    roles: [],
    quote: '',
    bio: '',
    tags: [],
    relatedEvents: [],
    relatedPersons: [],
    source: '',
    crawlDate: '',
    ...over,
  };
}

const mockDynasties: FrontendDynasty[] = [
  makeDynasty({ id: 'tang', name: '唐', period: '618-907', periodStart: 618, periodEnd: 907, capital: '长安' }),
  makeDynasty({ id: 'song', name: '宋', period: '960-1279', periodStart: 960, periodEnd: 1279, capital: '开封' }),
];

const mockEvents: FrontendEvent[] = [
  makeEvent({ id: 'e1', title: '玄武门之变', year: 626 }),
  makeEvent({ id: 'e2', title: '安史之乱', year: 755 }),
  makeEvent({ id: 'e3', title: '陈桥兵变', year: 960 }),
];

const mockPersons: FrontendPerson[] = [
  makePerson({ id: 'p1', name: '李白', years: [701, 762] }),
  makePerson({ id: 'p2', name: '杜甫', years: [712, 770] }),
  makePerson({ id: 'p3', name: '苏轼', years: [1037, 1101] }),
];

const input: SnapshotInput = {
  events: mockEvents,
  persons: mockPersons,
  dynasties: mockDynasties,
};

// ──────────────────────────────────────────────
// T87-02 事件一致性
// ──────────────────────────────────────────────

describe('T87-02 事件一致性 — 快照事件与独立页同年份事件一致', () => {
  it('year=755 应返回安史之乱', () => {
    const snapshot = getSnapshotAtYear(755, input);
    const expected = mockEvents.filter((e) => e.year === 755);
    expect(snapshot.events).toEqual(expected);
    expect(snapshot.events).toHaveLength(1);
    expect(snapshot.events[0].title).toBe('安史之乱');
  });

  it('year=626 应返回玄武门之变', () => {
    const snapshot = getSnapshotAtYear(626, input);
    expect(snapshot.events.map((e) => e.title)).toEqual(['玄武门之变']);
  });

  it('year=800 应返回空数组（无事件）', () => {
    const snapshot = getSnapshotAtYear(800, input);
    expect(snapshot.events).toEqual([]);
  });

  it('getEventsAtYear 与 filter 结果一致', () => {
    for (const year of [626, 755, 960, 800, 0]) {
      const direct = mockEvents.filter((e) => e.year === year);
      const viaFn = getEventsAtYear(mockEvents, year);
      expect(viaFn).toEqual(direct);
    }
  });
});

// ──────────────────────────────────────────────
// T87-03 人物一致性
// ──────────────────────────────────────────────

describe('T87-03 人物一致性 — 快照人物与独立页同年份在世人物一致', () => {
  it('year=750 应返回李白和杜甫（均在世）', () => {
    const snapshot = getSnapshotAtYear(750, input);
    const expected = mockPersons.filter((p) => {
      const [s, e] = p.years;
      return s !== null && e !== null && 750 >= s && 750 <= e;
    });
    expect(snapshot.persons).toEqual(expected);
    // filter 保留 mock 数据顺序（李白在前，杜甫在后）
    expect(snapshot.persons.map((p) => p.name)).toEqual(['李白', '杜甫']);
  });

  it('year=1050 应只返回苏轼', () => {
    const snapshot = getSnapshotAtYear(1050, input);
    expect(snapshot.persons.map((p) => p.name)).toEqual(['苏轼']);
  });

  it('year=500 应返回空（无人在世）', () => {
    const snapshot = getSnapshotAtYear(500, input);
    expect(snapshot.persons).toEqual([]);
  });

  it('getPersonsAtYear 与 filter 结果一致', () => {
    for (const year of [700, 750, 1050, 1500, -100]) {
      const direct = mockPersons.filter((p) => {
        const [s, e] = p.years;
        return s !== null && e !== null && year >= s && year <= e;
      });
      const viaFn = getPersonsAtYear(mockPersons, year);
      expect(viaFn).toEqual(direct);
    }
  });

  it('years 字段含 null 的不返回', () => {
    const personsWithNull = [
      makePerson({ id: 'x', name: 'X', years: [null, null] }),
    ];
    expect(getPersonsAtYear(personsWithNull, 100)).toEqual([]);
  });
});

// ──────────────────────────────────────────────
// T87-04 朝代一致性
// ──────────────────────────────────────────────

describe('T87-04 朝代一致性 — 快照朝代与独立页同年份在位朝代一致', () => {
  it('year=750 应返回唐朝', () => {
    const snapshot = getSnapshotAtYear(750, input);
    const expected = mockDynasties.find(
      (d) => d.periodStart !== null && d.periodEnd !== null && 750 >= d.periodStart && 750 <= d.periodEnd,
    );
    expect(snapshot.dynasty).toEqual(expected ?? null);
    expect(snapshot.dynasty?.name).toBe('唐');
  });

  it('year=1000 应返回宋朝', () => {
    const snapshot = getSnapshotAtYear(1000, input);
    expect(snapshot.dynasty?.name).toBe('宋');
  });

  it('year=5000 应返回 null（超出所有朝代）', () => {
    const snapshot = getSnapshotAtYear(5000, input);
    expect(snapshot.dynasty).toBeNull();
  });

  it('getDynastyAtYear 与 find 结果一致', () => {
    for (const year of [618, 750, 960, 1279, 5000, -100]) {
      const direct = mockDynasties.find(
        (d) => d.periodStart !== null && d.periodEnd !== null && year >= d.periodStart && year <= d.periodEnd,
      ) ?? null;
      const viaFn = getDynastyAtYear(mockDynasties, year);
      expect(viaFn).toEqual(direct);
    }
  });

  it('朝代 periodStart/periodEnd 含 null 的不参与匹配', () => {
    const dynasties = [makeDynasty({ id: 'x', name: 'X', periodStart: null, periodEnd: null })];
    expect(getDynastyAtYear(dynasties, 100)).toBeNull();
  });
});

// ──────────────────────────────────────────────
// 跨模块一致性 — 疆域/气候/迁徙
// ──────────────────────────────────────────────

describe('疆域一致性 — 快照疆域 = getTerritoryAtYear(year)', () => {
  it('year=750 唐朝时期', () => {
    const snapshot = getSnapshotAtYear(750, input);
    expect(snapshot.territories).toEqual(getTerritoryAtYear(750));
  });

  it('year=-221 秦朝时期', () => {
    const snapshot = getSnapshotAtYear(-221, input);
    expect(snapshot.territories).toEqual(getTerritoryAtYear(-221));
  });

  it('year=5000 无疆域', () => {
    const snapshot = getSnapshotAtYear(5000, input);
    expect(snapshot.territories).toEqual(getTerritoryAtYear(5000));
    expect(snapshot.territories).toHaveLength(0);
  });
});

describe('气候一致性 — 快照气候 = getClimateForYear(year)', () => {
  it('year=750 应返回隋唐温暖期', () => {
    const snapshot = getSnapshotAtYear(750, input);
    expect(snapshot.climate).toEqual(getClimateForYear(750));
    expect(snapshot.climate?.era).toBe('隋唐温暖期');
  });

  it('year=-221 应返回春秋战国回暖', () => {
    const snapshot = getSnapshotAtYear(-221, input);
    expect(snapshot.climate).toEqual(getClimateForYear(-221));
    expect(snapshot.climate?.era).toBe('春秋战国回暖');
  });
});

describe('迁徙一致性 — 快照迁徙 = MIGRATION_EVENTS.filter(m => m.year === year)', () => {
  it('year=755 应返回安史之乱南迁', () => {
    const snapshot = getSnapshotAtYear(755, input);
    const expected = MIGRATION_EVENTS.filter((m) => m.year === 755);
    expect(snapshot.migrations).toEqual(expected);
    expect(snapshot.migrations[0]?.title).toBe('安史之乱南迁');
  });

  it('year=311 应返回永嘉南渡', () => {
    const snapshot = getSnapshotAtYear(311, input);
    expect(snapshot.migrations.map((m) => m.title)).toEqual(['永嘉南渡']);
  });

  it('year=800 应返回空（无迁徙）', () => {
    const snapshot = getSnapshotAtYear(800, input);
    expect(snapshot.migrations).toEqual([]);
  });
});

// ──────────────────────────────────────────────
// 朝代名归一化匹配
// ──────────────────────────────────────────────

describe('朝代名归一化 — 唐朝/唐代/唐 都能匹配静态模块', () => {
  it('year=750 唐朝时期应同时返回 currency/colors/metrics', () => {
    const snapshot = getSnapshotAtYear(750, input);
    expect(snapshot.dynasty?.name).toBe('唐');
    expect(snapshot.currency).toBeDefined();
    expect(snapshot.currency?.dynasty).toMatch(/唐/);
    expect(snapshot.colors).toBeDefined();
    expect(snapshot.colors?.dynasty).toMatch(/唐/);
    expect(snapshot.metrics).toBeDefined();
    expect(snapshot.metrics?.dynastyName).toBe('唐');
  });

  it('year=1000 宋朝时期应同时返回 currency/colors/metrics', () => {
    const snapshot = getSnapshotAtYear(1000, input);
    expect(snapshot.dynasty?.name).toBe('宋');
    expect(snapshot.currency?.dynasty).toMatch(/宋/);
    expect(snapshot.colors?.dynasty).toMatch(/宋/);
    expect(snapshot.metrics?.dynastyName).toBe('宋');
  });

  it('year=5000 无在位朝代 → currency/colors/metrics 全部 undefined', () => {
    const snapshot = getSnapshotAtYear(5000, input);
    expect(snapshot.dynasty).toBeNull();
    expect(snapshot.currency).toBeUndefined();
    expect(snapshot.colors).toBeUndefined();
    expect(snapshot.metrics).toBeUndefined();
    expect(snapshot.measures).toEqual([]);
  });
});

// ──────────────────────────────────────────────
// 年份范围
// ──────────────────────────────────────────────

describe('getSnapshotYearRange', () => {
  it('默认范围 [前2070, 1912]', () => {
    expect(DEFAULT_SNAPSHOT_YEAR_RANGE).toEqual([-2070, 1912]);
  });

  it('空输入应返回默认范围', () => {
    const emptyInput: SnapshotInput = { events: [], persons: [], dynasties: [] };
    expect(getSnapshotYearRange(emptyInput)).toEqual([-2070, 1912]);
  });

  it('应取 events/persons/dynasties 年份与默认范围的并集', () => {
    const [min, max] = getSnapshotYearRange(input);
    // 默认范围 [-2070, 1912] 与 mock 数据 [618, 1279] 的并集 = [-2070, 1912]
    expect(min).toBe(-2070);
    expect(max).toBe(1912);
  });
});

// ──────────────────────────────────────────────
// 综合：快照完整性
// ──────────────────────────────────────────────

describe('快照完整性 — 综合验证', () => {
  it('year=755 应同时返回朝代/事件/人物/疆域/气候/迁徙/货币/色谱/指标/度量衡', () => {
    const snapshot = getSnapshotAtYear(755, input);
    expect(snapshot.year).toBe(755);
    expect(snapshot.dynasty).not.toBeNull();
    expect(snapshot.events.length).toBeGreaterThan(0);
    expect(snapshot.persons.length).toBeGreaterThan(0);
    expect(snapshot.territories.length).toBeGreaterThan(0);
    expect(snapshot.climate).toBeDefined();
    expect(snapshot.migrations.length).toBeGreaterThan(0);
    expect(snapshot.currency).toBeDefined();
    expect(snapshot.colors).toBeDefined();
    expect(snapshot.metrics).toBeDefined();
  });

  it('year=10000（远古未来）应全部为空/undefined，但 year 字段保留', () => {
    const snapshot = getSnapshotAtYear(10000, input);
    expect(snapshot.year).toBe(10000);
    expect(snapshot.dynasty).toBeNull();
    expect(snapshot.events).toEqual([]);
    expect(snapshot.persons).toEqual([]);
    expect(snapshot.migrations).toEqual([]);
    expect(snapshot.currency).toBeUndefined();
    expect(snapshot.colors).toBeUndefined();
    expect(snapshot.metrics).toBeUndefined();
  });
});
