import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface UIState {
  isLoading: boolean;
  error: string | null;
  isModalOpen: boolean;
  modalContent: React.ReactNode | null;
  theme: "light" | "dark";
  sidebarOpen: boolean;
  isLegendOpen: boolean;
}
interface UIActions {
  setLoading: (isLoading: boolean) => void;
  setIsLegendOpen: (isLegendOpen: boolean) => void;
  setError: (error: string | null) => void;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
  toggleTheme: () => void;
  toggleSidebar: () => void;
}

export const useUIStore = create<UIState & UIActions>()(
  immer((set) => ({
    isLoading: false,
    error: null,
    isModalOpen: false,
    modalContent: null,
    theme: "light",
    sidebarOpen: false,
    isLegendOpen: true,
    setLoading: (isLoading) =>
      set((state) => {
        state.isLoading = isLoading;
      }),
    setIsLegendOpen: (isLegendOpen) =>
      set((state) => {
        state.isLegendOpen = isLegendOpen;
      }),
    setError: (error) =>
      set((state) => {
        state.error = error;
      }),
    openModal: (content) =>
      set((state) => {
        state.isModalOpen = true;
        state.modalContent = content;
      }),
    closeModal: () =>
      set((state) => {
        state.isModalOpen = false;
        state.modalContent = null;
      }),

    toggleSidebar: () =>
      set((state) => {
        state.sidebarOpen = !state.sidebarOpen;
      }),
    toggleTheme: () =>
      set((state) => {
        state.theme = state.theme === "light" ? "dark" : "light";
      }),
  }))
);
