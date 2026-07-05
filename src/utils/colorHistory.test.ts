/**
 * colorHistory — L1 单元测试
 * @see ITERATIONS.md #96
 */

import { describe, it, expect } from 'vitest';
import { DYNASTY_PALETTES, ALL_HISTORICAL_COLORS, COLORS_BY_CATEGORY } from '@/data/features/colorHistory';

describe('DYNASTY_PALETTES', () => {
  it('包含至少 6 个朝代', () => {
    expect(DYNASTY_PALETTES.length).toBeGreaterThanOrEqual(6);
  });

  it('每个色盘包含 dynasty/colors 字段', () => {
    DYNASTY_PALETTES.forEach(p => {
      expect(p).toHaveProperty('dynasty');
      expect(p).toHaveProperty('colors');
      expect(Array.isArray(p.colors)).toBe(true);
    });
  });

  it('唐代色盘存在', () => {
    const tang = DYNASTY_PALETTES.find(p => p.dynasty === '唐代');
    expect(tang).toBeDefined();
  });

  it('每个颜色包含 name/hex', () => {
    DYNASTY_PALETTES.forEach(p => {
      p.colors.forEach(c => {
        expect(c).toHaveProperty('name');
        expect(c).toHaveProperty('hex');
      });
    });
  });

  it('唐代色盘至少有 5 个颜色', () => {
    const tang = DYNASTY_PALETTES.find(p => p.dynasty === '唐代');
    expect(tang!.colors.length).toBeGreaterThanOrEqual(5);
  });
});

describe('ALL_HISTORICAL_COLORS', () => {
  it('返回扁平化的颜色数组', () => {
    expect(Array.isArray(ALL_HISTORICAL_COLORS)).toBe(true);
    expect(ALL_HISTORICAL_COLORS.length).toBeGreaterThan(DYNASTY_PALETTES.length);
  });

  it('每个颜色包含 dynasty 字段', () => {
    ALL_HISTORICAL_COLORS.forEach(c => {
      expect(c).toHaveProperty('dynasty');
    });
  });
});

describe('COLORS_BY_CATEGORY', () => {
  it('包含 royal/common/ritual/dyed 分类', () => {
    expect(COLORS_BY_CATEGORY).toHaveProperty('royal');
    expect(COLORS_BY_CATEGORY).toHaveProperty('common');
    expect(COLORS_BY_CATEGORY).toHaveProperty('ritual');
    expect(COLORS_BY_CATEGORY).toHaveProperty('dyed');
  });

  it('royal 分类非空', () => {
    expect(COLORS_BY_CATEGORY.royal.length).toBeGreaterThan(0);
  });
});
