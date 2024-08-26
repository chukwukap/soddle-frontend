import { GuessResult, KOL } from "@/lib/types/idl-types";
import Image from "next/image";
import React from "react";

interface TweetsGuessListProps {
  guesses: GuessResult[];
}

export const TweetsGuessList: React.FC<TweetsGuessListProps> = ({
  guesses,
}) => {
  return (
    <ul className="flex flex-col gap-2">
      {guesses.map((guess) => (
        <ListItem key={guess.kol.id} kol={guess.kol} result={guess.result} />
      ))}
    </ul>
  );
};

function ListItem({
  kol,
  result,
}: {
  kol: KOL;
  result: GuessResult["result"];
}) {
  const isCorrect = result.every((r) => true);

  return (
    <li
      className={`bg-${
        isCorrect ? "green" : "red"
      }-500  py-4 px-2 text-white flex items-center gap-2 justify-center`}
    >
      <Image
        src={kol.pfp || "/user-icon.svg"}
        unoptimized
        alt={kol.name}
        width={40}
        height={40}
      />
      <p>{kol.name}</p>
    </li>
  );
}
