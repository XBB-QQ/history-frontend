/**
 * personaBuilder — L1 单元测试
 * @see ITERATIONS.md #88
 */

import { describe, it, expect } from 'vitest';
import { buildPersonaContext, buildPersonaPrompt, hasEnoughData, getPersonaStats } from '@/utils/personaBuilder';
import type { UserPersona } from '@/types/userPersona';

function createMockPersona(overrides?: Partial<UserPersona>): UserPersona {
  return {
    favoriteDynasties: [],
    favoritePersons: [],
    favoriteEvents: [],
    debateStances: [],
    simulatorChoices: [],
    browseSummary: {
      eventsViewed: 0,
      personsViewed: 0,
      dynastiesViewed: 0,
      knowledgeViewed: 0,
      topicsRead: 0,
      recentDynasties: [],
      recentPersons: [],
    },
    quizAccuracy: 0,
    dimensions: { military: 50, wisdom: 50, governance: 50, charisma: 50 },
    lastUpdated: Date.now(),
    ...overrides,
  };
}

describe('buildPersonaContext', () => {
  it('返回包含 5 个摘要字段的对象', () => {
    const ctx = buildPersonaContext(createMockPersona());
    expect(ctx.dynastySummary).toBeDefined();
    expect(ctx.personSummary).toBeDefined();
    expect(ctx.debateSummary).toBeDefined();
    expect(ctx.simulatorSummary).toBeDefined();
    expect(ctx.personalitySummary).toBeDefined();
  });

  it('有朝代偏好时使用 favoriteDynasties', () => {
    const persona = createMockPersona({
      favoriteDynasties: ['tang', 'song'],
    });
    const ctx = buildPersonaContext(persona);
    expect(ctx.dynastySummary).toContain('tang');
    expect(ctx.dynastySummary).toContain('song');
  });

  it('无朝代偏好时使用 recentDynasties', () => {
    const persona = createMockPersona({
      browseSummary: {
        ...createMockPersona().browseSummary,
        recentDynasties: ['han', 'wei'],
      },
    });
    const ctx = buildPersonaContext(persona);
    expect(ctx.dynastySummary).toContain('han');
  });

  it('辩论记录超过 3 条只取最近 3 条', () => {
    const stances: any = Array.from({ length: 5 }, (_, i) => ({
      topicId: `topic-${i}`,
      topicName: `话题${i}`,
      stance: i % 2 === 0 ? 'pro' : 'con',
      comment: 'test',
      timestamp: Date.now() + i,
    }));
    const persona = createMockPersona({ debateStances: stances });
    const ctx = buildPersonaContext(persona);
    expect(ctx.debateSummary).toContain('辩论5次');
  });

  it('rawJson 包含所有核心字段', () => {
    const persona = createMockPersona({
      favoriteDynasties: ['tang'],
      quizAccuracy: 75,
    });
    const ctx = buildPersonaContext(persona);
    const parsed = JSON.parse(ctx.rawJson);
    expect(parsed.dynastySummary).toContain('tang');
    expect(parsed.quizAccuracy).toBe(75);
  });
});

describe('buildPersonaPrompt', () => {
  it('返回包含【用户画像】的字符串', () => {
    const prompt = buildPersonaPrompt(createMockPersona());
    expect(prompt).toContain('【用户画像】');
  });

  it('包含朝代偏好行', () => {
    const prompt = buildPersonaPrompt(createMockPersona());
    expect(prompt).toMatch(/朝代偏好：/);
  });

  it('包含性格画像行', () => {
    const prompt = buildPersonaPrompt(createMockPersona());
    expect(prompt).toMatch(/性格画像：/);
  });

  it('有辩论记录时包含辩论行', () => {
    const persona = createMockPersona({
      debateStances: [{ topic: 't', topicName: '测试', stance: 'agree', reasoning: 'r', timestamp: 0 }] as any,
    });
    const prompt = buildPersonaPrompt(persona);
    expect(prompt).toContain('辩论记录');
  });

  it('无辩论记录时不包含辩论行', () => {
    const prompt = buildPersonaPrompt(createMockPersona());
    expect(prompt).not.toContain('辩论记录');
  });

  it('超长时截断到前三项', () => {
    const persona = createMockPersona({
      favoriteDynasties: Array.from({ length: 50 }, (_, i) => `dynasty-${i}`),
      favoritePersons: Array.from({ length: 50 }, (_, i) => `person-${i}`),
      debateStances: Array.from({ length: 50 }, (_, i) => ({
        topic: `t-${i}`, topicName: `话题${i}`, stance: 'agree', reasoning: 'r', timestamp: i,
      })) as any,
      simulatorChoices: Array.from({ length: 50 }, (_, i) => ({
        scenarioId: `s-${i}`, scenarioName: `场景${i}`, choice: 'c',
      })) as any,
    });
    const prompt = buildPersonaPrompt(persona);
    expect(prompt.split('\n').length).toBeLessThanOrEqual(6);
  });
});

describe('hasEnoughData', () => {
  it('空 persona 返回 false', () => {
    expect(hasEnoughData(createMockPersona())).toBe(false);
  });

  it('3 条数据返回 true', () => {
    const persona = createMockPersona({
      favoriteDynasties: ['tang'],
      favoritePersons: ['confucius'],
      browseSummary: { ...createMockPersona().browseSummary, eventsViewed: 1 },
    });
    expect(hasEnoughData(persona)).toBe(true);
  });

  it('10 条数据返回 true', () => {
    const persona = createMockPersona({
      favoriteDynasties: Array.from({ length: 5 }, (_, i) => `d-${i}`),
      favoritePersons: Array.from({ length: 5 }, (_, i) => `p-${i}`),
    });
    expect(hasEnoughData(persona)).toBe(true);
  });
});

describe('getPersonaStats', () => {
  it('返回包含所有统计字段的对象', () => {
    const stats = getPersonaStats(createMockPersona());
    expect(stats.dynasties).toBe(0);
    expect(stats.persons).toBe(0);
    expect(stats.debates).toBe(0);
    expect(stats.choices).toBe(0);
    expect(stats.total).toBe(0);
  });

  it('total 等于各项之和', () => {
    const persona = createMockPersona({
      favoriteDynasties: ['tang', 'song'],
      favoritePersons: ['libai'],
      debateStances: [
        { topic: 't1', topicName: 'a', stance: 'x', reasoning: 'r', timestamp: 0 },
        { topic: 't2', topicName: 'b', stance: 'x', reasoning: 'r', timestamp: 0 },
      ] as any,
      simulatorChoices: [{ scenarioId: 's1', scenarioName: 'x', choice: 'y' }] as any,
      browseSummary: {
        ...createMockPersona().browseSummary,
        eventsViewed: 5,
        personsViewed: 3,
      },
    });
    const stats = getPersonaStats(persona);
    expect(stats.dynasties).toBe(2);
    expect(stats.persons).toBe(1);
    expect(stats.debates).toBe(2);
    expect(stats.choices).toBe(1);
    expect(stats.eventsViewed).toBe(5);
    expect(stats.total).toBe(2 + 1 + 2 + 1 + 5 + 3);
  });
});
