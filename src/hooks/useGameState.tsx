"use client";
import * as anchor from "@coral-xyz/anchor";
import { useCallback, useState } from "react";
import { GameState } from "@/lib/types/idlTypes";
import { useProgram } from "./useProgram";

export const useGameState = () => {
  const [error, setError] = useState<string | null>(null);
  const getProgram = useProgram();

  const fetchGameState = useCallback(async (): Promise<GameState | null> => {
    try {
      const program = getProgram();

      if (program) {
        const [gameStatePDA] = anchor.web3.PublicKey.findProgramAddressSync(
          [Buffer.from("game_state")],
          program.programId
        );

        //@ts-expect-error
        const gameStateAccount = await program.account.gameState.fetch(
          gameStatePDA
        );

        if (gameStateAccount) {
          return gameStateAccount as GameState;
        } else {
          throw new Error("Game state account not found");
        }
      }
      return null;
    } catch (err) {
      console.error("Error fetching game state:", err);
      setError("Failed to fetch game state");
      return null;
    }
  }, [getProgram]);

  const initializeGame = useCallback(async () => {
    const program = getProgram();

    if (!program) {
      setError("Program not initialized");
      return;
    }

    try {
      const [gameStatePDA] = anchor.web3.PublicKey.findProgramAddressSync(
        [Buffer.from("game_state")],
        program.programId
      );

      await fetchGameState();
    } catch (err) {
      console.error("Error initializing game:", err);
      setError("Failed to initialize game");
    }
  }, [fetchGameState, getProgram]);

  return {
    error,
    fetchGameState,
    initializeGame,
  };
};
