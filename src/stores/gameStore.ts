import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist, createJSONStorage } from "zustand/middleware";
import * as anchor from "@coral-xyz/anchor";
import { GameSession, GameState } from "@/lib/types/idlTypes";
import { GameType } from "@/lib/constants";

interface GameStoreState {
  program: anchor.Program<anchor.Idl> | null;
  currentGameType: GameType | null;
  gameState: GameState | null;
  gameSession: GameSession | null;
}

interface GameStoreActions {
  setProgram: (program: anchor.Program<anchor.Idl> | null) => void;
  setCurrentGameType: (gameType: GameType) => void;
  setGameSession: (session: GameSession | null) => void;
  setGameState: (state: GameState | null) => void;
  resetGame: () => void;
}

export const createGameStore = () =>
  create(
    persist(
      immer<GameStoreState & GameStoreActions>((set) => ({
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
      })),
      {
        name: "game-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  );
