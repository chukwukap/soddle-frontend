"use client";

import React, { useEffect, useState } from "react";
import { KOL } from "@/lib/types/idl-types";
import SearchBar from "./search-bar";
import { GameType } from "@/lib/constants";
import TimerDisplay from "./time-display";
import Container from "@/components/layout/container";
import { AttributesGuessList } from "./attributes-guess-list";
import { TweetsGuessList } from "./tweets-guess-list";
import { EmojisGuessList } from "./emojis-guess-list";
import Legend from "./legends";
import TrapeZoid from "./trapezoid";
import { useGameSession } from "@/hooks/useGameSession";
import { toast } from "sonner";
import { useRootStore } from "@/stores/rootStore";

interface GameWrapperProps {
  kols: KOL[];
  onGameComplete: (score: number) => void;
  currentGameType: number | null;
}

const GameWrapper: React.FC<GameWrapperProps> = ({
  kols,
  onGameComplete,
  currentGameType,
}) => {
  const { gameSession, makeGuess } = useGameSession();
  const { ui } = useRootStore();

  const handleSelect = async (kol: KOL) => {
    ui.setLoading(true);

    try {
      if (!currentGameType) {
        toast.error("No game type selected");
        return;
      }
      await makeGuess(currentGameType, kol);
      console.log("gameSession:", gameSession);
    } catch (error) {
      toast.error("Error making guess");
    } finally {
      ui.setLoading(false);
    }
  };

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
        <TrapeZoid className="w-full  grid min-h-[50px] ">
          <section className=" text-white flex flex-col justify-between items-center">
            <h1 className="text-2xl font-bold text-center">
              {currentGameType === GameType.Attributes
                ? "Guess today's personality!"
                : currentGameType === GameType.Tweets
                ? "Guess the Tweet Author"
                : "Guess the KOL from Emojis"}
            </h1>
            <div className="flex justify-center items-center">
              {currentGameType === GameType.Attributes ? (
                <div className="">{null}</div>
              ) : currentGameType === GameType.Tweets ? (
                <pre className="">
                  {`Software engineering is no longer about
                  
                  line-by-line coding.

                   It's about solving problems.`}
                </pre>
              ) : (
                currentGameType === GameType.Emojis && (
                  <div className="">{null}</div>
                )
              )}
            </div>
          </section>
        </TrapeZoid>
      </Container>

      {/* search bar */}
      <Container>
        <SearchBar kols={kols} onSelect={handleSelect} />
      </Container>

      {/* guesses section */}

      {currentGameType !== null &&
        gameSession &&
        gameSession.guesses.length > 0 && (
          <section className="text-white no-scrollbar">
            {currentGameType === GameType.Attributes ? (
              <AttributesGuessList guesses={gameSession.guesses} />
            ) : currentGameType === GameType.Tweets ? (
              <Container>
                <TweetsGuessList guesses={gameSession.guesses} />
              </Container>
            ) : (
              currentGameType === GameType.Emojis && (
                <Container>
                  <EmojisGuessList guesses={gameSession.guesses} />
                </Container>
              )
            )}
          </section>
        )}
      {/* Legends */}
      {ui.isLegendOpen && (
        <Container>
          <section>
            <Legend onClose={() => ui.setIsLegendOpen(false)} />
          </section>
        </Container>
      )}
    </div>
  );
};

export default GameWrapper;
