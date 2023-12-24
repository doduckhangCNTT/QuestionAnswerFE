import { create } from "zustand";

const store = (set) => ({
  auth: {},
  authAction: (data, store) => set((store) => ({ auth: { ...data } })),
});

export const useAuthStore = create(store);
