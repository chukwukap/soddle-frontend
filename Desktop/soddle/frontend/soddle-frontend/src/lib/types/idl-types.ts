import { PublicKey } from "@solana/web3.js";
import { BN } from "@coral-xyz/anchor";

export type SoddleGame = {
  version: "0.1.0";
  name: "soddle_game";
  instructions: [
    {
      name: "endCompetition";
      accounts: [
        {
          name: "gameState";
          isMut: true;
          isSigner: false;
        },
        {
          name: "authority";
          isMut: false;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: "const";
                type: "string";
                value: "authority";
              }
            ];
          };
        }
      ];
      args: [];
    },
    {
      name: "endGameSession";
      accounts: [
        {
          name: "gameState";
          isMut: true;
          isSigner: false;
        },
        {
          name: "gameSession";
          isMut: true;
          isSigner: false;
        },
        {
          name: "player";
          isMut: true;
          isSigner: true;
        },
        {
          name: "playerState";
          isMut: true;
          isSigner: false;
        },
        {
          name: "vault";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "initializeGame";
      accounts: [
        {
          name: "gameState";
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: "const";
                type: "string";
                value: "game_state";
              }
            ];
          };
        },
        {
          name: "authority";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "makeGuess";
      accounts: [
        {
          name: "gameState";
          isMut: false;
          isSigner: false;
        },
        {
          name: "gameSession";
          isMut: true;
          isSigner: false;
        },
        {
          name: "player";
          isMut: false;
          isSigner: true;
        },
        {
          name: "playerState";
          isMut: true;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "gameType";
          type: "u8";
        },
        {
          name: "guess";
          type: {
            defined: "KOL";
          };
        }
      ];
    },
    {
      name: "startGameSession";
      accounts: [
        {
          name: "gameState";
          isMut: true;
          isSigner: false;
        },
        {
          name: "gameSession";
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: "const";
                type: "string";
                value: "game_session";
              },
              {
                kind: "account";
                type: "publicKey";
                path: "player";
              }
            ];
          };
        },
        {
          name: "player";
          isMut: true;
          isSigner: true;
        },
        {
          name: "playerState";
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: "const";
                type: "string";
                value: "player_state";
              },
              {
                kind: "account";
                type: "publicKey";
                path: "player";
              }
            ];
          };
        },
        {
          name: "vault";
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: "const";
                type: "string";
                value: "vault";
              }
            ];
          };
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "gameType";
          type: "u8";
        },
        {
          name: "kol";
          type: {
            defined: "KOL";
          };
        }
      ];
    }
  ];
  accounts: [
    {
      name: "gameSession";
      type: {
        kind: "struct";
        fields: [
          {
            name: "player";
            type: "publicKey";
          },
          {
            name: "gameType";
            type: "u8";
          },
          {
            name: "startTime";
            type: "i64";
          },
          {
            name: "game1Completed";
            type: "bool";
          },
          {
            name: "game2Completed";
            type: "bool";
          },
          {
            name: "game3Completed";
            type: "bool";
          },
          {
            name: "game1Score";
            type: "u32";
          },
          {
            name: "game2Score";
            type: "u32";
          },
          {
            name: "game3Score";
            type: "u32";
          },
          {
            name: "game1Guesses";
            type: "u32";
          },
          {
            name: "game2Guesses";
            type: "u32";
          },
          {
            name: "game3Guesses";
            type: "u32";
          },
          {
            name: "totalScore";
            type: "u32";
          },
          {
            name: "targetIndex";
            type: "u8";
          },
          {
            name: "guesses";
            type: {
              vec: {
                defined: "GuessResult";
              };
            };
          },
          {
            name: "completed";
            type: "bool";
          },
          {
            name: "score";
            type: "u32";
          },
          {
            name: "deposit";
            type: "u64";
          },
          {
            name: "kol";
            type: {
              defined: "KOL";
            };
          },
          {
            name: "competitionId";
            type: "string";
          }
        ];
      };
    },
    {
      name: "gameState";
      type: {
        kind: "struct";
        fields: [
          {
            name: "currentCompetition";
            type: {
              defined: "Competition";
            };
          },
          {
            name: "lastUpdateTime";
            type: "i64";
          }
        ];
      };
    },
    {
      name: "player";
      type: {
        kind: "struct";
        fields: [
          {
            name: "game1Completed";
            type: "bool";
          },
          {
            name: "game2Completed";
            type: "bool";
          },
          {
            name: "game3Completed";
            type: "bool";
          },
          {
            name: "game1Score";
            type: "u32";
          },
          {
            name: "game2Score";
            type: "u32";
          },
          {
            name: "game3Score";
            type: "u32";
          }
        ];
      };
    }
  ];
  types: [
    {
      name: "AttributeResult";
      type: {
        kind: "enum";
        variants: [
          {
            name: "Correct";
          },
          {
            name: "Incorrect";
          },
          {
            name: "Higher";
          },
          {
            name: "Lower";
          }
        ];
      };
    },
    {
      name: "Competition";
      type: {
        kind: "struct";
        fields: [
          {
            name: "id";
            type: "string";
          },
          {
            name: "startTime";
            type: "i64";
          },
          {
            name: "endTime";
            type: "i64";
          }
        ];
      };
    },
    {
      name: "GuessResult";
      type: {
        kind: "struct";
        fields: [
          {
            name: "kol";
            type: {
              defined: "KOL";
            };
          },
          {
            name: "result";
            type: {
              array: [
                {
                  defined: "AttributeResult";
                },
                7
              ];
            };
          }
        ];
      };
    },
    {
      name: "KOL";
      type: {
        kind: "struct";
        fields: [
          {
            name: "id";
            type: "string";
          },
          {
            name: "name";
            type: "string";
          },
          {
            name: "age";
            type: "u8";
          },
          {
            name: "country";
            type: "string";
          },
          {
            name: "accountCreation";
            type: "u16";
          },
          {
            name: "pfp";
            type: "string";
          },
          {
            name: "followers";
            type: "u32";
          },
          {
            name: "ecosystem";
            type: "string";
          }
        ];
      };
    },
    {
      name: "TweetGuessEvent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "kolId";
            type: "u32";
          },
          {
            name: "tweet";
            type: "string";
          }
        ];
      };
    }
  ];
  errors: [
    {
      code: 6000;
      name: "GameSessionNotEnded";
      msg: "Game session cannot be ended yet";
    },
    {
      code: 6001;
      name: "InvalidCompetition";
      msg: "Invalid competition";
    },
    {
      code: 6002;
      name: "MaxGuessesReachedForGame1";
      msg: "Maximum number of guesses reached";
    },
    {
      code: 6003;
      name: "MaxGuessesReachedForGame2";
      msg: "Maximum number of guesses reached";
    },
    {
      code: 6004;
      name: "MaxGuessesReachedForGame3";
      msg: "Maximum number of guesses reached";
    },
    {
      code: 6005;
      name: "InvalidKOLCount";
      msg: "Invalid number of KOLs. Expected 20.";
    },
    {
      code: 6006;
      name: "InvalidGameType";
      msg: "Invalid game type. Must be 1, 2, or 3.";
    },
    {
      code: 6007;
      name: "GameAlreadyPlayed";
      msg: "Game has already been played today.";
    },
    {
      code: 6008;
      name: "GameAlreadyCompleted";
      msg: "Game session is already completed.";
    },
    {
      code: 6009;
      name: "InvalidGuessIndex";
      msg: "Invalid guess index.";
    },
    {
      code: 6010;
      name: "CompetitionNotEnded";
      msg: "Competition has not ended yet.";
    },
    {
      code: 6011;
      name: "GameNotCompleted";
      msg: "Game is not completed yet.";
    }
  ];
};

export type AttributeResult =
  | { Correct: {} }
  | { Incorrect: {} }
  | { Higher: {} }
  | { Lower: {} };

export type Competition = {
  id: string;
  startTime: BN;
  endTime: BN;
};

export type GuessResult = {
  kol: KOL;
  result: Array<AttributeResult>;
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

export type TweetGuessEvent = {
  kolId: number;
  tweet: string;
};

export type GameSession = {
  player: PublicKey;
  gameType: number;
  startTime: number;
  game1Completed: boolean;
  game2Completed: boolean;
  game3Completed: boolean;
  game1Score: number;
  game2Score: number;
  game3Score: number;
  game1Guesses: number;
  game2Guesses: number;
  game3Guesses: number;
  totalScore: number;
  targetIndex: number;
  guesses: GuessResult[];
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

export type Player = {
  game1Completed: boolean;
  game2Completed: boolean;
  game3Completed: boolean;
  game1Score: number;
  game2Score: number;
  game3Score: number;
};

export type KolWithTweets = KOL & {
  tweets: string[];
};
