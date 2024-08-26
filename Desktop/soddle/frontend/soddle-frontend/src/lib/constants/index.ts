import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

export const SODDLE_PROGRAM_ID = new PublicKey(
  "9b4J9BTbBnKfrfZ7YC1WpArk1z9DgQuTEhWJtoBshz7w"
);
export const enum GameType {
  Attributes = 1,
  Tweets = 2,
  Emojis = 3,
}

export const GAME_SESSION_PDA_SEED = "game_session";

export const REQUIRED_DEPOSIT = 0.1 * LAMPORTS_PER_SOL; // 0.1 SOL in lamports
export const MAX_GUESSES = 10;
