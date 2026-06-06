import { create } from "zustand";

export type User = {
  id: string;
  name: string;
  email: string;
  role?: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  setAuth: (data: { user: User; token: string }) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,

  setAuth: (data) =>
    set({
      user: data.user,
      token: data.token,
    }),

  logout: () =>
    set({
      user: null,
      token: null,
    }),
}));