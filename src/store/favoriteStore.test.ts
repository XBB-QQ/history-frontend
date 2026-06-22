import { describe, it, expect, beforeEach } from 'vitest';
import { useFavoriteStore } from './favoriteStore';

describe('favoriteStore', () => {
  beforeEach(() => {
    localStorage.clear();
    useFavoriteStore.getState().favorites = [];
  });

  it('starts with empty favorites', () => {
    expect(useFavoriteStore.getState().favorites).toHaveLength(0);
  });

  it('adds a favorite', () => {
    useFavoriteStore.getState().addFavorite({
      type: 'event',
      id: '1',
      title: '测试事件',
    });
    expect(useFavoriteStore.getState().isFavorite('1')).toBe(true);
    expect(useFavoriteStore.getState().favorites).toHaveLength(1);
  });

  it('removes a favorite', () => {
    useFavoriteStore.getState().addFavorite({
      type: 'person',
      id: '2',
      title: '测试人物',
    });
    useFavoriteStore.getState().removeFavorite('2');
    expect(useFavoriteStore.getState().isFavorite('2')).toBe(false);
  });

  it('toggles favorite', () => {
    const toggle = useFavoriteStore.getState().toggleFavorite;
    expect(toggle({ type: 'event', id: '3', title: '测试' })).toBe(true);
    expect(useFavoriteStore.getState().isFavorite('3')).toBe(true);
    expect(toggle({ type: 'event', id: '3', title: '测试' })).toBe(false);
    expect(useFavoriteStore.getState().isFavorite('3')).toBe(false);
  });

  it('persists to localStorage', () => {
    useFavoriteStore.getState().addFavorite({
      type: 'dynasty',
      id: '4',
      title: '测试朝代',
    });
    const stored = localStorage.getItem('favorites');
    expect(stored).toBeTruthy();
    expect(JSON.parse(stored)).toHaveLength(1);
  });
});
