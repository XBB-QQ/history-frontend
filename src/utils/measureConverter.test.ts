/**
 * measureConverter — L1 单元测试
 * @see ITERATIONS.md #95
 */

import { describe, it, expect } from 'vitest';
import { ALL_UNITS, MEASURE_CATEGORIES } from '@/data/features/measureUnits';

describe('MEASURE_CATEGORIES', () => {
  it('包含长度/重量/容量分类', () => {
    const ids = MEASURE_CATEGORIES.map(c => c.id);
    expect(ids).toContain('length');
    expect(ids).toContain('weight');
    expect(ids).toContain('volume');
  });

  it('每个分类包含 id/name/emoji 字段', () => {
    MEASURE_CATEGORIES.forEach(c => {
      expect(c).toHaveProperty('id');
      expect(c).toHaveProperty('name');
      expect(c).toHaveProperty('emoji');
    });
  });
});

describe('ALL_UNITS', () => {
  it('包含至少 15 个单位', () => {
    expect(ALL_UNITS.length).toBeGreaterThanOrEqual(15);
  });

  it('每个单位包含 id/name/toBase/category 字段', () => {
    ALL_UNITS.forEach(u => {
      expect(u).toHaveProperty('id');
      expect(u).toHaveProperty('name');
      expect(u).toHaveProperty('toBase');
      expect(u).toHaveProperty('category');
    });
  });

  it('尺的 toBase 约为 0.231', () => {
    const chi = ALL_UNITS.find(u => u.id === 'chi');
    expect(chi).toBeDefined();
    expect(chi!.toBase).toBeCloseTo(0.231, 4);
  });

  it('厘米的 toBase 为 0.01', () => {
    const cm = ALL_UNITS.find(u => u.id === 'cm');
    expect(cm).toBeDefined();
    expect(cm!.toBase).toBe(0.01);
  });

  it('斤两进制约为 16', () => {
    const jin = ALL_UNITS.find(u => u.id === 'jin');
    const liang = ALL_UNITS.find(u => u.id === 'liang');
    expect(jin).toBeDefined();
    expect(liang).toBeDefined();
    // 汉制：1斤=250g, 1两=15.8g, 比值约 15.8
    expect(jin!.toBase / liang!.toBase).toBeCloseTo(16, 0);
  });

  it('丈尺进制约为 10', () => {
    const zhang = ALL_UNITS.find(u => u.id === 'zhang');
    const chi = ALL_UNITS.find(u => u.id === 'chi');
    expect(zhang).toBeDefined();
    expect(chi).toBeDefined();
    expect(zhang!.toBase / chi!.toBase).toBeCloseTo(10, 0);
  });

  it('斗升进制约为 10', () => {
    const dou = ALL_UNITS.find(u => u.id === 'dou');
    const sheng = ALL_UNITS.find(u => u.id === 'sheng');
    expect(dou).toBeDefined();
    expect(sheng).toBeDefined();
    expect(dou!.toBase / sheng!.toBase).toBeCloseTo(10, 0);
  });

  it('千克是克的 1000 倍', () => {
    const kg = ALL_UNITS.find(u => u.id === 'kg');
    const gram = ALL_UNITS.find(u => u.id === 'gram');
    expect(kg).toBeDefined();
    expect(gram).toBeDefined();
    expect(kg!.toBase / gram!.toBase).toBe(1000);
  });
});
