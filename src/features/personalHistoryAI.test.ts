/**
 * personalHistoryAI — L1 单元测试
 * @see ITERATIONS.md #90
 */

import { describe, it, expect, vi } from 'vitest';

// Mock llmClient
vi.mock('@/utils/llmClient', () => ({
  callLLM: vi.fn().mockResolvedValue(JSON.stringify({
    formalBiography: '太史公曰：此人一生勤勉...',
    modernTranslation: '这位先生一生勤奋努力...',
    historianComment: '勤勉一生，堪为后人表率。',
    lifeStages: [
      { name: '求学时期', period: '2000-2008', events: ['考上大学'], characteristic: '求知若渴' },
      { name: '事业起步', period: '2008-2015', events: ['进入职场'], characteristic: '锐意进取' },
    ],
    keywords: ['勤奋', '坚韧', '进取'],
  })),
}));

describe('personalHistoryAI — generatePersonalBiography', () => {
  it('返回对象包含 5 个字段', async () => {
    const { generatePersonalBiography } = await import('@/features/personalHistoryAI');
    const history = {
      name: '张三', gender: 'male' as const, birthDate: '1990-01-01',
      birthLocation: '北京', lifeEvents: [], biography: '',
    };
    const result = await generatePersonalBiography(history as any);
    expect(result).toHaveProperty('formalBiography');
    expect(result).toHaveProperty('modernTranslation');
    expect(result).toHaveProperty('historianComment');
    expect(result).toHaveProperty('lifeStages');
    expect(result).toHaveProperty('keywords');
  });

  it('formalBiography 非空', async () => {
    const { generatePersonalBiography } = await import('@/features/personalHistoryAI');
    const history = {
      name: '张三', gender: 'male' as const, birthDate: '1990-01-01',
      birthLocation: '北京', lifeEvents: [], biography: '',
    };
    const result = await generatePersonalBiography(history as any);
    expect(result.formalBiography.length).toBeGreaterThan(0);
  });

  it('lifeStages 是数组', async () => {
    const { generatePersonalBiography } = await import('@/features/personalHistoryAI');
    const history = {
      name: '张三', gender: 'male' as const, birthDate: '1990-01-01',
      birthLocation: '北京', lifeEvents: [], biography: '',
    };
    const result = await generatePersonalBiography(history as any);
    expect(Array.isArray(result.lifeStages)).toBe(true);
    expect(result.lifeStages.length).toBeGreaterThan(0);
  });

  it('keywords 不超过 8 个', async () => {
    const { generatePersonalBiography } = await import('@/features/personalHistoryAI');
    const history = {
      name: '张三', gender: 'male' as const, birthDate: '1990-01-01',
      birthLocation: '北京', lifeEvents: [], biography: '',
    };
    const result = await generatePersonalBiography(history as any);
    expect(result.keywords.length).toBeLessThanOrEqual(8);
  });
});

describe('personalHistoryAI — generatePosthumousTitle', () => {
  it('返回 title 和 explanation', async () => {
    const { generatePosthumousTitle } = await import('@/features/personalHistoryAI');
    const history = {
      name: '张三', gender: 'male' as const, birthDate: '1990-01-01',
      birthLocation: '北京', lifeEvents: [], biography: '',
    };
    const result = await generatePosthumousTitle(history as any);
    expect(result).toHaveProperty('title');
    expect(result).toHaveProperty('explanation');
    expect(result.title.length).toBeGreaterThan(0);
  });
});
