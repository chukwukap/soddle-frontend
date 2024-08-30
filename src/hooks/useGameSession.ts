import { useCallback, useState } from "react";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { GameSession, KOL } from "@/lib/types/idlTypes";
import { useWallet } from "@solana/wallet-adapter-react";
import * as anchor from "@coral-xyz/anchor";
import { toast } from "sonner";
import { useProgram } from "./useProgram";

export const useGameSession = () => {
  const [gameSession, setGameSession] = useState<GameSession | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const getProgram = useProgram();
  const { wallet } = useWallet();

  const fetchGameSession = useCallback(
    async (playerPublicKey: PublicKey) => {
      try {
        const program = getProgram();
        if (!program) {
          throw new Error("No program found");
        }
        const [gameSessionPDA] = anchor.web3.PublicKey.findProgramAddressSync(
          [Buffer.from("game_session"), playerPublicKey.toBuffer()],
          program.programId
        );

        //@ts-ignore
        const fetchedSession = await program.account.gameSession.fetch(
          gameSessionPDA
        );

        if (!fetchedSession) {
          throw new Error("Game session not found");
        }

        setGameSession(fetchedSession as GameSession);
        return fetchedSession as GameSession;
      } catch (err) {
        console.error("Error fetching game session:", err);
        setError("Failed to fetch game session");
        return null;
      }
    },
    [getProgram]
  );

  const startGameSession = async (gameType: number, kol: KOL) => {
    try {
      const program = getProgram();

      if (!program) {
        throw new Error("No program found");
      }
      const [gameStatePDA] = PublicKey.findProgramAddressSync(
        [Buffer.from("game_state")],
        program.programId
      );

      const [gameSessionPDA] = PublicKey.findProgramAddressSync(
        [Buffer.from("game_session"), wallet?.adapter.publicKey!.toBuffer()!],
        program.programId
      );

      const [playerStatePDA] = PublicKey.findProgramAddressSync(
        [Buffer.from("player_state"), wallet?.adapter.publicKey!.toBuffer()!],
        program.programId
      );

      const [vaultPDA] = PublicKey.findProgramAddressSync(
        [Buffer.from("vault")],
        program.programId
      );

      const txSig = await program.methods
        .startGameSession(gameType, kol)
        .accounts({
          gameState: gameStatePDA,
          gameSession: gameSessionPDA,
          player: wallet?.adapter.publicKey!,
          playerState: playerStatePDA,
          vault: vaultPDA,
          systemProgram: SystemProgram.programId,
        })
        .rpc();
      return txSig;
    } catch (err) {
      return null;
    } finally {
      setLoading(false);
    }
  };

  const makeGuess = useCallback(
    async (gameType: number, guess: KOL) => {
      try {
        const program = getProgram();
        if (!program) {
          console.log("No program found");
          return;
        }

        setLoading(true);
        const [gameStatePDA] = anchor.web3.PublicKey.findProgramAddressSync(
          [Buffer.from("game_state")],
          program.programId
        );

        const [gameSessionPDA] = anchor.web3.PublicKey.findProgramAddressSync(
          [Buffer.from("game_session"), wallet?.adapter.publicKey!.toBuffer()!],
          program.programId
        );

        const [playerStatePDA] = anchor.web3.PublicKey.findProgramAddressSync(
          [Buffer.from("player_state"), wallet?.adapter.publicKey!.toBuffer()!],
          program.programId
        );

        await program.methods
          .makeGuess(gameType, guess)
          .accounts({
            gameState: gameStatePDA,
            gameSession: gameSessionPDA,
            player: wallet?.adapter.publicKey!,
            playerState: playerStatePDA,
          })
          .rpc();

        toast.success("Guess made successfully");
      } catch (err) {
        console.error("Error making guess:", err);
        toast.error("Failed to make guess");
        setError("Failed to make guess");
      } finally {
        setLoading(false);
      }
    },
    [getProgram, fetchGameSession, wallet]
  );

  const endGameSession = useCallback(async () => {
    const program = getProgram();
    if (!program) {
      setError("Program not initialized");
      return;
    }

    // try {
    //   setLoading(true);
    //   const [gameStatePDA] = PublicKey.findProgramAddressSync(
    //     [Buffer.from("game_state")],
    //     new PublicKey(SODDLE_PROGRAM_ID)
    //   );

    //   const [gameSessionPDA] = PublicKey.findProgramAddressSync(
    //     [Buffer.from("game_session"), wallet?.adapter.publicKey!.toBuffer()!],
    //     new PublicKey(SODDLE_PROGRAM_ID)
    //   );

    //   const [playerStatePDA] = PublicKey.findProgramAddressSync(
    //     [Buffer.from("player_state"), wallet?.adapter.publicKey!.toBuffer()!],
    //     new PublicKey(SODDLE_PROGRAM_ID)
    //   );

    //   const [vaultPDA] = PublicKey.findProgramAddressSync(
    //     [Buffer.from("vault")],
    //     new PublicKey(SODDLE_PROGRAM_ID)
    //   );

    //   // await program.methods
    //   //   .endGameSession()
    //   //   .accounts({
    //   //     gameState: gameStatePDA,
    //   //     gameSession: gameSessionPDA,
    //   //     player: wallet?.adapter.publicKey!,
    //   //     playerState: playerStatePDA,
    //   //     vault: vaultPDA,
    //   //     systemProgram: SystemProgram.programId,
    //   //   })
    //   //   .rpc();

    //   await fetchGameSession(wallet?.adapter.publicKey!);
    // } catch (err) {
    //   console.error("Error ending game session:", err);
    //   setError("Failed to end game session");
    // } finally {
    //   setLoading(false);
    // }
  }, [getProgram, fetchGameSession, wallet]);

  return {
    gameSession,
    error,
    fetchGameSession,
    startGameSession,
    makeGuess,
    endGameSession,
  };
};
