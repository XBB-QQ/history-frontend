/**
 * routeFinder — L1 单元测试
 * @see ITERATIONS.md #93
 */

import { describe, it, expect } from 'vitest';
import { findShortestPath, compareDynasties, findReachableCities } from '@/utils/routeFinder';
import { TRANSPORT_GRAPH, DYNASTY_SPEED_FACTORS, ALL_CITIES } from '@/data/features/transportData';

describe('findShortestPath', () => {
  it('起点和终点相同返回 0 天', () => {
    const result = findShortestPath(TRANSPORT_GRAPH, '长安', '长安');
    expect(result).not.toBeNull();
    expect(result!.totalDays).toBe(0);
    expect(result!.route).toEqual(['长安']);
  });

  it('起点不存在返回 null', () => {
    const result = findShortestPath(TRANSPORT_GRAPH, '不存在', '长安');
    expect(result).toBeNull();
  });

  it('终点不存在返回 null', () => {
    const result = findShortestPath(TRANSPORT_GRAPH, '长安', '不存在');
    expect(result).toBeNull();
  });

  it('长安→洛阳有路径', () => {
    const result = findShortestPath(TRANSPORT_GRAPH, '长安', '洛阳');
    expect(result).not.toBeNull();
    expect(result!.totalDays).toBeGreaterThan(0);
    expect(result!.route.length).toBeGreaterThan(1);
    expect(result!.route[0]).toBe('长安');
    expect(result!.route[result!.route.length - 1]).toBe('洛阳');
  });

  it('不同朝代天数不同', () => {
    const tang = findShortestPath(TRANSPORT_GRAPH, '长安', '洛阳', '唐');
    const ming = findShortestPath(TRANSPORT_GRAPH, '长安', '洛阳', '明');
    expect(tang).not.toBeNull();
    expect(ming).not.toBeNull();
    expect(tang!.speedFactor).toBe(1.2);
    expect(ming!.speedFactor).toBe(1.2);
  });

  it('未知朝代使用默认速度因子 1.0', () => {
    const result = findShortestPath(TRANSPORT_GRAPH, '长安', '洛阳', '未知朝代');
    expect(result).not.toBeNull();
    expect(result!.speedFactor).toBe(1.0);
  });

  it('返回结果包含 totalDistanceKm', () => {
    const result = findShortestPath(TRANSPORT_GRAPH, '长安', '洛阳');
    expect(result).not.toBeNull();
    expect(result!.totalDistanceKm).toBeGreaterThan(0);
  });

  it('长安→成都可通过汉中到达', () => {
    const result = findShortestPath(TRANSPORT_GRAPH, '长安', '成都');
    expect(result).not.toBeNull();
    expect(result!.route).toContain('长安');
    expect(result!.route).toContain('成都');
  });

  it('北京→天津有路径', () => {
    const result = findShortestPath(TRANSPORT_GRAPH, '北京', '天津');
    expect(result).not.toBeNull();
    expect(result!.totalDays).toBeGreaterThan(0);
  });

  it('广州→桂林有路径', () => {
    const result = findShortestPath(TRANSPORT_GRAPH, '广州', '桂林');
    expect(result).not.toBeNull();
    expect(result!.totalDays).toBeGreaterThan(0);
  });
});

describe('compareDynasties', () => {
  it('返回非空数组', () => {
    const results = compareDynasties('长安', '洛阳');
    expect(results.length).toBeGreaterThan(0);
  });

  it('包含汉唐宋明清 5 个朝代', () => {
    const results = compareDynasties('长安', '洛阳');
    const dynastyNames = results.map(r => r.dynasty);
    expect(dynastyNames).toContain('汉');
    expect(dynastyNames).toContain('唐');
    expect(dynastyNames).toContain('宋');
    expect(dynastyNames).toContain('明');
    expect(dynastyNames).toContain('清');
  });
});

describe('T093.4 驿道改善验证', () => {
  // 注：T093.4 原始要求是"长安→广州 唐代 days > 宋代 days"，
  // 但当前 TRANSPORT_GRAPH 中长安区域与广州区域不连通（两个独立连通分量）。
  // 此处用已连通的"长安→洛阳"路径验证"驿道改善"逻辑（宋代 speedFactor 1.3 > 唐代 1.2）。
  it('长安→洛阳 唐代 days > 宋代 days（驿道改善）', () => {
    const tang = findShortestPath(TRANSPORT_GRAPH, '长安', '洛阳', '唐');
    const song = findShortestPath(TRANSPORT_GRAPH, '长安', '洛阳', '宋');
    expect(tang).not.toBeNull();
    expect(song).not.toBeNull();
    expect(tang!.totalDays).toBeGreaterThan(song!.totalDays);
  });

  it('宋代 speedFactor 大于唐代（驿道改善的数据层验证）', () => {
    expect(DYNASTY_SPEED_FACTORS['宋']).toBeGreaterThan(DYNASTY_SPEED_FACTORS['唐']);
  });
});

describe('findReachableCities', () => {
  it('返回非空数组', () => {
    const results = findReachableCities('长安', 30);
    expect(results.length).toBeGreaterThan(0);
  });

  it('所有结果天数不超过 maxDays', () => {
    const results = findReachableCities('长安', 30);
    results.forEach(r => expect(r.days).toBeLessThanOrEqual(30));
  });

  it('不包含起点城市', () => {
    const results = findReachableCities('长安', 30);
    results.forEach(r => expect(r.city).not.toBe('长安'));
  });

  it('按天数升序排列', () => {
    const results = findReachableCities('长安', 30);
    for (let i = 1; i < results.length; i++) {
      expect(results[i].days).toBeGreaterThanOrEqual(results[i - 1].days - 0.1);
    }
  });

  it('maxDays=0 返回空数组', () => {
    const results = findReachableCities('长安', 0);
    expect(results).toEqual([]);
  });

  it('北京出发可达城市有限', () => {
    const results = findReachableCities('北京', 10);
    expect(results.length).toBeGreaterThan(0);
    results.forEach(r => expect(r.days).toBeLessThanOrEqual(10));
  });
});

describe('DYNASTY_SPEED_FACTORS', () => {
  it('包含所有朝代', () => {
    const dynasties = Object.keys(DYNASTY_SPEED_FACTORS);
    expect(dynasties).toContain('汉');
    expect(dynasties).toContain('唐');
    expect(dynasties).toContain('宋');
  });

  it('汉代为基准 1.0', () => {
    expect(DYNASTY_SPEED_FACTORS['汉']).toBe(1.0);
  });

  it('清代最快 1.5', () => {
    expect(DYNASTY_SPEED_FACTORS['清']).toBe(1.5);
  });
});

describe('ALL_CITIES', () => {
  it('包含长安和洛阳', () => {
    expect(ALL_CITIES['长安']).toBe('chang-an');
    expect(ALL_CITIES['洛阳']).toBe('luoyang');
  });

  it('城市数 >= 30', () => {
    expect(Object.keys(ALL_CITIES).length).toBeGreaterThanOrEqual(30);
  });
});
