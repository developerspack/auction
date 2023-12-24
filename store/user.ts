import { create } from "zustand";

interface useUserStoreProps {
  user: {
    isLoggedIn: boolean;
    id: string;
    email: string;
    Name: string;
    photo: string;
    createdAt: string;
  };
  setUser: (user: {
    isLoggedIn: boolean;
    id: string;
    email: string;
    Name: string;
    photo: string;
    createdAt: string;
  }) => void;
}

export const useUserStore = create<useUserStoreProps>((set) => ({
  user: {
    isLoggedIn: false,
    id: "",
    email: "",
    Name: "",
    photo: "",
    createdAt: "",
  },
  setUser: (user) => set({ user: user }),
}));
