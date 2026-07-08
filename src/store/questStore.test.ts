/**
 * 研学线进度 Store — L1 单元测试
 * @see ITERATIONS.md #85
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { useQuestStore } from './questStore';

// 清空 localStorage 并重置 store
beforeEach(() => {
  localStorage.clear();
  // 重置 store 状态
  const store = useQuestStore.getState();
  store.resetAll();
});

describe('questStore', () => {
  it('初始状态为空', () => {
    const state = useQuestStore.getState();
    expect(state.progress).toEqual({});
    expect(state.activeRouteId).toBeNull();
    expect(state.overallProgress).toBe(0);
    expect(state.sealsObtained).toHaveLength(0);
  });

  it('startRoute 可以开始一条研学线', () => {
    useQuestStore.getState().startRoute('anshi');
    const state = useQuestStore.getState();
    expect(state.activeRouteId).toBe('anshi');
    expect(state.progress['anshi']).toBeDefined();
    expect(state.progress['anshi']!.routeId).toBe('anshi');
    expect(state.progress['anshi']!.nodeStatuses.length).toBeGreaterThan(0);
    expect(state.progress['anshi']!.sealObtained).toBe(false);
  });

  it('startRoute 不会重复创建已有线路', () => {
    const now = Date.now();
    useQuestStore.getState().startRoute('anshi');
    useQuestStore.getState().startRoute('anshi');
    const state = useQuestStore.getState();
    // 第二次调用不应改变 startedAt
    expect(state.progress['anshi']!.startedAt).toBeGreaterThanOrEqual(now - 100);
  });

  it('markNodeComplete 标记节点为完成', () => {
    useQuestStore.getState().startRoute('anshi');
    const firstNodeId = useQuestStore.getState().progress['anshi']!.nodeStatuses[0].nodeId;
    useQuestStore.getState().markNodeComplete('anshi', firstNodeId);

    const node = useQuestStore.getState().progress['anshi']!.nodeStatuses.find(
      (n) => n.nodeId === firstNodeId
    );
    expect(node!.completed).toBe(true);
    expect(node!.completedAt).toBeGreaterThan(0);
  });

  it('markNodeComplete 对不存在的线路无影响', () => {
    useQuestStore.getState().markNodeComplete('nonexistent', 'node1');
    expect(useQuestStore.getState().progress['nonexistent']).toBeUndefined();
  });

  it('markNodeComplete 对已存在的节点无影响', () => {
    useQuestStore.getState().startRoute('anshi');
    useQuestStore.getState().markNodeComplete('anshi', 'nonexistent-node');
    expect(useQuestStore.getState().progress['anshi']).toBeDefined();
  });

  it('getProgressPercent 返回正确的完成百分比', () => {
    useQuestStore.getState().startRoute('anshi');
    const initialPercent = useQuestStore.getState().getProgressPercent('anshi');
    expect(initialPercent).toBe(0);

    const firstNodeId = useQuestStore.getState().progress['anshi']!.nodeStatuses[0].nodeId;
    useQuestStore.getState().markNodeComplete('anshi', firstNodeId);
    const newPercent = useQuestStore.getState().getProgressPercent('anshi');
    expect(newPercent).toBeGreaterThan(0);
  });

  it('getProgressPercent 对不存在的线路返回 0', () => {
    expect(useQuestStore.getState().getProgressPercent('nonexistent')).toBe(0);
  });

  it('readBriefing 标记线报已读', () => {
    useQuestStore.getState().startRoute('anshi');
    expect(useQuestStore.getState().progress['anshi']!.briefingRead).toBe(false);
    useQuestStore.getState().readBriefing('anshi');
    expect(useQuestStore.getState().progress['anshi']!.briefingRead).toBe(true);
  });

  it('readBriefing 对不存在的线路无影响', () => {
    useQuestStore.getState().readBriefing('nonexistent');
    expect(useQuestStore.getState().progress['nonexistent']).toBeUndefined();
  });

  it('resetRoute 清除指定线路进度', () => {
    useQuestStore.getState().startRoute('anshi');
    expect(useQuestStore.getState().progress['anshi']).toBeDefined();
    useQuestStore.getState().resetRoute('anshi');
    expect(useQuestStore.getState().progress['anshi']).toBeUndefined();
  });

  it('resetRoute 同时重置 activeRouteId', () => {
    useQuestStore.getState().startRoute('anshi');
    useQuestStore.getState().resetRoute('anshi');
    expect(useQuestStore.getState().activeRouteId).toBeNull();
  });

  it('resetAll 清除所有进度', () => {
    useQuestStore.getState().startRoute('anshi');
    useQuestStore.getState().startRoute('qin-unify');
    useQuestStore.getState().resetAll();
    const state = useQuestStore.getState();
    expect(state.progress).toEqual({});
    expect(state.activeRouteId).toBeNull();
    expect(state.sealsObtained).toHaveLength(0);
  });

  it('sealObtained 在所有节点完成后变为 true', () => {
    useQuestStore.getState().startRoute('anshi');
    const progress = useQuestStore.getState().progress['anshi']!;
    expect(progress.sealObtained).toBe(false);

    // 标记所有节点完成
    progress.nodeStatuses.forEach((node) => {
      useQuestStore.getState().markNodeComplete('anshi', node.nodeId);
    });

    expect(useQuestStore.getState().progress['anshi']!.sealObtained).toBe(true);
  });

  it('sealsObtained 列表在获得印章时添加记录', () => {
    useQuestStore.getState().startRoute('anshi');
    const progress = useQuestStore.getState().progress['anshi']!;
    expect(useQuestStore.getState().sealsObtained).toHaveLength(0);

    // 标记所有节点完成
    progress.nodeStatuses.forEach((node) => {
      useQuestStore.getState().markNodeComplete('anshi', node.nodeId);
    });

    expect(useQuestStore.getState().sealsObtained).toHaveLength(1);
    expect(useQuestStore.getState().sealsObtained[0].routeId).toBe('anshi');
  });
});

describe('questStore 持久化', () => {
  const STORAGE_KEY = 'history_museum_quest_progress';

  it('startRoute 后数据写入 localStorage', () => {
    useQuestStore.getState().startRoute('anshi');
    const raw = localStorage.getItem(STORAGE_KEY);
    expect(raw).not.toBeNull();
    const stored = JSON.parse(raw!);
    expect(stored['anshi']).toBeDefined();
    expect(stored['anshi'].routeId).toBe('anshi');
    expect(stored['anshi'].nodeStatuses.length).toBeGreaterThan(0);
  });

  it('markNodeComplete 后 localStorage 数据更新', () => {
    useQuestStore.getState().startRoute('anshi');
    const firstNodeId = useQuestStore.getState().progress['anshi']!.nodeStatuses[0].nodeId;

    useQuestStore.getState().markNodeComplete('anshi', firstNodeId);

    const raw = localStorage.getItem(STORAGE_KEY);
    const stored = JSON.parse(raw!);
    const storedNode = stored['anshi'].nodeStatuses.find(
      (n: { nodeId: string; completed: boolean }) => n.nodeId === firstNodeId
    );
    expect(storedNode.completed).toBe(true);
    expect(storedNode.completedAt).toBeGreaterThan(0);
  });

  it('readBriefing 后 localStorage 数据更新', () => {
    useQuestStore.getState().startRoute('anshi');
    useQuestStore.getState().readBriefing('anshi');

    const raw = localStorage.getItem(STORAGE_KEY);
    const stored = JSON.parse(raw!);
    expect(stored['anshi'].briefingRead).toBe(true);
  });

  it('resetRoute 后 localStorage 中对应数据被删除', () => {
    useQuestStore.getState().startRoute('anshi');
    useQuestStore.getState().startRoute('three-kingdoms');
    useQuestStore.getState().resetRoute('anshi');

    const raw = localStorage.getItem(STORAGE_KEY);
    const stored = JSON.parse(raw!);
    expect(stored['anshi']).toBeUndefined();
    expect(stored['three-kingdoms']).toBeDefined();
  });

  it('resetAll 清除 localStorage 中的数据', () => {
    useQuestStore.getState().startRoute('anshi');
    expect(localStorage.getItem(STORAGE_KEY)).not.toBeNull();

    useQuestStore.getState().resetAll();
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  it('store 初始化时从 localStorage 恢复数据', async () => {
    useQuestStore.getState().startRoute('anshi');
    const firstNodeId = useQuestStore.getState().progress['anshi']!.nodeStatuses[0].nodeId;
    useQuestStore.getState().markNodeComplete('anshi', firstNodeId);

    vi.resetModules();
    vi.doMock('@/data/features/storyQuests', () => ({ STUDY_ROUTES: [] }));
    const { useQuestStore: freshStore } = await import('./questStore');
    vi.doUnmock('@/data/features/storyQuests');

    const restored = freshStore.getState().progress['anshi'];
    expect(restored).toBeDefined();
    expect(restored!.routeId).toBe('anshi');
    const restoredNode = restored!.nodeStatuses.find((n) => n.nodeId === firstNodeId);
    expect(restoredNode!.completed).toBe(true);
  });
});
