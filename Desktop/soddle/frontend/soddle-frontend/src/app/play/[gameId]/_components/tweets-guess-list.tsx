import { GuessResult } from "@/lib/types/idl-types";
import Image from "next/image";
import React from "react";

interface TweetsGuessListProps {
  guessResults: GuessResult[];
}

export const TweetsGuessList: React.FC<TweetsGuessListProps> = ({
  guessResults,
}) => {
  return (
    <ul className="flex flex-col gap-2">
      {guessResults.map((guessResult) => (
        <ListItem key={guessResult.kol.id} guessResult={guessResult} />
      ))}
    </ul>
  );
};

function ListItem({ guessResult }: { guessResult: GuessResult }) {
  const isCorrect = guessResult.result.every((r) => {
    console.log(r);
    return Math.random() > 0.5;
  });

  return (
    <li
      className={`bg-${
        isCorrect ? "green" : "red"
      }-500  py-4 px-2 text-white flex items-center gap-2 justify-center`}
    >
      <Image
        src={guessResult.kol.pfp || "/user-icon.svg"}
        alt={guessResult.kol.name}
        width={40}
        height={40}
      />
      <p>{guessResult.kol.name}</p>
    </li>
  );
}
