/**
 * 统一时间轴快照聚合引擎
 * @see ITERATIONS.md #87
 *
 * 输入年份 y，聚合各数据模块同年份快照：
 *  - 在位朝代 / 当年事件 / 在世人物（来自调用方传入的 events/persons/dynasties）
 *  - 疆域 / 气候 / 迁徙（来自静态 data 模块，已有 getAtYear 函数或可按 year 过滤）
 *  - 货币 / 色谱 / 雷达指标 / 度量衡（按朝代名匹配）
 *
 * 设计原则：聚合层是纯函数，不耦合 API；调用方负责加载数据后传入。
 */

import type { FrontendEvent, FrontendPerson, FrontendDynasty } from '@/services/api';
import { getTerritoryAtYear, type DynastyTerritory } from '@/data/features/dynastyTerritory';
import { getClimateForYear, type ClimatePeriod } from '@/data/features/climateHistory';
import { MIGRATION_EVENTS, type MigrationEvent } from '@/data/features/migrationData';
import { DYNASTY_CURRENCIES, type DynastyCurrency } from '@/data/features/currencyData';
import { DYNASTY_PALETTES, type DynastyPalette } from '@/data/features/colorHistory';
import { DYNASTY_METRICS, type DynastyMetrics } from '@/data/features/dynastyCompare';
import { MEASURE_CATEGORIES, type MeasureUnit } from '@/data/features/measureUnits';

// ──────────────────────────────────────────────
// 类型
// ──────────────────────────────────────────────

export interface SnapshotInput {
  events: FrontendEvent[];
  persons: FrontendPerson[];
  dynasties: FrontendDynasty[];
}

export interface YearSnapshot {
  year: number;
  /** 当年在位朝代（来自传入的 dynasties，按 periodStart/periodEnd 过滤） */
  dynasty: FrontendDynasty | null;
  /** 当年发生的事件（精确匹配 year） */
  events: FrontendEvent[];
  /** 当年仍在世的人物 */
  persons: FrontendPerson[];
  /** 疆域快照 */
  territories: DynastyTerritory[];
  /** 气候期 */
  climate: ClimatePeriod | undefined;
  /** 当年发生或进行中的迁徙事件 */
  migrations: MigrationEvent[];
  /** 货币（按朝代映射） */
  currency: DynastyCurrency | undefined;
  /** 色谱（按朝代映射） */
  colors: DynastyPalette | undefined;
  /** 雷达图指标（按朝代映射） */
  metrics: DynastyMetrics | undefined;
  /** 度量衡单位（按朝代匹配，可能多条） */
  measures: MeasureUnit[];
}

// ──────────────────────────────────────────────
// 朝代名归一化
// ──────────────────────────────────────────────

/**
 * 把各种朝代名表达归一化为基名（'唐朝'/'唐代'/'唐' → '唐'）
 * 用于跨模块匹配（currency/colors/metrics 使用了不同后缀）
 */
function normalizeDynastyName(name: string): string {
  return name.replace(/(朝|代|时期|时代)$/g, '').trim();
}

// ──────────────────────────────────────────────
// 辅助过滤
// ──────────────────────────────────────────────

/** 在传入的 dynasties 中查找当年在位朝代 */
export function getDynastyAtYear(
  dynasties: FrontendDynasty[],
  year: number,
): FrontendDynasty | null {
  return (
    dynasties.find(
      (d) =>
        d.periodStart !== null &&
        d.periodEnd !== null &&
        year >= d.periodStart &&
        year <= d.periodEnd,
    ) ?? null
  );
}

/** 精确匹配当年事件 */
export function getEventsAtYear(events: FrontendEvent[], year: number): FrontendEvent[] {
  return events.filter((e) => e.year !== null && e.year === year);
}

/** 当年仍在世的人物（years: [birth, death]，包含两端） */
export function getPersonsAtYear(persons: FrontendPerson[], year: number): FrontendPerson[] {
  return persons.filter((p) => {
    const [start, end] = p.years;
    if (start === null || end === null) return false;
    return year >= start && year <= end;
  });
}

