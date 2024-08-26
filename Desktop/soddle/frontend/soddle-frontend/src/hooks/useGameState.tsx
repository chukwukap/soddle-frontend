"use client";
import * as anchor from "@coral-xyz/anchor";
import { useCallback, useState, useEffect } from "react";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";

import { useRootStore } from "@/stores/rootStore";
import idl from "@/lib/constants/idl.json";
import { GameState } from "@/lib/types/idl-types";

export const useSoddleProgram = () => {
  const wallet = useAnchorWallet();
  const { connection } = useConnection();

  return useCallback(() => {
    if (wallet && connection) {
      try {
        const provider = new anchor.AnchorProvider(connection, wallet, {
          maxRetries: 10,
          commitment: "confirmed",
        });
        anchor.setProvider(provider);

        const program = new anchor.Program(
          idl as anchor.Idl,
          provider
        ) as anchor.Program<anchor.Idl>;

        if (program) {
          return program;
        } else {
          throw new Error("Program not found");
        }
      } catch (error) {
        console.error("Error setting up Soddle program", error);
        return null;
      }
    }
  }, [connection, wallet]);
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const getProgram = useSoddleProgram();

  const fetchGameState = async () => {
    try {
      setLoading(true);
      const program = getProgram();
      console.log("program in fetchGameState:", program);

      if (program) {
        const [gameStatePDA] = anchor.web3.PublicKey.findProgramAddressSync(
          [Buffer.from("game_state")],
          program.programId
        );

        // @ts-expect-error gameState type is not inferred
        const gameStateAccount = await program.account.gameState.fetch(
          gameStatePDA
        );
        console.log("fetched gameStateAccount", gameStateAccount);
        if (gameStateAccount) {
          return gameStateAccount as GameState;
        } else {
          throw new Error("Game state account not found");
        }
      }
    } catch (err) {
      console.error("Error fetching game state:", err);
      setError("Failed to fetch game state");
    } finally {
      setLoading(false);
    }
  };

  const initializeGame = useCallback(async () => {
    const program = getProgram();
    // console.log("program in initializeGame:", program);

    if (!program) {
      setError("Program not initialized");
      return;
    }

    try {
      setLoading(true);
      const [gameStatePDA] = anchor.web3.PublicKey.findProgramAddressSync(
        [Buffer.from("game_state")],
        program.programId
      );

      await fetchGameState();
    } catch (err) {
      console.error("Error initializing game:", err);
      setError("Failed to initialize game");
    } finally {
      setLoading(false);
    }
  }, [fetchGameState]);

  const endCompetition = useCallback(async () => {
    const program = getProgram();

    if (!program) {
      setError("Program not initialized");
      return;
    }

    try {
      setLoading(true);
      const [gameStatePDA] = anchor.web3.PublicKey.findProgramAddressSync(
        [Buffer.from("game_state")],
        program.programId
      );

      await fetchGameState();
    } catch (err) {
      console.error("Error ending competition:", err);
      setError("Failed to end competition");
    } finally {
      setLoading(false);
    }
  }, [fetchGameState]);

  return {
    gameState,
    loading,
    error,
    fetchGameState,
    initializeGame,
    endCompetition,
  };
};
