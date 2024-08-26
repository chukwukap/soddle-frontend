import { useGameStore } from "./gameStore";
import { usePlayerStore } from "./playerStore";
import { useUIStore } from "./uiStore";

export const useRootStore = () => ({
  game: useGameStore(),
  player: usePlayerStore(),
  ui: useUIStore(),
});
