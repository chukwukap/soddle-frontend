import { Game2GuessResult } from "@/lib/types/idl-types";
import Image from "next/image";
import React from "react";

interface TweetsGuessListProps {
  guess2Results?: Game2GuessResult[];
}

export const TweetsGuessList: React.FC<TweetsGuessListProps> = ({
  guess2Results,
}) => {
  return (
    <ul className="flex flex-col gap-2">
      {!guess2Results && <div>Todo: Guess results not found</div>}
      {guess2Results?.map((guessResult) => (
        <ListItem key={guessResult.kol.id} guessResult={guessResult} />
      ))}
    </ul>
  );
};

function ListItem({ guessResult }: { guessResult: Game2GuessResult }) {
  const { kol, result } = guessResult;
  return (
    <li
      className={`bg-${
        result ? "green" : "red"
      }-500  py-4 px-2 text-white flex items-center gap-2 justify-center`}
    >
      <Image
        src={kol.pfp || "/user-icon.svg"}
        alt={kol.name}
        width={40}
        height={40}
      />
      <p>{kol.name}</p>
    </li>
  );
}
