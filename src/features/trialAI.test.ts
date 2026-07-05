/**
 * trialAI — L1 单元测试
 * @see ITERATIONS.md #89
 */

import { describe, it, expect, vi } from 'vitest';

// Mock the entire llmClient module before importing trialAI
vi.mock('@/utils/llmClient', () => ({
  callLLM: vi.fn().mockResolvedValue(JSON.stringify({
    modernPerspective: 'test modern perspective',
    historicalContext: 'test historical context',
    controversies: ['争议点一', '争议点二'],
    takeaway: 'test takeaway',
  })),
}));

describe('trialAI — analyzeTrial', () => {
  it('返回对象包含 4 个字段', async () => {
    const { analyzeTrial } = await import('@/features/trialAI');
    const mockTrial = {
      id: 'qin-hui', title: '秦桧案', dynasty: '南宋', period: '绍兴年间',
      judge: '御史台', accusation: '通敌叛国', defense: '忠君爱国',
      verdict: '赐死', consequences: ['家族流放'],
      historicalSignificance: '南宋政治转折点', type: '政治',
    };
    const result = await analyzeTrial(mockTrial as any);
    expect(result).toHaveProperty('modernPerspective');
    expect(result).toHaveProperty('historicalContext');
    expect(result).toHaveProperty('controversies');
    expect(result).toHaveProperty('takeaway');
  });

  it('controversies 是字符串数组', async () => {
    const { analyzeTrial } = await import('@/features/trialAI');
    const mockTrial = {
      id: 'test', title: '测试', dynasty: '唐', period: '贞观',
      judge: '皇帝', accusation: 'test', defense: 'test', verdict: 'test',
      consequences: ['c1'], historicalSignificance: 's1', type: '政治',
    };
    const result = await analyzeTrial(mockTrial as any);
    expect(Array.isArray(result.controversies)).toBe(true);
    expect(result.controversies.length).toBeGreaterThan(0);
  });

  it('persona 参数不报错', async () => {
    const { analyzeTrial } = await import('@/features/trialAI');
    const mockTrial = {
      id: 'test', title: '测试', dynasty: '唐', period: '贞观',
      judge: '皇帝', accusation: 'test', defense: 'test', verdict: 'test',
      consequences: ['c1'], historicalSignificance: 's1', type: '政治',
    };
    const persona = {
      favoriteDynasties: ['tang'], favoritePersons: ['libai'],
      dimensions: { military: 30, wisdom: 80, governance: 60, charisma: 70 },
      lastUpdated: Date.now(), debateStances: [], simulatorChoices: [],
      browseSummary: { eventsViewed: 0, personsViewed: 0, dynastiesViewed: 0, knowledgeViewed: 0, topicsRead: 0, recentDynasties: [], recentPersons: [] },
      quizAccuracy: 0,
    };
    const result = await analyzeTrial(mockTrial as any, persona as any);
    expect(result).toHaveProperty('modernPerspective');
  });
});

describe('trialAI — compareVerdict', () => {
  it('返回对象包含 3 个字段', async () => {
    const { compareVerdict } = await import('@/features/trialAI');
    const mockTrial = {
      id: 'test', title: '测试', dynasty: '唐', period: '贞观',
      judge: '皇帝', accusation: 'test', defense: 'test', verdict: 'test',
      consequences: ['c1'], historicalSignificance: 's1', type: '政治',
    };
    const userVerdict = { defendant: 'test', guilty: true, sentence: 'test', reason: 'test' };
    const result = await compareVerdict(mockTrial as any, userVerdict as any);
    expect(result).toHaveProperty('aiComment');
    expect(result).toHaveProperty('differenceAnalysis');
    expect(result).toHaveProperty('yourVerdict');
  });
});

describe('trialAI — generateLegalEducation', () => {
  it('返回纯字符串', async () => {
    const { generateLegalEducation } = await import('@/features/trialAI');
    const mockTrial = {
      id: 'test', title: '测试', dynasty: '唐', period: '贞观',
      judge: '皇帝', accusation: 'test', defense: 'test', verdict: 'test',
      consequences: ['c1'], historicalSignificance: 's1', type: '政治',
    };
    const result = await generateLegalEducation(mockTrial as any);
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });
});
