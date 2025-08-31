import { create } from "zustand";
import type { AppError } from "@/app/error/types";

interface IErrorState {
  error: AppError | null;
  setError: (error: AppError | null) => void;
  clearError: () => void;
}

export const useErrorStore = create<IErrorState>((set) => ({
  error: null,
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}));
