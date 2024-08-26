import React from "react";
import { GuessResult } from "@/lib/types/idl-types";
interface EmojisGuessListProps {
  guesses: GuessResult[];
}

export const EmojisGuessList: React.FC<EmojisGuessListProps> = ({
  guesses,
}) => {
  return (
    <div>
      <h2>Guessed Kols (Emojis)</h2>
      {guesses.map((guess) => (
        <div key={guess.kol.name}>{guess.kol.name}</div>
      ))}
    </div>
  );
};
