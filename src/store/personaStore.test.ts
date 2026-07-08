/**
 * AI 记忆中枢 — Persona Store L1 单元测试
 * @see ITERATIONS.md #88
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { usePersonaStore } from './personaStore';

beforeEach(() => {
  localStorage.clear();
  usePersonaStore.getState().reset();
});

describe('personaStore', () => {
  it('初始状态 persona 为 null', () => {
    const state = usePersonaStore.getState();
    expect(state.persona).toBeNull();
    expect(state.hasData).toBe(false);
    expect(state.dataCount).toBe(0);
  });

  it('recordDebate 记录辩论立场', () => {
    usePersonaStore.getState().recordDebate({
      topicId: 'test-topic',
      topicName: '测试话题',
      stance: 'pro',
      comment: 'test reasoning',
    });

    const state = usePersonaStore.getState();
    expect(state.persona).not.toBeNull();
    expect(state.persona!.debateStances).toHaveLength(1);
    expect(state.persona!.debateStances[0].topicId).toBe('test-topic');
    expect(state.persona!.debateStances[0].stance).toBe('pro');
  });

  it('recordDebate 多次调用累积记录', () => {
    usePersonaStore.getState().recordDebate({
      topicId: 'topic-1',
      topicName: '话题一',
      stance: 'pro',
      comment: 'reason 1',
    });
    usePersonaStore.getState().recordDebate({
      topicId: 'topic-2',
      topicName: '话题二',
      stance: 'con',
      comment: 'reason 2',
    });

    const state = usePersonaStore.getState();
    expect(state.persona!.debateStances).toHaveLength(2);
    expect(state.getDataCount()).toBeGreaterThanOrEqual(2);
  });

  it('recordSimulatorChoice 记录抉择', () => {
    usePersonaStore.getState().recordSimulatorChoice({
      scenarioId: 'scenario-1',
      scenarioName: '玄武门之变',
      choice: 'attack',
    });

    const state = usePersonaStore.getState();
    expect(state.persona!.simulatorChoices).toHaveLength(1);
    expect(state.persona!.simulatorChoices[0].scenarioName).toBe('玄武门之变');
  });

  it('recordBrowse 增加浏览计数', () => {
    usePersonaStore.getState().recordBrowse('eventsViewed');
    usePersonaStore.getState().recordBrowse('personsViewed');

    const state = usePersonaStore.getState();
    expect(state.persona!.browseSummary.eventsViewed).toBe(1);
    expect(state.persona!.browseSummary.personsViewed).toBe(1);
  });

  it('recordBrowse 记录最近浏览朝代', () => {
    usePersonaStore.getState().recordBrowse('dynastiesViewed', 'tang');
    usePersonaStore.getState().recordBrowse('dynastiesViewed', 'song');

    const state = usePersonaStore.getState();
    expect(state.persona!.browseSummary.recentDynasties).toContain('tang');
    expect(state.persona!.browseSummary.recentDynasties).toContain('song');
  });

  it('recordBrowse 不重复添加相同朝代', () => {
    usePersonaStore.getState().recordBrowse('dynastiesViewed', 'tang');
    usePersonaStore.getState().recordBrowse('dynastiesViewed', 'tang');

    const state = usePersonaStore.getState();
    const tangCount = state.persona!.browseSummary.recentDynasties.filter(
      (d) => d === 'tang'
    ).length;
    expect(tangCount).toBe(1);
  });

  it('recordQuiz 更新准确率', () => {
    usePersonaStore.getState().recordQuiz(85);
    const state = usePersonaStore.getState();
    expect(state.persona!.quizAccuracy).toBe(85);
  });

  it('getContext 返回上下文摘要', () => {
    usePersonaStore.getState().recordDebate({
      topicId: 'test',
      topicName: '测试',
      stance: 'pro',
      comment: 'test',
    });

    const ctx = usePersonaStore.getState().getContext();
    expect(ctx.debateSummary).toContain('1 次');
    expect(ctx.rawJson).toBeTruthy();
  });

  it('getContext 无人格数据时返回空摘要', () => {
    const ctx = usePersonaStore.getState().getContext();
    expect(ctx.dynastySummary).toBeDefined();
    expect(ctx.personSummary).toBeDefined();
  });

  it('getDataCount 返回数据总量', () => {
    usePersonaStore.getState().recordDebate({
      topicId: 'test',
      topicName: '测试',
      stance: 'pro',
      comment: 'test',
    });
    usePersonaStore.getState().recordBrowse('eventsViewed');

    const count = usePersonaStore.getState().getDataCount();
    expect(count).toBeGreaterThanOrEqual(2);
  });

  it('clearPersona 清除所有数据', () => {
    usePersonaStore.getState().recordDebate({
      topicId: 'test',
      topicName: '测试',
      stance: 'pro',
      comment: 'test',
    });
    usePersonaStore.getState().clearPersona();

    const state = usePersonaStore.getState();
    expect(state.persona!.debateStances).toHaveLength(0);
    expect(state.persona!.favoriteDynasties).toHaveLength(0);
    expect(state.persona!.clearedAt).toBeDefined();
  });

  it('reset 完全重置 store', () => {
    usePersonaStore.getState().recordDebate({
      topicId: 'test',
      topicName: '测试',
      stance: 'pro',
      comment: 'test',
    });
    usePersonaStore.getState().reset();

    const state = usePersonaStore.getState();
    expect(state.persona).toBeNull();
    expect(state.hasData).toBe(false);
    expect(state.dataCount).toBe(0);
  });
});
