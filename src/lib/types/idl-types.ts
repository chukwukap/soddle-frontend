export type SoddleGameMetadata = {
  name: string;
  version: string;
  spec: string;
  description: string;
};

export type SoddleGameInstruction = {
  name: string;
  discriminator: number[];
  accounts: {
    name: string;
    writable?: boolean;
    signer?: boolean;
    pda?: {
      seeds: {
        kind: string;
        value: number[] | string;
      }[];
    };
    relations?: string[];
    address?: string;
  }[];
  args: {
    name: string;
    type: string | { defined: { name: string } };
  }[];
};

export type SoddleGameAccount = {
  name: string;
  discriminator: number[];
};

export type SoddleGameEvent = {
  name: string;
  discriminator: number[];
};

export type SoddleGameError = {
  code: number;
  name: string;
  msg: string;
};

export type AttributeResult = "correct" | "incorrect" | "higher" | "lower";

export type Competition = {
  id: string;
  startTime: number;
  endTime: number;
};

export type Game1GuessResult = {
  kol: KOL;
  result: AttributeResult[];
};

export type Game2GuessResult = {
  kol: KOL;
  result: boolean;
};
export type Game3GuessResult = {
  kol: KOL;
  result: boolean;
};
export type GameSession = {
  player: string; // Assuming 'pubkey' is represented as a string
  gameType: number;
  startTime: number;
  game1Completed: boolean;
  game2Completed: boolean;
  game3Completed: boolean;
  game1Score: number;
  game2Score: number;
  game3Score: number;
  game1GuessesCount: number;
  game2GuessesCount: number;
  game3GuessesCount: number;
  totalScore: number;
  targetIndex: number;
  game1Guesses: Game1GuessResult[];
  game2Guesses: Game2GuessResult[];
  // i think having game1guess here was an error
  game3Guesses: Game3GuessResult[];
  completed: boolean;
  score: number;
  deposit: number;
  kol: KOL;
  competitionId: string;
};

export type GameState = {
  currentCompetition: Competition;
  lastUpdateTime: number;
};

export type KOL = {
  id: string;
  name: string;
  age: number;
  country: string;
  accountCreation: number;
  pfp: string;
  followers: number;
  ecosystem: string;
};
export type KolWithTweets = KOL & { tweets: string[] };

export type Player = {
  game1Completed: boolean;
  game2Completed: boolean;
  game3Completed: boolean;
  game1Score: number;
  game2Score: number;
  game3Score: number;
};

export type TweetGuessEvent = {
  kolId: number;
  tweet: string;
};

export type SoddleGame = {
  address: string;
  metadata: SoddleGameMetadata;
  instructions: SoddleGameInstruction[];
  accounts: SoddleGameAccount[];
  events: SoddleGameEvent[];
  errors: SoddleGameError[];
  types: {
    name: string;
    type: {
      kind: string;
      variants?: { name: string }[];
      fields?: {
        name: string;
        type:
          | string
          | { defined: { name: string } }
          | { vec: { defined: { name: string } } }
          | { array: [{ defined: { name: string } }, number] };
      }[];
    };
  }[];
};
