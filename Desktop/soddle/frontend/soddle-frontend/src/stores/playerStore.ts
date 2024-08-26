import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { PublicKey } from "@solana/web3.js";

interface PlayerState {
  walletPublicKey: PublicKey | null;
  balance: number;
  setWalletPublicKey: (publicKey: PublicKey | null) => void;
  setBalance: (balance: number) => void;
}

export const usePlayerStore = create<PlayerState>()(
  immer((set) => ({
    walletPublicKey: null,
    balance: 0,
    setWalletPublicKey: (publicKey) =>
      set((state) => {
        state.walletPublicKey = publicKey;
      }),
    setBalance: (balance) =>
      set((state) => {
        state.balance = balance;
      }),
  }))
);
