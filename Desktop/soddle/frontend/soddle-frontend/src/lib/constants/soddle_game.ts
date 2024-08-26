/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/soddle_game.json`.
 */
export type SoddleGame = {
  "address": "CZ4bJsRfjT7vsQpi6dGenbyP1JksLVs82zM68ReiNv43",
  "metadata": {
    "name": "soddleGame",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "endCompetition",
      "discriminator": [
        53,
        190,
        110,
        195,
        68,
        190,
        52,
        153
      ],
      "accounts": [
        {
          "name": "gameState",
          "writable": true
        },
        {
          "name": "authority",
          "signer": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        }
      ],
      "args": []
    },
    {
      "name": "endGameSession",
      "discriminator": [
        33,
        231,
        93,
        11,
        181,
        178,
        59,
        160
      ],
      "accounts": [
        {
          "name": "gameState",
          "writable": true
        },
        {
          "name": "gameSession",
          "writable": true
        },
        {
          "name": "player",
          "writable": true,
          "signer": true,
          "relations": [
            "gameSession"
          ]
        },
        {
          "name": "playerState",
          "writable": true
        },
        {
          "name": "vault",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "initializeGame",
      "discriminator": [
        44,
        62,
        102,
        247,
        126,
        208,
        130,
        215
      ],
      "accounts": [
        {
          "name": "gameState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  97,
                  109,
                  101,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              }
            ]
          }
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "makeGuess",
      "discriminator": [
        59,
        189,
        219,
        87,
        240,
        211,
        125,
        101
      ],
      "accounts": [
        {
          "name": "gameState"
        },
        {
          "name": "gameSession",
          "writable": true
        },
        {
          "name": "player",
          "signer": true,
          "relations": [
            "gameSession"
          ]
        },
        {
          "name": "playerState",
          "writable": true
        }
      ],
      "args": [
        {
          "name": "gameType",
          "type": "u8"
        },
        {
          "name": "guess",
          "type": {
            "defined": {
              "name": "kol"
            }
          }
        }
      ]
    },
    {
      "name": "startGameSession",
      "discriminator": [
        49,
        83,
        50,
        242,
        63,
        141,
        244,
        21
      ],
      "accounts": [
        {
          "name": "gameState",
          "writable": true
        },
        {
          "name": "gameSession",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  97,
                  109,
                  101,
                  95,
                  115,
                  101,
                  115,
                  115,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "player"
              }
            ]
          }
        },
        {
          "name": "player",
          "writable": true,
          "signer": true
        },
        {
          "name": "playerState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  108,
                  97,
                  121,
                  101,
                  114,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "player"
              }
            ]
          }
        },
        {
          "name": "vault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "gameType",
          "type": "u8"
        },
        {
          "name": "kol",
          "type": {
            "defined": {
              "name": "kol"
            }
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "gameSession",
      "discriminator": [
        150,
        116,
        20,
        197,
        205,
        121,
        220,
        240
      ]
    },
    {
      "name": "gameState",
      "discriminator": [
        144,
        94,
        208,
        172,
        248,
        99,
        134,
        120
      ]
    },
    {
      "name": "player",
      "discriminator": [
        205,
        222,
        112,
        7,
        165,
        155,
        206,
        218
      ]
    }
  ],
  "events": [
    {
      "name": "tweetGuessEvent",
      "discriminator": [
        106,
        218,
        51,
        220,
        57,
        71,
        34,
        78
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "gameSessionNotEnded",
      "msg": "Game session cannot be ended yet"
    },
    {
      "code": 6001,
      "name": "invalidCompetition",
      "msg": "Invalid competition"
    },
    {
      "code": 6002,
      "name": "maxGuessesReachedForGame1",
      "msg": "Maximum number of guesses reached"
    },
    {
      "code": 6003,
      "name": "maxGuessesReachedForGame2",
      "msg": "Maximum number of guesses reached"
    },
    {
      "code": 6004,
      "name": "maxGuessesReachedForGame3",
      "msg": "Maximum number of guesses reached"
    },
    {
      "code": 6005,
      "name": "invalidKolCount",
      "msg": "Invalid number of KOLs. Expected 20."
    },
    {
      "code": 6006,
      "name": "invalidGameType",
      "msg": "Invalid game type. Must be 1, 2, or 3."
    },
    {
      "code": 6007,
      "name": "gameAlreadyPlayed",
      "msg": "Game has already been played today."
    },
    {
      "code": 6008,
      "name": "gameAlreadyCompleted",
      "msg": "Game session is already completed."
    },
    {
      "code": 6009,
      "name": "invalidGuessIndex",
      "msg": "Invalid guess index."
    },
    {
      "code": 6010,
      "name": "competitionNotEnded",
      "msg": "Competition has not ended yet."
    },
    {
      "code": 6011,
      "name": "gameNotCompleted",
      "msg": "Game is not completed yet."
    }
  ],
  "types": [
    {
      "name": "attributeResult",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "correct"
          },
          {
            "name": "incorrect"
          },
          {
            "name": "higher"
          },
          {
            "name": "lower"
          }
        ]
      }
    },
    {
      "name": "competition",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "string"
          },
          {
            "name": "startTime",
            "type": "i64"
          },
          {
            "name": "endTime",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "gameSession",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "player",
            "type": "pubkey"
          },
          {
            "name": "gameType",
            "type": "u8"
          },
          {
            "name": "startTime",
            "type": "i64"
          },
          {
            "name": "game1Completed",
            "type": "bool"
          },
          {
            "name": "game2Completed",
            "type": "bool"
          },
          {
            "name": "game3Completed",
            "type": "bool"
          },
          {
            "name": "game1Score",
            "type": "u32"
          },
          {
            "name": "game2Score",
            "type": "u32"
          },
          {
            "name": "game3Score",
            "type": "u32"
          },
          {
            "name": "game1Guesses",
            "type": "u32"
          },
          {
            "name": "game2Guesses",
            "type": "u32"
          },
          {
            "name": "game3Guesses",
            "type": "u32"
          },
          {
            "name": "totalScore",
            "type": "u32"
          },
          {
            "name": "targetIndex",
            "type": "u8"
          },
          {
            "name": "guesses",
            "type": {
              "vec": {
                "defined": {
                  "name": "guessResult"
                }
              }
            }
          },
          {
            "name": "completed",
            "type": "bool"
          },
          {
            "name": "score",
            "type": "u32"
          },
          {
            "name": "deposit",
            "type": "u64"
          },
          {
            "name": "kol",
            "type": {
              "defined": {
                "name": "kol"
              }
            }
          },
          {
            "name": "competitionId",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "gameState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "currentCompetition",
            "type": {
              "defined": {
                "name": "competition"
              }
            }
          },
          {
            "name": "lastUpdateTime",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "guessResult",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "kol",
            "type": {
              "defined": {
                "name": "kol"
              }
            }
          },
          {
            "name": "result",
            "type": {
              "array": [
                {
                  "defined": {
                    "name": "attributeResult"
                  }
                },
                7
              ]
            }
          }
        ]
      }
    },
    {
      "name": "kol",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "string"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "age",
            "type": "u8"
          },
          {
            "name": "country",
            "type": "string"
          },
          {
            "name": "accountCreation",
            "type": "u16"
          },
          {
            "name": "pfp",
            "type": "string"
          },
          {
            "name": "followers",
            "type": "u32"
          },
          {
            "name": "ecosystem",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "player",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "game1Completed",
            "type": "bool"
          },
          {
            "name": "game2Completed",
            "type": "bool"
          },
          {
            "name": "game3Completed",
            "type": "bool"
          },
          {
            "name": "game1Score",
            "type": "u32"
          },
          {
            "name": "game2Score",
            "type": "u32"
          },
          {
            "name": "game3Score",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "tweetGuessEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "kolId",
            "type": "u32"
          },
          {
            "name": "tweet",
            "type": "string"
          }
        ]
      }
    }
  ]
};
