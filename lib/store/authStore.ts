
import { create } from "zustand";

export interface AuthStore {
  user: {
    email: string;
    username: string;
    avatar: string;
  } | null;
  isAuthenticated: boolean;
  setUser: (user: AuthStore["user"]) => void;
  clearIsAuthenticated: () => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: true }),
  clearIsAuthenticated: () => set({ user: null, isAuthenticated: false }),
}));
