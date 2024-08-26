"use client";
import React, { useEffect, useState } from "react";
import { GuessResult, KOL, KolWithTweets } from "@/lib/types/idl-types";
import SearchBar from "./_components/search-bar";
import { GameType } from "@/lib/constants";
import TimerDisplay from "./_components/time-display";
import Container from "@/components/layout/container";
import { AttributesGuessList } from "./_components/attributes-guess-list";
import { TweetsGuessList } from "./_components/tweets-guess-list";
import { EmojisGuessList } from "./_components/emojis-guess-list";
import Legend from "./_components/legends";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import { fetchRandomKOL } from "@/lib/fns/fetchers";
import TweetQuestionBoxWrapper from "./_components/tweet-question-box-wrapper";
import { useGameSession } from "@/hooks/useGameSession";
import { useRootStore } from "@/stores/rootStore";
import Link from "next/link";

export default function GameIdPageClient({
  gameId,
  kols,
}: {
  gameId: number;
  kols: KolWithTweets[];
}) {
  const router = useRouter();
  const { wallet } = useWallet();
  const { fetchGameSession, makeGuess, gameSession } = useGameSession();
  const { ui } = useRootStore();
  const [randomizedKol, setRandomizedKol] = useState<KolWithTweets | null>(
    null
  );

  useEffect(() => {
    if (!wallet) {
      router.push("/");
      return;
    }

    fetchGameSession(wallet.adapter.publicKey!);
  }, [wallet, router]);

  useEffect(() => {
    async function getRandomKol() {
      const randKol = await fetchRandomKOL();
      setRandomizedKol(randKol);
    }

    getRandomKol();
  }, [gameSession]);

  const handleSelect = async (kol: KOL) => {
    try {
      ui.setLoading(true);
      if (gameId && kol) {
        await makeGuess(gameId, kol);
        return;
      }
    } catch (error) {
      toast.error("Error making guess");
      ui.setError("Error making guess");
    } finally {
      ui.setLoading(false);
    }
  };

  if (!gameSession) {
    return (
      <div className="text-white">
        You are not in a game session. Start a new game{" "}
        <Link href="/home" className="text-blue-500">
          here
        </Link>
      </div>
    );
  }

  return (
    <div className="py-4 flex flex-col gap-4 ">
      {/* Time Component */}
      <Container>
        <section className="flex justify-center mb-4">
          <TimerDisplay />
        </section>
      </Container>
      {/* question box */}
      <Container>
        <TweetQuestionBoxWrapper className="">
          <section className=" text-white flex flex-col justify-between items-center">
            <h1 className="text-2xl font-bold text-center">
              {gameId === GameType.Attributes
                ? "Guess today’s personality!"
                : gameId === GameType.Tweets
                ? "Who published that tweet?"
                : "Which personalities do these emojis describe?"}
            </h1>
            <div className="flex justify-center items-center">
              {gameId === GameType.Attributes ? (
                <div className="">{null}</div>
              ) : gameId === GameType.Tweets ? (
                <div className="">{randomizedKol?.tweets[0]}</div>
              ) : (
                gameId === GameType.Emojis && <div className="">{null}</div>
              )}
            </div>
          </section>
        </TweetQuestionBoxWrapper>
      </Container>

      {/* search bar */}
      <Container>
        <SearchBar kols={kols} onSelect={handleSelect} />
      </Container>

      {/* guessResults section */}

      {gameSession.guesses.length > 0 && (
        <section className="text-white no-scrollbar">
          {gameId === GameType.Attributes ? (
            <AttributesGuessList guessResults={gameSession.guesses} />
          ) : gameId === GameType.Tweets ? (
            <Container>
              <TweetsGuessList guessResults={gameSession.guesses} />
            </Container>
          ) : (
            gameId === GameType.Emojis && (
              <Container>
                <EmojisGuessList guessResults={gameSession.guesses} />
              </Container>
            )
          )}
        </section>
      )}
      {/* Legends */}
      {ui.isLegendOpen && (
        <Container>
          <>
            <Legend />
          </>
        </Container>
      )}
    </div>
  );
}
