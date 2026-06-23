import { create } from 'zustand';

interface AdminState {
  isLoggedIn: boolean;
  username: string | null;
  token: string | null;
  login: (username: string, token: string) => void;
  logout: () => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  isLoggedIn: !!localStorage.getItem('admin_token'),
  username: localStorage.getItem('admin_username') || null,
  token: localStorage.getItem('admin_token') || null,

  login: (username: string, token: string) => {
    localStorage.setItem('admin_username', username);
    localStorage.setItem('admin_token', token);
    set({ isLoggedIn: true, username, token });
  },

  logout: () => {
    localStorage.removeItem('admin_username');
    localStorage.removeItem('admin_token');
    set({ isLoggedIn: false, username: null, token: null });
  },
}));
