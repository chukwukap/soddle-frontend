import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import * as anchor from "@coral-xyz/anchor";
import { GameSession } from "@/lib/types/idl-types";
import { GameType } from "@/lib/constants";

interface GameState {
  program: anchor.Program<anchor.Idl> | null;
  currentGameType: GameType | null;
  gameState: GameState | null;
  gameSession: GameSession | null;
}
interface GameActions {
  setProgram: (program: anchor.Program<anchor.Idl> | null) => void;
  setCurrentGameType: (gameType: GameType) => void;
  setGameSession: (session: GameSession | null) => void;
  setGameState: (state: GameState | null) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState & GameActions>()(
  immer((set) => ({
    program: null,
    currentGameType: null,
    gameState: null,
    gameSession: null,
    setProgram: (program) =>
      set((state) => {
        state.program = program;
      }),
    setCurrentGameType: (gameType) =>
      set((state) => {
        state.currentGameType = gameType;
      }),
    setGameSession: (session) =>
      set((state) => {
        state.gameSession = session;
      }),

    setGameState: (newState: GameState | null) =>
      set((state) => {
        state.gameState = newState;
      }),

    resetGame: () =>
      set((state) => {
        state.gameState = null;
        state.gameSession = null;
        state.program = null;
        state.currentGameType = null;
      }),
  }))
);
