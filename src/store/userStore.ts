import { create } from 'zustand';
import type { UserDTO } from '@/services/userApi';

interface UserState {
  user: UserDTO | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: UserDTO) => void;
  setToken: (token: string) => void;
  logout: () => void;
  init: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  setUser: (user) => set({ user, isAuthenticated: true }),
  setToken: (token) => set({ token, isAuthenticated: true }),

  logout: () => {
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_data');
    set({ user: null, token: null, isAuthenticated: false });
  },

  init: () => {
    const savedToken = localStorage.getItem('user_token');
    const savedUser = localStorage.getItem('user_data');
    if (savedToken && savedUser) {
      set({
        token: savedToken,
        user: JSON.parse(savedUser),
        isAuthenticated: true,
      });
    }
  },
}));

// 初始化时从 localStorage 恢复
useUserStore.getState().init();

// 监听 token 变化并持久化
useUserStore.subscribe((state, prevState) => {
  if (state.token !== prevState.token) {
    if (state.token) {
      localStorage.setItem('user_token', state.token);
    } else {
      localStorage.removeItem('user_token');
    }
  }
  if (state.user !== prevState.user) {
    if (state.user) {
      localStorage.setItem('user_data', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('user_data');
    }
  }
});
