import { create } from 'zustand';
import type { CardCollection, CardRarity, CollectedCard, PersonCard } from '@/types/card';
import { RARITY_CONFIG } from '@/types/card';
import { PERSON_CARDS, getCardById } from '@/data/games/personCards';

const STORAGE_KEY = 'history-museum-cards';

interface CardStore extends CardCollection {
  draw: () => PersonCard | null;
  drawTen: () => PersonCard[];
  addPoints: (n: number) => void;
  hasCard: (cardId: string) => boolean;
  getCollectedCards: () => Array<{ card: PersonCard; count: number }>;
  getActiveBonds: (cardId: string) => string[];
  hydrate: () => void;
}

const INITIAL: CardCollection = { cards: [], totalDraws: 0, points: 100 };

function loadFromStorage(): CardCollection {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL;
    return JSON.parse(raw);
  } catch { return INITIAL; }
}

function saveToStorage(state: CardCollection) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
}

function drawByProbability(): PersonCard {
  const r = Math.random();
  let acc = 0;
  let targetRarity: CardRarity = 'N';
  for (const key of ['SSR', 'SR', 'R', 'N'] as CardRarity[]) {
    acc += RARITY_CONFIG[key].probability;
    if (r <= acc) { targetRarity = key; break; }
  }
  const pool = PERSON_CARDS.filter((c) => c.rarity === targetRarity);
  if (pool.length === 0) return PERSON_CARDS.filter((c) => c.rarity === 'N')[0];
  return pool[Math.floor(Math.random() * pool.length)];
}

export const useCardStore = create<CardStore>((set, get) => ({
  ...INITIAL,
  draw: () => {
    const state = get();
    if (state.points < 10) return null;
    const card = drawByProbability();
    const existing = state.cards.find((c) => c.cardId === card.id);
    let newCards: CollectedCard[];
    if (existing) {
      newCards = state.cards.map((c) =>
        c.cardId === card.id ? { ...c, count: c.count + 1 } : c
      );
    } else {
      newCards = [...state.cards, { cardId: card.id, count: 1, collectedAt: Date.now() }];
    }
    const refund = RARITY_CONFIG[card.rarity].points;
    const newState = {
      cards: newCards,
      totalDraws: state.totalDraws + 1,
      points: state.points - 10 + refund,
    };
    saveToStorage(newState);
    set(newState);
    return card;
  },
  drawTen: () => {
    const results: PersonCard[] = [];
    for (let i = 0; i < 10; i++) {
      const c = get().draw();
      if (c) results.push(c);
    }
    return results;
  },
  addPoints: (n) => {
    set((s) => {
      const newState = { ...s, points: s.points + n };
      saveToStorage(newState);
      return newState;
    });
  },
  hasCard: (cardId) => get().cards.some((c) => c.cardId === cardId),
  getCollectedCards: () => {
    return get()
      .cards.map((c) => ({ card: getCardById(c.cardId)!, count: c.count }))
      .filter((x) => x.card);
  },
  getActiveBonds: (cardId) => {
    const card = getCardById(cardId);
    if (!card || card.bonds.length === 0) return [];
    const collected = new Set(get().cards.map((c) => c.cardId));
    const active: string[] = [];
    if (card.bonds.every((b) => collected.has(b))) {
      active.push(card.bondName || '羁绊激活');
    }
    return active;
  },
  hydrate: () => {
    const loaded = loadFromStorage();
    set(loaded);
  },
}));

useCardStore.getState().hydrate();