/** 当年发生或进行中的迁徙（按 year 字段精确匹配） */
function getMigrationsAtYear(year: number): MigrationEvent[] {
  return MIGRATION_EVENTS.filter((m) => m.year === year);
}

/** 按归一化朝代名在静态数据中查找货币 */
function findCurrencyByDynastyName(name: string): DynastyCurrency | undefined {
  const target = normalizeDynastyName(name);
  return DYNASTY_CURRENCIES.find((c) => normalizeDynastyName(c.dynasty) === target);
}

/** 按归一化朝代名在静态数据中查找色谱 */
function findPaletteByDynastyName(name: string): DynastyPalette | undefined {
  const target = normalizeDynastyName(name);
  return DYNASTY_PALETTES.find((p) => normalizeDynastyName(p.dynasty) === target);
}

/** 按归一化朝代名在静态数据中查找雷达指标 */
function findMetricsByDynastyName(name: string): DynastyMetrics | undefined {
  const target = normalizeDynastyName(name);
  return DYNASTY_METRICS.find((m) => normalizeDynastyName(m.dynastyName) === target);
}

/** 按归一化朝代名在度量衡中匹配单位 */
function findMeasuresByDynastyName(name: string): MeasureUnit[] {
  const target = normalizeDynastyName(name);
  const matched: MeasureUnit[] = [];
  for (const cat of MEASURE_CATEGORIES) {
    for (const u of cat.units) {
      if (normalizeDynastyName(u.dynasty) === target) {
        matched.push(u);
      }
    }
  }
  return matched;
}

// ──────────────────────────────────────────────
// 主接口
// ──────────────────────────────────────────────

/**
 * 获取指定年份的跨模块快照
 *
 * @param year 目标年份（公元前用负数，如 -221 表示前221年）
 * @param input 已加载的 events/persons/dynasties 数据
 * @returns 聚合后的 YearSnapshot
 */
export function getSnapshotAtYear(year: number, input: SnapshotInput): YearSnapshot {
  const dynasty = getDynastyAtYear(input.dynasties, year);

  // 朝代名 → 静态模块匹配；若无在位朝代则全部为 undefined
  const dynastyName = dynasty?.name ?? '';

  return {
    year,
    dynasty,
    events: getEventsAtYear(input.events, year),
    persons: getPersonsAtYear(input.persons, year),
    territories: getTerritoryAtYear(year),
    climate: getClimateForYear(year),
    migrations: getMigrationsAtYear(year),
    currency: dynastyName ? findCurrencyByDynastyName(dynastyName) : undefined,
    colors: dynastyName ? findPaletteByDynastyName(dynastyName) : undefined,
    metrics: dynastyName ? findMetricsByDynastyName(dynastyName) : undefined,
    measures: dynastyName ? findMeasuresByDynastyName(dynastyName) : [],
  };
}

// ──────────────────────────────────────────────
// 工具：年份范围（用于 scrubber 边界）
// ──────────────────────────────────────────────

/** 默认 scrubber 范围：前2070（夏建立）→ 1912（清亡） */
export const DEFAULT_SNAPSHOT_YEAR_RANGE: [number, number] = [-2070, 1912];

/**
 * 计算给定数据集的实际年份范围
 * 取 events/dynasties/persons 的并集
 */
export function getSnapshotYearRange(input: SnapshotInput): [number, number] {
  const years: number[] = [...DEFAULT_SNAPSHOT_YEAR_RANGE];

  for (const e of input.events) {
    if (e.year !== null) years.push(e.year);
  }
  for (const d of input.dynasties) {
    if (d.periodStart !== null) years.push(d.periodStart);
    if (d.periodEnd !== null) years.push(d.periodEnd);
  }
  for (const p of input.persons) {
    if (p.years[0] !== null) years.push(p.years[0]);
    if (p.years[1] !== null) years.push(p.years[1]);
  }

  return [Math.min(...years), Math.max(...years)];
}
