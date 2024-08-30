"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { GameState, GameSession } from "@/lib/types/idlTypes";

// UI Context
type UIContextType = {
  isLoading: boolean;
  isLegendOpen: boolean;
  setLoading: (isLoading: boolean) => void;
  setLegendOpen: (isLegendOpen: boolean) => void;
};

const UIContext = createContext<UIContextType | undefined>(undefined);

export function useUI() {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
}

type UIProviderProps = {
  children: ReactNode;
};

export function UIProvider({ children }: UIProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLegendOpen, setIsLegendOpen] = useState(false);

  const setLoading = useCallback((loading: boolean) => {
    setIsLoading(loading);
  }, []);

  const setLegendOpen = useCallback((legendOpen: boolean) => {
    setIsLegendOpen(legendOpen);
  }, []);

  return (
    <UIContext.Provider
      value={{ isLoading, setLoading, isLegendOpen, setLegendOpen }}
    >
      {children}
    </UIContext.Provider>
  );
}

// Game Context
type GameContextType = {
  gameState: GameState | null;
  gameSession: GameSession | null;
  setGameState: (gameState: GameState | null) => void;
  setGameSession: (gameSession: GameSession | null) => void;
  resetGame: () => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}

type GameProviderProps = {
  children: ReactNode;
};

export function GameProvider({ children }: GameProviderProps) {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [gameSession, setGameSession] = useState<GameSession | null>(null);

  const resetGame = useCallback(() => {
    setGameState(null);
    setGameSession(null);
  }, []);

  return (
    <GameContext.Provider
      value={{
        gameState,
        gameSession,
        setGameState,
        setGameSession,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

// Combined Provider
type AppProviderProps = {
  children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  return (
    <UIProvider>
      <GameProvider>{children}</GameProvider>
    </UIProvider>
  );
}
