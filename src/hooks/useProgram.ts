"use client";
import * as anchor from "@coral-xyz/anchor";
import { useCallback } from "react";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import idl from "@/lib/constants/idl.json";

export const useProgram = () => {
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

        console.log("program in useProgram: ", program.programId.toString());

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
