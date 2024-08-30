import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist, createJSONStorage } from "zustand/middleware";
import { PublicKey } from "@solana/web3.js";
import { KOL } from "@/lib/types/idlTypes";

interface PlayerState {
  walletPublicKey: PublicKey | null;
  balance: number;
  game1Completed: boolean;
  game2Completed: boolean;
  game3Completed: boolean;
  game1Score: number;
  game2Score: number;
  game3Score: number;
  totalScore: number;
  game1GuessesCount: number;
  game2GuessesCount: number;
  game3GuessesCount: number;
  currentGameType: number | null;
  startTime: string | null;
  deposit: string | null;
  competitionId: string | null;
  currentKOL: KOL | null;
}

interface PlayerActions {
  setWalletPublicKey: (publicKey: PublicKey | null) => void;
  setBalance: (balance: number) => void;
  setGameCompletion: (gameNumber: 1 | 2 | 3, completed: boolean) => void;
  setGameScore: (gameNumber: 1 | 2 | 3, score: number) => void;
  setTotalScore: (score: number) => void;
  incrementGuessCount: (gameNumber: 1 | 2 | 3) => void;
  setCurrentGameType: (gameType: number | null) => void;
  setStartTime: (startTime: string | null) => void;
  setDeposit: (deposit: string | null) => void;
  setCompetitionId: (competitionId: string | null) => void;
  setCurrentKOL: (kol: KOL | null) => void;
  resetPlayerState: () => void;
}

export const createPlayerStore = () =>
  create(
    persist(
      immer<PlayerState & PlayerActions>((set) => ({
        walletPublicKey: null,
        balance: 0,
        game1Completed: false,
        game2Completed: false,
        game3Completed: false,
        game1Score: 0,
        game2Score: 0,
        game3Score: 0,
        totalScore: 0,
        game1GuessesCount: 0,
        game2GuessesCount: 0,
        game3GuessesCount: 0,
        currentGameType: null,
        startTime: null,
        deposit: null,
        competitionId: null,
        currentKOL: null,

        setWalletPublicKey: (publicKey) =>
          set((state) => {
            state.walletPublicKey = publicKey;
          }),
        setBalance: (balance) =>
          set((state) => {
            state.balance = balance;
          }),
        setGameCompletion: (gameNumber, completed) =>
          set((state) => {
            state[`game${gameNumber}Completed`] = completed;
          }),
        setGameScore: (gameNumber, score) =>
          set((state) => {
            state[`game${gameNumber}Score`] = score;
          }),
        setTotalScore: (score) =>
          set((state) => {
            state.totalScore = score;
          }),
        incrementGuessCount: (gameNumber) =>
          set((state) => {
            state[`game${gameNumber}GuessesCount`] += 1;
          }),
        setCurrentGameType: (gameType) =>
          set((state) => {
            state.currentGameType = gameType;
          }),
        setStartTime: (startTime) =>
          set((state) => {
            state.startTime = startTime;
          }),
        setDeposit: (deposit) =>
          set((state) => {
            state.deposit = deposit;
          }),
        setCompetitionId: (competitionId) =>
          set((state) => {
            state.competitionId = competitionId;
          }),
        setCurrentKOL: (kol) =>
          set((state) => {
            state.currentKOL = kol;
          }),
        resetPlayerState: () =>
          set((state) => {
            state.game1Completed = false;
            state.game2Completed = false;
            state.game3Completed = false;
            state.game1Score = 0;
            state.game2Score = 0;
            state.game3Score = 0;
            state.totalScore = 0;
            state.game1GuessesCount = 0;
            state.game2GuessesCount = 0;
            state.game3GuessesCount = 0;
            state.currentGameType = null;
            state.startTime = null;
            state.deposit = null;
            state.competitionId = null;
            state.currentKOL = null;
          }),
      })),
      {
        name: "player-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  );
