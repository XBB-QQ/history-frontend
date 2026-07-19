import { create } from 'zustand';

/** 错题本条目：仅存简体字与含义，渲染时通过 svgCache 抓取 */
export interface WrongCharEntry {
  char: string;
  meaning: string;
  wrongAt: number;
}

/** 历史成绩记录 */
export interface OracleGameState {
  wrongChars: WrongCharEntry[];
  bestScore: number;
  bestAccuracy: number;
  totalGames: number;
  addWrong: (entry: WrongCharEntry) => void;
  removeWrong: (char: string) => void;
  clearWrong: () => void;
  recordResult: (score: number, total: number) => { newBestScore: boolean; newBestAccuracy: boolean };
}

const STORAGE_KEY = 'oracle-game-stats';
const MAX_WRONG = 100;

interface PersistedStats {
  wrongChars: WrongCharEntry[];
  bestScore: number;
  bestAccuracy: number;
  totalGames: number;
}

function loadStats(): PersistedStats {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<PersistedStats>;
      return {
        wrongChars: Array.isArray(parsed.wrongChars) ? parsed.wrongChars : [],
        bestScore: typeof parsed.bestScore === 'number' ? parsed.bestScore : 0,
        bestAccuracy: typeof parsed.bestAccuracy === 'number' ? parsed.bestAccuracy : 0,
        totalGames: typeof parsed.totalGames === 'number' ? parsed.totalGames : 0,
      };
    }
  } catch {
    // ignore
  }
  return { wrongChars: [], bestScore: 0, bestAccuracy: 0, totalGames: 0 };
}

function saveStats(stats: PersistedStats) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch {
    // ignore
  }
}

export const useOracleGameStore = create<OracleGameState>((set, get) => ({
  ...loadStats(),

  addWrong: (entry) => {
    set((state) => {
      // 去重：同字只保留最新一次错误
      const filtered = state.wrongChars.filter((w) => w.char !== entry.char);
      const updated = [entry, ...filtered].slice(0, MAX_WRONG);
      const next: PersistedStats = {
        wrongChars: updated,
        bestScore: state.bestScore,
        bestAccuracy: state.bestAccuracy,
        totalGames: state.totalGames,
      };
      saveStats(next);
      return { wrongChars: updated };
    });
  },

  removeWrong: (char) => {
    set((state) => {
      const updated = state.wrongChars.filter((w) => w.char !== char);
      const next: PersistedStats = {
        wrongChars: updated,
        bestScore: state.bestScore,
        bestAccuracy: state.bestAccuracy,
        totalGames: state.totalGames,
      };
      saveStats(next);
      return { wrongChars: updated };
    });
  },

  clearWrong: () => {
    set((state) => {
      const next: PersistedStats = {
        wrongChars: [],
        bestScore: state.bestScore,
        bestAccuracy: state.bestAccuracy,
        totalGames: state.totalGames,
      };
      saveStats(next);
      return { wrongChars: [] };
    });
  },

  recordResult: (score, total) => {
    const accuracy = total > 0 ? score / (total * 10) : 0;
    const state = get();
    const newBestScore = score > state.bestScore;
    const newBestAccuracy = accuracy > state.bestAccuracy;
    const next: PersistedStats = {
      wrongChars: state.wrongChars,
      bestScore: Math.max(state.bestScore, score),
      bestAccuracy: Math.max(state.bestAccuracy, accuracy),
      totalGames: state.totalGames + 1,
    };
    saveStats(next);
    set({ bestScore: next.bestScore, bestAccuracy: next.bestAccuracy, totalGames: next.totalGames });
    return { newBestScore, newBestAccuracy };
  },
}));
