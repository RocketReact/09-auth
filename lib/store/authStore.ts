import { create } from "zustand";
import { AuthProps } from "@/types/user";

export const useAuthStore = create<AuthProps>()((set) => ({
  user: null,
  isAuthenticated: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: true,
    }),
  clearIsAuthenticated: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}));
