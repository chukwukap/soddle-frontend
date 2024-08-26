import React from "react";
import { GuessResult } from "@/lib/types/idl-types";
interface EmojisGuessListProps {
  guessResults: GuessResult[];
}

export const EmojisGuessList: React.FC<EmojisGuessListProps> = ({
  guessResults,
}) => {
  return (
    <div>
      <h2>Guessed Kols (Emojis)</h2>
      {guessResults.map((guess) => (
        <div key={guess.kol.name}>{guess.kol.name}</div>
      ))}
    </div>
  );
};
